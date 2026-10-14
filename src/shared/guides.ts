// Sao từ ditrusip-app/data/guides.ts (ảnh đổi sang đường dẫn web). Sửa ở app thì chép lại vào đây.
// Bài hướng dẫn an cư từng bước (mục An cư, tab Thông tin). Sếp Leo giao 14/10/2026.
// Mỗi ý lấy từ trang chính thức (ghi ở sources) hoặc ghi rõ "theo kinh nghiệm của đội ngũ".
// Phí, giờ mở cửa, địa chỉ có thể đổi: ghi ngày kiểm tra ở `checked`, sửa khi có thông tin mới.
type ImageSourcePropType = string;

export type GuideStep = { title: string; body: string };
export type GuideSection = { title: string; points: string[] };
export type Guide = {
  slug: string;
  title: string;
  short: string;
  image: ImageSourcePropType;
  intro: string;
  steps: GuideStep[];
  sections: GuideSection[];
  tip?: string;
  sources: { label: string; url: string }[];
  checked: string;
};

export const GUIDES: Guide[] = [
  {
    slug: 'ngan-hang',
    title: 'Mở tài khoản ngân hàng',
    short: 'Nên mở ngay khi làm hồ sơ để luật sư xử lý một lần; chưa cần thì mở Revolut sau khi có thẻ.',
    image: '/img/guides/ngan_hang.jpg',
    intro: 'Kinh nghiệm của đội ngũ: nên mở tài khoản ngân hàng ở Síp ngay từ đầu, khi đang làm hồ sơ mua nhà và thẻ cư trú. Lúc đó luật sư đã có đủ giấy tờ của gia đình nên xử lý luôn một lần. Để sau mới mở thì phải tập hợp lại hồ sơ, mất nhiều thời gian.',
    steps: [
      { title: 'Mở cùng lúc làm hồ sơ', body: 'Báo luật sư muốn mở tài khoản ngay khi bắt đầu hồ sơ. Luật sư dùng chung bộ giấy tờ đã chuẩn bị (hộ chiếu, nguồn tiền, địa chỉ) để làm với ngân hàng. Khoản này đã có trong bảng dự toán chi phí của Di Trú Síp.' },
      { title: 'Trả lời câu hỏi của ngân hàng', body: 'Ngân hàng ở Síp kiểm tra kỹ nguồn gốc tiền và mục đích mở tài khoản. Trả lời đúng, khớp với hồ sơ chứng minh tài chính đã nộp, để hồ sơ không bị hỏi đi hỏi lại.' },
      { title: 'Nếu chưa cần thì để sau', body: 'Gia đình chưa cần tài khoản ở Síp lúc làm hồ sơ thì có thể đợi. Sau khi có thẻ cư trú, mở Revolut trên app dễ hơn nhiều so với tự tập hợp hồ sơ để mở ở ngân hàng truyền thống.' },
      { title: 'Dùng tài khoản cho chi tiêu hằng ngày', body: 'Có tài khoản và thẻ thì trả hoá đơn điện nước, internet, trừ tiền tự động và mua sắm thuận tiện. Nhà mạng và EAC thường cần số IBAN khi đăng ký trừ tiền tự động.' },
    ],
    sections: [
      { title: 'Nên mở sớm hay để sau', points: [
        'Mở sớm: luật sư làm một lần cùng bộ hồ sơ, có tài khoản ngay khi sang để chuyển tiền và trả hoá đơn.',
        'Để sau: không mất phí mở ngay, nhưng tự tập hợp giấy tờ lâu. Revolut sau khi có thẻ là cách nhanh nhất.',
      ]},
    ],
    tip: 'Đội ngũ phối hợp với luật sư để mở tài khoản cùng lúc với hồ sơ thẻ cư trú.',
    sources: [
      { label: 'Revolut', url: 'https://www.revolut.com' },
    ],
    checked: '14/10/2026',
  },
  {
    slug: 'sim-internet',
    title: 'Đăng ký SIM và internet',
    short: 'So sánh Cyta, Epic, Cablenet, Primetel; giấy tờ, nơi đăng ký, lịch lắp mạng.',
    image: '/img/guides/sim.jpg',
    intro: 'Síp có bốn nhà mạng chính: Cyta, Epic, Cablenet và Primetel. Cả bốn đều bán SIM điện thoại và internet tại nhà. Ở Paphos, cả bốn đều có cửa hàng trong Kings Avenue Mall, nên một buổi có thể hỏi hết.',
    steps: [
      { title: 'Mua SIM trả trước ngay khi tới', body: 'Từ tháng 12/2025, SIM trả trước bắt buộc đăng ký chính chủ. Người ngoài EU dùng hộ chiếu. Có thể đăng ký trong app hoặc web của nhà mạng (chụp hộ chiếu, chụp ảnh khuôn mặt) hoặc tại cửa hàng. Chỉ người từ 18 tuổi đứng tên được; SIM cho con đăng ký tại cửa hàng, con là người sử dụng.' },
      { title: 'Kiểm tra cáp quang tại đúng địa chỉ', body: 'Mỗi nhà mạng có công cụ kiểm tra vùng phủ trên web. Ở làng xa trung tâm, có nơi chưa có cáp quang. Khi đó dùng bộ phát 4G/5G cắm điện là chạy, ví dụ Cyta Mobile Internet Home, Epic HomeBox, Primetel Plug n Play.' },
      { title: 'Chuẩn bị giấy tờ ký hợp đồng', body: 'Thường cần hộ chiếu, giấy tờ chứng minh địa chỉ (hoá đơn điện nước hoặc hợp đồng thuê nhà) và giấy xác nhận số IBAN của ngân hàng nếu muốn trừ tiền tự động.' },
      { title: 'Ký hợp đồng tại cửa hàng hoặc trên web', body: 'Hợp đồng thường 12 hoặc 24 tháng. Hỏi rõ phí lắp đặt, phí kích hoạt, phí huỷ trước hạn và giá tăng hằng năm (Epic ghi giá tăng theo lạm phát mỗi 1/2).' },
      { title: 'Chờ thợ tới nhà lắp', body: 'Theo kinh nghiệm của đội ngũ ở Paphos, thường khoảng 1 tuần sau khi ký thì thợ tới lắp, mỗi lần lắp khoảng 30–60 phút. Primetel ghi hẹn lịch trong 10 ngày làm việc; Cyta ghi cáp quang có thể mất khoảng 2 tháng. Cablenet và Primetel có gói mạng tạm trong lúc chờ.' },
    ],
    sections: [
      { title: 'So sánh nhanh bốn nhà mạng', points: [
        'Cyta: nhà mạng nhà nước, lớn nhất. Cáp quang tới tận nhà đang mở rộng dần, 5G phủ toàn quốc theo Cyta công bố. Có gói trả trước soeasy (cả eSIM).',
        'Epic: mạng riêng, cáp quang tới 5 Gbps, có gói gộp Epic One (cáp quang + TV + di động). Không có giấy tờ thường trú thì gói Epic One cần đặt cọc 160 €.',
        'Cablenet: mạng cáp và cáp quang riêng, tới 1 Gbps. Có gói 12 tháng huỷ được khi báo trước 30 ngày và 30 ngày dùng thử. Ở Paphos chỉ có một cửa hàng tại Kings Avenue Mall.',
        'Primetel: cáp quang kèm TV, có gói tạm 20 Mbps trong ngày khi đăng ký tại cửa hàng. Có hỗ trợ tiếng Nga.',
        'Giá thay đổi theo khuyến mãi, xem trực tiếp trên web từng nhà mạng trước khi chọn.',
      ]},
      { title: 'Cửa hàng ở Paphos', points: [
        'Kings Avenue Mall (góc đường Apostolou Pavlou và Tombs of the Kings): có cả Cyta, Epic, Cablenet, Primetel.',
        'Cyta: thêm cửa hàng tại Neon Mall, 30 Dimokratias.',
        'Epic: thêm cửa hàng tại 55 Eleftheriou Venizelou.',
        'Primetel: thêm cửa hàng tại 17 Neofytou Nikolaidi.',
      ]},
      { title: 'Lưu ý', points: [
        'Người ngoài EU chưa có giấy thường trú: Cyta giới hạn hạn mức 150 € cho hợp đồng trả sau.',
        'Nhà chung cư: báo ban quản lý toà nhà trước ngày thợ tới lắp.',
      ]},
    ],
    tip: 'Đội ngũ có thể đi cùng gia đình tới cửa hàng và giải thích hợp đồng bằng tiếng Việt.',
    sources: [
      { label: 'Cyta: điều kiện ký hợp đồng', url: 'https://www.cyta.com.cy/faq-joining-cyta/en' },
      { label: 'Cyta: hỏi đáp cáp quang', url: 'https://www.cyta.com.cy/faq-fiber/en' },
      { label: 'Cyta: đăng ký SIM trả trước', url: 'https://www.cyta.com.cy/faq-soeasy-identification/en' },
      { label: 'Epic: Epic One', url: 'https://www.epic.com.cy/en/page/PiqIn4SrJ/epic-one' },
      { label: 'Epic: gói di động', url: 'https://www.epic.com.cy/en/page/H1Q5Ad3p/mobile-plans' },
      { label: 'Cablenet: internet tại nhà', url: 'https://cablenet.com.cy/en/internet/' },
      { label: 'Cablenet: đăng ký SIM trả trước', url: 'https://cablenet.com.cy/en/prepaid-registration/' },
      { label: 'Primetel: kích hoạt trong ngày', url: 'https://primetel.com.cy/same-day-activation' },
      { label: 'Primetel: cửa hàng', url: 'https://primetel.com.cy/locations' },
    ],
    checked: '14/10/2026',
  },
  {
    slug: 'dien',
    title: 'Đăng ký và thanh toán tiền điện',
    short: 'Chuyển tên công tơ EAC, tiền cọc khoảng 100 €, trả hoá đơn qua JCCsmart bằng thẻ Visa.',
    image: '/img/guides/dien.jpg',
    intro: 'Điện ở Síp do EAC (Electricity Authority of Cyprus) cung cấp. Khi dọn vào nhà thuê hoặc nhà mới mua, anh chị ký hợp đồng cung cấp điện đứng tên mình. Hợp đồng của người ở trước tự chấm dứt.',
    steps: [
      { title: 'Chuẩn bị giấy tờ', body: 'Hợp đồng thuê nhà, hợp đồng mua bán hoặc sổ đỏ; hộ chiếu; số công tơ hoặc bản chụp một hoá đơn cũ. Nếu người ở trước vẫn đứng tên, cần giấy đồng ý của họ; không liên lạc được thì ký tờ khai cam đoan là người ở mới.' },
      { title: 'Nộp tại văn phòng EAC hoặc trên mạng', body: 'Văn phòng EAC Paphos: 87 Eleftheriou Venizelou, ĐT 26 206000. Hoặc tạo tài khoản EAC Portal, đăng ký "EAC Supply Services" rồi gửi yêu cầu chuyển tên.' },
      { title: 'Đóng phí và tiền cọc', body: 'Phí chuyển tên 15 € + VAT. Tiền cọc theo kinh nghiệm của đội ngũ khoảng 100 €; mức cụ thể tuỳ trường hợp (chủ nhà hay người thuê), hỏi tổng đài 1818 nếu cần chắc chắn.' },
      { title: 'Nhận hoá đơn', body: 'Phần lớn hộ gia đình nhận hoá đơn mỗi 2 tháng, một số nhận hằng tháng. Có thể đăng ký nhận hoá đơn qua email. Nếu không gửi chỉ số công tơ đúng hạn, hoá đơn tính theo ước lượng.' },
      { title: 'Thanh toán hằng kỳ', body: 'Trả tại văn phòng EAC hoặc bưu điện; trả thẻ trên web hoặc app EAC; trả qua app ngân hàng; hoặc dùng app JCCsmart. Muốn trừ tự động thì đăng ký trừ tiền trực tiếp (SEPA) với EAC, mang hộ chiếu và giấy ghi số IBAN.' },
    ],
    sections: [
      { title: 'Trả tiền điện bằng JCCsmart', points: [
        'JCCsmart là app của JCC Payment Systems, trả được hoá đơn của hơn 800 đơn vị, lưu thẻ, dùng Apple Pay hoặc Google Pay, có nhắc hạn và biên lai điện tử.',
        'Tải app JCCsmart, tạo tài khoản, chọn EAC, nhập mã khách hàng (in trên hoá đơn điện) rồi thanh toán bằng thẻ Visa.',
        'Khách Bank of Cyprus trả được JCCsmart ngay trong app 1bank (Transfer & pay → Pay bills → Pay with JCC Smart).',
      ]},
      { title: 'Tiền nước', points: [
        'Nước ở Paphos do EOAP (Tổ chức chính quyền địa phương quận Paphos) quản lý, không phải EAC.',
        'Văn phòng EOAP Paphos: 22 Anexartisias (đối diện trường Kỹ thuật Paphos), ĐT 26 818202, mở 08:00–13:00. Có văn phòng ở Peyia và Polis.',
        'EOAP chưa đăng danh sách giấy tờ trên web. Thường cần hộ chiếu, hợp đồng thuê hoặc mua nhà, chỉ số công tơ; nên gọi trước.',
      ]},
      { title: 'Giờ mở cửa EAC Paphos', points: [
        'Mùa đông: thứ Hai–thứ Sáu 07:45–13:45, thêm chiều thứ Ba và thứ Năm 15:00–17:15.',
        'Mùa hè (tháng 6 đến đầu tháng 9): thứ Hai–thứ Sáu 07:45–13:45.',
        'Giờ có thể thay đổi, gọi 1818 để xác nhận.',
      ]},
    ],
    tip: 'Giữ hoá đơn điện nước đứng tên mình: đây là giấy tờ chứng minh địa chỉ dùng cho nhà mạng, trường học, GESY và bằng lái.',
    sources: [
      { label: 'EAC: chuyển tên hợp đồng điện', url: 'https://pilot.eac.com.cy/en/supply/for-the-house/applications/apply-for-transfer-of-service-change-of-tenant/' },
            { label: 'EAC: cách thanh toán', url: 'https://eac.com.cy/EN/RegulatedActivities/Supply/yourbill/Pages/PaymentMethods.aspx' },
      { label: 'EAC: văn phòng khách hàng', url: 'https://eac.com.cy/EN/ContactUs/Pages/CustomerServiceCenters.aspx' },
      { label: 'Bank of Cyprus: JCC Smart', url: 'https://www.bankofcyprus.com/en-gb/Personal/Digital_Channels/services/Transfers_Payments/jcc-smart-bill-payments' },
      { label: 'EOAP: văn phòng nước Paphos', url: 'https://eoap.org.cy/en/kentra-exipiretisis/' },
    ],
    checked: '14/10/2026',
  },
  {
    slug: 'truong-hoc',
    title: 'Đăng ký học cho con',
    short: 'Trường công theo địa chỉ nhà, giấy tờ, khi nào phải lên Sở Giáo dục Paphos, lớp tiếng Hy Lạp.',
    image: '/img/guides/truong.jpg',
    intro: 'Trường công ở Síp miễn phí và bắt buộc cho mọi trẻ sống ở Síp, không phụ thuộc quốc tịch. Trẻ học ở trường thuộc khu vực theo địa chỉ nhà. Trường tư tiếng Anh thì gia đình nộp hồ sơ thẳng với trường.',
    steps: [
      { title: 'Xác định cấp học theo tuổi', body: 'Tính theo tuổi trước ngày 1/9 của năm học. Lớp 1 tiểu học: đủ 6 tuổi. Mẫu giáo bắt buộc: năm học 2026–27 từ 4 tuổi 4 tháng (mốc này giảm dần qua các năm). Bộ Giáo dục có công cụ tra theo ngày sinh. Trẻ mới sang được xếp lớp theo tuổi.' },
      { title: 'Chuẩn bị giấy tờ', body: 'Giấy khai sinh hoặc thẻ cư trú ARC của con; hai giấy chứng minh địa chỉ (hoá đơn điện gần nhất và hoá đơn rác, người thuê nhà dùng hợp đồng thuê thay hoá đơn rác); sổ tiêm chủng; giấy xác nhận đang học hoặc học bạ trường cũ. Bản sao phải có xác nhận. Cấp 2, 3: giấy tờ không phải tiếng Hy Lạp hoặc tiếng Anh phải dịch và chứng thực.' },
      { title: 'Đến thẳng trường theo khu vực', body: 'Đăng ký mẫu giáo và tiểu học diễn ra vào tháng 1 cho năm học tháng 9. Cấp 2, 3 đăng ký tại trường thuộc khu vực nơi ở, hiệu trưởng nhập hồ sơ lên hệ thống.' },
      { title: 'Lên Sở Giáo dục Paphos khi cần', body: 'Sang Síp giữa năm học, quá hạn tháng 1, hoặc muốn học trường khác khu vực thì nộp đơn ở Sở Giáo dục quận Paphos (toà nhà D, khu văn phòng chính phủ mới, đường Neofytou Nikolaidi). Nhận giữa năm tuỳ trường còn chỗ.' },
      { title: 'Hỏi về lớp tiếng Hy Lạp', body: 'Năm 2026–27, mọi trường tiểu học dạy tiếng Hy Lạp như ngôn ngữ thứ hai cho trẻ mới sang. Cấp 2, 3 có lớp chuyển tiếp nhiều tiết tiếng Hy Lạp, tối đa 2 năm; trường gần nhà không có lớp thì xin chuyển sang trường có lớp.' },
    ],
    sections: [
      { title: 'Liên hệ Sở Giáo dục quận Paphos', points: [
        'Tiểu học, mẫu giáo: ĐT 26 804512 / 26 804513 / 26 804514, email dde-eparchiako-paf@schools.ac.cy.',
        'Trung học: ĐT 26 804516, email dme-eparchiako-paf@schools.ac.cy.',
      ]},
      { title: 'Trường tư tiếng Anh ở Paphos', points: [
        'Danh sách của Bộ Giáo dục (bản 2020) có: The International School of Paphos, Aspire, The Learning Centre (Peyia). Nên hỏi trường còn hoạt động và còn chỗ.',
        'Trường tư tự xét tuyển: thường cần hộ chiếu, giấy khai sinh của con, hộ chiếu bố mẹ, học bạ cũ, có thể có bài kiểm tra đầu vào và phỏng vấn.',
      ]},
      { title: 'Cần hỏi lại', points: [
        'Lịch đăng ký tháng 1/2027 chưa công bố.',
        'Giấy tờ nước ngoài có cần hợp pháp hoá lãnh sự (apostille) không: hỏi trường hoặc Sở.',
        'Trẻ từ trường nước ngoài vào cấp 2 có thể phải thi tiếng Hy Lạp và Lịch sử: hỏi Sở trung học Paphos.',
      ]},
    ],
    tip: 'Đội ngũ đi cùng gia đình khảo sát trường và làm thủ tục nhập học.',
    sources: [
      { label: 'Bộ Giáo dục: đăng ký tiểu học', url: 'https://moec.gov.cy/dde/en/infoserv_primary_registrations.html' },
      { label: 'Bộ Giáo dục: đăng ký mẫu giáo', url: 'https://moec.gov.cy/dde/en/infoserv_preprimary_registrations_ages_4_5.html' },
      { label: 'Bộ Giáo dục: tuổi đi học bắt buộc', url: 'https://moec.gov.cy/dde/en/starting-age-for-compulsory-education.html' },
      { label: 'Bộ Giáo dục: nhập học và xếp lớp', url: 'https://www.moec.gov.cy/dde/en/admission.html' },
      { label: 'Bộ Giáo dục: thông tin trung học', url: 'https://moec.gov.cy/dme/en/infoserv_secondary_general_information.html' },
      { label: 'Mẫu đơn trung học YPAN DMGE02', url: 'https://sch.cy/mc/489/entypo_ypan_dmge02_en.pdf' },
      { label: 'Thông tư tiếng Hy Lạp tiểu học 2026–27', url: 'https://enimerosi.moec.gov.cy/archeia/1/ypp20376a' },
      { label: 'Lớp chuyển tiếp trung học', url: 'https://enimerosi.moec.gov.cy/archeia/1/ypp20287c' },
      { label: 'Liên hệ Sở Giáo dục', url: 'https://www.moec.gov.cy/dde/en/contact.html' },
    ],
    checked: '14/10/2026',
  },
  {
    slug: 'bang-lai',
    title: 'Học và thi bằng lái xe',
    short: 'Đổi bằng lái quốc tế ở Việt Nam để lái 6 tháng đầu, trong lúc đó thi bằng Síp.',
    image: '/img/guides/lai_xe.jpg',
    intro: 'Việt Nam không có trong danh sách nước được đổi bằng lái sang bằng Síp, nên người Việt cư trú ở Síp phải thi bằng Síp. Cách đội ngũ thường làm: đổi bằng lái quốc tế ở Việt Nam trước khi sang, lái bằng quốc tế khoảng 6 tháng đầu, đủ thời gian học và thi bằng Síp hạng B (ô tô con) tại Sở Giao thông đường bộ (RTD).',
    steps: [
      { title: 'Đổi bằng lái quốc tế ở Việt Nam', body: 'Làm trước khi sang Síp, từ bằng lái Việt Nam còn hạn. Khi lái ở Síp mang theo cả bằng quốc tế, bằng Việt Nam và hộ chiếu. Theo kinh nghiệm của đội ngũ, bằng quốc tế dùng được khoảng 6 tháng đầu, đủ thời gian để thi bằng Síp.' },
      { title: 'Đủ điều kiện cư trú', body: 'Phải cư trú thường xuyên ở Síp, tức ít nhất 185 ngày mỗi năm. Người ngoài EU nộp bản gốc giấy cư trú và giấy tờ chứng minh đã ở 6 tháng trong năm qua (hoá đơn điện nước, sao kê ngân hàng 6 tháng, hợp đồng thuê, GESY, hoặc giấy xác nhận con đi học).' },
      { title: 'Thi sát hạch lý thuyết', body: 'Phải đậu bài thi sơ khảo (lệ phí 10 €) trước khi xin bằng tập lái. Ngôn ngữ bài thi chưa có trên trang chính thức; nên hỏi văn phòng sát hạch Paphos.' },
      { title: 'Xin bằng tập lái (mẫu TOM 7D)', body: 'Nộp tại RTD Paphos hoặc trung tâm dịch vụ công (KEP): đơn TOM 7D, 2 ảnh 45×35 mm, thẻ ARC, giấy đậu sơ khảo, giấy chứng minh cư trú. Lệ phí 20 €. Từ 17 tuổi rưỡi; bằng tập lái có hạn 1 năm.' },
      { title: 'Học trường lái', body: 'Luật quy định tối thiểu 10 giờ học lý thuyết và thực hành ở trường lái được cấp phép cho hạng B. Khi tập lái phải có biển "L", người đi kèm trên 25 tuổi có bằng ít nhất 5 năm, không chở thêm người, không chạy cao tốc trừ khi đi cùng thầy dạy lái.' },
      { title: 'Thi thực hành', body: 'Sớm nhất 21 ngày sau khi có bằng tập lái. Đặt lịch online tại rtd.mcw.gov.cy ngay khi có bằng tập lái vì luôn có danh sách chờ. Lệ phí 20 €. Trượt thì thi lại sau 1 tháng. Xe thi phải có biển "E" và bảo hiểm thi.' },
      { title: 'Nhận bằng chính thức', body: 'Nộp TOM 7D, 1 ảnh, giấy đậu và giấy chứng minh cư trú. Lệ phí 40 €. Bằng ô tô có hạn 15 năm; tên in theo hộ chiếu nên ghi đúng như hộ chiếu.' },
    ],
    sections: [
      { title: 'Lái xe bằng bằng quốc tế', points: [
        'Nên bắt đầu học và đặt lịch thi sớm, vì luôn có danh sách chờ thi thực hành và bằng quốc tế chỉ dùng được thời gian đầu.',
        'Khi thuê hoặc mua bảo hiểm xe, báo rõ đang lái bằng quốc tế để hợp đồng bảo hiểm ghi đúng.',
      ]},
      { title: 'Văn phòng RTD Paphos', points: [
        'Khu công nghiệp Mesogi, 8061 Paphos.',
        'Tiếp dân, hẹn lịch: 26 821351. Văn phòng sát hạch: 26 821341 / 26 821336 / 26 821356.',
      ]},
      { title: 'Cần hỏi lại', points: [
        'Bài thi lý thuyết có tiếng Anh không.',
        'Quy định 10 giờ học trường lái hiện có áp dụng cho hạng B không.',
        'Thời gian được lái bằng quốc tế sau khi đã có thẻ cư trú: hỏi RTD Paphos.',
      ]},
    ],
    tip: 'Xe ở Síp chạy bên trái và có nhiều vòng xuyến. Nên học thêm vài buổi với thầy trước khi thi.',
    sources: [
      { label: 'RTD: đổi bằng nước ngoài', url: 'https://www.mcw.gov.cy/mcw/RTD/rtd.nsf/All/AA805A89E5ED997BC225781C00296BCF?OpenDocument' },
      { label: 'Danh sách nước được đổi bằng (K.D.P. 5/2021)', url: 'https://www.cylaw.org/KDP/data/2021_1_5.pdf' },
      { label: 'RTD: bằng tập lái', url: 'https://www.mcw.gov.cy/mcw/RTD/rtd.nsf/All/FC83FE60D98AB629C225781C00298CCC?OpenDocument' },
      { label: 'RTD: lệ phí và đặt lịch thi (2026)', url: 'https://www.mcw.gov.cy/mcw/rtd/rtd.nsf/7c161abe8f987e5ec225776f002caa41/8024f5019790fa86c2258e0a003e7caf?OpenDocument' },
      { label: 'RTD: thông tư 9/2021 về cư trú', url: 'http://www.mcw.gov.cy/mcw/rtd/rtd.nsf/0/05e25a22a835d675c22586c40018b34a/$FILE/%CE%95%CE%B3%CE%BA.9.pdf' },
      { label: 'Luật bằng lái 94(I)/2001', url: 'https://www.cylaw.org/nomoi/enop/non-ind/2001_1_94/full.html' },
      { label: 'RTD: liên hệ', url: 'https://www.mcw.gov.cy/mcw/rtd/rtd.nsf/contact_en/contact_en?OpenDocument' },
    ],
    checked: '14/10/2026',
  },
  {
    slug: 'gesy',
    title: 'Đăng ký bảo hiểm y tế GESY',
    short: 'Đăng ký sau khoảng 12 tháng ở Síp; giấy tờ diện 6(2), đăng ký online, chọn bác sĩ gia đình.',
    image: '/img/guides/gesy.jpg',
    intro: 'GESY là hệ thống y tế toàn dân của Síp. Người ngoài EU có thẻ thường trú và sống thường xuyên ở Síp thuộc diện được tham gia; GESY có hướng dẫn giấy tờ riêng cho người có thẻ thường trú diện 6(2). Vì phải nộp hoá đơn điện nước liên tục 12 tháng, thực tế gia đình đăng ký được GESY sau khoảng 12 tháng sống ở Síp. Vợ/chồng và con cũng phải có thẻ thường trú.',
    steps: [
      { title: 'Có thẻ cư trú và số ARC', body: 'Phải có tên trong hệ thống Cục Đăng ký Dân sự và Di trú, có thẻ ARC và giấy cư trú còn hạn. Số ARC in trên giấy cư trú.' },
      { title: 'Chuẩn bị giấy tờ diện 6(2)', body: 'Hoá đơn điện nước liên tục 12 tháng (nên đứng tên mình ngay từ khi dọn vào nhà); hộ chiếu (chụp tất cả các trang); tờ khai ngày xuất nhập cảnh năm nay và năm trước; tờ khai thuế năm trước (nếu có); giấy xác nhận con đi học; giấy tờ chứng minh quan hệ gia đình. Giấy khai sinh, đăng ký kết hôn nước ngoài cần hợp pháp hoá và dịch sang tiếng Hy Lạp bởi người dịch có tuyên thệ ở Síp (trừ bản gốc tiếng Anh).' },
      { title: 'Tạo tài khoản và nộp đơn online', body: 'Tạo tài khoản tại registration.gesy.org.cy (cần email và số điện thoại riêng), kích hoạt, rồi đăng nhập portal.gesy.org.cy để nộp đơn và tải giấy tờ lên. Nếu hệ thống báo không khớp dữ liệu, in đơn gửi bưu điện kèm giấy tờ tới HIO.' },
      { title: 'Chọn bác sĩ gia đình', body: 'Đăng ký xong vẫn phải vào danh sách của một bác sĩ gia đình mới được khám. Tìm bác sĩ ở Paphos tại gesy.org.cy/provider-search (lọc theo quận, chuyên khoa, còn nhận bệnh nhân). Lần khám đầu ký "Form of Mutual Acceptance".' },
      { title: 'Đăng ký cho con', body: 'Trẻ dưới 15 tuổi đăng ký với bác sĩ nhi; 15–18 tuổi chọn bác sĩ nhi hoặc bác sĩ người lớn. Bố mẹ đăng ký trước thì hồ sơ của con tự liên kết với tài khoản bố mẹ.' },
    ],
    sections: [
      { title: 'Đóng góp và đồng chi trả', points: [
        'GESY không thu phí tham gia cố định. Đóng góp tính theo phần trăm thu nhập ở Síp (lương, lương hưu, tiền thuê...).',
        'Đồng chi trả: 1 € mỗi loại thuốc, 10 € mỗi lần cấp cứu, chụp chiếu hoặc khám chuyên gia y tế khác; khám chuyên khoa không có giấy giới thiệu 25 €. Nằm viện không đồng chi trả.',
        'Trần đồng chi trả mỗi năm: 75 € cho trẻ đến 21 tuổi, 150 € cho người khác. Mức phí có thể đã thay đổi, hỏi tổng đài 17000.',
      ]},
      { title: 'Lưu ý cho diện 6(2)', points: [
        'GESY kiểm tra việc sống thường xuyên ở Síp qua tờ khai xuất nhập cảnh, hộ chiếu và hoá đơn. Không có trang chính thức nào ghi số ngày tối thiểu.',
        'Theo kinh nghiệm làm hồ sơ, Cục Di trú vẫn yêu cầu bảo hiểm y tế tư nhân khi làm và gia hạn thẻ; GESY không thay được.',
      ]},
      { title: 'Liên hệ', points: [
        'Tổng đài GESY: 17000 (từ nước ngoài +357 22017000), thứ Hai–thứ Sáu 08:00–20:00, thứ Bảy 08:00–16:00.',
      ]},
    ],
    tip: 'Đội ngũ giúp gia đình chuẩn bị giấy tờ và nộp đơn GESY sau khi có thẻ cư trú.',
    sources: [
      { label: 'GESY: điều kiện tham gia', url: 'https://www.gesy.org.cy/en-us/hiobeneficiaryeligiblility' },
      { label: 'GESY: hỏi đáp điều kiện', url: 'https://www.gesy.org.cy/en-us/hiobeneficiarieseligibilityfaq' },
      { label: 'GESY: giấy tờ đăng ký (có diện 6(2))', url: 'https://www.gesy.org.cy/el-gr/announcementdef/documents-to-be-submitted-during-ghs-beneficiary-enrolment-6.pdf' },
      { label: 'GESY: quy trình đăng ký', url: 'https://www.gesy.org.cy/en-us/hiobeneficiaryenrollmentpro' },
      { label: 'GESY: đóng góp và đồng chi trả', url: 'https://www.gesy.org.cy/en-us/hiofinancing' },
      { label: 'GESY: tìm bác sĩ', url: 'https://www.gesy.org.cy/provider-search' },
      { label: 'GESY: biểu mẫu', url: 'https://www.gesy.org.cy/en-us/hiobeneficiariesforms' },
    ],
    checked: '14/10/2026',
  },
  {
    slug: 'kinh-doanh',
    title: 'Mở doanh nghiệp, kinh doanh',
    short: 'Diện 6(2) không được đi làm công; quy định mở công ty; ngành nghề tham khảo và giấy phép.',
    image: '/img/guides/kinh_doanh.jpg',
    intro: 'Nhiều gia đình muốn kinh doanh khi đã ổn định ở Síp. Điều cần nhớ đầu tiên: người có thẻ thường trú diện 6(2) và vợ/chồng đã cam kết không đi làm công ở Síp. Họ được làm chủ công ty, nhận cổ tức, nhưng công việc hằng ngày phải do nhân viên có quyền lao động đảm nhận.',
    steps: [
      { title: 'Hiểu giới hạn của diện 6(2)', body: 'Theo chính sách của Cục Di trú (sửa đổi 5/2023): người đứng đơn và vợ/chồng không làm bất kỳ hình thức lao động nào ở Síp, trừ làm giám đốc trong công ty mà họ đầu tư theo diện này. Với diện mua nhà, họ được làm cổ đông công ty ở Síp và giữ chức giám đốc không hưởng lương; cổ tức không ảnh hưởng thẻ thường trú.' },
      { title: 'Chọn ngành và kiểm tra giấy phép', body: 'Mỗi ngành có giấy phép riêng (xem phần ngành nghề bên dưới). Ngành cần chứng chỉ hành nghề như cắt tóc hay thẩm mỹ thì người trực tiếp làm phải có chứng chỉ, và chứng chỉ chủ yếu cấp cho công dân EU.' },
      { title: 'Đăng ký công ty TNHH (Ltd)', body: 'Xin duyệt tên tại Cơ quan Đăng ký Công ty (khoảng 10 €, 2–5 ngày làm việc). Luật sư hành nghề ở Síp soạn điều lệ (bắt buộc). Cần địa chỉ đăng ký ở Síp, ít nhất 1 giám đốc, 1 thư ký, 1 cổ đông. Không có vốn tối thiểu, thường để 1.000 €. Thường mất khoảng 2–3 tuần.' },
      { title: 'Đăng ký thuế và các nghĩa vụ', body: 'Đăng ký mã số thuế công ty; khai chủ sở hữu hưởng lợi (UBO). Đăng ký VAT khi doanh thu chịu thuế vượt 15.600 € trong 12 tháng. Có nhân viên thì đăng ký chủ sử dụng lao động với Bảo hiểm xã hội. Thuế thu nhập doanh nghiệp 15% từ 1/1/2026.' },
      { title: 'Duy trì hằng năm', body: 'Nộp báo cáo thường niên (mẫu HE32), kế toán và kiểm toán hằng năm. Phí duy trì 350 €/năm đã bỏ từ 2024. Công ty nhỏ (doanh thu dưới 300.000 € và tài sản dưới 500.000 € trong 2 năm liền) có thể làm soát xét thay kiểm toán đầy đủ.' },
    ],
    sections: [
      { title: 'Ngành nghề tham khảo', points: [
        'Nhà hàng, quán cà phê (F&B): cần giấy phép hoạt động của Thứ trưởng Bộ Du lịch (nộp trước khi mở ít nhất 1 tháng, xét tới 3 tháng, gia hạn hằng năm), giấy phép quy hoạch và xây dựng cho mục đích sử dụng, chứng nhận vệ sinh cơ sở; mỗi nhân viên chế biến thực phẩm có giấy chứng nhận sức khoẻ. Người ngoài EU đứng tên phải nộp giấy cư trú và giấy phép lao động, nên chủ diện 6(2) thường đứng sau qua công ty và thuê quản lý.',
        'Cắt tóc: tiệm phải có giấy phép của Hội đồng thợ cắt tóc (80 €) và do thợ có chứng chỉ hành nghề quản lý. Chứng chỉ chủ yếu cấp cho công dân EU, người ngoài EU xét ngoại lệ.',
        'Spa, nail, thẩm mỹ: chuyên viên thẩm mỹ phải đăng ký với Hội đồng thuộc Bộ Y tế (cần bằng chuyên ngành và 6 tháng thực tập, chủ yếu cho công dân EU). Quy định riêng cho tiệm nail, spa chưa có trên cổng thông tin chính thức, cần hỏi luật sư hoặc Bộ Y tế.',
        'Công ty công nghệ, kinh doanh online: không cần giấy phép ngành riêng (trừ tài chính, tiền mã hoá). Bán hàng online phải theo luật bảo vệ người tiêu dùng: quyền đổi ý 14 ngày, từ 6/2026 phải có nút "rút khỏi hợp đồng" trên web.',
      ]},
      { title: 'Lưu ý', points: [
        'Chủ diện 6(2) mua nhà không được tự đứng bếp, cắt tóc, làm nail cho khách vì đó là lao động. Cần thuê nhân viên có quyền làm việc ở Síp.',
        'Diện 6(2) đầu tư vào công ty (phương án C) có điều kiện riêng: góp 300.000 € vốn, công ty hoạt động thật ở Síp và có ít nhất 5 nhân viên.',
        'Quy định quán ăn, giải trí đang được sửa (luật mới năm 2026 có thể chuyển việc cấp phép về chính quyền địa phương). Hỏi lại trước khi thuê mặt bằng.',
        'Việc con cái của người diện 6(2) có được đi làm hay không, chính sách không nói rõ; hỏi luật sư.',
      ]},
    ],
    tip: 'Di Trú Síp có luật sư tư vấn và hỗ trợ: chọn hình thức công ty, xin giấy phép, kế toán và thuế, và kiểm tra để việc kinh doanh không ảnh hưởng thẻ thường trú.',
    sources: [
      { label: 'Cục Di trú: chính sách thường trú đầu tư (sửa đổi 2023)', url: 'https://moi.gov.cy/moi/CRMD/crmd.nsf/immigrationpfi_en/immigrationpfi_en' },
      { label: 'Cơ quan Đăng ký Công ty: luật sư soạn điều lệ', url: 'https://companies.gov.cy/en/business-entities/2-company/10-understanding/5-seeking-professional-advice' },
      { label: 'Cơ quan Đăng ký Công ty: tiêu chí đăng ký', url: 'https://www.companies.gov.cy/en/knowledgebase/tips-notes/main-criteria-of-review-for-registration-of-company' },
      { label: 'KPMG: cải cách thuế Síp 2026', url: 'https://kpmg.com/us/en/taxnewsflash/news/2026/01/tnf-cyprus-tax-reform-legislation-enacted-and-effective-january-1-2026.html' },
      { label: 'Bỏ phí duy trì 350 €/năm', url: 'https://www.sovereigngroup.com/news/cyprus-government-abolishes-the-e350-annual-levy-on-companies/' },
      { label: 'Cổng kinh doanh: nhà hàng, quán', url: 'https://www.businessincyprus.gov.cy/business-sectors/catering-and-entertainment-establishment/' },
      { label: 'Cổng kinh doanh: tiệm cắt tóc', url: 'https://www.businessincyprus.gov.cy/business-sectors/hairdresser-or-barber-shop/' },
      { label: 'Cổng kinh doanh: chuyên viên thẩm mỹ', url: 'https://www.businessincyprus.gov.cy/business-sectors/beautician/' },
      { label: 'Luật bảo vệ người tiêu dùng 30(I)/2026', url: 'https://www.oeb.org.cy/en/consumer-protection-amendment-law-of-2026-law-30i-2026/' },
    ],
    checked: '14/10/2026',
  },
];

export const guideBySlug = (slug?: string) => GUIDES.find(g => g.slug === slug);
