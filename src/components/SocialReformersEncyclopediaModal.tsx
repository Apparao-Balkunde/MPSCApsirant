import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  BookOpen,
  Award,
  Sparkles,
  Newspaper,
  Building,
  GraduationCap,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Users,
  ChevronRight,
  Filter,
  Bookmark,
  Share2,
  ExternalLink,
  HeartHandshake
} from 'lucide-react';
import {
  MAHARASHTRA_SOCIAL_REFORMERS,
  REFORMER_NEWSPAPERS_LIST,
  REFORMER_INSTITUTIONS_LIST,
  REFORMER_BOOKS_LIST,
  REFORMER_PYQ_QUESTIONS,
  SocialReformer,
  ReformerNewspaperItem,
  ReformerInstitutionItem,
  ReformerBookItem,
  ReformerPyqQuestion
} from '../data/maharashtraSocialReformersData';
import { soundFx } from '../utils/audio';

interface SocialReformersEncyclopediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: 'mr' | 'en';
}

type TabType = 'directory' | 'newspapers' | 'institutions' | 'books' | 'pyqs';

export const SocialReformersEncyclopediaModal: React.FC<SocialReformersEncyclopediaModalProps> = ({
  isOpen,
  onClose,
  language = 'mr'
}) => {
  const isMr = language === 'mr';
  const [activeTab, setActiveTab] = useState<TabType>('directory');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedReformerId, setSelectedReformerId] = useState<string>('phule_jotirao');

  // PYQs Quiz State
  const [currentPyqIdx, setCurrentPyqIdx] = useState<number>(0);
  const [selectedPyqOption, setSelectedPyqOption] = useState<number | null>(null);
  const [isPyqSubmitted, setIsPyqSubmitted] = useState<boolean>(false);
  const [pyqScore, setPyqScore] = useState<number>(0);
  const [completedPyqQuiz, setCompletedPyqQuiz] = useState<boolean>(false);

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

  // Filtered Reformers
  const filteredReformers = useMemo(() => {
    return MAHARASHTRA_SOCIAL_REFORMERS.filter((ref) => {
      const matchesCategory =
        selectedCategory === 'all' || ref.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const inName =
        ref.nameMr.toLowerCase().includes(q) ||
        ref.nameEn.toLowerCase().includes(q);
      const inNewspaper = ref.newspapersMr.some((n) => n.toLowerCase().includes(q));
      const inInstitution = ref.institutionsMr.some((i) => i.toLowerCase().includes(q));
      const inBook = ref.booksAuthoredMr.some((b) => b.toLowerCase().includes(q));
      const inTitle = ref.honorificTitlesMr.some((t) => t.toLowerCase().includes(q));
      const inPenName = ref.penNamesMr.some((p) => p.toLowerCase().includes(q));

      return inName || inNewspaper || inInstitution || inBook || inTitle || inPenName;
    });
  }, [searchQuery, selectedCategory]);

  // Selected Reformer
  const activeReformer = useMemo(() => {
    return (
      MAHARASHTRA_SOCIAL_REFORMERS.find((r) => r.id === selectedReformerId) ||
      filteredReformers[0] ||
      MAHARASHTRA_SOCIAL_REFORMERS[0]
    );
  }, [selectedReformerId, filteredReformers]);

  // Filtered Newspapers
  const filteredNewspapers = useMemo(() => {
    if (!searchQuery.trim()) return REFORMER_NEWSPAPERS_LIST;
    const q = searchQuery.toLowerCase();
    return REFORMER_NEWSPAPERS_LIST.filter(
      (n) =>
        n.newspaperNameMr.toLowerCase().includes(q) ||
        n.reformerNameMr.toLowerCase().includes(q) ||
        n.mpscImportance.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Filtered Institutions
  const filteredInstitutions = useMemo(() => {
    if (!searchQuery.trim()) return REFORMER_INSTITUTIONS_LIST;
    const q = searchQuery.toLowerCase();
    return REFORMER_INSTITUTIONS_LIST.filter(
      (i) =>
        i.institutionNameMr.toLowerCase().includes(q) ||
        i.founderMr.toLowerCase().includes(q) ||
        i.locationMr.toLowerCase().includes(q) ||
        i.mottoOrObjectiveMr.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Filtered Books
  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return REFORMER_BOOKS_LIST;
    const q = searchQuery.toLowerCase();
    return REFORMER_BOOKS_LIST.filter(
      (b) =>
        b.bookTitleMr.toLowerCase().includes(q) ||
        b.authorMr.toLowerCase().includes(q) ||
        b.themeOrSubjectMr.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // PYQ Quiz Handlers
  const handleSelectPyqOption = (idx: number) => {
    if (isPyqSubmitted) return;
    playFx('click');
    setSelectedPyqOption(idx);
  };

  const handleSubmitPyqAnswer = () => {
    if (selectedPyqOption === null || isPyqSubmitted) return;
    setIsPyqSubmitted(true);
    const cur = REFORMER_PYQ_QUESTIONS[currentPyqIdx];
    if (selectedPyqOption === cur.correctOptionIndex) {
      playFx('correct');
      setPyqScore((prev) => prev + 1);
    } else {
      playFx('wrong');
    }
  };

  const handleNextPyq = () => {
    playFx('click');
    if (currentPyqIdx < REFORMER_PYQ_QUESTIONS.length - 1) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-6xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] my-auto">
        {/* ================================================================= */}
        {/* MODAL HEADER */}
        {/* ================================================================= */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-orange-950/80 via-stone-900 to-amber-950/60 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/30 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0 shadow-inner text-xl">
              🚩
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-black text-amber-100 flex items-center gap-1.5">
                  <span>{isMr ? 'महाराष्ट्रातील समाजसुधारक इन्सायक्लोपीडिया' : 'Maharashtra Social Reformers Encyclopedia'}</span>
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black tracking-wide uppercase">
                  {isMr ? '५०+ समाजसुधारक • वृत्तपत्रे • पुस्तके • PYQs' : '50+ Reformers Master Hub'}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                {isMr
                  ? 'महात्मा फुले, डॉ. आंबेडकर, शाहू महाराज, महर्षी कर्वे, सावित्रीबाई फुले, लोकहितवादी इत्यादींचे संपूर्ण कार्य व मागील वर्षांचे प्रश्न'
                  : 'Newspapers, Institutions, Books, Pen Names & Previous Year Questions for MPSC'}
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
              setActiveTab('directory');
            }}
            className={`px-3.5 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'directory'
                ? 'text-amber-300 border-amber-500 bg-stone-900/90 shadow-sm'
                : 'text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-900/40'
            }`}
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>{isMr ? '📖 समाजसुधारक चरित्र डिरेक्टरी' : 'Reformers Directory'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-800 text-stone-300 font-mono">
              {MAHARASHTRA_SOCIAL_REFORMERS.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              playFx('click');
              setActiveTab('newspapers');
            }}
            className={`px-3.5 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'newspapers'
                ? 'text-amber-300 border-amber-500 bg-stone-900/90 shadow-sm'
                : 'text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-900/40'
            }`}
          >
            <Newspaper className="w-4 h-4 text-blue-400" />
            <span>{isMr ? '📰 वृत्तपत्रे व नियतकालिके' : 'Newspapers Index'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-800 text-blue-300 font-mono">
              {REFORMER_NEWSPAPERS_LIST.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              playFx('click');
              setActiveTab('institutions');
            }}
            className={`px-3.5 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'institutions'
                ? 'text-amber-300 border-amber-500 bg-stone-900/90 shadow-sm'
                : 'text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-900/40'
            }`}
          >
            <Building className="w-4 h-4 text-emerald-400" />
            <span>{isMr ? '🏛️ स्थापन केलेल्या संस्था' : 'Institutions Index'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-800 text-emerald-300 font-mono">
              {REFORMER_INSTITUTIONS_LIST.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              playFx('click');
              setActiveTab('books');
            }}
            className={`px-3.5 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'books'
                ? 'text-amber-300 border-amber-500 bg-stone-900/90 shadow-sm'
                : 'text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-900/40'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>{isMr ? '📚 लिहिलेली पुस्तके व ग्रंथ' : 'Books & Literature'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-800 text-purple-300 font-mono">
              {REFORMER_BOOKS_LIST.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              playFx('click');
              setActiveTab('pyqs');
            }}
            className={`px-3.5 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'pyqs'
                ? 'text-amber-300 border-amber-500 bg-stone-900/90 shadow-sm'
                : 'text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-900/40'
            }`}
          >
            <Award className="w-4 h-4 text-rose-400" />
            <span>{isMr ? '🎯 MPSC PYQs सराव क्विझ' : 'MPSC PYQs Quiz'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 font-mono">
              {REFORMER_PYQ_QUESTIONS.length}
            </span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* SEARCH & CATEGORY BAR (SHARED) */}
        {/* ================================================================= */}
        <div className="bg-stone-950/60 p-3 sm:px-6 border-b border-stone-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isMr
                  ? 'सुधारक, वृत्तपत्र, संस्था, पुस्तक किंवा टोपणनाव शोधा...'
                  : 'Search reformer, newspaper, book, institution...'
              }
              className="w-full bg-stone-900 border border-stone-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-stone-400 hover:text-stone-200 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {activeTab === 'directory' && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-amber-500 text-stone-950'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                {isMr ? 'सर्व (All)' : 'All'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('education_women')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'education_women'
                    ? 'bg-pink-500 text-stone-950'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                {isMr ? '👩 स्त्री शिक्षण' : 'Women Education'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('dalit_depressed')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'dalit_depressed'
                    ? 'bg-blue-500 text-stone-950'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                {isMr ? '⚖️ वंचित व दलित' : 'Depressed Classes'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('social_equality')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'social_equality'
                    ? 'bg-emerald-500 text-stone-950'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                {isMr ? '🌾 सत्यशोधक व समता' : 'Social Equality'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('journalism_thinkers')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'journalism_thinkers'
                    ? 'bg-orange-500 text-stone-950'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                {isMr ? '✍️ पत्रकारिता व विचारवंत' : 'Journalism & Thinkers'}
              </button>
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* TAB 1: SOCIAL REFORMERS DIRECTORY & PROFILES */}
        {/* ================================================================= */}
        {activeTab === 'directory' && (
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Left list of reformers */}
            <div className="w-full md:w-80 lg:w-96 border-r border-stone-800 overflow-y-auto p-3 space-y-2 shrink-0 max-h-[35vh] md:max-h-full">
              <div className="text-[11px] font-bold text-stone-400 px-1 pb-1 flex items-center justify-between">
                <span>{isMr ? 'समाजसुधारक निवडा' : 'Select Reformer'}</span>
                <span>{filteredReformers.length} {isMr ? 'नोंदी' : 'Entries'}</span>
              </div>

              {filteredReformers.map((reformer) => {
                const isSelected = reformer.id === activeReformer?.id;
                return (
                  <button
                    key={reformer.id}
                    type="button"
                    onClick={() => {
                      playFx('click');
                      setSelectedReformerId(reformer.id);
                    }}
                    className={`w-full text-left p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500/25 to-stone-900 border-amber-500/80 shadow-md ring-1 ring-amber-400/40'
                        : 'bg-stone-950/60 border-stone-800/80 hover:bg-stone-850 hover:border-stone-700'
                    }`}
                  >
                    <span className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-lg shrink-0 shadow-inner">
                      {reformer.avatarIcon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-black text-stone-100 truncate">
                        {isMr ? reformer.nameMr : reformer.nameEn}
                      </h4>
                      <p className="text-[10px] text-stone-400 truncate mt-0.5">
                        {reformer.birthDeath}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        {reformer.honorificTitlesMr[0] && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-300 font-bold border border-amber-500/30 truncate max-w-[170px]">
                            {reformer.honorificTitlesMr[0].split('(')[0]}
                          </span>
                        )}
                        <span className="text-[9px] text-stone-400">
                          {reformer.pyqsCount} PYQs
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right detailed biography and exam pointers */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {activeReformer && (
                <>
                  {/* Hero Header Card */}
                  <div className="bg-stone-950/80 rounded-2xl border border-stone-800 p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/30 border border-amber-500/40 text-3xl flex items-center justify-center shrink-0 shadow-md">
                          {activeReformer.avatarIcon}
                        </span>
                        <div>
                          <h2 className="text-lg sm:text-2xl font-black text-amber-100">
                            {isMr ? activeReformer.nameMr : activeReformer.nameEn}
                          </h2>
                          <p className="text-xs text-stone-400 mt-1">
                            📅 {activeReformer.birthDeath} • 📍 {isMr ? activeReformer.birthPlaceMr : activeReformer.birthPlaceEn}
                          </p>

                          {/* Honorific titles */}
                          <div className="flex items-center gap-1.5 flex-wrap mt-2">
                            {activeReformer.honorificTitlesMr.map((title, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold"
                              >
                                🏆 {title}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-start">
                        <span className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-xs font-bold font-mono">
                          {activeReformer.pyqsCount} MPSC PYQs
                        </span>
                      </div>
                    </div>

                    {/* Famous Quote if available */}
                    {activeReformer.famousQuotesMr && activeReformer.famousQuotesMr.length > 0 && (
                      <div className="p-3 rounded-xl bg-amber-950/25 border border-amber-500/30 text-amber-200/90 text-xs italic leading-relaxed">
                        <span className="font-bold text-amber-400 not-italic">💬 प्रसिद्ध विचार: </span>
                        "{activeReformer.famousQuotesMr[0]}"
                      </div>
                    )}
                  </div>

                  {/* Core 4 Matrix Columns: Newspapers, Institutions, Books, Pen Names */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Newspapers */}
                    <div className="bg-stone-950/80 rounded-2xl border border-stone-800 p-4 space-y-2.5">
                      <h4 className="text-xs font-black text-blue-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-800 pb-2">
                        <Newspaper className="w-4 h-4 text-blue-400" />
                        <span>{isMr ? 'वृत्तपत्रे व नियतकालिके (Newspapers):' : 'Newspapers & Periodicals:'}</span>
                      </h4>
                      {activeReformer.newspapersMr.length > 0 ? (
                        <ul className="space-y-1.5 text-xs text-stone-200">
                          {activeReformer.newspapersMr.map((paper, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blue-400">🗞️</span>
                              <span>{paper}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-stone-500 italic">
                          {isMr ? 'स्वतःचे वृत्तपत्र नव्हते / लेख इतर वृत्तपत्रांत लिहिले.' : 'No direct newspaper founded.'}
                        </p>
                      )}
                    </div>

                    {/* Institutions */}
                    <div className="bg-stone-950/80 rounded-2xl border border-stone-800 p-4 space-y-2.5">
                      <h4 className="text-xs font-black text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-800 pb-2">
                        <Building className="w-4 h-4 text-emerald-400" />
                        <span>{isMr ? 'स्थापन केलेल्या संस्था व संघटना (Institutions):' : 'Institutions Founded:'}</span>
                      </h4>
                      {activeReformer.institutionsMr.length > 0 ? (
                        <ul className="space-y-1.5 text-xs text-stone-200">
                          {activeReformer.institutionsMr.map((inst, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-400">🏛️</span>
                              <span>{inst}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-stone-500 italic">
                          {isMr ? 'थेट स्वतंत्र संस्था नोंद नाही.' : 'No direct institution record.'}
                        </p>
                      )}
                    </div>

                    {/* Books Authored */}
                    <div className="bg-stone-950/80 rounded-2xl border border-stone-800 p-4 space-y-2.5">
                      <h4 className="text-xs font-black text-purple-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-800 pb-2">
                        <BookOpen className="w-4 h-4 text-purple-400" />
                        <span>{isMr ? 'लिहिलेली पुस्तके व ग्रंथ (Books & Literature):' : 'Books Authored:'}</span>
                      </h4>
                      {activeReformer.booksAuthoredMr.length > 0 ? (
                        <ul className="space-y-1.5 text-xs text-stone-200">
                          {activeReformer.booksAuthoredMr.map((book, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-purple-400">📖</span>
                              <span>{book}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-stone-500 italic">
                          {isMr ? 'स्वतंत्र ग्रंथ उपलब्ध नाही.' : 'No authored books listed.'}
                        </p>
                      )}
                    </div>

                    {/* Pen Names & Titles */}
                    <div className="bg-stone-950/80 rounded-2xl border border-stone-800 p-4 space-y-2.5">
                      <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-800 pb-2">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span>{isMr ? 'टोपणनावे व मानद पदव्या (Pen Names & Titles):' : 'Pen Names & Honors:'}</span>
                      </h4>
                      <div className="space-y-2 text-xs text-stone-200">
                        {activeReformer.penNamesMr.length > 0 && (
                          <div>
                            <span className="text-stone-400 block text-[11px] mb-1">टोपणनावे (Pen Names):</span>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {activeReformer.penNamesMr.map((pen, i) => (
                                <span key={i} className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-100 font-mono">
                                  ✍️ {pen}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        <div>
                          <span className="text-stone-400 block text-[11px] mb-1">सर्व पदव्या / गौरव:</span>
                          <ul className="space-y-1">
                            {activeReformer.honorificTitlesMr.map((title, i) => (
                              <li key={i} className="text-amber-200/90 flex items-center gap-1.5">
                                <span className="text-amber-400">⭐</span>
                                <span>{title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Movements & Milestones Timeline */}
                  <div className="bg-stone-950/80 rounded-2xl border border-stone-800 p-5 space-y-3">
                    <h4 className="text-xs font-black text-stone-200 uppercase tracking-wider flex items-center gap-2">
                      <span>🎯</span>
                      <span>{isMr ? 'प्रमुख चळवळी, सत्याग्रह व ऐतिहासिक घटना (Key Movements):' : 'Key Movements & Milestones:'}</span>
                    </h4>
                    <div className="space-y-2">
                      {activeReformer.keyMovementsAndEventsMr.map((event, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-900/60 border border-stone-800/70 text-xs text-stone-200"
                        >
                          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="leading-relaxed">{event}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* MPSC Exam High-Yield Pointers */}
                  <div className="bg-amber-950/30 border border-amber-500/50 rounded-2xl p-5 space-y-3">
                    <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span>{isMr ? 'MPSC परीक्षेत हमखास विचारले जाणारे पॉईंटर्स (High-Yield):' : 'MPSC High-Yield Points:'}</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-amber-200/90">
                      {activeReformer.mpscHighYieldPointersMr.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-400">⚡</span>
                          <span className="leading-relaxed font-medium">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: NEWSPAPERS & PERIODICALS MASTER INDEX */}
        {/* ================================================================= */}
        {activeTab === 'newspapers' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-black text-amber-200 flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-amber-400" />
                  <span>{isMr ? 'महाराष्ट्रातील प्रमुख वृत्तपत्रे व नियतकालिके मास्टर इंडेक्स' : 'Newspapers & Periodicals Master Directory'}</span>
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  MPSC जोड्या जुळवा (Match the Following) मध्ये यादीतून किमान २ ते ३ प्रश्न हमखास येतात.
                </p>
              </div>
              <span className="text-xs text-stone-400 font-mono">
                {filteredNewspapers.length} वृत्तपत्रे
              </span>
            </div>

            <div className="overflow-x-auto bg-stone-950/80 rounded-2xl border border-stone-800">
              <table className="w-full text-xs text-left text-stone-200 border-collapse">
                <thead>
                  <tr className="border-b border-stone-800 text-stone-400 uppercase text-[10px] tracking-wider bg-stone-900/80">
                    <th className="py-3 px-3.5">वृत्तपत्राचे नाव</th>
                    <th className="py-3 px-3.5 text-amber-300">संपादक / संस्थापक</th>
                    <th className="py-3 px-3.5">सुरू झालेले वर्ष</th>
                    <th className="py-3 px-3.5">स्वरूप व भाषा</th>
                    <th className="py-3 px-3.5">परीक्षोपयोगी महत्त्व (MPSC Highlights)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {filteredNewspapers.map((item, idx) => (
                    <tr key={idx} className="hover:bg-stone-900/60 transition-colors">
                      <td className="py-3 px-3.5 font-black text-amber-200 flex items-center gap-2">
                        <span>📰</span>
                        <span>{item.newspaperNameMr}</span>
                      </td>
                      <td className="py-3 px-3.5 font-bold text-stone-100">
                        {item.reformerNameMr}
                      </td>
                      <td className="py-3 px-3.5 font-mono text-stone-300 font-semibold">
                        {item.yearStarted}
                      </td>
                      <td className="py-3 px-3.5 text-stone-300">
                        <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-[11px]">
                          {item.periodicityMr} ({item.languageMr})
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-stone-300 leading-relaxed text-[11px]">
                        {item.mpscImportance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: INSTITUTIONS & SOCIETIES MASTER INDEX */}
        {/* ================================================================= */}
        {activeTab === 'institutions' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-black text-emerald-200 flex items-center gap-2">
                  <Building className="w-4 h-4 text-emerald-400" />
                  <span>{isMr ? 'समाजसुधारकांनी स्थापन केलेल्या प्रमुख संस्था व संघटना' : 'Institutions Founded Master Directory'}</span>
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  संस्थेचे नाव, संस्थापक, स्थापना वर्ष, मुख्यालय आणि मुख्य उद्दिष्ट एकाच नजरेत!
                </p>
              </div>
              <span className="text-xs text-stone-400 font-mono">
                {filteredInstitutions.length} संस्था
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredInstitutions.map((inst, idx) => (
                <div
                  key={idx}
                  className="bg-stone-950/80 rounded-2xl border border-stone-800 p-4 space-y-2 hover:border-emerald-500/50 transition-all shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-stone-800 pb-2">
                    <div>
                      <h4 className="text-sm font-black text-stone-100 flex items-center gap-1.5">
                        <span>🏛️</span>
                        <span>{inst.institutionNameMr}</span>
                      </h4>
                      <p className="text-xs text-amber-300 font-bold mt-0.5">
                        संस्थापक: {inst.founderMr}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-lg bg-stone-900 border border-stone-800 text-[11px] font-mono font-bold text-stone-300 shrink-0">
                      {inst.yearEstablished}
                    </span>
                  </div>

                  <div className="text-xs text-stone-300 space-y-1">
                    <p className="text-[11px] text-stone-400">
                      📍 ठिकाण / मुख्यालय: <strong className="text-stone-200">{inst.locationMr}</strong>
                    </p>
                    <div className="bg-stone-900/90 rounded-xl p-2.5 border border-stone-800/80 text-[11px] text-emerald-300/90">
                      <span className="font-bold text-emerald-400">🎯 मुख्य उद्दिष्ट / ब्रीदवाक्य: </span>
                      <span>{inst.mottoOrObjectiveMr}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: BOOKS & LITERATURE MASTER INDEX */}
        {/* ================================================================= */}
        {activeTab === 'books' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-black text-purple-200 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span>{isMr ? 'समाजसुधारकांनी लिहिलेली पुस्तके व ग्रंथ संपदा' : 'Authored Books & Literature Directory'}</span>
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  आयोगाने विचारलेले सर्व प्रसिद्ध ग्रंथ, लेखक आणि त्यांची वैशिष्ट्ये.
                </p>
              </div>
              <span className="text-xs text-stone-400 font-mono">
                {filteredBooks.length} पुस्तके
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredBooks.map((book, idx) => (
                <div
                  key={idx}
                  className="bg-stone-950/80 rounded-2xl border border-stone-800 p-4 space-y-2 hover:border-purple-500/50 transition-all shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-stone-800 pb-2">
                    <div>
                      <h4 className="text-sm font-black text-stone-100 flex items-center gap-1.5">
                        <span>📖</span>
                        <span>{book.bookTitleMr}</span>
                      </h4>
                      <p className="text-xs text-amber-300 font-bold mt-0.5">
                        लेखक: {book.authorMr}
                      </p>
                    </div>
                    {book.yearPublished && (
                      <span className="px-2 py-0.5 rounded-lg bg-stone-900 border border-stone-800 text-[11px] font-mono font-bold text-stone-300 shrink-0">
                        {book.yearPublished}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    <span className="text-stone-400 font-medium">विषय / वैशिष्ट्य: </span>
                    {book.themeOrSubjectMr}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 5: MPSC PYQS PRACTICE QUIZ */}
        {/* ================================================================= */}
        {activeTab === 'pyqs' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
            {!completedPyqQuiz ? (
              <div className="max-w-2xl mx-auto space-y-5">
                {/* Header score & progress */}
                <div className="flex items-center justify-between gap-3 bg-stone-950/70 p-3.5 rounded-2xl border border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-400">
                      प्रश्न {currentPyqIdx + 1} / {REFORMER_PYQ_QUESTIONS.length}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                      {REFORMER_PYQ_QUESTIONS[currentPyqIdx].pyqExamTag}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <Award className="w-4 h-4" />
                    <span>गुण: {pyqScore}</span>
                  </div>
                </div>

                {/* Question Card */}
                <div className="bg-stone-950/90 rounded-2xl border border-stone-800 p-5 space-y-4 shadow-md">
                  <h3 className="text-sm sm:text-base font-black text-amber-100 leading-relaxed">
                    {isMr
                      ? REFORMER_PYQ_QUESTIONS[currentPyqIdx].questionMr
                      : REFORMER_PYQ_QUESTIONS[currentPyqIdx].questionEn}
                  </h3>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {(isMr
                      ? REFORMER_PYQ_QUESTIONS[currentPyqIdx].optionsMr
                      : REFORMER_PYQ_QUESTIONS[currentPyqIdx].optionsEn
                    ).map((opt, idx) => {
                      const isSelected = selectedPyqOption === idx;
                      const isCorrect = idx === REFORMER_PYQ_QUESTIONS[currentPyqIdx].correctOptionIndex;
                      let optionStyle = 'border-stone-800 bg-stone-900/60 text-stone-200 hover:bg-stone-850';

                      if (isPyqSubmitted) {
                        if (isCorrect) {
                          optionStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold';
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'border-red-500 bg-red-950/40 text-red-200';
                        }
                      } else if (isSelected) {
                        optionStyle = 'border-amber-500 bg-amber-500/20 text-amber-100 font-bold';
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
                  <div className="flex items-center justify-end gap-3 pt-2">
                    {!isPyqSubmitted ? (
                      <button
                        type="button"
                        onClick={handleSubmitPyqAnswer}
                        disabled={selectedPyqOption === null}
                        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-black text-xs sm:text-sm transition-all cursor-pointer shadow-md"
                      >
                        उत्तर तपासा (Check Answer)
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNextPyq}
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs sm:text-sm transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                      >
                        <span>
                          {currentPyqIdx < REFORMER_PYQ_QUESTIONS.length - 1
                            ? 'पुढील प्रश्न'
                            : 'निकाल पहा'}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Explanation Card */}
                  {isPyqSubmitted && (
                    <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-1 animate-in fade-in duration-200">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                        <HelpCircle className="w-4 h-4 text-amber-400" />
                        <span>MPSC संदर्भ व स्पष्टीकरण:</span>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {REFORMER_PYQ_QUESTIONS[currentPyqIdx].explanationMr}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Quiz Completion */
              <div className="max-w-md mx-auto bg-stone-950/90 rounded-2xl border border-stone-800 p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-3xl border border-amber-500/40">
                  🏆
                </div>
                <div>
                  <h3 className="text-xl font-black text-stone-100">समाजसुधारक सराव पूर्ण!</h3>
                  <p className="text-xs text-stone-400 mt-1">
                    MPSC मागील वर्षांच्या प्रश्नांचा निकाल
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="text-3xl font-black text-amber-400">
                    {pyqScore} / {REFORMER_PYQ_QUESTIONS.length}
                  </div>
                  <p className="text-xs text-stone-400 mt-1 font-semibold">
                    अचूकता (Accuracy): {Math.round((pyqScore / REFORMER_PYQ_QUESTIONS.length) * 100)}%
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleResetPyqQuiz}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>पुन्हा सराव करा (Retry)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* MODAL FOOTER */}
        {/* ================================================================= */}
        <div className="p-3.5 sm:p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-[11px] text-stone-300">
              {isMr ? '५०+ समाजसुधारक इन्सायक्लोपीडिया MPSC अभ्यासक्रमाशी सुसंगत आहे' : 'Social Reformers Encyclopedia is updated'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold transition-all cursor-pointer text-xs"
          >
            {isMr ? 'बंद करा' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
