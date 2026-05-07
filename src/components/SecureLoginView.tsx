
import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function SecureLoginView() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { login, logout, isAuthenticated, user: authUser } = useAuth();

  const hasAttempted = useRef(false);

  useEffect(() => {
    if (hasAttempted.current) return;
    
    const performSecureLogin = async () => {
      const storageKey = `sec_login_${token}`;
      if (sessionStorage.getItem(storageKey)) return;
      sessionStorage.setItem(storageKey, 'true');
      hasAttempted.current = true;
      
      try {
        const res = await fetch('/api/auth/login-secure', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });

        if (res.ok) {
          const data = await res.json();
          
          // login() automatically overwrites existing token/user in state and localStorage
          login(data.token, data.user);
          toast.success('Secure login successful');
          navigate(data.user.role === 'admin' ? '/admin' : '/user', { replace: true });
        } else {
          sessionStorage.removeItem(storageKey);
          // @ts-ignore - catch block handles parsing
          toast.error('The secure link has expired or is invalid. Please go back to the main app and open support again to generate a new session.', { 
            duration: 8000,
            id: 'expired-token-error'
          });
          navigate('/');
        }
      } catch (err) {
        sessionStorage.removeItem(storageKey);
        console.error('Secure login error:', err);
        toast.error('Connection error');
        navigate('/');
      }
    };

    if (token) {
      performSecureLogin();
    }
  }, [token, login, navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900">Validating secure link...</h2>
        <p className="text-slate-500 mt-2">Please wait while we verify your credentials.</p>
      </div>
    </div>
  );
}
