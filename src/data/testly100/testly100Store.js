/**
 * TESTLY 100: Centralized Private Assessment Event & Real-Time Telemetry Store
 * 
 * Manages event configuration, hard 100-seat capacity model, atomic participant numbering (TESTLY-001..100),
 * state machine transitions, telemetry event logging, admin audit logs, and real-time multi-tab broadcasting.
 */

const STORAGE_KEY_EVENT = 'testly_100_event_config';
const STORAGE_KEY_APPLICATIONS = 'testly_100_applications';
const STORAGE_KEY_SESSIONS = 'testly_100_sessions';
const STORAGE_KEY_EVENTS_LOG = 'testly_100_activity_events';
const STORAGE_KEY_AUDIT_LOG = 'testly_100_audit_log';
const STORAGE_KEY_INVITES = 'testly_100_invites';
const STORAGE_KEY_CAPTAINS = 'testly_100_captains';

// Realtime cross-tab broadcast bus
let broadcastBus = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    broadcastBus = new BroadcastChannel('testly_100_bus');
  } catch {
    broadcastBus = null;
  }
}

function emitBus(eventType, payload) {
  if (typeof window === 'undefined') return;
  const detail = { type: eventType, payload, timestamp: new Date().toISOString() };
  try {
    if (broadcastBus) broadcastBus.postMessage(detail);
  } catch {}
  try {
    window.dispatchEvent(new CustomEvent('testly_100_sync', { detail }));
  } catch {}
}

// ── 1. EVENT CONFIGURATION ──────────────────────────────────────────────────
export const DEFAULT_EVENT = {
  event_id: 'testly-100-gre-2026',
  event_name: 'Testly 100 — GRE Diagnostic Edition',
  capacity: 100,
  status: 'LIVE', // DRAFT | OPEN | FULL | CLOSED | LIVE | COMPLETED | ARCHIVED
  registration_open: '2026-09-01T00:00:00Z',
  registration_close: '2026-10-15T23:59:59Z',
  test_start: '2026-09-19T09:00:00Z',
  test_end: '2026-10-31T23:59:59Z',
  exam: 'GRE General Test',
  description: 'Exclusive private cohort for 100 verified candidates. Full 1:58 authentic simulation with faculty diagnostic analysis.'
};

export function getEventConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EVENT);
    return raw ? JSON.parse(raw) : DEFAULT_EVENT;
  } catch {
    return DEFAULT_EVENT;
  }
}

export function updateEventConfig(updates, adminUser = 'Rahul Bathula') {
  const current = getEventConfig();
  const updated = { ...current, ...updates, updated_at: new Date().toISOString() };
  try {
    localStorage.setItem(STORAGE_KEY_EVENT, JSON.stringify(updated));
    logAdminAction(adminUser, 'UPDATE_EVENT_SETTINGS', current.event_id, updates);
    emitBus('EVENT_UPDATED', updated);
  } catch {}
  return updated;
}

// ── 2. SEED DATA GENERATOR (Realistic Cohort of 86 Approved Participants) ──
function generateSeedParticipants() {
  // Production must start empty. Demo data belongs in an explicit demo fixture,
  // never in the default client store.
  return [];
}

// ── 3. APPLICATIONS & PARTICIPANTS STORE ────────────────────────────────────
export function getApplications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
    if (!raw) {
      const empty = [];
      localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(empty));
      return empty;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveApplications(apps) {
  try {
    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(apps));
    emitBus('APPLICATIONS_UPDATED', apps);
  } catch {}
}

// ── 4. ATOMIC CAPACITY & APPROVAL ENGINE ────────────────────────────────────
export function getApprovedCount() {
  const apps = getApplications();
  return apps.filter(a => a.status === 'APPROVED').length;
}

export function getNextAvailableSeatNumber() {
  const apps = getApplications();
  const assigned = new Set(
    apps.filter(a => a.status === 'APPROVED' && a.seat_index)
        .map(a => a.seat_index)
  );

  for (let i = 1; i <= 100; i++) {
    if (!assigned.has(i)) {
      return i;
    }
  }
  return null; // Full!
}

export function approveCandidate(applicationId, adminUser = 'Rahul Bathula') {
  const apps = getApplications();
  const app = apps.find(a => a.id === applicationId);
  if (!app) return { success: false, error: 'Application not found' };

  if (app.status === 'APPROVED') {
    return { success: true, participant: app };
  }

  const nextSeat = getNextAvailableSeatNumber();
  if (!nextSeat) {
    // Hard 100 Cap Reached -> Automatic Waitlist
    app.status = 'WAITLIST';
    saveApplications(apps);
    logAdminAction(adminUser, 'AUTO_WAITLIST_CAPACITY_REACHED', applicationId, { capacity: 100 });
    return { success: false, error: 'Testly 100 capacity (100/100) has been reached. Candidate moved to Waitlist.' };
  }

  const seatStr = String(nextSeat).padStart(3, '0');
  const token = `T100-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${seatStr}`;

  app.status = 'APPROVED';
  app.seat_index = nextSeat;
  app.participant_number = `TESTLY-${seatStr}`;
  app.access_token = token;
  app.approved_at = new Date().toISOString();
  app.approved_by = adminUser;
  
  if (!app.session) {
    app.session = {
      status: 'NOT_STARTED',
      started_at: null,
      last_active_at: new Date().toISOString(),
      current_section: 'Quantitative Reasoning',
      current_question: 1,
      total_questions: 27,
      progress: 0,
      time_remaining: '47:00',
      questions_answered: 0,
      device: 'Desktop Browser',
      score: null
    };
  }

  app.timeline = app.timeline || [];
  app.timeline.push({
    type: 'APPROVED',
    timestamp: new Date().toISOString(),
    label: `Approved by ${adminUser} (Assigned ${app.participant_number})`
  });

  saveApplications(apps);
  logAdminAction(adminUser, 'APPROVE_CANDIDATE', applicationId, { seat: app.participant_number, token });
  emitBus('CANDIDATE_APPROVED', app);
  return { success: true, participant: app };
}

export function rejectCandidate(applicationId, reason = 'Did not meet test criteria', adminUser = 'Rahul Bathula') {
  const apps = getApplications();
  const app = apps.find(a => a.id === applicationId);
  if (!app) return { success: false, error: 'Application not found' };

  app.status = 'REJECTED';
  app.rejection_reason = reason;
  app.rejected_at = new Date().toISOString();
  app.rejected_by = adminUser;
  app.participant_number = null;
  app.access_token = null;

  app.timeline = app.timeline || [];
  app.timeline.push({
    type: 'REJECTED',
    timestamp: new Date().toISOString(),
    label: `Rejected by ${adminUser} (${reason})`
  });

  saveApplications(apps);
  logAdminAction(adminUser, 'REJECT_CANDIDATE', applicationId, { reason });
  emitBus('CANDIDATE_REJECTED', app);
  return { success: true };
}

export function waitlistCandidate(applicationId, adminUser = 'Rahul Bathula') {
  const apps = getApplications();
  const app = apps.find(a => a.id === applicationId);
  if (!app) return { success: false, error: 'Application not found' };

  app.status = 'WAITLIST';
  app.waitlisted_at = new Date().toISOString();
  app.waitlisted_by = adminUser;

  app.timeline = app.timeline || [];
  app.timeline.push({
    type: 'WAITLISTED',
    timestamp: new Date().toISOString(),
    label: `Placed on Waitlist by ${adminUser}`
  });

  saveApplications(apps);
  logAdminAction(adminUser, 'WAITLIST_CANDIDATE', applicationId, {});
  emitBus('CANDIDATE_WAITLISTED', app);
  return { success: true };
}

export function revokeAccess(applicationId, reason = 'Administrative revocation', adminUser = 'Rahul Bathula') {
  const apps = getApplications();
  const app = apps.find(a => a.id === applicationId);
  if (!app) return { success: false, error: 'Application not found' };

  const prevSeat = app.participant_number;
  app.status = 'REVOKED';
  app.revocation_reason = reason;
  app.revoked_at = new Date().toISOString();
  app.revoked_by = adminUser;
  app.seat_index = null;
  app.participant_number = null;
  app.access_token = null;
  if (app.session) {
    app.session.status = 'REVOKED';
  }

  app.timeline = app.timeline || [];
  app.timeline.push({
    type: 'REVOKED',
    timestamp: new Date().toISOString(),
    label: `Access Revoked by ${adminUser} (${reason}). Seat ${prevSeat} released.`
  });

  saveApplications(apps);
  logAdminAction(adminUser, 'REVOKE_ACCESS', applicationId, { releasedSeat: prevSeat, reason });
  emitBus('ACCESS_REVOKED', { applicationId, releasedSeat: prevSeat });
  return { success: true, releasedSeat: prevSeat };
}

export function createApplication(formData) {
  const apps = getApplications();
  const id = `app_${Date.now()}`;
  const approvedCount = getApprovedCount();

  const newApp = {
    id,
    participant_number: null,
    seat_index: null,
    access_token: null,
    name: formData.name.trim(),
    email: formData.email.trim().toLowerCase(),
    phone: formData.phone.trim(),
    city: formData.city || 'Hyderabad',
    college: formData.college || 'Engineering College',
    education_level: formData.education_level || 'Final Year B.Tech',
    target_exam: 'GRE',
    target_date: formData.target_date || 'November 2026',
    target_country: formData.target_country || 'United States',
    target_intake: formData.target_intake || 'Fall 2027',
    referral_source: formData.ref || 'DIRECT',
    status: approvedCount >= 100 ? 'WAITLIST' : 'PENDING',
    applied_at: new Date().toISOString(),
    approved_at: null,
    approved_by: null,
    session: null,
    timeline: [
      { type: 'APPLICATION_SUBMITTED', timestamp: new Date().toISOString(), label: 'Submitted Application for Testly 100 Seat' }
    ]
  };

  apps.unshift(newApp);
  saveApplications(apps);
  emitBus('NEW_APPLICATION', newApp);
  return newApp;
}

export function findApplicationByCredential(credential) {
  const clean = credential.trim().toLowerCase().replace(/\s+/g, '');
  const cleanPhone = credential.replace(/\D/g, '');
  const apps = getApplications();

  return apps.find(a => {
    const aEmail = (a.email || '').toLowerCase();
    const aPhone = (a.phone || '').replace(/\D/g, '');
    const aToken = (a.access_token || '').toLowerCase();
    const aNum = (a.participant_number || '').toLowerCase();

    return aEmail === clean ||
           (cleanPhone.length >= 10 && aPhone.endsWith(cleanPhone.slice(-10))) ||
           aToken === clean ||
           aNum === clean;
  });
}

// ── 5. REAL-TIME ACTIVITY TELEMETRY ─────────────────────────────────────────
export function logTelemetryEvent(applicationId, eventType, metadata = {}) {
  const apps = getApplications();
  const app = apps.find(a => a.id === applicationId);
  if (!app) return;

  app.session = app.session || {};
  app.session.last_active_at = new Date().toISOString();

  if (metadata.currentSection) app.session.current_section = metadata.currentSection;
  if (metadata.currentQuestion !== undefined) app.session.current_question = metadata.currentQuestion;
  if (metadata.progress !== undefined) app.session.progress = metadata.progress;
  if (metadata.timeRemaining) app.session.time_remaining = metadata.timeRemaining;
  if (metadata.status) app.session.status = metadata.status;
  if (metadata.score) app.session.score = metadata.score;

  app.timeline = app.timeline || [];
  app.timeline.unshift({
    type: eventType,
    timestamp: new Date().toISOString(),
    label: metadata.label || eventType.replace(/_/g, ' ')
  });

  saveApplications(apps);
  emitBus('TELEMETRY_PULSE', { applicationId, eventType, metadata, session: app.session });
}

// ── 6. ADMIN AUDIT LOG ──────────────────────────────────────────────────────
export function getAuditLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUDIT_LOG);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function logAdminAction(adminUser, action, targetId, details = {}) {
  const logs = getAuditLogs();
  logs.unshift({
    id: `aud_${Date.now()}`,
    admin: adminUser,
    action,
    target: targetId,
    timestamp: new Date().toISOString(),
    details
  });
  try {
    localStorage.setItem(STORAGE_KEY_AUDIT_LOG, JSON.stringify(logs.slice(0, 200)));
    emitBus('AUDIT_LOGGED', logs[0]);
  } catch {}
}

// ── 7. CAPTAINS & REFERRAL TRACKING ─────────────────────────────────────────
export function getCaptainsReport() {
  const apps = getApplications();
  const captains = [
    { code: 'CAPTAIN01', name: 'Arjun K. (CBIT Campus Ambassador)' },
    { code: 'CAPTAIN02', name: 'Priya M. (BITS Hyderabad Representative)' },
    { code: 'CAPTAIN03', name: 'Rohan T. (VNR VJIET Student Lead)' },
    { code: 'DIRECT', name: 'Direct Public Invite / Organic' }
  ];

  return captains.map(cap => {
    const capApps = apps.filter(a => (a.referral_source || 'DIRECT').toUpperCase() === cap.code);
    const approved = capApps.filter(a => a.status === 'APPROVED');
    const started = approved.filter(a => a.session && a.session.status !== 'NOT_STARTED');
    const completed = approved.filter(a => a.session && a.session.status === 'COMPLETED');

    return {
      code: cap.code,
      name: cap.name,
      applications: capApps.length,
      approved: approved.length,
      attended: started.length,
      completed: completed.length
    };
  });
}

// ── 8. INVITE TOKENS ────────────────────────────────────────────────────────
export const DEFAULT_INVITES = [
  { token: 'GRE-HYD-TESTLY100', name: 'Hyderabad Aspirants Alpha Link', max_applications: 500, status: 'ACTIVE', created_at: '2026-09-01' },
  { token: 'CAPTAIN01', name: 'CBIT Campus Ambassador Pass', max_applications: 100, status: 'ACTIVE', created_at: '2026-09-05' },
  { token: 'CAPTAIN02', name: 'BITS Hyderabad Ambassador Pass', max_applications: 100, status: 'ACTIVE', created_at: '2026-09-05' },
  { token: 'CAPTAIN03', name: 'VNR VJIET Ambassador Pass', max_applications: 100, status: 'ACTIVE', created_at: '2026-09-08' }
];

export function getInvites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INVITES);
    return raw ? JSON.parse(raw) : DEFAULT_INVITES;
  } catch {
    return DEFAULT_INVITES;
  }
}
