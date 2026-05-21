import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  ShoppingBag,
  UtensilsCrossed,
  Stethoscope,
  GraduationCap,
  Tv,
  Landmark,
  Building2,
  Cpu,
} from "lucide-react"
import { industries } from "@/lib/industries"
import { getCasesForIndustry } from "@/lib/industries-server"

const iconMap = {
  ShoppingBag,
  UtensilsCrossed,
  Stethoscope,
  GraduationCap,
  Tv,
  Landmark,
  Building2,
  Cpu,
}

export const metadata: Metadata = {
  title: "ADA Compliance by Industry — Risk & Lawsuits in Your Sector",
  description:
    "Pick your industry to see documented ADA lawsuits, specific compliance failures, and what to fix. Retail, restaurants, healthcare, education, entertainment, financial services, government, B2B SaaS.",
  alternates: { canonical: "/industries" },
}

export default function IndustriesIndex() {
  return (
    <div className="py-16 px-6 bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <h1
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight"
            style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
          >
            ADA compliance, by industry
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Different industries get sued for different things. Pick yours to see documented cases,
            the specific WCAG failures plaintiffs target, and what to fix first.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {industries.map((i) => {
            const Icon = iconMap[i.icon]
            const caseCount = getCasesForIndustry(i.slug).length
            return (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className="group rounded-2xl bg-white border border-slate-200 p-6 hover:border-slate-300 hover:shadow-md transition-all focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${i.accent}18`, color: i.accent }}
                  aria-hidden="true"
                >
                  <Icon size={22} />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                  {i.name}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{i.oneLiner}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    {caseCount} documented {caseCount === 1 ? "case" : "cases"}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 font-semibold transition-transform group-hover:translate-x-0.5"
                    style={{ color: i.accent }}
                  >
                    Read <ArrowRight size={12} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
