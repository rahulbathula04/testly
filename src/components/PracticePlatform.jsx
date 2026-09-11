import React from 'react';
import { ArrowRight, Laptop, Cpu, LineChart, Target } from 'lucide-react';

export default function PracticePlatform({ onOpenFreeMock }) {
  const cards = [
    {
      icon: Laptop,
      title: 'Realistic Mock Tests',
      desc: 'Practice under realistic timing and conditions.'
    },
    {
      icon: Cpu,
      title: 'AI-Powered Analysis',
      desc: "Understand where you're losing marks."
    },
    {
      icon: LineChart,
      title: 'Performance Tracking',
      desc: 'See your progress over time.'
    },
    {
      icon: Target,
      title: 'Personalised Practice',
      desc: 'Spend more time where it matters.'
    }
  ];

  return (
    <section id="practice" className="py-20 bg-[#F7FAFF] border-b border-[#E5EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <p className="text-xs font-black uppercase tracking-widest text-[#667085]">
            PRACTICE & MOCK TESTS
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-[#102A56] tracking-tight">
            Don't just take the test. Prepare for it.
          </h2>
          <p className="text-base sm:text-lg text-[#667085] font-medium leading-relaxed">
            Practice in an environment designed around the real test experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 4 Feature Cards (2x2 Grid) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E5EAF2] shadow-xs space-y-3 hover:border-[#1769E0]/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-[#F2F7FF] text-[#1769E0] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-extrabold text-[#102A56]">{card.title}</h3>
                    <p className="text-xs text-[#667085] font-medium leading-relaxed">{card.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Dual CTAs Below Cards */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={onOpenFreeMock}
                className="w-full sm:w-auto bg-[#1769E0] hover:bg-[#102A56] text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>Try a Free Mock</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenFreeMock}
                className="text-sm font-extrabold text-[#1769E0] hover:underline py-2"
              >
                Explore All Practice Features
              </button>
            </div>
          </div>

          {/* Right Column: Laptop Visual with Floating Badge */}
          <div className="lg:col-span-6 relative">
            
            {/* Top Right Handwritten Script Overlay */}
            <div className="absolute -top-10 right-4 z-20 transform rotate-3 hidden sm:block">
              <span className="font-handwriting text-2xl font-bold text-[#102A56] leading-tight block">
                Practice. <br />
                Improve. <br />
                <span className="text-[#1769E0]">Go Further.</span>
              </span>
            </div>

            {/* Laptop Frame Visual */}
            <div className="bg-[#0B192C] p-4 rounded-2xl border-4 border-slate-700 shadow-2xl relative">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-white space-y-4">
                
                <div className="flex justify-between items-center text-xs font-bold text-slate-400 border-b border-slate-800 pb-2">
                  <span>Testly Practice Platform</span>
                  <span className="text-[#18A957]">Live Mock Session</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs py-2">
                  <div className="bg-slate-800 p-2 rounded-lg">
                    <p className="text-slate-400">Questions</p>
                    <p className="font-black text-white text-base">40/40</p>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-lg">
                    <p className="text-slate-400">Time Left</p>
                    <p className="font-black text-red-400 text-base">14:20</p>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-lg">
                    <p className="text-slate-400">Accuracy</p>
                    <p className="font-black text-[#18A957] text-base">85%</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Floating Progress Badge */}
            <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-4 rounded-2xl shadow-xl border border-[#E5EAF2] space-y-1.5 z-20 max-w-[220px]">
              <p className="text-[11px] font-extrabold text-[#667085] uppercase tracking-wider">Your Progress</p>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-black text-[#1769E0]">+120</span>
                <span className="text-xs font-bold text-[#102A56]">Practice Questions</span>
              </div>
              <div className="flex justify-between text-xs font-extrabold text-[#102A56] pt-1 border-t border-[#E5EAF2]">
                <span>85% Accuracy</span>
                <span className="text-[#18A957]">↑ 40%</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
