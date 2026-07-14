# Authentication, Authorization & Snowflake RLS

Internal tool for high-level executives. Threat model in one line: **no data
row may reach a browser whose signed-in user isn't entitled to it**, and the
SPA itself must be assumed fully readable by anyone who can load it.

## Auth modes (`AUTH_MODE`)

| Mode | What it is | When |
|---|---|---|
| `dev` | No login; a configurable local user (`DEV_USER_*`) is injected on every request. | Local development only. |
| `entra` | Trusts Azure App Service **EasyAuth** headers (`X-MS-CLIENT-PRINCIPAL`). The platform does the OAuth dance before traffic reaches the app. | When deployed behind App Service / Container Apps built-in auth. |
| `entra_oidc` | Self-hosted **authorization-code flow + PKCE** against Entra ID (BFF pattern), implemented in `app/modules/auth/oidc.py`. | Anywhere else (or when we want full control of the session). |

All three modes converge on the same `CurrentUser` model
(`id`, `email`, `name`, `roles[]`, `towers[]`), so nothing downstream cares
which mode is active.

## The BFF login flow (`entra_oidc`)

```
Browser                    FastAPI                        Entra ID
   │  GET /api/auth/login     │                              │
   │─────────────────────────>│  MSAL builds auth URL        │
   │   302 + flow cookie      │  (state + PKCE verifier      │
   │<─────────────────────────│   signed into jbs_auth_flow) │
   │  user signs in, MFA, conditional access …               │
   │────────────────────────────────────────────────────────>│
   │        302 to /api/auth/callback?code=…                 │
   │─────────────────────────>│  MSAL exchanges code         │
   │                          │─────────────────────────────>│
   │                          │   id_token (claims: oid,     │
   │                          │   name, preferred_username,  │
   │                          │   roles)                     │
   │  302 to SPA + jbs_session cookie (signed, httpOnly)     │
   │<─────────────────────────│                              │
```

Key properties:

- **No tokens in the browser.** The SPA never sees an access token, refresh
  token, or id_token — only a signed httpOnly `jbs_session` cookie. XSS in the
  SPA cannot exfiltrate credentials, only ride the session while the tab is
  open (mitigated by `SameSite=Lax`, short max-age, HTTPS-only in prod).
- **Stateless session.** The cookie payload is the identity claims signed with
  `SESSION_SECRET` (itsdangerous). Rotating the secret invalidates all
  sessions. If per-user revocation is ever needed, swap the payload for a
  session id stored in Postgres — the seam is `auth/session.py`.
- **Roles come from Entra App Roles.** The app registration defines roles
  (`admin`, `live.user`, `plant.user`, `sales.user`); IT assigns them to users
  or security groups. They arrive in the `roles` claim in all auth modes, and
  `towers.registry.towers_for_roles()` maps them to tower grants per request —
  so role changes in Entra apply on the next request, not the next login.

### Entra app registration checklist

1. New app registration, single tenant. Platform: **Web** (not SPA — the
   backend is a confidential client), redirect URI
   `https://<host>/api/auth/callback`.
2. Client secret (or certificate) → `ENTRA_CLIENT_SECRET`.
3. App Roles: `admin`, `live.user`, `plant.user`, `sales.user`; assign via
   Entra groups. Consider "User assignment required = Yes" so only assigned
   executives can even complete a login.
4. Env: `AUTH_MODE=entra_oidc`, `ENTRA_TENANT_ID`, `ENTRA_CLIENT_ID`,
   `ENTRA_CLIENT_SECRET`, `ENTRA_REDIRECT_URI`, `SESSION_SECRET` (long random),
   `SESSION_COOKIE_SECURE=true`, `FRONTEND_BASE_URL`.

## Enforcing login

- **Backend is the boundary.** Every data-bearing route depends on
  `require_user` (401 without identity); tower routes additionally use
  `tower_access(tower_id)` (403 without the grant).
- **Frontend guard** (`routes/__root.tsx` `beforeLoad`) resolves `/api/me`
  before rendering anything except `/login`, redirecting to `/login?redirect=…`
  on 401. A `QueryCache` error handler catches mid-session expiry the same way.
- **The SPA is not a secret.** It's a bundle any employee can download;
  minification is obfuscation, not protection. We accept that the app's
  *structure* (routes, tower names, component code) is visible and instead
  guarantee no *data* is reachable without a session + grant. The nav also
  hides towers the user can't enter, but that's UX honesty, not security.

## Snowflake access & row-level security

Executives have different scopes (a sales exec shouldn't see plant cost rows,
a regional lead shouldn't see other regions). The design puts enforcement in
Snowflake, not in app code:

```
SPA ── POST /api/data/query ──> FastAPI ──> Snowflake
        (session cookie)          │
                                  ├─ 1. require_user (401)
                                  ├─ 2. assert_read_only(sql) (400)
                                  ├─ 3. snowflake_role_for(user) (403 if unmapped)
                                  └─ 4. run under that role + QUERY_TAG={user}
                                          │
                                          └─ Snowflake grants (SELECT-only)
                                             + row access policies decide rows
```

### Phase 1 (now): service connection + per-role RLS

- One service user connects to Snowflake; each app role maps to a **read-only
  functional role** via `SNOWFLAKE_ROLE_MAP` (e.g. `sales.user → CT_SALES_R`).
  The query runs under `USE ROLE <mapped role>`; the service user is granted
  only these `CT_*_R` roles and nothing else.
- **Row access policies** on shared tables key off `CURRENT_ROLE()`, e.g.:

  ```sql
  CREATE ROW ACCESS POLICY marts.sales_scope AS (region STRING)
  RETURNS BOOLEAN ->
    CURRENT_ROLE() = 'CT_ADMIN_R'
    OR (CURRENT_ROLE() = 'CT_SALES_R' AND region IN
        (SELECT region FROM marts.role_region_map
         WHERE role_name = CURRENT_ROLE()));
  ALTER TABLE marts.fct_sales_orders ADD ROW ACCESS POLICY marts.sales_scope ON (customer_region);
  ```

- Every query carries `QUERY_TAG = {"app":"jbs-ai","user":<email>}` so
  Snowflake `QUERY_HISTORY` remains auditable **per executive** even though
  the connection is shared.
- Granularity is per-role, not per-person. Fine for tower-level scoping; for
  person-level scoping use an entitlement table keyed on the user identity
  passed as a session variable *set by the app only* (the SQL guard blocks
  user-supplied `SET`), or move to phase 2.

### Phase 2 (target): Entra External OAuth passthrough

Configure a Snowflake **External OAuth security integration** trusting our
Entra tenant. The backend requests a Snowflake-scoped access token for the
signed-in user (on-behalf-of flow) and opens the connection *as that user*.
Then `CURRENT_USER()` in Snowflake is the actual executive:

- Row access policies key off the person (or their Entra-synced groups), with
  zero trust in app code.
- Snowflake-native auditing per user, no shared credentials, and RLS holds
  even if someone reaches Snowflake through another tool.

The application seam is already in place: `data/service.run_query()` is the
single choke point where the per-user connection would replace the role
switch. Nothing else changes.

### Defense in depth on the query route

`POST /api/data/query` additionally rejects, before Snowflake is reached:
multi-statement SQL, any leading keyword other than
`SELECT/WITH/SHOW/DESCRIBE/EXPLAIN`, and mutation/session keywords
(`INSERT…`, `USE`, `SET`, …) outside string literals — see
`app/modules/data/guard.py`. This is not the security boundary (Snowflake
grants are); it exists so an app bug or a prompt-injected agent can't turn
the endpoint into a write path or tamper with the RLS session context.

## What the frontend may leak, and what it may not

| Surface | Exposure | Stance |
|---|---|---|
| JS bundle (routes, components, tower names) | Public to anyone who can load the app | Accepted; minified only. Never embed secrets, API keys, or data in the bundle. |
| `/api/*` responses | Session + grant gated | The boundary. 401/403 enforced server-side per route. |
| Nav / tower cards | Filtered by `user.towers` | UX, not security — mirrors the backend check. |
| React Query cache | Cleared on sign-out (`queryClient.clear()`) | Prevents cross-user bleed on shared machines. |
| Cookies | `httpOnly`, `SameSite=Lax`, `Secure` in prod | JS can't read them at all. |
