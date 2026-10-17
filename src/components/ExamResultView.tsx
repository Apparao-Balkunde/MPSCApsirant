import React, { useState, useEffect, useMemo } from 'react';
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
  Printer,
  ShoppingBag,
  ExternalLink,
  DollarSign,
  Copy,
  Star,
  ArrowRight
} from 'lucide-react';
import { ExamResult, ExamSession, Question } from '../types';
import { MPSC_QUESTIONS } from '../data/mpscQuestions';
import { SUBJECTS } from '../data/subjects';
import { AdBanner } from './AdBanner';
import { findQuestionById } from '../utils/hardQuestionsEngine';
import { exportToPdf } from '../utils/pdfExport';
import { VisualMemoryAid } from './VisualMemoryAid';
import { SVGMapContainer } from './SVGMapContainer';
import {
  MPSC_AFFILIATE_BOOKS_DATA,
  buildAmazonAffiliateUrl,
  getStoredAffiliateTag,
  MpscAffiliateBook
} from '../data/mpscAffiliateBooks';
import { getStoredUpiId } from '../data/mpscEarningStrategiesData';

interface ExamResultViewProps {
  result: ExamResult;
  session: ExamSession;
  onRetakeExam: () => void;
  onNextTest?: () => void;
  onGoHome: () => void;
  language: 'mr' | 'en';
  bookmarkedIds: string[];
  onToggleBookmark: (qId: string) => void;
  onOpenAiMentor?: (question: Question, studentAnswer?: string) => void;
  questionsPool?: Question[];
  currentUserName?: string;
  currentUserId?: string;
  onOpenAdSenseManager?: () => void;
  onOpenAffiliateBooks?: (tab?: 'books' | 'guide' | 'settings' | 'link_checker' | 'earning_hub') => void;
}

export const ExamResultView: React.FC<ExamResultViewProps> = ({
  result,
  session,
  onRetakeExam,
  onNextTest,
  onGoHome,
  language,
  bookmarkedIds,
  onToggleBookmark,
  onOpenAiMentor,
  questionsPool,
  currentUserName = 'MPSC Aspirant',
  currentUserId,
  onOpenAdSenseManager,
  onOpenAffiliateBooks,
}) => {
  const isMr = language === 'mr';
  const [filter, setFilter] = useState<'all' | 'wrong' | 'correct' | 'unattempted' | 'saved'>('all');
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const affiliateTag = getStoredAffiliateTag();
  const ownerUpiId = getStoredUpiId();

  // Smart Weak-Subject Book Recommendation for Automated Passive Earning
  const recommendedBook = useMemo<MpscAffiliateBook>(() => {
    const perfEntries = Object.entries(result.subjectPerformance);
    if (perfEntries.length > 0) {
      const sorted = [...perfEntries].sort((a, b) => a[1].accuracy - b[1].accuracy);
      const weakestSubjectId = sorted[0][0];
      const match = MPSC_AFFILIATE_BOOKS_DATA.find((b) => b.subjectId === weakestSubjectId);
      if (match) return match;
    }
    return MPSC_AFFILIATE_BOOKS_DATA.find((b) => b.id === 'tatyancha_thokla') || MPSC_AFFILIATE_BOOKS_DATA[0];
  }, [result.subjectPerformance]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(ownerUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

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
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6 overflow-x-hidden">
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
          <div>घेतलेला वेळ: <span className="font-bold text-stone-800">{formatSeconds(result.timeSpentSeconds)}</span></div>
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
            {/* 🚀 Next Test (पुढील टेस्ट - नवीन प्रश्न) Button */}
            {onNextTest && (
              <button
                onClick={onNextTest}
                id="btn-exam-next-test-top"
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer no-print group border border-emerald-400/40"
                title={isMr ? 'पुढील टेस्ट सुरू करा (नवीन प्रश्न आपोआप लोड होतील)' : 'Start Next Test (Loads fresh new questions)'}
              >
                <Sparkles className="w-4 h-4 text-emerald-200 animate-pulse group-hover:rotate-12 transition-transform" />
                <div className="flex items-center gap-1.5">
                  <span className="tracking-tight">{isMr ? 'पुढील टेस्ट' : 'Next Test'}</span>
                  <span className="px-1.5 py-0.5 bg-emerald-950/60 border border-emerald-300/50 text-emerald-200 text-[10px] rounded-full font-bold">
                    {isMr ? 'नवीन प्रश्न' : 'NEW'}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

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

      {/* AdSense Unit on Result View */}
      <AdBanner 
        placementType="examResult" 
        format="rectangle" 
        className="max-w-4xl mx-auto" 
        onOpenSettings={onOpenAdSenseManager}
      />

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

      {/* 📖 Smart Auto-Affiliate Book Recommendation & Direct Support for Passive Earning */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Box 1: Smart Topper Recommended Book (Weakest Subject Booster) */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-stone-900 to-stone-950 border border-amber-500/30 text-white flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{isMr ? 'कमकुवत घटकासाठी टॉपर्सची शिफारस' : 'Topper Recommended Standard Book'}</span>
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {recommendedBook.discountPercent}% {isMr ? 'सवलत उपलब्ध' : 'Discount'}
              </span>
            </div>

            <div>
              <div className="text-xs text-stone-400 font-medium">
                {isMr ? `विषय: ${recommendedBook.subjectNameMr}` : `Subject: ${recommendedBook.subjectNameEn}`}
              </div>
              <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                {isMr ? recommendedBook.titleMr : recommendedBook.titleEn}
              </h3>
              <div className="text-xs text-amber-300/90 font-bold mt-0.5">
                {isMr ? `लेखक: ${recommendedBook.authorMr} • ${recommendedBook.editionMr}` : `Author: ${recommendedBook.authorEn}`}
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              {isMr ? recommendedBook.importanceMr : recommendedBook.importanceEn}
            </p>

            <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-[11px] text-amber-200/90 flex items-start gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5 fill-amber-400" />
              <span><strong>{isMr ? 'टॉपर टीप:' : 'Topper Tip:'}</strong> {recommendedBook.topperTipMr}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-stone-800">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-emerald-400 font-mono">₹{recommendedBook.offerPrice}</span>
              <span className="text-xs text-stone-500 line-through font-mono">₹{recommendedBook.mrp}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                {recommendedBook.discountPercent}% OFF
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={buildAmazonAffiliateUrl(recommendedBook, affiliateTag)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{isMr ? 'ॲमेझॉनवरून मागवा' : 'Buy on Amazon'}</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>

              {onOpenAffiliateBooks && (
                <button
                  type="button"
                  onClick={() => onOpenAffiliateBooks('books')}
                  className="px-3 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 text-xs font-bold border border-stone-700 cursor-pointer transition-colors"
                  title={isMr ? 'सर्व २६+ पुस्तके' : 'All books'}
                >
                  {isMr ? 'सर्व पुस्तके ➜' : 'All Books ➜'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Box 2: Direct UPI Micro-Support & Pass (Zero Cut Passive Income) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-stone-900 to-stone-950 border border-emerald-500/30 text-white flex flex-col justify-between gap-3">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span>{isMr ? 'मोफत सराव सपोर्ट' : 'Support Free Mock Tests'}</span>
            </div>
            <h4 className="text-sm font-black text-white">
              {isMr ? '☕ वेबसाइट सर्व्हरला सहकार्य करा' : 'Support Server & Get Pro Pass'}
            </h4>
            <p className="text-[11px] text-stone-300 leading-relaxed">
              {isMr
                ? 'पोर्टल मोफत चालू ठेवण्यासाठी छोटी देणगी द्या किंवा ₹४९ चा प्रो पास घेऊन १००,०००+ प्रश्न अमर्याद सोडवा!'
                : 'Contribute a small voluntary tip (₹29) or ₹49 Pro Pass directly to our UPI.'}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center gap-3">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=upi://pay?pa=${encodeURIComponent(
                ownerUpiId
              )}&pn=MPSCAspirantPrep&cu=INR`}
              alt="UPI QR Code"
              className="w-16 h-16 rounded-lg bg-white p-1 shrink-0"
            />
            <div className="space-y-1 min-w-0">
              <div className="text-[11px] font-mono font-bold text-amber-300 truncate">{ownerUpiId}</div>
              <button
                type="button"
                onClick={handleCopyUpi}
                className="px-2.5 py-1 rounded-lg bg-stone-850 hover:bg-stone-800 text-stone-300 text-[10px] font-bold border border-stone-750 flex items-center gap-1 cursor-pointer"
              >
                {copiedUpi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-amber-400" />}
                <span>{copiedUpi ? (isMr ? 'कॉपी झाले!' : 'Copied!') : (isMr ? 'UPI कॉपी करा' : 'Copy UPI')}</span>
              </button>
            </div>
          </div>

          <div className="text-[10px] text-stone-400 text-center">
            {isMr ? 'PhonePe • Google Pay • Paytm द्वारे थेट ०% कपात' : 'Direct zero-commission UPI support'}
          </div>
        </div>
      </div>

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

                  {/* Dedicated SVG Map Container for Geography Answers */}
                  {(q.subjectId === 'maharashtra_geography' || q.subjectId === 'environment' || q.mapType || q.topic.toLowerCase().includes('भूगोल') || q.topic.toLowerCase().includes('geography') || q.subtopic.toLowerCase().includes('नकाशा')) && (
                    <div className="mt-3">
                      <SVGMapContainer
                        mapType={q.mapType || (q.subjectId === 'environment' ? 'world' : 'auto')}
                        highlightTopic={q.topic}
                        subtopic={q.subtopic}
                        questionText={isMr ? q.questionMr : q.questionEn}
                        language={language}
                      />
                    </div>
                  )}

                  {/* Visual Memory Aid with India, World & Maharashtra Maps for Recall */}
                  <VisualMemoryAid
                    subjectId={q.subjectId}
                    topic={q.topic}
                    subtopic={q.subtopic}
                    questionText={isMr ? q.questionMr : q.questionEn}
                    explanationText={isMr ? q.explanationMr : q.explanationEn}
                    language={language}
                    defaultMapType={q.mapType}
                    customImageUrl={q.imageUrl}
                    memoryTrickMr={q.memoryTrickMr}
                    memoryTrickEn={q.memoryTrickEn}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 🎯 Completion & Next Test Bottom Banner */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white border border-stone-800 shadow-xl no-print">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>{isMr ? 'चाचणी पुनरावलोकन पूर्ण!' : 'Test Review Completed!'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {isMr ? 'सराव थांबवू नका! पुढील टेस्टमध्ये नवीन प्रश्न सोडवा' : 'Keep Practicing! Solve Brand New Questions in Next Test'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                {isMr
                  ? '‘पुढील टेस्ट’ पर्यायावर क्लिक करताच सिस्टीम आपोआप यापूर्वी न आलेले नवीन प्रश्न लोड करेल, जेणेकरून तुमचा प्रत्येक विषयाचा १००% सराव पूर्ण होईल.'
                  : 'Clicking ‘Next Test’ automatically pulls unseen, fresh questions so you achieve 100% syllabus coverage and peak exam readiness.'}
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto shrink-0">
              {onNextTest && (
                <button
                  onClick={onNextTest}
                  id="btn-exam-next-test-bottom"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl active:scale-95 transition-all cursor-pointer group"
                >
                  <Sparkles className="w-4 h-4 text-stone-950 animate-pulse group-hover:rotate-12 transition-transform" />
                  <span>{isMr ? 'पुढील टेस्ट सुरू करा (नवीन प्रश्न) →' : 'Start Next Test (New Questions) →'}</span>
                </button>
              )}
              <button
                onClick={onRetakeExam}
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border border-stone-700"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{isMr ? 'हीच टेस्ट पुन्हा द्या' : 'Retake Same'}</span>
              </button>
              <button
                onClick={onGoHome}
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border border-stone-700"
              >
                <Home className="w-4 h-4" />
                <span>{isMr ? 'डॅशबोर्ड' : 'Dashboard'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
