import { z, defineCollection } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('AI Newsroom'),
    tags: z.array(z.string()).default([]),
    canonicalURL: z.string().optional(),
  }),
});

export const collections = { articles };
