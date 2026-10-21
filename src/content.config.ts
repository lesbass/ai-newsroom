import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { slugifyTag } from './lib/slugify';

const notFuture = (message: string) =>
  z.coerce.date().refine((date) => date <= new Date(), { message });

// Editorial claim-risk classification belongs in `highRiskClaims`, never in the
// reader-facing topic taxonomy (AIN-1005). Reserved markers previously leaked in
// as `high-risk-claim` / `high-risk-claims` tags and produced duplicate tag pages.
const RESERVED_TAGS = new Set(['high-risk-claim', 'high-risk-claims']);

const topicTags = z
  .array(z.string())
  .default([])
  .refine(
    (tags) => tags.every((tag) => !RESERVED_TAGS.has(slugifyTag(tag))),
    { message: 'high-risk-claim / high-risk-claims are internal editorial markers; use highRiskClaims: true instead of tags' },
  );

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: notFuture('pubDate must not be in the future — articles cannot be published with a future date'),
    updatedDate: notFuture('updatedDate must not be in the future — it feeds sitemap lastmod, dateModified and the displayed date').optional(),
    author: z.string().default('AI Newsroom'),
    tags: topicTags,
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
