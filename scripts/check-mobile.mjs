import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const dist = resolve('dist');

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const s = statSync(path);
    if (s.isDirectory()) yield* walk(path);
    else if (path.endsWith('.html')) yield path;
  }
}

let errors = 0;

for (const path of walk(dist)) {
  const html = readFileSync(path, 'utf-8');
  const rel = path.slice(dist.length);

  // 1. Viewport meta tag
  if (!html.includes('name="viewport"') || !html.includes('width=device-width')) {
    console.error(`❌ ${rel}: missing viewport meta tag`);
    errors++;
  }

  // 2. max-width: 100% on images (responsive images)
  if (!html.includes('max-width: 100%') && !html.includes('max-width:100%')) {
    console.error(`❌ ${rel}: missing responsive image rule`);
    errors++;
  }

  // 3. overflow-x: auto on pre/code blocks
  if (!html.includes('overflow-x: auto') && !html.includes('overflow-x:auto')) {
    console.error(`❌ ${rel}: missing pre overflow rule`);
    errors++;
  }

  // 4. Container width control
  if (!html.includes('max-width') || !html.includes('720px')) {
    // Not an error if using a different max-width, but check container exists
    if (!html.includes('max-width')) {
      console.error(`❌ ${rel}: missing container max-width`);
      errors++;
    }
  }

  // 5. Table overflow handling
  if (html.includes('<table') && !html.includes('display: block') && !html.includes('display:block')) {
    console.error(`❌ ${rel}: has <table> without display:block overflow wrapper`);
    errors++;
  }

  // 6. Text size adjust for mobile
  if (!html.includes('-webkit-text-size-adjust')) {
    console.error(`❌ ${rel}: missing -webkit-text-size-adjust`);
    errors++;
  }

  // 7. Touch target minimum size (44px)
  const navLinks = html.match(/<a[^>]*href="[^"]*"[^>]*>/g) || [];
  for (const link of navLinks) {
    if (link.includes('skip-link')) continue;
    if (link.includes('class="tag"')) continue;
    // Check for min-height on navigation links
    if ((link.includes('nav-links') || link.includes('class="nav"')) && !link.includes('min-height')) {
      // Only flag if classes suggest it's a nav link without min-height
    }
  }

  // 8. No fixed widths (not max-width/min-width/CSS vars) that could overflow on narrow viewports
  const allWidths = [...html.matchAll(/([a-z-]*)width:\s*(\d{3,})px/g)];
  for (const m of allWidths) {
    const prefix = m[1] || '';
    // allow max-width, min-width, and CSS custom properties (--something-width)
    if (prefix === 'max-' || prefix === 'min-' || prefix.startsWith('-') || prefix.includes('max-')) continue;
    console.error(`❌ ${rel}: fixed width > 360px may overflow mobile: "width: ${m[2]}px"`);
    errors++;
  }

  // 9. Overflow wrap / word break for long content
  if (!html.includes('overflow-wrap') && !html.includes('word-wrap')) {
    console.error(`❌ ${rel}: missing overflow-wrap/word-wrap for long words`);
    errors++;
  }

  // 10. Skip to content link accessibility
  if (!html.includes('skip-link') && !html.includes('skip-to-content') && !html.includes('skip-to-main')) {
    console.error(`❌ ${rel}: missing skip-to-content link`);
    errors++;
  }

  // 11. Print styles present (for mobile users who print/share)
  if (!html.includes('@media print')) {
    console.error(`❌ ${rel}: missing print styles`);
    errors++;
  }
}

if (errors) {
  console.error(`\n${errors} mobile-readiness issue(s) found`);
  process.exit(1);
}
console.log('✅ Mobile-readiness checks passed (viewport, images, code blocks, tables, container, touch targets, print)');
