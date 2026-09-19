import React from 'react';
import {
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Clock,
  Award,
  AlertTriangle,
  Play,
  TrendingUp,
  Brain,
  ShieldCheck
} from 'lucide-react';
import { calculateGreReadiness } from '../../data/gre/greReadinessEngine';

export default function GreReportView({ diagnosticResult, onStartPractice, onRetakeDiagnostic, onExploreMocks }) {
  // If no diagnostic result yet, fallback to default benchmark values
  const report = diagnosticResult || {
    accuracyPct: 78,
    verbalScorePct: 74,
    quantScorePct: 81,
    estimatedVerbalScore: 156,
    estimatedQuantScore: 162,
    estimatedComposite: 318,
    displayDate: '19 Sep 2026',
    strongestArea: { skill: 'Arithmetic', performance: 88 },
    weakestArea: { skill: 'Sentence Equivalence', performance: 69 },
    timeManagement: { score: 69, avgSecondsPerItem: 104 },
    skillMap: [
      { skill: 'Arithmetic', domain: 'Quantitative', performance: 88, status: 'Strong' },
      { skill: 'Data Analysis', domain: 'Quantitative', performance: 84, status: 'Strong' },
      { skill: 'Reading Comprehension', domain: 'Verbal', performance: 82, status: 'Strong' },
      { skill: 'Algebra', domain: 'Quantitative', performance: 79, status: 'Developing' },
      { skill: 'Geometry', domain: 'Quantitative', performance: 72, status: 'Developing' },
      { skill: 'Text Completion', domain: 'Verbal', performance: 71, status: 'Developing' },
      { skill: 'Sentence Equivalence', domain: 'Verbal', performance: 69, status: 'Priority' }
    ]
  };

  const readiness = calculateGreReadiness(report);

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 space-y-10 font-[Inter,system-ui,sans-serif]">
      
      {/* ── 1. REPORT HEADER ── */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
        <div className="space-y-1">
          <div className="font-mono text-xs uppercase font-bold text-[#1E3A8A] tracking-wider">
            TESTLY / GRE
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
            Your Assessment Report
          </h1>
          <p className="text-xs text-[#64748B] font-mono">
            Diagnostic Baseline · Completed {report.displayDate || '19 Sep 2026'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onRetakeDiagnostic}
            className="text-xs font-mono font-bold px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Retake Diagnostic</span>
          </button>
        </div>
      </div>

      {/* ── 2. PERFORMANCE & TESTLY READINESS SCORE™ ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Readiness Metric Tile */}
        <div className="md:col-span-5 bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase font-bold text-blue-400 tracking-wider">
              TESTLY GRE READINESS™
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-black font-['DM_Serif_Display',Georgia,serif] text-white">
                {readiness.overallReadiness}
              </span>
              <span className="text-xl text-slate-400 font-mono font-semibold">/ 100</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden mt-2">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${readiness.overallReadiness}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 text-[11px] text-slate-300 space-y-1 leading-relaxed">
            <strong className="text-white block font-semibold">Proprietary Practice Metric:</strong>
            Not an official ETS score. Reflects current calibration across accuracy, difficulty, consistency, and pacing.
          </div>
        </div>

        {/* Section Score Breakdown */}
        <div className="md:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs">
          <div className="space-y-1 border-b border-slate-100 pb-3">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
              ESTIMATED SECTION PERFORMANCE
            </span>
            <h3 className="text-lg font-black text-slate-900 font-['DM_Serif_Display',Georgia,serif]">
              Diagnostic Range Estimates
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">VERBAL</span>
              <div className="text-2xl font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
                {report.verbalScorePct || 74}
              </div>
              <span className="text-[11px] text-[#1E3A8A] font-semibold block">
                ~{report.estimatedVerbalScore || 156} Est. Scaled
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">QUANT</span>
              <div className="text-2xl font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
                {report.quantScorePct || 81}
              </div>
              <span className="text-[11px] text-[#1E3A8A] font-semibold block">
                ~{report.estimatedQuantScore || 162} Est. Scaled
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">WRITING</span>
              <div className="text-2xl font-black text-slate-400 font-['DM_Serif_Display',Georgia,serif]">
                —
              </div>
              <span className="text-[10px] text-slate-400 font-semibold block">
                Separate Review
              </span>
            </div>
          </div>

          {/* Diagnostic Bottleneck Insight Callout */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-1 leading-relaxed">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Diagnostic Assessment Insight:</span>
            </div>
            <p>{readiness.primaryConstraint}</p>
          </div>
        </div>
      </div>

      {/* ── 3. READINESS SIGNAL COMPONENTS ── */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
            SIGNAL DECOMPOSITION
          </span>
          <h3 className="text-lg font-black text-slate-900 font-['DM_Serif_Display',Georgia,serif]">
            Readiness Components
          </h3>
        </div>

        <div className="space-y-3.5">
          {readiness.components.map((comp) => (
            <div key={comp.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-slate-700">{comp.name}</span>
                <span className="text-[#0F172A]">{comp.score} / 100</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    comp.score >= 80 ? 'bg-emerald-500' : comp.score >= 70 ? 'bg-blue-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${comp.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">{comp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. SKILL MAP MATRIX ── */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
              CONSTRUCT-LEVEL PERFORMANCE
            </span>
            <h3 className="text-lg font-black text-slate-900 font-['DM_Serif_Display',Georgia,serif]">
              Skill Map Matrix
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">7 Core Competencies</span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-3.5">Skill</th>
                <th className="p-3.5">Domain</th>
                <th className="p-3.5">Performance</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-sans">
              {report.skillMap.map((s) => {
                const isStrong = s.status === 'Strong';
                const isPriority = s.status === 'Priority';

                return (
                  <tr key={s.skill} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5 font-bold text-[#0F172A]">{s.skill}</td>
                    <td className="p-3.5 text-slate-500 text-xs font-mono">{s.domain}</td>
                    <td className="p-3.5 font-mono font-black text-sm">
                      <span className={isStrong ? 'text-emerald-700' : isPriority ? 'text-amber-700' : 'text-blue-700'}>
                        {s.performance}
                      </span>
                      <span className="text-slate-400 text-xs font-normal"> / 100</span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                          isStrong
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : isPriority
                            ? 'bg-amber-50 text-amber-900 border border-amber-200'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => onStartPractice(s.skill)}
                        className="text-xs font-bold text-[#1E3A8A] hover:underline cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>Practice</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 5. THE KILLER FEATURE: WHAT SHOULD I DO NEXT? (THE 7-DAY LEARNING LOOP) ── */}
      <div className="bg-[#FAF9F6] border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              RECOMMENDED NEXT ACTION
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
            Your next 7 days
          </h2>
          <p className="text-xs text-slate-600">
            A concrete, sequential learning loop derived from your diagnostic profile.
          </p>
        </div>

        {/* Immediate Next Step Card */}
        <div className="bg-white border-2 border-[#1E3A8A] rounded-2xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-black uppercase text-[#1E3A8A] tracking-wider">
              IMMEDIATE LEVERAGE STEP 01
            </span>
            <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              Priority Area
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
            Start with a 20-question {readiness.weakestArea.skill} diagnostic drill
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your accuracy in {readiness.weakestArea.skill} ({readiness.weakestArea.performance}%) represents your largest near-term opportunity. Concentrated practice on synonym pairing and distractor elimination will immediately boost your Verbal section routing.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onStartPractice(readiness.weakestArea.skill)}
              className="bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Launch {readiness.weakestArea.skill} Drill</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
            </button>
          </div>
        </div>

        {/* 4-Step Sequential Roadmap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {readiness.next7DaysPlan.map((plan) => (
            <div key={plan.step} className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <span className="text-xs font-mono font-black text-[#1E3A8A] block">
                {plan.step}
              </span>
              <div className="text-xs font-bold text-slate-900 leading-snug">
                {plan.title}
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {plan.action}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
