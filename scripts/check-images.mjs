import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';

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
let warnings = 0;

for (const path of walk(dist)) {
  const rel = path.slice(dist.length);
  const html = readFileSync(path, 'utf-8');
  const isArticle = rel.startsWith('/articles/') && !rel.endsWith('/articles/index.html');

  const imgTags = html.match(/<img[^>]*>/g) || [];
  const internalImgs = imgTags.filter(tag => {
    const srcMatch = tag.match(/src="([^"]*)"/);
    return srcMatch && !srcMatch[1].startsWith('http') && !srcMatch[1].startsWith('data:');
  });
  const externalImgs = imgTags.filter(tag => {
    const srcMatch = tag.match(/src="([^"]*)"/);
    return srcMatch && (srcMatch[1].startsWith('http') || srcMatch[1].startsWith('data:'));
  });

  if (isArticle) {
    if (imgTags.length === 0) {
      console.warn(`⚠  ${rel}: no <img> tags (editorial policy requires at least one image per article)`);
      warnings++;
    }

    const ogImgMatch = html.match(/<meta property="og:image" content="([^"]*)"/);
    if (ogImgMatch && ogImgMatch[1].includes('favicon.svg')) {
      console.warn(`⚠  ${rel}: og:image is favicon fallback (article should have a real image)`);
      warnings++;
    }

    const twitterImgMatch = html.match(/<meta name="twitter:image" content="([^"]*)"/);
    if (twitterImgMatch && twitterImgMatch[1].includes('favicon.svg')) {
      console.warn(`⚠  ${rel}: twitter:image is favicon fallback (article should have a real image)`);
      warnings++;
    }

    const jsonLdMatch = html.match(/<script type="application\/ld\+json">\s*({[^<]+})/s);
    if (jsonLdMatch) {
      try {
        const ld = JSON.parse(jsonLdMatch[1]);
        if (ld['@type'] === 'NewsArticle' && ld.image && ld.image.toString().includes('favicon.svg')) {
          console.warn(`⚠  ${rel}: JSON-LD image is favicon fallback (article should have a real image)`);
          warnings++;
        }
      } catch { /* JSON parse error — skip invalid LD+JSON */ }
    }
  }

  for (const tag of imgTags) {
    if (!/alt="[^"]*"/.test(tag) && !/alt='[^']*'/.test(tag)) {
      console.error(`❌ ${rel}: <img> missing alt attribute`);
      errors++;
      break;
    }

    const altMatch = tag.match(/alt="([^"]*)"/) || tag.match(/alt='([^']*)'/);
    if (altMatch && altMatch[1].trim() === '') {
      console.warn(`⚠  ${rel}: <img> has empty alt text`);
      warnings++;
    }

    if (!/loading="/.test(tag)) {
      console.warn(`⚠  ${rel}: <img> missing loading attribute (recommend loading="lazy")`);
      warnings++;
    }
  }

  for (const tag of internalImgs) {
    const srcMatch = tag.match(/src="([^"]*)"/);
    const src = srcMatch[1];

    let filePath;
    if (src.startsWith('/')) {
      filePath = join(dist, src);
    } else {
      const pageDir = dirname(rel);
      filePath = resolve(dist, pageDir, src);
    }

    if (!existsSync(filePath)) {
      const altPath = filePath.replace(/\/$/, '') + '.html';
      if (!existsSync(altPath)) {
        console.error(`❌ ${rel}: broken image src="${src}" (file not found)`);
        errors++;
      }
    }
  }

  if (imgTags.length > 0 && isArticle) {
    const imgContent = html.split(/<img[^>]*>/);
    for (let i = 0; i < imgTags.length; i++) {
      const afterText = imgContent[i + 1] ? imgContent[i + 1].slice(0, 500).toLowerCase() : '';
      const hasCredit = /source\s*:|credit\s*:|image\s*:|generated\s|license\s*:|photo\s*:|screenshot\s*:|diagram\s*:|created\s+with|dall-e|midjourney|stable\s*diffusion|imagen/i.test(afterText);
      if (!hasCredit) {
        console.warn(`⚠  ${rel}: <img> may be missing source/credit/license caption (check nearby text)`);
        warnings++;
        break;
      }
    }
  }

  if (internalImgs.length > 0) {
    for (const tag of internalImgs) {
      const srcMatch = tag.match(/src="([^"]*)"/);
      const src = srcMatch[1];
      let filePath;
      if (src.startsWith('/')) {
        filePath = join(dist, src);
      } else {
        const pageDir = dirname(rel);
        filePath = resolve(dist, pageDir, src);
      }
      if (existsSync(filePath)) {
        const stats = statSync(filePath);
        const sizeMB = stats.size / (1024 * 1024);
        if (sizeMB > 1) {
          console.warn(`⚠  ${rel}: large image src="${src}" (${sizeMB.toFixed(1)} MB, aim for <1 MB)`);
          warnings++;
        }
      }
    }
  }

  if (externalImgs.length > 0) {
    for (const tag of externalImgs) {
      const srcMatch = tag.match(/src="([^"]*)"/);
      if (srcMatch) {
        const src = srcMatch[1];
        if (src.startsWith('data:')) {
          console.warn(`⚠  ${rel}: inline data: URI image (prefer linked image for cacheability)`);
          warnings++;
        }
      }
    }
  }
}

const faviconPath = join(dist, 'favicon.svg');
if (existsSync(faviconPath)) {
  try {
    const favicon = readFileSync(faviconPath, 'utf-8');
    if (!favicon.includes('<svg') && !favicon.includes('xmlns')) {
      console.error('❌ favicon.svg is not a valid SVG');
      errors++;
    }
  } catch {
    console.error('❌ cannot read favicon.svg');
    errors++;
  }
}

if (errors > 0) {
  console.error(`\n${errors} image error(s) found`);
}
if (warnings > 0) {
  console.warn(`${warnings} image warning(s) found`);
}
if (errors === 0 && warnings === 0) {
  console.log('✅ All image checks passed');
  process.exit(0);
} else if (errors === 0) {
  console.log('✅ All image error checks passed (warnings only)');
  process.exit(0);
} else {
  process.exit(1);
}
