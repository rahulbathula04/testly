import React, { useState, useEffect } from 'react';
import { CheckCircle2, ShieldCheck, X } from 'lucide-react';

export default function LiveActivityToast() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  const activities = [
    { name: 'Rahul M.', city: 'New Delhi', action: 'booked TOEFL Assistance (Mon 11 AM)', time: '7 mins ago' },
    { name: 'Ananya P.', city: 'Hyderabad', action: 'booked GRE Assistance (Tue 2 PM)', time: '12 mins ago' },
    { name: 'Priya S.', city: 'Bengaluru', action: 'unlocked ₹2,801 TOEFL savings', time: '18 mins ago' },
    { name: 'Karthik V.', city: 'Chennai', action: 'booked GMAT Price Check', time: '24 mins ago' },
    { name: 'Meera K.', city: 'Mumbai', action: 'booked TOEFL Assistance (Wed 4 PM)', time: '31 mins ago' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx(prev => (prev + 1) % activities.length);
        setVisible(true);
      }, 400);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const current = activities[currentIdx];

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden sm:block animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 pr-8 border border-[#E5EAF2] shadow-xl flex items-center gap-3 relative max-w-sm">
        
        <div className="w-9 h-9 rounded-xl bg-[#EAF8F0] text-[#18A957] flex items-center justify-center shrink-0 border border-[#18A957]/30">
          <CheckCircle2 className="w-5 h-5" />
        </div>

        <div className="text-xs">
          <p className="font-bold text-[#102A56] leading-tight">
            {current.name} <span className="text-[#667085] font-normal">({current.city})</span>
          </p>
          <p className="text-[11px] font-semibold text-[#18A957] mt-0.5">
            {current.action}
          </p>
          <span className="text-[9px] text-[#667085] block">{current.time}</span>
        </div>

        <button 
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Dismiss toast"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
}
