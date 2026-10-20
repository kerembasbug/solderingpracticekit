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

/** A consumable or accessory that completes a shopping set but has no review
 *  page of its own. Links directly to Amazon. */
export interface Extra {
  asin: string;
  slug: string;
  title: string;
  fullTitle: string;
  brand: string;
  /** One line on why it belongs on a bench. */
  note: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
}

/** One line of a shopping set: a reviewed product or an extra, plus the job it does. */
export interface SetItem {
  /** Slug of a {@link Product} or an {@link Extra}. */
  ref: string;
  /** The job this item does in the set, e.g. "Iron", "Solder". */
  role: string;
  /** Why this one, in one sentence, written for this set. */
  why: string;
  /** Optional: skip the "Add set to Amazon cart" link for this item (e.g. bulky alternatives). */
  optional?: boolean;
}

/** A curated shopping set — everything needed for one job, sent to Amazon together. */
export interface ProductSet {
  id: string;
  title: string;
  /** One sentence for cards and meta descriptions. */
  tagline: string;
  /** Who this set is for, 2–3 sentences shown above the list. */
  intro: string;
  /** Longer body for the set's own page (Markdown-free paragraphs). */
  body: string[];
  items: SetItem[];
  faqs: { question: string; answer: string }[];
  /** Guide or roundup this set accompanies, for the back-link. */
  readMore?: { label: string; href: string };
  updatedAt: string;
}
