/**
 * scan-batch.js — Scan every prospect in a JSON file
 *
 * Usage:
 *   node src/scan-batch.js prospects/law-firms-la.json
 *   node src/scan-batch.js prospects/law-firms-la.json --limit 10
 */

import { readFileSync, writeFileSync } from 'fs';
import { scanUrl } from './scan.js';

const filePath = process.argv[2];
const limitArg = process.argv.indexOf('--limit');
const limit = limitArg !== -1 ? parseInt(process.argv[limitArg + 1]) : Infinity;

if (!filePath) {
  console.error('Usage: node src/scan-batch.js <prospects.json> [--limit N]');
  process.exit(1);
}

const prospects = JSON.parse(readFileSync(filePath, 'utf8'));
const toScan = prospects.filter(p => p.website).slice(0, limit);

console.log(`\nScanning ${toScan.length} businesses...`);
console.log('═'.repeat(55));

const results = { high: [], moderate: [], low: [], failed: [] };

for (const prospect of toScan) {
  const result = await scanUrl(prospect.website, prospect.name);

  if (!result) {
    results.failed.push(prospect.name);
    continue;
  }

  prospect.scan = result;

  if (result.risk === 'HIGH') results.high.push(result);
  else if (result.risk === 'MODERATE') results.moderate.push(result);
  else results.low.push(result);

  // Respectful delay between requests
  await new Promise(r => setTimeout(r, 1500));
}

// Summary
console.log('\n' + '═'.repeat(55));
console.log('  BATCH SCAN COMPLETE\n');
console.log(`  🔴 HIGH risk:     ${results.high.length} businesses`);
console.log(`  🟡 MODERATE risk: ${results.moderate.length} businesses`);
console.log(`  🟢 LOW risk:      ${results.low.length} businesses`);
console.log(`  ❌ Failed to scan: ${results.failed.length}`);
console.log('\n  Priority outreach targets (HIGH risk):');
results.high.forEach(r => console.log(`    • ${r.name} — ${r.score}/100 (${r.failureCount} violations)`));
console.log('');

// Save updated prospects with scan results
writeFileSync(filePath, JSON.stringify(prospects, null, 2));
console.log(`  Results saved back to: ${filePath}\n`);
