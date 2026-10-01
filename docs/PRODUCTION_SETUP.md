# Testly Production Setup

## Required environment variables

Set these in the deployment environment:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ADMIN_EMAIL`

Never put a Supabase service-role key in Vite/browser environment variables.

## Database

Apply the migrations in this order:

1. `supabase/migrations/20260919_testly_100_core.sql`
2. `supabase/migrations/20261001_production_security_hardening.sql`
3. `supabase/migrations/20261001_candidate_access_rpc.sql`
4. `supabase/migrations/20261001_candidate_write_rpcs.sql`

Then insert the real Supabase Auth user UUID for the Testly administrator into:

`public.testly_admins(user_id)`

Do not put an administrator password in source code.

## Production behavior

When Supabase is not configured, TESTLY 100 must not use browser storage as authoritative production state.

Local storage is allowed only for an explicitly activated demo mode.

## Required verification

Before production release:

- `npm ci`
- `npm run lint`
- `npm test`
- `npm run build`
- Verify admin login through Supabase Auth.
- Verify an anonymous candidate can submit an application.
- Verify an administrator can approve exactly one seat atomically.
- Verify candidate access requires the opaque access token.
- Verify candidate responses and telemetry are rejected without a valid token.
- Verify a submitted report cannot be viewed using only a guessed seat ID or report ID.
- Verify the live deployment is serving the commit that passed the production gate.
