import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2, ShieldCheck, PhoneCall, Sparkles, MessageCircle, Clock } from 'lucide-react';
import { createNewLead } from '../utils/crmStore';
import { EXAM_DATA } from './PriceProof';

const EXAM_OPTIONS = [
  'GRE',
  'TOEFL',
  'IELTS',
  'PTE',
  'Duolingo',
  'GMAT',
  'SAT',
  'LSAT',
  'Other / Not sure'
];

const TIMING_OPTIONS = [
  'Within 15 days',
  'Within 1 month',
  '1–3 months',
  '3–6 months',
  'Not decided'
];

const HELP_OPTIONS = [
  'Get a discounted exam voucher',
  'Complete my registration',
  'Check passport/name details',
  'Understand the exam',
  'Not sure yet'
];

export default function LeadCaptureModal({ isOpen, onClose, defaultTest = 'GRE' }) {
  const [exam, setExam] = useState(defaultTest);
  const [timing, setTiming] = useState('Within 1 month');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [needs, setNeeds] = useState(['Get a discounted exam voucher', 'Complete my registration']);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [assignedLead, setAssignedLead] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const toggleNeed = (item) => {
    if (needs.includes(item)) {
      setNeeds(needs.filter((n) => n !== item));
    } else {
      setNeeds([...needs, item]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit WhatsApp phone number');
      return;
    }

    setError('');
    const created = createNewLead({
      name,
      phone: `+91 ${cleanPhone.slice(-10)}`,
      exam,
      timing,
      needs,
      pricing: currentPricing,
      source: 'Landing Page Form',
      campaign: `${exam} Voucher Savings Lead`
    });

    setAssignedLead(created);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setError('');
    onClose();
  };

  const currentPricing = EXAM_DATA[exam] || { refPrice: 26500, testlyPrice: 19000, saving: 7500 };
  const waMessage = encodeURIComponent(
    `Hi Testly! I just submitted my enquiry for ${exam} (${timing}). I want to see my available voucher saving and book the ₹199 registration assistance.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span>Check Your Exam & Savings</span>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
                ₹199 Service
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Discounted official vouchers • Done-for-you registration
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Dynamic Saving Preview Pill */}
              {EXAM_DATA[exam] && (
                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800">
                      {exam} Official Saving
                    </span>
                    <p className="text-xs text-slate-700">
                      Regular <span className="line-through text-slate-400">₹{currentPricing.refPrice.toLocaleString('en-IN')}</span> → Testly <strong className="text-slate-900">₹{currentPricing.testlyPrice.toLocaleString('en-IN')}</strong>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-700 block">YOU SAVE</span>
                    <span className="text-lg font-black text-slate-900">₹{currentPricing.saving.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}

              {/* Question 1: Which exam? */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                  1. Which exam are you looking for?
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {EXAM_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setExam(opt)}
                      className={`text-xs font-bold py-2 px-2.5 rounded-lg border text-center transition-all ${
                        exam === opt
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: When planning to take it? */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                  2. When are you planning to take the exam?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {TIMING_OPTIONS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTiming(t)}
                      className={`text-xs font-bold py-2 px-2 rounded-lg border text-center transition-all ${
                        timing === t
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 & 4: Name & WhatsApp Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                    3. Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-sm font-semibold px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                    4. WhatsApp Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">+91</span>
                    <input
                      type="tel"
                      required
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-sm font-semibold pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Optional: What do you need help with? */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  What do you need help with? <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {HELP_OPTIONS.map((item) => {
                    const active = needs.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleNeed(item)}
                        className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-md border transition-all flex items-center gap-1.5 ${
                          active
                            ? 'bg-slate-100 border-slate-400 text-slate-900'
                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${active ? 'bg-slate-900 text-white' : 'border border-slate-300'}`}>
                          {active ? '✓' : ''}
                        </span>
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {error && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 p-2.5 rounded-lg">
                  {error}
                </p>
              )}

              {/* CTA Submit Button */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-700 text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>Check My Savings</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <p className="text-[11px] text-center text-slate-400 font-medium">
                  We verify your saving and call you directly. Zero spam.
                </p>
              </div>

            </form>
          ) : (
            /* Post-Submission Screen matching spec */
            <div className="py-2 space-y-6 text-center animate-in zoom-in-95 duration-150">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">
                  You're on the list!
                </h4>
                <p className="text-sm font-semibold text-slate-600">
                  A Testly advisor will call you shortly on your WhatsApp number.
                </p>
              </div>

              {/* Benefit Checklist */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  On the call, we'll help you:
                </p>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                  <span>Check your exact <strong>{exam}</strong> official voucher price</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                  <span>See your exact available saving upfront</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                  <span>Understand the registration and passport verification rules</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                  <span>Complete your registration with the ₹199 service</span>
                </div>
              </div>

              {/* Keep phone nearby alert */}
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 py-2 px-3 rounded-lg">
                <Clock className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Keep your phone nearby — advisor calling within 15 minutes</span>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-1">
                <a
                  href={`https://wa.me/919876543210?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Testly Directly →</span>
                </a>

                <button
                  onClick={handleResetAndClose}
                  className="w-full border border-slate-200 hover:bg-slate-100 text-slate-600 font-semibold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Done, back to website
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
