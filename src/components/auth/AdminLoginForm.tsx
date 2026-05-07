import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from 'sonner';

export default function AdminLoginForm() {
  const [email, setEmail] = useState('admin@techlyse.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'admin' }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token, data.user);
        toast.success('Welcome back!');
        navigate('/admin');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Invalid credentials');
      }
    } catch (err) {
      toast.error('Connection error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5 w-full">
      <div className="space-y-2">
        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider ml-1">Work Email</label>
        <Input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900/5 transition-all placeholder:text-slate-300"
          required
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Password</label>
          <button type="button" className="text-[11px] font-medium text-slate-400 hover:text-slate-600 transition-colors">Forgot?</button>
        </div>
        <Input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900/5 transition-all placeholder:text-slate-300"
          required
        />
      </div>

      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full h-12 rounded-xl mt-2 text-white font-semibold text-base gap-2 bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-900/10 cursor-pointer transition-all active:scale-[0.98]"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : <>Access Dashboard <LogIn size={18} /></>}
      </Button>
    </form>
  );
}
