"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef, useCallback } from "react"
import {
  Menu,
  X,
  ChevronDown,
  ShoppingBag,
  UtensilsCrossed,
  Stethoscope,
  GraduationCap,
  Tv,
  Landmark,
  Cpu,
} from "lucide-react"
import { SparkDot } from "@/components/compliance/SparkDot"
import { industries } from "@/lib/industries"

const iconMap = {
  ShoppingBag,
  UtensilsCrossed,
  Stethoscope,
  GraduationCap,
  Tv,
  Landmark,
  Building2: Landmark,
  Cpu,
}

const navLinks = [
  { href: "/compliance", label: "Compliance" },
  { href: "/services", label: "Services" },
  { href: "/cases", label: "Cases" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [industryOpen, setIndustryOpen] = useState(false)
  const industryRef = useRef<HTMLLIElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openDropdown = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setIndustryOpen(true)
  }, [])

  const closeDropdown = useCallback(() => {
    closeTimer.current = setTimeout(() => setIndustryOpen(false), 150)
  }, [])

  // Close dropdown on outside click + Escape
  useEffect(() => {
    if (!industryOpen) return
    function onClickOutside(e: MouseEvent) {
      if (industryRef.current && !industryRef.current.contains(e.target as Node)) {
        setIndustryOpen(false)
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIndustryOpen(false)
    }
    document.addEventListener("mousedown", onClickOutside)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClickOutside)
      document.removeEventListener("keydown", onKey)
    }
  }, [industryOpen])

  // Close dropdown when route changes
  useEffect(() => {
    setIndustryOpen(false)
    setMobileOpen(false)
  }, [pathname])

  const isIndustriesActive = pathname === "/industries" || pathname.startsWith("/industries/")

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
      >
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded"
          >
            <Image
              src="/logo-mark.svg"
              alt="JustCompliant logo mark"
              width={32}
              height={32}
            />
            <span className="text-slate-900 font-bold text-base leading-none">
              JustCompliant
            </span>
          </Link>
          <SparkDot
            criterionId="1.1.1"
            criterionName="Non-text Content"
            wcagLevel="A"
            summary="Our logo image has descriptive alt text ('JustCompliant logo mark') so screen readers can announce it to blind users."
            position="bottom"
          />
        </div>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {/* Industries dropdown */}
          <li
            className="relative"
            ref={industryRef}
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={industryOpen}
              onClick={() => setIndustryOpen((v) => !v)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 inline-flex items-center gap-1 ${
                isIndustriesActive
                  ? "text-slate-900 bg-slate-100"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Industries
              <ChevronDown
                size={14}
                className={`transition-transform ${industryOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {industryOpen && (
              <div
                role="menu"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] rounded-2xl bg-white border border-slate-200 shadow-xl p-3 grid grid-cols-2 gap-1"
              >
                {industries.map((i) => {
                  const Icon = iconMap[i.icon]
                  return (
                    <Link
                      key={i.slug}
                      href={`/industries/${i.slug}`}
                      role="menuitem"
                      className="flex items-start gap-3 rounded-xl p-3 hover:bg-slate-50 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: `${i.accent}18`, color: i.accent }}
                        aria-hidden="true"
                      >
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900 leading-tight">
                          {i.name}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                          {i.oneLiner}
                        </p>
                      </div>
                    </Link>
                  )
                })}
                <Link
                  href="/industries"
                  role="menuitem"
                  className="col-span-2 mt-1 flex items-center justify-center gap-1 rounded-xl p-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  See all industries →
                </Link>
              </div>
            )}
          </li>

          {navLinks.map(({ href, label }) => {
            const active = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 ${
                    active
                      ? "text-slate-900 bg-slate-100"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="rounded-xl px-5 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 shadow-sm"
            style={{ background: "#015DF1" }}
          >
            Free Audit
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-500 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-slate-100 px-4 py-4 bg-white max-h-[calc(100vh-65px)] overflow-y-auto"
        >
          <div className="space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block px-4 py-3.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors min-h-[44px] flex items-center"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Industries section in mobile menu */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="px-4 text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Industries
            </p>
            <div className="space-y-1">
              {industries.map((i) => {
                const Icon = iconMap[i.icon]
                return (
                  <Link
                    key={i.slug}
                    href={`/industries/${i.slug}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors min-h-[44px]"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: `${i.accent}18`, color: i.accent }}
                      aria-hidden="true"
                    >
                      <Icon size={14} />
                    </div>
                    {i.shortName}
                  </Link>
                )
              })}
            </div>
          </div>

          <Link
            href="/industries"
            className="mt-2 block px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            See all industries →
          </Link>

          <Link
            href="/contact"
            className="mt-4 block rounded-xl px-5 py-3.5 text-sm font-semibold text-white text-center min-h-[44px] flex items-center justify-center"
            style={{ background: "#015DF1" }}
          >
            Get Free Audit
          </Link>
        </div>
      )}
    </header>
  )
}
