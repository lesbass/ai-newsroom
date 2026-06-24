import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date().refine((date) => {
      return date <= new Date();
    }, { message: 'pubDate must not be in the future — articles cannot be published with a future date' }),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('AI Newsroom'),
    tags: z.array(z.string()).default([]),
    canonicalURL: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCredit: z.string().optional(),
    sources: z.array(z.object({
      title: z.string(),
      url: z.string(),
      date: z.coerce.date().optional(),
      type: z.enum(['primary', 'secondary']).default('primary'),
    })).default([]),
    highRiskClaims: z.boolean().default(false),
  }),
});

export const collections = { articles };
