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

/** Khi đã đăng nhập: ẩn các ô mời đăng ký, gọi cb. Chưa đăng nhập: gắn link quay lại trang này cho nút đăng ký. */
export async function whenMember(cb: (s: Session) => void | Promise<void>) {
  const s = await session();
  document.querySelectorAll<HTMLAnchorElement>('a[data-login]').forEach((a) => (a.href = loginHref()));
  if (!s) return false;
  document.documentElement.dataset.member = '1';
  document.querySelectorAll<HTMLElement>('.gate').forEach((g) => (g.hidden = true));
  await cb(s);
  return true;
}

/** Điền giá dự án vào mọi phần tử [data-price-for="slug"]. */
export async function fillPrices() {
  const els = document.querySelectorAll<HTMLElement>('[data-price-for]');
  if (!els.length) return;
  const { data } = await sb.from('listings').select('slug, price_from, price_to, vat_note');
  const by = new Map((data ?? []).map((l: any) => [l.slug, l]));
  els.forEach((el) => {
    const l: any = by.get(el.dataset.priceFor!);
    if (!l) return;
    el.textContent = (l.price_to ? `${eur(l.price_from)} – ${eur(l.price_to)}` : `Từ ${eur(l.price_from)}`) + ' ' + (l.vat_note ?? '');
    el.classList.add('ok');
    const row = el.closest<HTMLElement>('[data-kind]');
    if (row) row.dataset.price = String(l.price_from);
  });
}
