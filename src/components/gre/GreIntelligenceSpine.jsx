import React from 'react';
import {
  Clock,
  Layers,
  Scale,
  Brain,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { GRE_ASSESSMENT_SPINE } from '../../data/gre/greSpine';

export default function GreIntelligenceSpine({ onStartDiagnostic, onStartPractice, onStartMock, onOpenReport }) {
  const { exam } = GRE_ASSESSMENT_SPINE;

  return (
    <div className="space-y-12 max-w-5xl mx-auto py-4 sm:py-8 font-[Inter,system-ui,sans-serif]">
      
      {/* ── 1. EDITORIAL HEADER & BRAND SYSTEM ── */}
      <div className="border-b border-slate-200 pb-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#64748B]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0F172A] tracking-wider uppercase">TESTLY / GRE</span>
            <span>·</span>
            <span>GRE Assessment Intelligence</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-slate-700">Current GRE General Test · Verified September 2026</span>
          </div>
        </div>

        {/* Large Editorial Statement */}
        <div className="space-y-3 pt-2">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F172A] font-['DM_Serif_Display',Georgia,serif] leading-[1.08]">
            Know where you stand.<br />
            Know what to work on next.
          </h1>
          <p className="text-sm sm:text-base text-[#64748B] max-w-2xl leading-relaxed">
            Testly models the constructs, cognitive specifications and scoring logic of the current GRE to provide genuine diagnostic clarity and targeted practice.
          </p>
        </div>

        {/* Quick 2-Column Domain Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-5 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider font-bold text-[#1E3A8A]">
              VERBAL REASONING
            </div>
            <div className="h-[1px] bg-slate-200 w-full" />
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]" />
                <span>Reading Comprehension</span>
                <span className="text-slate-400 text-xs">(Passage inference & rhetorical tone)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]" />
                <span>Text Completion</span>
                <span className="text-slate-400 text-xs">(1, 2 & 3-blank academic context)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]" />
                <span>Sentence Equivalence</span>
                <span className="text-slate-400 text-xs">(Synonym pair concordance)</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-5 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider font-bold text-[#1E3A8A]">
              QUANTITATIVE REASONING
            </div>
            <div className="h-[1px] bg-slate-200 w-full" />
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]" />
                <span>Arithmetic</span>
                <span className="text-slate-400 text-xs">(Number properties, primes, ratios)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]" />
                <span>Algebra</span>
                <span className="text-slate-400 text-xs">(Linear, quadratics, inequalities)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]" />
                <span>Geometry</span>
                <span className="text-slate-400 text-xs">(Triangles, circles, coordinate plane)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]" />
                <span>Data Analysis</span>
                <span className="text-slate-400 text-xs">(Distributions, statistics, probability)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── 2. YOUR ASSESSMENT SYSTEM SELECTOR ── */}
      <div className="space-y-4">
        <div className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500">
          YOUR ASSESSMENT SYSTEM
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Action 1: Diagnostic */}
          <div className="border border-slate-200 bg-white rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-[#1E3A8A] transition-all shadow-xs group">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded">
                STAGE 01
              </span>
              <h3 className="text-lg font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
                Diagnostic
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A 15-question baseline assessment. Calibrates accuracy, timing, and initial skill profile.
              </p>
            </div>
            <button
              onClick={onStartDiagnostic}
              className="w-full bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Start Diagnostic</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
            </button>
          </div>

          {/* Action 2: Practice */}
          <div className="border border-slate-200 bg-white rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-[#1E3A8A] transition-all shadow-xs group">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                STAGE 02
              </span>
              <h3 className="text-lg font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
                Topic Drills
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Targeted practice across all 7 skills. Instant step-by-step rationales without fake fluff.
              </p>
            </div>
            <button
              onClick={onStartPractice}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Topic Practice</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>

          {/* Action 3: Mock */}
          <div className="border border-slate-200 bg-white rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-[#1E3A8A] transition-all shadow-xs group">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                STAGE 03
              </span>
              <h3 className="text-lg font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
                Full Mock
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full-length simulations under authentic 1:58 time constraints and section flow.
              </p>
            </div>
            <button
              onClick={onStartMock}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Mocks</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>

          {/* Action 4: Readiness */}
          <div className="border border-slate-200 bg-white rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-[#1E3A8A] transition-all shadow-xs group">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                PROPRIETARY
              </span>
              <h3 className="text-lg font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
                Readiness Score™
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Synthesizes mastery, pacing, and difficulty into a 0–100 index with a personalized 7-day action plan.
              </p>
            </div>
            <button
              onClick={onOpenReport}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Readiness</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      {/* ── 3. ACTIONABLE GRE INTELLIGENCE (NOT A WIKIPEDIA PAGE) ── */}
      <div className="bg-[#FAF9F6] border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-[#1E3A8A] tracking-wider">
              OFFICIAL SPECIFICATION AUDIT
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
              Current GRE General Test Architecture
            </h2>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Provider: <strong className="text-slate-800 font-bold">ETS</strong> · Shortened Format (Sept 2023–Current)
          </div>
        </div>

        {/* The 4 Core Metric Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-left">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Duration</span>
            <div className="text-2xl font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif] mt-0.5">1:58</div>
            <span className="text-[11px] text-slate-500">1 hr 58 min total</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-left">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Sections</span>
            <div className="text-2xl font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif] mt-0.5">5</div>
            <span className="text-[11px] text-slate-500">1 AW + 2 V + 2 Q</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-left">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Verbal & Quant</span>
            <div className="text-2xl font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif] mt-0.5">130–170</div>
            <span className="text-[11px] text-slate-500">1-point increments</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-left">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Analytical Writing</span>
            <div className="text-2xl font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif] mt-0.5">0.0–6.0</div>
            <span className="text-[11px] text-slate-500">0.5-point increments</span>
          </div>
        </div>

        {/* The Visual Assessment Spine Tree */}
        <div className="space-y-4">
          <h3 className="text-sm font-mono uppercase font-bold text-slate-700 tracking-wider">
            WHAT THE TEST MEASURES — CONSTRUCT VISUAL MAP
          </h3>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 font-mono text-xs sm:text-sm text-slate-800 space-y-4 leading-relaxed overflow-x-auto">
            <div className="font-bold text-[#0F172A] flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">GRE General Test</span>
              <span className="text-slate-400">Graduate-level critical reasoning and quantitative aptitude</span>
            </div>

            <div className="pl-4 border-l-2 border-slate-300 space-y-4">
              {/* Verbal Branch */}
              <div className="space-y-2">
                <div className="font-bold text-[#1E3A8A]">├── VERBAL REASONING (27 Questions · 41 Minutes · Section-Adaptive)</div>
                <div className="pl-6 space-y-1 text-slate-600 text-xs">
                  <div>│   ├── Reading Comprehension — Identifying primary purpose, implicit assumptions & structure</div>
                  <div>│   ├── Text Completion — Discerning subtle semantic direction in academic passages</div>
                  <div>│   └── Sentence Equivalence — Synonym pairing and contextual semantic precision</div>
                </div>
              </div>

              {/* Quant Branch */}
              <div className="space-y-2">
                <div className="font-bold text-[#1E3A8A]">├── QUANTITATIVE REASONING (27 Questions · 47 Minutes · Section-Adaptive)</div>
                <div className="pl-6 space-y-1 text-slate-600 text-xs">
                  <div>│   ├── Arithmetic — Number properties, primes, divisibility, percentages & ratios</div>
                  <div>│   ├── Algebra — Simultaneous equations, inequalities, quadratics & functions</div>
                  <div>│   ├── Geometry — Triangles, circles, coordinate plane & 3D solid geometry</div>
                  <div>│   └── Data Analysis — Descriptive statistics, normal curves, counting & probability</div>
                </div>
              </div>

              {/* AW Branch */}
              <div className="space-y-1">
                <div className="font-bold text-[#1E3A8A]">└── ANALYTICAL WRITING (1 Task · 30 Minutes)</div>
                <div className="pl-6 text-slate-600 text-xs">
                  └── Analyze an Issue — Sustaining coherent thesis development and evidence-based argumentation
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section-Level Adaptation Callout */}
        <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-5 text-xs text-blue-950 space-y-1.5 leading-relaxed">
          <div className="font-bold text-blue-900 flex items-center gap-1.5 text-sm font-['DM_Serif_Display',Georgia,serif]">
            <Brain className="w-4 h-4 text-blue-700" />
            <span>How GRE Section-Level Adaptation Works</span>
          </div>
          <p>
            The GRE does not adapt on every question. In both Verbal and Quantitative reasoning, all test-takers take an initial Section 1 of mixed difficulty (12 items). Your accuracy on Section 1 dictates whether Section 2 (15 items) will be Easy, Medium, or Hard. Earning a score above 160 requires routing into the Hard section. Testly's diagnostic baseline measures whether your current accuracy unlocks higher adaptive pools.
          </p>
        </div>

        {/* Official Sources & Verification Footer */}
        <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-[#64748B]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Primary Sources: Educational Testing Service (ETS) Official Published Content Structure</span>
          </div>
          <a
            href={exam.sources[0]?.url || 'https://www.ets.org/gre'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1E3A8A] font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>Verify on ETS.org</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* ── 4. CALL TO ACTION (FIND YOUR STARTING POINT) ── */}
      <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-xl relative overflow-hidden">
        <div className="max-w-xl mx-auto space-y-3 relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
            NO FLUFF · NO FAKE SCORE CLAIMS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-['DM_Serif_Display',Georgia,serif]">
            Find your starting point.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Take the 15-question Testly GRE Diagnostic (~20–25 mins). Receive your exact skill map across Verbal and Quant, pinpoint your highest-leverage weakness, and get an immediate practice prescription.
          </p>
          <div className="pt-2">
            <button
              onClick={onStartDiagnostic}
              className="bg-white hover:bg-slate-100 text-[#0F172A] text-sm font-bold px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Begin GRE Diagnostic</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
