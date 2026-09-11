import React, { useState } from 'react';
import { Laptop, Play, CheckCircle, Sparkles, BarChart3, Clock, Shield, Award, ArrowRight } from 'lucide-react';

export default function MockTestSection({ onOpenFreeMock, onOpenPrep }) {
  const [selectedMock, setSelectedMock] = useState('GRE');
  const [selectedAnswer, setSelectedAnswer] = useState(1);

  const mockData = {
    GRE: {
      title: 'GRE® General Mock Exam #1',
      section: 'Section 2: Verbal Reasoning',
      timer: '00:24:15',
      question: 'Select the option that best completes the sentence: The researcher’s hypothesis, though initially met with ______, was eventually validated by overwhelming empirical evidence.',
      options: [
        'A. Scepticism',
        'B. Acclaim',
        'C. Indifference',
        'D. Enthusiasm'
      ],
      correct: 0,
      predictedScore: '324 / 340',
      percentile: '92nd Percentile'
    },
    TOEFL: {
      title: 'TOEFL iBT® Full Simulation',
      section: 'Section 1: Reading Section',
      timer: '00:48:10',
      question: 'According to paragraph 3, which of the following is TRUE regarding geothermal reservoir temperature fluctuations?',
      options: [
        'A. They decline exponentially within 6 months.',
        'B. They remain stable due to ongoing thermal conduction.',
        'C. They fluctuate only during seismic activity.',
        'D. They are unmeasurable by current sensors.'
      ],
      correct: 1,
      predictedScore: '108 / 120',
      percentile: '96th Percentile'
    },
    PTE: {
      title: 'PTE Academic Mock Simulator',
      section: 'Section 3: Speaking & Writing',
      timer: '00:32:00',
      question: 'Read aloud the text shown on screen within 40 seconds. Maintain natural cadence and stress pattern.',
      options: [
        'A. Audio Input Ready (Microphone Active)',
        'B. AI Pitch Analysis Calibrated',
        'C. Pronunciation Score Preview Enabled',
        'D. Fluency Benchmark Set'
      ],
      correct: 0,
      predictedScore: '79 / 90',
      percentile: '90th Percentile'
    }
  };

  const currentMock = mockData[selectedMock] || mockData.GRE;

  const featurePills = [
    'Full-length authentic timed mocks',
    'Section-wise practice drills',
    'Instant AI score prediction & feedback',
    'Official exam interface match',
    'In-depth weakness analysis',
    'Personalized score improvement roadmap'
  ];

  return (
    <section id="mock-tests" className="py-20 bg-[#102A56] text-white relative overflow-hidden">
      
      {/* Background Subtle Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#1769E0_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 bg-[#1769E0]/20 border border-[#1769E0]/50 text-[#60A5FA] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Official Exam Interface Simulator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Practice Like the Real Test. <br />
            <span className="text-[#60A5FA]">Perform Even Better.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-medium">
            Testly’s high-fidelity practice suite simulates exact test center screen timers, section rules, and scoring algorithms so nothing catches you off guard on exam day.
          </p>
        </div>

        {/* 6 Feature Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {featurePills.map((pill, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center backdrop-blur-xs hover:border-[#1769E0] transition-colors">
              <CheckCircle className="w-4 h-4 text-[#18A957] mx-auto mb-1.5" />
              <p className="text-xs font-extrabold text-slate-200">{pill}</p>
            </div>
          ))}
        </div>

        {/* Laptop Visual Mockup Component */}
        <div className="max-w-5xl mx-auto">
          
          {/* Mock Selector Tabs */}
          <div className="flex justify-center gap-3 mb-6">
            {['GRE', 'TOEFL', 'PTE'].map((testKey) => (
              <button
                key={testKey}
                onClick={() => setSelectedMock(testKey)}
                className={`px-5 py-2 rounded-xl text-xs font-black tracking-wider uppercase transition-all ${
                  selectedMock === testKey 
                    ? 'bg-[#1769E0] text-white shadow-lg shadow-[#1769E0]/40 scale-105' 
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {testKey} Mock Simulator
              </button>
            ))}
          </div>

          {/* Laptop Monitor Outer Frame */}
          <div className="bg-[#0B192C] p-4 sm:p-6 rounded-t-3xl border-4 border-slate-700/60 shadow-2xl relative">
            
            {/* Screen Top Bar */}
            <div className="bg-[#152338] px-4 py-2.5 rounded-t-xl flex items-center justify-between border-b border-slate-700 text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                <span className="ml-3 text-slate-300 font-extrabold">{currentMock.title}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-slate-400 font-semibold">{currentMock.section}</span>
                <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-md font-mono font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {currentMock.timer}
                </span>
              </div>
            </div>

            {/* Screen Content Area */}
            <div className="bg-[#0F172A] p-6 sm:p-8 rounded-b-xl border border-slate-800 space-y-6">
              
              {/* Question Text */}
              <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700/70">
                <div className="flex justify-between text-xs text-slate-400 font-bold mb-2">
                  <span>Question 4 of 20</span>
                  <span>Marks: 1.0</span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
                  {currentMock.question}
                </p>
              </div>

              {/* Multiple Choice Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentMock.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedAnswer(i)}
                    className={`p-4 rounded-xl text-left text-xs sm:text-sm font-extrabold transition-all border ${
                      selectedAnswer === i 
                        ? 'bg-[#1769E0]/20 border-[#1769E0] text-white shadow-md' 
                        : 'bg-[#1E293B]/50 border-slate-700/50 text-slate-300 hover:bg-[#1E293B]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Bottom Interactive Results Bar */}
              <div className="bg-[#1E293B] p-4 rounded-2xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#18A957]/20 flex items-center justify-center text-[#18A957]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold">Predicted Real Score</p>
                    <p className="text-lg font-black text-white">{currentMock.predictedScore} <span className="text-xs text-[#18A957] font-extrabold ml-1">({currentMock.percentile})</span></p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={onOpenFreeMock}
                    className="bg-[#18A957] hover:bg-[#128342] text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Start Free Mock Test</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Laptop Base Stand Graphic */}
          <div className="bg-slate-700 h-4 rounded-b-2xl mx-auto w-3/4 shadow-2xl relative">
            <div className="w-24 h-1.5 bg-slate-500 mx-auto rounded-b-md"></div>
          </div>

        </div>

        {/* Action Buttons Below Laptop */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenFreeMock}
            className="w-full sm:w-auto bg-[#1769E0] hover:bg-white hover:text-[#102A56] text-white font-extrabold text-base px-8 py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Try a Free Mock Test</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenPrep}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-extrabold text-base px-8 py-4 rounded-xl transition-all border border-white/20"
          >
            Explore Prep Packages
          </button>
        </div>

      </div>
    </section>
  );
}
