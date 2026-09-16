import React from 'react';
import { Users, FileText, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    tag: '60 seconds',
    icon: Users,
    title: 'Tell Us Your Plan',
    desc: 'Choose your exam, preferred test date and city. Takes under a minute.',
    color: '#3B82F6'
  },
  {
    num: '02',
    tag: 'Within 15 mins',
    icon: FileText,
    title: 'We Verify & Guide',
    desc: 'Our officers audit your passport name and confirm real-time seat availability.',
    color: '#1E3A8A'
  },
  {
    num: '03',
    tag: '100% Encrypted',
    icon: CreditCard,
    title: 'Complete Payment',
    desc: 'Pay the verified discounted exam fee + ₹199 concierge fee securely.',
    color: '#3B82F6'
  },
  {
    num: '04',
    tag: 'Official Confirmation',
    icon: CheckCircle2,
    title: 'Get Registered',
    desc: 'Receive your official ETS / Pearson hall ticket on WhatsApp & Email.',
    color: '#1E3A8A'
  }
];

export default function HowItWorksAndDeciding({ onBookTest }) {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-white border-b border-[#E5E7EB] font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FF] border border-[#BFDBFE] text-[#1E3A8A] text-[11px] font-bold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              <span>HOW IT WORKS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Registered in 4 Simple Steps
            </h2>
            <p className="text-sm text-[#64748B] max-w-md">
              From first message to official hall ticket — we manage the entire process for you.
            </p>
          </div>

          <button
            onClick={() => onBookTest('GRE')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1E3A8A] hover:text-[#3B82F6] transition-colors group cursor-pointer self-start sm:self-auto whitespace-nowrap"
          >
            <span>Start Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#BFDBFE] via-[#3B82F6]/40 to-[#BFDBFE] z-0" />

          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative flex flex-col gap-5 bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-6 hover:bg-white hover:border-[#BFDBFE] hover:shadow-lg transition-all duration-200 group z-10"
              >
                {/* Step Number + Icon Row */}
                <div className="flex items-center gap-3">
                  {/* Step circle */}
                  <div className="w-9 h-9 rounded-full bg-[#0F172A] group-hover:bg-[#1E3A8A] text-white text-[13px] font-bold flex items-center justify-center shrink-0 transition-colors shadow-sm z-10">
                    {step.num}
                  </div>
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-xl bg-[#EBF3FF] text-[#1E3A8A] group-hover:bg-[#0F172A] group-hover:text-white flex items-center justify-center border border-[#BFDBFE] transition-all">
                    <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2 flex-1">
                  <h3 className="text-sm font-bold text-[#0F172A] leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Tag badge at bottom */}
                <div className="pt-3 border-t border-[#E5E7EB]">
                  <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-[#1E3A8A] bg-[#EBF3FF] border border-[#BFDBFE]/70 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                    {step.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-[#64748B] font-medium border-t border-[#E5E7EB] pt-6">
          {[
            'Official Candidate Booking Protocol',
            'Zero Disqualification Guarantee',
            'Human Officer Support via WhatsApp'
          ].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


