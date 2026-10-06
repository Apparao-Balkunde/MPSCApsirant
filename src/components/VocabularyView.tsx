import React, { useState, useEffect, useMemo } from 'react';
import { 
  SpellCheck, 
  Sparkles, 
  BookOpen, 
  Trophy, 
  RotateCcw, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  Flame, 
  Clock, 
  HelpCircle, 
  Filter, 
  Search, 
  Play, 
  Award, 
  Layers, 
  ArrowRight, 
  Compass, 
  Zap, 
  Check, 
  FileText 
} from 'lucide-react';
import { VOCAB_MATCH_PAIRS, VOCAB_MATCHING_MCQS, VocabMatchPair } from '../data/vocabMatchingQuestions';
import { soundFx } from '../utils/audio';

interface VocabularyViewProps {
  language: 'mr' | 'en';
  onStartPracticeWithQuestions?: (questionIds: string[], title: string) => void;
}

type VocabTabMode = 'matching_game' | 'mpsc_mcqs' | 'dictionary';
type PairCategory = 'all' | 'synonyms' | 'antonyms' | 'one_word' | 'idioms';

export const VocabularyView: React.FC<VocabularyViewProps> = ({
  language,
  onStartPracticeWithQuestions,
}) => {
  const isMr = language === 'mr';

  const [activeMode, setActiveMode] = useState<VocabTabMode>('matching_game');
  const [selectedCategory, setSelectedCategory] = useState<PairCategory>('all');
  const [roundSize, setRoundSize] = useState<number>(5); // 5 or 8 pairs per game round
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Matching Game State
  const [gamePairs, setGamePairs] = useState<VocabMatchPair[]>([]);
  const [shuffledEnglish, setShuffledEnglish] = useState<{ id: string; word: string }[]>([]);
  const [shuffledMarathi, setShuffledMarathi] = useState<{ id: string; meaning: string }[]>([]);
  const [selectedEnglishId, setSelectedEnglishId] = useState<string | null>(null);
  const [selectedMarathiId, setSelectedMarathiId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongPairAnimation, setWrongPairAnimation] = useState<{ enId: string; mrId: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [roundCompleted, setRoundCompleted] = useState<boolean>(false);
  const [roundSeconds, setRoundSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [hintPairId, setHintPairId] = useState<string | null>(null);

  // Filtered master pairs
  const filteredPairs = useMemo(() => {
    return VOCAB_MATCH_PAIRS.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        p.englishWord.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.marathiMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.exampleSentence && p.exampleSentence.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Setup a new matching game round
  const startNewGameRound = (cat: PairCategory = selectedCategory, size: number = roundSize) => {
    let pool = VOCAB_MATCH_PAIRS;
    if (cat !== 'all') {
      pool = pool.filter((p) => p.category === cat);
    }
    // Shuffle and pick `size` items
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random()).slice(0, size);

    setGamePairs(shuffledPool);
    setShuffledEnglish(
      shuffledPool
        .map((p) => ({ id: p.id, word: p.englishWord }))
        .sort(() => 0.5 - Math.random())
    );
    setShuffledMarathi(
      shuffledPool
        .map((p) => ({ id: p.id, meaning: p.marathiMeaning }))
        .sort(() => 0.5 - Math.random())
    );

    setSelectedEnglishId(null);
    setSelectedMarathiId(null);
    setMatchedIds(new Set());
    setWrongPairAnimation(null);
    setRoundCompleted(false);
    setRoundSeconds(0);
    setIsTimerRunning(true);
    setHintPairId(null);
  };

  // Initialize round on mount or category change
  useEffect(() => {
    startNewGameRound(selectedCategory, roundSize);
  }, [selectedCategory, roundSize]);

  // Round timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && !roundCompleted) {
      interval = setInterval(() => {
        setRoundSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, roundCompleted]);

  // Speech pronunciation helper
  const handleSpeak = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Handle English item click
  const handleSelectEnglish = (id: string) => {
    if (matchedIds.has(id)) return;
    soundFx.playClickSound();
    setSelectedEnglishId(id);

    // If a Marathi meaning is already selected, test match immediately
    if (selectedMarathiId) {
      evaluateMatch(id, selectedMarathiId);
    }
  };

  // Handle Marathi item click
  const handleSelectMarathi = (id: string) => {
    if (matchedIds.has(id)) return;
    soundFx.playClickSound();
    setSelectedMarathiId(id);

    // If an English word is already selected, test match immediately
    if (selectedEnglishId) {
      evaluateMatch(selectedEnglishId, id);
    }
  };

  // Match evaluation logic
  const evaluateMatch = (enId: string, mrId: string) => {
    if (enId === mrId) {
      // Correct Match!
      soundFx.playCorrectSound();
      const nextMatched = new Set(matchedIds);
      nextMatched.add(enId);
      setMatchedIds(nextMatched);

      setSelectedEnglishId(null);
      setSelectedMarathiId(null);
      setHintPairId(null);

      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > bestStreak) {
        setBestStreak(nextStreak);
      }
      setScore((prev) => prev + 10 + nextStreak * 2);

      // Check if whole round is completed
      if (nextMatched.size === gamePairs.length && gamePairs.length > 0) {
        setRoundCompleted(true);
        setIsTimerRunning(false);
        soundFx.playExamSubmitSound();
      }
    } else {
      // Mismatch
      soundFx.playWrongSound();
      setWrongPairAnimation({ enId, mrId });
      setStreak(0);

      setTimeout(() => {
        setWrongPairAnimation(null);
        setSelectedEnglishId(null);
        setSelectedMarathiId(null);
      }, 750);
    }
  };

  // Show hint for currently selected English word
  const handleShowHint = () => {
    if (selectedEnglishId) {
      setHintPairId(selectedEnglishId);
    } else {
      // Pick first unmatched pair
      const unmatched = gamePairs.find((p) => !matchedIds.has(p.id));
      if (unmatched) {
        setSelectedEnglishId(unmatched.id);
        setHintPairId(unmatched.id);
      }
    }
  };

  return (
    <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-stone-900 via-stone-850 to-amber-950/70 border border-amber-500/30 p-5 sm:p-7 shadow-xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMr ? 'MPSC इंग्रजी शब्दसंग्रह जोड्या केंद्र' : 'MPSC English-to-Marathi Vocab Hub'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <SpellCheck className="w-7 h-7 text-amber-400 shrink-0" />
              <span>{isMr ? 'इंग्रजी-मराठी शब्दसंग्रह व जोड्या जुळवा' : 'English-to-Marathi Vocabulary & Word Matching'}</span>
            </h1>
            <p className="text-sm text-stone-300 max-w-2xl leading-relaxed">
              {isMr
                ? 'राज्यसेवा मुख्य आणि संयुक्त गट-ब व क मुख्य (PSI, STI, ASO, कर सहाय्यक) परीक्षेत थेट विचारल्या जाणाऱ्या "स्तंभ अ व ब मधील जोड्या जुळवा" प्रश्नांचा परस्परसंवादी (Interactive) सराव व अधिकृत PYQ चाचण्या!'
                : 'Interactive English-to-Marathi word-matching quizzes & official MPSC Previous Year Question papers to master Column A & B match questions with high accuracy.'}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-stone-900/90 border border-stone-800 rounded-xl p-3 shrink-0">
            <div className="text-center px-2">
              <div className="text-xs text-stone-400 font-medium">{isMr ? 'एकूण जोड्या' : 'Word Pairs'}</div>
              <div className="text-xl font-black text-amber-400 font-mono">{VOCAB_MATCH_PAIRS.length}+</div>
            </div>
            <div className="w-px h-8 bg-stone-800" />
            <div className="text-center px-2">
              <div className="text-xs text-stone-400 font-medium">{isMr ? 'PYQ MCQs' : 'Match MCQs'}</div>
              <div className="text-xl font-black text-emerald-400 font-mono">{VOCAB_MATCHING_MCQS.length}</div>
            </div>
            <div className="w-px h-8 bg-stone-800" />
            <div className="text-center px-2">
              <div className="text-xs text-stone-400 font-medium">{isMr ? 'बेस्ट स्ट्रीक' : 'Best Streak'}</div>
              <div className="text-xl font-black text-amber-300 font-mono flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span>{bestStreak}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-stone-800/80 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveMode('matching_game')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeMode === 'matching_game'
                ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>{isMr ? 'जोड्या लावा खेळ (Match Game)' : 'Word Match Game'}</span>
          </button>

          <button
            onClick={() => setActiveMode('mpsc_mcqs')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeMode === 'mpsc_mcqs'
                ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{isMr ? 'MPSC अधिकृत MCQ चाचण्या (Test Engine)' : 'MPSC Match MCQs'}</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/40">
              {VOCAB_MATCHING_MCQS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveMode('dictionary')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeMode === 'dictionary'
                ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{isMr ? 'शब्दसंग्रह सूची व उच्चार (Word Directory)' : 'Vocab Directory'}</span>
          </button>
        </div>
      </div>

      {/* MODE 1: INTERACTIVE WORD MATCHING GAME */}
      {activeMode === 'matching_game' && (
        <div className="space-y-5">
          {/* Controls Bar: Category Selector, Round Size, New Game */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
              <span className="text-xs text-stone-400 font-semibold mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                {isMr ? 'घटक:' : 'Category:'}
              </span>
              {[
                { id: 'all', labelMr: 'सर्व जोड्या', labelEn: 'All' },
                { id: 'synonyms', labelMr: 'समानार्थी (Synonyms)', labelEn: 'Synonyms' },
                { id: 'antonyms', labelMr: 'विरुद्धार्थी (Antonyms)', labelEn: 'Antonyms' },
                { id: 'one_word', labelMr: 'शब्दसमूह (One-Word)', labelEn: 'One-Word' },
                { id: 'idioms', labelMr: 'वाक्प्रचार (Idioms)', labelEn: 'Idioms' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as PairCategory)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-750'
                  }`}
                >
                  {isMr ? cat.labelMr : cat.labelEn}
                </button>
              ))}
            </div>

            {/* Game Options & Actions */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-stone-800 rounded-lg p-0.5 text-xs font-bold text-stone-300">
                <button
                  onClick={() => setRoundSize(5)}
                  className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                    roundSize === 5 ? 'bg-amber-500 text-stone-950 font-black' : 'hover:text-white'
                  }`}
                >
                  {isMr ? '५ जोड्या' : '5 Pairs'}
                </button>
                <button
                  onClick={() => setRoundSize(8)}
                  className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                    roundSize === 8 ? 'bg-amber-500 text-stone-950 font-black' : 'hover:text-white'
                  }`}
                >
                  {isMr ? '८ जोड्या' : '8 Pairs'}
                </button>
              </div>

              <button
                onClick={handleShowHint}
                className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 border border-stone-700 text-amber-300 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                title={isMr ? 'मदतीसाठी हिंट पहा' : 'Show Hint'}
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>{isMr ? 'हिंट' : 'Hint'}</span>
              </button>

              <button
                onClick={() => startNewGameRound(selectedCategory, roundSize)}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isMr ? 'पुन्हा सुरू करा' : 'Restart Round'}</span>
              </button>
            </div>
          </div>

          {/* Live Game Scoreboard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-stone-400 font-medium">{isMr ? 'एकूण गुण' : 'Score'}</div>
                <div className="text-lg font-black text-amber-300 font-mono">{score}</div>
              </div>
            </div>

            <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5 fill-orange-400" />
              </div>
              <div>
                <div className="text-[11px] text-stone-400 font-medium">{isMr ? 'स्ट्रीक (सलग अचूक)' : 'Current Streak'}</div>
                <div className="text-lg font-black text-orange-400 font-mono">x{streak}</div>
              </div>
            </div>

            <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-stone-400 font-medium">{isMr ? 'जुळलेल्या जोड्या' : 'Matched Pairs'}</div>
                <div className="text-lg font-black text-emerald-400 font-mono">
                  {matchedIds.size} / {gamePairs.length}
                </div>
              </div>
            </div>

            <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-stone-800 text-stone-300 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-[11px] text-stone-400 font-medium">{isMr ? 'वेळ' : 'Time'}</div>
                <div className="text-lg font-black text-stone-200 font-mono">
                  {Math.floor(roundSeconds / 60)}:{String(roundSeconds % 60).padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>

          {/* Hint Banner if active */}
          {hintPairId && (
            <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {isMr ? 'हिंट:' : 'Hint:'}{' '}
                  <strong>{gamePairs.find((p) => p.id === hintPairId)?.englishWord}</strong>{' '}
                  {isMr ? 'चा योग्य मराठी अर्थ' : 'matches with'}:{' '}
                  <span className="underline decoration-amber-400 font-bold">
                    {gamePairs.find((p) => p.id === hintPairId)?.marathiMeaning}
                  </span>
                </span>
              </div>
              <button
                onClick={() => setHintPairId(null)}
                className="text-stone-400 hover:text-stone-200 text-xs px-2 py-0.5 rounded cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* Round Completed Success Banner */}
          {roundCompleted && (
            <div className="bg-gradient-to-r from-emerald-950/80 via-stone-900 to-amber-950/80 border-2 border-emerald-500 rounded-2xl p-6 text-center space-y-4 shadow-2xl animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-4 ring-emerald-500/30">
                <Trophy className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white">
                  {isMr ? '🎉 अभिनंदन! सर्व जोड्या अचूक जुळल्या!' : '🎉 Round Completed! All Pairs Matched!'}
                </h3>
                <p className="text-sm text-stone-300">
                  {isMr
                    ? `तुम्ही ${roundSeconds} सेकंदात सर्व ${gamePairs.length} जोड्या जुळवून +${gamePairs.length * 10} गुण मिळवले!`
                    : `You completed all ${gamePairs.length} pairs in ${roundSeconds} seconds with high accuracy!`}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => startNewGameRound(selectedCategory, roundSize)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm flex items-center gap-2 cursor-pointer shadow-lg transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{isMr ? 'पुढील फेरी खेळा (Next Round)' : 'Play Next Round'}</span>
                </button>
                {onStartPracticeWithQuestions && (
                  <button
                    onClick={() => {
                      const mcqIds = VOCAB_MATCHING_MCQS.map((q) => q.id);
                      onStartPracticeWithQuestions(mcqIds, 'MPSC Official Word Matching Quiz');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center gap-2 cursor-pointer shadow-lg transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{isMr ? 'अधिकृत PYQ MCQ परीक्षा द्या' : 'Take Full MPSC Match Exam'}</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* The Matching Grid: Left Column English vs Right Column Marathi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {/* Column A: English Words */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-2 py-1">
                <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{isMr ? 'स्तंभ "अ" (English Words)' : 'Column "A" (English Words)'}</span>
                </h3>
                <span className="text-[11px] text-stone-400">
                  {isMr ? 'इंग्रजी शब्द निवडा' : 'Click word to select'}
                </span>
              </div>

              <div className="space-y-2.5">
                {shuffledEnglish.map((item) => {
                  const isMatched = matchedIds.has(item.id);
                  const isSelected = selectedEnglishId === item.id;
                  const isWrong = wrongPairAnimation?.enId === item.id;
                  const pairInfo = gamePairs.find((p) => p.id === item.id);

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectEnglish(item.id)}
                      disabled={isMatched}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isMatched
                          ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 opacity-60 cursor-default'
                          : isWrong
                          ? 'bg-rose-950/60 border-rose-500 text-white animate-shake'
                          : isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-white shadow-md ring-2 ring-amber-400/50 scale-[1.01]'
                          : 'bg-stone-900 hover:bg-stone-850 border-stone-800 text-stone-200 hover:border-stone-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm sm:text-base font-black tracking-wide">
                            {item.word}
                          </span>
                          {pairInfo?.pronunciation && (
                            <span className="text-[11px] text-stone-400 font-medium">
                              ({pairInfo.pronunciation})
                            </span>
                          )}
                        </div>
                        {pairInfo?.examTag && (
                          <div className="text-[10px] text-amber-400/90 font-medium">
                            {pairInfo.examTag}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => handleSpeak(item.word, e)}
                          title="उच्चार ऐका (Listen pronunciation)"
                          className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        {isMatched ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        ) : isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-black text-xs">
                            ✓
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-stone-700" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Column B: Marathi Meanings */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-2 py-1">
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{isMr ? 'स्तंभ "ब" (मराठी अर्थ / संदर्भ)' : 'Column "B" (Marathi Meanings)'}</span>
                </h3>
                <span className="text-[11px] text-stone-400">
                  {isMr ? 'योग्य अर्थावर क्लिक करा' : 'Click matching meaning'}
                </span>
              </div>

              <div className="space-y-2.5">
                {shuffledMarathi.map((item) => {
                  const isMatched = matchedIds.has(item.id);
                  const isSelected = selectedMarathiId === item.id;
                  const isWrong = wrongPairAnimation?.mrId === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectMarathi(item.id)}
                      disabled={isMatched}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isMatched
                          ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 opacity-60 cursor-default'
                          : isWrong
                          ? 'bg-rose-950/60 border-rose-500 text-white animate-shake'
                          : isSelected
                          ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md ring-2 ring-emerald-400/50 scale-[1.01]'
                          : 'bg-stone-900 hover:bg-stone-850 border-stone-800 text-stone-200 hover:border-stone-700'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-semibold leading-relaxed">
                        {item.meaning}
                      </span>

                      {isMatched ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-400 text-stone-950 flex items-center justify-center font-black text-xs">
                          ✓
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-stone-700 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: MPSC MATCH THE COLUMNS MCQS (TEST ENGINE) */}
      {activeMode === 'mpsc_mcqs' && (
        <div className="space-y-5">
          {/* Section Info Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>{isMr ? 'अधिकृत MPSC जोड्या जुळवा परीक्षा संच' : 'Official MPSC Match-the-Pairs Exam Engine'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-300">
                {isMr
                  ? 'आयोगाच्या अधिकृत पॅटर्ननुसार स्तंभ "अ" व स्तंभ "ब" मधील शब्दांच्या a-2, b-1, c-4, d-3 अशा कोड पर्यायांवर आधारित प्रश्न. थेट परीक्षा इंजिनमध्ये सोडवा.'
                  : 'Practice official MPSC Column A & B match questions with standard format options. Launch straight into the full timed exam engine.'}
              </p>
            </div>

            {onStartPracticeWithQuestions && (
              <button
                onClick={() => {
                  const allIds = VOCAB_MATCHING_MCQS.map((q) => q.id);
                  onStartPracticeWithQuestions(allIds, 'MPSC Official Word Matching Quiz Master');
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm flex items-center gap-2 cursor-pointer shadow-lg shrink-0 transition-all hover:scale-105"
              >
                <Play className="w-4 h-4 fill-stone-950" />
                <span>{isMr ? 'सर्व प्रश्नांची टेस्ट सुरू करा (All 10 MCQs)' : 'Start Full Match Test'}</span>
              </button>
            )}
          </div>

          {/* List of MCQ Cards with Interactive Preview */}
          <div className="space-y-4">
            {VOCAB_MATCHING_MCQS.map((q, idx) => (
              <div
                key={q.id}
                className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 sm:p-5 space-y-4 hover:border-amber-500/40 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                      {q.yearTag || q.reference}
                    </span>
                  </div>

                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 font-medium border border-stone-700">
                    {q.difficulty}
                  </span>
                </div>

                {/* Question Text & Tables */}
                <pre className="text-xs sm:text-sm text-stone-200 font-sans whitespace-pre-wrap leading-relaxed bg-stone-950/60 p-3.5 rounded-lg border border-stone-850">
                  {isMr ? q.questionMr : q.questionEn}
                </pre>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(isMr ? q.optionsMr : q.optionsEn).map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className={`p-2.5 rounded-lg text-xs font-mono font-semibold flex items-center justify-between border ${
                        optIdx === q.correctAnswerIndex
                          ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                          : 'bg-stone-850/60 border-stone-800 text-stone-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-stone-700 text-stone-300 text-[10px] flex items-center justify-center font-bold">
                          {optIdx + 1}
                        </span>
                        <span>{opt}</span>
                      </span>
                      {optIdx === q.correctAnswerIndex && (
                        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded">
                          {isMr ? 'अधिकृत उत्तर' : 'Key'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Detailed Explanation */}
                <div className="text-xs text-stone-400 bg-stone-850/40 p-3 rounded-lg border border-stone-800 leading-relaxed">
                  <strong className="text-amber-300 block mb-1">
                    {isMr ? '📌 आयोगाचे अधिकृत स्पष्टीकरण:' : '📌 Official MPSC Explanation:'}
                  </strong>
                  {isMr ? q.explanationMr : q.explanationEn}
                </div>

                {/* Launch Single Question Practice */}
                {onStartPracticeWithQuestions && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => onStartPracticeWithQuestions([q.id], `MPSC Match MCQ #${idx + 1}`)}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-amber-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-stone-700"
                    >
                      <Play className="w-3 h-3 text-amber-400" />
                      <span>{isMr ? 'हा प्रश्न परीक्षेमध्ये सोडवा' : 'Practice This Question'}</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODE 3: VOCABULARY DIRECTORY & AUDIO PRONUNCIATION */}
      {activeMode === 'dictionary' && (
        <div className="space-y-5">
          {/* Search and Filters */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isMr ? 'इंग्रजी किंवा मराठी शब्द शोधा...' : 'Search English or Marathi word...'}
                className="w-full pl-9 pr-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
              {(['all', 'synonyms', 'antonyms', 'one_word', 'idioms'] as PairCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-stone-950 font-black shadow-xs'
                      : 'bg-stone-800 text-stone-300 hover:text-white'
                  }`}
                >
                  {cat === 'all'
                    ? isMr ? 'सर्व' : 'All'
                    : cat === 'synonyms'
                    ? isMr ? 'समानार्थी' : 'Synonyms'
                    : cat === 'antonyms'
                    ? isMr ? 'विरुद्धार्थी' : 'Antonyms'
                    : cat === 'one_word'
                    ? isMr ? 'शब्दसमूह' : 'One-Word'
                    : isMr ? 'वाक्प्रचार' : 'Idioms'}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPairs.map((pair) => (
              <div
                key={pair.id}
                className="bg-stone-900/90 border border-stone-800 hover:border-amber-500/40 rounded-xl p-4 space-y-2.5 transition-all shadow-md group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="text-base font-black text-white group-hover:text-amber-300 transition-colors">
                      {pair.englishWord}
                    </div>
                    {pair.pronunciation && (
                      <div className="text-xs text-stone-400 font-medium">
                        उच्चार: {pair.pronunciation}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleSpeak(pair.englishWord)}
                    title="उच्चार ऐका"
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-amber-400 hover:text-white transition-colors cursor-pointer shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs sm:text-sm font-semibold text-emerald-300 bg-stone-950/50 p-2 rounded-lg border border-stone-850">
                  {pair.marathiMeaning}
                </div>

                {pair.exampleSentence && (
                  <div className="text-xs text-stone-300 space-y-1 bg-stone-850/40 p-2.5 rounded-lg">
                    <div className="italic text-stone-200">"{pair.exampleSentence}"</div>
                    {pair.exampleSentenceMr && (
                      <div className="text-stone-400 text-[11px]">→ {pair.exampleSentenceMr}</div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1 border-t border-stone-800/80">
                  <span className="text-amber-400 font-bold">{pair.examTag}</span>
                  <span className="uppercase px-1.5 py-0.5 rounded bg-stone-800 font-mono">
                    {pair.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredPairs.length === 0 && (
            <div className="text-center py-12 text-stone-400 bg-stone-900/40 rounded-xl border border-stone-800">
              <Search className="w-8 h-8 text-stone-500 mx-auto mb-2" />
              <p className="text-sm">
                {isMr ? 'कोणतेही शब्द जुळले नाहीत. कृपया वेगळा शब्द शोधा.' : 'No words found matching your query.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
