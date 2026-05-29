import type { Metadata } from "next"
import Link from "next/link"
import { Shield, Target, Users, ArrowRight } from "lucide-react"
import { ComplianceHighlight } from "@/components/compliance/ComplianceHighlight"

export const metadata: Metadata = {
  title: "About",
  description: "About JustCompliant's web accessibility compliance service.",
}

const values = [
  {
    icon: Shield,
    title: "Compliance-first",
    description: "We don't retrofit accessibility — we build it in from the start. Every fix is grounded in the actual WCAG criterion, not a surface-level patch.",
  },
  {
    icon: Target,
    title: "Legally precise",
    description: "We know the difference between what a California court will accept and what a federal court requires. Our remediations are defensible.",
  },
  {
    icon: Users,
    title: "Built for real businesses",
    description: "Our clients are businesses, not governments. We work with the constraints of your existing site, CMS, and timelines.",
  },
]

export default function AboutPage() {
  return (
    <div className="py-16 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <ComplianceHighlight
            label="Easy-to-read text"
            explanation="The big dark words sit on a light background, so they are simple to see. A person with weak eyesight can read this without squinting."
            wcagId="1.4.3"
            wcagName="Contrast (Minimum)"
            position="bottom"
            className="mb-6 mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)]">
              The web should work for{" "}
              <span className="text-[var(--green)]">everyone</span>
            </h1>
          </ComplianceHighlight>
          <p className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-2xl mx-auto">
            JustCompliant began with a simple realization: how many websites — including our own in early versions — failed the people who needed them most. Compliance became our mission because we saw firsthand what inaccessibility costs: users who couldn&apos;t complete a task, and businesses that didn&apos;t know they were exposed.
          </p>
        </div>

        {/* The problem */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Why this matters now</h2>
          <div className="space-y-4 text-[var(--muted-foreground)] leading-relaxed">
            <p>
              The Department of Justice finalized its WCAG 2.1 AA rule for government entities in 2024. A parallel rule for private businesses is expected. Meanwhile, plaintiff attorneys file thousands of ADA web cases every year — and 90% of websites give them plenty to work with.
            </p>
            <p>
              California&apos;s Unruh Act allows $4,000 per violation. A single page with five accessibility issues, visited once by a disabled user, is a $20,000 exposure. For a business that gets 10,000 page views a month, the math becomes catastrophic.
            </p>
            <p>
              Most businesses don&apos;t know their site is non-compliant until they receive a demand letter. By then, they&apos;re already paying attorney&apos;s fees. We exist so that doesn&apos;t happen to you.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {values.map(({ icon: Icon, title, description }) => (
            <div key={title} className="text-center p-6">
              <div className="inline-flex rounded-full p-4 bg-[var(--accent)] mb-4">
                <Icon size={22} className="text-[var(--blue)]" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">{title}</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* This site */}
        <div className="rounded-2xl border border-[var(--green)]/30 bg-[var(--green)]/5 p-8 mb-12">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">
            This website is our proof of work
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Every page on this site meets WCAG 2.1 Level AA. We built the compliance badges you see throughout the site so visitors can inspect exactly what makes each element compliant — the WCAG criterion, the governing law, and the real lawsuits that have enforced it. We don&apos;t just tell you compliance matters. We show you, in real time, what it looks like.
          </p>
          <p className="text-sm text-slate-600">
            Press Tab to see the skip navigation link. Check any image for its alt text. Use a screen reader — it works.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Ready to get started?</h2>
          <p className="text-[var(--muted-foreground)] mb-6">
            A free audit takes 48 hours and tells you exactly where you stand.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--blue)] px-8 py-4 font-semibold text-white hover:bg-blue-600 transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Request a Free Audit
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}
