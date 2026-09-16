import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ExamLogo } from './ExamLogos';

// ─── Single source of truth for exam pricing ───────────────────────────────
export const EXAM_DATA = {
  GRE:     { id:'GRE',     label:'GRE',     refPrice:26500, testlyPrice:19000, saving:7500 },
  TOEFL:   { id:'TOEFL',   label:'TOEFL',   refPrice:24900, testlyPrice:18500, saving:6400 },
  IELTS:   { id:'IELTS',   label:'IELTS',   refPrice:17000, testlyPrice:13000, saving:4000 },
  PTE:     { id:'PTE',     label:'PTE',     refPrice:18000, testlyPrice:13500, saving:4500 },
  Duolingo:{ id:'Duolingo', label:'Duolingo', refPrice:6300,  testlyPrice:4500,  saving:1800 },
  GMAT:    { id:'GMAT',    label:'GMAT',    refPrice:28000, testlyPrice:22000, saving:6000 },
};

const VERIFIED_DATE = '16 Sep 2026';

const fmt = (n) => '₹' + n.toLocaleString('en-IN');

export default function PriceProof({ onBookTest }) {
  const exams = Object.values(EXAM_DATA);

  return (
    <section id="savings" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Why Pay More for Your Exam?
            </h2>
            <p className="text-[15px] text-slate-500 font-medium mt-1">
              See exactly what you can save before you book.
            </p>
          </div>
          <p className="text-sm text-slate-400 italic text-right whitespace-nowrap">
            Same official exam.<br className="hidden sm:block" /> Lower price with Testly.
          </p>
        </div>

        {/* Exam Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {exams.map((exam) => (
            <button
              key={exam.id}
              onClick={() => onBookTest(exam.id)}
              className="bg-white border border-slate-200 rounded-xl p-4 text-left hover:border-slate-400 hover:shadow-md transition-all space-y-3.5 group"
            >
              {/* Real Official Exam Logo */}
              <div className="h-8 flex items-center">
                <ExamLogo examId={exam.id} className="h-7" />
              </div>

              {/* Regular price */}
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">Regular Price*</p>
                <p className="text-sm font-semibold text-slate-400 line-through mt-0.5">{fmt(exam.refPrice)}</p>
              </div>

              {/* Testly price */}
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">Testly Price</p>
                <p className="text-[17px] font-black text-slate-900 mt-0.5">{fmt(exam.testlyPrice)}</p>
              </div>

              {/* Saving badge */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-2">
                <p className="text-[9px] font-bold uppercase tracking-wider text-amber-700">You Save</p>
                <p className="text-[17px] font-black text-slate-900">{fmt(exam.saving)}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Footer row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-0.5">
            <p className="text-[11px] text-slate-400">
              * Reference prices may vary based on test location and type. Please check the latest price for your specific location.
            </p>
            <p className="text-[11px] text-slate-300">Price last verified: {VERIFIED_DATE}</p>
          </div>
          <button
            onClick={() => onBookTest('GRE')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 border border-slate-300 hover:border-slate-600 px-4 py-2 rounded-md transition-colors whitespace-nowrap"
          >
            Find My Exam <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
