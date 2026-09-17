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
    <section id="resources" className="py-10 sm:py-16 bg-[#FAF9F6] border-b border-[#E5E7EB] font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7 sm:space-y-9">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FF] border border-[#BFDBFE] text-[#1E3A8A] text-[10px] sm:text-[10.5px] font-bold tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
              <span>RESOURCES & ADVICE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Everything You Need to Plan Your Exam
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] font-normal">
              Editorial guides, score comparisons, registration checklists and acceptance data.
            </p>
          </div>

          <button
            onClick={() => onNavigate ? onNavigate('/guides') : window.location.href = '/guides'}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A] hover:text-[#3B82F6] transition-colors group cursor-pointer self-start sm:self-auto"
          >
            <span>Explore All 24+ Guides</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Cards Grid — 2-col on mobile, 4-col on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {RESOURCES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onClick={() => handleClick(item.slug)}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between gap-3 hover:shadow-md hover:border-[#BFDBFE] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl ${item.iconBg} border flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <span className="text-[9.5px] sm:text-[10px] font-semibold text-[#64748B] bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-md group-hover:bg-[#EBF3FF] group-hover:text-[#1E3A8A] transition-colors truncate max-w-[90px] sm:max-w-none">
                    {item.tag}
                  </span>
                </div>

                <div className="space-y-0.5 sm:space-y-1">
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[10.5px] sm:text-[11px] text-[#64748B] font-normal line-clamp-1">
                    {item.sub}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px] sm:text-[11px] font-semibold text-[#64748B] group-hover:text-[#1E3A8A] transition-colors">
                  <span>Read Guide</span>
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
