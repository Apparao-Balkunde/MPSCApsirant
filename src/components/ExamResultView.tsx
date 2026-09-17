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
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  BookOpen,
  Filter
} from 'lucide-react';
import { ExamResult, ExamSession, Question } from '../types';
import { MPSC_QUESTIONS } from '../data/mpscQuestions';
import { SUBJECTS } from '../data/subjects';
import { AdBanner } from './AdBanner';

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
}) => {
  const isMr = language === 'mr';
  const [filter, setFilter] = useState<'all' | 'wrong' | 'correct' | 'unattempted' | 'saved'>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

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
  const questions: Question[] = session.questionIds
    .map((id) => pool.find((q) => q.id === id) || MPSC_QUESTIONS.find((q) => q.id === id))
    .filter((q): q is Question => Boolean(q));

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Top Completion Banner & Score Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
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

          <div className="flex items-center gap-3">
            <button
              onClick={onRetakeExam}
              className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 font-bold text-xs sm:text-sm text-stone-700 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isMr ? 'पुन्हा सराव करा' : 'Retake'}</span>
            </button>
            <button
              onClick={onGoHome}
              className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 font-bold text-xs sm:text-sm text-white flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
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

            const isExpanded = expandedQuestionId === q.id || filteredQuestions.length <= 3;

            return (
              <div key={q.id} className="py-5 space-y-3">
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

                  <div className="flex items-center gap-2">
                    {/* Ask AI Mentor */}
                    <button
                      onClick={() => onOpenAiMentor(q, userChoice !== undefined ? (isMr ? q.optionsMr[userChoice] : q.optionsEn[userChoice]) : undefined)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 transition-colors cursor-pointer"
                      title="Ask AI Mentor for deep breakdown and memory tricks"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span className="hidden sm:inline">{isMr ? 'मार्गदर्शक AI कडून समजून घ्या' : 'Ask AI Mentor'}</span>
                    </button>

                    {/* Bookmark Toggle */}
                    <button
                      onClick={() => onToggleBookmark(q.id)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'bg-amber-100 border-amber-300 text-amber-800'
                          : 'bg-white border-stone-300 text-stone-500 hover:bg-stone-50'
                      }`}
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600 text-amber-600' : ''}`} />
                    </button>

                    {/* Toggle Accordion */}
                    <button
                      onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                      className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <div className="text-stone-900 font-medium text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {isMr ? q.questionMr : q.questionEn}
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {(isMr ? q.optionsMr : q.optionsEn).map((optText, optIdx) => {
                    const isSelectedByCandidate = userChoice === optIdx;
                    const isTheCorrectOption = q.correctAnswerIndex === optIdx;

                    let optStyle = 'border-stone-200 bg-white text-stone-700';
                    if (isTheCorrectOption) {
                      optStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold';
                    } else if (isSelectedByCandidate && !isTheCorrectOption) {
                      optStyle = 'border-rose-400 bg-rose-50/70 text-rose-950 line-through';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${optStyle}`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isTheCorrectOption
                            ? 'bg-emerald-600 text-white'
                            : isSelectedByCandidate
                            ? 'bg-rose-500 text-white'
                            : 'bg-stone-200 text-stone-700'
                        }`}>
                          {optIdx + 1}
                        </span>
                        <span className="flex-1">{optText}</span>
                        {isTheCorrectOption && (
                          <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                            {isMr ? 'अचूक उत्तर' : 'Correct'}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Explanation Box */}
                {isExpanded && (
                  <div className="mt-3 p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2 text-xs sm:text-sm text-stone-800">
                    <div className="font-bold text-amber-900 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      <span>{isMr ? 'स्पष्टीकरण व संदर्भ (Detailed Solution):' : 'Explanation & Official Reference:'}</span>
                    </div>
                    <p className="leading-relaxed text-stone-700 whitespace-pre-line">
                      {isMr ? q.explanationMr : q.explanationEn}
                    </p>
                    {q.reference && (
                      <div className="pt-2 text-xs text-stone-500 font-semibold border-t border-amber-200/60 flex items-center gap-1">
                        <span>{isMr ? 'संदर्भ ग्रंथ:' : 'Reference:'}</span>
                        <span className="text-stone-700">{q.reference}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
