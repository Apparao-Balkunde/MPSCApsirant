import { initializeApp, getApps, getApp } from 'firebase/app';

import {
  getFirestore,
  doc,
  getDocFromServer,
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
  type User,
} from 'firebase/auth';

import firebaseConfig from '../../firebase-applet-config.json';


// ============================================================
// FIREBASE INITIALIZATION
// ============================================================

const app =
  !getApps().length
    ? initializeApp(firebaseConfig)
    : getApp();


// ============================================================
// FIRESTORE
// ============================================================

export const db =
  firebaseConfig.firestoreDatabaseId &&
  firebaseConfig.firestoreDatabaseId !== '(default)'
    ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
    : getFirestore(app);


// ============================================================
// FIREBASE AUTH
// ============================================================

export const auth = getAuth(app);

export const googleAuthProvider =
  new GoogleAuthProvider();


// ============================================================
// FIRESTORE CONNECTION TEST
// ============================================================

export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(
      doc(db, 'test', 'connection')
    );

    return true;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('the client is offline')
    ) {
      console.warn(
        'Firebase client is offline or connecting...'
      );
    }

    return false;
  }
}


// ============================================================
// LOCAL SESSION FALLBACK
// ============================================================

const LOCAL_USER_KEY =
  'mpsc_local_student_session';

const authListeners =
  new Set<(user: User | null) => void>();


export function getLocalStudentSession(): User | null {
  try {
    const raw =
      typeof window !== 'undefined'
        ? localStorage.getItem(LOCAL_USER_KEY)
        : null;

    if (!raw) {
      return null;
    }

    const user = JSON.parse(raw) as any;

    if (
      user &&
      user.email === 'student@mpscsarathi.online'
    ) {
      user.email =
        'apparaobalkunde901@gmail.com';

      if (
        !user.displayName ||
        user.displayName === 'एमपीएससी उमेदवार'
      ) {
        user.displayName =
          'Apparao Balkunde';
      }

      try {
        localStorage.setItem(
          LOCAL_USER_KEY,
          JSON.stringify(user)
        );
      } catch {}
    }

    return user as User;

  } catch {
    return null;
  }
}


// ============================================================
// AUTH STATE LISTENER
// ============================================================

export function initAuthListener(
  onUserChange: (user: User | null) => void
) {
  authListeners.add(onUserChange);

  const savedLocal =
    getLocalStudentSession();

  if (
    savedLocal &&
    !auth.currentUser
  ) {
    onUserChange(savedLocal);
  }

  const unsubscribe =
    onAuthStateChanged(
      auth,
      (firebaseUser) => {
        onUserChange(
          firebaseUser ||
          getLocalStudentSession() ||
          null
        );
      }
    );

  return () => {
    authListeners.delete(onUserChange);
    unsubscribe();
  };
}


// ============================================================
// GOOGLE LOGIN
// ============================================================

export async function loginWithGoogle() {
  try {
    const result =
      await signInWithPopup(
        auth,
        googleAuthProvider
      );

    return result.user;

  } catch (err: any) {

    if (
      err?.code ===
      'auth/unauthorized-domain'
    ) {
      console.warn(
        `Firebase Auth: Domain "${typeof window !== 'undefined'
          ? window.location.hostname
          : ''
        }" is not authorized.`
      );
    } else {
      console.warn(
        'Google Sign In warning:',
        err?.message || err
      );
    }

    throw err;
  }
}


// ============================================================
// LOGOUT
// ============================================================

export async function logoutUser() {

  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(
        LOCAL_USER_KEY
      );
    }
  } catch {}

  try {
    await signOut(auth);
  } catch (err) {
    console.warn(
      'Sign Out warning:',
      err
    );
  }

  authListeners.forEach(
    (fn) => fn(null)
  );
}


// ============================================================
// EMAIL LOGIN
// ============================================================

export async function loginWithEmail(
  email: string,
  pass: string
) {
  const result =
    await signInWithEmailAndPassword(
      auth,
      email.trim(),
      pass
    );

  return result.user;
}


// ============================================================
// EMAIL REGISTRATION
// ============================================================

export async function registerWithEmail(
  email: string,
  pass: string,
  displayName?: string
) {

  const result =
    await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      pass
    );

  if (
    displayName &&
    result.user
  ) {
    await updateProfile(
      result.user,
      {
        displayName:
          displayName.trim(),
      }
    );
  }

  return result.user;
}


// ============================================================
// GUEST LOGIN
// ============================================================

export async function loginAsGuest() {
  return loginAsPreviewUser(
    'Apparao Balkunde (Guest)',
    'apparaobalkunde901@gmail.com'
  );
}


// ============================================================
// PREVIEW / FALLBACK LOGIN
// ============================================================

export async function loginAsPreviewUser(
  customName?: string,
  customEmail?: string | null
): Promise<User> {

  const name =
    customName?.trim() ||
    'Apparao Balkunde';

  const email =
    customEmail?.trim() ||
    'apparaobalkunde901@gmail.com';

  try {

    const result =
      await signInAnonymously(auth);

    if (result.user) {

      await updateProfile(
        result.user,
        {
          displayName: name,
        }
      );

      return result.user;
    }

  } catch (err: any) {

    console.warn(
      'Firebase Anonymous auth fallback active:',
      err?.code ||
      err?.message
    );
  }


  let existingUid = '';

  try {

    const existing =
      getLocalStudentSession();

    if (existing?.uid) {
      existingUid = existing.uid;
    }

  } catch {}


  const uid =
    existingUid ||
    'user_' +
      Math.random()
        .toString(36)
        .substring(2, 12);


  const studentUser = {
    uid,
    displayName: name,
    email,
    photoURL: null,
    isAnonymous: false,
    emailVerified: true,
  } as unknown as User;


  try {

    if (
      typeof window !== 'undefined'
    ) {
      localStorage.setItem(
        LOCAL_USER_KEY,
        JSON.stringify(studentUser)
      );
    }

  } catch (e) {

    console.warn(
      'Storage warning:',
      e
    );
  }


  authListeners.forEach(
    (fn) => fn(studentUser)
  );

  return studentUser;
}


// ============================================================
// UPDATE STUDENT PROFILE
// ============================================================

export function updateStudentProfile(
  displayName?: string,
  email?: string | null,
  photoURL?: string | null
): User {

  const existing =
    getLocalStudentSession();

  const uid =
    existing?.uid ||
    'user_' +
      Math.random()
        .toString(36)
        .substring(2, 12);


  const updatedUser = {
    ...(existing || {}),
    uid,

    displayName:
      displayName?.trim() ||
      'Apparao Balkunde',

    email:
      email?.trim() ||
      'apparaobalkunde901@gmail.com',

    photoURL:
      photoURL !== undefined
        ? photoURL
        : (existing?.photoURL || null),

    isAnonymous: false,
    emailVerified: true,

  } as unknown as User;


  try {

    if (
      typeof window !== 'undefined'
    ) {
      localStorage.setItem(
        LOCAL_USER_KEY,
        JSON.stringify(updatedUser)
      );
    }

  } catch (e) {

    console.warn(
      'Storage warning:',
      e
    );
  }


  authListeners.forEach(
    (fn) => fn(updatedUser)
  );

  return updatedUser;
}


// ============================================================
// AUTH ERROR MESSAGE
// ============================================================

export function formatAuthErrorMessage(
  err: any,
  isMarathi: boolean
): string {

  const code =
    err?.code || '';

  switch (code) {

    case 'auth/unauthorized-domain': {

      const host =
        typeof window !== 'undefined'
          ? window.location.hostname
          : '';

      return isMarathi
        ? `हा डोमेन (${host}) Firebase मध्ये अधिकृत केलेला नाही. Firebase Console → Authentication → Settings → Authorized Domains मध्ये डोमेन जोडा.`
        : `This domain (${host}) is not in Firebase Authorized Domains. Add it in Firebase Console → Authentication → Settings → Authorized Domains.`;
    }


    case 'auth/user-not-found':

      return isMarathi
        ? 'या ईमेल पत्त्याचे खाते सापडले नाही. कृपया नवीन नोंदणी करा.'
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
        ? 'Google लॉगिन विंडो बंद झाली.'
        : 'Google sign-in popup was closed before completion.';


    case 'auth/operation-not-allowed':

      return isMarathi
        ? 'हा लॉगिन प्रकार Firebase Console मध्ये सक्षम केलेला नाही.'
        : 'This sign-in method is not enabled in Firebase Console.';


    case 'auth/network-request-failed':

      return isMarathi
        ? 'इंटरनेट कनेक्शनमध्ये समस्या आली.'
        : 'Network connection error.';


    default:

      return (
        err?.message ||
        (
          isMarathi
            ? 'लॉगिन करताना अनपेक्षित समस्या आली.'
            : 'Authentication error occurred.'
        )
      );
  }
}


// ============================================================
// SUPABASE → FIREBASE SSO
// ============================================================

/**
 * SSO FLOW
 *
 * mpscsarathi.online
 *        ↓
 * Supabase access token
 *        ↓
 * exam.mpscsarathi.online/?token=...
 *        ↓
 * POST https://mpscsarathi.online/api/exchange-token
 *        ↓
 * Supabase token verification
 *        ↓
 * Firebase Admin createCustomToken()
 *        ↓
 * Firebase custom token
 *        ↓
 * signInWithCustomToken()
 *
 * Firebase service-account credentials NEVER come
 * to the browser.
 */

export async function trySsoLogin(): Promise<User | null> {

  if (
    typeof window === 'undefined'
  ) {
    return null;
  }


  // ----------------------------------------------------------
  // Read token from URL
  // ----------------------------------------------------------

  const params =
    new URLSearchParams(
      window.location.search
    );

  const supabaseToken =
    params.get('token');


  if (!supabaseToken) {
    return null;
  }


  try {

    console.log(
      '[SSO] Supabase token received.'
    );


    // --------------------------------------------------------
    // Exchange Supabase token for Firebase custom token
    // --------------------------------------------------------

    const response =
      await fetch(
        'https://mpscsarathi.online/api/exchange-token',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            supabaseToken,
          }),
        }
      );


    if (!response.ok) {

      const errorText =
        await response
          .text()
          .catch(() => '');

      console.error(
        '[SSO] Token exchange failed:',
        response.status,
        errorText
      );

      return null;
    }


    // --------------------------------------------------------
    // Read Firebase custom token
    // --------------------------------------------------------

    const payload =
      await response.json();


    const firebaseToken =
      typeof payload?.firebaseToken === 'string'
        ? payload.firebaseToken
        : '';


    if (!firebaseToken) {

      console.error(
        '[SSO] Firebase token missing from response.'
      );

      return null;
    }


    console.log(
      '[SSO] Firebase custom token received.'
    );


    // --------------------------------------------------------
    // Firebase login
    // --------------------------------------------------------

    const result =
      await signInWithCustomToken(
        auth,
        firebaseToken
      );


    console.log(
      '[SSO] Firebase login successful:',
      result.user.uid
    );


    // --------------------------------------------------------
    // Remove Supabase token from browser URL
    // --------------------------------------------------------

    params.delete('token');

    const cleanQuery =
      params.toString();

    const cleanUrl =
      window.location.pathname +
      (cleanQuery
        ? `?${cleanQuery}`
        : '') +
      window.location.hash;


    window.history.replaceState(
      {},
      document.title,
      cleanUrl
    );


    return result.user;


  } catch (error) {

    console.error(
      '[SSO] Login failed:',
      error
    );

    return null;
  }
}
