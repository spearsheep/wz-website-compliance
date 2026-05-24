"use client"

import type { Metadata } from "next"
import { useState } from "react"
import { Mail, Clock, Shield, CheckCircle } from "lucide-react"
import { ComplianceBadge } from "@/components/compliance/ComplianceBadge"
import { ComplianceHighlight } from "@/components/compliance/ComplianceHighlight"

// Can't export metadata from a "use client" component — using static values inline

const services = [
  "Free Accessibility Audit",
  "Fix & Remediation",
  "Full Compliance Rebuild",
  "Quarterly Maintenance",
  "Not sure — need guidance",
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    service: "",
    message: "",
  })
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  function validate() {
    const e: Partial<typeof form> = {}
    if (!form.name.trim()) e.name = "Name is required"
    if (!form.email.trim()) e.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address"
    if (!form.service) e.service = "Please select a service"
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="py-24 px-6 flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="inline-flex rounded-full p-4 bg-[var(--green)]/20 mb-6">
            <CheckCircle size={32} className="text-[var(--green)]" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-3">We&apos;ll be in touch</h1>
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            Thanks, {form.name}. We&apos;ll review your submission and get back to you within 24 hours. If you requested a free audit, expect results in 48–72 hours.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10 md:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-14">
          <ComplianceHighlight
            label="Easy-to-read text"
            explanation="The big dark words sit on a light background, so they are simple to see. A person with weak eyesight can read this without squinting."
            wcagId="1.4.3"
            wcagName="Contrast (Minimum)"
            position="bottom"
            className="mb-4 mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)]">
              Start with a free audit
            </h1>
          </ComplianceHighlight>
          <p className="text-[var(--muted-foreground)] text-lg max-w-xl mx-auto">
            No commitment. No sales pressure. Just a clear picture of your compliance risk within 48 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
              className="space-y-5"
            >
              {/* This form itself is a live compliance demo */}
              <div className="rounded-lg border border-[var(--green)]/20 bg-[var(--green)]/5 p-4 flex items-start gap-2 text-xs text-slate-600">
                <Shield size={14} className="text-[#065F3B] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  This form is WCAG 2.1 compliant — all fields have labels, errors are announced to screen readers, and required fields are marked.{" "}
                  <ComplianceBadge
                    criterionId="3.3.2"
                    criterionName="Labels or Instructions"
                    wcagLevel="A"
                    plainEnglish="Every input in a form must have a visible label programmatically connected to the field. Placeholder text that disappears when you type does not count as a label."
                    legalText="WCAG 2.1 SC 3.3.2: 'Labels or instructions are provided when content requires user input.' Applied under ADA Title III (42 U.S.C. § 12181)."
                    lawsuits={[{ case: "Robles v. Domino's Pizza LLC", year: 2016, jurisdiction: "9th Circuit (California)", outcome: "Inaccessible form fields were central to the complaint. 9th Circuit ruled for plaintiff in 2019." }]}
                    position="bottom"
                  />
                </span>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  Full name <span className="text-[var(--fail)]" aria-label="required">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={!!errors.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full rounded-lg border px-4 py-3 text-sm bg-[var(--input)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)] transition-colors ${errors.name ? "border-[var(--fail)]" : "border-[var(--border)]"}`}
                  placeholder="Jane Smith"
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="mt-1 text-xs text-[var(--fail)]">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  Email address <span className="text-[var(--fail)]" aria-label="required">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={!!errors.email}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full rounded-lg border px-4 py-3 text-sm bg-[var(--input)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)] transition-colors ${errors.email ? "border-[var(--fail)]" : "border-[var(--border)]"}`}
                  placeholder="jane@company.com"
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-1 text-xs text-[var(--fail)]">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    autoComplete="organization"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full rounded-lg border border-[var(--border)] px-4 py-3 text-sm bg-[var(--input)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)] transition-colors"
                    placeholder="Acme Corp"
                  />
                </div>

                {/* Website */}
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                    Website URL
                  </label>
                  <input
                    id="website"
                    type="url"
                    autoComplete="url"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    className="w-full rounded-lg border border-[var(--border)] px-4 py-3 text-sm bg-[var(--input)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)] transition-colors"
                    placeholder="https://your-site.com"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  What are you looking for? <span className="text-[var(--fail)]" aria-label="required">*</span>
                </label>
                <select
                  id="service"
                  required
                  aria-required="true"
                  aria-describedby={errors.service ? "service-error" : undefined}
                  aria-invalid={!!errors.service}
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className={`w-full rounded-lg border px-4 py-3 text-sm bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)] transition-colors ${errors.service ? "border-[var(--fail)]" : "border-[var(--border)]"}`}
                >
                  <option value="" disabled>Select a service…</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.service && (
                  <p id="service-error" role="alert" className="mt-1 text-xs text-[var(--fail)]">
                    {errors.service}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  Additional context
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg border border-[var(--border)] px-4 py-3 text-sm bg-[var(--input)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)] transition-colors resize-none"
                  placeholder="Tell us about your site, any recent demand letters, or specific concerns…"
                />
              </div>

              <p className="text-xs text-[var(--muted-foreground)]">
                <span className="text-[var(--fail)]">*</span> Required fields
              </p>

              <button
                type="submit"
                className="w-full rounded-xl bg-[var(--blue)] px-6 py-4 font-semibold text-white hover:bg-blue-600 transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Submit Request
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2 space-y-5">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full p-2 bg-[var(--blue)]/10">
                  <Clock size={16} className="text-[var(--blue)]" aria-hidden="true" />
                </div>
                <h2 className="font-semibold text-[var(--foreground)]">What happens next</h2>
              </div>
              <ol className="space-y-4" aria-label="Process steps">
                {[
                  { step: "1", text: "We review your submission within 24 hours" },
                  { step: "2", text: "If you requested an audit, we begin scanning your site" },
                  { step: "3", text: "You receive a detailed report in 48–72 hours" },
                  { step: "4", text: "We schedule a call to walk through findings and recommend next steps" },
                ].map(({ step, text }) => (
                  <li key={step} className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--blue)]/20 text-[var(--blue)] text-xs font-bold flex items-center justify-center">
                      {step}
                    </span>
                    <p className="text-sm text-[var(--muted-foreground)]">{text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full p-2 bg-[var(--green)]/10">
                  <Mail size={16} className="text-[var(--green)]" aria-hidden="true" />
                </div>
                <h2 className="font-semibold text-[var(--foreground)]">Contact</h2>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Email and phone coming soon. Use the form above for fastest response.
              </p>
              <p className="text-xs text-[var(--muted-foreground)] mt-3">
                Domain and contact details are being finalized.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--fail)]/20 bg-[var(--fail)]/5 p-5">
              <p className="text-xs font-semibold text-red-700 mb-2">Received a demand letter?</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                If you&apos;ve already received an ADA demand letter or lawsuit notice, contact us immediately. We can provide an emergency audit and remediation plan to support your legal response.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
