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

if (failures.length > 0) {
  console.error(`❌ live-deploy verification failed (${failures.length} issue${failures.length === 1 ? '' : 's'})`);
  process.exit(1);
}

console.log('✅ live deploy serves the arrow fix, symbol font, canonical host, and RSS');
