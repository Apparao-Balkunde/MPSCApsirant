import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  Target, 
  Flame, 
  ChevronRight, 
  Play, 
  Award, 
  Sparkles, 
  AlertCircle,
  ExternalLink,
  ChevronDown,
  Layers,
  CheckCircle2,
  Bell
} from 'lucide-react';
import { 
  MPSC_EXAM_SCHEDULE, 
  MpscExamItem, 
  calculateTimeRemaining, 
  TimeRemaining, 
  getPrimaryTargetExamId, 
  setPrimaryTargetExamId,
  getCustomExamTargets
} from '../data/mpscExamsData';
import { ExamPatternId } from '../types';

interface ExamCountdownCardProps {
  language: 'mr' | 'en';
  onStartExam: (patternId: ExamPatternId, subjectId?: any, title?: string) => void;
  onOpenFullSchedule: () => void;
}

export const ExamCountdownCard: React.FC<ExamCountdownCardProps> = ({
  language,
  onStartExam,
  onOpenFullSchedule,
}) => {
  const isMr = language === 'mr';
  const [selectedExamId, setSelectedExamId] = useState<string>(getPrimaryTargetExamId());
  const [currentTimeRemaining, setCurrentTimeRemaining] = useState<TimeRemaining | null>(null);
  const [allExams, setAllExams] = useState<MpscExamItem[]>(MPSC_EXAM_SCHEDULE);

  // Load custom exams if any
  useEffect(() => {
    const custom = getCustomExamTargets();
    setAllExams([...MPSC_EXAM_SCHEDULE, ...custom]);
  }, []);

  // Current primary target exam
  const currentExam = useMemo(() => {
    return allExams.find(e => e.id === selectedExamId) || allExams[0];
  }, [allExams, selectedExamId]);

  // Real-time 1-second interval ticking countdown
  useEffect(() => {
    if (!currentExam) return;

    // Initial calculation
    setCurrentTimeRemaining(calculateTimeRemaining(currentExam.targetDate));

    const interval = setInterval(() => {
      setCurrentTimeRemaining(calculateTimeRemaining(currentExam.targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentExam]);

  const handleSelectExam = (id: string) => {
    setSelectedExamId(id);
    setPrimaryTargetExamId(id);
  };

  // Other upcoming exams (excluding current) sorted by days remaining
  const upcomingOthers = useMemo(() => {
    return allExams
      .filter(e => e.id !== currentExam.id)
      .map(e => ({
        exam: e,
        rem: calculateTimeRemaining(e.targetDate)
      }))
      .filter(item => !item.rem.isPast)
      .slice(0, 3);
  }, [allExams, currentExam.id]);

  const formattedExamDate = useMemo(() => {
    try {
      const d = new Date(currentExam.targetDate);
      return d.toLocaleDateString(isMr ? 'mr-IN' : 'en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return currentExam.targetDate;
    }
  }, [currentExam.targetDate, isMr]);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 border border-stone-800 shadow-xl text-stone-100 p-5 sm:p-7 space-y-6">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />

      {/* Top Header: Badge, Title & Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-black tracking-wide uppercase">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              <span>{isMr ? 'लाईव्ह परीक्षा काउंटडाउन' : 'Live Exam Countdown'}</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-xs font-bold border border-stone-700">
              {isMr ? currentExam.stageLabelMr : currentExam.stageLabelEn}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{isMr ? currentExam.titleMr : currentExam.titleEn}</span>
          </h2>
          <p className="text-xs text-amber-300/80 font-medium flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{isMr ? `नियोजित तारीख: ${formattedExamDate}` : `Scheduled Date: ${formattedExamDate}`}</span>
          </p>
        </div>

        {/* Target Switcher Dropdown */}
        <div className="shrink-0 flex items-center gap-2">
          <div className="relative">
            <label htmlFor="exam-countdown-selector" className="sr-only">
              {isMr ? 'लक्ष्य परीक्षा निवडा' : 'Choose Target Exam'}
            </label>
            <select
              id="exam-countdown-selector"
              value={selectedExamId}
              onChange={(e) => handleSelectExam(e.target.value)}
              className="appearance-none bg-stone-800 hover:bg-stone-750 text-amber-300 text-xs font-bold pl-3 pr-8 py-2 rounded-xl border border-stone-700 hover:border-amber-500/50 transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-amber-500/50"
            >
              {allExams.map((exam) => (
                <option key={exam.id} value={exam.id} className="bg-stone-900 text-stone-100">
                  🎯 {isMr ? exam.shortNameMr : exam.shortNameEn}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-amber-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>

          <button
            type="button"
            onClick={onOpenFullSchedule}
            className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title={isMr ? "सर्व MPSC परीक्षांचे वेळापत्रक पहा" : "View Full MPSC Timetable"}
          >
            <span>{isMr ? 'सर्व वेळापत्रक' : 'All Exams'}</span>
            <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>

      {/* Main Countdown Digits Display */}
      {currentTimeRemaining && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Days */}
          <div className="bg-gradient-to-b from-stone-800/90 to-stone-900 p-3.5 sm:p-4 rounded-xl border border-amber-500/30 text-center shadow-inner shadow-black/40 group hover:border-amber-400 transition-colors">
            <div className="text-3xl sm:text-5xl font-mono font-black text-amber-400 tracking-tight group-hover:scale-105 transition-transform duration-200">
              {currentTimeRemaining.days}
            </div>
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-stone-400 mt-1">
              {isMr ? 'दिवस (Days)' : 'Days'}
            </div>
          </div>

          {/* Hours */}
          <div className="bg-gradient-to-b from-stone-800/90 to-stone-900 p-3.5 sm:p-4 rounded-xl border border-stone-750 text-center shadow-inner shadow-black/40 group hover:border-stone-600 transition-colors">
            <div className="text-3xl sm:text-5xl font-mono font-black text-stone-100 tracking-tight">
              {String(currentTimeRemaining.hours).padStart(2, '0')}
            </div>
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-stone-400 mt-1">
              {isMr ? 'तास (Hours)' : 'Hours'}
            </div>
          </div>

          {/* Minutes */}
          <div className="bg-gradient-to-b from-stone-800/90 to-stone-900 p-3.5 sm:p-4 rounded-xl border border-stone-750 text-center shadow-inner shadow-black/40 group hover:border-stone-600 transition-colors">
            <div className="text-3xl sm:text-5xl font-mono font-black text-stone-100 tracking-tight">
              {String(currentTimeRemaining.minutes).padStart(2, '0')}
            </div>
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-stone-400 mt-1">
              {isMr ? 'मिनिटे (Mins)' : 'Minutes'}
            </div>
          </div>

          {/* Seconds */}
          <div className="bg-gradient-to-b from-stone-800/90 to-stone-900 p-3.5 sm:p-4 rounded-xl border border-orange-500/30 text-center shadow-inner shadow-black/40 group hover:border-orange-400 transition-colors">
            <div className="text-3xl sm:text-5xl font-mono font-black text-orange-400 tracking-tight animate-pulse">
              {String(currentTimeRemaining.seconds).padStart(2, '0')}
            </div>
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-stone-400 mt-1">
              {isMr ? 'सेकंद (Secs)' : 'Seconds'}
            </div>
          </div>
        </div>
      )}

      {/* Target Posts & Exam Quick Spec Chips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-stone-950/60 p-3.5 rounded-xl border border-stone-800">
        <div className="space-y-1">
          <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px] block">
            {isMr ? '🎯 प्रमुख पदे (Target Posts)' : '🎯 Target Posts'}
          </span>
          <p className="font-semibold text-stone-200 line-clamp-2">
            {(isMr ? currentExam.targetPostsMr : currentExam.targetPostsEn).slice(0, 4).join(', ')}...
          </p>
        </div>

        <div className="space-y-1">
          <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px] block">
            {isMr ? '📝 परीक्षा स्वरूप व गुण' : '📝 Pattern & Marks'}
          </span>
          <p className="font-semibold text-stone-200">
            {isMr ? currentExam.patternSummaryMr : currentExam.patternSummaryEn}
          </p>
        </div>

        <div className="space-y-1">
          <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px] block">
            {isMr ? '💡 तज्ज्ञ मार्गदर्शन टीप' : '💡 Expert Strategy Tip'}
          </span>
          <p className="text-amber-200/90 line-clamp-2 leading-relaxed">
            {isMr ? currentExam.strategyTipMr : currentExam.strategyTipEn}
          </p>
        </div>
      </div>

      {/* Action Strip: Practice Button & Mini Upcoming Timers */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => onStartExam(currentExam.examPatternId, undefined, `${isMr ? currentExam.shortNameMr : currentExam.shortNameEn} मॉक टेस्ट`)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-stone-950" />
            <span>{isMr ? 'या परीक्षेची मॉक टेस्ट सुरू करा' : 'Start Mock Practice Test'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenFullSchedule}
            className="hidden lg:inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 text-xs font-bold transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{isMr ? 'सर्व परीक्षा वेळापत्रक' : 'Full Exam Calendar'}</span>
          </button>
        </div>

        {/* Other Upcoming Mini Badges */}
        {upcomingOthers.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap justify-end w-full sm:w-auto">
            <span className="text-[11px] font-bold text-stone-400 hidden xl:inline">
              {isMr ? 'इतर परीक्षा:' : 'Other Exams:'}
            </span>
            {upcomingOthers.map(({ exam, rem }) => (
              <button
                key={exam.id}
                type="button"
                onClick={() => handleSelectExam(exam.id)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700/80 text-[11px] font-bold text-stone-300 hover:text-amber-300 transition-all cursor-pointer"
                title={isMr ? `${exam.titleMr} वर स्विच करा` : `Switch to ${exam.titleEn}`}
              >
                <span>{isMr ? exam.shortNameMr : exam.shortNameEn}</span>
                <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 font-mono font-black text-[10px]">
                  {rem.days}d
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
