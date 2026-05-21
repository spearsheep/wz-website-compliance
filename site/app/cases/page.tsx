import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Gavel } from "lucide-react"
import { getAllLawsuits, getTotalKnownSettlements, type Lawsuit } from "@/lib/lawsuits"

export const metadata: Metadata = {
  title: "ADA Lawsuit Case Studies — Real Companies, Real Settlements",
  description:
    "35+ documented ADA web accessibility lawsuits against Target, Domino's, Netflix, Winn-Dixie, Harvard, MIT, Fashion Nova, Hobby Lobby, Five Guys, Sweetgreen, and more. Settlements, court rulings, and what went wrong on each site.",
  alternates: { canonical: "/cases" },
  openGraph: {
    title: "ADA Lawsuit Case Studies",
    description:
      "Real companies sued for inaccessible websites — settlements, rulings, and visual breakdowns of what went wrong.",
    type: "website",
  },
}

function formatTotal(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M+`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K+`
  return `$${n}`
}

export default function CasesPage() {
  const all = getAllLawsuits()
  const b2c = all.filter((l) => l.sector === "B2C")
  const b2b = all.filter((l) => l.sector === "B2B")
  const totalSettlements = formatTotal(getTotalKnownSettlements())

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "ADA Web Accessibility Lawsuit Case Studies",
    description:
      "Curated collection of documented ADA Title III web accessibility lawsuits with settlement amounts and specific violations.",
    hasPart: all.map((l) => ({
      "@type": "LegalCase",
      name: l.caseName,
      datePublished: String(l.yearResolved),
      about: l.defendant,
    })),
  }

  return (
    <div className="py-16 px-6 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 mb-6">
            <Gavel size={12} className="text-red-600" aria-hidden="true" />
            <span className="text-xs font-semibold text-red-700 uppercase tracking-wider">
              {all.length} documented ADA lawsuits
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight"
            style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
          >
            Companies sued. Settlements paid.
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Real ADA Title III lawsuits and DOJ enforcement actions against household-name companies.
            Click any case to see exactly what went wrong, what it cost, and the legal precedent it set.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto">
          {[
            { value: all.length.toString(), label: "Documented cases" },
            { value: totalSettlements, label: "Combined known settlements" },
            { value: b2c.length.toString(), label: "B2C consumer sites" },
            { value: b2b.length.toString(), label: "B2B institutional sites" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="text-center rounded-2xl bg-slate-50 border border-slate-100 p-5"
            >
              <p
                className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-1 tabular-nums"
                style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
              >
                {value}
              </p>
              <p className="text-xs text-slate-500 leading-snug">{label}</p>
            </div>
          ))}
        </div>

        {/* B2C section */}
        <section className="mb-16">
          <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
            <h2
              className="text-2xl font-bold text-slate-900"
              style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
            >
              Consumer-facing (B2C)
            </h2>
            <p className="text-xs text-slate-400">
              {b2c.length} cases · Retail, restaurants, streaming, healthcare, entertainment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {b2c.map((l) => (
              <LawsuitCard key={l.slug} lawsuit={l} />
            ))}
          </div>
        </section>

        {/* B2B section */}
        <section className="mb-16">
          <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
            <h2
              className="text-2xl font-bold text-slate-900"
              style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
            >
              Institutional / B2B
            </h2>
            <p className="text-xs text-slate-400">
              {b2b.length} cases · Higher ed, healthcare systems, financial services, govt, exam authorities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {b2b.map((l) => (
              <LawsuitCard key={l.slug} lawsuit={l} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl text-center p-10" style={{ background: "#0F172A" }}>
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
          >
            Don&apos;t become a case study
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            The companies above all paid more to fight than they would have to fix it up front.
            Scan your site free in 10 seconds.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
            style={{ background: "#015DF1" }}
          >
            Run instant scan <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function LawsuitCard({ lawsuit: l }: { lawsuit: Lawsuit }) {
  return (
    <Link
      href={`/cases/${l.slug}`}
      className="group block rounded-2xl bg-white border border-slate-200 p-6 hover:border-slate-300 hover:shadow-md transition-all focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
    >
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="min-w-0 flex-1">
          <p
            className="text-[11px] font-semibold uppercase tracking-widest mb-1"
            style={{ color: l.accent }}
          >
            {l.industryLabel}
          </p>
          <h3 className="text-xl font-bold text-slate-900 leading-tight">
            {l.defendant.split(/[,(]/)[0].trim()}
          </h3>
        </div>
        {l.settlementAmount != null && (
          <div className="text-right shrink-0 max-w-[40%]">
            <p
              className="text-2xl md:text-3xl font-extrabold tabular-nums leading-tight mb-0.5 break-words"
              style={{
                color: l.accent,
                fontFamily: "var(--font-jakarta), var(--font-inter), system-ui",
              }}
            >
              {l.cost}
            </p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Settlement</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400 font-mono truncate max-w-[55%]">
          {l.yearResolved} · {l.court.replace("U.S. District Court, ", "").replace(/ \(.*$/, "")}
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-blue-600 group-hover:text-blue-700 whitespace-nowrap">
          Read the case
          <ArrowRight size={12} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
