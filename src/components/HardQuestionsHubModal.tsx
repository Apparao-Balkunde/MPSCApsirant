import React, { useState } from 'react';
import { 
  Flame, 
  X, 
  BookOpen, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Filter, 
  Sparkles,
  ChevronRight,
  Eye,
  EyeOff,
  Layers,
  Award,
  Search,
  Hash,
  ArrowRight,
  Compass
} from 'lucide-react';
import { SubjectId, Question } from '../types';
import { SUBJECTS } from '../data/subjects';
import { HARD_QUESTIONS_BANK } from '../data/hardQuestionsBank';
import { 
  getHardQuestionsPool, 
  TOTAL_HARD_QUESTIONS_CAPACITY,
  buildDeterministicHardQuestion
} from '../utils/hardQuestionsEngine';

interface HardQuestionsHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'mr' | 'en';
  onStartHardExam: (subjectId: SubjectId | 'all', count: number, title: string) => void;
}

export const HardQuestionsHubModal: React.FC<HardQuestionsHubModalProps> = ({
  isOpen,
  onClose,
  language,
  onStartHardExam,
}) => {
  const isMr = language === 'mr';
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [questionCount, setQuestionCount] = useState<number>(25);
  const [activeTab, setActiveTab] = useState<'start_test' | 'explore_100k' | 'browse_questions'>('start_test');
  const [expandedExplanationId, setExpandedExplanationId] = useState<string | null>(null);

  // 100k Explorer State
  const [jumpQuestionNum, setJumpQuestionNum] = useState<number>(1);
  const [explorerSubject, setExplorerSubject] = useState<SubjectId>('polity');
  const [activeExplorerQuestion, setActiveExplorerQuestion] = useState<Question>(() => 
    buildDeterministicHardQuestion('polity', 1)
  );
  const [explorerSelectedChoice, setExplorerSelectedChoice] = useState<number | null>(null);
  const [showExplorerSolution, setShowExplorerSolution] = useState<boolean>(false);

  if (!isOpen) return null;

  // Filter curated questions for the preview tab
  const previewQuestions = HARD_QUESTIONS_BANK.filter(
    (q) => selectedSubject === 'all' || q.subjectId === selectedSubject
  );

  const selectedSubjectMeta = selectedSubject !== 'all' 
    ? SUBJECTS.find((s) => s.id === selectedSubject) 
    : null;

  const handleStartExamClick = () => {
    const subTitle = selectedSubjectMeta 
      ? (isMr ? selectedSubjectMeta.nameMr : selectedSubjectMeta.nameEn)
      : (isMr ? 'सर्व विषय (All 10 Subjects Mixed)' : 'All 10 Subjects Mixed');

    const examTitle = isMr 
      ? `MPSC १,००,००० कठीण स्तर चाचणी: ${subTitle} (${questionCount} प्रश्न)`
      : `MPSC 100k Hard Level Challenge: ${subTitle} (${questionCount} Qs)`;

    onStartHardExam(selectedSubject, questionCount, examTitle);
    onClose();
  };

  const handleJumpQuestion = (qNum: number, subId?: SubjectId) => {
    const validNum = Math.max(1, Math.min(TOTAL_HARD_QUESTIONS_CAPACITY, qNum || 1));
    const targetSub = subId || explorerSubject;
    setJumpQuestionNum(validNum);
    setExplorerSubject(targetSub);
    const q = buildDeterministicHardQuestion(targetSub, validNum);
    setActiveExplorerQuestion(q);
    setExplorerSelectedChoice(null);
    setShowExplorerSolution(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/85 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-stone-900 border border-amber-500/40 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl text-stone-100 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-800 bg-gradient-to-r from-red-950/70 via-amber-950/50 to-stone-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-inner">
              <Flame className="w-6 h-6 text-amber-400 fill-amber-400/30 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {isMr ? '१,००,०००+ कठीण प्रश्न सराव केंद्र (100,000 Questions Engine)' : '100,000+ Hard Questions Engine'}
                </h2>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40">
                  {isMr ? 'काठिण्य पातळी: उच्च (Hard)' : 'Difficulty: Hard'}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {TOTAL_HARD_QUESTIONS_CAPACITY.toLocaleString()}+ {isMr ? 'प्रश्न उपलब्ध' : 'Questions Ready'}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                {isMr
                  ? 'सर्व १० विषयांसाठी राज्यसेवा व संयुक्त मुख्य परीक्षेच्या तोडीचे बहुपर्यायी, बहुविधानात्मक व एलिमिनेशन प्रश्न.'
                  : 'Multi-statement assertion-reasoning and elimination MCQs across all 10 subjects.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-800 px-4 sm:px-6 bg-stone-950/60 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('start_test')}
            className={`py-3 px-3 sm:px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'start_test'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isMr ? 'कठीण चाचणी सुरू करा' : 'Configure & Start Test'}</span>
          </button>

          <button
            onClick={() => setActiveTab('explore_100k')}
            className={`py-3 px-3 sm:px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'explore_100k'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{isMr ? '१,००,००० प्रश्न एक्सप्लोरर' : '100k Question Explorer'}</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded-full font-mono">
              #1-#100k
            </span>
          </button>

          <button
            onClick={() => setActiveTab('browse_questions')}
            className={`py-3 px-3 sm:px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'browse_questions'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{isMr ? 'क्युरेटेड प्रश्न बँक' : 'Curated Hard Bank'}</span>
            <span className="text-[10px] bg-stone-800 px-1.5 py-0.2 rounded-full text-stone-300">
              {previewQuestions.length}
            </span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          
          {/* TAB 1: Start Hard Test */}
          {activeTab === 'start_test' && (
            <div className="space-y-6">
              {/* Subject Filter Bar */}
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
                  {isMr ? 'विषय निवडा (Select Subject):' : 'Select Subject:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  <button
                    onClick={() => setSelectedSubject('all')}
                    className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                      selectedSubject === 'all'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                        : 'bg-stone-800/60 border-stone-700/60 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    <span>{isMr ? '🌟 सर्व १० विषय (Mixed Mock)' : '🌟 All 10 Subjects'}</span>
                    {selectedSubject === 'all' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                  </button>

                  {SUBJECTS.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubject(sub.id)}
                      className={`p-2.5 rounded-xl text-left border text-xs font-medium transition-all cursor-pointer flex items-center justify-between truncate ${
                        selectedSubject === sub.id
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-sm'
                          : 'bg-stone-800/60 border-stone-700/60 text-stone-300 hover:bg-stone-800'
                      }`}
                    >
                      <span className="truncate">{isMr ? sub.nameMr : sub.nameEn}</span>
                      {selectedSubject === sub.id && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Count Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
                  {isMr ? 'प्रश्नांची संख्या निवडा (Question Count):' : 'Select Question Count:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { count: 10, time: '15 Mins', labelMr: '१० प्रश्न (Rapid Sprint)', labelEn: '10 Questions' },
                    { count: 25, time: '35 Mins', labelMr: '२५ प्रश्न (Standard)', labelEn: '25 Questions' },
                    { count: 50, time: '70 Mins', labelMr: '५० प्रश्न (Major Drill)', labelEn: '50 Questions' },
                    { count: 100, time: '120 Mins', labelMr: '१०० प्रश्न (Full Mock)', labelEn: '100 Questions' },
                  ].map((item) => (
                    <button
                      key={item.count}
                      onClick={() => setQuestionCount(item.count)}
                      className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                        questionCount === item.count
                          ? 'bg-gradient-to-b from-amber-500/25 to-amber-600/10 border-amber-400 text-white shadow-sm'
                          : 'bg-stone-800/50 border-stone-700/60 text-stone-300 hover:bg-stone-800'
                      }`}
                    >
                      <span className="text-base font-black text-amber-400">
                        {item.count}
                      </span>
                      <span className="text-xs font-bold">
                        {isMr ? item.labelMr : item.labelEn}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        ⏱️ {item.time} • 1/4th Neg
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Engine Status Banner */}
              <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-2">
                      <span>{isMr ? '१,००,०००+ कठीण प्रश्न सिंथेसायझर इंजिन' : '100,000+ Hard Questions Synthesizer'}</span>
                      <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[10px] font-mono rounded">
                        ONLINE
                      </span>
                    </h4>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      {isMr
                        ? 'प्रमाणित संदर्भ: एम. लक्ष्मीकांत, रमेश सिंग, डॉ. कठारे, के. ए. खतीब, मो. रा. वाळंबे, Wren & Martin, NCERT आणि राज्य मंडळ पुस्तके.'
                        : 'Standard references: M. Laxmikanth, Ramesh Singh, Dr. Kathare, K. A. Khatib, M. R. Walambe, NCERT.'}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-mono font-bold text-amber-400">
                    {TOTAL_HARD_QUESTIONS_CAPACITY.toLocaleString()}+ {isMr ? 'प्रश्न साठा' : 'Questions Repository'}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    {isMr ? '१००% कठीण काठिण्य पातळी' : 'Pure Hard Level'}
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <button
                id="btn-launch-hard-exam"
                onClick={handleStartExamClick}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <Flame className="w-4 h-4 fill-stone-950" />
                <span>
                  {isMr
                    ? `${questionCount} प्रश्नांची कठीण स्तर चाचणी सुरू करा (Start Exam)`
                    : `Start ${questionCount} Hard Questions Exam Now`}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB 2: 100k Explorer (Direct Question Lookup & Practice by ID/Number) */}
          {activeTab === 'explore_100k' && (
            <div className="space-y-5">
              {/* Question Number Jumper & Subject Selector */}
              <div className="bg-stone-950/60 border border-stone-800 p-4 rounded-xl space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-stone-300">
                      {isMr ? 'कोणताही प्रश्न क्र. निवडा (१ ते १,००,०००):' : 'Jump to Question # (1 to 100,000):'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={explorerSubject}
                      onChange={(e) => handleJumpQuestion(jumpQuestionNum, e.target.value as SubjectId)}
                      className="bg-stone-800 border border-stone-700 text-white text-xs font-bold rounded-lg px-2.5 py-1.5"
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {isMr ? s.nameMr : s.nameEn}
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="1"
                        max="100000"
                        value={jumpQuestionNum}
                        onChange={(e) => handleJumpQuestion(parseInt(e.target.value, 10) || 1)}
                        className="w-24 bg-stone-900 border border-amber-500/50 rounded-lg px-2.5 py-1.5 text-xs text-amber-400 font-mono font-bold text-center"
                        placeholder="1 - 100000"
                      />
                      <button
                        onClick={() => handleJumpQuestion(jumpQuestionNum + 1)}
                        className="px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-bold cursor-pointer"
                        title={isMr ? "पुढील प्रश्न" : "Next Question"}
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Number Presets */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[11px] text-stone-400">
                  <span>{isMr ? 'त्वरित प्रश्न:' : 'Quick Presets:'}</span>
                  {[1, 25, 100, 500, 1000, 5000, 25000, 50000, 75000, 100000].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleJumpQuestion(num)}
                      className={`px-2 py-0.5 rounded border text-[10px] font-mono cursor-pointer transition-colors ${
                        jumpQuestionNum === num
                          ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                          : 'bg-stone-800/80 border-stone-700 text-stone-300 hover:bg-stone-700'
                      }`}
                    >
                      #{num.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Explorer Question Card */}
              {activeExplorerQuestion && (
                <div className="p-4 sm:p-5 rounded-xl border border-stone-800 bg-stone-950/40 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-extrabold border border-amber-500/30">
                        Q #{jumpQuestionNum.toLocaleString()} / {TOTAL_HARD_QUESTIONS_CAPACITY.toLocaleString()}
                      </span>
                      <span className="text-xs font-extrabold text-white">
                        {activeExplorerQuestion.topic}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-950 text-red-300 border border-red-800/40 font-bold">
                        Hard Level
                      </span>
                    </div>

                    <span className="text-[11px] text-stone-400 font-mono shrink-0">
                      ID: {activeExplorerQuestion.id}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-200 whitespace-pre-line leading-relaxed font-serif">
                    {isMr ? activeExplorerQuestion.questionMr : activeExplorerQuestion.questionEn}
                  </p>

                  {/* Options with Interactive Practice Choice */}
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {(isMr ? activeExplorerQuestion.optionsMr : activeExplorerQuestion.optionsEn).map((opt, optIdx) => {
                      const isSelected = explorerSelectedChoice === optIdx;
                      const isCorrect = optIdx === activeExplorerQuestion.correctAnswerIndex;
                      
                      let optionStyle = 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700';
                      if (showExplorerSolution) {
                        if (isCorrect) {
                          optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                        } else if (isSelected) {
                          optionStyle = 'bg-red-950/60 border-red-500 text-red-200';
                        }
                      } else if (isSelected) {
                        optionStyle = 'bg-amber-500/20 border-amber-500 text-amber-200 font-semibold';
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => setExplorerSelectedChoice(optIdx)}
                          className={`p-3 rounded-lg text-xs border transition-all cursor-pointer flex items-center gap-2.5 ${optionStyle}`}
                        >
                          <span className="font-bold text-stone-400 shrink-0">
                            ({optIdx + 1})
                          </span>
                          <span className="flex-1">{opt}</span>
                          {showExplorerSolution && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Interactive Action Strip */}
                  <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-stone-800">
                    <button
                      onClick={() => setShowExplorerSolution(!showExplorerSolution)}
                      className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {showExplorerSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showExplorerSolution ? (isMr ? 'स्पष्टीकरण लपवा' : 'Hide Solution') : (isMr ? 'उत्तर व स्पष्टीकरण तपासा' : 'Check Solution & Analysis')}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleJumpQuestion(jumpQuestionNum + 1)}
                        className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        {isMr ? 'पुढील प्रश्न →' : 'Next Question →'}
                      </button>

                      <button
                        onClick={() => {
                          const examTitle = isMr 
                            ? `MPSC कठीण स्तर मालिका (प्रश्न #${jumpQuestionNum} पासून)`
                            : `MPSC 100k Hard Series (from Q #${jumpQuestionNum})`;
                          onStartHardExam(explorerSubject, 25, examTitle);
                          onClose();
                        }}
                        className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black rounded-lg text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{isMr ? 'या भागावर चाचणी सुरू करा' : 'Start Test From Here'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Solution Box */}
                  {showExplorerSolution && (
                    <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs space-y-2 text-emerald-200 animate-fadeIn">
                      <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isMr ? 'अचूक उत्तर: पर्याय क्रमांक' : 'Correct Answer: Option'} ({activeExplorerQuestion.correctAnswerIndex + 1})</span>
                      </div>
                      <p className="leading-relaxed text-stone-300 whitespace-pre-line">
                        {isMr ? activeExplorerQuestion.explanationMr : activeExplorerQuestion.explanationEn}
                      </p>
                      <div className="text-[11px] text-amber-300/80 pt-1 border-t border-emerald-500/20">
                        📖 {activeExplorerQuestion.reference}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Browse Curated Hard Questions */}
          {activeTab === 'browse_questions' && (
            <div className="space-y-4">
              <div className="text-xs text-stone-400 flex items-center justify-between">
                <span>
                  {isMr 
                    ? `निवडलेल्या विषयातील क्युरेटेड कठीण प्रश्न (${previewQuestions.length})`
                    : `Showing Curated Hard Questions (${previewQuestions.length})`}
                </span>
                <span className="text-[11px] text-amber-400 font-mono">
                  {isMr ? 'क्लिक करून उत्तर व स्पष्टीकरण उघडा' : 'Click to toggle solution'}
                </span>
              </div>

              {previewQuestions.map((q, idx) => {
                const isExpanded = expandedExplanationId === q.id;
                return (
                  <div 
                    key={q.id}
                    className="p-4 rounded-xl border border-stone-800 bg-stone-950/40 hover:border-stone-700 transition-colors space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-stone-800 text-amber-400 text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-extrabold text-amber-300">
                          {q.topic}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-950 text-red-300 border border-red-800/40 font-bold">
                          Hard
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-400 font-mono">
                        {q.yearTag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-200 whitespace-pre-line leading-relaxed font-serif">
                      {isMr ? q.questionMr : q.questionEn}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {(isMr ? q.optionsMr : q.optionsEn).map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className={`p-2 rounded-lg text-xs border ${
                            isExpanded && optIdx === q.correctAnswerIndex
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold'
                              : 'bg-stone-900 border-stone-800 text-stone-300'
                          }`}
                        >
                          <span className="font-bold text-stone-400 mr-1.5">
                            ({optIdx + 1})
                          </span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-stone-800/60">
                      <button
                        onClick={() => setExpandedExplanationId(isExpanded ? null : q.id)}
                        className="text-xs text-amber-400 font-bold flex items-center gap-1.5 hover:text-amber-300 cursor-pointer"
                      >
                        {isExpanded ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{isExpanded ? (isMr ? 'स्पष्टीकरण लपवा' : 'Hide Solution') : (isMr ? 'अचूक उत्तर व स्पष्टीकरण पहा' : 'View Correct Answer & Explanation')}</span>
                      </button>
                      <span className="text-[11px] text-stone-400">
                        {q.reference}
                      </span>
                    </div>

                    {isExpanded && (
                      <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs space-y-1.5 text-emerald-200 animate-fadeIn">
                        <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isMr ? 'अचूक उत्तर: पर्याय क्रमांक' : 'Correct Answer: Option'} ({q.correctAnswerIndex + 1})</span>
                        </div>
                        <p className="leading-relaxed text-stone-300">
                          {isMr ? q.explanationMr : q.explanationEn}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="p-3 sm:p-4 bg-stone-950 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {isMr 
                ? 'MPSC राज्यसेवा पूर्व व मुख्य परीक्षा आणि गट-ब/क संयुक्त परीक्षांसाठी १,००,०००+ उच्चस्तरीय प्रश्न' 
                : '100,000+ High-Yield Questions for MPSC Rajyaseva Prelims/Mains and Combine Group B & C'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            {isMr ? 'बंद करा' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
