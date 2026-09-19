import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function FinalCTA({ onBookTest }) {
  return (
    <section className="bg-slate-950 text-white py-14 border-t border-slate-800 font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

          {/* Left — Institutional Authority Brand Line */}
          <div className="shrink-0 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Institutional Test Booking Rail</span>
            </div>
            <p className="text-2xl font-black text-white tracking-tight">Direct Quota Access</p>
            <p className="text-xs text-slate-400 font-medium">Hyderabad Begumpet & Madhapur Desks</p>
          </div>

          {/* Centre */}
          <div className="flex-1 text-center space-y-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white">
                Save Up to ₹6,043 on Your Official Exam
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg mx-auto leading-relaxed">
                Zero upfront payment required. Official ETS, Pearson & Duolingo vouchers with ₹199 done-for-you passport pre-audit.
              </p>
            </div>
            <div className="pt-1">
              <button
                onClick={() => onBookTest('GRE')}
                className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm px-7 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2 group"
              >
                <span>Check Available Slots & Verified Fee Schedules</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            <p className="text-[11px] font-mono text-slate-500">Fixed ₹199 Professional Concierge • INR Billing</p>
          </div>

          {/* Right — Technical Guarantees */}
          <div className="shrink-0 space-y-2 text-right text-[11px] font-mono">
            <div className="flex items-center justify-end gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% DIRECT BOARD CREDIT</span>
            </div>
            <div className="flex items-center justify-end gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>ZERO INTERNATIONAL FOREX FEES</span>
            </div>
            <div className="flex items-center justify-end gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>DOMESTIC GST INVOICED</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
