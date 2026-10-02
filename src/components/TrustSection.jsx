import React from 'react';
import { Users, Briefcase, Globe, BookOpen } from 'lucide-react';

const STATS = [
  { icon: Users,    value: '5,000+', label: 'Students Guided' },
  { icon: Briefcase,value: '100%',   label: 'Verified Audits' },
  { icon: Globe,    value: '4,000+', label: 'Overseas Connections' },
  { icon: BookOpen, value: 'Major',  label: 'Exam Categories' },
];

export default function TrustSection() {
  return (
    <section id="trust" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* LEFT — Photo with overlay stat */}
          <div className="relative rounded-2xl overflow-hidden h-72 lg:h-80 bg-slate-100">
            <img
              src="/assets/images/global-university-campus.jpg"
              alt="4,000+ Indian students successfully guided on GRE, TOEFL and IELTS exams with Testly"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/10 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-4xl font-black leading-none">4,000+</p>
              <p className="text-sm font-semibold mt-1 text-white/90">Students Guided</p>
              <p className="text-xs text-white/60 mt-1 max-w-[200px] leading-relaxed">
                Trusted by thousands of students on their global education journeys.
              </p>
            </div>
          </div>

          {/* RIGHT — Trust copy + stats */}
          <div className="space-y-5">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                You're in Good Company
              </h2>
              <p className="text-[15px] text-slate-500 font-medium mt-1">
                Backed by real students. Built on real experience.
              </p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Our team has experience helping{' '}
              <strong className="text-slate-900">4,000+ students</strong> navigate their exam and
              overseas-education journeys. That experience is now focused on making one part simpler:
              booking your exam correctly — and paying less for it.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {STATS.map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                    <Icon className="w-5 h-5 text-slate-500" />
                    <p className="text-xl font-black text-slate-900">{s.value}</p>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
