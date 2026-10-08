import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { listingLastmods } from '../src/lib/sitemapLastmod.js';

const articlesDir = resolve('src/content/articles');
const sitemapPath = resolve('dist/sitemap.xml');

if (!existsSync(sitemapPath)) {
  console.error('❌ sitemap-lastmod: dist/sitemap.xml not found — run "npm run build" first');
  process.exit(1);
}

function scalar(body, key) {
  const match = body.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return match ? match[1].trim().replace(/^["']|["']$/g, '') : undefined;
}

function parseTags(body) {
  const inline = body.match(/^tags:\s*\[(.*)\]\s*$/m);
  if (inline) {
    return [...inline[1].matchAll(/"([^"]*)"|'([^']*)'|([^,]+)/g)]
      .map((m) => (m[1] ?? m[2] ?? m[3] ?? '').trim())
      .filter(Boolean);
  }
  const block = body.match(/^tags:\s*\n((?:[ \t]+-[^\n]*\n?)+)/m);
  if (!block) return [];
  return block[1]
    .split('\n')
    .map((line) => line.match(/^[ \t]+-\s*(.+?)\s*$/)?.[1])
    .filter(Boolean)
    .map((tag) => tag.replace(/^["']|["']$/g, ''));
}

function toDate(value) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

const articles = readdirSync(articlesDir)
  .filter((file) => file.endsWith('.md'))
  .map((file) => {
    const raw = readFileSync(join(articlesDir, file), 'utf-8');
    const match = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!match) {
      console.error(`❌ sitemap-lastmod: ${file} has no YAML frontmatter`);
      process.exit(1);
    }
    const pubDate = toDate(scalar(match[1], 'pubDate'));
    if (!pubDate) {
      console.error(`❌ sitemap-lastmod: ${file} has an invalid or missing pubDate`);
      process.exit(1);
    }
    return {
      id: file.replace(/\.md$/, ''),
      data: {
        pubDate,
        updatedDate: toDate(scalar(match[1], 'updatedDate')),
        tags: parseTags(match[1]),
      },
    };
  });

const expected = listingLastmods(articles);

// Index the built sitemap: URL pathname -> lastmod (or null when absent).
const xml = readFileSync(sitemapPath, 'utf-8');
const actual = new Map();
for (const block of xml.split('<url>').slice(1)) {
  const loc = block.match(/<loc>([^<]+)<\/loc>/);
  if (!loc) continue;
  const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/);
  actual.set(new URL(loc[1]).pathname, lastmod ? lastmod[1] : null);
}

let errors = 0;
for (const [path, date] of expected) {
  const got = actual.has(path) ? actual.get(path) : undefined;
  if (got === undefined) {
    console.error(`❌ sitemap-lastmod: ${path} is missing from sitemap.xml`);
    errors++;
    continue;
  }
  if ((got ?? null) !== (date ?? null)) {
    console.error(
      `❌ sitemap-lastmod: ${path} lastmod is ${got ?? '(none)'}, expected ${date ?? '(none)'} — listing/tag pages must use the newest content date, not the build date`,
    );
    errors++;
  }
}

if (errors) {
  console.error(`\n${errors} listing/tag lastmod mismatch(es)`);
  process.exit(1);
}
console.log(`✅ sitemap lastmod on ${expected.size} listing/tag pages matches the newest content date`);
