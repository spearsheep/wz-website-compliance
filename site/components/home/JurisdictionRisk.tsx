import { jurisdictionData } from "@/lib/compliance-data"
import { AlertTriangle, Info } from "lucide-react"

const severityLabel: Record<string, string> = {
  highest: "Highest Risk",
  high: "High Risk",
  medium: "Moderate Risk",
  low: "Base Risk",
}

const severityBg: Record<string, string> = {
  highest: "border-[var(--fail)]/40 bg-[var(--fail)]/5",
  high: "border-amber-500/40 bg-amber-500/5",
  medium: "border-blue-400/40 bg-blue-400/5",
  low: "border-purple-400/40 bg-purple-400/5",
}

export function JurisdictionRisk() {
  return (
    <section aria-labelledby="jurisdiction-heading" className="py-24 px-6 bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            Know Your Exposure
          </p>
          <h2
            id="jurisdiction-heading"
            className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4"
          >
            Your liability depends on where your customers are
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Federal law sets the baseline. State laws stack on top — and California, New York, and Florida each have different rules. You can be sued in any state where your users are located.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {jurisdictionData.map((j) => (
            <article
              key={j.name}
              className={`rounded-xl border p-6 transition-colors ${severityBg[j.severity]}`}
              aria-labelledby={`jurisdiction-${j.name}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl" aria-hidden="true">{j.flag}</span>
                <span
                  className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={{ color: j.color, backgroundColor: `${j.color}15` }}
                >
                  {severityLabel[j.severity]}
                </span>
              </div>

              <h3
                id={`jurisdiction-${j.name}`}
                className="font-bold text-[var(--foreground)] text-lg mb-0.5"
              >
                {j.name}
              </h3>
              <p className="text-xs text-[var(--muted-foreground)] font-mono mb-3">{j.citation}</p>

              <div className="mb-4">
                <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">Damages</p>
                <p className="font-bold text-2xl" style={{ color: j.color }}>
                  {j.damage}
                </p>
                <p className="text-xs text-[var(--muted-foreground)]">{j.damageNote}</p>
              </div>

              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{j.detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-[var(--blue)]/30 bg-[var(--blue)]/5 p-5 flex items-start gap-3">
          <Info size={16} className="text-[var(--blue)] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
            <span className="font-semibold text-[var(--foreground)]">The good news:</span>{" "}
            WCAG 2.1 Level AA compliance satisfies all four jurisdictions simultaneously. One fix, total protection.{" "}
            <span className="font-semibold text-[var(--blue)]">That&apos;s exactly what we deliver.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
