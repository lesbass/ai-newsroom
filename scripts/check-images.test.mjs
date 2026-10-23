import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const script = join(dirname(fileURLToPath(import.meta.url)), 'check-images.mjs');

// Minimal PNG header with a real IHDR width/height. The image checker reads
// dimensions from bytes 16-23 and does not decode pixels, so this is enough to
// exercise the 1200 px og:image floor without shipping binary fixtures.
function makePng(width, height) {
  const buf = Buffer.alloc(33);
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(buf, 0);
  buf.writeUInt32BE(13, 8);
  buf.write('IHDR', 12, 'latin1');
  buf.writeUInt32BE(width, 16);
  buf.writeUInt32BE(height, 20);
  buf[24] = 8;
  buf[25] = 6;
  return buf;
}

function makeFixture({ heroCredit = true, inlineCredit = 'paragraph', ogWidth = 1200, ogHeight = 630 } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'check-images-'));
  const articleDir = join(root, 'dist', 'articles', 'fixture-article');
  const imageDir = join(root, 'dist', 'images', 'articles', 'fixture');
  mkdirSync(articleDir, { recursive: true });
  mkdirSync(imageDir, { recursive: true });
  writeFileSync(join(imageDir, 'hero.png'), makePng(ogWidth, ogHeight));
  writeFileSync(join(imageDir, 'inline.png'), makePng(1200, 630));
  writeFileSync(join(root, 'dist', 'favicon.svg'), '<svg xmlns="http://www.w3.org/2000/svg"></svg>');

  const heroCaption = heroCredit
    ? '<figcaption class="article-hero-credit">Source: https://example.com/hero · License: MIT</figcaption>'
    : '';
  const inlineCaption = inlineCredit === 'paragraph'
    ? '<p><em>Source: https://example.com/inline, captured 2026-10-22. License: CC BY 4.0.</em></p>'
    : inlineCredit === 'figure'
      ? ''
      : '<p>This paragraph has no image disclosure at all.</p>';
  const inline = inlineCredit === 'figure'
    ? '<figure><img src="/images/articles/fixture/inline.png" alt="Fixture inline" loading="lazy"><figcaption>Source: https://example.com/inline · License: CC BY 4.0</figcaption></figure>'
    : `<p><img src="/images/articles/fixture/inline.png" alt="Fixture inline" loading="lazy"></p>${inlineCaption}`;

  writeFileSync(join(articleDir, 'index.html'), `<!doctype html><html><head>
<meta property="og:image" content="/images/articles/fixture/hero.png">
</head><body><article>
<figure class="article-hero"><img src="/images/articles/fixture/hero.png" alt="Fixture hero" loading="eager" fetchpriority="high" width="1200" height="630">${heroCaption}</figure>
${inline}
</article></body></html>`);

  return { root, cleanup: () => rmSync(root, { recursive: true, force: true }) };
}

function runCheck(root) {
  try {
    const stdout = execFileSync(process.execPath, [script], { cwd: root, encoding: 'utf-8', stdio: 'pipe' });
    return { code: 0, output: stdout };
  } catch (error) {
    return { code: error.status, output: `${error.stdout || ''}${error.stderr || ''}` };
  }
}

test('passes when hero and inline images carry disclosures', (t) => {
  const fixture = makeFixture();
  t.after(fixture.cleanup);
  const result = runCheck(fixture.root);
  assert.equal(result.code, 0, result.output);
});

test('passes when an inline image disclosure is in the enclosing figure', (t) => {
  const fixture = makeFixture({ inlineCredit: 'figure' });
  t.after(fixture.cleanup);
  const result = runCheck(fixture.root);
  assert.equal(result.code, 0, result.output);
});

test('fails when the hero caption is missing', (t) => {
  const fixture = makeFixture({ heroCredit: false });
  t.after(fixture.cleanup);
  const result = runCheck(fixture.root);
  assert.equal(result.code, 1, result.output);
  assert.match(result.output, /article hero <figure> missing visible \.article-hero-credit caption/);
});

test('fails when the og:image is narrower than 1200px', (t) => {
  const fixture = makeFixture({ ogWidth: 800, ogHeight: 450 });
  t.after(fixture.cleanup);
  const result = runCheck(fixture.root);
  assert.equal(result.code, 1, result.output);
  assert.match(result.output, /og:image is 800x450 .* must be at least 1200px wide/);
});

test('passes when the og:image is exactly 1200px wide', (t) => {
  const fixture = makeFixture({ ogWidth: 1200, ogHeight: 630 });
  t.after(fixture.cleanup);
  const result = runCheck(fixture.root);
  assert.equal(result.code, 0, result.output);
});

test('fails when the inline image disclosure is missing', (t) => {
  const fixture = makeFixture({ inlineCredit: 'none' });
  t.after(fixture.cleanup);
  const result = runCheck(fixture.root);
  assert.equal(result.code, 1, result.output);
  assert.match(result.output, /inline article image .* missing source\/credit\/license caption/);
});
