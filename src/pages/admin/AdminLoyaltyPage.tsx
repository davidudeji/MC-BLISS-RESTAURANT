import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  QrCode, Flame, Gift, TrendingUp, Users, LinkIcon,
  Star, Award, Percent, CheckCircle2, Ban, RotateCcw,
} from 'lucide-react';

// ── Mock data ──────────────────────────────────────────────────
const KPI_CARDS = [
  {
    label: 'Total Scans (All Time)',
    value: '8,342',
    sub: '+127 scans today',
    change: '+12.4%',
    up: true,
    icon: QrCode,
    accent: '#1E392A',
    bg: '#1E392A14',
  },
  {
    label: 'Highest Active Streak',
    value: '47 days',
    sub: 'Adaeze O. — 47 consecutive days',
    change: '+3 days',
    up: true,
    icon: Flame,
    accent: '#D4A373',
    bg: '#D4A37314',
  },
  {
    label: 'Total Rewards Claimed',
    value: '412',
    sub: '38 claimed this month',
    change: '+8.1%',
    up: true,
    icon: Gift,
    accent: '#b8864f',
    bg: '#b8864f14',
  },
  {
    label: 'Customer Retention Rate',
    value: '78.5%',
    sub: '7-day rolling average',
    change: '+2.3%',
    up: true,
    icon: TrendingUp,
    accent: '#2a7f4f',
    bg: '#2a7f4f14',
  },
  {
    label: 'Registered Members',
    value: '1,204',
    sub: '87 active this week',
    change: '+19 new',
    up: true,
    icon: Users,
    accent: '#4a6fa5',
    bg: '#4a6fa514',
  },
  {
    label: 'Streak Break Rate',
    value: '21.5%',
    sub: 'Down from 22.7% last week',
    change: '-1.2%',
    up: false,
    icon: LinkIcon,
    accent: '#c0392b',
    bg: '#c0392b14',
  },
];

const MINI_METRICS = [
  { label: 'Total Points Issued',  value: '834,200', icon: Star,    color: '#D4A373' },
  { label: 'Points Redeemed',      value: '412,000', icon: Award,   color: '#1E392A' },
  { label: 'Redemption Rate',      value: '49.4%',   icon: Percent, color: '#b8864f' },
];

const BAR_DATA = [
  { day: 'Mon', val: 89  },
  { day: 'Tue', val: 114 },
  { day: 'Wed', val: 102 },
  { day: 'Thu', val: 131 },
  { day: 'Fri', val: 147 },
  { day: 'Sat', val: 158 },
  { day: 'Sun', val: 127 },
];

const TOP_STREAKERS = [
  { name: 'Adaeze O.',  tier: 'Platinum',  streak: 47, since: 'Jan 2026' },
  { name: 'Emeka T.',   tier: 'Gold',      streak: 34, since: 'Mar 2026' },
  { name: 'Ngozi F.',   tier: 'Gold',      streak: 29, since: 'Feb 2026' },
  { name: 'Chukwu A.', tier: 'Silver',    streak: 21, since: 'May 2026' },
  { name: 'Ifeoma B.', tier: 'Silver',    streak: 16, since: 'Jun 2026' },
];

const ACTIVITY = [
  { customer: 'Adaeze O.',  event: 'Daily Scan',   pts: '+100',  badge: 'success' },
  { customer: 'Emeka T.',   event: 'Reward Claimed', pts: '-1,000', badge: 'gold'   },
  { customer: 'Bola K.',    event: 'Daily Scan',   pts: '+100',  badge: 'success' },
  { customer: 'Sola M.',    event: 'Scan Blocked', pts: '—',     badge: 'danger'  },
  { customer: 'Ngozi F.',   event: 'Daily Scan',   pts: '+100',  badge: 'success' },
  { customer: 'Tunde W.',   event: 'Streak Reset', pts: '+100',  badge: 'orange'  },
  { customer: 'Chukwu A.', event: 'Milestone Hit', pts: '1,000', badge: 'teal'    },
];

const REWARD_PERF = [
  { name: 'Gourmet Truffle Burger',    claimed: 98,  pct: '23.8%', demand: 'Very High', color: '#1E392A'  },
  { name: 'Wood-Fired Diavola Pizza',  claimed: 87,  pct: '21.1%', demand: 'High',      color: '#D4A373'  },
  { name: "Chef's Special Pasta",      claimed: 74,  pct: '18.0%', demand: 'High',      color: '#b8864f'  },
  { name: 'Pan-Seared Salmon Platter', claimed: 63,  pct: '15.3%', demand: 'Medium',    color: '#2a7f4f'  },
  { name: 'Smoky Jerk Chicken Bowl',   claimed: 52,  pct: '12.6%', demand: 'Medium',    color: '#4a6fa5'  },
  { name: 'Spiced Lamb Skewer Platter',claimed: 22,  pct: '5.3%',  demand: 'Low',       color: '#c0392b'  },
  { name: 'Meat Pie (House-Baked)',     claimed: 16,  pct: '3.9%',  demand: 'Low',       color: '#6B7280'  },
];

// ── Badge component ────────────────────────────────────────────
function ActivityBadge({ type, label }: { type: string; label: string }) {
  const styles: Record<string, string> = {
    success: 'bg-green-50 text-green-700',
    gold:    'bg-[#D4A373]/12 text-[#b8864f]',
    danger:  'bg-red-50 text-red-600',
    orange:  'bg-[#1E392A]/8 text-[#1E392A]',
    teal:    'bg-[#1E392A]/12 text-[#1E392A]',
  };
  const icons: Record<string, React.ReactNode> = {
    success: <CheckCircle2 size={11} />,
    gold:    <Gift size={11} />,
    danger:  <Ban size={11} />,
    orange:  <RotateCcw size={11} />,
    teal:    <Star size={11} />,
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${styles[type] ?? styles.orange}`}>
      {icons[type]}{label}
    </span>
  );
}

// ── Tier pill ──────────────────────────────────────────────────
function TierPill({ tier }: { tier: string }) {
  const map: Record<string, string> = {
    Platinum: 'bg-[#1E392A]/10 text-[#1E392A]',
    Gold:     'bg-[#D4A373]/12 text-[#b8864f]',
    Silver:   'bg-gray-100 text-gray-500',
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${map[tier] ?? map.Silver}`}>
      {tier}
    </span>
  );
}

// ── Main ────────────────────────────────────────────────────────
export default function AdminLoyaltyPage() {
  const maxBar = Math.max(...BAR_DATA.map((d) => d.val));
  const now = new Date();
  const timestamp = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    + ', ' + now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* ── Page Header ──────────────────────────────── */}
        <div>
          <h1 className="font-display font-bold text-[#111827] text-3xl mb-1">Loyalty Analytics</h1>
          <p className="text-sm text-[#6B7280] font-body flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live data — Last updated: <strong className="text-[#111827]">{timestamp}</strong>
          </p>
        </div>

        {/* ── KPI Grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {KPI_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="bg-white rounded-2xl border border-[#E5E0D8] p-5 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {/* accent top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                  style={{ background: card.accent }}
                />
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: card.bg }}
                  >
                    <Icon size={18} style={{ color: card.accent }} />
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      card.up ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {card.change}
                  </span>
                </div>
                <p className="font-display font-bold text-3xl text-[#111827] mb-0.5">{card.value}</p>
                <p className="text-xs font-semibold font-body text-[#6B7280]">{card.label}</p>
                <p className="text-[11px] text-[#6B7280]/70 font-body mt-1">{card.sub}</p>
              </div>
            );
          })}
        </div>

        {/* ── Mini Metrics ─────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {MINI_METRICS.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-[#E5E0D8] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <p className="font-display font-bold text-xl text-[#111827]">{value}</p>
                <p className="text-[11px] font-body text-[#6B7280] font-semibold">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bar Chart + Top Streakers Row ────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Bar Chart */}
          <div className="bg-white rounded-2xl border border-[#E5E0D8] p-5">
            <h2 className="font-display font-bold text-[#111827] text-lg mb-5">Daily Scans — Last 7 Days</h2>
            <div className="flex items-end gap-2 h-32">
              {BAR_DATA.map(({ day, val }, i) => {
                const pct = (val / maxBar) * 100;
                const isToday = i === 6;
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className="w-full rounded-t-md transition-all duration-700"
                      style={{
                        height: `${pct}%`,
                        background: isToday
                          ? 'linear-gradient(180deg, #D4A373, #b8864f)'
                          : 'linear-gradient(180deg, #1E392A, #2a4f3b)',
                        opacity: isToday ? 1 : 0.75,
                      }}
                      title={`${day}: ${val} scans`}
                    />
                    <span className="text-[10px] font-body font-semibold text-[#6B7280]">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Streakers */}
          <div className="bg-white rounded-2xl border border-[#E5E0D8] p-5">
            <h2 className="font-display font-bold text-[#111827] text-lg mb-5">Top Active Streakers</h2>
            <ul className="space-y-2.5">
              {TOP_STREAKERS.map(({ name, tier, streak, since }, i) => {
                const rankColors = ['text-[#D4A373]', 'text-gray-400', 'text-amber-600'];
                return (
                  <li key={name} className="flex items-center gap-3 p-3 bg-[#FDFBF7] rounded-xl border border-[#E5E0D8]">
                    <span className={`text-sm font-display font-bold w-5 text-center ${rankColors[i] ?? 'text-[#6B7280]'}`}>
                      {i + 1}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#1E392A]/8 flex items-center justify-center flex-shrink-0">
                      <Users size={14} className="text-[#1E392A]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold font-body text-[#111827] truncate">{name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <TierPill tier={tier} />
                        <span className="text-[10px] text-[#6B7280] font-body">since {since}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-display font-bold text-lg text-orange-500">{streak}</p>
                      <p className="text-[10px] text-[#6B7280] font-body">day streak</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* ── Recent Activity ───────────────────────────── */}
        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-5">
          <h2 className="font-display font-bold text-[#111827] text-lg mb-5">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr>
                  {['Customer', 'Event', 'Points', 'Status'].map((h) => (
                    <th key={h} className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] text-left pb-3 px-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E0D8]">
                {ACTIVITY.map(({ customer, event, pts, badge }) => (
                  <tr key={`${customer}-${event}`} className="hover:bg-[#FDFBF7] transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-[#111827]">{customer}</td>
                    <td className="py-2.5 px-3 text-[#6B7280]">{event}</td>
                    <td className="py-2.5 px-3 text-[#6B7280] font-mono text-xs">{pts}</td>
                    <td className="py-2.5 px-3">
                      <ActivityBadge type={badge} label={event.split(' ').slice(-1)[0]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Reward Performance ────────────────────────── */}
        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-5">
          <h2 className="font-display font-bold text-[#111827] text-lg mb-5">Reward Item Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr>
                  {['Menu Item', 'Times Claimed', '% of Total', 'Demand'].map((h) => (
                    <th key={h} className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] text-left pb-3 px-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E0D8]">
                {REWARD_PERF.map(({ name, claimed, pct, demand, color }) => (
                  <tr key={name} className="hover:bg-[#FDFBF7] transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                        <span className="font-semibold text-[#111827]">{name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-display font-bold text-[#1E392A]">{claimed}</td>
                    <td className="py-2.5 px-3 text-[#6B7280]">{pct}</td>
                    <td className="py-2.5 px-3">
                      <span
                        className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                        style={{ background: `${color}18`, color }}
                      >
                        {demand}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
