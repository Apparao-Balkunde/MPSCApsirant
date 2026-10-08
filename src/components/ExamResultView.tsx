import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  Home, 
  Bookmark, 
  BookOpen, 
  Filter,
  Trophy,
  TrendingUp,
  Flame,
  Shield,
  Zap,
  Sparkles,
  Users,
  Check,
  AlertCircle,
  FileDown,
  Printer
} from 'lucide-react';
import { ExamResult, ExamSession, Question } from '../types';
import { MPSC_QUESTIONS } from '../data/mpscQuestions';
import { SUBJECTS } from '../data/subjects';
import { AdBanner } from './AdBanner';
import { findQuestionById } from '../utils/hardQuestionsEngine';
import { calculateRealTimeStateRank } from '../utils/rankPredictor';
import { exportToPdf } from '../utils/pdfExport';

interface ExamResultViewProps {
  result: ExamResult;
  session: ExamSession;
  onRetakeExam: () => void;
  onGoHome: () => void;
  language: 'mr' | 'en';
  bookmarkedIds: string[];
  onToggleBookmark: (qId: string) => void;
  onOpenAiMentor: (question: Question, studentAnswer?: string) => void;
  questionsPool?: Question[];
  currentUserName?: string;
  currentUserId?: string;
}

export const ExamResultView: React.FC<ExamResultViewProps> = ({
  result,
  session,
  onRetakeExam,
  onGoHome,
  language,
  bookmarkedIds,
  onToggleBookmark,
  onOpenAiMentor,
  questionsPool,
  currentUserName = 'MPSC Aspirant',
  currentUserId,
}) => {
  const isMr = language === 'mr';
  const [filter, setFilter] = useState<'all' | 'wrong' | 'correct' | 'unattempted' | 'saved'>('all');

  const rankData = calculateRealTimeStateRank(
    result.finalScore,
    result.maxScore,
    result.accuracyPercentage,
    result.attemptedCount,
    result.correctCount,
    result.incorrectCount,
    result.unattemptedCount
  );

  // Trigger confetti if accuracy >= 60%
  useEffect(() => {
    if (result.accuracyPercentage >= 60) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#6366f1', '#ec4899'],
        });
      } catch (e) {
        console.log('Confetti error:', e);
      }
    }
  }, [result.accuracyPercentage]);

  const pool = questionsPool && questionsPool.length > 0 ? questionsPool : MPSC_QUESTIONS;
  const uniqueQuestionIds = Array.from(new Set(session.questionIds));
  const seenIds = new Set<string>();
  const questions: Question[] = [];
  uniqueQuestionIds.forEach((id) => {
    const q = findQuestionById(id, pool);
    if (q && !seenIds.has(q.id)) {
      seenIds.add(q.id);
      questions.push(q);
    }
  });

  // Filter questions for review
  const filteredQuestions = questions.filter((q) => {
    const userChoice = result.answers[q.id];
    const isAnswered = userChoice !== undefined;
    const isCorrect = isAnswered && userChoice === q.correctAnswerIndex;
    const isWrong = isAnswered && userChoice !== q.correctAnswerIndex;
    const isSaved = bookmarkedIds.includes(q.id);

    if (filter === 'wrong') return isWrong;
    if (filter === 'correct') return isCorrect;
    if (filter === 'unattempted') return !isAnswered;
    if (filter === 'saved') return isSaved;
    return true;
  });

  const formatSeconds = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}m ${secs}s`;
  };

  const avgTimePerQuestion = Math.round(
    result.timeSpentSeconds / (result.attemptedCount || 1)
  );

  const handleExportPDF = () => {
    exportToPdf({
      title: `${result.title} - Scorecard & Solutions`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Print-Only Official Exam Result Sheet Header */}
      <div className="hidden print-only mb-6 pb-4 border-b-2 border-stone-800 text-stone-900">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-black uppercase tracking-wider text-amber-800">
              MPSC Aspirant Prep • अधिकृत सराव परीक्षा निकाल व उत्तरपत्रिका
            </div>
            <div className="text-sm font-bold text-stone-700 mt-1">
              {result.title}
            </div>
          </div>
          <div className="text-right text-xs text-stone-600 space-y-0.5">
            <div><strong>दिनांक:</strong> {result.date}</div>
            <div><strong>उमेदवार:</strong> {currentUserName}</div>
            {session.candidateRollNo && <div><strong>बैठक क्रमांक:</strong> {session.candidateRollNo}</div>}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2 p-3 bg-stone-100 rounded-lg text-xs font-semibold border border-stone-300">
          <div>अंतिम गुण: <span className="font-bold text-amber-900">{result.finalScore.toFixed(2)} / {result.maxScore}</span></div>
          <div>अचूकता (Accuracy): <span className="font-bold text-emerald-800">{result.accuracyPercentage}%</span></div>
          <div>सोडवलेले: <span className="font-bold">{result.attemptedCount} (✓{result.correctCount} / ✗{result.incorrectCount})</span></div>
          <div>राज्य रँक: <span className="font-bold text-amber-800">#{rankData.stateRank} ({rankData.percentile}%)</span></div>
        </div>
      </div>

      {/* Top Completion Banner & Score Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 print-avoid-break">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-wider">
                {isMr ? 'चाचणी निकाल' : 'Scorecard'}
              </span>
              <span className="text-xs text-stone-500 font-medium">
                {result.date}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              {result.title}
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              {isMr 
                ? 'खालील गुणपत्रिकेत अचूकता, नकारात्मक गुण व तपशीलवार स्पष्टीकरणे तपासा.'
                : 'Review your net score, negative marks penalty, and subject breakdown below.'}
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Export as PDF button */}
            <button
              onClick={handleExportPDF}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer hover:shadow-md active:scale-95 no-print"
              title={isMr ? 'गुणपत्रिका व उत्तरे PDF मध्ये डाऊनलोड करा' : 'Export Result & Answer Key as PDF'}
            >
              <FileDown className="w-4 h-4 text-stone-950" />
              <span>{isMr ? '📄 PDF डाऊनलोड / प्रिंट' : '📄 Export as PDF'}</span>
            </button>
            <button
              onClick={onRetakeExam}
              className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 font-bold text-xs sm:text-sm text-stone-700 flex items-center gap-2 transition-colors cursor-pointer no-print"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isMr ? 'पुन्हा सराव करा' : 'Retake'}</span>
            </button>
            <button
              onClick={onGoHome}
              className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 font-bold text-xs sm:text-sm text-white flex items-center gap-2 shadow-sm transition-colors cursor-pointer no-print"
            >
              <Home className="w-4 h-4" />
              <span>{isMr ? 'डॅशबोर्डकडे' : 'Dashboard'}</span>
            </button>
          </div>
        </div>

        {/* Primary Metrics 4-Column Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {/* Net Final Marks */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
              {isMr ? 'अंतिम निव्वळ गुण' : 'Net Final Score'}
            </div>
            <div className="text-3xl font-black text-amber-600 font-mono">
              {result.finalScore.toFixed(2)}
              <span className="text-xs font-normal text-stone-500 ml-1">
                / {result.maxScore}
              </span>
            </div>
            <div className="text-[11px] text-stone-500 mt-1">
              {isMr ? 'धनात्मक:' : 'Gross:'} +{result.grossScore.toFixed(1)} | {isMr ? 'नकारात्मक:' : 'Penalty:'} -{result.negativePenalty.toFixed(2)}
            </div>
          </div>

          {/* Accuracy % */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
              {isMr ? 'अचूकता (Accuracy)' : 'Accuracy'}
            </div>
            <div className={`text-3xl font-black font-mono ${
              result.accuracyPercentage >= 65 ? 'text-emerald-600' : 'text-stone-800'
            }`}>
              {result.accuracyPercentage}%
            </div>
            <div className="text-[11px] text-stone-500 mt-1">
              {result.correctCount} {isMr ? 'बरोबर' : 'Correct'} / {result.attemptedCount} {isMr ? 'सोडवलेले' : 'Attempted'}
            </div>
          </div>

          {/* Time Taken */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
              {isMr ? 'घेतलेला वेळ' : 'Time Taken'}
            </div>
            <div className="text-3xl font-black text-stone-900 font-mono">
              {formatSeconds(result.timeSpentSeconds)}
            </div>
            <div className="text-[11px] text-stone-500 mt-1">
              ~{avgTimePerQuestion}s {isMr ? 'प्रति प्रश्न वेग' : 'per question'}
            </div>
          </div>

          {/* Question Breakdown Counts */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
              {isMr ? 'प्रश्नांचे वर्गीकरण' : 'Attempts Breakdown'}
            </div>
            <div className="flex items-center gap-2 pt-1 text-xs font-bold">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                ✓ {result.correctCount}
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                ✗ {result.incorrectCount}
              </span>
              <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-700">
                ○ {result.unattemptedCount}
              </span>
            </div>
            <div className="text-[11px] text-stone-500 mt-2">
              {isMr ? 'एकूण प्रश्न:' : 'Total Questions:'} {result.totalQuestions}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* REAL-TIME MAHARASHTRA STATE RANK & CUT-OFF EVALUATION CARD */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 rounded-2xl border-2 border-amber-500/60 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Top Real-time Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                {isMr ? '🔴 थेट रिअल-टाइम निकाल (LIVE)' : '🔴 LIVE REAL-TIME RANKING'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                {isMr ? '३ जानेवारी २०२७ पूर्व परीक्षा विश्लेषण' : '3 Jan 2027 Prelims Evaluation'}
              </span>
              {session.candidateRollNo && (
                <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700 text-xs font-mono">
                  {isMr ? 'बैठक क्र:' : 'Roll:'} {session.candidateRollNo}
                </span>
              )}
            </div>

            <div className="text-xs text-stone-400 font-medium flex items-center gap-1">
              <Users className="w-4 h-4 text-amber-400" />
              <span>{isMr ? `राज्यभरातील ${rankData.totalAspirants.toLocaleString()} उमेदवारांशी तुलना` : `Compared with ${rankData.totalAspirants.toLocaleString()} State Aspirants`}</span>
            </div>
          </div>

          {/* Main 2-Column Grid: Left Rank & Percentile, Right Cutoff Predictor */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Giant Rank & Percentile Showcase */}
            <div className="lg:col-span-7 space-y-4 bg-stone-900/60 p-5 sm:p-6 rounded-xl border border-stone-800/80 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>{isMr ? 'महाराष्ट्र राज्य गुणवत्ता रँक (State Rank)' : 'Maharashtra State Rank'}</span>
                </div>

                <div className="flex items-baseline gap-3 flex-wrap">
                  <div className="text-4xl sm:text-5xl font-black text-amber-300 font-mono tracking-tight drop-shadow-md">
                    #{rankData.stateRank}
                  </div>
                  <div className="text-sm sm:text-base text-stone-400 font-medium">
                    / {rankData.totalAspirants.toLocaleString()} {isMr ? 'परीक्षार्थी' : 'Aspirants'}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-extrabold text-xs">
                    {rankData.percentile}% {isMr ? 'पर्सेन्टाईल' : 'Percentile'}
                  </span>
                  <span className="text-xs text-stone-300 font-semibold">
                    ({rankData.topPercentileLabel})
                  </span>
                </div>
              </div>

              {/* Qualification Status Callout */}
              <div className={`p-4 rounded-xl border mt-3 ${
                rankData.qualificationStatus === 'QUALIFIED'
                  ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
                  : rankData.qualificationStatus === 'BORDERLINE'
                  ? 'bg-amber-950/70 border-amber-500/50 text-amber-200'
                  : 'bg-rose-950/70 border-rose-500/50 text-rose-200'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  {rankData.qualificationStatus === 'QUALIFIED' ? (
                    <Award className="w-5 h-5 text-emerald-400" />
                  ) : rankData.qualificationStatus === 'BORDERLINE' ? (
                    <AlertCircle className="w-5 h-5 text-amber-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-400" />
                  )}
                  <h4 className="font-extrabold text-sm sm:text-base">
                    {isMr ? rankData.qualificationTitleMr : rankData.qualificationTitleEn}
                  </h4>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed pl-7">
                  {isMr ? rankData.qualificationMessageMr : rankData.qualificationMessageEn}
                </p>
              </div>
            </div>

            {/* Right: Projected Category Cutoffs Table */}
            <div className="lg:col-span-5 bg-stone-900/60 p-5 sm:p-6 rounded-xl border border-stone-800/80 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-3">
                  <h4 className="font-extrabold text-sm text-stone-200 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span>{isMr ? '३ जाने २०२७ अपेक्षित कट-ऑफ अंदाज' : '3 Jan 2027 Expected Cutoffs'}</span>
                  </h4>
                  <span className="text-[11px] font-mono text-amber-300 font-bold">
                    {isMr ? 'तुमचे गुण:' : 'Score:'} {result.finalScore.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {rankData.categoryCutoffs.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-stone-950/50 border border-stone-800/90"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="font-semibold text-stone-300 block truncate">
                          {isMr ? item.categoryMr : item.category}
                        </span>
                        <span className="text-[10px] text-stone-500 font-mono">
                          कट-ऑफ: {item.cutoff} गुण
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`font-mono font-bold text-xs ${
                          item.isQualified ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {item.difference >= 0 ? `+${item.difference.toFixed(1)}` : item.difference.toFixed(1)}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          item.isQualified
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}>
                          {item.isQualified ? (isMr ? 'पात्र ✓' : 'PASS') : (isMr ? 'अपात्र ✗' : 'FAIL')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-stone-400 italic pt-2 border-t border-stone-800/80">
                💡 {isMr ? 'टीप: मागील वर्षांचे मेरिट व निगेटिव्ह मार्किंग पॅटर्ननुसार हा रिअल-टाइम अंदाज आहे.' : 'Note: Real-time statistical projection based on past cutoff trends & 1/4th negative marking.'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AdSense Unit on Result View */}
      <AdBanner slot="8635186039" className="max-w-4xl mx-auto" />

      {/* Subject-Wise Performance Breakdown */}
      {Object.keys(result.subjectPerformance).length > 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
          <h2 className="text-base sm:text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <span>{isMr ? 'विषयवार कामगिरी व अचूकता' : 'Subject-Wise Performance Breakdown'}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(result.subjectPerformance).map(([subId, stats]) => {
              const meta = SUBJECTS.find((s) => s.id === subId);
              const subName = meta ? (isMr ? meta.nameMr : meta.nameEn) : subId;

              return (
                <div key={subId} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-bold text-sm text-stone-900 truncate">
                        {subName}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        stats.accuracy >= 70
                          ? 'bg-emerald-100 text-emerald-800'
                          : stats.accuracy >= 40
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {stats.accuracy}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden mb-3">
                      <div
                        className={`h-full ${
                          stats.accuracy >= 70
                            ? 'bg-emerald-500'
                            : stats.accuracy >= 40
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${stats.accuracy}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-xs text-stone-600 flex justify-between pt-2 border-t border-stone-200">
                    <span>
                      {isMr ? 'बरोबर:' : 'Correct:'} <strong>{stats.correct}</strong>/{stats.total}
                    </span>
                    <span>
                      {isMr ? 'चूक:' : 'Wrong:'} <strong className="text-rose-600">{stats.incorrect}</strong>
                    </span>
                    <span>
                      {isMr ? 'गुण:' : 'Score:'} <strong>{stats.score.toFixed(1)}</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Question by Question Detailed Review */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              {isMr ? 'सविस्तर उत्तरपत्रिका व स्पष्टीकरण' : 'Detailed Question Review & Explanations'}
            </h2>
            <p className="text-xs text-stone-500">
              {isMr ? 'प्रत्येक प्रश्नाचे अचूक उत्तर व संदर्भग्रंथातील स्पष्टीकरण अभ्यासा.' : 'Analyze every question with official reference explanations.'}
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {isMr ? 'सर्व' : 'All'} ({questions.length})
            </button>
            <button
              onClick={() => setFilter('wrong')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                filter === 'wrong'
                  ? 'bg-rose-600 text-white'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              {isMr ? 'चुकलेले' : 'Incorrect'} ({result.incorrectCount})
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                filter === 'correct'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              {isMr ? 'बरोबर' : 'Correct'} ({result.correctCount})
            </button>
            <button
              onClick={() => setFilter('unattempted')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                filter === 'unattempted'
                  ? 'bg-stone-700 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {isMr ? 'अनुत्तरित' : 'Unattempted'} ({result.unattemptedCount})
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="divide-y divide-stone-200 pt-2">
          {filteredQuestions.map((q, idx) => {
            const userChoice = result.answers[q.id];
            const isAnswered = userChoice !== undefined;
            const isCorrect = isAnswered && userChoice === q.correctAnswerIndex;
            const isWrong = isAnswered && userChoice !== q.correctAnswerIndex;
            const isBookmarked = bookmarkedIds.includes(q.id);

            return (
              <div key={`${q.id}-${idx}`} className="py-5 space-y-3 exam-question-card print-avoid-break">
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs px-2.5 py-0.5 rounded bg-stone-200 text-stone-800">
                      Q.{idx + 1}
                    </span>

                    {/* Result Badge */}
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {isMr ? 'बरोबर (+२)' : 'Correct (+2)'}
                      </span>
                    ) : isWrong ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                        <XCircle className="w-3.5 h-3.5" />
                        {isMr ? 'चूक (-०.५)' : 'Incorrect (-0.5)'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                        {isMr ? 'सोडवला नाही (०)' : 'Unattempted (0)'}
                      </span>
                    )}

                    <span className="text-xs text-stone-500">
                      • {q.topic}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 no-print">
                    {/* Bookmark Toggle */}
                    <button
                      onClick={() => onToggleBookmark(q.id)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'bg-amber-100 border-amber-300 text-amber-800'
                          : 'bg-white border-stone-300 text-stone-500 hover:bg-stone-50'
                      }`}
                      title={isBookmarked ? (isMr ? 'जतन केलेले काढा' : 'Remove bookmark') : (isMr ? 'प्रश्न जतन करा' : 'Bookmark question')}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600 text-amber-600' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <div className="text-stone-900 font-semibold text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {isMr ? q.questionMr : q.questionEn}
                </div>

                {/* Options List - Formatted matching image 2 */}
                <div className="flex flex-col gap-2.5 pt-1">
                  {(isMr ? q.optionsMr : q.optionsEn).map((optText, optIdx) => {
                    const isSelectedByCandidate = userChoice === optIdx;
                    const isTheCorrectOption = q.correctAnswerIndex === optIdx;
                    const optionLetter = ['A', 'B', 'C', 'D', 'E', 'F'][optIdx] || `${optIdx + 1}`;

                    let containerStyle = 'border-stone-200/90 bg-[#fbf9f6] text-stone-800 hover:border-stone-300';
                    let badgeStyle = 'bg-[#ece8e2] text-stone-700 font-bold';

                    if (isTheCorrectOption) {
                      containerStyle = 'border border-emerald-500 bg-[#edf8f2] text-emerald-950 font-bold shadow-[0_1px_3px_rgba(16,185,129,0.08)]';
                      badgeStyle = 'bg-emerald-600 text-white font-bold';
                    } else if (isSelectedByCandidate && !isTheCorrectOption) {
                      containerStyle = 'border border-rose-400 bg-rose-50/70 text-rose-950';
                      badgeStyle = 'bg-rose-500 text-white font-bold';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`px-4 py-3 rounded-xl border text-xs sm:text-sm flex items-center gap-3.5 transition-colors ${containerStyle}`}
                      >
                        <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-xs ${badgeStyle}`}>
                          {optionLetter}
                        </span>
                        <span className={`flex-1 text-sm sm:text-base font-medium ${isSelectedByCandidate && !isTheCorrectOption ? 'line-through text-rose-900' : ''}`}>
                          {optText}
                        </span>
                        {isTheCorrectOption && (
                          <div className="ml-auto shrink-0 flex items-center gap-1 text-emerald-600">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          </div>
                        )}
                        {isSelectedByCandidate && !isTheCorrectOption && (
                          <div className="ml-auto shrink-0 flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-100/90 px-2 py-0.5 rounded-md">
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            <span>{isMr ? 'तुमची निवड' : 'Your choice'}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Explanation Box - Exactly matching image 2 */}
                <div className="mt-3.5 p-4 sm:p-5 rounded-xl bg-[#fff9f5] border border-[#f5d7c3] space-y-2 text-xs sm:text-sm text-stone-800 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                  <div className="font-bold text-orange-700 flex items-center gap-1.5 text-sm sm:text-base">
                    <span className="text-base">📖</span>
                    <span>{isMr ? 'स्पष्टीकरण' : 'Explanation'}</span>
                  </div>
                  <p className="leading-relaxed text-stone-700 italic whitespace-pre-line font-normal text-xs sm:text-sm">
                    {isMr ? q.explanationMr : q.explanationEn}
                  </p>
                  {q.reference && (
                    <div className="mt-3 pt-2 text-xs text-stone-500 font-medium border-t border-orange-200/60 flex items-center gap-1.5">
                      <span className="font-semibold text-stone-600">{isMr ? 'संदर्भ ग्रंथ:' : 'Reference:'}</span>
                      <span className="text-stone-700">{q.reference}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
