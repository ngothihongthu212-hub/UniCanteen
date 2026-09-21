import React, { useState } from 'react';
import {
  X,
  Clock,
  Flame,
  Star,
  ShieldAlert,
  Leaf,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  ChefHat
} from 'lucide-react';
import { useCanteen } from '../../context/CanteenContext';

export const FoodDetailModal: React.FC = () => {
  const {
    selectedFoodDetail,
    setSelectedFoodDetail,
    activeModal,
    setActiveModal,
    addToCart
  } = useCanteen();

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<{ [optionName: string]: string }>({});
  const [extraCost, setExtraCost] = useState<number>(0);
  const [note, setNote] = useState<string>('');

  if (activeModal !== 'detail' || !selectedFoodDetail) {
    return null;
  }

  const food = selectedFoodDetail;

  const handleOptionChange = (optionName: string, choiceLabel: string, price: number) => {
    const updatedOptions = { ...selectedOptions, [optionName]: choiceLabel };
    setSelectedOptions(updatedOptions);

    // Recalculate extra cost
    let calculatedExtra = 0;
    if (food.customOptions) {
      food.customOptions.forEach(opt => {
        const selectedChoiceLabel = updatedOptions[opt.name];
        if (selectedChoiceLabel) {
          const matched = opt.choices.find(c => c.label === selectedChoiceLabel);
          if (matched) calculatedExtra += matched.extraPrice;
        }
      });
    }
    setExtraCost(calculatedExtra);
  };

  const handleAddToCart = () => {
    addToCart(food, quantity, selectedOptions, extraCost, note.trim() || undefined);
    setActiveModal(null);
    setSelectedFoodDetail(null);
  };

  const unitPrice = food.price + extraCost;
  const totalPrice = unitPrice * quantity;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => {
            setActiveModal(null);
            setSelectedFoodDetail(null);
          }}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Image */}
          <div className="relative aspect-16/9 w-full bg-stone-100 overflow-hidden">
            <img
              src={food.imageUrl}
              alt={food.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-600 text-white">
                  {food.vendorName}
                </span>
                {food.isVegetarian && (
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-600 text-white flex items-center gap-1">
                    <Leaf className="w-3 h-3" /> Món Chay
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-serif tracking-tight">
                {food.name}
              </h2>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-center">
              <div>
                <span className="text-[11px] text-stone-500 block font-medium">Thời gian nấu</span>
                <div className="flex items-center justify-center gap-1 font-bold text-stone-800 text-sm mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>~{food.prepTimeMinutes} phút</span>
                </div>
              </div>
              <div className="border-x border-stone-200">
                <span className="text-[11px] text-stone-500 block font-medium">Năng lượng</span>
                <div className="flex items-center justify-center gap-1 font-bold text-stone-800 text-sm mt-0.5">
                  <Flame className="w-3.5 h-3.5 text-orange-600" />
                  <span>{food.calories} kcal</span>
                </div>
              </div>
              <div>
                <span className="text-[11px] text-stone-500 block font-medium">Đánh giá</span>
                <div className="flex items-center justify-center gap-1 font-bold text-stone-800 text-sm mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{food.rating} ({food.ratingCount})</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                Mô tả & Hương vị
              </h4>
              <p className="text-sm text-stone-700 leading-relaxed">
                {food.description}
              </p>
            </div>

            {/* Ingredients & Allergens */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <ChefHat className="w-4 h-4 text-amber-700" />
                <span>Thành phần chính thực phẩm:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {food.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white text-stone-700 border border-amber-200/60"
                  >
                    {ing}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-amber-800 flex items-center gap-1.5 pt-1">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>Cam kết nguồn gốc sạch, không phẩm màu hóa học, chế biến trong ngày.</span>
              </p>
            </div>

            {/* Custom Options (if available) */}
            {food.customOptions && food.customOptions.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Tùy chọn & Topping đi kèm
                </h4>
                {food.customOptions.map((opt, optIdx) => (
                  <div key={optIdx} className="space-y-2">
                    <label className="text-xs font-bold text-stone-800 block">
                      {opt.name}:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {opt.choices.map((choice, cIdx) => {
                        const isSelected = selectedOptions[opt.name] === choice.label;
                        return (
                          <button
                            key={cIdx}
                            type="button"
                            onClick={() => handleOptionChange(opt.name, choice.label, choice.extraPrice)}
                            className={`flex items-center justify-between p-3 rounded-xl text-xs font-semibold border transition-all text-left ${
                              isSelected
                                ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20'
                                : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                            }`}
                          >
                            <span>{choice.label}</span>
                            {choice.extraPrice > 0 && (
                              <span className="text-amber-700 font-mono font-bold">
                                +{choice.extraPrice.toLocaleString('vi-VN')}đ
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Note for Kitchen */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                Ghi chú thêm cho Nhà bếp / Quầy (Không bắt buộc)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="VD: Không lấy hành, xin thêm ớt, đóng hộp mang về..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-stone-600">Số lượng:</span>
            <div className="flex items-center bg-white border border-stone-200 rounded-xl p-1 shadow-2xs">
              <button
                disabled={quantity <= 1}
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center font-bold text-sm font-mono text-stone-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-right">
              <span className="text-[11px] text-stone-500 block">Tổng tiền</span>
              <span className="text-lg sm:text-xl font-black font-mono text-amber-600">
                {totalPrice.toLocaleString('vi-VN')}đ
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!food.isAvailable}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all shadow-md active:scale-95 ${
                food.isAvailable
                  ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                  : 'bg-stone-400 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Thêm vào giỏ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
