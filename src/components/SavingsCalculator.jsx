import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, DollarSign } from 'lucide-react';

export default function SavingsCalculator({ onBookTest }) {
  const [selectedExam, setSelectedExam] = useState('GRE');

  const examData = {
    TOEFL: { name: 'TOEFL iBT® Test', regularPrice: 18000, couponPrice: 13999, voucherSaving: 4001, serviceFee: 199, effectiveTotal: 14198 },
    GRE: { name: 'GRE® General Test', regularPrice: 22550, couponPrice: 19999, voucherSaving: 2551, serviceFee: 199, effectiveTotal: 20198 },
    DET: { name: 'Duolingo English Test', regularPrice: 5700, couponPrice: 4999, voucherSaving: 701, serviceFee: 199, effectiveTotal: 5198 },
    PTE: { name: 'PTE Academic', regularPrice: 18900, couponPrice: 14999, voucherSaving: 3901, serviceFee: 199, effectiveTotal: 15198 },
    IELTS: { name: 'IELTS Academic', regularPrice: 17000, couponPrice: 14999, voucherSaving: 2001, serviceFee: 199, effectiveTotal: 15198 },
    GMAT: { name: 'GMAT Focus Edition', regularPrice: 24800, couponPrice: 21999, voucherSaving: 2801, serviceFee: 199, effectiveTotal: 22198 },
    LSAT: { name: 'LSAT Law Test', regularPrice: 18000, couponPrice: 15999, voucherSaving: 2001, serviceFee: 199, effectiveTotal: 16198 },
  };

  const current = examData[selectedExam] || examData.TOEFL;

  return (
    <section id="pricing" className="py-16 bg-white border-b border-[#E5EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#18A957]/10 text-[#18A957] border border-[#18A957]/30 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Zap className="w-4 h-4 fill-[#18A957]" />
            <span>TRANSPARENT SAVINGS & EFFECTIVE TOTAL CALCULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#102A56] tracking-tight leading-tight">
            See Your Exact Savings & Effective Total.
          </h2>
          <p className="text-base sm:text-lg text-[#667085] font-semibold leading-relaxed">
            Get official test vouchers through authorized institutional fee schedules + ₹199 guided registration support with calibrated diagnostic assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Savings Comparison */}
          <div className="lg:col-span-8 bg-[#F7FAFF] rounded-3xl p-6 sm:p-8 border border-[#E5EAF2] space-y-6 flex flex-col justify-between">
            
            {/* Exam Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5EAF2]">
              <label className="text-xs font-black text-[#102A56] uppercase tracking-wider">Select your exam</label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="bg-white border border-[#E5EAF2] rounded-xl px-4 py-2.5 text-sm font-extrabold text-[#102A56] outline-none cursor-pointer shadow-xs"
              >
                {Object.keys(examData).map((key) => (
                  <option key={key} value={key}>{examData[key].name}</option>
                ))}
              </select>
            </div>

            {/* Comparison Rows */}
            <div className="space-y-4">
              
              {/* Row 1: Test Voucher Pricing */}
              <div className="bg-white p-4 rounded-2xl border border-[#E5EAF2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#667085] uppercase">Exam Voucher / Institutional Fee</span>
                  <p className="text-sm font-black text-[#102A56]">{current.name} Official Voucher</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through block">Regular Price: ₹{current.regularPrice.toLocaleString('en-IN')}</span>
                  <span className="text-base font-black text-[#18A957]">Coupon Price: ₹{current.couponPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Row 2: Service Fee */}
              <div className="bg-white p-4 rounded-2xl border border-[#E5EAF2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#667085] uppercase">Registration & Passport Name Verification</span>
                  <p className="text-sm font-black text-[#102A56]">Testly Professional Service Fee</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Flat Service Charge</span>
                  <span className="text-base font-black text-[#1769E0]">+ ₹{current.serviceFee}</span>
                </div>
              </div>

              {/* Row 3: Free Practice Mocks */}
              <div className="bg-white p-4 rounded-2xl border border-[#E5EAF2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#667085] uppercase">Practice Engine & Mock Tests</span>
                  <p className="text-sm font-black text-[#102A56]">Unlimited Realistic Exam Simulators</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through block">Institute Fee: ₹25,000</span>
                  <span className="text-base font-black text-[#18A957]">INCLUDED FREE (₹0)</span>
                </div>
              </div>

            </div>

            {/* Big Green Savings Summary Box */}
            <div className="bg-[#EAF8F0] p-6 rounded-2xl border border-[#18A957]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase text-[#18A957] tracking-wider block">Student Effective Total</span>
                <div className="text-2xl sm:text-3xl font-black text-[#18A957]">
                  ₹{current.couponPrice.toLocaleString('en-IN')} + ₹199 = <span className="underline">₹{current.effectiveTotal.toLocaleString('en-IN')}</span>
                </div>
                <span className="text-xs font-bold text-[#18A957] block mt-0.5">
                  🎉 You save ₹{current.voucherSaving.toLocaleString('en-IN')} directly on exam vouchers!
                </span>
              </div>

              <button
                onClick={() => onBookTest && onBookTest(selectedExam)}
                className="w-full sm:w-auto bg-[#18A957] hover:bg-[#128342] text-white font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <span>Book Voucher (₹{current.effectiveTotal.toLocaleString('en-IN')})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Value Guarantee Callout */}
          <div className="lg:col-span-4 bg-[#102A56] text-white rounded-3xl p-8 border border-slate-800 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1769E0] text-white flex items-center justify-center shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-black text-white leading-tight">
                {current.name} Pricing Breakdown
              </h3>

              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2 text-xs font-semibold">
                <div className="flex justify-between text-slate-300">
                  <span>Regular Reference Price:</span>
                  <span className="line-through">₹{current.regularPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Testly Coupon Price:</span>
                  <span>₹{current.couponPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Testly Service Fee:</span>
                  <span>+ ₹199</span>
                </div>
                <div className="flex justify-between text-white font-black text-sm pt-2 border-t border-slate-700">
                  <span>Effective Student Total:</span>
                  <span className="text-[#18A957]">₹{current.effectiveTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-bold text-slate-200 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2 text-[#18A957]">
                  <CheckCircle2 className="w-4 h-4 text-[#18A957]" />
                  <span className="font-black">Direct Savings of ₹{current.voucherSaving.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#18A957]" />
                  <span>Unlimited Mock Tests Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#18A957]" />
                  <span>1-on-1 Passport Detail Audit</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onBookTest && onBookTest(selectedExam)}
              className="w-full bg-[#1769E0] hover:bg-white hover:text-[#102A56] text-white font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-md"
            >
              Book {selectedExam} Voucher for ₹{current.effectiveTotal.toLocaleString('en-IN')} →
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
