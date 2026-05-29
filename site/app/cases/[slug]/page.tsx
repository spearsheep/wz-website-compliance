import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Gavel, AlertCircle, ExternalLink, FileText } from "lucide-react"
import { getAllLawsuits, getLawsuitBySlug } from "@/lib/lawsuits"
import { getStoryForSlug } from "@/lib/lawsuit-stories"
import { getIndustryForCaseCode } from "@/lib/industries"
import { VisualFailure } from "@/components/cases/VisualFailure"

export async function generateStaticParams() {
  return getAllLawsuits().map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const l = getLawsuitBySlug(slug)
  if (!l) return {}
  return {
    title: `${l.caseName} — ${l.yearResolved}`,
    description: `${l.oneLine}`,
    alternates: { canonical: `/cases/${l.slug}` },
    openGraph: {
      title: l.caseName,
      description: l.oneLine,
      type: "article",
    },
  }
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const l = getLawsuitBySlug(slug)
  if (!l) notFound()
  const story = getStoryForSlug(slug)
  const industry = getIndustryForCaseCode(l.industry)

  const all = getAllLawsuits()
  const related = all
    .filter((other) => other.slug !== l.slug && other.sector === l.sector)
    .slice(0, 3)

  const legalCaseSchema = {
    "@context": "https://schema.org",
    "@type": "LegalCase",
    name: l.caseName,
    datePublished: String(l.yearResolved),
    description: l.oneLine,
    about: {
      "@type": "Organization",
      name: l.defendant,
    },
  }

  return (
    <div className="py-16 px-6 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalCaseSchema) }}
      />
      <article className="mx-auto max-w-4xl">
        <Link
          href="/cases"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 mb-8"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          All cases
        </Link>

        {/* Hero — blog-style */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            {industry ? (
              <Link
                href={`/industries/${industry.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                style={{ background: `${l.accent}18`, color: l.accent }}
              >
                <Gavel size={11} aria-hidden="true" />
                {l.sector} · {l.industryLabel}
                <ArrowRight size={10} aria-hidden="true" />
              </Link>
            ) : (
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider"
                style={{ background: `${l.accent}18`, color: l.accent }}
              >
                <Gavel size={11} aria-hidden="true" />
                {l.sector} · {l.industryLabel}
              </span>
            )}
            <span className="text-xs text-slate-500 font-mono">
              {l.yearFiled}{l.yearFiled !== l.yearResolved ? `–${l.yearResolved}` : ""}
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4"
            style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
          >
            {l.defendant.split(/[,(]/)[0].trim()}
          </h1>
          {story && (
            <p
              className="text-xl md:text-2xl text-slate-600 leading-snug font-medium mb-2"
              style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
            >
              {story.hook}
            </p>
          )}
        </header>

        {/* The story — plain English */}
        {story && (
          <section className="mb-12">
            <div className="space-y-5 text-slate-700 leading-relaxed text-lg max-w-prose">
              {story.story.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}

        {/* Key facts strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {l.settlementAmount != null && (
            <div className="rounded-2xl bg-white border border-slate-200 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
                Settlement
              </p>
              <p
                className="text-2xl font-extrabold tabular-nums leading-tight"
                style={{
                  color: l.accent,
                  fontFamily: "var(--font-jakarta), var(--font-inter), system-ui",
                }}
              >
                {l.cost}
              </p>
            </div>
          )}
          <div className="rounded-2xl bg-white border border-slate-200 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Court
            </p>
            <p className="text-sm text-slate-700 leading-snug">
              {l.court.replace("U.S. District Court, ", "")}
            </p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Case
            </p>
            <p className="text-xs text-slate-700 leading-snug font-mono">{l.caseName}</p>
            {l.docket && (
              <p className="text-[11px] text-slate-500 mt-1 font-mono">{l.docket}</p>
            )}
          </div>
        </div>

        {/* Outcome */}
        <section className="mb-12 rounded-2xl border-l-4 p-5" style={{ borderLeftColor: l.accent, background: `${l.accent}08` }}>
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: l.accent }}>
            Outcome
          </p>
          <p className="text-slate-800 leading-relaxed">{l.outcome}</p>
        </section>

        {/* What went wrong on the site */}
        {l.violations.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={18} className="text-red-600" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-slate-900">What went wrong on the site</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6">
              Each visual below shows what visitors with disabilities actually experienced.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {l.violations.map((v, i) => (
                <div key={i}>
                  <VisualFailure type={v.type} description={v.description} />
                  <p className="text-[11px] text-slate-500 font-mono mt-2 pl-1">
                    WCAG {v.wcag}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sources */}
        {l.sources.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={16} className="text-slate-700" aria-hidden="true" />
              <h2 className="text-xl font-bold text-slate-900">Sources & documentation</h2>
            </div>
            <ul className="space-y-2" role="list">
              {l.sources.map((s, i) => (
                <li key={i} className="rounded-xl border border-slate-200 p-3 hover:border-slate-300 transition-colors">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 text-sm text-slate-700 hover:text-blue-700 group"
                  >
                    <ExternalLink size={13} className="mt-0.5 shrink-0 text-slate-500 group-hover:text-blue-600" aria-hidden="true" />
                    <span className="leading-snug">
                      {s.name}
                      {s.tier === 1 && (
                        <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          Primary
                        </span>
                      )}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA */}
        <div className="rounded-2xl text-center p-8" style={{ background: "#0F172A" }}>
          <h2
            className="text-2xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
          >
            Is your site exposed like {l.defendant.split(/[,(]/)[0].trim().split(" ")[0]}&apos;s was?
          </h2>
          <p className="text-slate-400 mb-6 text-sm max-w-md mx-auto">
            Run a free scan to find out which of these violations exist on your site right now.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
            style={{ background: "#015DF1" }}
          >
            Scan my site <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {/* Industry page link */}
        {industry && (
          <section className="mt-16">
            <Link
              href={`/industries/${industry.slug}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-md transition-all focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
            >
              <div className="min-w-0">
                <p
                  className="text-[11px] font-semibold uppercase tracking-widest mb-1"
                  style={{ color: industry.accent }}
                >
                  All {industry.shortName} cases
                </p>
                <p className="text-lg font-bold text-slate-900 leading-tight">
                  See the full {industry.shortName.toLowerCase()} risk landscape
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Other cases, top WCAG failures for {industry.shortName.toLowerCase()}, and what to fix first.
                </p>
              </div>
              <ArrowRight size={18} className="text-slate-500 shrink-0" aria-hidden="true" />
            </Link>
          </section>
        )}

        {/* Related cases by sector */}
        {related.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">More {l.sector} cases</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {related.map((other) => (
                <Link
                  key={other.slug}
                  href={`/cases/${other.slug}`}
                  className="rounded-xl border border-slate-200 p-4 hover:border-slate-300 hover:shadow-md transition-all"
                >
                  <p
                    className="text-[10px] font-semibold uppercase tracking-widest mb-1"
                    style={{ color: other.accent }}
                  >
                    {other.industryLabel}
                  </p>
                  <p className="text-sm font-bold text-slate-900 mb-1">{other.defendant.split(/[,(]/)[0].trim()}</p>
                  <p className="text-xs text-slate-500 leading-snug line-clamp-2">{other.oneLine}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
