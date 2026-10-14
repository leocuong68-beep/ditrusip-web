import { getPosts, getPages, getServices, getListings } from '../lib/db';
import { GUIDES } from '../shared/guides';
export async function GET() {
  const site = 'https://ditrusip.com';
  const u: [string, string?][] = [['/'], ['/blog/'], ['/projects/'], ['/chi-phi/'], ['/an-cu/'], ['/chinh-sach-quyen-rieng-tu/'], ['/dieu-khoan/'], ['/ho-tro/'], ['/xoa-tai-khoan/']];
  for (const p of await getPages()) if (!['home', 'blog'].includes(p.slug)) u.push([`/${p.slug}/`, p.updated_at]);
  for (const s of await getServices()) u.push([`/services/${s.slug}/`, s.updated_at]);
  for (const l of await getListings()) u.push([`/projects/${l.slug}/`, l.synced_at]);
  for (const g of GUIDES) u.push([`/an-cu/${g.slug}/`, g.checked.split('/').reverse().join('-')]);
  for (const p of await getPosts()) u.push([`/${p.slug}/`, p.updated_at]);
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${u.map(([loc, mod]) => `  <url><loc>${site}${loc}</loc>${mod ? `<lastmod>${mod.slice(0, 10)}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
