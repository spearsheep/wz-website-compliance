"use client"

import { useState } from "react"
import { ComplianceBadge } from "./ComplianceBadge"
import { CheckCircle, XCircle } from "lucide-react"

const contrastExamples = [
  { ratio: 1.5, bg: "#3a3a3a", text: "#4a4a4a", label: "1.5:1 — Fails all" },
  { ratio: 2.8, bg: "#4a90a4", text: "#7bbfd4", label: "2.8:1 — Fails AA" },
  { ratio: 3.2, bg: "#2563eb", text: "#93c5fd", label: "3.2:1 — Passes large text only" },
  { ratio: 4.6, bg: "#1e293b", text: "#94a3b8", label: "4.6:1 — Passes AA (normal text)" },
  { ratio: 7.1, bg: "#051636", text: "#fefefe", label: "7.1:1 — Passes AAA" },
]

function getStatus(ratio: number, isLargeText: boolean) {
  if (isLargeText) {
    if (ratio >= 4.5) return { pass: true, label: "Passes AAA" }
    if (ratio >= 3.0) return { pass: true, label: "Passes AA (large text)" }
    return { pass: false, label: "Fails" }
  } else {
    if (ratio >= 7.0) return { pass: true, label: "Passes AAA" }
    if (ratio >= 4.5) return { pass: true, label: "Passes AA" }
    if (ratio >= 3.0) return { pass: false, label: "Fails AA (needs 4.5:1)" }
    return { pass: false, label: "Fails" }
  }
}

export function ContrastDemo() {
  const [selected, setSelected] = useState(3)
  const [largeText, setLargeText] = useState(false)
  const example = contrastExamples[selected]
  const status = getStatus(example.ratio, largeText)

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[var(--foreground)] text-sm">Color Contrast Demo</h3>
        <ComplianceBadge
          criterionId="1.4.3"
          criterionName="Color Contrast (Text)"
          wcagLevel="AA"
          plainEnglish="Text on your website must be easy to read against its background. Small text needs a contrast ratio of at least 4.5:1, and large text (18pt or 14pt bold) needs at least 3:1."
          legalText="WCAG 2.1 SC 1.4.3: 'The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for Large Text which requires at least 3:1.' Applied under ADA Title III (42 U.S.C. § 12181)."
          lawsuits={[
            {
              case: "Robles v. Domino's Pizza LLC",
              year: 2016,
              jurisdiction: "9th Circuit (California)",
              outcome: "9th Circuit ruled ADA applies to websites. Color contrast was among cited barriers. Settled after Supreme Court denied certiorari.",
            },
          ]}
          position="bottom"
        />
      </div>

      {/* Preview box */}
      <div
        className="rounded-lg p-6 mb-4 transition-all duration-300"
        style={{ backgroundColor: example.bg }}
        aria-label={`Example text at ${example.ratio}:1 contrast ratio`}
      >
        <p
          className={`font-medium transition-all duration-300 ${largeText ? "text-2xl" : "text-base"}`}
          style={{ color: example.text }}
        >
          {largeText ? "Sample large text" : "Sample body text — can you read this clearly?"}
        </p>
        <p className="text-xs mt-2" style={{ color: example.text, opacity: 0.9 }}>
          Contrast ratio: {example.ratio}:1
        </p>
      </div>

      {/* Pass/Fail indicator */}
      <div
        className={`flex items-center gap-2 rounded-lg px-4 py-3 mb-4 ${
          status.pass
            ? "bg-[var(--green)]/10 border border-[var(--green)]/30"
            : "bg-[var(--fail)]/10 border border-[var(--fail)]/30"
        }`}
        role="status"
        aria-live="polite"
      >
        {status.pass ? (
          <CheckCircle size={16} className="text-[#065F3B]" aria-hidden="true" />
        ) : (
          <XCircle size={16} className="text-red-700" aria-hidden="true" />
        )}
        <span className={`text-sm font-semibold ${status.pass ? "text-[#065F3B]" : "text-red-700"}`}>
          {status.label}
        </span>
        <span className="text-xs text-slate-600 ml-auto">
          {example.ratio}:1
        </span>
      </div>

      {/* Slider */}
      <div className="space-y-2">
        <label htmlFor="contrast-slider" className="text-xs text-[var(--muted-foreground)]">
          Adjust contrast ratio:
        </label>
        <input
          id="contrast-slider"
          type="range"
          min={0}
          max={contrastExamples.length - 1}
          value={selected}
          onChange={(e) => setSelected(Number(e.target.value))}
          className="w-full accent-[#015DF1]"
          aria-valuetext={example.label}
        />
        <div className="flex justify-between text-xs text-[var(--muted-foreground)]">
          <span>Low</span>
          <span>{example.label}</span>
          <span>High</span>
        </div>
      </div>

      {/* Large text toggle */}
      <div className="mt-4 flex items-center gap-3">
        <button
          role="switch"
          aria-checked={largeText}
          aria-label="Toggle large text preview"
          onClick={() => setLargeText(!largeText)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-[var(--blue)] focus-visible:outline-offset-2 ${
            largeText ? "bg-[var(--blue)]" : "bg-[var(--border)]"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
              largeText ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span className="text-xs text-[var(--muted-foreground)]">
          Large text (18pt+) — requires only 3:1
        </span>
      </div>
    </div>
  )
}
