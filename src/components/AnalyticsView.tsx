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
  ArrowRight,
  Download,
  HardDrive,
  FileJson,
  Bookmark
} from 'lucide-react';
import { ExamResult, SubjectId, UserProgress } from '../types';
import { SUBJECTS } from '../data/subjects';
import { exportUserDataAsJSON } from '../utils/exportImportBackup';

interface AnalyticsViewProps {
  userProgress: UserProgress;
  language: 'mr' | 'en';
  onReviewPastTest: (result: ExamResult) => void;
  onStartSubjectPractice?: (subjectId: SubjectId) => void;
  onOpenBackupModal?: () => void;
}

interface RadarSubjectItem {
  id: SubjectId;
  subject: string;
  fullName: string;
  proficiency: number;
  benchmark: number;
  topperTarget: number;
  gap: number;
  fullMark: number;
  attempts: number;
  correct: number;
  incorrect: number;
  status: 'strong' | 'moderate' | 'weak';
  color: string;
  advice: string;
}

// Crisp, distinctive short names for Radar Chart axes to prevent collisions
const RADAR_SUBJECT_NAMES: Record<SubjectId, { mr: string; en: string }> = {
  polity: { mr: 'राज्यघटना', en: 'Polity' },
  maharashtra_history: { mr: 'महाराष्ट्र इतिहास', en: 'History' },
  maharashtra_geography: { mr: 'महाराष्ट्र भूगोल', en: 'Geography' },
  general_science: { mr: 'सामान्य विज्ञान', en: 'Gen Science' },
  economy: { mr: 'अर्थव्यवस्था', en: 'Economy' },
  environment: { mr: 'पर्यावरण', en: 'Environment' },
  current_affairs: { mr: 'चालू घडामोडी', en: 'Current Affairs' },
  csat: { mr: 'CSAT बुद्धिमत्ता', en: 'CSAT' },
  marathi_grammar: { mr: 'मराठी व्याकरण', en: 'Marathi Grammar' },
  english_grammar: { mr: 'इंग्रजी व्याकरण', en: 'English Grammar' },
};

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

// Realistic 10-attempt MPSC test trend showing accuracy improvement over last 10 attempts
const SAMPLE_MPSC_TREND: Record<string, any>[] = [
  {
    testIndex: 1,
    testLabel: 'T1',
    date: '10 फेब्रु',
    title: 'MPSC संयुक्त पूर्व परीक्षा सराव १',
    overallScore: 38.5,
    maxScore: 100,
    overallAccuracy: 44,
    polity_score: 7.5,
    polity_accuracy: 48,
    maharashtra_history_score: 4.5,
    maharashtra_history_accuracy: 40,
    maharashtra_geography_score: 6.5,
    maharashtra_geography_accuracy: 45,
    economy_score: 5.0,
    economy_accuracy: 38,
    general_science_score: 6.0,
    general_science_accuracy: 42,
    current_affairs_score: 7.0,
    current_affairs_accuracy: 50,
    csat_score: 6.5,
    csat_accuracy: 44,
    environment_score: 6.0,
    environment_accuracy: 46,
  },
  {
    testIndex: 2,
    testLabel: 'T2',
    date: '14 फेब्रु',
    title: 'MPSC राज्यसेवा सामान्य अध्ययन सराव २',
    overallScore: 46.0,
    maxScore: 100,
    overallAccuracy: 51,
    polity_score: 9.0,
    polity_accuracy: 54,
    maharashtra_history_score: 5.5,
    maharashtra_history_accuracy: 46,
    maharashtra_geography_score: 8.0,
    maharashtra_geography_accuracy: 52,
    economy_score: 6.5,
    economy_accuracy: 44,
    general_science_score: 7.5,
    general_science_accuracy: 48,
    current_affairs_score: 8.5,
    current_affairs_accuracy: 55,
    csat_score: 8.0,
    csat_accuracy: 52,
    environment_score: 7.5,
    environment_accuracy: 52,
  },
  {
    testIndex: 3,
    testLabel: 'T3',
    date: '18 फेब्रु',
    title: 'MPSC संयुक्त गट ब/क सराव ३',
    overallScore: 54.0,
    maxScore: 100,
    overallAccuracy: 58,
    polity_score: 11.5,
    polity_accuracy: 62,
    maharashtra_history_score: 7.0,
    maharashtra_history_accuracy: 52,
    maharashtra_geography_score: 9.5,
    maharashtra_geography_accuracy: 58,
    economy_score: 8.0,
    economy_accuracy: 50,
    general_science_score: 9.0,
    general_science_accuracy: 55,
    current_affairs_score: 10.0,
    current_affairs_accuracy: 62,
    csat_score: 9.5,
    csat_accuracy: 60,
    environment_score: 9.0,
    environment_accuracy: 58,
  },
  {
    testIndex: 4,
    testLabel: 'T4',
    date: '23 फेब्रु',
    title: 'MPSC राज्यसेवा जीएस फुल टेस्ट ४',
    overallScore: 61.5,
    maxScore: 100,
    overallAccuracy: 65,
    polity_score: 13.0,
    polity_accuracy: 68,
    maharashtra_history_score: 8.5,
    maharashtra_history_accuracy: 58,
    maharashtra_geography_score: 11.0,
    maharashtra_geography_accuracy: 65,
    economy_score: 9.5,
    economy_accuracy: 58,
    general_science_score: 10.5,
    general_science_accuracy: 62,
    current_affairs_score: 11.5,
    current_affairs_accuracy: 68,
    csat_score: 11.0,
    csat_accuracy: 66,
    environment_score: 10.5,
    environment_accuracy: 64,
  },
  {
    testIndex: 5,
    testLabel: 'T5',
    date: '28 फेब्रु',
    title: 'MPSC संयुक्त प्रिलिम्स महासराव ५',
    overallScore: 68.0,
    maxScore: 100,
    overallAccuracy: 71,
    polity_score: 14.5,
    polity_accuracy: 74,
    maharashtra_history_score: 10.0,
    maharashtra_history_accuracy: 65,
    maharashtra_geography_score: 12.5,
    maharashtra_geography_accuracy: 72,
    economy_score: 11.0,
    economy_accuracy: 64,
    general_science_score: 11.5,
    general_science_accuracy: 68,
    current_affairs_score: 12.5,
    current_affairs_accuracy: 72,
    csat_score: 12.5,
    csat_accuracy: 72,
    environment_score: 11.5,
    environment_accuracy: 70,
  },
  {
    testIndex: 6,
    testLabel: 'T6',
    date: '05 मार्च',
    title: 'MPSC राज्यसेवा स्पीड मॉक ६',
    overallScore: 73.5,
    maxScore: 100,
    overallAccuracy: 76,
    polity_score: 16.0,
    polity_accuracy: 78,
    maharashtra_history_score: 11.5,
    maharashtra_history_accuracy: 70,
    maharashtra_geography_score: 13.5,
    maharashtra_geography_accuracy: 76,
    economy_score: 12.5,
    economy_accuracy: 70,
    general_science_score: 13.0,
    general_science_accuracy: 74,
    current_affairs_score: 13.5,
    current_affairs_accuracy: 78,
    csat_score: 13.5,
    csat_accuracy: 78,
    environment_score: 12.5,
    environment_accuracy: 74,
  },
  {
    testIndex: 7,
    testLabel: 'T7',
    date: '10 मार्च',
    title: 'MPSC संयुक्त गट क मेगा सराव ७',
    overallScore: 78.5,
    maxScore: 100,
    overallAccuracy: 80,
    polity_score: 17.0,
    polity_accuracy: 82,
    maharashtra_history_score: 12.5,
    maharashtra_history_accuracy: 75,
    maharashtra_geography_score: 14.5,
    maharashtra_geography_accuracy: 80,
    economy_score: 13.5,
    economy_accuracy: 74,
    general_science_score: 14.0,
    general_science_accuracy: 78,
    current_affairs_score: 14.5,
    current_affairs_accuracy: 82,
    csat_score: 14.5,
    csat_accuracy: 82,
    environment_score: 13.5,
    environment_accuracy: 78,
  },
  {
    testIndex: 8,
    testLabel: 'T8',
    date: '15 मार्च',
    title: 'MPSC राज्यसेवा हाय-स्पीड टेस्ट ८',
    overallScore: 82.5,
    maxScore: 100,
    overallAccuracy: 84,
    polity_score: 18.0,
    polity_accuracy: 86,
    maharashtra_history_score: 13.5,
    maharashtra_history_accuracy: 78,
    maharashtra_geography_score: 15.5,
    maharashtra_geography_accuracy: 84,
    economy_score: 14.5,
    economy_accuracy: 78,
    general_science_score: 14.5,
    general_science_accuracy: 82,
    current_affairs_score: 15.0,
    current_affairs_accuracy: 85,
    csat_score: 15.0,
    csat_accuracy: 86,
    environment_score: 14.0,
    environment_accuracy: 82,
  },
  {
    testIndex: 9,
    testLabel: 'T9',
    date: '20 मार्च',
    title: 'MPSC संयुक्त पूर्व अंतिम सराव ९',
    overallScore: 86.0,
    maxScore: 100,
    overallAccuracy: 87,
    polity_score: 18.5,
    polity_accuracy: 89,
    maharashtra_history_score: 14.0,
    maharashtra_history_accuracy: 82,
    maharashtra_geography_score: 16.0,
    maharashtra_geography_accuracy: 87,
    economy_score: 15.0,
    economy_accuracy: 82,
    general_science_score: 15.5,
    general_science_accuracy: 85,
    current_affairs_score: 15.5,
    current_affairs_accuracy: 88,
    csat_score: 15.5,
    csat_accuracy: 89,
    environment_score: 14.5,
    environment_accuracy: 85,
  },
  {
    testIndex: 10,
    testLabel: 'T10',
    date: '25 मार्च',
    title: 'MPSC संपूर्ण अंतिम रंगीत तालीम १० (Grand Mock)',
    overallScore: 89.5,
    maxScore: 100,
    overallAccuracy: 90,
    polity_score: 19.0,
    polity_accuracy: 92,
    maharashtra_history_score: 15.0,
    maharashtra_history_accuracy: 85,
    maharashtra_geography_score: 16.5,
    maharashtra_geography_accuracy: 90,
    economy_score: 15.5,
    economy_accuracy: 85,
    general_science_score: 16.0,
    general_science_accuracy: 88,
    current_affairs_score: 16.0,
    current_affairs_accuracy: 90,
    csat_score: 16.0,
    csat_accuracy: 92,
    environment_score: 15.0,
    environment_accuracy: 88,
  },
];

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  userProgress,
  language,
  onReviewPastTest,
  onStartSubjectPractice,
  onOpenBackupModal,
}) => {
  const isMr = language === 'mr';
  const history = userProgress.history;

  const [exportToast, setExportToast] = useState<string | null>(null);

  const handleTriggerExport = () => {
    if (onOpenBackupModal) {
      onOpenBackupModal();
    } else {
      const { filename, summary } = exportUserDataAsJSON(userProgress);
      setExportToast(
        isMr
          ? `🎉 बॅकअप यशस्वीरीत्या डाऊनलोड झाला! (${filename} — ${summary.totalExams} चाचण्या, ${summary.totalStudySessions} सत्रे, ${summary.totalBookmarkedQuestions} प्रश्न)`
          : `🎉 Backup successfully downloaded! (${filename} — ${summary.totalExams} exams, ${summary.totalStudySessions} logs, ${summary.totalBookmarkedQuestions} bookmarks)`
      );
      setTimeout(() => setExportToast(null), 5000);
    }
  };

  // Chart configuration state
  const [chartMode, setChartMode] = useState<'overall' | 'by_subject' | 'multi_compare'>('multi_compare');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('polity');
  const [metricType, setMetricType] = useState<'score' | 'accuracy'>('accuracy');
  const [windowLimit, setWindowLimit] = useState<number | 'all'>(10);
  const [useSampleData, setUseSampleData] = useState<boolean>(history.length < 2);

  // Radar Chart interactive states
  const [radarScope, setRadarScope] = useState<'prelims_core' | 'all'>('prelims_core');
  const [showRadarBenchmark, setShowRadarBenchmark] = useState<boolean>(true);
  const [showTopperBenchmark, setShowTopperBenchmark] = useState<boolean>(false);
  const [focusedRadarSubject, setFocusedRadarSubject] = useState<SubjectId | null>(null);

  // Active subjects for multi_compare mode (default: core MPSC subjects active)
  const [visibleSubjects, setVisibleSubjects] = useState<Record<string, boolean>>({
    polity: true,
    maharashtra_history: true,
    maharashtra_geography: true,
    general_science: true,
    economy: true,
    csat: true,
    current_affairs: true,
    environment: true,
  });

  const toggleSubjectVisibility = (subId: string) => {
    setVisibleSubjects((prev) => ({
      ...prev,
      [subId]: !prev[subId],
    }));
  };

  const selectAllSubjects = () => {
    const updated: Record<string, boolean> = {};
    SUBJECTS.forEach((s) => { updated[s.id] = true; });
    setVisibleSubjects(updated);
  };

  const selectCoreGSSubjects = () => {
    setVisibleSubjects({
      polity: true,
      maharashtra_history: true,
      maharashtra_geography: true,
      general_science: true,
      economy: true,
      environment: true,
      csat: false,
      current_affairs: false,
    });
  };

  const selectCsatAndCa = () => {
    setVisibleSubjects({
      polity: false,
      maharashtra_history: false,
      maharashtra_geography: false,
      general_science: false,
      economy: false,
      environment: false,
      csat: true,
      current_affairs: true,
    });
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
  const timeSeriesData = useMemo<Record<string, any>[]>(() => {
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

  // Subject-wise accuracy improvement over the evaluated attempts window
  const subjectImprovementTrends = useMemo(() => {
    return SUBJECTS.map((sub) => {
      const validPoints = timeSeriesData
        .filter((d) => d[`${sub.id}_accuracy`] !== undefined)
        .map((d) => ({
          testIndex: d.testIndex,
          testLabel: d.testLabel,
          title: d.title,
          date: d.date,
          accuracy: Number(d[`${sub.id}_accuracy`]),
          score: d[`${sub.id}_score`] !== undefined ? Number(d[`${sub.id}_score`]) : undefined,
        }));

      if (validPoints.length === 0) {
        return null;
      }

      const firstPoint = validPoints[0];
      const latestPoint = validPoints[validPoints.length - 1];
      const startAccuracy = firstPoint.accuracy;
      const endAccuracy = latestPoint.accuracy;
      const improvement = endAccuracy - startAccuracy;
      const maxAccuracy = Math.max(...validPoints.map((p) => p.accuracy));
      const minAccuracy = Math.min(...validPoints.map((p) => p.accuracy));

      return {
        subject: sub,
        startAccuracy,
        endAccuracy,
        improvement,
        maxAccuracy,
        minAccuracy,
        attemptsCount: validPoints.length,
        points: validPoints,
        color: SUBJECT_COLORS[sub.id] || '#d97706',
      };
    }).filter(Boolean) as {
      subject: (typeof SUBJECTS)[number];
      startAccuracy: number;
      endAccuracy: number;
      improvement: number;
      maxAccuracy: number;
      minAccuracy: number;
      attemptsCount: number;
      points: { testIndex: number; testLabel: string; title: string; date: string; accuracy: number; score?: number }[];
      color: string;
    }[];
  }, [timeSeriesData]);

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
        const shortName = RADAR_SUBJECT_NAMES[subId]?.[isMr ? 'mr' : 'en'] || subId;
        const fullName = meta ? (isMr ? meta.nameMr : meta.nameEn) : subId;
        const advice = SUBJECT_ADVICE[subId]?.[isMr ? 'mr' : 'en'] || '';

        return {
          id: subId,
          subject: shortName,
          fullName,
          proficiency: sample.proficiency,
          benchmark: 65,
          topperTarget: 80,
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
      const shortName = RADAR_SUBJECT_NAMES[subId]?.[isMr ? 'mr' : 'en'] || subId;
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
        topperTarget: 80,
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
  
  // Sorted with the weakest subjects at the very top for urgent focus
  const weakList = useMemo(() => {
    return [...radarData]
      .filter((r) => r.proficiency < 50 || (r.attempts > 0 && r.proficiency < 65))
      .sort((a, b) => a.proficiency - b.proficiency);
  }, [radarData]);

  const criticalWeakestSubject = useMemo(() => {
    if (weakList.length === 0) return null;
    return weakList[0];
  }, [weakList]);

  const radarSummaryStats = useMemo(() => {
    if (radarData.length === 0) return null;
    const totalProf = radarData.reduce((acc, r) => acc + r.proficiency, 0);
    const avgProf = Math.round(totalProf / radarData.length);
    const sorted = [...radarData].sort((a, b) => b.proficiency - a.proficiency);
    const topSubject = sorted[0];
    const weakestSubject = sorted[sorted.length - 1];
    const clearedCutoffCount = radarData.filter((r) => r.proficiency >= 65).length;
    return {
      avgProf,
      topSubject,
      weakestSubject,
      clearedCutoffCount,
      totalCount: radarData.length,
    };
  }, [radarData]);

  const focusedSubjectItem = useMemo(() => {
    if (!focusedRadarSubject) return null;
    return radarData.find((r) => r.id === focusedRadarSubject) || null;
  }, [focusedRadarSubject, radarData]);


  return (
    <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8">
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

        <div className="flex items-center gap-2 flex-wrap self-start sm:self-center">
          {/* JSON Export Button */}
          <button
            type="button"
            onClick={handleTriggerExport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-stone-800 hover:text-stone-950 border border-stone-300 hover:border-amber-500 hover:bg-amber-50/40 transition-all cursor-pointer shadow-2xs"
            title={isMr ? "चाचण्या, स्वाध्याय सत्रे आणि बुकमार्क्सचा बॅकअप JSON फाइलमध्ये डाऊनलोड करा" : "Export your exam history, study logs, and bookmarks as JSON"}
          >
            <Download className="w-3.5 h-3.5 text-amber-600" />
            <span>{isMr ? '💾 बॅकअप JSON' : '💾 Export JSON'}</span>
          </button>

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
                  ? (isMr ? '🌟 नमुना प्रगती आलेख' : '🌟 Sample Mode')
                  : (isMr ? 'माझा प्रत्यक्ष डेटा' : 'Show Live Data')}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Temporary Export Notification Toast Banner */}
      {exportToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <div className="flex-1">{exportToast}</div>
        </div>
      )}

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
      {/* PRIMARY FEATURE: RECHARTS LINE CHART - SUBJECT-WISE PERFORMANCE TREND     */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-7 space-y-6">
        {/* Chart Header & Interactive Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-600" />
                <span>
                  {isMr ? 'विषयनिहाय कामगिरी कल (Subject-wise Performance Trend)' : 'Subject-wise Performance Trend'}
                </span>
              </h2>
              <span className="text-[11px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full">
                {useSampleData && history.length < 2
                  ? (isMr ? '📊 १० चाचण्यांचा नमुना कल' : '📊 10-Attempt Benchmark Trend')
                  : (isMr ? `🎯 मागील ${timeSeriesData.length} चाचण्या` : `🎯 Last ${timeSeriesData.length} Attempts`)}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {isMr 
                ? 'प्रत्येक MPSC विषयातील मागील १० चाचण्यांमधील अचूकतेमधील सातत्यपूर्ण सुधारणा (Accuracy Improvement Over Last 10 Attempts).'
                : "Tracking your accuracy improvement across each MPSC subject over your last 10 attempts using Recharts."}
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
          <div className="space-y-2 pt-1">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-stone-700 shrink-0 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-stone-500" />
                <span>{isMr ? 'आलेखामध्ये दर्शवायचे विषय:' : 'Active Subject Lines:'}</span>
              </span>
              <div className="flex items-center gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={selectAllSubjects}
                  className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold transition-all cursor-pointer"
                >
                  {isMr ? 'सर्व विषय' : 'Select All'}
                </button>
                <button
                  type="button"
                  onClick={selectCoreGSSubjects}
                  className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold transition-all cursor-pointer"
                >
                  {isMr ? 'प्रमुख GS' : 'Core GS'}
                </button>
                <button
                  type="button"
                  onClick={selectCsatAndCa}
                  className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold transition-all cursor-pointer"
                >
                  {isMr ? 'CSAT व घडामोडी' : 'CSAT & CA'}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs">
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
                        : 'bg-stone-50 text-stone-400 border-stone-200 line-through opacity-70 hover:opacity-100'
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
          </div>
        )}

        {/* The Recharts LineChart Canvas */}
        <div className="h-80 sm:h-96 w-full pt-2">
          {timeSeriesData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeSeriesData}
                margin={{ top: 15, right: 25, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <Legend
                  verticalAlign="top"
                  height={34}
                  wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }}
                />
                
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

        {/* Dedicated Subject-wise Accuracy Improvement Over Last 10 Attempts Grid */}
        <div className="pt-5 border-t border-stone-100 space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>
                  {isMr
                    ? 'मागील १० चाचण्यांमधील प्रत्येक विषयाची अचूकता सुधारणा (Subject Accuracy Improvement)'
                    : 'Accuracy Improvement Over Last 10 Attempts for Each MPSC Subject'}
                </span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {isMr
                  ? 'सुरुवातीची चाचणी विरुद्ध ताजी चाचणी अचूकता (Start vs Latest Attempt Accuracy & Net Gain %)'
                  : 'Start attempt vs latest attempt accuracy comparison showing net % gain for each MPSC subject.'}
              </p>
            </div>
            <span className="text-[11px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200/80 px-2.5 py-1 rounded-lg self-start sm:self-auto flex items-center gap-1.5 shadow-2xs">
              <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
              <span>{isMr ? `${subjectImprovementTrends.length} विषय विश्लेषित` : `${subjectImprovementTrends.length} Subjects Evaluated`}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {subjectImprovementTrends.map((item) => {
              const isPositive = item.improvement > 0;
              const isSteady = item.improvement === 0;
              const isSelected = chartMode === 'by_subject' && selectedSubject === item.subject.id;

              return (
                <div
                  key={item.subject.id}
                  onClick={() => {
                    setSelectedSubject(item.subject.id as SubjectId);
                    setChartMode('by_subject');
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-400/40 shadow-xs'
                      : 'border-stone-200 bg-stone-50/70 hover:bg-white hover:border-amber-300 hover:shadow-xs'
                  }`}
                  title={isMr ? `${item.subject.nameMr} आलेखामध्ये पाहण्यासाठी क्लिक करा` : `Click to isolate ${item.subject.nameEn} line`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-1.5 mb-2.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-3 h-3 rounded-full shrink-0 shadow-2xs"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-bold text-xs text-stone-900 truncate">
                          {isMr ? item.subject.nameMr : item.subject.nameEn}
                        </span>
                      </div>

                      <span
                        className={`text-[11px] font-black px-2 py-0.5 rounded-md font-mono shrink-0 flex items-center gap-0.5 ${
                          isPositive
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : isSteady
                            ? 'bg-stone-200 text-stone-700'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {isPositive && <TrendingUp className="w-3 h-3" />}
                        {isPositive ? `+${item.improvement}%` : `${item.improvement}%`}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-stone-600">
                        <span>{isMr ? 'सुरुवात ➔ ताजी:' : 'Start ➔ Latest:'}</span>
                        <span className="font-mono font-bold text-stone-900">
                          {item.startAccuracy}% ➔ <span className={isPositive ? 'text-emerald-700 font-black' : ''}>{item.endAccuracy}%</span>
                        </span>
                      </div>

                      {/* Progress bar visualizing latest accuracy with subject color */}
                      <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(100, Math.max(0, item.endAccuracy))}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-3 mt-2 border-t border-stone-200/60">
                    <span className="font-medium">
                      {isMr ? `सर्वोच्च: ${item.maxAccuracy}%` : `Peak: ${item.maxAccuracy}%`}
                    </span>
                    <span className="text-amber-700 font-bold group-hover:underline flex items-center gap-0.5 text-[11px]">
                      <span>{isMr ? 'आलेख पहा' : 'View line'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
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
                ? '३६०° रडार आलेखाद्वारे MPSC कट-ऑफ (६५%) व टॉपर लक्ष्याशी (८०%) तुलना करून कमकुवत विषय (Weak Areas) त्वरित ओळखा व सराव करा.' 
                : '360° visual radar chart comparing your subject mastery against the 65% safe cutoff & 80% topper standard to pinpoint weak areas.'}
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
              title={isMr ? '६५% कट-ऑफ सुरक्षित रेषा' : '65% Safe Cutoff Target Line'}
            >
              <span className={`w-2 h-2 rounded-full ${showRadarBenchmark ? 'bg-emerald-600 animate-pulse' : 'bg-stone-400'}`}></span>
              <span>{isMr ? '६५% कट-ऑफ लक्ष्य' : '65% Cutoff'}</span>
            </button>

            {/* Topper Standard Benchmark Toggle */}
            <button
              type="button"
              onClick={() => setShowTopperBenchmark(!showTopperBenchmark)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                showTopperBenchmark
                  ? 'bg-sky-50 text-sky-800 border-sky-300'
                  : 'bg-stone-50 text-stone-600 border-stone-200'
              }`}
              title={isMr ? '८०% टॉपर सरासरी रेषा' : '80% Topper League Line'}
            >
              <span className={`w-2 h-2 rounded-full ${showTopperBenchmark ? 'bg-sky-600 animate-pulse' : 'bg-stone-400'}`}></span>
              <span>{isMr ? '८०% टॉपर उद्दिष्ट' : '80% Topper'}</span>
            </button>

            {/* Sample vs Real Data Indicator if limited tests */}
            {history.length < 2 && (
              <button
                type="button"
                onClick={() => setUseSampleData(!useSampleData)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  useSampleData
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : 'bg-stone-100 text-stone-700 border-stone-300'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{useSampleData ? (isMr ? 'नमुना डेटा (Sample)' : 'Sample Data') : (isMr ? 'माझा डेटा' : 'My Data')}</span>
              </button>
            )}
          </div>
        </div>

        {/* 4-Stat Diagnostic Ribbon */}
        {radarSummaryStats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/90">
              <span className="text-[11px] font-bold text-amber-900 block">
                {isMr ? '📊 सरासरी विषय प्रवीणता' : 'Average Subject Accuracy'}
              </span>
              <span className="text-xl font-black text-amber-950 font-mono block mt-0.5">
                {radarSummaryStats.avgProf}%
              </span>
              <span className="text-[10px] text-amber-800 block mt-0.5">
                {isMr ? `${radarSummaryStats.totalCount} विषयांची एकत्रित सरासरी` : `Average of ${radarSummaryStats.totalCount} subjects`}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/90">
              <span className="text-[11px] font-bold text-emerald-900 block">
                {isMr ? '🌟 सर्वोच्च कामगिरी विषय' : 'Top Performing Subject'}
              </span>
              <span className="text-sm font-black text-emerald-950 truncate block mt-0.5" title={radarSummaryStats.topSubject.fullName}>
                {radarSummaryStats.topSubject.fullName}
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-700 block mt-0.5">
                {radarSummaryStats.topSubject.proficiency}% {isMr ? 'अचूकता' : 'accuracy'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200/90">
              <span className="text-[11px] font-bold text-rose-900 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />
                <span>{isMr ? '⚠️ सर्वाधिक कमजोर विषय' : 'Primary Weak Area'}</span>
              </span>
              <span className="text-sm font-black text-rose-950 truncate block mt-0.5" title={radarSummaryStats.weakestSubject.fullName}>
                {radarSummaryStats.weakestSubject.fullName}
              </span>
              <span className="text-[10px] font-mono font-bold text-rose-700 block mt-0.5">
                {radarSummaryStats.weakestSubject.proficiency}% ({radarSummaryStats.weakestSubject.gap}% {isMr ? 'तूट' : 'deficit'})
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-100/80 border border-stone-200">
              <span className="text-[11px] font-bold text-stone-700 block">
                {isMr ? '🎯 कट-ऑफ सुरक्षित विषय' : 'Cutoff Cleared (≥65%)'}
              </span>
              <span className="text-xl font-black text-stone-900 font-mono block mt-0.5">
                {radarSummaryStats.clearedCutoffCount} / {radarSummaryStats.totalCount}
              </span>
              <span className="text-[10px] text-stone-500 block mt-0.5">
                {isMr ? '६५% पेक्षा जास्त अचूकतेचे विषय' : 'Subjects exceeding benchmark'}
              </span>
            </div>
          </div>
        )}

        {/* 2-Column Grid: Left: RadarChart, Right: Strengths & Weaknesses Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: RECHARTS RADAR CHART CANVAS */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="h-80 sm:h-96 md:h-[420px] w-full relative">
              {radarData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="66%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={({ x, y, textAnchor, payload }: any) => {
                        const item = radarData.find((d) => d.subject === payload.value);
                        const isSelected = focusedRadarSubject === item?.id;
                        const isWeak = item?.status === 'weak';
                        return (
                          <text
                            x={x}
                            y={y}
                            textAnchor={textAnchor}
                            fill={isSelected ? '#d97706' : isWeak ? '#e11d48' : '#334155'}
                            fontSize={11}
                            fontWeight={isSelected || isWeak ? 800 : 600}
                            className="cursor-pointer transition-colors hover:fill-amber-600 select-none"
                            onClick={() => {
                              if (item) {
                                setFocusedRadarSubject(focusedRadarSubject === item.id ? null : item.id);
                              }
                            }}
                          >
                            {isWeak ? `⚠️ ${payload.value}` : payload.value}
                          </text>
                        );
                      }} 
                    />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, 100]} 
                      ticks={[25, 50, 65, 80, 100]}
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
                        fillOpacity={0.06}
                      />
                    )}

                    {/* Topper Standard Benchmark Radar (80%) */}
                    {showTopperBenchmark && (
                      <Radar
                        name={isMr ? 'टॉपर उद्दिष्ट (८०%)' : 'Topper Target (80%)'}
                        dataKey="topperTarget"
                        stroke="#0284c7"
                        strokeDasharray="3 3"
                        strokeWidth={1.5}
                        fill="#0ea5e9"
                        fillOpacity={0.05}
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
                          <g 
                            key={payload.id} 
                            className="cursor-pointer" 
                            onClick={() => setFocusedRadarSubject(focusedRadarSubject === payload.id ? null : payload.id)}
                          >
                            {isWeak && (
                              <circle
                                cx={cx}
                                cy={cy}
                                r={10}
                                fill="none"
                                stroke="#e11d48"
                                strokeWidth={1.5}
                                strokeDasharray="2 2"
                                className="animate-pulse"
                              />
                            )}
                            <circle
                              cx={cx}
                              cy={cy}
                              r={isSelected ? 7.5 : 5}
                              fill={fill}
                              stroke="#ffffff"
                              strokeWidth={2}
                              className="transition-all hover:scale-125"
                            />
                          </g>
                        );
                      }}
                      activeDot={{ r: 8, fill: '#f59e0b', stroke: '#ffffff', strokeWidth: 2 }}
                    />

                    {/* Custom Radar Tooltip */}
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item: RadarSubjectItem = payload[0].payload;
                          return (
                            <div className="bg-stone-950 text-stone-100 p-3.5 rounded-xl text-xs shadow-2xl border border-stone-800 space-y-2 min-w-[240px] max-w-[280px]">
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
                                  <span>{isMr ? 'कट-ऑफ उद्दिष्ट:' : 'Cutoff Target:'}</span>
                                  <span className="font-mono text-stone-200">
                                    {item.benchmark}% ({item.gap >= 0 ? `+${item.gap}%` : `${item.gap}%`})
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-stone-400 text-[11px]">
                                  <span>{isMr ? 'टॉपर उद्दिष्ट:' : 'Topper Target:'}</span>
                                  <span className="font-mono text-sky-300">
                                    {item.topperTarget}% ({item.proficiency - item.topperTarget >= 0 ? `+${item.proficiency - item.topperTarget}%` : `${item.proficiency - item.topperTarget}%`})
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
                  <span>{isMr ? '६५% कट-ऑफ लक्ष्य' : '65% Cutoff'}</span>
                </span>
              )}
              {showTopperBenchmark && (
                <span className="flex items-center gap-1.5 text-stone-700">
                  <span className="w-3 h-3 rounded-full bg-sky-500 border border-sky-600 border-dashed"></span>
                  <span>{isMr ? '८०% टॉपर उद्दिष्ट' : '80% Topper'}</span>
                </span>
              )}
              <span className="text-stone-400 text-[11px]">
                {isMr ? '💡 आलेख बिंदूवर क्लिक करून विषय निवडा' : '💡 Click vertex to focus subject'}
              </span>
            </div>
          </div>

          {/* Column 2: STRENGTHS & WEAKNESSES IDENTIFICATION MATRIX */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
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

              {/* 🚨 Priority Weak Area Rapid Recovery Card */}
              {criticalWeakestSubject && (
                <div className="p-4 rounded-xl bg-gradient-to-br from-rose-50/90 via-white to-amber-50/50 border-2 border-rose-300/80 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
                      </span>
                      <span className="text-xs font-black text-rose-950 uppercase tracking-wider">
                        {isMr ? '🚨 सर्वात कमजोर विषय — तातडीने सुधारणा आवश्यक' : '🚨 Primary Weak Area — Priority Action'}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-600 text-white">
                      {criticalWeakestSubject.proficiency}% ({criticalWeakestSubject.gap}% {isMr ? 'तूट' : 'deficit'})
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-stone-900 flex items-center justify-between">
                      <span>{criticalWeakestSubject.fullName}</span>
                      <span className="text-xs text-rose-700 font-normal">
                        {criticalWeakestSubject.incorrect} {isMr ? 'चुका' : 'mistakes'} / {criticalWeakestSubject.attempts} {isMr ? 'एकूण' : 'total'}
                      </span>
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      💡 {criticalWeakestSubject.advice}
                    </p>
                  </div>

                  {onStartSubjectPractice && (
                    <button
                      type="button"
                      onClick={() => onStartSubjectPractice(criticalWeakestSubject.id)}
                      className="w-full py-2.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer hover:scale-[1.01]"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>
                        {isMr 
                          ? `⚡ या कमजोर विषयाची सराव चाचणी सुरू करा (${criticalWeakestSubject.subject})` 
                          : `⚡ Start Targeted Practice Test for ${criticalWeakestSubject.subject}`}
                      </span>
                    </button>
                  )}
                </div>
              )}

              {/* Matrix 3 Categories */}
              <div className="space-y-3.5">
                {/* 1. CRITICAL WEAKNESSES (< 50% or below cutoff 65%) */}
                <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200/90 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span className="text-xs font-bold text-rose-950">
                        {isMr ? 'कच्चे विषय / कमकुवत दुवे (< ६५% कट-ऑफ)' : 'Weak / Below Benchmark Areas (< 65%)'}
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
                              title={isMr ? `${s.fullName} चा सराव सुरू करा` : `Practice ${s.fullName}`}
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
                      <span>{isMr ? 'उत्कृष्ट! सर्व विषय ६५% कट-ऑफ पेक्षा जास्त अचूकतेवर आहेत.' : 'Great job! All subjects at or above safe level.'}</span>
                    </div>
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

                {/* 3. STRENGTHS (>= 70%) */}
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
        <div className="p-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              {isMr ? 'चाचण्यांचा इतिहास (Past Tests History)' : 'Test Attempt History'}
            </h2>
            <p className="text-xs text-stone-500">
              {isMr ? 'आधी सोडवलेल्या कोणत्याही चाचणीचे उत्तरपत्र व विश्लेषण पुन्हा पहा.' : 'Review answers and solutions from your previously attempted tests.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTriggerExport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-colors shadow-2xs cursor-pointer"
              title={isMr ? "तुमचा सर्व परीक्षा इतिहास, अभ्यास नोंदी व बुकमार्क्स JSON मध्ये डाउनलोड करा" : "Export your test history, study logs, and bookmarks as JSON"}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isMr ? '💾 सर्व डेटा JSON बॅकअप' : '💾 Export JSON Backup'}</span>
            </button>
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

      {/* ========================================================================= */}
      {/* LOCAL DATA BACKUP & SAFETY SECTION                                       */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <HardDrive className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-stone-900">
                  {isMr ? 'स्थानिक डेटा बॅकअप व सुरक्षा' : 'Local Data Backup & Safety'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                  {isMr ? '🔒 सुरक्षित ऑफलाइन फॉरमॅट (.JSON)' : '🔒 Offline Format (.JSON)'}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                {isMr
                  ? 'तुमचा परीक्षेचा इतिहास, स्वाध्याय सत्रे, बुकमार्क केलेले प्रश्न आणि वैयक्तिक टिपा एका क्लिकवर JSON फाइलमध्ये डाउनलोड करा.'
                  : 'Export your entire exam history, study logs, bookmarks, and notes as a JSON file to safely store on your machine.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap self-start sm:self-center">
            {onOpenBackupModal && (
              <button
                type="button"
                onClick={onOpenBackupModal}
                className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors cursor-pointer"
              >
                {isMr ? '📂 प्रगत बॅकअप / रिस्टोअर' : '📂 Manage & Restore'}
              </button>
            )}

            <button
              type="button"
              onClick={handleTriggerExport}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-stone-950" />
              <span>{isMr ? '💾 JSON बॅकअप डाऊनलोड करा' : '💾 Download JSON Backup'}</span>
            </button>
          </div>
        </div>

        {/* Current Stored Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-0.5">
              {isMr ? 'पूर्ण चाचण्या' : 'Exams Solved'}
            </div>
            <div className="text-xl font-black text-stone-900 font-mono">
              {history.length}
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">
              {isMr ? 'सर्व निकाल व उत्तरपत्रिका' : 'All results & answer sheets'}
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-0.5">
              {isMr ? 'स्वाध्याय सत्रे' : 'Study Logs'}
            </div>
            <div className="text-xl font-black text-indigo-700 font-mono">
              {(userProgress.studyLogs || []).length}
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">
              {isMr ? 'अभ्यास वेळ व प्रश्न संख्या' : 'Tracked hours & solved Qs'}
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-0.5">
              {isMr ? 'जतन प्रश्न व नियम' : 'Bookmarks'}
            </div>
            <div className="text-xl font-black text-emerald-700 font-mono">
              {(userProgress.bookmarkedQuestionIds || []).length + (userProgress.bookmarkedRuleIds || []).length}
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">
              {isMr ? 'कठीण प्रश्न व नियम संच' : 'Saved for quick revision'}
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-0.5">
              {isMr ? 'वैयक्तिक टिपा' : 'Personal Notes'}
            </div>
            <div className="text-xl font-black text-amber-700 font-mono">
              {Object.keys(userProgress.notes || {}).length}
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">
              {isMr ? 'प्रश्नांवर लिहिलेल्या नोट्स' : 'Custom student annotations'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
