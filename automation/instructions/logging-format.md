# Logging Format (shared across all agents)

All sub-agents append to a persistent JSONL log. The `ISSUES_LOG` path is injected at the top of your prompt by the orchestrator — use it directly, never hardcode.

## Format

Append-only JSONL, one event per line:

```json
{"ts":"2026-05-21T08:05:00Z","agent":"scanner","severity":"info|warning|error","category":"slug-id","prospect":"BusinessName_or_null","message":"one-line description","context":{}}
```

## When to log

Only log things that need attention:
- Failures (errors)
- Fallbacks taken (warnings)
- Filtered/skipped prospects with reason (info, useful for tuning)
- Summary at end of stage (info, one event per stage)

**Do NOT log** normal successful operations. Log volume should be a tenth of throughput.

## How to write (Node.js)

```javascript
import { appendFileSync } from 'fs';

function log(severity, category, prospect, message, context = {}) {
  const event = {
    ts: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
    agent: '<your-agent-name>',
    severity,        // 'info' | 'warning' | 'error'
    category,        // slug-id, e.g. 'scanner-failed'
    prospect,        // business name or null
    message,
    context,
  };
  appendFileSync(ISSUES_LOG, JSON.stringify(event) + '\n');
}
```

## Severity guidelines

- **error** — pipeline can't continue for this prospect, or whole stage failed
- **warning** — fell back to secondary strategy, partial success, missing data
- **info** — useful for tuning the pipeline (filter counts, summary)

## Category naming

Use `<agent>-<event>` slug pattern:
- `prospector-found`
- `prospector-filtered-no-website`
- `prospector-api-error`
- `scanner-scanned`
- `scanner-filtered-low-risk`
- `scanner-failed`
- `enricher-found`
- `enricher-no-leads`
- `enricher-apify-quota`
- `report-generated`
- `report-error`
- `email-drafted`
- `email-gmail-error`

## Summary events

Each agent SHOULD emit one summary event at the end:

```json
{"ts":"...","agent":"scanner","severity":"info","category":"scanner-summary","prospect":null,"message":"Scan stage complete","context":{"total":30,"qualified":24,"filtered":4,"failed":2}}
```

This makes the run-log human-readable when reviewing daily output.

## File creation

The file is created on first append (Node.js `appendFileSync` handles this). Don't pre-read or summarize the log — just append.
