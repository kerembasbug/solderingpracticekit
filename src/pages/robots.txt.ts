import type { APIContext } from 'astro';
import { SITE } from '@/config/site';

export function GET(context: APIContext) {
  const site = (context.site ?? new URL(SITE.url)).origin;
  const body = `# ${SITE.name}
User-agent: *
Allow: /

# Affiliate redirect / outbound links need not be crawled
Disallow: /go/

Sitemap: ${site}/sitemap-index.xml
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
