import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '../../lib/AuthContext';
import { toast } from 'sonner';

export default function AdminLoginForm() {
  const [email, setEmail] = useState('admin@zenith.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
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
    <form onSubmit={handleLogin} className="space-y-4 w-full">
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
        <Input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter work email"
          className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all"
          required
        />
      </div>
      
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
        <Input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all"
          required
        />
      </div>

      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full h-12 rounded-xl mt-6 text-white font-bold gap-2 bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/10 cursor-pointer"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : <>Sign In <LogIn size={18} /></>}
      </Button>
    </form>
  );
}
