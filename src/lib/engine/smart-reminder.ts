import type { UserProfile, MicronutrientId, Gender } from '@/data/health-types';
import { MICRONUTRIENTS, getMicronutrientsForCondition } from '@/data/micronutrients';

// ============================================================================
// LUỒNG 1: SMART REMINDER ENGINE
// Logic nhắc lịch uống vi chất — tự động tạo lịch dựa trên UserProfile
//
// QUY TẮC BẮT BUỘC (BS Trần Văn Phúc):
// 1. Canxi và Magie PHẢI cách nhau >= 2 tiếng (ức chế hấp thu lẫn nhau)
// 2. Canxi: ưu tiên sáng/chiều (sau bữa ăn, cùng D3)
// 3. Magie: ưu tiên tối/trước ngủ (giúp ngủ sâu, thư giãn cơ)
// 4. Kẽm: bụng đói hoặc cùng protein, TRÁNH cùng Canxi
// 5. Vitamin C: tăng hấp thu Kẽm, Sắt — uống cùng buổi
// 6. Omega-3: cùng bữa ăn có chất béo
// 7. D3: cùng bữa ăn có chất béo (sáng hoặc trưa)
// ============================================================================

// --- Types ---

export interface ReminderSlot {
  time: string;            // "07:00", "12:30", "18:00", "21:30"
  period: 'morning' | 'noon' | 'afternoon' | 'evening' | 'bedtime';
  labelVi: string;         // "Sau bữa sáng", "Trước khi ngủ"
  nutrients: ScheduledNutrient[];
  withFood: boolean;
  tipVi: string;           // Mẹo hấp thu
}

export interface ScheduledNutrient {
  id: MicronutrientId;
  nameVi: string;
  dosage: string;          // "500mg", "2000 IU"
  reasonVi: string;        // Tại sao uống lúc này
}

export interface SmartReminderPlan {
  slots: ReminderSlot[];
  warnings: ReminderWarning[];
  totalNutrients: number;
  summaryVi: string;
}

export interface ReminderWarning {
  type: 'interaction' | 'timing' | 'dosage';
  messageVi: string;
}

// --- Absorption conflict rules ---

interface ConflictRule {
  nutrientA: MicronutrientId;
  nutrientB: MicronutrientId;
  minGapHours: number;
  reasonVi: string;
}

const CONFLICT_RULES: ConflictRule[] = [
  {
    nutrientA: 'calcium',
    nutrientB: 'magnesium',
    minGapHours: 2,
    reasonVi: 'Canxi và Magie cạnh tranh hấp thu — phải cách nhau ít nhất 2 tiếng',
  },
  {
    nutrientA: 'calcium',
    nutrientB: 'zinc',
    minGapHours: 2,
    reasonVi: 'Canxi ức chế hấp thu Kẽm — phải cách nhau ít nhất 2 tiếng',
  },
];

// --- Preferred time slots for each nutrient ---

type PreferredPeriod = 'morning' | 'noon' | 'afternoon' | 'evening' | 'bedtime';

interface NutrientTimingRule {
  id: MicronutrientId;
  preferred: PreferredPeriod[];      // Thời điểm ưu tiên (theo thứ tự)
  forbidden: PreferredPeriod[];      // Thời điểm KHÔNG nên
  withFood: boolean;
  withFat: boolean;                  // Cần chất béo để hấp thu
  tipVi: string;
}

const TIMING_RULES: NutrientTimingRule[] = [
  {
    id: 'calcium',
    preferred: ['morning', 'afternoon', 'evening'],
    forbidden: ['bedtime'],          // Tránh trước ngủ (cùng slot Magie)
    withFood: true,
    withFat: false,
    tipVi: 'Uống sau bữa ăn, cùng Vitamin D3 để tăng hấp thu. Tránh cà phê/trà trong 1h.',
  },
  {
    id: 'magnesium',
    preferred: ['bedtime', 'evening'],
    forbidden: ['morning'],          // Tránh sáng (cùng slot Canxi)
    withFood: false,
    withFat: false,
    tipVi: 'Magie Glycinate trước ngủ 1h giúp ngủ sâu, thư giãn cơ.',
  },
  {
    id: 'vitamin-d3',
    preferred: ['morning', 'noon'],
    forbidden: ['bedtime'],          // D3 có thể gây tỉnh ngủ
    withFood: true,
    withFat: true,
    tipVi: 'Uống cùng bữa ăn có chất béo (trứng, dầu oliu). Kết hợp phơi nắng trước 9h.',
  },
  {
    id: 'zinc',
    preferred: ['morning', 'evening'],
    forbidden: [],
    withFood: false,                 // Bụng đói hấp thu tốt hơn
    withFat: false,
    tipVi: 'Uống khi bụng đói hoặc cùng protein. Vitamin C tăng hấp thu.',
  },
  {
    id: 'vitamin-b6',
    preferred: ['morning', 'noon'],
    forbidden: ['bedtime'],          // B6 có thể gây mơ sống động
    withFood: true,
    withFat: false,
    tipVi: 'Uống cùng bữa ăn buổi sáng hoặc trưa.',
  },
  {
    id: 'omega-3',
    preferred: ['noon', 'evening'],
    forbidden: [],
    withFood: true,
    withFat: true,
    tipVi: 'Uống cùng bữa ăn chính có chất béo để hấp thu DHA/EPA tối ưu.',
  },
  {
    id: 'vitamin-c',
    preferred: ['morning', 'noon', 'afternoon'],
    forbidden: [],
    withFood: false,
    withFat: false,
    tipVi: 'Ăn trái cây tươi tốt hơn viên uống. Tránh uống cùng sữa/canxi.',
  },
];

// --- Period → default time mapping ---

const PERIOD_TIMES: Record<PreferredPeriod, string> = {
  morning: '07:30',
  noon: '12:00',
  afternoon: '15:00',
  evening: '18:30',
  bedtime: '21:30',
};

const PERIOD_LABELS: Record<PreferredPeriod, string> = {
  morning: 'Sau bữa sáng',
  noon: 'Bữa trưa',
  afternoon: 'Buổi chiều',
  evening: 'Sau bữa tối',
  bedtime: 'Trước khi ngủ',
};

// ============================================================================
// CORE ALGORITHM: Tạo lịch nhắc vi chất thông minh
// ============================================================================

/**
 * THUẬT TOÁN SMART REMINDER
 *
 * Input:  UserProfile (conditions, lifestyle, gender, concerns)
 * Output: SmartReminderPlan (danh sách slot thời gian + vi chất + cảnh báo)
 *
 * PSEUDOCODE:
 * ─────────────────────────────────────────────────────────
 * 1. XÁC ĐỊNH VI CHẤT CẦN BỔ SUNG
 *    - Lấy từ conditions → getMicronutrientsForCondition()
 *    - Lấy từ concerns (user tự chọn)
 *    - Merge + deduplicate
 *
 * 2. XÁC ĐỊNH LIỀU LƯỢNG
 *    - Dựa vào gender + pregnant → chọn RDA phù hợp
 *
 * 3. XẾP LỊCH (Constraint Satisfaction)
 *    - Bước 3a: Gán mỗi vi chất vào preferred period đầu tiên
 *    - Bước 3b: Kiểm tra CONFLICT_RULES
 *      → Nếu Canxi & Magie cùng slot hoặc cách < 2h → dời Magie sang bedtime
 *      → Nếu Canxi & Kẽm cùng slot → dời Kẽm sang slot khác
 *    - Bước 3c: Merge các vi chất cùng slot thành 1 reminder
 *
 * 4. SINH CẢNH BÁO
 *    - Nếu có conflict không giải quyết được → warning
 *    - Nếu user uống PPI → cảnh báo giảm hấp thu
 *    - Nếu pregnant → cảnh báo liều an toàn
 * ─────────────────────────────────────────────────────────
 */
export function generateSmartReminder(profile: UserProfile): SmartReminderPlan {
  // ── BƯỚC 1: Xác định vi chất cần bổ sung ──
  const neededNutrientIds = resolveNeededNutrients(profile);

  if (neededNutrientIds.length === 0) {
    return {
      slots: [],
      warnings: [],
      totalNutrients: 0,
      summaryVi: 'Chưa xác định vi chất cần bổ sung. Hãy chọn tình trạng sức khỏe hoặc vi chất quan tâm.',
    };
  }

  // ── BƯỚC 2: Xác định liều lượng theo profile ──
  const dosageKey = getDosageKey(profile);
  const nutrientsWithDosage = neededNutrientIds.map(id => {
    const nutrient = MICRONUTRIENTS.find(n => n.id === id)!;
    return {
      id,
      nameVi: nutrient.nameVi,
      dosage: nutrient.dailyRda[dosageKey],
    };
  });

  // ── BƯỚC 3: Xếp lịch (Constraint Satisfaction) ──
  const schedule = scheduleNutrients(nutrientsWithDosage);

  // ── BƯỚC 4: Sinh cảnh báo ──
  const warnings = generateWarnings(profile, neededNutrientIds);

  // ── Build output ──
  const slots = buildReminderSlots(schedule);

  return {
    slots,
    warnings,
    totalNutrients: neededNutrientIds.length,
    summaryVi: `Lịch bổ sung ${neededNutrientIds.length} vi chất, chia thành ${slots.length} lần/ngày.`,
  };
}

// ============================================================================
// STEP 1: Resolve needed nutrients
// ============================================================================

function resolveNeededNutrients(profile: UserProfile): MicronutrientId[] {
  const set = new Set<MicronutrientId>();

  // Từ bệnh lý → vi chất hỗ trợ
  for (const condId of profile.conditions) {
    const nutrients = getMicronutrientsForCondition(condId);
    for (const n of nutrients) {
      set.add(n.id);
    }
  }

  // Từ user tự chọn (concerns)
  for (const id of profile.concerns) {
    set.add(id);
  }

  // Lifestyle-based additions
  if (profile.lifestyle.includes('poor-sleep') || profile.lifestyle.includes('high-stress')) {
    set.add('magnesium');
  }
  if (profile.lifestyle.includes('smoker')) {
    set.add('vitamin-c');
  }
  if (profile.lifestyle.includes('alcohol')) {
    set.add('vitamin-b6');
    set.add('magnesium');
    set.add('zinc');
  }

  // Canxi luôn cần D3 đi kèm (quy tắc BS Phúc)
  if (set.has('calcium') && !set.has('vitamin-d3')) {
    set.add('vitamin-d3');
  }

  return Array.from(set);
}

// ============================================================================
// STEP 2: Dosage key
// ============================================================================

function getDosageKey(profile: UserProfile): keyof { male: string; female: string; pregnant: string } {
  if (profile.lifestyle.includes('pregnant')) return 'pregnant';
  if (profile.gender === 'female') return 'female';
  return 'male';
}

// ============================================================================
// STEP 3: Schedule nutrients (Constraint Satisfaction)
// ============================================================================

interface NutrientAssignment {
  id: MicronutrientId;
  nameVi: string;
  dosage: string;
  assignedPeriod: PreferredPeriod;
  reasonVi: string;
}

function scheduleNutrients(
  nutrients: { id: MicronutrientId; nameVi: string; dosage: string }[]
): NutrientAssignment[] {
  const assignments: NutrientAssignment[] = [];

  // ── 3a: Gán initial period (preferred[0]) ──
  for (const n of nutrients) {
    const rule = TIMING_RULES.find(r => r.id === n.id);
    const period = rule?.preferred[0] ?? 'morning';
    assignments.push({
      ...n,
      assignedPeriod: period,
      reasonVi: rule?.tipVi ?? '',
    });
  }

  // ── 3b: Resolve conflicts ──
  resolveConflicts(assignments);

  return assignments;
}

/**
 * CONFLICT RESOLUTION ALGORITHM
 *
 * Ưu tiên: Canxi giữ nguyên vị trí → Magie/Kẽm phải dời
 * Lý do: Canxi hấp thu tốt nhất sau bữa ăn (nhiều slot khả dụng)
 *         Magie tốt nhất trước ngủ (1 slot cố định)
 *
 * Pseudocode:
 *   FOR each conflict_rule in CONFLICT_RULES:
 *     a = findAssignment(nutrientA)
 *     b = findAssignment(nutrientB)
 *     IF a.period == b.period OR timeDiff(a, b) < minGapHours:
 *       // Giữ A (Canxi), dời B (Magie/Kẽm)
 *       b.period = findNextAvailablePeriod(b, excluding a.period)
 *       IF still conflicting → try next preferred period
 */
function resolveConflicts(assignments: NutrientAssignment[]): void {
  for (const rule of CONFLICT_RULES) {
    const a = assignments.find(x => x.id === rule.nutrientA);
    const b = assignments.find(x => x.id === rule.nutrientB);
    if (!a || !b) continue;

    const timeA = periodToMinutes(a.assignedPeriod);
    const timeB = periodToMinutes(b.assignedPeriod);
    const gapMinutes = Math.abs(timeA - timeB);
    const requiredMinutes = rule.minGapHours * 60;

    if (gapMinutes < requiredMinutes) {
      // Dời nutrientB sang slot xa nhất có thể
      const timingRule = TIMING_RULES.find(r => r.id === rule.nutrientB);
      const candidates = timingRule?.preferred ?? ['bedtime'];

      for (const candidate of candidates) {
        const candidateMinutes = periodToMinutes(candidate);
        if (Math.abs(timeA - candidateMinutes) >= requiredMinutes) {
          b.assignedPeriod = candidate;
          b.reasonVi = `${rule.reasonVi}. ${timingRule?.tipVi ?? ''}`;
          break;
        }
      }
    }
  }
}

function periodToMinutes(period: PreferredPeriod): number {
  const map: Record<PreferredPeriod, number> = {
    morning: 7 * 60 + 30,    // 07:30
    noon: 12 * 60,            // 12:00
    afternoon: 15 * 60,       // 15:00
    evening: 18 * 60 + 30,    // 18:30
    bedtime: 21 * 60 + 30,    // 21:30
  };
  return map[period];
}

// ============================================================================
// STEP 3c: Build reminder slots (merge nutrients cùng period)
// ============================================================================

function buildReminderSlots(assignments: NutrientAssignment[]): ReminderSlot[] {
  const grouped = new Map<PreferredPeriod, NutrientAssignment[]>();

  for (const a of assignments) {
    const list = grouped.get(a.assignedPeriod) ?? [];
    list.push(a);
    grouped.set(a.assignedPeriod, list);
  }

  const slots: ReminderSlot[] = [];
  const periodOrder: PreferredPeriod[] = ['morning', 'noon', 'afternoon', 'evening', 'bedtime'];

  for (const period of periodOrder) {
    const items = grouped.get(period);
    if (!items || items.length === 0) continue;

    const timingRules = items.map(i => TIMING_RULES.find(r => r.id === i.id));
    const needsFood = timingRules.some(r => r?.withFood);
    const tips = [...new Set(items.map(i => i.reasonVi).filter(Boolean))];

    slots.push({
      time: PERIOD_TIMES[period],
      period,
      labelVi: PERIOD_LABELS[period],
      nutrients: items.map(i => ({
        id: i.id,
        nameVi: i.nameVi,
        dosage: i.dosage,
        reasonVi: i.reasonVi,
      })),
      withFood: needsFood,
      tipVi: tips.join(' | '),
    });
  }

  return slots;
}

// ============================================================================
// STEP 4: Generate warnings
// ============================================================================

function generateWarnings(profile: UserProfile, nutrientIds: MicronutrientId[]): ReminderWarning[] {
  const warnings: ReminderWarning[] = [];

  // Canxi + Magie conflict warning
  if (nutrientIds.includes('calcium') && nutrientIds.includes('magnesium')) {
    warnings.push({
      type: 'interaction',
      messageVi:
        'Canxi và Magie đã được tự động tách lịch cách nhau >= 2 tiếng. ' +
        'Canxi uống sau bữa ăn sáng/chiều, Magie uống trước khi ngủ.',
    });
  }

  // Canxi + Kẽm
  if (nutrientIds.includes('calcium') && nutrientIds.includes('zinc')) {
    warnings.push({
      type: 'interaction',
      messageVi: 'Canxi ức chế hấp thu Kẽm. Đã tự động xếp lịch cách nhau.',
    });
  }

  // Pregnant safety
  if (profile.lifestyle.includes('pregnant')) {
    warnings.push({
      type: 'dosage',
      messageVi:
        'Liều lượng đã điều chỉnh cho phụ nữ mang thai. ' +
        'QUAN TRỌNG: Luôn tham khảo bác sĩ trước khi bổ sung vi chất trong thai kỳ.',
    });
  }

  // Canxi without D3 (should not happen due to auto-add, but safety net)
  if (nutrientIds.includes('calcium') && !nutrientIds.includes('vitamin-d3')) {
    warnings.push({
      type: 'interaction',
      messageVi: 'Canxi cần Vitamin D3 để hấp thu. Đã tự động thêm D3 vào lịch.',
    });
  }

  // Over 60 + many supplements
  if (profile.ageGroup === '60+' && nutrientIds.length > 4) {
    warnings.push({
      type: 'dosage',
      messageVi: 'Người trên 60 tuổi nên tham khảo bác sĩ khi bổ sung nhiều vi chất cùng lúc.',
    });
  }

  return warnings;
}
