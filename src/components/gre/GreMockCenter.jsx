import React from 'react';
import {
  Clock,
  ArrowRight,
  ShieldCheck,
  Play,
  CheckCircle2,
  FileText
} from 'lucide-react';

const GRE_ASSESSMENTS = [
  {
    id: 'mock-01',
    number: '01',
    title: 'Testly Calibrated Baseline Simulation #1',
    duration: '1 hr 58 min',
    structure: '1 Analytical Writing · 2 Verbal Reasoning · 2 Quantitative Reasoning',
    timing: 'Standard ETS Calibration: 21m / 26m per section',
    description: 'Comprehensive baseline evaluation matching official ETS distribution and time constraints.'
  },
  {
    id: 'mock-02',
    number: '02',
    title: 'Section-Adaptive Multi-Stage Simulation #2',
    duration: '1 hr 58 min',
    structure: 'Section 1 Baseline Routing → Section 2 Dynamic Difficulty',
    timing: 'Adaptive routing pool based on Section 1 performance',
    description: 'Simulates section-level adaptation where your accuracy in Stage 1 dictates item difficulty in Stage 2.'
  },
  {
    id: 'mock-03',
    number: '03',
    title: 'High-Density 325+ Percentile Challenge #3',
    duration: '1 hr 58 min',
    structure: 'Advanced Quant Multi-Concept Items · Complex Verbal Traps',
    timing: 'Standard ETS timing under elevated cognitive density',
    description: 'Targeted at candidates aiming for 325+ percentiles with advanced multi-blank text completions.'
  }
];

export default function GreMockCenter({ onLaunchMock }) {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 space-y-8 font-[Inter,system-ui,sans-serif] text-[#0F172A]">
      
      {/* Editorial Header */}
      <div className="max-w-2xl space-y-2 border-b border-slate-200 pb-6">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1E3A8A]">
          Testly 100 · Calibrated Simulations
        </span>
        <h1 className="text-3xl font-serif font-bold text-[#0F172A] tracking-tight">
          Full-Length GRE Simulations
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
          Calibrated against the 2026 GRE General Test format. All scores generate uninflated Testly Practice Reports.
        </p>
      </div>

      {/* Grid of Clean, Institutional Mock Cards */}
      <div className="space-y-4">
        {GRE_ASSESSMENTS.map((mock) => (
          <div
            key={mock.id}
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-[#1E3A8A] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  MOCK {mock.number}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{mock.duration}</span>
                </span>
              </div>

              <h2 className="text-base font-bold text-[#0F172A] font-serif">
                {mock.title}
              </h2>

              <p className="text-xs text-[#64748B] leading-relaxed">
                {mock.description}
              </p>

              <div className="text-[11px] text-slate-500 font-mono">
                {mock.structure}
              </div>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => onLaunchMock && onLaunchMock(mock.id)}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-xs font-bold hover:bg-[#1E3A8A] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white text-white" />
                <span>Launch Simulation</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Subtle Institutional Footnote */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-[#64748B] flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#1E3A8A] shrink-0" />
        <span>
          Calibrated diagnostic items. Testly Practice Scores do not represent official ETS predictions.
        </span>
      </div>

    </div>
  );
}
