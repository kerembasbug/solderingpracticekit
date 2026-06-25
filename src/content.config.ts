import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    /** Optional SEO <title>. Falls back to `title`; set it when you want the
     *  SERP title to differ from the on-page H1 (avoids duplicate H1/title). */
    seoTitle: z.string().optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string().default('Guide'),
    /** Optional ordered list of product slugs to surface in the article. */
    relatedProducts: z.array(z.string()).default([]),
    /** Optional FAQ block — also emitted as FAQPage structured data. */
    faqs: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .default([]),
    heroImage: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { guides };
