import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  Share2,
  Copy,
  Check,
  KeyRound,
  Download,
  Building2,
  MapPin,
  Calendar,
  Compass,
  GraduationCap
} from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import { testly100Service } from '../services/testly100Service';

export default function Testly100InvitePage({ onNavigate, inviteToken = null }) {
  // Navigation stages:
  // 'LANDING' -> 'REVEAL' -> 'STEP_NAME' -> 'STEP_COLLEGE' -> 'STEP_JOURNEY' -> 'STEP_TIMING' -> 'STEP_DESTINATION' -> 'STEP_PROGRAM' -> 'UNDER_REVIEW' -> 'CONFIRMED'
  const [stage, setStage] = useState('LANDING');
  const [metrics, setMetrics] = useState({ approvedCount: 0, capacity: 100, seatsRemaining: 100 });
  const [activeInvite, setActiveInvite] = useState(null);

  // Status check drawer
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusQuery, setStatusQuery] = useState('');
  const [statusResult, setStatusResult] = useState(null);
  const [statusError, setStatusError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);

  // Form profile fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [greJourney, setGreJourney] = useState('Preparing');
  const [targetMonth, setTargetMonth] = useState('November 2026');
  const [targetCountry, setTargetCountry] = useState('United States');
  const [targetDegree, setTargetDegree] = useState('MS / Master of Science');
  const [targetIntake, setTargetIntake] = useState('Fall 2027');
  const [captainCode, setCaptainCode] = useState(null);

  // Submitted application record
  const [submittedApp, setSubmittedApp] = useState(null);
  const [confirmedParticipant, setConfirmedParticipant] = useState(null);

  useEffect(() => {
    async function init() {
      const m = await testly100Service.getDashboardMetrics();
      setMetrics(m);

      // Determine invite token from prop or URL (?ref=... or /i/:token)
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        const match = path.match(/\/i\/([a-zA-Z0-9_-]+)/);
        const params = new URLSearchParams(window.location.search);
        const code = inviteToken || (match ? match[1] : null) || params.get('ref') || params.get('captain') || '7KQ9-X2M4';
        
        if (code) {
          setCaptainCode(code.toUpperCase());
          testly100Service.recordInviteView(code);
        }

        // Check if candidate already has an active session in this browser
        const existingSession = testly100Service.getActiveCandidateSession();
        if (existingSession?.token || existingSession?.seatId) {
          const auth = await testly100Service.getAssessmentEntitlement(existingSession.token || existingSession.seatId);
          if (auth.authorized && auth.participant) {
            setConfirmedParticipant(auth.participant);
            setSubmittedApp(auth.application);
            setStage('CONFIRMED');
          } else if (auth.application) {
            setSubmittedApp(auth.application);
            setStage('UNDER_REVIEW');
          }
        }
      }
    }
    init();
  }, [inviteToken]);

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!statusQuery.trim()) return;
    setIsVerifying(true);
    setStatusError('');
    setStatusResult(null);

    try {
      const res = await testly100Service.getAssessmentEntitlement(statusQuery.trim());
      if (res.authorized) {
        setStatusResult(res);
        setConfirmedParticipant(res.participant);
        setSubmittedApp(res.application);
        setStage('CONFIRMED');
      } else if (res.application) {
        setStatusResult(res);
        setSubmittedApp(res.application);
        setStage('UNDER_REVIEW');
      } else {
        setStatusError('No application found with these credentials. Please check spelling or accept your invitation below.');
      }
    } catch {
      setStatusError('Verification network error. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleFinalSubmit = async () => {
    try {
      const res = await testly100Service.submitApplication({
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city: city.trim() || 'Hyderabad',
        college: college.trim(),
        education_level: targetDegree,
        target_gre_date: targetMonth,
        target_country: targetCountry,
        target_intake: targetIntake,
        captain_code: captainCode,
      });

      setSubmittedApp(res.application);
      testly100Service.setActiveCandidateSession({
        email: res.application.email,
        name: res.application.full_name,
        applicationId: res.application.id
      });
      setStage('UNDER_REVIEW');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      alert(err.message || 'Submission failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] font-[Inter,system-ui,sans-serif] selection:bg-[#1E3A8A] selection:text-white flex flex-col justify-between antialiased">
      
      {/* ── TOP RESTRAINED HEADER (No cluttered navbar) ── */}
      <header className="px-6 sm:px-12 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrandLogo variant="horizontal" size="sm" />
          <span className="text-slate-300">/</span>
          <span className="text-xs font-mono font-bold tracking-widest text-[#1E3A8A] uppercase">
            Testly 100
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setStatusOpen(!statusOpen)}
            className="text-xs font-semibold text-[#64748B] hover:text-[#1E3A8A] transition-colors flex items-center gap-1.5"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Check Status</span>
          </button>
        </div>
      </header>

      {/* ── STATUS LOOKUP SLIDE-DOWN DRAWER ── */}
      {statusOpen && (
        <div className="bg-white border-b border-slate-200 px-6 py-6 shadow-sm animate-in slide-in-from-top duration-200">
          <div className="max-w-md mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-serif text-[#0F172A]">Find Your Testly Application</span>
              <button onClick={() => setStatusOpen(false)} className="text-xs text-slate-400 hover:text-slate-700">Close</button>
            </div>
            <form onSubmit={handleLookup} className="flex gap-2">
              <input
                type="text"
                value={statusQuery}
                onChange={(e) => setStatusQuery(e.target.value)}
                placeholder="Enter email or Seat ID (e.g. TESTLY-014)"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-[#0F172A] focus:outline-none focus:border-[#1E3A8A]"
              />
              <button
                type="submit"
                disabled={isVerifying}
                className="px-4 py-2 bg-[#1E3A8A] text-white text-xs font-semibold rounded-xl hover:bg-[#1E3A8A]/90 transition-colors"
              >
                {isVerifying ? 'Checking...' : 'Lookup'}
              </button>
            </form>
            {statusError && <p className="text-xs text-rose-600">{statusError}</p>}
          </div>
        </div>
      )}

      {/* ── WORKSPACE BODY ── */}
      <main className="flex-1 flex flex-col justify-center px-4 sm:px-6 py-12 max-w-3xl mx-auto w-full">

        {/* ── SCREEN 1: THE INVITATION (Editorial Opening) ── */}
        {stage === 'LANDING' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-4">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#1E3A8A]">
                You were invited
              </span>
              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#0F172A] tracking-tight leading-[1.1]">
                You weren't sent a registration link.<br />
                You were invited.
              </h1>
              <p className="text-sm sm:text-base text-[#64748B] max-w-lg leading-relaxed pt-2">
                Testly 100 is an exclusive private GRE diagnostic experience for exactly 100 serious aspirants.
              </p>
            </div>

            {/* Subtle blue accent mark */}
            <div className="w-12 h-1 bg-[#1E3A8A] rounded-full" />

            <div className="pt-4">
              <button
                onClick={() => setStage('REVEAL')}
                className="px-8 py-4 bg-[#0F172A] text-white text-sm font-semibold rounded-2xl hover:bg-[#1E3A8A] transition-all shadow-md flex items-center gap-3 group cursor-pointer"
              >
                <span>Accept Invitation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-300" />
              </button>
            </div>
          </div>
        )}

        {/* ── SCREEN 2: REVEAL THE EXPERIENCE ── */}
        {stage === 'REVEAL' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-4">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#1E3A8A]">
                The Diagnostic Experience
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#0F172A] tracking-tight">
                Welcome to Testly 100.
              </h1>
              <div className="text-base sm:text-lg text-[#0F172A] font-medium space-y-1 pt-2">
                <p>100 aspirants.</p>
                <p>One calibrated diagnostic.</p>
                <p className="text-[#64748B]">One honest look at where you stand.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs max-w-md space-y-2">
              <div className="text-2xl font-serif font-bold text-[#1E3A8A]">₹0</div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                No payment. No sales pitch. Just your calibrated uninflated diagnostic score before you pay your ₹25,522 exam registration fee.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setStage('LANDING')}
                className="p-3 text-slate-400 hover:text-slate-700 rounded-xl cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setStage('STEP_NAME')}
                className="px-8 py-4 bg-[#0F172A] text-white text-sm font-semibold rounded-2xl hover:bg-[#1E3A8A] transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Enter Testly 100</span>
                <ArrowRight className="w-4 h-4 text-blue-300" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 1 / 6: NAME & MOBILE ── */}
        {stage === 'STEP_NAME' && (
          <div className="space-y-8 max-w-lg animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B]">
              <span>Step 01 / 06</span>
              <span>Candidate Identity</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A]">
                Let's get to know you.
              </h2>
              <p className="text-xs text-[#64748B]">
                Your legal name for your serialized participant record.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">What's your legal full name?</label>
                <input
                  type="text"
                  autoFocus
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#1E3A8A] shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rahul@example.com"
                  className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#1E3A8A] shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp mobile number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#1E3A8A] shadow-xs"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button onClick={() => setStage('REVEAL')} className="p-3 text-slate-400 hover:text-slate-700 cursor-pointer">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                disabled={!fullName.trim() || !email.trim() || !phone.trim()}
                onClick={() => setStage('STEP_COLLEGE')}
                className="flex-1 py-3.5 bg-[#0F172A] text-white text-xs font-bold rounded-xl hover:bg-[#1E3A8A] transition-colors shadow-xs disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 text-blue-300" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2 / 6: COLLEGE & CITY ── */}
        {stage === 'STEP_COLLEGE' && (
          <div className="space-y-8 max-w-lg animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B]">
              <span>Step 02 / 06</span>
              <span>Academic Provenance</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A]">
                Where are you studying?
              </h2>
              <p className="text-xs text-[#64748B]">
                We organize private cohort test sessions by campus and region.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">College or University</label>
                <input
                  type="text"
                  autoFocus
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. CBIT, BITS Pilani Hyderabad, Osmania"
                  className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#1E3A8A] shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Hyderabad, Bengaluru, Chennai"
                  className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#1E3A8A] shadow-xs"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button onClick={() => setStage('STEP_NAME')} className="p-3 text-slate-400 hover:text-slate-700 cursor-pointer">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                disabled={!college.trim()}
                onClick={() => setStage('STEP_JOURNEY')}
                className="flex-1 py-3.5 bg-[#0F172A] text-white text-xs font-bold rounded-xl hover:bg-[#1E3A8A] transition-colors shadow-xs disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 text-blue-300" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 / 6: GRE JOURNEY STAGE ── */}
        {stage === 'STEP_JOURNEY' && (
          <div className="space-y-8 max-w-lg animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B]">
              <span>Step 03 / 06</span>
              <span>Preparation Horizon</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A]">
                Where are you in your GRE journey?
              </h2>
              <p className="text-xs text-[#64748B]">
                This calibrates your diagnostic difficulty pool and pacing baseline.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'Just starting', desc: 'Evaluating syllabus and initial diagnostic' },
                { id: 'Preparing', desc: 'Actively studying Quant & Verbal concepts' },
                { id: 'Almost ready', desc: 'Taking full-length mocks before test date' },
                { id: 'Already booked', desc: 'Official exam appointment scheduled' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setGreJourney(item.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    greJourney === item.id
                      ? 'border-[#1E3A8A] bg-blue-50/70 text-[#1E3A8A] font-bold shadow-xs ring-1 ring-[#1E3A8A]'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="text-sm font-bold text-[#0F172A]">{item.id}</div>
                  <div className="text-xs text-[#64748B] mt-1">{item.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button onClick={() => setStage('STEP_COLLEGE')} className="p-3 text-slate-400 hover:text-slate-700">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setStage('STEP_TIMING')}
                className="flex-1 py-3.5 bg-[#1E3A8A] text-white text-xs font-bold rounded-xl hover:bg-[#1E3A8A]/90 transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4 / 6: TARGET GRE MONTH ── */}
        {stage === 'STEP_TIMING' && (
          <div className="space-y-8 max-w-lg animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B]">
              <span>Step 04 / 06</span>
              <span>Test Timing</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A]">
                When are you thinking about taking GRE?
              </h2>
              <p className="text-xs text-[#64748B]">
                Used to compute your recommended 7-day and 30-day prep trajectory.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                'Within 30 Days',
                'November 2026',
                'December 2026',
                'January 2027',
                'February 2027',
                'Later in 2027',
              ].map((month) => (
                <button
                  key={month}
                  onClick={() => setTargetMonth(month)}
                  className={`p-3.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                    targetMonth === month
                      ? 'border-[#1E3A8A] bg-blue-50 text-[#1E3A8A] font-bold ring-1 ring-[#1E3A8A]'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button onClick={() => setStage('STEP_JOURNEY')} className="p-3 text-slate-400 hover:text-slate-700 cursor-pointer">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setStage('STEP_DESTINATION')}
                className="flex-1 py-3.5 bg-[#0F172A] text-white text-xs font-bold rounded-xl hover:bg-[#1E3A8A] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 text-blue-300" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 5 / 6: TARGET DESTINATION ── */}
        {stage === 'STEP_DESTINATION' && (
          <div className="space-y-8 max-w-lg animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B]">
              <span>Step 05 / 06</span>
              <span>Study Destination</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A]">
                Where are you aiming?
              </h2>
              <p className="text-xs text-[#64748B]">
                Score thresholds and percentile targets vary significantly by country.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { country: 'United States', code: 'USA' },
                { country: 'United Kingdom', code: 'UK' },
                { country: 'Canada', code: 'CAN' },
                { country: 'Germany / Europe', code: 'EU' },
                { country: 'Australia / Singapore', code: 'APAC' },
                { country: 'Other Destinations', code: 'INTL' },
              ].map((c) => (
                <button
                  key={c.country}
                  onClick={() => setTargetCountry(c.country)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    targetCountry === c.country
                      ? 'border-[#1E3A8A] bg-blue-50 text-[#1E3A8A] font-bold ring-1 ring-[#1E3A8A]'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="text-[10px] font-mono text-slate-400 uppercase">{c.code}</div>
                  <div className="text-xs font-semibold text-[#0F172A] mt-0.5">{c.country}</div>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button onClick={() => setStage('STEP_TIMING')} className="p-3 text-slate-400 hover:text-slate-700 cursor-pointer">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setStage('STEP_PROGRAM')}
                className="flex-1 py-3.5 bg-[#0F172A] text-white text-xs font-bold rounded-xl hover:bg-[#1E3A8A] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 text-blue-300" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 6 / 6: DEGREE & INTAKE ── */}
        {stage === 'STEP_PROGRAM' && (
          <div className="space-y-8 max-w-lg animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B]">
              <span>Step 06 / 06</span>
              <span>Academic Target</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A]">
                What are you targeting?
              </h2>
              <p className="text-xs text-[#64748B]">
                Completing your profile will submit your application to Testly administrators.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Degree</label>
                <div className="grid grid-cols-3 gap-2">
                  {['MS / Master\'s', 'MBA', 'PhD / Doctorate'].map((deg) => (
                    <button
                      key={deg}
                      onClick={() => setTargetDegree(deg)}
                      className={`p-3 rounded-xl border text-xs font-semibold ${
                        targetDegree === deg
                          ? 'border-[#1E3A8A] bg-blue-50 text-[#1E3A8A] font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      {deg}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Admissions Intake</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Fall 2027', 'Spring 2027', 'Fall 2028'].map((intake) => (
                    <button
                      key={intake}
                      onClick={() => setTargetIntake(intake)}
                      className={`p-3 rounded-xl border text-xs font-semibold ${
                        targetIntake === intake
                          ? 'border-[#1E3A8A] bg-blue-50 text-[#1E3A8A] font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      {intake}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button onClick={() => setStage('STEP_DESTINATION')} className="p-3 text-slate-400 hover:text-slate-700 cursor-pointer">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleFinalSubmit}
                className="flex-1 py-4 bg-[#0F172A] text-white text-xs font-bold rounded-xl hover:bg-[#1E3A8A] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit Your Testly Profile</span>
                <ArrowRight className="w-4 h-4 text-blue-300" />
              </button>
            </div>
          </div>
        )}

        {/* ── STAGE 8: UNDER REVIEW (Personalized Waiting State) ── */}
        {stage === 'UNDER_REVIEW' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#1E3A8A]">
                Application Received
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] tracking-tight">
                Your application is with Testly.
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] max-w-lg">
                We're reviewing your application for the TESTLY 100 private cohort. Seat allocation is atomic and granted upon administrator review.
              </p>
            </div>

            {/* Progression Sequence */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm max-w-md space-y-3.5 text-xs font-medium">
              <div className="flex items-center justify-between text-emerald-700 font-bold">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>01 Application received</span>
                </span>
                <span>Completed</span>
              </div>

              <div className="flex items-center justify-between text-amber-700 font-bold">
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-amber-500 animate-pulse flex items-center justify-center text-[10px] text-white">●</span>
                  <span>02 Testly review</span>
                </span>
                <span>Under Review</span>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border border-slate-300" />
                  <span>03 Seat assignment</span>
                </span>
                <span>TESTLY-001..100</span>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border border-slate-300" />
                  <span>04 Assessment access</span>
                </span>
                <span>Locked</span>
              </div>
            </div>

            {/* DIGITAL INVITATION CARD (Save / Share) */}
            <div className="p-8 rounded-3xl bg-[#0F172A] text-white max-w-md shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-300">
                  TESTLY · YOU'RE INVITED
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {submittedApp?.city || 'HYDERABAD'}
                </span>
              </div>

              <div>
                <div className="text-2xl font-serif font-bold text-white tracking-tight">
                  TESTLY 100
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Private GRE Diagnostic Assessment
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-mono">Candidate</span>
                  <span className="font-bold text-white">{submittedApp?.full_name || fullName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-slate-400 block font-mono">Status</span>
                  <span className="font-bold text-amber-400 uppercase">Under Review</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 font-mono italic">
                CHECK BEFORE YOU BOOK.
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const shareUrl = `${window.location.origin}/i/${captainCode || 'testly-100'}`;
                  navigator.clipboard.writeText(shareUrl);
                  setCopiedPass(true);
                  setTimeout(() => setCopiedPass(false), 2000);
                }}
                className="px-5 py-2.5 bg-white border border-slate-200 text-xs font-semibold rounded-xl text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                {copiedPass ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-[#1E3A8A]" />}
                <span>{copiedPass ? 'Link Copied' : 'Share with a Study Partner'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ── STAGE 9: SEAT CONFIRMED (The Moment!) ── */}
        {stage === 'CONFIRMED' && (
          <div className="space-y-8 animate-in zoom-in-95 duration-200">
            <div className="space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Seat Confirmed · Access Granted
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#0F172A] tracking-tight">
                Welcome to Testly 100.
              </h1>
              <p className="text-sm text-[#64748B]">
                Your application has been approved by Testly administrators.
              </p>
            </div>

            {/* Serialized Identity Card in Master Ink #0F172A */}
            <div className="p-8 rounded-3xl bg-[#0F172A] border border-slate-800 text-white max-w-md shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-200">
                  Serialized Participant Identity
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div>
                <div className="text-[11px] text-blue-200 font-mono">Your Participant Number</div>
                <div className="text-4xl font-serif font-bold text-white tracking-wider my-1">
                  {confirmedParticipant?.seat_id || 'TESTLY-047'}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <span>{submittedApp?.full_name || 'Candidate'}</span>
                <span>{submittedApp?.college || 'University'}</span>
              </div>
            </div>

            <div className="space-y-2">
              <a
                href={`/gre?token=${confirmedParticipant?.access_token || confirmedParticipant?.seat_id}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0F172A] text-white text-sm font-bold rounded-2xl hover:bg-[#1E3A8A] transition-all shadow-md cursor-pointer"
              >
                <span>Launch Your Diagnostic Assessment</span>
                <ArrowRight className="w-4 h-4 text-blue-300" />
              </a>
              <p className="text-xs text-[#64748B]">
                Diagnostic is timed under standard ETS calibration (1 hr 58 min).
              </p>
            </div>
          </div>
        )}

      </main>

      {/* ── FOOTER ── */}
      <footer className="px-6 sm:px-12 py-6 text-center text-xs text-[#64748B] border-t border-slate-200">
        Testly 100 · Private Diagnostic Environment · Not affiliated with or endorsed by ETS.
      </footer>

    </div>
  );
}
