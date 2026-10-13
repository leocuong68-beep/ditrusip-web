# Web Di Trú Síp (bản mới, thay WordPress)

- Astro 7, web tĩnh. Dữ liệu đọc từ Supabase `ditrusip` (egbxinegjmhcdqfprsds) lúc build, bằng khoá công khai; RLS chỉ trả nội dung đã đăng.
- Lệnh: `npm install`, `npm run build` → thư mục `dist/` (đưa lên Cloudflare Pages). `public/_redirects` là chuyển hướng 301 cho Cloudflare.
- Bản xem thử chạy dưới thư mục con: `python3 relativize.py dist <thư mục>` đổi link về dạng tương đối (đang để ở www.leocuong.com/ditrusip-web/).

## Đường dẫn (giữ như web cũ)
`/` · `/ve-chung-toi/` · `/dich-vu/` · `/faqs-page/` · `/contact-us/` · `/blog/` · `/<slug bài>/` · `/projects/` · `/projects/<slug>/` · `/services/<slug>/` · mới: `/chi-phi/`, `/chinh-sach-quyen-rieng-tu/` · `sitemap.xml`, `robots.txt`, `404`.
Trang lưu trữ cũ (`/category/*`, `/author/*`, `/project-type|location|budget/*`) chuyển 301 về `/blog/`, `/ve-chung-toi/`, `/projects/`.

## Nguồn dữ liệu
- Bảng `posts`, `pages`, `services`, `listings`, `site_settings`.
- Edge Function `wp-pull` kéo bài/trang từ WordPress mỗi ngày 05:10 UTC, dịch vụ và mô tả dự án 05:20 UTC (pg_cron), cho tới khi pipeline bài viết ghi thẳng vào Supabase.
- Form liên hệ ghi vào `leads` (source = web, có đồng ý).
- `src/shared/costs.ts`, `faq.ts` chép từ app (`data/`): sửa ở app thì chép lại.

## Còn làm
- Viết lại nội dung trang Về chúng tôi, Dịch vụ, Hỏi đáp cho gọn (hiện là nội dung chuyển từ Elementor).
- Chuyển ảnh từ wp-content sang kho `media` của Supabase trước khi tắt WordPress.
- Webhook build lại khi có bài mới; đổi DNS ditrusip.com.
