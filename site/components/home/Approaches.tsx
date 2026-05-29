import Link from "next/link"
import { ArrowRight, Shield, BarChart3, Building2, Wrench } from "lucide-react"

/**
 * Approaches — The 4-approach comparison section.
 *
 * Positions JustCompliant against three "wrong" archetypes without naming
 * specific competitors. Customer-confident tone — we don't punch down.
 */

interface Approach {
  num: string
  name: string
  tagline: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  iconBg: string
  iconColor: string
  price: string
  priceSub: string
  pros: string[]
  cons: string[]
  footnote: string
  highlighted: boolean
}

const approaches: Approach[] = [
  {
    num: "01",
    name: "The Widget",
    tagline: "\"One line of code makes you compliant.\"",
    icon: Shield,
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    price: "$49–$500",
    priceSub: "PER MONTH · FOREVER",
    pros: [
      "Fast to install",
      "Low monthly fee",
    ],
    cons: [
      "Doesn't change underlying code",
      "Screen readers ignore the widget",
      "22.6% of sued sites had one installed",
      "Federal regulators have fined the category",
    ],
    footnote: "A cosmetic overlay on top of an inaccessible site is not a legal defense.",
    highlighted: false,
  },
  {
    num: "02",
    name: "The Dashboard",
    tagline: "\"We'll tell you what's broken.\"",
    icon: BarChart3,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    price: "$25–$500",
    priceSub: "PER MONTH · FOREVER",
    pros: [
      "Recurring monitoring",
      "Trend reports for compliance officers",
    ],
    cons: [
      "Identifies issues but doesn't fix them",
      "Built for in-house engineering teams",
      "You still own all remediation work",
      "Dashboards get ignored by busy operators",
    ],
    footnote: "A list of violations is not a solution. You still need someone to fix them.",
    highlighted: false,
  },
  {
    num: "03",
    name: "The Consultancy",
    tagline: "\"Custom enterprise engagement.\"",
    icon: Building2,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-700",
    price: "$30K – $200K+",
    priceSub: "PER ENGAGEMENT",
    pros: [
      "Real, deep remediation",
      "Legally defensible",
      "Comprehensive coverage",
    ],
    cons: [
      "Priced for Fortune 500 budgets",
      "Three-to-six month engagements",
      "Custom quotes only — no transparency",
      "Overkill for a 15-page firm site",
    ],
    footnote: "The right approach. The wrong scale and price for most professional services firms.",
    highlighted: false,
  },
  {
    num: "04",
    name: "JustCompliant",
    tagline: "Audited by experts. Fixed by engineers. Certified.",
    icon: Wrench,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    price: "From $1,500",
    priceSub: "QUOTED INSTANTLY · NO RETAINER",
    pros: [
      "Real code-level remediation",
      "WCAG 2.1 AA + VPAT certificate",
      "Sized for professional services firms",
      "Instant quote — see the price before you call",
      "No widgets, no ongoing dashboards to manage",
    ],
    cons: [],
    footnote: "A genuine fix at a price that makes sense for a 15-attorney firm or a single-location medical practice.",
    highlighted: true,
  },
]

export function Approaches() {
  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 border-b border-slate-200">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <p
            className="text-xs font-semibold uppercase tracking-[0.18em] mb-4"
            style={{ color: "#015DF1" }}
          >
            Four approaches
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-5"
            style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
          >
            Most accessibility solutions don&apos;t actually fix anything.
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            There are four ways to handle web accessibility. Three of them either won&apos;t hold up in court or aren&apos;t priced for a professional services firm. The fourth is what we do.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {approaches.map((a) => {
            const Icon = a.icon
            const isFeatured = a.highlighted
            return (
              <div
                key={a.num}
                className={`relative flex flex-col rounded-2xl border p-5 md:p-7 ${
                  isFeatured
                    ? "bg-slate-900 text-white border-slate-900 shadow-2xl lg:-translate-y-3"
                    : "bg-white border-slate-200"
                }`}
                style={isFeatured ? { boxShadow: "0 25px 50px -12px rgba(13, 171, 102, 0.25), 0 0 0 4px rgba(13, 171, 102, 0.15)" } : undefined}
              >
                {isFeatured && (
                  <div
                    className="absolute -top-3 right-5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.14em] text-white"
                    style={{ background: "#078250" }}
                  >
                    Recommended
                  </div>
                )}

                {/* Number + Icon */}
                <div className="flex items-center justify-between mb-5">
                  <p className={`font-mono text-[11px] uppercase tracking-[0.14em] ${isFeatured ? "text-slate-400" : "text-slate-500"}`}>
                    Approach {a.num}
                  </p>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isFeatured ? "bg-emerald-500/15" : a.iconBg
                  }`}>
                    <Icon size={20} className={isFeatured ? "text-emerald-400" : a.iconColor} />
                  </div>
                </div>

                {/* Name */}
                <h3
                  className={`text-2xl font-bold tracking-tight leading-tight mb-2 ${
                    isFeatured ? "text-white" : "text-slate-900"
                  }`}
                  style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
                >
                  {a.name}
                </h3>

                {/* Tagline */}
                <p className={`text-sm italic leading-snug mb-5 min-h-[44px] ${
                  isFeatured ? "text-slate-300" : "text-slate-500"
                }`}>
                  {a.tagline}
                </p>

                {/* Price */}
                <div className="mb-1">
                  <p
                    className={`text-2xl font-bold tracking-tight tabular-nums ${
                      isFeatured ? "text-white" : "text-slate-900"
                    }`}
                    style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
                  >
                    {a.price}
                  </p>
                  <p className={`font-mono text-[10px] tracking-[0.06em] mb-5 ${
                    isFeatured ? "text-slate-400" : "text-slate-500"
                  }`}>
                    {a.priceSub}
                  </p>
                </div>

                {/* Divider */}
                <div className={`h-px mb-4 ${isFeatured ? "bg-slate-700" : "bg-slate-200"}`} />

                {/* Pros */}
                <ul className="space-y-2 mb-2">
                  {a.pros.map((p, i) => (
                    <li
                      key={i}
                      className={`text-[13px] leading-snug flex gap-2 ${
                        isFeatured ? "text-slate-200" : "text-slate-600"
                      }`}
                    >
                      <span className={`font-mono font-bold ${isFeatured ? "text-emerald-400" : "text-emerald-600"}`}>+</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                {/* Cons */}
                {a.cons.length > 0 && (
                  <ul className="space-y-2 mb-3">
                    {a.cons.map((c, i) => (
                      <li
                        key={i}
                        className={`text-[13px] leading-snug flex gap-2 ${
                          isFeatured ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        <span className={`font-mono font-bold ${isFeatured ? "text-red-400" : "text-red-500"}`}>—</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Footnote */}
                <p className={`text-[11px] mt-auto pt-4 leading-snug border-t italic ${
                  isFeatured ? "text-slate-400 border-slate-700" : "text-slate-500 border-slate-100"
                }`}>
                  {a.footnote}
                </p>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5">
          <div>
            <p className="text-sm font-semibold text-slate-900 mb-1">
              Want to see what your site costs to actually fix?
            </p>
            <p className="text-sm text-slate-500">
              Run a free scan above and get an instant quote based on your specific site.
            </p>
          </div>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white text-sm transition-all hover:opacity-90"
            style={{ background: "#0F172A" }}
          >
            See full pricing
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  )
}
