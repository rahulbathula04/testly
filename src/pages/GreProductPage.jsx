import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Play,
  CheckCircle2,
  FileText,
  BarChart3,
  Target,
  BookOpen,
  Compass,
  ChevronDown,
  Search,
  User,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  Clock,
  ExternalLink
} from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import Footer from '../components/Footer';
import GreHeroScoreCard from '../components/gre/GreHeroScoreCard';
import GreOverviewModal from '../components/gre/GreOverviewModal';
import GreOnboardingModal from '../components/gre/GreOnboardingModal';
import GreLoginModal from '../components/gre/GreLoginModal';
import GreDiagnosticRunner from '../components/gre/GreDiagnosticRunner';
import GreReportView from '../components/gre/GreReportView';
import GrePracticeEngine from '../components/gre/GrePracticeEngine';
import { evaluateDiagnosticAttempt } from '../data/gre/greDiagnosticEngine';
import { testly100Service } from '../services/testly100Service';

const TESTIMONIALS = [
  {
    quote: "Helped me understand my weak areas. Improved my score by 12 points in the real GRE!",
    name: "Aarav K.",
    meta: "MS, Fall 2025",
    avatar: "/assets/images/student-avatar-1.jpg"
  },
  {
    quote: "The report was super detailed and actually useful. Worth it!",
    name: "Ishita R.",
    meta: "MBA, Fall 2026",
    avatar: "/assets/images/student-avatar-sneha.jpg"
  },
  {
    quote: "Gave me the confidence to book my GRE at the right time.",
    name: "Rohan S.",
    meta: "MS, Fall 2026",
    avatar: "/assets/images/student-avatar-2.jpg"
  }
];

export default function GreProductPage({ subview = 'landing', onNavigate, onOpenBooking }) {
  // View mode: 'landing' | 'mock' | 'report' | 'practice'
  const [viewMode, setViewMode] = useState(
    subview === 'diagnostic' ? 'mock' : subview === 'report' ? 'report' : subview === 'practice' ? 'practice' : 'landing'
  );

  // Modals state
  const [overviewModalOpen, setOverviewModalOpen] = useState(false);
  const [onboardingModalOpen, setOnboardingModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [examsDropdownOpen, setExamsDropdownOpen] = useState(false);

  // Diagnostic result state
  const [diagnosticResult, setDiagnosticResult] = useState(null);
  const [activeCandidate, setActiveCandidate] = useState(null);

  // Check existing session
  useEffect(() => {
    const session = testly100Service.getActiveCandidateSession();
    if (session) {
      setActiveCandidate(session);
    }
  }, []);

  // Sync subview changes
  useEffect(() => {
    if (subview === 'diagnostic') setViewMode('mock');
    else if (subview === 'report' || subview === 'results') setViewMode('report');
    else if (subview === 'practice') setViewMode('practice');
    else setViewMode('landing');
  }, [subview]);

  // Handle mock test completion from GreDiagnosticRunner
  const handleDiagnosticComplete = async (responses) => {
    const evaluated = evaluateDiagnosticAttempt(responses);
    setDiagnosticResult(evaluated);

    if (activeCandidate?.seatId) {
      await testly100Service.submitAssessment(activeCandidate.seatId, {
        quantScore: evaluated.quantScore,
        verbalScore: evaluated.verbalScore,
        accuracyPct: evaluated.accuracyPct,
        sectionBreakdown: evaluated.sectionBreakdown,
        skillMatrix: evaluated.skillMatrix,
        recommendedFocus: evaluated.recommendedFocus,
        studyPlan: evaluated.studyPlan,
      });
    }

    setViewMode('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchMock = (candidateData) => {
    setActiveCandidate(candidateData);
    setOnboardingModalOpen(false);
    setViewMode('mock');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (authRes) => {
    setActiveCandidate({
      name: authRes.application?.full_name || 'Candidate',
      seatId: authRes.participant.seat_id
    });
    if (authRes.report) {
      setDiagnosticResult(authRes.report);
      setViewMode('report');
    }
  };

  // ── 1. ACTIVE MOCK TEST RUNNER ──
  if (viewMode === 'mock') {
    return (
      <div className="min-h-screen bg-slate-900">
        <GreDiagnosticRunner
          onComplete={handleDiagnosticComplete}
          onExit={() => setViewMode('landing')}
        />
      </div>
    );
  }

  // ── 2. DIAGNOSTIC REPORT VIEW ──
  if (viewMode === 'report') {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-sans text-[#0F172A]">
        {/* Simple Top Bar */}
        <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40 px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setViewMode('landing')}>
            <BrandLogo variant="horizontal" size="sm" />
            <span className="text-xs font-serif font-bold text-slate-400">/ GRE Diagnostic</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('mock')}
              className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Mock</span>
            </button>
            <button
              onClick={() => setViewMode('landing')}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#0F172A] text-white hover:bg-[#1E3A8A] transition-colors"
            >
              Back to Overview
            </button>
          </div>
        </header>

        <main className="flex-grow p-4 sm:p-6 lg:p-8">
          <GreReportView
            diagnosticResult={diagnosticResult}
            onRetakeDiagnostic={() => setViewMode('mock')}
            onStartPractice={() => setViewMode('practice')}
            onExploreMocks={() => setViewMode('landing')}
          />
        </main>

        <Footer onNavigate={onNavigate} onOpenAgreement={() => {}} />
      </div>
    );
  }

  // ── 3. PRACTICE DRILLS ENGINE ──
  if (viewMode === 'practice') {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-sans text-[#0F172A]">
        <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40 px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setViewMode('landing')}>
            <BrandLogo variant="horizontal" size="sm" />
            <span className="text-xs font-serif font-bold text-slate-400">/ Practice Drills</span>
          </div>
          <button
            onClick={() => setViewMode('landing')}
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#0F172A] text-white hover:bg-[#1E3A8A] transition-colors"
          >
            Back to GRE Overview
          </button>
        </header>

        <main className="flex-grow max-w-4xl mx-auto w-full p-4 sm:p-6">
          <GrePracticeEngine />
        </main>

        <Footer onNavigate={onNavigate} onOpenAgreement={() => {}} />
      </div>
    );
  }

  // ── 4. MAIN LANDING PAGE (MATCHING REFERENCE IMAGE) ──
  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans antialiased flex flex-col selection:bg-[#EBF3FF] selection:text-[#1E3A8A]">
      
      {/* ── Top Navigation Bar (Reference Layout) ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('/');
              }}
              className="flex items-center gap-2 select-none group cursor-pointer"
            >
              <BrandLogo variant="horizontal" size="md" />
            </a>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-6 text-[13.5px] font-medium text-[#334155]">
              {/* Exams with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setExamsDropdownOpen(!examsDropdownOpen)}
                  className="flex items-center gap-1 hover:text-[#0F172A] transition-colors py-2 cursor-pointer"
                >
                  <span>Exams</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {examsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 text-xs space-y-0.5">
                    {['GRE General', 'TOEFL iBT', 'PTE Academic', 'IELTS Academic', 'GMAT Focus', 'Duolingo'].map((exam) => (
                      <button
                        key={exam}
                        onClick={() => {
                          setExamsDropdownOpen(false);
                          if (exam === 'GRE General') {
                            setViewMode('landing');
                          } else if (onNavigate) {
                            onNavigate('/exam-fees');
                          }
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 text-slate-700 hover:text-[#1E3A8A] font-medium transition-colors"
                      >
                        {exam}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Active Tab: Testly GRE */}
              <button
                onClick={() => setViewMode('landing')}
                className="relative py-2 text-[#0F172A] font-bold cursor-pointer"
              >
                <span>Testly GRE</span>
                {/* Active Indicator Underline */}
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#3B82F6] rounded-full" />
              </button>

              {/* Practice */}
              <button
                onClick={() => setViewMode('practice')}
                className="hover:text-[#0F172A] transition-colors py-2 cursor-pointer"
              >
                Practice
              </button>

              {/* Resources */}
              <button
                onClick={() => onNavigate && onNavigate('/guides')}
                className="hover:text-[#0F172A] transition-colors py-2 cursor-pointer"
              >
                Resources
              </button>

              {/* For Institutions */}
              <button
                onClick={() => onNavigate && onNavigate('/campus')}
                className="hover:text-[#0F172A] transition-colors py-2 cursor-pointer"
              >
                For Institutions
              </button>
            </nav>
          </div>

          {/* Right Action Group */}
          <div className="flex items-center gap-3">
            {/* Search Icon */}
            <button
              onClick={() => onOpenBooking ? onOpenBooking('GRE') : null}
              className="p-2 text-slate-500 hover:text-[#0F172A] hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              aria-label="Search"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Login Button */}
            <button
              onClick={() => setLoginModalOpen(true)}
              className="px-4 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-[#0F172A] hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer hidden sm:block"
            >
              {activeCandidate ? `Seat: ${activeCandidate.seatId || 'Active'}` : 'Login'}
            </button>

            {/* Start GRE Mock CTA Button */}
            <button
              onClick={() => setOnboardingModalOpen(true)}
              className="px-4 sm:px-5 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Start GRE Mock</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
            </button>
          </div>

        </div>
      </header>

      {/* ── HERO SECTION WITH MOUNTAIN BACKGROUND ── */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
        
        {/* Panoramic Mountain Landscape Background */}
        <div
          className="absolute inset-0 bg-cover bg-top pointer-events-none opacity-90 transition-opacity"
          style={{
            backgroundImage: "url('/assets/images/gre-hero-mountains.jpg')"
          }}
        />

        {/* Soft bottom gradient fade to white page canvas */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/50 to-white pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Handwritten Sky Annotation (Reference matching) */}
          <div className="hidden lg:flex items-center justify-end pr-20 mb-2 relative">
            <div className="flex items-center gap-2 transform -rotate-3 select-none">
              <span className="font-['Caveat',cursive] text-2xl text-[#1E3A8A] font-bold tracking-wide">
                A clearer path to your global dreams.
              </span>
              <svg className="w-8 h-8 text-[#1E3A8A] stroke-current fill-none -scale-y-100" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Value Proposition & Copy */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Eyebrow */}
              <div className="text-xs font-bold uppercase tracking-wider text-[#3B82F6]">
                TESTLY GRE MOCK TEST
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-serif font-bold text-[#0F172A] tracking-tight leading-[1.08]">
                Don’t Step Into GRE <br />
                Without Knowing <br />
                Where You Stand.
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-xl font-normal">
                Take a real test-like GRE mock, get your predicted score, identify gaps, and plan your preparation — before you spend <strong className="text-[#0F172A] font-bold">₹25,522</strong> on the official test.
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1E3A8A] flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-3.5 h-3.5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0F172A]">Real test experience</div>
                    <div className="text-[11px] text-[#64748B]">Same format, real timing</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1E3A8A] flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0F172A]">Personalized insights</div>
                    <div className="text-[11px] text-[#64748B]">Know your strengths & gaps</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1E3A8A] flex items-center justify-center shrink-0 mt-0.5">
                    <RotateCcw className="w-3.5 h-3.5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0F172A]">Plan with confidence</div>
                    <div className="text-[11px] text-[#64748B]">Prep smarter, score higher</div>
                  </div>
                </div>
              </div>

              {/* CTAs Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                <button
                  onClick={() => setOnboardingModalOpen(true)}
                  className="px-7 py-3.5 rounded-xl bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start Your GRE Mock Test</span>
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </button>

                <button
                  onClick={() => setOverviewModalOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#0F172A] text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 text-[#1E3A8A] fill-current" />
                  <span>Watch 1 Min Overview</span>
                </button>
              </div>

              {/* Social Proof */}
              <div className="text-xs text-[#64748B] pt-1">
                Trusted by 10,000+ GRE aspirants
              </div>
            </div>

            {/* Right Column: Floating Interactive Score Card */}
            <div className="lg:col-span-5 flex justify-center">
              <GreHeroScoreCard onStartMock={() => setOnboardingModalOpen(true)} />
            </div>

          </div>
        </div>
      </section>

      {/* ── PRICE COMPARISON & TESTLY ADVANTAGE (2 Cards) ── */}
      <section className="py-10 sm:py-14 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            
            {/* Left Card: Official GRE Exam Fee */}
            <div className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-50/80 border border-blue-100 text-[#3B82F6] flex items-center justify-center shrink-0">
                <FileText className="w-7 h-7" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#64748B]">GRE Official Exam Fee</span>
                <div className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] tracking-tight">
                  ₹25,522
                </div>
                <div className="text-[11px] text-[#64748B]">(as per ETS official website)</div>
              </div>
            </div>

            {/* Right Card: Your Testly Advantage */}
            <div className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-50/80 border border-blue-100 text-[#3B82F6] flex items-center justify-center shrink-0">
                <BarChart3 className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#0F172A]">Your Testly Advantage</h4>
                <ul className="space-y-1.5 text-xs text-[#334155] font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Know your current level before you spend</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Focus on the right topics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Improve with a data-driven study plan</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MORE THAN A MOCK TEST (4 Feature Cards) ── */}
      <section className="py-16 sm:py-20 bg-[#FAF9F6] border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
              A SMARTER WAY TO PREPARE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] tracking-tight">
              More Than a Mock Test
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Testly GRE is a complete diagnostic experience designed to give you clarity, not just a score.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1 */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-3 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#3B82F6] flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Real GRE Format</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Same section structure, question types and timing.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-3 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#3B82F6] flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Detailed Performance Report</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                See your estimated score, percentile and topic-wise analysis.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-3 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#3B82F6] flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Identify Weak Areas</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Know exactly what to work on, with personalized recommendations.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-3 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#3B82F6] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Plan Your Preparation</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Get a clear roadmap based on your performance.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── HOW IT WORKS (3 Simple Steps) ── */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] tracking-tight">
              Get Your GRE Readiness Score in 3 Simple Steps
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 relative">
            
            {/* Step 1 */}
            <div className="flex items-start gap-4 flex-1">
              <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-200 text-[#1E3A8A] font-bold text-base flex items-center justify-center shrink-0">
                1
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#0F172A]">Take the Mock Test</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Complete all sections in a timed, test-like environment.
                </p>
              </div>
            </div>

            {/* Arrow 1 */}
            <div className="hidden md:block text-slate-300 text-xl font-mono px-2">
              →
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 flex-1">
              <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-200 text-[#1E3A8A] font-bold text-base flex items-center justify-center shrink-0">
                2
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#0F172A]">Get Your Detailed Report</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Receive your estimated score, section-wise analysis and insights.
                </p>
              </div>
            </div>

            {/* Arrow 2 */}
            <div className="hidden md:block text-slate-300 text-xl font-mono px-2">
              →
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 flex-1">
              <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-200 text-[#1E3A8A] font-bold text-base flex items-center justify-center shrink-0">
                3
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#0F172A]">Plan & Improve</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Follow personalized suggestions and track your progress.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ("Trusted by GRE Aspirants") ── */}
      <section className="py-14 sm:py-18 bg-[#FAF9F6] border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Header */}
            <div className="lg:col-span-3 space-y-1">
              <span className="text-xs font-bold text-[#64748B] block">Trusted by</span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] leading-tight">
                GRE Aspirants
              </h3>
            </div>

            {/* Right 3 Testimonial Cards */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-5 flex flex-col justify-between space-y-4"
                >
                  <p className="text-xs text-[#334155] leading-relaxed italic">
                    "{t.quote}"
                  </p>
                  
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=1E3A8A&color=fff`;
                      }}
                    />
                    <div>
                      <div className="text-xs font-bold text-[#0F172A]">{t.name}</div>
                      <div className="text-[10.5px] text-[#64748B]">{t.meta}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ── BOTTOM CTA BANNER (Dark Navy Wave) ── */}
      <section className="py-16 sm:py-20 bg-[#0A1628] text-white relative overflow-hidden">
        {/* Subtle decorative wave / glow */}
        <div className="absolute inset-0 bg-radial from-blue-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              TAKE THE FIRST STEP
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Know Your GRE Readiness Today
            </h2>
            <p className="text-sm text-slate-300">
              A small step now can save you time, money, and a lot of uncertainty later.
            </p>
          </div>

          {/* Right Button & Micro-copy */}
          <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
            <button
              onClick={() => setOnboardingModalOpen(true)}
              className="px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-[#0F172A] text-sm font-bold transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 cursor-pointer"
            >
              <span>Start GRE Mock Test</span>
              <ArrowRight className="w-4 h-4 text-[#1E3A8A]" />
            </button>
            <span className="text-[11px] text-slate-400">
              No registration fee. Instant access.
            </span>
          </div>

        </div>
      </section>

      {/* ── Global Footer ── */}
      <Footer onNavigate={onNavigate} onOpenAgreement={() => {}} />

      {/* ── Modals ── */}
      <GreOverviewModal
        isOpen={overviewModalOpen}
        onClose={() => setOverviewModalOpen(false)}
        onStartMock={() => setOnboardingModalOpen(true)}
      />

      <GreOnboardingModal
        isOpen={onboardingModalOpen}
        onClose={() => setOnboardingModalOpen(false)}
        onLaunchMock={handleLaunchMock}
      />

      <GreLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
