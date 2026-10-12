import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isInfo = toast.type === 'info';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce-in transition-all">
      <div className={`p-4 rounded-xl shadow-2xl border backdrop-blur-md flex items-start gap-3.5 ${
        isSuccess 
          ? 'bg-slate-900/95 border-amber-500/50 text-white shadow-amber-500/10' 
          : isInfo 
          ? 'bg-slate-900/95 border-blue-500/50 text-white shadow-blue-500/10'
          : 'bg-slate-900/95 border-red-500/50 text-white shadow-red-500/10'
      }`}>
        <div className="mt-0.5 flex-shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
          {isInfo && <Info className="w-5 h-5 text-blue-400" />}
          {!isSuccess && !isInfo && <AlertCircle className="w-5 h-5 text-red-400" />}
        </div>
        <div className="flex-1 text-sm font-medium leading-relaxed">
          {toast.message}
        </div>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
