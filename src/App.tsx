/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import UserDashboard from './components/user/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import TicketDetailView from './components/shared/TicketDetailView';
import LandingPage from './components/LandingPage';
import LoginView from './components/LoginView';
import SecureLoginView from './components/SecureLoginView';
import { useAuthStore } from './store/useAuthStore';

function ProtectedRoute({ children, role }: { children: ReactNode, role?: 'user' | 'admin' | 'support' | 'staff' }) {
  const { user, token } = useAuthStore();
  const isAuthenticated = !!token;
  
  console.log("Auth Debug:", { isAuthenticated, user, requiredRole: role });

  if (!isAuthenticated) return <Navigate to={`/login?role=${role === 'staff' ? 'admin' : (role || 'user')}`} replace />;
  
  if (role === 'staff') {
    if (user?.role !== 'admin' && user?.role !== 'support') return <Navigate to="/" replace />;
  } else if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

export default function App() {
  const { token, refreshProfile } = useAuthStore();

  useEffect(() => {
    refreshProfile();
  }, [token, refreshProfile]);

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<LoginView />} />
          <Route path="/login" element={<Navigate to="/admin/login" replace />} />
          <Route path="/secure-login/:token" element={<SecureLoginView />} />
          
          {/* User Portal */}
          <Route path="/user" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
          <Route path="/user/ticket/:id" element={<ProtectedRoute role="user"><TicketDetailView portal="user" /></ProtectedRoute>} />
          
          {/* Admin/Support Portal */}
          <Route path="/admin" element={<ProtectedRoute role="staff"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/ticket/:id" element={<ProtectedRoute role="staff"><TicketDetailView portal="admin" /></ProtectedRoute>} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
  );
}
