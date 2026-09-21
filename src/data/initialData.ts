import { FoodItem, Order, User, Vendor, WalletTransaction } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-sv-01',
    fullName: 'Nguyễn Văn Minh',
    email: 'minh.nv2374@sinhvien.edu.vn',
    phone: '0987123456',
    role: 'student',
    studentId: '2374820011',
    walletBalance: 120000,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user-vendor-01',
    fullName: 'Cô Ba Canteen (Quầy Cơm)',
    email: 'coba.canteen@gmail.com',
    phone: '0903889922',
    role: 'vendor',
    walletBalance: 4500000,
    vendorId: 'vendor-1',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user-admin-01',
    fullName: 'Ban Quản Lý Canteen (Admin)',
    email: 'admin.canteen@edu.vn',
    phone: '02438692222',
    role: 'admin',
    walletBalance: 0,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  }
];

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'vendor-1',
    name: 'Quầy 01 — Cơm Sinh Viên Bách Khoa',
    stallNumber: 'Quầy số 01',
    category: 'Cơm phần & Cơm đĩa',
    rating: 4.8,
    totalReviews: 320,
    openTime: '06:30',
    closeTime: '18:30',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    ownerName: 'Cô Hoàng Thị Ba',
    phone: '0903889922',
  },
  {
    id: 'vendor-2',
    name: 'Quầy 02 — Bún & Phở Hà Thành',
    stallNumber: 'Quầy số 02',
    category: 'Bún, Phở, Mì nóng',
    rating: 4.9,
    totalReviews: 285,
    openTime: '06:00',
    closeTime: '14:00',
    imageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&auto=format&fit=crop&q=80',
    ownerName: 'Chú Nguyễn Văn Hùng',
    phone: '0912445566',
  },
  {
    id: 'vendor-3',
    name: 'Quầy 03 — Canteen Cafe & Trà Sữa',
    stallNumber: 'Quầy số 03',
    category: 'Đồ uống & Tráng miệng',
    rating: 4.7,
    totalReviews: 410,
    openTime: '07:00',
    closeTime: '20:00',
    imageUrl: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=600&auto=format&fit=crop&q=80',
    ownerName: 'Chị Lê Mai Anh',
    phone: '0934567890',
  },
  {
    id: 'vendor-4',
    name: 'Quầy 04 — Ăn Vặt & FastFood Sinh Viên',
    stallNumber: 'Quầy số 04',
    category: 'Bánh mì, Snack, Fastfood',
    rating: 4.6,
    totalReviews: 195,
    openTime: '06:30',
    closeTime: '19:00',
    imageUrl: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&auto=format&fit=crop&q=80',
    ownerName: 'Anh Trần Quốc Tuấn',
    phone: '0978990011',
  }
];

export const INITIAL_FOODS: FoodItem[] = [
  {
    id: 'food-01',
    vendorId: 'vendor-1',
    vendorName: 'Quầy 01 — Cơm Sinh Viên Bách Khoa',
    name: 'Cơm Sườn Nướng Mật Ong Trứng Ốp La',
    category: 'com',
    price: 32000,
    originalPrice: 35000,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80',
    description: 'Sườn cốt lết ướp mật ong nướng than hoa thơm lừng, kèm trứng ốp la lòng đào, dưa leo chua ngọt và canh rau thịt bằm.',
    ingredients: ['Sườn cốt lết', 'Trứng gà', 'Cơm tấm dẻo', 'Mật ong', 'Rau củ kèm canh'],
    calories: 620,
    prepTimeMinutes: 5,
    isAvailable: true,
    isApproved: true,
    tags: ['Bán chạy nhất', 'Giàu Protein', 'Ăn trưa'],
    rating: 4.9,
    ratingCount: 142,
    customOptions: [
      {
        name: 'Phần cơm',
        choices: [
          { label: 'Cơm tiêu chuẩn', extraPrice: 0 },
          { label: 'Thêm cơm (+5k)', extraPrice: 5000 },
          { label: 'Cơm gạo lứt ăn kiêng (+5k)', extraPrice: 5000 },
        ]
      },
      {
        name: 'Món ăn kèm',
        choices: [
          { label: 'Không thêm', extraPrice: 0 },
          { label: 'Thêm chả trứng hấp (+7k)', extraPrice: 7000 },
          { label: 'Thêm canh rong biển (+5k)', extraPrice: 5000 },
        ]
      }
    ]
  },
  {
    id: 'food-02',
    vendorId: 'vendor-1',
    vendorName: 'Quầy 01 — Cơm Sinh Viên Bách Khoa',
    name: 'Cơm Gà Xối Mỡ Da Giòn Nước Mắm Tỏi',
    category: 'com',
    price: 35000,
    imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&auto=format&fit=crop&q=80',
    description: 'Đùi gà góc tư chiên xối mỡ giòn rụm bên ngoài mọng nước bên trong, cơm rang hạt sen nghệ vàng ươm, sốt tỏi ớt chua ngọt đặc trưng.',
    ingredients: ['Đùi gà tươi', 'Gạo thơm rang nghệ', 'Tỏi', 'Ớt sừng', 'Dưa góp'],
    calories: 680,
    prepTimeMinutes: 7,
    isAvailable: true,
    isApproved: true,
    tags: ['Món hot', 'Bữa trưa no lâu'],
    rating: 4.8,
    ratingCount: 98,
    customOptions: [
      {
        name: 'Chọn sốt',
        choices: [
          { label: 'Sốt mắm tỏi ớt (Vừa ăn)', extraPrice: 0 },
          { label: 'Sốt cay Hàn Quốc', extraPrice: 0 },
          { label: 'Sốt tiêu đen', extraPrice: 2000 },
        ]
      }
    ]
  },
  {
    id: 'food-03',
    vendorId: 'vendor-1',
    vendorName: 'Quầy 01 — Cơm Sinh Viên Bách Khoa',
    name: 'Cơm Đậu Hũ Nhồi Nấm Sốt Cà Chua (Món Chay)',
    category: 'mon_chay',
    price: 25000,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80',
    description: 'Đậu hũ non chiên giòn nhồi mộc nhĩ nấm hương, sốt cà chua thanh đạm giàu dinh dưỡng, kèm rau luộc chấm kho quẹt chay.',
    ingredients: ['Đậu phụ mơ', 'Nấm hương', 'Mộc nhĩ', 'Cà chua tươi', 'Rau củ luộc'],
    calories: 390,
    prepTimeMinutes: 5,
    isAvailable: true,
    isApproved: true,
    isVegetarian: true,
    tags: ['Món Chay', 'Healthy', 'Thanh đạm', 'Dưới 500 kcal'],
    rating: 4.7,
    ratingCount: 54,
  },
  {
    id: 'food-04',
    vendorId: 'vendor-2',
    vendorName: 'Quầy 02 — Bún & Phở Hà Thành',
    name: 'Phở Bò Tái Nạm Nước Dùng Hầm Xương 12h',
    category: 'bun_pho',
    price: 35000,
    imageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500&auto=format&fit=crop&q=80',
    description: 'Bánh phở tươi mềm mướt, thịt bò tái lăn mềm thơm kết hợp nạm giòn, nước dùng ninh từ xương bò và quế hồi hồi thảo quả chuẩn vị truyền thống.',
    ingredients: ['Bánh phở tươi', 'Bò tái', 'Bò nạm', 'Hành lá', 'Quẩy giòn'],
    calories: 520,
    prepTimeMinutes: 4,
    isAvailable: true,
    isApproved: true,
    tags: ['Đặc sản Canteen', 'Nước dùng gia truyền'],
    rating: 5.0,
    ratingCount: 165,
    customOptions: [
      {
        name: 'Chọn thịt bò',
        choices: [
          { label: 'Tái nạm thập cẩm', extraPrice: 0 },
          { label: 'Tái lăn tỏi thơm', extraPrice: 3000 },
          { label: 'Bắp bò giòn (+10k)', extraPrice: 10000 },
        ]
      },
      {
        name: 'Quẩy ăn kèm',
        choices: [
          { label: 'Không quẩy', extraPrice: 0 },
          { label: '1 đôi quẩy giòn (+5k)', extraPrice: 5000 },
          { label: 'Trứng gà chần nước phở (+6k)', extraPrice: 6000 },
        ]
      }
    ]
  },
  {
    id: 'food-05',
    vendorId: 'vendor-2',
    vendorName: 'Quầy 02 — Bún & Phở Hà Thành',
    name: 'Bún Bò Huế Chả Cua Thịt Bắp Nước Cay Nồng',
    category: 'bun_pho',
    price: 38000,
    imageUrl: 'https://images.unsplash.com/photo-1594998893017-36147cbcae05?w=500&auto=format&fit=crop&q=80',
    description: 'Tô bún sợi to đậm đà vị mắm ruốc Huế và sả thơm, đầy đặn bắp bò, chả cua quết tay, tiết luộc và rau sống hoa chuối tươi sạch.',
    ingredients: ['Sợi bún bò', 'Bắp bò hoa', 'Chả cua', 'Tiết lợn', 'Rau chuối, giá đỗ'],
    calories: 560,
    prepTimeMinutes: 5,
    isAvailable: true,
    isApproved: true,
    tags: ['Đậm vị', 'Món nóng'],
    rating: 4.8,
    ratingCount: 110,
    customOptions: [
      {
        name: 'Độ cay',
        choices: [
          { label: 'Cay vừa (chuẩn vị)', extraPrice: 0 },
          { label: 'Ít cay (cho sinh viên ăn ớt kém)', extraPrice: 0 },
          { label: 'Siêu cay tê lưỡi', extraPrice: 0 },
        ]
      }
    ]
  },
  {
    id: 'food-06',
    vendorId: 'vendor-3',
    vendorName: 'Quầy 03 — Canteen Cafe & Trà Sữa',
    name: 'Trà Sữa Nướng Trân Châu Hoàng Kim',
    category: 'do_uong',
    price: 22000,
    originalPrice: 25000,
    imageUrl: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=500&auto=format&fit=crop&q=80',
    description: 'Hồng trà Ceylon ủ lạnh đậm vị trà béo ngậy vị sữa thơm ngọt thanh, kết hợp cùng trân châu hoàng kim dai dẻo chuẩn vị giải lao.',
    ingredients: ['Hồng trà', 'Sữa tươi', 'Đường đen caramen', 'Trân châu dẻo'],
    calories: 280,
    prepTimeMinutes: 3,
    isAvailable: true,
    isApproved: true,
    tags: ['Best-seller Đồ uống', 'Giải lao giải nhiệt'],
    rating: 4.9,
    ratingCount: 220,
    customOptions: [
      {
        name: 'Độ ngọt & Đá',
        choices: [
          { label: '100% Đường - 100% Đá', extraPrice: 0 },
          { label: '70% Đường - 70% Đá (khuyên dùng)', extraPrice: 0 },
          { label: '50% Đường (Ít ngọt) - Ít đá', extraPrice: 0 },
          { label: 'Không đá (Lấy nguội)', extraPrice: 0 },
        ]
      },
      {
        name: 'Topping thêm',
        choices: [
          { label: 'Không thêm', extraPrice: 0 },
          { label: 'Thêm Thạch pudding trứng (+5k)', extraPrice: 5000 },
          { label: 'Thêm Kem Cheese béo ngậy (+7k)', extraPrice: 7000 },
        ]
      }
    ]
  },
  {
    id: 'food-07',
    vendorId: 'vendor-3',
    vendorName: 'Quầy 03 — Canteen Cafe & Trà Sữa',
    name: 'Trà Đào Cam Sả Tươi Mát Giải Nhiệt Mùa Thi',
    category: 'do_uong',
    price: 20000,
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80',
    description: 'Trà lài hương thơm quyến rũ hòa quyện cùng nước cốt cam vàng mọng nước, tinh dầu sả tươi ấm nồng và 3 miếng đào giòn ngọt thơm.',
    ingredients: ['Trà hoa lài', 'Cam tươi', 'Sả đập dập', 'Đào ngâm giòn'],
    calories: 140,
    prepTimeMinutes: 3,
    isAvailable: true,
    isApproved: true,
    tags: ['Healthy', 'Dưới 500 kcal', 'Tỉnh táo học bài'],
    rating: 4.8,
    ratingCount: 145,
  },
  {
    id: 'food-08',
    vendorId: 'vendor-3',
    vendorName: 'Quầy 03 — Canteen Cafe & Trà Sữa',
    name: 'Cà Phê Sữa Đá Pha Phin Sài Gòn Đậm Đặc',
    category: 'do_uong',
    price: 15000,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80',
    description: 'Hạt cafe Robusta Buôn Ma Thuột rang mộc pha phin nhỏ giọt, hòa sữa đặc béo ngậy giúp sinh viên tỉnh táo học ca sáng.',
    ingredients: ['Cà phê Robusta mộc', 'Sữa đặc Ông Thọ', 'Đá sạch'],
    calories: 180,
    prepTimeMinutes: 2,
    isAvailable: true,
    isApproved: true,
    tags: ['Giá Sinh Viên', 'Tỉnh táo'],
    rating: 4.9,
    ratingCount: 180,
  },
  {
    id: 'food-09',
    vendorId: 'vendor-4',
    vendorName: 'Quầy 04 — Ăn Vặt & FastFood Sinh Viên',
    name: 'Bánh Mì Kẹp Thịt Xá Xíu Pate Cột Đèn Hải Phòng',
    category: 'an_vat',
    price: 20000,
    imageUrl: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop&q=80',
    description: 'Vỏ bánh mì nướng giòn rụm trên than hồng, đầy ắp pate nhà làm béo ngậy thơm nức, thịt xá xíu mềm ngọt và tương ớt cay nồng.',
    ingredients: ['Bánh mì chuột', 'Pate gan béo', 'Xá xíu', 'Dưa chuột', 'Chí chương Hải Phòng'],
    calories: 420,
    prepTimeMinutes: 2,
    isAvailable: true,
    isApproved: true,
    tags: ['Bữa sáng nhanh', 'Giá Sinh Viên', 'Ăn nhanh'],
    rating: 4.8,
    ratingCount: 160,
    customOptions: [
      {
        name: 'Gia vị',
        choices: [
          { label: 'Ăn cay nhiều tương ớt', extraPrice: 0 },
          { label: 'Không ớt, không rau mùi', extraPrice: 0 },
          { label: 'Thêm trứng ốp la giòn viền (+6k)', extraPrice: 6000 },
        ]
      }
    ]
  },
  {
    id: 'food-10',
    vendorId: 'vendor-4',
    vendorName: 'Quầy 04 — Ăn Vặt & FastFood Sinh Viên',
    name: 'Combo Mẹt Ăn Vặt: Nem Chua Rán & Khoai Lắc Phô Mai',
    category: 'an_vat',
    price: 28000,
    imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop&q=80',
    description: 'Nem chua phố cổ tẩm bột chiên xù giòn tan kèm đĩa khoai tây chiên vàng rộm lắc bột phô mai hảo hạng chấm tương cà tương ớt.',
    ingredients: ['Nem chua lợn', 'Khoai tây cọng', 'Bột phô mai Pháp', 'Tương cà, sốt mayo'],
    calories: 510,
    prepTimeMinutes: 6,
    isAvailable: true,
    isApproved: true,
    tags: ['Ăn vặt nhóm', 'Giờ ra chơi'],
    rating: 4.7,
    ratingCount: 88,
  },
  {
    id: 'food-11',
    vendorId: 'vendor-1',
    vendorName: 'Quầy 01 — Cơm Sinh Viên Bách Khoa',
    name: 'Cơm Cá Thu Nhật Kho Tiêu Gừng Nước Dừa',
    category: 'com',
    price: 30000,
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=80',
    description: 'Cá thu Nhật kho nhừ xương với nước dừa xiêm bến tre, tiêu đen Phú Quốc và gừng tươi ấm bụng, cơm canh nóng hổi đầy đặn.',
    ingredients: ['Cá thu Nhật tươi', 'Nước dừa tươi', 'Tiêu sọ', 'Gừng già', 'Rau luộc'],
    calories: 550,
    prepTimeMinutes: 5,
    isAvailable: true,
    isApproved: true,
    tags: ['Món ăn gia đình', 'Bổ dưỡng'],
    rating: 4.6,
    ratingCount: 42,
  },
  {
    id: 'food-12',
    vendorId: 'vendor-2',
    vendorName: 'Quầy 02 — Bún & Phở Hà Thành',
    name: 'Bún Chả Nướng Than Hoa Hà Nội Kèm Nem Cua Bể',
    category: 'bun_pho',
    price: 38000,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80',
    description: 'Chả miếng ba chỉ và chả viên nướng xém cạnh thơm lừng, bát nước chấm đu đủ cà rốt chua ngọt ấm nóng, kèm nem rán giòn rụm.',
    ingredients: ['Thịt ba chỉ nướng than', 'Bún lá', 'Nem cua bể', 'Rau kinh giới, tía tô'],
    calories: 590,
    prepTimeMinutes: 5,
    isAvailable: true,
    isApproved: true,
    tags: ['Món truyền thống', 'Bán chạy'],
    rating: 4.9,
    ratingCount: 95,
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-01',
    orderCode: 'ORD-8921',
    pickupCode: '6824',
    studentId: 'user-sv-01',
    studentName: 'Nguyễn Văn Minh',
    studentPhone: '0987123456',
    vendorId: 'vendor-1',
    vendorName: 'Quầy 01 — Cơm Sinh Viên Bách Khoa',
    items: [
      {
        foodId: 'food-01',
        foodName: 'Cơm Sườn Nướng Mật Ong Trứng Ốp La',
        vendorName: 'Quầy 01 — Cơm Sinh Viên Bách Khoa',
        price: 32000,
        quantity: 1,
        selectedOptions: 'Thêm cơm (+5k)',
        note: 'Cho nhiều dưa chua giúp em',
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80',
      }
    ],
    totalAmount: 37000,
    status: 'ready',
    pickupTimeSlot: '11:45 - 12:00',
    pickupDate: '2026-09-21',
    createdAt: '2026-09-21T11:15:00Z',
    notes: 'Em học ca 3 xong lúc 11h40 chạy qua lấy liền ạ',
  },
  {
    id: 'ord-02',
    orderCode: 'ORD-8919',
    pickupCode: '3109',
    studentId: 'user-sv-01',
    studentName: 'Nguyễn Văn Minh',
    studentPhone: '0987123456',
    vendorId: 'vendor-3',
    vendorName: 'Quầy 03 — Canteen Cafe & Trà Sữa',
    items: [
      {
        foodId: 'food-06',
        foodName: 'Trà Sữa Nướng Trân Châu Hoàng Kim',
        vendorName: 'Quầy 03 — Canteen Cafe & Trà Sữa',
        price: 22000,
        quantity: 1,
        selectedOptions: '70% Đường - 70% Đá',
        imageUrl: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=500&auto=format&fit=crop&q=80',
      }
    ],
    totalAmount: 22000,
    status: 'completed',
    pickupTimeSlot: '09:15 - 09:30',
    pickupDate: '2026-09-21',
    createdAt: '2026-09-21T09:00:00Z',
    isReviewed: true,
  }
];

export const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx-01',
    userId: 'user-sv-01',
    amount: 200000,
    type: 'top_up',
    description: 'Nạp tiền Ví CanteenPay sinh viên (Demo)',
    createdAt: '2026-09-21T08:00:00Z',
  },
  {
    id: 'tx-02',
    userId: 'user-sv-01',
    amount: -22000,
    type: 'payment',
    description: 'Thanh toán đơn hàng ORD-8919 (Quầy 03)',
    createdAt: '2026-09-21T09:00:00Z',
    orderCode: 'ORD-8919'
  },
  {
    id: 'tx-03',
    userId: 'user-sv-01',
    amount: -37000,
    type: 'payment',
    description: 'Thanh toán đơn hàng ORD-8921 (Quầy 01)',
    createdAt: '2026-09-21T11:15:00Z',
    orderCode: 'ORD-8921'
  }
];

export const TIME_SLOTS = [
  '07:00 - 07:15',
  '07:15 - 07:30',
  '09:15 - 09:30 (Giờ ra chơi sáng)',
  '09:30 - 09:45',
  '11:15 - 11:30',
  '11:30 - 11:45 (Cao điểm trưa ca 1)',
  '11:45 - 12:00 (Cao điểm trưa ca 2)',
  '12:00 - 12:15',
  '12:15 - 12:30',
  '15:00 - 15:15 (Giờ ra chơi chiều)',
  '17:15 - 17:30 (Bữa xế chiều)',
];
