import { execSync } from 'node:child_process';
import { writeFileSync, mkdirSync, existsSync, mkdtempSync, rmSync, symlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const repoRoot = resolve('.');
const reportsDir = join(repoRoot, '.audit-reports');
if (!existsSync(reportsDir)) mkdirSync(reportsDir, { recursive: true });

const now = new Date();
const ts = now.toISOString().replace(/T/, ' ').replace(/\..+/, ' UTC');
const dateFile = now.toISOString().split('T')[0];

const checkUrl = process.env.CHECK_URL || '';

// Deploy-provenance for the freshness check: the newest `main` commit must be on
// production shortly after it lands. Captured here (before the isolated HEAD
// export drops `.git`) so the live check can compare it against the deployed
// RSS <lastBuildDate> even when run from the exported tree.
function newestMainCommitDate() {
  for (const ref of ['origin/main', 'HEAD']) {
    try {
      const iso = execSync(`git log -1 --format=%cI ${ref}`, { cwd: repoRoot, encoding: 'utf-8' }).trim();
      if (iso) return iso;
    } catch { /* ref or git unavailable — try the next source */ }
  }
  return '';
}
const mainCommitDate = newestMainCommitDate();
const urlEnv = {
  ...(checkUrl ? { CHECK_URL: checkUrl } : {}),
  ...(mainCommitDate ? { MAIN_COMMIT_DATE: mainCommitDate } : {}),
  ...process.env,
};

// The deployed artifact is built from the committed tree (HEAD). Agent sandboxes
// accumulate untracked, abandoned drafts under src/content and public/images, and
// those would otherwise be built into dist/ and produce false link/image failures.
// Unless AUDIT_WORKTREE=dirty is set, run the build and file-based checks against
// an isolated export of HEAD so the audit reflects what actually ships.
function prepareBuildRoot() {
  if (process.env.AUDIT_WORKTREE === 'dirty') {
    console.log('ℹ Auditing the working tree (AUDIT_WORKTREE=dirty)');
    return { root: repoRoot, cleanup: () => {} };
  }
  try {
    execSync('git rev-parse --verify HEAD', { cwd: repoRoot, stdio: 'ignore' });
    const dir = mkdtempSync(join(tmpdir(), 'ai-newsroom-audit-'));
    execSync(`git archive HEAD | tar -x -C ${JSON.stringify(dir)}`, { cwd: repoRoot, shell: '/bin/bash' });
    const modules = join(repoRoot, 'node_modules');
    if (existsSync(modules)) symlinkSync(modules, join(dir, 'node_modules'), 'dir');
    console.log(`ℹ Auditing an isolated export of HEAD: ${dir}`);
    return { root: dir, cleanup: () => { try { rmSync(dir, { recursive: true, force: true }); } catch { /* best-effort cleanup */ } } };
  } catch (e) {
    console.log(`ℹ Falling back to the working tree (${String(e.message).split('\n')[0]})`);
    return { root: repoRoot, cleanup: () => {} };
  }
}

const { root, cleanup } = prepareBuildRoot();

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
  ['ImageFixtures', 'npm run test:images-fixtures'],
  ['Images', 'npm run test:images'],
  ['Dates', 'npm run test:dates'],
  ['Contrast', 'npm run test:contrast'],
  ['Targets', 'npm run test:targets'],
  ['A11y', 'npm run test:a11y'],
  ['Glyphs', 'npm run test:glyphs'],
  ['HeadlineBreaks', 'npm run test:headline'],
  ['HeadlineOverflow', 'npm run test:headline-overflow'],
  ['DeployFreshness', 'npm run test:deploy-freshness'],
];

for (const [name, cmd] of checks) {
  try {
    // Browser-backed checks (test:targets, test:a11y) launch Chromium and
    // navigate a page set, so they need more headroom than the static scripts.
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

cleanup();

process.exit(failed > 0 ? 1 : 0);
