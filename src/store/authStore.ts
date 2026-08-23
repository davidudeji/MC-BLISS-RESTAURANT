import { create } from 'zustand';
import api from '../lib/api';
import type { AdminUser } from '../types';

interface AuthState {
  user: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    set({ user: res.data.data.user });
  },

  logout: async () => {
    await api.post('/auth/logout');
    set({ user: null });
  },

  checkAuth: async () => {
    try {
      const res = await api.get('/auth/me');
      set({ user: res.data.data.user, isLoading: false });
    } catch {
      set({ user: null, isLoading: false });
    }
  },
}));
