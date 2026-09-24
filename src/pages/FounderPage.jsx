import React, { useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle,
  Building2,
  Scale,
  Sparkles,
  HeartHandshake,
  AlertTriangle,
  Clock,
  Award,
  ExternalLink
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FOUNDER_IMAGE = '/assets/images/rahul-bathula-founder.jpg';

const STATS = [
  { value: '5,000+', label: 'Candidates Guided', note: 'Across GRE, TOEFL, PTE & IELTS' },
  { value: '₹2.4 Cr+', label: 'Direct Student Savings', note: 'Through institutional pricing' },
  { value: '99.8%', label: 'First-Attempt Accuracy', note: 'Zero passport-name rejections' },
  { value: '₹199', label: 'Transparent Concierge', note: 'Under Indian Contract Act 1872' },
];

const FRICTION_POINTS = [
  {
    num: '01',
    title: 'Surprise Foreign Currency Forex Markup',
    desc: 'When an Indian student pays ₹20,000+ on ETS or Pearson using a domestic debit or credit card, banks silently levy 3.5% foreign transaction markup plus 18% GST. A simple registration quietly costs ₹800 to ₹1,400 more than advertised.',
    impact: 'Hidden cost bleed on middle-class families.'
  },
  {
    num: '02',
    title: 'Zero Live Human Support When Money Glitches',
    desc: 'Foreign testing bodies have minimal real-time Indian phone support. If a bank OTP fails or a session times out after funds are debited, students endure sleepless 72-hour email tickets wondering if their slot was confirmed.',
    impact: 'High anxiety during critical application deadlines.'
  },
  {
    num: '03',
    title: 'The Shadow Voucher Reselling Black Market',
    desc: 'Desperate to save money, candidates flock to unregulated Telegram and WhatsApp groups. Many end up with revoked corporate vouchers, fraudulent credit card transactions, or canceled test dates on the morning of their exam.',
    impact: 'Risk of score cancellation and blacklisting.'
  },
  {
    num: '04',
    title: 'Fatal Passport & Name Discrepancies',
    desc: 'Prometric and Pearson centers enforce strict zero-tolerance ID rules. A missing middle name, an inverted surname, or a date format mismatch leads to immediate center turnaways with 100% fee forfeiture.',
    impact: 'Months of preparation wasted at the test venue door.'
  }
];

const THREE_PILLARS = [
  {
    icon: Scale,
    title: '1. Absolute Price Clarity',
    desc: 'We publish net, all-inclusive Indian Rupee prices upfront. No currency conversion surprises, no dynamic markup. When institutional fee advantages are available, they are passed directly to you.'
  },
  {
    icon: ShieldCheck,
    title: '2. Zero-Defect Concierge Review',
    desc: 'Every candidate registration is manually audited by a trained exam strategist. We match your passport details letter-by-letter, verify test center venue logistics, and eliminate common booking mistakes.'
  },
  {
    icon: HeartHandshake,
    title: '3. Human Accountability in India',
    desc: 'We are not an anonymous web form. Testly operates under the Indian Contract Act 1872 as your verified administrative agent. We are located in Madhapur, Hyderabad, and reachable via direct phone and WhatsApp.'
  }
];

const JOURNEY_STAGES = [
  {
    step: 'STAGE 01',
    title: 'Discovery & Fee Intelligence',
    desc: 'Real-time comparisons of official test dates, live INR fee structures, and institutional voucher availability across GRE, TOEFL, PTE, and IELTS.'
  },
  {
    step: 'STAGE 02',
    title: 'Pre-Registration Audit',
    desc: 'Reviewing candidate identity documents against ETS / Pearson compliance guidelines to ensure the passport name matches test registration precisely.'
  },
  {
    step: 'STAGE 03',
    title: 'Official Account Execution',
    desc: 'The exam is booked directly into the student\'s personal official ETS or Pearson candidate account using corporate enterprise billing rails.'
  },
  {
    step: 'STAGE 04',
    title: 'Continuous Test-Day Support',
    desc: 'Dispatch of official booking confirmation, test center driving directions, acceptable ID checklists, and emergency WhatsApp support until exam completion.'
  }
];

const WHAT_WERE_BUILDING = [
  {
    tag: 'INTELLIGENCE',
    title: 'Exam Price & Center Index',
    desc: 'A transparent public tracker monitoring test fees, center reliability ratings, and slot availability across Indian metros.'
  },
  {
    tag: 'SERVICE',
    title: 'The ₹199 Registration Concierge',
    desc: 'A dedicated administrative advocate who handles the tedious, high-stakes checkout process with character-level accuracy.'
  },
  {
    tag: 'COMMERCE',
    title: 'Authorized Institutional Access',
    desc: 'Legitimate bulk allocations negotiated with educational partners, democratizing access to expensive international credentials.'
  },
  {
    tag: 'INFRASTRUCTURE',
    title: 'Testly Campus Network',
    desc: 'Direct partnerships with colleges and universities across India to equip entire graduating cohorts with hassle-free exam registrations.'
  }
];

const PHILOSOPHY_BELIEFS = [
  {
    num: '01',
    title: 'High-Stakes Demands Zero Error',
    body: 'A GRE or IELTS registration is not an e-commerce impulse buy; it is the culmination of six months of late-night study and years of family sacrifice. Treating it with casual software indifference is unacceptable. Every single booking warrants human eyes.'
  },
  {
    num: '02',
    title: 'Transparency Always Beats Marketing',
    body: 'We will never use countdown timers, manufactured stock panic, or fake strikethrough prices. If a discount is available, we explain where it comes from. If an official body charges late fees, we tell you immediately.'
  },
  {
    num: '03',
    title: 'Technology with a Human Heartbeat',
    body: 'Software makes registration fast; humans make it safe. Automated scripts cannot double-check that your new passport extension matches your Prometric booking. Our systems handle data securely; our strategists provide peace of mind.'
  },
  {
    num: '04',
    title: 'Institutional Economics Belong to Students',
    body: 'For years, large coaching franchises and corporate consultancies hoarded institutional exam vouchers to pad their profit margins. Testly disintermediates that gatekeeping, returning fair pricing directly to the test-taker.'
  },
  {
    num: '05',
    title: 'Agency Requires Legal Accountability',
    body: 'We do not operate in the shadows of Telegram channels. Testly acts as a lawful candidate agent under Section 182 of the Indian Contract Act 1872, maintaining documented transaction trails and complete GST compliance.'
  }
];

const ANTI_GOALS = [
  {
    title: 'Not an Unregulated Voucher Broker',
    desc: 'We do not trade anonymous coupon codes. Every registration is executed in the candidate\'s legitimate official testing profile with full verifiable receipts.'
  },
  {
    title: 'Not a High-Pressure Coaching Institute',
    desc: 'We will never spam you with sales calls selling ₹50,000 prep classes. We exist solely to solve the administrative and logistical pain of registration.'
  },
  {
    title: 'Not an Anonymous Web Aggregator',
    desc: 'When you message Testly, you talk to real people in Hyderabad who know test centers, rescheduling rules, and passport guidelines firsthand.'
  },
  {
    title: 'Not a Dark-Pattern Subscription',
    desc: 'No recurring bills, no hidden renewal traps. ₹199 for dedicated registration concierge service, transparently delivered.'
  }
];

const OPERATING_LAYERS = [
  {
    layer: 'Layer 1: Identity & Compliance',
    focus: 'Candidate Verification',
    details: 'Inspection of full name formatting (Given Name vs. Surname), date of birth, passport expiration date, and ID document validity for testing centers.'
  },
  {
    layer: 'Layer 2: Institutional Procurement',
    focus: 'Direct Corporate Billing',
    details: 'Procurement of genuine institutional test vouchers and corporate billing rails that absorb cross-border forex fees on behalf of Indian students.'
  },
  {
    layer: 'Layer 3: Concierge Execution',
    focus: 'Official Profile Booking',
    details: 'Live booking in the candidate’s official ETS (GRE/TOEFL), Pearson (PTE), or IDP (IELTS) account with immediate PDF confirmation issuance.'
  },
  {
    layer: 'Layer 4: Candidate Protection',
    focus: 'Post-Booking Support',
    details: 'Delivery of venue arrival checklists, rescheduling rules advisory, score reporting guidance, and priority WhatsApp escalation channel.'
  }
];

export default function FounderPage({ onOpenBooking, onNavigate }) {
  useEffect(() => {
    document.title = 'Why I Built Testly — Founder Story | Rahul Bathula';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] font-[Inter,system-ui,sans-serif] antialiased w-full overflow-x-hidden selection:bg-[#EBF3FF] selection:text-[#1E3A8A]">
      {/* ── Global Header Navigation ── */}
      <Navbar onOpenBooking={onOpenBooking} onNavigate={onNavigate} />

      <main className="w-full">
        {/* ── 1. HERO SECTION ── */}
        <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-[#E5E7EB] bg-gradient-to-b from-white via-[#FAF9F6] to-[#FAF9F6]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF3FF] border border-blue-200/60 mb-6 text-xs font-semibold text-[#1E3A8A] tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>THE TESTLY FOUNDER STORY</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.1] font-['DM_Serif_Display',Georgia,serif] max-w-4xl">
              Booking an exam shouldn’t be harder than taking one.
            </h1>

            {/* Core Premise */}
            <p className="mt-6 text-lg sm:text-2xl text-[#1E3A8A] font-medium leading-snug max-w-3xl">
              Testly was built to make exam registration simpler, clearer, and more accessible for students in India.
            </p>

            <p className="mt-4 text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl">
              I started Testly after seeing how unnecessarily complicated the exam-registration journey can become. Different exams. Different testing providers. Different fee structures. Hidden currency conversions. Complicated slot-booking flows. Confusing voucher codes. And almost zero customer support when something goes wrong.
            </p>

            {/* Quick Author Signature Strip */}
            <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden shrink-0">
                  <img
                    src={FOUNDER_IMAGE}
                    alt="Rahul Bathula, Founder of Testly"
                    className="inline-block w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xs"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://ui-avatars.com/api/?name=Rahul+Bathula&background=1E3A8A&color=fff&size=128';
                    }}
                  />
                  <img
                    src="/assets/images/deepak-royal-founder.jpg"
                    alt="Deepak Royal, Co-Founder of Testly"
                    className="inline-block w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xs"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://ui-avatars.com/api/?name=Deepak+Royal&background=1E3A8A&color=fff&size=128';
                    }}
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0F172A]">Rahul Bathula & Deepak Royal</div>
                  <div className="text-xs text-[#64748B]">Founders & Registration Specialists, Testly</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onOpenBooking ? onOpenBooking('GRE') : null}
                  className="inline-flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer min-h-[44px]"
                >
                  <span>Explore Supported Exams</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                </button>
                <a
                  href="https://wa.me/919347379041?text=Hi%20Testly%20Team,%20I%20read%20the%20story%20on%20Testly%20and%20wanted%20to%20connect."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold text-xs sm:text-sm transition-colors min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Testly Support Team</span>
                </a>
              </div>
            </div>

            {/* 4 Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-10">
              {STATS.map((s, idx) => (
                <div key={idx} className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-xs">
                  <div className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight font-['DM_Serif_Display',Georgia,serif]">
                    {s.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#1E3A8A] mt-0.5">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-1 leading-tight">
                    {s.note}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── 2. THE PROBLEM WE SAW ── */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E5E7EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest block mb-2">
                THE PROBLEM
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight font-['DM_Serif_Display',Georgia,serif]">
                A ₹20,000 milestone treated with zero customer care.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#64748B] leading-relaxed">
                For a student in Hyderabad, Bengaluru, or Delhi, registering for the GRE, TOEFL, PTE, or IELTS is often the single most expensive administrative step before applying to a master’s program abroad. Yet the experience feels like navigating an obstacle course.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-10">
              {FRICTION_POINTS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 relative hover:border-blue-300 transition-colors"
                >
                  <div className="text-xs font-black text-[#3B82F6] tracking-wider mb-2">
                    FRICTION POINT {item.num}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center gap-2 text-[11px] font-semibold text-[#1E3A8A]">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Real World Impact: {item.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. THE INSIGHT ── */}
        <section className="py-16 sm:py-20 bg-[#0F172A] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-3">
              THE CORE INSIGHT
            </span>
            
            <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-['DM_Serif_Display',Georgia,serif] text-white">
              “Students don’t need another coaching company. They need a better registration experience.”
            </blockquote>

            <div className="mt-6 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              <p>
                India has hundreds of coaching academies teaching students how to solve quantitative problems and write essays. Billions of rupees are poured into test preparation.
              </p>
              <p>
                Yet the moment preparation concludes and the student needs to book the actual examination, everyone disappears. The student is left to grapple with foreign payment gateways, confusing testing center codes, and unforgiving identity mandates.
              </p>
              <p className="text-white font-medium">
                The missing piece was never another video lecture. The missing piece was an administrative advocate — a dedicated service that ensures the registration is executed flawlessly, legally, and at the best possible price.
              </p>
            </div>
          </div>
        </section>

        {/* ── 4. WHY TESTLY EXISTS (3 PILLARS) ── */}
        <section className="py-16 sm:py-20 bg-[#FAF9F6] border-b border-[#E5E7EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest block mb-2">
                OUR PURPOSE
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight font-['DM_Serif_Display',Georgia,serif]">
                Why Testly Exists: The 3 Non-Negotiable Standards
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#64748B]">
                Everything we build, from our fee tracker to our human concierge desk, is anchored in three fundamentals:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {THREE_PILLARS.map((p, idx) => {
                const IconComponent = p.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#EBF3FF] border border-blue-200/80 flex items-center justify-center text-[#1E3A8A] mb-4">
                      <IconComponent className="w-6 h-6 text-[#1E3A8A]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-2 font-['DM_Serif_Display',Georgia,serif]">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 5. THE IDEA: "CHECK BEFORE YOU BOOK" ── */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E5E7EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest block">
                  THE PRE-REGISTRATION PROTOCOL
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight font-['DM_Serif_Display',Georgia,serif]">
                  “Check before you book.”
                </h2>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                  Before you book a flight, you check flight aggregators for the best route, baggage policies, and hidden convenience fees. Before you book a hotel, you check verified reviews and location coordinates.
                </p>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                  Why should booking an international exam costing ₹15,000 to ₹22,000 be any different?
                </p>
                <p className="text-sm sm:text-base text-[#0F172A] font-semibold leading-relaxed">
                  Testly is the pre-booking verification layer that every Indian student uses before committing funds. You check current INR fee schedules, verify your passport name formatting, check seat availability at verified centers, and lock in institutional pricing before giving money to foreign portals.
                </p>
              </div>

              <div className="lg:col-span-5 bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-6 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  What to check before booking:
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-[#0F172A]">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[11px]">✓</span>
                    <span><strong>Net INR Cost:</strong> Verify whether current bank forex markup makes domestic payment more expensive than institutional vouchers.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[11px]">✓</span>
                    <span><strong>Passport Name Match:</strong> Ensure your Given Name and Surname perfectly mirror your passport layout, not your Aadhaar or college ID.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[11px]">✓</span>
                    <span><strong>Center Integrity:</strong> Select testing centers with proven power backup, updated audio headsets, and reliable air conditioning.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[11px]">✓</span>
                    <span><strong>Reschedule Guidelines:</strong> Know the exact cut-off deadline in case illness or visa delays require a slot movement.</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate ? onNavigate('/exam-fees') : null}
                    className="w-full bg-[#1E3A8A] hover:bg-[#0F172A] text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Check Live Exam Fees Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 6. THE THESIS: REGISTRATION IS A LIFECYCLE ── */}
        <section className="py-16 sm:py-20 bg-[#FAF9F6] border-b border-[#E5E7EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest block mb-2">
                THE THESIS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight font-['DM_Serif_Display',Georgia,serif]">
                Exam registration is a service, not just a checkout click.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#64748B] leading-relaxed">
                Most platforms treat exam booking as an isolated payment transaction. We view it as a high-stakes four-stage candidate journey requiring oversight from discovery to test day:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10">
              {JOURNEY_STAGES.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="text-[11px] font-black text-[#3B82F6] tracking-wider mb-2">
                      {s.step}
                    </div>
                    <h3 className="text-base font-bold text-[#0F172A] mb-2 font-['DM_Serif_Display',Georgia,serif]">
                      {s.title}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#E5E7EB] text-[10px] font-bold text-[#1E3A8A] uppercase tracking-wider flex items-center gap-1">
                    <span>Verified by Testly</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. WHAT WE'RE BUILDING (4 PILLARS) ── */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E5E7EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest block mb-2">
                THE ROADMAP
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight font-['DM_Serif_Display',Georgia,serif]">
                What We’re Building: The Candidate Services Infrastructure
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#64748B] leading-relaxed">
                Testly is not an ad-supported blog or a fly-by-night coupon shop. We are building the institutional registration layer for higher education testing across South Asia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {WHAT_WERE_BUILDING.map((b, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-6 relative hover:border-blue-300 transition-colors"
                >
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[#EBF3FF] text-[#1E3A8A] text-[10px] font-bold tracking-wider mb-3">
                    {b.tag}
                  </span>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2 font-['DM_Serif_Display',Georgia,serif]">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. WHY ₹199? (RADICAL TRANSPARENCY) ── */}
        <section className="py-16 sm:py-20 bg-[#FAF9F6] border-b border-[#E5E7EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border-2 border-blue-200/80 rounded-3xl p-6 sm:p-10 shadow-xs">
              <div className="max-w-3xl">
                <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest block mb-2">
                  TRANSPARENT PRICING PHILOSOPHY
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight font-['DM_Serif_Display',Georgia,serif]">
                  Why ₹199? The breakdown of our concierge fee.
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#64748B] leading-relaxed">
                  We refuse to bake hidden margins into artificial currency exchange rates. We state our economics openly:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-6 border-t border-[#E5E7EB]">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
                    What your ₹199 concierge fee pays for:
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#64748B]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Individual Character Audit:</strong> A trained exam strategist verifies your name, passport number, and DOB letter-for-letter.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Corporate Billing Execution:</strong> Payment handled via verified corporate INR rails, saving you the 3.5% + GST retail forex fee.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Official Document Dispatch:</strong> Direct generation and delivery of your testing agency appointment docket.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Test Morning Emergency Desk:</strong> Direct WhatsApp access in case your center faces weather, traffic, or check-in queries.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mb-2">
                      Why not make it free?
                    </div>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      “Free” services inevitably monetize by selling student phone numbers to aggressive overseas education consultants, coaching centers, and loan sharks.
                    </p>
                    <p className="text-xs sm:text-sm text-[#0F172A] font-medium leading-relaxed mt-3">
                      By charging a fair, modest ₹199 fee, Testly works exclusively for <em>you</em>. We have zero interest in selling your data. You are our client, not our product.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#E5E7EB] text-[11px] text-[#64748B] italic">
                    Backed by Section 182, Indian Contract Act, 1872.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 9. THE PEOPLE BEHIND THE REGISTRATION ── */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E5E7EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest block">
                  HYDERABAD OPERATIONS DESK
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight font-['DM_Serif_Display',Georgia,serif]">
                  Only two professionals. Absolute founder accountability.
                </h2>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                  Testly is not an anonymous enterprise or an outsourced customer support agency. It is founded and operated strictly by two dedicated specialists: <strong>Rahul Bathula</strong> (Founder & Chief Exam Strategist) and <strong>Deepak Royal</strong> (Co-Founder & Head of Operations).
                </p>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                  We are based in the Madhapur Hitech City corridor of Hyderabad. Between the two of us, we monitor daily ETS portal changes, Prometric and Pearson venue schedules, emergency slot drops, and passport compliance.
                </p>
                <p className="text-sm sm:text-base text-[#0F172A] font-semibold leading-relaxed">
                  When you submit your registration request on Testly, no automated bots or random call centers touch your profile. The Testly team collects, reviews, and audits your profile character-by-character, executes the booking, and sends your official confirmation docket.
                </p>
              </div>

              <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-4 text-center">
                  <Award className="w-6 h-6 text-[#1E3A8A] mx-auto mb-2" />
                  <div className="text-sm font-bold text-[#0F172A]">2 Founders</div>
                  <div className="text-xs text-[#64748B] mt-1">Rahul Bathula & Deepak Royal</div>
                </div>

                <div className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-4 text-center">
                  <Phone className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <div className="text-sm font-bold text-[#0F172A]">Direct Helpline</div>
                  <div className="text-xs text-[#64748B] mt-1">+91 93473 79041</div>
                </div>

                <div className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-4 text-center">
                  <Building2 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm font-bold text-[#0F172A]">Madhapur Hub</div>
                  <div className="text-xs text-[#64748B] mt-1">Hitech City Road, Hyderabad</div>
                </div>

                <div className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-4 text-center">
                  <Scale className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                  <div className="text-sm font-bold text-[#0F172A]">Legal Agency</div>
                  <div className="text-xs text-[#64748B] mt-1">Indian Contract Act 1872</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 10. WHAT I DON'T WANT TESTLY TO BECOME ── */}
        <section className="py-16 sm:py-20 bg-[#FAF9F6] border-b border-[#E5E7EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest block mb-2">
                OUR GUARDRAILS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight font-['DM_Serif_Display',Georgia,serif]">
                What I don’t want Testly to become.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#64748B] leading-relaxed">
                Great companies are defined as much by what they refuse to do as by what they do. Here are the lines we will never cross:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-10">
              {ANTI_GOALS.map((a, idx) => (
                <div key={idx} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2 text-rose-700 font-bold text-sm">
                    <span className="w-4 h-4 rounded-full bg-rose-100 flex items-center justify-center text-xs">✕</span>
                    <span>{a.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {a.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 11. FOUNDER PHILOSOPHY: 5 CORE BELIEFS ── */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E5E7EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest block mb-2">
                FOUNDER DOCTRINE
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight font-['DM_Serif_Display',Georgia,serif]">
                The 5 Beliefs That Govern Our Work
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#64748B]">
                These principles guide every hire we make, every line of code we ship, and every student interaction we conduct.
              </p>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              {PHILOSOPHY_BELIEFS.map((b, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 transition-all hover:bg-white hover:border-blue-300 hover:shadow-sm"
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-xs font-black text-[#1E3A8A] font-mono">
                      {b.num}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
                      {b.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed pl-6 sm:pl-7">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 12. 4-LAYER OPERATING MODEL ── */}
        <section className="py-16 sm:py-20 bg-[#FAF9F6] border-b border-[#E5E7EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest block mb-2">
                OPERATIONAL ARCHITECTURE
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight font-['DM_Serif_Display',Georgia,serif]">
                How Testly Operates: The 4-Layer Infrastructure
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#64748B] leading-relaxed">
                We replaced chaotic, error-prone manual registration with a rigorous institutional workflow:
              </p>
            </div>

            <div className="mt-10 divide-y divide-[#E5E7EB] border border-[#E5E7EB] rounded-2xl bg-white overflow-hidden shadow-xs">
              {OPERATING_LAYERS.map((layer, idx) => (
                <div key={idx} className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-4">
                    <div className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider">
                      {layer.layer}
                    </div>
                    <div className="text-base font-bold text-[#0F172A] mt-0.5">
                      {layer.focus}
                    </div>
                  </div>
                  <div className="md:col-span-8 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {layer.details}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 13. A PERSONAL NOTE FROM RAHUL BATHULA ── */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E5E7EB]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="border-l-4 border-[#1E3A8A] pl-6 sm:pl-8 py-2 space-y-4">
              <span className="text-xs font-bold text-[#1E3A8A] uppercase tracking-widest block">
                FOUNDER'S LETTER
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight font-['DM_Serif_Display',Georgia,serif]">
                A note from Rahul Bathula.
              </h2>
            </div>

            <div className="mt-8 space-y-5 text-sm sm:text-base text-[#0F172A]/90 leading-relaxed font-[Inter,sans-serif]">
              <p>
                When I first began observing the study-abroad ecosystem in India, one glaring injustice kept coming back to me: <em>why does the most vulnerable stakeholder — the student — bear all the administrative friction?</em>
              </p>

              <p>
                I watched close friends spend six to nine months grinding through vocabulary decks and quant sets, only to panic at 11:30 PM on a Sunday night because an international payment gateway dropped their transaction, or because their bank flagged a foreign transaction as suspicious while test slots in their city disappeared.
              </p>

              <p>
                Even worse, I watched students turn up at Prometric testing centers in Hyderabad and Bengaluru after months of exhausting preparation, only to be turned away at the security desk because someone typed their name as “Rahul B” instead of “Rahul Bathula” to match their passport. In that single moment, their ₹20,000 was gone, their test cycle was ruined, and their university deadlines were put at risk.
              </p>

              <p className="text-[#1E3A8A] font-semibold text-base sm:text-lg">
                “Every student we help represents a family’s aspiration. When you handle someone’s dream, you don’t take shortcuts.”
              </p>

              <p>
                That is why Testly exists. We didn’t build this company to sell you a dream or to promise a magic score. We built Testly to be the reliable, watchful, legally accountable partner who stands between you and the confusing bureaucracy of international test registration.
              </p>

              <p>
                When you entrust your registration to us, we take that responsibility personally. We double check your passport letters. We eliminate unnecessary bank forex markups. And if there is any question, our team in Hyderabad is a direct phone call away.
              </p>

              <p className="pt-2 font-medium">
                Thank you for trusting Testly with your journey.
              </p>

              <div className="pt-6 flex items-center justify-between border-t border-[#E5E7EB]">
                <div>
                  <div className="text-base font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
                    Rahul Bathula
                  </div>
                  <div className="text-xs text-[#64748B]">
                    Founder & Chief Exam Strategist, Testly
                  </div>
                  <div className="text-xs text-[#64748B] mt-0.5">
                    Madhapur, Hyderabad, India
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-['Caveat',cursive] text-2xl text-[#1E3A8A] block">
                    Rahul Bathula
                  </span>
                  <span className="text-[10px] text-[#64748B] block">
                    Verified Signature
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 14. FOUNDING LEADERSHIP PROFILES (RAHUL BATHULA & DEEPAK ROYAL) ── */}
        <section className="py-16 sm:py-20 bg-[#FAF9F6] border-b border-[#E5E7EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest block mb-2">
                THE FOUNDING TEAM
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight font-['DM_Serif_Display',Georgia,serif]">
                Meet the Two Founders Behind Testly
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] mt-2">
                Direct accountability. No anonymous coordinators, no offshore support tiers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Profile 1: Rahul Bathula */}
              <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="/assets/images/rahul-bathula-founder.jpg"
                      alt="Rahul Bathula - Founder of Testly"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-top border-2 border-blue-200/80 shadow-md shrink-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://ui-avatars.com/api/?name=Rahul+Bathula&background=1E3A8A&color=fff&size=128';
                      }}
                    />
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF3FF] text-[#1E3A8A] text-[10px] font-bold">
                        <Award className="w-3 h-3" />
                        <span>FOUNDER</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif] mt-1">
                        Rahul Bathula
                      </h3>
                      <p className="text-xs font-bold text-[#1E3A8A]">
                        Founder & Chief Exam Strategist
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    7+ years in international test advisory, voucher systems, and compliance architecture. Personally pioneered Testly's zero-defect booking framework after witnessing hundreds of students lose non-refundable exam fees to subtle passport discrepancies.
                  </p>

                  <div className="text-xs font-semibold text-[#0F172A] space-y-1 pt-2 border-t border-[#E5E7EB]">
                    <div className="text-[10px] uppercase font-bold text-[#64748B]">Core Focus:</div>
                    <div>GRE, TOEFL, GMAT, Identification & Name Verification</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex flex-wrap items-center gap-2.5">
                  <a
                    href="https://wa.me/919347379041?text=Hi%20Testly%20Team,%20I'd%20like%20to%20connect%20with%20you%20regarding%20Testly%20registration."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Connect on WhatsApp</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rahul-bathula"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-[#FAF9F6] hover:bg-[#EBF3FF] text-[#0F172A] border border-[#E5E7EB] text-xs font-bold px-3 py-2 rounded-xl transition-all"
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3 text-[#1E3A8A]" />
                  </a>
                  <a
                    href="tel:+919347379041"
                    className="inline-flex items-center gap-1 bg-[#FAF9F6] hover:bg-[#EBF3FF] text-[#0F172A] border border-[#E5E7EB] text-xs font-bold px-3 py-2 rounded-xl transition-all"
                  >
                    <Phone className="w-3 h-3 text-[#1E3A8A]" />
                    <span>+91 93473 79041</span>
                  </a>
                </div>
              </div>

              {/* Profile 2: Deepak Royal */}
              <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="/assets/images/deepak-royal-founder.jpg"
                      alt="Deepak Royal - Co-Founder of Testly"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-blue-200/80 shadow-md shrink-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://ui-avatars.com/api/?name=Deepak+Royal&background=1E3A8A&color=fff&size=128';
                      }}
                    />
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF3FF] text-[#1E3A8A] text-[10px] font-bold">
                        <Award className="w-3 h-3" />
                        <span>CO-FOUNDER</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif] mt-1">
                        Deepak Royal
                      </h3>
                      <p className="text-xs font-bold text-[#1E3A8A]">
                        Co-Founder & Head of Operations
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    6+ years of operational mastery in test venue logistics, Prometric and Pearson center coordination, and slot booking infrastructure. Personally audits candidate documentation character-by-character and manages real-time slot recovery during peak admissions intake.
                  </p>

                  <div className="text-xs font-semibold text-[#0F172A] space-y-1 pt-2 border-t border-[#E5E7EB]">
                    <div className="text-[10px] uppercase font-bold text-[#64748B]">Core Focus:</div>
                    <div>PTE, IELTS, Pearson & Prometric Center Logistics</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex flex-wrap items-center gap-2.5">
                  <a
                    href="https://wa.me/919347379041?text=Hi%20Testly%20Team,%20I'd%20like%20to%20connect%20with%20you%20regarding%20Testly%20operations."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Connect on WhatsApp</span>
                  </a>
                  <a
                    href="tel:+919347379041"
                    className="inline-flex items-center gap-1 bg-[#FAF9F6] hover:bg-[#EBF3FF] text-[#0F172A] border border-[#E5E7EB] text-xs font-bold px-3 py-2 rounded-xl transition-all"
                  >
                    <Phone className="w-3 h-3 text-[#1E3A8A]" />
                    <span>+91 93473 79041</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 15. FINAL CALL TO ACTION ── */}
        <section className="py-16 sm:py-20 bg-[#0F172A] text-white relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">
              BEFORE YOU REGISTER
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['DM_Serif_Display',Georgia,serif]">
              Before you book, check Testly.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Don’t pay unnecessary bank forex markups or risk a passport name rejection. Check today's verified fee schedules and let our Hyderabad team handle your registration with zero errors.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-lg mx-auto sm:max-w-none">
              <button
                onClick={() => onOpenBooking ? onOpenBooking('GRE') : null}
                className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <span>Check My Exam Savings</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate ? onNavigate('/exam-fees') : null}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm px-6 py-3.5 rounded-xl transition-colors cursor-pointer min-h-[44px]"
              >
                View Live Fee Tracker
              </button>
              <button
                onClick={() => onNavigate ? onNavigate('/campus') : null}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm px-6 py-3.5 rounded-xl transition-colors cursor-pointer min-h-[44px]"
              >
                For Colleges (Campus MoU)
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ── Global Footer ── */}
      <Footer
        onOpenAdmin={() => onNavigate ? onNavigate('/admin') : null}
        onNavigate={onNavigate}
        onOpenAgreement={() => {}}
      />
    </div>
  );
}
