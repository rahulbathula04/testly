import React, { useState } from 'react';
import { Sparkles, CheckCircle2, BookOpen, Award, FileCheck, ArrowRight, Zap } from 'lucide-react';

export default function ExpressMockBundle({ onBookBundle }) {
  const [selectedBundle, setSelectedBundle] = useState('bundle'); // 'setup' | 'bundle'

  return (
    <section className="py-14 bg-white border-b border-[#E5EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-[#102A56] via-[#1769E0] to-[#102A56] rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFF4C2]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="space-y-6 relative z-10">
            
            {/* Header */}
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-black uppercase bg-[#FFF4C2] text-[#102A56] px-3 py-1 rounded-full inline-block">
                HIGH VALUE UPSELL BUNDLE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Add Express Mock Tests & Score Booster
              </h2>
              <p className="text-xs sm:text-sm text-white/80">
                Get your ₹199 1-on-1 registration setup plus 3 official-format mock exams for just ₹499 extra!
              </p>
            </div>

            {/* 2 Package Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Package 1: Setup Only */}
              <div 
                onClick={() => setSelectedBundle('setup')}
                className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedBundle === 'setup'
                    ? 'bg-white text-[#102A56] border-[#FFF4C2] shadow-xl'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider">OPTION 1</span>
                  {selectedBundle === 'setup' && <CheckCircle2 className="w-5 h-5 text-[#1769E0]" />}
                </div>

                <h3 className="text-xl font-black">Registration Setup Only</h3>
                <div className="text-2xl font-black mt-1">₹199</div>
                <p className="text-xs mt-2 opacity-80">1-on-1 Specialist Assistance (Mon–Thu, 9 AM – 9 PM)</p>

                <ul className="mt-4 space-y-2 text-xs">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#18A957]" />
                    <span>1-on-1 Specialist Consultation Call</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#18A957]" />
                    <span>Account Creation & Privacy Security</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#18A957]" />
                    <span>Lower Price Voucher Booking</span>
                  </li>
                </ul>
              </div>

              {/* Package 2: Registration + Express Mocks Bundle */}
              <div 
                onClick={() => setSelectedBundle('bundle')}
                className={`p-6 rounded-2xl border-2 transition-all cursor-pointer relative ${
                  selectedBundle === 'bundle'
                    ? 'bg-white text-[#102A56] border-[#18A957] shadow-2xl ring-4 ring-[#18A957]/30 scale-[1.02]'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
                }`}
              >
                <div className="absolute -top-3 right-4 bg-[#18A957] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  MOST POPULAR (SAVE 60%)
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#18A957]">OPTION 2 (BEST VALUE)</span>
                  {selectedBundle === 'bundle' && <CheckCircle2 className="w-5 h-5 text-[#18A957]" />}
                </div>

                <h3 className="text-xl font-black">Setup + Express Mock Bundle</h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-[#102A56]">₹698</span>
                  <span className="text-xs line-through opacity-60">₹1,499</span>
                  <span className="text-[10px] font-bold text-[#18A957] bg-[#EAF8F0] px-2 py-0.5 rounded-full">
                    (₹199 Setup + ₹499 Mocks)
                  </span>
                </div>

                <p className="text-xs mt-2 opacity-80">1-on-1 Registration Setup + 3 Full Official Mock Exams</p>

                <ul className="mt-4 space-y-2 text-xs">
                  <li className="flex items-center gap-2 font-bold text-[#18A957]">
                    <Zap className="w-3.5 h-3.5 text-[#18A957]" />
                    <span>Includes Everything in ₹199 Setup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileCheck className="w-3.5 h-3.5 text-[#18A957]" />
                    <span>3 Full-Length Official Format Mock Exams</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#18A957]" />
                    <span>Instant AI Score Analysis & Explanations</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Action CTA */}
            <div className="pt-2 text-center">
              <button
                onClick={() => onBookBundle(selectedBundle === 'bundle' ? 'TOEFL_BUNDLE' : 'TOEFL')}
                className="bg-[#18A957] hover:bg-white hover:text-[#102A56] text-white font-extrabold text-base py-4 px-8 rounded-xl shadow-xl transition-all inline-flex items-center gap-3 transform hover:-translate-y-0.5"
              >
                <span>BOOK {selectedBundle === 'bundle' ? 'SETUP + EXPRESS MOCK BUNDLE (₹698)' : '₹199 SETUP ONLY'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
