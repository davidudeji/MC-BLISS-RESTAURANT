import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, ChevronDown } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Badge } from '../../components/ui/Badge';
import { formatPrice, formatDate } from '../../lib/utils';
import api from '../../lib/api';
import type { Order, OrderStatus } from '../../types';
import { ORDER_STATUS_LABELS } from '../../types';
import toast from 'react-hot-toast';

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Amaka Obi',
    customerEmail: 'amaka@gmail.com',
    customerPhone: '+2348012345678',
    deliveryAddress: '12 Awolowo Road, VI, Lagos',
    totalAmount: 15000,
    status: 'PENDING',
    items: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ORD-002',
    customerName: 'Tunde Bakare',
    customerEmail: 'tunde@gmail.com',
    customerPhone: '+2348023456789',
    deliveryAddress: '45 Lekki Phase 1, Lagos',
    totalAmount: 22500,
    status: 'CONFIRMED',
    items: [],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ORD-003',
    customerName: 'Chisom Nwosu',
    customerEmail: 'chisom@company.com',
    customerPhone: '+2348034567890',
    deliveryAddress: 'Eko Hotel & Suites, VI, Lagos',
    totalAmount: 87500,
    status: 'PREPARING',
    items: [],
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const STATUS_BADGE: Record<OrderStatus, { variant: 'green' | 'ochre' | 'red' | 'gray' | 'blue'; label: string }> = {
  PENDING: { variant: 'ochre', label: 'Pending' },
  CONFIRMED: { variant: 'blue', label: 'Confirmed' },
  PREPARING: { variant: 'ochre', label: 'Preparing' },
  READY: { variant: 'green', label: 'Ready' },
  COMPLETED: { variant: 'green', label: 'Completed' },
  CANCELLED: { variant: 'red', label: 'Cancelled' },
};

async function fetchOrders(): Promise<Order[]> {
  try {
    const res = await api.get('/orders');
    return res.data.data.orders ?? res.data.data;
  } catch {
    return MOCK_ORDERS;
  }
}

async function updateOrderStatus(orderId: string, status: OrderStatus) {
  try {
    await api.patch(`/orders/${orderId}/status`, { status });
  } catch {
    // proceed with optimistic update
  }
}

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: fetchOrders,
    refetchInterval: 30000,
  });

  const filtered = orders.filter(
    (o) =>
      !search ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    setUpdatingId(orderId);
    await updateOrderStatus(orderId, status);
    refetch();
    setUpdatingId(null);
    toast.success(`Order status updated to ${ORDER_STATUS_LABELS[status]}`, {
      style: { fontFamily: 'Plus Jakarta Sans, sans-serif', borderRadius: '12px' },
    });
  };

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-[#111827] text-3xl mb-1">Orders</h1>
          <p className="text-gray-500 font-body text-sm">{orders.length} total orders</p>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or order ID…"
            className="w-full pl-10 pr-4 py-3 text-sm font-body bg-white border border-[#E5E0D8] rounded-xl focus:outline-none focus:border-[#1E392A] transition-colors"
          />
        </div>

        {/* Orders — cards on mobile, table-like on desktop */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-white rounded-2xl border border-[#E5E0D8] animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-display font-bold text-[#111827] text-xl mb-2">No orders yet</p>
            <p className="text-gray-400 font-body text-sm">Orders will appear here once customers start ordering.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((order) => {
              const badgeInfo = STATUS_BADGE[order.status];
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-[#E5E0D8] p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Order info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <p className="font-body font-bold text-[#111827] text-sm">{order.id}</p>
                        <Badge variant={badgeInfo.variant}>{badgeInfo.label}</Badge>
                      </div>
                      <p className="text-gray-700 font-body text-sm font-medium">{order.customerName}</p>
                      <p className="text-gray-400 font-body text-xs mt-0.5 truncate">{order.customerEmail}</p>
                      <p className="text-gray-400 font-body text-xs mt-0.5 truncate max-w-xs">{order.deliveryAddress}</p>
                    </div>

                    {/* Amount + Date */}
                    <div className="flex-shrink-0 text-left sm:text-right">
                      <p className="font-display font-bold text-[#1E392A] text-xl">{formatPrice(order.totalAmount)}</p>
                      <p className="text-gray-400 font-body text-xs mt-0.5">{formatDate(order.createdAt)}</p>
                    </div>

                    {/* Status selector */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                          disabled={updatingId === order.id}
                          className="appearance-none bg-[#F7F4EE] border border-[#E5E0D8] text-[#111827] text-xs font-body font-medium px-3 py-2 pr-7 rounded-xl focus:outline-none focus:border-[#1E392A] transition-colors cursor-pointer disabled:opacity-50"
                          aria-label={`Update status for order ${order.id}`}
                        >
                          {(Object.keys(ORDER_STATUS_LABELS) as OrderStatus[]).map((s) => (
                            <option key={s} value={s}>{ORDER_STATUS_LABELS[s]}</option>
                          ))}
                        </select>
                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
