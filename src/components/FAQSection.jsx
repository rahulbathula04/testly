import React, { useState } from 'react';
import { ChevronDown, Headphones, MessageCircle, ArrowRight } from 'lucide-react';

const FAQS = [
  {
    q: 'Is Testly affiliated with ETS, Pearson or Duolingo?',
    a: 'Testly is an independent professional candidate registration and advisory service operating under the Indian Contract Act, 1872. We procure official vouchers through authorized institutional corporate rails and provide zero-defect registration concierge services.'
  },
  {
    q: 'How does the ₹199 service work?',
    a: 'For a flat ₹199, our registration experts handle your entire booking process: we audit your passport name to avoid test-day disqualification, check slot availability, apply the discounted institutional voucher, and deliver your confirmed official hall ticket.'
  },
  {
    q: 'Are the prices updated regularly?',
    a: 'Yes. Our pricing engine syncs daily with active institutional voucher allocations and foreign exchange rates to ensure you always receive the maximum verified savings.'
  },
  {
    q: 'Can you help with rescheduling or cancellations?',
    a: 'Yes! Our support desk guides candidates through test board rescheduling rules, fee deadlines, and official policy compliance to protect your investment.'
  }
];

export default function FAQSection({ onBookTest }) {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (i) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  const waUrl = `https://wa.me/919302333144?text=${encodeURIComponent(
    'Hi Testly! I have a question about exam booking and registration assistance.'
  )}`;

  return (
    <section id="faq" className="py-12 sm:py-16 bg-white border-b border-slate-200/80 font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Heading & Subtitle (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-extrabold uppercase tracking-wider">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Still Have<br className="hidden sm:block" /> Questions?
            </h2>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Find answers to the most common questions.
            </p>
            <button
              onClick={() => onBookTest('GRE')}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors pt-2 group"
            >
              <span>View All FAQs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Middle Column: Accordion (6 cols) */}
          <div className="lg:col-span-6 space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openIdx === i;
              return (
                <div
                  key={faq.q}
                  className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all bg-slate-50/50"
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-700 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-700' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Support Card (3 cols) */}
          <div className="lg:col-span-3 bg-slate-50/80 border border-slate-200/90 rounded-2xl p-6 text-center space-y-4 shadow-2xs">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto shadow-xs">
              <Headphones className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-black text-slate-900">
                Need More Help?
              </h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Chat with our team on WhatsApp or drop us a message.
              </p>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
              <ArrowRight className="w-3 h-3" />
            </a>

            <p className="text-[11px] text-slate-400 font-medium">
              Or call us: <span className="font-bold text-slate-700">+91 9302 333 144</span>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
