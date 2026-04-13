// ============================================================================
// NUTRITION RULES DATABASE — BS Trần Văn Phúc
// 4 nhóm tính năng cốt lõi:
//   1. Cooking Anti-patterns (Cảnh báo chế biến & bảo quản)
//   2. Smart Diet Logic (Khẩu phần & chọn lọc thực phẩm)
//   3. Daily Tracker (Thói quen ăn uống & sinh hoạt)
//   4. Symptom-based Diet (Thực đơn theo triệu chứng)
// ============================================================================

import type { CookingWarningId } from './dishes';

// ============================================================================
// 1. COOKING ANTI-PATTERNS (Cảnh báo chế biến & bảo quản)
// ============================================================================

export interface CookingWarning {
  id: CookingWarningId;
  titleVi: string;
  messageVi: string;
  alternativeVi?: string;
  dangerLevel: 'info' | 'warning' | 'danger';
  icon: string;
  triggerKeywords: string[];
}

export const COOKING_WARNINGS: CookingWarning[] = [
  // --- Aflatoxin ---
  {
    id: 'aflatoxin-leftover',
    titleVi: 'Nấu bữa nào ăn bữa đó!',
    messageVi:
      'Thức ăn thừa để tủ lạnh quá 3 ngày sinh nấm mốc Aflatoxin gây UNG THƯ GAN. ' +
      'Aflatoxin chịu được 280°C — hâm lò vi sóng KHÔNG tiêu diệt được.',
    alternativeVi: 'Mua đến đâu ăn hết đến đấy. Chia nhỏ phần ăn, đông đá ngay nếu chưa dùng.',
    dangerLevel: 'danger',
    icon: '☠️',
    triggerKeywords: [], // General warning
  },
  // --- Benzopyrene (Nướng/BBQ) ---
  {
    id: 'benzopyrene-grill',
    titleVi: 'Cảnh báo chất gây ung thư nhóm 1',
    messageVi:
      'Đồ nướng than (BBQ, xúc xích nướng) sinh ra Benzopyrene — chất gây ung thư NHÓM 1. ' +
      'Phần cháy đen chứa nồng độ Benzopyrene cực cao.',
    alternativeVi:
      'Dùng LÒ NƯỚNG ĐIỆN thay nướng than. Bắt buộc cắt bỏ phần cháy đen. ' +
      'Ướp thịt với tỏi, nghệ, hoặc bia trước khi nướng giúp giảm 70% Benzopyrene.',
    dangerLevel: 'danger',
    icon: '🔥',
    triggerKeywords: ['nướng', 'bbq', 'nướng than', 'xúc xích nướng', 'thịt nướng', 'xiên nướng', 'nướng mọi'],
  },
  // --- Dầu ăn đã qua sử dụng ---
  {
    id: 'reused-oil',
    titleVi: 'Tuyệt đối không dùng lại dầu ăn cũ',
    messageVi:
      'Dầu ăn đã chiên qua sinh ra Aldehyde và Acrolein — chất gây ung thư. ' +
      'Dầu đã đổi màu đen, có mùi hôi = đã phân hủy.',
    alternativeVi: 'Mỗi lần chiên dùng dầu mới. Chiên rán nhiệt cao → dùng MỠ LỢN (bền nhiệt hơn dầu thực vật).',
    dangerLevel: 'danger',
    icon: '🛢️',
    triggerKeywords: [],
  },
  // --- Dầu thực vật nhiệt cao ---
  {
    id: 'oil-high-heat',
    titleVi: 'Quy tắc Dầu Mỡ khi nấu',
    messageVi:
      'CHIÊN RÁN nhiệt cao: dùng MỠ LỢN (bền nhiệt, không sinh chất độc). ' +
      'DẦU THỰC VẬT: chỉ dùng XÀO NẤU nhẹ nhàng. Dầu thực vật ở nhiệt cao sinh Aldehyde gây ung thư.',
    dangerLevel: 'warning',
    icon: '🍳',
    triggerKeywords: ['dầu ăn', 'dầu thực vật', 'chiên', 'rán'],
  },
  // --- Lectin: Ngũ cốc nguyên cám ---
  {
    id: 'lectin-grain',
    titleVi: 'Cảnh báo Lectin trong ngũ cốc nguyên cám',
    messageVi:
      'Vỏ cám của bánh mì lúa mì nguyên cám và gạo lứt chứa Lectin + Gluten cực cao, ' +
      'gây viêm tấy cơ thể, rò rỉ ruột, đau khớp. KHÔNG nên ăn hàng ngày.',
    alternativeVi:
      'Thay bằng KHOAI LANG (an toàn, không Lectin) hoặc BÚN (đã qua lên men và nhiệt, an toàn hơn bánh mì).',
    dangerLevel: 'danger',
    icon: '🚫',
    triggerKeywords: ['bánh mì nguyên cám', 'gạo lứt', 'whole wheat', 'nguyên cám', 'brown rice', 'lứt', 'lúa mì'],
  },
  // --- Lectin: Đậu đỗ sống ---
  {
    id: 'lectin-bean-raw',
    titleVi: 'CẤM ăn sống đậu đỗ!',
    messageVi:
      'Đậu đỗ sống chứa Lectin (Phytohaemagglutinin) — độc tố gây nôn, tiêu chảy, ngộ độc nặng. ' +
      'Tuyệt đối không ăn sống đậu đũa, đậu cô ve.',
    alternativeVi: 'Phải ngâm thật lâu + hầm bằng NỒI ÁP SUẤT nhiệt độ cao. KHÔNG dùng nồi nấu chậm (slow cooker).',
    dangerLevel: 'danger',
    icon: '⛔',
    triggerKeywords: ['đậu đỏ', 'đậu nành', 'đậu đen', 'đậu xanh', 'đậu lăng', 'đậu hà lan', 'đậu đũa', 'đậu cô ve'],
  },
  // --- Lectin: Đậu phải hầm kỹ ---
  {
    id: 'lectin-bean-cook',
    titleVi: 'Đậu đỗ phải hầm kỹ bằng nồi áp suất',
    messageVi:
      'Các loại đậu (đậu tương, đậu đen, đậu đỏ...) chứa Lectin. ' +
      'Phải ngâm >8 tiếng + hầm bằng nồi áp suất nhiệt độ cao mới phá hủy hoàn toàn.',
    dangerLevel: 'warning',
    icon: '♨️',
    triggerKeywords: ['đậu tương', 'đậu đen', 'đậu đỏ', 'đậu phụ', 'đậu hũ'],
  },
  // --- Giá đỗ tương ---
  {
    id: 'lectin-soy-sprout',
    titleVi: 'Cấm ăn sống giá đỗ tương',
    messageVi:
      'Giá đỗ XANH thì an toàn ăn sống. ' +
      'Nhưng giá đỗ TƯƠNG (đậu nành) tuyệt đối CẤM ăn sống — chứa Lectin nguy hiểm. Phải xào/luộc chín.',
    dangerLevel: 'danger',
    icon: '⚠️',
    triggerKeywords: ['giá đỗ tương', 'giá đậu nành', 'giá đậu tương'],
  },
  // --- Rau sống ---
  {
    id: 'raw-salad',
    titleVi: 'Lưu ý rau sống',
    messageVi: 'Rau sống có nguy cơ nhiễm khuẩn, ký sinh trùng. Rửa kỹ bằng nước muối.',
    dangerLevel: 'info',
    icon: '🥗',
    triggerKeywords: ['rau sống', 'salad', 'gỏi'],
  },
  // --- Nước ép ---
  {
    id: 'juice-no-fiber',
    titleVi: 'Ăn quả nguyên múi, không nên ép',
    messageVi:
      'Nước ép loại bỏ chất xơ, gây tăng đường huyết đột ngột. ' +
      'Ăn NGUYÊN QUẢ tốt hơn gấp nhiều lần — giữ lại chất xơ quý giá.',
    dangerLevel: 'warning',
    icon: '🧃',
    triggerKeywords: ['nước ép', 'ép trái cây', 'juice', 'sinh tố'],
  },
];

// ============================================================================
// 2. SMART DIET LOGIC (Khẩu phần & chọn lọc thực phẩm)
// ============================================================================

// --- Fist Rule ---
export interface FistRule {
  gender: 'male' | 'female';
  totalFistfuls: number;
  veggieFistfuls: number;
  fruitFistfuls: number;
  perMeal: { morning: number; lunch: number; dinner: number };
  ruleVi: string;
}

export const FIST_RULES: Record<'male' | 'female', FistRule> = {
  male: {
    gender: 'male', totalFistfuls: 9, veggieFistfuls: 5, fruitFistfuls: 4,
    perMeal: { morning: 2, lunch: 4, dinner: 3 },
    ruleVi: 'Nam: 9 nắm tay/ngày (5 rau củ + 4 hoa quả)',
  },
  female: {
    gender: 'female', totalFistfuls: 7, veggieFistfuls: 4, fruitFistfuls: 3,
    perMeal: { morning: 1, lunch: 3, dinner: 3 },
    ruleVi: 'Nữ: 7 nắm tay/ngày (4 rau củ + 3 hoa quả)',
  },
};

// --- Stomach Rule ---
export const STOMACH_RULES = {
  maxFullness: 0.7,
  chewCount: { min: 20, max: 30 },
  foodTemp: 40, // °C
  ruleVi: 'Chỉ ăn no 70%. Nhai kỹ 20-30 lần mỗi miếng. Thức ăn ~40°C.',
  whyVi: 'Chừa 30% không gian cho dạ dày nhào trộn thức ăn với axit.',
};

// --- Starch Safety Rules ---
export const STARCH_RULES = {
  dangerousVi: 'Bánh mì lúa mì nguyên cám, gạo lứt — chứa Lectin + Gluten gây rò rỉ ruột',
  safeAlternatives: [
    { nameVi: 'Khoai lang', whyVi: 'An toàn, gần như không có Lectin, giàu chất xơ', icon: '🍠' },
    { nameVi: 'Bún', whyVi: 'Đã qua lên men và nhiệt, an toàn hơn bánh mì', icon: '🍜' },
    { nameVi: 'Phở', whyVi: 'Tương tự bún, qua xử lý nhiệt', icon: '🍜' },
  ],
};

// --- Vegan Warning for Dyslipidemia ---
export const VEGAN_WARNING = {
  conditionId: 'dyslipidemia',
  titleVi: 'KHÔNG nên ăn chay cắt mỡ hoàn toàn!',
  messageVi:
    'Ăn chay hoàn toàn không có cholesterol sẽ làm GIẢM HDL (mỡ tốt) ' +
    'và TĂNG VỌT Triglycerid (mỡ xấu) — cực kỳ nguy hiểm.',
  adviceVi: 'Vẫn nên ăn 3 quả trứng/tuần (chia nửa quả mỗi bữa) nếu cholesterol dưới 6.2.',
  icon: '🚨',
};

// --- Superfoods DB ---
export interface SuperfoodInfo {
  id: string;
  nameVi: string;
  tag: import('./dishes').SuperfoodTag;
  keyNutrient: string;
  whyVi: string;
  servingVi: string;
  budget: 'rẻ' | 'vừa';
  priority: number;
}

export const SUPERFOODS_DB: SuperfoodInfo[] = [
  { id: 'hat-tia-to', nameVi: 'Hạt tía tô', tag: 'omega3', keyNutrient: 'Omega-3 (ALA)',
    whyVi: 'Đứng số 1 về Omega-3, vượt cả gan cá và cá hồi. Bổ não, giảm mỡ máu.',
    servingVi: '1 muỗng canh/ngày rắc lên cơm hoặc salad', budget: 'rẻ', priority: 10 },
  { id: 'trung-chim-cut', nameVi: 'Trứng chim cút', tag: 'lecithin', keyNutrient: 'Lecithin',
    whyVi: '5 quả cút = 1 quả gà, Lecithin cực cao, ít gây dị ứng. Tốt cho trí nhớ, thần kinh.',
    servingVi: '5 quả/ngày (luộc hoặc chiên)', budget: 'rẻ', priority: 9 },
  { id: 'dau-phu', nameVi: 'Đậu phụ (nấu chín)', tag: 'lecithin', keyNutrient: 'Lecithin + Protein',
    whyVi: 'Giàu Lecithin cho não bộ. PHẢI nấu chín kỹ (không ăn sống).',
    servingVi: '100-150g/bữa', budget: 'rẻ', priority: 8 },
  { id: 'hat-huong-duong', nameVi: 'Hạt hướng dương', tag: 'vitamin-e', keyNutrient: 'Vitamin E',
    whyVi: 'Vô địch về Vitamin E — chống oxy hóa, đẹp da, bảo vệ tế bào.',
    servingVi: '1 nắm nhỏ (30g)/ngày', budget: 'rẻ', priority: 8 },
  { id: 'hau-bien', nameVi: 'Hàu biển', tag: 'zinc-rich', keyNutrient: 'Kẽm (Zinc)',
    whyVi: 'Rẻ tiền nhưng giàu Kẽm nhất. Tăng miễn dịch, sinh lý, chữa lành vết thương.',
    servingVi: '3-5 con/bữa (nấu chín)', budget: 'rẻ', priority: 9 },
  { id: 'khoai-lang', nameVi: 'Khoai lang', tag: 'fiber-rich', keyNutrient: 'Chất xơ + Beta-carotene',
    whyVi: 'An toàn, gần như KHÔNG có Lectin. Thay thế gạo lứt, bánh mì nguyên cám.',
    servingVi: '1 củ vừa/bữa thay cơm trắng', budget: 'rẻ', priority: 10 },
  { id: 'nghe-tuoi', nameVi: 'Nghệ tươi', tag: 'curcumin', keyNutrient: 'Curcumin',
    whyVi: 'Chống viêm cực mạnh. Kết hợp tiêu đen tăng hấp thu 2000%.',
    servingVi: 'Thêm vào canh/soup + tiêu đen', budget: 'rẻ', priority: 8 },
  { id: 'toi-den', nameVi: 'Tỏi đen', tag: 'anti-inflammatory', keyNutrient: 'S-Allyl Cysteine',
    whyVi: 'Chống oxy hóa gấp 6 lần tỏi trắng. Không gây hôi miệng.',
    servingVi: '2-3 tép/ngày', budget: 'vừa', priority: 7 },
];

// ============================================================================
// 3. DAILY TRACKER (Thói quen ăn uống & sinh hoạt)
// ============================================================================

export interface DailyReminder {
  id: string;
  triggerVi: string;       // Khi nào hiện
  titleVi: string;
  messageVi: string;
  icon: string;
  timing: 'before-meal' | 'during-meal' | 'after-meal' | 'morning' | 'anytime';
}

export const DAILY_REMINDERS: DailyReminder[] = [
  {
    id: 'chew-rule',
    triggerVi: 'Mỗi bữa ăn',
    titleVi: 'Quy tắc 3 Ổn định',
    messageVi: 'Ăn no 70% thôi nhé. Nhai 20-30 lần mỗi miếng. Thức ăn ~40°C là ngon nhất!',
    icon: '😋',
    timing: 'during-meal',
  },
  {
    id: 'no-lie-down',
    triggerVi: 'Sau bữa ăn 5 phút',
    titleVi: 'Đừng nằm ngay!',
    messageVi:
      'Hãy ngồi nghỉ hoặc đi dạo nhẹ ít nhất 30 phút. ' +
      'Nằm ngay sau ăn thay đổi pH dạ dày gây trào ngược.',
    icon: '🚶',
    timing: 'after-meal',
  },
  {
    id: 'brain-hack',
    triggerVi: 'Trước giờ thi / học bài',
    titleVi: 'Mẹo bổ não',
    messageVi:
      'Ăn một chiếc kẹo ngọt hoặc uống chút nước đường trước khi vào phòng thi. ' +
      'Não bộ cần Glucose để nảy số nhanh và thông minh hơn!',
    icon: '🧠',
    timing: 'morning',
  },
  {
    id: 'aflatoxin-habit',
    triggerVi: 'Khi nấu ăn',
    titleVi: 'Mua đến đâu, ăn hết đến đấy',
    messageVi: 'Thức ăn thừa >3 ngày trong tủ lạnh sinh Aflatoxin gây ung thư. Quay lò vi sóng KHÔNG diệt được!',
    icon: '☠️',
    timing: 'anytime',
  },
];

// ============================================================================
// 4. SYMPTOM-BASED DIET (Thực đơn theo triệu chứng)
// ============================================================================

export interface SymptomDietRule {
  id: string;
  conditionId: string;
  nameVi: string;
  // Actions on the meal suggestions
  blockDishes?: string[];           // dish IDs to block entirely
  blockIngredients?: string[];      // ingredients to filter out
  boostIngredients?: string[];      // ingredients to prioritize
  forceTips?: string[];             // Tips to always show
  specialModeVi?: string;          // Special mode message (e.g., "don't force eating")
  icon: string;
}

export const SYMPTOM_DIET_RULES: SymptomDietRule[] = [
  // --- Cảm cúm / Sốt ---
  {
    id: 'flu-mode',
    conditionId: 'flu',
    nameVi: 'Đang bị cảm cúm/sốt',
    boostIngredients: ['tỏi', 'gừng', 'ớt', 'cháo', 'súp', 'nước'],
    specialModeVi:
      'Cơ thể đang cần nghỉ ngơi. Nếu đắng miệng thì không cần ép ăn. ' +
      'Bù nước bằng Oresol. Bữa tối ưu tiên đồ nóng ấm chứa tỏi, gừng.',
    forceTips: [
      '💧 Bù nước bằng Oresol hoặc nước ấm + chanh + mật ong',
      '🍵 Ưu tiên cháo, súp nóng với tỏi, gừng, ớt — giúp tiêu diệt virus',
      '😴 Đắng miệng = cơ thể đang chiến đấu. Không cần ép ăn!',
    ],
    icon: '🤒',
  },
  // --- Sỏi thận ---
  {
    id: 'kidney-stone',
    conditionId: 'kidney-stone',
    nameVi: 'Bệnh sỏi thận',
    blockIngredients: ['trà xanh', 'trà đặc'],
    forceTips: [
      '🚫 Tuyệt đối KHÔNG uống trà xanh thay nước lọc cả ngày',
      '🚫 Không uống trà xanh lúc bụng đói — gây sỏi Oxalat',
      '💧 Uống 2-3 lít nước lọc/ngày. Nước lọc là tốt nhất!',
    ],
    icon: '🪨',
  },
  // --- Gút ---
  {
    id: 'gout',
    conditionId: 'gout',
    nameVi: 'Bệnh Gút',
    blockIngredients: ['thịt chó', 'nấm', 'giá đỗ', 'giá', 'nội tạng', 'lòng', 'gan', 'tim'],
    forceTips: [
      '🚫 Lọc bỏ: thịt chó, thịt đỏ nhiều, nấm, giá đỗ, nội tạng động vật',
      '⚠️ Các thực phẩm trên chứa Purin rất lớn → sinh axit Uric → đau gút',
      '💧 Uống nhiều nước để đào thải axit Uric',
    ],
    icon: '🦶',
  },
  // --- Mỡ máu cao (Dyslipidemia) ---
  {
    id: 'dyslipidemia-vegan-block',
    conditionId: 'dyslipidemia',
    nameVi: 'Mỡ máu cao',
    forceTips: [
      '🚨 KHÔNG ăn chay cắt mỡ hoàn toàn! Sẽ giảm HDL (mỡ tốt) và tăng vọt Triglycerid (mỡ xấu)',
      '🥚 Vẫn nên ăn 3 quả trứng/tuần (nửa quả mỗi bữa) nếu cholesterol < 6.2',
      '🐟 Tăng Omega-3: cá thu, hạt tía tô. Giảm tinh bột trắng.',
    ],
    icon: '🩸',
  },
  // --- Trào ngược dạ dày ---
  {
    id: 'gerd-rules',
    conditionId: 'gerd',
    nameVi: 'Trào ngược dạ dày',
    blockIngredients: ['cà phê', 'sô-cô-la', 'bạc hà', 'nước có ga'],
    forceTips: [
      '😋 Quy tắc 3 Ổn định: no 70%, nhai 20-30 lần, thức ăn ~40°C',
      '🚶 Sau ăn KHÔNG nằm ngay! Ngồi/đi nhẹ ít nhất 30 phút',
      '🍽️ Ăn đúng giờ cố định. Giảm chua cay, dầu mỡ.',
    ],
    icon: '🔥',
  },
];

// ============================================================================
// SMART TIPS (Mẹo ăn uống thông minh)
// ============================================================================

export interface SmartTip {
  id: string;
  conditionVi: string;
  tipVi: string;
  icon: string;
  priority: number;
  triggerKeywords: string[];
}

export const SMART_TIPS: SmartTip[] = [
  { id: 'digest-stimulate', conditionVi: 'Gầy, tiêu hóa kém', icon: '🍎', priority: 9,
    tipVi: 'Ăn 1-2 miếng hoa quả yêu thích TRƯỚC bữa ăn. Não bộ kích thích tiết 30% dịch vị, giúp tiêu hóa tốt hơn.',
    triggerKeywords: ['gầy', 'tiêu hóa kém', 'low-stomach-acid', 'gut-dysbiosis'] },
  { id: 'salt-substitute', conditionVi: 'Huyết áp / Thận', icon: '🍋', priority: 9,
    tipVi: 'Giảm muối dưới 5g/ngày. Dùng GIẤM hoặc CHANH thay vị mặn — vừa ngon vừa an toàn.',
    triggerKeywords: ['hypertension', 'thận', 'kidney', 'kidney-stone'] },
  { id: 'aflatoxin-warning', conditionVi: 'Mọi người', icon: '☠️', priority: 10,
    tipVi: 'Nấu bữa nào ăn bữa đó. Thức ăn thừa >3 ngày = Aflatoxin gây ung thư. Lò vi sóng KHÔNG diệt được.',
    triggerKeywords: [] },
  { id: 'oil-rule', conditionVi: 'Khi chiên rán', icon: '🍳', priority: 8,
    tipVi: 'Chiên rán nhiệt cao → MỠ LỢN. Dầu thực vật chỉ xào nhẹ. Tuyệt đối không dùng lại dầu cũ.',
    triggerKeywords: ['chiên', 'rán'] },
  { id: 'chew-rule', conditionVi: 'Mỗi bữa ăn', icon: '😋', priority: 7,
    tipVi: 'Nhai 20-30 lần mỗi miếng. Ăn no 70% thôi. Chừa 30% cho dạ dày nhào trộn.',
    triggerKeywords: [] },
  { id: 'khoai-lang-swap', conditionVi: 'Thay tinh bột', icon: '🍠', priority: 8,
    tipVi: 'Thay gạo lứt/bánh mì bằng KHOAI LANG hoặc BÚN — an toàn, không Lectin.',
    triggerKeywords: ['gạo lứt', 'bánh mì nguyên cám', 'visceral-fat', 'dyslipidemia'] },
  { id: 'brain-glucose', conditionVi: 'Học sinh / Trước thi', icon: '🧠', priority: 7,
    tipVi: 'Ăn kẹo ngọt hoặc uống nước đường trước khi thi. Não cần Glucose để nảy số nhanh hơn!',
    triggerKeywords: ['student', 'thi', 'học'] },
  { id: 'vegan-danger', conditionVi: 'Mỡ máu cao', icon: '🚨', priority: 10,
    tipVi: 'KHÔNG ăn chay cắt mỡ hoàn toàn! Giảm HDL (mỡ tốt), tăng vọt Triglycerid. Vẫn cần 3 trứng/tuần.',
    triggerKeywords: ['dyslipidemia', 'mỡ máu', 'cholesterol'] },
  { id: 'no-lie-after-eat', conditionVi: 'Sau bữa ăn', icon: '🚶', priority: 8,
    tipVi: 'Đừng nằm ngay sau ăn! Ngồi nghỉ hoặc đi dạo nhẹ ít nhất 30 phút để tránh trào ngược.',
    triggerKeywords: ['gerd', 'trào ngược'] },
];

// ============================================================================
// LOOKUP HELPERS
// ============================================================================

export function getWarningsForIngredients(ingredients: string[]): CookingWarning[] {
  const found: CookingWarning[] = [];
  const seen = new Set<string>();
  for (const ing of ingredients) {
    const lower = ing.toLowerCase();
    for (const w of COOKING_WARNINGS) {
      if (seen.has(w.id) || w.triggerKeywords.length === 0) continue;
      if (w.triggerKeywords.some(k => lower.includes(k.toLowerCase()))) {
        seen.add(w.id);
        found.push(w);
      }
    }
  }
  return found;
}

export function getSmartTipsForProfile(conditions: string[], ingredients: string[]): SmartTip[] {
  const allKeywords = [...conditions, ...ingredients.map(i => i.toLowerCase())];
  return SMART_TIPS.filter(tip => {
    if (tip.triggerKeywords.length === 0) return true;
    return tip.triggerKeywords.some(k => allKeywords.some(a => a.includes(k.toLowerCase())));
  }).sort((a, b) => b.priority - a.priority);
}

export function getSymptomRules(conditionIds: string[]): SymptomDietRule[] {
  return SYMPTOM_DIET_RULES.filter(r => conditionIds.includes(r.conditionId));
}
