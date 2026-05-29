/**
 * merge-and-evaluate.js
 * Merges business-research.json into master-tracker.json, then evaluates
 * whether current dynamic pricing is appropriate given actual business size.
 *
 * Outputs:
 *   - final-tracker.json  (full merged dataset)
 *   - pricing-evaluation.json  (per-company pricing assessment)
 *   - pricing-evaluation-summary.md  (human-readable executive summary)
 *
 * Usage: node analysis/merge-and-evaluate.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── Load files ────────────────────────────────────────────────────────────────
const tracker = JSON.parse(readFileSync(join(__dirname, 'master-tracker.json'), 'utf8'));
const bizData = JSON.parse(readFileSync(join(__dirname, 'business-research.json'), 'utf8'));

// ── Fuzzy name match helper ───────────────────────────────────────────────────
const STOP_WORDS = new Set(['the', 'hotel', 'hotels', 'automotive', 'auto', 'senior', 'living', 'care', 'and', 'collection', 'dealerships', 'furniture', 'case', 'brand', 'home']);

function normalise(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .split(' ')
    .filter(w => !STOP_WORDS.has(w) && w.length > 1)
    .join(' ');
}

function findBizRecord(trackerCompany, bizList) {
  // 1. Exact match (case-insensitive)
  const exact = bizList.find(b => b.company.toLowerCase() === trackerCompany.toLowerCase());
  if (exact) return exact;

  // 2. Fuzzy: compare normalised tokens
  const tNorm = normalise(trackerCompany);
  let bestScore = 0;
  let bestMatch = null;

  for (const b of bizList) {
    const bNorm = normalise(b.company);
    const tTokens = tNorm.split(' ');
    const bTokens = bNorm.split(' ');
    const shared = tTokens.filter(t => bTokens.includes(t)).length;
    const score = shared / Math.max(tTokens.length, bTokens.length);
    if (score > bestScore) { bestScore = score; bestMatch = b; }
  }

  return bestScore >= 0.5 ? bestMatch : null;
}

// ── Pricing evaluation tiers ──────────────────────────────────────────────────
// Revenue bands → what a business "thinks" about pricing
function getAuditBudgetCeiling(revMidLow) {
  if (!revMidLow) return 3000;
  if (revMidLow >= 500_000_000) return 25000;   // Enterprise: >$500M
  if (revMidLow >= 100_000_000) return 15000;   // Large: $100M–$500M
  if (revMidLow >= 50_000_000)  return 8000;    // Mid-large: $50M–$100M
  if (revMidLow >= 20_000_000)  return 4000;    // Mid: $20M–$50M
  if (revMidLow >= 5_000_000)   return 2500;    // Small-mid: $5M–$20M
  return 1500;                                   // Small: <$5M
}

function getSuggestedIndustryMultiplier(industryKey) {
  const MAP = {
    hotel:        1.2,  // booking engines are high-revenue conversion surfaces
    automotive:   1.25, // high-ticket transactions, CFPB scrutiny
    'senior-care': 1.4, // ADA + state elder-care laws, emotionally sensitive audience
    ecommerce:    1.0,
    healthcare:   1.5,
    law:          1.3,
    financial:    1.2,
  };
  return MAP[industryKey] ?? 1.0;
}

function evaluatePricing(site, industryKey) {
  const flags = [];
  const suggestions = [];
  const biz = site._bizData;
  const rev = biz?.revenueNumericMidLow ?? null;
  const auditBudgetCeiling = getAuditBudgetCeiling(rev);
  const q = site.quote;
  const mb = site.marketBuildCost;
  const suggestedMult = getSuggestedIndustryMultiplier(industryKey);
  const currentMult = q?.industryMultiplier ?? 1.0;

  // Flag 1: Audit is too cheap for the company size (leaving money on table)
  if (rev && rev >= 100_000_000 && q?.audit?.high < 5000) {
    flags.push('audit-underpriced-for-enterprise');
    suggestions.push(`At $${(rev / 1_000_000).toFixed(0)}M+ revenue, this company can and should pay $5K–$15K for a compliance audit — current ceiling $${q.audit.high.toLocaleString()} leaves money on the table.`);
  }

  // Flag 2: Audit is too expensive for small business
  if (rev && rev < 10_000_000 && q?.audit?.mid > auditBudgetCeiling) {
    flags.push('audit-too-steep-for-smb');
    suggestions.push(`SMB at ~$${(rev / 1_000_000).toFixed(0)}M revenue — audit mid price $${q.audit.mid.toLocaleString()} exceeds reasonable budget ceiling of $${auditBudgetCeiling.toLocaleString()}.`);
  }

  // Flag 3: Fix cost exceeds market build cost (rebuild becomes more rational)
  if (mb && q?.fix?.high > mb.low) {
    flags.push('fix-exceeds-build-floor');
    suggestions.push(`Fix ceiling $${q.fix.high.toLocaleString()} > market build floor $${mb.low.toLocaleString()} — at this point, a full rebuild is the stronger pitch.`);
  }

  // Flag 4: Rebuild is more expensive than market build (we are not competitive)
  if (mb && q?.rebuild?.high > mb.high) {
    flags.push('rebuild-overpriced-vs-market');
    suggestions.push(`Our rebuild ceiling $${q.rebuild.high.toLocaleString()} > market build ceiling $${mb.high.toLocaleString()} — we are NOT price competitive on rebuild.`);
  }

  // Flag 5: Rebuild is dramatically cheaper than market (possible under-pricing)
  if (mb && q?.rebuild?.mid < mb.low * 0.4) {
    flags.push('rebuild-underpriced');
    suggestions.push(`Our rebuild mid $${q.rebuild.mid.toLocaleString()} is <40% of market build floor $${mb.low.toLocaleString()} — may signal underpricing.`);
  }

  // Flag 6: Industry multiplier not calibrated
  if (currentMult < suggestedMult) {
    flags.push('industry-multiplier-gap');
    suggestions.push(`Current multiplier ${currentMult}x; suggested ${suggestedMult}x for ${industryKey} — applying this would raise all prices by ${Math.round((suggestedMult / currentMult - 1) * 100)}%.`);
  }

  // Pricing tier classification
  let pricingTier;
  if (!rev) pricingTier = 'unknown';
  else if (rev >= 500_000_000) pricingTier = 'enterprise';
  else if (rev >= 100_000_000) pricingTier = 'large';
  else if (rev >= 50_000_000)  pricingTier = 'mid-large';
  else if (rev >= 20_000_000)  pricingTier = 'mid';
  else if (rev >= 5_000_000)   pricingTier = 'small-mid';
  else                          pricingTier = 'small';

  return { flags, suggestions, auditBudgetCeiling, suggestedMultiplier: suggestedMult, pricingTier };
}

// ── Merge + evaluate ──────────────────────────────────────────────────────────
let mergedCount = 0;
let unmatched = [];
const evaluationRows = [];

for (const industry of tracker.industries) {
  for (const site of industry.sites) {
    const biz = findBizRecord(site.company, bizData.companies);
    if (biz) {
      site.estimatedRevenue  = biz.estimatedRevenue;
      site.revenueRange      = { low: biz.revenueNumericMidLow, high: biz.revenueNumericMidHigh };
      site.employeeCount     = biz.employeeCount;
      site.locationCount     = biz.locationCount;
      site.websiteType       = biz.websiteType;
      site.websiteNotes      = biz.websiteNotes;
      site._bizData          = biz; // temp key for evaluation
      mergedCount++;
    } else {
      unmatched.push({ company: site.company, industry: industry.industry });
    }

    // Pricing evaluation
    if (site.scanStatus === 'success' && site.quote) {
      const eval_ = evaluatePricing(site, industry.industryKey);
      site.pricingEvaluation = {
        pricingTier:         eval_.pricingTier,
        auditBudgetCeiling:  eval_.auditBudgetCeiling,
        suggestedMultiplier: eval_.suggestedMultiplier,
        flags:               eval_.flags,
        suggestions:         eval_.suggestions,
      };

      evaluationRows.push({
        industry:            industry.industry,
        company:             site.company,
        url:                 site.url,
        score:               site.score,
        riskLevel:           site.riskLevel,
        pricingTier:         eval_.pricingTier,
        estimatedRevenue:    site.estimatedRevenue ?? 'unknown',
        locationCount:       site.locationCount ?? null,
        auditMid:            site.quote?.audit?.mid,
        auditBudgetCeiling:  eval_.auditBudgetCeiling,
        fixMid:              site.quote?.fix?.mid,
        rebuildMid:          site.quote?.rebuild?.mid,
        marketBuildMid:      site.marketBuildCost?.mid,
        currentMultiplier:   site.quote?.industryMultiplier,
        suggestedMultiplier: eval_.suggestedMultiplier,
        flags:               eval_.flags.join(' | '),
        topIssue:            Array.isArray(site.topIssues)
          ? (typeof site.topIssues[0] === 'string' ? site.topIssues[0] : site.topIssues[0]?.title ?? '')
          : '',
      });
    }

    // Clean up temp key
    delete site._bizData;
  }
}

// ── Build industry-level multiplier recommendations ───────────────────────────
const multiplierRecs = [];
for (const industry of tracker.industries) {
  const suggested = getSuggestedIndustryMultiplier(industry.industryKey);
  const current = 1.0;
  if (suggested !== current) {
    multiplierRecs.push({
      industry:   industry.industry,
      industryKey: industry.industryKey,
      current:    current,
      suggested:  suggested,
      rationale:  {
        hotel:        'Booking engines are high-revenue conversion surfaces; revenue risk of inaccessibility is direct (lost bookings). 20% uplift is justified.',
        automotive:   'High-ticket transactions ($30K+ cars); CFPB scrutiny on digital credit applications; strong dealer margins. 25% uplift.',
        'senior-care': 'ADA + state elder-care laws stack; elderly disabled users are a primary customer segment; emotionally sensitive — settlements tend to be larger. 40% uplift.',
        ecommerce:    'No change — already calibrated.',
      }[industry.industryKey] ?? '',
    });
  }
}

// ── Update tracker metadata ───────────────────────────────────────────────────
tracker.note = 'Final merged tracker with business research and pricing evaluation. Generated by merge-and-evaluate.js.';
tracker.mergedAt = new Date().toISOString();
tracker.mergeStats = {
  totalSites: tracker.industries.flatMap(i => i.sites).length,
  mergedWithBizData: mergedCount,
  unmatched: unmatched,
};
tracker.industryMultiplierRecommendations = multiplierRecs;

// ── Write final-tracker.json ──────────────────────────────────────────────────
const trackerOut = join(__dirname, 'final-tracker.json');
writeFileSync(trackerOut, JSON.stringify(tracker, null, 2));
console.log(`\nFinal tracker written: ${trackerOut}`);
console.log(`  Merged: ${mergedCount} sites`);
if (unmatched.length) {
  console.log(`  Unmatched (no business data): ${unmatched.map(u => u.company).join(', ')}`);
}

// ── Write pricing-evaluation.json ─────────────────────────────────────────────
const evalOut = join(__dirname, 'pricing-evaluation.json');
writeFileSync(evalOut, JSON.stringify({ generatedAt: new Date().toISOString(), rows: evaluationRows }, null, 2));
console.log(`Pricing evaluation written: ${evalOut}`);

// ── Write human-readable summary ──────────────────────────────────────────────
function fmtUSD(n) { return n == null ? 'N/A' : `$${n.toLocaleString()}`; }

const flagCounts = {};
for (const r of evaluationRows) {
  for (const f of (r.flags || '').split(' | ').filter(Boolean)) {
    flagCounts[f] = (flagCounts[f] || 0) + 1;
  }
}

const byTier = {};
for (const r of evaluationRows) {
  if (!byTier[r.pricingTier]) byTier[r.pricingTier] = [];
  byTier[r.pricingTier].push(r);
}

let md = `# Pricing Evaluation — Website Compliance Services
Generated: ${new Date().toISOString().slice(0, 10)}

## What This Is
A company-by-company assessment of whether our current dynamic pricing (audit / fix / rebuild)
is calibrated correctly for each business's actual revenue size and website complexity.

---

## 1. Industry Multiplier Gaps (Most Urgent Fix)

Three of our four target industries have **no specific pricing multiplier** in the quote engine.
Everything defaults to 1.0x. This underprices all three industries:

| Industry | Current | Recommended | Why |
|---|---|---|---|
${multiplierRecs.map(r => `| ${r.industry} | ${r.current}x | ${r.suggested}x | ${r.rationale} |`).join('\n')}

**Impact**: Applying these multipliers would raise audit/fix/rebuild prices by 20–40% for
hotels, automotive, and senior care companies — making our quotes more appropriate for the risk
and revenue profile of these industries.

---

## 2. Flag Summary (Across All ${evaluationRows.length} Scanned Sites)

| Flag | Count | Meaning |
|---|---|---|
${Object.entries(flagCounts).sort((a,b) => b[1]-a[1]).map(([f, n]) =>
  `| \`${f}\` | ${n} | ${({
    'audit-underpriced-for-enterprise': 'Large/enterprise company — our audit price is too low',
    'audit-too-steep-for-smb': 'Small business — our audit price may be too high',
    'fix-exceeds-build-floor': 'Fix ceiling > market build floor — rebuild is the stronger pitch',
    'rebuild-overpriced-vs-market': 'Our rebuild costs more than market — not competitive',
    'rebuild-underpriced': 'Our rebuild is less than 40% of market — possible underpricing',
    'industry-multiplier-gap': 'No specific multiplier set for this industry',
  }[f] ?? f)} |`
).join('\n')}

---

## 3. Company-by-Company Breakdown

`;

const TIER_ORDER = ['enterprise', 'large', 'mid-large', 'mid', 'small-mid', 'small', 'unknown'];
for (const tier of TIER_ORDER) {
  const rows = byTier[tier];
  if (!rows || rows.length === 0) continue;
  const tierLabel = {
    enterprise: 'Enterprise (>$500M revenue)',
    large: 'Large ($100M–$500M)',
    'mid-large': 'Mid-Large ($50M–$100M)',
    mid: 'Mid ($20M–$50M)',
    'small-mid': 'Small-Mid ($5M–$20M)',
    small: 'Small (<$5M)',
    unknown: 'Unknown Revenue',
  }[tier];

  md += `### ${tierLabel}\n\n`;
  for (const r of rows) {
    const flagStr = r.flags ? r.flags.split(' | ').map(f => `\`${f}\``).join(', ') : 'none';
    md += `**${r.company}** (${r.industry})\n`;
    md += `- Revenue: ${r.estimatedRevenue} | Score: ${r.score} | Risk: ${r.riskLevel}\n`;
    md += `- Audit: ${fmtUSD(r.auditMid)} (budget ceiling: ${fmtUSD(r.auditBudgetCeiling)})\n`;
    md += `- Fix: ${fmtUSD(r.fixMid)} | Rebuild: ${fmtUSD(r.rebuildMid)} | Market build: ${fmtUSD(r.marketBuildMid)}\n`;
    md += `- Multiplier: ${r.currentMultiplier}x → suggested ${r.suggestedMultiplier}x\n`;
    md += `- Flags: ${flagStr}\n`;
    if (r.topIssue) md += `- Top issue: _${r.topIssue}_\n`;
    md += '\n';
  }
}

md += `---

## 4. Key Strategic Recommendations

### A. Implement Industry Multipliers Immediately
The quote engine needs multipliers for hotel (1.2x), automotive (1.25x), and senior-care (1.4x).
These three industries are 75% of our current target list. Leaving them at 1.0x means every
quote we generate is 20–40% below where it should be.

### B. Revenue-Tiered Audit Pricing
Our current audit pricing is complexity-based only (site size × widget count). It ignores
company revenue. A $3B dealership (Serra Automotive) and a boutique hotel ($15M, Arlo Hotels)
currently get similar audit quotes if their sites have similar complexity. That's wrong.

**Recommendation**: Add a revenue-tier override cap and floor:
- Enterprise (>$500M): Audit floor $8K, Fix floor $10K
- Large ($100M–$500M): Audit floor $5K
- Mid ($20M–$100M): No change (current engine is reasonable)
- SMB (<$20M): Audit ceiling $2,500 to keep it accessible

### C. Flagship Pitch: "Fix vs. Rebuild" Decision
Several sites (notably in auto dealerships) have fix quotes that exceed the market floor for
a brand-new website. These are the strongest "rebuild" candidates. Frame the pitch as:
"You could pay X to patch a broken site, or Y to get a fully compliant, modern site."
Companies in this bucket: ${evaluationRows
  .filter(r => r.flags.includes('fix-exceeds-build-floor'))
  .map(r => r.company)
  .join(', ') || 'none detected'}.

### D. Target Priority by Score + Revenue
Best prospects = HIGH violation count + MID revenue ($20M–$100M). These companies have:
- Clear, demonstrable problems (strong sales evidence)
- Budget to act (not broke, not enterprise with slow procurement)
- Decision-maker is the owner or regional VP (not a 6-month RFP process)

Top prospects by this criteria:
${evaluationRows
  .filter(r => ['mid', 'small-mid', 'mid-large'].includes(r.pricingTier))
  .filter(r => r.score < 90)
  .sort((a, b) => a.score - b.score)
  .slice(0, 8)
  .map(r => `- **${r.company}** (${r.industry}): score ${r.score}, ${r.estimatedRevenue}`)
  .join('\n')}
`;

const mdOut = join(__dirname, 'pricing-evaluation-summary.md');
writeFileSync(mdOut, md);
console.log(`Summary written: ${mdOut}`);

console.log('\n=== Quick Stats ===');
console.log(`Total sites evaluated: ${evaluationRows.length}`);
console.log(`Sites with flags: ${evaluationRows.filter(r => r.flags).length}`);
console.log(`Industry multiplier gap affects: ${evaluationRows.filter(r => r.flags.includes('industry-multiplier-gap')).length} sites`);
console.log(`Audit underpriced for enterprise: ${evaluationRows.filter(r => r.flags.includes('audit-underpriced-for-enterprise')).length} sites`);
console.log(`Fix exceeds build floor: ${evaluationRows.filter(r => r.flags.includes('fix-exceeds-build-floor')).length} sites`);
