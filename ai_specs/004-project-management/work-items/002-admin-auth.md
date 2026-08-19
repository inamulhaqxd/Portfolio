## What to build

Admin authentication: login page at `/login`, session refresh via `proxy.ts`, and protected admin routes that redirect unauthenticated users.

## Required context

- Shared `proxy.ts` exists at `packages/supabase/proxy.ts` — admin app needs its own copy or import
- Supabase client for auth exists at `admin/src/shared/lib/supabase/client.ts` (browser) and `server.ts` (server)
- Admin layout is at `admin/src/app/layout.tsx` — currently has no auth check
- Route stubs exist: `/projects/new`, `/projects/:id/edit`
- Auth uses email/password via Supabase Auth

## Acceptance criteria

- [ ] Login page at `/login` with email/password form
- [ ] Login form calls Supabase `signInWithPassword` on submit
- [ ] On successful login, redirect to `/projects` (admin dashboard)
- [ ] On failed login, show error message ("Invalid email or password")
- [ ] Admin app has `proxy.ts` file that checks session and redirects to `/login` if unauthenticated
- [ ] `/login` and `/auth` paths are excluded from redirect (no infinite loop)
- [ ] Admin layout checks session on render — unauthenticated users see login page
- [ ] After login, all admin pages are accessible without re-authentication
- [ ] Logout button clears session and redirects to `/login`
- [ ] Unit tests for login form validation pass
- [ ] Component tests for login form states (loading, error, success) pass
- [ ] E2E test for login flow (navigate to admin → redirect to login → enter credentials → access admin) passes

## Covers

- User Stories: 1
- Requirements: 1-4
- Interview Ledger: L1

## Blocked by

None — ready to start
