
import { motion } from 'motion/react';
import { LifeBuoy, ShieldCheck } from 'lucide-react';
import AdminLoginForm from './auth/AdminLoginForm';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12 flex flex-col items-center"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-900/20">
            <LifeBuoy size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">ZenithDesk</span>
        </div>
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight text-center mb-4 leading-tight">
          Professional Support <br /><span className="text-slate-400">Simplified.</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-md text-center leading-relaxed">
          The all-in-one mission control for modern support teams.
        </p>
      </motion.div>

      <div className="flex justify-center w-full max-w-md relative group">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-slate-200 to-slate-300 rounded-[40px] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-2xl relative overflow-hidden w-full ring-1 ring-slate-900/5"
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform -z-0">
            <ShieldCheck size={200} />
          </div>
          
          <div className="relative z-10">
            <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner ring-1 ring-slate-200">
              <ShieldCheck className="text-slate-900 w-8 h-8" />
            </div>
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Agent Portal</h2>
              <p className="text-slate-400 text-sm font-medium">
                Mission control for authorized staff only.
              </p>
            </div>
            
            <AdminLoginForm />

            <div className="mt-10 pt-8 border-t border-slate-50 text-center">
              <p className="text-xs text-slate-400 leading-relaxed max-w-[240px] mx-auto">
                Customer? Please use the secure login link provided in your welcome email.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="mt-16 text-slate-300 flex items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.2em]">
        <span>Lightning Fast</span>
        <div className="w-1 h-1 rounded-full bg-slate-200" />
        <span>Enterprise Grade</span>
        <div className="w-1 h-1 rounded-full bg-slate-200" />
        <span>24/7 Priority</span>
      </div>
    </div>
  );
}
