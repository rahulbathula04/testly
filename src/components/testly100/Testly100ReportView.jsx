import React from 'react';
import {
  Award,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileText,
  ShieldCheck,
  Share2,
  RotateCcw
} from 'lucide-react';
import BrandLogo from '../BrandLogo';

export default function Testly100ReportView({ result, participant, onRetake, onExit }) {
  const score = result?.score || {
    quantitative: 162,
    verbal: 157,
    total: 319,
    accuracyPercent: 78,
    questionsAttempted: 12,
    totalQuestions: 12,
    correctCount: 9
  };

  const participantNumber = participant?.participant_number || 'TESTLY-042';
  const participantName = participant?.name || 'Cohort Candidate';

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] font-[Inter,system-ui,sans-serif] p-4 sm:p-8 space-y-8 print:p-0">
      
      {/* ── TOP UTILITY STRIP ── */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-200 pb-4 print:hidden">
        <div className="flex items-center gap-3">
          <BrandLogo variant="horizontal" size="sm" />
          <div className="h-5 w-[1px] bg-slate-300" />
          <span className="text-xs font-mono font-bold text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            TESTLY 100 DIAGNOSTIC REPORT
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Export / Print PDF
          </button>
          {onExit && (
            <button
              onClick={onExit}
              className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Exit to Portal
            </button>
          )}
        </div>
      </div>

      {/* ── REPORT DOCUMENT BODY ── */}
      <main className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
        
        {/* Candidate Identifier Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              OFFICIAL PARTICIPANT REPORT · VERIFIED SEAT
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
              {participantName}
            </h1>
            <p className="text-xs font-mono text-slate-500">
              Assigned ID: <strong className="text-[#1E3A8A]">{participantNumber}</strong> · Target Exam: GRE General Test
            </p>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Assessment Completed</span>
            <span className="text-xs font-semibold text-slate-700 font-mono">
              {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* ── PRACTICE SCORE CARDS (NO FAKE OFFICIAL CLAIMS) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#0F172A] text-white rounded-2xl p-6 space-y-2 border border-slate-800">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              TESTLY PRACTICE TOTAL
            </span>
            <div className="text-4xl sm:text-5xl font-black text-white font-mono">
              {score.total}
              <span className="text-sm font-normal text-slate-400"> / 340</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Calibrated baseline score based on authentic shortened GRE item difficulty distribution.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
              QUANTITATIVE REASONING
            </span>
            <div className="text-3xl sm:text-4xl font-black text-[#1E3A8A] font-mono">
              {score.quantitative}
              <span className="text-sm font-normal text-slate-400"> / 170</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Accuracy: {score.accuracyPercent}% across Algebra, Arithmetic, and Data Analysis.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
              VERBAL REASONING
            </span>
            <div className="text-3xl sm:text-4xl font-black text-[#1E3A8A] font-mono">
              {score.verbal}
              <span className="text-sm font-normal text-slate-400"> / 170</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Strong performance in Sentence Equivalence. Work needed on dense Reading Comprehension.
            </p>
          </div>
        </div>

        {/* ── SKILL MATRIX & BREAKDOWN ── */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#1E3A8A]" />
            <span>Construct Competency Analysis</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              { skill: 'Sentence Equivalence', score: '85%', status: 'Mastered', desc: 'Accurate vocabulary context mapping.' },
              { skill: 'Quantitative Algebra', score: '80%', status: 'Proficient', desc: 'Solid equation setup; minor calculation slips.' },
              { skill: 'Data Analysis', score: '72%', status: 'Competitive', desc: 'Strong table reading; review multi-step percentages.' },
              { skill: 'Text Completion', score: '65%', status: 'Target for Growth', desc: 'Needs secondary blank discourse-shift drills.' }
            ].map(item => (
              <div key={item.skill} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{item.skill}</span>
                  <span className="font-mono font-bold text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded">
                    {item.score} · {item.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 7-DAY ACTIONABLE STUDY TRAJECTORY ── */}
        <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#1E3A8A] font-mono flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>Recommended 7-Day Trajectory from Testly Faculty</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Days 1–2:</strong> Run targeted 20-question Text Completion drills focusing on contrast conjunctions (although, nevertheless, despite).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Days 3–4:</strong> Timed Data Interpretation sets (2 minutes per chart, 4-step calculations without the calculator).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Days 5–7:</strong> Full Section 2 routing simulation under 1:58 authentic pacing constraints.</span>
            </li>
          </ul>
        </div>

        {/* ── LEGAL DISCLOSURE (NO OFFICIAL ETS TRADEMARK INFRINGEMENT) ── */}
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500 leading-relaxed font-mono">
          <strong>Psychometric & Governance Standard:</strong> This assessment report is an original Testly diagnostic evaluation based on published test specifications. Testly is not affiliated with or endorsed by Educational Testing Service (ETS). Practice scores are internal estimates for study guidance.
        </div>

      </main>

    </div>
  );
}
