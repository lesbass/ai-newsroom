/**
 * Intrinsic size reader for the raster formats the site serves.
 *
 * Used by the build (src/lib/ogImage.ts) and by scripts/check-seo.mjs so the
 * og:image:width/height claim is always checked against the real file bytes.
 * Unknown or malformed input returns null instead of guessing.
 */

import { readFileSync } from 'node:fs';

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

// SVG is text, so intrinsic size comes from the root <svg> tag: prefer the
// explicit width/height attributes, otherwise fall back to the viewBox. A
// percentage dimension carries no intrinsic pixel size and is ignored.
function readSvgSize(text) {
  const root = text.match(/<svg\b[^>]*>/i);
  if (!root) return null;
  const tag = root[0];
  const dim = (attr) => {
    const m = tag.match(new RegExp(`\\b${attr}\\s*=\\s*["']?([\\d.]+)\\s*([a-z%]*)`, 'i'));
    if (!m || m[2] === '%') return null;
    const n = parseFloat(m[1]);
    return Number.isFinite(n) && n > 0 ? n : null;
  };
  const w = dim('width');
  const h = dim('height');
  if (w && h) return { width: Math.round(w), height: Math.round(h) };
  const vb = tag.match(/viewBox\s*=\s*["']\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
  if (vb) {
    const vw = parseFloat(vb[1]);
    const vh = parseFloat(vb[2]);
    if (vw > 0 && vh > 0) return { width: Math.round(vw), height: Math.round(vh) };
  }
  return null;
}

export function readImageSize(buf) {
  if (!Buffer.isBuffer(buf) || buf.length < 16) return null;

  // SVG: XML text. The root <svg> element always appears in the opening chunk
  // (before any large embedded data), so only sniff the head.
  const head = buf.subarray(0, Math.min(buf.length, 8192)).toString('utf8');
  if (/<svg\b/i.test(head) && !head.includes('\u0000')) {
    const svg = readSvgSize(head);
    if (svg) return svg;
  }

  // PNG: 8-byte signature, IHDR length/type, then width/height big-endian.
  if (buf.length > 24 && buf.subarray(0, 8).equals(PNG_SIGNATURE)) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // GIF: "GIF87a"/"GIF89a", then logical screen width/height little-endian.
  const gifHeader = buf.subarray(0, 6).toString('latin1');
  if (gifHeader === 'GIF87a' || gifHeader === 'GIF89a') {
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  }

  // JPEG: walk markers to a Start-Of-Frame segment (excludes DHT/JPG/DAC).
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buf.length) {
      if (buf[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buf[offset + 1];
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
        offset += 2;
        continue;
      }
      const length = buf.readUInt16BE(offset + 2);
      if (length < 2) return null;
      const isSof =
        marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isSof) {
        return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
      }
      offset += 2 + length;
    }
    return null;
  }

  // WebP: RIFF container with VP8 (lossy), VP8L (lossless) or VP8X (extended).
  if (
    buf.length > 30 &&
    buf.subarray(0, 4).toString('latin1') === 'RIFF' &&
    buf.subarray(8, 12).toString('latin1') === 'WEBP'
  ) {
    const chunk = buf.subarray(12, 16).toString('latin1');
    if (chunk === 'VP8 ') {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    }
    if (chunk === 'VP8L') {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (chunk === 'VP8X') {
      return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 };
    }
  }

  return null;
}

const fileCache = new Map();

export function readImageSizeFile(path) {
  if (fileCache.has(path)) return fileCache.get(path);
  let size = null;
  try {
    size = readImageSize(readFileSync(path));
  } catch {
    size = null;
  }
  fileCache.set(path, size);
  return size;
}
