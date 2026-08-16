import { getCollection, render, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export interface PostSummary {
  post: Post;
  readingTime: number;
}

/**
 * Drafts are visible in `astro dev` and excluded from production builds, so
 * work-in-progress can be committed safely. Because the filter runs at build
 * time, a draft never reaches dist/, the sitemap or the feed.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true
  );

  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Reading time comes from the remark plugin rather than being recomputed here,
 * so the number on a card always matches the number on the post itself.
 */
export async function getPostSummaries(): Promise<PostSummary[]> {
  const posts = await getPublishedPosts();

  return Promise.all(
    posts.map(async (post) => {
      const { remarkPluginFrontmatter } = await render(post);
      return {
        post,
        readingTime: Number(remarkPluginFrontmatter.readingTime ?? 1),
      };
    })
  );
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const posts = await getPublishedPosts();
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function postPath(post: Post): string {
  return `/blog/${post.id}/`;
}

export function tagPath(tag: string): string {
  return `/blog/tag/${tag}/`;
}

export function ogImagePath(post: Post): string {
  return post.data.ogImage ?? `/og/${post.id}.png`;
}

const DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(date: Date): string {
  return DATE_FORMAT.format(date);
}

/** Machine-readable date for <time datetime> and structured data. */
export function isoDate(date: Date): string {
  return date.toISOString();
}
