import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  CheckCircle2,
  XCircle,
  Bookmark,
  Copy,
  Check,
  Play,
  Lightbulb,
  AlertTriangle,
  Zap,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  Target,
  ArrowRight,
  ShieldCheck,
  SlidersHorizontal,
  FileDown,
} from 'lucide-react';
import { GrammarRule } from '../types';
import { GRAMMAR_RULES } from '../data/grammarRules';
import { ENGLISH_VOCAB_QUESTIONS } from '../data/englishVocabQuestions';
import { exportToPdf } from '../utils/pdfExport';

export interface EnglishGrammarRepositoryProps {
  initialModuleId?: string;
  savedRuleIds?: string[];
  onToggleBookmark?: (ruleId: string) => void;
  onStartPracticeWithQuestions?: (questionIds: string[], title: string) => void;
  onBackToOverview?: () => void;
}

export interface StudyModule {
  id: string;
  titleEn: string;
  titleMr: string;
  badge: string;
  icon: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    badgeBg: string;
  };
  descriptionEn: string;
  descriptionMr: string;
  keyTopics: string[];
  matcher: (rule: GrammarRule) => boolean;
}

export const ENGLISH_STUDY_MODULES: StudyModule[] = [
  {
    id: 'all',
    titleEn: 'All English Modules',
    titleMr: 'सर्व इंग्रजी व्याकरण नियम',
    badge: 'Comprehensive Repository',
    icon: '📚',
    colorScheme: {
      bg: 'bg-slate-900/60',
      border: 'border-slate-700/60',
      text: 'text-slate-200',
      accent: 'from-blue-600 to-indigo-600',
      badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
    },
    descriptionEn: 'The definitive repository of all civil service English grammar rules, formulas, and traps.',
    descriptionMr: 'MPSC राज्यसेवा व संयुक्त गट-ब/क साठी संपूर्ण इंग्रजी व्याकरण ज्ञानकोश.',
    keyTopics: ['Tenses', 'Articles', 'Subject-Verb Concord', 'Voice & Speech', 'Prepositions'],
    matcher: (r) => r.language === 'english',
  },
  {
    id: 'subject_verb_agreement',
    titleEn: 'Subject-Verb Agreement (Concord)',
    titleMr: 'कर्ता-क्रियापद सुसंगती व नियम (Concord)',
    badge: 'Highest Yield in MPSC',
    icon: '⚖️',
    colorScheme: {
      bg: 'bg-amber-950/40',
      border: 'border-amber-700/50',
      text: 'text-amber-200',
      accent: 'from-amber-600 to-orange-600',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    },
    descriptionEn: 'Rules governing singular vs plural verbs, proximity law, correlatives, and intervening phrases.',
    descriptionMr: 'Neither/nor, Either/or, As well as, Along with, Each/Every आणि एकवचनी/अनेकवचनी क्रियापदाचे नियम.',
    keyTopics: ['Proximity Law', 'Parenthetical Phrases', 'Each / Every', 'A number of vs The number of', 'Collective Nouns'],
    matcher: (r) =>
      r.language === 'english' &&
      (r.category.toLowerCase().includes('subject-verb') ||
        r.category.toLowerCase().includes('concord') ||
        r.title.toLowerCase().includes('subject-verb') ||
        r.title.toLowerCase().includes('concord') ||
        r.tags.some(
          (t) =>
            t.toLowerCase().includes('subject-verb') ||
            t.toLowerCase().includes('concord') ||
            t.toLowerCase().includes('subject verb')
        ) ||
        r.id.toLowerCase().includes('sva') ||
        r.id.toLowerCase().includes('concord')),
  },
  {
    id: 'tenses_and_clauses',
    titleEn: 'Tenses & Sequence of Tenses',
    titleMr: 'काळ विचार व Sequence of Tenses',
    badge: 'Core Grammar Engine',
    icon: '⏳',
    colorScheme: {
      bg: 'bg-emerald-950/40',
      border: 'border-emerald-700/50',
      text: 'text-emerald-200',
      accent: 'from-emerald-600 to-teal-600',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    },
    descriptionEn: 'Past perfect with before/after, continuous vs state verbs, since/for time anchors, and tense sequence in indirect clauses.',
    descriptionMr: 'भूतकाळ, वर्तमानकाळ, चालू व पूर्ण काळ, Since/For चे नियम व मुख्य-गौण वाक्यांमधील काळाची सुसंगती.',
    keyTopics: ['Past Perfect + Simple Past', 'State Verbs (No -ing)', 'Since vs For', 'Present Perfect Traps', 'Future in Time Clauses'],
    matcher: (r) =>
      r.language === 'english' &&
      (r.category.toLowerCase().includes('tense') ||
        r.title.toLowerCase().includes('tense') ||
        r.tags.some((t) => t.toLowerCase().includes('tense') || t.toLowerCase().includes('since') || t.toLowerCase().includes('perfect'))),
  },
  {
    id: 'articles_and_determiners',
    titleEn: 'Articles & Determiners',
    titleMr: 'उपपदे व Determiners (A, An, The & Quantifiers)',
    badge: 'Exam Trap Spotter',
    icon: '🏷️',
    colorScheme: {
      bg: 'bg-sky-950/40',
      border: 'border-sky-700/50',
      text: 'text-sky-200',
      accent: 'from-sky-600 to-cyan-600',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-400/30',
    },
    descriptionEn: 'Definite article "The" inclusion & omission traps, vowels vs sounds, and quantifiers (Few/Little/Much/Many).',
    descriptionMr: "'The' चे अचूक नियम व वर्जने (Omission), 'A/An' चा उच्चारानुसार वापर आणि Little/Few मधील सूक्ष्म भेद.",
    keyTopics: ['Omission of The (Peaks, Meals, Diseases)', 'Geographical Names', 'Vowel Sound vs Letter', 'Little vs Few', 'Each vs Every'],
    matcher: (r) =>
      r.language === 'english' &&
      (r.category.toLowerCase().includes('article') ||
        r.category.toLowerCase().includes('determiner') ||
        r.title.toLowerCase().includes('article') ||
        r.title.toLowerCase().includes('determiner') ||
        r.title.toLowerCase().includes('little') ||
        r.tags.some((t) => t.toLowerCase().includes('article') || t.toLowerCase().includes('determiner'))),
  },
  {
    id: 'prepositions_and_phrasal',
    titleEn: 'Prepositions & Phrasal Usage',
    titleMr: 'शब्दयोगी अव्यये व Phrasal Usage',
    badge: 'High Frequency MCQs',
    icon: '🎯',
    colorScheme: {
      bg: 'bg-indigo-950/40',
      border: 'border-indigo-700/50',
      text: 'text-indigo-200',
      accent: 'from-indigo-600 to-purple-600',
      badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
    },
    descriptionEn: 'Fixed prepositions (Senior to, Die of/from, Made of/from), Agent vs Instrument (By vs With), and Beside vs Besides.',
    descriptionMr: 'विशिष्ट क्रियापदांनंतर येणारी शब्दयोगी अव्यये, By विरुद्ध With आणि भौतिक/रासायनिक बदलांचे नियम.',
    keyTopics: ['By (Agent) vs With (Tool)', 'Made of vs Made from', 'Die of (disease) vs Die from', 'Senior / Prefer + TO', 'Beside vs Besides'],
    matcher: (r) =>
      r.language === 'english' &&
      (r.category.toLowerCase().includes('preposition') ||
        r.title.toLowerCase().includes('preposition') ||
        r.title.toLowerCase().includes('by vs with') ||
        r.title.toLowerCase().includes('made of') ||
        r.tags.some((t) => t.toLowerCase().includes('preposition'))),
  },
  {
    id: 'voice_and_narration',
    titleEn: 'Voice & Direct-Indirect Speech',
    titleMr: 'प्रयोग (Voice) व कथन (Direct-Indirect Speech)',
    badge: 'Transformation Classic',
    icon: '🗣️',
    colorScheme: {
      bg: 'bg-rose-950/40',
      border: 'border-rose-700/50',
      text: 'text-rose-200',
      accent: 'from-rose-600 to-pink-600',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
    },
    descriptionEn: 'Active-Passive conversions (Imperatives, Prepositional verbs, Being+V3) and Indirect Speech (Optative, Exclamatory, May➔Might).',
    descriptionMr: 'कर्तरी-कर्मणी प्रयोग बदल, आज्ञार्थी वाक्यांचा Passive, आणि May चे Might होणे व उद्गारार्थी वाक्य विधानार्थी करणे.',
    keyTopics: ['Let + Object + be + V3', 'Prepositional Verbs in Passive', 'May ➔ Might in Optative', 'Exclamatory Word Order', 'Reporting Verb Changes'],
    matcher: (r) =>
      r.language === 'english' &&
      (r.category.toLowerCase().includes('voice') ||
        r.category.toLowerCase().includes('speech') ||
        r.title.toLowerCase().includes('voice') ||
        r.title.toLowerCase().includes('indirect speech') ||
        r.title.toLowerCase().includes('narration') ||
        r.tags.some((t) => t.toLowerCase().includes('voice') || t.toLowerCase().includes('speech') || t.toLowerCase().includes('narration'))),
  },
  {
    id: 'conditionals_and_subjunctives',
    titleEn: 'Conditionals & The Subjunctive',
    titleMr: 'शर्तवाचक वाक्ये व मँडेटिव्ह सब्जेक्टिव्ह',
    badge: 'Advanced Civil Services',
    icon: '⚡',
    colorScheme: {
      bg: 'bg-purple-950/40',
      border: 'border-purple-700/50',
      text: 'text-purple-200',
      accent: 'from-purple-600 to-violet-600',
      badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
    },
    descriptionEn: 'Zero, First, Second, and Third conditionals, Inversion with "Had I known", Mandative Subjunctive (Bare V1 after demand/insist), and "As if + were".',
    descriptionMr: 'If वाक्य रचना, काल्पनिक भूतकाळ (were), Had + V3 ... would have + V3, आणि Demand/Insist नंतर क्रियापदाचे मूळ रूप.',
    keyTopics: ['Had + V3 ... Would have + V3', 'Inversion (Had I / Were I)', 'Mandative Subjunctive (Bare V1)', 'As if / As though + Were', 'Unless vs Until'],
    matcher: (r) =>
      r.language === 'english' &&
      (r.category.toLowerCase().includes('conditional') ||
        r.category.toLowerCase().includes('subjunctive') ||
        r.category.toLowerCase().includes('inversion') ||
        r.title.toLowerCase().includes('conditional') ||
        r.title.toLowerCase().includes('subjunctive') ||
        r.title.toLowerCase().includes('had i known') ||
        r.title.toLowerCase().includes('inversion') ||
        r.tags.some((t) => t.toLowerCase().includes('conditional') || t.toLowerCase().includes('subjunctive') || t.toLowerCase().includes('inversion'))),
  },
  {
    id: 'sentence_transformation_and_synthesis',
    titleEn: 'Sentence Transformation & Synthesis',
    titleMr: 'वाक्य रूपांतरण व रचना (Transformation)',
    badge: 'Descriptive & Objective',
    icon: '🔄',
    colorScheme: {
      bg: 'bg-teal-950/40',
      border: 'border-teal-700/50',
      text: 'text-teal-200',
      accent: 'from-teal-600 to-emerald-600',
      badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-400/30',
    },
    descriptionEn: 'Simple, Compound, and Complex conversions (FANBOYS vs Subordinators), Removal of "Too... to", and Degrees of Comparison (No other vs Very few).',
    descriptionMr: 'केवल, संयुक्त व मिश्र वाक्यांचे परस्पर रूपांतरण, Too चे रूपांतर आणि तुलनात्मक विशेषणांचे नियम (Degrees of Comparison).',
    keyTopics: ['Simple ➔ Compound ➔ Complex', 'FANBOYS vs Subordinating', 'Too... to ➔ So... that... not', 'No other vs Very few (Degrees)', 'No sooner... than'],
    matcher: (r) =>
      r.language === 'english' &&
      (r.category.toLowerCase().includes('transformation') ||
        r.category.toLowerCase().includes('synthesis') ||
        r.title.toLowerCase().includes('transformation') ||
        r.title.toLowerCase().includes('degrees of comparison') ||
        r.title.toLowerCase().includes('simple, compound') ||
        r.title.toLowerCase().includes('too') ||
        r.title.toLowerCase().includes('no sooner') ||
        r.tags.some((t) => t.toLowerCase().includes('transformation') || t.toLowerCase().includes('degrees'))),
  },
  {
    id: 'nouns_pronouns_morphology',
    titleEn: 'Nouns, Pronouns & Morphology',
    titleMr: 'नाम, सर्वनाम, वचन व रूपविचार (Morphology)',
    badge: 'Vocabulary & Agreement',
    icon: '🧬',
    colorScheme: {
      bg: 'bg-fuchsia-950/40',
      border: 'border-fuchsia-700/50',
      text: 'text-fuchsia-200',
      accent: 'from-fuchsia-600 to-pink-600',
      badgeBg: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/30',
    },
    descriptionEn: 'Compound nouns pluralization (Sons-in-law) vs possessive (Son-in-law\'s), foreign Greek/Latin plurals (Criteria/Phenomena), and Who vs Whom.',
    descriptionMr: 'संयुक्त नामांचे अनेकवचन विरुद्ध षष्ठी विभक्ती, विदेशी लॅटिन-ग्रीक शब्दांचे अनेकवचन, आणि Who vs Whom चा अचूक वापर.',
    keyTopics: ['Compound Noun Plurals (Passers-by)', 'Possessive Apostrophe (\'s)', 'Latin/Greek Plurals (Criteria/Crises)', 'Who vs Whom Test', 'Later vs Latter'],
    matcher: (r) =>
      r.language === 'english' &&
      (r.category.toLowerCase().includes('noun') ||
        r.category.toLowerCase().includes('pronoun') ||
        r.category.toLowerCase().includes('morphology') ||
        r.category.toLowerCase().includes('adjective') ||
        r.title.toLowerCase().includes('compound nouns') ||
        r.title.toLowerCase().includes('foreign plurals') ||
        r.title.toLowerCase().includes('who vs whom') ||
        r.title.toLowerCase().includes('later vs latter') ||
        r.tags.some((t) => t.toLowerCase().includes('noun') || t.toLowerCase().includes('plural') || t.toLowerCase().includes('pronoun'))),
  },
  {
    id: 'english_vocabulary_and_idioms',
    titleEn: 'English Vocabulary, Synonyms & Idioms',
    titleMr: 'इंग्रजी शब्दसंग्रह, समानार्थी-विरुद्धार्थी व वाक्प्रचार',
    badge: 'High Scoring (25-50 Marks)',
    icon: '📖',
    colorScheme: {
      bg: 'bg-indigo-950/40',
      border: 'border-indigo-700/50',
      text: 'text-indigo-200',
      accent: 'from-indigo-600 to-violet-600',
      badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
    },
    descriptionEn: 'High-yield synonyms, antonyms, one-word substitutions, phrasal verbs, idioms, and confusing homophones frequently tested in MPSC.',
    descriptionMr: 'MPSC परीक्षेत वारंवार विचारले जाणारे समानार्थी शब्द, विरुद्धार्थी, म्हणी-वाक्प्रचार आणि Confusing Words (उदा. Affect vs Effect, Beside vs Besides).',
    keyTopics: ['Synonyms & Antonyms', 'One-Word Substitution', 'Idioms & Phrases', 'Confusing Words (Affect vs Effect)', 'Latin & Greek Roots'],
    matcher: (r) =>
      r.language === 'english' &&
      (r.category.toLowerCase().includes('vocab') ||
        r.category.toLowerCase().includes('idiom') ||
        r.category.toLowerCase().includes('confusing') ||
        r.title.toLowerCase().includes('affect') ||
        r.title.toLowerCase().includes('beside') ||
        r.title.toLowerCase().includes('loose') ||
        r.title.toLowerCase().includes('later') ||
        r.title.toLowerCase().includes('vocabulary') ||
        r.tags.some((t) => t.toLowerCase().includes('vocab') || t.toLowerCase().includes('confusing') || t.toLowerCase().includes('idiom'))),
  },
];

export const EnglishGrammarRepository: React.FC<EnglishGrammarRepositoryProps> = ({
  initialModuleId = 'all',
  savedRuleIds = [],
  onToggleBookmark,
  onStartPracticeWithQuestions,
  onBackToOverview,
}) => {
  const [activeModuleId, setActiveModuleId] = useState<string>(initialModuleId);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);
  const [onlyHighYieldTraps, setOnlyHighYieldTraps] = useState<boolean>(false);
  const [expandedRuleIds, setExpandedRuleIds] = useState<Record<string, boolean>>({});
  const [copiedRuleId, setCopiedRuleId] = useState<string | null>(null);

  // Active module object
  const currentModule = useMemo(() => {
    return (
      ENGLISH_STUDY_MODULES.find((m) => m.id === activeModuleId) ||
      ENGLISH_STUDY_MODULES[0]
    );
  }, [activeModuleId]);

  // Compute counts for each module
  const moduleRuleCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ENGLISH_STUDY_MODULES.forEach((mod) => {
      counts[mod.id] = GRAMMAR_RULES.filter(mod.matcher).length;
    });
    return counts;
  }, []);

  // Filter rules according to module, search, saved, and trap toggle
  const filteredRules = useMemo(() => {
    return GRAMMAR_RULES.filter((rule) => {
      // Must match module
      if (!currentModule.matcher(rule)) {
        return false;
      }
      // Saved filter
      if (showSavedOnly && !savedRuleIds.includes(rule.id)) {
        return false;
      }
      // High yield traps filter
      if (onlyHighYieldTraps && (!rule.examTip || !rule.examTipMr)) {
        return false;
      }
      // Search query
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
        const inTags = rule.tags && rule.tags.some((t) => t.toLowerCase().includes(q));
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
  }, [currentModule, showSavedOnly, savedRuleIds, onlyHighYieldTraps, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedRuleIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyRuleFormula = (rule: GrammarRule) => {
    const textToCopy = `[MPSC Grammar Rule] ${rule.titleMr} (${rule.title})\n\n📐 FORMULA:\n${rule.formula || rule.formulaMr}\n\n⚡ EXAM TRAP & CLUE:\n${rule.examTipMr || rule.examTip}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedRuleId(rule.id);
    setTimeout(() => setCopiedRuleId(null), 2000);
  };

  // Launch test for current module rules
  const handleLaunchModuleQuiz = () => {
    if (!onStartPracticeWithQuestions) return;
    const allQuestionIds: string[] = [];

    if (activeModuleId === 'english_vocabulary_and_idioms') {
      // Prioritize authentic verified official MPSC PYQ English Vocabulary questions
      const pyqIds = ENGLISH_VOCAB_QUESTIONS.filter((q) => q.id.startsWith('en_vocab_pyq_')).map((q) => q.id);
      const generalIds = ENGLISH_VOCAB_QUESTIONS.filter((q) => !q.id.startsWith('en_vocab_pyq_')).map((q) => q.id);
      allQuestionIds.push(...pyqIds, ...generalIds);
    } else {
      filteredRules.forEach((r) => {
        if (r.practiceQuestionIds && r.practiceQuestionIds.length > 0) {
          r.practiceQuestionIds.forEach((qid) => {
            if (!allQuestionIds.includes(qid)) {
              allQuestionIds.push(qid);
            }
          });
        }
      });
    }

    if (allQuestionIds.length === 0) {
      // Default to general grammar questions
      allQuestionIds.push('gq_en_01', 'gq_en_02', 'gq_en_03', 'gq_en_04', 'gq_en_05');
    }

    onStartPracticeWithQuestions(
      allQuestionIds,
      activeModuleId === 'english_vocabulary_and_idioms'
        ? 'MPSC अधिकृत इंग्रजी शब्दसंग्रह (PYQ English Vocabulary Test)'
        : `${currentModule.titleEn} (${currentModule.titleMr}) Practice Test`
    );
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Top Banner: English Grammar Repository */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 p-6 md:p-8 text-white border border-indigo-500/30 shadow-2xl">
        <div className="absolute -right-12 -top-12 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-400/20 text-sky-300 text-xs font-bold tracking-wide border border-sky-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                Civil Services English Mastery System
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-400/15 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                MPSC Rajyaseva & Combine Group B/C
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span>🇬🇧</span>
              English Grammar Rules Repository
            </h1>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              अभ्यासक्रमानुसार वर्गीकरण केलेले <strong className="text-sky-300">Tenses, Articles, Subject-Verb Agreement, Prepositions</strong> आणि इतर सर्व क्लिष्ट व्याकरण नियमांचा सविस्तर ज्ञानकोश. प्रत्येक नियमासोबत परीक्षा सूत्र, मराठी अर्थ, आणि २ सेकंदांच्या MPSC ट्रॅप क्लृप्त्या!
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
            {/* Export PDF Button */}
            <button
              onClick={() => {
                exportToPdf({
                  title: `MPSC English Grammar - ${currentModule.titleEn} (${currentModule.titleMr})`,
                });
              }}
              className="px-3.5 py-2.5 rounded-xl font-bold text-xs md:text-sm bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center gap-1.5 shadow-md transition-all cursor-pointer no-print active:scale-95"
              title="इंग्रजी व्याकरण नियम PDF मध्ये डाऊनलोड करा"
            >
              <FileDown className="w-4 h-4 text-slate-950" />
              <span>📄 PDF डाऊनलोड</span>
            </button>

            {onBackToOverview && (
              <button
                onClick={onBackToOverview}
                className="px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 transition-all flex items-center gap-1.5 no-print"
              >
                ← सर्व नियम डॅशबोर्ड
              </button>
            )}

            <button
              onClick={() => setViewMode(viewMode === 'cards' ? 'matrix' : 'cards')}
              className={`px-4 py-2.5 rounded-xl font-medium text-xs md:text-sm flex items-center gap-2 transition-all shadow-md no-print ${
                viewMode === 'matrix'
                  ? 'bg-amber-400 text-slate-950 font-bold hover:bg-amber-300'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              <Zap className="w-4 h-4" />
              {viewMode === 'matrix' ? 'तपशीलवार कार्डे (Deep Cards)' : 'रॅपिड रिव्हिजन मॅट्रिक्स (Cheat-Sheet)'}
            </button>

            <button
              onClick={handleLaunchModuleQuiz}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs md:text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:brightness-110 shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 no-print"
            >
              <Play className="w-4 h-4 fill-current" />
              मॉड्यूल सराव परीक्षा सुरू करा
            </button>
          </div>
        </div>

        {/* Global Module Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-slate-400 block mb-0.5">एकूण इंग्रजी नियम:</span>
            <span className="text-lg font-bold text-white">
              {GRAMMAR_RULES.filter((r) => r.language === 'english').length} High-Yield Rules
            </span>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-slate-400 block mb-0.5">सध्याचे मॉड्यूल:</span>
            <span className="text-lg font-bold text-sky-300">
              {currentModule.titleEn.split('(')[0]}
            </span>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-slate-400 block mb-0.5">निवडलेले नियम:</span>
            <span className="text-lg font-bold text-emerald-300">
              {filteredRules.length} सूत्रे उपलब्ध
            </span>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-slate-400 block mb-0.5">जतन केलेले (Bookmarked):</span>
            <span className="text-lg font-bold text-amber-300">
              {savedRuleIds.length} नियम सेव्ह केलेले
            </span>
          </div>
        </div>
      </div>

      {/* DISTINCT STUDY MODULES NAVIGATION STRIP */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-500" />
            अभ्यास मॉड्यूल्स निवडा (Distinct Study Modules)
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            ९ प्रमुख विषयांचे वर्गीकरण
          </span>
        </div>

        {/* Grid of Modules */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {ENGLISH_STUDY_MODULES.map((mod) => {
            const isActive = activeModuleId === mod.id;
            const count = moduleRuleCounts[mod.id] || 0;
            return (
              <button
                key={mod.id}
                onClick={() => {
                  setActiveModuleId(mod.id);
                  setSearchQuery('');
                }}
                className={`text-left p-3 rounded-2xl border transition-all relative flex flex-col justify-between group ${
                  isActive
                    ? 'bg-gradient-to-br from-indigo-900/90 to-slate-900 text-white border-sky-400 shadow-md ring-2 ring-sky-400/40 -translate-y-0.5'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-slate-700 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-lg">{mod.icon}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-sky-400 text-slate-950'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {count} नियम
                    </span>
                  </div>

                  <div className={`font-bold text-xs leading-tight mb-1 ${isActive ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
                    {mod.titleEn}
                  </div>

                  <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {mod.titleMr}
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px]">
                  <span className={`font-semibold truncate max-w-[85%] ${isActive ? 'text-sky-300' : 'text-slate-500 dark:text-slate-400'}`}>
                    {mod.badge}
                  </span>
                  <ArrowRight className={`w-3 h-3 transition-transform group-hover:translate-x-0.5 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE MODULE OVERVIEW BANNER */}
      <div className={`p-4 md:p-5 rounded-2xl border ${currentModule.colorScheme.bg} ${currentModule.colorScheme.border} flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all shadow-sm`}>
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xl">{currentModule.icon}</span>
            <h3 className={`text-base md:text-lg font-bold ${currentModule.colorScheme.text}`}>
              {currentModule.titleEn} ({currentModule.titleMr})
            </h3>
          </div>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {currentModule.descriptionEn} • {currentModule.descriptionMr}
          </p>
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-semibold text-slate-400">मुख्य घटक:</span>
            {currentModule.keyTopics.map((topic, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/10 text-slate-200 border border-white/10"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center shrink-0">
          <button
            onClick={handleLaunchModuleQuiz}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-100 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            या मॉड्यूलचा MCQ सराव ({filteredRules.length} नियम)
          </button>
        </div>
      </div>

      {/* SEARCH AND FILTERS TOOLBAR */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by rule, formula, keyword, or exam clue (उदा. Neither nor, Since, Criteria)..."
              className="w-full pl-10 pr-9 py-2 rounded-xl text-xs md:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setOnlyHighYieldTraps(!onlyHighYieldTraps)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                onlyHighYieldTraps
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              MPSC ट्रॅप अलर्ट्स
            </button>

            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                showSavedOnly
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-current' : ''}`} />
              जतन केलेले ({savedRuleIds.length})
            </button>

            {(searchQuery || showSavedOnly || onlyHighYieldTraps) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSavedOnly(false);
                  setOnlyHighYieldTraps(false);
                }}
                className="px-2.5 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline shrink-0"
              >
                फिल्टर्स हटवा
              </button>
            )}
          </div>
        </div>

        {/* Search Results Count info */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
          <span>
            दर्शवत आहे: <strong className="text-slate-800 dark:text-slate-200">{filteredRules.length}</strong> इंग्रजी नियम
            {searchQuery && ` ("${searchQuery}" साठी)`}
          </span>
          <span className="text-[11px]">
            {viewMode === 'cards' ? 'तपशीलवार अभ्यास मोड' : 'रॅपिड रिव्हिजन मॅट्रिक्स'}
          </span>
        </div>
      </div>

      {/* RULES CONTAINER: CARDS VIEW vs CHEAT-SHEET MATRIX */}
      {filteredRules.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-2xl">
            🔍
          </div>
          <div className="space-y-1">
            <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
              कोणतेही नियम आढळले नाहीत
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              आपण शोधलेला शब्द किंवा लागू केलेले फिल्टर्स तपासून पहा. शोध शब्द बदलून पुन्हा प्रयत्न करा.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveModuleId('all');
              setShowSavedOnly(false);
              setOnlyHighYieldTraps(false);
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-600 text-white hover:bg-sky-500 transition-all shadow-sm"
          >
            सर्व इंग्रजी नियम पहा (All Rules)
          </button>
        </div>
      ) : viewMode === 'matrix' ? (
        /* RAPID REVISION MATRIX (TABLE VIEW) */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">क्र.</th>
                  <th className="py-3.5 px-4 w-1/4">नियम व विषय</th>
                  <th className="py-3.5 px-4 w-1/3">मुख्य सूत्र (Golden Formula)</th>
                  <th className="py-3.5 px-4">MPSC परीक्षा क्लृप्ती (Exam Trap & Tip)</th>
                  <th className="py-3.5 px-3 text-center w-24">क्रिया</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredRules.map((rule, idx) => {
                  const isSaved = savedRuleIds.includes(rule.id);
                  return (
                    <tr
                      key={rule.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="py-3 px-4 text-center font-bold text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 dark:text-white mb-0.5 leading-snug">
                          {rule.title}
                        </div>
                        <div className="text-[11px] text-sky-600 dark:text-sky-400 line-clamp-1">
                          {rule.titleMr}
                        </div>
                        <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {rule.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800 font-mono text-xs text-indigo-700 dark:text-indigo-300 whitespace-pre-line leading-relaxed max-h-36 overflow-y-auto">
                          {rule.formula || rule.formulaMr}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed max-h-36 overflow-y-auto bg-amber-500/5 p-2 rounded-lg border border-amber-500/20">
                          {rule.examTipMr || rule.examTip}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => copyRuleFormula(rule)}
                            title="सूत्र कॉपी करा"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                          >
                            {copiedRuleId === rule.id ? (
                              <Check className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>

                          {onToggleBookmark && (
                            <button
                              onClick={() => onToggleBookmark(rule.id)}
                              title={isSaved ? 'बुकमार्क काढा' : 'जतन करा'}
                              className={`p-1.5 rounded-lg transition-all ${
                                isSaved
                                  ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                              }`}
                            >
                              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* DEEP STUDY CARDS VIEW */
        <div className="space-y-5">
          {filteredRules.map((rule, idx) => {
            const isExpanded = expandedRuleIds[rule.id] ?? true;
            const isSaved = savedRuleIds.includes(rule.id);

            return (
              <div
                key={rule.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all overflow-hidden grammar-rule-card print-avoid-break"
              >
                {/* Card Header */}
                <div className="p-5 md:p-6 bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-b border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-800/60">
                        नियम क्र. {idx + 1}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {rule.category}
                      </span>
                      {rule.categoryMr && (
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          ({rule.categoryMr})
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                      {rule.title}
                    </h3>

                    <h4 className="text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-400 leading-relaxed">
                      {rule.titleMr}
                    </h4>
                  </div>

                  {/* Actions on Card Header */}
                  <div className="flex items-center gap-2 self-start md:self-center no-print">
                    <button
                      onClick={() => copyRuleFormula(rule)}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1.5"
                      title="सूत्र कॉपी करा"
                    >
                      {copiedRuleId === rule.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">कॉपी झाले!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>सूत्र कॉपी</span>
                        </>
                      )}
                    </button>

                    {onToggleBookmark && (
                      <button
                        onClick={() => onToggleBookmark(rule.id)}
                        className={`p-2 rounded-xl transition-all ${
                          isSaved
                            ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                        }`}
                        title={isSaved ? 'बुकमार्क काढले' : 'जतन करा'}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    )}

                    <button
                      onClick={() => toggleExpand(rule.id)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                {isExpanded && (
                  <div className="p-5 md:p-6 space-y-6">
                    {/* Golden Formula Box */}
                    {(rule.formula || rule.formulaMr) && (
                      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white rounded-2xl p-4 md:p-5 border border-indigo-500/40 shadow-inner space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-wider uppercase">
                            <Sparkles className="w-4 h-4" />
                            सुवर्ण सूत्र (Golden Formula)
                          </div>
                          <span className="text-[10px] text-slate-400">कंठस्थ ठेवा</span>
                        </div>

                        {rule.formula && (
                          <div className="font-mono text-xs md:text-sm text-sky-200 whitespace-pre-line leading-relaxed bg-black/30 p-3 rounded-xl border border-white/10">
                            {rule.formula}
                          </div>
                        )}

                        {rule.formulaMr && (
                          <div className="text-xs md:text-sm text-slate-300 whitespace-pre-line leading-relaxed pt-1 border-t border-white/10">
                            {rule.formulaMr}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Definition / Explanation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                      <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-xs uppercase tracking-wide">
                          <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                          Grammatical Principle
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                          {rule.definition}
                        </p>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-xs uppercase tracking-wide">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                          मराठीत सविस्तर नियम
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                          {rule.definitionMr}
                        </p>
                      </div>
                    </div>

                    {/* Key Points */}
                    {((rule.keyPoints && rule.keyPoints.length > 0) ||
                      (rule.keyPointsMr && rule.keyPointsMr.length > 0)) && (
                      <div className="space-y-2">
                        <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          महत्त्वाचे नियम व मुद्दे (Key Points)
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {rule.keyPoints &&
                            rule.keyPoints.map((pt, i) => (
                              <div
                                key={i}
                                className="bg-emerald-500/5 border border-emerald-500/20 p-2.5 rounded-xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2"
                              >
                                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                                <span>{pt}</span>
                              </div>
                            ))}
                          {rule.keyPointsMr &&
                            rule.keyPointsMr.map((pt, i) => (
                              <div
                                key={`mr-${i}`}
                                className="bg-sky-500/5 border border-sky-500/20 p-2.5 rounded-xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2"
                              >
                                <span className="text-sky-500 font-bold shrink-0">👉</span>
                                <span>{pt}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Correct vs Incorrect Examples */}
                    {rule.examples && rule.examples.length > 0 && (
                      <div className="space-y-2.5">
                        <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide flex items-center gap-2">
                          <Target className="w-4 h-4 text-indigo-500" />
                          परीक्षेतील उदाहरणे: बरोबर विरुद्ध चूक (Spot the Error)
                        </h5>

                        <div className="space-y-2.5">
                          {rule.examples.map((ex, exIdx) => (
                            <div
                              key={exIdx}
                              className={`p-3.5 rounded-2xl border transition-all ${
                                ex.isCorrect
                                  ? 'bg-emerald-500/5 border-emerald-500/30'
                                  : 'bg-rose-500/5 border-rose-500/30'
                              }`}
                            >
                              <div className="flex items-start gap-2.5">
                                <span
                                  className={`mt-0.5 p-1 rounded-full text-white text-[10px] font-bold ${
                                    ex.isCorrect ? 'bg-emerald-600' : 'bg-rose-600'
                                  }`}
                                >
                                  {ex.isCorrect ? (
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                  ) : (
                                    <XCircle className="w-3.5 h-3.5" />
                                  )}
                                </span>

                                <div className="space-y-1.5 flex-1">
                                  <div className="font-semibold text-xs md:text-sm text-slate-900 dark:text-slate-100 whitespace-pre-line">
                                    {ex.sentence}
                                  </div>

                                  <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-white/60 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 space-y-1">
                                    <div className="text-slate-700 dark:text-slate-300">
                                      {ex.explanation}
                                    </div>
                                    {ex.explanationMr && (
                                      <div className="text-sky-700 dark:text-sky-400 font-medium">
                                        👉 {ex.explanationMr}
                                      </div>
                                    )}
                                  </div>
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
                      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide">
                          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          महत्त्वाचे अपवाद व सूक्ष्म भेद (Exceptions & Traps)
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside leading-relaxed">
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

                    {/* 2-Second Exam Trap Spotter Tip */}
                    {(rule.examTip || rule.examTipMr) && (
                      <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 text-white border border-sky-500/30 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                          <Zap className="w-4 h-4 fill-amber-300" />
                          MPSC २ सेकंदांची परीक्षा क्लृप्ती (Exam Trap Spotter)
                        </div>
                        {rule.examTip && (
                          <div className="text-xs md:text-sm text-sky-200 whitespace-pre-line leading-relaxed">
                            {rule.examTip}
                          </div>
                        )}
                        {rule.examTipMr && (
                          <div className="text-xs md:text-sm text-slate-200 whitespace-pre-line leading-relaxed pt-1 border-t border-white/10 font-medium">
                            {rule.examTipMr}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Footer: Tags & Practice button */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {rule.tags &&
                          rule.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            >
                              #{tag}
                            </span>
                          ))}
                      </div>

                      {rule.practiceQuestionIds &&
                        rule.practiceQuestionIds.length > 0 &&
                        onStartPracticeWithQuestions && (
                          <button
                            onClick={() =>
                              onStartPracticeWithQuestions(
                                rule.practiceQuestionIds || [],
                                `${rule.title} - सराव प्रश्न`
                              )
                            }
                            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all flex items-center gap-1.5"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            या नियमावर आधारित MCQs सोडवा ({rule.practiceQuestionIds.length})
                          </button>
                        )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
