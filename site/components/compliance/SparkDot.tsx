"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { ArrowRight } from "lucide-react"

interface SparkDotProps {
  /** WCAG criterion ID, e.g. "2.4.6" */
  criterionId: string
  criterionName: string
  wcagLevel: "A" | "AA" | "AAA"
  /** One-sentence plain-language explanation of why this element is compliant */
  summary: string
  /** Where the tooltip should appear relative to the dot */
  position?: "top" | "bottom" | "left" | "right"
  color?: "green" | "blue"
}

const levelColors = {
  A: "bg-emerald-50 text-emerald-700",
  AA: "bg-blue-50 text-blue-700",
  AAA: "bg-purple-50 text-purple-700",
}

export function SparkDot({
  criterionId,
  criterionName,
  wcagLevel,
  summary,
  position = "top",
  color = "green",
}: SparkDotProps) {
  const [open, setOpen] = useState(false)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapperRef = useRef<HTMLSpanElement>(null)

  const dotColor = color === "green" ? "#0DAB66" : "#015DF1"
  const ringColor =
    color === "green"
      ? "rgba(13, 171, 102, 0.35)"
      : "rgba(1, 93, 241, 0.35)"

  const show = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    setOpen(true)
  }
  const hideSoon = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setOpen(false), 120)
  }

  // Close on Escape / outside click
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
    top: { bottom: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)" },
    left: { right: "calc(100% + 12px)", top: "50%", transform: "translateY(-50%)" },
    right: { left: "calc(100% + 12px)", top: "50%", transform: "translateY(-50%)" },
  }

  return (
    <span
      ref={wrapperRef}
      className="relative inline-flex items-center justify-center"
      onMouseEnter={show}
      onMouseLeave={hideSoon}
      style={{ width: 20, height: 20 }}
    >
      {/* The dot itself — keyboard accessible */}
      <button
        type="button"
        aria-label={`Why this is compliant: WCAG ${criterionId} ${criterionName}. Press Enter to read more.`}
        aria-expanded={open}
        onFocus={show}
        onBlur={hideSoon}
        onClick={() => setOpen((v) => !v)}
        className="relative inline-flex items-center justify-center rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        style={{ width: 20, height: 20 }}
      >
        <span
          className="spark-ping absolute inset-0 rounded-full"
          style={{ backgroundColor: ringColor }}
          aria-hidden="true"
        />
        <span
          className="spark-core relative rounded-full z-10"
          style={{ width: 10, height: 10, backgroundColor: dotColor }}
          aria-hidden="true"
        />
      </button>

      {/* Hover/focus tooltip — interactive, contains the Learn more link */}
      {open && (
        <div
          role="tooltip"
          className="absolute z-[60]"
          style={tooltipStyles[position]}
          onMouseEnter={show}
          onMouseLeave={hideSoon}
        >
          <div
            className="bg-white rounded-2xl border border-slate-200 shadow-xl px-4 py-3 text-left"
            style={{ width: 280 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: dotColor }}
                aria-hidden="true"
              />
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                WCAG {criterionId}
              </span>
              <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${levelColors[wcagLevel]}`}>
                {wcagLevel}
              </span>
            </div>
            <p className="text-[13px] font-semibold text-slate-900 mb-1 leading-snug">
              {criterionName}
            </p>
            <p className="text-[12.5px] text-slate-600 leading-relaxed mb-3">
              {summary}
            </p>
            <Link
              href={`/compliance#wcag-${criterionId}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded"
            >
              Learn more
              <ArrowRight size={12} aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </span>
  )
}
