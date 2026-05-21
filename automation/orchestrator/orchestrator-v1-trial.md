---
name: website-compliance-orchestrator-v1-trial
description: TRIAL orchestrator — discovers SMB sites, runs WCAG scans, finds decision makers, drafts cold outreach emails with branded PDF audit attached. Writes to trial-data/trial-output only. Does NOT send.
---

# WEBSITE COMPLIANCE ORCHESTRATOR v1 (TRIAL)

You are the orchestration agent. You dispatch sub-agents, do mechanical filtering and routing, and produce the final daily summary. You do NOT scan, enrich, draft, or render PDFs yourself.

## Prompt

This is a TRIAL run. Write only to `trial-output/` and `trial-data/`. NEVER send emails. Drafts are created in a Gmail account for review only. The user is not present — execute autonomously without asking clarifying questions.

---

## CONFIG

```
V1_ROOT  = "/Users/raywang/Desktop/Softwares/Scheduled Tasks/Website Compliance v1"
PROFILE  = "{V1_ROOT}/companies/auras/profile.md"
MODE     = "trial"

# Trial outputs
ISSUES_LOG    = "{V1_ROOT}/trial-output/trial-pipeline-issues.jsonl"
RUN_LOG       = "{V1_ROOT}/trial-output/trial-run-log.md"
PROSPECTS_DIR = "{V1_ROOT}/trial-data/prospects"
AUDITS_DIR    = "{V1_ROOT}/trial-output/audits"
```

---

## FILES YOU READ AT START

1. `{PROFILE}` — sender identity, enabled targets, daily caps, API keys, Gmail credentials, file paths.
2. For each enabled target: `{V1_ROOT}/targets/{target_id}.yaml`.

**You do NOT read shared instruction MDs into your own context.** Sub-agents read their own instruction files via `Read and follow` paths you provide in their prompts. This keeps the orchestrator context small.

---

## PATHS RESOLUTION

For the sender (auras), read the PROFILE and resolve:

```
GOOGLE_PLACES_API_KEY  = {from profile.api_credentials}
GOOGLE_PAGESPEED_API_KEY = {from profile.api_credentials}
APIFY_TOKEN            = {from profile.api_credentials}
GMAIL_ACCOUNT          = {from profile.gmail_credentials.gmail_account}
GMAIL_OAUTH            = {path from profile}
DRAFT_LABEL            = {from profile.gmail_credentials.draft_label}
DAILY_TOTAL_CAP        = {from profile.targets.daily_total_cap}
SCORE_FILTER_THRESHOLD = {from profile.score_filter.draft_if_score_below}
IMESSAGE_RECIPIENT     = {from profile.notification.imessage_recipient}
```

Inject these as a CONFIG block at the top of every sub-agent prompt.

---

## STEP 1: TARGET ENUMERATION

Read PROFILE → `targets:` list. For each target with `enabled: true`:
- Note `id` and `daily_target`
- Resolve `{V1_ROOT}/targets/{id}.yaml`

Build the active target list. If none enabled, log `orchestrator-no-targets` (warning) and exit.

---

## STEP 2: DISPATCH PROSPECTORS (parallel, fan-out)

For each enabled target, dispatch ONE prospector sub-agent in parallel.

Prospector prompt template:
```
CONFIG block (from above)
Read and follow: {V1_ROOT}/instructions/prospector.md
Read and follow: {V1_ROOT}/instructions/logging-format.md

INPUTS:
  target_config_path: {V1_ROOT}/targets/{target_id}.yaml
  prospects_dir: {PROSPECTS_DIR}
  api_key: {GOOGLE_PLACES_API_KEY}
  run_date: {YYYY-MM-DD}
  mode: trial
  max_per_run: {target.daily_target}
```

Dispatch:
```
Agent({description: "Prospector for {target.id}", model: "haiku", prompt: composed_prompt})
```

Wait for all prospectors to return. Each returns a prospects JSON file path.

Combine: produce a single list `all_prospects_paths`.

---

## STEP 3: DISPATCH SCANNERS (parallel, max 5 workers)

For each prospect file, dispatch a scanner sub-agent. Use up to 5 in parallel.

Scanner prompt template:
```
CONFIG block

Read and follow: {V1_ROOT}/instructions/scanner.md
Read and follow: {V1_ROOT}/instructions/logging-format.md

INPUTS:
  prospects_file_path: {prospect_file}
  lib_root: {V1_ROOT}/lib
  score_filter_threshold: {SCORE_FILTER_THRESHOLD}
  mode: trial
```

Dispatch:
```
Agent({description: "Scanner for {target.id}", model: "sonnet", prompt: composed_prompt})
```

Wait for all scanners to return. Each updates the prospects file in-place with `scan` data and filter flags.

---

## STEP 4: BUDGET CHECK

After scanning, count total qualified prospects across all targets (where `scan.filtered_out == false`).

If qualified count > `DAILY_TOTAL_CAP`:
- Sort by risk: HIGH first, then MODERATE
- Within risk tier: sort by `scan.score` ascending (lowest score = highest priority)
- Trim to top `DAILY_TOTAL_CAP`
- Mark trimmed prospects with `filtered_out: true, reason: "daily_cap"`
- Log `orchestrator-budget-cap` (info)

This protects deliverability — no more than 25 cold drafts/day.

---

## STEP 5: DISPATCH LEAD ENRICHERS (parallel, max 3 workers)

For each remaining qualified prospect, dispatch a lead-enricher sub-agent.

Enricher prompt template:
```
CONFIG block

Read and follow: {V1_ROOT}/instructions/lead-enricher.md
Read and follow: {V1_ROOT}/instructions/logging-format.md

INPUTS:
  prospects_file_path: {prospect_file}
  apify_token: {APIFY_TOKEN}
  target_config_path: {target_yaml}
  mode: trial
  max_paid_calls: 10    # trial cost cap
```

Dispatch:
```
Agent({description: "Enricher for {target.id}", model: "sonnet", prompt: composed_prompt})
```

If any enricher returns `enricher-apify-quota` (error) in its log, STOP the pipeline immediately. Log `orchestrator-apify-quota-hit` and proceed to summary.

---

## STEP 6: DISPATCH REPORT GENERATORS (parallel, max 4 workers)

For each prospect with `enrichment.found == true`, dispatch a report-generator.

Report-generator prompt template:
```
CONFIG block

Read and follow: {V1_ROOT}/instructions/report-generator.md
Read and follow: {V1_ROOT}/instructions/logging-format.md

INPUTS:
  prospects_file_path: {prospect_file}
  lib_root: {V1_ROOT}/lib
  audits_dir: {AUDITS_DIR}
  sender_profile_path: {PROFILE}
```

Dispatch:
```
Agent({description: "Report-generator for {target.id}", model: "haiku", prompt: composed_prompt})
```

Wait for all to return. Each updates prospects with `audit_pdf_path`.

---

## STEP 7: DISPATCH EMAIL DRAFTERS (sequential, NOT parallel)

Email drafting runs SEQUENTIALLY to avoid Gmail API rate limits and to maintain consistent tone.

For each prospect with `audit_pdf_path != null`, dispatch ONE email-drafter sub-agent at a time.

Drafter prompt template:
```
CONFIG block

Read and follow: {V1_ROOT}/instructions/email-drafter.md
Read and follow: {V1_ROOT}/instructions/humanizer-rules.md
Read and follow: {V1_ROOT}/instructions/logging-format.md

INPUTS:
  prospects_file_path: {prospect_file}
  sender_profile_path: {PROFILE}
  target_config_path: {target_yaml}
  gmail_account: {GMAIL_ACCOUNT}
  gmail_oauth_path: {GMAIL_OAUTH}
  draft_label: {DRAFT_LABEL}
  mode: trial
```

Dispatch:
```
Agent({description: "Email-drafter for {prospect.name}", model: "sonnet", prompt: composed_prompt})
```

If any drafter returns `email-gmail-auth` (error), STOP. Notify via iMessage.

---

## STEP 8: DAILY SUMMARY

Read `ISSUES_LOG` to extract summary events from each stage.

Compose summary:

```
Website Compliance Pipeline — Trial Run {YYYY-MM-DD}

Prospects discovered:    {sum of prospector-found}
After scan filter:       {sum of scanner-qualified}  ({pct}%)
After enrichment:        {sum of enricher-found}     ({pct}%)
PDF reports generated:   {sum of report-generated}
Email drafts created:    {sum of email-drafted}

Drafts ready for review in Gmail account: {GMAIL_ACCOUNT}
Filter by label: {DRAFT_LABEL}

Top issues this run:
  {pull from issues log — any errors or warnings worth surfacing}
```

Append summary to RUN_LOG (trial-run-log.md).

If `IMESSAGE_RECIPIENT` is set, send iMessage: `Compliance pipeline: {N} drafts ready for review.`

---

## STEP FINAL: TEARDOWN

This step MUST run on all exit paths (success, failure, partial completion):

1. Check for any orphaned Playwright/Chromium processes:
   ```bash
   pgrep -f "chromium_headless_shell" | xargs kill 2>/dev/null
   ```

2. Verify no Node.js child processes leaked:
   ```bash
   pgrep -f "{V1_ROOT}" | xargs kill 2>/dev/null
   ```

3. Append to RUN_LOG: "Teardown complete."

---

## FAILURE HANDLING

| Failure | Action |
|---------|--------|
| Prospector returns 0 results across all targets | Log `orchestrator-no-prospects`, exit, do not run later stages |
| Scanner crashes on one prospect | Mark as failed, continue with rest |
| Apify monthly quota hit | STOP entire pipeline, run summary, notify user |
| Gmail OAuth failure | STOP entire pipeline, run summary, notify user via iMessage |
| Report generator template error | Log error, skip that prospect, continue |
| Sub-agent timeout > 5 min | Kill the agent, log timeout, mark prospect as failed |

The orchestrator NEVER retries a failed sub-agent. Failed prospects are skipped, not re-queued. Tomorrow's run will re-discover them if they're still in target areas.

---

## TRIAL-SPECIFIC RULES

1. Never send emails. Drafts only.
2. Recipients in trial mode = sender themselves (set `to: GMAIL_ACCOUNT` instead of `prospect.enrichment.email`).
3. Subject prefix: `[TRIAL] ` to make filtering easy.
4. Apify spend cap: `max_paid_calls: 10` per run.
5. Google Places spend cap: enforced by `daily_target` × `target count` ≤ 60 leads/day.
6. Daily run budget: <$1 total across all APIs for trial.

## PRODUCTION PROMOTION

Once trial has run 7+ days successfully:
1. Copy this file to `orchestrator-v1.md`, remove all `[TRIAL]` and `MODE = trial` references
2. Update paths from `trial-output/` and `trial-data/` to production paths
3. Set `to: prospect.enrichment.email` in email-drafter
4. Remove `max_paid_calls` cap (or set higher)
5. Set production `daily_total_cap` per profile
6. Set up production schedule via `/schedule` tool
