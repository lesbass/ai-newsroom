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

// Clean URLs never match the `/*.html` rule in public/_headers, so the Worker
// applies the 5-minute HTML cache itself. Without it every navigation
// revalidates (AIN-1046).
try {
  for (const path of ['/', '/articles/']) {
    const resp = await fetch(`${baseUrl}${path}`, {
      method: 'HEAD',
      headers: { 'Cache-Control': 'no-cache' },
    });
    const cacheControl = resp.headers.get('cache-control') || '';
    if (/max-age=300/.test(cacheControl)) {
      pass(`HTML ${path} is browser-cacheable (${cacheControl})`);
    } else {
      fail(
        `HTML ${path} cache-control is "${cacheControl || 'missing'}" — expected max-age=300 (AIN-1046)`,
      );
    }
  }
} catch (e) {
  fail(`HTML cache-control could not be checked (${e.message})`);
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

// The sitemap, feed, and robots file are fetched directly by crawlers and feed
// readers, bypassing the HTML cache and the page-level checks above. A base-URL
// or deployment regression (the exact failure the board keeps flagging) shows
// up here first, so gate the live artifacts themselves rather than relying on
// an operator remembering the manual curl steps.
function absoluteUrls(xml) {
  return [...xml.matchAll(/(?:<loc>|<link>|<guid[^>]*>|<enclosure[^>]*url=")([^"<]+)/g)]
    .map(match => match[1])
    .filter(value => /^https?:\/\//i.test(value));
}

function assertCanonicalUrls(label, xml) {
  const urls = absoluteUrls(xml);
  if (urls.length === 0) {
    fail(`${label} contains no absolute URLs`);
    return;
  }
  const foreign = urls.filter(value => {
    try {
      return new URL(value).origin !== CANONICAL_ORIGIN;
    } catch {
      return true;
    }
  });
  if (foreign.length > 0) {
    fail(`${label} has ${foreign.length} URL(s) outside ${CANONICAL_ORIGIN} (e.g. ${foreign[0]})`);
  } else {
    pass(`${label} uses only ${CANONICAL_ORIGIN} (${urls.length} URLs)`);
  }
}

async function fetchArtifact(path, expectedType) {
  const url = `${baseUrl}${path}`;
  try {
    const resp = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
    if (!resp.ok) {
      fail(`${url} returned HTTP ${resp.status}`);
      return null;
    }
    const type = resp.headers.get('content-type') || '';
    if (!expectedType.test(type)) {
      fail(`${url} content-type is "${type || 'missing'}"`);
      return null;
    }
    return resp.text();
  } catch (e) {
    fail(`${url} could not be fetched (${e.message})`);
    return null;
  }
}

if (rss !== null) assertCanonicalUrls('/rss.xml', rss);

const sitemap = await fetchArtifact('/sitemap.xml', /xml/i);
if (sitemap !== null) assertCanonicalUrls('/sitemap.xml', sitemap);

const robots = await fetchText('/robots.txt');
if (robots !== null && !robots.includes(`Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml`)) {
  fail(`/robots.txt does not point at ${CANONICAL_ORIGIN}/sitemap.xml`);
} else if (robots !== null) {
  pass('/robots.txt points at the canonical sitemap');
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

// `_redirects` destinations are written without the trailing slash, so the
// Worker upgrades them to the canonical directory URL to avoid a second hop.
const REDIRECT_HOPS = [
  ['/tags/agent-auth/', '/tags/security/'],
  [
    '/articles/smolagents-hugging-face-agenti-codice-python/',
    '/articles/smolagents-hugging-face-agents-code-python/',
  ],
];
for (const [path, expected] of REDIRECT_HOPS) {
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
      pass(`${path} resolves to ${expected} in one hop`);
    } else {
      fail(`${path} returned HTTP ${resp.status} with Location "${location}", expected 301 to ${expected}`);
    }
  } catch (e) {
    fail(`${baseUrl}${path} could not be fetched (${e.message})`);
  }
}

// An explicit /index.html is a duplicate copy of a directory URL and must not
// be served with a temporary redirect.
try {
  const resp = await fetch(`${baseUrl}/index.html`, {
    redirect: 'manual',
    headers: { 'Cache-Control': 'no-cache' },
  });
  const location = resp.headers.get('location') || '';
  if (resp.status === 301 && new URL(location, baseUrl).pathname === '/') {
    pass('/index.html 301s to /');
  } else {
    fail(`/index.html returned HTTP ${resp.status} with Location "${location}", expected 301 to /`);
  }
} catch (e) {
  fail(`${baseUrl}/index.html could not be fetched (${e.message})`);
}

if (failures.length > 0) {
  console.error(`❌ live-deploy verification failed (${failures.length} issue${failures.length === 1 ? '' : 's'})`);
  process.exit(1);
}

console.log('✅ live deploy serves the arrow fix, symbol font, canonical host, RSS, and security headers');
