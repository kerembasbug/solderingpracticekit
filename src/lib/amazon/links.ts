import { AMAZON } from '@/config/site';

/**
 * Build an Amazon affiliate link for a product detail page.
 * Format follows Amazon's recommended /dp/<ASIN>?tag=<partner-tag> pattern.
 */
export function affiliateUrl(asin: string, opts: { tag?: string } = {}): string {
  const tag = opts.tag ?? AMAZON.partnerTag;
  const params = new URLSearchParams({
    tag,
    linkCode: 'll1',
    language: 'en_US',
    ref_: 'as_li_ss_tl',
  });
  return `https://www.${AMAZON.storefront}/dp/${encodeURIComponent(asin)}/?${params.toString()}`;
}

/** Affiliate search link, e.g. for "see more options". */
export function affiliateSearchUrl(keywords: string, opts: { tag?: string } = {}): string {
  const tag = opts.tag ?? AMAZON.partnerTag;
  const params = new URLSearchParams({ k: keywords, tag });
  return `https://www.${AMAZON.storefront}/s/?${params.toString()}`;
}
