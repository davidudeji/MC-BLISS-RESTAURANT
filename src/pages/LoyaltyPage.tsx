import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, Star, Trophy, QrCode, CheckCircle2,
  AlertTriangle, Info, Gift, RefreshCw,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { useLoyaltyStore, REWARD_POOL } from '../store/loyaltyStore';
import { getLoyaltyTier } from '../types';

// ── Reward pool metadata ────────────────────────────────────────
const REWARD_META: Record<string, { icon: React.ReactNode; note: string; stock?: string }> = {
  'Gourmet Truffle Burger':    { icon: '🍔', note: 'Premium wagyu patty, black truffle aioli' },
  'Wood-Fired Diavola Pizza':  { icon: '🍕', note: 'Spicy salami, mozzarella, chilli oil' },
  "Chef's Special Pasta":      { icon: '🍝', note: 'Hand-rolled tagliatelle, slow-braised ragu' },
  'Pan-Seared Salmon Platter': { icon: '🐟', note: 'Herb butter, lemon-caper velouté' },
  'Smoky Jerk Chicken Bowl':   { icon: '🍗', note: 'Grilled thigh, coconut rice, slaw', stock: 'Only 3 available' },
  'Spiced Lamb Skewer Platter':{ icon: '🥙', note: 'Chargrilled lamb, tzatziki, flatbread' },
  'Meat Pie (House-Baked)':    { icon: '🥧', note: 'Slow-cooked beef filling, buttery shortcrust', stock: 'Only 3 meat pies available' },
};

// ── Alert component ─────────────────────────────────────────────
interface AlertProps {
  type: 'warning' | 'success' | 'info';
  message: string;
}
function Alert({ type, message }: AlertProps) {
  const styles = {
    warning: 'bg-red-50 text-red-700 border border-red-100',
    success: 'bg-green-50 text-green-700 border border-green-100',
    info:    'bg-[#1E392A]/8 text-[#1E392A] border border-[#1E392A]/15',
  };
  const icons = {
    warning: <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" />,
    success: <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" />,
    info:    <Info size={15} className="flex-shrink-0 mt-0.5" />,
  };
  return (
    <motion.div
      className={`flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm font-medium font-body ${styles[type]}`}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
    >
      {icons[type]}
      <span>{message}</span>
    </motion.div>
  );
}

// ── Streak Dot ──────────────────────────────────────────────────
function StreakDot({ label, active, isToday }: { label: string; active: boolean; isToday: boolean }) {
  return (
    <div
      className={`
        flex flex-col items-center gap-1.5
      `}
    >
      <div
        className={`
          w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold font-body
          transition-all duration-300
          ${isToday && !active
            ? 'bg-[#D4A373]/15 border-2 border-[#D4A373] text-[#D4A373]'
            : active
              ? 'bg-[#1E392A] text-white shadow-md'
              : 'bg-[#FDFBF7] border border-[#E5E0D8] text-[#6B7280]'
          }
        `}
      >
        {active && <Flame size={14} />}
        {!active && label[0]}
      </div>
      <span className="text-[10px] font-body text-[#6B7280] font-semibold">{label}</span>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────
export default function LoyaltyPage() {
  const {
    streak, points, lifetimeBestStreak, lastScanDate, pendingReward,
    handleScan, claimReward, _hydrate,
  } = useLoyaltyStore();

  const [alert, setAlert] = useState<{ type: 'warning' | 'success' | 'info'; message: string } | null>(null);
  const [rewardModalOpen, setRewardModalOpen] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    _hydrate();
  }, [_hydrate]);

  // Re-open reward modal on page refresh if reward is pending
  useEffect(() => {
    if (pendingReward) setRewardModalOpen(true);
  }, [pendingReward]);

  const today = new Date().toDateString();
  const alreadyScanned = lastScanDate === today;
  const progressPct = Math.min((points / 1000) * 100, 100);
  const tier = getLoyaltyTier(streak);
  const tierColors: Record<string, string> = {
    'Bronze Member':   'bg-amber-700/15 text-amber-700',
    'Silver Member':   'bg-gray-400/15 text-gray-500',
    'Gold Member':     'bg-[#D4A373]/15 text-[#D4A373]',
    'Platinum Member': 'bg-[#1E392A]/15 text-[#1E392A]',
  };

  const onScan = useCallback(() => {
    const result = handleScan();
    setAlert({ type: result.type, message: result.message });
    if (result.rewardUnlocked) setTimeout(() => setRewardModalOpen(true), 700);
  }, [handleScan]);

  const onClaim = useCallback(() => {
    claimReward();
    setRewardModalOpen(false);
    setAlert({ type: 'info', message: 'Reward claimed! Points reset. Keep scanning daily for your next reward.' });
  }, [claimReward]);

  // Build 7-day dot labels
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDots = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      label: DAYS[d.getDay()],
      isToday: d.toDateString() === today,
      active: i >= 7 - streak,
    };
  });

  return (
    <>
      <Navbar />

      {/* Reward Unlock Modal */}
      <Modal
        isOpen={rewardModalOpen}
        onClose={() => setRewardModalOpen(false)}
        title="Reward Unlocked!"
        size="sm"
      >
        <div className="px-6 py-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#D4A373]/15 flex items-center justify-center mx-auto mb-4">
            <Gift size={32} className="text-[#D4A373]" />
          </div>
          <span className="inline-block bg-[#D4A373]/10 text-[#D4A373] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            1,000 Points Milestone
          </span>
          <p className="text-sm text-[#6B7280] font-body leading-relaxed mb-4">
            You have earned enough points for a complimentary dish. Your reward today:
          </p>
          <div className="bg-[#1E392A]/6 border-l-4 border-[#1E392A] rounded-xl px-4 py-3 mb-4 text-left">
            <p className="font-display font-bold text-[#1E392A] text-lg">{pendingReward}</p>
            {pendingReward && REWARD_META[pendingReward] && (
              <p className="text-xs text-[#6B7280] font-body mt-1">{REWARD_META[pendingReward].note}</p>
            )}
          </div>
          <p className="text-xs text-[#6B7280] font-body leading-relaxed mb-6">
            Show this screen to our staff to redeem your complimentary meal.
            Claiming resets your points tally — your streak stays intact.
          </p>
          <Button variant="primary" size="lg" className="w-full" leftIcon={<CheckCircle2 size={17} />} onClick={onClaim}>
            Claim Reward &amp; Reset Points
          </Button>
        </div>
      </Modal>

      <main className="pt-20 pb-20 bg-[#FDFBF7] min-h-screen">
        <div className="max-w-lg mx-auto px-4 space-y-5">

          {/* ── Profile Card ──────────────────────────────── */}
          <motion.div
            className="rounded-2xl overflow-hidden shadow-lg"
            style={{ background: 'linear-gradient(135deg, #1E392A 0%, #2a4f3b 60%, #1a3224 100%)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header row */}
            <div className="px-6 pt-6 pb-4 flex items-start justify-between">
              <div>
                <p className="font-display font-bold text-white text-xl leading-tight">Loyal Diner</p>
                <p className="text-white/50 text-xs font-body mt-0.5">MC Bliss Frequent Diner Programme</p>
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${tierColors[tier]}`}>
                {tier}
              </span>
            </div>

            {/* Stats row */}
            <div className="px-6 pb-6 grid grid-cols-3 gap-3">
              {[
                { val: streak,             icon: <Flame size={13} />,   label: 'Streak',   color: 'text-orange-300' },
                { val: points,             icon: <Star size={13} />,    label: 'Points',   color: 'text-[#D4A373]' },
                { val: lifetimeBestStreak, icon: <Trophy size={13} />,  label: 'Best',     color: 'text-white' },
              ].map(({ val, icon, label, color }) => (
                <div key={label} className="bg-white/8 border border-white/10 rounded-xl p-3 text-center">
                  <p className={`font-display font-bold text-2xl leading-none ${color}`}>{val}</p>
                  <div className="flex items-center justify-center gap-1 mt-1.5 text-white/40 text-[10px] font-semibold font-body uppercase tracking-wider">
                    {icon}{label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Points Progress ───────────────────────────── */}
          <motion.div
            className="bg-white rounded-2xl border border-[#E5E0D8] p-5 shadow-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.07 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-sm font-semibold font-body text-[#6B7280]">
                <Star size={14} className="text-[#D4A373]" /> Progress to Reward
              </div>
              <span className="text-sm font-bold font-body text-[#1E392A]">{points} / 1,000 pts</span>
            </div>
            <div className="h-2.5 bg-[#E5E0D8] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #1E392A, #D4A373)' }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-[#6B7280] font-body">0 pts</span>
              <span className="text-[10px] text-[#6B7280] font-body">
                {points >= 1000 ? 'Reward unlocked!' : `${1000 - points} pts to reward`}
              </span>
              <span className="text-[10px] text-[#6B7280] font-body">1,000 pts</span>
            </div>
          </motion.div>

          {/* ── Scan / Clock-In Card ──────────────────────── */}
          <motion.div
            className="bg-white rounded-2xl border border-[#E5E0D8] p-6 shadow-sm text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.14 }}
          >
            <h2 className="font-display font-bold text-[#111827] text-xl mb-1">Daily Check-In</h2>
            <p className="text-sm text-[#6B7280] font-body mb-5 leading-relaxed">
              Scan your loyalty QR code once per day to keep your streak alive and earn 100 points.
            </p>

            {/* QR placeholder */}
            <div
              className={`
                w-28 h-28 mx-auto mb-5 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5
                transition-all duration-300 cursor-pointer
                ${alreadyScanned
                  ? 'border-[#E5E0D8] text-[#6B7280] bg-[#FDFBF7]'
                  : 'border-[#1E392A]/30 text-[#1E392A] bg-[#1E392A]/4 hover:bg-[#1E392A]/8 hover:border-[#1E392A]/50'
                }
              `}
              onClick={!alreadyScanned ? onScan : undefined}
              role="button"
              aria-label="Scan QR code"
            >
              <QrCode size={36} />
              <span className="text-[11px] font-semibold font-body">{alreadyScanned ? 'Scanned' : 'Tap to Scan'}</span>
            </div>

            <Button
              variant={alreadyScanned ? 'ghost' : 'secondary'}
              size="lg"
              className="w-full"
              disabled={alreadyScanned}
              onClick={onScan}
              leftIcon={alreadyScanned ? <CheckCircle2 size={17} /> : <QrCode size={17} />}
            >
              {alreadyScanned ? 'Return Tomorrow' : 'Clock In for Today'}
            </Button>

            <AnimatePresence>
              {alert && (
                <div className="mt-3">
                  <Alert type={alert.type} message={alert.message} />
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Streak Calendar ───────────────────────────── */}
          <motion.div
            className="bg-white rounded-2xl border border-[#E5E0D8] p-5 shadow-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.21 }}
          >
            <h3 className="text-sm font-bold font-body text-[#6B7280] flex items-center gap-1.5 mb-4">
              <Flame size={14} className="text-[#D4A373]" /> This Week's Streak
            </h3>
            <div className="flex justify-between">
              {weekDots.map((d, i) => (
                <StreakDot key={i} label={d.label} active={d.active} isToday={d.isToday} />
              ))}
            </div>
          </motion.div>

          {/* ── Reward Pool ───────────────────────────────── */}
          <motion.div
            className="bg-white rounded-2xl border border-[#E5E0D8] p-5 shadow-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.28 }}
          >
            <h3 className="text-sm font-bold font-body text-[#6B7280] flex items-center gap-1.5 mb-4">
              <Gift size={14} className="text-[#1E392A]" /> Redeemable Reward Pool
            </h3>
            <ul className="space-y-2.5">
              {REWARD_POOL.map((item) => {
                const meta = REWARD_META[item];
                return (
                  <li
                    key={item}
                    className="flex items-center gap-3 p-3 bg-[#FDFBF7] rounded-xl border border-[#E5E0D8]"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#1E392A]/8 flex items-center justify-center flex-shrink-0 text-lg">
                      {meta?.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold font-body text-[#111827] truncate">{item}</p>
                      {meta?.note && (
                        <p className="text-[11px] text-[#6B7280] font-body mt-0.5">{meta.note}</p>
                      )}
                    </div>
                    {meta?.stock ? (
                      <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-red-50 text-red-600">
                        {meta.stock}
                      </span>
                    ) : (
                      <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-[#1E392A]/8 text-[#1E392A]">
                        In Pool
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Pending reward banner (if reward and modal dismissed) */}
          {pendingReward && !rewardModalOpen && (
            <motion.div
              className="flex items-center gap-3 p-4 bg-[#D4A373]/12 border border-[#D4A373]/30 rounded-2xl cursor-pointer"
              onClick={() => setRewardModalOpen(true)}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Gift size={20} className="text-[#D4A373] flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-bold font-body text-[#111827]">You have an unclaimed reward!</p>
                <p className="text-xs text-[#6B7280] font-body">{pendingReward} — tap to claim</p>
              </div>
              <RefreshCw size={14} className="text-[#D4A373]" />
            </motion.div>
          )}

        </div>
      </main>
    </>
  );
}
