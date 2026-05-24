import type { Metadata } from "next"
import Link from "next/link"
import { Check, ArrowRight, Info, FileText, Search, Wrench, Shield } from "lucide-react"
import { ScannerHero } from "@/components/home/ScannerHero"
import { ComplianceHighlight } from "@/components/compliance/ComplianceHighlight"

export const metadata: Metadata = {
  title: "Pricing — ADA Compliance Services",
  description:
    "Enter your URL and see your exact accessibility audit, fix, and rebuild price in 60 seconds. No sales call required.",
}

export default function PricingPage() {
  return (
    <div className="py-10 md:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* ── HEADER + SCANNER (the whole point of this page) ── */}
        <div className="text-center mb-6">
          <ComplianceHighlight
            label="Easy-to-read text"
            explanation="The big dark words sit on a light background, so they are simple to see. A person with weak eyesight can read this without squinting."
            wcagId="1.4.3"
            wcagName="Contrast (Minimum)"
            position="bottom"
            className="mb-4 mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)]">
              Enter your URL. See your price.
            </h1>
          </ComplianceHighlight>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-lg mb-6">
            No sales call. No &ldquo;request a quote&rdquo; form. Your price is calculated
            from what we actually find on your site — pages, violations, and complexity.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--blue)]/30 bg-[var(--blue)]/10 px-4 py-2">
            <Info size={14} className="text-[var(--blue)]" aria-hidden="true" />
            <span className="text-xs text-[var(--blue)]">
              60-second scan · No commitment · One report email
            </span>
          </div>
        </div>

        <div className="max-w-[540px] mx-auto mb-10 md:mb-20">
          <ScannerHero />
        </div>

        {/* ── HOW YOUR PRICE IS CALCULATED ─────────────────── */}
        <div className="mb-10 md:mb-20">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
              Transparent pricing
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              How your price is calculated
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-2xl border border-slate-100 bg-white p-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 mb-4">
                <Search size={18} className="text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Audit price</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Scales with your site&apos;s surface area — what we need to inspect.
              </p>
              <ul className="space-y-1.5" role="list">
                {[
                  "Number of pages",
                  "Forms and interactive components",
                  "Images, videos, and PDFs",
                  "Third-party widgets (booking, chat, maps)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                    <Check size={12} className="mt-0.5 shrink-0 text-blue-500" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 mb-4">
                <Wrench size={18} className="text-emerald-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Fix price</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Scales with what we actually find — the number and severity of violations.
              </p>
              <ul className="space-y-1.5" role="list">
                {[
                  "Critical violations (highest cost to fix)",
                  "Serious violations",
                  "Moderate violations",
                  "Minor violations (lowest cost)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                    <Check size={12} className="mt-0.5 shrink-0 text-emerald-500" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 mb-4">
                <Shield size={18} className="text-amber-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Industry multiplier</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Healthcare and legal carry higher regulatory stakes, so we do deeper review.
              </p>
              <ul className="space-y-1.5" role="list">
                {[
                  "Healthcare — 1.5× (HHS Section 508, HIPAA)",
                  "Law firms — 1.3× (Unruh Act exposure)",
                  "Financial — 1.2×",
                  "Other industries — 1.0× (base rate)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                    <Check size={12} className="mt-0.5 shrink-0 text-amber-700" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── WHAT'S INCLUDED ──────────────────────────────── */}
        <div className="mb-10 md:mb-20">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
              What you get
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Every engagement includes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              { icon: FileText, label: "Detailed violation report with screenshots and severity ratings" },
              { icon: FileText, label: "VPAT documentation (included with fix and rebuild)" },
              { icon: FileText, label: "Before/after compliance report" },
              { icon: FileText, label: "Remediation guidance per item" },
              { icon: FileText, label: "Jurisdiction exposure summary" },
              { icon: FileText, label: "Screen reader testing (NVDA + VoiceOver)" },
            ].map(({ label }) => (
              <div key={label} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4">
                <Check size={16} className="mt-0.5 shrink-0 text-emerald-500" aria-hidden="true" />
                <span className="text-sm text-slate-700">{label}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-slate-900 text-white px-6 py-4">
              <div className="text-left">
                <p className="text-sm font-semibold">Ongoing protection</p>
                <p className="text-xs text-slate-400">Quarterly scans, new violation fixes, legal monitoring</p>
              </div>
              <div className="border-l border-slate-700 pl-3">
                <p className="text-xl font-extrabold tabular-nums" style={{ fontFamily: "var(--font-jakarta), system-ui" }}>
                  $149<span className="text-sm font-normal text-slate-400">/mo</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RISK COMPARISON ──────────────────────────────── */}
        <div className="rounded-2xl border border-[var(--fail)]/20 bg-[var(--fail)]/5 p-8 mb-12">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
            Compare the cost of compliance vs. the cost of a lawsuit
          </h2>
          <p className="text-slate-600 text-sm mb-6">
            The math is simple. One California lawsuit can cost more than a full compliance rebuild.
          </p>
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              aria-label="Cost comparison: compliance services vs. lawsuit costs"
            >
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th scope="col" className="text-left py-3 pr-6 text-[var(--foreground)] font-semibold">
                    Scenario
                  </th>
                  <th scope="col" className="text-right py-3 text-red-700 font-semibold">
                    Potential Cost
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {[
                  { label: "California Unruh Act — per violation (minimum)", cost: "$4,000" },
                  { label: "ADA lawsuit attorney's fees (plaintiff's side)", cost: "$50,000–$200,000+" },
                  { label: "NFB v. Target settlement (2008)", cost: "$9,700,000" },
                  { label: "Alcazar v. Fashion Nova settlement (2025)", cost: "$5,150,000" },
                  { label: "NYC Human Rights Law maximum civil penalty", cost: "$125,000" },
                ].map(({ label, cost }) => (
                  <tr key={label}>
                    <td className="py-3 pr-6 text-slate-600">{label}</td>
                    <td className="py-3 text-right font-bold text-red-700">{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── FOOTER CTA ─────────────────────────────── */}
        <div className="text-center">
          <p className="text-[var(--muted-foreground)] mb-6 text-lg">
            Still wondering? Book a 20-minute call and we&apos;ll walk through your site live.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--blue)] px-8 py-4 font-semibold text-white hover:bg-blue-600 transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Book a 20-minute call
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

      </div>
    </div>
  )
}
