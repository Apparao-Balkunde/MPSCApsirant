import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Target,
  X,
  Search,
  Filter,
  Flame,
  Play,
  PlusCircle,
  Trash2,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Share2,
  Download,
  AlertCircle,
  FileText,
  Sparkles,
  Zap,
  Star
} from 'lucide-react';
import {
  MPSC_EXAM_SCHEDULE,
  MpscExamItem,
  calculateTimeRemaining,
  TimeRemaining,
  getPrimaryTargetExamId,
  setPrimaryTargetExamId,
  getCustomExamTargets,
  saveCustomExamTarget,
  deleteCustomExamTarget
} from '../data/mpscExamsData';
import { ExamPatternId } from '../types';

interface ExamCountdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'mr' | 'en';
  onStartExam: (patternId: ExamPatternId, subjectId?: any, title?: string) => void;
}

export const ExamCountdownModal: React.FC<ExamCountdownModalProps> = ({
  isOpen,
  onClose,
  language,
  onStartExam,
}) => {
  const isMr = language === 'mr';
  const [activeFilter, setActiveFilter] = useState<'all' | 'prelims' | 'mains' | 'skill' | 'custom'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [primaryExamId, setPrimaryExamIdState] = useState<string>(getPrimaryTargetExamId());
  const [expandedExamId, setExpandedExamId] = useState<string | null>(null);
  const [allExams, setAllExams] = useState<MpscExamItem[]>([]);
  const [showAddCustomModal, setShowAddCustomModal] = useState(false);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  // New Custom Exam Form State
  const [customTitle, setCustomTitle] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [customStage, setCustomStage] = useState<'prelims' | 'mains' | 'skill'>('prelims');
  const [customPattern, setCustomPattern] = useState<ExamPatternId>('combine_group_b_c');
  const [customNotes, setCustomNotes] = useState('');

  // Reload all exams including custom ones
  const refreshExams = () => {
    const custom = getCustomExamTargets();
    setAllExams([...MPSC_EXAM_SCHEDULE, ...custom]);
    setPrimaryExamIdState(getPrimaryTargetExamId());
  };

  useEffect(() => {
    if (isOpen) {
      refreshExams();
    }
  }, [isOpen]);

  // Real-time ticking listener (re-renders every second)
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTick(t => (t + 1) % 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Filtered exams
  const filteredExams = useMemo(() => {
    return allExams.filter(exam => {
      // Stage filter
      if (activeFilter === 'prelims' && exam.stage !== 'prelims') return false;
      if (activeFilter === 'mains' && exam.stage !== 'mains') return false;
      if (activeFilter === 'skill' && exam.stage !== 'skill') return false;
      if (activeFilter === 'custom' && !exam.isCustom) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = exam.titleMr.toLowerCase().includes(q) || exam.titleEn.toLowerCase().includes(q);
        const matchShort = exam.shortNameMr.toLowerCase().includes(q) || exam.shortNameEn.toLowerCase().includes(q);
        const matchPosts = exam.targetPostsMr.some(p => p.toLowerCase().includes(q)) || exam.targetPostsEn.some(p => p.toLowerCase().includes(q));
        const matchDept = exam.departmentMr.toLowerCase().includes(q) || exam.departmentEn.toLowerCase().includes(q);
        return matchTitle || matchShort || matchPosts || matchDept;
      }

      return true;
    });
  }, [allExams, activeFilter, searchQuery]);

  const handleSetPrimary = (id: string, name: string) => {
    setPrimaryExamIdState(id);
    setPrimaryTargetExamId(id);
    setFeedbackNotice(
      isMr 
        ? `🎯 "${name}" हे तुमचे प्राथमिक परीक्षा लक्ष्य म्हणून सेट करण्यात आले!` 
        : `🎯 Set "${name}" as your primary target exam!`
    );
    setTimeout(() => setFeedbackNotice(null), 3500);
  };

  const handleSaveCustomExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() || !customDate) return;

    saveCustomExamTarget({
      titleMr: customTitle,
      titleEn: customTitle,
      shortNameMr: customTitle.substring(0, 24),
      shortNameEn: customTitle.substring(0, 24),
      stage: customStage,
      stageLabelMr: customStage === 'prelims' ? 'पूर्व परीक्षा / सराव' : customStage === 'mains' ? 'मुख्य परीक्षा / चाचणी' : 'कौशल्य चाचणी',
      stageLabelEn: customStage === 'prelims' ? 'Prelims / Test Series' : customStage === 'mains' ? 'Mains Test' : 'Skill / Mock',
      targetDate: new Date(customDate).toISOString(),
      examPatternId: customPattern,
      targetPostsMr: ['वैयक्तिक ध्येय (Personal Target)'],
      targetPostsEn: ['Personal Target'],
      departmentMr: 'विद्यार्थी वैयक्तिक वेळापत्रक',
      departmentEn: 'Personal Aspirant Schedule',
      patternSummaryMr: 'विद्यार्थ्याने जोडलेली सराव चाचणी / लक्ष्य तारीख',
      patternSummaryEn: 'Custom Test Series / Milestone Target',
      totalMarks: 100,
      durationMinutes: 60,
      negativeMarking: '0.25 (1/4th)',
      syllabusHighlightsMr: [customNotes || 'नियोजित सराव व पुनरावृत्ती'],
      syllabusHighlightsEn: [customNotes || 'Planned revision and mock practice'],
      strategyTipMr: 'स्वतःच्या ध्येयानुसार वेळेचे नियोजन करा व लक्ष्य गाठा.',
      strategyTipEn: 'Stay disciplined with your self-set deadlines and mock schedule.',
      accentColor: 'orange'
    });

    setCustomTitle('');
    setCustomDate('');
    setCustomNotes('');
    setShowAddCustomModal(false);
    refreshExams();

    setFeedbackNotice(
      isMr ? '🎉 नवीन वैयक्तिक लक्ष्य वेळापत्रकात जोडले गेले!' : '🎉 Custom target added to your timetable!'
    );
    setTimeout(() => setFeedbackNotice(null), 3500);
  };

  const handleDeleteCustom = (id: string) => {
    deleteCustomExamTarget(id);
    refreshExams();
    setFeedbackNotice(isMr ? 'वैयक्तिक लक्ष्य हटवण्यात आले.' : 'Custom target removed.');
    setTimeout(() => setFeedbackNotice(null), 3000);
  };

  // Generate .ics calendar download
  const handleDownloadCalendarIcs = (exam: MpscExamItem) => {
    try {
      const examDate = new Date(exam.targetDate);
      const startIso = examDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const endDate = new Date(examDate.getTime() + exam.durationMinutes * 60 * 1000);
      const endIso = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//MPSC Aspirant Prep//MPSC Timetable//EN',
        'BEGIN:VEVENT',
        `UID:${exam.id}@mpscaspirant.com`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `DTSTART:${startIso}`,
        `DTEND:${endIso}`,
        `SUMMARY:${isMr ? exam.titleMr : exam.titleEn}`,
        `DESCRIPTION:${isMr ? exam.patternSummaryMr : exam.patternSummaryEn} - MPSC Sarathi Prep`,
        'LOCATION:Maharashtra, India',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${exam.shortNameEn.replace(/\s+/g, '_')}_MPSC.ics`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setFeedbackNotice(
        isMr ? '📅 .ics कॅलेंडर फाइल डाऊनलोड झाली!' : '📅 Calendar file (.ics) downloaded!'
      );
      setTimeout(() => setFeedbackNotice(null), 3000);
    } catch (e) {
      console.warn('ICS generation failed:', e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-stone-100">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  {isMr ? 'MPSC परीक्षा वेळापत्रक व काउंटडाउन २०२६-२७' : 'MPSC Exam Timetable & Countdown 2026-27'}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {allExams.length} {isMr ? 'परीक्षा' : 'Exams'}
                </span>
              </div>
              <p className="text-xs text-stone-400">
                {isMr
                  ? 'सर्व आगामी परीक्षांचे अचूक काउंटडाउन, पद तपशील, स्वरूप आणि १-क्लिक सराव टेस्ट.'
                  : 'Live ticking countdowns, target posts, exam patterns & 1-click mock tests.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAddCustomModal(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{isMr ? 'स्वतःचे लक्ष्य जोडा' : 'Add Custom Target'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              title={isMr ? "बंद करा (ESC)" : "Close"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback Alert Notice Banner */}
        {feedbackNotice && (
          <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-between gap-2 animate-in fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{feedbackNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setFeedbackNotice(null)}
              className="text-stone-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* Search & Filter Toolbar */}
        <div className="p-3 sm:p-4 bg-stone-900 border-b border-stone-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isMr ? "परीक्षेचे नाव, पद (PSI, STI, उपजिल्हाधिकारी, लिपिक) शोधा..." : "Search by exam, post (PSI, STI, Collector, Clerk)..."}
              className="w-full bg-stone-950 text-stone-100 placeholder-stone-500 pl-9 pr-3 py-2 rounded-xl border border-stone-800 text-xs focus:outline-hidden focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/50"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', labelMr: 'सर्व (All)', labelEn: 'All' },
              { id: 'prelims', labelMr: 'पूर्व परीक्षा', labelEn: 'Prelims' },
              { id: 'mains', labelMr: 'मुख्य परीक्षा', labelEn: 'Mains' },
              { id: 'skill', labelMr: 'कौशल्य / शारीरिक', labelEn: 'Skill / Ground' },
              { id: 'custom', labelMr: 'माझी ध्येये', labelEn: 'Custom' },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'bg-stone-850 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-750'
                }`}
              >
                {isMr ? tab.labelMr : tab.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Exam Cards Scrollable Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          {filteredExams.length === 0 ? (
            <div className="py-16 text-center text-stone-400 space-y-3">
              <Calendar className="w-12 h-12 text-stone-600 mx-auto" />
              <p className="text-sm font-bold text-stone-300">
                {isMr ? 'कोणतीही परीक्षा आढळली नाही.' : 'No exams match your search.'}
              </p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                className="px-3.5 py-1.5 rounded-lg bg-stone-800 text-amber-300 text-xs font-bold hover:bg-stone-700 transition-colors"
              >
                {isMr ? 'सर्व फिल्टर्स रीसेट करा' : 'Reset Filters'}
              </button>
            </div>
          ) : (
            filteredExams.map((exam) => {
              const rem = calculateTimeRemaining(exam.targetDate);
              const isPrimary = exam.id === primaryExamId;
              const isExpanded = expandedExamId === exam.id;

              const examDateStr = new Date(exam.targetDate).toLocaleDateString(isMr ? 'mr-IN' : 'en-IN', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              return (
                <div
                  key={exam.id}
                  className={`rounded-2xl border transition-all ${
                    isPrimary
                      ? 'bg-stone-950/90 border-amber-500/60 shadow-lg shadow-amber-500/5'
                      : 'bg-stone-850/80 hover:bg-stone-850 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="p-4 sm:p-5 space-y-3.5">
                    {/* Top Row: Badges, Title & Countdown */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          {isPrimary && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-wider shadow-xs">
                              <Star className="w-3 h-3 fill-stone-950" />
                              <span>{isMr ? 'प्राथमिक लक्ष्य' : 'Primary Target'}</span>
                            </span>
                          )}

                          <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-[11px] font-bold border border-stone-700">
                            {isMr ? exam.stageLabelMr : exam.stageLabelEn}
                          </span>

                          <span className="text-xs text-stone-400 font-medium flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-stone-500" />
                            <span>{examDateStr}</span>
                          </span>

                          {exam.isCustom && (
                            <span className="px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-bold">
                              {isMr ? 'वैयक्तिक' : 'Custom'}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                          {isMr ? exam.titleMr : exam.titleEn}
                        </h3>

                        <p className="text-xs text-stone-400">
                          {isMr ? exam.departmentMr : exam.departmentEn}
                        </p>
                      </div>

                      {/* Live Ticking Countdown Badge */}
                      <div className="shrink-0 bg-stone-900 border border-stone-800 p-2.5 rounded-xl text-right min-w-[130px] shadow-inner">
                        {rem.isPast ? (
                          <div className="text-xs font-bold text-rose-400">
                            {isMr ? 'तारीख पूर्ण झाली' : 'Exam Concluded'}
                          </div>
                        ) : (
                          <div>
                            <div className="text-lg sm:text-xl font-mono font-black text-amber-400 tracking-tight">
                              {rem.days}<span className="text-xs font-sans text-stone-400 font-normal">d </span>
                              {String(rem.hours).padStart(2, '0')}<span className="text-xs font-sans text-stone-400 font-normal">h </span>
                              {String(rem.minutes).padStart(2, '0')}<span className="text-xs font-sans text-stone-400 font-normal">m </span>
                              <span className="text-orange-400 text-xs">{String(rem.seconds).padStart(2, '0')}s</span>
                            </div>
                            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                              {isMr ? `${rem.days} दिवस बाकी` : `${rem.days} Days Remaining`}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
                      <div>
                        <span className="text-stone-400 font-bold text-[10px] uppercase block mb-0.5">
                          {isMr ? 'प्रमुख पदे:' : 'Target Posts:'}
                        </span>
                        <p className="text-stone-200 line-clamp-1 font-medium">
                          {(isMr ? exam.targetPostsMr : exam.targetPostsEn).join(', ')}
                        </p>
                      </div>

                      <div>
                        <span className="text-stone-400 font-bold text-[10px] uppercase block mb-0.5">
                          {isMr ? 'स्वरूप व गुण:' : 'Pattern:'}
                        </span>
                        <p className="text-stone-200 font-medium">
                          {isMr ? exam.patternSummaryMr : exam.patternSummaryEn}
                        </p>
                      </div>
                    </div>

                    {/* Expandable Syllabus & Tips */}
                    {isExpanded && (
                      <div className="p-3.5 bg-stone-900/90 rounded-xl border border-stone-800 space-y-3 text-xs animate-in fade-in duration-150">
                        {/* Syllabus highlights */}
                        <div>
                          <span className="text-amber-400 font-bold block mb-1">
                            {isMr ? '📌 महत्त्वाचे अभ्यास घटक (Key Syllabus Highlights):' : '📌 Key Syllabus Topics:'}
                          </span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-stone-300">
                            {(isMr ? exam.syllabusHighlightsMr : exam.syllabusHighlightsEn).map((topic, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Strategy Tip */}
                        <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200">
                          <span className="font-bold block mb-0.5">
                            {isMr ? '💡 तज्ज्ञ तयारी सल्ला:' : '💡 Expert Strategy:'}
                          </span>
                          <p className="text-[11px] leading-relaxed">
                            {isMr ? exam.strategyTipMr : exam.strategyTipEn}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Bottom Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 border-t border-stone-800/80">
                      <div className="flex items-center gap-2">
                        {/* Start Exam Button */}
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onStartExam(exam.examPatternId, undefined, `${isMr ? exam.shortNameMr : exam.shortNameEn} सराव चाचणी`);
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                        >
                          <Play className="w-3.5 h-3.5 fill-stone-950" />
                          <span>{isMr ? 'मॉक टेस्ट सुरू करा' : 'Start Mock Test'}</span>
                        </button>

                        {/* Set as Primary Target Button */}
                        {!isPrimary && (
                          <button
                            type="button"
                            onClick={() => handleSetPrimary(exam.id, isMr ? exam.shortNameMr : exam.shortNameEn)}
                            className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white border border-stone-700 text-xs font-bold transition-all cursor-pointer"
                            title={isMr ? "या परीक्षेला तुमचे प्राथमिक काउंटडाउन लक्ष्य बनवा" : "Make this your primary countdown target"}
                          >
                            <span>{isMr ? '🎯 मुख्य लक्ष्य बनवा' : 'Set as Primary'}</span>
                          </button>
                        )}

                        {/* Calendar export button */}
                        <button
                          type="button"
                          onClick={() => handleDownloadCalendarIcs(exam)}
                          className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-amber-300 border border-stone-700 text-xs transition-colors cursor-pointer"
                          title={isMr ? "कॅलेंडर रिमाइंडर (.ics) डाऊनलोड करा" : "Download Calendar Reminder (.ics)"}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        {exam.isCustom && (
                          <button
                            type="button"
                            onClick={() => handleDeleteCustom(exam.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs transition-colors cursor-pointer"
                            title={isMr ? "हे वैयक्तिक लक्ष्य हटवा" : "Delete custom target"}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}

                        {/* Toggle expand/collapse */}
                        <button
                          type="button"
                          onClick={() => setExpandedExamId(isExpanded ? null : exam.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white border border-stone-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>{isExpanded ? (isMr ? 'कमी माहिती' : 'Less') : (isMr ? 'तपशील' : 'Details')}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-stone-800 bg-stone-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>
              {isMr 
                ? 'वेळापत्रक व कालावधी MPSC च्या अधिकृत निकषांनुसार अद्ययावत आहेत.' 
                : 'Countdowns synced with latest MPSC official examination patterns.'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAddCustomModal(true)}
              className="sm:hidden px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold cursor-pointer"
            >
              + {isMr ? 'नवीन लक्ष्य' : 'Add Target'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-bold transition-colors cursor-pointer"
            >
              {isMr ? 'बंद करा' : 'Close'}
            </button>
          </div>
        </div>

        {/* Custom Target Creation Sub-Modal */}
        {showAddCustomModal && (
          <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-3 animate-in fade-in duration-150">
            <div className="bg-stone-900 border border-stone-750 rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-4 text-stone-100">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-amber-400" />
                  <h3 className="font-extrabold text-sm text-white">
                    {isMr ? 'नवीन वैयक्तिक परीक्षा / टेस्ट सिरीज लक्ष्य जोडा' : 'Add Custom Exam / Test Target'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddCustomModal(false)}
                  className="text-stone-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveCustomExam} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-stone-300 mb-1">
                    {isMr ? 'परीक्षेचे किंवा टेस्ट सिरीजचे नाव *' : 'Exam or Test Series Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder={isMr ? "उदा. क्लास संयुक्त टेस्ट सिरीज पेपर १" : "e.g. Combine Full Mock 1"}
                    className="w-full bg-stone-950 text-stone-100 p-2.5 rounded-xl border border-stone-800 focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-300 mb-1">
                      {isMr ? 'नियोजित तारीख व वेळ *' : 'Target Date & Time *'}
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      className="w-full bg-stone-950 text-stone-100 p-2.5 rounded-xl border border-stone-800 focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-300 mb-1">
                      {isMr ? 'परीक्षेचा टप्पा' : 'Stage'}
                    </label>
                    <select
                      value={customStage}
                      onChange={(e) => setCustomStage(e.target.value as any)}
                      className="w-full bg-stone-950 text-stone-100 p-2.5 rounded-xl border border-stone-800 focus:outline-hidden focus:border-amber-500"
                    >
                      <option value="prelims">{isMr ? 'पूर्व परीक्षा / सराव' : 'Prelims / Practice'}</option>
                      <option value="mains">{isMr ? 'मुख्य परीक्षा' : 'Mains'}</option>
                      <option value="skill">{isMr ? 'कौशल्य / टायपिंग' : 'Skill / Typing'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-300 mb-1">
                    {isMr ? 'मॉक टेस्ट पॅटर्न जोडा' : 'Link Mock Test Pattern'}
                  </label>
                  <select
                    value={customPattern}
                    onChange={(e) => setCustomPattern(e.target.value as any)}
                    className="w-full bg-stone-950 text-stone-100 p-2.5 rounded-xl border border-stone-800 focus:outline-hidden focus:border-amber-500"
                  >
                    <option value="combine_group_b_c">{isMr ? 'संयुक्त गट-ब व क (१०० प्रश्न, १ तास)' : 'Combine Group B & C (100 Qs)'}</option>
                    <option value="rajyaseva_gs">{isMr ? 'राज्यसेवा GS (१०० प्रश्न, २०० गुण)' : 'Rajyaseva GS (100 Qs)'}</option>
                    <option value="daily_10_challenge">{isMr ? 'दैनिक १० चॅलेंज (१० मिनिटे)' : 'Daily 10 Challenge'}</option>
                    <option value="hard_challenge">{isMr ? 'कठीण प्रश्न सराव' : 'Hard Challenge'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-300 mb-1">
                    {isMr ? 'टीप किंवा अभ्यासाचे लक्ष्य (ऐच्छिक)' : 'Notes / Revision Target (Optional)'}
                  </label>
                  <textarea
                    rows={2}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder={isMr ? "उदा. चालू घडामोडी व महाराष्ट्राचा इतिहास उजळणी..." : "e.g. Revise Maharashtra Geography..."}
                    className="w-full bg-stone-950 text-stone-100 p-2 rounded-xl border border-stone-800 focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddCustomModal(false)}
                    className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold transition-colors cursor-pointer"
                  >
                    {isMr ? 'रद्द करा' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black transition-colors cursor-pointer shadow-md"
                  >
                    {isMr ? 'लक्ष्य सेव्ह करा' : 'Save Target'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
