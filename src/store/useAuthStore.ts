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
  refreshProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
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
      refreshProfile: async () => {
        const { token, logout, setUser } = get();
        if (!token) return;
        
        try {
          const response = await fetch('/api/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else if (response.status === 401 || response.status === 403) {
            logout();
          }
        } catch (err) {
          console.error('Failed to refresh profile:', err);
        }
      }
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
