import React, { useState } from 'react';
import { X, Play, CheckCircle2, Award, Phone, Mail, User, Sparkles } from 'lucide-react';

export default function FreeMockModal({ isOpen, onClose }) {
  const [testType, setTestType] = useState('TOEFL iBT®');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#102A56]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E5EAF2] overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#667085] hover:bg-[#F2F7FF] hover:text-[#102A56] transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Banner */}
        <div className="bg-[#102A56] p-6 text-white text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 bg-[#18A957] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Free Practice Access</span>
          </div>
          <h3 className="text-2xl font-black">Free Mock Test Registration</h3>
          <p className="text-xs text-slate-300 font-medium mt-1">
            Simulate exact exam interface, timed sections & instant AI score diagnostics.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-[#18A957]/10 rounded-full flex items-center justify-center text-[#18A957] mx-auto">
                <Award className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-[#102A56]">Your Free Mock Access Is Active!</h4>
              <p className="text-sm text-[#667085] font-medium">
                We sent your personal exam PIN code to <span className="font-bold text-[#102A56]">{phone}</span> via WhatsApp.
              </p>

              <div className="p-4 bg-[#F2F7FF] rounded-2xl border border-[#1769E0]/20 text-left space-y-2">
                <div className="flex justify-between text-xs font-bold text-[#102A56]">
                  <span>Target Exam:</span>
                  <span className="text-[#1769E0] font-black">{testType}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-[#102A56]">
                  <span>Access PIN:</span>
                  <span className="font-mono bg-white px-2 py-0.5 rounded border text-[#18A957]">TESTLY-FREE-2026</span>
                </div>
              </div>

              <button
                onClick={() => {
                  alert(`Launching Testly ${testType} Real Exam Simulator...`);
                  onClose();
                  setSubmitted(false);
                }}
                className="w-full bg-[#18A957] hover:bg-[#128342] text-white font-black text-base py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>Launch Mock Test Simulator Now</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-[#102A56] mb-1.5">Select Exam</label>
                <div className="grid grid-cols-2 gap-2">
                  {['TOEFL iBT®', 'GRE® General', 'PTE Academic', 'IELTS Academic'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTestType(t)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-extrabold border transition-all ${
                        testType === t 
                          ? 'bg-[#1769E0] text-white border-[#1769E0] shadow-sm' 
                          : 'bg-[#F7FAFF] text-[#102A56] border-[#E5EAF2] hover:border-[#1769E0]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A56] mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#667085] absolute left-3.5 top-3.5" />
                  <input 
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5EAF2] text-sm text-[#102A56] focus:border-[#1769E0] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A56] mb-1">WhatsApp Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#667085] absolute left-3.5 top-3.5" />
                  <input 
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5EAF2] text-sm text-[#102A56] focus:border-[#1769E0] outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#1769E0] hover:bg-[#102A56] text-white font-black text-base py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Free Mock Test</span>
                </button>
              </div>

              <p className="text-[11px] text-[#667085] text-center font-medium">
                🔒 No credit card required. Instant 100% free access.
              </p>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
