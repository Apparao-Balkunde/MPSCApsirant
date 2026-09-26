import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  XCircle,
  Bookmark,
  Search,
  Lightbulb,
  AlertTriangle,
  Play,
  Share2,
  Copy,
  Check,
  Zap,
} from 'lucide-react';
import { GrammarRule } from '../types';
import { GRAMMAR_RULES } from '../data/grammarRules';

interface GrammarRulesViewProps {
  onStartPracticeWithQuestions?: (questionIds: string[], title: string) => void;
  savedRuleIds?: string[];
  onToggleBookmark?: (ruleId: string) => void;
}

export const GrammarRulesView: React.FC<GrammarRulesViewProps> = ({
  onStartPracticeWithQuestions,
  savedRuleIds = [],
  onToggleBookmark,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | 'marathi' | 'english'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);
  const [expandedRuleIds, setExpandedRuleIds] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<'cards' | 'cheatsheet'>('cards');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Available categories based on selected language
  const categories = useMemo(() => {
    const list = GRAMMAR_RULES.filter(
      (r) => selectedLanguage === 'all' || r.language === selectedLanguage
    );
    const catMap = new Map<string, { en: string; mr: string }>();
    list.forEach((r) => {
      if (!catMap.has(r.category)) {
        catMap.set(r.category, { en: r.category, mr: r.categoryMr });
      }
    });
    return Array.from(catMap.entries()).map(([key, val]) => ({
      id: key,
      labelEn: val.en,
      labelMr: val.mr,
    }));
  }, [selectedLanguage]);

  // Filtered rules
  const filteredRules = useMemo(() => {
    return GRAMMAR_RULES.filter((rule) => {
      if (selectedLanguage !== 'all' && rule.language !== selectedLanguage) {
        return false;
      }
      if (selectedCategory !== 'all' && rule.category !== selectedCategory) {
        return false;
      }
      if (showSavedOnly && !savedRuleIds.includes(rule.id)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle =
          rule.title.toLowerCase().includes(q) || rule.titleMr.toLowerCase().includes(q);
        const inFormula =
          (rule.formula && rule.formula.toLowerCase().includes(q)) ||
          (rule.formulaMr && rule.formulaMr.toLowerCase().includes(q));
        const inDef =
          rule.definition.toLowerCase().includes(q) || rule.definitionMr.toLowerCase().includes(q);
        const inTip =
          rule.examTip.toLowerCase().includes(q) || rule.examTipMr.toLowerCase().includes(q);
        const inTags = rule.tags.some((t) => t.toLowerCase().includes(q));
        return inTitle || inFormula || inDef || inTip || inTags;
      }
      return true;
    });
  }, [selectedLanguage, selectedCategory, showSavedOnly, savedRuleIds, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedRuleIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyRuleFormula = (rule: GrammarRule) => {
    const textToCopy = `${rule.titleMr} (${rule.title})\nसूत्र: ${rule.formulaMr || rule.formula}\nक्लृप्ती: ${rule.examTipMr || rule.examTip}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(rule.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold tracking-wide border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              MPSC राज्यसेवा व संयुक्त गट-ब/क विशेष
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              मराठी व इंग्रजी व्याकरण नियम कोश
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              MPSC अभ्यासक्रमानुसार अचूक सूत्रे, नियम, बरोबर vs चूक उदाहरणे, अपवाद आणि परीक्षेत
              वेळ वाचवणाऱ्या शॉर्टकट क्लृप्त्या (Grammar Rules & Exam Tricks).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setViewMode(viewMode === 'cards' ? 'cheatsheet' : 'cards')}
              className={`px-4 py-2.5 rounded-xl font-medium text-xs md:text-sm flex items-center gap-2 transition-all shadow-md ${
                viewMode === 'cheatsheet'
                  ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 font-semibold'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
              }`}
            >
              <Zap className="w-4 h-4" />
              {viewMode === 'cheatsheet' ? 'तपशीलवार कार्डे पहा' : 'शॉर्टकट सूत्रे (Cheat Sheet)'}
            </button>

            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`px-4 py-2.5 rounded-xl font-medium text-xs md:text-sm flex items-center gap-2 transition-all ${
                showSavedOnly
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${showSavedOnly ? 'fill-current' : ''}`} />
              जतन केलेले ({savedRuleIds.length})
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
            <span className="text-slate-400 block">एकूण नियम:</span>
            <span className="font-bold text-base text-white">{GRAMMAR_RULES.length} मुख्य सूत्रे</span>
          </div>
          <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
            <span className="text-slate-400 block">मराठी व्याकरण:</span>
            <span className="font-bold text-base text-amber-300">
              {GRAMMAR_RULES.filter((r) => r.language === 'marathi').length} नियम
            </span>
          </div>
          <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
            <span className="text-slate-400 block">English Grammar:</span>
            <span className="font-bold text-base text-sky-300">
              {GRAMMAR_RULES.filter((r) => r.language === 'english').length} Rules
            </span>
          </div>
          <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
            <span className="text-slate-400 block">सराव प्रश्न:</span>
            <span className="font-bold text-base text-emerald-300">नियमनिहाय MCQs उपलब्ध</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        {/* Language Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => {
                setSelectedLanguage('all');
                setSelectedCategory('all');
              }}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                selectedLanguage === 'all'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              सर्व नियम (All)
            </button>
            <button
              onClick={() => {
                setSelectedLanguage('marathi');
                setSelectedCategory('all');
              }}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 ${
                selectedLanguage === 'marathi'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <span>🚩</span> मराठी व्याकरण
            </button>
            <button
              onClick={() => {
                setSelectedLanguage('english');
                setSelectedCategory('all');
              }}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 ${
                selectedLanguage === 'english'
                  ? 'bg-sky-600 text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <span>🇬🇧</span> English Grammar
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="नियम, सूत्र, क्लृप्ती किंवा शब्द शोधा (उदा. प्रयोग, either, neither, संधी)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs md:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          <span className="text-slate-400 font-medium whitespace-nowrap mr-1">घटक:</span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-medium ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            सर्व घटक ({filteredRules.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-medium ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat.labelMr || cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Rules Count & State */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400">
        <div>
          दाखवत आहे:{' '}
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {filteredRules.length} नियम
          </span>{' '}
          {selectedCategory !== 'all' && `(${selectedCategory})`}
        </div>
        {searchQuery && (
          <div>
            शोध परिणाम:{' '}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">"{searchQuery}"</span>
          </div>
        )}
      </div>

      {/* CHEAT SHEET MODE */}
      {viewMode === 'cheatsheet' ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                परीक्षेसाठी द्रुत उजळणी सूत्रे (1-Liner Formula Quick Sheet)
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              शेवटच्या क्षणी ५ मिनिटात उजळणी करण्यासाठी
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredRules.map((rule, idx) => (
              <div
                key={`${rule.id}-${idx}`}
                className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        rule.language === 'marathi'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                          : 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300'
                      }`}
                    >
                      {rule.language === 'marathi' ? 'मराठी' : 'English'}
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {rule.categoryMr || rule.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {rule.titleMr} <span className="text-slate-400 font-normal">({rule.title})</span>
                  </h3>
                  <div className="p-2 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-lg text-xs font-mono text-indigo-900 dark:text-indigo-200 border border-indigo-100 dark:border-indigo-900/50">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 mr-2">सूत्र:</span>
                    {rule.formulaMr || rule.formula}
                  </div>
                </div>

                <div className="md:w-72 bg-amber-50 dark:bg-amber-950/20 p-3 rounded-xl border border-amber-200 dark:border-amber-900/40 text-xs">
                  <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    MPSC क्लृप्ती / ट्रिक
                  </div>
                  <p className="text-amber-950 dark:text-amber-200/90 line-clamp-3">
                    {rule.examTipMr || rule.examTip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* CARD VIEW MODE */
        <div className="space-y-6">
          {filteredRules.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
              <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                कोणतेही नियम आढळले नाहीत
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                कृपया वेगळा शब्द शोधून पहा किंवा फिल्टर बदला.
              </p>
              <button
                onClick={() => {
                  setSelectedLanguage('all');
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setShowSavedOnly(false);
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-medium"
              >
                सर्व नियम पूर्ववत करा
              </button>
            </div>
          ) : (
            filteredRules.map((rule, idx) => {
              const isExpanded = expandedRuleIds[rule.id] ?? true;
              const isSaved = savedRuleIds.includes(rule.id);

              return (
                <div
                  key={`${rule.id}-${idx}`}
                  id={rule.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="p-5 md:p-6 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-xs uppercase font-bold px-2.5 py-0.5 rounded-full ${
                              rule.language === 'marathi'
                                ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300/40'
                                : 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border border-sky-300/40'
                            }`}
                          >
                            {rule.language === 'marathi' ? '🚩 मराठी व्याकरण' : '🇬🇧 English Grammar'}
                          </span>
                          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {rule.categoryMr || rule.category}
                          </span>
                          {rule.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] text-slate-400 hidden sm:inline"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
                          {rule.titleMr}
                        </h2>
                        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">
                          {rule.title}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => copyRuleFormula(rule)}
                          title="सूत्र कॉपी करा"
                          className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          {copiedId === rule.id ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        {onToggleBookmark && (
                          <button
                            onClick={() => onToggleBookmark(rule.id)}
                            title={isSaved ? 'सेव्हमधून काढा' : 'नियम सेव्ह करा'}
                            className={`p-2 rounded-xl transition-colors ${
                              isSaved
                                ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/30'
                                : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                          </button>
                        )}
                        <button
                          onClick={() => toggleExpand(rule.id)}
                          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium"
                        >
                          {isExpanded ? 'संक्षिप्त करा' : 'तपशील पहा'}
                        </button>
                      </div>
                    </div>

                    {/* Formula Highlight Box */}
                    {(rule.formulaMr || rule.formula) && (
                      <div className="mt-4 p-3.5 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900/60 flex items-start gap-3">
                        <div className="p-1.5 bg-indigo-600 text-white rounded-lg shrink-0 mt-0.5 shadow-sm">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 flex-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                            MPSC मुख्य सूत्र (Formula / Structure)
                          </span>
                          <p className="text-xs md:text-sm font-semibold font-mono text-indigo-950 dark:text-indigo-100 leading-relaxed">
                            {rule.formulaMr || rule.formula}
                          </p>
                          {rule.formulaMr && rule.formula && rule.formulaMr !== rule.formula && (
                            <p className="text-xs text-slate-600 dark:text-slate-300 font-mono">
                              {rule.formula}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Expandable Body */}
                  {isExpanded && (
                    <div className="p-5 md:p-6 space-y-6">
                      {/* Definition */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          व्याख्या व मूलभूत अर्थ (Definition)
                        </h4>
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 text-xs md:text-sm space-y-1.5 leading-relaxed">
                          <p className="font-medium text-slate-800 dark:text-slate-200">
                            {rule.definitionMr}
                          </p>
                          <p className="text-slate-500 dark:text-slate-400 text-xs">
                            {rule.definition}
                          </p>
                        </div>
                      </div>

                      {/* Key Points */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          महत्त्वाचे नियम व घटक (Core Rules & Points)
                        </h4>
                        <ul className="space-y-2 text-xs md:text-sm">
                          {(rule.keyPointsMr && rule.keyPointsMr.length > 0
                            ? rule.keyPointsMr
                            : rule.keyPoints
                          ).map((pt, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0 mt-2" />
                              <span className="leading-relaxed">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Examples (Right vs Wrong) */}
                      {rule.examples && rule.examples.length > 0 && (
                        <div className="space-y-2.5">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            उदाहरणे व पडताळणी (Right vs Wrong Examples)
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {rule.examples.map((ex, idx) => (
                              <div
                                key={idx}
                                className={`p-3.5 rounded-xl border flex flex-col justify-between text-xs space-y-2 ${
                                  ex.isCorrect === false
                                    ? 'bg-rose-50/70 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40 text-rose-950 dark:text-rose-200'
                                    : 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 text-emerald-950 dark:text-emerald-200'
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  {ex.isCorrect === false ? (
                                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                                  ) : (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                  )}
                                  <div className="space-y-1">
                                    <p className="font-bold text-xs md:text-sm">{ex.sentence}</p>
                                    <p className="text-[11px] leading-relaxed opacity-90">
                                      {ex.explanationMr || ex.explanation}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Exceptions / Traps */}
                      {((rule.exceptionsMr && rule.exceptionsMr.length > 0) ||
                        (rule.exceptions && rule.exceptions.length > 0)) && (
                        <div className="p-3.5 bg-amber-50/80 dark:bg-amber-950/30 rounded-xl border border-amber-200/80 dark:border-amber-900/50 space-y-1.5 text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-300">
                            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            MPSC मधील महत्त्वाचे अपवाद (Critical Exceptions & Traps)
                          </div>
                          <ul className="space-y-1 pl-5 list-disc text-amber-950 dark:text-amber-200">
                            {(rule.exceptionsMr && rule.exceptionsMr.length > 0
                              ? rule.exceptionsMr
                              : rule.exceptions || []
                            ).map((exc, i) => (
                              <li key={i} className="leading-relaxed">
                                {exc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Golden Exam Tip / Shortcut */}
                      <div className="p-4 bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/10 rounded-xl border border-amber-300 dark:border-amber-700/60 flex items-start gap-3">
                        <div className="p-2 bg-amber-500 text-slate-950 rounded-lg shrink-0 mt-0.5 shadow-sm">
                          <Lightbulb className="w-4 h-4" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                            परीक्षेसाठी सुवर्ण क्लृप्ती (MPSC Shortcut Trick)
                          </span>
                          <p className="text-xs md:text-sm font-semibold text-slate-900 dark:text-slate-100 whitespace-pre-line leading-relaxed">
                            {rule.examTipMr || rule.examTip}
                          </p>
                        </div>
                      </div>

                      {/* Footer Practice Button */}
                      {onStartPracticeWithQuestions && (
                        <div className="flex items-center justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
                          <button
                            onClick={() =>
                              onStartPracticeWithQuestions(
                                rule.practiceQuestionIds || [],
                                `${rule.titleMr} - सराव प्रश्न`
                              )
                            }
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            या नियमावर आधारित MCQs सोडवा
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
