import React from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Lock, LogOut } from 'lucide-react';
import BrandLogo from '../BrandLogo';

export const GRE_NAV_TABS = [
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'diagnostic', label: 'Diagnostic' },
  { id: 'practice', label: 'Practice Drills' },
  { id: 'mock', label: 'Mock Tests' },
  { id: 'report', label: 'My Readiness' }
];

export default function GreNavbar({
  activeTab,
  onSelectTab,
  onNavigate,
  entitlement = null,
  onSignOut
}) {
  const isApproved = entitlement?.status === 'APPROVED';
  const seatId = entitlement?.seatId || 'TESTLY-100';

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6] border-b border-[#E5E7EB] shadow-xs font-[Inter,system-ui,sans-serif]">
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

          <div className="h-5 w-px bg-slate-300" />

          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold tracking-tight text-[#0F172A] font-serif">
              GRE
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-50 text-[#1E3A8A] border border-blue-200">
              {isApproved ? 'Diagnostic Cohort' : 'Private Cohort'}
            </span>
          </div>
        </div>

        {/* Dynamic Navigation Based On Entitlement */}
        {isApproved ? (
          <>
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
                        : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#EBF3FF]'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Approved Participant Identity */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono font-bold">{seatId}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Active Seat</span>
              </div>

              {onSignOut && (
                <button
                  onClick={onSignOut}
                  className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg transition-colors cursor-pointer"
                  title="Sign Out of Diagnostic Session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/i/testly-100"
              className="text-xs font-semibold text-[#1E3A8A] hover:text-[#0F172A] transition-colors"
            >
              Accept Invitation →
            </a>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('/');
              }}
              className="text-xs text-slate-500 hover:text-slate-900 transition-colors hidden sm:block"
            >
              Back to Testly
            </a>
          </div>
        )}

      </div>
    </header>
  );
}
