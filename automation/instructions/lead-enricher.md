# Lead Enricher — Stage 3

## Role
Find a decision-maker email (office manager, practice administrator, firm administrator)
for each qualified prospect via Apify. Skip prospects where no usable lead is found.

Pattern modeled on `Email Marketing v3/instructions/brand-research-protocol.md` Stage A.

## Inputs (provided by orchestrator)

- `prospects_file_path` — JSON with qualified prospects (scan completed)
- `apify_token` — Apify API token
- `target_config_path` — for `decision_maker_titles` (primary + fallback)
- `mode` — "trial" or "production"

## Step 1: Filter prospects to enrich

Only process prospects where:
- `scan.filtered_out == false`
- `enrichment == null`
- `website` domain is verified (not a redirect/branch page)

## Step 2: Pre-flight count (free)

For each prospect, before paying for a search, check count first.

```yaml
actor: pipelinelabs/leads-finder-with-emails-apollo-lusha-zoominfo
input:
  companyDomainIncludes: ["{prospect.domain}"]
  companyDomainMatchMode: "strict"
  personTitleIncludes: {target_config.decision_maker_titles.primary}
  includeTitleVariants: true
  emailStatusIncludes: ["verified"]
  countOnly: true
```

If `count == 0` for primary titles, try fallback titles:
```yaml
personTitleIncludes: {target_config.decision_maker_titles.fallback}
```

If still 0 after fallback, log `enricher-no-leads` (warning) and skip this prospect.

## Step 3: Paid search

When pre-flight count > 0, run the real search:
```yaml
input:
  companyDomainIncludes: ["{prospect.domain}"]
  companyDomainMatchMode: "strict"
  personTitleIncludes: {titles_with_results}
  includeTitleVariants: true
  emailStatusIncludes: ["verified"]
  maxItems: 5         # we only need 1-2; cap to control cost
```

## Step 4: Pick best lead

From results, prefer in order:
1. Title matches a primary title verbatim
2. Title contains a primary title as substring
3. Email status is "verified" over "guess"
4. Has both first and last name
5. Highest seniority signal (e.g. "Director" > "Manager" > "Associate")

If multiple equally-good leads, pick the one with the most complete profile.

## Step 5: Verify the email

If Apify provides a verification status, use it. If status is "catch_all" or "unknown":
- Mark as `verified: false` in enrichment
- Still keep — downstream email-drafter will decide whether to use it

## Step 6: Attach enrichment data

Update prospect in-place:
```json
{
  "enrichment": {
    "found": true,
    "first_name": "Sarah",
    "last_name": "Chen",
    "full_name": "Sarah Chen",
    "title": "Firm Administrator",
    "email": "sarah.chen@smithlaw.com",
    "email_verified": true,
    "linkedin_url": "https://linkedin.com/in/sarahchen",
    "apify_actor": "pipelinelabs/leads-finder-with-emails-apollo-lusha-zoominfo",
    "enriched_at": "2026-05-21T08:08:00.000Z"
  }
}
```

If not found:
```json
{
  "enrichment": {
    "found": false,
    "reason": "no leads in apify after primary + fallback titles",
    "enriched_at": "2026-05-21T08:08:00.000Z"
  }
}
```

## Step 7: Write updated prospects file

Write back to same path.

## Step 8: Logging

- `enricher-found` (info) — for each successful match
- `enricher-no-leads` (warning) — when even fallback returned 0
- `enricher-apify-error` (error) — on actor failure
- `enricher-apify-quota` (error) — on monthly limit hit; orchestrator should stop the pipeline
- `enricher-summary` (info) — at end: total attempted, found, missed

## Output protocol

Return to orchestrator:
- Path to updated prospects file
- Count of prospects with enrichment.found == true (proceed to report-generator)
- Count of prospects skipped

## Cost control

Apify is the most expensive stage. Pre-flight `countOnly: true` is free.
Only spend on prospects that have at least 1 result in pre-flight.

For the trial: cap total Apify spend per run by setting `max_paid_calls` in orchestrator.

## Failure modes

- Apify token invalid → log `enricher-apify-auth` (error), abort pipeline
- Domain returns zero leads for primary + fallback → log `enricher-no-leads`, skip prospect
- Apify monthly quota hit → log `enricher-apify-quota`, orchestrator stops pipeline gracefully
