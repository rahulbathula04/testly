import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  FileCheck,
  CreditCard,
  Building2,
  Lock,
  ChevronRight
} from 'lucide-react';
import { EXAM_OFFERINGS } from '../data/examOfferings';

export default function HowItWorksAndDeciding({ onBookTest }) {
  // Interactive Diagnostic State
  const [exam, setExam] = useState('GRE');
  const [paymentType, setPaymentType] = useState('intl_card'); // 'intl_card' vs 'domestic_upi'
  const [passportType, setPassportType] = useState('single_name'); // 'single_name' | 'standard' | 'initials'

  const currentOffering = EXAM_OFFERINGS[exam] || EXAM_OFFERINGS.GRE;
  const baseRetail = currentOffering.reference_price;
  const testlyExamRate = currentOffering.testly_price;
  const conciergeFee = 199;

  // Real Indian Banking Forex Math: 3.5% FX markup + 18% GST on FX
  const forexLeak = paymentType === 'intl_card' ? Math.round(baseRetail * 0.035 * 1.18) : 0;
  const totalRetailCost = baseRetail + forexLeak;
  const testlyTotalCost = testlyExamRate + conciergeFee;
  const netRupeesSaved = totalRetailCost - testlyTotalCost;

  const passportDiagnostics = {
    single_name: {
      status: 'HIGH RISK (Test-Day Denial)',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-200',
      description:
        "Your Indian passport has only a Given Name (Surname is blank). When entered into standard ETS or Pearson forms, the system automatically assigns 'FNU' (First Name Unknown) or splits your name. On test day, Prometric biometric security matches physical passport character-by-character and strictly turns candidates away. Your entire test fee is forfeited.",
      testlyProtocol:
        'Our human registration officer manually configures the official ETS / Pearson FNU exception profile before booking to guarantee 100% test-day entry clearance.'
    },
    initials: {
      status: 'AUDIT REQUIRED (Expansion Rule)',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
      description:
        "Your passport contains single initials (e.g. 'M. S. Swaminathan'). International testing portals require exact legal expansion according to the bottom MRZ optical strip, or score reporting to US/UK universities can be flagged for identity discrepancies.",
      testlyProtocol:
        'Testly verifies the Machine Readable Zone (MRZ) characters against official test board expansion criteria prior to ticket generation.'
    },
    standard: {
      status: 'CLEARED (Standard Protocol)',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      description:
        'Both Given Name and Surname are distinctly printed. Standard biometric identity match applies cleanly at test center entry.',
      testlyProtocol:
        'Our officer conducts a 6-point verification (DOB, spelling, gender, passport expiry, and test city location) before applying your institutional voucher.'
    }
  };

  const activePassportDiag = passportDiagnostics[passportType];

  const waShareText = `Hi Testly! I used your Registration Diagnostic for ${exam}. My passport has ${passportType === 'single_name' ? 'a Single Name (Surname blank)' : passportType === 'initials' ? 'Initials' : 'Given + Surname'}. Please audit my profile and lock in the ₹${testlyExamRate.toLocaleString('en-IN')} rate.`;

  return (
    <section id="how-it-works" className="py-16 bg-slate-50/70 border-b border-slate-200 font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 border border-slate-200/90 text-slate-800 text-xs font-bold font-mono uppercase tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>OPERATIONAL BLUEPRINT & CANDIDATE PROTECTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            How Human Registration Logic Protects You.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Booking an international exam from India is not just entering an email. Between hidden bank forex surcharges and test-day passport name rejections, here is how our dedicated human desk manages your booking.
          </p>
        </div>

        {/* ── Interactive Human Diagnostic Engine: Real Financial & Passport Logic ── */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
          
          {/* Header Bar */}
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-extrabold uppercase tracking-widest block">
                INTERACTIVE AUDIT ENGINE
              </span>
              <h3 className="text-base font-bold text-white">
                Live Indian Candidate Net Cost & Passport Risk Diagnostic
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Hyderabad Desk Rules • Sep 2026 Active
            </span>
          </div>

          {/* Diagnostic Controls & Live Output */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">

              {/* 1. Exam Switcher */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
                  <span>1. Target Examination</span>
                  <span className="text-[11px] font-mono font-bold text-slate-400">Locked Institutional Quota</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['GRE', 'TOEFL', 'PTE', 'Duolingo'].map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => setExam(ex)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                        exam === ex
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Payment Method Switcher (Forex Logic) */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
                  <span>2. Payment Channel</span>
                  <span className="text-[11px] font-mono text-amber-700 font-bold">
                    {paymentType === 'intl_card' ? '⚠️ +3.5% Forex + 18% Bank GST' : '✅ 0% Forex Surcharge'}
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentType('intl_card')}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      paymentType === 'intl_card'
                        ? 'bg-amber-50/70 border-amber-300 text-amber-950 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Direct on US/Intl Portal</span>
                      <CreditCard className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Indian Credit / Debit card on international gateway (USD charge)
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType('domestic_upi')}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      paymentType === 'domestic_upi'
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Testly Domestic Rail (INR)</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Domestic UPI / NetBanking with zero cross-border markup
                    </p>
                  </button>
                </div>
              </div>

              {/* 3. Passport Name Structure (Prometric Lockout Logic) */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
                  <span>3. Indian Passport Name Structure</span>
                  <span className="text-[11px] font-mono text-slate-400">Biometric Prometric Compliance</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPassportType('single_name')}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      passportType === 'single_name'
                        ? 'bg-rose-50 border-rose-300 text-rose-950'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold block">Single Name Only</span>
                    <span className="text-[10px] text-slate-500">Surname left blank in passport</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPassportType('initials')}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      passportType === 'initials'
                        ? 'bg-amber-50 border-amber-300 text-amber-950'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold block">Initials in Name</span>
                    <span className="text-[10px] text-slate-500">e.g. M. S. Swaminathan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPassportType('standard')}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      passportType === 'standard'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold block">Given + Surname</span>
                    <span className="text-[10px] text-slate-500">Both fields distinctly printed</span>
                  </button>
                </div>
              </div>

              {/* Passport Biometric Risk Notice Box */}
              <div className="p-4 rounded-xl border bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Passport Biometric Audit Rule:</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${activePassportDiag.badgeClass}`}>
                    {activePassportDiag.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activePassportDiag.description}
                </p>
                <div className="pt-2 border-t border-slate-200 flex items-start gap-2 text-xs text-emerald-900 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Testly Protocol:</strong> {activePassportDiag.testlyProtocol}</span>
                </div>
              </div>

            </div>

            {/* Right Settlement Breakdown Card (5 cols) */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Financial Settlement Audit
                </span>
                <span className="font-mono text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-700 font-bold">
                  {exam} Official
                </span>
              </div>

              {/* Line Items */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Official Board Base Fee:</span>
                  <span className="font-mono font-semibold text-slate-900">₹{baseRetail.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    Hidden Bank Forex Markup:
                    <span title="3.5% foreign currency conversion + 18% GST" className="text-slate-400 cursor-help">ⓘ</span>
                  </span>
                  <span className={`font-mono font-bold ${forexLeak > 0 ? 'text-amber-800' : 'text-emerald-700'}`}>
                    {forexLeak > 0 ? `+ ₹${forexLeak.toLocaleString('en-IN')}` : '₹0 (Eliminated)'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600 pb-2 border-b border-dashed border-slate-200">
                  <span>Total Direct Retail Out-of-Pocket:</span>
                  <span className="font-mono font-bold line-through text-slate-400">₹{totalRetailCost.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center justify-between text-slate-800 font-bold">
                  <span>Testly Institutional Quota Rate:</span>
                  <span className="font-mono text-sm text-slate-900 font-black">₹{testlyExamRate.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center justify-between text-slate-600 pb-2 border-b border-dashed border-slate-200">
                  <span>Human Registration Concierge:</span>
                  <span className="font-mono font-semibold text-slate-800">+ ₹{conciergeFee}</span>
                </div>

                {/* Net Total */}
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-slate-900">Student Net Out-of-Pocket:</span>
                  <span className="font-mono text-lg font-black text-slate-900">₹{testlyTotalCost.toLocaleString('en-IN')}</span>
                </div>

                {/* Highlighted Net Rupee Savings */}
                <div className="p-3 bg-emerald-100/70 border border-emerald-300 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-emerald-900 uppercase tracking-wide block">
                      TRUE NET CASH SAVED
                    </span>
                    <span className="text-[11px] text-emerald-800 font-medium">Exam discount + forex eliminated</span>
                  </div>
                  <span className="text-xl font-black font-mono text-emerald-950">
                    ₹{netRupeesSaved.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => onBookTest(exam)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all shadow-sm text-xs flex items-center justify-center gap-1.5"
                >
                  <span>Lock In This Rate (Save ₹{netRupeesSaved.toLocaleString('en-IN')})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(waShareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#128C7E] font-bold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#128C7E]" />
                  <span>Send Pre-Audit to Booking Officer</span>
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* ── The 4-Stage Operational Protocol (Human Work Process) ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              The 4-Stage Human Operational Protocol
            </h3>
            <span className="text-xs font-mono text-slate-400 font-bold hidden sm:block">
              ZERO-DEFECT REGISTRATION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Stage 1 */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[11px] font-mono font-bold">
                  1
                </span>
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Stage 01</span>
              </div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Slot Match & Quota Lock
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                You select your exam date window and preferred test center (e.g. Hyderabad Begumpet vs Madhapur). We freeze your institutional voucher rate with zero upfront payment.
              </p>
            </div>

            {/* Stage 2 */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center text-[11px] font-mono font-bold">
                  2
                </span>
                <span className="text-[10px] font-mono text-blue-700 font-bold uppercase">Stage 02</span>
              </div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                6-Point Passport Pre-Audit
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our human booking officer manually reviews your physical passport photo page against Prometric biometric rules, eliminating single-name FNU rejections before payment.
              </p>
            </div>

            {/* Stage 3 */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-indigo-700 text-white flex items-center justify-center text-[11px] font-mono font-bold">
                  3
                </span>
                <span className="text-[10px] font-mono text-indigo-700 font-bold uppercase">Stage 03</span>
              </div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Direct Portal Registration
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We input your verified credentials directly into ETS, Pearson, or Duolingo backend systems and apply your institutional quota voucher to generate your booking slip.
              </p>
            </div>

            {/* Stage 4 */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[11px] font-mono font-bold">
                  4
                </span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">Stage 04</span>
              </div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Domestic Invoicing & Delivery
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Settle cleanly in INR via domestic UPI with zero foreign exchange fees. Your official test board hall ticket PDF and GST tax invoice are dispatched directly to WhatsApp.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
