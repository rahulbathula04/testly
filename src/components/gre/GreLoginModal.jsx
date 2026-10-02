import React, { useState } from 'react';
import { X, KeyRound, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { testly100Service } from '../../services/testly100Service';

export default function GreLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [tokenInput, setTokenInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    setError('');
    setLoading(true);

    const res = await testly100Service.getAssessmentEntitlement(tokenInput.trim());
    if (res.authorized) {
      testly100Service.setActiveCandidateSession({
        token: res.participant.access_token,
        seatId: res.participant.seat_id,
        name: res.application?.full_name || 'Candidate'
      });
      setLoading(false);
      onLoginSuccess(res);
      onClose();
    } else {
      setError(res.error || 'Seat code or access token not recognized. Please check your invitation.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-blue-50/20">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1E3A8A]">
              CANDIDATE SIGN IN
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] font-serif mt-0.5">
              Access Your GRE Profile
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

        <form onSubmit={handleLogin} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-medium">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="font-bold text-[#334155] flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#1E3A8A]" />
              <span>Seat ID or Access Token</span>
            </label>
            <input
              type="text"
              required
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
              placeholder="e.g. SEAT-1001 or TOKEN"
              className="w-full bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 font-mono text-[#0F172A] outline-none focus:border-[#1E3A8A] focus:bg-white text-xs uppercase transition-all"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0F172A] hover:bg-[#1E3A8A] text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'Verifying Session...' : 'Sign In to Profile →'}</span>
          </button>

          <p className="text-[11px] text-[#64748B] text-center pt-1">
            New test-taker? Launch the mock directly with instant guest access on the home page.
          </p>
        </form>
      </div>
    </div>
  );
}
