# Competitive Brief: Website Accessibility Compliance Market
**For: Juris** | Prepared: May 21, 2026 | Research horizon: 2024–2026

---

## Executive Summary

The website accessibility compliance market is experiencing a structural inflection point driven by three forces: the FTC's April 2025 $1M fine against accessiBe (killing the "AI overlay = compliance" myth), a 37% surge in ADA lawsuits in 2025 (now 3,948 annual filings), and the May 11, 2026 HHS healthcare deadline requiring WCAG 2.1 AA for any healthcare organization receiving Medicare/Medicaid funds. The overlay category — which dominated SMB adoption for the past five years — is collapsing in credibility. Courts reject overlays as good-faith compliance. 22.6% of 2025 lawsuits hit sites that already had an overlay installed. SMBs are looking for something real and affordable, and no one is serving them well.

The market splits cleanly into three tiers: (1) overlay widgets ($49–$200/mo, legally indefensible), (2) enterprise audit + remediation firms ($50K–$200K+, inaccessible to SMBs), and (3) SaaS monitoring platforms ($12K–$70K/yr, monitoring only, no fixing). The gap is enormous: there is no credible, affordable, full-service "audit + fix + certify" product priced for a 20-person law firm or a 5-physician medical practice. That gap is Juris's entry point.

The total addressable market is growing at 8.6% CAGR from $1.4B in 2025 to $3.2B by 2034. Professional services (legal, healthcare, financial) are disproportionately targeted in ADA lawsuits yet represent the least-served segment of the compliance market. A firm combining transparent flat-fee pricing, real code-level remediation, and a compliance certificate that survives legal scrutiny — priced at $3,000–$8,000 per engagement — would face essentially zero direct competition in that segment today.

---

## Landscape Map

```
                    PRICE (per engagement or annual)
                    LOW ←————————————————→ HIGH

HIGH    |   [Juris Gap Zone]          [Deque / Level Access / TPGi]
SERVICE |   $3K-$8K flat fee          $50K-$200K+ custom
DEPTH   |   Full audit + rebuild      Enterprise SaaS + expert audits
        |   SMB law/health/finance     Fortune 500, Government
        |
        |   [Pope Tech / Silktide]    [Siteimprove / AudioEye managed]
MED     |   $25-$400/mo               $12K-$70K/yr
SERVICE |   Monitoring only           Monitoring + some expert review
DEPTH   |   DIY fix required          Still no rebuild service
        |
LOW     |   [accessiBe / UserWay / EqualWeb]
SERVICE |   $490-$3,990/yr
DEPTH   |   Widget overlay only
        |   Legally indefensible
        +————————————————————————————————————————————————
                    TARGET MARKET SIZE
```

---

## Competitor Breakdown

### CATEGORY 1: OVERLAY / WIDGET VENDORS

---

#### accessiBe
- **Founded:** 2018 | **HQ:** New York / Israel | **Status:** Private
- **Pricing:** $490/yr (Starter, 5K visits) → $1,490/yr (Growth, 30K visits) → $3,990/yr (Scale, 100K visits) | Enterprise: custom
- **Pricing URL:** https://accessibe.com/pricing/accesswidget
- **Positioning:** "AI-powered web accessibility for businesses of all sizes"
- **Target Customer:** Non-technical SMB owners wanting a fast signal of accessibility effort
- **Strengths:** Simplest install (1 line of JS), large SMB brand recognition, wide install base
- **Weaknesses:** Cannot fix structural HTML; interferes with screen readers; FTC found core claims "false, misleading, or unsubstantiated"
- **Notable Recent Moves:**
  - January 2025: FTC charges filed, $1M settlement announced
  - April 2025: FTC final order approved — accessiBe barred from claiming AI makes sites "WCAG compliant"
  - 22.6% of 2025 H1 ADA lawsuits targeted overlay-equipped sites
  - Courts consistently reject overlays as good-faith compliance
- **Tier Assessment:** Low-end. Market credibility in freefall. Many SMBs actively looking to switch.
- **Sources:** [FTC Press Release](https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-approves-final-order-requiring-accessibe-pay-1-million) | [RatedWithAI Review 2026](https://ratedwithai.com/blog/accessibe-review-2026)

---

#### UserWay
- **Founded:** 2015 | **HQ:** Wilmington, DE / Israel | **Acquired by Level Access:** March 2024 ($98.7M)
- **Revenue:** ~$13–42M (estimates vary) | **Employees:** ~118
- **Pricing:** $49/mo (Small, 100K page views) | $149/mo (Medium, 1M page views) | Enterprise: custom
- **Positioning:** "AI-powered accessibility for every website"
- **Target Customer:** SMB websites; now being migrated toward Level Access enterprise offerings
- **Strengths:** Massive install base (millions of sites), now has Level Access expert backing, AI-powered interface adjustments
- **Weaknesses:** Same structural overlay limitations, post-acquisition strategy unclear for existing SMB customers
- **Notable Recent Moves:** Full integration with Level Access platform underway; SMB users being pushed toward Level Access AMP
- **Tier Assessment:** Low-end widget transitioning toward mid-market. Most SMB customers will need to find a new solution.
- **Sources:** [Getlatka revenue data](https://getlatka.com/companies/userway.org) | [Crunchbase](https://www.crunchbase.com/organization/userway)

---

#### AudioEye
- **Founded:** 2005 | **HQ:** Tucson, AZ | **Status:** Public (NASDAQ: AEYE)
- **Revenue:** $40.3M (2025, +14.5% YoY) | **Customers:** 120,000+
- **Pricing:** Basic (automated) starts ~$199/mo per domain; Self-Managed and Maximum Protection: demo/quote required. 4 tiers total.
- **Pricing URL:** https://www.audioeye.com/plans-and-pricing/
- **Positioning:** "The most accessible accessibility platform" — hybrid automation + human auditors
- **Target Customer:** SMB to mid-market, 120K customers across industries
- **Strengths:** Public company with financial accountability; human auditor layer; "AudioEye Assurance" limited legal protection claim; highest revenue of any pure overlay player
- **Weaknesses:** Expensive relative to pure widget value; overlay component still can't fix source code; ADA lawsuits still filed against AudioEye-equipped sites; opaque pricing
- **Notable Recent Moves:** Acquired ADA Site Compliance 2025; growing revenue steadily despite industry headwinds
- **Tier Assessment:** Low-to-mid. Trying to move upmarket but structurally still overlay-dependent.
- **Sources:** [AudioEye Pricing](https://www.audioeye.com/plans-and-pricing/) | [Stock Analysis](https://stockanalysis.com/stocks/aeye/)

---

#### EqualWeb
- **Founded:** 2016 | **HQ:** Israel | **Status:** Private, small
- **Pricing:** Free tier → tailored enterprise plans (specific prices not disclosed)
- **Pricing URL:** https://www.equalweb.com/pricing
- **Positioning:** "The only digital accessibility solution with a $1M warranty"
- **Target Customer:** SMBs wanting hybrid AI + human model
- **Strengths:** Free entry tier, hybrid model claim, VPAT auto-generation
- **Weaknesses:** $1M warranty is marketing language with no documented payouts; limited brand recognition; same overlay limitations
- **Tier Assessment:** Low-end. Limited differentiation.

---

#### Equally AI
- **Founded:** 2019 | **Status:** Private startup
- **Pricing:** Not publicly disclosed | **Pricing URL:** https://www.equally.ai/pricing
- **Positioning:** "No overblown claims, tricks or gimmicks"
- **Target Customer:** SMB websites wanting ADA/EAA/WCAG signal
- **Strengths:** Honest positioning vs. accessiBe's discredited claims; ADA + EAA + WCAG focus (EU market angle)
- **Weaknesses:** Tiny footprint, limited reviews, unproven remediation depth
- **Tier Assessment:** Low-end, early stage. Unlikely to be a material competitor.

---

### CATEGORY 2: AUDIT + REMEDIATION FIRMS

---

#### Deque Systems
- **Founded:** 1999 | **HQ:** Herndon, VA | **Status:** Private | **Revenue:** ~$52M | **Employees:** ~314
- **Pricing:** axe DevTools Pro from ~$40/mo; Full audit services custom-quoted ($5K–$50K+ typical); Enterprise managed services well above that
- **Pricing URL:** https://www.deque.com/axe/devtools/pricing/
- **Positioning:** "We help build a world where technology is universally accessible"
- **Target Customer:** Enterprise, government, large organizations; developers via axe tooling
- **Strengths:** Industry gold standard — axe-core powers 90%+ of all accessibility testing tools; 8,000+ audits completed; named Forrester Wave Leader Q4 2025; IAAP-certified experts
- **Weaknesses:** SMB pricing does not exist — minimum meaningful engagement is enterprise-scale; primarily a platform + tool company, not "done for you" service
- **Notable Recent Moves:** Forrester Wave Leader designation Q4 2025; ongoing axe-core updates powering the whole industry
- **Tier Assessment:** High-end. Benchmark provider. Sets the standards everyone else follows. Not a SMB competitor.
- **Sources:** [Deque Services](https://www.deque.com/accessibility-services/audits-compliance-testing/) | [Konaequity revenue](https://www.konaequity.com/company/deque-systems-inc-4019726008/)

---

#### Level Access
- **Founded:** 1999 | **HQ:** Arlington, VA | **Status:** Private (KKR-backed) | **Revenue:** $100M+ ARR | **Employees:** 500+
- **Pricing:** AMP platform from ~$30K+/year; full managed services six figures+; custom quotes only
- **Pricing URL:** https://www.levelaccess.com/ (contact required)
- **Positioning:** "End-to-end digital accessibility"
- **Target Customer:** Fortune 500, government, large regulated industries
- **Strengths:** Only company at $100M+ ARR in pure-play accessibility; acquired UserWay ($98.7M) and eSSENTIAL Accessibility; 25+ years experience; KKR backing signals aggressive growth
- **Weaknesses:** Completely inaccessible pricing for SMBs; complexity overkill for small firms; no transparent pricing
- **Notable Recent Moves:** $100M ARR milestone Dec 2024; KKR investment for scaling; UserWay integration to add SMB reach (but SMB is not core focus)
- **Tier Assessment:** Enterprise dominant. The 800-lb gorilla of the industry. No SMB play.
- **Sources:** [Level Access $100M ARR](https://www.levelaccess.com/news/level-access-first-digital-accessibility-only-company-to-surpass-100-million-annual-recurring-revenue/) | [Crunchbase](https://www.crunchbase.com/organization/level-access)

---

#### TPGi (The Paciello Group)
- **Founded:** 2006 | **HQ:** UK (Vispero group) | **Status:** Private | **Employees:** ~200
- **Pricing:** ARC Platform + professional services: custom enterprise quotes; TaaS (managed) service: custom
- **Pricing URL:** https://www.tpgi.com/arc-platform/
- **Positioning:** "Digital accessibility excellence, powered by the world's leading assistive technology company"
- **Target Customer:** Enterprise, government, regulated industries
- **Strengths:** 21 staff contributing to W3C standards; JAWS Inspect (proprietary screen reader simulator); Vispero owns JAWS screen reader giving unique testing depth; launched TaaS managed service model
- **Weaknesses:** No SMB offering; premium enterprise pricing; less brand recognition than Deque/Level Access in the US
- **Tier Assessment:** High-end enterprise. Unique JAWS advantage for screen reader testing. Not a SMB competitor.
- **Sources:** [TPGi Review](https://whoisaccessible.com/reviews/tpgi/)

---

#### Allyant
- **Founded:** 2019 | **Status:** Private, <$100M revenue | **Size:** Small team
- **Pricing:** Custom quotes only (2-3 business day turnaround promised); covers audit, document remediation, website remediation, ongoing maintenance
- **Pricing URL:** https://allyant.com/ (contact required)
- **Positioning:** "Authentic accessibility"
- **Target Customer:** Mid-market organizations needing full-service audit + remediation
- **Strengths:** Full-service offering (audit + remediation + document + ongoing); honest about automation limits
- **Weaknesses:** No pricing transparency (cited by TechRadar as key weakness); smaller capacity than Deque/Level Access; limited online presence
- **Tier Assessment:** Mid-market. Closest to Juris's intended model, but lacking price transparency and SMB focus.
- **Sources:** [TechRadar Review](https://www.techradar.com/pro/software-services/allyant-review) | [Allyant Cost Blog](https://allyant.com/blog/how-much-digital-web-accessibility-a-comprehensive-cost/)

---

#### WebAIM
- **Founded:** 1999 | **Affiliation:** Utah State University | **Status:** Non-profit
- **Pricing:** WAVE tool free; WAVE API from $10/mo; limited commercial audit services (academic rates)
- **Pricing URL:** https://wave.webaim.org/
- **Positioning:** "Web Accessibility In Mind" — education, tools, research
- **Target Customer:** Developers, academics, DIY evaluators, nonprofits
- **Strengths:** Free WAVE tool is trusted industry standard; publishes authoritative WebAIM Million annual report; no commercial bias
- **Weaknesses:** Not a commercial service provider; cannot serve SMBs needing hands-on remediation
- **Tier Assessment:** Non-commercial reference. Not a competitive threat to Juris.

---

### CATEGORY 3: SAAS + MONITORING PLATFORMS

---

#### Siteimprove
- **Founded:** 2003 | **HQ:** Copenhagen, Denmark | **Status:** Private | **Employees:** ~700
- **Pricing:** Custom quotes. Average ~$28K/year. 1K-5K pages: $12K–$30K/yr; 10K-25K pages: $35K–$70K/yr. Multi-year: 10–25% discounts.
- **Pricing URL:** https://www.siteimprove.com/pricing/
- **Positioning:** "Digital Presence Optimization" — the all-in-one platform
- **Target Customer:** Mid-to-large enterprises, government, higher education
- **Strengths:** Most comprehensive all-in-one DPO platform; strong government/edu market; continuous monitoring; bundles accessibility + SEO + quality + analytics
- **Weaknesses:** Minimum ~$12K/yr makes it impossible for SMBs; monitoring only — no remediation service; overkill for small professional services
- **Tier Assessment:** Enterprise platform. 0% overlap with Juris's SMB target.
- **Sources:** [Vendr Pricing Guide](https://www.vendr.com/marketplace/siteimprove)

---

#### Pope Tech
- **Founded:** 2018 | **HQ:** Utah | **Status:** Private, small
- **Pricing:** Free (0, 1-25 pages, 2 users) | Team: $25/mo annual (50-500 pages, unlimited users) | Business Plus: $225/mo annual (500+ pages, JIRA integration) | Professional: $400/mo annual (training included)
- **Pricing URL:** https://www.pope.tech/websites/pricing
- **Positioning:** "Web accessibility that works for your team"
- **Target Customer:** SMBs and education — the most SMB-friendly real scanning platform
- **Strengths:** Most affordable legitimate scanning tool; free tier available; WAVE engine powered; good for education and small organizations
- **Weaknesses:** Scanning only — no remediation service whatsoever; requires internal technical team to fix findings; minimal support vs. enterprise tools
- **Tier Assessment:** SMB-friendly monitoring tool. Complementary to Juris, not competitive. Juris could actually use Pope Tech for monitoring and bundle it.

---

#### DubBot
- **Founded:** 2015 | **Status:** Private, small
- **Pricing:** Custom-only, no public pricing
- **Target Customer:** Higher education exclusively
- **Weaknesses:** Not relevant to professional services SMBs
- **Tier Assessment:** Education niche. Not a Juris competitor.

---

#### Silktide
- **Founded:** 2003 | **HQ:** UK | **Status:** Private
- **Pricing:** Custom quotes only (enterprise range, no public tiers)
- **Positioning:** Unified accessibility + content quality + marketing platform
- **Target Customer:** Mid-to-large UK/EU organizations, government
- **Strengths:** Strong alternative to Siteimprove per reviews; bundles accessibility with content and marketing metrics
- **Weaknesses:** No SMB pricing; no remediation; UK-centric
- **Tier Assessment:** Mid-market European platform. Not a Juris competitor.

---

### CATEGORY 4: DIY TOOLS

---

#### axe DevTools Pro (Deque)
- **Pricing:** ~$40/mo per developer | Enterprise: custom
- **Pricing URL:** https://www.deque.com/axe/devtools/pricing/
- **Target Customer:** Developers and QA engineers
- **Assessment:** Testing tool only. Powers the industry. Not a service competitor.

#### WAVE (WebAIM)
- **Pricing:** Free browser extension | API from $10/mo
- **Assessment:** Reference tool, not a service competitor.

#### PAC 2024
- **Pricing:** Free
- **Assessment:** PDF-only checker. Niche tool, not relevant.

---

## Pricing Comparison Table

| Competitor | Category | Starting Price | SMB Viable? | Audit | Remediation | Monitoring | Cert |
|---|---|---|---|---|---|---|---|
| accessiBe | Overlay | $490/yr | Yes (but avoid) | No | No | Widget only | No |
| UserWay | Overlay | $49/mo | Yes (but avoid) | No | No | Widget only | No |
| AudioEye | Overlay+ | $199/mo | Yes (but risky) | Limited | Limited | Automated | No |
| EqualWeb | Overlay | Free | Yes (but avoid) | No | No | Widget only | No |
| Equally AI | Overlay | Unknown | Maybe | No | Unknown | Limited | No |
| Deque Systems | Audit/Platform | $5K+ custom | No | Yes | Limited | Via axe | No |
| Level Access | Enterprise | $30K+/yr | No | Yes | Yes | Yes | Yes |
| TPGi | Enterprise | Custom | No | Yes | Yes | Yes | Yes |
| Allyant | Mid-market | Custom | Maybe | Yes | Yes | Yes | Yes |
| WebAIM | Non-profit | Free | DIY only | Limited | No | Via WAVE | No |
| Siteimprove | SaaS Platform | $12K+/yr | No | Automated | No | Yes | No |
| Pope Tech | SaaS Tool | $25/mo | Yes | Automated | No | Yes | No |
| DubBot | SaaS Tool | Custom | No (edu only) | Automated | No | Yes | No |
| Silktide | SaaS Platform | Custom | No | Automated | No | Yes | No |
| **Juris (target)** | **Full-service SMB** | **$3K-$8K flat** | **Yes** | **Yes** | **Yes** | **Yes** | **Yes** |

---

## Feature Comparison Matrix

| Feature | accessiBe | AudioEye | Deque | Level Access | Pope Tech | **Juris Target** |
|---|---|---|---|---|---|---|
| Manual WCAG audit | No | Partial | Yes | Yes | No | Yes |
| Code-level remediation | No | Partial | Yes | Yes | No | Yes |
| Full site rebuild | No | No | No | No | No | Yes |
| Continuous monitoring | Widget only | Automated | Via axe | Yes | Yes | Yes |
| Compliance certificate | No | Marketing only | Yes | Yes | No | Yes |
| SMB-friendly pricing | Yes | No | No | No | Yes | Yes |
| Flat-fee transparency | Yes | No | No | No | Yes | Yes |
| Law firm targeting | No | No | No | No | No | Yes |
| Healthcare targeting | No | No | No | Partial | No | Yes |
| Legal defensibility | No | Weak | Yes | Yes | N/A | Yes |

---

## Critical Research Questions — Answered

### 1. Typical price for a one-time accessibility audit?

**Low end:** $500–$2,000 (automated scan only, covers 30–40% of issues)
**Mid-range:** $3,000–$15,000 (manual audit, 10-25 pages, screen reader testing included)
**High end:** $20,000–$50,000+ (enterprise, full template evaluation, VPAT, multiple AT)
**Per-page benchmark:** $100–$350 per primary page (manually tested)
*Source: [DigitalA11Y](https://www.digitala11y.com/how-much-does-a-web-accessibility-audit-cost/) | [TestParty](https://testparty.ai/blog/accessibility-audit-cost)*

### 2. Typical monthly retainer for accessibility monitoring?

**Overlay widgets:** $49–$500/month (avoid)
**Legitimate SMB scanning tools (Pope Tech):** $25–$400/month
**Mid-market enterprise platforms (Siteimprove):** $1,000–$6,000+/month
**Ongoing maintenance retainer (manual):** $200–$1,000/month
*Source: [TestParty cost calculator](https://testparty.ai/blog/accessibility-compliance-cost-calculator)*

### 3. Typical price for a full website rebuild with accessibility compliance?

**SMB sites (10-50 pages):** $15,000–$35,000 total (audit + remediation or rebuild)
**Mid-market:** $35,000–$100,000+
**No competitor packages this cleanly as one flat-fee product for SMBs.** This is the exact market gap.
*Source: [A11Y Collective](https://www.a11y-collective.com/blog/cost-of-ada-compliance/) | [WCAGsafe](https://wcagsafe.com/blog/ada-compliance-cost-2026)*

### 4. Are any competitors specifically targeting SMB law firms / healthcare / financial advisors?

**No.** This is confirmed by research. The closest competitors:
- Overlay vendors target generic SMBs (non-legally defensible)
- Enterprise firms (Deque, Level Access, TPGi) require $30K+ minimums
- Monitoring tools (Pope Tech) don't do remediation
- Healthcare has the May 2026 HHS Section 504 deadline — a massive forcing function with no SMB-priced solution in the market

### 5. What gap exists that Juris could exploit?

**The Gap:** A flat-fee, full-service "audit + code-level remediation/rebuild + compliance certificate" product priced $3,000–$8,000, specifically designed for small professional services firms (law, healthcare, financial), with:
- Plain-English reporting (lawyers and doctors don't speak WCAG)
- Legal defensibility documentation (VPAT, audit trail)
- A named compliance certificate they can display
- Ongoing monitoring for $99–$299/month after the initial project

**No one in the market occupies this position.** The overlay vendors are legally discredited. The enterprise firms start at $30K. The monitoring tools require internal technical staff. Juris can own this space.

### 6. Has the FTC fine hurt the overlay category?

**Yes — significantly.** Evidence:
- Courts now routinely reject overlay presence as evidence of good-faith compliance
- 22.6% of 2025 H1 lawsuits (983 for the full year) targeted overlay-equipped sites — proving overlays don't protect
- The accessiBe fine is the first FTC enforcement action against an accessibility vendor ever — a landmark signal
- Multiple legal and accessibility experts now publicly advise removing overlays
- The 2026 prediction is accelerated widget abandonment, driving SMBs toward real remediation
- AudioEye (the most credible overlay vendor) is growing revenue by pivoting away from the pure overlay model
- The post-FTC SMB search for "real" solutions is the exact demand Juris should capture

*Sources: [FTC Final Order](https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-approves-final-order-requiring-accessibe-pay-1-million) | [EcomBack 2025 Annual Report](https://www.ecomback.com/annual-2025-ada-website-accessibility-lawsuit-report) | [Accessible.org 2026 Predictions](https://accessible.org/2026-ada-website-compliance-lawsuits-ai/)*

---

## Positioning Gaps Juris Could Claim

**1. "The only accessibility firm built for professional services"**
No competitor targets law firms, healthcare practices, or financial advisors by name. These are high-litigation-risk, revenue-positive clients who respond to industry-specific positioning.

**2. "Flat-fee. No surprises. Legally defensible."**
Every legitimate audit firm uses custom quotes. Every overlay vendor hides behind monthly subscriptions that don't deliver real compliance. A transparent, flat-fee model ($3,500 audit, $5,000 remediation, $199/mo monitoring) would be radically differentiated.

**3. "Post-FTC compliance you can actually use in court"**
Lean directly into the FTC fine. Position Juris as the antidote to the overlay scam. "accessiBe got fined $1M for claiming their tool made sites compliant. Ours does." This messaging resonates with every SMB owner who bought an overlay and just got a demand letter.

**4. "Done for you — not a tool you have to learn"**
Pope Tech (the most affordable real platform) costs $25/mo but requires your team to find and fix all the issues. Juris's entire value prop is that the client doesn't need to know what WCAG means. This is critical for law firms and medical practices.

**5. "Compliance certificate + audit report = litigation defense package"**
Combine the VPAT, audit report, and a Juris certificate of compliance into a document bundle that a law firm can hand to opposing counsel. No one packages it this way.

---

## Strategic Recommendations for Juris Pricing + Positioning

### Pricing Architecture

**Tier 1 — Audit Only:** $1,500–$3,500 (up to 25 pages, manual + automated, written report + priority list)
**Tier 2 — Audit + Remediation:** $4,500–$8,000 (up to 25 pages, full code-level fixes, compliance certificate, VPAT)
**Tier 3 — Full Rebuild:** $12,000–$25,000 (new accessible website, purpose-built for compliance, full documentation package)
**Ongoing Monitoring Retainer:** $149–$299/month (automated scanning, quarterly review, certificate maintenance)

*Rationale: These prices sit at the intersection of "affordable for a small law firm" and "profitable enough to deliver real work." The market benchmark for per-page manual audit alone is $100–$350; a 15-page law firm site at $150/page = $2,250 in audit costs alone, leaving margin for remediation at $4,500–$6,000 total.*

### Target Segment Priority

1. **Healthcare practices** (May 2026 HHS Section 504 deadline = burning urgency RIGHT NOW)
2. **Law firms** (highest lawsuit targeting rate of regulated professional services; irony of a law firm being sued is powerful)
3. **Financial advisors/RIAs** (SEC scrutiny + high website complexity + high ADA lawsuit targeting)

### Positioning Statement for Juris

*"Juris makes your website legally accessible — audited by experts, fixed by engineers, certified for court. Flat-fee pricing for law firms, medical practices, and financial advisors. No widgets. No surprises. No lawsuits."*

### Go-to-Market Angle

The FTC fine against accessiBe is a gift. Every law firm that installed an accessiBe widget in 2022–2024 and got a demand letter in 2025–2026 is an inbound lead. Run Google ads on "accessiBe lawsuit" and "website accessibility demand letter." Reach out to bar association newsletters (lawyers talk to lawyers; one win in a bar association creates referrals). For healthcare, HHS compliance deadline articles are driving search traffic today.

---

## Sources

- [FTC Press Release: accessiBe $1M Fine (January 2025)](https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-order-requires-online-marketer-pay-1-million-deceptive-claims-its-ai-product-could-make-websites)
- [FTC Final Order: accessiBe (April 2025)](https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-approves-final-order-requiring-accessibe-pay-1-million)
- [EcomBack 2025 Annual ADA Lawsuit Report](https://www.ecomback.com/annual-2025-ada-website-accessibility-lawsuit-report)
- [Accessible.org 2026 Lawsuit Predictions](https://accessible.org/2026-ada-website-compliance-lawsuits-ai/)
- [DigitalA11Y Audit Cost Guide 2026](https://www.digitala11y.com/how-much-does-a-web-accessibility-audit-cost/)
- [TestParty Audit Cost Calculator](https://testparty.ai/blog/accessibility-compliance-cost-calculator)
- [Accessible.org Pricing](https://accessible.org/pricing/)
- [Pope Tech Pricing](https://www.pope.tech/websites/pricing)
- [RatedWithAI accessiBe Review 2026](https://ratedwithai.com/blog/accessibe-review-2026)
- [Level Access $100M ARR Announcement](https://www.levelaccess.com/news/level-access-first-digital-accessibility-only-company-to-surpass-100-million-annual-recurring-revenue/)
- [Vendr Siteimprove Pricing](https://www.vendr.com/marketplace/siteimprove)
- [AudioEye Pricing](https://www.audioeye.com/plans-and-pricing/)
- [G2 AudioEye Pricing](https://www.g2.com/products/audioeye/pricing)
- [ABA: Digital Accessibility Under Title III (2025)](https://www.americanbar.org/groups/business_law/resources/business-law-today/2025-august/digital-accessibility-under-title-iii-ada/)
- [Healthcare Section 504 May 2026 Deadline](https://careneticdigital.com/insights/healthcare-website-accessibility-the-may-2026-deadline/)
- [Business Research Insights: Digital Accessibility Market Size](https://www.businessresearchinsights.com/market-reports/digital-accessibility-service-market-118130)
- [Konaequity: Deque Systems Revenue](https://www.konaequity.com/company/deque-systems-inc-4019726008/)
- [AudioEye Stock Analysis](https://stockanalysis.com/stocks/aeye/)
- [UserWay Crunchbase](https://www.crunchbase.com/organization/userway)
- [Level Access Crunchbase](https://www.crunchbase.com/organization/level-access)
