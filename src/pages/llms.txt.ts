import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '@/config/site';
import { getProducts } from '@/lib/products';

/**
 * llms.txt — a Markdown guide for AI assistants (ChatGPT, Perplexity, Claude,
 * Google AI Overviews) describing the site and linking its key pages.
 * Spec: https://llmstxt.org
 */
export async function GET(context: APIContext) {
  const origin = (context.site ?? new URL(SITE.url)).origin;

  const guides = (await getCollection('guides', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );
  const products = await getProducts();

  const guideLines = guides
    .map((g) => `- [${g.data.title}](${origin}/guides/${g.id}): ${g.data.description}`)
    .join('\n');

  const reviewLines = products
    .map((p) => `- [${p.title} review](${origin}/reviews/${p.slug}): ${p.tagline}`)
    .join('\n');

  const body = `# ${SITE.name}

> ${SITE.description}

${SITE.name} is an independent review and buying-guide site for soldering practice kits, project kits, and beginner soldering tools. Product picks are hands-on ranked; every product links to Amazon (affiliate). Content is written for hobbyists, students, parents, and makers learning to solder.

## Buying guides

- [Best Soldering Practice Kits](${origin}/best-soldering-practice-kits): Ranked beginner-friendly practice kits with pros, cons, and a buying guide.
- [Best Soldering Project Kits](${origin}/best-soldering-project-kits): Kits that finish as a working gadget — radios, clocks, game consoles.
- [Best Soldering Irons & Stations](${origin}/best-soldering-irons): Temperature-controlled irons and stations for learning to solder.
- [All Reviews](${origin}/reviews): Every individual product review.

## Guides

${guideLines}

## Product reviews

${reviewLines}

## About

- [About](${origin}/about): Who we are and how we test and rank.
- [Affiliate Disclosure](${origin}/affiliate-disclosure): As an Amazon Associate we earn from qualifying purchases.
- [Contact](${origin}/contact)
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
