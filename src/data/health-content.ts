// ============================================================================
// HEALTH CONTENT DATABASE — BS Trần Văn Phúc
// 4 tính năng: Daily Tips, Meal Planner, Supplement Tracker, Quiz
// ============================================================================

// ============================================================================
// 1. DAILY NOTIFICATIONS — "Tip Sức Khỏe Mỗi Ngày"
// 10 push notifications ngắn, hấp dẫn, có Call-to-action
// ============================================================================

export interface DailyTip {
  id: number;
  icon: string;
  titleVi: string;
  bodyVi: string;
  categoryVi: string;
  module: 1 | 2 | 3 | 4;  // Thuộc module nào
}

export const DAILY_TIPS: DailyTip[] = [
  {
    id: 1, icon: '🥚', categoryVi: 'Siêu thực phẩm', module: 2,
    titleVi: 'Trứng luộc 5 phút = Thần dược!',
    bodyVi:
      'Trứng luộc vừa chín tới (sôi 5 phút, ngâm 3 phút) hấp thu protein tới 98% — ' +
      'ngang ngửa Tổ Yến mà rẻ gấp 1000 lần! Tuyệt đối KHÔNG ăn trứng sống nhé.',
  },
  {
    id: 2, icon: '🍅', categoryVi: 'Siêu thực phẩm', module: 2,
    titleVi: 'Cà chua phải nấu chín mới "thần"!',
    bodyVi:
      'Lycopene trong cà chua chống ung thư cực mạnh — nhưng chỉ giải phóng khi NẤU CHÍN với dầu mỡ. ' +
      'Ăn cả vỏ (chứa 71% Lycopene) và hạt. Cà chua sống = phí một nửa!',
  },
  {
    id: 3, icon: '🌙', categoryVi: 'Vi chất nền tảng', module: 1,
    titleVi: 'Đã uống Canxi tối nay chưa?',
    bodyVi:
      'Lúc 2-3h sáng, tuyến cận giáp sẽ "trộm" Canxi từ xương ra máu. ' +
      'Uống Canxi lúc 9h tối để ngăn chặn! Xương bạn sẽ cảm ơn đấy.',
  },
  {
    id: 4, icon: '💊', categoryVi: 'Vi chất nền tảng', module: 1,
    titleVi: 'Magie — viên thuốc chống đột quỵ ban đêm',
    bodyVi:
      '4 viên Magie Lactat trước khi ngủ = chống chuột rút, ngăn đột quỵ ban đêm, ngủ sâu hơn. ' +
      'Nhớ KHÔNG uống cùng lúc với Canxi nhé!',
  },
  {
    id: 5, icon: '🍠', categoryVi: 'Thiết kế bữa ăn', module: 3,
    titleVi: 'Gạo lứt ≠ Lành mạnh. Khoai lang mới đúng!',
    bodyVi:
      'Gạo lứt (GI 53) tốt hơn cơm trắng (GI 75) — nhưng vỏ cám chứa Lectin gây viêm ruột. ' +
      'Khoai lang an toàn hơn, không Lectin, giàu Beta-carotene. Thử thay cơm bằng khoai lang nhé!',
  },
  {
    id: 6, icon: '🐔', categoryVi: 'Giải mã tin đồn', module: 2,
    titleVi: 'Ăn gà phải bỏ 3 thứ này!',
    bodyVi:
      'Vứt ngay: (1) Phao câu — 90% hạch bạch huyết, (2) Cổ & ngọn cánh — nhiều mầm bệnh, ' +
      '(3) Đầu gà — cholesterol cao. Phần còn lại ăn thoải mái!',
  },
  {
    id: 7, icon: '💧', categoryVi: 'Lối sống', module: 4,
    titleVi: 'Nước tiểu bạn màu gì sáng nay?',
    bodyVi:
      'Vàng nhạt = đủ nước. Đục = đang thiếu nước, uống ngay! Trong vắt = thừa nước, giảm lại. ' +
      'Chỉ uống nước lọc H2O — nước ép, nước lá KHÔNG thay thế được đâu!',
  },
  {
    id: 8, icon: '☀️', categoryVi: 'Vi chất nền tảng', module: 1,
    titleVi: 'Vitamin D3 — "Hormone mặt trời" quyết định miễn dịch',
    bodyVi:
      'D3 không chỉ là vitamin mà là hormone steroid! Mức lý tưởng: 50-70 ng/ml trong máu. ' +
      'Phơi nắng 15 phút trước 9h sáng + uống D3 cùng bữa ăn có chất béo.',
  },
  {
    id: 9, icon: '🏃', categoryVi: 'Lối sống', module: 4,
    titleVi: 'HIIT vài chục giây = Đốt mỡ cả ngày',
    bodyVi:
      'Tập cường độ cao HIIT lúc đói (chỉ vài chục giây!) đốt sạch glycogen và mỡ mà KHÔNG teo cơ. ' +
      'Hiệu quả gấp 3 lần chạy bộ 30 phút. Thử ngay sáng mai!',
  },
  {
    id: 10, icon: '🧘', categoryVi: 'Lối sống', module: 4,
    titleVi: 'Stress = Ung thư. Bình tĩnh = Chữa lành.',
    bodyVi:
      'Căng thẳng làm cạn kiệt Magie → tế bào Lympho T sát thủ (hệ miễn dịch) bị tiêu diệt → ' +
      'ung thư có cơ hội. Hãy sống "biết đủ" và rèn não mỗi ngày (đọc sách, học toán).',
  },
];

/** Lấy tip cho ngày hôm nay (xoay vòng 10 ngày) */
export function getTodayTip(): DailyTip {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  return DAILY_TIPS[dayOfYear % DAILY_TIPS.length];
}

// ============================================================================
// 2. MEAL PLANNER — "Trợ lý Bữa Ăn GI/GL & Khẩu Phần"
// ============================================================================

export interface HandRuleItem {
  icon: string;
  nameVi: string;
  unitVi: string;
  maleVi: string;
  femaleVi: string;
}

export const HAND_RULES: HandRuleItem[] = [
  {
    icon: '✊', nameVi: 'Tinh bột (cơm, khoai, bún)',
    unitVi: 'Nắm đấm', maleVi: '4-5 nắm/ngày', femaleVi: '3-4 nắm/ngày',
  },
  {
    icon: '🥬', nameVi: 'Rau củ & Hoa quả',
    unitVi: 'Nắm đấm', maleVi: '9 nắm (5 rau + 4 quả)', femaleVi: '7 nắm (4 rau + 3 quả)',
  },
  {
    icon: '🖐️', nameVi: 'Thịt / Cá / Protein',
    unitVi: 'Lòng bàn tay', maleVi: '2 lòng bàn tay/ngày', femaleVi: '2 lòng bàn tay/ngày',
  },
  {
    icon: '🥄', nameVi: 'Dầu mỡ',
    unitVi: 'Thìa cà phê', maleVi: 'Không quá 3 thìa/ngày', femaleVi: 'Không quá 3 thìa/ngày',
  },
];

export const HAND_RULE_NOTE =
  'Tinh bột lý tưởng chiếm 40-70% khẩu phần. Không cần cân tiểu ly — chỉ cần bàn tay bạn!';

export interface GiFoodItem {
  nameVi: string;
  gi: number;
  levelVi: string;       // 'Thấp', 'Trung bình', 'Cao'
  levelColor: string;    // Tailwind color class
  noteVi: string;
}

export const GI_FOOD_TABLE: GiFoodItem[] = [
  { nameVi: '🍠 Khoai lang luộc', gi: 44, levelVi: 'Thấp', levelColor: 'text-green-700 bg-green-50',
    noteVi: 'An toàn, không Lectin. Lựa chọn số 1 thay cơm trắng.' },
  { nameVi: '🍚 Gạo lứt', gi: 53, levelVi: 'Trung bình', levelColor: 'text-amber-700 bg-amber-50',
    noteVi: 'GI tốt hơn cơm trắng, nhưng vỏ cám chứa Lectin. Không nên ăn hàng ngày.' },
  { nameVi: '🍜 Bún tươi', gi: 46, levelVi: 'Thấp', levelColor: 'text-green-700 bg-green-50',
    noteVi: 'Đã qua lên men và nhiệt → an toàn hơn bánh mì. Chọn bún tươi, không phải bún khô.' },
  { nameVi: '🍞 Bánh mì trắng', gi: 75, levelVi: 'Cao', levelColor: 'text-red-700 bg-red-50',
    noteVi: 'GI cao, tăng đường huyết nhanh. Hạn chế ăn.' },
  { nameVi: '🍚 Cơm trắng', gi: 73, levelVi: 'Cao', levelColor: 'text-red-700 bg-red-50',
    noteVi: 'GI cao. Nếu ăn: giảm lượng, thêm nhiều rau và protein.' },
  { nameVi: '🥣 Cháo trắng', gi: 95, levelVi: 'Rất cao', levelColor: 'text-red-700 bg-red-50',
    noteVi: 'GI gần 100! Người tiểu đường tuyệt đối tránh cháo loãng.' },
];

export const GI_GL_GUIDE = {
  giTargetVi: 'Chọn thực phẩm GI < 55 (lý tưởng < 40)',
  glTargetVi: 'Tải lượng đường huyết GL < 10 là an toàn',
  tipVi: 'GI = tốc độ đường vào máu. GL = tổng đường thực tế. Cả hai đều quan trọng!',
};

// ============================================================================
// 3. SUPPLEMENT TRACKER — "Nhắc nhở Uống Vi Chất"
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
    time: '07:30', periodVi: 'Sau bữa sáng', icon: '☀️',
    items: [
      { nameVi: 'Canxi (liều 1/2)', dosageVi: '≤300mg', colorClass: 'bg-blue-100 text-blue-800' },
      { nameVi: 'Vitamin D3', dosageVi: '2000 IU', colorClass: 'bg-amber-100 text-amber-800' },
      { nameVi: 'Omega-3', dosageVi: '1 viên', colorClass: 'bg-cyan-100 text-cyan-800' },
    ],
    noteVi: 'Uống cùng bữa ăn có chất béo. D3 cần dầu mỡ để hấp thu.',
  },
  {
    time: '12:00', periodVi: 'Bữa trưa', icon: '☀️',
    items: [
      { nameVi: 'Kẽm (Zinc)', dosageVi: '10mg', colorClass: 'bg-emerald-100 text-emerald-800' },
    ],
    noteVi: 'Uống Kẽm CÁCH XA Canxi và Magie (khác bữa). Uống cùng protein để hấp thu tốt.',
  },
  {
    time: '21:00', periodVi: 'Buổi tối (9h)', icon: '🌙',
    items: [
      { nameVi: 'Canxi (liều 2/2)', dosageVi: '≤300mg', colorClass: 'bg-blue-100 text-blue-800' },
    ],
    noteVi: 'QUAN TRỌNG NHẤT! Lúc 2-3h sáng tuyến cận giáp sẽ rút Canxi từ xương. Liều tối ngăn chặn điều này.',
  },
  {
    time: '22:00', periodVi: 'Trước ngủ', icon: '😴',
    items: [
      { nameVi: 'Magie Lactat', dosageVi: '4 viên', colorClass: 'bg-violet-100 text-violet-800' },
    ],
    noteVi: 'Chống chuột rút, đột quỵ ban đêm, ngủ sâu. CÁCH Canxi ít nhất 1 tiếng.',
  },
];

export const SUPPLEMENT_GOLDEN_RULE =
  'Quy tắc vàng: KHÔNG uống Canxi + Magie + Kẽm cùng lúc! ' +
  'Chúng ức chế hấp thu lẫn nhau. Chia ra các bữa khác nhau.';

export interface MagnesiumType {
  nameVi: string;
  useVi: string;
  whenVi: string;
  icon: string;
}

export const MAGNESIUM_TYPES: MagnesiumType[] = [
  { nameVi: 'Magie Lactat', icon: '💜',
    useVi: 'Uống hàng ngày, quan trọng nhất',
    whenVi: '4 viên trước ngủ — chống chuột rút, đột quỵ ban đêm' },
  { nameVi: 'Magie Citrat', icon: '🟢',
    useVi: 'Uống theo đợt 4-6 tuần',
    whenVi: 'Làm sạch ruột, trị trào ngược dạ dày, táo bón' },
  { nameVi: 'Magie Oxit', icon: '⚪',
    useVi: 'Trộn với Magie Lactat',
    whenVi: 'Hấp thu chậm → kéo dài giấc ngủ qua đêm' },
  { nameVi: 'Magie Hữu cơ (L-Threonate)', icon: '🧠',
    useVi: 'Đi thẳng vào não',
    whenVi: 'Ngủ ngon, cải thiện trầm cảm, tăng trí nhớ' },
];

export const OMEGA3_GUIDE = {
  ruleVi: 'Chọn Omega-3 có tỷ lệ (EPA+DHA)/Tổng chất béo > 0.3',
  lipidVi: 'Người mỡ máu cao: chọn loại EPA > DHA',
  normalVi: 'Người bình thường: chọn DHA >= EPA (tốt cho não)',
};

export const VITAMIN_D3_GUIDE = {
  targetVi: 'Mức lý tưởng trong máu: 50-70 ng/ml',
  whatVi: 'D3 là hormone steroid, quyết định hệ miễn dịch và hấp thu xương',
  howVi: 'Phơi nắng 15 phút trước 9h sáng + uống D3 cùng chất béo',
};

// ============================================================================
// 4. MYTH-BUSTING QUIZ — "Kiểm tra Kiến thức gốc rễ"
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
  {
    id: 1, icon: '🍅', module: 2,
    questionVi: 'Trứng nấu cà chua có sinh ra chất độc không?',
    options: [
      { label: 'A', text: 'Có, vì Vitamin C trong cà chua phản ứng với sắt trong trứng tạo thạch tín' },
      { label: 'B', text: 'KHÔNG. Trứng + cà chua là tổ hợp tuyệt vời giúp hạ mỡ máu' },
      { label: 'C', text: 'Chỉ độc khi nấu cùng hải sản' },
      { label: 'D', text: 'Chỉ an toàn nếu bỏ vỏ cà chua' },
    ],
    correctIndex: 1,
    explanationVi:
      'Trứng nấu cà chua là tổ hợp TUYỆT VỜI, giúp hạ mỡ máu rất tốt. ' +
      'Cà chua nấu hải sản cũng KHÔNG sinh ra thạch tín như lời đồn. ' +
      'Phải ăn CẢ VỎ cà chua vì chứa 71% Lycopene chống ung thư!',
  },
  {
    id: 2, icon: '🐔', module: 2,
    questionVi: 'Bộ phận nào của gà chứa chất độc và mầm bệnh, cần vứt bỏ?',
    options: [
      { label: 'A', text: 'Đùi gà và cánh gà' },
      { label: 'B', text: 'Lòng mề gà' },
      { label: 'C', text: 'Phao câu, cổ/ngọn cánh, và đầu gà' },
      { label: 'D', text: 'Da gà' },
    ],
    correctIndex: 2,
    explanationVi:
      'Vứt bỏ 3 bộ phận: (1) Phao câu — chứa 90% hạch bạch huyết tích tụ độc tố, ' +
      '(2) Cổ & ngọn cánh — nhiều mầm bệnh, (3) Đầu gà — cholesterol cao. Phần còn lại an toàn!',
  },
  {
    id: 3, icon: '🥚', module: 2,
    questionVi: 'Cách nấu trứng nào giúp hấp thu dinh dưỡng TỐT NHẤT?',
    options: [
      { label: 'A', text: 'Trứng sống (giữ nguyên enzyme)' },
      { label: 'B', text: 'Trứng luộc vừa chín tới (sôi 5 phút, ngâm 3 phút)' },
      { label: 'C', text: 'Trứng chiên giòn 2 mặt' },
      { label: 'D', text: 'Trứng luộc kỹ (sôi 15 phút)' },
    ],
    correctIndex: 1,
    explanationVi:
      'Trứng luộc vừa chín tới hấp thu 100% protein. Trứng sống chỉ hấp thu 30-50% và nguy cơ nhiễm E.coli. ' +
      'Chiên/luộc quá kỹ: sắt và lưu huỳnh kết tủa thành chất độc (lòng đỏ xám xanh). ' +
      'Lòng trắng 0% cholesterol — bắt buộc phải ăn!',
  },
  {
    id: 4, icon: '💊', module: 1,
    questionVi: 'Tại sao phải uống Canxi vào buổi tối (khoảng 9h)?',
    options: [
      { label: 'A', text: 'Vì buổi tối hấp thu tốt hơn ban ngày' },
      { label: 'B', text: 'Để ngăn tuyến cận giáp rút Canxi từ xương ra máu lúc 2-3h sáng' },
      { label: 'C', text: 'Vì Canxi giúp ngủ ngon' },
      { label: 'D', text: 'Không quan trọng, uống lúc nào cũng được' },
    ],
    correctIndex: 1,
    explanationVi:
      'Lúc 2-3h sáng, tuyến cận giáp hoạt động mạnh, "trộm" Canxi từ xương ra máu. ' +
      'Uống Canxi tối (≤300mg/lần) để cung cấp Canxi cho máu → tuyến cận giáp không cần lấy từ xương. ' +
      'Đây là bí quyết chống loãng xương hiệu quả nhất!',
  },
  {
    id: 5, icon: '🥣', module: 3,
    questionVi: 'Người tiểu đường nên ăn loại tinh bột nào?',
    options: [
      { label: 'A', text: 'Cháo trắng (dễ tiêu hóa)' },
      { label: 'B', text: 'Bánh mì nguyên cám (giàu chất xơ)' },
      { label: 'C', text: 'Khoai lang hoặc bún tươi (GI thấp, an toàn)' },
      { label: 'D', text: 'Gạo lứt (GI thấp nhất)' },
    ],
    correctIndex: 2,
    explanationVi:
      'Cháo trắng GI = 95 (GẦN 100!) → tăng đường huyết cực nhanh. ' +
      'Bánh mì nguyên cám chứa Lectin + Gluten gây viêm ruột. ' +
      'Gạo lứt (GI 53) tốt hơn cơm trắng nhưng cũng có Lectin trong vỏ cám. ' +
      'Khoai lang (GI 44) + Bún tươi (GI 46) = an toàn nhất, không Lectin!',
  },
];
