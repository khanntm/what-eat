import type {
  UserProfile, Gender, HealthConditionId, MicronutrientId,
} from '@/data/health-types';
import type { Dish, MealTime } from '@/data/dishes';
import { dishes } from '@/data/dishes';
import { SUPERFOODS, getSuperfoodsForCondition } from '@/data/superfoods';
import { ANTI_PATTERNS } from '@/data/anti-patterns';
import { RECOMMENDATION_RULES } from '@/data/recommendations';
import { getMicronutrientsForCondition } from '@/data/micronutrients';
import { FIST_RULES, STOMACH_RULES, COOKING_WARNINGS, SMART_TIPS, SUPERFOODS_DB, getWarningsForIngredients, getSmartTipsForProfile } from '@/data/nutrition-rules';

// ============================================================================
// LUỒNG 2: DAILY DIET SUGGESTION ENGINE
// Logic gợi ý thực đơn hàng ngày dựa trên UserProfile
//
// 3 SUB-ENGINES:
//   A. Meal Planner      — Chọn món cho sáng/trưa/tối
//   B. Fiber Calculator   — Quy tắc nắm đấm (Nam 9, Nữ 7)
//   C. Anti-pattern Scanner — Quét thực đơn → cảnh báo Lectin, etc.
// ============================================================================

// --- Output Types ---

export interface DailyDietPlan {
  meals: MealSuggestion[];
  fiberTarget: FiberTarget;
  dietRules: DietRule[];
  notifications: DietNotification[];
  superfoodTips: SuperfoodTip[];
  smartTips: SmartTipOutput[];
  stomachRule: { ruleVi: string; whyVi: string };
}

export interface SmartTipOutput {
  icon: string;
  conditionVi: string;
  tipVi: string;
}

export interface MealSuggestion {
  mealTime: MealTime;
  labelVi: string;            // "Bữa sáng", "Bữa trưa", "Bữa tối"
  dishes: ScoredDish[];       // Top 3 món gợi ý
  superfoodAddOns: string[];  // Siêu thực phẩm nên thêm
  reminderVi?: string;        // VD: "Nhai kỹ 20-30 lần/miếng"
}

export interface ScoredDish {
  dish: Dish;
  score: number;
  reasons: string[];           // Tại sao gợi ý món này
}

export interface FiberTarget {
  totalFistfuls: number;       // Tổng nắm tay/ngày
  veggiesFistfuls: number;     // Rau củ
  fruitsFistfuls: number;      // Hoa quả
  genderVi: string;            // "Nam: 9 nắm", "Nữ: 7 nắm"
  perMeal: {
    morning: number;
    lunch: number;
    dinner: number;
  };
  tipVi: string;
}

export interface DietRule {
  id: string;
  nameVi: string;
  ruleVi: string;
  priority: number;
  source: string;              // "BS Trần Văn Phúc"
}

export interface DietNotification {
  type: 'warning' | 'danger' | 'info';
  titleVi: string;
  messageVi: string;
  triggerIngredients: string[];  // Nguyên liệu nào trigger
  icon: string;
}

export interface SuperfoodTip {
  nameVi: string;
  tipVi: string;
  mealTime: MealTime;
}

// ============================================================================
// ANTI-PATTERN SCANNER — Ingredient keyword database
// Quét nguyên liệu trong thực đơn → phát cảnh báo
// ============================================================================

interface IngredientAlert {
  keywords: string[];           // Từ khóa match trong ingredients[]
  dangerLevel: 'warning' | 'danger';
  titleVi: string;
  messageVi: string;
  icon: string;
}

const INGREDIENT_ALERTS: IngredientAlert[] = [
  {
    keywords: ['bánh mì nguyên cám', 'bánh mì đen', 'whole wheat', 'nguyên cám'],
    dangerLevel: 'warning',
    titleVi: 'Cảnh báo Lectin trong bánh mì nguyên cám',
    messageVi:
      'Bánh mì nguyên cám chứa Lectin và Phytic acid — chất kháng dinh dưỡng ức chế hấp thu khoáng chất (Canxi, Kẽm, Sắt). ' +
      'Nên chọn bánh mì sourdough (lên men tự nhiên) để phân giải Lectin, hoặc nướng kỹ ở nhiệt độ cao.',
    icon: '🍞',
  },
  {
    keywords: ['gạo lứt', 'brown rice', 'cơm gạo lứt'],
    dangerLevel: 'warning',
    titleVi: 'Cảnh báo Lectin & Phytic acid trong gạo lứt',
    messageVi:
      'Gạo lứt chứa Lectin và Phytic acid trong lớp vỏ cám. ' +
      'PHẢI ngâm gạo lứt ít nhất 12-24 tiếng trước khi nấu để giảm 50-70% chất kháng dinh dưỡng. ' +
      'Nấu bằng nồi áp suất hiệu quả hơn nồi thường.',
    icon: '🍚',
  },
  {
    keywords: ['đậu đỏ', 'đậu nành', 'đậu đen', 'đậu xanh', 'đậu lăng', 'đậu hà lan',
               'red bean', 'soybean', 'black bean', 'lentil'],
    dangerLevel: 'danger',
    titleVi: 'Cảnh báo độc tố Lectin trong đậu đỗ',
    messageVi:
      'Đậu đỗ sống chứa Lectin (Phytohaemagglutinin) — độc tố gây nôn, tiêu chảy, ngộ độc nặng. ' +
      'QUY TẮC BẮT BUỘC: Ngâm qua đêm (8-12h) + Nấu sôi >100°C ít nhất 10 phút. ' +
      'KHÔNG dùng nồi slow cooker (nhiệt độ không đủ phá hủy Lectin). ' +
      'Đậu nành: PHẢI lên men (tempeh, miso, natto) hoặc nấu chín kỹ.',
    icon: '⚠️',
  },
  {
    keywords: ['đậu phụ sống', 'tào phớ', 'sữa đậu nành'],
    dangerLevel: 'warning',
    titleVi: 'Lưu ý về sản phẩm đậu nành',
    messageVi:
      'Sữa đậu nành và đậu phụ cần được đun sôi kỹ (>95°C trong 10 phút). ' +
      'Sữa đậu nành tự nấu: cẩn thận hiện tượng "sôi giả" — bọt trào lên nhưng chưa thực sự sôi. Phải đun thêm 5-10 phút.',
    icon: '🥛',
  },
  {
    keywords: ['rau sống', 'salad sống', 'gỏi'],
    dangerLevel: 'warning',
    titleVi: 'Lưu ý rau sống',
    messageVi:
      'Rau sống có nguy cơ nhiễm khuẩn, ký sinh trùng. ' +
      'Rửa kỹ bằng nước muối hoặc giấm. Người miễn dịch yếu, mang thai nên hấp/luộc nhẹ thay vì ăn sống.',
    icon: '🥗',
  },
  {
    keywords: ['nước ép', 'ép trái cây', 'juice', 'sinh tố'],
    dangerLevel: 'warning',
    titleVi: 'Nước ép mất chất xơ',
    messageVi:
      'Nước ép loại bỏ chất xơ, khiến đường huyết tăng đột ngột. ' +
      'Ăn nguyên quả tốt hơn gấp nhiều lần. Nếu uống sinh tố, giữ nguyên bã (xay không lọc).',
    icon: '🧃',
  },
];

// ============================================================================
// CORE ALGORITHM: Daily Diet Suggestion
// ============================================================================

/**
 * THUẬT TOÁN DAILY DIET SUGGESTION
 *
 * Input:  UserProfile
 * Output: DailyDietPlan (meals + fiber + rules + notifications)
 *
 * PSEUDOCODE:
 * ─────────────────────────────────────────────────────────
 * 1. TÍNH CHẤT XƠ (Quy tắc nắm đấm)
 *    - Nam: 9 nắm/ngày (5 rau + 4 quả)
 *    - Nữ: 7 nắm/ngày (4 rau + 3 quả)
 *    - Chia đều cho 3 bữa (sáng ít hơn, trưa/tối nhiều hơn)
 *
 * 2. TẠO DIET RULES (từ conditions)
 *    - Nếu GERD → đính kèm "3 Ổn định - 2 Giảm" + nhắc nhai 20-30 lần
 *    - Nếu gallstone → ăn 2 trứng chiên mỡ/ngày
 *    - Nếu dyslipidemia → tăng Omega-3, giảm tinh bột trắng
 *    - Nếu visceral-fat → KHÔNG ăn sau 20h
 *
 * 3. CHỌN MÓN (Scoring Algorithm)
 *    FOR each mealTime in [sáng, trưa, tối]:
 *      FOR each dish in dishes.filter(mealTime):
 *        score = 0
 *        // Boost: món có nguyên liệu khớp superfood tốt cho conditions
 *        score += matchSuperfoods(dish, profile.conditions)
 *        // Boost: món healthy
 *        score += dish.tags.includes('healthy') ? 2 : 0
 *        // Penalty: món có nguyên liệu trong avoidFor
 *        score -= matchAvoidFoods(dish, profile.conditions)
 *        // Penalty: GERD → giảm điểm món chua/cay/dầu mỡ
 *        score -= gerdPenalty(dish, profile)
 *      SORT by score DESC, TAKE top 3
 *
 * 4. QUÉT ANTI-PATTERN (scan nguyên liệu)
 *    FOR each selected dish:
 *      FOR each ingredient in dish.ingredients:
 *        IF matchKeyword(ingredient, INGREDIENT_ALERTS):
 *          → Push notification cảnh báo Lectin / Phytic acid
 *
 * 5. THÊM SUPERFOOD TIPS
 *    - Gợi ý thêm siêu thực phẩm vào từng bữa
 * ─────────────────────────────────────────────────────────
 */
export function generateDailyDiet(profile: UserProfile): DailyDietPlan {
  // ── BƯỚC 1: Tính chất xơ ──
  const fiberTarget = calculateFiberTarget(profile.gender);

  // ── BƯỚC 2: Tạo diet rules từ conditions ──
  const dietRules = buildDietRules(profile);

  // ── BƯỚC 3: Chọn món cho 3 bữa ──
  const meals = generateMeals(profile, dietRules);

  // ── BƯỚC 4: Quét anti-pattern trên toàn bộ thực đơn ──
  const allSelectedDishes = meals.flatMap(m => m.dishes.map(d => d.dish));
  const notifications = scanAntiPatterns(allSelectedDishes, profile);

  // ── BƯỚC 5: Superfood tips ──
  const superfoodTips = generateSuperfoodTips(profile);

  // ── BƯỚC 6: Smart Tips (BS Phúc) ──
  const allIngredients = allSelectedDishes.flatMap(d => d.ingredients);
  const smartTipsRaw = getSmartTipsForProfile(
    profile.conditions as string[],
    allIngredients,
  );
  const smartTips: SmartTipOutput[] = smartTipsRaw.map(t => ({
    icon: t.icon,
    conditionVi: t.conditionVi,
    tipVi: t.tipVi,
  }));

  // ── BƯỚC 7: Cooking warnings from new nutrition-rules DB ──
  const cookingWarnings = getWarningsForIngredients(allIngredients);
  for (const cw of cookingWarnings) {
    const existing = notifications.find(n => n.titleVi === cw.titleVi);
    if (!existing) {
      notifications.push({
        type: cw.dangerLevel === 'danger' ? 'danger' : 'warning',
        titleVi: cw.titleVi,
        messageVi: cw.messageVi + (cw.alternativeVi ? `\n\n💡 ${cw.alternativeVi}` : ''),
        triggerIngredients: cw.triggerKeywords,
        icon: cw.icon,
      });
    }
  }

  return {
    meals, fiberTarget, dietRules, notifications, superfoodTips, smartTips,
    stomachRule: { ruleVi: STOMACH_RULES.ruleVi, whyVi: STOMACH_RULES.whyVi },
  };
}

// ============================================================================
// SUB-ENGINE A: Fiber Calculator (Quy tắc nắm đấm)
// ============================================================================

function calculateFiberTarget(gender: Gender): FiberTarget {
  const isMale = gender === 'male';
  const total = isMale ? 9 : 7;
  const veggies = isMale ? 5 : 4;
  const fruits = isMale ? 4 : 3;

  return {
    totalFistfuls: total,
    veggiesFistfuls: veggies,
    fruitsFistfuls: fruits,
    genderVi: isMale
      ? 'Nam: 9 nắm tay/ngày (5 rau củ + 4 hoa quả)'
      : 'Nữ: 7 nắm tay/ngày (4 rau củ + 3 hoa quả)',
    perMeal: {
      // Sáng ít hơn (1-2 nắm), trưa/tối nhiều hơn
      morning: isMale ? 2 : 1,
      lunch: isMale ? 4 : 3,
      dinner: isMale ? 3 : 3,
    },
    tipVi:
      'Mỗi "nắm tay" ≈ 80g rau củ hoặc 1 quả trái cây cỡ vừa. ' +
      'Ưu tiên rau lá xanh đậm (cải bó xôi, rau muống) + quả ít ngọt (ổi, bưởi, táo).',
  };
}

// ============================================================================
// SUB-ENGINE B: Diet Rules Builder
// ============================================================================

function buildDietRules(profile: UserProfile): DietRule[] {
  const rules: DietRule[] = [];

  // ── GERD → "3 Ổn định – 2 Giảm" ──
  if (profile.conditions.includes('gerd')) {
    rules.push(
      {
        id: 'gerd-3on-2giam',
        nameVi: 'Quy tắc 3 Ổn định – 2 Giảm',
        ruleVi:
          '3 ỔN ĐỊNH: (1) Ăn đúng giờ cố định mỗi ngày, ' +
          '(2) Chỉ ăn no 70% (đứng dậy khi còn hơi thèm), ' +
          '(3) Nhiệt độ thức ăn ~40°C (ấm, không quá nóng/lạnh).\n' +
          '2 GIẢM: (1) Giảm dầu mỡ, đồ chiên rán, ' +
          '(2) Giảm chua cay (chanh, giấm, ớt, tiêu).',
        priority: 10,
        source: 'BS Trần Văn Phúc',
      },
      {
        id: 'gerd-chew',
        nameVi: 'Nhai kỹ 20-30 lần',
        ruleVi:
          'Mỗi miếng thức ăn PHẢI nhai 20-30 lần trước khi nuốt. ' +
          'Nhai kỹ giúp: (1) Trộn enzyme nước bọt phân giải tinh bột, ' +
          '(2) Giảm tải cho dạ dày, (3) No nhanh hơn → tránh ăn quá no.',
        priority: 9,
        source: 'BS Trần Văn Phúc',
      },
    );
  }

  // ── GERD → không nằm ngay sau ăn ──
  if (profile.conditions.includes('gerd') || profile.conditions.includes('low-stomach-acid')) {
    rules.push({
      id: 'gerd-no-lie-down',
      nameVi: 'Không nằm ngay sau ăn',
      ruleVi:
        'Đợi ít nhất 2-3 tiếng sau ăn mới nằm xuống. ' +
        'Nâng cao đầu giường 15-20cm khi ngủ để tránh trào ngược ban đêm.',
      priority: 8,
      source: 'BS Trần Văn Phúc',
    });
  }

  // ── Gallstone → trứng chiên ──
  if (profile.conditions.includes('gallstone')) {
    rules.push({
      id: 'gallstone-egg',
      nameVi: 'Trứng kích thích mật (1 mũi tên trúng 2 đích)',
      ruleVi:
        'Ăn 2 quả trứng chiên mỡ/ngày (bữa sáng hoặc trưa). ' +
        'Chất béo trong trứng kích thích túi mật co bóp, tống sỏi nhỏ ra ngoài tự nhiên. ' +
        'KHÔNG nhịn ăn kéo dài — mật ứ đọng tạo thêm sỏi.',
      priority: 9,
      source: 'BS Trần Văn Phúc',
    });
  }

  // ── Dyslipidemia → Omega-3 + giảm tinh bột ──
  if (profile.conditions.includes('dyslipidemia')) {
    rules.push({
      id: 'lipid-omega3',
      nameVi: 'Tăng Omega-3, giảm tinh bột trắng',
      ruleVi:
        'Ăn cá béo (cá hồi, cá thu) 2-3 bữa/tuần. ' +
        'Bổ sung hạt (tía tô, lanh, chia) mỗi ngày. ' +
        'Thay cơm trắng bằng khoai lang, yến mạch. Dầu oliu thay mỡ lợn.',
      priority: 8,
      source: 'BS Trần Văn Phúc',
    });
  }

  // ── Visceral fat → không ăn khuya ──
  if (profile.conditions.includes('visceral-fat')) {
    rules.push({
      id: 'visceral-no-late',
      nameVi: 'KHÔNG ăn sau 20h',
      ruleVi:
        'Bữa tối trước 19h, nhẹ nhàng, giàu protein + rau. ' +
        'Không ăn sau 20h — thức ăn buổi tối chuyển hóa thành mỡ nội tạng. ' +
        'Nếu đói sau 20h: uống nước ấm hoặc trà thảo mộc.',
      priority: 9,
      source: 'BS Trần Văn Phúc',
    });
  }

  // ── Hypertension → giảm muối ──
  if (profile.conditions.includes('hypertension')) {
    rules.push({
      id: 'hypertension-salt',
      nameVi: 'Giảm muối < 5g/ngày',
      ruleVi:
        'Giới hạn muối < 5g/ngày (≈ 1 muỗng cà phê). ' +
        'Tránh: mắm, nước tương, đồ muối chua, snack mặn. ' +
        'Thay muối bằng gia vị tự nhiên: tỏi, gừng, sả, chanh.',
      priority: 8,
      source: 'BS Trần Văn Phúc',
    });
  }

  // ── Always: fiber rule ──
  rules.push({
    id: 'fiber-fistfuls',
    nameVi: 'Quy tắc nắm đấm chất xơ',
    ruleVi: profile.gender === 'male'
      ? 'Nam: 9 nắm tay rau quả/ngày — Sáng 2 nắm, Trưa 4 nắm, Tối 3 nắm.'
      : 'Nữ: 7 nắm tay rau quả/ngày — Sáng 1 nắm, Trưa 3 nắm, Tối 3 nắm.',
    priority: 7,
    source: 'BS Trần Văn Phúc',
  });

  return rules.sort((a, b) => b.priority - a.priority);
}

// ============================================================================
// SUB-ENGINE C: Meal Planner (Scoring Algorithm)
// ============================================================================

function generateMeals(profile: UserProfile, dietRules: DietRule[]): MealSuggestion[] {
  const mealTimes: { time: MealTime; labelVi: string }[] = [
    { time: 'sáng', labelVi: 'Bữa sáng' },
    { time: 'trưa', labelVi: 'Bữa trưa' },
    { time: 'tối',  labelVi: 'Bữa tối' },
  ];

  // Lấy superfoods tốt cho user
  const goodSuperfoods = new Set<string>();
  const avoidSuperfoods = new Set<string>();
  for (const condId of profile.conditions) {
    const { recommended, avoid } = getSuperfoodsForCondition(condId);
    recommended.forEach(s => goodSuperfoods.add(s.nameVi));
    avoid.forEach(s => avoidSuperfoods.add(s.nameVi));
  }

  // Relevant nutrient food sources
  const goodIngredientKeywords = buildGoodIngredientKeywords(profile);
  const avoidIngredientKeywords = buildAvoidIngredientKeywords(profile);

  const hasGerd = profile.conditions.includes('gerd');

  return mealTimes.map(({ time, labelVi }) => {
    // Filter dishes by meal time
    const candidates = dishes.filter(d => d.mealTime.includes(time));

    // Score each dish
    const scored: ScoredDish[] = candidates.map(dish => {
      let score = 0;
      const reasons: string[] = [];

      // ── Boost: healthy tag ──
      if (dish.tags.includes('healthy')) {
        score += 2;
        reasons.push('Món healthy');
      }

      // ── Boost: superfood-tagged dishes (from new nutrition rules) ──
      if (dish.superfoodTags && dish.superfoodTags.length > 0) {
        score += 4;
        const sfNames = dish.superfoodTags.map(t => {
          const sf = SUPERFOODS_DB.find(s => s.tag === t);
          return sf?.keyNutrient ?? t;
        });
        reasons.push(`Siêu thực phẩm: ${sfNames.join(', ')}`);
      }

      // ── Boost: dishes with health tips ──
      if (dish.healthTips && dish.healthTips.length > 0) {
        score += 1;
      }

      // ── Boost: nguyên liệu khớp superfood/nutrient sources ──
      for (const ingredient of dish.ingredients) {
        const lower = ingredient.toLowerCase();
        for (const keyword of goodIngredientKeywords) {
          if (lower.includes(keyword)) {
            score += 3;
            reasons.push(`Chứa ${ingredient} — tốt cho sức khỏe của bạn`);
            break;
          }
        }
      }

      // ── Boost: rau/canh (tăng chất xơ) ──
      if (dish.dishType === 'rau' || dish.dishType === 'canh') {
        score += 2;
        reasons.push('Bổ sung chất xơ (quy tắc nắm đấm)');
      }

      // ── Penalty: nguyên liệu nên tránh ──
      for (const ingredient of dish.ingredients) {
        const lower = ingredient.toLowerCase();
        for (const keyword of avoidIngredientKeywords) {
          if (lower.includes(keyword)) {
            score -= 3;
            reasons.push(`Chứa ${ingredient} — nên hạn chế`);
            break;
          }
        }
      }

      // ── Penalty: GERD → giảm điểm đồ chua/cay/chiên ──
      if (hasGerd) {
        const gerdBad = ['ớt', 'tiêu', 'giấm', 'chanh', 'cay', 'chiên', 'rán', 'xào'];
        for (const ingredient of dish.ingredients) {
          const lower = ingredient.toLowerCase();
          if (gerdBad.some(k => lower.includes(k))) {
            score -= 2;
            reasons.push(`GERD: hạn chế ${ingredient}`);
          }
        }
        // Penalty cho đồ ăn nhanh
        if (dish.category === 'đồ-ăn-nhanh') {
          score -= 3;
          reasons.push('GERD: tránh đồ ăn nhanh');
        }
      }

      // ── Penalty: visceral-fat + bữa tối → giảm món no/nặng ──
      if (profile.conditions.includes('visceral-fat') && time === 'tối') {
        if (dish.tags.includes('no-lâu') || dish.category === 'lẩu') {
          score -= 2;
          reasons.push('Béo bụng: bữa tối nên nhẹ');
        }
      }

      return { dish, score, reasons: [...new Set(reasons)] };
    });

    // Sort by score, take top 3
    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, 3);

    // Superfood add-ons for this meal
    const addOns = suggestSuperfoodAddOns(time, profile);

    // Reminder for GERD
    let reminderVi: string | undefined;
    if (hasGerd) {
      reminderVi = 'Nhớ nhai kỹ 20-30 lần/miếng. Chỉ ăn no 70%. Nhiệt độ thức ăn ~40°C.';
    }

    return {
      mealTime: time,
      labelVi,
      dishes: top,
      superfoodAddOns: addOns,
      reminderVi,
    };
  });
}

// ============================================================================
// SUB-ENGINE D: Anti-Pattern Scanner
// ============================================================================

/**
 * ANTI-PATTERN SCANNER
 *
 * Quét toàn bộ nguyên liệu trong thực đơn đã chọn.
 * Nếu match keyword trong INGREDIENT_ALERTS → tạo notification.
 *
 * Pseudocode:
 *   notifications = []
 *   FOR each dish in selectedDishes:
 *     FOR each ingredient in dish.ingredients:
 *       FOR each alert in INGREDIENT_ALERTS:
 *         IF any alert.keyword matches ingredient:
 *           notification = {
 *             type: alert.dangerLevel,
 *             title: alert.titleVi,
 *             message: alert.messageVi,
 *             triggerIngredients: [ingredient],
 *           }
 *           notifications.push(notification)
 *   RETURN deduplicate(notifications)
 */
function scanAntiPatterns(
  selectedDishes: Dish[],
  profile: UserProfile,
): DietNotification[] {
  const notifications: DietNotification[] = [];
  const seen = new Set<string>(); // Tránh duplicate

  for (const dish of selectedDishes) {
    for (const ingredient of dish.ingredients) {
      const lower = ingredient.toLowerCase();

      for (const alert of INGREDIENT_ALERTS) {
        // Đã cảnh báo rồi → skip
        if (seen.has(alert.titleVi)) continue;

        const matched = alert.keywords.some(k => lower.includes(k.toLowerCase()));
        if (matched) {
          seen.add(alert.titleVi);
          notifications.push({
            type: alert.dangerLevel,
            titleVi: alert.titleVi,
            messageVi: alert.messageVi,
            triggerIngredients: [ingredient],
            icon: alert.icon,
          });
        }
      }
    }
  }

  // Thêm anti-pattern warnings từ conditions
  for (const condId of profile.conditions) {
    const condAntiPatterns = ANTI_PATTERNS.filter(
      ap => ap.relatedConditions.includes(condId) &&
            (ap.dangerLevel === 'critical' || ap.dangerLevel === 'danger')
    );
    for (const ap of condAntiPatterns) {
      if (seen.has(ap.id)) continue;
      seen.add(ap.id);
      notifications.push({
        type: ap.dangerLevel === 'critical' ? 'danger' : 'warning',
        titleVi: ap.mythVi.slice(0, 60) + '...',
        messageVi: ap.truthVi,
        triggerIngredients: ap.keywords,
        icon: ap.dangerLevel === 'critical' ? '🚨' : '⚠️',
      });
    }
  }

  // Sort: danger first, then warning, then info
  const order = { danger: 0, warning: 1, info: 2 };
  notifications.sort((a, b) => order[a.type] - order[b.type]);

  return notifications;
}

// ============================================================================
// HELPERS
// ============================================================================

/** Build danh sách keyword nguyên liệu tốt cho user */
function buildGoodIngredientKeywords(profile: UserProfile): string[] {
  const keywords: string[] = [];

  for (const condId of profile.conditions) {
    const { recommended } = getSuperfoodsForCondition(condId);
    for (const sf of recommended) {
      // Tách tên tiếng Việt thành keyword tìm kiếm
      keywords.push(sf.nameVi.toLowerCase());
      keywords.push(sf.nameEn.toLowerCase());
    }
  }

  // Common healthy ingredients
  keywords.push('trứng', 'cá', 'rau', 'gừng', 'tỏi', 'nghệ', 'hành');

  return [...new Set(keywords)];
}

/** Build danh sách keyword nguyên liệu nên tránh */
function buildAvoidIngredientKeywords(profile: UserProfile): string[] {
  const keywords: string[] = [];

  for (const condId of profile.conditions) {
    const { avoid } = getSuperfoodsForCondition(condId);
    for (const sf of avoid) {
      keywords.push(sf.nameVi.toLowerCase());
    }
  }

  // GERD-specific avoids
  if (profile.conditions.includes('gerd')) {
    keywords.push('cà phê', 'sô-cô-la', 'bạc hà', 'nước có ga');
  }

  // Hypertension avoids
  if (profile.conditions.includes('hypertension')) {
    keywords.push('mắm', 'muối', 'đồ hộp');
  }

  return [...new Set(keywords)];
}

/** Gợi ý superfood add-on cho từng bữa */
function suggestSuperfoodAddOns(mealTime: MealTime, profile: UserProfile): string[] {
  const tips: string[] = [];

  if (mealTime === 'sáng') {
    if (profile.conditions.includes('gallstone')) {
      tips.push('Thêm 2 quả trứng chiên mỡ (kích thích túi mật)');
    }
    tips.push('Thêm 1 muỗng hạt chia vào sữa chua/cháo');
  }

  if (mealTime === 'trưa') {
    if (profile.conditions.includes('dyslipidemia') || profile.conditions.includes('chronic-inflammation')) {
      tips.push('Thêm cá hồi/cá thu (Omega-3)');
    }
    tips.push('Thêm 1 muỗng dầu oliu vào salad/rau');
  }

  if (mealTime === 'tối') {
    tips.push('Thêm nghệ + tiêu đen vào canh/soup (chống viêm)');
    if (profile.conditions.includes('gut-dysbiosis')) {
      tips.push('Thêm 50g kim chi hoặc 1 hũ sữa chua (probiotic)');
    }
  }

  return tips;
}

/** Gợi ý superfood xuyên suốt ngày */
function generateSuperfoodTips(profile: UserProfile): SuperfoodTip[] {
  const tips: SuperfoodTip[] = [];

  // Collect all recommended superfoods
  const recommended = new Map<string, { nameVi: string; tip: string; meal: MealTime }>();

  for (const condId of profile.conditions) {
    const { recommended: foods } = getSuperfoodsForCondition(condId);
    for (const sf of foods) {
      if (recommended.has(sf.id)) continue;
      const mealTime: MealTime =
        sf.category === 'egg' ? 'sáng' :
        sf.category === 'protein' ? 'trưa' :
        sf.category === 'fermented' ? 'tối' :
        sf.category === 'seed' ? 'sáng' :
        'trưa';
      recommended.set(sf.id, {
        nameVi: sf.nameVi,
        tip: `${sf.servingSize} — ${sf.keyBenefitsVi.slice(0, 2).join(', ')}`,
        meal: mealTime,
      });
    }
  }

  for (const [, item] of recommended) {
    tips.push({
      nameVi: item.nameVi,
      tipVi: item.tip,
      mealTime: item.meal,
    });
  }

  return tips;
}
