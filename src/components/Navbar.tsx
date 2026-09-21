import React from 'react';
import {
  UtensilsCrossed,
  Wallet,
  ShoppingBag,
  Clock,
  FileText,
  RotateCcw,
  UserCheck,
  ChevronDown
} from 'lucide-react';
import { useCanteen } from '../context/CanteenContext';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    role,
    switchRole,
    cart,
    orders,
    setActiveModal,
    resetAllData
  } = useCanteen();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Active orders for this user that are not completed or cancelled
  const studentActiveOrders = orders.filter(
    o => o.studentId === currentUser.id && (o.status === 'pending' || o.status === 'cooking' || o.status === 'ready')
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-stone-900 font-serif">
                  Uni<span className="text-amber-600">Canteen</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  Campus Hub
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block">
                Hệ thống Đặt món & Quản lý Canteen Trường Đại học
              </p>
            </div>
          </div>

          {/* Center: Role Switcher */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              onClick={() => switchRole('student')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'student'
                  ? 'bg-white text-amber-700 shadow-xs border border-stone-200/60'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🎓</span>
              <span className="hidden sm:inline">Sinh viên</span>
            </button>
            <button
              onClick={() => switchRole('vendor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'vendor'
                  ? 'bg-white text-orange-700 shadow-xs border border-stone-200/60'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>👨‍🍳</span>
              <span className="hidden sm:inline">Nhà bếp (Quầy 01)</span>
            </button>
            <button
              onClick={() => switchRole('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'admin'
                  ? 'bg-white text-stone-900 shadow-xs border border-stone-200/60'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🛡️</span>
              <span className="hidden sm:inline">Ban Quản trị</span>
            </button>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* SRS Spec Button */}
            <button
              onClick={() => setActiveModal('spec')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200/80 transition-colors border border-stone-200"
              title="Xem Hồ sơ Dự án & Đặc tả chi tiết (Project Charter, Backlog, Use Cases, Test Plan)"
            >
              <FileText className="w-4 h-4 text-amber-600" />
              <span className="hidden md:inline">Hồ sơ Đặc tả (SRS)</span>
            </button>

            {/* Student Wallet Chip */}
            {role === 'student' && (
              <button
                onClick={() => setActiveModal('wallet')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/70 transition-colors text-emerald-800"
                title="Bấm để xem và nạp tiền Ví CanteenPay"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                  <Wallet className="w-3.5 h-3.5" />
                </div>
                <div className="text-left leading-tight hidden sm:block">
                  <span className="text-[10px] uppercase font-semibold text-emerald-600 block">Ví Canteen</span>
                  <span className="text-xs font-bold font-mono">
                    {currentUser.walletBalance.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </button>
            )}

            {/* Student Active Orders Tracker */}
            {role === 'student' && (
              <button
                onClick={() => setActiveModal('orders')}
                className="relative p-2.5 rounded-xl text-stone-700 bg-stone-100 hover:bg-stone-200/80 transition-colors border border-stone-200"
                title="Xem đơn hàng & Mã nhận món của bạn"
              >
                <Clock className="w-5 h-5 text-stone-700" />
                {studentActiveOrders.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white shadow-xs animate-pulse">
                    {studentActiveOrders.length}
                  </span>
                )}
              </button>
            )}

            {/* Cart Trigger */}
            {role === 'student' && (
              <button
                onClick={() => setActiveModal('cart')}
                className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-all shadow-md shadow-amber-600/20"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Giỏ hàng</span>
                {totalCartCount > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold bg-white text-amber-800 rounded-full shadow-xs">
                    {totalCartCount}
                  </span>
                )}
              </button>
            )}

            {/* Reset data */}
            <button
              onClick={resetAllData}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              title="Khôi phục dữ liệu mẫu ban đầu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
