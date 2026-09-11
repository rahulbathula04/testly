import React from 'react';
import { X, Play, Award, CheckCircle2, LineChart } from 'lucide-react';

export default function PracticeDashboardModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#102A56]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#E5EAF2] overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#102A56] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black">Testly</span>
            <span className="text-slate-400">|</span>
            <span className="text-xs font-bold text-slate-300">Practice Dashboard</span>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#F7FAFF] px-6 py-3 border-b border-[#E5EAF2] flex justify-between text-xs font-extrabold text-[#667085]">
          <span className="text-[#1769E0]">Overview</span>
          <span>Practice</span>
          <span>Mocks</span>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 text-center">
          
          <div>
            <h3 className="text-xl font-black text-[#102A56]">My Practice</h3>
            <p className="text-xs text-[#667085] font-semibold mt-0.5">Real-time performance analytics</p>
          </div>

          {/* 78% Circular Progress Gauge */}
          <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#18A957]"
                strokeDasharray="78, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-[#102A56]">78%</span>
              <span className="text-[10px] font-extrabold text-[#667085] uppercase">Overall Progress</span>
            </div>
          </div>

          {/* 2 Stat Cards */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="bg-[#F7FAFF] p-4 rounded-2xl border border-[#E5EAF2]">
              <p className="text-2xl font-black text-[#102A56]">12</p>
              <p className="text-xs font-bold text-[#667085]">Mocks Taken</p>
            </div>

            <div className="bg-[#F7FAFF] p-4 rounded-2xl border border-[#E5EAF2]">
              <p className="text-2xl font-black text-[#18A957]">+120</p>
              <p className="text-xs font-bold text-[#667085]">Questions Solved</p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => {
              alert('Starting Practice Test Session...');
              onClose();
            }}
            className="w-full bg-[#1769E0] hover:bg-[#102A56] text-white font-extrabold text-sm py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Continue Practice →</span>
          </button>

        </div>

      </div>
    </div>
  );
}
