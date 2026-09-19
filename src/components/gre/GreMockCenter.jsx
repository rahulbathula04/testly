import React, { useState, useEffect } from 'react';
import {
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  Award,
  Play,
  CheckCircle2,
  Lock,
  Copy,
  Check,
  Sparkles,
  Users,
  KeyRound,
  RotateCcw
} from 'lucide-react';
import GreMockInviteGate from './GreMockInviteGate';

const GRE_MOCKS = [
  {
    id: 'mock-01',
    number: '01',
    title: 'Testly GRE Mock #1: Diagnostic Baseline',
    type: 'Full-Length Simulation',
    duration: '1 hr 58 min',
    sectionsCount: 5,
    structure: '1 AW (30m) · 2 Verbal (41m) · 2 Quant (47m)',
    difficulty: 'Standard ETS Distribution (E2–E4)',
    status: 'READY_TO_LAUNCH',
    description: 'Calibrated baseline simulation matching official ETS 1:58 timing constraints and item distribution.'
  },
  {
    id: 'mock-02',
    number: '02',
    title: 'Testly GRE Mock #2: Section-Adaptive Standard Test',
    type: 'Section-Adaptive Simulation',
    duration: '1 hr 58 min',
    sectionsCount: 5,
    structure: 'Section 1 Routing + Section 2 Dynamic Difficulty',
    difficulty: 'Adaptive Routing Pool (E1–E5)',
    status: 'READY_TO_LAUNCH',
    description: 'Implements Testly section-level routing: performance in Section 1 dictates your Section 2 pool.'
  },
  {
    id: 'mock-03',
    number: '03',
    title: 'Testly GRE Mock #3: High-Scorer Challenge Test',
    type: 'Advanced Challenge Simulation',
    duration: '1 hr 58 min',
    sectionsCount: 5,
    structure: '1 AW · 2 High-Density Verbal · 2 Advanced Quant',
    difficulty: 'Concentrated E3–E5 Advanced Items',
    status: 'READY_TO_LAUNCH',
    description: 'Targeted at candidates aiming for 325+ percentiles with advanced multi-blank text completion and dense data analysis.'
  }
];

const VALID_MASTER_CODES = ['TESTLY100', 'GRE100', 'COHORT100', 'GRE-CENTURION', 'TESTLY-ELITE'];
const TOTAL_COHORT_CAPACITY = 100;
const BASELINE_CLAIMED_SEATS = 78;

export default function GreMockCenter({ onLaunchMock }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [claimedSeats, setClaimedSeats] = useState(BASELINE_CLAIMED_SEATS);
  const [assignedSeat, setAssignedSeat] = useState(null);
  const [activeCode, setActiveCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Initialize and check URL query param or existing localStorage pass
  useEffect(() => {
    try {
      // 1. Check URL parameters (?invite=... or ?code=... or ?token=...)
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get('invite') || params.get('code') || params.get('token');

      // Check if user requested reset for testing (?resetCohort=true)
      if (params.get('resetCohort') === 'true') {
        localStorage.removeItem('testly_gre_mock_pass');
        localStorage.removeItem('testly_gre_mock_seat');
        setIsUnlocked(false);
        return;
      }

      // 2. Check localStorage
      const savedPass = localStorage.getItem('testly_gre_mock_pass');
      const savedSeat = localStorage.getItem('testly_gre_mock_seat');

      if (urlToken) {
        validateAndUnlock(urlToken.trim().toUpperCase());
      } else if (savedPass) {
        setIsUnlocked(true);
        setActiveCode(savedPass);
        setAssignedSeat(savedSeat ? parseInt(savedSeat, 10) : 79);
      }
    } catch {
      // Fallback
    }
  }, []);

  const validateAndUnlock = (rawCode) => {
    const code = rawCode.trim().toUpperCase();

    // Check individual serialized format e.g. TESTLY-001 through TESTLY-100
    const seatMatch = code.match(/^TESTLY-?(\d{1,3})$/);
    if (seatMatch) {
      const seatNum = parseInt(seatMatch[1], 10);
      if (seatNum >= 1 && seatNum <= TOTAL_COHORT_CAPACITY) {
        unlockForSeat(code, seatNum);
        return true;
      }
    }

    // Check Master Cohort codes
    if (VALID_MASTER_CODES.includes(code)) {
      // Allocate next available seat
      const currentSeat = Math.min(TOTAL_COHORT_CAPACITY, BASELINE_CLAIMED_SEATS + 1);
      unlockForSeat(code, currentSeat);
      return true;
    }

    setErrorMsg('Invalid invite passcode or cohort token. Please check spelling or request an authorized pass below.');
    return false;
  };

  const unlockForSeat = (code, seatNum) => {
    setIsUnlocked(true);
    setActiveCode(code);
    setAssignedSeat(seatNum);
    setErrorMsg('');

    try {
      localStorage.setItem('testly_gre_mock_pass', code);
      localStorage.setItem('testly_gre_mock_seat', seatNum.toString());
      setClaimedSeats(Math.max(BASELINE_CLAIMED_SEATS, seatNum));
    } catch {
      // ignore
    }
  };

  const handleLockAccess = () => {
    try {
      localStorage.removeItem('testly_gre_mock_pass');
      localStorage.removeItem('testly_gre_mock_seat');
    } catch {
      // ignore
    }
    setIsUnlocked(false);
    setAssignedSeat(null);
    setActiveCode('');
  };

  const handleCopyInviteLink = () => {
    const shareUrl = `${window.location.origin}/gre/mock?invite=TESTLY100`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  // If locked, render the institutional 100-member invite gate
  if (!isUnlocked) {
    return (
      <GreMockInviteGate
        claimedSeats={claimedSeats}
        totalCapacity={TOTAL_COHORT_CAPACITY}
        onUnlock={validateAndUnlock}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
      />
    );
  }

  // If unlocked, render verified member keycard + 3 full-length simulations
  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 space-y-8 font-[Inter,system-ui,sans-serif]">
      
      {/* ── EXECUTIVE MEMBER ACCESS BANNER ── */}
      <div className="bg-[#0F172A] text-white rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
              COHORT ALPHA · VERIFIED SEAT #{assignedSeat || 79} OF {TOTAL_COHORT_CAPACITY}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Token: {activeCode}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold font-['DM_Serif_Display',Georgia,serif] text-white">
            Testly GRE Full-Length Simulations (Active Access)
          </h2>
          <p className="text-xs text-slate-400">
            Your individual testing pass is active. You have full simulation rights to all 3 official-specification shortened GRE mocks.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleCopyInviteLink}
            title="Copy 100-member shareable invite link"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all border border-slate-700 flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy 100-Seat Link</span>
              </>
            )}
          </button>

          <button
            onClick={handleLockAccess}
            title="Lock access (requires invite passcode to re-enter)"
            className="text-slate-500 hover:text-rose-400 p-2 rounded-lg transition-colors cursor-pointer text-xs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── SECTION HEADER ── */}
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            MOCK EXAMS · STAGE 03
          </span>
          <span className="text-xs text-slate-500 font-mono">
            3 Full-Length Simulations · 100-Member Cohort
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
          Calibrated GRE Full Mocks
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Full-length assessments calibrated against the official 5-section shortened GRE structure. Each simulation generates an individualized Section 2 routing assessment and percentile diagnostic.
        </p>
      </div>

      {/* ── MOCK CARDS GRID ── */}
      <div className="space-y-4">
        {GRE_MOCKS.map((mock) => (
          <div
            key={mock.id}
            className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 hover:border-[#1E3A8A] transition-all shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded">
                    MOCK {mock.number}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {mock.type}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
                  {mock.title}
                </h3>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-600 shrink-0">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {mock.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  {mock.sectionsCount} Sections
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {mock.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase block font-bold">Section Composition</span>
                <span className="font-semibold text-slate-800">{mock.structure}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase block font-bold">Difficulty Profile</span>
                <span className="font-semibold text-slate-800">{mock.difficulty}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified Current Format · Unlocked
              </span>

              <button
                onClick={() => onLaunchMock(mock.id)}
                className="bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Launch Mock Exam</span>
                <Play className="w-3.5 h-3.5 fill-current text-blue-300" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── LEGAL DISCLOSURE ── */}
      <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-1.5 leading-relaxed">
        <strong className="text-slate-800 block font-semibold">Testly Mock Authenticity Standard:</strong>
        Testly mock exams are 100% original simulations written by Testly assessment specialists against published ETS content specifications. Testly does not reproduce or scrape official ETS testing materials. Testly is not affiliated with or endorsed by Educational Testing Service (ETS).
      </div>

    </div>
  );
}
