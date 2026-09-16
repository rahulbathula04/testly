import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">

        {/* Brand */}
        <a
          href="/"
          onClick={(e) => handleClick(e, '/')}
          className="flex flex-col shrink-0 leading-none cursor-pointer"
        >
          <span className="text-[17px] font-black text-slate-900 tracking-tight">Testly</span>
          <span className="text-[9px] font-medium text-slate-400 mt-[-1px]">Exams Made Easier</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleClick(e, l.href)}
              className="text-[13px] font-semibold text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => onOpenBooking('GRE')}
          className="hidden md:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-700 text-white text-[13px] font-semibold px-4 py-2 rounded-md transition-colors whitespace-nowrap shrink-0"
        >
          Check Your Exam & Savings
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => onOpenBooking('GRE')}
            className="bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap"
          >
            Check Savings
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="p-1.5 text-slate-700 hover:text-slate-900"
            aria-label="Toggle Navigation Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-1 pb-4 shadow-lg">
          {NAV_ITEMS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => {
                setOpen(false);
                handleClick(e, l.href);
              }}
              className="block py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 border-b border-slate-100 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onOpenBooking('GRE');
            }}
            className="mt-3 w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-2.5 rounded-md flex items-center justify-center gap-2"
          >
            Check Your Exam & Savings <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
