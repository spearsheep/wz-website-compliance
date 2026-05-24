import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { getAllPosts } from "@/lib/blog"
import { ComplianceHighlight } from "@/components/compliance/ComplianceHighlight"

export const metadata: Metadata = {
  title: "Blog — ADA & WCAG accessibility insights",
  description:
    "Daily plain-English insights on ADA Title III, WCAG 2.1, state accessibility laws, and real lawsuit case studies. Written for non-technical business owners.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Jobs Junior Compliance Blog",
    description: "Daily insights on web accessibility law and WCAG compliance.",
    type: "website",
  },
}

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <div className="py-10 md:py-16 px-4 sm:px-6 bg-white">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full" style={{ background: "#078250" }} aria-hidden="true" />
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Updated daily
            </span>
          </div>
          <ComplianceHighlight
            label="Easy-to-read text"
            explanation="The big dark words sit on a light background, so they are simple to see. A person with weak eyesight can read this without squinting."
            wcagId="1.4.3"
            wcagName="Contrast (Minimum)"
            position="bottom"
            className="mb-4 mx-auto"
          >
            <h1
              className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight"
              style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
            >
              ADA & WCAG, in plain English
            </h1>
          </ComplianceHighlight>
          <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
            Lawsuit breakdowns, state-by-state guides, and the practical things business owners actually need to know.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            No posts yet. Check back soon.
          </div>
        ) : (
          <ul className="space-y-4" role="list">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="block rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-md transition-all focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                >
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} aria-hidden="true" />
                      {formatDate(p.date)}
                    </span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} aria-hidden="true" />
                      {p.readingTime} min read
                    </span>
                    {p.tags.length > 0 && (
                      <>
                        <span className="text-slate-300" aria-hidden="true">·</span>
                        <span className="inline-flex flex-wrap gap-1.5">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full"
                            >
                              {t}
                            </span>
                          ))}
                        </span>
                      </>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2 leading-snug">
                    {p.title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed text-sm mb-3">{p.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                    Read post <ArrowRight size={13} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
