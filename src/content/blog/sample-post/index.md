---
title: 'Sample post: everything the blog can do'
date: 2026-08-16
summary: A disposable smoke-test post that exercises every feature of the blog pipeline — callouts, code blocks, images, tags and metadata. Delete it once real posts exist.
tags: [meta, astro]
cover: media/hero.jpg
coverAlt: Abstract blue and purple gradient
draft: false
---

This post exists to prove the pipeline works end to end. It is safe to delete
once there is real content — nothing references it.

## Prose and inline formatting

Body copy renders through the shared prose styles, with **bold**, _italic_,
`inline code`, and [links](https://www.macenauer.net) all styled to match the
rest of the site. Long-form text is capped at a comfortable measure rather
than running the full width of the page.

## Callouts

Three callout types are available, written as `remark-directive` containers so
the file stays valid Markdown anywhere it is opened.

:::note
This is a note. Use it for asides that add context without changing what the
reader should do.
:::

:::tip
This is a tip. Use it for the shortcut you wish someone had told you earlier.
:::

:::warn
This is a warning. Use it sparingly, or it stops being read.
:::

An unrecognised directive — `:::warning` instead of `:::warn`, say — fails the
build rather than rendering as stray text.

## Code

Syntax highlighting is Shiki, configured with a light and a dark theme that
follow the visitor's system preference:

```ts
export function readingTime(words: number): number {
  return Math.max(1, Math.round(words / 220));
}
```

```bash
npm run blog:check   # validates frontmatter and unresolved image briefs
```

## Images

Images are written as ordinary relative Markdown links. Astro optimizes them at
build time — responsive `srcset`, modern formats, and intrinsic dimensions so
nothing shifts as the page loads.

![Abstract blue and purple gradient](media/hero.jpg)

## Metadata

Reading time is computed from the parsed Markdown, so frontmatter and code
blocks are not counted as prose. Tags become their own pages. The Open Graph
card is generated at build time from the title.
