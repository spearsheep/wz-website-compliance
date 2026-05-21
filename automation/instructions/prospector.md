# Prospector — Stage 1

## Role
Discover SMB websites in a target vertical + city using the Google Places API.
You are a sub-agent. You do NOT scan, enrich, or draft. You only produce the prospect list.

## Inputs (provided by orchestrator)

- `target_config_path` — path to a `targets/*.yaml` file
- `prospects_dir` — where to write the output JSON
- `api_key` — Google Places API key
- `run_date` — YYYY-MM-DD for filename
- `mode` — "trial" or "production"

## Step 1: Read inputs

1. Read the target YAML: `google_places_query`, `location`, `radius_meters`, `max_per_run`, `min_review_count`.
2. Note the `id` for output filename.

## Step 2: Query Google Places API (New)

```bash
curl -X POST 'https://places.googleapis.com/v1/places:searchText' \
  -H 'Content-Type: application/json' \
  -H "X-Goog-Api-Key: ${api_key}" \
  -H 'X-Goog-FieldMask: places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.businessStatus' \
  -d '{
    "textQuery": "{google_places_query} in {location}",
    "maxResultCount": 20,
    "languageCode": "en"
  }'
```

If `max_per_run > 20`, paginate via `pageToken` returned in response (do up to 3 pages).

## Step 3: Filter

Drop any business where:
- `businessStatus != "OPERATIONAL"`
- `websiteUri` is missing or null
- `userRatingCount < min_review_count`
- Website domain is a known directory aggregator (yelp.com, healthgrades.com, zocdoc.com, findlaw.com, etc.) — these are NOT the actual business website
- Website domain is a major chain (raymondjames.com, marriott.com, etc.) — likely a branch page, not a SMB

## Step 4: Deduplicate

1. Read existing prospect files in `prospects_dir/`
2. Collect all already-seen domains
3. Skip any business whose domain matches an already-seen one

## Step 5: Output

Write a JSON file: `{prospects_dir}/{run_date}-{target_id}.json`

Schema (one object per business):
```json
[
  {
    "name": "Smith & Associates Law Firm",
    "address": "123 Main St, Los Angeles, CA 90001",
    "phone": "+1-555-123-4567",
    "website": "https://smithlaw.com",      // normalized: protocol + hostname only
    "rating": 4.6,
    "review_count": 47,
    "target_id": "law-firms-la",
    "discovered_at": "2026-05-21T08:00:00.000Z",
    "scan": null,           // filled by scanner agent
    "enrichment": null,     // filled by lead-enricher agent
    "audit_pdf_path": null, // filled by report-generator agent
    "draft_id": null        // filled by email-drafter agent
  }
]
```

## Step 6: Logging

For each business processed, append to issues log in standard format (see `logging-format.md`):
- `prospector-found` (info) — for each kept business
- `prospector-filtered-no-website` (info) — count of dropped
- `prospector-filtered-low-reviews` (info) — count of dropped
- `prospector-deduped` (info) — count of skipped duplicates
- `prospector-api-error` (error) — if API call fails

## Output protocol

Return to orchestrator: ONLY the output JSON file path.

## Failure modes

- API quota exceeded → log `prospector-quota-exceeded` (error), exit with empty list
- Network error → retry once, then log `prospector-api-error` (error) and exit
- Zero results returned → log `prospector-zero-results` (warning), exit with empty list (NOT an error — could be over-querying same area)
