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
};

// ============================================================================
// 4. MYTH-BUSTING QUIZ — 12 câu hỏi
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
];
