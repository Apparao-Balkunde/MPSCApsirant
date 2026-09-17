import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  CheckCircle2, 
  LogIn, 
  LogOut, 
  X, 
  RefreshCw, 
  ShieldCheck, 
  Database,
  User as UserIcon,
  Download,
  UploadCloud,
  PlusCircle,
  Sparkles,
  Layers
} from 'lucide-react';
import { type User } from 'firebase/auth';
import { loginWithGoogle, logoutUser } from '../lib/firebase';
import { UserProgress, Question, SubjectId } from '../types';
import { SUBJECTS } from '../data/subjects';

interface CloudSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  userProgress: UserProgress;
  onTriggerSync: () => Promise<void>;
  onFetchData: () => Promise<void>;
  onStoreNewQuestion?: (question: Question) => Promise<boolean>;
  onSeedAllToFirebase?: () => Promise<number>;
  isSyncing: boolean;
  isFetching: boolean;
  language: 'mr' | 'en';
  questionsCount?: number;
  initialShowAddQuestion?: boolean;
}

export const CloudSyncModal: React.FC<CloudSyncModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  userProgress,
  onTriggerSync,
  onFetchData,
  onStoreNewQuestion,
  onSeedAllToFirebase,
  isSyncing,
  isFetching,
  language,
  questionsCount = 27,
  initialShowAddQuestion = false,
}) => {
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(initialShowAddQuestion);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  // New question form state
  const [qMr, setQMr] = useState('');
  const [qEn, setQEn] = useState('');
  const [subjectId, setSubjectId] = useState<SubjectId>('polity');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [opt4, setOpt4] = useState('');
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [isSavingQ, setIsSavingQ] = useState(false);

  const isMr = language === 'mr';

  useEffect(() => {
    if (initialShowAddQuestion) {
      setShowAddQuestion(true);
    }
  }, [initialShowAddQuestion]);

  if (!isOpen) return null;

  const isAnonymous = currentUser?.isAnonymous ?? true;

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setIsLoggingIn(true);
    try {
      await loginWithGoogle();
      await onTriggerSync();
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        setAuthError(isMr ? 'Google लॉगिन अयशस्वी झाले. कृपया पुन्हा प्रयत्न करा.' : 'Google sign-in failed. Please try again.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignOut = async () => {
    setAuthError(null);
    try {
      await logoutUser();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFetchClick = async () => {
    setActionNotice(null);
    await onFetchData();
    setActionNotice(isMr ? 'फायरबेसवरून सर्व डेटा यशस्वीरीत्या लोड (Fetch) झाला!' : 'All data successfully fetched from Firebase!');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleStoreClick = async () => {
    setActionNotice(null);
    await onTriggerSync();
    setActionNotice(isMr ? 'सर्व प्रगती व डेटा फायरबेसवर साठवला (Stored) गेला!' : 'All progress & data stored to Firebase!');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleSeedAllClick = async () => {
    if (!onSeedAllToFirebase) return;
    setIsSeeding(true);
    setActionNotice(null);
    try {
      const count = await onSeedAllToFirebase();
      setActionNotice(isMr ? `फायरबेसमध्ये ${count} प्रश्न यशस्वीरीत्या Add/Seed झाले!` : `Successfully added ${count} questions to Firebase!`);
      await onFetchData();
    } catch (err) {
      console.error('Seed error:', err);
    } finally {
      setIsSeeding(false);
      setTimeout(() => setActionNotice(null), 4000);
    }
  };

  const handleLoadSampleQuestion = () => {
    setSubjectId('polity');
    setQMr('भारतीय संविधानातील कोणत्या कलमानुसार राष्ट्रपतींवर महाभियोगाची प्रक्रिया चालवली जाते?');
    setQEn('Under which Article of the Indian Constitution can the President be impeached?');
    setOpt1('कलम ५४ (Article 54)');
    setOpt2('कलम ६१ (Article 61)');
    setOpt3('कलम ७२ (Article 72)');
    setOpt4('कलम १२३ (Article 123)');
    setCorrectIndex(1);
    setExplanation('कलम ६१ नुसार संविधानाचा भंग केल्याच्या कारणावरून राष्ट्रपतींवर महाभियोग चालवून त्यांना पदावरून दूर करता येते.');
    setActionNotice(isMr ? 'नमुना प्रश्न फॉर्ममध्ये भरला गेला आहे. आता "Firestore वर Store करा" वर क्लिक करा.' : 'Sample question filled. Click "Store Question" below.');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qMr.trim() || !opt1.trim() || !opt2.trim() || !opt3.trim() || !opt4.trim()) {
      alert(isMr ? 'कृपया प्रश्न व सर्व ४ पर्याय भरा' : 'Please fill question and all 4 options');
      return;
    }
    if (!onStoreNewQuestion) return;

    setIsSavingQ(true);
    const newId = `q_custom_${Date.now()}`;
    const newQuestion: Question = {
      id: newId,
      subjectId,
      topic: 'विद्यार्थी योगदान (Custom Question)',
      subtopic: 'सराव प्रश्न',
      exam: 'Both',
      difficulty: 'Moderate',
      questionMr: qMr.trim(),
      questionEn: qEn.trim() || qMr.trim(),
      optionsMr: [opt1.trim(), opt2.trim(), opt3.trim(), opt4.trim()],
      optionsEn: [opt1.trim(), opt2.trim(), opt3.trim(), opt4.trim()],
      correctAnswerIndex: correctIndex,
      explanationMr: explanation.trim() || 'स्पष्टीकरण उपलब्ध नाही.',
      explanationEn: explanation.trim() || 'Explanation not provided.',
      reference: 'MPSC Student Contribution',
      yearTag: '2026',
    };

    const success = await onStoreNewQuestion(newQuestion);
    setIsSavingQ(false);
    if (success) {
      setActionNotice(isMr ? 'नवीन प्रश्न Firebase (Firestore) मध्ये Add झाला आणि तिथून Fetch झाला!' : 'New question added to Firebase and fetched!');
      setQMr('');
      setQEn('');
      setOpt1('');
      setOpt2('');
      setOpt3('');
      setOpt4('');
      setExplanation('');
      setShowAddQuestion(false);
      setTimeout(() => setActionNotice(null), 5000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 to-stone-850 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg">
                {isMr ? 'फायरबेस डेटा केंद्र (Firebase Data Hub)' : 'Firebase Data Hub'}
              </h2>
              <p className="text-xs text-amber-300 flex items-center gap-1">
                <Database className="w-3 h-3" />
                <span>Firestore: ai-studio-mpscaspirantprep</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Status banner */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-emerald-900">
                {isMr ? 'फायरबेस क्लाउड डेटाबेस थेट जोडलेला आहे' : 'Firebase Firestore Connected'}
              </p>
              <p className="text-emerald-700 mt-0.5">
                {isMr 
                  ? 'येथून तुम्ही फायरबेसमध्ये थेट डेटा Add करू शकता आणि तिथून संपूर्ण डेटा (प्रश्न, चाचण्या, निकाल) Fetch करू शकता.' 
                  : 'Add questions directly to Firebase Firestore, and fetch all questions, exams, and logs in real-time.'}
              </p>
            </div>
          </div>

          {/* Action notice feedback */}
          {actionNotice && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{actionNotice}</span>
            </div>
          )}

          {/* User Account Info */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-600">
                {isMr ? 'वापरकर्ता खाते:' : 'User Account:'}
              </span>
              <span className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold ${
                !isAnonymous 
                  ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                  : 'bg-stone-200 text-stone-700'
              }`}>
                {!isAnonymous ? 'Google Account' : (isMr ? 'अतिथी खाते (Guest)' : 'Guest Mode')}
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="w-9 h-9 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-sm overflow-hidden">
                {currentUser?.photoURL ? (
                  <img src={currentUser.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-stone-900 truncate">
                  {currentUser?.displayName || (isAnonymous ? (isMr ? 'एमपीएससी उमेदवार' : 'MPSC Aspirant') : 'Aspirant')}
                </p>
                <p className="text-[11px] text-stone-500 truncate font-mono">
                  {currentUser?.email || (currentUser?.uid ? `UID: ${currentUser.uid.slice(0, 14)}...` : 'Connecting...')}
                </p>
              </div>
            </div>
          </div>

          {/* Sync Stats Cards */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="block font-black text-stone-900 text-sm">{userProgress.history.length}</span>
              <span className="text-[10px] text-stone-500">{isMr ? 'चाचण्या' : 'Exams'}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="block font-black text-stone-900 text-sm">{userProgress.bookmarkedQuestionIds.length}</span>
              <span className="text-[10px] text-stone-500">{isMr ? 'बुकमार्क' : 'Bookmarks'}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="block font-black text-stone-900 text-sm">{(userProgress.studyLogs || []).length}</span>
              <span className="text-[10px] text-stone-500">{isMr ? 'नोंदी' : 'Logs'}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
              <span className="block font-black text-amber-800 text-sm">{questionsCount}</span>
              <span className="text-[10px] text-amber-700 font-medium">{isMr ? 'प्रश्न (DB)' : 'Questions'}</span>
            </div>
          </div>

          {authError && (
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {authError}
            </div>
          )}

          {/* PRIMARY ACTIONS: FETCH FROM FIREBASE & STORE TO FIREBASE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {/* Button 1: Fetch from Firebase */}
            <button
              id="btn-fetch-firebase"
              onClick={handleFetchClick}
              disabled={isFetching || isSyncing || isSeeding}
              className="py-3 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
            >
              <Download className={`w-4 h-4 text-amber-400 ${isFetching ? 'animate-bounce' : ''}`} />
              <span>
                {isFetching 
                  ? (isMr ? 'डेटा आणत आहे...' : 'Fetching data...') 
                  : (isMr ? 'फायरबेसवरून आणा (Fetch)' : 'Fetch from Firebase')}
              </span>
            </button>

            {/* Button 2: Store to Firebase */}
            <button
              id="btn-store-firebase"
              onClick={handleStoreClick}
              disabled={isSyncing || isFetching || isSeeding}
              className="py-3 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
            >
              <UploadCloud className={`w-4 h-4 text-stone-950 ${isSyncing ? 'animate-bounce' : ''}`} />
              <span>
                {isSyncing 
                  ? (isMr ? 'डेटा साठवत आहे...' : 'Storing data...') 
                  : (isMr ? 'फायरबेसवर साठवा (Store)' : 'Store on Firebase')}
              </span>
            </button>
          </div>

          {/* Bulk Seed / Add All Questions to Firebase Button */}
          {onSeedAllToFirebase && (
            <button
              type="button"
              onClick={handleSeedAllClick}
              disabled={isSeeding || isSyncing || isFetching}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Layers className={`w-4 h-4 text-amber-700 ${isSeeding ? 'animate-spin' : ''}`} />
              <span>
                {isSeeding 
                  ? (isMr ? 'सर्व प्रश्न Firebase मध्ये Add होत आहेत...' : 'Adding all questions to Firebase...') 
                  : (isMr ? 'सर्व MPSC प्रश्नसंच Firebase मध्ये Add/Sync करा' : 'Add Full Question Bank to Firebase')}
              </span>
            </button>
          )}

          {/* Add Question to Firestore Section */}
          {onStoreNewQuestion && (
            <div className="border border-stone-200 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setShowAddQuestion(!showAddQuestion)}
                className="w-full py-2.5 px-3.5 bg-stone-50 hover:bg-stone-100 flex items-center justify-between text-xs font-bold text-stone-800 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <PlusCircle className="w-4 h-4 text-amber-600" />
                  <span>{isMr ? 'नवीन प्रश्न Firebase मध्ये Add करा' : 'Add New Question to Firebase'}</span>
                </span>
                <span className="text-stone-500 text-[11px] font-mono">
                  {showAddQuestion ? '▲ बंद करा' : '▼ फॉर्म उघडा'}
                </span>
              </button>

              {showAddQuestion && (
                <form onSubmit={handleSaveQuestion} className="p-3.5 space-y-3 bg-white border-t border-stone-200 text-xs">
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-semibold text-stone-700">
                      {isMr ? 'प्रश्नाची माहिती भरा:' : 'Fill question details:'}
                    </span>
                    <button
                      type="button"
                      onClick={handleLoadSampleQuestion}
                      className="text-[11px] text-amber-700 hover:text-amber-800 bg-amber-100/70 hover:bg-amber-100 px-2 py-0.5 rounded font-semibold cursor-pointer"
                    >
                      ⚡ {isMr ? 'नमुना प्रश्न भरा' : 'Load Sample Q'}
                    </button>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      {isMr ? 'विषय (Subject)' : 'Subject'}:
                    </label>
                    <select
                      value={subjectId}
                      onChange={(e) => setSubjectId(e.target.value as SubjectId)}
                      className="w-full p-2 border border-stone-300 rounded-lg text-xs bg-white text-stone-900"
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {isMr ? s.nameMr : s.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      {isMr ? 'प्रश्न (मराठीत)' : 'Question (Marathi)'} *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={qMr}
                      onChange={(e) => setQMr(e.target.value)}
                      placeholder={isMr ? 'उदा. भारतीय संविधानातील कोणत्या कलमानुसार राष्ट्रपतींवर महाभियोग चालवला जातो?' : 'Enter question in Marathi'}
                      className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      {isMr ? 'प्रश्न (इंग्रजीत - पर्यायी)' : 'Question (English - optional)'}
                    </label>
                    <input
                      type="text"
                      value={qEn}
                      onChange={(e) => setQEn(e.target.value)}
                      placeholder="e.g. Under which Article of Constitution can President be impeached?"
                      className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-semibold text-stone-700">
                      {isMr ? 'पर्याय व बरोबर उत्तर निवडा:' : 'Options & select correct answer:'}
                    </label>
                    {[
                      { val: opt1, set: setOpt1, idx: 0 },
                      { val: opt2, set: setOpt2, idx: 1 },
                      { val: opt3, set: setOpt3, idx: 2 },
                      { val: opt4, set: setOpt4, idx: 3 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="correctOpt"
                          checked={correctIndex === index}
                          onChange={() => setCorrectIndex(index)}
                          className="cursor-pointer text-amber-600 focus:ring-amber-500"
                        />
                        <input
                          required
                          type="text"
                          value={item.val}
                          onChange={(e) => item.set(e.target.value)}
                          placeholder={`पर्याय ${index + 1}`}
                          className="flex-1 p-1.5 border border-stone-300 rounded-md text-xs"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      {isMr ? 'स्पष्टीकरण (Explanation)' : 'Explanation'}:
                    </label>
                    <input
                      type="text"
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      placeholder={isMr ? 'उदा. कलम ६१ नुसार महाभियोगाची प्रक्रिया पूर्ण केली जाते.' : 'Explanation text'}
                      className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingQ}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>{isSavingQ ? (isMr ? 'Firebase मध्ये Add होत आहे...' : 'Adding to Firebase...') : (isMr ? 'Firebase मध्ये प्रश्न Add करा' : 'Add Question to Firebase')}</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Google Sign-in / Sign-out Button */}
          {isAnonymous ? (
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoggingIn}
              className="w-full py-2 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <LogIn className="w-4 h-4 text-amber-600" />
              <span>
                {isLoggingIn 
                  ? (isMr ? 'लॉगिन होत आहे...' : 'Connecting...') 
                  : (isMr ? 'Google ने साइन इन करा (खाते जोडा)' : 'Sign in with Google (Link Account)')}
              </span>
            </button>
          ) : (
            <button
              onClick={handleSignOut}
              className="w-full py-2 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isMr ? 'साइन आउट करा' : 'Sign Out'}</span>
            </button>
          )}

          {/* Cloud Info Subtitle */}
          <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isMr ? 'Google Cloud Firestore (asia-east1) वर थेट संचयन' : 'Direct persistence on Google Cloud Firestore (asia-east1)'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
