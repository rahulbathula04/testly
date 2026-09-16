import React, { useState, useEffect } from 'react';

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

// ── Secure Standalone Admin Portal ───────────────────────────────────────────
import AdminLoginGate       from './components/admin/AdminLoginGate';

export default function App() {
  // ── URL Route Detection (/admin or #/admin or ?admin=true) ────────────────
  const checkIsAdmin = () => {
    if (typeof window === 'undefined') return false;
    return (
      window.location.pathname.startsWith('/admin') ||
      window.location.hash.includes('admin') ||
      new URLSearchParams(window.location.search).has('admin')
    );
  };

  const [isAdminRoute, setIsAdminRoute] = useState(checkIsAdmin());

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminRoute(checkIsAdmin());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setIsAdminRoute(false);
  };

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setIsAdminRoute(true);
  };

  // ── Modals & Funnel State ──────────────────────────────────────────────────
  const [leadModalOpen,    setLeadModalOpen]    = useState(false);
  const [selectedExam,     setSelectedExam]     = useState('GRE');

  const [bookingOpen,      setBookingOpen]      = useState(false);

  const [engineOpen,       setEngineOpen]       = useState(false);
  const [engineMode,       setEngineMode]       = useState('MOCK');
  const [engineExam,       setEngineExam]       = useState('GRE');

  const [dashboardOpen,    setDashboardOpen]    = useState(false);
  const [authOpen,         setAuthOpen]         = useState(false);
  const [searchOpen,       setSearchOpen]       = useState(false);

  const handleOpenFunnel = (exam = 'GRE') => {
    setSelectedExam(exam);
    setLeadModalOpen(true);
  };

  const openEngine = (mode = 'MOCK', exam = 'GRE') => {
    setEngineMode(mode);
    setEngineExam(exam);
    setEngineOpen(true);
  };

  // ── If Admin Route, render Real Secure Admin Portal ────────────────────────
  if (isAdminRoute) {
    return <AdminLoginGate onNavigateHome={navigateToHome} />;
  }

  // ── Public Student-Facing Landing Page (100% Clean, No Admin Clutter) ──────
  return (
    <div className="min-h-screen bg-white flex flex-col font-[Inter,system-ui,sans-serif] antialiased">

      {/* Navigation */}
      <Navbar onOpenBooking={handleOpenFunnel} />

      <main className="flex-grow">

        {/* 1. HERO — The Smarter Way to Book Your Exam */}
        <Hero onBookTest={handleOpenFunnel} />

        {/* 2. PRICE PROOF — Authentic logos + data-driven savings */}
        <PriceProof onBookTest={handleOpenFunnel} />

        {/* 3. SERVICE + EXAM UNIVERSE */}
        <ServiceAndExams
          onBookTest={handleOpenFunnel}
          onOpenSearch={() => setSearchOpen(true)}
        />

        {/* 4. TRUST — 4,000+ Students Guided */}
        <TrustSection />

        {/* 5. HOW IT WORKS + STILL DECIDING */}
        <HowItWorksAndDeciding onBookTest={handleOpenFunnel} />

        {/* 6. FREE PRACTICE PLATFORM */}
        <PracticeDashboard onLaunchEngine={openEngine} />

        {/* 7. FAQ */}
        <FAQSection />

        {/* 8. FINAL CTA — Why Pay More? Book Smarter. */}
        <FinalCTA onBookTest={handleOpenFunnel} />

      </main>

      {/* Footer with subtle staff login */}
      <Footer onOpenAdmin={navigateToAdmin} />

      {/* ── High-Converting Lead Capture Modal ────────────────────── */}
      <LeadCaptureModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        defaultTest={selectedExam}
      />

      {/* ── Full Booking Flow (Secondary) ─────────────────────────── */}
      <BookingFlowModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultTest={selectedExam}
        onOpenDashboard={() => setDashboardOpen(true)}
      />

      {/* ── Practice & Search Modals ──────────────────────────────── */}
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

      {/* ── WhatsApp Help Widget ──────────────────────────────────── */}
      <WhatsAppWidget />

    </div>
  );
}
