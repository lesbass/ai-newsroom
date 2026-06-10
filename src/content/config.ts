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
    sources: z.array(z.object({
      title: z.string(),
      url: z.string().url(),
      date: z.coerce.date().optional(),
      type: z.enum(['primary', 'secondary']).default('primary'),
    })).default([]),
    highRiskClaims: z.boolean().default(false),
  }),
});

export const collections = { articles };
