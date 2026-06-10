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

  // 1. Viewport meta tag
  if (!html.includes('name="viewport"') || !html.includes('width=device-width')) {
    console.error(`❌ ${path.slice(dist.length)} missing viewport meta tag`);
    errors++;
  }

  // 2. max-width: 100% on images
  if (!html.includes('max-width: 100%') && !html.includes('max-width:100%')) {
    console.error(`❌ ${path.slice(dist.length)} missing responsive image rule`);
    errors++;
  }

  // 3. overflow-x: auto on pre
  if (!html.includes('overflow-x: auto') && !html.includes('overflow-x:auto')) {
    console.error(`❌ ${path.slice(dist.length)} missing pre overflow rule`);
    errors++;
  }

  // 4. container width control
  if (!html.includes('max-width: 720px') && !html.includes('max-width:720px')) {
    console.error(`❌ ${path.slice(dist.length)} missing container max-width`);
    errors++;
  }
}

if (errors) {
  console.error(`\n${errors} mobile-readiness issue(s) found`);
  process.exit(1);
}
console.log('✅ Mobile-readiness checks passed (viewport, images, code blocks, container width)');
