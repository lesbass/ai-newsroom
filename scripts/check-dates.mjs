import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const articlesDir = resolve('src/content/articles');

let errors = 0;

const DATE_FIELDS = [
  { key: 'pubDate', required: true },
  { key: 'updatedDate', required: false },
];

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

  const frontmatter = frontmatterMatch[1];

  for (const { key, required } of DATE_FIELDS) {
    const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    if (!match) {
      if (required) {
        console.error(`❌ ${file}: missing ${key} in frontmatter`);
        errors++;
      }
      continue;
    }

    const value = match[1].trim().replace(/^["']|["']$/g, '');
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      console.error(`❌ ${file}: invalid ${key} "${value}"`);
      errors++;
      continue;
    }

    if (date > new Date()) {
      console.error(`❌ ${file}: ${key} "${value}" is in the future`);
      errors++;
    }
  }
}

if (errors) {
  console.error(`\n${errors} article(s) with future or invalid date(s) found`);
  process.exit(1);
}
console.log('✅ All article publication and update dates are valid and not in the future');
