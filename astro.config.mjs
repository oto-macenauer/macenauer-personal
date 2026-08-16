// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.macenauer.net',
  output: 'static',

  integrations: [sitemap()],

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
