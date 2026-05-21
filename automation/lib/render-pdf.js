// render-pdf.js — Converts a JSON report (matching schema.md) to a PDF via Playwright.
// Usage: node lib/render-pdf.js <path-to-report.json>

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ─── SVG ICONS ──────────────────────────────────────────────────────────────
const ICONS = {
  contrast: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12v12z" fill="currentColor" stroke="none"/></svg>',
  form:     '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>',
  link:     '<svg viewBox="0 0 24 24"><path d="M9 17H7A5 5 0 0 1 7 7"/><path d="M15 7h2a5 5 0 0 1 4 8"/><line x1="8" y1="12" x2="12" y2="12"/><line x1="2" y1="2" x2="22" y2="22"/></svg>',
  frame:    '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
  nav:      '<svg viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="14" y2="18"/></svg>',
  warning:  '<svg viewBox="0 0 24 24"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
};

// ─── STATIC SOURCES ──────────────────────────────────────────────────────────
// TODO: future versions will load these from research files.
// These 8 citations are verified and hardcoded for now.
const SOURCES = [
  { num: 1, text: '<em>Seyfarth Shaw ADA Title III Tracker</em>, March 2026. "Federal Court Website Accessibility Lawsuit Filings Bounce Back in 2025." 3,117 federal filings verified.' },
  { num: 2, text: '<em>Alcazar v. Fashion Nova, Inc.</em>, N.D. Cal. 2025, 3:20-cv-01434. $5.15M class settlement; DOJ intervention Feb 2026. Source: justice.gov/crt/case/alcazar-v-fashion-nova-inc.' },
  { num: 3, text: '<em>Accessible.org &amp; WCAGsafe</em>, ADA settlement aggregated data. Most settlements are confidential; range derived from third-party tracking of court filings.' },
  { num: 4, text: '<em>UsableNet 2025 Midyear Digital Accessibility Lawsuit Report</em>, July 2025. 64% of defendants had revenue under $25M.' },
  { num: 5, text: '<em>National Federation of the Blind v. Target Corp.</em>, N.D. Cal. 2008. $6M class damages + $3.74M attorney fees. Source: NFB official announcement.' },
  { num: 6, text: '<em>National Association of the Deaf v. Netflix</em>, D. Mass. 2012, 3:11-cv-30168. $795K attorney fees + mandatory captioning. Consent decree.' },
  { num: 7, text: '<em>Robles v. Domino\'s Pizza, LLC</em>, 9th Cir. 17-55504. Supreme Court declined review; cornerstone ruling that ADA applies to commercial websites.' },
  { num: 8, text: '<em>CDC Disability Impacts All of Us Report</em>, 2024. 26% of U.S. adults live with a disability. Source: cdc.gov.' },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function buildIssueRows(issues) {
  return issues.map(i => `
    <div class="issue-row">
      <div class="issue-icon-lg ${i.severity}">${ICONS[i.icon]}</div>
      <div class="issue-content">
        <div class="issue-title">${i.title}</div>
        <div class="issue-desc">${i.desc}</div>
      </div>
      <div class="issue-severity-vis">
        <div class="severity-bar ${i.severity}"></div>
        <div class="severity-label ${i.severity}">${i.severity}</div>
      </div>
      <div class="issue-count-vis">
        <div class="issue-count-num">${i.count}</div>
        <div class="issue-count-label">place${i.count !== 1 ? 's' : ''}</div>
      </div>
    </div>`).join('');
}

function buildSourcesList(sources) {
  return sources.map(s => `
      <li class="source-item">
        <span class="source-num">${s.num}.</span>
        <span class="source-text">${s.text}</span>
      </li>`).join('');
}

function fillTemplate(template, report) {
  const { metadata, score, counts, issues, sender } = report;

  const placeholders = {
    BUSINESS_NAME:    metadata.businessName,
    URL:              metadata.urlDisplay || metadata.url,
    AUDIT_DATE:       metadata.auditDate,
    AUDIT_DATE_SHORT: metadata.auditDateShort,
    DOSSIER_ID:       metadata.dossierId,
    SCORE:            String(score.value),
    GAUGE_DASH:       score.gaugeDash,
    RISK_CLASS:       score.riskClass,
    RISK_LABEL:       score.riskLabel,
    TOTAL_ISSUES:     String(counts.totalIssues),
    TOTAL_INSTANCES:  String(counts.totalInstances),
    CRITICAL_COUNT:   String(counts.critical),
    SERIOUS_COUNT:    String(counts.serious),
    MODERATE_COUNT:   String(counts.moderate),
    SENDER_NAME:      sender.name,
    SENDER_COMPANY:   sender.company,
    SENDER_EMAIL:     sender.email,
    ISSUE_ROWS:       buildIssueRows(issues),
    SOURCES_LIST:     buildSourcesList(SOURCES),
  };

  let html = template;
  for (const [key, value] of Object.entries(placeholders)) {
    html = html.replaceAll(`{{${key}}}`, value);
  }
  return html;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.error('Usage: node lib/render-pdf.js <path-to-report.json>');
    process.exit(1);
  }

  const resolvedInput = path.resolve(inputPath);
  if (!fs.existsSync(resolvedInput)) {
    console.error(`Input file not found: ${resolvedInput}`);
    process.exit(1);
  }

  // Read input JSON
  const report = JSON.parse(fs.readFileSync(resolvedInput, 'utf8'));

  // Read template
  const templatePath = path.join(ROOT, 'templates', 'report.html');
  const template = fs.readFileSync(templatePath, 'utf8');

  // Fill placeholders
  const filledHtml = fillTemplate(template, report);

  // Ensure output directory exists
  const outputDir = path.join(ROOT, 'output');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  // Derive slug from businessName
  const slug = slugify(report.metadata.businessName);
  const htmlOutputPath = path.join(outputDir, `${slug}-report.html`);
  const pdfOutputPath  = path.join(outputDir, `${slug}-report.pdf`);

  // Save filled HTML
  fs.writeFileSync(htmlOutputPath, filledHtml, 'utf8');
  console.log(`HTML saved: ${htmlOutputPath}`);

  // Launch Playwright and render PDF
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the local HTML file
  const absoluteHtmlPath = path.resolve(htmlOutputPath);
  await page.goto(`file://${absoluteHtmlPath}`, { waitUntil: 'networkidle' });

  // Switch to print media (matches @media print styles)
  await page.emulateMedia({ media: 'print' });

  // Wait for Google Fonts (Geist, Geist Mono) to fully load
  await page.waitForTimeout(2000);
  await page.evaluate(() => document.fonts.ready);

  // Render to PDF with exact settings for pixel-perfect A4 output
  await page.pdf({
    path: pdfOutputPath,
    format: 'A4',
    printBackground: true,       // CRITICAL — preserves dark cost band, colored backgrounds
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: false,
  });

  await browser.close();

  // Verify the PDF was created and is reasonably sized
  if (!fs.existsSync(pdfOutputPath)) {
    console.error('PDF was NOT created — unknown error.');
    process.exit(1);
  }

  const sizeBytes = fs.statSync(pdfOutputPath).size;
  const sizeKB = (sizeBytes / 1024).toFixed(1);

  if (sizeBytes < 50 * 1024) {
    console.warn(`WARNING: PDF is only ${sizeKB} KB — may be incomplete.`);
  } else {
    console.log(`PDF created successfully: ${pdfOutputPath} (${sizeKB} KB)`);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
