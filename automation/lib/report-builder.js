/**
 * report-builder.js — Render a 1-page A4 PDF audit report from axe-core scan data
 *
 * Usage:
 *   node lib/report-builder.js \
 *     --prospect-json '<JSON string of prospect>' \
 *     --target-yaml ../targets/law-firms-la.yaml \
 *     --profile-md ../companies/auras/profile.md \
 *     --output-pdf out.pdf \
 *     --output-html out.html
 */

import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));

const IMPACT_EMOJI = { critical: '🔴', serious: '🟠', moderate: '🟡', minor: '🔵' };
const IMPACT_LABEL = { critical: 'Critical', serious: 'Serious', moderate: 'Moderate', minor: 'Minor' };

const PLAIN_ENGLISH = {
  'color-contrast': 'Text contrast too low — hard to read for visually impaired users',
  'image-alt': 'Images missing alt text — invisible to screen readers',
  'label': 'Form fields have no labels — screen readers cannot identify them',
  'link-name': 'Links have no description — screen readers say nothing useful',
  'button-name': 'Buttons have no label — cannot be identified by screen readers',
  'frame-title': 'Embedded frames have no title — content inside is invisible to screen readers',
  'heading-order': 'Heading structure broken — screen reader navigation disrupted',
  'list': 'List structure invalid — confuses screen readers',
  'tabindex': 'Custom tab order set — disrupts natural keyboard navigation',
  'aria-required-attr': 'ARIA elements missing required attributes',
  'aria-required-children': 'ARIA elements missing required child roles',
  'aria-required-parent': 'ARIA elements missing required parent context',
  'duplicate-id-aria': 'Duplicate element IDs — screen readers get confused',
  'landmark-one-main': 'No main content area defined — screen readers cannot jump to content',
  'skip-link': 'Skip navigation link broken — keyboard users stuck tabbing through menu',
  'touch-target': 'Touch targets too small — hard to tap on mobile devices',
  'link-in-text-block': 'Links rely on color alone — colorblind users cannot distinguish',
  'meta-viewport': 'Zoom disabled — users with low vision cannot enlarge page',
  'html-has-lang': 'Missing language declaration — screen reader uses wrong voice',
  'document-title': 'Page has no title',
};

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i !== -1 ? process.argv[i + 1] : fallback;
}

const prospect = JSON.parse(arg('--prospect-json'));
const targetYamlPath = arg('--target-yaml');
const profileMdPath = arg('--profile-md');
const outputPdf = arg('--output-pdf');
const outputHtml = arg('--output-html');

const target = yaml.load(readFileSync(targetYamlPath, 'utf8'));
const profileText = readFileSync(profileMdPath, 'utf8');

// Extract sender info from profile.md
const senderName = (profileText.match(/sender_name:\s*(.+)/) || [])[1]?.trim() || 'Ray Wang';
const senderEmail = (profileText.match(/sender_email:\s*(.+)/) || [])[1]?.trim() || '';
const companyName = (profileText.match(/company_name:\s*(.+)/) || [])[1]?.trim() || 'Auras';

// Load axe results
const axeData = JSON.parse(readFileSync(prospect.scan.axe_json_path, 'utf8'));
const violations = axeData.violations || [];
const counts = axeData.counts || { critical: 0, serious: 0, moderate: 0, minor: 0 };

const score = prospect.scan.score;
const risk = prospect.scan.risk;
const riskClass = risk.toLowerCase();
const riskIcon = risk === 'HIGH' ? '⚠️' : risk === 'MODERATE' ? '⚡' : '✅';
const auditDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

// Sort violations by impact severity then instance count
const impactOrder = { critical: 0, serious: 1, moderate: 2, minor: 3 };
violations.sort((a, b) => impactOrder[a.impact] - impactOrder[b.impact] || b.instances - a.instances);

// Top 5 violations
const topViolations = violations.slice(0, 5);

// Build top violation cards HTML
const topCards = topViolations.map(v => `
  <div class="card">
    <span class="card-impact impact-${v.impact}">${IMPACT_EMOJI[v.impact]} ${IMPACT_LABEL[v.impact].toUpperCase()}</span>
    <div class="card-name">${PLAIN_ENGLISH[v.id] || v.description}</div>
    <div class="card-count">${v.instances} instance${v.instances !== 1 ? 's' : ''} on this page</div>
  </div>
`).join('');

// State law context (one sentence)
const stateLine = target.risk_message_short || target.state_law_context?.split('\n')[0] || '';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Accessibility Audit — ${prospect.name}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; font-size: 11px; color: #111827; }
  .page { width: 210mm; min-height: 297mm; padding: 18mm; }

  /* Header */
  .header { background: #0a0a0a; color: #fff; padding: 18px 24px; margin: -18mm -18mm 16px; }
  .header-top { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.5); }
  h1 { font-size: 20px; font-weight: 700; line-height: 1.1; }
  .url { color: rgba(255,255,255,0.5); font-size: 10px; margin-top: 4px; }

  /* Risk banner */
  .risk { padding: 12px 24px; margin: 0 -18mm 16px; display: flex; gap: 12px; align-items: center; }
  .risk.high { background: #fef2f2; }
  .risk.moderate { background: #fffbeb; }
  .risk.low { background: #f0fdf4; }
  .risk-score { font-size: 36px; font-weight: 700; line-height: 1; }
  .risk.high .risk-score { color: #dc2626; }
  .risk.moderate .risk-score { color: #d97706; }
  .risk.low .risk-score { color: #16a34a; }
  .risk-label { font-size: 12px; font-weight: 700; text-transform: uppercase; }
  .risk-text { font-size: 10px; color: #374151; margin-top: 2px; line-height: 1.4; }

  /* Counts grid */
  .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 16px; }
  .count-card { border: 1px solid #d1d5db; border-radius: 4px; padding: 10px; text-align: center; }
  .count-card .n { font-size: 22px; font-weight: 700; line-height: 1; }
  .count-card .l { font-size: 8.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280; margin-top: 4px; }
  .count-card.c { border-color: #dc2626; } .count-card.c .n { color: #dc2626; }
  .count-card.s { border-color: #ea580c; } .count-card.s .n { color: #ea580c; }
  .count-card.m { border-color: #d97706; } .count-card.m .n { color: #d97706; }
  .count-card.mi { border-color: #2563eb; } .count-card.mi .n { color: #2563eb; }

  /* Section heading */
  .h { font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #6b7280; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid #e5e7eb; }

  /* Top issue cards */
  .top-issues { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
  .card { background: #f9fafb; padding: 8px 12px; border-radius: 4px; display: grid; grid-template-columns: 80px 1fr auto; align-items: center; gap: 10px; }
  .card-impact { font-size: 9px; font-weight: 700; letter-spacing: 0.05em; }
  .impact-critical { color: #dc2626; }
  .impact-serious { color: #ea580c; }
  .impact-moderate { color: #d97706; }
  .impact-minor { color: #2563eb; }
  .card-name { font-size: 11px; font-weight: 500; }
  .card-count { font-size: 9.5px; color: #6b7280; white-space: nowrap; }

  /* Context box */
  .context { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 4px; padding: 12px 16px; margin-bottom: 16px; }
  .context h3 { font-size: 11px; font-weight: 700; margin-bottom: 6px; }
  .context p { font-size: 10px; color: #374151; line-height: 1.5; margin-bottom: 4px; }
  .context strong { color: #111827; }

  /* Footer */
  .footer { background: #0a0a0a; color: #fff; padding: 14px 24px; margin: 0 -18mm; display: flex; justify-content: space-between; align-items: flex-start; }
  .footer h3 { font-size: 13px; font-weight: 700; margin-bottom: 3px; }
  .footer p { font-size: 9.5px; color: rgba(255,255,255,0.6); max-width: 320px; line-height: 1.4; }
  .footer-contact { text-align: right; }
  .footer-contact .n { font-size: 11px; font-weight: 600; }
  .footer-contact .e { font-size: 9.5px; color: rgba(255,255,255,0.5); }

  .disclaimer { font-size: 8.5px; color: #9ca3af; margin: 12px 0 0; }
</style>
</head>
<body>
<div class="page">

  <div class="header">
    <div class="header-top">
      <span>${companyName}</span>
      <span>Accessibility Audit — ${auditDate}</span>
    </div>
    <h1>${prospect.name}</h1>
    <div class="url">${prospect.website}</div>
  </div>

  <div class="risk ${riskClass}">
    <div class="risk-score">${score}<span style="font-size: 18px;">/100</span></div>
    <div>
      <div class="risk-label">${riskIcon} ${risk} Lawsuit Risk</div>
      <div class="risk-text">${counts.critical || 0} critical and ${counts.serious || 0} serious WCAG 2.1 AA violations detected.
      ${stateLine}</div>
    </div>
  </div>

  <div class="h">Violation Summary</div>
  <div class="grid">
    <div class="count-card c"><div class="n">${counts.critical || 0}</div><div class="l">Critical</div></div>
    <div class="count-card s"><div class="n">${counts.serious || 0}</div><div class="l">Serious</div></div>
    <div class="count-card m"><div class="n">${counts.moderate || 0}</div><div class="l">Moderate</div></div>
    <div class="count-card mi"><div class="n">${counts.minor || 0}</div><div class="l">Minor</div></div>
  </div>

  <div class="h">Top Issues</div>
  <div class="top-issues">${topCards}</div>

  <div class="context">
    <h3>Why this matters</h3>
    <p>Over <strong>5,000 ADA web accessibility lawsuits</strong> were filed in 2025. <strong>67%</strong> of defendants had revenue under $25M.</p>
    <p>${target.state_law_context?.replace(/\n/g, ' ').trim() || ''}</p>
    <p>Defense costs typically range <strong>$30,000 to $175,000</strong>, before any remediation work. Rebuilding the site to WCAG 2.1 AA standards is a fraction of that.</p>
  </div>

  <p class="disclaimer">This report is the result of an automated scan of the homepage on ${auditDate} using axe-core. Automated tools detect approximately 40 to 57 percent of WCAG issues; a full manual audit may surface additional violations. This report is for informational purposes and does not constitute legal advice.</p>

  <div class="footer">
    <div>
      <h3>Ready to address this?</h3>
      <p>I rebuild SMB websites on accessible architecture with WCAG 2.1 AA verified at delivery. Modern look, defensible posture.</p>
    </div>
    <div class="footer-contact">
      <div class="n">${senderName}</div>
      <div class="e">${companyName}</div>
      <div class="e">${senderEmail}</div>
    </div>
  </div>

</div>
</body>
</html>`;

if (outputHtml) writeFileSync(outputHtml, html);

// PDF via Playwright
const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
await page.setContent(html, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(500);
await page.pdf({ path: outputPdf, format: 'A4', printBackground: true });
await browser.close();

console.log(JSON.stringify({ pdf: outputPdf, html: outputHtml }));
