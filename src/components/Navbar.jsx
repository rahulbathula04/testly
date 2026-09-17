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
  { label: 'About', href: '/about' },
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
      <div className="max-w-7xl mx-auto px-3.5 sm:px-5 lg:px-6 h-14 sm:h-16 flex items-center justify-between gap-3 w-full">

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

        {/* ── Desktop Right-Side Brand CTA & Search ── */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
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

        {/* ── Mobile & Tablet Right Action Bar (Search + Menu) ── */}
        <div className="lg:hidden flex items-center gap-1.5">
          <button
            onClick={() => onOpenBooking('GRE')}
            className="p-2 rounded-lg text-[#0F172A]/70 hover:text-[#0F172A] hover:bg-[#EBF3FF] transition-colors cursor-pointer"
            aria-label="Search exams"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 flex items-center justify-center text-[#0F172A] hover:bg-[#EBF3FF] rounded-xl transition-colors cursor-pointer active:scale-95"
            aria-label="Toggle Navigation Menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* ── Mobile & Tablet Drawer (Refined & Light) ── */}
      {open && (
        <div className="lg:hidden bg-[#FAF9F6] border-b border-[#E5E7EB] px-4 pt-3 pb-6 shadow-xl space-y-3 animate-in slide-in-from-top-2 duration-150 max-h-[85dvh] overflow-y-auto touch-scroll">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#64748B] px-3 py-1">
            <span>Navigation Menu</span>
            <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">Live 2026</span>
          </div>

          <div className="space-y-0.5">
            {NAV_ITEMS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => {
                  setOpen(false);
                  handleClick(e, l.href);
                }}
                className="flex items-center justify-between min-h-[46px] py-2.5 px-3.5 text-[14px] font-medium text-[#0F172A] hover:bg-[#EBF3FF] hover:text-[#1E3A8A] active:bg-[#EBF3FF] rounded-xl transition-colors"
              >
                <span>{l.label}</span>
                <span className="text-[#94A3B8] text-sm">›</span>
              </a>
            ))}
          </div>

          {/* Quick Direct Support Row for Mobile */}
          <div className="pt-3 border-t border-[#E5E7EB]/80 grid grid-cols-2 gap-2">
            <a
              href="https://wa.me/919347379041?text=Hi%20Testly!%20I%20have%20a%20question%20about%20exam%20registration%20and%20savings."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>WhatsApp Us</span>
            </a>
            <a
              href="tel:+919347379041"
              className="bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-800 text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Call Desk</span>
            </a>
          </div>

          <div className="pt-1">
            <button
              onClick={() => {
                setOpen(false);
                onOpenBooking('GRE');
              }}
              className="w-full bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-[0.98] transition-all"
            >
              <span>Check My Exam Savings</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
