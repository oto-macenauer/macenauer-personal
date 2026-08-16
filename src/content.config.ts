import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * One post per directory:
 *
 *   src/content/blog/<slug>/
 *     index.md      frontmatter + body
 *     media/        images, referenced relatively and optimized at build
 *     share/        generated share copy, not published
 *
 * The directory name is the slug and therefore the URL — renaming a published
 * directory breaks its permalink.
 */
const blog = defineCollection({
  loader: glob({
    pattern: '**/index.md',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      // Long titles wrap badly in the generated OG card and get truncated in
      // search results, so the limit is enforced rather than advisory.
      title: z.string().min(10).max(90),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),

      // Reused as the meta description, the card blurb, the RSS description
      // and the starting point for the LinkedIn hook.
      summary: z.string().min(50).max(200),

      tags: z
        .array(
          z
            .string()
            .regex(
              /^[a-z0-9-]+$/,
              'tags must be lowercase kebab-case — they become URLs'
            )
        )
        .min(1)
        .max(6),

      cover: image(),
      coverAlt: z.string().min(3),

      credit: z
        .object({
          name: z.string(),
          url: z.string().optional(),
          source: z.string(),
          license: z.string(),
        })
        .optional(),

      draft: z.boolean().default(false),

      canonical: z
        .string()
        .refine((v) => v.startsWith('http'), 'canonical must be absolute')
        .optional(),

      /** Overrides the generated OG card. Absolute or site-root-relative. */
      ogImage: z.string().optional(),
    }),
});

export const collections = { blog };
