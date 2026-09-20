import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  Clock,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  UserCheck,
  Plus,
  BarChart3,
  Globe,
  Download,
  RefreshCw,
  LogOut,
  ChevronRight,
  IndianRupee,
  Check,
  Building2,
  FileText,
  ExternalLink,
  ShieldCheck,
  X,
  Activity,
  Copy,
  Sliders,
  Send,
  Database,
  Phone,
  Mail,
  Filter
} from 'lucide-react';
import { testly100Service } from '../../../services/testly100Service';
import { getSupabaseConfigStatus } from '../../../services/supabaseClient';
import { getStoredLeads, saveStoredLeads } from '../../../utils/crmStore';
import ParticipantProfileDrawer from './ParticipantProfileDrawer';
import BrandLogo from '../../BrandLogo';

export default function Testly100CommandCenter({
  onNavigateHome,
  adminUser = { name: 'Rahul Bathula', email: 'rahulbathula04@gmail.com', role: 'Super Admin' },
  onLogout,
  initialView = 'dashboard'
}) {
  const [activeNav, setActiveNav] = useState(initialView);
  const [dataState, setDataState] = useState(testly100Service.getAllData());
  const [metrics, setMetrics] = useState({
    capacity: 100,
    approvedCount: 0,
    seatsRemaining: 100,
    isFull: false,
    pendingCount: 0,
    waitlistedCount: 0,
    rejectedCount: 0,
    activeNow: 0,
    idleNow: 0,
    pausedNow: 0,
    completedNow: 0,
    notStartedNow: 0,
    attentionNeededCount: 0,
    isDemoMode: false,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null); // { participant, application, session, report }
  const [actionNotice, setActionNotice] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 100 Invite Links State
  const [copied100Text, setCopied100Text] = useState(false);
  const [copiedLinkMap, setCopiedLinkMap] = useState({});
  const [linksFilter, setLinksFilter] = useState('ALL'); // 'ALL', 'AVAILABLE', 'APPLIED', 'APPROVED'
  const [linksSearch, setLinksSearch] = useState('');

  // Leads CRM State
  const [leadsList, setLeadsList] = useState(getStoredLeads());
  const [leadsSearch, setLeadsSearch] = useState('');
  const [leadsFilter, setLeadsFilter] = useState('ALL');
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({ name: '', phone: '', exam: 'GRE', timing: 'Within 30 Days', city: 'Hyderabad' });

  // New Invite Form State
  const [newInviteCode, setNewInviteCode] = useState('');
  const [newInviteCap, setNewInviteCap] = useState('');
  const [showNewInviteModal, setShowNewInviteModal] = useState(false);

  // Load and refresh state
  const refreshData = async () => {
    setIsRefreshing(true);
    const m = await testly100Service.getDashboardMetrics();
    setMetrics(m);
    setDataState(testly100Service.getAllData());
    setLeadsList(getStoredLeads());
    setTimeout(() => setIsRefreshing(false), 300);
  };

  useEffect(() => {
    refreshData();
    const handleUpdate = () => refreshData();
    const handleLeadsUpdate = (e) => setLeadsList(e.detail || getStoredLeads());
    window.addEventListener('testly100_data_changed', handleUpdate);
    window.addEventListener('testly_leads_updated', handleLeadsUpdate);

    // Heartbeat ticker every 10 seconds for live table updates
    const interval = setInterval(() => {
      refreshData();
    }, 10000);

    return () => {
      window.removeEventListener('testly100_data_changed', handleUpdate);
      window.removeEventListener('testly_leads_updated', handleLeadsUpdate);
      clearInterval(interval);
    };
  }, []);

  const showNotification = (msg) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(''), 4000);
  };

  // Seat Allocation Action
  const handleApprove = async (appId) => {
    try {
      const res = await testly100Service.approveApplication(appId, adminUser.email);
      showNotification(`Applicant approved. Seat ${res.seat_id} allocated atomically.`);
      refreshData();
    } catch (err) {
      alert(err.message || 'Seat allocation failed.');
    }
  };

  const handleReject = async (appId) => {
    if (!window.confirm('Reject this candidate application?')) return;
    try {
      await testly100Service.rejectApplication(appId, adminUser.email);
      showNotification('Application rejected.');
      refreshData();
    } catch (err) {
      alert(err.message || 'Failed to reject.');
    }
  };

  const handleWaitlist = async (appId) => {
    try {
      await testly100Service.waitlistApplication(appId, adminUser.email);
      showNotification('Candidate moved to waitlist.');
      refreshData();
    } catch (err) {
      alert(err.message || 'Failed to waitlist.');
    }
  };

  const handleCreateInvite = async (e) => {
    e.preventDefault();
    if (!newInviteCode.trim()) return;
    try {
      await testly100Service.createInvite(newInviteCode, null, newInviteCap ? parseInt(newInviteCap, 10) : null);
      setNewInviteCode('');
      setNewInviteCap('');
      setShowNewInviteModal(false);
      showNotification('New invite code created.');
      refreshData();
    } catch (err) {
      alert(err.message || 'Error creating invite.');
    }
  };

  const handleCopyInviteLink = () => {
    const inviteUrl = `${window.location.origin}/invite/testly-100`;
    navigator.clipboard.writeText(inviteUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    showNotification('Official Testly 100 invite application link copied.');
  };

  // 100 Private Cohort Links Memos & Actions
  const all100Links = useMemo(() => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://testly.in';
    return testly100Service.get100InviteLinks(baseUrl);
  }, [dataState]);

  const linksMetrics = useMemo(() => {
    const total = all100Links.length;
    const available = all100Links.filter(l => l.status === 'AVAILABLE').length;
    const applied = all100Links.filter(l => l.status === 'PENDING' || l.status === 'WAITLISTED').length;
    const approved = all100Links.filter(l => l.status === 'APPROVED').length;
    return { total, available, applied, approved };
  }, [all100Links]);

  const filtered100Links = useMemo(() => {
    return all100Links.filter(item => {
      if (linksFilter === 'AVAILABLE' && item.status !== 'AVAILABLE') return false;
      if (linksFilter === 'APPLIED' && (item.status === 'AVAILABLE' || item.status === 'APPROVED')) return false;
      if (linksFilter === 'APPROVED' && item.status !== 'APPROVED') return false;

      if (linksSearch.trim()) {
        const q = linksSearch.toLowerCase();
        const matchCode = item.code.toLowerCase().includes(q);
        const matchSeat = item.seatId.toLowerCase().includes(q);
        const matchName = (item.applicantName || '').toLowerCase().includes(q);
        const matchEmail = (item.applicantEmail || '').toLowerCase().includes(q);
        return matchCode || matchSeat || matchName || matchEmail;
      }
      return true;
    });
  }, [all100Links, linksFilter, linksSearch]);

  const handleCopySingleLink = (code, url) => {
    navigator.clipboard.writeText(url);
    setCopiedLinkMap(prev => ({ ...prev, [code]: true }));
    setTimeout(() => {
      setCopiedLinkMap(prev => ({ ...prev, [code]: false }));
    }, 2000);
    showNotification(`Copied private link: ${url}`);
  };

  const handleCopyAll100 = () => {
    const formatted = testly100Service.copyAll100LinksFormatted(window.location.origin);
    navigator.clipboard.writeText(formatted);
    setCopied100Text(true);
    setTimeout(() => setCopied100Text(false), 3000);
    showNotification('All 100 formatted invite links copied to clipboard!');
  };

  const handleExport100CSV = () => {
    const csv = testly100Service.export100LinksCSV(window.location.origin);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `testly_100_private_invite_links_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('100 invite links CSV export generated.');
  };

  // CSV Cohort Export
  const handleExportCSV = () => {
    const participants = dataState.participants || [];
    const applications = dataState.applications || [];
    const sessions = dataState.sessions || [];
    const reports = dataState.reports || [];

    const headers = ['Seat ID', 'Full Name', 'Email', 'Phone', 'College', 'City', 'Target GRE Date', 'Captain Code', 'Status', 'Practice Quant', 'Practice Verbal', 'Total Score', 'Approved At'];
    const rows = participants.map(p => {
      const app = applications.find(a => a.id === p.application_id) || {};
      const rep = reports.find(r => r.participant_id === p.id) || {};
      return [
        p.seat_id,
        `"${app.full_name || ''}"`,
        app.email || '',
        app.phone || '',
        `"${app.college || ''}"`,
        app.city || '',
        app.target_gre_date || '',
        app.captain_code || 'DIRECT',
        p.status,
        rep.practice_quant_score || '',
        rep.practice_verbal_score || '',
        rep.total_practice_score || '',
        p.approved_at || ''
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `testly_100_cohort_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Testly 100 cohort CSV export generated.');
  };

  // Live telemetry calculations for the table
  const liveParticipantsList = useMemo(() => {
    const now = Date.now();
    return dataState.participants.map(part => {
      const app = dataState.applications.find(a => a.id === part.application_id) || {};
      const sess = dataState.sessions.find(s => s.participant_id === part.id) || {};
      const lastSec = Math.round((now - new Date(sess.last_activity_at || 0).getTime()) / 1000);
      
      let liveStatus = part.status;
      let connection = 'Connected';

      if (part.status === 'REVOKED') {
        liveStatus = 'REVOKED';
        connection = 'Blocked';
      } else if (sess.status === 'COMPLETED' || sess.status === 'SUBMITTED') {
        liveStatus = 'COMPLETED';
        connection = 'Submitted';
      } else if (sess.status === 'PAUSED') {
        liveStatus = 'PAUSED';
        connection = 'On Pause';
      } else if (sess.status === 'NOT_STARTED') {
        liveStatus = 'NOT STARTED';
        connection = 'Waiting';
      } else if (lastSec < 35) {
        liveStatus = 'ACTIVE';
        connection = 'Realtime';
      } else if (lastSec < 120) {
        liveStatus = 'IDLE';
        connection = 'Idle';
      } else {
        liveStatus = 'DISCONNECTED';
        connection = 'Signal Lost';
      }

      const progressPct = Math.min(100, Math.round(((sess.current_question || 1) / 27) * 100));

      return {
        ...part,
        applicant: app,
        session: sess,
        liveStatus,
        connection,
        lastActiveSec: lastSec,
        progressPct,
      };
    });
  }, [dataState]);

  // Filtered lists based on search
  const filteredParticipants = useMemo(() => {
    if (!searchQuery.trim()) return liveParticipantsList;
    const q = searchQuery.toLowerCase();
    return liveParticipantsList.filter(p =>
      p.seat_id.toLowerCase().includes(q) ||
      (p.applicant?.full_name || '').toLowerCase().includes(q) ||
      (p.applicant?.college || '').toLowerCase().includes(q) ||
      (p.applicant?.email || '').toLowerCase().includes(q)
    );
  }, [liveParticipantsList, searchQuery]);

  const pendingApplicants = useMemo(() => {
    return dataState.applications.filter(a => a.status === 'PENDING');
  }, [dataState.applications]);

  const waitlistedApplicants = useMemo(() => {
    return dataState.applications.filter(a => a.status === 'WAITLISTED');
  }, [dataState.applications]);

  const completedParticipants = useMemo(() => {
    return liveParticipantsList.filter(p => p.liveStatus === 'COMPLETED');
  }, [liveParticipantsList]);

  const supabaseStatus = getSupabaseConfigStatus();

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] flex font-[Inter,system-ui,sans-serif] antialiased selection:bg-[#1E3A8A] selection:text-white">
      
      {/* ── LEFT SIDEBAR (Authoritative Navigation) ────────────────────────── */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between flex-shrink-0 z-20">
        <div>
          {/* Brand header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BrandLogo variant="horizontal" size="sm" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-[#1E3A8A] border border-blue-200">
              Admin OS
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-6 text-xs font-medium">
            {/* GROUP 1: TESTLY ADMIN */}
            <div>
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                Testly Admin
              </div>
              <button
                onClick={() => setActiveNav('dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left ${
                  activeNav === 'dashboard'
                    ? 'bg-[#0F172A] text-white font-semibold shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <BarChart3 className="w-4 h-4" />
                  <span>Dashboard</span>
                </span>
              </button>
            </div>

            {/* GROUP 2: TESTLY 100 */}
            <div>
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#1E3A8A] flex items-center justify-between mb-1.5">
                <span>Testly 100 Event</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="space-y-0.5">
                {[
                  { id: 'overview', label: 'Overview', icon: Globe },
                  { id: '100-links', label: '100 Invite Links', icon: Send, badge: `${linksMetrics.available} Avail`, highlight: true },
                  { id: 'applicants', label: 'Applicants', icon: Users, badge: metrics.pendingCount },
                  { id: 'approved', label: 'Approved (100 Roster)', icon: UserCheck, badge: `${metrics.approvedCount}/100` },
                  { id: 'waitlist', label: 'Waitlist', icon: Clock, badge: metrics.waitlistedCount },
                  { id: 'live-activity', label: 'Live Command Center', icon: Activity, badge: metrics.activeNow ? `${metrics.activeNow} Live` : null, highlight: true },
                  { id: 'completed', label: 'Completed', icon: CheckCircle2, badge: metrics.completedNow },
                  { id: 'captains', label: 'Captains & Ambassadors', icon: Building2 },
                  { id: 'invites', label: 'Invites & Tokens', icon: Send },
                  { id: 'reports', label: 'Reports & Export', icon: FileText },
                  { id: 'settings', label: 'Event Settings', icon: Sliders },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveNav(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg transition-colors text-left ${
                        isActive
                          ? 'bg-[#0F172A] text-white font-semibold shadow-xs'
                          : item.highlight
                          ? 'text-[#0F172A] font-semibold bg-blue-50/70 hover:bg-blue-100/70'
                          : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{item.label}</span>
                      </span>
                      {item.badge !== undefined && item.badge !== null && (
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.highlight
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GROUP 3: OPERATIONS */}
            <div>
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                Operations
              </div>
              <div className="space-y-0.5">
                <button
                  onClick={() => setActiveNav('leads')}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg transition-colors text-left ${
                    activeNav === 'leads'
                      ? 'bg-[#0F172A] text-white font-semibold shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Bookings & Leads CRM</span>
                  </span>
                  {leadsList.length > 0 && (
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                      activeNav === 'leads' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {leadsList.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveNav('exam-offerings')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-colors text-left ${
                    activeNav === 'exam-offerings'
                      ? 'bg-[#0F172A] text-white font-semibold shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
                  }`}
                >
                  <IndianRupee className="w-3.5 h-3.5" />
                  <span>Exam Pricing Master</span>
                </button>
              </div>
            </div>

            {/* GROUP 4: SYSTEM */}
            <div>
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                System
              </div>
              <div className="space-y-0.5">
                <button
                  onClick={() => setActiveNav('audit-log')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-colors text-left ${
                    activeNav === 'audit-log'
                      ? 'bg-[#0F172A] text-white font-semibold shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Audit Log</span>
                </button>
                <button
                  onClick={() => setActiveNav('admin-settings')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-colors text-left ${
                    activeNav === 'admin-settings'
                      ? 'bg-[#0F172A] text-white font-semibold shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Admin & Supabase Health</span>
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Admin Footer info */}
        <div className="p-4 border-t border-slate-200 bg-[#FAF9F6] text-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs">
                RB
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-[#0F172A] truncate leading-none">{adminUser.name}</div>
                <div className="text-[10px] text-[#64748B] truncate mt-0.5">{adminUser.email}</div>
              </div>
            </div>
            <button
              onClick={onLogout}
              title="Logout"
              className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[11px] text-[#64748B]">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#1E3A8A] flex items-center gap-1 font-medium transition-colors"
            >
              <Globe className="w-3 h-3" />
              <span>Public Website</span>
            </button>
            <span className="font-mono text-[10px]">AUTH-OK</span>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT WORKSPACE ─────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP COMMAND HEADER */}
        <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shadow-sm">
          {/* Left: Title & Context */}
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold font-serif text-[#0F172A] tracking-tight">
              Testly Command Center
            </h1>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#64748B]">Active Event:</span>
              <span className="font-mono font-bold text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                TESTLY 100
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                LIVE COHORT
              </span>
            </div>
          </div>

          {/* Right: Search, Heartbeat, Invite Link Copy, Refresh */}
          <div className="flex items-center gap-2.5">
            {/* Real Heartbeat indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] tracking-wide font-mono">LIVE TELEMETRY</span>
            </div>

            {/* 100 Invite Links direct nav */}
            <button
              onClick={() => setActiveNav('100-links')}
              className="px-3 py-1.5 bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>100 Invite Links</span>
            </button>

            {/* 1-Click Copy All 100 Links */}
            <button
              onClick={handleCopyAll100}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              title="Copy all 100 formatted invite links ready for sending"
            >
              {copied100Text ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#1E3A8A]" />}
              <span>{copied100Text ? 'All 100 Copied!' : 'Copy All 100'}</span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
              title="Refresh Telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </header>

        {/* Action Notice Notification Banner */}
        {actionNotice && (
          <div className="bg-[#1E3A8A] text-white px-6 py-2 text-xs font-medium flex items-center justify-between animate-in slide-in-from-top duration-200">
            <span>{actionNotice}</span>
            <button onClick={() => setActionNotice('')} className="text-white/80 hover:text-white text-xs">Dismiss</button>
          </div>
        )}

        {/* DEMO MODE NOTICE (Rule #3 Compliance) */}
        {metrics.isDemoMode && (
          <div className="bg-amber-500 text-slate-950 px-6 py-2 text-xs font-bold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>DEMO MODE ACTIVE: Viewing simulated development cohort. Clean production data is preserved.</span>
            </span>
            <button
              onClick={() => {
                testly100Service.toggleDemoMode(false);
                refreshData();
              }}
              className="px-2.5 py-1 bg-slate-950 text-amber-400 rounded text-[11px] font-mono hover:bg-slate-900 transition-colors"
            >
              Exit Demo Mode
            </button>
          </div>
        )}

        {/* ── WORKSPACE BODY CONTENT ──────────────────────────────────────── */}
        <div className="p-6 space-y-6 flex-1">
          
          {/* ── EXECUTIVE PULSE (Primary Command Cards) ──────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: APPROVED SEATS (Capacity Invariant <= 100) */}
            <div
              onClick={() => setActiveNav('approved')}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm cursor-pointer hover:border-[#1E3A8A] transition-all"
            >
              <div className="flex items-center justify-between text-[#64748B] text-xs font-bold uppercase tracking-wider mb-2">
                <span>Approved Seats</span>
                <span className="font-mono text-[#1E3A8A]">Atomic Cap: 100</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-serif text-[#0F172A]">{metrics.approvedCount}</span>
                <span className="text-sm font-semibold text-[#64748B]">/ {metrics.capacity}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-medium">
                  {metrics.seatsRemaining} seats remaining
                </span>
                <span className="font-mono text-[11px] text-slate-500">
                  {Math.round((metrics.approvedCount / metrics.capacity) * 100)}% Filled
                </span>
              </div>
              {/* Mini progress bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-[#1E3A8A] h-full rounded-full transition-all duration-500"
                  style={{ width: `${(metrics.approvedCount / metrics.capacity) * 100}%` }}
                />
              </div>
            </div>

            {/* Card 2: LIVE NOW (Real Telemetry Active/Idle/Paused/Completed) */}
            <div
              onClick={() => setActiveNav('live-activity')}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm cursor-pointer hover:border-emerald-500 transition-all"
            >
              <div className="flex items-center justify-between text-[#64748B] text-xs font-bold uppercase tracking-wider mb-2">
                <span>Live Now</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="text-3xl font-bold font-serif text-[#0F172A]">
                {metrics.activeNow} <span className="text-xs font-sans font-semibold text-emerald-700">Active</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-1 text-[11px] text-slate-600 font-medium pt-2 border-t border-slate-100">
                <span>{metrics.idleNow} Idle</span>
                <span>{metrics.pausedNow} Paused</span>
                <span>{metrics.completedNow} Done</span>
              </div>
            </div>

            {/* Card 3: PENDING APPLICATIONS */}
            <div
              onClick={() => setActiveNav('applicants')}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm cursor-pointer hover:border-blue-500 transition-all"
            >
              <div className="flex items-center justify-between text-[#64748B] text-xs font-bold uppercase tracking-wider mb-2">
                <span>Pending Review</span>
                <Users className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div className="text-3xl font-bold font-serif text-[#0F172A]">
                {metrics.pendingCount} <span className="text-xs font-sans font-semibold text-slate-500">applicants</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-[#64748B]">
                <span>Requires Admin Review</span>
                <span className="text-[#1E3A8A] font-semibold flex items-center gap-0.5">
                  Queue <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Card 4: OPERATIONAL ALERTS */}
            <div
              onClick={() => setActiveNav('settings')}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm cursor-pointer hover:border-amber-500 transition-all"
            >
              <div className="flex items-center justify-between text-[#64748B] text-xs font-bold uppercase tracking-wider mb-2">
                <span>Attention Alerts</span>
                <AlertTriangle className={`w-3.5 h-3.5 ${metrics.attentionNeededCount > 0 ? 'text-amber-500' : 'text-slate-400'}`} />
              </div>
              <div className="text-3xl font-bold font-serif text-[#0F172A]">
                {metrics.attentionNeededCount} <span className="text-xs font-sans font-semibold text-slate-500">items</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className={metrics.attentionNeededCount > 0 ? 'text-amber-700 font-semibold' : 'text-slate-500'}>
                  {metrics.attentionNeededCount > 0 ? 'Telemetry/Seat alerts' : 'All systems normal'}
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  {supabaseStatus.status}
                </span>
              </div>
            </div>
          </div>

          {/* ── CONDITIONAL SUBVIEW RENDERING ────────────────────────────── */}

          {/* VIEW: DASHBOARD / OVERVIEW */}
          {(activeNav === 'dashboard' || activeNav === 'overview') && (
            <div className="space-y-6">

              {/* ── 100 INVITE LINKS SPOTLIGHT CARD ── */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#1E3A8A] border border-blue-200">
                      Exclusive Cohort Access
                    </span>
                    <span className="text-xs font-mono font-semibold text-emerald-700">
                      {linksMetrics.available} of 100 Seats Available
                    </span>
                    <span className="text-[11px] text-[#64748B]">
                      · {linksMetrics.applied} Applied · {linksMetrics.approved} Approved
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-serif text-[#0F172A]">
                    100 Private Assessment Invite Links Ready
                  </h3>
                  <p className="text-xs text-[#64748B] max-w-xl">
                    Pre-generated sequential tokens (<code className="font-mono text-[11px] text-[#1E3A8A]">TESTLY-INV-001</code> to <code className="font-mono text-[11px] text-[#1E3A8A]">TESTLY-INV-100</code>). Send to candidates to let them apply; your admin approval grants access.
                  </p>
                </div>
                <div className="flex items-center gap-2.5 w-full md:w-auto">
                  <button
                    onClick={handleCopyAll100}
                    className="flex-1 md:flex-none px-4 py-2 bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
                  >
                    {copied100Text ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied100Text ? 'All 100 Links Copied!' : 'Copy All 100 Links'}</span>
                  </button>
                  <button
                    onClick={() => setActiveNav('100-links')}
                    className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-[#0F172A] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    View 100 Links Table
                  </button>
                </div>
              </div>

              {/* Quick Actions & Search Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search candidate by name, seat, or college..."
                    className="w-full bg-white border border-slate-200 pl-9 pr-3 py-2 rounded-xl text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {!metrics.isDemoMode && (
                    <button
                      onClick={() => {
                        testly100Service.toggleDemoMode(true);
                        refreshData();
                      }}
                      className="px-3 py-2 border border-slate-200 text-xs font-semibold rounded-xl text-slate-700 hover:bg-white transition-colors cursor-pointer"
                    >
                      Load Demo Cohort (Testing)
                    </button>
                  )}
                  <button
                    onClick={handleExportCSV}
                    className="px-3 py-2 bg-white border border-slate-200 text-xs font-semibold rounded-xl text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#1E3A8A]" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={() => setActiveNav('applicants')}
                    className="px-3.5 py-2 bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs cursor-pointer"
                  >
                    Review Applicants ({metrics.pendingCount})
                  </button>
                </div>
              </div>

              {/* Live Activity Table Preview */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#1E3A8A]" />
                    <h2 className="text-sm font-bold font-serif text-[#0F172A]">
                      Live Participant Telemetry
                    </h2>
                    <span className="text-xs text-[#64748B]">({filteredParticipants.length} approved)</span>
                  </div>

                  <button
                    onClick={() => setActiveNav('live-activity')}
                    className="text-xs font-semibold text-[#1E3A8A] hover:underline flex items-center gap-1"
                  >
                    <span>Open Live Command Center</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {filteredParticipants.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-sm font-bold text-[#0F172A]">No Approved Participants Yet</h3>
                    <p className="text-xs text-[#64748B] max-w-sm mx-auto mt-1 mb-4">
                      Production starts clean. Review pending applications or share the invite link to begin populating the 100-seat cohort.
                    </p>
                    <button
                      onClick={handleCopyInviteLink}
                      className="px-4 py-2 bg-[#1E3A8A] text-white text-xs font-semibold rounded-xl hover:bg-[#1E3A8A]/90 transition-colors"
                    >
                      Copy Official Invite Link
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-[#64748B] font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                        <tr>
                          <th className="py-3 px-4">Seat ID</th>
                          <th className="py-3 px-4">Participant</th>
                          <th className="py-3 px-4">College</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Section & Progress</th>
                          <th className="py-3 px-4">Time Left</th>
                          <th className="py-3 px-4">Last Ping</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredParticipants.slice(0, 10).map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-[#1E3A8A]">
                              {p.seat_id}
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-semibold text-[#0F172A]">{p.applicant?.full_name || 'Candidate'}</div>
                              <div className="text-[11px] text-[#64748B]">{p.applicant?.email}</div>
                            </td>
                            <td className="py-3 px-4 text-slate-600">
                              {p.applicant?.college || '—'}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                p.liveStatus === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                                p.liveStatus === 'IDLE' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                                p.liveStatus === 'PAUSED' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' :
                                p.liveStatus === 'COMPLETED' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                p.liveStatus === 'REVOKED' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                                'bg-slate-100 text-slate-600'
                              }`}>
                                {p.liveStatus}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-medium text-slate-800">
                                {p.session?.current_section || 'Waiting to start'}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-[#1E3A8A] h-full" style={{ width: `${p.progressPct}%` }} />
                                </div>
                                <span className="text-[10px] font-mono text-slate-500">{p.progressPct}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-mono font-medium text-slate-700">
                              {Math.floor((p.session?.time_remaining_seconds || 7080) / 60)}m
                            </td>
                            <td className="py-3 px-4 text-[11px] text-slate-500">
                              {p.lastActiveSec < 60 ? `${p.lastActiveSec}s ago` : `${Math.floor(p.lastActiveSec / 60)}m ago`}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => setSelectedItem({
                                  participant: p,
                                  application: p.applicant,
                                  session: p.session,
                                  report: dataState.reports.find(r => r.participant_id === p.id),
                                })}
                                className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-[#1E3A8A] hover:text-white text-[11px] font-semibold transition-colors"
                              >
                                View Profile
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW: LIVE COMMAND CENTER (The Flagship Telemetry Table) */}
          {activeNav === 'live-activity' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-serif font-bold text-[#0F172A]">Live Command Center</h2>
                  <p className="text-xs text-[#64748B]">
                    Second-by-second participant telemetry stream. Updates automatically.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-xs text-[#64748B] flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <strong>{metrics.activeNow}</strong> Active
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <strong>{metrics.idleNow}</strong> Idle
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <strong>{metrics.completedNow}</strong> Completed
                    </span>
                  </div>
                </div>
              </div>

              {/* Full Live Table */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-[#64748B] font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Seat ID</th>
                        <th className="py-3 px-4">Candidate</th>
                        <th className="py-3 px-4">Live Status</th>
                        <th className="py-3 px-4">Current Section</th>
                        <th className="py-3 px-4">Question</th>
                        <th className="py-3 px-4">Progress</th>
                        <th className="py-3 px-4">Time Left</th>
                        <th className="py-3 px-4">Last Activity</th>
                        <th className="py-3 px-4">Connection</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredParticipants.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-[#1E3A8A]">
                            {p.seat_id}
                          </td>
                          <td className="py-3 px-4 font-semibold text-[#0F172A]">
                            {p.applicant?.full_name || 'Candidate'}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              p.liveStatus === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                              p.liveStatus === 'IDLE' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                              p.liveStatus === 'PAUSED' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' :
                              p.liveStatus === 'COMPLETED' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                              p.liveStatus === 'REVOKED' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                              {p.liveStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-700 font-medium">
                            {p.session?.current_section || '—'}
                          </td>
                          <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                            Q{p.session?.current_question || 1} / 27
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#1E3A8A] h-full" style={{ width: `${p.progressPct}%` }} />
                              </div>
                              <span className="text-[10px] font-mono text-slate-500">{p.progressPct}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-700">
                            {Math.floor((p.session?.time_remaining_seconds || 7080) / 60)}:
                            {String((p.session?.time_remaining_seconds || 7080) % 60).padStart(2, '0')}
                          </td>
                          <td className="py-3 px-4 text-[11px] text-slate-500">
                            {p.lastActiveSec < 60 ? `${p.lastActiveSec}s ago` : `${Math.floor(p.lastActiveSec / 60)}m ago`}
                          </td>
                          <td className="py-3 px-4 text-[11px]">
                            <span className="flex items-center gap-1 font-medium text-slate-600">
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                p.connection === 'Realtime' ? 'bg-emerald-500' :
                                p.connection === 'Idle' ? 'bg-amber-500' :
                                p.connection === 'Submitted' ? 'bg-blue-500' :
                                'bg-slate-400'
                              }`} />
                              {p.connection}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedItem({
                                participant: p,
                                application: p.applicant,
                                session: p.session,
                                report: dataState.reports.find(r => r.participant_id === p.id),
                              })}
                              className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-[#1E3A8A] hover:text-white text-[11px] font-semibold transition-colors"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: APPLICANTS QUEUE (Pending Review & 1-Click Atomic Approval) */}
          {activeNav === 'applicants' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-serif font-bold text-[#0F172A]">Pending Applicants</h2>
                  <p className="text-xs text-[#64748B]">
                    Invite Link ≠ Access. Candidates in this queue cannot take the test until you approve their seat.
                  </p>
                </div>
                <div className="text-xs font-semibold text-[#1E3A8A] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                  {metrics.seatsRemaining} Seats Remaining of 100
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                {pendingApplicants.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <UserCheck className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                    <h3 className="text-sm font-bold text-[#0F172A]">No Pending Applications</h3>
                    <p className="text-xs text-[#64748B] max-w-sm mx-auto mt-1 mb-4">
                      All submitted applications have been processed. Share the invite link to receive new candidate submissions.
                    </p>
                    <button
                      onClick={handleCopyInviteLink}
                      className="px-4 py-2 bg-[#1E3A8A] text-white text-xs font-semibold rounded-xl hover:bg-[#1E3A8A]/90 transition-colors"
                    >
                      Copy Invite Link
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-[#64748B] font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4">Applicant</th>
                          <th className="py-3 px-4">College / University</th>
                          <th className="py-3 px-4">City</th>
                          <th className="py-3 px-4">Target Exam Date</th>
                          <th className="py-3 px-4">Captain Ref</th>
                          <th className="py-3 px-4">Applied At</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {pendingApplicants.map((app) => (
                          <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4">
                              <div className="font-semibold text-[#0F172A]">{app.full_name}</div>
                              <div className="text-[11px] text-[#64748B]">{app.email} · {app.phone}</div>
                            </td>
                            <td className="py-3 px-4 text-slate-700 font-medium">
                              {app.college}
                            </td>
                            <td className="py-3 px-4 text-slate-600">
                              {app.city}
                            </td>
                            <td className="py-3 px-4 text-slate-700">
                              {app.target_gre_date} ({app.target_country})
                            </td>
                            <td className="py-3 px-4 font-mono text-[11px] text-[#1E3A8A]">
                              {app.captain_code || 'DIRECT'}
                            </td>
                            <td className="py-3 px-4 text-slate-500 text-[11px]">
                              {new Date(app.applied_at).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 text-right space-x-1.5">
                              <button
                                onClick={() => handleApprove(app.id)}
                                className="px-3 py-1 rounded-lg bg-[#1E3A8A] text-white text-xs font-semibold hover:bg-[#1E3A8A]/90 transition-colors shadow-sm"
                              >
                                Approve Seat
                              </button>
                              <button
                                onClick={() => handleWaitlist(app.id)}
                                className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors"
                              >
                                Waitlist
                              </button>
                              <button
                                onClick={() => handleReject(app.id)}
                                className="px-2.5 py-1 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors"
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW: WAITLIST */}
          {activeNav === 'waitlist' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-serif font-bold text-[#0F172A]">Waitlisted Applicants</h2>
                  <p className="text-xs text-[#64748B]">
                    Candidates on hold. You can promote waitlisted candidates to approved seats if quota is available.
                  </p>
                </div>
                <div className="text-xs font-semibold text-[#1E3A8A] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                  {metrics.seatsRemaining} Seats Remaining
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                {waitlistedApplicants.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-sm font-bold text-[#0F172A]">No Waitlisted Applicants</h3>
                    <p className="text-xs text-[#64748B] max-w-sm mx-auto mt-1">
                      Candidates moved to waitlist from the applicant review queue will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-[#64748B] font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4">Applicant</th>
                          <th className="py-3 px-4">College</th>
                          <th className="py-3 px-4">City</th>
                          <th className="py-3 px-4">Target Exam Date</th>
                          <th className="py-3 px-4">Waitlisted On</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {waitlistedApplicants.map((app) => (
                          <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4 font-semibold text-[#0F172A]">
                              {app.full_name}
                              <div className="text-[11px] text-[#64748B]">{app.email}</div>
                            </td>
                            <td className="py-3 px-4 text-slate-600">{app.college}</td>
                            <td className="py-3 px-4 text-slate-600">{app.city}</td>
                            <td className="py-3 px-4 text-slate-700">{app.target_gre_date}</td>
                            <td className="py-3 px-4 text-slate-500 text-[11px]">
                              {app.reviewed_at ? new Date(app.reviewed_at).toLocaleDateString() : '—'}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => handleApprove(app.id)}
                                disabled={metrics.seatsRemaining <= 0}
                                className="px-3 py-1 rounded-lg bg-[#1E3A8A] text-white text-xs font-semibold hover:bg-[#1E3A8A]/90 transition-colors shadow-sm disabled:opacity-50"
                              >
                                Promote to Approved
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW: APPROVED (The 100-Seat Roster) */}
          {activeNav === 'approved' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-serif font-bold text-[#0F172A]">The 100-Seat Approved Roster</h2>
                  <p className="text-xs text-[#64748B]">
                    Immutable seat allocation: exactly 100 approved seats (TESTLY-001 through TESTLY-100).
                  </p>
                </div>
                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 bg-white border border-slate-200 text-xs font-semibold rounded-lg text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#1E3A8A]" />
                  <span>Download Roster CSV</span>
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-[#64748B] font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Seat ID</th>
                        <th className="py-3 px-4">Candidate Name</th>
                        <th className="py-3 px-4">College</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Approved Date</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {liveParticipantsList.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-[#1E3A8A]">
                            {p.seat_id}
                          </td>
                          <td className="py-3 px-4 font-semibold text-[#0F172A]">
                            {p.applicant?.full_name || 'Candidate'}
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {p.applicant?.college || '—'}
                          </td>
                          <td className="py-3 px-4 text-slate-500">
                            {p.applicant?.email}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              p.status === 'REVOKED' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[11px] text-slate-500">
                            {new Date(p.approved_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedItem({
                                participant: p,
                                application: p.applicant,
                                session: p.session,
                                report: dataState.reports.find(r => r.participant_id === p.id),
                              })}
                              className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-[#1E3A8A] hover:text-white text-[11px] font-semibold transition-colors"
                            >
                              Profile & Actions
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: COMPLETED CANDIDATES & REPORTS */}
          {activeNav === 'completed' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-serif font-bold text-[#0F172A]">Completed Diagnostic Assessments</h2>
                  <p className="text-xs text-[#64748B]">
                    Participants who finished their simulation. Uninflated Testly Practice Scores generated.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                {completedParticipants.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-sm font-bold text-[#0F172A]">No Submissions Completed Yet</h3>
                    <p className="text-xs text-[#64748B] max-w-sm mx-auto mt-1">
                      Candidates currently in progress will appear here as soon as they submit their assessment.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-[#64748B] font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4">Seat ID</th>
                          <th className="py-3 px-4">Participant</th>
                          <th className="py-3 px-4">Total Practice Score</th>
                          <th className="py-3 px-4">Quant</th>
                          <th className="py-3 px-4">Verbal</th>
                          <th className="py-3 px-4">Accuracy</th>
                          <th className="py-3 px-4 text-right">Report Link</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {completedParticipants.map(p => {
                          const rep = dataState.reports.find(r => r.participant_id === p.id) || {};
                          return (
                            <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3 px-4 font-mono font-bold text-[#1E3A8A]">{p.seat_id}</td>
                              <td className="py-3 px-4 font-semibold text-[#0F172A]">{p.applicant?.full_name}</td>
                              <td className="py-3 px-4 font-serif text-base font-bold text-[#1E3A8A]">
                                {rep.total_practice_score || 310}
                              </td>
                              <td className="py-3 px-4 font-medium text-slate-700">{rep.practice_quant_score || 156}</td>
                              <td className="py-3 px-4 font-medium text-slate-700">{rep.practice_verbal_score || 154}</td>
                              <td className="py-3 px-4 text-slate-600">{rep.accuracy_pct || 75}%</td>
                              <td className="py-3 px-4 text-right">
                                <a
                                  href={`/testly-100/report/${p.seat_id}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-3 py-1 rounded bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 text-[11px] font-semibold transition-colors inline-flex items-center gap-1"
                                >
                                  <span>View Report</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW: CAPTAINS & AMBASSADORS */}
          {activeNav === 'captains' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-serif font-bold text-[#0F172A]">Campus Captains & Attribution</h2>
                  <p className="text-xs text-[#64748B]">
                    Institutional ambassadors driving high-intent candidate cohorts. Attribution tracking only.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[#64748B] font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Captain Code</th>
                      <th className="py-3 px-4">Ambassador Name</th>
                      <th className="py-3 px-4">Campus</th>
                      <th className="py-3 px-4">Applications</th>
                      <th className="py-3 px-4">Approved</th>
                      <th className="py-3 px-4">Completed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dataState.captains.map(cap => {
                      const apps = dataState.applications.filter(a => a.captain_code === cap.code).length;
                      const appParts = liveParticipantsList.filter(p => p.applicant?.captain_code === cap.code);
                      const approved = appParts.length;
                      const completed = appParts.filter(p => p.liveStatus === 'COMPLETED').length;

                      return (
                        <tr key={cap.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-[#1E3A8A]">{cap.code}</td>
                          <td className="py-3 px-4 font-semibold text-[#0F172A]">{cap.name}</td>
                          <td className="py-3 px-4 text-slate-600">{cap.campus}</td>
                          <td className="py-3 px-4 font-mono text-slate-700">{apps}</td>
                          <td className="py-3 px-4 font-mono font-semibold text-emerald-700">{approved}</td>
                          <td className="py-3 px-4 font-mono text-blue-700">{completed}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW: 100 PRIVATE COHORT INVITE LINKS & TOKENS */}
          {(activeNav === '100-links' || activeNav === 'invites') && (
            <div className="space-y-5">
              {/* Header & Main Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#1E3A8A] border border-blue-200">
                      Authoritative Rail
                    </span>
                    <span className="font-mono text-xs text-[#64748B]">100 Sequential Links (TESTLY-INV-001 to 100)</span>
                  </div>
                  <h2 className="text-xl font-serif font-bold text-[#0F172A]">
                    100 Private Cohort Invite Links
                  </h2>
                  <p className="text-xs text-[#64748B] max-w-2xl mt-0.5">
                    Pre-generated invite links mapped to individual cohort seats. Each link permits one candidate to submit their diagnostic application. Access is unlocked only upon admin approval.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <button
                    onClick={handleCopyAll100}
                    className="px-4 py-2 bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
                  >
                    {copied100Text ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied100Text ? 'All 100 Links Copied!' : 'Copy All 100 Links'}</span>
                  </button>
                  <button
                    onClick={handleExport100CSV}
                    className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-[#0F172A] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#1E3A8A]" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={() => setShowNewInviteModal(true)}
                    className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Custom Token</span>
                  </button>
                </div>
              </div>

              {/* 4 Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                  <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Total Cohort Links</div>
                  <div className="text-2xl font-serif font-bold text-[#0F172A] mt-1">100</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Mapped to Seats 001–100</div>
                </div>
                <div className="bg-white border border-emerald-200/70 rounded-xl p-4 shadow-xs">
                  <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Available to Send</div>
                  <div className="text-2xl font-serif font-bold text-emerald-700 mt-1">{linksMetrics.available}</div>
                  <div className="text-[11px] text-emerald-600 mt-0.5">Ready for distribution</div>
                </div>
                <div className="bg-white border border-amber-200/70 rounded-xl p-4 shadow-xs">
                  <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Applied / Review</div>
                  <div className="text-2xl font-serif font-bold text-amber-700 mt-1">{linksMetrics.applied}</div>
                  <div className="text-[11px] text-amber-600 mt-0.5">Awaiting admin review</div>
                </div>
                <div className="bg-white border border-blue-200/70 rounded-xl p-4 shadow-xs">
                  <div className="text-[11px] font-bold text-[#1E3A8A] uppercase tracking-wider">Approved Seats</div>
                  <div className="text-2xl font-serif font-bold text-[#0F172A] mt-1">{linksMetrics.approved}</div>
                  <div className="text-[11px] text-[#1E3A8A] mt-0.5">Authorized for diagnostic</div>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                  {[
                    { id: 'ALL', label: `All (${linksMetrics.total})` },
                    { id: 'AVAILABLE', label: `Available (${linksMetrics.available})` },
                    { id: 'APPLIED', label: `Applied (${linksMetrics.applied})` },
                    { id: 'APPROVED', label: `Approved (${linksMetrics.approved})` },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setLinksFilter(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        linksFilter === tab.id
                          ? 'bg-[#0F172A] text-white shadow-xs'
                          : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={linksSearch}
                    onChange={(e) => setLinksSearch(e.target.value)}
                    placeholder="Search by code, seat, or name..."
                    className="w-full bg-slate-50 border border-slate-200 pl-8 pr-3 py-1.5 rounded-lg text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#0F172A] focus:bg-white"
                  />
                  {linksSearch && (
                    <button
                      onClick={() => setLinksSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* 100 Links Table */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-[#64748B] font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Seat ID</th>
                        <th className="py-3 px-4">Invite Token</th>
                        <th className="py-3 px-4">Direct Invite Link</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Assigned Candidate</th>
                        <th className="py-3 px-4 text-right">Quick Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtered100Links.map((item) => {
                        const isCopied = copiedLinkMap[item.code];
                        return (
                          <tr key={item.code} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4">
                              <span className="font-mono font-bold text-[#1E3A8A] bg-blue-50/80 px-2 py-0.5 rounded border border-blue-200/60">
                                {item.seatId}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-mono font-semibold text-[#0F172A]">
                              {item.code}
                            </td>
                            <td className="py-3 px-4 font-mono text-[11px] text-slate-600 max-w-xs truncate">
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-[#1E3A8A] hover:underline flex items-center gap-1"
                                title={item.url}
                              >
                                <span className="truncate">{item.url}</span>
                                <ExternalLink className="w-2.5 h-2.5 shrink-0 text-slate-400" />
                              </a>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                item.status === 'AVAILABLE'
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : item.status === 'APPROVED'
                                  ? 'bg-blue-50 text-[#1E3A8A] border border-blue-200'
                                  : item.status === 'PENDING'
                                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                  : item.status === 'WAITLISTED'
                                  ? 'bg-purple-50 text-purple-800 border border-purple-200'
                                  : 'bg-slate-100 text-slate-600'
                              }`}>
                                {item.status === 'AVAILABLE' ? 'Available' : item.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              {item.applicantName ? (
                                <div>
                                  <div className="font-semibold text-[#0F172A]">{item.applicantName}</div>
                                  <div className="text-[11px] text-[#64748B]">{item.applicantEmail || item.applicantCollege}</div>
                                </div>
                              ) : (
                                <span className="text-slate-400 italic">Unassigned</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right space-x-1.5">
                              <button
                                onClick={() => handleCopySingleLink(item.code, item.url)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer inline-flex items-center gap-1 ${
                                  isCopied
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : 'bg-slate-100 text-slate-700 hover:bg-[#0F172A] hover:text-white'
                                }`}
                              >
                                {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                <span>{isCopied ? 'Copied!' : 'Copy Link'}</span>
                              </button>

                              {item.status === 'PENDING' && (
                                <button
                                  onClick={() => setActiveNav('applicants')}
                                  className="px-2.5 py-1 rounded-lg bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-[11px] font-semibold transition-colors cursor-pointer"
                                >
                                  Review
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {filtered100Links.length === 0 && (
                  <div className="text-center py-12 px-4">
                    <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <h3 className="text-sm font-bold text-[#0F172A]">No Matching Invite Links</h3>
                    <p className="text-xs text-[#64748B] mt-1">
                      No links found matching &ldquo;{linksSearch}&rdquo; in filter &ldquo;{linksFilter}&rdquo;.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW: SETTINGS & SUPABASE CONFIG */}
          {activeNav === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#0F172A]">Event Configuration & Database Engine</h2>
                <p className="text-xs text-[#64748B]">
                  Testly 100 event settings, atomic seat limits, and Supabase Postgres connection.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Event Core Settings */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-[#0F172A] border-b border-slate-100 pb-2">
                    Event Parameters
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-medium">Event Name</span>
                      <span className="font-bold text-[#0F172A]">TESTLY 100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-medium">Capacity Invariant</span>
                      <span className="font-mono font-bold text-[#1E3A8A]">Exactly 100 Seats</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-medium">Access Visibility</span>
                      <span className="font-mono font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-200">
                        PRIVATE (Invite Required)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-medium">Duration</span>
                      <span className="font-bold text-slate-800">118 Minutes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-medium">Registration Status</span>
                      <span className="font-bold text-emerald-700">OPEN</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <button
                      onClick={() => {
                        if (window.confirm('Reset this event to a completely clean production state? All test participants will be wiped.')) {
                          testly100Service.resetToCleanProduction();
                          refreshData();
                          showNotification('Event reset to clean production state.');
                        }
                      }}
                      className="w-full py-2 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl hover:bg-rose-50 transition-colors"
                    >
                      Purge & Reset to Clean Production
                    </button>
                  </div>
                </div>

                {/* Supabase Status & SQL Schema Runner */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-[#0F172A] border-b border-slate-100 pb-2 flex items-center justify-between">
                    <span>Supabase Postgres Backend</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      supabaseStatus.isConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {supabaseStatus.isConfigured ? 'CONNECTED' : 'LOCAL SIMULATOR ACTIVE'}
                    </span>
                  </h3>

                  <p className="text-xs text-[#64748B]">
                    Postgres is the authoritative source of truth. Atomic seat allocation stored procedure and realtime replication are defined in <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-[11px]">supabase/migrations/20260919_testly_100_core.sql</code>.
                  </p>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Supabase URL</span>
                      <span className="font-mono text-slate-800">{supabaseStatus.url}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Anon Key</span>
                      <span className="font-mono text-slate-800">{supabaseStatus.hasAnonKey ? 'Configured' : 'Not Provided'}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        const sqlMigration = `-- Testly 100 Postgres Migration\n-- Run file: supabase/migrations/20260919_testly_100_core.sql in Supabase SQL Editor.`;
                        navigator.clipboard.writeText(sqlMigration);
                        showNotification('Migration path copied. Run supabase/migrations/20260919_testly_100_core.sql in Supabase.');
                      }}
                      className="w-full py-2 bg-[#1E3A8A] text-white text-xs font-semibold rounded-xl hover:bg-[#1E3A8A]/90 transition-colors"
                    >
                      Copy SQL Migration Path
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: AUDIT LOG (System Security Log) */}
          {activeNav === 'audit-log' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#0F172A]">Administrative Audit Log</h2>
                <p className="text-xs text-[#64748B]">
                  Immutable ledger of all approval, revocation, and configuration actions.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[#64748B] font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Action</th>
                      <th className="py-3 px-4">Admin</th>
                      <th className="py-3 px-4">Target ID</th>
                      <th className="py-3 px-4">Metadata</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dataState.auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                          {new Date(log.created_at).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 font-bold text-[#0F172A]">{log.action}</td>
                        <td className="py-3 px-4 text-slate-600">{log.admin_id}</td>
                        <td className="py-3 px-4 font-mono text-slate-500">{log.target_id || '—'}</td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                          {JSON.stringify(log.metadata || {})}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW: BOOKINGS & LEADS CRM */}
          {activeNav === 'leads' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#0F172A]">Commercial Bookings & Leads CRM</h2>
                  <p className="text-xs text-[#64748B]">
                    Student inquiries and assisted exam booking requests across GRE, TOEFL, and PTE.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddLeadModal(true)}
                    className="px-3.5 py-2 bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Lead Manually</span>
                  </button>
                </div>
              </div>

              {/* Leads Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                  <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Total Leads</div>
                  <div className="text-2xl font-serif font-bold text-[#0F172A] mt-1">{leadsList.length}</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                  <div className="text-[11px] font-bold text-[#1E3A8A] uppercase tracking-wider">New Inquiries</div>
                  <div className="text-2xl font-serif font-bold text-[#1E3A8A] mt-1">
                    {leadsList.filter(l => l.status === 'New' || !l.status).length}
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                  <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">In Discussion</div>
                  <div className="text-2xl font-serif font-bold text-amber-700 mt-1">
                    {leadsList.filter(l => ['Contacted', 'Interested', 'Price Shared', 'Payment Pending'].includes(l.status)).length}
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                  <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Paid / Converted</div>
                  <div className="text-2xl font-serif font-bold text-emerald-700 mt-1">
                    {leadsList.filter(l => ['Paid', 'Registration Completed'].includes(l.status)).length}
                  </div>
                </div>
              </div>

              {/* Filter and search */}
              <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                  {['ALL', 'New', 'Contacted', 'Interested', 'Paid', 'Registration Completed'].map(st => (
                    <button
                      key={st}
                      onClick={() => setLeadsFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        leadsFilter === st
                          ? 'bg-[#0F172A] text-white shadow-xs'
                          : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={leadsSearch}
                    onChange={(e) => setLeadsSearch(e.target.value)}
                    placeholder="Search candidate, phone, or exam..."
                    className="w-full bg-slate-50 border border-slate-200 pl-8 pr-3 py-1.5 rounded-lg text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#0F172A] focus:bg-white"
                  />
                  {leadsSearch && (
                    <button
                      onClick={() => setLeadsSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
                {leadsList.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-sm font-bold text-[#0F172A]">0 Candidate Leads</h3>
                    <p className="text-xs text-[#64748B] max-w-sm mx-auto mt-1 mb-4">
                      Your database is clean. Inbound booking inquiries will automatically stream here when students calculate exam savings on the public portal.
                    </p>
                    <button
                      onClick={() => setShowAddLeadModal(true)}
                      className="px-4 py-2 bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs cursor-pointer"
                    >
                      Add Lead Manually
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-[#64748B] font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4">Candidate</th>
                          <th className="py-3 px-4">Contact & Location</th>
                          <th className="py-3 px-4">Exam & Timing</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Agent</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {leadsList
                          .filter(l => {
                            if (leadsFilter !== 'ALL' && l.status !== leadsFilter) return false;
                            if (leadsSearch.trim()) {
                              const q = leadsSearch.toLowerCase();
                              return (
                                (l.name || '').toLowerCase().includes(q) ||
                                (l.phone || '').toLowerCase().includes(q) ||
                                (l.exam || '').toLowerCase().includes(q) ||
                                (l.city || '').toLowerCase().includes(q)
                              );
                            }
                            return true;
                          })
                          .map((lead, idx) => (
                            <tr key={lead.id || idx} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3 px-4 font-semibold text-[#0F172A]">
                                {lead.name}
                                <div className="text-[10px] font-mono text-slate-400">{lead.id || `LEAD-${String(idx + 1).padStart(3, '0')}`}</div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="text-[#0F172A] font-medium">{lead.phone}</div>
                                <div className="text-[11px] text-[#64748B]">{lead.city || 'Hyderabad'}</div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="font-semibold text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[11px]">
                                  {lead.exam || 'GRE'}
                                </span>
                                <div className="text-[11px] text-slate-500 mt-0.5">{lead.timing || 'Immediate'}</div>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                  lead.status === 'Paid' || lead.status === 'Registration Completed'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : lead.status === 'Contacted' || lead.status === 'Interested'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {lead.status || 'New'}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-slate-600 font-medium">
                                {lead.agent || 'Arjun'}
                              </td>
                              <td className="py-3 px-4 text-right space-x-1.5">
                                {lead.phone && (
                                  <a
                                    href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${lead.name}, this is the Testly team regarding your ${lead.exam || 'GRE'} booking assistance.`)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 text-[11px] font-semibold transition-colors inline-flex items-center gap-1"
                                  >
                                    WhatsApp
                                  </a>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW: EXAM OFFERINGS MASTER */}
          {activeNav === 'exam-offerings' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#0F172A]">Exam Offerings & Pricing Master</h2>
                <p className="text-xs text-[#64748B]">
                  Authoritative institutional pricing rails and active discount switches.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { exam: 'GRE', fee: '₹20,499', official: '₹26,542', savings: '₹6,043' },
                  { exam: 'TOEFL iBT', fee: '₹16,900', official: '₹19,050', savings: '₹2,150' },
                  { exam: 'PTE Academic', fee: '₹15,000', official: '₹19,000', savings: '₹4,000' },
                ].map(item => (
                  <div key={item.exam} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
                    <div className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">{item.exam}</div>
                    <div className="text-2xl font-serif font-bold text-[#0F172A] my-2">{item.fee}</div>
                    <div className="text-xs text-slate-500">
                      Official fee: <span className="line-through">{item.official}</span> · <span className="text-amber-700 font-semibold">Save {item.savings}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ── PARTICIPANT PROFILE DRAWER ────────────────────────────────────── */}
      {selectedItem && (
        <ParticipantProfileDrawer
          participant={selectedItem.participant}
          application={selectedItem.application}
          session={selectedItem.session}
          report={selectedItem.report}
          activityEvents={dataState.activityEvents}
          responses={dataState.responses}
          auditLogs={dataState.auditLogs}
          onClose={() => setSelectedItem(null)}
          onActionComplete={() => {
            refreshData();
            setSelectedItem(null);
          }}
        />
      )}

      {/* ── CREATE INVITE MODAL ────────────────────────────────────────────── */}
      {showNewInviteModal && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-serif text-[#0F172A]">Create Custom Invite Token</h3>
              <button onClick={() => setShowNewInviteModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvite} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Invite Code Token</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BITS-GRE-HYD"
                  value={newInviteCode}
                  onChange={(e) => setNewInviteCode(e.target.value.toUpperCase())}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono uppercase focus:outline-none focus:border-[#0F172A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Max Applications Cap (Optional)</label>
                <input
                  type="number"
                  placeholder="Leave empty for unlimited applications"
                  value={newInviteCap}
                  onChange={(e) => setNewInviteCap(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0F172A]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewInviteModal(false)}
                  className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0F172A] hover:bg-[#1E3A8A] text-white rounded-xl font-semibold transition-colors shadow-xs cursor-pointer"
                >
                  Generate Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── ADD LEAD MODAL ─────────────────────────────────────────────────── */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-serif text-[#0F172A]">Add Candidate Lead</h3>
              <button onClick={() => setShowAddLeadModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newLeadForm.name || !newLeadForm.phone) return;
                const newLead = {
                  id: `lead_${Date.now()}`,
                  name: newLeadForm.name,
                  phone: newLeadForm.phone,
                  exam: newLeadForm.exam,
                  timing: newLeadForm.timing,
                  city: newLeadForm.city,
                  status: 'New',
                  agent: 'Arjun',
                  created_at: new Date().toISOString()
                };
                const updated = [newLead, ...leadsList];
                saveStoredLeads(updated);
                setLeadsList(updated);
                setShowAddLeadModal(false);
                setNewLeadForm({ name: '', phone: '', exam: 'GRE', timing: 'Within 30 Days', city: 'Hyderabad' });
                showNotification(`Lead added for ${newLead.name}`);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Snehitha Reddy"
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0F172A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp Number</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={newLeadForm.phone}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0F172A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Exam</label>
                  <select
                    value={newLeadForm.exam}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, exam: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0F172A]"
                  >
                    <option value="GRE">GRE General</option>
                    <option value="TOEFL">TOEFL iBT</option>
                    <option value="PTE">PTE Academic</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={newLeadForm.city}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0F172A]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0F172A] hover:bg-[#1E3A8A] text-white rounded-xl font-semibold transition-colors shadow-xs cursor-pointer"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
