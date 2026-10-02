import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Play } from 'lucide-react';

export default function ClosingCTA({ onBookTest, onOpenFreeMock }) {
  return (
    <section className="py-20 bg-[#102A56] text-white relative overflow-hidden">
      {/* AI Background Image Layer - Global Campus Dusk */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none mix-blend-luminosity"
        style={{ backgroundImage: `url('/assets/images/global-campus-dark-bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#102A56] via-[#102A56]/90 to-[#102A56]/80 pointer-events-none" />

      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#1769E0]/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        {/* Handwritten Accent Banner */}
        <div className="inline-block transform -rotate-1">
          <p className="font-serif italic text-xl sm:text-2xl text-[#60A5FA] font-medium tracking-wide">
            ✨ "New Tests. New Opportunities. A Bigger You." ✨
          </p>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
          Ready to Book Your Exam <br />
          <span className="text-[#60A5FA]">at the Guaranteed Lowest Price?</span>
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
          Don't pay full portal examination fees. Secure official ETS, Pearson, and GMAC test vouchers with flat ₹199 specialist booking support today.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onBookTest('TOEFL')}
            className="w-full sm:w-auto bg-[#1769E0] hover:bg-white hover:text-[#102A56] text-white font-extrabold text-lg px-9 py-4.5 rounded-xl shadow-2xl transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 group"
          >
            <span>Book Your Test Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenFreeMock}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-extrabold text-lg px-9 py-4.5 rounded-xl border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2.5"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Try a Free Mock Test</span>
          </button>
        </div>

        {/* Footer Guarantee Pill */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-bold">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#18A957]" />
            100% Official Authorization Guaranteed
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#FFB800]" />
            Mon–Thu 9 AM – 9 PM Specialist Slots
          </span>
        </div>

      </div>
    </section>
  );
}
