import React from 'react';
import BrandLogo from './BrandLogo';

export default function Footer({ onOpenAdmin, onNavigate, onOpenAgreement }) {
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
    <footer className="bg-[#0F172A] text-white pt-10 sm:pt-14 pb-8 border-t border-slate-800 font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* 5-Column Grid — 2-column on mobile, 12-col on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Col 1: Brand & Bio (Spans full 2 cols on mobile, 4 cols on desktop) */}
          <div className="col-span-2 lg:col-span-4 space-y-3">
            <a
              href="/"
              onClick={(e) => handleClick(e, '/')}
              className="inline-block"
            >
              <BrandLogo variant="horizontal" size="md" theme="light" />
              <span className="text-[11px] font-medium text-slate-400 block tracking-wide mt-1 italic">
                Book smarter. Go further.
              </span>
            </a>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              India's verified exam registration partner. Save on fees with corporate vouchers and professional concierge assistance.
            </p>
          </div>

          {/* Col 2: Exams (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">
              Exams
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="/gre" onClick={(e) => handleClick(e, '/gre')} className="hover:text-white transition-colors">Testly GRE</a></li>
              <li><a href="/exam-fees" onClick={(e) => handleClick(e, '/exam-fees')} className="hover:text-white transition-colors">TOEFL iBT</a></li>
              <li><a href="/exam-fees" onClick={(e) => handleClick(e, '/exam-fees')} className="hover:text-white transition-colors">PTE Academic</a></li>
              <li><a href="/exam-fees" onClick={(e) => handleClick(e, '/exam-fees')} className="hover:text-white transition-colors">IELTS Academic</a></li>
              <li><a href="/exam-fees" onClick={(e) => handleClick(e, '/exam-fees')} className="hover:text-white transition-colors">GMAT Focus</a></li>
              <li><a href="/exam-fees" onClick={(e) => handleClick(e, '/exam-fees')} className="hover:text-white transition-colors">Duolingo DET</a></li>
            </ul>
          </div>

          {/* Col 3: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="/about" onClick={(e) => handleClick(e, '/about')} className="hover:text-white transition-colors">Why We Built Testly</a></li>
              <li><a href="/exam-fees" onClick={(e) => handleClick(e, '/exam-fees')} className="hover:text-white transition-colors">Exam Fees Tracker</a></li>
              <li><a href="/assessment-intelligence" onClick={(e) => handleClick(e, '/assessment-intelligence')} className="hover:text-white transition-colors">Assessment Intel</a></li>
              <li><a href="/campus" onClick={(e) => handleClick(e, '/campus')} className="hover:text-white transition-colors">Testly Campus</a></li>
              <li><a href="/professionals" onClick={(e) => handleClick(e, '/professionals')} className="hover:text-white transition-colors">Team Specialists</a></li>
              <li><a href="/guides" onClick={(e) => handleClick(e, '/guides')} className="hover:text-white transition-colors">Candidate Guides</a></li>
            </ul>
          </div>

          {/* Col 4: Legal (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">
              Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={onOpenAgreement} className="hover:text-white transition-colors text-left">Terms of Service</button></li>
              <li><button onClick={onOpenAgreement} className="hover:text-white transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={onOpenAgreement} className="hover:text-white transition-colors text-left">Refund Policy</button></li>
              <li><button onClick={onOpenAgreement} className="hover:text-white transition-colors text-left">Disclaimer</button></li>
            </ul>
          </div>

          {/* Col 5: Follow Us (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">
              Follow Us
            </h4>
            <div className="flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.761-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>

            {/* Subtle Staff Login Link */}
            <div className="pt-4">
              <button
                onClick={onOpenAdmin}
                className="text-[10px] text-slate-600 hover:text-slate-400 transition-colors uppercase tracking-widest font-mono"
              >
                STAFF SECURE LOGIN →
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-400 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="font-semibold text-slate-300">100% Official Institutional Vouchers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
            <span className="font-semibold text-slate-300">Govt. of India MCA Registered</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
            <span className="font-semibold text-slate-300">Zero Error Registration Guarantee</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} Testly Education Pvt Ltd. All rights reserved.</p>
          <p>ETS®, GRE®, TOEFL®, Pearson®, PTE®, and IELTS™ are registered trademarks of their respective owners.</p>
        </div>

      </div>
    </footer>
  );
}
