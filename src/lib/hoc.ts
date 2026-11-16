// Khu Học (/hoc/): thành viên xin quyền, nhân viên (staff) duyệt mới học được.
// Bài học nằm trong Supabase (bảng hoc_lessons), RLS chỉ trả cho tài khoản đã duyệt; web tĩnh không chứa nội dung bài.
import { sb, session } from './member';

export type HocStatus = 'guest' | 'none' | 'pending' | 'approved' | 'rejected';
export type HocState = { status: HocStatus; staff: boolean; uid: string | null; name: string };

let cached: Promise<HocState> | null = null;
export function hocState(): Promise<HocState> {
  return (cached ??= (async () => {
    const s = await session();
    if (!s) return { status: 'guest', staff: false, uid: null, name: '' };
    const [{ data: p }, { data: a }] = await Promise.all([
      sb.from('profiles').select('full_name, role, is_reviewer').eq('id', s.user.id).maybeSingle(),
      sb.from('hoc_access').select('status').eq('user_id', s.user.id).maybeSingle(),
    ]);
    const staff = p?.role === 'staff' && !p?.is_reviewer;
    const status = (staff ? 'approved' : ((a?.status as HocStatus) ?? 'none')) as HocStatus;
    return { status, staff, uid: s.user.id, name: p?.full_name ?? '' };
  })());
}

export async function requestAccess(note: string) {
  const s = await session();
  if (!s) return 'Anh chị cần đăng nhập trước.';
  const { error } = await sb.from('hoc_access').insert({ user_id: s.user.id, note: note.trim().slice(0, 500) || null });
  cached = null;
  return error && error.code !== '23505' ? 'Chưa gửi được yêu cầu, anh chị thử lại sau ít phút.' : '';
}

export const GREEK_STAGES = [
  { id: 's0', name: 'Chặng 0 · Bảng chữ cái và phát âm' },
  { id: 'a1w1', name: 'A1 · Tuần 1 · Làm quen' },
  { id: 'a1w2', name: 'A1 · Tuần 2 · Đời sống hằng ngày' },
];
