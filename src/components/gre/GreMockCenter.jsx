import React from 'react';
import {
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  Award,
  Play,
  CheckCircle2
} from 'lucide-react';

const GRE_MOCKS = [
  {
    id: 'mock-01',
    number: '01',
    title: 'Testly GRE Mock #1: Diagnostic Baseline',
    type: 'Full-Length Simulation',
    duration: '1 hr 58 min',
    sectionsCount: 5,
    structure: '1 AW (30m) · 2 Verbal (41m) · 2 Quant (47m)',
    difficulty: 'Standard ETS Distribution (E2–E4)',
    status: 'READY_TO_LAUNCH',
    description: 'Calibrated baseline simulation matching official ETS 1:58 timing constraints and item distribution.'
  },
  {
    id: 'mock-02',
    number: '02',
    title: 'Testly GRE Mock #2: Section-Adaptive Standard Test',
    type: 'Section-Adaptive Simulation',
    duration: '1 hr 58 min',
    sectionsCount: 5,
    structure: 'Section 1 Routing + Section 2 Dynamic Difficulty',
    difficulty: 'Adaptive Routing Pool (E1–E5)',
    status: 'READY_TO_LAUNCH',
    description: 'Implements Testly section-level routing: performance in Section 1 dictates your Section 2 pool.'
  },
  {
    id: 'mock-03',
    number: '03',
    title: 'Testly GRE Mock #3: High-Scorer Challenge Test',
    type: 'Advanced Challenge Simulation',
    duration: '1 hr 58 min',
    sectionsCount: 5,
    structure: '1 AW · 2 High-Density Verbal · 2 Advanced Quant',
    difficulty: 'Concentrated E3–E5 Advanced Items',
    status: 'READY_TO_LAUNCH',
    description: 'Targeted at candidates aiming for 325+ percentiles with advanced multi-blank text completion and dense data analysis.'
  }
];

export default function GreMockCenter({ onLaunchMock }) {
  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 space-y-8 font-[Inter,system-ui,sans-serif]">
      
      {/* ── HEADER ── */}
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            MOCK EXAMS · STAGE 03
          </span>
          <span className="text-xs text-slate-500 font-mono">
            3 Full-Length Simulations
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
          Testly GRE Mock Tests
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Full-length assessments built strictly against the official 5-section shortened GRE structure. We provide 3 thoroughly calibrated original mocks rather than hundreds of unvalidated items.
        </p>
      </div>

      {/* ── MOCK CARDS GRID ── */}
      <div className="space-y-4">
        {GRE_MOCKS.map((mock) => (
          <div
            key={mock.id}
            className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 hover:border-[#1E3A8A] transition-all shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded">
                    MOCK {mock.number}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {mock.type}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
                  {mock.title}
                </h3>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-600 shrink-0">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {mock.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  {mock.sectionsCount} Sections
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {mock.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase block font-bold">Section Composition</span>
                <span className="font-semibold text-slate-800">{mock.structure}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase block font-bold">Difficulty Profile</span>
                <span className="font-semibold text-slate-800">{mock.difficulty}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified Current Format
              </span>

              <button
                onClick={() => onLaunchMock(mock.id)}
                className="bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Launch Mock Exam</span>
                <Play className="w-3.5 h-3.5 fill-current text-blue-300" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── LEGAL DISCLOSURE ── */}
      <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-1.5 leading-relaxed">
        <strong className="text-slate-800 block font-semibold">Testly Mock Authenticity Standard:</strong>
        Testly mock exams are 100% original simulations written by Testly assessment specialists against published ETS content specifications. Testly does not reproduce or scrape official ETS testing materials. Testly is not affiliated with or endorsed by Educational Testing Service (ETS).
      </div>

    </div>
  );
}
