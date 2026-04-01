'use client';

import { useState } from 'react';
import { suggestByIngredients } from '@/lib/suggest';
import { allIngredients, Dish } from '@/data/dishes';
import DishCard from '@/components/DishCard';

const popularIngredients = ['trứng', 'thịt bằm', 'cá', 'tôm', 'gà', 'bò', 'đậu hũ', 'rau muống', 'cà chua', 'khoai tây'];

export default function IngredientsPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [results, setResults] = useState<Dish[]>([]);
  const [searchText, setSearchText] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const toggle = (ing: string) => {
    setSelected((prev) =>
      prev.includes(ing) ? prev.filter((i) => i !== ing) : [...prev, ing]
    );
  };

  const handleSearch = () => {
    const allSelected = [...selected];
    if (searchText.trim()) {
      searchText.split(',').forEach((s) => {
        const trimmed = s.trim();
        if (trimmed && !allSelected.includes(trimmed)) {
          allSelected.push(trimmed);
        }
      });
    }
    setResults(suggestByIngredients(allSelected));
    setHasSearched(true);
  };

  const filteredIngredients = searchText.trim()
    ? allIngredients.filter((i) => i.includes(searchText.trim().toLowerCase()))
    : popularIngredients;

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🧊</div>
        <h1 className="text-2xl font-bold text-gray-900">Có gì nấu đó</h1>
        <p className="text-sm text-gray-500 mt-1">Nhập nguyên liệu bạn có, app gợi ý món</p>
      </div>

      {/* Search input */}
      <div className="relative mb-4">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Nhập nguyên liệu (VD: trứng, thịt)..."
          className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
        />
      </div>

      {/* Quick pick ingredients */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2 font-medium">
          {searchText.trim() ? 'Kết quả tìm kiếm' : 'Nguyên liệu phổ biến'}
        </p>
        <div className="flex flex-wrap gap-2">
          {filteredIngredients.map((ing) => (
            <button
              key={ing}
              onClick={() => toggle(ing)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selected.includes(ing)
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300'
              }`}
            >
              {selected.includes(ing) ? '✓ ' : ''}{ing}
            </button>
          ))}
        </div>
      </div>

      {/* Selected */}
      {selected.length > 0 && (
        <div className="mb-4 p-3 bg-orange-50 rounded-xl">
          <p className="text-xs text-orange-600 font-medium mb-1">Đã chọn ({selected.length})</p>
          <div className="flex flex-wrap gap-1">
            {selected.map((ing) => (
              <span
                key={ing}
                onClick={() => toggle(ing)}
                className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs cursor-pointer hover:bg-orange-200"
              >
                {ing} ✕
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Search button */}
      <button
        onClick={handleSearch}
        disabled={selected.length === 0 && !searchText.trim()}
        className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold text-sm shadow-md shadow-orange-200 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        🔍 Tìm món nấu được
      </button>

      {/* Results */}
      {hasSearched && (
        <div className="mt-6">
          {results.length > 0 ? (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Có thể nấu ({results.length} món)
              </h2>
              {results.map((dish, i) => (
                <div key={dish.id} className={`animate-slide-up delay-${Math.min((i + 1) * 100, 300)}`}>
                  <DishCard dish={dish} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-2">😅</div>
              <p className="text-sm">Không tìm thấy món phù hợp</p>
              <p className="text-xs mt-1">Thử thêm nguyên liệu khác!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
