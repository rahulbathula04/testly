import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Analytics } from '@vercel/analytics/react';

// ── Scalable Error Boundary ──────────────────────────────────────────────────
import ErrorBoundary        from './components/ErrorBoundary';

// ── Critical landing page sections (eager loaded for fastest First Paint) ────
import Navbar               from './components/Navbar';
import Hero                 from './components/Hero';
import PriceProof           from './components/PriceProof';
import HowItWorksAndDeciding from './components/HowItWorksAndDeciding';
import BrandValues          from './components/BrandValues';
import CampusBanner         from './components/CampusBanner';
import StudentReviews       from './components/StudentReviews';
import ExamResources        from './components/ExamResources';
import FAQSection           from './components/FAQSection';
import Footer               from './components/Footer';

// ── Core Lightweight Modals ──────────────────────────────────────────────────
import LeadCaptureModal     from './components/LeadCaptureModal';
import AuthModal            from './components/AuthModal';
import SearchModal          from './components/SearchModal';
import WhatsAppWidget       from './components/WhatsAppWidget';
import ExitIntentModal      from './components/ExitIntentModal';

// ── Code-Split Secondary Pages (Lazy loaded for peak mobile performance) ────
const HyderabadHubPage     = lazy(() => import('./pages/HyderabadHubPage'));
const MadhapurHubPage      = lazy(() => import('./pages/MadhapurHubPage'));
const ExamPriceTrackerPage = lazy(() => import('./pages/ExamPriceTrackerPage'));
const ProfessionalsPage    = lazy(() => import('./pages/ProfessionalsPage'));
const BlogDirectoryPage    = lazy(() => import('./pages/BlogDirectoryPage'));
const ArticlePage          = lazy(() => import('./pages/ArticlePage'));
const CampusPage           = lazy(() => import('./pages/CampusPage'));
const FounderPage          = lazy(() => import('./pages/FounderPage'));
const GreProductPage       = lazy(() => import('./pages/GreProductPage'));
const LocationHubPage      = lazy(() => import('./pages/LocationHubPage'));
const AssessmentIntelligencePage = lazy(() => import('./pages/AssessmentIntelligencePage'));
const AssessmentEngineCommandCenter = lazy(() => import('./components/admin/AssessmentEngineCommandCenter'));
const Testly100InvitePage   = lazy(() => import('./pages/Testly100InvitePage'));
const Testly100AssessmentPage = lazy(() => import('./pages/Testly100AssessmentPage'));
const Testly100ReportPage   = lazy(() => import('./pages/Testly100ReportPage'));

// ── Code-Split Heavy Modals (Lazy loaded on demand) ───────────────────────────
const BookingFlowModal     = lazy(() => import('./components/BookingFlowModal'));
const CandidateAgencyAgreementModal = lazy(() => import('./components/CandidateAgencyAgreementModal'));
const TestEngineModal      = lazy(() => import('./components/practice/TestEngineModal'));
const PracticeDashboardModal = lazy(() => import('./components/PracticeDashboardModal'));
const AdminLoginGate       = lazy(() => import('./components/admin/AdminLoginGate'));

// ── Lightweight Suspense Fallback ───────────────────────────────────────────
function PageLoadingFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-3 font-[Inter,system-ui,sans-serif]">
      <div className="w-8 h-8 rounded-full border-2 border-[#1E3A8A] border-t-transparent animate-spin" />
      <span className="text-xs font-semibold text-[#64748B] tracking-wide">Loading Testly...</span>
    </div>
  );
}

function getActiveRoute() {
  if (typeof window === 'undefined') return { type: 'home' };
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();

  if (path.includes('/admin/assessment-engine') || hash.includes('admin/assessment-engine')) {
    return { type: 'admin-assessment-engine' };
  }
  if (path.startsWith('/admin') || hash.includes('admin') || search.includes('admin')) {
    return { type: 'admin' };
  }

  // ── TESTLY 100 Private Diagnostic Routes ────────────────────────────────────
  if (path.includes('/testly-100/assessment') || path.includes('/testly100/assessment') || hash.includes('testly-100/assessment')) {
    return { type: 'testly-100-assessment' };
  }
  const reportMatch = path.match(/\/testly-100\/report(?:\/([a-zA-Z0-9_-]+))?/) || hash.match(/#(?:testly-100\/report|report)(?:\/([a-zA-Z0-9_-]+))?/);
  if (reportMatch) {
    return { type: 'testly-100-report', reportId: reportMatch[1] || null };
  }

  // Support /i/:token, /i, /invite/:token, /invite/testly-100, /testly100, /testly-100
  const iMatch = path.match(/^\/i(?:\/([a-zA-Z0-9_-]+))?/) || hash.match(/#(?:i|invite)(?:\/([a-zA-Z0-9_-]+))?/);
  const inviteMatch = path.match(/^\/invite(?:\/([a-zA-Z0-9_-]+))?/);
  if (
    iMatch ||
    inviteMatch ||
    path.startsWith('/invite') ||
    path === '/testly-100' ||
    path === '/testly100' ||
    hash.includes('invite/testly-100') ||
    hash.includes('testly-100')
  ) {
    const token = (iMatch && iMatch[1]) || (inviteMatch && inviteMatch[1]) || null;
    return { type: 'testly-100-invite', inviteToken: token };
  }

  // Dedicated Testly GRE Product Vertical (Public Mocks & Diagnostics Preserved)
  const greMatch = path.match(/^\/(?:gre|assessment\/gre)(?:\/([a-z0-9-]+))?/) || hash.match(/#(?:gre|assessment\/gre)(?:\/([a-z0-9-]+))?/);
  if (greMatch || path === '/gre' || hash.includes('/gre') || hash === '#gre') {
    const subview = greMatch ? greMatch[1] : null;
    return { type: 'gre', subview: subview || 'intelligence' };
  }
  if (path.includes('/assessment-intelligence') || hash.includes('assessment-intelligence') || path.includes('/assessment-engine') || hash.includes('assessment-engine')) {
    return { type: 'assessment-intelligence' };
  }
  if (path.includes('/campus') || hash.includes('/campus') || hash.includes('campus')) {
    return { type: 'campus' };
  }
  if (path.includes('/locations/madhapur') || hash.includes('locations/madhapur') || hash.includes('madhapur')) {
    return { type: 'madhapur' };
  }
  if (path.includes('/locations/hyderabad') || hash.includes('/locations/hyderabad') || hash.includes('hyderabad')) {
    return { type: 'hyderabad' };
  }
  const locMatch = path.match(/^\/locations\/([a-z0-9_-]+)/) || hash.match(/#(?:locations)\/([a-z0-9_-]+)/);
  if (locMatch && locMatch[1]) {
    return { type: 'location', city: locMatch[1].toLowerCase().replace('-', '_') };
  }
  if (path.includes('/exam-fees') || hash.includes('/exam-fees') || hash.includes('exam-fees')) {
    return { type: 'exam-fees' };
  }
  if (path.includes('/professionals') || hash.includes('/professionals') || hash.includes('professionals')) {
    return { type: 'professionals' };
  }
  if (path.includes('/about') || hash.includes('about') || path.includes('/founder') || hash.includes('founder')) {
    return { type: 'about' };
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
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoadingFallback />}>
          <AdminLoginGate onNavigateHome={() => navigate('/')} />
        </Suspense>
      </ErrorBoundary>
    );
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

      case 'location':
        return <LocationHubPage city={currentRoute.city} onOpenBooking={handleOpenFunnel} onNavigate={navigate} />;

      case 'exam-fees':
        return <ExamPriceTrackerPage onOpenBooking={handleOpenFunnel} onNavigate={navigate} />;

      case 'professionals':
        return <ProfessionalsPage onOpenBooking={handleOpenFunnel} onNavigate={navigate} />;

      case 'guides':
        return <BlogDirectoryPage onOpenBooking={handleOpenFunnel} onNavigate={navigate} />;

      case 'article':
        return <ArticlePage slug={currentRoute.slug} onOpenBooking={handleOpenFunnel} onNavigate={navigate} />;

      case 'about':
        return <FounderPage onOpenBooking={handleOpenFunnel} onNavigate={navigate} />;

      case 'gre':
        return <GreProductPage subview={currentRoute.subview} onOpenBooking={handleOpenFunnel} onNavigate={navigate} />;

      case 'assessment-intelligence':
        return <AssessmentIntelligencePage onOpenBooking={handleOpenFunnel} onNavigate={navigate} />;

      case 'admin-assessment-engine':
        return <AssessmentEngineCommandCenter onNavigateHome={() => navigate('/')} />;

      case 'testly-100-invite':
        return <Testly100InvitePage inviteToken={currentRoute.inviteToken} onNavigate={navigate} />;

      case 'testly-100-assessment':
        return <Testly100AssessmentPage onNavigate={navigate} />;

      case 'testly-100-report':
        return <Testly100ReportPage reportId={currentRoute.reportId} onNavigate={navigate} />;

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

              {/* 4. BRAND VALUES — 5 Core Pillars from Brand Guidelines */}
              <BrandValues />

              {/* 5. WHY STUDENTS SAY — Trusted by Thousands Across India */}
              <StudentReviews onBookTest={handleOpenFunnel} />

              {/* 6. TESTLY CAMPUS — Institutional Exam Vouchers & Campus Programs */}
              <CampusBanner
                onOpenBooking={handleOpenFunnel}
                onNavigate={navigate}
              />

              {/* 7. RESOURCES — Everything You Need to Plan Your Exam */}
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
    <ErrorBoundary>
      <Suspense fallback={<PageLoadingFallback />}>
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

        {/* ── Mobile Sticky Bar REMOVED (no sticky CTAs per UX direction) ── */}

        {/* ── WhatsApp Help Widget ──────────────────────────────────── */}
        <WhatsAppWidget />

        {/* ── Live Activity Toast REMOVED (per brand guidelines — no fake popups) */}
        {/* <LiveActivityToast /> */}

        {/* ── Exit-Intent Quota Hold Modal ──────────────────────────── */}
        <ExitIntentModal
          onOpenBooking={handleOpenFunnel}
          isAnyModalOpen={leadModalOpen || bookingOpen || agreementOpen || engineOpen || dashboardOpen || authOpen || searchOpen}
        />

        {/* ── Vercel Web Analytics ──────────────────────────────────── */}
        <Analytics />
      </Suspense>
    </ErrorBoundary>
  );
}
