import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  BookOpen,
  Filter,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  FileText,
  Printer,
  Share2,
  ExternalLink,
  Sparkles,
  HelpCircle,
  Copy,
  Check,
  ChevronRight,
  Info,
  Award,
  Zap,
  Building,
  Calendar,
  Users,
  Target
} from 'lucide-react';
import {
  MAHARASHTRA_GOVT_SCHEMES,
  MAHARASHTRA_ECONOMIC_INDICATORS,
  SCHEMES_PYQ_QUESTIONS,
  SCHEME_CATEGORIES,
  SCHEMES_AFFILIATE_BOOKS,
  GovtScheme,
  SchemeCategory
} from '../data/maharashtraGovtSchemesData';
import { soundFx } from '../utils/audio';

interface GovtSchemesEncyclopediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: 'mr' | 'en';
}

type TabType = 'schemes' | 'economic_survey' | 'pyqs' | 'printable' | 'monetize';

export const GovtSchemesEncyclopediaModal: React.FC<GovtSchemesEncyclopediaModalProps> = ({
  isOpen,
  onClose,
  language = 'mr'
}) => {
  const isMr = language === 'mr';

  const [activeTab, setActiveTab] = useState<TabType>('schemes');
  const [selectedCategoryId, setSelectedCategoryId] = useState<SchemeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSchemeId, setActiveSchemeId] = useState<string>(MAHARASHTRA_GOVT_SCHEMES[0]?.id || 'ladki_bahin');

  // PYQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  // Passive Earning / UPI State
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [customUpiId, setCustomUpiId] = useState('mpscstudy@upi');

  // Filtered schemes
  const filteredSchemes = useMemo(() => {
    return MAHARASHTRA_GOVT_SCHEMES.filter((scheme) => {
      const matchesCategory = selectedCategoryId === 'all' || scheme.category === selectedCategoryId;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        scheme.nameMr.toLowerCase().includes(query) ||
        scheme.nameEn.toLowerCase().includes(query) ||
        scheme.nodalMinistryMr.toLowerCase().includes(query) ||
        scheme.financialBenefitMr.toLowerCase().includes(query) ||
        scheme.tagsMr.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategoryId, searchQuery]);

  const activeScheme = useMemo(() => {
    return MAHARASHTRA_GOVT_SCHEMES.find((s) => s.id === activeSchemeId) || MAHARASHTRA_GOVT_SCHEMES[0];
  }, [activeSchemeId]);

  if (!isOpen) return null;

  // Handlers
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submittedAnswers[questionId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    soundFx.playClickSound();
  };

  const handleSubmitAnswer = (questionId: string) => {
    const q = SCHEMES_PYQ_QUESTIONS.find((item) => item.id === questionId);
    if (!q || selectedAnswers[questionId] === undefined) return;

    const isCorrect = selectedAnswers[questionId] === q.correctOptionIndex;
    if (isCorrect) {
      soundFx.playCorrectSound();
      setQuizScore((prev) => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      soundFx.playWrongSound();
      setQuizScore((prev) => ({ ...prev, total: prev.total + 1 }));
    }

    setSubmittedAnswers((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(customUpiId);
    setCopiedUpi(true);
    soundFx.playClickSound();
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleShareApp = () => {
    const shareText = `🏛️ *महाराष्ट्र शासकीय योजना व आर्थिक पाहणी महाकोश २०२४-२६!*\n\nलाडकी बहीण, नमो शेतकरी, लेक लाडकी, युवा कार्यप्रशिक्षण, MJPJAY सह ६०+ योजना आणि आर्थिक पाहणीचे सर्व MPSC PYQs मोफत सराव करा!\n\n👉 ॲप लिंक: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({
        title: 'MPSC शासकीय योजना व आर्थिक पाहणी महाकोश',
        text: shareText,
        url: window.location.origin
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      setCopiedShareLink(true);
      setTimeout(() => setCopiedShareLink(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[92vh] max-h-[920px] bg-stone-900 border border-stone-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-100">
        
        {/* HEADER */}
        <div className="px-4 sm:px-6 py-3.5 bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/60 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xl shadow-lg shadow-orange-950/50">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-amber-300 tracking-tight">
                  {isMr ? 'महाराष्ट्र शासकीय योजना व आर्थिक पाहणी महाकोश' : 'Maharashtra Govt Schemes & Economic Survey Hub'}
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  २०२५-२६ आवृत्ती
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  MPSC Special
                </span>
              </div>
              <p className="text-xs text-stone-400">
                {isMr
                  ? 'लाडकी बहीण, नमो शेतकरी, युवा कार्यप्रशिक्षण, MJPJAY सह ६०+ योजना • आर्थिक पाहणी आकडेवारी • PYQ सराव'
                  : '60+ Welfare Schemes, Economic Indicators, High-Yield PYQs & Printable Notes'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('printable')}
              title={isMr ? 'A4 रिव्हिजन प्रिंट करा' : 'Print A4 Revision Capsule'}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMr ? 'प्रिंट कॅप्सूल' : 'Print PDF'}</span>
            </button>

            <button
              onClick={() => setActiveTab('monetize')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-stone-950 font-black text-xs transition-all shadow-md cursor-pointer hover:scale-105"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>{isMr ? 'सपोर्ट / कमाई' : 'Support / Earning'}</span>
            </button>

            <button
              onClick={handleShareApp}
              title={isMr ? 'मित्र आणि टेलिग्राम ग्रुपला पाठवा' : 'Share with aspirants'}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-amber-400" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800 hover:bg-red-500/20 hover:text-red-300 text-stone-400 border border-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="px-4 bg-stone-950/80 border-b border-stone-800 flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => {
              setActiveTab('schemes');
              soundFx.playClickSound();
            }}
            className={`px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'schemes'
                ? 'border-amber-400 text-amber-300 bg-amber-400/10'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <span>📜</span>
            <span>{isMr ? 'प्रमुख शासकीय योजना' : 'Govt Schemes'}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-300">
              {MAHARASHTRA_GOVT_SCHEMES.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('economic_survey');
              soundFx.playClickSound();
            }}
            className={`px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'economic_survey'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-400/10'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isMr ? 'आर्थिक पाहणी २०२४-२६' : 'Economic Survey'}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-cyan-500/20 text-cyan-300">
              GSDP & FDI
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('pyqs');
              soundFx.playClickSound();
            }}
            className={`px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'pyqs'
                ? 'border-emerald-400 text-emerald-300 bg-emerald-400/10'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isMr ? 'योजना PYQ सराव क्विझ' : 'Schemes PYQs'}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300">
              {SCHEMES_PYQ_QUESTIONS.length} Qs
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('printable');
              soundFx.playClickSound();
            }}
            className={`px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'printable'
                ? 'border-purple-400 text-purple-300 bg-purple-400/10'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>{isMr ? 'प्रिंटयोग्य A4 रिव्हिजन कॅप्सूल' : 'Printable A4 Capsule'}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-500/20 text-purple-300">
              PDF Ready
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('monetize');
              soundFx.playClickSound();
            }}
            className={`px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'monetize'
                ? 'border-emerald-400 text-emerald-300 bg-emerald-500/15'
                : 'border-transparent text-stone-400 hover:text-emerald-300'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isMr ? '💰 पॅसिव्ह अर्निंग व संदर्भ पुस्तके' : 'Passive Earning & Books'}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300">
              ₹ कमिशन
            </span>
          </button>
        </div>

        {/* TAB 1: SCHEMES DIRECTORY & ACTIVE DOSSIER */}
        {activeTab === 'schemes' && (
          <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
            {/* Left Sidebar: Schemes List */}
            <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-stone-800 flex flex-col bg-stone-950/60 shrink-0">
              {/* Search & Category Pills */}
              <div className="p-3 border-b border-stone-800 space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isMr ? 'योजना, विभाग किंवा कीवर्ड शोधा...' : 'Search schemes, DBT, ministry...'}
                    className="w-full bg-stone-900 border border-stone-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-2 text-stone-400 hover:text-stone-200 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Category horizontal filters */}
                <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1">
                  <button
                    onClick={() => {
                      setSelectedCategoryId('all');
                      soundFx.playClickSound();
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      selectedCategoryId === 'all'
                        ? 'bg-amber-500 text-stone-950 font-bold shadow'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                    }`}
                  >
                    {isMr ? 'सर्व (All)' : 'All'}
                  </button>
                  {SCHEME_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategoryId(cat.id);
                        soundFx.playClickSound();
                      }}
                      className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                        selectedCategoryId === cat.id
                          ? 'bg-amber-500 text-stone-950 font-bold shadow'
                          : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{isMr ? cat.labelMr.split(' ')[1] : cat.labelEn}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Schemes scrollable list */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
                {filteredSchemes.length === 0 ? (
                  <div className="p-6 text-center text-xs text-stone-500">
                    {isMr ? 'कोणतीही योजना आढळली नाही.' : 'No schemes match the search criteria.'}
                  </div>
                ) : (
                  filteredSchemes.map((scheme) => {
                    const isSelected = scheme.id === activeScheme.id;
                    return (
                      <button
                        key={scheme.id}
                        onClick={() => {
                          setActiveSchemeId(scheme.id);
                          soundFx.playClickSound();
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition-all border cursor-pointer flex items-start gap-2.5 ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500/70 shadow-md ring-1 ring-amber-500/30'
                            : 'bg-stone-900/60 hover:bg-stone-850 border-stone-800/80 text-stone-300'
                        }`}
                      >
                        <div className="text-xl p-1 rounded-lg bg-stone-950 border border-stone-800 shrink-0">
                          {scheme.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className={`text-xs font-bold truncate ${isSelected ? 'text-amber-300' : 'text-stone-200'}`}>
                              {scheme.nameMr}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-stone-800 text-stone-400 font-mono shrink-0">
                              {scheme.launchYear.split(' ')[0]}
                            </span>
                          </div>
                          <p className="text-[11px] text-amber-200/80 font-medium truncate mt-0.5">
                            {scheme.financialBenefitMr}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1 text-[10px] text-stone-400">
                            <span className="truncate max-w-[150px]">{scheme.nodalMinistryMr}</span>
                            <span>•</span>
                            <span className="text-emerald-400 font-mono">{scheme.pyqsCount} PYQs</span>
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Pane: Active Scheme Detailed Dossier */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-gradient-to-b from-stone-900 to-stone-950">
              {/* Scheme Hero Header Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/40 border border-amber-500/40 shadow-xl relative overflow-hidden">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl p-2 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                      {activeScheme.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {activeScheme.categoryLabelMr}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          सुरुवात: {activeScheme.launchYear}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-amber-300 mt-1">
                        {activeScheme.nameMr}
                      </h3>
                      <p className="text-xs text-stone-400 font-medium">
                        {activeScheme.nameEn}
                      </p>
                    </div>
                  </div>

                  {activeScheme.officialPortal && (
                    <a
                      href={`https://${activeScheme.officialPortal}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold border border-stone-700 transition-colors"
                    >
                      <span>पोर्टल</span>
                      <ExternalLink className="w-3 h-3 text-amber-400" />
                    </a>
                  )}
                </div>

                {/* Key Financial Benefit Highlight Box */}
                <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-transparent border border-amber-500/50 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400 font-bold text-base">
                    ₹
                  </div>
                  <div>
                    <div className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wide">
                      {isMr ? 'थेट आर्थिक लाभ व मदत (Direct Financial Benefit)' : 'Direct Benefit'}
                    </div>
                    <div className="text-sm font-black text-stone-100">
                      {activeScheme.financialBenefitMr}
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid: Nodal Ministry & Beneficiaries */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <Building className="w-4 h-4 text-amber-400" />
                    <span>{isMr ? 'नोडल मंत्रालय व विभाग' : 'Nodal Department'}</span>
                  </div>
                  <p className="text-xs text-stone-200 font-medium">
                    {activeScheme.nodalMinistryMr}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>{isMr ? 'पात्र लाभार्थी गट' : 'Target Beneficiaries'}</span>
                  </div>
                  <p className="text-xs text-stone-200 font-medium">
                    {activeScheme.targetBeneficiariesMr}
                  </p>
                </div>
              </div>

              {/* Eligibility Checklist */}
              <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-extrabold text-blue-400 uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>{isMr ? 'पात्रतेच्या अटी व निकष (Eligibility Criteria)' : 'Eligibility Criteria'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeScheme.eligibilityCriteriaMr.map((criterion, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-stone-900/90 border border-stone-800/80 text-xs text-stone-300 flex items-start gap-2"
                    >
                      <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{criterion}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* MPSC High-Yield Exam Points */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 to-stone-950 border border-amber-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-300 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>{isMr ? '🎯 MPSC परीक्षा विशेष पॉईंटर्स (High-Yield Facts)' : 'MPSC High-Yield Points'}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                    वारंवार विचारलेले
                  </span>
                </div>
                <div className="space-y-1.5">
                  {activeScheme.keyExamPointsMr.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-stone-900/90 border border-stone-800/90 text-xs text-stone-200 flex items-start gap-2.5"
                    >
                      <span className="text-amber-400 font-bold shrink-0 mt-0.5">📌</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags & Action Bar */}
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-stone-400 font-medium">कीवर्ड्स:</span>
                  {activeScheme.tagsMr.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-stone-800 text-[10px] text-stone-300 border border-stone-700 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveTab('pyqs');
                      soundFx.playClickSound();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Target className="w-3.5 h-3.5" />
                    <span>{isMr ? 'या योजनेवरील प्रश्न सोडवा' : 'Solve PYQs'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MAHARASHTRA ECONOMIC SURVEY 2024-2026 */}
        {activeTab === 'economic_survey' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-gradient-to-b from-stone-900 to-stone-950">
            {/* Economic Survey Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-stone-900 to-blue-950/40 border border-cyan-500/40 shadow-xl flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📈</span>
                  <h3 className="text-base sm:text-lg font-black text-cyan-300">
                    {isMr ? 'महाराष्ट्र आर्थिक पाहणी २०२४-२०२६ : अतिमहत्त्वाचे निर्देशांक' : 'Maharashtra Economic Survey Key Indicators'}
                  </h3>
                </div>
                <p className="text-xs text-stone-400 mt-1 max-w-2xl">
                  {isMr
                    ? 'MPSC राज्यसेवा व संयुक्त पूर्व परीक्षेत विचारले जाणारे GSDP, दरडोई उत्पन्न, FDI, क्षेत्रनिहाय वाटा आणि वनक्षेत्राची अचूक सांख्यिकी.'
                    : 'Authentic MPSC GS-4 & Combine Prelims high-yield economic data.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
                  {isMr ? 'FDI: देशामध्ये प्रथम क्रमांक 🏆' : 'FDI Rank 1 in India'}
                </span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {MAHARASHTRA_ECONOMIC_INDICATORS.map((metric) => (
                <div
                  key={metric.id}
                  className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 hover:border-cyan-500/50 transition-all space-y-2.5 shadow-lg group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {metric.sectorMr}
                    </span>
                    <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono font-bold">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {metric.trend === 'up' ? 'वाढ' : 'स्थिर'}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-stone-300 group-hover:text-cyan-200 transition-colors">
                      {metric.titleMr}
                    </h4>
                    <div className="text-base sm:text-lg font-black text-amber-300 mt-1">
                      {metric.valueMr}
                    </div>
                    {metric.previousValueMr && (
                      <div className="text-[10px] text-stone-500 mt-0.5">
                        मागील वर्ष: {metric.previousValueMr}
                      </div>
                    )}
                  </div>

                  <div className="p-2.5 rounded-lg bg-stone-900/90 border border-stone-800 text-[11px] text-stone-300">
                    <span className="text-amber-400 font-bold">MPSC टिप: </span>
                    {metric.examNoteMr}
                  </div>
                </div>
              ))}
            </div>

            {/* Sectoral Breakdown Visual Card */}
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
              <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <span>📊</span>
                <span>{isMr ? 'राज्याच्या स्थूल मूल्यवर्धनातील (GSVA) क्षेत्रनिहाय वाटा' : 'Sectoral GSVA Share'}</span>
              </h4>

              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs font-bold text-stone-300 mb-1">
                    <span>१. सेवा क्षेत्र (Services Sector - बँकिंग, IT, पर्यटन, व्यापार)</span>
                    <span className="text-cyan-300 font-mono">६१.१%</span>
                  </div>
                  <div className="w-full h-3 bg-stone-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: '61.1%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-stone-300 mb-1">
                    <span>२. उद्योग व उत्पादन क्षेत्र (Industry & Manufacturing)</span>
                    <span className="text-amber-300 font-mono">२६.९%</span>
                  </div>
                  <div className="w-full h-3 bg-stone-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '26.9%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-stone-300 mb-1">
                    <span>३. कृषी, वने व मत्स्य व्यवसाय (Agriculture & Allied)</span>
                    <span className="text-emerald-300 font-mono">१२.०%</span>
                  </div>
                  <div className="w-full h-3 bg-stone-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '12.0%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SCHEMES PYQS & PRACTICE QUIZ */}
        {activeTab === 'pyqs' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-gradient-to-b from-stone-900 to-stone-950">
            {/* Quiz Score Header */}
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-stone-200">
                  {isMr ? 'शासकीय योजना व आर्थिक पाहणी MPSC प्रश्नपत्रिका सराव' : 'Schemes & Economic Survey PYQs Drill'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-xs text-stone-400">
                  गुण: <span className="font-mono font-bold text-emerald-400">{quizScore.correct}</span> / {quizScore.total}
                </div>
                <button
                  onClick={() => {
                    setSelectedAnswers({});
                    setSubmittedAnswers({});
                    setQuizScore({ correct: 0, total: 0 });
                    soundFx.playClickSound();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium cursor-pointer"
                >
                  {isMr ? 'पुन्हा सुरू करा' : 'Reset Quiz'}
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {SCHEMES_PYQ_QUESTIONS.map((q, idx) => {
                const isSubmitted = submittedAnswers[q.id];
                const selectedOpt = selectedAnswers[q.id];
                const isCorrect = selectedOpt === q.correctOptionIndex;

                return (
                  <div
                    key={q.id}
                    className="p-4 sm:p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 font-mono font-bold flex items-center justify-center text-xs">
                          {idx + 1}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-800 text-stone-400 font-mono">
                          {q.examYearTagMr}
                        </span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${
                        q.difficulty === 'easy' ? 'bg-emerald-500/20 text-emerald-300' :
                        q.difficulty === 'medium' ? 'bg-amber-500/20 text-amber-300' : 'bg-red-500/20 text-red-300'
                      }`}>
                        {q.difficulty.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-stone-100 whitespace-pre-line leading-relaxed">
                      {q.questionMr}
                    </p>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.optionsMr.map((opt, optIdx) => {
                        let btnStyle = 'bg-stone-900/90 border-stone-800 text-stone-300 hover:bg-stone-850';
                        if (isSubmitted) {
                          if (optIdx === q.correctOptionIndex) {
                            btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                          } else if (selectedOpt === optIdx) {
                            btnStyle = 'bg-red-500/20 border-red-500 text-red-300';
                          } else {
                            btnStyle = 'bg-stone-900/40 border-stone-800/40 text-stone-500 opacity-60';
                          }
                        } else if (selectedOpt === optIdx) {
                          btnStyle = 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isSubmitted}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2 cursor-pointer ${btnStyle}`}
                          >
                            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono shrink-0">
                              {['१', '२', '३', '४'][optIdx]}
                            </span>
                            <span className="flex-1">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Action & Explanation */}
                    <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                      {!isSubmitted ? (
                        <button
                          disabled={selectedOpt === undefined}
                          onClick={() => handleSubmitAnswer(q.id)}
                          className={`px-4 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                            selectedOpt !== undefined
                              ? 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                              : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                          }`}
                        >
                          {isMr ? 'उत्तर तपासा' : 'Check Answer'}
                        </button>
                      ) : (
                        <div className="w-full p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                          <div className="flex items-center gap-1.5 text-xs font-bold">
                            {isCorrect ? (
                              <span className="text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" /> बरोबर उत्तर! (+१ गुण)
                              </span>
                            ) : (
                              <span className="text-red-400">
                                ❌ चुकीचे उत्तर! योग्य पर्याय: {q.correctOptionIndex + 1}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-300 leading-relaxed pt-1">
                            <span className="font-bold text-amber-400">स्पष्टीकरण: </span>
                            {q.explanationMr}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: PRINTABLE A4 REVISION CAPSULE */}
        {activeTab === 'printable' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-stone-950 space-y-6">
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/60 to-stone-900 border border-purple-500/40 flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-sm sm:text-base font-black text-purple-300">
                  {isMr ? '🖨️ मुद्रणयोग्य A4 रिव्हिजन कॅप्सूल (Printable Revision Capsule)' : 'A4 Printable Revision Notes'}
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  {isMr
                    ? 'ही पाने तुमच्या प्रिंटरवरून थेट A4 आकारावर प्रिंट करा किंवा सेव्ह ॲज पीडीएफ करा.'
                    : 'Print directly or Save as PDF for library study.'}
                </p>
              </div>

              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-stone-100 font-black text-xs flex items-center gap-2 cursor-pointer shadow-lg transition-transform hover:scale-105"
              >
                <Printer className="w-4 h-4" />
                <span>{isMr ? 'आता प्रिंट करा (Print Now)' : 'Print / Save PDF'}</span>
              </button>
            </div>

            {/* Document Sheet Simulation */}
            <div className="p-6 sm:p-8 bg-white text-stone-900 rounded-xl shadow-2xl space-y-6 font-sans">
              <div className="border-b-2 border-stone-900 pb-3 text-center space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-widest text-stone-500">
                  MPSC RAJYASEVA & COMBINE GROUP B & C PRELIMS 2026
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-stone-950">
                  महाराष्ट्र शासकीय योजना व आर्थिक पाहणी - द्रुतगती रिव्हिजन कॅप्सूल
                </h1>
                <p className="text-xs text-stone-600">
                  तुकडी विशेष नोट्स • एकूण ६०+ योजना • आर्थिक पाहणी २०२४-२६ प्रमुख निर्देशांक
                </p>
              </div>

              {/* Economic Survey Summary Table */}
              <div className="space-y-2">
                <h2 className="text-sm font-black bg-stone-200 px-3 py-1.5 rounded text-stone-900">
                  १. महाराष्ट्र आर्थिक पाहणी अहवाल २०२४-२६ : महत्त्वाचे फॅक्ट्स
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div className="border p-2 rounded">
                    <span className="font-bold text-stone-600 block">GSDP वाढ दर:</span>
                    <span className="font-black text-sm">७.६% (२०२४-२५)</span>
                  </div>
                  <div className="border p-2 rounded">
                    <span className="font-bold text-stone-600 block">दरडोई उत्पन्न:</span>
                    <span className="font-black text-sm">₹२,५२,३८९ / वर्ष</span>
                  </div>
                  <div className="border p-2 rounded">
                    <span className="font-bold text-stone-600 block">FDI गुंतवणूक:</span>
                    <span className="font-black text-sm">देशात १ ला क्रमांक (~३१%)</span>
                  </div>
                  <div className="border p-2 rounded">
                    <span className="font-bold text-stone-600 block">सेवा क्षेत्राचा वाटा:</span>
                    <span className="font-black text-sm">६१.१% (प्रथम)</span>
                  </div>
                  <div className="border p-2 rounded">
                    <span className="font-bold text-stone-600 block">उद्योग क्षेत्राचा वाटा:</span>
                    <span className="font-black text-sm">२६.९% (द्वितीय)</span>
                  </div>
                  <div className="border p-2 rounded">
                    <span className="font-bold text-stone-600 block">कृषी क्षेत्राचा वाटा:</span>
                    <span className="font-black text-sm">१२.०% (तृतीय)</span>
                  </div>
                </div>
              </div>

              {/* Top 6 High-Yield Schemes Table */}
              <div className="space-y-2">
                <h2 className="text-sm font-black bg-stone-200 px-3 py-1.5 rounded text-stone-900">
                  २. प्रमुख शासकीय योजना : परीक्षाभिमुख सारांश
                </h2>
                <div className="border rounded overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-stone-100 border-b">
                        <th className="p-2 border-r font-bold">योजनेचे नाव</th>
                        <th className="p-2 border-r font-bold">सुरुवात</th>
                        <th className="p-2 border-r font-bold">आर्थिक लाभ / अनुदान</th>
                        <th className="p-2 font-bold">नोडल विभाग व विशेष बाब</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MAHARASHTRA_GOVT_SCHEMES.slice(0, 8).map((s, idx) => (
                        <tr key={idx} className="border-b hover:bg-stone-50">
                          <td className="p-2 border-r font-bold">{s.nameMr}</td>
                          <td className="p-2 border-r">{s.launchYear.split(' ')[0]}</td>
                          <td className="p-2 border-r font-semibold text-emerald-800">{s.financialBenefitMr}</td>
                          <td className="p-2">{s.nodalMinistryMr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Creator Support & Affiliate Watermark Footer for Print */}
              <div className="border-t-2 border-dashed border-stone-300 pt-4 flex items-center justify-between text-xs text-stone-600 flex-wrap gap-2">
                <div>
                  <div className="font-bold text-stone-900">
                    📚 सर्वोत्कृष्ट संदर्भ: रंजन कोळंबे / किरण देसले (भारतीय अर्थव्यवस्था)
                  </div>
                  <div>दैनिक मोफत पीडीएफ व चालू घडामोडींसाठी टेलिग्राम चॅनल जॉईन करा!</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-stone-900">UPI ID: {customUpiId}</div>
                  <div className="text-[10px] text-stone-500">MPSC Study Companion • मोफत शिक्षण सहाय्य</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PASSIVE EARNING & MONETIZATION HUB */}
        {activeTab === 'monetize' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-gradient-to-b from-stone-900 to-stone-950">
            {/* Passive Earning Hero Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950/60 border border-emerald-500/50 shadow-2xl">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💰</span>
                    <h3 className="text-lg font-black text-emerald-300">
                      {isMr ? 'पॅसिव्ह अर्निंग व कमाई केंद्र (Passive Monetization Engine)' : 'Passive Earning Engine'}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-300 mt-1 max-w-2xl">
                    {isMr
                      ? 'विद्यार्थ्यांना विनामूल्य दर्जेदार अभ्यास साहित्य पुरवत असताना ॲमेझॉन असोसिएट्स, डायरेक्ट UPI क्यूआर डोनेशन आणि टेलिग्राम ब्रॉडकास्टमधून नियमित पॅसिव्ह उत्पन्न मिळवा!'
                      : 'Earn passive affiliate income from recommended books, direct UPI support, and Telegram broadcasts.'}
                  </p>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                  {isMr ? '८-१०% कमिशन स्लॅब' : '8-10% Commission'}
                </div>
              </div>
            </div>

            {/* Direct UPI Support & QR Code Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/90 border border-stone-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold text-amber-400 uppercase tracking-wide">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>{isMr ? '१. थेट UPI देणगी / चहा सपोर्ट (Direct UPI Support)' : 'Direct UPI QR'}</span>
                </div>
                <p className="text-xs text-stone-400">
                  {isMr
                    ? 'विद्यार्थी या क्यूआर कोडवरून ॲपच्या सर्व्हर व पीडीएफ निर्मितीसाठी ₹२९ किंवा ₹४९ थेट तुमच्या बँक खात्यात पाठवू शकतात.'
                    : 'Aspirants can support with ₹29 / ₹49 directly to your UPI ID.'}
                </p>

                {/* Simulated QR Box */}
                <div className="p-4 rounded-xl bg-white text-stone-950 flex flex-col items-center justify-center space-y-2 border-2 border-stone-800">
                  <div className="w-32 h-32 bg-stone-100 rounded-lg border-2 border-dashed border-stone-400 flex flex-col items-center justify-center p-2 text-center">
                    <span className="text-3xl">📱</span>
                    <span className="text-[10px] font-mono font-bold text-stone-700 mt-1">SCAN WITH GOOGLE PAY / PHONEPE</span>
                  </div>
                  <div className="text-xs font-mono font-black text-stone-900">
                    {customUpiId}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customUpiId}
                    onChange={(e) => setCustomUpiId(e.target.value)}
                    placeholder="तुमचा UPI ID टाका"
                    className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-3 py-1.5 text-xs text-stone-200 font-mono focus:outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={handleCopyUpi}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUpi ? 'कॉपी झाले!' : 'UPI कॉपी'}</span>
                  </button>
                </div>
              </div>

              {/* Telegram Channel Growth Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/90 border border-stone-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold text-blue-400 uppercase tracking-wide">
                  <Share2 className="w-4 h-4 text-blue-400" />
                  <span>{isMr ? '२. व्हॉट्सॲप / टेलिग्राम ब्रॉडकास्ट व ट्रॅफिक' : 'Viral Community Funnel'}</span>
                </div>
                <p className="text-xs text-stone-400">
                  {isMr
                    ? '१०,०००+ ॲक्टिव्ह स्पर्धा परीक्षा ग्रुप्समध्ये ही योजना यादी शेअर करा. येणारे विद्यार्थी तुमच्या ॲमेझॉन लिंक्स आणि ॲडसेन्सचे कायमस्वरूपी वाचक बनतील.'
                    : 'Share to MPSC groups to build recurring traffic.'}
                </p>

                <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
                  <div className="text-xs font-bold text-stone-300">शेअर संदेश (One-Click Message):</div>
                  <p className="text-[11px] text-stone-400 italic">
                    "🏛️ लाडकी बहीण, नमो शेतकरी, लेक लाडकी सह ६०+ योजना आणि आर्थिक पाहणी २०२४-२६ चे संपूर्ण MPSC PYQs मोफत सराव करा!"
                  </p>
                  <button
                    onClick={handleShareApp}
                    className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedShareLink ? 'संदेश कॉपी झाला!' : 'मित्रांना व ग्रुप्समध्ये शेअर करा'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Amazon Affiliate Recommended Books for Economics & Schemes */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/90 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-400 uppercase tracking-wide">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>{isMr ? '३. ॲमेझॉन असोसिएट्स : शिफारस केलेली अर्थशास्त्र पुस्तके (८% कमिशन)' : 'Recommended Books'}</span>
                </div>
                <span className="text-[10px] text-stone-400">Amazon Verified</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {SCHEMES_AFFILIATE_BOOKS.map((book) => (
                  <div
                    key={book.id}
                    className="p-3.5 rounded-xl bg-stone-900 border border-stone-800/90 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        {book.badge}
                      </span>
                      <h4 className="text-xs font-bold text-stone-200 mt-1">
                        {book.titleMr}
                      </h4>
                      <p className="text-[11px] text-stone-400">
                        {book.authorMr}
                      </p>
                      <p className="text-[10px] text-stone-500 line-clamp-2">
                        {book.descriptionMr}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-black text-emerald-400">₹{book.discountPriceInr}</span>
                        <span className="text-[10px] text-stone-500 line-through ml-1.5">₹{book.priceInr}</span>
                      </div>
                      <a
                        href={book.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1 transition-colors"
                      >
                        <span>खरेदी करा</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
