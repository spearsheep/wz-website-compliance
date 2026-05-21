import type { Metadata } from "next"
import Link from "next/link"
import { Check, ArrowRight, Info } from "lucide-react"

export const metadata: Metadata = {
  title: "Pricing — ADA Compliance Services",
  description: "Transparent pricing for accessibility audit, fix, rebuild, and quarterly maintenance services.",
}

const tiers = [
  {
    id: "audit",
    name: "Audit",
    price: "Contact for pricing",
    priceSub: "Based on site size",
    tagline: "Know your risk",
    description: "Full WCAG 2.1 AA scan. Detailed report with every violation, severity ratings, and remediation guidance.",
    features: [
      "Full site accessibility scan",
      "Violation report with screenshots",
      "Severity ratings (Critical/Major/Minor)",
      "Jurisdiction exposure summary",
      "Remediation guidance per item",
      "48–72 hour turnaround",
    ],
    cta: "Get a Quote",
    color: "var(--blue)",
    highlight: false,
  },
  {
    id: "fix",
    name: "Fix",
    price: "Contact for pricing",
    priceSub: "Based on violation count",
    tagline: "Targeted remediation",
    description: "We fix the violations. Work done in your existing codebase with minimal disruption. Before/after compliance report included.",
    features: [
      "All critical violations fixed",
      "Alt text for all images",
      "Contrast remediation",
      "Keyboard navigation",
      "Form accessibility",
      "Before/after report",
    ],
    cta: "Get a Quote",
    color: "var(--green)",
    highlight: false,
  },
  {
    id: "rebuild",
    name: "Rebuild",
    price: "Contact for pricing",
    priceSub: "Based on site complexity",
    tagline: "Compliance from scratch",
    description: "Full site rebuild to WCAG 2.1 AA. For sites with systemic issues. Includes VPAT documentation and post-launch certification.",
    features: [
      "Full WCAG 2.1 AA rebuild",
      "Semantic HTML structure",
      "Accessible design system",
      "All components keyboard-navigable",
      "Screen reader tested",
      "VPAT documentation",
      "Post-launch certification",
    ],
    cta: "Get a Quote",
    color: "#a78bfa",
    highlight: true,
  },
  {
    id: "maintenance",
    name: "Maintenance",
    price: "Contact for pricing",
    priceSub: "Monthly retainer",
    tagline: "Ongoing protection",
    description: "Quarterly full-site scans, new violation fixes, and legal landscape monitoring. Stay protected as your site evolves.",
    features: [
      "Quarterly compliance scans",
      "New violation fixes",
      "New content review",
      "Third-party widget audits",
      "Legal monitoring",
      "Priority support",
    ],
    cta: "Get a Quote",
    color: "#fbbf24",
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <div className="py-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-xl mx-auto text-lg mb-4">
            Every engagement starts with a free audit. Pricing is based on your site&apos;s size and complexity — no surprises.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--blue)]/30 bg-[var(--blue)]/10 px-4 py-2">
            <Info size={14} className="text-[var(--blue)]" aria-hidden="true" />
            <span className="text-xs text-[var(--blue)]">
              All services include a complimentary risk assessment before you commit
            </span>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
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
                  <span className="text-xs font-semibold uppercase tracking-wider rounded-full px-3 py-1" style={{ background: "#a78bfa22", color: "#c4b5fd" }}>
                    Most Comprehensive
                  </span>
                </div>
              )}
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-4"
                style={{ color: tier.highlight ? "#a78bfa" : tier.color }}
              >
                {tier.tagline}
              </div>
              <h2
                id={`tier-${tier.id}`}
                className={`text-xl font-bold mb-1 ${tier.highlight ? "text-white" : "text-slate-900"}`}
              >
                {tier.name}
              </h2>
              <div className="mb-2">
                <p className={`text-lg font-bold ${tier.highlight ? "text-white" : "text-slate-900"}`}>{tier.price}</p>
                <p className={`text-xs ${tier.highlight ? "text-slate-400" : "text-slate-500"}`}>{tier.priceSub}</p>
              </div>
              <p className={`text-sm leading-relaxed mb-6 ${tier.highlight ? "text-slate-300" : "text-slate-500"}`}>
                {tier.description}
              </p>

              <ul className="space-y-2 mb-8 flex-1" role="list">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: tier.highlight ? "#a78bfa" : tier.color }} aria-hidden="true" />
                    <span className={`text-xs ${tier.highlight ? "text-slate-300" : "text-slate-500"}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                style={{ backgroundColor: tier.highlight ? "#a78bfa" : tier.color as string }}
              >
                {tier.cta}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>

        {/* Risk comparison */}
        <div className="rounded-2xl border border-[var(--fail)]/20 bg-[var(--fail)]/5 p-8">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
            Compare the cost of compliance vs. the cost of a lawsuit
          </h2>
          <p className="text-[var(--muted-foreground)] text-sm mb-6">
            The math is simple. One California lawsuit can cost more than a full compliance rebuild.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Cost comparison: compliance services vs. lawsuit costs">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th scope="col" className="text-left py-3 pr-6 text-[var(--foreground)] font-semibold">Scenario</th>
                  <th scope="col" className="text-right py-3 text-[var(--fail)] font-semibold">Potential Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {[
                  { label: "California Unruh Act — per violation (minimum)", cost: "$4,000" },
                  { label: "ADA lawsuit attorney's fees (plaintiff's side)", cost: "$50,000–$200,000+" },
                  { label: "NFB v. Target settlement (2008)", cost: "$9,700,000" },
                  { label: "NAD v. Netflix settlement (2013)", cost: "$755,000" },
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

        {/* Free audit CTA */}
        <div className="mt-12 text-center">
          <p className="text-[var(--muted-foreground)] mb-6">
            Start with a free audit — no commitment required. We&apos;ll tell you exactly where you stand.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--blue)] px-8 py-4 font-semibold text-white hover:bg-blue-600 transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Request Your Free Audit
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}
