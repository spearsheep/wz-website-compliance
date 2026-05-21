# Shared Report Data Schema (Contract Between Scanner + PDF Generator)

This schema is the single source of truth. The Combined Scanner produces JSON matching this shape. The PDF Generator consumes JSON matching this shape and produces a PDF using `templates/report.html`.

## Output JSON Schema

```json
{
  "metadata": {
    "businessName": "string — display name",
    "url": "string — full URL audited",
    "urlDisplay": "string — host only (e.g. 'mylawcompany.com')",
    "auditDate": "string — 'May 21, 2026' format",
    "auditDateShort": "string — '21 MAY 2026'",
    "dossierId": "string — 'JR-YYYY-MMDD-NNN'",
    "scannedAt": "ISO 8601 timestamp"
  },
  "score": {
    "value": "number 0-100 — Lighthouse accessibility score",
    "gaugeDash": "string — SVG stroke-dasharray for gauge (computed from score)",
    "riskClass": "string — 'high' | 'moderate' | 'low'",
    "riskLabel": "string — 'High' | 'Moderate' | 'Low'"
  },
  "counts": {
    "critical": "number — count of critical violation types",
    "serious": "number — count of serious violation types",
    "moderate": "number — count of moderate violation types",
    "minor": "number — count of minor violation types",
    "totalIssues": "number — total distinct issue types found (=critical+serious+moderate+minor)",
    "totalInstances": "number — total instance count across all violations"
  },
  "issues": [
    {
      "icon": "string — must be one of: 'contrast' | 'form' | 'link' | 'frame' | 'nav' | 'warning'",
      "severity": "string — 'critical' | 'serious' | 'moderate' | 'minor'",
      "title": "string — plain-English title (e.g. 'Your text is too hard to read')",
      "desc": "string — single-sentence description in plain language",
      "count": "number — number of instances on the page"
    }
  ],
  "sender": {
    "name": "Ray Wang",
    "company": "Juris",
    "email": "ray@juris.audit"
  }
}
```

## Constraints

- `issues` array: max 6 items, sorted by severity (critical > serious > moderate > minor) then by count descending
- `score.gaugeDash` is computed as: `((score/100) * 2 * PI * 120).toFixed(2) + ' ' + (2*PI*120).toFixed(2)` (the gauge uses r=120)
- `riskClass` mapping: score ≥ 90 = 'low', score 80-89 = 'moderate', score < 80 = 'high'
- `issues[].icon` must map to one of the 6 known icon keys (the PDF generator has SVG mapped to these names)

## Issue Title → Icon Mapping (plain English → icon)

The scanner should translate technical WCAG rule IDs to plain English titles + appropriate icons:

| Lighthouse/axe rule ID | Plain English Title | Icon |
|---|---|---|
| color-contrast, contrast-* | "Your text is too hard to read" | contrast |
| label, label-* | "Your forms confuse blind visitors" | form |
| form-field-multiple-labels | "Form fields are confusing screen readers" | form |
| link-name | "Mystery links with no name" | warning |
| link-in-text-block | "Links blend into text" | link |
| frame-title, iframe-* | "Maps and widgets are invisible" | frame |
| heading-order | "Heading structure is broken" | warning |
| document-title | "Page has no title" | warning |
| html-has-lang | "Language not declared" | warning |
| image-alt, alt-text | "Images missing descriptions" | warning |
| bypass, skip-link | "No way to skip navigation" | nav |
| navigation, nav-* | "Navigation is broken" | nav |
| aria-* | "Screen reader markup is broken" | warning |
| tabindex, focus-* | "Keyboard navigation is broken" | nav |

Severity inheritance: use axe-core's `impact` field if available (critical/serious/moderate/minor). For Lighthouse-only findings, infer severity from the audit weight: weight >= 7 → critical, 4-6 → serious, 2-3 → moderate, 1 → minor.

## File Paths

- Scanner input: URL + business name (CLI args or function args)
- Scanner output: `output/{slug}-report.json` (matches schema above)
- PDF generator input: `output/{slug}-report.json` + `templates/report.html`
- PDF generator output: `output/{slug}-report.pdf` and `output/{slug}-report.html`
