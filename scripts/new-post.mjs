#!/usr/bin/env node
/**
 * Scaffolds a blog post directory so no skill has to hand-build paths.
 *
 *   npm run new-post -- "Why our .NET service got faster by doing less"
 *
 * Creates src/content/blog/<slug>/ with index.md, a media/ directory and a
 * generated placeholder cover. The placeholder exists because `cover` is a
 * required, validated image — without one the post would not even load in dev.
 * blog-images replaces it, and check-blog refuses to publish while a cover
 * named "placeholder" is still in place.
 *
 * The post starts as draft: true.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const title = process.argv.slice(2).join(' ').trim();

if (!title) {
  console.error('Usage: npm run new-post -- "Post title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '') // strip diacritics: Škoda -> Skoda
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 60)
  .replace(/-+$/, '');

if (!slug) {
  console.error('Could not derive a slug from that title.');
  process.exit(1);
}

const postDir = path.join(process.cwd(), 'src', 'content', 'blog', slug);

if (fs.existsSync(postDir)) {
  console.error(`Already exists: src/content/blog/${slug}`);
  process.exit(1);
}

fs.mkdirSync(path.join(postDir, 'media'), { recursive: true });

// Placeholder cover, clearly not publishable.
const placeholder = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900">
     <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
       <stop offset="0%" stop-color="#334155"/><stop offset="100%" stop-color="#1e293b"/>
     </linearGradient></defs>
     <rect width="1600" height="900" fill="url(#g)"/>
   </svg>`
);

await sharp(placeholder)
  .jpeg({ quality: 70 })
  .toFile(path.join(postDir, 'media', 'cover-placeholder.jpg'));

const today = new Date().toISOString().slice(0, 10);
const escaped = title.replace(/'/g, "''");

const frontmatter = `---
title: '${escaped}'
date: ${today}
summary: ONE OR TWO SENTENCES. Becomes the meta description, the card blurb, the RSS description and the starting point for the LinkedIn hook. Between 50 and 200 characters.
tags: [TODO]
cover: media/cover-placeholder.jpg
coverAlt: TODO — describe what the cover image shows
draft: true
---

Opening hook: two or three sentences, no throat-clearing. State the concrete
thing that happened or the problem worth caring about.

## First section

<!-- image-brief: what this visual should show, and why it earns its place -->

## Second section

## What I'd take away

One concrete takeaway the reader can act on.
`;

fs.writeFileSync(path.join(postDir, 'index.md'), frontmatter);

console.log(`Created src/content/blog/${slug}/`);
console.log('  index.md                      (draft: true)');
console.log('  media/cover-placeholder.jpg   replace before publishing');
console.log(`\nURL when published: /blog/${slug}/`);
console.log('Next: blog-draft to write it, then blog-images, then blog-share.');
