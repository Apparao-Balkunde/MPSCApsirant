import React, { useState, useMemo } from 'react';
import {
  X,
  FlaskConical,
  Atom,
  Video,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  Award,
  Search,
  Bookmark,
  Share2,
  Play,
  Lightbulb,
  Check,
  Zap,
  Info
} from 'lucide-react';
import { 
  SCIENCE_MCQ_SERIES_QUESTIONS, 
  SCIENCE_MCQ_SERIES_METADATA 
} from '../data/scienceMcqSeriesQuestions';
import { Question } from '../types';

interface ScienceMcqVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: 'mr' | 'en';
  onStartExam?: (questions: Question[], title: string) => void;
  onAddBookmark?: (qId: string) => void;
  bookmarkedIds?: string[];
}

export const ScienceMcqVideoModal: React.FC<ScienceMcqVideoModalProps> = ({
  isOpen,
  onClose,
  language = 'mr',
  onStartExam,
  onAddBookmark,
  bookmarkedIds = []
}) => {
  const isMr = language === 'mr';
  const [activeTab, setActiveTab] = useState<'practice' | 'video' | 'notes'>('practice');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  
  // MCQ interactive state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredQuestions = useMemo(() => {
    return SCIENCE_MCQ_SERIES_QUESTIONS.filter((q) => {
      if (selectedSubtopic !== 'all') {
        if (!q.topic.toLowerCase().includes(selectedSubtopic.toLowerCase()) && 
            !q.subtopic.toLowerCase().includes(selectedSubtopic.toLowerCase())) {
          return false;
        }
      }
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        q.questionMr.toLowerCase().includes(query) ||
        q.questionEn.toLowerCase().includes(query) ||
        q.subtopic.toLowerCase().includes(query) ||
        q.topic.toLowerCase().includes(query) ||
        q.explanationMr.toLowerCase().includes(query)
      );
    });
  }, [selectedSubtopic, searchQuery]);

  const activeQuestion = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];

  const handleSelectOption = (qId: string, optIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIndex }));
    setShowExplanations((prev) => ({ ...prev, [qId]: true }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowExplanations({});
  };

  const handleCopyQuestion = (q: Question) => {
    const text = `${q.questionMr}\n\n1. ${q.optionsMr[0]}\n2. ${q.optionsMr[1]}\n3. ${q.optionsMr[2]}\n4. ${q.optionsMr[3]}\n\nउत्तर: पर्याय ${q.correctAnswerIndex + 1}\n\nसविस्तर स्पष्टीकरण (150+ शब्द):\n${q.explanationMr}\n\n- ज्ञानदीप अकॅडमी (डॉ. वैभव शिंदे सर सायन्स सिरीज)`;
    navigator.clipboard.writeText(text);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalAnswered = Object.keys(selectedAnswers).length;
  const correctCount = Object.entries(selectedAnswers).reduce((acc, [qId, optIdx]) => {
    const q = SCIENCE_MCQ_SERIES_QUESTIONS.find((item) => item.id === qId);
    return q && q.correctAnswerIndex === optIdx ? acc + 1 : acc;
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden animate-fadeIn">
      <div className="bg-stone-900 border border-stone-700/80 rounded-2xl w-full max-w-5xl h-[94vh] max-h-[920px] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-teal-950 p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg text-white shrink-0">
              <FlaskConical className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-black text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <Video className="w-3 h-3" />
                  <span>YouTube Live Lecture Series</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs">
                  EP-14 • {SCIENCE_MCQ_SERIES_QUESTIONS.length} Questions
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-mono">
                  १५०+ शब्द सविस्तर स्पष्टीकरण
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
                {isMr ? SCIENCE_MCQ_SERIES_METADATA.title : SCIENCE_MCQ_SERIES_METADATA.titleEn}
              </h2>
              <p className="text-xs text-stone-300 flex items-center gap-2 flex-wrap">
                <span className="text-emerald-300 font-semibold">{SCIENCE_MCQ_SERIES_METADATA.teacher}</span>
                <span>•</span>
                <span className="text-stone-400">{SCIENCE_MCQ_SERIES_METADATA.academy}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={SCIENCE_MCQ_SERIES_METADATA.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 text-xs font-bold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{isMr ? 'मूळ व्हिडिओ पहा' : 'Watch on YouTube'}</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title={isMr ? 'बंद करा' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs & Score Bar */}
        <div className="bg-stone-950/90 px-4 py-2.5 border-b border-stone-800 flex items-center justify-between gap-3 shrink-0 flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'practice'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>{isMr ? 'MCQs सराव व स्पष्टीकरण (१५०+ शब्द)' : 'MCQs Practice & Solutions'}</span>
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'video'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                  : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isMr ? 'व्हिडिओ प्लेअर' : 'Video Player'}</span>
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'notes'
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-stone-950 shadow-md'
                  : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{isMr ? 'महत्त्वाचे सायन्स फॅक्ट्स व फॉर्म्युले' : 'Science Formulas & Mnemonics'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {totalAnswered > 0 && (
              <div className="flex items-center gap-2 text-xs font-mono bg-stone-900 border border-stone-800 px-3 py-1 rounded-xl">
                <span className="text-emerald-400 font-bold">✓ {correctCount} अचूक</span>
                <span className="text-stone-500">|</span>
                <span className="text-rose-400 font-bold">✗ {totalAnswered - correctCount} चूक</span>
                <span className="text-stone-500">|</span>
                <span className="text-amber-300">{Math.round((correctCount / totalAnswered) * 100)}%</span>
              </div>
            )}
            {onStartExam && (
              <button
                onClick={() => onStartExam(SCIENCE_MCQ_SERIES_QUESTIONS, isMr ? 'सायन्स MCQ सिरीज EP-14 (डॉ. वैभव शिंदे)' : 'Science MCQ Series EP-14 (Dr. Vaibhav Shinde)')}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-105"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>{isMr ? 'परीक्षेप्रमाणे सोडवा' : 'Exam Simulation'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: MCQs Practice with 150+ words explanations */}
        {activeTab === 'practice' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {/* Filter and Stepper Strip */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-stone-950/60 p-3 rounded-xl border border-stone-800">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-stone-400 font-medium mr-1">{isMr ? 'विषय शाखा:' : 'Branch:'}</span>
                {[
                  { id: 'all', label: isMr ? 'सर्व (१२)' : 'All (12)' },
                  { id: 'रसायनशास्त्र', label: isMr ? 'रसायनशास्त्र' : 'Chemistry' },
                  { id: 'भौतिकशास्त्र', label: isMr ? 'भौतिकशास्त्र' : 'Physics' },
                  { id: 'जीवशास्त्र', label: isMr ? 'जीवशास्त्र' : 'Biology' },
                  { id: 'आरोग्यशास्त्र', label: isMr ? 'आरोग्यशास्त्र' : 'Health' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedSubtopic(cat.id);
                      setCurrentQuestionIndex(0);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedSubtopic === cat.id
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentQuestionIndex(0);
                    }}
                    placeholder={isMr ? 'कीवर्ड शोधा (उदा. लेन्स, संप्रेरक)...' : 'Search keyword...'}
                    className="pl-8 pr-3 py-1 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-emerald-500 w-44 sm:w-56"
                  />
                </div>
                {totalAnswered > 0 && (
                  <button
                    onClick={handleResetQuiz}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer"
                    title={isMr ? 'क्विझ रीसेट करा' : 'Reset Quiz'}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Question Quick Number Navigator */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              <span className="text-xs text-stone-400 font-bold whitespace-nowrap mr-1">
                {isMr ? 'प्रश्न निवडा:' : 'Select Q:'}
              </span>
              {filteredQuestions.map((q, idx) => {
                const isSelected = idx === currentQuestionIndex;
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isCorrect = isAnswered && selectedAnswers[q.id] === q.correctAnswerIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-8 h-8 rounded-lg text-xs font-black transition-all shrink-0 cursor-pointer flex items-center justify-center border ${
                      isSelected
                        ? 'ring-2 ring-emerald-400 bg-emerald-600 text-white border-emerald-400'
                        : isAnswered
                        ? isCorrect
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                          : 'bg-rose-950 text-rose-300 border-rose-600'
                        : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Active Question Display Card */}
            {activeQuestion ? (
              <div className="bg-stone-950/80 border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-lg">
                <div className="flex items-center justify-between gap-3 border-b border-stone-800/80 pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-black">
                      प्रश्न क्रमांक {currentQuestionIndex + 1} / {filteredQuestions.length}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-stone-800 text-stone-300 text-xs font-medium">
                      {activeQuestion.topic}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-teal-950/60 text-teal-300 text-xs font-medium border border-teal-800/40">
                      {activeQuestion.subtopic}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {onAddBookmark && (
                      <button
                        onClick={() => onAddBookmark(activeQuestion.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          bookmarkedIds.includes(activeQuestion.id)
                            ? 'bg-amber-500 text-stone-950'
                            : 'bg-stone-800 text-stone-400 hover:text-white'
                        }`}
                        title={isMr ? 'बुकमार्क करा' : 'Bookmark Question'}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    )}
                    <button
                      onClick={() => handleCopyQuestion(activeQuestion)}
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer"
                      title={isMr ? 'प्रश्न व स्पष्टीकरण कॉपी करा' : 'Copy Question & 150-Word Solution'}
                    >
                      {copiedId === activeQuestion.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <div className="space-y-3">
                  <div className="text-stone-100 font-medium text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {activeQuestion.questionMr}
                  </div>
                  {activeQuestion.questionEn && (
                    <div className="text-stone-400 text-xs sm:text-sm font-sans italic border-l-2 border-emerald-500/40 pl-3 py-1 whitespace-pre-line">
                      {activeQuestion.questionEn}
                    </div>
                  )}
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {activeQuestion.optionsMr.map((opt, optIdx) => {
                    const isAnswered = selectedAnswers[activeQuestion.id] !== undefined;
                    const isSelected = selectedAnswers[activeQuestion.id] === optIdx;
                    const isCorrect = activeQuestion.correctAnswerIndex === optIdx;

                    let btnClass = 'bg-stone-900 border-stone-800 text-stone-200 hover:bg-stone-850 hover:border-stone-700';
                    if (isAnswered) {
                      if (isCorrect) {
                        btnClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)] font-bold';
                      } else if (isSelected) {
                        btnClass = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
                      } else {
                        btnClass = 'bg-stone-900/50 border-stone-800/60 text-stone-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(activeQuestion.id, optIdx)}
                        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 group ${btnClass}`}
                      >
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isAnswered && isCorrect
                            ? 'bg-emerald-500 text-white'
                            : isAnswered && isSelected
                            ? 'bg-rose-500 text-white'
                            : 'bg-stone-800 text-stone-400 group-hover:bg-stone-700'
                        }`}>
                          {optIdx + 1}
                        </span>
                        <div className="flex-1">
                          <div className="text-xs sm:text-sm leading-snug">{opt}</div>
                          {activeQuestion.optionsEn && activeQuestion.optionsEn[optIdx] && (
                            <div className="text-[11px] text-stone-400 italic mt-0.5 font-sans">
                              {activeQuestion.optionsEn[optIdx]}
                            </div>
                          )}
                        </div>
                        {isAnswered && (
                          <div className="shrink-0 mt-0.5">
                            {isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-bounce" />
                            ) : isSelected ? (
                              <XCircle className="w-5 h-5 text-rose-400" />
                            ) : null}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* 150+ Words Detailed Explanation Section */}
                {showExplanations[activeQuestion.id] && (
                  <div className="mt-5 p-5 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-900 to-emerald-950/40 border-2 border-emerald-500/50 space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-emerald-400" />
                        <h4 className="text-sm font-black text-emerald-300">
                          {isMr ? 'डॉ. वैभव शिंदे सर यांचे सविस्तर विश्लेषण (१५०+ शब्द स्पष्टीकरण)' : 'Detailed 150-Word Analytical Solution'}
                        </h4>
                      </div>
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                        अचूक उत्तर: पर्याय {activeQuestion.correctAnswerIndex + 1}
                      </span>
                    </div>

                    {/* Marathi Explanation */}
                    <div className="text-stone-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-2 bg-stone-950/60 p-4 rounded-xl border border-stone-800/80">
                      {activeQuestion.explanationMr}
                    </div>

                    {/* English Explanation */}
                    {activeQuestion.explanationEn && (
                      <div className="text-stone-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-2 bg-stone-950/40 p-4 rounded-xl border border-stone-800/60 font-sans italic">
                        <div className="text-emerald-400 font-bold text-xs not-italic mb-1">
                          English In-Depth Explanation (150+ Words):
                        </div>
                        {activeQuestion.explanationEn}
                      </div>
                    )}

                    {/* Reference and Attribution Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-800/80 text-xs text-stone-400 flex-wrap gap-2">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                        <span>संदर्भ: {activeQuestion.reference}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-[11px] font-mono">
                          {activeQuestion.yearTag}
                        </span>
                        <a
                          href={SCIENCE_MCQ_SERIES_METADATA.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                        >
                          <span>व्हिडिओ पहा ➜</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Question Stepper Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-800">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      currentQuestionIndex === 0
                        ? 'opacity-40 cursor-not-allowed bg-stone-800 text-stone-500'
                        : 'bg-stone-800 hover:bg-stone-700 text-white'
                    }`}
                  >
                    ← मागील प्रश्न
                  </button>

                  <button
                    onClick={() => {
                      if (!showExplanations[activeQuestion.id]) {
                        setShowExplanations((prev) => ({ ...prev, [activeQuestion.id]: true }));
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>स्पष्टीकरण उघडा</span>
                  </button>

                  <button
                    disabled={currentQuestionIndex === filteredQuestions.length - 1}
                    onClick={() => setCurrentQuestionIndex((prev) => Math.min(filteredQuestions.length - 1, prev + 1))}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      currentQuestionIndex === filteredQuestions.length - 1
                        ? 'opacity-40 cursor-not-allowed bg-stone-800 text-stone-500'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    पुढील प्रश्न →
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-stone-400">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>या फिल्टर अंतर्गत कोणताही प्रश्न सापडला नाही.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Embedded YouTube Video Player */}
        {activeTab === 'video' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video w-full bg-black relative">
                <iframe
                  src={SCIENCE_MCQ_SERIES_METADATA.youtubeEmbedUrl}
                  title="YouTube video player"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="p-4 sm:p-5 bg-gradient-to-r from-stone-900 to-stone-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-black text-white">
                    {SCIENCE_MCQ_SERIES_METADATA.title}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    मार्गदर्शक: <span className="text-emerald-400 font-bold">{SCIENCE_MCQ_SERIES_METADATA.teacher}</span> | संस्था: {SCIENCE_MCQ_SERIES_METADATA.academy}
                  </p>
                </div>
                <a
                  href={SCIENCE_MCQ_SERIES_METADATA.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>YouTube ॲपमध्ये उघडा</span>
                </a>
              </div>
            </div>

            {/* Video Tips & Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-stone-950/80 border border-stone-800 p-4 rounded-xl">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Atom className="w-3.5 h-3.5" />
                  <span>संकल्पनात्मक भर (Conceptual Clarity)</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  केवळ पाठांतर न करता विज्ञानातील मूलभूत नियम, भौतिक राशींची एकके आणि रासायनिक समीकरणांची तर्कशुद्ध मांडणी.
                </p>
              </div>

              <div className="bg-stone-950/80 border border-stone-800 p-4 rounded-xl">
                <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>आयोगाचा पॅटर्न व ट्रॅप्स</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  MPSC संयुक्त पूर्व परीक्षा व राज्यसेवेत विचारल्या जाणाऱ्या बहुविधानात्मक व दिशाभूल करणाऱ्या पर्यायांचा सखोल समाचार.
                </p>
              </div>

              <div className="bg-stone-950/80 border border-stone-800 p-4 rounded-xl">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>स्टेट बोर्ड व NCERT संदर्भ</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  इयत्ता ८ वी ते १२ वी स्टेट बोर्ड आणि NCERT विज्ञानातील मूळ प्रकरणांशी थेट जोडलेले स्पष्टीकरण.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Key Science Formulas & Mnemonics */}
        {activeTab === 'notes' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Card 1: Isotones & Isobars */}
              <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4.5 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-sm">
                  <Atom className="w-4 h-4" />
                  <span>अणू संरचना: समस्थानिके, समभार व समन्यूट्रॉनिक</span>
                </div>
                <div className="text-xs text-stone-300 space-y-1.5 leading-relaxed">
                  <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="font-bold text-amber-300">• IsotoPes (समस्थानिके):</span> Same <strong>Protons</strong> (Z समान, A भिन्न). उदा. ¹H, ²H, ³H. रासायनिक गुणधर्म समान!
                  </div>
                  <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="font-bold text-teal-300">• IsoBars (समभार):</span> Same <strong>Mass numBer</strong> (A समान, Z भिन्न). उदा. ⁴⁰Ar, ⁴⁰K, ⁴⁰Ca. रासायनिक गुणधर्म भिन्न!
                  </div>
                  <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="font-bold text-cyan-300">• IsotoNes (समन्यूट्रॉनिक):</span> Same <strong>Neutrons</strong> (N = A - Z समान). उदा. ¹⁴Si³⁰, ¹⁵P³¹, ¹⁶S³² (प्रत्येकी १६ न्यूट्रॉन्स).
                  </div>
                </div>
              </div>

              {/* Card 2: Lenses & Eye Defects */}
              <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4.5 space-y-2.5">
                <div className="flex items-center gap-2 text-teal-400 font-black text-sm">
                  <Lightbulb className="w-4 h-4" />
                  <span>प्रकाशशास्त्र व नेत्रदोष (Optics & Defects)</span>
                </div>
                <div className="text-xs text-stone-300 space-y-1.5 leading-relaxed">
                  <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="font-bold text-rose-300">• निकटदृष्टिता (Myopia):</span> जवळचे दिसते, लांबचे अंधुक. डोळ्याचा गोल लांबट. उपाय: <strong>अंतर्गोल भिंग (Concave Lens, Negative -D)</strong>.
                  </div>
                  <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="font-bold text-indigo-300">• दूरदृष्टिता (Hypermetropia):</span> लांबचे दिसते, जवळचे नाही. डोळ्याचा गोल चपटा. उपाय: <strong>बहिर्गोल भिंग (Convex Lens, Positive +D)</strong>.
                  </div>
                  <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="font-bold text-amber-300">• भिंगाची शक्ती (Power):</span> P = 1 / f (मीटरमध्ये). एकक: डायॉप्टर (D).
                  </div>
                </div>
              </div>

              {/* Card 3: Sound Speed & Mediums */}
              <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4.5 space-y-2.5">
                <div className="flex items-center gap-2 text-cyan-400 font-black text-sm">
                  <Zap className="w-4 h-4" />
                  <span>ध्वनीचा वेग व प्रसारणाचे नियम (Acoustics)</span>
                </div>
                <div className="text-xs text-stone-300 space-y-1.5 leading-relaxed">
                  <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="font-bold text-white">• माध्यमांनुसार वेग:</span> <strong>स्थायू (Solid) &gt; द्रव (Liquid) &gt; वायू (Gas)</strong>. पोकळीत ध्वनीचा वेग = ० (माध्यमाची गरज).
                  </div>
                  <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="font-bold text-emerald-300">• ॲल्युमिनियम:</span> ~६४२० मी/से • <strong>लोखंड/स्टील:</strong> ~५९५० मी/से • <strong>पाणी (२५°C):</strong> ~१४९८ मी/से • <strong>हवा (०°C):</strong> ~३३१-३३२ मी/से.
                  </div>
                  <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="font-bold text-yellow-300">• तापमानाचा प्रभाव:</span> तापमान १°C वाढल्यास ध्वनीचा वेग ०.६१ मी/से ने वाढतो.
                  </div>
                </div>
              </div>

              {/* Card 4: Endocrine Glands & Hormones */}
              <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4.5 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
                  <FlaskConical className="w-4 h-4" />
                  <span>अंतःस्रावी ग्रंथी व संप्रेरके (Endocrine System)</span>
                </div>
                <div className="text-xs text-stone-300 space-y-1.5 leading-relaxed">
                  <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="font-bold text-emerald-300">• पियुषिका (Pituitary):</span> मुख्य ग्रंथी (Master Gland) - TSH, ACTH, GH, Prolactin, Oxytocin, ADH (Vasopressin).
                  </div>
                  <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="font-bold text-rose-300">• स्वादुपिंड (Pancreas):</span> मिश्र ग्रंथी. Beta पेशी: <strong>इन्सुलिन (रक्तातील ग्लुकोज कमी करते)</strong>; Alpha पेशी: <strong>ग्लुकागॉन (ग्लुकोज वाढवते)</strong>.
                  </div>
                  <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="font-bold text-purple-300">• अधिवृक्क (Adrenal):</span> आपत्कालीन संप्रेरक - <strong>Adrenaline (Epinephrine)</strong>: Fight or Flight संप्रेरक.
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
