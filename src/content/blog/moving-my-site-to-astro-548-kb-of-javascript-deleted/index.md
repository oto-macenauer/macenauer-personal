---
title: 'Moving my site to Astro: 548 kB of JavaScript, deleted'
date: 2026-08-16
summary: What I gained and what I paid moving this portfolio from Next.js to Astro — including a TypeScript 7 incompatibility and a build step that fails silently.
tags: [astro, typescript, performance]
cover: media/hero.jpg
coverAlt: Long-exposure photograph of red and white light trails along a dark highway at night
credit:
  name: Markus Spiske
  url: https://www.pexels.com/@markusspiske
  source: Pexels
  license: Pexels License
draft: false
---

This site was five components and 527 lines. Every one of them was marked
`'use client'`. There was not a single `useState` or `useEffect` anywhere in
it.

The only reason React reached the browser at all was 66 Framer Motion calls
doing fade-ins and slide-ups. So the site shipped React, React DOM and an
animation runtime — 548,939 bytes across seven requests — to animate `opacity`
on a static résumé.

## What actually changed

[Astro](https://docs.astro.build/) renders to static HTML and ships no
JavaScript unless you ask for it. Measured on the same page, loaded in a real
browser, before and after:

| Measurement | Next.js | Astro |
| --- | ---: | ---: |
| Client JavaScript | 548,939 bytes | 0 bytes |
| Script requests | 7 | 0 |
| Total HTTP requests | 12 | 5 |

The critical path afterwards — HTML plus CSS, gzipped — is 11.2 kB, and the one
script the page still needs is inlined into the HTML rather than fetched.

The animations survived. Framer Motion's `whileInView` became about thirty
lines of CSS transitions driven by a single `IntersectionObserver`. It honors
[`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion),
which the Framer version did not.

I checked the layout was genuinely unchanged rather than assuming it, by
screenshotting both versions at three widths and comparing full-page scroll
height:

| Viewport width | Next.js | Astro |
| --- | ---: | ---: |
| 375 px | 7159 px | 7159 px |
| 768 px | 5356 px | 5356 px |
| 1440 px | 4645 px | 4645 px |

Identical at all three. That is the measurement worth taking before you trust a
migration.

The container got smaller as a side effect. The build output is static files,
so there is no Node process in production — nginx serves a directory, and the
image is 82 MB instead of a Node runtime.

## What it cost

**Node 22.12.** Astro 7 [requires it](https://docs.astro.build/en/install-and-setup/).
My Dockerfile said `node:20-alpine`, which worked locally because my machine
runs 22, and failed the moment I built the image. Worth pinning `engines` in
`package.json` so this fails at install rather than in CI.

**TypeScript 7 is not usable yet.** The
[native port](https://devblogs.microsoft.com/typescript/typescript-native-port/)
is out, but [`@astrojs/check`](https://www.npmjs.com/package/@astrojs/check)
declares `"typescript": "^5.0.0 || ^6.0.0"`, so 7.x falls outside its supported
range and breaks the build. Support is expected in 7.1.

:::warn
If you use Dependabot, it will keep proposing TypeScript 7 and the bump will
keep breaking your build. An
[ignore range](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference)
of `>=7.0.0 <7.1.0` stops the noise without hiding the version you actually
want.
:::

I moved to TypeScript 6 instead. It is the last JavaScript-based release line
and aligns its deprecations with the native port, so it surfaces the
7-blocking patterns early while there is still a way back.

**The Markdown processor changed underneath me.** Astro 7 ships a new native
pipeline as [the default](https://docs.astro.build/en/guides/markdown-content/).
Anything built on [remark](https://github.com/remarkjs/remark-directive)
plugins now has to opt back in explicitly. I did — the remark ecosystem is
mature and the native package is still on an early version with no documented
extension API — but it is a fork in the road you have to notice.

**Ecosystem churn.** [Lucide](https://lucide.dev/icons/) has dropped its brand
icons, and the obvious icon integration pulled in a transitive dependency with
a high-severity advisory whose only offered fix was a major downgrade. I
inlined twelve SVG paths instead and removed the dependency entirely. For
twelve icons that is the right trade regardless.

## The one that would have bitten me quietly

Astro's content loader catches Markdown render errors, logs them, and lets the
build exit zero. The page is still emitted, with the full layout and an empty
body.

I found this by testing a deliberate typo rather than trusting the error
message I had written. The build printed a red error and then reported success,
and the published page had a header, a footer and nothing in between.

:::warn
An error in your build log does not mean a failed build. Check the exit code,
and assert on the output.
:::

The fix was two guards: one that validates the content before the build, and
one that asserts afterwards that every published page actually rendered a
non-empty body. The second is the one that matters, because it catches the
whole class of silent render failures rather than the single case I happened to
think of.

## Then the blog was almost free

This is the part that justified the timing. I wanted to add writing to the site,
and most of what a blog needs turned out to be built in.

[Content collections](https://docs.astro.build/en/guides/content-collections/)
gave me schema-validated frontmatter, so a malformed post fails the build
instead of publishing broken. Relative images in Markdown are
[optimized automatically](https://docs.astro.build/en/guides/images/) —
responsive `srcset`, modern formats, intrinsic dimensions — which deleted an
entire image pipeline I had scoped out and would otherwise have written and
maintained. Sitemap and RSS are one integration each.

Had I built the blog on the old stack first, I would have written all of that
by hand and thrown it away. That ordering was luck as much as planning.

## What I would tell someone considering it

Measure the JavaScript your site actually needs before you argue about
frameworks. Open the network tab, filter to scripts, and total the bytes. Then
ask which of it earns its place.

If the answer is "none of it, but the animations are nice", the migration is
smaller than it looks — and the failure modes above are all findable in an
afternoon if you know to look for them.

## References

- [Astro documentation](https://docs.astro.build/) — and specifically
  [install requirements](https://docs.astro.build/en/install-and-setup/),
  [content collections](https://docs.astro.build/en/guides/content-collections/),
  [images](https://docs.astro.build/en/guides/images/) and
  [Markdown processors](https://docs.astro.build/en/guides/markdown-content/)
- [`@astrojs/check`](https://www.npmjs.com/package/@astrojs/check) — the
  TypeScript peer range quoted above
- [A native port of the TypeScript compiler](https://devblogs.microsoft.com/typescript/typescript-native-port/)
  — Microsoft's announcement of what became TypeScript 7
- [Dependabot options reference](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference)
  — `ignore` syntax for version ranges
- [remark-directive](https://github.com/remarkjs/remark-directive) — the
  callout syntax this site uses
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
  on MDN
- [Lucide](https://lucide.dev/icons/) — icon set, brand marks no longer included

Figures in this post were measured on this site during the migration described.
Request counts and transfer sizes come from a scripted browser load of the same
page before and after; scroll heights from full-page screenshots at each width.
