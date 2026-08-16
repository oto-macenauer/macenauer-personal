#!/usr/bin/env node
/**
 * Post-build assertion that every published post actually rendered.
 *
 * This exists because Astro's glob-loader catches Markdown render errors,
 * logs them, and lets the build succeed — producing a page with full chrome
 * and an empty body. A broken post would otherwise deploy silently.
 *
 * Run automatically as part of `npm run build`.
 */
import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');
const DIST = path.join(process.cwd(), 'dist');

/** Rendered body shorter than this means the Markdown did not render. */
const MIN_BODY_CHARS = 200;

const errors = [];

if (!fs.existsSync(BLOG_DIR)) {
  console.log('No blog content — nothing to verify.');
  process.exit(0);
}

const published = fs
  .readdirSync(BLOG_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .filter((slug) => {
    const index = path.join(BLOG_DIR, slug, 'index.md');
    if (!fs.existsSync(index)) return false;
    // Drafts are intentionally absent from a production build.
    return !/^draft:\s*true\s*$/m.test(fs.readFileSync(index, 'utf8'));
  });

for (const slug of published) {
  const pagePath = path.join(DIST, 'blog', slug, 'index.html');

  if (!fs.existsSync(pagePath)) {
    errors.push(`${slug}: expected dist/blog/${slug}/index.html, not found`);
    continue;
  }

  const html = fs.readFileSync(pagePath, 'utf8');

  // The layout renders the post body inside <div class="prose"> and closes
  // the article with an <hr> immediately after it.
  const start = html.indexOf('class="prose"');
  const end = html.indexOf('<hr', start);

  if (start === -1 || end === -1) {
    errors.push(`${slug}: could not locate the rendered body in the page`);
    continue;
  }

  const bodyLength = end - start;
  if (bodyLength < MIN_BODY_CHARS) {
    errors.push(
      `${slug}: rendered body is ${bodyLength} chars (expected >= ${MIN_BODY_CHARS}) — ` +
        `the Markdown almost certainly failed to render. Check the build log for a glob-loader error.`
    );
  }

  const og = path.join(DIST, 'og', `${slug}.png`);
  if (!fs.existsSync(og)) {
    errors.push(`${slug}: Open Graph card missing at dist/og/${slug}.png`);
  }
}

for (const e of errors) console.error(`  ERROR  ${e}`);

console.log(
  `\nVerified ${published.length} published post${published.length === 1 ? '' : 's'}: ${errors.length} error(s).`
);

process.exit(errors.length > 0 ? 1 : 0);
