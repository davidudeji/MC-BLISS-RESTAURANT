import { create } from 'zustand';

// =========================================================
// MC Bliss — Loyalty Store
// Persists to localStorage under 'restaurant_loyalty_data'
// =========================================================

const STORAGE_KEY = 'restaurant_loyalty_data';
const POINTS_PER_SCAN = 100;
const REWARD_THRESHOLD = 1000;

export const REWARD_POOL = [
  'Gourmet Truffle Burger',
  'Wood-Fired Diavola Pizza',
  "Chef's Special Pasta",
  'Pan-Seared Salmon Platter',
  'Smoky Jerk Chicken Bowl',
  'Spiced Lamb Skewer Platter',
  'Meat Pie (House-Baked)',
] as const;

export type RewardItem = (typeof REWARD_POOL)[number];

export interface LoyaltyState {
  streak: number;
  points: number;
  lifetimeBestStreak: number;
  lastScanDate: string | null;
  pendingReward: RewardItem | null;
}

interface LoyaltyScanResult {
  success: boolean;
  message: string;
  type: 'warning' | 'success' | 'info';
  rewardUnlocked: boolean;
}

interface LoyaltyStore extends LoyaltyState {
  handleScan: () => LoyaltyScanResult;
  claimReward: () => void;
  _hydrate: () => void;
}

function defaultState(): LoyaltyState {
  return {
    streak: 0,
    points: 0,
    lifetimeBestStreak: 0,
    lastScanDate: null,
    pendingReward: null,
  };
}

function persist(state: LoyaltyState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors (private browsing etc.)
  }
}

function hydrate(): LoyaltyState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

export const useLoyaltyStore = create<LoyaltyStore>((set, get) => ({
  ...defaultState(),

  _hydrate() {
    set(hydrate());
  },

  handleScan(): LoyaltyScanResult {
    const today = new Date().toDateString();
    const state = get();

    // ── Daily lockout ──────────────────────────────────────
    if (state.lastScanDate === today) {
      return {
        success: false,
        message: `You have already clocked in today (${today}). Return tomorrow to continue your streak.`,
        type: 'warning',
        rewardUnlocked: false,
      };
    }

    // ── Streak evaluation ──────────────────────────────────
    let newStreak: number;
    if (state.lastScanDate === null) {
      newStreak = 1; // first scan ever
    } else {
      const last = new Date(state.lastScanDate);
      const now = new Date(today);
      const diffDays = Math.round((now.getTime() - last.getTime()) / 86_400_000);
      newStreak = diffDays === 1 ? state.streak + 1 : 1;
    }

    const wasStreakBroken = state.lastScanDate !== null && newStreak === 1;

    // ── Points engine ──────────────────────────────────────
    const newPoints = state.points + POINTS_PER_SCAN;
    const newBest = Math.max(newStreak, state.lifetimeBestStreak);

    // ── Reward threshold ───────────────────────────────────
    let pendingReward = state.pendingReward;
    let rewardUnlocked = false;
    if (newPoints >= REWARD_THRESHOLD && !pendingReward) {
      pendingReward = REWARD_POOL[
        Math.floor(Math.random() * REWARD_POOL.length)
      ] as RewardItem;
      rewardUnlocked = true;
    }

    const next: LoyaltyState = {
      streak: newStreak,
      points: newPoints,
      lifetimeBestStreak: newBest,
      lastScanDate: today,
      pendingReward,
    };

    set(next);
    persist(next);

    const breakNote = wasStreakBroken ? ' Your streak was reset — start fresh!' : '';
    return {
      success: true,
      message: `Check-in successful! +${POINTS_PER_SCAN} points added. Streak: ${newStreak} day${newStreak !== 1 ? 's' : ''}.${breakNote}`,
      type: 'success',
      rewardUnlocked,
    };
  },

  claimReward() {
    const state = get();
    const next: LoyaltyState = {
      ...state,
      points: 0,
      pendingReward: null,
    };
    set(next);
    persist(next);
  },
}));
