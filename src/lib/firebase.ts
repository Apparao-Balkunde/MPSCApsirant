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
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific database ID if configured
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

// Test connection to Firestore as required by skill
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

// Initialize Firebase Auth listener
export function initAuthListener(onUserChange: (user: User | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    onUserChange(user || null);
  });
}

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    return result.user;
  } catch (err: any) {
    console.error('Google Sign In error:', err);
    if (err?.code === 'auth/unauthorized-domain') {
      console.warn(
        'Firebase Auth unauthorized-domain: Please add exam.mpscsarathi.online and mpscsarathi.online to Firebase Console -> Authentication -> Settings -> Authorized Domains.'
      );
    }
    throw err;
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (err) {
    console.error('Sign Out error:', err);
  }
}

// 🔴 SSO — mpscsarathi.online वरून ?token=... सोबत उघडलं गेलं असेल तर,
// तो Supabase token backend कडे पाठवून त्याबदल्यात Firebase custom token
// मिळवतो आणि त्याने login करतो. token नसेल किंवा exchange अयशस्वी झालं
// तर काहीही करत नाही — App.tsx आधीसारखं (guest/anonymous) वागू शकतं.
export async function trySsoLogin(): Promise<User | null> {
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
      console.warn('[SSO] token exchange अयशस्वी:', res.status);
      return null;
    }
    const { firebaseToken } = await res.json();
    const result = await signInWithCustomToken(auth, firebaseToken);

    // URL मधून token काढून टाकणे (परत refresh झाल्यावर पुन्हा वापरू नये म्हणून,
    // आणि ब्राउझर history/शेअर लिंकमध्ये token उघडा राहू नये म्हणून)
    params.delete('token');
    const cleanUrl = window.location.pathname + (params.toString() ? `?${params}` : '');
    window.history.replaceState({}, '', cleanUrl);

    return result.user;
  } catch (err) {
    console.error('[SSO] login चूक:', err);
    return null;
  }
}
