# ADA Web Accessibility Research — Research Folder

**Last research date:** May 21, 2026
**Total cases documented:** 17
**Cases verified at Tier 1:** 11
**Statistics files:** 6
**Tier 1 sources:** 25

---

## Folder Structure

```
research/
├── README.md                    ← This file
├── SUMMARY.md                   ← Research summary and key findings
├── sources.json                 ← Master index of all sources
├── lawsuits/                    ← One JSON file per documented case
│   ├── robles-v-dominos.json
│   ├── nfb-v-target.json
│   ├── gil-v-winn-dixie.json
│   ├── nad-v-netflix.json
│   ├── nad-v-harvard.json
│   ├── nad-v-mit.json
│   ├── conner-v-parkwood-beyonce.json
│   ├── marett-v-five-guys.json
│   ├── gorecki-v-hobby-lobby.json
│   ├── access-now-v-blue-apron.json
│   ├── alcazar-v-fashion-nova.json
│   ├── burbon-v-fox-news.json
│   ├── farmer-v-sweetgreen-2016.json
│   ├── colak-v-sweetgreen-2024.json
│   ├── doj-v-springfield-clinic.json
│   ├── walsh-v-dania.json
│   ├── tribeca-v-accessibe.json
│   ├── doj-peapod-settlement.json
│   ├── doj-tx-counties-election-websites.json
│   ├── rodriguez-v-barnes-noble.json   ← USE_IN_REPORT=false (unconfirmed docket)
│   └── kitchenaid-whirlpool-2023.json  ← USE_IN_REPORT=false (unconfirmed docket)
└── statistics/
    ├── 2025-filing-volume.json
    ├── industry-distribution.json
    ├── defendant-revenue-bands.json
    ├── settlement-cost-data.json
    ├── state-distribution.json
    └── growth-trend.json
```

---

## Tier System

### Tier 1 — REQUIRED for headline claims
- Federal court records (case names + court + docket)
- Seyfarth Shaw's adatitleiii.com annual reports
- UsableNet annual + midyear digital accessibility lawsuit reports
- DOJ press releases and settlement announcements
- Official court opinions (9th Cir., 11th Cir., etc.)
- Government data (DOJ, HHS)

### Tier 2 — Acceptable as supplementary
- Reuters Legal, Law360, Bloomberg Law
- Major news outlets (NYT, WSJ) covering specific cases
- Legal advocacy organizations (Disability Rights Advocates, DREDF)
- AccessiBe lawsuit tracker (use only for case names — verify originating source)

### Tier 3 — NEVER cite directly
- Marketing blogs from accessibility vendors
- Generic "ADA statistics" pages without attribution
- SEO content farms

---

## How to Add New Cases

1. Create a new JSON file in `lawsuits/` using the slug format: `plaintiff-v-defendant.json`
2. Use the schema documented in the SUMMARY.md
3. Required fields: `case_name`, `court`, `docket`, `year_filed`, `outcome`, `tier`, `sources`
4. If docket number is unconfirmed, set `docket` to `"Not confirmed — verify via PACER"` and set `"use_in_report": false`
5. For settlement amounts: only use disclosed/public figures. Mark as `null` if confidential
6. Add the source to `sources.json` with a new `src-XXX` ID
7. Update the case count in this README and in SUMMARY.md

---

## Key Rules

- **Never invent case names, docket numbers, or settlement amounts**
- **Settlement amounts are almost always confidential** — note this explicitly; only two public figures found (Target $6M, Fashion Nova $5.15M)
- **If a source is paywalled** (Law360, Bloomberg Law), note it and use a public secondary source
- **"verified": false** means the data point could not be confirmed from a primary source — do not use in sales report without verification
- Cases with `"use_in_report": false` need additional verification before inclusion

---

## Primary Source URLs for Reference

| Source | URL |
|--------|-----|
| Seyfarth Shaw ADA Title III Blog | https://www.adatitleiii.com/ |
| UsableNet Lawsuit Reports | https://blog.usablenet.com/ |
| UsableNet Lawsuit Tracker | https://info.usablenet.com/ada-website-compliance-lawsuit-tracker |
| DOJ ADA Cases | https://www.ada.gov/cases/ |
| DOJ Civil Rights Division Cases | https://www.justice.gov/crt/disability-rights-section |
| Civil Rights Litigation Clearinghouse | https://clearinghouse.net/ |
| CourtListener (free PACER alternative) | https://www.courtlistener.com/ |
| Lainey Feingold Law (disability law practitioner) | https://www.lflegal.com/ |
