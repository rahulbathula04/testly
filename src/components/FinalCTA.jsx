import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA({ onBookTest }) {
  return (
    <section className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

          {/* Left — italic brand line */}
          <div className="shrink-0">
            <p className="font-['Caveat'] text-2xl text-slate-400 italic">Why Pay More?</p>
            <p className="font-['Caveat'] text-3xl font-bold text-white">Book Smarter.</p>
          </div>

          {/* Centre */}
          <div className="flex-1 text-center space-y-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Your Exam. A Brighter Tomorrow.
              </h2>
              <p className="text-[15px] text-slate-400 mt-2 font-medium">
                Check your exam. See your saving. Let Testly handle the registration.
              </p>
            </div>
            <button
              onClick={() => onBookTest('GRE')}
              className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm px-8 py-3.5 rounded-lg transition-colors flex items-center gap-2 mx-auto">
              Check My Exam Savings
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-slate-500 font-medium">Testly Professional Service — ₹199</p>
          </div>

          {/* Right */}
          <div className="shrink-0 text-right space-y-1">
            <p className="text-sm font-bold text-slate-400 tracking-wider">SAME EXAM.</p>
            <p className="text-sm font-bold text-slate-300 tracking-wider">LOWER PRICE.</p>
            <p className="text-sm font-black text-white tracking-wider">BIGGER DREAMS.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
