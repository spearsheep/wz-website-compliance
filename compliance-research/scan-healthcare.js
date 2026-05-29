/**
 * scan-healthcare.js
 * Scans 10 healthcare practices using combined-scan.js and writes
 * healthcare-combined-results.json to compliance-scan-output/
 */

import { execFileSync } from 'child_process';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SCANNER = join(ROOT, 'automation', 'lib', 'combined-scan.js');
const OUTPUT_DIR = join(ROOT, 'compliance-scan-output');

const sites = [
  { company: 'Personal Dental Office',           url: 'https://www.personaldentaloffice.com/', specialty: 'dental',           employees: 102 },
  { company: 'California Dermatology Institute',  url: 'https://www.calderminstitute.com/',     specialty: 'dermatology',      employees: 7   },
  { company: 'The LA Chiropractor',               url: 'https://www.thelachiropractor.com/',    specialty: 'chiropractic',     employees: null },
  { company: 'Eye Care of San Diego',             url: 'https://www.eyecareofsandiego.com/',    specialty: 'optometry',        employees: null },
  { company: 'Premier Physical Therapy',          url: 'https://premier805pt.com',              specialty: 'physical therapy', employees: 14  },
  { company: 'California Kids Pediatrics',        url: 'https://www.calkidspeds.com/',          specialty: 'pediatrics',       employees: 7   },
  { company: 'Orange County Plastic Surgery',     url: 'https://orangecountyplasticsurgery.com', specialty: 'plastic surgery', employees: 4   },
  { company: 'Life Practice Counseling Group',    url: 'https://www.lifepractice.org',          specialty: 'mental health',    employees: 39  },
  { company: 'HD Ophthalmology',                  url: 'https://hdophthalmology.com',           specialty: 'ophthalmology',    employees: 4   },
  { company: 'Innovative Care Medicine',          url: 'https://innovativecaremed.com',         specialty: 'family practice',  employees: 67  },
];

const results = {
  industry: 'Healthcare Providers',
  scanMethod: 'combined-scan: Lighthouse + axe-core + heuristic checks',
  scannedAt: new Date().toISOString(),
  summary: { totalScanned: 10, successfulScans: 0, failedScans: 0, avgScore: 0, criticalRiskCount: 0, highRiskCount: 0, moderateRiskCount: 0, lowRiskCount: 0, totalViolationInstances: 0 },
  sites: [],
};

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

for (const site of sites) {
  const slug = slugify(site.company);
  const reportPath = join(ROOT, 'automation', 'output', `${slug}-report.json`);

  console.log(`\nScanning: ${site.company} (${site.url})`);
  try {
    execFileSync('node', [SCANNER, site.url, site.company], {
      cwd: join(ROOT, 'automation'),
      timeout: 120000,
      stdio: 'pipe',
      env: {
        ...process.env,
        GOOGLE_PAGESPEED_API_KEY: 'AIzaSyCQ5aiB5Byp1RphFmulekTmovqMX8t0bo8',
        CHROME_EXECUTABLE_PATH: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      },
    });

    if (existsSync(reportPath)) {
      const report = JSON.parse(readFileSync(reportPath, 'utf8'));
      const scoreVal = typeof report.score === 'object' ? report.score.value : report.score;
      const entry = {
        company: site.company,
        url: site.url,
        specialty: site.specialty,
        estimatedEmployees: site.employees,
        score: scoreVal,
        riskLevel: scoreVal >= 90 ? 'LOW' : scoreVal >= 70 ? 'MODERATE' : scoreVal >= 50 ? 'HIGH' : 'CRITICAL',
        counts: report.counts,
        topIssues: (report.issues || []).slice(0, 6).map(i => ({
          severity: i.severity,
          title: i.title,
          instances: i.instances,
        })),
        reportJsonPath: reportPath,
      };

      results.sites.push(entry);
      results.summary.successfulScans++;
      results.summary.totalViolationInstances += report.counts?.totalInstances || 0;

      if (entry.riskLevel === 'CRITICAL') results.summary.criticalRiskCount++;
      else if (entry.riskLevel === 'HIGH') results.summary.highRiskCount++;
      else if (entry.riskLevel === 'MODERATE') results.summary.moderateRiskCount++;
      else results.summary.lowRiskCount++;

      console.log(`  Score: ${report.score} | Risk: ${entry.riskLevel} | Violations: ${report.counts?.totalInstances || 0}`);
    } else {
      throw new Error('Report file not generated');
    }
  } catch (err) {
    console.log(`  Failed: ${err.message?.slice(0, 100)}`);
    results.sites.push({
      company: site.company,
      url: site.url,
      specialty: site.specialty,
      estimatedEmployees: site.employees,
      score: null,
      riskLevel: null,
      counts: null,
      topIssues: [],
      scanError: err.message?.slice(0, 200) || 'Unknown error',
      reportJsonPath: null,
    });
    results.summary.failedScans++;
  }
}

results.summary.avgScore = results.sites.filter(s => s.score != null).length > 0
  ? Math.round(results.sites.filter(s => s.score != null).reduce((a, s) => a + s.score, 0) / results.sites.filter(s => s.score != null).length)
  : 0;

const outPath = join(OUTPUT_DIR, 'healthcare-combined-results.json');
writeFileSync(outPath, JSON.stringify(results, null, 2));
console.log(`\nResults written to: ${outPath}`);
console.log(`Successful: ${results.summary.successfulScans}/${results.summary.totalScanned}`);
console.log(`Avg score: ${results.summary.avgScore}`);
