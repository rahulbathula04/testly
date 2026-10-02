import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, User, Target, KeyRound, Building2, Phone, Mail, Clock, AlertCircle } from 'lucide-react';
import { testly100Service } from '../../services/testly100Service';

export default function GreOnboardingModal({ isOpen, onClose, onLaunchMock }) {
  // Form fields for First 100 candidate data collection
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [targetScore, setTargetScore] = useState('320+ (Competitive MS / STEM)');
  const [targetIntake, setTargetIntake] = useState('Fall 2027');

  // Mode: 'APPLY' | 'UNDER_REVIEW' | 'SEAT_LOGIN'
  const [mode, setMode] = useState('APPLY');
  const [seatToken, setSeatToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedApp, setSubmittedApp] = useState(null);
  const [metrics, setMetrics] = useState({ capacity: 100, approvedCount: 0, seatsRemaining: 100 });

  useEffect(() => {
    if (isOpen) {
      testly100Service.getDashboardMetrics().then(setMetrics);
      // Check if session exists already
      const active = testly100Service.getActiveCandidateSession();
      if (active?.seatId) {
        setSeatToken(active.seatId);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Application Submission (First 100 Data Collection)
  const handleApply = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setError('Please provide your full name, phone/WhatsApp number, and email.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit phone or WhatsApp number.');
      return;
    }

    setLoading(true);

    try {
      const res = await testly100Service.submitApplication({
        full_name: fullName.trim(),
        phone: `+91 ${cleanPhone.slice(-10)}`,
        email: email.trim(),
        college: college.trim() || 'Engineering / University Student',
        city: 'Hyderabad',
        gre_journey: 'Preparing for GRE',
        target_month: 'November 2026',
        target_country: 'United States',
        target_degree: 'MS / Master of Science',
        target_intake: targetIntake,
        target_score: targetScore,
        captain_code: 'TESTLY-100-DIRECT'
      });

      if (res.error) {
        setError(res.error);
        setLoading(false);
        return;
      }

      setSubmittedApp(res.application);
      setMode('UNDER_REVIEW');
      setLoading(false);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  // Handle Approved Seat ID / Token Login
  const handleSeatLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!seatToken.trim()) {
      setError('Please enter your 6-character Seat ID or Token (e.g. TESTLY-001).');
      return;
    }

    setLoading(true);
    const res = await testly100Service.getAssessmentEntitlement(seatToken.trim());
    if (res.authorized) {
      testly100Service.setActiveCandidateSession({
        token: res.participant.access_token,
        seatId: res.participant.seat_id,
        name: res.application?.full_name || 'Candidate'
      });
      setLoading(false);
      onLaunchMock({
        name: res.application?.full_name || 'Candidate',
        seatId: res.participant.seat_id,
        token: res.participant.access_token
      });
    } else {
      if (res.status === 'UNDER_REVIEW') {
        setSubmittedApp(res.application);
        setMode('UNDER_REVIEW');
      } else {
        setError(res.error || 'Seat ID not recognized or pending approval. Admin approval required at /admin.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-blue-50/30">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-[#1E3A8A]">
              <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>TESTLY 100 EXCLUSIVE COHORT</span>
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] font-serif mt-0.5">
              {mode === 'UNDER_REVIEW'
                ? 'Application Received'
                : mode === 'SEAT_LOGIN'
                ? 'Enter Approved Seat Code'
                : 'Free For First 100 Approved Candidates'}
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

        {/* Counter Banner */}
        <div className="bg-[#EBF3FF] px-6 py-2.5 border-b border-blue-100 flex items-center justify-between text-xs font-semibold text-[#1E3A8A]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Seats Remaining: <strong>{metrics.seatsRemaining} / {metrics.capacity}</strong></span>
          </div>
          <span className="text-[10.5px] font-mono bg-white px-2 py-0.5 rounded border border-blue-200">
            Admin Verified
          </span>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* MODE 1: APPLY (Data Collection First) */}
          {mode === 'APPLY' && (
            <form onSubmit={handleApply} className="space-y-3.5">
              <p className="text-[#64748B] leading-relaxed">
                The full GRE mock test is <strong>100% free for the first 100 candidates</strong>. Submit your profile below for verification and admin approval at <code className="text-[#1E3A8A] font-mono font-bold bg-blue-50 px-1 py-0.5 rounded">/admin</code>.
              </p>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#1E3A8A]" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-[#0F172A] outline-none focus:border-[#1E3A8A] focus:bg-white text-xs transition-all"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#1E3A8A]" />
                    <span>WhatsApp Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-[#0F172A] outline-none focus:border-[#1E3A8A] focus:bg-white text-xs transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#334155] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#1E3A8A]" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="candidate@gmail.com"
                    className="w-full bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-[#0F172A] outline-none focus:border-[#1E3A8A] focus:bg-white text-xs transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#1E3A8A]" />
                  <span>College / University</span>
                </label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. CBIT, VNR VJIET, IIT, JNTU..."
                  className="w-full bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-[#0F172A] outline-none focus:border-[#1E3A8A] focus:bg-white text-xs transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155]">Target Score Band</label>
                  <select
                    value={targetScore}
                    onChange={(e) => setTargetScore(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-[#0F172A] outline-none focus:border-[#1E3A8A] focus:bg-white text-xs transition-all"
                  >
                    <option value="325+ (Ivy League & Top 10 MS)">325+ (Ivy League & Top 10)</option>
                    <option value="320+ (Competitive MS / STEM)">320+ (Competitive STEM)</option>
                    <option value="315+ (Top 50 US Universities)">315+ (Top 50 Universities)</option>
                    <option value="305–314 (Good Baseline)">305–314 (Baseline)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#334155]">Target Intake</label>
                  <select
                    value={targetIntake}
                    onChange={(e) => setTargetIntake(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-[#0F172A] outline-none focus:border-[#1E3A8A] focus:bg-white text-xs transition-all"
                  >
                    <option value="Fall 2027">Fall 2027</option>
                    <option value="Spring 2027">Spring 2027</option>
                    <option value="Fall 2028">Fall 2028</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#0F172A] hover:bg-[#1E3A8A] text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                <span>{loading ? 'Submitting Application...' : 'Submit Profile for Admin Approval →'}</span>
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode('SEAT_LOGIN');
                    setError('');
                  }}
                  className="text-[11px] font-semibold text-[#1E3A8A] hover:underline"
                >
                  Already approved? Enter your Seat ID / Code here
                </button>
              </div>
            </form>
          )}

          {/* MODE 2: UNDER_REVIEW (Data Collected & Pending Admin Approval) */}
          {mode === 'UNDER_REVIEW' && (
            <div className="space-y-4 py-2">
              <div className="w-14 h-14 bg-amber-50 border border-amber-200 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
                <Clock className="w-7 h-7" />
              </div>

              <div className="text-center space-y-1">
                <h4 className="text-lg font-bold text-[#0F172A] font-serif">Profile Submitted for Approval</h4>
                <p className="text-xs text-[#64748B]">
                  Thank you, <strong>{submittedApp?.full_name || fullName}</strong>! Your application for the free 100-participant diagnostic cohort is recorded.
                </p>
              </div>

              <div className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-4 space-y-2 text-[#334155] text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-[#64748B]">Application ID:</span>
                  <span className="font-mono font-bold text-[#0F172A]">{submittedApp?.id?.slice(0, 13) || 'APP-PENDING'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-[#64748B]">Cohort Status:</span>
                  <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase text-[10px]">
                    UNDER_REVIEW (/admin)
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B] pt-1 leading-relaxed">
                  Your seat request is queued in the admin panel at <code className="text-[#1E3A8A] font-mono font-bold">/admin</code>. Once approved by the administrator, you can log in with your Seat ID to take the diagnostic test.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMode('SEAT_LOGIN')}
                  className="w-full py-3 bg-[#0F172A] hover:bg-[#1E3A8A] text-white font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer text-xs"
                >
                  <KeyRound className="w-3.5 h-3.5 text-blue-300" />
                  <span>Enter Approved Seat ID / Code</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 bg-white border border-[#E5E7EB] text-[#0F172A] font-semibold rounded-xl hover:bg-slate-50 transition-colors text-xs cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}

          {/* MODE 3: SEAT_LOGIN (Enter Seat Code) */}
          {mode === 'SEAT_LOGIN' && (
            <form onSubmit={handleSeatLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-bold text-[#334155] flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-[#1E3A8A]" />
                  <span>Approved Seat ID or Token</span>
                </label>
                <input
                  type="text"
                  required
                  value={seatToken}
                  onChange={(e) => setSeatToken(e.target.value.toUpperCase())}
                  placeholder="e.g. TESTLY-001 or TOKEN"
                  className="w-full bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 font-mono text-[#0F172A] outline-none focus:border-[#1E3A8A] focus:bg-white text-xs uppercase transition-all"
                  autoFocus
                />
                <p className="text-[10.5px] text-[#64748B]">
                  Provided after approval from the admin panel at <code className="text-[#1E3A8A] font-mono">/admin</code>.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#0F172A] hover:bg-[#1E3A8A] text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? 'Verifying Approval...' : 'Verify Seat & Launch Mock Test →'}</span>
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode('APPLY');
                    setError('');
                  }}
                  className="text-[11px] font-semibold text-[#1E3A8A] hover:underline"
                >
                  ← Back to free seat application form
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
