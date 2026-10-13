// Chính sách quyền riêng tư dùng chung cho trang web (bản giống app/chinh-sach.tsx trong app).
export const PRIVACY: [string, string][] = [
  [
    "Ai chịu trách nhiệm",
    "Di Trú Síp (ditrusip.com), thuộc công ty EUWay, đơn vị tư vấn định cư và bất động sản tại Paphos, Cộng hoà Síp, chịu trách nhiệm về dữ liệu anh chị cung cấp qua website và ứng dụng Di Trú Síp. Ứng dụng được nhà phát triển Đặng Thái Cường phát hành trên App Store cho Di Trú Síp."
  ],
  [
    "Tóm tắt",
    "Chúng tôi không có quảng cáo, không bán dữ liệu và không theo dõi anh chị qua ứng dụng hay trang web khác. Phần lớn nội dung trong ứng dụng dùng được mà không cần tài khoản. Anh chị xoá được tài khoản ngay trong ứng dụng."
  ],
  [
    "Thông tin chúng tôi lưu trên máy chủ",
    "- Tài khoản: email đăng nhập và mã định danh tài khoản.\n- Yêu cầu tư vấn (Đặt lịch, đăng ký khảo sát, form Liên hệ trên web): họ tên, số WhatsApp/Zalo, chủ đề, lời nhắn, dự án quan tâm.\n- Đánh giá hồ sơ: câu trả lời (mục đích, gia đình, ngân sách, nguồn tiền, thu nhập, lý lịch tư pháp…) chỉ được gửi khi anh chị đánh dấu đồng ý gửi kèm yêu cầu tư vấn. Nếu không gửi, câu trả lời chỉ nằm trên máy anh chị.\n- Trò chuyện với Mia (trợ lý AI): nội dung tin nhắn, thời điểm, mã phiên và một mã băm của địa chỉ IP (không lưu IP gốc) để chống lạm dụng; nếu đang đăng nhập thì gắn với tài khoản. Họ tên, số liên lạc, nhu cầu và lịch hẹn chỉ được lưu khi anh chị bấm “Đồng ý lưu”.\n- Hồ sơ dịch vụ (khách đã ký hợp đồng): tiến trình, tên và trạng thái giấy tờ, lịch hẹn, cập nhật do đội ngũ nhập.\n- Thông báo: mã thông báo đẩy của thiết bị (khi anh chị bấm Bật thông báo), loại tin muốn nhận, trạng thái đã đọc."
  ],
  [
    "Thông tin chỉ nằm trên máy của anh chị",
    "Căn đã lưu, sự kiện đã lưu, lịch sử trò chuyện với Mia trên máy, lựa chọn đồng ý trò chuyện và câu trả lời đánh giá hồ sơ chưa gửi. Đăng xuất hoặc xoá tài khoản sẽ xoá các dữ liệu này khỏi máy."
  ],
  [
    "Chúng tôi không thu thập",
    "Ảnh hay bản chụp giấy tờ, số hộ chiếu, số tài khoản ngân hàng, vị trí, danh bạ, ảnh trong máy. Phần giấy tờ trong ứng dụng chỉ hiện tên và trạng thái do đội ngũ nhập. Xin đừng gửi các thông tin này qua ô trò chuyện."
  ],
  [
    "Mục đích sử dụng",
    "Trả lời câu hỏi và liên hệ tư vấn theo yêu cầu của anh chị; hiển thị tiến trình, lịch hẹn và cập nhật hồ sơ cho khách đã ký hợp đồng; gửi thông báo theo cài đặt của anh chị; chống lạm dụng và giữ an toàn cho dịch vụ."
  ],
  [
    "Các bên giúp chúng tôi vận hành",
    "- Supabase: cơ sở dữ liệu, đăng nhập và máy chủ ứng dụng, đặt tại Frankfurt (Đức, trong EU).\n- Anthropic (Mỹ): xử lý tin nhắn trò chuyện với Mia bằng mô hình AI Claude để tạo câu trả lời. Anthropic nhận nội dung cuộc trò chuyện, không nhận email tài khoản.\n- Expo (Mỹ) và Apple: chuyển thông báo đẩy tới điện thoại; nhận mã thiết bị và nội dung thông báo.\n- Nhà cung cấp hộp thư của ditrusip.com: gửi email mã đăng nhập.\n- GitHub Pages: lưu trữ website ditrusip.com.\n- Open-Meteo và ExchangeRate-API: thời tiết, tỷ giá; không nhận thông tin cá nhân.\n- Video mở trên YouTube, tin nhắn mở trên WhatsApp hoặc Zalo, bản đồ mở trên Google Maps; các dịch vụ đó có chính sách riêng.\nViệc chuyển dữ liệu ra ngoài EU (Anthropic, Expo) theo điều khoản xử lý dữ liệu của từng nhà cung cấp."
  ],
  [
    "Thời hạn lưu",
    "- Khách chưa ký hợp đồng: thông tin được xoá sau 24 tháng kể từ lần liên hệ cuối.\n- Cuộc trò chuyện với Mia: lưu tối đa 24 tháng.\n- Hồ sơ dịch vụ của khách đã ký hợp đồng: lưu theo thời hạn luật kế toán và pháp lý Síp yêu cầu.\n- Khi anh chị xoá tài khoản: tài khoản, yêu cầu tư vấn, cuộc trò chuyện với Mia, mã thông báo và thông báo được xoá ngay. Hồ sơ dịch vụ đã ký (nếu có) được giữ theo nghĩa vụ pháp lý, không còn gắn với tài khoản."
  ],
  [
    "Quyền của anh chị",
    "Anh chị có quyền xem, sửa, xoá dữ liệu của mình, hạn chế hoặc phản đối việc xử lý, nhận bản sao dữ liệu và rút lại đồng ý bất cứ lúc nào. Xoá tài khoản ngay trong mục Tài khoản của ứng dụng, hoặc gửi yêu cầu qua email. Anh chị cũng có quyền khiếu nại tới Văn phòng Ủy viên Bảo vệ Dữ liệu Cá nhân Síp (dataprotection.gov.cy)."
  ],
  [
    "Trẻ em",
    "Dịch vụ dành cho người từ 18 tuổi. Chúng tôi không cố ý thu thập dữ liệu của trẻ em; thông tin về con cái chỉ có khi cha mẹ tự cung cấp để tư vấn hồ sơ gia đình."
  ],
  [
    "Thay đổi chính sách",
    "Khi chính sách thay đổi, chúng tôi cập nhật trang này và ngày hiệu lực. Thay đổi quan trọng sẽ được thông báo trong ứng dụng."
  ]
];
export const PRIVACY_DATE = "13 tháng 10 năm 2026";
