import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Bookmark, 
  CheckCircle2, 
  HelpCircle, 
  Languages, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  RotateCcw,
  AlertTriangle,
  Play,
  Pause,
  X,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';
import { ExamSession, Question } from '../types';
import { MPSC_QUESTIONS } from '../data/mpscQuestions';
import { SUBJECTS } from '../data/subjects';
import { soundFx } from '../utils/audio';
import { findQuestionById } from '../utils/hardQuestionsEngine';

interface ExamScreenProps {
  session: ExamSession;
  onUpdateSession: (updater: ExamSession | ((prev: ExamSession) => ExamSession)) => void;
  onSubmitExam: (session: ExamSession) => void;
  onExitExam: () => void;
  bookmarkedIds: string[];
  onToggleBookmark: (questionId: string) => void;
  preferredLanguage: 'mr' | 'en';
  soundEffectsEnabled?: boolean;
  onToggleSoundEffects?: () => void;
  questionsPool?: Question[];
}

export const ExamScreen: React.FC<ExamScreenProps> = ({
  session,
  onUpdateSession,
  onSubmitExam,
  onExitExam,
  bookmarkedIds,
  onToggleBookmark,
  preferredLanguage,
  soundEffectsEnabled = true,
  onToggleSoundEffects,
  questionsPool,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questionLang, setQuestionLang] = useState<'mr' | 'en'>(preferredLanguage);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showPaletteMobile, setShowPaletteMobile] = useState<boolean>(false);
  const [soundFeedbackText, setSoundFeedbackText] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasPlayed5MinWarning = useRef<boolean>(false);

  const pool = questionsPool && questionsPool.length > 0 ? questionsPool : MPSC_QUESTIONS;
  const uniqueQuestionIds = Array.from(new Set(session.questionIds));
  const seenIds = new Set<string>();
  const questions: Question[] = [];
  uniqueQuestionIds.forEach((id) => {
    const q = findQuestionById(id, pool);
    if (q && !seenIds.has(q.id)) {
      seenIds.add(q.id);
      questions.push(q);
    }
  });

  const currentQuestion = questions[currentQuestionIndex];

  // Sync language when preferred language updates
  useEffect(() => {
    setQuestionLang(preferredLanguage);
  }, [preferredLanguage]);

  // Mark current question as visited
  useEffect(() => {
    if (currentQuestion && !session.visited[currentQuestion.id]) {
      onUpdateSession({
        ...session,
        visited: {
          ...session.visited,
          [currentQuestion.id]: true,
        },
      });
    }
  }, [currentQuestionIndex]);

  // Countdown timer
  useEffect(() => {
    if (session.isCompleted || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      onUpdateSession((prev) => {
        if (prev.remainingSeconds <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          if (soundEffectsEnabled) {
            soundFx.playTimerCompletionSound();
          }
          onSubmitExam({
            ...prev,
            remainingSeconds: 0,
            isCompleted: true,
            completedAt: Date.now(),
          });
          return { ...prev, remainingSeconds: 0, isCompleted: true };
        }

        // 5-minute remaining subtle audio warning
        if (prev.remainingSeconds === 300 && !hasPlayed5MinWarning.current) {
          hasPlayed5MinWarning.current = true;
          if (soundEffectsEnabled) {
            soundFx.playLowTimeWarningSound();
          }
        }

        // Track time spent on current question
        const currentQId = questions[currentQuestionIndex]?.id;
        const updatedTimeSpent = { ...(prev.timeSpent || {}) };
        if (currentQId) {
          updatedTimeSpent[currentQId] = (updatedTimeSpent[currentQId] || 0) + 1;
        }

        return {
          ...prev,
          remainingSeconds: prev.remainingSeconds - 1,
          timeSpent: updatedTimeSpent,
        };
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentQuestionIndex, session.isCompleted, soundEffectsEnabled]);

  // Format time (MM:SS or HH:MM:SS)
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQuestion) return;
    const updatedAnswers = { ...session.answers, [currentQuestion.id]: optionIndex };
    onUpdateSession({
      ...session,
      answers: updatedAnswers,
    });
  };

  const handleClearResponse = () => {
    if (!currentQuestion) return;
    const updatedAnswers = { ...session.answers };
    delete updatedAnswers[currentQuestion.id];
    onUpdateSession({
      ...session,
      answers: updatedAnswers,
    });
  };

  const handleToggleMarkReview = () => {
    if (!currentQuestion) return;
    const isMarked = session.markedForReview[currentQuestion.id];
    const updatedMarked = { ...session.markedForReview, [currentQuestion.id]: !isMarked };
    onUpdateSession({
      ...session,
      markedForReview: updatedMarked,
    });
  };

  const handleSaveAndNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Status calculation for each question in palette
  const getQuestionStatus = (qId: string) => {
    const isAnswered = session.answers[qId] !== undefined;
    const isMarked = session.markedForReview[qId];
    const isVisited = session.visited[qId];

    if (isAnswered && isMarked) return 'answered_marked';
    if (isMarked) return 'marked';
    if (isAnswered) return 'answered';
    if (isVisited) return 'unanswered';
    return 'not_visited';
  };

  const answeredCount = Object.keys(session.answers).length;
  const markedCount = Object.values(session.markedForReview).filter(Boolean).length;
  const notAttemptedCount = questions.length - answeredCount;

  const currentSubjectMeta = SUBJECTS.find((s) => s.id === currentQuestion?.subjectId);

  // Negative mark calculation display
  const penaltyPerWrong = (session.marksPerQuestion * session.negativeMarkRate).toFixed(2);

  // Time thresholds for visual countdown timer
  const isUnder5Minutes = session.remainingSeconds <= 300 && session.remainingSeconds > 60;
  const isUnder1Minute = session.remainingSeconds <= 60 && session.remainingSeconds > 0;
  const isTimerCritical = isUnder1Minute;

  // Percentage of remaining time for visual countdown bar
  const totalDuration = session.durationSeconds || 900;
  const timePercent = Math.max(0, Math.min(100, (session.remainingSeconds / totalDuration) * 100));

  const handleToggleSound = () => {
    const nextState = !soundEffectsEnabled;
    if (onToggleSoundEffects) {
      onToggleSoundEffects();
    }
    soundFx.playToggleSound(nextState);
    setSoundFeedbackText(
      nextState
        ? (questionLang === 'mr' ? 'ध्वनी: सुरू (ON)' : 'Sound: ON')
        : (questionLang === 'mr' ? 'ध्वनी: बंद (Muted)' : 'Sound: Muted')
    );
    setTimeout(() => {
      setSoundFeedbackText(null);
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col select-none">
      {/* Test Engine Header */}
      <header className="bg-stone-900 text-stone-100 border-b border-stone-800 px-4 py-2.5 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left info */}
          <div className="flex items-center gap-3">
            <button
              onClick={onExitExam}
              className="text-xs px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium border border-stone-700 cursor-pointer"
            >
              {questionLang === 'mr' ? 'बाहेर पडा' : 'Exit'}
            </button>
            <div>
              <h1 className="font-bold text-sm sm:text-base text-stone-100 truncate max-w-[200px] sm:max-w-md">
                {session.title}
              </h1>
              <div className="flex items-center gap-2 text-[11px] text-stone-400">
                <span>
                  {questionLang === 'mr' ? 'गुण' : 'Marks'}: +{session.marksPerQuestion} | -{penaltyPerWrong}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">
                  {questionLang === 'mr' ? 'प्रश्न' : 'Q'}: {currentQuestionIndex + 1} / {questions.length}
                </span>
              </div>
            </div>
          </div>

          {/* Center/Right Timer & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Visual countdown timer pill with subtle color change under 5 minutes */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono font-bold text-sm sm:text-base transition-colors duration-300 ${
                isUnder1Minute
                  ? 'bg-rose-950/85 border-rose-500 text-rose-300 ring-1 ring-rose-500/50 animate-pulse'
                  : isUnder5Minutes
                  ? 'bg-amber-950/70 border-amber-500/80 text-amber-300 ring-1 ring-amber-500/30'
                  : 'bg-stone-800 border-stone-700 text-amber-400'
              }`}
              title={
                isUnder1Minute
                  ? (questionLang === 'mr' ? 'अंतिम १ मिनिट उरले आहे!' : 'Final minute!')
                  : isUnder5Minutes
                  ? (questionLang === 'mr' ? 'वेळ कमी उरला आहे (५ मिनिटांपेक्षा कमी)' : 'Time running low (under 5 minutes)')
                  : (questionLang === 'mr' ? 'चाचणी वेळ' : 'Exam Timer')
              }
            >
              <Clock className={`w-4 h-4 ${
                isUnder1Minute ? 'text-rose-400' : isUnder5Minutes ? 'text-amber-300' : 'text-amber-400'
              }`} />
              
              <span>{formatTime(session.remainingSeconds)}</span>

              {isUnder5Minutes && (
                <span className="text-[10px] font-sans font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30 hidden sm:inline">
                  &lt; 5m
                </span>
              )}

              <button
                onClick={() => setIsPaused(!isPaused)}
                title={isPaused ? 'Resume Timer' : 'Pause Timer'}
                className="ml-1 p-0.5 hover:text-white cursor-pointer"
              >
                {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Sound effects toggle with visual feedback */}
            <div className="relative">
              <button
                id="btn-exam-sound-toggle"
                onClick={handleToggleSound}
                className={`p-2 rounded-lg border text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  soundEffectsEnabled
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 hover:bg-amber-500/25'
                    : 'bg-stone-800 border-stone-700 text-stone-400 hover:bg-stone-700'
                }`}
                title={
                  soundEffectsEnabled
                    ? (questionLang === 'mr' ? 'ध्वनी प्रभाव: सुरू (म्यूट करण्यासाठी क्लिक करा)' : 'Sound effects: ON (click to mute)')
                    : (questionLang === 'mr' ? 'ध्वनी प्रभाव: बंद (सुरू करण्यासाठी क्लिक करा)' : 'Sound effects: Muted (click to enable)')
                }
              >
                {soundEffectsEnabled ? (
                  <Volume2 className="w-4 h-4 text-amber-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-stone-400" />
                )}
              </button>

              {soundFeedbackText && (
                <div className="absolute right-0 -bottom-8 whitespace-nowrap bg-stone-900 border border-amber-500/60 text-amber-300 px-2.5 py-1 rounded-md text-[11px] font-bold shadow-xl animate-in fade-in zoom-in-95 duration-150 pointer-events-none z-50">
                  {soundFeedbackText}
                </div>
              )}
            </div>

            {/* Language Switch for active question */}
            <button
              onClick={() => setQuestionLang(questionLang === 'mr' ? 'en' : 'mr')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-lg text-xs font-bold text-stone-200 cursor-pointer"
              title="Toggle current question language"
            >
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span>{questionLang === 'mr' ? 'English' : 'मराठी'}</span>
            </button>

            {/* Mobile palette trigger */}
            <button
              onClick={() => setShowPaletteMobile(!showPaletteMobile)}
              className="lg:hidden px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-lg text-xs font-semibold text-amber-300 cursor-pointer"
            >
              {questionLang === 'mr' ? 'तालिका' : 'Grid'}
            </button>

            {/* Final Submit Button */}
            <button
              id="btn-submit-exam"
              onClick={() => setShowSubmitModal(true)}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{questionLang === 'mr' ? 'चाचणी सबमिट करा' : 'Submit'}</span>
            </button>
          </div>
        </div>

        {/* Visual Countdown Progress Bar directly beneath header */}
        <div className="h-1 w-full bg-stone-800/80 -mx-4 mt-2.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${
              isUnder1Minute
                ? 'bg-rose-500'
                : isUnder5Minutes
                ? 'bg-amber-400'
                : 'bg-amber-500'
            }`}
            style={{ width: `${timePercent}%` }}
          />
        </div>
      </header>

      {/* Paused Overlay */}
      {isPaused && (
        <div className="bg-amber-100 border-b border-amber-300 px-4 py-2 text-center text-xs font-bold text-amber-900 flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-700" />
          <span>
            {questionLang === 'mr'
              ? 'परीक्षा थांबवली आहे (Timer Paused). सुरू करण्यासाठी प्ले बटण दाबा.'
              : 'Test paused. Click the play button to resume the timer.'}
          </span>
        </div>
      )}

      {/* Main Examination Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left / Center: Active Question Canvas */}
        <main className="lg:col-span-8 flex flex-col bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          {/* Question Title Bar */}
          <div className="bg-stone-50 border-b border-stone-200 px-4 sm:px-6 py-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-stone-900 text-white font-bold text-xs px-2.5 py-1 rounded-md">
                {questionLang === 'mr' ? 'प्रश्न क्र.' : 'Question'} {currentQuestionIndex + 1}
              </span>
              {currentSubjectMeta && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-200 text-stone-700">
                  {questionLang === 'mr' ? currentSubjectMeta.nameMr : currentSubjectMeta.nameEn}
                </span>
              )}
              {currentQuestion?.topic && (
                <span className="hidden sm:inline text-xs text-stone-500">
                  • {currentQuestion.topic}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Bookmark Question */}
              <button
                id="btn-bookmark-question"
                onClick={() => currentQuestion && onToggleBookmark(currentQuestion.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors cursor-pointer ${
                  currentQuestion && bookmarkedIds.includes(currentQuestion.id)
                    ? 'bg-amber-50 text-amber-700 border-amber-300'
                    : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${currentQuestion && bookmarkedIds.includes(currentQuestion.id) ? 'fill-amber-600 text-amber-600' : ''}`} />
                <span>
                  {currentQuestion && bookmarkedIds.includes(currentQuestion.id)
                    ? (questionLang === 'mr' ? 'जतन केले' : 'Saved')
                    : (questionLang === 'mr' ? 'जतन करा' : 'Bookmark')}
                </span>
              </button>

              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                +{session.marksPerQuestion} / -{penaltyPerWrong}
              </span>
            </div>
          </div>

          {/* Question Text Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            {currentQuestion ? (
              <div className="space-y-5">
                {/* Text Content */}
                <div className="text-base sm:text-lg font-medium text-stone-900 leading-relaxed whitespace-pre-line">
                  {questionLang === 'mr' ? currentQuestion.questionMr : currentQuestion.questionEn}
                </div>

                {/* Multiple Options (1, 2, 3, 4) */}
                <div className="space-y-3 pt-2">
                  {(questionLang === 'mr' ? currentQuestion.optionsMr : currentQuestion.optionsEn).map(
                    (optionText, idx) => {
                      const isSelected = session.answers[currentQuestion.id] === idx;
                      return (
                        <label
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50/60 shadow-xs'
                              : 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50/50'
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-colors ${
                              isSelected
                                ? 'bg-amber-600 text-white'
                                : 'border-2 border-stone-300 text-stone-600'
                            }`}
                          >
                            {idx + 1}
                          </div>
                          <span className="text-sm sm:text-base text-stone-800 font-medium leading-normal flex-1">
                            {optionText}
                          </span>
                        </label>
                      );
                    }
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-stone-500">
                {questionLang === 'mr' ? 'प्रश्न उपलब्ध नाही' : 'Question not found.'}
              </div>
            )}
          </div>

          {/* Action Footer Bar */}
          <div className="bg-stone-50 border-t border-stone-200 p-3 sm:p-4 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                id="btn-mark-review"
                onClick={handleToggleMarkReview}
                className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                  currentQuestion && session.markedForReview[currentQuestion.id]
                    ? 'bg-purple-100 text-purple-800 border-purple-300'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                }`}
              >
                {currentQuestion && session.markedForReview[currentQuestion.id]
                  ? (questionLang === 'mr' ? 'चिन्हांकित काढले' : 'Unmark Review')
                  : (questionLang === 'mr' ? 'पुनरावलोकनार्थ चिन्हांकित' : 'Mark for Review')}
              </button>

              <button
                id="btn-clear-response"
                onClick={handleClearResponse}
                disabled={!currentQuestion || session.answers[currentQuestion.id] === undefined}
                className="px-3 py-2 rounded-lg text-xs font-semibold border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {questionLang === 'mr' ? 'पर्याय रद्द करा' : 'Clear Response'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-prev-question"
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{questionLang === 'mr' ? 'मागील' : 'Previous'}</span>
              </button>

              <button
                id="btn-save-next"
                onClick={handleSaveAndNext}
                disabled={currentQuestionIndex === questions.length - 1}
                className="px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                <span>{questionLang === 'mr' ? 'जतन करा व पुढे' : 'Save & Next'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>

        {/* Right Sidebar: MPSC Question Palette */}
        <aside
          className={`lg:col-span-4 bg-white rounded-xl border border-stone-200 shadow-sm p-4 flex flex-col ${
            showPaletteMobile
              ? 'fixed inset-x-2 bottom-2 top-20 z-40 lg:relative lg:inset-auto lg:top-auto'
              : 'hidden lg:flex'
          }`}
        >
          {showPaletteMobile && (
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-3 lg:hidden">
              <span className="font-bold text-sm text-stone-800">
                {questionLang === 'mr' ? 'प्रश्न तालिका' : 'Question Palette'}
              </span>
              <button
                onClick={() => setShowPaletteMobile(false)}
                className="p-1 rounded-md hover:bg-stone-100 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Palette Legend */}
          <div className="grid grid-cols-2 gap-2 text-[11px] pb-3 border-b border-stone-200">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px]">
                ✓
              </span>
              <span className="text-stone-600 font-medium">
                {questionLang === 'mr' ? 'उत्तर दिलेले' : 'Answered'} ({answeredCount})
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-rose-500 text-white flex items-center justify-center font-bold text-[9px]">
                ✗
              </span>
              <span className="text-stone-600 font-medium">
                {questionLang === 'mr' ? 'अनुत्तरित' : 'Not Answered'} ({notAttemptedCount})
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-purple-600 text-white flex items-center justify-center font-bold text-[9px]">
                ?
              </span>
              <span className="text-stone-600 font-medium">
                {questionLang === 'mr' ? 'पुनरावलोकन' : 'Marked'} ({markedCount})
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-stone-200 border border-stone-300" />
              <span className="text-stone-600 font-medium">
                {questionLang === 'mr' ? 'न पाहिलेले' : 'Not Visited'}
              </span>
            </div>
          </div>

          {/* Question Grid Numbers */}
          <div className="flex-1 overflow-y-auto py-4">
            <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
              {questionLang === 'mr' ? 'सर्व प्रश्न' : 'Questions List'} ({questions.length})
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const status = getQuestionStatus(q.id);
                const isCurrent = idx === currentQuestionIndex;

                let badgeColor = 'bg-stone-100 text-stone-700 border-stone-300';
                if (status === 'answered_marked') {
                  badgeColor = 'bg-purple-600 text-white border-emerald-400 ring-2 ring-emerald-400';
                } else if (status === 'marked') {
                  badgeColor = 'bg-purple-600 text-white border-purple-700';
                } else if (status === 'answered') {
                  badgeColor = 'bg-emerald-600 text-white border-emerald-700';
                } else if (status === 'unanswered') {
                  badgeColor = 'bg-rose-500 text-white border-rose-600';
                }

                return (
                  <button
                    key={`${q.id}-${idx}`}
                    id={`palette-btn-${idx + 1}`}
                    onClick={() => {
                      setCurrentQuestionIndex(idx);
                      setShowPaletteMobile(false);
                    }}
                    className={`h-10 rounded-lg font-bold text-xs border flex items-center justify-center transition-all cursor-pointer ${badgeColor} ${
                      isCurrent ? 'ring-2 ring-amber-500 ring-offset-2 scale-105 shadow-md' : 'hover:opacity-85'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Palette Action */}
          <div className="pt-3 border-t border-stone-200">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{questionLang === 'mr' ? 'चाचणी अंतिम सबमिट करा' : 'Finish & Submit Exam'}</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Pre-Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-stone-900 mb-1">
              {questionLang === 'mr' ? 'चाचणी सबमिट करायची आहे का?' : 'Ready to Submit Exam?'}
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              {questionLang === 'mr'
                ? 'खाली दिलेल्या माहितीची खात्री करा. सबमिट केल्यानंतर उत्तरे बदलता येणार नाहीत.'
                : 'Review your submission stats. You cannot modify answers after submitting.'}
            </p>

            {/* Stats summary table */}
            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 space-y-2 text-xs font-semibold mb-5">
              <div className="flex justify-between text-stone-700">
                <span>{questionLang === 'mr' ? 'एकूण प्रश्न' : 'Total Questions'}:</span>
                <span className="font-bold">{questions.length}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>{questionLang === 'mr' ? 'उत्तर दिलेले' : 'Answered'}:</span>
                <span className="font-bold">{answeredCount}</span>
              </div>
              <div className="flex justify-between text-rose-700">
                <span>{questionLang === 'mr' ? 'अनुत्तरित (सोडवलेले नाहीत)' : 'Unattempted'}:</span>
                <span className="font-bold">{notAttemptedCount}</span>
              </div>
              <div className="flex justify-between text-purple-700">
                <span>{questionLang === 'mr' ? 'पुनरावलोकनार्थ चिन्हांकित' : 'Marked for Review'}:</span>
                <span className="font-bold">{markedCount}</span>
              </div>
              <div className="flex justify-between text-amber-800 pt-2 border-t border-stone-200">
                <span>{questionLang === 'mr' ? 'शिल्लक वेळ' : 'Time Remaining'}:</span>
                <span className="font-bold font-mono">{formatTime(session.remainingSeconds)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 px-3 rounded-xl border border-stone-300 font-bold text-xs text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                {questionLang === 'mr' ? 'सराव सुरू ठेवा' : 'Continue Test'}
              </button>
              <button
                id="btn-confirm-final-submit"
                onClick={() => {
                  setShowSubmitModal(false);
                  if (soundEffectsEnabled) {
                    soundFx.playExamSubmissionSound();
                  }
                  onSubmitExam({
                    ...session,
                    isCompleted: true,
                    completedAt: Date.now(),
                  });
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                {questionLang === 'mr' ? 'होय, सबमिट करा' : 'Yes, Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
