# Auras — Sender Profile

## IDENTITY

```yaml
sender_name: Ray Wang
sender_title: Founder, Accessibility & Web Compliance Services
sender_email: ray@my-auras.com         # update to compliance-specific domain when warmed
sender_phone: ""                        # optional, leave blank if not used in outreach
company_name: Auras
company_url: https://my-auras.com       # update to landing page when built
```

## SCOPE — WHAT YOU SELL

**Primary offer:** Full website rebuild on accessible architecture (Next.js + shadcn/ui) with WCAG 2.1 AA verified compliance.
**Price band:** $4,000 - $12,000 one-time
**Add-on:** Monthly accessibility monitoring ($150 - $500/month)
**Audit-only:** $500 - $1,500 (paid follow-up if they want details before rebuild)

## TARGETS — ENABLED VERTICALS

```yaml
targets:
  - id: law-firms-la
    enabled: true
    daily_target: 8    # max prospects per run for this vertical
  - id: medical-practices-miami
    enabled: true
    daily_target: 8
  - id: financial-advisors-ny
    enabled: false     # turn on when first two are dialed in
    daily_target: 6

daily_total_cap: 25     # hard limit across all verticals (deliverability protection)
```

## RISK SCORING THRESHOLDS

```yaml
score_filter:
  draft_if_score_below: 90    # only generate drafts for sites scoring below this
  high_risk_below: 70
  moderate_risk_below: 90
  # sites at 90+ are skipped (low risk = low conversion)
```

## EMAIL PROFILE

```yaml
tone:
  - direct
  - no jargon
  - factual not salesy
  - reference their specific violations (not generic)
  - cite lawsuit risk in dollar terms

avoid:
  - "I hope this email finds you well"
  - "circle back"
  - "synergy" / "leverage" / "ecosystem"
  - exclamation marks
  - fake personalization ("loved your post on...")
  - all-caps or bold ALL THE TIME

length:
  body: 80-130 words
  subject: 5-9 words

cta: "Would a 15-minute call this week make sense?"
```

## GMAIL CREDENTIALS

```yaml
gmail_account: ray@my-auras.com
gmail_oauth_creds_path: "{paste path to OAuth credentials JSON when set up}"
draft_label: "compliance-outreach-pending-review"
```

## NOTIFICATION

```yaml
imessage_recipient: ""           # phone number or contact name for daily summary
slack_channel: ""                # if you want Slack instead/also
```

## FILE PATHS

```yaml
v1_root: /Users/raywang/Desktop/Softwares/Scheduled Tasks/Website Compliance v1
issues_log: "{v1_root}/output/pipeline-issues.jsonl"
run_log: "{v1_root}/output/run-log.md"
audits_dir: "{v1_root}/output/audits"
prospects_dir: "{v1_root}/prospects"

trial_issues_log: "{v1_root}/trial-output/trial-pipeline-issues.jsonl"
trial_run_log: "{v1_root}/trial-output/trial-run-log.md"
trial_audits_dir: "{v1_root}/trial-output/audits"
```

## API CREDENTIALS

```yaml
google_places_api_key: "AIzaSyCQ5aiB5Byp1RphFmulekTmovqMX8t0bo8"  # PageSpeed key (rotate per service)
google_pagespeed_api_key: "AIzaSyCQ5aiB5Byp1RphFmulekTmovqMX8t0bo8"
apify_token: ""              # set up in next step
```
