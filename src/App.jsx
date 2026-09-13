import React, { useState } from 'react';
import UrgencyBanner from './components/UrgencyBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TestStrip from './components/TestStrip';
import ProfessionalServices from './components/ProfessionalServices';
import SavingsCalculator from './components/SavingsCalculator';
import PracticePlatform from './components/PracticePlatform';
import TestCatalog from './components/TestCatalog';
import HowItWorks from './components/HowItWorks';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

// Practice Engine Components
import PracticeDashboard from './components/practice/PracticeDashboard';
import TestEngineModal from './components/practice/TestEngineModal';

// Modals
import BookingFlowModal from './components/BookingFlowModal';
import PracticeDashboardModal from './components/PracticeDashboardModal';
import FreeMockModal from './components/FreeMockModal';
import AuthModal from './components/AuthModal';
import SearchModal from './components/SearchModal';
import WhatsAppWidget from './components/WhatsAppWidget';

import AdminAuditDashboard from './components/admin/AdminAuditDashboard';

import HyderabadLocalSupport from './components/HyderabadLocalSupport';
import CouponSavingsCenter from './components/CouponSavingsCenter';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingTest, setSelectedBookingTest] = useState('TOEFL');
  
  const [practiceEngineOpen, setPracticeEngineOpen] = useState(false);
  const [practiceEngineMode, setPracticeEngineMode] = useState('MOCK');
  const [practiceEngineExam, setPracticeEngineExam] = useState('GRE');

  const [practiceDashboardOpen, setPracticeDashboardOpen] = useState(false);
  const [freeMockModalOpen, setFreeMockModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [adminAuditOpen, setAdminAuditOpen] = useState(false);

  const handleOpenBooking = (testName = 'TOEFL') => {
    setSelectedBookingTest(testName);
    setBookingModalOpen(true);
  };

  const handleLaunchPracticeEngine = (mode = 'MOCK', exam = 'GRE') => {
    setPracticeEngineMode(mode);
    setPracticeEngineExam(exam);
    setPracticeEngineOpen(true);
  };

  const handleOpenFreeMock = () => {
    handleLaunchPracticeEngine('MOCK', 'GRE');
  };

  const handleOpenDashboard = () => {
    setPracticeDashboardOpen(true);
  };

  const handleOpenAuth = () => {
    setAuthModalOpen(true);
  };

  const handleOpenSearch = () => {
    setSearchModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7FAFF] flex flex-col font-sans selection:bg-[#1769E0] selection:text-white relative">
      
      {/* Announcement Banner */}
      <UrgencyBanner 
        onOpenBooking={handleOpenBooking} 
      />

      {/* Navigation Header */}
      <Navbar 
        onOpenBooking={handleOpenBooking}
        onOpenFreeMock={handleOpenFreeMock}
        onOpenAuth={handleOpenAuth}
        onOpenSearch={handleOpenSearch}
      />

      {/* Main Homepage Sections */}
      <main className="flex-grow">
        
        {/* 1. HERO */}
        <Hero 
          onBookTest={handleOpenBooking}
          onOpenFreeMock={handleOpenFreeMock}
        />

        {/* 2. TEST STRIP */}
        <TestStrip 
          onSelectTest={handleOpenBooking}
        />

        {/* 3. HOW IT WORKS - 3 SIMPLE STEPS EXPLAINER */}
        <HowItWorks 
          onBookService={handleOpenBooking}
          onOpenFreeMock={handleOpenFreeMock}
        />

        {/* 4. PROFESSIONAL SERVICES */}
        <ProfessionalServices 
          onBookService={handleOpenBooking}
        />

        {/* 4B. HYDERABAD LOCAL OFFLINE SUPPORT HUBS (MADHAPUR 5KM RADIUS) */}
        <HyderabadLocalSupport 
          onBookService={handleOpenBooking}
          onOpenFreeMock={handleOpenFreeMock}
        />

        {/* 5. PRICE COMPARISON & CALCULATOR */}
        <SavingsCalculator 
          onBookTest={handleOpenBooking}
        />

        {/* 5B. COUPONS & SAVINGS CENTER */}
        <CouponSavingsCenter 
          onBookTest={handleOpenBooking}
          onOpenFreeMock={handleOpenFreeMock}
        />

        {/* 5. PRACTICE & MOCK TESTS ENGINE HUB (100% FREE & UNLIMITED) */}
        <PracticeDashboard 
          onLaunchEngine={handleLaunchPracticeEngine}
        />

        {/* 6. PRACTICE PLATFORM */}
        <PracticePlatform 
          onOpenFreeMock={handleOpenFreeMock}
        />

        {/* 7. CHOOSE YOUR TEST */}
        <TestCatalog 
          onSelectTest={handleOpenBooking}
        />

        {/* 8. FINAL CONVERSION CTA */}
        <FinalCTA 
          onBookTest={handleOpenBooking}
          onOpenFreeMock={handleOpenFreeMock}
        />

      </main>

      {/* FOOTER */}
      <Footer 
        onBookTest={handleOpenBooking}
        onOpenFreeMock={handleOpenFreeMock}
      />

      {/* Admin / Auditor Quick Launch Floating Badge */}
      <button
        onClick={() => setAdminAuditOpen(true)}
        className="fixed bottom-4 left-4 z-40 bg-[#1E293B] hover:bg-[#1769E0] text-slate-300 hover:text-white text-[11px] font-black px-3 py-1.5 rounded-full border border-slate-700 shadow-lg flex items-center gap-1.5 transition-all"
        title="Open Admin IRT & Legal Compliance Console"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span>Admin Audit Console</span>
      </button>

      {/* Admin Audit Dashboard Modal */}
      {adminAuditOpen && (
        <AdminAuditDashboard onClose={() => setAdminAuditOpen(false)} />
      )}

      {/* Full-Screen Testly Test Engine Modal */}
      <TestEngineModal 
        isOpen={practiceEngineOpen}
        onClose={() => setPracticeEngineOpen(false)}
        mode={practiceEngineMode}
        defaultExam={practiceEngineExam}
      />

      {/* Modals & Booking Flow */}
      <BookingFlowModal 
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultTest={selectedBookingTest}
        onOpenDashboard={handleOpenDashboard}
      />

      <PracticeDashboardModal 
        isOpen={practiceDashboardOpen}
        onClose={() => setPracticeDashboardOpen(false)}
      />

      <FreeMockModal 
        isOpen={freeMockModalOpen}
        onClose={() => setFreeMockModalOpen(false)}
      />

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <SearchModal 
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onBookTest={handleOpenBooking}
        onCheckPrice={handleOpenBooking}
      />

      {/* WhatsApp Help Widget */}
      <WhatsAppWidget />

    </div>
  );
}
