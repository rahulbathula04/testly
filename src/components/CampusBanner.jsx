import React from 'react';
import { motion } from 'framer-motion';
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
    <section className="py-8 sm:py-14 bg-white border-b border-[#E5E7EB] font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Navy Institutional Container */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-br from-[#0B1528] via-[#0E1C38] to-[#081020] text-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-800/80 grid grid-cols-1 lg:grid-cols-12 items-stretch"
        >
          
          {/* Left Column: Campus Value Pitch (5 cols) */}
          <div className="lg:col-span-5 p-5 sm:p-8 lg:p-9 flex flex-col justify-between space-y-5 sm:space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>TESTLY CAMPUS</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug">
                For Colleges, Universities & Study Abroad Cells
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                We partner directly with institutional placement cells to simplify exam registration for graduating cohorts. From subsidized vouchers to on-campus registration drives.
              </p>

              {/* Micro stats */}
              <div className="flex items-center gap-3 sm:gap-4 pt-1 text-[10.5px] sm:text-[11px] text-slate-300 border-t border-slate-800/80">
                <div>
                  <span className="font-bold text-white text-xs block">45+</span>
                  <span className="text-slate-400 text-[9.5px] sm:text-[10px]">Campus Drives</span>
                </div>
                <div className="h-5 w-px bg-slate-800" />
                <div>
                  <span className="font-bold text-white text-xs block">12,000+</span>
                  <span className="text-slate-400 text-[9.5px] sm:text-[10px]">Students</span>
                </div>
                <div className="h-5 w-px bg-slate-800" />
                <div>
                  <span className="font-bold text-white text-xs block">100%</span>
                  <span className="text-slate-400 text-[9.5px] sm:text-[10px]">Official</span>
                </div>
              </div>
            </div>

            <div>
              <motion.button
                whileHover={{ y: -1.5, backgroundColor: '#F8FAFC' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                onClick={handleCampusClick}
                className="w-full sm:w-auto bg-white text-[#0B1528] font-bold text-xs px-5 py-3 rounded-xl transition-shadow shadow-sm hover:shadow inline-flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Partner with Testly Campus</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>

          {/* Center Column: Campus Students Photo (3 cols) */}
          <div className="lg:col-span-3 relative min-h-[160px] sm:min-h-[200px] lg:min-h-full">
            <img
              src="/assets/images/global-university-campus.jpg"
              alt="Indian university students studying abroad on university campus"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1528] via-transparent to-[#0E1A33] hidden lg:block opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-transparent to-transparent lg:hidden" />

            {/* Floating Trust Tag */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="absolute bottom-4 left-4 right-4 bg-[#0B1528]/85 backdrop-blur-md border border-slate-700/80 rounded-xl p-2.5 shadow-lg"
            >
              <p className="text-[10px] font-extrabold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Institutional MoU Available
              </p>
              <p className="text-[9.5px] text-slate-400 font-medium mt-0.5">
                Direct coordinator for your university department
              </p>
            </motion.div>
          </div>

          {/* Right Column: Campus Features & Inset Card (4 cols) */}
          <div className="lg:col-span-4 p-6 sm:p-7 bg-[#0E1A33] border-t lg:border-t-0 lg:border-l border-slate-800/80 flex flex-col justify-between space-y-5">
            
            {/* 4 Feature Items */}
            <div className="space-y-2.5">
              {[
                { icon: Users, label: 'Campus Workshops & Seminars' },
                { icon: FileCheck, label: 'Cohort Bulk Registration Support' },
                { icon: Briefcase, label: 'Dedicated Institutional Desk' },
                { icon: FileSpreadsheet, label: 'Live Status & Reporting Dashboard' }
              ].map(({ icon: Icon, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 3, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-2.5 text-xs text-slate-200 p-2 rounded-xl bg-white/[0.02] border border-white/[0.04] transition-colors cursor-default select-none"
                >
                  <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold">{label}</span>
                </motion.div>
              ))}
            </div>

            {/* Inset Card: Let's Empower Your Students */}
            <motion.div
              whileHover={{ borderColor: 'rgba(96,165,250,0.5)' }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-br from-[#132347] to-[#0E1A33] border border-blue-500/30 rounded-2xl p-4.5 space-y-2.5 shadow-lg"
            >
              <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                Let's Empower Your Students
              </h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Partner with Testly Campus and make exam registration simple, secure and stress-free for your entire cohort.
              </p>
              <motion.button
                whileHover={{ y: -1, backgroundColor: '#3B82F6' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                onClick={handleCampusClick}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-600 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md group cursor-pointer"
              >
                <span>Connect with Campus Team</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
