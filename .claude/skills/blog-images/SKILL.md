---
name: blog-images
description: >
  Source, license and prepare images for a macenauer.net blog post. Resolves
  the <!-- image-brief: ... --> markers blog-draft leaves behind by searching
  Unsplash and Pexels, or by taking a file the user provides. Use when the user
  says "add images", "find a picture for this post", "resolve the image
  briefs", or when blog:check reports an unresolved image-brief.
---

# blog-images

Resolves every image brief in a post, with correct attribution and no EXIF.

## Rules

**Only Unsplash and Pexels, or a file the user gives you.** Never download an
image found on a web page, in search results, or from a company's site. Those
have no machine-readable licence and no attribution, and publishing them under
the user's name is a real legal risk. If neither provider has anything
suitable, say so and offer to ship the post without that image — no image is
better than an unlicensed one.

**Never edit files in `media/` by hand or with any other tool.** Always go
through `scripts/blog-image.mjs`, which strips EXIF (location data included),
caps the source width and normalises the encoding.

**Do not resize for display.** `astro:assets` generates responsive variants at
build time from the single source file. Committing pre-sized derivatives is
exactly what this setup avoids.

## Procedure

1. Find the briefs:
   ```bash
   grep -rn "image-brief" src/content/blog/<slug>/index.md
   ```

2. For each brief, search both providers. Derive a short visual query from the
   brief — search for the *subject*, not the abstract concept. "flame graph"
   not "performance optimization methodology".
   ```bash
   node scripts/blog-image.mjs search --query "flame graph" --count 5
   ```

3. Present 3–5 candidates to the user with description, author, licence and
   preview URL. Let them choose. Do not pick silently — the cover image is the
   first thing a LinkedIn reader sees.

4. Fetch the chosen one. Use `--name hero` for the cover, a descriptive name
   for in-body images:
   ```bash
   node scripts/blog-image.mjs fetch --provider unsplash --id AbC123 --slug my-post --name hero
   ```

5. If the user supplies their own screenshot or diagram instead:
   ```bash
   node scripts/blog-image.mjs add --file /path/to/shot.png --slug my-post --name diagram
   ```
   Their own work needs no credit block.

6. Update `index.md`:
   - Replace the `<!-- image-brief: ... -->` line with the Markdown image, or
     for the cover set `cover: media/hero.jpg` in frontmatter.
   - Write real alt text describing **what the image shows**, not what it
     means. Never leave alt empty, never repeat the caption.
   - Paste the `credit:` block the script prints into the frontmatter. Both
     licences require attribution; the layout renders it under the cover.
   - Delete `media/cover-placeholder.jpg` once a real cover exists.

7. Verify:
   ```bash
   npm run blog:check && npm run build
   ```
   `blog:check` reports unreferenced files left in `media/` and refuses to
   publish a post still pointing at the placeholder cover.

## Setup

Keys go in `.env.local` (gitignored — never commit them, never paste them into
a message):

```
UNSPLASH_ACCESS_KEY=...
PEXELS_API_KEY=...
```

Register at https://unsplash.com/oauth/applications and
https://www.pexels.com/api/. Both are free. If a key is missing the script says
which one and where to get it.

## Judgement

The best technical post often needs exactly one image — the cover. Resist
filling sections with stock photography. If a brief cannot be satisfied by
anything better than a generic laptop-and-coffee shot, tell the user the brief
is not worth resolving and suggest cutting it.
