import React, { useState } from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';

const PRESETS = [
  { label: 'Target 315', verbal: 155, quant: 160, awa: 3.5 },
  { label: 'Top 50 MS (320)', verbal: 158, quant: 162, awa: 4.0 },
  { label: 'Ivy League (328)', verbal: 163, quant: 165, awa: 4.5 }
];

export default function GreHeroScoreCard({ onStartMock }) {
  const [verbal, setVerbal] = useState(155);
  const [quant, setQuant] = useState(160);
  const [awa, setAwa] = useState(3.5);

  const totalScore = verbal + quant;

  // Percentage calculations for progress rings and bars
  // Verbal: 130 to 170
  const verbalPct = Math.min(100, Math.max(0, Math.round(((verbal - 130) / 40) * 100)));
  // Quant: 130 to 170
  const quantPct = Math.min(100, Math.max(0, Math.round(((quant - 130) / 40) * 100)));
  // AWA: 0 to 6.0
  const awaPct = Math.min(100, Math.max(0, Math.round((awa / 6) * 100)));

  // SVG Circular Gauge calculations
  // Total GRE Scale: 260 to 340 (span = 80)
  const scorePct = Math.min(1, Math.max(0, (totalScore - 260) / 80));
  const radius = 52;
  const circumference = 2 * Math.PI * radius; // ~326.7
  // Arc spans 260 degrees
  const arcLength = circumference * 0.75; // 270 deg
  const strokeDashoffset = arcLength * (1 - scorePct);

  // Dynamic recommendation tip
  const getRecommendation = () => {
    if (totalScore >= 325) {
      return 'Exceptional benchmark. Highly competitive for MIT, Stanford, Carnegie Mellon, and Ivy League MS programs.';
    }
    if (totalScore >= 318) {
      return 'Strong competitive standing for top 30 US graduate engineering & STEM programs.';
    }
    if (totalScore >= 312) {
      return 'You are likely ready for top global universities. Keep practicing to improve Quant.';
    }
    return 'Good foundational score. Focused practice in Data Analysis & Text Completion will boost your percentile.';
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(15,23,42,0.12)] border border-slate-100/90 relative max-w-[430px] w-full mx-auto backdrop-blur-sm">
      {/* Subtle top indicator */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
            See Where You Stand
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Get a realistic estimate of your GRE score
          </p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          Live Model
        </span>
      </div>

      {/* Preset Pills to invite user interaction */}
      <div className="flex items-center gap-1.5 pt-3 pb-1">
        <span className="text-[10px] text-slate-400 font-semibold mr-0.5">Presets:</span>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => {
              setVerbal(p.verbal);
              setQuant(p.quant);
              setAwa(p.awa);
            }}
            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              verbal === p.verbal && quant === p.quant
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Main Score Visualization Area: Donut Chart + Breakdown Bars */}
      <div className="grid grid-cols-12 gap-4 items-center pt-3 pb-4">
        
        {/* Left: Donut Score Circle */}
        <div className="col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full -rotate-135" viewBox="0 0 128 128">
              {/* Background Track Arc */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                fill="none"
                stroke="#F1F5F9"
                strokeWidth="9"
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeLinecap="round"
              />
              {/* Animated Progress Gradient Arc */}
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              <circle
                cx="64"
                cy="64"
                r={radius}
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="9"
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Inner Center Score Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-[#0F172A] tracking-tight leading-none">
                {totalScore}
              </span>
              <span className="text-[10px] text-[#64748B] font-medium mt-1 leading-tight">
                Estimated Score
              </span>
              <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider mt-0.5">
                Score / 340
              </span>
            </div>
          </div>
        </div>

        {/* Right: Section Breakdown Bars */}
        <div className="col-span-7 space-y-3 pl-1">
          {/* Verbal */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#0F172A]">Verbal</span>
              <span className="font-mono font-bold text-[#0F172A]">{verbal}</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#10B981] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${verbalPct}%` }}
              />
            </div>
          </div>

          {/* Quant */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#0F172A]">Quant</span>
              <span className="font-mono font-bold text-[#0F172A]">{quant}</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3B82F6] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${quantPct}%` }}
              />
            </div>
          </div>

          {/* AWA */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#0F172A]">AWA</span>
              <span className="font-mono font-bold text-[#0F172A]">{awa.toFixed(1)}</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#8B5CF6] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${awaPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Recommendation Highlight Box */}
      <div className="bg-amber-50/80 border border-amber-200/70 rounded-2xl p-3 flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-lg bg-amber-100/90 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
          <Lightbulb className="w-3.5 h-3.5" />
        </div>
        <p className="text-[11.5px] text-amber-900 leading-snug font-medium">
          {getRecommendation()}
        </p>
      </div>

      {/* Interactive Micro Callout */}
      <div className="mt-3.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#64748B]">
        <span>Simulate your real score:</span>
        <button
          onClick={onStartMock}
          className="font-bold text-[#1E3A8A] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Take 25-Min Test →</span>
        </button>
      </div>
    </div>
  );
}
