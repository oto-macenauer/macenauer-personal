#!/usr/bin/env node
/**
 * Authoring guard for blog posts.
 *
 * Frontmatter shape is already enforced by the zod schema in
 * src/content.config.ts at build time, so this covers what the schema cannot:
 * markers the AI authoring skills leave behind, and media that has drifted
 * out of sync with the post.
 *
 * Run: npm run blog:check
 */
import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

const errors = [];
const warnings = [];

if (!fs.existsSync(BLOG_DIR)) {
  console.log('No blog directory yet — nothing to check.');
  process.exit(0);
}

const slugs = fs
  .readdirSync(BLOG_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

for (const slug of slugs) {
  const postDir = path.join(BLOG_DIR, slug);
  const indexPath = path.join(postDir, 'index.md');
  const rel = `src/content/blog/${slug}`;

  if (!fs.existsSync(indexPath)) {
    errors.push(`${rel}: directory has no index.md`);
    continue;
  }

  const raw = fs.readFileSync(indexPath, 'utf8');
  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---/, '');

  // Slugs become URLs.
  if (!/^[a-z0-9-]+$/.test(slug)) {
    errors.push(`${rel}: slug must be lowercase kebab-case — it is the URL`);
  }

  // Directive names are validated here, statically, and NOT left to the
  // remark plugin alone: Astro's glob-loader catches render errors and logs
  // them without failing the build, which would publish a post with an empty
  // body. Catching the typo before the build is the only reliable gate.
  const withoutFences = body.replace(/```[\s\S]*?```/g, '');
  const ALLOWED = ['note', 'tip', 'warn'];
  for (const m of withoutFences.matchAll(/^:::([a-zA-Z][\w-]*)/gm)) {
    if (!ALLOWED.includes(m[1])) {
      errors.push(
        `${rel}: unknown callout ":::${m[1]}" — supported: ${ALLOWED.map((a) => `:::${a}`).join(', ')}`
      );
    }
  }

  // The image skill must resolve every brief it was handed.
  for (const m of body.matchAll(/<!--\s*image-brief:([^>]*?)-->/g)) {
    errors.push(
      `${rel}: unresolved image-brief —${m[1].trimEnd()}. Run the blog-images skill.`
    );
  }

  for (const marker of ['TODO', 'FIXME', 'TKTK', 'XXX']) {
    if (body.includes(marker)) {
      warnings.push(`${rel}: contains "${marker}"`);
    }
  }

  // Every relative image reference must exist on disk. A broken path fails
  // the Astro build too, but this names all of them at once.
  const referenced = new Set();
  for (const m of body.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
    const src = m[1].trim();
    if (/^(https?:)?\/\//.test(src)) continue;
    referenced.add(src.replace(/^\.\//, ''));
    if (!fs.existsSync(path.join(postDir, src))) {
      errors.push(`${rel}: image not found — ${src}`);
    }
  }

  // Cover is in frontmatter, not the body.
  const cover = raw.match(/^cover:\s*(.+)$/m)?.[1]?.trim();
  if (cover) referenced.add(cover.replace(/^\.\//, ''));

  const mediaDir = path.join(postDir, 'media');
  if (fs.existsSync(mediaDir)) {
    for (const file of fs.readdirSync(mediaDir)) {
      if (!referenced.has(`media/${file}`)) {
        warnings.push(`${rel}: media/${file} is not referenced by the post`);
      }
    }
  }
}

for (const w of warnings) console.warn(`  warn   ${w}`);
for (const e of errors) console.error(`  ERROR  ${e}`);

console.log(
  `\nChecked ${slugs.length} post${slugs.length === 1 ? '' : 's'}: ` +
    `${errors.length} error(s), ${warnings.length} warning(s).`
);

process.exit(errors.length > 0 ? 1 : 0);
