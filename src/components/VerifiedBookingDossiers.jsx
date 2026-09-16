import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  Check,
  Building2,
  FileCheck2,
  Lock
} from 'lucide-react';
import { ExamLogo } from './ExamLogos';

const REAL_STUDENTS = [
  {
    id: 'sai-usa',
    name: 'Sai Krishna K.',
    country: 'United States',
    flag: '🇺🇸',
    avatar: '/assets/images/student-unt-grad.jpg',
    avatarAlt: 'Sai Krishna K., currently in the United States',
    exam: 'GRE',
    examLabel: 'GRE® General Test',
    score: '324 / 340',
    regularFee: 26500,
    testlyPrice: 19000,
    saved: 7500,
    bookingRef: 'ETS-CONF-782914',
    clearanceStatus: '100% Test-Day Entry Clearance',
    problemSolved: 'My Indian passport had a single Given Name with a blank Surname. Testly audited my passport and configured my ETS profile with proper FNU protocols. I walked straight through test center security with zero delays.'
  },
  {
    id: 'rohit-canada',
    name: 'Rohit K.',
    country: 'Canada',
    flag: '🇨🇦',
    avatar: '/assets/images/student-skyline-night.jpg',
    avatarAlt: 'Rohit K., currently in Canada',
    exam: 'TOEFL',
    examLabel: 'TOEFL iBT® Test',
    score: '110 / 120',
    regularFee: 24900,
    testlyPrice: 18500,
    saved: 6400,
    bookingRef: 'ETS-CONF-914022',
    clearanceStatus: 'Domestic UPI Booking • Zero Forex',
    problemSolved: 'My Indian credit card kept declining on the international US ETS gateway with forex fee penalties. With Testly, I paid cleanly in INR via UPI, saved ₹6,400, and my voucher code applied instantly on ets.org.'
  },
  {
    id: 'venkatesh-uk',
    name: 'Venkatesh & Cohort',
    country: 'United Kingdom',
    flag: '🇬🇧',
    avatar: '/assets/images/student-uk-cohort.jpg',
    avatarAlt: 'Indian student cohort currently in the United Kingdom',
    exam: 'IELTS',
    examLabel: 'IELTS Academic & PTE',
    score: 'Band 8.0',
    regularFee: 17000,
    testlyPrice: 13000,
    saved: 4000,
    bookingRef: 'IDP-CONF-882104',
    clearanceStatus: 'Batch Passport Verified',
    problemSolved: 'Four of us were applying for UK intake before CAS deadlines. Testly coordinated our registrations as a batch, verified every passport character-by-character, and saved each of us ₹4,000 on official fees.'
  }
];

export default function VerifiedBookingDossiers({ onBookTest }) {
  return (
    <section id="trust" className="py-14 sm:py-18 bg-slate-50/70 border-b border-slate-200 font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Credibility Header with Proof Numbers */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>TESTLY TRACK RECORD • 4,000+ CANDIDATES REGISTERED</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Real Bookings. Real Savings. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">
                Zero Test-Day Rejections.
              </span>
            </h2>

            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Proof of Testly's registration assistance. How Indian aspirants eliminate passport mismatch errors, bypass international card failures, and access institutional savings.
            </p>
          </div>

          {/* 3 Key Testly Credibility Metrics */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm grid grid-cols-3 gap-4 shrink-0 divide-x divide-slate-100">
            <div className="text-center px-2">
              <p className="text-xl sm:text-2xl font-black text-slate-900 font-mono">99.8%</p>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                Entry Clearance
              </p>
            </div>
            <div className="text-center px-2">
              <p className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">₹2.4 Cr+</p>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                Fee Savings
              </p>
            </div>
            <div className="text-center px-2">
              <p className="text-xl sm:text-2xl font-black text-blue-600 font-mono">₹199</p>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                Service Fee
              </p>
            </div>
          </div>
        </div>

        {/* 3 High-Credibility Compact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REAL_STUDENTS.map((student) => (
            <div
              key={student.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative"
            >
              {/* Card Header: Compact 56px Avatar + Student Name + Country */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-13 h-13 rounded-xl overflow-hidden bg-slate-100 ring-2 ring-slate-100 shrink-0">
                    <img
                      src={student.avatar}
                      alt={student.avatarAlt}
                      width={56}
                      height={56}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 leading-snug">
                      {student.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-0.5">
                      <span>{student.flag}</span>
                      <span className="font-semibold text-slate-700">{student.country}</span>
                    </div>
                  </div>
                </div>

                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Verified</span>
                </span>
              </div>

              {/* Middle Proof: Exam + Direct Saving Value */}
              <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-4 flex items-center">
                      <ExamLogo examId={student.exam} className="h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">{student.examLabel}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-semibold font-mono block mt-0.5">
                    Score: {student.score}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-lg font-black text-emerald-600 font-mono block leading-none">
                    Save ₹{student.saved.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium line-through">
                    ₹{student.regularFee.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* What Testly Solved (The Real Credibility Value) */}
              <div className="space-y-1 text-xs text-slate-600 leading-relaxed bg-blue-50/30 p-3 rounded-xl border border-blue-100/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1">
                  <FileCheck2 className="w-3 h-3 text-blue-600 shrink-0" />
                  <span>Testly Value Delivered:</span>
                </p>
                <p className="italic text-[11.5px] text-slate-700">
                  "{student.problemSolved}"
                </p>
              </div>

              {/* Card Footer: Official Booking Ref & Action */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <div className="space-y-0.5 font-mono text-[10px] text-slate-400">
                  <span className="block font-semibold text-slate-600">{student.bookingRef}</span>
                  <span className="text-[9.5px] text-emerald-600 font-medium">✓ {student.clearanceStatus}</span>
                </div>

                <button
                  onClick={() => onBookTest(student.exam)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm shrink-0"
                >
                  <span>Book {student.exam}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Testly Credibility Guarantee Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="space-y-1 max-w-2xl text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>The Testly ₹199 Zero-Defect Guarantee</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              We audit your Indian passport spelling character-by-character against testing portal rules. If any candidate is denied entry due to a name mismatch error on our watch, our ₹199 service fee is refunded immediately.
            </p>
          </div>

          <button
            onClick={() => onBookTest('GRE')}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all shadow-sm hover:shadow flex items-center gap-2 shrink-0"
          >
            <span>Check Your Exam & Savings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
