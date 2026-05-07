
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { LifeBuoy, Zap, Shield, Headphones, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminLoginForm from './auth/AdminLoginForm';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      
      {/* Navbar */}
      <nav className="w-full max-w-7xl mx-auto px-8 py-6 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-900/20">
            <LifeBuoy size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">ZenithDesk</span>
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:block">
          Support Operations Center
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200/50 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Systems Operational
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-tight mb-8 tracking-tighter">
              Zenith<span className="text-slate-300 font-light italic">Desk</span>
            </h1>
            <p className="text-slate-500 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              The high-performance infrastructure for world-class support teams.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-12 py-8 px-12 bg-white rounded-[32px] shadow-sm border border-slate-100">
                <div className="text-center group cursor-default">
                  <p className="text-3xl font-black text-slate-900 mb-1">100%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uptime SLA</p>
                </div>
                <div className="w-px h-12 bg-slate-100" />
                <div className="text-center group cursor-default">
                  <p className="text-3xl font-black text-slate-900 mb-1">256-bit</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Encrypted</p>
                </div>
                <div className="w-px h-12 bg-slate-100" />
                <div className="text-center group cursor-default">
                  <p className="text-3xl font-black text-slate-900 mb-1">&lt;2ms</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Latency</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <footer className="w-full max-w-7xl mx-auto px-8 py-10 flex flex-col sm:flex-row items-center justify-between z-10 shrink-0 gap-6">
        <div className="flex gap-8 text-[11px] font-black text-slate-300 uppercase tracking-[0.2em]">
          <span onClick={() => navigate('/admin/login')} className="hover:text-slate-900 transition-colors cursor-pointer">Staff Portal</span>
          <span className="hover:text-slate-900 transition-colors cursor-pointer">Security</span>
          <span className="hover:text-slate-900 transition-colors cursor-pointer">Api Docs</span>
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
          © 2026 ZENITH SYSTEMS
        </div>
      </footer>
    </div>
  );
}
