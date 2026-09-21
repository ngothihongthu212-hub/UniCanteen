import React from 'react';
import { Sparkles, Clock, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { useCanteen } from '../../context/CanteenContext';

export const HeroBanner: React.FC = () => {
  const { setActiveModal, foods } = useCanteen();

  const availableCount = foods.filter(f => f.isAvailable && f.isApproved).length;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white shadow-xl shadow-amber-900/10 mb-8">
      {/* Decorative background patterns */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 rounded-full bg-black/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3 border border-white/25">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Thực đơn Canteen Trường Đại học hôm nay</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif tracking-tight leading-tight">
            Đặt món trước theo giờ nghỉ, <br className="hidden sm:inline" />
            <span className="text-amber-200">không lo chen lấn, không trễ tiết!</span>
          </h1>

          <p className="mt-2.5 text-sm sm:text-base text-amber-50 leading-relaxed">
            Chọn món từ 4 quầy ăn Canteen Bách Khoa, đặt trước khung giờ nhận (11:30 - 12:00), thanh toán qua ví sinh viên và chỉ cần đưa mã nhận đồ nóng hổi.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium text-amber-100">
            <div className="flex items-center gap-1.5 bg-black/15 px-3 py-1.5 rounded-lg border border-white/10">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>Tiết kiệm 70% thời gian xếp hàng</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/15 px-3 py-1.5 rounded-lg border border-white/10">
              <Zap className="w-4 h-4 text-amber-300" />
              <span>{availableCount} món ăn sẵn sàng phục vụ</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/15 px-3 py-1.5 rounded-lg border border-white/10">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Kiểm định ATVSTP định kỳ</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
          <button
            onClick={() => setActiveModal('spec')}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-stone-900 font-bold text-xs sm:text-sm hover:bg-amber-50 transition-all shadow-md active:scale-95"
          >
            <span>Xem Đồ Án & Đặc Tả (SRS)</span>
            <ArrowRight className="w-4 h-4 text-amber-600" />
          </button>
          <button
            onClick={() => setActiveModal('wallet')}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-black/25 hover:bg-black/35 text-white font-medium text-xs sm:text-sm border border-white/20 transition-all"
          >
            <span>Nạp Ví CanteenPay</span>
          </button>
        </div>
      </div>
    </div>
  );
};
