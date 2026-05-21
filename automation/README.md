# Website Compliance v1 — ADA/WCAG Cold Outreach Pipeline

**Status:** Trial — pre-production. Scheduled task `website-compliance-orchestrator-v1-trial` runs daily at 8 AM Pacific.

## What this pipeline does

Every morning, autonomously:
1. **Discover** SMB websites in target verticals + cities (Google Places API)
2. **Scan** each site with axe-core for WCAG 2.1 AA violations
3. **Filter** to non-compliant sites with HIGH/MODERATE lawsuit risk
4. **Enrich** qualified prospects with decision-maker emails (Apify)
5. **Generate** a branded 1-page A4 PDF audit report per prospect
6. **Draft** personalized cold outreach emails in Gmail with PDF attached
7. **Report** to Slack/iMessage: "N drafts ready for review"

You wake up to a stack of pre-vetted drafts. You review and send.

## Why this works as a business

- 95%+ of SMB websites have detectable WCAG violations (verified via 10 live scans)
- $30K-$175K typical cost to defend an ADA Title III lawsuit
- 5,000+ ADA web lawsuits filed in 2025; 67% of defendants under $25M revenue
- Healthcare has a hard May 2027 federal compliance deadline (Section 504)
- Cold email + branded audit PDF + landing page = high-conversion lead funnel

## Folder structure

```
Website Compliance v1/
├── instructions/                  ← Agent instruction files (read at runtime)
│   ├── prospector.md              ← Stage 1: Google Places discovery
│   ├── scanner.md                 ← Stage 2: axe-core scan + score + filter
│   ├── lead-enricher.md           ← Stage 3: Apify decision-maker lookup
│   ├── report-generator.md        ← Stage 4: HTML → PDF audit report
│   ├── email-drafter.md           ← Stage 5: Personalized email + Gmail draft
│   ├── humanizer-rules.md         ← Shared email style rules
│   └── logging-format.md          ← Structured logging format
│
├── lib/                           ← Node.js utilities (executed by sub-agents)
│   ├── places.js                  ← Google Places API discovery
│   ├── axe-scan.js                ← Deep axe-core + Playwright scan
│   ├── scan.js                    ← Lighthouse PageSpeed quick scan (backup)
│   └── report-builder.js          ← HTML template → PDF via Playwright
│
├── orchestrator/                  ← Top-level workflow control
│   ├── orchestrator-v1.md         ← Production: 8 AM daily
│   └── orchestrator-v1-trial.md   ← Trial sandbox (writes to trial-data only)
│
├── companies/auras/profile.md     ← Your business identity, signature, targets
│
├── targets/                       ← Vertical+location configs (YAML)
│   ├── law-firms-la.yaml
│   ├── medical-practices-miami.yaml
│   └── financial-advisors-ny.yaml
│
├── prospects/                     ← Per-run JSON files of discovered businesses
│
├── output/
│   ├── audits/                    ← Generated PDF audit reports
│   ├── pipeline-issues.jsonl      ← Persistent issues log
│   └── run-log.md                 ← Run-by-run summary (production)
│
├── trial-data/                    ← Sandbox snapshots — orchestrator writes only here in trial
└── trial-output/                  ← Trial logs separate from production
```

## How to run a trial

1. **Manually invoke** the trial orchestrator:
   - Path: `~/.claude/scheduled-tasks/website-compliance-orchestrator-v1-trial/SKILL.md`
   - Trigger via `/schedule` UI or by referencing the skill in a new chat

2. **Review the outputs**:
   - Drafts → your Gmail `Drafts` folder, labeled `compliance-outreach-pending-review`
   - Audit PDFs → `trial-output/audits/`
   - Run summary → `trial-output/trial-run-log.md`
   - Issues → `trial-output/trial-pipeline-issues.jsonl`

3. **Iterate**: edit the relevant `.md` file → re-run. Production stays untouched.

## Daily flow (production)

```
8:00 AM  Orchestrator starts
8:01     Prospector: query Google Places for each enabled target.yaml
         → 20-40 new businesses per vertical/city
8:05     Scanner (parallel, 5 workers): axe-core deep scan each
         → ~7 sec per site × 30 sites / 5 workers = ~45 sec
         → filter: only sites with computed-score < 90 proceed
         → ~70-80% qualify (matches WebAIM Million data)
8:08     Lead Enricher (parallel): Apify lookup per prospect
         → finds decision maker (office manager, firm admin, etc.)
         → ~50% find rate; skip prospects without contact
8:12     Report Generator (parallel): render branded HTML, save as PDF
8:15     Email Drafter: personalized cold email per prospect
         → Gmail API creates DRAFT (does NOT send)
         → PDF attached, label applied
8:17     Daily summary → iMessage: "N drafts ready for review"
```

## Pipeline philosophy

- **Drafts, never sends.** You always review before send.
- **Filter aggressively.** Don't draft for sites scoring 90+. Wastes your time and theirs.
- **One vertical at a time per run.** Avoids appearing scattershot.
- **Trial-first.** All changes go through `orchestrator-v1-trial.md` first.
- **No live API spend in trial.** Trial mode uses cached scans and synthetic prospects when possible.

## Add a new target vertical/city

1. Create `targets/[vertical]-[city].yaml` with the schema below
2. Enable in `companies/auras/profile.md` under `targets:` list
3. Trial-run the orchestrator to validate

```yaml
# targets/law-firms-la.yaml
id: law-firms-la
display_name: "LA Law Firms"
google_places_query: "law firm attorney"
location: "Los Angeles, CA"
radius_meters: 50000
max_per_run: 20
risk_message: "California Unruh Act exposes you to $4,000 per violation, no injury required"
state_law_context: "California has the highest legal exposure of any US state for web accessibility lawsuits"
sample_recent_case: "5,000+ ADA web lawsuits filed in 2025; CA Unruh Act suits filed separately"
decision_maker_titles:
  - "managing partner"
  - "firm administrator"
  - "operations manager"
  - "office manager"
```

## Production promotion checklist

Once trial runs are stable for 2+ weeks:
- [ ] Validate 50+ trial drafts manually
- [ ] Confirm Apify lead match rate ≥ 40%
- [ ] Confirm filter rate matches expectation (~70% qualify)
- [ ] Set up production Gmail account with warmed domain
- [ ] Create production orchestrator skill via `/schedule`
- [ ] Disable trial schedule
