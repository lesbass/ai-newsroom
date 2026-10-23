import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { readImageSizeFile } from './lib/image-size.mjs';

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

// A disclosure is only counted when it is labelled (Source:, Credit:, ...) or
// uses the capture/generation wording the editorial policy calls for. This
// avoids treating an ordinary paragraph that happens to mention "source code"
// or "generated output" as an image credit.
const DISCLOSURE_RE = /\b(?:sources?|credits?|licen[sc]es?|screenshots?)\s*[:：]|\bcaptured\b|\bgenerated\b/i;

function visibleText(fragment) {
  return fragment
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function findImgMatches(html) {
  const matches = [];
  const re = /<img\b[^>]*>/g;
  let match;
  while ((match = re.exec(html))) {
    const src = (match[0].match(/src="([^"]*)"/) || [])[1] || '';
    matches.push({ src, tag: match[0], start: match.index, end: re.lastIndex });
  }
  return matches;
}

function findHeroFigures(html) {
  const figures = [];
  const re = /<figure\b[^>]*\bclass="[^"]*\barticle-hero\b[^"]*"[^>]*>[\s\S]*?<\/figure>/g;
  let match;
  while ((match = re.exec(html))) {
    figures.push({ start: match.index, end: re.lastIndex, html: match[0] });
  }
  return figures;
}

function enclosingFigure(html, imageStart) {
  const open = html.lastIndexOf('<figure', imageStart);
  if (open === -1) return null;
  // The nearest preceding <figure> must still be open at the image position.
  if (html.lastIndexOf('</figure>', imageStart) > open) return null;
  const close = html.indexOf('</figure>', imageStart);
  if (close === -1) return null;

  const block = html.slice(open, close + '</figure>'.length);
  let caption = '';
  const capRe = /<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/g;
  let cap;
  while ((cap = capRe.exec(block))) {
    caption += ` ${visibleText(cap[1])}`;
  }
  return { block, caption: caption.trim() };
}

function followingParagraph(html, imageEnd) {
  // Markdown wraps a screenshot in <p><picture>…</picture></p> and writers put
  // the credit in the next <p><em>…</em></p>. Allow closing wrappers only, so
  // an unrelated paragraph after a heading or another image is not a credit.
  const rest = html.slice(imageEnd, imageEnd + 2000);
  const match = rest.match(/^(?:\s|<\/(?:picture|a|span|div|p|figure)>)*(<p\b[^>]*>([\s\S]*?)<\/p>)/);
  return match ? visibleText(match[2]) : '';
}

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

  const heroFigures = findHeroFigures(html);
  const heroRanges = heroFigures.map(f => [f.start, f.end]);
  const heroSrcs = new Set();
  for (const figure of heroFigures) {
    const heroImg = figure.html.match(/<img\b[^>]*>/);
    const heroSrc = heroImg ? (heroImg[0].match(/src="([^"]*)"/) || [])[1] : '';
    if (heroSrc) heroSrcs.add(heroSrc);
  }

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

    // Heavy source rasters (0.2-0.9 MB screenshots) make social crawlers and
    // feed readers fetch the full screenshot only to draw a preview card. A
    // generated `<name>-social.jpg` (1200x630) keeps that fetch light.
    if (ogImgMatch && ogImgMatch[1]) {
      let ogPath = ogImgMatch[1];
      try {
        const ogUrl = new URL(ogPath, 'https://news.lesbass.com');
        if (ogUrl.hostname === 'news.lesbass.com') ogPath = ogUrl.pathname;
      } catch { /* leave non-URL values untouched */ }
      if (ogPath.startsWith('/images/')) {
        const ogFile = join(assetBase, ogPath.replace(/^\/+/, ''));
        if (existsSync(ogFile)) {
          const ogBytes = statSync(ogFile).size;
          if (ogBytes > 200 * 1024) {
            console.error(`❌ ${rel}: og:image is ${(ogBytes / 1024).toFixed(0)} KB (${ogPath}) — a 1200x630 social card is required so social and feed fetches stay light`);
            errors++;
          }
          // `max-image-preview:large` only helps when the preview asset itself
          // meets the large-card floor (AIN-1040). Google Discover and social
          // crawlers drop previews narrower than 1200 px, so every local
          // article og:image must be at least that wide.
          const ogSize = readImageSizeFile(ogFile);
          if (!ogSize) {
            console.warn(`⚠  ${rel}: og:image dimensions unreadable (${ogPath}) — cannot verify the 1200 px social-card floor`);
            warnings++;
          } else if (ogSize.width < 1200) {
            console.error(`❌ ${rel}: og:image is ${ogSize.width}x${ogSize.height} (${ogPath}) — must be at least 1200px wide for large social/Discover previews`);
            errors++;
          }
        }
      }
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
    for (const figure of heroFigures) {
      // Editorial policy requires every hero image to carry a visible source,
      // credit, license, or generated-image disclosure. The article template
      // renders `imageCredit` as `figcaption.article-hero-credit`; if that
      // caption is dropped from the frontmatter or template, the article must
      // not pass the image gate.
      const creditMatch = figure.html.match(/<figcaption\b[^>]*class="[^"]*\barticle-hero-credit\b[^"]*"[^>]*>([\s\S]*?)<\/figcaption>/);
      if (!creditMatch || visibleText(creditMatch[1]).length < 3) {
        console.error(`❌ ${rel}: article hero <figure> missing visible .article-hero-credit caption (source/credit/license disclosure required)`);
        errors++;
      }
    }

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
    // Inline article images need the same editorial disclosure as the hero:
    // either a <figcaption> in the enclosing <figure> or a credit paragraph
    // immediately after the image. Only article-owned assets under
    // /images/articles/ are in scope; the hero itself is covered above.
    for (const img of findImgMatches(html)) {
      if (!img.src.startsWith('/images/articles/')) continue;
      if (heroSrcs.has(img.src)) continue;
      if (heroRanges.some(([start, end]) => img.start >= start && img.end <= end)) continue;

      const figure = enclosingFigure(html, img.start);
      if (figure && DISCLOSURE_RE.test(figure.caption)) continue;

      const afterParagraph = followingParagraph(html, img.end);
      if (afterParagraph && DISCLOSURE_RE.test(afterParagraph)) continue;

      console.error(`❌ ${rel}: inline article image ${img.src} missing source/credit/license caption (add a <figcaption> or an immediately following credit paragraph)`);
      errors++;
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

// Every local SVG hero needs a committed 1200x630 raster card, otherwise
// og:image/twitter:image/RSS silently fall back to the generic brand card.
const articlesDir = resolve('src/content/articles');
if (existsSync(articlesDir)) {
  for (const entry of readdirSync(articlesDir)) {
    if (!entry.endsWith('.md')) continue;
    let text;
    try {
      text = readFileSync(join(articlesDir, entry), 'utf-8');
    } catch {
      continue;
    }
    const image = (text.match(/^image:\s*"?([^"\n]+?)"?\s*$/m) || [])[1] || '';
    if (!image.startsWith('/')) continue;
    if (/\.(png|jpe?g)$/i.test(image)) {
      // Raster cards are build artifacts, so absence is not an error here; the
      // og:image weight check above enforces them for any heavy source. When
      // present, the card must still be the standard 1.91:1 social size.
      const social = join(resolve('public'), image.replace(/^\/+/, '').replace(/\.(png|jpe?g)$/i, '-social.jpg'));
      if (existsSync(social)) {
        const size = readImageSizeFile(social);
        if (!size || size.width !== 1200 || size.height !== 630) {
          console.error(`❌ ${entry}: social card is not 1200x630 (${size ? `${size.width}x${size.height}` : 'unreadable'})`);
          errors++;
        }
      }
      continue;
    }
    if (!/\.svg$/i.test(image)) continue;
    const social = join(resolve('public'), image.replace(/^\/+/, '').replace(/\.svg$/i, '-social-svg.jpg'));
    if (!existsSync(social)) {
      console.error(`❌ ${entry}: SVG hero has no social card — run npm run generate:svg-socials (${social})`);
      errors++;
      continue;
    }
    const size = readImageSizeFile(social);
    if (!size || size.width !== 1200 || size.height !== 630) {
      console.error(`❌ ${entry}: social card is not 1200x630 (${size ? `${size.width}x${size.height}` : 'unreadable'})`);
      errors++;
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
