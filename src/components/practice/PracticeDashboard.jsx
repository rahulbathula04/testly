import React, { useState } from 'react';
import { Play, Award, CheckCircle2, LineChart, Target, Zap, Clock, ShieldCheck, ArrowRight, Laptop } from 'lucide-react';

export default function PracticeDashboard({ onLaunchEngine }) {
  const [selectedExam, setSelectedExam] = useState('GRE');

  const exams = [
    { id: 'GRE', name: 'GRE® General', questions: '100% Free Adaptive Mocks', target: '325 Score Target' },
    { id: 'TOEFL', name: 'TOEFL iBT®', questions: 'Full 2026 Structure', target: '110 Score Target' },
    { id: 'IELTS', name: 'IELTS Academic', questions: 'Listening, Reading, Writing', target: 'Band 7.5 Target' },
    { id: 'PTE', name: 'PTE Academic', questions: 'Speaking & Writing Drills', target: '79 Score Target' },
    { id: 'DET', name: 'Duolingo English', questions: 'CAT Adaptive Simulator', target: '135 Score Target' },
    { id: 'GMAT', name: 'GMAT Focus', questions: 'Quant, Verbal, Data Insights', target: '685 Score Target' },
    { id: 'LSAT', name: 'LSAT Law', questions: 'Logical & Reading Comp', target: '168 Score Target' }
  ];

  return (
    <div id="practice-hub" className="py-16 bg-[#102A56] text-white relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1769E0]/20 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 bg-[#18A957] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
              <Zap className="w-4 h-4 fill-white" />
              <span>100% Free & Unlimited Practice Engine</span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Unofficial Practice Tool • Independent Preparation</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Practice as much as you want. <br />
            <span className="text-[#60A5FA]">No paywalls. No limits.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-medium">
            Access realistic exam simulators with adaptive section logic, timing rules, and comprehensive score reports.
          </p>
        </div>

        {/* Exam Selector Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {exams.map((e) => (
            <button
              key={e.id}
              onClick={() => setSelectedExam(e.id)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all border ${
                selectedExam === e.id 
                  ? 'bg-[#1769E0] text-white border-[#1769E0] shadow-lg scale-105' 
                  : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/20'
              }`}
            >
              {e.name}
            </button>
          ))}
        </div>

        {/* Practice Hub Action Dashboard Box */}
        <div className="max-w-4xl mx-auto bg-[#1E293B] rounded-3xl p-6 sm:p-10 border border-slate-700 shadow-2xl space-y-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-700 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black uppercase text-[#60A5FA] tracking-wider block">Active Exam Simulator</span>
                <span className="text-[10px] font-extrabold uppercase bg-slate-800 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded">Unofficial Testly Mock</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">{selectedExam} General Practice Engine</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">Realistic Section-Level Adaptive Engine & Official Calculator Rules</p>
            </div>

            {/* Score Target Tracker Pill */}
            <div className="bg-[#0F172A] px-5 py-3 rounded-2xl border border-slate-800 text-center shrink-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Score Progression</span>
              <span className="text-sm font-black text-[#18A957]">298 → 311 → 318 (Target: 325)</span>
            </div>
          </div>

          {/* Dual Operating Modes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Mode 1: FULL MOCK MODE */}
            <div className="bg-[#0F172A] p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black bg-[#1769E0] text-white px-3 py-1 rounded-full uppercase">
                    Full Unofficial Mock
                  </span>
                  <Clock className="w-4 h-4 text-slate-400" />
                </div>
                <h4 className="text-lg font-black text-white">Full Exam Simulation</h4>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                  Experience the complete exam structure, strict section timing, adaptive section branching, and get a detailed diagnostic score report.
                </p>
              </div>

              <button
                onClick={() => onLaunchEngine && onLaunchEngine('MOCK', selectedExam)}
                className="w-full bg-[#1769E0] hover:bg-white hover:text-[#102A56] text-white font-extrabold text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Free Full Mock Test</span>
              </button>
            </div>

            {/* Mode 2: PRACTICE DRILLS MODE */}
            <div className="bg-[#0F172A] p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black bg-[#18A957] text-white px-3 py-1 rounded-full uppercase">
                    Practice Mode
                  </span>
                  <Target className="w-4 h-4 text-slate-400" />
                </div>
                <h4 className="text-lg font-black text-white">Targeted Skill Drills</h4>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                  Practice questions by specific topic and difficulty level. View instant answer explanations and step-by-step solutions.
                </p>
              </div>

              <button
                onClick={() => onLaunchEngine && onLaunchEngine('PRACTICE', selectedExam)}
                className="w-full bg-[#18A957] hover:bg-[#128342] text-white font-extrabold text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Laptop className="w-4 h-4" />
                <span>Start Practice Drills</span>
              </button>
            </div>

          </div>

          <div className="pt-2 text-center text-xs text-slate-400 font-semibold space-y-1">
            <div>🔒 100% Free & Unlimited. No credit card required. No limits on attempts.</div>
            <div className="text-[10px] text-slate-500 font-medium">
              * Testly is an independent practice tool. Not affiliated with ETS, GMAC, IDP, Pearson, LSAC, or Duolingo.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
