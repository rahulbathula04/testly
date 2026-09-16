import React, { useRef, useState, useEffect } from 'react';
import { Star, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

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

export default function StudentReviews({ onBookTest }) {
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll loop that pauses whenever cursor is over the carousel
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId;
    const scrollStep = () => {
      if (!isPaused && container) {
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 5) {
          // Wrap around seamlessly
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 0.8;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 390;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-[#FAF9F6] border-b border-[#E5E7EB] font-[Inter,system-ui,sans-serif] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header matching exact reference media_1789575884431.png */}
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

          {/* Right Action & Controls */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={() => onBookTest('GRE')}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1E3A8A] hover:text-[#3B82F6] transition-colors group cursor-pointer mr-2"
            >
              <span>View All Student Stories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Manual Carousel Navigation Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scroll('left')}
                className="w-8 h-8 rounded-full border border-[#E5E7EB] bg-white text-[#0F172A] hover:bg-[#EBF3FF] hover:border-[#3B82F6] hover:text-[#1E3A8A] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-8 h-8 rounded-full border border-[#E5E7EB] bg-white text-[#0F172A] hover:bg-[#EBF3FF] hover:border-[#3B82F6] hover:text-[#1E3A8A] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Testimonials Carousel with Cursor Stop Hover */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth py-3 px-1 cursor-grab active:cursor-grabbing"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {REVIEWS.map((review, idx) => (
            <div
              key={`${review.name}-${idx}`}
              className="w-[310px] sm:w-[370px] shrink-0 bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:shadow-xl hover:border-[#BFDBFE] transition-all duration-200 hover:-translate-y-1 relative shadow-[0_2px_12px_rgba(15,23,42,0.03)]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="space-y-3.5">
                {/* Stars & Score pill matching reference */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-[#F59E0B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                    Score: {review.score}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-[13px] text-[#0F172A] font-normal leading-relaxed italic">
                  "{review.quote}"
                </p>
              </div>

              {/* Student Footer */}
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
                    <h4 className="text-xs font-bold text-[#0F172A] leading-tight">
                      {review.name}
                    </h4>
                    <p className="text-[10px] text-[#64748B] font-medium mt-0.5">
                      {review.examCity}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-semibold text-[#1E3A8A] bg-[#EBF3FF] px-2.5 py-1 rounded-md inline-block border border-[#BFDBFE]/60">
                    {review.admit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle helper note */}
        <div className="flex items-center justify-between text-xs text-[#64748B] pt-1 px-1">
          <span>Hover cursor to pause scroll • Click & drag or use arrows to navigate</span>
          <span className="font-semibold text-[#0F172A]">100% Verified Indian Test-Takers</span>
        </div>

      </div>
    </section>
  );
}

