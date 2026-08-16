import type { APIRoute, GetStaticPaths } from 'astro';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getPublishedPosts } from '@/lib/blog';
import { site } from '@/data/site';

/**
 * Build-time Open Graph cards, 1200x630.
 *
 * Font data comes from @fontsource/inter's .woff files — satori supports
 * ttf/otf/woff but NOT woff2, and it embeds glyph outlines as paths, so resvg
 * needs no system fonts. That matters because the Docker build stage is Alpine
 * with no fonts installed.
 *
 * latin-ext is loaded alongside latin so Czech diacritics in a title render
 * instead of dropping out.
 *
 * @fontsource/inter is therefore a real build dependency even though the site
 * itself gets its webfont from Astro's fonts API. Do not remove it as unused.
 */
const require = createRequire(import.meta.url);

async function loadFont(subset: 'latin' | 'latin-ext', weight: 400 | 700) {
  const path = require.resolve(
    `@fontsource/inter/files/inter-${subset}-${weight}-normal.woff`
  );
  return fs.readFile(path);
}

const fonts = await Promise.all([
  loadFont('latin', 400),
  loadFont('latin', 700),
  loadFont('latin-ext', 400),
  loadFont('latin-ext', 700),
]);

const FONTS = [
  { name: 'Inter', data: fonts[0], weight: 400 as const, style: 'normal' as const },
  { name: 'Inter', data: fonts[1], weight: 700 as const, style: 'normal' as const },
  { name: 'Inter', data: fonts[2], weight: 400 as const, style: 'normal' as const },
  { name: 'Inter', data: fonts[3], weight: 700 as const, style: 'normal' as const },
];

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title, tags: post.data.tags },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, tags } = props as { title: string; tags: string[] };

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          backgroundColor: '#0b0f19',
          backgroundImage:
            'linear-gradient(135deg, #1e293b 0%, #0b0f19 55%, #2e1065 100%)',
          fontFamily: 'Inter',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { display: 'flex', gap: '12px' },
              children: tags.slice(0, 3).map((tag) => ({
                type: 'div',
                props: {
                  style: {
                    fontSize: '24px',
                    color: '#93c5fd',
                    border: '2px solid #1e3a8a',
                    borderRadius: '999px',
                    padding: '6px 20px',
                  },
                  children: tag,
                },
              })),
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: title.length > 55 ? '60px' : '72px',
                fontWeight: 700,
                color: '#f8fafc',
                lineHeight: 1.15,
                // satori has no text-wrap:balance; the container width does
                // the wrapping.
                display: 'flex',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '28px',
                color: '#94a3b8',
              },
              children: [
                {
                  type: 'div',
                  props: { style: { display: 'flex' }, children: site.name },
                },
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex' },
                    children: 'macenauer.net',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    { width: 1200, height: 630, fonts: FONTS }
  );

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
    .render()
    .asPng();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
