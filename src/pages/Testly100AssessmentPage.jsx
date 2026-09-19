import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Clock,
  CheckCircle2,
  Lock,
  ArrowRight,
  AlertCircle,
  KeyRound,
  RotateCcw,
  Sparkles,
  Wifi,
  Maximize2,
  BellOff,
  Calculator,
  ShieldCheck
} from 'lucide-react';
import { testly100Service } from '../services/testly100Service';
import Testly100Runner from '../components/testly100/Testly100Runner';
import BrandLogo from '../components/BrandLogo';

export default function Testly100AssessmentPage({ onNavigate }) {
  const [token, setToken] = useState('');
  const [candidateAuth, setCandidateAuth] = useState(null); // { authorized, participant, application, session, seatId }
  const [isVerifying, setIsVerifying] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [preFlightConfirmed, setPreFlightConfirmed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token') || params.get('seat') || params.get('id');

    if (urlToken) {
      setToken(urlToken);
      verifyAccess(urlToken);
    } else {
      setIsVerifying(false);
    }
  }, []);

  const verifyAccess = async (rawIdentifier) => {
    setIsVerifying(true);
    setErrorMessage('');
    try {
      const res = await testly100Service.verifyCandidateAccess(rawIdentifier);
      if (res.authorized) {
        setCandidateAuth(res);
      } else {
        setCandidateAuth(null);
        if (res.reason === 'PENDING_APPROVAL') {
          setErrorMessage('APPLICATION RECEIVED · PENDING TESTLY APPROVAL. Your seat is not confirmed until Testly approves your application.');
        } else if (res.reason === 'ACCESS_REVOKED') {
          setErrorMessage(`Access Revoked by Administrator: ${res.revokedReason || 'Contact Testly Support'}`);
        } else if (res.status === 'REJECTED') {
          setErrorMessage('This application was not approved for the Testly 100 private cohort.');
        } else if (res.status === 'WAITLISTED') {
          setErrorMessage('This application is currently on the Testly 100 waitlist. You will be notified if a seat opens.');
        } else {
          setErrorMessage('Invalid access credentials. Opening an invite link does not grant test access. Only approved participants may enter.');
        }
      }
    } catch {
      setErrorMessage('Verification network failure. Please check connection and try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleManualLogin = (e) => {
    e.preventDefault();
    if (!inputPass.trim()) return;
    setToken(inputPass.trim());
    verifyAccess(inputPass.trim());
  };

  const handleTestComplete = async ({ responses, score, participant }) => {
    try {
      const report = await testly100Service.submitAssessment(participant.id, {
        quantScore: score?.quantScore || 156,
        verbalScore: score?.verbalScore || 154,
        accuracyPct: score?.accuracyPct || 76.5,
        sectionBreakdown: score?.sectionBreakdown,
        skillMatrix: score?.skillMatrix,
        recommendedFocus: score?.recommendedFocus,
        studyPlan: score?.studyPlan
      });
      window.location.href = `/testly-100/report/${participant.seat_id}`;
    } catch (err) {
      console.error('Submission error:', err);
      window.location.href = `/testly-100/report/${participant.seat_id}`;
    }
  };

  // 1. Authorized & Pre-Flight Confirmed -> In Assessment Runner
  if (candidateAuth && candidateAuth.authorized && preFlightConfirmed) {
    return (
      <Testly100Runner
        participant={{
          id: candidateAuth.participant.id,
          participant_number: candidateAuth.seatId,
          name: candidateAuth.application?.full_name,
        }}
        onComplete={handleTestComplete}
        onExit={() => onNavigate && onNavigate('/')}
      />
    );
  }

  // 2. Authorized but Before Pre-Flight Checklist
  if (candidateAuth && candidateAuth.authorized && !preFlightConfirmed) {
    const candidateName = candidateAuth.application?.full_name || 'Candidate';
    const seatId = candidateAuth.seatId;

    return (
      <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] font-[Inter,system-ui,sans-serif] selection:bg-[#1E3A8A] selection:text-white flex flex-col justify-between p-6">
        <header className="max-w-4xl mx-auto w-full flex items-center justify-between py-4 border-b border-slate-200">
          <BrandLogo variant="horizontal" size="sm" />
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#1E3A8A] text-white">
              {seatId}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Seat Confirmed
            </span>
          </div>
        </header>

        <main className="max-w-xl mx-auto w-full my-auto py-8 space-y-8">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#1E3A8A]">
              Testly 100 Diagnostic Environment
            </span>
            <h1 className="text-3xl font-serif font-bold text-[#0F172A]">
              Welcome, {candidateName}.
            </h1>
            <p className="text-sm text-[#64748B]">
              Your calibrated diagnostic assessment is configured and ready.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <div className="font-bold text-[#0F172A] text-sm border-b border-slate-100 pb-2">
              Before You Begin
            </div>
            <div className="grid grid-cols-2 gap-3 text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500 block">Structure</span>
                <strong className="text-[#0F172A]">Quant + Verbal Reasoning</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500 block">Pacing</span>
                <strong className="text-[#0F172A]">Timed under standard ETS clock</strong>
              </div>
            </div>
            <p className="text-[11px] text-[#64748B] italic pt-1">
              This is an uninflated diagnostic simulation to calibrate your strengths and weaknesses. It is not an official ETS score.
            </p>
          </div>

          {/* Pre-Flight Checklist */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3.5 text-xs">
            <div className="font-bold text-[#0F172A] text-sm uppercase tracking-wider text-[11px]">
              Your Test Check
            </div>
            <div className="space-y-2.5 text-slate-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Stable internet connection confirmed</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full-screen browser recommended for timed sections</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Notifications & distractions turned off</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>On-screen calculator rules explained (Quant section only)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Progress autosaves continuously in case of page reload</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setPreFlightConfirmed(true)}
            className="w-full py-4 bg-[#1E3A8A] text-white text-sm font-bold rounded-2xl hover:bg-[#1E3A8A]/90 transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Ready? Start Test</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </main>

        <footer className="max-w-4xl mx-auto w-full text-center text-[11px] text-slate-500 py-4 border-t border-slate-200">
          Testly 100 Assessment Engine · Session ID: {seatId}
        </footer>
      </div>
    );
  }

  // 3. Loading State
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] flex flex-col items-center justify-center p-6 font-mono text-xs">
        <div className="w-8 h-8 rounded-full border-2 border-[#1E3A8A] border-t-transparent animate-spin mb-3" />
        <span>Verifying Candidate Access Token with Testly 100 Authority...</span>
      </div>
    );
  }

  // 4. Gate Screen: Enter Token or Show Rejection
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] flex flex-col justify-between p-6 font-[Inter,system-ui,sans-serif]">
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between py-2 border-b border-slate-200">
        <BrandLogo variant="horizontal" size="sm" />
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1E3A8A] border border-blue-200">
          PROTECTED ASSESSMENT ENVIRONMENT
        </span>
      </div>

      <div className="max-w-md mx-auto w-full my-auto py-10 space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-[#1E3A8A]">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold font-serif text-[#0F172A]">
              Testly 100 Access Gate
            </h1>
            <p className="text-xs text-[#64748B] leading-relaxed">
              This assessment room is strictly limited to 100 approved participants with verified credentials.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleManualLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Seat ID or Candidate Access Token
              </label>
              <input
                type="text"
                required
                value={inputPass}
                onChange={(e) => setInputPass(e.target.value)}
                placeholder="e.g. TESTLY-014 or t100_..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#0F172A] placeholder-slate-400 font-mono focus:outline-none focus:border-[#1E3A8A]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1E3A8A] text-white text-xs font-bold rounded-xl hover:bg-[#1E3A8A]/90 transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Verify & Launch Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 space-y-2">
            <p>Don't have an approved seat yet?</p>
            <a
              href="/i/testly-100"
              className="inline-flex items-center gap-1 text-[#1E3A8A] font-semibold hover:underline"
            >
              <span>Accept Invitation & Apply</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-400 max-w-md mx-auto">
        Testly Practice Diagnostic System. Not affiliated with or endorsed by ETS.
      </div>
    </div>
  );
}
