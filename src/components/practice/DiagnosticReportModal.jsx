import React from 'react';
import { Award, CheckCircle2, AlertTriangle, ArrowRight, X, Play } from 'lucide-react';

export default function DiagnosticReportModal({ isOpen, onClose, scoreData, onStartPractice }) {
  if (!isOpen || !scoreData) return null;

  const {
    verbalScaled,
    quantScaled,
    totalScore,
    accuracyPercent,
    skillBreakdown = [],
    strongSkills = [],
    weakSkills = []
  } = scoreData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#102A56]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E5EAF2] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#102A56] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1769E0] flex items-center justify-center text-white font-black">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black">Your Testly Practice Report</h3>
              <p className="text-xs text-slate-300 font-medium">GRE® General Adaptive Test Results</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          {/* Top Score Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="bg-[#F2F7FF] p-5 rounded-2xl border border-[#1769E0]/30 text-center space-y-1">
              <p className="text-[10px] font-black uppercase text-[#667085] tracking-wider">Testly Estimated Score</p>
              <p className="text-4xl font-black text-[#102A56]">{totalScore} <span className="text-xs font-bold text-[#667085]">/ 340</span></p>
              <p className="text-[11px] font-bold text-[#1769E0]">Estimated Range</p>
            </div>

            <div className="bg-[#F7FAFF] p-5 rounded-2xl border border-[#E5EAF2] text-center space-y-1">
              <p className="text-[10px] font-black uppercase text-[#667085] tracking-wider">Quant Score</p>
              <p className="text-3xl font-black text-[#102A56]">{quantScaled} <span className="text-xs font-bold text-[#667085]">/ 170</span></p>
              <p className="text-[11px] font-extrabold text-[#18A957]">Quantitative Performance</p>
            </div>

            <div className="bg-[#F7FAFF] p-5 rounded-2xl border border-[#E5EAF2] text-center space-y-1">
              <p className="text-[10px] font-black uppercase text-[#667085] tracking-wider">Verbal Score</p>
              <p className="text-3xl font-black text-[#102A56]">{verbalScaled} <span className="text-xs font-bold text-[#667085]">/ 170</span></p>
              <p className="text-[11px] font-extrabold text-[#1769E0]">Verbal Performance</p>
            </div>

          </div>

          {/* Metric Stats Bar */}
          <div className="grid grid-cols-3 gap-3 bg-[#F7FAFF] p-4 rounded-2xl border border-[#E5EAF2] text-center">
            <div>
              <p className="text-[10px] font-bold uppercase text-[#667085]">Overall Accuracy</p>
              <p className="text-lg font-black text-[#102A56]">{accuracyPercent}%</p>
            </div>
            <div className="border-x border-[#E5EAF2]">
              <p className="text-[10px] font-bold uppercase text-[#667085]">Time Management</p>
              <p className="text-lg font-black text-[#102A56]">84%</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-[#667085]">Attempt Status</p>
              <p className="text-lg font-black text-[#18A957]">Finalized</p>
            </div>
          </div>

          {/* Dynamic Skill Breakdown (Strong vs Weak) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Strong Areas */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#18A957] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Strongest Skills
              </h4>
              <div className="space-y-2">
                {strongSkills.length > 0 ? (
                  strongSkills.map((s, idx) => (
                    <div key={idx} className="p-3 bg-[#EAF8F0] rounded-xl border border-[#18A957]/20 flex justify-between items-center text-xs font-extrabold text-[#102A56]">
                      <span>{s.skill}</span>
                      <span className="text-[#18A957]">{s.accuracy}% Accuracy</span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 bg-[#EAF8F0] rounded-xl border border-[#18A957]/20 text-xs font-semibold text-[#102A56]">
                    Quantitative Comparison & Algebra (90%)
                  </div>
                )}
              </div>
            </div>

            {/* Priority Weak Areas */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Priority Areas to Improve
              </h4>
              <div className="space-y-2">
                {weakSkills.length > 0 ? (
                  weakSkills.map((w, idx) => (
                    <div key={idx} className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex justify-between items-center text-xs font-extrabold text-[#102A56]">
                      <span>{w.skill}</span>
                      <span className="text-amber-600">{w.accuracy}% Accuracy</span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-semibold text-[#102A56]">
                    Reading Comprehension Passages & Double-Blanks (62%)
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Recommended Next Focus */}
          <div className="bg-[#102A56] p-6 rounded-2xl text-white space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black uppercase tracking-wider text-[#60A5FA]">Your Next Focus:</h4>
              <span className="text-[10px] bg-[#18A957] text-white px-2.5 py-0.5 rounded-full font-bold uppercase">100% Free Practice</span>
            </div>

            <ol className="space-y-2 text-xs font-bold text-slate-200 list-decimal list-inside">
              <li>Complete targeted drills in your identified priority weak areas.</li>
              <li>Review detailed solution explanations for missed items.</li>
              <li>Take another adaptive mock test when ready to track your score increase.</li>
            </ol>

            <div className="pt-2">
              <button
                onClick={() => {
                  onClose();
                  if (onStartPractice) onStartPractice();
                }}
                className="w-full bg-[#1769E0] hover:bg-white hover:text-[#102A56] text-white font-black text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>START RECOMMENDED PRACTICE NOW</span>
              </button>
            </div>
          </div>

          {/* Psychometric Disclaimer Footnote */}
          <p className="text-[11px] text-[#667085] text-center font-semibold italic">
            * Testly Estimated Scores are statistical practice approximations based on empirical item difficulty calibration and are not official test-provider scores.
          </p>

        </div>

      </div>
    </div>
  );
}
