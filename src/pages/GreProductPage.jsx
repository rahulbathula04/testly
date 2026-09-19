import React, { useState, useEffect } from 'react';
import {
  Lock,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  AlertCircle,
  Clock,
  CheckCircle2,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import GreNavbar from '../components/gre/GreNavbar';
import Navbar from '../components/Navbar';
import GreIntelligenceSpine from '../components/gre/GreIntelligenceSpine';
import GreDiagnosticRunner from '../components/gre/GreDiagnosticRunner';
import GreReportView from '../components/gre/GreReportView';
import GrePracticeEngine from '../components/gre/GrePracticeEngine';
import GreMockCenter from '../components/gre/GreMockCenter';
import Footer from '../components/Footer';
import BrandLogo from '../components/BrandLogo';
import { evaluateDiagnosticAttempt } from '../data/gre/greDiagnosticEngine';
import { testly100Service } from '../services/testly100Service';

export default function GreProductPage({ subview = 'intelligence', onNavigate, onOpenBooking }) {
  const [activeTab, setActiveTab] = useState(subview || 'intelligence');
  const [entitlement, setEntitlement] = useState(null); // { status: 'APPROVED' | 'UNDER_REVIEW' | 'REVOKED' | 'UNAUTHENTICATED' }
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [tokenInput, setTokenInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [diagnosticResult, setDiagnosticResult] = useState(null);

  // Check assessment entitlement on mount
  const checkAuth = async () => {
    setIsLoadingAuth(true);
    setLoginError('');
    // Check URL token parameter
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token') || params.get('seat');
    
    const res = await testly100Service.getAssessmentEntitlement(urlToken);
    setEntitlement(res);
    if (res.authorized && urlToken) {
      // Save session so candidate doesn't need to re-enter token
      testly100Service.setActiveCandidateSession({
        token: res.participant.access_token,
        seatId: res.participant.seat_id,
        name: res.application?.full_name
      });
    }
    setIsLoadingAuth(false);
  };

  useEffect(() => {
    checkAuth();
    const handleSessionChange = () => checkAuth();
    window.addEventListener('testly_candidate_session_changed', handleSessionChange);
    return () => window.removeEventListener('testly_candidate_session_changed', handleSessionChange);
  }, []);

  // Sync subview tab
  useEffect(() => {
    if (subview && ['intelligence', 'diagnostic', 'practice', 'mock', 'report', 'results'].includes(subview)) {
      setActiveTab(subview === 'results' ? 'report' : subview);
    }
  }, [subview]);

  // Load diagnostic report if available
  useEffect(() => {
    if (entitlement?.report) {
      setDiagnosticResult(entitlement.report);
    }
  }, [entitlement]);

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (onNavigate) {
      const url = tabId === 'intelligence' ? '/gre' : `/gre/${tabId}`;
      window.history.pushState({}, '', url);
    }
  };

  const handleManualLogin = async (e) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    setIsLoadingAuth(true);
    setLoginError('');

    const res = await testly100Service.getAssessmentEntitlement(tokenInput.trim());
    if (res.authorized) {
      setEntitlement(res);
      testly100Service.setActiveCandidateSession({
        token: res.participant.access_token,
        seatId: res.participant.seat_id,
        name: res.application?.full_name
      });
    } else {
      if (res.status === 'UNDER_REVIEW') {
        setEntitlement(res);
      } else if (res.status === 'REVOKED') {
        setLoginError('Access to the Testly 100 cohort assessment has been suspended.');
      } else {
        setLoginError('Invalid seat credentials. Please verify your Seat ID or apply below.');
      }
    }
    setIsLoadingAuth(false);
  };

  const handleDiagnosticComplete = async (responses) => {
    const evaluated = evaluateDiagnosticAttempt(responses);
    setDiagnosticResult(evaluated);

    if (entitlement?.participant) {
      await testly100Service.submitAssessment(entitlement.participant.id, {
        quantScore: evaluated.quantScore,
        verbalScore: evaluated.verbalScore,
        accuracyPct: evaluated.accuracyPct,
        sectionBreakdown: evaluated.sectionBreakdown,
        skillMatrix: evaluated.skillMatrix,
        recommendedFocus: evaluated.recommendedFocus,
        studyPlan: evaluated.studyPlan,
      });
    }

    setActiveTab('report');
    if (onNavigate) {
      window.history.pushState({}, '', '/gre/results');
    }
  };

  const handleSignOut = () => {
    testly100Service.clearActiveCandidateSession();
    setEntitlement({ status: 'UNAUTHENTICATED', authorized: false });
  };

  // 1. Loading State
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-8 font-[Inter,system-ui,sans-serif] text-xs">
        <div className="w-8 h-8 rounded-full border-2 border-[#0F172A] border-t-transparent animate-spin mb-3" />
        <span className="font-semibold text-slate-600">Verifying Testly 100 Entitlement...</span>
      </div>
    );
  }

  // 2. UNAUTHENTICATED: Pure Testly Brand Gate
  if (!entitlement || entitlement.status === 'UNAUTHENTICATED') {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-between font-[Inter,system-ui,sans-serif] text-[#0F172A] selection:bg-[#1E3A8A] selection:text-white">
        {/* Official Testly Master Navbar */}
        <Navbar onOpenBooking={onOpenBooking} onNavigate={onNavigate} />

        <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16 space-y-12">
          
          {/* Hero Section Matching Official Brand Board */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#64748B] block">
              THE SMARTER WAY TO BOOK YOUR EXAM.
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#0F172A] tracking-tight leading-[1.15]">
              Book Your Exam Smarter.<br />
              Know Where You Stand First.
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto leading-relaxed">
              The official GRE costs ₹25,522. Before scheduling, diagnose your readiness with Testly's private 100-participant diagnostic cohort — calibrated simulation, verified 2026 timing, and uninflated score reporting.
            </p>
          </div>

          {loginError && (
            <div className="max-w-xl mx-auto p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Signature Price & Value Card (Directly from Brand Board media_1789835832867.jpg) */}
          <div className="max-w-xl mx-auto bg-white rounded-3xl border border-[#E5E7EB] shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E3A8A] block">
                  EXCLUSIVE COHORT
                </span>
                <h2 className="text-xl font-serif font-bold text-[#0F172A]">
                  GRE Private Diagnostic Cohort
                </h2>
              </div>
              <span className="bg-[#0F172A] text-white text-[10.5px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                100 SEATS ONLY
              </span>
            </div>

            {/* Price & Savings Row */}
            <div className="flex items-baseline justify-between gap-4 pt-1">
              <div>
                <div className="text-xs text-slate-400 font-mono line-through">
                  ₹25,522
                </div>
                <div className="text-xs text-[#64748B]">Official Reference Fee</div>
                <div className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] mt-1">
                  ₹0
                </div>
                <div className="text-[11px] font-semibold text-[#1E3A8A]">
                  Complimentary with Approved Invitation
                </div>
              </div>

              {/* Amber Savings Tag from Brand Board */}
              <div className="bg-[#FEF3C7] text-[#D97706] font-bold text-xs px-3.5 py-2 rounded-xl border border-[#FDE68A] text-center shadow-xs">
                <span className="text-[10px] uppercase block font-semibold">You Save</span>
                <span className="text-sm font-black">₹25,522</span>
              </div>
            </div>

            {/* Soft Blue Feature Highlight */}
            <div className="p-3 bg-[#EBF3FF] rounded-xl border border-blue-100 text-xs text-[#1E3A8A] flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#1E3A8A] shrink-0" />
              <span>Strict limit: Exactly 100 approved seats with live telemetry monitoring.</span>
            </div>

            {/* Key Verified Features */}
            <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                <span>Calibrated against the shortened 2026 GRE General Test format (1 hr 58 min)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                <span>Section-adaptive routing logic with uninflated Testly Practice Report</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                <span>Instant diagnostic breakdown across 7 Quantitative & Verbal reasoning skills</span>
              </li>
            </ul>

            {/* Primary Action Button: Solid Ink #0F172A matching Brand Board */}
            <div className="space-y-3 pt-2">
              <a
                href="/i/testly-100"
                className="w-full py-3.5 bg-[#0F172A] text-white text-xs font-bold rounded-xl hover:bg-[#1E3A8A] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply for Testly 100 Access</span>
                <ArrowRight className="w-4 h-4 text-blue-300" />
              </a>

              <div className="pt-3 border-t border-slate-100">
                <div className="text-[11px] font-semibold text-slate-500 mb-2">
                  Already have an approved seat?
                </div>
                <form onSubmit={handleManualLogin} className="flex gap-2">
                  <input
                    type="text"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="Enter Seat ID (e.g. TESTLY-014)"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#0F172A] font-mono focus:outline-none focus:border-[#0F172A]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0F172A] text-white text-xs font-bold rounded-xl hover:bg-[#1E3A8A] transition-colors"
                  >
                    Enter
                  </button>
                </form>
              </div>
            </div>

          </div>

          {/* Brand Values Strip (Directly from Brand Board media_1789835832867.jpg) */}
          <div className="pt-8 border-t border-[#E5E7EB] grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#0F172A]">Trustworthy</div>
              <div className="text-[11px] text-[#64748B]">Verified & Transparent</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#0F172A]">Precise</div>
              <div className="text-[11px] text-[#64748B]">Accurate Information</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#0F172A]">Human</div>
              <div className="text-[11px] text-[#64748B]">Real Concierge Support</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#0F172A]">Efficient</div>
              <div className="text-[11px] text-[#64748B]">Simpler Process</div>
            </div>
          </div>

        </main>

        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  // 3. UNDER REVIEW: Candidate Application Pending
  if (entitlement.status === 'UNDER_REVIEW') {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-between font-[Inter,system-ui,sans-serif] text-[#0F172A]">
        <GreNavbar onNavigate={onNavigate} entitlement={entitlement} />

        <main className="max-w-xl mx-auto w-full px-4 py-16 my-auto text-center space-y-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
            <Clock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
              Application Under Review
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A]">
              Your Application is with Testly
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
              Testly administrators are reviewing your submission for the TESTLY 100 cohort. Assessment access unlocks automatically once your seat is confirmed.
            </p>
          </div>

          {/* 4-Step Progression Indicator */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3 text-left text-xs font-medium max-w-md mx-auto">
            <div className="flex items-center justify-between text-emerald-700 font-bold">
              <span>01 Application Received</span>
              <span>✓ Completed</span>
            </div>
            <div className="flex items-center justify-between text-amber-700 font-bold">
              <span>02 Testly Admin Review</span>
              <span className="animate-pulse">● In Review</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>03 Atomic Seat Assignment</span>
              <span>○ Pending</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>04 Assessment OS Access</span>
              <span>○ Locked</span>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="text-xs text-slate-500 hover:text-slate-900 underline"
          >
            Check another email or seat ID
          </button>
        </main>

        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  // 4. REVOKED
  if (entitlement.status === 'REVOKED') {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-between font-[Inter,system-ui,sans-serif] text-[#0F172A]">
        <GreNavbar onNavigate={onNavigate} entitlement={entitlement} />
        <main className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-serif font-bold text-[#0F172A]">Access Suspended</h1>
          <p className="text-xs text-[#64748B]">
            Your Testly 100 assessment access is currently unavailable. Please contact Testly support if you believe this is an error.
          </p>
        </main>
        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  // 5. APPROVED: FULL GRE ASSESSMENT OS UNLOCKED
  const hasCompletedDiagnostic = entitlement.hasCompletedDiagnostic || Boolean(diagnosticResult);

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-[Inter,system-ui,sans-serif] text-[#0F172A] selection:bg-[#1E3A8A] selection:text-white">
      <GreNavbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
        entitlement={entitlement}
        onSignOut={handleSignOut}
      />

      {/* Main Content Area */}
      <main className="flex-grow px-4 sm:px-6 lg:px-8">
        {activeTab === 'intelligence' && (
          <GreIntelligenceSpine
            onStartDiagnostic={() => handleSelectTab('diagnostic')}
            onStartPractice={() => handleSelectTab('practice')}
            onStartMock={() => handleSelectTab('mock')}
            onOpenReport={() => handleSelectTab('report')}
          />
        )}

        {activeTab === 'diagnostic' && (
          <GreDiagnosticRunner
            onComplete={handleDiagnosticComplete}
            onCancel={() => handleSelectTab('intelligence')}
          />
        )}

        {activeTab === 'practice' && (
          <GrePracticeEngine
            onStartDiagnostic={() => handleSelectTab('diagnostic')}
          />
        )}

        {activeTab === 'mock' && (
          <GreMockCenter
            onLaunchMock={() => handleSelectTab('diagnostic')}
          />
        )}

        {activeTab === 'report' && (
          hasCompletedDiagnostic ? (
            <GreReportView
              result={diagnosticResult}
              onRetakeDiagnostic={() => handleSelectTab('diagnostic')}
              onPracticeSkill={() => handleSelectTab('practice')}
            />
          ) : (
            <div className="max-w-xl mx-auto py-20 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-[#1E3A8A] flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#0F172A]">
                My Readiness Report
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
                Complete your baseline diagnostic to unlock your first calibrated Testly Practice Score and skill matrix.
              </p>
              <button
                onClick={() => handleSelectTab('diagnostic')}
                className="px-5 py-2.5 bg-[#1E3A8A] text-white text-xs font-bold rounded-xl hover:bg-[#1E3A8A]/90 transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <span>Start Baseline Diagnostic</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )
        )}
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
