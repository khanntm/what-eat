# Database Schema & Data Architecture Guide

## Architecture: Hybrid (Static TS + Future Supabase)

### Tại sao Hybrid?

| Loại data | Lưu trữ | Lý do |
|-----------|---------|-------|
| Vi chất, Superfoods, Anti-patterns, Rules | **TypeScript files** | Tĩnh, dev cập nhật, không cần DB |
| User Profile | **localStorage** | MVP không cần login |
| Health metrics, Supplement logs | **Supabase** (future) | Khi cần user accounts |

### Chi phí: FREE 100% (MVP)

---

## Static Data Files

### 1. health-types.ts — Type definitions

```typescript
// Core types dùng xuyên suốt
UserProfile { ageGroup, gender, conditions[], lifestyle[], concerns[] }
HealthConditionId  // 'gerd' | 'gallstone' | 'dyslipidemia' | ...
MicronutrientId    // 'calcium' | 'magnesium' | 'vitamin-d3' | ...
```

### 2. micronutrients.ts — 7 Vi chất Vàng

| ID | Tên | Loại | RDA Nam | RDA Nữ |
|----|-----|------|---------|--------|
| calcium | Canxi | mineral | 1000mg | 1000mg |
| magnesium | Magie | mineral | 420mg | 320mg |
| vitamin-d3 | Vitamin D3 | vitamin | 2000 IU | 2000 IU |
| zinc | Kẽm | mineral | 11mg | 8mg |
| vitamin-b6 | Vitamin B6 | vitamin | 1.7mg | 1.5mg |
| omega-3 | Omega-3 | fatty-acid | 1600mg | 1100mg |
| vitamin-c | Vitamin C | vitamin | 90mg | 75mg |

### 3. superfoods.ts — 16 Siêu thực phẩm

Mỗi superfood có: `goodFor[]` (bệnh lý nên ăn) và `avoidFor[]` (bệnh lý nên tránh).

### 4. anti-patterns.ts — 11 Lầm tưởng/Cảnh báo

4 danger levels: `info` → `warning` → `danger` → `critical`

### 5. recommendations.ts — 14 Recommendation Rules

Mỗi rule có: `triggerConditions[]`, `triggerLifestyle[]`, `priority` (1-10).

### 6. user-options.ts — UI Options + localStorage

Helpers: `saveProfile()`, `loadProfile()`, `clearProfile()`

---

## Future: Supabase Schema (khi cần login)

Chỉ 4 tables cho data động:

```sql
users (id, email, age_group, gender, conditions[], lifestyle[], concerns[])
user_health_metrics (weight, waist, hip, blood_pressure, cholesterol)
user_symptom_results (test_id, result_code, raw_value)
supplement_logs (micronutrient_id, dosage, taken_at, status)
```

File: `src/data/schema.sql`

---

## Cách thêm data mới

### Thêm vi chất mới
1. Thêm ID vào `MicronutrientId` type trong `health-types.ts`
2. Thêm object vào `MICRONUTRIENTS[]` trong `micronutrients.ts`
3. Cập nhật `MICRONUTRIENT_OPTIONS` trong `user-options.ts` (cho UI)

### Thêm superfood mới
1. Thêm ID vào `SuperfoodId` type
2. Thêm object vào `SUPERFOODS[]` trong `superfoods.ts`

### Thêm anti-pattern mới
1. Thêm object vào `ANTI_PATTERNS[]` trong `anti-patterns.ts`
2. Keywords array dùng để match khi user tìm kiếm

### Thêm recommendation rule mới
1. Thêm object vào `RECOMMENDATION_RULES[]` trong `recommendations.ts`
2. Set `triggerConditions[]` và `priority`
