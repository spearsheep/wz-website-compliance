# Beyond WCAG 2.1 AA: The Full Legal Compliance Landscape

WCAG 2.1 Level AA is the technical benchmark courts most commonly cite — but the **legal framework** that creates the lawsuit risk is broader. A business can be sued for non-compliance even if they pass WCAG 2.1 AA, because the underlying legal duties extend beyond the website itself.

This document maps everything that creates legal exposure for inaccessible digital experiences.

---

## The Layered Legal Framework

```
LAW (creates the duty)
  ↓
ADA Title III (private businesses, "public accommodations")
Section 504 of Rehabilitation Act (federal funding recipients — healthcare, education)
Section 508 (federal contractors)
21st Century Communications and Video Accessibility Act (CVAA — media)
+ STATE LAWS (California Unruh, NYC HRL, NYSHRL, etc.)
  ↓
TECHNICAL STANDARDS (what counts as "accessible")
  ↓
WCAG 2.1 AA (the most-cited)
WCAG 2.2 AA (newer, trending in newer cases)
PDF/UA (documents)
Section 508 Standards (different but similar to WCAG)
Apple HIG + Android Accessibility (mobile-specific)
```

---

## 1. WCAG 2.2 AA — The Newer Standard Courts Are Starting To Cite

Released October 2023. Adds **9 new criteria** beyond WCAG 2.1 AA. **Charles Schwab (2024)** was specifically required to meet WCAG 2.2 AA, not 2.1 AA.

| New criterion (2.2) | What it requires |
|---|---|
| 2.4.11 Focus Not Obscured (Minimum) | Focused element must not be hidden behind sticky headers |
| 2.4.12 Focus Not Obscured (Enhanced) | AAA-level focus visibility |
| 2.4.13 Focus Appearance | Focus indicator must be at least 2px thick with sufficient contrast |
| 2.5.7 Dragging Movements | Any drag interaction must have a single-pointer alternative |
| 2.5.8 Target Size (Minimum) | Touch/click targets ≥24×24 CSS pixels |
| 3.2.6 Consistent Help | Help links must appear in consistent location across pages |
| 3.3.7 Redundant Entry | Don't make users re-enter info they already provided |
| 3.3.8 Accessible Authentication (Minimum) | No cognitive function tests (e.g., image CAPTCHA) without alternative |
| 3.3.9 Accessible Authentication (Enhanced) | AAA-level no-cognitive-tests rule |

**Trend:** Newer settlements (post-2024) are starting to require WCAG 2.2 AA. Within 18-24 months it will likely become the new benchmark courts cite.

---

## 2. Mobile App Accessibility (Often Missed)

WCAG is HTML-focused. Native mobile apps have DIFFERENT requirements:

| Platform | Standard | What it requires |
|---|---|---|
| **iOS** | Apple Accessibility Guidelines | VoiceOver compatibility, Dynamic Type, reduced motion, sufficient contrast |
| **Android** | Android Accessibility Guidelines | TalkBack compatibility, Switch Access, font scaling |

**Real case:** *United States v. Service Oklahoma* (2024) — DOJ settlement over their Mobile ID App being inaccessible to TalkBack/VoiceOver users.

Lawsuits that cited mobile-specific failures: Schwab (Schwab Mobile app), Robles v. Domino's (Domino's mobile app), Service Oklahoma.

---

## 3. PDF and Document Accessibility

WCAG doesn't fully address PDFs. The relevant standard is **PDF/UA (ISO 14289)**.

A site can pass WCAG 2.1 AA on its HTML pages but still face a lawsuit if it serves critical content via inaccessible PDFs:
- Menu PDFs on restaurant sites
- Patient intake forms in PDFs
- Legal disclosures
- Billing statements
- Brochures and white papers

**Real cases:**
- **Bone v. UNC Health Care** — billing statements, after-visit summaries, medication instructions
- **NFB v. Anthem (WellPoint)** — explanation of benefits documents
- **DOJ enforcement** — many DOJ consent decrees require BOTH WCAG 2.1 AA AND PDF/UA for documents

---

## 4. Video and Audio (CVAA — separate law)

The **21st Century Communications and Video Accessibility Act (CVAA)** creates stricter requirements for media companies:

- Closed captioning for prerecorded video that aired on TV
- Audio descriptions for prerecorded TV programming
- Accessible advanced communication services (video calls, real-time text)

**Real cases:**
- NAD v. Netflix (2012) — captioning required for streaming
- NAD v. Harvard (2020) — captions on educational video
- NAD v. MIT (2020) — same

If a business publishes substantial video content (training, marketing, courses), CVAA can apply on top of ADA.

---

## 5. State-Specific Laws That Go BEYOND ADA

ADA Title III is federal. Several states have their own laws with **stricter requirements OR statutory damages** the ADA doesn't provide.

### California — Unruh Civil Rights Act (CRITICAL)
- **$4,000 statutory damages per violation** — automatic, no proof of injury required
- Mandatory attorney fees for prevailing plaintiff
- Applies to any business serving California customers online
- This is why CA has the most filings per capita

### New York City — Human Rights Law (NYCHRL)
- Broader anti-discrimination standard than ADA
- Punitive damages available
- Compensatory damages with no cap

### New York State — Human Rights Law (NYSHRL)
- Expanded in 2019 to cover most businesses
- Statewide application

### Other notable state laws
- **Massachusetts** — Public Accommodations Law (G.L. c. 272 §98)
- **Florida** — civil rights statute
- **New Jersey** — Law Against Discrimination (LAD)
- **Texas** — civil rights statute (less plaintiff-friendly)

Where ADA gives you only injunctive relief + attorney fees, **state laws can add tens of thousands per violation in statutory damages**.

---

## 6. Section 504 of the Rehabilitation Act (Healthcare + Education + Federal Funding)

If a business receives ANY federal funding — Medicare, Medicaid, federal research grants, federal contracts — Section 504 applies.

**HHS Section 504 Final Rule (May 2024):**
- WCAG 2.1 AA mandatory for all federally-funded healthcare
- Patient portals + mobile apps explicitly covered
- Compliance deadlines: **May 11, 2026** (large orgs) / **May 10, 2027** (small)
- Applies to virtually every hospital, clinic, medical practice

Section 504 is enforced by HHS Office for Civil Rights — DOJ-grade enforcement, separate from ADA Title III lawsuits.

---

## 7. Section 508 (Federal Procurement)

Federal agencies and federal contractors must comply with Section 508. Uses similar but slightly different standards than WCAG 2.1 AA.

If you sell to the government — even subcontracting — Section 508 applies to:
- Websites you provide
- Software
- Electronic documents
- Procurement processes themselves

---

## 8. "Effective Communication" — The Broader ADA Duty

ADA Title III requires "effective communication" with disabled customers — not just an accessible website. A site can pass WCAG 2.1 AA and still face a lawsuit if the business fails its broader duty to provide:

| Auxiliary aid | When required |
|---|---|
| **Braille / large print materials** | When information is critical (billing, medical, legal) |
| **Sign language interpreter** | For video content, live events, important meetings |
| **Audio description** | For video where visual info is necessary |
| **TTY/TDD or relay service** | For phone communication |
| **Accessible documents in requested format** | On request, in reasonable time |

**Real case:** *Bone v. UNC Health Care* — the website was relatively functional, but the failure to provide Braille/large-print versions of medical communications was the violation.

---

## 9. International Compliance (If You Have Customers Abroad)

| Region | Law | Effective |
|---|---|---|
| **EU** | European Accessibility Act (EAA) | June 28, 2025 |
| **EU** | Web Accessibility Directive | In force (public sector) |
| **UK** | Equality Act 2010 + Public Sector Accessibility Regulations | In force |
| **Canada** | Accessibility for Ontarians with Disabilities Act (AODA) | In force (graduated deadlines) |
| **Australia** | Disability Discrimination Act | In force |

The **EU EAA** is the biggest near-term concern — it applies to most consumer-facing digital products and services serving EU customers, effective June 2025.

---

## 10. The "Effective Communication" Lawsuit Risks That Aren't About Websites

Even if your website is perfect, these can still cause lawsuits:

| Issue | Why it's a lawsuit risk |
|---|---|
| **Inaccessible email** | HTML emails sent to customers must be screen-reader-compatible |
| **Inaccessible kiosk / POS** | If you use them, ATM/payment terminals must be accessible |
| **Inaccessible phone tree (IVR)** | Phone menus must accommodate deaf/hard-of-hearing users |
| **Inaccessible Zoom / webinar** | Live captioning required for important meetings |
| **Inaccessible event registration** | Standalone registration platforms (Eventbrite, etc.) |
| **Third-party widgets you embed** | Booking systems, chat, payment forms — you're liable for them |
| **Social media as a "channel"** | Inaccessible posts (no alt text, no captions) can be evidence of pattern violation |

---

## Summary: The Full Compliance Universe

| Layer | What it covers | Sue-able? |
|---|---|---|
| **WCAG 2.1 AA** | Website HTML, current legal benchmark | ✅ Most common |
| WCAG 2.2 AA | Newer additions (focus, target size, auth, redundant entry) | ✅ Increasing |
| Mobile app guidelines | iOS/Android native apps | ✅ Yes |
| PDF/UA | Documents on the site | ✅ Yes |
| CVAA | Video captions, audio descriptions for media | ✅ Yes (specific sectors) |
| State laws (CA, NY, etc.) | Statutory damages on top of ADA | ✅ Highest dollar exposure |
| Section 504 | Federal funding recipients (healthcare) | ✅ HHS enforcement |
| Section 508 | Federal contractors | ✅ Federal procurement |
| "Effective communication" | Braille, captions, interpreters, alternatives | ✅ Underrated risk |
| EU EAA / AODA | International customers | ✅ Foreign exposure |
| Email / kiosks / phone trees | Other digital touchpoints | ✅ Less common but real |

---

## What This Means for Your Sales Pitch

When a prospect asks **"If I pass your audit, am I safe?"** — the honest answer is:

> *"My audit covers WCAG 2.1 AA, which is the standard cited in roughly 90% of website lawsuits. That dramatically reduces your exposure. But you still need to think about: video captions if you publish video, document accessibility if you serve PDFs to customers, and your mobile app if you have one. For healthcare, you also need to think about HHS Section 504. For California customers, the Unruh Act adds statutory damages even for minor violations."*

That kind of nuanced answer is **more credible** than promising "100% compliance." Most accessibility vendors overclaim. Honest framing differentiates Juris.

---

## What's IN Our Scanner vs. What Requires Manual / Other Tools

| Compliance area | Our combined scanner detects? |
|---|---|
| WCAG 2.1 AA (most criteria) | ✅ Lighthouse + axe-core + a11y tree (~64% coverage) |
| WCAG 2.2 AA additions | ⚠️ Most NOT detected yet (newer; tools catching up) |
| Mobile app accessibility | ❌ Need separate testing (Appium, manual TalkBack/VoiceOver) |
| PDF accessibility | ❌ Need PAC 2024 (free PDF accessibility checker) |
| Video captions | ❌ Manual review |
| Effective communication / Braille / etc. | ❌ Not a tech issue — requires policy review |
| State law-specific issues | ❌ Manual analysis required |

The scanner solves the **biggest sliver of the problem** — the 80% that's litigated. The rest is consulting work that comes after they engage.
