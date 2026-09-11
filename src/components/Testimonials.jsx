import React from 'react';
import { Star, Quote, CheckCircle2, MapPin } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Srikanth Reddy K.',
      test: 'GRE® 328 Score (JNTU Hyderabad)',
      location: 'Madhapur, Hyderabad',
      review: 'The ₹199 assisted registration saved me from a major mistake! I had a Given Name vs Surname mismatch on my Indian Passport for ETS. The specialist guided me line-by-line via WhatsApp.',
      tag: 'Verified Hyderabad Student'
    },
    {
      name: 'Ananya Rao',
      test: 'TOEFL iBT® 112 Score (Osmania Uni)',
      location: 'Begumpet, Hyderabad',
      review: 'The free adaptive GRE & TOEFL mock tests were 100% realistic. The IRT score estimation matched my actual ETS result within 2 points. Zero paywalls, zero daily limits!',
      tag: 'Verified Hyderabad Student'
    },
    {
      name: 'Venkatesh V.',
      test: 'IELTS Academic Band 8.0 (CBIT)',
      location: 'Kukatpally, Hyderabad',
      review: 'Booking assistance was super smooth via UPI (PhonePe). They helped me find a slot at the IDP Hyderabad center during peak rush. Best service for study abroad aspirants!',
      tag: 'Verified Student'
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white border-b border-[#E5EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#1769E0] bg-[#F2F7FF] px-3.5 py-1.5 rounded-full border border-[#1769E0]/20">
            HYDERABAD & INDIAN STUDENT REVIEWS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A56] tracking-tight">
            Trusted by Aspirants Across Hyderabad & India
          </h2>
          <p className="text-base sm:text-lg text-[#667085] font-medium">
            See how Testly helps candidates from JNTU, Osmania, CBIT, and study abroad hubs prepare & register with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item, idx) => (
            <div 
              key={idx}
              className="bg-[#F7FAFF] p-8 rounded-3xl border border-[#E5EAF2] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#FFB800] gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFB800]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-extrabold text-[#18A957] bg-[#EAF8F0] px-2.5 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-[#1769E0]/20" />

                <p className="text-xs sm:text-sm text-[#102A56] font-semibold leading-relaxed italic">
                  "{item.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5EAF2] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-[#102A56]">{item.name}</h4>
                  <p className="text-xs font-bold text-[#1769E0]">{item.test}</p>
                  <p className="text-[10px] text-[#667085] font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{item.location}</span>
                  </p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-[#18A957]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
