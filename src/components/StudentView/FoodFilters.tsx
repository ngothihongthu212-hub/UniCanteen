import React from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Leaf,
  Flame,
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';
import { useCanteen } from '../../context/CanteenContext';
import { FoodCategory } from '../../types';

export const FoodFilters: React.FC = () => {
  const { filters, setFilters, resetFilters, vendors } = useCanteen();

  const categories: { key: FoodCategory | 'all'; label: string; icon: string }[] = [
    { key: 'all', label: 'Tất cả món', icon: '🍽️' },
    { key: 'com', label: 'Cơm phần', icon: '🍚' },
    { key: 'bun_pho', label: 'Bún & Phở', icon: '🍜' },
    { key: 'do_uong', label: 'Đồ uống & Trà', icon: '🧋' },
    { key: 'an_vat', label: 'Ăn vặt & Bánh mì', icon: '🥪' },
    { key: 'mon_chay', label: 'Món chay thanh tịnh', icon: '🌱' },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs mb-8 space-y-4">
      {/* Top row: Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="Tìm món ăn (vd: cơm sườn, phở bò, trà sữa, pate...)"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-stone-400"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Vendor Dropdown */}
        <div className="sm:w-64">
          <select
            value={filters.vendorId}
            onChange={(e) => setFilters(prev => ({ ...prev, vendorId: e.target.value }))}
            className="w-full px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-medium text-stone-700 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          >
            <option value="all">🏪 Tất cả 4 quầy canteen</option>
            {vendors.map(v => (
              <option key={v.id} value={v.id}>
                {v.stallNumber} — {v.name.split('—')[1] || v.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort dropdown */}
        <div className="sm:w-56">
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="w-full px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-medium text-stone-700 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            >
              <option value="popular">🔥 Được đặt nhiều nhất</option>
              <option value="price_asc">💵 Giá tăng dần (Rẻ nhất)</option>
              <option value="price_desc">💎 Giá giảm dần</option>
              <option value="rating">⭐ Đánh giá cao nhất</option>
              <option value="prep_time">⚡ Nấu nhanh nhất</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(c => {
          const isActive = filters.category === c.key;
          return (
            <button
              key={c.key}
              onClick={() => setFilters(prev => ({ ...prev, category: c.key }))}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Quick Diet & Health toggles and Price Slider */}
      <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Vegetarian toggle */}
          <button
            onClick={() => setFilters(prev => ({ ...prev, isVegetarianOnly: !prev.isVegetarianOnly }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              filters.isVegetarianOnly
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ăn chay 🌱</span>
          </button>

          {/* Healthy / Low calo toggle */}
          <button
            onClick={() => setFilters(prev => ({ ...prev, isHealthyOnly: !prev.isHealthyOnly }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              filters.isHealthyOnly
                ? 'bg-orange-50 text-orange-700 border-orange-300 font-semibold'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-600" />
            <span>Ít calo (&lt; 500 kcal)</span>
          </button>

          {/* Price Range Filter */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200">
            <span className="text-stone-500 font-medium">Tối đa:</span>
            <input
              type="range"
              min={15000}
              max={60000}
              step={5000}
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-20 sm:w-28 accent-amber-600"
            />
            <span className="font-bold font-mono text-stone-800">
              {filters.maxPrice.toLocaleString('vi-VN')}đ
            </span>
          </div>
        </div>

        {/* Reset Filter Button */}
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-stone-500 hover:text-stone-800 font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Đặt lại bộ lọc</span>
        </button>
      </div>
    </div>
  );
};
