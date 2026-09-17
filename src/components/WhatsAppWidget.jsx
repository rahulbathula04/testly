import React, { useState } from 'react';
import { MessageCircle, X, CheckCircle2, ArrowRight } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const defaultPhone = '919347379041';
  const defaultMessage = encodeURIComponent(
    'Hi Testly! I want to check exam registration, institutional rates, and book the ₹199 registration concierge.'
  );

  const quickPrompts = [
    { label: 'GRE Booking (₹20,499)', msg: 'Hi Testly! I want to book GRE at ₹20,499 with ₹199 Concierge.' },
    { label: 'TOEFL Booking (₹13,999)', msg: 'Hi Testly! I want to book TOEFL at ₹13,999 with ₹199 Concierge.' },
    { label: 'PTE Booking (₹14,999)', msg: 'Hi Testly! I want to book PTE at ₹14,999 with ₹199 Concierge.' },
    { label: 'Passport Name Audit', msg: 'Hi Testly! I need a ₹199 passport name and test slot audit before booking.' },
  ];

  return (
    <div className="fixed bottom-4 right-3.5 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end print:hidden pointer-events-none">
      
      {/* Expanded Quick Chat Box */}
      {isOpen && (
        <div className="mb-3 bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 max-w-[calc(100vw-1.75rem)] w-80 animate-in slide-in-from-bottom-5 duration-200 space-y-3 pointer-events-auto">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">Rahul & Deep (Founders)</h4>
                <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online • Avg reply: 2 mins
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Chat directly with founders Rahul Bathula & Deep Royal in Hyderabad for instant exam fee savings & slot reservations:
          </p>

          {/* Quick 1-tap prompts */}
          <div className="space-y-1.5">
            {quickPrompts.map((q, idx) => (
              <a
                key={idx}
                href={`https://wa.me/${defaultPhone}?text=${encodeURIComponent(q.msg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[11px] font-bold text-slate-700 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50/80 p-2 rounded-lg border border-slate-200/80 hover:border-emerald-300 transition-all truncate"
              >
                → {q.label}
              </a>
            ))}
          </div>

          <a
            href={`https://wa.me/${defaultPhone}?text=${defaultMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-extrabold py-2.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open Direct WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Discrete Trigger Button — compact circle on mobile, comfortable pill on desktop */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#25D366] hover:bg-[#128C7E] text-white p-3 sm:py-2.5 sm:px-4 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 border-2 border-white cursor-pointer pointer-events-auto"
        aria-label="Chat with Testly on WhatsApp"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        <MessageCircle className="w-5 h-5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          {isOpen ? 'Close Chat' : 'Chat with Desk'}
        </span>
      </button>

    </div>
  );
}
