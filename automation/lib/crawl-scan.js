/**
 * crawl-scan.js — Multi-page accessibility crawl + scan.
 *
 * Discovers up to MAX_PAGES URLs on a site (sitemap.xml first, fall back to
 * recursive same-domain link crawl) and runs axe-core against each. Returns
 * an aggregated result ready for the quote engine.
 *
 * Why this exists:
 *   The single-page axe scan in axe-scan.js misses the booking flow,
 *   patient portal, contact form, etc. — exactly where ADA plaintiffs sue.
 *   A 25-page crawl catches ~70-80% of real violations and still finishes
 *   in 3-5 minutes per site.
 *
 * Usage:
 *   node automation/lib/crawl-scan.js https://bhcancercenter.com "Beverly Hills Cancer Center"
 */

import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "output", "scans");

const MAX_PAGES         = 25;   // safety cap — protects us from accidentally crawling 10K-page sites
const PAGE_LOAD_TIMEOUT = 30000;
const SETTLE_MS         = 1500; // let JS render before axe runs
const CONCURRENCY       = 4;    // parallel axe workers per site

// ─── 1. URL DISCOVERY ──────────────────────────────────────────────
// Two strategies: sitemap (preferred — gives us the site's own page list)
// then fallback to recursive link crawl from the homepage.

async function fetchSitemapUrls(origin) {
  const candidates = [
    `${origin}/sitemap.xml`,
    `${origin}/sitemap_index.xml`,
    `${origin}/sitemap-index.xml`,
  ];
  for (const url of candidates) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (!res.ok) continue;
      const xml = await res.text();
      const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
      if (urls.length === 0) continue;
      if (xml.includes("<sitemapindex")) {
        const childXml = await fetch(urls[0], { signal: AbortSignal.timeout(10000) })
          .then((r) => r.text()).catch(() => "");
        const childUrls = [...childXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
        if (childUrls.length) return childUrls;
      }
      return urls;
    } catch { /* try next candidate */ }
  }
  return null;
}

async function extractLinks(page) {
  return await page.evaluate(() => {
    const out = [];
    document.querySelectorAll("a[href]").forEach((a) => out.push(a.href));
    return out;
  });
}

async function crawlLinks(page, origin, seedUrl, max) {
  const found = new Set([seedUrl]);
  const queue = [seedUrl];
  while (queue.length && found.size < max) {
    const url = queue.shift();
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: PAGE_LOAD_TIMEOUT });
      const hrefs = await extractLinks(page);
      for (const href of hrefs) {
        try {
          const u = new URL(href, url);
          if (!sameSite(u.origin, origin)) continue;
          const clean = u.origin + u.pathname.replace(/\/$/, "");
          if (/\.(pdf|jpg|jpeg|png|gif|svg|webp|mp4|zip)$/i.test(clean)) continue;
          if (!found.has(clean)) {
            found.add(clean);
            if (found.size >= max) break;
            queue.push(clean);
          }
        } catch { /* invalid URL — skip */ }
      }
    } catch { /* page load failed — skip */ }
  }
  return [...found];
}

/** Normalize an origin for same-site comparison by stripping leading "www.". */
function sameSite(a, b) {
  const norm = (o) => o.replace(/^(https?:\/\/)www\./, "$1");
  return norm(a) === norm(b);
}

async function discoverUrls(context, origin, seedUrl, max) {
  const sitemapUrls = await fetchSitemapUrls(origin);
  if (sitemapUrls && sitemapUrls.length) {
    const sameOrigin = sitemapUrls.filter((u) => {
      try { return sameSite(new URL(u).origin, origin); } catch { return false; }
    });
    if (sameOrigin.length >= 5) {
      // Prioritize high-value paths (booking/contact/services/intake/patient).
      const HIGH_VALUE = /(book|appoint|contact|service|patient|intake|portal|insurance|provider)/i;
      const ranked = sameOrigin.sort((a, b) => {
        const av = HIGH_VALUE.test(a) ? 0 : 1;
        const bv = HIGH_VALUE.test(b) ? 0 : 1;
        return av - bv;
      });
      const set = new Set([seedUrl, ...ranked]);
      return [...set].slice(0, max);
    }
  }
  const page = await context.newPage();
  try {
    return await crawlLinks(page, origin, seedUrl, max);
  } finally {
    await page.close();
  }
}

// ─── 2. AXE SCAN ───────────────────────────────────────────────────

async function scanOne(context, url) {
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: PAGE_LOAD_TIMEOUT });
    await page.waitForTimeout(SETTLE_MS);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    const dom = await page.evaluate(() => ({
      forms:       document.querySelectorAll("form").length,
      images:      document.querySelectorAll("img").length,
      videos:      document.querySelectorAll("video, iframe[src*='youtube'], iframe[src*='vimeo']").length,
      pdfs:        document.querySelectorAll("a[href$='.pdf']").length,
      widgets:     document.querySelectorAll("iframe").length,
      interactive: document.querySelectorAll("button, [role='button'], input, select, textarea").length,
    }));
    return { url, ok: true, violations: result.violations, dom };
  } catch (err) {
    console.log(`      FAIL ${url}: ${String(err).slice(0, 160)}`);
    return { url, ok: false, error: String(err).slice(0, 200) };
  } finally {
    await page.close();
  }
}

async function scanAll(context, urls, concurrency) {
  const results = [];
  let idx = 0;
  async function worker() {
    while (idx < urls.length) {
      const my = idx++;
      console.log(`  [${my + 1}/${urls.length}] ${urls[my]}`);
      results[my] = await scanOne(context, urls[my]);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}

// ─── 3. AGGREGATE ──────────────────────────────────────────────────

function aggregate(pageResults) {
  // Dedup violations by (rule × node target) so the same logo missing alt
  // on every page doesn't inflate the count.
  const seen = new Set();
  const byImpact = { critical: 0, serious: 0, moderate: 0, minor: 0 };
  let totalInstances = 0;
  const uniqueIssues = new Map();

  for (const r of pageResults) {
    if (!r.ok) continue;
    for (const v of r.violations) {
      const impact = v.impact || "moderate";
      for (const node of v.nodes) {
        const key = `${v.id}::${(node.target || []).join(">")}`;
        totalInstances++;
        if (seen.has(key)) continue;
        seen.add(key);
        byImpact[impact] = (byImpact[impact] || 0) + 1;
      }
      if (!uniqueIssues.has(v.id)) {
        uniqueIssues.set(v.id, {
          id: v.id,
          impact,
          help: v.help,
          description: v.description,
          count: 0,
        });
      }
      uniqueIssues.get(v.id).count += v.nodes.length;
    }
  }

  const okResults = pageResults.filter((r) => r.ok);
  const avgDom = (key) =>
    okResults.length === 0 ? 0 : Math.round(okResults.reduce((s, r) => s + r.dom[key], 0) / okResults.length);

  const complexity = {
    pages:                 okResults.length,
    forms:                 Math.max(0, ...okResults.map((r) => r.dom.forms)),
    interactiveComponents: avgDom("interactive"),
    images:                avgDom("images") * okResults.length,
    videos:                okResults.reduce((s, r) => s + r.dom.videos, 0),
    pdfs:                  okResults.reduce((s, r) => s + r.dom.pdfs, 0),
    thirdPartyWidgets:     Math.max(0, ...okResults.map((r) => r.dom.widgets)),
  };

  return {
    counts: {
      critical:       byImpact.critical,
      serious:        byImpact.serious,
      moderate:       byImpact.moderate,
      minor:          byImpact.minor,
      totalIssues:    Object.values(byImpact).reduce((a, b) => a + b, 0),
      totalInstances,
    },
    complexity,
    uniqueIssues: [...uniqueIssues.values()].sort((a, b) => {
      const order = { critical: 0, serious: 1, moderate: 2, minor: 3 };
      return (order[a.impact] ?? 4) - (order[b.impact] ?? 4);
    }),
  };
}

// ─── MAIN ──────────────────────────────────────────────────────────

async function main() {
  const [seed, businessName] = process.argv.slice(2);
  if (!seed) {
    console.error('Usage: node crawl-scan.js https://example.com "Business Name"');
    process.exit(1);
  }
  const seedUrl = seed.endsWith("/") ? seed.slice(0, -1) : seed;
  const origin = new URL(seedUrl).origin;
  const name = businessName || new URL(seedUrl).hostname;

  console.log(`\n━━━ Multi-page accessibility scan ━━━`);
  console.log(`Target:  ${name}`);
  console.log(`Origin:  ${origin}`);
  console.log(`Cap:     ${MAX_PAGES} pages, ${CONCURRENCY} concurrent\n`);

  const t0 = Date.now();
  // Use the system's installed Chrome — avoids the bundled Chromium download.
  const browser = await chromium.launch({ channel: "chrome" });
  const context = await browser.newContext();

  try {
    console.log("Phase 1 — discovering URLs...");
    const urls = await discoverUrls(context, origin, seedUrl, MAX_PAGES);
    console.log(`  Found ${urls.length} pages to scan`);

    console.log("\nPhase 2 — scanning each page with axe-core...");
    const pageResults = await scanAll(context, urls, CONCURRENCY);
    const successful = pageResults.filter((r) => r.ok).length;
    console.log(`  ${successful}/${pageResults.length} pages scanned successfully`);

    console.log("\nPhase 3 — aggregating violations...");
    const agg = aggregate(pageResults);

    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
    const summary = {
      target: { name, url: origin, scannedAt: new Date().toISOString(), elapsedSec: +elapsed },
      pagesScanned: urls.length,
      pagesSuccessful: successful,
      ...agg,
    };

    mkdirSync(OUT_DIR, { recursive: true });
    const outFile = join(OUT_DIR, `${new URL(seedUrl).hostname.replace(/\./g, "-")}.json`);
    writeFileSync(outFile, JSON.stringify(summary, null, 2));

    console.log(`\n━━━ Results (${elapsed}s) ━━━`);
    console.log(`Pages scanned:     ${successful}/${urls.length}`);
    console.log(`Unique violations: ${agg.counts.totalIssues}`);
    console.log(`  critical: ${agg.counts.critical}`);
    console.log(`  serious:  ${agg.counts.serious}`);
    console.log(`  moderate: ${agg.counts.moderate}`);
    console.log(`  minor:    ${agg.counts.minor}`);
    console.log(`Total instances:   ${agg.counts.totalInstances}`);
    console.log(`Complexity:`, agg.complexity);
    console.log(`\nSaved: ${outFile}`);
  } finally {
    await browser.close();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
