import { create } from 'zustand';
import type { AdminUser } from '../types';

// ── Hardcoded admin credentials ───────────────────────────────
const ADMIN_USERNAME = 'MCBliss';
const ADMIN_PASSWORD = 'mcbliss123';
const SESSION_KEY = 'mc_bliss_admin_session';

const ADMIN_USER: AdminUser = {
  id: 'admin-001',
  name: 'MC Bliss Admin',
  email: 'admin@mcbliss.ng',
  role: 'ADMIN',
};

interface AuthState {
  user: AdminUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  login: async (username, password) => {
    // Simulate a brief async check
    await new Promise((r) => setTimeout(r, 500));
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem(SESSION_KEY, 'true');
      set({ user: ADMIN_USER });
    } else {
      throw new Error('Invalid username or password');
    }
  },

  logout: async () => {
    localStorage.removeItem(SESSION_KEY);
    set({ user: null });
  },

  checkAuth: async () => {
    const active = localStorage.getItem(SESSION_KEY) === 'true';
    set({ user: active ? ADMIN_USER : null, isLoading: false });
  },
}));
