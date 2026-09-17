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
import { AiMentorModal } from './components/AiMentorModal';
import { CloudSyncModal } from './components/CloudSyncModal';
import { SettingsModal } from './components/SettingsModal';
import { LegalModal } from './components/LegalModal';
import { AdBanner } from './components/AdBanner';
import { soundFx } from './utils/audio';
import { testFirestoreConnection, initAuthListener } from './lib/firebase';
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
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [userProgress, setUserProgress] = useState<UserProgress>(getInitialProgress);
  const [questions, setQuestions] = useState<Question[]>(MPSC_QUESTIONS);
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'subjects' | 'analytics' | 'bookmarks' | 'mentor'>('dashboard');
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

  // Firebase Auth and Cloud Sync state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isCloudSyncOpen, setIsCloudSyncOpen] = useState<boolean>(false);
  const [initialShowAddQuestion, setInitialShowAddQuestion] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  // Initialize Firebase Auth listener and real-time Firestore listeners on mount
  useEffect(() => {
    testFirestoreConnection();

    // 1. Subscribe to real-time questions bank from Firestore
    const unsubQuestions = subscribeToRealtimeQuestions((liveQuestions) => {
      if (liveQuestions && liveQuestions.length > 0) {
        setQuestions(liveQuestions);
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

  // Fetch all data from Firebase (questions + user results + study logs)
  const handleFetchFromFirebase = async () => {
    setIsFetchingData(true);
    try {
      // 1. Fetch questions from Firestore
      const qRes = await fetchMPSCQuestionsFromFirestore();
      if (qRes.questions && qRes.questions.length > 0) {
        setQuestions(qRes.questions);
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
      setSyncToast(msg);
      setTimeout(() => setSyncToast(null), 5000);
    } catch (err) {
      console.error('Fetch error:', err);
      const isMr = userProgress.preferredLanguage === 'mr';
      setSyncToast(isMr ? 'फायरबेस डेटा आणताना त्रुटी आली.' : 'Failed to fetch from Firebase.');
      setTimeout(() => setSyncToast(null), 4000);
    } finally {
      setIsFetchingData(false);
    }
  };

  // Trigger full sync and store to Firebase
  const handleTriggerSync = async () => {
    if (!currentUser?.uid) return;
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
      setSyncToast(msg);
      setTimeout(() => setSyncToast(null), 5000);
    } catch (err) {
      console.warn('Manual sync note:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Store a single new custom question directly to Firebase Firestore
  const handleStoreNewQuestion = async (newQ: Question): Promise<boolean> => {
    try {
      const success = await storeSingleQuestionToFirestore(newQ);
      if (success) {
        setQuestions((prev) => [newQ, ...prev]);
        const isMr = userProgress.preferredLanguage === 'mr';
        setSyncToast(isMr ? 'नवीन प्रश्न Firestore वर साठवला (Stored) गेला!' : 'New question stored to Firestore!');
        setTimeout(() => setSyncToast(null), 4000);
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
    try {
      const count = await seedMPSCQuestionsToFirestore();
      const isMr = userProgress.preferredLanguage === 'mr';
      setSyncToast(isMr ? `फायरबेसमध्ये ${count} प्रश्न यशस्वीपणे जोडले (Added) गेले!` : `Added ${count} questions to Firebase!`);
      setTimeout(() => setSyncToast(null), 4000);
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
    customQuestionIds?: string[]
  ) => {
    const session = createExamSession({
      patternId,
      subjectId,
      title,
      customQuestionIds,
      questionPool: questions,
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
            onOpenQuickMentor={() => handleOpenAiMentor()}
            onOpenCloudSync={() => setIsCloudSyncOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onToggleSoundEffects={handleToggleSoundEffects}
          />

          <main className="flex-1 pb-12">
            {currentTab === 'dashboard' && (
              <DashboardView
                userProgress={userProgress}
                language={userProgress.preferredLanguage}
                onStartExam={handleStartExam}
                onOpenBookmarks={() => setCurrentTab('bookmarks')}
                onOpenAnalytics={() => setCurrentTab('analytics')}
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
                questionsPool={questions}
              />
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
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        soundEffectsEnabled={userProgress.soundEffectsEnabled ?? true}
        onToggleSoundEffects={handleToggleSoundEffects}
        language={userProgress.preferredLanguage}
      />

      {/* Floating Firebase Sync Notification Toast */}
      {syncToast && (
        <div 
          id="firebase-sync-toast"
          className="fixed bottom-5 right-5 z-50 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-amber-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200 max-w-md"
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-xs font-semibold">
            {syncToast}
          </div>
        </div>
      )}
    </div>
  );
}
