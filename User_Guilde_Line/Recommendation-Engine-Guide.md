# Recommendation Engine — Technical Guide

## Overview

Engine gồm 2 luồng chạy song song, nhận input là `UserProfile` từ localStorage.

```
runEngine(profile) → { reminder: SmartReminderPlan, diet: DailyDietPlan }
```

Entry point: `src/lib/engine/index.ts`

---

## Luồng 1: Smart Reminder (Lịch Vi chất)

**File**: `src/lib/engine/smart-reminder.ts`

### Algorithm: Constraint Satisfaction Scheduling

```
INPUT: UserProfile
  │
  ▼
STEP 1: Resolve needed nutrients
  - conditions[] → getMicronutrientsForCondition() → nutrient IDs
  - concerns[] (user tự chọn)
  - lifestyle flags → auto-add:
    • poor-sleep/high-stress → magnesium
    • smoker → vitamin-c
    • alcohol → vitamin-b6, magnesium, zinc
  - AUTO-RULE: calcium → always add vitamin-d3
  │
  ▼
STEP 2: Determine dosage by profile
  - pregnant → pregnant RDA
  - female → female RDA
  - male → male RDA
  │
  ▼
STEP 3: Schedule (Constraint Satisfaction)
  3a. Assign preferred time slot:
      calcium  → morning (sau bữa ăn)
      magnesium → bedtime (giúp ngủ sâu)
      vitamin-d3 → morning (cùng chất béo)
      zinc → morning (bụng đói)
      vitamin-b6 → morning
      omega-3 → noon (cùng bữa ăn)
      vitamin-c → morning

  3b. Resolve conflicts:
      ┌──────────────────────────────────────────────────┐
      │ CONFLICT RULES:                                  │
      │ • calcium ↔ magnesium: >= 2 hours apart          │
      │ • calcium ↔ zinc: >= 2 hours apart               │
      │                                                  │
      │ RESOLUTION:                                      │
      │ Keep calcium in place → move magnesium/zinc      │
      │ calcium stays morning → magnesium moves bedtime  │
      │ calcium stays morning → zinc moves evening       │
      └──────────────────────────────────────────────────┘

  3c. Merge nutrients in same slot → ReminderSlot[]
  │
  ▼
STEP 4: Generate warnings
  - calcium + magnesium → "Đã tách >= 2h"
  - pregnant → "Tham khảo bác sĩ"
  - 60+ with >4 nutrients → "Tham khảo bác sĩ"
  │
  ▼
OUTPUT: SmartReminderPlan
  { slots: ReminderSlot[], warnings[], totalNutrients, summaryVi }
```

### Key Rule: Calcium-Magnesium Separation

```
periodToMinutes('morning')  = 450  (07:30)
periodToMinutes('bedtime')  = 1290 (21:30)
gap = |1290 - 450| = 840 minutes = 14 hours ✅ (>= 120 min required)
```

---

## Luồng 2: Daily Diet Suggestion

**File**: `src/lib/engine/daily-diet.ts`

### 4 Sub-Engines:

#### A. Fiber Calculator (Quy tắc Nắm Đấm)
```
Male:   9 fistfuls/day (5 veggies + 4 fruits)
        Morning: 2, Lunch: 4, Dinner: 3

Female: 7 fistfuls/day (4 veggies + 3 fruits)
        Morning: 1, Lunch: 3, Dinner: 3

1 fistful ≈ 80g vegetables or 1 medium fruit
```

#### B. Diet Rules Builder
```
conditions → rules:
  gerd → "3 Ổn định – 2 Giảm" + "Nhai 20-30 lần" + "Không nằm sau ăn"
  gallstone → "2 trứng chiên mỡ/ngày"
  dyslipidemia → "Omega-3 + giảm tinh bột trắng"
  visceral-fat → "Không ăn sau 20h"
  hypertension → "Giảm muối < 5g/ngày"
  always → "Quy tắc nắm đấm chất xơ"
```

#### C. Meal Planner (Scoring Algorithm)
```
FOR each mealTime in [sáng, trưa, tối]:
  FOR each dish in dishes.filter(mealTime):
    score = 0

    // Positive
    +3  ingredient matches superfood goodFor user's conditions
    +2  tag = 'healthy'
    +2  dishType = 'rau' or 'canh' (fiber)

    // Negative
    -3  ingredient matches superfood avoidFor
    -2  GERD + ingredient contains (ớt, tiêu, giấm, chiên, rán)
    -3  GERD + category = 'đồ-ăn-nhanh'
    -2  visceral-fat + bữa tối + tag 'no-lâu' or category 'lẩu'

  SORT by score DESC → TAKE top 3
```

#### D. Anti-Pattern Scanner
```
FOR each dish in selectedDishes:
  FOR each ingredient in dish.ingredients:
    MATCH against INGREDIENT_ALERTS:
      "đậu đỏ/đậu nành/đậu đen"  → DANGER: Lectin toxin
      "gạo lứt"                    → WARNING: Soak 12-24h
      "bánh mì nguyên cám"         → WARNING: Choose sourdough
      "nước ép"                     → WARNING: Eat whole fruit
      "rau sống"                    → WARNING: Wash thoroughly

ALSO scan profile.conditions → critical anti-patterns from database
```

---

## Usage Example

```typescript
import { runEngine } from '@/lib/engine';

const profile = {
  ageGroup: '30-39',
  gender: 'male',
  conditions: ['gerd', 'insomnia'],
  lifestyle: ['high-stress', 'skip-breakfast'],
  concerns: ['calcium', 'magnesium'],
};

const result = runEngine(profile);

// Luồng 1: Reminder
result.reminder.slots
// → [
//   { time: '07:30', nutrients: [Canxi 1000mg, D3 2000 IU, Vit C 90mg] },
//   { time: '12:00', nutrients: [Omega-3 1600mg] },
//   { time: '21:30', nutrients: [Magie 420mg] },
// ]

// Luồng 2: Diet
result.diet.dietRules
// → ["3 Ổn định – 2 Giảm", "Nhai 20-30 lần", ...]

result.diet.fiberTarget.genderVi
// → "Nam: 9 nắm tay/ngày (5 rau củ + 4 hoa quả)"

result.diet.notifications
// → [{ type: 'danger', title: 'Nhịn ăn 21 ngày...', ... }]
```

---

## Extending the Engine

### Add new conflict rule
Edit `CONFLICT_RULES` in `smart-reminder.ts`:
```typescript
{ nutrientA: 'iron', nutrientB: 'calcium', minGapHours: 2, reasonVi: '...' }
```

### Add new ingredient alert
Edit `INGREDIENT_ALERTS` in `daily-diet.ts`:
```typescript
{ keywords: ['gluten'], dangerLevel: 'warning', titleVi: '...', messageVi: '...', icon: '🌾' }
```

### Add new diet rule trigger
Edit `buildDietRules()` in `daily-diet.ts`:
```typescript
if (profile.conditions.includes('new-condition')) {
  rules.push({ id: '...', nameVi: '...', ruleVi: '...', priority: 8, source: 'BS Phúc' });
}
```
