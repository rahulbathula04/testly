import React, { useState } from 'react';
import { ArrowRight, BadgeCheck, Clock, ShieldCheck, FileCheck, MessageCircle } from 'lucide-react';
import { EXAM_OFFERINGS } from '../data/examOfferings';

const pillars = [
  { icon: BadgeCheck, label: 'SAVE ₹1,800–₹7,500', sub: 'Verified institutional rates' },
  { icon: Clock,       label: '₹199 CONCIERGE',    sub: 'Full registration assistance' },
  { icon: ShieldCheck, label: 'ZERO ERRORS',       sub: 'Passport name & slot audit' },
  { icon: FileCheck,   label: 'OFFICIAL CONFIRMATION', sub: 'Direct ETS & IDP booking slip' },
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
    <section className="relative bg-white border-b border-slate-200 overflow-hidden min-h-[520px]">

      {/* ── Right-side photo panel ── */}
      <div className="absolute inset-y-0 right-0 w-[46%] hidden lg:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/assets/images/global-university-campus.jpg')` }}
        />
        {/* fade left edge */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent" />

        {/* Top-right airplane */}
        <div className="absolute top-6 right-8 text-slate-400 opacity-60">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 19-7z"/>
          </svg>
        </div>

        {/* Handwritten overlay — "Same Exam. Lower Price. Brighter Future." */}
        <div className="absolute top-10 right-10 text-right">
          <p className="font-['Caveat'] text-xl text-slate-700 leading-tight">
            Same Exam.<br />Lower Price.<br />Brighter Future.
          </p>
        </div>

        {/* Bottom-left on photo — "Global Opportunities Start Here" */}
        <div className="absolute bottom-10 right-10 text-right">
          <p className="font-['Caveat'] text-base text-slate-600 leading-snug">
            Global Opportunities<br />Start Here.
          </p>
        </div>

        {/* Quote bubble */}
        <div className="absolute top-32 right-6 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl px-3 py-2 max-w-[160px] shadow-sm">
          <p className="text-[11px] text-slate-600 font-medium italic leading-snug">
            "A small saving today, a bigger tomorrow."
          </p>
        </div>
      </div>

      {/* ── Left content ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="max-w-xl space-y-7">

          {/* Pre-headline */}
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
            The Smarter Way To
          </p>

          {/* Main Headline */}
          <h1 style={{ fontFamily: "'DM Serif Display', serif" }}
              className="text-5xl sm:text-6xl lg:text-[68px] text-slate-900 leading-[1.02] tracking-[-0.01em]">
            Book Your Exam.
          </h1>

          {/* Subheading */}
          <p className="text-[17px] text-slate-600 font-medium leading-relaxed">
            Check your current exam price, see what you save, and get professional registration assistance from Testly for ₹199.
          </p>

          {/* 4 Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 py-1">
            {pillars.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-slate-700" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-900">{label}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive 1-Click Instant Exam Selector & Live Rate Calculator */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                Select Your Exam:
              </span>
              <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300 shadow-2xs">
                ⚡ Live Pre-Cleared Rate
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
            <div className="bg-white border border-slate-200/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900 tracking-tight">
                    ₹{activeOffering.testly_price.toLocaleString('en-IN')}
                  </span>
                  {activeOffering.saving > 0 && (
                    <span className="text-xs text-slate-400 line-through">
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
                      Zero-Defect Audit
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
                  className="flex-1 sm:flex-initial bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Book {selectedExam}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Social proof with AI-generated Indian students abroad */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex -space-x-2.5 overflow-hidden py-0.5">
              {studentAvatars.map((student, i) => (
                <img
                  key={i}
                  src={student.src}
                  alt={student.alt}
                  className="inline-block w-8 h-8 rounded-full border-2 border-white object-cover object-center shadow-xs"
                  loading="eager"
                />
              ))}
            </div>
            <p className="text-[13px] text-slate-600 font-medium">
              <strong className="font-extrabold text-slate-900">4,000+</strong> Indian students registered for top global universities.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
