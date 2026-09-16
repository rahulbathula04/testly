import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  { q: 'Is the voucher official?',
    a: 'Testly provides vouchers sourced through its voucher procurement arrangements. The voucher corresponds to the applicable official exam registration process.' },
  { q: 'Is Testly affiliated with the exam providers?',
    a: 'No. Testly is an independent registration assistance and voucher procurement service. Not affiliated with or endorsed by ETS, IELTS, Pearson, Duolingo, GMAC, College Board, or any other exam organisation.' },
  { q: 'What is the ₹199 fee?',
    a: '₹199 is Testly\'s Professional Service fee for registration assistance. The exam voucher price is separate and shown upfront before you purchase.' },
  { q: 'Can Testly create my exam account?',
    a: 'Yes. Testly\'s team assists with account creation and the registration process as part of the ₹199 Professional Service.' },
  { q: 'Do you check passport details?',
    a: 'Yes. The Professional Service includes checking the student\'s relevant name and passport details before registration to help reduce avoidable errors.' },
  { q: 'Can I buy only the voucher without the ₹199 service?',
    a: 'No. The ₹199 Professional Service is mandatory with Testly\'s voucher transaction. It ensures your registration is handled correctly.' },
  { q: 'How much will I save?',
    a: 'It depends on the exam and applicable official price. Testly displays the applicable reference price, Testly price and calculated saving before purchase. For example, GRE students typically save ₹7,500.' },
  { q: 'Do I need coaching from Testly?',
    a: 'No. Coaching is not required to use Testly. Testly\'s core service is helping you book your exam for less and handle the registration process.' },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button className="w-full py-4 flex items-start justify-between gap-4 text-left"
        onClick={() => setOpen(!open)}>
        <span className="text-[14px] font-semibold text-slate-900">{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />}
      </button>
      {open && (
        <p className="pb-4 text-sm text-slate-600 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl px-6">
          {FAQS.map(f => <FAQItem key={f.q} {...f} />)}
        </div>
      </div>
    </section>
  );
}
