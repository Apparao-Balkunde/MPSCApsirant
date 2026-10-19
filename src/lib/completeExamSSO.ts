import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../lib/firebase';

/**
 * Exchanges a one-time Main-site SSO code for a Firebase custom token.
 * The Main backend must atomically consume the code before minting the token.
 */
export async function completeExamSSO(code: string) {
  if (!/^[a-f0-9]{64}$/.test(code)) {
    throw new Error('Invalid SSO code');
  }

  const response = await fetch(
    'https://mpscsarathi.online/api/exchange-token',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
      cache: 'no-store',
      credentials: 'omit',
    }
  );

  if (!response.ok) {
    throw new Error('SSO verification failed');
  }

  const payload: unknown = await response.json();
  const firebaseToken =
    payload && typeof payload === 'object' && 'firebaseToken' in payload
      ? (payload as { firebaseToken?: unknown }).firebaseToken
      : undefined;

  if (typeof firebaseToken !== 'string' || firebaseToken.length < 100) {
    throw new Error('Firebase token missing or invalid');
  }

  const result = await signInWithCustomToken(auth, firebaseToken);
  return result.user;
}
