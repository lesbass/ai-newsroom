/**
 * Public source hygiene gate.
 *
 * The reader-facing `Sources` section must contain public, verifiable evidence.
 * Internal editorial process records — login-gated Paperclip issues, the site's
 * own sitemap, and AIN- process references — are not sources. This gate reads
 * the built article pages, isolates the rendered Sources region, and fails when
 * it finds any of those artifacts, when no real external source remains, or
 * when the article meta line drops its "N sources" verification link.
 *
 * It also fails when an AIN- process identifier appears anywhere else in the
 * reader-facing article content (prose, caption, credit): those ids belong to
 * the Paperclip thread, not to public copy. Inline `<style>` blocks are
 * scanned separately because they ship to every page while the reader-facing
 * extraction strips them.
 *
 * Reads `dist/` (or `dist/client/` for the Cloudflare adapter layout), so run
 * it after `npm run build`.
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const CANONICAL_HOST = 'news.lesbass.com';
const INTERNAL_HOST = 'paperclip.lesbass.com';
const dist = resolve('dist');
const clientDir = join(dist, 'client');
const assetBase = existsSync(clientDir) ? clientDir : dist;
const articlesDir = join(assetBase, 'articles');

let errors = 0;

function fail(slug, message) {
  console.error(`❌ ${slug}: ${message}`);
  errors++;
}

function decodeEntities(value) {
  return String(value ?? '')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function articlePages() {
  if (!existsSync(articlesDir)) {
    console.error(`❌ sources: no built article directory at ${articlesDir}`);
    process.exit(1);
  }
  const pages = [];
  for (const entry of readdirSync(articlesDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === 'page') continue;
    const file = join(articlesDir, entry.name, 'index.html');
    try {
      if (statSync(file).isFile()) pages.push({ slug: entry.name, file });
    } catch {
      // A directory without an article page is a build artifact, not an article.
    }
  }
  return pages;
}

function builtHtmlPages(dir) {
  const pages = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      pages.push(...builtHtmlPages(path));
    } else if (entry.name.endsWith('.html')) {
      pages.push(path);
    }
  }
  return pages;
}

function inlineStyles(html) {
  return [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((match) => match[1]).join('\n');
}

function readerFacingContent(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<head[\s\S]*?<\/head>/i, '');
}

function sourcesRegion(html) {
  const start = html.search(/<h2[^>]*\bid="sources"[^>]*>\s*Sources\s*<\/h2>/i);
  if (start < 0) return null;
  let region = html.slice(start);
  const related = region.search(/<aside class="related-articles"|<h2[^>]*\bid="related-articles-heading"/i);
  if (related > 0) region = region.slice(0, related);
  return region;
}

function sourceLinks(region) {
  const links = [];
  const hrefPattern = /<a\b[^>]*\bhref="([^"]+)"/gi;
  let match;
  while ((match = hrefPattern.exec(region)) !== null) {
    links.push(decodeEntities(match[1]));
  }
  return links;
}

function isExternalSource(href) {
  let url;
  try {
    url = new URL(href);
  } catch {
    return false;
  }
  return (
    (url.protocol === 'http:' || url.protocol === 'https:') &&
    url.hostname !== CANONICAL_HOST &&
    url.hostname !== `www.${CANONICAL_HOST}` &&
    url.hostname !== INTERNAL_HOST
  );
}

const pages = articlePages();
if (pages.length === 0) {
  console.error('❌ sources: no built article pages found');
  process.exit(1);
}

for (const { slug, file } of pages) {
  const html = readFileSync(file, 'utf-8');

  const region = sourcesRegion(html);
  if (!region) {
    fail(slug, 'no rendered Sources section');
    continue;
  }

  const text = decodeEntities(region.replace(/<[^>]+>/g, ' '));
  if (region.includes(INTERNAL_HOST)) {
    fail(slug, `Sources cites the internal host ${INTERNAL_HOST}`);
  }
  if (/(?:https?:\/\/)?(?:www\.)?news\.lesbass\.com\/sitemap\.xml|["'(]\/sitemap\.xml/i.test(region)) {
    fail(slug, 'Sources cites the site sitemap instead of public evidence');
  }
  if (/\bAIN-\d+\b/i.test(text) || /\bAIN-\d+\b/i.test(region)) {
    fail(slug, 'Sources cites an AIN- editorial process reference');
  }
  if (/\bAIN-\d+\b/i.test(readerFacingContent(html))) {
    fail(slug, 'reader-facing content cites an internal AIN- process reference');
  }

  const links = sourceLinks(region);
  if (!links.some(isExternalSource)) {
    fail(slug, 'Sources has no public external source link');
  }

  const meta = html.match(/class="meta-sources"[^>]*>\s*(\d+)\s+sources?/i);
  if (!meta) {
    fail(slug, 'article meta line has no "N sources" verification link');
  } else if (Number(meta[1]) < 1) {
    fail(slug, 'article meta line reports zero sources');
  }
}

// Inline <style> blocks are served to every visitor, so internal AIN- process
// ids in CSS comments leak editorial bookkeeping into the public page source.
// The reader-facing check above deliberately strips <style>, so scan it here.
for (const file of builtHtmlPages(assetBase)) {
  const leaked = inlineStyles(readFileSync(file, 'utf-8')).match(/\bAIN-\d+\b/gi);
  if (leaked) {
    fail(relative(assetBase, file), `inline <style> cites internal process id(s) ${[...new Set(leaked)].join(', ')}`);
  }
}

if (errors) {
  console.error(`\n${errors} source hygiene problem(s) found`);
  process.exit(1);
}
console.log(`✅ All ${pages.length} article Sources sections cite public evidence with a meta source count`);
