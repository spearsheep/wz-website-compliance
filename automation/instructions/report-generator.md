# Report Generator — Stage 4

## Role
Render a branded 1-page A4 PDF audit report per enriched prospect, using the axe-core
scan results. Output PDF is attached to the cold outreach email.

## Inputs (provided by orchestrator)

- `prospects_file_path` — prospects with completed scan + enrichment
- `lib_root` — path to lib/
- `audits_dir` — output directory for PDFs
- `sender_profile_path` — `companies/auras/profile.md` (for branding)

## Step 1: Filter prospects

Only generate reports for prospects where:
- `scan.filtered_out == false`
- `enrichment.found == true`
- `audit_pdf_path == null`

## Step 2: Read axe-core JSON for each prospect

The scanner already saved this to `scan.axe_json_path`. Read it and extract:
- All violations (with `impact`, `description`, `instances`, `helpUrl`)
- Pass/fail counts
- Timestamp

## Step 3: Render HTML from template

Use `lib/report-builder.js`:
```bash
node {lib_root}/report-builder.js \
  --prospect-json '{prospect-data-as-json}' \
  --output-pdf '{audits_dir}/{slug}-report.pdf' \
  --output-html '{audits_dir}/{slug}-report.html'
```

The script:
1. Reads the HTML template at `lib/report-template.html`
2. Substitutes `{{BUSINESS_NAME}}`, `{{URL}}`, `{{SCORE}}`, `{{VIOLATIONS}}`, etc.
3. Launches Playwright headless
4. Loads the HTML
5. Calls `page.pdf({ format: 'A4', printBackground: true })`

## Step 4: Required template fields

For the PDF to read well to a non-technical decision-maker, include:

**Header (black bar):**
- Business name (their name)
- URL audited
- Audit date
- Standard cited: "WCAG 2.1 Level AA"

**Risk banner (color-coded by risk tier):**
- Big score number (e.g. "76 / 100")
- Risk label: HIGH / MODERATE / LOW
- One-line context tied to their state's law (from `target.state_law_context`)

**Violation summary (4 colored cards):**
- Critical count
- Serious count
- Moderate count
- Minor count

**Top violations (5 cards):**
- Each card: emoji + plain-English label + instance count
- Example: "🔴 Text contrast too low — 28 places on this page where text is hard to read for visually impaired users"

**Why this matters (gray box):**
- Reference the lawsuit volume statistic
- Reference state-specific law from target config
- Mention the dollar cost band ($30K-$175K)
- Note that 67% of defendants are SMBs under $25M revenue

**Footer (black bar):**
- "Ready to fix this?" CTA
- Sender name + business + email from `companies/auras/profile.md`

## Step 5: Attach PDF path to prospect

Update prospect in-place:
```json
{
  "audit_pdf_path": "/{v1_root}/output/audits/smithlaw-com-report.pdf",
  "audit_html_path": "/{v1_root}/output/audits/smithlaw-com-report.html",
  "report_generated_at": "2026-05-21T08:12:00.000Z"
}
```

## Step 6: Write updated prospects file

## Step 7: Logging

- `report-generated` (info) — per PDF created
- `report-error` (error) — render failed (template issue, Playwright crash, disk full)

## Output protocol

Return to orchestrator: path to updated prospects file.

## Quality bar

Open the first PDF generated in trial mode and verify:
- Readable on screen and printed
- Business name spelled correctly
- Risk tier color matches score
- No template placeholders left in output (e.g. {{BUSINESS_NAME}})
- Total length is exactly 1 A4 page (don't bleed onto page 2)
