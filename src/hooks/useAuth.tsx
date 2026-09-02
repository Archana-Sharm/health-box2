import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../api/endpoints';

interface Admin { name: string; email: string; role?: string; }
interface AuthCtx {
  admin: Admin | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(() => {
    try { return JSON.parse(localStorage.getItem('hb_admin') || 'null'); } catch { return null; }
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('hb_token'));

  useEffect(() => {
    if (token && !admin) {
      authApi.profile().then((r) => setAdmin(r.data)).catch(() => logout());
    }
  }, [token]);

  async function login(email: string, password: string) {
    const { data } = await authApi.login(email, password);
    const payload = data?.data ?? data;
    const t = payload?.accessToken || payload?.token;
    const a = payload?.admin || payload?.user || { name: 'Admin', email };

    if (!t) {
      throw new Error('Login response did not include a token.');
    }

    localStorage.setItem('hb_token', t);
    localStorage.setItem('hb_admin', JSON.stringify(a));
    setToken(t);
    setAdmin(a);
  }

  async function logout() {
    try {
      const token = localStorage.getItem('hb_token');
      if (token) {
        await authApi.logout().catch(() => undefined);
      }
    } finally {
      localStorage.removeItem('hb_token');
      localStorage.removeItem('hb_admin');
      setToken(null);
      setAdmin(null);
    }
  }

  return (
    <AuthContext.Provider value={{ admin, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
