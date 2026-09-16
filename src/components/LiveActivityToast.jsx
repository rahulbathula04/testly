import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, X } from 'lucide-react';

const LIVE_BOOKINGS = [
  {
    name: 'Ananya P.',
    city: 'Hyderabad',
    action: 'unlocked ₹6,043 GRE Institutional Savings',
    rate: '₹20,499 locked',
    time: '3 mins ago'
  },
  {
    name: 'Rohan M.',
    city: 'Bengaluru',
    action: 'booked TOEFL at ₹13,999 + ₹199 Concierge',
    rate: 'Saved ₹4,000',
    time: '7 mins ago'
  },
  {
    name: 'Karthik V.',
    city: 'New Delhi',
    action: 'secured PTE Academic voucher slot',
    rate: '₹14,999 (Saved ₹3,901)',
    time: '12 mins ago'
  },
  {
    name: 'Tanvi S.',
    city: 'Pune',
    action: 'cleared Zero-Defect Passport Pre-Audit for GRE',
    rate: 'Exam date confirmed',
    time: '19 mins ago'
  },
  {
    name: 'Sneha K.',
    city: 'Chennai',
    action: 'booked Duolingo English Test (DET)',
    rate: '₹5,499 official rate',
    time: '24 mins ago'
  },
  {
    name: 'Vikram R.',
    city: 'Mumbai',
    action: 'unlocked ₹6,043 GRE Institutional Savings',
    rate: 'Domestic GST invoice issued',
    time: '31 mins ago'
  }
];

export default function LiveActivityToast() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Initial delay before first toast
    const initialTimer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 3500);

    // Rotate every 9 seconds
    const interval = setInterval(() => {
      if (dismissed) return;
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % LIVE_BOOKINGS.length);
        setVisible(true);
      }, 500);
    }, 9000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed || !visible) return null;

  const current = LIVE_BOOKINGS[currentIdx];

  return (
    <aside
      aria-label="Recent booking notification"
      className="fixed bottom-6 left-6 z-40 hidden md:block max-w-sm pointer-events-auto select-none transition-all duration-300 ease-out transform translate-y-0 opacity-100"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 pl-3.5 pr-8 border border-slate-200/90 shadow-xl shadow-slate-900/10 flex items-center gap-3 relative">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
          <CheckCircle2 className="w-5 h-5" />
        </div>

        <div className="text-xs">
          <div className="flex items-center gap-1.5 leading-tight">
            <span className="font-black text-slate-900">{current.name}</span>
            <span className="text-slate-400 font-medium">({current.city})</span>
            <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
              <ShieldCheck className="w-2.5 h-2.5" />
              Verified
            </span>
          </div>

          <p className="text-[11px] font-semibold text-slate-700 mt-0.5">
            {current.action}
          </p>

          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] font-extrabold text-emerald-700">
              {current.rate}
            </span>
            <span className="text-[9px] text-slate-400">
              • {current.time}
            </span>
          </div>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
