-- Token-authorized candidate write RPCs for Testly 100.
-- These functions validate the opaque participant token before every write.

create or replace function public.testly_record_telemetry(
  p_access_token text,
  p_event_type text,
  p_payload jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_participant_id uuid;
  v_session_id uuid;
begin
  select ep.id, ps.id
    into v_participant_id, v_session_id
  from public.event_participants ep
  join public.participant_sessions ps on ps.participant_id = ep.id
  where ep.access_token = trim(p_access_token)
    and ep.status <> 'REVOKED'
  limit 1;

  if v_participant_id is null then
    raise exception 'Invalid candidate access token';
  end if;

  update public.participant_sessions
  set last_activity_at = now(),
      status = coalesce(nullif(p_payload->>'status',''), status),
      current_section = coalesce(nullif(p_payload->>'current_section',''), current_section),
      current_question = coalesce((p_payload->>'current_question')::int, current_question),
      time_remaining_seconds = coalesce((p_payload->>'time_remaining_seconds')::int, time_remaining_seconds),
      updated_at = now()
  where id = v_session_id;

  insert into public.assessment_activity_events (
    session_id, participant_id, event_type, payload
  ) values (
    v_session_id, v_participant_id, p_event_type, coalesce(p_payload, '{}'::jsonb)
  );
end;
$$;

create or replace function public.testly_record_response(
  p_access_token text,
  p_question_id text,
  p_section_id text,
  p_selected_option text,
  p_time_spent_seconds int,
  p_is_flagged boolean default false
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_participant_id uuid;
  v_session_id uuid;
begin
  select ep.id, ps.id
    into v_participant_id, v_session_id
  from public.event_participants ep
  join public.participant_sessions ps on ps.participant_id = ep.id
  where ep.access_token = trim(p_access_token)
    and ep.status <> 'REVOKED'
    and ps.status not in ('SUBMITTED', 'EXPIRED', 'DISCONNECTED')
  limit 1;

  if v_participant_id is null then
    raise exception 'Invalid or inactive candidate access token';
  end if;

  insert into public.assessment_responses (
    session_id, question_id, section_id, selected_option,
    time_spent_seconds, is_flagged, answered_at
  ) values (
    v_session_id, p_question_id, p_section_id, p_selected_option,
    greatest(coalesce(p_time_spent_seconds, 0), 0), coalesce(p_is_flagged, false), now()
  )
  on conflict (session_id, question_id)
  do update set
    selected_option = excluded.selected_option,
    time_spent_seconds = excluded.time_spent_seconds,
    is_flagged = excluded.is_flagged,
    answered_at = excluded.answered_at;

  update public.participant_sessions
  set last_activity_at = now(), updated_at = now()
  where id = v_session_id;
end;
$$;

create or replace function public.testly_submit_assessment(
  p_access_token text,
  p_quant_score int,
  p_verbal_score int,
  p_total_score int,
  p_accuracy_pct numeric,
  p_total_time_spent_seconds int default 0,
  p_section_breakdown jsonb default '{}'::jsonb,
  p_skill_matrix jsonb default '{}'::jsonb,
  p_recommended_focus jsonb default '[]'::jsonb,
  p_study_plan jsonb default '[]'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_participant_id uuid;
  v_session_id uuid;
  v_event_id uuid;
  v_attempt_id uuid;
  v_report public.participant_reports%rowtype;
begin
  if p_quant_score is null or p_verbal_score is null or p_accuracy_pct is null then
    raise exception 'Incomplete assessment evaluation';
  end if;

  select ep.id, ps.id, ep.event_id
    into v_participant_id, v_session_id, v_event_id
  from public.event_participants ep
  join public.participant_sessions ps on ps.participant_id = ep.id
  where ep.access_token = trim(p_access_token)
    and ep.status <> 'REVOKED'
  limit 1;

  if v_participant_id is null then
    raise exception 'Invalid candidate access token';
  end if;

  if exists (
    select 1 from public.participant_sessions
    where id = v_session_id and status = 'SUBMITTED'
  ) then
    select * into v_report
    from public.participant_reports
    where participant_id = v_participant_id;
    return to_jsonb(v_report);
  end if;

  insert into public.assessment_attempts (
    session_id, participant_id, event_id,
    practice_quant_score, practice_verbal_score, total_practice_score,
    accuracy_pct, total_time_spent_seconds, completed_at
  ) values (
    v_session_id, v_participant_id, v_event_id,
    p_quant_score, p_verbal_score, coalesce(p_total_score, p_quant_score + p_verbal_score),
    p_accuracy_pct, greatest(coalesce(p_total_time_spent_seconds, 0), 0), now()
  ) returning id into v_attempt_id;

  insert into public.participant_reports (
    participant_id, attempt_id,
    practice_quant_score, practice_verbal_score, total_practice_score,
    accuracy_pct, section_breakdown, skill_matrix,
    recommended_focus, study_plan, generated_at
  ) values (
    v_participant_id, v_attempt_id,
    p_quant_score, p_verbal_score, coalesce(p_total_score, p_quant_score + p_verbal_score),
    p_accuracy_pct, coalesce(p_section_breakdown, '{}'::jsonb),
    coalesce(p_skill_matrix, '{}'::jsonb), coalesce(p_recommended_focus, '[]'::jsonb),
    coalesce(p_study_plan, '[]'::jsonb), now()
  )
  returning * into v_report;

  update public.participant_sessions
  set status = 'SUBMITTED', ended_at = now(), last_activity_at = now(), updated_at = now()
  where id = v_session_id;

  update public.event_participants
  set status = 'COMPLETED'
  where id = v_participant_id;

  insert into public.assessment_activity_events (
    session_id, participant_id, event_type, payload
  ) values (
    v_session_id, v_participant_id, 'TEST_SUBMITTED',
    jsonb_build_object('total_score', v_report.total_practice_score)
  );

  return to_jsonb(v_report);
end;
$$;

revoke execute on function public.testly_record_telemetry(text, text, jsonb) from public;
revoke execute on function public.testly_record_response(text, text, text, text, int, boolean) from public;
revoke execute on function public.testly_submit_assessment(text, int, int, int, numeric, int, jsonb, jsonb, jsonb, jsonb) from public;

grant execute on function public.testly_record_telemetry(text, text, jsonb) to anon, authenticated;
grant execute on function public.testly_record_response(text, text, text, text, int, boolean) to anon, authenticated;
grant execute on function public.testly_submit_assessment(text, int, int, int, numeric, int, jsonb, jsonb, jsonb, jsonb) to anon, authenticated;
