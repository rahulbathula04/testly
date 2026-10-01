-- Candidate access boundary for Testly 100.
-- Access is granted only with the opaque participant access token.
-- Seat IDs and email addresses are not authentication credentials.

create or replace function public.verify_testly_candidate(p_access_token text)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_participant public.event_participants%rowtype;
  v_application public.event_applications%rowtype;
  v_session public.participant_sessions%rowtype;
  v_report public.participant_reports%rowtype;
begin
  if p_access_token is null or length(trim(p_access_token)) < 20 then
    return jsonb_build_object('authorized', false, 'reason', 'INVALID_TOKEN');
  end if;

  select *
    into v_participant
  from public.event_participants
  where access_token = trim(p_access_token)
    and status <> 'REVOKED'
  limit 1;

  if not found then
    return jsonb_build_object('authorized', false, 'reason', 'NOT_FOUND');
  end if;

  select * into v_application
  from public.event_applications
  where id = v_participant.application_id;

  select * into v_session
  from public.participant_sessions
  where participant_id = v_participant.id;

  select * into v_report
  from public.participant_reports
  where participant_id = v_participant.id;

  return jsonb_build_object(
    'authorized', true,
    'participant', jsonb_build_object(
      'id', v_participant.id,
      'event_id', v_participant.event_id,
      'seat_id', v_participant.seat_id,
      'seat_number', v_participant.seat_number,
      'status', v_participant.status,
      'approved_at', v_participant.approved_at
    ),
    'application', jsonb_build_object(
      'id', v_application.id,
      'full_name', v_application.full_name,
      'email', v_application.email,
      'city', v_application.city,
      'college', v_application.college,
      'education_level', v_application.education_level,
      'target_gre_date', v_application.target_gre_date,
      'target_country', v_application.target_country,
      'target_intake', v_application.target_intake,
      'status', v_application.status
    ),
    'session', to_jsonb(v_session),
    'report', to_jsonb(v_report)
  );
end;
$$;

revoke execute on function public.verify_testly_candidate(text) from public;
grant execute on function public.verify_testly_candidate(text) to anon, authenticated;
