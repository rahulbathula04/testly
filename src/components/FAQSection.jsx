import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const waUrl = `https://wa.me/919347379041?text=${encodeURIComponent(
    'Hi Testly! I have a question about exam booking and registration assistance.'
  )}`;

  return (
    <section id="faq" className="py-10 sm:py-16 bg-white border-b border-[#E5E7EB] font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Heading & Subtitle (3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-3 space-y-2.5 sm:space-y-3.5"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FF] border border-[#BFDBFE] text-[#1E3A8A] text-[10px] sm:text-[10.5px] font-bold tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Still Have Questions?
            </h2>
            <p className="text-xs text-[#64748B] font-normal leading-relaxed">
              Transparent answers regarding vouchers, fees, slot audits, and rescheduling rules.
            </p>
            <motion.button
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onBookTest('GRE')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A] hover:text-[#3B82F6] transition-colors pt-1 group cursor-pointer"
            >
              <span>View All 18+ FAQs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Middle Column: Accordion (6 cols) */}
          <div className="lg:col-span-6 space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openIdx === i;
              return (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                    isOpen
                      ? 'border-blue-500/80 shadow-md bg-blue-50/10'
                      : 'border-slate-200/80 bg-slate-50/40 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <motion.button
                    whileTap={{ scale: 0.995 }}
                    onClick={() => toggle(i)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-700 transition-colors cursor-pointer select-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-250 ${
                        isOpen ? 'rotate-180 text-blue-700' : 'text-slate-400'
                      }`}
                    />
                  </motion.button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          transition: { height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.2, delay: 0.05 } }
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: { height: { duration: 0.2, ease: 'easeIn' }, opacity: { duration: 0.15 } }
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100/80 pt-3 bg-white">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Support Card (3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.4, delay: 0.15 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="lg:col-span-3 bg-white border border-slate-200/90 rounded-2xl p-6 text-center space-y-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto border border-blue-100 shadow-2xs">
              <Headphones className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-black text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>OFFICERS ONLINE NOW</span>
              </div>
              <h4 className="text-sm font-black text-slate-900 pt-1">
                Need Fast Help?
              </h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Connect directly with a certified exam officer on WhatsApp.
              </p>
            </div>

            <motion.a
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow group cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Officer Desk</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>

            <div className="pt-2 border-t border-slate-100 text-[10.5px] text-slate-400 font-medium space-y-0.5">
              <p>Direct: <span className="font-bold text-slate-700">+91 93473 79041</span></p>
              <p>Mon – Sat, 9:00 AM – 9:00 PM IST</p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
