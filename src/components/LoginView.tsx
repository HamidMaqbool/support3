import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import AdminLoginForm from './auth/AdminLoginForm';

export default function LoginView() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-[40px] border border-slate-200 shadow-2xl p-10">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-purple-50 text-purple-600">
              <ShieldCheck size={32} />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Support Staff Login
            </h1>
            <p className="text-slate-500 mt-2">ZenithDesk Professional Access</p>
          </div>

          <AdminLoginForm />

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
             <p className="text-xs text-slate-400">
                Customers must use the secure magic link provided by their company.
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
