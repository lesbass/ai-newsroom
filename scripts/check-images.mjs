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
  const isArticle = rel.startsWith('/articles/') && !rel.endsWith('/articles/index.html') && !rel.endsWith('/articles/');

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
    if (imgTags.length === 0) {
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
