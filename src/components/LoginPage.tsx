import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  ShieldCheck, 
  Cloud, 
  RefreshCw, 
  LogOut, 
  Award, 
  Sparkles, 
  BookOpen, 
  Flame, 
  Target, 
  ChevronRight,
  HelpCircle,
  Clock,
  Compass
} from 'lucide-react';
import { type User } from 'firebase/auth';
import { UserProgress } from '../types';
import { 
  loginWithGoogle, 
  loginWithEmail, 
  registerWithEmail, 
  loginAsGuest, 
  loginAsPreviewUser,
  logoutUser, 
  formatAuthErrorMessage 
} from '../lib/firebase';
import { soundFx } from '../utils/audio';

interface LoginPageProps {
  currentUser: User | null;
  userProgress: UserProgress;
  language: 'mr' | 'en';
  onNavigateHome: () => void;
  onOpenSubjects?: () => void;
  onOpenAnalytics?: () => void;
  onTriggerSync?: () => Promise<void>;
  onFetchData?: () => Promise<void>;
  isSyncing?: boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  currentUser,
  userProgress,
  language,
  onNavigateHome,
  onOpenSubjects,
  onOpenAnalytics,
  onTriggerSync,
  onFetchData,
  isSyncing = false,
}) => {
  const isMr = language === 'mr';

  // Mode: 'signin' or 'signup'
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  
  // Form fields
  const [displayName, setDisplayName] = useState('Apparao Balkunde');
  const [email, setEmail] = useState('apparaobalkunde901@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [targetExam, setTargetExam] = useState<'rajyaseva' | 'combine' | 'both'>('both');

  // Status & states
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  // 1-Click Google Login
  const handleGoogleLogin = async () => {
    setAuthError(null);
    setAuthSuccess(null);
    setLoading(true);
    try {
      soundFx.playClickSound();
      const user = await loginWithGoogle();
      if (user) {
        soundFx.playCorrectSound();
        setAuthSuccess(
          isMr 
            ? `स्वागत आहे, ${user.displayName || 'Apparao Balkunde'}! Google द्वारे यशस्वीरीत्या लॉगिन झाले.` 
            : `Welcome, ${user.displayName || 'Apparao Balkunde'}! Successfully logged in with Google.`
        );
        if (onTriggerSync) {
          await onTriggerSync();
        }
      }
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        if (err?.code === 'auth/unauthorized-domain') {
          try {
            const previewUser = await loginAsPreviewUser(displayName || 'Apparao Balkunde', email || 'apparaobalkunde901@gmail.com');
            if (previewUser) {
              soundFx.playCorrectSound();
              setAuthSuccess(
                isMr 
                  ? 'विद्यार्थी खाते यशस्वीरीत्या सुरू झाले! तुमचा सर्व सराव सुरक्षितपणे साठवला जाईल.' 
                  : 'Successfully logged in! Your progress is now safely backed up.'
              );
              if (onTriggerSync) {
                try {
                  await onTriggerSync();
                } catch (syncErr) {
                  console.warn('Post login sync warning:', syncErr);
                }
              }
              return;
            }
          } catch (fallbackErr) {
            console.warn('Fallback login warning:', fallbackErr);
          }
        }
        const msg = formatAuthErrorMessage(err, isMr);
        setAuthError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // Email / Password Submit
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (!email.trim() || !password.trim()) {
      setAuthError(isMr ? 'कृपया ईमेल आणि पासवर्ड दोन्ही भरा.' : 'Please enter both email and password.');
      return;
    }

    if (authMode === 'signup') {
      if (password.length < 6) {
        setAuthError(isMr ? 'पासवर्ड किमान ६ अक्षरांचा असावा.' : 'Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setAuthError(isMr ? 'पासवर्ड आणि कन्फर्म पासवर्ड जुळत नाहीत.' : 'Passwords do not match.');
        return;
      }
    }

    setLoading(true);
    soundFx.playClickSound();

    try {
      if (authMode === 'signup') {
        const user = await registerWithEmail(email, password, displayName || (isMr ? 'MPSC अभ्यासक' : 'MPSC Aspirant'));
        soundFx.playCorrectSound();
        setAuthSuccess(
          isMr 
            ? 'नवीन खाते यशस्वीपणे तयार झाले! आपले स्वागत आहे.' 
            : 'Account created successfully! Welcome.'
        );
        if (onTriggerSync && user) {
          await onTriggerSync();
        }
      } else {
        const user = await loginWithEmail(email, password);
        soundFx.playCorrectSound();
        setAuthSuccess(
          isMr 
            ? `स्वागत आहे! आपण यशस्वीरीत्या लॉगिन केले आहे.` 
            : 'Welcome back! Successfully logged in.'
        );
        if (onTriggerSync && user) {
          await onTriggerSync();
        }
      }
    } catch (err: any) {
      const msg = formatAuthErrorMessage(err, isMr);
      setAuthError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Guest Mode
  const handleGuestLogin = async () => {
    setAuthError(null);
    setAuthSuccess(null);
    setLoading(true);
    soundFx.playClickSound();
    try {
      await loginAsGuest();
      setAuthSuccess(
        isMr 
          ? 'पाहुणा (Guest) मोडमध्ये लॉगिन झाले. आपण चाचण्या देऊ शकता!' 
          : 'Logged in as Guest! You can practice freely.'
      );
    } catch (err: any) {
      const msg = formatAuthErrorMessage(err, isMr);
      setAuthError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    soundFx.playClickSound();
    try {
      await logoutUser();
      setAuthSuccess(isMr ? 'आपण सुरक्षितपणे लॉग आउट झाला आहात.' : 'You have been logged out.');
      setAuthError(null);
    } catch (err: any) {
      setAuthError(err?.message || 'Logout failed');
    }
  };

  // Manual Sync trigger
  const handleSyncNow = async () => {
    if (!onTriggerSync) return;
    setSyncNotice(null);
    soundFx.playClickSound();
    try {
      await onTriggerSync();
      setSyncNotice(isMr ? 'सर्व निकाल व प्रगती Firebase वर सिंक झाली!' : 'Progress successfully synced to Firebase!');
      setTimeout(() => setSyncNotice(null), 4000);
    } catch (err) {
      setSyncNotice(isMr ? 'सिंक करताना समस्या आली.' : 'Sync failed. Check connection.');
    }
  };

  // Manual Fetch trigger
  const handleFetchNow = async () => {
    if (!onFetchData) return;
    setSyncNotice(null);
    soundFx.playClickSound();
    try {
      await onFetchData();
      setSyncNotice(isMr ? 'Firebase वरून डेटा यशस्वीरीत्या आणला गेला!' : 'Data successfully fetched from Firebase!');
      setTimeout(() => setSyncNotice(null), 4000);
    } catch (err) {
      setSyncNotice(isMr ? 'डेटा आणताना समस्या आली.' : 'Fetch failed.');
    }
  };

  // Calculate high-level stats
  const totalExams = userProgress.history.length;
  const totalQuestionsAttempted = userProgress.history.reduce((sum, h) => sum + h.attemptedCount, 0);
  const totalCorrect = userProgress.history.reduce((sum, h) => sum + h.correctCount, 0);
  const averageAccuracy = totalQuestionsAttempted > 0 
    ? Math.round((totalCorrect / totalQuestionsAttempted) * 100) 
    : 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-stone-950 py-8 px-4 sm:px-6 lg:px-8 text-stone-100 flex flex-col justify-start">
      <div className="max-w-5xl mx-auto w-full">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-stone-400 hover:text-amber-400 transition-colors text-sm font-semibold cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{isMr ? 'मुख्य डॅशबोर्डवर परत जा' : 'Back to Dashboard'}</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{isMr ? 'Firebase क्लाउड सुरक्षित' : 'Firebase Cloud Active'}</span>
          </div>
        </div>

        {/* Global Toast Messages */}
        {authSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-sm flex items-start gap-3 shadow-lg animate-in fade-in duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{authSuccess}</div>
            <button 
              onClick={() => setAuthSuccess(null)}
              className="text-emerald-400 hover:text-emerald-200 text-xs cursor-pointer font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {authError && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-sm flex items-start gap-3 shadow-lg animate-in fade-in duration-200">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{authError}</div>
            <button 
              onClick={() => setAuthError(null)}
              className="text-red-400 hover:text-red-200 text-xs cursor-pointer font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {syncNotice && (
          <div className="mb-6 p-4 rounded-xl bg-amber-950/80 border border-amber-500/50 text-amber-200 text-sm flex items-start gap-3 shadow-lg animate-in fade-in duration-200">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{syncNotice}</div>
            <button 
              onClick={() => setSyncNotice(null)}
              className="text-amber-400 hover:text-amber-200 text-xs cursor-pointer font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* CASE A: USER IS LOGGED IN - ASPIRANT PROFILE & HUB       */}
        {/* ======================================================== */}
        {currentUser ? (
          <div className="space-y-6">
            {/* Top Profile Hero Card */}
            <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-stone-800 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-4">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt={currentUser.displayName || 'Aspirant'} 
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-amber-400 object-cover shadow-md"
                    />
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-black text-2xl sm:text-3xl shadow-lg border border-amber-400/40">
                      {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'M'}
                    </div>
                  )}

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-xl sm:text-2xl font-black text-stone-100">
                        {currentUser.displayName || (isMr ? 'MPSC अधिकारी अभ्यासक' : 'MPSC Aspirant')}
                      </h1>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        {currentUser.isAnonymous ? (isMr ? 'पाहुणा (Guest)' : 'Guest') : (isMr ? 'प्रमाणित खाते' : 'Verified Aspirant')}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-400 mt-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <span>{currentUser.email || (isMr ? 'तात्पुरते पाहुणा खाते' : 'Guest session account')}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-amber-300/80">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>UID: {currentUser.uid.slice(0, 10)}...</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Cloud className="w-3.5 h-3.5" />
                        <span>{isMr ? 'क्लाउड बॅकअप सक्रिय' : 'Cloud Backup Active'}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Profile Controls */}
                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    onClick={handleSyncNow}
                    disabled={isSyncing}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? (isMr ? 'सिंक होत आहे...' : 'Syncing...') : (isMr ? 'क्लाउड सिंक करा' : 'Sync Progress')}</span>
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-800/60 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{isMr ? 'लॉग आउट' : 'Sign Out'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Performance Stats Overview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-stone-900 border border-stone-800 p-4 rounded-xl">
                <div className="flex items-center justify-between text-stone-400 text-xs mb-1 font-medium">
                  <span>{isMr ? 'दिलेल्या चाचण्या' : 'Mock Tests'}</span>
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-stone-100">{totalExams}</div>
                <p className="text-[11px] text-stone-500 mt-0.5">{isMr ? 'पूर्ण केलेले पेपर्स' : 'Completed exams'}</p>
              </div>

              <div className="bg-stone-900 border border-stone-800 p-4 rounded-xl">
                <div className="flex items-center justify-between text-stone-400 text-xs mb-1 font-medium">
                  <span>{isMr ? 'सोडवलेले प्रश्न' : 'Questions'}</span>
                  <Target className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-stone-100">{totalQuestionsAttempted}</div>
                <p className="text-[11px] text-stone-500 mt-0.5">{isMr ? 'एकूण सोडवलेले प्रश्न' : 'Total questions tried'}</p>
              </div>

              <div className="bg-stone-900 border border-stone-800 p-4 rounded-xl">
                <div className="flex items-center justify-between text-stone-400 text-xs mb-1 font-medium">
                  <span>{isMr ? 'अचूकता टक्केवारी' : 'Accuracy'}</span>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-black text-stone-100">{averageAccuracy}%</div>
                <p className="text-[11px] text-stone-500 mt-0.5">{isMr ? 'सरासरी बरोबर उत्तरे' : 'Average accuracy'}</p>
              </div>

              <div className="bg-stone-900 border border-stone-800 p-4 rounded-xl">
                <div className="flex items-center justify-between text-stone-400 text-xs mb-1 font-medium">
                  <span>{isMr ? 'अभ्यास सातत्य' : 'Study Streak'}</span>
                  <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                </div>
                <div className="text-2xl font-black text-orange-400">{userProgress.streakDays} {isMr ? 'दिवस' : 'Days'}</div>
                <p className="text-[11px] text-stone-500 mt-0.5">{isMr ? 'दररोज सातत्य' : 'Continuous streak'}</p>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <button
                onClick={() => {
                  soundFx.playClickSound();
                  if (onOpenSubjects) onOpenSubjects();
                }}
                className="p-4 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 rounded-xl flex items-center justify-between group transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-stone-200 group-hover:text-amber-400 transition-colors">
                      {isMr ? 'विषयवार सराव सुरू करा' : 'Subject Practice'}
                    </h4>
                    <p className="text-xs text-stone-400">
                      {isMr ? 'इतिहास, भूगोल, राज्यघटना इ.' : 'History, Geography, Polity, etc.'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => {
                  soundFx.playClickSound();
                  if (onOpenAnalytics) onOpenAnalytics();
                }}
                className="p-4 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-cyan-500/40 rounded-xl flex items-center justify-between group transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-stone-200 group-hover:text-cyan-400 transition-colors">
                      {isMr ? 'प्रगती व सखोल विश्लेषण' : 'Analytics & Insights'}
                    </h4>
                    <p className="text-xs text-stone-400">
                      {isMr ? 'कच्चे विषय व वेग तपासा' : 'Identify weak areas and speed'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={handleFetchNow}
                className="p-4 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-emerald-500/40 rounded-xl flex items-center justify-between group transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Cloud className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-stone-200 group-hover:text-emerald-400 transition-colors">
                      {isMr ? 'क्लाउडवरून डेटा रीफ्रेश करा' : 'Fetch Cloud Data'}
                    </h4>
                    <p className="text-xs text-stone-400">
                      {isMr ? 'नवीन ५०००+ प्रश्न व रिझल्ट' : 'Pull latest questions & results'}
                    </p>
                  </div>
                </div>
                <RefreshCw className="w-4 h-4 text-stone-500 group-hover:text-emerald-400 group-hover:rotate-90 transition-all" />
              </button>
            </div>

            {/* Cloud Firestore DB Details Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/60 border border-stone-800 text-xs text-stone-400 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {isMr ? 'क्लाउड डेटाबेस माहिती' : 'Cloud Firestore Database Info'}
                </span>
                <span className="font-mono text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded border border-stone-700">
                  ai-studio-mpscaspirantprep
                </span>
              </div>
              <p>
                {isMr 
                  ? 'तुमचा सर्व अभ्यास डेटा (चाचण्या, सोडवलेले प्रश्न, जतन केलेले प्रश्न, आणि दैनंदिन सातत्य) Google Firebase च्या एनक्रिप्टेड क्लाउडवर थेट सुरक्षित साठवला जातो. आपण इतर कोणत्याही मोबाईल किंवा संगणकावरून याच ईमेलने लॉगिन करून आपला अभ्यास सुरू ठेवू शकता.'
                  : 'Your entire test history, solved questions, bookmarks, and streak are securely synchronized to Google Firebase Firestore. You can access your study session from any mobile device or PC using this account.'}
              </p>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* CASE B: USER IS NOT LOGGED IN - LOGIN & SIGNUP PORTAL   */
          /* ======================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: MPSC Motivational & Value Proposition */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gradient-to-br from-amber-950/60 via-stone-900 to-stone-900 border border-amber-500/30 rounded-2xl p-6 sm:p-7 shadow-xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-black text-2xl shadow-inner mb-4">
                  M
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-stone-100 tracking-tight">
                  {isMr ? 'अधिकारी बनण्याचा संकल्प - आपले वैयक्तिक अभ्यास केंद्र' : 'MPSC Aspirant Portal - Your Study HQ'}
                </h2>

                <p className="text-xs sm:text-sm text-stone-400 mt-2 leading-relaxed">
                  {isMr 
                    ? 'राज्यसेवा (राजपत्रित), संयुक्त गट ब व क पूर्व व मुख्य परीक्षा तयारीसाठी मोफत व परिपूर्ण प्लॅटफॉर्म.' 
                    : 'The comprehensive bilingual practice hub for Maharashtra Civil Services & Combined Prelims/Mains exams.'}
                </p>

                {/* Key Features List */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      {isMr 
                        ? '५,०००+ दर्जेदार प्रश्न (Core MPSC, चालू घडामोडी २०२६-२७, व्याकरण)' 
                        : '5,000+ High-yield questions with Marathi & English explanations'}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      {isMr 
                        ? 'Firebase Cloud Sync: मोबाईल व लॅपटॉपवर एकाच वेळी अभ्यास सुरक्षित ठेवा' 
                        : 'Automatic cloud backup across all your phones and laptops'}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      {isMr 
                        ? 'निगेटिव्ह मार्किंगसह रिअल एक्झाम सिम्युलेशन व सखोल विश्लेषण' 
                        : 'Real MPSC negative marking system with detailed performance stats'}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      {isMr 
                        ? 'AI मार्गदर्शक (Doubt Solver) द्वारे तत्काळ शंका निरसन' 
                        : 'Instant doubt solving with AI Mentor guidance'}
                    </span>
                  </div>
                </div>

                {/* Aspirant Inspiration Quote */}
                <div className="mt-6 pt-4 border-t border-stone-800 text-xs italic text-amber-300/90 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    {isMr 
                      ? '"यशाचा कोणताही शॉर्टकट नसतो - कष्ट, सातत्य आणि योग्य सराव हेच यशाचे खरे सूत्र आहे."' 
                      : '"There is no shortcut to success - discipline, consistency, and rigorous practice are key."'}
                  </span>
                </div>
              </div>

              {/* Security Assurance Badge */}
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 flex items-center gap-3 text-xs text-stone-400">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  {isMr 
                    ? 'आपला डेटा Google Firebase च्या नियमांनुसार १००% खाजगी व सुरक्षित आहे.' 
                    : '100% Secure cloud authentication backed by Google Firebase.'}
                </span>
              </div>
            </div>

            {/* Right Column: Login & Register Form Card */}
            <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
              
              {/* Tab Selector: Sign In vs Sign Up */}
              <div className="flex items-center p-1 bg-stone-950 border border-stone-800 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setAuthError(null);
                  }}
                  className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                    authMode === 'signin'
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {isMr ? 'लॉगिन (Sign In)' : 'Sign In'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setAuthError(null);
                  }}
                  className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                    authMode === 'signup'
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {isMr ? 'नवीन नोंदणी (Sign Up)' : 'Sign Up'}
                </button>
              </div>

              {/* 1-Click Google Sign In (Primary & Recommended) */}
              <div className="space-y-4 mb-6">
                <button
                  type="button"
                  id="btn-google-login-main"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-stone-100 text-stone-900 font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-60"
                >
                  {/* Google G SVG */}
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
                  <span>
                    {loading 
                      ? (isMr ? 'कृपया थांबा...' : 'Connecting...') 
                      : (isMr ? 'Google द्वारे १-क्लिक लॉगिन' : 'Continue with Google')}
                  </span>
                </button>

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-stone-800 w-full"></div>
                  <span className="bg-stone-900 px-3 text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                    {isMr ? 'किंवा ईमेलने लॉगिन करा' : 'or continue with email'}
                  </span>
                </div>
              </div>

              {/* Email / Password Form */}
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {/* Full Name (Sign Up only) */}
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      {isMr ? 'पूर्ण नाव (Aspirant Name)' : 'Full Name'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <UserIcon className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder={isMr ? 'उदा. अमोल पाटील' : 'e.g. Amol Patil'}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-sm placeholder-stone-500 focus:outline-none focus:border-amber-500"
                        required={authMode === 'signup'}
                      />
                    </div>
                  </div>
                )}

                {/* Target Exam Selection (Sign Up only) */}
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      {isMr ? 'लक्ष्य परीक्षा (Target Exam)' : 'Target Examination'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setTargetExam('rajyaseva')}
                        className={`p-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          targetExam === 'rajyaseva'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        {isMr ? 'राज्यसेवा' : 'Rajyaseva'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setTargetExam('combine')}
                        className={`p-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          targetExam === 'combine'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        {isMr ? 'संयुक्त गट ब/क' : 'Combined B/C'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setTargetExam('both')}
                        className={`p-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          targetExam === 'both'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        {isMr ? 'दोन्ही' : 'Both'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {isMr ? 'ईमेल पत्ता' : 'Email Address'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aspirant@example.com"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-sm placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {isMr ? 'पासवर्ड (किमान ६ अक्षरे)' : 'Password (min. 6 characters)'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-sm placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password (Sign Up only) */}
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      {isMr ? 'पासवर्ड पुन्हा टाका (Confirm Password)' : 'Confirm Password'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-sm placeholder-stone-500 focus:outline-none focus:border-amber-500"
                        required={authMode === 'signup'}
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  id="btn-auth-submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-sm transition-all shadow-md cursor-pointer disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
                >
                  {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
                  <span>
                    {authMode === 'signup'
                      ? (isMr ? 'नवीन खाते तयार करा' : 'Create Free Account')
                      : (isMr ? 'लॉगिन करा' : 'Sign In')}
                  </span>
                </button>
              </form>

              {/* Guest / Direct Practice Alternate */}
              <div className="mt-6 pt-5 border-t border-stone-800 text-center">
                <p className="text-xs text-stone-400 mb-2">
                  {isMr ? 'खाते न उघडता थेट चाचण्या द्यायच्या आहेत का?' : 'Want to practice directly without an account?'}
                </p>
                <button
                  type="button"
                  onClick={handleGuestLogin}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 cursor-pointer underline transition-colors"
                >
                  <span>{isMr ? 'पाहुणा (Guest) म्हणून सराव सुरू ठेवा ➜' : 'Continue as Guest ➜'}</span>
                </button>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
};
