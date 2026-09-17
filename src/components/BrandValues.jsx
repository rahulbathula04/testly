import React from 'react';
import { ShieldCheck, CheckCircle2, Headphones, Zap, Sparkles } from 'lucide-react';

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Trustworthy',
    subtitle: 'Verified & Transparent',
    description: 'Every test voucher is institutional and 100% verified. No hidden markups or surprise checkout fees.'
  },
  {
    icon: CheckCircle2,
    title: 'Precise',
    subtitle: 'Accurate Information',
    description: 'Real-time slot availability, exact test center data, and strict passport detail checks to prevent costly exam errors.'
  },
  {
    icon: Headphones,
    title: 'Human',
    subtitle: 'Real Support',
    description: 'Direct WhatsApp and desk support from dedicated human registration officers—never generic automated bots.'
  },
  {
    icon: Zap,
    title: 'Efficient',
    subtitle: 'Simpler Process',
    description: 'A 15-minute streamlined booking flow with fast official confirmation emails directly from ETS, Pearson, or IDP.'
  },
  {
    icon: Sparkles,
    title: 'Future-Focused',
    subtitle: 'Your Goals Matter',
    description: 'Helping ambitious students save on application costs so they can invest where it matters most: their global future.'
  }
];

export default function BrandValues() {
  return (
    <section className="py-10 sm:py-14 bg-white border-b border-[#E5E7EB] font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-7 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FF] border border-[#BFDBFE] text-[#1E3A8A] text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
            <span>BRAND VALUES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Built on Integrity. Engineered for Aspirants.
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Our five core pillars driving thousands of successful exam registrations across India.
          </p>
        </div>

        {/* 5 Pillars Row (Clean responsive cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:bg-white hover:border-[#3B82F6]/50 hover:shadow-md transition-all duration-200 group"
              >
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EBF3FF] text-[#1E3A8A] group-hover:bg-[#0F172A] group-hover:text-white transition-colors flex items-center justify-center border border-[#BFDBFE]/80 shadow-2xs">
                    <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] sm:text-base font-bold text-[#0F172A] leading-snug">
                      {val.title}
                    </h3>
                    <div className="text-[10.5px] sm:text-[11px] font-semibold text-[#1E3A8A] mt-0.5">
                      {val.subtitle}
                    </div>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand Promise Footer Strip */}
        <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="text-xs text-[#64748B]">
            <span className="font-bold text-[#0F172A]">Brand Promise: </span>
            <span>Check before you book. Transparent fee comparison for every student.</span>
          </div>
          <div className="text-xs font-serif italic text-[#1E3A8A]">
            "Book smarter. Go further."
          </div>
        </div>

      </div>
    </section>
  );
}
