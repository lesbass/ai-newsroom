import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const dist = resolve('dist');
const baseUrl = process.env.CHECK_URL || '';

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
    }
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
        if (!/alt="[^"]*"/.test(img) && !/alt='[^']*'/.test(img)) {
          console.warn(`⚠ ${rel}: <img> missing alt attribute`);
          warnings++;
        }
      }
    }

    // 12. OG title should match <title> (decode HTML entities before comparing)
    const ogTitleMatch = html.match(/<meta property="og:title" content="([^"]*)"/);
    const titleTagMatch = html.match(/<title>([^<]+)<\/title>/);
    if (ogTitleMatch && titleTagMatch) {
      const decodeEntities = (s) => s.replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
        .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
      const ogTitle = decodeEntities(ogTitleMatch[1]);
      const htmlTitle = decodeEntities(titleTagMatch[1]);
      if (ogTitle !== htmlTitle) {
        console.warn(`⚠ ${rel}: og:title "${ogTitle.slice(0,50)}..." differs from <title> "${htmlTitle.slice(0,50)}..."`);
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
