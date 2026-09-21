import React from 'react';
import { Clock, Flame, Star, Plus, Eye, Ban } from 'lucide-react';
import { FoodItem } from '../../types';
import { useCanteen } from '../../context/CanteenContext';

interface FoodCardProps {
  food: FoodItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const { addToCart, setSelectedFoodDetail, setActiveModal } = useCanteen();

  const handleOpenDetail = () => {
    setSelectedFoodDetail(food);
    setActiveModal('detail');
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (food.customOptions && food.customOptions.length > 0) {
      // If food has customizable options, open modal for choice
      handleOpenDetail();
    } else {
      addToCart(food, 1);
    }
  };

  return (
    <div
      onClick={handleOpenDetail}
      className={`group bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md hover:border-amber-400/60 transition-all duration-200 overflow-hidden flex flex-col cursor-pointer ${
        !food.isAvailable ? 'opacity-70 grayscale-30' : ''
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        <img
          src={food.imageUrl}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
          {food.tags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/60 backdrop-blur-md text-white"
            >
              {tag}
            </span>
          ))}
          {food.isVegetarian && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600/90 backdrop-blur-md text-white">
              Chay 🌱
            </span>
          )}
        </div>

        {/* Unavailable overlay */}
        {!food.isAvailable && (
          <div className="absolute inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold shadow-md">
              <Ban className="w-3.5 h-3.5" />
              Tạm hết món
            </span>
          </div>
        )}

        {/* Prep time & Calo pill */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[11px] font-semibold text-stone-700 shadow-xs">
          <Clock className="w-3 h-3 text-amber-600" />
          <span>{food.prepTimeMinutes}p</span>
          <span className="text-stone-300">•</span>
          <Flame className="w-3 h-3 text-orange-500" />
          <span>{food.calories} kcal</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Vendor stall name */}
          <p className="text-[11px] font-semibold text-amber-700 uppercase tracking-wide truncate">
            {food.vendorName}
          </p>

          {/* Dish name */}
          <h3 className="font-bold text-stone-900 text-sm sm:text-base line-clamp-1 group-hover:text-amber-600 transition-colors mt-0.5">
            {food.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
            {food.description}
          </p>
        </div>

        {/* Footer: Rating and Price + CTA */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1 text-xs text-amber-500 mb-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-stone-800">{food.rating}</span>
              <span className="text-stone-400 text-[11px]">({food.ratingCount})</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black font-mono text-amber-600">
                {food.price.toLocaleString('vi-VN')}đ
              </span>
              {food.originalPrice && (
                <span className="text-xs text-stone-400 line-through font-mono">
                  {food.originalPrice.toLocaleString('vi-VN')}đ
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleOpenDetail}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
              title="Xem chi tiết nguyên liệu & dinh dưỡng"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              disabled={!food.isAvailable}
              onClick={handleQuickAdd}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                food.isAvailable
                  ? 'bg-amber-600 hover:bg-amber-700 text-white active:scale-95'
                  : 'bg-stone-100 text-stone-400 cursor-not-allowed'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{food.customOptions && food.customOptions.length > 0 ? 'Tùy chọn' : 'Đặt ngay'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
