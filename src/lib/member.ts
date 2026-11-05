// Tài khoản thành viên trên web (chạy ở trình duyệt). Cùng tài khoản với app Di Trú Síp.
// Chi phí dự kiến, An cư, giá và chi tiết dự án BĐS chỉ đọc được khi đã đăng nhập: Supabase chặn vai trò anon (migration 0012).
import { createClient, type Session } from '@supabase/supabase-js';

const URL = 'https://egbxinegjmhcdqfprsds.supabase.co';
const KEY = 'sb_publishable_y4mpI552GpVya7-rm2GRzw_VUiCM_k0';

export const sb = createClient(URL, KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, storageKey: 'ditrusip.auth' },
});

let cached: Promise<Session | null> | null = null;
export function session() {
  return (cached ??= sb.auth.getSession().then((r) => r.data.session).catch(() => null));
}

export const loginHref = (next = location.pathname + location.search) => '/dang-nhap/?next=' + encodeURIComponent(next);

export const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
export const eur = (n: number) => Number(n).toLocaleString('de-DE') + ' €';

// Link chia sẻ cho khách (sếp dặn 5/11/2026): /projects/?k=<mã> mở giá + chi tiết dự án không cần đăng nhập, hết hạn theo bảng share_links (mặc định 30 ngày).
const SHARE_KEY = 'ditrusip.share';
let shareCheck: Promise<{ token: string; expires: string } | null> | null = null;
export function shareLink() {
  return (shareCheck ??= (async () => {
    let token = new URLSearchParams(location.search).get('k') ?? '';
    try { if (token) localStorage.setItem(SHARE_KEY, token); else token = localStorage.getItem(SHARE_KEY) ?? ''; } catch {}
    if (!/^[0-9a-f]{16,64}$/.test(token)) return null;
    const { data } = await sb.rpc('share_link_status', { p_token: token });
    if (!data) { try { localStorage.removeItem(SHARE_KEY); } catch {} return null; }
    return { token, expires: String(data) };
  })().catch(() => null));
}
let shared: Promise<any[]> | null = null;
export async function sharedListings() {
  const l = await shareLink();
  if (!l) return [];
  return (shared ??= sb.rpc('shared_listings', { p_token: l.token }).then((r) => (r.data as any[]) ?? []));
}

/** Khi đã đăng nhập (hoặc mở bằng link chia sẻ còn hạn, với trang cho phép share): ẩn các ô mời đăng ký, gọi cb. */
export async function whenMember(cb: (s: Session | null) => void | Promise<void>, opts: { share?: boolean } = {}) {
  const s = await session();
  document.querySelectorAll<HTMLAnchorElement>('a[data-login]').forEach((a) => (a.href = loginHref()));
  let viaShare = false;
  if (!s) {
    const l = opts.share ? await shareLink() : null;
    if (!l) return false;
    viaShare = true;
    const d = new Date(l.expires).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Nicosia' });
    if (!document.getElementById('share-bar')) {
      const bar = document.createElement('div');
      bar.id = 'share-bar';
      bar.setAttribute('style', 'background:#0E313E;color:#fff;font-size:14px;padding:10px 16px;text-align:center');
      bar.innerHTML = `Anh chị đang xem giá và chi tiết dự án qua link chia sẻ của Di Trú Síp, hiệu lực đến ${d}. <a href="${loginHref()}" style="color:#fff;font-weight:700">Đăng ký miễn phí</a> để xem lâu dài.`;
      document.body.prepend(bar);
    }
  }
  document.documentElement.dataset.member = viaShare ? 'share' : '1';
  document.querySelectorAll<HTMLElement>('.gate').forEach((g) => (g.hidden = true));
  await cb(s);
  return true;
}

/** Điền giá dự án vào mọi phần tử [data-price-for="slug"]. */
export async function fillPrices() {
  const els = document.querySelectorAll<HTMLElement>('[data-price-for]');
  if (!els.length) return;
  const data = (await session()) ? (await sb.from('listings').select('slug, price_from, price_to, vat_note')).data : await sharedListings();
  const by = new Map((data ?? []).map((l: any) => [l.slug, l]));
  els.forEach((el) => {
    const l: any = by.get(el.dataset.priceFor!);
    if (!l) return;
    el.textContent = l.price_from == null ? 'Giá: liên hệ đội ngũ' : (l.price_to ? `${eur(l.price_from)} – ${eur(l.price_to)}` : `Từ ${eur(l.price_from)}`) + ' ' + (l.vat_note ?? '');
    el.classList.add('ok');
    const row = el.closest<HTMLElement>('[data-kind]');
    if (row && l.price_from != null) row.dataset.price = String(l.price_from);
  });
}
