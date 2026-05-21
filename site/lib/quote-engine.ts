/**
 * Quote Engine — Computes audit and fix price ranges from scan results + site complexity.
 *
 * Two distinct cost models:
 * - AUDIT cost scales with site complexity (surface area to inspect)
 * - FIX cost scales with violations (work to remediate)
 *
 * Both apply an industry risk multiplier (legal/health are higher-stakes).
 */

export type Industry =
  | "law"
  | "healthcare"
  | "financial"
  | "ecommerce"
  | "restaurant"
  | "professional-services"
  | "real-estate"
  | "other"

export interface SiteComplexity {
  pages: number
  forms: number
  interactiveComponents: number
  images: number
  videos: number
  pdfs: number
  thirdPartyWidgets: number
}

export interface ViolationCounts {
  critical: number
  serious: number
  moderate: number
  minor: number
}

export interface QuoteInput {
  complexity: SiteComplexity
  violations: ViolationCounts
  industry: Industry
}

export interface QuoteRange {
  low: number
  high: number
  midpoint: number
}

export interface QuoteResult {
  audit: QuoteRange
  fix: QuoteRange
  rebuild: QuoteRange // optional — for clearly catastrophic sites
  industry: Industry
  industryMultiplier: number
  recommendation: "audit" | "fix" | "rebuild"
  recommendationReason: string
  showsRebuildOption: boolean
}

// ─── INDUSTRY MULTIPLIERS ─────────────────────────────────
// Healthcare and law carry higher stakes (HHS rule, Unruh Act, etc.)
// → higher quote justified by deeper compliance work + documentation.
const INDUSTRY_MULTIPLIERS: Record<Industry, number> = {
  healthcare: 1.5,
  law: 1.3,
  financial: 1.2,
  "professional-services": 1.15,
  "real-estate": 1.1,
  restaurant: 1.0,
  ecommerce: 1.0,
  other: 1.0,
}

// ─── AUDIT COST (scales with site complexity) ─────────────
function computeAuditBase(c: SiteComplexity): number {
  let cost = 500 // base

  // Pages over 10 — first 10 included
  if (c.pages > 10) cost += (c.pages - 10) * 30

  // Forms — each requires keyboard + screen reader + error-state testing
  cost += c.forms * 50

  // Interactive components — modals, dropdowns, carousels, accordions
  cost += c.interactiveComponents * 30

  // Images over 20 — alt-text quality review is manual per image
  if (c.images > 20) cost += (c.images - 20) * 5

  // Videos — caption and audio-description review per video
  cost += c.videos * 100

  // PDFs — PDF/UA structure check per file
  cost += c.pdfs * 80

  // Third-party widgets — booking systems, chat, payment, maps
  cost += c.thirdPartyWidgets * 50

  return cost
}

// ─── FIX COST (scales with violations) ────────────────────
function computeFixBase(v: ViolationCounts): number {
  let cost = 2000 // base remediation engagement

  cost += v.critical * 400
  cost += v.serious * 200
  cost += v.moderate * 75
  cost += v.minor * 25

  return cost
}

// ─── REBUILD COST (when site is past saving) ──────────────
function computeRebuildBase(c: SiteComplexity): number {
  // Base + per-page rebuild cost; capped to a reasonable SMB ceiling.
  let cost = 8000
  if (c.pages > 5) cost += (c.pages - 5) * 200
  if (c.forms > 2) cost += (c.forms - 2) * 400
  cost += c.interactiveComponents * 150
  // Cap at $35k for SMB scope
  return Math.min(cost, 35000)
}

// ─── RANGES (low/high band around the central estimate) ───
function toRange(central: number, spreadPct: number = 0.15): QuoteRange {
  // Round to nearest $100 for clean output
  const low = Math.round((central * (1 - spreadPct)) / 100) * 100
  const high = Math.round((central * (1 + spreadPct)) / 100) * 100
  const midpoint = Math.round(central / 100) * 100
  return { low, high, midpoint }
}

// ─── RECOMMENDATION LOGIC ─────────────────────────────────
function recommend(input: QuoteInput): {
  recommendation: "audit" | "fix" | "rebuild"
  reason: string
  showsRebuild: boolean
} {
  const totalViolations =
    input.violations.critical +
    input.violations.serious +
    input.violations.moderate

  // Catastrophically broken — rebuild is more cost-effective
  if (input.violations.critical >= 8 || totalViolations >= 30) {
    return {
      recommendation: "rebuild",
      reason:
        "With this many violations, rebuilding on accessible architecture is cleaner and often cheaper than patching.",
      showsRebuild: true,
    }
  }

  // Some real risk — fix is the right path
  if (input.violations.critical >= 1 || input.violations.serious >= 3) {
    return {
      recommendation: "fix",
      reason:
        "Your site has clear legal exposure. We recommend remediation now to prevent demand letters.",
      showsRebuild: totalViolations >= 15,
    }
  }

  // Mostly clean — audit might be enough to verify and document
  return {
    recommendation: "audit",
    reason:
      "Your site is in reasonable shape. A formal audit will identify the remaining items and certify compliance.",
    showsRebuild: false,
  }
}

// ─── PUBLIC API ───────────────────────────────────────────
export function calculateQuote(input: QuoteInput): QuoteResult {
  const multiplier =
    INDUSTRY_MULTIPLIERS[input.industry] ?? INDUSTRY_MULTIPLIERS.other

  const auditCentral = computeAuditBase(input.complexity) * multiplier
  const fixCentral = computeFixBase(input.violations) * multiplier
  const rebuildCentral = computeRebuildBase(input.complexity) * multiplier

  const audit = toRange(auditCentral, 0.15)
  const fix = toRange(fixCentral, 0.18)
  const rebuild = toRange(rebuildCentral, 0.2)

  const { recommendation, reason, showsRebuild } = recommend(input)

  return {
    audit,
    fix,
    rebuild,
    industry: input.industry,
    industryMultiplier: multiplier,
    recommendation,
    recommendationReason: reason,
    showsRebuildOption: showsRebuild,
  }
}

// ─── FORMATTING HELPERS ───────────────────────────────────
export function formatQuoteRange(range: QuoteRange): string {
  const fmt = (n: number) => {
    if (n >= 1000) return "$" + Math.round(n / 100) / 10 + "k"
    return "$" + n.toLocaleString()
  }
  return `${fmt(range.low)} – ${fmt(range.high)}`
}

export function formatQuoteRangeFull(range: QuoteRange): string {
  return `$${range.low.toLocaleString()} – $${range.high.toLocaleString()}`
}

// ─── INDUSTRY LABELS (for UI dropdown) ────────────────────
export const INDUSTRY_LABELS: Record<Industry, string> = {
  law: "Law firm",
  healthcare: "Healthcare / medical practice",
  financial: "Financial services / wealth management",
  "professional-services": "Professional services (accounting, consulting)",
  "real-estate": "Real estate",
  restaurant: "Restaurant / food service",
  ecommerce: "E-commerce / online retail",
  other: "Other",
}

export const INDUSTRY_OPTIONS: Array<{ value: Industry; label: string }> = (
  Object.keys(INDUSTRY_LABELS) as Industry[]
).map((k) => ({ value: k, label: INDUSTRY_LABELS[k] }))
