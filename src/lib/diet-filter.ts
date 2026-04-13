import type { Dish } from '@/data/dishes';
import {
  getWarningsForIngredients,
  getSymptomRules,
  COOKING_WARNINGS,
  VEGAN_WARNING,
  type CookingWarning,
  type SymptomDietRule,
} from '@/data/nutrition-rules';

// ============================================================================
// DIET FILTER — Recommendation Function
// Lọc & đánh dấu món ăn dựa trên profile người dùng
// Dùng cho tab "Ăn gì?" và "Ăn sáng"
// ============================================================================

export interface DishWithWarnings {
  dish: Dish;
  warnings: CookingWarning[];      // Cảnh báo chế biến cho món này
  blocked: boolean;                 // Chặn hoàn toàn (gout, sỏi thận...)
  blockReason?: string;             // Lý do chặn
  healthTip?: string;               // Mẹo đi kèm
}

export interface MealFilterResult {
  dishes: DishWithWarnings[];
  globalWarnings: CookingWarning[]; // Cảnh báo chung (aflatoxin, reused oil...)
  symptomTips: string[];            // Tips từ symptom rules
  veganWarning?: string;            // Cảnh báo ăn chay cho mỡ máu
}

/**
 * Lọc danh sách món theo conditions của user
 * Gắn warnings lên từng món
 */
export function filterDishesForUser(
  dishes: Dish[],
  conditionIds: string[],
): MealFilterResult {
  const symptomRules = getSymptomRules(conditionIds);

  // Collect blocked ingredients from all active symptom rules
  const blockedIngredients = new Set<string>();
  const boostedIngredients = new Set<string>();
  const symptomTips: string[] = [];

  for (const rule of symptomRules) {
    if (rule.blockIngredients) {
      for (const ing of rule.blockIngredients) blockedIngredients.add(ing.toLowerCase());
    }
    if (rule.boostIngredients) {
      for (const ing of rule.boostIngredients) boostedIngredients.add(ing.toLowerCase());
    }
    if (rule.forceTips) {
      symptomTips.push(...rule.forceTips);
    }
  }

  // Filter and annotate dishes
  const result: DishWithWarnings[] = dishes.map(dish => {
    // Check if dish is blocked by symptom rules
    let blocked = false;
    let blockReason: string | undefined;

    for (const ing of dish.ingredients) {
      const lower = ing.toLowerCase();
      if (blockedIngredients.has(lower)) {
        blocked = true;
        const rule = symptomRules.find(r =>
          r.blockIngredients?.some(b => lower.includes(b.toLowerCase()))
        );
        blockReason = rule ? `${rule.icon} ${rule.nameVi}: tránh ${ing}` : undefined;
        break;
      }
    }

    // Get cooking warnings for this dish's ingredients
    const warnings = getWarningsForIngredients(dish.ingredients);

    // Check name-based warnings (e.g., "nướng" in dish name)
    const nameLower = dish.name.toLowerCase();
    for (const w of COOKING_WARNINGS) {
      if (w.triggerKeywords.length === 0) continue;
      if (w.triggerKeywords.some(k => nameLower.includes(k.toLowerCase()))) {
        if (!warnings.find(existing => existing.id === w.id)) {
          warnings.push(w);
        }
      }
    }

    // Health tip from dish itself or superfood tag
    const healthTip = dish.healthTips?.[0];

    return { dish, warnings, blocked, blockReason, healthTip };
  });

  // Global warnings (always show)
  const globalWarnings = COOKING_WARNINGS.filter(w =>
    w.triggerKeywords.length === 0 // aflatoxin, reused oil
  );

  // Vegan warning for dyslipidemia
  let veganWarning: string | undefined;
  if (conditionIds.includes('dyslipidemia')) {
    veganWarning = `${VEGAN_WARNING.icon} ${VEGAN_WARNING.titleVi}\n${VEGAN_WARNING.adviceVi}`;
  }

  // Flu special mode
  const fluRule = symptomRules.find(r => r.conditionId === 'flu');
  if (fluRule?.specialModeVi) {
    symptomTips.unshift(`${fluRule.icon} ${fluRule.specialModeVi}`);
  }

  return {
    dishes: result,
    globalWarnings,
    symptomTips: [...new Set(symptomTips)],
    veganWarning,
  };
}

/**
 * Scan a single dish for cooking warnings (for DishCard inline display)
 */
export function getDishWarnings(dish: Dish): CookingWarning[] {
  const warnings = getWarningsForIngredients(dish.ingredients);

  // Also check dish name
  const nameLower = dish.name.toLowerCase();
  for (const w of COOKING_WARNINGS) {
    if (w.triggerKeywords.length === 0) continue;
    if (w.triggerKeywords.some(k => nameLower.includes(k.toLowerCase()))) {
      if (!warnings.find(existing => existing.id === w.id)) {
        warnings.push(w);
      }
    }
  }

  return warnings;
}
