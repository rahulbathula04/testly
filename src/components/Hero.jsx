import React from 'react';
import { ArrowRight, BadgeCheck, Clock, ShieldCheck, FileCheck } from 'lucide-react';

const pillars = [
  { icon: BadgeCheck, label: 'SAVE ₹1,800–₹7,500', sub: 'Verified institutional rates' },
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
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 19-7z" />
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
        <div className="max-w-xl space-y-6">

          {/* Live Badge & Pre-headline */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10.5px] font-extrabold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE RATES TODAY • MARCH 2026</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
              The Smarter Way To
            </p>
          </div>

          {/* Main Headline */}
          <h1
            style={{ fontFamily: "'DM Serif Display', serif" }}
            className="text-5xl sm:text-6xl lg:text-[70px] text-slate-900 leading-[1.02] tracking-[-0.015em]"
          >
            Book Your Exam.
          </h1>

          {/* Subheading */}
          <p className="text-[16px] sm:text-[17px] text-slate-600 font-medium leading-relaxed">
            Check your current exam price, see what you save, and get professional registration assistance from Testly for ₹199.
          </p>

          {/* 4 Value Pillars (Refined Interactive 2x2 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1">
            {pillars.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/60 hover:border-slate-300 hover:bg-white transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100/80 shadow-2xs">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10.5px] font-black uppercase tracking-wide text-slate-900 truncate">{label}</p>
                  <p className="text-[11px] text-slate-500 font-medium truncate">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Primary CTA & Assurance */}
          <div className="space-y-2 pt-1">
            <button
              onClick={() => onBookTest('GRE')}
              className="group inline-flex items-center gap-2.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-slate-800"
            >
              <span>Check Your Exam & Savings</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </button>
            <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              100% Official ETS & Pearson slots • Instant WhatsApp assistance available
            </p>
          </div>

          {/* Social proof with student avatars + Rating Stars */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2 border-t border-slate-100">
            <div className="flex -space-x-2">
              {studentAvatars.map((student, i) => (
                <img
                  key={i}
                  src={student.src}
                  alt={student.alt}
                  className="inline-block w-8 h-8 rounded-full border-2 border-white object-cover object-center shadow-xs ring-1 ring-slate-200/50"
                  loading="eager"
                />
              ))}
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-amber-500 text-xs">
                <span>★★★★★</span>
                <span className="text-[11px] font-black text-slate-800 ml-1">4.9/5</span>
              </div>
              <p className="text-[12.5px] text-slate-600">
                <strong className="font-bold text-slate-900">4,000+</strong> students guided on their global education journey.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
