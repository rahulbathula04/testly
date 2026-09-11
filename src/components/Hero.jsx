import React, { useState } from 'react';
import { ArrowRight, UserCheck, ShieldCheck, Headphones, Play, Target, CheckCircle2, Zap, MapPin, Award } from 'lucide-react';

export default function Hero({ onBookTest, onOpenFreeMock }) {
  const [selectedExam, setSelectedExam] = useState('GRE');

  const targets = {
    GRE: { target: '325+ Score', estTime: '4 Weeks', mockType: 'Adaptive Section Engine', localCenter: 'Begumpet & Madhapur' },
    TOEFL: { target: '110+ Score', estTime: '3 Weeks', mockType: 'Full 2026 iBT Simulator', localCenter: 'Secunderabad & Begumpet' },
    IELTS: { target: 'Band 7.5+', estTime: '3 Weeks', mockType: 'Listening, Reading & Writing', localCenter: 'IDP Hyderabad Centers' },
    PTE: { target: '79+ Score', estTime: '2 Weeks', mockType: 'Speaking & Writing Drills', localCenter: 'Pearson Vue Madhapur' },
    DET: { target: '135+ Score', estTime: '2 Weeks', mockType: 'Adaptive CAT Engine', localCenter: 'Online Proctored' },
    GMAT: { target: '685+ Score', estTime: '5 Weeks', mockType: 'Quant, Verbal & Data Insights', localCenter: 'Pearson Vue Begumpet' },
    LSAT: { target: '168+ Score', estTime: '6 Weeks', mockType: 'Logical & Reading Comp', localCenter: 'Online Proctored India' },
  };

  const currentInfo = targets[selectedExam] || targets.GRE;

  return (
    <section className="relative bg-slate-50 border-b border-slate-200 py-12 md:py-20 overflow-hidden">
      {/* AI Background Image Layer - Overseas Education Atrium Library */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
        style={{ backgroundImage: `url('/assets/images/global-university-campus.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-slate-50/70 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Executive Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Minimal Eyebrow Badge - Keeping Services Start at ₹199 Small */}
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="uppercase tracking-wider">Professional Advisory</span>
              <span className="text-slate-300">|</span>
              <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-bold">Services Start at ₹199</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]">
              Candidate Registration Advisory & <br />
              <span className="text-blue-600">Official Exam Voucher Procurement</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
              Official test voucher procurement for <strong className="text-slate-900">TOEFL (₹13,999)</strong>, <strong className="text-slate-900">GRE (₹19,999)</strong>, and <strong className="text-slate-900">PTE (₹14,999)</strong>. Includes 1-on-1 Indian passport detail verification and unlimited free practice mocks.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <button
                onClick={() => onBookTest && onBookTest(selectedExam)}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 shrink-0"
              >
                <span>Book Advisory Service (₹199)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenFreeMock && onOpenFreeMock()}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Access Free Candidate Portal</span>
              </button>
            </div>

            {/* Key Trust Metrics */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200 max-w-lg text-xs font-semibold text-slate-600">
              <div>
                <p className="text-lg font-black text-slate-900">14,200+</p>
                <p>Candidates Advised</p>
              </div>
              <div>
                <p className="text-lg font-black text-emerald-600">100%</p>
                <p>Passport Verification</p>
              </div>
              <div>
                <p className="text-lg font-black text-blue-600">₹4,000+</p>
                <p>Voucher Savings</p>
              </div>
            </div>

          </div>

          {/* Right Column: Sleek Interactive Voucher & Selector Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Exam Selector</span>
                  <h3 className="text-lg font-black text-white mt-0.5">Voucher & Advisory Portal</h3>
                </div>
                <span className="text-[10px] font-bold uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-md">
                  Active Rates
                </span>
              </div>

              {/* Exam Tabs */}
              <div className="grid grid-cols-4 gap-1.5">
                {Object.keys(targets).map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setSelectedExam(ex)}
                    className={`py-2 text-xs font-bold rounded-md transition-colors text-center border ${
                      selectedExam === ex
                        ? 'bg-blue-600 text-white border-blue-600 font-extrabold'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    {ex}
                  </button>
                ))}
              </div>

              {/* Selected Exam Information */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Target Benchmark Score:</span>
                  <span className="font-bold text-white">{currentInfo.target}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Practice Simulation Engine:</span>
                  <span className="font-semibold text-emerald-400">{currentInfo.mockType}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Hyderabad Examination Center:</span>
                  <span className="font-semibold text-blue-400">{currentInfo.localCenter}</span>
                </div>
              </div>

              <button
                onClick={() => onBookTest && onBookTest(selectedExam)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
              >
                <span>Request {selectedExam} Advisory & Voucher (₹199)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-400 font-medium">
                🔒 Guaranteed 100% Valid Official Test Vouchers & Legal Compliance
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
