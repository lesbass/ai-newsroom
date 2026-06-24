import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://ai-newsroom.pages.dev',
  output: 'static',

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },

  adapter: cloudflare(),
});