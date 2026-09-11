import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function TestCatalog({ onSelectTest }) {
  const tests = [
    {
      id: 'TOEFL',
      title: 'TOEFL',
      desc: 'English proficiency for global opportunities'
    },
    {
      id: 'IELTS',
      title: 'IELTS',
      desc: 'Study, work, or migrate abroad'
    },
    {
      id: 'GRE',
      title: 'GRE',
      desc: 'Graduate admissions worldwide'
    },
    {
      id: 'PTE',
      title: 'PTE',
      desc: 'Fast, Flexible, Globally accepted'
    },
    {
      id: 'Duolingo',
      title: 'duolingo english test',
      desc: 'Prove your English anywhere'
    },
    {
      id: 'GMAT',
      title: 'GMAT',
      desc: 'For future business leaders'
    },
    {
      id: 'LSAT',
      title: 'LSAT',
      desc: 'For tomorrow\'s legal minds'
    }
  ];

  return (
    <section id="tests" className="py-20 bg-white border-b border-[#E5EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <p className="text-xs font-black uppercase tracking-widest text-[#667085]">
            CHOOSE YOUR TEST
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-[#102A56] tracking-tight">
            Find the right test for your goals.
          </h2>
        </div>

        {/* 7 Horizontal Grid Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {tests.map((item) => (
            <div 
              key={item.id}
              className="bg-[#F7FAFF] p-5 rounded-2xl border border-[#E5EAF2] hover:border-[#1769E0]/40 transition-all hover:shadow-md flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-black text-[#102A56] uppercase tracking-tight group-hover:text-[#1769E0] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#667085] font-medium leading-snug">
                  {item.desc}
                </p>
              </div>

              <button
                onClick={() => onSelectTest && onSelectTest(item.id)}
                className="w-full text-left text-xs font-extrabold text-[#1769E0] hover:underline flex items-center justify-between pt-2 border-t border-[#E5EAF2]/60"
              >
                <span>View Test</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
