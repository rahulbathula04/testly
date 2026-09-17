import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, MessageCircle, ArrowRight, Zap, Check } from 'lucide-react';

export default function ExitIntentModal({ onOpenBooking, isAnyModalOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Only on desktop screen size
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    // Check if already shown in this session
    try {
      if (sessionStorage.getItem('testly_exit_intent_seen')) {
        return;
      }
    } catch {
      return;
    }

    let minTimePassed = false;
    const timer = setTimeout(() => {
      minTimePassed = true;
    }, 12000); // 12 seconds grace period before enabling exit trigger

    const handleMouseLeave = (e) => {
      if (minTimePassed && !dismissed && !isOpen && !isAnyModalOpen && e.clientY <= 8) {
        setIsOpen(true);
        try {
          sessionStorage.setItem('testly_exit_intent_seen', 'true');
        } catch {
          // ignore
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [dismissed, isOpen, isAnyModalOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
    setDismissed(true);
  };

  const handleClaim = () => {
    setIsOpen(false);
    setDismissed(true);
    if (onOpenBooking) {
      onOpenBooking('GRE');
    }
  };

  const waHoldUrl = `https://wa.me/919347379041?text=${encodeURIComponent(
    'Hi Rahul & Deep! Please hold today’s institutional exam discount rate for me before quota resets.'
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Top Accent Rim */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-600" />

        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wide mb-3">
            <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            <span>Institutional Quota Hold</span>
          </div>

          <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
            Before you pay full retail fees...
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Direct test board vouchers give you the identical exam credited immediately to your official portal at pre-cleared savings:
          </p>

          {/* Quick Rate Snapshot */}
          <div className="mt-4 bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold border-b border-slate-200/70 pb-2">
              <span className="text-slate-800">GRE General Test</span>
              <span className="text-emerald-700 font-extrabold">₹20,499 <span className="line-through text-slate-400 font-normal text-[11px]">₹26,542</span></span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold border-b border-slate-200/70 pb-2">
              <span className="text-slate-800">TOEFL iBT</span>
              <span className="text-emerald-700 font-extrabold">₹13,999 <span className="line-through text-slate-400 font-normal text-[11px]">₹17,999</span></span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-800">PTE Academic</span>
              <span className="text-emerald-700 font-extrabold">₹14,999 <span className="line-through text-slate-400 font-normal text-[11px]">₹18,900</span></span>
            </div>
          </div>

          <div className="mt-3.5 flex items-center gap-2 text-[11px] text-slate-600">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
            <span>Zero payment now • 100% official direct ETS / Pearson credit</span>
          </div>

          {/* CTA Buttons */}
          <div className="mt-5 space-y-2">
            <a
              href={waHoldUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="w-full bg-[#128C7E] hover:bg-[#0d6e63] text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Freeze Today’s Rate via WhatsApp (15s)</span>
            </a>

            <button
              onClick={handleClaim}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Check Slot Availability on Web</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-center mt-3">
            <button
              onClick={handleClose}
              className="text-[10px] text-slate-400 hover:text-slate-600 font-medium underline underline-offset-2"
            >
              No thanks, I will pay full retail later
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
