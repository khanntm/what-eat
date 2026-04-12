import type { Superfood } from './health-types';

// ============================================================================
// SIÊU THỰC PHẨM — Theo triết lý BS Trần Văn Phúc
// ============================================================================

export const SUPERFOODS: Superfood[] = [
  {
    id: 'hat-tia-to',
    nameVi: 'Hạt tía tô',
    nameEn: 'Perilla seeds',
    category: 'seed',
    descriptionVi: 'Giàu Omega-3 (ALA), chất xơ, kháng viêm tự nhiên. Nguồn Omega-3 thực vật hàng đầu tại Việt Nam.',
    servingSize: '1 muỗng canh (10g)',
    keyBenefitsVi: ['Omega-3 thực vật', 'Chống viêm', 'Hỗ trợ tiêu hóa', 'Giảm cholesterol'],
    nutrients: ['omega-3', 'magnesium'],
    goodFor: ['dyslipidemia', 'chronic-inflammation', 'gut-dysbiosis'],
  },
  {
    id: 'trung-chim-cut',
    nameVi: 'Trứng chim cút',
    nameEn: 'Quail eggs',
    category: 'egg',
    descriptionVi: 'Giàu Vitamin A, B2, Sắt, Selenium. Tỷ lệ dinh dưỡng/trọng lượng cao hơn trứng gà. Dễ hấp thu.',
    servingSize: '5 quả',
    keyBenefitsVi: ['Tăng miễn dịch', 'Bổ máu', 'Tốt cho mắt', 'Giàu Selenium chống oxy hóa'],
    nutrients: ['zinc', 'vitamin-d3', 'calcium'],
    goodFor: ['weak-immunity', 'gerd', 'osteoporosis'],
  },
  {
    id: 'trung-ga',
    nameVi: 'Trứng gà (nguyên quả)',
    nameEn: 'Whole egg',
    category: 'egg',
    descriptionVi: 'BS Phúc: "1 mũi tên trúng 2 đích" — vừa cung cấp protein, vừa kích thích túi mật co bóp tống sỏi. Ăn cả lòng đỏ.',
    servingSize: '2 quả',
    keyBenefitsVi: ['Protein hoàn chỉnh', 'Kích thích mật', 'Vitamin D3', 'Choline cho não'],
    nutrients: ['vitamin-d3', 'vitamin-b6', 'zinc'],
    goodFor: ['gallstone', 'low-stomach-acid', 'weak-immunity'],
  },
  {
    id: 'nghe',
    nameVi: 'Nghệ (Curcumin)',
    nameEn: 'Turmeric',
    category: 'spice',
    descriptionVi: 'Curcumin chống viêm cực mạnh. Kết hợp tiêu đen (Piperine) tăng hấp thu 2000%. Dùng với chất béo.',
    servingSize: '1 muỗng cà phê (3g)',
    keyBenefitsVi: ['Chống viêm mạnh', 'Bảo vệ gan', 'Hỗ trợ tiêu hóa', 'Chống oxy hóa'],
    nutrients: ['zinc'],
    goodFor: ['chronic-inflammation', 'gut-dysbiosis', 'joint-pain', 'dyslipidemia'],
  },
  {
    id: 'ca-hoi',
    nameVi: 'Cá hồi',
    nameEn: 'Salmon',
    category: 'protein',
    descriptionVi: 'Nguồn Omega-3 (DHA+EPA) hàng đầu, giàu Vitamin D3, protein chất lượng cao. Ăn 2-3 lần/tuần.',
    servingSize: '100g',
    keyBenefitsVi: ['Tim mạch', 'Não bộ', 'Chống viêm', 'Da đẹp'],
    nutrients: ['omega-3', 'vitamin-d3', 'vitamin-b6'],
    goodFor: ['dyslipidemia', 'chronic-inflammation', 'hypertension', 'chronic-stress', 'joint-pain'],
  },
  {
    id: 'ca-thu',
    nameVi: 'Cá thu',
    nameEn: 'Mackerel',
    category: 'protein',
    descriptionVi: 'Cá béo giá rẻ, Omega-3 cao ngang cá hồi. Phù hợp túi tiền người Việt.',
    servingSize: '100g',
    keyBenefitsVi: ['Omega-3 giá rẻ', 'Vitamin D3', 'Protein cao', 'Tốt cho tim'],
    nutrients: ['omega-3', 'vitamin-d3', 'vitamin-b6'],
    goodFor: ['dyslipidemia', 'hypertension', 'chronic-inflammation'],
  },
  {
    id: 'gung',
    nameVi: 'Gừng',
    nameEn: 'Ginger',
    category: 'spice',
    descriptionVi: 'Chống buồn nôn, kháng viêm, hỗ trợ tiêu hóa. Gingerol có tác dụng tương tự thuốc chống viêm.',
    servingSize: '1 lát dày (5g)',
    keyBenefitsVi: ['Hỗ trợ tiêu hóa', 'Chống buồn nôn', 'Kháng viêm', 'Giảm đau'],
    nutrients: ['magnesium', 'vitamin-c'],
    goodFor: ['gerd', 'gut-dysbiosis', 'chronic-inflammation'],
    avoidFor: ['gallstone'],
  },
  {
    id: 'kimchi',
    nameVi: 'Kim chi',
    nameEn: 'Kimchi',
    category: 'fermented',
    descriptionVi: 'Probiotic tự nhiên, giàu Vitamin K2, C, chất xơ. Tốt cho hệ vi sinh đường ruột.',
    servingSize: '50g',
    keyBenefitsVi: ['Probiotic tự nhiên', 'Đường ruột khỏe', 'Miễn dịch', 'Vitamin K2'],
    nutrients: ['vitamin-c'],
    goodFor: ['gut-dysbiosis', 'weak-immunity', 'chronic-inflammation'],
    avoidFor: ['gerd', 'hypertension'],
  },
  {
    id: 'sua-chua',
    nameVi: 'Sữa chua (không đường)',
    nameEn: 'Plain yogurt',
    category: 'fermented',
    descriptionVi: 'Probiotic + Canxi. Chọn loại không đường, có ghi "live cultures".',
    servingSize: '1 hũ (150g)',
    keyBenefitsVi: ['Canxi hấp thu tốt', 'Probiotic', 'Protein', 'Hỗ trợ tiêu hóa'],
    nutrients: ['calcium', 'zinc'],
    goodFor: ['gut-dysbiosis', 'osteoporosis', 'weak-immunity'],
  },
  {
    id: 'rau-mam',
    nameVi: 'Rau mầm',
    nameEn: 'Sprouts',
    category: 'vegetable',
    descriptionVi: 'Enzyme sống, vitamin gấp 10-30 lần hạt. PHẢI rửa kỹ, hấp nhẹ nếu miễn dịch yếu.',
    servingSize: '30g',
    keyBenefitsVi: ['Enzyme tiêu hóa', 'Vitamin C gấp 30x', 'Chất xơ', 'Ít calo'],
    nutrients: ['vitamin-c', 'vitamin-b6'],
    goodFor: ['gut-dysbiosis', 'weak-immunity', 'chronic-inflammation'],
    avoidFor: ['weak-immunity'], // Ăn sống nguy hiểm nếu miễn dịch yếu
  },
  {
    id: 'bong-cai-xanh',
    nameVi: 'Bông cải xanh (Broccoli)',
    nameEn: 'Broccoli',
    category: 'vegetable',
    descriptionVi: 'Sulforaphane chống ung thư, giàu Canxi thực vật, Vitamin C, K. Hấp nhẹ 3-5 phút giữ nguyên dưỡng chất.',
    servingSize: '100g',
    keyBenefitsVi: ['Sulforaphane chống ung thư', 'Canxi thực vật', 'Vitamin C', 'Chất xơ'],
    nutrients: ['calcium', 'vitamin-c', 'magnesium', 'vitamin-b6'],
    goodFor: ['osteoporosis', 'chronic-inflammation', 'gut-dysbiosis', 'dyslipidemia'],
  },
  {
    id: 'dau-oliu',
    nameVi: 'Dầu Oliu Extra Virgin',
    nameEn: 'Extra Virgin Olive Oil',
    category: 'oil',
    descriptionVi: 'Giàu polyphenol, Omega-9. Dùng ở nhiệt độ thấp hoặc trộn salad. KHÔNG chiên rán.',
    servingSize: '1 muỗng canh (15ml)',
    keyBenefitsVi: ['Polyphenol chống oxy hóa', 'Omega-9', 'Hấp thu vitamin tan dầu', 'Tim mạch'],
    nutrients: ['omega-3'],
    goodFor: ['dyslipidemia', 'hypertension', 'chronic-inflammation'],
  },
  {
    id: 'toi-den',
    nameVi: 'Tỏi đen',
    nameEn: 'Black garlic',
    category: 'spice',
    descriptionVi: 'Lên men từ tỏi trắng, S-Allyl Cysteine tăng gấp 6 lần. Chống oxy hóa mạnh, không gây hôi miệng.',
    servingSize: '2-3 tép/ngày',
    keyBenefitsVi: ['Chống oxy hóa gấp 6x tỏi thường', 'Hạ cholesterol', 'Tăng miễn dịch', 'Bảo vệ gan'],
    nutrients: ['zinc', 'vitamin-c', 'vitamin-b6'],
    goodFor: ['dyslipidemia', 'hypertension', 'weak-immunity'],
  },
  {
    id: 'hat-lanh',
    nameVi: 'Hạt lanh',
    nameEn: 'Flaxseeds',
    category: 'seed',
    descriptionVi: 'Omega-3 thực vật (ALA), Lignan chống ung thư, chất xơ. Xay nhỏ trước khi ăn để hấp thu.',
    servingSize: '1 muỗng canh (10g)',
    keyBenefitsVi: ['Omega-3 ALA', 'Lignan chống ung thư', 'Chất xơ hòa tan', 'Cân bằng hormone'],
    nutrients: ['omega-3', 'magnesium', 'zinc'],
    goodFor: ['dyslipidemia', 'chronic-inflammation', 'menopause-symptoms', 'gut-dysbiosis'],
  },
  {
    id: 'hat-chia',
    nameVi: 'Hạt chia',
    nameEn: 'Chia seeds',
    category: 'seed',
    descriptionVi: 'Omega-3, Canxi, chất xơ. Ngâm nước 15 phút trước khi ăn. Tốt cho người ăn chay.',
    servingSize: '2 muỗng canh (20g)',
    keyBenefitsVi: ['Omega-3 + Canxi thực vật', 'Chất xơ hút nước', 'No lâu', 'Kiểm soát đường huyết'],
    nutrients: ['omega-3', 'calcium', 'magnesium'],
    goodFor: ['dyslipidemia', 'osteoporosis', 'gut-dysbiosis', 'visceral-fat'],
  },
  {
    id: 'rong-bien',
    nameVi: 'Rong biển',
    nameEn: 'Seaweed',
    category: 'vegetable',
    descriptionVi: 'Iod tự nhiên (tuyến giáp), Canxi, Magie, chất xơ hòa tan. Fucoidan chống viêm.',
    servingSize: '5g khô',
    keyBenefitsVi: ['Iod cho tuyến giáp', 'Canxi + Magie', 'Fucoidan chống viêm', 'Ít calo'],
    nutrients: ['calcium', 'magnesium', 'zinc'],
    goodFor: ['thyroid', 'osteoporosis', 'chronic-inflammation'],
    avoidFor: ['thyroid'], // Quá nhiều Iod cũng nguy hiểm cho tuyến giáp
  },
];

// --- Lookup helpers ---

export function getSuperfood(id: string): Superfood | undefined {
  return SUPERFOODS.find(s => s.id === id);
}

export function getSuperfoodsForCondition(conditionId: string): {
  recommended: Superfood[];
  avoid: Superfood[];
} {
  return {
    recommended: SUPERFOODS.filter(s => s.goodFor.includes(conditionId as never)),
    avoid: SUPERFOODS.filter(s => s.avoidFor?.includes(conditionId as never)),
  };
}

export function getSuperfoodsByNutrient(nutrientId: string): Superfood[] {
  return SUPERFOODS.filter(s => s.nutrients.includes(nutrientId as never));
}
