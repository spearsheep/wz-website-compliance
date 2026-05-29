"use client"

import { useState, useRef, useEffect, useId } from "react"
import { Check } from "lucide-react"

interface ComplianceHighlightProps {
  /** Short plain-English label shown on the always-visible chip, e.g. "Easy-to-read text" */
  label: string
  /**
   * One or two sentences a middle-school student could understand.
   * Explain WHAT is good here and WHY it helps a real person.
   */
  explanation: string
  /** Optional WCAG reference, shown small at the bottom for credibility. e.g. "1.4.3" */
  wcagId?: string
  wcagName?: string
  /** Where the tooltip appears relative to the highlighted area */
  position?: "top" | "bottom" | "left" | "right"
  children: React.ReactNode
  /** Extra classes for the wrapper (e.g. layout helpers) */
  className?: string
}

/**
 * ComplianceHighlight — wraps a region of the page that is accessibility-compliant.
 *
 * It does three things the old tiny SparkDot could not:
 *  1. Draws an always-visible dashed green outline so you can SEE the compliant area.
 *  2. Shows a small "✓ compliant" chip so it reads as intentional, not a glitch.
 *  3. Pops a plain-language tooltip when the mouse hovers anywhere in the area
 *     (not just on a 10px dot), or when a keyboard user tabs to it.
 */
export function ComplianceHighlight({
  label,
  explanation,
  wcagId,
  wcagName,
  position = "top",
  children,
  className = "",
}: ComplianceHighlightProps) {
  const [open, setOpen] = useState(false)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const tooltipId = useId()

  const show = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    setOpen(true)
  }
  const hideSoon = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setOpen(false), 120)
  }

  // Close on Escape / outside click — same pattern as SparkDot.
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onClickOutside)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onClickOutside)
    }
  }, [open])

  const tooltipStyles: Record<string, React.CSSProperties> = {
    top: { bottom: "calc(100% + 14px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 14px)", left: "50%", transform: "translateX(-50%)" },
    left: { right: "calc(100% + 14px)", top: "50%", transform: "translateY(-50%)" },
    right: { left: "calc(100% + 14px)", top: "50%", transform: "translateY(-50%)" },
  }

  return (
    <span
      ref={wrapperRef}
      className={`compliance-highlight relative block w-fit ${className}`}
      onMouseEnter={show}
      onMouseLeave={hideSoon}
    >
      {/* Content area — non-interactive wrapper with dashed outline */}
      <span
        className="group relative block w-full text-left rounded-[14px] transition-colors"
        style={{
          outline: "2px dashed rgba(7, 130, 80, 0.55)",
          outlineOffset: "6px",
          background: open ? "rgba(7, 130, 80, 0.06)" : "transparent",
        }}
      >
        {children}

        {/* Compliant chip — this IS the interactive trigger */}
        <button
          type="button"
          aria-label={`Compliant: ${label}. ${explanation}`}
          aria-expanded={open}
          aria-describedby={open ? tooltipId : undefined}
          onFocus={show}
          onBlur={hideSoon}
          onClick={() => setOpen((v) => !v)}
          className="absolute -top-2.5 -right-2.5 inline-flex items-center gap-1 rounded-full bg-emerald-700 px-2 py-0.5 shadow-md cursor-help focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <Check size={11} strokeWidth={3.5} className="text-white" aria-hidden="true" />
          <span className="text-[10px] font-bold uppercase tracking-wide text-white">
            {label}
          </span>
        </button>
      </span>

      {/* Plain-language tooltip — appears on hover of the whole area or keyboard focus */}
      {open && (
        <div
          id={tooltipId}
          role="tooltip"
          className="absolute z-[60]"
          style={tooltipStyles[position]}
          onMouseEnter={show}
          onMouseLeave={hideSoon}
        >
          <div
            className="rounded-2xl border border-emerald-200 bg-white px-4 py-3.5 text-left shadow-xl"
            style={{ width: 290 }}
          >
            <div className="mb-1.5 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-700">
                <Check size={12} strokeWidth={3.5} className="text-white" aria-hidden="true" />
              </span>
              <span className="text-[13px] font-bold text-slate-900">{label}</span>
            </div>
            <p className="text-[12.5px] leading-relaxed text-slate-600">{explanation}</p>
            {wcagId && (
              <p className="mt-2 text-[10.5px] font-medium uppercase tracking-wider text-slate-400">
                Rule: WCAG {wcagId}
                {wcagName ? ` · ${wcagName}` : ""}
              </p>
            )}
          </div>
        </div>
      )}
    </span>
  )
}
