/**
 * Central site configuration.
 *
 * Secrets and deploy-specific values come from environment variables so nothing
 * sensitive (Amazon keys, affiliate tag) is ever committed to the repo.
 * See `.env.example` for the full list.
 */

/**
 * Resolve a config value. `importVal` must be a STATIC `import.meta.env.KEY`
 * reference (Vite/Astro replaces these at build and forbids dynamic access).
 * `process.env` takes precedence so real environment variables (e.g. those set
 * by Coolify / the Dockerfile) always win; `import.meta.env` covers a local
 * `.env` file during `astro dev`.
 */
function pick(importVal: string | undefined, key: string, fallback = ''): string {
  const fromProcess = typeof process !== 'undefined' ? process.env?.[key] : undefined;
  // Use ||, not ??, so an empty string (e.g. an unset Docker ARG that becomes
  // ENV KEY="") falls through to the next source rather than sticking as "".
  return (fromProcess || importVal || fallback) as string;
}

export const SITE = {
  /** Canonical production URL (no trailing slash). */
  url: pick(import.meta.env.SITE_URL, 'SITE_URL', 'https://solderingpracticekit.com').replace(
    /\/$/,
    '',
  ),
  domain: 'solderingpracticekit.com',
  name: 'Soldering Practice Kit',
  /** Used in <title> templates and the brand mark. */
  shortName: 'SolderingPracticeKit',
  tagline: 'Hands-on soldering kits, reviewed and ranked',
  description:
    'Independent reviews and buying guides for the best soldering practice kits. Learn to solder with confidence — compare beginner kits, tools, and projects, then buy on Amazon.',
  /** Default social-share image (1200x630), lives in /public. */
  ogImage: '/og-default.png',
  locale: 'en_US',
  language: 'en',
  themeColor: '#b45309',
  contactEmail: pick(import.meta.env.CONTACT_EMAIL, 'CONTACT_EMAIL', 'hello@solderingpracticekit.com'),
  social: {
    pinterest: pick(import.meta.env.SOCIAL_PINTEREST, 'SOCIAL_PINTEREST', ''),
    youtube: pick(import.meta.env.SOCIAL_YOUTUBE, 'SOCIAL_YOUTUBE', ''),
    x: pick(import.meta.env.SOCIAL_X, 'SOCIAL_X', ''),
  },
} as const;

export const AMAZON = {
  /** Associates tracking id (public — appears in every affiliate link).
   *  Override per-deploy with AMAZON_PARTNER_TAG if needed. */
  partnerTag: pick(import.meta.env.AMAZON_PARTNER_TAG, 'AMAZON_PARTNER_TAG', 'revoba-20'),
  /** PA-API credentials — leave empty to use the curated fallback dataset. */
  accessKey: pick(import.meta.env.AMAZON_ACCESS_KEY, 'AMAZON_ACCESS_KEY', ''),
  secretKey: pick(import.meta.env.AMAZON_SECRET_KEY, 'AMAZON_SECRET_KEY', ''),
  /** US marketplace defaults. */
  host: pick(import.meta.env.AMAZON_HOST, 'AMAZON_HOST', 'webservices.amazon.com'),
  region: pick(import.meta.env.AMAZON_REGION, 'AMAZON_REGION', 'us-east-1'),
  marketplace: pick(import.meta.env.AMAZON_MARKETPLACE, 'AMAZON_MARKETPLACE', 'www.amazon.com'),
  /** Storefront domain used to build affiliate links. */
  storefront: pick(import.meta.env.AMAZON_STOREFRONT, 'AMAZON_STOREFRONT', 'amazon.com'),
} as const;

/** True when live PA-API calls are possible. Otherwise the site uses curated data. */
export const PAAPI_ENABLED = Boolean(AMAZON.accessKey && AMAZON.secretKey && AMAZON.partnerTag);

export const NAV: { label: string; href: string }[] = [
  { label: 'Best Kits', href: '/best-soldering-practice-kits' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Guides', href: '/guides' },
  { label: 'About', href: '/about' },
];

export const FOOTER_LINKS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'Site',
    links: [
      { label: 'Best Soldering Practice Kits', href: '/best-soldering-practice-kits' },
      { label: 'All Reviews', href: '/reviews' },
      { label: 'Guides & How-Tos', href: '/guides' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Use', href: '/terms' },
    ],
  },
];
