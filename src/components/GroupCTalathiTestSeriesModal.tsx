import React, { useState, useEffect } from 'react';
import {
  X,
  Award,
  Play,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Shield,
  User,
  FileText,
  Flame,
  Zap,
  RotateCcw,
  Sparkles,
  BarChart3,
  Calendar,
  Check,
  BookOpen,
  ListFilter
} from 'lucide-react';
import { ExamPatternId, UserProgress } from '../types';
import {
  MPSC_GROUP_C_TALATHI_SETS_CATALOG,
  MPSC_GROUP_C_OFFICIAL_PRELIMS_SYLLABUS,
  GroupCTalathiSetMeta,
} from '../data/mpscGroupCTalathiSets';
import { soundFx } from '../utils/audio';

interface GroupCTalathiTestSeriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'mr' | 'en';
  onStartExam: (patternId: ExamPatternId, subjectId?: any, title?: string) => void;
  userProgress: UserProgress;
  currentUserName?: string;
  initialView?: 'sets' | 'syllabus';
}

export const GroupCTalathiTestSeriesModal: React.FC<GroupCTalathiTestSeriesModalProps> = ({
  isOpen,
  onClose,
  language,
  onStartExam,
  userProgress,
  currentUserName = 'MPSC Aspirant',
  initialView = 'sets',
}) => {
  const isMr = language === 'mr';
  const [selectedSet, setSelectedSet] = useState<GroupCTalathiSetMeta | null>(null);
  const [showHallTicketModal, setShowHallTicketModal] = useState<boolean>(false);
  const [instructionsAccepted, setInstructionsAccepted] = useState<boolean>(false);
  const [candidateDistrict, setCandidateDistrict] = useState<string>('पुणे (Pune)');
  const [showSyllabusView, setShowSyllabusView] = useState<boolean>(initialView === 'syllabus');

  // Sync initialView when modal opens
  useEffect(() => {
    if (isOpen) {
      setShowSyllabusView(initialView === 'syllabus');
    }
  }, [isOpen, initialView]);

  if (!isOpen) return null;

  // Find previous attempt history for sets
  const getSetAttemptHistory = (patternId: ExamPatternId) => {
    const attempts = (userProgress.history || []).filter((h) => h.patternId === patternId);
    if (attempts.length === 0) return null;
    const bestScore = Math.max(...attempts.map((a) => a.finalScore));
    const latestAttempt = attempts[0];
    return {
      count: attempts.length,
      bestScore,
      latestAccuracy: latestAttempt.accuracyPercentage,
      latestScore: latestAttempt.finalScore,
      maxScore: latestAttempt.maxScore,
    };
  };

  const handleOpenHallTicket = (set: GroupCTalathiSetMeta) => {
    soundFx.playClickSound();
    setSelectedSet(set);
    setInstructionsAccepted(false);
    setShowHallTicketModal(true);
  };

  const handleLaunchOfficialExam = () => {
    if (!selectedSet || !instructionsAccepted) return;
    soundFx.playCorrectSound();
    setShowHallTicketModal(false);
    onClose();
    onStartExam(
      selectedSet.patternId,
      undefined,
      selectedSet.titleMr
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-stone-950 via-amber-950 to-stone-900 text-white p-5 sm:p-6 border-b border-amber-500/30 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-0.5 rounded-full bg-amber-500 text-stone-950 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <Flame className="w-3.5 h-3.5 fill-stone-950" />
                  {isMr ? 'लक्ष्य: ३ जानेवारी २०२७' : 'Target: 3 Jan 2027'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                  {isMr ? '२० महा सराव संच • Real CBT Simulator' : '20 Full Exam Sets • Real CBT'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
                  {isMr ? '१०० प्रश्न • ६० मिनिटे • १०० गुण' : '100 Qs • 60 Mins • 100 Marks'}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>{isMr ? '🎯 MPSC गट-क व तलाठी पूर्व महा सराव टेस्ट सिरीज २०२७' : '🎯 MPSC Group C & Talathi Prelims Mega Test Series 2027'}</span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
                {isMr
                  ? '३ जानेवारी २०२७ रोजी होणाऱ्या MPSC गट-क पूर्व (लिपिक-टंकलेखक, कर सहायक, उत्पादन शुल्क) व तलाठी परीक्षेसाठी २० संपूर्ण नमुना प्रश्नपत्रिका. परीक्षा दिल्यानंतर थेट रिअल-टाइम महाराष्ट्र राज्य रँक, पर्सेन्टाईल आणि कट-ऑफ निकाल!'
                  : '20 Full-length CBT Mock Exam Sets for 3 January 2027 Group C & Talathi exams with instant real-time Maharashtra state ranking and cutoff evaluation.'}
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

          {/* Official 8-Subject Prelims Specs Bar */}
          <div className="pt-3.5 mt-3 border-t border-stone-800/80">
            <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                {isMr ? 'अधिकृत सामान्य क्षमता चाचणी (८ घटक • १०० गुण):' : 'Official General Ability Test (8 Subjects • 100 Marks):'}
              </span>
              <button
                onClick={() => setShowSyllabusView(!showSyllabusView)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  showSyllabusView
                    ? 'bg-amber-400 text-stone-950 font-black shadow-sm'
                    : 'bg-stone-800/90 text-amber-300 hover:bg-stone-700 hover:text-white border border-amber-500/40'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{showSyllabusView ? (isMr ? 'सराव संच यादीकडे जा' : 'View Exam Sets') : (isMr ? '📋 अधिकृत अभ्यासक्रम तपासा' : '📋 Official Syllabus')}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 text-xs">
              <div className="bg-stone-900/80 p-2 rounded-lg border border-amber-500/20 text-center">
                <span className="text-stone-400 block text-[10px] font-bold">१. इतिहास</span>
                <span className="font-extrabold text-amber-300 text-xs">१० प्रश्न</span>
              </div>
              <div className="bg-stone-900/80 p-2 rounded-lg border border-emerald-500/20 text-center">
                <span className="text-stone-400 block text-[10px] font-bold">२. भूगोल</span>
                <span className="font-extrabold text-emerald-300 text-xs">१५ प्रश्न</span>
              </div>
              <div className="bg-stone-900/80 p-2 rounded-lg border border-sky-500/20 text-center">
                <span className="text-stone-400 block text-[10px] font-bold">३. अर्थव्यवस्था</span>
                <span className="font-extrabold text-sky-300 text-xs">१५ प्रश्न</span>
              </div>
              <div className="bg-stone-900/80 p-2 rounded-lg border border-rose-500/20 text-center">
                <span className="text-stone-400 block text-[10px] font-bold">४. घडामोडी</span>
                <span className="font-extrabold text-rose-300 text-xs">१५ प्रश्न</span>
              </div>
              <div className="bg-stone-900/80 p-2 rounded-lg border border-purple-500/20 text-center">
                <span className="text-stone-400 block text-[10px] font-bold">५. राज्यशास्त्र</span>
                <span className="font-extrabold text-purple-300 text-xs">१५ प्रश्न</span>
              </div>
              <div className="bg-stone-900/80 p-2 rounded-lg border border-indigo-500/20 text-center">
                <span className="text-stone-400 block text-[10px] font-bold">६. विज्ञान</span>
                <span className="font-extrabold text-indigo-300 text-xs">१५ प्रश्न</span>
              </div>
              <div className="bg-stone-900/80 p-2 rounded-lg border border-orange-500/20 text-center">
                <span className="text-stone-400 block text-[10px] font-bold">७. अंकगणित</span>
                <span className="font-extrabold text-orange-300 text-xs">८ प्रश्न</span>
              </div>
              <div className="bg-stone-900/80 p-2 rounded-lg border border-teal-500/20 text-center">
                <span className="text-stone-400 block text-[10px] font-bold">८. बुद्धिमत्ता</span>
                <span className="font-extrabold text-teal-300 text-xs">७ प्रश्न</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Sets Grid OR Official Syllabus View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50 space-y-4">
          {showSyllabusView ? (
            /* ========================================================================= */
            /* OFFICIAL MPSC PRELIMS SYLLABUS TABLE (Matching user's official notification) */
            /* ========================================================================= */
            <div className="space-y-4 animate-fade-in">
              <div className="bg-white rounded-xl border-2 border-stone-300 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-4 text-center border-b border-stone-200">
                  <h3 className="text-lg font-black tracking-wide">
                    {isMr ? '-: अभ्यासक्रम : -' : '-: SYLLABUS :-'}
                  </h3>
                  <div className="text-sm font-bold text-amber-300 mt-0.5">
                    {isMr ? 'सामान्य क्षमता चाचणी (General Ability Test)' : 'General Ability Test'}
                  </div>
                  <p className="text-xs text-stone-300 mt-1">
                    {isMr
                      ? 'MPSC गट-क संयुक्त पूर्व परीक्षा • १०० प्रश्न • १०० गुण • कालावधी १ तास • नकारात्मक गुण १/४'
                      : 'MPSC Group C Combined Prelims • 100 Qs • 100 Marks • 1 Hour • 1/4th Penalty'}
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-stone-100 border-b border-stone-300 text-stone-800 font-black">
                        <th className="py-3 px-4 w-14 text-center border-r border-stone-300">{isMr ? 'अ.क्र.' : 'Sr.'}</th>
                        <th className="py-3 px-4 w-44 border-r border-stone-300">{isMr ? 'विषय' : 'Subject'}</th>
                        <th className="py-3 px-4 border-r border-stone-300">{isMr ? 'तपशीलवार अधिकृत अभ्यासक्रम' : 'Official Syllabus Details'}</th>
                        <th className="py-3 px-4 w-32 text-center border-r border-stone-300">{isMr ? 'प्रश्न भार' : 'Questions'}</th>
                        <th className="py-3 px-4 w-28 text-center">{isMr ? 'थेट सराव' : 'Practice'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 text-stone-900">
                      {MPSC_GROUP_C_OFFICIAL_PRELIMS_SYLLABUS.map((item) => (
                        <tr key={item.srNo} className="hover:bg-amber-50/50 transition-colors">
                          <td className="py-3.5 px-4 text-center font-bold font-mono text-stone-700 bg-stone-50/50 border-r border-stone-200">
                            {isMr ? item.srNoMr : item.srNo}
                          </td>
                          <td className="py-3.5 px-4 font-black border-r border-stone-200 text-stone-900 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                              <span className="text-xs sm:text-sm">{isMr ? item.titleMr : item.titleEn}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-stone-700 leading-relaxed border-r border-stone-200 whitespace-pre-line text-xs sm:text-sm">
                            {isMr ? item.detailsMr : item.detailsEn}
                          </td>
                          <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-700 bg-stone-50/30 whitespace-nowrap border-r border-stone-200">
                            <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 font-extrabold text-xs inline-block">
                              {item.expectedQuestions} प्रश्न ({item.expectedQuestions} गुण)
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <button
                              onClick={() => {
                                soundFx.playClickSound();
                                onStartExam(
                                  'custom',
                                  item.subjectId,
                                  isMr ? `${item.titleMr} (गट-क पूर्व सराव)` : `${item.titleEn} (Group C Practice)`
                                );
                              }}
                              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer shadow-xs transition-transform hover:scale-105 inline-flex items-center gap-1"
                              title={isMr ? `${item.titleMr} चे प्रश्न सोडवा` : `Practice ${item.titleEn}`}
                            >
                              <Play className="w-3 h-3 fill-white" />
                              <span>{isMr ? 'सराव करा' : 'Practice'}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-stone-900 text-white font-black text-xs sm:text-sm">
                        <td colSpan={3} className="py-3 px-4 text-right">
                          {isMr ? 'एकूण (Total): सामान्य क्षमता चाचणी १०० प्रश्न' : 'Total: General Ability Test 100 Qs'}
                        </td>
                        <td colSpan={2} className="py-3 px-4 text-center font-mono font-black text-amber-300">
                          १०० गुण (६० मि. • १/४ निगेटिव्ह)
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs sm:text-sm flex-wrap gap-2">
                <span className="font-semibold">
                  📌 {isMr ? 'टीप: खालील सर्व २० महा सराव संच या अधिकृत अभ्यासक्रमानुसारच तयार केलेले आहेत.' : 'Note: All 20 Mock Sets are strictly mapped to this official syllabus.'}
                </span>
                <button
                  onClick={() => setShowSyllabusView(false)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs cursor-pointer shadow-xs"
                >
                  {isMr ? 'सराव संच सोडवा ➜' : 'Go to Mock Sets ➜'}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-black text-stone-900">
                    {isMr ? 'सर्व २० महा सराव संच निवडा (Exam Set 1 to 20):' : 'Select Exam Set (Sets 1 to 20):'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowSyllabusView(true)}
                    className="text-xs text-amber-700 hover:text-amber-900 font-bold underline cursor-pointer flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{isMr ? 'अभ्यासक्रम तपासा' : 'Check Syllabus'}</span>
                  </button>
                  <span className="text-xs text-stone-400">•</span>
                  <span className="text-xs text-stone-500 font-medium">
                    ⚖️ {isMr ? '१/४ (०.२५) नकारात्मक गुण • Real CBT' : '1/4th (0.25) Penalty'}
                  </span>
                </div>
              </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MPSC_GROUP_C_TALATHI_SETS_CATALOG.map((set) => {
              const attempt = getSetAttemptHistory(set.patternId);
              return (
                <div
                  key={set.id}
                  className="bg-white rounded-xl border-2 border-stone-200 hover:border-amber-500/70 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-lg bg-amber-500 text-stone-950 font-black text-xs font-mono shadow-2xs">
                          {isMr ? `संच ${set.setNumber}` : `Set ${set.setNumber}`}
                        </span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          set.difficulty === 'Hard'
                            ? 'bg-red-100 text-red-800 border border-red-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}>
                          {set.difficulty === 'Hard' ? (isMr ? 'कठीण स्तर' : 'Hard Tier') : (isMr ? 'परीक्षा स्तर' : 'Standard')}
                        </span>
                        <span className="text-xs text-stone-500 font-mono flex items-center gap-1 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          ६० मि. (३६०० से.)
                        </span>
                      </div>

                      {attempt && (
                        <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200 font-mono font-bold">
                          ✓ {isMr ? 'सोडवला' : 'Attempted'}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-stone-900 group-hover:text-amber-800 transition-colors">
                        {isMr ? set.titleMr : set.titleEn}
                      </h3>
                      <p className="text-xs text-stone-500 font-medium mt-0.5">
                        {isMr ? set.subtitleMr : set.subtitleEn}
                      </p>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {isMr ? set.descriptionMr : set.descriptionEn}
                    </p>

                    {/* Focus Chips */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {(isMr ? set.focusAreasMr : set.focusAreasEn).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Previous attempt performance badge if exists */}
                    {attempt && (
                      <div className="bg-stone-50 rounded-lg p-2.5 border border-stone-200 flex items-center justify-between text-xs font-mono">
                        <span className="text-stone-600 font-sans">{isMr ? 'तुमचा सर्वोत्तम स्कोर:' : 'Your Best Score:'}</span>
                        <span className="font-extrabold text-amber-700">
                          {attempt.bestScore.toFixed(1)} / {attempt.maxScore} ({attempt.latestAccuracy}%)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                    <div className="text-[11px] text-stone-500 font-medium">
                      🎯 {isMr ? 'अपेक्षित कट-ऑफ:' : 'Target Cutoff:'} <strong className="text-stone-800 font-mono">{set.expectedCutoff.open}+</strong>
                    </div>

                    <button
                      onClick={() => handleOpenHallTicket(set)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer hover:scale-105 shrink-0"
                    >
                      <Play className="w-3.5 h-3.5 fill-stone-950" />
                      <span>{isMr ? 'परीक्षा द्या ➜' : 'Start Exam ➜'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          </>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CANDIDATE HALL TICKET & EXAM INSTRUCTIONS MODAL (Real Exam Feel) */}
      {/* ========================================================================= */}
      {showHallTicketModal && selectedSet && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 bg-stone-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border-2 border-amber-500/50 overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Top Official Banner */}
            <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 text-white p-5 border-b border-amber-500/40">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Shield className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase block">
                      महाराष्ट्र लोकसेवा आयोग • MPSC CBT SIMULATOR
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white">
                      {isMr ? 'परीक्षा प्रवेशपत्र व सूचना पत्रक (Hall Ticket)' : 'Examination Admit Card & Guidelines'}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setShowHallTicketModal(false)}
                  className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Candidate Credentials Card */}
            <div className="p-5 overflow-y-auto space-y-4 bg-stone-50/50 flex-1">
              <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="text-xs font-bold text-stone-500 uppercase">{isMr ? 'उमेदवाराचा तपशील' : 'Candidate Details'}</span>
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ● {isMr ? 'प्रवेशपत्र वैध (Verified)' : 'Admit Card Valid'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[11px]">{isMr ? 'उमेदवाराचे नाव:' : 'Candidate Name:'}</span>
                    <strong className="text-stone-900 text-sm font-black">{currentUserName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">{isMr ? 'बैठक क्रमांक (Roll Number):' : 'Roll Number:'}</span>
                    <strong className="text-amber-700 font-mono text-sm font-black">GC27-301984</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">{isMr ? 'परीक्षेची तारीख:' : 'Exam Date:'}</span>
                    <strong className="text-stone-800 font-bold">३ जानेवारी २०२७ (सकाळी ११:०० ते १२:००)</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">{isMr ? 'परीक्षा केंद्र (जिल्हा):' : 'Exam Center (District):'}</span>
                    <select
                      value={candidateDistrict}
                      onChange={(e) => setCandidateDistrict(e.target.value)}
                      className="mt-0.5 bg-stone-50 border border-stone-300 rounded-lg px-2 py-1 text-xs font-bold text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="पुणे (Pune)">पुणे (Pune)</option>
                      <option value="मुंबई उपनगर (Mumbai Sub)">मुंबई उपनगर (Mumbai)</option>
                      <option value="छत्रपती संभाजीनगर (Chh. Sambhajinagar)">छत्रपती संभाजीनगर</option>
                      <option value="नाशिक (Nashik)">नाशिक (Nashik)</option>
                      <option value="नागपूर (Nagpur)">नागपूर (Nagpur)</option>
                      <option value="कोल्हापूर (Kolhapur)">कोल्हापूर (Kolhapur)</option>
                    </select>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-lg p-2.5 border border-amber-200/80 text-xs text-amber-900 font-semibold flex items-center justify-between">
                  <span>{isMr ? 'निवडलेला संच:' : 'Selected Set:'} <strong>{selectedSet.titleMr}</strong></span>
                  <span className="font-mono font-black text-amber-800">१०० प्रश्न • १०० गुण</span>
                </div>
              </div>

              {/* Strict Examination Hall Instructions */}
              <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs space-y-2.5 text-xs text-stone-700">
                <h4 className="font-extrabold text-stone-900 flex items-center gap-1.5 text-sm">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>{isMr ? 'परीक्षार्थ्यांसाठी अनिवार्य सूचना (Strict Rules):' : 'Mandatory Exam Rules:'}</span>
                </h4>

                <ul className="space-y-2 pl-1 list-none">
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-stone-900 text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">१</span>
                    <span>{isMr ? 'या प्रश्नपत्रिकेत सामान्य क्षमता चाचणीचे एकूण १०० वस्तुनिष्ठ बहुपर्यायी (MCQ) प्रश्न ८ अधिकृत विषयांनुसार विभागलेले आहेत.' : 'This question paper contains 100 MCQs strictly categorized into 8 official syllabus subjects of the General Ability Test.'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-stone-900 text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">२</span>
                    <span>{isMr ? 'प्रत्येक बरोबर उत्तरासाठी १ गुण मिळेल. प्रत्येक चुकीच्या उत्तरासाठी १/४ (०.२५) गुण वजा केले जातील.' : 'Each correct answer carries 1 mark. 0.25 marks will be deducted for each incorrect answer.'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-stone-900 text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">३</span>
                    <span>{isMr ? 'परीक्षेसाठी ६० मिनिटे (३६०० सेकंद) वेळ निश्चित आहे. वेळ संपताच चाचणी आपोआप सबमिट होईल.' : 'Total duration is 60 minutes. The test will auto-submit when the countdown hits zero.'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-stone-900 text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">४</span>
                    <span>{isMr ? 'चाचणी सबमिट केल्यानंतर लगेचच तुमचा **Real-Time State Rank, Percentile, अचूकता आणि कट-ऑफ स्थिती** स्क्रीनवर दिसेल.' : 'Upon submission, your Real-Time State Rank, Percentile, Accuracy, and Cut-off evaluation will be calculated instantly.'}</span>
                  </li>
                </ul>

                {/* Consent Checkbox */}
                <div className="pt-2 border-t border-stone-100">
                  <label className="flex items-center gap-2.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 cursor-pointer hover:bg-amber-500/15 transition-all">
                    <input
                      type="checkbox"
                      checked={instructionsAccepted}
                      onChange={(e) => setInstructionsAccepted(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded border-stone-300 focus:ring-amber-500 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-stone-900 select-none">
                      {isMr
                        ? 'मी वरील सर्व नियम व सूचना काळजीपूर्वक वाचल्या आहेत आणि मी चाचणी सुरू करण्यास तयार आहे.'
                        : 'I have read all instructions and I agree to proceed to the examination.'}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Launch Footer */}
            <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowHallTicketModal(false)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 font-bold text-xs text-stone-700 cursor-pointer transition-colors"
              >
                {isMr ? 'मागे जा' : 'Cancel'}
              </button>

              <button
                type="button"
                onClick={handleLaunchOfficialExam}
                disabled={!instructionsAccepted}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-stone-950 font-black text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102"
              >
                <Zap className="w-4 h-4 fill-stone-950" />
                <span>{isMr ? 'परीक्षा कक्ष प्रवेश करा (Enter Exam) ➜' : 'Enter Exam Hall ➜'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
