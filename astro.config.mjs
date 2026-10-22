import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import githubDark from 'shiki/themes/github-dark.mjs';
import { rehypeLazyImages } from './src/lib/rehype-lazy-images.ts';
import { rehypeTableScroll } from './src/lib/rehype-table-scroll.ts';

export default defineConfig({
  site: 'https://news.lesbass.com/',
  output: 'static',

  markdown: {
    processor: unified({
      rehypePlugins: [rehypeLazyImages, rehypeTableScroll],
    }),
    shikiConfig: {
      theme: {
        ...githubDark,
        colorReplacements: {
          '#6a737d': '#8b949e',
        },
      },
    },
  },
});