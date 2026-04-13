'use client';

import { useState } from 'react';
import { Dish } from '@/data/dishes';
import { getDishWarnings } from '@/lib/diet-filter';
import type { CookingWarning } from '@/data/nutrition-rules';

interface DishCardProps {
  dish: Dish;
  onSelect?: (dish: Dish) => void;
  showVoting?: boolean;
  onVote?: (dishId: string, vote: 'up' | 'down') => void;
  currentVote?: 'up' | 'down';
  compact?: boolean;
  showWarnings?: boolean;  // Show cooking warnings
}

const budgetLabel = { 'rẻ': '$', 'vừa': '$$', 'cao': '$$$' };
const sourceLabel = {
  'nấu-tại-nhà': '🏠 Nấu tại nhà',
  'mua-ngoài': '🏪 Mua ngoài',
  'cửa-hàng-tiện-lợi': '🏬 Cửa hàng tiện lợi',
};

export default function DishCard({ dish, onSelect, showVoting, onVote, currentVote, compact, showWarnings = true }: DishCardProps) {
  const [expandedWarning, setExpandedWarning] = useState<string | null>(null);

  // Get cooking warnings for this dish
  const warnings = showWarnings ? getDishWarnings(dish) : [];
  const hasDanger = warnings.some(w => w.dangerLevel === 'danger');

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all active:scale-[0.98] ${
        hasDanger ? 'border-amber-200' : 'border-gray-100'
      } ${onSelect ? 'cursor-pointer hover:shadow-md' : ''} ${compact ? 'p-3' : 'p-4'}`}
      onClick={() => onSelect?.(dish)}
    >
      <div className="flex items-start gap-3">
        <div className={`${compact ? 'text-3xl' : 'text-4xl'} flex-shrink-0`}>{dish.image}</div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-gray-900 ${compact ? 'text-sm' : 'text-base'}`}>{dish.name}</h3>
          {!compact && <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{dish.description}</p>}
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="text-xs px-2 py-0.5 bg-orange-50 text-orange-600 rounded-full font-medium">
              {budgetLabel[dish.budget]}
            </span>
            {dish.cookTime > 0 && (
              <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium">
                {dish.cookTime} phút
              </span>
            )}
            {dish.vegetarian && (
              <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full font-medium">
                🌿 Chay
              </span>
            )}
            {dish.kidFriendly && (
              <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded-full font-medium">
                Kid-friendly
              </span>
            )}
            {/* Superfood badge */}
            {dish.superfoodTags && dish.superfoodTags.length > 0 && (
              <span className="text-xs px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full font-medium">
                ✦ Superfood
              </span>
            )}
            {/* Warning badge */}
            {warnings.length > 0 && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                hasDanger ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {hasDanger ? '⚠️' : '💡'} {warnings.length} lưu ý
              </span>
            )}
            {dish.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
          {!compact && (
            <div className="mt-2 text-xs text-gray-400">{sourceLabel[dish.source]}</div>
          )}
        </div>
      </div>

      {/* Health tip */}
      {dish.healthTips && dish.healthTips.length > 0 && !compact && (
        <div className="mt-2 bg-teal-50 rounded-lg px-3 py-1.5 text-[11px] text-teal-700">
          💡 {dish.healthTips[0]}
        </div>
      )}

      {/* Cooking warnings (expandable) */}
      {warnings.length > 0 && !compact && (
        <div className="mt-2 space-y-1">
          {warnings.map(w => (
            <WarningBadge key={w.id} warning={w} expanded={expandedWarning === w.id}
              onToggle={() => setExpandedWarning(expandedWarning === w.id ? null : w.id)} />
          ))}
        </div>
      )}

      {showVoting && onVote && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50">
          <button
            onClick={(e) => { e.stopPropagation(); onVote(dish.id, 'up'); }}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
              currentVote === 'up'
                ? 'bg-green-500 text-white'
                : 'bg-green-50 text-green-600 hover:bg-green-100'
            }`}
          >
            👍 Thích
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onVote(dish.id, 'down'); }}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
              currentVote === 'down'
                ? 'bg-red-500 text-white'
                : 'bg-red-50 text-red-600 hover:bg-red-100'
            }`}
          >
            👎 Không
          </button>
        </div>
      )}
    </div>
  );
}

function WarningBadge({ warning, expanded, onToggle }: {
  warning: CookingWarning;
  expanded: boolean;
  onToggle: () => void;
}) {
  const colors = warning.dangerLevel === 'danger'
    ? 'bg-red-50 border-red-200 text-red-800'
    : warning.dangerLevel === 'warning'
    ? 'bg-amber-50 border-amber-200 text-amber-800'
    : 'bg-blue-50 border-blue-200 text-blue-700';

  return (
    <button onClick={(e) => { e.stopPropagation(); onToggle(); }} className={`w-full text-left ${colors} border rounded-lg px-2.5 py-1.5 transition-all`}>
      <div className="flex items-center gap-1.5">
        <span className="text-sm">{warning.icon}</span>
        <span className="text-[11px] font-semibold flex-1">{warning.titleVi}</span>
        <span className="text-[10px] opacity-50">{expanded ? '▲' : '▼'}</span>
      </div>
      {expanded && (
        <div className="mt-1.5 text-[11px] leading-relaxed opacity-90">
          {warning.messageVi}
          {warning.alternativeVi && (
            <div className="mt-1 font-semibold">💡 {warning.alternativeVi}</div>
          )}
        </div>
      )}
    </button>
  );
}
