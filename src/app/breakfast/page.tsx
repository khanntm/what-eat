'use client';

import { useState, useEffect } from 'react';
import { suggestBreakfast } from '@/lib/suggest';
import { Dish } from '@/data/dishes';
import DishCard from '@/components/DishCard';

type BreakfastTab = 'home' | 'outside' | 'store';

const tabs: { key: BreakfastTab; icon: string; label: string }[] = [
  { key: 'home', icon: '🍳', label: 'Nấu nhanh' },
  { key: 'outside', icon: '🍜', label: 'Ăn ngoài' },
  { key: 'store', icon: '🏪', label: 'Tiện lợi' },
];

export default function BreakfastPage() {
  const [activeTab, setActiveTab] = useState<BreakfastTab>('home');
  const [data, setData] = useState<{ home: Dish[]; outside: Dish[]; store: Dish[] }>({
    home: [],
    outside: [],
    store: [],
  });
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const refresh = () => {
    setData(suggestBreakfast());
    setSelectedDish(null);
  };

  useEffect(() => {
    refresh();
  }, []);

  const currentDishes = data[activeTab];

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🌅</div>
        <h1 className="text-2xl font-bold text-gray-900">Ăn sáng gì?</h1>
        <p className="text-sm text-gray-500 mt-1">Chọn kiểu ăn sáng phù hợp với bạn</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setSelectedDish(null); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                : 'bg-white text-gray-600 border border-gray-100 hover:bg-orange-50'
            }`}
          >
            <span className="block text-lg">{tab.icon}</span>
            <span className="block text-xs mt-0.5">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab description */}
      <div className="mb-4 p-3 bg-orange-50 rounded-xl text-xs text-orange-700">
        {activeTab === 'home' && '⏱️ Các món nấu nhanh <= 15 phút, phù hợp buổi sáng bận rộn'}
        {activeTab === 'outside' && '🛵 Mua ngay gần nhà: phở, bún, hủ tiếu, xôi...'}
        {activeTab === 'store' && '🏬 Tiện lợi từ Ministop, GS25, Circle K...'}
      </div>

      {/* Selected dish */}
      {selectedDish && (
        <div className="mb-4 p-4 bg-green-50 rounded-2xl border border-green-200 animate-bounce-in">
          <div className="text-center">
            <div className="text-2xl mb-1">🎉 Đã chọn!</div>
            <p className="text-xl font-bold">{selectedDish.image} {selectedDish.name}</p>
            <p className="text-sm text-green-600 mt-1">{selectedDish.description}</p>
            <button onClick={() => setSelectedDish(null)} className="mt-2 text-sm text-green-600 underline">
              Chọn lại
            </button>
          </div>
        </div>
      )}

      {/* Dishes */}
      {!selectedDish && (
        <div className="space-y-3">
          {currentDishes.map((dish, i) => (
            <div key={dish.id} className={`animate-slide-up delay-${(i + 1) * 100}`}>
              <DishCard dish={dish} onSelect={(d) => setSelectedDish(d)} />
            </div>
          ))}
        </div>
      )}

      {/* Refresh */}
      <button
        onClick={refresh}
        className="w-full mt-4 py-3 text-sm text-orange-500 font-medium hover:text-orange-600"
      >
        🔄 Gợi ý khác
      </button>
    </div>
  );
}
