'use client';

import { useState, useCallback } from 'react';
import { Dish, MealTime } from '@/data/dishes';
import { suggestMealCombos, suggestMainDishes, randomDish, getCurrentMealTime, MealCombo } from '@/lib/suggest';
import DishCard from '@/components/DishCard';

const mealTimes: { key: MealTime; icon: string; label: string }[] = [
  { key: 'sáng', icon: '🌅', label: 'Sáng' },
  { key: 'trưa', icon: '☀️', label: 'Trưa' },
  { key: 'tối', icon: '🌙', label: 'Tối' },
];

type SuggestMode = 'combo' | 'main' | 'quick';

export default function HomePage() {
  const [mealTime, setMealTime] = useState<MealTime>(getCurrentMealTime());
  const [vegetarian, setVegetarian] = useState(false);
  const [combos, setCombos] = useState<MealCombo[]>([]);
  const [mainDishes, setMainDishes] = useState<Dish[]>([]);
  const [quickDish, setQuickDish] = useState<Dish | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [mode, setMode] = useState<SuggestMode | null>(null);

  const handleMealTimeChange = (mt: MealTime) => {
    setMealTime(mt);
    setMode(null);
    setCombos([]);
    setMainDishes([]);
    setQuickDish(null);
  };

  const handleCombo = useCallback(() => {
    setIsShaking(true);
    setMode(null);
    setTimeout(() => {
      setCombos(suggestMealCombos({ mealTime, vegetarian: vegetarian || undefined }, 2));
      setMainDishes([]);
      setQuickDish(null);
      setMode('combo');
      setIsShaking(false);
    }, 500);
  }, [mealTime, vegetarian]);

  const handleMain = useCallback(() => {
    setIsShaking(true);
    setMode(null);
    setTimeout(() => {
      setMainDishes(suggestMainDishes({ mealTime, vegetarian: vegetarian || undefined }, 3));
      setCombos([]);
      setQuickDish(null);
      setMode('main');
      setIsShaking(false);
    }, 500);
  }, [mealTime, vegetarian]);

  const handleQuick = useCallback(() => {
    setIsShaking(true);
    setMode(null);
    setTimeout(() => {
      setQuickDish(randomDish({ mealTime, vegetarian: vegetarian || undefined }));
      setCombos([]);
      setMainDishes([]);
      setMode('quick');
      setIsShaking(false);
    }, 500);
  }, [mealTime, vegetarian]);

  const currentMealInfo = mealTimes.find((m) => m.key === mealTime)!;
  const isLunchOrDinner = mealTime === 'trưa' || mealTime === 'tối';

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">{currentMealInfo.icon}</div>
        <h1 className="text-2xl font-bold text-gray-900">Hôm nay ăn gì?</h1>
        <p className="text-sm text-gray-500 mt-1">Chọn bữa rồi bấm gợi ý!</p>
      </div>

      {/* Meal Time Picker */}
      <div className="flex gap-2 mb-3">
        {mealTimes.map((mt) => (
          <button
            key={mt.key}
            onClick={() => handleMealTimeChange(mt.key)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              mealTime === mt.key
                ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                : 'bg-white text-gray-600 border border-gray-100 hover:bg-orange-50'
            }`}
          >
            <span className="block text-lg">{mt.icon}</span>
            <span className="block text-xs mt-0.5">{mt.label}</span>
          </button>
        ))}
      </div>

      {/* Vegetarian Toggle */}
      <button
        onClick={() => { setVegetarian(!vegetarian); setMode(null); }}
        className={`w-full mb-5 py-2.5 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
          vegetarian
            ? 'bg-green-500 text-white shadow-md shadow-green-200'
            : 'bg-white text-gray-500 border border-gray-100 hover:bg-green-50'
        }`}
      >
        <span className="text-lg">🌿</span>
        <span>{vegetarian ? 'Đang chọn: Ăn chay' : 'Ăn chay'}</span>
        {vegetarian && <span className="text-xs bg-green-600 px-1.5 py-0.5 rounded-full">ON</span>}
      </button>

      {/* Action Buttons */}
      {isLunchOrDinner ? (
        <div className="space-y-3">
          <button
            onClick={handleCombo}
            disabled={isShaking}
            className={`w-full py-4 px-6 ${vegetarian ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-green-200' : 'bg-gradient-to-r from-orange-500 to-red-500 shadow-orange-200'} text-white rounded-2xl font-bold text-lg shadow-lg transition-all active:scale-95 disabled:opacity-70 ${
              isShaking ? 'animate-shake' : ''
            }`}
          >
            {isShaking ? '🔄 Đang chọn...' : vegetarian ? '🌿 Gợi ý bữa cơm chay' : '🍚 Gợi ý bữa cơm (mặn + rau + canh)'}
          </button>
          <button
            onClick={handleMain}
            disabled={isShaking}
            className={`w-full py-3 px-6 bg-white border-2 ${vegetarian ? 'border-green-200 text-green-600 hover:bg-green-50' : 'border-orange-200 text-orange-600 hover:bg-orange-50'} rounded-2xl font-semibold text-base transition-all active:scale-95 disabled:opacity-70`}
          >
            {vegetarian ? '🌿 Gợi ý món chính chay' : '🍜 Gợi ý món chính (1 món trọn bữa)'}
          </button>
          <button
            onClick={handleQuick}
            disabled={isShaking}
            className="w-full py-3 px-6 bg-white border-2 border-gray-200 text-gray-600 rounded-2xl font-semibold text-sm transition-all active:scale-95 hover:bg-gray-50 disabled:opacity-70"
          >
            ⚡ Random nhanh 1 món
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <button
            onClick={handleMain}
            disabled={isShaking}
            className={`w-full py-4 px-6 ${vegetarian ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-green-200' : 'bg-gradient-to-r from-orange-500 to-red-500 shadow-orange-200'} text-white rounded-2xl font-bold text-lg shadow-lg transition-all active:scale-95 disabled:opacity-70 ${
              isShaking ? 'animate-shake' : ''
            }`}
          >
            {isShaking ? '🔄 Đang chọn...' : vegetarian ? `🌿 Ăn ${currentMealInfo.label.toLowerCase()} chay gì?` : `🍜 Ăn ${currentMealInfo.label.toLowerCase()} gì?`}
          </button>
          <button
            onClick={handleQuick}
            disabled={isShaking}
            className={`w-full py-3 px-6 bg-white border-2 ${vegetarian ? 'border-green-200 text-green-600 hover:bg-green-50' : 'border-orange-200 text-orange-600 hover:bg-orange-50'} rounded-2xl font-semibold text-base transition-all active:scale-95 disabled:opacity-70`}
          >
            ⚡ Random nhanh 1 món
          </button>
        </div>
      )}

      {/* === COMBO RESULTS === */}
      {mode === 'combo' && combos.length > 0 && (
        <div className="mt-6 space-y-5">
          {vegetarian && (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-xl text-xs text-green-700 font-medium">
              🌿 Thực đơn chay
            </div>
          )}
          {combos.map((combo, ci) => (
            <div key={ci} className="animate-slide-up" style={{ animationDelay: `${ci * 0.15}s` }}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className={`${vegetarian ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-100' : 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-100'} px-4 py-2.5 border-b`}>
                  <h3 className={`text-sm font-bold ${vegetarian ? 'text-green-700' : 'text-orange-700'}`}>
                    {vegetarian ? '🌿 ' : ''}Thực đơn {ci + 1}
                  </h3>
                </div>
                <div className="divide-y divide-gray-50">
                  <div className="px-4 py-3 flex items-center gap-3">
                    <span className={`text-xs font-semibold ${vegetarian ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'} px-2 py-0.5 rounded-full whitespace-nowrap`}>{vegetarian ? 'Chay' : 'Mặn'}</span>
                    <span className="text-2xl">{combo.monMan.image}</span>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{combo.monMan.name}</p>
                      <p className="text-xs text-gray-500 truncate">{combo.monMan.description}</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex items-center gap-3">
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full whitespace-nowrap">Rau</span>
                    <span className="text-2xl">{combo.rau.image}</span>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{combo.rau.name}</p>
                      <p className="text-xs text-gray-500 truncate">{combo.rau.description}</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex items-center gap-3">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full whitespace-nowrap">Canh</span>
                    <span className="text-2xl">{combo.canh.image}</span>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{combo.canh.name}</p>
                      <p className="text-xs text-gray-500 truncate">{combo.canh.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={handleCombo}
            className={`w-full py-2.5 text-sm ${vegetarian ? 'text-green-500 hover:text-green-600' : 'text-orange-500 hover:text-orange-600'} font-medium`}
          >
            🔄 Gợi ý thực đơn khác
          </button>
        </div>
      )}

      {/* === MAIN DISH RESULTS === */}
      {mode === 'main' && mainDishes.length > 0 && (
        <div className="mt-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {vegetarian ? '🌿 Gợi ý món chay' : 'Gợi ý món chính'}
          </h2>
          {mainDishes.map((dish, i) => (
            <div key={dish.id} className="animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <DishCard dish={dish} />
            </div>
          ))}
          <button
            onClick={handleMain}
            className={`w-full py-2.5 text-sm ${vegetarian ? 'text-green-500 hover:text-green-600' : 'text-orange-500 hover:text-orange-600'} font-medium`}
          >
            🔄 Gợi ý khác
          </button>
        </div>
      )}

      {/* === QUICK RESULT === */}
      {mode === 'quick' && quickDish && (
        <div className="mt-6 animate-bounce-in">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            ⚡ Kết quả random
          </h2>
          <DishCard dish={quickDish} />
          <button
            onClick={handleQuick}
            className="w-full mt-3 py-2.5 text-sm text-orange-500 font-medium hover:text-orange-600"
          >
            🎲 Random lại
          </button>
        </div>
      )}

      {/* Empty state */}
      {!mode && !isShaking && (
        <div className="mt-10 text-center text-gray-400">
          <div className="text-5xl mb-3 opacity-30">🍽️</div>
          <p className="text-sm">Chọn bữa ăn rồi bấm nút ở trên!</p>
        </div>
      )}
    </div>
  );
}
