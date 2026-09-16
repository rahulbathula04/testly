import React from 'react';
import { Users, FileText, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    num: '1',
    icon: Users,
    title: 'Tell Us Your Plan',
    desc: 'Select your exam and share your details.'
  },
  {
    num: '2',
    icon: FileText,
    title: 'We Verify & Guide',
    desc: 'Our experts check your details and suggest the best option.'
  },
  {
    num: '3',
    icon: CreditCard,
    title: 'Complete Payment',
    desc: 'Pay for the exam (and ₹199 service) through our secure system.'
  },
  {
    num: '4',
    icon: CheckCircle2,
    title: 'Get Registered',
    desc: 'We complete the registration and share your confirmation.'
  }
];

export default function HowItWorksAndDeciding({ onBookTest }) {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 bg-white border-b border-slate-200/80 font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-2">
            <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-extrabold uppercase tracking-wider">
              HOW IT WORKS
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Get Registered in 4 Simple Steps
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 font-medium sm:text-right">
            From enquiry to exam confirmation — we handle it all.
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
                className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-3.5 relative group hover:bg-white hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
              >
                {/* Step Circle & Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      {step.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-blue-100/60 text-blue-700 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Connecting Arrow for Desktop */}
                  {!isLast && (
                    <ArrowRight className="hidden lg:block w-4 h-4 text-slate-300 -mr-2" />
                  )}
                </div>

                {/* Step Copy */}
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-slate-900 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
