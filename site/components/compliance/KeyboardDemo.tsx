"use client"

import { useState, useEffect } from "react"
import { ComplianceBadge } from "./ComplianceBadge"

const focusStops = [
  { label: "Skip to main content", type: "skip" },
  { label: "Home", type: "nav" },
  { label: "Services", type: "nav" },
  { label: "Compliance Guide", type: "nav" },
  { label: "Get Free Audit", type: "cta" },
  { label: "Hero CTA", type: "cta" },
  { label: "Read case study", type: "link" },
]

export function KeyboardDemo() {
  const [currentFocus, setCurrentFocus] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    const interval = setInterval(() => {
      setCurrentFocus((prev) => {
        if (prev >= focusStops.length - 1) {
          setPlaying(false)
          return 0
        }
        return prev + 1
      })
    }, 700)
    return () => clearInterval(interval)
  }, [playing])

  const typeColor = {
    skip: "border-[var(--green)] bg-[var(--green)]/20 text-[var(--green)]",
    nav: "border-[var(--blue)] bg-[var(--blue)]/20 text-[var(--blue)]",
    cta: "border-purple-400 bg-purple-400/20 text-purple-300",
    link: "border-amber-400 bg-amber-400/20 text-amber-300",
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[var(--foreground)] text-sm">Keyboard Navigation Demo</h3>
        <ComplianceBadge
          criterionId="2.1.1"
          criterionName="Keyboard Accessible"
          wcagLevel="A"
          plainEnglish="Every function on your website must work using only a keyboard — Tab, Enter, arrow keys — without requiring a mouse. This is essential for people with motor disabilities and blind users who rely on screen readers."
          legalText="WCAG 2.1 SC 2.1.1: 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.' Applied under ADA Title III (42 U.S.C. § 12181)."
          lawsuits={[
            {
              case: "Robles v. Domino's Pizza LLC",
              year: 2016,
              jurisdiction: "9th Circuit (California)",
              outcome: "Keyboard inaccessibility of ordering functionality was cited. 9th Circuit ruled for plaintiff in 2019.",
            },
          ]}
          position="bottom"
        />
      </div>

      <p className="text-xs text-[var(--muted-foreground)] mb-4">
        When a user presses <kbd className="px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--accent)] text-xs font-mono">Tab</kbd>, focus moves through each interactive element in order. Click play to simulate.
      </p>

      {/* Focus visualization */}
      <div
        className="space-y-2 mb-4"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Currently focused: ${focusStops[currentFocus].label}`}
      >
        {focusStops.map((stop, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-xs font-medium transition-all duration-200 ${
              i === currentFocus
                ? typeColor[stop.type as keyof typeof typeColor]
                : "border-transparent bg-[var(--accent)]/30 text-[var(--muted-foreground)]"
            }`}
            aria-hidden="true"
          >
            <span className="font-mono text-[10px] w-4 text-center opacity-60">{i + 1}</span>
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                i === currentFocus ? "bg-current" : "bg-[var(--border)]"
              }`}
            />
            {stop.label}
            {i === currentFocus && (
              <span className="ml-auto font-mono text-[10px] opacity-60">← focused</span>
            )}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={() => { setCurrentFocus(0); setPlaying(true) }}
          disabled={playing}
          aria-label="Play keyboard navigation simulation"
          className="flex-1 rounded-lg bg-[var(--blue)] px-4 py-2 text-xs font-semibold text-white disabled:opacity-50 hover:bg-blue-600 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          {playing ? "Simulating Tab key…" : "▶ Simulate Tab Navigation"}
        </button>
        <button
          onClick={() => { setPlaying(false); setCurrentFocus(0) }}
          aria-label="Reset simulation"
          className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--blue)] focus-visible:outline-offset-2"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
