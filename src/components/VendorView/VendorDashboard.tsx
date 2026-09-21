import React, { useState } from 'react';
import {
  ChefHat,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Flame,
  DollarSign,
  TrendingUp,
  Search,
  Check,
  Ban,
  Filter
} from 'lucide-react';
import { useCanteen } from '../../context/CanteenContext';
import { FoodCategory, Order, OrderStatus } from '../../types';

export const VendorDashboard: React.FC = () => {
  const {
    foods,
    orders,
    vendors,
    updateOrderStatus,
    toggleFoodAvailability,
    addNewFood,
    showToast
  } = useCanteen();

  // Primary vendor for this screen: vendor-1 (Quầy 01)
  const currentVendor = vendors[0];

  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'stats'>('orders');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'pending' | 'cooking' | 'ready' | 'completed'>('all');
  const [quickCodeInput, setQuickCodeInput] = useState<string>('');

  // Add Dish Modal state
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newDishName, setNewDishName] = useState<string>('');
  const [newDishCategory, setNewDishCategory] = useState<FoodCategory>('com');
  const [newDishPrice, setNewDishPrice] = useState<number>(30000);
  const [newDishCalories, setNewDishCalories] = useState<number>(550);
  const [newDishPrepTime, setNewDishPrepTime] = useState<number>(5);
  const [newDishDesc, setNewDishDesc] = useState<string>('');
  const [newDishIngredients, setNewDishIngredients] = useState<string>('Thịt, Gạo dẻo, Rau củ tươi');
  const [newDishImageUrl, setNewDishImageUrl] = useState<string>('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80');

  // Vendor's orders
  const vendorOrders = orders.filter(o => o.vendorId === currentVendor.id || !o.vendorId);
  const vendorFoods = foods.filter(f => f.vendorId === currentVendor.id);

  const displayedOrders = orderStatusFilter === 'all'
    ? vendorOrders
    : vendorOrders.filter(o => o.status === orderStatusFilter);

  // Statistics
  const completedOrders = vendorOrders.filter(o => o.status === 'completed');
  const totalVendorRevenue = completedOrders.reduce((acc, o) => acc + o.totalAmount, 0);
  const activeOrdersCount = vendorOrders.filter(o => o.status === 'pending' || o.status === 'cooking' || o.status === 'ready').length;

  const handleQuickVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickCodeInput.trim()) return;

    const matched = vendorOrders.find(
      o => o.pickupCode === quickCodeInput.trim() && (o.status === 'ready' || o.status === 'cooking' || o.status === 'pending')
    );

    if (matched) {
      updateOrderStatus(matched.id, 'completed');
      showToast(`Đối soát thành công! Đã giao đơn ${matched.orderCode} (#${matched.pickupCode}) cho sinh viên.`, 'success');
      setQuickCodeInput('');
    } else {
      showToast(`Không tìm thấy đơn hàng đang chờ với mã #${quickCodeInput}`, 'error');
    }
  };

  const handleCreateNewDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDishName.trim()) return;

    addNewFood({
      vendorId: currentVendor.id,
      vendorName: currentVendor.name,
      name: newDishName,
      category: newDishCategory,
      price: Number(newDishPrice),
      imageUrl: newDishImageUrl,
      description: newDishDesc || 'Món ăn mới chuẩn vị cơm nhà, phục vụ sinh viên.',
      ingredients: newDishIngredients.split(',').map(s => s.trim()),
      calories: Number(newDishCalories),
      prepTimeMinutes: Number(newDishPrepTime),
      isAvailable: true,
      isApproved: true,
      tags: ['Món mới', 'Quầy 01'],
    });

    setShowAddModal(false);
    setNewDishName('');
    setNewDishDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Stall Profile & KDS Mode */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
            <ChefHat className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black font-serif text-stone-900">
                {currentVendor.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                Đang mở bán ({currentVendor.openTime} - {currentVendor.closeTime})
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Chủ quầy: <strong>{currentVendor.ownerName}</strong> • Hotline: {currentVendor.phone}
            </p>
          </div>
        </div>

        {/* Quick Stats Pills */}
        <div className="flex flex-wrap items-center gap-3 text-xs w-full md:w-auto">
          <div className="flex-1 md:flex-none p-3 rounded-2xl bg-amber-50 border border-amber-200/70 text-center min-w-[120px]">
            <span className="text-[11px] text-amber-700 block font-semibold">Đơn đang phục vụ</span>
            <span className="text-xl font-black font-mono text-amber-900">
              {activeOrdersCount}
            </span>
          </div>

          <div className="flex-1 md:flex-none p-3 rounded-2xl bg-emerald-50 border border-emerald-200/70 text-center min-w-[140px]">
            <span className="text-[11px] text-emerald-700 block font-semibold">Doanh thu hôm nay</span>
            <span className="text-xl font-black font-mono text-emerald-900">
              {totalVendorRevenue.toLocaleString('vi-VN')}đ
            </span>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'orders'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            🛎️ Màn hình Bếp (KDS) & Đơn hàng ({vendorOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'menu'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            📋 Quản lý Thực đơn quầy ({vendorFoods.length} món)
          </button>
        </div>

        {/* Quick Pickup Code Input Box */}
        {activeTab === 'orders' && (
          <form onSubmit={handleQuickVerifyCode} className="hidden sm:flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                maxLength={4}
                value={quickCodeInput}
                onChange={(e) => setQuickCodeInput(e.target.value)}
                placeholder="Nhập 4 số mã lấy món (VD: 6824)"
                className="pl-3 pr-8 py-2 rounded-xl border border-stone-200 text-xs font-mono font-bold w-52 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs">
                ↵
              </span>
            </div>
            <button
              type="submit"
              className="px-3 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors"
            >
              Giao món
            </button>
          </form>
        )}
      </div>

      {/* TAB 1: KITCHEN DISPLAY SYSTEM (ORDERS) */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {/* Status Subfilters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-stone-400 font-medium">Lọc theo trạng thái:</span>
            {[
              { key: 'all', label: 'Tất cả' },
              { key: 'pending', label: 'Chờ nhận đơn ⏳' },
              { key: 'cooking', label: 'Đang nấu 🍳' },
              { key: 'ready', label: 'Sẵn sàng lấy 🔔' },
              { key: 'completed', label: 'Đã hoàn thành ✅' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setOrderStatusFilter(tab.key as any)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  orderStatusFilter === tab.key
                    ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Orders Grid */}
          {displayedOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
              <div className="text-4xl mb-2">🍳</div>
              <h3 className="font-bold text-stone-800 text-base">Hiện không có đơn hàng nào</h3>
              <p className="text-xs text-stone-500 mt-1">
                Các đơn đặt trước của sinh viên sẽ tự động hiển thị tại đây theo khung giờ.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedOrders.map(order => {
                return (
                  <div
                    key={order.id}
                    className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between space-y-4 transition-all ${
                      order.status === 'ready'
                        ? 'border-emerald-300 ring-2 ring-emerald-500/10'
                        : order.status === 'cooking'
                        ? 'border-orange-300'
                        : order.status === 'pending'
                        ? 'border-amber-300'
                        : 'border-stone-200 opacity-80'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-stone-900 text-sm">
                            {order.orderCode}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              order.status === 'pending'
                                ? 'bg-amber-100 text-amber-800'
                                : order.status === 'cooking'
                                ? 'bg-orange-100 text-orange-800'
                                : order.status === 'ready'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-stone-100 text-stone-700'
                            }`}
                          >
                            {order.status === 'pending' && 'Chờ nhận đơn'}
                            {order.status === 'cooking' && 'Đang nấu'}
                            {order.status === 'ready' && 'Sẵn sàng lấy'}
                            {order.status === 'completed' && 'Đã hoàn thành'}
                            {order.status === 'cancelled' && 'Đã hủy'}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">
                          SV: <strong>{order.studentName}</strong> • {order.studentPhone}
                        </p>
                      </div>

                      {/* Big Pickup Code */}
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-stone-400 block">
                          MÃ LẤY
                        </span>
                        <span className="text-2xl font-black font-mono text-amber-600">
                          #{order.pickupCode}
                        </span>
                      </div>
                    </div>

                    {/* Time slot alert */}
                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-stone-500 flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        Khung giờ nhận:
                      </span>
                      <span className="font-bold text-amber-900">
                        {order.pickupTimeSlot}
                      </span>
                    </div>

                    {/* Items List */}
                    <div className="space-y-1.5 text-xs flex-1">
                      {order.items.map((it, i) => (
                        <div key={i} className="flex justify-between items-center py-1">
                          <span className="font-semibold text-stone-900">
                            {it.quantity}x {it.foodName}
                            {it.selectedOptions && (
                              <span className="text-stone-500 font-normal block text-[11px]">
                                ({it.selectedOptions})
                              </span>
                            )}
                          </span>
                          <span className="font-mono font-bold text-stone-700">
                            {(it.price * it.quantity).toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      ))}

                      {order.notes && (
                        <div className="p-2 rounded-lg bg-amber-50 text-amber-900 text-[11px] font-medium border border-amber-200/60 mt-2">
                          Ghi chú: "{order.notes}"
                        </div>
                      )}
                    </div>

                    {/* Action Buttons for Kitchen */}
                    <div className="pt-3 border-t border-stone-100 space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold text-stone-800">
                        <span>Tổng tiền thu:</span>
                        <span className="font-mono text-amber-600 text-sm">
                          {order.totalAmount.toLocaleString('vi-VN')}đ
                        </span>
                      </div>

                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'cooking')}
                          className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
                        >
                          <ChefHat className="w-4 h-4" />
                          <span>Nhận đơn & Bắt đầu nấu</span>
                        </button>
                      )}

                      {order.status === 'cooking' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Món đã xong - Mời sinh viên lấy</span>
                        </button>
                      )}

                      {order.status === 'ready' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
                        >
                          <Check className="w-4 h-4" />
                          <span>Xác nhận giao món cho SV (#{order.pickupCode})</span>
                        </button>
                      )}

                      {order.status === 'completed' && (
                        <div className="text-center py-1 text-xs text-stone-500 font-medium">
                          ✓ Đã phục vụ hoàn tất
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MENU MANAGEMENT */}
      {activeTab === 'menu' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-900 text-base">Danh sách món ăn của quầy</h3>
              <p className="text-xs text-stone-500">
                Bật/tắt trạng thái Còn món hoặc Tạm hết để sinh viên không đặt trùng món đã hết nguyên liệu.
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm món mới</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Món ăn</th>
                    <th className="p-3.5">Danh mục</th>
                    <th className="p-3.5">Giá bán</th>
                    <th className="p-3.5">Năng lượng / Nấu</th>
                    <th className="p-3.5">Trạng thái bán</th>
                    <th className="p-3.5 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                  {vendorFoods.map(food => (
                    <tr key={food.id} className="hover:bg-stone-50/50">
                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={food.imageUrl}
                          alt={food.name}
                          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-bold text-stone-900 text-xs sm:text-sm">{food.name}</p>
                          <p className="text-[11px] text-stone-500 truncate max-w-xs">{food.description}</p>
                        </div>
                      </td>
                      <td className="p-3.5 uppercase font-semibold text-[10px] text-stone-500">
                        {food.category}
                      </td>
                      <td className="p-3.5 font-bold font-mono text-amber-600">
                        {food.price.toLocaleString('vi-VN')}đ
                      </td>
                      <td className="p-3.5">
                        <span className="text-stone-700 font-mono">{food.calories} kcal</span> • {food.prepTimeMinutes}p
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            food.isAvailable
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {food.isAvailable ? 'Còn món' : 'Tạm hết'}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => toggleFoodAvailability(food.id)}
                          className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors ${
                            food.isAvailable
                              ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                          }`}
                        >
                          {food.isAvailable ? 'Tạm hết món' : 'Bật còn món'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Dish Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-stone-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <h3 className="font-bold text-stone-900 text-base">Thêm món ăn mới cho Quầy 01</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewDish} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Tên món ăn:</label>
                <input
                  type="text"
                  required
                  value={newDishName}
                  onChange={(e) => setNewDishName(e.target.value)}
                  placeholder="VD: Cơm bò sốt tiêu đen"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Danh mục:</label>
                  <select
                    value={newDishCategory}
                    onChange={(e) => setNewDishCategory(e.target.value as FoodCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                  >
                    <option value="com">Cơm phần</option>
                    <option value="bun_pho">Bún & Phở</option>
                    <option value="do_uong">Đồ uống</option>
                    <option value="an_vat">Ăn vặt</option>
                    <option value="mon_chay">Món chay</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Giá bán (VNĐ):</label>
                  <input
                    type="number"
                    min={10000}
                    step={1000}
                    value={newDishPrice}
                    onChange={(e) => setNewDishPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Thời gian nấu (phút):</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={newDishPrepTime}
                    onChange={(e) => setNewDishPrepTime(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Định lượng calo (kcal):</label>
                  <input
                    type="number"
                    min={50}
                    max={1500}
                    value={newDishCalories}
                    onChange={(e) => setNewDishCalories(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Thành phần nguyên liệu (cách nhau dấu phẩy):</label>
                <input
                  type="text"
                  value={newDishIngredients}
                  onChange={(e) => setNewDishIngredients(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Mô tả hương vị:</label>
                <textarea
                  rows={2}
                  value={newDishDesc}
                  onChange={(e) => setNewDishDesc(e.target.value)}
                  placeholder="Mô tả độ ngon, giòn, thơm của món..."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Link hình ảnh món (URL):</label>
                <input
                  type="url"
                  value={newDishImageUrl}
                  onChange={(e) => setNewDishImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 font-semibold text-xs"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs"
                >
                  Tạo món ăn
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
