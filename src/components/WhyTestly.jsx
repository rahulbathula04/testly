import React from 'react';
import { DollarSign, Headset, Layers, ShieldCheck, Globe2 } from 'lucide-react';

export default function WhyTestly() {
  const pillars = [
    {
      icon: DollarSign,
      title: 'Transparent & Low Pricing',
      desc: 'No hidden markup fees. Unlocking authentic promo vouchers that save you up to ₹8,800 per test booking.',
      badge: 'Lowest Rate Guarantee'
    },
    {
      icon: Headset,
      title: 'Certified Specialist Support',
      desc: '1-on-1 human expert booking assistance (Mon–Thu, 9 AM – 9 PM) to ensure zero profile or slot selection errors.',
      badge: '₹199 Service Slot'
    },
    {
      icon: Layers,
      title: 'All-in-One Global Test Hub',
      desc: 'From TOEFL and GRE to PTE, IELTS, GMAT & Duolingo — compare rates, prep, and register on one seamless platform.',
      badge: '7+ Official Tests'
    },
    {
      icon: ShieldCheck,
      title: '100% Official Voucher Guarantee',
      desc: 'Direct ETS, Pearson & GMAC authorization seals ensuring 100% valid code redemption or double money back.',
      badge: 'Zero Risk Assurance'
    },
    {
      icon: Globe2,
      title: 'Built for Global Dreams',
      desc: 'Join 100,000+ students who saved big while securing admissions to top-ranked universities across US, UK, Canada & Australia.',
      badge: '100,000+ Alumni'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-[#E5EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <p className="text-xs font-black uppercase tracking-widest text-[#1769E0]">THE TESTLY ADVANTAGE</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A56] tracking-tight">
            More Than a Test Platform. <br />
            <span className="text-[#1769E0]">A Partner in Your Journey.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#667085] font-medium">
            We engineered Testly to remove financial barriers and technical headaches from study-abroad test preparation and registration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-[#F7FAFF] p-8 rounded-3xl border border-[#E5EAF2] hover:border-[#1769E0]/40 transition-all hover:shadow-xl group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#1769E0]/10 flex items-center justify-center text-[#1769E0] group-hover:bg-[#1769E0] group-hover:text-white transition-all transform group-hover:scale-110">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider bg-white text-[#102A56] px-3 py-1 rounded-full border border-[#E5EAF2] shadow-xs">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#102A56] mb-3 group-hover:text-[#1769E0] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#667085] font-medium leading-relaxed">
                    {item.desc}
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
