import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown,
  Award, 
  CheckCircle2, 
  Clock, 
  BarChart3, 
  RotateCcw,
  BookOpen,
  Filter,
  Sparkles,
  Target,
  Layers,
  Info,
  SlidersHorizontal,
  ChevronRight,
  Crosshair,
  Compass,
  AlertTriangle,
  ShieldCheck,
  Zap,
  Play,
  ArrowRight
} from 'lucide-react';
import { ExamResult, SubjectId, UserProgress } from '../types';
import { SUBJECTS } from '../data/subjects';

interface AnalyticsViewProps {
  userProgress: UserProgress;
  language: 'mr' | 'en';
  onReviewPastTest: (result: ExamResult) => void;
  onStartSubjectPractice?: (subjectId: SubjectId) => void;
}

interface RadarSubjectItem {
  id: SubjectId;
  subject: string;
  fullName: string;
  proficiency: number;
  benchmark: number;
  gap: number;
  fullMark: number;
  attempts: number;
  correct: number;
  incorrect: number;
  status: 'strong' | 'moderate' | 'weak';
  color: string;
  advice: string;
}

// Subject-specific tailored preparation advice for MPSC aspirants
const SUBJECT_ADVICE: Record<string, { mr: string; en: string }> = {
  polity: {
    mr: 'कलमे, मूलभूत हक्क, मार्गदर्शक तत्त्वे व पंचायतराजवर लक्ष केंद्रित करा.',
    en: 'Focus on Articles, Fundamental Rights, DPSP, and Panchayati Raj.',
  },
  maharashtra_history: {
    mr: '१८५७ चे महाराष्ट्रातील पडसाद, समाजसुधारक आणि संयुक्त महाराष्ट्र चळवळ अभ्यासा.',
    en: 'Revise reformers, 1857 in Maharashtra, and Samyukta Maharashtra Movement.',
  },
  maharashtra_geography: {
    mr: 'सह्याद्री घाट, प्रमुख नद्यांची खोरे, खनिजे आणि जिल्हा नकाशांचा अभ्यास करा.',
    en: 'Study Sahyadri passes, river basins, minerals, and district maps.',
  },
  general_science: {
    mr: '८वी ते १०वी क्रमिक पुस्तके, भौतिकशास्त्र सूत्रे, प्राणी वर्गीकरण व रोग नियंत्रण उजळणी करा.',
    en: 'Review 8th-10th State Board textbooks, physics formulas, and diseases.',
  },
  economy: {
    mr: 'महाराष्ट्र व केंद्र अर्थसंकल्प, दारिद्र्य समित्या (तेंडुलकर/रंगराजन) व महागाई संकल्पना.',
    en: 'Focus on State budget, poverty committees, inflation, and RBI monetary policy.',
  },
  environment: {
    mr: 'महाराष्ट्रातील रामसर स्थळे, व्याघ्र प्रकल्प, प्रदूषण कायदे आणि COP परिषदा.',
    en: 'Study Ramsar sites in Maharashtra, tiger reserves, and environmental laws.',
  },
  current_affairs: {
    mr: 'लाडकी बहीण योजना, वाढवण बंदर, मराठी अभिजात भाषा, नवीन BNS कायदे आणि पुरस्कार.',
    en: 'Key schemes, Vadhavan port, Marathi classical language status, and BNS codes.',
  },
  csat: {
    mr: 'तार्किक विश्लेषण, कोडिंग-डिकोडिंग आणि वेळ-काम-वेग यावरील रोज ५ प्रश्न सोडवा.',
    en: 'Practice 5 daily reasoning and speed-time-work problems.',
  },
  marathi_grammar: {
    mr: 'प्रयोग, समास, विभक्ती प्रत्यय, संधी नियम आणि म्हणी-वाक्प्रचारांचे वारंवार वाचन करा.',
    en: 'Revise Prayog, Samas, Sandhi rules, and Marathi proverbs.',
  },
  english_grammar: {
    mr: 'Tenses, Subject-Verb Agreement, Prepositions आणि High-frequency Idioms सराव करा.',
    en: 'Practice Tenses, Subject-Verb Agreement, Prepositions, and Idioms.',
  },
};

// Harmonious subject color palette for Recharts lines
const SUBJECT_COLORS: Record<string, string> = {
  polity: '#2563eb', // Blue
  maharashtra_history: '#d97706', // Amber
  maharashtra_geography: '#059669', // Emerald
  economy: '#7c3aed', // Violet
  general_science: '#0891b2', // Cyan
  environment: '#0d9488', // Teal
  csat: '#e11d48', // Rose
  current_affairs: '#ea580c', // Orange
  marathi_grammar: '#ca8a04', // Yellow
  english_grammar: '#4f46e5', // Indigo
};

// Realistic mock test sample trend for demonstration when test history is starting
const SAMPLE_MPSC_TREND = [
  {
    testIndex: 1,
    testLabel: 'T1',
    date: '10 फेब्रु',
    title: 'MPSC संयुक्त पूर्व परीक्षा मॉक १',
    overallScore: 38.5,
    maxScore: 100,
    overallAccuracy: 46,
    polity_score: 8.5,
    polity_accuracy: 52,
    maharashtra_history_score: 6.0,
    maharashtra_history_accuracy: 42,
    maharashtra_geography_score: 7.5,
    maharashtra_geography_accuracy: 48,
    economy_score: 5.5,
    economy_accuracy: 39,
    general_science_score: 6.5,
    general_science_accuracy: 44,
  },
  {
    testIndex: 2,
    testLabel: 'T2',
    date: '17 फेब्रु',
    title: 'MPSC राज्यसेवा सामान्य अध्ययन सराव २',
    overallScore: 48.0,
    maxScore: 100,
    overallAccuracy: 54,
    polity_score: 11.0,
    polity_accuracy: 60,
    maharashtra_history_score: 8.5,
    maharashtra_history_accuracy: 50,
    maharashtra_geography_score: 9.0,
    maharashtra_geography_accuracy: 55,
    economy_score: 8.0,
    economy_accuracy: 49,
    general_science_score: 8.5,
    general_science_accuracy: 52,
  },
  {
    testIndex: 3,
    testLabel: 'T3',
    date: '25 फेब्रु',
    title: 'MPSC संयुक्त गट ब/क सराव ३',
    overallScore: 56.5,
    maxScore: 100,
    overallAccuracy: 62,
    polity_score: 13.5,
    polity_accuracy: 68,
    maharashtra_history_score: 10.0,
    maharashtra_history_accuracy: 58,
    maharashtra_geography_score: 11.5,
    maharashtra_geography_accuracy: 64,
    economy_score: 9.5,
    economy_accuracy: 57,
    general_science_score: 10.5,
    general_science_accuracy: 61,
  },
  {
    testIndex: 4,
    testLabel: 'T4',
    date: '04 मार्च',
    title: 'MPSC राज्यसेवा जीएस फुल टेस्ट ४',
    overallScore: 64.0,
    maxScore: 100,
    overallAccuracy: 69,
    polity_score: 15.0,
    polity_accuracy: 74,
    maharashtra_history_score: 12.0,
    maharashtra_history_accuracy: 67,
    maharashtra_geography_score: 13.5,
    maharashtra_geography_accuracy: 72,
    economy_score: 11.0,
    economy_accuracy: 65,
    general_science_score: 12.0,
    general_science_accuracy: 68,
  },
  {
    testIndex: 5,
    testLabel: 'T5',
    date: '12 मार्च',
    title: 'MPSC संयुक्त प्रिलिम्स अंतिम सराव ५',
    overallScore: 71.5,
    maxScore: 100,
    overallAccuracy: 76,
    polity_score: 16.5,
    polity_accuracy: 81,
    maharashtra_history_score: 13.5,
    maharashtra_history_accuracy: 73,
    maharashtra_geography_score: 15.0,
    maharashtra_geography_accuracy: 79,
    economy_score: 13.0,
    economy_accuracy: 74,
    general_science_score: 13.5,
    general_science_accuracy: 75,
  },
  {
    testIndex: 6,
    testLabel: 'T6',
    date: '20 मार्च',
    title: 'MPSC राज्यसेवा हाय-स्पीड स्पीड टेस्ट ६',
    overallScore: 78.0,
    maxScore: 100,
    overallAccuracy: 82,
    polity_score: 18.0,
    polity_accuracy: 86,
    maharashtra_history_score: 15.0,
    maharashtra_history_accuracy: 79,
    maharashtra_geography_score: 16.5,
    maharashtra_geography_accuracy: 84,
    economy_score: 14.5,
    economy_accuracy: 80,
    general_science_score: 15.0,
    general_science_accuracy: 82,
  },
];

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  userProgress,
  language,
  onReviewPastTest,
  onStartSubjectPractice,
}) => {
  const isMr = language === 'mr';
  const history = userProgress.history;

  // Chart configuration state
  const [chartMode, setChartMode] = useState<'overall' | 'by_subject' | 'multi_compare'>('multi_compare');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('polity');
  const [metricType, setMetricType] = useState<'score' | 'accuracy'>('accuracy');
  const [windowLimit, setWindowLimit] = useState<number | 'all'>(10);
  const [useSampleData, setUseSampleData] = useState<boolean>(history.length < 2);

  // Radar Chart interactive states
  const [radarScope, setRadarScope] = useState<'prelims_core' | 'all'>('prelims_core');
  const [showRadarBenchmark, setShowRadarBenchmark] = useState<boolean>(true);
  const [focusedRadarSubject, setFocusedRadarSubject] = useState<SubjectId | null>(null);

  // Active subjects for multi_compare mode
  const [visibleSubjects, setVisibleSubjects] = useState<Record<string, boolean>>({
    polity: true,
    maharashtra_history: true,
    maharashtra_geography: true,
    general_science: true,
    economy: false,
    environment: false,
    csat: false,
    current_affairs: false,
  });

  const toggleSubjectVisibility = (subId: string) => {
    setVisibleSubjects((prev) => ({
      ...prev,
      [subId]: !prev[subId],
    }));
  };

  // Aggregate subject stats across all tests
  const subjectAggregates: Record<string, { total: number; correct: number; incorrect: number; totalScore: number }> = {};
  
  history.forEach((h) => {
    Object.entries(h.subjectPerformance || {}).forEach(([subId, stats]) => {
      if (!subjectAggregates[subId]) {
        subjectAggregates[subId] = { total: 0, correct: 0, incorrect: 0, totalScore: 0 };
      }
      subjectAggregates[subId].total += stats.total;
      subjectAggregates[subId].correct += stats.correct;
      subjectAggregates[subId].incorrect += stats.incorrect;
      subjectAggregates[subId].totalScore += stats.score || 0;
    });
  });

  const subjectChartData = Object.entries(subjectAggregates).map(([subId, stats]) => {
    const meta = SUBJECTS.find((s) => s.id === subId);
    const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    return {
      id: subId,
      name: meta ? (isMr ? meta.nameMr.split(' ')[0] : meta.nameEn.split(' ')[0]) : subId,
      fullName: meta ? (isMr ? meta.nameMr : meta.nameEn) : subId,
      accuracy,
      correct: stats.correct,
      total: stats.total,
      color: SUBJECT_COLORS[subId] || '#d97706',
    };
  });

  // Sort chronological test history (oldest to newest for progression trend)
  const chronologicalHistory = useMemo(() => {
    const sorted = [...history].sort((a, b) => {
      const timeA = a.timestamp || (a.date ? new Date(a.date).getTime() : 0);
      const timeB = b.timestamp || (b.date ? new Date(b.date).getTime() : 0);
      return timeA - timeB;
    });

    if (windowLimit === 'all') return sorted;
    return sorted.slice(-windowLimit);
  }, [history, windowLimit]);

  // Build the time-series Recharts dataset
  const timeSeriesData = useMemo(() => {
    if (useSampleData && history.length < 2) {
      return SAMPLE_MPSC_TREND;
    }

    return chronologicalHistory.map((h, idx) => {
      const entry: Record<string, any> = {
        testIndex: idx + 1,
        testLabel: `T${idx + 1}`,
        date: h.date,
        title: h.title,
        overallScore: Number(h.finalScore.toFixed(1)),
        maxScore: h.maxScore,
        overallAccuracy: h.accuracyPercentage,
      };

      // Populate subject-specific metrics
      SUBJECTS.forEach((sub) => {
        const subData = h.subjectPerformance?.[sub.id];
        if (subData && subData.total > 0) {
          entry[`${sub.id}_score`] = Number((subData.score || 0).toFixed(1));
          entry[`${sub.id}_accuracy`] = subData.accuracy;
          entry[`${sub.id}_correct`] = subData.correct;
          entry[`${sub.id}_total`] = subData.total;
        } else {
          entry[`${sub.id}_score`] = undefined;
          entry[`${sub.id}_accuracy`] = undefined;
        }
      });

      return entry;
    });
  }, [chronologicalHistory, useSampleData, history.length]);

  // Key subject insights calculation
  const insights = useMemo(() => {
    const rankedSubjects = [...subjectChartData].sort((a, b) => b.accuracy - a.accuracy);
    const bestSubject = rankedSubjects[0];
    const weakestSubject = rankedSubjects[rankedSubjects.length - 1];

    let overallGrowth = 0;
    if (timeSeriesData.length >= 2) {
      const first = timeSeriesData[0];
      const last = timeSeriesData[timeSeriesData.length - 1];
      const firstVal = metricType === 'score' ? first.overallScore : first.overallAccuracy;
      const lastVal = metricType === 'score' ? last.overallScore : last.overallAccuracy;
      overallGrowth = Math.round(lastVal - firstVal);
    }

    return {
      bestSubject,
      weakestSubject,
      overallGrowth,
    };
  }, [subjectChartData, timeSeriesData, metricType]);

  const totalAttempted = history.reduce((acc, h) => acc + h.attemptedCount, 0);
  const totalCorrect = history.reduce((acc, h) => acc + h.correctCount, 0);
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  const totalTimeSeconds = history.reduce((acc, h) => acc + h.timeSpentSeconds, 0);
  const totalHours = (totalTimeSeconds / 3600).toFixed(1);

  // Available subjects in the data pool
  const activeSubjectMetas = SUBJECTS.filter((s) => {
    return (
      useSampleData ||
      subjectAggregates[s.id]?.total > 0 ||
      s.id === 'polity' ||
      s.id === 'maharashtra_history' ||
      s.id === 'maharashtra_geography' ||
      s.id === 'general_science'
    );
  });

  // Multi-axis Radar Chart data for 360-degree subject proficiency visualization
  const radarData = useMemo<RadarSubjectItem[]>(() => {
    const PRELIMS_SUBJECTS: SubjectId[] = [
      'polity',
      'maharashtra_history',
      'maharashtra_geography',
      'general_science',
      'economy',
      'environment',
      'current_affairs',
      'csat',
    ];

    const ALL_MPSC_SUBJECTS: SubjectId[] = [
      'polity',
      'maharashtra_history',
      'maharashtra_geography',
      'general_science',
      'economy',
      'environment',
      'current_affairs',
      'csat',
      'marathi_grammar',
      'english_grammar',
    ];

    const targetSubjectIds = radarScope === 'all' ? ALL_MPSC_SUBJECTS : PRELIMS_SUBJECTS;

    if (useSampleData && history.length < 2) {
      const sampleMap: Record<SubjectId, { proficiency: number; attempts: number; correct: number; incorrect: number; status: 'strong' | 'moderate' | 'weak' }> = {
        polity: { proficiency: 86, attempts: 25, correct: 21, incorrect: 4, status: 'strong' },
        maharashtra_history: { proficiency: 78, attempts: 22, correct: 17, incorrect: 5, status: 'strong' },
        maharashtra_geography: { proficiency: 84, attempts: 24, correct: 20, incorrect: 4, status: 'strong' },
        general_science: { proficiency: 42, attempts: 24, correct: 10, incorrect: 14, status: 'weak' },
        economy: { proficiency: 72, attempts: 18, correct: 13, incorrect: 5, status: 'strong' },
        environment: { proficiency: 66, attempts: 15, correct: 10, incorrect: 5, status: 'moderate' },
        current_affairs: { proficiency: 80, attempts: 25, correct: 20, incorrect: 5, status: 'strong' },
        csat: { proficiency: 58, attempts: 19, correct: 11, incorrect: 8, status: 'moderate' },
        marathi_grammar: { proficiency: 85, attempts: 26, correct: 22, incorrect: 4, status: 'strong' },
        english_grammar: { proficiency: 48, attempts: 21, correct: 10, incorrect: 11, status: 'weak' },
      };

      return targetSubjectIds.map((subId) => {
        const meta = SUBJECTS.find((s) => s.id === subId);
        const sample = sampleMap[subId];
        const shortName = meta ? (isMr ? meta.nameMr.split(' ')[0] : meta.nameEn.split(' ')[0]) : subId;
        const fullName = meta ? (isMr ? meta.nameMr : meta.nameEn) : subId;
        const advice = SUBJECT_ADVICE[subId]?.[isMr ? 'mr' : 'en'] || '';

        return {
          id: subId,
          subject: shortName,
          fullName,
          proficiency: sample.proficiency,
          benchmark: 65,
          gap: sample.proficiency - 65,
          fullMark: 100,
          attempts: sample.attempts,
          correct: sample.correct,
          incorrect: sample.incorrect,
          status: sample.status,
          color: SUBJECT_COLORS[subId] || '#d97706',
          advice,
        };
      });
    }

    return targetSubjectIds.map((subId) => {
      const meta = SUBJECTS.find((s) => s.id === subId);
      const stats = subjectAggregates[subId];
      const attempts = stats?.total || 0;
      const correct = stats?.correct || 0;
      const incorrect = stats?.incorrect || 0;
      const proficiency = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
      const shortName = meta ? (isMr ? meta.nameMr.split(' ')[0] : meta.nameEn.split(' ')[0]) : subId;
      const fullName = meta ? (isMr ? meta.nameMr : meta.nameEn) : subId;
      const advice = SUBJECT_ADVICE[subId]?.[isMr ? 'mr' : 'en'] || '';

      let status: 'strong' | 'moderate' | 'weak' = 'weak';
      if (proficiency >= 70) status = 'strong';
      else if (proficiency >= 50) status = 'moderate';

      return {
        id: subId,
        subject: shortName,
        fullName,
        proficiency,
        benchmark: 65,
        gap: attempts > 0 ? proficiency - 65 : -65,
        fullMark: 100,
        attempts,
        correct,
        incorrect,
        status,
        color: SUBJECT_COLORS[subId] || '#d97706',
        advice,
      };
    });
  }, [useSampleData, history.length, isMr, subjectAggregates, radarScope]);

  const strengthsList = useMemo(() => radarData.filter((r) => r.proficiency >= 70), [radarData]);
  const moderateList = useMemo(() => radarData.filter((r) => r.proficiency >= 50 && r.proficiency < 70), [radarData]);
  const weakList = useMemo(() => radarData.filter((r) => r.proficiency < 50), [radarData]);
  const focusedSubjectItem = useMemo(() => {
    if (!focusedRadarSubject) return null;
    return radarData.find((r) => r.id === focusedRadarSubject) || null;
  }, [focusedRadarSubject, radarData]);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* Header and Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-amber-600" />
            <span>{isMr ? 'अभ्यास प्रगती व कामगिरी विश्लेषण' : 'Performance Analytics & Trends'}</span>
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            {isMr 
              ? 'Recharts द्वारे सर्व चाचण्यांमधील गुण, अचूकता आणि विविध विषयांची प्रगती तपासा.'
              : 'Track test score progression and multi-subject mastery over time using interactive line charts.'}
          </p>
        </div>

        {/* Demo / Live Data Toggle Badge */}
        {history.length < 2 && (
          <button
            onClick={() => setUseSampleData(!useSampleData)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              useSampleData
                ? 'bg-amber-500/10 text-amber-800 border-amber-500/40 hover:bg-amber-500/20'
                : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {useSampleData
                ? (isMr ? '🌟 नमुना प्रगती आलेख (Sample Mode: Active)' : '🌟 Preview Sample Trend: Active')
                : (isMr ? 'माझा प्रत्यक्ष डेटा दाखवा' : 'Show My Live Data')}
            </span>
          </button>
        )}
      </div>

      {/* Aggregate Score Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
            {isMr ? 'एकूण चाचण्या' : 'Total Tests'}
          </div>
          <div className="text-3xl font-black text-stone-900 font-mono">
            {history.length}
          </div>
          <div className="text-xs text-stone-500 mt-1">
            {isMr ? 'पूर्ण केलेल्या चाचण्या' : 'completed sessions'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
            {isMr ? 'सोडवलेले प्रश्न' : 'Questions Practiced'}
          </div>
          <div className="text-3xl font-black text-amber-600 font-mono">
            {totalAttempted}
          </div>
          <div className="text-xs text-stone-500 mt-1">
            {totalCorrect} {isMr ? 'बरोबर उत्तरे' : 'correctly answered'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
            {isMr ? 'एकूण अचूकता दर' : 'Net Accuracy'}
          </div>
          <div className={`text-3xl font-black font-mono ${
            overallAccuracy >= 65 ? 'text-emerald-600' : 'text-stone-900'
          }`}>
            {overallAccuracy}%
          </div>
          <div className="text-xs text-stone-500 mt-1">
            {isMr ? 'नकारात्मक गुणांनंतरचे प्रमाण' : 'taking negative marks into account'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
            {isMr ? 'चाचणी वेळ' : 'Total Test Time'}
          </div>
          <div className="text-3xl font-black text-stone-900 font-mono">
            {totalHours} <span className="text-sm font-normal text-stone-500">{isMr ? 'तास' : 'hrs'}</span>
          </div>
          <div className="text-xs text-stone-500 mt-1">
            {isMr ? 'प्रत्यक्ष सराव वेळ' : 'active testing time'}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PRIMARY FEATURE: RECHARTS LINE CHART - MPSC TEST SCORE & SUBJECT TRENDS   */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-7 space-y-6">
        {/* Chart Header & Interactive Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-600" />
                <span>
                  {isMr ? 'चाचणी गुण व विषयनिहाय प्रगती आलेख' : 'Test Scores & Subject Progress Trend'}
                </span>
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {isMr 
                ? 'वेळेनुसार विविध विषयांमध्ये मिळालेले गुण आणि अचूकतेमधील सुधारणा तपासा.'
                : 'Visualize your performance trajectory over time across different MPSC subjects using Recharts.'}
            </p>
          </div>

          {/* Interactive Filters Strip */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-stone-100 rounded-xl text-xs font-semibold text-stone-600">
              <button
                type="button"
                onClick={() => setChartMode('multi_compare')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  chartMode === 'multi_compare'
                    ? 'bg-white text-stone-900 shadow-xs font-bold'
                    : 'hover:text-stone-900'
                }`}
              >
                {isMr ? 'विषयांची तुलना' : 'Multi-Subject'}
              </button>
              <button
                type="button"
                onClick={() => setChartMode('by_subject')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  chartMode === 'by_subject'
                    ? 'bg-white text-stone-900 shadow-xs font-bold'
                    : 'hover:text-stone-900'
                }`}
              >
                {isMr ? 'एका विषयाचा कल' : 'Single Subject'}
              </button>
              <button
                type="button"
                onClick={() => setChartMode('overall')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  chartMode === 'overall'
                    ? 'bg-white text-stone-900 shadow-xs font-bold'
                    : 'hover:text-stone-900'
                }`}
              >
                {isMr ? 'एकूण गुण' : 'Overall'}
              </button>
            </div>

            {/* Metric Switcher (Score vs Accuracy) */}
            <div className="flex items-center p-1 bg-stone-100 rounded-xl text-xs font-semibold text-stone-600">
              <button
                type="button"
                onClick={() => setMetricType('accuracy')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  metricType === 'accuracy'
                    ? 'bg-white text-emerald-800 shadow-xs font-bold'
                    : 'hover:text-stone-900'
                }`}
              >
                {isMr ? 'अचूकता %' : 'Accuracy %'}
              </button>
              <button
                type="button"
                onClick={() => setMetricType('score')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  metricType === 'score'
                    ? 'bg-white text-amber-800 shadow-xs font-bold'
                    : 'hover:text-stone-900'
                }`}
              >
                {isMr ? 'मिळालेले गुण' : 'Scores'}
              </button>
            </div>

            {/* Window Limitation (5, 10, All) */}
            <div className="flex items-center p-1 bg-stone-100 rounded-xl text-xs font-semibold text-stone-600">
              <button
                type="button"
                onClick={() => setWindowLimit(5)}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  windowLimit === 5 ? 'bg-white text-stone-900 shadow-xs font-bold' : 'hover:text-stone-900'
                }`}
              >
                {isMr ? '५ चाचण्या' : '5'}
              </button>
              <button
                type="button"
                onClick={() => setWindowLimit(10)}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  windowLimit === 10 ? 'bg-white text-stone-900 shadow-xs font-bold' : 'hover:text-stone-900'
                }`}
              >
                {isMr ? '१० चाचण्या' : '10'}
              </button>
              <button
                type="button"
                onClick={() => setWindowLimit('all')}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  windowLimit === 'all' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'hover:text-stone-900'
                }`}
              >
                {isMr ? 'सर्व' : 'All'}
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Sub-Controls Bar */}
        {chartMode === 'by_subject' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="font-bold text-stone-600 shrink-0 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>{isMr ? 'विषय निवडा:' : 'Select Subject:'}</span>
            </span>
            {activeSubjectMetas.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedSubject(s.id as SubjectId)}
                className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-all cursor-pointer border ${
                  selectedSubject === s.id
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {isMr ? s.nameMr.split(' ')[0] : s.nameEn.split(' ')[0]}
              </button>
            ))}
          </div>
        )}

        {chartMode === 'multi_compare' && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-stone-600 shrink-0 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-stone-500" />
              <span>{isMr ? 'आलेखामध्ये दर्शवायचे विषय:' : 'Active Subject Lines:'}</span>
            </span>
            {activeSubjectMetas.map((s) => {
              const isChecked = visibleSubjects[s.id] ?? false;
              const color = SUBJECT_COLORS[s.id] || '#78716c';
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleSubjectVisibility(s.id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                      : 'bg-stone-50 text-stone-400 border-stone-200 line-through opacity-70'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span>{isMr ? s.nameMr.split(' ')[0] : s.nameEn.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* The Recharts LineChart Canvas */}
        <div className="h-80 w-full pt-2">
          {timeSeriesData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeSeriesData}
                margin={{ top: 15, right: 25, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                
                <XAxis 
                  dataKey="testLabel" 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false}
                  dy={6}
                />
                
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false}
                  domain={metricType === 'accuracy' ? [0, 100] : ['auto', 'auto']}
                  unit={metricType === 'accuracy' ? '%' : ''}
                  dx={-4}
                />

                {/* Custom Recharts Tooltip */}
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-stone-950 text-stone-100 p-3.5 rounded-xl text-xs shadow-2xl border border-stone-800 space-y-2 min-w-[220px]">
                          <div className="border-b border-stone-800 pb-1.5">
                            <div className="font-extrabold text-amber-400 text-sm">
                              {data.title || data.testLabel}
                            </div>
                            <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                              {data.date} • {data.testLabel}
                            </div>
                          </div>

                          <div className="space-y-1 font-sans">
                            <div className="flex items-center justify-between text-stone-300">
                              <span>{isMr ? 'एकूण गुण:' : 'Overall Score:'}</span>
                              <span className="font-bold text-white font-mono">
                                {data.overallScore} / {data.maxScore}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-stone-300">
                              <span>{isMr ? 'एकूण अचूकता:' : 'Overall Accuracy:'}</span>
                              <span className="font-bold text-emerald-400 font-mono">
                                {data.overallAccuracy}%
                              </span>
                            </div>

                            {/* Subject Performance Breakdown in Tooltip */}
                            {chartMode === 'by_subject' && (
                              <div className="mt-2 pt-1.5 border-t border-stone-800">
                                <div className="text-amber-300 font-bold mb-1 flex items-center gap-1.5">
                                  <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: SUBJECT_COLORS[selectedSubject] }}
                                  />
                                  <span>
                                    {SUBJECTS.find((s) => s.id === selectedSubject)?.nameMr || selectedSubject}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-stone-300 text-[11px]">
                                  <span>{isMr ? 'विषय गुण:' : 'Subject Score:'}</span>
                                  <span className="font-mono text-white">
                                    {data[`${selectedSubject}_score`] ?? '-'}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-stone-300 text-[11px]">
                                  <span>{isMr ? 'विषय अचूकता:' : 'Subject Accuracy:'}</span>
                                  <span className="font-mono text-emerald-400 font-bold">
                                    {data[`${selectedSubject}_accuracy`] !== undefined 
                                      ? `${data[`${selectedSubject}_accuracy`]}%` 
                                      : '-'}
                                  </span>
                                </div>
                              </div>
                            )}

                            {chartMode === 'multi_compare' && (
                              <div className="mt-2 pt-1.5 border-t border-stone-800 space-y-1">
                                <div className="text-[10px] text-stone-400 uppercase font-semibold">
                                  {isMr ? 'विषयांची अचूकता:' : 'Subject Performance:'}
                                </div>
                                {activeSubjectMetas.map((s) => {
                                  if (!visibleSubjects[s.id]) return null;
                                  const val = data[`${s.id}_${metricType}`];
                                  if (val === undefined) return null;
                                  return (
                                    <div key={s.id} className="flex items-center justify-between text-[11px]">
                                      <span className="flex items-center gap-1.5">
                                        <span
                                          className="w-2 h-2 rounded-full"
                                          style={{ backgroundColor: SUBJECT_COLORS[s.id] }}
                                        />
                                        <span className="text-stone-300">
                                          {isMr ? s.nameMr.split(' ')[0] : s.nameEn.split(' ')[0]}
                                        </span>
                                      </span>
                                      <span className="font-mono font-bold text-white">
                                        {metricType === 'accuracy' ? `${val}%` : val}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {/* MODE 1: OVERALL SCORE LINE */}
                {chartMode === 'overall' && (
                  <Line
                    type="monotone"
                    dataKey={metricType === 'score' ? 'overallScore' : 'overallAccuracy'}
                    name={isMr ? 'एकूण निकाल' : 'Overall Result'}
                    stroke="#d97706"
                    strokeWidth={3.5}
                    dot={{ r: 5, fill: '#d97706', stroke: '#ffffff', strokeWidth: 2 }}
                    activeDot={{ r: 7, fill: '#f59e0b', stroke: '#ffffff', strokeWidth: 2 }}
                  />
                )}

                {/* MODE 2: BY SINGLE SUBJECT */}
                {chartMode === 'by_subject' && (
                  <>
                    {/* Overall benchmark baseline */}
                    <Line
                      type="monotone"
                      dataKey={metricType === 'score' ? 'overallScore' : 'overallAccuracy'}
                      name={isMr ? 'एकूण सरासरी (Benchmark)' : 'Overall Benchmark'}
                      stroke="#94a3b8"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={false}
                    />

                    {/* Selected subject primary line */}
                    <Line
                      type="monotone"
                      dataKey={`${selectedSubject}_${metricType}`}
                      name={SUBJECTS.find((s) => s.id === selectedSubject)?.nameMr || selectedSubject}
                      stroke={SUBJECT_COLORS[selectedSubject] || '#2563eb'}
                      strokeWidth={3.5}
                      connectNulls={true}
                      dot={{
                        r: 6,
                        fill: SUBJECT_COLORS[selectedSubject] || '#2563eb',
                        stroke: '#ffffff',
                        strokeWidth: 2,
                      }}
                      activeDot={{
                        r: 8,
                        fill: SUBJECT_COLORS[selectedSubject] || '#2563eb',
                        stroke: '#ffffff',
                        strokeWidth: 2,
                      }}
                    />
                  </>
                )}

                {/* MODE 3: MULTI-SUBJECT COMPARISON */}
                {chartMode === 'multi_compare' && (
                  <>
                    {activeSubjectMetas.map((s) => {
                      if (!visibleSubjects[s.id]) return null;
                      const color = SUBJECT_COLORS[s.id] || '#64748b';
                      return (
                        <Line
                          key={s.id}
                          type="monotone"
                          dataKey={`${s.id}_${metricType}`}
                          name={isMr ? s.nameMr.split(' ')[0] : s.nameEn.split(' ')[0]}
                          stroke={color}
                          strokeWidth={2.5}
                          connectNulls={true}
                          dot={{ r: 4, fill: color, stroke: '#ffffff', strokeWidth: 1.5 }}
                          activeDot={{ r: 6, fill: color, stroke: '#ffffff', strokeWidth: 2 }}
                        />
                      );
                    })}
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-stone-400 text-xs gap-2">
              <Info className="w-6 h-6 text-stone-400" />
              <span>{isMr ? 'प्रगती आलेख पाहण्यासाठी किमान एक चाचणी सोडवा.' : 'Complete at least one test to view score trends.'}</span>
            </div>
          )}
        </div>

        {/* Actionable Subject Progression Insights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-stone-100">
          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-700 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-emerald-950">
                {isMr ? 'सर्वाधिक मजबूत विषय (Strongest)' : 'Top Performing Subject'}
              </div>
              <p className="text-emerald-800 mt-0.5 font-medium">
                {insights.bestSubject ? `${insights.bestSubject.fullName} (${insights.bestSubject.accuracy}%)` : (isMr ? 'राज्यघटना व शासन' : 'Polity')}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-amber-950">
                {isMr ? 'चाचणीतील गती (Trend Delta)' : 'Progression Momentum'}
              </div>
              <p className="text-amber-800 mt-0.5 font-medium">
                {insights.overallGrowth >= 0 ? `+${insights.overallGrowth}%` : `${insights.overallGrowth}%`} {isMr ? 'अचूकतेमध्ये एकूण वाढ' : 'overall improvement'}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-700 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-rose-950">
                {isMr ? 'पुढील सरावाचे उद्दिष्ट (Focus Area)' : 'Priority Focus Area'}
              </div>
              <p className="text-rose-800 mt-0.5 font-medium">
                {insights.weakestSubject ? `${insights.weakestSubject.fullName} (${insights.weakestSubject.accuracy}%)` : (isMr ? 'सामान्य विज्ञान व तंत्रज्ञान' : 'General Science')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 360° SUBJECT PROFICIENCY RADAR & STRENGTHS/WEAKNESSES MATRIX              */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-7 space-y-6">
        {/* Radar Header & Interactive Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
                <Crosshair className="w-4 h-4 text-amber-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                {isMr ? 'विषयनिहाय प्रवीणता रडार आलेख (Subject Proficiency Radar)' : 'Subject Proficiency Radar Chart'}
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {isMr 
                ? 'Recharts द्वारे MPSC कट-ऑफ उद्दिष्ट (६५%) विरुद्ध आपली प्रवीणता तपासा — आपले प्रबळ (Strengths) व कमजोर (Weaknesses) विषय एका दृष्टिक्षेपात ओळखा.' 
                : '360° visual evaluation using Recharts comparing your subject mastery against the 65% safe cutoff target.'}
            </p>
          </div>

          {/* Interactive Filters Strip */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Subject Scope Toggle */}
            <div className="flex items-center p-1 bg-stone-100 rounded-xl text-xs font-semibold text-stone-600">
              <button
                type="button"
                onClick={() => setRadarScope('prelims_core')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  radarScope === 'prelims_core'
                    ? 'bg-white text-stone-900 shadow-xs font-bold'
                    : 'hover:text-stone-900'
                }`}
              >
                {isMr ? 'पूर्व परीक्षा (८ विषय)' : 'Prelims (8 Core)'}
              </button>
              <button
                type="button"
                onClick={() => setRadarScope('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  radarScope === 'all'
                    ? 'bg-white text-stone-900 shadow-xs font-bold'
                    : 'hover:text-stone-900'
                }`}
              >
                {isMr ? 'सर्व MPSC विषय (१०)' : 'All Subjects (10)'}
              </button>
            </div>

            {/* Benchmark Cutoff Toggle */}
            <button
              type="button"
              onClick={() => setShowRadarBenchmark(!showRadarBenchmark)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                showRadarBenchmark
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-stone-50 text-stone-600 border-stone-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${showRadarBenchmark ? 'bg-emerald-600 animate-pulse' : 'bg-stone-400'}`}></span>
              <span>{isMr ? '६५% कट-ऑफ लक्ष्य' : '65% Cutoff Line'}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Grid: Left: RadarChart, Right: Strengths & Weaknesses Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: RECHARTS RADAR CHART CANVAS */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="h-80 sm:h-96 w-full relative">
              {radarData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={({ x, y, textAnchor, payload }: any) => {
                        const item = radarData.find((d) => d.subject === payload.value);
                        const isSelected = focusedRadarSubject === item?.id;
                        return (
                          <text
                            x={x}
                            y={y}
                            textAnchor={textAnchor}
                            fill={isSelected ? '#d97706' : '#334155'}
                            fontSize={11}
                            fontWeight={isSelected ? 800 : 600}
                            className="cursor-pointer transition-colors hover:fill-amber-600"
                            onClick={() => {
                              if (item) {
                                setFocusedRadarSubject(focusedRadarSubject === item.id ? null : item.id);
                              }
                            }}
                          >
                            {payload.value}
                          </text>
                        );
                      }} 
                    />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, 100]} 
                      ticks={[25, 50, 65, 75, 100]}
                      tick={{ fill: '#94a3b8', fontSize: 10 }}
                      stroke="#cbd5e1"
                    />

                    {/* Safe Cutoff Benchmark Radar (65%) */}
                    {showRadarBenchmark && (
                      <Radar
                        name={isMr ? 'कट-ऑफ उद्दिष्ट (६५%)' : 'Cutoff Benchmark (65%)'}
                        dataKey="benchmark"
                        stroke="#059669"
                        strokeDasharray="4 4"
                        strokeWidth={1.5}
                        fill="#10b981"
                        fillOpacity={0.08}
                      />
                    )}

                    {/* User Actual Subject Proficiency Radar */}
                    <Radar
                      name={isMr ? 'माझी प्रवीणता (%)' : 'My Proficiency (%)'}
                      dataKey="proficiency"
                      stroke="#d97706"
                      strokeWidth={2.5}
                      fill="#f59e0b"
                      fillOpacity={0.35}
                      dot={(props: any) => {
                        const { cx, cy, payload } = props;
                        const isStrong = payload.status === 'strong';
                        const isWeak = payload.status === 'weak';
                        const fill = isStrong ? '#059669' : isWeak ? '#e11d48' : '#d97706';
                        const isSelected = focusedRadarSubject === payload.id;
                        return (
                          <circle
                            key={payload.id}
                            cx={cx}
                            cy={cy}
                            r={isSelected ? 7 : 4.5}
                            fill={fill}
                            stroke="#ffffff"
                            strokeWidth={2}
                            className="cursor-pointer transition-all hover:scale-125"
                            onClick={() => setFocusedRadarSubject(focusedRadarSubject === payload.id ? null : payload.id)}
                          />
                        );
                      }}
                      activeDot={{ r: 7, fill: '#f59e0b', stroke: '#ffffff', strokeWidth: 2 }}
                    />

                    {/* Custom Radar Tooltip */}
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item: RadarSubjectItem = payload[0].payload;
                          return (
                            <div className="bg-stone-950 text-stone-100 p-3.5 rounded-xl text-xs shadow-2xl border border-stone-800 space-y-2 min-w-[230px] max-w-[270px]">
                              <div className="border-b border-stone-800 pb-1.5 flex items-center justify-between gap-2">
                                <span className="font-extrabold text-amber-400 text-sm">
                                  {item.fullName}
                                </span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                  item.status === 'strong'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : item.status === 'moderate'
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                }`}>
                                  {item.status === 'strong'
                                    ? (isMr ? '🌟 मजबूत' : 'Strong')
                                    : item.status === 'moderate'
                                    ? (isMr ? '⚖️ मध्यम' : 'Moderate')
                                    : (isMr ? '⚠️ कच्चा विषय' : 'Weak')}
                                </span>
                              </div>

                              <div className="space-y-1 font-sans text-xs">
                                <div className="flex items-center justify-between text-stone-300">
                                  <span>{isMr ? 'विषय प्रवीणता दर:' : 'Subject Accuracy:'}</span>
                                  <span className={`font-mono font-black text-sm ${
                                    item.proficiency >= 70 ? 'text-emerald-400' : item.proficiency >= 50 ? 'text-amber-400' : 'text-rose-400'
                                  }`}>
                                    {item.proficiency}%
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-stone-400 text-[11px]">
                                  <span>{isMr ? 'कट-ऑफ उद्दिष्ट:' : 'Target Benchmark:'}</span>
                                  <span className="font-mono text-stone-200">
                                    {item.benchmark}% ({item.gap >= 0 ? `+${item.gap}%` : `${item.gap}%`})
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-stone-400 text-[11px]">
                                  <span>{isMr ? 'सोडवलेले प्रश्न:' : 'Questions Solved:'}</span>
                                  <span className="font-mono text-stone-200">
                                    {item.correct} बरोबर / {item.attempts} एकूण
                                  </span>
                                </div>
                              </div>

                              {item.advice && (
                                <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-300 italic flex items-start gap-1.5">
                                  <span className="text-amber-400 font-bold shrink-0">💡</span>
                                  <span>{item.advice}</span>
                                </div>
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-stone-400 text-xs gap-2">
                  <Compass className="w-6 h-6 text-stone-400" />
                  <span>{isMr ? 'रडार आलेख पाहण्यासाठी चाचणी सोडवा.' : 'Take a test to generate proficiency radar.'}</span>
                </div>
              )}
            </div>

            {/* Radar Legend Indicator Strip */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold pt-2 border-t border-stone-100">
              <span className="flex items-center gap-1.5 text-stone-700">
                <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-600 shadow-2xs"></span>
                <span>{isMr ? 'माझी प्रवीणता (Proficiency)' : 'My Proficiency'}</span>
              </span>
              {showRadarBenchmark && (
                <span className="flex items-center gap-1.5 text-stone-700">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600 border-dashed"></span>
                  <span>{isMr ? '६५% कट-ऑफ लक्ष्य (Target)' : '65% Cutoff Target'}</span>
                </span>
              )}
              <span className="text-stone-400 text-[11px]">
                {isMr ? '💡 आलेख बिंदूवर क्लिक करून विषय निवडा' : '💡 Click on vertex to focus subject'}
              </span>
            </div>
          </div>

          {/* Column 2: STRENGTHS & WEAKNESSES IDENTIFICATION MATRIX */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <h3 className="text-sm font-bold text-stone-900">
                    {isMr ? 'सामर्थ्य व कमकुवत दुवे विश्लेषण (Strengths & Weaknesses)' : 'Strengths & Weaknesses Matrix'}
                  </h3>
                </div>
                <span className="text-[11px] text-stone-500 font-medium">
                  {isMr ? 'कट-ऑफ मानक: ६५%' : 'Cutoff Benchmark: 65%'}
                </span>
              </div>

              {/* Matrix 3 Categories */}
              <div className="space-y-3.5">
                {/* 1. STRENGTHS (>= 70%) */}
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/90 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-950">
                        {isMr ? 'प्रबळ सामर्थ्य (Strengths ≥ ७०%)' : 'Strengths (≥ 70%)'}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {strengthsList.length} {isMr ? 'विषय' : 'subjects'}
                    </span>
                  </div>

                  {strengthsList.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {strengthsList.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setFocusedRadarSubject(focusedRadarSubject === s.id ? null : s.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            focusedRadarSubject === s.id
                              ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                              : 'bg-white text-emerald-900 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                          }`}
                        >
                          <span>{s.subject}</span>
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                            focusedRadarSubject === s.id ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {s.proficiency}%
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-stone-500 italic">
                      {isMr ? 'अद्याप ७०% पेक्षा जास्त अचूकतेचा विषय नाही.' : 'No subjects at or above 70% yet.'}
                    </p>
                  )}
                </div>

                {/* 2. MODERATE (50% - 69%) */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/90 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-amber-950">
                        {isMr ? 'मध्यम क्षेत्र (Moderate ५०% - ६९%)' : 'Moderate / Borderline (50% - 69%)'}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                      {moderateList.length} {isMr ? 'विषय' : 'subjects'}
                    </span>
                  </div>

                  {moderateList.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {moderateList.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setFocusedRadarSubject(focusedRadarSubject === s.id ? null : s.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            focusedRadarSubject === s.id
                              ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                              : 'bg-white text-amber-900 border-amber-200 hover:border-amber-300 hover:bg-amber-50/50'
                          }`}
                        >
                          <span>{s.subject}</span>
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                            focusedRadarSubject === s.id ? 'bg-amber-800 text-amber-100' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {s.proficiency}%
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-stone-500 italic">
                      {isMr ? 'या श्रेणीत सध्या कोणताही विषय नाही.' : 'No subjects currently in this range.'}
                    </p>
                  )}
                </div>

                {/* 3. CRITICAL WEAKNESSES (< 50%) */}
                <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200/90 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span className="text-xs font-bold text-rose-950">
                        {isMr ? 'कच्चे विषय / कमकुवत दुवे (< ५०%)' : 'Critical Focus Areas (< 50%)'}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                      {weakList.length} {isMr ? 'विषय' : 'subjects'}
                    </span>
                  </div>

                  {weakList.length > 0 ? (
                    <div className="space-y-2 pt-1">
                      {weakList.map((s) => (
                        <div
                          key={s.id}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-rose-200 shadow-2xs gap-2"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-stone-900 truncate">
                                {s.fullName}
                              </span>
                              <span className="text-[10px] font-mono font-bold text-rose-600 shrink-0">
                                {s.proficiency}% ({s.gap}% {isMr ? 'तूट' : 'deficit'})
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-500 truncate mt-0.5">
                              {s.advice}
                            </p>
                          </div>

                          {onStartSubjectPractice && (
                            <button
                              type="button"
                              onClick={() => onStartSubjectPractice(s.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shrink-0 cursor-pointer shadow-xs transition-colors"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>{isMr ? 'सराव' : 'Practice'}</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold bg-emerald-100/60 p-2 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{isMr ? 'उत्कृष्ट! सर्व विषय ५०% किंवा त्याहून जास्त अचूकतेवर आहेत.' : 'Great job! All subjects at or above safe level.'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Selected Subject Spotlight */}
            {focusedSubjectItem && (
              <div className="p-3.5 rounded-xl bg-stone-900 text-white border border-stone-800 space-y-2 mt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: focusedSubjectItem.color }}
                    />
                    <span className="font-bold text-xs text-amber-300">
                      {focusedSubjectItem.fullName}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold">
                    {focusedSubjectItem.proficiency}% {isMr ? 'प्रवीणता' : 'Proficiency'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-300">
                  💡 {focusedSubjectItem.advice}
                </p>
                {onStartSubjectPractice && (
                  <button
                    type="button"
                    onClick={() => onStartSubjectPractice(focusedSubjectItem.id)}
                    className="w-full mt-1 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isMr ? `या विषयाची चाचणी सुरू करा (${focusedSubjectItem.subject})` : `Start Practice Test (${focusedSubjectItem.subject})`}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CUMULATIVE SUBJECT ACCURACY BAR CHART */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-700 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900">
                {isMr ? 'विषयवार अचूकता टक्केवारी (%)' : 'Subject Accuracy Breakdown'}
              </h2>
              <p className="text-xs text-stone-500">
                {isMr ? 'सर्व सराव प्रश्नांमधील अचूकतेची विभागणी' : 'Performance comparison across all attempted questions'}
              </p>
            </div>
          </div>
        </div>

        <div className="h-64 sm:h-72 w-full">
          {subjectChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectChartData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 100]} tickLine={false} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0c0a09',
                    color: '#f5f5f4',
                    borderRadius: '12px',
                    fontSize: '12px',
                    border: '1px solid #292524',
                  }}
                  formatter={(value: any) => [`${value}%`, isMr ? 'अचूकता' : 'Accuracy']}
                />
                <Bar dataKey="accuracy" fill="#059669" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-stone-400 text-xs">
              {isMr ? 'विषयवार अचूकतेचा डेटा मिळवण्यासाठी चाचणी सोडवा.' : 'Subject-wise data will appear here after your first test.'}
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
          <span>
            {isMr ? 'एकूण सोडवलेले प्रश्न:' : 'Total Solved:'}{' '}
            <strong className="text-stone-900 font-mono">{totalAttempted}</strong>
          </span>
          <span className="text-stone-400">•</span>
          <span>
            {isMr ? 'कट-ऑफ मानक:' : 'Benchmark:'}{' '}
            <strong className="text-emerald-700 font-mono">६५%</strong>
          </span>
        </div>
      </div>

      {/* Test History Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              {isMr ? 'चाचण्यांचा इतिहास (Past Tests History)' : 'Test Attempt History'}
            </h2>
            <p className="text-xs text-stone-500">
              {isMr ? 'आधी सोडवलेल्या कोणत्याही चाचणीचे उत्तरपत्र व विश्लेषण पुन्हा पहा.' : 'Review answers and solutions from your previously attempted tests.'}
            </p>
          </div>
        </div>

        {history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">{isMr ? 'चाचणी नाव' : 'Test Name'}</th>
                  <th className="px-4 py-3.5">{isMr ? 'तारीख' : 'Date'}</th>
                  <th className="px-4 py-3.5">{isMr ? 'गुण (Score)' : 'Score'}</th>
                  <th className="px-4 py-3.5">{isMr ? 'अचूकता' : 'Accuracy'}</th>
                  <th className="px-4 py-3.5">{isMr ? 'वेळ' : 'Time'}</th>
                  <th className="px-6 py-3.5 text-right">{isMr ? 'कृती' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {history.map((h, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-stone-900">
                      {h.title}
                    </td>
                    <td className="px-4 py-4 text-stone-500 text-xs">
                      {h.date}
                    </td>
                    <td className="px-4 py-4 font-mono font-bold text-stone-800">
                      {h.finalScore.toFixed(1)} / {h.maxScore}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        h.accuracyPercentage >= 65
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-100 text-stone-700'
                      }`}>
                        {h.accuracyPercentage}%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-stone-500 font-mono text-xs">
                      {Math.floor(h.timeSpentSeconds / 60)}m {h.timeSpentSeconds % 60}s
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onReviewPastTest(h)}
                        className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-900 hover:text-white font-bold text-xs text-stone-700 transition-colors cursor-pointer"
                      >
                        {isMr ? 'पुनरावलोकन' : 'Review Test'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center text-stone-400 text-sm">
            {isMr ? 'अद्याप एकही चाचणी सोडवलेली नाही. डॅशबोर्डवरून सराव सुरू करा.' : 'No tests attempted yet. Start practicing from the dashboard.'}
          </div>
        )}
      </div>
    </div>
  );
};
