import React, { useState } from 'react';
import { Star, ArrowRight, CheckCircle2 } from 'lucide-react';

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
  },
  {
    name: 'Karthik Varma',
    examCity: 'GRE • Hyderabad Desk',
    avatar: '/assets/images/student-unt-grad.jpg',
    score: '324 / 340',
    admit: 'Univ of North Texas',
    quote: 'Was skeptical about institutional discounts initially, but Testly booked the slot live while sharing screens. Got my ETS confirmation email within 6 minutes flat!'
  },
  {
    name: 'Ananya Sen',
    examCity: 'IELTS Academic • Kolkata Desk',
    avatar: '/assets/images/student-avatar-4.jpg',
    score: '8.5 / 9.0',
    admit: 'Imperial College London',
    quote: 'Saved ₹2,800 on IELTS Academic booking. The passport verification checklist they shared saved me from a costly date-rescheduling penalty at IDP.'
  },
  {
    name: 'Rohan Deshmukh',
    examCity: 'GRE • Pune Desk',
    avatar: '/assets/images/student-avatar-3.jpg',
    score: '321 / 340',
    admit: 'TU Munich Informatics',
    quote: 'Flawless execution. Indian credit card international payment issues avoided entirely. Testly handled the slot booking and sent the GST-compliant official invoice.'
  },
  {
    name: 'Pooja Patel',
    examCity: 'TOEFL • Ahmedabad Desk',
    avatar: '/assets/images/student-uk-cohort.jpg',
    score: '111 / 120',
    admit: 'Univ of Toronto',
    quote: 'The ₹199 done-for-you service is worth 10x the money. They handled the slot monitor and booked the exact Saturday morning test center slot in Navrangpura.'
  },
  {
    name: 'Vikram Malhotra',
    examCity: 'GMAT Focus • Delhi NCR Desk',
    avatar: '/assets/images/student-skyline-night.jpg',
    score: '685 / 805',
    admit: 'London Business School',
    quote: 'Exceptional professionalism. Authorized GMAC voucher applied seamlessly with immediate confirmation on mba.com. Saved ₹5,200 without any ambiguity.'
  }
];

function ReviewCard({ review }) {
  return (
    <div className="w-[300px] sm:w-[360px] shrink-0 bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:shadow-xl hover:border-[#BFDBFE] hover:-translate-y-1 transition-all duration-300 mx-3">
      <div className="space-y-3.5">
        {/* Stars & Score */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
            ))}
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80">
            Score: {review.score}
          </span>
        </div>

        {/* Quote */}
        <p className="text-[13px] text-[#0F172A] font-normal leading-relaxed italic">
          "{review.quote}"
        </p>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
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
            <h4 className="text-xs font-bold text-[#0F172A] leading-tight">{review.name}</h4>
            <p className="text-[10px] text-[#64748B] font-medium mt-0.5">{review.examCity}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="text-[10px] font-semibold text-[#1E3A8A] bg-[#EBF3FF] px-2.5 py-1 rounded-md inline-block border border-[#BFDBFE]/60">
            {review.admit}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function StudentReviews({ onBookTest }) {
  const [paused, setPaused] = useState(false);

  // Double the reviews so the marquee loops seamlessly
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-[#FAF9F6] border-b border-[#E5E7EB] font-[Inter,system-ui,sans-serif] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FF] border border-[#BFDBFE] text-[#1E3A8A] text-[11px] font-bold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              <span>WHY STUDENTS SAY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Trusted by Thousands Across India
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] font-medium">
              Real test-takers who saved on fees and secured error-free bookings.
            </p>
          </div>

          <button
            onClick={() => onBookTest('GRE')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1E3A8A] hover:text-[#3B82F6] transition-colors group cursor-pointer self-start sm:self-auto"
          >
            <span>View All Student Stories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* ── Infinite CSS Marquee — pauses perfectly on hover ── */}
        {/* Outer mask: fades edges on both sides */}
        <div
          className="relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Inner scrolling track — doubled list creates seamless loop */}
          <div
            className="flex"
            style={{
              animation: 'reviewMarquee 42s linear infinite',
              animationPlayState: paused ? 'paused' : 'running',
              width: 'max-content'
            }}
          >
            {doubled.map((review, idx) => (
              <ReviewCard key={`${review.name}-${idx}`} review={review} />
            ))}
          </div>
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between text-xs text-[#64748B] px-1">
          <span>Hover to pause • Scrolls automatically</span>
          <span className="font-semibold text-[#0F172A]">100% Verified Indian Test-Takers</span>
        </div>

      </div>
    </section>
  );
}


