"use client"

import { useState } from "react"
import {
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Loader2,
  Globe,
  Mail,
  Briefcase,
  Lock,
} from "lucide-react"
import Link from "next/link"
import {
  INDUSTRY_OPTIONS,
  formatQuoteRangeFull,
  type Industry,
  type QuoteResult,
  type SiteComplexity,
  type ViolationCounts,
} from "@/lib/quote-engine"

interface ScanResult {
  url: string
  score: number
  risk: "LOW" | "MODERATE" | "HIGH" | "CRITICAL"
  riskMessage: string
  failures: Array<{ id: string; label: string; impact: string }>
  complexity?: SiteComplexity
  violations?: ViolationCounts
  quote?: QuoteResult
  industry?: Industry
  email?: string
  scannedAt: string
}

const riskStyles: Record<string, { ring: string; bg: string; text: string; label: string }> = {
  LOW: { ring: "ring-emerald-200", bg: "bg-emerald-50", text: "text-emerald-700", label: "Low risk" },
  MODERATE: { ring: "ring-amber-200", bg: "bg-amber-50", text: "text-amber-700", label: "Moderate risk" },
  HIGH: { ring: "ring-orange-200", bg: "bg-orange-50", text: "text-orange-700", label: "High risk" },
  CRITICAL: { ring: "ring-red-200", bg: "bg-red-50", text: "text-red-700", label: "Critical risk" },
}

export function ScannerHero() {
  const [url, setUrl] = useState("")
  const [email, setEmail] = useState("")
  const [industry, setIndustry] = useState<Industry>("law")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function onScan(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim() || loading) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, email: email.trim() || undefined, industry }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || "Scan failed. Try a different URL.")
      } else {
        setResult(data as ScanResult)
      }
    } catch {
      setError("Could not reach scanner. Check your connection.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[540px] mx-auto">
      <form
        onSubmit={onScan}
        className="rounded-2xl bg-white border border-slate-200 shadow-xl p-3 space-y-2"
        aria-label="Free accessibility scanner and instant quote"
      >
        {/* URL */}
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
          <Globe size={18} className="text-slate-400" aria-hidden="true" />
          <label htmlFor="scan-url" className="sr-only">Website URL to scan</label>
          <input
            id="scan-url"
            type="url"
            inputMode="url"
            placeholder="yourwebsite.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            autoComplete="url"
            className="flex-1 bg-transparent border-0 outline-none text-slate-900 placeholder-slate-400 text-base py-3 px-1 focus:outline-none"
          />
        </div>

        {/* Email + Industry side-by-side on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
            <Mail size={16} className="text-slate-400" aria-hidden="true" />
            <label htmlFor="scan-email" className="sr-only">Your work email</label>
            <input
              id="scan-email"
              type="email"
              inputMode="email"
              placeholder="you@firm.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="flex-1 bg-transparent border-0 outline-none text-slate-900 placeholder-slate-400 text-sm py-3 px-1 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
            <Briefcase size={16} className="text-slate-400" aria-hidden="true" />
            <label htmlFor="scan-industry" className="sr-only">Your industry</label>
            <select
              id="scan-industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value as Industry)}
              className="flex-1 bg-transparent border-0 outline-none text-slate-900 text-sm py-3 px-1 focus:outline-none cursor-pointer"
            >
              {INDUSTRY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          style={{ background: "#015DF1" }}
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" aria-hidden="true" />
              Scanning and pricing…
            </>
          ) : (
            <>
              Get your free scan and quote
              <ArrowRight size={14} aria-hidden="true" />
            </>
          )}
        </button>

        {/* Privacy line */}
        <div className="flex items-center gap-1.5 justify-center pt-1 text-[11px] text-slate-500">
          <Lock size={11} aria-hidden="true" />
          We send one report email. No spam, ever.
        </div>
      </form>

      <p className="mt-3 text-xs text-slate-500 text-center">
        60-second scan · Powered by Google Lighthouse + axe-core · Free
      </p>

      {/* Error */}
      {error && (
        <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Loading placeholder */}
      {loading && !result && (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-lg p-6 animate-pulse">
          <div className="h-3 w-32 rounded bg-slate-200 mb-4" />
          <div className="h-8 w-24 rounded bg-slate-200 mb-3" />
          <div className="h-3 w-3/4 rounded bg-slate-100 mb-2" />
          <div className="h-3 w-2/3 rounded bg-slate-100" />
        </div>
      )}

      {/* Result card */}
      {result && (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
                Scan result
              </p>
              <p className="text-sm text-slate-600 truncate" title={result.url}>
                {result.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </p>
            </div>
            <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 ring-1 ${riskStyles[result.risk].ring} ${riskStyles[result.risk].bg} ${riskStyles[result.risk].text} text-[11px] font-semibold`}>
              {result.risk === "LOW" ? (
                <ShieldCheck size={12} aria-hidden="true" />
              ) : (
                <ShieldAlert size={12} aria-hidden="true" />
              )}
              {riskStyles[result.risk].label}
            </div>
          </div>

          <div className="px-6 pb-5 flex items-end gap-3">
            <p
              className="text-6xl font-extrabold tabular-nums leading-none"
              style={{
                fontFamily: "var(--font-jakarta), var(--font-inter), system-ui",
                color:
                  result.risk === "LOW" ? "#0DAB66" :
                  result.risk === "MODERATE" ? "#D97706" :
                  "#DC2626",
              }}
            >
              {result.score}
            </p>
            <p className="text-sm text-slate-500 mb-2">/ 100 accessibility</p>
          </div>

          <div className="px-6 pb-4 text-sm text-slate-600 leading-relaxed">
            {result.riskMessage}.
          </div>

          {result.failures.length > 0 && (
            <div className="border-t border-slate-100 px-6 py-4 bg-slate-50">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
                Top issues found
              </p>
              <ul className="space-y-1.5" role="list">
                {result.failures.slice(0, 4).map((f) => (
                  <li key={f.id} className="flex items-start gap-2 text-xs text-slate-600">
                    <span
                      className={`mt-1 inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        f.impact === "High Impact" ? "bg-red-500" :
                        f.impact === "Medium Impact" ? "bg-amber-500" :
                        "bg-slate-400"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="leading-snug">{f.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── QUOTE PANEL ─────────────────────────── */}
          {result.quote && (
            <div className="border-t-2 border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 py-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">
                Your estimated quote
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl bg-slate-800/60 border border-slate-700 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                    Full audit
                  </p>
                  <p className="text-xl font-bold tabular-nums leading-none" style={{ fontFamily: "var(--font-jakarta), system-ui" }}>
                    {formatQuoteRangeFull(result.quote.audit)}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1.5">
                    Manual review + cert
                  </p>
                </div>

                <div
                  className="rounded-xl border p-3"
                  style={{
                    background: result.quote.recommendation === "fix" ? "rgba(13, 171, 102, 0.18)" : "rgba(30, 41, 59, 0.6)",
                    borderColor: result.quote.recommendation === "fix" ? "#0DAB66" : "#334155",
                  }}
                >
                  <p className="text-[10px] uppercase tracking-wider font-semibold mb-1.5" style={{ color: result.quote.recommendation === "fix" ? "#86efac" : "#94a3b8" }}>
                    Complete fix {result.quote.recommendation === "fix" && "· recommended"}
                  </p>
                  <p className="text-xl font-bold tabular-nums leading-none" style={{ fontFamily: "var(--font-jakarta), system-ui" }}>
                    {formatQuoteRangeFull(result.quote.fix)}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1.5">
                    Code-level remediation + VPAT
                  </p>
                </div>
              </div>

              {result.quote.showsRebuildOption && (
                <div className="rounded-xl border border-amber-700/40 bg-amber-950/30 p-3 mb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-amber-300 font-semibold mb-1">
                        Rebuild {result.quote.recommendation === "rebuild" && "· recommended"}
                      </p>
                      <p className="text-base font-bold tabular-nums" style={{ fontFamily: "var(--font-jakarta), system-ui" }}>
                        {formatQuoteRangeFull(result.quote.rebuild)}
                      </p>
                    </div>
                    <p className="text-[10px] text-amber-200/70 max-w-[180px] leading-snug">
                      Often cheaper than patching when violations exceed 15.
                    </p>
                  </div>
                </div>
              )}

              <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                {result.quote.recommendationReason}
              </p>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-700">
                <p className="text-[10px] text-slate-500">
                  Estimate based on {result.complexity?.pages ?? "~"} pages,{" "}
                  {result.complexity?.forms ?? 0} forms,{" "}
                  {(result.violations?.critical ?? 0) + (result.violations?.serious ?? 0)} high-priority violations
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 rounded-lg bg-white text-slate-900 px-3 py-1.5 text-xs font-semibold whitespace-nowrap hover:bg-slate-100"
                >
                  Book a call <ArrowRight size={11} aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}

          {!result.quote && (
            <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between gap-3">
              <p className="text-xs text-slate-500">
                Could not generate quote — site may block our crawler. Contact us for manual estimate.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap">
                Get full audit <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
