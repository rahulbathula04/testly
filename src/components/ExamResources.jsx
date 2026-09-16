import React from 'react';
import { FileText, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';

const RESOURCES = [
  {
    title: 'IELTS vs TOEFL',
    sub: 'Which is better for you?',
    icon: FileText,
    iconBg: 'bg-blue-50 text-blue-700',
    slug: 'toefl-vs-ielts-for-indian-students'
  },
  {
    title: 'GRE Preparation',
    sub: 'Timeline and strategy',
    icon: BookOpen,
    iconBg: 'bg-orange-50 text-orange-700',
    slug: 'gre-test-format-scoring-scale'
  },
  {
    title: 'PTE Registration Guide',
    sub: 'Step-by-step process',
    icon: FileText,
    iconBg: 'bg-teal-50 text-teal-700',
    slug: 'pte-academic-registration-step-by-step'
  },
  {
    title: 'Duolingo vs IELTS',
    sub: 'Key differences',
    icon: ShieldCheck,
    iconBg: 'bg-emerald-50 text-emerald-700',
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
    <section id="resources" className="py-12 sm:py-16 bg-slate-50/70 border-b border-slate-200/80 font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-2">
            <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-extrabold uppercase tracking-wider">
              RESOURCES
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Everything You Need to Plan Your Exam
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Guides, comparisons, tips and more.
            </p>
          </div>

          <button
            onClick={() => onNavigate ? onNavigate('/guides') : window.location.href = '/guides'}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors group"
          >
            <span>Explore Resources</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
                className="bg-white border border-slate-200/80 rounded-2xl p-4.5 flex items-center justify-between gap-3 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-black text-slate-900 group-hover:text-blue-700 transition-colors truncate">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                      {item.sub}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
