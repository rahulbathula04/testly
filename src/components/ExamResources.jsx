import React from 'react';
import { FileText, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';

const RESOURCES = [
  {
    title: 'IELTS vs TOEFL',
    sub: 'Which is better for you?',
    tag: '5 min read',
    icon: FileText,
    iconBg: 'bg-blue-50 text-blue-700 border-blue-100',
    slug: 'toefl-vs-ielts-for-indian-students'
  },
  {
    title: 'GRE Preparation',
    sub: 'Timeline and strategy',
    tag: 'Updated 2026',
    icon: BookOpen,
    iconBg: 'bg-orange-50 text-orange-700 border-orange-100',
    slug: 'gre-test-format-scoring-scale'
  },
  {
    title: 'PTE Registration Guide',
    sub: 'Step-by-step process',
    tag: 'Official Checklist',
    icon: FileText,
    iconBg: 'bg-teal-50 text-teal-700 border-teal-100',
    slug: 'pte-academic-registration-step-by-step'
  },
  {
    title: 'Duolingo vs IELTS',
    sub: 'Key differences & acceptance',
    tag: 'University List',
    icon: ShieldCheck,
    iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    slug: 'duolingo-english-test-acceptance-universities'
  }
];

export default function ExamResources({ onNavigate }) {
  const handleClick = (slug) => {
    if (onNavigate) {
      onNavigate(`/guides/${slug}`);
    } else {
      window.location.href = `/guides/${slug}`;
    }
  };

  return (
    <section id="resources" className="py-12 sm:py-16 bg-slate-50/60 border-b border-slate-200/80 font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-9">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 text-[10px] font-extrabold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>RESOURCES & ADVICE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Everything You Need to Plan Your Exam
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Editorial guides, score comparisons, registration checklists and acceptance data.
            </p>
          </div>

          <button
            onClick={() => onNavigate ? onNavigate('/guides') : window.location.href = '/guides'}
            className="inline-flex items-center gap-1.5 text-xs font-black text-blue-700 hover:text-blue-900 transition-colors group cursor-pointer"
          >
            <span>Explore All 24+ Guides</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RESOURCES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onClick={() => handleClick(item.slug)}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between gap-4 hover:shadow-xl hover:border-blue-200 transition-all duration-200 hover:-translate-y-1 cursor-pointer group shadow-[0_2px_8px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-11 h-11 rounded-xl ${item.iconBg} border flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                    {item.tag}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs sm:text-[13px] font-black text-slate-950 group-hover:text-blue-700 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-1">
                    {item.sub}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-blue-700 transition-colors">
                  <span>Read Free Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
