#!/usr/bin/env node
/**
 * Deterministic image helper for the blog-images skill.
 *
 * The skill decides *which* image; this script does the mechanical work, so
 * searching, licensing and EXIF handling are not left to prose instructions.
 *
 *   node scripts/blog-image.mjs search --query "flame graph" --count 5
 *   node scripts/blog-image.mjs fetch  --provider unsplash --id AbC123 --slug my-post --name hero
 *   node scripts/blog-image.mjs add    --file ~/shot.png --slug my-post --name diagram
 *
 * Keys live in .env.local (gitignored):
 *   UNSPLASH_ACCESS_KEY=...
 *   PEXELS_API_KEY=...
 *
 * Only these two providers are supported on purpose. Arbitrary images found on
 * the web have no machine-readable licence or attribution and must not be used.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

try {
  process.loadEnvFile('.env.local');
} catch {
  // Absent .env.local is fine for `add`, which needs no API key.
}

const MAX_WIDTH = 2000;

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 2) {
    if (!argv[i].startsWith('--')) continue;
    out[argv[i].slice(2)] = argv[i + 1];
  }
  return out;
}

function die(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function requireKey(provider) {
  const env =
    provider === 'unsplash' ? 'UNSPLASH_ACCESS_KEY' : 'PEXELS_API_KEY';
  const key = process.env[env];
  if (!key) {
    die(
      `${env} is not set. Add it to .env.local (gitignored). ` +
        `Unsplash: https://unsplash.com/oauth/applications — Pexels: https://www.pexels.com/api/`
    );
  }
  return key;
}

async function searchUnsplash(query, count, orientation) {
  const key = requireKey('unsplash');
  const url = new URL('https://api.unsplash.com/search/photos');
  url.searchParams.set('query', query);
  url.searchParams.set('per_page', String(count));
  url.searchParams.set('orientation', orientation);

  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${key}` },
  });
  if (!res.ok) die(`Unsplash search failed: ${res.status} ${await res.text()}`);

  const data = await res.json();
  return data.results.map((p) => ({
    provider: 'unsplash',
    id: p.id,
    description: p.description || p.alt_description || '(no description)',
    author: p.user.name,
    authorUrl: p.user.links?.html,
    license: 'Unsplash License',
    preview: p.urls.small,
    dimensions: `${p.width}x${p.height}`,
  }));
}

async function searchPexels(query, count, orientation) {
  const key = requireKey('pexels');
  const url = new URL('https://api.pexels.com/v1/search');
  url.searchParams.set('query', query);
  url.searchParams.set('per_page', String(count));
  url.searchParams.set('orientation', orientation);

  const res = await fetch(url, { headers: { Authorization: key } });
  if (!res.ok) die(`Pexels search failed: ${res.status} ${await res.text()}`);

  const data = await res.json();
  return data.photos.map((p) => ({
    provider: 'pexels',
    id: String(p.id),
    description: p.alt || '(no description)',
    author: p.photographer,
    authorUrl: p.photographer_url,
    license: 'Pexels License',
    preview: p.src.medium,
    dimensions: `${p.width}x${p.height}`,
  }));
}

async function resolveUnsplash(id) {
  const key = requireKey('unsplash');
  const res = await fetch(`https://api.unsplash.com/photos/${id}`, {
    headers: { Authorization: `Client-ID ${key}` },
  });
  if (!res.ok) die(`Unsplash lookup failed: ${res.status}`);
  const p = await res.json();

  // Unsplash API guidelines require pinging the download endpoint whenever an
  // image is actually used, so the photographer gets credited a download.
  if (p.links?.download_location) {
    await fetch(p.links.download_location, {
      headers: { Authorization: `Client-ID ${key}` },
    }).catch(() => {});
  }

  return {
    downloadUrl: p.urls.raw,
    name: p.user.name,
    url: p.user.links?.html,
    source: 'Unsplash',
    license: 'Unsplash License',
    description: p.description || p.alt_description || '',
  };
}

async function resolvePexels(id) {
  const key = requireKey('pexels');
  const res = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
    headers: { Authorization: key },
  });
  if (!res.ok) die(`Pexels lookup failed: ${res.status}`);
  const p = await res.json();

  return {
    downloadUrl: p.src.original,
    name: p.photographer,
    url: p.photographer_url,
    source: 'Pexels',
    license: 'Pexels License',
    description: p.alt || '',
  };
}

function mediaDir(slug) {
  const dir = path.join(process.cwd(), 'src', 'content', 'blog', slug, 'media');
  if (!fs.existsSync(path.dirname(dir))) {
    die(`No such post: src/content/blog/${slug}. Run npm run new-post first.`);
  }
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Normalises an image for the repo: applies EXIF rotation then discards all
 * metadata (sharp drops it unless withMetadata() is called), caps the width so
 * source files stay reasonable, and re-encodes as progressive JPEG.
 *
 * Resizing for display is NOT done here — astro:assets generates the
 * responsive variants at build time from this single source file.
 */
async function normalise(buffer, destination) {
  const image = sharp(buffer).rotate();
  const meta = await image.metadata();

  const pipeline =
    meta.width && meta.width > MAX_WIDTH
      ? image.resize({ width: MAX_WIDTH })
      : image;

  const info = await pipeline
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(destination);

  return { ...info, originalWidth: meta.width, hadExif: Boolean(meta.exif) };
}

const [command, ...rest] = process.argv.slice(2);
const args = parseArgs(rest);

if (command === 'search') {
  const query = args.query || die('--query is required');
  const count = Number(args.count ?? 5);
  const orientation = args.orientation ?? 'landscape';
  const providers = args.provider ? [args.provider] : ['unsplash', 'pexels'];

  const results = [];
  for (const provider of providers) {
    const search = provider === 'unsplash' ? searchUnsplash : searchPexels;
    results.push(...(await search(query, count, orientation)));
  }

  console.log(JSON.stringify(results, null, 2));
} else if (command === 'fetch') {
  const provider = args.provider || die('--provider unsplash|pexels');
  const id = args.id || die('--id is required');
  const slug = args.slug || die('--slug is required');
  const name = (args.name || 'hero').replace(/[^a-z0-9-]/gi, '');

  const meta =
    provider === 'unsplash' ? await resolveUnsplash(id) : await resolvePexels(id);

  const res = await fetch(meta.downloadUrl);
  if (!res.ok) die(`Download failed: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());

  const destination = path.join(mediaDir(slug), `${name}.jpg`);
  const info = await normalise(buffer, destination);

  console.log(`Saved media/${name}.jpg (${info.width}x${info.height}, ${Math.round(info.size / 1024)} kB)`);
  console.log(`EXIF stripped: ${info.hadExif ? 'yes' : 'none present'}`);
  console.log(`Source description: ${meta.description || '(none)'}`);
  console.log('\nAdd to frontmatter:\n');
  console.log('credit:');
  console.log(`  name: ${meta.name}`);
  if (meta.url) console.log(`  url: ${meta.url}`);
  console.log(`  source: ${meta.source}`);
  console.log(`  license: ${meta.license}`);
} else if (command === 'add') {
  const file = args.file || die('--file is required');
  const slug = args.slug || die('--slug is required');
  const name = (args.name || 'image').replace(/[^a-z0-9-]/gi, '');

  if (!fs.existsSync(file)) die(`No such file: ${file}`);

  const destination = path.join(mediaDir(slug), `${name}.jpg`);
  const info = await normalise(fs.readFileSync(file), destination);

  console.log(`Saved media/${name}.jpg (${info.width}x${info.height}, ${Math.round(info.size / 1024)} kB)`);
  console.log(`EXIF stripped: ${info.hadExif ? 'yes' : 'none present'}`);
  if (info.originalWidth > MAX_WIDTH) {
    console.log(`Capped from ${info.originalWidth}px to ${MAX_WIDTH}px.`);
  }
  console.log('\nNo credit block needed for your own image.');
} else {
  console.error(`Usage:
  node scripts/blog-image.mjs search --query "..." [--provider unsplash|pexels] [--count 5] [--orientation landscape|portrait|squarish]
  node scripts/blog-image.mjs fetch  --provider unsplash|pexels --id <id> --slug <slug> [--name hero]
  node scripts/blog-image.mjs add    --file <path> --slug <slug> [--name image]`);
  process.exit(1);
}
