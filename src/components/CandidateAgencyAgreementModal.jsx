import React from 'react';
import { X, ShieldCheck, Scale, FileText, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function CandidateAgencyAgreementModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col font-[Inter,system-ui,sans-serif]">

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Scale className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">
                Candidate Registration Agency Agreement
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Governed under Indian Contract Act, 1872 (Law of Agency, Sections 182–238)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 leading-relaxed">

          {/* Section 1: Agency Appointment */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>1. Appointment of Agent for Registration Concierge</span>
            </h4>
            <p>
              By engaging Testly Services India ("Testly") and submitting your candidate details, you (the "Principal") formally appoint Testly as your authorized administrative agent to assist with international examination profile verification, zero-defect passport name auditing, appointment slot tracking, and the administrative execution of official test registration on designated official provider portals.
            </p>
          </div>

          {/* Section 2: Fee Structure & Pass-Through Advantage */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>2. Fee Structure & Transparent Booking Advantage</span>
            </h4>
            <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
              <li>
                <strong>₹199 Professional Service Fee:</strong> Covers candidate document verification, character-by-character passport spelling review, official testing account configuration assistance, and post-booking support.
              </li>
              <li>
                <strong>Exam Fee / Booking Advantage:</strong> Where legitimate institutional partner, corporate allocation, or bulk distributor agreements permit, Testly applies authorized prepaid allocations or partner fee schedules directly toward your official registration, reducing your total out-of-pocket test expenditure.
              </li>
              <li>
                Testly does not independently administer examinations, mark scores, issue candidate test tickets, or act as an exam board.
              </li>
            </ul>
          </div>

          {/* Section 3: Candidate Passport & Identification Warranty */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-slate-900" />
              <span>3. Candidate Identity & Document Warranty</span>
            </h4>
            <p>
              The candidate expressly warrants and covenants that:
            </p>
            <ul className="space-y-1 list-disc pl-4 text-slate-600">
              <li>All passport details, legal names, dates of birth, and photographic documents provided are authentic, unexpired, and legitimately issued by the Government of India or applicable issuing authority.</li>
              <li>The candidate shall bring their original, physical Indian Passport to the authorized test venue (e.g. Prometric or Pearson VUE) on test day.</li>
              <li>Testly shall not be held liable if a candidate is denied entry due to presenting non-passport IDs (such as Aadhaar, PAN card, or photocopies) explicitly prohibited by testing authority mandates.</li>
            </ul>
          </div>

          {/* Section 4: Nominative Fair Use & Disclaimers */}
          <div className="space-y-2 bg-amber-50/60 p-4 rounded-2xl border border-amber-200 text-amber-900">
            <h4 className="font-bold text-sm flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>4. Nominative Fair Use & Negative Disclaimer</span>
            </h4>
            <p className="text-[11px] leading-relaxed">
              GRE® and TOEFL iBT® are registered trademarks of Educational Testing Service (ETS). PTE Academic® is a trademark of Pearson VUE. IELTS® is a registered trademark of Cambridge Assessment, British Council, and IDP Education. GMAT™ is a trademark of the Graduate Management Admission Council (GMAC). Duolingo® is a trademark of Duolingo, Inc.
            </p>
            <p className="text-[11px] font-bold mt-1">
              Testly is an independent candidate assistance service and is not affiliated with, approved by, or endorsed by ETS, Pearson VUE, IDP, GMAC, or Duolingo. All trademark references are utilized strictly under Nominative Fair Use to identify the examination for which registration assistance is provided.
            </p>
          </div>

          {/* Section 5: Limitation of Liability */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">
              5. Limitation of Liability
            </h4>
            <p className="text-slate-600">
              To the maximum extent permitted by applicable Indian law, Testly’s aggregate liability arising out of or related to the registration assistance service, whether in contract, tort, or otherwise, shall be strictly limited to the professional service fee (₹199) paid by the candidate.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <span className="text-[11px] text-slate-500 font-medium">
            Active Version: 2026.1 • Legal Compliance Division
          </span>
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2 rounded-xl text-xs transition-colors"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
}
