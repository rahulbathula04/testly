import React, { useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle,
  Award,
  ChevronRight,
  FileCheck2,
  Clock,
  Sparkles,
  Users
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PROFESSIONALS = [
  {
    name: 'Rahul Bathula',
    role: 'Founder & Chief Exam Strategist',
    experience: '7+ Years Overseas Advisory',
    exams: ['GRE General Test', 'TOEFL iBT', 'GMAT Focus'],
    bio: 'Pioneered the Testly zero-defect candidate verification framework. Has directly assisted over 3,500 students with official registration, saving families lakhs in avoidable foreign exchange and card conversion markups while ensuring zero test-day turnaways.',
    achievements: [
      'Architected the ₹199 zero-defect passport name validation framework',
      'Over 3,500 candidates successfully registered without a single name mismatch rejection',
      'Direct liaison for official institutional exam voucher allocations'
    ],
    avatarInitial: 'RB',
    badge: 'Founder',
    image: '/assets/images/rahul-bathula-founder.jpg'
  },
  {
    name: 'Deepak Royal',
    role: 'Co-Founder & Head of Operations',
    experience: '6+ Years Exam Logistics & Verification',
    exams: ['PTE Academic', 'IELTS Academic & General', 'Pearson VUE & Prometric Logistics'],
    bio: 'Directs real-time candidate booking operations, slot tracking across Indian testing hubs, and ID compliance. Specializes in test venue protocols across Prometric and Pearson facilities, emergency slot recovery, and end-to-end candidate assistance.',
    achievements: [
      'Oversees live candidate booking execution across ETS, Pearson, and IDP',
      'Specialist in Indian Passport single-name, split-name, and expansion resolution',
      'Maintains Testly\'s 99.8% first-time test entry clearance rate'
    ],
    avatarInitial: 'DR',
    badge: 'Co-Founder',
    image: '/assets/images/deepak-royal-founder.jpg'
  }
];

export default function ProfessionalsPage({ onOpenBooking, onNavigate }) {
  useEffect(() => {
    document.title = "Meet the Founders & Registration Specialists | Testly";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Meet the leadership and verification team behind Testly. Every exam registration is audited character-by-character by our dedicated team in Hyderabad.'
      );
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-sans text-[#0F172A] selection:bg-[#EBF3FF] selection:text-[#1E3A8A]">
      <Navbar onOpenBooking={onOpenBooking} onNavigate={onNavigate} />

      {/* Breadcrumb Navigation */}
      <nav className="bg-[#FAF9F6] border-b border-[#E5E7EB] py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs font-semibold text-[#64748B]">
          <button onClick={() => onNavigate('/')} className="hover:text-[#0F172A] transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span className="text-[#0F172A] font-bold">Founding Leadership & Specialists</span>
        </div>
      </nav>

      <main className="flex-grow">

        {/* ── 1. Hero / E-E-A-T Statement ── */}
        <section className="relative bg-gradient-to-b from-white via-[#FAF9F6] to-[#FAF9F6] py-14 lg:py-20 border-b border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#EBF3FF] border border-blue-200/80 text-[#1E3A8A] px-3 py-1 rounded-full text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Founder-Led Registration Advisory</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif text-[#0F172A] tracking-tight leading-[1.1]">
                The Leadership & Team Behind <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6]">
                  Zero-Defect Exam Registration
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                Testly is not an anonymous automated website or an outsourced call center. Founded by <strong>Rahul Bathula</strong> and <strong>Deepak Royal</strong>, our candidate operations are managed by a dedicated specialist team in Hyderabad. Every candidate profile is collected, reviewed, and audited character-by-character before registration.
              </p>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                <p className="text-xs text-slate-500 font-medium">Students Assisted</p>
                <p className="text-3xl font-black text-slate-900">5,000+</p>
                <p className="text-[11px] text-blue-600 font-semibold">Across India & Telangana</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                <p className="text-xs text-slate-500 font-medium">Test-Day Success</p>
                <p className="text-3xl font-black text-emerald-600">99.8%</p>
                <p className="text-[11px] text-slate-500 font-semibold">Zero-defect entry rate</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                <p className="text-xs text-slate-500 font-medium">Total Student Savings</p>
                <p className="text-3xl font-black text-slate-900">₹2.4 Cr+</p>
                <p className="text-[11px] text-emerald-600 font-semibold">Saved on official fees</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                <p className="text-xs text-slate-500 font-medium">Founding Leadership</p>
                <p className="text-3xl font-black text-slate-900">2</p>
                <p className="text-[11px] text-slate-500 font-semibold">Direct founder oversight</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Team Member Dossiers ── */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Direct Accountability</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Meet the Founding Leadership
              </h2>
              <p className="text-sm text-slate-600 font-medium mt-1">
                When you register with Testly, your booking is audited and verified with strict zero-defect standards developed by our founders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROFESSIONALS.map((pro) => (
                <div
                  key={pro.name}
                  className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-sm"
                >
                  <div className="space-y-4">
                    {/* Header with Avatar and Role */}
                    <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-3 sm:gap-4">
                      <div className="flex items-center gap-3 sm:gap-3.5">
                        {pro.image ? (
                          <img
                            src={pro.image}
                            alt={pro.name}
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-2 ring-blue-600/20 shadow-md shrink-0"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          style={{ display: pro.image ? 'none' : 'flex' }}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1E3A8A] text-white font-black text-xl items-center justify-center shadow-md shrink-0"
                        >
                          {pro.avatarInitial}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900">{pro.name}</h3>
                            <span className="xs:hidden text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-slate-200 text-blue-900 shadow-xs">
                              {pro.badge}
                            </span>
                          </div>
                          <p className="text-xs text-blue-700 font-bold">{pro.role}</p>
                          <p className="text-[11px] text-slate-500 font-medium mt-0.5">{pro.experience}</p>
                        </div>
                      </div>
                      <span className="hidden xs:inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white border border-slate-200 text-blue-900 shadow-sm shrink-0">
                        {pro.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {pro.bio}
                    </p>

                    {/* Focus Exams */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Focus Areas & Exams:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {pro.exams.map((exam) => (
                          <span key={exam} className="text-xs font-semibold bg-white border border-slate-200 text-slate-800 px-2.5 py-0.5 rounded-md">
                            {exam}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="pt-2 border-t border-slate-200 space-y-1.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Key Responsibilities:</p>
                      {pro.achievements.map((ach, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <span className="text-xs text-slate-500 font-medium text-center sm:text-left">Direct Founder Oversight</span>
                    <button
                      onClick={() => onOpenBooking('GRE')}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
                    >
                      <span>Book with Testly</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Testly Professional Doctrine ── */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Service Standards</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                The Testly Verification Doctrine
              </h2>
              <p className="text-sm text-slate-600 font-medium mt-1">
                How the Testly team protects candidates before they spend ₹20,000+ on foreign testing fees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Zero Name-Mismatch Guarantee</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We audit your original passport and review your official testing profile before any fee is paid, ensuring your given name, surname, and date of birth match character for character.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Official Portal Verification</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You never share passwords or sensitive banking data. All vouchers are redeemed directly on ETS.org, PearsonVUE.com, IDP, or GMAC under your own authorized personal account.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Direct WhatsApp Helpline</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No automated chatbots running in circles. When you reach out to Testly, you speak directly with the Testly support team who understand local test centers and university intake deadlines.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. Bottom CTA ── */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Ready to Book Your Exam with Expert Support?
            </h2>
            <p className="text-base text-slate-600 font-medium max-w-xl mx-auto">
              Save up to ₹7,500 on your test voucher while having your registration verified directly by the Testly team.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onOpenBooking('GRE')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Check Your Exam & Savings</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/919347379041?text=Hi%20Testly%20Team%2C%20I%20would%20like%20to%20speak%20with%20you%20regarding%20my%20exam%20registration."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-colors shadow-sm flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Testly Support Team on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer onOpenAdmin={() => onNavigate('/admin')} onNavigate={onNavigate} />
    </div>
  );
}
