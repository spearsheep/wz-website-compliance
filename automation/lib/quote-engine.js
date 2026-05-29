/**
 * quote-engine.js — Node port of site/lib/quote-engine.ts
 *
 * Keeps the report's dynamic pricing in lockstep with the website's live quote:
 * if a prospect rescans on the site, the prices match what's in the report we sent.
 *
 * Two cost models:
 *   AUDIT scales with site complexity (surface area to inspect)
 *   FIX scales with violations (work to remediate)
 *   Both apply an industry risk multiplier.
 */

// ─── INDUSTRY MULTIPLIERS ─────────────────────────────────
const INDUSTRY_MULTIPLIERS = {
  healthcare: 1.5,
  law: 1.3,
  financial: 1.2,
  "professional-services": 1.15,
  "real-estate": 1.1,
  restaurant: 1.0,
  ecommerce: 1.0,
  other: 1.0,
};

// ─── AUDIT COST (scales with site complexity) ─────────────
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

// ─── FIX COST (scales with violations) ────────────────────
function computeFixBase(v) {
  let cost = 2000;
  cost += (v.critical || 0) * 400;
  cost += (v.serious || 0) * 200;
  cost += (v.moderate || 0) * 75;
  cost += (v.minor || 0) * 25;
  return cost;
}

// ─── REBUILD COST ─────────────────────────────────────────
function computeRebuildBase(c) {
  let cost = 8000;
  if (c.pages > 5) cost += (c.pages - 5) * 200;
  if (c.forms > 2) cost += (c.forms - 2) * 400;
  cost += c.interactiveComponents * 150;
  return Math.min(cost, 35000);
}

// ─── RANGES ───────────────────────────────────────────────
function toRange(central, spreadPct = 0.15) {
  const low = Math.round((central * (1 - spreadPct)) / 100) * 100;
  const high = Math.round((central * (1 + spreadPct)) / 100) * 100;
  const midpoint = Math.round(central / 100) * 100;
  return { low, high, midpoint };
}

// ─── RECOMMENDATION ───────────────────────────────────────
function recommend(input) {
  const v = input.violations;
  const total = (v.critical || 0) + (v.serious || 0) + (v.moderate || 0);
  if ((v.critical || 0) >= 8 || total >= 30) {
    return {
      recommendation: "rebuild",
      reason:
        "With this many violations, rebuilding on accessible architecture is cleaner and often cheaper than patching.",
      showsRebuild: true,
    };
  }
  if ((v.critical || 0) >= 1 || (v.serious || 0) >= 3) {
    return {
      recommendation: "fix",
      reason:
        "Your site has clear legal exposure. We recommend remediation now to prevent demand letters.",
      showsRebuild: total >= 15,
    };
  }
  return {
    recommendation: "audit",
    reason:
      "Your site is in reasonable shape. A formal audit will identify the remaining items and certify compliance.",
    showsRebuild: false,
  };
}

// ─── PUBLIC API ───────────────────────────────────────────
export function calculateQuote(input) {
  const multiplier =
    INDUSTRY_MULTIPLIERS[input.industry] ?? INDUSTRY_MULTIPLIERS.other;
  const auditCentral = computeAuditBase(input.complexity) * multiplier;
  const fixCentral = computeFixBase(input.violations) * multiplier;
  const rebuildCentral = computeRebuildBase(input.complexity) * multiplier;
  const { recommendation, reason, showsRebuild } = recommend(input);
  return {
    audit: toRange(auditCentral, 0.15),
    fix: toRange(fixCentral, 0.18),
    rebuild: toRange(rebuildCentral, 0.2),
    industry: input.industry,
    industryMultiplier: multiplier,
    recommendation,
    recommendationReason: reason,
    showsRebuildOption: showsRebuild,
  };
}

// ─── FORMATTING ───────────────────────────────────────────
export function formatRange(range) {
  const fmt = (n) =>
    n >= 1000
      ? "$" + Math.round(n / 100) / 10 + "k"
      : "$" + n.toLocaleString();
  return `${fmt(range.low)} – ${fmt(range.high)}`;
}

export function formatRangeFull(range) {
  return `$${range.low.toLocaleString()} – $${range.high.toLocaleString()}`;
}
