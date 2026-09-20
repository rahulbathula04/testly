import React, { useState } from 'react';
import { X, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, User, Target, KeyRound } from 'lucide-react';
import { testly100Service } from '../../services/testly100Service';

export default function GreOnboardingModal({ isOpen, onClose, onLaunchMock }) {
  const [candidateName, setCandidateName] = useState('');
  const [targetScore, setTargetScore] = useState('320+ (Competitive MS / STEM)');
  const [seatToken, setSeatToken] = useState('');
  const [isSeatMode, setIsSeatMode] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isSeatMode) {
      if (!seatToken.trim()) {
        setError('Please enter your 6-character Seat Code or Token.');
        setLoading(false);
        return;
      }
      const res = await testly100Service.getAssessmentEntitlement(seatToken.trim());
      if (res.authorized) {
        testly100Service.setActiveCandidateSession({
          token: res.participant.access_token,
          seatId: res.participant.seat_id,
          name: res.application?.full_name || 'Candidate'
        });
        setLoading(false);
        onLaunchMock({ name: res.application?.full_name || 'Candidate', seatId: res.participant.seat_id });
      } else {
        setError(res.error || 'Seat code not recognized. You can take the instant diagnostic as a guest below.');
        setLoading(false);
      }
    } else {
      if (!candidateName.trim()) {
        setError('Please enter your name to calibrate your score report.');
        setLoading(false);
        return;
      }
      // Instant diagnostic guest session
      const generatedSeat = `GRE-${Math.floor(1000 + Math.random() * 9000)}`;
      testly100Service.setActiveCandidateSession({
        token: `GUEST-${Date.now()}`,
        seatId: generatedSeat,
        name: candidateName.trim(),
        targetScore
      });
      setLoading(false);
      onLaunchMock({ name: candidateName.trim(), seatId: generatedSeat, targetScore });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-blue-50/20">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1E3A8A]">
              TESTLY GRE DIAGNOSTIC ENGINE
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] font-serif mt-0.5">
              {isSeatMode ? 'Enter Existing Seat ID' : 'Start Your GRE Mock Test'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-medium">
              {error}
            </div>
          )}

          {!isSeatMode ? (
            <>
              <div className="space-y-1.5">
                <label className="font-bold text-[#334155] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#1E3A8A]" />
                  <span>Candidate Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-[#0F172A] outline-none focus:border-[#1E3A8A] focus:bg-white text-xs transition-all"
                  autoFocus
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#334155] flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#1E3A8A]" />
                  <span>Target Score Band</span>
                </label>
                <select
                  value={targetScore}
                  onChange={(e) => setTargetScore(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-[#0F172A] outline-none focus:border-[#1E3A8A] focus:bg-white text-xs transition-all"
                >
                  <option value="325+ (Ivy League & Top 10 MS)">325+ (Ivy League & Top 10 MS)</option>
                  <option value="320+ (Competitive MS / STEM)">320+ (Competitive MS / STEM)</option>
                  <option value="315+ (Top 50 US Universities)">315+ (Top 50 US Universities)</option>
                  <option value="305–314 (Good Baseline)">305–314 (Good Baseline)</option>
                </select>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-200/60 rounded-xl space-y-1 text-emerald-900">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Calibrated Simulation Ready</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-normal">
                  Shortened 2026 GRE benchmark · Section routing · On-screen calculator · Instant score dossier.
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-1.5">
              <label className="font-bold text-[#334155] flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#1E3A8A]" />
                <span>Seat Code or Access Token</span>
              </label>
              <input
                type="text"
                required
                value={seatToken}
                onChange={(e) => setSeatToken(e.target.value.toUpperCase())}
                placeholder="e.g. SEAT-9482 or token"
                className="w-full bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 font-mono text-[#0F172A] outline-none focus:border-[#1E3A8A] focus:bg-white text-xs uppercase transition-all"
                autoFocus
              />
              <p className="text-[10.5px] text-[#64748B]">
                Found in your Testly invitation email or SMS.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#0F172A] hover:bg-[#1E3A8A] text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'Configuring Mock Test...' : isSeatMode ? 'Verify & Enter Mock →' : 'Launch Diagnostic Mock Test →'}</span>
          </button>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSeatMode(!isSeatMode);
                setError('');
              }}
              className="text-[11px] font-semibold text-[#1E3A8A] hover:underline"
            >
              {isSeatMode ? '← Back to instant guest access' : 'Have a Testly 100 Seat Code? Sign in here'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
