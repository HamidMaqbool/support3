import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export function AuthProvider({ children }: { children: ReactNode }) {
  const { token, login, logout, setUser } = useAuthStore();

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
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
          console.error('Failed to fetch profile:', err);
        }
      }
    };
    fetchProfile();
  }, [token, setUser, logout]);

  return <>{children}</>;
}

export function useAuth() {
  const store = useAuthStore();
  return {
    user: store.user,
    token: store.token,
    login: store.login,
    logout: store.logout,
    isAuthenticated: !!store.token
  };
}
