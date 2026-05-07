import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: number | string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'support';
  roles?: string[];
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (token, user) => set({ 
        token, 
        user
      }),
      logout: () => set({ 
        token: null, 
        user: null
      }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'techlyse_auth_storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token
      }),
    }
  )
);
