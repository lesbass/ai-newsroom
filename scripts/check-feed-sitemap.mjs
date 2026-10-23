/**
 * Sitemap/RSS article coverage.
 *
 * Every article that is published (pubDate not in the future) must appear
 * exactly once in the built sitemap and once in the RSS feed, and neither
 * artifact may expose an article that is missing from `src/content/articles`
 * or is still future-dated. A new article that quietly misses the feed, a
 * removed article that stays in the sitemap, or a scheduled draft that leaks
 * into the public artifacts is otherwise invisible in every existing gate.
 *
 * Reads `dist/sitemap.xml` and `dist/rss.xml`; with `CHECK_URL` set and no
 * local artifact it falls back to the deployed copies.
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const CANONICAL_ORIGIN = 'https://news.lesbass.com';
const baseUrl = (process.env.CHECK_URL || '').replace(/\/$/, '');
const articlesDir = resolve('src/content/articles');
const distDir = resolve('dist');

let errors = 0;

function frontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  return match ? match[1] : null;
}

function scalar(fm, key) {
  const match = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return match ? match[1].trim().replace(/^["']|["']$/g, '') : undefined;
}

function articleSlugFromPath(pathname) {
  const match = pathname.match(/^\/articles\/([^/]+)\/$/);
  if (!match) return null;
  if (match[1] === 'page') return null;
  return match[1];
}

function parseUrl(url) {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

const now = new Date();
const expected = new Set();

for (const file of readdirSync(articlesDir).filter((f) => f.endsWith('.md'))) {
  const fm = frontmatter(readFileSync(join(articlesDir, file), 'utf-8'));
  if (!fm) {
    console.error(`❌ feed-sitemap: ${file} has no frontmatter`);
    errors++;
    continue;
  }
  const pub = new Date(scalar(fm, 'pubDate'));
  if (Number.isNaN(pub.getTime())) {
    console.error(`❌ feed-sitemap: ${file} has an invalid pubDate`);
    errors++;
    continue;
  }
  if (pub <= now) expected.add(file.replace(/\.md$/, ''));
}

async function loadArtifact(name, urlPath) {
  const local = join(distDir, name);
  if (existsSync(local)) return readFileSync(local, 'utf-8');
  if (!baseUrl) return null;
  try {
    const resp = await fetch(`${baseUrl}${urlPath}`, { headers: { 'Cache-Control': 'no-cache' } });
    if (!resp.ok) {
      console.error(`❌ feed-sitemap: ${baseUrl}${urlPath} returned HTTP ${resp.status}`);
      errors++;
      return null;
    }
    return await resp.text();
  } catch (e) {
    console.error(`❌ feed-sitemap: could not fetch ${baseUrl}${urlPath} (${e.message})`);
    errors++;
    return null;
  }
}

function countSlugs(slugs) {
  const counts = new Map();
  for (const slug of slugs) counts.set(slug, (counts.get(slug) ?? 0) + 1);
  return counts;
}

function compare(label, actualSlugs) {
  const counts = countSlugs(actualSlugs);
  const duplicates = [...counts].filter(([, n]) => n > 1).map(([slug]) => slug);
  const missing = [...expected].filter((slug) => !counts.has(slug));
  const extra = [...counts.keys()].filter((slug) => !expected.has(slug));

  if (duplicates.length > 0) {
    console.error(`❌ feed-sitemap: ${label} lists ${duplicates.length} article(s) more than once: ${duplicates.slice(0, 5).join(', ')}`);
    errors++;
  }
  if (missing.length > 0) {
    console.error(`❌ feed-sitemap: ${label} is missing ${missing.length} published article(s): ${missing.slice(0, 5).join(', ')}`);
    errors++;
  }
  if (extra.length > 0) {
    console.error(`❌ feed-sitemap: ${label} lists ${extra.length} article(s) that are not publishable (future-dated or absent from src/content/articles): ${extra.slice(0, 5).join(', ')}`);
    errors++;
  }

  return counts.size;
}

function extractArticleSlugs(label, urls) {
  const slugs = [];
  let foreign = 0;
  for (const value of urls) {
    const parsed = parseUrl(value);
    if (!parsed) {
      console.error(`❌ feed-sitemap: ${label} contains an invalid URL: ${value}`);
      errors++;
      continue;
    }
    if (parsed.origin !== CANONICAL_ORIGIN) {
      foreign++;
      continue;
    }
    const slug = articleSlugFromPath(parsed.pathname);
    if (slug) slugs.push(slug);
  }
  if (foreign > 0) {
    console.error(`❌ feed-sitemap: ${label} contains ${foreign} URL(s) outside ${CANONICAL_ORIGIN}`);
    errors++;
  }
  return slugs;
}

const sitemap = await loadArtifact('sitemap.xml', '/sitemap.xml');
if (sitemap === null) {
  console.error('❌ feed-sitemap: sitemap.xml not found — run "npm run build" first or set CHECK_URL');
  errors++;
} else if (expected.size > 0) {
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  compare('sitemap.xml', extractArticleSlugs('sitemap.xml', urls));
}

const rss = await loadArtifact('rss.xml', '/rss.xml');
if (rss === null) {
  console.error('❌ feed-sitemap: rss.xml not found — run "npm run build" first or set CHECK_URL');
  errors++;
} else if (expected.size > 0) {
  const urls = [...rss.matchAll(/<item>[\s\S]*?<\/item>/g)]
    .map((m) => m[0].match(/<link>([^<]+)<\/link>/)?.[1])
    .filter(Boolean);
  compare('rss.xml', extractArticleSlugs('rss.xml', urls));
}

if (errors > 0) {
  console.error(`\n❌ feed-sitemap: ${errors} coverage error(s) across ${expected.size} published article(s)`);
  process.exit(1);
}

if (expected.size === 0) {
  console.warn('⚠ feed-sitemap: no published articles found to compare');
} else {
  console.log(`✅ feed-sitemap: ${expected.size} published articles appear exactly once in sitemap.xml and rss.xml (canonical origin ${CANONICAL_ORIGIN})`);
}
