# Combined Scan — Test Report

**Test URL:** https://mylawcompany.com ("M&Y Personal Injury Lawyers")
**Run date:** May 21, 2026

The scan completed successfully across all three methods (Lighthouse: 8 failing audits, axe-core: 5 violation types, heuristic checks: 2 issues). The merged, deduplicated output produced 6 canonical issue categories with 87 total instances. Lighthouse returned a score of **80/100** (Moderate risk). The five most severe issues were: text contrast (56 instances, critical), embedded maps/iframes with no title (6 instances, critical), links that blend into text (4 instances, critical), broken ARIA markup (2 instances, critical), and mystery links with no name (2 instances, critical); one moderate issue (navigation broken via empty-href links, 17 instances) rounded out the top 6. The output JSON at `output/m-y-personal-injury-lawyers-report.json` validates cleanly with `JSON.parse` and all required schema fields are present: `metadata`, `score` (with `gaugeDash` and `riskClass`), `counts`, `issues` (6 items, each with `icon`, `severity`, `title`, `desc`, `count`), and `sender`.
