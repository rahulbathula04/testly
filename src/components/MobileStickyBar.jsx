import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function MobileStickyBar({ onOpenBooking }) {
  const [visible, setVisible] = useState(false);

  // Show only after scrolling past top 250px on mobile
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 250) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] flex items-center justify-between gap-2 animate-in slide-in-from-bottom-4 duration-200">
      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xs font-black uppercase text-slate-900">
            GRE Rate:
          </span>
          <span className="text-sm font-black text-slate-900">
            ₹20,499
          </span>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 py-0.2 rounded">
            Save ₹6,043
          </span>
        </div>
        <p className="text-[10px] text-slate-500 font-medium">
          + ₹199 Zero-Defect Registration Concierge
        </p>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <a
          href={`https://wa.me/919876543210?text=${encodeURIComponent('Hi Testly! I want to check exam slot availability and save on my exam fee.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-[#25D366]/15 text-[#128C7E] border border-[#25D366]/40 flex items-center justify-center"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-4 h-4 text-[#128C7E]" />
        </a>

        <button
          onClick={() => onOpenBooking('GRE')}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-3.5 rounded-xl flex items-center gap-1 shadow-sm"
        >
          <span>Book Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
