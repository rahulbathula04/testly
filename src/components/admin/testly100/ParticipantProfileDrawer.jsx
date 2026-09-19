import React, { useState } from 'react';
import {
  X,
  User,
  Shield,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Ban,
  FileText,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  ExternalLink,
  Award,
  Activity,
  History,
  Send,
  HelpCircle,
  Flag,
  Share2
} from 'lucide-react';
import { testly100Service } from '../../../services/testly100Service';

export default function ParticipantProfileDrawer({
  participant,
  application,
  session,
  report,
  activityEvents = [],
  responses = [],
  auditLogs = [],
  onClose,
  onActionComplete
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'activity' | 'assessment' | 'responses' | 'report' | 'history'
  const [isProcessing, setIsProcessing] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');

  if (!participant && !application) return null;

  const seatId = participant?.seat_id || 'PENDING SEAT';
  const fullName = application?.full_name || 'Candidate';
  const email = application?.email || '—';
  const phone = application?.phone || '—';
  const status = participant?.status || application?.status || 'PENDING';

  const handleApprove = async () => {
    if (!application) return;
    try {
      setIsProcessing(true);
      await testly100Service.approveApplication(application.id);
      setNotificationMsg('Participant approved and seat allocated atomically.');
      if (onActionComplete) onActionComplete();
    } catch (err) {
      alert(err.message || 'Approval failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRevoke = async () => {
    if (!participant) return;
    const reason = prompt('Specify operational reason for access revocation:', 'Breach of Test Conduct');
    if (!reason) return;
    try {
      setIsProcessing(true);
      await testly100Service.revokeAccess(participant.id, reason);
      setNotificationMsg(`Access revoked for ${seatId}.`);
      if (onActionComplete) onActionComplete();
    } catch (err) {
      alert(err.message || 'Revocation failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRestore = async () => {
    if (!participant) return;
    try {
      setIsProcessing(true);
      await testly100Service.restoreAccess(participant.id);
      setNotificationMsg(`Access restored for ${seatId}.`);
      if (onActionComplete) onActionComplete();
    } catch (err) {
      alert(err.message || 'Restore failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendReminder = () => {
    const waUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
      `Hello ${fullName}, your Testly 100 GRE Assessment is active. Your Seat ID is ${seatId}. Access here: https://testly.co.in/testly-100/assessment?token=${participant?.access_token || ''}`
    )}`;
    window.open(waUrl, '_blank');
  };

  const filteredEvents = activityEvents.filter(
    e => e.participant_id === participant?.id || e.session_id === session?.id
  );

  const filteredLogs = auditLogs.filter(
    l => l.target_id === participant?.id || l.metadata?.application_id === application?.id
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#0F172A]/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10 text-[#0F172A] border-l border-slate-200">
        
        {/* Top Header */}
        <div className="p-6 border-b border-slate-100 bg-[#FAF9F6]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#0F172A] text-white">
                  {seatId}
                </span>
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                  status === 'IDLE' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                  status === 'COMPLETED' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                  status === 'REVOKED' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {status}
                </span>
              </div>
              <h2 className="text-xl font-bold font-serif text-[#0F172A]">{fullName}</h2>
              <p className="text-xs text-[#64748B] flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {phone}</span>
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200/60">
            {application?.status === 'PENDING' && (
              <button
                onClick={handleApprove}
                disabled={isProcessing}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#0F172A] hover:bg-[#1E3A8A] text-white transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
              >
                Approve & Allocate Seat
              </button>
            )}

            {participant && participant.status !== 'REVOKED' && (
              <button
                onClick={handleRevoke}
                disabled={isProcessing}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors"
              >
                Revoke Access
              </button>
            )}

            {participant && participant.status === 'REVOKED' && (
              <button
                onClick={handleRestore}
                disabled={isProcessing}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
              >
                Restore Access
              </button>
            )}

            <button
              onClick={handleSendReminder}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-white transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3 h-3 text-[#1E3A8A]" />
              <span>WhatsApp Access</span>
            </button>

            {report && (
              <a
                href={`/testly-100/report/${participant?.seat_id}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center gap-1.5 ml-auto"
              >
                <span>View Report</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {notificationMsg && (
            <div className="mt-3 p-2 bg-blue-50 border border-blue-200 text-blue-800 text-xs rounded-lg flex items-center justify-between">
              <span>{notificationMsg}</span>
              <button onClick={() => setNotificationMsg('')} className="text-blue-500 hover:text-blue-800 text-xs font-bold">Dismiss</button>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/50 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'activity', label: `Timeline (${filteredEvents.length})` },
            { id: 'assessment', label: 'Progress' },
            { id: 'responses', label: `Responses (${responses.length})` },
            { id: 'report', label: 'Diagnostic Report' },
            { id: 'history', label: `Admin History (${filteredLogs.length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[#1E3A8A] text-[#1E3A8A]'
                  : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">College / Institution</div>
                  <div className="text-sm font-semibold text-[#0F172A]">{application?.college || '—'}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">City / Region</div>
                  <div className="text-sm font-semibold text-[#0F172A]">{application?.city || '—'}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">Education Level</div>
                  <div className="text-sm font-semibold text-[#0F172A]">{application?.education_level || '—'}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">Target GRE Date</div>
                  <div className="text-sm font-semibold text-[#0F172A]">{application?.target_gre_date || '—'}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">Target Country & Intake</div>
                  <div className="text-sm font-semibold text-[#0F172A]">{application?.target_country} · {application?.target_intake}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">Captain Attribution</div>
                  <div className="text-sm font-semibold text-[#1E3A8A] font-mono">{application?.captain_code || 'Direct / Organics'}</div>
                </div>
              </div>

              {participant && (
                <div className="p-4 rounded-xl border border-blue-100 bg-[#E8F0FF]/40 space-y-2">
                  <div className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">Candidate Direct Access Link</div>
                  <div className="flex items-center gap-2">
                    <input
                      readOnly
                      value={`${window.location.origin}/testly-100/assessment?token=${participant.access_token}`}
                      className="flex-1 bg-white border border-blue-200 text-xs font-mono px-3 py-2 rounded-lg text-slate-800"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/testly-100/assessment?token=${participant.access_token}`);
                        alert('Candidate direct access link copied to clipboard.');
                      }}
                      className="px-3 py-2 bg-[#1E3A8A] text-white text-xs font-semibold rounded-lg hover:bg-[#1E3A8A]/90 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-[11px] text-[#64748B]">
                    Token is unique to {seatId}. Access will be immediately rejected if revoked by an administrator.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ACTIVITY TIMELINE */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Real-Time Event Stream</h3>
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12 text-[#64748B] text-xs">
                  No telemetry recorded yet for this participant.
                </div>
              ) : (
                <div className="relative border-l-2 border-slate-200 ml-4 space-y-4 py-2">
                  {filteredEvents.map((evt, idx) => (
                    <div key={evt.id || idx} className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-[#1E3A8A]" />
                      <div className="text-xs font-mono text-[#64748B]">
                        {new Date(evt.created_at).toLocaleTimeString()}
                      </div>
                      <div className="text-xs font-semibold text-[#0F172A] mt-0.5">
                        {evt.event_type.replace(/_/g, ' ')}
                      </div>
                      {evt.payload && Object.keys(evt.payload).length > 0 && (
                        <div className="mt-1 text-[11px] font-mono bg-slate-50 p-2 rounded border border-slate-100 text-slate-600">
                          {JSON.stringify(evt.payload)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ASSESSMENT PROGRESS */}
          {activeTab === 'assessment' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">Current Section</span>
                  <span className="font-bold text-[#1E3A8A]">{session?.current_section || 'Not Started'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">Current Question</span>
                  <span className="font-bold text-[#0F172A]">Q{session?.current_question || 1} / 27</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">Time Remaining</span>
                  <span className="font-mono font-bold text-slate-800">
                    {Math.floor((session?.time_remaining_seconds || 7080) / 60)}m {(session?.time_remaining_seconds || 7080) % 60}s
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">Last Telemetry Ping</span>
                  <span className="text-slate-500">
                    {session?.last_activity_at ? new Date(session.last_activity_at).toLocaleTimeString() : '—'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RESPONSES */}
          {activeTab === 'responses' && (
            <div className="space-y-3">
              {responses.length === 0 ? (
                <div className="text-center py-12 text-[#64748B] text-xs">
                  No responses recorded yet. Responses stream in real-time as candidate progresses.
                </div>
              ) : (
                responses.map((resp, i) => (
                  <div key={resp.id || i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#0F172A]">
                        {resp.section_id} · Question {resp.question_id}
                      </div>
                      <div className="text-[11px] text-[#64748B] mt-0.5">
                        Selected: <span className="font-mono font-bold text-[#1E3A8A]">{resp.selected_option}</span> · Spent {resp.time_spent_seconds}s
                      </div>
                    </div>
                    {resp.is_flagged && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">FLAGGED</span>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 5: REPORT */}
          {activeTab === 'report' && (
            <div>
              {report ? (
                <div className="space-y-4">
                  <div className="p-5 bg-[#FAF9F6] border border-slate-200 rounded-2xl text-center">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Testly Practice Score</div>
                    <div className="text-4xl font-serif font-bold text-[#1E3A8A] my-2">
                      {report.total_practice_score}
                    </div>
                    <div className="flex items-center justify-center gap-6 text-xs text-slate-700">
                      <span>Quant: <strong>{report.practice_quant_score}</strong></span>
                      <span>Verbal: <strong>{report.practice_verbal_score}</strong></span>
                      <span>Accuracy: <strong>{report.accuracy_pct}%</strong></span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#64748B] text-center italic">
                    Diagnostic simulation only. Testly Practice Score does not represent an official ETS score.
                  </p>
                </div>
              ) : (
                <div className="text-center py-12 text-[#64748B] text-xs">
                  Report will be generated automatically upon candidate submission.
                </div>
              )}
            </div>
          )}

          {/* TAB 6: ADMIN HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-12 text-[#64748B] text-xs">
                  No administrative actions logged for this record.
                </div>
              ) : (
                filteredLogs.map(log => (
                  <div key={log.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0F172A]">{log.action}</span>
                      <span className="text-[10px] font-mono text-slate-500">{new Date(log.created_at).toLocaleString()}</span>
                    </div>
                    <div className="text-[11px] text-slate-600">Admin: {log.admin_id}</div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
