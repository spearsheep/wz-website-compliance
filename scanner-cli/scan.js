/**
 * scan.js — Quick accessibility scan via Google PageSpeed Insights API
 *
 * Usage:
 *   node src/scan.js https://example.com
 *   node src/scan.js https://example.com "Business Name"
 *
 * No browser needed. Returns score + violations in ~5 seconds.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const API_KEY = process.env.GOOGLE_PAGESPEED_API_KEY;

// Human-readable labels for each failing audit
const AUDIT_LABELS = {
  'color-contrast':              'Text contrast too low — hard to read for visually impaired users',
  'image-alt':                   'Images missing alt text — invisible to screen readers',
  'label':                       'Form fields have no labels — screen readers cannot identify them',
  'link-name':                   'Links have no description — screen readers say nothing useful',
  'button-name':                 'Buttons have no label — cannot be identified by screen readers',
  'bypass':                      'No skip navigation — keyboard users must tab through entire menu every page',
  'document-title':              'Page has no title — screen readers and search engines cannot identify it',
  'html-has-lang':               'Missing language setting — screen readers use wrong language voice',
  'frame-title':                 'Embedded frames have no title — content inside is invisible to screen readers',
  'heading-order':               'Heading structure broken — screen reader navigation is disrupted',
  'list':                        'List structure incorrect — confuses screen readers',
  'listitem':                    'List items used outside a list — invalid structure',
  'tabindex':                    'Custom tab order set — disrupts natural keyboard navigation',
  'aria-required-attr':          'ARIA elements missing required attributes — screen readers malfunction',
  'aria-roles':                  'Invalid ARIA roles — screen reader instructions are wrong',
  'aria-valid-attr-value':       'ARIA attribute values invalid — assistive technology breaks',
  'duplicate-id-aria':           'Duplicate element IDs — screen readers get confused',
  'focus-traps':                 'Keyboard focus gets trapped — users cannot navigate freely',
  'interactive-element-affordance': 'Interactive elements not recognizable — keyboard users cannot find them',
  'landmark-one-main':           'No main content area defined — screen readers cannot jump to content',
  'logical-tab-order':           'Tab order does not follow visual layout — confusing for keyboard users',
  'managed-focus':               'Focus not managed after dynamic changes — screen reader loses context',
  'skip-link':                   'Skip link does not work — keyboard users stuck tabbing through navigation',
  'use-landmarks':               'No page landmarks — screen reader users cannot navigate sections',
  'valid-lang':                  'Invalid language code — screen readers use wrong voice',
  'touch-target':                'Touch targets too small — hard to tap on mobile devices',
  'accesskeys':                  'Access keys conflict — keyboard shortcuts break',
  'meta-viewport':               'Zoom disabled — users with low vision cannot enlarge page',
};

const RISK_THRESHOLDS = {
  HIGH:     { max: 79,  label: 'HIGH',     emoji: '🔴', message: 'Multiple critical violations — significant lawsuit exposure' },
  MODERATE: { max: 89,  label: 'MODERATE', emoji: '🟡', message: 'Several accessibility failures — real legal risk' },
  LOW:      { max: 100, label: 'LOW',      emoji: '🟢', message: 'Minor issues — lower risk but not fully compliant' },
};

function getRisk(score) {
  if (score <= 79) return RISK_THRESHOLDS.HIGH;
  if (score <= 89) return RISK_THRESHOLDS.MODERATE;
  return RISK_THRESHOLDS.LOW;
}

async function scanUrl(url, businessName = null) {
  if (!API_KEY) {
    console.error('\nError: GOOGLE_PAGESPEED_API_KEY not set in .env\n');
    process.exit(1);
  }

  const name = businessName || new URL(url).hostname;
  console.log(`\nScanning: ${name} (${url})`);

  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed` +
    `?url=${encodeURIComponent(url)}` +
    `&category=ACCESSIBILITY` +
    `&strategy=DESKTOP` +
    `&key=${API_KEY}`;

  let data;
  try {
    const raw = execSync(`curl -s "${apiUrl}"`, { timeout: 60000 }).toString();
    data = JSON.parse(raw);
    if (data.error) throw new Error(data.error.message);
  } catch (err) {
    console.error(`  Failed: ${err.message}`);
    return null;
  }

  const lhr = data.lighthouseResult;
  const score = Math.round((lhr.categories.accessibility.score || 0) * 100);
  const audits = lhr.audits;
  const risk = getRisk(score);

  // Collect failures
  const failures = [];
  const a11yRefs = lhr.categories.accessibility.auditRefs || [];
  for (const ref of a11yRefs) {
    const audit = audits[ref.id];
    if (!audit) continue;
    if (['notApplicable', 'manual', 'informative'].includes(audit.scoreDisplayMode)) continue;
    if (audit.score !== null && audit.score < 1) {
      failures.push({
        id: ref.id,
        label: AUDIT_LABELS[ref.id] || audit.title,
        score: audit.score,
        impact: ref.weight > 5 ? 'High Impact' : ref.weight > 2 ? 'Medium Impact' : 'Low Impact',
      });
    }
  }

  // Sort by impact weight (high first)
  failures.sort((a, b) => {
    const order = { 'High Impact': 0, 'Medium Impact': 1, 'Low Impact': 2 };
    return order[a.impact] - order[b.impact];
  });

  const result = {
    name,
    url,
    score,
    risk: risk.label,
    riskMessage: risk.message,
    failures,
    failureCount: failures.length,
    scannedAt: new Date().toISOString(),
    coverage: 'Automated scan detects ~30-40% of WCAG 2.1 AA issues. Real violations likely 2-3x higher.',
  };

  // Print to console
  printResult(result, risk);

  // Save JSON
  const slug = slugify(name);
  const outDir = join(ROOT, 'output');
  mkdirSync(outDir, { recursive: true });
  const jsonPath = join(outDir, `${slug}-scan.json`);
  writeFileSync(jsonPath, JSON.stringify(result, null, 2));

  return result;
}

function printResult(result, risk) {
  const line = '─'.repeat(55);
  console.log(`\n${line}`);
  console.log(`  ${result.name}`);
  console.log(`  ${result.url}`);
  console.log(line);
  console.log(`  Accessibility Score:  ${result.score}/100`);
  console.log(`  Lawsuit Risk:         ${risk.emoji} ${result.risk}`);
  console.log(`  Violations Found:     ${result.failureCount}`);
  console.log(`  Risk Context:         ${result.riskMessage}`);
  console.log(line);

  if (result.failures.length > 0) {
    console.log('\n  What\'s wrong (plain English):\n');
    result.failures.forEach((f, i) => {
      const marker = f.impact === 'High Impact' ? '  🔴' : f.impact === 'Medium Impact' ? '  🟡' : '  🔵';
      console.log(`${marker} ${f.label}`);
    });
  }
  console.log('');
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);
}

// Run from CLI
const url = process.argv[2];
const name = process.argv[3];
if (!url) {
  console.log('\nUsage: node src/scan.js <url> [business-name]');
  console.log('Example: node src/scan.js https://smithlaw.com "Smith Law Firm"\n');
  process.exit(0);
}

scanUrl(url, name);
export { scanUrl };
