import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  TrendingDown,
  ShieldCheck,
  Calculator,
  ChevronRight,
  Info,
  Sparkles,
  CreditCard,
  Percent,
  Check
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ExamLogo } from '../components/ExamLogos';
import { EXAM_DATA } from '../components/PriceProof';

const CATEGORIES = [
  { id: 'ALL', label: 'All Exams' },
  { id: 'GRAD_MS', label: 'MS / Masters in USA & Global' },
  { id: 'MBA', label: 'MBA & Business Schools' },
  { id: 'ENGLISH', label: 'English Proficiency (Visa/Admit)' },
  { id: 'IMMIGRATION', label: 'Australia / Canada / UK PR' },
];

const EXAM_EXTENDED_DATA = {
  GRE: {
    ...EXAM_DATA.GRE,
    name: 'GRE® General Test',
    org: 'ETS (Educational Testing Service)',
    categories: ['GRAD_MS', 'MBA'],
    officialCurrency: 'USD 220 (~₹26,542 with Forex & GST)',
    voucherType: 'Institutional Prepaid Promotion Code',
    validity: 'Valid for test dates up to 12 months from booking',
    acceptedBy: 'Over 1,300+ business schools and thousands of graduate degree programs worldwide.',
    notes: 'Eliminates 3.5% foreign card conversion markup + banking charges.'
  },
  TOEFL: {
    ...EXAM_DATA.TOEFL,
    name: 'TOEFL iBT® Test',
    org: 'ETS (Educational Testing Service)',
    categories: ['GRAD_MS', 'ENGLISH'],
    officialCurrency: 'USD 205 (~₹17,999 in India)',
    voucherType: 'Official ETS Institutional Voucher',
    validity: 'Valid for test dates across India test centers & Home Edition',
    acceptedBy: '12,500+ universities in 160+ countries including USA, UK, Canada, Australia.',
    notes: 'Applies on official ets.org checkout to reduce balance to zero.'
  },
  IELTS: {
    ...EXAM_DATA.IELTS,
    name: 'IELTS Academic / General Training',
    org: 'IDP Education / British Council',
    categories: ['GRAD_MS', 'ENGLISH', 'IMMIGRATION'],
    officialCurrency: 'INR 17,000 flat',
    voucherType: 'Authorized Test Partner Code',
    validity: 'Direct registration voucher for computer-delivered & paper modes',
    acceptedBy: 'Primary English metric for UK, Australia, New Zealand and Canadian universities.',
    notes: 'Includes slot lock assistance in major Indian metro centers.'
  },
  PTE: {
    ...EXAM_DATA.PTE,
    name: 'PTE Academic / PTE Core',
    org: 'Pearson VUE',
    categories: ['GRAD_MS', 'ENGLISH', 'IMMIGRATION'],
    officialCurrency: 'INR 18,900 flat',
    voucherType: 'Pearson Authorized Prepaid Voucher',
    validity: 'Valid for all Pearson Professional test centers in India',
    acceptedBy: '100% accepted by Australian Department of Home Affairs, UK Visa & Immigration, and US colleges.',
    notes: 'Fastest score turnaround in 48 hours.'
  },
  Duolingo: {
    ...EXAM_DATA.Duolingo,
    name: 'Duolingo English Test (DET)',
    org: 'Duolingo Inc.',
    categories: ['GRAD_MS', 'ENGLISH'],
    officialCurrency: 'USD 65 (~₹5,800)',
    voucherType: 'Duolingo Official Test Credit Coupon',
    validity: 'Redeemable anytime within 21 days on englishtest.duolingo.com',
    acceptedBy: '5,000+ institutions worldwide including Columbia, Yale, NYU, and top US colleges.',
    notes: 'Includes fast score sharing to unlimited universities free of charge.'
  },
  GMAT: {
    ...EXAM_DATA.GMAT,
    name: 'GMAT™ Focus Edition',
    org: 'GMAC (Graduate Management Admission Council)',
    categories: ['MBA'],
    officialCurrency: 'USD 300 (~₹28,000 with Forex & GST)',
    voucherType: 'GMAC Official Candidate Voucher',
    validity: 'Valid for test centers & Online proctored exam appointments',
    acceptedBy: 'Gold standard for top-tier MBA programs: Harvard, Stanford, Wharton, INSEAD, ISB Hyderabad.',
    notes: 'Substantial savings on premier management admission test.'
  }
};

export default function ExamPriceTrackerPage({ onOpenBooking, onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [comboExams, setComboExams] = useState(['GRE', 'TOEFL']);

  useEffect(() => {
    document.title = "Official Exam Fees in India & Discount Voucher Tracker (2026) | Testly";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Compare 2026 official fees for GRE, TOEFL, IELTS, PTE, Duolingo, and GMAT in India. Calculate exact voucher savings up to ₹7,500 per exam with Testly official registration.'
      );
    }
  }, []);

  const allExams = Object.values(EXAM_EXTENDED_DATA);

  const filteredExams = selectedCategory === 'ALL'
    ? allExams
    : allExams.filter(e => e.categories.includes(selectedCategory));

  // Calculator logic
  const toggleComboExam = (id) => {
    if (comboExams.includes(id)) {
      if (comboExams.length > 1) {
        setComboExams(comboExams.filter(x => x !== id));
      }
    } else {
      setComboExams([...comboExams, id]);
    }
  };

  const comboTotalRegular = comboExams.reduce((sum, id) => sum + (EXAM_EXTENDED_DATA[id]?.refPrice || 0), 0);
  const comboTotalTestly = comboExams.reduce((sum, id) => sum + (EXAM_EXTENDED_DATA[id]?.testlyPrice || 0), 0);
  const comboTotalSavings = comboTotalRegular - comboTotalTestly;

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-sans antialiased text-[#0F172A]">
      <Navbar onOpenBooking={onOpenBooking} onNavigate={onNavigate} />

      {/* ── Breadcrumb ── */}
      <nav aria-label="Breadcrumb" className="bg-[#FAF9F6] border-b border-[#E5E7EB] py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-[#64748B]">
          <button onClick={() => onNavigate('/')} className="hover:text-[#0F172A] transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span className="text-[#0F172A] font-bold">Exam Fees & Voucher Tracker (India 2026)</span>
        </div>
      </nav>

      <main className="flex-grow">

        {/* ── 1. Header & Authority Intro ── */}
        <section className="relative bg-gradient-to-b from-white via-[#FAF9F6] to-[#FAF9F6] py-14 lg:py-20 border-b border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                <span>Live Indian Rupee (INR) Fee Index • Updated September 2026</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif text-[#0F172A] tracking-tight leading-[1.1]">
                Official Exam Fees in India <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6]">
                  & Verified Voucher Savings Tracker
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                Why pay full international portal fees when booking your study-abroad or immigration tests? Compare official standard test fees against Testly corporate discount vouchers. Save up to <strong className="text-slate-900 font-bold">₹7,500 per test</strong> with zero forex markups.
              </p>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-xs text-slate-500 font-medium">Max Single Saving</p>
                <p className="text-2xl font-black text-slate-900 mt-1">₹7,500</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">On GRE General Test</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-xs text-slate-500 font-medium">Forex Markup Saved</p>
                <p className="text-2xl font-black text-slate-900 mt-1">3.5% + GST</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Direct INR billing via UPI/Netbanking</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-xs text-slate-500 font-medium">Onboarding Fee</p>
                <p className="text-2xl font-black text-slate-900 mt-1">₹199 Flat</p>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Includes full passport audit</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-xs text-slate-500 font-medium">Voucher Legitimacy</p>
                <p className="text-2xl font-black text-emerald-600 mt-1">100% Official</p>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Redeemable on official portals</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Interactive Multi-Exam Combo Calculator ── */}
        <section className="py-14 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/80 pb-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold mb-2">
                    <Calculator className="w-3.5 h-3.5 text-blue-400" />
                    <span>Real-Time Savings Estimator</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                    Study Abroad Multi-Exam Combo Calculator
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                    Select the tests you are planning to take (e.g. GRE + TOEFL or GMAT + PTE) to see your cumulative savings.
                  </p>
                </div>
              </div>

              {/* Exam Selector Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {allExams.map((exam) => {
                  const isSelected = comboExams.includes(exam.id);
                  return (
                    <button
                      key={exam.id}
                      onClick={() => toggleComboExam(exam.id)}
                      className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-blue-600/20 border-blue-400 text-white shadow-md'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white">{exam.label}</span>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <div className="mt-3">
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">You Save</p>
                        <p className="text-sm font-black text-emerald-400">₹{exam.saving.toLocaleString('en-IN')}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Computed Totals */}
              <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Standard Retail Price</p>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-400 line-through mt-1">
                      ₹{comboTotalRegular.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Testly Voucher Price</p>
                    <p className="text-2xl sm:text-3xl font-black text-white mt-1">
                      ₹{comboTotalTestly.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-emerald-400 uppercase font-bold tracking-wider">Your Guaranteed Savings</p>
                    <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                      ₹{comboTotalSavings.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenBooking(comboExams[0] || 'GRE')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-7 py-4 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Lock Combo Savings of ₹{comboTotalSavings.toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Filterable Master Fee Table ── */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Complete India Exam Pricing Matrix
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Filter by your academic or career goal to inspect exact voucher breakdowns
                </p>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Cards for Each Exam */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((exam) => {
                const regularPrice = `₹${exam.refPrice.toLocaleString('en-IN')}`;
                const testlyPrice = `₹${exam.testlyPrice.toLocaleString('en-IN')}`;
                const saving = `₹${exam.saving.toLocaleString('en-IN')}`;

                return (
                  <div
                    key={exam.id}
                    className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      {/* Top Header */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="h-8 flex items-center">
                          <ExamLogo examId={exam.id} className="h-7" />
                        </div>
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black px-2.5 py-1 rounded-lg">
                          Save {saving}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-slate-900">{exam.name}</h3>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">Administered by {exam.org}</p>
                      </div>

                      {/* Pricing Comparison Box */}
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500 font-medium">Standard Official Fee:</span>
                          <span className="text-slate-400 font-semibold line-through">{regularPrice}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-slate-700">Testly Discount Voucher:</span>
                          <span className="text-sm font-bold text-slate-900">{testlyPrice}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                          <span>Professional Service Fee:</span>
                          <span>₹199</span>
                        </div>
                        <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">Total Out-of-Pocket:</span>
                          <span className="text-base font-black text-slate-900">
                            ₹{(exam.testlyPrice + 199).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Details & Features */}
                      <div className="space-y-2 text-xs text-slate-600">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>Voucher Type:</strong> {exam.voucherType}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>Validity:</strong> {exam.validity}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>Benefit:</strong> {exam.notes}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenBooking(exam.id)}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>Claim {exam.id} Voucher & Assistance</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 4. The Forex & Conversion Markup Advantage ── */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
                Financial Transparency
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                The Hidden Costs of Direct Credit Card Booking in India
              </h2>
              <p className="text-sm text-slate-600 font-medium mt-1">
                When students register on US websites using Indian credit or debit cards, banks levy hidden charges that silently inflate the exam cost.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">3.5% + GST Forex Markups</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Indian credit cards charge a foreign currency transaction markup of 3.5% on USD bills (GRE $220, TOEFL $205, GMAT $300), plus an extra 18% GST on the fee itself.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Percent className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Dynamic Currency Conversion (DCC)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If the international portal shows INR at checkout, international payment gateways frequently add a 5% to 7% DCC spread, quietly overcharging Indian students.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">The Testly INR Flat Advantage</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Testly issues official prepaid institutional vouchers billed cleanly in INR via UPI, NetBanking, or domestic cards. Zero foreign exchange loss, zero surprises.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. Pricing & Voucher FAQ ── */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Exam Fees & Voucher FAQ
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Clear answers regarding legitimacy, validity, and voucher activation
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900">Are these vouchers 100% genuine and official?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Yes, absolutely. Testly procures corporate and institutional voucher allotments directly through authorized channels. Every voucher is a single-use alphanumeric code that you or our specialist enters directly on the official ETS, Pearson, IDP, or GMAC checkout portal.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900">What is the ₹199 professional service charge?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The ₹199 professional fee covers one-on-one human registration assistance: a zero-defect passport name audit, test-center slot selection guidance, official profile setup, and voucher redemption verification.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900">How long is the voucher valid once purchased?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All our exam vouchers carry a minimum validity of 90 days to 12 months from the date of issuance, giving you ample flexibility to choose your ideal test slot.
                </p>
              </div>
            </div>

            <div className="pt-4 text-center">
              <button
                onClick={() => onOpenBooking('GRE')}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all"
              >
                <span>Claim Your Exam Discount Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer onOpenAdmin={() => onNavigate('/admin')} onNavigate={onNavigate} />
    </div>
  );
}
