import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Calendar, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Trophy, 
  RotateCcw, 
  HelpCircle, 
  Lock, 
  Flame, 
  Award,
  BookOpen,
  Share2
} from 'lucide-react';
import { Question } from '../types';
import { 
  getTodayDateString, 
  fetchDailyQuestions, 
  checkUserDailyQuizAttempt, 
  recordDailyQuizAttempt, 
  DailyQuizAttempt,
  CURATED_DEFAULT_DAILY_QUESTIONS
} from '../services/dailyQuizService';
import { cleanQuestionText } from '../utils/cleanQuestionText';

interface DailyQuizCardProps {
  language: 'mr' | 'en';
  currentUserId?: string;
  onQuestionsAnswered?: (count: number) => void;
  className?: string;
}

export const DailyQuizCard: React.FC<DailyQuizCardProps> = ({
  language,
  currentUserId,
  onQuestionsAnswered,
  className = '',
}) => {
  const isMr = language === 'mr';
  const todayDateStr = useMemo(() => getTodayDateString(), []);

  // Formatted date string for header
  const formattedTodayDate = useMemo(() => {
    try {
      const now = new Date();
      return now.toLocaleDateString(isMr ? 'mr-IN' : 'en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return todayDateStr;
    }
  }, [isMr, todayDateStr]);

  // Component state
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<Question[]>(CURATED_DEFAULT_DAILY_QUESTIONS);
  const [alreadyAttempted, setAlreadyAttempted] = useState<boolean>(false);
  const [pastAttempt, setPastAttempt] = useState<DailyQuizAttempt | null>(null);

  // Quiz active & review states
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);

  // In-quiz state
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(300); // 5 minutes (60s * 5)
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [currentQuizResult, setCurrentQuizResult] = useState<DailyQuizAttempt | null>(null);
  const [quizLang, setQuizLang] = useState<'mr' | 'en'>(language);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize and check status
  useEffect(() => {
    let isMounted = true;
    async function loadQuizData() {
      setLoading(true);
      try {
        // 1. Check if user already attempted today's quiz
        const attemptStatus = await checkUserDailyQuizAttempt(currentUserId);
        if (isMounted) {
          if (attemptStatus.attempted && attemptStatus.attempt) {
            setAlreadyAttempted(true);
            setPastAttempt(attemptStatus.attempt);
            if (attemptStatus.attempt.answers) {
              setSelectedAnswers(attemptStatus.attempt.answers);
            }
          } else {
            setAlreadyAttempted(false);
            setPastAttempt(null);
          }
        }

        // 2. Fetch curated 5 questions from Firestore daily_questions
        const fetchedQs = await fetchDailyQuestions();
        if (isMounted && fetchedQs && fetchedQs.length > 0) {
          setQuestions(fetchedQs);
        }
      } catch (err) {
        console.warn('Error loading daily quiz:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadQuizData();
    return () => {
      isMounted = false;
    };
  }, [currentUserId, todayDateStr]);

  // Sync quiz language with prop changes if quiz not started
  useEffect(() => {
    setQuizLang(language);
  }, [language]);

  // Quiz Timer
  useEffect(() => {
    if (isQuizActive && !quizFinished) {
      timerRef.current = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleCompleteQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isQuizActive, quizFinished]);

  const handleStartQuiz = () => {
    if (alreadyAttempted) {
      setIsReviewOpen(true);
      return;
    }
    setSelectedAnswers({});
    setCurrentQIndex(0);
    setTimeLeftSeconds(300); // 5 minutes
    setQuizFinished(false);
    setCurrentQuizResult(null);
    setIsQuizActive(true);
  };

  const handleSelectOption = (qId: string, optionIndex: number) => {
    if (quizFinished) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionIndex
    }));
  };

  const handleCompleteQuiz = async () => {
    if (timerRef.current) clearInterval(timerRef.current);

    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    questions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      if (selected === undefined || selected === null) {
        unattempted++;
      } else if (selected === q.correctAnswerIndex) {
        correct++;
      } else {
        incorrect++;
      }
    });

    // MPSC 1/4 Negative Marking: Correct +1.0, Incorrect -0.25
    const rawScore = correct * 1.0 - incorrect * 0.25;
    const finalScore = Math.max(0, parseFloat(rawScore.toFixed(2)));
    const totalAttempted = correct + incorrect;
    const accuracy = totalAttempted > 0 ? Math.round((correct / totalAttempted) * 100) : 0;
    const timeSpent = Math.max(1, 300 - timeLeftSeconds);

    const attemptRecord: DailyQuizAttempt = {
      userId: currentUserId || 'guest',
      date: todayDateStr,
      score: finalScore,
      totalQuestions: questions.length,
      correctCount: correct,
      incorrectCount: incorrect,
      unattemptedCount: unattempted,
      accuracy,
      timeTakenSeconds: timeSpent,
      answers: selectedAnswers,
      completedAt: new Date().toISOString()
    };

    setQuizFinished(true);
    setCurrentQuizResult(attemptRecord);
    setAlreadyAttempted(true);
    setPastAttempt(attemptRecord);

    // Persist to Firestore and localStorage
    await recordDailyQuizAttempt(attemptRecord);

    if (onQuestionsAnswered) {
      onQuestionsAnswered(questions.length);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentQ = questions[currentQIndex] || questions[0];

  return (
    <>
      {/* ========================================================================= */}
      {/* DASHBOARD CARD CONTAINER */}
      {/* ========================================================================= */}
      <div 
        id="mpsc-daily-quiz-card"
        className={`relative overflow-hidden rounded-2xl border transition-all duration-300 shadow-md ${
          alreadyAttempted 
            ? 'bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 border-emerald-500/40 text-stone-100' 
            : 'bg-gradient-to-br from-stone-900 via-stone-850 to-amber-950/40 border-amber-500/50 text-stone-100'
        } ${className}`}
      >
        {/* Subtle decorative background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 p-5 sm:p-6 space-y-4">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3.5">
            <div className="flex items-start gap-3">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm border ${
                alreadyAttempted 
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                  : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
              }`}>
                {alreadyAttempted ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                ) : (
                  <Calendar className="w-6 h-6 text-amber-400" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <span>{isMr ? 'दैनिक ५ प्रश्न क्विझ' : 'Daily 5-Question Quiz'}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {isMr ? 'दररोज फक्त १ क्विझ' : '1 Quiz / Day'}
                    </span>
                  </h3>
                </div>
                <p className="text-xs text-stone-400 mt-0.5 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>{formattedTodayDate}</span>
                  <span className="text-stone-600">•</span>
                  <span className="text-amber-400/90 font-semibold">
                    {isMr ? 'Firestore दैनिक बँक' : 'Firestore Daily Bank'}
                  </span>
                </p>
              </div>
            </div>

            {/* Status Pill on Top Right */}
            <div className="self-start sm:self-center">
              {alreadyAttempted ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isMr ? 'आजचा क्विझ पूर्ण ✓' : 'Completed Today ✓'}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold animate-pulse shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isMr ? 'आजचा क्विझ उपलब्ध!' : 'Available Now!'}</span>
                </span>
              )}
            </div>
          </div>

          {/* Body Content: State Dependent */}
          {loading ? (
            <div className="py-6 text-center text-stone-400 text-xs animate-pulse flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 animate-spin text-amber-400" />
              <span>{isMr ? 'दैनिक क्विझ लोड होत आहे...' : 'Loading daily quiz...'}</span>
            </div>
          ) : alreadyAttempted && pastAttempt ? (
            /* ========================================================= */
            /* STATE A: QUIZ COMPLETED TODAY */
            /* ========================================================= */
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 text-center">
                  <div className="text-[11px] font-bold text-stone-400 uppercase">
                    {isMr ? 'मिळालेले गुण' : 'Final Score'}
                  </div>
                  <div className="text-xl font-black text-amber-400 font-mono mt-0.5">
                    {pastAttempt.score.toFixed(2)} <span className="text-xs text-stone-400 font-normal">/ 5</span>
                  </div>
                </div>

                <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 text-center">
                  <div className="text-[11px] font-bold text-stone-400 uppercase">
                    {isMr ? 'अचूकता' : 'Accuracy'}
                  </div>
                  <div className={`text-xl font-black font-mono mt-0.5 ${
                    pastAttempt.accuracy >= 60 ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {pastAttempt.accuracy}%
                  </div>
                </div>

                <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 text-center">
                  <div className="text-[11px] font-bold text-stone-400 uppercase">
                    {isMr ? 'बरोबर / चूक' : 'Correct / Wrong'}
                  </div>
                  <div className="text-sm font-bold text-stone-200 mt-1 font-mono">
                    <span className="text-emerald-400">✓ {pastAttempt.correctCount}</span>
                    <span className="text-stone-500 mx-1">•</span>
                    <span className="text-rose-400">✗ {pastAttempt.incorrectCount}</span>
                  </div>
                </div>

                <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 text-center">
                  <div className="text-[11px] font-bold text-stone-400 uppercase">
                    {isMr ? 'घेतलेला वेळ' : 'Time Taken'}
                  </div>
                  <div className="text-sm font-bold text-stone-200 mt-1 font-mono">
                    ⏱️ {Math.floor(pastAttempt.timeTakenSeconds / 60)}m {pastAttempt.timeTakenSeconds % 60}s
                  </div>
                </div>
              </div>

              {/* Informative Lock Notice */}
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-stone-300">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {isMr 
                      ? 'उत्कृष्ट सातत्य! तुम्ही आजचा दैनिक क्विझ सोडवला आहे. उद्या मध्यरात्री १२:०० वाजता नवीन ५ प्रश्न अनलॉक होतील.' 
                      : 'Great discipline! You have completed today\'s quiz. Tomorrow\'s 5 curated questions unlock at midnight.'}
                  </span>
                </div>

                <button
                  type="button"
                  id="btn-review-daily-quiz"
                  onClick={() => setIsReviewOpen(true)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-750 text-amber-300 border border-amber-500/40 font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 hover:scale-105 shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isMr ? 'प्रश्न व विश्लेषण तपासा ➜' : 'Review Qs & Explanations ➜'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* ========================================================= */
            /* STATE B: QUIZ READY TO TAKE */
            /* ========================================================= */
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-8 space-y-2">
                  <p className="text-sm text-stone-300 leading-relaxed">
                    {isMr 
                      ? 'एमपीएससी परीक्षकांच्या पॅटर्ननुसार निवडलेले ५ उच्च-मूल्य (High-Yield) प्रश्न. ५ मिनिटे, १/४ निगेटिव्ह मार्किंग आणि अचूक विश्लेषण. दररोज स्वतःची तयारी तपासा.' 
                      : 'Hand-picked set of 5 high-yield exam questions from Firestore daily pool. 5 minutes, 1/4 negative marking, and bilingual explanations.'}
                  </p>

                  <div className="flex items-center gap-3 flex-wrap text-xs text-stone-400 pt-1">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isMr ? '५ बहुपर्यायी प्रश्न' : '5 MCQs'}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isMr ? '५ मिनिटे कालावधी' : '5 Mins Timer'}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isMr ? '१/४ नकारात्मक गुण' : '1/4 Negative Marking'}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-300 font-semibold">
                      <Lock className="w-3.5 h-3.5" />
                      <span>{isMr ? 'दिवसातून एकदाच' : '1 Attempt / Day'}</span>
                    </span>
                  </div>
                </div>

                <div className="md:col-span-4 flex justify-start md:justify-end">
                  <button
                    type="button"
                    id="btn-start-daily-quiz"
                    onClick={handleStartQuiz}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/25 transition-all cursor-pointer hover:scale-[1.03]"
                  >
                    <Sparkles className="w-4 h-4 fill-stone-950" />
                    <span>{isMr ? 'आजचा क्विझ सोडवा (५ प्रश्न) ➜' : 'Start Today\'s Quiz ➜'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE DAILY QUIZ MODAL */}
      {/* ========================================================================= */}
      {isQuizActive && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-stone-900 border border-amber-500/50 rounded-2xl max-w-2xl w-full text-stone-100 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    <span>{isMr ? 'MPSC दैनिक क्विझ' : 'MPSC Daily Quiz'}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-stone-800 text-amber-300 font-bold border border-stone-700">
                      {isMr ? `प्रश्न ${currentQIndex + 1} / ${questions.length}` : `Q ${currentQIndex + 1} of ${questions.length}`}
                    </span>
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    {currentQ.topic || (isMr ? 'चालू घडामोडी व सामान्य अध्ययन' : 'Current Affairs & GS')}
                  </p>
                </div>
              </div>

              {/* Timer and Language Switcher */}
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-xl border font-mono font-black text-xs flex items-center gap-1.5 ${
                  timeLeftSeconds <= 60 
                    ? 'bg-rose-950/80 border-rose-500/50 text-rose-300 animate-pulse' 
                    : 'bg-stone-850 border-amber-500/40 text-amber-300'
                }`}>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTimer(timeLeftSeconds)}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setQuizLang(quizLang === 'mr' ? 'en' : 'mr')}
                  className="px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-lg text-xs font-bold border border-stone-700 transition-colors"
                >
                  {quizLang === 'mr' ? 'English' : 'मराठी'}
                </button>

                {!quizFinished && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(isMr ? 'तुम्हाला नक्की क्विझ बंद करायचा आहे का? अपूर्ण क्विझ सबमिट केला जाईल.' : 'Are you sure you want to exit? Your attempt will be submitted.')) {
                        handleCompleteQuiz();
                      }
                    }}
                    className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                    title={isMr ? "बंद करा" : "Close"}
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
              {!quizFinished ? (
                <>
                  {/* Question Palette Strip */}
                  <div className="flex items-center justify-between gap-1 bg-stone-950 p-2 rounded-xl border border-stone-800">
                    <span className="text-[11px] font-bold text-stone-400 px-1">
                      {isMr ? 'प्रश्न पॅलेट:' : 'Palette:'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {questions.map((q, idx) => {
                        const isAns = selectedAnswers[q.id] !== undefined;
                        const isCurr = idx === currentQIndex;
                        return (
                          <button
                            key={q.id}
                            type="button"
                            onClick={() => setCurrentQIndex(idx)}
                            className={`w-7 h-7 rounded-lg text-xs font-black transition-all ${
                              isCurr 
                                ? 'bg-amber-500 text-stone-950 ring-2 ring-amber-400 scale-105' 
                                : isAns 
                                ? 'bg-emerald-600 text-white' 
                                : 'bg-stone-800 text-stone-400 hover:bg-stone-750'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-[11px] text-stone-400 font-medium">
                      {Object.keys(selectedAnswers).length}/{questions.length} {isMr ? 'सोडवले' : 'done'}
                    </span>
                  </div>

                  {/* Question Text */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
                      <span>📌 {isMr ? 'प्रश्न क्र.' : 'Question'} {currentQIndex + 1}</span>
                      {currentQ.subtopic && <span className="text-stone-500">• {currentQ.subtopic}</span>}
                    </div>
                    <p className="text-base sm:text-lg font-bold text-stone-100 leading-relaxed">
                      {cleanQuestionText(quizLang === 'mr' ? currentQ.questionMr : currentQ.questionEn)}
                    </p>
                  </div>

                  {/* Options List */}
                  <div className="space-y-2.5 pt-1">
                    {(quizLang === 'mr' ? currentQ.optionsMr : currentQ.optionsEn).map((opt, optIdx) => {
                      const isSelected = selectedAnswers[currentQ.id] === optIdx;
                      const optLabels = ['A', 'B', 'C', 'D'];
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(currentQ.id, optIdx)}
                          className={`w-full p-3.5 rounded-xl border text-left font-medium text-sm flex items-start gap-3 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-500 text-amber-100 shadow-md ring-1 ring-amber-400'
                              : 'bg-stone-850 border-stone-800 text-stone-300 hover:bg-stone-800 hover:border-stone-700'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-black transition-colors ${
                            isSelected 
                              ? 'bg-amber-500 text-stone-950' 
                              : 'bg-stone-800 text-stone-400'
                          }`}>
                            {optLabels[optIdx]}
                          </div>
                          <span className="leading-snug pt-0.5">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                /* ========================================================= */
                /* QUIZ RESULT CELEBRATION SCREEN */
                /* ========================================================= */
                <div className="py-4 space-y-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                    <Trophy className="w-8 h-8 text-amber-400" />
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {isMr ? 'अभिनंदन! आजचा दैनिक क्विझ पूर्ण झाला!' : 'Well Done! Daily Quiz Completed!'}
                    </h3>
                    <p className="text-xs text-stone-400 mt-1">
                      {isMr ? 'तुमचा रिझल्ट Firestore मध्ये सेव्ह झाला आहे.' : 'Your attempt has been saved to Firestore.'}
                    </p>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-lg mx-auto">
                    <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                      <div className="text-[10px] text-stone-400 font-bold uppercase">{isMr ? 'एकूण गुण' : 'Score'}</div>
                      <div className="text-xl font-black text-amber-400 font-mono mt-0.5">
                        {currentQuizResult?.score.toFixed(2)} / 5
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                      <div className="text-[10px] text-stone-400 font-bold uppercase">{isMr ? 'अचूकता' : 'Accuracy'}</div>
                      <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">
                        {currentQuizResult?.accuracy}%
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                      <div className="text-[10px] text-stone-400 font-bold uppercase">{isMr ? 'बरोबर' : 'Correct'}</div>
                      <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">
                        {currentQuizResult?.correctCount} / 5
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                      <div className="text-[10px] text-stone-400 font-bold uppercase">{isMr ? 'वेळ' : 'Time'}</div>
                      <div className="text-xl font-black text-stone-200 font-mono mt-0.5">
                        {Math.floor((currentQuizResult?.timeTakenSeconds || 0) / 60)}m {(currentQuizResult?.timeTakenSeconds || 0) % 60}s
                      </div>
                    </div>
                  </div>

                  {/* One-Quiz-Per-Day Enforcement Notice */}
                  <div className="bg-stone-950/70 border border-amber-500/30 rounded-xl p-3.5 max-w-lg mx-auto text-xs text-stone-300 text-left flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-amber-300">
                        {isMr ? 'दररोज फक्त एकच क्विझ नियम सक्रिय आहे' : '1 Quiz Per Day Limit Active'}
                      </p>
                      <p className="text-[11px] text-stone-400 mt-0.5">
                        {isMr 
                          ? 'तुमचा आजचा स्कोर लॉक झाला आहे. उद्या नवीन ५ प्रश्न मिळतील. आता सर्व प्रश्नांचे सविस्तर विश्लेषण तपासा.' 
                          : 'Your score for today is locked. Next 5 curated questions will be available tomorrow. You can review all explanations below.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsQuizActive(false);
                        setIsReviewOpen(true);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{isMr ? 'सर्व ५ प्रश्नांचे विश्लेषण तपासा' : 'Review 5 Questions & Explanations'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsQuizActive(false)}
                      className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 font-bold text-xs transition-colors cursor-pointer"
                    >
                      {isMr ? 'डॅशबोर्डवर परत जा' : 'Back to Dashboard'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            {!quizFinished && (
              <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-2 rounded-xl bg-stone-850 hover:bg-stone-800 disabled:opacity-40 text-stone-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{isMr ? 'मागील' : 'Previous'}</span>
                </button>

                <div className="flex items-center gap-2">
                  {currentQIndex < questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentQIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                      className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-100 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{isMr ? 'पुढील' : 'Next'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : null}

                  <button
                    type="button"
                    id="btn-submit-daily-quiz"
                    onClick={handleCompleteQuiz}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isMr ? 'क्विझ सबमिट करा' : 'Submit Quiz'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* REVIEW QUESTIONS & EXPLANATIONS MODAL */}
      {/* ========================================================================= */}
      {isReviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-3xl w-full text-stone-100 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
            
            {/* Header */}
            <div className="p-4 sm:p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-white">
                    {isMr ? 'दैनिक क्विझ: सर्व ५ प्रश्नांचे सविस्तर विश्लेषण' : 'Daily Quiz: Questions & Detailed Explanations'}
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    {formattedTodayDate} • {isMr ? 'फक्त वाचन व अभ्यास मोड' : 'Review & Study Mode'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuizLang(quizLang === 'mr' ? 'en' : 'mr')}
                  className="px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-bold border border-stone-700"
                >
                  {quizLang === 'mr' ? 'English' : 'मराठी'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsReviewOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
              {questions.map((q, idx) => {
                const userChoice = pastAttempt?.answers?.[q.id] ?? selectedAnswers[q.id];
                const isCorrect = userChoice === q.correctAnswerIndex;
                const isSkipped = userChoice === undefined || userChoice === null;
                const optLabels = ['A', 'B', 'C', 'D'];

                return (
                  <div 
                    key={q.id} 
                    className={`p-4 sm:p-5 rounded-xl border bg-stone-950/70 space-y-3 ${
                      isCorrect 
                        ? 'border-emerald-500/40' 
                        : isSkipped 
                        ? 'border-stone-800' 
                        : 'border-rose-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                      <span className="font-extrabold text-amber-400">
                        {isMr ? `प्रश्न ${idx + 1} / ${questions.length}` : `Question ${idx + 1} of ${questions.length}`}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-[10px] font-semibold">
                          {q.topic}
                        </span>
                        {isCorrect ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                            ✓ {isMr ? 'बरोबर (+१.०)' : 'Correct (+1.0)'}
                          </span>
                        ) : isSkipped ? (
                          <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-400 text-[10px] font-bold">
                            ⚪ {isMr ? 'सोडवला नाही (०.०)' : 'Skipped (0.0)'}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/40 text-[10px] font-bold">
                            ✗ {isMr ? 'चूक (-०.२५)' : 'Incorrect (-0.25)'}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm sm:text-base font-bold text-stone-100 leading-relaxed">
                      {cleanQuestionText(quizLang === 'mr' ? q.questionMr : q.questionEn)}
                    </p>

                    {/* Options list */}
                    <div className="space-y-1.5 pt-1">
                      {(quizLang === 'mr' ? q.optionsMr : q.optionsEn).map((opt, optIdx) => {
                        const isAns = optIdx === q.correctAnswerIndex;
                        const isUserSelected = optIdx === userChoice;

                        let optClass = 'bg-stone-900 border-stone-800 text-stone-400';
                        if (isAns) {
                          optClass = 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-bold';
                        } else if (isUserSelected && !isAns) {
                          optClass = 'bg-rose-950/60 border-rose-500/80 text-rose-200 line-through';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-lg border text-xs flex items-start gap-2.5 ${optClass}`}
                          >
                            <span className="w-5 h-5 rounded flex items-center justify-center shrink-0 bg-stone-800 text-stone-200 font-black text-[10px]">
                              {optLabels[optIdx]}
                            </span>
                            <span className="flex-1 leading-snug">{opt}</span>
                            {isAns && (
                              <span className="text-[10px] text-emerald-400 font-black uppercase">
                                {isMr ? 'अचूक उत्तर ✓' : 'Correct Answer ✓'}
                              </span>
                            )}
                            {isUserSelected && !isAns && (
                              <span className="text-[10px] text-rose-400 font-black uppercase">
                                {isMr ? 'तुमची निवड ✗' : 'Your Choice ✗'}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed Explanation */}
                    <div className="bg-stone-900 p-3 rounded-lg border border-stone-800 space-y-1.5 text-xs text-stone-300">
                      <div className="font-bold text-amber-400 flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span>{isMr ? 'सविस्तर स्पष्टीकरण व संदर्भ:' : 'Detailed Explanation & Reference:'}</span>
                      </div>
                      <p className="leading-relaxed text-stone-300">
                        {quizLang === 'mr' ? q.explanationMr : q.explanationEn}
                      </p>
                      {q.reference && (
                        <p className="text-[11px] text-stone-400 italic pt-1 border-t border-stone-800/80">
                          🏛️ {isMr ? 'संदर्भ:' : 'Reference:'} {q.reference}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-stone-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>{isMr ? 'पुढील क्विझ: उद्या मध्यरात्री १२:०० वाजता' : 'Next quiz: Tomorrow at midnight'}</span>
              </div>

              <button
                type="button"
                onClick={() => setIsReviewOpen(false)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                {isMr ? 'बंद करा' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
