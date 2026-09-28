import React, { useState, useEffect } from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { MPSC_EXAM_SCHEDULE, calculateTimeRemaining } from '../data/mpscExamsData';
import { ExamPatternId, SubjectId } from '../types';

interface ExamCountdownCardProps {
  language: 'mr' | 'en';
  onStartExam?: (patternId: ExamPatternId, subjectId?: SubjectId, title?: string) => void;
  onOpenFullSchedule: () => void;
}

export const ExamCountdownCard: React.FC<ExamCountdownCardProps> = ({
  language,
  onOpenFullSchedule,
}) => {
  const isMr = language === 'mr';
  const primaryExam = MPSC_EXAM_SCHEDULE[0]; // राज्यसेवा पूर्व परीक्षा (Civil Services)
  const [timeRemaining, setTimeRemaining] = useState(() => calculateTimeRemaining(primaryExam.targetDate));

  useEffect(() => {
    // 1-minute interval update is ideal for remaining days
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(primaryExam.targetDate));
    }, 60000);
    return () => clearInterval(timer);
  }, [primaryExam.targetDate]);

  const daysLeft = timeRemaining ? timeRemaining.days : 0;

  return (
    <div className="w-full">
      {/* Dashboard Exam Count: Only sleek button without all bulky details */}
      <button
        type="button"
        id="btn-dashboard-exam-countdown"
        onClick={onOpenFullSchedule}
        className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 hover:border-amber-500/60 p-4 sm:p-5 text-left transition-all duration-200 cursor-pointer shadow-md hover:shadow-amber-500/10 hover:scale-[1.005] flex items-center justify-between gap-4 flex-wrap"
        title={isMr ? "MPSC परीक्षा काउंटडाउन व वेळापत्रक उघडा" : "Open MPSC Exam Countdown & Timetable"}
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-amber-500/10 blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />

        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 group-hover:bg-amber-500/30 transition-all shadow-inner">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                {isMr ? '⏳ MPSC परीक्षा काउंटडाउन' : '⏳ MPSC Exam Countdown'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/40 font-mono tracking-wide">
                {isMr ? `${primaryExam.shortNameMr}: ${daysLeft} दिवस शिल्लक` : `${primaryExam.shortNameEn}: ${daysLeft} Days Left`}
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              {isMr 
                ? 'राज्यसेवा, संयुक्त गट ब व क वेळापत्रक व संपूर्ण तपशील पाहण्यासाठी क्लिक करा' 
                : 'Click to view full timetable, remaining days & exam patterns'}
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 group-hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm shadow-md transition-all">
          <span>{isMr ? 'काउंटडाउन व वेळापत्रक उघडा' : 'Open Countdown & Schedule'}</span>
          <ChevronRight className="w-4 h-4 text-stone-950 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>
    </div>
  );
};
