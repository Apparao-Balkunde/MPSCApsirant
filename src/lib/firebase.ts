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

const LOCAL_USER_KEY = 'mpsc_local_student_session';
const authListeners = new Set<(user: User | null) => void>();

export function getLocalStudentSession(): User | null {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_USER_KEY) : null;
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

// Initialize Firebase Auth listener
export function initAuthListener(onUserChange: (user: User | null) => void) {
  authListeners.add(onUserChange);

  // If we already have a saved local user session and Firebase is still loading/null:
  const savedLocal = getLocalStudentSession();
  if (savedLocal && !auth.currentUser) {
    onUserChange(savedLocal);
  }

  const unsub = onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      onUserChange(firebaseUser);
    } else {
      const local = getLocalStudentSession();
      onUserChange(local || null);
    }
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
      console.warn(
        `Firebase Auth: Domain "${typeof window !== 'undefined' ? window.location.hostname : ''}" is not authorized in Firebase Console yet.`
      );
    } else {
      console.warn('Google Sign In warning:', err?.message || err);
    }
    throw err;
  }
}

export async function logoutUser() {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_USER_KEY);
    }
  } catch {}
  try {
    await signOut(auth);
  } catch (err) {
    console.warn('Sign Out warning:', err);
  }
  authListeners.forEach((fn) => fn(null));
}

export async function loginWithEmail(email: string, pass: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email.trim(), pass);
    return result.user;
  } catch (err: any) {
    console.warn('Email Sign In warning:', err?.message || err);
    throw err;
  }
}

export async function registerWithEmail(email: string, pass: string, displayName?: string) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email.trim(), pass);
    if (displayName && result.user) {
      await updateProfile(result.user, { displayName: displayName.trim() });
    }
    return result.user;
  } catch (err: any) {
    console.warn('Email Registration warning:', err?.message || err);
    throw err;
  }
}

export async function loginAsGuest() {
  return loginAsPreviewUser('अतिथी उमेदवार (Guest)');
}

export async function loginAsPreviewUser(customName?: string): Promise<User> {
  const name = customName?.trim() || 'एमपीएससी उमेदवार';

  // 1. First try Firebase Anonymous Auth if enabled
  try {
    const result = await signInAnonymously(auth);
    if (result.user) {
      await updateProfile(result.user, { displayName: name });
      return result.user;
    }
  } catch (err: any) {
    console.warn('Firebase Anonymous auth fallback active:', err?.code || err?.message);
  }

  // 2. Guaranteed zero-fail persistent Student Session
  let existingUid = '';
  try {
    const existing = getLocalStudentSession();
    if (existing?.uid) existingUid = existing.uid;
  } catch {}

  const uid = existingUid || ('student_' + Math.random().toString(36).substring(2, 12));
  const studentUser = {
    uid,
    displayName: name,
    email: 'student@mpscsarathi.online',
    photoURL: null,
    isAnonymous: false,
    emailVerified: true,
  } as unknown as User;

  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(studentUser));
    }
  } catch (e) {
    console.warn('Storage warning:', e);
  }

  // Notify listeners immediately
  authListeners.forEach((fn) => fn(studentUser));
  return studentUser;
}

export function formatAuthErrorMessage(err: any, isMarathi: boolean): string {
  const code = err?.code || '';
  switch (code) {
    case 'auth/unauthorized-domain': {
      const host = typeof window !== 'undefined' ? window.location.hostname : '';
      return isMarathi
        ? `हा डोमेन (${host}) Firebase मध्ये अधिकृत (Authorized) केलेला नाही. Google सुरक्षेसाठी हा डोमेन Firebase Console मध्ये समाविष्ट करावा लागतो. तुम्ही खालील 'ईमेल/पासवर्ड' किंवा 'अतिथी' द्वारे त्वरित सराव सुरू करू शकता.`
        : `This domain (${host}) is not in Firebase Authorized Domains list. Please add it in Firebase Console -> Authentication -> Settings -> Authorized Domains, or sign in using Email/Password below.`;
    }
    case 'auth/user-not-found':
      return isMarathi
        ? 'या ईमेल पत्त्याचे खाते सापडले नाही. कृपया नवीन नोंदणी (Sign Up) करा.'
        : 'No account found with this email. Please sign up first.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return isMarathi
        ? 'पासवर्ड चुकीचा आहे किंवा खात्याची माहिती बरोबर नाही.'
        : 'Incorrect password or invalid credentials.';
    case 'auth/email-already-in-use':
      return isMarathi
        ? 'हा ईमेल आधीच नोंदणीकृत आहे. कृपया लॉगिन करा.'
        : 'This email is already in use. Please sign in instead.';
    case 'auth/invalid-email':
      return isMarathi
        ? 'अवैध ईमेल पत्ता. कृपया योग्य ईमेल टाका.'
        : 'Invalid email address format.';
    case 'auth/weak-password':
      return isMarathi
        ? 'पासवर्ड खूप सोपा आहे (किमान ६ अक्षरे असावीत).'
        : 'Password is too weak. Please use at least 6 characters.';
    case 'auth/popup-closed-by-user':
      return isMarathi
        ? 'Google लॉगिन विंडो वापरकर्त्याने बंद केली.'
        : 'Google sign-in popup was closed before completion.';
    case 'auth/operation-not-allowed':
      return isMarathi
        ? 'हा लॉगिन प्रकार Firebase Console मध्ये सक्षम (Enabled) केलेला नाही. कृपया Google लॉगिन वापरा.'
        : 'This sign-in method is not enabled in Firebase Console. Please use Google Login.';
    case 'auth/network-request-failed':
      return isMarathi
        ? 'इंटरनेट कनेक्शनमध्ये समस्या आली. कृपया नेटवर्क तपासा.'
        : 'Network connection error. Please check your internet.';
    default:
      return err?.message || (isMarathi ? 'लॉगिन करताना अनपेक्षित समस्या आली.' : 'Authentication error occurred.');
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
