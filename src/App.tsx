import React from 'react';
import { useCanteen } from './context/CanteenContext';
import { Navbar } from './components/Navbar';
import { Toast } from './components/Toast';
import { HeroBanner } from './components/StudentView/HeroBanner';
import { FoodFilters } from './components/StudentView/FoodFilters';
import { FoodCard } from './components/StudentView/FoodCard';
import { FoodDetailModal } from './components/StudentView/FoodDetailModal';
import { CartDrawer } from './components/StudentView/CartDrawer';
import { OrdersModal } from './components/StudentView/OrdersModal';
import { WalletModal } from './components/StudentView/WalletModal';
import { VendorDashboard } from './components/VendorView/VendorDashboard';
import { AdminDashboard } from './components/AdminView/AdminDashboard';
import { SpecModal } from './components/SpecModal';
import { FoodItem } from './types';
import {
  FileText,
  UtensilsCrossed,
  Sparkles,
  Clock,
  ShieldCheck,
  Heart,
  ChevronRight,
  Store
} from 'lucide-react';

export default function App() {
  const {
    role,
    filteredFoods,
    vendors,
    filters,
    setFilters,
    setActiveModal,
    resetFilters
  } = useCanteen();

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      {/* Toast Notification Container */}
      <Toast />

      {/* Main Top Navigation */}
      <Navbar />

      {/* Primary Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* STUDENT ROLE VIEW */}
        {role === 'student' && (
          <>
            {/* Promotional & Feature Highlight Banner */}
            <HeroBanner />

            {/* Quick Stalls Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-amber-600" />
                  <span>Các Quầy Ăn Trong Trường</span>
                </h3>
                {filters.vendorId !== 'all' && (
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, vendorId: 'all' }))}
                    className="text-xs text-amber-600 hover:text-amber-700 font-semibold"
                  >
                    Xem tất cả quầy
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {vendors.map((vendor) => {
                  const isSelected = filters.vendorId === vendor.id;
                  return (
                    <button
                      key={vendor.id}
                      onClick={() =>
                        setFilters(prev => ({
                          ...prev,
                          vendorId: isSelected ? 'all' : vendor.id
                        }))
                      }
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
                          : 'bg-white border-stone-200/90 hover:border-stone-300 hover:bg-stone-50/50'
                      }`}
                    >
                      <img
                        src={vendor.imageUrl}
                        alt={vendor.name}
                        className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-amber-700 uppercase block">
                          {vendor.stallNumber}
                        </span>
                        <h4 className="text-xs font-bold text-stone-900 truncate">
                          {vendor.name}
                        </h4>
                        <span className="text-[11px] text-stone-500 flex items-center gap-1">
                          ★ {vendor.rating}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filters & Search Control */}
            <FoodFilters />

            {/* Food Grid Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black font-serif text-stone-900 flex items-center gap-2">
                    <span>Thực Đơn Đang Mở Bán</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">
                      {filteredFoods.length} món
                    </span>
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Đặt trước — Lấy món nóng hổi đúng giờ hẹn, không xếp hàng chờ đợi
                  </p>
                </div>
              </div>

              {/* Grid or Empty state */}
              {filteredFoods.length === 0 ? (
                <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4 shadow-xs">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-3xl">
                    🔍
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-800 text-base">
                      Không tìm thấy món ăn phù hợp
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                      Hãy thử nới lỏng mức giá, giảm bộ lọc calo hoặc đặt lại bộ lọc để xem toàn bộ thực đơn nhé!
                    </p>
                  </div>
                  <button
                    onClick={resetFilters}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    Đặt lại bộ lọc tìm kiếm
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredFoods.map((food: FoodItem) => (
                    <FoodCard key={food.id} food={food} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* VENDOR ROLE VIEW (KITCHEN DISPLAY SYSTEM) */}
        {role === 'vendor' && <VendorDashboard />}

        {/* ADMIN ROLE VIEW (CAMPUS CANTEEN OVERSIGHT) */}
        {role === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Interactive Modals & Drawers */}
      <FoodDetailModal />
      <CartDrawer />
      <OrdersModal />
      <WalletModal />
      <SpecModal />

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-stone-200/80 py-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center font-black">
              U
            </div>
            <div>
              <p className="font-bold text-stone-800">
                UniCanteen — Nền Tảng Đặt Món Trước & Quản Lý Canteen Đại Học
              </p>
              <p className="text-[11px] text-stone-400">
                Học phần Phát triển phần mềm & Quản lý dự án Agile/Scrum © 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveModal('spec')}
              className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1.5 py-1 px-3 rounded-lg bg-amber-50 border border-amber-200 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Xem Hồ Sơ Đặc Tả Đầy Đủ (SRS)</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
