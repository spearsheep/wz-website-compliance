import Link from "next/link"
import { ArrowRight, Search, Wrench, Building2, RefreshCw } from "lucide-react"
import { ScannerHero } from "@/components/home/ScannerHero"
import { SparkDot } from "@/components/compliance/SparkDot"
import { FAQ } from "@/components/shared/FAQ"

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #FFFFFF 0%, #F0F4FF 100%)" }}>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full" style={{ background: "#0DAB66" }} />
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  ADA Compliance Specialists
                </span>
              </div>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6"
                style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
              >
                One lawsuit can
                <br />
                cost more than
                <br />
                <span style={{ color: "#0DAB66" }}>we do.</span>
              </h1>

              <p className="text-lg text-slate-500 mb-8 max-w-md leading-relaxed">
                ADA web compliance. We audit, fix, and protect your business before the lawyers do.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-8 relative">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white transition-all hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 shadow-lg"
                  style={{ background: "#015DF1", boxShadow: "0 4px 20px rgba(1,93,241,0.3)" }}
                >
                  Get Free Audit
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/compliance"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all focus-visible:outline-2 focus-visible:outline-slate-400 focus-visible:outline-offset-2"
                >
                  See the Law
                </Link>
                {/* Real dot on a real CTA: focus-visible ring proves WCAG 2.4.7 */}
                <span className="absolute -top-2 left-[152px]">
                  <SparkDot
                    criterionId="2.4.7"
                    criterionName="Focus Visible"
                    wcagLevel="AA"
                    summary="Tab to this button and you'll see a visible outline appear — keyboard users need that to know where they are."
                    position="top"
                  />
                </span>
              </div>

              <p className="text-sm text-slate-400">
                No commitment · Results in 48 hours · Covers CA, NY, FL, and federal requirements
              </p>
            </div>

            {/* Right — live URL scanner */}
            <div className="relative flex justify-center lg:justify-end">
              <ScannerHero />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="border-y border-slate-100 bg-white py-14 relative">
        <div className="absolute top-4 right-6">
          <SparkDot
            criterionId="1.3.1"
            criterionName="Info and Relationships"
            wcagLevel="A"
            summary="These stat numbers and labels are marked up as paragraphs in a grid, not as data baked into images — screen readers can read every value."
            position="left"
          />
        </div>
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-3 gap-0 divide-x divide-slate-100">
            {[
              { value: "4,605", label: "ADA lawsuits filed in 2023 alone" },
              { value: "$9.7M", label: "Target's settlement — one case" },
              { value: "90%", label: "of websites fail basic checks" },
            ].map(({ value, label }) => (
              <div key={value} className="text-center px-6 py-4">
                <p
                  className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-1 tabular-nums"
                  style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
                >
                  {value}
                </p>
                <p className="text-sm text-slate-500 max-w-[140px] mx-auto leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPOSURE BY STATE ────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-3"
              style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
            >
              If you have a business, you&apos;re exposed.
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Federal ADA applies nationwide. States stack additional penalties on top.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                state: "California",
                law: "Unruh Civil Rights Act",
                damage: "$4,000",
                unit: "per visit",
                note: "Any ADA violation automatically triggers Unruh liability. One visit is one claim.",
                color: "#DC2626",
              },
              {
                state: "New York City",
                law: "Human Rights Law",
                damage: "$125,000",
                unit: "per complaint",
                note: "No physical location nexus required. NYC customers = NYC exposure.",
                color: "#D97706",
              },
              {
                state: "Federal",
                law: "ADA Title III",
                damage: "$200K+",
                unit: "attorney's fees",
                note: "No statutory damages, but plaintiff attorneys average $50K–$200K+ per case.",
                color: "#6366F1",
              },
            ].map(({ state, law, damage, unit, note, color }) => (
              <div
                key={state}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color }}>
                  {state}
                </p>
                <p className="text-xs text-slate-400 mb-4">{law}</p>
                <p
                  className="text-4xl font-extrabold mb-0.5"
                  style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui", color }}
                >
                  {damage}
                </p>
                <p className="text-sm font-medium text-slate-500 mb-3">{unit}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "#F8FAFC" }}>
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-3"
              style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
            >
              Four ways to get compliant
            </h2>
            <p className="text-slate-500">Every engagement starts with a free audit.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Search,
                name: "Audit",
                tagline: "Know your risk",
                desc: "Full WCAG 2.1 AA scan with severity ratings and remediation guidance.",
                color: "#015DF1",
              },
              {
                icon: Wrench,
                name: "Fix",
                tagline: "Targeted remediation",
                desc: "We fix violations directly in your existing codebase.",
                color: "#0DAB66",
              },
              {
                icon: Building2,
                name: "Rebuild",
                tagline: "Compliance from scratch",
                desc: "Full site rebuild to WCAG 2.1 AA with VPAT documentation.",
                color: "#8B5CF6",
              },
              {
                icon: RefreshCw,
                name: "Maintenance",
                tagline: "Ongoing protection",
                desc: "Quarterly scans to keep you protected as your site grows.",
                color: "#F59E0B",
              },
            ].map(({ icon: Icon, name, tagline, desc, color }) => (
              <Link
                key={name}
                href={`/services#${name.toLowerCase()}`}
                className="group rounded-2xl bg-white border border-slate-100 p-6 hover:border-slate-200 hover:shadow-md transition-all focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <div
                  className="inline-flex rounded-xl p-2.5 mb-4"
                  style={{ background: `${color}18` }}
                >
                  <Icon size={20} style={{ color }} aria-hidden="true" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color }}>
                  {tagline}
                </p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{desc}</p>
                <span className="text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color }}>
                  Learn more <ArrowRight size={13} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-12"
            style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
          >
            Simple process. Fast results.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div
              className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-slate-200"
              aria-hidden="true"
            />

            {[
              { step: "1", title: "Free Audit", desc: "Submit your site. We scan every page in 48–72 hours." },
              { step: "2", title: "Detailed Report", desc: "Every violation with severity ratings and fix guidance." },
              { step: "3", title: "We Fix It", desc: "We remediate directly in your codebase. No disruption." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center relative">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white mb-4 z-10"
                  style={{ background: "#015DF1", fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
                >
                  {step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-[200px]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ─────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "#F8FAFC" }}>
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-3"
              style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
            >
              Companies that waited
            </h2>
            <p className="text-slate-500">Real lawsuits. Real settlements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                company: "Target",
                year: "2008",
                amount: "$9,700,000",
                detail: "Images without alt text, inaccessible checkout",
                law: "ADA Title III + California Unruh Act",
              },
              {
                company: "Netflix",
                year: "2012",
                amount: "$755,000",
                detail: "Missing captions on streaming content",
                law: "ADA Title III",
              },
              {
                company: "Domino's Pizza",
                year: "2019",
                amount: "Settled",
                detail: "Inaccessible app and website ordering flow",
                law: "9th Circuit — Robles v. Domino's",
              },
            ].map(({ company, year, amount, detail, law }) => (
              <div
                key={company}
                className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xl font-bold text-slate-900">{company}</p>
                    <p className="text-sm text-slate-400">{year}</p>
                  </div>
                  <p
                    className="text-2xl font-extrabold"
                    style={{ color: "#DC2626", fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
                  >
                    {amount}
                  </p>
                </div>
                <p className="text-sm text-slate-600 mb-1">{detail}</p>
                <p className="text-xs text-slate-400">{law}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <FAQ
        title="Common questions"
        subtitle="Quick answers to what most business owners ask first."
        items={[
          {
            question: "Does the ADA actually apply to my website?",
            answer:
              "In most US federal circuits, yes. ADA Title III (42 U.S.C. § 12182) has been repeatedly applied to commercial websites — most influentially in Robles v. Domino's Pizza (9th Circuit, 2019). If you serve the public, your website is almost certainly subject to the ADA.",
          },
          {
            question: "What is WCAG 2.1 Level AA and why does it matter?",
            answer:
              "WCAG 2.1 (Web Content Accessibility Guidelines) Level AA is the international technical standard for web accessibility. US courts have consistently adopted it as the de facto benchmark for ADA Title III compliance. The DOJ's 2024 Title II Final Rule codified WCAG 2.1 AA for government entities; the Title III private-business rule is expected to follow.",
          },
          {
            question: "How much can a single ADA lawsuit cost?",
            answer:
              "In California, the Unruh Act imposes $4,000 in statutory damages per violation. Federal ADA cases routinely involve $50,000–$200,000 in plaintiff attorney's fees. Major settlements include NFB v. Target at $9.7 million and NAD v. Netflix at $755,000.",
          },
          {
            question: "Are accessibility overlay widgets a valid defense?",
            answer:
              "No. The Department of Justice has explicitly warned that accessibility overlays are insufficient. Plaintiff firms specifically target sites using overlays because they're easy wins — the overlay does not fix the underlying inaccessible code.",
          },
          {
            question: "How long does an accessibility audit take?",
            answer:
              "Our automated scan returns results in 10 seconds. A full manual WCAG 2.1 AA audit takes 48 to 72 hours and includes severity-rated violations with remediation guidance.",
          },
          {
            question: "What's the difference between automated scans and a manual audit?",
            answer:
              "Automated tools like axe-core and Lighthouse detect roughly 30–57% of real WCAG violations. They catch contrast issues, missing alt text, and broken landmarks, but miss content quality, keyboard traps in complex widgets, and screen-reader semantics. A manual audit closes that gap.",
          },
        ]}
      />

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "#0F172A" }}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <SparkDot
              criterionId="1.4.3"
              criterionName="Contrast (Minimum)"
              wcagLevel="AA"
              summary="White text on this dark background hits ~19:1 contrast — far above the 4.5:1 WCAG AA requirement."
              position="top"
              color="green"
            />
            <span className="text-slate-500 text-xs font-medium">This section is WCAG compliant — hover the dot</span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
            style={{ fontFamily: "var(--font-jakarta), var(--font-inter), system-ui" }}
          >
            Every day without compliance
            <br />
            is exposure.
          </h2>
          <p className="text-slate-400 mb-10 text-lg">
            Start with a free audit. No commitment, no sales pressure.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold text-white transition-all hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            style={{ background: "#015DF1", boxShadow: "0 4px 30px rgba(1,93,241,0.4)" }}
          >
            Request Free Audit
            <ArrowRight size={16} />
          </Link>
          <p className="mt-4 text-sm text-slate-500">Results in 48 hours · WCAG 2.1 AA</p>
        </div>
      </section>

    </div>
  )
}
