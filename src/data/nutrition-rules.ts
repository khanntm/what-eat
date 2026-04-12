// NUTRITION RULES DATABASE — BS Trần Văn Phúc

// --- Fist Rule (Quy tắc nắm đấm) ---
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
    gender: 'male',
    totalFistfuls: 9,
    veggieFistfuls: 5,
    fruitFistfuls: 4,
    perMeal: { morning: 2, lunch: 4, dinner: 3 },
    ruleVi: 'Nam: 9 nắm tay/ngày (5 rau củ + 4 hoa quả)',
  },
  female: {
    gender: 'female',
    totalFistfuls: 7,
    veggieFistfuls: 4,
    fruitFistfuls: 3,
    perMeal: { morning: 1, lunch: 3, dinner: 3 },
    ruleVi: 'Nữ: 7 nắm tay/ngày (4 rau củ + 3 hoa quả)',
  },
};

// --- Stomach Rule (Quy tắc dạ dày) ---
export const STOMACH_RULES = {
  maxFullness: 0.7,  // Chỉ ăn no 7 phần
  chewCount: { min: 20, max: 30 },
  ruleVi: 'Chỉ ăn no 70% (7 phần). Nhai kỹ 20-30 lần mỗi miếng.',
  whyVi: 'Chừa 30% không gian cho dạ dày nhào trộn thức ăn với axit.',
};

// --- Superfoods Database (expanded) ---
export interface SuperfoodInfo {
  id: string;
  nameVi: string;
  tag: import('./dishes').SuperfoodTag;
  keyNutrient: string;
  whyVi: string;           // Giải thích đơn giản
  servingVi: string;        // Khẩu phần gợi ý
  budget: 'rẻ' | 'vừa';
  priority: number;         // 1-10, cao = ưu tiên gợi ý
}

export const SUPERFOODS_DB: SuperfoodInfo[] = [
  {
    id: 'hat-tia-to',
    nameVi: 'Hạt tía tô',
    tag: 'omega3',
    keyNutrient: 'Omega-3 (ALA)',
    whyVi: 'Đứng số 1 về Omega-3, vượt cả gan cá và cá hồi. Bổ não, giảm mỡ máu.',
    servingVi: '1 muỗng canh/ngày rắc lên cơm hoặc salad',
    budget: 'rẻ',
    priority: 10,
  },
  {
    id: 'trung-chim-cut',
    nameVi: 'Trứng chim cút',
    tag: 'lecithin',
    keyNutrient: 'Lecithin',
    whyVi: '5 quả cút = 1 quả gà, Lecithin cực cao, ít gây dị ứng. Tốt cho trí nhớ, thần kinh.',
    servingVi: '5 quả/ngày (luộc hoặc chiên)',
    budget: 'rẻ',
    priority: 9,
  },
  {
    id: 'dau-phu',
    nameVi: 'Đậu phụ (đã nấu chín)',
    tag: 'lecithin',
    keyNutrient: 'Lecithin + Protein thực vật',
    whyVi: 'Giàu Lecithin cho não bộ. PHẢI nấu chín kỹ (không ăn sống).',
    servingVi: '100-150g/bữa',
    budget: 'rẻ',
    priority: 8,
  },
  {
    id: 'hat-huong-duong',
    nameVi: 'Hạt hướng dương',
    tag: 'vitamin-e',
    keyNutrient: 'Vitamin E',
    whyVi: 'Vô địch về Vitamin E — chống oxy hóa, đẹp da, bảo vệ tế bào.',
    servingVi: '1 nắm nhỏ (30g)/ngày',
    budget: 'rẻ',
    priority: 8,
  },
  {
    id: 'hau-bien',
    nameVi: 'Hàu biển',
    tag: 'zinc-rich',
    keyNutrient: 'Kẽm (Zinc)',
    whyVi: 'Rẻ tiền nhưng giàu Kẽm nhất. Tăng miễn dịch, sinh lý, chữa lành vết thương.',
    servingVi: '3-5 con/bữa (nấu chín)',
    budget: 'rẻ',
    priority: 9,
  },
  {
    id: 'khoai-lang',
    nameVi: 'Khoai lang',
    tag: 'fiber-rich',
    keyNutrient: 'Chất xơ + Beta-carotene',
    whyVi: 'An toàn, gần như KHÔNG có Lectin (thay thế gạo lứt, bánh mì nguyên cám). Giàu chất xơ.',
    servingVi: '1 củ vừa/bữa thay cơm trắng',
    budget: 'rẻ',
    priority: 10,
  },
  {
    id: 'nghe-tuoi',
    nameVi: 'Nghệ tươi',
    tag: 'curcumin',
    keyNutrient: 'Curcumin',
    whyVi: 'Chống viêm cực mạnh. Kết hợp tiêu đen tăng hấp thu 2000%.',
    servingVi: 'Thêm vào canh/soup + tiêu đen',
    budget: 'rẻ',
    priority: 8,
  },
  {
    id: 'toi-den',
    nameVi: 'Tỏi đen',
    tag: 'anti-inflammatory',
    keyNutrient: 'S-Allyl Cysteine',
    whyVi: 'Chống oxy hóa gấp 6 lần tỏi trắng. Không gây hôi miệng.',
    servingVi: '2-3 tép/ngày',
    budget: 'vừa',
    priority: 7,
  },
];

// --- Cooking Warnings Database ---
export interface CookingWarning {
  id: import('./dishes').CookingWarningId;
  titleVi: string;
  messageVi: string;
  alternativeVi?: string;   // Gợi ý thay thế
  dangerLevel: 'info' | 'warning' | 'danger';
  icon: string;
  triggerKeywords: string[]; // Match trong ingredients[]
}

export const COOKING_WARNINGS: CookingWarning[] = [
  {
    id: 'lectin-grain',
    titleVi: 'Cảnh báo Lectin trong ngũ cốc nguyên cám',
    messageVi: 'Vỏ cám của bánh mì nguyên cám và gạo lứt chứa hàm lượng Lectin cực cao, gây viêm tấy cơ thể, đau khớp, viêm ruột. KHÔNG nên ăn hàng ngày.',
    alternativeVi: 'Thay bằng KHOAI LANG — an toàn, gần như không có Lectin, giàu chất xơ và Beta-carotene.',
    dangerLevel: 'danger',
    icon: '🚫',
    triggerKeywords: ['bánh mì nguyên cám', 'gạo lứt', 'whole wheat', 'nguyên cám', 'brown rice', 'lứt'],
  },
  {
    id: 'lectin-bean-raw',
    titleVi: 'CẤM ăn sống đậu đỗ!',
    messageVi: 'Đậu đỗ sống chứa Lectin (Phytohaemagglutinin) — độc tố gây nôn, tiêu chảy, ngộ độc nặng. PHẢI nấu sôi >100°C ít nhất 10 phút. KHÔNG dùng nồi nấu chậm (slow cooker) — nhiệt không đủ.',
    dangerLevel: 'danger',
    icon: '⛔',
    triggerKeywords: ['đậu đỏ', 'đậu nành', 'đậu đen', 'đậu xanh', 'đậu lăng', 'đậu hà lan'],
  },
  {
    id: 'lectin-soy-sprout',
    titleVi: 'Cấm ăn sống giá đỗ tương',
    messageVi: 'Giá đỗ XANH thì an toàn ăn sống. Nhưng giá đỗ TƯƠNG (đậu nành) tuyệt đối CẤM ăn sống — chứa Lectin nguy hiểm. Phải xào/luộc chín.',
    dangerLevel: 'danger',
    icon: '⚠️',
    triggerKeywords: ['giá đỗ tương', 'giá đậu nành', 'giá đậu tương'],
  },
  {
    id: 'aflatoxin-leftover',
    titleVi: 'Nấu bữa nào ăn bữa đó!',
    messageVi: 'Thức ăn thừa để tủ lạnh quá 3 ngày sinh nấm mốc Aflatoxin — gây UNG THƯ GAN. Aflatoxin chịu được 280°C, quay lò vi sóng KHÔNG tiêu diệt được.',
    dangerLevel: 'danger',
    icon: '☠️',
    triggerKeywords: [],  // This is a general warning, shown as Smart Tip
  },
  {
    id: 'oil-high-heat',
    titleVi: 'Quy tắc Dầu Mỡ khi nấu',
    messageVi: 'CHIÊN RÁN nhiệt cao: dùng MỠ LỢN (bền nhiệt, không sinh chất độc). DẦU THỰC VẬT (dầu ăn, dầu oliu): chỉ dùng XÀO NẤU nhẹ nhàng. Dầu thực vật ở nhiệt cao sinh ra Aldehyde gây ung thư.',
    dangerLevel: 'warning',
    icon: '🍳',
    triggerKeywords: ['dầu ăn', 'dầu thực vật', 'chiên', 'rán'],
  },
  {
    id: 'raw-salad',
    titleVi: 'Lưu ý rau sống',
    messageVi: 'Rau sống có nguy cơ nhiễm khuẩn, ký sinh trùng. Rửa kỹ bằng nước muối. Người miễn dịch yếu, mang thai nên hấp/luộc nhẹ.',
    dangerLevel: 'info',
    icon: '🥗',
    triggerKeywords: ['rau sống', 'salad', 'gỏi'],
  },
  {
    id: 'juice-no-fiber',
    titleVi: 'Nước ép mất chất xơ',
    messageVi: 'Nước ép loại bỏ chất xơ, gây tăng đường huyết đột ngột. Ăn NGUYÊN QUẢ tốt hơn gấp nhiều lần.',
    dangerLevel: 'warning',
    icon: '🧃',
    triggerKeywords: ['nước ép', 'ép trái cây', 'juice', 'sinh tố'],
  },
];

// --- Smart Tips by Symptom ---
export interface SmartTip {
  id: string;
  conditionVi: string;
  tipVi: string;
  icon: string;
  priority: number;
  triggerKeywords: string[];  // Match in user conditions or lifestyle
}

export const SMART_TIPS: SmartTip[] = [
  {
    id: 'digest-stimulate',
    conditionVi: 'Gầy, tiêu hóa kém',
    tipVi: 'Ăn 1-2 miếng hoa quả yêu thích TRƯỚC bữa ăn. Não bộ sẽ kích thích tiết ra 30% dịch vị axit HCl, giúp tiêu hóa tốt hơn.',
    icon: '🍎',
    priority: 9,
    triggerKeywords: ['gầy', 'tiêu hóa kém', 'low-stomach-acid', 'gut-dysbiosis'],
  },
  {
    id: 'salt-substitute',
    conditionVi: 'Huyết áp cao / Bệnh thận',
    tipVi: 'Giảm muối dưới 5g/ngày. Dùng GIẤM hoặc CHANH để thay thế vị mặn trong nấu ăn — vừa ngon vừa an toàn cho thận.',
    icon: '🍋',
    priority: 9,
    triggerKeywords: ['hypertension', 'thận', 'kidney'],
  },
  {
    id: 'aflatoxin-warning',
    conditionVi: 'Tất cả mọi người',
    tipVi: 'Nấu bữa nào ăn bữa đó. Thức ăn thừa >3 ngày trong tủ lạnh sinh Aflatoxin gây ung thư gan. Quay lò vi sóng KHÔNG diệt được.',
    icon: '☠️',
    priority: 10,
    triggerKeywords: [],  // Always show
  },
  {
    id: 'oil-rule',
    conditionVi: 'Khi chiên rán',
    tipVi: 'Chiên rán nhiệt cao → dùng MỠ LỢN. Dầu thực vật chỉ dùng xào nhẹ. Dầu thực vật ở nhiệt cao sinh Aldehyde gây ung thư.',
    icon: '🍳',
    priority: 8,
    triggerKeywords: ['chiên', 'rán'],
  },
  {
    id: 'chew-rule',
    conditionVi: 'Mọi bữa ăn',
    tipVi: 'Nhai kỹ 20-30 lần mỗi miếng. Chỉ ăn no 70%. Chừa 30% cho dạ dày nhào trộn.',
    icon: '😋',
    priority: 7,
    triggerKeywords: [],  // Always show
  },
  {
    id: 'khoai-lang-swap',
    conditionVi: 'Thay thế tinh bột',
    tipVi: 'Thay cơm trắng/gạo lứt/bánh mì bằng KHOAI LANG — an toàn, không Lectin, giàu chất xơ và Beta-carotene.',
    icon: '🍠',
    priority: 8,
    triggerKeywords: ['gạo lứt', 'bánh mì nguyên cám', 'visceral-fat', 'dyslipidemia'],
  },
];

// --- Lookup helpers ---
export function getWarningsForIngredients(ingredients: string[]): CookingWarning[] {
  const found: CookingWarning[] = [];
  const seen = new Set<string>();
  for (const ing of ingredients) {
    const lower = ing.toLowerCase();
    for (const w of COOKING_WARNINGS) {
      if (seen.has(w.id)) continue;
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
    if (tip.triggerKeywords.length === 0) return true; // Always show
    return tip.triggerKeywords.some(k => allKeywords.some(a => a.includes(k.toLowerCase())));
  }).sort((a, b) => b.priority - a.priority);
}
