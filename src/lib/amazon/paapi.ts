import crypto from 'node:crypto';
import { AMAZON } from '@/config/site';
import type { LiveData } from '@/lib/types';

/**
 * Minimal, dependency-free Amazon Product Advertising API 5.0 client.
 *
 * Implements AWS Signature V4 with Node's built-in crypto, so we avoid the
 * outdated official SDK (and its vulnerable crypto-js dependency). Only the
 * `GetItems` operation is implemented — that is all the site needs to refresh
 * live prices, images and availability at build time.
 *
 * Docs: https://webservices.amazon.com/paapi5/documentation/
 */

const SERVICE = 'ProductAdvertisingAPI';
const ALGORITHM = 'AWS4-HMAC-SHA256';

/** Resources we request. Deliberately excludes CustomerReviews.* — those are
 *  restricted and error out for most associates. */
const GET_ITEMS_RESOURCES = [
  'ItemInfo.Title',
  'ItemInfo.ByLineInfo',
  'Images.Primary.Large',
  'Offers.Listings.Price',
  'Offers.Listings.SavingBasis',
  'Offers.Listings.Availability.Message',
  'Offers.Listings.DeliveryInfo.IsPrimeEligible',
];

function sha256Hex(data: string): string {
  return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
}

function hmac(key: crypto.BinaryLike | Buffer, data: string): Buffer {
  return crypto.createHmac('sha256', key).update(data, 'utf8').digest();
}

function amzDates(now: Date): { amzDate: string; dateStamp: string } {
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.slice(0, 8);
  return { amzDate, dateStamp };
}

function signingKey(secret: string, dateStamp: string, region: string): Buffer {
  const kDate = hmac(`AWS4${secret}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, SERVICE);
  return hmac(kService, 'aws4_request');
}

interface PaApiItem {
  ASIN: string;
  Images?: { Primary?: { Large?: { URL?: string } } };
  ItemInfo?: { Title?: { DisplayValue?: string } };
  Offers?: {
    Listings?: Array<{
      Price?: { DisplayAmount?: string; Amount?: number; Currency?: string };
      SavingBasis?: { Amount?: number };
      Availability?: { Message?: string };
      DeliveryInfo?: { IsPrimeEligible?: boolean };
    }>;
  };
}

async function getItemsBatch(asins: string[], now: Date): Promise<Map<string, LiveData>> {
  const path = '/paapi5/getitems';
  const target = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems';
  const { amzDate, dateStamp } = amzDates(now);

  const payload = JSON.stringify({
    ItemIds: asins,
    Resources: GET_ITEMS_RESOURCES,
    PartnerTag: AMAZON.partnerTag,
    PartnerType: 'Associates',
    Marketplace: AMAZON.marketplace,
  });

  const contentType = 'application/json; charset=utf-8';
  const contentEncoding = 'amz-1.0';

  // --- Canonical request ---
  const canonicalHeaders =
    `content-encoding:${contentEncoding}\n` +
    `host:${AMAZON.host}\n` +
    `x-amz-date:${amzDate}\n` +
    `x-amz-target:${target}\n`;
  const signedHeaders = 'content-encoding;host;x-amz-date;x-amz-target';
  const canonicalRequest = [
    'POST',
    path,
    '',
    canonicalHeaders,
    signedHeaders,
    sha256Hex(payload),
  ].join('\n');

  // --- String to sign ---
  const scope = `${dateStamp}/${AMAZON.region}/${SERVICE}/aws4_request`;
  const stringToSign = [ALGORITHM, amzDate, scope, sha256Hex(canonicalRequest)].join('\n');

  // --- Signature ---
  const key = signingKey(AMAZON.secretKey, dateStamp, AMAZON.region);
  const signature = crypto.createHmac('sha256', key).update(stringToSign, 'utf8').digest('hex');

  const authorization =
    `${ALGORITHM} Credential=${AMAZON.accessKey}/${scope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const res = await fetch(`https://${AMAZON.host}${path}`, {
    method: 'POST',
    headers: {
      'content-type': contentType,
      'content-encoding': contentEncoding,
      host: AMAZON.host,
      'x-amz-date': amzDate,
      'x-amz-target': target,
      Authorization: authorization,
    },
    body: payload,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`PA-API ${res.status}: ${text.slice(0, 300)}`);
  }

  const json = (await res.json()) as { ItemsResult?: { Items?: PaApiItem[] } };
  const items = json.ItemsResult?.Items ?? [];
  const fetchedAt = now.toISOString();
  const out = new Map<string, LiveData>();

  for (const item of items) {
    const listing = item.Offers?.Listings?.[0];
    const price = listing?.Price;
    const savings =
      price?.Amount && listing?.SavingBasis?.Amount && listing.SavingBasis.Amount > 0
        ? Math.round((1 - price.Amount / listing.SavingBasis.Amount) * 100)
        : undefined;
    out.set(item.ASIN, {
      price: price?.DisplayAmount,
      priceAmount: price?.Amount,
      currency: price?.Currency,
      savingsPercent: savings && savings > 0 ? savings : undefined,
      image: item.Images?.Primary?.Large?.URL,
      availability: listing?.Availability?.Message,
      isPrimeEligible: listing?.DeliveryInfo?.IsPrimeEligible,
      fetchedAt,
    });
  }
  return out;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Fetch live data for any number of ASINs (chunked into batches of 10, the
 * PA-API per-request maximum, with throttling to respect rate limits).
 * Returns a map keyed by ASIN. Throws on the first failed batch.
 */
export async function getItems(asins: string[]): Promise<Map<string, LiveData>> {
  const result = new Map<string, LiveData>();
  const now = new Date();
  for (let i = 0; i < asins.length; i += 10) {
    const batch = asins.slice(i, i + 10);
    const map = await getItemsBatch(batch, now);
    for (const [asin, data] of map) result.set(asin, data);
    if (i + 10 < asins.length) await sleep(1100); // ~1 req/sec default TPS
  }
  return result;
}
