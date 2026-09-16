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
        <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-slate-100">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#1E40AF] text-[11px] font-black uppercase tracking-wider shrink-0">
            EXAMS WE SUPPORT
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8 opacity-90">
            <EtsGreLogo className="h-5" />
            <EtsToeflLogo className="h-5" />
            <PteLogo className="h-5" />
            <DuolingoLogo className="h-5" />
            <IeltsLogo className="h-5" />
            <GmatLogo className="h-5" />
            <SatLogo className="h-5" />
            <LsatLogo className="h-5" />
            <span className="text-xs font-semibold text-slate-400 italic">and more...</span>
          </div>
        </div>

        {/* ── 2. Today's Exam Prices: Left Summary + 4 Cards Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Summary Box (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-between p-2 space-y-4">
            <div className="space-y-3">
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                POPULAR EXAMS
              </span>

              <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Today's<br />Exam Prices
              </h2>

              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Latest verified prices with Testly advantages. Save more, stress less.
              </p>
            </div>

            <button
              onClick={() => onBookTest('GRE')}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors pt-2 group"
            >
              <span>View All Exams</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Right 4 Cards (9 cols: 4 across on desktop) */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {popularExams.map((ex) => (
              <div
                key={ex.id}
                className="bg-white border border-slate-200 rounded-2xl p-4.5 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative"
              >
                <div className="space-y-3">
                  {/* Card Header: Logo & Badge */}
                  <div className="flex items-center justify-between min-h-[32px]">
                    <div className="shrink-0">{ex.logo}</div>
                    {ex.popular && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                        Most Popular
                      </span>
                    )}
                  </div>

                  {/* Original Strike Price */}
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wide">
                      Original Price
                    </span>
                    <span className="text-xs font-medium text-slate-400 line-through">
                      ₹{ex.refPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Testly Price & Saving Badge */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">
                      Testly Price
                    </span>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-2xl font-black text-slate-900 tracking-tight">
                        ₹{ex.testlyPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        You Save ₹{ex.saving.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Booking Button */}
                <div className="pt-4 mt-2 border-t border-slate-100">
                  <button
                    onClick={() => onBookTest(ex.id)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#0F1D38] hover:bg-[#1A2E56] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs group"
                  >
                    <span>{ex.btnText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── 3. + ₹199 Professional Service Banner Strip ── */}
        <div className="bg-[#EEF4FF] border border-[#D8E6FD] rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wide shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
              <span>+ ₹199 Professional Service</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Registration assistance by Testly Professionals. We handle the process, you focus on your goals.
            </p>
          </div>

          <button
            onClick={() => onOpenAgreement ? onOpenAgreement() : onBookTest('GRE')}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors shrink-0 flex items-center gap-1 self-end sm:self-auto"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ── 4. Four Value Pillars Horizontal Strip ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
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

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Passport & Details Verification
              </h4>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                Avoid costly mistakes
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
              <span className="font-black text-base">₹</span>
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Best Available Prices
              </h4>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                Through verified channels
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Dedicated Human Support
              </h4>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                Real people, not bots
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
