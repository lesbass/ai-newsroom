import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

/**
 * Static contrast guard.
 *
 * The site's text colours are CSS custom properties declared once in
 * BaseLayout, so every meaningful text/background pair can be checked from the
 * built HTML without a browser: read the tokens, composite the translucent
 * surfaces over the page background, and assert WCAG 2.1 AA (4.5:1) for normal
 * text. Both the light and `prefers-color-scheme: dark` token sets are
 * validated, because a token that only passes in one scheme is still a failure.
 *
 * Usage:
 *   node scripts/check-contrast.mjs            # reads dist/index.html
 *   CHECK_URL=https://news.lesbass.com/ node scripts/check-contrast.mjs
 */

const baseUrl = (process.env.CHECK_URL || '').replace(/\/$/, '');

async function loadStyleText() {
  if (baseUrl) {
    return fetch(`${baseUrl}/`).then((r) => r.text());
  }
  const distFile = resolve('dist/index.html');
  if (existsSync(distFile)) return readFileSync(distFile, 'utf-8');
  return null;
}

function parseColor(value) {
  const v = String(value).trim();
  let m = v.match(/^#([0-9a-f]{3})$/i);
  if (m) {
    const [r, g, b] = m[1].split('');
    return [parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), 1];
  }
  m = v.match(/^#([0-9a-f]{6})$/i);
  if (m) {
    const n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 1];
  }
  m = v.match(/^rgba?\(([^)]+)\)$/i);
  if (m) {
    const p = m[1].split(',').map((s) => parseFloat(s.trim()));
    return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
  }
  return null;
}

function composite(fg, bg) {
  const a = fg[3];
  return [0, 1, 2].map((i) => Math.round(fg[i] * a + bg[i] * (1 - a)));
}

function relLuminance([r, g, b]) {
  const f = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrast(a, b) {
  const l1 = relLuminance(a);
  const l2 = relLuminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function extractRootTokens(css) {
  const tokens = { light: {}, dark: {} };
  const re = /(?:@media[^{]*\{[^{}]*?)?:root\s*\{/g;
  let m;
  while ((m = re.exec(css))) {
    const start = m.index;
    const prefix = css.slice(Math.max(0, start - 240), start);
    const openedBy = m[0].slice(0, m[0].lastIndexOf(':root'));
    const media = /@media[^{]*\{[^{}]*$/.test(prefix)
      ? prefix.slice(prefix.lastIndexOf('@media'))
      : openedBy;
    const scheme = /prefers-color-scheme:\s*dark/.test(media) ? 'dark' : 'light';
    let depth = 1;
    let i = re.lastIndex;
    while (i < css.length && depth > 0) {
      if (css[i] === '{') depth++;
      else if (css[i] === '}') depth--;
      i++;
    }
    const body = css.slice(re.lastIndex, i - 1);
    for (const decl of body.split(';')) {
      const kv = decl.match(/^\s*(--[\w-]+)\s*:\s*([^;]+)$/);
      if (kv) tokens[scheme][kv[1].trim()] = kv[2].trim();
    }
  }
  return tokens;
}

/** (foreground token, background token, label) — every real text pairing. */
const PAIRS = [
  ['--color-text', '--color-bg', 'body text'],
  ['--color-text', '--color-surface', 'text on card/surface'],
  ['--color-muted', '--color-bg', 'muted meta on page'],
  ['--color-muted', '--color-surface', 'muted meta on card'],
  ['--color-faint', '--color-bg', 'topic counts / source type'],
  ['--color-faint', '--color-surface', 'topic counts on card'],
  ['--color-accent', '--color-bg', 'accent labels + links'],
  ['--color-accent', '--color-accent-subtle', 'accent link on accent tint'],
  ['--color-highlight', '--color-bg', 'highlight label on page'],
  ['--color-highlight', '--color-highlight-subtle', 'high-risk claims badge'],
];

const MIN_RATIO = 4.5;

const html = await loadStyleText();
if (!html) {
  console.error('❌ No HTML found — run `npm run build` or set CHECK_URL');
  process.exit(1);
}

const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
if (!css.includes('--color-bg')) {
  console.error('❌ Could not find design tokens in the built HTML');
  process.exit(1);
}

const tokens = extractRootTokens(css);
let errors = 0;
const rows = [];

for (const scheme of ['light', 'dark']) {
  const t = tokens[scheme];
  const base = parseColor(t['--color-bg']);
  if (!base) {
    console.error(`❌ ${scheme}: --color-bg missing or unparseable`);
    errors++;
    continue;
  }
  for (const [fgKey, bgKey, label] of PAIRS) {
    const fgRaw = t[fgKey];
    const bgRaw = t[bgKey];
    if (!fgRaw || !bgRaw) {
      console.error(`❌ ${scheme}: ${fgKey} or ${bgKey} not declared`);
      errors++;
      continue;
    }
    const fg = parseColor(fgRaw);
    const bg = parseColor(bgRaw);
    if (!fg || !bg) {
      console.error(`❌ ${scheme}: unparseable colour in ${fgKey}/${bgKey}`);
      errors++;
      continue;
    }
    const opaqueBg = composite(bg, base);
    const opaqueFg = composite(fg, opaqueBg);
    const ratio = contrast(opaqueFg, opaqueBg);
    const pass = ratio >= MIN_RATIO;
    if (!pass) errors++;
    rows.push({ scheme, label, fgKey, bgKey, ratio: ratio.toFixed(2), pass });
  }
}

const width = Math.max(...rows.map((r) => r.label.length));
for (const r of rows) {
  const mark = r.pass ? '✅' : '❌';
  console.log(`${mark} ${r.scheme.padEnd(5)} ${r.label.padEnd(width)}  ${r.ratio.padStart(5)}:1  (${r.fgKey} on ${r.bgKey})`);
}

if (errors) {
  console.error(`\n${errors} contrast issue(s) below WCAG 2.1 AA (4.5:1)`);
  process.exit(1);
}
console.log(`\n✅ All ${rows.length} text/background pairs meet WCAG 2.1 AA (4.5:1)`);
