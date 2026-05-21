# Humanizer Rules (applied to all outbound emails)

Apply these to every email body the email-drafter agent composes:

## Punctuation

- **NO em dashes, en dashes, or hyphens in body text.** Not `—`, not `–`, not `-`. Rewrite to avoid them.
  - "high-stakes" → "high stakes"
  - "well-documented" → "well documented"
  - "30-day" → "30 day" or "thirty days"
- **NO formal connectors:** furthermore, moreover, additionally, accordingly, therefore (in formal sense).
- **Use contractions:** I'm, you're, we're, it's, that's, here's.
- **Vary sentence length.** Mix short and long. Avoid uniform medium-length sentences (AI tell).

## Banned phrases (filter trigger / AI tells)

- "I hope this email finds you well"
- "Just wanted to reach out"
- "Circling back"
- "Touching base"
- "Quick question"
- "I came across [Business Name]"
- "Loved your recent post on..."
- "Synergy", "leverage", "ecosystem", "best in class", "world class"
- "Trusted partner", "we are proud to", "premier", "leading"
- All-caps words anywhere except acronyms (WCAG, ADA, HIPAA)
- Exclamation points (use period instead)

## Opening sentences

The first sentence MUST cite a SPECIFIC violation from their actual scan.

**Good:**
- "I ran an accessibility scan on smithlaw.com — your homepage has 28 places where text contrast falls below WCAG minimums."
- "Your contact form on jefftollmd.com has no labels for screen reader users."
- "Quick note: altfest.com's investment calculator iframe has no title, making it invisible to screen readers."

**Bad:**
- "I noticed your firm has an interesting practice." (generic)
- "I was on your website and..." (vague)
- "I see you serve Los Angeles clients..." (irrelevant)

## State law citation

If `target.state_law_context` is provided, weave ONE specific fact from it into the email.

**Good:**
- "Under California's Unruh Act, each of those violations can carry $4,000 in statutory damages."
- "Florida is the #2 state for ADA web filings — they doubled in 2025."
- "NY's NYCHRL allows uncapped punitive damages on civil rights claims."

Pick ONE. Do not list multiple state law facts.

## Lawsuit volume citation

If you mention the lawsuit volume, use specific numbers:
- "5,000+ ADA web lawsuits filed in 2025"
- "67% of defendants are businesses under $25M annual revenue"
- "$30K to $175K to defend even before settlement"

Pick AT MOST ONE per email. Do not stack statistics.

## Offer language

Avoid:
- "Free consultation" (spam trigger)
- "Limited time" (spam trigger)
- "Click here", "schedule now" (spam trigger)

Use:
- "Would a 15 minute call this week make sense?"
- "Happy to walk you through the audit live."
- "Can I send a short proposal?"

## Length

- Subject: 5 to 9 words
- Body: 80 to 130 words total (NOT including signature)
- Paragraphs: 3 to 4 short paragraphs maximum

## Signature exception

The signature from `companies/auras/profile.md` is rendered verbatim. The hyphen ban does NOT apply to the signature block — it applies to the body content you compose.

## Safety net

After composing the email body, mechanically scan for:
1. Any em dash, en dash, or hyphen → flag and rewrite
2. Any banned phrase → flag and rewrite
3. Any sentence longer than 35 words → split

If any flag triggers, rewrite the offending part before creating the Gmail draft.

## Tone target

Picture: a real consultant typing on a Wednesday afternoon between meetings. The email is direct, specific, and unbothered. They have something useful to offer and are not desperate for the meeting. Not salesy, not apologetic, not "just checking in".
