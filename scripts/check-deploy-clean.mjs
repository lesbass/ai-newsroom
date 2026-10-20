/**
 * Refuse to deploy from a checkout with uncommitted content.
 *
 * `npm run deploy` builds the working tree, so an unfinished article draft or a
 * screenshot that was never committed would be uploaded to production. Only
 * committed content should reach the site, and it should be the content that
 * passed review. Set ALLOW_DIRTY=1 only for a deliberate local deploy.
 */

import { execFileSync } from 'node:child_process';

if (process.env.ALLOW_DIRTY === '1') {
  process.exit(0);
}

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8' });
}

try {
  git(['rev-parse', '--is-inside-work-tree']);
} catch {
  console.error('error: run this from a git checkout of ai-newsroom');
  process.exit(1);
}

const dirty = git([
  'status',
  '--porcelain',
  '--untracked-files=all',
  '--',
  'src/content',
  'public',
]).trim();

if (dirty) {
  console.error(
    'error: uncommitted content under src/content or public; commit or clean it before deploying:',
  );
  for (const line of dirty.split('\n')) console.error(`  ${line}`);
  console.error('       (set ALLOW_DIRTY=1 only for a deliberate local deploy)');
  process.exit(1);
}
