// ============================================================================
// HEALTH CONTENT DATABASE — BS Trần Văn Phúc
// 4 tính năng: Daily Tips, Meal Planner, Supplement Tracker, Quiz
// Nguồn: 10+ bài giảng BS Phúc (Modules 1-4 + 5 bài mới)
// ============================================================================

// ============================================================================
// 1. DAILY NOTIFICATIONS — "Tip Sức Khỏe Mỗi Ngày"
// 20 notifications, xoay vòng mỗi ngày
// ============================================================================

export interface DailyTip {
  id: number;
  icon: string;
  titleVi: string;
  bodyVi: string;
  categoryVi: string;
  module: 1 | 2 | 3 | 4;
}

export const DAILY_TIPS: DailyTip[] = [
  // --- Module 1: Vi chất nền tảng ---
  { id: 1, icon: '🌙', categoryVi: 'Vi chất', module: 1,
    titleVi: 'Đã uống Canxi tối nay chưa?',
    bodyVi: 'Lúc 2-3h sáng, tuyến cận giáp "trộm" Canxi từ xương ra máu. Uống Canxi lúc 9h tối (dưới 300mg/lần) để ngăn chặn! Xương bạn sẽ cảm ơn đấy.' },
  { id: 2, icon: '💊', categoryVi: 'Vi chất', module: 1,
    titleVi: 'Magie — viên thuốc chống đột quỵ ban đêm',
    bodyVi: '4 viên Magie Lactat trước khi ngủ = chống chuột rút, ngăn đột quỵ ban đêm, ngủ sâu hơn. Magie tham gia 6.000 phản ứng hóa học trong cơ thể — thiếu nó là thiếu tất cả!' },
  { id: 3, icon: '☀️', categoryVi: 'Vi chất', module: 1,
    titleVi: 'Vitamin D3 — "Hormone mặt trời" quyết định da đẹp',
    bodyVi: 'D3 là hormone steroid, không chỉ cho xương mà còn cho DA. Thiếu D3 → cholesterol dưới da không chuyển hóa → vi khuẩn bám vào gây mụn trứng cá. Mức lý tưởng: 50-70 ng/ml.' },
  { id: 4, icon: '🐟', categoryVi: 'Vi chất', module: 1,
    titleVi: 'Omega-3: DHA cho não, EPA cho tim — đừng nhầm!',
    bodyVi: 'Não dùng 97% DHA, tim cần EPA. ALA từ thực vật chỉ chuyển hóa <8% thành EPA và <5% thành DHA. Phải bổ sung trực tiếp EPA+DHA từ cá béo hoặc viên uống!' },
  { id: 5, icon: '🔩', categoryVi: 'Vi chất', module: 1,
    titleVi: 'Kẽm: Trạm xăng nam giới, Thẩm mỹ viện nữ giới',
    bodyVi: 'Kẽm tham gia 2.000 enzyme. Nam: cần cho tinh trùng, tuyến tiền liệt. Nữ: chống oxy hóa, trị mụn, mọc tóc. Thiếu kẽm → rụng tóc lan tỏa, miễn dịch suy giảm.' },

  // --- Module 2: Siêu thực phẩm & Giải mã tin đồn ---
  { id: 6, icon: '🥚', categoryVi: 'Siêu thực phẩm', module: 2,
    titleVi: 'Trứng luộc 5 phút = Siêu thực phẩm rẻ nhất!',
    bodyVi: 'Sôi 5 phút + ngâm 3 phút = hấp thu 98% protein. Trứng sống chỉ 30-50% + nguy cơ E.coli. Chiên/luộc quá kỹ: sắt + lưu huỳnh kết tủa thành chất độc (lòng đỏ xám xanh).' },
  { id: 7, icon: '🍅', categoryVi: 'Siêu thực phẩm', module: 2,
    titleVi: 'Cà chua: phải nấu chín, ăn cả vỏ và hạt!',
    bodyVi: 'Lycopene chống ung thư cực mạnh nhưng chỉ giải phóng khi NẤU CHÍN + dầu mỡ. Vỏ cà chua chứa 71% Lycopene — bỏ vỏ = bỏ phí! Trứng + cà chua = hạ mỡ máu tuyệt vời.' },
  { id: 8, icon: '🐔', categoryVi: 'Siêu thực phẩm', module: 2,
    titleVi: 'Ăn gà phải bỏ 3 bộ phận chứa độc!',
    bodyVi: 'Vứt ngay: (1) Phao câu — 90% hạch bạch huyết tích tụ độc tố, (2) Cổ & ngọn cánh — nhiều mầm bệnh, (3) Đầu gà — cholesterol cao. Phần còn lại ăn thoải mái!' },
  { id: 9, icon: '🥚', categoryVi: 'Giải mã tin đồn', module: 2,
    titleVi: 'Trứng giả KHÔNG tồn tại!',
    bodyVi: 'Vỏ trứng có 7.000 lỗ rỗng siêu nhỏ — công nghệ hiện tại không thể tạo vỏ trứng hoàn hảo không đường nối. "Trứng nhân tạo" ở Mỹ chỉ là protein đậu nành dạng lỏng cho người chay.' },
  { id: 10, icon: '🧂', categoryVi: 'Giải mã tin đồn', module: 2,
    titleVi: 'Bột ngọt KHÔNG gây ung thư!',
    bodyVi: 'MSG được lên men tự nhiên từ mía/sắn, FDA+WHO công nhận an toàn. Đun >120°C chỉ mất vị ngon, KHÔNG sinh chất ung thư. Nhưng coi chừng: 1/3 MSG là Natri (muối ẩn) — lạm dụng hại thận!' },

  // --- Module 3: Thiết kế bữa ăn ---
  { id: 11, icon: '🍠', categoryVi: 'Bữa ăn', module: 3,
    titleVi: 'Khoai lang > Gạo lứt > Cơm trắng > Cháo',
    bodyVi: 'GI: Khoai lang (44), Bún (46), Gạo lứt (53), Cơm trắng (73), Cháo (95!). Người tiểu đường tuyệt đối tránh cháo loãng. Khoai lang không Lectin, an toàn nhất.' },
  { id: 12, icon: '🍬', categoryVi: 'Bữa ăn', module: 3,
    titleVi: 'ĐƯỜNG gây nghiện như ma túy — 45 bệnh!',
    bodyVi: 'Đường kích thích Dopamine y hệt cocaine. 8.601 nghiên cứu: gây 18 bệnh nội tiết, 10 bệnh tim mạch, 7 loại ung thư. Giới hạn dưới 25g đường/ngày (= 6 muỗng cà phê)!' },
  { id: 13, icon: '🍯', categoryVi: 'Bữa ăn', module: 3,
    titleVi: 'Fructose (mật ong) nguy hiểm hơn đường mía!',
    bodyVi: 'Fructose oxy hóa cực mạnh, chuyển hóa trực tiếp ở gan → gan nhiễm mỡ, lão hóa da nhanh. Trái cây ăn nguyên quả (có chất xơ) thì OK. Mật ong, nước ép = đường tinh khiết đi thẳng vào gan!' },
  { id: 14, icon: '💊', categoryVi: 'Bữa ăn', module: 3,
    titleVi: 'Vitamin B, C: uống lúc ĐÓI. Vitamin A, D, E, K: uống SAU ĂN',
    bodyVi: 'Vitamin tan trong nước (B, C): uống đói, trước ăn sáng 30 phút — axit dạ dày giúp hấp thu. Vitamin tan dầu (A, D, E, K): sau bữa ăn có mỡ 30 phút để chất béo hòa tan.' },

  // --- Module 4: Lối sống ---
  { id: 15, icon: '💧', categoryVi: 'Lối sống', module: 4,
    titleVi: 'Nhìn nước tiểu để biết thiếu/thừa nước!',
    bodyVi: 'Vàng nhạt = đủ nước ✅. Đục/vàng đậm = thiếu, uống ngay! Trong vắt = thừa, giảm lại. Chỉ uống H2O tinh khiết — nước ép/nước lá tạo áp suất thẩm thấu khiến tế bào "khát" và tăng axit uric.' },
  { id: 16, icon: '🏃', categoryVi: 'Lối sống', module: 4,
    titleVi: 'TUYỆT ĐỐI không tập thể dục sáng sớm!',
    bodyVi: 'Sáng sớm: bụi mịn + CO2 cao nhất (cây thải ban đêm), miễn dịch yếu nhất, huyết áp dao động mạnh → nguy cơ đột quỵ! Thời điểm tốt nhất: CHIỀU TỐI. Nhịp tim tập: 130-140 nhịp/phút.' },
  { id: 17, icon: '🤸', categoryVi: 'Lối sống', module: 4,
    titleVi: 'Nhảy trampoline đốt 40% năng lượng hơn chạy bộ!',
    bodyVi: 'BS Phúc đặc biệt khuyên trampoline: kích hoạt toàn bộ tế bào, "xúc rửa" hệ bạch huyết. Vận động mới là cách số 1 rèn não — không phải chơi cờ hay học ngoại ngữ!' },
  { id: 18, icon: '💔', categoryVi: 'Lối sống', module: 4,
    titleVi: 'Tập quá sức = tự phá hủy cơ thể',
    bodyVi: 'Marathon hàng ngày → tiêu cơ vân → myoglobin tràn vào máu → suy thận cấp! Quỹ nhịp tim có hạn. Sau tập 15-30 phút, tim phải về nhịp bình thường. Sau 2h vẫn nhanh = hệ phanh tim đã hỏng.' },
  { id: 19, icon: '🧘', categoryVi: 'Lối sống', module: 4,
    titleVi: 'Stress làm cạn Magie → ung thư có cơ hội!',
    bodyVi: 'Căng thẳng, đố kỵ, tham lam cạn kiệt Magie → Lympho T sát thủ (miễn dịch) bị tiêu diệt → ung thư bùng phát. Thuốc (cả Đông+Tây y) bắt cơ thể xả Magie để giải độc. Sống "biết đủ"!' },
  { id: 20, icon: '🥚', categoryVi: 'Giải mã tin đồn', module: 2,
    titleVi: 'Ăn trứng KHÔNG gây sỏi mật!',
    bodyVi: 'Ngược lại: kiêng trứng → thiếu cholesterol → gan phải tự sản xuất quá tải → dư thừa → tạo sỏi! Trứng có trống KHÔNG bổ hơn, không chứa hormone sinh dục, còn dễ thối (H2S) hơn trứng thường.' },

  // --- 10 bài giảng mới ---
  { id: 21, icon: '🦀', categoryVi: 'Bữa ăn', module: 3,
    titleVi: 'Tế bào ung thư chỉ ăn ĐƯỜNG!',
    bodyVi: 'Tế bào bình thường dùng chất béo làm thức ăn chính. Tế bào ung thư mất khả năng này, ĐƯỜNG là nguồn thức ăn duy nhất. Cắt giảm carbohydrate = "bỏ đói" ung thư!' },
  { id: 22, icon: '🩸', categoryVi: 'Vi chất', module: 1,
    titleVi: 'LDL không hoàn toàn xấu — đừng sợ!',
    bodyVi: 'LDL là "con tàu" chuyên chở chất béo nuôi tế bào. LDL chỉ xấu (loại B) khi bị oxy hóa hoặc bị đường hóa (ăn nhiều ngọt). Tập trung: Triglyceride/HDL < 2.0 mới là chỉ số cần theo dõi!' },
  { id: 23, icon: '🍚', categoryVi: 'Bữa ăn', module: 3,
    titleVi: 'Gạo lứt 100% ≠ Lành mạnh!',
    bodyVi: 'Gạo lứt giàu chất xơ + B nhưng vỏ chứa Axit Phytic — ức chế hấp thu Canxi, Magie → đau khớp, sương mù não, mất ngủ. Phải ăn ĐAN XEN với gạo trắng, không ăn 100% lứt!' },
  { id: 24, icon: '🧈', categoryVi: 'Bữa ăn', module: 3,
    titleVi: 'Bỏ hoàn toàn mỡ lợn = SAI LẦM!',
    bodyVi: 'Chỉ dùng dầu thực vật → thừa Omega-6 → viêm tự miễn, xơ vữa, tiểu đường. Mỡ lợn bền nhiệt, phù hợp chiên rán. LUÂN PHIÊN: bữa mỡ lợn, bữa dầu thực vật, đổi loại dầu thường xuyên!' },
  { id: 25, icon: '🍊', categoryVi: 'Vi chất', module: 1,
    titleVi: 'Vitamin C: thợ dệt collagen + đốt mỡ!',
    bodyVi: 'C tạo collagen cho da-mạch-sụn, VẬN CHUYỂN mỡ vào ti thể đốt cháy (thiếu C = không giảm cân), tăng tốc bạch cầu diệt virus. Liều: 200-300mg/ngày, KHÔNG quá 1000mg. Chanh chỉ có 20mg — thua xa ổi, kiwi!' },
  { id: 26, icon: '🥤', categoryVi: 'Lối sống', module: 4,
    titleVi: 'Vi nhựa: kẻ giết người thầm lặng!',
    bodyVi: 'Nhựa số 3 (PVC) và số 6 (PS-xốp) chứa BPA bắt chước estrogen → rối loạn nội tiết, nữ hóa nam, ung thư. Đun sôi nước 5 phút "nhốt" 80% vi nhựa. Tránh hâm nóng đồ ăn trong màng bọc/hộp nhựa!' },
  { id: 27, icon: '🏃', categoryVi: 'Lối sống', module: 4,
    titleVi: 'ĐỪNG tập lúc đói → Gút!',
    bodyVi: 'Đói + tập = cơ thể tiêu hủy cơ Vân → sinh hypoxanthine + axit lactic → gan chuyển thành Axit Uric → GÚT! Ăn tinh bột trước 30 phút hoặc protein trước 2-3h. Sau tập PHẢI uống nước nhiều để đi tiểu thải uric.' },
  { id: 28, icon: '🍺', categoryVi: 'Lối sống', module: 4,
    titleVi: 'Mẹo sơ cứu ngộ độc rượu lậu!',
    bodyVi: 'Rượu quê/rượu tự nấu có thể chứa Methanol gây MÙ và TỬ VONG. Nếu chóng mặt + nhìn mờ/nhìn đôi: cho uống bia/rượu xịn (Ethanol) để cạnh tranh men gan, ngăn Methanol → Axit Formic. Gọi cấp cứu ngay!' },
  { id: 29, icon: '🍚', categoryVi: 'Giải mã tin đồn', module: 2,
    titleVi: 'GẠO NHỰA không tồn tại!',
    bodyVi: 'Nhựa đắt gấp 3-4 lần gạo — ai điên mà làm gạo nhựa! Clip trên mạng thực chất là máy ép cám gia cầm dạng viên hoặc xưởng mô hình thức ăn giả trưng bày nhà hàng Nhật. Mẹo: thêm 3-4ml giấm khi nấu cơm = dẻo, thơm, không thiu!' },
  { id: 30, icon: '💊', categoryVi: 'Vi chất', module: 1,
    titleVi: 'Canxi vô cơ vs hữu cơ: chọn đúng!',
    bodyVi: 'CaCO3 (vô cơ): rẻ, ít dị ứng nhưng ngấm kém, gây táo bón — PHẢI uống sau ăn để axit dạ dày hòa tan. Canxi hữu cơ (vỏ hàu): ngấm tốt hơn nhưng tá dược có thể gây ngứa/mề đay ở người dị ứng.' },

  // --- Chuyển hóa mỡ & Intermittent Fasting ---
  { id: 31, icon: '🔥', categoryVi: 'Bữa ăn', module: 3,
    titleVi: 'Insulin TĂNG = Không thể đốt mỡ!',
    bodyVi: 'Insulin ức chế enzyme phân hủy mỡ. Muốn đốt mỡ → giữ đường huyết ổn định: ưu tiên GI thấp (rau, thịt, khoai lang), tránh đường tinh luyện. ĐỪNG cắt hoàn toàn tinh bột (não + hồng cầu BẮT BUỘC cần đường)!' },
  { id: 32, icon: '🧈', categoryVi: 'Bữa ăn', module: 3,
    titleVi: 'Trans fat: kẻ ngụy trang đánh lừa cơ thể!',
    bodyVi: 'Chất béo chuyển hóa (Trans fat) trong bánh nướng/quy công nghiệp "ngụy trang" cấu trúc → cơ thể không nhận diện được → tích mỡ, bệnh mãn tính. Ưu tiên chất béo không bão hòa (dầu ô liu, cá biển sâu).' },
  { id: 33, icon: '🥚', categoryVi: 'Bữa ăn', module: 3,
    titleVi: 'Thiếu đạm = Mỡ quay về GAN!',
    bodyVi: 'Protein tạo Albumin — "phà" vận chuyển axit béo đến cơ bắp đốt cháy. Thiếu đạm → axit béo không có xe → quay về gan → GAN NHIỄM MỠ! Lòng đỏ trứng + đậu phụ chứa Lecithin hòa tan cholesterol.' },
  { id: 34, icon: '⏰', categoryVi: 'Bữa ăn', module: 3,
    titleVi: 'Nhịn ăn từng phần: nhịn Calo, KHÔNG nhịn Vi chất!',
    bodyVi: 'Sau 8-10h hết Glycogen → cơ thể chuyển sang đốt mỡ. Nhưng phải uống đủ nước + vi chất + vitamin! Nhịn sai cách = phá hủy cơ bắp + Albumin. Tuyến tụy được nghỉ → khắc phục kháng Insulin.' },
  { id: 35, icon: '💨', categoryVi: 'Lối sống', module: 4,
    titleVi: '84% mỡ thừa thải qua HƠI THỞ!',
    bodyVi: 'Mỡ đốt cháy → 84% thành CO2 (thở ra), 16% thành H2O (mồ hôi/nước tiểu). Tập thở cơ hoành, hít sâu thở dài = tăng oxy vào + đẩy CO2 ra = đốt mỡ hiệu quả hơn!' },
  { id: 36, icon: '☕', categoryVi: 'Lối sống', module: 4,
    titleVi: 'Cà phê đen trước tập = đốt mỡ x2!',
    bodyVi: '1 ly cà phê đen (KHÔNG đường) 30-60 phút trước tập. Cafein kích thích Adrenaline → enzyme phân hủy mỡ hoạt động mạnh + mạch máu mở rộng vận chuyển mỡ đi đốt.' },
  { id: 37, icon: '💊', categoryVi: 'Vi chất', module: 1,
    titleVi: 'Magie + B6 = Chìa khóa giảm mỡ máu + ngủ ngon!',
    bodyVi: 'Mg + B6 tổng hợp Lecithin (phân cắt mỡ vào tế bào đốt). Thiếu bộ đôi → mỡ lơ lửng trong máu! B6 còn là "radar" dẫn Mg đến bảo vệ Tim + Não. Mg+B6 → Serotonin + Melatonin → ngủ sâu.' },
  { id: 38, icon: '🏋️', categoryVi: 'Lối sống', module: 4,
    titleVi: 'Bí kíp: Kỵ khí trước → Hiếu khí sau!',
    bodyVi: 'Bước 1: Nâng tạ/chạy nước rút (kỵ khí) → hết đường + nhắc cơ thể giữ cơ. Bước 2: Chạy chậm/đi bộ 30-40 phút (hiếu khí) → cơ thể chuyển sang ĐỐT MỠ. Đây là vùng thời gian vàng!' },
  { id: 39, icon: '😴', categoryVi: 'Lối sống', module: 4,
    titleVi: 'Ngủ trước 11h đêm = hormone tăng trưởng đạt đỉnh!',
    bodyVi: '11h đêm - 3h sáng: hGH (hormone tăng trưởng) sửa chữa tế bào, điều phối nội tiết. Thức khuya qua 11h → phá hủy chu trình → suy chuyển hóa, tích mỡ. Đừng nhảy lên cân mỗi ngày — giảm mỡ tính bằng tháng!' },
  { id: 40, icon: '🍖', categoryVi: 'Giải mã tin đồn', module: 2,
    titleVi: 'Lòng già lợn: ít mỡ nhất trong nội tạng!',
    bodyVi: 'Lòng già (đại tràng) có tỷ lệ mỡ + cholesterol THẤP NHẤT so với dạ dày, lòng non. Ngược lại TRÁNH: óc lợn (cholesterol khổng lồ), móng giò, thịt cổ (hạch bạch huyết). Lẩu rất tốt cho người tỳ vị yếu — nhưng đừng ăn quá no!' },

  // --- Nước, Đạm, Chất béo, Rau, Sắt, B1, Probiotics ---
  { id: 41, icon: '💧', categoryVi: 'Bữa ăn', module: 3,
    titleVi: 'Uống nước SAI = biến nước thành chất độc!',
    bodyVi: 'Tế bào hấp thu nước qua kênh aquaporin. Uống từng ngụm nhỏ (<250ml/lần) để tránh hạ natri máu. Trà, cà phê, rượu bia = "nước giả" — tăng áp suất thẩm thấu, hút nước NGƯỢC từ tế bào ra → tế bào CÀng KHÁT!' },
  { id: 42, icon: '🥩', categoryVi: 'Bữa ăn', module: 3,
    titleVi: 'ĐỪNG chan canh khi ăn thịt!',
    bodyVi: 'Protein cần axit dạ dày (HCl) mạnh để tiêu hóa. Chan canh = loãng axit → protein không tiêu → biến thành "kháng nguyên" → viêm nhiễm + rò rỉ ruột. Ăn thịt/cá TRƯỚC, uống canh SAU bữa ăn 30 phút.' },
  { id: 43, icon: '🥥', categoryVi: 'Bữa ăn', module: 3,
    titleVi: 'Dầu dừa: đi thẳng vào tế bào, không qua gan!',
    bodyVi: 'Axit béo chuỗi trung bình (MCT) trong dầu dừa đi THẲNG vào niêm mạc ruột tạo năng lượng tức thì — không cần qua gan xử lý. Tỷ lệ Omega-6:3 lý tưởng = 1:1, tối đa 4:1. Hiện đại lên tới 20:1 → viêm nhiễm hàng loạt!' },
  { id: 44, icon: '🥬', categoryVi: 'Bữa ăn', module: 3,
    titleVi: 'Ngâm rau nước muối = ĐÚNG MÀ SAI!',
    bodyVi: 'Áp suất thẩm thấu ĐẨY thuốc trừ sâu NGƯỢC vào trong rau! Cách đúng: rửa dưới vòi nước chảy, rửa từng lá, gọt vỏ củ quả, chần qua nước sôi, hoặc để nơi thoáng gió cho thuốc bay hơi.' },
  { id: 45, icon: '🩸', categoryVi: 'Vi chất', module: 1,
    titleVi: 'Sắt: ĐỪNG tự ý bổ sung — có thể gây ung thư!',
    bodyVi: 'Sắt thừa → phản ứng Fenton → gốc tự do phá hủy tế bào → lão hóa + ung thư. PHẢI xét nghiệm (Ferritin, Transferrin) trước. TUYỆT ĐỐI không uống sắt khi đang viêm nhiễm/ung thư — cơ thể đang "vườn không nhà trống" bỏ đói vi khuẩn!' },
  { id: 46, icon: '⚡', categoryVi: 'Vi chất', module: 1,
    titleVi: 'Vitamin B1: ổ cắm điện khởi động năng lượng',
    bodyVi: 'B1 = "ổ cắm" khởi động chu trình đốt đường → ATP. Thiếu B1 → đường lên men → axit lactic → đau cơ, chuột rút, sương mù não. B1 sợ nhiệt + tia UV + kiềm. Thêm GIẤM khi nấu cơm = bảo toàn B1. Rượu bia phá hủy B1!' },
  { id: 47, icon: '🦠', categoryVi: 'Vi chất', module: 1,
    titleVi: 'Men vi sinh phải có "BÀO TỬ" mới sống sót!',
    bodyVi: 'Dạ dày pH 1.6-3.4 — siêu axit giết hết lợi khuẩn. Chỉ có bào tử (Spore) mới sống sót đến ruột. Kiểm tra nhãn: phải ghi "Bào tử/Spore". Liều 10-30 tỷ CFU hàng ngày. 100 tỷ CFU → chướng bụng do diệt hại khuẩn ồ ạt.' },
  { id: 48, icon: '🐟', categoryVi: 'Vi chất', module: 1,
    titleVi: 'Omega-3 rTG hấp thu GẤP ĐÔI dạng EE!',
    bodyVi: 'Chọn Omega-3 dạng rTG (Triglyceride tái tổ hợp) — hấp thu gấp nhiều lần dạng EE (Ethyl Ester). Tỷ lệ chữa bệnh: (EPA+DHA)/tổng chất béo ≥ 0.6 (60%). Mỡ máu: EPA > DHA. Não/mắt: DHA > EPA.' },
  { id: 49, icon: '🛡️', categoryVi: 'Vi chất', module: 1,
    titleVi: '7 vi chất vàng = "thuốc giảm đau tự nhiên"!',
    bodyVi: 'Bộ 7: Magie + Canxi + D3 + Vitamin tổng hợp + Vitamin C + Kẽm + Omega-3. Bộ ba Mg+Ca+D3 = "thuốc giảm đau" cho cả thể xác lẫn tinh thần. Thiếu 1 = cơ thể không thể tự chữa lành!' },
  { id: 50, icon: '😤', categoryVi: 'Lối sống', module: 4,
    titleVi: 'Sắp nổi giận? Uống nửa viên Magie!',
    bodyVi: 'Tức giận + sợ hãi tiêu tốn Magie KHỔNG LỒ → co giật, trầm cảm. Chủ động uống nửa viên Magie khi thấy sắp nổi giận. Sống theo C3H3: Clear head (minh mẫn) + Clever hands (khéo léo) + Clean habit (lành mạnh).' },

  // --- Trục Giáp-Ruột, Khẩu phần, B6, Cortisol, Nắng, Nước ---
  { id: 51, icon: '🍽️', categoryVi: 'Bữa ăn', module: 3,
    titleVi: 'Công thức đĩa ăn: 1/4 đạm + 1/4 tinh bột + 1/2 rau!',
    bodyVi: 'Tỷ lệ vàng: 1/4 đạm (thịt, cá, trứng) + 1/4 tinh bột (ngũ cốc, hạt) + 1/2 rau củ quả. 65-70% năng lượng từ nhóm này + 30-35% từ chất béo. Đơn giản, không cần đếm calo!' },
  { id: 52, icon: '🦋', categoryVi: 'Bữa ăn', module: 3,
    titleVi: 'Trục Giáp-Ruột: rò rỉ ruột → viêm tuyến giáp!',
    bodyVi: 'Quá nhiều đường/Fructose → loạn khuẩn ruột → rò rỉ ruột → Gluten (lúa mì) + Casein (sữa) lọt vào máu → miễn dịch tấn công NHẦM tuyến giáp = bệnh Hashimoto. Hạn chế đường + gluten = bảo vệ tuyến giáp!' },
  { id: 53, icon: '🥥', categoryVi: 'Bữa ăn', module: 3,
    titleVi: 'Dầu dừa: 87% béo bão hòa, KHÔNG có Omega-3!',
    bodyVi: 'Dầu dừa tốt cho nấu ăn nhiệt cao (bền) nhưng TRÁNH dùng làm nguồn Omega-3 vì không có! Dầu thực vật: CHỈ dưới 140°C, xào nhẹ/salad. Chiên rán → dùng MỠ LỢN. Luân phiên các loại dầu mỗi bữa.' },
  { id: 54, icon: '💊', categoryVi: 'Vi chất', module: 1,
    titleVi: 'Vitamin B6: 160 phản ứng + vỏ bọc thần kinh!',
    bodyVi: 'B6 tổng hợp protein, tạo vỏ Myelin thần kinh, giải quyết "bão cytokine" viêm nhiễm, sản sinh Serotonin + Dopamine (hạnh phúc). Tan trong nước → nạp hàng ngày. Bị phá hủy bởi ánh sáng + nhiệt nấu nướng.' },
  { id: 55, icon: '🥚', categoryVi: 'Siêu thực phẩm', module: 2,
    titleVi: 'Trứng cút: Lecithin gấp 3-4 lần trứng gà!',
    bodyVi: 'Trứng cút chứa Lecithin + Cephalin cao gấp 3-4 lần trứng gà — cực tốt cho não trẻ em. Người lớn: 1 quả gà/ngày hoặc 3-5 quả/tuần. Trứng luộc chín tới = 97% hấp thu. Chiên rán kỹ = biến tính protein!' },
  { id: 56, icon: '😰', categoryVi: 'Lối sống', module: 4,
    titleVi: 'Cortisol: kẻ cắp bình yên, tích mỡ bụng!',
    bodyVi: 'Stress mãn tính + thức khuya → Cortisol tăng → TIÊU HỦY cơ bắp + TÍCH MỠ bụng, mặt, gáy + ỨC CHẾ miễn dịch. Ngủ đủ giấc tự nhiên + thư thái = Cortisol hạ thấp ban đêm. Ngủ TRƯỚC 11h đêm!' },
  { id: 57, icon: '☀️', categoryVi: 'Lối sống', module: 4,
    titleVi: 'Tắm nắng ĐÚNG: 10h-16h, UVB KHÔNG xuyên kính!',
    bodyVi: 'UVB tổng hợp D3 chỉ có khi bóng râm ngắn hơn chiều cao (10h-16h). UVB KHÔNG xuyên cửa kính, quần áo, kem chống nắng! Tắm nắng qua cửa sổ = VÔ DỤNG. Phơi da trực tiếp 15-20 phút.' },
  { id: 58, icon: '💧', categoryVi: 'Lối sống', module: 4,
    titleVi: '2 thời điểm uống nước cứu mạng!',
    bodyVi: 'SÁNG THỨC DẬY: 1-2 cốc ngay — máu cô đặc sau đêm → ngừa tai biến, nhồi máu! TRƯỚC NGỦ: lượng vừa đủ chống cục máu đông ban đêm (đừng nhiều quá kẻo tiểu đêm). Tiêu chuẩn: ~2 lít/ngày.' },
  { id: 59, icon: '🏃', categoryVi: 'Lối sống', module: 4,
    titleVi: 'Tập quá mức = rò rỉ ruột!',
    bodyVi: 'Tập quá sức → ruột thiếu oxy → căng thẳng thần kinh → viêm + rò rỉ ruột. Tập VỪA SỨC + tăng tuần hoàn = cuốn trôi mảng bám mạch máu. 2-3 tiếng ngoài trời/ngày kích thích ngũ quan, chữa trầm cảm.' },
  { id: 60, icon: '🧠', categoryVi: 'Lối sống', module: 4,
    titleVi: 'Học Toán, Lý, Hóa = tập gym cho não!',
    bodyVi: 'Liên tục học kiến thức mới (Toán, Lý, Hóa, Văn, Lịch sử) = bài tập rèn não xuất sắc nhất. Não không dùng sẽ đình trệ → suy giảm trí nhớ → lú lẫn khi già. Đọc sách mỗi ngày = phòng Alzheimer!' },
];

/** Lấy tip cho ngày hôm nay (xoay vòng) */
export function getTodayTip(): DailyTip {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  return DAILY_TIPS[dayOfYear % DAILY_TIPS.length];
}

// ============================================================================
// 2. MEAL PLANNER — GI/GL & Khẩu Phần Bàn Tay
// ============================================================================

export interface HandRuleItem {
  icon: string;
  nameVi: string;
  unitVi: string;
  maleVi: string;
  femaleVi: string;
}

export const HAND_RULES: HandRuleItem[] = [
  { icon: '✊', nameVi: 'Tinh bột (cơm, khoai, bún)', unitVi: 'Nắm đấm',
    maleVi: '4-5 nắm/ngày', femaleVi: '3-4 nắm/ngày' },
  { icon: '🥬', nameVi: 'Rau củ & Hoa quả', unitVi: 'Nắm đấm',
    maleVi: '9 nắm (5 rau + 4 quả)', femaleVi: '7 nắm (4 rau + 3 quả)' },
  { icon: '🖐️', nameVi: 'Thịt / Cá / Protein', unitVi: 'Lòng bàn tay',
    maleVi: '2 lòng bàn tay/ngày', femaleVi: '2 lòng bàn tay/ngày' },
  { icon: '🥄', nameVi: 'Dầu mỡ', unitVi: 'Thìa cà phê',
    maleVi: 'Không quá 3 thìa/ngày', femaleVi: 'Không quá 3 thìa/ngày' },
];

export const HAND_RULE_NOTE =
  'Tinh bột 40-70% khẩu phần. Không cần cân tiểu ly — chỉ cần bàn tay bạn!';

export interface GiFoodItem {
  nameVi: string;
  gi: number;
  levelVi: string;
  levelColor: string;
  noteVi: string;
}

export const GI_FOOD_TABLE: GiFoodItem[] = [
  { nameVi: '🍠 Khoai lang luộc', gi: 44, levelVi: 'Thấp', levelColor: 'text-green-700 bg-green-50',
    noteVi: 'An toàn, không Lectin. Lựa chọn số 1 thay cơm trắng.' },
  { nameVi: '🍜 Bún tươi', gi: 46, levelVi: 'Thấp', levelColor: 'text-green-700 bg-green-50',
    noteVi: 'Đã lên men + nhiệt → an toàn hơn bánh mì.' },
  { nameVi: '🍚 Gạo lứt', gi: 53, levelVi: 'T.Bình', levelColor: 'text-amber-700 bg-amber-50',
    noteVi: 'Tốt hơn cơm trắng, nhưng vỏ cám chứa Lectin.' },
  { nameVi: '🍚 Cơm trắng', gi: 73, levelVi: 'Cao', levelColor: 'text-red-700 bg-red-50',
    noteVi: 'Tăng đường nhanh. Nếu ăn: giảm lượng, thêm rau + protein.' },
  { nameVi: '🍞 Bánh mì trắng', gi: 75, levelVi: 'Cao', levelColor: 'text-red-700 bg-red-50',
    noteVi: 'GI cao + lúa mì chứa WGA gây bệnh tự miễn khớp, tuyến giáp.' },
  { nameVi: '🥣 Cháo trắng', gi: 95, levelVi: 'Rất cao', levelColor: 'text-red-700 bg-red-50',
    noteVi: 'GI gần 100! Tiểu đường TUYỆT ĐỐI tránh cháo loãng.' },
];

export const GI_GL_GUIDE = {
  giTargetVi: 'Chọn GI < 55 (lý tưởng < 40)',
  glTargetVi: 'GL < 10 là an toàn',
  tipVi: 'GI = tốc độ đường vào máu. GL = tổng lượng đường thực tế.',
};

export const SUGAR_WARNING = {
  titleVi: '🍬 45 "Tội ác" của Đường',
  statsVi: '8.601 nghiên cứu: 18 bệnh nội tiết, 10 bệnh tim mạch, 7 loại ung thư',
  mechanismVi: 'Đường → không thành ATP → chuyển thành mỡ gan, eo + axit uric (Gút) + axit lactic (ung thư)',
  fructoseVi: 'Fructose (mật ong, nước ép) nguy hiểm hơn đường mía — đi thẳng vào gan gây gan nhiễm mỡ',
  limitVi: 'Giới hạn: < 25g đường/ngày (= 6 muỗng cà phê). 1 lon nước ngọt = 50g đường = VƯỢT 2 LẦN!',
  addictionVi: 'Đường kích thích Dopamine y hệt cocaine — gây nghiện thực sự',
};

export const VITAMIN_ABSORPTION_RULES = {
  waterSoluble: {
    vitamins: 'B, C',
    ruleVi: 'Uống lúc ĐÓI (trước ăn sáng 30 phút)',
    whyVi: 'Axit dạ dày lúc đói giúp hấp thu tốt nhất, không bị cạnh tranh với thức ăn',
    icon: '💧',
  },
  fatSoluble: {
    vitamins: 'A, D, E, K',
    ruleVi: 'Uống SAU bữa ăn có dầu mỡ (30 phút)',
    whyVi: 'Chất béo hòa tan vitamin → mới hấp thu vào cơ thể được',
    icon: '🧈',
  },
  mythBust: 'Hải sản + Vitamin C KHÔNG tạo thạch tín! Asen trong hải sản là asen hữu cơ, không phản ứng với Vitamin C.',
};

// ============================================================================
// 3. SUPPLEMENT TRACKER — Lịch Vi chất Chi tiết
// ============================================================================

export interface SupplementSlot {
  time: string;
  periodVi: string;
  icon: string;
  items: SupplementItem[];
  noteVi: string;
}

export interface SupplementItem {
  nameVi: string;
  dosageVi: string;
  colorClass: string;
}

export const SUPPLEMENT_SCHEDULE: SupplementSlot[] = [
  {
    time: '06:30', periodVi: 'Vừa thức dậy (đói)', icon: '🌅',
    items: [
      { nameVi: 'Magie Lactat', dosageVi: '1 viên', colorClass: 'bg-violet-100 text-violet-800' },
      { nameVi: 'Vitamin B+C', dosageVi: 'Theo liều', colorClass: 'bg-orange-100 text-orange-800' },
    ],
    noteVi: 'Vitamin B, C tan trong nước → uống lúc đói hấp thu tốt nhất. Magie 1 viên ngay khi dậy.',
  },
  {
    time: '07:30', periodVi: 'Sau bữa sáng (có dầu mỡ)', icon: '☀️',
    items: [
      { nameVi: 'Canxi (liều 1)', dosageVi: '≤300mg', colorClass: 'bg-blue-100 text-blue-800' },
      { nameVi: 'Vitamin D3', dosageVi: '2000-4000 IU', colorClass: 'bg-amber-100 text-amber-800' },
      { nameVi: 'Omega-3 (EPA+DHA)', dosageVi: '1 viên', colorClass: 'bg-cyan-100 text-cyan-800' },
    ],
    noteVi: 'Vitamin D, Omega-3 tan trong dầu → PHẢI ăn bữa có chất béo trước. Canxi chia nhỏ ≤300mg/lần.',
  },
  {
    time: '12:00', periodVi: 'Bữa trưa', icon: '☀️',
    items: [
      { nameVi: 'Kẽm (Zinc)', dosageVi: '15-30mg', colorClass: 'bg-emerald-100 text-emerald-800' },
      { nameVi: 'Magie Lactat', dosageVi: '2 viên', colorClass: 'bg-violet-100 text-violet-800' },
    ],
    noteVi: 'Kẽm CÁCH XA Canxi (khác bữa). Uống cùng protein để hấp thu. Magie 2 viên rải trong ngày.',
  },
  {
    time: '21:00', periodVi: 'Buổi tối (9h)', icon: '🌙',
    items: [
      { nameVi: 'Canxi (liều 2)', dosageVi: '≤300mg', colorClass: 'bg-blue-100 text-blue-800' },
    ],
    noteVi: 'QUAN TRỌNG NHẤT! Lúc 2-3h sáng tuyến cận giáp rút Canxi từ xương → liều tối ngăn chặn điều này.',
  },
  {
    time: '22:00', periodVi: 'Trước ngủ', icon: '😴',
    items: [
      { nameVi: 'Magie Lactat', dosageVi: '4 viên', colorClass: 'bg-violet-100 text-violet-800' },
      { nameVi: '(+Magie Oxide)', dosageVi: '1-1.5 viên', colorClass: 'bg-gray-100 text-gray-700' },
    ],
    noteVi: '4 viên Lactat + "độn" 1 viên Oxide nếu thức giấc 2-3h sáng. Oxide nhả chậm, kéo dài giấc ngủ. CÁCH Canxi ≥1h.',
  },
];

export const SUPPLEMENT_GOLDEN_RULE =
  'KHÔNG uống Canxi + Magie + Kẽm cùng lúc — chúng ức chế hấp thu lẫn nhau. Chia ra các bữa khác nhau!';

export interface MagnesiumType {
  nameVi: string;
  nicknameVi: string;
  useVi: string;
  whenVi: string;
  icon: string;
  dosageVi: string;
}

export const MAGNESIUM_TYPES: MagnesiumType[] = [
  { nameVi: 'Magie Lactat Dihydrate', nicknameVi: '"Cơm thịt" — loại chính', icon: '💜',
    useVi: 'Phổ biến, an toàn, sinh lý nhất',
    whenVi: '~8 viên/ngày (48mg Mg/viên). 4 viên trước ngủ + 1 viên sáng + rải trong ngày',
    dosageVi: '~400mg Mg nguyên tố/ngày' },
  { nameVi: 'Magie Oxide', nicknameVi: '"Ngô khoai sắn" — loại phụ', icon: '⚪',
    useVi: 'Hấp thu chỉ 4%, nhả chậm, nhuận tràng',
    whenVi: '"Độn" 1-1.5 viên trước ngủ nếu thức giấc 2-3h sáng. Trung hòa axit dạ dày, trị trào ngược',
    dosageVi: '1-1.5 viên/tối' },
  { nameVi: 'Magie Citrat', nicknameVi: 'Loại đợt trị liệu', icon: '🟢',
    useVi: 'Làm sạch ruột, trị trào ngược, táo bón',
    whenVi: 'Uống theo đợt 4-6 tuần, không uống liên tục',
    dosageVi: 'Theo chỉ dẫn' },
  { nameVi: 'Magie L-Threonate / Glycinate', nicknameVi: '"Đặc sản" — loại cao cấp', icon: '🧠',
    useVi: 'Vượt hàng rào máu não, đi thẳng vào não',
    whenVi: 'Cho người mất ngủ nặng, đau đầu, trầm cảm. Cải thiện trí nhớ',
    dosageVi: 'Theo chỉ dẫn' },
];

export const MAGNESIUM_DEEP = {
  totalReactions: 6000,
  dailyNeed: '400-600mg (ruột chỉ hấp thu ~20%)',
  consequences: [
    { icon: '⚡', titleVi: 'Mất năng lượng, béo phì', bodyVi: 'Mg đưa nhiên liệu vào ti thể tạo ATP. Thiếu → không đốt mỡ/đường → tích mỡ, mệt mỏi, tay chân lạnh.' },
    { icon: '🧠', titleVi: 'Đau đầu, mất ngủ, trầm cảm', bodyVi: 'Mg truyền tín hiệu thần kinh. Thiếu → đau nửa đầu (viêm dây thần kinh số 5), mất ngủ, run tay chân, ngón tay cò súng.' },
    { icon: '🦀', titleVi: 'Ung thư', bodyVi: 'Mg tổng hợp ADN/ARN. Thiếu → đột biến gen. Tế bào miễn dịch sát thủ cần Mg để diệt tế bào lạ — thiếu Mg, khối u bùng phát.' },
    { icon: '😰', titleVi: 'Thủ phạm ngốn Magie', bodyVi: 'Stress, cãi vã, sợ hãi, lạm dụng thuốc (cả Đông+Tây y) → cơ thể xả Mg giải độc → cạn kiệt nhanh.' },
  ],
};

export const OMEGA3_GUIDE = {
  familyVi: 'Omega-3 là MỘT HỌ: ALA (thực vật), EPA (tim mạch), DHA (não+mắt)',
  dhaVi: 'DHA: 22 carbon, 6 liên kết pi — "vàng" của não. Não dùng 97%, võng mạc 93%. Thiếu → teo não, Alzheimer.',
  epaVi: 'EPA: "chiếc chổi" quét mạch máu. Hạ mỡ máu, chống xơ vữa, điều hòa nhịp tim.',
  alaVi: 'ALA: từ hạt tía tô, óc chó, tảo. Chuyển hóa <8% thành EPA, <5% thành DHA → BỔ SUNG TRỰC TIẾP EPA+DHA!',
  ruleVi: 'Chọn: (EPA+DHA)/Tổng chất béo > 0.3',
  lipidVi: 'Mỡ máu cao: EPA > DHA. Bình thường: DHA ≥ EPA (tốt cho não).',
  codLiverVi: 'Dầu gan cá tuyết chủ yếu là Vitamin A, D — hàm lượng DHA rất thấp, đừng mua nếu cần DHA!',
};

export const ZINC_GUIDE = {
  totalEnzymes: 2000,
  femaleVi: '👩 Nữ giới: chống oxy hóa, tái tạo tế bào, trị mụn, mọc tóc. Suy giáp rụng tóc → bổ sung Kẽm phục hồi nhanh.',
  maleVi: '👨 Nam giới: Kẽm tập trung trong tinh dịch, tinh trùng. Thiếu → giảm chất lượng tinh trùng, nguy cơ ung thư tuyến tiền liệt.',
  gutVi: '🦠 Ruột: thiếu Kẽm → hại vi khuẩn tốt, gây rò rỉ ruột, suy miễn dịch.',
  kidneyVi: '🫘 Thận: Kẽm + Magie đánh tan cặp Canxi-Phosphat → chống xơ vữa, ngăn sỏi thận.',
};

export const VITAMIN_D3_GUIDE = {
  targetVi: 'Mức máu lý tưởng: 50-70 ng/ml',
  whatVi: 'D3 = hormone steroid quyết định miễn dịch + hấp thu xương + da đẹp',
  howVi: 'Phơi nắng 15 phút trước 9h + uống D3 cùng chất béo',
  skinVi: 'Cholesterol dưới da + UVA → tiền D3 → qua gan+thận → hormone D. Thiếu D3 → cholesterol đọng → vi khuẩn gây mụn.',
  diseaseVi: 'Thiếu D3 làm nặng: vẩy nến, chàm (eczema), mụn trứng cá viêm. D3 + Vitamin C = bộ đôi chống lão hóa da.',
  skinColorVi: 'Da trắng hấp thu D3 từ nắng nhanh (15 phút). Da nâu/đen có melanin cản UV → cần bổ sung D3 nhiều hơn.',
};

// ============================================================================
// 3b. EXERCISE RULES — "Đơn thuốc tập luyện"
// ============================================================================

export const EXERCISE_RULES = {
  heartRateZone: {
    idealVi: '130-140 nhịp/phút (70-80% max)',
    maxVi: 'KHÔNG vượt 160 nhịp/phút',
    recoveryVi: 'Sau 15-30 phút (chậm nhất 1h), tim phải về bình thường. Sau 2h vẫn nhanh = hệ phanh tim hỏng!',
  },
  bestTimeVi: 'CHIỀU TỐI là tốt nhất. Buổi sáng: bụi mịn cao, CO2 từ cây, miễn dịch yếu, huyết áp dao động → nguy cơ đột quỵ!',
  trampolineVi: 'BS Phúc đặc biệt khuyên trampoline: đốt 40% hơn chạy bộ, kích hoạt toàn bộ tế bào, xúc rửa hệ bạch huyết.',
  brainVi: 'Vận động = cách #1 rèn não (không phải cờ/ngoại ngữ). Tăng oxy não, giảm cortisol, tiết dopamine + endorphin.',
  dangerVi: 'Tập quá sức: cơ vân tiêu hủy → myoglobin tràn máu → suy thận. Quỹ nhịp tim CÓ HẠN — đừng phung phí!',
  preMealVi: 'ĐỪNG tập khi đói! Ăn tinh bột trước 30p hoặc protein trước 2-3h. Đói + tập → tiêu cơ vân → axit uric → GÚT!',
  postWaterVi: 'Sau tập PHẢI uống nhiều nước để đi tiểu. 80% Axit Uric thải qua nước tiểu, chỉ 20% qua mồ hôi.',
  anaerobicVi: 'Tập gắng sức (thở không kịp) = kỵ khí → sinh Axit Lactic → đau cơ, viêm mãn tính. Nên tập hiếu khí (vừa sức, hít thở sâu).',
  hiitBenefitVi: 'HIIT tăng hormone tăng trưởng (hGH) + mở cửa tế bào đón đường (chìa khóa thứ 2 ngoài Insulin) → giảm tiểu đường.',
  comboRuleVi: 'Bước 1: Kỵ khí (nâng tạ, chạy nước rút) → hết đường + giữ cơ. Bước 2: Hiếu khí 30-40 phút → đốt mỡ. Đây là combo vàng!',
  coffeeHackVi: 'Cà phê đen (không đường) 30-60p trước tập. Cafein → Adrenaline → enzyme phân hủy mỡ hoạt động + mạch máu mở rộng.',
  breathingVi: '84% mỡ thải qua hơi thở (CO2). Tập thở cơ hoành, hít sâu thở dài = đốt mỡ hiệu quả hơn!',
};

// ============================================================================
// 3g. FAT METABOLISM DEEP DIVE — Cơ chế đốt mỡ
// ============================================================================

export const FAT_METABOLISM = {
  krebs: {
    titleVi: '🔬 Chu trình Krebs — Nhà máy đốt mỡ',
    bodyVi: 'Mỡ đốt trong ti thể qua chu trình Krebs. Cần: Magie (biến axit béo → Acyl-CoA), Vitamin C (vận chuyển mỡ vào ti thể), Nước (nguyên liệu), Oxy (từ hít thở).',
  },
  insulin: {
    titleVi: '📊 Insulin — Kẻ khóa cửa đốt mỡ',
    bodyVi: 'Đường huyết tăng → Insulin tăng → ỨC CHẾ enzyme phân hủy mỡ. Giữ GI thấp + ăn đúng giờ = giữ Insulin thấp = đốt mỡ liên tục.',
  },
  albumin: {
    titleVi: '🚢 Albumin — Con phà chở mỡ đi đốt',
    bodyVi: 'Protein → Albumin. Axit béo PHẢI có Albumin mới đến được cơ bắp. Thiếu đạm → axit béo quay về gan → GAN NHIỄM MỠ.',
  },
  triglyceride: {
    titleVi: '🧈 Triglyceride — Dạng tồn tại của mỡ thừa',
    bodyVi: 'Mỡ dự trữ = Glycerol + 3 axit béo. Chất béo không bão hòa (cá, dầu ô liu) cấu trúc lỏng lẻo → dễ cắt nhỏ đốt cháy. Trans fat (bánh công nghiệp) ngụy trang → không đốt được → tích mỡ.',
  },
  lCarnitine: {
    titleVi: '🚀 L-Carnitine — Tàu vũ trụ chở mỡ vào ti thể',
    bodyVi: 'L-Carnitine chở axit béo vào ti thể. NHƯNG cơ thể bình thường tự tổng hợp rất tốt. Không cần mua TPCN đắt tiền nếu tài chính hạn hẹp.',
  },
};

// ============================================================================
// 3h. INTERMITTENT FASTING GUIDE
// ============================================================================

export const IF_GUIDE = {
  whatVi: 'Nhịn Calo nhưng VẪN NẠP đủ nước + vi chất + vitamin. Sau 8-10h hết glycogen → đốt mỡ.',
  benefitsVi: [
    'Tuyến tụy nghỉ ngơi → khắc phục kháng Insulin (gốc rễ tiểu đường tuýp 2)',
    'Giảm IGF-1 (yếu tố đột biến gen) → kích hoạt sửa DNA, chậm lão hóa',
    'Tăng BDNF (yếu tố dinh dưỡng thần kinh) → não khỏe hơn',
  ],
  rulesVi: [
    '✅ Uống nước lọc, vi chất, vitamin trong thời gian nhịn',
    '❌ TUYỆT ĐỐI không uống nước ép/nước ngọt (phá vỡ đốt mỡ)',
    '❌ Không nhịn kiểu cực đoan — cơ thể sẽ tích mỡ + phá hủy cơ',
    '✅ Ăn đủ đạm khi ăn lại để duy trì Albumin',
  ],
  emptyCaloVi: 'Tránh "Calo rỗng": nhiều đường/mỡ xấu/Natri nhưng nghèo vi chất (đồ chiên rán nhiều lần, thức ăn chế biến sẵn).',
};

// ============================================================================
// 3i. B6 + MAGNESIUM SYNERGY
// ============================================================================

export const B6_MG_SYNERGY = {
  titleVi: 'Magie + B6: Bộ đôi Vàng',
  roles: [
    { icon: '🧈', actionVi: 'Tổng hợp Lecithin', resultVi: 'Phân cắt mỡ → đưa vào tế bào đốt → giảm mỡ máu' },
    { icon: '😴', actionVi: 'Tạo Serotonin + Melatonin', resultVi: 'Ngủ sâu, giảm Cortisol (stress)' },
    { icon: '😊', actionVi: 'Tạo Dopamine', resultVi: 'Hormone hạnh phúc, chống trầm cảm' },
    { icon: '🎯', actionVi: 'B6 = "Radar"', resultVi: 'Ưu tiên dẫn Magie đến bảo vệ Tim và Não' },
  ],
  labelReadVi: 'Viên ghi "Magnesium Lactate Dihydrate 470mg" → Mg nguyên tố chỉ ~47mg. Vì vậy cần 6-8 viên/ngày = ~400mg Mg.',
};

// ============================================================================
// 3j. CALCIUM SELECTION GUIDE (Expanded)
// ============================================================================

export const CALCIUM_SELECTION = {
  excessAcid: {
    conditionVi: 'Thừa axit dạ dày (ợ nóng, trào ngược)',
    choiceVi: 'Canxi Carbonate (vô cơ, rẻ tiền)',
    whyVi: 'Cần axit để hòa tan → trung hòa bớt axit dạ dày. Uống SAU ĂN.',
  },
  lowAcid: {
    conditionVi: 'Thiếu axit (đầy bụng, khó tiêu), người già, phụ nữ có thai',
    choiceVi: 'Canxi Hữu cơ (Citrate, Lactate, Gluconate, Amino Acid)',
    whyVi: 'Hòa tan tốt KHÔNG cần axit. Canxi Citrate đặc biệt tốt cho người sỏi thận.',
  },
  ratioVi: 'Tỷ lệ vàng: 2 Canxi : 1 Magie. KHÔNG uống viên tích hợp — uống TÁCH RỜI, cách nhau ≥2 tiếng.',
  timingVi: '9h sáng + 9h tối (khi có axit dạ dày). Bổ sung thêm trước ngủ 40 phút.',
  avoidVi: 'Tránh Mg Oxide/Chloride nếu bụng yếu (hấp thu ~4%, gây tiêu chảy). Chỉ dùng cho người táo bón.',
};

// ============================================================================
// 3k. FOOD CHOICE INSIGHTS
// ============================================================================

export const FOOD_INSIGHTS = {
  organMeats: {
    safeVi: 'Lòng già (đại tràng): ít mỡ + cholesterol nhất trong nội tạng lợn',
    dangerVi: 'TRÁNH: óc lợn (cholesterol khổng lồ), móng giò, thịt cổ (hạch bạch huyết)',
    hotpotVi: 'Lẩu đa dạng rất tốt cho người tỳ vị yếu — nhiều loại dưỡng chất. Miễn không ăn quá no!',
  },
  cookingTipsVi: [
    'Rửa rau dưới vòi nước chảy. Trần rau từ nước lạnh đun lên → giòn, ngọt, giữ màu.',
    'Dùng muối biển thay muối tinh → thêm khoáng chất vi lượng tự nhiên.',
    'Không dùng nước ép/nước ngọt khi nhịn ăn — phá vỡ hoàn toàn quá trình đốt mỡ!',
  ],
  sleepGoldenVi: '11h đêm - 3h sáng: hGH đạt đỉnh sửa chữa tế bào. Thức khuya = phá hủy toàn bộ nội tiết!',
  karaokeWarningVi: 'Karaoke âm lượng lớn, gào thét quãng 8 → tăng áp lực lồng ngực → nổ phế nang! Nghe nhạc khí/giao hưởng để chữa lành.',
  mindfulEatingVi: '"Ăn mía ngược" — nhai kỹ, từ tốn giống cách ông bà gặm mía. Ăn chậm → enzyme tiêu hóa tăng → no lâu → bảo vệ tỳ vị.',
  warmBathVi: 'Tắm nước ấm (36-37°C) trước ngủ 30-45p → mạch máu giãn → hạ nhiệt → tuyến tùng tiết Melatonin → ngủ sâu. Phòng ngủ phải TỐI HOÀN TOÀN.',
  kegelVi: 'Tập cơ sàn chậu (Kegel) kích thích thần kinh phó giao cảm → tăng nhu động đại tràng → khắc phục táo bón mãn tính.',
  hiitFastingVi: 'HIIT lúc đói (trước bữa ăn): nhảy dây/leo cầu thang 5-7 hiệp → mở "cửa Insulin" + đốt mỡ + kích thích HGH. NHƯNG đừng kéo dài khi đói = tiêu cơ!',
  c3h3Vi: 'Công thức C3H3: Clear head (minh mẫn) + Clever hands (khéo léo) + Clean habit (lành mạnh) = bảo vệ cơ thể khỏi thế giới hóa chất.',
  mgAngerVi: 'Sắp nổi giận? Uống nửa viên Magie! Giận dữ + sợ hãi tiêu tốn Magie khổng lồ → co giật, trầm cảm.',
};

// ============================================================================
// 3l. WATER GUIDE — Uống nước đúng khoa học
// ============================================================================

export const WATER_GUIDE = {
  aquaporinVi: 'Tế bào hấp thu nước qua kênh protein aquaporin trên màng tế bào. Chỉ NƯỚC LỌC TINH KHIẾT mới đi qua được.',
  ruleVi: 'Uống từng ngụm nhỏ (<250ml/lần) để tránh hạ natri máu đột ngột.',
  fakeWaterVi: 'Trà, cà phê, rượu bia, nước ép = "nước giả". Đường/cồn/cafein tăng áp lực thẩm thấu → hút nước NGƯỢC từ tế bào → càng khát → đi tiểu nhiều.',
  krebsVi: 'Nước = nguyên liệu BẮT BUỘC cho chu trình Krebs đốt mỡ. Thiếu nước = không đốt được mỡ!',
  urineVi: 'Vàng nhạt = đủ ✅. Đục/vàng đậm = thiếu, uống ngay! Trong vắt = thừa, giảm lại.',
};

// ============================================================================
// 3m. PROTEIN GUIDE — Ăn đạm đúng cách
// ============================================================================

export const PROTEIN_GUIDE = {
  digestionVi: 'Protein là cơ chất khó tiêu nhất — cần axit dạ dày (HCl) + enzyme mạnh. Ăn quá nhiều đạm 1 lúc hoặc chan canh = loãng axit → protein không tiêu → "kháng nguyên" → viêm + rò rỉ ruột.',
  superSourcesVi: 'Trứng (đặc biệt trứng cút) + Đậu phụ: đủ 20 axit amin thiết yếu (đặc biệt Lysine), tỷ lệ hấp thu cực cao.',
  albuminVi: 'Protein → Albumin = "phà" vận chuyển axit béo, hormone, khoáng chất. Thiếu đạm → axit béo quay về gan → GAN NHIỄM MỠ.',
  lectinWarningVi: 'Bột mì (gluten) + đậu đỗ = nhiều Lectin gây viêm mãn. Đậu: BỎ VỎ + ngâm kỹ + nấu NỒI ÁP SUẤT.',
  noSoupVi: 'Ăn thịt/cá TRƯỚC. Uống canh/nước SAU bữa ăn 30 phút. ĐỪNG chan canh khi ăn!',
};

// ============================================================================
// 3n. IRON GUIDE — Sắt: "Vàng đen" nguy hiểm
// ============================================================================

export const IRON_GUIDE = {
  roleVi: 'Sắt tạo hồng cầu (hemoglobin) + sản xuất ATP. Là "vàng đen" của cơ thể.',
  dangerVi: 'Sắt thừa → phản ứng Fenton → gốc tự do → phá hủy tế bào → lão hóa + ung thư.',
  testFirstVi: 'TUYỆT ĐỐI không tự ý bổ sung. Xét nghiệm: Ferritin, Transferrin, TIBC, Sắt huyết thanh.',
  warfareVi: 'Khi viêm nhiễm/ung thư: cơ thể khóa hấp thu sắt ("vườn không nhà trống") để bỏ đói vi khuẩn + tế bào ung thư. Uống sắt lúc này = TIẾP TAY CHO GIẶC!',
};

// ============================================================================
// 3o. VITAMIN B1 GUIDE
// ============================================================================

export const B1_GUIDE = {
  roleVi: 'B1 (Thiamin) = "ổ cắm điện" khởi động chu trình đốt đường → ATP.',
  deficiencyVi: 'Thiếu B1 → đường lên men → axit lactic → đau mỏi cơ, chuột rút, sương mù não.',
  enemiesVi: 'B1 sợ: nhiệt độ cao, tia UV, môi trường kiềm (baking soda). Rượu bia ức chế trực tiếp hấp thu + hoạt hóa B1.',
  protectVi: 'Thêm GIẤM (axit) khi nấu cơm/ngũ cốc = bảo toàn B1 ở nhiệt độ cao.',
};

// ============================================================================
// 3p. PROBIOTICS GUIDE
// ============================================================================

export const PROBIOTICS_GUIDE = {
  gutVi: 'Ruột chứa 3kg vi khuẩn, quyết định 80% hệ miễn dịch.',
  sporeMustVi: 'Dạ dày pH 1.6-3.4 = siêu axit. Chỉ BÀO TỬ (Spore) mới sống sót xuống ruột. Kiểm tra nhãn: "Bào tử" hoặc "Spore".',
  dosageVi: 'Hàng ngày: 10-30 tỷ CFU. KHÔNG dùng 100 tỷ+ CFU → diệt hại khuẩn ồ ạt → sinh độc tố → chướng bụng.',
  fiberVi: 'Ăn rau củ quả nguyên bản (chất xơ) = nuôi lợi khuẩn ruột. Ép nước = mất chất xơ = bỏ đói lợi khuẩn!',
};

// ============================================================================
// 3q. OMEGA-3 SELECTION GUIDE (Expanded)
// ============================================================================

export const OMEGA3_SELECTION = {
  formsVi: {
    rTG: 'rTG (Triglyceride tái tổ hợp): hấp thu GẤP ĐÔI dạng EE — ưu tiên chọn!',
    EE: 'EE (Ethyl Ester): phổ biến, rẻ hơn nhưng hấp thu kém.',
  },
  ratioVi: 'Tỷ lệ chữa bệnh: (EPA+DHA)/tổng chất béo ≥ 0.6 (60%). Bảo vệ: ≥ 0.3 (30%).',
  personalizeVi: {
    lipid: 'Mỡ máu, gan nhiễm mỡ: chọn EPA > DHA (EPA "quét" mạch máu)',
    brain: 'Phát triển não, mắt, người khỏe: Dọn DHA ≥ EPA (DHA vượt hàng rào máu não)',
  },
  omegaRatioVi: 'Omega-6:Omega-3 lý tưởng = 1:1, tối đa 4:1. Hiện đại = 20:1 → viêm nhiễm hàng loạt!',
  coconutOilVi: 'Dầu dừa: MCT (axit béo chuỗi trung bình) → đi thẳng vào tế bào niêm mạc ruột → năng lượng tức thì, không qua gan.',
  coconutWarningVi: 'Dầu dừa: 87% béo bão hòa, KHÔNG có Omega-3. Tốt cho nấu nhiệt cao nhưng KHÔNG phải nguồn Omega-3!',
};

// ============================================================================
// 3r. THYROID-GUT AXIS
// ============================================================================

export const THYROID_GUT_AXIS = {
  titleVi: '🦋 Trục Giáp-Ruột: Bảo vệ ruột = Bảo vệ tuyến giáp',
  mechanismVi: 'Quá nhiều đường (đặc biệt Fructose) → loạn khuẩn ruột → HỘI CHỨNG RÒ RỈ RUỘT → Gluten (lúa mì) + Casein (sữa) lọt vào máu → miễn dịch tấn công NHẦM tuyến giáp.',
  diseaseVi: 'Kết quả: Viêm tuyến giáp tự miễn Hashimoto — bệnh tuyến giáp phổ biến nhất.',
  preventionVi: [
    'Hạn chế đường, đặc biệt Fructose (mật ong, nước ép)',
    'Giảm Gluten (bánh mì lúa mì, mì ống)',
    'Giảm Casein (sữa bò) nếu có triệu chứng',
    'Bổ sung Probiotics bào tử nuôi dưỡng ruột',
    'Ăn rau nguyên bản (chất xơ nuôi vi khuẩn tốt)',
  ],
};

// ============================================================================
// 3s. MEAL PLATE RATIO
// ============================================================================

export const MEAL_PLATE_RATIO = {
  ratioVi: '1/4 đạm + 1/4 tinh bột + 1/2 rau củ quả',
  energyVi: '65-70% năng lượng từ thực phẩm + 30-35% từ chất béo',
  proteinSourcesVi: 'Thịt nạc, cá, tôm, trứng, đậu phụ',
  starchSourcesVi: 'Ngũ cốc, các loại hạt, khoai lang, bún',
  veggieSourcesVi: 'Rau lá xanh, cà rốt, cà chua, bông cải, trái cây nguyên quả',
};

// ============================================================================
// 3t. B6 DEEP DIVE
// ============================================================================

export const B6_GUIDE = {
  reactionsCount: 160,
  roles: [
    { icon: '🧬', titleVi: 'Tổng hợp protein', bodyVi: 'Giúp cơ thể tạo protein từ axit amin.' },
    { icon: '🧠', titleVi: 'Tạo vỏ Myelin', bodyVi: 'Bọc bảo vệ dây thần kinh. Thiếu B6 → tê bì, đau dây thần kinh.' },
    { icon: '🔥', titleVi: 'Giải "bão cytokine"', bodyVi: 'Kiểm soát phản ứng viêm quá mức khi nhiễm trùng.' },
    { icon: '😊', titleVi: 'Sản sinh hormone hạnh phúc', bodyVi: 'Tạo Serotonin (bình yên) + Dopamine (hạnh phúc).' },
  ],
  enemiesVi: 'B6 tan trong nước, bị phá hủy bởi: ánh sáng + nhiệt nấu nướng. Cần nạp hàng ngày.',
  synergyVi: 'B6 là "radar" dẫn Magie đến bảo vệ Tim và Não. Mg + B6 → Lecithin → phân cắt mỡ.',
};

// ============================================================================
// 3u. CORTISOL GUIDE
// ============================================================================

export const CORTISOL_GUIDE = {
  titleVi: '😰 Cortisol — Kẻ cắp Bình yên',
  triggersVi: 'Stress mãn tính, thức khuya, tiếp xúc hóa chất',
  damageVi: [
    '💪 Tiêu hủy cơ bắp (phá đạm để tạo đường)',
    '🫃 Tích mỡ bụng, mặt, gáy (dự trữ năng lượng)',
    '🛡️ Ức chế hệ miễn dịch',
  ],
  solutionVi: 'Ngủ đủ giấc (trước 11h) + thư thái + hạn chế hóa chất = Cortisol hạ thấp ban đêm. Uống Magie giúp kiểm soát Cortisol.',
};

// ============================================================================
// 3v. SUNBATH GUIDE
// ============================================================================

export const SUNBATH_GUIDE = {
  timeVi: '10h sáng - 4h chiều (bóng râm < chiều cao)',
  durationVi: '15-20 phút phơi da trực tiếp',
  rulesVi: [
    'UVB KHÔNG xuyên qua: cửa kính, quần áo, kem chống nắng',
    'Tắm nắng qua cửa sổ = VÔ DỤNG',
    'Phải phơi da trực tiếp (tay, chân, mặt)',
  ],
  comboVi: 'Vitamin D3 + Vitamin C = bộ đôi chống lão hóa da, dưỡng ẩm, giảm melanin, tăng collagen.',
};

// ============================================================================
// 3w. SUPPLEMENT TIMING (Expanded)
// ============================================================================

export const SUPPLEMENT_TIMING_RULES = {
  cafeineVi: 'Vitamin B, C tan trong nước: uống CÁCH giờ uống cà phê ít nhất 1 tiếng (cafein lợi tiểu đào thải mất).',
  calciumMealVi: 'Canxi: uống SAU ĂN 30 phút (dịch vị axit hòa tan). Đặc biệt uống TRƯỚC NGỦ ngăn tuyến cận giáp rút Ca từ xương lúc 3h sáng.',
  separationVi: 'Canxi ↔ Magie: cách nhau 2 tiếng. Canxi ↔ Kẽm: cách nhau.',
  morningWaterVi: 'Sáng thức dậy: 1-2 cốc nước TRƯỚC KHI uống vi chất. Máu đang cô đặc nhất!',
};

// 3c. VITAMIN C DEEP DIVE
// ============================================================================

export const VITAMIN_C_GUIDE = {
  roles: [
    { icon: '🧶', titleVi: 'Thợ dệt Collagen', bodyVi: 'Đan kết sợi collagen tạo sức bền cho thành mạch, sụn khớp, da. Thiếu C → chảy máu chân răng, bầm tím, da nhăn.' },
    { icon: '🔥', titleVi: 'Đốt mỡ giảm cân', bodyVi: 'C vận chuyển mỡ (Lipid) vào ti thể đốt cháy → năng lượng. Thiếu C = không thể tiêu hủy tế bào mỡ!' },
    { icon: '🛡️', titleVi: 'Tăng đề kháng', bodyVi: 'C chui vào ti thể bạch cầu, tăng tốc di chuyển, tạo electron "bom nguyên tử" tiêu diệt virus, vi khuẩn.' },
  ],
  dosageVi: '200-300mg/ngày. KHÔNG quá 1000mg (biến C thành chất oxy hóa ngược!).',
  lemonMythVi: 'Nước cốt chanh chỉ có ~20mg Vitamin C/100g — thua xa ớt chuông (200mg), ổi, kiwi. Chữa ung thư/sỏi thận bằng chanh = TIN ĐỒN.',
  topSources: ['Ớt chuông (200mg)', 'Ổi (228mg)', 'Kiwi (93mg)', 'Bông cải xanh (89mg)', 'Cam (53mg)', 'Chanh (20mg 😅)'],
};

// ============================================================================
// 3d. RICE GUIDE — Cách chọn gạo
// ============================================================================

export const RICE_GUIDE = {
  types: [
    { nameVi: 'Gạo Indica (hạt dài, trong)', icon: '🍚',
      descVi: 'Nhiều tinh bột (Amylose), tơi xốp, dễ tiêu. Tăng đường huyết nhanh.',
      useVi: 'Bún, phở, bánh cuốn, cơm rang, cháo cho người ốm cần năng lượng nhanh.' },
    { nameVi: 'Gạo Japonica (hạt ngắn, dẻo)', icon: '🍙',
      descVi: 'Nhiều Amylopectin, khó tiêu hơn, giàu axit amin thiết yếu.',
      useVi: 'Nấu cháo cho người khỏe rất bổ dưỡng. Cơm sushi, cơm nắm.' },
    { nameVi: 'Gạo lứt / Ngũ cốc nguyên cám', icon: '🌾',
      descVi: 'Giàu xơ + Vitamin B, no lâu, ổn định đường huyết.',
      useVi: 'KHÔNG ăn 100% dài hạn! Axit Phytic ức chế Canxi/Magie. Ăn đan xen gạo trắng.' },
  ],
  cookingTipVi: 'Thêm 3-4ml giấm khi nấu → cơm dẻo, thơm, không thiu. Hành hoa tươi khử mùi khê. Không vo gạo nước nóng (mất vitamin).',
  sugarRiceMythVi: 'Nồi cơm điện "tách đường" = lãng phí vitamin B và dưỡng chất trong nước bọt cơm, KHÔNG giúp giảm đường huyết đáng kể.',
  plasticRiceMythVi: 'Gạo nhựa KHÔNG TỒN TẠI. Nhựa đắt gấp 3-4 lần gạo. Clip trên mạng = máy ép cám gia cầm hoặc mô hình trưng bày.',
};

// ============================================================================
// 3e. LDL & LIPID GUIDE
// ============================================================================

export const LIPID_GUIDE = {
  ldlTruthVi: 'LDL = "con tàu" chuyên chở dinh dưỡng, KHÔNG hoàn toàn xấu. LDL chỉ xấu (loại B) khi bị oxy hóa hoặc đường hóa (Glycosin).',
  goldenRatioVi: 'Chỉ số vàng: Triglyceride / HDL < 2.0',
  keyInsightVi: 'Để giảm mỡ máu xấu: CẮT GIẢM ĐƯỜNG (carbohydrate), không phải cắt mỡ!',
  omega6WarningVi: 'Chỉ dùng dầu thực vật → thừa Omega-6 → viêm tự miễn, xơ vữa. Phải LUÂN PHIÊN dầu mỡ.',
};

// ============================================================================
// 3f. LIFESTYLE TIPS — Vi nhựa, Rượu, Nước
// ============================================================================

export const LIFESTYLE_TIPS = {
  microplastics: {
    titleVi: '🥤 Vi nhựa — kẻ giết người thầm lặng',
    boilTipVi: 'Đun sôi nước máy 5 phút → cặn CaCO3 kết tủa → "nhốt" >80% vi nhựa.',
    checkVi: 'Lật đáy chai: TRÁNH nhựa số 3 (PVC) và số 6 (PS-xốp). Chứa BPA bắt chước estrogen → rối loạn nội tiết, ung thư.',
    receiptVi: 'Hóa đơn siêu thị bóng loáng, vé xe buýt, túi giấy tráng nilon = BPA. Hạn chế cầm nắm.',
    microwareVi: 'KHÔNG dùng màng bọc/hộp nhựa hâm nóng trong lò vi sóng!',
  },
  alcohol: {
    titleVi: '🍺 Sơ cứu ngộ độc rượu lậu',
    methanoVi: 'Rượu quê/tự nấu có thể chứa Methanol → MÙ LÒA, TỬ VONG.',
    symptomsVi: 'Dấu hiệu: chóng mặt, mắt nhìn mờ, nhìn một thành hai.',
    firstAidVi: 'Cho uống BIA hoặc rượu xịn (Ethanol). Ethanol cạnh tranh men gan → ngăn Methanol → Axit Formic. Gọi cấp cứu ngay!',
  },
  sugarAlcohols: {
    titleVi: '🍬 Đường cồn (Xylitol, Sorbitol, Erythritol)',
    safeVi: 'Ít calo, an toàn cho tiểu đường.',
    dangerVi: 'Quá 50g/ngày → rút nước vào ruột → tiêu chảy, đầy hơi, biến đổi hệ vi sinh.',
  },
  honeyWarningVi: '🍯 Tuyệt đối KHÔNG cho trẻ dưới 2 tuổi dùng mật ong → nguy cơ ngộ độc thịt (Botulinum).',
  fructoseDeepVi: 'Fructose không chịu sự kiểm soát Insulin, đi thẳng vào gan. 70% → mỡ → gan nhiễm mỡ. Không tạo cảm giác no → ăn thêm. Tăng axit uric (Gút) + bùng phát hại khuẩn đại tràng → rò rỉ ruột.',
};

// ============================================================================
// 4. MYTH-BUSTING QUIZ — 18 câu hỏi
// ============================================================================

export interface QuizQuestion {
  id: number;
  questionVi: string;
  icon: string;
  options: { label: string; text: string }[];
  correctIndex: number;
  explanationVi: string;
  module: 1 | 2 | 3 | 4;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: 1, icon: '🍅', module: 2,
    questionVi: 'Trứng nấu cà chua có sinh ra chất độc không?',
    options: [
      { label: 'A', text: 'Có, Vitamin C + sắt tạo thạch tín' },
      { label: 'B', text: 'KHÔNG. Là tổ hợp tuyệt vời hạ mỡ máu' },
      { label: 'C', text: 'Chỉ độc khi nấu cùng hải sản' },
      { label: 'D', text: 'An toàn nếu bỏ vỏ cà chua' },
    ],
    correctIndex: 1,
    explanationVi: 'Trứng + cà chua = tuyệt vời, hạ mỡ máu. Hải sản + Vitamin C cũng KHÔNG sinh thạch tín (asen hữu cơ không phản ứng). Phải ăn CẢ VỎ cà chua (71% Lycopene)!' },
  { id: 2, icon: '🐔', module: 2,
    questionVi: 'Bộ phận nào của gà cần vứt bỏ?',
    options: [
      { label: 'A', text: 'Đùi gà và cánh gà' },
      { label: 'B', text: 'Lòng mề gà' },
      { label: 'C', text: 'Phao câu, cổ/ngọn cánh, đầu gà' },
      { label: 'D', text: 'Da gà' },
    ],
    correctIndex: 2,
    explanationVi: 'Vứt: (1) Phao câu — 90% hạch bạch huyết, (2) Cổ+ngọn cánh — mầm bệnh, (3) Đầu — cholesterol cao. Phần còn lại an toàn!' },
  { id: 3, icon: '🥚', module: 2,
    questionVi: 'Cách nấu trứng nào hấp thu TỐT NHẤT?',
    options: [
      { label: 'A', text: 'Trứng sống (giữ enzyme)' },
      { label: 'B', text: 'Luộc vừa chín (sôi 5p, ngâm 3p)' },
      { label: 'C', text: 'Chiên giòn 2 mặt' },
      { label: 'D', text: 'Luộc kỹ (sôi 15 phút)' },
    ],
    correctIndex: 1,
    explanationVi: 'Luộc vừa = 98% protein. Sống = 30-50% + E.coli. Quá kỹ: sắt+lưu huỳnh kết tủa (lòng đỏ xám). Vỏ trứng có 7.000 lỗ rỗng → vi khuẩn dễ xâm nhập → KHÔNG ăn sống!' },
  { id: 4, icon: '💊', module: 1,
    questionVi: 'Tại sao PHẢI uống Canxi vào 9h tối?',
    options: [
      { label: 'A', text: 'Hấp thu tốt hơn ban ngày' },
      { label: 'B', text: 'Ngăn tuyến cận giáp rút Canxi từ xương lúc 2-3h sáng' },
      { label: 'C', text: 'Canxi giúp ngủ ngon' },
      { label: 'D', text: 'Uống lúc nào cũng được' },
    ],
    correctIndex: 1,
    explanationVi: 'Lúc 2-3h sáng, tuyến cận giáp "trộm" Canxi từ xương. Liều tối ≤300mg cung cấp Canxi cho máu → tuyến không cần lấy từ xương = chống loãng xương!' },
  { id: 5, icon: '🥣', module: 3,
    questionVi: 'Người tiểu đường nên ăn tinh bột nào?',
    options: [
      { label: 'A', text: 'Cháo trắng (dễ tiêu)' },
      { label: 'B', text: 'Bánh mì nguyên cám (chất xơ)' },
      { label: 'C', text: 'Khoai lang hoặc bún tươi' },
      { label: 'D', text: 'Gạo lứt (GI thấp nhất)' },
    ],
    correctIndex: 2,
    explanationVi: 'Cháo GI=95! Bánh mì: Lectin+Gluten. Gạo lứt OK nhưng có Lectin. Khoai lang (GI 44) + Bún (GI 46) = an toàn, không Lectin!' },
  { id: 6, icon: '🥚', module: 2,
    questionVi: 'Trứng có trống (thụ tinh) có bổ hơn trứng thường?',
    options: [
      { label: 'A', text: 'Có, chứa hormone sinh dục bổ sung' },
      { label: 'B', text: 'Có, nhiều protein hơn 50%' },
      { label: 'C', text: 'KHÔNG bổ hơn, còn dễ thối hơn' },
      { label: 'D', text: 'Chỉ bổ cho phụ nữ mang thai' },
    ],
    correctIndex: 2,
    explanationVi: 'Trứng có trống KHÔNG chứa hormone sinh dục, KHÔNG bổ hơn. Phôi hô hấp mang vi khuẩn từ ngoài → nhanh hỏng, dễ thành trứng ung (khí H2S). Trứng thường an toàn và tiện hơn!' },
  { id: 7, icon: '🧂', module: 2,
    questionVi: 'Bột ngọt (MSG) có gây ung thư không?',
    options: [
      { label: 'A', text: 'Có, đun nóng tạo chất gây ung thư' },
      { label: 'B', text: 'Có, vì là hóa chất tổng hợp' },
      { label: 'C', text: 'KHÔNG. Nhưng 1/3 MSG là muối ẩn — lạm dụng hại thận' },
      { label: 'D', text: 'Chỉ an toàn nếu không đun nóng' },
    ],
    correctIndex: 2,
    explanationVi: 'MSG lên men tự nhiên từ mía/sắn, FDA+WHO công nhận an toàn. Đun >120°C chỉ mất vị, KHÔNG ung thư. Nhưng 1/3 MSG = Natri → lạm dụng gây tăng huyết áp, hại thận, tăng axit uric.' },
  { id: 8, icon: '🏃', module: 4,
    questionVi: 'Thời điểm tập thể dục TỐT NHẤT trong ngày?',
    options: [
      { label: 'A', text: 'Sáng sớm 5-6h (không khí trong lành)' },
      { label: 'B', text: 'Trưa 12h (nắng giúp tổng hợp D3)' },
      { label: 'C', text: 'Chiều tối 17-19h' },
      { label: 'D', text: 'Lúc nào cũng được' },
    ],
    correctIndex: 2,
    explanationVi: 'Sáng sớm: bụi mịn+CO2 cao nhất (cây thải ban đêm), miễn dịch yếu, huyết áp dao động → đột quỵ! Chiều tối: không khí sạch, cơ thể ấm, miễn dịch mạnh. Nhịp tim tập: 130-140 nhịp/phút.' },
  { id: 9, icon: '🍬', module: 3,
    questionVi: 'Giới hạn đường nạp mỗi ngày là bao nhiêu?',
    options: [
      { label: 'A', text: '100g (khoảng 1 bát cơm)' },
      { label: 'B', text: '50g (= 1 lon nước ngọt)' },
      { label: 'C', text: 'Dưới 25g (= 6 muỗng cà phê)' },
      { label: 'D', text: 'Không cần giới hạn nếu tập thể dục' },
    ],
    correctIndex: 2,
    explanationVi: 'Dưới 25g/ngày là lý tưởng. 1 lon nước ngọt = 50g = VƯỢT 2 LẦN! Đường gây nghiện như cocaine (Dopamine), gây 45 bệnh gồm tiểu đường, béo phì, 7 loại ung thư.' },
  { id: 10, icon: '💊', module: 1,
    questionVi: 'Vitamin B, C nên uống lúc nào?',
    options: [
      { label: 'A', text: 'Sau bữa ăn có dầu mỡ' },
      { label: 'B', text: 'Lúc đói, trước ăn sáng 30 phút' },
      { label: 'C', text: 'Trước khi ngủ' },
      { label: 'D', text: 'Uống lúc nào cũng được' },
    ],
    correctIndex: 1,
    explanationVi: 'B, C tan trong nước → uống ĐÓI (axit dạ dày giúp hấp thu, không bị cạnh tranh thức ăn). Vitamin A, D, E, K tan trong dầu → SAU bữa ăn có mỡ 30 phút. Đây là quy tắc cực kỳ quan trọng!' },
  { id: 11, icon: '🐟', module: 1,
    questionVi: 'Dầu gan cá tuyết có phải nguồn DHA tốt nhất?',
    options: [
      { label: 'A', text: 'Có, DHA cao nhất trong các loại dầu cá' },
      { label: 'B', text: 'KHÔNG. Chủ yếu là Vitamin A, D — DHA rất thấp' },
      { label: 'C', text: 'Có, nhưng phải uống liều cao' },
      { label: 'D', text: 'Chỉ tốt cho trẻ em' },
    ],
    correctIndex: 1,
    explanationVi: 'Dầu gan cá tuyết chủ yếu chứa Vitamin A, D — hàm lượng DHA RẤT THẤP. Muốn DHA → chọn dầu cá (fish oil) từ cá hồi, cá thu, hoặc viên EPA+DHA. ALA từ thực vật chỉ chuyển hóa <5% thành DHA.' },
  { id: 12, icon: '🍯', module: 3,
    questionVi: 'Fructose (mật ong, nước ép) có tốt hơn đường mía?',
    options: [
      { label: 'A', text: 'Có, mật ong là đường tự nhiên nên an toàn' },
      { label: 'B', text: 'Có, Fructose không làm tăng đường huyết' },
      { label: 'C', text: 'KHÔNG. Fructose nguy hiểm hơn — đi thẳng vào gan gây gan nhiễm mỡ' },
      { label: 'D', text: 'Giống nhau, không khác biệt' },
    ],
    correctIndex: 2,
    explanationVi: 'Fructose oxy hóa cực mạnh, chuyển hóa TRỰC TIẾP ở gan → gan nhiễm mỡ, lão hóa da. Trái cây nguyên quả (có chất xơ) OK. Nhưng mật ong, nước ép = đường tinh khiết đi thẳng vào gan!' },

  // --- 6 câu mới từ 10 bài giảng ---
  { id: 13, icon: '🩸', module: 1,
    questionVi: 'Chỉ số nào quan trọng nhất để đánh giá mỡ máu?',
    options: [
      { label: 'A', text: 'LDL cholesterol (càng thấp càng tốt)' },
      { label: 'B', text: 'Tổng cholesterol' },
      { label: 'C', text: 'Tỷ lệ Triglyceride / HDL (mục tiêu < 2.0)' },
      { label: 'D', text: 'Cholesterol trong thức ăn' },
    ],
    correctIndex: 2,
    explanationVi: 'LDL không hoàn toàn xấu — nó là "tàu" chuyên chở dinh dưỡng. LDL chỉ độc hại khi bị oxy hóa hoặc đường hóa. Tỷ lệ Triglyceride/HDL < 2.0 mới là chỉ số vàng. Muốn giảm mỡ xấu: CẮT ĐƯỜNG, không phải cắt mỡ!' },
  { id: 14, icon: '🍚', module: 3,
    questionVi: 'Gạo lứt 100% ăn hàng ngày có thực sự tốt?',
    options: [
      { label: 'A', text: 'Có, càng nhiều chất xơ càng tốt' },
      { label: 'B', text: 'KHÔNG. Vỏ chứa Axit Phytic ức chế hấp thu Canxi, Magie' },
      { label: 'C', text: 'Có, WHO khuyến cáo ăn 100% gạo lứt' },
      { label: 'D', text: 'Chỉ tốt cho người tiểu đường' },
    ],
    correctIndex: 1,
    explanationVi: 'Gạo lứt giàu xơ + B nhưng vỏ chứa Axit Phytic — ức chế hấp thu Canxi, Magie dẫn đến đau khớp, sương mù não, mất ngủ, suy nhược. Phải ăn ĐAN XEN gạo trắng + gạo lứt, không ăn 100% lứt dài hạn!' },
  { id: 15, icon: '🍊', module: 1,
    questionVi: 'Nước cốt chanh có thể chữa ung thư/sỏi thận không?',
    options: [
      { label: 'A', text: 'Có, Vitamin C trong chanh chống ung thư' },
      { label: 'B', text: 'Có, nước chanh hòa tan sỏi thận' },
      { label: 'C', text: 'KHÔNG. Chanh chỉ có 20mg Vitamin C — quá ít. Đây là tin đồn thổi phồng' },
      { label: 'D', text: 'Có nếu uống đủ 3 lít/ngày' },
    ],
    correctIndex: 2,
    explanationVi: 'Nước cốt chanh chỉ có ~20mg Vitamin C/100g — thua xa ớt chuông (200mg), ổi, kiwi. Tuyên bố chữa ung thư, sỏi thận, giảm cân là SAI SỰ THẬT. Cần 200-300mg Vitamin C/ngày từ nhiều nguồn, không quá 1000mg.' },
  { id: 16, icon: '🏃', module: 4,
    questionVi: 'Nên ăn gì trước khi tập thể dục?',
    options: [
      { label: 'A', text: 'Không ăn gì — đốt mỡ tốt hơn' },
      { label: 'B', text: 'Tinh bột trước 30 phút hoặc protein trước 2-3 tiếng' },
      { label: 'C', text: 'Uống nước đường ngay trước tập' },
      { label: 'D', text: 'Ăn no xong tập luôn' },
    ],
    correctIndex: 1,
    explanationVi: 'Tập khi đói → cơ thể tiêu hủy cơ Vân → sinh hypoxanthine + axit lactic → gan chuyển thành Axit Uric → GÚT! Ăn tinh bột (cơm, khoai) trước 30p hoặc protein (thịt, trứng) trước 2-3h. Sau tập phải uống nước để thải uric qua nước tiểu.' },
  { id: 17, icon: '🥤', module: 4,
    questionVi: 'Cách nào giúp giảm vi nhựa trong nước uống?',
    options: [
      { label: 'A', text: 'Lọc bằng máy lọc RO là đủ' },
      { label: 'B', text: 'Đun sôi nước máy 5 phút — cặn vôi "nhốt" 80% vi nhựa' },
      { label: 'C', text: 'Uống nước đóng chai an toàn hơn' },
      { label: 'D', text: 'Vi nhựa không có trong nước uống' },
    ],
    correctIndex: 1,
    explanationVi: 'Đun sôi nước 5 phút → cặn Canxi Cacbonat (cặn vôi) kết tủa, "nhốt" được >80% hạt vi nhựa. Chai nhựa số 3 (PVC) và số 6 (PS-xốp) chứa BPA bắt chước estrogen → rối loạn nội tiết. Lật đáy chai kiểm tra số nhựa!' },
  { id: 18, icon: '🧈', module: 3,
    questionVi: 'Tại sao không nên BỎ HOÀN TOÀN mỡ lợn?',
    options: [
      { label: 'A', text: 'Vì mỡ lợn giàu Vitamin' },
      { label: 'B', text: 'Vì chỉ dùng dầu thực vật → thừa Omega-6 → viêm tự miễn' },
      { label: 'C', text: 'Vì mỡ lợn rẻ hơn' },
      { label: 'D', text: 'Không có lý do, nên bỏ hoàn toàn' },
    ],
    correctIndex: 1,
    explanationVi: 'Dầu thực vật chứa nhiều Omega-6. Thừa Omega-6, thiếu Omega-3 → kích hoạt viêm tự miễn, xơ vữa, tiểu đường. Mỡ lợn bền nhiệt, phù hợp chiên rán. LUÂN PHIÊN: bữa mỡ lợn, bữa dầu thực vật, đổi loại dầu!' },

  // --- Chuyển hóa mỡ & IF ---
  { id: 19, icon: '🔥', module: 3,
    questionVi: 'Tại sao ăn nhiều đường lại KHÔNG THỂ đốt mỡ?',
    options: [
      { label: 'A', text: 'Vì đường chuyển thẳng thành mỡ' },
      { label: 'B', text: 'Vì đường huyết tăng → Insulin tăng → Insulin ỨC CHẾ enzyme phân hủy mỡ' },
      { label: 'C', text: 'Vì đường làm tắc mạch máu' },
      { label: 'D', text: 'Đường không ảnh hưởng đến đốt mỡ' },
    ],
    correctIndex: 1,
    explanationVi: 'Khi đường huyết tăng → tuyến tụy tiết Insulin → Insulin ỨC CHẾ enzyme phân hủy mỡ. Muốn đốt mỡ phải giữ đường huyết ổn định: ăn GI thấp, tránh đường tinh luyện. NHƯNG không cắt hoàn toàn tinh bột — não và hồng cầu BẮT BUỘC cần đường!' },
  { id: 20, icon: '🥚', module: 3,
    questionVi: 'Thiếu protein gây ra hậu quả gì nghiêm trọng nhất?',
    options: [
      { label: 'A', text: 'Chỉ bị yếu cơ' },
      { label: 'B', text: 'Gan nhiễm mỡ — vì không có Albumin vận chuyển axit béo đến cơ đốt cháy' },
      { label: 'C', text: 'Không ảnh hưởng gì nếu ăn đủ rau' },
      { label: 'D', text: 'Chỉ ảnh hưởng người tập gym' },
    ],
    correctIndex: 1,
    explanationVi: 'Protein → Albumin = "phà" chuyên chở axit béo đến cơ bắp đốt cháy. Thiếu đạm → axit béo không có xe → quay về gan → GAN NHIỄM MỠ! Lòng đỏ trứng + đậu phụ chứa Lecithin hòa tan cholesterol, tốt cho não.' },
  { id: 21, icon: '💊', module: 1,
    questionVi: 'Magie + Vitamin B6 kết hợp giúp gì?',
    options: [
      { label: 'A', text: 'Chỉ giúp ngủ ngon' },
      { label: 'B', text: 'Tổng hợp Lecithin đốt mỡ + tiết Serotonin/Melatonin ngủ sâu + B6 dẫn Mg đến Tim/Não' },
      { label: 'C', text: 'Giúp xương chắc hơn' },
      { label: 'D', text: 'Không cần kết hợp, uống riêng giống nhau' },
    ],
    correctIndex: 1,
    explanationVi: 'Mg + B6 = bộ đôi vàng: (1) Tổng hợp Lecithin phân cắt mỡ đưa vào tế bào đốt → giảm mỡ máu, (2) Tạo Serotonin + Melatonin → ngủ sâu, giảm Cortisol, (3) B6 là "radar" ưu tiên dẫn Mg đến bảo vệ Tim + Não.' },
  { id: 22, icon: '⏰', module: 3,
    questionVi: 'Nhịn ăn gián đoạn (IF) đúng cách là như thế nào?',
    options: [
      { label: 'A', text: 'Nhịn hoàn toàn không ăn uống gì' },
      { label: 'B', text: 'Nhịn Calo nhưng VẪN NẠP đủ nước, vi chất, vitamin' },
      { label: 'C', text: 'Chỉ uống nước ép trái cây' },
      { label: 'D', text: 'Ăn 1 bữa thật no rồi nhịn' },
    ],
    correctIndex: 1,
    explanationVi: 'IF = nhịn Calo, KHÔNG nhịn vi chất! Sau 8-10h hết glycogen → đốt mỡ. Nhưng PHẢI uống đủ nước + vi chất + vitamin. Nước ép/nước ngọt phá vỡ hoàn toàn quá trình! Lợi ích: tuyến tụy nghỉ → khắc phục kháng Insulin, giảm IGF-1, kích hoạt sửa DNA.' },
  { id: 23, icon: '🍖', module: 2,
    questionVi: 'Bộ phận nội tạng lợn nào có ÍT mỡ và cholesterol nhất?',
    options: [
      { label: 'A', text: 'Dạ dày (bao tử)' },
      { label: 'B', text: 'Lòng non' },
      { label: 'C', text: 'Lòng già (đại tràng)' },
      { label: 'D', text: 'Gan lợn' },
    ],
    correctIndex: 2,
    explanationVi: 'Bất ngờ: Lòng già (đại tràng) có tỷ lệ mỡ + cholesterol THẤP NHẤT! Tuyệt đối TRÁNH: óc lợn (cholesterol khổng lồ), móng giò, thịt cổ (hạch bạch huyết). Lẩu đa dạng nội tạng tốt cho người tỳ vị yếu — miễn không ăn quá no.' },
  { id: 24, icon: '💨', module: 4,
    questionVi: 'Phần lớn mỡ thừa khi bị đốt cháy thải ra qua đâu?',
    options: [
      { label: 'A', text: 'Mồ hôi (vì tập xong mồ hôi nhiều)' },
      { label: 'B', text: 'Nước tiểu' },
      { label: 'C', text: 'Hơi thở — 84% thành CO2 thở ra' },
      { label: 'D', text: 'Phân' },
    ],
    correctIndex: 2,
    explanationVi: '84% khối lượng mỡ đốt cháy → CO2 (thở ra), chỉ 16% → H2O (mồ hôi/nước tiểu). Vì vậy tập thở cơ hoành, hít sâu thở dài = tăng oxy vào + đẩy CO2 ra = đốt mỡ hiệu quả hơn cả chạy bộ thở nông!' },

  // --- Nước, Sắt, B1, Probiotics, Omega-3 rTG, Rửa rau ---
  { id: 25, icon: '💧', module: 3,
    questionVi: 'Tại sao uống nhiều trà/bia lại KHÔNG giải khát?',
    options: [
      { label: 'A', text: 'Vì chúng không có khoáng chất' },
      { label: 'B', text: 'Vì đường/cồn/cafein tăng áp lực thẩm thấu → hút nước NGƯỢC từ tế bào ra' },
      { label: 'C', text: 'Vì chúng quá lạnh' },
      { label: 'D', text: 'Vì cơ thể không tiêu hóa được' },
    ],
    correctIndex: 1,
    explanationVi: 'Đường, cồn, cafein tăng áp lực thẩm thấu trong máu → nước bị hút NGƯỢC từ tế bào ra → tế bào càng khát! Vì vậy uống bia xong lại muốn uống thêm. Tế bào chỉ hấp thu nước lọc qua kênh protein aquaporin. Uống từng ngụm nhỏ <250ml/lần.' },
  { id: 26, icon: '🥬', module: 3,
    questionVi: 'Cách nào xử lý thuốc trừ sâu trên rau ĐÚNG nhất?',
    options: [
      { label: 'A', text: 'Ngâm nước muối 30 phút' },
      { label: 'B', text: 'Rửa dưới vòi nước chảy, rửa từng lá, gọt vỏ, chần nước sôi' },
      { label: 'C', text: 'Ngâm nước vo gạo' },
      { label: 'D', text: 'Rửa bằng nước ấm' },
    ],
    correctIndex: 1,
    explanationVi: 'Ngâm nước muối = SAI! Áp suất thẩm thấu đẩy thuốc trừ sâu NGƯỢC vào trong rau. Đúng: rửa dưới vòi nước chảy, rửa từng lá (bắp cải), gọt vỏ, chần nước sôi, hoặc để nơi thoáng gió cho thuốc bay hơi.' },
  { id: 27, icon: '🩸', module: 1,
    questionVi: 'Khi nào TUYỆT ĐỐI không được uống sắt?',
    options: [
      { label: 'A', text: 'Khi đói bụng' },
      { label: 'B', text: 'Khi đang bị viêm nhiễm cấp/mãn tính hoặc ung thư' },
      { label: 'C', text: 'Khi uống cùng vitamin C' },
      { label: 'D', text: 'Không có trường hợp nào cần kiêng' },
    ],
    correctIndex: 1,
    explanationVi: 'Khi viêm nhiễm/ung thư, cơ thể kích hoạt "vườn không nhà trống" — đóng cửa hấp thu sắt để BỎ ĐÓI vi khuẩn và tế bào ung thư. Uống sắt lúc này = tiếp tay cho giặc! Sắt thừa → phản ứng Fenton → gốc tự do → lão hóa, ung thư. LUÔN xét nghiệm trước.' },
  { id: 28, icon: '⚡', module: 1,
    questionVi: 'Thêm gì khi nấu cơm để bảo toàn Vitamin B1?',
    options: [
      { label: 'A', text: 'Baking soda (môi trường kiềm)' },
      { label: 'B', text: 'Muối' },
      { label: 'C', text: 'Giấm (môi trường axit)' },
      { label: 'D', text: 'Đường' },
    ],
    correctIndex: 2,
    explanationVi: 'B1 sợ nhiệt, tia UV và MÔI TRƯỜNG KIỀM (baking soda phá hủy B1). Thêm GIẤM (axit) khi nấu cơm/ngũ cốc = bảo toàn B1 ở nhiệt độ cao. B1 = "ổ cắm điện" khởi động đốt đường → ATP. Thiếu B1 → axit lactic → đau cơ, sương mù não. Rượu bia phá hủy B1!' },
  { id: 29, icon: '🦠', module: 1,
    questionVi: 'Men vi sinh (Probiotics) phải có đặc điểm gì?',
    options: [
      { label: 'A', text: 'Càng nhiều CFU càng tốt (100 tỷ+)' },
      { label: 'B', text: 'Phải có ghi "Bào tử/Spore" trên nhãn' },
      { label: 'C', text: 'Chọn loại không cần tủ lạnh' },
      { label: 'D', text: 'Uống khi bụng no để bảo vệ vi khuẩn' },
    ],
    correctIndex: 1,
    explanationVi: 'Dạ dày pH 1.6-3.4 = siêu axit, giết hết lợi khuẩn thường. Chỉ BÀO TỬ (Spore) mới sống sót xuống ruột. Liều hàng ngày 10-30 tỷ CFU. 100 tỷ CFU → diệt hại khuẩn ồ ạt → độc tố → chướng bụng. Ruột chứa 3kg vi khuẩn = 80% miễn dịch!' },
  { id: 30, icon: '🐟', module: 1,
    questionVi: 'Omega-3 dạng nào hấp thu TỐT NHẤT?',
    options: [
      { label: 'A', text: 'Dạng EE (Ethyl Ester) — phổ biến, rẻ' },
      { label: 'B', text: 'Dạng rTG (Triglyceride tái tổ hợp) — hấp thu gấp nhiều lần EE' },
      { label: 'C', text: 'Dạng nào cũng giống nhau' },
      { label: 'D', text: 'Dầu gan cá tuyết là tốt nhất' },
    ],
    correctIndex: 1,
    explanationVi: 'rTG hấp thu GẤP ĐÔI dạng EE! Tỷ lệ chữa bệnh: (EPA+DHA)/tổng chất béo ≥ 0.6 (60%). Mỡ máu/gan nhiễm mỡ: EPA > DHA. Phát triển não/mắt: DHA > EPA. Dầu gan cá tuyết chủ yếu là A+D, DHA rất thấp!' },

  // --- Trục Giáp-Ruột, Meal Ratio, B6, Cortisol, Sunbath ---
  { id: 31, icon: '🍽️', module: 3,
    questionVi: 'Tỷ lệ đĩa ăn khoa học là gì?',
    options: [
      { label: 'A', text: '1/2 đạm + 1/4 tinh bột + 1/4 rau' },
      { label: 'B', text: '1/4 đạm + 1/4 tinh bột + 1/2 rau củ quả' },
      { label: 'C', text: '1/3 đạm + 1/3 tinh bột + 1/3 rau' },
      { label: 'D', text: 'Ăn tùy thích, không cần tỷ lệ' },
    ],
    correctIndex: 1,
    explanationVi: '1/4 đạm (thịt, cá, trứng) + 1/4 tinh bột (ngũ cốc, hạt) + 1/2 rau củ quả. 65-70% năng lượng từ nhóm thực phẩm + 30-35% từ chất béo. Đơn giản, dễ nhớ, không cần cân đo!' },
  { id: 32, icon: '🦋', module: 3,
    questionVi: 'Hội chứng rò rỉ ruột có thể gây ra bệnh gì ở tuyến giáp?',
    options: [
      { label: 'A', text: 'Ung thư tuyến giáp' },
      { label: 'B', text: 'Viêm tuyến giáp tự miễn Hashimoto' },
      { label: 'C', text: 'Bướu cổ' },
      { label: 'D', text: 'Không liên quan đến tuyến giáp' },
    ],
    correctIndex: 1,
    explanationVi: 'Đường + Fructose → loạn khuẩn → rò rỉ ruột → Gluten (lúa mì) + Casein (sữa) lọt vào máu → miễn dịch tấn công NHẦM tuyến giáp = HASHIMOTO! Đây là "trục Giáp-Ruột" — bảo vệ ruột = bảo vệ tuyến giáp.' },
  { id: 33, icon: '☀️', module: 4,
    questionVi: 'Tắm nắng qua cửa kính có tổng hợp được Vitamin D không?',
    options: [
      { label: 'A', text: 'Có, kính trong suốt cho tia UV đi qua' },
      { label: 'B', text: 'KHÔNG. UVB không xuyên qua kính, quần áo hay kem chống nắng' },
      { label: 'C', text: 'Có nhưng cần thời gian lâu hơn' },
      { label: 'D', text: 'Chỉ cần nắng chiếu vào mắt' },
    ],
    correctIndex: 1,
    explanationVi: 'Tia UVB tổng hợp D3 KHÔNG xuyên qua kính, quần áo, kem chống nắng! Tắm nắng qua cửa sổ = VÔ DỤNG. Phơi da trực tiếp 15-20 phút, khung giờ 10h-16h (bóng râm < chiều cao). Vitamin C + D3 = bộ đôi chống lão hóa da.' },
  { id: 34, icon: '😰', module: 4,
    questionVi: 'Cortisol (hormone stress) gây hại gì cho cơ thể?',
    options: [
      { label: 'A', text: 'Chỉ gây mất ngủ' },
      { label: 'B', text: 'Tiêu hủy cơ bắp + tích mỡ bụng/mặt/gáy + ức chế miễn dịch' },
      { label: 'C', text: 'Giúp đốt mỡ nhanh hơn' },
      { label: 'D', text: 'Không ảnh hưởng gì' },
    ],
    correctIndex: 1,
    explanationVi: 'Cortisol = kẻ cắp bình yên: TIÊU HỦY cơ bắp + TÍCH MỠ bụng, mặt, gáy (dự trữ năng lượng) + ỨC CHẾ miễn dịch. Stress mãn tính + thức khuya → Cortisol không hạ. Ngủ trước 11h + thư thái = Cortisol giảm ban đêm.' },
  { id: 35, icon: '💊', module: 1,
    questionVi: 'Vitamin B6 có vai trò gì đặc biệt?',
    options: [
      { label: 'A', text: 'Chỉ giúp tăng sức đề kháng' },
      { label: 'B', text: '160 phản ứng: tạo vỏ Myelin thần kinh + giải bão cytokine + sản sinh Serotonin/Dopamine' },
      { label: 'C', text: 'Giúp xương chắc' },
      { label: 'D', text: 'Chỉ cần cho trẻ em' },
    ],
    correctIndex: 1,
    explanationVi: 'B6 tham gia 160 phản ứng: tổng hợp protein, tạo vỏ bọc Myelin thần kinh, giải quyết "bão cytokine" viêm, sản sinh Serotonin + Dopamine (hạnh phúc). Tan trong nước → nạp hàng ngày. Sáng sáng + nhiệt phá hủy B6!' },
  { id: 36, icon: '💧', module: 4,
    questionVi: 'Khi nào uống nước QUAN TRỌNG NHẤT trong ngày?',
    options: [
      { label: 'A', text: 'Sau bữa ăn trưa' },
      { label: 'B', text: 'Ngay khi thức dậy sáng — máu đang cô đặc nhất' },
      { label: 'C', text: 'Trước khi tập thể dục' },
      { label: 'D', text: 'Không có thời điểm nào quan trọng hơn' },
    ],
    correctIndex: 1,
    explanationVi: 'Sau một đêm, máu cô đặc nhất → nguy cơ tai biến, nhồi máu cơ tim! Uống ngay 1-2 cốc nước lọc khi thức dậy. Trước ngủ: lượng vừa đủ chống cục máu đông ban đêm. Tiêu chuẩn: ~2 lít/ngày, kiểm tra bằng màu nước tiểu.' },
];
