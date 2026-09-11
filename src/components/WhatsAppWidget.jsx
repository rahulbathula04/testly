import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const defaultPhone = "919876543210"; // Placeholder business WhatsApp number
  const message = encodeURIComponent("Hi Testly Team! I want to book my ₹199 Registration Assistance Specialist Slot (Mon-Thu, 9 AM - 9 PM) for TOEFL (₹14,999) / GRE. Please share available timings.");

  const whatsappUrl = `https://wa.me/${defaultPhone}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Expanded Quick Chat Box */}
      {isOpen && (
        <div className="mb-3 bg-white rounded-3xl p-5 shadow-2xl border border-[#E5EAF2] max-w-xs w-full animate-in slide-in-from-bottom-5 duration-200 space-y-3">
          <div className="flex items-center justify-between border-b border-[#E5EAF2] pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#18A957] text-white flex items-center justify-center font-bold text-xs">
                WA
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-[#102A56]">Testly Executive Chat</h4>
                <span className="text-[10px] text-[#18A957] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#18A957] animate-ping"></span>
                  Online (Mon–Thu, 9 AM – 9 PM)
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#667085] hover:text-[#102A56]">
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#667085] leading-relaxed">
            Want instant assistance? Chat directly with our registration executive on WhatsApp to reserve your ₹199 slot!
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#18A957] hover:bg-[#148c48] text-white text-xs font-extrabold py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>START WHATSAPP CHAT</span>
          </a>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#18A957] hover:bg-[#102A56] text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center gap-2 group border-2 border-white"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-extrabold pr-1">
          Chat on WhatsApp
        </span>
      </button>

    </div>
  );
}
