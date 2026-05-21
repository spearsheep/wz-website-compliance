# Website Compliance

End-to-end web accessibility compliance product: automated audit, instant quote, marketing site, lead-gen automation, and a research database backing every claim.

Built for small-to-mid-size law firms, medical practices, financial advisors, and professional services firms targeted by ADA web accessibility lawsuits.

---

## Repository Layout

```
.
├── site/                   Next.js 16 marketing site + free scanner widget
│                           Live scanner: Lighthouse + axe + complexity → instant quote
│
├── scanner-cli/            Standalone Node CLI scanner
│                           Run a deep accessibility scan from the terminal
│
├── automation/             Multi-agent daily routine (modeled on Email Marketing v3 pattern)
│   ├── instructions/       Agent prompts (prospector, scanner, enricher, email-drafter)
│   ├── orchestrator/       Daily 8 AM trial + production orchestrators
│   ├── lib/                Combined scanner + PDF generator + complexity detector
│   ├── src/                Scanner CLI scripts
│   ├── templates/          Branded HTML audit report templates
│   ├── targets/            Per-industry / per-city prospect targeting configs
│   ├── companies/          Sender profile (Juris) — single source of truth
│   ├── assets/             Logo + brand assets
│   ├── schema.md           Shared data contract between scanner ↔ PDF generator
│   └── package.json
│
├── research/               Tier-1 sourced research database
│   ├── lawsuits/           21 documented B2C ADA cases with citations
│   ├── b2b-lawsuits/       14 documented B2B cases (healthcare, finance, law, prof services)
│   ├── statistics/         7 verified industry stats with primary sources
│   ├── competitors/        Competitive intelligence: pricing matrix, brief, summary
│   ├── *.md                Methodology docs, framework references, compliance checklist
│   └── sources.json        Master index of 25+ Tier-1 sources
│
├── docs/                   Top-level reference documents
│   ├── SERVICE-CHECKLIST.md   Master compliance scope (50 WCAG + state + healthcare + ...)
│   └── RESEARCH-NOTES.md      Original research notes
│
└── archive/                Historical artifacts (early HTML mockups, etc.)
```

---

## What's Built

### Marketing site (`site/`)

- Next.js 16 + React 19 + Tailwind 4 + shadcn
- **Live URL scanner with instant quote**: visitor enters URL + email + industry → 60-second scan → audit + fix + rebuild price ranges displayed inline
- Pages: home, services, pricing, industries (with [slug] routes), cases, compliance, blog, about, contact
- API: `/api/scan` runs Lighthouse via PageSpeed Insights + complexity detection + quote calculation
- Demo mode: works without PAGESPEED_API_KEY (synthetic but realistic data)

### CLI scanner (`scanner-cli/`)

- `node scanner-cli/scan.js <url>` — single-URL Lighthouse audit, 15 seconds
- `node scanner-cli/axe-scan.js <url>` — deep axe-core scan, 30 seconds, more violations detected
- `node scanner-cli/scan-batch.js <prospect-list.json>` — bulk scan a discovery list

### Automation (`automation/`)

Daily 8 AM routine that:
1. Discovers SMB prospect websites by industry + city (Google Places API)
2. Scans each prospect (Lighthouse + axe + a11y tree)
3. Filters for sites with HIGH/MODERATE risk
4. Enriches with decision-maker email (Apollo / Hunter / Apify)
5. Generates branded PDF audit report
6. Drafts personalized Gmail outreach with PDF attached
7. Holds drafts for manual review before send

Modeled on the existing `Scheduled Tasks/Email Marketing v3/` pattern.

### Research (`research/`)

- **35 named lawsuit cases** with full citations to Tier-1 sources (federal court records, DOJ, NFB, Seyfarth Shaw)
- **7 verified statistics** with primary-source URLs
- **15-competitor competitive matrix** with pricing
- **Service checklist** covering all 50 WCAG 2.1 AA criteria + state laws + Section 504 + Section 508 + CVAA + mobile + PDFs
- **Methodology follows the SEO Pipeline R1 protocol**: never invent stats, always cite the originator

---

## Setup

### Marketing site

```bash
cd site
cp .env.example .env  # add PAGESPEED_API_KEY (optional — demo mode works without it)
npm install
npm run dev
# Open http://localhost:3000
```

### Scanner CLI

```bash
cd scanner-cli
npm install
node scan.js https://example.com
```

### Automation

```bash
cd automation
npm install
# See automation/README.md for orchestrator setup
```

---

## The Pricing Model

We don't quote flat fees — complexity varies too much. Instead, the scanner produces an **instant quote in 60 seconds** based on:

- **Audit price** scales with site complexity (pages, forms, images, videos, PDFs, widgets) — because audit work = surface area to inspect
- **Fix price** scales with violations (critical / serious / moderate / minor) — because fix work = items to remediate
- **Industry multiplier**: healthcare 1.5×, law 1.3×, financial 1.2× (higher stakes = deeper compliance work)

Sample outputs:

| Site type | Audit | Fix |
|---|---|---|
| Small law firm (10p, 5 violations) | $1,100–$1,500 | $3,100–$4,500 |
| Medical practice (30p, 10 violations) | $3,600–$4,900 | $4,800–$6,900 |
| Restaurant chain (50p, 20 violations) | $3,500–$4,700 | $4,800–$6,800 |

When violations are catastrophic (>15), the engine recommends **Rebuild** over Fix because building accessible from scratch is often cleaner and cheaper than patching.

---

## Standards Covered

The scanner detects WCAG 2.1 AA violations directly. Service offering also covers:

- **WCAG 2.1 AA** — 50 criteria, the core legal benchmark (90% of ADA web lawsuits)
- **WCAG 2.2 AA** — 9 newer criteria (focus, target size, accessible auth)
- **Mobile** — iOS VoiceOver, Android TalkBack
- **PDFs** — PDF/UA standard
- **CVAA** — video captions, audio descriptions
- **Section 504** — federal funding recipients (healthcare, education)
- **Section 508** — federal contractors
- **State laws** — California Unruh Act ($4K/violation), NYC Human Rights Law

See `docs/SERVICE-CHECKLIST.md` for the full breakdown.

---

## Status

- Marketing site: ✅ Live scanner + quote engine working
- Scanner CLI: ✅ Tested on real sites
- Research database: ✅ 35 cases, 7 stats, 25+ Tier-1 sources cited
- Automation: 🚧 Templates and methodology ready; orchestrator scaffold pending
- Landing page comparison content: 🚧 Approaches component built, integration pending
- Discovery pipeline: 🚧 Pending (Google Places API integration)
- Email outreach: 🚧 Pending (Gmail API + Resend)
