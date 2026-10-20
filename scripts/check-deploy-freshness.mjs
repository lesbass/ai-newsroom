import { execSync } from 'node:child_process';

// Deploy-freshness watchdog: detect a stalled Cloudflare Workers Build.
//
// Recurrence history:
//   AIN-903 (2026-10-07, main a5b1116) and AIN-953 (2026-10-13, main d61f8c9).
//   In both cases the GitHub `cloudflare-workers-and-pages` check suite stayed
//   `queued` with no check run ever created, so production never rebuilt and the
//   newest article served HTTP 404 until a harmless re-push to `main` re-triggered
//   the Workers Build.
//   AIN-969 (2026-10-13 onward): every push now gets a `Workers Builds` check run
//   that fails in the same second with 0 annotations and no log, and re-pushing no
//   longer helps. Production stays on the last good artifact until a human repairs
//   Workers Builds in the Cloudflare dashboard or deploys with
//   `scripts/deploy-fallback.sh` (Workers Scripts:Edit token).
//
// This check compares the newest `main` commit time with the deployed RSS build
// timestamp (`<lastBuildDate>`, written at build time). A healthy deploy keeps
// production at or ahead of `main`; a stall leaves production behind by more than
// the grace window, so the check exits non-zero and the daily audit surfaces it.

const GRACE_MINUTES = Number(process.env.DEPLOY_FRESHNESS_GRACE_MINUTES || 10);
// This check is inherently live: it compares the deployed RSS build time with the
// newest local commit. Default to the canonical production host so the daily audit
// cannot report a green deploy-freshness line without ever contacting production.
const baseUrl = (process.env.CHECK_URL || 'https://news.lesbass.com').replace(/\/$/, '');
const rssUrl = `${baseUrl}/rss.xml`;

function newestMainCommit() {
  if (process.env.MAIN_COMMIT_DATE) {
    return { date: new Date(process.env.MAIN_COMMIT_DATE), source: 'MAIN_COMMIT_DATE env' };
  }
  for (const ref of ['origin/main', 'HEAD']) {
    try {
      const iso = execSync(`git log -1 --format=%cI ${ref}`, { encoding: 'utf-8' }).trim();
      if (iso) return { date: new Date(iso), source: ref };
    } catch { /* ref or git unavailable — try the next source */ }
  }
  return null;
}

const main = newestMainCommit();
if (!main || Number.isNaN(main.date.getTime())) {
  console.error('❌ deploy-freshness: could not determine the newest main commit; pass MAIN_COMMIT_DATE when git is unavailable');
  process.exit(1);
}

let liveBuildDate;
try {
  const resp = await fetch(rssUrl, { headers: { 'Cache-Control': 'no-cache' } });
  if (!resp.ok) {
    console.error(`❌ deploy-freshness: ${rssUrl} returned HTTP ${resp.status}`);
    process.exit(1);
  }
  const match = (await resp.text()).match(/<lastBuildDate>([^<]+)<\/lastBuildDate>/);
  if (!match) {
    console.error(`❌ deploy-freshness: no <lastBuildDate> found in ${rssUrl}`);
    process.exit(1);
  }
  liveBuildDate = new Date(match[1]);
} catch (e) {
  console.error(`❌ deploy-freshness: could not fetch ${rssUrl} (${e.message})`);
  process.exit(1);
}

if (Number.isNaN(liveBuildDate.getTime())) {
  console.error('❌ deploy-freshness: live <lastBuildDate> is not a valid date');
  process.exit(1);
}

// The Workers Build runs after the commit, so a fresh deploy has
// liveBuildDate >= mainCommitDate. A stall leaves liveBuildDate behind.
const behindMinutes = (main.date.getTime() - liveBuildDate.getTime()) / 60000;
const relation = behindMinutes >= 0 ? 'behind' : 'ahead of';
console.log(`ℹ newest main commit: ${main.date.toISOString()} (${main.source})`);
console.log(`ℹ live RSS <lastBuildDate>: ${liveBuildDate.toISOString()}`);
console.log(`ℹ production is ${Math.abs(behindMinutes).toFixed(1)} min ${relation} main (grace ${GRACE_MINUTES} min)`);

if (behindMinutes > GRACE_MINUTES) {
  console.error(`❌ deploy-freshness: production has not rebuilt ${behindMinutes.toFixed(1)} min after the newest main commit — the Workers Build is stalled or failing (AIN-903/AIN-953/AIN-969). Re-pushing no longer helps: recover with CLOUDFLARE_API_TOKEN=<Workers Scripts:Edit> scripts/deploy-fallback.sh, or repair the Workers Build in the Cloudflare dashboard.`);
  process.exit(1);
}
console.log('✅ production is fresh (within the deploy-freshness grace window)');
