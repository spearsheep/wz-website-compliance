import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  UtensilsCrossed,
  Stethoscope,
  GraduationCap,
  Tv,
  Landmark,
  Building2,
  Cpu,
  AlertTriangle,
  Shield,
} from "lucide-react"
import { industries, getIndustryBySlug } from "@/lib/industries"
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

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const i = getIndustryBySlug(slug)
  if (!i) return {}
  return {
    title: `ADA Compliance for ${i.name} — Lawsuits, Risk, Remediation`,
    description: `${i.description} See documented lawsuits in ${i.shortName.toLowerCase()}, the most common WCAG failures, and what to do about them.`,
    alternates: { canonical: `/industries/${i.slug}` },
    openGraph: {
      title: `ADA Compliance for ${i.name}`,
      description: i.description,
      type: "website",
    },
  }
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const i = getIndustryBySlug(slug)
  if (!i) notFound()

  const cases = getCasesForIndustry(i.slug)
  const Icon = iconMap[i.icon]

  const disclosed = cases.filter((c) => c.settlementAmount != null)
  const topCases = [...disclosed]
    .sort((a, b) => (b.settlementAmount! - a.settlementAmount!))
    .slice(0, 3)
  const totalDisclosed = disclosed.reduce(
    (sum, c) => sum + (c.settlementAmount ?? 0),
    0,
  )

  function formatTotal(n: number): string {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1).replace(/\.0$/, "")}M+`
    if (n >= 1_000) return `$${Math.round(n / 1_000)}K+`
    return `$${n}`
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Industries", item: "/industries" },
      { "@type": "ListItem", position: 3, name: i.name, item: `/industries/${i.slug}` },
    ],
  }

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section
        className="px-6 py-16 md:py-20"
        style={{
          background: `linear-gradient(160deg, #FFFFFF 0%, ${i.accent}0A 100%)`,
        }}
      >
        <div className="mx-auto max-w-5xl">
          <Link
            href="/cases"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 mb-6"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            All industries & cases
          </Link>

          <div className="flex items-start gap-5 mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: `${i.accent}18`, color: i.accent }}
              aria-hidden="true"
            >
              <Icon size={28} />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: i.accent }}
              >
                ADA Compliance for
              </p>
              <h1
                className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight"
                style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
              >
                {i.name}
              </h1>
            </div>
          </div>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mb-8">
            {i.description}
          </p>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {i.stats.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl bg-white border border-slate-200 p-4"
              >
                <p
                  className="text-2xl md:text-3xl font-extrabold tabular-nums leading-none mb-1"
                  style={{
                    fontFamily: "var(--font-jakarta), var(--font-inter), system-ui",
                    color: i.accent,
                  }}
                >
                  {value}
                </p>
                <p className="text-xs text-slate-500 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why this industry */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} style={{ color: i.accent }} aria-hidden="true" />
            <h2 className="text-2xl font-bold text-slate-900">
              Why {i.shortName.toLowerCase()} gets targeted
            </h2>
          </div>
          <p className="text-slate-700 leading-relaxed text-lg">{i.whyTargeted}</p>
        </div>
      </section>

      {/* Top lawsuits — internal links to case pages */}
      {topCases.length > 0 && (
        <section className="px-6 py-16 bg-slate-50">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-baseline justify-between mb-8 flex-wrap gap-2">
              <h2
                className="text-2xl md:text-3xl font-bold text-slate-900"
                style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
              >
                Biggest settlements in {i.shortName.toLowerCase()}
              </h2>
              <p className="text-sm text-slate-500">
                {cases.length} total documented {cases.length === 1 ? "case" : "cases"}
                {totalDisclosed > 0 ? ` · ${formatTotal(totalDisclosed)} disclosed` : ""}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topCases.map((c) => (
                <Link
                  key={c.slug}
                  href={`/cases/${c.slug}`}
                  className="group block rounded-2xl bg-white border border-slate-200 p-6 hover:border-slate-300 hover:shadow-md transition-all focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                >
                  <p
                    className="text-[11px] font-semibold uppercase tracking-widest mb-2"
                    style={{ color: i.accent }}
                  >
                    {c.industryLabel}
                  </p>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight">
                    {c.defendant.split(/[,(]/)[0].trim()}
                  </h3>
                  <p
                    className="text-3xl font-extrabold tabular-nums leading-none mb-3"
                    style={{
                      color: c.accent,
                      fontFamily: "var(--font-jakarta), var(--font-inter), system-ui",
                    }}
                  >
                    {c.cost}
                  </p>
                  <p className="text-xs text-slate-400 font-mono mb-3">
                    {c.yearResolved} · {c.court.replace("U.S. District Court, ", "").split(",")[0]}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                    Read the case
                    <ArrowRight size={12} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All cases for this industry */}
      {cases.length > topCases.length && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <h2
              className="text-2xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
            >
              Every {i.shortName.toLowerCase()} case we&apos;ve documented
            </h2>
            <ul className="space-y-2" role="list">
              {cases.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/cases/${c.slug}`}
                    className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-sm transition-all"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {c.defendant.split(/[,(]/)[0].trim()}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{c.caseName}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      {c.settlementAmount != null && (
                        <span
                          className="text-sm font-bold tabular-nums"
                          style={{ color: c.accent }}
                        >
                          {c.cost}
                        </span>
                      )}
                      <span className="text-xs text-slate-400 font-mono whitespace-nowrap">
                        {c.yearResolved}
                      </span>
                      <ArrowRight size={14} className="text-slate-400" aria-hidden="true" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Specific concerns — internal links to compliance criteria */}
      <section className="px-6 py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={18} style={{ color: i.accent }} aria-hidden="true" />
            <h2
              className="text-2xl md:text-3xl font-bold text-slate-900"
              style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
            >
              What specifically to fix
            </h2>
          </div>
          <p className="text-slate-500 mb-8">
            The most common failure patterns for {i.shortName.toLowerCase()}, with the relevant WCAG criteria.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {i.concerns.map((concern, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 p-6"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                  {concern.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{concern.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/compliance"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              See the full WCAG 2.1 reference
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Scanner CTA */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-2xl p-10 text-center" style={{ background: "#0F172A" }}>
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
          >
            See where your {i.shortName.toLowerCase()} site stands
          </h2>
          <p className="text-slate-400 mb-6 text-sm max-w-md mx-auto">
            Free instant scan. Find out which of these violations exist on your site right now.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
              style={{ background: "#015DF1" }}
            >
              Run instant scan <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800"
            >
              Full audit
            </Link>
          </div>
        </div>
      </section>

      {/* Other industries cross-link */}
      <section className="px-6 py-16 bg-slate-50">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Other industries
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {industries
              .filter((other) => other.slug !== i.slug)
              .map((other) => {
                const OtherIcon = iconMap[other.icon]
                return (
                  <Link
                    key={other.slug}
                    href={`/industries/${other.slug}`}
                    className="group rounded-xl bg-white border border-slate-200 p-4 hover:border-slate-300 hover:shadow-sm transition-all"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: `${other.accent}18`, color: other.accent }}
                      aria-hidden="true"
                    >
                      <OtherIcon size={18} />
                    </div>
                    <p className="text-sm font-semibold text-slate-900 leading-tight">
                      {other.shortName}
                    </p>
                  </Link>
                )
              })}
          </div>
        </div>
      </section>
    </div>
  )
}
