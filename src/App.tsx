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

export default function App() {
  const [userProgress, setUserProgress] = useState<UserProgress>(getInitialProgress);
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'subjects' | 'analytics' | 'bookmarks' | 'mentor'>('dashboard');
  const [activeSession, setActiveSession] = useState<ExamSession | null>(null);
  const [activeResult, setActiveResult] = useState<ExamResult | null>(null);

  // AI Mentor modal state
  const [isAiMentorOpen, setIsAiMentorOpen] = useState<boolean>(false);
  const [mentorQuestion, setMentorQuestion] = useState<Question | null>(null);
  const [mentorStudentAnswer, setMentorStudentAnswer] = useState<string | undefined>();

  // Sync state to localStorage whenever userProgress changes
  useEffect(() => {
    saveUserProgress(userProgress);
  }, [userProgress]);

  // Language toggle handler
  const handleToggleLanguage = () => {
    const nextLang = userProgress.preferredLanguage === 'mr' ? 'en' : 'mr';
    setUserProgress((prev) => ({
      ...prev,
      preferredLanguage: nextLang,
    }));
  };

  // Start exam handler
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
    });
    setActiveResult(null);
    setActiveSession(session);
  };

  // Exam submission & grading handler
  const handleSubmitExam = (session: ExamSession) => {
    const questions: Question[] = session.questionIds
      .map((id) => MPSC_QUESTIONS.find((q) => q.id === id))
      .filter((q): q is Question => Boolean(q));

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    const subjectPerformance: Record<string, SubjectScoreBreakdown> = {};

    questions.forEach((q) => {
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
    const maxScore = questions.length * session.marksPerQuestion;
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
      totalQuestions: questions.length,
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

    const updatedProgress = saveCompletedExam(result, userProgress);
    setUserProgress(updatedProgress);
    setActiveSession(session);
    setActiveResult(result);
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
  const handleUpdateWeeklyGoals = (hours: number, questions: number) => {
    setUserProgress((prev) => updateWeeklyGoals(prev, hours, questions));
  };

  // Log study session
  const handleLogStudySession = (
    title: string,
    durationMinutes: number,
    questionsSolved: number,
    notes?: string
  ) => {
    setUserProgress((prev) =>
      addManualStudyLog(prev, title, durationMinutes, questionsSolved, notes)
    );
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
              />
            )}

            {currentTab === 'subjects' && (
              <SubjectPracticeView
                language={userProgress.preferredLanguage}
                onStartSubjectExam={(subId, title) => handleStartExam('custom', subId, title)}
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
              />
            )}
          </main>
        </div>
      )}

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
    </div>
  );
}
