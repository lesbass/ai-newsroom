const baseUrl = (process.env.CHECK_URL || 'https://news.lesbass.com').replace(/\/$/, '');
const CANONICAL_ORIGIN = 'https://news.lesbass.com';

const failures = [];

function fail(message) {
  failures.push(message);
  console.error(`❌ ${message}`);
}

function pass(message) {
  console.log(`✅ ${message}`);
}

async function fetchText(path, init) {
  const url = `${baseUrl}${path}`;
  let resp;
  try {
    resp = await fetch(url, { ...init, headers: { 'Cache-Control': 'no-cache' } });
  } catch (e) {
    fail(`${url} could not be fetched (${e.message})`);
    return null;
  }
  if (!resp.ok) {
    fail(`${url} returned HTTP ${resp.status}`);
    return null;
  }
  return resp.text();
}

const home = await fetchText('/');
if (home !== null) {
  const canonical = home.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
  const canonicalHref = canonical?.[1]?.replace(/\/$/, '');
  if (canonicalHref === CANONICAL_ORIGIN) {
    pass(`canonical host is ${CANONICAL_ORIGIN}/`);
  } else {
    fail(`canonical is ${canonical?.[1] ?? 'missing'}, expected ${CANONICAL_ORIGIN}/`);
  }

  const arrowCount = (home.match(/icon-arrow/g) || []).length;
  if (arrowCount > 0) {
    pass(`homepage renders ${arrowCount} icon-arrow glyph(s)`);
  } else {
    fail('homepage has no icon-arrow markup — the AIN-969 arrow fix is not deployed');
  }
}

// Security headers come from public/_headers at the edge. A dropped CSP or
// HSTS is invisible in the page HTML, so gate the set from the live response.
const REQUIRED_SECURITY_HEADERS = [
  ['content-security-policy', /default-src 'self'/],
  ['strict-transport-security', /max-age=31536000/],
  ['x-content-type-options', /^nosniff$/i],
  ['x-frame-options', /^DENY$/i],
  ['referrer-policy', /^strict-origin-when-cross-origin$/i],
  ['permissions-policy', /camera=\(\)/],
];

try {
  const resp = await fetch(`${baseUrl}/`, {
    method: 'HEAD',
    headers: { 'Cache-Control': 'no-cache' },
  });
  if (!resp.ok) {
    fail(`HEAD ${baseUrl}/ returned HTTP ${resp.status}`);
  } else {
    for (const [name, pattern] of REQUIRED_SECURITY_HEADERS) {
      const value = resp.headers.get(name);
      if (value && pattern.test(value)) {
        pass(`security header ${name} present`);
      } else {
        fail(`security header ${name} is ${value ? `"${value}"` : 'missing'}`);
      }
    }
    if (/noindex/i.test(resp.headers.get('x-robots-tag') || '')) {
      fail(`canonical host sends X-Robots-Tag: noindex — the site would drop out of search`);
    } else {
      pass('canonical host is indexable (no X-Robots-Tag noindex)');
    }
  }
} catch (e) {
  fail(`HEAD ${baseUrl}/ could not be fetched (${e.message})`);
}

// The Worker also answers on its *.workers.dev deployment hostname, which serves
// the same pages. That copy must stay out of search indexes so it cannot rank as
// a duplicate of the canonical site. Only checked when the target is production.
if (baseUrl === CANONICAL_ORIGIN) {
  const aliasUrl = 'https://ai-newsroom.lesbass.workers.dev/';
  try {
    const resp = await fetch(aliasUrl, { method: 'HEAD', headers: { 'Cache-Control': 'no-cache' } });
    if (!resp.ok) {
      fail(`${aliasUrl} returned HTTP ${resp.status}`);
    } else if (/noindex/i.test(resp.headers.get('x-robots-tag') || '')) {
      pass('workers.dev alias host sends X-Robots-Tag: noindex');
    } else {
      fail(`${aliasUrl} is indexable (missing X-Robots-Tag: noindex)`);
    }
  } catch (e) {
    fail(`${aliasUrl} could not be fetched (${e.message})`);
  }
}

const fontUrl = `${baseUrl}/fonts/ai-newsroom-symbols.woff`;
try {
  const resp = await fetch(fontUrl, { headers: { 'Cache-Control': 'no-cache' } });
  if (!resp.ok) {
    fail(`${fontUrl} returned HTTP ${resp.status}`);
  } else {
    const bytes = (await resp.arrayBuffer()).byteLength;
    if (bytes > 1000) {
      pass(`symbol font served (${bytes} bytes)`);
    } else {
      fail(`${fontUrl} returned only ${bytes} bytes`);
    }
  }
} catch (e) {
  fail(`${fontUrl} could not be fetched (${e.message})`);
}

const rss = await fetchText('/rss.xml');
if (rss !== null) {
  const lastBuildDate = rss.match(/<lastBuildDate>([^<]+)<\/lastBuildDate>/)?.[1];
  const parsed = lastBuildDate ? new Date(lastBuildDate) : null;
  if (parsed && !Number.isNaN(parsed.getTime())) {
    pass(`RSS lastBuildDate is ${parsed.toISOString()}`);
  } else {
    fail('/rss.xml has no valid <lastBuildDate>');
  }
}

// Page routes are directories with an index.html, so the canonical form ends in
// `/`. The Worker must answer the slashless form with a 301 (permanent), not the
// asset handler's 307 (temporary), so search engines consolidate on the slash
// URL. Files keep their extension and must not be rewritten.
const SLASHLESS_PAGE_ROUTES = ['/articles', '/tags', '/corrections'];
for (const path of SLASHLESS_PAGE_ROUTES) {
  const expected = `${path}/`;
  try {
    const resp = await fetch(`${baseUrl}${path}`, {
      redirect: 'manual',
      headers: { 'Cache-Control': 'no-cache' },
    });
    const location = resp.headers.get('location') || '';
    let locationPath = '';
    try {
      locationPath = new URL(location, baseUrl).pathname;
    } catch { /* unparsable Location — reported below */ }
    if (resp.status === 301 && locationPath === expected) {
      pass(`${path} 301s to ${expected}`);
    } else {
      fail(`${path} returned HTTP ${resp.status} with Location "${location}", expected 301 to ${expected}`);
    }
  } catch (e) {
    fail(`${baseUrl}${path} could not be fetched (${e.message})`);
  }
}

if (failures.length > 0) {
  console.error(`❌ live-deploy verification failed (${failures.length} issue${failures.length === 1 ? '' : 's'})`);
  process.exit(1);
}

console.log('✅ live deploy serves the arrow fix, symbol font, canonical host, RSS, and security headers');
