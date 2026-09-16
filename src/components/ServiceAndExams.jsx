import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

const INCLUDED = [
  'Account creation assistance',
  'Exam registration assistance',
  'Passport/name detail verification',
  'Voucher application',
  'Registration guidance',
  'Exam-day information',
  'Rules & requirements guidance',
];

const EXAMS = [
  { id:'GRE',     label:'GRE',     prefix:'ETS', color:'text-blue-700',  bg:'bg-blue-50 border-blue-100' },
  { id:'TOEFL',   label:'TOEFL',   prefix:'ETS', color:'text-blue-700',  bg:'bg-blue-50 border-blue-100' },
  { id:'IELTS',   label:'IELTS',   prefix:'',    color:'text-red-700',   bg:'bg-red-50  border-red-100'  },
  { id:'PTE',     label:'PTE',     prefix:'P',   color:'text-blue-600',  bg:'bg-blue-50 border-blue-100' },
  { id:'Duolingo',label:'Duolingo',prefix:'',    color:'text-green-700', bg:'bg-green-50 border-green-100'},
  { id:'GMAT',    label:'GMAT',    prefix:'G',   color:'text-slate-900', bg:'bg-slate-100 border-slate-200'},
  { id:'SAT',     label:'SAT',     prefix:'',    color:'text-slate-800', bg:'bg-slate-100 border-slate-200'},
  { id:'LSAT',    label:'LSAT',    prefix:'',    color:'text-slate-800', bg:'bg-slate-100 border-slate-200'},
];

export default function ServiceAndExams({ onBookTest, onOpenSearch }) {
  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

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
              {INCLUDED.map(item => (
                <li key={item} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                  </div>
                  <span className="text-[13px] font-medium text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 pt-1">
              <button onClick={() => onBookTest('GRE')}
                className="bg-slate-900 hover:bg-slate-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2">
                Book Professional Service <ArrowRight className="w-3.5 h-3.5" />
              </button>
              {/* "One simple service ₹199" card */}
              <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-center">
                <p className="font-['Caveat'] text-sm text-slate-500">One simple service.</p>
                <p className="font-['Caveat'] text-2xl font-bold text-slate-900">₹199.</p>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              Exam voucher price is separate. ₹199 is Testly's professional registration service fee.
            </p>
          </div>

          {/* RIGHT — Exam Universe */}
          <div id="exams" className="space-y-5">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                One Place for Your Exam
              </h2>
              <p className="text-sm text-slate-500 font-medium mt-1">
                Whether you've already decided or you're still comparing, Testly helps you book with confidence.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              {EXAMS.map(exam => (
                <button key={exam.id} onClick={() => onBookTest(exam.id)}
                  className={`border rounded-xl p-3 text-center hover:shadow-sm transition-all ${exam.bg}`}>
                  {exam.prefix && (
                    <p className="text-[8px] font-black uppercase text-slate-400 mb-0.5">{exam.prefix}</p>
                  )}
                  <p className={`text-sm font-black leading-tight ${exam.color}`}>{exam.label}</p>
                </button>
              ))}
              <button
                className="col-span-4 border border-dashed border-slate-300 rounded-xl px-3 py-2.5 flex items-center justify-center gap-2 hover:border-slate-400 transition-colors">
                <span className="text-xs font-semibold text-slate-400">· · ·</span>
                <span className="text-xs font-semibold text-slate-400 italic">More Possibilities Ahead</span>
              </button>
            </div>

            <button onClick={() => onOpenSearch && onOpenSearch()}
              className="flex items-center gap-2 border border-slate-300 hover:border-slate-600 text-sm font-semibold text-slate-700 px-5 py-2.5 rounded-lg transition-colors">
              Search Your Exam <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
