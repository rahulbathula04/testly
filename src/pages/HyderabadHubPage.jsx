import React, { useEffect } from 'react';
import { MapPin, ArrowRight, CheckCircle2, Clock3, FileText, Navigation, Search, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { EXAM_DIRECTORY } from '../data/seo/geoData';
import { updatePageMeta, injectBreadcrumbSchema, injectFAQSchema } from '../utils/seoEngine';

const LOCAL_INTENTS = [
  { name: 'Madhapur & HITECH City', text: 'Useful for candidates working or studying around the western IT corridor. Check the exact provider venue and appointment before travelling.', anchor: 'Madhapur exam guide' },
  { name: 'Gachibowli & Kondapur', text: 'A major student and technology corridor. Compare the exam first, then confirm the current venue shown by the provider.', anchor: 'Gachibowli exam planning' },
  { name: 'Kukatpally & KPHB', text: 'A dense student area with access to the western Hyderabad education corridor and IELTS activity.', anchor: 'Kukatpally exam guide' },
  { name: 'Begumpet & Somajiguda', text: 'Central Hyderabad corridor with established international-exam and English-test activity.', anchor: 'Begumpet exam guide' },
  { name: 'Jubilee Hills & Banjara Hills', text: 'Useful for candidates looking for IELTS and other international-test information around central-west Hyderabad.', anchor: 'Jubilee Hills exam guide' },
  { name: 'Ameerpet & Secunderabad', text: 'Long-standing education and transit hubs. Always check the provider's current appointment list rather than relying on an old address.', anchor: 'Ameerpet exam planning' },
];

const EXAM_GUIDES = [
  { slug: 'gre', title: 'GRE in Hyderabad', intent: 'GRE registration, test locations, dates, ID requirements and booking planning.' },
  { slug: 'ielts', title: 'IELTS in Hyderabad', intent: 'IELTS Academic and General Training registration, locations, dates and documents.' },
  { slug: 'toefl', title: 'TOEFL in Hyderabad', intent: 'TOEFL iBT registration, location search, dates and test-day planning.' },
  { slug: 'pte', title: 'PTE in Hyderabad', intent: 'PTE Academic registration, availability, test-centre search and ID planning.' },
  { slug: 'gmat', title: 'GMAT in Hyderabad', intent: 'GMAT registration, test-centre appointments and exam-day preparation.' },
  { slug: 'sat', title: 'SAT in Hyderabad', intent: 'SAT registration, test-centre planning, dates and admission-test resources.' },
  { slug: 'duolingo', title: 'Duolingo English Test in Hyderabad', intent: 'DET information, eligibility, pricing checks and online-test planning.' },
];

export default function HyderabadHubPage({ onOpenBooking, onNavigate }) {
  useEffect(() => {
    updatePageMeta({
      title: 'Exams in Hyderabad: GRE, IELTS, TOEFL, PTE, GMAT & SAT | Testly',
      description: 'Hyderabad exam guide for GRE, IELTS, TOEFL, PTE, GMAT, SAT and Duolingo English Test. Compare registration steps, current fees, test-centre guidance, documents and local planning.',
      canonicalUrl: 'https://www.testly.co.in/locations/hyderabad'
    });
    injectBreadcrumbSchema([
      { name: 'Home', url: 'https://www.testly.co.in/' },
      { name: 'Locations', url: 'https://www.testly.co.in/locations' },
      { name: 'Hyderabad', url: 'https://www.testly.co.in/locations/hyderabad' }
    ]);
    injectFAQSchema([
      { question: 'Where can I take international exams in Hyderabad?', answer: 'Availability depends on the exam, provider, delivery mode and appointment date. Testly helps candidates understand the provider booking flow and points them to current official availability rather than maintaining a static centre list.' },
      { question: 'Which exams can I register for in Hyderabad?', answer: 'Testly provides planning and registration information for GRE, IELTS, TOEFL, PTE, GMAT, SAT and Duolingo English Test. Exact availability is controlled by the respective provider.' },
      { question: 'What should I check before booking an exam in Hyderabad?', answer: 'Check the exact exam version, current India fee, test date, venue, accepted identification, cancellation or rescheduling rules and score-reporting timeline before payment.' },
      { question: 'Does Testly operate the test centres in Hyderabad?', answer: 'No. Testly is an independent exam information and registration assistance service. Exam providers control their own test centres, appointments, policies and final charges.' }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col text-slate-900">
      <Navbar onOpenBooking={onOpenBooking} onNavigate={onNavigate} />
      <main className="flex-grow">
        <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500">
            <button onClick={() => onNavigate('/')} className="hover:text-slate-900">Home</button>
            <span className="mx-2">/</span>
            <button onClick={() => onNavigate('/locations')} className="hover:text-slate-900">Locations</button>
            <span className="mx-2">/</span>
            <span className="font-semibold text-slate-900">Hyderabad</span>
          </div>
        </nav>

        <section className="bg-white border-b border-slate-200 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                <MapPin className="w-4 h-4" /> Hyderabad, Telangana
              </div>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight">
                International exams in Hyderabad, explained clearly.
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
                A local planning hub for students and professionals comparing GRE, IELTS, TOEFL, PTE, GMAT, SAT and Duolingo English Test options in Hyderabad.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => onOpenBooking('GRE')} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white">
                  Check exam registration <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => onNavigate('/exams')} className="rounded-xl border border-slate-300 px-5 py-3.5 text-sm font-bold">
                  Compare exams in India
                </button>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-[#FAF9F6] p-5">
                <Search className="w-5 h-5 text-blue-700" />
                <h2 className="mt-3 font-bold">Find the right exam</h2>
                <p className="mt-2 text-sm text-slate-600">Start with the destination, university or purpose, then compare the exam that actually fits the requirement.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-[#FAF9F6] p-5">
                <FileText className="w-5 h-5 text-blue-700" />
                <h2 className="mt-3 font-bold">Check the current rules</h2>
                <p className="mt-2 text-sm text-slate-600">Fees, dates, identification, delivery modes and cancellation policies can change. Confirm them before payment.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-[#FAF9F6] p-5">
                <Navigation className="w-5 h-5 text-blue-700" />
                <h2 className="mt-3 font-bold">Plan the Hyderabad visit</h2>
                <p className="mt-2 text-sm text-slate-600">Use the provider's current appointment result for the exact venue and time. Do not rely on an old static centre address.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Hyderabad exam directory</span>
              <h2 className="mt-2 text-3xl font-serif">Every major international exam, one local starting point.</h2>
              <p className="mt-3 text-slate-600">Open the exam-specific Hyderabad guide for registration, fee checks, provider availability, ID requirements and test-day planning.</p>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {EXAM_GUIDES.map(exam => (
                <button key={exam.slug} onClick={() => onNavigate('/locations/hyderabad/' + exam.slug)} className="text-left rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-300">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold">{exam.title}</h3>
                    <ArrowRight className="w-4 h-4 shrink-0 mt-1" />
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{exam.intent}</p>
                  <span className="mt-4 inline-block text-xs font-bold text-blue-700">Open Hyderabad guide</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-700 mt-1" />
              <div>
                <h2 className="text-2xl font-bold">Hyderabad test-centre information: use live provider availability</h2>
                <p className="mt-3 max-w-4xl text-slate-600 leading-relaxed">
                  Centre inventories are not permanent. For example, IDP currently publishes Hyderabad IELTS locations including Begumpet, Kukatpally and Jubilee Hills, while GRE and GMAT appointment systems ask candidates to search by city and available dates. Testly therefore treats the provider's live result as the source of truth.
                </p>
              </div>
            </div>
            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                ['GRE', 'Search Hyderabad locations and dates through ETS.'],
                ['IELTS', 'Check the current Hyderabad locations and dates published by IDP.'],
                ['PTE', 'Use Pearson availability to find the nearest centre and next slot.'],
                ['GMAT', 'Search Hyderabad appointments inside the official GMAT registration flow.']
              ].map(([name, text]) => (
                <div key={name} className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-bold">{name} in Hyderabad</h3>
                  <p className="mt-2 text-sm text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Local search map</span>
            <h2 className="mt-2 text-3xl font-serif">Exam planning across Hyderabad's major student corridors</h2>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {LOCAL_INTENTS.map(area => (
                <div key={area.name} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="font-bold">{area.name}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{area.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-slate-500"><MapPin className="w-3 h-3" /> Local planning intent</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <Clock3 className="w-6 h-6 text-blue-300" />
              <h2 className="mt-4 text-3xl sm:text-4xl font-serif">The Hyderabad booking checklist</h2>
              <p className="mt-4 text-slate-300">Before you pay for any exam appointment, verify these six things.</p>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {['Correct exam and version', 'Current India fee and final payable amount', 'Exact Hyderabad venue and appointment time', 'Accepted identification and name format', 'Cancellation and rescheduling policy', 'Score-reporting timeline versus your application deadline'].map((item, i) => (
                <div key={item} className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
                  <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-300" /><span className="text-xs font-bold text-slate-400">0{i + 1}</span></div>
                  <p className="mt-3 font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold">Explore more Testly resources</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <button onClick={() => onNavigate('/exams')} className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold">All exams</button>
              <button onClick={() => onNavigate('/exam-fees')} className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold">India exam fees</button>
              <button onClick={() => onNavigate('/guides')} className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold">Exam guides</button>
              <button onClick={() => onNavigate('/locations')} className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold">Indian cities</button>
            </div>
          </div>
        </section>
      </main>
      <Footer onNavigate={onNavigate} onOpenAdmin={() => onNavigate('/admin')} />
    </div>
  );
}
