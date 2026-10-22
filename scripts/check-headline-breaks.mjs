/**
 * Headline line-break checks.
 *
 * Browsers break after the hyphen in a model name unless it is marked
 * non-breaking. `formatHeadline` wraps short hyphen compounds (GPT-6,
 * Claude-3.5) in `<span class="no-break">` while leaving long compounds
 * breakable. Compounds 15-20 chars also carry `no-break-long`, which a
 * `<=600px` media query switches back to normal wrapping so they do not widen
 * the article column on a 320 px phone (AIN-1020). These checks pin the
 * formatter behaviour and scan the built HTML for partial wraps such as
 * `Qwen3.<span>8-Flash-Next</span>`.
 *
 * Run after `npm run build`.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { formatHeadline } from '../src/lib/headline.ts';

const dist = resolve('dist');
const MAX_NO_BREAK_LENGTH = 20;
const LONG_NO_BREAK_MIN_LENGTH = 15;
const COMPOUND = /^[A-Za-z0-9]+(?:[.-][A-Za-z0-9]+)*-[A-Za-z0-9]+(?:[.-][A-Za-z0-9]+)*$/;
const SPAN = /<span class="(no-break(?: no-break-long)?)">([^<]*)<\/span>/g;

const cases = [
  ['GPT-6 Astra', '<span class="no-break">GPT-6</span> Astra'],
  ['Claude-3 ships', '<span class="no-break">Claude-3</span> ships'],
  ['Claude-3.5 ships', '<span class="no-break">Claude-3.5</span> ships'],
  ['DeepSeek-V4 ships', '<span class="no-break">DeepSeek-V4</span> ships'],
  // 14 chars: below the long threshold, stays whole everywhere.
  ['abcdefghijkl-p', '<span class="no-break">abcdefghijkl-p</span>'],
  // 15 chars: long modifier so it can wrap on mobile.
  ['abcdefghijklm-p', '<span class="no-break no-break-long">abcdefghijklm-p</span>'],
  ['a 1.05T-parameter open-weight model', 'a <span class="no-break no-break-long">1.05T-parameter</span> <span class="no-break">open-weight</span> model'],
  ['abcdefghijklmnopqr-p', '<span class="no-break no-break-long">abcdefghijklmnopqr-p</span>'],
  ['abcdefghijklmnopqrs-p', 'abcdefghijklmnopqrs-p'],
  ['Qwen3.8-Flash-Next', '<span class="no-break no-break-long">Qwen3.8-Flash-Next</span>'],
  ['multi-turn-tool-use-and-more', 'multi-turn-tool-use-and-more'],
  ['A <script> & GPT-6', 'A &lt;script&gt; &amp; <span class="no-break">GPT-6</span>'],
];

let errors = 0;

function fail(message) {
  console.error(`❌ ${message}`);
  errors++;
}

for (const [input, expected] of cases) {
  const actual = formatHeadline(input);
  if (actual !== expected) {
    fail(`formatHeadline(${JSON.stringify(input)}) => ${JSON.stringify(actual)} (expected ${JSON.stringify(expected)})`);
  }
  if (actual.includes('<script>')) {
    fail(`formatHeadline(${JSON.stringify(input)}) emitted raw <script>`);
  }
}

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

let spanCount = 0;
let pageCount = 0;
let longSpanCount = 0;
let cssChecked = false;

for (const path of walk(dist)) {
  pageCount++;
  const html = readFileSync(path, 'utf-8');
  const rel = path.slice(dist.length);

  for (const match of html.matchAll(SPAN)) {
    spanCount++;
    const classes = match[1];
    const token = match[2];
    const isLong = classes.includes('no-break-long');
    const before = html[match.index - 1] || '';
    const after = html[match.index + match[0].length] || '';
    if (/[\w.-]/.test(before)) {
      fail(`${rel}: no-break span starts inside a compound (partial wrap)`);
    }
    if (/[\w.-]/.test(after)) {
      fail(`${rel}: no-break span ends inside a compound (partial wrap)`);
    }
    if (token.length > MAX_NO_BREAK_LENGTH) {
      fail(`${rel}: no-break token over ${MAX_NO_BREAK_LENGTH} chars: ${JSON.stringify(token)}`);
    }
    if (!COMPOUND.test(token)) {
      fail(`${rel}: no-break token is not a hyphen compound: ${JSON.stringify(token)}`);
    }
    // The long modifier is the AIN-1020 fix: it must appear exactly when the
    // compound is at least LONG_NO_BREAK_MIN_LENGTH chars, so a <=600px media
    // query can unwrap it.
    if (token.length >= LONG_NO_BREAK_MIN_LENGTH && !isLong) {
      fail(`${rel}: token >= ${LONG_NO_BREAK_MIN_LENGTH} chars missing no-break-long: ${JSON.stringify(token)}`);
    }
    if (token.length < LONG_NO_BREAK_MIN_LENGTH && isLong) {
      fail(`${rel}: short token should not carry no-break-long: ${JSON.stringify(token)}`);
    }
    if (isLong) longSpanCount++;
  }

  if (!cssChecked && html.includes('.no-break')) {
    cssChecked = true;
    const css = html.replace(/\s+/g, '');
    if (!css.includes('.no-break-long{white-space:normal;}')) {
      fail('built CSS is missing the mobile `.no-break-long { white-space: normal; }` override');
    }
    if (!css.includes('.meta-item-date{flex-wrap:wrap;white-space:normal;}')) {
      fail('built CSS is missing the mobile `.meta-item-date` wrap override');
    }
  }
}

if (pageCount === 0) {
  fail('no built HTML found in dist/; run npm run build first');
} else if (spanCount === 0) {
  fail('no no-break spans found in dist/; formatHeadline is not applied');
}

if (errors) {
  console.error(`\n${errors} headline line-break issue(s) found`);
  process.exit(1);
}
console.log(`✅ Headline line breaks: ${cases.length} formatter cases, ${spanCount} no-break spans (${longSpanCount} long) across ${pageCount} pages`);
