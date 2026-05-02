import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

async function fetchProfile(userId) {
  if (!supabase || !userId) return null;
  const { data, error } = await supabase
    .from('customer_profiles')
    .select('cust_id, name, phone, email, address')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) return null;
  return data || null;
}

const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  isAuthModalOpen: false,
  authMode: 'login',
  authMessage: '',
  initialized: false,

  initAuth: async () => {
    const { initialized } = get();
    if (initialized) return;
    set({ initialized: true });
    if (!supabase) return;

    const { data } = await supabase.auth.getSession();
    if (data?.session?.user) {
      const profile = await fetchProfile(data.session.user.id);
      set({ user: data.session.user, profile });
    }

    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) {
        set({ user: null, profile: null });
        return;
      }
      const profile = await fetchProfile(session.user.id);
      set({ user: session.user, profile });
    });
  },

  openAuth: (mode = 'login') => set({ isAuthModalOpen: true, authMode: mode, authMessage: '' }),
  closeAuth: () => set({ isAuthModalOpen: false, authMessage: '' }),
  setAuthMode: (mode) => set({ authMode: mode, authMessage: '' }),

  login: async (email, password) => {
    if (!supabase) throw new Error('Auth is not configured.');
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data?.user) {
      throw new Error('Unable to sign in. Check your credentials.');
    }
    const profile = await fetchProfile(data.user.id);
    set({ user: data.user, profile, isAuthModalOpen: false, authMessage: '' });
    return data.user;
  },

  register: async ({ name, phone, address, email, password }) => {
    if (!supabase) throw new Error('Auth is not configured.');
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
        data: {
          name,
          phone,
          address,
        },
      },
    });
    if (error) {
      throw new Error('Unable to sign up. Please try again.');
    }
    set({ authMessage: 'Check your email to verify your account.', isAuthModalOpen: true });
  },

  logout: async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    set({ user: null, profile: null });
  },
}));

export default useAuthStore;
