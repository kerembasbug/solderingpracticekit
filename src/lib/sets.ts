import { SETS } from '@/data/sets';
import { EXTRAS } from '@/data/extras';
import { getProducts } from '@/lib/products';
import type { Extra, Product, ProductSet, SetItem } from '@/lib/types';

/** A set line resolved against the product and extras catalogs. */
export interface ResolvedSetItem extends SetItem {
  asin: string;
  title: string;
  fullTitle: string;
  brand: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  /** Internal review page when the item is a reviewed product; otherwise undefined. */
  reviewHref?: string;
  product?: Product;
  extra?: Extra;
}

export interface ResolvedSet extends Omit<ProductSet, 'items'> {
  items: ResolvedSetItem[];
}

export function getExtraBySlug(slug: string): Extra | undefined {
  return EXTRAS.find((e) => e.slug === slug);
}

async function resolveItem(item: SetItem, products: Product[]): Promise<ResolvedSetItem> {
  const product = products.find((p) => p.slug === item.ref);
  if (product) {
    return {
      ...item,
      asin: product.asin,
      title: product.title,
      fullTitle: product.fullTitle,
      brand: product.brand,
      image: product.image,
      imageWidth: product.imageWidth,
      imageHeight: product.imageHeight,
      reviewHref: `/reviews/${product.slug}`,
      product,
    };
  }
  const extra = getExtraBySlug(item.ref);
  if (!extra) throw new Error(`Set item "${item.ref}" is neither a product nor an extra`);
  return {
    ...item,
    asin: extra.asin,
    title: extra.title,
    fullTitle: extra.fullTitle,
    brand: extra.brand,
    image: extra.image,
    imageWidth: extra.imageWidth,
    imageHeight: extra.imageHeight,
    extra,
  };
}

export async function resolveSet(set: ProductSet): Promise<ResolvedSet> {
  const products = await getProducts();
  const items = await Promise.all(set.items.map((i) => resolveItem(i, products)));
  return { ...set, items };
}

export async function getSets(): Promise<ResolvedSet[]> {
  return Promise.all(SETS.map(resolveSet));
}

export async function getSetById(id: string): Promise<ResolvedSet | undefined> {
  const set = SETS.find((s) => s.id === id);
  return set ? resolveSet(set) : undefined;
}

/** Sets that include a given product slug — for "appears in these sets" on review pages. */
export async function getSetsForProduct(slug: string): Promise<ResolvedSet[]> {
  const all = await getSets();
  return all.filter((s) => s.items.some((i) => i.ref === slug));
}

export const SET_PATH = '/sets';
export function setHref(id: string): string {
  return `${SET_PATH}/${id}`;
}
