import type { Metadata } from "next"
import Link from "next/link"
import { Search, Wrench, Building2, RefreshCw, Check, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Services — ADA Compliance Audit, Fix, Rebuild & Maintenance",
  description:
    "Four service tiers to get your website ADA compliant: Audit, Fix, Full Rebuild, and Quarterly Maintenance.",
}

const services = [
  {
    id: "audit",
    icon: Search,
    title: "Accessibility Audit",
    tagline: "Know exactly where you stand",
    description:
      "A full WCAG 2.1 Level AA scan of your entire website. We document every violation with severity ratings (critical / major / minor), screenshots of the issue, the exact WCAG criterion violated, and step-by-step remediation guidance.",
    deliverables: [
      "Detailed PDF report with every violation",
      "Severity ratings: Critical, Major, Minor",
      "Screenshots of each accessibility barrier",
      "Remediation guidance for each item",
      "Jurisdiction exposure summary (CA, NY, FL, Federal)",
      "Estimated attorney-fee exposure",
    ],
    timeline: "48–72 hours",
    bestFor: "Businesses that want to understand their risk before committing to fixes",
    color: "var(--blue)",
    borderHover: "hover:border-[var(--blue)]/50",
  },
  {
    id: "fix",
    icon: Wrench,
    title: "Fix & Remediation",
    tagline: "Targeted, efficient, minimal disruption",
    description:
      "We fix the specific violations identified in your audit — or any known list of issues. No unnecessary work. We work directly in your existing codebase and content management system, producing compliant code without rebuilding.",
    deliverables: [
      "All critical violations fixed",
      "Alt text for all images",
      "Color contrast remediation",
      "Keyboard navigation fixes",
      "Form label and error message fixes",
      "ARIA roles and landmark implementation",
      "Before/after compliance report",
    ],
    timeline: "1–2 weeks depending on scope",
    bestFor: "Sites with a known set of violations that are otherwise well-built",
    color: "var(--green)",
    borderHover: "hover:border-[var(--green)]/50",
  },
  {
    id: "rebuild",
    icon: Building2,
    title: "Full Compliance Rebuild",
    tagline: "Compliance from the ground up",
    description:
      "For websites with systemic accessibility issues — often older sites, sites built without accessibility in mind, or sites with deeply embedded third-party components. We rebuild with WCAG 2.1 AA compliance at every layer: code, content, design, and interactive behavior.",
    deliverables: [
      "Full site rebuild to WCAG 2.1 AA",
      "Semantic HTML structure",
      "Accessible design system",
      "Keyboard-navigable all components",
      "Screen reader tested",
      "PDF/document accessibility",
      "VPAT documentation",
      "Post-launch compliance certification",
    ],
    timeline: "4–8 weeks depending on site size",
    bestFor: "Sites with pervasive violations, or businesses with high legal exposure",
    color: "#a78bfa",
    borderHover: "hover:border-purple-400/50",
  },
  {
    id: "maintenance",
    icon: RefreshCw,
    title: "Quarterly Maintenance",
    tagline: "Stay protected as your site evolves",
    description:
      "Compliance isn't a one-time fix — new content, features, and third-party integrations introduce new violations. Our quarterly maintenance service monitors your site continuously and ensures new additions stay compliant.",
    deliverables: [
      "Quarterly full-site compliance scan",
      "New violation identification and fixes",
      "New content compliance review",
      "Third-party widget assessment",
      "Ongoing legal landscape monitoring",
      "Quarterly compliance report",
      "Priority response for critical violations",
    ],
    timeline: "Ongoing — quarterly cycle",
    bestFor: "Businesses that publish new content regularly or want ongoing legal protection",
    color: "#fbbf24",
    borderHover: "hover:border-amber-400/50",
  },
]

export default function ServicesPage() {
  return (
    <div className="py-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
            Four ways to get <span className="text-[var(--green)]">compliant</span>
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-lg">
            Whether you want to understand your risk or want full long-term protection, we have a service for every business and budget.
          </p>
        </div>

        {/* Service cards */}
        <div className="space-y-8">
          {services.map(({ id, icon: Icon, title, tagline, description, deliverables, timeline, bestFor, color, borderHover }) => (
            <article
              key={id}
              id={id}
              className={`rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 md:p-10 transition-colors ${borderHover}`}
              aria-labelledby={`service-${id}`}
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left */}
                <div className="md:w-2/5">
                  <div className="inline-flex rounded-xl p-3 mb-4" style={{ backgroundColor: `${color}15` }}>
                    <Icon size={24} style={{ color }} aria-hidden="true" />
                  </div>
                  <h2 id={`service-${id}`} className="text-2xl font-bold text-[var(--foreground)] mb-1">
                    {title}
                  </h2>
                  <p className="text-sm font-semibold mb-4" style={{ color }}>{tagline}</p>
                  <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">{description}</p>
                  <div className="space-y-2 text-sm text-[var(--muted-foreground)]">
                    <div>
                      <span className="font-semibold text-[var(--foreground)]">Timeline:</span> {timeline}
                    </div>
                    <div>
                      <span className="font-semibold text-[var(--foreground)]">Best for:</span> {bestFor}
                    </div>
                  </div>
                </div>

                {/* Right — deliverables */}
                <div className="md:w-3/5">
                  <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider mb-4">
                    What&apos;s included
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="list">
                    {deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <Check size={15} className="mt-0.5 shrink-0" style={{ color }} aria-hidden="true" />
                        <span className="text-sm text-[var(--muted-foreground)]">{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                      style={{ backgroundColor: color as string }}
                    >
                      Get Started
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                    <Link
                      href="/pricing"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-6 py-3 text-sm font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--blue)] focus-visible:outline-offset-2"
                    >
                      See Pricing
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl border border-[var(--blue)]/30 bg-[var(--blue)]/5 p-10 text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">
            Not sure which service you need?
          </h2>
          <p className="text-[var(--muted-foreground)] mb-6 max-w-lg mx-auto">
            Start with a free audit. We&apos;ll show you exactly what&apos;s wrong and recommend the right-sized fix — no overselling.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--blue)] px-8 py-4 font-semibold text-white hover:bg-blue-600 transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Start with a Free Audit
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}
