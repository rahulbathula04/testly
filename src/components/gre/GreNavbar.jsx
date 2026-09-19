import React from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import BrandLogo from '../BrandLogo';

export const GRE_NAV_TABS = [
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'diagnostic', label: 'Diagnostic' },
  { id: 'practice', label: 'Practice Drills' },
  { id: 'mock', label: 'Mock Tests' },
  { id: 'report', label: 'My Readiness' }
];

export default function GreNavbar({ activeTab, onSelectTab, onNavigate, onOpenBooking }) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6] border-b border-[#E5E7EB] shadow-[0_1px_3px_rgba(15,23,42,0.03)] font-[Inter,system-ui,sans-serif]">
      {/* Top Utility Bar: Infrastructure & Provenance Badge */}
      <div className="bg-[#0F172A] text-slate-300 text-[11px] py-1 px-4 sm:px-8 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400 uppercase tracking-wider font-semibold">Testly Assessment Infrastructure</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden sm:inline">GRE Vertical · Current 2026 Specification</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('/');
            }}
            className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Testly Homepage</span>
          </a>
        </div>
      </div>

      {/* Main Product Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Lockup: TESTLY / GRE */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('/');
            }}
            className="group cursor-pointer select-none"
            title="Return to Testly Home"
          >
            <BrandLogo variant="horizontal" size="sm" />
          </a>

          <div className="h-5 w-[1px] bg-slate-300" />

          <button
            onClick={() => onSelectTab('intelligence')}
            className="flex items-center gap-1.5 text-left cursor-pointer group"
          >
            <span className="text-sm sm:text-base font-black tracking-tight text-[#0F172A] group-hover:text-[#1E3A8A] font-['DM_Serif_Display',Georgia,serif]">
              GRE
            </span>
            <span className="hidden md:inline text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-50 text-[#1E3A8A] border border-blue-200">
              Assessment OS
            </span>
          </button>
        </div>

        {/* Tab Switcher */}
        <nav className="hidden md:flex items-center gap-1 bg-[#FAF9F6] p-1 rounded-xl">
          {GRE_NAV_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/60'
                }`}
              >
                <span>{tab.label}</span>
                {tab.id === 'mock' && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                    isActive ? 'bg-amber-400 text-slate-900' : 'bg-amber-100 text-amber-800'
                  }`}>
                    100 Seats
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onSelectTab('diagnostic')}
            className="bg-[#1E3A8A] hover:bg-[#0F172A] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs hover:shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>Start Diagnostic</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
          </button>
        </div>
      </div>

      {/* Mobile Tab Scroll Bar */}
      <div className="md:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-200 bg-white no-scrollbar">
        {GRE_NAV_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#0F172A] text-white'
                  : 'text-[#64748B] bg-slate-100'
              }`}
            >
              <span>{tab.label}</span>
              {tab.id === 'mock' && (
                <span className={`text-[9px] font-mono px-1 py-0.5 rounded font-bold uppercase ${
                  isActive ? 'bg-amber-400 text-slate-900' : 'bg-amber-200 text-amber-900'
                }`}>
                  100 Seats
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}
