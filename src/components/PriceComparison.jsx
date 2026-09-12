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
    <section className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Minimal Container */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Header Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md text-xs font-bold text-emerald-700 uppercase tracking-wider">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>OFFICIAL MARKET PRICE COMPARISON</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Why pay full retail?
              </h2>

              <p className="text-sm font-bold text-slate-700">
                Maximum Official Checkout Rates vs. Testly Savings Rate
              </p>

              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Official checkout costs <strong className="text-slate-900">₹18,000</strong> for TOEFL, <strong className="text-slate-900">₹18,900</strong> for PTE, and <strong className="text-slate-900">₹22,550</strong> for GRE. With Testly registration assistance (₹199), you save up to ₹4,001!
              </p>

              {/* Test Selector Tabs */}
              <div className="flex flex-wrap gap-2 pt-2">
                {Object.keys(comparisonData).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTest(key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      activeTest === key
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Price Cards Row */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4 relative">
              
              {/* Card 1: Official Portal Checkout Price */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-3 shadow-xs">
                <div>
                  <span className="text-xs font-bold text-slate-500 block">Maximum Official Checkout</span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-400 mt-1 line-through">
                    {current.officialPrice}
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-1">{current.officialBreakdown}</span>
                </div>
                <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 font-medium">
                  Standard testing body retail rate
                </p>
              </div>

              {/* Card 2: Testly Rate */}
              <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-300 flex flex-col justify-between space-y-3 shadow-xs relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800">Testly Rate</span>
                  <span className="text-[9px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-md uppercase">
                    Available Rate
                  </span>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-700 mt-1">
                    {current.ourPrice}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold block mt-1">+ ₹{current.assistance} specialist assistance</span>
                </div>
                <p className="text-[11px] font-bold text-emerald-800 pt-2 border-t border-emerald-200/60">
                  Total Payable: {current.total}
                </p>
              </div>

              {/* Card 3: You Save */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-3 shadow-xs relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Your Net Savings</span>
                  <span className="text-[10px] font-bold bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-md">
                    {current.savePercent}
                  </span>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                    Save {current.saving}
                  </div>
                  <span className="text-[10px] text-slate-300 font-medium block mt-1">Direct savings kept in your bank account</span>
                </div>
                <p className="text-[11px] font-medium text-slate-300 pt-2 border-t border-slate-800">
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
