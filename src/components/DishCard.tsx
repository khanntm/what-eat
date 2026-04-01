'use client';

import { Dish } from '@/data/dishes';

interface DishCardProps {
  dish: Dish;
  onSelect?: (dish: Dish) => void;
  showVoting?: boolean;
  onVote?: (dishId: string, vote: 'up' | 'down') => void;
  currentVote?: 'up' | 'down';
  compact?: boolean;
}

const budgetLabel = { 'rẻ': '$', 'vừa': '$$', 'cao': '$$$' };
const sourceLabel = {
  'nấu-tại-nhà': '🏠 Nấu tại nhà',
  'mua-ngoài': '🏪 Mua ngoài',
  'cửa-hàng-tiện-lợi': '🏬 Cửa hàng tiện lợi',
};

export default function DishCard({ dish, onSelect, showVoting, onVote, currentVote, compact }: DishCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all active:scale-[0.98] ${
        onSelect ? 'cursor-pointer hover:shadow-md' : ''
      } ${compact ? 'p-3' : 'p-4'}`}
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
            {dish.kidFriendly && (
              <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded-full font-medium">
                Kid-friendly
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
