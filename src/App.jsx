import React, { useState } from 'react';

// ── Landing page sections (new design) ──────────────────────────────────────
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

// ── Modals ───────────────────────────────────────────────────────────────────
import BookingFlowModal     from './components/BookingFlowModal';
import PracticeDashboardModal from './components/PracticeDashboardModal';
import AuthModal            from './components/AuthModal';
import SearchModal          from './components/SearchModal';
import WhatsAppWidget       from './components/WhatsAppWidget';
import AdminAuditDashboard  from './components/admin/AdminAuditDashboard';

export default function App() {
  // ── Booking ────────────────────────────────────────────────────────────────
  const [bookingOpen,      setBookingOpen]      = useState(false);
  const [selectedExam,     setSelectedExam]     = useState('GRE');

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
  const openBooking = (exam = 'GRE') => { setSelectedExam(exam); setBookingOpen(true); };
  const openEngine  = (mode = 'MOCK', exam = 'GRE') => {
    setEngineMode(mode); setEngineExam(exam); setEngineOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-[Inter,system-ui,sans-serif] antialiased">

      {/* ── NAVIGATION ───────────────────────────────────────── */}
      <Navbar onOpenBooking={openBooking} />

      <main className="flex-grow">

        {/* 1. HERO ─────────────────────────────────────────────
            "The Smarter Way to Book Your Exam."
            Save money · Registration handled · 4,000+ students */}
        <Hero onBookTest={openBooking} />

        {/* 2. PRICE PROOF ──────────────────────────────────────
            "Why Pay More for Your Exam?"
            6 exam cards: ref price → Testly price → You Save */}
        <PriceProof onBookTest={openBooking} />

        {/* 3. SERVICE + EXAM UNIVERSE ──────────────────────────
            Left: ₹199 service checklist
            Right: 8-exam grid */}
        <ServiceAndExams
          onBookTest={openBooking}
          onOpenSearch={() => setSearchOpen(true)}
        />

        {/* 4. TRUST ────────────────────────────────────────────
            "You're in Good Company"
            Photo left · 4 stat cards right */}
        <TrustSection />

        {/* 5. HOW IT WORKS + STILL DECIDING ───────────────────
            6-step cards left · "Still Deciding?" card right */}
        <HowItWorksAndDeciding onBookTest={openBooking} />

        {/* 6. FREE PRACTICE PLATFORM ───────────────────────────
            Free unlimited adaptive mock tests */}
        <PracticeDashboard onLaunchEngine={openEngine} />

        {/* 7. FAQ ──────────────────────────────────────────────
            8 accordion questions */}
        <FAQSection />

        {/* 8. FINAL CTA ────────────────────────────────────────
            "Why Pay More? Book Smarter." dark section */}
        <FinalCTA onBookTest={openBooking} />

      </main>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <Footer />

      {/* ── ADMIN CONSOLE (floating) ──────────────────────────── */}
      <button
        onClick={() => setAdminOpen(true)}
        className="fixed bottom-4 left-4 z-40 bg-slate-900 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-bold px-3 py-1.5 rounded-full border border-slate-700 shadow-lg flex items-center gap-1.5 transition-all">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        Admin Console
      </button>

      {adminOpen && <AdminAuditDashboard onClose={() => setAdminOpen(false)} />}

      {/* ── MODALS ───────────────────────────────────────────── */}
      <TestEngineModal
        isOpen={engineOpen}
        onClose={() => setEngineOpen(false)}
        mode={engineMode}
        defaultExam={engineExam}
      />

      <BookingFlowModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultTest={selectedExam}
        onOpenDashboard={() => setDashboardOpen(true)}
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
        onBookTest={openBooking}
        onCheckPrice={openBooking}
      />

      {/* ── WHATSAPP WIDGET ──────────────────────────────────── */}
      <WhatsAppWidget />

    </div>
  );
}
