import type { Metadata } from "next"
import { complianceData, categories } from "@/lib/compliance-data"
import { ComplianceCard } from "@/components/compliance/ComplianceCard"
import { ContrastDemo } from "@/components/compliance/ContrastDemo"
import { AltTextDemo } from "@/components/compliance/AltTextDemo"
import { KeyboardDemo } from "@/components/compliance/KeyboardDemo"
import { ComplianceBadge } from "@/components/compliance/ComplianceBadge"
import { Shield, BookOpen } from "lucide-react"
import { ComplianceHighlight } from "@/components/compliance/ComplianceHighlight"

export const metadata: Metadata = {
  title: "Compliance Guide — WCAG 2.1 & ADA Requirements",
  description:
    "Complete guide to web accessibility compliance requirements under WCAG 2.1, ADA Title III, California Unruh Act, and New York Human Rights Law.",
}

const categoryDescriptions: Record<string, string> = {
  Visual: "Color contrast, alt text, captions, and everything your eyes use to read the web.",
  Navigation: "Keyboard access, skip links, focus indicators — how users move through your site.",
  Forms: "Labels, error messages, required fields — how users interact with your inputs.",
  Structure: "Headings, page titles, landmarks — the skeleton screen readers navigate.",
  Interactive: "Dropdowns, modals, carousels, tooltips — dynamic components with special rules.",
  Documents: "PDFs and downloadable files linked from your site.",
  Mobile: "Touch targets and zoom — requirements specific to phones and tablets.",
}

export default function CompliancePage() {
  return (
    <div className="py-10 md:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--green)]/30 bg-[var(--green)]/10 px-4 py-2 mb-6">
            <BookOpen size={14} className="text-[#065F3B]" aria-hidden="true" />
            <span className="text-xs font-semibold text-[#065F3B] uppercase tracking-wider">
              Complete Compliance Reference
            </span>
          </div>
          <ComplianceHighlight
            label="Easy-to-read text"
            explanation="The big dark words sit on a light background, so they are simple to see. A person with weak eyesight can read this without squinting."
            wcagId="1.4.3"
            wcagName="Contrast (Minimum)"
            position="bottom"
            className="mb-4 mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)]">
              What your website{" "}
              <span className="text-[var(--blue)]">must</span> do
            </h1>
          </ComplianceHighlight>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-lg leading-relaxed">
            Every requirement below is drawn from WCAG 2.1, ADA Title III, and applicable state laws.
            Click any{" "}
            <span className="font-mono text-xs border border-[var(--blue)]/30 bg-[var(--blue)]/10 text-[#1E40AF] px-1 py-0.5 rounded">ⓘ</span>{" "}
            badge to see the exact law — in plain English and legal language, with real lawsuit citations.
          </p>
        </div>

        {/* This page's own compliance badges — meta-demonstration */}
        <div className="rounded-xl border border-[var(--green)]/30 bg-[var(--green)]/5 p-5 mb-14 flex flex-col sm:flex-row items-start gap-4">
          <Shield size={20} className="text-[#065F3B] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-[var(--foreground)] mb-1">
              This page itself is compliant — here&apos;s proof
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-slate-600">
              <span>H1 heading (WCAG 2.4.6)</span>
              <ComplianceBadge
                criterionId="2.4.6"
                criterionName="Headings and Labels"
                wcagLevel="AA"
                plainEnglish="This page uses H1 for the main heading, H2 for section headings. Screen reader users navigate by jumping between headings — the hierarchy must be logical."
                legalText="WCAG 2.1 SC 2.4.6: 'Headings and labels describe topic or purpose.' Applied under ADA Title III (42 U.S.C. § 12181)."
                position="bottom"
              />
              <span className="text-[var(--border)]">·</span>
              <span>lang=&quot;en&quot; on html (WCAG 3.1.1)</span>
              <ComplianceBadge
                criterionId="3.1.1"
                criterionName="Language of Page"
                wcagLevel="A"
                plainEnglish="The HTML tag declares lang=en so screen readers use the correct language pronunciation rules."
                legalText="WCAG 2.1 SC 3.1.1: 'The default human language of each Web page can be programmatically determined.' Applied under ADA Title III (42 U.S.C. § 12181)."
                position="bottom"
              />
              <span className="text-[var(--border)]">·</span>
              <span>Skip nav link visible on focus (WCAG 2.4.1)</span>
              <ComplianceBadge
                criterionId="2.4.1"
                criterionName="Bypass Blocks"
                wcagLevel="A"
                plainEnglish="Press Tab on this page and a 'Skip to main content' link appears. This lets keyboard users bypass the navigation menu."
                legalText="WCAG 2.1 SC 2.4.1: 'A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.' Applied under ADA Title III (42 U.S.C. § 12181)."
                position="bottom"
              />
            </div>
          </div>
        </div>

        {/* Interactive demos */}
        <section aria-labelledby="demos-heading" className="mb-20">
          <h2 id="demos-heading" className="text-2xl font-bold text-[var(--foreground)] mb-2">
            Interactive Demos
          </h2>
          <p className="text-[var(--muted-foreground)] mb-8">
            Try these live demonstrations of the most commonly failed requirements.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ContrastDemo />
            <AltTextDemo />
            <KeyboardDemo />
          </div>
        </section>

        {/* Requirements by category */}
        {categories.map(({ id: catId, label }) => {
          const items = complianceData.filter((r) => r.category === catId)
          if (!items.length) return null
          return (
            <section
              key={catId}
              aria-labelledby={`cat-${catId}`}
              className="mb-16"
            >
              <div className="mb-6 pb-4 border-b border-[var(--border)]">
                <h2
                  id={`cat-${catId}`}
                  className="text-xl font-bold text-[var(--foreground)] mb-1"
                >
                  {label}
                </h2>
                {categoryDescriptions[catId] && (
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {categoryDescriptions[catId]}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((req) => (
                  <ComplianceCard key={req.id} requirement={req} />
                ))}
              </div>
            </section>
          )
        })}

        {/* State laws section */}
        <section aria-labelledby="state-laws-heading" id="state-laws" className="mt-8">
          <h2 id="state-laws-heading" className="text-2xl font-bold text-[var(--foreground)] mb-2">
            State Laws
          </h2>
          <p className="text-[var(--muted-foreground)] mb-8">
            Federal ADA is the baseline. These state laws add teeth — especially California.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                name: "California — Unruh Civil Rights Act",
                citation: "Cal. Civ. Code § 51(f)",
                plain: "Any ADA violation automatically triggers Unruh liability. Minimum $4,000 per violation, plus attorney's fees. A single non-compliant visit is a billable claim. California generates more digital accessibility lawsuits than any other state.",
                legal: "Cal. Civ. Code § 51(f): 'A violation of the right of any individual under the federal Americans with Disabilities Act of 1990 shall also constitute a violation of this section.' Cal. Civ. Code § 52(a): damages 'not less than four thousand dollars ($4,000)' per violation.",
                damage: "$4,000 minimum per violation",
                color: "var(--fail)",
              },
              {
                name: "New York City — Human Rights Law",
                citation: "NYC Admin. Code § 8-107",
                plain: "The most expansive anti-discrimination law in the US. Applies to any business with NYC customers — even if you're physically located outside the city. Civil penalties up to $125,000. Does not require a nexus to a physical location.",
                legal: "NYC Admin. Code § 8-107(4)(a) prohibits disability discrimination by any 'place or provider of public accommodation.' § 8-502(a) allows private right of action with compensatory, punitive damages, and civil penalties up to $125,000 for unlawful discriminatory practices.",
                damage: "Up to $125,000 per complaint",
                color: "#B45309",
              },
              {
                name: "Florida — ADA Title III (11th Circuit)",
                citation: "Gil v. Winn-Dixie (11th Cir. 2021)",
                plain: "Florida follows the 11th Circuit's 'nexus' requirement: your website must have a connection to a physical place of business. Pure online businesses have more protection here. But brick-and-mortar businesses with websites are still exposed under federal ADA.",
                legal: "The 11th Circuit in Gil v. Winn-Dixie Stores (2021) held that a website must have a 'nexus' to a physical place of public accommodation to trigger ADA Title III. Florida Civil Rights Act (Fla. Stat. § 760.01) does not explicitly address web accessibility.",
                damage: "Injunctive relief + attorney's fees",
                color: "var(--blue)",
              },
              {
                name: "Federal — ADA Title III",
                citation: "42 U.S.C. § 12182(a)",
                plain: "The Americans with Disabilities Act requires any business open to the public to provide equal access to people with disabilities. Courts consistently apply WCAG 2.1 AA as the technical standard. No statutory damages for private suits, but attorney's fees alone average $50,000–$200,000+.",
                legal: "42 U.S.C. § 12182(a): 'No individual shall be discriminated against on the basis of disability in the full and equal enjoyment of the goods, services, facilities, privileges, advantages, or accommodations of any place of public accommodation.' DOJ Title II Final Rule (2024) codified WCAG 2.1 AA for government entities; private business rule forthcoming.",
                damage: "Injunctive + attorney's fees ($50K–$200K+)",
                color: "#4F46E5",
              },
            ].map((law) => (
              <article
                key={law.name}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">{law.name}</h3>
                    <p className="text-xs text-[var(--muted-foreground)] font-mono">{law.citation}</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">{law.plain}</p>
                <details className="group">
                  <summary className="text-xs font-semibold cursor-pointer" style={{ color: law.color }}>
                    View legal text
                  </summary>
                  <p className="mt-2 text-xs font-mono text-[var(--muted-foreground)] leading-relaxed">{law.legal}</p>
                </details>
                <div className="mt-4 pt-3 border-t border-[var(--border)]">
                  <span className="text-xs font-semibold" style={{ color: law.color }}>{law.damage}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
