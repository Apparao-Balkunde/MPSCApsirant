import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  CheckCircle2, 
  LogIn, 
  LogOut, 
  X, 
  Database,
  User as UserIcon,
  Download,
  UploadCloud,
  PlusCircle,
  Sparkles,
  Layers,
  BookOpen,
  HelpCircle,
  Check,
  Zap
} from 'lucide-react';
import { type User } from 'firebase/auth';
import { loginWithGoogle, logoutUser } from '../lib/firebase';
import { UserProgress, Question, SubjectId } from '../types';
import { SUBJECTS } from '../data/subjects';
import { isFirestoreQuotaExceeded, bulkStoreMCQsToFirestore } from '../services/firestoreSync';
import { NEW_FIREBASE_MCQS } from '../data/mpscQuestions';
import { FIREBASE_MCQS_BATCH_2 } from '../data/firebaseMcqsBatch2';

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
  onOpenLoginPage?: () => void;
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
  onOpenLoginPage,
}) => {
  const [activeTab, setActiveTab] = useState<'sync' | 'add_mcq'>(
    initialShowAddQuestion ? 'add_mcq' : 'sync'
  );
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isBulkAdding, setIsBulkAdding] = useState(false);

  // New question form state
  const [qMr, setQMr] = useState('');
  const [qEn, setQEn] = useState('');
  const [subjectId, setSubjectId] = useState<SubjectId>('polity');
  const [examType, setExamType] = useState<'Rajyaseva' | 'Combine' | 'Both'>('Both');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Moderate' | 'Hard'>('Moderate');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [opt4, setOpt4] = useState('');
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [reference, setReference] = useState('');
  const [isSavingQ, setIsSavingQ] = useState(false);

  const isMr = language === 'mr';

  useEffect(() => {
    if (initialShowAddQuestion) {
      setActiveTab('add_mcq');
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
        if (err?.code === 'auth/unauthorized-domain') {
          setAuthError(
            isMr
              ? 'हा डोमेन Firebase मध्ये अधिकृत (Authorized) केलेला नाही. कृपया Firebase Console -> Authentication -> Settings -> Authorized Domains मध्ये "exam.mpscsarathi.online" आणि "mpscsarathi.online" जोडा.'
              : 'Domain unauthorized for Google OAuth. Please add "exam.mpscsarathi.online" to Firebase Console -> Authentication -> Settings -> Authorized Domains.'
          );
        } else {
          setAuthError(isMr ? 'Google लॉगिन अयशस्वी झाले. कृपया पुन्हा प्रयत्न करा.' : 'Google sign-in failed. Please try again.');
        }
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
    setActionNotice(isMr ? 'सर्व निकाल व प्रगती फायरबेसवर सुरक्षित साठवली (Stored)!' : 'All exam data safely stored on Firebase!');
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

  // Quick Preset Presets for fast MCQ composition
  const SAMPLE_PRESETS = [
    {
      title: isMr ? 'राज्यघटना: राष्ट्रपती महाभियोग' : 'Polity: Impeachment',
      subject: 'polity' as SubjectId,
      exam: 'Both' as const,
      difficulty: 'Moderate' as const,
      qMr: 'भारतीय संविधानातील कोणत्या कलमानुसार राष्ट्रपतींवर महाभियोगाची (Impeachment) प्रक्रिया चालवली जाते?',
      qEn: 'Under which Article of the Indian Constitution can the President be impeached?',
      opt1: 'कलम ५४ (Article 54)',
      opt2: 'कलम ६१ (Article 61)',
      opt3: 'कलम ७२ (Article 72)',
      opt4: 'कलम १२३ (Article 123)',
      correct: 1,
      explanation: 'कलम ६१ नुसार संविधानाचा भंग केल्याच्या एकमेव कारणावरून संसदेच्या कोणत्याही सभागृहातून राष्ट्रपतींवर महाभियोग चालवून त्यांना पदावरून दूर करता येते.',
      ref: 'एम. लक्ष्मीकांत - भारतीय राज्यव्यवस्था (कलम ६१)',
    },
    {
      title: isMr ? 'चालू घडामोडी: अटल सेतू' : 'Current Affairs: Atal Setu',
      subject: 'current_affairs' as SubjectId,
      exam: 'Both' as const,
      difficulty: 'Moderate' as const,
      qMr: 'भारतातील सर्वात लांब सागरी पूल "अटल बिहारी वाजपेयी शिवडी-न्हावा शेवा अटल सेतू" (MTHL) ची एकूण लांबी किती आहे?',
      qEn: 'What is the total length of India’s longest sea bridge Atal Setu (MTHL)?',
      opt1: '१६.५ किमी',
      opt2: '२१.८ किमी (ज्यापैकी १६.५ किमी समुद्रावर)',
      opt3: '२५.४ किमी',
      opt4: '१८.२ किमी',
      correct: 1,
      explanation: 'अटल सेतूची एकूण लांबी २१.८ किमी असून त्यातील १६.५ किमी सागरी भाग आहे आणि ५.३ किमी जमिनीवरील मार्ग आहे.',
      ref: 'महाराष्ट्र शासन DGIPR अधिकृत माहिती',
    },
    {
      title: isMr ? 'इतिहास: सत्यशोधक समाज ग्रंथ' : 'History: Phule Literature',
      subject: 'maharashtra_history' as SubjectId,
      exam: 'Rajyaseva' as const,
      difficulty: 'Hard' as const,
      qMr: 'महात्मा जोतीराव फुले यांनी लिहिलेल्या ग्रंथांचा योग्य कालानुक्रम ओळखा:\n१. तृतीय रत्न\n२. ब्राह्मणांचे कसब\n३. शेतकऱ्याचा असूड\n४. सार्वजनिक सत्यधर्म पुस्तक',
      qEn: 'Identify the correct chronological order of books written by Mahatma Jyotirao Phule:\n1. Tritiya Ratna, 2. Brahmananche Kasab, 3. Shetkaryacha Asud, 4. Sarvajanik Satyadharma',
      opt1: '१ - २ - ३ - ४',
      opt2: '२ - १ - ३ - ४',
      opt3: '१ - ३ - २ - ४',
      opt4: '२ - ३ - १ - ४',
      correct: 0,
      explanation: 'तृतीय रत्न (१८५५), ब्राह्मणांचे कसब (१८६९), शेतकऱ्याचा असूड (१८८३) आणि सार्वजनिक सत्यधर्म पुस्तक (१८९१ मरणोत्तर).',
      ref: 'डॉ. धनंजय कीर - महात्मा जोतीराव फुले',
    },
    {
      title: isMr ? 'भूगोल: सह्याद्री पर्वत घाट' : 'Geography: Sahyadri Ghats',
      subject: 'maharashtra_geography' as SubjectId,
      exam: 'Combine' as const,
      difficulty: 'Moderate' as const,
      qMr: 'सह्याद्री पर्वतातील खालील घाटांचा उत्तरेकडून दक्षिणेकडे योग्य क्रम कोणता?',
      qEn: 'What is the correct North to South sequence of the following ghats in Maharashtra?',
      opt1: 'थळ घाट - माळशेज घाट - बोर घाट - कुंभारली घाट - आंबोली घाट',
      opt2: 'बोर घाट - थळ घाट - माळशेज घाट - आंबोली घाट - कुंभारली घाट',
      opt3: 'माळशेज घाट - थळ घाट - बोर घाट - कुंभारली घाट - आंबोली घाट',
      opt4: 'थळ घाट - बोर घाट - माळशेज घाट - आंबोली घाट - कुंभारली घाट',
      correct: 0,
      explanation: 'उत्तरेकडून दक्षिणेकडे क्रम: थळ घाट (मुंबई-नाशिक), माळशेज घाट (ठाणे-नगर), बोर घाट (मुंबई-पुणे), कुंभारली घाट (कराड-चिपळूण), आंबोली घाट (सावंतवाडी-बेळगाव).',
      ref: 'ए. बी. सवदी - महाराष्ट्राचा समग्र भूगोल',
    },
    {
      title: isMr ? 'विज्ञान: विषाणू vs जिवाणू' : 'Science: Viruses vs Bacteria',
      subject: 'general_science' as SubjectId,
      exam: 'Both' as const,
      difficulty: 'Moderate' as const,
      qMr: 'खालीलपैकी कोणता रोग विषाणूजन्य (Viral Disease) नसून जिवाणूजन्य (Bacterial) आहे?',
      qEn: 'Which of the following disease is bacterial and NOT viral?',
      opt1: 'पोलिओ (Polio)',
      opt2: 'रेबीज (Rabies)',
      opt3: 'टायफॉईड - विषमज्वर (Typhoid)',
      opt4: 'गोवर (Measles)',
      correct: 2,
      explanation: 'टायफॉईड हा साल्मोनेला टायफी (Salmonella typhi) नावाच्या जिवाणूमुळे (Bacteria) होतो. पोलिओ, रेबीज आणि गोवर हे विषाणूजन्य रोग आहेत.',
      ref: 'स्टेट बोर्ड सामान्य विज्ञान इयत्ता ९ वी',
    },
    {
      title: isMr ? 'राज्यघटना: ७३ वी घटनादुरुस्ती' : 'Polity: 73rd Amendment',
      subject: 'polity' as SubjectId,
      exam: 'Both' as const,
      difficulty: 'Hard' as const,
      qMr: '७३ व्या घटनादुरुस्ती कायद्यान्वये संविधानात समाविष्ट केलेल्या ११ व्या अनुसूचीमध्ये पंचायतींच्या अखत्यारीतील किती विषयांची यादी देण्यात आली आहे?',
      qEn: 'How many functional subjects are listed in the 11th Schedule for Panchayats under the 73rd Amendment Act?',
      opt1: '१८ विषय',
      opt2: '२१ विषय',
      opt3: '२९ विषय (Article 243G)',
      opt4: '३३ विषय',
      correct: 2,
      explanation: '७३ व्या घटनादुरुस्तीने संविधानात भाग ९ व ११ वी अनुसूची समाविष्ट केली. ११ व्या अनुसूचीमध्ये पंचायतींच्या अधिकारांखाली एकूण २९ विषयांची यादी आहे.',
      ref: 'एम. लक्ष्मीकांत - भारतीय राज्यव्यवस्था (पंचायती राज)',
    },
    {
      title: isMr ? 'अर्थव्यवस्था: रिझर्व्ह बँक LAF' : 'Economy: RBI Repo & SDF',
      subject: 'economy' as SubjectId,
      exam: 'Rajyaseva' as const,
      difficulty: 'Hard' as const,
      qMr: 'RBI द्वारे २०२२ मध्ये सुरू केलेल्या स्थायी ठेव सुविधेचे (Standing Deposit Facility - SDF) मुख्य वैशिष्ट्य काय आहे?',
      qEn: 'What is the key characteristic of RBI’s Standing Deposit Facility (SDF)?',
      opt1: 'विनातारण (Without Collateral) अतिरिक्त रोकड शोषून घेणे',
      opt2: 'केवळ विदेशी बँकांना कर्ज देणे',
      opt3: 'फक्त नाबार्डला पुनर्वित्त देणे',
      opt4: 'सोने तारण ठेवून कर्ज देणे',
      correct: 0,
      explanation: 'SDF ही एक अशी तरलता शोषण सुविधा आहे ज्यामध्ये रिझर्व्ह बँक व्यापारी बँकांकडून कोणतीही सरकारी रोखे (Collateral) तारण न देता अतिरिक्त तरलता शोषून घेते.',
      ref: 'रमेश सिंग - भारतीय अर्थव्यवस्था (बँकिंग)',
    },
  ];

  const handleApplyPreset = (preset: typeof SAMPLE_PRESETS[0]) => {
    setSubjectId(preset.subject);
    setExamType(preset.exam);
    setDifficulty(preset.difficulty);
    setQMr(preset.qMr);
    setQEn(preset.qEn);
    setOpt1(preset.opt1);
    setOpt2(preset.opt2);
    setOpt3(preset.opt3);
    setOpt4(preset.opt4);
    setCorrectIndex(preset.correct);
    setExplanation(preset.explanation);
    setReference(preset.ref);
    setActionNotice(isMr ? `"${preset.title}" नमुना प्रश्न फॉर्ममध्ये लोड झाला!` : `Sample loaded: ${preset.title}`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleBulkAddCurated = async () => {
    setIsBulkAdding(true);
    setActionNotice(null);
    try {
      const allCurated = [...NEW_FIREBASE_MCQS, ...FIREBASE_MCQS_BATCH_2];
      const addedCount = await bulkStoreMCQsToFirestore(allCurated);
      if (addedCount > 0) {
        setActionNotice(
          isMr 
            ? `🎉 अभिनंदन! ${addedCount} उच्च-काठिण्य MPSC MCQs (Batch 1 & 2) Firebase मध्ये यशस्वीरीत्या जोडले गेले!` 
            : `Successfully added ${addedCount} curated MCQs (Batch 1 & 2) to Firebase!`
        );
        if (onFetchData) {
          await onFetchData();
        }
      } else {
        setActionNotice(
          isMr 
            ? 'सर्व २८ प्रश्न Firebase मध्ये अद्ययावत आहेत.' 
            : 'All 28 MCQs are up-to-date in Firebase.'
        );
      }
    } catch (err) {
      console.error('Bulk add error:', err);
    } finally {
      setIsBulkAdding(false);
      setTimeout(() => setActionNotice(null), 5000);
    }
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qMr.trim() || !opt1.trim() || !opt2.trim() || !opt3.trim() || !opt4.trim()) {
      alert(isMr ? 'कृपया प्रश्न व सर्व ४ पर्याय भरा' : 'Please fill question and all 4 options');
      return;
    }
    if (!onStoreNewQuestion) return;

    setIsSavingQ(true);
    const newId = `q_mcq_${Date.now()}`;
    const newQuestion: Question = {
      id: newId,
      subjectId,
      topic: 'विद्यार्थी योगदान (Custom MCQ)',
      subtopic: 'सराव प्रश्नसंच',
      exam: examType,
      difficulty,
      questionMr: qMr.trim(),
      questionEn: qEn.trim() || qMr.trim(),
      optionsMr: [opt1.trim(), opt2.trim(), opt3.trim(), opt4.trim()],
      optionsEn: [opt1.trim(), opt2.trim(), opt3.trim(), opt4.trim()],
      correctAnswerIndex: correctIndex,
      explanationMr: explanation.trim() || 'स्पष्टीकरण उपलब्ध नाही.',
      explanationEn: explanation.trim() || 'Explanation not provided.',
      reference: reference.trim() || 'MPSC Aspirant Question Bank',
      yearTag: '2026',
    };

    const success = await onStoreNewQuestion(newQuestion);
    setIsSavingQ(false);
    if (success) {
      setActionNotice(
        isMr 
          ? '✔ नवीन MCQ प्रश्न Firebase Firestore मध्ये थेट साठवला गेला आणि लाईव्ह झाला!' 
          : 'New MCQ question stored directly to Firebase Firestore!'
      );
      setQMr('');
      setQEn('');
      setOpt1('');
      setOpt2('');
      setOpt3('');
      setOpt4('');
      setExplanation('');
      setReference('');
      setTimeout(() => setActionNotice(null), 5000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-inner">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg">
                {isMr ? 'फायरबेस डेटा केंद्र व MCQ व्यवस्थापन' : 'Firebase Data Hub & MCQ Manager'}
              </h2>
              <p className="text-xs text-amber-300 flex items-center gap-1 font-mono">
                <Database className="w-3 h-3" />
                <span>Firestore: ai-studio-mpscaspirantprep</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-stone-200 bg-stone-50 px-3 pt-2 gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('add_mcq')}
            className={`py-2 px-3.5 text-xs font-bold rounded-t-lg transition-all flex items-center gap-1.5 cursor-pointer border-t border-x ${
              activeTab === 'add_mcq'
                ? 'bg-white text-amber-900 border-stone-200 border-b-white -mb-px shadow-xs'
                : 'bg-stone-100 text-stone-600 border-transparent hover:text-stone-900'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-amber-600" />
            <span>{isMr ? '➕ नवीन MCQ प्रश्न Add करा' : '➕ Add MCQ Question'}</span>
            <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-bold">
              Firebase
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sync')}
            className={`py-2 px-3.5 text-xs font-bold rounded-t-lg transition-all flex items-center gap-1.5 cursor-pointer border-t border-x ${
              activeTab === 'sync'
                ? 'bg-white text-stone-900 border-stone-200 border-b-white -mb-px shadow-xs'
                : 'bg-stone-100 text-stone-600 border-transparent hover:text-stone-900'
            }`}
          >
            <Cloud className="w-4 h-4 text-emerald-600" />
            <span>{isMr ? '📊 डेटा सिंक व बॅकअप' : '📊 Sync & Backup'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          {/* Action notice feedback banner */}
          {actionNotice && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="flex-1">{actionNotice}</span>
            </div>
          )}

          {/* TAB 1: ADD MCQ TO FIREBASE */}
          {activeTab === 'add_mcq' && (
            <div className="space-y-4">
              {/* Top Banner & Quick Presets */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                <div className="flex items-center justify-between pb-2">
                  <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
                    <span>{isMr ? '१-क्लिक नमुना MPSC प्रश्न (Presets):' : '1-Click Sample MPSC MCQs:'}</span>
                  </span>
                  <span className="text-[11px] text-amber-800">
                    {isMr ? 'क्लिक करून फॉर्ममध्ये भरा' : 'Click to autofill'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SAMPLE_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-amber-100 text-stone-800 border border-amber-300 rounded-lg transition-colors cursor-pointer shadow-2xs"
                    >
                      ⚡ {preset.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bulk Add Curated Questions Button */}
              <div className="p-3 rounded-xl bg-stone-900 text-stone-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 shadow-sm">
                <div className="text-xs">
                  <p className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{isMr ? 'MPSC उच्च-दर्जाचे २८ कठीण MCQs संच (Batch 1 & 2)' : 'Curated 28 Hard MPSC MCQs (Batch 1 & 2)'}</span>
                  </p>
                  <p className="text-stone-300 text-[11px] mt-0.5">
                    {isMr 
                      ? 'राज्यघटना, ७३ वी घटनादुरुस्ती, १८५७ उठाव, नद्या, Regur मृदा, RBI धोरण, विज्ञान व चालू घडामोडी २०२६' 
                      : 'Comprehensive questions across Polity, 73rd Amendment, History, Geography, Economy & Science'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleBulkAddCurated}
                  disabled={isBulkAdding}
                  className="w-full sm:w-auto px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 disabled:opacity-50"
                >
                  <UploadCloud className={`w-3.5 h-3.5 ${isBulkAdding ? 'animate-bounce' : ''}`} />
                  <span>{isBulkAdding ? (isMr ? 'Add होत आहेत...' : 'Adding...') : (isMr ? '२८ MCQs Firebase मध्ये जोडा' : 'Add 28 MCQs to Firebase')}</span>
                </button>
              </div>

              {/* Custom MCQ Form */}
              <form onSubmit={handleSaveQuestion} className="space-y-3.5 bg-stone-50/60 p-4 rounded-xl border border-stone-200 text-xs">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <h3 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    <span>{isMr ? 'नवीन प्रश्नाचा मजकूर व पर्याय भरा' : 'Question Content & Options'}</span>
                  </h3>
                  <span className="text-[11px] text-stone-500 font-mono">* आवश्यक रकाने</span>
                </div>

                {/* Subject, Exam, and Difficulty Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      {isMr ? 'विषय (Subject)' : 'Subject'} *
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
                    <label className="block font-bold text-stone-700 mb-1">
                      {isMr ? 'परीक्षा स्वरूप (Exam)' : 'Exam Pattern'}
                    </label>
                    <select
                      value={examType}
                      onChange={(e) => setExamType(e.target.value as any)}
                      className="w-full p-2 border border-stone-300 rounded-lg text-xs bg-white text-stone-900"
                    >
                      <option value="Both">{isMr ? 'दोन्ही (राज्यसेवा + संयुक्त)' : 'Both'}</option>
                      <option value="Rajyaseva">{isMr ? 'फक्त राज्यसेवा (Rajyaseva)' : 'Rajyaseva'}</option>
                      <option value="Combine">{isMr ? 'फक्त संयुक्त गट-ब व क' : 'Combine (B & C)'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      {isMr ? 'काठिण्य पातळी' : 'Difficulty'}
                    </label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as any)}
                      className="w-full p-2 border border-stone-300 rounded-lg text-xs bg-white text-stone-900"
                    >
                      <option value="Easy">{isMr ? 'सोपी (Easy)' : 'Easy'}</option>
                      <option value="Moderate">{isMr ? 'मध्यम (Moderate)' : 'Moderate'}</option>
                      <option value="Hard">{isMr ? 'कठीण (Hard - MPSC Standard)' : 'Hard'}</option>
                    </select>
                  </div>
                </div>

                {/* Marathi Question Text */}
                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    {isMr ? 'प्रश्न (मराठीत)' : 'Question Text (Marathi)'} *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={qMr}
                    onChange={(e) => setQMr(e.target.value)}
                    placeholder={isMr ? 'उदा. भारतीय संविधानातील कलम ३६१ अन्वये राष्ट्रपती व राज्यपालांना कोणते संरक्षण प्राप्त आहे?' : 'Enter question text in Marathi'}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs bg-white text-stone-900 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {/* English Question Text (Optional) */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {isMr ? 'प्रश्न (इंग्रजीत - पर्यायी)' : 'Question Text (English - optional)'}
                  </label>
                  <input
                    type="text"
                    value={qEn}
                    onChange={(e) => setQEn(e.target.value)}
                    placeholder="e.g. Under which Article of Indian Constitution is immunity provided to President?"
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs bg-white text-stone-900"
                  />
                </div>

                {/* 4 Options and Correct Answer Radio */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="block font-bold text-stone-800">
                      {isMr ? '४ पर्याय प्रविष्ट करा व अचूक उत्तराचा रेडिओ बटण निवडा:' : 'Enter 4 Options & select correct answer:'}
                    </label>
                    <span className="text-[11px] text-amber-700 font-semibold">
                      {isMr ? `पर्याय क्रमांक ${correctIndex + 1} बरोबर आहे` : `Option ${correctIndex + 1} marked correct`}
                    </span>
                  </div>

                  {[
                    { val: opt1, set: setOpt1, idx: 0, label: isMr ? 'पर्याय १' : 'Option 1' },
                    { val: opt2, set: setOpt2, idx: 1, label: isMr ? 'पर्याय २' : 'Option 2' },
                    { val: opt3, set: setOpt3, idx: 2, label: isMr ? 'पर्याय ३' : 'Option 3' },
                    { val: opt4, set: setOpt4, idx: 3, label: isMr ? 'पर्याय ४' : 'Option 4' },
                  ].map((item) => (
                    <div 
                      key={item.idx} 
                      className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all ${
                        correctIndex === item.idx 
                          ? 'bg-amber-50/80 border-amber-400 ring-1 ring-amber-400/40' 
                          : 'bg-white border-stone-300'
                      }`}
                    >
                      <label className="flex items-center gap-1.5 cursor-pointer shrink-0 font-bold text-stone-700 text-xs select-none">
                        <input
                          type="radio"
                          name="correctAnswerSelect"
                          checked={correctIndex === item.idx}
                          onChange={() => setCorrectIndex(item.idx)}
                          className="w-4 h-4 text-amber-600 cursor-pointer"
                        />
                        <span className="w-14">{item.label}:</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={item.val}
                        onChange={(e) => item.set(e.target.value)}
                        placeholder={isMr ? `येथे ${item.label} लिहा...` : `Enter ${item.label}...`}
                        className="flex-1 p-1.5 border border-stone-200 rounded text-xs bg-white text-stone-900"
                      />
                      {correctIndex === item.idx && (
                        <span className="text-[11px] font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>{isMr ? 'अचूक उत्तर' : 'Correct'}</span>
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Explanation and Reference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      {isMr ? 'स्पष्टीकरण (Detailed Explanation)' : 'Explanation'}
                    </label>
                    <textarea
                      rows={2}
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      placeholder={isMr ? 'उदा. कलम ३६१ अन्वये राष्ट्रपती व राज्यपालांना फौजदारी खटल्यापासून मुक्ती आहे...' : 'Explanation details...'}
                      className="w-full p-2 border border-stone-300 rounded-lg text-xs bg-white text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      {isMr ? 'संदर्भ / पुस्तक (Reference Source)' : 'Reference Source'}
                    </label>
                    <input
                      type="text"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      placeholder={isMr ? 'उदा. एम. लक्ष्मीकांत भारतीय राज्यव्यवस्था / स्टेट बोर्ड' : 'e.g. Laxmikanth Indian Polity'}
                      className="w-full p-2 border border-stone-300 rounded-lg text-xs bg-white text-stone-900"
                    />
                  </div>
                </div>

                {/* Submit to Firebase Button */}
                <button
                  type="submit"
                  disabled={isSavingQ}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  <UploadCloud className={`w-4 h-4 text-stone-950 ${isSavingQ ? 'animate-bounce' : ''}`} />
                  <span>
                    {isSavingQ 
                      ? (isMr ? 'Firebase मध्ये MCQ जतन होत आहे...' : 'Saving MCQ to Firebase...') 
                      : (isMr ? 'Firebase मध्ये हा प्रश्न Add करा (Save to Firestore)' : 'Save Question to Firebase Firestore')}
                  </span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: DATA SYNC & STATS */}
          {activeTab === 'sync' && (
            <div className="space-y-4">
              {/* Status banner */}
              {isFirestoreQuotaExceeded() ? (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-3">
                  <Database className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-amber-950">
                      {isMr ? 'स्थानिक ऑफलाइन मोड सक्रिय (Firestore Free-Tier Quota)' : 'Local Storage Mode Active (Daily Free Tier Limit)'}
                    </p>
                    <p className="text-amber-800 mt-0.5 leading-relaxed">
                      {isMr 
                        ? 'आजची फायरबेस मोफत दैनिक वाचन मर्यादा पूर्ण झाली आहे. ॲप स्थानिक संचयन (Local Storage) व १,००,०००+ प्रश्न इंजिनसह १००% अखंडपणे चालू आहे. सर्व सराव आणि चाचण्या सुरक्षित आहेत.' 
                        : 'Daily free-tier Firestore quota limit reached. The app continues operating seamlessly offline with full local storage and the 100k question engine.'}
                    </p>
                  </div>
                </div>
              ) : (
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

                {onOpenLoginPage && (
                  <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-stone-500">
                      {isMr ? 'संपूर्ण खाते व्यवस्थापन व नोंदणी:' : 'Full account hub & signup:'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenLoginPage();
                      }}
                      className="font-bold text-amber-700 hover:text-amber-800 underline text-xs cursor-pointer flex items-center gap-1"
                    >
                      <span>{isMr ? 'लॉगिन पेज उघडा ➜' : 'Open Login Page ➜'}</span>
                    </button>
                  </div>
                )}
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

              {/* Google Sign-in / Sign-out Button */}
              {isAnonymous ? (
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoggingIn}
                  className="w-full py-2.5 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-850 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <LogIn className="w-4 h-4 text-amber-600" />
                  <span>{isLoggingIn ? (isMr ? 'लॉगिन होत आहे...' : 'Connecting...') : (isMr ? 'Google ने साइन इन करा (खाते सुरक्षित करा)' : 'Sign In with Google')}</span>
                </button>
              ) : (
                <button
                  onClick={handleSignOut}
                  className="w-full py-2 px-4 rounded-xl border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{isMr ? 'खाते साइन आउट करा' : 'Sign Out'}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
