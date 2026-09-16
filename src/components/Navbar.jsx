import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';

const NAV_ITEMS = [
  { label: 'Exams', href: '/#pricing' },
  { label: 'Exam Fees', href: '/exam-fees' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Professionals', href: '/professionals' },
  { label: 'Testly Campus', href: '/campus' },
  { label: 'Guides', href: '/guides' },
  { label: 'About', href: '/#about' },
];

export default function Navbar({ onOpenBooking, onNavigate }) {
  const [open, setOpen] = useState(false);

  const handleClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      if (onNavigate) {
        onNavigate('/');
        setTimeout(() => {
          const el = document.getElementById(href.replace('/#', ''));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.location.href = href;
      }
    } else if (href.startsWith('/')) {
      e.preventDefault();
      if (onNavigate) {
        onNavigate(href);
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-xl border-b border-[#E5E7EB] shadow-[0_1px_3px_rgba(15,23,42,0.03)] transition-all w-full overflow-x-clip">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 h-16 flex items-center justify-between gap-2 xl:gap-4 w-full">

        {/* ── Official Brand Logo from Brand Guide ── */}
        <a
          href="/"
          onClick={(e) => handleClick(e, '/')}
          className="flex items-center gap-2 shrink-0 select-none group cursor-pointer"
        >
          <BrandLogo variant="horizontal" size="md" />
        </a>

        {/* ── Desktop Nav Items (Exact items from Brand Guide) ── */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink min-w-0">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="text-[13px] xl:text-[14px] font-medium text-[#0F172A]/80 hover:text-[#0F172A] hover:bg-[#EBF3FF] px-2.5 xl:px-3 py-1.5 rounded-lg transition-all whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* ── Right-Side Brand CTA & Search ── */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onOpenBooking('GRE')}
            className="p-2 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#EBF3FF] transition-colors cursor-pointer"
            aria-label="Search exams"
            title="Search exams"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <button
            onClick={() => onOpenBooking('GRE')}
            className="group relative inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-[12.5px] font-bold px-4 py-2 rounded-xl shadow-xs hover:shadow-md transition-all duration-150 active:scale-[0.98] cursor-pointer whitespace-nowrap"
          >
            <span>Check My Savings</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>
        </div>

        {/* ── Mobile & Tablet Hamburger (for <1280px) ── */}
        <div className="xl:hidden flex items-center gap-2">
          <button
            onClick={() => onOpenBooking('GRE')}
            className="sm:hidden bg-slate-950 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xs cursor-pointer"
          >
            Check Savings
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="p-1.5 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* ── Mobile & Tablet Drawer (Glassmorphic) ── */}
      {open && (
        <div className="xl:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-2 pb-6 shadow-xl space-y-1 animate-in slide-in-from-top-2 duration-150">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
            Navigation Menu
          </div>
          {NAV_ITEMS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => {
                setOpen(false);
                handleClick(e, l.href);
              }}
              className="flex items-center justify-between py-2.5 px-2.5 text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <span>{l.label}</span>
              {l.badge && (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {l.badge}
                </span>
              )}
            </a>
          ))}
          <div className="pt-3">
            <button
              onClick={() => {
                setOpen(false);
                onOpenBooking('GRE');
              }}
              className="w-full bg-slate-950 hover:bg-slate-900 text-white text-sm font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Check Your Exam & Savings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
