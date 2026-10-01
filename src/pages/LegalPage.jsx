import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { updatePageMeta, injectBreadcrumbSchema } from '../utils/seoEngine';

const SECTIONS = [
  ['terms','Terms of Service',[
    'Testly provides exam information, planning and registration assistance. Testly does not own, operate or control third-party examination bodies, test centres, appointment inventory, examination rules, score decisions or admission decisions.',
    'Where a candidate is redirected to or assisted through an official provider flow, the provider remains responsible for the examination booking, applicable examination fee, appointment, cancellation and rescheduling rules, and test result.',
    'Fees, dates, venues, eligibility and policies can change. Candidates should verify the final payable amount and appointment details with the relevant provider before payment.'
  ]],
  ['privacy','Privacy Policy',[
    'Testly may collect information voluntarily provided through registration, enquiries, assessments or support requests to provide the requested service, communicate about the request and maintain service records.',
    'Testly should collect only information reasonably required for the stated purpose, restrict access to authorised personnel and retain information only as long as necessary for legitimate operational, legal or contractual requirements.',
    'Candidates may contact Testly through the published support channel to ask about their personal information, request correction of inaccurate information, or raise a privacy concern.'
  ]],
  ['refunds','Refund and Cancellation Policy',[
    'Refund eligibility depends on what the candidate purchased and whether the amount was paid to Testly or directly to an examination provider.',
    'A provider examination fee is governed by that provider’s current cancellation, rescheduling and refund rules. Testly does not represent that a provider fee is refundable unless the provider’s applicable policy permits it.',
    'Any Testly service fee, where applicable, is subject to the terms shown before payment. The final checkout or invoice should be treated as the controlling commercial record.'
  ]],
  ['disclaimer','Exam Information Disclaimer',[
    'Testly is an independent information and registration assistance service unless a specific relationship is expressly stated and can be verified from the relevant provider.',
    'Testly does not claim to be an examination authority, test-centre operator, government department, university admissions office or trademark owner of GRE, GMAT, IELTS, TOEFL, PTE, SAT, Duolingo English Test or other third-party examinations.',
    'References to examination names and trademarks are for identification and informational purposes. Third-party marks remain the property of their respective owners.',
    'No page should be interpreted as a guarantee of admission, score, appointment availability, visa outcome, scholarship, employment outcome or examination result.'
  ]],
  ['local','Hyderabad and Local Search Accuracy',[
    'Testly’s Hyderabad pages are local planning guides. A Hyderabad page does not mean that Testly operates the test centre mentioned by a provider.',
    'Venue lists, fees and appointment availability are time-sensitive. Testly will prefer current provider information and show verification dates where practical rather than presenting old centre addresses as permanent facts.',
    'Candidates should confirm the exact venue, date, delivery mode, identification requirements and final payable amount before travelling or paying.'
  ]]
];

export default function LegalPage({ section = 'disclaimer', onNavigate }) {
  const active = SECTIONS.find(item => item[0] === section) || SECTIONS[3];

  useEffect(() => {
    updatePageMeta({
      title: active[1] + ' | Testly',
      description: 'Testly legal terms, privacy, refund, disclaimer and local exam-information accuracy guidance.',
      canonicalUrl: 'https://www.testly.co.in/legal/' + active[0]
    });
    injectBreadcrumbSchema([
      { name: 'Home', url: 'https://www.testly.co.in/' },
      { name: 'Legal', url: 'https://www.testly.co.in/legal/disclaimer' },
      { name: active[1], url: 'https://www.testly.co.in/legal/' + active[0] }
    ]);
  }, [active]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 flex flex-col">
      <Navbar onNavigate={onNavigate} />
      <main className="flex-grow">
        <section className="bg-white border-b border-slate-200 py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Testly legal centre</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-serif tracking-tight">{active[1]}</h1>
            <p className="mt-4 text-slate-600">Clear separation between Testly services and third-party examination providers.</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {SECTIONS.map(item => (
                <button key={item[0]} onClick={() => onNavigate('/legal/' + item[0])} className={'rounded-xl border px-4 py-2.5 text-sm font-bold ' + (item[0] === active[0] ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 bg-white')}>
                  {item[1]}
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Last reviewed: October 2026</p>
              <div className="mt-7 space-y-6">
                {active[2].map((paragraph,index) => <p key={index} className="text-base sm:text-lg text-slate-700 leading-8">{paragraph}</p>)}
              </div>
              <div className="mt-10 rounded-2xl bg-slate-50 border border-slate-200 p-5">
                <h2 className="font-bold">Need clarification?</h2>
                <p className="mt-2 text-sm text-slate-600">Use the published Testly support channel and keep your order, invoice or booking reference when requesting support.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer onNavigate={onNavigate} onOpenAdmin={() => onNavigate('/admin')} />
    </div>
  );
}
