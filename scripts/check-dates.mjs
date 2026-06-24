import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const articlesDir = resolve('src/content/articles');

let errors = 0;

const files = readdirSync(articlesDir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const path = join(articlesDir, file);
  const content = readFileSync(path, 'utf-8');

  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    console.error(`❌ ${file}: missing YAML frontmatter`);
    errors++;
    continue;
  }

  const pubDateMatch = frontmatterMatch[1].match(/^pubDate:\s*(.+)$/m);
  if (!pubDateMatch) {
    console.error(`❌ ${file}: missing pubDate in frontmatter`);
    errors++;
    continue;
  }

  const pubDateStr = pubDateMatch[1].trim();
  const pubDate = new Date(pubDateStr);

  if (isNaN(pubDate.getTime())) {
    console.error(`❌ ${file}: invalid pubDate "${pubDateStr}"`);
    errors++;
    continue;
  }

  if (pubDate > new Date()) {
    console.error(`❌ ${file}: pubDate "${pubDateStr}" is in the future`);
    errors++;
  }
}

if (errors) {
  console.error(`\n${errors} article(s) with future or invalid publication date(s) found`);
  process.exit(1);
}
console.log('✅ All article publication dates are valid and not in the future');
