# Soldering Practice Kit — Amazon Affiliate Site

A fast, fully SEO-optimized Amazon affiliate site for **soldering practice kits**, built with
[Astro](https://astro.build). Static output, structured data, live Amazon prices (optional via
PA-API), and a one-container deploy to Coolify.

- **Stack:** Astro 6 · Tailwind CSS v4 · TypeScript
- **Output:** static HTML (no runtime server) served by nginx
- **Monetization:** Amazon Associates affiliate links + optional live pricing via Product Advertising API 5.0

---

## Quick start (local)

```sh
npm install
cp .env.example .env      # then fill in your values
npm run dev               # http://localhost:4321
npm run build             # outputs to ./dist
npm run preview           # preview the production build
```

Without Amazon API keys the site builds from the **curated dataset** in `src/data/products.ts`
and shows "Check price on Amazon" buttons. Add keys (below) to switch to live prices automatically.

---

## Configuration (environment variables)

See [`.env.example`](./.env.example). The important ones:

| Variable | Required | Purpose |
| --- | --- | --- |
| `SITE_URL` | yes | Canonical URL for SEO / sitemap (no trailing slash) |
| `AMAZON_PARTNER_TAG` | yes | Your Associates tag (e.g. `yourtag-20`) — this is how you earn |
| `AMAZON_ACCESS_KEY` | optional | PA-API key — enables live prices |
| `AMAZON_SECRET_KEY` | optional | PA-API secret — enables live prices |
| `CONTACT_EMAIL` | optional | Address shown on the contact page |

> **Live prices need PA-API access.** Amazon only grants Product Advertising API access after your
> Associates account has made **3 qualifying sales within 180 days**. Until then, leave the keys
> blank — the site works perfectly from curated data and is fully compliant (it never shows a
> stale price as the current price).

---

## Deploying to Coolify

This repo includes a production `Dockerfile` (multi-stage: Node build → nginx) and `nginx.conf`.

1. **Create a new Application** in Coolify and point it at this Git repository.
2. **Build Pack:** select **Dockerfile**.
3. **Port:** `80`.
4. **Environment / Build Variables** — add these (mark them as available at *build time*, since the
   site is statically generated):
   - `SITE_URL` = `https://solderingpracticekit.com`
   - `AMAZON_PARTNER_TAG` = your tag
   - `AMAZON_ACCESS_KEY`, `AMAZON_SECRET_KEY` (optional, once you have PA-API access)
   - `CONTACT_EMAIL` (optional)
5. **Domain:** set `https://solderingpracticekit.com` (you already pointed the domain's NS at
   Coolify). Coolify will provision HTTPS via Let's Encrypt.
6. **Deploy.**

### Keeping prices fresh (when PA-API is enabled)

Prices are baked in at build time, so to keep them current you redeploy on a schedule. Amazon's
terms require prices shown to be no more than 24h old, so a **daily rebuild** is ideal:

- In Coolify, create a **Scheduled Task** (cron `0 4 * * *`) that triggers a redeploy, **or**
- Hit the app's **deploy webhook** from any cron/GitHub Action once a day.

When PA-API is disabled there is nothing to refresh — buttons link straight to Amazon.

---

## Adding or editing products

Products live in [`src/data/products.ts`](./src/data/products.ts) — a typed array. Each entry has a
real Amazon `asin` (so affiliate links resolve) plus editorial fields (score, pros/cons, verdict).
To add a product:

1. Find its ASIN on Amazon.
2. Add an entry to `PRODUCTS` following the existing shape (`rank` controls ordering).
3. Rebuild. A review page is generated automatically at `/reviews/<slug>`.

Live price/image/availability are layered on top from PA-API when enabled; the editorial content is
always the source of truth, so reviews never go stale.

## Adding guides (blog content)

Drop a Markdown file in [`src/content/guides/`](./src/content/guides). Frontmatter schema is defined
in `src/content.config.ts` (title, description, dates, `relatedProducts`, optional `faqs`). New
guides appear on `/guides`, in the RSS feed, and in the sitemap automatically.

---

## Project structure

```
src/
  config/site.ts        # central config (reads env vars)
  data/products.ts      # curated product catalog (editorial + real ASINs)
  lib/
    amazon/paapi.ts      # native PA-API 5.0 client (AWS SigV4, no SDK)
    amazon/links.ts      # affiliate link builder
    products.ts          # data provider: curated + live merge, with fallback
    seo.ts               # JSON-LD / structured-data builders
  components/            # ProductCard, ComparisonTable, AffiliateButton, FAQ, …
  layouts/BaseLayout.astro
  content/guides/*.md    # SEO articles
  pages/                 # routes (homepage, roundups, /reviews, /guides, legal)
Dockerfile · nginx.conf  # Coolify deploy
```

## SEO features

- Per-page `<title>`, meta description, canonical URL, Open Graph + Twitter cards
- JSON-LD structured data: Organization, WebSite, Product (+Review), ItemList, BreadcrumbList,
  FAQPage, Article
- Auto-generated `sitemap-index.xml`, `robots.txt`, and `/rss.xml`
- Fast static pages, prefetching, long-cache hashed assets, lazy-loaded images
- Amazon-compliant affiliate links (`rel="sponsored nofollow noopener"`) and disclosures
