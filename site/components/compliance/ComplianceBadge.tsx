"use client"

import { useState, useRef } from "react"
import { Info } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface Lawsuit {
  case: string
  year: number | string
  jurisdiction: string
  outcome: string
}

interface ComplianceBadgeProps {
  criterionId: string
  criterionName: string
  wcagLevel: "A" | "AA" | "AAA"
  plainEnglish: string
  legalText: string
  lawsuits?: Lawsuit[]
  position?: "top" | "bottom" | "left" | "right"
  className?: string
}

export function ComplianceBadge({
  criterionId,
  criterionName,
  wcagLevel,
  plainEnglish,
  legalText,
  lawsuits = [],
  position = "top",
  className = "",
}: ComplianceBadgeProps) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const id = `badge-${criterionId.toLowerCase().replace(/\W/g, "-")}`

  const levelColor =
    wcagLevel === "A"
      ? "text-[var(--green)] border-[var(--green)]/30 bg-[var(--green)]/10"
      : wcagLevel === "AA"
      ? "text-[var(--blue)] border-[var(--blue)]/30 bg-[var(--blue)]/10"
      : "text-purple-400 border-purple-400/30 bg-purple-400/10"

  return (
    <span className={`relative inline-flex items-center ${className}`}>
      <button
        ref={buttonRef}
        aria-label={`View compliance info for ${criterionName} (WCAG ${criterionId})`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        onBlur={(e) => {
          if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
            setOpen(false)
          }
        }}
        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-mono font-semibold transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--blue)] focus-visible:outline-offset-2 hover:opacity-80 ${levelColor}`}
      >
        <Info size={10} aria-hidden="true" />
        {criterionId}
      </button>

      {open && (
        <>
          {/* Backdrop to close on outside click */}
          <span
            className="fixed inset-0 z-40"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div
            id={id}
            role="dialog"
            aria-label={`${criterionName} compliance details`}
            className={`absolute z-50 w-80 rounded-xl border border-[var(--border)] bg-[var(--popover)] shadow-2xl shadow-black/50 ${
              position === "top"
                ? "bottom-full mb-2 left-1/2 -translate-x-1/2"
                : position === "bottom"
                ? "top-full mt-2 left-1/2 -translate-x-1/2"
                : position === "left"
                ? "right-full mr-2 top-1/2 -translate-y-1/2"
                : "left-full ml-2 top-1/2 -translate-y-1/2"
            }`}
          >
            {/* Header */}
            <div className="border-b border-[var(--border)] px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--foreground)]">{criterionName}</span>
                <span className={`rounded-full border px-2 py-0.5 text-xs font-mono font-bold ${levelColor}`}>
                  WCAG {criterionId} · Level {wcagLevel}
                </span>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="plain" className="w-full">
              <TabsList className="w-full rounded-none border-b border-[var(--border)] bg-transparent h-auto p-0">
                <TabsTrigger
                  value="plain"
                  className="flex-1 rounded-none border-b-2 border-transparent py-2 text-xs font-medium text-[var(--muted-foreground)] data-[state=active]:border-[var(--green)] data-[state=active]:text-[var(--green)] data-[state=active]:bg-transparent"
                >
                  Plain English
                </TabsTrigger>
                <TabsTrigger
                  value="legal"
                  className="flex-1 rounded-none border-b-2 border-transparent py-2 text-xs font-medium text-[var(--muted-foreground)] data-[state=active]:border-[var(--blue)] data-[state=active]:text-[var(--blue)] data-[state=active]:bg-transparent"
                >
                  Legal
                </TabsTrigger>
              </TabsList>

              <TabsContent value="plain" className="px-4 py-3 m-0">
                <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">{plainEnglish}</p>
              </TabsContent>

              <TabsContent value="legal" className="px-4 py-3 m-0 space-y-3">
                <p className="text-xs leading-relaxed text-[var(--muted-foreground)] font-mono">{legalText}</p>
                {lawsuits.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider">Notable Cases</p>
                    {lawsuits.slice(0, 2).map((l, i) => (
                      <div key={i} className="rounded-lg border border-[var(--border)] bg-[var(--accent)] p-2">
                        <p className="text-xs font-semibold text-[var(--foreground)]">{l.case} ({l.year})</p>
                        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{l.jurisdiction}</p>
                        <p className="text-xs text-[var(--muted-foreground)] mt-1 leading-relaxed">{l.outcome}</p>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </span>
  )
}
