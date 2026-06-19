import { SITE } from '@/config/site';
import { affiliateUrl } from '@/lib/amazon/links';
import type { Product } from '@/lib/types';

/** Resolve a path to an absolute canonical URL. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, SITE.url).href;
}

/** Convert our 0–10 editorial score to a 0–5 schema rating. */
function score5(score: number): number {
  return Math.round((score / 2) * 10) / 10;
}

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl('/logo.png'),
    description: SITE.description,
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    publisher: { '@id': `${SITE.url}/#organization` },
    inLanguage: SITE.language,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/** Product schema with our editorial review (and live Offer when available). */
export function productSchema(product: Product) {
  const schema: Record<string, unknown> = {
    '@type': 'Product',
    name: product.fullTitle,
    image: product.image,
    description: product.excerpt,
    brand: { '@type': 'Brand', name: product.brand },
    sku: product.asin,
    mpn: product.asin,
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: score5(product.ourScore),
        bestRating: 5,
        worstRating: 1,
      },
      author: { '@type': 'Organization', name: SITE.name },
    },
  };

  if (product.live?.priceAmount && product.live.currency) {
    schema.offers = {
      '@type': 'Offer',
      price: product.live.priceAmount.toFixed(2),
      priceCurrency: product.live.currency,
      availability: 'https://schema.org/InStock',
      url: affiliateUrl(product.asin),
      priceValidUntil: validUntil(),
    };
  }
  return schema;
}

/** ItemList schema for a ranked roundup. */
export function itemListSchema(products: Product[], path: string) {
  return {
    '@type': 'ItemList',
    url: absoluteUrl(path),
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      url: absoluteUrl(`/reviews/${p.slug}`),
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    image: opts.image ? absoluteUrl(opts.image) : absoluteUrl(SITE.ogImage),
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(opts.url) },
    author: { '@type': 'Organization', name: SITE.name },
    publisher: { '@id': `${SITE.url}/#organization` },
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  };
}

function validUntil(): string {
  const d = new Date();
  d.setDate(d.getDate() + 3); // prices are refreshed on each (daily) rebuild
  return d.toISOString().slice(0, 10);
}

/** Wrap one or more schema objects into a single @graph document. */
export function jsonLdGraph(...nodes: Record<string, unknown>[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}
