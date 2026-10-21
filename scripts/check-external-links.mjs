import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';

const ARTICLES_DIR = resolve('src/content/articles');
const CANONICAL_ORIGIN = 'https://news.lesbass.com';
const CANONICAL_HOST = 'news.lesbass.com';
const USER_AGENT =
  'AI-Newsroom-LinkCheck/1.0 (+https://news.lesbass.com/; advisory editorial source-health check)';

const DEFAULT_CONCURRENCY = 6;
const MAX_CONCURRENCY = 10;
const DEFAULT_TIMEOUT_MS = 15000;

function usage() {
  console.log(`Usage: npm run test:external-links -- [options]

Extracts external citation URLs from src/content/articles/*.md
(frontmatter sources[].url plus inline markdown links and autolinks),
deduplicates them, and checks them over the network.

Options:
  --limit <n>          Check at most n URLs (after filtering)
  --url <url>          Check only this URL (repeatable); works even when the
                       URL is not referenced by a current article
  --json <path>        Write a machine-readable report to path
  --concurrency <n>    Parallel requests, 1-${MAX_CONCURRENCY} (default ${DEFAULT_CONCURRENCY})
  --timeout <ms>       Per-request timeout in milliseconds (default ${DEFAULT_TIMEOUT_MS})
  --verbose            List successful URLs too
  -h, --help           Show this help

Outcomes:
  ok           2xx/3xx
  dead         404/410 (fails the run)
  gated        401/403/429 (reported, does not fail the run)
  needs-review other 4xx/5xx, network errors, timeouts (reported, does not fail)

Advisory only: this check is network-dependent and is not part of npm run audit.`);
}

function parseArgs(argv) {
  const options = {
    limit: null,
    urls: [],
    jsonPath: null,
    concurrency: DEFAULT_CONCURRENCY,
    timeoutMs: DEFAULT_TIMEOUT_MS,
    verbose: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const value = () => {
      const next = argv[++i];
      if (next === undefined) {
        console.error(`Missing value for ${arg}`);
        process.exit(2);
      }
      return next;
    };

    switch (arg) {
      case '--limit': {
        const n = Number(value());
        if (!Number.isInteger(n) || n < 1) {
          console.error('--limit must be a positive integer');
          process.exit(2);
        }
        options.limit = n;
        break;
      }
      case '--url': {
        const raw = value();
        let parsed;
        try {
          parsed = new URL(raw);
        } catch {
          console.error(`--url is not a valid URL: ${raw}`);
          process.exit(2);
        }
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
          console.error(`--url must be http(s): ${raw}`);
          process.exit(2);
        }
        options.urls.push(parsed.toString());
        break;
      }
      case '--json':
        options.jsonPath = value();
        break;
      case '--concurrency': {
        const n = Number(value());
        if (!Number.isInteger(n) || n < 1 || n > MAX_CONCURRENCY) {
          console.error(`--concurrency must be an integer from 1 to ${MAX_CONCURRENCY}`);
          process.exit(2);
        }
        options.concurrency = n;
        break;
      }
      case '--timeout': {
        const n = Number(value());
        if (!Number.isInteger(n) || n < 1000) {
          console.error('--timeout must be an integer of at least 1000 ms');
          process.exit(2);
        }
        options.timeoutMs = n;
        break;
      }
      case '--verbose':
        options.verbose = true;
        break;
      case '-h':
      case '--help':
        usage();
        process.exit(0);
        break;
      default:
        console.error(`Unknown argument: ${arg}`);
        usage();
        process.exit(2);
    }
  }

  return options;
}

function articleFiles() {
  return readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith('.md'))
    .sort();
}

function count(needle, text) {
  return text.split(needle).length - 1;
}

function cleanUrl(raw) {
  let url = raw.trim().replace(/^</, '').replace(/>$/, '');
  let previous;
  // Markdown closes the link with `)`, which the greedy capture includes.
  // Strip trailing punctuation and only unmatched trailing parens so URLs
  // that legitimately contain parentheses (e.g. Wikipedia titles) survive.
  do {
    previous = url;
    url = url.replace(/[.,;:]+$/, '');
    while (url.endsWith(')') && count('(', url) < count(')', url)) {
      url = url.slice(0, -1);
    }
  } while (url !== previous);
  return url;
}

function extractMarkdownLinks(body) {
  const urls = [];
  let index = 0;

  while ((index = body.indexOf('](', index)) !== -1) {
    let cursor = index + 2;
    while (cursor < body.length && /\s/.test(body[cursor])) cursor++;

    let raw;
    if (body[cursor] === '<') {
      const end = body.indexOf('>', cursor + 1);
      if (end === -1) {
        index += 2;
        continue;
      }
      raw = body.slice(cursor + 1, end);
    } else {
      const start = cursor;
      // The link target starts inside the `(` of `](`. Track balanced parens
      // so URLs such as Wikipedia titles keep their own parentheses, and stop
      // at the closing paren instead of swallowing trailing `**` or punctuation.
      let depth = 1;
      while (cursor < body.length) {
        const char = body[cursor];
        if (/\s/.test(char)) break;
        if (char === '(') depth++;
        else if (char === ')') {
          depth--;
          if (depth === 0) break;
        }
        cursor++;
      }
      raw = body.slice(start, cursor);
    }

    if (/^https?:\/\//.test(raw)) urls.push(raw);
    index += 2;
  }

  return urls;
}

function extractFromArticle(content) {
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
  const body = frontmatterMatch
    ? content.slice(frontmatterMatch[0].length)
    : content;

  const found = new Set();

  for (const match of frontmatter.matchAll(
    /^[ \t]*url:[ \t]*["']?(https?:\/\/[^"'\s]+)["']?[ \t]*$/gm,
  )) {
    found.add(match[1]);
  }

  for (const url of extractMarkdownLinks(body)) {
    found.add(url);
  }

  for (const match of body.matchAll(/<\s*(https?:\/\/[^\s>]+)\s*>/g)) {
    found.add(match[1]);
  }

  return [...found].map(cleanUrl).filter(Boolean);
}

function isSameOrigin(url) {
  try {
    return new URL(url).hostname === CANONICAL_HOST;
  } catch {
    return false;
  }
}

function collect() {
  const files = articleFiles();
  const references = new Map();
  let discovered = 0;
  let skippedSameOrigin = 0;
  let skippedInvalid = 0;

  for (const file of files) {
    const content = readFileSync(join(ARTICLES_DIR, file), 'utf-8');
    for (const rawUrl of extractFromArticle(content)) {
      discovered++;
      if (isSameOrigin(rawUrl)) {
        skippedSameOrigin++;
        continue;
      }
      let normalized;
      try {
        normalized = new URL(rawUrl).toString();
      } catch {
        skippedInvalid++;
        continue;
      }
      if (!references.has(normalized)) references.set(normalized, new Set());
      references.get(normalized).add(file);
    }
  }

  return { files, references, discovered, skippedSameOrigin, skippedInvalid };
}

function classifyStatus(status) {
  if (status >= 200 && status < 400) return 'ok';
  if (status === 401 || status === 403 || status === 429) return 'gated';
  if (status === 404 || status === 410) return 'dead';
  return 'needs-review';
}

async function checkUrl(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': USER_AGENT,
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'accept-language': 'en',
      },
    });
    const status = response.status;
    try {
      await response.body?.cancel();
    } catch {
      // The body is irrelevant for link health; a failed cancel is harmless.
    }
    return { outcome: classifyStatus(status), status, error: null };
  } catch (error) {
    if (error?.name === 'AbortError') {
      return {
        outcome: 'needs-review',
        status: null,
        error: `timed out after ${timeoutMs}ms`,
      };
    }
    const code = error?.cause?.code || error?.code;
    return {
      outcome: 'needs-review',
      status: null,
      error: code ? `${code}: ${error.message}` : error.message,
    };
  } finally {
    clearTimeout(timer);
  }
}

async function runPool(items, concurrency, worker) {
  const results = new Array(items.length);
  let next = 0;

  const runners = Array.from(
    { length: Math.min(concurrency, items.length) },
    async () => {
      while (true) {
        const index = next++;
        if (index >= items.length) return;
        results[index] = await worker(items[index]);
      }
    },
  );

  await Promise.all(runners);
  return results;
}

function compactRefs(articles) {
  if (!articles || articles.length === 0) return '(requested via --url)';
  const shown = articles.slice(0, 3).join(', ');
  return articles.length > 3 ? `${shown} (+${articles.length - 3} more)` : shown;
}

function printGroup(label, entries) {
  console.log(`${label}: ${entries.length}`);
  entries.forEach((entry) => {
    const detail = entry.status !== null ? `HTTP ${entry.status}` : entry.error;
    console.log(`  - ${entry.url} (${detail})`);
    console.log(`      ${compactRefs(entry.articles)}`);
  });
}

const options = parseArgs(process.argv.slice(2));
const { files, references, discovered, skippedSameOrigin, skippedInvalid } =
  collect();

let candidates;

if (options.urls.length > 0) {
  const requested = new Set(options.urls);
  for (const url of requested) {
    if (!references.has(url)) references.set(url, new Set());
  }
  candidates = [...requested];
} else {
  candidates = [...references.keys()];
}

candidates = candidates.filter((url) => !isSameOrigin(url)).sort();

if (options.limit !== null) candidates = candidates.slice(0, options.limit);

console.log(
  `External citation link check — ${candidates.length} URL(s) to check, ` +
    `${references.size} external URL(s) discovered across ${files.length} article(s)`,
);
console.log(
  `Skipped ${skippedSameOrigin} same-origin reference(s) (covered by npm run test:links)` +
    (skippedInvalid ? `, ${skippedInvalid} invalid URL(s)` : ''),
);

const startedAt = Date.now();
const results = await runPool(candidates, options.concurrency, async (url) => {
  const result = await checkUrl(url, options.timeoutMs);
  return {
    url,
    outcome: result.outcome,
    status: result.status,
    error: result.error,
    articles: [...(references.get(url) ?? [])].sort(),
  };
});

const groups = {
  dead: [],
  gated: [],
  'needs-review': [],
  ok: [],
};
for (const result of results) groups[result.outcome].push(result);

console.log(`\nChecked ${results.length} URL(s) in ${((Date.now() - startedAt) / 1000).toFixed(1)}s`);

printGroup('⛔ dead (404/410)', groups.dead);
printGroup('🔒 bot-gated (401/403/429 — reported, not failed)', groups.gated);
printGroup('⚠ needs-review (other 4xx/5xx, network errors, timeouts)', groups['needs-review']);

if (options.verbose && groups.ok.length > 0) {
  printGroup('✅ ok (2xx/3xx)', groups.ok);
} else {
  console.log(`✅ ok (2xx/3xx): ${groups.ok.length}`);
}

console.log(
  `\nSummary: ${groups.ok.length} ok, ${groups.dead.length} dead, ` +
    `${groups.gated.length} gated, ${groups['needs-review'].length} needs-review`,
);

if (options.jsonPath) {
  const report = {
    generatedAt: new Date().toISOString(),
    canonicalOrigin: CANONICAL_ORIGIN,
    userAgent: USER_AGENT,
    articlesScanned: files.length,
    urlsDiscovered: discovered,
    externalUrlsDiscovered: references.size,
    skippedSameOrigin,
    skippedInvalid,
    checked: results.length,
    options: {
      limit: options.limit,
      urls: options.urls,
      concurrency: options.concurrency,
      timeoutMs: options.timeoutMs,
    },
    summary: {
      ok: groups.ok.length,
      dead: groups.dead.length,
      gated: groups.gated.length,
      needsReview: groups['needs-review'].length,
    },
    results,
  };
  const path = resolve(options.jsonPath);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`JSON report written to ${path}`);
}

if (groups.dead.length > 0) {
  console.error(`\n❌ ${groups.dead.length} dead external citation(s) found`);
  process.exit(1);
}

console.log('✅ No dead external citations found');
