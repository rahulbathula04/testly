import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { ExamLogo } from './ExamLogos';

const INCLUDED = [
  'Account creation assistance',
  'Exam registration assistance',
  'Passport/name detail verification',
  'Voucher application',
  'Registration guidance',
  'Exam-day information',
  'Rules & requirements guidance',
];

const UNIVERSE_EXAMS = [
  { id: 'GRE', label: 'GRE' },
  { id: 'TOEFL', label: 'TOEFL' },
  { id: 'IELTS', label: 'IELTS' },
  { id: 'PTE', label: 'PTE' },
  { id: 'Duolingo', label: 'Duolingo' },
  { id: 'GMAT', label: 'GMAT' },
  { id: 'SAT', label: 'SAT' },
  { id: 'LSAT', label: 'LSAT' },
];

export default function ServiceAndExams({ onBookTest, onOpenSearch }) {
  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT — ₹199 Service */}
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                Registration Assistance.<br />Done for You.
              </h2>
              <p className="text-sm font-semibold text-slate-600 mt-1">
                Testly Professional Service — ₹199
              </p>
            </div>

            <p className="text-[14px] text-slate-600 leading-relaxed">
              Once you choose your exam, our team handles the registration process with you.
            </p>

            <ul className="space-y-2">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                  </div>
                  <span className="text-[13px] font-medium text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 pt-1">
              <button
                onClick={() => onBookTest('GRE')}
                className="bg-slate-900 hover:bg-slate-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2"
              >
                Book Professional Service <ArrowRight className="w-3.5 h-3.5" />
              </button>
              {/* "One simple service ₹199" card */}
              <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-center shadow-xs">
                <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fixed Concierge</p>
                <p className="font-mono text-2xl font-black text-slate-900 leading-none mt-0.5">₹199</p>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              Exam voucher price is separate. ₹199 is Testly's professional registration service fee.
            </p>
          </div>

          {/* RIGHT — Exam Universe with Official Logos */}
          <div id="exams" className="space-y-5">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                One Place for Your Exam
              </h2>
              <p className="text-sm text-slate-500 font-medium mt-1">
                Whether you've already decided or you're still comparing, Testly helps you book with confidence.
              </p>
            </div>

            {/* Clean logo cards grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
              {UNIVERSE_EXAMS.map((exam) => (
                <button
                  key={exam.id}
                  onClick={() => onBookTest(exam.id)}
                  className="bg-white border border-slate-200 hover:border-slate-400 hover:shadow-sm rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 h-20 transition-all group"
                >
                  <div className="h-7 flex items-center justify-center">
                    <ExamLogo examId={exam.id} className="h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">
                    {exam.label}
                  </span>
                </button>
              ))}

              {/* More exams card */}
              <button
                onClick={() => onOpenSearch && onOpenSearch()}
                className="col-span-1 sm:col-span-4 border border-dashed border-slate-300 hover:border-slate-400 rounded-xl px-4 py-2.5 flex items-center justify-center gap-2 transition-colors bg-white/50"
              >
                <span className="text-xs font-bold text-slate-400">···</span>
                <span className="text-xs font-medium text-slate-500">More Exams</span>
                <span className="font-mono text-[10px] font-semibold text-slate-400 uppercase tracking-wide ml-2">All Testing Boards Supported</span>
              </button>
            </div>

            <button
              onClick={() => onOpenSearch && onOpenSearch()}
              className="flex items-center gap-2 border border-slate-300 hover:border-slate-600 text-sm font-semibold text-slate-700 px-5 py-2.5 rounded-lg transition-colors bg-white"
            >
              Search Your Exam <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
