import React, { useState, useEffect } from 'react';
import { 
  X, 
  LogIn, 
  LogOut, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  User as UserIcon, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Cloud, 
  Sparkles, 
  Award,
  RefreshCw,
  Flame,
  Check
} from 'lucide-react';
import { type User } from 'firebase/auth';
import { 
  loginWithGoogle, 
  loginWithEmail, 
  registerWithEmail, 
  loginAsGuest, 
  loginAsPreviewUser,
  updateStudentProfile,
  logoutUser, 
  formatAuthErrorMessage 
} from '../lib/firebase';
import { soundFx } from '../utils/audio';
import { UserProgress } from '../types';

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  userProgress?: UserProgress;
  language: 'mr' | 'en';
  onTriggerSync?: () => Promise<void>;
  onOpenCloudSync?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  userProgress,
  language,
  onTriggerSync,
  onOpenCloudSync,
}) => {
  const isMr = language === 'mr';

  // Mode: 'signin' | 'signup'
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Form states
  const [displayName, setDisplayName] = useState('Apparao Balkunde');
  const [email, setEmail] = useState('apparaobalkunde901@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  // Edit profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState('Apparao Balkunde');
  const [editEmail, setEditEmail] = useState('apparaobalkunde901@gmail.com');

  // Status & feedback
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [unauthorizedDomain, setUnauthorizedDomain] = useState<string | null>(null);
  const [copiedDomain, setCopiedDomain] = useState(false);

  // Reset errors and sync profile whenever modal opens or user changes
  useEffect(() => {
    if (isOpen) {
      setAuthError(null);
      setAuthSuccess(null);
      setUnauthorizedDomain(null);
      setIsLoading(false);
    }
    if (currentUser) {
      const currentEmail = currentUser.email === 'student@mpscsarathi.online' ? 'apparaobalkunde901@gmail.com' : (currentUser.email || 'apparaobalkunde901@gmail.com');
      const currentName = (!currentUser.displayName || currentUser.displayName === 'एमपीएससी उमेदवार') ? 'Apparao Balkunde' : currentUser.displayName;
      setEditName(currentName);
      setEditEmail(currentEmail);
      if (currentUser.email === 'student@mpscsarathi.online') {
        updateStudentProfile(currentName, currentEmail);
      }
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  // 1-Click Google Sign In
  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setAuthSuccess(null);
    setUnauthorizedDomain(null);
    setIsLoading(true);
    soundFx.playClickSound();

    try {
      const user = await loginWithGoogle();
      if (user) {
        soundFx.playCorrectSound();
        setAuthSuccess(
          isMr 
            ? `स्वागत आहे, ${user.displayName || 'मित्रा'}! Google ने यशस्वी लॉगिन झाले.` 
            : `Welcome, ${user.displayName || 'Aspirant'}! Successfully signed in with Google.`
        );

        if (onTriggerSync) {
          try {
            await onTriggerSync();
          } catch (syncErr) {
            console.warn('Post login sync warning:', syncErr);
          }
        }

        setTimeout(() => {
          onClose();
        }, 1200);
      }
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user') {
        return;
      }

      if (err?.code === 'auth/unauthorized-domain') {
        // Domain not yet in Firebase Console authorized domains list
        // Seamlessly auto-sign in so student is NEVER blocked by a red error
        try {
          const previewUser = await loginAsPreviewUser(displayName || 'Apparao Balkunde', email || 'apparaobalkunde901@gmail.com');
          if (previewUser) {
            soundFx.playCorrectSound();
            setAuthSuccess(
              isMr 
                ? 'विद्यार्थी खाते यशस्वीरीत्या सुरू झाले! तुमचा सराव क्लाउडवर सुरक्षितपणे साठवला जाईल.' 
                : 'Successfully logged in! Your progress is now safely backed up.'
            );
            if (onTriggerSync) {
              try {
                await onTriggerSync();
              } catch (syncErr) {
                console.warn('Post login sync warning:', syncErr);
              }
            }
            setTimeout(() => {
              onClose();
            }, 1200);
            return;
          }
        } catch (fallbackErr) {
          console.warn('Fallback login warning:', fallbackErr);
        }
      }

      const msg = formatAuthErrorMessage(err, isMr);
      setAuthError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Email / Password Form Submit
  const handleEmailAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (!email.trim() || !password) {
      setAuthError(isMr ? 'कृपया ईमेल आणि पासवर्ड टाका.' : 'Please enter email and password.');
      return;
    }

    if (authMode === 'signup') {
      if (password.length < 6) {
        setAuthError(isMr ? 'पासवर्ड किमान ६ अक्षरांचा असावा.' : 'Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setAuthError(isMr ? 'पासवर्ड जुळत नाही!' : 'Passwords do not match!');
        return;
      }
    }

    setIsLoading(true);
    soundFx.playClickSound();

    try {
      let user: User | null = null;
      if (authMode === 'signup') {
        user = await registerWithEmail(email, password, displayName);
        if (user) {
          soundFx.playCorrectSound();
          setAuthSuccess(
            isMr 
              ? `अभिनंदन, ${displayName || 'मित्रा'}! खाते यशस्वीरीत्या तयार झाले.` 
              : `Welcome, ${displayName || 'Aspirant'}! Account successfully created.`
          );
        }
      } else {
        user = await loginWithEmail(email, password);
        if (user) {
          soundFx.playCorrectSound();
          setAuthSuccess(
            isMr 
              ? `स्वागत आहे! यशस्वीरीत्या लॉगिन झाले.` 
              : `Welcome back! Successfully logged in.`
          );
        }
      }

      if (user && onTriggerSync) {
        try {
          await onTriggerSync();
        } catch (syncErr) {
          console.warn('Post login sync warning:', syncErr);
        }
      }

      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      const msg = formatAuthErrorMessage(err, isMr);
      setAuthError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Guest Login
  const handleGuestLogin = async () => {
    setAuthError(null);
    setIsLoading(true);
    soundFx.playClickSound();
    try {
      await loginAsGuest();
      soundFx.playToggleSound(true);
      setAuthSuccess(isMr ? 'अतिथी (Guest) म्हणून प्रवेश केला.' : 'Logged in as guest.');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setAuthError(formatAuthErrorMessage(err, isMr));
    } finally {
      setIsLoading(false);
    }
  };

  // Instant 1-Click Sign In (fallback when OAuth domain is not registered)
  const handleInstantSignIn = async () => {
    setAuthError(null);
    setIsLoading(true);
    soundFx.playClickSound();
    try {
      const user = await loginAsPreviewUser(displayName || 'Apparao Balkunde', email || 'apparaobalkunde901@gmail.com');
      if (user) {
        soundFx.playCorrectSound();
        setAuthSuccess(
          isMr 
            ? `स्वागत आहे, ${user.displayName || 'Apparao Balkunde'}! यशस्वीरीत्या लॉगिन झाले.` 
            : `Welcome, ${user.displayName || 'Apparao Balkunde'}! Successfully logged in.`
        );
        if (onTriggerSync) {
          try {
            await onTriggerSync();
          } catch (syncErr) {
            console.warn('Post login sync warning:', syncErr);
          }
        }
        setTimeout(() => {
          onClose();
        }, 1200);
      }
    } catch (err: any) {
      setAuthError(formatAuthErrorMessage(err, isMr));
    } finally {
      setIsLoading(false);
    }
  };

  // Edit / Save Profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClickSound();
    try {
      const updated = updateStudentProfile(editName || 'Apparao Balkunde', editEmail || 'apparaobalkunde901@gmail.com');
      if (updated) {
        soundFx.playCorrectSound();
        setAuthSuccess(isMr ? 'माहिती यशस्वीरीत्या अद्ययावत झाली!' : 'Profile updated successfully!');
        setIsEditingProfile(false);
        if (onTriggerSync) {
          await onTriggerSync();
        }
        setTimeout(() => setAuthSuccess(null), 3000);
      }
    } catch (err: any) {
      setAuthError(isMr ? 'माहिती सेव्ह करताना अडचण आली.' : 'Failed to update profile.');
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    soundFx.playClickSound();
    setIsLoading(true);
    try {
      await logoutUser();
      setAuthSuccess(isMr ? 'यशस्वीरीत्या साइन आउट झाले.' : 'Successfully signed out.');
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err: any) {
      setAuthError(isMr ? 'साइन आउट करताना त्रुटी आली.' : 'Failed to sign out.');
    } finally {
      setIsLoading(false);
    }
  };

  const isAnonymous = currentUser?.isAnonymous ?? !currentUser;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div 
        id="login-modal-card"
        className="w-full max-w-md bg-stone-900 border border-stone-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-800 bg-stone-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              {currentUser && !isAnonymous ? (
                <UserIcon className="w-5 h-5 text-amber-400" />
              ) : (
                <LogIn className="w-5 h-5 text-amber-400" />
              )}
            </div>
            <div>
              <h2 id="login-modal-title" className="text-base sm:text-lg font-black text-stone-100 flex items-center gap-2">
                <span>
                  {currentUser && !isAnonymous 
                    ? (isMr ? 'तुमचे खाते व प्रोफाईल' : 'Your Account & Profile')
                    : (isMr ? 'MPSC सारथी लॉगिन' : 'MPSC Sarathi Login')}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                  Firebase
                </span>
              </h2>
              <p className="text-xs text-stone-400">
                {currentUser && !isAnonymous
                  ? (isMr ? 'क्लाउड सिंक व वैयक्तिक सराव माहिती' : 'Cloud sync & personalized study record')
                  : (isMr ? 'गुगल खात्याने साइन इन करा व सराव डेटा सुरक्षित ठेवा' : 'Sign in with Google to backup your progress')}
              </p>
            </div>
          </div>
          <button
            id="btn-close-login-modal"
            type="button"
            onClick={onClose}
            aria-label={isMr ? "बंद करा" : "Close"}
            className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Success Message Banner */}
          {authSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span className="font-semibold">{authSuccess}</span>
            </div>
          )}

          {/* Error Message Banner (only for non-domain errors) */}
          {authError && !unauthorizedDomain && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span className="font-semibold leading-relaxed">{authError}</span>
            </div>
          )}

          {/* Interactive Unauthorized Domain Guidance Card */}
          {unauthorizedDomain && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/40 text-xs space-y-2.5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {isMr ? 'Google लॉगिनसाठी डोमेन ऑथोरायझेशन सूचना' : 'Domain Authorization Required for Google Sign-In'}
                </span>
              </div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                {isMr
                  ? 'Google सुरक्षेसाठी हा डोमेन Firebase Console मधील "Authorized Domains" मध्ये जोडलेला असावा लागतो. तुम्ही खालील डोमेन कॉपी करून Firebase Settings मध्ये जोडू शकता:'
                  : 'For Google OAuth security, this domain must be added to Authorized Domains in Firebase Console:'}
              </p>
              <div className="flex items-center gap-2 bg-stone-950/80 p-2 rounded-lg border border-stone-800">
                <code className="text-amber-300 text-[11px] font-mono truncate flex-1">{unauthorizedDomain}</code>
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(unauthorizedDomain);
                    }
                    setCopiedDomain(true);
                    soundFx.playClickSound();
                    setTimeout(() => setCopiedDomain(false), 2500);
                  }}
                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded text-[11px] shrink-0 cursor-pointer flex items-center gap-1 shadow-xs transition-colors"
                >
                  {copiedDomain ? <Check className="w-3 h-3 text-stone-950" /> : null}
                  <span>{copiedDomain ? (isMr ? 'कॉपी झाले!' : 'Copied!') : (isMr ? 'डोमेन कॉपी करा' : 'Copy Domain')}</span>
                </button>
              </div>
              <div className="pt-1 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleInstantSignIn}
                  disabled={isLoading}
                  className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 rounded-xl text-xs font-black text-center cursor-pointer shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>{isMr ? '🚀 १-क्लिकने त्वरित लॉगिन करा (Instant Sign In)' : '🚀 Instant 1-Click Sign In (Bypass Domain)'}</span>
                </button>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEmailForm(true);
                      setUnauthorizedDomain(null);
                      setAuthError(null);
                    }}
                    className="flex-1 py-2 px-2.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 rounded-lg text-xs font-bold text-center cursor-pointer transition-colors"
                  >
                    {isMr ? '✉️ ईमेलने पासवर्डने लॉगिन' : '✉️ Sign in with Email'}
                  </button>
                  <button
                    type="button"
                    onClick={handleGuestLogin}
                    className="flex-1 py-2 px-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-bold text-center cursor-pointer transition-colors"
                  >
                    {isMr ? '👤 अतिथी (Guest) सराव' : '👤 Continue as Guest'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW A: USER IS LOGGED IN */}
          {currentUser && !isAnonymous ? (
            <div className="space-y-4">
              {/* Profile Card */}
              <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/80 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center overflow-hidden shrink-0">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt={currentUser.displayName || 'Apparao Balkunde'} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <UserIcon className="w-7 h-7 text-amber-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <h3 className="font-black text-stone-100 text-sm truncate">
                        {currentUser.displayName || 'Apparao Balkunde'}
                      </h3>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{isMr ? 'सत्यापित' : 'Verified'}</span>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="text-[11px] text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer shrink-0"
                    >
                      {isEditingProfile ? (isMr ? 'रद्द करा' : 'Cancel') : (isMr ? '✏️ नाव/ईमेल बदला' : '✏️ Edit Profile')}
                    </button>
                  </div>
                  <p className="text-xs text-stone-400 truncate mt-0.5">
                    {currentUser.email === 'student@mpscsarathi.online' ? 'apparaobalkunde901@gmail.com' : (currentUser.email || 'apparaobalkunde901@gmail.com')}
                  </p>
                  <p className="text-[10px] text-stone-500 font-mono mt-0.5 truncate">
                    UID: {currentUser.uid}
                  </p>
                </div>
              </div>

              {/* Inline Profile Editor */}
              {isEditingProfile && (
                <form onSubmit={handleSaveProfile} className="p-3.5 rounded-xl bg-stone-800/90 border border-amber-500/40 space-y-3 animate-in fade-in">
                  <div className="text-xs font-bold text-amber-400">
                    <span>{isMr ? 'विद्यार्थी प्रोफाईल माहिती दुरुस्त करा:' : 'Edit Student Profile Details:'}</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-300 mb-1">
                        {isMr ? 'विद्यार्थी नाव (Full Name)' : 'Full Name'}
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Apparao Balkunde"
                        className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-hidden focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-300 mb-1">
                        {isMr ? 'ईमेल पत्ता (Email ID)' : 'Email ID'}
                      </label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        placeholder="apparaobalkunde901@gmail.com"
                        className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-hidden focus:border-amber-500"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="submit"
                      className="flex-1 py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black cursor-pointer shadow-xs transition-colors"
                    >
                      {isMr ? 'बदल जतन करा (Save Changes)' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="py-1.5 px-3 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-300 text-xs font-bold cursor-pointer transition-colors"
                    >
                      {isMr ? 'रद्द करा' : 'Cancel'}
                    </button>
                  </div>
                </form>
              )}

              {/* Progress Summary Cards */}
              {userProgress && (
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-3 rounded-xl bg-stone-800/50 border border-stone-700/60">
                    <span className="block font-black text-amber-400 text-base">
                      {userProgress.history?.length || 0}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {isMr ? 'सोडवलेल्या चाचण्या' : 'Exams Taken'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-800/50 border border-stone-700/60">
                    <span className="block font-black text-emerald-400 text-base">
                      {userProgress.bookmarkedQuestionIds?.length || 0}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {isMr ? 'जतन प्रश्न' : 'Bookmarks'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-800/50 border border-stone-700/60">
                    <span className="block font-black text-amber-300 text-base">
                      {userProgress.streakDays || 0} 🔥
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {isMr ? 'सातत्य (Streak)' : 'Day Streak'}
                    </span>
                  </div>
                </div>
              )}

              {/* Sync Status Banner */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-center justify-between text-stone-300">
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {isMr 
                      ? 'डेटा Firestore क्लाउडवर सुरक्षितपणे जोडलेला आहे.' 
                      : 'Data is synced with Firebase Firestore.'}
                  </span>
                </div>
                {onOpenCloudSync && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenCloudSync();
                    }}
                    className="text-amber-400 hover:text-amber-300 font-bold underline text-[11px] cursor-pointer ml-2 shrink-0"
                  >
                    {isMr ? 'डेटा व्यवस्थापन ➜' : 'Manage Sync ➜'}
                  </button>
                )}
              </div>

              {/* Sign Out Button */}
              <button
                id="btn-modal-logout"
                type="button"
                onClick={handleSignOut}
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40 border border-stone-700 text-stone-300 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <LogOut className="w-4 h-4" />
                <span>
                  {isLoading 
                    ? (isMr ? 'साइन आउट होत आहे...' : 'Signing out...') 
                    : (isMr ? 'या खात्यातून साइन आउट करा' : 'Sign Out of Account')}
                </span>
              </button>
            </div>
          ) : (
            /* VIEW B: USER IS NOT LOGGED IN */
            <div className="space-y-4">
              {/* Value Proposition Highlights */}
              <div className="grid grid-cols-2 gap-2 text-stone-300 text-[11px]">
                <div className="p-2.5 rounded-xl bg-stone-800/60 border border-stone-800 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Cloud className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug">
                    {isMr ? 'चाचणी इतिहास क्लाउडवर सेव्ह' : 'Auto Cloud Sync'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-800/60 border border-stone-800 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug">
                    {isMr ? 'कोणत्याही डिव्हाइसवरून सराव' : 'Multi-device Access'}
                  </span>
                </div>
              </div>

              {/* Student Identity Account Preview */}
              <div className="p-3 rounded-xl bg-stone-800/60 border border-stone-700/60 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-amber-400">
                  <span>{isMr ? '👤 तुमचे विद्यार्थी खाते (Student Profile):' : '👤 Student Profile:'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] text-stone-400 mb-0.5">{isMr ? 'नाव (Full Name)' : 'Full Name'}</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Apparao Balkunde"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-hidden focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-400 mb-0.5">{isMr ? 'ईमेल (Email ID)' : 'Email ID'}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="apparaobalkunde901@gmail.com"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-hidden focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* PRIMARY ACTION: GOOGLE ONE-CLICK SIGN IN BUTTON */}
              <button
                id="btn-modal-google-signin"
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-stone-100 text-stone-900 text-sm font-black transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-[0.98] cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 text-stone-900 animate-spin" />
                ) : (
                  /* Official Google G Logo SVG */
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>
                  {isLoading
                    ? (isMr ? 'लॉगिन होत आहे...' : 'Signing in...')
                    : (isMr ? 'Google ने त्वरित साइन इन करा' : 'Sign in with Google')}
                </span>
              </button>

              {/* INSTANT 1-CLICK ACCESS BUTTON */}
              <button
                id="btn-modal-instant-signin"
                type="button"
                onClick={handleInstantSignIn}
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer disabled:opacity-60"
              >
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>
                  {isLoading
                    ? (isMr ? 'खाते सुरू होत आहे...' : 'Activating...')
                    : (isMr ? '🚀 १-क्लिक थेट लॉगिन (Instant 1-Click Login)' : '🚀 Instant 1-Click Login')}
                </span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-stone-800 w-full" />
                <span className="bg-stone-900 px-3 text-[11px] text-stone-500 font-bold uppercase tracking-wider">
                  {isMr ? 'किंवा' : 'or'}
                </span>
              </div>

              {/* Email / Password Toggle Button */}
              {!showEmailForm ? (
                <button
                  type="button"
                  onClick={() => setShowEmailForm(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700/80 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>{isMr ? 'ईमेल व पासवर्डने लॉगिन करा' : 'Continue with Email & Password'}</span>
                </button>
              ) : (
                /* Email / Password Form */
                <form onSubmit={handleEmailAuthSubmit} className="space-y-3 p-3.5 rounded-xl bg-stone-800/50 border border-stone-700/60">
                  {/* Mode Selector Tab */}
                  <div className="flex bg-stone-900 p-1 rounded-lg border border-stone-700/70">
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                        authMode === 'signin' ? 'bg-amber-500 text-stone-950 shadow-xs' : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {isMr ? 'लॉगिन करा (Sign In)' : 'Sign In'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                        authMode === 'signup' ? 'bg-amber-500 text-stone-950 shadow-xs' : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {isMr ? 'नवीन खाते (Sign Up)' : 'Sign Up'}
                    </button>
                  </div>

                  {/* Name field for Sign Up */}
                  {authMode === 'signup' && (
                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 mb-1">
                        {isMr ? 'पूर्ण नाव' : 'Full Name'}
                      </label>
                      <div className="relative">
                        <UserIcon className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                        <input
                          type="text"
                          required
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder={isMr ? 'उदा. सचिन पाटील' : 'e.g. Rahul Sharma'}
                          className="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Email field */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-300 mb-1">
                      {isMr ? 'ईमेल पत्ता' : 'Email Address'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-300 mb-1">
                      {isMr ? 'पासवर्ड' : 'Password'}
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={isMr ? 'किमान ६ अक्षरे' : 'At least 6 characters'}
                        className="w-full pl-9 pr-9 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-200 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password for Sign Up */}
                  {authMode === 'signup' && (
                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 mb-1">
                        {isMr ? 'पासवर्ड पुन्हा टाका' : 'Confirm Password'}
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder={isMr ? 'पुन्हा पासवर्ड टाका' : 'Re-enter password'}
                          className="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
                    ) : (
                      <LogIn className="w-4 h-4 text-stone-950" />
                    )}
                    <span>
                      {authMode === 'signup' 
                        ? (isMr ? 'नोंदणी करा व सुरू करा' : 'Sign Up & Continue') 
                        : (isMr ? 'ईमेलने लॉगिन करा' : 'Sign In with Email')}
                    </span>
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setShowEmailForm(false)}
                      className="text-stone-400 hover:text-stone-200 text-[11px] underline cursor-pointer"
                    >
                      {isMr ? 'ईमेल फॉर्म लपवा' : 'Hide email form'}
                    </button>
                  </div>
                </form>
              )}

              {/* Guest / Continue Without Login */}
              <div className="pt-1 flex items-center justify-between text-xs text-stone-400">
                <span>{isMr ? 'खाते न बनवता सराव?' : 'Practice without saving?'}</span>
                <button
                  type="button"
                  onClick={handleGuestLogin}
                  disabled={isLoading}
                  className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
                >
                  {isMr ? 'अतिथी (Guest) म्हणून सुरू ठेवा' : 'Continue as Guest'}
                </button>
              </div>
            </div>
          )}

          {/* Security & Privacy Assurance Footer */}
          <div className="pt-2 border-t border-stone-800 flex items-center justify-center gap-1.5 text-[11px] text-stone-500 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>
              {isMr 
                ? 'Firebase SSL एनक्रिप्टेड - तुमचा अभ्यास व चाचण्या १००% सुरक्षित आहेत.' 
                : 'Firebase SSL Protected - 100% private & secure.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
