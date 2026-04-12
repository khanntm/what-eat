# Health Module — UX Flow (Tối giản)

## Triết lý thiết kế

> "Giải thích bệnh học cho đứa trẻ 9 tuổi"
> — BS Trần Văn Phúc

- KHÔNG thuật ngữ y khoa trên UI
- KHÔNG cho user chọn bệnh lý, vi chất, liều lượng
- CHỈ 2 thứ: Tam Giác Vàng + 1 bài test dạ dày
- Logic y khoa phức tạp ẩn hoàn toàn trong engine

---

## User Flow — 7 Ngày Đầu Tiên

```
NGÀY 1
━━━━━━

  👋 Chào bạn!
  "Mình sẽ giúp bạn khỏe hơn mỗi ngày
   chỉ với 3 viên bổ sung đơn giản."
           │
           ▼
  🫶 Bạn là [👨 Nam] hay [👩 Nữ]?
  Bao nhiêu tuổi? [18-29] [30-39] ...
           │
           ▼
  ┌─────────────────────────────────────┐
  │  🏠 "Cơ thể bạn như một ngôi nhà"  │
  │  Cần 3 thứ để vững chắc:           │
  │  gạch, xi-măng, ánh nắng           │
  └─────────────┬───────────────────────┘
                │ swipe
  ┌─────────────▼───────────────────────┐
  │  🧱 "Canxi = Gạch xây nhà"        │
  │  Uống mỗi sáng sau ăn              │
  │  ☀️ 7:30 sáng                       │
  └─────────────┬───────────────────────┘
                │ swipe
  ┌─────────────▼───────────────────────┐
  │  🌞 "D3 = Ánh nắng"               │
  │  Giúp gạch dính vào nhà            │
  │  ☀️ Cùng Canxi buổi sáng            │
  └─────────────┬───────────────────────┘
                │ swipe
  ┌─────────────▼───────────────────────┐
  │  🌙 "Magie = Xi-măng"             │
  │  Giúp ngủ ngon, hết stress         │
  │  🌙 9:30 tối trước ngủ             │
  └─────────────┬───────────────────────┘
                │ swipe
  ┌─────────────▼───────────────────────┐
  │  ⏰ "Quy tắc duy nhất"            │
  │  Sáng: Canxi + D3                  │
  │  Tối:  Magie                        │
  │  "Cách xa nhau vì chúng giành nhau"│
  └─────────────┬───────────────────────┘
                │
                ▼
         [Bắt đầu uống ngay!]


NGÀY 2–6: MÀN HÌNH CHÍNH
━━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌─────────────────────────────────────┐
  │  Tam Giác Vàng          Ngày 3/7   │
  │  ○ ○ ● ○ ○ ○ ○  (progress bar)    │
  │                                     │
  │  ┌───────────────────────────────┐  │
  │  │ ☀️ Buổi sáng                  │  │
  │  │   🧱 Canxi 1000mg            │  │
  │  │   🌞 D3 2000 IU              │  │
  │  │              [Uống ngay] ◯    │  │
  │  └───────────────────────────────┘  │
  │                                     │
  │  ┌───────────────────────────────┐  │
  │  │ 🌙 Buổi tối                   │  │
  │  │   🌙 Magie 420mg              │  │
  │  │              [Uống ngay] ◯    │  │
  │  └───────────────────────────────┘  │
  │                                     │
  │  💡 Sáng Canxi+D3 — Tối Magie     │
  │     "Chúng giành nhau nếu gần"     │
  │                                     │
  │  ✅ cả 2 done →                     │
  │  🎉 "Hoàn thành! Cơ thể cảm ơn"   │
  └─────────────────────────────────────┘


NGÀY 6-7: MỞ KHÓA STOMACH TEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌─────────────────────────────────────┐
  │  🧪 Kiểm tra sức khỏe dạ dày      │
  │                                     │
  │  Chuẩn bị:                          │
  │  🥄 1/4 muỗng baking soda          │
  │  🥛 200ml nước ấm                  │
  │  ⏰ Bụng đói                        │
  │                                     │
  │  Cách làm:                          │
  │  ① Hòa baking soda vào nước        │
  │  ② Uống hết 1 lần                  │
  │  ③ Bấm bắt đầu đếm                │
  │  ④ Khi ợ hơi → bấm dừng           │
  │                                     │
  │  [Đã uống xong, bắt đầu đếm!]    │
  └─────────────────┬───────────────────┘
                    ▼
  ┌─────────────────────────────────────┐
  │          ⏱️ 2:34                    │
  │       (ping animation)             │
  │                                     │
  │     [🟢 Vừa ợ hơi!]               │
  │                                     │
  │  (5 phút → nút "Chưa ợ" xuất hiện)│
  └─────────────────┬───────────────────┘
                    ▼
  KẾT QUẢ (giải thích như cho trẻ 9 tuổi):

  < 1 phút  → 🔴 "Dạ dày hơi nóng"
                   Bếp lửa cháy quá mạnh
                   → Ăn đúng giờ, no 70%, nhai kỹ

  1-3 phút  → 🟢 "Dạ dày khỏe mạnh!"
                   Bếp lửa cháy tốt
                   → Tiếp tục Tam Giác Vàng

  > 3 phút  → 🟡 "Dạ dày hơi lười"
                   Bếp lửa cháy yếu
                   → Canxi Cacbonat + trứng sáng
```

---

## So sánh UI cũ vs mới

| | UI cũ (Task 3) | UI mới |
|---|---|---|
| Bước onboard | 4 bước, 40+ options | **2 bước** (giới tính + tuổi) |
| Thuật ngữ | GERD, Dyslipidemia, PPI | **Gạch, Xi-măng, Ánh nắng** |
| Vi chất hiển thị | 7 (user chọn) | **3** (tự động) |
| Logic y khoa | Hiển thị trên UI | **Ẩn trong engine** |
| Thời gian bắt đầu | 2-3 phút setup | **10 giây** |
| Retention hook | Không có | **7-day progress + test mở khóa** |

---

## Technical Details

**File**: `src/app/health/page.tsx` (self-contained, 1 file)

**State**: localStorage key `what-eat-health-simple`
```ts
{
  gender: 'male' | 'female',
  ageGroup: string,
  startDate: '2026-04-12',       // Tính ngày thứ mấy
  todayChecks: { morning, night },
  checkHistory: { '2026-04-12': { morning: true, night: true } },
  testResult?: 'low' | 'normal' | 'high'
}
```

**Screens** (all in 1 file):
1. `welcome` → Welcome
2. `gender` → GenderScreen
3. `triangle-intro` → TriangleIntro (5-step story)
4. `daily` → DailyView (main screen)
5. `stomach-test` → StomachTest (instructions)
6. `test-running` → TestTimer (countdown)
7. `test-result` → TestResult (personalized advice)

**HealthResult.tsx**: Giữ nguyên cho advanced mode (có thể truy cập sau).
