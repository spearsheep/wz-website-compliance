import type { Metadata } from "next"
import Link from "next/link"
import { Check, ArrowRight, Info, Zap } from "lucide-react"
import { ScannerHero } from "@/components/home/ScannerHero"

export const metadata: Metadata = {
  title: "Pricing — ADA Compliance Services",
  description:
    "Instant quote for accessibility audit, fix, rebuild, and quarterly maintenance. Pricing scales with your site's complexity and violations — see your exact number in 60 seconds.",
}

const tiers = [
  {
    id: "audit",
    name: "Audit",
    price: "From $1,500",
    priceSub: "Scales with site complexity",
    tagline: "Know your risk",
    description:
      "Full WCAG 2.1 AA scan with manual review. Detailed report with every violation, severity ratings, and remediation guidance.",
    features: [
      "Full site accessibility scan",
      "Violation report with screenshots",
      "Severity ratings (Critical/Major/Minor)",
      "Jurisdiction exposure summary",
      "Remediation guidance per item",
      "48–72 hour turnaround",
    ],
    cta: "Get my quote",
    color: "var(--blue)",
    highlight: false,
  },
  {
    id: "fix",
    name: "Fix",
    price: "From $3,500",
    priceSub: "Scales with violation count",
    tagline: "Targeted remediation",
    description:
      "We fix the violations. Code-level work in your existing codebase with minimal disruption. Before/after compliance report and VPAT included.",
    features: [
      "All critical violations fixed",
      "Alt text remediation",
      "Contrast and keyboard fixes",
      "Form accessibility",
      "Before/after compliance report",
      "VPAT documentation",
    ],
    cta: "Get my quote",
    color: "var(--green)",
    highlight: true,
  },
  {
    id: "rebuild",
    name: "Rebuild",
    price: "From $12,000",
    priceSub: "When patching costs more than rebuilding",
    tagline: "Compliance from scratch",
    description:
      "Full site rebuild to WCAG 2.1 AA. For sites with systemic issues where patching would cost more than starting clean.",
    features: [
      "Full WCAG 2.1 AA rebuild",
      "Semantic HTML structure",
      "Accessible design system",
      "Screen reader tested (NVDA + VoiceOver)",
      "VPAT documentation",
      "Post-launch certification",
    ],
    cta: "Get my quote",
    color: "#a78bfa",
    highlight: false,
  },
  {
    id: "maintenance",
    name: "Maintenance",
    price: "$149/mo",
    priceSub: "Flat monthly retainer",
    tagline: "Ongoing protection",
    description:
      "Quarterly full-site scans, new violation fixes, and legal landscape monitoring. Stay protected as your site evolves.",
    features: [
      "Quarterly compliance scans",
      "New violation fixes",
      "New content review",
      "Third-party widget audits",
      "Legal monitoring",
      "Priority support",
    ],
    cta: "Start monthly",
    color: "#fbbf24",
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <div className="py-16 px-6">
      <div className="mx-auto max-w-7xl">

        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
            See your exact price in 60 seconds.
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-lg mb-6">
            Most accessibility firms hide pricing behind a sales call. We don&apos;t.
            Run your site through our scanner — you&apos;ll see your audit, fix, and
            rebuild quotes inline, based on your actual complexity and violations.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--blue)]/30 bg-[var(--blue)]/10 px-4 py-2">
            <Info size={14} className="text-[var(--blue)]" aria-hidden="true" />
            <span className="text-xs text-[var(--blue)]">
              No commitment · No spam · One report email
            </span>
          </div>
        </div>

        {/* ── INSTANT QUOTE SCANNER ─────────────────────────── */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 mb-5">
              <Zap size={12} className="text-emerald-600" aria-hidden="true" />
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Instant Quote
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
              style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
            >
              Pricing scales with your site,<br />
              not a sales rep&apos;s mood.
            </h2>
            <div className="space-y-3 text-slate-600">
              <p className="leading-relaxed">
                <strong className="text-slate-900">Audit price</strong> scales with your site&apos;s complexity —
                pages, forms, images, videos, PDFs, and third-party widgets. More surface area to inspect = more time.
              </p>
              <p className="leading-relaxed">
                <strong className="text-slate-900">Fix price</strong> scales with the violations we actually find —
                critical issues cost more to remediate than minor ones, naturally.
              </p>
              <p className="leading-relaxed">
                <strong className="text-slate-900">Industry multiplier</strong> reflects regulatory stakes — healthcare
                and law firms get deeper review because the legal exposure is higher.
              </p>
            </div>
            <p className="text-xs text-slate-500 mt-6 font-mono uppercase tracking-wider">
              Run the scanner →
            </p>
          </div>
          <div>
            <ScannerHero />
          </div>
        </div>

        {/* ── TIERS HEADER ──────────────────────────────────── */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Starting prices
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Four ways we work together.
          </h2>
        </div>

        {/* ── PRICING CARDS ─────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {tiers.map((tier) => (
            <article
              key={tier.id}
              className={`rounded-2xl border p-7 flex flex-col transition-all relative ${
                tier.highlight
                  ? "border-transparent shadow-2xl scale-[1.03]"
                  : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-md"
              }`}
              style={tier.highlight ? { background: "#0F172A" } : {}}
              aria-labelledby={`tier-${tier.id}`}
            >
              {tier.highlight && (
                <div className="text-center mb-4">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider rounded-full px-3 py-1"
                    style={{ background: "#0DAB6622", color: "#86efac" }}
                  >
                    Most Popular
                  </span>
                </div>
              )}
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-4"
                style={{ color: tier.highlight ? "#86efac" : tier.color }}
              >
                {tier.tagline}
              </div>
              <h3
                id={`tier-${tier.id}`}
                className={`text-xl font-bold mb-2 ${tier.highlight ? "text-white" : "text-slate-900"}`}
              >
                {tier.name}
              </h3>
              <div className="mb-3">
                <p
                  className={`text-2xl font-extrabold tabular-nums ${tier.highlight ? "text-white" : "text-slate-900"}`}
                  style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
                >
                  {tier.price}
                </p>
                <p className={`text-xs ${tier.highlight ? "text-slate-400" : "text-slate-500"}`}>
                  {tier.priceSub}
                </p>
              </div>
              <p
                className={`text-sm leading-relaxed mb-6 ${
                  tier.highlight ? "text-slate-300" : "text-slate-500"
                }`}
              >
                {tier.description}
              </p>

              <ul className="space-y-2 mb-8 flex-1" role="list">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0"
                      style={{ color: tier.highlight ? "#86efac" : tier.color }}
                      aria-hidden="true"
                    />
                    <span className={`text-xs ${tier.highlight ? "text-slate-300" : "text-slate-500"}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="#top"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                style={{ backgroundColor: tier.highlight ? "#0DAB66" : tier.color as string }}
              >
                {tier.cta}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>

        {/* ── RISK COMPARISON (kept from original) ─────────────────── */}
        <div className="rounded-2xl border border-[var(--fail)]/20 bg-[var(--fail)]/5 p-8 mb-12">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
            Compare the cost of compliance vs. the cost of a lawsuit
          </h2>
          <p className="text-[var(--muted-foreground)] text-sm mb-6">
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
                  <th scope="col" className="text-right py-3 text-[var(--fail)] font-semibold">
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
                    <td className="py-3 pr-6 text-[var(--muted-foreground)]">{label}</td>
                    <td className="py-3 text-right font-bold text-[var(--fail)]">{cost}</td>
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
