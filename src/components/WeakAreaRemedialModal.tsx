import React, { useState } from 'react';
import {
  X,
  Target,
  Flame,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  TrendingDown,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Play,
  HelpCircle,
  Clock,
  Award,
} from 'lucide-react';
import { Question, SubjectId, UserProgress } from '../types';
import { VisualMemoryAid } from './VisualMemoryAid';
import {
  analyzeUserWeakAreas,
  generateRemedialQuestionSet,
  SubjectVulnerability,
  ALL_MPSC_SUBJECT_IDS,
} from '../utils/weakAreaRemedialEngine';
import { soundFx } from '../utils/audio';

interface WeakAreaRemedialModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'mr' | 'en';
  userProgress: UserProgress;
  questionsPool: Question[];
  onStartCustomExam: (customQuestionIds: string[], title: string, subjectId?: SubjectId) => void;
}

export const WeakAreaRemedialModal: React.FC<WeakAreaRemedialModalProps> = ({
  isOpen,
  onClose,
  language,
  userProgress,
  questionsPool,
  onStartCustomExam,
}) => {
  const isMr = language === 'mr';
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'mistakes'>('overview');
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(25);

  if (!isOpen) return null;

  const analysis = analyzeUserWeakAreas(userProgress, questionsPool);

  const handleLaunchAutoBooster = () => {
    soundFx.playCorrectSound();
    const generated = generateRemedialQuestionSet({
      mode: 'auto_booster',
      count: selectedQuestionCount,
      userProgress,
      questionPool: questionsPool,
    });
    onClose();
    onStartCustomExam(
      generated.questions.map((q) => q.id),
      isMr ? generated.titleMr : generated.titleEn
    );
  };

  const handleLaunchPastErrors = () => {
    soundFx.playCorrectSound();
    const generated = generateRemedialQuestionSet({
      mode: 'past_errors',
      count: selectedQuestionCount,
      userProgress,
      questionPool: questionsPool,
    });
    onClose();
    onStartCustomExam(
      generated.questions.map((q) => q.id),
      isMr ? generated.titleMr : generated.titleEn
    );
  };

  const handleLaunchSubjectDrill = (subjectId: SubjectId) => {
    soundFx.playClickSound();
    const generated = generateRemedialQuestionSet({
      mode: 'weak_subject',
      targetSubjectId: subjectId,
      count: selectedQuestionCount,
      userProgress,
      questionPool: questionsPool,
    });
    onClose();
    onStartCustomExam(
      generated.questions.map((q) => q.id),
      isMr ? generated.titleMr : generated.titleEn,
      subjectId
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-red-950 via-rose-900 to-stone-950 text-white p-5 sm:p-6 border-b border-rose-500/30 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-0.5 rounded-full bg-rose-500 text-stone-950 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <Target className="w-3.5 h-3.5 fill-stone-950" />
                  {isMr ? 'स्मार्ट रिमेडियल मोड' : 'Smart Remedial Mode'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold">
                  {isMr ? 'निगेटिव्ह मार्किंग नियंत्रण' : 'Negative Penalty Elimination'}
                </span>
                {analysis.criticalSubjectsCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold animate-pulse">
                    ⚠️ {analysis.criticalSubjectsCount} {isMr ? 'विषय संवेदनशील' : 'Critical Areas'}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>{isMr ? '🎯 कमकुवत घटक विशेष सराव व एरर बूस्टर' : '🎯 Weak Area Booster & Error Remedial Hub'}</span>
              </h2>

              <p className="text-xs sm:text-sm text-rose-100 max-w-2xl leading-relaxed">
                {isMr
                  ? 'तुमच्या मागील सर्व टेस्ट्सच्या विश्लेषणातून ज्या घटकांत जास्त गुण वजा झाले आहेत, त्यावर वैयक्तिकृत सराव करून नकारात्मक गुणांचे नुकसान शून्य करा!'
                  : 'Identifies negative marks leakage across your test history and synthesizes high-yield remedial drills to turn weak subjects into scoring strengths.'}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer shrink-0"
              title={isMr ? "बंद करा" : "Close"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-rose-800/60 text-xs overflow-x-auto no-scrollbar">
            <button
              onClick={() => {
                soundFx.playClickSound();
                setActiveTab('overview');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'bg-stone-900/60 text-rose-200 hover:bg-stone-800'
              }`}
            >
              📊 {isMr ? 'एकूण विश्लेषण व बूस्टर' : 'Overview & Booster'}
            </button>

            <button
              onClick={() => {
                soundFx.playClickSound();
                setActiveTab('subjects');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'subjects'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'bg-stone-900/60 text-rose-200 hover:bg-stone-800'
              }`}
            >
              📚 {isMr ? 'विषयनिहाय कमकुवतता' : 'Subject Vulnerability'} ({analysis.subjectBreakdown.length})
            </button>

            <button
              onClick={() => {
                soundFx.playClickSound();
                setActiveTab('mistakes');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'mistakes'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'bg-stone-900/60 text-rose-200 hover:bg-stone-800'
              }`}
            >
              ❌ {isMr ? 'चुकलेले प्रश्न' : 'Past Mistakes'} ({analysis.pastMistakes.length})
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50 dark:bg-stone-950 space-y-5">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-5 animate-fade-in">
              {/* Summary Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">
                    {isMr ? 'एकूण सोडवलेले प्रश्न' : 'Questions Attempted'}
                  </span>
                  <div className="text-2xl font-black text-stone-900 dark:text-white mt-1 font-mono">
                    {analysis.totalQuestionsAttempted}
                  </div>
                  <span className="text-[10px] text-stone-500">
                    {analysis.totalExamsTaken} {isMr ? 'चाचण्यांमध्ये' : 'tests taken'}
                  </span>
                </div>

                <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
                  <span className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wide block">
                    {isMr ? 'एकूण चुका (Mistakes)' : 'Incorrect Answers'}
                  </span>
                  <div className="text-2xl font-black text-red-600 dark:text-red-400 mt-1 font-mono">
                    {analysis.totalIncorrect}
                  </div>
                  <span className="text-[10px] text-red-600/80 font-medium">
                    {analysis.overallAccuracy}% {isMr ? 'एकूण अचूकता' : 'accuracy'}
                  </span>
                </div>

                <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide block">
                    {isMr ? 'वजा झालेले गुण (Penalty)' : 'Negative Marks Lost'}
                  </span>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1 font-mono">
                    -{analysis.totalNegativePenaltyLost.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-stone-500">
                    {isMr ? '१/४ नियमानुसार नुकसान' : 'via 1/4th negative rule'}
                  </span>
                </div>

                <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
                  <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide block">
                    {isMr ? 'सर्वात संवेदनशील विषय' : 'Weakest Area'}
                  </span>
                  <div className="text-sm font-black text-stone-900 dark:text-white mt-1.5 truncate">
                    {analysis.weakestSubject ? analysis.weakestSubject.subjectNameMr : (isMr ? 'चाचणी बाकी' : 'Pending Test')}
                  </div>
                  <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold">
                    {analysis.weakestSubject ? `${analysis.weakestSubject.accuracy}% अचूकता` : (isMr ? 'सुरुवात करा' : 'Take a test')}
                  </span>
                </div>
              </div>

              {/* Action Banner: Launch Auto Remedial Booster */}
              <div className="bg-gradient-to-br from-rose-50 via-white to-amber-50 dark:from-stone-900 dark:via-stone-900 dark:to-stone-800 rounded-3xl border-2 border-rose-300/80 dark:border-rose-900/60 p-5 sm:p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="space-y-2 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 font-bold text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isMr ? 'एआय-शक्तीवर आधारित प्रश्न निवड' : 'Smart Remedial Algorithm'}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-stone-950 dark:text-white">
                    {isMr
                      ? '⚡ स्मार्ट ऑटो-रिमेडियल चाचणी सोडवा'
                      : '⚡ Launch Smart Auto-Remedial Booster Test'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {isMr
                      ? 'हा अल्गोरिदम तुमच्या चुकलेल्या प्रश्नांना आणि सर्वाधिक निगेटिव्ह गुण गेलेल्या घटकांना एकत्र करून २५ प्रश्नांची अचूक सुधारणा चाचणी तयार करतो.'
                      : 'Curates 25 customized MCQs blending your exact past errors and lowest-accuracy subjects to eliminate negative marking.'}
                  </p>

                  {/* Question Count Selector */}
                  <div className="flex items-center gap-2 pt-1 text-xs">
                    <span className="font-bold text-stone-500">{isMr ? 'प्रश्नांची संख्या:' : 'Question Count:'}</span>
                    {[15, 25, 40].map((cnt) => (
                      <button
                        key={cnt}
                        onClick={() => setSelectedQuestionCount(cnt)}
                        className={`px-2.5 py-1 rounded-lg font-bold font-mono transition-colors cursor-pointer ${
                          selectedQuestionCount === cnt
                            ? 'bg-rose-600 text-white'
                            : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        {cnt} {isMr ? 'प्रश्न' : 'Qs'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-col gap-2.5 w-full sm:w-auto shrink-0">
                  <button
                    onClick={handleLaunchAutoBooster}
                    className="px-6 py-3.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-sm rounded-2xl shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>{isMr ? 'ऑटो-बूस्टर सुरू करा ➜' : 'Start Auto Booster ➜'}</span>
                  </button>

                  {analysis.pastMistakes.length > 0 && (
                    <button
                      onClick={handleLaunchPastErrors}
                      className="px-5 py-2.5 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-700/60 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>
                        {isMr
                          ? `केवळ चुकलेले ${Math.min(analysis.pastMistakes.length, selectedQuestionCount)} प्रश्न सोडवा`
                          : `Retest ${Math.min(analysis.pastMistakes.length, selectedQuestionCount)} Past Mistakes`}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Critical Weak Areas Quick List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    <span>{isMr ? 'विषयनिहाय अचूकता व प्राधान्यक्रम' : 'Subject Accuracy & Priority'}</span>
                  </h4>
                  <button
                    onClick={() => setActiveTab('subjects')}
                    className="text-xs text-rose-700 dark:text-rose-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>{isMr ? 'सर्व विषय पहा' : 'View all subjects'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {analysis.subjectBreakdown.slice(0, 4).map((sub) => (
                    <div
                      key={sub.subjectId}
                      className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 space-y-2.5 hover:border-rose-400/50 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-black text-stone-900 dark:text-white">
                            {isMr ? sub.subjectNameMr : sub.subjectNameEn}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                              sub.priority === 'critical'
                                ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border border-red-200 dark:border-red-800'
                                : sub.priority === 'strong'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                            }`}
                          >
                            {sub.priority === 'critical' ? (isMr ? 'संवेदनशील' : 'Critical') : sub.priority === 'strong' ? (isMr ? 'उत्तम' : 'Strong') : (isMr ? 'मध्यम' : 'Moderate')}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1 mt-2">
                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-stone-500">{isMr ? 'अचूकता:' : 'Accuracy:'}</span>
                            <span className="font-bold text-stone-900 dark:text-white">{sub.accuracy}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                sub.accuracy < 50
                                  ? 'bg-red-500'
                                  : sub.accuracy < 70
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-500'
                              }`}
                              style={{ width: `${Math.min(100, Math.max(5, sub.accuracy))}%` }}
                            />
                          </div>
                        </div>

                        <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                          💡 {isMr ? sub.adviceMr : sub.adviceEn}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-stone-500 font-mono">
                          ❌ {sub.incorrect} {isMr ? 'चूका' : 'errors'} • -{sub.negativeMarksLost.toFixed(1)} गुण
                        </span>
                        <button
                          onClick={() => handleLaunchSubjectDrill(sub.subjectId)}
                          className="px-3 py-1 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 font-bold rounded-lg cursor-pointer transition-colors"
                        >
                          {isMr ? 'सराव करा ➜' : 'Drill ➜'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUBJECTS TAB */}
          {activeTab === 'subjects' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-500">
                  {isMr ? 'सर्व १० अधिकृत विषयांचे विश्लेषण व ड्रिल:' : 'All 10 Official Subject Breakdowns:'}
                </span>
                <span className="text-xs text-stone-400">
                  {isMr ? 'प्रत्येक ड्रिलमध्ये २५ प्रश्न' : '25 Qs per drill'}
                </span>
              </div>

              <div className="space-y-3">
                {analysis.subjectBreakdown.map((sub) => (
                  <div
                    key={sub.subjectId}
                    className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-rose-400/60 transition-all"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-black text-stone-900 dark:text-white">
                          {isMr ? sub.subjectNameMr : sub.subjectNameEn}
                        </h4>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                            sub.priority === 'critical'
                              ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border border-red-200 dark:border-red-800'
                              : sub.priority === 'strong'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          }`}
                        >
                          {sub.priority === 'critical' ? (isMr ? 'अतिसंवेदनशील' : 'Critical') : sub.priority === 'strong' ? (isMr ? 'मजबूत' : 'Strong') : (isMr ? 'साधारण' : 'Moderate')}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono text-stone-500 flex-wrap">
                        <span>{isMr ? 'सोडवले:' : 'Attempted:'} <strong className="text-stone-800 dark:text-stone-200">{sub.attempted}</strong></span>
                        <span>•</span>
                        <span className="text-emerald-600 font-bold">✓ {sub.correct} {isMr ? 'बरोबर' : 'Correct'}</span>
                        <span>•</span>
                        <span className="text-red-600 font-bold">✗ {sub.incorrect} {isMr ? 'चूक' : 'Wrong'}</span>
                        <span>•</span>
                        <span>{isMr ? 'अचूकता:' : 'Accuracy:'} <strong className="text-stone-900 dark:text-white">{sub.accuracy}%</strong></span>
                        <span>•</span>
                        <span className="text-amber-600 font-bold">-{sub.negativeMarksLost.toFixed(1)} {isMr ? 'गुण वजा' : 'penalty'}</span>
                      </div>

                      <p className="text-xs text-stone-600 dark:text-stone-400 pt-1 leading-relaxed">
                        📌 {isMr ? sub.adviceMr : sub.adviceEn}
                      </p>
                    </div>

                    <button
                      onClick={() => handleLaunchSubjectDrill(sub.subjectId)}
                      className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl shadow-xs transition-all hover:scale-105 shrink-0 flex items-center gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>{isMr ? '२५ प्रश्नांची चाचणी द्या ➜' : 'Launch 25 Qs Drill ➜'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MISTAKES TAB */}
          {activeTab === 'mistakes' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="text-sm font-black text-stone-900 dark:text-white">
                    {isMr ? 'मागील परीक्षांतील चुकलेले प्रश्न' : 'Questions Answered Incorrectly'} ({analysis.pastMistakes.length})
                  </h4>
                  <p className="text-xs text-stone-500">
                    {isMr
                      ? 'प्रत्येक प्रश्नाचे अचूक उत्तर व संदर्भ स्पष्टीकरण वाचून पुन्हा सराव करा.'
                      : 'Review the correct rationale and launch a revision sprint to fix errors.'}
                  </p>
                </div>

                {analysis.pastMistakes.length > 0 && (
                  <button
                    onClick={handleLaunchPastErrors}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs rounded-xl shadow-xs transition-all hover:scale-105 flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isMr ? 'सर्व चुकलेल्या प्रश्नांची टेस्ट द्या' : 'Re-test Mistakes'}</span>
                  </button>
                )}
              </div>

              {analysis.pastMistakes.length === 0 ? (
                <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center font-bold text-xl">
                    🎉
                  </div>
                  <h4 className="text-base font-bold text-stone-900 dark:text-white">
                    {isMr ? 'सध्या कोणताही चुकलेला प्रश्न नाही!' : 'No incorrect questions logged yet!'}
                  </h4>
                  <p className="text-xs text-stone-500 max-w-md mx-auto">
                    {isMr
                      ? 'तुम्ही नवीन चाचण्या दिल्यानंतर चुकलेले प्रश्न येथे आपोआप नोंदवले जातील. नियमित सराव सुरू ठेवा!'
                      : 'Attempt mock exams and any mistakes made will automatically populate here for remedial analysis.'}
                  </p>
                  <button
                    onClick={handleLaunchAutoBooster}
                    className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-rose-500"
                  >
                    {isMr ? 'सराव चाचणी सुरू करा' : 'Start Practice Exam'}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {analysis.pastMistakes.map((mistake, idx) => {
                    const q = mistake.question;
                    return (
                      <div
                        key={`${mistake.questionId}-${idx}`}
                        className="bg-white dark:bg-stone-900 rounded-2xl border-2 border-red-200 dark:border-red-900/60 p-4 sm:p-5 space-y-3 shadow-xs"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2.5 py-0.5 rounded-md bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 font-bold text-xs font-mono">
                              #{idx + 1}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px] font-semibold">
                              {q.topic}
                            </span>
                            <span className="text-xs text-stone-400">•</span>
                            <span className="text-xs text-stone-500">
                              {mistake.examTitle} ({mistake.date})
                            </span>
                          </div>

                          <span className="text-[11px] font-bold text-red-600 bg-red-50 dark:bg-red-950/80 px-2 py-0.5 rounded border border-red-200 dark:border-red-900">
                            -०.२५ {isMr ? 'गुण' : 'marks'}
                          </span>
                        </div>

                        {/* Question Text */}
                        <p className="text-sm font-semibold text-stone-900 dark:text-white leading-relaxed whitespace-pre-line">
                          {isMr ? q.questionMr : q.questionEn}
                        </p>

                        {/* Options Comparison */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-300">
                            <span className="font-bold block text-[10px] uppercase text-red-600">
                              ✗ {isMr ? 'तुमचा चुकीचा पर्याय:' : 'Your Incorrect Choice:'}
                            </span>
                            <span className="font-medium mt-0.5 block">
                              {(isMr ? q.optionsMr : q.optionsEn)[mistake.userSelectedOption] || (isMr ? 'अनुत्तरित' : 'Not answered')}
                            </span>
                          </div>

                          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-300">
                            <span className="font-bold block text-[10px] uppercase text-emerald-600">
                              ✓ {isMr ? 'अचूक उत्तर:' : 'Correct Answer:'}
                            </span>
                            <span className="font-bold mt-0.5 block">
                              {(isMr ? q.optionsMr : q.optionsEn)[q.correctAnswerIndex]}
                            </span>
                          </div>
                        </div>

                        {/* Explanation */}
                        <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl text-xs text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 leading-relaxed whitespace-pre-line">
                          <strong className="text-amber-700 dark:text-amber-400 block mb-1">
                            💡 {isMr ? 'अधिकृत संदर्भ व स्पष्टीकरण:' : 'Explanation & Reference:'}
                          </strong>
                          {isMr ? q.explanationMr : q.explanationEn}
                          {q.reference && (
                            <div className="text-[10px] text-stone-500 mt-1 italic">
                              📚 {q.reference}
                            </div>
                          )}

                          {/* Visual Memory Aid with India, World & Maharashtra Maps for Recall */}
                          <VisualMemoryAid
                            subjectId={q.subjectId}
                            topic={q.topic}
                            subtopic={q.subtopic}
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
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100 dark:bg-stone-900 px-5 py-3.5 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3 text-xs flex-wrap">
          <span className="text-stone-500">
            🎯 {isMr ? 'एमपीएससी अधिकृत १/४ निगेटिव्ह मार्किंग पॅटर्न' : 'Official MPSC 1/4th penalty calibration'}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold rounded-xl cursor-pointer transition-colors"
            >
              {isMr ? 'बंद करा' : 'Close'}
            </button>
            <button
              onClick={handleLaunchAutoBooster}
              className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{isMr ? '२५ प्रश्नांचा सराव सुरू करा ➜' : 'Start 25 Qs Sprint ➜'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
