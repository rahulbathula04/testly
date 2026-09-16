import React from 'react';
import { ArrowRight, ShieldCheck, Check, MessageCircle, Lock } from 'lucide-react';
import { ExamLogo } from './ExamLogos';
import { EXAM_OFFERINGS, EXAM_DATA } from '../data/examOfferings';

// Re-export for backward compatibility with other pages
export { EXAM_DATA };

const VERIFIED_DATE = '16 Sep 2026';
const fmt = (n) => '₹' + n.toLocaleString('en-IN');

// Executive Brand Color Themes (Professional, dignified, distinct)
const EXAM_THEMES = {
  GRE: {
    accentTop: 'bg-blue-600',
    hoverBorder: 'hover:border-blue-400',
    tagBg: 'bg-blue-50 text-blue-800 border-blue-200/60',
    badgeBg: 'bg-emerald-50 text-emerald-900 border border-emerald-200/80',
    badgeLabel: 'Save on Exam Fee',
    badgeValue: '₹6,043',
    boardTag: 'ETS Official'
  },
  TOEFL: {
    accentTop: 'bg-indigo-600',
    hoverBorder: 'hover:border-indigo-400',
    tagBg: 'bg-indigo-50 text-indigo-800 border-indigo-200/60',
    badgeBg: 'bg-emerald-50 text-emerald-900 border border-emerald-200/80',
    badgeLabel: 'Save on Exam Fee',
    badgeValue: '₹4,000',
    boardTag: 'ETS Official'
  },
  PTE: {
    accentTop: 'bg-teal-600',
    hoverBorder: 'hover:border-teal-400',
    tagBg: 'bg-teal-50 text-teal-800 border-teal-200/60',
    badgeBg: 'bg-emerald-50 text-emerald-900 border border-emerald-200/80',
    badgeLabel: 'Save on Exam Fee',
    badgeValue: '₹3,901',
    boardTag: 'Pearson VUE'
  },
  Duolingo: {
    accentTop: 'bg-emerald-500',
    hoverBorder: 'hover:border-emerald-400',
    tagBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
    badgeBg: 'bg-blue-50 text-blue-900 border border-blue-200/80',
    badgeLabel: 'Concierge Booking',
    badgeValue: 'Tech Audit Included',
    boardTag: 'Duolingo Inc'
  },
  IELTS: {
    accentTop: 'bg-rose-600',
    hoverBorder: 'hover:border-rose-400',
    tagBg: 'bg-rose-50 text-rose-800 border-rose-200/60',
    badgeBg: 'bg-slate-100 text-slate-800 border border-slate-200/80',
    badgeLabel: 'Official IDP Desk',
    badgeValue: 'Slot Lock Assistance',
    boardTag: 'IDP Education'
  },
  GMAT: {
    accentTop: 'bg-amber-600',
    hoverBorder: 'hover:border-amber-400',
    tagBg: 'bg-amber-50 text-amber-800 border-amber-200/60',
    badgeBg: 'bg-amber-50 text-amber-900 border border-amber-200/80',
    badgeLabel: 'Executive Advisory',
    badgeValue: 'B-School Slot Match',
    boardTag: 'GMAC Focus'
  }
};

export default function PriceProof({ onBookTest }) {
  const exams = Object.values(EXAM_DATA);

  return (
    <section id="savings" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">

        {/* Executive Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-200/80 mb-2 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Verified Institutional Rates & Registration Concierge
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Pay More for Your Exam?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
              Check your current exam price, see what you save, and get professional registration assistance from Testly for ₹199.
            </p>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-slate-400 italic block">
              Same official test slot. Lower out-of-pocket price.
            </span>
          </div>
        </div>

        {/* 6-Across Executive & Colorful Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {exams.map((exam) => {
            const theme = EXAM_THEMES[exam.id] || EXAM_THEMES.GRE;
            const isSavings = exam.category === 'SAVINGS_HERO';

            return (
              <div
                key={exam.id}
                onClick={() => onBookTest(exam.id)}
                className={`group relative bg-white border border-slate-200/90 ${theme.hoverBorder} hover:shadow-lg hover:-translate-y-1 transition-all duration-200 rounded-xl p-3.5 flex flex-col justify-between cursor-pointer overflow-hidden`}
              >
                {/* Brand Color Top Accent Rim */}
                <div className={`absolute top-0 inset-x-0 h-1 ${theme.accentTop}`} />

                {/* Card Top: Logo & Provider Tag */}
                <div className="space-y-2 pt-1.5">
                  <div className="h-7 flex items-center justify-between gap-1">
                    <ExamLogo examId={exam.id} className="h-6 max-w-[86px]" />
                    <span className="text-[9px] font-bold text-slate-400 tracking-wide">
                      {theme.boardTag}
                    </span>
                  </div>

                  {/* Regular Fee */}
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                      {isSavings ? 'Regular Price*' : 'Official Fee'}
                    </p>
                    <p className={`text-xs font-semibold ${isSavings ? 'line-through text-slate-400' : 'text-slate-500'}`}>
                      {fmt(exam.refPrice)}
                    </p>
                  </div>

                  {/* Testly Price */}
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                        Testly Price
                      </p>
                      <span className="text-[8px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-1 rounded">
                        +₹199
                      </span>
                    </div>
                    <p className="text-[19px] sm:text-[21px] font-black text-slate-900 tracking-tight leading-tight mt-0.5">
                      {fmt(exam.testlyPrice)}
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Refined Colored Pill & Button */}
                <div className="space-y-2 pt-3">
                  {/* Dignified Benefit Badge */}
                  <div className={`${theme.badgeBg} rounded-lg px-2 py-1.5 text-center shadow-2xs`}>
                    <p className="text-[8px] font-extrabold uppercase tracking-wider opacity-80 leading-none">
                      {theme.badgeLabel}
                    </p>
                    <p className="text-[13px] font-black tracking-tight leading-tight mt-0.5">
                      {theme.badgeValue}
                    </p>
                  </div>

                  {/* Dual Action: Modal + 1-Tap WhatsApp */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookTest(exam.id);
                      }}
                      className="flex-1 py-2 px-2.5 rounded-lg text-white text-[11px] font-bold bg-slate-900 hover:bg-slate-800 transition-colors flex items-center justify-center gap-1 shadow-2xs group-hover:bg-slate-800"
                    >
                      <span>Book {exam.label}</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </button>

                    <a
                      href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi Testly! I want to check exam slots and book ${exam.label} at ₹${exam.testlyPrice.toLocaleString('en-IN')} with ₹199 Concierge.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#128C7E] transition-all flex items-center justify-center shrink-0"
                      title={`Chat on WhatsApp about ${exam.label}`}
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#128C7E]" />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Institutional Rail Trust Seal (Addresses #1 Candidate Skepticism) */}
        <div className="bg-slate-50/90 border border-slate-200/90 rounded-2xl p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-5 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wide text-slate-900">
                100% Direct Test Board Credited
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Allocations are redeemed directly in your personal ETS, Pearson VUE, or IDP candidate profile. Official admit slips issued to your email.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wide text-slate-900">
                Zero-Defect Passport Pre-Audit
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Our desk verifies candidate passport spelling, birth date, and slot availability before payment to prevent test-day gate rejections.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-indigo-700" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wide text-slate-900">
                Domestic Invoicing & UPI
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Billed cleanly in Indian Rupees via UPI and domestic cards with GST invoice. Zero foreign forex markups and zero card decline errors.
              </p>
            </div>
          </div>
        </div>

        {/* Executive Footnote */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-100">
          <p>
            * Reference prices reflect published official test board fees in India. Registrations completed directly with zero candidate errors.
          </p>
          <p className="font-mono text-slate-400 shrink-0">
            Price Verified: {VERIFIED_DATE}
          </p>
        </div>

      </div>
    </section>
  );
}
