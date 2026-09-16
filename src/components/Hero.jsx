import React from 'react';
import { ArrowRight, BadgeCheck, Clock, ShieldCheck, FileCheck } from 'lucide-react';

const pillars = [
  { icon: BadgeCheck, label: 'SAVE ₹1,800–₹7,500', sub: 'Verified institutional rates' },
  { icon: Clock,       label: '₹199 CONCIERGE',    sub: 'Full registration assistance' },
  { icon: ShieldCheck, label: 'ZERO ERRORS',       sub: 'Passport name & slot audit' },
  { icon: FileCheck,   label: 'OFFICIAL CONFIRMATION', sub: 'Direct ETS & IDP booking slip' },
];

const avatarColors = ['#4f7cac','#3d8b5e','#c07d3a','#a04f6a','#5a4fa0'];

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

          {/* Primary CTA */}
          <button
            onClick={() => onBookTest('GRE')}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white font-bold text-sm px-6 py-3.5 rounded-lg transition-colors shadow-sm">
            Check Your Exam & Savings
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Social proof */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {avatarColors.map((c, i) => (
                <div key={i}
                  style={{ backgroundColor: c }}
                  className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[9px] font-black">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-[13px] text-slate-600">
              <strong className="font-bold text-slate-900">4,000+</strong> students guided on their global education journey.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
