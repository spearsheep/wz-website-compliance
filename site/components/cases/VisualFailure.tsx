import { ImageOff, MousePointer2, VideoOff, EyeOff, Type, Workflow, FileWarning, Shield } from "lucide-react"
import type { FailureType } from "@/lib/lawsuits"

interface VisualFailureProps {
  type: FailureType
  description?: string
}

/**
 * Renders a small visual mockup demonstrating what's broken on a real website.
 * Each variant shows the failure visually so a non-technical audience can see what went wrong.
 */
export function VisualFailure({ type, description }: VisualFailureProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-4 py-2.5 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
        <span className="w-2 h-2 rounded-full bg-red-500" aria-hidden="true" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-red-600">
          Failure: {formatType(type)}
        </span>
      </div>
      <div className="p-5 min-h-[160px] flex items-center justify-center">
        {renderMockup(type)}
      </div>
      {description && (
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50">
          <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  )
}

function formatType(t: FailureType): string {
  return (
    {
      "alt-text": "Missing alt text",
      contrast: "Low color contrast",
      keyboard: "No keyboard access",
      captions: "Missing captions",
      "form-labels": "Form fields unlabeled",
      "screen-reader": "Not screen-reader readable",
      "focus-order": "Wrong focus order",
      "link-text": "Useless link text",
      headings: "Broken heading order",
      modal: "Inaccessible modal",
      documents: "Inaccessible documents",
      general: "Site-wide WCAG failures",
    } as Record<FailureType, string>
  )[t]
}

function renderMockup(type: FailureType): React.ReactNode {
  switch (type) {
    case "alt-text":
      return (
        <div className="w-full">
          <div className="flex gap-3 items-start">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center flex-shrink-0">
              <ImageOff size={26} className="text-slate-500" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="h-2.5 w-3/4 rounded bg-slate-800 mb-2" aria-hidden="true" />
              <div className="h-2 w-full rounded bg-slate-200 mb-1.5" aria-hidden="true" />
              <div className="h-2 w-5/6 rounded bg-slate-200" aria-hidden="true" />
              <div className="mt-3 inline-block px-2 py-1 rounded bg-red-50 text-red-700 text-[10px] font-mono">
                {'<img src="product-2391.jpg">'}
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-slate-900 px-3 py-2">
            <p className="text-[10px] text-slate-400 font-mono">Screen reader announces:</p>
            <p className="text-xs text-white font-mono mt-1">&quot;Image. Image. Image.&quot;</p>
          </div>
        </div>
      )

    case "contrast":
      return (
        <div className="w-full space-y-2">
          <div className="rounded-lg bg-white p-4 border border-slate-100">
            <p className="text-slate-300 text-sm leading-snug">
              This is what low-contrast text looks like — gray on white.
            </p>
            <p className="text-xs mt-2 font-semibold text-red-600">
              Fails: 1.92:1 ratio · Needs 4.5:1
            </p>
          </div>
          <div className="rounded-lg p-4" style={{ background: "#0DAB66" }}>
            <p className="text-emerald-200 text-sm leading-snug">
              And this is too — light green on green.
            </p>
            <p className="text-xs mt-2 font-semibold text-white">
              Fails: 2.41:1 ratio · Needs 4.5:1
            </p>
          </div>
        </div>
      )

    case "keyboard":
      return (
        <div className="w-full">
          <div className="flex flex-wrap gap-2 mb-3">
            {["Small", "Medium", "Large"].map((s, i) => (
              <div
                key={s}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white relative"
                style={{ background: i === 1 ? "#015DF1" : "#94A3B8" }}
              >
                {s}
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2.5 flex items-center gap-2">
            <MousePointer2 size={14} className="text-red-600" aria-hidden="true" />
            <p className="text-xs text-red-700 font-medium">
              Click only — Tab key does nothing
            </p>
          </div>
        </div>
      )

    case "captions":
      return (
        <div className="w-full">
          <div
            className="aspect-video rounded-xl flex items-center justify-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
            }}
          >
            <VideoOff size={36} className="text-slate-500" aria-hidden="true" />
            <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-red-500/20 border border-red-400/50">
              <p className="text-[10px] font-semibold text-red-300">No CC</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">
            Deaf users get audio dialogue with no captions
          </p>
        </div>
      )

    case "form-labels":
      return (
        <div className="w-full space-y-2">
          <div className="rounded-lg bg-white border border-slate-200 px-3 py-2.5">
            <p className="text-sm text-slate-400">your name here</p>
          </div>
          <div className="rounded-lg bg-white border border-slate-200 px-3 py-2.5">
            <p className="text-sm text-slate-400">email</p>
          </div>
          <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2.5">
            <p className="text-xs text-red-700 font-medium">
              Screen reader: <span className="font-mono">&quot;Edit text. Edit text.&quot;</span>
            </p>
          </div>
        </div>
      )

    case "screen-reader":
      return (
        <div className="w-full">
          <div className="rounded-lg bg-slate-900 p-4 font-mono text-xs">
            <p className="text-red-400">&lt;div onClick=&quot;buy()&quot;&gt;</p>
            <p className="text-slate-400 pl-3">&lt;div&gt;Buy now&lt;/div&gt;</p>
            <p className="text-red-400">&lt;/div&gt;</p>
          </div>
          <div className="mt-3 rounded-lg bg-red-50 border border-red-200 px-3 py-2.5">
            <EyeOff size={12} className="text-red-600 inline mr-1.5" aria-hidden="true" />
            <span className="text-xs text-red-700 font-medium">
              No button role. Screen readers skip it entirely.
            </span>
          </div>
        </div>
      )

    case "focus-order":
      return (
        <div className="w-full">
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[3, 1, 4, 5, 2, 6].map((n) => (
              <div
                key={n}
                className="aspect-[3/2] rounded-lg bg-white border-2 border-slate-200 flex items-center justify-center relative"
              >
                <span className="text-xs text-slate-300">Field</span>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                  {n}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-red-700 font-medium text-center">
            <Workflow size={12} className="inline mr-1" aria-hidden="true" />
            Tab jumps 3 → 1 → 4 → 5 → 2 → 6
          </p>
        </div>
      )

    case "link-text":
      return (
        <div className="w-full space-y-2.5">
          {["click here", "read more", "learn more", "click here"].map((t, i) => (
            <p key={i} className="text-sm text-slate-700">
              About our pricing:{" "}
              <span className="text-blue-600 underline">{t}</span>
            </p>
          ))}
          <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2.5 mt-2">
            <p className="text-xs text-red-700 font-medium">
              Screen reader users hear: <span className="font-mono">&quot;Link: click here. Link: click here.&quot;</span>
            </p>
          </div>
        </div>
      )

    case "headings":
      return (
        <div className="w-full space-y-1.5 font-mono text-sm">
          <p><span className="text-purple-600 font-bold">H1</span> <span className="text-slate-700">Main title</span></p>
          <p><span className="text-purple-600 font-bold">H3</span> <span className="text-slate-700">Section</span> <span className="text-red-500 text-xs">← skipped H2</span></p>
          <p><span className="text-purple-600 font-bold">H1</span> <span className="text-slate-700">Another title</span> <span className="text-red-500 text-xs">← duplicate H1</span></p>
          <p><span className="text-purple-600 font-bold">H5</span> <span className="text-slate-700">Detail</span> <span className="text-red-500 text-xs">← skipped H4</span></p>
          <div className="mt-3 rounded-lg bg-red-50 border border-red-200 px-3 py-2.5">
            <Type size={12} className="text-red-600 inline mr-1.5" aria-hidden="true" />
            <span className="text-xs text-red-700 font-medium">
              Screen reader navigation map is broken.
            </span>
          </div>
        </div>
      )

    case "modal":
      return (
        <div className="w-full relative">
          <div className="rounded-lg bg-slate-100 p-4 h-32 relative">
            <div className="absolute inset-x-4 top-6 rounded-xl bg-white shadow-xl border border-slate-200 p-3">
              <p className="text-sm font-semibold text-slate-900 mb-1">Are you sure?</p>
              <p className="text-xs text-slate-500">This dialog has no role=&quot;dialog&quot;</p>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-red-50 border border-red-200 px-3 py-2.5">
            <p className="text-xs text-red-700 font-medium">
              Focus escapes the modal · No Escape-to-close · No focus trap
            </p>
          </div>
        </div>
      )

    case "documents":
      return (
        <div className="w-full">
          <div className="rounded-lg bg-slate-100 border border-slate-200 p-4 flex items-start gap-3">
            <div className="w-12 h-14 rounded bg-white border border-slate-300 flex items-center justify-center shrink-0">
              <FileWarning size={20} className="text-red-500" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">medical-records-2024.pdf</p>
              <p className="text-xs text-slate-500 mt-0.5">Scanned image, no text layer</p>
              <div className="mt-3 inline-block px-2 py-1 rounded bg-red-50 text-red-700 text-[10px] font-mono">
                Image-only PDF
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3 text-center">
            Screen reader announces: <span className="font-mono">&quot;Document, 12 pages.&quot;</span>
          </p>
        </div>
      )

    case "general":
      return (
        <div className="w-full">
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded ${i % 3 === 0 || i === 4 ? "bg-red-200" : "bg-slate-100"}`}
                aria-hidden="true"
              />
            ))}
          </div>
          <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2.5 flex items-center gap-2">
            <Shield size={14} className="text-red-600" aria-hidden="true" />
            <p className="text-xs text-red-700 font-medium">
              Multiple WCAG 2.1 AA violations across the site
            </p>
          </div>
        </div>
      )

    default:
      return null
  }
}
