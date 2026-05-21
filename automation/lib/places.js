/**
 * places.js — Discover businesses via Google Places API (New)
 *
 * Usage:
 *   node lib/places.js <target_config_yaml> <prospects_dir> <api_key> [--mode trial|production]
 *
 * Reads a target YAML, queries Google Places, filters, deduplicates against existing
 * prospect files, writes a new prospects JSON to {prospects_dir}/{date}-{target_id}.json.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'fs';
import { join, basename } from 'path';
import { execSync } from 'child_process';
import yaml from 'js-yaml';

const DIRECTORY_DOMAINS = new Set([
  'yelp.com', 'healthgrades.com', 'zocdoc.com', 'findlaw.com', 'avvo.com',
  'lawyers.com', 'martindale.com', 'webmd.com', 'tebra.com', 'vitals.com',
  'doctor.webmd.com', 'angi.com', 'thumbtack.com', 'bbb.org', 'yellowpages.com',
]);

const args = process.argv.slice(2);
const targetYaml = args[0];
const prospectsDir = args[1];
const apiKey = args[2];
const modeIdx = args.indexOf('--mode');
const mode = modeIdx !== -1 ? args[modeIdx + 1] : 'trial';

if (!targetYaml || !prospectsDir || !apiKey) {
  console.error('Usage: node lib/places.js <target_yaml> <prospects_dir> <api_key> [--mode trial|production]');
  process.exit(1);
}

const target = yaml.load(readFileSync(targetYaml, 'utf8'));
console.log(`Discovering ${target.display_name}...`);

// Build search query
const textQuery = `${target.google_places_query} in ${target.location}`;
const requestBody = {
  textQuery,
  maxResultCount: Math.min(target.max_per_run || 20, 20),
  languageCode: 'en',
};

// Call Places API via curl (more reliable than node fetch in some environments)
const curlCmd = `curl -s -X POST 'https://places.googleapis.com/v1/places:searchText' \
  -H 'Content-Type: application/json' \
  -H 'X-Goog-Api-Key: ${apiKey}' \
  -H 'X-Goog-FieldMask: places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.businessStatus' \
  -d '${JSON.stringify(requestBody).replace(/'/g, "'\\''")}'`;

let resp;
try {
  const raw = execSync(curlCmd, { timeout: 30000 }).toString();
  resp = JSON.parse(raw);
} catch (err) {
  console.error('Places API call failed:', err.message);
  process.exit(2);
}

if (resp.error) {
  console.error('Places API error:', resp.error.message);
  process.exit(3);
}

const places = resp.places || [];
console.log(`  Got ${places.length} raw results`);

// Filter
const minReviews = target.min_review_count || 0;
const filtered = places.filter(p => {
  if (p.businessStatus !== 'OPERATIONAL') return false;
  if (!p.websiteUri) return false;
  if ((p.userRatingCount || 0) < minReviews) return false;

  try {
    const hostname = new URL(p.websiteUri).hostname.replace(/^www\./, '');
    if (DIRECTORY_DOMAINS.has(hostname)) return false;
  } catch {
    return false;
  }
  return true;
});
console.log(`  After filter: ${filtered.length}`);

// Deduplicate against existing prospect files
const seenDomains = new Set();
if (existsSync(prospectsDir)) {
  for (const file of readdirSync(prospectsDir)) {
    if (!file.endsWith('.json')) continue;
    try {
      const existing = JSON.parse(readFileSync(join(prospectsDir, file), 'utf8'));
      for (const e of existing) {
        if (e.website) {
          try { seenDomains.add(new URL(e.website).hostname.replace(/^www\./, '')); }
          catch {}
        }
      }
    } catch {}
  }
}

const deduped = filtered.filter(p => {
  try {
    const host = new URL(p.websiteUri).hostname.replace(/^www\./, '');
    if (seenDomains.has(host)) return false;
    seenDomains.add(host);
    return true;
  } catch { return false; }
});
console.log(`  After dedupe: ${deduped.length}`);

// Normalize
const prospects = deduped.map(p => {
  let normalizedUrl = p.websiteUri;
  try {
    const u = new URL(p.websiteUri);
    normalizedUrl = `${u.protocol}//${u.hostname}`;
  } catch {}

  return {
    name: p.displayName?.text || 'Unknown',
    address: p.formattedAddress || '',
    phone: p.nationalPhoneNumber || '',
    website: normalizedUrl,
    rating: p.rating || null,
    review_count: p.userRatingCount || 0,
    target_id: target.id,
    discovered_at: new Date().toISOString(),
    scan: null,
    enrichment: null,
    audit_pdf_path: null,
    draft_id: null,
  };
});

// Write output
mkdirSync(prospectsDir, { recursive: true });
const runDate = new Date().toISOString().slice(0, 10);
const outPath = join(prospectsDir, `${runDate}-${target.id}.json`);
writeFileSync(outPath, JSON.stringify(prospects, null, 2));

console.log(`\nSaved ${prospects.length} prospects to: ${outPath}`);
console.log(JSON.stringify({ outputPath: outPath, count: prospects.length }));
