import React, { useState } from 'react';
import { ArrowRight, Menu, X, ShieldCheck, ChevronDown, Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Exam Fees & Savings', href: '/exam-fees' },
  { label: 'Testly Campus', href: '/campus' },
  { label: 'Guides & Research', href: '/guides' },
  { label: 'Hyderabad Hub', href: '/locations/hyderabad' },
  { label: 'Madhapur Desk', href: '/locations/madhapur' },
  { label: 'Professionals', href: '/professionals' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'FAQ', href: '/#faq' },
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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_1px_3px_rgba(15,23,42,0.03)] transition-all w-full overflow-x-clip">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 h-15 flex items-center justify-between gap-1.5 xl:gap-4 w-full">

        {/* ── Brand Logo ── */}
        <a
          href="/"
          onClick={(e) => handleClick(e, '/')}
          className="flex items-center gap-2 shrink-0 select-none group cursor-pointer"
        >
          <div className="flex flex-col justify-center">
            <span className="text-[20px] font-black text-[#0B1528] tracking-tight leading-none">
              Testly
            </span>
            <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-tight mt-0.5">
              Exams Made Easier
            </span>
          </div>
        </a>

        {/* ── Desktop Nav Items (Fits comfortably on xl+ 1280px+) ── */}
        <nav className="hidden xl:flex items-center gap-1 xl:gap-2 shrink min-w-0">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="text-[12px] xl:text-[13px] font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100/70 px-2 xl:px-2.5 py-1.5 rounded-lg transition-all whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* ── Right-Side Premium CTA ── */}
        <div className="hidden sm:flex items-center shrink-0">
          <button
            onClick={() => onOpenBooking('GRE')}
            className="group relative inline-flex items-center gap-2 bg-[#0B1528] hover:bg-slate-900 text-white text-[11.5px] xl:text-[12.5px] font-bold px-3.5 xl:px-4 py-2 rounded-xl shadow-xs hover:shadow-md transition-all duration-150 active:scale-[0.98] cursor-pointer whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span>Check Your Exam & Savings</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
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
