'use client';

import { useState, useCallback } from 'react';
import { Dish } from '@/data/dishes';
import { suggestDishes, randomDish, getCurrentMealTime, SuggestOptions } from '@/lib/suggest';
import DishCard from '@/components/DishCard';

const mealTimeEmoji = { 'sáng': '🌅', 'trưa': '☀️', 'tối': '🌙' };
const mealTimeLabel = { 'sáng': 'Buổi sáng', 'trưa': 'Buổi trưa', 'tối': 'Buổi tối' };

export default function HomePage() {
  const [suggestions, setSuggestions] = useState<Dish[]>([]);
  const [quickDish, setQuickDish] = useState<Dish | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const mealTime = getCurrentMealTime();

  const handleSuggest = useCallback(() => {
    setIsShaking(true);
    setShowResults(false);
    setQuickDish(null);
    setSelectedDish(null);

    setTimeout(() => {
      const options: SuggestOptions = { mealTime };
      setSuggestions(suggestDishes(options, 3));
      setIsShaking(false);
      setShowResults(true);
    }, 600);
  }, [mealTime]);

  const handleQuickMode = useCallback(() => {
    setIsShaking(true);
    setShowResults(false);
    setSuggestions([]);
    setSelectedDish(null);

    setTimeout(() => {
      setQuickDish(randomDish({ mealTime }));
      setIsShaking(false);
      setShowResults(true);
    }, 600);
  }, [mealTime]);

  const handleSelect = (dish: Dish) => {
    setSelectedDish(dish);
  };

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">{mealTimeEmoji[mealTime]}</div>
        <h1 className="text-2xl font-bold text-gray-900">Hôm nay ăn gì?</h1>
        <p className="text-sm text-gray-500 mt-1">{mealTimeLabel[mealTime]} - Hãy để app quyết định!</p>
      </div>

      {/* Main CTA */}
      <button
        onClick={handleSuggest}
        disabled={isShaking}
        className={`w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-orange-200 transition-all active:scale-95 disabled:opacity-70 ${
          isShaking ? 'animate-shake' : 'hover:shadow-xl hover:shadow-orange-300'
        }`}
      >
        {isShaking ? '🔄 Đang chọn...' : '🍜 Hôm nay ăn gì?'}
      </button>

      {/* Quick Mode */}
      <button
        onClick={handleQuickMode}
        disabled={isShaking}
        className="w-full mt-3 py-3 px-6 bg-white border-2 border-orange-200 text-orange-600 rounded-2xl font-semibold text-base transition-all active:scale-95 hover:bg-orange-50 disabled:opacity-70"
      >
        ⚡ Random nhanh 1 món
      </button>

      {/* Selected dish confirmation */}
      {selectedDish && (
        <div className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-200 animate-bounce-in">
          <div className="text-center">
            <div className="text-3xl mb-2">🎉</div>
            <h3 className="font-bold text-green-800 text-lg">Đã chọn!</h3>
            <p className="text-2xl mt-2">{selectedDish.image} {selectedDish.name}</p>
            <p className="text-sm text-green-600 mt-1">{selectedDish.description}</p>
            {selectedDish.ingredients.length > 0 && (
              <div className="mt-3 text-xs text-green-700">
                <span className="font-medium">Nguyên liệu:</span> {selectedDish.ingredients.join(', ')}
              </div>
            )}
            <button
              onClick={() => setSelectedDish(null)}
              className="mt-3 text-sm text-green-600 underline"
            >
              Chọn lại
            </button>
          </div>
        </div>
      )}

      {/* Suggestions */}
      {showResults && suggestions.length > 0 && !selectedDish && (
        <div className="mt-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Gợi ý cho bạn
          </h2>
          {suggestions.map((dish, i) => (
            <div key={dish.id} className={`animate-slide-up delay-${(i + 1) * 100}`}>
              <DishCard dish={dish} onSelect={handleSelect} />
            </div>
          ))}
          <button
            onClick={handleSuggest}
            className="w-full py-2.5 text-sm text-orange-500 font-medium hover:text-orange-600"
          >
            🔄 Gợi ý khác
          </button>
        </div>
      )}

      {/* Quick Mode Result */}
      {showResults && quickDish && !selectedDish && (
        <div className="mt-6 animate-bounce-in">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            ⚡ Kết quả random
          </h2>
          <DishCard dish={quickDish} onSelect={handleSelect} />
          <button
            onClick={handleQuickMode}
            className="w-full mt-3 py-2.5 text-sm text-orange-500 font-medium hover:text-orange-600"
          >
            🎲 Random lại
          </button>
        </div>
      )}

      {/* Empty state */}
      {!showResults && !isShaking && (
        <div className="mt-12 text-center text-gray-400">
          <div className="text-6xl mb-4 opacity-30">🍽️</div>
          <p className="text-sm">Bấm nút ở trên để bắt đầu!</p>
        </div>
      )}
    </div>
  );
}
