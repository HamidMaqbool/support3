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
  _hasHydrated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setHasHydrated: (state: boolean) => void;
  refreshProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      _hasHydrated: false,
      login: (token, user) => {
        console.log('AuthStore: Logging in', { email: user.email, role: user.role });
        set({ 
          token, 
          user
        });
      },
      logout: () => {
        console.log('AuthStore: Logging out');
        set({ 
          token: null, 
          user: null
        });
      },
      setUser: (user) => set({ user }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      refreshProfile: async () => {
        const { token, logout, setUser } = get();
        if (!token) return;
        
        console.log('AuthStore: Refreshing profile...');
        try {
          const response = await fetch('/api/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            console.log('AuthStore: Profile refreshed', { email: data.email });
            setUser(data);
          } else if (response.status === 401 || response.status === 403) {
            console.warn('AuthStore: Profile refresh failed - unauthorized');
            logout();
          }
        } catch (err) {
          console.error('AuthStore: Profile refresh error', err);
        }
      }
    }),
    {
      name: 'techlyse_desk_auth_v1', // New key to ensure fresh start
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token
      }),
    }
  )
);
