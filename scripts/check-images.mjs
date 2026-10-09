import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';

const dist = resolve('dist');
const baseUrl = process.env.CHECK_URL || '';
const clientDir = join(dist, 'client');
const assetBase = existsSync(clientDir) ? clientDir : dist;

function* walk(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    let s;
    try { s = statSync(path); } catch { continue; }
    if (s.isDirectory()) yield* walk(path);
    else if (path.endsWith('.html')) yield path;
  }
}

let errors = 0;
let warnings = 0;

const pagePaths = [...walk(dist)];
const fetchedPages = [];

if (pagePaths.length === 0 && baseUrl) {
  console.log(`ℹ No HTML pages in dist/ — fetching from ${baseUrl}`);
  const pages = ['/', '/articles/', '/tags/', '/corrections/',
    '/articles/openai-broadcom-jalapeno-inference-chip/',
    '/articles/codebase-memory-mcp-zero-dependency-code-intelligence/',
  ];
  for (const p of pages) {
    try {
      const resp = await fetch(`${baseUrl.replace(/\/$/, '')}${p}`);
      if (resp.ok) {
        const html = await resp.text();
        fetchedPages.push({ path: `${dist}${p}index.html`, html, rel: p });
      }
    } catch { /* skip unreachable pages */ }
  }
} else if (pagePaths.length === 0) {
  console.warn('⚠ No HTML pages found in dist/ and no CHECK_URL set. Run with CHECK_URL=https://news.lesbass.com for live checks.');
}

// Process fetched (live) pages first
for (const { html, rel } of fetchedPages) {
  checkPageHtml(html, rel, true);
}

// Process local dist/ pages
for (const path of pagePaths) {
  const rel = path.slice(dist.length);
  const html = readFileSync(path, 'utf-8');
  checkPageHtml(html, rel, false);
}

function checkPageHtml(html, rel, isRemote) {
  // /articles/page/N/ is a paged slice of the archive, not an article, so the
  // one-image-per-article editorial rule must not apply to it (AIN-868).
  const isArchivePage = /^\/articles\/page\//.test(rel);
  const isArticle =
    rel.startsWith('/articles/') &&
    !isArchivePage &&
    !rel.endsWith('/articles/index.html') &&
    !rel.endsWith('/articles/');

  const imgTags = html.match(/<img[^>]*>/g) || [];
  const internalImgs = imgTags.filter(tag => {
    const srcMatch = tag.match(/src="([^"]*)"/);
    return srcMatch && !srcMatch[1].startsWith('http') && !srcMatch[1].startsWith('data:');
  });
  const externalImgs = imgTags.filter(tag => {
    const srcMatch = tag.match(/src="([^"]*)"/);
    return srcMatch && (srcMatch[1].startsWith('http') || srcMatch[1].startsWith('data:'));
  });

  if (isArticle) {
    const imageException = html.includes('data-image-policy="exception"');
    if (imgTags.length === 0 && !imageException) {
      console.warn(`⚠  ${rel}: no <img> tags (editorial policy requires at least one image per article)`);
      warnings++;
    }

    const ogImgMatch = html.match(/<meta property="og:image" content="([^"]*)"/);
    if (ogImgMatch && ogImgMatch[1].includes('favicon.svg')) {
      console.warn(`⚠  ${rel}: og:image is favicon fallback (article should have a real image)`);
      warnings++;
    }

    const twitterImgMatch = html.match(/<meta name="twitter:image" content="([^"]*)"/);
    if (twitterImgMatch && twitterImgMatch[1].includes('favicon.svg')) {
      console.warn(`⚠  ${rel}: twitter:image is favicon fallback (article should have a real image)`);
      warnings++;
    }

    const jsonLdMatch = html.match(/<script type="application\/ld\+json">\s*({[^<]+})/s);
    if (jsonLdMatch) {
      try {
        const ld = JSON.parse(jsonLdMatch[1]);
        if (ld['@type'] === 'NewsArticle' && ld.image && ld.image.toString().includes('favicon.svg')) {
          console.warn(`⚠  ${rel}: JSON-LD image is favicon fallback (article should have a real image)`);
          warnings++;
        }
      } catch {
        /* JSON-LD parse failure is non-fatal */
      }
    }

    // The hero image must reserve layout space (width + height) so it cannot
    // shift the page down when it loads (Cumulative Layout Shift). Local
    // assets are always measurable, so a local hero without dimensions is an
    // error. Remote heroes instead rely on the CSS aspect-ratio fallback.
    const heroMatch = html.match(/<figure class="article-hero">[\s\S]*?<img\b([^>]*)>/);
    if (heroMatch) {
      const attrs = heroMatch[1];
      const src = (attrs.match(/src="([^"]*)"/) || [])[1] || '';
      const hasDims = /\bwidth="\d+"/.test(attrs) && /\bheight="\d+"/.test(attrs);
      if (!hasDims && src.startsWith('/')) {
        console.error(`❌ ${rel}: article hero <img> missing width/height (causes layout shift)`);
        errors++;
      }
      // Remote heroes keep no width/height (their real size is not known at
      // build time) and instead rely on the `.article-hero img:not([width])`
      // aspect-ratio fallback in BaseLayout, so no warning here.

      // The hero is the LCP element, so it must carry fetchpriority="high" to
      // start downloading ahead of lower-priority subresources (AIN-921).
      if (!/fetchpriority="high"/.test(attrs)) {
        console.error(`❌ ${rel}: article hero <img> missing fetchpriority="high" (LCP hint)`);
        errors++;
      }
    }

    // Astro only evaluates `{...}` expressions in .mdx. A `.md` body that uses
    // `{{ '/asset' | url }}` renders the literal braces as visible text on the
    // page, so treat any unresolved template expression as an error.
    if (html.includes('{{')) {
      console.error(`❌ ${rel}: unresolved template expression "{{" rendered as visible text`);
      errors++;
    }

    // The documented image pattern (docs/editorial/image-frontmatter-pattern.md)
    // lets a writer reuse the hero path in the body, but the page must show the
    // figure once. The rehype pass drops an in-body copy of the hero; if a
    // duplicate src survives, the renderer regressed.
    const srcSeen = new Map();
    for (const tag of imgTags) {
      const src = (tag.match(/src="([^"]*)"/) || [])[1];
      if (!src) continue;
      srcSeen.set(src, (srcSeen.get(src) || 0) + 1);
    }
    for (const [src, count] of srcSeen) {
      if (count > 1) {
        console.error(`❌ ${rel}: duplicate <img> src rendered ${count} times (${src})`);
        errors++;
      }
    }
  }

  for (const tag of imgTags) {
    if (!/alt="[^"]*"/.test(tag) && !/alt='[^']*'/.test(tag)) {
      console.error(`❌ ${rel}: <img> missing alt attribute`);
      errors++;
      break;
    }

    const altMatch = tag.match(/alt="([^"]*)"/) || tag.match(/alt='([^']*)'/);
    if (altMatch && altMatch[1].trim() === '') {
      console.warn(`⚠  ${rel}: <img> has empty alt text`);
      warnings++;
    }

    if (!/loading="/.test(tag)) {
      console.warn(`⚠  ${rel}: <img> missing loading attribute (recommend loading="lazy")`);
      warnings++;
    }
  }

  if (!isRemote) {
    for (const tag of internalImgs) {
      const srcMatch = tag.match(/src="([^"]*)"/);
      const src = srcMatch[1];

      let filePath;
      if (src.startsWith('/')) {
        filePath = join(assetBase, src);
      } else {
        const pageDir = dirname(rel);
        filePath = resolve(assetBase, pageDir, src);
      }

      if (!existsSync(filePath)) {
        const altPath = filePath.replace(/\/$/, '') + '.html';
        if (!existsSync(altPath)) {
          console.error(`❌ ${rel}: broken image src="${src}" (file not found)`);
          errors++;
        }
      }
    }
  }

  if (imgTags.length > 0 && isArticle) {
    const imgContent = html.split(/<img[^>]*>/);
    for (let i = 0; i < imgTags.length; i++) {
      const afterText = imgContent[i + 1] ? imgContent[i + 1].slice(0, 500).toLowerCase() : '';
      const hasCredit = /source\s*:|credit\s*:|image\s*:|generated\s|license\s*:|photo\s*:|screenshot\s*:|diagram\s*:|created\s+with|dall-e|midjourney|stable\s*diffusion|imagen/i.test(afterText);
      if (!hasCredit) {
        console.warn(`⚠  ${rel}: <img> may be missing source/credit/license caption (check nearby text)`);
        warnings++;
        break;
      }
    }
  }

  if (!isRemote && internalImgs.length > 0) {
    for (const tag of internalImgs) {
      const srcMatch = tag.match(/src="([^"]*)"/);
      const src = srcMatch[1];
      let filePath;
      if (src.startsWith('/')) {
        filePath = join(assetBase, src);
      } else {
        const pageDir = dirname(rel);
        filePath = resolve(assetBase, pageDir, src);
      }
      if (existsSync(filePath)) {
        const stats = statSync(filePath);
        const sizeMB = stats.size / (1024 * 1024);
        if (sizeMB > 1) {
          console.warn(`⚠  ${rel}: large image src="${src}" (${sizeMB.toFixed(1)} MB, aim for <1 MB)`);
          warnings++;
        }
      }
    }
  }

  if (externalImgs.length > 0) {
    for (const tag of externalImgs) {
      const srcMatch = tag.match(/src="([^"]*)"/);
      if (srcMatch) {
        const src = srcMatch[1];
        if (src.startsWith('data:')) {
          console.warn(`⚠  ${rel}: inline data: URI image (prefer linked image for cacheability)`);
          warnings++;
        }
      }
    }
  }
}

const faviconPath = join(assetBase, 'favicon.svg');
if (existsSync(faviconPath)) {
  try {
    const favicon = readFileSync(faviconPath, 'utf-8');
    if (!favicon.includes('<svg') && !favicon.includes('xmlns')) {
      console.error('❌ favicon.svg is not a valid SVG');
      errors++;
    }
  } catch {
    console.error('❌ cannot read favicon.svg');
    errors++;
  }
}

if (errors > 0) {
  console.error(`\n${errors} image error(s) found`);
}
if (warnings > 0) {
  console.warn(`${warnings} image warning(s) found`);
}
if (errors === 0 && warnings === 0) {
  console.log('✅ All image checks passed');
  process.exit(0);
} else if (errors === 0) {
  console.log('✅ All image error checks passed (warnings only)');
  process.exit(0);
} else {
  process.exit(1);
}
