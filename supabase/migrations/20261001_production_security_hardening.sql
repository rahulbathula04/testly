-- Testly production security hardening
-- Apply after 20260919_testly_100_core.sql.
-- Before enabling admin operations, insert the real Supabase auth.users UUID into testly_admins.

create table if not exists public.testly_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.testly_admins enable row level security;

create or replace function public.is_testly_admin()
returns boolean
language sql
stable
security invoker
set search_path = public
as $$
  select exists (
    select 1
    from public.testly_admins
    where user_id = (select auth.uid())
  );
$$;

-- No direct client access to the admin allowlist.
revoke all on public.testly_admins from anon, authenticated;

-- Enable RLS on every Testly 100 table exposed through public.
alter table public.events enable row level security;
alter table public.captains enable row level security;
alter table public.event_invites enable row level security;
alter table public.event_applications enable row level security;
alter table public.event_participants enable row level security;
alter table public.participant_sessions enable row level security;
alter table public.assessment_attempts enable row level security;
alter table public.assessment_responses enable row level security;
alter table public.assessment_activity_events enable row level security;
alter table public.participant_reports enable row level security;
alter table public.admin_alerts enable row level security;
alter table public.admin_audit_logs enable row level security;

-- Public candidate application intake only. Candidates cannot read or modify applications.
drop policy if exists "public_can_submit_event_application" on public.event_applications;
create policy "public_can_submit_event_application"
on public.event_applications
for insert
to anon, authenticated
with check (
  status = 'PENDING'
  and consent = true
  and communication_consent = true
);

-- Admin-only operational access.
drop policy if exists "testly_admin_events" on public.events;
create policy "testly_admin_events" on public.events
for all to authenticated
using ((select public.is_testly_admin()))
with check ((select public.is_testly_admin()));

drop policy if exists "testly_admin_captains" on public.captains;
create policy "testly_admin_captains" on public.captains
for all to authenticated
using ((select public.is_testly_admin()))
with check ((select public.is_testly_admin()));

drop policy if exists "testly_admin_invites" on public.event_invites;
create policy "testly_admin_invites" on public.event_invites
for all to authenticated
using ((select public.is_testly_admin()))
with check ((select public.is_testly_admin()));

drop policy if exists "testly_admin_applications" on public.event_applications;
create policy "testly_admin_applications" on public.event_applications
for all to authenticated
using ((select public.is_testly_admin()))
with check ((select public.is_testly_admin()));

drop policy if exists "testly_admin_participants" on public.event_participants;
create policy "testly_admin_participants" on public.event_participants
for all to authenticated
using ((select public.is_testly_admin()))
with check ((select public.is_testly_admin()));

drop policy if exists "testly_admin_sessions" on public.participant_sessions;
create policy "testly_admin_sessions" on public.participant_sessions
for all to authenticated
using ((select public.is_testly_admin()))
with check ((select public.is_testly_admin()));

drop policy if exists "testly_admin_attempts" on public.assessment_attempts;
create policy "testly_admin_attempts" on public.assessment_attempts
for all to authenticated
using ((select public.is_testly_admin()))
with check ((select public.is_testly_admin()));

drop policy if exists "testly_admin_responses" on public.assessment_responses;
create policy "testly_admin_responses" on public.assessment_responses
for all to authenticated
using ((select public.is_testly_admin()))
with check ((select public.is_testly_admin()));

drop policy if exists "testly_admin_activity" on public.assessment_activity_events;
create policy "testly_admin_activity" on public.assessment_activity_events
for all to authenticated
using ((select public.is_testly_admin()))
with check ((select public.is_testly_admin()));

drop policy if exists "testly_admin_reports" on public.participant_reports;
create policy "testly_admin_reports" on public.participant_reports
for all to authenticated
using ((select public.is_testly_admin()))
with check ((select public.is_testly_admin()));

drop policy if exists "testly_admin_alerts" on public.admin_alerts;
create policy "testly_admin_alerts" on public.admin_alerts
for all to authenticated
using ((select public.is_testly_admin()))
with check ((select public.is_testly_admin()));

drop policy if exists "testly_admin_audit_logs" on public.admin_audit_logs;
create policy "testly_admin_audit_logs" on public.admin_audit_logs
for all to authenticated
using ((select public.is_testly_admin()))
with check ((select public.is_testly_admin()));

-- The seat allocator must never be callable by anonymous users or arbitrary
-- authenticated users.
revoke execute on function public.allocate_next_seat(uuid, uuid, text) from public, anon, authenticated;
grant execute on function public.allocate_next_seat(uuid, uuid, text) to authenticated;

create or replace function public.allocate_next_seat(
    p_event_id uuid,
    p_application_id uuid,
    p_admin_id text default 'system_admin'
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
    v_event_record record;
    v_app_record record;
    v_current_approved int;
    v_next_seat_num int;
    v_seat_id text;
    v_token text;
    v_participant_id uuid;
begin
    if not public.is_testly_admin() then
      raise exception 'Administrator authorization required';
    end if;

    select * into v_event_record
    from public.events
    where id = p_event_id
    for update;

    if not found then
      return jsonb_build_object('success', false, 'error', 'Event not found');
    end if;

    select * into v_app_record
    from public.event_applications
    where id = p_application_id and event_id = p_event_id
    for update;

    if not found then
      return jsonb_build_object('success', false, 'error', 'Application not found');
    end if;

    if v_app_record.status <> 'PENDING' then
      return jsonb_build_object('success', false, 'error', 'Application is not pending');
    end if;

    select count(*) into v_current_approved
    from public.event_participants
    where event_id = p_event_id and status <> 'REVOKED';

    if v_current_approved >= v_event_record.capacity then
      return jsonb_build_object('success', false, 'error', 'Event capacity limit reached');
    end if;

    select s.num into v_next_seat_num
    from generate_series(1, v_event_record.capacity) as s(num)
    where not exists (
      select 1
      from public.event_participants ep
      where ep.event_id = p_event_id
        and ep.seat_number = s.num
        and ep.status <> 'REVOKED'
    )
    order by s.num
    limit 1;

    if v_next_seat_num is null then
      return jsonb_build_object('success', false, 'error', 'No open seat slots found');
    end if;

    v_seat_id := 'TESTLY-' || lpad(v_next_seat_num::text, 3, '0');
    v_token := 't100_' || encode(gen_random_bytes(24), 'hex');

    insert into public.event_participants (
      event_id, application_id, seat_number, seat_id, access_token, status
    ) values (
      p_event_id, p_application_id, v_next_seat_num, v_seat_id, v_token, 'APPROVED'
    ) returning id into v_participant_id;

    insert into public.participant_sessions (
      participant_id, event_id, session_token, status, current_section,
      current_question, time_remaining_seconds
    ) values (
      v_participant_id, p_event_id, v_token, 'NOT_STARTED',
      'Quantitative Reasoning', 1, 7080
    );

    update public.event_applications
    set status = 'APPROVED',
        reviewed_at = now(),
        reviewed_by = p_admin_id
    where id = p_application_id;

    insert into public.admin_audit_logs (
      admin_id, action, target_id, metadata
    ) values (
      coalesce((select auth.uid())::text, p_admin_id),
      'APPROVE_PARTICIPANT',
      v_participant_id::text,
      jsonb_build_object(
        'seat_id', v_seat_id,
        'seat_number', v_next_seat_num,
        'application_id', p_application_id
      )
    );

    if v_current_approved + 1 >= v_event_record.capacity then
      update public.events set status = 'FULL', updated_at = now()
      where id = p_event_id;
    end if;

    return jsonb_build_object(
      'success', true,
      'participant_id', v_participant_id,
      'seat_id', v_seat_id,
      'seat_number', v_next_seat_num,
      'access_token', v_token,
      'approved_count', v_current_approved + 1,
      'seats_remaining', v_event_record.capacity - (v_current_approved + 1)
    );
end;
$$;
