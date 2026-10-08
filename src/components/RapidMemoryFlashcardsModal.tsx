import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X,
  Zap,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle2,
  RefreshCcw,
  Timer,
  Play,
  Pause,
  Award,
  Sparkles,
  Volume2,
  VolumeX,
  BookOpen,
  Filter,
  Check,
  Flame,
  HelpCircle,
  Share2,
  Copy,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  HIGH_YIELD_FLASHCARDS,
  FLASHCARD_CATEGORIES_CONFIG,
  FlashcardCategory,
  FlashcardItem
} from '../data/flashcardsData';
import { soundFx } from '../utils/audio';

interface RapidMemoryFlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'mr' | 'en';
  defaultCategory?: FlashcardCategory | 'all';
}

export const RapidMemoryFlashcardsModal: React.FC<RapidMemoryFlashcardsModalProps> = ({
  isOpen,
  onClose,
  language,
  defaultCategory = 'all'
}) => {
  const isMr = language === 'mr';

  // Modes: 'sprint' (1-min rapid sprint), 'deck' (browse & study deck), 'quiz' (active recall test)
  const [activeMode, setActiveMode] = useState<'sprint' | 'deck' | 'quiz'>('sprint');
  const [selectedCategory, setSelectedCategory] = useState<FlashcardCategory | 'all'>(defaultCategory);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [onlySaved, setOnlySaved] = useState<boolean>(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('mpsc_flashcard_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Sprint mode timer & score
  const [sprintTimeLeft, setSprintTimeLeft] = useState<number>(60);
  const [isSprintActive, setIsSprintActive] = useState<boolean>(false);
  const [sprintScore, setSprintScore] = useState<number>(0);
  const [sprintTotalViewed, setSprintTotalViewed] = useState<number>(0);
  const [sprintIsFinished, setSprintIsFinished] = useState<boolean>(false);
  const [sprintMistakes, setSprintMistakes] = useState<FlashcardItem[]>([]);
  const timerRef = useRef<any>(null);

  // Active recall quiz state
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState<number>(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizIsAnswered, setQuizIsAnswered] = useState<boolean>(false);

  // SpeechSynthesis
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mpsc_flashcard_bookmarks', JSON.stringify(Array.from(bookmarkedIds)));
    } catch {
      // ignore
    }
  }, [bookmarkedIds]);

  // Filtered Cards pool
  const filteredCards = useMemo(() => {
    return HIGH_YIELD_FLASHCARDS.filter((card) => {
      if (selectedCategory !== 'all' && card.category !== selectedCategory) {
        return false;
      }
      if (onlySaved && !bookmarkedIds.has(card.id)) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, onlySaved, bookmarkedIds]);

  const currentCard: FlashcardItem | undefined = filteredCards[currentIndex] || filteredCards[0];

  // Reset index when category or filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedCategory, onlySaved]);

  // Sprint 60-Second Timer
  useEffect(() => {
    if (activeMode === 'sprint' && isSprintActive && sprintTimeLeft > 0) {
      timerRef.current = setInterval(() => {
        setSprintTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsSprintActive(false);
            setSprintIsFinished(true);
            soundFx.playTimerCompletionSound();
            return 0;
          }
          if (prev === 10) {
            soundFx.playLowTimeWarningSound();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [activeMode, isSprintActive, sprintTimeLeft]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNextCard();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrevCard();
      } else if (e.code === 'ArrowUp' && isSprintActive) {
        e.preventDefault();
        handleSprintAnswer(true);
      } else if (e.code === 'ArrowDown' && isSprintActive) {
        e.preventDefault();
        handleSprintAnswer(false);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFlipped, currentIndex, filteredCards.length, isSprintActive]);

  if (!isOpen) return null;

  const handleFlip = () => {
    soundFx.playClickSound();
    setIsFlipped((prev) => !prev);
  };

  const handleNextCard = () => {
    if (filteredCards.length === 0) return;
    soundFx.playClickSound();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrevCard = () => {
    if (filteredCards.length === 0) return;
    soundFx.playClickSound();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundFx.playClickSound();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Sprint handlers
  const handleStartSprint = () => {
    soundFx.playClickSound();
    setSprintTimeLeft(60);
    setSprintScore(0);
    setSprintTotalViewed(0);
    setSprintMistakes([]);
    setSprintIsFinished(false);
    setIsSprintActive(true);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleSprintAnswer = (remembered: boolean) => {
    if (!currentCard || !isSprintActive) return;

    setSprintTotalViewed((prev) => prev + 1);

    if (remembered) {
      soundFx.playCorrectSound();
      setSprintScore((prev) => prev + 1);
    } else {
      soundFx.playClickSound();
      setSprintMistakes((prev) => [...prev, currentCard]);
    }

    // Auto move to next card in sprint
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  // Text to Speech
  const handleSpeakCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = isFlipped
      ? `${currentCard?.backTitleMr}. ${currentCard?.backKeyFactsMr.join('. ')}`
      : `${currentCard?.frontTitleMr}. ${currentCard?.frontSubtitleMr || ''}. ${currentCard?.frontClueMr}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = isMr ? 'mr-IN' : 'en-US';
    utterance.rate = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClickSound();
    if (!currentCard) return;

    const copyText = `⚡ MPSC १-मिनिट रॅपिड फ्लॅशकार्ड
[${isMr ? currentCard.categoryLabelMr : currentCard.categoryLabelEn}]
👉 प्रश्न: ${isMr ? currentCard.frontTitleMr : currentCard.frontTitleEn} - ${isMr ? currentCard.frontClueMr : currentCard.frontClueEn}
💡 उत्तर: ${isMr ? currentCard.backTitleMr : currentCard.backTitleEn}
📌 तथ्ये:
${(isMr ? currentCard.backKeyFactsMr : currentCard.backKeyFactsEn).map((f) => `• ${f}`).join('\n')}
(अभ्यास: MPSC सारथी Prep Engine)`;

    navigator.clipboard.writeText(copyText);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-stone-900 border border-amber-500/50 rounded-2xl shadow-2xl flex flex-col max-h-[94vh] overflow-hidden text-stone-100">
        
        {/* =========================================================
            HEADER BAR
           ========================================================= */}
        <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 px-4 sm:px-6 py-3.5 border-b border-amber-700/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
              <Zap className="w-5 h-5 fill-amber-400/30 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-black text-amber-200 tracking-tight">
                  {isMr ? '⚡ १-मिनिट रॅपिड रिव्हिजन फ्लॅशकार्ड्स' : '⚡ 1-Minute Rapid Memory Flashcards'}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
                  परीक्षा पूर्व शेवटची उजळणी
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                {isMr
                  ? 'समाजसुधारक, राज्यघटना कलमे, नद्या/धरणे व चालू घडामोडी २०२६-२७ ची हाय-स्पीड मेमरी टेस्ट'
                  : 'Social Reformers, Articles, Rivers & Dams, and Current Affairs 2026-27 instant memory drill.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClickSound();
              if (isSpeaking && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
            }}
            className="p-2 rounded-xl bg-stone-800/80 hover:bg-rose-950/80 hover:text-rose-300 text-stone-400 transition border border-stone-700 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* =========================================================
            MODE SWITCHER & CONTROLS
           ========================================================= */}
        <div className="bg-stone-950 px-4 sm:px-6 py-2.5 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                soundFx.playClickSound();
                setActiveMode('sprint');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeMode === 'sprint'
                  ? 'bg-amber-600 text-stone-950 shadow-md font-black shadow-amber-900/40'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>{isMr ? '⏱️ १-मिनिट स्प्रिंट' : '⏱️ 1-Min Sprint'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClickSound();
                setActiveMode('deck');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeMode === 'deck'
                  ? 'bg-amber-600 text-stone-950 shadow-md font-black shadow-amber-900/40'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isMr ? '📚 विषय डेक अभ्यास' : '📚 Study Deck'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClickSound();
                setActiveMode('quiz');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeMode === 'quiz'
                  ? 'bg-amber-600 text-stone-950 shadow-md font-black shadow-amber-900/40'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>{isMr ? '🎯 मेमरी क्विझ' : '🎯 Active Recall Quiz'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Bookmarked Filter Toggle */}
            <button
              onClick={() => {
                soundFx.playClickSound();
                setOnlySaved(!onlySaved);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                onlySaved
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${onlySaved ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isMr ? 'केवळ सेव्ह केलेले' : 'Saved Only'} ({bookmarkedIds.size})</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            CATEGORY PILLS CAROUSEL
           ========================================================= */}
        <div className="bg-stone-900/90 px-4 sm:px-6 py-2 border-b border-stone-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 select-none">
          <button
            onClick={() => {
              soundFx.playClickSound();
              setSelectedCategory('all');
            }}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-stone-950'
                : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white'
            }`}
          >
            {isMr ? '🌟 सर्व घटक (All)' : '🌟 All Topics'} ({HIGH_YIELD_FLASHCARDS.length})
          </button>

          {FLASHCARD_CATEGORIES_CONFIG.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = HIGH_YIELD_FLASHCARDS.filter((c) => c.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.playClickSound();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 font-black'
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white'
                }`}
              >
                <span>{isMr ? cat.nameMr : cat.nameEn}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-stone-950 text-amber-300' : 'bg-stone-700 text-stone-300'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* =========================================================
            MAIN INTERACTIVE WORKSPACE
           ========================================================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col justify-between">
          
          {/* =======================================================
              MODE 1: 1-MINUTE RAPID SPRINT
             ======================================================= */}
          {activeMode === 'sprint' && (
            <div className="flex-1 flex flex-col items-center justify-between gap-5">
              
              {/* Sprint Top Status Bar */}
              <div className="w-full bg-stone-950 p-3 sm:p-4 rounded-xl border border-stone-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Timer Ring / Pill */}
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono font-black text-sm sm:text-base border ${
                    sprintTimeLeft <= 10
                      ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                      : isSprintActive
                      ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                      : 'bg-stone-900 border-stone-700 text-stone-300'
                  }`}>
                    <Timer className="w-4 h-4" />
                    <span>{sprintTimeLeft}s</span>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-stone-400">
                      {isMr ? 'स्प्रिंट प्रगती:' : 'Sprint Score:'}
                    </div>
                    <div className="text-sm font-black text-amber-300 font-mono">
                      {sprintScore} {isMr ? 'लक्षात' : 'Recall'} / {sprintTotalViewed} {isMr ? 'पाहिले' : 'Total'}
                    </div>
                  </div>
                </div>

                {/* Start / Pause / Reset button */}
                <div className="flex items-center gap-2">
                  {!isSprintActive && !sprintIsFinished ? (
                    <button
                      onClick={handleStartSprint}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs rounded-xl transition shadow-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>{isMr ? '१-मिनिट स्प्रिंट सुरू करा' : 'Start 1-Min Sprint'}</span>
                    </button>
                  ) : isSprintActive ? (
                    <button
                      onClick={() => setIsSprintActive(false)}
                      className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold rounded-lg border border-stone-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Pause className="w-3.5 h-3.5" />
                      <span>{isMr ? 'थांबवा' : 'Pause'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleStartSprint}
                      className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-black rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCcw className="w-3.5 h-3.5" />
                      <span>{isMr ? 'पुन्हा सुरू करा' : 'Restart'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Sprint Finish Report Overlay */}
              {sprintIsFinished ? (
                <div className="w-full bg-gradient-to-br from-amber-950/80 via-stone-950 to-stone-900 p-6 rounded-2xl border border-amber-500/60 text-center space-y-4 my-auto animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-amber-200">
                      {isMr ? '🎉 ६०-सेकंद रॅपिड स्प्रिंट पूर्ण!' : '🎉 60-Second Rapid Sprint Completed!'}
                    </h3>
                    <p className="text-xs text-stone-300 mt-1">
                      {isMr
                        ? `तुम्ही ६० सेकंदात ${sprintTotalViewed} संकल्पना तपासल्या आणि ${sprintScore} यशस्वीपणे स्मरण केल्या.`
                        : `You reviewed ${sprintTotalViewed} concepts and successfully recalled ${sprintScore} in 60s.`}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                    <div className="bg-stone-900/90 p-3 rounded-xl border border-stone-800">
                      <div className="text-[10px] text-stone-400 font-bold">{isMr ? 'अचूकता' : 'Accuracy'}</div>
                      <div className="text-xl font-black font-mono text-emerald-400">
                        {sprintTotalViewed > 0 ? Math.round((sprintScore / sprintTotalViewed) * 100) : 0}%
                      </div>
                    </div>
                    <div className="bg-stone-900/90 p-3 rounded-xl border border-stone-800">
                      <div className="text-[10px] text-stone-400 font-bold">{isMr ? 'वेग (Cards/Min)' : 'Speed'}</div>
                      <div className="text-xl font-black font-mono text-amber-300">
                        {sprintTotalViewed}
                      </div>
                    </div>
                    <div className="bg-stone-900/90 p-3 rounded-xl border border-stone-800">
                      <div className="text-[10px] text-stone-400 font-bold">{isMr ? 'पुनरावलोकन' : 'Need Review'}</div>
                      <div className="text-xl font-black font-mono text-rose-400">
                        {sprintMistakes.length}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleStartSprint}
                      className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs rounded-xl shadow-lg cursor-pointer flex items-center gap-1.5"
                    >
                      <RefreshCcw className="w-4 h-4" />
                      <span>{isMr ? 'आणखी एक स्प्रिंट खेळा' : 'Play Another Sprint'}</span>
                    </button>
                    <button
                      onClick={() => setActiveMode('deck')}
                      className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs rounded-xl border border-stone-700 cursor-pointer"
                    >
                      {isMr ? 'डेक सविस्तर अभ्यासा' : 'Study Full Deck'}
                    </button>
                  </div>
                </div>
              ) : (
                /* Active Flashcard in Sprint */
                currentCard && (
                  <div
                    onClick={handleFlip}
                    className={`relative w-full max-w-2xl min-h-[300px] sm:min-h-[340px] bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 rounded-2xl border-2 transition-all duration-300 cursor-pointer p-6 sm:p-8 flex flex-col justify-between shadow-2xl group select-none ${
                      isFlipped
                        ? 'border-emerald-500/80 bg-stone-950 ring-2 ring-emerald-500/20'
                        : 'border-amber-500/60 hover:border-amber-400/90'
                    }`}
                  >
                    {/* Card Top Pill Badge */}
                    <div className="flex items-center justify-between gap-2 border-b border-stone-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
                          {isMr ? currentCard.categoryLabelMr : currentCard.categoryLabelEn}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono">
                          {currentIndex + 1} / {filteredCards.length}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={handleSpeakCard}
                          className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-amber-300 hover:bg-stone-700 transition"
                          title={isMr ? 'कार्ड ऐका' : 'Listen audio'}
                        >
                          {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={(e) => toggleBookmark(currentCard.id, e)}
                          className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-amber-300 hover:bg-stone-700 transition"
                          title={isMr ? 'बुकमार्क' : 'Bookmark'}
                        >
                          <Star className={`w-3.5 h-3.5 ${bookmarkedIds.has(currentCard.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Card Center Content */}
                    <div className="py-6 text-center space-y-3">
                      {!isFlipped ? (
                        /* Front side: Question / Prompt */
                        <div className="space-y-3 animate-in fade-in duration-150">
                          <span className="text-xs font-mono font-bold text-amber-400/90 tracking-widest uppercase">
                            {isMr ? '— प्रश्न / क्ल्यु —' : '— Question / Clue —'}
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-black text-amber-200 tracking-tight leading-tight">
                            {isMr ? currentCard.frontTitleMr : currentCard.frontTitleEn}
                          </h3>
                          {currentCard.frontSubtitleMr && (
                            <p className="text-sm font-semibold text-stone-300">
                              {isMr ? currentCard.frontSubtitleMr : currentCard.frontSubtitleEn}
                            </p>
                          )}
                          <div className="mt-4 p-3 rounded-xl bg-amber-950/30 border border-amber-700/40 text-xs text-amber-100 max-w-lg mx-auto font-medium">
                            {isMr ? currentCard.frontClueMr : currentCard.frontClueEn}
                          </div>
                        </div>
                      ) : (
                        /* Back side: Answer & Facts */
                        <div className="space-y-3 text-left animate-in fade-in duration-150">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase">
                              {isMr ? '✓ अधिकृत उत्तर व तथ्ये' : '✓ Official Answer & Facts'}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/50">
                              {isMr ? currentCard.highYieldTagMr : currentCard.highYieldTagEn}
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-black text-emerald-200">
                            {isMr ? currentCard.backTitleMr : currentCard.backTitleEn}
                          </h3>

                          <ul className="space-y-1.5 pt-2 text-xs sm:text-sm text-stone-200">
                            {(isMr ? currentCard.backKeyFactsMr : currentCard.backKeyFactsEn).map((fact, idx) => (
                              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                                <span className="text-emerald-400 font-bold shrink-0 mt-0.5">▸</span>
                                <span>{fact}</span>
                              </li>
                            ))}
                          </ul>

                          {currentCard.pyqReferenceMr && (
                            <div className="pt-2 text-[11px] text-stone-400 font-mono flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span>{isMr ? currentCard.pyqReferenceMr : currentCard.pyqReferenceEn}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Card Bottom Hint & Flip Action */}
                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                      <span className="flex items-center gap-1">
                        <RotateCw className="w-3 h-3 text-amber-400" />
                        <span>{isMr ? 'फ्लिप करण्यासाठी कार्डवर टॅप करा (किंवा Spacebar)' : 'Tap card to flip (or Space)'}</span>
                      </span>

                      <span className="text-[10px] font-mono text-stone-500">
                        {isFlipped ? (isMr ? 'मागील बाजू' : 'Back side') : (isMr ? 'पुढील बाजू' : 'Front side')}
                      </span>
                    </div>
                  </div>
                )
              )}

              {/* Sprint Quick Rating Buttons (Only when sprint is running) */}
              {isSprintActive && (
                <div className="flex items-center justify-center gap-4 w-full max-w-md pt-2">
                  <button
                    onClick={() => handleSprintAnswer(false)}
                    className="flex-1 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-rose-300 border border-rose-500/40 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md hover:scale-[1.02]"
                  >
                    <RotateCw className="w-4 h-4 text-rose-400" />
                    <span>{isMr ? 'पुन्हा आठवा (Review)' : 'Need Review'}</span>
                    <span className="hidden sm:inline text-[10px] text-stone-500 font-mono">(↓)</span>
                  </button>

                  <button
                    onClick={() => handleSprintAnswer(true)}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-stone-950 font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-md hover:scale-[1.02]"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isMr ? 'लक्षात राहिले! (Got it)' : 'Remembered'}</span>
                    <span className="hidden sm:inline text-[10px] text-emerald-950 font-mono font-bold">(↑)</span>
                  </button>
                </div>
              )}

            </div>
          )}

          {/* =======================================================
              MODE 2: CATEGORIZED STUDY DECK
             ======================================================= */}
          {activeMode === 'deck' && (
            <div className="flex-1 flex flex-col items-center justify-between gap-5">
              
              {/* Deck Progress Bar */}
              <div className="w-full bg-stone-950 px-4 py-2.5 rounded-xl border border-stone-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-300">
                    {isMr ? 'कार्ड क्र.' : 'Card'} {currentIndex + 1} / {filteredCards.length}
                  </span>
                  <span className="text-stone-500">•</span>
                  <span className="text-stone-400 truncate max-w-xs">
                    {isMr ? currentCard?.frontTitleMr : currentCard?.frontTitleEn}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCard}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-stone-300 hover:text-white transition"
                    title={isMr ? 'कार्ड नोट्स कॉपी करा' : 'Copy card notes'}
                  >
                    {copiedNotification ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span className="text-[11px]">{copiedNotification ? (isMr ? 'कॉपी झाले!' : 'Copied!') : (isMr ? 'कॉपी' : 'Copy')}</span>
                  </button>
                </div>
              </div>

              {/* Study Card */}
              {currentCard && (
                <div
                  onClick={handleFlip}
                  className={`relative w-full max-w-2xl min-h-[320px] sm:min-h-[360px] bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 rounded-2xl border-2 transition-all duration-300 cursor-pointer p-6 sm:p-8 flex flex-col justify-between shadow-2xl group select-none ${
                    isFlipped
                      ? 'border-emerald-500/80 bg-stone-950 ring-2 ring-emerald-500/20'
                      : 'border-amber-500/60 hover:border-amber-400/90'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-stone-800 pb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
                      {isMr ? currentCard.categoryLabelMr : currentCard.categoryLabelEn}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handleSpeakCard}
                        className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-amber-300 hover:bg-stone-700 transition"
                        title={isMr ? 'कार्ड ऐका' : 'Listen audio'}
                      >
                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={(e) => toggleBookmark(currentCard.id, e)}
                        className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-amber-300 hover:bg-stone-700 transition"
                        title={isMr ? 'बुकमार्क' : 'Bookmark'}
                      >
                        <Star className={`w-3.5 h-3.5 ${bookmarkedIds.has(currentCard.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Card Center Content */}
                  <div className="py-6 text-center space-y-3">
                    {!isFlipped ? (
                      <div className="space-y-3 animate-in fade-in duration-150">
                        <span className="text-xs font-mono font-bold text-amber-400/90 tracking-widest uppercase">
                          {isMr ? '— प्रश्न / घटक —' : '— Question / Prompt —'}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-amber-200 tracking-tight leading-tight">
                          {isMr ? currentCard.frontTitleMr : currentCard.frontTitleEn}
                        </h3>
                        {currentCard.frontSubtitleMr && (
                          <p className="text-sm font-semibold text-stone-300">
                            {isMr ? currentCard.frontSubtitleMr : currentCard.frontSubtitleEn}
                          </p>
                        )}
                        <div className="mt-4 p-3 rounded-xl bg-amber-950/30 border border-amber-700/40 text-xs text-amber-100 max-w-lg mx-auto font-medium">
                          {isMr ? currentCard.frontClueMr : currentCard.frontClueEn}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 text-left animate-in fade-in duration-150">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase">
                            {isMr ? '✓ अधिकृत उत्तर व तथ्ये' : '✓ Official Answer & Facts'}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/50">
                            {isMr ? currentCard.highYieldTagMr : currentCard.highYieldTagEn}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-black text-emerald-200">
                          {isMr ? currentCard.backTitleMr : currentCard.backTitleEn}
                        </h3>

                        <ul className="space-y-1.5 pt-2 text-xs sm:text-sm text-stone-200">
                          {(isMr ? currentCard.backKeyFactsMr : currentCard.backKeyFactsEn).map((fact, idx) => (
                            <li key={idx} className="flex items-start gap-2 leading-relaxed">
                              <span className="text-emerald-400 font-bold shrink-0 mt-0.5">▸</span>
                              <span>{fact}</span>
                            </li>
                          ))}
                        </ul>

                        {currentCard.pyqReferenceMr && (
                          <div className="pt-2 text-[11px] text-stone-400 font-mono flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>{isMr ? currentCard.pyqReferenceMr : currentCard.pyqReferenceEn}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                    <span className="flex items-center gap-1">
                      <RotateCw className="w-3 h-3 text-amber-400" />
                      <span>{isMr ? 'क्लिक करून उत्तर पहा (Spacebar)' : 'Click to flip (Spacebar)'}</span>
                    </span>
                    <span className="text-[10px] font-mono text-stone-500">
                      {isFlipped ? (isMr ? 'उत्तरे' : 'Answers') : (isMr ? 'प्रश्न' : 'Prompt')}
                    </span>
                  </div>
                </div>
              )}

              {/* Navigation Arrows */}
              <div className="flex items-center justify-center gap-4 w-full max-w-md pt-2">
                <button
                  onClick={handlePrevCard}
                  className="p-3 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 rounded-xl font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                  title={isMr ? 'मागील कार्ड (डावा बाण)' : 'Previous card'}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{isMr ? 'मागील' : 'Prev'}</span>
                </button>

                <button
                  onClick={handleFlip}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-black text-xs rounded-xl flex items-center gap-2 transition cursor-pointer shadow-lg"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>{isFlipped ? (isMr ? 'प्रश्न पहा' : 'View Question') : (isMr ? 'उत्तर पहा' : 'Reveal Answer')}</span>
                </button>

                <button
                  onClick={handleNextCard}
                  className="p-3 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 rounded-xl font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                  title={isMr ? 'पुढील कार्ड (उजवा बाण)' : 'Next card'}
                >
                  <span>{isMr ? 'पुढील' : 'Next'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* =======================================================
              MODE 3: ACTIVE RECALL MEMORY QUIZ
             ======================================================= */}
          {activeMode === 'quiz' && (
            <div className="flex-1 flex flex-col justify-between max-w-2xl mx-auto w-full gap-5">
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    {isMr ? 'रॅपिड मेमरी क्विझ' : 'Rapid Memory Quiz'}
                  </span>
                  <h4 className="text-sm font-bold text-stone-200">
                    {isMr ? 'फ्लॅशकार्ड्सवरील ज्ञान पडताळणी चाचणी' : 'Active Recall Verification Test'}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-400">{isMr ? 'गुण:' : 'Score:'}</span>
                  <div className="font-mono font-black text-base text-emerald-400">
                    {quizScore} / {filteredCards.length}
                  </div>
                </div>
              </div>

              {currentCard && (
                <div className="bg-stone-950 p-6 rounded-2xl border border-amber-600/50 space-y-4">
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span className="font-bold text-amber-300">
                      {isMr ? 'प्रश्न क्र.' : 'Question'} {quizQuestionIndex + 1}
                    </span>
                    <span className="font-mono">{currentCard.categoryLabelMr}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-amber-100">
                    {isMr ? currentCard.frontTitleMr : currentCard.frontTitleEn} - {isMr ? currentCard.frontClueMr : currentCard.frontClueEn}
                  </h3>

                  {/* 4 Multi-Choice Options */}
                  <div className="space-y-2 pt-2">
                    {[
                      currentCard.backTitleMr,
                      'सत्यशोधक समाज व बालहत्या प्रतिबंधक गृह',
                      'कोयना जलविद्युत प्रकल्प व शिवसागर जलाशय',
                      'कलम ३२ घटनात्मक उपाययोजनांचा अधिकार'
                    ].sort((a, b) => a.localeCompare(b)).map((option, idx) => {
                      const isCorrect = option === currentCard.backTitleMr;
                      const isChosen = quizSelectedOption === idx;

                      return (
                        <button
                          key={idx}
                          disabled={quizIsAnswered}
                          onClick={() => {
                            soundFx.playClickSound();
                            setQuizSelectedOption(idx);
                            setQuizIsAnswered(true);
                            if (isCorrect) {
                              soundFx.playCorrectSound();
                              setQuizScore((prev) => prev + 1);
                            }
                          }}
                          className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-semibold border transition cursor-pointer flex items-center justify-between ${
                            quizIsAnswered
                              ? isCorrect
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                                : isChosen
                                ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                                : 'bg-stone-900 border-stone-800 text-stone-400'
                              : 'bg-stone-900 border-stone-800 hover:border-amber-500 text-stone-200 hover:bg-stone-800/80'
                          }`}
                        >
                          <span>{option}</span>
                          {quizIsAnswered && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizIsAnswered && (
                    <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                      <div className="text-xs text-stone-300">
                        {quizSelectedOption !== null && [
                          currentCard.backTitleMr,
                          'सत्यशोधक समाज व बालहत्या प्रतिबंधक गृह',
                          'कोयना जलविद्युत प्रकल्प व शिवसागर जलाशय',
                          'कलम ३२ घटनात्मक उपाययोजनांचा अधिकार'
                        ].sort((a, b) => a.localeCompare(b))[quizSelectedOption] === currentCard.backTitleMr ? (
                          <span className="text-emerald-400 font-bold">✓ अचूक उत्तर! उत्तम तयारी.</span>
                        ) : (
                          <span className="text-rose-400 font-bold">✗ उत्तर चुकले. अचूक उत्तर: {currentCard.backTitleMr}</span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          soundFx.playClickSound();
                          setQuizIsAnswered(false);
                          setQuizSelectedOption(null);
                          setQuizQuestionIndex((prev) => (prev + 1) % filteredCards.length);
                          setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
                        }}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs rounded-xl transition cursor-pointer flex items-center gap-1"
                      >
                        <span>{isMr ? 'पुढील प्रश्न' : 'Next Question'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>

        {/* =========================================================
            FOOTER BAR
           ========================================================= */}
        <div className="bg-stone-950 px-4 sm:px-6 py-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 shrink-0">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-mono">
              💡 {isMr ? 'कीबोर्ड शॉर्टकट: Space (फ्लिप), ← / → (मागे/पुढे)' : 'Keyboard: Space (flip), ← / → (nav)'}
            </span>
          </div>

          <button
            onClick={() => {
              soundFx.playClickSound();
              if (isSpeaking && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold transition cursor-pointer"
          >
            {isMr ? 'बंद करा' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
