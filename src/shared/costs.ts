// Theo "Bảng dự toán chi phí đầu tư bất động sản & hồ sơ PR Cyprus" của Di Trú Síp (sếp gửi 13/10/2026).
// Mọi khoản tính bằng EUR, có thể thay đổi theo thời điểm.

export type CostInput = { price: number; vat: 5 | 19; spouse: boolean; kids: number; adultKids: number };
export type CostLine = { label: string; detail?: string; amount: number };
export type CostGroup = { title: string; lines: CostLine[]; total: number };

export const SERVICE_FEE = 10000;
export const COST_SOURCE = 'Bảng dự toán chi phí đầu tư BĐS & hồ sơ PR Cyprus, Di Trú Síp (bản 2026)';

export function computeCosts(i: CostInput) {
  const persons = 1 + (i.spouse ? 1 : 0) + i.kids + i.adultKids;
  const lawyer = Math.round(i.price * 0.01);
  const g = (title: string, lines: CostLine[]): CostGroup => ({ title, lines, total: lines.reduce((a, l) => a + l.amount, 0) });

  const property = g('Bất động sản', [
    { label: 'Giá mua', amount: i.price },
    { label: `VAT ${i.vat}%`, detail: i.vat === 5 ? 'Mua để ở (có điều kiện)' : 'Mua cho thuê', amount: Math.round(i.price * i.vat / 100) },
  ]);
  const legal = g('Luật sư và thủ tục PR', [
    { label: 'Phí luật sư', detail: '1% giá mua', amount: lawyer },
    { label: 'VAT 19% trên phí luật sư', amount: Math.round(lawyer * 0.19) },
    { label: 'Sinh trắc học', detail: 'Đương đơn, vợ/chồng và con dưới 18', amount: 1500 },
    ...(i.adultKids ? [{ label: 'Phí pháp lý PR con trên 18', detail: `500 € × ${i.adultKids}`, amount: 500 * i.adultKids }] : []),
    { label: 'Mở tài khoản ngân hàng tại Síp', amount: 700 },
  ]);
  const state = g('Phí nhà nước và chi phí thực tế', [
    { label: 'Nộp hợp đồng tại Sở Địa chính', amount: 100 },
    { label: 'Đăng ký, xác thực giấy uỷ quyền (POA)', amount: 50 },
    { label: 'Bảo hiểm y tế', detail: `200 € × ${persons} người`, amount: 200 * persons },
    { label: 'Phí nộp hồ sơ PR', detail: 'Đương đơn, vợ/chồng, con dưới 18', amount: 500 },
    ...(i.adultKids ? [{ label: 'Phí nộp hồ sơ PR con trên 18', detail: `500 € × ${i.adultKids}`, amount: 500 * i.adultKids }] : []),
    { label: 'Chuyển hồ sơ đến Sở Di trú Nicosia', amount: 100 },
    { label: 'Lệ phí cấp thẻ PR', detail: `70 € × ${persons} người`, amount: 70 * persons },
    { label: 'Hỗ trợ sinh trắc học, theo dõi hồ sơ', amount: 100 },
    { label: 'Đi Nicosia nhận thẻ PR', amount: 500 },
    { label: 'Hồ sơ tài chính', detail: 'Chứng minh nguồn tiền, thu nhập, chuyển tiền chính chủ. Từ 10.000 €', amount: 10000 },
  ]);
  const service = g('Phí dịch vụ tư vấn và đồng hành', [
    { label: 'Trọn gói đến khi nhận thẻ thường trú (PR)', detail: '50% đặt cọc khi ký hợp đồng, 50% khi có thư chấp thuận PR', amount: SERVICE_FEE },
  ]);
  const groups = [property, legal, state, service];
  const total = groups.reduce((a, x) => a + x.total, 0);
  return { groups, total, extra: total - i.price, persons };
}
