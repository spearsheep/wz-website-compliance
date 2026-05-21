# Web Accessibility Compliance — Research Notes & Business Intelligence
*Last updated: May 20, 2026*

---

## Real-World Scan Results: 9 SMB Websites Audited

Scanned using **Google Lighthouse** via Chrome DevTools on May 20, 2026.
Tool coverage: Lighthouse detects approximately **30–40% of WCAG 2.1 AA issues** automatically.
All scores are for the **homepage only**. Inner pages (contact forms, booking, portals) typically score worse.

| # | Website | Industry | State | Score | Failed Tests | Scan Mode |
|---|---------|----------|-------|-------|-------------|-----------|
| 1 | dominguezfirm.com | Law | CA | **91/100** | 9 | Full nav |
| 2 | mylawcompany.com | Law | CA | **80/100** | 9 | Full nav |
| 3 | gbw.law | Law | CA | **84/100** | 13 | Snapshot |
| 4 | cd-lawyers.com | Law | CA | **85/100** | 10 | Snapshot |
| 5 | jefftollmd.com | Healthcare | CA | **83/100** | 12 | Full nav |
| 6 | myconciergemd.com | Healthcare | CA | **96/100** | 5 | Full nav |
| 7 | raymondjames.com/ifstampabay | Financial | FL | **73/100** | 12 | Snapshot |
| 8 | floridafa.com | Financial | FL | **87/100** | 9 | Snapshot |
| 9 | altfest.com | Financial | NY | **93/100** | 10 | Full nav |

**Average score: 85.8 / 100**
**Non-compliance rate: 9 out of 9 (100%)**
**No site scored 100. Every site had detectable legal-risk violations.**

### Reality check on the scores
A score of 85 sounds decent — it is not. Lighthouse weights scores by severity.
A single "critical" failure (e.g. color contrast on body text) pulls the score down significantly.
More importantly, Lighthouse only catches 30–40% of issues — so a site scoring 85 likely
has 2–3x as many actual violations when manually tested.

---

## Specific Failures Found (Real Data)

### mylawcompany.com — 80/100 (9 failures)
Worst-performing law firm. Specific failures detected:
- **Color contrast too low** — text invisible to users with low vision
- **Links have no discernible name** — screen readers say nothing useful
- **Skip navigation link broken** — keyboard users must tab through entire nav every page
- **Heading order wrong** — jumps from H1 to H3, breaks screen reader structure
- **Links rely on color only** — colorblind users can't tell what's a link
- **ARIA role structure broken** — child elements missing required roles
- **No main landmark** — screen readers can't find the main content area
- **iframe has no title** — embedded frames are invisible to screen readers

### jefftollmd.com — 83/100 (12 failures) — Private MD Practice
- **Color contrast too low** — most commonly litigated violation
- **Links have no discernible name**
- **Touch targets too small** — problematic on mobile
- **Visible labels don't match accessible names** — form elements mislead screen readers
- **List structure broken** — invalid HTML
- **iframe has no title**

### altfest.com — 93/100 (10 failures) — NY Wealth Management
Even the "best" financial site had failures:
- **iframes have no title** — embedded investment widgets inaccessible
- **tabindex values greater than 0** — disrupts natural keyboard navigation order
(Score of 93 sounds good, but with Lighthouse's 30–40% coverage, real violations likely 2–3x higher)

---

## Audit Tool Comparison: What to Use and When

| Tool | Coverage of WCAG 2.1 AA | Speed | Output | Best For |
|------|------------------------|-------|--------|----------|
| **Lighthouse** (Chrome DevTools) | 30–40% | Fast (30–60s) | 0–100 score + list | Quick scan, non-technical clients, first impression |
| **axe-core** (via Playwright) | 40–57% | Medium (60–90s) | JSON violations list | Detailed audit report, remediation work |
| **Manual + screen reader** | ~100% | Slow (hours) | Expert judgment | Full legal defensibility |
| **WAVE browser extension** | ~35% | Instant | Visual overlay | On-the-spot demos |

### What this means for the business
- **Lighthouse** = use for cold outreach scans (fast, score is intuitive for non-tech clients)
- **axe-core** = use for the paid audit report delivered to client
- **Neither alone = legal compliance.** A site that passes both automated tools 100% may still fail in court if manual testing finds issues.
- **Never promise "100% WCAG compliant"** without manual + screen reader testing. Promise: "built to WCAG 2.1 AA standards with automated verification."

---

## The Lawsuit Landscape (2025 Data, Verified)

### Volume
- 5,000+ total ADA web accessibility lawsuits in 2025 (federal + state courts)
- 27% increase in federal filings year-over-year
- 40% of 2025 federal filings were **pro se** — individuals using AI tools to find and file

### Who gets sued
- **67–77% of defendants** are businesses with under $25M annual revenue
- **Shopify is the most-sued platform** — 32% of all platform-specific cases
- Repeat targeting is common: 25% of 2024 suits were against companies already sued before

### Who is suing
- A small group of professional plaintiff firms (Gottlieb & Associates, Manning Law, etc.)
- 188 plaintiffs filed ALL 2,014 lawsuits in H1 2025
- These are professional operations, not random disabled individuals
- Attorney fees ($15K–$50K) are the actual profit center — plaintiff receives $5K–$25K personally

### Cost to defend
| Scenario | Cost |
|----------|------|
| Demand letter, quick settlement | $5K–$15K |
| Formal lawsuit, early settlement | $25K–$75K |
| Contested litigation | $75K–$175K+ |
| Business disruption, reputation damage | Hard to quantify |

### States with highest risk
| State | Risk | Why |
|-------|------|-----|
| California | CRITICAL | Unruh Act: $4,000/violation, no injury required, mandatory attorney fees |
| New York | CRITICAL | NYCHRL: punitive damages, no cap, broadest anti-discrimination standard |
| Florida | HIGH | #2 in federal filings 2025, nearly doubled year-over-year |
| Illinois | HIGH | Northern District: no physical nexus required for online-only businesses |

---

## Target Industries — Ranked by Willingness to Pay

### Tier 1: Proactive Buyers (highest value, easiest sell)

**Healthcare / Medical Practices**
- HHS Section 504 deadline for WCAG 2.1 AA: **May 2026** (large orgs), **May 2027** (small)
- Applies to any practice taking Medicare/Medicaid = virtually everyone
- Contact: **Practice Administrator or Office Manager** (not the doctor)
- Pitch: "You have a federal compliance deadline. An audit now costs a fraction of a retrofit."
- Average score in our scan: 89.5/100 (sounds good — still had real failures)

**Law Firms**
- Lawyers understand legal risk better than any other SMB sector
- Reputational disaster to be publicly sued for civil rights violations
- ABA published 2024 guidance — the issue is credentialed and real
- Contact: **Firm Administrator or Managing Attorney**
- Pitch: "Your firm helps clients manage risk. Here's your own site's compliance gap."

**Financial Services / Wealth Management**
- Compliance culture = already pre-sold on the concept of proactive risk management
- Dual exposure: ADA lawsuit + SEC/CFPB regulatory scrutiny
- Highest budget of all three tiers
- Contact: **COO or Compliance Officer**
- Note: Raymond James/ifstampabay scored 73/100 — worst in our scan

### Tier 2: Reactive Buyers (high volume, need fear as trigger)

**E-commerce / Shopify Stores**
- Shopify is the #1 most-sued platform (32% of all cases)
- Sweet spot: stores doing $1M–$50M/year
- Contact: **Founder** (under $3M), **Head of Marketing** (over $3M)
- Pitch: Show them their own site's failures. "Your Shopify store is in the profile that gets sued."

**Restaurants / Food Service**
- #1 most-sued industry in 2025 (34.65% of all cases)
- Mostly unaware the risk exists
- Contact: **The owner directly**
- Budget constraint: keep remediation affordable (~$1.5K–$3K)

---

## The Compliance Gap: Industry Non-Compliance Rates

From published research + our own scans:

| Source | Sample | Non-Compliance Rate |
|--------|--------|---------------------|
| WebAIM Million 2026 | 1,000,000 home pages | **95.9%** |
| AudioEye Index 2025 | 15,000 websites | **~98%** (only 2% pass 70% of criteria) |
| Our live scan (May 2026) | 9 real SMB sites | **100%** (9/9 failed) |

Our sample is small (9 sites) but directionally consistent with the published research.
Every site we actually scanned had real, specific violations.

---

## Honest Assessment: What Vibe Coding Can and Cannot Fix

### Can fix (covers ~70–80% of typical SMB site issues)
- Color contrast — CSS value changes
- Missing alt text — add alt attributes
- Form labels — add `<label>` elements
- Skip navigation link — one line of HTML
- Page title, language attribute — `<title>` and `lang="en"`
- Heading order — restructure h1→h2→h3
- Descriptive link text — rename "click here" links

### Needs careful implementation (use accessible component libraries)
- Dropdown menus with keyboard navigation → use **Radix UI or shadcn/ui**
- Modals/popups with focus trapping → Radix Dialog
- Custom form components → HeadlessUI or Radix
- Date pickers, sliders, carousels → pre-built accessible versions

**Key principle:** Build new sites on **Next.js + shadcn/ui** (built on Radix).
Accessibility keyboard patterns and ARIA are handled by the library, not vibe-coded.

### Cannot do without real testing
- Screen reader compatibility (need VoiceOver/NVDA)
- Meaningful alt text quality (judgment call)
- Third-party widget compliance (booking systems, chat widgets)

---

## Recommended Service Packages

### Package 1: Free Audit (Lead Gen Tool)
- Run Lighthouse scan on their homepage
- Generate 1-page PDF report with score and top 5 issues
- Include lawsuit cost risk estimate
- **Cost to deliver: ~2 minutes of compute**
- **Purpose: get the conversation started**

### Package 2: Full Audit Report ($500–$1,500)
- axe-core + Playwright deep scan on all key pages
- Detailed report with every violation, severity, and fix recommendation
- Delivered as branded PDF
- **Best for: businesses that want to know before deciding to fix**

### Package 3: Accessibility + Website Rebuild ($4,000–$12,000)
- Full website rebuild on Next.js + shadcn/ui (accessible by design)
- Automated WCAG verification before delivery
- "Built to WCAG 2.1 AA standards" — defensible claim
- Modern design, mobile-optimized, SEO-ready
- **This is the main offer. Lawsuit fear is the door opener.**

### Package 4: Monthly Monitoring ($150–$500/month)
- Automated monthly Lighthouse + axe-core scan
- Alert if new violations detected (content changes break compliance)
- 1-page PDF report per month
- **Recurring revenue. Sites drift out of compliance constantly.**

---

## Sales Pitch Structure (non-technical)

1. **Hook:** "Your website has [X] accessibility issues that could result in a lawsuit costing $30,000–$175,000 to defend."
2. **Proof:** Attach the PDF audit report showing their specific site's failures
3. **Context:** "5,000+ businesses were sued in 2025 for the same issues. 67% were small businesses like yours."
4. **Solution:** "We rebuild your website to be accessible by design — modern look, legally protected, and built to last."
5. **Close:** "The audit is free. The rebuild starts at $X. A lawsuit costs $30K minimum."

---

## Tech Stack for the Tool

### Discovery (finding prospects)
- **Google Places API (New)** — search by industry + city, returns website URLs
- Cost: ~$0.017 per business detail lookup
- Script: `src/discover.js` in accessibility-scout project

### Quick Audit (Lighthouse — for cold outreach)
- **Chrome DevTools MCP** → `lighthouse_audit` tool
- OR **Google PageSpeed Insights API** (free, no browser needed, returns Lighthouse data)
- Gives 0–100 score + failed test list
- Fast: 30–60 seconds per site

### Deep Audit (axe-core — for paid reports)
- **Playwright + @axe-core/playwright**
- Returns structured JSON violation list
- Template → PDF via Playwright's `page.pdf()`
- Project: `/Users/raywang/Desktop/accessibility-scout/`
- Run: `node src/audit.js <url> <business-name>`

### Better discovery alternative: Google PageSpeed Insights API
No browser needed. Returns Lighthouse accessibility data via HTTP call.
```
GET https://www.googleapis.com/pagespeedonline/v5/runPagespeed
  ?url=https://example.com
  &category=ACCESSIBILITY
  &strategy=DESKTOP
  &key=YOUR_API_KEY
```
This is faster than running a headless browser for bulk discovery scans.

---

## Key Limitations to Be Honest About

1. **Lighthouse covers 30–40% of WCAG issues.** axe-core covers 40–57%. Neither is comprehensive.
2. **These scans test home pages only.** Contact forms, booking flows, and portals are typically worse.
3. **The 95% non-compliance figure** comes from large published studies (WebAIM Million = 1M sites, AudioEye = 15K sites). Our 9-site scan is directionally consistent but not statistically significant.
4. **Never claim "100% WCAG 2.1 AA compliant"** without manual + screen reader testing. Use: "built to WCAG 2.1 AA standards with automated verification."
5. **Overlays (AccessiBe, UserWay) do not work** — 22.6% of sued businesses in 2025 had one installed. FTC fined AccessiBe $1M in 2025 for misleading claims. Do not recommend or install overlays.

---

## Project Files

- **accessibility-scout tool:** `/Users/raywang/Desktop/accessibility-scout/`
  - `src/discover.js` — Google Places prospect discovery
  - `src/audit.js` — single URL deep audit → PDF
  - `src/audit-batch.js` — batch audit from prospects list
  - `templates/report.html` — branded audit report template
- **This notes file:** `/Users/raywang/Desktop/Softwares/Website Compliance/RESEARCH-NOTES.md`
