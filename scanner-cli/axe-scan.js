/**
 * axe-scan.js — Deep accessibility scan using axe-core + Playwright
 * Catches 40-57% of WCAG 2.1 AA issues (vs 30-40% for PageSpeed quick scan)
 *
 * Usage:
 *   node src/axe-scan.js https://example.com "Business Name"
 */

import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const IMPACT_EMOJI = { critical: '🔴', serious: '🟠', moderate: '🟡', minor: '🔵' };

async function axeScan(url, businessName = null) {
  const name = businessName || new URL(url).hostname;
  const startTime = Date.now();
  console.log(`\nDeep scanning: ${name} (${url})`);
  console.log('Starting browser...');

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000); // let JS render

    console.log('Running axe-core analysis...');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    await browser.close();
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    const violations = results.violations;
    const passes = results.passes.length;
    const incomplete = results.incomplete.length;

    // Count by impact
    const counts = { critical: 0, serious: 0, moderate: 0, minor: 0 };
    let totalInstances = 0;
    for (const v of violations) {
      counts[v.impact] = (counts[v.impact] || 0) + 1;
      totalInstances += v.nodes.length;
    }

    const line = '─'.repeat(55);
    console.log(`\n${line}`);
    console.log(`  ${name}`);
    console.log(`  ${url}`);
    console.log(line);
    console.log(`  Scan time:            ${elapsed}s`);
    console.log(`  Violation types:      ${violations.length}`);
    console.log(`  Total instances:      ${totalInstances} (across whole page)`);
    console.log(`  🔴 Critical:          ${counts.critical}`);
    console.log(`  🟠 Serious:           ${counts.serious}`);
    console.log(`  🟡 Moderate:          ${counts.moderate}`);
    console.log(`  🔵 Minor:             ${counts.minor}`);
    console.log(`  ✅ Passing checks:    ${passes}`);
    console.log(`  ⚠️  Needs review:      ${incomplete}`);
    console.log(line);

    if (violations.length > 0) {
      console.log('\n  All violations found:\n');
      for (const v of violations) {
        const e = IMPACT_EMOJI[v.impact] || '⚪';
        console.log(`  ${e} [${v.impact.toUpperCase()}] ${v.description}`);
        console.log(`     ${v.nodes.length} instance${v.nodes.length !== 1 ? 's' : ''} on this page`);
      }
    }
    console.log('');

    // Save output
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);
    const outDir = join(ROOT, 'output');
    mkdirSync(outDir, { recursive: true });
    const outPath = join(outDir, `${slug}-axe.json`);
    writeFileSync(outPath, JSON.stringify({
      name, url, elapsed: `${elapsed}s`,
      violationTypes: violations.length,
      totalInstances, counts, passes, incomplete,
      violations: violations.map(v => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        instances: v.nodes.length,
        helpUrl: v.helpUrl,
      })),
      scannedAt: new Date().toISOString(),
      coverage: 'axe-core detects ~40-57% of WCAG 2.1 AA issues',
    }, null, 2));

    console.log(`  Saved to: output/${slug}-axe.json`);
    return { violations, counts, elapsed };

  } catch (err) {
    await browser.close();
    console.error(`  Failed: ${err.message}`);
    return null;
  }
}

const url = process.argv[2];
const name = process.argv[3];
if (!url) {
  console.log('\nUsage: node src/axe-scan.js <url> [business-name]');
  console.log('Example: node src/axe-scan.js https://smithlaw.com "Smith Law Firm"\n');
  process.exit(0);
}

axeScan(url, name);
