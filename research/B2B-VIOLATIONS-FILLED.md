# B2B Case WCAG Violations — Fill Report

**Date completed:** 2026-05-21
**Files updated:** 14

---

## Files Updated

| File | Violations Added |
|------|-----------------|
| `aicpa-nasba-cpa-exam-doj.json` | `screen-reader-incompatible` |
| `bone-v-unc-health-care.json` | `pdf-inaccessible`, `alternative-format-missing` |
| `doj-service-oklahoma-mobile-app.json` | `mobile-app-inaccessible` |
| `doj-v-medstar-health.json` | `wcag-2-1-aa-general` |
| `doj-v-springfield-clinic-b2b.json` | `screen-reader-incompatible`, `wcag-2-1-aa-general` |
| `fowler-v-california-dept-insurance.json` | `screen-reader-incompatible` |
| `frazier-v-hca-holdings.json` | `screen-reader-incompatible`, `alt-text-missing`, `keyboard-nav` |
| `mckenney-v-exact-care-pharmacy.json` | `alternative-format-missing` |
| `morgan-lewis-financial-services-wave.json` | `wcag-2-1-aa-general` |
| `nash-hospitals-blind-patient.json` | `alternative-format-missing` |
| `nfb-v-epic-systems.json` | `screen-reader-incompatible` |
| `schwab-blind-clients-structured-negotiation.json` | `screen-reader-incompatible`, `captcha-inaccessible`, `wcag-2-2-aa-general` |
| `tenet-healthcare-american-blind-community.json` | `screen-reader-incompatible` |
| `wellpoint-anthem-structured-negotiation.json` | `screen-reader-incompatible`, `captcha-inaccessible`, `pdf-inaccessible`, `alternative-format-missing` |

---

## New Vocabulary Terms Added

Two identifiers were added beyond the original controlled vocabulary, following the same kebab-case pattern:

- **`alternative-format-missing`** — failure to provide Braille, large print, or accessible electronic alternatives to standard print documents (distinct from `pdf-inaccessible`, which refers to tagged PDF structure; this covers printed patient materials, prescriptions, billing statements)
- **`wcag-2-2-aa-general`** — used for the Schwab case, where the settlement standard was WCAG 2.2 AA (vs. 2.1 AA), and specific violations were under confidential addendum

---

## Most Common Violation Across All 14 B2B Cases

**`screen-reader-incompatible`** — appears in 8 of 14 cases (57%):
- AICPA/NASBA CPA Exam
- Springfield Clinic
- Fowler (CA Insurance Exam)
- Frazier v. HCA Holdings
- NFB v. Epic Systems
- Schwab
- Tenet Healthcare
- WellPoint/Anthem

This is the single dominant failure mode across the entire B2B dataset.

---

## Healthcare-Specific Pattern

Healthcare cases (8 of 14) split into two distinct sub-patterns:

**1. Patient communications / alternative formats** (non-website):
- Bone v. UNC Health Care — after-visit summaries, billing, forms not in Braille/large print/accessible electronic
- McKenney v. Exact Care Pharmacy — prescription dosage instructions not in large print or audio
- Nash Hospitals — billing statements not provided in Braille

**2. Patient-facing digital portals / websites**:
- Springfield Clinic — FollowMyHealth patient portal and CIOX records portal inaccessible via screen reader
- Frazier v. HCA — 159 hospital websites lacked alt-text and keyboard navigation
- Tenet Healthcare — hospital websites not accessible via screen readers

**Key healthcare pattern:** The sector faces a dual-front compliance problem — both the physical patient communications (printed materials) AND the digital portal layer must be accessible. No other B2B sector in this dataset has this duality.

---

## Financial Services Pattern

Financial services cases (3 of 14: Schwab, WellPoint/Anthem, Morgan Lewis wave):

- **CAPTCHAs without accessible alternatives** appear in both the Schwab and WellPoint cases — the only two sectors in the B2B dataset where this was specifically documented
- **PDF inaccessibility** cited in WellPoint (pre-August 2013 PDFs without alternative formats)
- **Alternative format failures** for member informational materials (WellPoint/Anthem)
- The Morgan Lewis wave entry represents firms where violations were alleged but specific WCAG criteria not publicly disclosed

**Key financial services pattern:** Digital authentication barriers (inaccessible CAPTCHAs) and member document accessibility are the two documented chokepoints. The Schwab case is the only one in the dataset requiring WCAG 2.2 AA (vs. 2.1 AA) — reflecting the more recent enforcement date (2024).

---

## Cases Where Tier 1 Sources Didn't Specify Violations (`wcag-2-1-aa-general`)

Three cases could not have specific violations enumerated from Tier 1 source text:

| Case | Reason |
|------|--------|
| `doj-v-medstar-health.json` | DOJ consent decree PDF and press release both returned HTTP 403 — inaccessible to fetch. Violations recorded as `wcag-2-1-aa-general`. |
| `doj-v-springfield-clinic-b2b.json` | DOJ press release and settlement agreement PDF both returned HTTP 403. Primary violation (`screen-reader-incompatible`) inferred from case notes documenting the complaint narrative; `wcag-2-1-aa-general` also added for the broader portal remediation requirement. |
| `morgan-lewis-financial-services-wave.json` | Aggregate trend entry with no individual complaint documents. Tier 2 law firm alert did not enumerate specific WCAG failures per named defendant. |

---

## Source Retrieval Notes

The following DOJ URLs returned HTTP 403 and could not be fetched:
- `justice.gov/archives/opa/pr/...` (Oklahoma, MedStar press releases)
- `justice.gov/d9/2024-01/...` (Oklahoma settlement PDF, MedStar consent decree PDF)
- `justice.gov/usao-cdil/pr/...` (Springfield Clinic press release)
- `justice.gov/crt/media/1370426/dl` (Springfield Clinic settlement agreement)
- `justice.gov/usao-ma/pr/...` (AICPA/NASBA DOJ press release)
- `nfb.org/about-us/press-room/...` (Exact Care, California Insurance Exam)
- `washingtonpost.com/...` (MedStar Washington Post article — paywall)

In all cases, violations were sourced from other available Tier 1 documents or, where none were retrievable, marked `wcag-2-1-aa-general` with explanation in `violation_source_evidence`.
