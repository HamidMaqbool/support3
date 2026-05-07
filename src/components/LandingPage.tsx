
import { motion } from 'motion/react';
import { LifeBuoy, ShieldCheck } from 'lucide-react';
import AdminLoginForm from './auth/AdminLoginForm';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="bg-primary/10 p-3 rounded-2xl">
            <LifeBuoy className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 italic">Zenith<span className="font-light not-italic text-slate-500">Desk</span></h1>
        </div>
        <p className="text-slate-500 text-lg max-w-md mx-auto">
          Modern support infrastructure designed for high-performance teams and their customers.
        </p>
      </motion.div>

      <div className="flex justify-center w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-xl hover:shadow-purple-500/5 transition-all relative overflow-hidden group border-b-8 border-b-purple-500/20 w-full"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <ShieldCheck size={160} />
          </div>
          <div className="relative z-10">
            <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner ring-1 ring-purple-100">
              <ShieldCheck className="text-purple-600 w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-3 tracking-tight text-slate-900">Agent Command</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Sign in to manage global incident streams and orchestrate support operations.
            </p>
            
            <AdminLoginForm />

            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400">
                Customers must use the secure magic link provided by their company.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 text-slate-400 text-sm flex gap-6"
      >
        <span>© 2026 Zenith Systems</span>
        <button className="hover:text-slate-600">Privacy Policy</button>
        <button className="hover:text-slate-600">Terms of Service</button>
      </motion.div>
    </div>
  );
}
