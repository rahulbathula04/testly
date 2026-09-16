import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { ExamLogo } from './ExamLogos';
import { EXAM_OFFERINGS } from '../data/examOfferings';

// ─── Single source of truth derived strictly from exam_offerings ───────────
export const EXAM_DATA = {
  GRE:     { id:'GRE',     label:'GRE',     refPrice: EXAM_OFFERINGS.GRE.reference_price,     testlyPrice: EXAM_OFFERINGS.GRE.testly_price,     saving: EXAM_OFFERINGS.GRE.saving },
  TOEFL:   { id:'TOEFL',   label:'TOEFL',   refPrice: EXAM_OFFERINGS.TOEFL.reference_price,   testlyPrice: EXAM_OFFERINGS.TOEFL.testly_price,   saving: EXAM_OFFERINGS.TOEFL.saving },
  IELTS:   { id:'IELTS',   label:'IELTS',   refPrice: EXAM_OFFERINGS.IELTS.reference_price,   testlyPrice: EXAM_OFFERINGS.IELTS.testly_price,   saving: EXAM_OFFERINGS.IELTS.saving },
  PTE:     { id:'PTE',     label:'PTE',     refPrice: EXAM_OFFERINGS.PTE.reference_price,     testlyPrice: EXAM_OFFERINGS.PTE.testly_price,     saving: EXAM_OFFERINGS.PTE.saving },
  Duolingo:{ id:'Duolingo', label:'Duolingo', refPrice: EXAM_OFFERINGS.Duolingo.reference_price, testlyPrice: EXAM_OFFERINGS.Duolingo.testly_price, saving: EXAM_OFFERINGS.Duolingo.saving },
  GMAT:    { id:'GMAT',    label:'GMAT',    refPrice: EXAM_OFFERINGS.GMAT.reference_price,    testlyPrice: EXAM_OFFERINGS.GMAT.testly_price,    saving: EXAM_OFFERINGS.GMAT.saving },
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
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Institutional Booking Pricing
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Why Pay More for Your Exam?
            </h2>
            <p className="text-[15px] text-slate-600 font-medium mt-1">
              Check your current exam price, see what you save, and get professional registration assistance for ₹199.
            </p>
          </div>
          <p className="text-sm text-slate-500 italic text-right whitespace-nowrap">
            Same official test slot.<br className="hidden sm:block" /> Lower out-of-pocket price.
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
