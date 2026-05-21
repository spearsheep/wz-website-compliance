"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Shield } from "lucide-react"

function useCountUp(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration, start])
  return value
}

export function Hero() {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 300)
    return () => clearTimeout(t)
  }, [])

  const lawsuits = useCountUp(4605, 2200, started)

  return (
    <section
      className="relative min-h-[90vh] flex items-center hero-mesh grid-pattern overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[var(--blue)]/10 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[var(--green)]/8 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--blue)]/30 bg-[var(--blue)]/10 px-4 py-2 mb-8">
          <Shield size={14} className="text-[var(--blue)]" aria-hidden="true" />
          <span className="text-xs font-semibold text-[var(--blue)] uppercase tracking-wider">
            ADA · WCAG 2.1 · California · New York · Florida
          </span>
        </div>

        {/* Main stat — animated count-up */}
        <div className="mb-2">
          <span
            aria-label={`${lawsuits.toLocaleString()} ADA web accessibility lawsuits filed in 2023`}
            className="block font-bold text-[var(--foreground)] tabular-nums"
            style={{ fontSize: "clamp(4rem, 12vw, 9rem)", lineHeight: 1, letterSpacing: "-0.04em" }}
          >
            {lawsuits.toLocaleString()}
          </span>
        </div>

        <p className="text-lg md:text-xl text-[var(--muted-foreground)] mb-3 font-light" id="hero-heading">
          ADA web accessibility lawsuits filed in <strong className="text-[var(--foreground)] font-semibold">2023 alone</strong>.
        </p>

        <p className="text-sm md:text-base text-[var(--muted-foreground)] mb-10 max-w-2xl mx-auto leading-relaxed">
          Target paid <span className="text-[var(--foreground)] font-semibold">$9.7 million</span>.
          Netflix paid <span className="text-[var(--foreground)] font-semibold">$755,000</span>.
          In California, a single non-compliant visit to your site costs{" "}
          <span className="text-[var(--fail)] font-semibold">$4,000</span>.
          <br />
          <span className="text-[var(--muted-foreground)]">Is your website next?</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--blue)] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-900/30 hover:bg-blue-600 transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Get Your Free Compliance Audit
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link
            href="/compliance"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-8 py-4 text-base font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--foreground)]/30 transition-all focus-visible:outline-2 focus-visible:outline-[var(--blue)] focus-visible:outline-offset-2"
          >
            See What You Need to Fix
          </Link>
        </div>

        {/* Trust signal */}
        <p className="mt-8 text-xs text-[var(--muted-foreground)]">
          No commitment required · Results in 48 hours · Covers CA, NY, FL, and federal requirements
        </p>
      </div>
    </section>
  )
}
