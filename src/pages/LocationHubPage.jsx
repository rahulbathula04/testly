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
import { getLocationById, ALL_LOCATIONS_LIST } from '../data/seo/locationsData';
import { EXAM_DATA } from '../components/PriceProof';
import { injectLocalBusinessSchema, injectBreadcrumbSchema, injectFAQSchema, updatePageMeta } from '../utils/seoEngine';

export default function LocationHubPage({ city = 'bengaluru', onOpenBooking, onNavigate }) {
  const loc = getLocationById(city) || ALL_LOCATIONS_LIST[1]; // default to Bengaluru

  useEffect(() => {
    const title = `Official Exam Registration & Discounted Vouchers in ${loc.name} | Testly`;
    const desc = `Book GRE, TOEFL, IELTS & PTE in ${loc.name}, ${loc.state} with official discounted vouchers. Save up to ₹7,500 on test fees with zero-defect passport name audit for ${loc.studentDemographics.slice(0, 100)}...`;
    
    updatePageMeta({
      title,
      description: desc,
      canonicalUrl: `https://www.testly.co.in/locations/${loc.id}`
    });

    injectLocalBusinessSchema(loc);
    injectBreadcrumbSchema([
      { name: 'Home', url: 'https://www.testly.co.in/' },
      { name: 'Locations', url: 'https://www.testly.co.in/locations' },
      { name: loc.name, url: `https://www.testly.co.in/locations/${loc.id}` }
    ]);

    injectFAQSchema([
      {
        question: `Where are the official GRE and TOEFL test centers located in ${loc.name}?`,
        answer: loc.testVenues.find(v => v.exams.includes('GRE'))
          ? `${loc.testVenues.find(v => v.exams.includes('GRE')).name} located at ${loc.testVenues.find(v => v.exams.includes('GRE')).address}.`
          : `Official Prometric and Pearson centers are operating in ${loc.name}.`
      },
      {
        question: `How much can students in ${loc.name} save on GRE and TOEFL registration through Testly?`,
        answer: 'Candidates save up to ₹7,500 on official exam fees by utilizing Testly institutional prepaid promotional vouchers without international credit card markup.'
      },
      {
        question: `What is the most common passport name mistake made by candidates in ${loc.state}?`,
        answer: loc.passportQuirks
      }
    ]);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [loc]);

  const exams = Object.values(EXAM_DATA);

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-sans antialiased text-[#0F172A]">
      <Navbar onOpenBooking={onOpenBooking} onNavigate={onNavigate} />

      {/* ── Breadcrumb Bar ── */}
      <nav aria-label="Breadcrumb" className="bg-[#FAF9F6] border-b border-[#E5E7EB] py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-[#64748B]">
          <button onClick={() => onNavigate('/')} className="hover:text-[#0F172A] transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span className="text-[#64748B]">Locations</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span className="text-[#0F172A] font-bold">{loc.name}</span>
        </div>
      </nav>

      <main className="flex-grow">
        
        {/* ── 1. Hero Section ── */}
        <section className="relative bg-gradient-to-b from-white via-[#FAF9F6] to-[#FAF9F6] py-14 lg:py-20 border-b border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{loc.name} Candidate Advisory Hub • {loc.state}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#0F172A] leading-[1.05] tracking-tight">
                  Exam Registration & Discounted Vouchers in {loc.name}.
                </h1>

                <p className="text-lg text-slate-600 font-medium leading-relaxed">
                  Why pay full retail prices in foreign currency? Testly helps {loc.name} students save up to <strong>₹7,500 on GRE, TOEFL, IELTS & PTE</strong>, with zero-defect passport name verification for just <strong>₹199</strong>.
                </p>

                {/* Local Specific Insight Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-start gap-3 shadow-xs">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold uppercase text-slate-900">Regional Passport Audit</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{loc.passportQuirks}</p>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-start gap-3 shadow-xs">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold uppercase text-slate-900">Official Test Centers</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Verified slots at Prometric and Pearson venues across {loc.name}.</p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => onOpenBooking('GRE')}
                    className="bg-slate-900 hover:bg-[#1E3A8A] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Check {loc.name} Exam Savings</span>
                    <ArrowRight className="w-4 h-4 text-blue-400" />
                  </button>

                  <button
                    onClick={() => onNavigate('/gre')}
                    className="border border-slate-300 hover:border-slate-500 text-slate-700 font-bold text-sm px-5 py-3.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Take Free GRE Diagnostic →
                  </button>
                </div>
              </div>

              {/* Right Side: Localized Trust Box */}
              <div className="lg:col-span-5 bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-lg">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-mono font-bold uppercase text-blue-700 tracking-wider">
                    LOCAL ADVISORY DESK
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                    {loc.name} Candidate Helpdesk
                  </h3>
                </div>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{loc.deskAddress}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>Helpline: <strong className="text-slate-900">{loc.helpline}</strong></span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>Transit: {loc.metroConnectivity}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                  <span className="font-bold text-slate-900 block">Candidate Profile:</span>
                  <p className="text-slate-600 leading-relaxed">{loc.studentDemographics}</p>
                </div>

                <div className="pt-2">
                  <a
                    href={`https://wa.me/919347379041?text=Hi%20Testly!%20I%20am%20from%20${encodeURIComponent(loc.name)}%20and%20need%20help%20with%20exam%20booking.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp VIP Desk ({loc.name})</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 2. Verified Test Venues in this City ── */}
        <section className="py-14 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-[#1E3A8A]">
                VERIFIED TESTING VENUES
              </span>
              <h2
                style={{ fontFamily: "'DM Serif Display', serif" }}
                className="text-2xl sm:text-3xl font-black text-slate-900 mt-1"
              >
                Official Test Centers in {loc.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                We monitor slot patterns and operational logistics for all authorized venues.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loc.testVenues.map((venue, idx) => (
                <div
                  key={venue.code || idx}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2 hover:border-[#1E3A8A] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm">{venue.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                      {venue.exams.join(', ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{venue.address}</span>
                  </p>
                  <p className="text-xs text-slate-700 pt-1 border-t border-slate-200/60 leading-relaxed italic">
                    Note: {venue.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Discount Voucher Savings Matrix ── */}
        <section className="py-14 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-emerald-700">
                  OFFICIAL INSTITUTIONAL FEE SCHEDULE
                </span>
                <h2
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                  className="text-2xl sm:text-3xl font-black text-slate-900 mt-1"
                >
                  Today's Discount Voucher Prices in {loc.name}
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-mono">Verified September 2026</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {exams.map((ex) => (
                <div
                  key={ex.name}
                  className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 hover:border-[#1E3A8A] transition-all shadow-xs"
                >
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{ex.category}</span>
                    <h3 className="text-xl font-black text-slate-900">{ex.name}</h3>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-900 font-mono">₹{ex.testlyPrice.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-slate-400 line-through font-mono">₹{ex.officialFeeINR.toLocaleString('en-IN')}</span>
                    </div>
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                      Save ₹{ex.savings.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenBooking(ex.name)}
                    className="w-full bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
                  >
                    Claim Voucher
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer
        onOpenAdmin={() => onNavigate('/admin')}
        onNavigate={onNavigate}
        onOpenAgreement={() => {}}
      />
    </div>
  );
}
