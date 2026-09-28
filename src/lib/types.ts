/** Editorial price tier (NOT a live price — used for budget context only). */
export type PriceTier = '$' | '$$' | '$$$';

export type ProductCategory = 'practice' | 'project' | 'tool' | 'accessory' | 'test';

/** Live data fetched from the Amazon Product Advertising API at build time. */
export interface LiveData {
  /** Formatted price string, e.g. "$24.99". */
  price?: string;
  priceAmount?: number;
  currency?: string;
  savingsPercent?: number;
  /** Live image URL from PA-API (overrides the curated CDN url). */
  image?: string;
  availability?: string;
  isPrimeEligible?: boolean;
  /** ISO timestamp when the live price was fetched (Amazon requires this). */
  fetchedAt?: string;
}

/** A curated product entry. Editorial fields are the source of truth; price &
 *  availability come from {@link LiveData} when PA-API is enabled. */
export interface Product {
  asin: string;
  slug: string;
  /** Short, human display title for cards and headings. */
  title: string;
  /** Full Amazon listing title (used for image alt + structured data). */
  fullTitle: string;
  brand: string;
  category: ProductCategory;

  /** Editorial award badge, e.g. "Best Overall". */
  award?: string;
  /** Ordering within roundups (1 = top). */
  rank: number;
  /** Editorial score out of 10. */
  ourScore: number;
  /** Rough budget context. Never rendered as a current price. */
  priceTier: PriceTier;
  /** Show on the homepage / main roundup. */
  featured: boolean;

  tagline: string;
  /** 1–2 sentence summary for cards and meta descriptions. */
  excerpt: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  /** Spec/feature bullets (kept factual & generic). */
  features: string[];
  /** Longer review-page verdict. */
  verdict: string;

  /** One-line reason this product earns its place, written for roundup pages
   *  so the ranked list does not repeat the review page's copy. */
  roundupNote?: string;
  /** What the box actually contains, taken from the listing. */
  inTheBox?: string[];
  /** Product-specific advice for the first session with it. */
  firstSteps?: string;
  /** Two alternatives worth weighing, with the reason to prefer each. */
  alternatives?: { slug: string; why: string }[];
  /** Questions buyers ask about this specific product. */
  faqs?: { question: string; answer: string }[];

  image: string;
  imageWidth: number;
  imageHeight: number;

  /** Filled at runtime from PA-API when available. */
  live?: LiveData;

  updatedAt: string;
}
