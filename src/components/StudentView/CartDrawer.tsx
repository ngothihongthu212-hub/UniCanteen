import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Clock,
  Wallet,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  QrCode
} from 'lucide-react';
import { useCanteen } from '../../context/CanteenContext';
import { TIME_SLOTS } from '../../data/initialData';
import { Order } from '../../types';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    activeModal,
    setActiveModal,
    currentUser,
    createOrder,
    topUpWallet
  } = useCanteen();

  const [selectedSlot, setSelectedSlot] = useState<string>(TIME_SLOTS[5]); // '11:30 - 11:45'
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (activeModal !== 'cart') return null;

  const totalAmount = cart.reduce((acc, item) => {
    return acc + (item.food.price + item.extraCost) * item.quantity;
  }, 0);

  const isBalanceSufficient = currentUser.walletBalance >= totalAmount;

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);
    const result = await createOrder(selectedSlot, orderNotes);
    setIsSubmitting(false);

    if (result.success && result.order) {
      setCompletedOrder(result.order);
    }
  };

  const handleQuickTopUp = () => {
    const need = totalAmount - currentUser.walletBalance;
    const topUpAmount = Math.max(50000, Math.ceil(need / 50000) * 50000);
    topUpWallet(topUpAmount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-stone-200 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div>
            <h2 className="text-lg font-black font-serif text-stone-900">
              Giỏ hàng của bạn
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {cart.length > 0 ? `${cart.reduce((a, b) => a + b.quantity, 0)} món đang chờ đặt trước` : 'Chưa có món nào trong giỏ'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {cart.length > 0 && !completedOrder && (
              <button
                onClick={clearCart}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors"
              >
                Xóa tất cả
              </button>
            )}
            <button
              onClick={() => {
                setActiveModal(null);
                setCompletedOrder(null);
              }}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Screen if just placed order */}
        {completedOrder ? (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center text-center justify-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/10 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Thanh toán thành công!
              </span>
              <h3 className="text-xl font-black font-serif text-stone-900 mt-3">
                Đơn hàng {completedOrder.orderCode}
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Nhà bếp đã nhận được đơn và sẽ chuẩn bị theo khung giờ bạn đã chọn.
              </p>
            </div>

            {/* Big Pick-up Code Card */}
            <div className="w-full bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl p-5 text-center shadow-xs">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
                MÃ LẤY MÓN TẠI QUẦY
              </span>
              <div className="text-4xl sm:text-5xl font-black font-mono tracking-widest text-amber-600 my-2">
                #{completedOrder.pickupCode}
              </div>
              <div className="flex items-center justify-center gap-1 text-xs text-amber-700 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Giờ nhận: {completedOrder.pickupTimeSlot}</span>
              </div>
              <p className="text-[11px] text-stone-500 mt-2">
                Tại: <strong className="text-stone-800">{completedOrder.vendorName}</strong>
              </p>
            </div>

            <div className="w-full pt-4 space-y-2">
              <button
                onClick={() => {
                  setCompletedOrder(null);
                  setActiveModal('orders');
                }}
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Xem trạng thái đơn hàng thời gian thực</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setCompletedOrder(null);
                  setActiveModal(null);
                }}
                className="w-full py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold text-xs transition-colors"
              >
                Tiếp tục xem thực đơn
              </button>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* Empty Cart State */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-2xl bg-stone-100 flex items-center justify-center text-4xl mb-4">
              🍱
            </div>
            <h3 className="font-bold text-stone-800 text-base">Giỏ hàng của bạn đang trống</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-xs">
              Hãy chọn các món cơm, bún phở hoặc trà sữa thơm ngon từ thực đơn để đặt trước nhé!
            </p>
            <button
              onClick={() => setActiveModal(null)}
              className="mt-5 px-5 py-2.5 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition-colors shadow-xs"
            >
              Khám phá thực đơn hôm nay
            </button>
          </div>
        ) : (
          /* Cart Items & Checkout Form */
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Items List */}
              <div className="space-y-3">
                {cart.map((item, index) => {
                  const itemTotal = (item.food.price + item.extraCost) * item.quantity;
                  return (
                    <div
                      key={index}
                      className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex gap-3 relative group"
                    >
                      <img
                        src={item.food.imageUrl}
                        alt={item.food.name}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                            {item.food.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                            title="Xóa món"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[11px] text-amber-700 font-medium truncate">
                          {item.food.vendorName}
                        </p>

                        {/* Options summary */}
                        {Object.keys(item.selectedOptions).length > 0 && (
                          <p className="text-[11px] text-stone-500 truncate mt-0.5">
                            {Object.values(item.selectedOptions).join(', ')}
                          </p>
                        )}

                        {item.note && (
                          <p className="text-[11px] text-stone-500 italic truncate">
                            Ghi chú: {item.note}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-2 pt-1">
                          <span className="font-bold font-mono text-xs text-amber-600">
                            {itemTotal.toLocaleString('vi-VN')}đ
                          </span>

                          <div className="flex items-center bg-white border border-stone-200 rounded-lg p-0.5">
                            <button
                              onClick={() => updateCartQuantity(index, item.quantity - 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-stone-500 hover:bg-stone-100"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center font-bold text-xs font-mono">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(index, item.quantity + 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-stone-500 hover:bg-stone-100"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pickup Time Slot Section */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Chọn khung giờ nhận món tại quầy:</span>
                  </label>
                  <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                    Hôm nay
                  </span>
                </div>

                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-amber-300 text-xs font-bold text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                >
                  {TIME_SLOTS.map((slot, i) => (
                    <option key={i} value={slot}>
                      ⏰ {slot}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-amber-800 leading-snug">
                  * Nhà bếp sẽ nấu và chuẩn bị món nóng hổi đúng khung giờ bạn đã chọn để lấy ngay không cần chờ.
                </p>
              </div>

              {/* Order Note */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Ghi chú tổng thể cho quầy (nếu có):
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="VD: Lấy đồ lúc chuông reo hết ca học..."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              {/* Wallet Balance Verification */}
              <div className="p-4 rounded-2xl border bg-stone-50 border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 flex items-center gap-1">
                    <Wallet className="w-3.5 h-3.5 text-stone-600" />
                    Số dư Ví CanteenPay hiện tại:
                  </span>
                  <span className="font-mono font-bold text-stone-900">
                    {currentUser.walletBalance.toLocaleString('vi-VN')}đ
                  </span>
                </div>

                {!isBalanceSufficient && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold">
                      <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      <span>Số dư ví không đủ để thanh toán!</span>
                    </div>
                    <p className="text-[11px] text-rose-700">
                      Cần thêm: <strong className="font-mono">{(totalAmount - currentUser.walletBalance).toLocaleString('vi-VN')}đ</strong>
                    </p>
                    <button
                      onClick={handleQuickTopUp}
                      className="w-full py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors shadow-2xs"
                    >
                      + Nạp nhanh ví demo ngay
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Summary & Checkout Button */}
            <div className="p-5 border-t border-stone-200 bg-stone-50/90 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Tiền món ăn:</span>
                  <span className="font-mono font-medium text-stone-800">
                    {totalAmount.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Phí phục vụ & khay hộp:</span>
                  <span className="text-emerald-600 font-semibold">0đ (Miễn phí)</span>
                </div>
                <div className="flex justify-between text-sm font-black text-stone-900 pt-1.5 border-t border-stone-200">
                  <span>Tổng tiền trừ ví:</span>
                  <span className="font-mono text-base text-amber-600">
                    {totalAmount.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              <button
                disabled={!isBalanceSufficient || isSubmitting}
                onClick={handleCheckout}
                className={`w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all shadow-md flex items-center justify-center gap-2 ${
                  isBalanceSufficient && !isSubmitting
                    ? 'bg-amber-600 hover:bg-amber-700 active:scale-98 shadow-amber-600/20'
                    : 'bg-stone-300 cursor-not-allowed text-stone-500'
                }`}
              >
                {isSubmitting ? (
                  <span>Đang tạo đơn & trừ ví...</span>
                ) : (
                  <>
                    <span>Xác nhận Đặt trước & Trừ ví</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
