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
  Sparkles,
  Maximize2,
  Minimize2,
  Smartphone,
  Tablet,
  Laptop,
  Monitor
} from 'lucide-react';
import { ExamSession, Question } from '../types';
import { MPSC_QUESTIONS } from '../data/mpscQuestions';
import { SUBJECTS } from '../data/subjects';
import { soundFx } from '../utils/audio';
import { findQuestionById } from '../utils/hardQuestionsEngine';
import { useDeviceScreen } from '../utils/screenUtils';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

const questionCardVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 36 : -36,
    opacity: 0,
    filter: 'blur(3px)',
    scale: 0.985,
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -32 : 32,
    opacity: 0,
    filter: 'blur(3px)',
    scale: 0.985,
    transition: {
      duration: 0.16,
      ease: [0.4, 0, 1, 1] as const,
    },
  }),
};

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
  const [direction, setDirection] = useState<number>(1);
  const [timeAlertNotice, setTimeAlertNotice] = useState<{
    type: '5min' | '1min';
    textMr: string;
    textEn: string;
  } | null>(null);

  // Hook for live device detection, fullscreen, and text scaling
  const { isFullscreen, toggleFullscreen, deviceType, textScale } = useDeviceScreen();

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasPlayed5MinWarning = useRef<boolean>(session.remainingSeconds < 300);
  const hasPlayed1MinWarning = useRef<boolean>(session.remainingSeconds < 60);

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

  // Auto-dismiss time alert notices
  useEffect(() => {
    if (timeAlertNotice) {
      const dismissTimer = setTimeout(() => {
        setTimeAlertNotice(null);
      }, 5000);
      return () => clearTimeout(dismissTimer);
    }
  }, [timeAlertNotice]);

  // Countdown timer with 5-minute and 1-minute audio alerts
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

        const currentSec = prev.remainingSeconds;

        // 5-minute remaining audio alert (triggers at exactly 300 seconds)
        if (currentSec === 300 && !hasPlayed5MinWarning.current) {
          hasPlayed5MinWarning.current = true;
          if (soundEffectsEnabled) {
            soundFx.playLowTimeWarningSound();
          }
          setTimeAlertNotice({
            type: '5min',
            textMr: '⏰ परीक्षेची ५ मिनिटे शिल्लक आहेत!',
            textEn: '⏰ 5 minutes remaining in the exam!',
          });
        }

        // 1-minute remaining audio alert (triggers at exactly 60 seconds)
        if (currentSec === 60 && !hasPlayed1MinWarning.current) {
          hasPlayed1MinWarning.current = true;
          if (soundEffectsEnabled) {
            soundFx.playOneMinuteWarningSound();
          }
          setTimeAlertNotice({
            type: '1min',
            textMr: '⚠️ अंतिम १ मिनिट शिल्लक आहे! कृपया उत्तरे तपासा.',
            textEn: '⚠️ Final 1 minute remaining! Review your answers.',
          });
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
    if (soundEffectsEnabled) {
      soundFx.playToggleSound(!isMarked);
    }
  };

  const navigateToQuestion = (targetIndex: number) => {
    if (targetIndex === currentQuestionIndex || targetIndex < 0 || targetIndex >= questions.length) return;
    setDirection(targetIndex > currentQuestionIndex ? 1 : -1);
    setCurrentQuestionIndex(targetIndex);
  };

  const handleJumpToNextMarked = () => {
    if (!questions.length) return;
    for (let i = 1; i <= questions.length; i++) {
      const idx = (currentQuestionIndex + i) % questions.length;
      if (session.markedForReview[questions[idx].id]) {
        navigateToQuestion(idx);
        return;
      }
    }
  };

  const handleSaveAndNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setDirection(1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
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

  // Section layout for standard CBT exams
  const isGroupCSet = session.patternId.startsWith('mpsc_group_c_talathi_set_');
  const is100QPaper = questions.length === 100;
  const examSections = isGroupCSet && is100QPaper ? [
    { id: 'sec_ca', nameMr: '१. चालू घडामोडी', nameEn: '1. Current Affairs', start: 0, end: 14, icon: '📰' },
    { id: 'sec_pol', nameMr: '२. नागरिकशास्त्र', nameEn: '2. Civics & Polity', start: 15, end: 29, icon: '⚖️' },
    { id: 'sec_hist', nameMr: '३. इतिहास', nameEn: '3. History', start: 30, end: 39, icon: '📜' },
    { id: 'sec_geo', nameMr: '४. भूगोल', nameEn: '4. Geography', start: 40, end: 54, icon: '🌍' },
    { id: 'sec_eco', nameMr: '५. अर्थव्यवस्था', nameEn: '5. Economy', start: 55, end: 69, icon: '💰' },
    { id: 'sec_sci', nameMr: '६. सामान्य विज्ञान', nameEn: '6. Science', start: 70, end: 84, icon: '🔬' },
    { id: 'sec_reas', nameMr: '७. बुद्धिमत्ता चाचणी', nameEn: '7. Reasoning', start: 85, end: 92, icon: '🧠' },
    { id: 'sec_arith', nameMr: '८. अंकगणित', nameEn: '8. Arithmetic', start: 93, end: 99, icon: '🔢' },
  ] : is100QPaper ? [
    { id: 'sec_1', nameMr: 'विभाग १: मराठी भाषा', nameEn: 'Sec 1: Marathi', start: 0, end: 24, icon: '🚩' },
    { id: 'sec_2', nameMr: 'विभाग २: इंग्रजी भाषा', nameEn: 'Sec 2: English', start: 25, end: 49, icon: '🔤' },
    { id: 'sec_3', nameMr: 'विभाग ३: सामान्य ज्ञान (GS)', nameEn: 'Sec 3: General GK', start: 50, end: 74, icon: '🏛️' },
    { id: 'sec_4', nameMr: 'विभाग ४: बुद्धिमत्ता व गणित', nameEn: 'Sec 4: Aptitude & Math', start: 75, end: 99, icon: '🧮' },
  ] : null;

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

            {/* 1-Click Full Screen toggle for true CBT exam hall experience */}
            <button
              type="button"
              id="btn-exam-fullscreen-toggle"
              onClick={async () => {
                soundFx.playClickSound();
                await toggleFullscreen();
              }}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                isFullscreen
                  ? 'bg-amber-500/25 border-amber-400 text-amber-300 shadow-xs'
                  : 'bg-stone-800 hover:bg-stone-700 border-stone-700 text-stone-300 hover:text-white'
              }`}
              title={
                isFullscreen
                  ? (questionLang === 'mr' ? 'पूर्ण स्क्रीनमधून बाहेर पडा (Esc)' : 'Exit Full Screen (Esc)')
                  : (questionLang === 'mr' ? 'अस्सल CBT पूर्ण स्क्रीन मोड (F11 / Tap)' : 'Enter Full Screen CBT Mode (F11 / Tap)')
              }
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5 text-stone-300" />
              )}
              <span className="hidden sm:inline">
                {isFullscreen ? (questionLang === 'mr' ? 'सामान्य' : 'Exit') : (questionLang === 'mr' ? 'पूर्ण स्क्रीन' : 'Full')}
              </span>
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

      {/* Floating 5-Minute and 1-Minute Audio & Visual Alert Banner */}
      <AnimatePresence>
        {timeAlertNotice && (
          <motion.aside
            key={`time-alert-banner-${timeAlertNotice.type}`}
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl shadow-2xl border flex items-center gap-2.5 text-xs sm:text-sm font-bold backdrop-blur-md max-w-[92vw] sm:max-w-md ${
              timeAlertNotice.type === '1min'
                ? 'bg-rose-950/95 border-rose-500 text-rose-100 ring-2 ring-rose-400/40 shadow-rose-950/50 animate-pulse'
                : 'bg-amber-950/95 border-amber-500 text-amber-100 ring-2 ring-amber-400/40 shadow-amber-950/50'
            }`}
          >
            <AlertTriangle className={`w-4 h-4 shrink-0 ${timeAlertNotice.type === '1min' ? 'text-rose-400' : 'text-amber-400'}`} />
            <span className="flex-1 leading-snug">
              {questionLang === 'mr' ? timeAlertNotice.textMr : timeAlertNotice.textEn}
            </span>
            <button
              onClick={() => setTimeAlertNotice(null)}
              className="text-stone-300 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
              title="Close alert"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* CBT 4-Section Switcher Tabs (मराठी २५ | इंग्रजी २५ | GS २५ | CSAT २५) */}
      {examSections && (
        <div className="bg-white border-b border-stone-200 px-3 sm:px-6 py-2 flex items-center gap-2 overflow-x-auto shadow-2xs">
          <span className="text-[11px] font-extrabold text-stone-500 uppercase shrink-0 hidden md:inline">
            {questionLang === 'mr' ? 'विभाग निवडा:' : 'Sections:'}
          </span>
          {examSections.map((sec) => {
            const isActive = currentQuestionIndex >= sec.start && currentQuestionIndex <= sec.end;
            const secAnsweredCount = questions
              .slice(sec.start, sec.end + 1)
              .filter((q) => session.answers[q.id] !== undefined).length;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  soundFx.playClickSound();
                  navigateToQuestion(sec.start);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-black shadow-xs ring-1 ring-amber-400'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span>{sec.icon}</span>
                <span>{questionLang === 'mr' ? sec.nameMr : sec.nameEn}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                  isActive ? 'bg-stone-950/20 text-stone-950' : 'bg-stone-200 text-stone-600'
                }`}>
                  {secAnsweredCount}/{sec.end - sec.start + 1}
                </span>
              </button>
            );
          })}
        </div>
      )}

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

      {/* Main Examination Workspace - Fluid Responsive across Mobile, Tablet, Laptop, and PC */}
      <div className="flex-1 max-w-7xl 2xl:max-w-[1536px] w-full mx-auto p-2 sm:p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 pb-28 sm:pb-24">
        {/* Left / Center: Active Question Canvas */}
        <main className="lg:col-span-8 flex flex-col bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden min-h-[500px]">
          {/* Question Title Bar */}
          <div className="bg-stone-50 border-b border-stone-200 px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <motion.span
                key={`q-badge-${currentQuestionIndex}`}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.16 }}
                className="bg-stone-900 text-white font-bold text-xs px-2.5 py-1 rounded-md inline-block"
              >
                {questionLang === 'mr' ? 'प्रश्न क्र.' : 'Question'} {currentQuestionIndex + 1}
              </motion.span>
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

          {/* Question Text Area with Fluid Entry & Exit Transitions */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto overflow-x-hidden relative">
            {currentQuestion ? (
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={currentQuestion.id}
                  custom={direction}
                  variants={questionCardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-5"
                >
                  {/* Text Content */}
                  <div className={`${textScale === 'large' ? 'text-lg sm:text-xl lg:text-2xl' : 'text-base sm:text-lg lg:text-xl'} font-medium text-stone-900 leading-relaxed whitespace-pre-line`}>
                    {questionLang === 'mr' ? currentQuestion.questionMr : currentQuestion.questionEn}
                  </div>

                  {/* Multiple Options (1, 2, 3, 4) with tactile animation */}
                  <div className="space-y-3 pt-2">
                    {(questionLang === 'mr' ? currentQuestion.optionsMr : currentQuestion.optionsEn).map(
                      (optionText, idx) => {
                        const isSelected = session.answers[currentQuestion.id] === idx;
                        return (
                          <motion.label
                            key={idx}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18, delay: idx * 0.035 }}
                            whileHover={{ scale: 1.006, x: 2 }}
                            whileTap={{ scale: 0.992 }}
                            onClick={() => handleSelectOption(idx)}
                            className={`flex items-start gap-3 p-3 sm:p-4 rounded-xl border-2 transition-colors cursor-pointer ${
                              isSelected
                                ? 'border-amber-500 bg-amber-50/70 shadow-xs ring-1 ring-amber-400/50'
                                : 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50/60'
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-colors ${
                                isSelected
                                  ? 'bg-amber-600 text-white shadow-xs'
                                  : 'border-2 border-stone-300 text-stone-600'
                              }`}
                            >
                              {idx + 1}
                            </div>
                            <span className={`${textScale === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'} text-stone-800 font-medium leading-normal flex-1`}>
                              {optionText}
                            </span>
                          </motion.label>
                        );
                      }
                    )}
                  </div>

                  {/* THREE EXAM ACTION BUTTONS: PREVIOUS, NEXT, AND SUBMIT EXAM (Directly Under Options) */}
                  <div className="pt-5 mt-6 border-t border-stone-200/90 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                      {/* 1. Previous Question Button */}
                      <button
                        id="btn-inline-prev"
                        onClick={handlePrev}
                        disabled={currentQuestionIndex === 0}
                        className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>{questionLang === 'mr' ? 'मागील (Previous)' : 'Previous'}</span>
                      </button>

                      {/* 2. Next Question Button */}
                      <button
                        id="btn-inline-next"
                        onClick={handleSaveAndNext}
                        disabled={currentQuestionIndex === questions.length - 1}
                        className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-amber-500 hover:bg-amber-600 text-stone-950 shadow-md shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>{questionLang === 'mr' ? 'पुढील (Next)' : 'Next'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* 3. Submit Exam Button */}
                    <button
                      id="btn-inline-submit-exam"
                      onClick={() => setShowSubmitModal(true)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Send className="w-4 h-4" />
                      <span>{questionLang === 'mr' ? 'चाचणी सबमिट करा (Submit Exam)' : 'Submit Exam'}</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
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
                <span>{questionLang === 'mr' ? 'पुढे (Next)' : 'Next'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                id="btn-footer-submit-exam"
                onClick={() => setShowSubmitModal(true)}
                className="px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs flex items-center gap-1.5 cursor-pointer ml-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{questionLang === 'mr' ? 'सबमिट' : 'Submit'}</span>
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
                      navigateToQuestion(idx);
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

      {/* PERSISTENT FIXED BOTTOM ACTION BAR - Fixed to viewport for superior navigation ergonomics */}
      <nav
        aria-label="Exam Navigation"
        className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 shadow-[0_-4px_25px_rgba(0,0,0,0.12)] px-3 sm:px-6 py-2.5 transition-all"
      >
        <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto flex items-center justify-between gap-3">
          {/* Left: Question status & Mobile Palette trigger */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-300/80 dark:border-stone-700 shrink-0 flex items-center gap-1.5">
              <span>{questionLang === 'mr' ? 'प्रश्न' : 'Q'}:</span>
              <strong className="text-stone-900 dark:text-white font-extrabold text-xs sm:text-sm">{currentQuestionIndex + 1}</strong>
              <span className="text-stone-400">/</span>
              <span className="text-stone-500 dark:text-stone-400">{questions.length}</span>
            </span>

            {/* Mobile Question Palette Toggle */}
            <button
              onClick={() => setShowPaletteMobile(!showPaletteMobile)}
              className="lg:hidden px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700 flex items-center gap-1 cursor-pointer"
            >
              <span>{questionLang === 'mr' ? 'तालिका' : 'Palette'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-600 text-white font-bold">
                {answeredCount}
              </span>
            </button>
          </div>

          {/* Center / Right: NAVIGATION & REVIEW ACTIONS */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* 0. Mark for Review Button in Persistent Fixed Bottom Bar */}
            <button
              id="btn-fixed-mark-review"
              onClick={handleToggleMarkReview}
              className={`px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                currentQuestion && session.markedForReview[currentQuestion.id]
                  ? 'bg-purple-600 hover:bg-purple-700 text-white border-purple-600 shadow-purple-600/25 ring-2 ring-purple-400/40'
                  : 'bg-white dark:bg-stone-800 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:border-purple-400'
              }`}
              title={
                currentQuestion && session.markedForReview[currentQuestion.id]
                  ? (questionLang === 'mr' ? 'पुनरावलोकन चिन्ह काढा (Unmark Review)' : 'Unmark from Review')
                  : (questionLang === 'mr' ? 'पुनरावलोकनासाठी चिन्हांकित करा (Mark for Review)' : 'Mark for Review')
              }
            >
              <Bookmark className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                currentQuestion && session.markedForReview[currentQuestion.id]
                  ? 'fill-white text-white'
                  : 'text-purple-600 dark:text-purple-400'
              }`} />
              <span className="hidden md:inline">
                {currentQuestion && session.markedForReview[currentQuestion.id]
                  ? (questionLang === 'mr' ? 'चिन्हांकित केले' : 'Marked for Review')
                  : (questionLang === 'mr' ? 'पुनरावलोकनार्थ ठेवा' : 'Mark for Review')}
              </span>
              <span className="inline md:hidden">
                {currentQuestion && session.markedForReview[currentQuestion.id]
                  ? (questionLang === 'mr' ? 'चिन्हांकित' : 'Marked')
                  : (questionLang === 'mr' ? 'रिव्ह्यू' : 'Review')}
              </span>
              {markedCount > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-0.5 ${
                  currentQuestion && session.markedForReview[currentQuestion.id]
                    ? 'bg-white/20 text-white'
                    : 'bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200'
                }`}>
                  {markedCount}
                </span>
              )}
            </button>

            {/* 1. Previous Button */}
            <button
              id="btn-fixed-prev"
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold border border-stone-300 dark:border-stone-700 bg-white hover:bg-stone-100 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer"
              title={questionLang === 'mr' ? 'मागील प्रश्न (Previous)' : 'Previous Question'}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden xs:inline">{questionLang === 'mr' ? 'मागील' : 'Previous'}</span>
            </button>

            {/* 2. Next Button */}
            <button
              id="btn-fixed-next"
              onClick={handleSaveAndNext}
              disabled={currentQuestionIndex === questions.length - 1}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer"
              title={questionLang === 'mr' ? 'पुढील प्रश्न (Next)' : 'Next Question'}
            >
              <span>{questionLang === 'mr' ? 'पुढे (Next)' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* 3. Submit Exam Button */}
            <button
              id="btn-fixed-submit-exam"
              onClick={() => setShowSubmitModal(true)}
              className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-600/25 flex items-center gap-1.5 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              title={questionLang === 'mr' ? 'चाचणी सबमिट करा (Submit Exam)' : 'Submit Exam'}
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{questionLang === 'mr' ? 'चाचणी सबमिट करा' : 'Submit Exam'}</span>
              <span className="inline sm:hidden">{questionLang === 'mr' ? 'सबमिट' : 'Submit'}</span>
            </button>
          </div>
        </div>
      </nav>

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

            {/* If there are questions marked for review, show an actionable reminder */}
            {markedCount > 0 && (
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs flex items-center justify-between gap-2.5 mb-4">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-purple-600 shrink-0 fill-purple-600" />
                  <span className="font-semibold">
                    {questionLang === 'mr'
                      ? `तुम्ही ${markedCount} प्रश्न पुनरावलोकनासाठी (Marked) ठेवले आहेत.`
                      : `You have ${markedCount} questions marked for review.`}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setShowSubmitModal(false);
                    handleJumpToNextMarked();
                  }}
                  className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[11px] font-bold cursor-pointer transition-colors shrink-0 shadow-xs"
                >
                  {questionLang === 'mr' ? 'तपासा' : 'Review'}
                </button>
              </div>
            )}

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
