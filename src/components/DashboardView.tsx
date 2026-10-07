import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Flame, 
  Clock, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Sparkles, 
  ChevronRight, 
  Play, 
  ShieldCheck,
  RotateCcw,
  Zap,
  Bookmark,
  Cloud,
  Download,
  UploadCloud,
  PlusCircle,
  Newspaper,
  FileText,
  History,
  CheckCircle2,
  Eye,
  ArrowRight,
  Calendar,
  AlertCircle,
  Timer,
  FileJson,
  Scale,
  SpellCheck,
  Trophy,
  Users
} from 'lucide-react';
import { ExamPatternId, SubjectId, UserProgress, Question, ExamResult, StudySessionLog } from '../types';
import { SUBJECTS } from '../data/subjects';
import { MPSC_QUESTIONS } from '../data/mpscQuestions';
import { WeeklyGoalCard } from './WeeklyGoalCard';
import { LeaderboardCard } from './LeaderboardCard';
import { ExamCountdownCard } from './ExamCountdownCard';
import { MpscHeroVisual } from './MpscHeroVisual';
import { AspirantInspirationCard } from './AspirantInspirationCard';
import { MpscCommandCenter } from './MpscCommandCenter';
import { MpscHallOfFameAndPredictor } from './MpscHallOfFameAndPredictor';
import { MpscBookShelf } from './MpscBookShelf';
import { isFirestoreQuotaExceeded } from '../services/firestoreSync';
import { exportUserDataAsJSON } from '../utils/exportImportBackup';
import { DailyChallengeModal } from './DailyChallengeModal';

const SUBJECT_BOOK_COVERS: Record<string, string> = {
  marathi_grammar: '/open_reference_book.jpg',
  english_grammar: '/mpsc_textbooks.jpg',
  maharashtra_history: '/vintage_reference_books.jpg',
  maharashtra_geography: '/mpsc_textbooks.jpg',
  polity: '/constitution_of_india.jpg',
  general_science: '/stack_of_books.jpg',
  csat: '/pile_of_books.jpg',
  economy: '/stack_of_books.jpg',
  environment: '/open_reference_book.jpg',
  current_affairs: '/library_books.jpg',
};

interface DashboardViewProps {
  userProgress: UserProgress;
  language: 'mr' | 'en';
  currentUserId?: string;
  currentUserName?: string;
  onStartExam: (patternId: ExamPatternId, subjectId?: any, title?: string) => void;
  onOpenBookmarks: () => void;
  onOpenAnalytics: () => void;
  onReviewExamResult?: (result: ExamResult) => void;
  onOpenGrammarRules?: () => void;
  onOpenVocabulary?: () => void;
  onOpenLogin?: () => void;
  onUpdateWeeklyGoals: (hours: number, questions: number) => void;
  onLogStudySession: (title: string, durationMinutes: number, questionsSolved: number, notes?: string) => void;
  onOpenCloudSync?: () => void;
  onOpenAddQuestion?: () => void;
  onOpenHardQuestionsHub?: (subjectId?: SubjectId) => void;
  onOpenPyqHub?: () => void;
  onOpenBackupModal?: () => void;
  onOpenExamCountdown?: () => void;
  onOpenInformationHub?: () => void;
  onOpenGroupCTalathiTestSeries?: (initialView?: 'sets' | 'syllabus') => void;
  onFetchData?: () => Promise<void>;
  onTriggerSync?: () => Promise<void>;
  questionsCount?: number;
  questionsPool?: Question[];
  isFetching?: boolean;
  isSyncing?: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userProgress,
  language,
  currentUserId,
  currentUserName,
  onStartExam,
  onOpenBookmarks,
  onOpenAnalytics,
  onReviewExamResult,
  onOpenGrammarRules,
  onOpenVocabulary,
  onOpenLogin,
  onUpdateWeeklyGoals,
  onLogStudySession,
  onOpenCloudSync,
  onOpenAddQuestion,
  onOpenHardQuestionsHub,
  onOpenBackupModal,
  onOpenExamCountdown,
  onOpenInformationHub,
  onOpenPyqHub,
  onOpenGroupCTalathiTestSeries,
  onFetchData,
  onTriggerSync,
  questionsCount = 75,
  questionsPool,
  isFetching = false,
  isSyncing = false,
}) => {
  const isMr = language === 'mr';
  const pool = questionsPool && questionsPool.length > 0 ? questionsPool : MPSC_QUESTIONS;

  // Calculate high-level stats
  const totalTests = userProgress.history.length;
  const totalAttempted = userProgress.history.reduce((acc, h) => acc + h.attemptedCount, 0);
  const totalCorrect = userProgress.history.reduce((acc, h) => acc + h.correctCount, 0);
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  const recentTest = userProgress.history[0];

  // Weak questions for targeted revision
  const wrongQuestionIds = new Set<string>();
  userProgress.history.forEach((h) => {
    Object.entries(h.answers).forEach(([qId, choice]) => {
      const q = pool.find((item) => item.id === qId);
      if (q && q.correctAnswerIndex !== choice) {
        wrongQuestionIds.add(qId);
      }
    });
  });

  // Recent Activity computation: latest 5 completed exams & study sessions
  const [activityFilter, setActivityFilter] = useState<'all' | 'exams' | 'sessions'>('all');
  const [exportSuccessMsg, setExportSuccessMsg] = useState<string | null>(null);
  const [showDailyChallengeModal, setShowDailyChallengeModal] = useState<boolean>(false);

  const handleRecentActivityExport = () => {
    if (onOpenBackupModal) {
      onOpenBackupModal();
    } else {
      const { filename, summary } = exportUserDataAsJSON(userProgress);
      setExportSuccessMsg(
        isMr 
          ? `🎉 बॅकअप यशस्वीरीत्या डाऊनलोड झाला! (${filename} — ${summary.totalExams} चाचण्या, ${summary.totalStudySessions} अभ्यास सत्रे, ${summary.totalBookmarkedQuestions} बुकमार्क्स)` 
          : `🎉 Backup downloaded! (${filename} — ${summary.totalExams} exams, ${summary.totalStudySessions} study logs, ${summary.totalBookmarkedQuestions} bookmarks)`
      );
      setTimeout(() => setExportSuccessMsg(null), 5000);
    }
  };

  interface ActivityItem {
    type: 'exam' | 'session';
    id: string;
    title: string;
    timestamp: number;
    dateFormatted: string;
    examResult?: ExamResult;
    studyLog?: StudySessionLog;
  }

  const recentActivities = useMemo(() => {
    const list: ActivityItem[] = [];

    // Add completed exams from history
    userProgress.history.forEach((res) => {
      const ts = res.timestamp || (res.date ? new Date(res.date).getTime() : 0);
      list.push({
        type: 'exam',
        id: `exam_${res.sessionId}`,
        title: res.title,
        timestamp: ts || Date.now(),
        dateFormatted: res.date || (ts ? new Date(ts).toLocaleDateString(isMr ? 'mr-IN' : 'en-IN') : ''),
        examResult: res,
      });
    });

    // Add study sessions from studyLogs
    (userProgress.studyLogs || []).forEach((log) => {
      list.push({
        type: 'session',
        id: `session_${log.id}`,
        title: log.title,
        timestamp: log.timestamp || 0,
        dateFormatted: log.dateStr || (log.timestamp ? new Date(log.timestamp).toLocaleDateString(isMr ? 'mr-IN' : 'en-IN') : ''),
        studyLog: log,
      });
    });

    // Sort descending by timestamp
    list.sort((a, b) => b.timestamp - a.timestamp);

    // Apply filter if selected
    if (activityFilter === 'exams') {
      return list.filter((item) => item.type === 'exam').slice(0, 5);
    }
    if (activityFilter === 'sessions') {
      return list.filter((item) => item.type === 'session').slice(0, 5);
    }
    return list.slice(0, 5);
  }, [userProgress.history, userProgress.studyLogs, activityFilter, isMr]);

  const getPatternBadge = (patternId: ExamPatternId) => {
    switch (patternId) {
      case 'rajyaseva_gs':
        return isMr ? '🎯 राज्यसेवा GS' : '🎯 Rajyaseva GS';
      case 'combine_group_b_c':
        return isMr ? '⚡ संयुक्त गट-ब व क' : '⚡ Combine Group B & C';
      case 'csat_booster':
        return isMr ? '📊 CSAT सराव' : '📊 CSAT Booster';
      case 'current_affairs_2026':
        return isMr ? '🌐 चालू घडामोडी' : '🌐 Current Affairs';
      case 'maharashtra_special':
        return isMr ? '🚩 महाराष्ट्र विशेष' : '🚩 Maharashtra Special';
      case 'daily_10_challenge':
        return isMr ? '📅 दैनिक १० आव्हान' : '📅 Daily 10 Challenge';
      case 'hard_challenge':
        return isMr ? '🔥 कठीण प्रश्न सराव' : '🔥 Hard Challenge';
      default:
        return isMr ? '📝 सराव चाचणी' : '📝 Practice Test';
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    if (!timestamp) return '';
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMin < 1) return isMr ? 'आत्ताच' : 'Just now';
    if (diffMin < 60) return isMr ? `${diffMin} मिनिटांपूर्वी` : `${diffMin}m ago`;
    if (diffHours < 24) return isMr ? `${diffHours} तासांपूर्वी` : `${diffHours}h ago`;
    if (diffDays === 1) return isMr ? 'काल' : 'Yesterday';
    if (diffDays < 7) return isMr ? `${diffDays} दिवसांपूर्वी` : `${diffDays}d ago`;
    return new Date(timestamp).toLocaleDateString(isMr ? 'mr-IN' : 'en-IN', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8">
      {/* Login Prompt Banner if not logged in */}
      {!currentUserId && onOpenLogin && (
        <div className="bg-gradient-to-r from-amber-950/60 via-stone-900 to-amber-950/60 border border-amber-500/40 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-md">
          <div className="flex items-center gap-3 text-stone-200">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-stone-100 text-sm">
                {isMr ? 'आपल्या अभ्यासाची प्रगती व गुण सेव्ह करण्यासाठी लॉगिन करा' : 'Sign in to safely sync your study progress and test scores'}
              </p>
              <p className="text-stone-400 text-xs">
                {isMr ? 'Google किंवा ईमेल द्वारे १ सेकंदात लॉगिन करा. मोबाईल व लॅपटॉपवर एकाच वेळी अभ्यास सुरक्षित ठेवा.' : '1-Click Google sign in or free registration to access your data from anywhere.'}
              </p>
            </div>
          </div>
          <button
            onClick={onOpenLogin}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-lg transition-all shrink-0 cursor-pointer shadow-sm text-xs"
          >
            {isMr ? 'लॉगिन पेज उघडा ➜' : 'Go to Login Page ➜'}
          </button>
        </div>
      )}

      {/* Aspirant Hero Greeting & Momentum Banner with Impressive Visual */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-stone-100 p-6 sm:p-8 lg:p-10 border border-amber-500/30 shadow-2xl">
        {/* Subtle decorative background aura */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading, Info, Streak & Primary CTA Buttons */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-sm">
              <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-pulse" />
              <span>
                {isMr 
                  ? `${userProgress.streakDays} दिवसांचे निरंतर अध्ययन सातत्य!` 
                  : `${userProgress.streakDays} Days Consistent Practice Streak!`}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {isMr ? 'एमपीएससी २०२५-२६ तयारी आणि सराव परीक्षा' : 'Crack MPSC 2025-26 with Precision'}
            </h1>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              {isMr 
                ? 'राज्यसेवा (राजपत्रित वर्ग-१ व वर्ग-२) आणि संयुक्त गट-ब व क परीक्षांसाठी वस्तुनिष्ठ सराव चाचण्या, १/४ नकारात्मक गुणांकनासह रिअल टाइम परीक्षा पद्धती आणि अचूक विश्लेषण.'
                : 'Timed mock tests for Rajyaseva and Combine exams with real CBT palette, 1/4 negative marking, bilingual explanations, and deep analytics.'}
            </p>

            <div className="flex items-center gap-3 pt-2 flex-wrap">
              <button
                id="btn-quick-daily-challenge"
                onClick={() => setShowDailyChallengeModal(true)}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-sm flex items-center gap-2 shadow-md hover:shadow-amber-500/25 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4 fill-stone-950" />
                <span>{isMr ? 'दैनिक १० मिनिटांचे चॅलेंज सोडवा' : 'Take Daily 10-Min Challenge'}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-stone-950/20 text-stone-950">
                  {isMr ? 'GS • इंग्रजी • मराठी' : 'GS • Eng • Mar'}
                </span>
              </button>

              {userProgress.bookmarkedQuestionIds.length > 0 && (
                <button
                  onClick={onOpenBookmarks}
                  className="px-4 py-3 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <Bookmark className="w-4 h-4 text-amber-400" />
                  <span>
                    {isMr ? 'जतन केलेले प्रश्न' : 'Saved Questions'} ({userProgress.bookmarkedQuestionIds.length})
                  </span>
                </button>
              )}

              {onOpenGrammarRules && (
                <button
                  id="btn-hero-grammar-rules"
                  onClick={onOpenGrammarRules}
                  className="px-4 py-3 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 text-indigo-200 border border-indigo-500/40 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                >
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>{isMr ? 'मराठी व इंग्रजी व्याकरण नियम' : 'Grammar Rules & Shortcuts'}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400 text-stone-950 font-extrabold uppercase">
                    {isMr ? '१५५ नियम 🏆' : '155 Rules'}
                  </span>
                </button>
              )}

              {onOpenVocabulary && (
                <button
                  id="btn-hero-vocabulary"
                  onClick={onOpenVocabulary}
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-950/80 to-stone-900 hover:from-emerald-900/80 hover:to-stone-850 text-emerald-200 border border-emerald-500/40 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                  title={isMr ? "इंग्रजी-मराठी शब्दसंग्रह व जोड्या जुळवा केंद्र" : "English-to-Marathi Vocabulary & Word Matching"}
                >
                  <SpellCheck className="w-4 h-4 text-emerald-400" />
                  <span>{isMr ? '🎯 इंग्रजी शब्दसंग्रह जोड्या' : '🎯 Vocab Matching'}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-400 text-stone-950 font-black uppercase">
                    {isMr ? 'नवीन 🏆' : 'NEW 🏆'}
                  </span>
                </button>
              )}

              {onOpenInformationHub && (
                <button
                  id="btn-hero-information-hub"
                  onClick={onOpenInformationHub}
                  className="px-4 py-3 rounded-xl bg-amber-950/70 hover:bg-amber-900 text-amber-200 border border-amber-500/40 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                  title={isMr ? "माहितीचा अधिकार (RTI), IT कायदा व MPSC परीक्षा माहिती केंद्र उघडा" : "Open RTI, IT Act & MPSC Information Hub"}
                >
                  <Scale className="w-4 h-4 text-amber-400" />
                  <span>{isMr ? '📚 परीक्षा व कायदे माहिती केंद्र' : '📚 Exam & Legal Info Hub'}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400 text-stone-950 font-extrabold uppercase">
                    RTI/IT
                  </span>
                </button>
              )}

              {onOpenAddQuestion && (
                <button
                  id="btn-hero-add-mcq"
                  onClick={onOpenAddQuestion}
                  className="px-4 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                  title={isMr ? "नवीन MCQ प्रश्न तयार करा किंवा नमुना प्रश्न जोडा" : "Add custom MCQ question to Bank"}
                >
                  <PlusCircle className="w-4 h-4 text-amber-400" />
                  <span>{isMr ? '➕ MCQ प्रश्न ॲड करा' : '➕ Add MCQ Question'}</span>
                </button>
              )}

              {onOpenExamCountdown && (
                <button
                  id="btn-hero-exam-countdown"
                  onClick={onOpenExamCountdown}
                  className="px-4 py-3 rounded-xl bg-stone-800/90 hover:bg-stone-750 text-amber-300 border border-amber-500/30 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                  title={isMr ? "MPSC परीक्षा काउंटडाउन व वेळापत्रक उघडा" : "Open MPSC Exam Countdown & Timetable"}
                >
                  <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>{isMr ? '⏳ परीक्षा काउंटडाउन' : '⏳ Exam Countdown'}</span>
                </button>
              )}
            </div>

            {/* Quick Subject Chips for 10-Minute Challenge */}
            <div className="pt-2 flex items-center gap-2 flex-wrap text-xs">
              <span className="text-stone-400 font-medium text-[11px] flex items-center gap-1">
                <span>⚡ {isMr ? '१०-मिनिट थेट विषय निवडा:' : '10-Min Quick Subject:'}</span>
              </span>

              <button
                onClick={() => onStartExam('daily_10_challenge', 'gs', isMr ? 'दैनिक १०-मिनिट चॅलेंज: सामान्य अध्ययन (GS)' : 'Daily 10-Min: General Studies (GS)')}
                className="px-2.5 py-1 rounded-lg bg-blue-950/70 hover:bg-blue-900 text-blue-300 border border-blue-500/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 hover:scale-105 shadow-xs"
              >
                <span>🏛️</span>
                <span>{isMr ? 'सामान्य अध्ययन (GS)' : 'GS'}</span>
              </button>

              <button
                onClick={() => onStartExam('daily_10_challenge', 'english_grammar', isMr ? 'दैनिक १०-मिनिट चॅलेंज: इंग्रजी व्याकरण (English)' : 'Daily 10-Min: English Grammar')}
                className="px-2.5 py-1 rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-500/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 hover:scale-105 shadow-xs"
              >
                <span>🔤</span>
                <span>{isMr ? 'इंग्रजी व्याकरण (English)' : 'English'}</span>
              </button>

              <button
                onClick={() => onStartExam('daily_10_challenge', 'marathi_grammar', isMr ? 'दैनिक १०-मिनिट चॅलेंज: मराठी व्याकरण (Marathi)' : 'Daily 10-Min: Marathi Grammar')}
                className="px-2.5 py-1 rounded-lg bg-amber-950/70 hover:bg-amber-900 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 hover:scale-105 shadow-xs"
              >
                <span>🚩</span>
                <span>{isMr ? 'मराठी व्याकरण (Marathi)' : 'Marathi'}</span>
              </button>

              <button
                onClick={() => onStartExam('daily_10_challenge', undefined, isMr ? 'दैनिक १०-मिनिट चॅलेंज: सर्वसमावेशक (Combo)' : 'Daily 10-Min: Full Combo')}
                className="px-2.5 py-1 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 hover:scale-105 shadow-xs"
              >
                <span>🎯</span>
                <span>{isMr ? 'सर्वसमावेशक (Combo)' : 'Full Combo'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Impressive MPSC Civil Services Artwork Showcase */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center items-center w-full">
            <MpscHeroVisual language={language} />
          </div>
        </div>
      </div>

      {/* Live MPSC Exam Countdown & Target Tracker Card */}
      <ExamCountdownCard
        language={language}
        onStartExam={onStartExam}
        onOpenFullSchedule={onOpenExamCountdown || (() => {})}
      />

      {/* MPSC Civil Services Aspirant Vision & Prestigious Cadre Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-stone-950 shadow-xl group">
        <img
          src="/mpsc_officer_banner.svg"
          alt={isMr ? "महाराष्ट्र लोकसेवा आयोग - नागरी सेवा अधिकारी ध्येय व अभ्यास" : "MPSC Maharashtra Civil Services Aspirant Preparation"}
          className="w-full h-auto object-cover max-h-[320px] sm:max-h-[380px] transition-transform duration-700 group-hover:scale-[1.01]"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* MPSC Interactive Command Center: Dream Post Simulator & Rapid-Fire Challenge */}
      <MpscCommandCenter
        userProgress={userProgress}
        language={language}
        onStartExam={onStartExam}
        questionsPool={pool}
      />

      {/* MPSC Photographic Visual Inspiration Gallery */}
      <AspirantInspirationCard language={language} />

      {/* Snapshot Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
            {isMr ? 'सोडवलेल्या चाचण्या' : 'Tests Taken'}
          </div>
          <div className="text-2xl font-extrabold text-stone-900 font-mono">
            {totalTests}
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            {isMr ? 'एकूण सोडवलेले प्रश्न:' : 'Total Qs:'} {totalAttempted}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
            {isMr ? 'एकूण अचूकता' : 'Avg Accuracy'}
          </div>
          <div className={`text-2xl font-extrabold font-mono ${
            overallAccuracy >= 60 ? 'text-emerald-600' : 'text-stone-900'
          }`}>
            {overallAccuracy}%
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            {totalCorrect} {isMr ? 'अचूक उत्तरे' : 'correct answers'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
            {isMr ? 'आजचे सराव उद्दिष्ट' : "Today's Target"}
          </div>
          <div className="text-2xl font-extrabold text-amber-600 font-mono">
            {userProgress.todayQuestionsCount} / {userProgress.dailyTargetQuestions}
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            {Math.max(0, userProgress.dailyTargetQuestions - userProgress.todayQuestionsCount)} {isMr ? 'प्रश्न बाकी' : 'Qs remaining'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
              {isMr ? 'अलिकडील चाचणी' : 'Recent Test Score'}
            </div>
            <div className="text-2xl font-extrabold text-stone-900 font-mono">
              {recentTest ? `${recentTest.finalScore.toFixed(1)} / ${recentTest.maxScore}` : '—'}
            </div>
          </div>
          <div className="text-[11px] text-amber-700 font-semibold cursor-pointer hover:underline" onClick={onOpenAnalytics}>
            {isMr ? 'सर्व निकाल व विश्लेषण पहा →' : 'View full analytics →'}
          </div>
        </div>
      </div>

      {/* Weekly Study Goals & Pace Tracker */}
      <WeeklyGoalCard
        userProgress={userProgress}
        language={language}
        onUpdateWeeklyGoals={onUpdateWeeklyGoals}
        onLogStudySession={onLogStudySession}
        onQuickStartChallenge={() => onStartExam('daily_10_challenge')}
      />

      {/* ========================================================================= */}
      {/* RECENT ACTIVITY SECTION (Latest 5 Completed Exams & Study Sessions) */}
      {/* ========================================================================= */}
      <div id="section-recent-activity" className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs space-y-4">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <History className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-black text-stone-900">
                  {isMr ? 'अलिकडील क्रियाकलाप' : 'Recent Activity'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[11px] font-bold border border-stone-200">
                  {isMr ? 'शेवटचे ५ रेकॉर्ड्स' : 'Latest 5 Records'}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                {isMr 
                  ? 'तुम्ही सोडवलेल्या ताज्या चाचण्या आणि अभ्यास सत्रे — त्वरित पुनरावलोकन करा.' 
                  : 'Your latest completed exams and study sessions — jump back into your review quickly.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap self-end sm:self-center">
            {/* Filter Pills */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs">
              <button
                type="button"
                onClick={() => setActivityFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  activityFilter === 'all'
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {isMr ? 'सर्व' : 'All'}
              </button>
              <button
                type="button"
                onClick={() => setActivityFilter('exams')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  activityFilter === 'exams'
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {isMr ? 'चाचण्या' : 'Exams'}
              </button>
              <button
                type="button"
                onClick={() => setActivityFilter('sessions')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  activityFilter === 'sessions'
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {isMr ? 'अभ्यास सत्रे' : 'Sessions'}
              </button>
            </div>

            {/* Export JSON Backup Button */}
            <button
              type="button"
              onClick={handleRecentActivityExport}
              className="text-xs font-bold text-stone-700 hover:text-stone-950 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors cursor-pointer"
              title={isMr ? "परीक्षेचा इतिहास, स्वाध्याय सत्रे आणि बुकमार्क्सचा JSON बॅकअप डाऊनलोड करा" : "Export your exam history, study logs, and bookmarks as JSON file"}
            >
              <Download className="w-3.5 h-3.5 text-amber-600" />
              <span>{isMr ? '💾 बॅकअप JSON' : '💾 Export JSON'}</span>
            </button>

            {/* View All Analytics Link */}
            <button
              type="button"
              onClick={onOpenAnalytics}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer"
            >
              <span>{isMr ? 'सर्व निकाल पहा' : 'View All'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Temporary Export Notification Banner */}
        {exportSuccessMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="flex-1">{exportSuccessMsg}</div>
          </div>
        )}

        {/* Activities List */}
        {recentActivities.length === 0 ? (
          <div className="py-8 px-4 text-center bg-stone-50 rounded-xl border border-dashed border-stone-200">
            <Target className="w-10 h-10 text-stone-400 mx-auto mb-2 opacity-60" />
            <h4 className="text-sm font-bold text-stone-800">
              {isMr ? 'अद्याप कोणतीही पूर्ण केलेली चाचणी किंवा अभ्यास सत्र उपलब्ध नाही' : 'No completed exams or study sessions yet'}
            </h4>
            <p className="text-xs text-stone-500 max-w-md mx-auto mt-1 mb-4">
              {isMr 
                ? 'तुमच्या तयारीचे मूल्यमापन करण्यासाठी पहिली सराव चाचणी सोडवा आणि येथे सर्व निकालांचे सविस्तर पुनरावलोकन करा.' 
                : 'Take your first mock test to evaluate your performance and review question explanations here.'}
            </p>
            <button
              type="button"
              onClick={() => onStartExam('daily_10_challenge')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isMr ? '🚀 पहिली सराव चाचणी सुरू करा' : '🚀 Start First Practice Test'}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentActivities.map((item) => {
              if (item.type === 'exam' && item.examResult) {
                const res = item.examResult;
                const accuracy = res.accuracyPercentage ?? (res.attemptedCount > 0 ? Math.round((res.correctCount / res.attemptedCount) * 100) : 0);
                const accuracyColor = 
                  accuracy >= 70 ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
                  accuracy >= 50 ? 'text-amber-700 bg-amber-50 border-amber-200' :
                  'text-rose-700 bg-rose-50 border-rose-200';

                // Percentage score calculation
                const scorePercentage = res.maxScore > 0 ? Math.round((res.finalScore / res.maxScore) * 100) : 0;
                const clampedScorePercent = Math.max(0, Math.min(100, scorePercentage));

                const isHigh = scorePercentage >= 70;
                const isMedium = scorePercentage >= 40 && scorePercentage < 70;

                const iconBadgeClasses = isHigh 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                  : isMedium 
                  ? 'bg-amber-50 border-amber-200 text-amber-700' 
                  : 'bg-rose-50 border-rose-200 text-rose-700';

                const scoreBarGradient = isHigh
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                  : isMedium
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                  : 'bg-gradient-to-r from-rose-500 to-red-500';

                const scoreTextColor = isHigh
                  ? 'text-emerald-700'
                  : isMedium
                  ? 'text-amber-700'
                  : 'text-rose-700';

                return (
                  <div
                    key={item.id}
                    className="p-3.5 sm:p-4 rounded-xl border border-stone-200 bg-white hover:border-amber-400/80 hover:shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-3.5 group"
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      {/* Dynamic Icon Indicator */}
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${iconBadgeClasses}`}>
                        {isHigh ? (
                          <Award className="w-5 h-5 text-emerald-600" />
                        ) : isMedium ? (
                          <CheckCircle2 className="w-5 h-5 text-amber-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-rose-600" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-bold text-[10px] border border-stone-200">
                            {getPatternBadge(res.patternId)}
                          </span>
                          <span className="text-[11px] text-stone-500 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(item.timestamp)}
                          </span>
                          {item.dateFormatted && (
                            <span className="text-[11px] text-stone-400">
                              ({item.dateFormatted})
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-black text-stone-900 truncate group-hover:text-amber-700 transition-colors">
                          {item.title}
                        </h4>

                        {/* Performance metrics pill row */}
                        <div className="flex items-center gap-2 flex-wrap mt-1.5 text-xs">
                          <span className="font-extrabold text-stone-900 bg-stone-100 px-2 py-0.5 rounded font-mono">
                            🎯 {res.finalScore.toFixed(1)} / {res.maxScore} {isMr ? 'गुण' : 'Marks'}
                          </span>
                          <span className={`font-bold px-2 py-0.5 rounded border text-[11px] ${accuracyColor}`}>
                            ⚡ {accuracy}% {isMr ? 'अचूकता' : 'Accuracy'}
                          </span>
                          <span className="text-stone-500 text-[11px] font-medium hidden sm:inline-flex">
                            ✓ {res.correctCount} {isMr ? 'बरोबर' : 'correct'} • ✗ {res.incorrectCount} {isMr ? 'चूक' : 'wrong'} • ⚪ {res.unattemptedCount} {isMr ? 'सोडवले नाहीत' : 'skipped'}
                          </span>
                          <span className="text-stone-400 text-[11px] font-medium">
                            ⏱️ {Math.max(1, Math.round(res.timeSpentSeconds / 60))} {isMr ? 'मिनिटे' : 'min'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar & Quick Review Action */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                      {/* Score Percentage Progress Bar */}
                      <div className="w-full sm:w-36 md:w-44 bg-stone-50/90 p-2 sm:p-2.5 rounded-xl border border-stone-200/80 shadow-2xs">
                        <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                          <span className="text-stone-500 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-stone-400" />
                            <span>{isMr ? 'गुण टक्केवारी' : 'Score'}</span>
                          </span>
                          <span className={`font-mono font-black ${scoreTextColor}`}>
                            {scorePercentage}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-stone-200/80 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${scoreBarGradient}`}
                            style={{ width: `${clampedScorePercent}%` }}
                          />
                        </div>
                      </div>

                      {onReviewExamResult && (
                        <button
                          type="button"
                          onClick={() => onReviewExamResult(res)}
                          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer group-hover:scale-102 shrink-0"
                          title={isMr ? "या चाचणीचे सविस्तर पुनरावलोकन व स्पष्टीकरणे पहा" : "Review answers and explanations for this test"}
                        >
                          <Eye className="w-3.5 h-3.5 text-stone-950" />
                          <span>{isMr ? 'पुनरावलोकन' : 'Review'}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-stone-950" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              }

              // Study Session Log
              if (item.type === 'session' && item.studyLog) {
                const log = item.studyLog;
                const durationMins = log.durationMinutes || 0;
                const targetSessionMins = 60; // 60-min standard session benchmark
                const clampedDurationPercent = Math.min(100, Math.round((durationMins / targetSessionMins) * 100));
                const isFullSession = durationMins >= targetSessionMins;

                const sessionBadgeClasses = isFullSession 
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                  : 'bg-violet-50 border-violet-200 text-violet-700';

                return (
                  <div
                    key={item.id}
                    className="p-3.5 sm:p-4 rounded-xl border border-stone-200 bg-white hover:border-indigo-400/80 hover:shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-3.5 group"
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      {/* Dynamic Icon Indicator */}
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${sessionBadgeClasses}`}>
                        {isFullSession ? (
                          <BookOpen className="w-5 h-5 text-indigo-600" />
                        ) : (
                          <Timer className="w-5 h-5 text-violet-600" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-bold text-[10px] border border-indigo-200">
                            {isMr ? '📖 अभ्यास नोंद' : '📖 Study Session'}
                          </span>
                          <span className="text-[11px] text-stone-500 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(item.timestamp)}
                          </span>
                          {item.dateFormatted && (
                            <span className="text-[11px] text-stone-400">
                              ({item.dateFormatted})
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-black text-stone-900 truncate">
                          {item.title}
                        </h4>

                        <div className="flex items-center gap-2 flex-wrap mt-1 text-xs">
                          <span className="font-bold text-stone-800 bg-stone-100 px-2 py-0.5 rounded font-mono">
                            ⏱️ {log.durationMinutes} {isMr ? 'मिनिटे अभ्यास' : 'min duration'}
                          </span>
                          {log.questionsSolved > 0 && (
                            <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              📝 {log.questionsSolved} {isMr ? 'प्रश्न सोडवले' : 'Qs solved'}
                            </span>
                          )}
                          {log.notes && (
                            <span className="text-stone-500 text-[11px] italic truncate max-w-xs">
                              "{log.notes}"
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Duration Progress Bar & Action */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                      {/* Duration Progress Bar */}
                      <div className="w-full sm:w-36 md:w-44 bg-stone-50/90 p-2 sm:p-2.5 rounded-xl border border-stone-200/80 shadow-2xs">
                        <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                          <span className="text-stone-500 flex items-center gap-1">
                            <Timer className="w-3 h-3 text-stone-400" />
                            <span>{isMr ? 'सत्र वेळ' : 'Duration'}</span>
                          </span>
                          <span className="font-mono font-black text-indigo-700">
                            {durationMins}m <span className="text-[10px] text-stone-400 font-normal">/ {targetSessionMins}m</span>
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-stone-200/80 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                            style={{ width: `${clampedDurationPercent}%` }}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={onOpenAnalytics}
                        className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0"
                      >
                        <span>{isMr ? 'नोंदी पहा' : 'View Logs'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
        )}
      </div>

      {/* MPSC Real-Time Cutoff Predictor, Hall of Fame Medals & Digital Pass */}
      <MpscHallOfFameAndPredictor
        userProgress={userProgress}
        language={language}
        currentUserName={currentUserName}
        onStartExam={onStartExam}
      />

      {/* Top 5 Aspirants Leaderboard */}
      <LeaderboardCard
        userProgress={userProgress}
        language={language}
        currentUserId={currentUserId}
        currentUserName={currentUserName}
        onOpenExamHub={() => onStartExam('daily_10_challenge')}
      />

      {/* Firebase Cloud Sync Banner */}
      {onOpenCloudSync && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/25 rounded-xl p-3.5 sm:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-700 flex items-center justify-center shrink-0">
              <Cloud className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xs font-bold text-stone-900">
                  {isMr ? 'फायरबेस डेटा केंद्र (Firestore asia-east1)' : 'Firebase Data Hub (Firestore asia-east1)'}
                </h4>
                {isFirestoreQuotaExceeded() ? (
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-mono px-2 py-0.5 rounded-full font-bold">
                    {isMr ? 'स्थानिक ऑफलाइन मोड' : 'Local Offline Mode'}
                  </span>
                ) : (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono px-1.5 py-0.5 rounded-full font-bold">
                    {isMr ? 'क्लाउड लाइव्ह' : 'Cloud Live'}
                  </span>
                )}
                <span className="text-[10px] bg-amber-100 text-amber-800 font-mono px-1.5 py-0.5 rounded-full font-bold">
                  १,००,०००+ {isMr ? 'प्रश्न सक्रिय' : 'Questions Active'}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5">
                {isMr 
                  ? `${userProgress.history.length} चाचण्या, ${userProgress.bookmarkedQuestionIds.length} बुकमार्क आणि ${(userProgress.studyLogs || []).length} स्वाध्याय नोंदी थेट Firestore शी जोडलेल्या आहेत.`
                  : `${userProgress.history.length} exams, ${userProgress.bookmarkedQuestionIds.length} bookmarks, and ${(userProgress.studyLogs || []).length} logs connected to Firestore.`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
            {onOpenAddQuestion && (
              <button
                id="btn-dashboard-add-question"
                onClick={onOpenAddQuestion}
                className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
                title={isMr ? "नवीन प्रश्न तयार करून Firebase मध्ये Add करा" : "Add new question to Firebase"}
              >
                <PlusCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>{isMr ? '+ MCQ प्रश्न जोडा' : '+ Add MCQ'}</span>
              </button>
            )}

            {onFetchData && (
              <button
                id="btn-dashboard-fetch"
                onClick={onFetchData}
                disabled={isFetching || isSyncing}
                className="px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs disabled:opacity-50"
                title={isMr ? "फायरबेसवरून सर्व डेटा आणा (Fetch)" : "Fetch all data from Firebase"}
              >
                <Download className={`w-3.5 h-3.5 text-amber-400 ${isFetching ? 'animate-bounce' : ''}`} />
                <span>{isFetching ? (isMr ? 'Fetch होत आहे...' : 'Fetching...') : (isMr ? 'डेटा Fetch करा' : 'Fetch Data')}</span>
              </button>
            )}

            <button
              id="btn-dashboard-store"
              onClick={onTriggerSync || onOpenCloudSync}
              disabled={isSyncing || isFetching}
              className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-extrabold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs disabled:opacity-50"
              title={isMr ? "फायरबेसवर डेटा साठवा (Store)" : "Store all data to Firebase"}
            >
              <UploadCloud className={`w-3.5 h-3.5 text-stone-950 ${isSyncing ? 'animate-bounce' : ''}`} />
              <span>{isSyncing ? (isMr ? 'Store होत आहे...' : 'Storing...') : (isMr ? 'डेटा Store करा' : 'Store Data')}</span>
            </button>
          </div>
        </div>
      )}

      {/* 100,000+ Hard Level Questions Engine Hero Card */}
      <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/80 border-2 border-amber-500/50 rounded-2xl p-5 sm:p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="space-y-2 z-10 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-red-400" />
              {isMr ? 'कठीण काठिण्य पातळी' : 'Hard Difficulty Tier'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-mono font-bold">
              {isMr ? '१,००,०००+ प्रश्न इंजिन' : '100,000+ Questions Engine'}
            </span>
            <span className="text-xs text-stone-400 font-medium">
              {isMr ? 'सर्व १० विषय समाविष्ट' : 'All 10 Subjects'}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isMr ? '🔥 एमपीएससी १,००,००० कठीण प्रश्न सराव केंद्र' : '🔥 MPSC 100,000+ Hard Questions Hub'}
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {isMr 
              ? 'विधान-कारण, जोड्या लावा, बहुविधानात्मक आणि एलिमिनेशन पद्धतीवर आधारित उच्चस्तरीय प्रश्न. १० विषय निवडा किंवा संपूर्ण मिक्स मॉक पेपर सोडवा.'
              : 'Multi-statement assertion-reasoning and elimination MCQs across all 10 MPSC subjects designed for intense cut-off clearance.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0 z-10">
          <button
            id="btn-open-hard-hub"
            onClick={() => onOpenHardQuestionsHub ? onOpenHardQuestionsHub() : onStartExam('hard_challenge')}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
          >
            <Flame className="w-4 h-4 fill-stone-950" />
            <span>{isMr ? 'कठीण प्रश्न केंद्र उघडा' : 'Launch Hard Challenge'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Practice Exam Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-stone-900">
              {isMr ? 'मुख्य सराव परीक्षा व मागील वर्षाच्या प्रश्नपत्रिका' : 'Full Exam Practice Modules & Official PYQs'}
            </h2>
            <p className="text-xs text-stone-500">
              {isMr ? 'परीक्षेच्या प्रत्यक्ष स्वरूपानुसार नकारात्मक गुणांकनासह सराव करा.' : 'Practice in authentic MPSC time-bound formats with negative markings.'}
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FEATURED: 3 JAN 2026 MPSC GROUP C & TALATHI MEGA TEST SERIES (10 SETS) */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-r from-stone-950 via-amber-950 to-stone-900 rounded-2xl border-2 border-amber-500/70 p-6 sm:p-7 shadow-xl text-white mb-6 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 opacity-15 pointer-events-none">
            <Trophy className="w-56 h-56 text-amber-400" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider shadow-xs flex items-center gap-1.5 animate-pulse">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  {isMr ? '🎯 लक्ष्य: ३ जानेवारी २०२७ पूर्व परीक्षा' : '🎯 Target: 3 Jan 2027 Prelims'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                  {isMr ? '२० महा सराव संच उपलब्ध' : '20 Full Exam Sets Available'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                  {isMr ? '१०० प्रश्न • ६० मिनिटे • १०० गुण' : '100 Qs • 60 Mins • 100 Marks'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700 text-xs font-bold">
                  {isMr ? '🔴 थेट रिअल-टाइम राज्य रँक' : '🔴 Real-Time State Rank'}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white">
                {isMr
                  ? 'MPSC गट-क व तलाठी भरती पूर्व महा सराव टेस्ट सिरीज २०२७ (२० संच)'
                  : 'MPSC Group C & Talathi Prelims Mega Test Series 2027 (20 Sets)'}
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {isMr
                  ? 'लिपिक-टंकलेखक, कर सहायक, उत्पादन शुल्क दुय्यम निरीक्षक व तलाठी पदांसाठी आयोगाच्या अधिकृत पूर्व परीक्षा अभ्यासक्रमानुसार (सामान्य क्षमता चाचणी) तयार केलेले २० महा सराव संच (३ जानेवारी २०२७ लक्ष्य). चालू घडामोडी (१५), नागरिकशास्त्र (१५), इतिहास (१०), भूगोल (१५), अर्थव्यवस्था (१५), सामान्य विज्ञान (१५), बुद्धिमापन (८) व अंकगणित (७) असे परिपूर्ण १०० प्रश्न. थेट महाराष्ट्र राज्य गुणवत्ता रँक व कट-ऑफ निकाल!'
                  : '20 Full-length Mock Sets for 3 January 2027 Group C & Talathi Prelims. Strictly aligned with the official 8-subject General Ability Test syllabus (Current Affairs 15, Civics 15, History 10, Geography 15, Economy 15, Science 15, Reasoning 8, Arithmetic 7) with instant live Maharashtra State Rank, Percentile, and Qualifying Scorecard.'}
              </p>

              <div className="flex items-center gap-4 text-xs text-amber-200/90 font-medium pt-1 flex-wrap">
                <span>⏱️ {isMr ? 'वेळ: ६० मिनिटे (३६०० सेकंद)' : 'Duration: 60 Mins'}</span>
                <span>•</span>
                <span>⚖️ {isMr ? 'नकारात्मक: १/४ (-०.२५ गुण)' : 'Negative: 1/4th (-0.25)'}</span>
                <span>•</span>
                <span>🎯 {isMr ? 'अपेक्षित कट-ऑफ: ५८.५+ (Open)' : 'Target Cutoff: 58.5+'}</span>
                <span>•</span>
                <span>🏛️ {isMr ? 'Real CBT Exam Hall Feeling' : 'Real CBT Simulation'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <button
                onClick={() => onOpenGroupCTalathiTestSeries?.('sets')}
                className="px-5 py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-[1.02] shrink-0"
              >
                <Trophy className="w-4 h-4 text-stone-950" />
                <span>{isMr ? '२० महा सराव संच पहा (Sets 1-20)' : 'View All 20 Sets'}</span>
              </button>
              <button
                onClick={() => onOpenGroupCTalathiTestSeries?.('syllabus')}
                className="px-4 py-3.5 bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-white border border-amber-500/40 font-bold text-sm rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:scale-[1.02] shrink-0"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>{isMr ? '📋 अधिकृत अभ्यासक्रम' : '📋 Official Syllabus'}</span>
              </button>
              <button
                onClick={() => onStartExam('mpsc_group_c_talathi_set_1', undefined, isMr ? 'MPSC गट-क / तलाठी महा सराव संच १ (३ जाने २०२७ विशेष)' : 'MPSC Group C / Talathi Mega Mock Set 1 (3 Jan 2027 Special)')}
                className="px-5 py-3.5 bg-stone-900/90 hover:bg-stone-800 text-amber-300 hover:text-white border border-amber-500/50 font-black text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-[1.02] shrink-0"
              >
                <Play className="w-4 h-4 fill-current text-amber-400" />
                <span>{isMr ? 'संच १ थेट सोडवा ➜' : 'Start Set 1 ➜'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured: MPSC 2024 Official Paper 1 PYQ Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-2xl border-2 border-amber-500/50 p-6 sm:p-7 shadow-lg text-white mb-6 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <Award className="w-56 h-56 text-amber-400" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-black uppercase tracking-wider shadow-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-stone-950" />
                  {isMr ? 'अधिकृत मागील प्रश्नपत्रिका व सविस्तर स्पष्टीकरणे' : 'Official Previous Question Papers & Solutions'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                  {isMr ? '२०२६ (H25), २०२४, २०२३, २०२२, २०२१, २०२० उपलब्ध' : '2026 (H25), 2024, 2023, 2022, 2021, 2020'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                  {isMr ? '६००+ अधिकृत PYQs • अंतिम की व संदर्भ स्पष्टीकरण' : '600+ Official PYQs • Final Key & Solutions'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {isMr 
                  ? 'MPSC मागील वर्षांच्या अधिकृत प्रश्नपत्रिका व सविस्तर स्पष्टीकरणे (PYQ Hub)' 
                  : 'MPSC Official Previous Question Papers (PYQ Hub) & In-Depth Solutions'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {isMr
                  ? 'महाराष्ट्र गट-ब संयुक्त पूर्व परीक्षा २०२६ (१४ जून २०२६, H25), राज्यसेवा २०२४ (W18), गट-ब २०२२ (A16) आणि मागील सर्व परीक्षांच्या मूळ प्रश्नपत्रिका, आयोगाची अधिकृत अंतिम उत्तरतालिका आणि प्रत्येक प्रश्नाचे संदर्भग्रंथासह सविस्तर स्पष्टीकरण वाचा किंवा थेट परीक्षा द्या.'
                  : 'Practice all 100 questions from MPSC Combine Prelims 2026 (14 June 2026, Booklet H25), Rajyaseva 2024, and past official papers with official keys and reference explanations.'}
              </p>
              <div className="flex items-center gap-4 text-xs text-amber-200/90 font-medium pt-1 flex-wrap">
                <span>⏱️ {isMr ? 'वेळ: ६० / १२० मिनिटे' : 'Duration: 60 / 120 Mins'}</span>
                <span>•</span>
                <span>📖 {isMr ? 'वाचा व अभ्यास करा (Study Mode)' : 'Read Questions & Solutions'}</span>
                <span>•</span>
                <span>🎯 {isMr ? '१०० / २०० गुण' : '100 / 200 Marks'}</span>
                <span>•</span>
                <span>⚖️ {isMr ? 'नकारात्मक: १/४ (-०.२५ / -०.५०)' : 'Negative: 1/4th'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <button
                onClick={() => onOpenPyqHub?.()}
                className="px-5 py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-[1.02] shrink-0"
              >
                <BookOpen className="w-4 h-4 text-stone-950" />
                <span>{isMr ? 'प्रश्न व स्पष्टीकरणे वाचा (PYQ Hub)' : 'All Question Papers & Solutions'}</span>
              </button>
              <button
                onClick={() => onStartExam('mpsc_combine_pre_2026', undefined, isMr ? 'MPSC गट-ब संयुक्त पूर्व परीक्षा २०२६ (१४ जून २०२६, संच A)' : 'MPSC Group B Prelims 2026 (14 June 2026, Set A)')}
                className="px-5 py-3.5 bg-stone-900/90 hover:bg-stone-800 text-amber-300 hover:text-white border border-amber-500/50 font-black text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-[1.02] shrink-0"
              >
                <Play className="w-4 h-4 fill-current text-amber-400" />
                <span>{isMr ? '२०२६ परीक्षा सोडवा (H25)' : 'Take 2026 Exam (H25)'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Rajyaseva GS Prelims */}
          <div className="bg-white rounded-2xl border-2 border-stone-200 hover:border-amber-500/80 p-6 flex flex-col justify-between transition-all hover:shadow-md group overflow-hidden">
            {/* Top Photo Banner */}
            <div className="h-32 -mx-6 -mt-6 mb-4 rounded-t-xl overflow-hidden relative bg-stone-950">
              <img
                src="/mantralaya.jpg"
                alt="Mantralaya"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                <span className="font-black text-xs drop-shadow-md">
                  {isMr ? 'मंत्रालय • राजपत्रित वर्ग-१' : 'Mantralaya • Class-1'}
                </span>
                <span className="text-[10px] font-mono bg-amber-500/90 text-stone-950 font-black px-1.5 py-0.5 rounded shadow-xs">
                  २०० गुण
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  MPSC Rajyaseva
                </span>
                <span className="text-xs font-bold text-stone-500">
                  {isMr ? '१/४ नकारात्मक' : '1/4th Negative'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                {isMr ? 'राज्यसेवा सामान्य अध्ययन (GS) मॉक' : 'Rajyaseva General Studies Mock'}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                {isMr 
                  ? 'महाराष्ट्र इतिहास, भूगोल, राज्यघटना, अर्थव्यवस्था, विज्ञान व चालू घडामोडींवर आधारित दर्जेदार प्रश्न.'
                  : 'Full General Studies syllabus covering Maharashtra history, geography, constitution, economy, and science.'}
              </p>

              <div className="flex items-center gap-3 text-xs text-stone-500 pt-2 border-t border-stone-100">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 15 Mins
                </span>
                <span>•</span>
                <span>+2.00 / -0.50</span>
              </div>
            </div>

            <button
              id="btn-start-rajyaseva-mock"
              onClick={() => onStartExam('rajyaseva_gs')}
              className="mt-6 w-full py-2.5 bg-stone-900 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isMr ? 'चाचणी सुरू करा' : 'Start Mock Test'}</span>
            </button>
          </div>

          {/* Card 2: Combine Group B & C Prelims */}
          <div className="bg-white rounded-2xl border-2 border-stone-200 hover:border-blue-500/80 p-6 flex flex-col justify-between transition-all hover:shadow-md group overflow-hidden">
            {/* Top Photo Banner */}
            <div className="h-32 -mx-6 -mt-6 mb-4 rounded-t-xl overflow-hidden relative bg-stone-950">
              <img
                src="/gateway_of_india.jpg"
                alt="Gateway of India"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                <span className="font-black text-xs drop-shadow-md">
                  {isMr ? 'संयुक्त गट-ब व क • PSI / STI / ASO' : 'Combine Group B & C'}
                </span>
                <span className="text-[10px] font-mono bg-blue-500/90 text-white font-black px-1.5 py-0.5 rounded shadow-xs">
                  १०० गुण
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                  Combine Group B & C
                </span>
                <span className="text-xs font-bold text-stone-500">
                  {isMr ? '१ गुण / प्रश्न' : '1 Mark / Q'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-stone-900 group-hover:text-blue-600 transition-colors">
                {isMr ? 'संयुक्त पूर्वपरीक्षा सराव चाचणी' : 'Combine Prelims Full Mock'}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                {isMr 
                  ? 'PSI, STI, ASO व गट क साठी संयुक्त पूर्वपरीक्षेच्या १०० गुणांच्या पॅटर्ननुसार विशेष सराव संच.'
                  : 'Designed specifically for PSI, STI, ASO, and Clerk-Typist aspirants with official mark weightage.'}
              </p>

              <div className="flex items-center gap-3 text-xs text-stone-500 pt-2 border-t border-stone-100">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 12 Mins
                </span>
                <span>•</span>
                <span>+1.00 / -0.25</span>
              </div>
            </div>

            <button
              id="btn-start-combine-mock"
              onClick={() => onStartExam('combine_group_b_c')}
              className="mt-6 w-full py-2.5 bg-stone-900 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isMr ? 'चाचणी सुरू करा' : 'Start Mock Test'}</span>
            </button>
          </div>

          {/* Card 3: Maharashtra Special */}
          <div className="bg-white rounded-2xl border-2 border-stone-200 hover:border-emerald-500/80 p-6 flex flex-col justify-between transition-all hover:shadow-md group overflow-hidden">
            {/* Top Photo Banner */}
            <div className="h-32 -mx-6 -mt-6 mb-4 rounded-t-xl overflow-hidden relative bg-stone-950">
              <img
                src="/raigad_fort.jpg"
                alt="Raigad Fort"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                <span className="font-black text-xs drop-shadow-md">
                  {isMr ? 'किल्ले रायगड • महाराष्ट्र विशेष' : 'Raigad Fort • Maharashtra'}
                </span>
                <span className="text-[10px] font-mono bg-emerald-500/90 text-white font-black px-1.5 py-0.5 rounded shadow-xs">
                  विशेष वेटेज
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  Maharashtra Special
                </span>
                <span className="text-xs font-bold text-emerald-700 font-semibold">
                  {isMr ? 'सर्वाधिक वेटेज' : 'High Weightage'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-600 transition-colors">
                {isMr ? 'महाराष्ट्र विशेष (इतिहास व भूगोल)' : 'Maharashtra History & Geography'}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                {isMr 
                  ? 'सह्याद्री घाट, नद्या, समाजसुधारक, १८५७ चा उठाव व संयुक्त महाराष्ट्र चळवळीवर आधारित उच्च गुण मिळवून देणारे प्रश्न.'
                  : 'Highest yield section in MPSC. Deep dive into Sahyadri passes, rivers, social reformers, and state movements.'}
              </p>

              <div className="flex items-center gap-3 text-xs text-stone-500 pt-2 border-t border-stone-100">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 10 Mins
                </span>
                <span>•</span>
                <span>+2.00 / -0.50</span>
              </div>
            </div>

            <button
              id="btn-start-mh-special"
              onClick={() => onStartExam('maharashtra_special')}
              className="mt-6 w-full py-2.5 bg-stone-900 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isMr ? 'चाचणी सुरू करा' : 'Start Mock Test'}</span>
            </button>
          </div>

          {/* Card 4: Current Affairs 2026/27 Special */}
          <div className="bg-white rounded-2xl border-2 border-indigo-200 hover:border-indigo-500 p-6 flex flex-col justify-between transition-all hover:shadow-md group relative overflow-hidden">
            {/* Top Photo Banner */}
            <div className="h-32 -mx-6 -mt-6 mb-4 rounded-t-xl overflow-hidden relative bg-stone-950">
              <img
                src="/open_reference_book.jpg"
                alt="Current Affairs Book"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                <span className="font-black text-xs drop-shadow-md">
                  {isMr ? 'वार्षिकी व संदर्भ • चालू घडामोडी २०२६' : 'Current Affairs 2026'}
                </span>
                <span className="text-[10px] font-mono bg-indigo-500/90 text-white font-black px-1.5 py-0.5 rounded shadow-xs">
                  २५ प्रश्न
                </span>
              </div>
            </div>

            <div className="space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Newspaper className="w-3 h-3 text-indigo-700" />
                  MPSC 2026/27
                </span>
                <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md shadow-2xs">
                  {isMr ? '२,०००+ सराव प्रश्न' : '2,000+ MCQs Bank'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-stone-900 group-hover:text-indigo-600 transition-colors">
                {isMr ? 'चालू घडामोडी विशेष (२०२६/२७)' : 'Current Affairs 2026/27 Special'}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                {isMr 
                  ? 'लाडकी बहीण, वाढवण बंदर, मराठी अभिजात भाषा दर्जा, नवीन फौजदारी कायदे (BNS), १६ वा वित्त आयोग, राष्ट्रीय योजना, इस्रो व पर्यावरण.'
                  : 'High-yield 2026/27 events: Ladki Bahin, Vadhavan Port, Marathi Classical Language, BNS Laws, 16th Finance Comm., National Schemes & Space.'}
              </p>

              <div className="flex items-center gap-3 text-xs text-stone-500 pt-2 border-t border-stone-100">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 20 Mins (25 Qs)
                </span>
                <span>•</span>
                <span>+2.00 / -0.50</span>
              </div>
            </div>

            <button
              id="btn-start-ca-2026"
              onClick={() => onStartExam('current_affairs_2026', 'current_affairs', isMr ? 'चालू घडामोडी २०२६/२७ विशेष चाचणी' : 'Current Affairs 2026/27 Mock')}
              className="mt-6 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isMr ? 'चाचणी सुरू करा' : 'Start Mock Test'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Weak Area Targeted Workout Alert if applicable */}
      {wrongQuestionIds.size > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-rose-950">
                {isMr ? 'चुकलेल्या प्रश्नांचा पुनर्सराव (Weak Areas Workout)' : 'Revision of Previously Missed Questions'}
              </h3>
              <p className="text-xs text-rose-700 mt-0.5">
                {isMr 
                  ? `तुम्ही आधी सोडवलेल्या परीक्षांमधील ${wrongQuestionIds.size} चुकलेले प्रश्न पुन्हा सोडवून संकल्पना पक्की करा.`
                  : `Master the ${wrongQuestionIds.size} questions you previously got wrong to plug preparation gaps.`}
              </p>
            </div>
          </div>

          <button
            onClick={() => onStartExam('custom', undefined, isMr ? 'चुकलेल्या प्रश्नांची फेरतपासणी चाचणी' : 'Weak Questions Re-Test')}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shrink-0 transition-colors cursor-pointer shadow-sm"
          >
            {isMr ? 'चुकलेले प्रश्न सोडवा' : 'Practice Weak Questions'}
          </button>
        </div>
      )}

      {/* Grammar Rules Spotlight Card with Open Book Image */}
      {onOpenGrammarRules && (
        <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden group">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center gap-4 relative z-10 max-w-2xl">
            {/* Book Image Thumbnail */}
            <div className="w-24 h-20 sm:w-28 sm:h-24 rounded-xl overflow-hidden border border-amber-500/40 shrink-0 shadow-lg relative group-hover:scale-105 transition-transform duration-500 hidden sm:block">
              <img
                src="/open_reference_book.jpg"
                alt={isMr ? "MPSC संदर्भ पुस्तक" : "MPSC Reference Book"}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1 left-1.5 px-1.5 py-0.5 rounded bg-amber-500 text-stone-950 text-[9px] font-black uppercase">
                {isMr ? '१३६ नियम' : '136 Rules'}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isMr ? 'मराठी व इंग्रजी व्याकरण नियम कोश' : 'Grammar Rules & Exam Shortcuts'}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                {isMr
                  ? 'नियम, अचूक सूत्रे, अपवाद व MPSC शॉर्टकट क्लृप्त्या'
                  : 'Formulas, Exceptions & Right vs Wrong Examples'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isMr
                  ? 'वर्णविचार, संधी, विभक्ती, प्रयोग, समास, Subject-Verb Agreement, Tenses, Voice, Speech, Articles व Prepositions चे सर्व नियम एकाच ठिकाणी.'
                  : 'Comprehensive rules with exam shortcuts, right vs. wrong sentences, and targeted MCQs for high scoring.'}
              </p>
            </div>
          </div>

          <button
            id="btn-open-grammar-rules-spotlight"
            onClick={onOpenGrammarRules}
            className="relative z-10 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 shadow-md cursor-pointer hover:scale-105"
          >
            <BookOpen className="w-4 h-4" />
            <span>{isMr ? 'नियम व पुस्तके अभ्यासा ➜' : 'Explore Grammar Rules ➜'}</span>
          </button>
        </div>
      )}

      {/* MPSC Standard Reference Bookshelf & Visual Covers */}
      <MpscBookShelf
        language={language}
        onStartExam={onStartExam}
        onOpenGrammarRules={onOpenGrammarRules}
      />

      {/* Subject-Wise Quick Practice Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-stone-900">
              {isMr ? 'विषयवार सराव विभाग' : 'Subject-Wise Practice Section'}
            </h2>
            <p className="text-xs text-stone-500">
              {isMr ? 'विशिष्ट विषयाची तयारी तपासण्यासाठी स्वतंत्र चाचणी निवडा.' : 'Select an individual subject to sharpen your conceptual foundation.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {SUBJECTS.map((sub) => {
            const count = pool.filter((q) => q.subjectId === sub.id).length;

            return (
              <div
                key={sub.id}
                className="bg-white rounded-xl border border-stone-200 p-4 hover:border-amber-400 hover:shadow-xs transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start gap-3 mb-2.5">
                    <div className="w-12 h-14 rounded-lg overflow-hidden border border-stone-200 shrink-0 bg-stone-900 shadow-2xs relative">
                      <img
                        src={SUBJECT_BOOK_COVERS[sub.id] || '/open_reference_book.jpg'}
                        alt={sub.nameMr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700 inline-block mb-1">
                        {count} {isMr ? 'प्रश्न उपलब्ध' : 'Questions'}
                      </span>
                      <h3 className="font-bold text-sm sm:text-base text-stone-900 leading-tight">
                        {isMr ? sub.nameMr : sub.nameEn}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                    {isMr ? sub.descriptionMr : sub.descriptionEn}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400 font-semibold">
                    MPSC Prelims & Combine
                  </span>
                  <button
                    onClick={() => onStartExam('custom', sub.id, isMr ? sub.nameMr : sub.nameEn)}
                    className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-amber-500 hover:text-stone-950 text-stone-800 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isMr ? 'सराव करा' : 'Practice'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily 10-Minute Challenge Subject Selector Modal */}
      <DailyChallengeModal
        isOpen={showDailyChallengeModal}
        onClose={() => setShowDailyChallengeModal(false)}
        language={language}
        onStartChallenge={(subjectId, title) => {
          onStartExam('daily_10_challenge', subjectId, title);
        }}
      />
    </div>
  );
};
