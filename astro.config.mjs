import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { rehypeLazyImages } from './src/lib/rehype-lazy-images.ts';

export default defineConfig({
  site: 'https://news.lesbass.com/',
  output: 'static',

  markdown: {
    ...unified({ rehypePlugins: [rehypeLazyImages] }),
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});