'use client';

import { useState, useMemo } from 'react';
import type { UserProfile } from '@/data/health-types';
import { runEngine } from '@/lib/engine';
import type { ReminderSlot, DietRule, DietNotification, MealSuggestion, FiberTarget, SuperfoodTip, SmartTipOutput } from '@/lib/engine';

interface Props {
  profile: UserProfile;
  onRestart: () => void;
}

type Tab = 'reminder' | 'diet';

export default function HealthResult({ profile, onRestart }: Props) {
  const [tab, setTab] = useState<Tab>('reminder');
  const result = useMemo(() => runEngine(profile), [profile]);

  return (
    <div className="px-4 pt-5 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Gợi ý cho bạn</h1>
          <p className="text-xs text-gray-500">
            {result.reminder.totalNutrients} vi chất &middot; {result.diet.dietRules.length} quy tắc
          </p>
        </div>
        <button
          onClick={onRestart}
          className="text-xs text-teal-600 font-medium bg-teal-50 px-3 py-1.5 rounded-lg"
        >
          Thay đổi
        </button>
      </div>

      {/* Notifications (Anti-pattern warnings) */}
      {result.diet.notifications.length > 0 && (
        <div className="mb-4 space-y-2">
          {result.diet.notifications.slice(0, 3).map((n, i) => (
            <NotificationCard key={i} notification={n} />
          ))}
        </div>
      )}

      {/* Tab Switcher */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-4">
        <button
          onClick={() => setTab('reminder')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            tab === 'reminder'
              ? 'bg-white text-teal-600 shadow-sm'
              : 'text-gray-500'
          }`}
        >
          💊 Lịch Vi chất
        </button>
        <button
          onClick={() => setTab('diet')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            tab === 'diet'
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-gray-500'
          }`}
        >
          🍽️ Thực đơn
        </button>
      </div>

      {/* Tab Content */}
      {tab === 'reminder' ? (
        <ReminderTab slots={result.reminder.slots} warnings={result.reminder.warnings} />
      ) : (
        <DietTab
          meals={result.diet.meals}
          fiberTarget={result.diet.fiberTarget}
          dietRules={result.diet.dietRules}
          superfoodTips={result.diet.superfoodTips}
          smartTips={result.diet.smartTips}
          stomachRule={result.diet.stomachRule}
        />
      )}
    </div>
  );
}

// ============================================================================
// REMINDER TAB — Luồng 1: Lịch uống vi chất
// ============================================================================

function ReminderTab({ slots, warnings }: { slots: ReminderSlot[]; warnings: { type: string; messageVi: string }[] }) {
  if (slots.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        <div className="text-4xl mb-2">💊</div>
        <p className="text-sm">Chưa có vi chất nào cần bổ sung.</p>
        <p className="text-xs mt-1">Hãy chọn tình trạng sức khỏe hoặc vi chất quan tâm.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-slide-up">
      {/* Timeline */}
      {slots.map((slot, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-100">
            <div className="text-lg font-bold text-teal-600">{slot.time}</div>
            <div>
              <div className="text-sm font-semibold text-teal-800">{slot.labelVi}</div>
              {slot.withFood && (
                <div className="text-[10px] text-teal-600">Uống cùng bữa ăn</div>
              )}
            </div>
          </div>
          <div className="px-4 py-3 space-y-2">
            {slot.nutrients.map((n, j) => (
              <div key={j} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-400 flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-sm font-semibold text-gray-800">{n.nameVi}</span>
                  <span className="text-xs text-teal-600 ml-2">{n.dosage}</span>
                </div>
              </div>
            ))}
          </div>
          {slot.tipVi && (
            <div className="px-4 pb-3">
              <div className="text-[11px] text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                💡 {slot.tipVi}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="mt-3 space-y-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Lưu ý quan trọng</div>
          {warnings.map((w, i) => (
            <div key={i} className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 text-xs text-amber-800">
              ⚠️ {w.messageVi}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// DIET TAB — Luồng 2: Gợi ý thực đơn
// ============================================================================

function DietTab({
  meals, fiberTarget, dietRules, superfoodTips, smartTips, stomachRule,
}: {
  meals: MealSuggestion[];
  fiberTarget: FiberTarget;
  dietRules: DietRule[];
  superfoodTips: SuperfoodTip[];
  smartTips: SmartTipOutput[];
  stomachRule: { ruleVi: string; whyVi: string };
}) {
  return (
    <div className="space-y-4 animate-slide-up">
      {/* Stomach Rule */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">😋</span>
          <span className="text-sm font-bold text-amber-800">Quy tắc Dạ dày</span>
        </div>
        <div className="text-sm text-amber-700 font-medium">{stomachRule.ruleVi}</div>
        <div className="text-[11px] text-amber-600 mt-1">{stomachRule.whyVi}</div>
      </div>

      {/* Fiber Target Card */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🥬</span>
          <span className="text-sm font-bold text-green-800">Quy tắc Nắm Đấm (không cần đếm Calo)</span>
        </div>
        <div className="text-sm text-green-700 font-medium">{fiberTarget.genderVi}</div>
        <div className="flex gap-3 mt-3">
          <FiberBadge label="Sáng" count={fiberTarget.perMeal.morning} />
          <FiberBadge label="Trưa" count={fiberTarget.perMeal.lunch} />
          <FiberBadge label="Tối" count={fiberTarget.perMeal.dinner} />
        </div>
        <div className="text-[11px] text-green-600 mt-2">{fiberTarget.tipVi}</div>
      </div>

      {/* Smart Tips (BS Phúc) */}
      {smartTips.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Mẹo ăn uống thông minh
          </div>
          <div className="space-y-2">
            {smartTips.slice(0, 5).map((tip, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl px-3.5 py-3 shadow-sm">
                <div className="flex items-start gap-2">
                  <span className="text-base flex-shrink-0">{tip.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-gray-500">{tip.conditionVi}</div>
                    <div className="text-sm text-gray-800 mt-0.5 leading-relaxed">{tip.tipVi}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Diet Rules */}
      {dietRules.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Quy tắc ăn uống
          </div>
          <div className="space-y-2">
            {dietRules.slice(0, 5).map((rule) => (
              <DietRuleCard key={rule.id} rule={rule} />
            ))}
          </div>
        </div>
      )}

      {/* Meals */}
      {meals.map((meal) => (
        <MealCard key={meal.mealTime} meal={meal} />
      ))}

      {/* Superfood Tips */}
      {superfoodTips.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Siêu thực phẩm nên thêm
          </div>
          <div className="grid grid-cols-2 gap-2">
            {superfoodTips.slice(0, 6).map((tip, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl px-3 py-2.5 shadow-sm">
                <div className="text-sm font-semibold text-gray-800">{tip.nameVi}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{tip.tipVi}</div>
                <div className="text-[10px] text-teal-600 mt-1">
                  Bữa {tip.mealTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function NotificationCard({ notification: n }: { notification: DietNotification }) {
  const [expanded, setExpanded] = useState(false);
  const colors = n.type === 'danger'
    ? 'bg-red-50 border-red-300 text-red-800'
    : n.type === 'warning'
    ? 'bg-amber-50 border-amber-300 text-amber-800'
    : 'bg-blue-50 border-blue-200 text-blue-800';

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className={`w-full text-left ${colors} border rounded-xl px-3 py-2.5 transition-all`}
    >
      <div className="flex items-start gap-2">
        <span className="text-base flex-shrink-0">{n.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold">{n.titleVi}</div>
          {expanded && (
            <div className="text-[11px] mt-1.5 opacity-90 leading-relaxed">{n.messageVi}</div>
          )}
          {!expanded && (
            <div className="text-[10px] opacity-60 mt-0.5">Nhấn để xem chi tiết</div>
          )}
        </div>
      </div>
    </button>
  );
}

function FiberBadge({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex-1 text-center bg-white rounded-xl py-2 border border-green-200">
      <div className="text-lg font-bold text-green-700">{count}</div>
      <div className="text-[10px] text-green-600">{label}</div>
    </div>
  );
}

function DietRuleCard({ rule }: { rule: DietRule }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="w-full text-left bg-white border border-gray-100 rounded-xl px-3.5 py-3 shadow-sm transition-all"
    >
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
          rule.priority >= 9 ? 'bg-red-400' : rule.priority >= 7 ? 'bg-amber-400' : 'bg-gray-300'
        }`} />
        <div className="text-sm font-semibold text-gray-800 flex-1">{rule.nameVi}</div>
        <span className="text-[10px] text-gray-400">{expanded ? '▲' : '▼'}</span>
      </div>
      {expanded && (
        <div className="mt-2 text-xs text-gray-600 leading-relaxed whitespace-pre-line">
          {rule.ruleVi}
          <div className="text-[10px] text-teal-600 mt-1.5 font-medium">
            Nguồn: {rule.source}
          </div>
        </div>
      )}
    </button>
  );
}

function MealCard({ meal }: { meal: MealSuggestion }) {
  const timeEmoji = meal.mealTime === 'sáng' ? '🌅' : meal.mealTime === 'trưa' ? '☀️' : '🌙';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-4 py-2.5 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100 flex items-center justify-between">
        <h3 className="text-sm font-bold text-orange-800">
          {timeEmoji} {meal.labelVi}
        </h3>
        {meal.reminderVi && (
          <span className="text-[10px] text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full font-medium">
            Nhai 20-30 lần
          </span>
        )}
      </div>
      <div className="px-4 py-3 space-y-2">
        {meal.dishes.map((sd, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-2xl flex-shrink-0">{sd.dish.image}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-800">{sd.dish.name}</div>
              {sd.reasons.length > 0 && (
                <div className="text-[10px] text-teal-600 truncate">
                  {sd.reasons.filter(r => !r.startsWith('GERD')).slice(0, 2).join(' • ')}
                </div>
              )}
            </div>
            {sd.score > 0 && (
              <div className="text-xs font-semibold text-teal-500 bg-teal-50 px-2 py-0.5 rounded-full">
                +{sd.score}
              </div>
            )}
          </div>
        ))}
      </div>
      {meal.superfoodAddOns.length > 0 && (
        <div className="px-4 pb-3">
          <div className="bg-emerald-50 rounded-lg px-3 py-2 space-y-1">
            {meal.superfoodAddOns.map((tip, i) => (
              <div key={i} className="text-[11px] text-emerald-700">
                ✦ {tip}
              </div>
            ))}
          </div>
        </div>
      )}
      {meal.reminderVi && (
        <div className="px-4 pb-3">
          <div className="bg-amber-50 rounded-lg px-3 py-2 text-[11px] text-amber-700">
            🔔 {meal.reminderVi}
          </div>
        </div>
      )}
    </div>
  );
}
