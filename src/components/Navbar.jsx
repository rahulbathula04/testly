import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronDown, Menu, X, MapPin, Users, HelpCircle, FileText } from 'lucide-react';

const PRIMARY_LINKS = [
  { label: 'Fees & Savings', href: '/exam-fees' },
  { label: 'Campus', href: '/campus' },
  { label: 'Guides', href: '/guides' },
  { label: 'How It Works', href: '/#how-it-works' },
];

const MORE_LINKS = [
  {
    label: 'Hyderabad Hub',
    desc: 'Begumpet & Central Desk',
    href: '/locations/hyderabad',
    icon: MapPin,
  },
  {
    label: 'Madhapur Desk',
    desc: 'Hitec City IT Corridor',
    href: '/locations/madhapur',
    icon: MapPin,
  },
  {
    label: 'Verified Professionals',
    desc: 'Direct booking desk officers',
    href: '/professionals',
    icon: Users,
  },
  {
    label: 'FAQ & Guarantees',
    desc: 'Official booking policies',
    href: '/#faq',
    icon: HelpCircle,
  },
];

export default function Navbar({ onOpenBooking, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">

        {/* Brand */}
        <a
          href="/"
          onClick={(e) => handleClick(e, '/')}
          className="flex flex-col shrink-0 leading-none cursor-pointer select-none"
        >
          <span className="text-[17px] font-black text-slate-900 tracking-tight">Testly</span>
          <span className="text-[9px] font-semibold text-slate-400 mt-[-1px] tracking-wide uppercase">Exams Made Easier</span>
        </a>

        {/* Minimal Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {PRIMARY_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors tracking-tight whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}

          {/* More / Hubs Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
              className="flex items-center gap-1 text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors tracking-tight whitespace-nowrap focus:outline-hidden"
              aria-expanded={dropdownOpen}
            >
              <span>More</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-slate-700' : ''}`} />
            </button>

            {dropdownOpen && (
              <div
                onMouseLeave={() => setDropdownOpen(false)}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-150 p-2 z-50 transition-all"
              >
                <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Locations & Company
                </div>
                {MORE_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        setDropdownOpen(false);
                        handleClick(e, item.href);
                      }}
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-900 group-hover:text-white transition-colors shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[12.5px] font-semibold text-slate-800 group-hover:text-slate-900">
                          {item.label}
                        </span>
                        <span className="text-[11px] text-slate-400 truncate">
                          {item.desc}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Minimal Action CTA */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => onOpenBooking('GRE')}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12.5px] font-semibold px-4 py-1.5 rounded-full transition-all duration-150 hover:shadow-xs active:scale-[0.98] cursor-pointer"
          >
            Check Savings
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => onOpenBooking('GRE')}
            className="bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer"
          >
            Check Savings
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 shadow-xl space-y-4">
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
              Main Menu
            </div>
            {PRIMARY_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setMobileOpen(false);
                  handleClick(e, link.href);
                }}
                className="block px-2.5 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
              Locations & Company
            </div>
            {MORE_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  setMobileOpen(false);
                  handleClick(e, item.href);
                }}
                className="block px-2.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenBooking('GRE');
            }}
            className="mt-3 w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-2.5 rounded-full flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            Check Exam Savings <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
