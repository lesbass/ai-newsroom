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
 *    pass-through still behave as before;
 *  - clean-URL HTML responses carry the 5-minute cache policy; non-HTML assets
 *    and 404 pages keep their own upstream Cache-Control.
 */

import assert from 'node:assert/strict';
import worker from '../src/worker.js';

const ASSETS_BODY = '<!doctype html><title>asset</title>';
const assets = {
  fetch: () =>
    new Response(ASSETS_BODY, {
      status: 200,
      headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=0, must-revalidate' },
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

await check('duplicate slashes 301 to the canonical directory path', async () => {
  for (const [path, expected] of [
    ['//articles//', 'https://news.lesbass.com/articles/'],
    ['/tags//security/', 'https://news.lesbass.com/tags/security/'],
  ]) {
    const res = await call(`https://news.lesbass.com${path}`);
    assert.equal(res.status, 301, path);
    assert.equal(res.headers.get('location'), expected, path);
  }
});

await check('explicit /index.html 301s to the directory URL', async () => {
  for (const [path, expected] of [
    ['/index.html', 'https://news.lesbass.com/'],
    ['/articles/index.html', 'https://news.lesbass.com/articles/'],
  ]) {
    const res = await call(`https://news.lesbass.com${path}`);
    assert.equal(res.status, 301, path);
    assert.equal(res.headers.get('location'), expected, path);
  }
});

await check('_redirects page destinations skip the extra trailing-slash hop', async () => {
  const redirectAssets = {
    fetch: () =>
      new Response(null, {
        status: 301,
        headers: { location: '/tags/security' },
      }),
  };
  const res = await worker.fetch(
    new Request('https://news.lesbass.com/tags/agent-auth/'),
    { ASSETS: redirectAssets },
  );
  assert.equal(res.status, 301);
  assert.equal(res.headers.get('location'), 'https://news.lesbass.com/tags/security/');
});

await check('_redirects external and file destinations stay untouched', async () => {
  for (const location of ['https://example.com/x', '/rss.xml']) {
    const redirectAssets = {
      fetch: () => new Response(null, { status: 301, headers: { location } }),
    };
    const res = await worker.fetch(
      new Request('https://news.lesbass.com/tags/agent-auth/'),
      { ASSETS: redirectAssets },
    );
    assert.equal(res.headers.get('location'), location);
  }
});

await check('assets with a dot are passed through untouched', async () => {
  const assetBody = 'body{}';
  const assetAssets = {
    fetch: () =>
      new Response(assetBody, {
        status: 200,
        headers: { 'content-type': 'text/css', 'cache-control': 'public, max-age=3600' },
      }),
  };
  for (const path of ['/rss.xml', '/sitemap.xml', '/logo.png', '/_astro/app.css']) {
    const res = await worker.fetch(
      new Request(`https://news.lesbass.com${path}`),
      { ASSETS: assetAssets },
    );
    assert.equal(res.status, 200, path);
    assert.equal(await res.text(), assetBody, path);
    assert.equal(res.headers.get('cache-control'), 'public, max-age=3600', path);
    assert.equal(res.headers.get('x-robots-tag'), null, path);
  }
});

// Clean URLs map to index.html internally, so the `/*.html` rule in
// public/_headers never matches them. The Worker must apply the 5-minute HTML
// cache itself, otherwise every navigation revalidates (AIN-1046).
await check('clean-URL HTML responses get the 5-minute cache policy', async () => {
  for (const path of ['/', '/articles/', '/articles/example/', '/tags/security/']) {
    const res = await call(`https://news.lesbass.com${path}`);
    assert.equal(
      res.headers.get('cache-control'),
      'public, max-age=300, must-revalidate',
      path,
    );
  }
});

await check('the workers.dev alias also gets the 5-minute HTML cache policy', async () => {
  const res = await call('https://ai-newsroom.lesbass.workers.dev/');
  assert.equal(res.headers.get('cache-control'), 'public, max-age=300, must-revalidate');
  assert.equal(res.headers.get('x-robots-tag'), 'noindex');
});

await check('non-HTML assets keep their upstream cache-control', async () => {
  const imageAssets = {
    fetch: () =>
      new Response('png', {
        status: 200,
        headers: { 'content-type': 'image/png', 'cache-control': 'public, max-age=86400' },
      }),
  };
  const res = await worker.fetch(
    new Request('https://news.lesbass.com/logo.png'),
    { ASSETS: imageAssets },
  );
  assert.equal(res.headers.get('cache-control'), 'public, max-age=86400');
});

await check('404 HTML is not cached as fresh', async () => {
  const notFoundAssets = {
    fetch: () =>
      new Response('<!doctype html><title>Not found</title>', {
        status: 404,
        headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
      }),
  };
  const res = await worker.fetch(
    new Request('https://news.lesbass.com/missing/'),
    { ASSETS: notFoundAssets },
  );
  assert.equal(res.status, 404);
  assert.equal(res.headers.get('cache-control'), 'no-store');
});

const failed = results.filter((r) => !r.pass);
if (failed.length > 0) {
  console.error(`\n${failed.length}/${results.length} worker check(s) failed`);
  process.exit(1);
}
console.log(`\n✅ Worker routing/host checks passed (${results.length} cases)`);
