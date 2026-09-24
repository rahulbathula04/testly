import React, { useState } from 'react';
import {
  Lock,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Users
} from 'lucide-react';

export default function GreMockInviteGate({
  claimedSeats = 78,
  totalCapacity = 100,
  onUnlock,
  errorMsg,
  setErrorMsg
}) {
  const [inputCode, setInputCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const remainingSeats = Math.max(0, totalCapacity - claimedSeats);
  const percentageClaimed = Math.min(100, Math.round((claimedSeats / totalCapacity) * 100));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) {
      if (setErrorMsg) setErrorMsg('Please enter an authorized invite code.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      onUnlock(inputCode.trim());
      setSubmitting(false);
    }, 250);
  };

  const waRequestUrl = `https://wa.me/919347379041?text=${encodeURIComponent(
    'Hi Testly Team! I would like to request an invite code for the exclusive 100-member GRE Mock Test cohort on Testly.'
  )}`;

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-10 font-[Inter,system-ui,sans-serif]">
      
      {/* ── TOP RESTRICTED BANNER & HERO ── */}
      <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-800/60">
                RESTRICTED COHORT · 100 CANDIDATES ONLY
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Invite-Only Access Gate</span>
            </div>
          </div>

          <div className="space-y-3 max-w-2xl">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white font-['DM_Serif_Display',Georgia,serif] leading-tight">
              Testly GRE Full-Length Simulations
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              To preserve authentic section-adaptive percentile calibration and dedicated faculty diagnostic review, full access to our 3 Full-Length 2026 GRE Simulation Mocks is strictly limited to an invitation-only cohort of <strong className="text-white font-semibold">100 verified test-takers</strong>.
            </p>
          </div>

          {/* ── QUOTA TELEMETRY BAR ── */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300 font-semibold">Cohort Allocation Quota:</span>
                <span className="text-white font-bold">{claimedSeats} of {totalCapacity} Seats Claimed</span>
              </div>
              <div className="text-amber-400 font-bold bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-800/40 self-start sm:self-auto">
                {remainingSeats > 0 ? `${remainingSeats} Seats Remaining` : 'Cohort Fully Booked'}
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 via-indigo-400 to-amber-400 h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${percentageClaimed}%` }}
              />
            </div>
            
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>Cohort #01 Active</span>
              <span>Strict 100-Seat Cap Enforced</span>
            </div>
          </div>

          {/* ── CODE ENTRY INTERFACE ── */}
          <div className="pt-2">
            <form onSubmit={handleSubmit} className="space-y-3">
              <label htmlFor="invite-code-input" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Enter Authorized Invite Passcode or Token:
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-grow">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="invite-code-input"
                    type="text"
                    value={inputCode}
                    onChange={(e) => {
                      setInputCode(e.target.value.toUpperCase());
                      if (errorMsg && setErrorMsg) setErrorMsg('');
                    }}
                    placeholder="e.g. TESTLY100"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm tracking-wider uppercase placeholder:text-slate-500 placeholder:normal-case focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 shrink-0"
                >
                  <span>{submitting ? 'Verifying...' : 'Unlock Cohort Access'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 text-xs text-rose-400 font-mono bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/60">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </form>
          </div>

        </div>
      </div>

      {/* ── CONCIERGE ACCESS REQUEST RAIL ── */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              CONCIERGE DESK
            </span>
            <span className="text-xs font-semibold text-slate-500">Need an invite?</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[#0F172A] font-['DM_Serif_Display',Georgia,serif]">
            Request an Access Token from Testly Desk
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            If you are registered or planning your GRE test date within the next 90 days, connect with the Testly team via WhatsApp to receive a reserved single-use invitation code.
          </p>
        </div>

        <a
          href={waRequestUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-xs hover:shadow flex items-center gap-2.5 shrink-0 cursor-pointer active:scale-95"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Request Invite on WhatsApp</span>
        </a>
      </div>

      {/* ── LOCKED PREVIEW OF SIMULATION MOCKS ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
            Curriculum Inclusions (Unlocked with Passcode)
          </h2>
          <span className="text-xs font-mono text-slate-500">3 Calibrated Simulations</span>
        </div>

        <div className="space-y-3">
          {[
            {
              num: '01',
              title: 'Testly GRE Mock #1: Diagnostic Baseline',
              type: 'Full-Length Simulation',
              time: '1 hr 58 min',
              spec: '1 AW · 2 Verbal · 2 Quant'
            },
            {
              num: '02',
              title: 'Testly GRE Mock #2: Section-Adaptive Standard Test',
              type: 'Adaptive Routing Simulation',
              time: '1 hr 58 min',
              spec: 'Dynamic Section 2 difficulty routing pool (E1–E5)'
            },
            {
              num: '03',
              title: 'Testly GRE Mock #3: High-Scorer Challenge Test',
              type: '325+ Percentile Pool',
              time: '1 hr 58 min',
              spec: 'Concentrated advanced multi-blank & dense quant'
            }
          ].map((mock) => (
            <div
              key={mock.num}
              className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 opacity-80"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded">
                    MOCK {mock.num}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">{mock.type}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-[#0F172A]">{mock.title}</h4>
                <p className="text-xs text-slate-500 font-mono">{mock.spec}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {mock.time}
                </span>
                <span className="text-[11px] font-mono text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1 font-semibold">
                  <Lock className="w-3 h-3 text-amber-600" />
                  Invite Only
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
