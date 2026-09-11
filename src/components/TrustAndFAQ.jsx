import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, HelpCircle } from 'lucide-react';

export default function TrustAndFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What is the Testly Professional Service (₹199)?',
      a: 'Testly Professional Service is a flat ₹199 assisted registration offering. A dedicated specialist guides your account setup, verifies personal details, assists with exam slot selection, and ensures smooth booking confirmation.'
    },
    {
      q: 'How does Testly offer lower test prices?',
      a: 'We pass along savings unlocked through valid promo vouchers and bulk arrangements directly to aspirants, keeping our sole service margin transparent at flat ₹199.'
    },
    {
      q: 'Are the test vouchers official and authentic?',
      a: 'Yes, 100%. All vouchers provided are official promo codes directly redeemable on official provider portals (ETS, Pearson, GMAC, etc.) at checkout.'
    },
    {
      q: 'Can I try realistic practice mock tests for free?',
      a: 'Yes! Testly offers free diagnostic mock tests with realistic exam interfaces, timed sections, and automated score reports.'
    },
    {
      q: 'What if I need to reschedule or change my exam center?',
      a: 'Exam rescheduling follows the standard policies of the respective official test provider (ETS / Pearson / GMAC). Our support team is available to guide you through the process.'
    }
  ];

  return (
    <section id="faqs" className="py-20 bg-[#F7FAFF] border-b border-[#E5EAF2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-4 mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-[#102A56] bg-white px-3.5 py-1.5 rounded-full border border-[#E5EAF2]">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#102A56] tracking-tight">
            Transparent answers to common questions.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl border border-[#E5EAF2] overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full text-left p-6 font-extrabold text-[#102A56] text-base flex items-center justify-between gap-4 hover:text-[#1769E0] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform shrink-0 ${openIndex === idx ? 'rotate-180 text-[#1769E0]' : 'text-[#667085]'}`} />
              </button>

              {openIndex === idx && (
                <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-[#667085] font-medium leading-relaxed border-t border-[#E5EAF2]/60 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
