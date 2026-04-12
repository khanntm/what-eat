# Health Module — UX Flow & Technical Guide

## Tổng quan

Module Sức khỏe giúp người dùng nhận gợi ý **dinh dưỡng cá nhân hóa** dựa trên triết lý y khoa BS Trần Văn Phúc.
Không cần đăng nhập — dữ liệu lưu `localStorage`.

**URL**: `/health`
**Entry point**: Bottom Nav > 🩺 Sức khỏe

---

## UX Flow — 5 Màn hình

```
┌────────────────────────────────────────────────────────────────┐
│                    BOTTOM NAV                                  │
│  🍜 Ăn gì?  │  🌅 Ăn sáng  │  🩺 Sức khỏe  │  🧊 NL  │  👨‍👩‍👧 Vote │
└───────────────────────┬────────────────────────────────────────┘
                        │ tap
                        ▼
┌─────────────────────────────────────────┐
│  SCREEN 1: Thông tin cơ bản             │  Bước 1/4
│                                         │
│  Giới tính:  [♂️ Nam]  [♀️ Nữ]            │
│                                         │
│  Độ tuổi:                               │
│  [18-29] [30-39] [40-49]               │
│  [50-59] [60+]                          │
│                                         │
│            [  Tiếp theo  ]              │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│  SCREEN 2: Vấn đề sức khỏe             │  Bước 2/4
│                                         │
│  TIÊU HÓA                              │
│  [🔥 Trào ngược]  [🪨 Sỏi mật]         │
│  [🦠 Rối loạn TH]  [😣 Đầy bụng]       │
│                                         │
│  TIM MẠCH                              │
│  [🩸 Mỡ máu]  [💓 Huyết áp]            │
│  [🫃 Béo bụng]                          │
│                                         │
│  ... (Xương khớp, Nội tiết,            │
│       Thần kinh, Miễn dịch)            │
│                                         │
│  [Quay lại]  [Tiếp / Bỏ qua]          │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│  SCREEN 3: Thói quen sinh hoạt         │  Bước 3/4
│                                         │
│  [🪑 Ít vận động]  [😰 Stress cao]      │
│  [💼 Làm >60h/tuần]  [🌙 Ngủ ít]       │
│  [🚬 Hút thuốc]  [🍺 Rượu bia]         │
│  [⏰ Bỏ bữa sáng]  [🌃 Ăn khuya]       │
│  [🤰 Mang thai]*  [🤱 Cho con bú]*      │
│           (* chỉ hiện nếu Nữ)          │
│                                         │
│  [Quay lại]  [Tiếp / Bỏ qua]          │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│  SCREEN 4: Vi chất quan tâm            │  Bước 4/4
│                                         │
│  [🦴 Canxi — Xương, cơ, thần kinh]     │
│  [✨ Magie — Tiêu hóa, ngủ, stress]     │
│  [☀️ Vitamin D3 — Hấp thu canxi]        │
│  [🛡️ Kẽm — Miễn dịch, da, tóc]         │
│  [🧬 Vitamin B6 — Hormone]             │
│  [🐟 Omega-3 — Tim mạch, não]          │
│  [🍊 Vitamin C — Chống oxy hóa]         │
│                                         │
│  [Quay lại]  [★ Xem gợi ý cho tôi]    │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│  SCREEN 5: KẾT QUẢ                     │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ ⚠️ Cảnh báo Anti-pattern (nếu có) │  │
│  │ "Nhịn ăn 21 ngày detox..."       │  │
│  └───────────────────────────────────┘  │
│                                         │
│  [💊 Lịch Vi chất]  [🍽️ Thực đơn]      │
│                                         │
│  ── Tab 1: Lịch Vi chất ──             │
│  07:30 Sau bữa sáng                    │
│    ● Canxi 1000mg                      │
│    ● Vitamin D3 2000 IU                │
│    💡 Uống cùng D3 + sau bữa ăn        │
│                                         │
│  12:00 Bữa trưa                        │
│    ● Omega-3 1600mg                    │
│    💡 Cùng bữa ăn có chất béo          │
│                                         │
│  21:30 Trước khi ngủ                   │
│    ● Magie 420mg                       │
│    💡 Glycinate giúp ngủ sâu           │
│                                         │
│  ⚠️ Canxi-Magie đã tách >= 2 tiếng     │
│                                         │
│  ── Tab 2: Thực đơn ──                 │
│  🥬 Quy tắc Nắm Đấm                   │
│  Nam: 9 nắm/ngày (5 rau + 4 quả)      │
│  [Sáng: 2] [Trưa: 4] [Tối: 3]        │
│                                         │
│  📋 Quy tắc ăn uống                    │
│  ● 3 Ổn định – 2 Giảm (GERD)          │
│  ● Nhai kỹ 20-30 lần                   │
│  ● Không nằm ngay sau ăn               │
│                                         │
│  🌅 Bữa sáng [Nhai 20-30 lần]          │
│  🍳 Trứng chiên    +5                  │
│  🥣 Cháo thịt bằm  +3                  │
│  ✦ Thêm 1 muỗng hạt chia              │
│                                         │
│  ☀️ Bữa trưa                            │
│  ...                                    │
│                                         │
│  🌟 Siêu thực phẩm nên thêm           │
│  [Hạt tía tô]  [Trứng chim cút]       │
│  [Nghệ]        [Cá hồi]                │
└─────────────────────────────────────────┘
```

---

## Kiến trúc kỹ thuật

### Files Structure

```
src/
├── app/health/page.tsx         ← Wizard 4 bước (client component)
├── components/HealthResult.tsx ← Màn hình kết quả (2 tabs)
├── lib/engine/
│   ├── index.ts                ← runEngine(profile) → output
│   ├── smart-reminder.ts       ← Luồng 1: Lịch vi chất
│   └── daily-diet.ts           ← Luồng 2: Thực đơn + Anti-pattern
└── data/
    ├── health-types.ts         ← TypeScript interfaces
    ├── user-options.ts         ← Selection options + localStorage
    ├── micronutrients.ts       ← 7 Vi chất Vàng
    ├── superfoods.ts           ← 16 Siêu thực phẩm
    ├── anti-patterns.ts        ← 11 Lầm tưởng/Cảnh báo
    └── recommendations.ts      ← 14 Rules + Engine cũ
```

### Data Flow

```
localStorage ──load──→ UserProfile
                           │
                    runEngine(profile)
                     ┌─────┴──────┐
                     ▼            ▼
          SmartReminderPlan   DailyDietPlan
          (lịch vi chất)     (thực đơn + cảnh báo)
                     │            │
                     └─────┬──────┘
                           ▼
                    HealthResult.tsx
                    (render 2 tabs)
```

### Algorithms

#### Smart Reminder — Constraint Satisfaction
1. Resolve vi chất cần bổ sung (từ conditions + concerns + lifestyle)
2. Xác định liều RDA (male/female/pregnant)
3. Gán preferred time slot → resolve conflicts:
   - **Canxi ↔ Magie**: cách >= 2 tiếng (Canxi sáng, Magie tối)
   - **Canxi ↔ Kẽm**: cách >= 2 tiếng
   - **D3**: cùng bữa có chất béo (sáng/trưa)
4. Merge cùng slot → sinh warnings

#### Daily Diet — Scoring Algorithm
1. Tính fiber target (Quy tắc Nắm Đấm: Nam 9, Nữ 7)
2. Build diet rules từ conditions (GERD → "3ÔĐ-2G")
3. Score mỗi món:
   - `+3` nếu nguyên liệu match superfood tốt cho user
   - `+2` nếu tag healthy hoặc rau/canh
   - `-3` nếu nguyên liệu nên tránh
   - `-2` nếu GERD + cay/chua/chiên
4. Anti-pattern Scanner quét ingredients → cảnh báo Lectin/Phytic acid

---

## Anti-pattern Notifications

Các cảnh báo tự động khi phát hiện nguyên liệu nguy hiểm:

| Trigger | Level | Cảnh báo |
|---------|-------|----------|
| Đậu đỗ (đậu đỏ, đậu nành...) | DANGER | Lectin: nấu >100°C, 10 phút |
| Gạo lứt | WARNING | Ngâm 12-24h, nồi áp suất |
| Bánh mì nguyên cám | WARNING | Chọn sourdough thay thế |
| Nước ép | WARNING | Ăn nguyên quả tốt hơn |
| Rau sống | WARNING | Rửa kỹ, miễn dịch yếu nên hấp |

---

## Responsive & UX Guidelines

- **Mobile-first**: max-width 448px (max-w-lg)
- **Touch targets**: min 44px (py-2.5 px-3)
- **Color scheme**: Teal (sức khỏe) / Orange (thực đơn) / Amber (cảnh báo) / Red (nguy hiểm)
- **Animations**: slide-up cho transition giữa các bước
- **Progress bar**: 4 steps hiển thị ở đầu wizard
- **localStorage**: profile lưu ngay khi user bấm "Xem gợi ý"
- **No login required**: mọi thứ client-side

---

## Cách test

```bash
# Dev mode
npm run dev
# Mở http://localhost:3000/health

# Production build
npm run build && npm start
```

### Test cases
1. User Nam 30-39, GERD + mất ngủ → expect: Canxi/Magie/D3 schedule + "3ÔĐ-2G" rule
2. User Nữ 50-59, loãng xương + tiền mãn kinh → expect: Canxi 1200mg + D3 + phytoestrogen
3. User có thực đơn chứa "đậu đỏ" → expect: Anti-pattern notification Lectin
4. Canxi + Magie → expect: tách >= 2h (sáng vs tối)
