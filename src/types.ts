export type UserRole = 'student' | 'vendor' | 'admin';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  studentId?: string; // MSSV
  walletBalance: number; // VNĐ
  avatarUrl?: string;
  vendorId?: string; // If role is vendor
}

export type FoodCategory = 'com' | 'bun_pho' | 'an_vat' | 'do_uong' | 'mon_chay' | 'healthy';

export interface Vendor {
  id: string;
  name: string;
  stallNumber: string; // Quầy số 1, Quầy số 2...
  category: string;
  rating: number;
  totalReviews: number;
  openTime: string;
  closeTime: string;
  imageUrl: string;
  ownerName: string;
  phone: string;
}

export interface FoodItem {
  id: string;
  vendorId: string;
  vendorName: string;
  name: string;
  category: FoodCategory;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  description: string;
  ingredients: string[];
  calories: number; // kcal
  prepTimeMinutes: number; // thời gian chế biến ước tính
  isAvailable: boolean; // Còn món / Hết món
  isApproved: boolean; // Admin duyệt
  tags: string[]; // ['Ăn trưa', 'Hot', 'Giàu Protein', 'Món chay']
  isVegetarian?: boolean;
  allergenNotice?: string;
  customOptions?: {
    name: string;
    choices: { label: string; extraPrice: number }[];
  }[];
  rating: number;
  ratingCount: number;
}

export interface CartItem {
  food: FoodItem;
  quantity: number;
  selectedOptions: { [optionName: string]: string };
  extraCost: number;
  note?: string;
}

export type OrderStatus = 'pending' | 'cooking' | 'ready' | 'completed' | 'cancelled';

export interface OrderItemRecord {
  foodId: string;
  foodName: string;
  vendorName: string;
  price: number;
  quantity: number;
  selectedOptions?: string;
  note?: string;
  imageUrl: string;
}

export interface Order {
  id: string;
  orderCode: string; // VD: "ORD-8921"
  pickupCode: string; // 4 số nhận món, VD: "6824"
  studentId: string;
  studentName: string;
  studentPhone: string;
  vendorId: string;
  vendorName: string;
  items: OrderItemRecord[];
  totalAmount: number;
  status: OrderStatus;
  pickupTimeSlot: string; // VD: "11:30 - 11:45"
  pickupDate: string; // YYYY-MM-DD
  createdAt: string; // ISO String
  notes?: string;
  isReviewed?: boolean;
  cancellationReason?: string;
}

export interface Review {
  id: string;
  foodId: string;
  studentId: string;
  studentName: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'top_up' | 'payment' | 'refund';
  description: string;
  createdAt: string;
  orderCode?: string;
}

export interface FilterState {
  searchQuery: string;
  category: FoodCategory | 'all';
  vendorId: string | 'all';
  maxPrice: number;
  isVegetarianOnly: boolean;
  isHealthyOnly: boolean; // < 500 kcal
  sortBy: 'popular' | 'price_asc' | 'price_desc' | 'rating' | 'prep_time';
}
