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
- [Best Soldering Accessories](${origin}/best-soldering-accessories): Desoldering pumps, wick and flux, helping hands, and fume extractors.
- [Best Soldering Kits for Kids & Teens](${origin}/best-soldering-kits-for-kids): Safe, fun STEM builds ranked for younger makers.
- [Best Complete Soldering Kits for Beginners](${origin}/best-complete-soldering-kits): Kits that bundle the iron, solder and basic tools in one box.
- [All Reviews](${origin}/reviews): Every individual product review.

## Comparisons (X vs Y)

- [Practice Kit vs Project Kit](${origin}/practice-kit-vs-project-kit): Which type of soldering kit a beginner should start with.
- [Soldering Station vs Cordless Iron](${origin}/soldering-station-vs-cordless-iron): Bench station versus battery-powered iron.
- [YIHUA 926 III vs FNIRSI HS-02A](${origin}/yihua-926-iii-vs-fnirsi-hs-02a): Full soldering station versus a smart pencil iron.
- [FNIRSI HS-02A vs HS-03](${origin}/fnirsi-hs-02a-vs-fnirsi-hs-03): Corded 100W smart iron versus cordless battery iron.
- [FNIRSI HS-03 vs Fanttik T1 Max](${origin}/fnirsi-hs-03-vs-fanttik-t1-max): Two top cordless soldering irons head to head.
- [Solder Sucker vs Solder Wick](${origin}/solder-sucker-vs-solder-wick): Which desoldering tool to use, and why most benches need both.
- [Jitterbug vs Robot Car Kit](${origin}/jitterbug-vs-robot-car-kit): The best first soldering kit for kids, by age and joint count.
- [YIHUA 926 III vs Weller WE1010NA](${origin}/yihua-926-iii-vs-weller-we1010na): Budget station bundle versus the premium, professional-grade Weller brand.

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
