import React, { useEffect } from 'react';
import {
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Phone,
  MessageCircle,
  Building2,
  Calendar,
  AlertCircle,
  Award,
  Users,
  ChevronRight,
  Navigation,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ExamLogo } from '../components/ExamLogos';
import { EXAM_DATA } from '../components/PriceProof';

const PROMETRIC_MADHAPUR_GUIDE = [
  {
    step: '1',
    title: 'Arrival Timing & Reporting',
    detail: 'Arrive at Prometric Madhapur 45 minutes prior to appointment. Reporting closes strictly 15 minutes before test time.'
  },
  {
    step: '2',
    title: 'Physical Passport Verification',
    detail: 'Original, valid, unexpired Indian Passport is the ONLY accepted ID. Aadhaar, PAN, voter cards, and photocopies are immediately rejected by ETS staff.'
  },
  {
    step: '3',
    title: 'Lockers & Permitted Items',
    detail: 'Digital lockers provided free on-site. Mobile phones, smart watches, notes, and study material must be locked away prior to security check-in.'
  },
  {
    step: '4',
    title: 'Biometrics & Security Screening',
    detail: 'Digital signature, palm vein/fingerprint scanning, and metal detector wanding are conducted prior to entering the computerized cubicle.'
  }
];

const LOCAL_TEST_TAKER_TESTIMONIALS = [
  {
    name: 'Sai Krishna K.',
    avatar: '/assets/images/student-avatar-1.jpg',
    college: 'VNR VJIET (B.Tech CSE)',
    exam: 'GRE General Test',
    score: '324 / 340',
    venue: 'Prometric Madhapur',
    saved: '₹7,500',
    quote: 'I had an issue where my passport had only a Given Name and blank Surname. The Testly team corrected my ETS profile formatting before booking, saving me from being denied entry at Prometric Madhapur.'
  },
  {
    name: 'Ananya Reddy',
    avatar: '/assets/images/student-avatar-sneha.jpg',
    college: 'CBIT Gandipet',
    exam: 'TOEFL iBT',
    score: '109 / 120',
    venue: 'Prometric Madhapur',
    saved: '₹6,400',
    quote: 'Got the discounted voucher code in 15 minutes on WhatsApp. Testly verified my booking on the official ETS portal. Walked into Prometric Madhapur with zero stress.'
  },
  {
    name: 'Vivek Sharma',
    avatar: '/assets/images/student-avatar-3.jpg',
    college: 'Tech Professional @ Mindspace',
    exam: 'PTE Academic',
    score: '84 / 90',
    venue: 'Pearson Hitech City',
    saved: '₹4,500',
    quote: 'Needed a weekend slot near Cyber Towers for Australia PR. The Testly team found an open seat, applied the voucher, and gave me clear test-day instructions.'
  }
];

export default function MadhapurHubPage({ onOpenBooking, onNavigate }) {
  useEffect(() => {
    document.title = "GRE, TOEFL & PTE Exam Registration in Madhapur, Hyderabad | Testly Walk-in Support";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Book official GRE, TOEFL, PTE & IELTS vouchers in Madhapur, Hyderabad. Save up to ₹7,500 with ₹199 passport name audits right next to Cyber Towers & Prometric Test Center.'
      );
    }
  }, []);

  const exams = Object.values(EXAM_DATA);

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-sans antialiased text-[#0F172A]">
      <Navbar onOpenBooking={onOpenBooking} onNavigate={onNavigate} />

      {/* ── Breadcrumbs ── */}
      <nav aria-label="Breadcrumb" className="bg-[#FAF9F6] border-b border-[#E5E7EB] py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-[#64748B]">
          <button onClick={() => onNavigate('/')} className="hover:text-[#0F172A] transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
          <button onClick={() => onNavigate('/locations/hyderabad')} className="hover:text-[#0F172A] transition-colors">
            Hyderabad
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span className="text-[#0F172A] font-bold">Madhapur & Cyber Towers Hub</span>
        </div>
      </nav>

      <main className="flex-grow">

        {/* ── 1. Hero: Madhapur Focus ── */}
        <section className="relative bg-gradient-to-b from-white via-[#FAF9F6] to-[#FAF9F6] py-14 lg:py-20 border-b border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#EBF3FF] border border-blue-200/80 text-[#1E3A8A] px-3 py-1 rounded-full text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>Prometric Center Corridor • Cyber Towers & Hitech City</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-serif text-[#0F172A] tracking-tight leading-[1.1]">
                  Madhapur Exam Registration <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6]">
                    & Official Discount Vouchers
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                  Taking your exam at <strong className="text-slate-900 font-bold">Prometric Madhapur</strong> or <strong className="text-slate-900 font-bold">Pearson Hitech City</strong>? Don't pay full retail price. Testly provides discounted official exam vouchers, ₹199 passport name audits, and pre-test slot verification just minutes from your test venue.
                </p>

                {/* Key Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Immediate Prometric Proximity</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Assistance right on Hitech City Road near Cyber Towers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Up to ₹7,500 Exam Savings</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Authorized corporate vouchers for GRE, TOEFL, PTE & IELTS</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Zero-Defect Passport Audit</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Eliminates 100% of test-day identity denial risks</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Rapid WhatsApp Response</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Dedicated Telangana advisory desk for slot inquiries</p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => onOpenBooking('GRE')}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md hover:shadow-lg"
                  >
                    Check Madhapur Voucher Pricing
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="https://wa.me/919347379041?text=Hi%20Testly%2C%20I%20am%20taking%20my%20exam%20in%20Madhapur%2C%20Hyderabad.%20Need%20voucher%20pricing%20and%20assistance."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3.5 rounded-xl text-sm transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Madhapur Desk
                  </a>
                </div>
              </div>

              {/* Walk-in Desk Info Card */}
              <div className="lg:col-span-5">
                <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-5 h-5 text-blue-400" />
                      <h2 className="text-base font-bold tracking-tight">Madhapur Support Desk</h2>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      Open Today
                    </span>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <p className="text-slate-400 font-medium">Physical Location & Corridor</p>
                      <p className="text-slate-100 font-semibold text-sm mt-0.5">
                        Plot 42, Cyber Hills Corridor, Near Durgam Cheruvu Metro & Cyber Towers
                      </p>
                      <p className="text-slate-400 mt-0.5">Madhapur, Hyderabad, Telangana 500081</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/50">
                        <div className="flex items-center gap-1.5 text-slate-400 font-medium mb-1">
                          <Clock className="w-3.5 h-3.5 text-blue-400" />
                          <span>Desk Hours</span>
                        </div>
                        <p className="text-slate-200 font-bold text-xs">9:30 AM – 7:30 PM</p>
                        <p className="text-[10px] text-slate-400">Monday to Saturday</p>
                      </div>

                      <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/50">
                        <div className="flex items-center gap-1.5 text-slate-400 font-medium mb-1">
                          <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Prometric Dist.</span>
                        </div>
                        <p className="text-slate-200 font-bold text-xs">3 Mins Away</p>
                        <p className="text-[10px] text-slate-400">Walking from Metro</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                        <span className="font-semibold">+91 93473 79041</span>
                        <span className="text-[10px] text-slate-400">(Direct Helpline)</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Walk-in Passport Audit available anytime</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenBooking('GRE')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Request In-Person or Online Registration</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 2. Prometric Madhapur Test-Day Protocol ── */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
                Test Center Intelligence
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                Prometric Testing Center Madhapur: Essential Test-Day Guide
              </h2>
              <p className="text-sm text-slate-600 font-medium mt-1">
                The Prometric Center on Hitech City Road administers GRE and TOEFL iBT for hundreds of Hyderabad students every month. Here is what you need to know before stepping inside.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {PROMETRIC_MADHAPUR_GUIDE.map((g) => (
                <div key={g.step} className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                    {g.step}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{g.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{g.detail}</p>
                </div>
              ))}
            </div>

            {/* Crucial Passport Warning Box */}
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Warning: Prometric strictly enforces exact Passport name matching</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                  In Hyderabad and Andhra Pradesh, hundreds of candidates face last-minute entry denial because their passport has a split name, initials, or no surname recorded. Testly provides a comprehensive <strong>₹199 Passport & Profile Pre-Check</strong> to guarantee you enter without rejection.
                </p>
              </div>
              <button
                onClick={() => onOpenBooking('GRE')}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 py-3 rounded-xl whitespace-nowrap shrink-0 transition-colors"
              >
                Get ₹199 Passport Check →
              </button>
            </div>
          </div>
        </section>

        {/* ── 3. Live Madhapur Voucher Pricing Table ── */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Official Exam Savings</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                  Madhapur Candidate Voucher Fee Schedule
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Valid for test dates at Prometric Madhapur, Pearson Begumpet, and IDP Somajiguda
                </p>
              </div>
              <div className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shrink-0">
                Verified: September 2026 • 100% Official
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {exams.map((exam) => {
                const regularPrice = `₹${exam.refPrice.toLocaleString('en-IN')}`;
                const testlyPrice = `₹${exam.testlyPrice.toLocaleString('en-IN')}`;
                const saving = `₹${exam.saving.toLocaleString('en-IN')}`;

                return (
                  <div
                    key={exam.id}
                    className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="h-7 flex items-center">
                          <ExamLogo examId={exam.id} className="h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Save {saving}
                        </span>
                      </div>

                      <div className="pt-2">
                        <p className="text-[11px] text-slate-400 font-medium">Standard Test Center Price</p>
                        <p className="text-sm font-semibold text-slate-400 line-through">{regularPrice}</p>
                      </div>

                      <div>
                        <p className="text-[11px] text-slate-500 font-semibold">Testly Voucher Price</p>
                        <p className="text-2xl font-black text-slate-900 tracking-tight">{testlyPrice}</p>
                      </div>

                      <p className="text-[11px] text-slate-500 font-medium">
                        Includes official exam voucher code + ₹199 candidate onboarding & slot guidance.
                      </p>
                    </div>

                    <button
                      onClick={() => onOpenBooking(exam.id)}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Claim {exam.id} Voucher</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 4. Student Reviews from Madhapur & Tech Institutions ── */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">E-E-A-T Verified Trust</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Trusted by 4,000+ Hyderabad Students & Techies
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Real feedback from candidates who registered and saved on their test vouchers in Madhapur and Hitech City.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {LOCAL_TEST_TAKER_TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{t.exam}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Saved {t.saved}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 font-medium leading-relaxed italic">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs ring-1 ring-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900">{t.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{t.college}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Scored: <strong className="text-slate-700">{t.score}</strong> • Venue: {t.venue}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Local FAQ for Madhapur Test-Takers ── */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Madhapur Test Center & Voucher FAQ
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Common questions from candidates booking exams near Cyber Towers and Hitech City
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900">How do I redeem my Testly voucher at Prometric Madhapur?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  When you book your test on the official ETS portal (for GRE or TOEFL), you select "Prometric Testing Center Madhapur" as your test center and date. On the checkout payment screen, enter the voucher code provided by Testly. The fee will instantly reduce to ₹0.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900">Can I walk into your Madhapur desk for passport verification?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Yes! You can walk in during desk hours (9:30 AM – 7:30 PM, Mon-Sat) or simply WhatsApp our Hyderabad desk. We inspect your passport spelling against your ETS or Pearson account to ensure zero mismatches.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900">Are slots available on weekends at Prometric Madhapur?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Prometric Madhapur weekend slots fill up 3 to 4 weeks in advance during peak fall application season (August through December). Testly tracks slot openings daily and alerts candidates when premium weekend dates open.
                </p>
              </div>
            </div>

            <div className="pt-4 text-center">
              <button
                onClick={() => onOpenBooking('GRE')}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all"
              >
                <span>Book Your Exam in Madhapur Now</span>
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
