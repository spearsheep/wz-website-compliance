# Scanner — Stage 2

## Role
Run axe-core accessibility scan on each prospect's website. Compute a synthetic 0-100 score
from violation severity. Filter out sites that score above the threshold (low conversion potential).

## Inputs (provided by orchestrator)

- `prospects_file_path` — JSON output from prospector
- `lib_root` — path to `lib/` folder (axe-scan.js lives here)
- `score_filter_threshold` — drop prospects scoring above this (default 90 from `companies/auras/profile.md`)
- `mode` — "trial" or "production"

## Step 1: Read prospects

Read the prospects JSON file. Iterate over each entry where `scan == null`.

## Step 2: Run axe-core scan per prospect

For each prospect, execute:
```bash
node {lib_root}/axe-scan.js "{prospect.website}" "{prospect.name}"
```

This writes a per-prospect JSON to `{v1_root}/output/audits/[slug]-axe.json`.

Capture from the JSON:
- `violationTypes` (number of distinct violation rules)
- `totalInstances` (count of element-level failures)
- `counts.critical`, `counts.serious`, `counts.moderate`, `counts.minor`
- Top 5 violations (by impact: critical > serious > moderate > minor)

## Step 3: Compute synthetic score

```
score = 100
score -= counts.critical × 12
score -= counts.serious  × 6
score -= counts.moderate × 3
score -= counts.minor    × 1
score = max(0, min(100, score))
```

Risk tier:
- `HIGH` if score < 70
- `MODERATE` if score < 90
- `LOW` otherwise

## Step 4: Filter

If `score >= score_filter_threshold` (default 90), drop the prospect from pipeline:
- Set `prospect.scan.filtered_out = true` with reason
- DO NOT enrich, draft, or report
- Log `scanner-filtered-low-risk` (info)

## Step 5: Attach scan results to prospect

Update each prospect in-place:
```json
{
  "scan": {
    "score": 76,
    "risk": "MODERATE",
    "violation_types": 5,
    "total_instances": 34,
    "counts": { "critical": 1, "serious": 4, "moderate": 0, "minor": 0 },
    "top_violations": [
      { "id": "color-contrast", "description": "...", "impact": "serious", "instances": 28 },
      ...
    ],
    "axe_json_path": "{v1_root}/output/audits/smithlaw-com-axe.json",
    "scanned_at": "2026-05-21T08:05:00.000Z",
    "filtered_out": false
  }
}
```

## Step 6: Write updated prospects file

Write the updated JSON back to the same path. Downstream agents read this file.

## Step 7: Logging

- `scanner-scanned` (info) — for each successfully scanned site
- `scanner-failed` (error) — when scan crashed (likely site down, JS blocked, etc.)
- `scanner-filtered-low-risk` (info) — dropped due to high score
- `scanner-summary` (info) — at end: total scanned, qualified, filtered

## Output protocol

Return to orchestrator:
- Path to updated prospects file
- Count of qualified prospects (proceeding to next stage)
- Count of filtered prospects

## Parallel execution hint

Orchestrator should run this stage with up to 5 parallel workers (5 axe-scans at once).
axe-core is ~7 sec per site; 30 sites in parallel = ~45 sec total wall time.

## Failure modes

- Site times out → log `scanner-failed` (error) with `reason: timeout`, mark prospect as failed
- Site blocks Playwright user agent → log with `reason: bot-blocked`
- Zero violations found (perfect score) → unusual but possible; log `scanner-perfect-score` (info), filter out
