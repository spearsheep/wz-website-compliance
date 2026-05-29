"use client"

import { useState } from "react"
import { ComplianceBadge } from "./ComplianceBadge"
import { Eye, EyeOff } from "lucide-react"

export function AltTextDemo() {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[var(--foreground)] text-sm">Alt Text Demo</h3>
        <ComplianceBadge
          criterionId="1.1.1"
          criterionName="Non-Text Content (Alt Text)"
          wcagLevel="A"
          plainEnglish="Every meaningful image must have a written description (alt text) so screen reader software used by blind users can describe it. Without alt text, blind users receive zero information from your images."
          legalText="WCAG 2.1 SC 1.1.1: 'All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.' Applied under ADA Title III (42 U.S.C. § 12181) and California Unruh Civil Rights Act (Cal. Civ. Code § 51)."
          lawsuits={[
            {
              case: "NFB v. Target Corporation",
              year: 2006,
              jurisdiction: "N.D. California",
              outcome: "Missing alt text on images was a primary violation. Settled for $9.7M total.",
            },
            {
              case: "Conner v. Beyoncé's website",
              year: 2019,
              jurisdiction: "S.D. New York",
              outcome: "Missing alt text on images was the primary allegation. Settled out of court.",
            },
          ]}
          position="bottom"
        />
      </div>

      {/* Image mockup */}
      <div className="relative rounded-lg overflow-hidden mb-4">
        <div
          className="w-full h-40 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #015DF1 0%, #078250 100%)",
          }}
          role="img"
          aria-label="Abstract gradient showing JustCompliant brand colors — blue transitioning to green, representing the company's visual identity"
        >
          <div className="text-center text-white">
            <div className="text-4xl font-bold opacity-20">JC</div>
            <div className="text-sm font-medium mt-2 opacity-60">Image</div>
          </div>
        </div>

        {/* Alt text overlay */}
        {revealed && (
          <div className="absolute inset-0 bg-[var(--background)]/95 flex items-center justify-center p-4">
            <div className="text-center">
              <p className="text-xs font-semibold text-[var(--green)] uppercase tracking-wider mb-2">
                Screen reader reads:
              </p>
              <p className="text-sm text-[var(--foreground)] italic leading-relaxed">
                &ldquo;Abstract gradient showing JustCompliant brand colors — blue transitioning to green, representing the company&apos;s visual identity&rdquo;
              </p>
              <p className="text-xs text-[var(--muted-foreground)] mt-3">
                This alt text describes what the image shows AND its purpose — both required by WCAG 1.1.1.
              </p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => setRevealed(!revealed)}
        className="flex items-center gap-2 text-sm font-medium text-[var(--blue)] hover:text-blue-400 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--blue)] focus-visible:outline-offset-2 rounded"
      >
        {revealed ? (
          <>
            <EyeOff size={15} aria-hidden="true" />
            Hide alt text
          </>
        ) : (
          <>
            <Eye size={15} aria-hidden="true" />
            Reveal alt text (what screen readers see)
          </>
        )}
      </button>

      <p className="mt-3 text-xs text-[var(--muted-foreground)] leading-relaxed">
        This image&apos;s alt text is compliant because it describes both what the image shows and its purpose — not just &ldquo;image&rdquo; or the filename.
      </p>
    </div>
  )
}
