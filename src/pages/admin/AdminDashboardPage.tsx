import { useQuery } from '@tanstack/react-query';
import { UtensilsCrossed, CheckCircle2, AlertCircle, ClipboardList, TrendingUp, DollarSign } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import api from '../../lib/api';
import { formatPrice } from '../../lib/utils';
import type { DashboardStats } from '../../types';

const MOCK_STATS: DashboardStats = {
  totalMenuItems: 9,
  availableItems: 7,
  outOfStockItems: 2,
  pendingOrders: 3,
  todayOrders: 12,
  todayRevenue: 87500,
};

async function fetchStats(): Promise<DashboardStats> {
  try {
    const res = await api.get('/admin/stats');
    return res.data.data;
  } catch {
    return MOCK_STATS;
  }
}

export default function AdminDashboardPage() {
  const { data: stats = MOCK_STATS } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: fetchStats,
    staleTime: 60 * 1000,
  });

  const cards = [
    { label: 'Total Menu Items', value: stats.totalMenuItems, icon: UtensilsCrossed, color: 'bg-[#1E392A]', textColor: 'text-[#1E392A]' },
    { label: 'Available Items', value: stats.availableItems, icon: CheckCircle2, color: 'bg-green-600', textColor: 'text-green-600' },
    { label: 'Out of Stock', value: stats.outOfStockItems, icon: AlertCircle, color: 'bg-red-600', textColor: 'text-red-600' },
    { label: 'Pending Orders', value: stats.pendingOrders, icon: ClipboardList, color: 'bg-amber-600', textColor: 'text-amber-600' },
    { label: "Today's Orders", value: stats.todayOrders, icon: TrendingUp, color: 'bg-blue-600', textColor: 'text-blue-600' },
    { label: "Today's Revenue", value: formatPrice(stats.todayRevenue), icon: DollarSign, color: 'bg-[#D4A373]', textColor: 'text-[#D4A373]' },
  ];

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-[#111827] text-3xl mb-1">Dashboard</h1>
          <p className="text-gray-500 font-body text-sm">
            Welcome back! Here's what's happening at MC Bliss today.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="bg-white rounded-2xl border border-[#E5E0D8] p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-body font-medium text-gray-500">{card.label}</p>
                  <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center`}>
                    <Icon size={18} className="text-white" />
                  </div>
                </div>
                <p className={`font-display font-bold text-3xl ${card.textColor}`}>
                  {card.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6">
          <h2 className="font-display font-bold text-[#111827] text-xl mb-5">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="/admin/menu"
              className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E0D8] hover:border-[#1E392A] hover:bg-[#1E392A]/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1E392A]/10 flex items-center justify-center group-hover:bg-[#1E392A] transition-colors">
                <UtensilsCrossed size={20} className="text-[#1E392A] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-body font-semibold text-[#111827] text-sm">Manage Menu</p>
                <p className="text-gray-400 font-body text-xs mt-0.5">Add, edit, or remove items</p>
              </div>
            </a>
            <a
              href="/admin/orders"
              className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E0D8] hover:border-[#D4A373] hover:bg-[#D4A373]/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#D4A373]/10 flex items-center justify-center group-hover:bg-[#D4A373] transition-colors">
                <ClipboardList size={20} className="text-[#D4A373] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-body font-semibold text-[#111827] text-sm">View Orders</p>
                <p className="text-gray-400 font-body text-xs mt-0.5">Manage customer orders</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
