import React from 'react';
import { Search, TrendingDown, ClipboardList, CreditCard, ClipboardCheck, GraduationCap, ArrowRight, MessageCircle } from 'lucide-react';

const STEPS = [
  { icon: Search,         num: '01', title: 'Choose your exam',             desc: 'Select the exam you need.' },
  { icon: TrendingDown,   num: '02', title: 'Check your saving',            desc: 'See the reference price, Testly price and exact saving.' },
  { icon: ClipboardList,  num: '03', title: 'Submit your details',          desc: 'Tell us what you need and our team contacts you.' },
  { icon: CreditCard,     num: '04', title: 'Pay for voucher + ₹199',       desc: 'Secure your discounted official voucher and registration assistance.' },
  { icon: ClipboardCheck, num: '05', title: 'We handle the registration',   desc: 'Account creation, details, voucher application and registration.' },
  { icon: GraduationCap,  num: '06', title: "You're ready",                 desc: 'Receive your registration details and prepare for your exam.' },
];

export default function HowItWorksAndDeciding({ onBookTest }) {
  return (
    <section id="how-it-works" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT+CENTRE (2/3) — How It Works */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                How It Works
              </h2>
              <p className="text-sm text-slate-500 font-medium mt-1">
                From "I need an exam" to "You're registered."
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.num} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-slate-700" />
                      </div>
                      <span className="text-[10px] font-black text-slate-200 tracking-widest">{step.num}</span>
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-slate-900 leading-tight">{step.title}</p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT (1/3) — Still Deciding */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex-1 space-y-4">
              <div className="hidden lg:block w-16 h-16 rounded-xl overflow-hidden">
                <img
                  src="/assets/images/global-university-campus.jpg"
                  alt="Better paths"
                  className="w-full h-full object-cover opacity-70"
                />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  Still Deciding Which Exam to Take?
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  We'll help you understand the available exams, their formats, rules and
                  registration requirements so you can make an informed choice.
                </p>
              </div>
              <button
                onClick={() => onBookTest('GRE')}
                className="flex items-center gap-2 border border-slate-300 hover:border-slate-600 text-slate-800 font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors">
                <MessageCircle className="w-4 h-4" />
                Talk to Testly
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
