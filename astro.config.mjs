// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import remarkDirective from 'remark-directive';
import { remarkCallout } from './src/plugins/remark-callout.mjs';
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';

export default defineConfig({
  site: 'https://www.macenauer.net',
  output: 'static',

  integrations: [
    sitemap({
      // Drafts are excluded from the build entirely, but the 404 page is not
      // a real destination and should never be indexed.
      filter: (page) => !page.includes('/404'),
    }),
  ],

  markdown: {
    // Astro 7 defaults to Sätteri. This opts back into the remark/rehype
    // pipeline: the callout and reading-time plugins are remark plugins, and
    // remark-directive is a mature dependency, whereas @astrojs/markdown-satteri
    // is still 0.3.x with no documented extension API.
    processor: unified({
      // remarkDirective must run before remarkCallout — it produces the
      // directive nodes that remarkCallout rewrites.
      remarkPlugins: [remarkDirective, remarkCallout, remarkReadingTime],
    }),
    shikiConfig: {
      // Dual themes emit CSS variables for both; global.css switches between
      // them under prefers-color-scheme.
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      // Variable font: one range covers every weight the site uses.
      weights: ['400 700'],
      // latin-ext is required for the Czech diacritics in the resume
      // (Škoda, Česká pojišťovna, ČSOB Pojišťovna).
      subsets: ['latin', 'latin-ext'],
      styles: ['normal'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});
