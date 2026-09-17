import React, { useState } from 'react';
import { 
  Target, 
  Clock, 
  Flame, 
  Sliders, 
  Plus, 
  CheckCircle2, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  X,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { UserProgress } from '../types';
import { calculateWeeklyProgress } from '../utils/weeklyGoals';

interface WeeklyGoalCardProps {
  userProgress: UserProgress;
  language: 'mr' | 'en';
  onUpdateWeeklyGoals: (hours: number, questions: number) => void;
  onLogStudySession: (title: string, durationMinutes: number, questionsSolved: number, notes?: string) => void;
  onQuickStartChallenge?: () => void;
}

export const WeeklyGoalCard: React.FC<WeeklyGoalCardProps> = ({
  userProgress,
  language,
  onUpdateWeeklyGoals,
  onLogStudySession,
  onQuickStartChallenge,
}) => {
  const isMr = language === 'mr';
  const stats = calculateWeeklyProgress(userProgress);

  // Modal dialog states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [showRecentLogs, setShowRecentLogs] = useState(false);

  // Edit Goal form state
  const [tempHours, setTempHours] = useState<number>(stats.targetHours);
  const [tempQuestions, setTempQuestions] = useState<number>(stats.targetQuestions);

  // Manual Log form state
  const [logTitle, setLogTitle] = useState<string>('');
  const [logDurationMinutes, setLogDurationMinutes] = useState<number>(45);
  const [logQuestions, setLogQuestions] = useState<number>(25);
  const [logNotes, setLogNotes] = useState<string>('');

  const handleOpenEdit = () => {
    setTempHours(stats.targetHours);
    setTempQuestions(stats.targetQuestions);
    setIsEditModalOpen(true);
  };

  const handleSaveGoals = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateWeeklyGoals(Number(tempHours), Number(tempQuestions));
    setIsEditModalOpen(false);
  };

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    const defaultTitle = isMr ? 'स्वाध्याय व संदर्भ ग्रंथ वाचन' : 'Reference Book Study & Practice';
    onLogStudySession(
      logTitle.trim() || defaultTitle,
      Number(logDurationMinutes),
      Number(logQuestions),
      logNotes.trim() || undefined
    );
    setIsLogModalOpen(false);
    setLogTitle('');
    setLogNotes('');
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-stone-200/90 shadow-sm overflow-hidden transition-all">
      {/* Top Header Strip */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Calendar className="w-3.5 h-3.5" />
                <span>{isMr ? stats.dateRangeLabelMr : stats.dateRangeLabelEn}</span>
              </span>

              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                stats.status === 'completed'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : stats.status === 'ahead'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  : stats.status === 'needs_boost'
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {isMr ? stats.statusBadgeMr : stats.statusBadgeEn}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>{isMr ? 'साप्ताहिक अध्ययन उद्दिष्ट' : 'Weekly Study Goals'}</span>
              <span className="text-stone-400 font-mono text-sm sm:text-base font-normal">
                ({stats.overallProgressPercent}% {isMr ? 'पूर्ण' : 'Achieved'})
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
              {isMr ? stats.motivationMr : stats.motivationEn}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="btn-edit-weekly-goals"
              type="button"
              onClick={handleOpenEdit}
              className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title={isMr ? 'उद्दिष्ट बदला' : 'Customize Goals'}
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMr ? 'ध्येय बदला' : 'Edit Goal'}</span>
            </button>

            <button
              id="btn-log-study-session"
              type="button"
              onClick={() => setIsLogModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              title={isMr ? 'ऑफलाइन/स्वाध्याय सराव नोंदवा' : 'Log offline reading or mock session'}
            >
              <Plus className="w-4 h-4" />
              <span>{isMr ? 'सराव नोंदवा' : '+ Log Study'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dual Goals Metric Body */}
      <div className="p-5 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Tracker 1: Practice Hours Spent */}
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      {isMr ? 'सराव व वाचन वेळ' : 'Study Time Practiced'}
                    </span>
                    <h3 className="text-sm font-extrabold text-stone-900">
                      {isMr ? 'तासांचे उद्दिष्ट' : 'Practice Hours Target'}
                    </h3>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                  stats.hoursProgressPercent >= 100 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-900'
                }`}>
                  {stats.hoursProgressPercent}%
                </span>
              </div>

              {/* Big Metric Display */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black font-mono text-stone-900">
                  {stats.totalHoursSpent}
                </span>
                <span className="text-stone-500 font-mono text-lg font-semibold">
                  / {stats.targetHours} {isMr ? 'तास' : 'hrs'}
                </span>
                <span className="text-xs text-stone-500 font-medium ml-auto">
                  ({stats.formattedTimeSpent})
                </span>
              </div>

              {/* Visual Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-stone-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 rounded-full ${
                      stats.hoursProgressPercent >= 100
                        ? 'bg-emerald-500'
                        : 'bg-gradient-to-r from-amber-500 to-amber-600'
                    }`}
                    style={{ width: `${Math.min(100, stats.hoursProgressPercent)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Sub-label & Pacing info */}
            <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs text-stone-600 flex-wrap gap-2">
              <span className="font-medium">
                {stats.hoursRemaining > 0 ? (
                  isMr ? `${stats.hoursRemaining} तास बाकी` : `${stats.hoursRemaining} hrs to goal`
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {isMr ? 'उद्दिष्ट पूर्ण झाले!' : 'Target completed!'}
                  </span>
                )}
              </span>

              {stats.hoursRemaining > 0 && (
                <span className="text-stone-500">
                  {isMr 
                    ? `~${stats.dailyPaceHoursNeeded} तास/दिवस आवश्यक` 
                    : `~${stats.dailyPaceHoursNeeded} hrs/day needed`}
                </span>
              )}
            </div>
          </div>

          {/* Tracker 2: Questions Solved */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      {isMr ? 'सोडवलेले वस्तुनिष्ठ प्रश्न' : 'MCQs Solved'}
                    </span>
                    <h3 className="text-sm font-extrabold text-stone-900">
                      {isMr ? 'प्रश्नांचे उद्दिष्ट' : 'Questions Target'}
                    </h3>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                  stats.questionsProgressPercent >= 100 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-emerald-100/70 text-emerald-900'
                }`}>
                  {stats.questionsProgressPercent}%
                </span>
              </div>

              {/* Big Metric Display */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black font-mono text-stone-900">
                  {stats.totalQuestionsSolved}
                </span>
                <span className="text-stone-500 font-mono text-lg font-semibold">
                  / {stats.targetQuestions} {isMr ? 'प्रश्न' : 'Qs'}
                </span>
                <span className="text-xs text-stone-500 font-medium ml-auto">
                  {isMr ? 'मॉक + स्वाध्याय' : 'Mock + Offline'}
                </span>
              </div>

              {/* Visual Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-stone-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 rounded-full ${
                      stats.questionsProgressPercent >= 100
                        ? 'bg-emerald-500'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-600'
                    }`}
                    style={{ width: `${Math.min(100, stats.questionsProgressPercent)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Sub-label & Pacing info */}
            <div className="pt-3 border-t border-emerald-200/60 flex items-center justify-between text-xs text-stone-600 flex-wrap gap-2">
              <span className="font-medium">
                {stats.questionsRemaining > 0 ? (
                  isMr ? `${stats.questionsRemaining} प्रश्न बाकी` : `${stats.questionsRemaining} Qs to goal`
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {isMr ? 'उद्दिष्ट पूर्ण झाले!' : 'Target completed!'}
                  </span>
                )}
              </span>

              {stats.questionsRemaining > 0 && (
                <span className="text-stone-500">
                  {isMr 
                    ? `~${stats.dailyPaceQuestionsNeeded} प्रश्न/दिवस आवश्यक` 
                    : `~${stats.dailyPaceQuestionsNeeded} Qs/day needed`}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 7-Day Day-by-Day Activity Distribution Bar Chart Strip */}
        <div className="bg-stone-50/80 rounded-2xl p-4 sm:p-5 border border-stone-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                {isMr ? 'साप्ताहिक दैनिक वाटप (सोमवार - रविवार)' : 'Weekly Day-by-Day Activity Distribution'}
              </span>
            </div>
            <span className="text-[11px] text-stone-500 font-medium">
              {stats.daysRemainingInWeek} {isMr ? 'दिवस बाकी' : 'days left in cycle'}
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {stats.days.map((day) => {
              // Calculate relative height based on target or 2 hours
              const maxScaleHours = Math.max(2, stats.targetHours / 5);
              const heightPercent = Math.min(100, Math.round((day.hoursSpent / maxScaleHours) * 100));

              return (
                <div
                  key={day.dateStr}
                  className={`flex flex-col items-center justify-between p-2 sm:p-2.5 rounded-xl border transition-all ${
                    day.isToday
                      ? 'bg-amber-500/10 border-amber-500/50 shadow-xs'
                      : day.hasActivity
                      ? 'bg-white border-stone-200'
                      : 'bg-white/60 border-stone-100 opacity-80'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-[11px] font-bold ${day.isToday ? 'text-amber-700' : 'text-stone-600'}`}>
                      {isMr ? day.shortNameMr : day.shortNameEn}
                    </div>
                    <div className="text-[10px] text-stone-400 font-mono">
                      {day.displayDate.split(' ')[0]}
                    </div>
                  </div>

                  {/* Vertical mini meter */}
                  <div className="w-full flex justify-center py-2">
                    <div className="w-2.5 sm:w-3 bg-stone-200 rounded-full h-12 flex flex-col justify-end overflow-hidden">
                      <div 
                        className={`w-full rounded-full transition-all duration-300 ${
                          day.hoursSpent > 0 ? (day.isToday ? 'bg-amber-500' : 'bg-stone-800') : 'bg-transparent'
                        }`}
                        style={{ height: `${day.hoursSpent > 0 ? Math.max(15, heightPercent) : 0}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-center w-full truncate">
                    <div className="text-[10px] font-mono font-bold text-stone-800">
                      {day.hoursSpent > 0 ? `${day.hoursSpent}h` : '0h'}
                    </div>
                    <div className="text-[9px] text-stone-500 font-mono truncate">
                      {day.questionsSolved > 0 ? `${day.questionsSolved}Q` : '—'}
                    </div>
                  </div>

                  {day.isToday && (
                    <span className="mt-1 text-[8px] font-black uppercase tracking-tight px-1 py-0.2 rounded bg-amber-500 text-stone-950">
                      {isMr ? 'आज' : 'Today'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Collapsible Recent Sessions / Activity Logs */}
        {stats.recentLogs.length > 0 && (
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowRecentLogs(!showRecentLogs)}
              className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <span>
                {isMr 
                  ? `या आठवड्यातील सराव नोंदी (${stats.recentLogs.length})` 
                  : `Recent activity logs for this week (${stats.recentLogs.length})`}
              </span>
              {showRecentLogs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showRecentLogs && (
              <div className="mt-3 space-y-2">
                {stats.recentLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-[10px] ${
                        log.type === 'exam' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {log.type === 'exam' ? <Target className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className="font-bold text-stone-900">{log.title}</div>
                        <div className="text-[11px] text-stone-500">
                          {log.dateStr} • {log.type === 'exam' ? (isMr ? 'मॉक परीक्षा' : 'CBT Mock') : (isMr ? 'स्वाध्याय सराव' : 'Self Study')}
                          {log.notes && ` • "${log.notes}"`}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-stone-900">
                        {log.durationMinutes} mins
                      </span>
                      <span className="text-stone-400 mx-1">•</span>
                      <span className="font-mono font-bold text-emerald-700">
                        {log.questionsSolved} Qs
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL 1: Edit Weekly Goals */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-extrabold text-stone-900">
                  {isMr ? 'साप्ताहिक ध्येय निश्चित करा' : 'Customize Weekly Study Goals'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveGoals} className="space-y-4">
              {/* Target Hours Field */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {isMr ? 'साप्ताहिक सराव वेळ (तास)' : 'Weekly Practice Hours Target'}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    step="1"
                    value={tempHours}
                    onChange={(e) => setTempHours(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm font-bold"
                    required
                  />
                  <span className="text-sm font-bold text-stone-500 shrink-0">
                    {isMr ? 'तास' : 'hrs'}
                  </span>
                </div>
                {/* Presets */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[11px] text-stone-400 font-medium mr-1">
                    {isMr ? 'पर्याय:' : 'Presets:'}
                  </span>
                  {[5, 10, 15, 20, 25].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setTempHours(h)}
                      className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-colors ${
                        tempHours === h 
                          ? 'bg-amber-600 text-white' 
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      {h}h
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Questions Field */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {isMr ? 'सोडवण्याचे प्रश्नांचे उद्दिष्ट' : 'Questions to Solve Target'}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="10"
                    max="2000"
                    step="10"
                    value={tempQuestions}
                    onChange={(e) => setTempQuestions(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm font-bold"
                    required
                  />
                  <span className="text-sm font-bold text-stone-500 shrink-0">
                    {isMr ? 'प्रश्न' : 'Qs'}
                  </span>
                </div>
                {/* Presets */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[11px] text-stone-400 font-medium mr-1">
                    {isMr ? 'पर्याय:' : 'Presets:'}
                  </span>
                  {[50, 100, 150, 250, 500].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setTempQuestions(q)}
                      className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-colors ${
                        tempQuestions === q 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      {q}Q
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
                >
                  {isMr ? 'रद्द करा' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold cursor-pointer shadow-sm"
                >
                  {isMr ? 'ध्येय सेव्ह करा' : 'Save Goals'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Log Practice / Offline Study Session */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-extrabold text-stone-900">
                  {isMr ? 'सराव किंवा वाचन सत्र नोंदवा' : 'Log Study or Practice Session'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLogModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-500">
              {isMr 
                ? 'एमपीएससी संदर्भ ग्रंथ वाचन (उदा. लक्ष्मीकांत राज्यघटना, कोळंबे अर्थशास्त्र) किंवा सोडवलेले PYQs साप्ताहिक ट्रॅकरमध्ये नोंदवा.' 
                : 'Log reference book reading or offline PYQ sets to keep your weekly study hours and questions up to date.'}
            </p>

            <form onSubmit={handleSaveLog} className="space-y-4">
              {/* Session Title */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {isMr ? 'विषय / संदर्भ ग्रंथ (पर्यायी)' : 'Topic / Reference Book'}
                </label>
                <input
                  type="text"
                  placeholder={isMr ? 'उदा. राज्यघटना - मूलभूत हक्क सराव' : 'e.g., Laxmikanth Polity revision'}
                  value={logTitle}
                  onChange={(e) => setLogTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs font-medium"
                />
              </div>

              {/* Time Spent */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {isMr ? 'अभ्यास वेळ (मिनिटे)' : 'Duration (Minutes)'}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="5"
                    max="600"
                    step="5"
                    value={logDurationMinutes}
                    onChange={(e) => setLogDurationMinutes(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-xs font-bold"
                    required
                  />
                  <span className="text-xs font-bold text-stone-500 shrink-0">
                    {isMr ? 'मिनिटे' : 'mins'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {[15, 30, 45, 60, 90, 120].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setLogDurationMinutes(m)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                        logDurationMinutes === m
                          ? 'bg-amber-600 text-white'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      +{m}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Questions Solved */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {isMr ? 'सोडवलेले प्रश्न' : 'Questions Solved'}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    max="500"
                    step="5"
                    value={logQuestions}
                    onChange={(e) => setLogQuestions(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs font-bold"
                    required
                  />
                  <span className="text-xs font-bold text-stone-500 shrink-0">
                    {isMr ? 'प्रश्न' : 'Qs'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {[0, 15, 25, 50, 100].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setLogQuestions(q)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                        logQuestions === q
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      +{q}Q
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {isMr ? 'टीप (पर्यायी)' : 'Notes (Optional)'}
                </label>
                <input
                  type="text"
                  placeholder={isMr ? 'उदा. कलम १२ ते ३५ चे विश्लेषण केले' : 'e.g. Fundamental Rights solved from booklet'}
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 text-xs font-medium"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
                >
                  {isMr ? 'रद्द करा' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold cursor-pointer shadow-sm"
                >
                  {isMr ? 'सत्र नोंदवा' : 'Log Session'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
