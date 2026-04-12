import type { Micronutrient } from './health-types';

// ============================================================================
// 7 VI CHẤT VÀNG — Theo triết lý BS Trần Văn Phúc
// ============================================================================

export const MICRONUTRIENTS: Micronutrient[] = [
  {
    id: 'calcium',
    nameVi: 'Canxi',
    nameEn: 'Calcium',
    category: 'mineral',
    descriptionVi:
      'Vi chất nền tảng cho xương, cơ, thần kinh. Thiếu Canxi gây co thắt cơ trơn dẫn đến trào ngược dạ dày (GERD). Phối hợp Vitamin D3 để hấp thu tối ưu.',
    deficiencySignsVi: [
      'Trào ngược dạ dày (GERD)',
      'Co thắt cơ, chuột rút',
      'Loãng xương',
      'Móng tay dễ gãy',
      'Tê bì chân tay',
    ],
    dailyRda: { male: '1000mg', female: '1000mg', pregnant: '1200mg' },
    absorptionTipVi: 'Uống cùng Vitamin D3 và sau bữa ăn. Tránh uống cùng cà phê, trà.',
    helpsWith: ['gerd', 'osteoporosis', 'gallstone', 'insomnia'],
    foodSources: ['sua-chua', 'rong-bien', 'bong-cai-xanh', 'trung-chim-cut'],
  },
  {
    id: 'magnesium',
    nameVi: 'Magie',
    nameEn: 'Magnesium',
    category: 'mineral',
    descriptionVi:
      'Tham gia hơn 300 phản ứng enzyme trong cơ thể. Thiếu Magie gây rối loạn tiêu hóa, mất ngủ, stress mạn tính. Magie Cacbonat giúp trung hòa axit dạ dày.',
    deficiencySignsVi: [
      'Rối loạn tiêu hóa, đầy bụng',
      'Mất ngủ, khó ngủ sâu',
      'Stress, lo âu',
      'Chuột rút, co giật cơ',
      'Nhịp tim bất thường',
    ],
    dailyRda: { male: '420mg', female: '320mg', pregnant: '360mg' },
    absorptionTipVi: 'Magie Glycinate hấp thu tốt nhất, uống buổi tối giúp ngủ sâu. Tránh uống cùng Canxi liều cao.',
    helpsWith: ['gerd', 'insomnia', 'chronic-stress', 'hypertension', 'migraine'],
    foodSources: ['hat-lanh', 'hat-chia', 'rong-bien', 'bong-cai-xanh'],
  },
  {
    id: 'vitamin-d3',
    nameVi: 'Vitamin D3',
    nameEn: 'Vitamin D3',
    category: 'vitamin',
    descriptionVi:
      'Thực chất là hormone steroid, cần thiết để hấp thu Canxi. Thiếu D3 → thiếu Canxi gián tiếp → GERD, loãng xương. 80% người Việt thiếu D3 do ít phơi nắng.',
    deficiencySignsVi: [
      'Mệt mỏi mạn tính',
      'Đau xương, đau lưng',
      'Hay ốm vặt, giảm miễn dịch',
      'Trầm cảm, tâm trạng kém',
      'Chậm lành vết thương',
    ],
    dailyRda: { male: '2000 IU', female: '2000 IU', pregnant: '4000 IU' },
    absorptionTipVi: 'Uống cùng bữa ăn có chất béo (dầu oliu, bơ). Phơi nắng 15-20 phút/ngày trước 9h sáng.',
    helpsWith: ['gerd', 'osteoporosis', 'weak-immunity', 'insomnia', 'chronic-stress'],
    foodSources: ['ca-hoi', 'trung-ga', 'trung-chim-cut', 'ca-thu'],
  },
  {
    id: 'zinc',
    nameVi: 'Kẽm',
    nameEn: 'Zinc',
    category: 'mineral',
    descriptionVi:
      'Thiết yếu cho miễn dịch, chữa lành vết thương, sản xuất testosterone. Thiếu kẽm gây giảm miễn dịch, rụng tóc, mất vị giác.',
    deficiencySignsVi: [
      'Hay ốm vặt, giảm miễn dịch',
      'Rụng tóc bất thường',
      'Mất vị giác, ăn không ngon',
      'Chậm lành vết thương',
      'Da khô, mụn',
    ],
    dailyRda: { male: '11mg', female: '8mg', pregnant: '12mg' },
    absorptionTipVi: 'Uống khi bụng đói hoặc cùng protein. Tránh uống cùng Canxi/Sắt. Vitamin C tăng hấp thu.',
    helpsWith: ['weak-immunity', 'chronic-inflammation', 'gut-dysbiosis'],
    foodSources: ['trung-chim-cut', 'hat-lanh', 'ca-hoi', 'toi-den'],
  },
  {
    id: 'vitamin-b6',
    nameVi: 'Vitamin B6',
    nameEn: 'Vitamin B6 (Pyridoxine)',
    category: 'vitamin',
    descriptionVi:
      'Cần cho chuyển hóa amino acid, tạo serotonin (hạnh phúc) và melatonin (ngủ). Thiếu B6 gây rối loạn tâm thần, viêm da, thiếu máu.',
    deficiencySignsVi: [
      'Viêm da, nứt khóe môi',
      'Thiếu máu',
      'Trầm cảm, cáu gắt',
      'Rối loạn miễn dịch',
      'Tê bì tay chân',
    ],
    dailyRda: { male: '1.7mg', female: '1.5mg', pregnant: '2.0mg' },
    absorptionTipVi: 'Có trong nhiều thực phẩm. Nấu chín ở nhiệt độ cao làm mất B6, nên hấp/luộc nhẹ.',
    helpsWith: ['chronic-stress', 'insomnia', 'menopause-symptoms', 'pcos', 'gut-dysbiosis'],
    foodSources: ['ca-hoi', 'ca-thu', 'trung-ga', 'bong-cai-xanh'],
  },
  {
    id: 'omega-3',
    nameVi: 'Omega-3',
    nameEn: 'Omega-3 (DHA + EPA + ALA)',
    category: 'fatty-acid',
    descriptionVi:
      'Chất béo thiết yếu chống viêm, bảo vệ tim mạch và não bộ. DHA+EPA từ cá béo, ALA từ hạt. Tỷ lệ Omega-6:Omega-3 lý tưởng là 4:1 (người Việt thường 20:1).',
    deficiencySignsVi: [
      'Viêm mạn tính',
      'Da khô, bong tróc',
      'Giảm trí nhớ, khó tập trung',
      'Trầm cảm, lo âu',
      'Đau khớp',
    ],
    dailyRda: { male: '1600mg ALA', female: '1100mg ALA', pregnant: '1400mg ALA + 200mg DHA' },
    absorptionTipVi: 'Ăn cá béo 2-3 lần/tuần. Hạt tía tô, hạt lanh bổ sung ALA. Tránh chiên rán ở nhiệt độ cao.',
    helpsWith: ['dyslipidemia', 'chronic-inflammation', 'joint-pain', 'chronic-stress', 'hypertension'],
    foodSources: ['ca-hoi', 'ca-thu', 'hat-tia-to', 'hat-lanh', 'hat-chia'],
  },
  {
    id: 'vitamin-c',
    nameVi: 'Vitamin C',
    nameEn: 'Vitamin C (Ascorbic Acid)',
    category: 'vitamin',
    descriptionVi:
      'Chống oxy hóa mạnh nhất, tăng hấp thu sắt, tổng hợp collagen. Cơ thể không tự tạo được, cần bổ sung hàng ngày từ thực phẩm.',
    deficiencySignsVi: [
      'Chảy máu chân răng',
      'Chậm lành vết thương',
      'Mệt mỏi, suy nhược',
      'Giảm miễn dịch, hay ốm',
      'Da khô, nếp nhăn sớm',
    ],
    dailyRda: { male: '90mg', female: '75mg', pregnant: '120mg' },
    absorptionTipVi: 'Ăn trái cây tươi (ổi, cam, kiwi). Nhiệt độ cao phá hủy Vitamin C — tránh nấu chín quá lâu.',
    helpsWith: ['weak-immunity', 'chronic-inflammation', 'chronic-stress', 'joint-pain'],
    foodSources: ['rau-mam', 'bong-cai-xanh', 'kimchi'],
  },
];

// --- Lookup helpers ---

export function getMicronutrient(id: string): Micronutrient | undefined {
  return MICRONUTRIENTS.find(n => n.id === id);
}

export function getMicronutrientsForCondition(conditionId: string): Micronutrient[] {
  return MICRONUTRIENTS.filter(n => n.helpsWith.includes(conditionId as never));
}
