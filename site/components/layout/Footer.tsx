import Link from "next/link"
import Image from "next/image"
import { SparkDot } from "@/components/compliance/SparkDot"
import { industries } from "@/lib/industries"

const links = {
  Services: [
    { label: "Accessibility Audit", href: "/services#audit" },
    { label: "Fix & Remediation", href: "/services#fix" },
    { label: "Full Rebuild", href: "/services#rebuild" },
    { label: "Quarterly Maintenance", href: "/services#maintenance" },
  ],
  Learn: [
    { label: "Compliance Guide", href: "/compliance" },
    { label: "Case Studies", href: "/cases" },
    { label: "Blog", href: "/blog" },
    { label: "State Laws", href: "/compliance#state-laws" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 rounded focus-visible:outline-2 focus-visible:outline-[var(--blue)] focus-visible:outline-offset-2">
              <Image src="/logo-mark.svg" alt="Jobs Junior logo mark" width={32} height={32} />
              <span className="font-semibold text-[var(--foreground)]">
                Jobs Junior<br />
                <span className="text-xs font-normal text-[var(--muted-foreground)] tracking-wider uppercase">Compliance</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              Making the web accessible — and keeping your business protected from ADA liability.
            </p>
            <p className="mt-4 text-xs text-[var(--muted-foreground)]">
              Domain & contact coming soon.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
                {section}
              </h3>
              <ul className="space-y-3" role="list">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--blue)] focus-visible:outline-offset-1 rounded"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Industries column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
              Industries
            </h3>
            <ul className="space-y-3" role="list">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link
                    href={`/industries/${i.slug}`}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--blue)] focus-visible:outline-offset-1 rounded"
                  >
                    {i.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--border)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted-foreground)]">
            © {new Date().getFullYear()} Jobs Junior. All rights reserved.
          </p>
          <p className="text-xs text-[var(--muted-foreground)] text-center">
            This website is built to WCAG 2.1 Level AA standards —{" "}
            <span className="text-[var(--green)]">fully compliant</span>.
          </p>
          <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--green)]" aria-hidden="true" />
            WCAG 2.1 AA Compliant
            <SparkDot
              criterionId="1.4.3"
              criterionName="Contrast (Minimum)"
              wcagLevel="AA"
              summary="Every text colour on this site has been checked against its background — body text is at least 4.5:1, which clears WCAG AA."
              position="top"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
