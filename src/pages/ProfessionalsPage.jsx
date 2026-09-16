import React, { useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Award,
  Users,
  ChevronRight,
  Mail,
  Phone,
  MessageCircle,
  FileCheck2,
  GraduationCap,
  Sparkles,
  BookOpen
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PROFESSIONALS = [
  {
    name: 'Rahul Bathula',
    role: 'Founder & Chief Exam Strategist',
    experience: '7+ Years Overseas Advisory',
    exams: ['GRE General Test', 'TOEFL iBT', 'GMAT Focus'],
    bio: 'Pioneered the Testly zero-defect candidate verification framework. Has directly assisted over 3,500 students in Telangana and Andhra Pradesh with official registration, saving families lakhs in avoidable foreign exchange and card conversion fees.',
    achievements: [
      'Architected ₹199 zero-defect passport name validation',
      'Over 3,500 candidates successfully registered without single test-day rejection',
      'Key liaison for corporate institutional exam vouchers'
    ],
    avatarInitial: 'RB',
    badge: 'Senior Strategist'
  },
  {
    name: 'Arjun Varma',
    role: 'Senior Test Venue & Prometric Specialist',
    experience: '5+ Years Test Logistics',
    exams: ['GRE', 'TOEFL', 'Pearson VUE Centers'],
    bio: 'Expert on testing center regulations across Prometric Madhapur and Pearson Begumpet. Specializes in emergency slot recovery, reschedule protocols, and troubleshooting candidate biometric and identification conflicts.',
    achievements: [
      'Handled 1,200+ Prometric Madhapur & Begumpet venue bookings',
      'Specialist in Indian Passport single-name & split-name resolution',
      'Emergency slot monitor during peak Fall application cycles'
    ],
    avatarInitial: 'AV',
    badge: 'Venue Logistics Lead'
  },
  {
    name: 'Kavya S.',
    role: 'Lead English Assessment Advisor',
    experience: '6+ Years IELTS & PTE Guidance',
    exams: ['IELTS Academic', 'PTE Academic', 'Duolingo DET'],
    bio: 'Scored Band 8.5 on IELTS Academic and 88 on PTE. Guides candidates on choosing between computer-delivered IELTS, PTE, and Duolingo based on their target university intake and Australian/UK visa thresholds.',
    achievements: [
      'Certified English Language Assessment Advisor',
      'Assisted 1,800+ candidates for Australia, UK & Canada visas',
      'Expert in fast 48-hour score turnaround tests'
    ],
    avatarInitial: 'KS',
    badge: 'Language Assessment Lead'
  },
  {
    name: 'Priya Nair',
    role: 'Head of Candidate Success & Verification',
    experience: '4+ Years Quality Assurance',
    exams: ['All Supported Exams', 'Duolingo DET Home Rules'],
    bio: 'Ensures every candidate profile, passport copy, and official voucher code are 100% aligned prior to test morning. Also guides at-home test takers on room setup, lighting, and camera rules for Duolingo DET and GRE at Home.',
    achievements: [
      'Maintains Testly 99.8% first-time check-in clearance rate',
      'Designed the step-by-step test morning readiness checklist',
      'Dedicated candidate resolution lead on WhatsApp'
    ],
    avatarInitial: 'PN',
    badge: 'Quality & Compliance'
  }
];

export default function ProfessionalsPage({ onOpenBooking, onNavigate }) {
  useEffect(() => {
    document.title = "Meet the Exam Registration Specialists | Testly Professionals & E-E-A-T Team";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Meet the team behind Testly. Experienced exam strategists, Prometric logistics experts, and IELTS/PTE advisors helping Indian students book official exams safely and affordably.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-[Inter,system-ui,sans-serif] antialiased text-slate-900">
      <Navbar onOpenBooking={onOpenBooking} onNavigate={onNavigate} />

      {/* ── Breadcrumbs ── */}
      <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-200 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button onClick={() => onNavigate('/')} className="hover:text-slate-900 transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Professionals & Team</span>
        </div>
      </nav>

      <main className="flex-grow">

        {/* ── 1. Hero / E-E-A-T Statement ── */}
        <section className="relative bg-gradient-to-b from-slate-50 to-white py-14 lg:py-20 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Verified E-E-A-T Registration Advisory</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
                The Professionals Behind <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">
                  Zero-Defect Exam Registration
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                Testly is not an anonymous automated coupon site. We are a team of dedicated test-taking veterans, Prometric center specialists, and passport compliance experts who ensure your official exam registration is completely error-free.
              </p>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                <p className="text-xs text-slate-500 font-medium">Students Assisted</p>
                <p className="text-3xl font-black text-slate-900">4,000+</p>
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
                <p className="text-xs text-slate-500 font-medium">Professional Service</p>
                <p className="text-3xl font-black text-slate-900">₹199</p>
                <p className="text-[11px] text-slate-500 font-semibold">Full human verification</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Team Member Dossiers ── */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Core Advisory Team</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Meet Your Registration Specialists
              </h2>
              <p className="text-sm text-slate-600 font-medium mt-1">
                Every member brings hands-on familiarity with testing agency guidelines, passport regulations, and slot availability.
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
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white font-black text-lg flex items-center justify-center shadow-md">
                          {pro.avatarInitial}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{pro.name}</h3>
                          <p className="text-xs text-blue-700 font-bold">{pro.role}</p>
                          <p className="text-[11px] text-slate-500 font-medium mt-0.5">{pro.experience}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm shrink-0">
                        {pro.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {pro.bio}
                    </p>

                    {/* Focus Exams */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Specialized Exams:</p>
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
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Key Contributions:</p>
                      {pro.achievements.map((ach, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Available for Student Consultation</span>
                    <button
                      onClick={() => onOpenBooking('GRE')}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors flex items-center gap-1.5"
                    >
                      <span>Book with Specialist</span>
                      <ArrowRight className="w-3 h-3" />
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
                The Testly Professional Doctrine
              </h2>
              <p className="text-sm text-slate-600 font-medium mt-1">
                How we protect our candidates before they spend thousands on testing fees.
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
                <h3 className="text-base font-bold text-slate-900">Direct Human WhatsApp Helpline</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No automated chatbots running in circles. When you reach out to Testly, you speak directly with real advisors who understand local test centers and university intake deadlines.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. Bottom CTA ── */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Ready to Book Your Exam with Professional Guidance?
            </h2>
            <p className="text-base text-slate-600 font-medium max-w-xl mx-auto">
              Save up to ₹7,500 on your test voucher while having your registration verified by our experienced Hyderabad specialists.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onOpenBooking('GRE')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all shadow-md flex items-center gap-2"
              >
                <span>Check Your Exam & Savings</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/919347379041?text=Hi%20Testly%20Team%2C%20I%20would%20like%20to%20speak%20with%20a%20registration%20specialist."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-colors shadow-sm flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer onOpenAdmin={() => onNavigate('/admin')} onNavigate={onNavigate} />
    </div>
  );
}
