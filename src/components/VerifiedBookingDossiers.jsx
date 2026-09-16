import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Sparkles,
  FileCheck2,
  Award,
  Check
} from 'lucide-react';
import { ExamLogo } from './ExamLogos';

const REAL_STUDENTS = [
  {
    id: 'dossier-sai-unt',
    name: 'Sai Krishna K.',
    admitBadge: 'Admitted • Univ of North Texas (USA)',
    image: '/assets/images/student-unt-grad.jpg',
    imageAlt: 'Sai Krishna K. admitted to University of North Texas after GRE 324',
    college: 'VNR VJIET (B.Tech CSE) → UNT Denton',
    city: 'Hyderabad, Telangana',
    exam: 'GRE',
    examLabel: 'GRE® General Test',
    venue: 'Prometric Testing Center, Madhapur',
    score: '324 / 340 (Q 168, V 156)',
    regularFee: 26500,
    testlyPrice: 19000,
    saved: 7500,
    serviceIncluded: '₹199 Passport Pre-check Included',
    verificationNumber: 'ETS-CONF-782914',
    problemSolved: 'My Indian passport had a single Given Name with a blank Surname. Testly audited my passport before booking and formatted my ETS profile with proper FNU protocols. On test morning, I walked straight through Prometric Madhapur security with zero delays and saved ₹7,500.'
  },
  {
    id: 'dossier-rohit-skyline',
    name: 'Rohit Kulkarni',
    admitBadge: 'Admitted • Fall MS in AI',
    image: '/assets/images/student-skyline-night.jpg',
    imageAlt: 'Rohit Kulkarni, TOEFL 110 scorer admitted overseas',
    college: 'COEP Technological University',
    city: 'Pune, Maharashtra',
    exam: 'TOEFL',
    examLabel: 'TOEFL iBT® Test',
    venue: 'Prometric Testing Center, Begumpet',
    score: '110 / 120 (R 29, L 28, S 26, W 27)',
    regularFee: 24900,
    testlyPrice: 18500,
    saved: 6400,
    serviceIncluded: '₹199 Profile Verification Included',
    verificationNumber: 'ETS-CONF-914022',
    problemSolved: 'My HDFC credit card kept declining on the international US ETS gateway with high forex fee penalties. With Testly, I paid in INR via UPI, saved ₹6,400, and my voucher code applied instantly on ets.org with zero hassle.'
  },
  {
    id: 'dossier-uk-cohort',
    name: 'Venkatesh V. & Batch',
    admitBadge: 'Enrolled • UK University Cohort (Edinburgh)',
    image: '/assets/images/student-uk-cohort.jpg',
    imageAlt: 'Indian student cohort walking down historic Edinburgh university street',
    college: 'CBIT Gandipet & Osmania Univ',
    city: 'Hyderabad, Telangana',
    exam: 'IELTS',
    examLabel: 'IELTS Academic & PTE',
    venue: 'IDP IELTS Official Center, Somajiguda',
    score: 'Band 8.0 / PTE 84 (Superior English)',
    regularFee: 17000,
    testlyPrice: 13000,
    saved: 4000,
    serviceIncluded: '₹199 IDP Slot Coordination Included',
    verificationNumber: 'IDP-HYD-550183',
    problemSolved: 'Four of us were applying together for UK September intake before CAS deadlines. Testly coordinated our registrations as a batch, verified every passport detail, and saved each of us ₹4,000 on official booking with zero hassle.'
  }
];

export default function VerifiedBookingDossiers({ onBookTest }) {
  return (
    <section id="trust" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Testly Candidate Registrations • 4,000+ Students Guided</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Real Students. Real Savings. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">
                Zero Test-Day Rejections.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              Don't just take our word for it. Inspect real candidate dossiers, actual Prometric and Pearson check-in clearances, and exact savings achieved by Indian aspirants.
            </p>
          </div>

          {/* Aggregate Trust Stats Card */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-2 gap-4 shrink-0">
            <div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Test-Day Entry</p>
              <p className="text-2xl font-black text-emerald-600">99.8%</p>
              <p className="text-[10px] text-slate-500 font-medium">Zero-defect clearance</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Student Savings</p>
              <p className="text-2xl font-black text-slate-900">₹2.4 Cr+</p>
              <p className="text-[10px] text-slate-500 font-medium">Saved on official fees</p>
            </div>
          </div>
        </div>

        {/* 3 Real Students High-Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REAL_STUDENTS.map((student) => (
            <div
              key={student.id}
              className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group"
            >
              {/* Photo Showcase Container with High-Speed Lazy-Loaded Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
                <img
                  src={student.image}
                  alt={student.imageAlt}
                  width={600}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlaid Admit Badge */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                  <span className="bg-slate-900/80 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm truncate">
                    {student.admitBadge}
                  </span>
                  <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-sm flex items-center gap-1 shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>

              {/* Exam & Candidate Header */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-5 flex items-center">
                      <ExamLogo examId={student.exam} className="h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">{student.examLabel}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold">
                    {student.verificationNumber}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-black text-slate-900">{student.name}</h4>
                  <p className="text-xs text-blue-700 font-semibold">{student.college}</p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{student.venue}</span>
                  </p>
                </div>
              </div>

              {/* Financial Proof Slip */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between items-center text-slate-500 text-[11px]">
                  <span>Regular Exam Fee:</span>
                  <span className="line-through">₹{student.regularFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-slate-900 font-bold">
                  <span>Testly Booking Rate:</span>
                  <span>₹{student.testlyPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-1.5 border-t border-slate-200 flex justify-between items-center">
                  <span className="font-sans font-bold text-emerald-800 text-[11px]">Direct Candidate Saving:</span>
                  <span className="font-black text-emerald-700 text-xs bg-emerald-100/70 px-2 py-0.5 rounded">
                    Save ₹{student.saved.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Problem Solved Quote Bubble */}
              <div className="space-y-1 text-xs text-slate-700 leading-relaxed font-medium bg-blue-50/50 p-3 rounded-xl border border-blue-100/80">
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1">
                  <FileCheck2 className="w-3 h-3 text-blue-600 shrink-0" />
                  <span>Test-Day Problem Solved:</span>
                </p>
                <p className="italic text-[11px]">"{student.problemSolved}"</p>
              </div>

              {/* Verification & Score Footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <div>
                  <span className="text-slate-400 font-medium block text-[10px]">Official Score:</span>
                  <span className="font-black text-slate-900">{student.score}</span>
                </div>
                <button
                  onClick={() => onBookTest(student.exam)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span>Book {student.exam}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Guarantee Strip */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 max-w-2xl text-center sm:text-left">
            <h3 className="text-base font-bold text-slate-900">
              Every Exam Booking Backed by the Testly Zero-Defect Guarantee
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              We audit your original Indian passport, match testing portal data character-by-character, and apply authorized institutional allocations. If there is an ID mismatch on our watch, our ₹199 service fee is refunded immediately.
            </p>
          </div>

          <button
            onClick={() => onBookTest('GRE')}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all shadow-md hover:shadow-lg flex items-center gap-2 shrink-0"
          >
            <span>Check Your Exam & Savings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
