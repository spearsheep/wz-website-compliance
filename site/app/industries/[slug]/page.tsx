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
  Clock,
  Target,
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

/** Countdown helper — returns { text, passed } */
function getCountdown(deadlineIso: string): { text: string; passed: boolean } {
  const now = new Date()
  const deadline = new Date(deadlineIso)
  const diffMs = deadline.getTime() - now.getTime()
  if (diffMs <= 0) return { text: "has passed", passed: true }
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays <= 30) return { text: `is ${diffDays} days away`, passed: false }
  const diffMonths = Math.ceil(diffDays / 30)
  return { text: `is ${diffMonths} month${diffMonths === 1 ? "" : "s"} away`, passed: false }
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

  const countdown = i.deadline ? getCountdown(i.deadline) : null

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Industries", item: "/industries" },
      { "@type": "ListItem", position: 3, name: i.name, item: `/industries/${i.slug}` },
    ],
  }

  const schemaJson = JSON.stringify(breadcrumbSchema)

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />

      {/* Hero — short description + stats strip do the talking */}
      <section
        className="px-4 sm:px-6 py-10 md:py-20"
        style={{
          background: `linear-gradient(160deg, #FFFFFF 0%, ${i.accent}0A 100%)`,
        }}
      >
        <div className="mx-auto max-w-5xl">
          <Link
            href="/industries"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 mb-6 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            All industries
          </Link>

          <div className="flex items-start gap-5 mb-4">
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

          {/* One short sentence — no jargon */}
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

          {/* Deadline countdown badge (healthcare/government) */}
          {countdown && (
            <div className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 ${
              countdown.passed
                ? "bg-red-50 border border-red-200"
                : "bg-amber-50 border border-amber-200"
            }`}>
              <Clock size={14} className={countdown.passed ? "text-red-700" : "text-amber-700"} aria-hidden="true" />
              <span className={`text-sm font-semibold ${countdown.passed ? "text-red-800" : "text-amber-800"}`}>
                {i.deadlineLabel}{" "}<span className={countdown.passed ? "text-red-700" : "text-amber-700"}>{countdown.text}</span>
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Risk callout — bridges "big company lawsuits" to "your practice" */}
      <section className="px-4 sm:px-6 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border-l-4 bg-red-50/60 p-6" style={{ borderColor: i.accent }}>
            <div className="flex items-start gap-3">
              <Target size={20} className="mt-0.5 shrink-0 text-red-500" aria-hidden="true" />
              <div>
                <p className="text-sm font-bold text-slate-900 mb-1">
                  The risk to your {i.shortName.toLowerCase() === "b2b / saas" ? "company" : "business"}
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {i.riskCallout}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why this industry — structured bullet cards */}
      <section className="px-4 sm:px-6 py-10 md:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle size={16} style={{ color: i.accent }} aria-hidden="true" />
            <h2 className="text-2xl font-bold text-slate-900">
              Why {i.shortName.toLowerCase()}{" "}gets targeted
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(i.whyTargetedPoints ?? [i.whyTargeted]).map((point, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold mb-3"
                  style={{ background: `${i.accent}14`, color: i.accent }}
                  aria-hidden="true"
                >
                  {idx + 1}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top lawsuits — settlement cards */}
      {topCases.length > 0 && (
        <section className="px-4 sm:px-6 py-10 md:py-16 bg-slate-50">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-baseline justify-between mb-8 flex-wrap gap-2">
              <h2
                className="text-2xl md:text-3xl font-bold text-slate-900"
                style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
              >
                Biggest settlements in {i.shortName.toLowerCase()}
              </h2>
              <p className="text-sm text-slate-500">
                {cases.length} documented {cases.length === 1 ? "case" : "cases"}
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
                  <p className="text-xs text-slate-500 font-mono mb-3">
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

      {/* All cases — with summary badge and visual weight for high-value settlements */}
      {cases.length > topCases.length && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
              <h2
                className="text-2xl font-bold text-slate-900"
                style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
              >
                Every {i.shortName.toLowerCase()}{" "}case we&apos;ve documented
              </h2>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {cases.length} cases
                {totalDisclosed > 0 && <> · {formatTotal(totalDisclosed)} total disclosed</>}
              </span>
            </div>
            <ul className="space-y-2" role="list">
              {cases.map((c) => {
                const isHighValue = (c.settlementAmount ?? 0) >= 100_000
                return (
                  <li key={c.slug}>
                    <Link
                      href={`/cases/${c.slug}`}
                      className={`flex items-center justify-between gap-4 rounded-xl border bg-white p-4 hover:shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 ${
                        isHighValue
                          ? "border-slate-300 shadow-sm"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm text-slate-900 truncate ${isHighValue ? "font-bold" : "font-semibold"}`}>
                          {c.defendant.split(/[,(]/)[0].trim()}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{c.caseName}</p>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        {c.settlementAmount != null && (
                          <span
                            className={`tabular-nums ${isHighValue ? "text-base font-extrabold" : "text-sm font-bold"}`}
                            style={{ color: c.accent }}
                          >
                            {c.cost}
                          </span>
                        )}
                        <span className="text-xs text-slate-500 font-mono whitespace-nowrap">
                          {c.yearResolved}
                        </span>
                        <ArrowRight size={14} className="text-slate-500" aria-hidden="true" />
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      )}

      {/* Specific concerns — severity badges, 1-sentence descriptions */}
      <section className="px-4 sm:px-6 py-10 md:py-16 bg-slate-50">
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
          <p className="text-slate-500 mb-8 text-sm">
            The most common failure patterns for {i.shortName.toLowerCase()}{"."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {i.concerns.map((concern, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 p-6"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {concern.title}
                  </h3>
                  {concern.severity && (
                    <span className="shrink-0 inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-[11px] font-semibold text-red-700 border border-red-100">
                      {concern.severity}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{concern.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/compliance"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded"
            >
              See the full WCAG 2.1 reference
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Scanner CTA — personalized with deadline or risk */}
      <section className="px-4 sm:px-6 py-12 md:py-16">
        <div className="mx-auto max-w-3xl rounded-2xl p-6 sm:p-10 text-center" style={{ background: "#0F172A" }}>
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
          >
            {countdown
              ? countdown.passed
                ? `The ${(i.deadlineLabel ?? "deadline").toLowerCase()} has passed`
                : `The ${(i.deadlineLabel ?? "deadline").toLowerCase()} ${countdown.text}`
              : `See where your ${i.shortName.toLowerCase()} site stands`}
          </h2>
          <p className="text-slate-400 mb-6 text-sm max-w-md mx-auto">
            {countdown
              ? countdown.passed
                ? `Your site should already be compliant. Find out if it is.`
                : `Find out which violations exist on your site before the deadline.`
              : `Free instant scan — find the violations plaintiff firms look for.`}
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href={`/?industry=${i.slug}`}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              style={{ background: "#015DF1" }}
            >
              Run free scan <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Talk to an expert
            </Link>
          </div>
        </div>
      </section>

      {/* Other industries cross-link */}
      <section className="px-4 sm:px-6 py-10 md:py-16 bg-slate-50">
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
                    className="group rounded-xl bg-white border border-slate-200 p-4 hover:border-slate-300 hover:shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
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
