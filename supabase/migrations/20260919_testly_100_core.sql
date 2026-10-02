-- ============================================================================
-- TESTLY 100: AUTHORITATIVE POSTGRES SCHEMA & ATOMIC SEAT ALLOCATION
-- ============================================================================
-- Single source of truth for Testly 100 private diagnostic assessment events.
-- Run this in Supabase SQL Editor.
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. EVENTS TABLE (Configurable for Testly 100, future mocks, campus events)
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    exam_type TEXT NOT NULL DEFAULT 'GRE',
    capacity INT NOT NULL DEFAULT 100,
    status TEXT NOT NULL DEFAULT 'OPEN' CHECK (status IN ('DRAFT', 'OPEN', 'FULL', 'LIVE', 'COMPLETED', 'ARCHIVED')),
    visibility TEXT NOT NULL DEFAULT 'PRIVATE' CHECK (visibility IN ('PRIVATE', 'PUBLIC', 'UNLISTED')),
    registration_open TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    registration_close TIMESTAMPTZ,
    assessment_start TIMESTAMPTZ,
    assessment_end TIMESTAMPTZ,
    config JSONB NOT NULL DEFAULT '{
        "duration_minutes": 118,
        "sections": ["Quantitative Reasoning", "Verbal Reasoning"],
        "heartbeat_interval_sec": 15,
        "idle_timeout_sec": 90,
        "disconnect_timeout_sec": 180,
        "allow_calculator": true,
        "uninflated_scoring": true
    }'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. CAPTAINS TABLE (Attribution & community ambassadors)
CREATE TABLE IF NOT EXISTS captains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    campus TEXT,
    notes TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. EVENT INVITES (Shareable invite links with attribution)
CREATE TABLE IF NOT EXISTS event_invites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    code TEXT UNIQUE NOT NULL,
    captain_id UUID REFERENCES captains(id) ON DELETE SET NULL,
    max_applications INT DEFAULT NULL,
    usage_count INT NOT NULL DEFAULT 0,
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. EVENT APPLICATIONS (Candidate submissions: PENDING -> APPROVED / REJECTED / WAITLISTED)
CREATE TABLE IF NOT EXISTS event_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    invite_id UUID REFERENCES event_invites(id) ON DELETE SET NULL,
    captain_code TEXT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    college TEXT NOT NULL,
    education_level TEXT NOT NULL,
    target_gre_date TEXT NOT NULL,
    target_country TEXT NOT NULL,
    target_intake TEXT NOT NULL,
    consent BOOLEAN NOT NULL DEFAULT TRUE,
    communication_consent BOOLEAN NOT NULL DEFAULT TRUE,
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'WAITLISTED')),
    admin_notes TEXT,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    reviewed_by TEXT,
    CONSTRAINT unique_event_candidate_email UNIQUE (event_id, email)
);

-- 5. EVENT PARTICIPANTS (Approved candidates assigned an immutable seat TESTLY-001..TESTLY-100)
CREATE TABLE IF NOT EXISTS event_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    application_id UUID UNIQUE NOT NULL REFERENCES event_applications(id) ON DELETE CASCADE,
    seat_number INT NOT NULL CHECK (seat_number >= 1 AND seat_number <= 100),
    seat_id TEXT NOT NULL,
    access_token TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'APPROVED' CHECK (status IN ('APPROVED', 'ACTIVE', 'IDLE', 'PAUSED', 'COMPLETED', 'REVOKED')),
    approved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ,
    revoked_reason TEXT,
    CONSTRAINT unique_event_seat_number UNIQUE (event_id, seat_number),
    CONSTRAINT unique_event_seat_id UNIQUE (event_id, seat_id)
);

-- 6. PARTICIPANT SESSIONS (Assessment instances with real-time heartbeat and telemetry)
CREATE TABLE IF NOT EXISTS participant_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_id UUID UNIQUE NOT NULL REFERENCES event_participants(id) ON DELETE CASCADE,
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    session_token TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'NOT_STARTED' CHECK (status IN ('NOT_STARTED', 'ACTIVE', 'IDLE', 'PAUSED', 'SUBMITTED', 'EXPIRED', 'DISCONNECTED')),
    started_at TIMESTAMPTZ,
    last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    current_section TEXT NOT NULL DEFAULT 'Quantitative Reasoning',
    current_question INT NOT NULL DEFAULT 1,
    time_remaining_seconds INT NOT NULL DEFAULT 7080, -- 118 mins
    browser_metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. ASSESSMENT ATTEMPTS (Consolidated attempt results)
CREATE TABLE IF NOT EXISTS assessment_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES participant_sessions(id) ON DELETE CASCADE,
    participant_id UUID NOT NULL REFERENCES event_participants(id) ON DELETE CASCADE,
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    raw_quant_score INT DEFAULT 0,
    raw_verbal_score INT DEFAULT 0,
    practice_quant_score INT DEFAULT 130,
    practice_verbal_score INT DEFAULT 130,
    total_practice_score INT DEFAULT 260,
    accuracy_pct NUMERIC(5,2) DEFAULT 0.00,
    total_time_spent_seconds INT DEFAULT 0,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. ASSESSMENT RESPONSES (Granular question answers, autosaved with latency & flags)
CREATE TABLE IF NOT EXISTS assessment_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID REFERENCES assessment_attempts(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES participant_sessions(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL,
    section_id TEXT NOT NULL,
    selected_option TEXT,
    is_correct BOOLEAN DEFAULT NULL,
    time_spent_seconds INT NOT NULL DEFAULT 0,
    is_flagged BOOLEAN NOT NULL DEFAULT FALSE,
    is_skipped BOOLEAN NOT NULL DEFAULT FALSE,
    answered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_session_question UNIQUE (session_id, question_id)
);

-- 9. ASSESSMENT ACTIVITY EVENTS (Immutable second-by-second telemetry audit log)
CREATE TABLE IF NOT EXISTS assessment_activity_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES participant_sessions(id) ON DELETE CASCADE,
    participant_id UUID NOT NULL REFERENCES event_participants(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    payload JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. PARTICIPANT REPORTS (Testly Practice Score, skill matrix, and 7-day trajectory)
CREATE TABLE IF NOT EXISTS participant_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_id UUID UNIQUE NOT NULL REFERENCES event_participants(id) ON DELETE CASCADE,
    attempt_id UUID NOT NULL REFERENCES assessment_attempts(id) ON DELETE CASCADE,
    practice_quant_score INT NOT NULL,
    practice_verbal_score INT NOT NULL,
    total_practice_score INT NOT NULL,
    accuracy_pct NUMERIC(5,2) NOT NULL,
    section_breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
    skill_matrix JSONB NOT NULL DEFAULT '{}'::jsonb,
    recommended_focus JSONB NOT NULL DEFAULT '[]'::jsonb,
    study_plan JSONB NOT NULL DEFAULT '[]'::jsonb,
    generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. ADMIN ALERTS (Real-time proactive monitoring alerts)
CREATE TABLE IF NOT EXISTS admin_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    participant_id UUID REFERENCES event_participants(id) ON DELETE SET NULL,
    alert_type TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('INFO', 'WARNING', 'CRITICAL')),
    message TEXT NOT NULL,
    is_resolved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. ADMIN AUDIT LOGS (Immutable security and operations log)
CREATE TABLE IF NOT EXISTS admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id TEXT NOT NULL,
    action TEXT NOT NULL,
    target_id TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- ARCHITECTURAL RULE #2: ATOMIC SEAT ALLOCATOR (RPC FUNCTION)
-- Enforces capacity <= 100 with row locking and gap-free seat numbering
-- ============================================================================
CREATE OR REPLACE FUNCTION allocate_next_seat(
    p_event_id UUID,
    p_application_id UUID,
    p_admin_id TEXT DEFAULT 'system_admin'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_event_record RECORD;
    v_app_record RECORD;
    v_current_approved INT;
    v_next_seat_num INT;
    v_seat_id TEXT;
    v_token TEXT;
    v_participant_id UUID;
BEGIN
    -- 1. Explicit row-level lock on the event to serialize concurrent approvals
    SELECT * INTO v_event_record
    FROM events
    WHERE id = p_event_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Event not found');
    END IF;

    -- 2. Verify application is currently pending
    SELECT * INTO v_app_record
    FROM event_applications
    WHERE id = p_application_id AND event_id = p_event_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Application not found');
    END IF;

    IF v_app_record.status = 'APPROVED' THEN
        RETURN jsonb_build_object('success', false, 'error', 'Application is already approved');
    END IF;

    -- 3. Lock check: strictly enforce capacity <= 100
    SELECT COUNT(*) INTO v_current_approved
    FROM event_participants
    WHERE event_id = p_event_id AND status != 'REVOKED';

    IF v_current_approved >= v_event_record.capacity THEN
        RETURN jsonb_build_object(
            'success', false, 
            'error', 'Event capacity limit reached. Maximum ' || v_event_record.capacity || ' approved participants permitted.'
        );
    END IF;

    -- 4. Find the lowest available seat number from 1 to capacity (e.g. 100)
    SELECT s.num INTO v_next_seat_num
    FROM generate_series(1, v_event_record.capacity) AS s(num)
    WHERE NOT EXISTS (
        SELECT 1 FROM event_participants ep
        WHERE ep.event_id = p_event_id
          AND ep.seat_number = s.num
          AND ep.status != 'REVOKED'
    )
    ORDER BY s.num ASC
    LIMIT 1;

    IF v_next_seat_num IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'No open seat slots found');
    END IF;

    -- 5. Format standard seat identifier: TESTLY-001 ... TESTLY-100
    v_seat_id := 'TESTLY-' || LPAD(v_next_seat_num::text, 3, '0');
    v_token := 't100_' || encode(gen_random_bytes(16), 'hex');

    -- 6. Atomically insert participant
    INSERT INTO event_participants (
        event_id,
        application_id,
        seat_number,
        seat_id,
        access_token,
        status,
        approved_at
    ) VALUES (
        p_event_id,
        p_application_id,
        v_next_seat_num,
        v_seat_id,
        v_token,
        'APPROVED',
        NOW()
    ) RETURNING id INTO v_participant_id;

    -- 7. Atomically create session record
    INSERT INTO participant_sessions (
        participant_id,
        event_id,
        session_token,
        status,
        current_section,
        current_question,
        time_remaining_seconds
    ) VALUES (
        v_participant_id,
        p_event_id,
        v_token,
        'NOT_STARTED',
        'Quantitative Reasoning',
        1,
        7080
    );

    -- 8. Update application status
    UPDATE event_applications
    SET status = 'APPROVED',
        reviewed_at = NOW(),
        reviewed_by = p_admin_id
    WHERE id = p_application_id;

    -- 9. Record immutable audit log
    INSERT INTO admin_audit_logs (
        admin_id,
        action,
        target_id,
        metadata
    ) VALUES (
        p_admin_id,
        'APPROVE_PARTICIPANT',
        v_participant_id::text,
        jsonb_build_object(
            'seat_id', v_seat_id,
            'seat_number', v_next_seat_num,
            'application_id', p_application_id,
            'applicant_name', v_app_record.full_name
        )
    );

    -- If event reaches capacity, update event status to FULL
    IF (v_current_approved + 1) >= v_event_record.capacity THEN
        UPDATE events SET status = 'FULL' WHERE id = p_event_id;
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'participant_id', v_participant_id,
        'seat_id', v_seat_id,
        'seat_number', v_next_seat_num,
        'access_token', v_token,
        'approved_count', v_current_approved + 1,
        'seats_remaining', v_event_record.capacity - (v_current_approved + 1)
    );
END;
$$;

-- ============================================================================
-- REALTIME REPLICATION SETUP
-- ============================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE event_applications;
ALTER PUBLICATION supabase_realtime ADD TABLE event_participants;
ALTER PUBLICATION supabase_realtime ADD TABLE participant_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE assessment_activity_events;
ALTER PUBLICATION supabase_realtime ADD TABLE admin_alerts;

-- ============================================================================
-- SEED CANONICAL EVENT RECORD (Testly 100 Initial State)
-- ============================================================================
INSERT INTO events (
    slug,
    name,
    description,
    exam_type,
    capacity,
    status,
    visibility,
    registration_open,
    config
) VALUES (
    'testly-100',
    'TESTLY 100',
    'Exclusive private GRE diagnostic assessment cohort for exactly 100 approved participants.',
    'GRE',
    100,
    'OPEN',
    'PRIVATE',
    NOW(),
    '{
        "duration_minutes": 118,
        "sections": ["Quantitative Reasoning", "Verbal Reasoning"],
        "heartbeat_interval_sec": 15,
        "idle_timeout_sec": 90,
        "disconnect_timeout_sec": 180,
        "allow_calculator": true,
        "uninflated_scoring": true
    }'::jsonb
) ON CONFLICT (slug) DO NOTHING;

-- Seed default invite code
INSERT INTO event_invites (
    event_id,
    code,
    is_active
) 
SELECT id, 'GRE-HYD-TESTLY100', true 
FROM events WHERE slug = 'testly-100'
ON CONFLICT (code) DO NOTHING;
