import { ComplianceBadge } from "./ComplianceBadge"
import type { ComplianceRequirement } from "@/lib/compliance-data"
import { CheckCircle } from "lucide-react"

interface ComplianceCardProps {
  requirement: ComplianceRequirement
}

export function ComplianceCard({ requirement }: ComplianceCardProps) {
  const levelColor =
    requirement.wcagLevel.startsWith("A") && !requirement.wcagLevel.startsWith("AA")
      ? "text-[var(--green)]"
      : requirement.wcagLevel.startsWith("AA")
      ? "text-[var(--blue)]"
      : "text-purple-400"

  return (
    <article
      id={`wcag-${requirement.id}`}
      className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--blue)]/40 transition-colors scroll-mt-24"
      aria-labelledby={`card-${requirement.id}`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <CheckCircle size={16} className="text-[var(--green)] shrink-0 mt-0.5" aria-hidden="true" />
          <h3
            id={`card-${requirement.id}`}
            className="font-semibold text-[var(--foreground)] text-sm"
          >
            {requirement.name}
          </h3>
        </div>
        <ComplianceBadge
          criterionId={requirement.wcagCriterion}
          criterionName={requirement.name}
          wcagLevel={requirement.wcagLevel.split(" ")[0] as "A" | "AA" | "AAA"}
          plainEnglish={requirement.plainEnglish}
          legalText={requirement.legalText}
          lawsuits={requirement.lawsuits}
          position="bottom"
        />
      </div>

      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
        {requirement.plainEnglish}
      </p>

      {requirement.lawsuits.length > 0 && (
        <div className="mt-4 rounded-lg border border-[var(--fail)]/20 bg-[var(--fail)]/5 p-3">
          <p className="text-xs font-semibold text-red-700 mb-1">
            {requirement.lawsuits.length} notable lawsuit{requirement.lawsuits.length > 1 ? "s" : ""}
          </p>
          <p className="text-xs text-slate-600">
            {requirement.lawsuits[0].case} ({requirement.lawsuits[0].year})
          </p>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <span className={`text-xs font-mono font-semibold ${levelColor}`}>
          Level {requirement.wcagLevel.split(" ")[0]}
        </span>
        <span className="text-[var(--border)] text-xs">·</span>
        <span className="text-xs text-[var(--muted-foreground)] capitalize">
          {requirement.category}
        </span>
      </div>
    </article>
  )
}
