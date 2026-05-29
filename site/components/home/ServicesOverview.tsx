import Link from "next/link"
import { Search, Wrench, Building2, RefreshCw, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Search,
    title: "Accessibility Audit",
    id: "audit",
    description:
      "Full WCAG 2.1 AA scan of your entire site. We document every violation with severity ratings, screenshots, and remediation guidance.",
    highlight: "Know your risk",
    color: "text-[var(--blue)]",
    border: "hover:border-[var(--blue)]/50",
  },
  {
    icon: Wrench,
    title: "Fix & Remediation",
    id: "fix",
    description:
      "We fix the specific violations identified in your audit. Targeted, efficient, minimal disruption to your existing site and workflows.",
    highlight: "Targeted fixes",
    color: "text-[var(--green)]",
    border: "hover:border-[var(--green)]/50",
  },
  {
    icon: Building2,
    title: "Full Compliance Rebuild",
    id: "rebuild",
    description:
      "For sites with systemic issues, we rebuild from the ground up with compliance baked in at every layer — code, content, and design.",
    highlight: "Clean slate",
    color: "text-purple-400",
    border: "hover:border-purple-400/50",
  },
  {
    icon: RefreshCw,
    title: "Quarterly Maintenance",
    id: "maintenance",
    description:
      "Ongoing compliance monitoring and fixes. As you add new content and features, we ensure you stay protected against new exposure.",
    highlight: "Ongoing protection",
    color: "text-amber-700",
    border: "hover:border-amber-700/50",
  },
]

export function ServicesOverview() {
  return (
    <section aria-labelledby="services-heading" className="py-24 px-6 bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--blue)] mb-3">
            How We Help
          </p>
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4"
          >
            Four ways to get compliant
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
            Whether you need to know your risk or want comprehensive protection, we have a service tier for every business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(({ icon: Icon, title, id, description, highlight, color, border }) => (
            <article
              key={id}
              className={`rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all ${border} hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5`}
            >
              <div className={`inline-flex rounded-xl p-3 mb-4 bg-[var(--accent)]`}>
                <Icon size={22} className={color} aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">{title}</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">{description}</p>
              <span className={`text-xs font-semibold ${color}`}>{highlight} →</span>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--blue)] hover:text-blue-400 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--blue)] focus-visible:outline-offset-2 rounded"
          >
            View detailed service breakdown
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
