# Repository audit — 4 November 2026

Source reviewed: `5143df0a5a06b98b661b3983e7a77727dfd1f766` on `release/code-quest-v1`. Changes are proposed on `audit/repository-improvements-2026-11-04`; nothing was merged or deployed.

## Changes

- Detach a new account from a stalled former-account request; an old finalizer cannot clear the new in-flight save.
- Reject impossible imported calendar dates while accepting leap days.
- Release learner-worker blob URLs when previews are cancelled.
- Add a missing mission foreign-key index to fresh-install SQL and a separate reviewed rollout script for existing deployments.
- Add account-race, calendar and worker-cancellation regressions.

## Verification

20 automated behavioral tests passed. All 12 recorded source/test checks passed. Local verification used Node.js 26.12.0 and Python 3.15.0; CI should also confirm the configured deployment versions.

- `node --test tests\cloud.test.js tests\core.test.js tests\preview.test.js tests\validation.test.mjs`
- `node --check for repository JavaScript files`

Local HTML asset references were compared with the complete GitHub file inventory. Real desktop/mobile visual verification was blocked in this environment: the in-app preview could not reach the local server and the desktop browser did not expose a usable window. No claim of browser/device acceptance is made. Automated DOM/canvas simulations, where present, do not replace that check.

## Remaining limits and rollout

- Live read-only inspection confirmed RLS on all cq_* tables, owner-scoped profile/draft/progress policies, and no client execution privilege on the completion RPC. No live data or schema was changed.
- The missing cq_progress(mission_id) index remains a live advisor finding until database/audit-hardening.sql is applied separately.
- Email confirmation/recovery delivery and real-account flows were not exercised. The existing README documents the custom-SMTP prerequisite; this audit did not verify SMTP configuration.
- Learner JavaScript runs in an origin-sharing worker, not a hardened untrusted-code security boundary. Do not run unreviewed imported code while signed in; a dedicated isolated runner origin is recommended before treating this as arbitrary-code hosting.
- Educational pattern checks are not anti-cheat or certification.
