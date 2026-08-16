# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Full gated build (see below)
npm run preview    # Serve the built dist/ locally
npm run lint       # astro check — types and template diagnostics
npm run blog:check # Authoring guard for blog posts
npm run cv         # Regenerate public/resume.pdf from src/data/resume.ts
```

`npm run build` runs four steps in order, and any of them can fail the build:
`astro check` → `scripts/check-blog.mjs` → `astro build` → `scripts/verify-build.mjs`.

### Docker Deployment
```bash
docker-compose up -d    # Build and start with Docker Compose
docker-compose down     # Stop containers
```

## Architecture

Personal portfolio built with Astro, output as a fully static site.

### Tech Stack
- **Framework**: Astro 7 (`output: 'static'`)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`
- **Fonts**: Astro's built-in fonts API (`fontProviders.google()`), self-hosted at build
- **Icons**: inlined SVG paths, no icon package
- Node.js 22.12 or higher required (enforced via `engines` in package.json)

### Ships zero JavaScript
The site has no interactivity. Do not add a UI framework or client-side
library to it. Animations are CSS + one small IntersectionObserver script
(`src/scripts/reveal.ts`), which Astro inlines into the HTML. If a change seems
to need React, reconsider — this constraint is the reason the site was migrated
off Next.js.

### Project Structure
- `astro.config.mjs` — site URL, sitemap, Tailwind, font config
- `src/pages/` — routes (`index.astro`)
- `src/layouts/Base.astro` — HTML shell, all `<head>` metadata, OG/Twitter tags
- `src/components/` — section components + `Icon.astro` / `icons.ts`
- `src/data/` — **all site content lives here** (`resume.ts`, `about.ts`, `social.ts`, `site.ts`)
- `src/styles/global.css` — Tailwind import, design tokens, motion
- `src/assets/` — images processed at build by `astro:assets`
- `public/` — served as-is (`resume.pdf`, `favicon.svg`, `robots.txt`)
- `scripts/generate-cv.mjs` — PDF résumé generator

### Design tokens, not raw Tailwind shades
Colors are semantic tokens declared in `@theme` in `src/styles/global.css`
(`bg-surface`, `text-strong`, `text-body`, `text-muted`, `border-subtle`,
`bg-accent`, …). Dark mode works by redefining those tokens once inside
`@media (prefers-color-scheme: dark)`. **Do not add `dark:` variants or raw
shades like `bg-gray-50` to components** — add or reuse a token instead,
otherwise dark mode silently breaks.

### Animation
Add `data-reveal="up|left|right|scale|fade"` for scroll-in, or `data-enter` for
on-load. Stagger with an inline `style="--reveal-delay: 100ms"`. Start states
are scoped to `.js` so content stays visible without scripting, and everything
is disabled under `prefers-reduced-motion`.

### Content Updates
Personal information, experience, education, and skills live in `src/data/`.
Update those files — components contain markup only.

## Blog

Posts live in git, one directory per post. The directory name is the slug and
therefore the permalink — renaming a published directory breaks its URL.

```
src/content/blog/<slug>/
  index.md      frontmatter + body
  media/        images, referenced relatively
  share/        generated share copy, not published
```

Frontmatter is validated by a zod schema in `src/content.config.ts`; an invalid
post fails the build rather than publishing broken. Routes are
`/blog`, `/blog/<slug>`, `/blog/tag/<tag>`, plus `/rss.xml` and a generated
`/og/<slug>.png` card.

### Authoring rules
- **Images**: plain relative Markdown, `![alt](media/thing.jpg)`. Astro optimizes
  them at build — responsive `srcset`, modern formats, intrinsic dimensions.
  Do not hand-roll an image pipeline or commit derivatives.
- **Callouts**: `:::note`, `:::tip`, `:::warn` only, via `remark-directive`.
- **Drafts**: `draft: true` shows in `dev` and is excluded from production
  builds, the sitemap and the feed.
- **Reading time** is computed by a remark plugin — never author it.

### Why there are two guards, not one
Astro's glob-loader **catches Markdown render errors, logs them, and lets the
build succeed**, emitting a page with full chrome and an empty body. So:
- `scripts/check-blog.mjs` validates statically *before* the build (callout
  names, unresolved `<!-- image-brief: -->` markers, missing media).
- `scripts/verify-build.mjs` asserts *after* the build that every published
  post rendered a non-empty body and got an OG card.

Do not rely on the remark plugin throwing — on its own it does not fail the
build.

### Markdown processor
Astro 7 defaults to Sätteri. This project explicitly opts into the
remark/rehype pipeline via `unified()` from `@astrojs/markdown-remark`, because
the callout and reading-time plugins are remark plugins. Changing the processor
means rewriting them.

### @fontsource/inter is a build dependency
It supplies `.woff` font data to satori for the OG cards (satori supports
ttf/otf/woff, **not** woff2), and it works without system fonts, which the
Alpine build stage lacks. The site's own webfont comes from Astro's fonts API.
Do not remove `@fontsource/inter` as unused.
