# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Type-check (astro check) then build to dist/
npm run preview    # Serve the built dist/ locally
npm run lint       # astro check — types and template diagnostics
npm run cv         # Regenerate public/resume.pdf from src/data/resume.ts
```

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
