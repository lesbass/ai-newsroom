/**
 * Worker routing and host-policy checks.
 *
 * Runs without a build or a browser: it imports the same `src/worker.js` that
 * Cloudflare runs and calls its fetch handler with a stub ASSETS binding.
 *
 * Guards:
 *  - the canonical site host is served untouched (no noindex header);
 *  - the `*.workers.dev` deployment host serves the same pages but sends
 *    `X-Robots-Tag: noindex`, so the duplicate host cannot be indexed;
 *  - local development is not redirected or marked noindex;
 *  - http upgrades, slashless page 301s, provenance 301s, and asset/404
 *    pass-through still behave as before.
 */

import assert from 'node:assert/strict';
import worker from '../src/worker.js';

const ASSETS_BODY = '<!doctype html><title>asset</title>';
const assets = {
  fetch: () =>
    new Response(ASSETS_BODY, {
      status: 200,
      headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=300' },
    }),
};

async function call(url, init = {}) {
  return worker.fetch(new Request(url, init), { ASSETS: assets });
}

const results = [];
async function check(name, fn) {
  try {
    await fn();
    results.push({ name, pass: true });
    console.log(`✅ ${name}`);
  } catch (error) {
    results.push({ name, pass: false, error });
    console.log(`❌ ${name}`);
    console.log(`   ${error.message}`);
  }
}

await check('canonical host is served without a noindex header', async () => {
  const res = await call('https://news.lesbass.com/');
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('x-robots-tag'), null);
  assert.equal(await res.text(), ASSETS_BODY);
});

await check('workers.dev alias host sends X-Robots-Tag: noindex', async () => {
  const res = await call('https://ai-newsroom.lesbass.workers.dev/');
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('x-robots-tag'), 'noindex');
  assert.equal(res.headers.get('content-type'), 'text/html; charset=utf-8');
  assert.equal(await res.text(), ASSETS_BODY, 'body must be forwarded');
});

await check('workers.dev alias keeps the upstream status', async () => {
  const notFoundAssets = { fetch: () => new Response('missing', { status: 404 }) };
  const res = await worker.fetch(
    new Request('https://ai-newsroom.lesbass.workers.dev/nope.png'),
    { ASSETS: notFoundAssets },
  );
  assert.equal(res.status, 404);
  assert.equal(res.headers.get('x-robots-tag'), 'noindex');
});

await check('workers.dev alias still 301s slashless page routes', async () => {
  const res = await call('https://ai-newsroom.lesbass.workers.dev/articles');
  assert.equal(res.status, 301);
  assert.equal(res.headers.get('location'), 'https://ai-newsroom.lesbass.workers.dev/articles/');
});

await check('workers.dev alias still 301s provenance links', async () => {
  const res = await call('https://ai-newsroom.lesbass.workers.dev/paperclip/AIN-874');
  assert.equal(res.status, 301);
  assert.equal(res.headers.get('location'), 'https://paperclip.lesbass.com/AIN/issues/AIN-874');
});

await check('localhost is neither upgraded to https nor marked noindex', async () => {
  const res = await call('http://localhost:4321/');
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('x-robots-tag'), null);
});

await check('plain http is 301ed to https on the same host', async () => {
  const res = await call('http://news.lesbass.com/articles');
  assert.equal(res.status, 301);
  assert.equal(res.headers.get('location'), 'https://news.lesbass.com/articles');
});

await check('assets with a dot are passed through untouched', async () => {
  for (const path of ['/rss.xml', '/sitemap.xml', '/logo.png', '/_astro/app.css']) {
    const res = await call(`https://news.lesbass.com${path}`);
    assert.equal(res.status, 200, path);
    assert.equal(await res.text(), ASSETS_BODY, path);
  }
});

const failed = results.filter((r) => !r.pass);
if (failed.length > 0) {
  console.error(`\n${failed.length}/${results.length} worker check(s) failed`);
  process.exit(1);
}
console.log(`\n✅ Worker routing/host checks passed (${results.length} cases)`);
