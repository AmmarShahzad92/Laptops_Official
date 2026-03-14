import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthModalOpen: false,
  authMode: 'login', // 'login' | 'register'

  openAuth: (mode = 'login') => set({ isAuthModalOpen: true, authMode: mode }),
  closeAuth: () => set({ isAuthModalOpen: false }),
  setAuthMode: (mode) => set({ authMode: mode }),

  login: async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    set({ user: data.user, isAuthModalOpen: false });
    return data.user;
  },

  register: async (username, email, password) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    set({ user: data.user, isAuthModalOpen: false });
    return data.user;
  },

  logout: () => set({ user: null }),
}));

export default useAuthStore;
