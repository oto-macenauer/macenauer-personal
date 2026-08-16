---
name: blog-draft
description: >
  Turn rough bullets, notes or a raw idea into a complete blog post for
  macenauer.net — frontmatter, structure, grammar and image briefs. Use when
  the user wants to write, draft, flesh out or restructure a post, or says
  "new post", "write this up", "turn these notes into an article". Handles the
  writing only; blog-images resolves the visuals and blog-share writes the
  LinkedIn copy.
---

# blog-draft

Turns an idea into a finished draft. The user supplies the thinking; you supply
structure, prose and correctness. You never supply facts they did not give you.

## Before writing

1. Read `STYLE.md` in this skill directory. It is not optional — it defines the
   voice and the banned phrasing.
2. Scaffold the post if it does not exist yet:
   ```bash
   npm run new-post -- "Working title"
   ```
   This creates `src/content/blog/<slug>/` with a draft stub, a `media/`
   directory and a placeholder cover. Never hand-build these paths.
3. Read one or two existing posts in `src/content/blog/` if any exist, and
   match their register.

## Hard rules

**Never invent specifics.** No numbers, benchmarks, dates, company names,
outcomes or quotes that the user did not provide. If the post needs a figure to
land ("40% faster"), ask for it. An invented metric in a post published under
the user's name is the worst possible failure of this skill — worse than a
vague sentence.

**Never claim the user did something they did not say they did.** Prefer "this
approach" over "when I rebuilt our billing service" unless they said so.

**Keep `draft: true`** until the user explicitly says to publish.

## Structure

- **Hook** — 2–3 sentences. The concrete thing that happened, or the problem
  worth caring about. No "In today's fast-paced world". No throat-clearing.
  No restating the title.
- **3–5 `##` sections.** Each earns its place; if a section is two sentences,
  merge it. Use `###` sparingly.
- **Takeaway** — one concrete thing the reader can act on. Not a summary of
  what they just read.

Target **700–1100 words**, hard ceiling 1400. Shorter is better than padded.
The user has explicitly said they do not want long posts.

## Frontmatter

Fill every field. The zod schema in `src/content.config.ts` enforces these and
the build fails if they are wrong:

- `title` — 10–90 characters. Specific over clever.
- `summary` — 50–200 characters, one or two sentences. This becomes the meta
  description, the card blurb, the RSS description and the seed of the LinkedIn
  hook. Write it to stand alone.
- `tags` — 1–6, lowercase kebab-case. Reuse existing tags where they fit; check
  `src/content/blog/*/index.md` before inventing a new one.
- `coverAlt` — describe what the image shows, not what it means.
- Leave `cover` pointing at the placeholder. blog-images replaces it.

## Images

Do not pick or download images. Where a visual genuinely helps, leave a brief:

```markdown
<!-- image-brief: flame graph or profiler screenshot, dark background, technical -->
```

Be specific about subject and mood. One brief per genuinely useful visual —
usually the cover plus zero to two in-body images. Decorative stock photos of
people pointing at laptops are worse than no image.

`npm run blog:check` reports unresolved briefs: a warning while the post is a
draft, an error once it is published.

## Formatting

- Callouts are `:::note`, `:::tip`, `:::warn` — those three names only. Any
  other name fails `blog:check`.
- Code blocks always get a language tag.
- Prefer prose to bullet lists. A wall of bullets reads as notes, not writing.

## Finishing

Run `npm run blog:check` and fix what it reports. Then tell the user the word
count, the slug, the URL it will have, and anything you need from them —
especially any figure you deliberately left out rather than inventing.
