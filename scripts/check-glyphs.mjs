import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { join, resolve } from 'node:path';

const dist = resolve('dist');
const layoutPath = resolve('src/layouts/BaseLayout.astro');
const symbolFontPath = resolve('public/fonts/ai-newsroom-symbols.woff');
const MAX_SYMBOL_FONT_BYTES = 40 * 1024;
const SYMBOL_FAMILY = 'AI Newsroom Symbols';

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

// Codepoints the shipped Latin subsets cover. The four woff2 files all share
// the same latin subset generated from the same upstream families; this list
// mirrors that cmap. General punctuation and math operators also appear here,
// but the symbol font covers them too and its own cmap/unicode-range wins.
const LATIN_RANGES = [
  [0x0000, 0x00ff], // Basic Latin + Latin-1 Supplement
  [0x0131, 0x0131], // dotless i
  [0x0152, 0x0153], // OE / oe
  [0x02c6, 0x02c6], // modifier circumflex
  [0x02da, 0x02da], // ring above
  [0x02dc, 0x02dc], // small tilde
  [0x0300, 0x0304], // combining grave/acute/circumflex/tilde/macron
  [0x0308, 0x0308], // combining diaeresis
  [0x2013, 0x2014], // en/em dash
  [0x2018, 0x201e], // curly quotes
  [0x2022, 0x2022], // bullet
  [0x2026, 0x2026], // ellipsis
  [0x2039, 0x203a], // single guillemets
  [0x2044, 0x2044], // fraction slash
  [0x20ac, 0x20ac], // euro
  [0x2122, 0x2122], // trade mark
  [0x2212, 0x2212], // minus sign
  [0x2215, 0x2215], // division slash
];

// Characters intentionally left to the operating system. Keep this list
// narrow: every entry is a known, deliberate fallback rather than a gap.
const OS_ALLOWLIST = [
  // CJK text in article titles/references. Bundling a CJK face would add
  // megabytes for a handful of characters.
  [0x3000, 0x303f],
  [0x3040, 0x30ff],
  [0x3400, 0x4dbf],
  [0x4e00, 0x9fff],
  [0xf900, 0xfaff],
  [0xff00, 0xffef],
  // Emoji and their joiners/variation selectors.
  [0x1f000, 0x1faff],
  [0x200d, 0x200d],
  [0xfe0f, 0xfe0f],
  // Pickaxe in a literal terminal-statusline example. DejaVu Sans has no
  // U+26CF, so let the OS emoji font render it rather than widening the
  // symbol subset for one decorative code-block glyph.
  [0x26cf, 0x26cf],
];

function inRanges(cp, ranges) {
  for (const [a, b] of ranges) {
    if (cp >= a && cp <= b) return true;
  }
  return false;
}

function parseUnicodeRange(value) {
  const ranges = [];
  for (const raw of value.split(',')) {
    const token = raw.trim();
    const match = /^U\+([0-9A-Fa-f]{1,6})(?:-([0-9A-Fa-f]{1,6}))?$/.exec(token);
    if (!match) {
      throw new Error(`Unparseable unicode-range token: ${token}`);
    }
    const start = parseInt(match[1], 16);
    const end = match[2] ? parseInt(match[2], 16) : start;
    ranges.push([start, end]);
  }
  return ranges;
}

function readSymbolCssRanges() {
  const layout = readFileSync(layoutPath, 'utf-8');
  const familyIndex = layout.indexOf(`font-family: "${SYMBOL_FAMILY}"`);
  if (familyIndex === -1) {
    throw new Error(`No ${SYMBOL_FAMILY} @font-face block in ${layoutPath}`);
  }
  const block = layout.slice(familyIndex, familyIndex + 1200);
  const match = /unicode-range:\s*([^;]+);/.exec(block);
  if (!match) {
    throw new Error(`No unicode-range in the ${SYMBOL_FAMILY} @font-face block`);
  }
  return parseUnicodeRange(match[1]);
}

// Read a WOFF font's cmap without external dependencies. The symbol subset is
// plain WOFF (zlib-compressed table data), so we can verify the exact glyphs
// that shipped instead of trusting the CSS declaration blindly.
function readWoffCmap(path) {
  const buf = readFileSync(path);
  if (buf.toString('ascii', 0, 4) !== 'wOFF') return null;
  const numTables = buf.readUInt16BE(12);
  let cmapTable = null;
  for (let i = 0; i < numTables; i++) {
    const entry = 44 + i * 20;
    if (buf.toString('ascii', entry, entry + 4) !== 'cmap') continue;
    const offset = buf.readUInt32BE(entry + 4);
    const compLength = buf.readUInt32BE(entry + 8);
    const origLength = buf.readUInt32BE(entry + 12);
    const data = buf.subarray(offset, offset + compLength);
    cmapTable = compLength < origLength ? inflateSync(data) : data;
    break;
  }
  if (!cmapTable) return null;

  const numSubtables = cmapTable.readUInt16BE(2);
  const subtables = [];
  for (let i = 0; i < numSubtables; i++) {
    const p = 4 + i * 8;
    subtables.push({
      platformID: cmapTable.readUInt16BE(p),
      encodingID: cmapTable.readUInt16BE(p + 2),
      offset: cmapTable.readUInt32BE(p + 4),
    });
  }

  const cps = new Set();

  // Prefer a full-repertoire format 12 subtable when present.
  for (const table of subtables) {
    const offset = table.offset;
    if (offset + 16 > cmapTable.length) continue;
    if (cmapTable.readUInt16BE(offset) !== 12) continue;
    const groups = cmapTable.readUInt32BE(offset + 12);
    for (let g = 0; g < groups; g++) {
      const p = offset + 16 + g * 12;
      if (p + 12 > cmapTable.length) break;
      const start = cmapTable.readUInt32BE(p);
      const end = cmapTable.readUInt32BE(p + 4);
      const startGlyph = cmapTable.readUInt32BE(p + 8);
      for (let cp = start; cp <= end; cp++) {
        if (startGlyph + (cp - start) !== 0) cps.add(cp);
      }
    }
  }
  if (cps.size > 0) return cps;

  // Format 4 fallback (BMP).
  for (const table of subtables) {
    const offset = table.offset;
    if (offset + 14 > cmapTable.length) continue;
    if (cmapTable.readUInt16BE(offset) !== 4) continue;
    const segCountX2 = cmapTable.readUInt16BE(offset + 6);
    const segCount = segCountX2 / 2;
    const endCodes = offset + 14;
    const startCodes = endCodes + segCountX2 + 2;
    const idDeltas = startCodes + segCountX2;
    const idRangeOffsets = idDeltas + segCountX2;
    for (let s = 0; s < segCount; s++) {
      const end = cmapTable.readUInt16BE(endCodes + s * 2);
      const start = cmapTable.readUInt16BE(startCodes + s * 2);
      const delta = cmapTable.readInt16BE(idDeltas + s * 2);
      const rangeOffsetPos = idRangeOffsets + s * 2;
      const rangeOffset = cmapTable.readUInt16BE(rangeOffsetPos);
      for (let cp = start; cp <= end && cp !== 0xffff; cp++) {
        let glyph;
        if (rangeOffset === 0) {
          glyph = (cp + delta) & 0xffff;
        } else {
          const glyphPos = rangeOffsetPos + rangeOffset + (cp - start) * 2;
          if (glyphPos + 2 > cmapTable.length) continue;
          glyph = cmapTable.readUInt16BE(glyphPos);
          if (glyph !== 0) glyph = (glyph + delta) & 0xffff;
        }
        if (glyph !== 0) cps.add(cp);
      }
    }
    if (cps.size > 0) return cps;
  }

  return null;
}

const NAMED_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0',
  middot: '\u00b7', copy: '\u00a9', reg: '\u00ae', trade: '\u2122',
  hellip: '\u2026', mdash: '\u2014', ndash: '\u2013',
  lsquo: '\u2018', rsquo: '\u2019', ldquo: '\u201c', rdquo: '\u201d',
  times: '\u00d7', divide: '\u00f7', plusmn: '\u00b1', minus: '\u2212',
  asymp: '\u2248', le: '\u2264', ge: '\u2265', ne: '\u2260',
  pi: '\u03c0', star: '\u2605', warning: '\u26a0', euro: '\u20ac',
  sect: '\u00a7', micro: '\u00b5', deg: '\u00b0', sup2: '\u00b2',
  sup3: '\u00b3', frac12: '\u00bd', frac14: '\u00bc',
};

function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]+);/gi, (whole, body) => {
    if (body[0] === '#') {
      const hex = body[1].toLowerCase() === 'x';
      const cp = parseInt(body.slice(hex ? 2 : 1), hex ? 16 : 10);
      return Number.isFinite(cp) ? String.fromCodePoint(cp) : whole;
    }
    return NAMED_ENTITIES[body.toLowerCase()] ?? whole;
  });
}

function visibleText(html) {
  const attributeText = [...html.matchAll(/\b(?:alt|title|aria-label)="([^"]*)"/g)]
    .map(m => m[1])
    .join(' ');
  const text = html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|template|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .concat(' ', attributeText);
  return decodeEntities(text);
}

const symbolCssRanges = readSymbolCssRanges();
const symbolCmap = readWoffCmap(symbolFontPath);
const symbolFontBytes = statSync(symbolFontPath).size;

if (symbolFontBytes > MAX_SYMBOL_FONT_BYTES) {
  console.error(
    `❌ Symbol font is ${symbolFontBytes} bytes, over the ${MAX_SYMBOL_FONT_BYTES}-byte budget`,
  );
  process.exit(1);
}

if (!symbolCmap) {
  console.error(`❌ Could not read the cmap of ${symbolFontPath}`);
  process.exit(1);
}

// A glyph only helps if BOTH the font has it AND the @font-face range claims
// it; otherwise the browser never asks this face for that codepoint.
const symbolCovered = [...symbolCmap].filter(cp => inRanges(cp, symbolCssRanges));
const symbolCoveredSet = new Set(symbolCovered);
const covered = (cp) =>
  inRanges(cp, LATIN_RANGES) ||
  symbolCoveredSet.has(cp) ||
  inRanges(cp, OS_ALLOWLIST);

const pages = [...walk(dist)];
if (pages.length === 0) {
  console.error('❌ No built HTML found in dist/ — run `npm run build` first');
  process.exit(1);
}

const samplePage = readFileSync(pages[0], 'utf-8');
const preloadTag = /<link[^>]+rel="preload"[^>]+as="font"[^>]+href="\/fonts\/ai-newsroom-symbols\.woff"/;
if (!preloadTag.test(samplePage)) {
  console.error('❌ Built HTML does not preload /fonts/ai-newsroom-symbols.woff');
  process.exit(1);
}
const layoutSource = readFileSync(layoutPath, 'utf-8');
const symbolBlock = layoutSource.slice(layoutSource.indexOf(`font-family: "${SYMBOL_FAMILY}"`));
if (!/font-display:\s*optional/.test(symbolBlock.slice(0, 600))) {
  console.error('❌ The symbol @font-face must keep font-display: optional');
  process.exit(1);
}

let checked = 0;
const misses = new Map();

for (const path of pages) {
  const rel = path.slice(dist.length) || '/';
  const text = visibleText(readFileSync(path, 'utf-8'));
  for (const char of text) {
    const cp = char.codePointAt(0);
    if (cp < 0x80) continue;
    checked++;
    if (covered(cp)) continue;
    const entry = misses.get(cp) ?? { char, count: 0, pages: new Set() };
    entry.count++;
    entry.pages.add(rel);
    misses.set(cp, entry);
  }
}

if (misses.size > 0) {
  console.error(
    `❌ ${misses.size} non-ASCII code point(s) used in built HTML are not covered by the bundled fonts:`,
  );
  const rows = [...misses].sort((a, b) => b[1].count - a[1].count);
  for (const [cp, entry] of rows) {
    const example = [...entry.pages][0];
    const extra = entry.pages.size > 1 ? ` in ${entry.pages.size} pages` : '';
    console.error(
      `  U+${cp.toString(16).toUpperCase().padStart(4, '0')} ${JSON.stringify(entry.char)} × ${entry.count}${extra} (e.g. ${example})`,
    );
  }
  console.error(
    '\nAdd the codepoint to the symbol font subset and its unicode-range, or add a deliberate OS-fallback allowance with a reason.',
  );
  process.exit(1);
}

console.log(
  `✅ Glyph coverage: ${pages.length} pages, ${checked} non-ASCII characters, all rendered by bundled fonts or intentional OS fallback`,
);
console.log(
  `   Symbol font: ${symbolCovered.length} glyphs in ${symbolFontBytes} bytes (${(symbolFontBytes / 1024).toFixed(1)} KiB), ${symbolCssRanges.length} unicode-range segments`,
);
