import type {
  AgeGroup, Gender, HealthConditionId, LifestyleFlag,
  MicronutrientId, UserProfile,
} from './health-types';

// ============================================================================
// USER SELECTION OPTIONS
// Các lựa chọn hiển thị cho user trên UI (không cần login)
// ============================================================================

// --- Bước 1: Tuổi & Giới tính ---

export const AGE_GROUP_OPTIONS: { value: AgeGroup; label: string; emoji: string }[] = [
  { value: '18-29', label: '18–29 tuổi', emoji: '🧑' },
  { value: '30-39', label: '30–39 tuổi', emoji: '👨' },
  { value: '40-49', label: '40–49 tuổi', emoji: '🧔' },
  { value: '50-59', label: '50–59 tuổi', emoji: '👴' },
  { value: '60+',   label: '60+ tuổi',   emoji: '🤍' },
];

export const GENDER_OPTIONS: { value: Gender; label: string; emoji: string }[] = [
  { value: 'male',   label: 'Nam', emoji: '♂️' },
  { value: 'female', label: 'Nữ', emoji: '♀️' },
];

// --- Bước 2: Bạn đang gặp vấn đề gì? (chọn nhiều) ---

export const CONDITION_OPTIONS: {
  value: HealthConditionId;
  label: string;
  group: string;
  emoji: string;
}[] = [
  // Tiêu hóa
  { value: 'gerd',               label: 'Trào ngược dạ dày',        group: 'Tiêu hóa',       emoji: '🔥' },
  { value: 'gallstone',          label: 'Sỏi túi mật',             group: 'Tiêu hóa',       emoji: '🪨' },
  { value: 'gut-dysbiosis',      label: 'Rối loạn tiêu hóa',       group: 'Tiêu hóa',       emoji: '🦠' },
  { value: 'low-stomach-acid',   label: 'Đầy bụng, khó tiêu',      group: 'Tiêu hóa',       emoji: '😣' },
  // Tim mạch
  { value: 'dyslipidemia',       label: 'Mỡ máu cao',              group: 'Tim mạch',       emoji: '🩸' },
  { value: 'hypertension',       label: 'Huyết áp cao',            group: 'Tim mạch',       emoji: '💓' },
  { value: 'visceral-fat',       label: 'Béo bụng / Mỡ nội tạng', group: 'Tim mạch',       emoji: '🫃' },
  // Xương khớp
  { value: 'osteoporosis',       label: 'Loãng xương',             group: 'Xương khớp',     emoji: '🦴' },
  { value: 'joint-pain',         label: 'Đau khớp',                group: 'Xương khớp',     emoji: '🦿' },
  // Nội tiết
  { value: 'thyroid',            label: 'Tuyến giáp',              group: 'Nội tiết',       emoji: '🦋' },
  { value: 'menopause-symptoms', label: 'Triệu chứng tiền mãn kinh', group: 'Nội tiết',    emoji: '🌸' },
  // Thần kinh
  { value: 'insomnia',           label: 'Mất ngủ',                 group: 'Thần kinh',      emoji: '😴' },
  { value: 'chronic-stress',     label: 'Stress mạn tính',         group: 'Thần kinh',      emoji: '🧠' },
  { value: 'migraine',           label: 'Đau đầu / Migraine',     group: 'Thần kinh',      emoji: '🤕' },
  // Miễn dịch
  { value: 'weak-immunity',      label: 'Hay ốm vặt',             group: 'Miễn dịch',      emoji: '🤧' },
  { value: 'chronic-inflammation', label: 'Viêm mạn tính',         group: 'Miễn dịch',      emoji: '🔴' },
];

// --- Bước 3: Thói quen sinh hoạt (chọn nhiều) ---

export const LIFESTYLE_OPTIONS: {
  value: LifestyleFlag;
  label: string;
  emoji: string;
}[] = [
  { value: 'pregnant',          label: 'Đang mang thai',           emoji: '🤰' },
  { value: 'breastfeeding',     label: 'Đang cho con bú',          emoji: '🤱' },
  { value: 'sedentary',         label: 'Ít vận động',              emoji: '🪑' },
  { value: 'high-stress',       label: 'Áp lực công việc cao',     emoji: '😰' },
  { value: 'overwork',          label: 'Làm việc >60h/tuần',       emoji: '💼' },
  { value: 'poor-sleep',        label: 'Ngủ ít (<6h/ngày)',        emoji: '🌙' },
  { value: 'smoker',            label: 'Hút thuốc',                emoji: '🚬' },
  { value: 'alcohol',           label: 'Uống rượu bia thường xuyên', emoji: '🍺' },
  { value: 'skip-breakfast',    label: 'Hay bỏ bữa sáng',         emoji: '⏰' },
  { value: 'late-night-eating', label: 'Hay ăn khuya',             emoji: '🌃' },
];

// --- Bước 4: Vi chất bạn quan tâm (chọn nhiều, hoặc bỏ qua) ---

export const MICRONUTRIENT_OPTIONS: {
  value: MicronutrientId;
  label: string;
  hintVi: string;
  emoji: string;
}[] = [
  { value: 'calcium',    label: 'Canxi',      hintVi: 'Xương, cơ, thần kinh',       emoji: '🦴' },
  { value: 'magnesium',  label: 'Magie',      hintVi: 'Tiêu hóa, giấc ngủ, stress', emoji: '✨' },
  { value: 'vitamin-d3', label: 'Vitamin D3',  hintVi: 'Hấp thu canxi, miễn dịch',   emoji: '☀️' },
  { value: 'zinc',       label: 'Kẽm',        hintVi: 'Miễn dịch, da, tóc',         emoji: '🛡️' },
  { value: 'vitamin-b6', label: 'Vitamin B6',  hintVi: 'Hormone, tâm thần',          emoji: '🧬' },
  { value: 'omega-3',    label: 'Omega-3',     hintVi: 'Tim mạch, não, chống viêm',  emoji: '🐟' },
  { value: 'vitamin-c',  label: 'Vitamin C',   hintVi: 'Chống oxy hóa, miễn dịch',   emoji: '🍊' },
];

// --- Default profile ---

export const DEFAULT_USER_PROFILE: UserProfile = {
  ageGroup: '30-39',
  gender: 'male',
  conditions: [],
  lifestyle: [],
  concerns: [],
};

// --- LocalStorage helpers ---

const STORAGE_KEY = 'what-eat-health-profile';

export function saveProfile(profile: UserProfile): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }
}

export function loadProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_USER_PROFILE;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return DEFAULT_USER_PROFILE;
  try {
    return JSON.parse(stored) as UserProfile;
  } catch {
    return DEFAULT_USER_PROFILE;
  }
}

export function clearProfile(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
