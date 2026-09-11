import React, { useState } from 'react';
import { X, CheckCircle2, Video, BookOpen, FileCheck, MessageSquare, Target, ArrowRight } from 'lucide-react';

export default function PrepModal({ isOpen, onClose }) {
  const [selectedTest, setSelectedTest] = useState('TOEFL');
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#102A56]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-[#E5EAF2] shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#102A56] text-white p-6 relative flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase bg-[#1769E0] text-white px-2.5 py-0.5 rounded-full">
              Secondary Product • Optional Prep
            </span>
            <h3 className="text-2xl font-black mt-1">Online Test Preparation</h3>
            <p className="text-xs text-white/80">Live classes, practice modules & mock exams</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#EAF8F0] text-[#18A957] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-black text-[#102A56]">Syllabus & Demo Class Sent!</h4>
            <p className="text-sm text-[#667085]">
              We have dispatched the preparation syllabus and demo pass for <strong className="text-[#102A56]">{selectedTest}</strong> to your mobile number.
            </p>
            <button onClick={onClose} className="bg-[#102A56] text-white font-bold px-6 py-2.5 rounded-xl">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* Select Target Test */}
            <div>
              <label className="block text-xs font-extrabold uppercase text-[#102A56] mb-2">
                Select Preparation Course
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['TOEFL', 'GRE', 'GMAT', 'Duolingo', 'LSAT'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTest(t)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedTest === t
                        ? 'bg-[#1769E0] text-white border-[#1769E0]'
                        : 'bg-[#F7FAFF] text-[#102A56] border-[#E5EAF2]'
                    }`}
                  >
                    {t} Prep
                  </button>
                ))}
              </div>
            </div>

            {/* Included in Preparation */}
            <div className="bg-[#F2F7FF] rounded-2xl p-4 border border-[#1769E0]/20 space-y-2">
              <p className="text-xs font-bold text-[#102A56]">Includes:</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#667085]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#18A957]" />
                  <span>Live interactive classes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#18A957]" />
                  <span>Recorded lesson access</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#18A957]" />
                  <span>Full-length mock tests</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#18A957]" />
                  <span>1-on-1 doubt resolution</span>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#102A56] mb-1">Your Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF2] text-sm text-[#102A56]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A56] mb-1">WhatsApp Mobile *</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="+91 Mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF2] text-sm text-[#102A56]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1769E0] hover:bg-[#102A56] text-white font-extrabold text-base py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <span>GET FREE DEMO & SYLLABUS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
