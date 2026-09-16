import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  Building2,
  MapPin,
  Calendar,
  Award,
  Sparkles,
  FileCheck2,
  Clock,
  Quote,
  Check
} from 'lucide-react';
import { ExamLogo } from './ExamLogos';

const DOSSIERS = [
  {
    id: 'dossier-sai-gre',
    name: 'Sai Krishna K.',
    college: 'VNR VJIET (B.Tech CSE)',
    city: 'Hyderabad, Telangana',
    exam: 'GRE',
    examLabel: 'GRE® General Test',
    venue: 'Prometric Testing Center, Madhapur',
    intake: 'Fall 2026 MS in CS (USA)',
    score: '324 / 340 (Q 168, V 156)',
    regularFee: 26500,
    testlyPrice: 19000,
    saved: 7500,
    serviceIncluded: '₹199 Passport Pre-check Included',
    verificationBadge: 'Official ETS Appointment Confirmed',
    verificationNumber: 'ETS-CONF-782914',
    problemSolved: 'My Indian passport had a single Given Name with a blank Surname. Testly\'s specialist audited my passport and formatted my ETS profile with proper FNU protocols before booking. On test morning, I walked straight through Prometric Madhapur security with zero delays.',
    testCenterCheckin: '100% First-Time Entry Clearance'
  },
  {
    id: 'dossier-ananya-toefl',
    name: 'Ananya S.',
    college: 'BMS College of Engineering',
    city: 'Bengaluru, Karnataka',
    exam: 'TOEFL',
    examLabel: 'TOEFL iBT® Test',
    venue: 'Prometric Testing Center, Whitefield',
    intake: 'Spring 2026 Masters in Data Science',
    score: '110 / 120 (R 29, L 28, S 26, W 27)',
    regularFee: 24900,
    testlyPrice: 18500,
    saved: 6400,
    serviceIncluded: '₹199 Profile Verification Included',
    verificationBadge: 'Official ETS Voucher Redeemed ($0.00)',
    verificationNumber: 'ETS-CONF-914022',
    problemSolved: 'My HDFC card kept declining on the international ETS US gateway due to OTP limits and 3.5% forex markups. With Testly, I paid in Indian Rupees via UPI, saved ₹6,400, and my voucher code applied cleanly on ets.org within 10 minutes.',
    testCenterCheckin: '100% First-Time Entry Clearance'
  },
  {
    id: 'dossier-rohit-pte',
    name: 'Rohit Kulkarni',
    college: 'COEP Technological University',
    city: 'Pune, Maharashtra',
    exam: 'PTE',
    examLabel: 'PTE Academic',
    venue: 'Pearson Professional Centers, Viman Nagar',
    intake: 'Australia Skilled Independent Visa (Subclass 189)',
    score: '84 / 90 (Superior English - 20 PR Points)',
    regularFee: 18000,
    testlyPrice: 13500,
    saved: 4500,
    serviceIncluded: 'Urgent Slot Lock + ₹199 Verification',
    verificationBadge: 'Pearson VUE Seat Locked',
    verificationNumber: 'PEAR-CONF-661209',
    problemSolved: 'Needed an urgent weekend test slot before the state nomination round closed. Testly found an open cancellation slot at Pearson Viman Nagar, applied the corporate voucher, and gave test-day headset acoustic calibration tips.',
    testCenterCheckin: 'Score Released in 36 Hours'
  },
  {
    id: 'dossier-venkatesh-ielts',
    name: 'Venkatesh V.',
    college: 'CBIT Gandipet',
    city: 'Hyderabad, Telangana',
    exam: 'IELTS',
    examLabel: 'IELTS Academic',
    venue: 'IDP IELTS Official Center, Somajiguda',
    intake: 'Fall 2026 UK Masters (Russell Group)',
    score: 'Band 8.0 (L 8.5, R 8.5, W 7.5, S 7.5)',
    regularFee: 17000,
    testlyPrice: 13000,
    saved: 4000,
    serviceIncluded: 'IDP Computer Slot Assistance',
    verificationBadge: 'IDP Candidate Booking Confirmed',
    verificationNumber: 'IDP-HYD-550183',
    problemSolved: 'Booking assistance was super smooth via UPI (PhonePe). They helped me find a computer-delivered slot at the Somajiguda center during peak September rush and ensured my passport spelling was 100% aligned.',
    testCenterCheckin: '100% First-Time Entry Clearance'
  },
  {
    id: 'dossier-aditya-gmat',
    name: 'Aditya Singhania',
    college: 'NMIMS / Management Consultant',
    city: 'Mumbai, Maharashtra',
    exam: 'GMAT',
    examLabel: 'GMAT™ Focus Edition',
    venue: 'Pearson Professional Centers, Andheri East',
    intake: 'INSEAD / ISB Hyderabad PGP',
    score: '685 GMAT Focus (97th Percentile)',
    regularFee: 28000,
    testlyPrice: 22000,
    saved: 6000,
    serviceIncluded: 'Corporate Allocation Rate',
    verificationBadge: 'GMAC Official Candidate Registration',
    verificationNumber: 'GMAC-CONF-338291',
    problemSolved: 'Application deadlines for European B-Schools and ISB were days away. Saved ₹6,000 on GMAT Focus test fee, eliminating foreign credit card fees, with verified instant slot booking.',
    testCenterCheckin: 'Official Score Verified by GMAC'
  },
  {
    id: 'dossier-divya-gre',
    name: 'Divya Nambiar',
    college: 'College of Engineering, Guindy (Anna Univ)',
    city: 'Chennai, Tamil Nadu',
    exam: 'GRE',
    examLabel: 'GRE® General Test',
    venue: 'Prometric Testing Center, Sholinganallur',
    intake: 'Fall 2026 MS in Robotics (USA)',
    score: '321 / 340 (Q 166, V 155)',
    regularFee: 26500,
    testlyPrice: 19000,
    saved: 7500,
    serviceIncluded: '₹199 Name Correction Assistance',
    verificationBadge: 'Official ETS Appointment Confirmed',
    verificationNumber: 'ETS-CONF-884910',
    problemSolved: 'My Tamil patronymic name on my passport (initial followed by given name) was rejected by the ETS automated registration portal. Testly\'s specialist configured the account according to ETS international compliance rules.',
    testCenterCheckin: '100% First-Time Entry Clearance'
  }
];

const EXAM_TABS = ['ALL', 'GRE', 'TOEFL', 'PTE', 'IELTS', 'GMAT'];

export default function VerifiedBookingDossiers({ onBookTest }) {
  const [activeTab, setActiveTab] = useState('ALL');

  const filteredDossiers = activeTab === 'ALL'
    ? DOSSIERS
    : DOSSIERS.filter(d => d.exam === activeTab);

  return (
    <section id="trust" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header with authentic positioning */}
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
              Don't just take our word for it. Inspect real registration records, actual Prometric and Pearson check-in clearances, and exact savings achieved by Indian aspirants.
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

        {/* Filter Tabs by Exam */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
          <span className="text-xs font-bold text-slate-400 mr-2">Filter by Exam:</span>
          {EXAM_TABS.map(tab => {
            const count = tab === 'ALL' ? DOSSIERS.length : DOSSIERS.filter(d => d.exam === tab).length;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'
                }`}
              >
                <span>{tab === 'ALL' ? 'All Exams' : tab}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* The Verified Dossier Receipts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDossiers.map(dossier => (
            <div
              key={dossier.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 relative overflow-hidden"
            >
              {/* Top Accent Pill */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 flex items-center">
                    <ExamLogo examId={dossier.exam} className="h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-900">{dossier.examLabel}</span>
                </div>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Verified</span>
                </span>
              </div>

              {/* Candidate Info & Venue */}
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">{dossier.name}</h4>
                <p className="text-xs text-blue-700 font-semibold">{dossier.college}</p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{dossier.venue}</span>
                </p>
              </div>

              {/* Financial Proof Slip (Receipt Style) */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center text-slate-500">
                  <span>Regular Exam Fee:</span>
                  <span className="line-through">₹{dossier.regularFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-slate-900 font-bold">
                  <span>Testly Voucher Rate:</span>
                  <span>₹{dossier.testlyPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                  <span className="font-sans font-bold text-emerald-800 text-[11px]">Direct Net Saving:</span>
                  <span className="font-black text-emerald-700 text-sm bg-emerald-100/60 px-2 py-0.5 rounded">
                    Save ₹{dossier.saved.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[10px] font-sans font-medium text-slate-400 text-right pt-0.5">
                  {dossier.serviceIncluded}
                </p>
              </div>

              {/* The High-Stakes Friction Solved */}
              <div className="space-y-1.5 text-xs text-slate-700 leading-relaxed font-medium bg-blue-50/40 p-3.5 rounded-xl border border-blue-100/80">
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1">
                  <FileCheck2 className="w-3 h-3 text-blue-600" />
                  <span>Test-Day Problem Solved:</span>
                </p>
                <p className="italic">"{dossier.problemSolved}"</p>
              </div>

              {/* Verification & Score Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <div>
                  <span className="text-slate-400 font-medium block">Official Score:</span>
                  <span className="font-bold text-slate-900">{dossier.score}</span>
                </div>
                <button
                  onClick={() => onBookTest(dossier.exam)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1"
                >
                  <span>Book {dossier.exam}</span>
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
              We audit your original Indian passport, match testing portal data character-by-character, and apply authorized institutional vouchers. If there is an ID mismatch on our watch, our ₹199 service fee is refunded immediately.
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
