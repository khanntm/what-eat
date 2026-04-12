'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Gender, AgeGroup } from '@/data/health-types';

// ============================================================================
// HEALTH PAGE — Tối giản như giải thích cho trẻ 9 tuổi
//
// Flow 7 ngày đầu:
//   welcome → gender → triangle-intro → daily (ngày 1-6) → stomach-test (ngày 7)
//
// Chỉ tập trung: Tam giác vàng (Canxi-Magie-D3) + 1 bài test dạ dày
// ============================================================================

type Screen =
  | 'welcome'
  | 'gender'
  | 'triangle-intro'
  | 'daily'
  | 'stomach-test'
  | 'test-running'
  | 'test-result';

interface HealthState {
  gender: Gender;
  ageGroup: AgeGroup;
  startDate: string;       // ISO date string — ngày bắt đầu
  todayChecks: {
    morning: boolean;       // Canxi + D3 sáng
    night: boolean;         // Magie tối
  };
  checkHistory: Record<string, { morning: boolean; night: boolean }>;
  testResult?: 'low' | 'normal' | 'high';
}

const STORAGE_KEY = 'what-eat-health-simple';

function loadState(): HealthState | null {
  if (typeof window === 'undefined') return null;
  const s = localStorage.getItem(STORAGE_KEY);
  if (!s) return null;
  try { return JSON.parse(s); } catch { return null; }
}

function saveState(state: HealthState) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

function getDayNumber(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(diff + 1, 7));
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function HealthPage() {
  const [state, setState] = useState<HealthState | null>(null);
  const [screen, setScreen] = useState<Screen>('welcome');
  const [loaded, setLoaded] = useState(false);

  // Load on mount
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setState(saved);
      const day = getDayNumber(saved.startDate);
      // Restore today's checks
      const key = todayKey();
      if (saved.checkHistory[key]) {
        saved.todayChecks = saved.checkHistory[key];
      } else {
        saved.todayChecks = { morning: false, night: false };
      }
      if (day >= 7 && !saved.testResult) {
        setScreen('stomach-test');
      } else {
        setScreen('daily');
      }
    }
    setLoaded(true);
  }, []);

  // Save on change
  useEffect(() => {
    if (state) saveState(state);
  }, [state]);

  const updateState = useCallback((patch: Partial<HealthState>) => {
    setState(prev => prev ? { ...prev, ...patch } : prev);
  }, []);

  if (!loaded) return null;

  // ── WELCOME ──
  if (!state && screen === 'welcome') {
    return (
      <div className="px-5 pt-10 pb-4 animate-slide-up">
        <div className="text-center">
          <div className="text-6xl mb-4">👋</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Chào bạn!</h1>
          <p className="text-base text-gray-600 leading-relaxed">
            Mình sẽ giúp bạn <span className="font-semibold text-teal-600">khỏe hơn mỗi ngày</span> chỉ với 3 viên bổ sung đơn giản.
          </p>
          <p className="text-sm text-gray-400 mt-2">Mất khoảng 10 giây thôi</p>
        </div>
        <button
          onClick={() => setScreen('gender')}
          className="w-full mt-8 py-4 bg-teal-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-teal-200 active:scale-95 transition-all"
        >
          Bắt đầu
        </button>
      </div>
    );
  }

  // ── GENDER + AGE ──
  if (screen === 'gender') {
    return <GenderScreen onDone={(gender, ageGroup) => {
      const newState: HealthState = {
        gender,
        ageGroup,
        startDate: new Date().toISOString().slice(0, 10),
        todayChecks: { morning: false, night: false },
        checkHistory: {},
      };
      setState(newState);
      setScreen('triangle-intro');
    }} />;
  }

  // ── TRIANGLE INTRO ──
  if (screen === 'triangle-intro' && state) {
    return <TriangleIntro gender={state.gender} onDone={() => setScreen('daily')} />;
  }

  // ── DAILY VIEW ──
  if (screen === 'daily' && state) {
    const day = getDayNumber(state.startDate);
    return (
      <DailyView
        state={state}
        day={day}
        onCheck={(slot) => {
          const key = todayKey();
          const updated = { ...state.todayChecks, [slot]: true };
          const history = { ...state.checkHistory, [key]: updated };
          updateState({ todayChecks: updated, checkHistory: history });
        }}
        onStartTest={() => setScreen('stomach-test')}
        onReset={() => {
          localStorage.removeItem(STORAGE_KEY);
          setState(null);
          setScreen('welcome');
        }}
      />
    );
  }

  // ── STOMACH TEST ──
  if (screen === 'stomach-test' && state) {
    return <StomachTest onStart={() => setScreen('test-running')} />;
  }

  if (screen === 'test-running' && state) {
    return <TestTimer onResult={(result) => {
      updateState({ testResult: result });
      setScreen('test-result');
    }} />;
  }

  if (screen === 'test-result' && state) {
    return <TestResult result={state.testResult!} gender={state.gender} onDone={() => setScreen('daily')} />;
  }

  return null;
}

// ============================================================================
// SCREEN: Gender + Age (tối giản)
// ============================================================================

function GenderScreen({ onDone }: { onDone: (g: Gender, a: AgeGroup) => void }) {
  const [gender, setGender] = useState<Gender | null>(null);
  const [age, setAge] = useState<AgeGroup | null>(null);

  return (
    <div className="px-5 pt-8 pb-4 animate-slide-up">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🫶</div>
        <h2 className="text-xl font-bold text-gray-900">Cho mình biết về bạn</h2>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-3 text-center">Bạn là</p>
        <div className="flex gap-3">
          {[
            { v: 'male' as Gender, label: 'Nam', emoji: '👨', color: 'blue' },
            { v: 'female' as Gender, label: 'Nữ', emoji: '👩', color: 'pink' },
          ].map(g => (
            <button
              key={g.v}
              onClick={() => setGender(g.v)}
              className={`flex-1 py-5 rounded-2xl text-center transition-all ${
                gender === g.v
                  ? g.color === 'blue'
                    ? 'bg-blue-50 border-2 border-blue-400 shadow-md'
                    : 'bg-pink-50 border-2 border-pink-400 shadow-md'
                  : 'bg-white border-2 border-gray-100'
              }`}
            >
              <div className="text-3xl mb-1">{g.emoji}</div>
              <div className={`text-sm font-semibold ${gender === g.v ? 'text-gray-900' : 'text-gray-500'}`}>{g.label}</div>
            </button>
          ))}
        </div>
      </div>

      {gender && (
        <div className="mb-6 animate-slide-up">
          <p className="text-sm text-gray-500 mb-3 text-center">Độ tuổi</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { v: '18-29' as AgeGroup, label: '18–29' },
              { v: '30-39' as AgeGroup, label: '30–39' },
              { v: '40-49' as AgeGroup, label: '40–49' },
              { v: '50-59' as AgeGroup, label: '50–59' },
              { v: '60+' as AgeGroup, label: '60+' },
            ].map(a => (
              <button
                key={a.v}
                onClick={() => setAge(a.v)}
                className={`py-3 rounded-xl text-sm font-semibold transition-all ${
                  age === a.v
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {gender && age && (
        <button
          onClick={() => onDone(gender, age)}
          className="w-full mt-4 py-4 bg-teal-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-teal-200 active:scale-95 transition-all animate-slide-up"
        >
          Tiếp tục
        </button>
      )}
    </div>
  );
}

// ============================================================================
// SCREEN: Tam Giác Vàng — Giải thích như cho trẻ 9 tuổi
// ============================================================================

function TriangleIntro({ gender, onDone }: { gender: Gender; onDone: () => void }) {
  const [step, setStep] = useState(0);

  const steps = [
    // Step 0: Câu chuyện mở đầu
    {
      emoji: '🏠',
      title: 'Cơ thể bạn như một ngôi nhà',
      body: 'Ngôi nhà cần 3 thứ để vững chắc: gạch, xi-măng, và ánh nắng mặt trời.',
      bg: 'from-amber-50 to-orange-50',
    },
    // Step 1: Canxi
    {
      emoji: '🧱',
      title: 'Canxi = Gạch xây nhà',
      body: gender === 'female'
        ? 'Giúp xương chắc, cơ khỏe, ngủ ngon. Uống mỗi sáng sau ăn.'
        : 'Giúp xương chắc, cơ khỏe, bớt chuột rút. Uống mỗi sáng sau ăn.',
      detail: 'Uống lúc 7:30 sáng cùng bữa ăn',
      bg: 'from-sky-50 to-blue-50',
      color: 'text-blue-700',
      time: '☀️ Sáng',
    },
    // Step 2: D3
    {
      emoji: '🌞',
      title: 'Vitamin D3 = Ánh nắng',
      body: 'Không có nắng thì gạch không dính được vào nhà. D3 giúp cơ thể hấp thu Canxi.',
      detail: 'Uống cùng Canxi lúc sáng',
      bg: 'from-yellow-50 to-amber-50',
      color: 'text-amber-700',
      time: '☀️ Sáng (cùng Canxi)',
    },
    // Step 3: Magie
    {
      emoji: '🌙',
      title: 'Magie = Xi-măng kết dính',
      body: 'Giữ mọi thứ liên kết. Giúp bạn ngủ ngon, hết stress, bụng không đầy hơi.',
      detail: 'Uống lúc 9:30 tối trước khi ngủ',
      bg: 'from-indigo-50 to-purple-50',
      color: 'text-indigo-700',
      time: '🌙 Tối (trước ngủ 1 tiếng)',
    },
    // Step 4: Quy tắc vàng
    {
      emoji: '⏰',
      title: 'Quy tắc duy nhất cần nhớ',
      body: 'Sáng uống Canxi + D3. Tối uống Magie. Cách nhau xa xa để chúng không "giành nhau".',
      bg: 'from-teal-50 to-emerald-50',
    },
  ];

  const s = steps[step];

  return (
    <div className="px-5 pt-6 pb-4">
      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-6">
        {steps.map((_, i) => (
          <div key={i} className={`h-2 rounded-full transition-all duration-300 ${
            i === step ? 'w-6 bg-teal-500' : i < step ? 'w-2 bg-teal-300' : 'w-2 bg-gray-200'
          }`} />
        ))}
      </div>

      <div className={`bg-gradient-to-b ${s.bg} rounded-3xl p-6 min-h-[320px] flex flex-col items-center justify-center text-center animate-slide-up`} key={step}>
        <div className="text-6xl mb-4">{s.emoji}</div>
        <h2 className={`text-xl font-bold mb-3 ${s.color ?? 'text-gray-900'}`}>{s.title}</h2>
        <p className="text-base text-gray-700 leading-relaxed max-w-[280px]">{s.body}</p>

        {s.detail && (
          <div className="mt-4 bg-white/70 rounded-xl px-4 py-2.5 backdrop-blur-sm">
            <div className="text-xs text-gray-500">{s.time}</div>
            <div className="text-sm font-semibold text-gray-800 mt-0.5">{s.detail}</div>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-2xl font-medium"
          >
            Quay lại
          </button>
        )}
        <button
          onClick={() => {
            if (step < steps.length - 1) setStep(step + 1);
            else onDone();
          }}
          className={`${step > 0 ? 'flex-[2]' : 'w-full'} py-3.5 bg-teal-500 text-white rounded-2xl font-bold text-base shadow-lg shadow-teal-200 active:scale-95 transition-all`}
        >
          {step < steps.length - 1 ? 'Tiếp' : 'Bắt đầu uống ngay!'}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// SCREEN: Daily View — Nhắc uống hàng ngày
// ============================================================================

function DailyView({
  state, day, onCheck, onStartTest, onReset,
}: {
  state: HealthState;
  day: number;
  onCheck: (slot: 'morning' | 'night') => void;
  onStartTest: () => void;
  onReset: () => void;
}) {
  const isMorning = new Date().getHours() < 14;

  // Dosage by profile
  const caDose = state.gender === 'female' ? '1000mg' : '1000mg';
  const d3Dose = '2000 IU';
  const mgDose = state.gender === 'female' ? '320mg' : '420mg';

  // Count total checks in history
  const totalChecks = Object.values(state.checkHistory).reduce(
    (sum, d) => sum + (d.morning ? 1 : 0) + (d.night ? 1 : 0), 0
  ) + (state.todayChecks.morning ? 1 : 0) + (state.todayChecks.night ? 1 : 0);

  return (
    <div className="px-5 pt-5 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-lg font-bold text-gray-900">Tam Giác Vàng</h1>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-teal-50 text-teal-700 font-semibold px-2.5 py-1 rounded-full">
            Ngày {day}/7
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-400 mb-5">
        {totalChecks > 0 ? `Bạn đã uống ${totalChecks} lần rồi, giỏi lắm!` : 'Hôm nay bắt đầu nào!'}
      </p>

      {/* Day Progress */}
      <div className="flex gap-1 mb-6">
        {[1, 2, 3, 4, 5, 6, 7].map(d => (
          <div key={d} className={`h-2 flex-1 rounded-full transition-all ${
            d < day ? 'bg-teal-400' : d === day ? 'bg-teal-500 animate-pulse' : d === 7 ? 'bg-amber-200' : 'bg-gray-200'
          }`} />
        ))}
      </div>

      {/* Morning Card */}
      <button
        onClick={() => !state.todayChecks.morning && onCheck('morning')}
        className={`w-full mb-3 rounded-2xl border-2 transition-all text-left overflow-hidden ${
          state.todayChecks.morning
            ? 'border-teal-300 bg-teal-50'
            : isMorning
            ? 'border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-md shadow-amber-100'
            : 'border-gray-200 bg-white'
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">☀️</span>
              <div>
                <div className="text-sm font-bold text-gray-900">Buổi sáng</div>
                <div className="text-[11px] text-gray-500">Sau bữa ăn sáng</div>
              </div>
            </div>
            {state.todayChecks.morning ? (
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-lg">
                &#10003;
              </div>
            ) : isMorning ? (
              <div className="text-xs font-semibold text-amber-600 bg-amber-100 px-3 py-1 rounded-full animate-pulse">
                Uống ngay
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full border-2 border-gray-300" />
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 bg-white/60 rounded-xl px-3 py-2">
              <span className="text-lg">🧱</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-800">Canxi</div>
                <div className="text-[11px] text-gray-500">Gạch xây nhà</div>
              </div>
              <span className="text-xs font-semibold text-blue-600">{caDose}</span>
            </div>
            <div className="flex items-center gap-3 bg-white/60 rounded-xl px-3 py-2">
              <span className="text-lg">🌞</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-800">Vitamin D3</div>
                <div className="text-[11px] text-gray-500">Ánh nắng giúp dính gạch</div>
              </div>
              <span className="text-xs font-semibold text-amber-600">{d3Dose}</span>
            </div>
          </div>
        </div>
      </button>

      {/* Night Card */}
      <button
        onClick={() => !state.todayChecks.night && onCheck('night')}
        className={`w-full mb-5 rounded-2xl border-2 transition-all text-left overflow-hidden ${
          state.todayChecks.night
            ? 'border-teal-300 bg-teal-50'
            : !isMorning
            ? 'border-indigo-300 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-md shadow-indigo-100'
            : 'border-gray-200 bg-white'
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌙</span>
              <div>
                <div className="text-sm font-bold text-gray-900">Buổi tối</div>
                <div className="text-[11px] text-gray-500">Trước khi ngủ 1 tiếng</div>
              </div>
            </div>
            {state.todayChecks.night ? (
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-lg">
                &#10003;
              </div>
            ) : !isMorning ? (
              <div className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full animate-pulse">
                Uống ngay
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full border-2 border-gray-300" />
            )}
          </div>

          <div className="flex items-center gap-3 bg-white/60 rounded-xl px-3 py-2">
            <span className="text-lg">🌙</span>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-800">Magie</div>
              <div className="text-[11px] text-gray-500">Xi-măng kết dính, ngủ ngon</div>
            </div>
            <span className="text-xs font-semibold text-indigo-600">{mgDose}</span>
          </div>
        </div>
      </button>

      {/* Both done today */}
      {state.todayChecks.morning && state.todayChecks.night && (
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-4 mb-5 text-center animate-bounce-in">
          <div className="text-3xl mb-1">🎉</div>
          <div className="text-sm font-bold text-teal-800">Hoàn thành ngày hôm nay!</div>
          <div className="text-xs text-teal-600 mt-1">Cơ thể bạn cảm ơn bạn đấy</div>
        </div>
      )}

      {/* Separation reminder */}
      <div className="bg-gray-50 rounded-xl px-4 py-3 mb-5">
        <div className="text-[11px] text-gray-500 text-center">
          💡 <span className="font-medium">Sáng uống Canxi+D3</span> — cách xa — <span className="font-medium">Tối uống Magie</span>
        </div>
        <div className="text-[10px] text-gray-400 text-center mt-1">
          Chúng "giành nhau" nếu uống cùng lúc
        </div>
      </div>

      {/* Day 7: Stomach Test CTA */}
      {day >= 6 && !state.testResult && (
        <button
          onClick={onStartTest}
          className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-bold text-base shadow-lg shadow-orange-200 active:scale-95 transition-all mb-4"
        >
          🧪 Kiểm tra sức khỏe dạ dày (2 phút)
        </button>
      )}

      {/* Test result badge */}
      {state.testResult && (
        <div className={`rounded-2xl p-4 mb-4 ${
          state.testResult === 'low' ? 'bg-amber-50 border border-amber-200' :
          state.testResult === 'high' ? 'bg-red-50 border border-red-200' :
          'bg-green-50 border border-green-200'
        }`}>
          <div className="text-sm font-bold text-gray-800 mb-1">
            🧪 Kết quả test dạ dày
          </div>
          <div className="text-xs text-gray-600">
            {state.testResult === 'low' && 'Dạ dày bạn hơi thiếu axit. Tam Giác Vàng sẽ giúp cải thiện!'}
            {state.testResult === 'normal' && 'Dạ dày bạn axit vừa phải. Tiếp tục giữ gìn nhé!'}
            {state.testResult === 'high' && 'Dạ dày bạn nhiều axit. Hạn chế chua cay, ăn chậm nhai kỹ.'}
          </div>
        </div>
      )}

      {/* Reset */}
      <button
        onClick={onReset}
        className="w-full py-2 text-xs text-gray-400 font-medium"
      >
        Bắt đầu lại từ đầu
      </button>
    </div>
  );
}

// ============================================================================
// SCREEN: Stomach Test — Baking Soda Test (tối giản)
// ============================================================================

function StomachTest({ onStart }: { onStart: () => void }) {
  return (
    <div className="px-5 pt-8 pb-4 animate-slide-up">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">🧪</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Test dạ dày tại nhà</h2>
        <p className="text-sm text-gray-500">Chỉ cần baking soda + nước ấm</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5 shadow-sm">
        <h3 className="text-sm font-bold text-gray-800 mb-4">Chuẩn bị:</h3>
        <div className="space-y-3">
          {[
            { emoji: '🥄', text: '1/4 muỗng cà phê baking soda' },
            { emoji: '🥛', text: '200ml nước ấm (1 ly)' },
            { emoji: '⏰', text: 'Bụng đói (sáng sớm tốt nhất)' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xl">{item.emoji}</span>
              <span className="text-sm text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl p-5 mb-5">
        <h3 className="text-sm font-bold text-blue-800 mb-3">Cách làm:</h3>
        <div className="space-y-2">
          {[
            'Hòa baking soda vào nước ấm, khuấy đều',
            'Uống hết 1 lần',
            'Bấm "Bắt đầu đếm" rồi chờ',
            'Khi nào ợ hơi thì bấm dừng',
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-200 text-blue-800 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <span className="text-sm text-blue-900">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-orange-200 active:scale-95 transition-all"
      >
        Đã uống xong, bắt đầu đếm!
      </button>
    </div>
  );
}

// ============================================================================
// SCREEN: Timer — Đếm thời gian chờ ợ hơi
// ============================================================================

function TestTimer({ onResult }: { onResult: (r: 'low' | 'normal' | 'high') => void }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const handleBurp = () => {
    setRunning(false);
    if (seconds < 60) onResult('high');           // < 1 phút: nhiều axit
    else if (seconds < 180) onResult('normal');    // 1-3 phút: bình thường
    else onResult('low');                           // > 3 phút: thiếu axit
  };

  const handleTimeout = () => {
    setRunning(false);
    onResult('low');                                // > 5 phút: thiếu axit
  };

  return (
    <div className="px-5 pt-10 pb-4 text-center">
      <div className="text-5xl mb-3">⏱️</div>
      <h2 className="text-lg font-bold text-gray-900 mb-1">Đang đếm...</h2>
      <p className="text-xs text-gray-500 mb-8">Chờ ợ hơi rồi bấm nút bên dưới</p>

      {/* Timer Display */}
      <div className="text-6xl font-mono font-bold text-teal-600 mb-8 tabular-nums">
        {minutes}:{secs.toString().padStart(2, '0')}
      </div>

      {/* Pulse animation */}
      <div className="flex justify-center mb-8">
        <div className="w-4 h-4 rounded-full bg-teal-400 animate-ping" />
      </div>

      <button
        onClick={handleBurp}
        className="w-full py-4 bg-teal-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-teal-200 active:scale-95 transition-all mb-3"
      >
        Vừa ợ hơi!
      </button>

      {seconds >= 300 && (
        <button
          onClick={handleTimeout}
          className="w-full py-3 bg-gray-100 text-gray-600 rounded-2xl font-medium text-sm"
        >
          Đã 5 phút, chưa ợ
        </button>
      )}

      {seconds < 300 && (
        <p className="text-xs text-gray-400 mt-2">
          Nếu sau 5 phút chưa ợ, sẽ có nút kết thúc
        </p>
      )}
    </div>
  );
}

// ============================================================================
// SCREEN: Test Result — Kết quả giải thích đơn giản
// ============================================================================

function TestResult({ result, gender, onDone }: { result: 'low' | 'normal' | 'high'; gender: Gender; onDone: () => void }) {
  const configs = {
    low: {
      emoji: '🟡',
      title: 'Dạ dày hơi "lười"',
      body: 'Dạ dày bạn tạo ít axit hơn bình thường. Giống như bếp lửa cháy yếu — thức ăn tiêu hóa chậm.',
      advice: [
        '🧱 Canxi Cacbonat giúp cân bằng axit (đã có trong Tam Giác Vàng!)',
        '🥚 Ăn 1-2 quả trứng mỗi sáng giúp kích thích dạ dày',
        '🚫 ĐỪNG uống thuốc giảm axit (PPI) — sẽ làm tệ hơn',
      ],
      bg: 'from-amber-50 to-yellow-50',
      color: 'text-amber-800',
    },
    normal: {
      emoji: '🟢',
      title: 'Dạ dày khỏe mạnh!',
      body: 'Bếp lửa dạ dày đang cháy tốt. Tiếp tục ăn uống lành mạnh nhé!',
      advice: [
        '🧱 Tiếp tục Tam Giác Vàng để duy trì sức khỏe',
        '🥬 Ăn nhiều rau xanh, trái cây tươi',
        '😋 Nhai kỹ 20 lần mỗi miếng để giữ dạ dày khỏe',
      ],
      bg: 'from-green-50 to-emerald-50',
      color: 'text-green-800',
    },
    high: {
      emoji: '🔴',
      title: 'Dạ dày hơi "nóng"',
      body: 'Dạ dày tạo nhiều axit — giống bếp lửa cháy quá mạnh. Cần "hạ lửa" bằng cách ăn uống đúng cách.',
      advice: [
        '🍽️ Ăn đúng giờ, chỉ no 70%, thức ăn ấm ~40°C',
        '🚫 Giảm chua (chanh, giấm), giảm cay (ớt, tiêu)',
        '😋 Nhai kỹ 20-30 lần mỗi miếng — rất quan trọng!',
        '🛏️ Không nằm ngay sau ăn, chờ 2-3 tiếng',
      ],
      bg: 'from-red-50 to-orange-50',
      color: 'text-red-800',
    },
  };

  const c = configs[result];

  return (
    <div className="px-5 pt-8 pb-4 animate-slide-up">
      <div className={`bg-gradient-to-b ${c.bg} rounded-3xl p-6 text-center mb-5`}>
        <div className="text-5xl mb-3">{c.emoji}</div>
        <h2 className={`text-xl font-bold mb-2 ${c.color}`}>{c.title}</h2>
        <p className="text-sm text-gray-700 leading-relaxed">{c.body}</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mb-5">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Lời khuyên cho bạn:</h3>
        <div className="space-y-3">
          {c.advice.map((text, i) => (
            <div key={i} className="text-sm text-gray-700 leading-relaxed">{text}</div>
          ))}
        </div>
      </div>

      <button
        onClick={onDone}
        className="w-full py-4 bg-teal-500 text-white rounded-2xl font-bold text-base shadow-lg shadow-teal-200 active:scale-95 transition-all"
      >
        Quay lại Tam Giác Vàng
      </button>
    </div>
  );
}
