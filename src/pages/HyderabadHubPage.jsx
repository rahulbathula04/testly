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
  ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ExamLogo } from '../components/ExamLogos';
import { EXAM_DATA } from '../components/PriceProof';

const HYDERABAD_CENTERS = [
  {
    name: 'Prometric Testing Center (Madhapur)',
    exams: 'GRE, TOEFL iBT',
    area: 'Madhapur, Hitech City Road',
    landmark: 'Near Cyber Towers & Durgam Cheruvu Metro',
    notes: 'Primary ETS computerized testing venue in West Hyderabad. High demand for morning slots.'
  },
  {
    name: 'Pearson Professional Centers (Begumpet)',
    exams: 'PTE Academic, GMAT Focus Edition',
    area: 'Begumpet, Sardar Patel Road',
    landmark: 'Opposite Hyderabad Public School',
    notes: 'Official Pearson flagship facility with biometric verification and strict passport ID checks.'
  },
  {
    name: 'IDP IELTS Official Test Center',
    exams: 'IELTS Academic & General',
    area: 'Somajiguda / Begumpet',
    landmark: 'Raj Bhavan Road corridor',
    notes: 'Computer-delivered and paper-based IELTS sessions conducted weekly.'
  },
  {
    name: 'Pearson Test Center (Hitech City)',
    exams: 'PTE Academic',
    area: 'Hitech City, Kondapur Corridor',
    landmark: 'Near Mindspace IT Park',
    notes: 'Popular slot hub for engineering graduates and IT professionals planning Australia/UK immigration.'
  }
];

const LOCALITIES_SERVED = [
  'Madhapur', 'Hitech City', 'Gachibowli', 'Kondapur', 'Kukatpally',
  'Jubilee Hills', 'Banjara Hills', 'Begumpet', 'Ameerpet', 'Somajiguda',
  'Miyapur', 'Secunderabad', 'Dilsukhnagar', 'Narayanguda'
];

export default function HyderabadHubPage({ onOpenBooking, onNavigate }) {
  useEffect(() => {
    document.title = "Exam Registration & Discounted Vouchers in Hyderabad | Testly Local Support";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Book GRE, TOEFL, IELTS & PTE in Hyderabad for less. Save up to ₹7,500 on official fees with Testly. Walk-in & online support across Madhapur, Begumpet & Hitech City with ₹199 passport check.'
      );
    }
  }, []);

  const exams = Object.values(EXAM_DATA);

  return (
    <div className="min-h-screen bg-white flex flex-col font-[Inter,system-ui,sans-serif] antialiased text-slate-900">
      <Navbar onOpenBooking={onOpenBooking} onNavigate={onNavigate} />

      {/* ── Breadcrumb Bar ── */}
      <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-200 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button onClick={() => onNavigate('/')} className="hover:text-slate-900 transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">Locations</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Hyderabad</span>
        </div>
      </nav>

      <main className="flex-grow">

        {/* ── 1. Hero: Hyderabad Local Entity ── */}
        <section className="relative bg-gradient-to-b from-slate-50 to-white py-14 lg:py-20 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Hyderabad Local Candidate Support • Madhapur & Begumpet</span>
                </div>

                <h1
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight"
                >
                  Exam Registration & Discounted Vouchers in Hyderabad.
                </h1>

                <p className="text-lg text-slate-600 font-medium leading-relaxed">
                  Why pay full exam fees when you can book through official discounted vouchers? Testly helps Hyderabad students save up to <strong>₹7,500 on GRE, TOEFL, IELTS & PTE</strong>, with complete registration and passport name audit for just <strong>₹199</strong>.
                </p>

                {/* Key Local Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold uppercase text-slate-900">TS/AP Passport Name Audit</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">We check Given Name / Surname formatting before booking to avoid test-day rejection.</p>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold uppercase text-slate-900">Begumpet & Madhapur Concierge</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Assistance with Prometric Madhapur and Pearson Begumpet test date selection.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => onOpenBooking('GRE')}
                    className="bg-slate-900 hover:bg-slate-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center gap-2"
                  >
                    <span>Check Hyderabad Exam Savings</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate('/locations/madhapur')}
                    className="border border-slate-300 hover:border-slate-500 text-slate-700 font-bold text-sm px-5 py-3.5 rounded-xl transition-colors"
                  >
                    Visit Madhapur Support Desk →
                  </button>
                </div>
              </div>

              {/* Right: Hyderabad Local Office Snapshot */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Hyderabad Hub Summary</h3>
                    <p className="text-xs text-slate-500">Official Candidate Advisory Desk</p>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Active Desk
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">Primary Hyderabad Hubs</p>
                      <p className="text-slate-600">Madhapur (Opp. Cyber Towers) & Begumpet (SP Road Corridor)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">Advisory Desk Hours</p>
                      <p className="text-slate-600">Monday – Saturday: 9:30 AM – 7:00 PM IST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">Hyderabad Track Record</p>
                      <p className="text-slate-600">2,400+ local students assisted across JNTU, OU, CBIT, VNR, and GITAM.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">Done-For-You Registration</span>
                  <span className="text-2xl font-black text-slate-900">₹199 Only</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Voucher price separate. Zero registration hassle.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 2. Verified Hyderabad Exam Pricing Table ── */}
        <section className="py-14 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Verified Exam Fees & Testly Vouchers in Hyderabad
              </h2>
              <p className="text-sm text-slate-600">
                Official test prices for India vs. Testly discounted vouchers. Valid for computer-based testing at all Hyderabad test centers.
              </p>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-black">
                    <th className="py-3.5 px-4">Exam</th>
                    <th className="py-3.5 px-4">Regular Official Fee*</th>
                    <th className="py-3.5 px-4">Testly Voucher</th>
                    <th className="py-3.5 px-4">Your Net Saving</th>
                    <th className="py-3.5 px-4">Registration Service</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {exams.map((exam) => (
                    <tr key={exam.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <ExamLogo examId={exam.id} className="h-6" />
                        </div>
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-400 line-through">
                        ₹{exam.refPrice.toLocaleString('en-IN')}
                      </td>
                      <td className="py-4 px-4 font-black text-slate-900">
                        ₹{exam.testlyPrice.toLocaleString('en-IN')}
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block bg-amber-50 border border-amber-200 text-amber-900 font-extrabold text-xs px-2.5 py-1 rounded-md">
                          Save ₹{exam.saving.toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-medium text-slate-600">
                        ₹199 (Done for you)
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => onOpenBooking(exam.id)}
                          className="bg-slate-900 hover:bg-slate-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5"
                        >
                          <span>Claim Voucher</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-400">
              * Reference official exam fees verified for India test-takers as of September 2026. Official exam fees are charged by ETS, Pearson, IDP, and GMAC. Testly is an independent voucher procurement and registration service.
            </p>
          </div>
        </section>

        {/* ── 3. Hyderabad Test Centers Directory ── */}
        <section className="py-14 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Major International Exam Centers in Hyderabad
              </h2>
              <p className="text-sm text-slate-600">
                When you book through Testly, our advisors help you navigate slot availability across Hyderabad's authorized test venues.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HYDERABAD_CENTERS.map((center) => (
                <div key={center.name} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm hover:border-slate-400 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-black text-slate-900">{center.name}</h3>
                      <p className="text-xs font-semibold text-emerald-700 mt-0.5">{center.exams}</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      Authorized Venue
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1">
                    <p><strong className="text-slate-800">Location:</strong> {center.area}</p>
                    <p><strong className="text-slate-800">Landmark:</strong> {center.landmark}</p>
                  </div>

                  <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                    {center.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Passport & Name Legal Audit for Telangana / AP Candidates ── */}
        <section className="py-14 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900 text-white rounded-3xl p-8 lg:p-12 space-y-6">
              <div className="max-w-2xl space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Critical For Telangana & Andhra Pradesh Students
                </span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                  Avoid the "Single Name / Initial" Passport Rejection at Hyderabad Test Centers.
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Over 35% of exam day rejections at Prometric Madhapur and Pearson Begumpet happen because the student's Indian passport format does not match ETS or Pearson's mandatory Surname/Given Name structure.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 space-y-1.5">
                  <h3 className="text-xs font-black uppercase text-amber-400">01 — Split Surname Audit</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Indian passports often have empty surnames or full names lumped in Given Name. We audit and map this properly to the exam database.
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 space-y-1.5">
                  <h3 className="text-xs font-black uppercase text-amber-400">02 — No Expandable Initials</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    ETS & Pearson do not permit expanded initials unless exactly matched to the machine-readable zone (MRZ) of your passport.
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 space-y-1.5">
                  <h3 className="text-xs font-black uppercase text-amber-400">03 — Included in ₹199</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Our ₹199 Professional Service includes 1-on-1 verification of your passport bio-page before any voucher is redeemed or date locked.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenBooking('GRE')}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm px-6 py-3.5 rounded-xl transition-colors shadow-lg flex items-center gap-2"
                >
                  <span>Book with ₹199 Passport Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. Localities Covered in Hyderabad ── */}
        <section className="py-12 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
            <h3 className="text-lg font-black text-slate-900">
              Serving Students Across Greater Hyderabad
            </h3>
            <p className="text-xs text-slate-500 max-w-xl mx-auto">
              Our advisory team provides phone, WhatsApp, and in-person assistance across major student hubs:
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto pt-2">
              {LOCALITIES_SERVED.map((loc) => (
                <span
                  key={loc}
                  className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-2xs"
                >
                  {loc}
                </span>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer onOpenAdmin={() => onNavigate('/admin')} onNavigate={onNavigate} />
    </div>
  );
}
