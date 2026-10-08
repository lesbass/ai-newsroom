import { execSync } from 'node:child_process';
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve('.');
const reportsDir = join(root, '.audit-reports');
if (!existsSync(reportsDir)) mkdirSync(reportsDir, { recursive: true });

const now = new Date();
const ts = now.toISOString().replace(/T/, ' ').replace(/\..+/, ' UTC');
const dateFile = now.toISOString().split('T')[0];

const checkUrl = process.env.CHECK_URL || '';
const urlEnv = checkUrl ? { CHECK_URL: checkUrl, ...process.env } : process.env;

if (checkUrl) {
  console.log(`ℹ Live-check mode: ${checkUrl}`);
} else {
  console.log('ℹ Running against dist/ (set CHECK_URL for live-site checks)');
}

const results = [];
const checks = [
  ['Build', 'npm run build'],
  ['TypeCheck', 'npm run check'],
  ['Lint', 'npm run lint'],
  ['Links', 'npm run test:links'],
  ['Mobile', 'npm run test:mobile'],
  ['SEO', 'npm run test:seo'],
  ['SitemapLastmod', 'npm run test:sitemap-lastmod'],
  ['Images', 'npm run test:images'],
  ['Dates', 'npm run test:dates'],
  ['Contrast', 'npm run test:contrast'],
  ['Targets', 'npm run test:targets'],
];

for (const [name, cmd] of checks) {
  try {
    // Browser-backed checks (test:targets) launch Chromium twice and navigate
    // a page set, so they need more headroom than the static scripts.
    const out = execSync(`${cmd} 2>&1`, { cwd: root, encoding: 'utf-8', timeout: 300000, env: urlEnv });
    const text = out.trim();
    const pass = !text.includes('❌');
    results.push({ name, pass, output: text });
    console.log(text);
  } catch (e) {
    const text = (e.stdout || '') + (e.stderr || '') || e.message;
    results.push({ name, pass: false, output: text.trim() });
    console.log(text);
  }
}

const failed = results.filter(r => !r.pass).length;

const summary = [
  `# Daily Audit Report — ${ts}`,
  '',
  `| Check | Status |`,
  `|-------|--------|`,
  ...results.map(r => `| ${r.name} | ${r.pass ? '✅ PASS' : '❌ FAIL'} |`),
  '',
  `**Result:** ${failed === 0 ? 'All checks passed' : `${failed} check(s) failed`}`,
  '',
  '---',
  '',
  ...results.map(r => `## ${r.name}\n\n\`\`\`\n${r.output}\n\`\`\`\n`),
].join('\n');

const reportPath = join(reportsDir, `${dateFile}.md`);
writeFileSync(reportPath, summary);
console.log(`\n📋 Report saved: ${reportPath}`);

process.exit(failed > 0 ? 1 : 0);
