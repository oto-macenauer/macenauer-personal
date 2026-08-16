import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, postPath } from '@/lib/blog';
import { site } from '@/data/site';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: `${site.name} — Blog`,
    description:
      'Writing on software engineering, cloud-native architecture, and leading technical teams.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
      link: postPath(post),
      categories: [...post.data.tags],
    })),
    customData: '<language>en-us</language>',
  });
}
