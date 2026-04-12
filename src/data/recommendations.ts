import type { RecommendationRule, UserProfile } from './health-types';
import { getMicronutrientsForCondition } from './micronutrients';
import { getSuperfoodsForCondition } from './superfoods';
import { getAntiPatternsForCondition } from './anti-patterns';

// ============================================================================
// RECOMMENDATION RULES — Logic gợi ý theo BS Trần Văn Phúc
// ============================================================================

export const RECOMMENDATION_RULES: RecommendationRule[] = [
  // ===================== MODULE 1: TIÊU HÓA =====================
  {
    id: 'm1-3on-2giam',
    moduleId: 'm1',
    nameVi: 'Thuật toán "3 Ổn định – 2 Giảm"',
    descriptionVi: 'Quy tắc vàng cho người trào ngược dạ dày.',
    triggerConditions: ['gerd'],
    type: 'diet-plan',
    recommendationVi:
      '3 ỔN ĐỊNH: (1) Ăn đúng giờ cố định, (2) Chỉ ăn no 70%, (3) Nhiệt độ thức ăn ~40°C (không quá nóng/lạnh). ' +
      '2 GIẢM: (1) Giảm dầu mỡ, (2) Giảm chua cay. ' +
      'Nhai kỹ 20-30 lần/miếng.',
    priority: 9,
  },
  {
    id: 'm1-gut-clean',
    moduleId: 'm1',
    nameVi: 'Làm sạch ruột tự nhiên',
    descriptionVi: 'Công thức nắm tay rau quả hàng ngày.',
    triggerConditions: ['gut-dysbiosis'],
    type: 'diet-plan',
    recommendationVi:
      'Nam: 9 nắm tay rau quả/ngày (5 rau củ + 4 hoa quả). ' +
      'Nữ: 7 nắm tay/ngày (4 rau củ + 3 hoa quả). ' +
      'Ưu tiên rau lá xanh đậm + quả ít ngọt.',
    triggerGender: undefined, // Áp dụng cả hai, nội dung phân biệt
    priority: 8,
  },
  {
    id: 'm1-low-acid-fix',
    moduleId: 'm1',
    nameVi: 'Khắc phục thiếu axit dạ dày',
    descriptionVi: 'Bổ sung Canxi/Magie Cacbonat kết hợp trứng.',
    triggerConditions: ['low-stomach-acid', 'gerd'],
    type: 'supplement',
    recommendationVi:
      'Bổ sung Canxi Cacbonat hoặc Magie Cacbonat để cân bằng axit. ' +
      'Kết hợp ăn trứng (1 mũi tên trúng 2 đích: protein + kích thích mật). ' +
      'CẢNH BÁO: Nếu THỪA axit mà uống Cacbonat → bệnh nặng hơn. Làm test Baking Soda trước.',
    priority: 9,
  },
  {
    id: 'm1-gallstone-diet',
    moduleId: 'm1',
    nameVi: 'Chế độ ăn phòng sỏi mật',
    descriptionVi: 'Kích thích túi mật co bóp tự nhiên.',
    triggerConditions: ['gallstone'],
    type: 'diet-plan',
    recommendationVi:
      'Ăn 2 quả trứng chiên mỡ/ngày để kích thích túi mật co bóp, tống sỏi nhỏ. ' +
      'Tránh nhịn ăn kéo dài (mật ứ đọng → tạo sỏi). ' +
      'Bổ sung chất xơ hòa tan (hạt chia, yến mạch).',
    priority: 8,
  },

  // ===================== MODULE 2: TIM MẠCH =====================
  {
    id: 'm2-karoshi-alert',
    moduleId: 'm2',
    nameVi: 'Cảnh báo Karoshi (đột tử do làm việc)',
    descriptionVi: 'Cảnh báo khi user làm việc quá sức.',
    triggerConditions: ['karoshi'],
    triggerLifestyle: ['overwork'],
    type: 'warning',
    recommendationVi:
      '⚠️ CẢNH BÁO KAROSHI: Bạn đang trong nhóm nguy cơ đột tử do làm việc quá sức. ' +
      'Giảm giờ làm xuống <50h/tuần. Nghỉ 10 phút mỗi 90 phút. ' +
      'Ngủ đủ 7-8h. Kiểm tra huyết áp, mỡ máu định kỳ.',
    priority: 10,
  },
  {
    id: 'm2-lipid-diet',
    moduleId: 'm2',
    nameVi: 'Chế độ ăn giảm mỡ máu',
    descriptionVi: 'Omega-3 + chất xơ + giảm tinh bột.',
    triggerConditions: ['dyslipidemia'],
    type: 'diet-plan',
    recommendationVi:
      'Ăn cá béo 2-3 lần/tuần (cá hồi, cá thu). ' +
      'Bổ sung hạt (tía tô, lanh, chia) hàng ngày. ' +
      'Giảm tinh bột trắng (cơm trắng, bánh mì), thay bằng ngũ cốc nguyên hạt. ' +
      'Dầu oliu thay mỡ động vật khi nấu ăn.',
    priority: 8,
  },
  {
    id: 'm2-visceral-fat',
    moduleId: 'm2',
    nameVi: 'Giảm mỡ nội tạng (Bụng Tướng Quân)',
    descriptionVi: 'Kết hợp dinh dưỡng + vận động từ từ.',
    triggerConditions: ['visceral-fat'],
    triggerLifestyle: ['sedentary', 'late-night-eating'],
    type: 'lifestyle',
    recommendationVi:
      'Bước 1: Đo WHR (Vòng bụng/Vòng mông). Nam >0.9, Nữ >0.85 = nguy cơ. ' +
      'Bước 2: KHÔNG ăn sau 20h. Bữa tối nhẹ, giàu protein. ' +
      'Bước 3: Đi bộ nhanh 30 phút/ngày (KHÔNG tập nặng đột ngột). ' +
      'Bước 4: Giảm đường, tinh bột trắng. Tăng rau xanh, protein.',
    priority: 8,
  },
  {
    id: 'm2-hypertension-lifestyle',
    moduleId: 'm2',
    nameVi: 'Kiểm soát huyết áp tự nhiên',
    descriptionVi: 'Magie + giảm muối + vận động.',
    triggerConditions: ['hypertension'],
    type: 'lifestyle',
    recommendationVi:
      'Bổ sung Magie (giãn mạch tự nhiên). Giảm muối <5g/ngày. ' +
      'Tăng Kali từ chuối, rau xanh. Đi bộ 30-45 phút/ngày. ' +
      'Giảm stress: hít thở sâu 4-7-8 (hít 4s, giữ 7s, thở 8s).',
    priority: 8,
  },

  // ===================== MODULE 5: THẦN KINH =====================
  {
    id: 'm5-insomnia-fix',
    moduleId: 'm5',
    nameVi: 'Cải thiện giấc ngủ tự nhiên',
    descriptionVi: 'Magie + thói quen ngủ.',
    triggerConditions: ['insomnia'],
    triggerLifestyle: ['poor-sleep', 'high-stress'],
    type: 'supplement',
    recommendationVi:
      'Magie Glycinate 200-400mg trước ngủ 1h. ' +
      'Tắt màn hình 1h trước ngủ. Phòng tối, mát (24-26°C). ' +
      'Không caffeine sau 14h. Tắm nước ấm trước ngủ.',
    priority: 8,
  },

  // ===================== CROSS-MODULE: PHỤ NỮ =====================
  {
    id: 'cross-pregnant-nutrients',
    moduleId: 'm4',
    nameVi: 'Vi chất thiết yếu cho phụ nữ mang thai',
    descriptionVi: 'Tăng liều Canxi, D3, DHA.',
    triggerConditions: [],
    triggerLifestyle: ['pregnant'],
    type: 'supplement',
    recommendationVi:
      'Canxi 1200mg/ngày (tăng từ 1000mg). ' +
      'Vitamin D3 4000 IU/ngày. DHA 200mg/ngày (từ cá hoặc viên dầu cá). ' +
      'Sắt + Acid Folic theo chỉ định bác sĩ. ' +
      'KHÔNG tự ý dùng thảo dược (nghệ, gừng liều cao).',
    priority: 9,
  },
  {
    id: 'cross-menopause',
    moduleId: 'm4',
    nameVi: 'Hỗ trợ tiền mãn kinh',
    descriptionVi: 'Canxi + D3 + Phytoestrogen.',
    triggerConditions: ['menopause-symptoms'],
    triggerAgeGroups: ['40-49', '50-59', '60+'],
    triggerGender: 'female',
    type: 'supplement',
    recommendationVi:
      'Canxi 1200mg + D3 2000 IU + K2 hàng ngày. ' +
      'Phytoestrogen từ đậu nành (ĐÃ NẤU CHÍN), hạt lanh. ' +
      'Omega-3 giúp giảm bốc hỏa. B6 cân bằng hormone.',
    priority: 8,
  },

  // ===================== LIFESTYLE TRIGGERS =====================
  {
    id: 'lifestyle-smoker-warning',
    moduleId: 'm6',
    nameVi: 'Cảnh báo người hút thuốc',
    descriptionVi: 'Tăng nhu cầu Vitamin C + chống oxy hóa.',
    triggerConditions: [],
    triggerLifestyle: ['smoker'],
    type: 'warning',
    recommendationVi:
      'Hút thuốc tiêu hủy Vitamin C (cần thêm 35mg/ngày so với người không hút). ' +
      'Tăng ăn trái cây giàu C: ổi, cam, kiwi. Bổ sung Omega-3 chống viêm phổi.',
    priority: 7,
  },
  {
    id: 'lifestyle-alcohol-warning',
    moduleId: 'm1',
    nameVi: 'Cảnh báo người uống rượu bia',
    descriptionVi: 'Bảo vệ gan + bổ sung B6.',
    triggerConditions: [],
    triggerLifestyle: ['alcohol'],
    type: 'warning',
    recommendationVi:
      'Rượu bia gây thiếu hụt B6, B12, Magie, Kẽm. Phá hủy niêm mạc dạ dày. ' +
      'Bổ sung Nghệ (Curcumin) bảo vệ gan. Uống đủ nước. ' +
      'Không uống rượu khi bụng đói.',
    priority: 7,
  },
];

// ============================================================================
// RECOMMENDATION ENGINE — Matching logic
// ============================================================================

export interface PersonalizedRecommendation {
  rule: RecommendationRule;
  matchScore: number;       // Điểm phù hợp (càng cao càng ưu tiên)
  matchReasons: string[];   // Lý do match
}

/**
 * Gợi ý cá nhân hóa dựa trên UserProfile (không cần login)
 */
export function getRecommendations(profile: UserProfile): PersonalizedRecommendation[] {
  const results: PersonalizedRecommendation[] = [];

  for (const rule of RECOMMENDATION_RULES) {
    const reasons: string[] = [];
    let score = 0;

    // Match by health conditions
    for (const cond of rule.triggerConditions) {
      if (profile.conditions.includes(cond)) {
        score += 3;
        reasons.push(`Bạn đang gặp: ${cond}`);
      }
    }

    // Match by lifestyle
    if (rule.triggerLifestyle) {
      for (const flag of rule.triggerLifestyle) {
        if (profile.lifestyle.includes(flag)) {
          score += 2;
          reasons.push(`Thói quen: ${flag}`);
        }
      }
    }

    // Match by age group
    if (rule.triggerAgeGroups?.includes(profile.ageGroup)) {
      score += 1;
      reasons.push(`Độ tuổi: ${profile.ageGroup}`);
    }

    // Match by gender
    if (rule.triggerGender && rule.triggerGender === profile.gender) {
      score += 1;
      reasons.push(`Giới tính phù hợp`);
    }

    // Only include if at least one match
    if (score > 0) {
      results.push({
        rule,
        matchScore: score * rule.priority,
        matchReasons: reasons,
      });
    }
  }

  // Sort by score descending
  return results.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Lấy toàn bộ gợi ý cho 1 condition (vi chất + thực phẩm + cảnh báo + rules)
 */
export function getFullRecommendationForCondition(conditionId: string) {
  return {
    micronutrients: getMicronutrientsForCondition(conditionId),
    superfoods: getSuperfoodsForCondition(conditionId),
    antiPatterns: getAntiPatternsForCondition(conditionId),
    rules: RECOMMENDATION_RULES.filter(r =>
      r.triggerConditions.includes(conditionId as never)
    ),
  };
}
