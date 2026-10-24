import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const script = join(dirname(fileURLToPath(import.meta.url)), 'check-links.mjs');

function makeFixture(homeLink) {
  const root = mkdtempSync(join(tmpdir(), 'check-links-'));
  const guideDir = join(root, 'dist', 'guide');
  mkdirSync(guideDir, { recursive: true });
  writeFileSync(
    join(root, 'dist', 'index.html'),
    `<!doctype html><html><body><a href="${homeLink}">guide</a></body></html>`,
  );
  writeFileSync(
    join(guideDir, 'index.html'),
    '<!doctype html><html><body><h2 id="setup">Setup</h2><h2 id="café">Café</h2></body></html>',
  );
  return { root, cleanup: () => rmSync(root, { recursive: true, force: true }) };
}

function runCheck(root) {
  try {
    const stdout = execFileSync(process.execPath, [script], {
      cwd: root,
      encoding: 'utf-8',
      stdio: 'pipe',
    });
    return { code: 0, output: stdout };
  } catch (error) {
    return { code: error.status, output: `${error.stdout || ''}${error.stderr || ''}` };
  }
}

test('passes when a cross-page fragment exists in the target page', (t) => {
  const fixture = makeFixture('/guide/#setup');
  t.after(fixture.cleanup);
  const result = runCheck(fixture.root);
  assert.equal(result.code, 0, result.output);
});

test('fails when a cross-page fragment points at a missing id', (t) => {
  const fixture = makeFixture('/guide/#renamed-heading');
  t.after(fixture.cleanup);
  const result = runCheck(fixture.root);
  assert.equal(result.code, 1, result.output);
  assert.match(result.output, /broken cross-page anchor: \/guide\/#renamed-heading/);
});

test('resolves percent-encoded fragments against the target id', (t) => {
  const fixture = makeFixture('/guide/#caf%C3%A9');
  t.after(fixture.cleanup);
  const result = runCheck(fixture.root);
  assert.equal(result.code, 0, result.output);
});

test('checks fragments on same-origin absolute links too', (t) => {
  const fixture = makeFixture('https://news.lesbass.com/guide/#renamed-heading');
  t.after(fixture.cleanup);
  const result = runCheck(fixture.root);
  assert.equal(result.code, 1, result.output);
  assert.match(result.output, /broken cross-page anchor: \/guide\/#renamed-heading/);
});

test('accepts the implicit #top fragment', (t) => {
  const fixture = makeFixture('/guide/#top');
  t.after(fixture.cleanup);
  const result = runCheck(fixture.root);
  assert.equal(result.code, 0, result.output);
});
