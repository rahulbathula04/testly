import React from 'react';

export default function Footer({ onOpenAdmin }) {
  return (
    <footer className="bg-white border-t border-slate-200 py-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">

        {/* Brand */}
        <div className="shrink-0">
          <p className="text-base font-black text-slate-900">Testly</p>
          <p className="text-[10px] text-slate-400 font-medium">Exams Made Easier</p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap items-center gap-6">
          {['Exams', 'How It Works', 'FAQ', 'Contact'].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-[13px] text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              {l}
            </a>
          ))}

          {/* Unobtrusive Admin Portal Access */}
          <button
            onClick={onOpenAdmin}
            className="text-[12px] text-slate-400 hover:text-slate-700 font-medium transition-colors"
          >
            Staff Login
          </button>
        </nav>

        {/* Disclaimer */}
        <p className="text-[11px] text-slate-400 font-medium text-right max-w-xs leading-relaxed">
          Independent exam registration assistance service.<br />
          Not affiliated with or endorsed by exam owners.
        </p>
      </div>
    </footer>
  );
}
