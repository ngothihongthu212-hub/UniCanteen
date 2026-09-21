import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  INITIAL_FOODS,
  INITIAL_ORDERS,
  INITIAL_TRANSACTIONS,
  INITIAL_USERS,
  INITIAL_VENDORS
} from '../data/initialData';
import {
  CartItem,
  FilterState,
  FoodItem,
  Order,
  OrderStatus,
  User,
  UserRole,
  Vendor,
  WalletTransaction
} from '../types';

interface CanteenContextType {
  currentUser: User;
  role: UserRole;
  switchRole: (role: UserRole) => void;
  foods: FoodItem[];
  filteredFoods: FoodItem[];
  vendors: Vendor[];
  cart: CartItem[];
  addToCart: (food: FoodItem, quantity: number, selectedOptions?: { [key: string]: string }, extraCost?: number, note?: string) => void;
  removeFromCart: (index: number) => void;
  updateCartQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  transactions: WalletTransaction[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  createOrder: (pickupTimeSlot: string, notes?: string) => Promise<{ success: boolean; message: string; order?: Order }>;
  cancelOrder: (orderId: string, reason?: string) => { success: boolean; message: string };
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  topUpWallet: (amount: number) => void;
  toggleFoodAvailability: (foodId: string) => void;
  approveFood: (foodId: string, isApproved: boolean) => void;
  addNewFood: (newFood: Omit<FoodItem, 'id' | 'rating' | 'ratingCount'>) => void;
  addReview: (foodId: string, orderId: string, rating: number, comment: string) => void;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  activeModal: 'cart' | 'orders' | 'wallet' | 'spec' | 'detail' | null;
  setActiveModal: (modal: 'cart' | 'orders' | 'wallet' | 'spec' | 'detail' | null) => void;
  selectedFoodDetail: FoodItem | null;
  setSelectedFoodDetail: (food: FoodItem | null) => void;
  resetAllData: () => void;
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  category: 'all',
  vendorId: 'all',
  maxPrice: 60000,
  isVegetarianOnly: false,
  isHealthyOnly: false,
  sortBy: 'popular',
};

const CanteenContext = createContext<CanteenContextType | undefined>(undefined);

export const CanteenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('unicanteen_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [role, setRole] = useState<UserRole>('student');

  const currentUser = users.find(u => u.role === role) || users[0];

  const [foods, setFoods] = useState<FoodItem[]>(() => {
    const saved = localStorage.getItem('unicanteen_foods');
    return saved ? JSON.parse(saved) : INITIAL_FOODS;
  });

  const [vendors] = useState<Vendor[]>(INITIAL_VENDORS);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('unicanteen_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('unicanteen_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [transactions, setTransactions] = useState<WalletTransaction[]>(() => {
    const saved = localStorage.getItem('unicanteen_txs');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [activeModal, setActiveModal] = useState<'cart' | 'orders' | 'wallet' | 'spec' | 'detail' | null>(null);
  const [selectedFoodDetail, setSelectedFoodDetail] = useState<FoodItem | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('unicanteen_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('unicanteen_foods', JSON.stringify(foods));
  }, [foods]);

  useEffect(() => {
    localStorage.setItem('unicanteen_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('unicanteen_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('unicanteen_txs', JSON.stringify(transactions));
  }, [transactions]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 3500);
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    const roleTitles = {
      student: 'Sinh viên (Khách hàng đặt món)',
      vendor: 'Chủ quầy / Bếp Canteen (Quầy 01 Bách Khoa)',
      admin: 'Quản trị viên Ban Quản lý Canteen'
    };
    showToast(`Đã chuyển sang vai trò: ${roleTitles[newRole]}`, 'info');
  };

  const addToCart = (
    food: FoodItem,
    quantity: number,
    selectedOptions: { [key: string]: string } = {},
    extraCost: number = 0,
    note?: string
  ) => {
    if (!food.isAvailable) {
      showToast(`Món ${food.name} hiện đang tạm hết!`, 'error');
      return;
    }

    // Check if food already in cart with same options
    const existingIndex = cart.findIndex(
      item => item.food.id === food.id &&
      JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
    );

    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += quantity;
      setCart(newCart);
    } else {
      setCart([...cart, { food, quantity, selectedOptions, extraCost, note }]);
    }
    showToast(`Đã thêm "${food.name}" vào giỏ hàng`, 'success');
  };

  const removeFromCart = (index: number) => {
    const item = cart[index];
    setCart(cart.filter((_, i) => i !== index));
    if (item) {
      showToast(`Đã xóa "${item.food.name}" khỏi giỏ hàng`, 'info');
    }
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const createOrder = async (pickupTimeSlot: string, notes?: string): Promise<{ success: boolean; message: string; order?: Order }> => {
    if (cart.length === 0) {
      return { success: false, message: 'Giỏ hàng đang trống.' };
    }

    const totalCost = cart.reduce((acc, item) => {
      return acc + (item.food.price + item.extraCost) * item.quantity;
    }, 0);

    // Validate wallet balance
    if (currentUser.walletBalance < totalCost) {
      return {
        success: false,
        message: `Số dư Ví CanteenPay không đủ (${currentUser.walletBalance.toLocaleString('vi-VN')}đ / Cần ${totalCost.toLocaleString('vi-VN')}đ). Vui lòng nạp thêm tiền!`,
      };
    }

    // Generate random 4-digit pickup code
    const pickupCode = Math.floor(1000 + Math.random() * 9000).toString();
    const orderCode = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const primaryVendor = cart[0].food.vendorId;
    const vendorObj = vendors.find(v => v.id === primaryVendor) || vendors[0];

    const orderItems = cart.map(c => ({
      foodId: c.food.id,
      foodName: c.food.name,
      vendorName: c.food.vendorName,
      price: c.food.price + c.extraCost,
      quantity: c.quantity,
      selectedOptions: Object.values(c.selectedOptions).join(', '),
      note: c.note,
      imageUrl: c.food.imageUrl,
    }));

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderCode,
      pickupCode,
      studentId: currentUser.id,
      studentName: currentUser.fullName,
      studentPhone: currentUser.phone,
      vendorId: vendorObj.id,
      vendorName: vendorObj.name,
      items: orderItems,
      totalAmount: totalCost,
      status: 'pending',
      pickupTimeSlot,
      pickupDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      notes,
    };

    // Deduct user balance
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return { ...u, walletBalance: u.walletBalance - totalCost };
      }
      return u;
    }));

    // Record wallet transaction
    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      userId: currentUser.id,
      amount: -totalCost,
      type: 'payment',
      description: `Thanh toán đơn ${orderCode} (${vendorObj.name})`,
      createdAt: new Date().toISOString(),
      orderCode,
    };

    setTransactions(prev => [newTx, ...prev]);
    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    showToast(`Đặt món thành công! Mã lấy món của bạn là #${pickupCode}`, 'success');
    return { success: true, message: 'Đặt món thành công!', order: newOrder };
  };

  const cancelOrder = (orderId: string, reason?: string) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) {
      return { success: false, message: 'Không tìm thấy đơn hàng' };
    }

    if (targetOrder.status === 'cooking' || targetOrder.status === 'ready' || targetOrder.status === 'completed') {
      return { success: false, message: 'Nhà bếp đã bắt đầu nấu hoặc hoàn tất, không thể hủy đơn này.' };
    }

    // Refund 100% to wallet
    setUsers(prev => prev.map(u => {
      if (u.id === targetOrder.studentId) {
        return { ...u, walletBalance: u.walletBalance + targetOrder.totalAmount };
      }
      return u;
    }));

    const refundTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      userId: targetOrder.studentId,
      amount: targetOrder.totalAmount,
      type: 'refund',
      description: `Hoàn tiền đơn ${targetOrder.orderCode} do hủy đơn`,
      createdAt: new Date().toISOString(),
      orderCode: targetOrder.orderCode,
    };

    setTransactions(prev => [refundTx, ...prev]);

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status: 'cancelled', cancellationReason: reason || 'Sinh viên hủy đơn' };
      }
      return o;
    }));

    showToast(`Đã hủy đơn ${targetOrder.orderCode}. Đã hoàn lại ${targetOrder.totalAmount.toLocaleString('vi-VN')}đ vào ví!`, 'info');
    return { success: true, message: 'Đã hủy đơn và hoàn tiền thành công.' };
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status: newStatus };
      }
      return o;
    }));

    const statusTexts: Record<OrderStatus, string> = {
      pending: 'Chờ xác nhận',
      cooking: 'Đang nấu / Chuẩn bị',
      ready: 'Sẵn sàng lấy món (Gửi thông báo tới SV)',
      completed: 'Đã nhận món & Hoàn thành',
      cancelled: 'Đã hủy'
    };
    showToast(`Đã cập nhật trạng thái đơn: ${statusTexts[newStatus]}`, 'success');
  };

  const topUpWallet = (amount: number) => {
    if (amount <= 0) return;
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return { ...u, walletBalance: u.walletBalance + amount };
      }
      return u;
    }));

    const tx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      userId: currentUser.id,
      amount,
      type: 'top_up',
      description: `Nạp tiền vào Ví CanteenPay qua cổng giả lập`,
      createdAt: new Date().toISOString(),
    };
    setTransactions(prev => [tx, ...prev]);
    showToast(`Nạp thành công +${amount.toLocaleString('vi-VN')}đ vào ví!`, 'success');
  };

  const toggleFoodAvailability = (foodId: string) => {
    setFoods(prev => prev.map(f => {
      if (f.id === foodId) {
        const nextState = !f.isAvailable;
        showToast(`Đã đổi trạng thái "${f.name}": ${nextState ? 'Còn món' : 'Tạm hết'}`, 'info');
        return { ...f, isAvailable: nextState };
      }
      return f;
    }));
  };

  const approveFood = (foodId: string, isApproved: boolean) => {
    setFoods(prev => prev.map(f => {
      if (f.id === foodId) {
        showToast(isApproved ? `Đã duyệt món "${f.name}" lên thực đơn!` : `Đã từ chối món "${f.name}"`, isApproved ? 'success' : 'info');
        return { ...f, isApproved };
      }
      return f;
    }));
  };

  const addNewFood = (newFood: Omit<FoodItem, 'id' | 'rating' | 'ratingCount'>) => {
    const created: FoodItem = {
      ...newFood,
      id: `food-${Date.now()}`,
      rating: 5.0,
      ratingCount: 1,
    };
    setFoods(prev => [created, ...prev]);
    showToast(`Đã tạo món mới "${created.name}". Món đang chờ Admin duyệt.`, 'success');
  };

  const addReview = (foodId: string, orderId: string, rating: number, comment: string) => {
    setFoods(prev => prev.map(f => {
      if (f.id === foodId) {
        const newCount = f.ratingCount + 1;
        const newRating = Number(((f.rating * f.ratingCount + rating) / newCount).toFixed(1));
        return { ...f, rating: newRating, ratingCount: newCount };
      }
      return f;
    }));

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, isReviewed: true };
      }
      return o;
    }));

    showToast('Cảm ơn bạn đã gửi đánh giá cho món ăn!', 'success');
  };

  const resetAllData = () => {
    localStorage.removeItem('unicanteen_users');
    localStorage.removeItem('unicanteen_foods');
    localStorage.removeItem('unicanteen_cart');
    localStorage.removeItem('unicanteen_orders');
    localStorage.removeItem('unicanteen_txs');
    setUsers(INITIAL_USERS);
    setFoods(INITIAL_FOODS);
    setCart([]);
    setOrders(INITIAL_ORDERS);
    setTransactions(INITIAL_TRANSACTIONS);
    setFilters(DEFAULT_FILTERS);
    showToast('Đã khôi phục toàn bộ dữ liệu mẫu ban đầu!', 'info');
  };

  const filteredFoods = useMemo(() => {
    return foods.filter(f => {
      if (!f.isApproved && role === 'student') return false;
      if (filters.category !== 'all' && f.category !== filters.category) return false;
      if (filters.vendorId !== 'all' && f.vendorId !== filters.vendorId) return false;
      if (filters.maxPrice && f.price > filters.maxPrice) return false;
      if (filters.isVegetarianOnly && !f.isVegetarian) return false;
      if (filters.isHealthyOnly && f.calories > 500) return false;
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchName = f.name.toLowerCase().includes(q);
        const matchVendor = f.vendorName.toLowerCase().includes(q);
        const matchIng = f.ingredients.some(ing => ing.toLowerCase().includes(q));
        if (!matchName && !matchVendor && !matchIng) return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'prep_time') return a.prepTimeMinutes - b.prepTimeMinutes;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      return b.ratingCount - a.ratingCount;
    });
  }, [foods, filters, role]);

  return (
    <CanteenContext.Provider
      value={{
        currentUser,
        role,
        switchRole,
        foods,
        filteredFoods,
        vendors,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        orders,
        transactions,
        filters,
        setFilters,
        resetFilters,
        createOrder,
        cancelOrder,
        updateOrderStatus,
        topUpWallet,
        toggleFoodAvailability,
        approveFood,
        addNewFood,
        addReview,
        toast,
        showToast,
        activeModal,
        setActiveModal,
        selectedFoodDetail,
        setSelectedFoodDetail,
        resetAllData,
      }}
    >
      {children}
    </CanteenContext.Provider>
  );
};

export const useCanteen = () => {
  const context = useContext(CanteenContext);
  if (!context) {
    throw new Error('useCanteen must be used within a CanteenProvider');
  }
  return context;
};
