'use client';

import { useState } from 'react';
import type { UserProfile, HealthConditionId, LifestyleFlag, MicronutrientId } from '@/data/health-types';
import {
  AGE_GROUP_OPTIONS, GENDER_OPTIONS, CONDITION_OPTIONS,
  LIFESTYLE_OPTIONS, MICRONUTRIENT_OPTIONS,
  DEFAULT_USER_PROFILE, saveProfile, loadProfile,
} from '@/data/user-options';
import HealthResult from '@/components/HealthResult';

type Step = 1 | 2 | 3 | 4 | 'result';

export default function HealthPage() {
  const [step, setStep] = useState<Step>(1);
  const [profile, setProfile] = useState<UserProfile>(() => loadProfile());
  const [showResult, setShowResult] = useState(false);

  const totalSteps = 4;

  const handleFinish = () => {
    saveProfile(profile);
    setShowResult(true);
    setStep('result');
  };

  const handleRestart = () => {
    setShowResult(false);
    setStep(1);
  };

  if (showResult) {
    return <HealthResult profile={profile} onRestart={handleRestart} />;
  }

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="text-3xl mb-1">🩺</div>
        <h1 className="text-xl font-bold text-gray-900">Sức khỏe của bạn</h1>
        <p className="text-xs text-gray-500 mt-1">Trả lời nhanh để nhận gợi ý dinh dưỡng cá nhân hóa</p>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-1.5 mb-6">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              s <= (step as number) ? 'bg-teal-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Step 1: Age & Gender */}
      {step === 1 && (
        <div className="animate-slide-up">
          <h2 className="text-base font-semibold text-gray-800 mb-1">Thông tin cơ bản</h2>
          <p className="text-xs text-gray-500 mb-4">Giúp tính liều vi chất phù hợp</p>

          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Giới tính</label>
            <div className="flex gap-2">
              {GENDER_OPTIONS.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setProfile({ ...profile, gender: g.value })}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                    profile.gender === g.value
                      ? 'bg-teal-500 text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  {g.emoji} {g.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Độ tuổi</label>
            <div className="grid grid-cols-3 gap-2">
              {AGE_GROUP_OPTIONS.map((a) => (
                <button
                  key={a.value}
                  onClick={() => setProfile({ ...profile, ageGroup: a.value })}
                  className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                    profile.ageGroup === a.value
                      ? 'bg-teal-500 text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-3.5 bg-teal-500 text-white rounded-2xl font-semibold text-base shadow-lg shadow-teal-200 transition-all active:scale-95"
          >
            Tiếp theo
          </button>
        </div>
      )}

      {/* Step 2: Health Conditions */}
      {step === 2 && (
        <div className="animate-slide-up">
          <h2 className="text-base font-semibold text-gray-800 mb-1">Bạn đang gặp vấn đề gì?</h2>
          <p className="text-xs text-gray-500 mb-4">Chọn nhiều mục (hoặc bỏ qua nếu khỏe mạnh)</p>

          {groupConditions().map(([group, items]) => (
            <div key={group} className="mb-4">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{group}</div>
              <div className="grid grid-cols-2 gap-2">
                {items.map((c) => {
                  const selected = profile.conditions.includes(c.value);
                  return (
                    <button
                      key={c.value}
                      onClick={() => toggleCondition(c.value)}
                      className={`py-2.5 px-3 rounded-xl text-left text-sm font-medium transition-all ${
                        selected
                          ? 'bg-teal-50 text-teal-700 border-2 border-teal-400'
                          : 'bg-white text-gray-600 border border-gray-200'
                      }`}
                    >
                      {c.emoji} {c.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-2xl font-medium text-sm"
            >
              Quay lại
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-[2] py-3 bg-teal-500 text-white rounded-2xl font-semibold text-base shadow-lg shadow-teal-200 active:scale-95"
            >
              {profile.conditions.length === 0 ? 'Bỏ qua' : `Tiếp (${profile.conditions.length} mục)`}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Lifestyle */}
      {step === 3 && (
        <div className="animate-slide-up">
          <h2 className="text-base font-semibold text-gray-800 mb-1">Thói quen sinh hoạt</h2>
          <p className="text-xs text-gray-500 mb-4">Chọn những gì đúng với bạn</p>

          <div className="grid grid-cols-2 gap-2">
            {LIFESTYLE_OPTIONS
              .filter((l) => {
                if (profile.gender === 'male') return l.value !== 'pregnant' && l.value !== 'breastfeeding';
                return true;
              })
              .map((l) => {
                const selected = profile.lifestyle.includes(l.value);
                return (
                  <button
                    key={l.value}
                    onClick={() => toggleLifestyle(l.value)}
                    className={`py-2.5 px-3 rounded-xl text-left text-sm font-medium transition-all ${
                      selected
                        ? 'bg-amber-50 text-amber-700 border-2 border-amber-400'
                        : 'bg-white text-gray-600 border border-gray-200'
                    }`}
                  >
                    {l.emoji} {l.label}
                  </button>
                );
              })}
          </div>

          <div className="flex gap-2 mt-5">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-2xl font-medium text-sm"
            >
              Quay lại
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex-[2] py-3 bg-teal-500 text-white rounded-2xl font-semibold text-base shadow-lg shadow-teal-200 active:scale-95"
            >
              {profile.lifestyle.length === 0 ? 'Bỏ qua' : `Tiếp (${profile.lifestyle.length} mục)`}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Micronutrient Concerns */}
      {step === 4 && (
        <div className="animate-slide-up">
          <h2 className="text-base font-semibold text-gray-800 mb-1">Vi chất bạn quan tâm</h2>
          <p className="text-xs text-gray-500 mb-4">7 Vi chất Vàng theo BS Trần Văn Phúc (có thể bỏ qua)</p>

          <div className="space-y-2">
            {MICRONUTRIENT_OPTIONS.map((n) => {
              const selected = profile.concerns.includes(n.value);
              return (
                <button
                  key={n.value}
                  onClick={() => toggleConcern(n.value)}
                  className={`w-full py-3 px-4 rounded-xl text-left transition-all flex items-center gap-3 ${
                    selected
                      ? 'bg-violet-50 border-2 border-violet-400'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <span className="text-xl">{n.emoji}</span>
                  <div className="flex-1">
                    <div className={`text-sm font-semibold ${selected ? 'text-violet-700' : 'text-gray-700'}`}>
                      {n.label}
                    </div>
                    <div className="text-xs text-gray-500">{n.hintVi}</div>
                  </div>
                  {selected && <span className="text-teal-500 text-lg">&#10003;</span>}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2 mt-5">
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-2xl font-medium text-sm"
            >
              Quay lại
            </button>
            <button
              onClick={handleFinish}
              className="flex-[2] py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-2xl font-bold text-base shadow-lg shadow-teal-200 active:scale-95"
            >
              Xem gợi ý cho tôi
            </button>
          </div>
        </div>
      )}

      {/* Step count */}
      {step !== 'result' && (
        <div className="text-center mt-4 text-xs text-gray-400">
          Bước {step}/{totalSteps}
        </div>
      )}
    </div>
  );

  // --- Toggle helpers ---
  function toggleCondition(id: HealthConditionId) {
    setProfile((p) => ({
      ...p,
      conditions: p.conditions.includes(id)
        ? p.conditions.filter((c) => c !== id)
        : [...p.conditions, id],
    }));
  }

  function toggleLifestyle(id: LifestyleFlag) {
    setProfile((p) => ({
      ...p,
      lifestyle: p.lifestyle.includes(id)
        ? p.lifestyle.filter((l) => l !== id)
        : [...p.lifestyle, id],
    }));
  }

  function toggleConcern(id: MicronutrientId) {
    setProfile((p) => ({
      ...p,
      concerns: p.concerns.includes(id)
        ? p.concerns.filter((c) => c !== id)
        : [...p.concerns, id],
    }));
  }
}

// Group conditions by category for UI display
function groupConditions() {
  const groups = new Map<string, typeof CONDITION_OPTIONS>();
  for (const c of CONDITION_OPTIONS) {
    const list = groups.get(c.group) ?? [];
    list.push(c);
    groups.set(c.group, list);
  }
  return Array.from(groups.entries());
}
