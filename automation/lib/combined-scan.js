/**
 * combined-scan.js — Three-method accessibility audit combined into one report
 *
 * Usage:
 *   node lib/combined-scan.js <url> <business-name>
 *
 * Runs:
 *   1. Lighthouse via Google PageSpeed Insights API (curl)
 *   2. axe-core via Playwright headless Chromium
 *   3. Accessibility tree heuristic checks via Playwright
 *
 * Outputs JSON to output/{slug}-report.json matching schema.md
 */

import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const API_KEY = process.env.GOOGLE_PAGESPEED_API_KEY;

// ─── Severity ordering ────────────────────────────────────────────────────────
const SEVERITY_ORDER = { critical: 0, serious: 1, moderate: 2, minor: 3 };

// ─── Rule ID → canonical category mapping ─────────────────────────────────────
// Each entry: { title, desc, icon, severity }
// severity is a fallback; axe-core's own impact field takes precedence
const RULE_MAP = {
  // Contrast
  'color-contrast':           { title: 'Your text is too hard to read',          desc: 'Text and background colors do not have enough contrast for people with low vision.',                       icon: 'contrast', severity: 'serious'  },
  'color-contrast-enhanced':  { title: 'Your text is too hard to read',          desc: 'Text and background colors do not have enough contrast for people with low vision.',                       icon: 'contrast', severity: 'serious'  },

  // Forms
  'label':                    { title: 'Your forms confuse blind visitors',       desc: 'Form fields are missing labels, so screen readers cannot tell users what to type.',                       icon: 'form',     severity: 'critical' },
  'label-content-name-mismatch': { title: 'Your forms confuse blind visitors',   desc: 'Form field visible label does not match its accessible name, causing confusion for screen reader users.', icon: 'form',     severity: 'serious'  },
  'form-field-multiple-labels': { title: 'Form fields are confusing screen readers', desc: 'Multiple labels are attached to the same form field, sending mixed signals to assistive technology.', icon: 'form',   severity: 'moderate' },
  'select-name':              { title: 'Your forms confuse blind visitors',       desc: 'Dropdown menus are missing labels, making them impossible to identify with a screen reader.',             icon: 'form',     severity: 'critical' },
  'input-button-name':        { title: 'Your forms confuse blind visitors',       desc: 'Input buttons have no accessible name.',                                                                   icon: 'form',     severity: 'critical' },
  'button-name':              { title: 'Your forms confuse blind visitors',       desc: 'Buttons have no label, so screen readers cannot tell users what the button does.',                        icon: 'form',     severity: 'critical' },

  // Links
  'link-name':                { title: 'Mystery links with no name',              desc: 'Links have no descriptive text, so screen readers just say "link" with no context.',                      icon: 'warning',  severity: 'serious'  },
  'link-in-text-block':       { title: 'Links blend into text',                  desc: 'Links inside paragraphs are only distinguished by color, which is invisible to colorblind users.',        icon: 'link',     severity: 'serious'  },

  // Frames / iframes
  'frame-title':              { title: 'Maps and widgets are invisible',          desc: 'Embedded maps or widgets have no title, so screen readers skip them entirely.',                           icon: 'frame',    severity: 'serious'  },
  'frame-focusable-content':  { title: 'Maps and widgets are invisible',          desc: 'Hidden frames contain focusable content, confusing keyboard navigation.',                                 icon: 'frame',    severity: 'serious'  },

  // Navigation / skip links
  'bypass':                   { title: 'No way to skip navigation',               desc: 'There is no way to skip past the menu, forcing keyboard users to tab through every link on every page.',  icon: 'nav',      severity: 'moderate' },
  'skip-link':                { title: 'No way to skip navigation',               desc: 'The skip navigation link does not work correctly.',                                                        icon: 'nav',      severity: 'moderate' },
  'landmark-one-main':        { title: 'Navigation is broken',                    desc: 'The page has no main content landmark, so screen reader users cannot jump directly to the content.',      icon: 'nav',      severity: 'moderate' },
  'region':                   { title: 'Navigation is broken',                    desc: 'Page content is not contained in any landmark region, making navigation harder for screen reader users.', icon: 'nav',      severity: 'moderate' },

  // Headings
  'heading-order':            { title: 'Heading structure is broken',             desc: 'Headings skip levels (e.g. H1 jumps to H3), disrupting how screen readers navigate the page.',           icon: 'warning',  severity: 'moderate' },
  'page-has-heading-one':     { title: 'Heading structure is broken',             desc: 'The page has no H1 heading, which is the main signpost for screen reader navigation.',                    icon: 'warning',  severity: 'moderate' },

  // Document
  'document-title':           { title: 'Page has no title',                       desc: 'The browser tab and screen reader cannot identify this page because it has no title.',                    icon: 'warning',  severity: 'serious'  },
  'html-has-lang':            { title: 'Language not declared',                   desc: 'The page does not declare a language, so screen readers may read content in the wrong voice.',            icon: 'warning',  severity: 'serious'  },
  'html-lang-valid':          { title: 'Language not declared',                   desc: 'The page language code is invalid.',                                                                       icon: 'warning',  severity: 'serious'  },
  'valid-lang':               { title: 'Language not declared',                   desc: 'A language attribute on the page uses an invalid code.',                                                   icon: 'warning',  severity: 'moderate' },
  'meta-viewport':            { title: 'Keyboard navigation is broken',           desc: 'The page disables zoom, preventing users with low vision from enlarging text.',                           icon: 'nav',      severity: 'critical' },

  // Images
  'image-alt':                { title: 'Images missing descriptions',             desc: 'Images have no alt text, making them invisible to screen readers and users who cannot see them.',         icon: 'warning',  severity: 'critical' },
  'image-redundant-alt':      { title: 'Images missing descriptions',             desc: 'Image alt text repeats nearby text, which is redundant for screen reader users.',                        icon: 'warning',  severity: 'minor'    },
  'role-img-alt':             { title: 'Images missing descriptions',             desc: 'Elements acting as images have no alternative text.',                                                     icon: 'warning',  severity: 'serious'  },
  'svg-img-alt':              { title: 'Images missing descriptions',             desc: 'SVG images have no alternative text.',                                                                     icon: 'warning',  severity: 'serious'  },

  // ARIA / keyboard
  'aria-required-attr':       { title: 'Screen reader markup is broken',          desc: 'ARIA elements are missing required attributes, causing screen readers to malfunction.',                   icon: 'warning',  severity: 'critical' },
  'aria-required-children':   { title: 'Screen reader markup is broken',          desc: 'ARIA parent elements are missing required child elements.',                                               icon: 'warning',  severity: 'critical' },
  'aria-required-parent':     { title: 'Screen reader markup is broken',          desc: 'ARIA child elements are not inside the required parent.',                                                 icon: 'warning',  severity: 'critical' },
  'aria-roles':               { title: 'Screen reader markup is broken',          desc: 'Invalid ARIA roles are used, sending wrong instructions to assistive technology.',                        icon: 'warning',  severity: 'critical' },
  'aria-valid-attr':          { title: 'Screen reader markup is broken',          desc: 'ARIA attributes are not valid, breaking screen reader behavior.',                                         icon: 'warning',  severity: 'critical' },
  'aria-valid-attr-value':    { title: 'Screen reader markup is broken',          desc: 'ARIA attribute values are invalid, causing assistive technology to malfunction.',                         icon: 'warning',  severity: 'critical' },
  'aria-allowed-attr':        { title: 'Screen reader markup is broken',          desc: 'ARIA attributes are used on elements that do not support them.',                                          icon: 'warning',  severity: 'serious'  },
  'aria-hidden-body':         { title: 'Screen reader markup is broken',          desc: 'The page body is hidden from assistive technology, making the entire page inaccessible.',                 icon: 'warning',  severity: 'critical' },
  'aria-hidden-focus':        { title: 'Screen reader markup is broken',          desc: 'Focusable elements are hidden from screen readers, causing confusion.',                                   icon: 'warning',  severity: 'serious'  },
  'aria-command-name':        { title: 'Screen reader markup is broken',          desc: 'ARIA buttons or links have no accessible name.',                                                          icon: 'warning',  severity: 'serious'  },
  'aria-input-field-name':    { title: 'Screen reader markup is broken',          desc: 'ARIA input fields have no accessible name.',                                                              icon: 'warning',  severity: 'serious'  },
  'aria-meter-name':          { title: 'Screen reader markup is broken',          desc: 'ARIA meter elements have no accessible name.',                                                            icon: 'warning',  severity: 'serious'  },
  'aria-progressbar-name':    { title: 'Screen reader markup is broken',          desc: 'ARIA progress bars have no accessible name.',                                                             icon: 'warning',  severity: 'serious'  },
  'aria-toggle-field-name':   { title: 'Screen reader markup is broken',          desc: 'ARIA toggle fields have no accessible name.',                                                             icon: 'warning',  severity: 'serious'  },
  'aria-tooltip-name':        { title: 'Screen reader markup is broken',          desc: 'ARIA tooltips have no accessible name.',                                                                  icon: 'warning',  severity: 'serious'  },
  'aria-treeitem-name':       { title: 'Screen reader markup is broken',          desc: 'ARIA tree items have no accessible name.',                                                                icon: 'warning',  severity: 'serious'  },
  'tabindex':                 { title: 'Keyboard navigation is broken',           desc: 'Custom tab order is set, disrupting natural keyboard navigation.',                                        icon: 'nav',      severity: 'serious'  },
  'scrollable-region-focusable': { title: 'Keyboard navigation is broken',        desc: 'Scrollable areas cannot be reached by keyboard.',                                                         icon: 'nav',      severity: 'serious'  },
  'focus-order-semantics':    { title: 'Keyboard navigation is broken',           desc: 'The focus order does not match the visual layout, confusing keyboard users.',                             icon: 'nav',      severity: 'moderate' },

  // Tables / lists
  'table-duplicate-name':     { title: 'Screen reader markup is broken',          desc: 'Tables have duplicate names, confusing screen reader navigation.',                                        icon: 'warning',  severity: 'minor'    },
  'table-fake-caption':       { title: 'Screen reader markup is broken',          desc: 'Table captions are marked up incorrectly.',                                                               icon: 'warning',  severity: 'moderate' },
  'td-headers-attr':          { title: 'Screen reader markup is broken',          desc: 'Table cells reference header IDs that do not exist.',                                                     icon: 'warning',  severity: 'critical' },
  'th-has-data-cells':        { title: 'Screen reader markup is broken',          desc: 'Table headers have no data cells, making the table structure meaningless.',                               icon: 'warning',  severity: 'serious'  },
  'list':                     { title: 'Screen reader markup is broken',          desc: 'List structure is incorrect, confusing screen readers.',                                                  icon: 'warning',  severity: 'moderate' },
  'listitem':                 { title: 'Screen reader markup is broken',          desc: 'List items are used outside a list element.',                                                             icon: 'warning',  severity: 'moderate' },
  'definition-list':          { title: 'Screen reader markup is broken',          desc: 'Definition list structure is incorrect.',                                                                 icon: 'warning',  severity: 'moderate' },
  'dlitem':                   { title: 'Screen reader markup is broken',          desc: 'Definition list items are used outside a definition list.',                                               icon: 'warning',  severity: 'moderate' },

  // IDs
  'duplicate-id':             { title: 'Screen reader markup is broken',          desc: 'Duplicate element IDs exist, which can confuse assistive technology.',                                   icon: 'warning',  severity: 'minor'    },
  'duplicate-id-active':      { title: 'Screen reader markup is broken',          desc: 'Duplicate IDs exist on active elements, causing screen readers to link to the wrong element.',           icon: 'warning',  severity: 'serious'  },
  'duplicate-id-aria':        { title: 'Screen reader markup is broken',          desc: 'Duplicate IDs are referenced in ARIA attributes, sending screen readers to the wrong element.',          icon: 'warning',  severity: 'critical' },

  // Heuristic checks (our custom)
  'empty-href-links':         { title: 'Navigation is broken',                    desc: 'Links in the navigation use "#" as their destination, which goes nowhere and confuses screen readers.',   icon: 'nav',      severity: 'moderate' },
  'duplicate-headings':       { title: 'Heading structure is broken',             desc: 'Multiple identical headings appear side-by-side, making it impossible for screen readers to distinguish them.', icon: 'warning', severity: 'minor' },
  'iframe-no-title':          { title: 'Maps and widgets are invisible',          desc: 'Embedded iframes have no title attribute, so their contents are completely hidden from screen readers.', icon: 'frame',    severity: 'serious'  },
  'placeholder-alt':          { title: 'Images missing descriptions',             desc: 'Image alt text is a filename or placeholder word, which tells screen reader users nothing meaningful.',  icon: 'warning',  severity: 'moderate' },
};

// ─── Lighthouse weight → severity ────────────────────────────────────────────
function lighthouseWeightToSeverity(weight) {
  if (weight >= 7) return 'critical';
  if (weight >= 4) return 'serious';
  if (weight >= 2) return 'moderate';
  return 'minor';
}

// ─── Canonical key for deduplication ─────────────────────────────────────────
// Maps rule IDs to a single canonical grouping key (the title)
function getCanonicalKey(ruleId) {
  const mapping = RULE_MAP[ruleId];
  if (mapping) return mapping.title;
  // Fallback grouping by prefix
  if (ruleId.startsWith('aria-')) return 'Screen reader markup is broken';
  if (ruleId.startsWith('color-contrast')) return 'Your text is too hard to read';
  if (ruleId.startsWith('label') || ruleId.includes('field')) return 'Your forms confuse blind visitors';
  if (ruleId.startsWith('image-') || ruleId.includes('alt')) return 'Images missing descriptions';
  if (ruleId.startsWith('frame-') || ruleId.startsWith('iframe')) return 'Maps and widgets are invisible';
  if (ruleId.startsWith('link')) return 'Mystery links with no name';
  return ruleId; // no match — use raw id as key
}

function getRuleInfo(ruleId, fallbackTitle = null) {
  if (RULE_MAP[ruleId]) return RULE_MAP[ruleId];
  // Build a fallback entry
  const key = getCanonicalKey(ruleId);
  // Check if another rule maps to the same canonical title
  for (const [, v] of Object.entries(RULE_MAP)) {
    if (v.title === key) return v;
  }
  return {
    title: fallbackTitle || ruleId,
    desc: 'An accessibility issue was detected on this page.',
    icon: 'warning',
    severity: 'moderate',
  };
}

// ─── Slugify ──────────────────────────────────────────────────────────────────
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);
}

// ─── Dossier ID ───────────────────────────────────────────────────────────────
function makeDossierId() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const nnn = String(Math.floor(Math.random() * 900) + 100); // 100–999
  return `JR-${yyyy}-${mm}${dd}-${nnn}`;
}

// ─── Format audit date ────────────────────────────────────────────────────────
function formatAuditDate(d) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const monthsShort = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  return {
    auditDate: `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`,
    auditDateShort: `${d.getDate()} ${monthsShort[d.getMonth()]} ${d.getFullYear()}`,
  };
}

// ─── Gauge dash ───────────────────────────────────────────────────────────────
function computeGaugeDash(score) {
  const circumference = 2 * Math.PI * 120;
  const arc = (score / 100) * circumference;
  return `${arc.toFixed(2)} ${circumference.toFixed(2)}`;
}

// ─── Risk class ───────────────────────────────────────────────────────────────
function getRiskClass(score) {
  if (score >= 90) return { riskClass: 'low',      riskLabel: 'Low'      };
  if (score >= 80) return { riskClass: 'moderate',  riskLabel: 'Moderate' };
  return               { riskClass: 'high',     riskLabel: 'High'     };
}

// ══════════════════════════════════════════════════════════════════════════════
// STEP 1 — Lighthouse via PageSpeed API
// ══════════════════════════════════════════════════════════════════════════════
function runLighthouse(url) {
  if (!API_KEY) {
    console.error('  Warning: GOOGLE_PAGESPEED_API_KEY not set — skipping Lighthouse');
    return null;
  }

  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed` +
    `?url=${encodeURIComponent(url)}` +
    `&category=ACCESSIBILITY` +
    `&strategy=DESKTOP` +
    `&key=${API_KEY}`;

  try {
    const raw = execSync(`curl -s "${apiUrl}"`, { timeout: 60000 }).toString();
    const data = JSON.parse(raw);
    if (data.error) throw new Error(data.error.message);

    const lhr = data.lighthouseResult;
    const score = Math.round((lhr.categories.accessibility.score || 0) * 100);
    const audits = lhr.audits;
    const a11yRefs = lhr.categories.accessibility.auditRefs || [];

    // Collect failing audits with their weights
    const findings = [];
    for (const ref of a11yRefs) {
      const audit = audits[ref.id];
      if (!audit) continue;
      if (['notApplicable', 'manual', 'informative'].includes(audit.scoreDisplayMode)) continue;
      if (audit.score !== null && audit.score < 1) {
        const instanceCount = audit.details?.items?.length || 1;
        findings.push({
          source: 'lighthouse',
          ruleId: ref.id,
          weight: ref.weight || 1,
          severity: lighthouseWeightToSeverity(ref.weight || 1),
          instances: instanceCount,
          rawTitle: audit.title,
        });
      }
    }

    return { score, findings };
  } catch (err) {
    console.error(`  Lighthouse failed: ${err.message}`);
    return null;
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// STEP 2 — axe-core via Playwright
// ══════════════════════════════════════════════════════════════════════════════
async function runAxeCore(url, page) {
  try {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    const findings = results.violations.map(v => ({
      source: 'axe',
      ruleId: v.id,
      severity: v.impact, // axe impact: critical/serious/moderate/minor
      instances: v.nodes.length,
      rawTitle: v.description,
    }));

    return { findings };
  } catch (err) {
    console.error(`  axe-core failed: ${err.message}`);
    return null;
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// STEP 3 — Heuristic accessibility tree checks
// ══════════════════════════════════════════════════════════════════════════════
async function runHeuristicChecks(page) {
  const findings = [];

  try {
    // 1. Empty href="#" links in nav elements
    const emptyNavLinks = await page.evaluate(() => {
      const navEls = Array.from(document.querySelectorAll('nav, [role="navigation"], header'));
      let count = 0;
      for (const nav of navEls) {
        const links = nav.querySelectorAll('a[href="#"], a[href="javascript:void(0)"], a[href="javascript:;"]');
        count += links.length;
      }
      return count;
    });
    if (emptyNavLinks > 0) {
      findings.push({
        source: 'heuristic',
        ruleId: 'empty-href-links',
        severity: 'moderate',
        instances: emptyNavLinks,
        rawTitle: 'Navigation links with empty href',
      });
    }

    // 2. Duplicate sibling headings with identical text
    const dupHeadings = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6'));
      const seen = {};
      let dupCount = 0;
      for (const h of headings) {
        const text = (h.textContent || '').trim().toLowerCase();
        if (!text) continue;
        // Check if parent has other sibling headings with same text
        const siblings = Array.from(h.parentElement?.querySelectorAll(h.tagName) || []);
        const sameText = siblings.filter(s => (s.textContent || '').trim().toLowerCase() === text);
        if (sameText.length > 1 && !seen[text]) {
          seen[text] = true;
          dupCount++;
        }
      }
      return dupCount;
    });
    if (dupHeadings > 0) {
      findings.push({
        source: 'heuristic',
        ruleId: 'duplicate-headings',
        severity: 'minor',
        instances: dupHeadings,
        rawTitle: 'Duplicate sibling headings with identical text',
      });
    }

    // 3. iframes without accessible name or title
    const untitledIframes = await page.evaluate(() => {
      const iframes = Array.from(document.querySelectorAll('iframe'));
      return iframes.filter(f => !f.title && !f.getAttribute('aria-label') && !f.getAttribute('aria-labelledby')).length;
    });
    if (untitledIframes > 0) {
      findings.push({
        source: 'heuristic',
        ruleId: 'iframe-no-title',
        severity: 'serious',
        instances: untitledIframes,
        rawTitle: 'iframes without title',
      });
    }

    // 4. Images with placeholder alt text
    const badAlt = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img[alt]'));
      const placeholderPatterns = [/^image$/i, /^photo$/i, /^img$/i, /^picture$/i, /^graphic$/i, /\.(jpg|jpeg|png|gif|webp|svg)$/i];
      let count = 0;
      for (const img of imgs) {
        const alt = (img.getAttribute('alt') || '').trim();
        if (alt.length === 0) continue; // missing alt is caught by axe
        if (alt.length < 4) { count++; continue; }
        if (placeholderPatterns.some(re => re.test(alt))) { count++; }
      }
      return count;
    });
    if (badAlt > 0) {
      findings.push({
        source: 'heuristic',
        ruleId: 'placeholder-alt',
        severity: 'moderate',
        instances: badAlt,
        rawTitle: 'Images with placeholder alt text',
      });
    }

  } catch (err) {
    console.error(`  Heuristic check failed: ${err.message}`);
  }

  return { findings };
}

// ══════════════════════════════════════════════════════════════════════════════
// MERGE & DEDUPE
// ══════════════════════════════════════════════════════════════════════════════
function mergeFindings(lighthouseResult, axeResult, heuristicResult) {
  // Collect all raw findings
  const all = [];
  if (lighthouseResult?.findings) all.push(...lighthouseResult.findings);
  if (axeResult?.findings) all.push(...axeResult.findings);
  if (heuristicResult?.findings) all.push(...heuristicResult.findings);

  // Group by canonical title (deduplication key)
  const groups = new Map();

  for (const f of all) {
    const info = getRuleInfo(f.ruleId, f.rawTitle);
    const key = info.title;

    if (!groups.has(key)) {
      groups.set(key, {
        title: info.title,
        desc: info.desc,
        icon: info.icon,
        severity: f.severity || info.severity, // axe severity takes priority
        instances: 0,
        sources: new Set(),
      });
    }
    const g = groups.get(key);
    // Upgrade severity if a source reports it higher
    const existing = SEVERITY_ORDER[g.severity] ?? 99;
    const incoming = SEVERITY_ORDER[f.severity || info.severity] ?? 99;
    if (incoming < existing) g.severity = f.severity || info.severity;
    // Sum instances — but only add from each source once per rule
    const sourceKey = `${f.source}:${f.ruleId}`;
    if (!g.sources.has(sourceKey)) {
      g.sources.add(sourceKey);
      g.instances += f.instances || 1;
    }
  }

  // Convert to array and sort
  let issues = Array.from(groups.values()).map(g => ({
    icon: g.icon,
    severity: g.severity,
    title: g.title,
    desc: g.desc,
    count: g.instances,
  }));

  // Sort: severity asc (critical first), then count desc
  issues.sort((a, b) => {
    const so = (SEVERITY_ORDER[a.severity] ?? 99) - (SEVERITY_ORDER[b.severity] ?? 99);
    if (so !== 0) return so;
    return b.count - a.count;
  });

  // Cap at 6
  issues = issues.slice(0, 6);

  return issues;
}

// ══════════════════════════════════════════════════════════════════════════════
// BUILD COUNTS
// ══════════════════════════════════════════════════════════════════════════════
function buildCounts(issues) {
  const counts = { critical: 0, serious: 0, moderate: 0, minor: 0 };
  let totalInstances = 0;
  for (const issue of issues) {
    counts[issue.severity] = (counts[issue.severity] || 0) + 1;
    totalInstances += issue.count;
  }
  counts.totalIssues = counts.critical + counts.serious + counts.moderate + counts.minor;
  counts.totalInstances = totalInstances;
  return counts;
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════════════════════
async function main() {
  const url = process.argv[2];
  const businessName = process.argv[3];

  if (!url || !businessName) {
    console.log('\nUsage: node lib/combined-scan.js <url> <business-name>');
    console.log('Example: node lib/combined-scan.js https://mylawcompany.com "M&Y Personal Injury Lawyers"\n');
    process.exit(0);
  }

  const urlObj = new URL(url);
  const now = new Date();
  const { auditDate, auditDateShort } = formatAuditDate(now);

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  Combined Accessibility Audit`);
  console.log(`  ${businessName}`);
  console.log(`  ${url}`);
  console.log(`${'═'.repeat(60)}\n`);

  // ── Step 1: Lighthouse ──────────────────────────────────────────────────
  console.log('Running Lighthouse...');
  let lighthouseResult = null;
  try {
    lighthouseResult = runLighthouse(url);
    if (lighthouseResult) {
      console.log(`  Score: ${lighthouseResult.score}/100, ${lighthouseResult.findings.length} failing audits`);
    } else {
      console.log('  Lighthouse returned no result — continuing');
    }
  } catch (err) {
    console.error(`  Lighthouse error: ${err.message}`);
  }

  // ── Steps 2 & 3 share a browser ────────────────────────────────────────
  let axeResult = null;
  let heuristicResult = null;
  let browser = null;

  try {
    browser = await chromium.launch({ args: ['--no-sandbox'] });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000); // let JS render

    // ── Step 2: axe-core ─────────────────────────────────────────────────
    console.log('Running axe-core...');
    try {
      axeResult = await runAxeCore(url, page);
      if (axeResult) {
        console.log(`  ${axeResult.findings.length} violation types found`);
      }
    } catch (err) {
      console.error(`  axe-core error: ${err.message}`);
    }

    // ── Step 3: Heuristic checks ─────────────────────────────────────────
    console.log('Analyzing accessibility tree...');
    try {
      heuristicResult = await runHeuristicChecks(page);
      if (heuristicResult) {
        console.log(`  ${heuristicResult.findings.length} heuristic issue(s) found`);
      }
    } catch (err) {
      console.error(`  Heuristic check error: ${err.message}`);
    }

  } catch (err) {
    console.error(`  Browser error: ${err.message}`);
  } finally {
    if (browser) {
      try { await browser.close(); } catch (_) {}
    }
  }

  // ── Fail if all scans failed ──────────────────────────────────────────
  if (!lighthouseResult && !axeResult && !heuristicResult) {
    console.error('\nAll scans failed. Cannot produce report.');
    process.exit(1);
  }

  // ── Merge ────────────────────────────────────────────────────────────
  const issues = mergeFindings(lighthouseResult, axeResult, heuristicResult);
  const counts = buildCounts(issues);

  // Use Lighthouse score if available; otherwise default 0
  const score = lighthouseResult?.score ?? 0;
  const { riskClass, riskLabel } = getRiskClass(score);

  // ── Build report JSON ─────────────────────────────────────────────────
  const report = {
    metadata: {
      businessName,
      url,
      urlDisplay: urlObj.hostname,
      auditDate,
      auditDateShort,
      dossierId: makeDossierId(),
      scannedAt: now.toISOString(),
    },
    score: {
      value: score,
      gaugeDash: computeGaugeDash(score),
      riskClass,
      riskLabel,
    },
    counts,
    issues,
    sender: {
      name: 'Ray Wang',
      company: 'Juris',
      email: 'ray@juris.audit',
    },
  };

  // ── Write JSON ────────────────────────────────────────────────────────
  const slug = slugify(businessName);
  const outDir = join(ROOT, 'output');
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, `${slug}-report.json`);
  const jsonStr = JSON.stringify(report, null, 2);
  writeFileSync(outPath, jsonStr);

  // ── Validate JSON round-trip ──────────────────────────────────────────
  JSON.parse(readFileSync(outPath, 'utf8')); // throws if invalid

  // ── Summary ───────────────────────────────────────────────────────────
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`  Score:         ${score}/100`);
  console.log(`  Risk:          ${riskLabel.toUpperCase()}`);
  console.log(`  Issues found:  ${counts.totalIssues} types (${counts.totalInstances} total instances)`);
  console.log(`    Critical: ${counts.critical}  Serious: ${counts.serious}  Moderate: ${counts.moderate}  Minor: ${counts.minor}`);
  console.log(`${'─'.repeat(60)}`);
  console.log(`\n  Top issues:`);
  for (const issue of issues) {
    console.log(`    [${issue.severity.toUpperCase()}] ${issue.title} (${issue.count} instance${issue.count !== 1 ? 's' : ''})`);
  }
  console.log(`\n  Report saved to: ${outPath}\n`);

  return report;
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
