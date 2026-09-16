import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

const REAL_STUDENTS = [
  {
    id: 'sai-usa',
    name: 'Sai Krishna K.',
    country: 'United States',
    flag: '🇺🇸',
    image: '/assets/images/student-unt-grad.jpg',
    imageAlt: 'Sai Krishna K., currently studying in the United States',
    exam: 'GRE',
    score: '324 Score',
    saved: 7500,
    quote: 'Testly audited my passport name protocols and saved me ₹7,500 on official GRE booking. Zero test-day delays.'
  },
  {
    id: 'rohit-canada',
    name: 'Rohit K.',
    country: 'Canada',
    flag: '🇨🇦',
    image: '/assets/images/student-skyline-night.jpg',
    imageAlt: 'Rohit K., currently studying in Canada',
    exam: 'TOEFL',
    score: '110 Score',
    saved: 6400,
    quote: 'No international card declines or forex fees. Paid via domestic UPI and saved ₹6,400 with instant official voucher activation.'
  },
  {
    id: 'venkatesh-uk',
    name: 'Venkatesh & Cohort',
    country: 'United Kingdom',
    flag: '🇬🇧',
    image: '/assets/images/student-uk-cohort.jpg',
    imageAlt: 'Indian student cohort currently studying in the United Kingdom',
    exam: 'IELTS & PTE',
    score: 'Band 8.0',
    saved: 4000,
    quote: 'Our master\'s group booked together before visa deadlines. Every passport was verified and each of us saved ₹4,000.'
  }
];

export default function VerifiedBookingDossiers({ onBookTest }) {
  return (
    <section id="trust" className="py-20 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        {/* Minimal Apple-Style Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Real Students • Real Savings
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            From registration in India to studying across the world.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium">
            Over 4,000 students guided. Zero test-day entry issues.
          </p>
        </div>

        {/* 3 Minimal Photo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {REAL_STUDENTS.map((student) => (
            <div
              key={student.id}
              className="group flex flex-col justify-between space-y-5"
            >
              {/* Crisp Image Container */}
              <div className="relative aspect-[4/4] sm:aspect-[4/5] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/70 shadow-sm">
                <img
                  src={student.image}
                  alt={student.imageAlt}
                  width={600}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                />

                {/* Country Tag Floating Pill */}
                <div className="absolute top-3.5 left-3.5 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold shadow-sm">
                    <span>{student.flag}</span>
                    <span>{student.country}</span>
                  </span>
                </div>

                {/* Verified Check Badge */}
                <div className="absolute top-3.5 right-3.5 pointer-events-none">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>

              {/* Minimal Text Details */}
              <div className="space-y-3 px-1">
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                      {student.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {student.exam} • {student.score}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-black text-slate-900 tracking-tight">
                      ₹{student.saved.toLocaleString('en-IN')}
                    </p>
                    <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">
                      Saved
                    </p>
                  </div>
                </div>

                <p className="text-[13px] text-slate-600 leading-relaxed font-normal italic border-l-2 border-slate-200 pl-3">
                  "{student.quote}"
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Minimal Centered Action */}
        <div className="pt-4 text-center">
          <button
            onClick={() => onBookTest('GRE')}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded-full transition-all shadow-sm hover:shadow-md"
          >
            <span>Check Your Exam & Savings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
