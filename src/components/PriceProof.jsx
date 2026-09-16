import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Sparkles, HelpCircle, Copy, Check } from 'lucide-react';
import { ExamLogo } from './ExamLogos';
import { EXAM_OFFERINGS, EXAM_DATA } from '../data/examOfferings';

// Re-export for backward compatibility with other pages
export { EXAM_DATA };

const VERIFIED_DATE = '16 Sep 2026';
const fmt = (n) => '₹' + n.toLocaleString('en-IN');

export default function PriceProof({ onBookTest }) {
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'SAVINGS' | 'SERVICE'
  const [copiedScriptId, setCopiedScriptId] = useState(null);

  const allExams = Object.values(EXAM_DATA);

  const filteredExams = allExams.filter((exam) => {
    if (filter === 'SAVINGS') return exam.category === 'SAVINGS_HERO';
    if (filter === 'SERVICE') return exam.category === 'SERVICE_HERO' || exam.category === 'INFORMATION_FIRST';
    return true;
  });

  const handleCopyScript = (e, exam) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(exam.salesScript);
      setCopiedScriptId(exam.id);
      setTimeout(() => setCopiedScriptId(null), 2000);
    }
  };

  return (
    <section id="savings" className="py-16 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-300/80 text-emerald-800 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Institutional Booking & Concierge Desk
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-900 tracking-tight leading-tight">
              Why Pay More for Your Exam?
            </h2>
            <p className="text-[16px] text-slate-600 font-medium leading-relaxed">
              Check your current exam price, see what you save, and get professional registration assistance from Testly for ₹199.
            </p>
          </div>

          {/* Segmented Category Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-200/80 p-1 rounded-xl shrink-0 self-start md:self-end">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === 'ALL'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Exams (6)
            </button>
            <button
              onClick={() => setFilter('SAVINGS')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === 'SAVINGS'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Savings Heroes (3)
            </button>
            <button
              onClick={() => setFilter('SERVICE')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === 'SERVICE'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Concierge & Desks (3)
            </button>
          </div>
        </div>

        {/* 3-Column Balanced Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => {
            const isSavingsHero = exam.category === 'SAVINGS_HERO';
            const isServiceHero = exam.category === 'SERVICE_HERO';
            const isCopied = copiedScriptId === exam.id;

            return (
              <div
                key={exam.id}
                onClick={() => onBookTest(exam.id)}
                className="group relative bg-white border border-slate-200/90 hover:border-slate-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 rounded-2xl p-6 flex flex-col justify-between cursor-pointer"
              >
                {/* Top Row: Logo + Category Badge */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="h-9 flex items-center">
                      <ExamLogo examId={exam.id} className="h-8 max-w-[130px]" />
                    </div>

                    {/* Category Badges */}
                    {isSavingsHero && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        {exam.categoryBadge}
                      </span>
                    )}
                    {isServiceHero && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {exam.categoryBadge}
                      </span>
                    )}
                    {!isSavingsHero && !isServiceHero && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {exam.categoryBadge}
                      </span>
                    )}
                  </div>

                  {/* Exam Title & Provider */}
                  <div>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      {exam.fullName}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                      {exam.provider}
                    </p>
                  </div>

                  {/* Pricing Box */}
                  <div className="bg-slate-50/80 border border-slate-200/70 rounded-xl p-4 space-y-2.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {isSavingsHero ? 'Official Fee*' : 'Regular Fee'}
                      </span>
                      <span className={`text-sm font-semibold ${isSavingsHero ? 'text-slate-400 line-through' : 'text-slate-500'}`}>
                        {fmt(exam.refPrice)}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between gap-2 pt-1 border-t border-slate-200/60">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                          Testly Exam Price
                        </p>
                        <p className="text-3xl font-black text-slate-900 tracking-tight">
                          {fmt(exam.testlyPrice)}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-bold text-slate-700 shadow-2xs">
                          + ₹{exam.serviceFee} Concierge
                        </span>
                      </div>
                    </div>

                    {/* Value Prop Banner */}
                    <div className={`mt-2 py-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center justify-between ${
                      isSavingsHero
                        ? 'bg-emerald-100/70 text-emerald-900 border border-emerald-200/80'
                        : isServiceHero
                        ? 'bg-blue-100/70 text-blue-900 border border-blue-200/80'
                        : 'bg-slate-200/70 text-slate-800 border border-slate-300/80'
                    }`}>
                      <span>{exam.propHighlight}</span>
                      {isSavingsHero && <span className="font-black text-emerald-800">Direct Saving</span>}
                    </div>
                  </div>

                  {/* Operational Guarantees Checklist */}
                  <div className="space-y-1.5 pt-1">
                    {exam.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-6 space-y-3 border-t border-slate-100 mt-5">
                  <button
                    onClick={() => onBookTest(exam.id)}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors shadow-sm group-hover:bg-blue-600"
                  >
                    <span>{isSavingsHero ? `Book ${exam.label} & Save` : `Book ${exam.label} with Concierge`}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  {/* 10-Second Spoken Pitch Bar (Copyable) */}
                  <div
                    onClick={(e) => handleCopyScript(e, exam)}
                    title="Click to copy sales script"
                    className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <span className="truncate italic">
                      {isCopied ? '✓ Copied 10-second script to clipboard!' : exam.salesScript}
                    </span>
                    <span className="shrink-0 font-bold text-[10px] uppercase text-slate-400 flex items-center gap-1">
                      {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      {isCopied ? 'Copied' : 'Script'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legal & Reference Footnote */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-200/80">
          <div className="space-y-1">
            <p className="text-[12px] text-slate-500 font-medium">
              * Reference prices reflect current published test-provider rates in India. Registration is facilitated directly via authorized institutional quotas or assisted direct booking.
            </p>
            <p className="text-[11px] text-slate-400 font-mono">
              Pricing verified: {VERIFIED_DATE} • Candidate Agency Mode Active (Indian Contract Act 1872)
            </p>
          </div>

          <button
            onClick={() => onBookTest('GRE')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white border border-slate-300 hover:border-slate-500 px-4 py-2 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
          >
            Find My Exam & Check Slot Availability <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
