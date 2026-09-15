// Deep GSC opportunity analysis: maps opportunity queries to the page that serves
// them, ranks pages by unrealised impressions, and flags high-impression queries
// with no strong owner. Complements gsc-report.mjs (no extra deps).
//
// Usage:
//   node scripts/gsc-opportunities.mjs [site] [days]
//   site: "silatiranbasbug.com" (default) or "oyunterapisiankara.com"
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const KEY_PATH = path.join(process.cwd(), 'gsc-service-account.json');
if (!fs.existsSync(KEY_PATH)) {
    console.error('gsc-service-account.json bulunamadı (repo kökünde olmalı).');
    process.exit(1);
}
const key = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));
const site = process.argv[2] || 'silatiranbasbug.com';
const days = Number(process.argv[3] || 90);
const siteUrl = `sc-domain:${site}`;

const b64url = (i) => Buffer.from(i).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function getAccessToken() {
    const now = Math.floor(Date.now() / 1000);
    const claim = { iss: key.client_email, scope: 'https://www.googleapis.com/auth/webmasters.readonly', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 };
    const unsigned = `${b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64url(JSON.stringify(claim))}`;
    const signature = crypto.createSign('RSA-SHA256').update(unsigned).sign(key.private_key);
    const jwt = `${unsigned}.${b64url(signature)}`;
    const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Token alınamadı: ${res.status} ${JSON.stringify(data)}`);
    return data.access_token;
}

async function query(token, body) {
    const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
        method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Sorgu başarısız: ${res.status} ${JSON.stringify(data)}`);
    return data.rows || [];
}

const fmtDate = (d) => d.toISOString().slice(0, 10);
const shortPage = (u) => u.replace(/^https?:\/\/[^/]+/, '') || '/';

async function main() {
    const end = new Date(); end.setDate(end.getDate() - 3);
    const start = new Date(end); start.setDate(start.getDate() - days);
    const startDate = fmtDate(start), endDate = fmtDate(end);
    console.log(`\n=== ${site} — ${startDate} → ${endDate} (${days} gün) — FIRSAT ANALİZİ ===\n`);
    const token = await getAccessToken();

    // 1) Query+page rows (which page serves which query)
    const qp = await query(token, { startDate, endDate, dimensions: ['query', 'page'], rowLimit: 1000 });
    const pageForQuery = {};
    for (const r of qp) {
        const [q, p] = r.keys;
        if (!pageForQuery[q] || r.impressions > pageForQuery[q].impressions) pageForQuery[q] = { page: p, ...r };
    }

    // 2) Opportunity queries: impr>=30, pos 4-30, low CTR — grouped by page
    const opps = (await query(token, { startDate, endDate, dimensions: ['query'], rowLimit: 500 }))
        .filter((r) => r.impressions >= 30 && r.position >= 4 && r.position <= 30 && r.ctr < 0.05)
        .sort((a, b) => b.impressions - a.impressions);
    console.log(`FIRSAT SORGULARI (≥30 gösterim, poz 4-30, CTR <%5) — ${opps.length} adet:`);
    console.log('  gösterim · poz  · tık · sorgu  →  servis eden sayfa');
    for (const r of opps) {
        const q = r.keys[0];
        const pg = pageForQuery[q] ? shortPage(pageForQuery[q].page) : '???';
        console.log(`  ${String(r.impressions).padStart(4)} · ${r.position.toFixed(1).padStart(4)} · ${String(r.clicks).padStart(2)} · ${q}  →  ${pg}`);
    }

    // 3) Pages by impressions (where is demand landing?)
    const pages = (await query(token, { startDate, endDate, dimensions: ['page'], rowLimit: 100 }))
        .sort((a, b) => b.impressions - a.impressions).slice(0, 25);
    console.log(`\nSAYFA PERFORMANSI (gösterim / tık / poz):`);
    for (const r of pages) {
        console.log(`  ${String(r.impressions).padStart(5)} · ${String(r.clicks).padStart(3)} · poz ${r.position.toFixed(1).padStart(5)}  —  ${shortPage(r.keys[0])}`);
    }
    console.log('');
}
main().catch((e) => { console.error('HATA:', e.message); process.exit(1); });
