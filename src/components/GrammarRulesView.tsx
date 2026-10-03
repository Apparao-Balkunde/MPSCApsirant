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
  Copy,
  Check,
  Zap,
  Layers,
  ArrowRight,
  Menu,
  X,
  Filter,
  ShieldCheck,
  Tag,
  Clock,
  Hash,
  Scale,
  Compass,
} from 'lucide-react';
import { GrammarRule } from '../types';
import { GRAMMAR_RULES } from '../data/grammarRules';
import {
  STRUCTURED_ENGLISH_GRAMMAR_RULES,
  ENGLISH_TENSES_RULES,
  ENGLISH_ARTICLES_RULES,
  ENGLISH_SUBJECT_VERB_AGREEMENT_RULES,
} from '../data/English Grammar/grammarRules';
import {
  EnglishGrammarRepository,
  ENGLISH_STUDY_MODULES,
} from './EnglishGrammarRepository';

export interface GrammarRulesViewProps {
  onStartPracticeWithQuestions?: (questionIds: string[], title: string) => void;
  savedRuleIds?: string[];
  onToggleBookmark?: (ruleId: string) => void;
  initialLanguage?: 'all' | 'marathi' | 'english';
  initialModuleId?: string;
}

export type SidebarNavModule =
  | 'all'
  | 'tenses'
  | 'articles'
  | 'subject_verb_agreement'
  | 'marathi'
  | 'saved'
  | 'all_english_modules';

export const GrammarRulesView: React.FC<GrammarRulesViewProps> = ({
  onStartPracticeWithQuestions,
  savedRuleIds = [],
  onToggleBookmark,
  initialLanguage = 'all',
  initialModuleId = 'all',
}) => {
  // Navigation & filter states
  const [activeSidebarNav, setActiveSidebarNav] = useState<SidebarNavModule>(
    initialLanguage === 'english' && initialModuleId === 'tenses_and_clauses'
      ? 'tenses'
      : initialLanguage === 'english' && initialModuleId === 'articles_and_determiners'
      ? 'articles'
      : initialLanguage === 'english' && initialModuleId === 'subject_verb_agreement'
      ? 'subject_verb_agreement'
      : initialLanguage === 'marathi'
      ? 'marathi'
      : 'all'
  );
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlySearchableTag, setOnlySearchableTag] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'cards' | 'cheatsheet'>('cards');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Master rule pool: Combine built-in rules with structured rules from English Grammar folder
  const masterRulesPool = useMemo(() => {
    const map = new Map<string, GrammarRule>();
    // Add existing rules
    GRAMMAR_RULES.forEach((rule) => {
      // Ensure 'searchable' tag and bookmarkable status
      const updatedRule: GrammarRule = {
        ...rule,
        tags: rule.tags.includes('searchable') ? rule.tags : [...rule.tags, 'searchable'],
        bookmarkable: true,
        isBookmarkable: true,
      };
      map.set(updatedRule.id, updatedRule);
    });

    // Merge structured rules from the new English Grammar folder
    STRUCTURED_ENGLISH_GRAMMAR_RULES.forEach((rule) => {
      map.set(rule.id, rule);
    });

    return Array.from(map.values());
  }, []);

  // Compute counts for sidebar badges
  const stats = useMemo(() => {
    return {
      all: masterRulesPool.length,
      tenses: masterRulesPool.filter(
        (r) =>
          r.category.toLowerCase().includes('tense') ||
          r.title.toLowerCase().includes('tense') ||
          r.tags.some((t) => t.toLowerCase().includes('tense'))
      ).length,
      articles: masterRulesPool.filter(
        (r) =>
          r.category.toLowerCase().includes('article') ||
          r.title.toLowerCase().includes('article') ||
          r.tags.some((t) => t.toLowerCase().includes('article') || t.toLowerCase().includes('determiner'))
      ).length,
      sva: masterRulesPool.filter(
        (r) =>
          r.category.toLowerCase().includes('subject-verb') ||
          r.title.toLowerCase().includes('subject-verb') ||
          r.title.toLowerCase().includes('concord') ||
          r.tags.some((t) => t.toLowerCase().includes('subject-verb') || t.toLowerCase().includes('concord'))
      ).length,
      marathi: masterRulesPool.filter((r) => r.language === 'marathi').length,
      saved: savedRuleIds.length,
    };
  }, [masterRulesPool, savedRuleIds]);

  // Dynamically filtered rules based on active sidebar module and search
  const filteredRules = useMemo(() => {
    return masterRulesPool.filter((rule) => {
      // Module filtering
      if (activeSidebarNav === 'tenses') {
        const isTense =
          rule.category.toLowerCase().includes('tense') ||
          rule.title.toLowerCase().includes('tense') ||
          rule.tags.some((t) => t.toLowerCase().includes('tense'));
        if (!isTense) return false;
      } else if (activeSidebarNav === 'articles') {
        const isArticle =
          rule.category.toLowerCase().includes('article') ||
          rule.title.toLowerCase().includes('article') ||
          rule.tags.some((t) => t.toLowerCase().includes('article') || t.toLowerCase().includes('determiner'));
        if (!isArticle) return false;
      } else if (activeSidebarNav === 'subject_verb_agreement') {
        const isSVA =
          rule.category.toLowerCase().includes('subject-verb') ||
          rule.title.toLowerCase().includes('subject-verb') ||
          rule.title.toLowerCase().includes('concord') ||
          rule.tags.some((t) => t.toLowerCase().includes('subject-verb') || t.toLowerCase().includes('concord'));
        if (!isSVA) return false;
      } else if (activeSidebarNav === 'marathi') {
        if (rule.language !== 'marathi') return false;
      } else if (activeSidebarNav === 'saved') {
        if (!savedRuleIds.includes(rule.id)) return false;
      }

      // Searchable tag filter
      if (onlySearchableTag && !rule.tags.includes('searchable')) {
        return false;
      }

      // Search query filtering
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
          (rule.examTip && rule.examTip.toLowerCase().includes(q)) ||
          (rule.examTipMr && rule.examTipMr.toLowerCase().includes(q));
        const inTags = rule.tags.some((t) => t.toLowerCase().includes(q));
        const inExamples =
          rule.examples &&
          rule.examples.some(
            (ex) =>
              ex.sentence.toLowerCase().includes(q) ||
              ex.explanation.toLowerCase().includes(q) ||
              (ex.explanationMr && ex.explanationMr.toLowerCase().includes(q))
          );
        return inTitle || inFormula || inDef || inTip || inTags || inExamples;
      }

      return true;
    });
  }, [masterRulesPool, activeSidebarNav, savedRuleIds, onlySearchableTag, searchQuery]);

  const copyRuleFormula = (rule: GrammarRule) => {
    const textToCopy = `[MPSC Grammar Rule] ${rule.titleMr} (${rule.title})\n\n📐 FORMULA:\n${rule.formula || rule.formulaMr}\n\n⚡ EXAM TRAP:\n${rule.examTipMr || rule.examTip}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(rule.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Launch test for current filtered rules
  const handleLaunchPracticeTest = () => {
    if (!onStartPracticeWithQuestions) return;
    const allQuestionIds: string[] = [];
    filteredRules.forEach((r) => {
      if (r.practiceQuestionIds && r.practiceQuestionIds.length > 0) {
        r.practiceQuestionIds.forEach((qid) => {
          if (!allQuestionIds.includes(qid)) {
            allQuestionIds.push(qid);
          }
        });
      }
    });

    if (allQuestionIds.length === 0) {
      allQuestionIds.push('gq_en_01', 'gq_en_02', 'gq_en_03');
    }

    const titles: Record<SidebarNavModule, string> = {
      all: 'सर्व व्याकरण नियम सराव परीक्षा',
      tenses: 'Tenses & Sequences (काळ विचार) Test',
      articles: 'Articles & Determiners (उपपदे) Test',
      subject_verb_agreement: 'Subject-Verb Agreement (Concord) Test',
      marathi: 'मराठी व्याकरण सराव परीक्षा',
      saved: 'बुकमार्क केलेले नियम सराव परीक्षा',
      all_english_modules: 'English Grammar Modules Test',
    };

    onStartPracticeWithQuestions(allQuestionIds, titles[activeSidebarNav] || 'Grammar Test');
  };

  return (
    <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-6 pb-36 animate-fadeIn">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-950 p-6 md:p-8 text-white border border-indigo-500/30 shadow-2xl">
        <div className="absolute -right-12 -top-12 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-400/20 text-sky-300 text-xs font-bold tracking-wide border border-sky-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                MPSC Grammar Knowledge Base
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-400/15 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                Searchable & Bookmarkable Status
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span>📚</span>
              मराठी व इंग्रजी व्याकरण नियम ज्ञानकोश
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              MPSC राज्यसेवा व संयुक्त गट-ब/क साठी <strong className="text-sky-300">Tenses, Articles, Subject-Verb Agreement</strong> आणि इतर सर्व क्लिष्ट व्याकरण घटकांची सूत्रे, परीक्षा क्लृप्त्या व सराव प्रश्न!
            </p>
          </div>

          {/* Actions on Top Banner */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center">
            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden px-3.5 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white flex items-center gap-1.5 shadow-md"
            >
              <Menu className="w-4 h-4" />
              मॉड्यूल्स मेनू
            </button>

            <button
              onClick={() => setViewMode(viewMode === 'cards' ? 'cheatsheet' : 'cards')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                viewMode === 'cheatsheet'
                  ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              {viewMode === 'cheatsheet' ? 'तपशीलवार कार्डे' : 'रॅपिड रिव्हिजन मॅट्रिक्स'}
            </button>

            <button
              onClick={handleLaunchPracticeTest}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:brightness-110 shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              सराव टेस्ट सोडवा ({filteredRules.length})
            </button>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT: SIDEBAR + CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* DESKTOP NAVIGATION SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-20 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            {/* Sidebar Title */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-sky-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  अभ्यास मॉड्यूल्स (Modules)
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {masterRulesPool.length} सूत्रे
              </span>
            </div>

            {/* Sidebar Module Navigation Links */}
            <nav className="space-y-1.5 text-xs font-semibold">
              <button
                onClick={() => {
                  setActiveSidebarNav('all');
                  setSearchQuery('');
                }}
                className={`w-full p-2.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                  activeSidebarNav === 'all'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>सर्व नियम (All Rules)</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeSidebarNav === 'all'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {stats.all}
                </span>
              </button>

              {/* TENSES MODULE */}
              <button
                onClick={() => {
                  setActiveSidebarNav('tenses');
                  setSearchQuery('');
                }}
                className={`w-full p-2.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                  activeSidebarNav === 'tenses'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <div className="text-left">
                    <div>Tenses & Sequences</div>
                    <div className="text-[10px] opacity-80 font-normal">काळ विचार व सूत्रे</div>
                  </div>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeSidebarNav === 'tenses'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {stats.tenses}
                </span>
              </button>

              {/* ARTICLES MODULE */}
              <button
                onClick={() => {
                  setActiveSidebarNav('articles');
                  setSearchQuery('');
                }}
                className={`w-full p-2.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                  activeSidebarNav === 'articles'
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-sky-400" />
                  <div className="text-left">
                    <div>Articles & Determiners</div>
                    <div className="text-[10px] opacity-80 font-normal">A, An, The & Omission</div>
                  </div>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeSidebarNav === 'articles'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {stats.articles}
                </span>
              </button>

              {/* SUBJECT-VERB AGREEMENT MODULE */}
              <button
                onClick={() => {
                  setActiveSidebarNav('subject_verb_agreement');
                  setSearchQuery('');
                }}
                className={`w-full p-2.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                  activeSidebarNav === 'subject_verb_agreement'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-500" />
                  <div className="text-left">
                    <div>Subject-Verb Concord</div>
                    <div className="text-[10px] opacity-80 font-normal">कर्ता-क्रियापद सुसंगती</div>
                  </div>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeSidebarNav === 'subject_verb_agreement'
                      ? 'bg-slate-950 text-amber-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {stats.sva}
                </span>
              </button>

              {/* MARATHI GRAMMAR */}
              <button
                onClick={() => {
                  setActiveSidebarNav('marathi');
                  setSearchQuery('');
                }}
                className={`w-full p-2.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                  activeSidebarNav === 'marathi'
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>🚩</span>
                  <div className="text-left">
                    <div>मराठी व्याकरण</div>
                    <div className="text-[10px] opacity-80 font-normal">संधी, समास, प्रयोग</div>
                  </div>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeSidebarNav === 'marathi'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {stats.marathi}
                </span>
              </button>

              {/* BOOKMARKED RULES */}
              <button
                onClick={() => {
                  setActiveSidebarNav('saved');
                  setSearchQuery('');
                }}
                className={`w-full p-2.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                  activeSidebarNav === 'saved'
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 fill-current text-amber-500" />
                  <span>जतन केलेले नियम (Saved)</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeSidebarNav === 'saved'
                      ? 'bg-slate-950 text-amber-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {stats.saved}
                </span>
              </button>
            </nav>

            {/* Quick Status Filters */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-slate-500 dark:text-slate-400 block uppercase text-[10px]">
                स्थिती फिल्टर्स (Rule Status)
              </span>

              <button
                onClick={() => setOnlySearchableTag(!onlySearchableTag)}
                className={`w-full p-2 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  onlySearchableTag
                    ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-400 text-sky-800 dark:text-sky-300 font-bold'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-sky-500" />
                  <span>'Searchable' टॅग असणारे</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-200/50 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300 font-bold">
                  {masterRulesPool.filter((r) => r.tags.includes('searchable')).length}
                </span>
              </button>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                  <span>Bookmarkable Status</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  सक्रिय (Active)
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* MOBILE SLIDE-OUT SIDEBAR DRAWER */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
            />

            {/* Slide-out Menu */}
            <div className="relative w-72 max-w-full bg-white dark:bg-slate-900 p-6 z-10 flex flex-col justify-between shadow-2xl h-full overflow-y-auto">
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-sky-500" />
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      व्याकरण मॉड्यूल्स
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-2 text-xs font-semibold">
                  <button
                    onClick={() => {
                      setActiveSidebarNav('all');
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                      activeSidebarNav === 'all'
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>सर्व नियम (All Rules)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/20">
                      {stats.all}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSidebarNav('tenses');
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                      activeSidebarNav === 'tenses'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>⏳ Tenses (काळ विचार)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/20">
                      {stats.tenses}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSidebarNav('articles');
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                      activeSidebarNav === 'articles'
                        ? 'bg-sky-600 text-white font-bold'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>🏷️ Articles (उपपदे)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/20">
                      {stats.articles}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSidebarNav('subject_verb_agreement');
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                      activeSidebarNav === 'subject_verb_agreement'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>⚖️ Subject-Verb Concord</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/20">
                      {stats.sva}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSidebarNav('marathi');
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                      activeSidebarNav === 'marathi'
                        ? 'bg-orange-600 text-white font-bold'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>🚩 मराठी व्याकरण</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/20">
                      {stats.marathi}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSidebarNav('saved');
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                      activeSidebarNav === 'saved'
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>🔖 जतन केलेले नियम</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/20">
                      {stats.saved}
                    </span>
                  </button>
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold"
                >
                  मेनू बंद करा
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <main className="lg:col-span-3 space-y-4">
          {/* SEARCH AND MODULE BANNER BAR */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Dynamic Module Header Tag */}
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  {activeSidebarNav === 'tenses'
                    ? '⏳'
                    : activeSidebarNav === 'articles'
                    ? '🏷️'
                    : activeSidebarNav === 'subject_verb_agreement'
                    ? '⚖️'
                    : activeSidebarNav === 'marathi'
                    ? '🚩'
                    : activeSidebarNav === 'saved'
                    ? '🔖'
                    : '📚'}
                </span>
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
                    {activeSidebarNav === 'tenses'
                      ? 'Tenses & Sequence of Tenses'
                      : activeSidebarNav === 'articles'
                      ? 'Articles & Determiners'
                      : activeSidebarNav === 'subject_verb_agreement'
                      ? 'Subject-Verb Agreement (Concord)'
                      : activeSidebarNav === 'marathi'
                      ? 'मराठी व्याकरण नियम'
                      : activeSidebarNav === 'saved'
                      ? 'जतन केलेले नियम (Saved Rules)'
                      : 'सर्व व्याकरण ज्ञानकोश (All Rules)'}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activeSidebarNav === 'tenses'
                      ? 'काळ विचार, Stative Verbs, Since/For आणि Past Perfect नियम'
                      : activeSidebarNav === 'articles'
                      ? 'A, An, The चा उच्चारानुसार वापर आणि Omission of The'
                      : activeSidebarNav === 'subject_verb_agreement'
                      ? 'Neither... nor, As well as, Each/Every आणि एकवचन/अनेकवचन'
                      : activeSidebarNav === 'marathi'
                      ? 'संधी, समास, प्रयोग आणि मराठी भाषेतील सुवर्ण नियम'
                      : 'सर्व नियम Searchable व Bookmarkable स्थितीत उपलब्ध'}
                  </p>
                </div>
              </div>

              {/* Search Bar Input */}
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search rules, formulas, traps (उदा. either, had died, university)..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Quick Status Tags & Results Count */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400">
                  दाखवत आहे:{' '}
                  <strong className="text-slate-800 dark:text-slate-100">
                    {filteredRules.length}
                  </strong>{' '}
                  नियम
                </span>
                {searchQuery && (
                  <span className="text-sky-600 dark:text-sky-400 font-semibold">
                    ("{searchQuery}" साठी)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  All Rules Searchable
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  <Bookmark className="w-3 h-3" />
                  Bookmarkable
                </span>
              </div>
            </div>
          </div>

          {/* DYNAMIC RULES CONTAINER */}
          {filteredRules.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-2xl">
                🔍
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  कोणतेही नियम आढळले नाहीत
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  शोध शब्द किंवा निवडलेले मॉड्यूल तपासून पहा.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveSidebarNav('all');
                  setOnlySearchableTag(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-600 text-white hover:bg-sky-500 transition-all shadow-sm"
              >
                सर्व नियम पहा (View All)
              </button>
            </div>
          ) : viewMode === 'cheatsheet' ? (
            /* CHEATSHEET TABLE MODE */
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    द्रुत उजळणी सूत्रे (Cheat-Sheet Matrix)
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400">परीक्षेच्या आधी ५ मिनिटांत रिव्हिजन</span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredRules.map((rule, idx) => {
                  const isSaved = savedRuleIds.includes(rule.id);
                  return (
                    <div
                      key={rule.id}
                      className="p-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300">
                            {rule.category}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                            Searchable
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {rule.titleMr} <span className="text-slate-400 font-normal">({rule.title})</span>
                        </h4>
                        <div className="p-2 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-lg text-xs font-mono text-indigo-900 dark:text-indigo-200 border border-indigo-100 dark:border-indigo-900/50">
                          <span className="font-bold text-indigo-600 dark:text-indigo-400 mr-2">सूत्र:</span>
                          {rule.formulaMr || rule.formula}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                        <button
                          onClick={() => copyRuleFormula(rule)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 flex items-center gap-1 transition-all"
                        >
                          {copiedId === rule.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedId === rule.id ? 'कॉपी झाले' : 'कॉपी'}</span>
                        </button>

                        {onToggleBookmark && (
                          <button
                            onClick={() => onToggleBookmark(rule.id)}
                            className={`p-2 rounded-lg transition-all ${
                              isSaved
                                ? 'bg-amber-500/20 text-amber-500'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600'
                            }`}
                            title={isSaved ? 'बुकमार्क काढले' : 'जतन करा'}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* DETAILED STUDY CARDS MODE */
            <div className="space-y-6">
              {filteredRules.map((rule, idx) => {
                const isSaved = savedRuleIds.includes(rule.id);

                return (
                  <div
                    key={rule.id}
                    className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    {/* Card Header */}
                    <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-50/90 via-white to-slate-50/90 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800">
                            नियम #{idx + 1}
                          </span>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {rule.category}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                            <Search className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            Searchable
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
                            <Bookmark className="w-3 h-3 fill-current text-amber-500" />
                            Bookmarkable
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight pt-0.5">
                          {rule.title}
                        </h3>

                        <h4 className="text-xs sm:text-sm font-bold text-sky-600 dark:text-sky-400">
                          {rule.titleMr}
                        </h4>
                      </div>

                      {/* Header Actions: Clean, Polished Action Buttons (NO "कमी करा ▴") */}
                      <div className="flex items-center gap-2 self-start shrink-0">
                        <button
                          onClick={() => copyRuleFormula(rule)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                            copiedId === rule.id
                              ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                          }`}
                          title="सुवर्ण सूत्र व क्लृप्ती कॉपी करा"
                        >
                          {copiedId === rule.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span>कॉपी झाले!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                              <span>सूत्र कॉपी</span>
                            </>
                          )}
                        </button>

                        {onToggleBookmark && (
                          <button
                            onClick={() => onToggleBookmark(rule.id)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                              isSaved
                                ? 'bg-amber-400 text-slate-950 font-extrabold border border-amber-300 shadow-amber-400/20'
                                : 'bg-slate-100 hover:bg-amber-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                            }`}
                            title={isSaved ? 'बुकमार्क काढले' : 'जतन करा'}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-slate-950' : 'text-amber-500'}`} />
                            <span>{isSaved ? 'जतन केले' : 'जतन करा'}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Formula Box (Golden Centerpiece) */}
                    <div className="px-5 sm:px-6 py-4">
                      <div className="p-4 sm:p-5 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-2xl border border-indigo-500/40 shadow-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 fill-amber-300/30 text-amber-400" />
                            सुवर्ण सूत्र (GOLDEN FORMULA)
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                            MPSC शॉर्टकट
                          </span>
                        </div>
                        <p className="font-mono text-sm sm:text-base font-bold text-sky-200 whitespace-pre-line leading-relaxed tracking-wide bg-black/35 p-3.5 rounded-xl border border-white/10">
                          {rule.formula || rule.formulaMr}
                        </p>
                      </div>
                    </div>

                    {/* Deep Study Content: Always Visible and Pristine */}
                    <div className="px-5 sm:px-6 pb-6 space-y-5 pt-1 border-t border-slate-100 dark:border-slate-800">
                      {/* Principle and Marathi explanation */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50/90 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-xs uppercase tracking-wide">
                            <BookOpen className="w-4 h-4 text-sky-500" />
                            Grammatical Principle
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                            {rule.definition}
                          </p>
                        </div>
                        <div className="p-4 bg-amber-50/40 dark:bg-slate-800/60 rounded-2xl border border-amber-200/60 dark:border-slate-800 space-y-2">
                          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-xs uppercase tracking-wide">
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            मराठीत सविस्तर नियम
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                            {rule.definitionMr}
                          </p>
                        </div>
                      </div>

                      {/* Key Points */}
                      {((rule.keyPoints && rule.keyPoints.length > 0) ||
                        (rule.keyPointsMr && rule.keyPointsMr.length > 0)) && (
                        <div className="space-y-2 text-xs sm:text-sm">
                          <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            महत्त्वाचे नियम व मुद्दे (Key Points):
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {rule.keyPoints &&
                              rule.keyPoints.map((pt, pIdx) => (
                                <div
                                  key={pIdx}
                                  className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-500/20 text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2"
                                >
                                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                                  <span>{pt}</span>
                                </div>
                              ))}
                            {rule.keyPointsMr &&
                              rule.keyPointsMr.map((pt, pIdx) => (
                                <div
                                  key={`mr-${pIdx}`}
                                  className="p-3 rounded-xl bg-sky-50/60 dark:bg-sky-950/20 border border-sky-500/20 text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2"
                                >
                                  <span className="text-sky-500 font-bold shrink-0">👉</span>
                                  <span>{pt}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Examples: Spot The Error */}
                      {rule.examples && rule.examples.length > 0 && (
                        <div className="space-y-2.5">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block uppercase tracking-wide">
                            परीक्षेतील उदाहरणे (Spot The Error / Examples):
                          </span>
                          <div className="space-y-2.5">
                            {rule.examples.map((ex, exIdx) => (
                              <div
                                key={exIdx}
                                className={`p-3.5 rounded-2xl border text-xs sm:text-sm ${
                                  ex.isCorrect
                                    ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/50'
                                    : 'bg-rose-50/70 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/50'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <span className="mt-0.5">
                                    {ex.isCorrect ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                    ) : (
                                      <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                                    )}
                                  </span>
                                  <div className="space-y-1.5 flex-1">
                                    <p className="font-bold text-slate-900 dark:text-slate-100">
                                      {ex.sentence}
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                                      {ex.explanation}
                                    </p>
                                    {ex.explanationMr && (
                                      <p className="text-sky-700 dark:text-sky-400 text-xs font-semibold">
                                        👉 {ex.explanationMr}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Exceptions */}
                      {((rule.exceptions && rule.exceptions.length > 0) ||
                        (rule.exceptionsMr && rule.exceptionsMr.length > 0)) && (
                        <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs space-y-1.5">
                          <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                            <span>महत्त्वाचे अपवाद व सूक्ष्म भेद (Exceptions & Traps):</span>
                          </div>
                          <ul className="space-y-1 pl-5 list-disc text-slate-700 dark:text-slate-300 leading-relaxed">
                            {rule.exceptions &&
                              rule.exceptions.map((exc, i) => <li key={i}>{exc}</li>)}
                            {rule.exceptionsMr &&
                              rule.exceptionsMr.map((exc, i) => (
                                <li key={`mr-${i}`} className="text-amber-900 dark:text-amber-200">
                                  {exc}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                      {/* Exam Tip Alert */}
                      {(rule.examTipMr || rule.examTip) && (
                        <div className="p-4 sm:p-5 bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 text-white rounded-2xl border border-sky-500/40 text-xs space-y-1.5 shadow-md">
                          <div className="flex items-center gap-1.5 font-bold text-amber-300 uppercase tracking-wide">
                            <Zap className="w-4 h-4 fill-amber-300" />
                            <span>MPSC २ सेकंदांची परीक्षा क्लृप्ती (Exam Trap Trick):</span>
                          </div>
                          <p className="text-slate-200 whitespace-pre-line leading-relaxed pl-5 font-medium text-xs sm:text-sm">
                            {rule.examTipMr || rule.examTip}
                          </p>
                        </div>
                      )}

                      {/* Tags and Status Footer */}
                      <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {rule.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                                tag === 'searchable'
                                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                              }`}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {onStartPracticeWithQuestions && (
                          <button
                            onClick={() =>
                              onStartPracticeWithQuestions(
                                rule.practiceQuestionIds || ['gq_en_01'],
                                `${rule.title} - सराव प्रश्न`
                              )
                            }
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer hover:shadow-indigo-500/25"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            या नियमावर आधारित MCQs सोडवा
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
