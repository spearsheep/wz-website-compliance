# Juris Service Checklist — Master Compliance Scope
**Every item that gets checked as part of a complete Juris compliance audit.**

This is the single source of truth for what the service covers. Each row maps to:
- A specific legal/technical standard
- A detection method (automated / manual / policy)
- A service tier (Standard / Mobile Add-On / Documents Add-On / Premium)
- A reference to supporting research in `research/`

---

## Tier Structure

| Tier | What it covers | Detection |
|---|---|---|
| **🟢 STANDARD** | Website HTML — WCAG 2.1 AA core | Automated + manual review |
| **🟡 MOBILE** | iOS / Android native apps | Manual VoiceOver + TalkBack |
| **🟠 DOCUMENTS** | PDFs served from the site | PAC 2024 + manual |
| **🔵 PREMIUM** | Video, state-law risk, effective-communication, international | Manual + policy review |

---

# 🟢 STANDARD: Website HTML (WCAG 2.1 AA — 50 criteria)

The legal benchmark cited in ~90% of ADA web lawsuits. Detected automatically by Lighthouse + axe-core + a11y tree review.

## Principle 1 — Perceivable

### 1.1 Text Alternatives
- [ ] **1.1.1** All images have meaningful alt text or marked decorative ✅ auto
- [ ] **1.1.1 Quality Check** Alt text is descriptive, not "image.jpg" 🛠️ manual

### 1.2 Time-based Media
- [ ] **1.2.1** Audio-only / video-only content has transcript or description 🛠️ manual
- [ ] **1.2.2** Prerecorded video has captions ⚠️ partial auto
- [ ] **1.2.3** Prerecorded video has audio description or text alternative 🛠️ manual
- [ ] **1.2.4** Live video has captions 🛠️ manual
- [ ] **1.2.5** Prerecorded video has audio descriptions 🛠️ manual

### 1.3 Adaptable
- [ ] **1.3.1** Headings, lists, tables use semantic HTML ✅ auto
- [ ] **1.3.2** Content reads in logical order when CSS removed 🛠️ manual
- [ ] **1.3.3** Instructions don't rely on shape/color/position alone 🛠️ manual
- [ ] **1.3.4** Page works in both portrait and landscape ✅ auto
- [ ] **1.3.5** Form fields use `autocomplete` for common data ✅ auto

### 1.4 Distinguishable
- [ ] **1.4.1** Color is not the only indicator of meaning 🛠️ manual
- [ ] **1.4.2** Audio over 3 sec has pause/stop control 🛠️ manual
- [ ] **1.4.3** ⭐ **Body text contrast ≥ 4.5:1** ✅ auto — #1 lawsuit trigger
- [ ] **1.4.4** Text remains readable at 200% zoom ⚠️ partial auto
- [ ] **1.4.5** No images of text where real text would work 🛠️ manual
- [ ] **1.4.10** Content reflows at 320px width ⚠️ partial auto
- [ ] **1.4.11** Buttons/inputs have ≥3:1 contrast against background ✅ auto
- [ ] **1.4.12** Layout doesn't break with custom text spacing 🛠️ manual
- [ ] **1.4.13** Tooltips/dropdowns are dismissible and hoverable 🛠️ manual

## Principle 2 — Operable

### 2.1 Keyboard
- [ ] **2.1.1** ⭐ Every function works by keyboard ⚠️ partial auto
- [ ] **2.1.2** No keyboard traps (can tab in AND out) ✅ auto
- [ ] **2.1.4** Single-key shortcuts can be turned off 🛠️ manual

### 2.2 Enough Time
- [ ] **2.2.1** Time limits extendable / removable 🛠️ manual
- [ ] **2.2.2** Auto-play / carousels can be paused 🛠️ manual

### 2.3 Seizures
- [ ] **2.3.1** Nothing flashes more than 3 times per second 🛠️ manual

### 2.4 Navigable
- [ ] **2.4.1** ⭐ "Skip to main content" link present ✅ auto
- [ ] **2.4.2** ⭐ Each page has a unique, descriptive `<title>` ✅ auto
- [ ] **2.4.3** Tab order follows visual reading order ⚠️ partial auto
- [ ] **2.4.4** Links have meaningful purpose (no "click here") ⚠️ partial auto
- [ ] **2.4.5** Multiple ways to find pages (search/sitemap/menu) 🛠️ manual
- [ ] **2.4.6** Headings and labels clearly describe content ⚠️ partial auto
- [ ] **2.4.7** ⭐ Focused element is visibly highlighted ✅ auto

### 2.5 Input Modalities
- [ ] **2.5.1** No multi-finger gestures required 🛠️ manual
- [ ] **2.5.2** Single-click actions cancellable 🛠️ manual
- [ ] **2.5.3** Accessible name includes visible label text ✅ auto
- [ ] **2.5.4** Motion-triggered functions have alternative 🛠️ manual

## Principle 3 — Understandable

### 3.1 Readable
- [ ] **3.1.1** ⭐ `<html>` tag declares page language ✅ auto
- [ ] **3.1.2** Foreign-language passages marked ⚠️ partial auto

### 3.2 Predictable
- [ ] **3.2.1** Tabbing doesn't trigger page changes 🛠️ manual
- [ ] **3.2.2** Selecting options doesn't auto-submit 🛠️ manual
- [ ] **3.2.3** Navigation appears in same place on every page 🛠️ manual
- [ ] **3.2.4** Same icon/button means same thing site-wide 🛠️ manual

### 3.3 Input Assistance
- [ ] **3.3.1** Form errors identified in text 🛠️ manual
- [ ] **3.3.2** ⭐ Every form field has a visible label ✅ auto
- [ ] **3.3.3** Error messages suggest how to fix the issue 🛠️ manual
- [ ] **3.3.4** Important submissions are reversible/reviewable 🛠️ manual

## Principle 4 — Robust

### 4.1 Compatible
- [ ] **4.1.1** Valid HTML — no duplicate IDs ✅ auto (deprecated in 2.2)
- [ ] **4.1.2** ⭐ Every interactive element has name, role, value ✅ auto
- [ ] **4.1.3** Status messages announced to screen readers ⚠️ partial auto

**⭐ = One of the 10 most-cited violations in lawsuits (80% of cases)**

---

# 🟢 STANDARD: WCAG 2.2 AA — 9 New Criteria (Trending Standard)

WCAG 2.2 was released October 2023. Required in newer settlements (Schwab 2024). Will likely be the legal benchmark within 18–24 months.

- [ ] **2.4.11** Focus indicator not obscured by sticky headers
- [ ] **2.4.13** Focus indicator ≥ 2px with sufficient contrast
- [ ] **2.5.7** Drag interactions have single-pointer alternative
- [ ] **2.5.8** Touch/click targets ≥ 24×24 CSS pixels
- [ ] **3.2.6** Help links in consistent location across pages
- [ ] **3.3.7** Don't make users re-enter info already provided
- [ ] **3.3.8** No cognitive-function-test CAPTCHAs without alternative
- [ ] **3.3.9** AAA-level no-cognitive-tests rule
- [ ] **2.4.12** AAA focus visibility (premium)

---

# 🟡 MOBILE APP ACCESSIBILITY (Add-On)

WCAG doesn't fully cover native apps. Different APIs, different requirements.

### iOS — Apple Accessibility Guidelines
- [ ] VoiceOver reads every screen, button, and form field
- [ ] Dynamic Type supported (text resizes with system settings)
- [ ] Reduce Motion respected
- [ ] Sufficient contrast (4.5:1 for text)
- [ ] All gestures have button-based alternatives
- [ ] Custom controls expose accessibilityLabel + accessibilityHint
- [ ] Tap targets ≥ 44×44 pt

### Android — Android Accessibility Guidelines
- [ ] TalkBack reads every screen, button, and form field
- [ ] Font scaling supported (textSize uses `sp` not `dp`)
- [ ] Switch Access compatible
- [ ] Sufficient contrast (4.5:1 for text)
- [ ] All gestures have button alternatives
- [ ] Tap targets ≥ 48×48 dp
- [ ] Custom Views expose accessibility actions

**Real lawsuit:** *US v. Service Oklahoma (2024)* — DOJ settlement over inaccessible mobile ID app.

---

# 🟠 PDF & DOCUMENT ACCESSIBILITY (Add-On)

PDF/UA standard (ISO 14289). Required when forms or critical content live in PDFs.

- [ ] PDFs are tagged (not image-based)
- [ ] Reading order is logical
- [ ] Headings use real heading tags (H1, H2, H3)
- [ ] Tables have proper header rows
- [ ] Form fields are accessible (not just visual)
- [ ] Alt text on images embedded in PDFs
- [ ] Document language is declared
- [ ] Bookmarks for long documents
- [ ] No critical info as scanned-image-only

**Real lawsuits:**
- *Bone v. UNC Health Care* — billing statements, after-visit summaries
- *NFB v. Anthem* — explanation of benefits documents

---

# 🔵 PREMIUM: Video and Audio (CVAA Compliance)

Separate federal law (21st Century Communications and Video Accessibility Act).

- [ ] Prerecorded video has closed captions
- [ ] Captions are accurate (not auto-generated only)
- [ ] Captions are properly synced
- [ ] Live video has live captions
- [ ] Video with critical visual info has audio description
- [ ] Transcripts available for podcasts/audio
- [ ] Video player controls are keyboard accessible
- [ ] Volume / playback controls accessible

**Real lawsuits:** *NAD v. Netflix, NAD v. Harvard, NAD v. MIT*

---

# 🔵 PREMIUM: State Law Risk Review

Some states create dollar-amount liability the federal ADA doesn't.

- [ ] **California Unruh Act** — $4,000 statutory damages per violation, mandatory attorney fees. Applies to any business serving CA customers online.
- [ ] **NYC Human Rights Law** — punitive damages, no cap.
- [ ] **NY State Human Rights Law** — statewide coverage.
- [ ] **Massachusetts G.L. c. 272 §98** — public accommodations.
- [ ] **NJ Law Against Discrimination** — broader protected classes.
- [ ] **Florida Civil Rights Act** — lower bar than ADA.

The audit deliverable for this tier includes a state-by-state risk map for the client's customer base.

---

# 🔵 PREMIUM: Section 504 (Healthcare + Federally-Funded)

If the client receives any federal funding — including Medicare/Medicaid — Section 504 applies. HHS Final Rule effective July 2024.

- [ ] WCAG 2.1 AA compliance verified
- [ ] Patient portals tested with NVDA, JAWS, VoiceOver
- [ ] Mobile apps tested with TalkBack and VoiceOver
- [ ] Auxiliary aids policy in place
- [ ] **Deadline May 11, 2026** (organizations with 15+ employees)
- [ ] **Deadline May 10, 2027** (smaller organizations)

---

# 🔵 PREMIUM: Section 508 (Federal Contracting)

If the client sells to government — direct or as a subcontractor.

- [ ] Website meets Section 508 / WCAG 2.0 AA equivalent
- [ ] Internal software accessible
- [ ] Electronic documents accessible
- [ ] Procurement language updated

---

# 🔵 PREMIUM: "Effective Communication" Policy Review

ADA Title III requires effective communication, not just an accessible site.

- [ ] Braille / large print materials available on request
- [ ] Sign language interpreter policy for live events
- [ ] Audio description policy for critical video
- [ ] TTY/TDD or relay service for phone customers
- [ ] Document format alternatives on request (Word, audio, etc.)
- [ ] Customer-facing staff trained on accessibility requests

**Real lawsuit:** *Bone v. UNC Health Care* — won on this duty, not website issues.

---

# 🔵 PREMIUM: International Compliance (If Serving Customers Abroad)

- [ ] **EU European Accessibility Act (EAA)** — effective June 28, 2025
- [ ] **EU Web Accessibility Directive** — public sector
- [ ] **UK Equality Act 2010**
- [ ] **AODA (Ontario, Canada)**
- [ ] **Australia Disability Discrimination Act**

---

# 🔵 PREMIUM: Adjacent Digital Touchpoints

A WCAG-compliant website still leaves exposure here:

- [ ] HTML email accessibility (alt text, color contrast, screen-reader friendly)
- [ ] Kiosks / point-of-sale terminals
- [ ] Phone IVR / phone tree accommodations
- [ ] Zoom / webinar live captioning
- [ ] Event registration platforms (Eventbrite, etc.)
- [ ] Third-party embedded widgets (booking, chat, payments)
- [ ] Social media posts (alt text, video captions)

---

# Service Tier Pricing Map (Suggested)

| Tier | Scope | Suggested Price |
|---|---|---|
| **Free Scan** | Lighthouse-only quick audit, 1-page PDF | $0 (lead magnet) |
| **🟢 STANDARD AUDIT** | Full WCAG 2.1 AA + 2.2 AA — automated + manual review | $1,500 – $3,000 |
| **🟢 STANDARD REBUILD** | New website built compliant from scratch | $4,000 – $12,000 |
| **🟡 + Mobile App** | iOS + Android native app audit | +$2,000 – $4,000 |
| **🟠 + Documents** | PDF remediation (per document) | +$50 – $200 per PDF |
| **🔵 PREMIUM PACKAGE** | Includes Standard + Mobile + Docs + state-law review + policy review | $8,000 – $25,000 |
| **Monthly Monitoring** | Quarterly re-scan + alert on regressions | $150 – $500/month |

---

# How This Maps to the Existing Research

| Service tier item | Backed by research file |
|---|---|
| WCAG 2.1 AA criteria | `research/WCAG-COMPLIANCE-CHECKLIST.md` |
| WCAG 2.2 AA additions | `research/LEGAL-FRAMEWORK-BEYOND-WCAG.md` (§1) |
| Mobile app | `research/LEGAL-FRAMEWORK-BEYOND-WCAG.md` (§2) + `b2b-lawsuits/doj-service-oklahoma-mobile-app.json` |
| PDF/Documents | `research/LEGAL-FRAMEWORK-BEYOND-WCAG.md` (§3) + `b2b-lawsuits/bone-v-unc-health-care.json` |
| Video/CVAA | `research/LEGAL-FRAMEWORK-BEYOND-WCAG.md` (§4) + `lawsuits/nad-v-netflix.json`, `nad-v-harvard.json`, `nad-v-mit.json` |
| State laws | `research/LEGAL-FRAMEWORK-BEYOND-WCAG.md` (§5) |
| Section 504 | `research/LEGAL-FRAMEWORK-BEYOND-WCAG.md` (§6) + all 8 healthcare B2B cases |
| Section 508 | `research/LEGAL-FRAMEWORK-BEYOND-WCAG.md` (§7) |
| Effective communication | `research/LEGAL-FRAMEWORK-BEYOND-WCAG.md` (§8) + `b2b-lawsuits/bone-v-unc-health-care.json` |
| International | `research/LEGAL-FRAMEWORK-BEYOND-WCAG.md` (§9) |
| Adjacent touchpoints | `research/LEGAL-FRAMEWORK-BEYOND-WCAG.md` (§10) |

---

# How the Combined Scanner Maps Against This List

| Tier | Items Auto-Detected | Items Manual-Required |
|---|---|---|
| 🟢 WCAG 2.1 AA | 22 / 50 = 44% | 28 / 50 = 56% |
| 🟢 WCAG 2.2 AA additions | ~3 / 9 = 33% | 6 / 9 = 67% |
| 🟡 Mobile | 0% | 100% (requires Appium + manual) |
| 🟠 PDF | 0% (need PAC 2024 tool) | All |
| 🔵 Video | 0% | All |
| 🔵 State law | 0% | All (legal review) |
| 🔵 Section 504/508 | Same as WCAG 2.1 + manual policy | Same |
| 🔵 Effective communication | 0% | All (policy review) |
| 🔵 International | 0% | All |

The combined scanner solves the **biggest sliver of the problem (44% of WCAG 2.1 AA, which is 90% of website-only lawsuits)**. Everything else is consulting and manual work — which is also the higher-margin upsell path.
