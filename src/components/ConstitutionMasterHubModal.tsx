import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  BookOpen,
  Award,
  Sparkles,
  Scale,
  Building2,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Filter,
  FileText,
  Share2,
  Flame,
  Layers,
  GraduationCap
} from 'lucide-react';
import {
  CONSTITUTION_ARTICLES,
  CONSTITUTION_SCHEDULES,
  CONSTITUTIONAL_AMENDMENTS,
  LANDMARK_JUDGMENTS,
  POLITY_PYQ_QUESTIONS,
  ConstitutionArticle,
  ConstitutionalSchedule,
  ConstitutionalAmendment,
  LandmarkJudgment,
  PolityPyqQuestion
} from '../data/constitutionData';
import { soundFx } from '../utils/audio';
import { getStoredAffiliateTag, buildAmazonAffiliateUrl, MPSC_AFFILIATE_BOOKS_DATA } from '../data/mpscAffiliateBooks';

interface ConstitutionMasterHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: 'mr' | 'en';
}

type MainTabType = 'articles' | 'schedules' | 'amendments' | 'judgments' | 'pyqs' | 'books_guide';

export const ConstitutionMasterHubModal: React.FC<ConstitutionMasterHubModalProps> = ({
  isOpen,
  onClose,
  language = 'mr'
}) => {
  const isMr = language === 'mr';
  const [activeTab, setActiveTab] = useState<MainTabType>('articles');

  // Search & Filter state for Articles
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticleId, setSelectedArticleId] = useState<number>(14);

  // Search for Amendments & Judgments
  const [amendmentSearch, setAmendmentSearch] = useState<string>('');
  const [onlySuperYieldAmendments, setOnlySuperYieldAmendments] = useState<boolean>(false);

  // PYQ Quiz State
  const [currentPyqIdx, setCurrentPyqIdx] = useState<number>(0);
  const [selectedPyqOption, setSelectedPyqOption] = useState<number | null>(null);
  const [isPyqSubmitted, setIsPyqSubmitted] = useState<boolean>(false);
  const [pyqScore, setPyqScore] = useState<number>(0);
  const [completedPyqQuiz, setCompletedPyqQuiz] = useState<boolean>(false);

  // Sound effects
  const playFx = (type: 'click' | 'correct' | 'wrong' | 'complete') => {
    try {
      if (type === 'click') soundFx.playClickSound();
      if (type === 'correct') soundFx.playCorrectSound();
      if (type === 'wrong') soundFx.playWrongSound();
      if (type === 'complete') soundFx.playExamSubmissionSound();
    } catch {
      // Audio fallback
    }
  };

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    return CONSTITUTION_ARTICLES.filter((art) => {
      const matchesCategory =
        selectedCategory === 'all' || art.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const inNumber =
        art.articleNumber.toLowerCase().includes(q) ||
        art.articleNumberInt.toString().includes(q);
      const inTitle =
        art.titleMr.toLowerCase().includes(q) ||
        art.titleEn.toLowerCase().includes(q);
      const inSummary =
        art.summaryMr.toLowerCase().includes(q) ||
        art.summaryEn.toLowerCase().includes(q);
      const inPart = art.partMr.toLowerCase().includes(q);
      const inHighlights = art.mpscHighlightsMr.some((h) =>
        h.toLowerCase().includes(q)
      );

      return inNumber || inTitle || inSummary || inPart || inHighlights;
    });
  }, [searchQuery, selectedCategory]);

  const activeArticle = useMemo(() => {
    return (
      CONSTITUTION_ARTICLES.find(
        (a) => a.articleNumberInt === selectedArticleId
      ) ||
      filteredArticles[0] ||
      CONSTITUTION_ARTICLES[0]
    );
  }, [selectedArticleId, filteredArticles]);

  // Filtered Amendments
  const filteredAmendments = useMemo(() => {
    return CONSTITUTIONAL_AMENDMENTS.filter((am) => {
      if (onlySuperYieldAmendments && !am.isSuperHighYield) return false;
      if (!amendmentSearch.trim()) return true;
      const q = amendmentSearch.toLowerCase();
      const inNum = am.amendmentNumber.toString().includes(q);
      const inYear = am.year.toString().includes(q);
      const inTitle =
        am.titleMr.toLowerCase().includes(q) ||
        am.titleEn.toLowerCase().includes(q);
      const inSummary = am.summaryMr.toLowerCase().includes(q);
      return inNum || inYear || inTitle || inSummary;
    });
  }, [amendmentSearch, onlySuperYieldAmendments]);

  // PYQ Quiz Handlers
  const handleSelectPyqOption = (idx: number) => {
    if (isPyqSubmitted) return;
    playFx('click');
    setSelectedPyqOption(idx);
  };

  const handleSubmitPyqAnswer = () => {
    if (selectedPyqOption === null || isPyqSubmitted) return;
    setIsPyqSubmitted(true);
    const cur = POLITY_PYQ_QUESTIONS[currentPyqIdx];
    if (selectedPyqOption === cur.correctOptionIndex) {
      playFx('correct');
      setPyqScore((prev) => prev + 1);
    } else {
      playFx('wrong');
    }
  };

  const handleNextPyq = () => {
    playFx('click');
    if (currentPyqIdx < POLITY_PYQ_QUESTIONS.length - 1) {
      setCurrentPyqIdx((prev) => prev + 1);
      setSelectedPyqOption(null);
      setIsPyqSubmitted(false);
    } else {
      playFx('complete');
      setCompletedPyqQuiz(true);
    }
  };

  const handleResetPyqQuiz = () => {
    playFx('click');
    setCurrentPyqIdx(0);
    setSelectedPyqOption(null);
    setIsPyqSubmitted(false);
    setPyqScore(0);
    setCompletedPyqQuiz(false);
  };

  // Affiliate link for M. Laxmikanth Polity book
  const affiliateTag = getStoredAffiliateTag();
  const laxmikanthBook = MPSC_AFFILIATE_BOOKS_DATA.find((b) => b.id === 'polity_laxmikanth') || MPSC_AFFILIATE_BOOKS_DATA[0];
  const laxmikanthBookUrl = buildAmazonAffiliateUrl(laxmikanthBook, affiliateTag);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-6xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] my-auto">
        {/* ================================================================= */}
        {/* MODAL HEADER */}
        {/* ================================================================= */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950/90 via-stone-900 to-indigo-950/70 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500/25 to-indigo-500/35 border border-blue-400/50 text-blue-300 flex items-center justify-center shrink-0 shadow-inner text-xl">
              ⚖️
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-black text-blue-100 flex items-center gap-1.5">
                  <span>{isMr ? 'भारतीय राज्यघटना व संविधान मास्टर हब' : 'Indian Constitution & Polity Master Hub'}</span>
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-black tracking-wide uppercase">
                  {isMr ? '३९५+ कलमे • १२ अनुसूच्या • १-१०६ घटनादुरुस्त्या • PYQs' : 'Constitution Navigator'}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                {isMr
                  ? 'मूलभूत हक्क, DPSP, संसद, सर्वोच्च न्यायालय, १२ अनुसूच्या, ऐतिहासिक खटले व MPSC राज्यव्यवस्था प्रश्नसंच'
                  : 'Articles, Schedules, Amendments, Landmark Judgments & MPSC PYQs for Rajyaseva & Combine'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-all cursor-pointer"
            title={isMr ? 'बंद करा' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ================================================================= */}
        {/* NAVIGATION TABS */}
        {/* ================================================================= */}
        <div className="bg-stone-950/80 px-4 sm:px-6 pt-3 border-b border-stone-800 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <button
            type="button"
            onClick={() => {
              playFx('click');
              setActiveTab('articles');
            }}
            className={`px-3.5 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'articles'
                ? 'text-blue-300 border-blue-500 bg-stone-900/90 shadow-sm'
                : 'text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-900/40'
            }`}
          >
            <Scale className="w-4 h-4 text-blue-400" />
            <span>{isMr ? '📜 संविधान कलम-कोश' : 'Articles Deck'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-800 text-stone-300 font-mono">
              {CONSTITUTION_ARTICLES.length}+
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              playFx('click');
              setActiveTab('schedules');
            }}
            className={`px-3.5 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'schedules'
                ? 'text-blue-300 border-blue-500 bg-stone-900/90 shadow-sm'
                : 'text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-900/40'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>{isMr ? '📋 १२ अनुसूच्या (Schedules)' : '12 Schedules'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playFx('click');
              setActiveTab('amendments');
            }}
            className={`px-3.5 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'amendments'
                ? 'text-blue-300 border-blue-500 bg-stone-900/90 shadow-sm'
                : 'text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-900/40'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{isMr ? '🔄 प्रमुख घटनादुरुस्त्या (१-१०६)' : 'Amendments'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playFx('click');
              setActiveTab('judgments');
            }}
            className={`px-3.5 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'judgments'
                ? 'text-blue-300 border-blue-500 bg-stone-900/90 shadow-sm'
                : 'text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-900/40'
            }`}
          >
            <Building2 className="w-4 h-4 text-purple-400" />
            <span>{isMr ? '🏛️ सर्वोच्च न्यायालय निकाल' : 'SC Judgments'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playFx('click');
              setActiveTab('pyqs');
            }}
            className={`px-3.5 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'pyqs'
                ? 'text-blue-300 border-blue-500 bg-stone-900/90 shadow-sm'
                : 'text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-900/40'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-orange-400" />
            <span>{isMr ? '🎯 राज्यघटना PYQs क्विझ' : 'Polity PYQ Quiz'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-orange-500/20 text-orange-300 font-mono font-bold">
              {POLITY_PYQ_QUESTIONS.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              playFx('click');
              setActiveTab('books_guide');
            }}
            className={`px-3.5 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'books_guide'
                ? 'text-blue-300 border-blue-500 bg-stone-900/90 shadow-sm'
                : 'text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-900/40'
            }`}
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>{isMr ? '📚 एम. लक्ष्मीकांत संदर्भ व नोट्स' : 'Polity Books & Notes'}</span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* TAB 1: ARTICLES DECK (कलम-कोश) */}
        {/* ================================================================= */}
        {activeTab === 'articles' && (
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Left list of articles with search & filter */}
            <div className="w-full md:w-80 lg:w-96 border-r border-stone-800 flex flex-col shrink-0 max-h-[38vh] md:max-h-full bg-stone-950/60">
              <div className="p-3 border-b border-stone-800 space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isMr ? 'कलम क्रमांक किंवा शब्द शोधा (उदा. १४, २१, ३२, ३६८, आरक्षण)...' : 'Search article or keyword...'}
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-blue-500"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Category filters */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-blue-500 text-stone-950'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {isMr ? 'सर्व (All)' : 'All'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('fundamental_rights')}
                    className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === 'fundamental_rights'
                        ? 'bg-indigo-500 text-stone-950'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    ⚖️ मूलभूत हक्क (१२-३५)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('dpsp')}
                    className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === 'dpsp'
                        ? 'bg-emerald-500 text-stone-950'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    🧭 DPSP (३६-५१)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('union_executive')}
                    className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === 'union_executive'
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    🏛️ संघराज्य (५२-१५१)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('emergency')}
                    className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === 'emergency'
                        ? 'bg-red-500 text-stone-950'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    🚨 आणीबाणी (३५२-३६०)
                  </button>
                </div>
              </div>

              {/* Scrollable list */}
              <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
                <div className="text-[10px] font-bold text-stone-400 px-1 pb-1 flex items-center justify-between">
                  <span>{filteredArticles.length} कलमे उपलब्ध</span>
                  <span className="text-amber-400">⚡ हाय-यिल्ड MPSC</span>
                </div>

                {filteredArticles.map((art) => {
                  const isSelected = art.articleNumberInt === activeArticle?.articleNumberInt;
                  return (
                    <button
                      key={art.articleNumber}
                      type="button"
                      onClick={() => {
                        playFx('click');
                        setSelectedArticleId(art.articleNumberInt);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-500/25 to-stone-900 border-blue-500/80 shadow-md ring-1 ring-blue-400/40'
                          : 'bg-stone-900/60 border-stone-800/80 hover:bg-stone-850 hover:border-stone-700'
                      }`}
                    >
                      <span className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40 font-mono font-black text-xs flex items-center justify-center shrink-0">
                        {art.articleNumber}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 justify-between">
                          <h4 className="text-xs font-bold text-stone-100 truncate">
                            {art.titleMr}
                          </h4>
                          {art.isHighYield && (
                            <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold shrink-0">
                              MPSC
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-stone-400 truncate mt-0.5">
                          {art.partMr}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Pane: Selected Article Detailed View */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              {activeArticle && (
                <>
                  {/* Article Hero Card */}
                  <div className="bg-stone-950/80 rounded-2xl border border-stone-800 p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-stone-800 pb-3">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-mono font-bold tracking-wide">
                          {activeArticle.partMr} ({activeArticle.partRoman})
                        </span>
                        <h2 className="text-base sm:text-xl font-black text-blue-100 mt-2 flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-xl bg-blue-500 text-stone-950 font-black text-sm">
                            कलम {activeArticle.articleNumber}
                          </span>
                          <span>{activeArticle.titleMr}</span>
                        </h2>
                        <p className="text-xs text-stone-400 mt-1 italic">
                          {activeArticle.titleEn}
                        </p>
                      </div>

                      <span className="px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono self-start shrink-0">
                        ⚡ MPSC High-Yield
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                        {isMr ? 'संविधानिक तरतुदींचा मुख्य सारांश (Summary):' : 'Core Constitutional Summary:'}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-normal bg-stone-900/70 p-3.5 rounded-xl border border-stone-800">
                        {activeArticle.summaryMr}
                      </p>
                    </div>
                  </div>

                  {/* MPSC High-Yield Highlights Card */}
                  <div className="bg-amber-950/25 border border-amber-500/40 rounded-2xl p-5 space-y-3">
                    <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span>{isMr ? 'MPSC परीक्षेतील हमखास पॉईंटर्स व ट्रिक्स (High-Yield Exam Points):' : 'MPSC Exam Highlights:'}</span>
                    </h4>
                    <ul className="space-y-2.5 text-xs text-amber-100/90">
                      {activeArticle.mpscHighlightsMr.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed font-medium">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Landmark Judgments linked if any */}
                  {activeArticle.landmarkJudgmentsMr && activeArticle.landmarkJudgmentsMr.length > 0 && (
                    <div className="bg-purple-950/20 border border-purple-500/40 rounded-2xl p-4 space-y-2.5">
                      <h4 className="text-xs font-black text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-purple-400" />
                        <span>{isMr ? 'संबंधित ऐतिहासिक सर्वोच्च न्यायालय खटले (Related SC Cases):' : 'Related SC Cases:'}</span>
                      </h4>
                      <div className="flex items-center gap-2 flex-wrap">
                        {activeArticle.landmarkJudgmentsMr.map((caseItem, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-xl bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-bold"
                          >
                            ⚖️ {caseItem}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: 12 SCHEDULES MASTER DIRECTORY (१२ अनुसूच्या) */}
        {/* ================================================================= */}
        {activeTab === 'schedules' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-950/80 p-4 rounded-2xl border border-stone-800">
              <div>
                <h3 className="text-sm sm:text-base font-black text-amber-200 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>{isMr ? 'भारतीय संविधानातील १२ अनुसूच्या (12 Schedules Master Guide)' : '12 Schedules of Constitution'}</span>
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  MPSC जोड्या जुळवा (Match the Following) मध्ये अनुसूच्यांवर हमखास २ ते ३ प्रश्न विचारले जातात.
                </p>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                🎯 ट्रिक: "TEARS OF OLD PM"
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {CONSTITUTION_SCHEDULES.map((sch) => (
                <div
                  key={sch.scheduleNumber}
                  className="bg-stone-950/80 rounded-2xl border border-stone-800 p-4 space-y-2.5 hover:border-amber-500/50 transition-all shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-stone-800 pb-2">
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-stone-100 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center shrink-0">
                          {sch.scheduleNumber}
                        </span>
                        <span>{sch.titleMr}</span>
                      </h4>
                      <p className="text-[10px] text-stone-400 font-mono mt-0.5">
                        {sch.articlesCovered}
                      </p>
                    </div>

                    <span className="px-2 py-0.5 rounded-lg bg-stone-900 border border-stone-700 text-[10px] font-mono font-bold text-amber-300 shrink-0">
                      {sch.mnemonicNoteMr}
                    </span>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed font-normal">
                    {sch.keyProvisionsMr}
                  </p>

                  <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-[11px] text-amber-200/90 leading-relaxed">
                    <strong className="text-amber-400">⚡ MPSC ट्रॅप अलर्ट: </strong>
                    <span>{sch.mpscTipsMr}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: MAJOR CONSTITUTIONAL AMENDMENTS (१ ते १०६ दुरुस्त्या) */}
        {/* ================================================================= */}
        {activeTab === 'amendments' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm sm:text-base font-black text-emerald-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>{isMr ? 'प्रमुख घटनादुरुस्त्या (Constitutional Amendments Master Directory)' : 'Major Constitutional Amendments'}</span>
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  १ ली (१९५१) ते १०६ वी "नारी शक्ती वंदन अधिनियम" (२०२३) पर्यंतच्या सर्व महत्त्वाच्या दुरुस्त्या.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={amendmentSearch}
                  onChange={(e) => setAmendmentSearch(e.target.value)}
                  placeholder={isMr ? 'दुरुस्ती क्रमांक किंवा वर्ष शोधा (उदा. 42, 44, 73, 106)...' : 'Search amendment...'}
                  className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setOnlySuperYieldAmendments(!onlySuperYieldAmendments)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    onlySuperYieldAmendments
                      ? 'bg-emerald-500 text-stone-950 font-black'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  ⚡ फक्त सुपर हाय-यिल्ड
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAmendments.map((am) => (
                <div
                  key={am.amendmentNumber}
                  className="bg-stone-950/80 rounded-2xl border border-stone-800 p-4 space-y-3 hover:border-emerald-500/50 transition-all shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-stone-800 pb-2">
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-stone-100 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-black">
                          #{am.amendmentNumber}
                        </span>
                        <span>{am.titleMr}</span>
                      </h4>
                      <p className="text-[10px] text-stone-400 mt-0.5 font-mono">
                        वर्ष: {am.year}
                      </p>
                    </div>

                    {am.isSuperHighYield && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30 shrink-0">
                        ⚡ Top MPSC
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-200 leading-relaxed font-normal">
                    {am.summaryMr}
                  </p>

                  <div className="space-y-1 text-xs text-stone-300">
                    <strong className="text-[11px] text-stone-400 block">मुख्य तरतुदी:</strong>
                    <ul className="space-y-1">
                      {am.keyProvisionsMr.map((prov, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px]">
                          <span className="text-emerald-400">✔</span>
                          <span>{prov}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2 rounded-xl bg-stone-900/90 border border-stone-800 text-[11px] text-stone-400">
                    <strong className="text-amber-300">परीक्षेतील महत्त्व: </strong>
                    <span>{am.mpscImportance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: LANDMARK SUPREME COURT VERDICTS */}
        {/* ================================================================= */}
        {activeTab === 'judgments' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
            <div className="bg-stone-950/80 p-4 rounded-2xl border border-stone-800">
              <h3 className="text-sm sm:text-base font-black text-purple-200 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-400" />
                <span>{isMr ? 'ऐतिहासिक सर्वोच्च न्यायालय खटले व निकाल (Landmark SC Judgments)' : 'Landmark SC Judgments'}</span>
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                केशवानंद भारती (१९७३), मेनका गांधी (१९७८), मिनर्व्हा मिल्स (१९८०), एस. आर. बोम्मई (१९९४) आणि पुट्टस्वामी (२०१७).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LANDMARK_JUDGMENTS.map((judg) => (
                <div
                  key={judg.id}
                  className="bg-stone-950/80 rounded-2xl border border-stone-800 p-4 space-y-3 hover:border-purple-500/50 transition-all shadow-xs"
                >
                  <div className="border-b border-stone-800 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-black text-stone-100 flex items-center gap-2">
                        <span>⚖️</span>
                        <span>{judg.caseNameMr}</span>
                      </h4>
                      <span className="px-2 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 font-mono text-xs font-bold border border-purple-500/30 shrink-0">
                        {judg.year}
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-400 italic mt-0.5">
                      {judg.caseNameEn} • {judg.benchSizeMr}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <strong className="text-[11px] text-purple-300 uppercase tracking-wider block">
                      {isMr ? 'सर्वोच्च न्यायालयाचा मुख्य निकाल:' : 'Supreme Court Verdict:'}
                    </strong>
                    <p className="text-xs text-stone-200 leading-relaxed font-normal bg-stone-900/60 p-2.5 rounded-xl border border-stone-800/80">
                      {judg.keyVerdictMr}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 flex-wrap text-xs pt-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {judg.articlesInvolved.map((art, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-300 text-[10px] font-mono">
                          {art}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] text-amber-300/90 font-medium">
                      ⭐ {judg.mpscSignificanceMr}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 5: MPSC POLITY PYQS PRACTICE QUIZ */}
        {/* ================================================================= */}
        {activeTab === 'pyqs' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
            {!completedPyqQuiz ? (
              <div className="max-w-2xl mx-auto space-y-5">
                {/* Score & Progress */}
                <div className="flex items-center justify-between gap-3 bg-stone-950/70 p-3.5 rounded-2xl border border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-400">
                      प्रश्न {currentPyqIdx + 1} / {POLITY_PYQ_QUESTIONS.length}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-bold">
                      {POLITY_PYQ_QUESTIONS[currentPyqIdx].pyqExamTag}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <Award className="w-4 h-4" />
                    <span>गुण: {pyqScore}</span>
                  </div>
                </div>

                {/* Question Card */}
                <div className="bg-stone-950/90 rounded-2xl border border-stone-800 p-5 space-y-4 shadow-md">
                  <h3 className="text-sm sm:text-base font-black text-blue-100 leading-relaxed">
                    {isMr
                      ? POLITY_PYQ_QUESTIONS[currentPyqIdx].questionMr
                      : POLITY_PYQ_QUESTIONS[currentPyqIdx].questionEn}
                  </h3>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {(isMr
                      ? POLITY_PYQ_QUESTIONS[currentPyqIdx].optionsMr
                      : POLITY_PYQ_QUESTIONS[currentPyqIdx].optionsEn
                    ).map((opt, idx) => {
                      const isSelected = selectedPyqOption === idx;
                      const isCorrect =
                        idx === POLITY_PYQ_QUESTIONS[currentPyqIdx].correctOptionIndex;
                      let optionStyle =
                        'border-stone-800 bg-stone-900/60 text-stone-200 hover:bg-stone-850';

                      if (isPyqSubmitted) {
                        if (isCorrect) {
                          optionStyle =
                            'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold';
                        } else if (isSelected && !isCorrect) {
                          optionStyle =
                            'border-red-500 bg-red-950/40 text-red-200';
                        }
                      } else if (isSelected) {
                        optionStyle =
                          'border-blue-500 bg-blue-500/20 text-blue-100 font-bold';
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectPyqOption(idx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-stone-800 text-stone-300 font-bold flex items-center justify-center shrink-0 text-xs">
                              {idx + 1}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isPyqSubmitted && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                          {isPyqSubmitted && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit / Next button */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">
                      घटक: {POLITY_PYQ_QUESTIONS[currentPyqIdx].relatedTopic}
                    </span>

                    {!isPyqSubmitted ? (
                      <button
                        type="button"
                        disabled={selectedPyqOption === null}
                        onClick={handleSubmitPyqAnswer}
                        className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedPyqOption !== null
                            ? 'bg-blue-500 text-stone-950 hover:bg-blue-400 shadow-md font-black'
                            : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                        }`}
                      >
                        {isMr ? 'उत्तर सबमिट करा' : 'Submit Answer'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNextPyq}
                        className="px-5 py-2 rounded-xl bg-blue-500 text-stone-950 hover:bg-blue-400 font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>
                          {currentPyqIdx < POLITY_PYQ_QUESTIONS.length - 1
                            ? isMr
                              ? 'पुढील प्रश्न'
                              : 'Next Question'
                            : isMr
                            ? 'निकाल पहा'
                            : 'View Results'}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Explanation card after submit */}
                  {isPyqSubmitted && (
                    <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300 leading-relaxed mt-3 space-y-1">
                      <p className="font-bold text-amber-300">💡 आयोगाचे स्पष्टीकरण:</p>
                      <p>{POLITY_PYQ_QUESTIONS[currentPyqIdx].explanationMr}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Quiz Completion Screen */
              <div className="max-w-md mx-auto text-center bg-stone-950/90 rounded-2xl border border-stone-800 p-6 space-y-4 shadow-xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
                  🏆
                </div>
                <div>
                  <h3 className="text-lg font-black text-stone-100">
                    {isMr ? 'क्विझ यशस्वीरीत्या पूर्ण झाली!' : 'Polity Quiz Completed!'}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    तुमचा अंतिम स्कोअर: <strong className="text-emerald-400 text-sm">{pyqScore} / {POLITY_PYQ_QUESTIONS.length}</strong>
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300">
                  {pyqScore >= 8 ? (
                    <span className="text-emerald-300 font-bold">
                      🌟 उत्कृष्ट तयारी! राज्यघटनेवरील तुमची पकड अत्यंत मजबूत आहे.
                    </span>
                  ) : pyqScore >= 5 ? (
                    <span className="text-amber-300 font-bold">
                      👍 चांगली कामगिरी! कलम व दुरुस्त्यांची आणखी एकदा रिव्हिजन करा.
                    </span>
                  ) : (
                    <span className="text-red-300 font-bold">
                      📖 अधिक सरावाची गरज आहे. 'संविधान कलम-कोश' टॅबमधून अभ्यास करा.
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleResetPyqQuiz}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-stone-950 font-black text-xs hover:from-emerald-400 hover:to-teal-400 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-stone-950" />
                    <span>{isMr ? 'पुढील टेस्ट (नवीन प्रश्न)' : 'Next Test (New Qs)'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetPyqQuiz}
                    className="px-5 py-2.5 rounded-xl bg-blue-500 text-stone-950 font-black text-xs hover:bg-blue-400 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{isMr ? 'पुन्हा सराव करा' : 'Retake Quiz'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 6: POLITY BOOKS & STUDY GUIDE (एम. लक्ष्मीकांत रेफरन्स) */}
        {/* ================================================================= */}
        {activeTab === 'books_guide' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
            <div className="bg-gradient-to-r from-cyan-950/60 via-stone-900 to-blue-950/60 rounded-2xl border border-stone-800 p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold">
                    MPSC राज्यव्यवस्था #1 संदर्भ ग्रंथ
                  </span>
                  <h3 className="text-base sm:text-xl font-black text-stone-100">
                    📖 एम. लक्ष्मीकांत - भारतीय राज्यघटना व राजकारण (मराठी आवृत्ती)
                  </h3>
                  <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
                    राज्यसेवा पूर्व व मुख्य (GS-2) आणि संयुक्त गट-ब व गट-क परीक्षेसाठी संपूर्ण महाराष्ट्रातील यशस्वी अधिकाऱ्यांनी शिफारस केलेले सर्वोत्तम संदर्भ पुस्तक.
                  </p>
                </div>

                <a
                  href={laxmikanthBookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-black text-xs hover:bg-amber-400 transition-all flex items-center gap-2 shrink-0 shadow-lg cursor-pointer"
                >
                  <span>अॅमेझॉनवरून खरेदी करा</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Revision Tips Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-stone-950/80 rounded-2xl border border-stone-800 p-4 space-y-2.5">
                <h4 className="text-xs font-black text-blue-300 uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <span>राज्यघटनेचा अभ्यास कसा करावा? (Study Strategy):</span>
                </h4>
                <ul className="space-y-2 text-xs text-stone-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">१.</span>
                    <span>दररोज किमान ५ कलमांची रिव्हिजन करा (विशेषतः भाग ३, ४, ४A, ५ व ६).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">२.</span>
                    <span>४२ वी, ४४ वी, ७३ वी, ८६ वी व १०६ वी घटनादुरुस्तीचे पॉईंट्स वहीत लिहून काढा.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">३.</span>
                    <span>‘TEARS OF OLD PM’ या शॉर्टकट ट्रिकने १२ अनुसूच्या दर आठवड्याला आठवा.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">४.</span>
                    <span>राज्यपालांचे व राष्ट्रपतींचे अधिकार तुलनात्मक तक्त्याद्वारे (Comparative Table) अभ्यासा.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-stone-950/80 rounded-2xl border border-stone-800 p-4 space-y-2.5">
                <h4 className="text-xs font-black text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                  <Scale className="w-4 h-4 text-emerald-400" />
                  <span>MPSC परीक्षेतील गुण विभागणी (Mark Weightage):</span>
                </h4>
                <div className="space-y-2 text-xs text-stone-300">
                  <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between">
                    <span>संयुक्त गट-ब व गट-क पूर्व परीक्षा</span>
                    <strong className="text-emerald-400 font-mono">१० ते १५ गुण</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between">
                    <span>राज्यसेवा पूर्व परीक्षा (GS-1)</span>
                    <strong className="text-emerald-400 font-mono १५ गुण">१५ ते २० गुण</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between">
                    <span>राज्यसेवा मुख्य परीक्षा (GS-2)</span>
                    <strong className="text-emerald-400 font-mono">१५० गुण (संपूर्ण पेपर!)</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* FOOTER */}
        {/* ================================================================= */}
        <div className="p-3 sm:p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-3 shrink-0 text-xs">
          <div className="flex items-center gap-2 text-stone-400">
            <Scale className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="hidden sm:inline">
              {isMr ? 'भारतीय राज्यघटना व संविधान अभ्यासिका • MPSC राजपत्रित व अराजपत्रित सेवा' : 'Indian Constitution & Polity Guide'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold transition-all cursor-pointer"
            >
              {isMr ? 'बंद करा' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
