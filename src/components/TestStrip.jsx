import React from 'react';

export default function TestStrip({ onSelectTest }) {
  const tests = [
    { name: 'TOEFL', tag: 'TOEFL' },
    { name: 'IELTS', tag: 'IELTS' },
    { name: 'GRE', tag: 'GRE' },
    { name: 'PTE', tag: 'PTE' },
    { name: 'Duolingo DET', tag: 'Duolingo' },
    { name: 'GMAT', tag: 'GMAT' },
    { name: 'LSAT', tag: 'LSAT' }
  ];

  return (
    <section className="py-6 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Test Logos Bar */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
          {tests.map((t, idx) => (
            <button
              key={idx}
              onClick={() => onSelectTest && onSelectTest(t.tag)}
              className="px-3.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors text-xs font-bold text-slate-800 uppercase tracking-wider"
            >
              <span>{t.name}</span>
            </button>
          ))}
        </div>

        {/* Right Label */}
        <p className="text-xs font-medium text-slate-500 uppercase tracking-widest text-center md:text-right shrink-0">
          Supported Global Testing Bodies & Portals
        </p>

      </div>
    </section>
  );
}
