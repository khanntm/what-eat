// ============================================================================
// WHAT-EAT: Health Module Types
// No-login MVP — user chọn options → lưu localStorage → gợi ý ngay
// ============================================================================

// --- USER PROFILE (localStorage, không cần DB) ---

export type AgeGroup = '18-29' | '30-39' | '40-49' | '50-59' | '60+';
export type Gender = 'male' | 'female';
export type LifestyleFlag =
  | 'pregnant'          // Đang mang thai
  | 'breastfeeding'     // Đang cho con bú
  | 'sedentary'         // Ít vận động
  | 'high-stress'       // Stress cao
  | 'overwork'          // Làm việc >60h/tuần
  | 'poor-sleep'        // Ngủ <6h/ngày
  | 'smoker'            // Hút thuốc
  | 'alcohol'           // Uống rượu bia thường xuyên
  | 'skip-breakfast'    // Hay bỏ bữa sáng
  | 'late-night-eating';// Ăn khuya

export interface UserProfile {
  ageGroup: AgeGroup;
  gender: Gender;
  conditions: HealthConditionId[];   // Bệnh lý đang gặp
  lifestyle: LifestyleFlag[];        // Thói quen
  concerns: MicronutrientId[];       // Vi chất quan tâm
}

// --- HEALTH MODULES ---

export type ModuleId = 'm1' | 'm2' | 'm3' | 'm4' | 'm5' | 'm6';

export interface HealthModule {
  id: ModuleId;
  nameVi: string;
  icon: string;
  conditions: HealthConditionId[];
}

// --- HEALTH CONDITIONS (Bệnh lý / Tình trạng) ---

export type HealthConditionId =
  // Module 1: Tiêu hóa
  | 'gerd'
  | 'gallstone'
  | 'gut-dysbiosis'
  | 'low-stomach-acid'
  // Module 2: Tim mạch
  | 'karoshi'
  | 'dyslipidemia'
  | 'hypertension'
  | 'visceral-fat'
  // Module 3: Xương khớp
  | 'osteoporosis'
  | 'joint-pain'
  // Module 4: Nội tiết
  | 'thyroid'
  | 'pcos'
  | 'menopause-symptoms'
  // Module 5: Thần kinh
  | 'insomnia'
  | 'chronic-stress'
  | 'migraine'
  // Module 6: Miễn dịch
  | 'weak-immunity'
  | 'chronic-inflammation';

export interface HealthCondition {
  id: HealthConditionId;
  moduleId: ModuleId;
  nameVi: string;
  descriptionVi: string;
  riskFactorsVi: string;
  icon: string;
}

// --- MICRONUTRIENTS (Vi chất) ---

export type MicronutrientId =
  | 'calcium' | 'magnesium' | 'vitamin-d3' | 'zinc'
  | 'vitamin-b6' | 'omega-3' | 'vitamin-c';

export type NutrientCategory = 'mineral' | 'vitamin' | 'fatty-acid';

export interface Micronutrient {
  id: MicronutrientId;
  nameVi: string;
  nameEn: string;
  category: NutrientCategory;
  descriptionVi: string;
  deficiencySignsVi: string[];
  dailyRda: { male: string; female: string; pregnant: string };
  absorptionTipVi: string;
  // Liên kết
  helpsWith: HealthConditionId[];     // Bổ sung vi chất này giúp gì
  foodSources: SuperfoodId[];         // Lấy từ thực phẩm nào
}

// --- SUPERFOODS ---

export type SuperfoodId =
  | 'hat-tia-to' | 'trung-chim-cut' | 'nghe' | 'ca-hoi'
  | 'gung' | 'kimchi' | 'rau-mam' | 'dau-oliu'
  | 'trung-ga' | 'toi-den' | 'hat-lanh' | 'hat-chia'
  | 'sua-chua' | 'ca-thu' | 'bong-cai-xanh' | 'rong-bien';

export type SuperfoodCategory =
  | 'seed' | 'egg' | 'vegetable' | 'fruit'
  | 'fermented' | 'oil' | 'spice' | 'protein';

export interface Superfood {
  id: SuperfoodId;
  nameVi: string;
  nameEn: string;
  category: SuperfoodCategory;
  descriptionVi: string;
  servingSize: string;
  keyBenefitsVi: string[];
  nutrients: MicronutrientId[];       // Vi chất chứa trong đó
  goodFor: HealthConditionId[];       // Tốt cho bệnh lý nào
  avoidFor?: HealthConditionId[];     // Tránh nếu bị bệnh nào
}

// --- ANTI-PATTERNS ---

export type DangerLevel = 'info' | 'warning' | 'danger' | 'critical';
export type AntiPatternCategory =
  | 'food-myth' | 'diet-myth' | 'supplement-myth'
  | 'lifestyle-myth' | 'dangerous-practice';

export interface AntiPattern {
  id: string;
  moduleId: ModuleId;
  category: AntiPatternCategory;
  mythVi: string;            // Lầm tưởng
  truthVi: string;           // Sự thật (BS Phúc)
  dangerLevel: DangerLevel;
  keywords: string[];
  relatedConditions: HealthConditionId[];
}

// --- SYMPTOM TESTS ---

export type TestType = 'home-test' | 'visual-check' | 'measurement' | 'questionnaire';

export interface SymptomTest {
  id: string;
  moduleId: ModuleId;
  nameVi: string;
  descriptionVi: string;
  testType: TestType;
  steps: string[];            // Các bước thực hiện
  results: TestResult[];
}

export interface TestResult {
  code: string;
  criteriaVi: string;
  interpretationVi: string;
  severity: 'normal' | 'mild' | 'moderate' | 'severe';
  linkedCondition?: HealthConditionId;
}

// --- RECOMMENDATION RULES ---

export interface RecommendationRule {
  id: string;
  moduleId: ModuleId;
  nameVi: string;
  descriptionVi: string;
  // Khi nào áp dụng
  triggerConditions: HealthConditionId[];
  triggerLifestyle?: LifestyleFlag[];
  triggerAgeGroups?: AgeGroup[];
  triggerGender?: Gender;
  // Nội dung gợi ý
  type: 'diet-plan' | 'supplement' | 'lifestyle' | 'warning' | 'test-suggestion';
  recommendationVi: string;
  priority: number;           // 1-10, cao = quan trọng hơn
}
