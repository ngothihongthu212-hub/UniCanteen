import React, { useState } from 'react';
import {
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Star,
  ChevronRight,
  RotateCcw,
  Ban
} from 'lucide-react';
import { useCanteen } from '../../context/CanteenContext';
import { Order, OrderStatus } from '../../types';

export const OrdersModal: React.FC = () => {
  const {
    orders,
    currentUser,
    activeModal,
    setActiveModal,
    cancelOrder,
    setSelectedFoodDetail
  } = useCanteen();

  const [filterTab, setFilterTab] = useState<'active' | 'all'>('active');
  const [selectedOrderForReview, setSelectedOrderForReview] = useState<Order | null>(null);
  const [ratingStars, setRatingStars] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const { addReview } = useCanteen();

  if (activeModal !== 'orders') return null;

  // Filter orders for this student
  const studentOrders = orders.filter(o => o.studentId === currentUser.id);

  const displayedOrders = filterTab === 'active'
    ? studentOrders.filter(o => o.status === 'pending' || o.status === 'cooking' || o.status === 'ready')
    : studentOrders;

  const handleCancel = (order: Order) => {
    if (confirm(`Bạn có chắc chắn muốn hủy đơn ${order.orderCode}? Tiền cọc sẽ được hoàn lại 100% vào Ví CanteenPay.`)) {
      cancelOrder(order.id, 'Sinh viên tự hủy');
    }
  };

  const handleOpenReview = (order: Order) => {
    setSelectedOrderForReview(order);
    setRatingStars(5);
    setReviewComment('Món ăn thơm ngon, nóng hổi, quầy phục vụ rất nhanh nhẹn và nhiệt tình!');
  };

  const handleSubmitReview = () => {
    if (!selectedOrderForReview) return;
    const foodId = selectedOrderForReview.items[0]?.foodId;
    if (foodId) {
      addReview(foodId, selectedOrderForReview.id, ratingStars, reviewComment);
    }
    setSelectedOrderForReview(null);
  };

  const statusConfigs: Record<OrderStatus, { label: string; color: string; step: number; desc: string }> = {
    pending: {
      label: 'Chờ nhà bếp nhận đơn',
      color: 'bg-amber-100 text-amber-800 border-amber-300',
      step: 1,
      desc: 'Đơn đã chuyển đến màn hình bếp của quầy',
    },
    cooking: {
      label: 'Đang nấu & Chuẩn bị',
      color: 'bg-orange-100 text-orange-800 border-orange-300',
      step: 2,
      desc: 'Bếp đang chế biến món ăn nóng hổi',
    },
    ready: {
      label: 'Món đã sẵn sàng! Mời lấy',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300 animate-pulse',
      step: 3,
      desc: 'Hãy đến quầy và xuất trình Mã lấy món',
    },
    completed: {
      label: 'Đã nhận món thành công',
      color: 'bg-stone-100 text-stone-700 border-stone-300',
      step: 4,
      desc: 'Chúc bạn có bữa ăn ngon miệng!',
    },
    cancelled: {
      label: 'Đã hủy & Đã hoàn tiền',
      color: 'bg-rose-100 text-rose-800 border-rose-300',
      step: 0,
      desc: 'Đã hoàn 100% tiền vào ví sinh viên',
    },
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div>
            <h2 className="text-lg sm:text-xl font-black font-serif text-stone-900">
              Đơn hàng & Mã lấy món Canteen
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Theo dõi tiến độ chế biến và xuất trình mã 4 chữ số khi nhận đồ ăn
            </p>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Filters */}
        <div className="px-5 py-2.5 bg-stone-50 border-b border-stone-200 flex gap-2 text-xs">
          <button
            onClick={() => setFilterTab('active')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              filterTab === 'active'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200/60'
            }`}
          >
            Đang xử lý ({studentOrders.filter(o => o.status === 'pending' || o.status === 'cooking' || o.status === 'ready').length})
          </button>
          <button
            onClick={() => setFilterTab('all')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              filterTab === 'all'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200/60'
            }`}
          >
            Tất cả lịch sử ({studentOrders.length})
          </button>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {displayedOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-2">📋</div>
              <h3 className="font-bold text-stone-800 text-sm">Không có đơn hàng nào</h3>
              <p className="text-xs text-stone-500 mt-1">
                {filterTab === 'active' ? 'Hiện tại không có đơn nào đang nấu hoặc chờ lấy.' : 'Bạn chưa đặt món nào.'}
              </p>
            </div>
          ) : (
            displayedOrders.map((order) => {
              const cfg = statusConfigs[order.status];
              const isCancellable = order.status === 'pending';

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:border-amber-300 transition-all p-4 sm:p-5 space-y-4"
                >
                  {/* Order Top Line */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-stone-900 text-sm sm:text-base">
                            {order.orderCode}
                          </span>
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${cfg.color}`}>
                            {cfg.label}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5 font-medium">
                          {order.vendorName}
                        </p>
                      </div>
                    </div>

                    {/* Pick-up Code Highlight Box */}
                    {order.status !== 'cancelled' && (
                      <div className="bg-amber-500/10 border border-amber-300 rounded-xl px-4 py-1.5 flex items-center justify-between sm:justify-end gap-3">
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] uppercase font-bold text-amber-800 block">
                            Mã lấy món
                          </span>
                          <span className="text-xs text-stone-600">Xuất trình tại quầy</span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-black font-mono tracking-wider text-amber-600">
                          #{order.pickupCode}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Progress Stepper */}
                  {order.status !== 'cancelled' && (
                    <div className="py-1">
                      <div className="grid grid-cols-4 gap-2 text-center">
                        {[
                          { step: 1, title: 'Đã gửi' },
                          { step: 2, title: 'Đang nấu' },
                          { step: 3, title: 'Sẵn sàng' },
                          { step: 4, title: 'Đã nhận' },
                        ].map((s) => {
                          const isDone = cfg.step >= s.step;
                          const isCurrent = cfg.step === s.step;
                          return (
                            <div key={s.step} className="flex flex-col items-center">
                              <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                  isDone
                                    ? 'bg-amber-600 text-white shadow-xs'
                                    : 'bg-stone-100 text-stone-400'
                                } ${isCurrent ? 'ring-4 ring-amber-500/20 font-black' : ''}`}
                              >
                                {isDone ? '✓' : s.step}
                              </div>
                              <span
                                className={`text-[11px] mt-1 font-semibold ${
                                  isDone ? 'text-amber-800' : 'text-stone-400'
                                }`}
                              >
                                {s.title}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-center text-xs text-stone-500 mt-2 italic">
                        {cfg.desc}
                      </p>
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="space-y-2 bg-stone-50/70 p-3 rounded-xl border border-stone-100 text-xs">
                    <div className="flex items-center justify-between text-stone-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        Khung giờ nhận: <strong className="text-stone-800">{order.pickupTimeSlot}</strong>
                      </span>
                      <span>Hôm nay ({order.pickupDate})</span>
                    </div>

                    {order.items.map((it, i) => (
                      <div key={i} className="flex justify-between items-center py-1 border-t border-stone-200/50">
                        <span className="font-semibold text-stone-800">
                          {it.quantity}x {it.foodName} {it.selectedOptions ? `(${it.selectedOptions})` : ''}
                        </span>
                        <span className="font-mono font-bold text-stone-700">
                          {(it.price * it.quantity).toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                    ))}

                    {order.notes && (
                      <p className="text-[11px] text-stone-500 pt-1 border-t border-stone-200/50">
                        Ghi chú: {order.notes}
                      </p>
                    )}
                  </div>

                  {/* Footer Line: Total & Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs text-stone-500">Tổng thanh toán Ví CanteenPay:</span>
                      <span className="font-bold font-mono text-base text-amber-600">
                        {order.totalAmount.toLocaleString('vi-VN')}đ
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Cancel Button */}
                      {isCancellable && (
                        <button
                          onClick={() => handleCancel(order)}
                          className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors flex items-center gap-1"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          <span>Hủy đơn & Hoàn tiền</span>
                        </button>
                      )}

                      {/* Review Button */}
                      {order.status === 'completed' && !order.isReviewed && (
                        <button
                          onClick={() => handleOpenReview(order)}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1"
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>Đánh giá món ăn</span>
                        </button>
                      )}

                      {order.isReviewed && (
                        <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Đã gửi đánh giá
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Review Modal Sub-dialog */}
        {selectedOrderForReview && (
          <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-5 w-full max-w-md shadow-2xl border border-stone-200 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-stone-900 text-base">Đánh giá món ăn</h3>
                <button
                  onClick={() => setSelectedOrderForReview(null)}
                  className="text-stone-400 hover:text-stone-600 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-stone-500">
                Bạn thấy món <strong>{selectedOrderForReview.items[0]?.foodName}</strong> tại {selectedOrderForReview.vendorName} thế nào?
              </p>

              {/* Stars */}
              <div className="flex items-center justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRatingStars(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= ratingStars
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <textarea
                rows={3}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Nhận xét của bạn về hương vị, khẩu phần, độ nóng sốt..."
                className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedOrderForReview(null)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmitReview}
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs"
                >
                  Gửi đánh giá
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
