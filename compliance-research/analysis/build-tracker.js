/**
 * build-tracker.js
 * Reads combined scan results + individual report JSONs, runs complexity
 * detection on each live site, applies the quote engine, and outputs
 * master-tracker.json with full pricing analysis for all 40 companies.
 *
 * Usage: node analysis/build-tracker.js
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const REPORTS_DIR = join(ROOT, 'reports');
const SCANS_DIR = join(ROOT, 'scans');

// ── Quote engine (copy of automation/lib/quote-engine.js logic) ──────────────
const INDUSTRY_MULTIPLIERS = {
  healthcare: 1.5, law: 1.3, financial: 1.2,
  'professional-services': 1.15, 'real-estate': 1.1,
  restaurant: 1.0, ecommerce: 1.0, other: 1.0,
  // Gaps flagged: hotel, automotive, senior-care not in engine
  hotel: 1.0, automotive: 1.0, 'senior-care': 1.0,
};

function computeAuditBase(c) {
  let cost = 500;
  if (c.pages > 10) cost += (c.pages - 10) * 30;
  cost += c.forms * 50;
  cost += c.interactiveComponents * 30;
  if (c.images > 20) cost += (c.images - 20) * 5;
  cost += c.videos * 100;
  cost += c.pdfs * 80;
  cost += c.thirdPartyWidgets * 50;
  return cost;
}

function computeFixBase(v) {
  let cost = 2000;
  cost += (v.critical || 0) * 400;
  cost += (v.serious || 0) * 200;
  cost += (v.moderate || 0) * 75;
  cost += (v.minor || 0) * 25;
  return cost;
}

function computeRebuildBase(c) {
  let cost = 8000;
  if (c.pages > 5) cost += (c.pages - 5) * 200;
  if (c.forms > 2) cost += (c.forms - 2) * 400;
  cost += c.interactiveComponents * 150;
  return Math.min(cost, 35000);
}

function toRange(central, spread = 0.15) {
  return {
    low: Math.round((central * (1 - spread)) / 100) * 100,
    mid: Math.round(central / 100) * 100,
    high: Math.round((central * (1 + spread)) / 100) * 100,
  };
}

function calculateQuote(complexity, violations, industryKey) {
  const mult = INDUSTRY_MULTIPLIERS[industryKey] ?? 1.0;
  return {
    audit: toRange(computeAuditBase(complexity) * mult),
    fix: toRange(computeFixBase(violations) * mult, 0.18),
    rebuild: toRange(computeRebuildBase(complexity) * mult, 0.20),
    industryMultiplier: mult,
    industryKey,
    missingMultiplier: !['healthcare','law','financial','professional-services',
      'real-estate','restaurant','ecommerce','other'].includes(industryKey),
  };
}

// ── Complexity detection (JS port of complexity-detector.ts) ─────────────────
const WIDGET_SIGS = [
  /maps\.googleapis\.com/i, /calendly\.com/i, /intercom\.io/i,
  /tawk\.to/i, /drift\.com/i, /zendesk\.com/i, /hubspot\.com\/hubspot/i,
  /js\.stripe\.com/i, /squareup\.com/i, /paypal\.com\/sdk/i,
  /typeform\.com/i, /jotform\.com/i, /opentable\.com/i,
  /mindbodyonline\.com/i, /youtube\.com\/embed/i, /player\.vimeo\.com/i,
];

function count(html, re) { return (html.match(re) || []).length; }
function countUniq(html, re) {
  const m = html.match(re); return m ? new Set(m).size : 0;
}

async function detectComplexity(url) {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(20000),
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ComplianceResearchBot/1.0)' },
    });
    if (!res.ok) return null;
    const html = await res.text();

    const forms = count(html, /<form\b/gi);
    const buttons = count(html, /<button\b/gi);
    const dialogs = count(html, /role=["']dialog["']/gi);
    const tabs = count(html, /role=["']tab(panel)?["']/gi);
    const menus = count(html, /role=["']menu(item)?["']/gi);
    const accordions = count(html, /(aria-expanded=|class=["'][^"']*accordion)/gi);
    const interactiveComponents = buttons + dialogs + tabs + menus + accordions;
    const images = count(html, /<img\b/gi) + count(html, /background-image\s*:/gi);
    const videos = count(html, /<video\b/gi) + count(html, /youtube\.com\/embed\//gi) + count(html, /player\.vimeo\.com\/video\//gi);
    const pdfs = countUniq(html, /href=["'][^"']+\.pdf(\?[^"']*)?["']/gi);
    let widgets = 0;
    for (const sig of WIDGET_SIGS) if (sig.test(html)) widgets++;

    // Page count via sitemap
    let pages = 5;
    try {
      const u = new URL(url);
      const smRes = await fetch(`${u.protocol}//${u.host}/sitemap.xml`, {
        signal: AbortSignal.timeout(8000),
        headers: { 'User-Agent': 'ComplianceResearchBot/1.0' },
      });
      if (smRes.ok) {
        const xml = await smRes.text();
        const urlCount = count(xml, /<url>/gi);
        const locCount = count(xml, /<loc>/gi);
        const n = Math.max(urlCount, locCount);
        if (n > 0) pages = Math.min(n, 500);
      }
    } catch {
      // fallback: count internal links
      try {
        const u = new URL(url);
        const re = new RegExp(`href=["'](https?://${u.host.replace(/\./g,'\\.')})?[^"'#?]*["']`, 'gi');
        const links = html.match(re) || [];
        pages = Math.min(Math.max(new Set(links).size, 1), 200);
      } catch { /* keep default */ }
    }

    return { pages, forms, interactiveComponents, images, videos, pdfs, thirdPartyWidgets: widgets };
  } catch {
    return null;
  }
}

// ── Market build-cost estimate ────────────────────────────────────────────────
// Based on market research: agency rates for custom business websites
function estimateMarketBuildCost(pages, hasEcommerce, hasBookingEngine, industry) {
  let base = 3000;
  // Per-page rate (custom design, not template)
  if (pages <= 5)       base = 4000;
  else if (pages <= 10) base = 7000;
  else if (pages <= 25) base = 12000;
  else if (pages <= 50) base = 20000;
  else if (pages <= 100) base = 30000;
  else                   base = 45000;

  // Uplifts
  if (hasEcommerce)      base *= 1.4;  // checkout, cart, product pages
  if (hasBookingEngine)  base *= 1.25; // reservation systems, calendars
  if (industry === 'hotel')            base *= 1.1;  // property pages, photo galleries
  if (industry === 'automotive')       base *= 1.15; // inventory feeds, VDP pages

  return {
    low: Math.round(base * 0.75 / 500) * 500,
    mid: Math.round(base / 500) * 500,
    high: Math.round(base * 1.35 / 500) * 500,
  };
}

// ── Industry classification ───────────────────────────────────────────────────
function getIndustryKey(industry) {
  if (industry === 'Hotels & Hospitality') return 'hotel';
  if (industry === 'Auto Dealerships')     return 'automotive';
  if (industry === 'Senior Care / Assisted Living') return 'senior-care';
  if (industry === 'Mid-Market E-Commerce (DTC)') return 'ecommerce';
  return 'other';
}

// ── Pricing flag assessment ───────────────────────────────────────────────────
function assessPricing(quote, marketBuild, businessRevenue) {
  const flags = [];

  // Audit: should feel like a small fraction of legal exposure, not a big spend
  // Rule of thumb: audit should be < 5% of what one lawsuit costs them
  if (quote.audit.high > 5000 && businessRevenue && businessRevenue < 5_000_000) {
    flags.push({ type: 'audit-too-high', msg: 'Audit price may feel steep for this revenue band — consider capping at $2,500 for SMBs under $5M' });
  }
  if (quote.audit.low < 500) {
    flags.push({ type: 'audit-too-low', msg: 'Audit price is below $500 — may signal low value or low complexity' });
  }

  // Fix: should be < cost of building from scratch
  if (quote.fix.high > marketBuild.low) {
    flags.push({ type: 'fix-exceeds-build', msg: `Fix ceiling ($${quote.fix.high.toLocaleString()}) exceeds market build floor ($${marketBuild.low.toLocaleString()}) — rebuild becomes more attractive` });
  }

  // Rebuild: should be <= market build cost (our compliance rebuild should cost no more than a standard agency build)
  if (quote.rebuild.high > marketBuild.high) {
    flags.push({ type: 'rebuild-overpriced', msg: `Rebuild ceiling ($${quote.rebuild.high.toLocaleString()}) exceeds market build ceiling ($${marketBuild.high.toLocaleString()}) — we are not competitive` });
  }
  if (quote.rebuild.mid < marketBuild.low * 0.5) {
    flags.push({ type: 'rebuild-underpriced', msg: `Rebuild price ($${quote.rebuild.mid.toLocaleString()}) is less than half the market build floor — may signal underpricing` });
  }

  return flags;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const industryFiles = [
    { file: 'hotels-combined-results.json',      industryLabel: 'Hotels & Hospitality',          industryKey: 'hotel',       hasBooking: true,  hasEcommerce: false },
    { file: 'dealerships-combined-results.json', industryLabel: 'Auto Dealerships',              industryKey: 'automotive',  hasBooking: false, hasEcommerce: false },
    { file: 'senior-care-combined-results.json', industryLabel: 'Senior Care / Assisted Living', industryKey: 'senior-care', hasBooking: true,  hasEcommerce: false },
    { file: 'ecommerce-combined-results.json',   industryLabel: 'Mid-Market E-Commerce (DTC)',   industryKey: 'ecommerce',   hasBooking: false, hasEcommerce: true  },
  ];

  const tracker = {
    generatedAt: new Date().toISOString(),
    note: 'Business revenue/size populated by separate research agent — see master-tracker.json after merge.',
    industries: [],
  };

  for (const { file, industryLabel, industryKey, hasBooking, hasEcommerce } of industryFiles) {
    const scanPath = join(SCANS_DIR, file);
    if (!existsSync(scanPath)) { console.warn(`Missing: ${file}`); continue; }
    const scan = JSON.parse(readFileSync(scanPath, 'utf8'));

    console.log(`\nProcessing ${industryLabel} (${scan.sites.length} sites)...`);

    const industryEntry = {
      industry: industryLabel,
      industryKey,
      sites: [],
      industryPricingGap: !['healthcare','law','financial','professional-services','real-estate','restaurant','ecommerce','other'].includes(industryKey)
        ? `No specific multiplier for "${industryKey}" in quote engine — currently uses 1.0x (same as "other")`
        : null,
    };

    for (const site of scan.sites) {
      if (!site.score && site.score !== 0) {
        // Scan failed — include with nulls
        industryEntry.sites.push({
          company: site.company, url: site.url,
          scanStatus: 'failed', scanError: site.scanError || 'Unknown error',
          score: null, riskLevel: null, violations: null,
          complexity: null, quote: null, marketBuildCost: null, pricingFlags: [],
          // Placeholders for business research
          estimatedRevenue: null, employeeCount: null, locationCount: null, websiteType: null,
        });
        continue;
      }

      // Read individual report if available
      let reportData = null;
      if (site.reportJsonPath && existsSync(site.reportJsonPath)) {
        try { reportData = JSON.parse(readFileSync(site.reportJsonPath, 'utf8')); } catch { /* skip */ }
      }

      // Run complexity detection
      console.log(`  Detecting complexity: ${site.url}`);
      const complexity = await detectComplexity(site.url) || {
        pages: 15, forms: 2, interactiveComponents: 8,
        images: 25, videos: 1, pdfs: 1, thirdPartyWidgets: 2,
      };

      const violations = site.counts || { critical: 0, serious: 0, moderate: 0, minor: 0 };
      const quote = calculateQuote(complexity, violations, industryKey);
      const marketBuild = estimateMarketBuildCost(complexity.pages, hasEcommerce, hasBooking, industryKey);
      const pricingFlags = assessPricing(quote, marketBuild, null); // revenue filled in later

      industryEntry.sites.push({
        company: site.company,
        url: site.url,
        scanStatus: 'success',
        score: site.score,
        riskLevel: site.riskLevel,
        violations: {
          critical: violations.critical || 0,
          serious:  violations.serious  || 0,
          moderate: violations.moderate || 0,
          minor:    violations.minor    || 0,
          totalIssues:    site.counts?.totalIssues    || 0,
          totalInstances: site.counts?.totalInstances || 0,
        },
        topIssues: site.topIssues || [],
        complexity,
        quote: {
          audit:   { low: quote.audit.low,   mid: quote.audit.mid,   high: quote.audit.high   },
          fix:     { low: quote.fix.low,     mid: quote.fix.mid,     high: quote.fix.high     },
          rebuild: { low: quote.rebuild.low, mid: quote.rebuild.mid, high: quote.rebuild.high },
          recommendation: (violations.critical >= 1 || violations.serious >= 3)
            ? 'fix' : violations.critical === 0 && violations.serious === 0 ? 'audit' : 'audit',
          industryMultiplier: quote.industryMultiplier,
        },
        marketBuildCost: marketBuild,
        pricingFlags,
        // Placeholders — filled by research agent
        estimatedRevenue:   null,
        revenueRange:       null,
        employeeCount:      null,
        locationCount:      null,
        websiteType:        null,
        websiteNotes:       null,
      });

      // Small delay between requests
      await new Promise(r => setTimeout(r, 1500));
    }

    tracker.industries.push(industryEntry);
    console.log(`  Done: ${industryEntry.sites.filter(s => s.scanStatus === 'success').length} successful`);
  }

  const outPath = join(ROOT, 'analysis', 'master-tracker.json');
  writeFileSync(outPath, JSON.stringify(tracker, null, 2));
  console.log(`\nMaster tracker written to: ${outPath}`);
  console.log(`Total sites: ${tracker.industries.flatMap(i => i.sites).length}`);

  // Also write a quick summary CSV
  const rows = ['Industry,Company,URL,Score,Risk,Pages,Forms,Widgets,Critical,Serious,Moderate,Minor,TotalInstances,AuditLow,AuditMid,AuditHigh,FixLow,FixMid,FixHigh,RebuildLow,RebuildMid,RebuildHigh,MarketBuildLow,MarketBuildMid,MarketBuildHigh,PricingFlags'];
  for (const ind of tracker.industries) {
    for (const s of ind.sites) {
      if (s.scanStatus !== 'success' || !s.complexity) continue;
      rows.push([
        ind.industry, s.company, s.url, s.score, s.riskLevel,
        s.complexity.pages, s.complexity.forms, s.complexity.thirdPartyWidgets,
        s.violations.critical, s.violations.serious, s.violations.moderate, s.violations.minor, s.violations.totalInstances,
        s.quote.audit.low, s.quote.audit.mid, s.quote.audit.high,
        s.quote.fix.low,   s.quote.fix.mid,   s.quote.fix.high,
        s.quote.rebuild.low, s.quote.rebuild.mid, s.quote.rebuild.high,
        s.marketBuildCost.low, s.marketBuildCost.mid, s.marketBuildCost.high,
        s.pricingFlags.map(f => f.type).join('|'),
      ].join(','));
    }
  }
  writeFileSync(join(ROOT, 'analysis', 'pricing-tracker.csv'), rows.join('\n'));
  console.log('CSV written to: analysis/pricing-tracker.csv');
}

main().catch(err => { console.error(err); process.exit(1); });
