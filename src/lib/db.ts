// Đọc Supabase (project ditrusip) bằng khoá công khai. RLS chỉ trả nội dung đã đăng.
export const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL ?? 'https://egbxinegjmhcdqfprsds.supabase.co';
export const SUPABASE_KEY = import.meta.env.PUBLIC_SUPABASE_KEY ?? 'sb_publishable_y4mpI552GpVya7-rm2GRzw_VUiCM_k0';

export async function q<T = any>(path: string): Promise<T[]> {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  if (!r.ok) throw new Error(`Supabase ${path}: ${r.status} ${await r.text()}`);
  return r.json();
}

export type Post = { slug: string; title: string; excerpt: string; content_html: string; category: string | null; cover_url: string | null; seo_title: string | null; seo_description: string | null; published_at: string; updated_at: string };
export type Page = { slug: string; title: string; content_html: string; seo_title: string | null; seo_description: string | null; updated_at: string };
export type Service = Page & { summary: string | null; position: number };
// Giá, nội dung, thư viện ảnh của dự án chỉ thành viên đọc được (migration 0012); lúc build chỉ có phần xem trước.
export type Listing = { id: number; slug: string; title: string; kind: string; area: string; bedrooms: string | null; size_m2: string | null; handover: string | null; image_url: string | null; synced_at: string };
export type GuidePreview = { slug: string; position: number; title: string; short: string; image: string; intro: string; updated_at: string };

let cache: Record<string, Promise<any[]>> = {};
const once = <T>(k: string, path: string) => (cache[k] ??= q<T>(path)) as Promise<T[]>;

export const getPosts = () => once<Post>('posts', 'posts?select=*&order=published_at.desc');
export const getPages = () => once<Page>('pages', 'pages?select=*');
export const getServices = () => once<Service>('services', 'services?select=*&order=position');
export const getListings = () => once<Listing>('listings', 'listings?select=id,slug,title,kind,area,bedrooms,size_m2,handover,image_url,synced_at&is_published=eq.true&order=title');
export const getGuides = () => once<GuidePreview>('guides', 'guides?select=slug,position,title,short,image,intro,updated_at&order=position');
export const getSetting = async (key: string) => (await once<any>('settings', 'site_settings?select=*')).find((s) => s.key === key)?.value ?? {};

export const CATS: Record<string, string> = { 'di-tru': 'Di trú', bds: 'Bất động sản', 'kinh-te': 'Kinh tế', 'doi-song': 'Đời sống', 'an-cu': 'An cư' };
export const fmtEUR = (n: number) => n.toLocaleString('de-DE') + ' €';
export const fmtDate = (s: string) => new Date(s).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Nicosia' });
// Ảnh/link trong nội dung cũ trỏ về ditrusip.com: giữ nguyên ảnh (wp-content còn chạy tới khi chuyển kho ảnh), đổi link nội bộ thành đường dẫn tương đối.
export const fixLinks = (html: string) => html.replace(/href="https:\/\/ditrusip\.com(\/(?!wp-content\/)[^"]*)"/g, 'href="$1"');

// Dọn HTML chuyển từ Elementor: bỏ nhãn trang trí (danh sách 1 mục ngắn), mục rỗng, ảnh lặp (Elementor
// đặt cùng ảnh nhiều lần cho từng cỡ màn hình).
export function tidy(html: string): string {
  let s = html.replace(/<i><\/i>/g, '').replace(/<a[^>]*>\s*<\/a>/g, '').replace(/<li>\s*<\/li>/g, '');
  s = s.replace(/<ul>\s*<li>\s*[^<]{0,60}\s*<\/li>\s*<\/ul>/g, '');
  s = s.replace(/<ul>\s*<\/ul>/g, '');
  const seen = new Set<string>();
  s = s.replace(/<img[^>]*src="([^"]*)"[^>]*>/g, (m, src: string) => {
    const k = src.replace(/-\d+x\d+(\.\w+)$/, '$1').replace(/-scaled(\.\w+)$/, '$1');
    if (!src || seen.has(k)) return '';
    seen.add(k); return m;
  });
  return s;
}
