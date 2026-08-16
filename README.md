# Oto Macenauer - Personal Portfolio Website

A modern, responsive portfolio website built with Astro, TypeScript, and Tailwind CSS, showcasing my professional experience as a Tech Lead with 14+ years in software development.

## 🚀 Live Demo

Visit: [https://macenauer.net](https://macenauer.net)

## 📋 Features

- **Zero JavaScript**: The page ships no client-side framework — ~11 kB gzipped critical path
- **Responsive Design**: Fully responsive layout that works seamlessly across all devices
- **Dark Mode**: Follows the visitor's system preference via design tokens
- **Smooth Animations**: CSS transitions driven by a tiny IntersectionObserver, disabled under `prefers-reduced-motion`
- **Optimized Images**: Processed at build time by `astro:assets` (WebP, responsive `srcset`)
- **Blog**: Markdown posts in git, with tags, drafts, RSS, and generated Open Graph cards
- **Docker Ready**: Static build served by nginx in an 82 MB image
- **SEO Friendly**: Metadata, Open Graph, canonical URLs, JSON-LD, and a generated sitemap

## 🛠️ Tech Stack

- **Framework**: Astro 7 (`output: 'static'`)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4
- **Fonts**: Astro built-in fonts API, self-hosted at build
- **Icons**: Inlined SVG paths, no icon package
- **Deployment**: Docker + nginx

## 📁 Project Structure

```
personal-website/
├── src/
│   ├── pages/            # Routes
│   │   ├── index.astro   # Home page
│   │   ├── 404.astro     # Not-found page
│   │   ├── rss.xml.ts    # Feed
│   │   ├── blog/         # Blog index, posts, tag pages
│   │   └── og/           # Generated Open Graph cards
│   ├── content/blog/     # Posts — one directory per post
│   ├── content.config.ts # Frontmatter schema (zod)
│   ├── layouts/          # Base shell + BlogPost
│   ├── components/       # Section components + Icon
│   ├── plugins/          # remark: callouts, reading time
│   ├── lib/blog.ts       # Post queries, tags, formatting
│   ├── data/             # ALL site content lives here
│   │   ├── resume.ts     # Experience, education, certifications
│   │   ├── about.ts      # Skills
│   │   ├── social.ts     # Social links
│   │   └── site.ts       # Site-wide metadata
│   ├── styles/
│   │   └── global.css    # Tailwind, design tokens, motion
│   ├── assets/           # Images optimized at build
│   └── scripts/
│       └── reveal.ts     # Scroll-reveal observer
├── public/               # Served as-is (resume.pdf, favicon, robots.txt)
├── astro.config.mjs      # Site URL, sitemap, Tailwind, fonts
├── nginx.conf            # Headers, gzip, caching, 404
├── Dockerfile            # Multi-stage build → nginx
└── docker-compose.yml    # Docker Compose setup
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22.12 or higher (required by Astro 7)
- npm
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/oto-macenauer/personal-website.git
cd personal-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:4321](http://localhost:4321) in your browser

### Building for Production

```bash
npm run build      # astro check && astro build → dist/
npm run preview    # Serve the built output locally
```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

The site is then available at [http://localhost:3000](http://localhost:3000).

### Using Docker CLI

```bash
# Build the image
docker build -t oto-macenauer-portfolio .

# Run the container (nginx listens on 8080 inside)
docker run -p 3000:8080 oto-macenauer-portfolio
```

For detailed Docker deployment instructions, see [README.Docker.md](./README.Docker.md)

## 📝 Customization

### Updating Content

All content lives in `src/data/` — components contain markup only.

- **Experience**: `src/data/resume.ts` → `experience`
- **Education**: `src/data/resume.ts` → `education`
- **Certifications**: `src/data/resume.ts` → `certifications`
- **Skills**: `src/data/about.ts`
- **Social Links**: `src/data/social.ts`
- **Site metadata**: `src/data/site.ts`

### Styling

Colors are semantic **design tokens** declared in `@theme` in
`src/styles/global.css` (`bg-surface`, `text-strong`, `text-body`,
`bg-accent`, …). Dark mode redefines those tokens once inside
`@media (prefers-color-scheme: dark)`.

Do not add `dark:` variants or raw shades like `bg-gray-50` to components —
add or reuse a token instead, or dark mode will silently break.

### Animations

Add `data-reveal="up|left|right|scale|fade"` for scroll-in, or `data-enter`
for on-load entrance. Stagger with `style="--reveal-delay: 100ms"`.

## ✍️ Writing a post

```
src/content/blog/<slug>/
  index.md      frontmatter + body
  media/        images, referenced relatively
```

The directory name is the slug and therefore the permalink — renaming a
published directory breaks its URL.

```yaml
---
title: 'A title between 10 and 90 characters'
date: 2026-08-16
summary: One or two sentences. Becomes the meta description, card blurb and RSS description.
tags: [dotnet, performance]
cover: media/hero.jpg
coverAlt: What the cover image shows
draft: true
---
```

- **Images** are plain relative Markdown — `![alt](media/thing.jpg)`. Astro
  optimizes them at build time; nothing is committed pre-processed.
- **Callouts** are `:::note`, `:::tip` and `:::warn`.
- **Drafts** (`draft: true`) appear in `npm run dev` and are excluded from
  production builds, the sitemap and the feed — safe to commit.
- **Reading time** is computed automatically.
- Everything else — tag pages, RSS entry, sitemap entry, and the 1200×630
  Open Graph card — is generated.

Run `npm run blog:check` while writing. It is also part of `npm run build`,
along with a post-build check that every published post actually rendered.

## 🔧 Configuration Files

- `astro.config.mjs` - Astro configuration (site URL, sitemap, Tailwind, fonts)
- `tsconfig.json` - TypeScript configuration
- `nginx.conf` - Security headers, gzip, cache policy, 404 handling
- `Dockerfile` - Multi-stage Docker build
- `docker-compose.yml` - Docker Compose configuration

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎨 Color Scheme

- Primary: Blue (#2563eb light / #60a5fa dark)
- Secondary: Purple (#9333ea light / #c084fc dark)
- Background: White/Gray gradients, inverted in dark mode
- Text: Gray shades (#111827 to #6b7280), inverted in dark mode

## 🤝 Connect

- **LinkedIn**: [oto-macenauer-574a844b](https://linkedin.com/in/oto-macenauer-574a844b)
- **GitHub**: [oto-macenauer](https://github.com/oto-macenauer)
- **Bluesky**: [@otomacenauer.bsky.social](https://bsky.app/profile/otomacenauer.bsky.social)
- **Website**: [macenauer.net](https://macenauer.net)

## 📄 License

This project is private and proprietary. All rights reserved.

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Outline icons from [Lucide](https://lucide.dev/); brand marks from [Simple Icons](https://simpleicons.org/) and [Bootstrap Icons](https://icons.getbootstrap.com/)

---

**© 2026 Oto Macenauer. All rights reserved.**
