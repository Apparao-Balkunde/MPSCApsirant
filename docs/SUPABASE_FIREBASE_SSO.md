# Exam-site SSO integration

This branch adds a callback component and client-side exchange helper. It is **not production-ready until the Main backend endpoint and stable Firebase UID mapping are implemented**.

## Files added

- `src/lib/completeExamSSO.ts`: exchanges a one-time code for a Firebase custom token, then signs in with Firebase Auth.
- `src/pages/SSOCallback.tsx`: callback UI; add `/sso` to the existing router.

## Required server-side contract

The Main site must expose `POST https://mpscsarathi.online/api/exchange-token`. It must atomically consume a short-lived, single-use code created after server-side Supabase token verification. It must map the Supabase user to a stable Firebase UID and mint the custom token with Firebase Admin SDK. Never trust email or UID values submitted by the browser.

## Before enabling the route

1. Confirm the app's actual dashboard route; update `/dashboard` if needed.
2. Add `/sso` to the existing router.
3. Ensure protected UI and APIs require a real Firebase Auth user. Do not treat the `mpsc_local_student_session` localStorage fallback as authenticated.
4. Confirm Firestore rules enforce authentication and per-user ownership.
5. Test expired/reused code rejection, concurrent exchange, refresh, logout, and two-tab behavior.
