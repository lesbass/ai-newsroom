import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://news.lesbass.com/',
  output: 'static',

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});