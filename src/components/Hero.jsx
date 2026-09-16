import React, { useState } from 'react';
import { ArrowRight, BadgeCheck, Clock, ShieldCheck, FileCheck, MessageCircle, Lock, CheckCircle2 } from 'lucide-react';
import { EXAM_OFFERINGS } from '../data/examOfferings';

const pillars = [
  { icon: BadgeCheck, label: 'SAVE ₹1,800–₹6,043', sub: 'Verified institutional rates' },
  { icon: Clock,       label: '₹199 CONCIERGE',    sub: 'Full registration assistance' },
  { icon: ShieldCheck, label: 'ZERO ERRORS',       sub: 'Passport name & slot audit' },
  { icon: FileCheck,   label: 'OFFICIAL CONFIRMATION', sub: 'Direct ETS & Pearson booking slip' },
];

const studentAvatars = [
  { src: '/assets/images/student-avatar-1.jpg', alt: 'Indian graduate student at US university' },
  { src: '/assets/images/student-avatar-2.jpg', alt: 'Indian student at Oxford library' },
  { src: '/assets/images/student-avatar-3.jpg', alt: 'Indian engineering student at Canadian campus' },
  { src: '/assets/images/student-avatar-4.jpg', alt: 'Indian student at Australian campus' },
  { src: '/assets/images/student-avatar-5.jpg', alt: 'Indian masters student at Edinburgh campus' },
];

export default function Hero({ onBookTest }) {
  const [selectedExam, setSelectedExam] = useState('GRE');
  const activeOffering = EXAM_OFFERINGS[selectedExam] || EXAM_OFFERINGS.GRE;

  return (
    <section className="relative bg-white border-b border-slate-200 overflow-hidden font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* ── Left Column: Value Proposition & Rate Switcher (7 cols) ── */}
          <div className="lg:col-span-7 space-y-6">

            {/* Institutional Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Official Institutional Test Booking Rail</span>
              <span className="text-slate-300">•</span>
              <span className="font-mono text-[11px] text-slate-500">HYDERABAD DESK</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{ fontFamily: "'DM Serif Display', serif" }}
              className="text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.05] tracking-tight"
            >
              Book Your Official Exam. <br />
              <span className="text-slate-900">Direct Institutional Rates.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              Eliminate international forex markups and test-day passport name errors. Testly coordinates verified test board vouchers and done-for-you registration for ₹199.
            </p>

            {/* 4 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 py-1">
              {pillars.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-slate-700" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-wide text-slate-900">{label}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive 1-Click Instant Exam Selector & Live Rate Calculator */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-xs max-w-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Select Target Exam:
                </span>
                <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded border border-emerald-300">
                  ⚡ Pre-Cleared Rate Active
                </span>
              </div>

              {/* Exam selector pills */}
              <div className="flex flex-wrap gap-1.5">
                {['GRE', 'TOEFL', 'PTE', 'Duolingo', 'IELTS'].map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => setSelectedExam(ex)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedExam === ex
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {ex}
                  </button>
                ))}
              </div>

              {/* Live Rate Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900 tracking-tight">
                      ₹{activeOffering.testly_price.toLocaleString('en-IN')}
                    </span>
                    {activeOffering.saving > 0 && (
                      <span className="text-xs text-slate-400 line-through font-mono">
                        ₹{activeOffering.reference_price.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[11px] font-bold text-slate-500">
                      + ₹199 Concierge
                    </span>
                    {activeOffering.saving > 0 ? (
                      <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                        Save ₹{activeOffering.saving.toLocaleString('en-IN')}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                        Official Desk Assistance
                      </span>
                    )}
                  </div>
                </div>

                {/* Dual Action CTAs */}
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi Testly! I want to check exam slots and book ${selectedExam} at ₹${activeOffering.testly_price.toLocaleString('en-IN')} with ₹199 Concierge.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#128C7E] rounded-xl transition-all flex items-center justify-center shrink-0"
                    title="Ask Booking Officer on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-[#128C7E]" />
                  </a>

                  <button
                    onClick={() => onBookTest(selectedExam)}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Book {selectedExam}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Social proof with Indian student abroad alumni */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2 overflow-hidden py-0.5">
                {studentAvatars.map((student, i) => (
                  <img
                    key={i}
                    src={student.src}
                    alt={student.alt}
                    className="inline-block w-8 h-8 rounded-full border-2 border-white object-cover object-center shadow-2xs"
                    loading="eager"
                  />
                ))}
              </div>
              <p className="text-xs text-slate-600 font-medium">
                <strong className="font-extrabold text-slate-900">4,000+</strong> Indian aspirants cleared for Oxford, UT Dallas, NUS & CMU.
              </p>
            </div>

          </div>

          {/* ── Right Column: Institutional Verification Ledger & Live Terminal (5 cols) ── */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/5 overflow-hidden">

              {/* Terminal Header */}
              <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-slate-200">
                    INSTITUTIONAL REGISTRATION DESK
                  </span>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                  LIVE QUOTA
                </span>
              </div>

              {/* Ledger Card Body */}
              <div className="p-5 space-y-4 text-xs">

                {/* Pre-Audit Status Strip */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide block">Candidate Audit</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      Zero-Defect Pass
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide block">Passport Match</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <FileCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      FNU / LNU Verified
                    </span>
                  </div>
                </div>

                {/* Commercial Ledger */}
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                  <div className="bg-slate-50/80 px-3.5 py-2 flex items-center justify-between text-[11px] font-bold text-slate-700">
                    <span>{selectedExam} Official Voucher Settlement</span>
                    <span className="font-mono text-[10px] text-slate-500">TSLY-{selectedExam}-2026</span>
                  </div>
                  <div className="p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Official Board Portal Fee:</span>
                      <span className="line-through text-slate-400 font-mono">₹{activeOffering.reference_price.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-900 font-bold">
                      <span>Testly Institutional Rate:</span>
                      <span className="font-mono text-sm text-slate-900 font-black">₹{activeOffering.testly_price.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Registration Concierge:</span>
                      <span className="font-mono font-semibold text-slate-800">₹199</span>
                    </div>
                    <div className="pt-2 border-t border-dashed border-slate-200 flex items-center justify-between text-emerald-800 font-extrabold text-[13px]">
                      <span>Candidate Net Savings:</span>
                      <span className="font-mono text-emerald-950 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                        {activeOffering.saving > 0 ? `₹${activeOffering.saving.toLocaleString('en-IN')}` : 'Official Rate'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Verification Callout */}
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <BadgeCheck className="w-4 h-4" />
                  </div>
                  <div className="text-[11px] leading-snug">
                    <span className="font-bold text-emerald-900 block">100% Direct Test Board Credited</span>
                    <span className="text-emerald-800/80">Voucher applies cleanly inside your official ETS, Pearson, or Duolingo portal.</span>
                  </div>
                </div>

                {/* Direct Action */}
                <button
                  onClick={() => onBookTest(selectedExam)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Lock ₹{activeOffering.testly_price.toLocaleString('en-IN')} Rate for {selectedExam}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Micro Footer Guarantee */}
              <div className="bg-slate-50 px-5 py-2.5 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>DOMESTIC GST INVOICED</span>
                <span>INDIAN CONTRACT ACT 1872</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
