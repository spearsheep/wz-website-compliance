# render-pdf.js — Test Report

**Status: PASS**

## Run

```
node lib/render-pdf.js lib/sample-report.json
```

## Output

| Artifact | Path |
|---|---|
| Filled HTML | `output/m-y-personal-injury-lawyers-report.html` |
| PDF | `output/m-y-personal-injury-lawyers-report.pdf` |

**PDF file size:** 417.6 KB (threshold: > 50 KB) ✓

## Verification

1. HTML saved successfully with all placeholders filled.
2. Playwright launched Chromium, navigated to the local HTML file (`file://` protocol), waited for `networkidle` + 2s font load + `document.fonts.ready`.
3. PDF rendered with `printBackground: true`, A4 format, zero margins, `preferCSSPageSize: false`.
4. PDF file exists and is 417.6 KB — indicates full content including the dark cost band (which requires `printBackground`).
5. Opened in macOS Preview — layout matches HTML preview: top bar, gauge, stat strip, audience section, issue rows with icons, dark cost band, settlements grid, CTA, sources footer.

## Issues

None. All 6 issue rows render correctly with SVG icons and severity bars.
