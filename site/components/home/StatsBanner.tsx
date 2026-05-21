"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 9700000, prefix: "$", suffix: "M", display: "9.7M", label: "Target settlement (2008)", sub: "NFB v. Target" },
  { value: 4000, prefix: "$", suffix: "", display: "4,000", label: "Per violation in California", sub: "Unruh Act minimum" },
  { value: 90, prefix: "", suffix: "%", display: "90", label: "Websites non-compliant", sub: "WCAG 2.1 AA" },
  { value: 755000, prefix: "$", suffix: "K", display: "755K", label: "Netflix settlement (2013)", sub: "NAD v. Netflix" },
]

function StatItem({ stat, start }: { stat: typeof stats[0]; start: boolean }) {
  return (
    <div className="text-center px-6 py-8">
      <div
        className="font-bold text-[var(--foreground)] tabular-nums mb-1 transition-all"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1, letterSpacing: "-0.03em" }}
        aria-label={`${stat.prefix}${stat.display}${stat.suffix}`}
      >
        <span className="text-[var(--muted-foreground)] text-2xl">{stat.prefix}</span>
        <span className={start ? "text-[var(--foreground)]" : "text-[var(--border)]"}>
          {stat.display}
        </span>
        <span className="text-[var(--muted-foreground)] text-2xl">{stat.suffix}</span>
      </div>
      <p className="text-sm font-semibold text-[var(--foreground)]">{stat.label}</p>
      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{stat.sub}</p>
    </div>
  )
}

export function StatsBanner() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      aria-label="Key statistics on ADA web accessibility lawsuits"
      className="border-y border-[var(--border)] bg-[var(--surface)]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[var(--border)]">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} start={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
