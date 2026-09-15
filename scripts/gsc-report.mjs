// Pulls Search Console data via the service account (no extra deps — Node crypto
// signs a JWT, exchanges it for an access token, then queries Search Analytics).
//
// Usage:
//   node scripts/gsc-report.mjs [site] [days]
//   site: "silatiranbasbug.com" (default) or "oyunterapisiankara.com"
//   days: lookback window (default 90)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const KEY_PATH = path.join(process.cwd(), 'gsc-service-account.json');
if (!fs.existsSync(KEY_PATH)) {
    console.error('gsc-service-account.json bulunamadı (repo kökünde olmalı). Bkz. GSC_SETUP.md');
    process.exit(1);
}
const key = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));

const site = process.argv[2] || 'silatiranbasbug.com';
const days = Number(process.argv[3] || 90);
const siteUrl = `sc-domain:${site}`;

function b64url(input) {
    return Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function getAccessToken() {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const claim = {
        iss: key.client_email,
        scope: 'https://www.googleapis.com/auth/webmasters.readonly',
        aud: 'https://oauth2.googleapis.com/token',
        iat: now,
        exp: now + 3600,
    };
    const unsigned = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(claim))}`;
    const signature = crypto.createSign('RSA-SHA256').update(unsigned).sign(key.private_key);
    const jwt = `${unsigned}.${b64url(signature)}`;

    const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: jwt,
        }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Token alınamadı: ${res.status} ${JSON.stringify(data)}`);
    return data.access_token;
}

async function query(token, body) {
    const res = await fetch(
        `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
        {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`Sorgu başarısız: ${res.status} ${JSON.stringify(data)}`);
    return data.rows || [];
}

function fmtDate(d) {
    return d.toISOString().slice(0, 10);
}

async function main() {
    const end = new Date();
    end.setDate(end.getDate() - 3); // GSC data lags ~2-3 days
    const start = new Date(end);
    start.setDate(start.getDate() - days);
    const startDate = fmtDate(start);
    const endDate = fmtDate(end);

    console.log(`\n=== ${site} — ${startDate} → ${endDate} (${days} gün) ===\n`);
    const token = await getAccessToken();

    // Totals
    const totals = await query(token, { startDate, endDate, dimensions: [] });
    if (totals[0]) {
        const t = totals[0];
        console.log(`TOPLAM: ${t.clicks} tık · ${t.impressions} gösterim · CTR %${(t.ctr * 100).toFixed(1)} · ort. pozisyon ${t.position.toFixed(1)}\n`);
    }

    // Top queries
    const queries = await query(token, { startDate, endDate, dimensions: ['query'], rowLimit: 25 });
    console.log('EN ÇOK SORGU (tık / gösterim / pozisyon):');
    for (const r of queries) {
        console.log(`  ${String(r.clicks).padStart(4)} · ${String(r.impressions).padStart(6)} · poz ${r.position.toFixed(1).padStart(5)}  —  ${r.keys[0]}`);
    }

    // Opportunity queries: high impressions, low clicks, page-2ish
    console.log('\nFIRSAT SORGULARI (>=50 gösterim, poz 8-25, düşük CTR):');
    const opps = queries
        .concat(await query(token, { startDate, endDate, dimensions: ['query'], rowLimit: 200 }))
        .filter((r, i, a) => a.findIndex((x) => x.keys[0] === r.keys[0]) === i)
        .filter((r) => r.impressions >= 50 && r.position >= 8 && r.position <= 25)
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 15);
    for (const r of opps) {
        console.log(`  ${String(r.impressions).padStart(6)} gösterim · poz ${r.position.toFixed(1).padStart(5)} · ${r.clicks} tık  —  ${r.keys[0]}`);
    }
    console.log('');
}

main().catch((e) => {
    console.error('HATA:', e.message);
    if (String(e.message).includes('403') || String(e.message).toLowerCase().includes('permission')) {
        console.error('(İzin yeni verildiyse birkaç dakika bekleyip tekrar deneyin — GSC yetki yayılımı gecikebilir.)');
    }
    process.exit(1);
});
