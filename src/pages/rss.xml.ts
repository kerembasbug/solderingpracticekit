import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@/config/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const guides = (await getCollection('guides', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );

  return rss({
    title: `${SITE.name} — Guides`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: guides.map((guide) => ({
      title: guide.data.title,
      description: guide.data.description,
      pubDate: guide.data.pubDate,
      link: `/guides/${guide.id}`,
      categories: [guide.data.category],
    })),
    customData: `<language>${SITE.locale.replace('_', '-')}</language>`,
  });
}
