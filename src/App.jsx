import React, { useState, useEffect } from 'react';

// ── Landing page sections ───────────────────────────────────────────────────
import Navbar               from './components/Navbar';
import Hero                 from './components/Hero';
import PriceProof           from './components/PriceProof';
import HowItWorksAndDeciding from './components/HowItWorksAndDeciding';
import CampusBanner         from './components/CampusBanner';
import StudentReviews       from './components/StudentReviews';
import ExamResources        from './components/ExamResources';
import FAQSection           from './components/FAQSection';
import Footer               from './components/Footer';

// ── Practice engine ──────────────────────────────────────────────────────────
import PracticeDashboard    from './components/practice/PracticeDashboard';
import TestEngineModal      from './components/practice/TestEngineModal';

// ── Authority Pages & Hubs ───────────────────────────────────────────────────
import HyderabadHubPage     from './pages/HyderabadHubPage';
import MadhapurHubPage      from './pages/MadhapurHubPage';
import ExamPriceTrackerPage from './pages/ExamPriceTrackerPage';
import ProfessionalsPage    from './pages/ProfessionalsPage';
import BlogDirectoryPage    from './pages/BlogDirectoryPage';
import ArticlePage          from './pages/ArticlePage';
import CampusPage           from './pages/CampusPage';

// ── Funnel & Modals ──────────────────────────────────────────────────────────
import LeadCaptureModal     from './components/LeadCaptureModal';
import BookingFlowModal     from './components/BookingFlowModal';
import PracticeDashboardModal from './components/PracticeDashboardModal';
import AuthModal            from './components/AuthModal';
import SearchModal          from './components/SearchModal';
import WhatsAppWidget       from './components/WhatsAppWidget';
import MobileStickyBar      from './components/MobileStickyBar';
import LiveActivityToast    from './components/LiveActivityToast';
import ExitIntentModal     from './components/ExitIntentModal';
import CandidateAgencyAgreementModal from './components/CandidateAgencyAgreementModal';

// ── Secure Standalone Admin Portal ───────────────────────────────────────────
import AdminLoginGate       from './components/admin/AdminLoginGate';

function getActiveRoute() {
  if (typeof window === 'undefined') return { type: 'home' };
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();

  if (path.startsWith('/admin') || hash.includes('admin') || search.includes('admin')) {
    return { type: 'admin' };
  }
  if (path.includes('/campus') || hash.includes('/campus') || hash.includes('campus')) {
    return { type: 'campus' };
  }
  if (path.includes('/locations/madhapur') || hash.includes('/locations/madhapur') || hash.includes('madhapur')) {
    return { type: 'madhapur' };
  }
  if (path.includes('/locations/hyderabad') || hash.includes('/locations/hyderabad') || hash.includes('hyderabad')) {
    return { type: 'hyderabad' };
  }
  if (path.includes('/exam-fees') || hash.includes('/exam-fees') || hash.includes('exam-fees')) {
    return { type: 'exam-fees' };
  }
  if (path.includes('/professionals') || hash.includes('/professionals') || hash.includes('professionals')) {
    return { type: 'professionals' };
  }

  // Articles: /guides/:slug or /blog/:slug
  const guideMatch = path.match(/^\/(?:guides|blog)\/([a-z0-9-]+)/) || hash.match(/#(?:guides|blog)\/([a-z0-9-]+)/);
  if (guideMatch && guideMatch[1]) {
    return { type: 'article', slug: guideMatch[1] };
  }
  if (path === '/guides' || path === '/blog' || hash.includes('guides') || hash.includes('blog')) {
    return { type: 'guides' };
  }

  return { type: 'home' };
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(getActiveRoute());

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(getActiveRoute());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(getActiveRoute());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Modals & Funnel State ──────────────────────────────────────────────────
  const [leadModalOpen,    setLeadModalOpen]    = useState(false);
  const [selectedExam,     setSelectedExam]     = useState('GRE');

  const [bookingOpen,      setBookingOpen]      = useState(false);
  const [agreementOpen,    setAgreementOpen]    = useState(false);

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

  // ── 1. Secure Admin Portal Route ───────────────────────────────────────────
  if (currentRoute.type === 'admin') {
    return <AdminLoginGate onNavigateHome={() => navigate('/')} />;
  }

  // ── 2. Render Page Content According to Active Route ────────────────────────
  const renderContent = () => {
    switch (currentRoute.type) {
      case 'campus':
        return <CampusPage onOpenBooking={handleOpenFunnel} onNavigate={navigate} />;

      case 'hyderabad':
        return <HyderabadHubPage onOpenBooking={handleOpenFunnel} onNavigate={navigate} />;

      case 'madhapur':
        return <MadhapurHubPage onOpenBooking={handleOpenFunnel} onNavigate={navigate} />;

      case 'exam-fees':
        return <ExamPriceTrackerPage onOpenBooking={handleOpenFunnel} onNavigate={navigate} />;

      case 'professionals':
        return <ProfessionalsPage onOpenBooking={handleOpenFunnel} onNavigate={navigate} />;

      case 'guides':
        return <BlogDirectoryPage onOpenBooking={handleOpenFunnel} onNavigate={navigate} />;

      case 'article':
        return <ArticlePage slug={currentRoute.slug} onOpenBooking={handleOpenFunnel} onNavigate={navigate} />;

      case 'home':
      default:
        return (
          <div className="min-h-screen bg-white flex flex-col font-[Inter,system-ui,sans-serif] antialiased w-full max-w-full overflow-x-hidden">
            {/* Navigation */}
            <Navbar onOpenBooking={handleOpenFunnel} onNavigate={navigate} />

            <main className="flex-grow w-full max-w-full overflow-x-hidden">
              {/* 1. HERO — The Smarter Way to Book Your Exam */}
              <Hero onBookTest={handleOpenFunnel} />

              {/* 2. EXAMS WE SUPPORT + TODAY'S EXAM PRICES + ₹199 SERVICE + 4 PILLARS */}
              <PriceProof
                onBookTest={handleOpenFunnel}
                onOpenAgreement={() => setAgreementOpen(true)}
              />

              {/* 3. HOW IT WORKS — Get Registered in 4 Simple Steps */}
              <HowItWorksAndDeciding onBookTest={handleOpenFunnel} />

              {/* 4. TESTLY CAMPUS — For Colleges, Universities & Study Abroad Cells */}
              <CampusBanner
                onOpenBooking={handleOpenFunnel}
                onNavigate={navigate}
              />

              {/* 5. WHY STUDENTS SAY — Trusted by Thousands Across India */}
              <StudentReviews onBookTest={handleOpenFunnel} />

              {/* 6. RESOURCES — Everything You Need to Plan Your Exam */}
              <ExamResources onNavigate={navigate} />

              {/* 7. FREQUENTLY ASKED QUESTIONS — Still Have Questions? */}
              <FAQSection onBookTest={handleOpenFunnel} />
            </main>

            {/* Footer with subtle staff login */}
            <Footer
              onOpenAdmin={() => navigate('/admin')}
              onNavigate={navigate}
              onOpenAgreement={() => setAgreementOpen(true)}
            />
          </div>
        );
    }
  };

  return (
    <>
      {renderContent()}

      {/* ── High-Converting Lead Capture Modal ────────────────────── */}
      <LeadCaptureModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        defaultTest={selectedExam}
        onOpenAgreement={() => setAgreementOpen(true)}
      />

      {/* ── Candidate Agency Agreement Modal (Indian Contract Act 1872) ─ */}
      <CandidateAgencyAgreementModal
        isOpen={agreementOpen}
        onClose={() => setAgreementOpen(false)}
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

      {/* ── Mobile Sticky Conversion Bar ─────────────────────────── */}
      <MobileStickyBar onOpenBooking={handleOpenFunnel} />

      {/* ── WhatsApp Help Widget ──────────────────────────────────── */}
      <WhatsAppWidget />

      {/* ── Live Activity Social Proof Toast ──────────────────────── */}
      <LiveActivityToast />

      {/* ── Exit-Intent Quota Hold Modal ──────────────────────────── */}
      <ExitIntentModal
        onOpenBooking={handleOpenFunnel}
        isAnyModalOpen={leadModalOpen || bookingOpen || agreementOpen || engineOpen || dashboardOpen || authOpen || searchOpen}
      />
    </>
  );
}
