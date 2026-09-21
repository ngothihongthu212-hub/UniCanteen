import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useCanteen } from '../context/CanteenContext';

export const Toast: React.FC = () => {
  const { toast } = useCanteen();

  if (!toast) return null;

  const bgColors = {
    success: 'bg-emerald-600 text-white border-emerald-500',
    error: 'bg-rose-600 text-white border-rose-500',
    info: 'bg-amber-600 text-white border-amber-500',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-white" />,
    error: <AlertCircle className="w-5 h-5 flex-shrink-0 text-white" />,
    info: <Info className="w-5 h-5 flex-shrink-0 text-white" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border ${bgColors[toast.type]}`}
      >
        {icons[toast.type]}
        <p className="text-sm font-medium leading-snug flex-1">{toast.message}</p>
      </div>
    </div>
  );
};
