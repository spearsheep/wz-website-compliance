"use client"

import { SparkDot } from "@/components/compliance/SparkDot"

export function BrowserMockup() {
  return (
    <div className="relative w-full max-w-[540px] mx-auto select-none" aria-hidden="true">
      {/* Browser shell */}
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200" style={{ background: "#F8FAFC" }}>
        {/* Chrome bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200" style={{ background: "#EAECF0" }}>
          <span className="w-3 h-3 rounded-full" style={{ background: "#FC5F57" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#FDBC2C" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#2AC940" }} />
          <div className="ml-3 flex-1 h-6 rounded-md bg-white border border-slate-200 flex items-center px-3">
            <div className="w-3 h-3 rounded-full border border-slate-300 mr-2 flex-shrink-0" />
            <div className="h-2 w-32 rounded bg-slate-200" />
          </div>
        </div>

        {/* Website content */}
        <div className="relative bg-white p-0">
          {/* Nav bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-blue-500" />
              <div className="h-2.5 w-16 rounded bg-slate-800" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-8 rounded bg-slate-300" />
              <div className="h-2 w-8 rounded bg-slate-300" />
              <div className="h-2 w-8 rounded bg-slate-300" />
              <div className="h-6 w-16 rounded-md" style={{ background: "#015DF1" }} />
            </div>
            {/* SparkDot: Skip nav / WCAG 2.4.1 */}
            <div className="absolute top-3 right-3">
              <SparkDot
                criterionId="2.4.1"
                criterionName="Bypass Blocks"
                wcagLevel="A"
                summary="A skip navigation link lets keyboard users jump past the menu directly to content."
                position="bottom"
              />
            </div>
          </div>

          {/* Hero area */}
          <div className="px-5 pt-5 pb-4 flex gap-4">
            <div className="flex-1 relative">
              {/* Heading lines */}
              <div className="h-4 w-4/5 rounded bg-slate-800 mb-2" />
              <div className="h-4 w-3/5 rounded bg-slate-800 mb-3" />
              <div className="h-2.5 w-full rounded bg-slate-200 mb-1.5" />
              <div className="h-2.5 w-5/6 rounded bg-slate-200 mb-4" />
              <div className="flex gap-2">
                <div className="h-7 w-20 rounded-md" style={{ background: "#015DF1" }} />
                <div className="h-7 w-16 rounded-md border border-slate-200" />
              </div>
              {/* SparkDot: Headings / WCAG 2.4.6 */}
              <div className="absolute -top-1 right-0">
                <SparkDot
                  criterionId="2.4.6"
                  criterionName="Headings and Labels"
                  wcagLevel="AA"
                  summary="Headings follow a logical hierarchy (H1 → H2 → H3) so screen readers can navigate by section."
                  position="bottom"
                />
              </div>
            </div>

            {/* Image placeholder */}
            <div className="relative w-32 flex-shrink-0">
              <div
                className="w-full h-24 rounded-xl"
                style={{ background: "linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)" }}
              />
              {/* decorative inner shapes */}
              <div className="absolute inset-3 rounded-lg opacity-50" style={{ background: "linear-gradient(135deg, #818CF8 0%, #6366F1 100%)" }} />
              {/* SparkDot: Alt text / WCAG 1.1.1 */}
              <div className="absolute -top-2 -right-2">
                <SparkDot
                  criterionId="1.1.1"
                  criterionName="Non-text Content"
                  wcagLevel="A"
                  summary="This image has descriptive alt text so screen readers can describe it to blind users."
                  position="bottom"
                />
              </div>
            </div>
          </div>

          {/* Content row */}
          <div className="px-5 pb-4 grid grid-cols-3 gap-3">
            {[0.7, 0.9, 0.8].map((w, i) => (
              <div key={i} className="space-y-1.5">
                <div className="h-3 rounded" style={{ background: "#0F172A", width: `${w * 100}%` }} />
                <div className="h-2 w-full rounded bg-slate-200" />
                <div className="h-2 rounded bg-slate-200" style={{ width: `${(w * 0.8) * 100}%` }} />
              </div>
            ))}
          </div>

          {/* Form area */}
          <div className="px-5 pb-5 relative">
            <div className="rounded-xl border border-slate-200 p-3 bg-slate-50">
              <div className="h-2 w-20 rounded bg-slate-400 mb-2" />
              <div className="h-7 w-full rounded-md bg-white border border-slate-200 mb-2" />
              <div className="h-2 w-16 rounded bg-slate-400 mb-2" />
              <div className="h-7 w-full rounded-md bg-white border border-slate-200 mb-3" />
              <div className="h-7 w-28 rounded-md" style={{ background: "#078250" }} />
            </div>
            {/* SparkDot: Form labels / WCAG 3.3.2 */}
            <div className="absolute top-2 right-6">
              <SparkDot
                criterionId="3.3.2"
                criterionName="Labels or Instructions"
                wcagLevel="A"
                summary="Every form field has a visible label — not just placeholder text that disappears when you type."
                position="top"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle shadow below */}
      <div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-8 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.12) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
    </div>
  )
}
