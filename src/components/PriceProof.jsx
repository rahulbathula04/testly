import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { ExamLogo } from './ExamLogos';
import { EXAM_OFFERINGS, EXAM_DATA } from '../data/examOfferings';

// Re-export for backward compatibility with other pages
export { EXAM_DATA };

const VERIFIED_DATE = '16 Sep 2026';
const fmt = (n) => '₹' + n.toLocaleString('en-IN');

// Vibrant exam theme configurations
const EXAM_THEMES = {
  GRE: {
    border: 'border-blue-200/90 hover:border-blue-400',
    cardBg: 'bg-gradient-to-b from-blue-50/80 via-white to-blue-50/30',
    accentBar: 'bg-blue-600',
    badgeBg: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    btnBg: 'bg-blue-600 hover:bg-blue-700',
    badgeLabel: 'YOU SAVE',
    badgeValue: '₹6,043',
    subText: 'Verified rate'
  },
  TOEFL: {
    border: 'border-indigo-200/90 hover:border-indigo-400',
    cardBg: 'bg-gradient-to-b from-indigo-50/80 via-white to-violet-50/30',
    accentBar: 'bg-indigo-600',
    badgeBg: 'bg-gradient-to-r from-indigo-600 to-violet-600',
    btnBg: 'bg-indigo-600 hover:bg-indigo-700',
    badgeLabel: 'YOU SAVE',
    badgeValue: '₹4,000',
    subText: 'Verified rate'
  },
  PTE: {
    border: 'border-cyan-200/90 hover:border-cyan-400',
    cardBg: 'bg-gradient-to-b from-cyan-50/80 via-white to-sky-50/30',
    accentBar: 'bg-cyan-600',
    badgeBg: 'bg-gradient-to-r from-cyan-600 to-blue-600',
    btnBg: 'bg-cyan-600 hover:bg-cyan-700',
    badgeLabel: 'YOU SAVE',
    badgeValue: '₹3,901',
    subText: 'Pearson auth'
  },
  Duolingo: {
    border: 'border-emerald-200/90 hover:border-emerald-400',
    cardBg: 'bg-gradient-to-b from-emerald-50/80 via-white to-lime-50/30',
    accentBar: 'bg-emerald-500',
    badgeBg: 'bg-gradient-to-r from-emerald-600 to-teal-600',
    btnBg: 'bg-emerald-600 hover:bg-emerald-700',
    badgeLabel: 'CONCIERGE DESK',
    badgeValue: 'Tech Audit Included',
    subText: 'Home setup'
  },
  IELTS: {
    border: 'border-rose-200/90 hover:border-rose-400',
    cardBg: 'bg-gradient-to-b from-rose-50/80 via-white to-red-50/30',
    accentBar: 'bg-rose-600',
    badgeBg: 'bg-gradient-to-r from-rose-600 to-red-600',
    btnBg: 'bg-rose-600 hover:bg-rose-700',
    badgeLabel: 'OFFICIAL DESK',
    badgeValue: 'Zero-Error Booking',
    subText: 'IDP Center'
  },
  GMAT: {
    border: 'border-amber-200/90 hover:border-amber-400',
    cardBg: 'bg-gradient-to-b from-amber-50/80 via-white to-orange-50/30',
    accentBar: 'bg-amber-500',
    badgeBg: 'bg-gradient-to-r from-amber-600 to-orange-600',
    btnBg: 'bg-amber-600 hover:bg-amber-700',
    badgeLabel: 'EXECUTIVE DESK',
    badgeValue: 'B-School Slot Match',
    subText: 'Focus Edition'
  }
};

export default function PriceProof({ onBookTest }) {
  const exams = Object.values(EXAM_DATA);

  return (
    <section id="savings" className="py-10 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Compact Colorful Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold border border-emerald-300 mb-1.5 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Institutional Rates & Concierge Desk
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Pay More for Your Exam?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
              Check your current exam price, see what you save, and get professional registration assistance from Testly for ₹199.
            </p>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-slate-500 italic block">
              Same official test slot. Lower out-of-pocket price.
            </span>
          </div>
        </div>

        {/* 6-Across Small & Colorful Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {exams.map((exam) => {
            const theme = EXAM_THEMES[exam.id] || EXAM_THEMES.GRE;
            const isSavings = exam.category === 'SAVINGS_HERO';

            return (
              <div
                key={exam.id}
                onClick={() => onBookTest(exam.id)}
                className={`group relative ${theme.cardBg} ${theme.border} border rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden`}
              >
                {/* Top Colorful Accent Strip */}
                <div className={`absolute top-0 inset-x-0 h-1 ${theme.accentBar}`} />

                {/* Card Top: Logo & Provider Tag */}
                <div className="space-y-2 pt-1">
                  <div className="h-7 flex items-center justify-between">
                    <ExamLogo examId={exam.id} className="h-6 max-w-[90px]" />
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                      {theme.subText}
                    </span>
                  </div>

                  {/* Regular Price */}
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      {isSavings ? 'Regular Price*' : 'Official Fee'}
                    </p>
                    <p className={`text-xs font-semibold ${isSavings ? 'line-through text-slate-400' : 'text-slate-500'}`}>
                      {fmt(exam.refPrice)}
                    </p>
                  </div>

                  {/* Testly Price */}
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] font-black uppercase tracking-wider text-slate-600">
                        Testly Price
                      </p>
                      <span className="text-[8px] font-black text-slate-500 bg-white/90 border border-slate-200 px-1 rounded shadow-2xs">
                        +₹199
                      </span>
                    </div>
                    <p className="text-[18px] sm:text-[20px] font-black text-slate-900 tracking-tight leading-tight mt-0.5">
                      {fmt(exam.testlyPrice)}
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Colorful Badge & CTA */}
                <div className="space-y-2 pt-3">
                  {/* Vibrant Pill */}
                  <div className={`${theme.badgeBg} text-white rounded-xl px-2 py-1.5 text-center shadow-xs`}>
                    <p className="text-[8px] font-extrabold uppercase tracking-wider opacity-90 leading-none">
                      {theme.badgeLabel}
                    </p>
                    <p className="text-[13px] font-black tracking-tight leading-tight mt-0.5">
                      {theme.badgeValue}
                    </p>
                  </div>

                  {/* Compact Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookTest(exam.id);
                    }}
                    className={`w-full py-1.5 px-2 rounded-lg text-white text-[11px] font-bold ${theme.btnBg} transition-all flex items-center justify-center gap-1 shadow-2xs group-hover:brightness-110`}
                  >
                    <span>Book {exam.label}</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Compact Footer Line */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-slate-400 pt-1">
          <p>
            * Reference prices based on official provider rates in India. Registration performed by verified Testly professionals.
          </p>
          <p className="font-mono text-slate-400 shrink-0">
            Price verified: {VERIFIED_DATE}
          </p>
        </div>

      </div>
    </section>
  );
}
