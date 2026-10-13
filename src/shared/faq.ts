// Hỏi đáp thường gặp. Chỉ dùng thông tin có nguồn; điều kiện cụ thể luôn dẫn về tư vấn.
export type Faq = { q: string; a: string; source: string; tag: 'Điều kiện' | 'Chi phí' | 'Gia đình' | 'Duy trì thẻ' | 'Dịch vụ' };

const AGP = 'AGP Law, sửa đổi quy định thường trú (05/2023)';
const DTS = 'Bảng dự toán Di Trú Síp 2026';
const KN = 'Ghi nhận của Di Trú Síp, cần đối chiếu Cục Đăng ký Dân sự và Di trú';

export const FAQ: Faq[] = [
  { tag: 'Điều kiện', q: 'Mức đầu tư tối thiểu để làm thẻ thường trú diện 6(2) là bao nhiêu?', a: 'Tối thiểu 300.000 € + VAT, mua nhà mới lần đầu từ chủ đầu tư. Khoản tiền phải có nguồn gốc hợp pháp và chuyển từ nước ngoài.', source: AGP },
  { tag: 'Điều kiện', q: 'Cần chứng minh thu nhập bao nhiêu?', a: 'Thu nhập ổn định từ nước ngoài: 50.000 €/năm cho người đứng đơn, thêm 15.000 € cho vợ/chồng và 10.000 € cho mỗi con đi cùng.', source: AGP },
  { tag: 'Chi phí', q: 'VAT 5% hay 19%?', a: 'Theo bảng dự toán của chúng tôi, mua để ở thường áp VAT 5%, mua cho thuê áp 19%. VAT 5% có điều kiện về diện tích và giá trị căn, và theo thông tin chúng tôi ghi nhận, chế độ chuyển tiếp hiện hành kết thúc 31/12/2026. Luật sư sẽ xác nhận mức VAT cho từng căn.', source: `${DTS}; Luật 42(I)/2023 (${KN})` },
  { tag: 'Chi phí', q: 'Ngoài giá nhà còn những chi phí nào?', a: 'Phí luật sư 1% giá mua (cộng VAT 19%), sinh trắc học, mở tài khoản ngân hàng, bảo hiểm y tế, phí nộp hồ sơ và cấp thẻ, hồ sơ tài chính và phí dịch vụ. Anh chị dùng mục Chi phí đầu tư để tính theo gia đình mình.', source: DTS },
  { tag: 'Chi phí', q: 'Mua nhà có phải đóng thuế tem (stamp duty) không?', a: 'Theo thông tin chúng tôi ghi nhận, thuế tem (stamp duty) trên hợp đồng đã bỏ từ 01/01/2026; luật sư sẽ xác nhận khi làm hồ sơ. Phí nộp hợp đồng tại Sở Địa chính vẫn còn, khoảng 100 €.', source: `${KN}; ${DTS}` },
  { tag: 'Gia đình', q: 'Con trên 18 tuổi có đi cùng được không?', a: 'Con 18–25 tuổi, chưa kết hôn, đang học đại học toàn thời gian và còn phụ thuộc cha mẹ có thể nộp hồ sơ riêng. Cha mẹ cần chứng minh thêm 10.000 €/năm cho mỗi con. Phí pháp lý và phí nộp hồ sơ khoảng 500 € mỗi khoản cho mỗi người.', source: `${AGP}; ${DTS}` },
  { tag: 'Gia đình', q: 'Ông bà, cha mẹ có đi kèm được không?', a: 'Từ sửa đổi năm 2023, cha mẹ không còn đi kèm làm người phụ thuộc trong diện này. Chúng tôi sẽ tư vấn hướng riêng nếu gia đình cần.', source: KN },
  { tag: 'Duy trì thẻ', q: 'Có thẻ rồi có cần ở Síp thường xuyên không?', a: 'Để duy trì thẻ, người có thẻ cần nhập cảnh Síp ít nhất một lần mỗi hai năm và giữ khoản đầu tư. Điều kiện cụ thể chúng tôi sẽ nhắc trong phần Hồ sơ của tôi.', source: KN },
  { tag: 'Duy trì thẻ', q: 'Síp có thuộc khối Schengen không?', a: 'Hiện Síp chưa thuộc Schengen. Quy định đi lại với thẻ cư trú Síp sang các nước Schengen anh chị hỏi chúng tôi theo trường hợp cụ thể.', source: KN },
  { tag: 'Điều kiện', q: 'Chương trình hộ chiếu đầu tư của Síp còn không?', a: 'Chương trình đầu tư lấy quốc tịch đã đóng năm 2020. Diện 6(2) hiện nay là thẻ thường trú, không phải quốc tịch.', source: KN },
  { tag: 'Dịch vụ', q: 'Phí dịch vụ của Di Trú Síp là bao nhiêu?', a: 'Trọn gói 10.000 € đến khi nhận thẻ PR: 50% khi ký hợp đồng, 50% khi có thư chấp thuận PR.', source: DTS },
  { tag: 'Dịch vụ', q: 'Khảo sát xong không mua thì sao?', a: 'Khoản đặt cọc (50% phí dịch vụ, trả khi ký hợp đồng) được hoàn lại sau khi trừ chi phí khảo sát thực tế đã phát sinh. Nếu anh chị đặt cọc dự án và làm hồ sơ, dịch vụ chuyển sang giai đoạn 3.', source: DTS },
];
