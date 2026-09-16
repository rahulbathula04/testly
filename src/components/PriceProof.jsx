import React from 'react';
import { ArrowRight, ShieldCheck, FileText, Headphones, IndianRupee, Sparkles } from 'lucide-react';
import {
  EtsGreLogo,
  EtsToeflLogo,
  PteLogo,
  DuolingoLogo,
  IeltsLogo,
  GmatLogo,
  SatLogo,
  LsatLogo
} from './ExamLogos';
import { EXAM_DATA } from '../data/examOfferings';

// Re-export EXAM_DATA for backward compatibility
export { EXAM_DATA };

export default function PriceProof({ onBookTest, onOpenAgreement }) {
  const popularExams = [
    {
      id: 'GRE',
      title: 'GRE',
      logo: <EtsGreLogo className="h-6" />,
      popular: true,
      refPrice: 26542,
      testlyPrice: 20499,
      saving: 6043,
      btnText: 'Book GRE with Testly'
    },
    {
      id: 'TOEFL',
      title: 'TOEFL',
      logo: <EtsToeflLogo className="h-6" />,
      popular: false,
      refPrice: 17999,
      testlyPrice: 13999,
      saving: 4000,
      btnText: 'Book TOEFL with Testly'
    },
    {
      id: 'PTE',
      title: 'PTE',
      logo: <PteLogo className="h-6" />,
      popular: false,
      refPrice: 18900,
      testlyPrice: 14999,
      saving: 3901,
      btnText: 'Book PTE with Testly'
    },
    {
      id: 'Duolingo',
      title: 'DET',
      logo: <DuolingoLogo className="h-6" />,
      popular: false,
      refPrice: 5800,
      testlyPrice: 5499,
      saving: 301,
      btnText: 'Book DET with Testly'
    }
  ];

  return (
    <section id="pricing" className="py-10 bg-white border-b border-slate-200/80 font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-9">

        {/* ── 1. Top Logo Strip: EXAMS WE SUPPORT ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-4 rounded-2xl bg-slate-50/60 border border-slate-200/60">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#1E40AF] text-[10.5px] font-black uppercase tracking-wider shrink-0 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>EXAMS WE SUPPORT</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8 opacity-85 hover:opacity-100 transition-opacity">
            <div className="hover:scale-105 transition-transform"><EtsGreLogo className="h-5" /></div>
            <div className="hover:scale-105 transition-transform"><EtsToeflLogo className="h-5" /></div>
            <div className="hover:scale-105 transition-transform"><PteLogo className="h-5" /></div>
            <div className="hover:scale-105 transition-transform"><DuolingoLogo className="h-5" /></div>
            <div className="hover:scale-105 transition-transform"><IeltsLogo className="h-5" /></div>
            <div className="hover:scale-105 transition-transform"><GmatLogo className="h-5" /></div>
            <div className="hover:scale-105 transition-transform"><SatLogo className="h-5" /></div>
            <div className="hover:scale-105 transition-transform"><LsatLogo className="h-5" /></div>
            <span className="text-xs font-semibold text-slate-400 italic">and more...</span>
          </div>
        </div>

        {/* ── 2. Today's Exam Prices: Left Summary + 4 Cards Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Summary Box (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-between p-3 rounded-2xl bg-slate-50/50 border border-slate-200/60 space-y-4">
            <div className="space-y-3">
              <span className="inline-block text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/80">
                POPULAR EXAMS
              </span>

              <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Today's<br />Exam Prices
              </h2>

              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Latest verified prices with Testly advantages. Save more, stress less.
              </p>

              <div className="pt-2 space-y-1.5 border-t border-slate-200/60 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Instant slot availability check</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Zero hidden payment gateway fees</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onBookTest('GRE')}
              className="inline-flex items-center gap-1.5 text-xs font-black text-blue-700 hover:text-blue-900 transition-colors pt-2 group cursor-pointer"
            >
              <span>View All Exams & Fee Breakdown</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right 4 Cards (9 cols: 4 across on desktop) - Exact Signature Price Card from Brand Guide */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {popularExams.map((ex) => (
              <div
                key={ex.id}
                className={`bg-white rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 relative shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)] ${
                  ex.popular
                    ? 'border-2 border-[#1E3A8A] ring-2 ring-[#3B82F6]/10'
                    : 'border border-[#E5E7EB] hover:border-[#BFDBFE]'
                }`}
              >
                <div className="space-y-4">
                  {/* Card Header: Logo + POPULAR */}
                  <div className="flex items-center justify-between min-h-[32px]">
                    <div className="shrink-0">{ex.logo}</div>
                    {ex.popular && (
                      <span className="text-[9.5px] font-semibold px-2 py-0.5 rounded-full bg-[#EBF3FF] text-[#1E3A8A] border border-[#BFDBFE] tracking-wide uppercase">
                        Most Popular
                      </span>
                    )}
                  </div>

                  {/* Reference Price */}
                  <div>
                    <span className="text-xs font-medium text-[#94A3B8] line-through">
                      ₹{ex.refPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] font-medium ml-1.5">ref. price</span>
                  </div>

                  {/* Testly Price + small inline savings chip */}
                  <div className="space-y-1.5">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-[26px] font-black text-[#0F172A] tracking-tight leading-none">
                        ₹{ex.testlyPrice.toLocaleString('en-IN')}
                      </span>
                      {/* Subtle amber savings chip — NOT a big box */}
                      <span className="text-[10px] font-semibold text-[#B45309] bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded-md">
                        −₹{ex.saving.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#64748B] font-medium uppercase tracking-wider">
                      Testly Price
                    </span>
                  </div>

                  {/* Quiet single-line service note */}
                  <div className="flex items-center gap-1.5 text-[10.5px] text-[#64748B]">
                    <svg className="w-3 h-3 text-[#3B82F6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Incl. registration assistance · ₹199</span>
                  </div>

                  {/* Verification note */}
                  <div className="text-[9px] text-[#94A3B8] font-medium">
                    Price verified · 16 Sep 2026
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4 mt-2 border-t border-[#F1F5F9]">
                  <button
                    onClick={() => onBookTest(ex.id)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs hover:shadow group cursor-pointer active:scale-[0.98]"
                  >
                    <span>Check My Savings</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#93C5FD] group-hover:text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── 3. + ₹199 Professional Service Banner Strip ── */}
        <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-blue-50/90 border border-blue-200/90 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-black uppercase tracking-wide shrink-0 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>+ ₹199 Professional Service</span>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Registration assistance by Testly Professionals. We audit your passport details, book preferred test slots, and handle the entire process.
            </p>
          </div>

          <button
            onClick={() => onOpenAgreement ? onOpenAgreement() : onBookTest('GRE')}
            className="text-xs font-black text-blue-700 hover:text-blue-900 transition-colors shrink-0 flex items-center gap-1 self-end sm:self-auto group cursor-pointer"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* ── 4. Four Value Pillars Horizontal Strip ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          
          <div className="p-3.5 rounded-2xl bg-slate-50/60 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Expert Registration Support
              </h4>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                From account setup to confirmation
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50/60 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Passport & Details Verification
              </h4>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                Avoid costly name-mismatch errors
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50/60 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
              <span className="font-black text-base">₹</span>
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Best Available Prices
              </h4>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                Through verified corporate channels
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50/60 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Dedicated Human Support
              </h4>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                Real exam officers, not chatbots
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
