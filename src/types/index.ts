// =========================================================
// MC Bliss — Core Types
// =========================================================

export type Category =
  | 'NUTRITIOUS_MEALS'
  | 'SNACKS'
  | 'YOGURT_BOWLS'
  | 'ZOBO_JUICES';

export type ItemStatus = 'AVAILABLE' | 'OUT_OF_STOCK';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY'
  | 'COMPLETED'
  | 'CANCELLED';

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: Category;
  status: ItemStatus;
  imageUrl: string | null;
  imagePublicId: string | null;
  batchQuantity: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  category: Category;
  imageUrl: string | null;
  quantity: number;
  batchQuantity: number;
  status: ItemStatus;
}

export interface OrderItem {
  id: string;
  orderId: string;
  menuItemId: string;
  menuItem: MenuItem;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  totalAmount: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN';
}

export interface DashboardStats {
  totalMenuItems: number;
  availableItems: number;
  outOfStockItems: number;
  pendingOrders: number;
  todayOrders: number;
  todayRevenue: number;
}

export type LoyaltyTier = 'Bronze Member' | 'Silver Member' | 'Gold Member' | 'Platinum Member';

export function getLoyaltyTier(streak: number): LoyaltyTier {
  if (streak >= 30) return 'Platinum Member';
  if (streak >= 14) return 'Gold Member';
  if (streak >= 7) return 'Silver Member';
  return 'Bronze Member';
}

export const CATEGORY_LABELS: Record<Category | 'ALL', string> = {
  ALL: 'All',
  NUTRITIOUS_MEALS: 'Nutritious Meals',
  SNACKS: 'Snacks',
  YOGURT_BOWLS: 'Yogurt Bowls',
  ZOBO_JUICES: 'Zobo & Juices',
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  PREPARING: 'Preparing',
  READY: 'Ready',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};
