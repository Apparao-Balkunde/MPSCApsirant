import React, { useState, useEffect } from 'react';
import { 
  getInitialProgress, 
  saveCompletedExam, 
  saveUserProgress,
  updateWeeklyGoals,
  addManualStudyLog
} from './utils/storage';
import { createExamSession } from './utils/examBuilder';
import { 
  ExamPatternId, 
  ExamResult, 
  ExamSession, 
  Question, 
  SubjectId, 
  SubjectScoreBreakdown, 
  UserProgress 
} from './types';
import { MPSC_QUESTIONS } from './data/mpscQuestions';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { ExamScreen } from './components/ExamScreen';
import { ExamResultView } from './components/ExamResultView';
import { AnalyticsView } from './components/AnalyticsView';
import { BookmarksView } from './components/BookmarksView';
import { SubjectPracticeView } from './components/SubjectPracticeView';
import { GrammarRulesView } from './components/GrammarRulesView';
import { AiMentorModal } from './components/AiMentorModal';
import { CloudSyncModal } from './components/CloudSyncModal';
import { LoginModal } from './components/LoginModal';
import { SettingsModal } from './components/SettingsModal';
import { LegalModal } from './components/LegalModal';
import { HardQuestionsHubModal } from './components/HardQuestionsHubModal';
import { AdBanner } from './components/AdBanner';
import { soundFx } from './utils/audio';
import { getHardQuestionsPool } from './utils/hardQuestionsEngine';
import { testFirestoreConnection, initAuthListener, trySsoLogin } from './lib/firebase';
import { 
  syncUserProgressToFirestore, 
  syncAllDataToFirestore,
  fetchMPSCQuestionsFromFirestore,
  fetchUserDataFromFirestore,
  storeSingleExamResultToFirestore,
  storeSingleStudyLogToFirestore,
  storeSingleQuestionToFirestore,
  seedMPSCQuestionsToFirestore,
  subscribeToRealtimeQuestions,
  subscribeToRealtimeUserData,
} from './services/firestoreSync';
import { type User } from 'firebase/auth';
import { CheckCircle2, RotateCcw, X, AlertCircle } from 'lucide-react';

interface SyncToastState {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  canUndo?: boolean;
  durationMs?: number;
}

export default function App() {
  const [userProgress, setUserProgress] = useState<UserProgress>(getInitialProgress);
  const [questions, setQuestions] = useState<Question[]>(MPSC_QUESTIONS);
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'subjects' | 'grammar' | 'analytics' | 'bookmarks' | 'mentor'>('dashboard');
  const [activeSession, setActiveSession] = useState<ExamSession | null>(null);
  const [activeResult, setActiveResult] = useState<ExamResult | null>(null);

  // AI Mentor modal state
  const [isAiMentorOpen, setIsAiMentorOpen] = useState<boolean>(false);
  const [mentorQuestion, setMentorQuestion] = useState<Question | null>(null);
  const [mentorStudentAnswer, setMentorStudentAnswer] = useState<string | undefined>();

  // Settings modal state
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Legal / AdSense policy modals
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'about' | null>(null);

  // 100k Hard Questions Hub modal state
  const [isHardQuestionsHubOpen, setIsHardQuestionsHubOpen] = useState<boolean>(false);

  // Firebase Auth and Cloud Sync state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isCloudSyncOpen, setIsCloudSyncOpen] = useState<boolean>(false);
  const [initialShowAddQuestion, setInitialShowAddQuestion] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [syncToast, setSyncToast] = useState<SyncToastState | null>(null);
  const [syncSnapshot, setSyncSnapshot] = useState<{
    userProgress: UserProgress;
    questions: Question[];
    actionDescription: string;
  } | null>(null);
  const toastTimeoutRef = React.useRef<any>(null);
  const toastStartTimeRef = React.useRef<number>(0);
  const toastRemainingTimeRef = React.useRef<number>(5000);
  const [isToastPaused, setIsToastPaused] = useState<boolean>(false);

  // Initialize Firebase Auth listener and real-time Firestore listeners on mount
  useEffect(() => {
    testFirestoreConnection();

    // 🔴 SSO — mpscsarathi.online वरून token सोबत आलं असेल तर आपोआप
    // login करणे. token नसेल तर काहीच होत नाही (आधीसारखंच guest राहतं).
    trySsoLogin();

    // 1. Subscribe to real-time questions bank from Firestore
    const unsubQuestions = subscribeToRealtimeQuestions((liveQuestions) => {
      if (liveQuestions && liveQuestions.length > 0) {
        // Merge with built-in MPSC_QUESTIONS by ID to preserve all 2,000+ Current Affairs questions
        const map = new Map<string, Question>();
        MPSC_QUESTIONS.forEach((q) => map.set(q.id, q));
        liveQuestions.forEach((q) => map.set(q.id, q));
        setQuestions(Array.from(map.values()));
      }
    });

    // 2. Auth state listener & fetch user data on login
    const unsubAuth = initAuthListener(async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          setIsSyncing(true);
          const res = await fetchUserDataFromFirestore(user.uid, userProgress);
          setUserProgress(res.progress);
        } catch (err) {
          console.warn('Initial Firestore user merge note:', err);
        } finally {
          setIsSyncing(false);
        }
      }
    });

    return () => {
      if (unsubQuestions) unsubQuestions();
      unsubAuth();
    };
  }, []);

  // Sync state to localStorage whenever userProgress changes
  useEffect(() => {
    saveUserProgress(userProgress);

    if (currentUser?.uid) {
      syncUserProgressToFirestore(
        currentUser.uid,
        userProgress,
        currentUser.email,
        currentUser.displayName
      );
    }
  }, [userProgress, currentUser]);

  // Show sync toast with optional Undo action and automatic timeout
  const showSyncToast = (
    message: string, 
    options?: { 
      type?: 'success' | 'info' | 'warning' | 'error'; 
      canUndo?: boolean; 
      durationMs?: number; 
    }
  ) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }

    const duration = options?.durationMs ?? 5000;
    toastRemainingTimeRef.current = duration;
    toastStartTimeRef.current = Date.now();
    setIsToastPaused(false);

    // Play subtle 'ding' alert chime when a new toast appears
    if (userProgress.soundEffectsEnabled ?? true) {
      soundFx.playDingSound();
    }

    setSyncToast({
      id: Date.now().toString(),
      message,
      type: options?.type || 'success',
      canUndo: options?.canUndo ?? false,
      durationMs: duration,
    });

    toastTimeoutRef.current = setTimeout(() => {
      setSyncToast(null);
      setIsToastPaused(false);
    }, duration);
  };

  // Pause timeout countdown when mouse hovers over notification toast
  const handleToastMouseEnter = () => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    const elapsed = Date.now() - toastStartTimeRef.current;
    toastRemainingTimeRef.current = Math.max(500, toastRemainingTimeRef.current - elapsed);
    setIsToastPaused(true);
  };

  // Resume countdown when mouse leaves notification toast
  const handleToastMouseLeave = () => {
    setIsToastPaused(false);
    if (!syncToast) return;
    toastStartTimeRef.current = Date.now();
    const remaining = Math.max(500, toastRemainingTimeRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setSyncToast(null);
      setIsToastPaused(false);
    }, remaining);
  };

  // Prominently dismiss the toast before timeout
  const handleDismissSyncToast = () => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    setIsToastPaused(false);
    setSyncToast(null);
  };

  // State revert / Undo handler for sync actions performed by mistake
  const handleUndoSync = async () => {
    if (!syncSnapshot) {
      handleDismissSyncToast();
      return;
    }

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    setIsToastPaused(false);

    try {
      const prevProgress = syncSnapshot.userProgress;
      const prevQuestions = syncSnapshot.questions;

      // Revert in-memory React states
      setUserProgress(prevProgress);
      setQuestions(prevQuestions);

      // Persist restored progress to local storage
      saveUserProgress(prevProgress);

      // If user is authenticated and performed a remote store/sync, re-sync restored state
      if (currentUser?.uid && (syncSnapshot.actionDescription === 'sync' || syncSnapshot.actionDescription === 'store_question')) {
        try {
          await syncUserProgressToFirestore(
            currentUser.uid,
            prevProgress,
            currentUser.email,
            currentUser.displayName
          );
        } catch (resyncErr) {
          console.warn('Revert sync to cloud warning:', resyncErr);
        }
      }

      setSyncSnapshot(null);

      if (prevProgress.soundEffectsEnabled ?? true) {
        soundFx.playToggleSound(true);
      }

      const isMr = prevProgress.preferredLanguage === 'mr';
      const undoNotice = isMr
        ? 'मागील सिंक कृती यशस्वीपणे पूर्ववत (Reverted) करण्यात आली!'
        : 'Sync action successfully undone and state restored!';

      showSyncToast(undoNotice, { type: 'info', canUndo: false, durationMs: 4000 });
    } catch (err) {
      console.error('Failed to revert sync:', err);
      const isMr = userProgress.preferredLanguage === 'mr';
      showSyncToast(isMr ? 'बदल पूर्ववत करताना त्रुटी आली.' : 'Failed to undo sync.', { type: 'error', canUndo: false, durationMs: 4000 });
    }
  };

  // Fetch all data from Firebase (questions + user results + study logs)
  const handleFetchFromFirebase = async () => {
    // Snapshot state before fetching for possible Undo revert
    setSyncSnapshot({
      userProgress: JSON.parse(JSON.stringify(userProgress)),
      questions: [...questions],
      actionDescription: 'fetch',
    });

    setIsFetchingData(true);
    try {
      // 1. Fetch questions from Firestore
      const qRes = await fetchMPSCQuestionsFromFirestore();
      if (qRes.questions && qRes.questions.length > 0) {
        const map = new Map<string, Question>();
        MPSC_QUESTIONS.forEach((q) => map.set(q.id, q));
        qRes.questions.forEach((q) => map.set(q.id, q));
        setQuestions(Array.from(map.values()));
      }

      // 2. Fetch user exam results and logs if logged in
      let userExams = userProgress.history.length;
      if (currentUser?.uid) {
        const uRes = await fetchUserDataFromFirestore(currentUser.uid, userProgress);
        setUserProgress(uRes.progress);
        userExams = uRes.examsCount;
      }

      const isMr = userProgress.preferredLanguage === 'mr';
      const msg = isMr
        ? `फायरबेसवरून डेटा यशस्वीरीत्या आणला (Fetch)! (${qRes.count} प्रश्न, ${userExams} चाचण्या)`
        : `Successfully fetched data from Firebase! (${qRes.count} questions, ${userExams} exams)`;
      showSyncToast(msg, { type: 'success', canUndo: true, durationMs: 5000 });
    } catch (err) {
      console.error('Fetch error:', err);
      const isMr = userProgress.preferredLanguage === 'mr';
      showSyncToast(isMr ? 'फायरबेस डेटा आणताना त्रुटी आली.' : 'Failed to fetch from Firebase.', { type: 'error', canUndo: false, durationMs: 4000 });
    } finally {
      setIsFetchingData(false);
    }
  };

  // Trigger full sync and store to Firebase
  const handleTriggerSync = async () => {
    if (!currentUser?.uid) return;

    // Snapshot state before sync
    setSyncSnapshot({
      userProgress: JSON.parse(JSON.stringify(userProgress)),
      questions: [...questions],
      actionDescription: 'sync',
    });

    setIsSyncing(true);
    try {
      const summary = await syncAllDataToFirestore(
        currentUser.uid,
        userProgress,
        currentUser.email,
        currentUser.displayName
      );
      
      const isMr = userProgress.preferredLanguage === 'mr';
      const msg = isMr
        ? `डेटा फायरबेसवर जतन झाला (Stored)! (${summary.examsStored} चाचण्या, ${summary.logsStored} नोंदी, ${summary.questionsStored} प्रश्नसंच)`
        : `Data stored on Firebase! (${summary.examsStored} exams, ${summary.logsStored} logs, ${summary.questionsStored} questions)`;
      showSyncToast(msg, { type: 'success', canUndo: true, durationMs: 5000 });
    } catch (err) {
      console.warn('Manual sync note:', err);
      const isMr = userProgress.preferredLanguage === 'mr';
      showSyncToast(isMr ? 'सिंक दरम्यान त्रुटी आली.' : 'Sync failed.', { type: 'error', canUndo: false, durationMs: 4000 });
    } finally {
      setIsSyncing(false);
    }
  };

  // Store a single new custom question directly to Firebase Firestore
  const handleStoreNewQuestion = async (newQ: Question): Promise<boolean> => {
    // Snapshot state before adding question
    setSyncSnapshot({
      userProgress: JSON.parse(JSON.stringify(userProgress)),
      questions: [...questions],
      actionDescription: 'store_question',
    });

    try {
      const success = await storeSingleQuestionToFirestore(newQ);
      if (success) {
        setQuestions((prev) => [newQ, ...prev]);
        const isMr = userProgress.preferredLanguage === 'mr';
        showSyncToast(
          isMr ? 'नवीन प्रश्न Firestore वर साठवला (Stored) गेला!' : 'New question stored to Firestore!',
          { type: 'success', canUndo: true, durationMs: 5000 }
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error('Store question error:', err);
      return false;
    }
  };

  // Seed / Add all standard questions to Firestore
  const handleSeedAllToFirebase = async (): Promise<number> => {
    setSyncSnapshot({
      userProgress: JSON.parse(JSON.stringify(userProgress)),
      questions: [...questions],
      actionDescription: 'seed',
    });

    try {
      const count = await seedMPSCQuestionsToFirestore();
      const isMr = userProgress.preferredLanguage === 'mr';
      showSyncToast(
        isMr ? `फायरबेसमध्ये ${count} प्रश्न यशस्वीपणे जोडले (Added) गेले!` : `Added ${count} questions to Firebase!`,
        { type: 'success', canUndo: true, durationMs: 5000 }
      );
      return count;
    } catch (err) {
      console.error('Seed all error:', err);
      return 0;
    }
  };

  // Language toggle handler
  const handleToggleLanguage = () => {
    const nextLang = userProgress.preferredLanguage === 'mr' ? 'en' : 'mr';
    setUserProgress((prev) => ({
      ...prev,
      preferredLanguage: nextLang,
    }));
  };

  // Start exam handler - uses active questions pool
  const handleStartExam = (
    patternId: ExamPatternId,
    subjectId?: SubjectId,
    title?: string,
    customQuestionIds?: string[],
    limit?: number
  ) => {
    const session = createExamSession({
      patternId,
      subjectId,
      title,
      customQuestionIds,
      limit,
      questionPool: questions,
    });
    setActiveResult(null);
    setActiveSession(session);
  };

  // 100k Hard Questions Challenge Handler
  const handleStartHardExam = (
    subjectId: SubjectId | 'all',
    count: number,
    title: string
  ) => {
    const hardQs = getHardQuestionsPool({
      subjectId: subjectId === 'all' ? 'all' : subjectId,
      count,
    });

    // Merge into questions state so all components find them
    setQuestions((prev) => {
      const map = new Map<string, Question>();
      prev.forEach((q) => map.set(q.id, q));
      hardQs.forEach((q) => map.set(q.id, q));
      return Array.from(map.values());
    });

    const session = createExamSession({
      patternId: 'hard_challenge',
      subjectId: subjectId === 'all' ? undefined : subjectId,
      title,
      limit: count,
      customQuestionIds: hardQs.map((q) => q.id),
      questionPool: [...questions, ...hardQs],
    });
    setActiveResult(null);
    setActiveSession(session);
  };

  // Exam submission & grading handler
  const handleSubmitExam = (session: ExamSession) => {
    const currentPool = questions;
    const examQuestions: Question[] = session.questionIds
      .map((id) => currentPool.find((q) => q.id === id) || MPSC_QUESTIONS.find((q) => q.id === id))
      .filter((q): q is Question => Boolean(q));

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    const subjectPerformance: Record<string, SubjectScoreBreakdown> = {};

    examQuestions.forEach((q) => {
      const userChoice = session.answers[q.id];
      const isAnswered = userChoice !== undefined;
      const isCorrect = isAnswered && userChoice === q.correctAnswerIndex;

      if (!subjectPerformance[q.subjectId]) {
        subjectPerformance[q.subjectId] = {
          total: 0,
          correct: 0,
          incorrect: 0,
          unattempted: 0,
          accuracy: 0,
          score: 0,
        };
      }

      const sub = subjectPerformance[q.subjectId];
      sub.total += 1;

      if (!isAnswered) {
        unattemptedCount += 1;
        sub.unattempted += 1;
      } else if (isCorrect) {
        correctCount += 1;
        sub.correct += 1;
      } else {
        incorrectCount += 1;
        sub.incorrect += 1;
      }
    });

    // Compute subject scores & accuracy
    Object.values(subjectPerformance).forEach((sub) => {
      const subAttempted = sub.correct + sub.incorrect;
      sub.accuracy = subAttempted > 0 ? Math.round((sub.correct / subAttempted) * 100) : 0;
      const subGross = sub.correct * session.marksPerQuestion;
      const subPenalty = sub.incorrect * session.marksPerQuestion * session.negativeMarkRate;
      sub.score = Math.max(0, subGross - subPenalty);
    });

    const attemptedCount = correctCount + incorrectCount;
    const grossScore = correctCount * session.marksPerQuestion;
    const negativePenalty = incorrectCount * session.marksPerQuestion * session.negativeMarkRate;
    const finalScore = Math.max(0, grossScore - negativePenalty);
    const maxScore = examQuestions.length * session.marksPerQuestion;
    const accuracyPercentage = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

    const timeSpentSeconds = session.durationSeconds - session.remainingSeconds;

    const dateStr = new Date().toLocaleDateString(
      userProgress.preferredLanguage === 'mr' ? 'mr-IN' : 'en-IN',
      { day: 'numeric', month: 'short', year: 'numeric' }
    );

    const result: ExamResult = {
      sessionId: session.id,
      title: session.title,
      patternId: session.patternId,
      totalQuestions: examQuestions.length,
      attemptedCount,
      correctCount,
      incorrectCount,
      unattemptedCount,
      grossScore,
      negativePenalty,
      finalScore,
      maxScore,
      accuracyPercentage,
      timeSpentSeconds,
      subjectPerformance,
      date: dateStr,
      answers: session.answers,
    };

    if (userProgress.soundEffectsEnabled ?? true) {
      soundFx.playExamSubmissionSound();
    }

    const updatedProgress = saveCompletedExam(result, userProgress);
    setUserProgress(updatedProgress);
    setActiveSession(session);
    setActiveResult(result);

    // Atomically store this exam result to Firebase in real-time
    if (currentUser?.uid) {
      storeSingleExamResultToFirestore(currentUser.uid, result, updatedProgress);
    }
  };

  // Toggle sound effects setting
  const handleToggleSoundEffects = () => {
    setUserProgress((prev) => {
      const current = prev.soundEffectsEnabled ?? true;
      const updated = {
        ...prev,
        soundEffectsEnabled: !current,
      };
      saveUserProgress(updated);
      if (currentUser?.uid) {
        syncUserProgressToFirestore(currentUser.uid, updated);
      }
      return updated;
    });
  };

  // Toggle bookmark handler
  const handleToggleBookmark = (questionId: string) => {
    setUserProgress((prev) => {
      const isBookmarked = prev.bookmarkedQuestionIds.includes(questionId);
      const updatedBookmarks = isBookmarked
        ? prev.bookmarkedQuestionIds.filter((id) => id !== questionId)
        : [...prev.bookmarkedQuestionIds, questionId];

      return {
        ...prev,
        bookmarkedQuestionIds: updatedBookmarks,
      };
    });
  };

  // Toggle grammar rule bookmark handler
  const handleToggleRuleBookmark = (ruleId: string) => {
    setUserProgress((prev) => {
      const existing = prev.bookmarkedRuleIds || [];
      const isBookmarked = existing.includes(ruleId);
      const updatedRules = isBookmarked
        ? existing.filter((id) => id !== ruleId)
        : [...existing, ruleId];

      const next = {
        ...prev,
        bookmarkedRuleIds: updatedRules,
      };
      saveUserProgress(next);
      return next;
    });
  };

  // Save personal revision note for a question
  const handleSaveNote = (questionId: string, noteText: string) => {
    setUserProgress((prev) => ({
      ...prev,
      notes: {
        ...prev.notes,
        [questionId]: noteText,
      },
    }));
  };

  // Open AI Mentor
  const handleOpenAiMentor = (question?: Question, studentAnswer?: string) => {
    setMentorQuestion(question || null);
    setMentorStudentAnswer(studentAnswer);
    setIsAiMentorOpen(true);
  };

  // Update weekly goals
  const handleUpdateWeeklyGoals = (hours: number, questionsCount: number) => {
    setUserProgress((prev) => updateWeeklyGoals(prev, hours, questionsCount));
  };

  // Log study session - also stores single log to Firestore
  const handleLogStudySession = (
    title: string,
    durationMinutes: number,
    questionsSolved: number,
    notes?: string
  ) => {
    setUserProgress((prev) => {
      const next = addManualStudyLog(prev, title, durationMinutes, questionsSolved, notes);
      const newestLog = next.studyLogs?.[0];
      if (newestLog && currentUser?.uid) {
        storeSingleStudyLogToFirestore(currentUser.uid, newestLog);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col antialiased">
      {/* If taking an active exam, show ExamScreen */}
      {activeSession && !activeResult ? (
        <ExamScreen
          session={activeSession}
          onUpdateSession={(updater) =>
            setActiveSession((prev) =>
              !prev ? null : typeof updater === 'function' ? updater(prev) : updater
            )
          }
          onSubmitExam={handleSubmitExam}
          onExitExam={() => setActiveSession(null)}
          bookmarkedIds={userProgress.bookmarkedQuestionIds}
          onToggleBookmark={handleToggleBookmark}
          preferredLanguage={userProgress.preferredLanguage}
          soundEffectsEnabled={userProgress.soundEffectsEnabled ?? true}
          onToggleSoundEffects={handleToggleSoundEffects}
          questionsPool={questions}
        />
      ) : activeResult && activeSession ? (
        /* Exam Result & Review View */
        <div className="flex-1 flex flex-col">
          <Header
            currentTab={currentTab}
            onSelectTab={(tab) => {
              setActiveResult(null);
              setActiveSession(null);
              setCurrentTab(tab);
            }}
            language={userProgress.preferredLanguage}
            onToggleLanguage={handleToggleLanguage}
            userProgress={userProgress}
            currentUser={currentUser}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            onOpenQuickMentor={() => handleOpenAiMentor()}
            onOpenCloudSync={() => setIsCloudSyncOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onToggleSoundEffects={handleToggleSoundEffects}
          />
          <main className="flex-1">
            <ExamResultView
              result={activeResult}
              session={activeSession}
              onRetakeExam={() => handleStartExam(activeSession.patternId, undefined, activeSession.title, activeSession.questionIds)}
              onGoHome={() => {
                setActiveResult(null);
                setActiveSession(null);
                setCurrentTab('dashboard');
              }}
              language={userProgress.preferredLanguage}
              bookmarkedIds={userProgress.bookmarkedQuestionIds}
              onToggleBookmark={handleToggleBookmark}
              onOpenAiMentor={(q, ans) => handleOpenAiMentor(q, ans)}
              questionsPool={questions}
            />
          </main>
        </div>
      ) : (
        /* Regular App Shell */
        <div className="flex-1 flex flex-col">
          <Header
            currentTab={currentTab}
            onSelectTab={(tab) => {
              if (tab === 'mentor') {
                handleOpenAiMentor();
              } else {
                setCurrentTab(tab);
              }
            }}
            language={userProgress.preferredLanguage}
            onToggleLanguage={handleToggleLanguage}
            userProgress={userProgress}
            currentUser={currentUser}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            onOpenQuickMentor={() => handleOpenAiMentor()}
            onOpenCloudSync={() => setIsCloudSyncOpen(true)}
            onOpenAddQuestion={() => {
              setInitialShowAddQuestion(true);
              setIsCloudSyncOpen(true);
            }}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onToggleSoundEffects={handleToggleSoundEffects}
            onOpenHardQuestionsHub={() => setIsHardQuestionsHubOpen(true)}
          />

          <main className="flex-1 pb-12">
            {currentTab === 'dashboard' && (
              <DashboardView
                userProgress={userProgress}
                language={userProgress.preferredLanguage}
                onStartExam={handleStartExam}
                onOpenBookmarks={() => setCurrentTab('bookmarks')}
                onOpenAnalytics={() => setCurrentTab('analytics')}
                onOpenGrammarRules={() => setCurrentTab('grammar')}
                onUpdateWeeklyGoals={handleUpdateWeeklyGoals}
                onLogStudySession={handleLogStudySession}
                onOpenCloudSync={() => {
                  setInitialShowAddQuestion(false);
                  setIsCloudSyncOpen(true);
                }}
                onOpenAddQuestion={() => {
                  setInitialShowAddQuestion(true);
                  setIsCloudSyncOpen(true);
                }}
                onOpenHardQuestionsHub={() => setIsHardQuestionsHubOpen(true)}
                onFetchData={handleFetchFromFirebase}
                onTriggerSync={handleTriggerSync}
                questionsCount={questions.length}
                questionsPool={questions}
                isFetching={isFetchingData}
                isSyncing={isSyncing}
                currentUserId={currentUser?.uid}
                currentUserName={currentUser?.displayName || currentUser?.email || 'MPSC Aspirant'}
              />
            )}

            {currentTab === 'subjects' && (
              <SubjectPracticeView
                language={userProgress.preferredLanguage}
                onStartSubjectExam={(subId, title) => handleStartExam('custom', subId, title)}
                onOpenGrammarRules={() => setCurrentTab('grammar')}
                onOpenHardQuestionsHub={(subId) => setIsHardQuestionsHubOpen(true)}
                questionsPool={questions}
              />
            )}

            {currentTab === 'grammar' && (
              <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <GrammarRulesView
                  savedRuleIds={userProgress.bookmarkedRuleIds || []}
                  onToggleBookmark={handleToggleRuleBookmark}
                  onStartPracticeWithQuestions={(qIds, title) => {
                    handleStartExam('custom', undefined, title, qIds);
                  }}
                />
              </main>
            )}

            {currentTab === 'analytics' && (
              <AnalyticsView
                userProgress={userProgress}
                language={userProgress.preferredLanguage}
                onReviewPastTest={(result) => {
                  const reconstructedSession: ExamSession = {
                    id: result.sessionId,
                    title: result.title,
                    patternId: result.patternId,
                    questionIds: Object.keys(result.answers),
                    totalQuestions: result.totalQuestions,
                    durationSeconds: result.timeSpentSeconds,
                    remainingSeconds: 0,
                    negativeMarkRate: 0.25,
                    marksPerQuestion: result.maxScore / (result.totalQuestions || 1),
                    answers: result.answers,
                    markedForReview: {},
                    visited: {},
                    timeSpent: {},
                    isCompleted: true,
                    startedAt: Date.now(),
                  };
                  setActiveSession(reconstructedSession);
                  setActiveResult(result);
                }}
                onStartSubjectPractice={(subId) => handleStartExam('custom', subId)}
              />
            )}

            {currentTab === 'bookmarks' && (
              <BookmarksView
                userProgress={userProgress}
                language={userProgress.preferredLanguage}
                onToggleBookmark={handleToggleBookmark}
                onStartCustomExam={(qIds, title) => handleStartExam('custom', undefined, title, qIds)}
                onOpenAiMentor={(q) => handleOpenAiMentor(q)}
                onSaveNote={handleSaveNote}
                questionsPool={questions}
              />
            )}

            {/* Bottom Advertisement Banner */}
            <div className="pt-4 pb-2">
              <AdBanner slot="8635186039" />
            </div>

            {/* Portal Footer with Google AdSense Required Policy Links */}
            <footer className="mt-8 pt-6 pb-12 border-t border-stone-200 text-center text-xs text-stone-500">
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-medium text-stone-600 mb-3">
                <button
                  onClick={() => setLegalModalType('privacy')}
                  className="hover:text-amber-600 underline transition-colors"
                >
                  {userProgress.preferredLanguage === 'mr' ? 'गोपनीयता धोरण (Privacy Policy)' : 'Privacy Policy'}
                </button>
                <span>•</span>
                <button
                  onClick={() => setLegalModalType('terms')}
                  className="hover:text-amber-600 underline transition-colors"
                >
                  {userProgress.preferredLanguage === 'mr' ? 'वापराच्या अटी (Terms)' : 'Terms of Service'}
                </button>
                <span>•</span>
                <button
                  onClick={() => setLegalModalType('about')}
                  className="hover:text-amber-600 underline transition-colors"
                >
                  {userProgress.preferredLanguage === 'mr' ? 'आमच्याबद्दल (About Us)' : 'About Us'}
                </button>
                <span>•</span>
                <a
                  href="https://mpscsarathi.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-600 transition-colors"
                >
                  MPSC Sarathi Main Portal
                </a>
              </div>
              <p>
                © {new Date().getFullYear()} MPSC Sarathi Online • सर्व हक्क राखीव. Dedicated to MPSC & Civil Service Aspirants.
              </p>
            </footer>
          </main>
        </div>
      )}

      {/* Legal and AdSense Policy Modal */}
      <LegalModal
        isOpen={Boolean(legalModalType)}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* AI Mentor Doubt Solver Modal */}
      {isAiMentorOpen && (
        <AiMentorModal
          question={mentorQuestion}
          studentAnswer={mentorStudentAnswer}
          language={userProgress.preferredLanguage}
          onClose={() => {
            setIsAiMentorOpen(false);
            setMentorQuestion(null);
            setMentorStudentAnswer(undefined);
          }}
        />
      )}

      {/* Firebase Cloud Sync Modal */}
      <CloudSyncModal
        isOpen={isCloudSyncOpen}
        onClose={() => {
          setIsCloudSyncOpen(false);
          setInitialShowAddQuestion(false);
        }}
        currentUser={currentUser}
        userProgress={userProgress}
        onTriggerSync={handleTriggerSync}
        onFetchData={handleFetchFromFirebase}
        onStoreNewQuestion={handleStoreNewQuestion}
        onSeedAllToFirebase={handleSeedAllToFirebase}
        isSyncing={isSyncing}
        isFetching={isFetchingData}
        language={userProgress.preferredLanguage}
        questionsCount={questions.length}
        initialShowAddQuestion={initialShowAddQuestion}
        onOpenLoginPage={() => {
          setIsCloudSyncOpen(false);
          setIsLoginModalOpen(true);
        }}
      />

      {/* Firebase Auth Login & Account Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={currentUser}
        userProgress={userProgress}
        language={userProgress.preferredLanguage}
        onTriggerSync={handleTriggerSync}
        onOpenCloudSync={() => {
          setIsLoginModalOpen(false);
          setIsCloudSyncOpen(true);
        }}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        soundEffectsEnabled={userProgress.soundEffectsEnabled ?? true}
        onToggleSoundEffects={handleToggleSoundEffects}
        language={userProgress.preferredLanguage}
      />

      {/* 100k Hard Questions Hub Modal */}
      <HardQuestionsHubModal
        isOpen={isHardQuestionsHubOpen}
        onClose={() => setIsHardQuestionsHubOpen(false)}
        language={userProgress.preferredLanguage}
        onStartHardExam={handleStartHardExam}
      />

      {/* Floating Firebase Sync Notification Toast with Undo, Dismiss, and Pause on Hover */}
      {syncToast && (
        <aside 
          id="firebase-sync-toast"
          role="status"
          aria-live="polite"
          onMouseEnter={handleToastMouseEnter}
          onMouseLeave={handleToastMouseLeave}
          className={`group fixed bottom-5 right-5 z-50 bg-stone-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200 max-w-md w-[calc(100vw-2.5rem)] sm:w-auto min-w-[320px] transition-all cursor-default ${
            isToastPaused ? 'border-amber-400 shadow-amber-500/10' : 'border-amber-500/50'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                syncToast.type === 'error'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : syncToast.type === 'info'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {syncToast.type === 'error' ? (
                  <AlertCircle className="w-4 h-4" />
                ) : syncToast.type === 'info' ? (
                  <RotateCcw className="w-4 h-4" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
              </div>
              <div className="text-xs font-semibold text-stone-100 leading-relaxed pt-1">
                {syncToast.message}
              </div>
            </div>

            {/* Quick close button in corner */}
            <button
              id="btn-close-sync-toast-icon"
              type="button"
              onClick={handleDismissSyncToast}
              aria-label={userProgress.preferredLanguage === 'mr' ? 'सूचना बंद करा' : 'Close notification'}
              className="p-1 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action Buttons: Prominent Undo & Dismiss Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-800">
            {syncToast.canUndo && (
              <button
                id="btn-undo-sync-toast"
                type="button"
                onClick={handleUndoSync}
                className="group/undo inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/35 text-amber-300 hover:text-amber-100 border border-amber-500/40 hover:border-amber-400 text-xs font-bold transition-all duration-200 shadow-xs cursor-pointer active:scale-95 hover:animate-undo-pulse hover:shadow-[0_0_14px_rgba(245,158,11,0.45)] ring-amber-400/20 hover:ring-2"
              >
                <RotateCcw className="w-3.5 h-3.5 transition-transform duration-300 group-hover/undo:-rotate-45 group-hover/undo:scale-110 text-amber-300 group-hover/undo:text-amber-100" />
                <span className="tracking-tight">
                  {userProgress.preferredLanguage === 'mr' ? 'पूर्ववत करा (Undo)' : 'Undo'}
                </span>
              </button>
            )}

            {/* Prominent Close / Dismiss Button */}
            <button
              id="btn-dismiss-sync-toast"
              type="button"
              onClick={handleDismissSyncToast}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 text-xs font-bold transition-colors cursor-pointer active:scale-95"
            >
              <X className="w-3.5 h-3.5" />
              <span>
                {userProgress.preferredLanguage === 'mr' ? 'बंद करा (Dismiss)' : 'Dismiss'}
              </span>
            </button>
          </div>

          {/* Visual countdown progress bar with pause on hover */}
          <div className="space-y-1.5 pt-0.5">
            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
              <div 
                key={syncToast.id}
                className="bg-amber-500 h-full rounded-full animate-toast-progress transition-colors"
                style={{
                  animationDuration: `${syncToast.durationMs || 5000}ms`,
                  animationPlayState: isToastPaused ? 'paused' : 'running',
                }}
              />
            </div>
            {isToastPaused && (
              <div className="flex items-center justify-between text-[10px] text-amber-400 font-medium pt-0.5 animate-in fade-in duration-150">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  <span>
                    {userProgress.preferredLanguage === 'mr' ? 'माउस कर्सरमुळे टाइमर थांबवला आहे (Paused)' : 'Timer paused on hover'}
                  </span>
                </span>
                <span className="text-stone-400 text-[10px]">
                  {userProgress.preferredLanguage === 'mr' ? 'कर्सर बाजूला घ्या' : 'Leave to resume'}
                </span>
              </div>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}
