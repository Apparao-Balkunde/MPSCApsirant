import React from 'react';
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
  FileText
} from 'lucide-react';
import { ExamPatternId, SubjectId, UserProgress, Question } from '../types';
import { SUBJECTS } from '../data/subjects';
import { MPSC_QUESTIONS } from '../data/mpscQuestions';
import { WeeklyGoalCard } from './WeeklyGoalCard';
import { LeaderboardCard } from './LeaderboardCard';

interface DashboardViewProps {
  userProgress: UserProgress;
  language: 'mr' | 'en';
  currentUserId?: string;
  currentUserName?: string;
  onStartExam: (patternId: ExamPatternId, subjectId?: SubjectId, title?: string) => void;
  onOpenBookmarks: () => void;
  onOpenAnalytics: () => void;
  onOpenGrammarRules?: () => void;
  onUpdateWeeklyGoals: (hours: number, questions: number) => void;
  onLogStudySession: (title: string, durationMinutes: number, questionsSolved: number, notes?: string) => void;
  onOpenCloudSync?: () => void;
  onOpenAddQuestion?: () => void;
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
  onOpenGrammarRules,
  onUpdateWeeklyGoals,
  onLogStudySession,
  onOpenCloudSync,
  onOpenAddQuestion,
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* Aspirant Hero Greeting & Momentum Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-stone-100 p-6 sm:p-8 border border-stone-800 shadow-lg">
        {/* Subtle decorative background badge */}
        <div className="absolute right-4 -bottom-6 text-stone-800/40 select-none pointer-events-none hidden md:block">
          <Award className="w-64 h-64" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
            <span>
              {isMr 
                ? `${userProgress.streakDays} दिवसांचे निरंतर अध्ययन सातत्य!` 
                : `${userProgress.streakDays} Days Consistent Practice Streak!`}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {isMr ? 'एमपीएससी तयारी आणि सराव परीक्षा' : 'Crack MPSC 2025-26 with Precision'}
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            {isMr 
              ? 'राज्यसेवा (राजपत्रित) व संयुक्त गट ब आणि क परीक्षांसाठी वस्तुनिष्ठ सराव चाचण्या, नकारात्मक गुणांकनासह रिअल टाइम परीक्षा पद्धती आणि अचूक विश्लेषण.'
              : 'Timed mock tests for Rajyaseva and Combine exams with real CBT palette, negative marking, bilingual explanations, and deep analytics.'}
          </p>

          <div className="flex items-center gap-3 pt-2 flex-wrap">
            <button
              id="btn-quick-daily-challenge"
              onClick={() => onStartExam('daily_10_challenge')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-sm flex items-center gap-2 shadow-md hover:shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-stone-950" />
              <span>{isMr ? 'दैनिक १० मिनिटांचे चॅलेंज सोडवा' : 'Take Daily 10-Min Challenge'}</span>
            </button>

            {userProgress.bookmarkedQuestionIds.length > 0 && (
              <button
                onClick={onOpenBookmarks}
                className="px-4 py-3 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
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
                className="px-4 py-3 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 text-indigo-200 border border-indigo-500/30 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>{isMr ? 'मराठी व इंग्रजी व्याकरण नियम' : 'Grammar Rules & Shortcuts'}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400 text-stone-950 font-extrabold uppercase">
                  {isMr ? 'नवीन' : 'New'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

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
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono px-1.5 py-0.5 rounded-full font-bold">
                  {isMr ? 'क्लाउड लाइव्ह' : 'Cloud Live'}
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-mono px-1.5 py-0.5 rounded-full font-bold">
                  {questionsCount} {isMr ? 'प्रश्न उपलब्ध' : 'Questions Ready'}
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
                className="px-3 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-850 border border-stone-300 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
                title={isMr ? "नवीन प्रश्न तयार करून Firebase मध्ये Add करा" : "Add new question to Firebase"}
              >
                <PlusCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>{isMr ? '+ प्रश्न जोडा' : '+ Add Question'}</span>
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

      {/* Main Practice Exam Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-stone-900">
              {isMr ? 'मुख्य सराव परीक्षा पॅटर्न' : 'Full Exam Practice Modules'}
            </h2>
            <p className="text-xs text-stone-500">
              {isMr ? 'परीक्षेच्या प्रत्यक्ष स्वरूपानुसार नकारात्मक गुणांकनासह सराव करा.' : 'Practice in authentic MPSC time-bound formats with negative markings.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Rajyaseva GS Prelims */}
          <div className="bg-white rounded-2xl border-2 border-stone-200 hover:border-amber-500/80 p-6 flex flex-col justify-between transition-all hover:shadow-md group">
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
          <div className="bg-white rounded-2xl border-2 border-stone-200 hover:border-blue-500/80 p-6 flex flex-col justify-between transition-all hover:shadow-md group">
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
          <div className="bg-white rounded-2xl border-2 border-stone-200 hover:border-emerald-500/80 p-6 flex flex-col justify-between transition-all hover:shadow-md group">
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
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-indigo-50 rounded-full blur-xl pointer-events-none" />
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

      {/* Grammar Rules Spotlight Card */}
      {onOpenGrammarRules && (
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-2 relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <FileText className="w-3.5 h-3.5" />
              <span>{isMr ? 'मराठी व इंग्रजी व्याकरण नियम कोश' : 'Grammar Rules & Exam Shortcuts'}</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
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

          <button
            id="btn-open-grammar-rules-spotlight"
            onClick={onOpenGrammarRules}
            className="relative z-10 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 shadow-sm cursor-pointer"
          >
            <span>{isMr ? 'नियम व सूत्रे अभ्यासा ➜' : 'Explore Grammar Rules ➜'}</span>
          </button>
        </div>
      )}

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBJECTS.map((sub) => {
            const count = pool.filter((q) => q.subjectId === sub.id).length;

            return (
              <div
                key={sub.id}
                className="bg-white rounded-xl border border-stone-200 p-5 hover:border-stone-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                      {count} {isMr ? 'प्रश्न उपलब्ध' : 'Questions'}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-stone-900 mb-1">
                    {isMr ? sub.nameMr : sub.nameEn}
                  </h3>

                  <p className="text-xs text-stone-500 line-clamp-2">
                    {isMr ? sub.descriptionMr : sub.descriptionEn}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between">
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
    </div>
  );
};
