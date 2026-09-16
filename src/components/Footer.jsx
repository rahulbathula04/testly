import React from 'react';

export default function Footer({ onOpenAdmin, onNavigate }) {
  const handleNav = (e, href) => {
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
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-12 pb-8 text-xs font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-tight">Testly</span>
              <span className="text-[11px] font-medium text-slate-400">Exams Made Easier</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              India's premier exam registration assistance service. We empower students and study-abroad aspirants to book official exams with corporate voucher savings, zero foreign card markups, and human-verified passport checks.
            </p>
            <div className="pt-2 text-[11px] text-slate-500">
              Telangana Support Desk: +91 93473 79041 • Madhapur & Begumpet
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-2.5">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Local Hubs</p>
            <ul className="space-y-2">
              <li>
                <a
                  href="/locations/hyderabad"
                  onClick={(e) => handleNav(e, '/locations/hyderabad')}
                  className="hover:text-white transition-colors"
                >
                  Hyderabad Central Hub
                </a>
              </li>
              <li>
                <a
                  href="/locations/madhapur"
                  onClick={(e) => handleNav(e, '/locations/madhapur')}
                  className="hover:text-white transition-colors"
                >
                  Madhapur Prometric Desk
                </a>
              </li>
              <li>
                <span className="text-slate-500">Begumpet Pearson Desk</span>
              </li>
              <li>
                <span className="text-slate-500">Somajiguda IDP Desk</span>
              </li>
            </ul>
          </div>

          {/* Pricing & Tools */}
          <div className="space-y-2.5">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Fees & Savings</p>
            <ul className="space-y-2">
              <li>
                <a
                  href="/exam-fees"
                  onClick={(e) => handleNav(e, '/exam-fees')}
                  className="hover:text-white transition-colors"
                >
                  Exam Fee & Savings Tracker
                </a>
              </li>
              <li>
                <a
                  href="/#savings"
                  onClick={(e) => handleNav(e, '/#savings')}
                  className="hover:text-white transition-colors"
                >
                  GRE Voucher Rates
                </a>
              </li>
              <li>
                <a
                  href="/#savings"
                  onClick={(e) => handleNav(e, '/#savings')}
                  className="hover:text-white transition-colors"
                >
                  TOEFL Voucher Rates
                </a>
              </li>
              <li>
                <a
                  href="/#savings"
                  onClick={(e) => handleNav(e, '/#savings')}
                  className="hover:text-white transition-colors"
                >
                  PTE & IELTS Vouchers
                </a>
              </li>
            </ul>
          </div>

          {/* About & Trust */}
          <div className="space-y-2.5">
            <p className="text-xs font-bold text-white uppercase tracking-wider">About & Trust</p>
            <ul className="space-y-2">
              <li>
                <a
                  href="/guides"
                  onClick={(e) => handleNav(e, '/guides')}
                  className="hover:text-white transition-colors"
                >
                  Guides & Research Library
                </a>
              </li>
              <li>
                <a
                  href="/professionals"
                  onClick={(e) => handleNav(e, '/professionals')}
                  className="hover:text-white transition-colors"
                >
                  Meet Our Professionals
                </a>
              </li>
              <li>
                <a
                  href="/#how-it-works"
                  onClick={(e) => handleNav(e, '/#how-it-works')}
                  className="hover:text-white transition-colors"
                >
                  How Registration Works
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  onClick={(e) => handleNav(e, '/#faq')}
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Staff Portal
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Line & Legal Disclaimer */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Testly Services India. All rights reserved.</p>

          <p className="text-center md:text-right max-w-xl leading-relaxed">
            Testly is an independent exam registration assistance service. ETS, GRE, TOEFL, Pearson, PTE, IDP, IELTS, GMAC, and Duolingo are registered trademarks of their respective owners. Testly is not affiliated with or endorsed by these testing entities.
          </p>
        </div>

      </div>
    </footer>
  );
}
