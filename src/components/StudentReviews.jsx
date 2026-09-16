import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Riya Sharma',
    examCity: 'GRE • Hyderabad',
    avatar: '/assets/images/student-avatar-2.jpg',
    quote: 'Testly made my GRE registration so easy. Saved money and zero stress!'
  },
  {
    name: 'Arjun Mehta',
    examCity: 'TOEFL • Bengaluru',
    avatar: '/assets/images/student-avatar-1.jpg',
    quote: 'Super supportive team. They handled everything professionally.'
  },
  {
    name: 'Sneha Reddy',
    examCity: 'PTE • Chennai',
    avatar: '/assets/images/student-avatar-5.jpg',
    quote: 'Best decision! Smooth process and excellent support.'
  }
];

export default function StudentReviews({ onBookTest }) {
  return (
    <section id="reviews" className="py-12 sm:py-16 bg-white border-b border-slate-200/80 font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-2">
            <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-extrabold uppercase tracking-wider">
              WHY STUDENTS SAY
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Trusted by Thousands Across India
            </h2>
          </div>

          <button
            onClick={() => onBookTest('GRE')}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors group"
          >
            <span>View More Reviews</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:shadow-md hover:bg-white transition-all shadow-2xs"
            >
              <div className="space-y-3">
                <p className="text-xs text-slate-700 font-medium leading-relaxed italic">
                  "{review.quote}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <h4 className="text-xs font-black text-slate-900">
                      {review.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-semibold">
                      {review.examCity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
