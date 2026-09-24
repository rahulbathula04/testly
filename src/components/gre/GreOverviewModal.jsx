import React, { useState } from 'react';
import { X, Play, Clock, CheckCircle2, ShieldCheck, ArrowRight, BookOpen, Brain, Sparkles, Target } from 'lucide-react';

export default function GreOverviewModal({ isOpen, onClose, onStartMock }) {
  const [activeTab, setActiveTab] = useState('format');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-blue-50/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 text-[#1E3A8A] flex items-center justify-center">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1E3A8A]">
                1-MINUTE GRE ARCHITECTURE OVERVIEW
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] font-serif">
                How the Testly GRE Mock Works
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-100 text-xs font-semibold">
          {[
            { id: 'format', label: '1. Shortened 2026 Format', icon: Clock },
            { id: 'adaptive', label: '2. Adaptive Scoring', icon: Brain },
            { id: 'report', label: '3. Diagnostic Insights', icon: Target }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-2 flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#0F172A] text-[#0F172A] font-bold'
                    : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#475569] leading-relaxed">
          {activeTab === 'format' && (
            <div className="space-y-4">
              <p className="text-sm text-[#0F172A] font-medium">
                The official GRE was redesigned in September 2023. Testly replicates the official 2026 test-day specifications down to section timing, question weights, and on-screen calculators.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#1E3A8A]">SECTION 01</span>
                  <div className="text-base font-bold text-[#0F172A]">Analytical Writing</div>
                  <div className="text-xs text-[#64748B]">1 Task · "Analyze an Issue"</div>
                  <div className="font-mono text-xs font-bold text-[#0F172A] pt-1">30 Minutes</div>
                </div>

                <div className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#1E3A8A]">SECTION 02 & 04</span>
                  <div className="text-base font-bold text-[#0F172A]">Verbal Reasoning</div>
                  <div className="text-xs text-[#64748B]">27 Total Questions</div>
                  <div className="font-mono text-xs font-bold text-[#0F172A] pt-1">41 Minutes Total</div>
                </div>

                <div className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#1E3A8A]">SECTION 03 & 05</span>
                  <div className="text-base font-bold text-[#0F172A]">Quantitative Reasoning</div>
                  <div className="text-xs text-[#64748B]">27 Total Questions</div>
                  <div className="font-mono text-xs font-bold text-[#0F172A] pt-1">47 Minutes Total</div>
                </div>
              </div>

              <div className="p-3.5 bg-blue-50/70 border border-blue-200/60 rounded-xl flex items-center gap-2.5 text-[#1E3A8A]">
                <Clock className="w-4 h-4 shrink-0 text-[#3B82F6]" />
                <span>Total Test Duration: <strong>1 Hour 58 Minutes</strong> (Zero unscored experimental section).</span>
              </div>
            </div>
          )}

          {activeTab === 'adaptive' && (
            <div className="space-y-4">
              <p className="text-sm text-[#0F172A] font-medium">
                The GRE is section-level adaptive. Your performance in Section 1 strictly determines whether Section 2 serves Easy, Medium, or Hard questions.
              </p>

              <div className="space-y-2.5">
                <div className="p-3 bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
                    H
                  </div>
                  <div>
                    <div className="font-bold text-[#0F172A]">Hard Route (Target: 160–170)</div>
                    <div className="text-[11px] text-[#64748B]">Triggered when you score 10+ out of 12 on Section 1. Unlocks high scaled bonus points.</div>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0 text-xs">
                    M
                  </div>
                  <div>
                    <div className="font-bold text-[#0F172A]">Medium Route (Target: 148–159)</div>
                    <div className="text-[11px] text-[#64748B]">Triggered by intermediate Section 1 accuracy. Standard scaled conversion applied.</div>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                    E
                  </div>
                  <div>
                    <div className="font-bold text-[#0F172A]">Easy Route (Ceiling Cap: ~149)</div>
                    <div className="text-[11px] text-[#64748B]">Triggered by low accuracy. Restricts maximum possible scaled score regardless of Section 2.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'report' && (
            <div className="space-y-4">
              <p className="text-sm text-[#0F172A] font-medium">
                Unlike generic mock tests that only give you a number, Testly outputs an actionable diagnostic dossier immediately upon submission.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl space-y-1">
                  <div className="font-bold text-[#0F172A]">7 Domain Breakdowns</div>
                  <div className="text-[11px] text-[#64748B]">Arithmetic, Algebra, Geometry, Data Analysis, Text Completion, Sentence Equivalence, Reading Comp.</div>
                </div>
                <div className="p-3 bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl space-y-1">
                  <div className="font-bold text-[#0F172A]">Time Pacing Telemetry</div>
                  <div className="text-[11px] text-[#64748B]">Average seconds spent per question type, identifying questions where you rushed or stalled.</div>
                </div>
                <div className="p-3 bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl space-y-1">
                  <div className="font-bold text-[#0F172A]">University Cutoff Match</div>
                  <div className="text-[11px] text-[#64748B]">Compares your scaled score against published Fall 2026 MS/MBA university cutoff bands.</div>
                </div>
                <div className="p-3 bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl space-y-1">
                  <div className="font-bold text-[#0F172A]">Data-Driven Study Plan</div>
                  <div className="text-[11px] text-[#64748B]">Customized 2-week and 4-week practice schedules prioritizing your highest-ROI weaknesses.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Direct Launch */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-[#FAF9F6] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-[#64748B]">
            Free calibrated diagnostic · Instant uninflated report
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onStartMock();
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Start Your GRE Mock Now</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
