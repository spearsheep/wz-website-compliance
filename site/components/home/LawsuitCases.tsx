import { lawsuitCases } from "@/lib/compliance-data"
import { DollarSign, Calendar, MapPin, Gavel } from "lucide-react"

export function LawsuitCases() {
  return (
    <section aria-labelledby="cases-heading" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--fail)] mb-3">
            Real Consequences
          </p>
          <h2
            id="cases-heading"
            className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4"
          >
            Companies that paid the price
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
            These are not edge cases. They are household names that failed to make their websites accessible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lawsuitCases.map((c) => (
            <article
              key={c.name}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--fail)]/30 transition-colors"
              aria-label={`${c.company} lawsuit: ${c.name}`}
            >
              {/* Amount */}
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-full p-2 bg-[var(--fail)]/10">
                  <DollarSign size={16} className="text-[var(--fail)]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-[var(--fail)] text-lg leading-none">{c.amount}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{c.amountDetail}</p>
                </div>
              </div>

              <h3 className="font-semibold text-[var(--foreground)] text-base mb-1">{c.company}</h3>
              <p className="text-xs text-[var(--muted-foreground)] font-mono mb-4">{c.name}</p>

              <div className="space-y-2 mb-4">
                {c.violations.map((v) => (
                  <div key={v} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--fail)] shrink-0" aria-hidden="true" />
                    <span className="text-xs text-[var(--muted-foreground)]">{v}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--border)] pt-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                  <Calendar size={12} aria-hidden="true" />
                  <span>Filed {c.year} · Settled {c.settled}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                  <MapPin size={12} aria-hidden="true" />
                  <span>{c.jurisdiction}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                  <Gavel size={12} aria-hidden="true" />
                  <span>{c.law}</span>
                </div>
              </div>

              <p className="mt-4 text-xs text-[var(--muted-foreground)] leading-relaxed italic border-l-2 border-[var(--blue)]/40 pl-3">
                {c.significance}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
