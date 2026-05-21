import { NextRequest, NextResponse } from "next/server"
import { detectComplexity } from "@/lib/complexity-detector"
import {
  calculateQuote,
  type Industry,
  type ViolationCounts,
  type SiteComplexity,
  type QuoteResult,
} from "@/lib/quote-engine"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

interface ScanResult {
  url: string
  score: number
  risk: "LOW" | "MODERATE" | "HIGH" | "CRITICAL"
  riskMessage: string
  failures: Array<{
    id: string
    label: string
    impact: "High Impact" | "Medium Impact" | "Low Impact"
  }>
  complexity?: SiteComplexity
  violations?: ViolationCounts
  quote?: QuoteResult
  industry?: Industry
  email?: string
  scannedAt: string
}

function classifyRisk(score: number): { risk: ScanResult["risk"]; message: string } {
  if (score >= 95) return { risk: "LOW", message: "Strong — minor polish items only" }
  if (score >= 85) return { risk: "LOW", message: "Mostly compliant — a few items to tighten" }
  if (score >= 70) return { risk: "MODERATE", message: "Several accessibility failures — real legal risk" }
  if (score >= 50) return { risk: "HIGH", message: "Significant violations — likely vulnerable to ADA lawsuits" }
  return { risk: "CRITICAL", message: "Failing — exposed to high-cost legal action" }
}

function impactFromScore(s: number | null): "High Impact" | "Medium Impact" | "Low Impact" {
  if (s === null || s < 0.5) return "High Impact"
  if (s < 0.9) return "Medium Impact"
  return "Low Impact"
}

async function syntheticScan(
  target: string,
  industry: Industry,
  email: string | undefined,
): Promise<ScanResult> {
  // Deterministic-ish demo result so the UI is always functional even when PSI is offline.
  const host = (() => {
    try { return new URL(target).hostname } catch { return target }
  })()
  const seed = host.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  const score = 60 + (seed % 35) // 60-94
  const { risk, message } = classifyRisk(score)
  const allFailures: ScanResult["failures"] = [
    { id: "color-contrast", label: "Text contrast below WCAG AA 4.5:1 ratio", impact: "High Impact" },
    { id: "image-alt", label: "Images missing alt text", impact: "High Impact" },
    { id: "link-name", label: "Links have no accessible name", impact: "High Impact" },
    { id: "label", label: "Form fields missing visible labels", impact: "High Impact" },
    { id: "heading-order", label: "Heading hierarchy skips levels", impact: "Medium Impact" },
    { id: "landmark-one-main", label: "No main landmark on the page", impact: "Medium Impact" },
    { id: "target-size", label: "Touch targets too small or too close together", impact: "Medium Impact" },
  ]
  const numFailures = Math.max(1, Math.round((100 - score) / 12))
  const failures = allFailures.slice(0, numFailures)
  const violations = violationsFromFailures(failures)
  // Still try to detect real complexity in demo mode — quote remains accurate.
  const complexity = await detectComplexity(target).catch(() => undefined)
  const quote =
    complexity != null
      ? calculateQuote({ complexity, violations, industry })
      : undefined

  return {
    url: target,
    score,
    risk,
    riskMessage: `${message} (demo mode — set PAGESPEED_API_KEY for live scans)`,
    failures,
    complexity,
    violations,
    quote,
    industry,
    email,
    scannedAt: new Date().toISOString(),
  }
}

function normalizeUrl(input: string): string | null {
  let u = input.trim()
  if (!u) return null
  if (!/^https?:\/\//i.test(u)) u = "https://" + u
  try {
    const parsed = new URL(u)
    return parsed.toString()
  } catch {
    return null
  }
}

function violationsFromFailures(
  failures: ScanResult["failures"],
): ViolationCounts {
  // Map Lighthouse impact buckets to axe-style severity counts.
  // High Impact → split between critical (top-priority WCAG rules) and serious
  const critical = failures.filter(
    (f) =>
      f.impact === "High Impact" &&
      ["color-contrast", "image-alt", "label", "link-name", "button-name"].includes(f.id),
  ).length
  const serious =
    failures.filter((f) => f.impact === "High Impact").length - critical
  const moderate = failures.filter((f) => f.impact === "Medium Impact").length
  const minor = failures.filter((f) => f.impact === "Low Impact").length
  return { critical, serious, moderate, minor }
}

export async function POST(req: NextRequest) {
  let body: { url?: string; email?: string; industry?: Industry }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const target = normalizeUrl(body.url || "")
  if (!target) {
    return NextResponse.json({ error: "Please provide a valid URL" }, { status: 400 })
  }

  const industry: Industry = (body.industry as Industry) || "other"
  const email = body.email?.trim() || undefined

  const apiKey = process.env.PAGESPEED_API_KEY
  const psUrl = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed")
  psUrl.searchParams.set("url", target)
  psUrl.searchParams.set("category", "accessibility")
  psUrl.searchParams.set("strategy", "desktop")
  if (apiKey) psUrl.searchParams.set("key", apiKey)

  let psResponse: Response
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 60_000)
  try {
    psResponse = await fetch(psUrl.toString(), {
      cache: "no-store",
      signal: controller.signal,
    })
  } catch (e) {
    clearTimeout(timeoutId)
    const msg = e instanceof Error ? e.message : String(e)
    console.error("[scan] fetch threw:", msg)
    // Graceful demo fallback when PageSpeed API is unreachable / rate-limited / no API key
    if (process.env.ALLOW_DEMO_SCAN !== "false") {
      return NextResponse.json(await syntheticScan(target, industry, email))
    }
    return NextResponse.json(
      { error: "Could not reach the scanning service. Try again in a moment.", detail: msg },
      { status: 502 },
    )
  }
  clearTimeout(timeoutId)

  if (!psResponse.ok) {
    const text = await psResponse.text()
    // 429 = quota exceeded (common without API key) — fall back to demo
    if ((psResponse.status === 429 || psResponse.status >= 500) && process.env.ALLOW_DEMO_SCAN !== "false") {
      return NextResponse.json(await syntheticScan(target, industry, email))
    }
    const friendly = psResponse.status === 400
      ? "We could not load that website — check the URL is correct and publicly reachable."
      : "The scanning service returned an error. Try again."
    return NextResponse.json({ error: friendly, detail: text.slice(0, 200) }, { status: psResponse.status })
  }

  const data = await psResponse.json()
  const a11y = data?.lighthouseResult?.categories?.accessibility
  const audits = data?.lighthouseResult?.audits ?? {}

  if (!a11y) {
    return NextResponse.json({ error: "No accessibility data returned for this URL." }, { status: 502 })
  }

  const score = Math.round((a11y.score ?? 0) * 100)
  const { risk, message } = classifyRisk(score)

  const failures: ScanResult["failures"] = []
  for (const ref of a11y.auditRefs ?? []) {
    const audit = audits[ref.id]
    if (!audit) continue
    if (audit.scoreDisplayMode === "notApplicable" || audit.scoreDisplayMode === "manual") continue
    if (audit.score === null || audit.score < 1) {
      failures.push({
        id: ref.id,
        label: audit.title || ref.id,
        impact: impactFromScore(audit.score),
      })
    }
  }
  failures.sort((a, b) => {
    const order = { "High Impact": 0, "Medium Impact": 1, "Low Impact": 2 }
    return order[a.impact] - order[b.impact]
  })

  // Complexity detection runs in parallel with the rest of the response build.
  // If it fails for any reason, we fall back to a mid-range estimate.
  const complexity = await detectComplexity(target).catch(() => undefined)
  const violations = violationsFromFailures(failures)
  const quote =
    complexity != null
      ? calculateQuote({ complexity, violations, industry })
      : undefined

  const result: ScanResult = {
    url: target,
    score,
    risk,
    riskMessage: message,
    failures: failures.slice(0, 8),
    complexity,
    violations,
    quote,
    industry,
    email,
    scannedAt: new Date().toISOString(),
  }

  return NextResponse.json(result)
}
