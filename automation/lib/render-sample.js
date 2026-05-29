/**
 * render-sample.js — Render a sample PDF using sample-report.json + the report template.
 *
 * Standalone preview tool: NO axe scan needed, NO target.yaml needed.
 * Reads automation/lib/sample-report.json and produces the same output the
 * production report-builder.js will produce per prospect.
 *
 * Usage:
 *   node automation/lib/render-sample.js
 */

import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { calculateQuote, formatRangeFull } from "./quote-engine.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE = join(__dirname, "..", "templates", "report.html");
const SAMPLE = join(__dirname, "sample-report.json");
const OUT_HTML = join(__dirname, "..", "output", "sample-report.html");
const OUT_PDF = join(__dirname, "..", "output", "sample-report.pdf");

// ─── HEALTHCARE LAWSUITS (curated high-stakes cases) ───
// Picked from site/content/lawsuits/*.json by industry=healthcare, ranked by
// disclosed settlement size + recency. Wired into page 3 of the report.
const HEALTHCARE_CASES = [
  {
    amount: "$440K",
    defendant: "MedStar Health",
    meta: "2024 · DOJ enforcement · inaccessible patient portal & scheduling",
  },
  {
    amount: "$125K",
    defendant: "UNC Health Care",
    meta: "2023 · Private class action · inaccessible patient-facing systems",
  },
  {
    amount: "DOJ Order",
    defendant: "Springfield Clinic",
    meta: "2024 · DOJ settlement · mandatory WCAG 2.1 AA across all patient touchpoints",
  },
  {
    amount: "Cited Daily",
    defendant: "Robles v. Domino's Pizza",
    meta: "2019 · 9th Cir. · confirmed ADA applies to commercial websites",
  },
];

const SOURCES = [
  { num: "1", text: "Seyfarth Shaw &amp; Co. ADA Title III Filings Tracker — 4,605 federal filings in 2025; California +105%" },
  { num: "2", text: "<em>Alcazar v. Fashion Nova</em>, N.D. Cal. (2025) — $5.15M settlement" },
  { num: "3", text: "California Unruh Civil Rights Act, Cal. Civ. Code § 52(a) — $4,000 statutory minimum per violation" },
  { num: "4", text: "UsableNet Industry Report — 64% of ADA defendants have revenue under $25M" },
  { num: "5", text: "<em>NFB v. Target</em>, N.D. Cal. (2008) — $6M class + $3.7M attorneys' fees" },
  { num: "6", text: "<em>NAD v. Netflix</em>, D. Mass. (2012) — $795K fees + captioning consent decree" },
  { num: "7", text: "<em>Robles v. Domino's Pizza</em>, 913 F.3d 898 (9th Cir. 2019)" },
  { num: "8", text: "DOJ Title II Final Rule (April 2024) &amp; HHS Section 504 Final Rule (May 2024) — WCAG 2.1 AA required" },
];

const CTA_URL = "https://justcompliant.com/contact";
const CTA_LABEL = "Get my free audit";

function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/**
 * Returns the full <div class="client-logo">…</div> markup if we have a logo,
 * or an empty string if we don't (so the layout collapses cleanly — no awkward
 * initial-letter fallback when a practice genuinely has no usable logo online).
 *
 * Resolution order:
 *   1. Explicit logoUrl on the sample (scraped from the client's homepage)
 *   2. Clearbit Logo API (only useful for well-known domains)
 *   3. Nothing — return "" so the spot disappears
 */
function clientLogoHtml(sample) {
  const directUrl = sample.metadata.logoUrl;
  if (directUrl) {
    return `<div class="client-logo"><img src="${escapeHtml(directUrl)}" alt="${escapeHtml(sample.metadata.businessName)} logo"></div>`;
  }
  // No reliable logo source — return empty so the client card collapses to just the text block.
  return "";
}

// ─── ISSUE ROW MARKUP (matches original template's expectations) ───
const ICON_SVG = {
  contrast: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2 a10 10 0 0 0 0 20z" fill="currentColor"/></svg>',
  form:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="13" x2="13" y2="13"/></svg>',
  nav:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  link:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  frame:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>',
  warning:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
};

function renderIssues(issues) {
  return issues.map((i) => `
    <div class="issue-row">
      <div class="issue-icon-lg ${escapeHtml(i.severity)}">${ICON_SVG[i.icon] || ICON_SVG.warning}</div>
      <div class="issue-content">
        <div class="issue-title">${escapeHtml(i.title)}</div>
        <div class="issue-desc">${escapeHtml(i.desc)}</div>
      </div>
      <div class="issue-severity-vis">
        <div class="severity-bar ${escapeHtml(i.severity)}"></div>
        <div class="severity-label ${escapeHtml(i.severity)}">${escapeHtml(i.severity)}</div>
      </div>
      <div class="issue-count-vis">
        <div class="issue-count-num">${i.count}</div>
        <div class="issue-count-label">place${i.count === 1 ? "" : "s"}</div>
      </div>
    </div>`).join("\n");
}

function renderSettlements(cases) {
  return cases.map((c) => `
      <div class="settle-card">
        <div class="settle-amt">${escapeHtml(c.amount)}</div>
        <div class="settle-defendant">${escapeHtml(c.defendant)}</div>
        <div class="settle-meta">${c.meta}</div>
      </div>`).join("\n");
}

function renderSources(sources) {
  return sources.map((s) => `
      <li class="source-item">
        <span class="source-num">${s.num}</span>
        <span class="source-text">${s.text}</span>
      </li>`).join("\n");
}

// ─── MAIN ───
const sample = JSON.parse(readFileSync(SAMPLE, "utf8"));
const tpl = readFileSync(TEMPLATE, "utf8");

const quote = calculateQuote({
  complexity: sample.complexity,
  violations: sample.counts,
  industry: sample.metadata.industry || "healthcare",
});

const rebuildRow = quote.showsRebuildOption
  ? `<div class="cost-row fix"><div class="row-label">Full rebuild on accessible architecture</div><div class="row-amt">${formatRangeFull(quote.rebuild)}</div></div>`
  : "";

const replacements = {
  // Original placeholders (DO NOT remove — production builder still uses these)
  "{{BUSINESS_NAME}}":   escapeHtml(sample.metadata.businessName),
  "{{URL}}":             escapeHtml(sample.metadata.urlDisplay),
  "{{AUDIT_DATE}}":      escapeHtml(sample.metadata.auditDate),
  "{{DOSSIER_ID}}":      escapeHtml(sample.metadata.dossierId),
  "{{SCORE}}":           String(sample.score.value),
  "{{GAUGE_DASH}}":      sample.score.gaugeDash,
  "{{RISK_CLASS}}":      escapeHtml(sample.score.riskClass),
  "{{RISK_LABEL}}":      escapeHtml(sample.score.riskLabel),
  "{{TOTAL_ISSUES}}":    String(sample.counts.totalIssues),
  "{{TOTAL_INSTANCES}}": String(sample.counts.totalInstances),
  "{{CRITICAL_COUNT}}":  String(sample.counts.critical),
  "{{SERIOUS_COUNT}}":   String(sample.counts.serious),
  "{{MODERATE_COUNT}}":  String(sample.counts.moderate),
  "{{ISSUE_ROWS}}":      renderIssues(sample.issues),
  "{{SOURCES_LIST}}":    renderSources(SOURCES),
  "{{SENDER_NAME}}":     escapeHtml(sample.sender.name),
  "{{SENDER_COMPANY}}":  escapeHtml(sample.sender.company),
  "{{SENDER_EMAIL}}":    escapeHtml(sample.sender.email),

  // New placeholders for redesign
  "{{CLIENT_LOGO_HTML}}":  clientLogoHtml(sample),
  "{{AUDIT_PRICE}}":       formatRangeFull(quote.audit),
  "{{FIX_PRICE}}":         formatRangeFull(quote.fix),
  "{{REBUILD_ROW}}":       rebuildRow,
  "{{SETTLEMENT_CARDS}}":  renderSettlements(HEALTHCARE_CASES),
  "{{CTA_URL}}":           CTA_URL,
  "{{CTA_LABEL}}":         CTA_LABEL,
};

let html = tpl;
for (const [k, v] of Object.entries(replacements)) {
  html = html.split(k).join(v);
}

writeFileSync(OUT_HTML, html);
console.log(`HTML: ${OUT_HTML}`);

// Render PDF with Playwright
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle" });
await page.pdf({ path: OUT_PDF, format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(`PDF:  ${OUT_PDF}`);
console.log(`Quote: audit ${formatRangeFull(quote.audit)} | fix ${formatRangeFull(quote.fix)} | recommendation: ${quote.recommendation}`);
