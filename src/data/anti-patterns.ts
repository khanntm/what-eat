import type { AntiPattern } from './health-types';

// ============================================================================
// ANTI-PATTERNS — Lầm tưởng & Cảnh báo theo BS Trần Văn Phúc
// Danger levels: info → warning → danger → critical
// ============================================================================

export const ANTI_PATTERNS: AntiPattern[] = [
  // ===================== MODULE 1: TIÊU HÓA =====================
  {
    id: 'no-21day-fast',
    moduleId: 'm1',
    category: 'dangerous-practice',
    mythVi: 'Nhịn ăn 21 ngày để "thải độc ruột" hoặc detox cơ thể.',
    truthVi:
      'Nhịn ăn kéo dài phá hủy chu trình Krebs, cơ thể phân giải cơ bắp để tạo năng lượng. Sinh ra axit lactic gây độc, tăng nguy cơ ung thư. Nước ép KHÔNG thể thay thế thức ăn đặc.',
    dangerLevel: 'critical',
    keywords: ['nhịn ăn', 'detox', 'thải độc', '21 ngày', 'fasting', 'thanh lọc'],
    relatedConditions: ['gerd', 'gut-dysbiosis'],
  },
  {
    id: 'no-raw-beans',
    moduleId: 'm1',
    category: 'food-myth',
    mythVi: 'Ăn sống các loại đậu (đậu nành, đậu đỏ, đậu lima) vì nghĩ giữ nguyên dinh dưỡng.',
    truthVi:
      'Đậu sống chứa Lectin và Phytohaemagglutinin — độc tố gây nôn, tiêu chảy nghiêm trọng, thậm chí ngộ độc nặng. PHẢI nấu chín kỹ ở >100°C ít nhất 10 phút.',
    dangerLevel: 'danger',
    keywords: ['đậu sống', 'ăn sống', 'raw beans', 'lectin', 'đậu nành sống'],
    relatedConditions: ['gut-dysbiosis'],
  },
  {
    id: 'no-gallbladder-rush',
    moduleId: 'm1',
    category: 'dangerous-practice',
    mythVi: 'Cắt túi mật ngay khi phát hiện sỏi nhỏ.',
    truthVi:
      'Chỉ cắt khi sỏi gây biến chứng thực sự (viêm cấp, tắc ống mật). Nếu chưa mất chức năng: điều trị bảo tồn bằng siêu âm tán sỏi, hoặc ăn 2 quả trứng chiên mỡ để kích thích túi mật co bóp tống sỏi tự nhiên.',
    dangerLevel: 'danger',
    keywords: ['cắt túi mật', 'sỏi mật', 'phẫu thuật mật', 'gallbladder'],
    relatedConditions: ['gallstone'],
  },
  {
    id: 'no-juice-cleanse',
    moduleId: 'm1',
    category: 'diet-myth',
    mythVi: 'Uống nước ép thay bữa ăn để "thanh lọc" cơ thể.',
    truthVi:
      'Nước ép làm mất toàn bộ chất xơ, gây tăng đường huyết đột ngột → tụt đường huyết → thèm ăn nhiều hơn. Hỏng chu trình Krebs. Ăn nguyên quả tốt hơn gấp nhiều lần.',
    dangerLevel: 'warning',
    keywords: ['nước ép', 'juice cleanse', 'ép trái cây', 'sinh tố thay cơm'],
    relatedConditions: ['gerd', 'gut-dysbiosis', 'visceral-fat'],
  },
  {
    id: 'no-antacid-overuse',
    moduleId: 'm1',
    category: 'supplement-myth',
    mythVi: 'Uống thuốc giảm axit (PPI, antacid) dài hạn để trị GERD.',
    truthVi:
      'Phần lớn GERD do THIẾU axit (không phải thừa). Dùng PPI dài hạn → giảm hấp thu Canxi, Magie, B12 → loãng xương, suy nhược. Cần test Baking Soda để xác định đúng nguyên nhân.',
    dangerLevel: 'danger',
    keywords: ['PPI', 'antacid', 'omeprazole', 'thuốc dạ dày', 'giảm axit'],
    relatedConditions: ['gerd', 'low-stomach-acid', 'osteoporosis'],
  },

  // ===================== MODULE 2: TIM MẠCH =====================
  {
    id: 'no-skip-breakfast',
    moduleId: 'm2',
    category: 'diet-myth',
    mythVi: 'Nhịn ăn sáng để giảm cân, giảm mỡ máu.',
    truthVi:
      'Nhịn sáng khiến cơ thể tích mỡ nhiều hơn ở bữa sau (phản ứng sinh tồn). Bữa sáng giàu protein + chất béo lành mạnh giúp ổn định đường huyết cả ngày.',
    dangerLevel: 'warning',
    keywords: ['nhịn sáng', 'bỏ bữa sáng', 'skip breakfast', 'giảm cân nhịn ăn'],
    relatedConditions: ['visceral-fat', 'dyslipidemia'],
  },
  {
    id: 'no-sudden-intense-exercise',
    moduleId: 'm2',
    category: 'lifestyle-myth',
    mythVi: 'Tập thể dục cường độ cao đột ngột để giảm mỡ máu / béo bụng nhanh.',
    truthVi:
      'Người mỡ máu cao hoặc béo bụng tập cường độ cao đột ngột có nguy cơ đột quỵ, nhồi máu cơ tim. Cần tập từ từ, tăng dần. Đi bộ nhanh 30 phút/ngày là khởi đầu an toàn.',
    dangerLevel: 'danger',
    keywords: ['tập nặng', 'cardio cường độ cao', 'giảm mỡ nhanh', 'gym đột ngột'],
    relatedConditions: ['dyslipidemia', 'hypertension', 'visceral-fat', 'karoshi'],
  },
  {
    id: 'no-cholesterol-fear',
    moduleId: 'm2',
    category: 'food-myth',
    mythVi: 'Không ăn trứng, tôm, mỡ động vật vì sợ cholesterol máu tăng.',
    truthVi:
      '70% cholesterol do gan tự tổng hợp, chỉ 30% từ thức ăn. Trứng nguyên quả rất tốt, cholesterol trong trứng không trực tiếp tăng cholesterol máu. Mỡ trans (margarine, đồ chiên rán) mới là thủ phạm.',
    dangerLevel: 'info',
    keywords: ['cholesterol', 'trứng cholesterol', 'sợ mỡ', 'kiêng trứng'],
    relatedConditions: ['dyslipidemia'],
  },

  // ===================== MODULE 3-6: MỞ RỘNG =====================
  {
    id: 'no-calcium-excess',
    moduleId: 'm3',
    category: 'supplement-myth',
    mythVi: 'Uống Canxi liều cao để phòng loãng xương mà không bổ sung D3 và K2.',
    truthVi:
      'Canxi không có D3 → không hấp thu. Canxi không có K2 → lắng đọng trong mạch máu thay vì xương, tăng nguy cơ vôi hóa động mạch. Bộ 3: Canxi + D3 + K2 luôn đi cùng nhau.',
    dangerLevel: 'danger',
    keywords: ['canxi liều cao', 'uống canxi', 'loãng xương', 'vôi hóa'],
    relatedConditions: ['osteoporosis', 'hypertension'],
  },
  {
    id: 'no-sleep-pill-dependency',
    moduleId: 'm5',
    category: 'lifestyle-myth',
    mythVi: 'Dùng thuốc ngủ dài hạn để giải quyết mất ngủ.',
    truthVi:
      'Thuốc ngủ chỉ là giải pháp tạm thời, gây phụ thuộc và giảm chất lượng giấc ngủ sâu. Giải quyết gốc: bổ sung Magie Glycinate buổi tối, giảm ánh sáng xanh, ngủ đúng giờ.',
    dangerLevel: 'warning',
    keywords: ['thuốc ngủ', 'mất ngủ', 'sedative', 'sleeping pill'],
    relatedConditions: ['insomnia', 'chronic-stress'],
  },
  {
    id: 'no-multivitamin-replace-food',
    moduleId: 'm6',
    category: 'supplement-myth',
    mythVi: 'Uống multivitamin tổng hợp thay cho ăn uống đầy đủ.',
    truthVi:
      'Vitamin tổng hợp không thể thay thế thực phẩm thật. Thực phẩm chứa hàng ngàn hợp chất phytochemical mà viên uống không có. Ưu tiên thực phẩm, chỉ bổ sung khi thiếu hụt cụ thể.',
    dangerLevel: 'info',
    keywords: ['multivitamin', 'vitamin tổng hợp', 'thay thế thức ăn', 'viên uống'],
    relatedConditions: ['weak-immunity'],
  },
];

// --- Lookup helpers ---

export function getAntiPatternsForCondition(conditionId: string): AntiPattern[] {
  return ANTI_PATTERNS.filter(ap =>
    ap.relatedConditions.includes(conditionId as never)
  );
}

export function searchAntiPatterns(keyword: string): AntiPattern[] {
  const lower = keyword.toLowerCase();
  return ANTI_PATTERNS.filter(ap =>
    ap.keywords.some(k => k.includes(lower)) ||
    ap.mythVi.toLowerCase().includes(lower) ||
    ap.truthVi.toLowerCase().includes(lower)
  );
}

export function getCriticalWarnings(): AntiPattern[] {
  return ANTI_PATTERNS.filter(ap =>
    ap.dangerLevel === 'critical' || ap.dangerLevel === 'danger'
  );
}
