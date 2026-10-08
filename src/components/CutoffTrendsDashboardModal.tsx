import React, { useState, useMemo } from 'react';
import {
  X,
  TrendingUp,
  BarChart3,
  Calculator,
  Award,
  Filter,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  ShieldCheck,
  Share2,
  Sparkles,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Calendar,
  Layers,
  BookOpen,
  Users,
  Target,
  FileText,
  Printer,
  Copy,
  Check
} from 'lucide-react';
import {
  OFFICIAL_CUTOFF_RECORDS,
  CUTOFF_POST_SUMMARIES,
  CUTOFF_EXPERT_INSIGHTS,
  CATEGORY_LABELS_MAP,
  ExamCutoffRecord,
  ExamCategoryKey
} from '../data/cutoffTrendsData';
import { soundFx } from '../utils/audio';

interface CutoffTrendsDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'mr' | 'en';
  defaultExamType?: 'all' | 'group_c' | 'group_b' | 'talathi';
  defaultPostId?: string;
}

export const CutoffTrendsDashboardModal: React.FC<CutoffTrendsDashboardModalProps> = ({
  isOpen,
  onClose,
  language,
  defaultExamType = 'all',
  defaultPostId
}) => {
  const isMr = language === 'mr';

  // Active view tab: 'trends' | 'table' | 'calculator' | 'insights'
  const [activeTab, setActiveTab] = useState<'trends' | 'table' | 'calculator' | 'insights'>('trends');

  // Filters
  const [selectedExamType, setSelectedExamType] = useState<'all' | 'group_c' | 'group_b' | 'talathi'>(defaultExamType);
  const [selectedPostId, setSelectedPostId] = useState<string>(defaultPostId || 'all');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<ExamCategoryKey>('OPEN');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedRecordId, setExpandedRecordId] = useState<string | null>(null);

  // Score Calculator state
  const [calcScore, setCalcScore] = useState<number>(56);
  const [calcPostId, setCalcPostId] = useState<string>('group_c_clerk');
  const [calcCategory, setCalcCategory] = useState<ExamCategoryKey>('OPEN');
  const [calcIsFemale, setCalcIsFemale] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  if (!isOpen) return null;

  // Filtered records
  const filteredRecords = useMemo(() => {
    return OFFICIAL_CUTOFF_RECORDS.filter((rec) => {
      // Exam type filter
      if (selectedExamType !== 'all' && rec.examType !== selectedExamType) {
        return false;
      }
      // Post filter
      if (selectedPostId !== 'all') {
        if (selectedPostId === 'group_c_clerk' && !rec.id.includes('clerk')) return false;
        if (selectedPostId === 'group_c_tax_ast' && !rec.id.includes('tax_ast')) return false;
        if (selectedPostId === 'group_c_excise' && !rec.id.includes('excise')) return false;
        if (selectedPostId === 'group_b_psi' && !rec.id.includes('psi')) return false;
        if (selectedPostId === 'group_b_sti' && !rec.id.includes('sti')) return false;
        if (selectedPostId === 'group_b_aso' && !rec.id.includes('aso')) return false;
        if (selectedPostId === 'talathi' && rec.examType !== 'talathi') return false;
      }
      // Year filter
      if (selectedYear !== 'all' && rec.year !== selectedYear) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesPost = rec.postNameMr.toLowerCase().includes(query) || rec.postNameEn.toLowerCase().includes(query);
        const matchesExam = rec.examTypeLabelMr.toLowerCase().includes(query) || rec.examTypeLabelEn.toLowerCase().includes(query);
        const matchesNotes = rec.keyNotesMr.toLowerCase().includes(query) || rec.keyNotesEn.toLowerCase().includes(query);
        if (!matchesPost && !matchesExam && !matchesNotes) return false;
      }
      return true;
    });
  }, [selectedExamType, selectedPostId, selectedYear, searchQuery]);

  // Selected post for Graphical Trends
  const trendActivePost = useMemo(() => {
    if (selectedPostId !== 'all') {
      return CUTOFF_POST_SUMMARIES.find((p) => p.postId === selectedPostId) || CUTOFF_POST_SUMMARIES[0];
    }
    return CUTOFF_POST_SUMMARIES[0];
  }, [selectedPostId]);

  // Records for current trend post
  const trendRecordsForPost = useMemo(() => {
    return OFFICIAL_CUTOFF_RECORDS.filter((r) => {
      if (trendActivePost.postId === 'group_c_clerk') return r.id.includes('clerk');
      if (trendActivePost.postId === 'group_c_tax_ast') return r.id.includes('tax_ast');
      if (trendActivePost.postId === 'group_c_excise') return r.id.includes('excise');
      if (trendActivePost.postId === 'group_b_psi') return r.id.includes('psi');
      if (trendActivePost.postId === 'group_b_sti') return r.id.includes('sti');
      if (trendActivePost.postId === 'group_b_aso') return r.id.includes('aso');
      if (trendActivePost.postId === 'talathi') return r.examType === 'talathi';
      return false;
    }).sort((a, b) => a.year - b.year);
  }, [trendActivePost]);

  // Calculator evaluation results across available years for chosen post
  const calcResults = useMemo(() => {
    const postRecords = OFFICIAL_CUTOFF_RECORDS.filter((r) => {
      if (calcPostId === 'group_c_clerk') return r.id.includes('clerk');
      if (calcPostId === 'group_c_tax_ast') return r.id.includes('tax_ast');
      if (calcPostId === 'group_c_excise') return r.id.includes('excise');
      if (calcPostId === 'group_b_psi') return r.id.includes('psi');
      if (calcPostId === 'group_b_sti') return r.id.includes('sti');
      if (calcPostId === 'group_b_aso') return r.id.includes('aso');
      if (calcPostId === 'talathi') return r.examType === 'talathi';
      return false;
    }).sort((a, b) => a.year - b.year);

    return postRecords.map((rec) => {
      const catData = rec.cutoffs[calcCategory];
      const cutoffMark = (calcIsFemale && catData?.female) ? catData.female : (catData?.general || 0);
      const diff = Number((calcScore - cutoffMark).toFixed(2));
      const isCleared = diff >= 0;
      const isBorderline = diff >= -1.5 && diff < 0;

      return {
        year: rec.year,
        postName: isMr ? rec.postNameMr : rec.postNameEn,
        totalMarks: rec.totalMarks,
        cutoffMark,
        userScore: calcScore,
        diff,
        isCleared,
        isBorderline,
        vacancies: rec.totalVacancies
      };
    });
  }, [calcPostId, calcCategory, calcIsFemale, calcScore, isMr]);

  const handleCopySummary = () => {
    soundFx.playClickSound();
    const textToCopy = `📊 MPSC & Talathi Cut-Off Trends Analysis (2020-2025)
Selected Post: ${isMr ? trendActivePost.postNameMr : trendActivePost.postNameEn}
5-Year Avg Cutoff: ${trendActivePost.avgOpenPrelimsCutoff}
Latest Official Cutoff: ${trendActivePost.latestOpenCutoff}
2026-27 Target Score: ${trendActivePost.targetScoreFor2026_27}
Analyzed via MPSC सारथी Prep Engine.`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handlePrint = () => {
    soundFx.playClickSound();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto print:p-0 print:bg-white animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-stone-900 border border-amber-600/50 rounded-2xl shadow-2xl flex flex-col max-h-[94vh] overflow-hidden text-stone-100 print:border-none print:shadow-none print:max-h-none">
        
        {/* =========================================================
            HEADER BAR
           ========================================================= */}
        <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 px-4 sm:px-6 py-4 border-b border-amber-700/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-black text-amber-200 tracking-tight">
                  {isMr ? '📊 मागील वर्षांचे अधिकृत कट-ऑफ व मेरिट ॲनालिसीस' : '📊 Official Cut-off & Merit Trends Dashboard'}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider">
                  २०२० - २०२५ अधिकृत आकडेवारी
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                {isMr
                  ? 'गट-क (लिपिक, कर सहायक, उत्पादन शुल्क), तलाठी व गट-ब (PSI/STI/ASO) चे Open, OBC, SC, ST, EWS, महिला व दिव्यांग कट-ऑफ ट्रेंड्स'
                  : 'Group C, Talathi & Group B authentic category-wise cutoffs, vacancy correlations & safe target projections.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopySummary}
              title={isMr ? 'माहिती कॉपी करा' : 'Copy summary'}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-800 text-stone-300 hover:text-amber-200 hover:bg-stone-700 border border-stone-700 transition"
            >
              {copiedNotification ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedNotification ? (isMr ? 'कॉपी झाले!' : 'Copied!') : (isMr ? 'कॉपी' : 'Copy')}</span>
            </button>

            <button
              onClick={handlePrint}
              title={isMr ? 'प्रिंट / पीडीएफ' : 'Print / PDF'}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-800 text-stone-300 hover:text-amber-200 hover:bg-stone-700 border border-stone-700 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isMr ? 'प्रिंट' : 'Print'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClickSound();
                onClose();
              }}
              className="p-2 rounded-xl bg-stone-800/80 hover:bg-rose-950/80 hover:text-rose-300 text-stone-400 transition border border-stone-700"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================
            NAVIGATION TABS
           ========================================================= */}
        <div className="bg-stone-950/90 px-4 sm:px-6 py-2.5 border-b border-stone-800 flex items-center justify-between gap-2 overflow-x-auto shrink-0 select-none no-scrollbar">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                soundFx.playClickSound();
                setActiveTab('trends');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'trends'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{isMr ? '📈 ग्राफिकल ट्रेंड्स' : '📈 Graphical Trends'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClickSound();
                setActiveTab('table');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'table'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{isMr ? '📋 अधिकृत डेटा टेबल' : '📋 Official Data Table'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClickSound();
                setActiveTab('calculator');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'calculator'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{isMr ? '🎯 कट-ऑफ सुरक्षितता तपासणी' : '🎯 Safety Calculator'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClickSound();
                setActiveTab('insights');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'insights'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isMr ? '💡 तज्ज्ञ विश्लेषण व २०२६-२७ उद्दिष्ट' : '💡 Expert Insights'}</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-stone-400 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>MPSC अधिकृत उत्तरतालिका व निकाल आकडेवारी</span>
          </div>
        </div>

        {/* =========================================================
            TAB CONTENT CONTAINER
           ========================================================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* =====================================================
              TAB 1: GRAPHICAL TRENDS & COMPARISONS
             ===================================================== */}
          {activeTab === 'trends' && (
            <div className="space-y-6">
              {/* Quick Post Switcher Carousel */}
              <div className="bg-stone-950/70 p-3 sm:p-4 rounded-xl border border-stone-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" />
                    {isMr ? 'पद निवडा (Select Target Post for Visual Trend):' : 'Select Target Post for Visual Trend:'}
                  </span>
                  <span className="text-[11px] text-stone-400">
                    {isMr ? '२०२० ते २०२५ ची प्रगती' : '2020 - 2025 progression'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {CUTOFF_POST_SUMMARIES.map((post) => {
                    const isSelected = trendActivePost.postId === post.postId;
                    return (
                      <button
                        key={post.postId}
                        onClick={() => {
                          soundFx.playClickSound();
                          setSelectedPostId(post.postId);
                        }}
                        className={`text-left p-2.5 rounded-xl border transition flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-900/40 border-amber-500/80 text-amber-200 ring-1 ring-amber-500/50'
                            : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-stone-700 hover:bg-stone-800/50'
                        }`}
                      >
                        <div>
                          <div className="text-[10px] uppercase font-bold text-stone-400 mb-0.5">
                            {post.examType === 'group_c' ? (isMr ? 'गट-क' : 'Group C') : post.examType === 'group_b' ? (isMr ? 'गट-ब' : 'Group B') : (isMr ? 'महसूल' : 'Revenue')}
                          </div>
                          <div className="text-xs font-bold leading-tight">
                            {isMr ? post.postNameMr.split(' (')[0] : post.postNameEn.split(' (')[0]}
                          </div>
                        </div>
                        <div className="mt-2 pt-1 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                          <span className="text-stone-400">नवीन:</span>
                          <span className="font-mono font-bold text-amber-300">{post.latestOpenCutoff}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Key Metric Highlights for Selected Post */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 flex flex-col justify-between">
                  <div className="text-xs text-stone-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isMr ? '५ वर्षांचा सरासरी कट-ऑफ' : '5-Year Average Cutoff'}</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-amber-300">
                      {trendActivePost.avgOpenPrelimsCutoff}
                    </span>
                    <span className="text-xs text-stone-400">/ १००</span>
                  </div>
                  <span className="text-[10px] text-stone-500 mt-1">Open General मानक</span>
                </div>

                <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 flex flex-col justify-between">
                  <div className="text-xs text-stone-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                    <span>{isMr ? 'सध्याचा अंतिम कट-ऑफ (२०२५)' : 'Latest Official (2025)'}</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-rose-300">
                      {trendActivePost.latestOpenCutoff}
                    </span>
                    <span className="text-xs text-rose-400/80 font-bold">
                      {trendActivePost.cutoffTrend === 'increasing' ? '↑ वाढता' : '↔ स्थिर'}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-500 mt-1">अंतिम गुणवत्ता यादी</span>
                </div>

                <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 flex flex-col justify-between">
                  <div className="text-xs text-stone-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isMr ? '२०२६-२७ सुरक्षित उद्दिष्ट' : 'Safe Target 2026-27'}</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-300">
                      {trendActivePost.targetScoreFor2026_27}+
                    </span>
                    <span className="text-xs text-emerald-400/80 font-semibold">सुरक्षित झोन</span>
                  </div>
                  <span className="text-[10px] text-stone-500 mt-1">३ जाने २०२७ / १४ जून २०२६</span>
                </div>

                <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 flex flex-col justify-between">
                  <div className="text-xs text-stone-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{isMr ? 'प्रवर्ग समतुल्यता (Parity)' : 'OBC/EWS Parity'}</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-lg sm:text-xl font-black text-indigo-300">
                      {isMr ? '९८% समान' : '98% Identical'}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-500 mt-1">Open, OBC व EWS एकच कट-ऑफ</span>
                </div>
              </div>

              {/* Visual Interactive SVG Line / Bar Graph */}
              <div className="bg-stone-950/90 p-5 rounded-2xl border border-amber-800/30">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-amber-200 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-amber-400" />
                      <span>
                        {isMr
                          ? `${trendActivePost.postNameMr} - २०२० ते २०२५ कट-ऑफ चढ-उतार आलेख`
                          : `${trendActivePost.postNameEn} - 2020-2025 Cutoff Progression`}
                      </span>
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {isMr
                        ? 'खुल्या प्रवर्गाचे (Open General) वर्षनिहाय अधिकृत गुण आणि जागांचा संबंध'
                        : 'Yearly official marks for Open General correlated with vacancy volume.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1 text-amber-300">
                      <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                      <span>Open General</span>
                    </span>
                    <span className="flex items-center gap-1 text-rose-300 ml-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                      <span>Female (महिला)</span>
                    </span>
                  </div>
                </div>

                {/* SVG Progression Visualizer */}
                <div className="relative w-full h-64 sm:h-72 bg-stone-900/50 rounded-xl p-4 border border-stone-800/80 flex flex-col justify-between">
                  {/* Grid Lines */}
                  <div className="absolute inset-4 flex flex-col justify-between pointer-events-none opacity-20">
                    <div className="border-b border-stone-400 w-full"></div>
                    <div className="border-b border-stone-400 w-full"></div>
                    <div className="border-b border-stone-400 w-full"></div>
                    <div className="border-b border-stone-400 w-full"></div>
                  </div>

                  {/* Year Pillars */}
                  <div className="relative h-full flex items-end justify-around gap-2 pt-6 pb-2 z-10">
                    {trendRecordsForPost.map((rec) => {
                      const maxMark = rec.totalMarks === 200 ? 200 : 80;
                      const openScore = rec.cutoffs.OPEN.general;
                      const femaleScore = rec.cutoffs.OPEN.female || (openScore - 5.5);
                      const openHeightPercent = Math.min(100, Math.max(15, (openScore / maxMark) * 100));
                      const femaleHeightPercent = Math.min(100, Math.max(12, (femaleScore / maxMark) * 100));

                      return (
                        <div key={rec.id} className="flex-1 flex flex-col items-center h-full justify-end group">
                          {/* Hover Tooltip Card */}
                          <div className="mb-2 hidden group-hover:flex flex-col items-center bg-stone-950 text-stone-200 text-[10px] p-2 rounded-lg border border-amber-500/50 shadow-xl absolute -top-4 z-30 pointer-events-none min-w-[130px]">
                            <span className="font-bold text-amber-300">{rec.year} ({rec.totalVacancies} पदे)</span>
                            <div className="flex justify-between w-full mt-1">
                              <span>Open:</span>
                              <span className="font-mono font-bold text-amber-400">{openScore}</span>
                            </div>
                            <div className="flex justify-between w-full">
                              <span>महिला:</span>
                              <span className="font-mono text-rose-300">{femaleScore}</span>
                            </div>
                            <span className="text-[9px] text-stone-400 mt-1 truncate max-w-[120px]">{rec.notificationRef}</span>
                          </div>

                          {/* Bars container */}
                          <div className="w-full flex items-end justify-center gap-1.5 sm:gap-2 h-44 sm:h-48">
                            {/* Open Bar */}
                            <div
                              style={{ height: `${openHeightPercent}%` }}
                              className="w-4 sm:w-8 bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-md transition-all duration-300 relative group-hover:brightness-110 flex items-start justify-center pt-1"
                            >
                              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-stone-900 drop-shadow -rotate-90 sm:rotate-0 mt-1 sm:mt-0">
                                {openScore}
                              </span>
                            </div>

                            {/* Female Bar */}
                            <div
                              style={{ height: `${femaleHeightPercent}%` }}
                              className="w-3.5 sm:w-6 bg-gradient-to-t from-rose-700 to-rose-400 rounded-t-md transition-all duration-300 relative group-hover:brightness-110 flex items-start justify-center pt-1"
                            >
                              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-stone-900 drop-shadow -rotate-90 sm:rotate-0 mt-1 sm:mt-0">
                                {femaleScore}
                              </span>
                            </div>
                          </div>

                          {/* Year & Vacancy label */}
                          <div className="mt-2 text-center">
                            <div className="text-xs font-black text-stone-200">{rec.year}</div>
                            <div className="text-[10px] text-stone-400 font-mono">{rec.totalVacancies} पदे</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footnote explanation for special year (e.g. 2023 mega vacancy) */}
                <div className="mt-4 p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-start gap-2.5 text-xs text-amber-200/90">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">नोंद व विश्लेषण: </span>
                    {isMr
                      ? '२०२३ मध्ये लिपिक-टंकलेखक पदाची ७,०३४ इतकी विक्रमी पदसंख्या असल्याने पूर्व परीक्षेचा कट-ऑफ १९ गुणांवर आला होता. मात्र इतर पदांचा (कर सहायक, उत्पादन शुल्क, PSI, STI) कट-ऑफ नेहमीप्रमाणे ५४ ते ६५ गुणांच्या पट्ट्यातच राहिला. २०२६-२७ च्या नियोजनात ५८+ गुणांचे ध्येय सुरक्षित ठरते.'
                      : 'In 2023, mega vacancy of 7034 posts brought Clerk cutoff to 19, whereas other posts (Tax Asst, Excise, PSI, STI) remained at 54-65 marks. Target 58+ for upcoming exams.'}
                  </div>
                </div>
              </div>

              {/* Category-Wise Comparative Matrix for Latest Year */}
              <div className="bg-stone-950/80 p-5 rounded-2xl border border-stone-800">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-stone-200 flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-400" />
                      <span>{isMr ? 'प्रवर्गनिहाय तुलना (Category Breakdown - Latest Exam)' : 'Category Breakdown - Latest Exam'}</span>
                    </h3>
                    <p className="text-xs text-stone-400">
                      {isMr ? 'विविध आरक्षित प्रवर्गांमधील कट-ऑफ गुण व फरक' : 'Comparative score distribution across all reservation classes.'}
                    </p>
                  </div>
                </div>

                {trendRecordsForPost.length > 0 && (() => {
                  const latestRec = trendRecordsForPost[trendRecordsForPost.length - 1];
                  const catKeys: ExamCategoryKey[] = ['OPEN', 'OBC', 'EWS', 'SC', 'ST', 'VJ_NT_A', 'NT_B', 'NT_C', 'NT_D'];
                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                      {catKeys.map((catKey) => {
                        const data = latestRec.cutoffs[catKey];
                        if (!data) return null;
                        const label = CATEGORY_LABELS_MAP[catKey];
                        return (
                          <div key={catKey} className="bg-stone-900/90 p-3 rounded-xl border border-stone-800">
                            <div className="text-xs font-bold text-stone-300 truncate">
                              {isMr ? label.mr.split(' (')[0] : label.en}
                            </div>
                            <div className="mt-2 flex items-baseline justify-between">
                              <span className="text-lg font-mono font-black text-amber-300">
                                {data.general}
                              </span>
                              {data.female && (
                                <span className="text-xs font-mono text-rose-300">
                                  ♀ {data.female}
                                </span>
                              )}
                            </div>
                            <div className="mt-1 pt-1 border-t border-stone-800 text-[10px] text-stone-400 flex justify-between">
                              <span>खेळाडू: {data.sports || '-'}</span>
                              <span>माजी सै: {data.exServicemen || '-'}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* =====================================================
              TAB 2: DETAILED OFFICIAL DATA TABLE
             ===================================================== */}
          {activeTab === 'table' && (
            <div className="space-y-4">
              {/* Filter controls row */}
              <div className="bg-stone-950/80 p-4 rounded-xl border border-stone-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Exam filter */}
                  <div className="flex items-center gap-1.5 bg-stone-900 px-2.5 py-1.5 rounded-lg border border-stone-700 text-xs">
                    <Filter className="w-3.5 h-3.5 text-amber-400" />
                    <select
                      value={selectedExamType}
                      onChange={(e) => {
                        soundFx.playClickSound();
                        setSelectedExamType(e.target.value as any);
                      }}
                      className="bg-transparent text-stone-200 outline-none cursor-pointer"
                    >
                      <option value="all" className="bg-stone-900">{isMr ? 'सर्व परीक्षा (All Exams)' : 'All Exams'}</option>
                      <option value="group_c" className="bg-stone-900">{isMr ? 'गट-क संयुक्त (Group C)' : 'Group C'}</option>
                      <option value="group_b" className="bg-stone-900">{isMr ? 'गट-ब संयुक्त (Group B)' : 'Group B'}</option>
                      <option value="talathi" className="bg-stone-900">{isMr ? 'तलाठी भरती (Talathi)' : 'Talathi'}</option>
                    </select>
                  </div>

                  {/* Year filter */}
                  <div className="flex items-center gap-1.5 bg-stone-900 px-2.5 py-1.5 rounded-lg border border-stone-700 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <select
                      value={selectedYear}
                      onChange={(e) => {
                        soundFx.playClickSound();
                        setSelectedYear(e.target.value === 'all' ? 'all' : Number(e.target.value));
                      }}
                      className="bg-transparent text-stone-200 outline-none cursor-pointer"
                    >
                      <option value="all" className="bg-stone-900">{isMr ? 'सर्व वर्षे (२०२०-२०२५)' : 'All Years'}</option>
                      <option value="2025" className="bg-stone-900">२०२५ (Latest)</option>
                      <option value="2024" className="bg-stone-900">२०२४</option>
                      <option value="2023" className="bg-stone-900">२०२३ (Mega Advt)</option>
                      <option value="2022" className="bg-stone-900">२०२२</option>
                      <option value="2021" className="bg-stone-900">२०२१</option>
                      <option value="2020" className="bg-stone-900">२०२०</option>
                    </select>
                  </div>
                </div>

                {/* Search input */}
                <div className="relative min-w-[240px]">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isMr ? 'पद, जाहिरात किंवा टीप शोधा...' : 'Search post, notice, notes...'}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-stone-950 rounded-xl border border-stone-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-stone-300">
                    <thead className="bg-stone-900/90 text-stone-400 uppercase text-[10px] tracking-wider border-b border-stone-800 select-none">
                      <tr>
                        <th className="py-3 px-3 sm:px-4 font-bold">{isMr ? 'वर्ष व परीक्षा' : 'Year & Exam'}</th>
                        <th className="py-3 px-3 font-bold">{isMr ? 'पद (Post)' : 'Post'}</th>
                        <th className="py-3 px-2 font-bold text-center">{isMr ? 'पदसंख्या' : 'Vacancies'}</th>
                        <th className="py-3 px-2 font-bold text-right text-amber-300">OPEN</th>
                        <th className="py-3 px-2 font-bold text-right text-rose-300">{isMr ? 'महिला' : 'Female'}</th>
                        <th className="py-3 px-2 font-bold text-right">OBC</th>
                        <th className="py-3 px-2 font-bold text-right">EWS</th>
                        <th className="py-3 px-2 font-bold text-right">SC</th>
                        <th className="py-3 px-2 font-bold text-right">ST</th>
                        <th className="py-3 px-2 font-bold text-right text-indigo-300">{isMr ? 'दिव्यांग' : 'PwD'}</th>
                        <th className="py-3 px-3 text-center">{isMr ? 'तपशील' : 'Details'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800/60 font-sans">
                      {filteredRecords.map((rec) => {
                        const isExpanded = expandedRecordId === rec.id;
                        return (
                          <React.Fragment key={rec.id}>
                            <tr className="hover:bg-stone-900/60 transition group">
                              <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40 text-[11px]">
                                    {rec.year}
                                  </span>
                                  <span className="text-[11px] text-stone-400">
                                    {isMr ? rec.stageLabelMr.split(' (')[0] : rec.stageLabelEn}
                                  </span>
                                </div>
                              </td>

                              <td className="py-3 px-3">
                                <div className="font-bold text-stone-200">
                                  {isMr ? rec.postNameMr : rec.postNameEn}
                                </div>
                                <div className="text-[10px] text-stone-500">
                                  {isMr ? rec.examTypeLabelMr : rec.examTypeLabelEn}
                                </div>
                              </td>

                              <td className="py-3 px-2 text-center font-mono font-semibold text-stone-300">
                                {rec.totalVacancies}
                              </td>

                              <td className="py-3 px-2 text-right font-mono font-black text-amber-300 bg-amber-950/10">
                                {rec.cutoffs.OPEN.general}
                              </td>

                              <td className="py-3 px-2 text-right font-mono text-rose-300">
                                {rec.cutoffs.OPEN.female || '-'}
                              </td>

                              <td className="py-3 px-2 text-right font-mono text-stone-300">
                                {rec.cutoffs.OBC.general}
                              </td>

                              <td className="py-3 px-2 text-right font-mono text-stone-300">
                                {rec.cutoffs.EWS.general}
                              </td>

                              <td className="py-3 px-2 text-right font-mono text-stone-300">
                                {rec.cutoffs.SC.general}
                              </td>

                              <td className="py-3 px-2 text-right font-mono text-stone-300">
                                {rec.cutoffs.ST.general}
                              </td>

                              <td className="py-3 px-2 text-right font-mono text-indigo-300">
                                {rec.cutoffs.OPEN.divyang?.typeC || rec.cutoffs.OPEN.divyang?.typeA || '-'}
                              </td>

                              <td className="py-3 px-3 text-center">
                                <button
                                  onClick={() => {
                                    soundFx.playClickSound();
                                    setExpandedRecordId(isExpanded ? null : rec.id);
                                  }}
                                  className="p-1 rounded bg-stone-800 text-stone-400 hover:text-amber-300 hover:bg-stone-700 transition"
                                  title={isMr ? 'सविस्तर विश्लेषण' : 'View breakdown'}
                                >
                                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                </button>
                              </td>
                            </tr>

                            {/* Expanded Detail Row */}
                            {isExpanded && (
                              <tr className="bg-stone-900/90 border-b border-amber-900/30">
                                <td colSpan={11} className="p-4">
                                  <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-3">
                                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-2">
                                      <div className="flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-amber-400" />
                                        <span className="font-bold text-amber-300 text-xs">
                                          {isMr ? 'अधिकृत संदर्भ व विश्लेषण:' : 'Official Reference & Analysis:'}
                                        </span>
                                        <span className="text-stone-400 text-xs">{rec.notificationRef}</span>
                                      </div>
                                      <div className="text-xs text-stone-400 flex items-center gap-3 font-mono">
                                        <span>निगेटिव्ह: {rec.negativeMarking}</span>
                                        <span>काठिण्यपातळी: {rec.difficultyLevel}</span>
                                        <span>एकूण गुण: {rec.totalMarks}</span>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                      <div className="bg-stone-900 p-3 rounded-lg border border-stone-800/80">
                                        <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                                          <Info className="w-3.5 h-3.5" />
                                          <span>{isMr ? 'महत्त्वाची वैशिष्ट्ये व पार्श्वभूमी:' : 'Key Context & Dynamics:'}</span>
                                        </div>
                                        <p className="text-stone-300 leading-relaxed">
                                          {isMr ? rec.keyNotesMr : rec.keyNotesEn}
                                        </p>
                                      </div>

                                      <div className="bg-stone-900 p-3 rounded-lg border border-stone-800/80">
                                        <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                                          <ShieldCheck className="w-3.5 h-3.5" />
                                          <span>{isMr ? 'सुरक्षित तयारी व कट-ऑफ सल्ला:' : 'Preparation & Target Score Advice:'}</span>
                                        </div>
                                        <p className="text-stone-300 leading-relaxed">
                                          {isMr ? rec.safeScoreAdviceMr : rec.safeScoreAdviceEn}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Sub-Category Detail Pills */}
                                    <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-stone-400">
                                      <span className="text-stone-500 font-bold">{isMr ? 'इतर प्रवर्ग:' : 'Other Sub-Categories:'}</span>
                                      <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                                        खेळाडू: <strong className="text-stone-200">{rec.cutoffs.OPEN.sports || 'N/A'}</strong>
                                      </span>
                                      <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                                        माजी सैनिक: <strong className="text-stone-200">{rec.cutoffs.OPEN.exServicemen || 'N/A'}</strong>
                                      </span>
                                      <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                                        अनाथ (Orphan): <strong className="text-stone-200">{rec.cutoffs.OPEN.orphan || 'N/A'}</strong>
                                      </span>
                                      {rec.cutoffs.OPEN.divyang?.typeC && (
                                        <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                                          दिव्यांग (अस्थिव्यंग Type C): <strong className="text-indigo-300">{rec.cutoffs.OPEN.divyang.typeC}</strong>
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================
              TAB 3: "माझा कट-ऑफ सुरक्षितता कॅल्क्युलेटर"
             ===================================================== */}
          {activeTab === 'calculator' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-amber-950/60 via-stone-950 to-stone-900 p-5 sm:p-6 rounded-2xl border border-amber-700/50 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-amber-200">
                      {isMr ? '🎯 माझा कट-ऑफ सुरक्षितता कॅल्क्युलेटर (Cutoff Safety Evaluator)' : '🎯 Cutoff Safety & Qualification Evaluator'}
                    </h3>
                    <p className="text-xs text-stone-400">
                      {isMr
                        ? 'तुमचा सध्याचा मॉक टेस्ट स्कोर टाका आणि २०२० ते २०२५ च्या परीक्षांमध्ये तुम्ही पात्र झाला असता का ते थेट तपासा!'
                        : 'Enter your score to see whether you would have qualified across each exam year from 2020 to 2025.'}
                    </p>
                  </div>
                </div>

                {/* Input Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-stone-950/80 p-4 rounded-xl border border-stone-800">
                  {/* Score Input */}
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1.5">
                      {isMr ? 'तुमचा अपेक्षित/सध्याचा गुण (Score):' : 'Your Mock Score:'}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        max={calcPostId === 'talathi' ? 200 : 100}
                        value={calcScore}
                        onChange={(e) => setCalcScore(Number(e.target.value))}
                        className="w-full bg-stone-900 border border-amber-600/50 rounded-lg px-3 py-2 text-base font-black font-mono text-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500 font-mono">
                        / {calcPostId === 'talathi' ? '२००' : '१००'}
                      </span>
                    </div>
                  </div>

                  {/* Target Post */}
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1.5">
                      {isMr ? 'लक्ष्य पद (Target Post):' : 'Target Post:'}
                    </label>
                    <select
                      value={calcPostId}
                      onChange={(e) => {
                        soundFx.playClickSound();
                        const newPost = e.target.value;
                        setCalcPostId(newPost);
                        if (newPost === 'talathi' && calcScore < 100) {
                          setCalcScore(175);
                        } else if (newPost !== 'talathi' && calcScore > 100) {
                          setCalcScore(56);
                        }
                      }}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                    >
                      <option value="group_c_clerk">{isMr ? 'लिपिक-टंकलेखक (गट-क)' : 'Clerk-Typist (Group C)'}</option>
                      <option value="group_c_tax_ast">{isMr ? 'कर सहायक (गट-क)' : 'Tax Assistant (Group C)'}</option>
                      <option value="group_c_excise">{isMr ? 'उत्पादन शुल्क दुय्यम निरीक्षक' : 'Excise Sub-Inspector'}</option>
                      <option value="group_b_psi">{isMr ? 'पोलीस उपनिरीक्षक (PSI गट-ब)' : 'PSI (Group B)'}</option>
                      <option value="group_b_sti">{isMr ? 'राज्य कर निरीक्षक (STI गट-ब)' : 'STI (Group B)'}</option>
                      <option value="group_b_aso">{isMr ? 'सहायक कक्ष अधिकारी (ASO गट-ब)' : 'ASO (Group B)'}</option>
                      <option value="talathi">{isMr ? 'तलाठी भरती (महसूल विभाग)' : 'Talathi Bharti'}</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1.5">
                      {isMr ? 'प्रवर्ग (Category):' : 'Reservation Category:'}
                    </label>
                    <select
                      value={calcCategory}
                      onChange={(e) => {
                        soundFx.playClickSound();
                        setCalcCategory(e.target.value as any);
                      }}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                    >
                      <option value="OPEN">Open (खुला प्रवर्ग)</option>
                      <option value="OBC">OBC (इतर मागासवर्ग)</option>
                      <option value="EWS">EWS (आर्थिक दुर्बल घटक)</option>
                      <option value="SC">SC (अनुसूचित जाती)</option>
                      <option value="ST">ST (अनुसूचित जमाती)</option>
                      <option value="SEBC">SEBC (मराठा प्रवर्ग)</option>
                      <option value="VJ_NT_A">VJ / NT-A (विमुक्त जाती)</option>
                      <option value="NT_B">NT-B (भटक्या जमाती)</option>
                      <option value="NT_C">NT-C (धनगर)</option>
                      <option value="NT_D">NT-D (वंजारी)</option>
                    </select>
                  </div>

                  {/* Female Checkbox */}
                  <div className="flex flex-col justify-end">
                    <label className="flex items-center gap-2 cursor-pointer bg-stone-900 px-3 py-2 rounded-lg border border-stone-800 hover:border-stone-700 transition">
                      <input
                        type="checkbox"
                        checked={calcIsFemale}
                        onChange={(e) => setCalcIsFemale(e.target.checked)}
                        className="rounded border-stone-700 text-amber-500 focus:ring-0 w-4 h-4"
                      />
                      <span className="text-xs font-semibold text-stone-200">
                        {isMr ? 'महिला आरक्षण (Female)' : 'Female Reservation'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Evaluation Results Cards across All Years */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  {isMr ? 'वर्षनिहाय निकाल तुलना (Year-by-Year Qualification Verdict):' : 'Year-by-Year Qualification Verdict:'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {calcResults.map((res) => {
                    return (
                      <div
                        key={res.year}
                        className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                          res.isCleared
                            ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-100'
                            : res.isBorderline
                            ? 'bg-amber-950/30 border-amber-500/50 text-amber-100'
                            : 'bg-rose-950/30 border-rose-500/50 text-rose-100'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-xs font-black font-mono px-2 py-0.5 rounded bg-stone-900/80 border border-stone-700">
                              {res.year}
                            </span>
                            <div className="text-xs font-bold mt-1 text-stone-200 truncate">
                              {res.postName}
                            </div>
                          </div>

                          {res.isCleared ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{isMr ? 'पात्र (Passed)' : 'Passed'}</span>
                            </span>
                          ) : res.isBorderline ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              <AlertTriangle className="w-3 h-3" />
                              <span>{isMr ? 'काठावर (Borderline)' : 'Borderline'}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                              <XCircle className="w-3 h-3" />
                              <span>{isMr ? 'अपात्र (Below)' : 'Below'}</span>
                            </span>
                          )}
                        </div>

                        <div className="mt-3 pt-3 border-t border-stone-800/80 flex items-end justify-between">
                          <div>
                            <div className="text-[10px] text-stone-400">अधिकृत कट-ऑफ:</div>
                            <div className="font-mono font-bold text-stone-200 text-sm">
                              {res.cutoffMark}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-[10px] text-stone-400">फरक (Margin):</div>
                            <div className={`font-mono font-black text-sm ${
                              res.diff >= 0 ? 'text-emerald-400' : 'text-rose-400'
                            }`}>
                              {res.diff >= 0 ? `+${res.diff}` : res.diff}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actionable Strategy Advice Card */}
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-300 space-y-1">
                  <div className="font-bold text-amber-300">
                    {isMr ? '💡 तुमचा पुढील मार्ग व रणनीती (Roadmap Ahead):' : '💡 Your Preparation Next Steps:'}
                  </div>
                  <p className="leading-relaxed">
                    {calcScore >= 60 ? (
                      isMr
                        ? 'उत्कृष्ट! तुमचा स्कोर मागील सर्व वर्षांच्या सुरक्षित मानकांपेक्षा जास्त आहे. आता अचूकतेवर भर देऊन निगेटिव्ह मार्किंग शून्य करा आणि मुख्य परीक्षेच्या पेपर-२ चा अभ्यास सुरू ठेवा.'
                        : 'Outstanding! Your score clears safe benchmarks across all years. Maintain accuracy and begin Mains preparation.'
                    ) : calcScore >= 52 ? (
                      isMr
                        ? 'चांगली कामगिरी, पण काही परीक्षांमध्ये हा स्कोर सीमारेषेवर (काठावर) येतो. सुरक्षित निवड होण्यासाठी सामान्य विज्ञान व अंकगणितातील आणखी ४ ते ५ प्रश्न अचूक आणणे आवश्यक आहे.'
                        : 'Good performance, but near the borderline for competitive years. Improve Math and Science by 4-5 questions to guarantee selection.'
                    ) : (
                      isMr
                        ? 'सावध राहा! हा स्कोर कट-ऑफपेक्षा कमी आहे. निगेटिव्ह मार्किंगमुळे गुण गमावणे टाळा, मागील वर्षांच्या प्रश्नांचा (PYQ) सराव करा व आपल्या ॲपमधील AI Weak Area Booster चा वापर करा.'
                        : 'Action required! Currently below safe margins. Use the AI Weak Area Booster and eliminate negative marking.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================
              TAB 4: EXPERT INSIGHTS & ROADMAP
             ===================================================== */}
          {activeTab === 'insights' && (
            <div className="space-y-4">
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>{isMr ? 'MPSC व तलाठी कट-ऑफचे ५ सुवर्ण नियम व वास्तव' : '5 Golden Dynamics of MPSC & Talathi Cut-Offs'}</span>
                </h3>
                <p className="text-xs text-stone-400">
                  {isMr
                    ? 'वर्षानुवर्षे निकाल विश्लेषण करून तयार केलेले तज्ज्ञ निष्कर्ष, ज्यामुळे तुमचा अभ्यास दिशानिर्देशित होईल.'
                    : 'Evidence-based insights derived from multi-year result trends to guide your strategic preparation.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CUTOFF_EXPERT_INSIGHTS.map((item, idx) => (
                  <div key={item.id} className="bg-stone-950/80 p-4 rounded-xl border border-stone-800/80 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <h4 className="text-xs font-bold text-stone-200">
                          {isMr ? item.titleMr : item.titleEn}
                        </h4>
                      </div>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        {isMr ? item.summaryMr : item.summaryEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mega 3 Jan 2027 Projections Banner */}
              <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 p-5 rounded-2xl border border-amber-600/50 mt-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      आगामी महापरीक्षा लक्ष्य
                    </span>
                    <h4 className="text-base font-black text-amber-200 mt-1">
                      {isMr ? '३ जानेवारी २०२७ गट-क व तलाठी पूर्व परीक्षेसाठी लक्ष्य गुण:' : 'Target Scores for 3 January 2027 Mega Exam:'}
                    </h4>
                    <p className="text-xs text-stone-300 mt-1">
                      {isMr
                        ? 'लिपिक: ५८+, कर सहायक: ६२+, उत्पादन शुल्क: ७०+, तलाठी: १८०+ (TCS Normalized)'
                        : 'Clerk: 58+, Tax Asst: 62+, Excise: 70+, Talathi: 180+ (out of 200)'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      soundFx.playClickSound();
                      setActiveTab('calculator');
                    }}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-lg shrink-0"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>{isMr ? 'माझा स्कोर आताच तपासा' : 'Test My Score Now'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* =========================================================
            MODAL FOOTER
           ========================================================= */}
        <div className="bg-stone-950 px-4 sm:px-6 py-3 border-t border-stone-800 flex items-center justify-between gap-3 text-xs text-stone-400 shrink-0">
          <div className="flex items-center gap-2 truncate">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">
              {isMr ? 'आकडेवारी स्रोत: महाराष्ट्र लोकसेवा आयोग (MPSC) व महसूल विभाग अधिकृत निकाल' : 'Source: Official MPSC Notifications & Revenue Dept Merit Lists'}
            </span>
          </div>

          <button
            onClick={() => {
              soundFx.playClickSound();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold transition"
          >
            {isMr ? 'बंद करा' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
