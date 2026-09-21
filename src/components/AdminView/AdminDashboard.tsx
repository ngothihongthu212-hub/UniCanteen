import React from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Store,
  Users,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Clock,
  Flame,
  Award
} from 'lucide-react';
import { useCanteen } from '../../context/CanteenContext';

export const AdminDashboard: React.FC = () => {
  const {
    foods,
    vendors,
    orders,
    approveFood,
    resetAllData,
    currentUser
  } = useCanteen();

  const totalRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((acc, o) => acc + o.totalAmount, 0);

  const completedOrdersCount = orders.filter(o => o.status === 'completed').length;
  const activeOrdersCount = orders.filter(o => o.status === 'pending' || o.status === 'cooking' || o.status === 'ready').length;

  const pendingApprovalFoods = foods.filter(f => !f.isApproved);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-stone-800 to-stone-900 text-white flex items-center justify-center shadow-lg shadow-stone-900/10">
            <ShieldCheck className="w-8 h-8 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black font-serif text-stone-900">
              Ban Quản Lý Canteen Đại Học
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Giám sát chất lượng ATVSTP, doanh thu tập trung và phê duyệt thực đơn 4 quầy
            </p>
          </div>
        </div>

        <button
          onClick={resetAllData}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors shadow-2xs"
        >
          <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
          <span>Khôi phục Dữ liệu Mẫu Ban Đầu</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
            <span>Tổng Doanh Thu Canteen</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-stone-900">
            {totalRevenue.toLocaleString('vi-VN')}đ
          </div>
          <p className="text-[11px] text-emerald-600 font-medium">
            +18.4% so với tuần trước
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
            <span>Suất Ăn Đã Phục Vụ</span>
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-stone-900">
            {completedOrdersCount} suất
          </div>
          <p className="text-[11px] text-stone-500 font-medium">
            Đang phục vụ: {activeOrdersCount} suất
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
            <span>Thời Gian Lấy Món TB</span>
            <Clock className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-stone-900">
            4.5 phút
          </div>
          <p className="text-[11px] text-emerald-600 font-medium">
            ↓ Giảm 72% so với xếp hàng tiền mặt
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
            <span>Quầy Hoạt Động</span>
            <Store className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-stone-900">
            4 / 4 quầy
          </div>
          <p className="text-[11px] text-emerald-600 font-medium">
            100% đạt chuẩn kiểm định
          </p>
        </div>
      </div>

      {/* Pending Approval Section */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <span>Hàng đợi Phê duyệt Món ăn mới</span>
              {pendingApprovalFoods.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-mono font-bold">
                  {pendingApprovalFoods.length} món
                </span>
              )}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Kiểm tra định lượng calo, thành phần dinh dưỡng và mức giá trước khi công khai lên thực đơn sinh viên.
            </p>
          </div>
        </div>

        {pendingApprovalFoods.length === 0 ? (
          <div className="p-6 rounded-2xl bg-stone-50 border border-dashed border-stone-200 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-1.5" />
            <p className="text-xs text-stone-600 font-semibold">Tất cả món ăn hiện tại đều đã được phê duyệt kiểm định!</p>
            <p className="text-[11px] text-stone-400">Khi các quầy gửi món mới, yêu cầu sẽ xuất hiện tại đây.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden">
            {pendingApprovalFoods.map(food => (
              <div key={food.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
                <div className="flex items-center gap-3">
                  <img
                    src={food.imageUrl}
                    alt={food.name}
                    className="w-14 h-14 rounded-xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-amber-700 uppercase">
                      {food.vendorName}
                    </span>
                    <h4 className="font-bold text-sm text-stone-900">{food.name}</h4>
                    <p className="text-xs text-stone-500">
                      Giá: <strong className="font-mono text-amber-600">{food.price.toLocaleString('vi-VN')}đ</strong> • {food.calories} kcal • Chế biến: {food.prepTimeMinutes}p
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => approveFood(food.id, false)}
                    className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Từ chối</span>
                  </button>
                  <button
                    onClick={() => approveFood(food.id, true)}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Phê duyệt xuất bản</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stalls / Vendors Overview */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-stone-900">
            Danh sách 4 Quầy Canteen trong Trường
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Thông tin giờ hoạt động, số lượt đánh giá và số điện thoại liên hệ từng chủ quầy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vendors.map(v => (
            <div
              key={v.id}
              className="p-4 rounded-2xl border border-stone-200/80 flex items-center gap-4 bg-stone-50/50"
            >
              <img
                src={v.imageUrl}
                alt={v.name}
                className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-stone-900 truncate">
                    {v.name}
                  </span>
                  <span className="text-xs font-bold text-amber-600 font-mono">
                    ★ {v.rating}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Chủ quầy: {v.ownerName} • {v.phone}
                </p>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-stone-600">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-stone-200 font-semibold">
                    {v.stallNumber}
                  </span>
                  <span>Mở cửa: {v.openTime} - {v.closeTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
