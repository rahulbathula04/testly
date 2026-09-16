import React from 'react';
import { Users, FileText, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    num: '1',
    badge: 'Takes 60 secs',
    icon: Users,
    title: 'Tell Us Your Plan',
    desc: 'Select your exam and share your preferred test date and city.'
  },
  {
    num: '2',
    badge: 'Within 15 mins',
    icon: FileText,
    title: 'We Verify & Guide',
    desc: 'Our experts audit your passport name and verify seat availability.'
  },
  {
    num: '3',
    badge: '100% Encrypted',
    icon: CreditCard,
    title: 'Complete Payment',
    desc: 'Pay the verified discounted exam fee plus the ₹199 concierge fee.'
  },
  {
    num: '4',
    badge: 'Official Hall Ticket',
    icon: CheckCircle2,
    title: 'Get Registered',
    desc: 'Receive your official ETS / Pearson confirmation slip directly on WhatsApp & Email.'
  }
];

export default function HowItWorksAndDeciding({ onBookTest }) {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 bg-slate-50/50 border-b border-slate-200/80 font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-9">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 text-[10px] font-extrabold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>HOW IT WORKS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Get Registered in 4 Simple Steps
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 font-medium sm:text-right">
            From enquiry to exam confirmation — we handle the complexity for you.
          </p>
        </div>

        {/* 4 Connected Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === STEPS.length - 1;

            return (
              <div
                key={step.num}
                onClick={() => onBookTest('GRE')}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 relative group hover:shadow-xl hover:border-blue-300 transition-all duration-200 hover:-translate-y-1 cursor-pointer shadow-[0_2px_8px_rgba(15,23,42,0.03)]"
              >
                {/* Step Circle & Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-slate-900 group-hover:bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs transition-colors">
                      {step.num}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100 shadow-2xs group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                    {step.badge}
                  </span>
                </div>

                {/* Step Copy */}
                <div className="space-y-1.5">
                  <h3 className="text-sm font-black text-slate-950 leading-tight group-hover:text-blue-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom micro indicator */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-400 group-hover:text-blue-600 transition-colors">
                  <span>Step 0{step.num}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium pt-2">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Official Candidate Booking Protocol</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Zero Disqualification Guarantee</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Human Officer Support via WhatsApp</span>
          </div>
        </div>

      </div>
    </section>
  );
}
