import React, { useState } from 'react';

// ── Landing page sections ───────────────────────────────────────────────────
import Navbar               from './components/Navbar';
import Hero                 from './components/Hero';
import PriceProof           from './components/PriceProof';
import ServiceAndExams      from './components/ServiceAndExams';
import TrustSection         from './components/TrustSection';
import HowItWorksAndDeciding from './components/HowItWorksAndDeciding';
import FAQSection           from './components/FAQSection';
import FinalCTA             from './components/FinalCTA';
import Footer               from './components/Footer';

// ── Practice engine ──────────────────────────────────────────────────────────
import PracticeDashboard    from './components/practice/PracticeDashboard';
import TestEngineModal      from './components/practice/TestEngineModal';

// ── Funnel & Modals ──────────────────────────────────────────────────────────
import LeadCaptureModal     from './components/LeadCaptureModal';
import BookingFlowModal     from './components/BookingFlowModal';
import PracticeDashboardModal from './components/PracticeDashboardModal';
import AuthModal            from './components/AuthModal';
import SearchModal          from './components/SearchModal';
import WhatsAppWidget       from './components/WhatsAppWidget';
import SalesAdminDashboard  from './components/admin/SalesAdminDashboard';

export default function App() {
  // ── Lead Capture Funnel (High-Intent 2-4 Question Modal) ───────────────────
  const [leadModalOpen,    setLeadModalOpen]    = useState(false);
  const [selectedExam,     setSelectedExam]     = useState('GRE');

  // ── Self-Service Full Booking Flow (Optional Secondary) ────────────────────
  const [bookingOpen,      setBookingOpen]      = useState(false);

  // ── Practice engine ────────────────────────────────────────────────────────
  const [engineOpen,       setEngineOpen]       = useState(false);
  const [engineMode,       setEngineMode]       = useState('MOCK');
  const [engineExam,       setEngineExam]       = useState('GRE');

  // ── Other modals ───────────────────────────────────────────────────────────
  const [dashboardOpen,    setDashboardOpen]    = useState(false);
  const [authOpen,         setAuthOpen]         = useState(false);
  const [searchOpen,       setSearchOpen]       = useState(false);
  const [adminOpen,        setAdminOpen]        = useState(false);

  // ── Handlers ───────────────────────────────────────────────────────────────
  // Primary CTA opens the high-converting lead capture form
  const handleOpenFunnel = (exam = 'GRE') => {
    setSelectedExam(exam);
    setLeadModalOpen(true);
  };

  const openEngine = (mode = 'MOCK', exam = 'GRE') => {
    setEngineMode(mode);
    setEngineExam(exam);
    setEngineOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-[Inter,system-ui,sans-serif] antialiased">

      {/* ── NAVIGATION ───────────────────────────────────────── */}
      <Navbar onOpenBooking={handleOpenFunnel} />

      <main className="flex-grow">

        {/* 1. HERO ─────────────────────────────────────────────
            "The Smarter Way to Book Your Exam."
            Save money · Registration handled · 4,000+ students */}
        <Hero onBookTest={handleOpenFunnel} />

        {/* 2. PRICE PROOF ──────────────────────────────────────
            "Why Pay More for Your Exam?"
            Authentic exam logos: GRE, TOEFL, IELTS, PTE, Duolingo, GMAT */}
        <PriceProof onBookTest={handleOpenFunnel} />

        {/* 3. SERVICE + EXAM UNIVERSE ──────────────────────────
            Left: ₹199 service checklist
            Right: Clean exam universe grid with real logos */}
        <ServiceAndExams
          onBookTest={handleOpenFunnel}
          onOpenSearch={() => setSearchOpen(true)}
        />

        {/* 4. TRUST ────────────────────────────────────────────
            "You're in Good Company"
            Photo left · 4 stat cards right */}
        <TrustSection />

        {/* 5. HOW IT WORKS + STILL DECIDING ───────────────────
            6-step cards left · "Still Deciding?" card right */}
        <HowItWorksAndDeciding onBookTest={handleOpenFunnel} />

        {/* 6. FREE PRACTICE PLATFORM ───────────────────────────
            Free unlimited adaptive mock tests */}
        <PracticeDashboard onLaunchEngine={openEngine} />

        {/* 7. FAQ ──────────────────────────────────────────────
            8 accordion questions */}
        <FAQSection />

        {/* 8. FINAL CTA ────────────────────────────────────────
            "Why Pay More? Book Smarter." dark section */}
        <FinalCTA onBookTest={handleOpenFunnel} />

      </main>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <Footer />

      {/* ── SALES CRM OPERATING SYSTEM (Floating button) ───────── */}
      <button
        onClick={() => setAdminOpen(true)}
        className="fixed bottom-4 left-4 z-40 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-black px-3.5 py-2 rounded-full border border-slate-700 shadow-xl flex items-center gap-2 transition-all group"
        title="Open Testly Sales CRM Operating System"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Testly Sales CRM</span>
        <span className="bg-slate-800 text-emerald-400 border border-slate-700 text-[10px] px-1.5 py-0.2 rounded font-mono">
          LIVE
        </span>
      </button>

      {/* ── SALES ADMIN CRM DASHBOARD ─────────────────────────── */}
      {adminOpen && <SalesAdminDashboard onClose={() => setAdminOpen(false)} />}

      {/* ── HIGH-CONVERTING 2-4 QUESTION LEAD CAPTURE MODAL ───── */}
      <LeadCaptureModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        defaultTest={selectedExam}
      />

      {/* ── SECONDARY / BACKUP FULL BOOKING FLOW ─────────────── */}
      <BookingFlowModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultTest={selectedExam}
        onOpenDashboard={() => setDashboardOpen(true)}
      />

      {/* ── PRACTICE & SEARCH MODALS ─────────────────────────── */}
      <TestEngineModal
        isOpen={engineOpen}
        onClose={() => setEngineOpen(false)}
        mode={engineMode}
        defaultExam={engineExam}
      />

      <PracticeDashboardModal
        isOpen={dashboardOpen}
        onClose={() => setDashboardOpen(false)}
      />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onBookTest={handleOpenFunnel}
        onCheckPrice={handleOpenFunnel}
      />

      {/* ── WHATSAPP WIDGET ──────────────────────────────────── */}
      <WhatsAppWidget />

    </div>
  );
}
