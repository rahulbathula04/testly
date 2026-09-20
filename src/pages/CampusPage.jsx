import React, { useState } from 'react';
import {
  GraduationCap,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  ArrowRight,
  Phone,
  MessageCircle,
  FileSpreadsheet,
  BadgePercent,
  Calendar,
  Layers,
  HelpCircle,
  Sparkles,
  Scale,
  ChevronRight
} from 'lucide-react';
import { EXAM_OFFERINGS_LIST, formatINR } from '../data/examOfferings';
import { createNewLead } from '../utils/crmStore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PARTNER_BENEFITS = [
  {
    icon: BadgePercent,
    title: 'Highest Institutional Booking Advantages',
    desc: 'Students access corporate and institutional pricing allocations, saving ₹1,800 to ₹7,500 per official exam registration.'
  },
  {
    icon: ShieldCheck,
    title: 'Zero-Defect Passport & ID Name Auditing',
    desc: 'Eliminate exam-day turnaways. Testly professionals verify candidate name spelling against original Indian passports before booking.'
  },
  {
    icon: Users,
    title: 'On-Campus or Virtual Registration Drives',
    desc: 'Dedicated Testly desk on campus during exam rush months (August–December) to register 100+ students in structured batches.'
  },
  {
    icon: FileSpreadsheet,
    title: 'Dean & Placement Cell Reporting Dashboard',
    desc: 'Live tracking of student exam attempts, scheduled dates, test centers, and official score report verification for NAAC & NIRF data.'
  },
  {
    icon: Scale,
    title: 'Zero Institutional Legal Liability',
    desc: 'Testly operates under the Indian Contract Act, 1872 as individual candidate administrative agents. Zero compliance overhead for the college.'
  },
  {
    icon: Phone,
    title: 'Dedicated Institutional Relationship Manager',
    desc: 'Direct priority WhatsApp and phone desk for your college faculty, study-abroad cell coordinators, and candidate parents.'
  }
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Institutional Engagement / MoU Desk',
    desc: 'College administration or Study Abroad Cell signs a zero-cost facilitation agreement designating Testly as the campus exam registration concierge.'
  },
  {
    step: '02',
    title: 'Campus Awareness & Registration Drive',
    desc: 'Testly hosts a 60-minute physical or virtual session on test dates, passport mandates, GRE/TOEFL/IELTS changes, and booking price advantages.'
  },
  {
    step: '03',
    title: 'Batch Document & Profile Verification',
    desc: 'Students submit passport copies to the secure Testly desk. Certified experts perform character-by-character validation.'
  },
  {
    step: '04',
    title: 'Official Booking & Dossier Dispatch',
    desc: 'Official testing accounts configured, test center slots reserved, and official booking dossiers & financial receipts issued to each student.'
  }
];

export default function CampusPage({ onOpenBooking, onNavigate }) {
  const [collegeName, setCollegeName] = useState('');
  const [coordinatorName, setCoordinatorName] = useState('');
  const [designation, setDesignation] = useState('Head of Study Abroad / Placements');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [annualTakers, setAnnualTakers] = useState('100–300 Students');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!collegeName.trim() || !coordinatorName.trim()) {
      setError('Please provide institution name and coordinator contact details.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    // Save as B2B lead
    createNewLead({
      name: `${coordinatorName} (${collegeName})`,
      phone: `+91 ${cleanPhone.slice(-10)}`,
      exam: 'Campus Enterprise (Multiple)',
      timing: annualTakers,
      needs: ['Campus Registration Drive', 'Institutional Pricing', 'Dean Reporting Desk'],
      source: 'Campus B2B Portal',
      campaign: `Campus MoU Inquiry: ${collegeName}`,
      notes: [
        {
          author: 'System',
          text: `Institutional Campus Inquiry: ${collegeName}, ${city}. Coordinator: ${coordinatorName} (${designation}). Email: ${email}. Annual cohort: ${annualTakers}.`,
          time: 'Just now'
        }
      ]
    });

    setSubmitted(true);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] font-sans selection:bg-[#EBF3FF] selection:text-[#1E3A8A] flex flex-col w-full overflow-x-hidden">
      
      {/* ── Global Unified Navbar ── */}
      <Navbar onOpenBooking={onOpenBooking} onNavigate={onNavigate} />

      {/* ── Breadcrumb Bar ── */}
      <nav aria-label="Breadcrumb" className="bg-[#FAF9F6] border-b border-[#E5E7EB] py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-[#64748B]">
          <button onClick={() => onNavigate('/')} className="hover:text-[#0F172A] transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span className="text-[#0F172A] font-bold">Testly Campus (Institutional Partnerships)</span>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden py-12 sm:py-20 border-b border-[#E5E7EB] bg-gradient-to-b from-white via-[#FAF9F6] to-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF3FF] border border-blue-200/80 text-[#1E3A8A] text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-[#3B82F6]" />
                <span>University & Engineering College Partnership Program</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#0F172A] tracking-tight leading-[1.08]">
                Handle Your Students' International Exam-Registration Needs.
              </h1>

              <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl font-normal">
                Every year, hundreds of your engineering and postgraduate students register for GRE, TOEFL, PTE, and IELTS. 
                They suffer from foreign-card markups, passport name mismatches, and chaotic test center booking.
              </p>

              <p className="text-sm text-[#64748B] leading-relaxed max-w-2xl">
                <strong className="text-[#0F172A] font-bold">Testly Campus</strong> brings an authorized registration desk, institutional booking price advantages, and complete document auditing directly to your university campus.
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-[#E5E7EB]">
                <div className="bg-white p-3.5 rounded-xl border border-[#E5E7EB] shadow-xs">
                  <span className="text-xl sm:text-3xl font-black text-[#0F172A] block font-mono">₹7,500</span>
                  <span className="text-[11px] sm:text-xs text-[#64748B] font-medium">Max savings per student</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-[#E5E7EB] shadow-xs">
                  <span className="text-xl sm:text-3xl font-black text-emerald-600 block font-mono">0%</span>
                  <span className="text-[11px] sm:text-xs text-[#64748B] font-medium">Exam-day turnaways</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-[#E5E7EB] shadow-xs">
                  <span className="text-xl sm:text-3xl font-black text-[#1E3A8A] block font-mono">100%</span>
                  <span className="text-[11px] sm:text-xs text-[#64748B] font-medium">Legitimate INR billing</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="#partner-form"
                  className="bg-[#0F172A] hover:bg-[#1E3A8A] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <span>Request Campus Registration Drive</span>
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </a>
                <a
                  href="tel:+919347379041"
                  className="bg-white hover:bg-slate-50 border border-[#E5E7EB] text-[#0F172A] font-bold text-sm px-5 py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 min-h-[44px] shadow-xs"
                >
                  <Phone className="w-4 h-4 text-[#1E3A8A]" />
                  <span>+91 93473 79041</span>
                </a>
              </div>
            </div>

            {/* Right B2B Lead Card */}
            <div id="partner-form" className="lg:col-span-5">
              <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="border-b border-[#E5E7EB] pb-4">
                  <div className="flex items-center gap-2 text-[#1E3A8A] text-xs font-black uppercase tracking-wider">
                    <Building2 className="w-4 h-4 text-[#3B82F6]" />
                    <span>Institutional Inquiry</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mt-1 font-serif">Host a Testly Campus Drive</h3>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    For College Principals, Placement Directors, & Study Abroad Deans.
                  </p>
                </div>

                {submitted ? (
                  <div className="text-center py-8 space-y-4 animate-in zoom-in-95">
                    <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-[#0F172A] font-serif">Drive Request Received</h4>
                      <p className="text-xs text-[#64748B] max-w-xs mx-auto">
                        Our Institutional Partnerships team will contact {coordinatorName} within 4 hours to coordinate the MoU and campus schedule.
                      </p>
                    </div>
                    <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E5E7EB] text-left text-xs space-y-2 text-[#475569]">
                      <p className="font-bold text-[#0F172A] uppercase text-[10px]">What Happens Next:</p>
                      <p>✓ Zero-cost Facilitation MoU draft dispatched to your email.</p>
                      <p>✓ Slot confirmation for on-campus student registration desk.</p>
                      <p>✓ Dedicated student portal link configured for {collegeName}.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                    {error && (
                      <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold">
                        {error}
                      </div>
                    )}

                    <div>
                      <label className="text-[11px] font-bold text-[#334155] block mb-1">
                        College / University Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. CBIT, VNR VJIET, JNTU, RVCE, COEP..."
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-[#0F172A] placeholder-slate-400 outline-none focus:border-[#1E3A8A] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-[#334155] block mb-1">
                          Coordinator Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Prof. / Dr. / Mr."
                          value={coordinatorName}
                          onChange={(e) => setCoordinatorName(e.target.value)}
                          className="w-full bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-[#0F172A] placeholder-slate-400 outline-none focus:border-[#1E3A8A] focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-[#334155] block mb-1">
                          Designation
                        </label>
                        <select
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          className="w-full bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-[#0F172A] outline-none focus:border-[#1E3A8A] focus:bg-white transition-all"
                        >
                          <option value="Dean / Director">Dean / Director</option>
                          <option value="Head of Placements">Head of Placements</option>
                          <option value="Study Abroad Coordinator">Study Abroad Coordinator</option>
                          <option value="HOD Department">HOD / Senior Faculty</option>
                          <option value="Student Council Lead">Student Council Lead</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-[#334155] block mb-1">
                          Official Email ID
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="coordinator@college.edu.in"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-[#0F172A] placeholder-slate-400 outline-none focus:border-[#1E3A8A] focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-[#334155] block mb-1">
                          Direct Phone / WhatsApp
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="9876543210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-[#0F172A] placeholder-slate-400 outline-none focus:border-[#1E3A8A] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-[#334155] block mb-1">
                          Campus City
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-[#0F172A] outline-none focus:border-[#1E3A8A] focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-[#334155] block mb-1">
                          Annual Test Takers
                        </label>
                        <select
                          value={annualTakers}
                          onChange={(e) => setAnnualTakers(e.target.value)}
                          className="w-full bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-[#0F172A] outline-none focus:border-[#1E3A8A] focus:bg-white transition-all"
                        >
                          <option value="50–100 Students">50–100 Students</option>
                          <option value="100–300 Students">100–300 Students</option>
                          <option value="300–800 Students">300–800 Students</option>
                          <option value="800+ Students">800+ Students</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#0F172A] hover:bg-[#1E3A8A] text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer"
                    >
                      <Building2 className="w-4 h-4 text-blue-400" />
                      <span>Submit Institutional Request</span>
                    </button>

                    <p className="text-[10px] text-[#64748B] text-center leading-relaxed">
                      Zero financial commitment required from the institution. Testly operates as candidate administrative agents.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Institutional Exam Pricing Grid ── */}
      <section className="py-16 border-b border-[#E5E7EB] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
              Verified Institutional Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#0F172A] tracking-tight">
              Pre-Cleared Batch Fee Schedules for College Students
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Derived from the master <code className="text-[#1E3A8A] font-mono bg-blue-50 px-1.5 py-0.5 rounded">exam_offerings</code> database. Fixed transparent savings per student.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXAM_OFFERINGS_LIST.map((exam) => (
              <div
                key={exam.id}
                className="bg-[#FAF9F6] border border-[#E5E7EB] hover:border-[#1E3A8A] rounded-2xl p-6 space-y-4 transition-all shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#64748B] font-mono block">
                      {exam.provider}
                    </span>
                    <h3 className="text-xl font-serif text-[#0F172A] mt-0.5">{exam.exam}</h3>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {exam.authorization_status.replace('_', ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-xl border border-[#E5E7EB] text-center shadow-xs">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#64748B] block">Standard Fee</span>
                    <span className="text-xs font-bold text-[#64748B] line-through">
                      {formatINR(exam.reference_price)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#64748B] block">Testly Batch</span>
                    <span className="text-xs font-bold text-[#0F172A]">
                      {formatINR(exam.testly_price)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-amber-700 block">Student Saves</span>
                    <span className="text-xs font-black text-amber-600">
                      {formatINR(exam.saving)}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-[#64748B] space-y-1.5 border-t border-[#E5E7EB] pt-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#64748B]">Method:</span>
                    <span className="font-medium text-[#0F172A]">{exam.booking_method}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#64748B]">Test Venues:</span>
                    <span className="font-medium text-[#0F172A]">{exam.test_venues_supported}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#partner-form"
                    className="w-full py-2.5 bg-white hover:bg-[#FAF9F6] border border-[#E5E7EB] text-[#0F172A] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Include {exam.shortName} in Campus MoU</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#3B82F6]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner Benefits ── */}
      <section className="py-16 border-b border-[#E5E7EB] bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
              Institution & Student Advantages
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#0F172A] tracking-tight">
              Why Premier Engineering Colleges Partner With Testly
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PARTNER_BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-3 shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3FF] border border-blue-200/60 text-[#1E3A8A] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A]">{b.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process Steps ── */}
      <section className="py-16 border-b border-[#E5E7EB] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
              Implementation Blueprint
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#0F172A] tracking-tight">
              How a Testly Campus Registration Drive Works
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Structured, low-friction rollout with zero operational load on college staff.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((s) => (
              <div
                key={s.step}
                className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-6 space-y-3 relative shadow-xs"
              >
                <span className="text-4xl font-black text-slate-300 font-mono block">
                  {s.step}
                </span>
                <h3 className="text-sm font-bold text-[#0F172A]">{s.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Institutional FAQ ── */}
      <section className="py-16 border-b border-[#E5E7EB] bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
              Governance & FAQ
            </span>
            <h2 className="text-3xl font-serif text-[#0F172A] tracking-tight">
              Frequently Asked Questions for University Administrators
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Does the college incur any financial expense or liability?',
                a: 'Zero. The institution signs a facilitation MoU. Students pay for their own exams and the ₹199 assistance fee directly to Testly under individual candidate agency agreements. The college acts purely as an educational facilitator providing access for students.'
              },
              {
                q: 'How does Testly ensure candidate names match passport requirements?',
                a: 'Testly certified professionals conduct a character-by-character review against physical passport scans before submitting official booking data to ETS, Pearson, or IDP. We eliminate the single most common reason candidates are rejected at Prometric testing centers.'
              },
              {
                q: 'Can Testly provide candidate booking and score analytics to the Dean / Placement Cell?',
                a: 'Yes. With candidate consent, Testly provides the college placement department with aggregated reporting on test dates, exam types chosen, and official score availability for institutional accreditation (NAAC/NIRF) records.'
              },
              {
                q: 'What is the minimum batch size for an on-campus physical desk?',
                a: 'We deploy an on-campus physical desk for cohorts of 50 or more registered students. For smaller batches, we provide a dedicated virtual registration drive and priority WhatsApp desk.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-2 shadow-xs">
                <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 bg-[#0F172A] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
            Equip Your Students with the Smarter Way to Book Their Exams.
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Join premier engineering institutions across Telangana, Karnataka, and Maharashtra. Protect your students from exam-booking errors and unnecessary markups.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href="#partner-form"
              className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all shadow-lg flex items-center gap-2"
            >
              <span>Get Started with Testly Campus</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => onNavigate('/')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm px-6 py-3.5 rounded-xl transition-colors cursor-pointer"
            >
              Back to Candidate Portal
            </button>
          </div>
        </div>
      </section>

      {/* ── Global Unified Footer ── */}
      <Footer onNavigate={onNavigate} onOpenAgreement={() => {}} />

    </div>
  );
}
