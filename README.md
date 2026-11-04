# TOV4R Code Quest

A game-based learning academy by **Mehdi Hmaiss** for HTML, CSS and JavaScript.

**[Open the academy](https://itztov4r.github.io/TOV4R-Code-Quest/)** · [Source](https://github.com/itztov4r/TOV4R-Code-Quest)

## Learn by building

- 30 French missions across three illustrated worlds: short lessons, quizzes, code challenges and a final boss per track.
- Starting-level onboarding, daily goals, avatars, XP, stars, badges and mission unlocks.
- Personal dashboard with actual seven-day activity and per-track progress.
- Email/password accounts with Supabase Auth, confirmation emails and password recovery.
- Private cloud profiles, saved drafts and server-recorded mission completions; resume on another device by signing into the same account.
- Clear save status, manual sync, offline draft queue and retried completion attempts. Pending completions earn XP after server acceptance.
- Local demo, JSON export and explicit import. Imported completions are checked again and earn one star; existing cloud completions are preserved.
- Isolated HTML/CSS previews and a JavaScript fundamentals console using a Worker with a two-second limit.

## Run locally

Serve this directory with a static server. The frontend uses a vendored, pinned `@supabase/supabase-js@2.118.0` UMD build; no build step is required.

```sh
python -m http.server 8000
node --test tests/*.test.*
```

`npm ci` is only needed to reproduce the vendored SDK. Its MIT license is included in `vendor/`.

## Cloud architecture

`config.js` contains the Supabase project URL and **publishable key only**. Authentication tokens are handled by the official SDK. Service credentials remain in the Edge Function runtime.

- `database/schema.sql`: additive `cq_*` schema, mission catalog, own-user row-level policies, private statistics view and restricted completion RPC.
- `supabase/functions/codequest-complete/`: checks the bearer identity, quiz and code requirements, derives stars and records completions using the restricted RPC.
- `cloud.js`: account-scoped storage, dirty-field synchronization, offline queues and cloud imports.
- `tests/`: curriculum, execution, state, server validation and cloud isolation tests.
- `database/verify-rls.sql`: transaction-only isolation/replay checks; all fixtures are rolled back.

XP comes from the database catalog and a unique `(user_id, mission_id)` completion. Replays retain the best stars and original completion date. Client roles cannot write progress directly or call the recording RPC. Existing unrelated application tables are untouched.

Code checks are educational pattern checks, not a secure code-grading or anti-cheat system. Server code is never executed from learner input. Avoid using these scores as a formal certification.

## Auth URL configuration

In Supabase **Authentication → URL Configuration**, allow:

```
https://itztov4r.github.io/TOV4R-Code-Quest/
```

Keep email confirmation enabled. The app supplies this URL for confirmation and recovery links. The live Site URL and exact redirect allow-list entry were saved and verified in the dashboard on 4 November 2026. Add any chosen local development URL separately if testing those flows locally. Use your own Supabase project and apply the schema/function if forking; do not reuse this deployment's project for another application.

## Email delivery prerequisite

Custom SMTP is currently **not configured** on the live Supabase project. Its built-in sender only accepts the organization team’s email addresses, so public email signup and recovery must not be described as production-ready. Connect an SMTP provider with an authorized sender before opening signup to everyone. Keep email confirmation enabled. See [Supabase SMTP documentation](https://supabase.com/docs/guides/auth/auth-smtp).

## Verification

20 automated tests pass in this audit, including account-switch races, calendar validation and worker cancellation. Read-only live checks confirmed own-user policies, RLS, and restricted completion execution privileges. This audit did not repeat the historical fixture writes or real email flows. The shared project advisors report disabled leaked-password protection and a missing mission foreign-key index; see [AUDIT.md](AUDIT.md) for exact scope, remaining runner isolation limits and rollout instructions.

Signup, confirmation delivery and password recovery still require end-to-end verification with a configured SMTP provider and a real user-controlled account.

## Deployment

GitHub Pages publishes the repository root of `release/code-quest-v1`, the default branch. Keep source changes on this publishing branch. Assets are original illustrations created for the project.

MIT licensed. Author: Mehdi Hmaiss.

