import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function UrgencyBanner({ onOpenBooking }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-2.5 truncate font-medium">
          <span className="bg-slate-800 text-emerald-400 border border-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider shrink-0">
            Advisory Notice
          </span>
          <span className="truncate">
            Testly Candidate Registration Advisory & Passport Audit <strong className="text-white font-semibold">Services start at ₹199</strong>. Official Voucher Discounts up to ₹4,001 available.
          </span>
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenBooking && onOpenBooking('GRE')}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-3 py-1 rounded-md transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Book Advisory Service (₹199)</span>
          </button>
        </div>

        <button 
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white p-0.5 transition-colors"
          aria-label="Close notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
}
