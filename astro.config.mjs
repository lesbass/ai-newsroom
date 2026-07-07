import { defineConfig } from 'astro/config';
import { rehypeLazyImages } from './src/lib/rehype-lazy-images.ts';

export default defineConfig({
  site: 'https://news.lesbass.com/',
  output: 'static',

  markdown: {
    rehypePlugins: [rehypeLazyImages],
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});