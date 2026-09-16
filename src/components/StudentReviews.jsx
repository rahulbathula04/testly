import React from 'react';
import { Star, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Riya Sharma',
    examCity: 'GRE • Hyderabad Desk',
    avatar: '/assets/images/student-avatar-2.jpg',
    score: '328 / 340',
    admit: 'Carnegie Mellon Univ',
    quote: 'Testly saved me ₹6,043 on my GRE registration. More importantly, their officer spotted that my middle name was missing before submitting to ETS. Zero stress!'
  },
  {
    name: 'Arjun Mehta',
    examCity: 'TOEFL • Bengaluru Desk',
    avatar: '/assets/images/student-avatar-1.jpg',
    score: '114 / 120',
    admit: 'NYU Stern MS',
    quote: 'Super responsive WhatsApp team. They booked my preferred Sunday morning slot in Bengaluru in under 15 minutes and delivered the official ETS receipt instantly.'
  },
  {
    name: 'Sneha Reddy',
    examCity: 'PTE Academic • Chennai Desk',
    avatar: '/assets/images/student-avatar-5.jpg',
    score: '84 / 90',
    admit: 'Univ of Melbourne',
    quote: 'Best decision! Smooth verification process, official Pearson confirmation within hours, and I saved almost ₹4,000 compared to paying on the portal directly.'
  }
];

export default function StudentReviews({ onBookTest }) {
  return (
    <section id="reviews" className="py-12 sm:py-16 bg-white border-b border-slate-200/80 font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-9">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 text-[10px] font-extrabold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>WHY STUDENTS SAY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Trusted by Thousands Across India
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Real test-takers who saved on fees and secured error-free bookings.
            </p>
          </div>

          <button
            onClick={() => onBookTest('GRE')}
            className="inline-flex items-center gap-1.5 text-xs font-black text-blue-700 hover:text-blue-900 transition-colors group cursor-pointer"
          >
            <span>View All Student Stories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:shadow-xl hover:border-blue-200 transition-all duration-200 hover:-translate-y-1 relative shadow-[0_2px_8px_rgba(15,23,42,0.03)]"
            >
              <div className="space-y-3.5">
                {/* Stars & Score pill */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                    Score: {review.score}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-[12.5px] text-slate-700 font-medium leading-relaxed italic">
                  "{review.quote}"
                </p>
              </div>

              {/* Student Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs ring-1 ring-slate-200"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-white">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-900 flex items-center gap-1">
                      <span>{review.name}</span>
                    </h4>
                    <p className="text-[10px] text-slate-500 font-semibold">
                      {review.examCity}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9.5px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md block">
                    {review.admit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
