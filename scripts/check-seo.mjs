import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { readImageSizeFile } from './lib/image-size.mjs';

const dist = resolve('dist');
const baseUrl = process.env.CHECK_URL || '';

// Canonical production origin (matches `site` in astro.config.mjs). Every absolute
// URL a crawler reads for our own pages — canonical, og:url, sitemap <loc>, RSS
// <link>/<guid>, robots.txt Sitemap: — must stay on this origin. Legacy hosts
// (ai-newsroom.pages.dev, ai-newsroom.lesbass.workers.dev) are not production.
const CANONICAL_ORIGIN = 'https://news.lesbass.com';

// Support new Cloudflare adapter output: static assets in dist/client/
const clientDir = join(dist, 'client');
const assetBase = existsSync(clientDir) ? clientDir : dist;

function* walk(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    let s;
    try { s = statSync(path); } catch { continue; }
    if (s.isDirectory()) yield* walk(path);
    else if (path.endsWith('.html') || path.endsWith('.xml')) yield path;
  }
}

let errors = 0;
let warnings = 0;

// Base-URL guard: an absolute URL that does not resolve to CANONICAL_ORIGIN is a
// deployment/base-URL defect (wrong `site`, stale redirect, legacy host), not a
// content defect — fail loudly so it cannot ship silently.
function checkCanonicalOrigin(where, field, url) {
  if (!url) return;
  let origin;
  try {
    origin = new URL(url).origin;
  } catch {
    console.error(`❌ ${where}: ${field} is not an absolute URL: ${url}`);
    errors++;
    return;
  }
  if (origin !== CANONICAL_ORIGIN) {
    console.error(
      `❌ ${where}: ${field} points at ${origin}, expected ${CANONICAL_ORIGIN} (${url})`,
    );
    errors++;
  }
}

// Collect pages: from dist/ or from URL
const pagePaths = [...walk(dist)];

let fetchedSitemap = false;
let fetchedRss = false;

if (pagePaths.length === 0 && baseUrl) {
  console.log(`ℹ No HTML pages in dist/ — fetching from ${baseUrl}`);
  const pages = ['/', '/articles/', '/tags/', '/corrections/'];
  const fetchedPages = [];
  for (const p of pages) {
    try {
      const resp = await fetch(`${baseUrl.replace(/\/$/, '')}${p}`);
      if (resp.ok) {
        const html = await resp.text();
        fetchedPages.push({ path: `${dist}${p}index.html`, html });
      }
    } catch { /* skip unreachable pages */ }
  }
  // Also fetch the sitemap and RSS
  try {
    const sitemapResp = await fetch(`${baseUrl.replace(/\/$/, '')}/sitemap.xml`);
    if (sitemapResp.ok) {
      const xml = await sitemapResp.text();
      fetchedSitemap = true;
      fetchedPages.push({ path: join(assetBase, 'sitemap.xml'), html: xml });
    }
  } catch {
    /* sitemap.fetch failure is non-fatal */
  }
  try {
    const rssResp = await fetch(`${baseUrl.replace(/\/$/, '')}/rss.xml`);
    if (rssResp.ok) {
      const xml = await rssResp.text();
      fetchedRss = true;
      fetchedPages.push({ path: join(assetBase, 'rss.xml'), html: xml });
    }
  } catch {
    /* rss fetch failure is non-fatal */
  }

  for (const p of fetchedPages) {
    const rel = p.path.slice(dist.length);
    const html = p.html;
    checkPage(rel, html, p.path);
  }
} else if (pagePaths.length === 0) {
  console.warn('⚠ No HTML pages found in dist/ and no CHECK_URL set. Run with CHECK_URL=https://news.lesbass.com for live checks.');
  console.warn('⚠ Or run "npm run preview" then CHECK_URL=http://localhost:8788 node scripts/check-seo.mjs');
}

for (const path of pagePaths) {
  const rel = path.slice(dist.length);
  const html = readFileSync(path, 'utf-8');
  checkPage(rel, html, path);
}

function checkPage(rel, html, path) {
  // 1. Every HTML page must have a <title>
  if (path.endsWith('.html') || rel.endsWith('.html')) {
    if (!/<title>/.test(html) || !/<\/title>/.test(html)) {
      console.error(`❌ ${rel}: missing <title>`);
      errors++;
    } else {
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      if (titleMatch) {
        const title = titleMatch[1];
        if (title.length < 10) {
          console.warn(`⚠ ${rel}: title too short (${title.length} chars): "${title}"`);
          warnings++;
        }
        if (title.length > 70) {
          console.warn(`⚠ ${rel}: title may be too long for SERP (${title.length} chars)`);
          warnings++;
        }
      }
    }

    // 2. Meta description
    const descMatch = html.match(/<meta name="description" content="([^"]*)"/);
    if (!descMatch) {
      console.error(`❌ ${rel}: missing meta description`);
      errors++;
    } else {
      const desc = descMatch[1];
      if (desc.length < 40) {
        console.warn(`⚠ ${rel}: description too short (${desc.length} chars)`);
        warnings++;
      }
      if (desc.length > 160) {
        console.warn(`⚠ ${rel}: description may be too long for SERP (${desc.length} chars)`);
        warnings++;
      }
    }

    // 3. Canonical URL
    if (!/<link rel="canonical"/.test(html)) {
      console.error(`❌ ${rel}: missing canonical URL`);
      errors++;
    } else {
      const canonicalHref = html.match(/<link rel="canonical" href="([^"]+)"/);
      checkCanonicalOrigin(rel, 'rel=canonical', canonicalHref?.[1]);
    }

    // 4. Open Graph tags
    if (!/<meta property="og:title"/.test(html)) {
      console.error(`❌ ${rel}: missing og:title`);
      errors++;
    }
    if (!/<meta property="og:description"/.test(html)) {
      console.error(`❌ ${rel}: missing og:description`);
      errors++;
    }
    if (!/<meta property="og:url"/.test(html)) {
      console.error(`❌ ${rel}: missing og:url`);
      errors++;
    } else {
      const ogUrlMatch = html.match(/<meta property="og:url" content="([^"]+)"/);
      checkCanonicalOrigin(rel, 'og:url', ogUrlMatch?.[1]);
    }
    const twitterUrlMatch = html.match(/<meta name="twitter:url" content="([^"]+)"/);
    if (twitterUrlMatch) checkCanonicalOrigin(rel, 'twitter:url', twitterUrlMatch[1]);
    if (!/<meta property="og:type"/.test(html)) {
      console.error(`❌ ${rel}: missing og:type`);
      errors++;
    }
    if (!/<meta property="og:site_name"/.test(html)) {
      console.warn(`⚠ ${rel}: missing og:site_name`);
      warnings++;
    }
    if (!/<meta property="og:locale"/.test(html)) {
      console.warn(`⚠ ${rel}: missing og:locale`);
      warnings++;
    }

    // 5. Twitter cards
    if (!/<meta name="twitter:card"/.test(html)) {
      console.error(`❌ ${rel}: missing twitter:card`);
      errors++;
    }
    if (!/<meta name="twitter:title"/.test(html)) {
      console.error(`❌ ${rel}: missing twitter:title`);
      errors++;
    }
    if (!/<meta name="twitter:description"/.test(html)) {
      console.error(`❌ ${rel}: missing twitter:description`);
      errors++;
    }

    // 5b. Social preview image must be a raster file fetchers can render
    // (Facebook/X/LinkedIn/Slack/Discord ignore image/svg+xml), and any
    // og:image:width/height claim must match the bytes we actually ship.
    const ogImageMatch = html.match(/<meta property="og:image" content="([^"]*)"/);
    const twImageMatch = html.match(/<meta name="twitter:image" content="([^"]*)"/);
    if (!ogImageMatch) {
      console.error(`❌ ${rel}: missing og:image`);
      errors++;
    }
    for (const [label, match] of [['og:image', ogImageMatch], ['twitter:image', twImageMatch]]) {
      if (match && /\.svg([?#]|$)/i.test(match[1])) {
        console.error(`❌ ${rel}: ${label} points at an SVG (${match[1]}) — social fetchers will not render it`);
        errors++;
      }
    }
    if (ogImageMatch) {
      const ogUrl = ogImageMatch[1];
      const width = html.match(/<meta property="og:image:width" content="(\d+)"/);
      const height = html.match(/<meta property="og:image:height" content="(\d+)"/);
      if (width && !height) {
        console.warn(`⚠ ${rel}: og:image:width without og:image:height`);
        warnings++;
      }
      if (!width && !height && !/^https?:\/\//i.test(ogUrl)) {
        console.warn(`⚠ ${rel}: og:image has no width/height claim`);
        warnings++;
      }
      if (width && height && existsSync(assetBase)) {
        let localPath = null;
        if (ogUrl.startsWith('/')) localPath = ogUrl;
        else if (ogUrl.startsWith('https://news.lesbass.com/')) {
          localPath = ogUrl.slice('https://news.lesbass.com/'.length);
        }
        if (localPath) {
          const file = join(assetBase, localPath.split(/[?#]/)[0]);
          if (!existsSync(file)) {
            console.error(`❌ ${rel}: og:image file missing from build output (${localPath})`);
            errors++;
          } else {
            const size = readImageSizeFile(file);
            if (!size) {
              console.warn(`⚠ ${rel}: could not read dimensions of ${localPath}`);
              warnings++;
            } else if (size.width !== Number(width[1]) || size.height !== Number(height[1])) {
              console.error(
                `❌ ${rel}: og:image claims ${width[1]}x${height[1]} but ${localPath} is ${size.width}x${size.height}`,
              );
              errors++;
            }
          }
        }
      }
    }

    // 6. JSON-LD structured data
    if (!/<script type="application\/ld\+json">/.test(html)) {
      console.warn(`⚠ ${rel}: missing JSON-LD structured data`);
      warnings++;
    } else {
      const ldMatch = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
      if (ldMatch) {
        try {
          JSON.parse(ldMatch[1]);
        } catch {
          console.error(`❌ ${rel}: invalid JSON-LD`);
          errors++;
        }
      }
    }

    // 7. Article-specific checks
    if (html.includes('"@type":"NewsArticle"') || html.includes('"@type": "NewsArticle"')) {
      if (!/<meta property="article:published_time"/.test(html)) {
        console.warn(`⚠ ${rel}: NewsArticle missing article:published_time`);
        warnings++;
      }
    }

    // 8. H1 count
    const h1Matches = html.match(/<h1[^>]*>/g);
    if (!h1Matches || h1Matches.length === 0) {
      console.warn(`⚠ ${rel}: missing <h1>`);
      warnings++;
    } else if (h1Matches.length > 1) {
      console.warn(`⚠ ${rel}: multiple <h1> tags (${h1Matches.length})`);
      warnings++;
    }

    // 9. Viewport
    if (!/name="viewport"/.test(html) || !/width=device-width/.test(html)) {
      console.error(`❌ ${rel}: missing or incorrect viewport meta`);
      errors++;
    }

    // 10. Language attribute
    if (!/<html lang="en"/.test(html)) {
      console.warn(`⚠ ${rel}: missing or non-English lang attribute`);
      warnings++;
    }

    // 11. Images have alt text
    const imgTags = html.match(/<img[^>]*>/g);
    if (imgTags) {
      for (const img of imgTags) {
        // Handle > characters inside quoted attributes by checking for alt= pattern
        if (!/alt="[^"]*"/.test(img) && !/alt='[^']*'/.test(img) && !/alt=\S/.test(img)) {
          console.warn(`⚠ ${rel}: <img> missing alt attribute`);
          warnings++;
        }
      }
    }

    // 12. OG title should match <title> or be a longer version (SEO truncation is acceptable)
    const ogTitleMatch = html.match(/<meta property="og:title" content="([^"]*)"/);
    const titleTagMatch = html.match(/<title>([^<]+)<\/title>/);
    if (ogTitleMatch && titleTagMatch) {
      const decodeEntities = (s) => s.replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
        .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
      const ogTitle = decodeEntities(ogTitleMatch[1]);
      const htmlTitle = decodeEntities(titleTagMatch[1]);
      if (ogTitle !== htmlTitle && !ogTitle.startsWith(htmlTitle.slice(0, htmlTitle.length - 1))) {
        console.warn(`⚠ ${rel}: og:title "${ogTitle.slice(0,50)}..." differs unexpectedly from <title> "${htmlTitle.slice(0,50)}..."`);
        warnings++;
      }
    }

    // 13. Skip-to-content link
    if (!/<a[^>]*class="[^"]*skip-link[^"]*"/.test(html) && !/id="main-content"/.test(html)) {
      console.warn(`⚠ ${rel}: missing skip-to-content pattern`);
      warnings++;
    }

    // 14. Theme color
    if (!/<meta name="theme-color"/.test(html)) {
      console.warn(`⚠ ${rel}: missing theme-color meta`);
      warnings++;
    }

    // 15. Print styles
    if (!/@media print/.test(html)) {
      console.warn(`⚠ ${rel}: missing print styles`);
      warnings++;
    }
  }
}

// 16. Check that required files exist (look in client/ for Cloudflare adapter output)
if (!existsSync(join(assetBase, 'robots.txt'))) {
  console.error('❌ missing robots.txt');
  errors++;
}
if (!fetchedSitemap && !existsSync(join(assetBase, 'sitemap.xml'))) {
  console.error('❌ missing sitemap.xml');
  errors++;
}
if (!fetchedRss && !existsSync(join(assetBase, 'rss.xml'))) {
  console.error('❌ missing rss.xml');
  errors++;
}
if (!existsSync(join(assetBase, 'favicon.svg'))) {
  console.warn('⚠ missing favicon.svg');
  warnings++;
}
if (!existsSync(join(assetBase, 'og-image.png'))) {
  console.error('❌ missing og-image.png (raster social-preview fallback)');
  errors++;
}

// 17. Validate sitemap (skip XML structure checks if already validated via URL fetch)
if (!fetchedSitemap) {
  if (existsSync(join(assetBase, 'sitemap.xml'))) {
    const sitemap = readFileSync(join(assetBase, 'sitemap.xml'), 'utf-8');
    if (!/<\?xml/.test(sitemap)) {
      console.error('❌ sitemap.xml: missing XML declaration');
      errors++;
    }
    if (!/<urlset/.test(sitemap)) {
      console.error('❌ sitemap.xml: missing <urlset>');
      errors++;
    }
    if (!/<loc>/.test(sitemap)) {
      console.error('❌ sitemap.xml: no <loc> entries');
      errors++;
    }
    if (!/<lastmod>/.test(sitemap)) {
      console.warn('⚠ sitemap.xml: no <lastmod> entries');
      warnings++;
    }
  }
}

// 18. Validate RSS (skip XML structure checks if already validated via URL fetch)
if (!fetchedRss) {
  if (existsSync(join(assetBase, 'rss.xml'))) {
    const rss = readFileSync(join(assetBase, 'rss.xml'), 'utf-8');
    if (!/<rss/.test(rss)) {
      console.error('❌ rss.xml: missing <rss> root');
      errors++;
    }
    if (!/<channel>/.test(rss)) {
      console.error('❌ rss.xml: missing <channel>');
      errors++;
    }
    if (!/<item>/.test(rss)) {
      console.warn('⚠ rss.xml: no <item> entries');
      warnings++;
    }
  }
}

// 18b. Base-URL guard on sitemap / RSS / robots (CANONICAL_ORIGIN above).
// Reads the built artefacts when dist/ exists, otherwise the live CHECK_URL copy,
// so a wrong-base-URL deploy fails the same audit that would have shipped it.
function checkBulkCanonicalOrigin(where, field, urls) {
  const bad = urls.filter((u) => {
    try {
      return new URL(u).origin !== CANONICAL_ORIGIN;
    } catch {
      return true;
    }
  });
  if (bad.length > 0) {
    console.error(
      `❌ ${where}: ${bad.length}/${urls.length} ${field} entries are not on ${CANONICAL_ORIGIN} — e.g. ${bad.slice(0, 3).join(', ')}`,
    );
    errors++;
  }
}

async function loadArtifact(name, urlPath) {
  const local = join(assetBase, name);
  if (existsSync(local)) return readFileSync(local, 'utf-8');
  if (!baseUrl) return null;
  try {
    const resp = await fetch(`${baseUrl.replace(/\/$/, '')}${urlPath}`);
    if (resp.ok) return await resp.text();
  } catch {
    /* unreachable host: the fetch branch above already reported it */
  }
  return null;
}

const sitemapXml = await loadArtifact('sitemap.xml', '/sitemap.xml');
if (sitemapXml) {
  const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) {
    console.error('❌ sitemap.xml: no <loc> entries');
    errors++;
  }
  checkBulkCanonicalOrigin('sitemap.xml', '<loc>', locs);
}

const rssFeed = await loadArtifact('rss.xml', '/rss.xml');
if (rssFeed) {
  checkBulkCanonicalOrigin(
    'rss.xml',
    '<link>',
    [...rssFeed.matchAll(/<link>([^<]+)<\/link>/g)].map((m) => m[1]),
  );
  checkBulkCanonicalOrigin(
    'rss.xml',
    '<guid>',
    [...rssFeed.matchAll(/<guid[^>]*>([^<]+)<\/guid>/g)].map((m) => m[1]),
  );
  const atomHrefs = [...rssFeed.matchAll(/<atom:link[^>]*href="([^"]+)"/g)].map((m) => m[1]);
  if (atomHrefs.length > 0) checkBulkCanonicalOrigin('rss.xml', '<atom:link href>', atomHrefs);
}

const robotsTxt = await loadArtifact('robots.txt', '/robots.txt');
if (robotsTxt) {
  const sitemapLines = robotsTxt
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => /^sitemap:/i.test(l));
  if (sitemapLines.length === 0) {
    console.error('❌ robots.txt: missing Sitemap: line');
    errors++;
  }
  for (const line of sitemapLines) {
    checkCanonicalOrigin('robots.txt', 'Sitemap:', line.split(/\s+/)[1]);
  }
}

// 19. Tag redirect consistency: a /tags/<thin> 301 in public/_redirects must not
// point away from a tag that articles still carry — that 301s a live tag page out
// from under its own articles (AIN-719 consolidation guard).
const redirectsPath = resolve('public/_redirects');
if (existsSync(redirectsPath)) {
  const redirectSources = new Map();
  for (const line of readFileSync(redirectsPath, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [from, to] = trimmed.split(/\s+/);
    if (from?.startsWith('/tags/') && to?.startsWith('/tags/')) {
      redirectSources.set(from.slice('/tags/'.length), to.slice('/tags/'.length));
    }
  }

  const articlesDir = resolve('src/content/articles');
  if (redirectSources.size > 0 && existsSync(articlesDir)) {
    const hijacks = new Map();
    const usedTags = new Set();
    for (const entry of readdirSync(articlesDir)) {
      if (!entry.endsWith('.md')) continue;
      const raw = readFileSync(join(articlesDir, entry), 'utf-8');
      const fm = raw.startsWith('---') ? raw.slice(4, raw.indexOf('\n---', 4)) : '';
      if (!fm) continue;
      let tags = [];
      const inline = fm.match(/^tags:\s*\[([^\]]*)\]$/m);
      if (inline) {
        tags = inline[1].split(',').map((t) => t.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
      } else {
        const block = fm.match(/^tags:\n((?:[ \t]*-[ \t]*.*\n?)+)/m);
        if (block) {
          tags = block[1].split('\n')
            .map((ln) => ln.replace(/^[ \t]*-[ \t]*/, '').trim().replace(/^["']|["']$/g, ''))
            .filter(Boolean);
        }
      }
      for (const tag of tags) {
        usedTags.add(tag);
        if (redirectSources.has(tag)) {
          if (!hijacks.has(tag)) hijacks.set(tag, []);
          hijacks.get(tag).push(entry);
        }
      }
    }
    for (const [tag, files] of hijacks) {
      console.error(
        `❌ /tags/${tag} has a 301 to /tags/${redirectSources.get(tag)} but is still used by: ${files.join(', ')}`,
      );
      errors++;
    }
    // A /tags/ redirect whose target tag no article carries is a 301 to a 404.
    for (const target of new Set(redirectSources.values())) {
      if (!usedTags.has(target)) {
        console.error(`❌ /tags/ redirect points at /tags/${target}, which no article uses`);
        errors++;
      }
    }
  }
}

if (errors > 0) {
  console.error(`\n${errors} SEO error(s) found`);
}
if (warnings > 0) {
  console.warn(`${warnings} SEO warning(s) found`);
}
if (errors === 0 && warnings === 0) {
  console.log('✅ All SEO checks passed');
  process.exit(0);
} else if (errors === 0) {
  console.log('✅ All SEO error checks passed (warnings only)');
  process.exit(0);
} else {
  process.exit(1);
}
