import { PRODUCTS } from '@/data/products';
import { PAAPI_ENABLED } from '@/config/site';
import { getItems } from '@/lib/amazon/paapi';
import type { Product, ProductCategory } from '@/lib/types';

/**
 * Single source of truth for product data across the build.
 *
 * - Editorial content always comes from the curated dataset.
 * - When PA-API credentials are present, live price/image/availability are
 *   layered on top (fetched once, memoised for the whole build).
 * - If PA-API is disabled or errors, the site falls back gracefully to curated
 *   data and shows "Check price on Amazon" instead of a stale price.
 */

let cache: Promise<Product[]> | null = null;

async function load(): Promise<Product[]> {
  const base = PRODUCTS.map((p) => ({ ...p }));

  if (!PAAPI_ENABLED) {
    if (typeof console !== 'undefined') {
      console.info('[products] PA-API disabled — using curated data (no live prices).');
    }
    return sortByRank(base);
  }

  try {
    const live = await getItems(base.map((p) => p.asin));
    for (const product of base) {
      const data = live.get(product.asin);
      if (data) {
        product.live = data;
        if (data.image) product.image = data.image; // prefer fresh API image
      }
    }
    const withPrices = base.filter((p) => p.live?.price).length;
    console.info(`[products] PA-API ok — live prices for ${withPrices}/${base.length} items.`);
  } catch (err) {
    console.warn(
      `[products] PA-API fetch failed, falling back to curated data: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }

  return sortByRank(base);
}

function sortByRank(list: Product[]): Product[] {
  return [...list].sort((a, b) => a.rank - b.rank);
}

export function getProducts(): Promise<Product[]> {
  return (cache ??= load());
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.slug === slug);
}

export async function getByCategory(category: ProductCategory): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.category === category);
}

export async function getFeatured(): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.featured);
}

export async function getTopPicks(limit = 5): Promise<Product[]> {
  return (await getProducts()).slice(0, limit);
}

/** Display label for price: live amount when available, otherwise a CTA. */
export function priceLabel(product: Product): string {
  return product.live?.price ?? 'Check price on Amazon';
}

/** Whether we have a live, timestamped price to show (Amazon requires the timestamp). */
export function hasLivePrice(product: Product): boolean {
  return Boolean(product.live?.price && product.live.fetchedAt);
}
