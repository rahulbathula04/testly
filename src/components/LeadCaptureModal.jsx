import React, { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle2, ShieldCheck, MessageCircle, Lock, Sparkles } from 'lucide-react';
import { createNewLead } from '../utils/crmStore';
import { EXAM_DATA } from './PriceProof';

const EXAM_OPTIONS = ['GRE', 'TOEFL', 'PTE', 'Duolingo', 'IELTS', 'GMAT'];
const TIMING_OPTIONS = ['Within 15 days', 'This Month', '1–3 Months'];

export default function LeadCaptureModal({ isOpen, onClose, defaultTest = 'GRE', onOpenAgreement }) {
  const [exam, setExam] = useState(defaultTest);
  const [timing, setTiming] = useState('This Month');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [assignedLead, setAssignedLead] = useState(null);
  const [error, setError] = useState('');

  // Auto-sync exam when opened from a specific exam button
  useEffect(() => {
    if (defaultTest) {
      setExam(defaultTest);
    }
  }, [defaultTest, isOpen]);

  if (!isOpen) return null;

  const currentPricing = EXAM_DATA[exam] || { refPrice: 26542, testlyPrice: 20499, saving: 6043 };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit WhatsApp number');
      return;
    }

    setError('');
    const created = createNewLead({
      name: name.trim(),
      phone: `+91 ${cleanPhone.slice(-10)}`,
      exam,
      timing,
      needs: ['Institutional Discount Rate', 'Registration Concierge'],
      pricing: currentPricing,
      source: 'Landing Page Form',
      campaign: `${exam} High-CRO Booking Flow`
    });

    setAssignedLead(created);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setError('');
    onClose();
  };

  const directWaUrl = `https://wa.me/919347379041?text=${encodeURIComponent(
    `Hi Testly! I want to check exam slot availability for ${exam} (${timing}) and lock in the ₹${currentPricing.testlyPrice.toLocaleString('en-IN')} rate with ₹199 Concierge.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92dvh]">

        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 leading-tight">
                Check Exam Slots & Verified Savings
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Direct institutional quota • ₹199 done-for-you concierge
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200/80 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 touch-scroll">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Dynamic Live Rate Banner */}
              <div className={`border rounded-xl p-3 flex items-center justify-between shadow-2xs ${
                currentPricing.saving > 1000
                  ? 'bg-emerald-50/90 border-emerald-200'
                  : 'bg-blue-50/90 border-blue-200'
              }`}>
                <div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
                    currentPricing.saving > 1000 ? 'text-emerald-800' : 'text-blue-800'
                  }`}>
                    {exam} {currentPricing.saving > 1000 ? 'Verified Institutional Rate' : 'Registration Concierge'}
                  </span>
                  <p className="text-xs text-slate-700 font-semibold mt-0.5">
                    {currentPricing.saving > 1000 ? (
                      <>Regular <span className="line-through text-slate-400">₹{currentPricing.refPrice.toLocaleString('en-IN')}</span> → Testly <strong className="text-slate-900">₹{currentPricing.testlyPrice.toLocaleString('en-IN')}</strong></>
                    ) : (
                      <>Testly Price: <strong className="text-slate-900">₹{currentPricing.testlyPrice.toLocaleString('en-IN')}</strong></>
                    )}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  {currentPricing.saving > 1000 ? (
                    <>
                      <span className="text-[9px] font-extrabold text-emerald-700 uppercase block">YOU SAVE</span>
                      <span className="text-lg font-black text-emerald-950">₹{currentPricing.saving.toLocaleString('en-IN')}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-[9px] font-extrabold text-blue-700 uppercase block">CONCIERGE</span>
                      <span className="text-sm font-black text-blue-950">Zero Error</span>
                    </>
                  )}
                </div>
              </div>

              {/* Step 1: Select Exam (Compact 6 pills) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
                    1. Target Exam
                  </label>
                  <span className="text-[10px] text-emerald-700 font-bold">✓ Pre-cleared rate</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {EXAM_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setExam(opt)}
                      className={`text-xs font-bold py-2.5 px-1 rounded-lg border text-center transition-all min-h-[42px] flex items-center justify-center active:scale-[0.97] ${
                        exam === opt
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Target Date Timing */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 block">
                  2. Planned Exam Timing
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {TIMING_OPTIONS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTiming(t)}
                      className={`text-[11px] font-bold py-2 px-1.5 rounded-lg border text-center transition-all min-h-[38px] flex items-center justify-center active:scale-[0.97] ${
                        timing === t
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2.5 rounded-lg border border-slate-300 focus:border-slate-900 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 block">
                    WhatsApp Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2.5 text-xs font-bold text-slate-400">+91</span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      required
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full text-xs font-semibold pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:border-slate-900 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 p-2 rounded-lg">
                  {error}
                </p>
              )}

              {/* Reassurance Guarantee with Founders */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-[11px] text-slate-600 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Audited directly by founders Rahul & Deep. Zero advance payment needed now.</span>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 group cursor-pointer active:scale-[0.98] min-h-[44px]"
              >
                <span>Check My Savings & Available Slots</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* 1-Tap Direct WhatsApp Alternative */}
              <div className="text-center pt-1 border-t border-slate-100">
                <a
                  href={directWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#128C7E] hover:text-[#075E54] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Prefer WhatsApp? Chat directly with Rahul & Deep →</span>
                </a>
              </div>

              <p className="text-[10px] text-center text-slate-400">
                By clicking, you appoint Testly under the{' '}
                <button
                  type="button"
                  onClick={onOpenAgreement}
                  className="underline hover:text-slate-600"
                >
                  Candidate Agency Agreement (ICA 1872)
                </button>
                . ₹199 assistance fee applies upon confirmed booking.
              </p>

            </form>
          ) : (
            /* Post-Submission Screen */
            <div className="py-3 space-y-4 text-center animate-in zoom-in-95 duration-150">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-black text-slate-900 tracking-tight">
                  Booking Request Received!
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  Founders <strong>Rahul Bathula</strong> or <strong>Deep Royal</strong> are reviewing test slot availability for <strong>{exam}</strong>.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-left text-xs space-y-2">
                <p className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">Next 5 Minutes:</p>
                <p className="text-slate-600 flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  Official voucher saving check: <strong>Save ₹{currentPricing.saving.toLocaleString('en-IN')}</strong>
                </p>
                <p className="text-slate-600 flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  Passport name & test center slot verification in Hyderabad
                </p>
              </div>

              <a
                href={`https://wa.me/919347379041?text=${encodeURIComponent(`Hi Rahul & Deep! I just submitted my booking request for ${exam} (${name}). Please share available test slots.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp with Rahul & Deep</span>
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
