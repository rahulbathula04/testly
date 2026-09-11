import React from 'react';
import { ArrowRight, Play, Zap } from 'lucide-react';

export default function FinalCTA({ onBookTest, onOpenFreeMock }) {
  return (
    <section className="relative bg-[#102A56] text-white py-20 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#18A957] text-white text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
              <Zap className="w-4 h-4 fill-white" />
              <span>TESTLY GUARANTEE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Save More. Test Smarter. <br />
              <span className="text-[#60A5FA]">Practice Free. Register at ₹199.</span>
            </h2>

            <p className="text-base sm:text-xl text-slate-300 font-medium max-w-xl">
              Join 14,200+ candidates preparing for GRE, TOEFL, IELTS & GMAT with zero paywalls. Get 1-on-1 registration support for just ₹199.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={onOpenFreeMock}
                className="w-full sm:w-auto bg-[#18A957] hover:bg-[#128342] text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>Start Free Practice Mock</span>
              </button>

              <button
                onClick={() => onBookTest && onBookTest('GRE')}
                className="w-full sm:w-auto bg-[#1769E0] hover:bg-white hover:text-[#102A56] text-white font-extrabold text-base px-8 py-4 rounded-2xl border border-white/20 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Book Registration Help (₹199)</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Script Visual */}
          <div className="lg:col-span-5 relative text-center lg:text-right mt-6 lg:mt-0">
            <div className="inline-block transform -rotate-2 bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20">
              <span className="font-handwriting text-3xl font-bold text-[#FFF4C2] block">
                Save More. Test Smarter.
              </span>
              <span className="text-xs text-slate-300 font-bold tracking-wider uppercase block mt-1">
                Same Tests. Brighter Futures.
              </span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
