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
        <div className="bg-gradient-to-br from-[#0B1528] via-[#0E1C38] to-[#081020] text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Left Column: Campus Value Pitch (5 cols) */}
          <div className="lg:col-span-5 p-7 sm:p-9 flex flex-col justify-between space-y-6">
            <div className="space-y-3.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-[10.5px] font-black uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>TESTLY CAMPUS • INSTITUTIONAL PROGRAM</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                For Colleges, Universities & Study Abroad Cells
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                We partner directly with institutional placement cells to simplify exam registration for graduating cohorts. From subsidized vouchers to on-campus registration drives.
              </p>

              {/* Micro stats */}
              <div className="flex items-center gap-4 pt-1 text-[11px] text-slate-300 border-t border-slate-800/80">
                <div>
                  <span className="font-black text-white text-xs block">45+</span>
                  <span className="text-slate-400 text-[10px]">Campus Drives</span>
                </div>
                <div className="h-6 w-px bg-slate-800" />
                <div>
                  <span className="font-black text-white text-xs block">12,000+</span>
                  <span className="text-slate-400 text-[10px]">Students Guided</span>
                </div>
                <div className="h-6 w-px bg-slate-800" />
                <div>
                  <span className="font-black text-white text-xs block">100%</span>
                  <span className="text-slate-400 text-[10px]">Official Booking</span>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={handleCampusClick}
                className="bg-white hover:bg-slate-100 text-[#0B1528] font-black text-xs px-5 py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>Partner with Testly Campus</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Center Column: Campus Students Photo (3 cols) */}
          <div className="lg:col-span-3 relative min-h-[240px] lg:min-h-full">
            <img
              src="/assets/images/global-university-campus.jpg"
              alt="Indian university students studying abroad on university campus"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1528] via-transparent to-[#0E1A33] hidden lg:block opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-transparent to-transparent lg:hidden" />

            {/* Floating Trust Tag */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#0B1528]/85 backdrop-blur-md border border-slate-700/80 rounded-xl p-2.5 shadow-lg">
              <p className="text-[10px] font-extrabold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Institutional MoU Available
              </p>
              <p className="text-[9.5px] text-slate-400 font-medium mt-0.5">
                Direct coordinator for your university department
              </p>
            </div>
          </div>

          {/* Right Column: Campus Features & Inset Card (4 cols) */}
          <div className="lg:col-span-4 p-6 sm:p-7 bg-[#0E1A33] border-t lg:border-t-0 lg:border-l border-slate-800/80 flex flex-col justify-between space-y-5">
            
            {/* 4 Feature Items */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-slate-200 p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold">Campus Workshops & Seminars</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-200 p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <FileCheck className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold">Cohort Bulk Registration Support</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-200 p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold">Dedicated Institutional Desk</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-200 p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold">Live Status & Reporting Dashboard</span>
              </div>
            </div>

            {/* Inset Card: Let's Empower Your Students */}
            <div className="bg-gradient-to-br from-[#132347] to-[#0E1A33] border border-blue-500/30 rounded-2xl p-4.5 space-y-2.5 shadow-lg">
              <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                Let's Empower Your Students
              </h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Partner with Testly Campus and make exam registration simple, secure and stress-free for your entire cohort.
              </p>
              <button
                onClick={handleCampusClick}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md group cursor-pointer active:scale-[0.98]"
              >
                <span>Connect with Campus Team</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
