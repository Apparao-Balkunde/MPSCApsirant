import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDocFromServer
} from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or connecting...');
    }
    return false;
  }
}

const LOCAL_USER_KEY = 'mpsc_local_student_session';
const authListeners = new Set<(user: User | null) => void>();

export function getLocalStudentSession(): User | null {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_USER_KEY) : null;
    if (!raw) return null;
    const user = JSON.parse(raw) as any;
    if (user && (user.displayName === 'Apparao Balkunde (Guest)' || (user.displayName === 'Apparao Balkunde' && user.email === 'apparaobalkunde901@gmail.com'))) {
      user.displayName = 'Guest User';
      user.email = null;
      try { localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user)); } catch {}
    }
    return user as User;
  } catch {
    return null;
  }
}

export function initAuthListener(onUserChange: (user: User | null) => void) {
  authListeners.add(onUserChange);
  const savedLocal = getLocalStudentSession();
  if (savedLocal && !auth.currentUser) onUserChange(savedLocal);

  const unsub = onAuthStateChanged(auth, (firebaseUser) => {
    onUserChange(firebaseUser || getLocalStudentSession() || null);
  });

  return () => {
    authListeners.delete(onUserChange);
    unsub();
  };
}

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    return result.user;
  } catch (err: any) {
    if (err?.code === 'auth/unauthorized-domain') {
      console.warn(`Firebase Auth: Domain "${typeof window !== 'undefined' ? window.location.hostname : ''}" is not authorized.`);
    } else {
      console.warn('Google Sign In warning:', err?.message || err);
    }
    throw err;
  }
}

export async function logoutUser() {
  try { if (typeof window !== 'undefined') localStorage.removeItem(LOCAL_USER_KEY); } catch {}
  try { await signOut(auth); } catch (err) { console.warn('Sign Out warning:', err); }
  authListeners.forEach((fn) => fn(null));
}

export async function loginWithEmail(email: string, pass: string) {
  const result = await signInWithEmailAndPassword(auth, email.trim(), pass);
  return result.user;
}

export async function registerWithEmail(email: string, pass: string, displayName?: string) {
  const result = await createUserWithEmailAndPassword(auth, email.trim(), pass);
  if (displayName && result.user) await updateProfile(result.user, { displayName: displayName.trim() });
  return result.user;
}

export async function loginAsGuest() {
  return loginAsPreviewUser('Guest User', null);
}

export async function loginAsPreviewUser(customName?: string, customEmail?: string | null): Promise<User> {
  const name = customName?.trim() || 'Guest User';
  const email = customEmail !== undefined ? (customEmail ? customEmail.trim() : null) : null;
  try {
    const result = await signInAnonymously(auth);
    if (result.user) {
      await updateProfile(result.user, { displayName: name });
      return result.user;
    }
  } catch (err: any) {
    console.warn('Firebase Anonymous auth fallback active:', err?.code || err?.message);
  }

  let existingUid = '';
  try {
    const existing = getLocalStudentSession();
    if (existing?.uid) existingUid = existing.uid;
  } catch {}

  const uid = existingUid || ('user_' + Math.random().toString(36).substring(2, 12));
  const studentUser = {
    uid, displayName: name, email, photoURL: null,
    isAnonymous: false, emailVerified: true,
  } as unknown as User;

  try { if (typeof window !== 'undefined') localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(studentUser)); } catch (e) {
    console.warn('Storage warning:', e);
  }
  authListeners.forEach((fn) => fn(studentUser));
  return studentUser;
}

export function updateStudentProfile(displayName?: string, email?: string | null, photoURL?: string | null): User {
  const existing = getLocalStudentSession();
  const uid = existing?.uid || ('user_' + Math.random().toString(36).substring(2, 12));
  const updatedUser = {
    ...(existing || {}), uid,
    displayName: displayName?.trim() || existing?.displayName || 'Guest User',
    email: email !== undefined ? (email ? email.trim() : null) : (existing?.email || null),
    photoURL: photoURL !== undefined ? photoURL : (existing?.photoURL || null),
    isAnonymous: false, emailVerified: true,
  } as unknown as User;
  try { if (typeof window !== 'undefined') localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updatedUser)); } catch (e) {
    console.warn('Storage warning:', e);
  }
  authListeners.forEach((fn) => fn(updatedUser));
  return updatedUser;
}

export function formatAuthErrorMessage(err: any, isMarathi: boolean): string {
  const code = err?.code || '';
  switch (code) {
    case 'auth/unauthorized-domain': {
      const host = typeof window !== 'undefined' ? window.location.hostname : '';
      return isMarathi
        ? `हा डोमेन (${host}) Firebase मध्ये अधिकृत (Authorized) केलेला नाही. Firebase Console -> Authentication -> Settings -> Authorized Domains मध्ये डोमेन जोडा.`
        : `This domain (${host}) is not in Firebase Authorized Domains. Add it in Firebase Console -> Authentication -> Settings -> Authorized Domains.`;
    }
    case 'auth/user-not-found': return isMarathi ? 'या ईमेल पत्त्याचे खाते सापडले नाही. कृपया नवीन नोंदणी करा.' : 'No account found with this email. Please sign up first.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential': return isMarathi ? 'पासवर्ड चुकीचा आहे किंवा खात्याची माहिती बरोबर नाही.' : 'Incorrect password or invalid credentials.';
    case 'auth/email-already-in-use': return isMarathi ? 'हा ईमेल आधीच नोंदणीकृत आहे. कृपया लॉगिन करा.' : 'This email is already in use. Please sign in instead.';
    case 'auth/invalid-email': return isMarathi ? 'अवैध ईमेल पत्ता. कृपया योग्य ईमेल टाका.' : 'Invalid email address format.';
    case 'auth/weak-password': return isMarathi ? 'पासवर्ड खूप सोपा आहे (किमान ६ अक्षरे असावीत).' : 'Password is too weak. Please use at least 6 characters.';
    case 'auth/popup-closed-by-user': return isMarathi ? 'Google लॉगिन विंडो वापरकर्त्याने बंद केली.' : 'Google sign-in popup was closed before completion.';
    case 'auth/operation-not-allowed': return isMarathi ? 'हा लॉगिन प्रकार Firebase Console मध्ये सक्षम केलेला नाही.' : 'This sign-in method is not enabled in Firebase Console.';
    case 'auth/network-request-failed': return isMarathi ? 'इंटरनेट कनेक्शनमध्ये समस्या आली.' : 'Network connection error.';
    default: return err?.message || (isMarathi ? 'लॉगिन करताना अनपेक्षित समस्या आली.' : 'Authentication error occurred.');
  }
}

// SSO from mpscsarathi.online -> Supabase token -> Firebase custom token.
// The token is exchanged server-side and then removed from the URL immediately.
export async function trySsoLogin(): Promise<User | null> {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  const supabaseToken = params.get('token');
  if (!supabaseToken) return null;

  try {
    const res = await fetch('https://mpscsarathi.online/api/exchange-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ supabaseToken }),
    });

    if (!res.ok) {
      const message = await res.text().catch(() => '');
      console.warn('[SSO] token exchange failed:', res.status, message.slice(0, 200));
      return null;
    }

    const payload = await res.json();
    const firebaseToken = typeof payload?.firebaseToken === 'string' ? payload.firebaseToken : '';
    if (!firebaseToken) {
      console.warn('[SSO] exchange response did not contain firebaseToken');
      return null;
    }

    const result = await signInWithCustomToken(auth, firebaseToken);
    const cleanUrl = window.location.origin + window.location.pathname +
      (params.toString() ? `?${params}` : '') + window.location.hash;
    params.delete('token');
    const finalUrl = window.location.origin + window.location.pathname +
      (params.toString() ? `?${params}` : '') + window.location.hash;
    window.history.replaceState({}, document.title, finalUrl);

    return result.user;
  } catch (err) {
    console.error('[SSO] login failed:', err);
    return null;
  }
}
