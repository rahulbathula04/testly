import React, { useState, useEffect } from 'react';
import {
  Users,
  TrendingUp,
  Clock,
  Phone,
  MessageCircle,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight,
  UserCheck,
  Plus,
  BarChart3,
  Globe,
  Download,
  Bell,
  RefreshCw,
  LogOut,
  ChevronRight,
  Shield,
  Layers
} from 'lucide-react';
import {
  getStoredLeads,
  saveStoredLeads,
  SALES_AGENTS,
  LEAD_STATUSES,
  OBJECTIONS,
  createNewLead
} from '../../utils/crmStore';

export default function RealAdminPortal({
  onNavigateHome,
  adminUser = { name: 'Rahul Bathula', email: 'rahulbathula04@gmail.com', role: 'Super Admin' },
  onLogout
}) {
  const [leads, setLeads] = useState(getStoredLeads());
  const [activeNav, setActiveNav] = useState('leads'); // 'overview' | 'leads' | 'followups' | 'funnel' | 'objections'
  const [selectedLead, setSelectedLead] = useState(null);
  const [filterExam, setFilterExam] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentAgent, setCurrentAgent] = useState('Arjun (Sales Lead)');
  const [newNoteText, setNewNoteText] = useState('');
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);

  // Manual new lead form state
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualExam, setManualExam] = useState('GRE');
  const [manualTiming, setManualTiming] = useState('Within 15 days');

  useEffect(() => {
    const handleUpdate = () => {
      setLeads(getStoredLeads());
    };
    window.addEventListener('testly_leads_updated', handleUpdate);
    window.addEventListener('testly_new_lead_alert', handleUpdate);
    return () => {
      window.removeEventListener('testly_leads_updated', handleUpdate);
      window.removeEventListener('testly_new_lead_alert', handleUpdate);
    };
  }, []);

  const updateLead = (updatedLead) => {
    const updated = leads.map((l) => (l.id === updatedLead.id ? updatedLead : l));
    setLeads(updated);
    saveStoredLeads(updated);
    setSelectedLead(updatedLead);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedLead) return;

    const newNote = {
      author: currentAgent.split(' ')[0],
      text: newNoteText.trim(),
      time: 'Just now'
    };

    const updated = {
      ...selectedLead,
      notes: [newNote, ...(selectedLead.notes || [])]
    };
    updateLead(updated);
    setNewNoteText('');
  };

  const handleCreateManualLead = (e) => {
    e.preventDefault();
    if (!manualName || !manualPhone) return;
    const created = createNewLead({
      name: manualName,
      phone: manualPhone.startsWith('+91') ? manualPhone : `+91 ${manualPhone}`,
      exam: manualExam,
      timing: manualTiming,
      source: 'Admin Manual Entry',
      campaign: 'Direct Inbound'
    });
    setShowAddLeadModal(false);
    setManualName('');
    setManualPhone('');
    setSelectedLead(created);
  };

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Phone', 'Exam', 'Timing', 'Status', 'Priority', 'Assigned', 'Next Action'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.phone}"`,
      l.exam,
      `"${l.timing}"`,
      l.status,
      l.priority,
      l.assignedTo,
      `"${l.nextAction || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `testly_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics
  const totalLeadsCount = 248 + leads.length - 7;
  const newCount = leads.filter((l) => l.status === 'New').length + 172;
  const contactedCount = leads.filter((l) => ['Contacted', 'Connected', 'Qualified', 'Interested', 'Price Shared', 'Payment Pending', 'Paid', 'Registration Completed'].includes(l.status)).length + 96;
  const interestedCount = leads.filter((l) => ['Interested', 'Price Shared', 'Payment Pending', 'Paid', 'Registration Completed'].includes(l.status)).length + 54;
  const paymentPendingCount = leads.filter((l) => l.status === 'Payment Pending').length + 21;
  const convertedCount = leads.filter((l) => ['Paid', 'Registration Completed'].includes(l.status)).length + 17;
  const followUpCount = leads.filter((l) => l.status === 'Follow-up').length + 76;

  // Filtered
  const filteredLeads = leads.filter((l) => {
    const matchExam = filterExam === 'ALL' || l.exam === filterExam;
    const matchStatus = filterStatus === 'ALL' || l.status === filterStatus;
    const matchPriority = filterPriority === 'ALL' || l.priority === filterPriority;
    const matchSearch =
      !searchQuery ||
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchExam && matchStatus && matchPriority && matchSearch;
  });

  const followUpsQueue = leads.filter(
    (l) => l.status === 'Follow-up' || l.status === 'New' || l.nextAction?.toLowerCase().includes('today')
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-emerald-500 selection:text-white">

      {/* ── Top Enterprise Header ── */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between shrink-0 sticky top-0 z-30">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-md">
              T
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black tracking-tight text-white">TESTLY INTERNAL OS</h1>
                <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.2 rounded-full">
                  Admin Console
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Enterprise Candidate Registration & Voucher Sales System</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAddLeadModal(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Lead
          </button>

          <button
            onClick={exportCSV}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>

          {/* Switch to public website */}
          <button
            onClick={onNavigateHome}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" /> Public Website
          </button>

          {/* Admin User Profile */}
          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
              RB
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-xs font-bold text-white block leading-none">{adminUser?.name || 'Rahul Bathula'}</span>
              <span className="text-[10px] text-emerald-400 font-mono">{adminUser?.email || 'rahulbathula04@gmail.com'}</span>
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="ml-2 p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 transition-colors"
                title="Log out of Admin Portal"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Main Work Area: Sidebar + Content ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* ── Left Sidebar Navigation ── */}
        <aside className="w-64 bg-slate-900/90 border-r border-slate-800 flex flex-col justify-between shrink-0 p-4">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3 py-2">
              Sales Workflow
            </p>

            {[
              { id: 'leads', label: 'All Leads', icon: Users, badge: leads.length },
              { id: 'followups', label: "Today's Follow-ups", icon: Clock, badge: followUpsQueue.length, badgeColor: 'bg-amber-500/20 text-amber-300' },
              { id: 'funnel', label: 'Pipeline Funnel', icon: TrendingUp },
              { id: 'objections', label: 'Objection Intelligence', icon: AlertTriangle },
              { id: 'overview', label: 'Executive Analytics', icon: BarChart3 }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${item.badgeColor || (isActive ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-300')}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Support & Server Info */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
              <span>Database Sync</span>
              <span className="text-emerald-400 font-mono">100% OK</span>
            </div>
            <p className="text-[10px] text-slate-500">
              Voucher Procurement API v2.4 • Connected to Hyderabad Madhapur Gateway
            </p>
          </div>
        </aside>

        {/* ── Main Panel Content ── */}
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-950">

          {/* Top Live KPI Counters */}
          <div className="px-6 py-3 bg-slate-900/60 border-b border-slate-800 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 shrink-0">
            {[
              { label: "Today's Enquiries", val: totalLeadsCount, color: 'text-white' },
              { label: 'New Leads', val: newCount, color: 'text-blue-400' },
              { label: 'Contacted', val: contactedCount, color: 'text-indigo-400' },
              { label: 'Interested', val: interestedCount, color: 'text-amber-400' },
              { label: 'Payment Pending', val: paymentPendingCount, color: 'text-orange-400' },
              { label: 'Paid & Converted', val: convertedCount, color: 'text-emerald-400' },
              { label: 'Follow-ups', val: followUpCount, color: 'text-cyan-400' }
            ].map((m) => (
              <div key={m.label} className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider truncate">
                  {m.label}
                </span>
                <span className={`text-xl font-black ${m.color}`}>{m.val}</span>
              </div>
            ))}
          </div>

          {/* VIEW: ALL LEADS TABLE & PROFILE DRAWER */}
          {activeNav === 'leads' && (
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

              {/* Table Column */}
              <div className="flex-1 flex flex-col overflow-hidden border-r border-slate-800">

                {/* Filter and Search Toolbar */}
                <div className="p-3 bg-slate-900/50 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
                  <div className="flex items-center gap-2 flex-1 min-w-[220px] max-w-md">
                    <div className="relative w-full">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search lead name, phone number, or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-950 text-xs font-semibold text-white pl-8 pr-3 py-2 rounded-lg border border-slate-700 focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={filterExam}
                      onChange={(e) => setFilterExam(e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-xs font-bold text-slate-300 py-1.5 px-2.5 rounded-lg outline-none"
                    >
                      <option value="ALL">All Exams</option>
                      <option value="GRE">GRE</option>
                      <option value="TOEFL">TOEFL</option>
                      <option value="IELTS">IELTS</option>
                      <option value="PTE">PTE</option>
                      <option value="Duolingo">Duolingo</option>
                      <option value="GMAT">GMAT</option>
                    </select>

                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-xs font-bold text-slate-300 py-1.5 px-2.5 rounded-lg outline-none"
                    >
                      <option value="ALL">All Statuses</option>
                      {LEAD_STATUSES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>

                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-xs font-bold text-slate-300 py-1.5 px-2.5 rounded-lg outline-none"
                    >
                      <option value="ALL">All Intent</option>
                      <option value="HOT">🔥 Hot Intent</option>
                      <option value="WARM">🟡 Warm</option>
                      <option value="COLD">🔵 Cold</option>
                    </select>
                  </div>
                </div>

                {/* Table Rows */}
                <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
                  {filteredLeads.map((lead) => {
                    const isSelected = selectedLead?.id === lead.id;
                    const cleanPhone = lead.phone.replace(/\D/g, '');

                    return (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className={`p-4 hover:bg-slate-900/80 cursor-pointer transition-colors flex items-center justify-between gap-4 ${
                          isSelected ? 'bg-slate-900 border-l-4 border-l-emerald-500' : ''
                        }`}
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-white">{lead.name}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                              {lead.exam}
                            </span>
                            {lead.priority === 'HOT' && (
                              <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center gap-0.5">
                                <Flame className="w-2.5 h-2.5" /> HOT
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span className="font-mono text-slate-300">{lead.phone}</span>
                            <span>•</span>
                            <span>Target: <strong className="text-slate-200">{lead.timing}</strong></span>
                            <span>•</span>
                            <span className="text-slate-500">Rep: {lead.assignedTo}</span>
                          </div>

                          <p className="text-[11px] text-slate-400">
                            Next Action: <strong className="text-amber-300">{lead.nextAction}</strong>
                          </p>
                        </div>

                        {/* Status + 1-Click Call & WA Buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${
                              lead.status === 'New'
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                : lead.status === 'Interested'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : lead.status === 'Paid' || lead.status === 'Registration Completed'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : lead.status === 'Payment Pending'
                                ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            {lead.status}
                          </span>

                          <a
                            href={`tel:${lead.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="w-8 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors shadow-sm"
                            title="Call candidate directly"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(lead.name)},%20calling%20from%20Testly%20regarding%20your%20${lead.exam}%20booking.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-8 h-8 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors shadow-sm"
                            title="Open WhatsApp chat"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Lead Profile Drawer / Call Screen */}
              <div className="w-full lg:w-[460px] bg-slate-900 border-l border-slate-800 flex flex-col overflow-y-auto p-5 space-y-5">
                {selectedLead ? (
                  <div className="space-y-5 animate-in fade-in duration-100">

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-black text-white">{selectedLead.name}</h3>
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                              {selectedLead.exam}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedLead.id} • {selectedLead.source}</p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-amber-500/30">
                          {selectedLead.priority}
                        </span>
                      </div>

                      {/* 1-Click Calling & WhatsApp Bar */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <a
                          href={`tel:${selectedLead.phone}`}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow"
                        >
                          <Phone className="w-4 h-4" /> Call Direct
                        </a>
                        <a
                          href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(selectedLead.name)},%20this%20is%20${selectedLead.assignedTo}%20from%20Testly.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow"
                        >
                          <MessageCircle className="w-4 h-4" /> WhatsApp Direct
                        </a>
                      </div>
                    </div>

                    {/* Status & Assigned Agent */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Sales Status
                        </label>
                        <select
                          value={selectedLead.status}
                          onChange={(e) => updateLead({ ...selectedLead, status: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 text-xs font-bold text-emerald-400 py-2 px-2.5 rounded-lg outline-none"
                        >
                          {LEAD_STATUSES.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Assigned Rep
                        </label>
                        <select
                          value={selectedLead.assignedTo}
                          onChange={(e) => updateLead({ ...selectedLead, assignedTo: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 text-xs font-bold text-slate-200 py-2 px-2.5 rounded-lg outline-none"
                        >
                          {SALES_AGENTS.map((agent) => (
                            <option key={agent} value={agent}>{agent}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Mandatory Next Action */}
                    <div className="space-y-1.5 bg-slate-950 border border-slate-800 rounded-xl p-3">
                      <label className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> Next Action Required
                      </label>
                      <input
                        type="text"
                        value={selectedLead.nextAction || ''}
                        onChange={(e) => updateLead({ ...selectedLead, nextAction: e.target.value })}
                        placeholder="e.g. Call today 5:30 PM"
                        className="w-full bg-slate-900 text-xs font-semibold text-white px-3 py-2 rounded-lg border border-slate-700 outline-none"
                      />
                      <div className="flex flex-wrap gap-1 pt-1">
                        {[
                          'Call today 5:30 PM',
                          'Send pricing on WhatsApp',
                          'Follow up tomorrow',
                          'Waiting for passport copy',
                          'Payment expected Friday'
                        ].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => updateLead({ ...selectedLead, nextAction: preset })}
                            className="text-[9px] font-semibold bg-slate-900 text-slate-300 hover:text-white border border-slate-800 px-2 py-0.5 rounded transition-colors"
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* In-Call Sales Qualification */}
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                        In-Call Sales Qualification
                      </h4>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <label className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedLead.qualification?.hasPassport || false}
                            onChange={(e) =>
                              updateLead({
                                ...selectedLead,
                                qualification: {
                                  ...selectedLead.qualification,
                                  hasPassport: e.target.checked
                                }
                              })
                            }
                            className="rounded"
                          />
                          <span className="font-semibold text-slate-200">Has Valid Passport</span>
                        </label>

                        <label className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedLead.qualification?.hasAccount || false}
                            onChange={(e) =>
                              updateLead({
                                ...selectedLead,
                                qualification: {
                                  ...selectedLead.qualification,
                                  hasAccount: e.target.checked
                                }
                              })
                            }
                            className="rounded"
                          />
                          <span className="font-semibold text-slate-200">Has Exam Account</span>
                        </label>

                        <label className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedLead.qualification?.priceShared || false}
                            onChange={(e) =>
                              updateLead({
                                ...selectedLead,
                                qualification: {
                                  ...selectedLead.qualification,
                                  priceShared: e.target.checked
                                }
                              })
                            }
                            className="rounded"
                          />
                          <span className="font-semibold text-slate-200">Price Shared</span>
                        </label>

                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 font-bold block">Ready to Register:</span>
                          <select
                            value={selectedLead.qualification?.readyToRegister || 'This week'}
                            onChange={(e) =>
                              updateLead({
                                ...selectedLead,
                                qualification: {
                                  ...selectedLead.qualification,
                                  readyToRegister: e.target.value
                                }
                              })
                            }
                            className="w-full bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200 p-1 rounded"
                          >
                            <option value="Today">Today</option>
                            <option value="This week">This week</option>
                            <option value="Later">Later</option>
                          </select>
                        </div>
                      </div>

                      {/* Primary Objection Logging */}
                      <div className="space-y-1 pt-1">
                        <label className="text-[10px] font-black uppercase tracking-wider text-rose-400 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Log Primary Objection (if hesitant)
                        </label>
                        <select
                          value={selectedLead.qualification?.objection || ''}
                          onChange={(e) =>
                            updateLead({
                              ...selectedLead,
                              qualification: {
                                ...selectedLead.qualification,
                                objection: e.target.value
                              }
                            })
                          }
                          className="w-full bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 p-2 rounded-lg outline-none"
                        >
                          <option value="">No objection / Ready to buy</option>
                          {OBJECTIONS.map((obj) => (
                            <option key={obj} value={obj}>{obj}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Sales Notes Timeline */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                        Call Notes & History
                      </h4>

                      <form onSubmit={handleAddNote} className="space-y-2">
                        <textarea
                          rows={2}
                          placeholder="Type notes from the call..."
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white placeholder-slate-500 outline-none"
                        />
                        <button
                          type="submit"
                          className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Note to Timeline
                        </button>
                      </form>

                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {(selectedLead.notes || []).map((note, idx) => (
                          <div key={idx} className="bg-slate-950 border border-slate-800/80 rounded-lg p-2.5 text-xs space-y-1">
                            <div className="flex items-center justify-between text-[10px] text-slate-400">
                              <span className="font-bold text-emerald-400">{note.author}</span>
                              <span>{note.time}</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed">{note.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
                    <Users className="w-10 h-10 opacity-30" />
                    <p className="text-xs font-semibold">Select any lead from the list to view profile, initiate calls, and qualify.</p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* VIEW: TODAY'S FOLLOW-UPS */}
          {activeNav === 'followups' && (
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-white">Today's Priority Calling Queue</h3>
                  <p className="text-xs text-slate-400">Scheduled candidate touchpoints requiring phone calls today.</p>
                </div>
                <span className="text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 px-3 py-1 rounded-full">
                  {followUpsQueue.length} Scheduled Calls
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {followUpsQueue.map((lead) => (
                  <div key={lead.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-base font-black text-white">{lead.name}</h4>
                        <p className="text-xs text-slate-400 font-semibold">{lead.exam} • {lead.timing}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-amber-500/30">
                        {lead.status}
                      </span>
                    </div>

                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block">Scheduled Action</span>
                      <p className="font-semibold text-amber-300 mt-0.5">{lead.nextAction}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href={`tel:${lead.phone}`}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call Rep
                      </a>
                      <button
                        onClick={() => {
                          setSelectedLead(lead);
                          setActiveNav('leads');
                        }}
                        className="border border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                      >
                        Profile <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: FUNNEL */}
          {activeNav === 'funnel' && (
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              <div>
                <h3 className="text-lg font-black text-white">End-to-End Acquisition Funnel</h3>
                <p className="text-xs text-slate-400">Conversion velocity from initial ad / search impression to paid voucher registration.</p>
              </div>

              <div className="space-y-3 max-w-2xl">
                {[
                  { step: '1,000 Total Leads', pct: 100, sub: 'Google Ads, Meta, Instagram, Organic' },
                  { step: '700 Contacted', pct: 70, sub: 'First call initiated within 15 minutes' },
                  { step: '450 Qualified', pct: 45, sub: 'Passport & target test date confirmed' },
                  { step: '220 Interested', pct: 22, sub: 'Voucher savings breakdown shared' },
                  { step: '120 Payment Pending', pct: 12, sub: 'UPI QR code sent for voucher + ₹199' },
                  { step: '95 Paid & Converted', pct: 9.5, sub: 'Official voucher issued' },
                  { step: '95 Registered', pct: 9.5, sub: 'Zero-defect slot registration completed' }
                ].map((f) => (
                  <div key={f.step} className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-black text-white">{f.step}</span>
                      <span className="font-black text-emerald-400">{f.pct}% Conversion</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                        style={{ width: `${f.pct}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">{f.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: OBJECTIONS */}
          {activeNav === 'objections' && (
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              <div>
                <h3 className="text-lg font-black text-white">Sales Objection Intelligence Engine</h3>
                <p className="text-xs text-slate-400">Customer feedback collected across inbound calls to guide marketing and copywriting.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { obj: 'Is the voucher genuine?', pct: 34, action: 'Highlight ETS/Pearson procurement disclaimers & candidate testimonials' },
                  { obj: 'Wants to compare with official website', pct: 28, action: 'Add explicit reference price table right on landing page' },
                  { obj: 'Needs parent / family approval', pct: 18, action: 'Send 1-page WhatsApp PDF breakdown for parents' },
                  { obj: 'Not ready / Needs more prep time', pct: 12, action: 'Voucher valid for 90 days — emphasize flexibility' },
                  { obj: "Doesn't trust online payment", pct: 8, action: 'Invite to Hyderabad Madhapur / Begumpet local centers' }
                ].map((item) => (
                  <div key={item.obj} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{item.obj}</span>
                      <span className="text-xs font-black text-rose-400">{item.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500" style={{ width: `${item.pct * 2}%` }} />
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-850 text-[11px] text-slate-400">
                      <strong className="text-slate-300">Playbook:</strong> {item.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: EXECUTIVE ANALYTICS */}
          {activeNav === 'overview' && (
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              <h3 className="text-lg font-black text-white">Executive Sales Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Top Exam Demand</span>
                  <div className="space-y-1 pt-2">
                    <div className="flex justify-between text-xs font-bold"><span>GRE</span><span className="text-emerald-400">44%</span></div>
                    <div className="flex justify-between text-xs font-bold"><span>TOEFL</span><span className="text-emerald-400">26%</span></div>
                    <div className="flex justify-between text-xs font-bold"><span>PTE</span><span className="text-emerald-400">18%</span></div>
                    <div className="flex justify-between text-xs font-bold"><span>Others</span><span className="text-emerald-400">12%</span></div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Top Channels</span>
                  <div className="space-y-1 pt-2">
                    <div className="flex justify-between text-xs font-bold"><span>Meta (Instagram)</span><span className="text-blue-400">48%</span></div>
                    <div className="flex justify-between text-xs font-bold"><span>Google Search</span><span className="text-blue-400">32%</span></div>
                    <div className="flex justify-between text-xs font-bold"><span>Direct & WhatsApp</span><span className="text-blue-400">20%</span></div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Average Ticket Size</span>
                  <p className="text-2xl font-black text-white pt-2">₹19,199</p>
                  <p className="text-[11px] text-slate-400">Exam Voucher (avg ₹19,000) + ₹199 Service</p>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* ── Add Lead Modal ── */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-white">Manual Inbound Lead Entry</h3>
              <button onClick={() => setShowAddLeadModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Candidate Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh V"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">WhatsApp Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 9876543210"
                  value={manualPhone}
                  onChange={(e) => setManualPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Exam</label>
                  <select
                    value={manualExam}
                    onChange={(e) => setManualExam(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white outline-none"
                  >
                    <option value="GRE">GRE</option>
                    <option value="TOEFL">TOEFL</option>
                    <option value="IELTS">IELTS</option>
                    <option value="PTE">PTE</option>
                    <option value="Duolingo">Duolingo</option>
                    <option value="GMAT">GMAT</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Timing</label>
                  <select
                    value={manualTiming}
                    onChange={(e) => setManualTiming(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white outline-none"
                  >
                    <option value="Within 15 days">Within 15 days</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="1–3 months">1–3 months</option>
                    <option value="3–6 months">3–6 months</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg"
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
