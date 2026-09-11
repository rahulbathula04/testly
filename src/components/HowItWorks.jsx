import React from 'react';
import { Building2, Ticket, ClipboardCheck, Laptop, LineChart, GraduationCap, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onBookService }) {
  const steps = [
    {
      icon: Building2,
      title: '1. Select Exam Voucher'
    },
    {
      icon: Ticket,
      title: '2. Claim Discount Coupon (Save ₹4k)'
    },
    {
      icon: ClipboardCheck,
      title: '3. Add ₹199 Service Plan'
    },
    {
      icon: Laptop,
      title: '4. Instant UPI & WhatsApp Voucher'
    },
    {
      icon: LineChart,
      title: '5. Practice Free Mocks'
    },
    {
      icon: GraduationCap,
      title: '6. Ace Exam (Zero Name Errors)'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#F7FAFF] border-b border-[#E5EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <p className="text-xs font-black uppercase tracking-widest text-[#667085]">
            FROM REGISTRATION TO READINESS
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-[#102A56] tracking-tight">
            Your journey with Testly.
          </h2>
        </div>

        {/* 6 Step Horizontal Flow */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                className="bg-white p-5 rounded-2xl border border-[#E5EAF2] shadow-xs text-center space-y-3 relative group hover:border-[#1769E0]/30 transition-all flex flex-col items-center justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F2F7FF] text-[#1769E0] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>

                <p className="text-xs font-extrabold text-[#102A56] leading-snug">
                  {step.title}
                </p>

                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#667085]">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
