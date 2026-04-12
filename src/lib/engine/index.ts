import type { UserProfile } from '@/data/health-types';
import { generateSmartReminder, type SmartReminderPlan } from './smart-reminder';
import { generateDailyDiet, type DailyDietPlan } from './daily-diet';

// ============================================================================
// WHAT-EAT RECOMMENDATION ENGINE v1.0
// Tổng hợp 2 luồng: Smart Reminder + Daily Diet
//
// Entry point duy nhất cho UI — truyền vào UserProfile, nhận output hoàn chỉnh
// ============================================================================

export interface EngineOutput {
  reminder: SmartReminderPlan;    // Luồng 1: Lịch uống vi chất
  diet: DailyDietPlan;            // Luồng 2: Gợi ý thực đơn
  generatedAt: string;            // ISO timestamp
}

/**
 * Main entry point — UI gọi hàm này duy nhất
 *
 * @example
 * ```ts
 * import { runEngine } from '@/lib/engine';
 * import { loadProfile } from '@/data/user-options';
 *
 * const profile = loadProfile(); // từ localStorage
 * const result = runEngine(profile);
 *
 * // Luồng 1: Lịch nhắc vi chất
 * result.reminder.slots.forEach(slot => {
 *   console.log(`${slot.time} - ${slot.labelVi}`);
 *   slot.nutrients.forEach(n => console.log(`  ${n.nameVi} ${n.dosage}`));
 * });
 *
 * // Luồng 2: Gợi ý thực đơn
 * result.diet.meals.forEach(meal => {
 *   console.log(`${meal.labelVi}:`);
 *   meal.dishes.forEach(d => console.log(`  ${d.dish.name} (score: ${d.score})`));
 * });
 *
 * // Cảnh báo Anti-pattern
 * result.diet.notifications.forEach(n => {
 *   console.log(`${n.icon} ${n.titleVi}`);
 * });
 * ```
 */
export function runEngine(profile: UserProfile): EngineOutput {
  return {
    reminder: generateSmartReminder(profile),
    diet: generateDailyDiet(profile),
    generatedAt: new Date().toISOString(),
  };
}

// Re-export types for convenience
export type { SmartReminderPlan, ReminderSlot, ScheduledNutrient, ReminderWarning } from './smart-reminder';
export type { DailyDietPlan, MealSuggestion, ScoredDish, FiberTarget, DietRule, DietNotification, SuperfoodTip, SmartTipOutput } from './daily-diet';
export { generateSmartReminder } from './smart-reminder';
export { generateDailyDiet } from './daily-diet';
