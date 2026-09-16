import React from 'react';
import { Users, FileCheck, Briefcase, FileSpreadsheet, ArrowRight } from 'lucide-react';

export default function CampusBanner({ onOpenBooking, onNavigate }) {
  const handleCampusClick = () => {
    if (onNavigate) {
      onNavigate('/campus');
    } else if (onOpenBooking) {
      onOpenBooking('GRE');
    }
  };

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-slate-200/80 font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Navy Institutional Container */}
        <div className="bg-[#0B1528] text-white rounded-3xl overflow-hidden shadow-xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Left Column: Campus Value Pitch (5 cols) */}
          <div className="lg:col-span-5 p-7 sm:p-9 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-black text-blue-400 uppercase tracking-widest block">
                Testly Campus
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                For Colleges, Universities & Study Abroad Cells
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                We help institutions simplify exam registration for their students. From awareness sessions to bulk registration days — Testly Campus is your trusted partner.
              </p>
            </div>

            <div>
              <button
                onClick={handleCampusClick}
                className="bg-white hover:bg-slate-100 text-[#0B1528] font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2 group"
              >
                <span>Partner with Testly Campus</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Center Column: Campus Students Photo (3 cols) */}
          <div className="lg:col-span-3 relative min-h-[220px] lg:min-h-full">
            <img
              src="/assets/images/global-university-campus.jpg"
              alt="Indian university students studying abroad on university campus"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1528] via-transparent to-[#0B1528] hidden lg:block opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-transparent to-transparent lg:hidden" />
          </div>

          {/* Right Column: Campus Features & Inset Card (4 cols) */}
          <div className="lg:col-span-4 p-6 sm:p-7 bg-[#0E1A33] border-t lg:border-t-0 lg:border-l border-slate-800/80 flex flex-col justify-between space-y-5">
            
            {/* 4 Feature Items */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <div className="w-6 h-6 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold">Campus Workshops</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <div className="w-6 h-6 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0">
                  <FileCheck className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold">Bulk Registration Support</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <div className="w-6 h-6 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold">Dedicated Account Manager</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <div className="w-6 h-6 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold">Institutional Reporting</span>
              </div>
            </div>

            {/* Inset Card: Let's Empower Your Students */}
            <div className="bg-[#142344] border border-blue-900/50 rounded-2xl p-4 space-y-2.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wide">
                Let's Empower Your Students
              </h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Partner with Testly Campus and make exam registration simple, secure and stress-free.
              </p>
              <button
                onClick={handleCampusClick}
                className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
