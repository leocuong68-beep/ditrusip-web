// Sao từ ditrusip-app/data/settle.ts.
// Hướng dẫn an cư: kinh nghiệm thực tế của đội ngũ ở Paphos (giai đoạn 4 của dịch vụ).
// Số có hạn sử dụng (học phí, giá thuê…) chưa đưa vào; chỉ đưa khi đã tra nguồn.
export type SettleItem = { title: string; ios: string; md: string; points: string[] };

export const SETTLE: SettleItem[] = [
  { title: 'Giấy tờ năm đầu', ios: 'doc.text.fill', md: 'description', points: [
    'Thứ tự thường gặp: mở ngân hàng cùng lúc làm hồ sơ, sinh trắc học, thẻ cư trú, điện nước, internet, trường cho con, bằng lái, GESY (sau khoảng 12 tháng).',
    'Thủ tục mất thời gian nhưng các bước rõ ràng. Theo kinh nghiệm của đội ngũ, nhiều cơ quan trả lời email khá nhanh.',
  ]},
  { title: 'Điện, nước, internet', ios: 'bolt.fill', md: 'bolt', points: [
    'Lắp internet có khi phải hẹn khoảng một tuần, nên đặt sớm hơn dự kiến.',
    'Hoá đơn điện nước thanh toán trực tuyến được qua JCCsmart.',
    'Mùa hè nhu cầu lắp máy lạnh cao, nên hẹn thợ trước khoảng một tuần.',
  ]},
  { title: 'Trường học cho con', ios: 'graduationcap.fill', md: 'school', points: [
    'Trường công dạy bằng tiếng Hy Lạp, miễn phí. Thời gian đầu cô và bạn giao tiếp với trẻ bằng tiếng Anh.',
    'Trường tư dạy bằng tiếng Anh theo chương trình Anh (IGCSE, A-level), tiếng Hy Lạp là ngôn ngữ thứ hai.',
    'Trẻ càng nhỏ càng dễ hoà nhập. Chúng tôi đi cùng gia đình khảo sát trường.',
  ]},
  { title: 'Xe và đi lại', ios: 'car.fill', md: 'directions_car', points: [
    'Gần như nhà nào cũng cần xe riêng. Xe buýt thưa, chủ yếu phục vụ khách du lịch.',
    'Xe chạy bên trái, nhiều vòng xuyến. Thường lái khoảng một tuần là quen.',
  ]},
  { title: 'Nhà thuê và đồ dùng', ios: 'house.fill', md: 'home', points: [
    'Bazaraki.com và Facebook Marketplace là nơi tìm nhà thuê và đồ cũ phổ biến. Mặc cả là chuyện bình thường.',
    'Đồ nhập khẩu đắt vì phí chở ra đảo. Đồ gia dụng nhỏ, đồ công nghệ có thể mang từ Việt Nam sang.',
  ]},
  { title: 'Chợ, siêu thị, đồ Việt', ios: 'cart.fill', md: 'shopping_cart', points: [
    'Rau quả địa phương tươi và rẻ. Hàng nhập khẩu đắt hơn.',
    'Đồ Việt có ở cửa hàng châu Á nhưng không nhiều loại. Rau muống, rau lang mua được ở trang trại của người Việt.',
  ]},
  { title: 'Y tế', ios: 'cross.case.fill', md: 'medical_services', points: [
    'Síp có hệ thống y tế toàn dân GESY từ năm 2019, gồm bệnh viện công và bác sĩ tư có tham gia.',
    'Ai được tham gia GESY và từ khi nào tuỳ diện cư trú, chúng tôi hướng dẫn theo từng trường hợp.',
  ]},
  { title: 'Cộng đồng người Việt', ios: 'person.3.fill', md: 'diversity_3', points: [
    'Cộng đồng Việt ở Síp gặp nhau cuối tuần và tổ chức Tết đủ nghi thức.',
    'Người Síp sống theo lịch, hẹn trước, ít tụ tập. Cộng đồng Việt là nơi hỏi han nhanh nhất.',
  ]},
];
