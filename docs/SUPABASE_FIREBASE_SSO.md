# Exam-site SSO integration

## Implemented in this branch

- src/lib/completeExamSSO.ts posts a one-time code to the Main backend, then signs in with signInWithCustomToken.
- src/pages/SSOCallback.tsx removes the code from browser history before exchanging it and redirects to the existing root app after successful sign-in.
- src/main.tsx mounts the callback component at /sso.
- The old Supabase-token-in-URL flow has been removed from src/lib/firebase.ts.
- LocalStorage-shaped fake users no longer count as Firebase-authenticated users.
- firestore.rules restricts profile/results/logs to the authenticated owner and disallows client writes to the global question bank.

## Backend contract

Main site must expose:

- POST https://mpscsarathi.online/api/sso/start — browser sends the Supabase access token only in an Authorization header; backend verifies it and returns a 90-second, single-use code.
- POST https://mpscsarathi.online/api/exchange-token — accepts only { "code": "..." }, atomically consumes the code, and returns a Firebase custom token.

The Main Supabase migration must be applied and server-only SUPABASE_SERVICE_KEY and FIREBASE_SERVICE_ACCOUNT_B64 secrets configured before the flow will work.

## Important compatibility note

The custom token uses the verified Supabase user UUID as Firebase UID. Existing Google-login accounts may have different Firebase UIDs, so existing Firestore progress will not automatically appear under the new UID. Do not switch existing users until an explicit verified migration/merge plan is tested.

## Validation checklist

- [ ] Confirm /sso?code=... is served by the Exam web host.
- [ ] Confirm the callback removes the code before network exchange.
- [ ] Test valid, invalid, expired, replayed, and concurrently submitted codes.
- [ ] Verify Firebase custom token project matches firebase-applet-config.json.
- [ ] Verify Firestore rules are deployed; rules in Git alone do not affect production.
- [ ] Test logout, refresh, two tabs, and user progress access.
- [ ] Ensure all protected server APIs and Firestore data require Firebase authentication.
