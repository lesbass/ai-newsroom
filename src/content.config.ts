import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const notFuture = (message: string) =>
  z.coerce.date().refine((date) => date <= new Date(), { message });

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: notFuture('pubDate must not be in the future — articles cannot be published with a future date'),
    updatedDate: notFuture('updatedDate must not be in the future — it feeds sitemap lastmod, dateModified and the displayed date').optional(),
    author: z.string().default('AI Newsroom'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCredit: z.string().optional(),
    canonicalURL: z.string().optional(),
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
