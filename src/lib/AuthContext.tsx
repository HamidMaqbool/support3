import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number | string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  roles?: string[];
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('zenith_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('zenith_token');
  });

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
            localStorage.setItem('zenith_user', JSON.stringify(data));
          } else if (response.status === 401 || response.status === 403) {
            logout();
          }
        } catch (err) {
          console.error('Failed to fetch profile:', err);
        }
      }
    };
    fetchProfile();
  }, [token]);
  const [isLoading, setIsLoading] = useState(false);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('zenith_token', newToken);
    localStorage.setItem('zenith_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('zenith_token');
    localStorage.removeItem('zenith_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
