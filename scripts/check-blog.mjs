#!/usr/bin/env node
/**
 * Authoring guard for blog posts.
 *
 * Frontmatter shape is already enforced by the zod schema in
 * src/content.config.ts at build time, so this covers what the schema cannot:
 * markers the AI authoring skills leave behind, callout typos, and media that
 * has drifted out of sync with the post.
 *
 * Severity depends on `draft`. A draft is never included in a production
 * build, so its unfinished markers are warnings — otherwise a
 * work-in-progress post would block every build. For a published post the
 * same findings are errors.
 *
 * Run: npm run blog:check   (also runs as part of npm run build)
 */
import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');
const ALLOWED_CALLOUTS = ['note', 'tip', 'warn'];

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

let draftCount = 0;

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
  const isDraft = /^draft:\s*true\s*$/m.test(raw);
  if (isDraft) draftCount++;

  /** Unfinished work only blocks the build once the post is published. */
  const report = (message) =>
    (isDraft ? warnings : errors).push(
      `${rel}: ${message}${isDraft ? ' (draft)' : ''}`
    );

  // Slugs become URLs. Always an error — renaming later breaks the permalink.
  if (!/^[a-z0-9-]+$/.test(slug)) {
    errors.push(`${rel}: slug must be lowercase kebab-case — it is the URL`);
  }

  // Callout names are validated here, statically, and NOT left to the remark
  // plugin alone: Astro's glob-loader catches render errors and logs them
  // without failing the build, which would publish a post with an empty body.
  const withoutFences = body.replace(/```[\s\S]*?```/g, '');
  for (const m of withoutFences.matchAll(/^:::([a-zA-Z][\w-]*)/gm)) {
    if (!ALLOWED_CALLOUTS.includes(m[1])) {
      report(
        `unknown callout ":::${m[1]}" — supported: ${ALLOWED_CALLOUTS.map((a) => `:::${a}`).join(', ')}`
      );
    }
  }

  // The blog-images skill must resolve every brief blog-draft left behind.
  for (const m of body.matchAll(/<!--\s*image-brief:([^>]*?)-->/g)) {
    report(
      `unresolved image-brief —${m[1].trimEnd()}. Run the blog-images skill.`
    );
  }

  // Scans the whole file, not just the body: the new-post stub leaves TODO in
  // frontmatter (tags, coverAlt) and those must not reach production either.
  for (const marker of ['TODO', 'FIXME', 'TKTK', 'XXX']) {
    if (raw.includes(marker)) report(`contains "${marker}"`);
  }

  // Every relative image reference must exist on disk. A broken path fails
  // the Astro build too, but this names all of them at once.
  const referenced = new Set();
  for (const m of body.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
    const src = m[1].trim();
    if (/^(https?:)?\/\//.test(src)) continue;
    referenced.add(src.replace(/^\.\//, ''));
    if (!fs.existsSync(path.join(postDir, src))) {
      report(`image not found — ${src}`);
    }
  }

  // Cover lives in frontmatter, not the body.
  const cover = raw.match(/^cover:\s*(.+)$/m)?.[1]?.trim();
  if (cover) {
    referenced.add(cover.replace(/^\.\//, ''));
    if (/placeholder/i.test(cover)) {
      report('cover is still the generated placeholder');
    }
  }

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

const published = slugs.length - draftCount;
console.log(
  `\nChecked ${slugs.length} post${slugs.length === 1 ? '' : 's'} ` +
    `(${published} published, ${draftCount} draft): ` +
    `${errors.length} error(s), ${warnings.length} warning(s).`
);

process.exit(errors.length > 0 ? 1 : 0);
