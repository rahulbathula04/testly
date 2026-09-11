import React from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Award, FileCheck, MapPin, Sparkles } from 'lucide-react';

export default function ProfessionalServices({ onBookService }) {
  const servicePillars = [
    {
      title: 'Official Exam Voucher Procurement',
      saving: 'Save Up To ₹4,001 Direct Cash',
      desc: 'Official test vouchers sourced at exclusive student prices for TOEFL (₹13,999), GRE (₹19,999), DET (₹4,999), and PTE (₹14,999).',
      badge: 'PROCURMENT SERVICE',
      icon: Award
    },
    {
      title: 'Indian Passport Compliance & Name Audit',
      saving: 'Protects ₹20,000+ Exam Fee',
      desc: 'Specialist audit of Given Name & Surname formatting against ETS, IDP, Pearson, and GMAC guidelines to prevent test-day rejection.',
      badge: 'LEGAL VERIFICATION',
      icon: FileCheck
    },
    {
      title: 'Hyderabad Begumpet & Madhapur Concierge',
      saving: 'Priority Emergency Seats',
      desc: 'Real-time monitoring of local exam center availability (Begumpet, Madhapur, Hitec City) with instant WhatsApp slot alerts.',
      badge: 'SLOT CONCIERGE',
      icon: MapPin
    },
    {
      title: 'Free Practice Portal & Score Analytics',
      saving: 'Saves ₹25,000 Coaching Fees',
      desc: 'Full-length adaptive IRT mock tests, instant section scoring, and personalized score improvement drills included 100% free.',
      badge: 'FREE PORTAL INCLUDED',
      icon: Sparkles
    }
  ];

  return (
    <section id="professional-services" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Section Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Testly Advisory Suite • Services Start at ₹199</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Professional Advisory Services. <br />
            <span className="text-blue-600">Pure Minimal Efficiency.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Testly delivers end-to-end candidate registration advisory, passport verification, official voucher discounts, and unlimited practice tools — starting at just <strong className="text-slate-900">₹199</strong>.
          </p>
        </div>

        {/* 4 Minimal Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {servicePillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all hover:shadow-md flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                      {p.badge}
                    </span>
                    <span className="text-xs font-bold text-emerald-600">{p.saving}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900">{p.title}</h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed pl-13">{p.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Included in ₹199 Service Plan</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimal Bottom CTA Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">Candidate Advisory</span>
            <h3 className="text-2xl font-black text-white">
              Official Voucher Discounts + ₹199 Advisory Plan
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Join 14,200+ Indian candidates enjoying 100% error-free registration and direct voucher savings.
            </p>
          </div>

          <button
            onClick={() => onBookService && onBookService('TOEFL')}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0"
          >
            <span>Book Service (₹199)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
