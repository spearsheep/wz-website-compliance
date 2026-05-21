import { ContrastDemo } from "@/components/compliance/ContrastDemo"
import { AltTextDemo } from "@/components/compliance/AltTextDemo"
import { KeyboardDemo } from "@/components/compliance/KeyboardDemo"

export function CompliancePreview() {
  return (
    <section aria-labelledby="demo-heading" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--green)] mb-3">
            Live Compliance Demos
          </p>
          <h2
            id="demo-heading"
            className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4"
          >
            See what compliance{" "}
            <span className="text-[var(--blue)]">actually means</span>
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-xl mx-auto text-base">
            Each element on this page demonstrates a real WCAG requirement. Click the{" "}
            <span className="font-mono text-xs border border-[var(--blue)]/30 bg-[var(--blue)]/10 text-[var(--blue)] px-1 py-0.5 rounded">ⓘ</span>{" "}
            badge to see the law behind it — in plain English and legal language.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ContrastDemo />
          <AltTextDemo />
          <KeyboardDemo />
        </div>
      </div>
    </section>
  )
}
