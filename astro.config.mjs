import { defineConfig } from 'astro/config';
// Web tĩnh: dữ liệu đọc từ Supabase lúc build. Đăng bài mới → build lại (webhook Cloudflare Pages).
export default defineConfig({
  site: 'https://ditrusip.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
