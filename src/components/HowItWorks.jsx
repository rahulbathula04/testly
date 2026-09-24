import React from 'react';
import { Ticket, ShieldCheck, Laptop, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

export default function HowItWorks({ onBookService, onOpenFreeMock }) {
  const steps = [
    {
      step: 'STEP 1',
      title: 'Choose Official Exam Voucher',
      saving: 'Save Up To ₹4,001',
      desc: 'Select your exam (TOEFL ₹13,999, GRE ₹19,999, DET ₹4,999, PTE ₹14,999). Get instant official voucher codes with authorized institutional fee schedules.',
      icon: Ticket,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      step: 'STEP 2',
      title: 'Add ₹199 Passport & Name Audit',
      saving: 'Protects ₹20,000+ Fee',
      desc: 'Our specialist conducts a 1-on-1 verification of your Given Name vs. Surname against ETS, IDP, Pearson, and GMAC guidelines to guarantee zero test-day rejection.',
      icon: ShieldCheck,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      step: 'STEP 3',
      title: 'Practice Free Mocks & Book Slot',
      saving: 'Save ₹25,000 Coaching',
      desc: 'Receive your verified voucher code via WhatsApp/Email. Get 100% free unlimited access to adaptive IRT practice mocks and priority Hyderabad test slots.',
      icon: Laptop,
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold px-3.5 py-1 rounded-md uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>How Testly Works • 3 Simple Steps</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Clear, Transparent & Simple. <br />
            <span className="text-blue-600">Everything You Need to Know.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Testly combines official discounted exam vouchers, 1-on-1 passport legal audits, and unlimited free practice mocks into one seamless platform.
          </p>
        </div>

        {/* 3 Step Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between space-y-6 relative"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black tracking-widest text-slate-400 uppercase">
                      {item.step}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${item.badgeColor}`}>
                      {item.saving}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Guaranteed Valid
                  </span>
                  <span className="text-blue-600 font-extrabold">Instant Delivery</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Example Pricing Box - Eliminates All Confusion */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase text-emerald-400 tracking-wider">Example Pricing Calculation</span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              TOEFL Exam Booking: ₹18,000 → <span className="text-emerald-400">₹14,198 Total</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Official TOEFL Fee (₹18,000) minus Testly Voucher Discount (₹4,001) + Testly Registration Service (₹199) = <strong>₹14,198 Effective Total</strong>. Direct cash savings of ₹4,001 kept in your pocket!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => onBookService && onBookService('TOEFL')}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <span>Book Service (₹199)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenFreeMock && onOpenFreeMock()}
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-700"
            >
              <span>Try Free Mocks (₹0)</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
