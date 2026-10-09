import React, { useState, useMemo } from 'react';
import {
  X,
  Trophy,
  Trees,
  FlaskConical,
  Sparkles,
  Landmark,
  Clock,
  Award,
  BookOpen,
  ChevronRight,
  CheckCircle2,
  Filter,
  Search,
  Printer,
  Copy,
  Check,
  Play,
  Eye,
  EyeOff,
  Flame,
  Info,
  ShieldCheck,
  Share2,
  BarChart3,
  ListOrdered
} from 'lucide-react';
import {
  SUBJECT_MARATHON_SETS_CATALOG,
  SubjectMarathonId,
  SubjectMarathonMeta,
  getSubjectMarathonQuestions
} from '../data/subjectMarathonSetsData';
import { ExamPatternId, Question, UserProgress } from '../types';
import { soundFx } from '../utils/audio';

interface SubjectMarathonModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'mr' | 'en';
  onStartExam: (patternId: ExamPatternId, subjectId?: any, title?: string) => void;
  userProgress?: UserProgress;
  initialMarathonId?: SubjectMarathonId;
  questionPool?: Question[];
}

export const SubjectMarathonModal: React.FC<SubjectMarathonModalProps> = ({
  isOpen,
  onClose,
  language,
  onStartExam,
  userProgress,
  initialMarathonId = 'marathon_geo_forest',
  questionPool,
}) => {
  const isMr = language === 'mr';
  const [selectedMarathonId, setSelectedMarathonId] = useState<SubjectMarathonId>(initialMarathonId);
  const [activeTab, setActiveTab] = useState<'overview' | 'explorer' | 'weightage'>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'Easy' | 'Moderate' | 'Hard'>('all');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync initial ID when modal opens
  React.useEffect(() => {
    if (isOpen && initialMarathonId) {
      setSelectedMarathonId(initialMarathonId);
    }
  }, [isOpen, initialMarathonId]);

  const currentMarathon = useMemo<SubjectMarathonMeta>(() => {
    return (
      SUBJECT_MARATHON_SETS_CATALOG.find((m) => m.id === selectedMarathonId) ||
      SUBJECT_MARATHON_SETS_CATALOG[0]
    );
  }, [selectedMarathonId]);

  const questions = useMemo<Question[]>(() => {
    return getSubjectMarathonQuestions(currentMarathon.patternId, questionPool);
  }, [currentMarathon.patternId, questionPool]);

  // Filter questions for explorer view
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchQMr = q.questionMr?.toLowerCase().includes(query);
        const matchQEn = q.questionEn?.toLowerCase().includes(query);
        const matchTopic = q.topic?.toLowerCase().includes(query);
        const matchSubtopic = q.subtopic?.toLowerCase().includes(query);
        return matchQMr || matchQEn || matchTopic || matchSubtopic;
      }
      return true;
    });
  }, [questions, selectedDifficulty, searchQuery]);

  if (!isOpen) return null;

  const handleStartMarathon = () => {
    if (userProgress?.soundEffectsEnabled ?? true) {
      soundFx.playClickSound();
    }
    onStartExam(currentMarathon.patternId, currentMarathon.subjectId, currentMarathon.titleMr);
    onClose();
  };

  const toggleAnswerReveal = (id: string) => {
    if (userProgress?.soundEffectsEnabled ?? true) {
      soundFx.playToggleSound(true);
    }
    setRevealedAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAllAnswers = () => {
    const shouldRevealAll = Object.keys(revealedAnswers).length < filteredQuestions.length;
    if (shouldRevealAll) {
      const allTrue: Record<string, boolean> = {};
      filteredQuestions.forEach((q) => {
        allTrue[q.id] = true;
      });
      setRevealedAnswers(allTrue);
    } else {
      setRevealedAnswers({});
    }
  };

  const handleCopyQuestion = (q: Question) => {
    const text = `${q.questionMr}\n१) ${q.optionsMr[0]}\n२) ${q.optionsMr[1]}\n३) ${q.optionsMr[2]}\n४) ${q.optionsMr[3]}\n\nउत्तर: पर्याय (${q.correctAnswerIndex + 1}) - ${q.optionsMr[q.correctAnswerIndex]}\nस्पष्टीकरण: ${q.explanationMr}\nसंदर्भ: ${q.reference}`;
    navigator.clipboard.writeText(text);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white">
      <div
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] print:max-h-none print:border-none print:shadow-none print:bg-white text-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {isMr ? 'अधिकृत १०० प्रश्न सराव' : 'Official 100 Qs Marathon'}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  {isMr ? 'MPSC गट-ब, गट-क व तलाठी विशेष' : 'Combined & Talathi Standard'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                {isMr ? 'विषयनिहाय १०० प्रश्नांचे मॅरेथॉन पेपर्स' : 'Subject-Wise 100 Qs Marathon Sets'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-colors"
              title={isMr ? 'प्रश्नपत्रिका प्रिंट करा' : 'Print Paper'}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isMr ? 'प्रिंट' : 'Print'}</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Marathon Subject Selector Buttons (Horizontal Scrollable Strip) */}
        <div className="bg-slate-950 px-3 py-2.5 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto shrink-0 print:hidden">
          {SUBJECT_MARATHON_SETS_CATALOG.map((m) => {
            const isSelected = m.id === selectedMarathonId;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedMarathonId(m.id);
                  setSearchQuery('');
                  setRevealedAnswers({});
                  if (userProgress?.soundEffectsEnabled ?? true) {
                    soundFx.playClickSound();
                  }
                }}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 scale-[1.02]'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {m.id === 'marathon_geo_forest' && <Trees className="w-4 h-4 shrink-0" />}
                {m.id === 'marathon_science' && <FlaskConical className="w-4 h-4 shrink-0" />}
                {m.id === 'marathon_current_affairs' && <Sparkles className="w-4 h-4 shrink-0" />}
                {m.id === 'marathon_polity' && <Landmark className="w-4 h-4 shrink-0" />}
                <span>{isMr ? m.shortTitleMr : m.shortTitleEn}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    isSelected ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  १०० Qs
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Marathon Hero Banner */}
        <div
          className={`p-4 sm:p-6 bg-gradient-to-r ${currentMarathon.bannerGradient} border-b ${currentMarathon.borderColor} shrink-0 text-white relative overflow-hidden`}
        >
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-6 opacity-10 pointer-events-none">
            {currentMarathon.id === 'marathon_geo_forest' && <Trees className="w-64 h-64" />}
            {currentMarathon.id === 'marathon_science' && <FlaskConical className="w-64 h-64" />}
            {currentMarathon.id === 'marathon_current_affairs' && <Sparkles className="w-64 h-64" />}
            {currentMarathon.id === 'marathon_polity' && <Landmark className="w-64 h-64" />}
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-sm border border-white/30 text-white">
                  {currentMarathon.badgeMr}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-black/20 text-white/90">
                  {isMr ? 'नकारात्मक गुणदान: १/४ (-०.२५)' : 'Negative Marking: 1/4th (-0.25)'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950 font-black">
                  {isMr ? 'लक्ष्य कट-ऑफ: ' + currentMarathon.targetCutoff.open + '+ गुण' : 'Target Cutoff: ' + currentMarathon.targetCutoff.open + '+ Marks'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-sm">
                {isMr ? currentMarathon.titleMr : currentMarathon.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-2xl font-medium">
                {isMr
                  ? 'MPSC आयोग व TCS/IBPS पॅटर्ननुसार संपूर्ण अभ्यासक्रमाचे अचूक प्रमाणबद्ध वर्गीकरण. प्रत्येक प्रश्नाला अधिकृत संदर्भासह सविस्तर मराठी स्पष्टीकरण.'
                  : 'Full 100 questions marathon covering official syllabus weightage with bilingual explanations and reference sources.'}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={handleStartMarathon}
                type="button"
                className="px-5 py-3 rounded-xl bg-white text-slate-950 hover:bg-amber-300 font-black text-sm shadow-xl flex items-center gap-2 transition-transform transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>{isMr ? 'मॅरेथॉन परीक्षा सुरू करा' : 'Start Marathon Exam'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Mode Tabs (Overview vs 100 Questions Explorer vs Weightage) */}
        <div className="bg-slate-950 border-b border-slate-800 px-4 py-2 flex items-center justify-between gap-2 shrink-0 print:hidden">
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isMr ? '📋 अभ्यासक्रम व कट-ऑफ' : '📋 Syllabus & Cutoff'}
            </button>
            <button
              onClick={() => setActiveTab('explorer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'explorer'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isMr ? '📖 १०० प्रश्न एक्सप्लोरर' : '📖 100 Qs Explorer'}</span>
            </button>
            <button
              onClick={() => setActiveTab('weightage')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'weightage'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{isMr ? '📊 विषयनिहाय भारांश' : '📊 Topic Weightage'}</span>
            </button>
          </div>

          {activeTab === 'explorer' && (
            <div className="flex items-center gap-2">
              <button
                onClick={toggleAllAnswers}
                type="button"
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 border border-slate-700 transition-colors"
              >
                {Object.keys(revealedAnswers).length < filteredQuestions.length ? (
                  <>
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isMr ? 'सर्व उत्तरे दाखवा' : 'Show All Keys'}</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                    <span>{isMr ? 'उत्तरे लपवा' : 'Hide All Keys'}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Modal Body / Tab Contents */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-900/60 print:p-2 print:overflow-visible">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Target Cutoffs Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <h4 className="text-base font-bold text-white">
                      {isMr ? 'अपेक्षित कट-ऑफ व मेरिट बेंचमार्क (Target Cut-offs)' : 'Expected Cut-off Targets'}
                    </h4>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {isMr ? '१०० गुणांपैकी' : 'Out of 100 Marks'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Open (General)</div>
                    <div className="text-2xl font-black text-amber-400 mt-1">{currentMarathon.targetCutoff.open}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{isMr ? 'सुरक्षित गुण' : 'Safe Score'}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">OBC / EWS</div>
                    <div className="text-2xl font-black text-emerald-400 mt-1">{currentMarathon.targetCutoff.obc}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{isMr ? 'सुरक्षित गुण' : 'Safe Score'}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">SC प्रवर्ग</div>
                    <div className="text-2xl font-black text-blue-400 mt-1">{currentMarathon.targetCutoff.sc}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{isMr ? 'सुरक्षित गुण' : 'Safe Score'}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">ST प्रवर्ग</div>
                    <div className="text-2xl font-black text-purple-400 mt-1">{currentMarathon.targetCutoff.st}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{isMr ? 'सुरक्षित गुण' : 'Safe Score'}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center col-span-2 sm:col-span-1">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">महिला प्रवर्ग</div>
                    <div className="text-2xl font-black text-rose-400 mt-1">{currentMarathon.targetCutoff.female}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{isMr ? 'सुरक्षित गुण' : 'Safe Score'}</div>
                  </div>
                </div>
              </div>

              {/* Official Syllabus Scope */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <h4 className="text-base font-bold text-white">
                    {isMr ? 'अधिकृत १०० प्रश्न अभ्यासक्रम व्याप्ती (Syllabus Scope)' : 'Official Syllabus Coverage'}
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {(isMr ? currentMarathon.syllabusCoverageMr : currentMarathon.syllabusCoverageEn).map(
                    (point, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs sm:text-sm text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Topper Strategy Tips */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="w-5 h-5 text-amber-400" />
                  <h4 className="text-base font-bold text-amber-200">
                    {isMr ? 'टॉपर्सची परीक्षा स्ट्रॅटेजी व रिव्हिजन टिप्स' : 'Topper Exam Tips'}
                  </h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-amber-100/90 list-disc list-inside">
                  {currentMarathon.keyStrategiesMr.map((tip, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm sm:text-base">
                      {isMr ? 'वेळेचे नियोजन: ६० मिनिटे / १०० प्रश्न' : 'Time Management: 60 Mins / 100 Qs'}
                    </h5>
                    <p className="text-xs text-slate-400">
                      {isMr
                        ? 'प्रति प्रश्न साधारण ३६ सेकंद वेळ मिळेल. योग्य अचूकतेसह (Accuracy 80%+) सराव करा.'
                        : 'Practice with standard 36 seconds per question to build exam temperament.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleStartMarathon}
                  type="button"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>{isMr ? 'आता परीक्षा सुरू करा' : 'Start Exam Now'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: EXPLORER (BROWSE ALL 100 QUESTIONS) */}
          {activeTab === 'explorer' && (
            <div className="space-y-4">
              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 print:hidden">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      isMr
                        ? 'प्रश्नातून किंवा उपघटकातून शोधा (उदा. सह्याद्री, पेशी, ऑलिम्पिक, कलम ३२)...'
                        : 'Search question text or topic...'
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" />
                    {isMr ? 'काठिण्य:' : 'Difficulty:'}
                  </span>
                  {(['all', 'Easy', 'Moderate', 'Hard'] as const).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                        selectedDifficulty === diff
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {diff === 'all'
                        ? isMr
                          ? 'सर्व'
                          : 'All'
                        : diff === 'Easy'
                        ? isMr
                          ? 'सुलभ'
                          : 'Easy'
                        : diff === 'Moderate'
                        ? isMr
                          ? 'मध्यम'
                          : 'Moderate'
                        : isMr
                        ? 'कठीण'
                        : 'Hard'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>
                  {isMr
                    ? `एकूण १०० प्रश्नांपैकी ${filteredQuestions.length} प्रश्न उपलब्ध`
                    : `Showing ${filteredQuestions.length} of 100 questions`}
                </span>
                <span className="text-amber-400 font-bold">
                  {isMr ? 'क्लिक करून उत्तर व स्पष्टीकरण उघडा' : 'Click card to reveal solution'}
                </span>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {filteredQuestions.map((q, idx) => {
                  const isRevealed = Boolean(revealedAnswers[q.id]);
                  const qNum = idx + 1;
                  return (
                    <div
                      key={q.id}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all text-slate-100 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-black text-xs shrink-0">
                            Q{qNum}
                          </span>
                          <span className="text-xs font-bold text-slate-400">
                            {q.topic} {q.subtopic ? `• ${q.subtopic}` : ''}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                              q.difficulty === 'Hard'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : q.difficulty === 'Moderate'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {q.difficulty}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 print:hidden">
                          <button
                            onClick={() => handleCopyQuestion(q)}
                            type="button"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            title={isMr ? 'कॉपी करा' : 'Copy'}
                          >
                            {copiedId === q.id ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => toggleAnswerReveal(q.id)}
                            type="button"
                            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 flex items-center gap-1 transition-colors"
                          >
                            {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            <span>{isRevealed ? (isMr ? 'लपवा' : 'Hide') : isMr ? 'उत्तर' : 'Answer'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Question Text in Marathi */}
                      <p className="text-sm sm:text-base font-bold text-white leading-relaxed whitespace-pre-line">
                        {q.questionMr}
                      </p>

                      {/* Question Text in English (Collapsible / Secondary) */}
                      {q.questionEn && q.questionEn !== q.questionMr && (
                        <p className="text-xs text-slate-400 leading-relaxed italic border-l-2 border-slate-700 pl-3">
                          {q.questionEn}
                        </p>
                      )}

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {q.optionsMr.map((opt, optIdx) => {
                          const isCorrect = optIdx === q.correctAnswerIndex;
                          return (
                            <div
                              key={optIdx}
                              className={`p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors flex items-start gap-2 ${
                                isRevealed && isCorrect
                                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200 font-bold'
                                  : 'bg-slate-900 border-slate-800 text-slate-300'
                              }`}
                            >
                              <span
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                                  isRevealed && isCorrect
                                    ? 'bg-emerald-500 text-slate-950'
                                    : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                {optIdx + 1}
                              </span>
                              <span>{opt}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Answer & Explanation Section */}
                      {isRevealed && (
                        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs sm:text-sm space-y-2 mt-2">
                          <div className="flex items-center gap-2 text-emerald-300 font-black">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>
                              {isMr
                                ? `अचूक उत्तर: पर्याय (${q.correctAnswerIndex + 1}) - ${
                                    q.optionsMr[q.correctAnswerIndex]
                                  }`
                                : `Correct Answer: Option (${q.correctAnswerIndex + 1}) - ${
                                    q.optionsMr[q.correctAnswerIndex]
                                  }`}
                            </span>
                          </div>
                          {q.explanationMr && (
                            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                              {q.explanationMr}
                            </p>
                          )}
                          {q.reference && (
                            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1 border-t border-emerald-500/20">
                              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span>{isMr ? `संदर्भ: ${q.reference}` : `Reference: ${q.reference}`}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: WEIGHTAGE BREAKDOWN */}
          {activeTab === 'weightage' && (
            <div className="space-y-6">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-amber-400" />
                    <h4 className="text-base font-bold text-white">
                      {isMr
                        ? 'घटकनिहाय प्रश्न संख्या व टक्केवारी भारांश (Weightage Distribution)'
                        : 'Topic Weightage Distribution'}
                    </h4>
                  </div>
                  <span className="text-xs text-amber-400 font-bold">
                    {isMr ? 'एकूण १०० प्रश्न' : 'Total 100 Qs'}
                  </span>
                </div>

                <div className="space-y-4">
                  {currentMarathon.topicBreakdown.map((t, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                        <span className="text-slate-200">{isMr ? t.topicMr : t.topicEn}</span>
                        <span className="text-amber-400 font-black">
                          {t.questionCount} {isMr ? 'प्रश्न' : 'Qs'} ({t.percentage}%)
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                          style={{ width: `${t.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-400">{isMr ? 'एकूण प्रश्न' : 'Total Questions'}</div>
                  <div className="text-3xl font-black text-white mt-1">१००</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-400">{isMr ? 'वेळ मर्यादा' : 'Duration'}</div>
                  <div className="text-3xl font-black text-amber-400 mt-1">६० मि.</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-400">{isMr ? 'नकारात्मक गुण' : 'Negative Rate'}</div>
                  <div className="text-3xl font-black text-rose-400 mt-1">-०.२५</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0 print:hidden">
          <div className="text-xs text-slate-400 hidden sm:block">
            {isMr
              ? 'टीप: परीक्षा सुरू केल्यानंतर डिजिटल घड्याळ व OMR पॅलेट आपोआप सक्रिय होईल.'
              : 'Timer and question palette will start immediately upon clicking launch.'}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-bold text-xs sm:text-sm border border-slate-800 transition-colors"
            >
              {isMr ? 'बंद करा' : 'Close'}
            </button>
            <button
              onClick={handleStartMarathon}
              type="button"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-md flex items-center gap-2 transition-transform transform active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{isMr ? 'मॅरेथॉन सुरू करा (१०० Qs)' : 'Launch Marathon (100 Qs)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
