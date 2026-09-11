import React, { useState } from 'react';
import { Sparkles, ArrowRight, TrendingDown, CheckCircle2 } from 'lucide-react';

export default function PriceComparison({ onCheckPrice }) {
  const [activeTest, setActiveTest] = useState('TOEFL');

  const comparisonData = {
    TOEFL: {
      name: 'TOEFL iBT®',
      officialPrice: '₹18,000',
      officialBreakdown: 'Regular Reference Price',
      ourPrice: '₹13,999',
      assistance: '199',
      total: '₹14,198',
      saving: '₹4,001',
      savePercent: 'SAVE ₹4,001',
      tagline: 'Testly Coupon Rate (₹13,999 + ₹199 Service = ₹14,198)'
    },
    GRE: {
      name: 'GRE® General',
      officialPrice: '₹22,550',
      officialBreakdown: 'Regular Reference Price',
      ourPrice: '₹19,999',
      assistance: '199',
      total: '₹20,198',
      saving: '₹2,551',
      savePercent: 'SAVE ₹2,551',
      tagline: 'Testly Coupon Rate (₹19,999 + ₹199 Service = ₹20,198)'
    },
    Duolingo: {
      name: 'Duolingo English',
      officialPrice: '₹5,700',
      officialBreakdown: 'Regular Reference Price',
      ourPrice: '₹4,999',
      assistance: '199',
      total: '₹5,198',
      saving: '₹701',
      savePercent: 'SAVE ₹701',
      tagline: 'Testly Coupon Rate (₹4,999 + ₹199 Service = ₹5,198)'
    },
    PTE: {
      name: 'PTE Academic',
      officialPrice: '₹18,900',
      officialBreakdown: 'Regular Reference Price',
      ourPrice: '₹14,999',
      assistance: '199',
      total: '₹15,198',
      saving: '₹3,901',
      savePercent: 'SAVE ₹3,901',
      tagline: 'Testly Coupon Rate (₹14,999 + ₹199 Service = ₹15,198)'
    },
    IELTS: {
      name: 'IELTS Academic',
      officialPrice: '₹17,000',
      officialBreakdown: 'Regular Reference Price',
      ourPrice: '₹14,999',
      assistance: '199',
      total: '₹15,198',
      saving: '₹2,001',
      savePercent: 'SAVE ₹2,001',
      tagline: 'Testly Coupon Rate (₹14,999 + ₹199 Service = ₹15,198)'
    },
    GMAT: {
      name: 'GMAT Focus',
      officialPrice: '₹24,800',
      officialBreakdown: 'Regular Reference Price',
      ourPrice: '₹21,999',
      assistance: '199',
      total: '₹22,198',
      saving: '₹2,801',
      savePercent: 'SAVE ₹2,801',
      tagline: 'Testly Coupon Rate (₹21,999 + ₹199 Service = ₹22,198)'
    },
    LSAT: {
      name: 'LSAT Law',
      officialPrice: '₹18,000',
      officialBreakdown: 'Regular Reference Price',
      ourPrice: '₹15,999',
      assistance: '199',
      total: '₹16,198',
      saving: '₹2,001',
      savePercent: 'SAVE ₹2,001',
      tagline: 'Testly Coupon Rate (₹15,999 + ₹199 Service = ₹16,198)'
    }
  };

  const current = comparisonData[activeTest];

  return (
    <section className="py-14 bg-white border-y border-[#E5EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Box */}
        <div className="bg-[#F7FAFF] rounded-3xl p-6 sm:p-10 border border-[#E5EAF2] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Header Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-[#EAF8F0] border border-[#18A957]/30 px-3 py-1 rounded-full text-xs font-bold text-[#18A957]">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>MAXIMUM OFFICIAL MARKET PRICE COMPARISON</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#102A56] tracking-tight">
                Why pay full retail + GST?
              </h2>

              <p className="text-base font-bold text-[#102A56]">
                Maximum Official Checkout Rates vs. Testly Available Price
              </p>

              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                Official checkout costs <strong className="text-[#102A56]">₹17,999.72</strong> for TOEFL, <strong className="text-[#102A56]">₹18,900.00</strong> for PTE, and <strong className="text-[#102A56]">₹22,550.00</strong> for GRE. With Testly registration assistance (₹199), you save thousands!
              </p>

              {/* Test Selector Tabs */}
              <div className="flex flex-wrap gap-2 pt-2">
                {Object.keys(comparisonData).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTest(key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all ${
                      activeTest === key
                        ? 'bg-[#1769E0] text-white border-[#1769E0] shadow-sm'
                        : 'bg-white text-[#102A56] border-[#E5EAF2] hover:border-[#1769E0]/40'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Price Cards Row */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4 relative">
              
              {/* Card 1: Official Portal Checkout Price with GST */}
              <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2] flex flex-col justify-between space-y-3 shadow-sm">
                <div>
                  <span className="text-xs font-bold text-[#667085] block">Maximum Official Checkout</span>
                  <div className="text-2xl sm:text-3xl font-black text-[#102A56] mt-1 line-through text-opacity-80">
                    {current.officialPrice}
                  </div>
                  <span className="text-[10px] text-[#667085] block mt-1">{current.officialBreakdown}</span>
                </div>
                <p className="text-[11px] text-[#667085] pt-2 border-t border-[#E5EAF2]">
                  Maximum official provider retail checkout
                </p>
              </div>

              {/* Card 2: Testly Available Price */}
              <div className="bg-[#EAF8F0] rounded-2xl p-5 border-2 border-[#18A957] flex flex-col justify-between space-y-3 shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#18A957]">Testly Offer</span>
                  <span className="text-[9px] font-extrabold bg-[#18A957] text-white px-2 py-0.5 rounded-full uppercase">
                    Available Rate
                  </span>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-[#18A957] mt-1">
                    {current.ourPrice}
                  </div>
                  <span className="text-[10px] text-[#18A957] font-bold block mt-1">+ ₹{current.assistance} specialist assistance</span>
                </div>
                <p className="text-[11px] font-semibold text-[#18A957] pt-2 border-t border-[#18A957]/20">
                  Total Payable: {current.total}
                </p>
              </div>

              {/* Card 3: You Save */}
              <div className="bg-[#FFF4C2] rounded-2xl p-5 border border-[#FFF4C2] flex flex-col justify-between space-y-3 shadow-sm relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#102A56]">Your Net Savings</span>
                  <span className="text-[10px] font-extrabold bg-[#102A56] text-[#FFF4C2] px-2 py-0.5 rounded-full">
                    {current.savePercent}
                  </span>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-[#102A56] tracking-tight">
                    Save {current.saving}
                  </div>
                  <span className="text-[10px] text-[#102A56]/80 font-bold block mt-1">Direct money kept in your bank account</span>
                </div>
                <p className="text-[11px] font-semibold text-[#102A56]/80 pt-2 border-t border-[#102A56]/10">
                  {current.tagline}
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
