# Email Drafter — Stage 5

## Role
Draft a personalized cold outreach email per prospect, with the audit PDF attached.
Create as a DRAFT in the sender's Gmail account. Apply a label for review.
You DO NOT send. The user reviews drafts manually.

## Inputs (provided by orchestrator)

- `prospects_file_path` — prospects with scan + enrichment + audit_pdf_path
- `sender_profile_path` — `companies/auras/profile.md`
- `target_config_path` — for state law context and CTA angle
- `humanizer_rules_path` — `instructions/humanizer-rules.md`
- `gmail_account` — sender email address
- `draft_label` — Gmail label to apply (default: "compliance-outreach-pending-review")
- `mode` — "trial" or "production"

## Step 1: Read humanizer rules

`Read and follow: instructions/humanizer-rules.md`

This file defines: tone, banned phrases, length targets, sentence patterns, signature format.

## Step 2: For each prospect

Filter to prospects where:
- `audit_pdf_path != null`
- `draft_id == null`
- `enrichment.email_verified == true` (in trial mode, also accept catch_all but flag it)

## Step 3: Build email content

### Subject line (5-9 words, no all-caps)

Use ONE of these patterns, chosen per prospect:
- "Quick note about [Business Name]'s website"
- "Accessibility audit for [Business Name]"
- "[Business Name] — WCAG compliance check"
- "Site audit: [N] issues on [domain]"

Avoid:
- Question marks (filter trigger)
- "Free", "Urgent", "ACT NOW" (spam triggers)
- Generic ("Hi [name]", "Just checking in")

### Body (80-130 words)

Structure:

**Line 1 (greeting):** "Hi {first_name},"

**Para 1 (specific observation):** 1-2 sentences citing 1-2 SPECIFIC violations from their scan.
Example: "I ran a quick accessibility audit on smithlaw.com — your homepage has 28 places where text contrast falls below WCAG minimums, plus form fields with no labels for screen readers."

**Para 2 (risk context):** 1-2 sentences with state-specific lawsuit context.
Pull from `target_config.risk_message_short`.
Example: "Under California's Unruh Act, each of those violations can carry $4,000 in statutory damages, with mandatory attorney fees."

**Para 3 (offer):** 1-2 sentences positioning the rebuild.
Example: "We rebuild firm websites with WCAG 2.1 AA verified compliance from the ground up — modern look, audited at delivery, defensible posture."

**Closing:** CTA from sender profile.
Example: "Would a 15-minute call this week make sense? I'm attaching the full audit for context."

**Signature:** Sender name, role, business, link. Read from `companies/auras/profile.md`.

### Reference the attachment
Mention "I'm attaching the full audit" or "attached is the full audit" — make sure they see the PDF.

## Step 4: Create Gmail draft

Use Gmail API (OAuth credentials in `companies/auras/profile.md`).

```python
# pseudocode
draft = gmail.users().drafts().create(
  userId='me',
  body={
    'message': {
      'to': prospect.enrichment.email,
      'subject': subject,
      'body': body_text,
      'attachments': [prospect.audit_pdf_path],
      'labelIds': [label_id_for(draft_label)]
    }
  }
).execute()
```

In TRIAL mode: prepend "[TRIAL] " to the subject and create the draft in a separate test account, or change the recipient to the sender themselves (don't send to real prospects in trial).

## Step 5: Apply label

If the draft was created without label support, separately label the draft:
```python
gmail.users().messages().modify(
  userId='me',
  id=draft_message_id,
  body={'addLabelIds': [label_id]}
).execute()
```

## Step 6: Attach draft ID to prospect

```json
{
  "draft_id": "r-12345abc",
  "draft_subject": "Quick note about Smith Law's website",
  "draft_created_at": "2026-05-21T08:15:00.000Z",
  "draft_label": "compliance-outreach-pending-review"
}
```

## Step 7: Write updated prospects file

## Step 8: Logging

- `email-drafted` (info) — per draft created
- `email-skip-unverified` (info) — skipped because email_verified == false (production only)
- `email-gmail-error` (error) — Gmail API failed
- `email-summary` (info) — at end: drafts created, skipped

## Output protocol

Return to orchestrator:
- Path to updated prospects file
- Count of drafts created
- Count of prospects skipped (and why)

## Quality bar

In trial mode, ALWAYS review the first 3 drafts before promoting to production:
- Does the email read like a human wrote it?
- Is the violation citation specific and accurate?
- Does the state law context match the prospect's state?
- Is the CTA clear?
- Is the PDF actually attached?

## Failure modes

- Gmail OAuth expired → log `email-gmail-auth` (error), notify user via iMessage
- Attachment file missing → log `email-missing-pdf` (error), skip prospect
- Label doesn't exist → create it, then retry
