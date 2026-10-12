import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X,
  Newspaper,
  Calendar,
  Sparkles,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  BookOpen,
  Zap,
  RotateCcw,
  Check,
  ChevronDown,
  Clock,
  ShieldAlert,
  Flame,
  ArrowRight,
  ArrowLeft,
  Share2,
  Copy,
  ExternalLink,
  Target
} from 'lucide-react';
import {
  MONTHLY_CURRENT_AFFAIRS_DRILL_DATA,
  CURRENT_AFFAIRS_CATEGORIES,
  DRILL_MONTHS_LIST,
  MonthlyCurrentAffairsItem,
  DrillStatement
} from '../data/monthlyCurrentAffairsDrill';
import { soundFx } from '../utils/audio';

interface MonthlyCurrentAffairsDrillModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: 'mr' | 'en';
  initialCategory?: string;
}

// Helper to escape regex special characters
const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Helper to highlight matching keywords
const highlightMatch = (text: string | undefined | null, query: string) => {
  if (!text) return null;
  if (!query || !query.trim()) return text;
  const trimmed = query.trim();
  const escaped = escapeRegExp(trimmed);
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-amber-400 text-stone-950 font-black px-1 py-0.5 rounded shadow-xs">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

export const MonthlyCurrentAffairsDrillModal: React.FC<MonthlyCurrentAffairsDrillModalProps> = ({
  isOpen,
  onClose,
  language = 'mr',
  initialCategory = 'all'
}) => {
  const isMr = language === 'mr';

  // Navigation & Filter States
  const [activeMode, setActiveMode] = useState<'study' | 'drill'>('study');
  const [selectedYear, setSelectedYear] = useState<'all' | 2025 | 2026 | 2027>('all');
  const [selectedMonth, setSelectedMonth] = useState<number>(0); // 0 = all
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Study Mode States: which question IDs have revealed facts
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  // Scratchpad for statements marked true/false by the user while thinking: questionId -> statementLabel -> 'true' | 'false' | null
  const [scratchpadMarks, setScratchpadMarks] = useState<Record<string, Record<string, 'true' | 'false' | null>>>({});
  // Copied toast
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Drill Exam Mode States
  const [isExamStarted, setIsExamStarted] = useState<boolean>(false);
  const [examQuestions, setExamQuestions] = useState<MonthlyCurrentAffairsItem[]>([]);
  const [currentExamIndex, setCurrentExamIndex] = useState<number>(0);
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({}); // index -> selectedOptionIndex
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examTimeRemaining, setExamTimeRemaining] = useState<number>(900); // 15 mins default
  const [examLimit, setExamLimit] = useState<number>(10); // 5, 10 or all
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize initial category
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Filter items
  const filteredItems = useMemo(() => {
    return MONTHLY_CURRENT_AFFAIRS_DRILL_DATA.filter((item) => {
      // Year filter
      if (selectedYear !== 'all' && item.year !== selectedYear) return false;
      // Month filter
      if (selectedMonth !== 0 && item.month !== selectedMonth) return false;
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = (item.titleMr + ' ' + item.titleEn).toLowerCase().includes(q);
        const matchStatements = item.statements.some(
          (s) =>
            s.textMr.toLowerCase().includes(q) ||
            s.textEn.toLowerCase().includes(q) ||
            s.factExplanationMr.toLowerCase().includes(q)
        );
        const matchRef = (item.officialReference + ' ' + item.mpscTrapNoteMr).toLowerCase().includes(q);
        const matchOptions = (item.optionsMr.join(' ') + ' ' + item.optionsEn.join(' ')).toLowerCase().includes(q);
        return matchTitle || matchStatements || matchRef || matchOptions;
      }
      return true;
    });
  }, [selectedYear, selectedMonth, selectedCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };
    CURRENT_AFFAIRS_CATEGORIES.forEach((cat) => {
      counts[cat.id] = 0;
    });

    MONTHLY_CURRENT_AFFAIRS_DRILL_DATA.forEach((item) => {
      // Respect year & month filters for counts
      const yearMatch = selectedYear === 'all' || item.year === selectedYear;
      const monthMatch = selectedMonth === 0 || item.month === selectedMonth;
      if (yearMatch && monthMatch) {
        counts.all += 1;
        if (counts[item.category] !== undefined) {
          counts[item.category] += 1;
        }
      }
    });

    return counts;
  }, [selectedYear, selectedMonth]);

  // Drill Exam Timer
  useEffect(() => {
    if (isExamStarted && !examSubmitted && examTimeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setExamTimeRemaining((prev) => {
          if (prev <= 1) {
            handleExamSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isExamStarted, examSubmitted, examTimeRemaining]);

  const handleStartExam = () => {
    soundFx.playClickSound();
    const sourcePool = [...filteredItems];
    // Shuffle pool
    const shuffled = sourcePool.sort(() => 0.5 - Math.random());
    const sliceCount = examLimit === 0 ? shuffled.length : Math.min(examLimit, shuffled.length);
    const selectedSubset = shuffled.slice(0, sliceCount);

    setExamQuestions(selectedSubset);
    setCurrentExamIndex(0);
    setExamAnswers({});
    setExamSubmitted(false);
    setExamTimeRemaining(sliceCount * 90); // 1.5 mins per 4-statement question
    setIsExamStarted(true);
  };

  const handleSelectExamAnswer = (optionIdx: number) => {
    soundFx.playClickSound();
    setExamAnswers((prev) => ({
      ...prev,
      [currentExamIndex]: optionIdx
    }));
  };

  const handleExamSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    soundFx.playCorrectSound();
    setExamSubmitted(true);
  };

  const handleRetakeExam = () => {
    soundFx.playClickSound();
    setIsExamStarted(false);
    setExamSubmitted(false);
    setExamAnswers({});
  };

  // Toggle Scratchpad mark in study / exam
  const handleToggleScratchpad = (questionId: string, label: string, mark: 'true' | 'false') => {
    soundFx.playClickSound();
    setScratchpadMarks((prev) => {
      const qMarks = prev[questionId] || {};
      const current = qMarks[label];
      const next = current === mark ? null : mark;
      return {
        ...prev,
        [questionId]: {
          ...qMarks,
          [label]: next
        }
      };
    });
  };

  const handleToggleReveal = (id: string) => {
    soundFx.playClickSound();
    setRevealedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopyFact = (item: MonthlyCurrentAffairsItem) => {
    soundFx.playClickSound();
    const textToCopy = `[MPSC चालू घडामोडी रिव्हर्स लर्निंग]\n📌 ${item.titleMr}\n${item.statements.map((s) => `${s.label}) ${s.textMr}`).join('\n')}\n\n✅ अचूक विश्लेषण:\n${item.reverseLearningFacts.pointsMr.join('\n')}\n\n📚 संदर्भ: ${item.officialReference}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Exam Score calculations (1 mark for correct, -0.25 negative for incorrect)
  const examStats = useMemo(() => {
    if (!examSubmitted || examQuestions.length === 0) {
      return { correct: 0, wrong: 0, unattempted: 0, marks: 0, accuracy: 0 };
    }
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    examQuestions.forEach((q, idx) => {
      const selected = examAnswers[idx];
      if (selected === undefined) {
        unattempted++;
      } else if (selected === q.correctAnswerIndex) {
        correct++;
      } else {
        wrong++;
      }
    });

    const marks = Number((correct * 1 - wrong * 0.25).toFixed(2));
    const accuracy = correct + wrong > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0;

    return { correct, wrong, unattempted, marks, accuracy };
  }, [examSubmitted, examQuestions, examAnswers]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-6xl max-h-[95vh] flex flex-col bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden text-stone-100">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-stone-950 shadow-md">
              <Newspaper className="w-5 h-5 fill-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-black text-amber-200 flex items-center gap-1.5">
                  <span>{isMr ? '📰 MPSC चालू घडामोडी रिव्हर्स क्विझ' : '📰 MPSC Monthly Current Affairs Drill'}</span>
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-[10px] sm:text-xs font-bold font-mono">
                  {isMr ? '४ विधानांचे प्रश्न' : '4-Statement Format'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] sm:text-xs font-bold">
                  {isMr ? '२०२५-२०२७ सिलॅबस' : '2025-2027 Syllabus'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
                {isMr
                  ? 'आयोगाच्या पॅटर्ननुसार ४ विधानांमधून रिव्हर्स लर्निंग व फॅक्ट्स पक्के करा'
                  : 'Master multi-statement high-yield current affairs via reverse learning'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Switcher */}
            <div className="hidden sm:flex items-center p-1 bg-stone-950 rounded-xl border border-stone-800">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClickSound();
                  setActiveMode('study');
                  setIsExamStarted(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeMode === 'study'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isMr ? '📖 रिव्हर्स स्टडी' : 'Study Mode'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFx.playClickSound();
                  setActiveMode('drill');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeMode === 'drill'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{isMr ? '⚡ टाईम्ड क्विझ' : 'Timed Drill'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                soundFx.playClickSound();
                onClose();
              }}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              title={isMr ? 'बंद करा' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MOBILE MODE SWITCHER */}
        <div className="flex sm:hidden items-center justify-between px-4 py-2 bg-stone-950 border-b border-stone-800 shrink-0">
          <button
            type="button"
            onClick={() => {
              soundFx.playClickSound();
              setActiveMode('study');
              setIsExamStarted(false);
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg text-center cursor-pointer ${
              activeMode === 'study' ? 'bg-amber-500 text-stone-950' : 'text-stone-400'
            }`}
          >
            {isMr ? '📖 रिव्हर्स स्टडी' : 'Study Mode'}
          </button>
          <button
            type="button"
            onClick={() => {
              soundFx.playClickSound();
              setActiveMode('drill');
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg text-center cursor-pointer ${
              activeMode === 'drill' ? 'bg-red-600 text-white' : 'text-stone-400'
            }`}
          >
            {isMr ? '⚡ टाईम्ड क्विझ' : 'Timed Drill'}
          </button>
        </div>

        {/* CONTROLS BAR (Year, Month, Category & Search) */}
        {!isExamStarted && (
          <div className="p-3 sm:p-4 bg-stone-900 border-b border-stone-800/80 space-y-3 shrink-0">
            {/* Top row: Year & Months & Search */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
              
              {/* Year Pills */}
              <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto pb-1 md:pb-0">
                <span className="text-xs font-bold text-stone-400 mr-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isMr ? 'वर्ष:' : 'Year:'}</span>
                </span>
                {(['all', 2025, 2026, 2027] as const).map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => {
                      soundFx.playClickSound();
                      setSelectedYear(yr);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedYear === yr
                        ? 'bg-amber-500 text-stone-950 font-black shadow-xs'
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    {yr === 'all' ? (isMr ? 'सर्व वर्ष' : 'All') : yr}
                  </button>
                ))}
              </div>

              {/* Month Dropdown / Selector */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-stone-400 hidden sm:inline">
                  {isMr ? 'महिना:' : 'Month:'}
                </span>
                <select
                  aria-label={isMr ? 'महिना निवडा' : 'Select Month'}
                  value={selectedMonth}
                  onChange={(e) => {
                    soundFx.playClickSound();
                    setSelectedMonth(Number(e.target.value));
                  }}
                  className="bg-stone-800 text-stone-200 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {DRILL_MONTHS_LIST.map((m) => (
                    <option key={m.monthNum} value={m.monthNum}>
                      {isMr ? m.labelMr : m.labelEn}
                    </option>
                  ))}
                </select>

                {/* Search Input */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isMr ? 'कीवर्ड शोधा (उदा. लाडकी बहीण, भारतरत्न)...' : 'Search topic, scheme, award...'}
                    className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-stone-800/90 border border-stone-700 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                      title={isMr ? 'साफ करा' : 'Clear'}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {CURRENT_AFFAIRS_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count = categoryCounts[cat.id] ?? 0;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      soundFx.playClickSound();
                      setSelectedCategory(cat.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-md ring-1 ring-amber-300'
                        : 'bg-stone-800/70 text-stone-300 hover:bg-stone-750 hover:text-white border border-stone-700/60'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{isMr ? cat.labelMr.replace(/^.+?\s/, '') : cat.labelEn}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected ? 'bg-stone-950 text-amber-300' : 'bg-stone-700 text-stone-300'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MAIN BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* ======================================================== */}
          {/* MODE 1: STUDY & REVERSE LEARNING EXPLORER                */}
          {/* ======================================================== */}
          {activeMode === 'study' && (
            <div className="space-y-6">
              {/* Info banner */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-stone-900 border border-amber-500/30 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-300 leading-relaxed">
                  <span className="font-bold text-amber-200">
                    {isMr ? '💡 रिव्हर्स लर्निंग (Reverse Learning) पद्धत:' : 'Reverse Learning Technique:'}
                  </span>{' '}
                  {isMr
                    ? 'खालील प्रत्येक प्रश्नात ४ विधाने आहेत. आधी प्रत्येक विधानावर [✓] किंवा [✗] टिक करून विचार करा, नंतर "रिव्हर्स फॅक्ट्स उघडा" वर क्लिक करून प्रत्येक विधानाची खरी वस्तुस्थिती आणि आयोगाचा संभाव्य ट्रॅप तपासा!'
                    : 'Analyze each 4-statement question. Use scratchpad ticks [✓] or [✗] to eliminate false statements, then tap "Reveal Reverse Facts" to verify exact facts and examiner traps.'}
                </div>
              </div>

              {filteredItems.length === 0 ? (
                <div className="text-center py-12 px-4 bg-stone-850 rounded-2xl border border-stone-800">
                  <HelpCircle className="w-12 h-12 text-stone-500 mx-auto mb-3" />
                  <h2 className="text-base font-bold text-stone-200">
                    {isMr ? 'निवडलेल्या निकषानुसार प्रश्न सापडले नाहीत' : 'No questions match the selected filter'}
                  </h2>
                  <p className="text-xs text-stone-400 mt-1">
                    {isMr ? 'कृपया वर्ष, महिना किंवा कीवर्ड बदलून पुन्हा प्रयत्न करा.' : 'Try clearing filters or changing search keywords.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClickSound();
                      setSelectedCategory('all');
                      setSelectedYear('all');
                      setSelectedMonth(0);
                      setSearchQuery('');
                    }}
                    className="mt-4 px-4 py-2 bg-amber-500 text-stone-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors cursor-pointer"
                  >
                    {isMr ? 'सर्व फिल्टर्स रीसेट करा' : 'Reset All Filters'}
                  </button>
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isRevealed = Boolean(revealedIds[item.id]);
                  const qScratch = scratchpadMarks[item.id] || {};

                  return (
                    <div
                      key={item.id}
                      className="bg-stone-850/90 rounded-2xl border border-stone-750 hover:border-stone-650 transition-all p-4 sm:p-6 space-y-4 shadow-lg"
                    >
                      {/* Item Top Badges */}
                      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-stone-750">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-xs font-black flex items-center justify-center border border-amber-500/30">
                            {idx + 1}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-stone-750 text-stone-300 text-[11px] font-bold">
                            {isMr ? item.categoryLabelMr : item.categoryLabelEn}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 text-[11px] font-mono border border-blue-500/30">
                            📅 {isMr ? item.monthNameMr : item.monthNameEn}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-300 text-[10px] font-bold border border-red-500/30">
                            {isMr ? item.highYieldBadgeMr : item.highYieldBadgeEn}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleCopyFact(item)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-amber-300 hover:bg-stone-750 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                            title={isMr ? 'फॅक्ट्स कॉपी करा' : 'Copy facts'}
                          >
                            {copiedId === item.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-[10px] text-emerald-400 font-bold">{isMr ? 'कॉपी झाले!' : 'Copied!'}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span className="text-[10px] hidden sm:inline">{isMr ? 'कॉपी' : 'Copy'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Question Context & Title */}
                      <div>
                        <h2 className="text-sm sm:text-base font-black text-amber-200 leading-snug">
                          {highlightMatch(isMr ? item.titleMr : item.titleEn, searchQuery)}
                        </h2>
                        <p className="text-xs text-stone-300 mt-1 italic">
                          {isMr ? item.leadContextMr : item.leadContextEn}
                        </p>
                      </div>

                      {/* 4 STATEMENTS LIST WITH SCRATCHPAD */}
                      <div className="space-y-2.5 bg-stone-900/80 p-3 sm:p-4 rounded-xl border border-stone-800">
                        {item.statements.map((stmt) => {
                          const userMark = qScratch[stmt.label];

                          return (
                            <div
                              key={stmt.label}
                              className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-850/60 transition-colors"
                            >
                              {/* Label badge */}
                              <div className="w-6 h-6 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/40 text-xs font-black flex items-center justify-center shrink-0 mt-0.5 font-mono">
                                {stmt.label}
                              </div>

                              {/* Statement Text */}
                              <div className="flex-1 text-xs sm:text-sm text-stone-200 leading-relaxed">
                                {highlightMatch(isMr ? stmt.textMr : stmt.textEn, searchQuery)}

                                {/* Revealed statement fact verification */}
                                {isRevealed && (
                                  <div
                                    className={`mt-2 p-2 rounded-lg text-xs leading-relaxed border animate-in fade-in duration-200 ${
                                      stmt.isCorrect
                                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                                        : 'bg-red-950/40 text-red-300 border-red-500/40'
                                    }`}
                                  >
                                    <div className="font-bold flex items-center gap-1.5 mb-1">
                                      {stmt.isCorrect ? (
                                        <>
                                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                          <span>{isMr ? 'विधान सत्य (बरोबर) आहे' : 'Statement is TRUE'}</span>
                                        </>
                                      ) : (
                                        <>
                                          <XCircle className="w-3.5 h-3.5 text-red-400" />
                                          <span>{isMr ? 'विधान असत्य (चूक) आहे' : 'Statement is FALSE'}</span>
                                        </>
                                      )}
                                    </div>
                                    <p className="text-stone-300 text-[11px] sm:text-xs">
                                      {isMr ? stmt.factExplanationMr : stmt.factExplanationEn}
                                    </p>
                                  </div>
                                )}
                              </div>

                              {/* Interactive Scratchpad Buttons (User rough mark) */}
                              {!isRevealed && (
                                <div className="flex items-center gap-1 shrink-0 ml-1">
                                  <button
                                    type="button"
                                    onClick={() => handleToggleScratchpad(item.id, stmt.label, 'true')}
                                    className={`w-6 h-6 rounded text-xs font-black flex items-center justify-center transition-all cursor-pointer ${
                                      userMark === 'true'
                                        ? 'bg-emerald-500 text-stone-950 ring-2 ring-emerald-300'
                                        : 'bg-stone-800 text-stone-400 hover:text-emerald-300'
                                    }`}
                                    title={isMr ? 'सत्य माना' : 'Mark True'}
                                  >
                                    ✓
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleToggleScratchpad(item.id, stmt.label, 'false')}
                                    className={`w-6 h-6 rounded text-xs font-black flex items-center justify-center transition-all cursor-pointer ${
                                      userMark === 'false'
                                        ? 'bg-red-500 text-white ring-2 ring-red-300'
                                        : 'bg-stone-800 text-stone-400 hover:text-red-400'
                                    }`}
                                    title={isMr ? 'असत्य माना' : 'Mark False'}
                                  >
                                    ✗
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Question Prompt */}
                      <p className="text-xs sm:text-sm font-bold text-amber-300">
                        {isMr ? item.questionPromptMr : item.questionPromptEn}
                      </p>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {item.optionsMr.map((opt, optIdx) => {
                          const isCorrectOpt = optIdx === item.correctAnswerIndex;
                          const showCorrect = isRevealed && isCorrectOpt;

                          return (
                            <div
                              key={optIdx}
                              className={`p-2.5 rounded-xl text-xs font-medium border transition-all ${
                                showCorrect
                                  ? 'bg-emerald-950/60 border-emerald-400 text-emerald-200 font-bold ring-2 ring-emerald-500/50 shadow-md'
                                  : 'bg-stone-900 border-stone-800 text-stone-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{isMr ? opt : item.optionsEn[optIdx]}</span>
                                {showCorrect && (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500 text-stone-950 font-black">
                                    {isMr ? 'अचूक उत्तर' : 'Correct'}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* REVEAL / HIDE TOGGLE BUTTON */}
                      <div className="pt-2 flex items-center justify-between flex-wrap gap-2 border-t border-stone-800">
                        <button
                          type="button"
                          onClick={() => handleToggleReveal(item.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                            isRevealed
                              ? 'bg-stone-750 text-stone-200 hover:bg-stone-700'
                              : 'bg-gradient-to-r from-amber-500 via-amber-600 to-red-600 text-stone-950 hover:brightness-110 font-black'
                          }`}
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>
                            {isRevealed
                              ? isMr
                                ? 'रिव्हर्स फॅक्ट्स लपवा'
                                : 'Hide Reverse Facts'
                              : isMr
                              ? '🔍 रिव्हर्स फॅक्ट्स व उत्तर उघडा'
                              : '🔍 Reveal Facts & Answer'}
                          </span>
                        </button>

                        <div className="text-[11px] text-stone-400 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-stone-500" />
                          <span>{item.officialReference}</span>
                        </div>
                      </div>

                      {/* REVERSE LEARNING DEEP FACT CARD */}
                      {isRevealed && (
                        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-stone-900 to-amber-950/30 border border-amber-500/40 space-y-3.5 animate-in fade-in duration-200">
                          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                            <Target className="w-4 h-4 text-amber-400" />
                            <span>{isMr ? item.reverseLearningFacts.headlineMr : item.reverseLearningFacts.headlineEn}</span>
                          </div>

                          {/* Bullet Points */}
                          <ul className="space-y-1.5 text-xs text-stone-200">
                            {(isMr ? item.reverseLearningFacts.pointsMr : item.reverseLearningFacts.pointsEn).map(
                              (point, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-2">
                                  <span className="text-amber-400 mt-0.5">•</span>
                                  <span className="leading-relaxed">{point}</span>
                                </li>
                              )
                            )}
                          </ul>

                          {/* Examiner Trap Warning */}
                          <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/40 text-xs text-red-200 flex items-start gap-2">
                            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-red-300">
                                {isMr ? '⚠️ आयोगाचा संभाव्य ट्रॅप: ' : 'Examiner Trap Alert: '}
                              </span>
                              <span>{isMr ? item.mpscTrapNoteMr : item.mpscTrapNoteEn}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* MODE 2: TIMED DRILL EXAM (⚡ टाईम्ड रिव्हर्स क्विझ)       */}
          {/* ======================================================== */}
          {activeMode === 'drill' && (
            <div className="space-y-6">
              
              {/* Exam Start Setup screen */}
              {!isExamStarted && (
                <div className="max-w-xl mx-auto p-6 sm:p-8 bg-stone-850 rounded-2xl border border-stone-750 text-center space-y-6 shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white mx-auto shadow-lg">
                    <Zap className="w-8 h-8 fill-white" />
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-amber-200">
                      {isMr ? '⚡ MPSC चालू घडामोडी स्पीड व अचूकता टेस्ट' : 'Timed Current Affairs Reverse Drill'}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                      {isMr
                        ? 'आयोगाच्या अस्सल ४ विधानांच्या प्रश्नांवर टाईम्ड सराव करा. प्रत्येकी १ गुण, १/४ निगेटिव्ह मार्किंग (-०.२५).'
                        : 'Practice authentic 4-statement MPSC pattern questions under timed conditions with 1/4th negative marking.'}
                    </p>
                  </div>

                  {/* Limit Picker */}
                  <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 space-y-3">
                    <span className="text-xs font-bold text-stone-400 block">
                      {isMr ? 'प्रश्नांची संख्या निवडा:' : 'Select Questions Limit:'}
                    </span>
                    <div className="flex items-center justify-center gap-3">
                      {[5, 10, 0].map((lim) => (
                        <button
                          key={lim}
                          type="button"
                          onClick={() => {
                            soundFx.playClickSound();
                            setExamLimit(lim);
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            examLimit === lim
                              ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                              : 'bg-stone-800 text-stone-300 hover:bg-stone-750'
                          }`}
                        >
                          {lim === 0 ? (isMr ? 'सर्व उपलब्ध' : 'All Available') : `${lim} ${isMr ? 'प्रश्न' : 'Qs'}`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Current Active Filter Info */}
                  <div className="text-xs text-stone-400">
                    <span>
                      {isMr ? 'निवडलेला विषय:' : 'Topic:'}{' '}
                      <strong className="text-amber-300">
                        {CURRENT_AFFAIRS_CATEGORIES.find((c) => c.id === selectedCategory)?.labelMr || selectedCategory}
                      </strong>
                    </span>
                    <span className="mx-2">•</span>
                    <span>
                      {isMr ? 'उपलब्ध प्रश्न:' : 'Available:'}{' '}
                      <strong className="text-amber-300">{filteredItems.length}</strong>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleStartExam}
                    disabled={filteredItems.length === 0}
                    className="w-full py-3.5 bg-gradient-to-r from-red-600 via-amber-600 to-yellow-500 hover:brightness-110 text-stone-950 font-black text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Zap className="w-4 h-4 fill-stone-950" />
                    <span>{isMr ? '🚀 टेस्ट सुरू करा' : 'Start Drill Exam Now'}</span>
                  </button>
                </div>
              )}

              {/* LIVE EXAM RUNNING */}
              {isExamStarted && !examSubmitted && examQuestions.length > 0 && (
                <div className="space-y-4">
                  {/* Exam top status bar */}
                  <div className="flex items-center justify-between p-3.5 bg-stone-850 rounded-xl border border-stone-800 flex-wrap gap-2">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-stone-800 text-amber-300 font-bold">
                        {isMr ? 'प्रश्न' : 'Question'} {currentExamIndex + 1} / {examQuestions.length}
                      </span>
                      <span className="text-stone-400">
                        ({Object.keys(examAnswers).length} {isMr ? 'सोडवले' : 'attempted'})
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Timer */}
                      <div
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs font-bold border ${
                          examTimeRemaining < 120
                            ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse'
                            : 'bg-stone-800 text-amber-300 border-stone-700'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          {Math.floor(examTimeRemaining / 60)}:
                          {String(examTimeRemaining % 60).padStart(2, '0')}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleExamSubmit}
                        className="px-3.5 py-1 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        {isMr ? 'सबमिट करा' : 'Submit'}
                      </button>
                    </div>
                  </div>

                  {/* ACTIVE QUESTION CARD */}
                  {(() => {
                    const currentQ = examQuestions[currentExamIndex];
                    if (!currentQ) return null;
                    const qScratch = scratchpadMarks[currentQ.id] || {};
                    const selectedOpt = examAnswers[currentExamIndex];

                    return (
                      <div className="bg-stone-850 rounded-2xl border border-stone-750 p-4 sm:p-6 space-y-4 shadow-xl">
                        
                        {/* Title & Metadata */}
                        <div>
                          <div className="flex items-center gap-2 text-[11px] text-amber-400 font-bold mb-1">
                            <span>{isMr ? currentQ.categoryLabelMr : currentQ.categoryLabelEn}</span>
                            <span>•</span>
                            <span>{isMr ? currentQ.monthNameMr : currentQ.monthNameEn}</span>
                          </div>
                          <h2 className="text-base sm:text-lg font-black text-amber-200">
                            {isMr ? currentQ.titleMr : currentQ.titleEn}
                          </h2>
                          <p className="text-xs text-stone-300 mt-1 italic">
                            {isMr ? currentQ.leadContextMr : currentQ.leadContextEn}
                          </p>
                        </div>

                        {/* 4 Statements with rough eliminate ticks */}
                        <div className="space-y-2 bg-stone-900/90 p-4 rounded-xl border border-stone-800">
                          {currentQ.statements.map((stmt) => {
                            const userMark = qScratch[stmt.label];
                            return (
                              <div
                                key={stmt.label}
                                className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-850/60 transition-colors"
                              >
                                <div className="w-6 h-6 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/40 text-xs font-black flex items-center justify-center shrink-0 mt-0.5 font-mono">
                                  {stmt.label}
                                </div>
                                <div className="flex-1 text-xs sm:text-sm text-stone-200 leading-relaxed">
                                  {isMr ? stmt.textMr : stmt.textEn}
                                </div>
                                <div className="flex items-center gap-1 shrink-0 ml-1">
                                  <button
                                    type="button"
                                    onClick={() => handleToggleScratchpad(currentQ.id, stmt.label, 'true')}
                                    className={`w-6 h-6 rounded text-xs font-black flex items-center justify-center cursor-pointer ${
                                      userMark === 'true'
                                        ? 'bg-emerald-500 text-stone-950 font-black'
                                        : 'bg-stone-800 text-stone-400 hover:text-emerald-300'
                                    }`}
                                    title={isMr ? 'सत्य मानले' : 'Mark True'}
                                  >
                                    ✓
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleToggleScratchpad(currentQ.id, stmt.label, 'false')}
                                    className={`w-6 h-6 rounded text-xs font-black flex items-center justify-center cursor-pointer ${
                                      userMark === 'false'
                                        ? 'bg-red-500 text-white font-black'
                                        : 'bg-stone-800 text-stone-400 hover:text-red-400'
                                    }`}
                                    title={isMr ? 'असत्य मानले' : 'Mark False'}
                                  >
                                    ✗
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Question Prompt */}
                        <p className="text-xs sm:text-sm font-bold text-amber-300">
                          {isMr ? currentQ.questionPromptMr : currentQ.questionPromptEn}
                        </p>

                        {/* 4 Options Selection */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {currentQ.optionsMr.map((opt, optIdx) => {
                            const isSelected = selectedOpt === optIdx;
                            return (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() => handleSelectExamAnswer(optIdx)}
                                className={`p-3 rounded-xl text-xs sm:text-sm text-left transition-all border flex items-center justify-between cursor-pointer ${
                                  isSelected
                                    ? 'bg-amber-500 text-stone-950 font-black border-amber-300 shadow-md ring-2 ring-amber-400/40'
                                    : 'bg-stone-900 border-stone-800 text-stone-200 hover:bg-stone-800 hover:border-stone-700'
                                }`}
                              >
                                <span>{isMr ? opt : currentQ.optionsEn[optIdx]}</span>
                                {isSelected && <Check className="w-4 h-4 shrink-0 text-stone-950" />}
                              </button>
                            );
                          })}
                        </div>

                        {/* Bottom Navigation */}
                        <div className="flex items-center justify-between pt-4 border-t border-stone-800">
                          <button
                            type="button"
                            onClick={() => {
                              soundFx.playClickSound();
                              setCurrentExamIndex((prev) => Math.max(0, prev - 1));
                            }}
                            disabled={currentExamIndex === 0}
                            className="px-4 py-2 bg-stone-800 hover:bg-stone-750 text-stone-300 text-xs font-bold rounded-xl disabled:opacity-30 cursor-pointer flex items-center gap-1.5"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>{isMr ? 'मागील प्रश्न' : 'Previous'}</span>
                          </button>

                          {currentExamIndex < examQuestions.length - 1 ? (
                            <button
                              type="button"
                              onClick={() => {
                                soundFx.playClickSound();
                                setCurrentExamIndex((prev) => prev + 1);
                              }}
                              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black rounded-xl cursor-pointer flex items-center gap-1.5 shadow-sm"
                            >
                              <span>{isMr ? 'पुढील प्रश्न' : 'Next'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={handleExamSubmit}
                              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl cursor-pointer flex items-center gap-1.5 shadow-md"
                            >
                              <span>{isMr ? '🎯 अंतिम सबमिट' : 'Submit Exam'}</span>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* POST-EXAM SCORECARD & COMPREHENSIVE REVIEW */}
              {isExamStarted && examSubmitted && (
                <div className="space-y-6">
                  {/* Score Card Box */}
                  <div className="p-6 bg-gradient-to-br from-stone-850 via-stone-900 to-amber-950/40 rounded-2xl border-2 border-amber-500/60 shadow-2xl space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Award className="w-6 h-6 text-amber-400" />
                        <h2 className="text-lg font-black text-amber-200">
                          {isMr ? '🎯 चालू घडामोडी रिव्हर्स क्विझ निकाल' : 'Drill Exam Scorecard'}
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={handleRetakeExam}
                        className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{isMr ? 'पुन्हा टेस्ट द्या' : 'Retake Test'}</span>
                      </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      <div className="p-3 bg-stone-900/90 rounded-xl border border-stone-800 text-center">
                        <span className="text-[10px] text-stone-400 font-bold block uppercase">
                          {isMr ? 'एकूण गुण (१/४ निगेटिव्ह)' : 'Total Score'}
                        </span>
                        <span className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
                          {examStats.marks}
                        </span>
                      </div>
                      <div className="p-3 bg-stone-900/90 rounded-xl border border-stone-800 text-center">
                        <span className="text-[10px] text-stone-400 font-bold block uppercase">
                          {isMr ? 'अचूकता (Accuracy)' : 'Accuracy'}
                        </span>
                        <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                          {examStats.accuracy}%
                        </span>
                      </div>
                      <div className="p-3 bg-stone-900/90 rounded-xl border border-stone-800 text-center">
                        <span className="text-[10px] text-stone-400 font-bold block uppercase">
                          {isMr ? 'बरोबर (Correct)' : 'Correct'}
                        </span>
                        <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                          {examStats.correct}
                        </span>
                      </div>
                      <div className="p-3 bg-stone-900/90 rounded-xl border border-stone-800 text-center">
                        <span className="text-[10px] text-stone-400 font-bold block uppercase">
                          {isMr ? 'चूक (Wrong)' : 'Wrong (-0.25)'}
                        </span>
                        <span className="text-xl sm:text-2xl font-black text-red-400 font-mono">
                          {examStats.wrong}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* QUESTION REVIEW WITH FULL REVERSE LEARNING FACTS */}
                  <div className="space-y-4">
                    <h2 className="text-base font-black text-amber-200 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <span>{isMr ? 'सर्व प्रश्नांचे सविस्तर रिव्हर्स विश्लेषण' : 'Detailed Question Analysis & Reverse Facts'}</span>
                    </h2>

                    {examQuestions.map((q, idx) => {
                      const userAns = examAnswers[idx];
                      const isCorrect = userAns === q.correctAnswerIndex;
                      const isSkipped = userAns === undefined;

                      return (
                        <div
                          key={q.id}
                          className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3.5 bg-stone-850 ${
                            isCorrect
                              ? 'border-emerald-500/40'
                              : isSkipped
                              ? 'border-stone-700'
                              : 'border-red-500/40'
                          }`}
                        >
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="text-xs font-mono font-bold text-stone-400">
                              {isMr ? 'प्रश्न' : 'Q'} {idx + 1} • {isMr ? q.categoryLabelMr : q.categoryLabelEn}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                isCorrect
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : isSkipped
                                  ? 'bg-stone-750 text-stone-300'
                                  : 'bg-red-500/20 text-red-300 border border-red-500/40'
                              }`}
                            >
                              {isCorrect
                                ? isMr
                                  ? '✓ बरोबर (+१)'
                                  : 'Correct (+1)'
                                : isSkipped
                                ? isMr
                                  ? 'सोडवला नाही (०)'
                                  : 'Skipped (0)'
                                : isMr
                                ? '✗ चूक (-०.२५)'
                                : 'Incorrect (-0.25)'}
                            </span>
                          </div>

                          <h3 className="text-sm sm:text-base font-black text-amber-200">
                            {isMr ? q.titleMr : q.titleEn}
                          </h3>

                          {/* Statements with True/False validation */}
                          <div className="space-y-2 bg-stone-900/90 p-3.5 rounded-xl border border-stone-800">
                            {q.statements.map((s) => (
                              <div key={s.label} className="text-xs space-y-1">
                                <div className="flex items-start gap-2 text-stone-200">
                                  <span className="font-bold font-mono text-amber-300 shrink-0">[{s.label}]</span>
                                  <span>{isMr ? s.textMr : s.textEn}</span>
                                </div>
                                <div
                                  className={`ml-5 px-2.5 py-1 rounded text-[11px] font-medium border ${
                                    s.isCorrect
                                      ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                                      : 'bg-red-950/40 text-red-300 border-red-500/30'
                                  }`}
                                >
                                  <strong>{s.isCorrect ? (isMr ? 'सत्य: ' : 'TRUE: ') : (isMr ? 'असत्य: ' : 'FALSE: ')}</strong>
                                  <span>{isMr ? s.factExplanationMr : s.factExplanationEn}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Options status */}
                          <div className="text-xs space-y-1">
                            <span className="text-stone-400 block font-bold">
                              {isMr ? 'पर्याय:' : 'Options:'}
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {q.optionsMr.map((opt, oIdx) => {
                                const isOfficialCorrect = oIdx === q.correctAnswerIndex;
                                const isUserPick = userAns === oIdx;

                                return (
                                  <div
                                    key={oIdx}
                                    className={`p-2 rounded-lg text-xs border ${
                                      isOfficialCorrect
                                        ? 'bg-emerald-950/60 border-emerald-400 text-emerald-200 font-bold'
                                        : isUserPick
                                        ? 'bg-red-950/60 border-red-400 text-red-200 line-through'
                                        : 'bg-stone-900 border-stone-800 text-stone-400'
                                    }`}
                                  >
                                    <span>{isMr ? opt : q.optionsEn[oIdx]}</span>
                                    {isOfficialCorrect && (
                                      <span className="text-[10px] ml-1.5 text-emerald-400">✓ (अचूक)</span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Reverse Learning Bullet Points & Trap */}
                          <div className="p-3 bg-stone-900 rounded-xl border border-amber-500/30 space-y-2 text-xs">
                            <span className="font-bold text-amber-300 block">
                              💡 {isMr ? q.reverseLearningFacts.headlineMr : q.reverseLearningFacts.headlineEn}
                            </span>
                            <ul className="space-y-1 text-stone-300 pl-4 list-disc">
                              {(isMr ? q.reverseLearningFacts.pointsMr : q.reverseLearningFacts.pointsEn).map((pt, pIdx) => (
                                <li key={pIdx}>{pt}</li>
                              ))}
                            </ul>
                            <p className="text-[11px] text-red-300 pt-1 border-t border-stone-800">
                              <strong>{isMr ? '⚠️ ट्रॅप: ' : 'Trap: '}</strong>
                              {isMr ? q.mpscTrapNoteMr : q.mpscTrapNoteEn}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="px-4 sm:px-6 py-3 bg-stone-950 border-t border-stone-800 shrink-0 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>
              {isMr
                ? `एकूण ${MONTHLY_CURRENT_AFFAIRS_DRILL_DATA.length} अस्सल ४-विधानांचे MPSC प्रश्न सज्ज`
                : `${MONTHLY_CURRENT_AFFAIRS_DRILL_DATA.length} authentic 4-statement questions loaded`}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              soundFx.playClickSound();
              onClose();
            }}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-lg transition-colors cursor-pointer"
          >
            {isMr ? 'बंद करा' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
