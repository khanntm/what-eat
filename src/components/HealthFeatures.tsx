'use client';

import { useState } from 'react';
import {
  getTodayTip, DAILY_TIPS,
  HAND_RULES, HAND_RULE_NOTE, GI_FOOD_TABLE, GI_GL_GUIDE,
  SUGAR_WARNING, VITAMIN_ABSORPTION_RULES,
  SUPPLEMENT_SCHEDULE, SUPPLEMENT_GOLDEN_RULE, MAGNESIUM_TYPES, MAGNESIUM_DEEP,
  OMEGA3_GUIDE, ZINC_GUIDE, VITAMIN_D3_GUIDE, EXERCISE_RULES,
  QUIZ_QUESTIONS,
  type DailyTip, type QuizQuestion,
} from '@/data/health-content';

// ============================================================================
// Feature Picker — Menu chọn 4 tính năng
// ============================================================================

type Feature = 'tips' | 'meal' | 'supplement' | 'quiz' | 'exercise';

export default function HealthFeatures() {
  const [feature, setFeature] = useState<Feature | null>(null);

  if (feature === 'tips') return <DailyTipView onBack={() => setFeature(null)} />;
  if (feature === 'meal') return <MealPlannerView onBack={() => setFeature(null)} />;
  if (feature === 'supplement') return <SupplementView onBack={() => setFeature(null)} />;
  if (feature === 'quiz') return <QuizView onBack={() => setFeature(null)} />;
  if (feature === 'exercise' as Feature) return <ExerciseView onBack={() => setFeature(null)} />;

  const todayTip = getTodayTip();

  return (
    <div className="space-y-3">
      {/* Today's Tip Preview */}
      <button onClick={() => setFeature('tips')} className="w-full text-left bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 transition-all active:scale-[0.98]">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{todayTip.icon}</span>
          <div className="flex-1">
            <div className="text-[10px] text-amber-600 font-semibold uppercase">Tip hôm nay</div>
            <div className="text-sm font-bold text-gray-900 mt-0.5">{todayTip.titleVi}</div>
            <div className="text-xs text-gray-600 mt-1 line-clamp-2">{todayTip.bodyVi}</div>
          </div>
        </div>
        <div className="text-[10px] text-amber-500 text-right mt-2">Xem tất cả 10 tips →</div>
      </button>

      {/* Feature Cards */}
      <div className="grid grid-cols-2 gap-2">
        <FeatureCard icon="✊" title="Khẩu phần GI/GL" desc="Đo bằng nắm đấm" color="green" onClick={() => setFeature('meal')} />
        <FeatureCard icon="💊" title="Lịch Vi chất" desc="Canxi · Magie · Kẽm · D3" color="violet" onClick={() => setFeature('supplement')} />
        <FeatureCard icon="🏃" title="Đơn thuốc tập luyện" desc="Nhịp tim · Thời điểm" color="red" onClick={() => setFeature('exercise')} />
        <FeatureCard icon="🧠" title="Quiz kiến thức" desc="12 câu hỏi" color="blue" onClick={() => setFeature('quiz')} />
        <FeatureCard icon="💡" title="20 Tips BS Phúc" desc="Mỗi ngày 1 tip" color="amber" onClick={() => setFeature('tips')} />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, color, onClick }: {
  icon: string; title: string; desc: string; color: string; onClick: () => void;
}) {
  const colors: Record<string, string> = {
    green: 'bg-green-50 border-green-200',
    violet: 'bg-violet-50 border-violet-200',
    blue: 'bg-blue-50 border-blue-200',
    amber: 'bg-amber-50 border-amber-200',
    red: 'bg-red-50 border-red-200',
  };
  return (
    <button onClick={onClick} className={`${colors[color]} border rounded-xl p-3 text-left transition-all active:scale-95`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-sm font-bold text-gray-800">{title}</div>
      <div className="text-[11px] text-gray-500">{desc}</div>
    </button>
  );
}

// ============================================================================
// Feature 1: Daily Tips
// ============================================================================

function DailyTipView({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-3 animate-slide-up">
      <BackButton onBack={onBack} title="10 Tips BS Phúc" />
      {DAILY_TIPS.map(tip => (
        <TipCard key={tip.id} tip={tip} />
      ))}
    </div>
  );
}

function TipCard({ tip }: { tip: DailyTip }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <button onClick={() => setExpanded(!expanded)} className="w-full text-left bg-white border border-gray-100 rounded-xl p-3.5 shadow-sm transition-all">
      <div className="flex items-start gap-2.5">
        <span className="text-2xl flex-shrink-0">{tip.icon}</span>
        <div className="flex-1">
          <div className="text-[10px] text-gray-400 font-semibold uppercase">{tip.categoryVi}</div>
          <div className="text-sm font-bold text-gray-900 mt-0.5">{tip.titleVi}</div>
          {expanded && <div className="text-xs text-gray-600 mt-2 leading-relaxed">{tip.bodyVi}</div>}
        </div>
      </div>
    </button>
  );
}

// ============================================================================
// Feature 2: Meal Planner (GI/GL + Quy tắc Bàn tay)
// ============================================================================

function MealPlannerView({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-4 animate-slide-up">
      <BackButton onBack={onBack} title="Khẩu phần & GI/GL" />

      {/* Hand Rule */}
      <div className="bg-gradient-to-b from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-4">
        <h3 className="text-sm font-bold text-green-800 mb-3">✊ Quy tắc Bàn Tay (không cần cân đo)</h3>
        <div className="space-y-2.5">
          {HAND_RULES.map((item, i) => (
            <div key={i} className="bg-white/70 rounded-xl px-3 py-2.5 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-semibold text-gray-800">{item.nameVi}</span>
              </div>
              <div className="flex gap-2 ml-7">
                <span className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">👨 {item.maleVi}</span>
                <span className="text-[11px] bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full">👩 {item.femaleVi}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-[11px] text-green-700 mt-3 text-center font-medium">{HAND_RULE_NOTE}</div>
      </div>

      {/* GI Food Table */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-2">📊 Chỉ số đường huyết (GI) thực phẩm</h3>
        <div className="bg-blue-50 rounded-xl px-3 py-2 mb-3 text-[11px] text-blue-800">
          🎯 {GI_GL_GUIDE.giTargetVi} · {GI_GL_GUIDE.glTargetVi}
        </div>
        <div className="space-y-2">
          {GI_FOOD_TABLE.map((food, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl px-3.5 py-2.5 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-gray-800">{food.nameVi}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${food.levelColor}`}>
                  GI {food.gi} · {food.levelVi}
                </span>
              </div>
              <div className="text-[11px] text-gray-600">{food.noteVi}</div>
            </div>
          ))}
        </div>
        <div className="text-[11px] text-gray-500 mt-2 text-center">{GI_GL_GUIDE.tipVi}</div>
      </div>

      {/* Sugar Warning */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
        <h3 className="text-sm font-bold text-red-800 mb-2">{SUGAR_WARNING.titleVi}</h3>
        <div className="text-xs text-red-700 space-y-1.5">
          <div>📊 {SUGAR_WARNING.statsVi}</div>
          <div>⚙️ {SUGAR_WARNING.mechanismVi}</div>
          <div>🍯 {SUGAR_WARNING.fructoseVi}</div>
          <div>🧠 {SUGAR_WARNING.addictionVi}</div>
          <div className="font-bold">🎯 {SUGAR_WARNING.limitVi}</div>
        </div>
      </div>

      {/* Vitamin Absorption Rules */}
      <div className="bg-gradient-to-b from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-4">
        <h3 className="text-sm font-bold text-blue-800 mb-3">💊 Quy tắc uống Vitamin chuẩn khoa học</h3>
        <div className="space-y-2">
          <div className="bg-white/70 rounded-xl px-3 py-2.5">
            <div className="text-xs font-bold text-orange-700">{VITAMIN_ABSORPTION_RULES.waterSoluble.icon} Vitamin {VITAMIN_ABSORPTION_RULES.waterSoluble.vitamins}</div>
            <div className="text-xs text-gray-800 font-medium mt-0.5">{VITAMIN_ABSORPTION_RULES.waterSoluble.ruleVi}</div>
            <div className="text-[11px] text-gray-500 mt-0.5">{VITAMIN_ABSORPTION_RULES.waterSoluble.whyVi}</div>
          </div>
          <div className="bg-white/70 rounded-xl px-3 py-2.5">
            <div className="text-xs font-bold text-amber-700">{VITAMIN_ABSORPTION_RULES.fatSoluble.icon} Vitamin {VITAMIN_ABSORPTION_RULES.fatSoluble.vitamins}</div>
            <div className="text-xs text-gray-800 font-medium mt-0.5">{VITAMIN_ABSORPTION_RULES.fatSoluble.ruleVi}</div>
            <div className="text-[11px] text-gray-500 mt-0.5">{VITAMIN_ABSORPTION_RULES.fatSoluble.whyVi}</div>
          </div>
        </div>
        <div className="text-[11px] text-blue-700 mt-3 font-medium">✅ {VITAMIN_ABSORPTION_RULES.mythBust}</div>
      </div>
    </div>
  );
}

// ============================================================================
// Feature 3: Supplement Tracker
// ============================================================================

function SupplementView({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-4 animate-slide-up">
      <BackButton onBack={onBack} title="Lịch Vi chất" />

      {/* Golden Rule */}
      <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
        <div className="text-xs font-bold text-red-800">⚠️ {SUPPLEMENT_GOLDEN_RULE}</div>
      </div>

      {/* Schedule Timeline */}
      <div className="space-y-3">
        {SUPPLEMENT_SCHEDULE.map((slot, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-100">
              <span className="text-lg">{slot.icon}</span>
              <div>
                <span className="text-base font-bold text-teal-700">{slot.time}</span>
                <span className="text-xs text-teal-600 ml-2">{slot.periodVi}</span>
              </div>
            </div>
            <div className="px-4 py-3 space-y-2">
              {slot.items.map((item, j) => (
                <div key={j} className="flex items-center gap-2">
                  <div className={`text-xs font-semibold px-2 py-1 rounded-lg ${item.colorClass}`}>{item.dosageVi}</div>
                  <span className="text-sm font-medium text-gray-800">{item.nameVi}</span>
                </div>
              ))}
            </div>
            <div className="px-4 pb-3 text-[11px] text-gray-500">💡 {slot.noteVi}</div>
          </div>
        ))}
      </div>

      {/* Magnesium Types */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-2">💜 4 Loại Magie — chọn đúng loại</h3>
        <div className="space-y-2">
          {MAGNESIUM_TYPES.map((mg, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl px-3.5 py-2.5 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <span>{mg.icon}</span>
                <div>
                  <span className="text-sm font-bold text-gray-800">{mg.nameVi}</span>
                  <span className="text-[10px] text-gray-500 ml-1.5">{mg.nicknameVi}</span>
                </div>
              </div>
              <div className="text-xs text-gray-600">{mg.useVi}</div>
              <div className="text-[11px] text-violet-600 font-medium mt-1">{mg.whenVi}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Liều: {mg.dosageVi}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Magnesium Deep Dive */}
      <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4">
        <h3 className="text-sm font-bold text-violet-800 mb-2">🔬 Tại sao thiếu Magie lại nguy hiểm?</h3>
        <div className="text-xs text-violet-600 mb-2">Magie tham gia {MAGNESIUM_DEEP.totalReactions.toLocaleString()} phản ứng hóa học · Cần {MAGNESIUM_DEEP.dailyNeed}</div>
        <div className="space-y-2">
          {MAGNESIUM_DEEP.consequences.map((c, i) => (
            <div key={i} className="bg-white/70 rounded-xl px-3 py-2">
              <div className="text-xs font-bold text-gray-800">{c.icon} {c.titleVi}</div>
              <div className="text-[11px] text-gray-600 mt-0.5">{c.bodyVi}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Omega-3 Expanded */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4">
        <h3 className="text-sm font-bold text-cyan-800 mb-2">🐟 Omega-3 — Hiểu đúng để bổ sung đúng</h3>
        <div className="text-xs text-cyan-700 space-y-1.5">
          <div>🧬 {OMEGA3_GUIDE.familyVi}</div>
          <div>🧠 {OMEGA3_GUIDE.dhaVi}</div>
          <div>❤️ {OMEGA3_GUIDE.epaVi}</div>
          <div>🌿 {OMEGA3_GUIDE.alaVi}</div>
          <div className="font-bold">📏 {OMEGA3_GUIDE.ruleVi}</div>
          <div>🩸 {OMEGA3_GUIDE.lipidVi}</div>
          <div>⚠️ {OMEGA3_GUIDE.codLiverVi}</div>
        </div>
      </div>

      {/* Zinc Guide */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
        <h3 className="text-sm font-bold text-emerald-800 mb-2">🔩 Kẽm — {ZINC_GUIDE.totalEnzymes.toLocaleString()} enzyme cần Kẽm</h3>
        <div className="text-xs text-emerald-700 space-y-1.5">
          <div>{ZINC_GUIDE.femaleVi}</div>
          <div>{ZINC_GUIDE.maleVi}</div>
          <div>{ZINC_GUIDE.gutVi}</div>
          <div>{ZINC_GUIDE.kidneyVi}</div>
        </div>
      </div>

      {/* Vitamin D3 Expanded */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <h3 className="text-sm font-bold text-amber-800 mb-2">☀️ Vitamin D3 — Hormone Mặt Trời</h3>
        <div className="text-xs text-amber-700 space-y-1.5">
          <div>🎯 {VITAMIN_D3_GUIDE.targetVi}</div>
          <div>🔬 {VITAMIN_D3_GUIDE.whatVi}</div>
          <div>💡 {VITAMIN_D3_GUIDE.howVi}</div>
          <div>✨ {VITAMIN_D3_GUIDE.skinVi}</div>
          <div>🩺 {VITAMIN_D3_GUIDE.diseaseVi}</div>
          <div>🎨 {VITAMIN_D3_GUIDE.skinColorVi}</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Feature 5: Exercise Rules — "Đơn thuốc tập luyện"
// ============================================================================

function ExerciseView({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-4 animate-slide-up">
      <BackButton onBack={onBack} title="Đơn thuốc Tập luyện" />

      {/* Heart Rate Zone */}
      <div className="bg-gradient-to-b from-red-50 to-orange-50 rounded-2xl border border-red-200 p-4">
        <h3 className="text-sm font-bold text-red-800 mb-3">❤️ Vùng nhịp tim an toàn</h3>
        <div className="flex gap-2 mb-3">
          <div className="flex-1 bg-green-100 rounded-xl py-3 text-center">
            <div className="text-lg font-bold text-green-800">130-140</div>
            <div className="text-[10px] text-green-600">nhịp/phút ✅</div>
          </div>
          <div className="flex-1 bg-red-100 rounded-xl py-3 text-center">
            <div className="text-lg font-bold text-red-800">&gt;160</div>
            <div className="text-[10px] text-red-600">nhịp/phút ⛔</div>
          </div>
        </div>
        <div className="text-xs text-red-700">{EXERCISE_RULES.heartRateZone.recoveryVi}</div>
      </div>

      {/* Best Time */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <h3 className="text-sm font-bold text-blue-800 mb-2">⏰ Thời điểm tập tốt nhất</h3>
        <div className="text-xs text-blue-700 leading-relaxed">{EXERCISE_RULES.bestTimeVi}</div>
      </div>

      {/* Trampoline */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
        <h3 className="text-sm font-bold text-purple-800 mb-2">🤸 Trampoline — BS Phúc đặc biệt khuyên</h3>
        <div className="text-xs text-purple-700 leading-relaxed">{EXERCISE_RULES.trampolineVi}</div>
      </div>

      {/* Brain */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
        <h3 className="text-sm font-bold text-green-800 mb-2">🧠 Tập thể dục = Rèn não #1</h3>
        <div className="text-xs text-green-700 leading-relaxed">{EXERCISE_RULES.brainVi}</div>
      </div>

      {/* Danger */}
      <div className="bg-red-50 border border-red-300 rounded-2xl p-4">
        <h3 className="text-sm font-bold text-red-800 mb-2">⚠️ Cảnh báo: tập quá sức</h3>
        <div className="text-xs text-red-700 leading-relaxed">{EXERCISE_RULES.dangerVi}</div>
      </div>
    </div>
  );
}

// ============================================================================
// Feature 4: Quiz
// ============================================================================

function QuizView({ onBack }: { onBack: () => void }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = QUIZ_QUESTIONS[current];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correctIndex) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current < QUIZ_QUESTIONS.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    return (
      <div className="animate-slide-up">
        <BackButton onBack={onBack} title="Kết quả Quiz" />
        <div className="text-center py-8">
          <div className="text-6xl mb-3">{pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚'}</div>
          <div className="text-2xl font-bold text-gray-900">{score}/{QUIZ_QUESTIONS.length}</div>
          <div className="text-sm text-gray-500 mt-1">
            {pct >= 80 ? 'Xuất sắc! Bạn hiểu rất rõ về dinh dưỡng!' :
             pct >= 60 ? 'Khá tốt! Còn vài kiến thức cần bổ sung.' :
             'Cần tìm hiểu thêm! Đọc lại Tips BS Phúc nhé.'}
          </div>
          <button onClick={() => { setCurrent(0); setSelected(null); setScore(0); setFinished(false); }}
            className="mt-6 px-6 py-3 bg-teal-500 text-white rounded-2xl font-semibold active:scale-95">
            Làm lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <BackButton onBack={onBack} title={`Câu ${current + 1}/${QUIZ_QUESTIONS.length}`} />

      {/* Progress */}
      <div className="flex gap-1 mb-4">
        {QUIZ_QUESTIONS.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${
            i < current ? 'bg-teal-400' : i === current ? 'bg-teal-500' : 'bg-gray-200'
          }`} />
        ))}
      </div>

      {/* Question */}
      <div className="text-center mb-5">
        <span className="text-4xl">{q.icon}</span>
        <h3 className="text-base font-bold text-gray-900 mt-3 leading-relaxed">{q.questionVi}</h3>
      </div>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {q.options.map((opt, idx) => {
          const isSelected = selected === idx;
          const isCorrect = idx === q.correctIndex;
          const showResult = selected !== null;

          let cls = 'bg-white border border-gray-200 text-gray-700';
          if (showResult && isCorrect) cls = 'bg-green-50 border-2 border-green-400 text-green-800';
          else if (showResult && isSelected && !isCorrect) cls = 'bg-red-50 border-2 border-red-400 text-red-800';

          return (
            <button key={idx} onClick={() => handleSelect(idx)}
              className={`w-full text-left rounded-xl px-4 py-3 transition-all ${cls}`}>
              <span className="font-bold mr-2">{opt.label}.</span>
              <span className="text-sm">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {selected !== null && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-4 animate-slide-up">
          <div className="text-xs font-bold text-blue-800 mb-1">
            {selected === q.correctIndex ? '✅ Chính xác!' : '❌ Sai rồi!'}
          </div>
          <div className="text-xs text-blue-700 leading-relaxed">{q.explanationVi}</div>
        </div>
      )}

      {selected !== null && (
        <button onClick={handleNext}
          className="w-full py-3.5 bg-teal-500 text-white rounded-2xl font-bold active:scale-95">
          {current < QUIZ_QUESTIONS.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
        </button>
      )}
    </div>
  );
}

// ============================================================================
// Shared Components
// ============================================================================

function BackButton({ onBack, title }: { onBack: () => void; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <button onClick={onBack} className="text-sm text-teal-600 font-medium bg-teal-50 px-3 py-1.5 rounded-lg active:scale-95">
        ← Quay lại
      </button>
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
    </div>
  );
}
