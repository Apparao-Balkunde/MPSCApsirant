import React, { useState, useMemo } from 'react';
import {
  X,
  Rocket,
  Shield,
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
  Share2
} from 'lucide-react';
import { ISRO_DRDO_VIDEO_QUESTIONS, ISRO_DRDO_MISSION_FACTS } from '../data/isroDrdoVideoQuestions';
import { Question } from '../types';

interface IsroDrdoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: 'mr' | 'en';
  onStartExam?: (questions: Question[], title: string) => void;
  onAddBookmark?: (qId: string) => void;
  bookmarkedIds?: string[];
}

export const IsroDrdoVideoModal: React.FC<IsroDrdoVideoModalProps> = ({
  isOpen,
  onClose,
  language = 'mr',
  onStartExam,
  onAddBookmark,
  bookmarkedIds = []
}) => {
  const isMr = language === 'mr';
  const [activeTab, setActiveTab] = useState<'practice' | 'facts' | 'video_info'>('practice');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'isro' | 'drdo'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // MCQ interactive state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  const filteredQuestions = useMemo(() => {
    return ISRO_DRDO_VIDEO_QUESTIONS.filter((q) => {
      if (selectedCategory === 'isro' && !q.subtopic.toLowerCase().includes('चांद्रयान') && !q.subtopic.toLowerCase().includes('आदित्य') && !q.subtopic.toLowerCase().includes('गगनयान') && !q.subtopic.toLowerCase().includes('इस्रो') && !q.subtopic.toLowerCase().includes('स्थानक') && !q.subtopic.toLowerCase().includes('एक्सपोसेट') && !q.subtopic.toLowerCase().includes('निसार')) {
        return false;
      }
      if (selectedCategory === 'drdo' && !q.subtopic.toLowerCase().includes('डीआरडीओ') && !q.subtopic.toLowerCase().includes('दिव्यास्त्र') && !q.subtopic.toLowerCase().includes('igmdp') && !q.subtopic.toLowerCase().includes('प्रलय') && !q.subtopic.toLowerCase().includes('ब्रह्मोस') && !q.subtopic.toLowerCase().includes('जोरावर') && !q.subtopic.toLowerCase().includes('स्मार्ट') && !q.subtopic.toLowerCase().includes('अस्त्र') && !q.subtopic.toLowerCase().includes('आकाश')) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        q.questionMr.toLowerCase().includes(query) ||
        q.questionEn.toLowerCase().includes(query) ||
        q.subtopic.toLowerCase().includes(query) ||
        q.topic.toLowerCase().includes(query)
      );
    });
  }, [selectedCategory, searchQuery]);

  const handleSelectOption = (qId: string, optIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIndex }));
    setShowExplanations((prev) => ({ ...prev, [qId]: true }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowExplanations({});
  };

  const totalAnswered = Object.keys(selectedAnswers).length;
  const correctCount = Object.entries(selectedAnswers).reduce((acc, [qId, optIdx]) => {
    const q = ISRO_DRDO_VIDEO_QUESTIONS.find((item) => item.id === qId);
    return q && q.correctAnswerIndex === optIdx ? acc + 1 : acc;
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-hidden animate-fadeIn">
      <div className="bg-stone-900 border border-stone-700/80 rounded-2xl w-full max-w-5xl h-[92vh] max-h-[900px] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-blue-950 via-stone-900 to-indigo-950 p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg text-white shrink-0">
              <Rocket className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-black text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <Video className="w-3 h-3" />
                  <span>YouTube Special Video</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[11px] font-bold">
                  SSC CHSL / MPSC GS
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold">
                  दृष्टी IAS • नम्रता (नामू) मॅम
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5 flex items-center gap-2">
                <span>🚀 इस्रो व डीआरडीओ मोहिमा २०२६ (ISRO & DRDO Missions)</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.youtube.com/watch?v=Fyj0rT2W9Iw"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 text-xs font-bold transition-all"
              title="Watch original lecture on YouTube"
            >
              <Video className="w-3.5 h-3.5 text-red-400" />
              <span>{isMr ? 'मूळ व्हिडिओ पहा' : 'Watch Video'}</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Attribution Banner */}
        <div className="bg-stone-950 border-b border-stone-800/80 px-4 py-2.5 flex items-center justify-between text-xs flex-wrap gap-2">
          <div className="flex items-center gap-2 text-stone-300">
            <span className="text-red-400 font-bold">📹 संदर्भ:</span>
            <span className="font-semibold text-stone-200">
              "SSC CHSL 2026 Exam | GK GS | ISRO & DRDO Missions 2026 | By Namu Mam" (Drishti SSC)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.youtube.com/watch?v=Fyj0rT2W9Iw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 underline underline-offset-2"
            >
              <span>https://www.youtube.com/watch?v=Fyj0rT2W9Iw</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Navigation Tabs & Score Bar */}
        <div className="bg-stone-900 border-b border-stone-800 px-4 py-2 flex items-center justify-between gap-2 flex-wrap shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'practice'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-750'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>{isMr ? '🎯 सराव प्रश्नसंच (२० प्रश्न)' : 'Practice MCQs (20 Qs)'}</span>
            </button>

            <button
              onClick={() => setActiveTab('facts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'facts'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-750'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isMr ? '📋 जलद रिव्हिजन फॅक्टफाईल' : 'Mission Factfile'}</span>
            </button>

            <button
              onClick={() => setActiveTab('video_info')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'video_info'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-750'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>{isMr ? '🎥 व्हिडिओ तपशील व माहिती' : 'Video Info & Details'}</span>
            </button>
          </div>

          {activeTab === 'practice' && (
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-2 bg-stone-950 px-3 py-1 rounded-lg border border-stone-800">
                <span className="text-stone-400 font-medium">{isMr ? 'सोडवले:' : 'Solved:'}</span>
                <span className="text-white font-bold">{totalAnswered} / {ISRO_DRDO_VIDEO_QUESTIONS.length}</span>
                <span className="text-emerald-400 font-bold ml-1">✓ {correctCount}</span>
                <span className="text-rose-400 font-bold">✗ {totalAnswered - correctCount}</span>
              </div>

              {totalAnswered > 0 && (
                <button
                  onClick={handleResetQuiz}
                  className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                  title="Reset answers"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{isMr ? 'पुन्हा सुरू' : 'Reset'}</span>
                </button>
              )}

              {onStartExam && (
                <button
                  onClick={() => {
                    onClose();
                    onStartExam(
                      ISRO_DRDO_VIDEO_QUESTIONS,
                      isMr ? 'इस्रो व डीआरडीओ मोहिमा २०२६ (दृष्टी IAS विशेष)' : 'ISRO & DRDO Missions 2026 Test'
                    );
                  }}
                  className="px-3 py-1 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-black text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Rocket className="w-3 h-3" />
                  <span>{isMr ? '⏱️ परीक्षेप्रमाणे सोडवा' : 'Take as Timed Test'}</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Tab 1: Practice Questions */}
        {activeTab === 'practice' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Filters bar */}
            <div className="p-3 bg-stone-950/60 border-b border-stone-800/80 flex items-center justify-between gap-3 flex-wrap shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 font-bold">{isMr ? 'फिल्टर:' : 'Filter:'}</span>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {isMr ? 'सर्व (२०)' : 'All (20)'}
                </button>
                <button
                  onClick={() => setSelectedCategory('isro')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    selectedCategory === 'isro'
                      ? 'bg-blue-600 text-white'
                      : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Rocket className="w-3 h-3" />
                  <span>{isMr ? 'इस्रो मोहिमा' : 'ISRO'}</span>
                </button>
                <button
                  onClick={() => setSelectedCategory('drdo')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    selectedCategory === 'drdo'
                      ? 'bg-blue-600 text-white'
                      : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Shield className="w-3 h-3" />
                  <span>{isMr ? 'डीआरडीओ संरक्षण' : 'DRDO'}</span>
                </button>
              </div>

              <div className="relative min-w-[200px] sm:min-w-[280px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isMr ? "शोध: चांद्रयान, अग्नी-५, गगनयान, जोरावर..." : "Search mission name, question..."}
                  className="w-full pl-8 pr-3 py-1.5 bg-stone-900 border border-stone-700/80 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            {/* Questions list */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-12 text-stone-400">
                  <HelpCircle className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p>{isMr ? 'शोध परिणामांशी जुळणारे प्रश्न आढळले नाहीत.' : 'No matching questions found.'}</p>
                </div>
              ) : (
                filteredQuestions.map((q, idx) => {
                  const hasAnswered = selectedAnswers[q.id] !== undefined;
                  const selectedIdx = selectedAnswers[q.id];
                  const isCorrect = hasAnswered && selectedIdx === q.correctAnswerIndex;
                  const isBookmarked = bookmarkedIds.includes(q.id);

                  return (
                    <div
                      key={q.id}
                      className={`rounded-2xl border transition-all p-4 sm:p-5 ${
                        hasAnswered
                          ? isCorrect
                            ? 'bg-emerald-950/20 border-emerald-500/50'
                            : 'bg-rose-950/20 border-rose-500/50'
                          : 'bg-stone-900/90 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {/* Question meta badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-md bg-stone-800 text-amber-400 font-mono font-bold text-xs">
                            Q.{idx + 1}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] font-bold">
                            {q.subtopic}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            q.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-300' :
                            q.difficulty === 'Moderate' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {q.difficulty}
                          </span>
                        </div>

                        {onAddBookmark && (
                          <button
                            onClick={() => onAddBookmark(q.id)}
                            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all cursor-pointer ${
                              isBookmarked
                                ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                                : 'bg-stone-800 text-stone-400 border-stone-700 hover:text-white'
                            }`}
                            title="Bookmark question"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                          </button>
                        )}
                      </div>

                      {/* Question text */}
                      <div className="text-sm sm:text-base font-semibold text-stone-100 whitespace-pre-line leading-relaxed mb-4">
                        {isMr ? q.questionMr : q.questionEn}
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-1 gap-2.5 mb-3">
                        {(isMr ? q.optionsMr : q.optionsEn).map((opt, optIdx) => {
                          const isOptionSelected = selectedIdx === optIdx;
                          const isOptionCorrect = q.correctAnswerIndex === optIdx;

                          let btnStyle = 'bg-stone-950 hover:bg-stone-800/80 text-stone-300 border-stone-800';
                          if (hasAnswered) {
                            if (isOptionCorrect) {
                              btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold shadow-xs';
                            } else if (isOptionSelected) {
                              btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold shadow-xs';
                            } else {
                              btnStyle = 'bg-stone-950/50 border-stone-800/50 text-stone-500';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={hasAnswered}
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {hasAnswered && isOptionCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              )}
                              {hasAnswered && isOptionSelected && !isOptionCorrect && (
                                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation box */}
                      {hasAnswered && (
                        <div className={`mt-3 p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                          isCorrect ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/30 border-rose-500/40 text-stone-200'
                        }`}>
                          <div className="font-bold mb-1 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isMr ? 'अधिकृत विश्लेषण व संदर्भ:' : 'Official Explanation & Reference:'}</span>
                          </div>
                          <p className="whitespace-pre-line text-stone-300 text-xs sm:text-[13px]">
                            {isMr ? q.explanationMr : q.explanationEn}
                          </p>
                          <div className="mt-2 pt-2 border-t border-stone-800/80 text-[11px] text-stone-400 flex items-center justify-between">
                            <span>📹 {q.reference}</span>
                            <span className="text-amber-400 font-mono">{q.yearTag}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Mission Factfile */}
        {activeTab === 'facts' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="bg-gradient-to-r from-blue-950/60 to-indigo-950/60 rounded-xl p-4 border border-blue-500/40 text-xs text-stone-300 mb-4">
              <div className="font-bold text-blue-300 text-sm mb-1 flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                <span>{isMr ? 'इस्रो व डीआरडीओ महत्त्वाच्या मोहिमा सारांश (Quick Factfile 2026)' : 'ISRO & DRDO Mission Summary 2026'}</span>
              </div>
              <p>
                {isMr
                  ? 'दृष्टी IAS च्या व्हिडिओमध्ये चर्चिल्या गेलेल्या सर्व प्रमुख मोहिमांचे अधिकृत फॅक्ट्स, प्रक्षेपक, लँडर/रोव्हर नावे आणि परीक्षेसाठीचे महत्त्व खालील तक्त्यात दिले आहे.'
                  : 'Comprehensive factfile covering all key missions discussed in the Namu Ma\'am Drishti IAS session.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ISRO_DRDO_MISSION_FACTS.map((fact) => (
                <div
                  key={fact.id}
                  className="bg-stone-900 border border-stone-800 rounded-xl p-4 hover:border-stone-700 transition-all shadow-md"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                      fact.category === 'ISRO' ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {fact.category}
                    </span>
                    <span className="text-[11px] text-amber-400 font-bold font-mono">
                      {fact.launchOrYear}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white mb-2">
                    {isMr ? fact.nameMr : fact.nameEn}
                  </h3>

                  <p className="text-xs text-stone-300 leading-relaxed mb-3">
                    {isMr ? fact.keyFeatureMr : fact.keyFeatureEn}
                  </p>

                  <div className="p-2.5 rounded-lg bg-stone-950/80 border border-stone-800 text-[11px] text-amber-300/90 flex items-start gap-1.5">
                    <span className="font-bold shrink-0">🎯 MPSC टीप:</span>
                    <span>{fact.mpscRelevanceMr}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Video Info */}
        {activeTab === 'video_info' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="max-w-2xl mx-auto bg-stone-950 border border-stone-800 rounded-2xl p-6 text-center space-y-4 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center mx-auto text-red-400">
                <Video className="w-8 h-8" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-red-600 text-white font-black text-xs uppercase tracking-wider">
                  Official YouTube Video
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white mt-2">
                  SSC CHSL 2026 Exam | GK GS | ISRO & DRDO Missions 2026 | SSC CHSL GK Preparation | GK GS BY NAMU MAM
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  चॅनेल: <span className="text-stone-200 font-bold">SSC Exams by Drishti IAS</span> (@drishti_ssc)
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-left text-xs text-stone-300 space-y-2">
                <div className="font-bold text-amber-300">📚 या व्हिडिओमध्ये अंतर्भूत घटक:</div>
                <ul className="list-disc list-inside space-y-1 text-stone-300">
                  <li>चांद्रयान-३ (LVM3-M4, शिव शक्ती पॉईंट, ChaSTE, ILSA, APXS, LIBS पेलोड्स)</li>
                  <li>आदित्य-L1 (PSLV-C57, L1 हॅलो कक्षा, VELC व SUIT पेलोड्स)</li>
                  <li>गगनयान मोहीम (HLVM3, व्योममित्र रोबोट, ४ भारतीय अंतराळवीर)</li>
                  <li>भारतीय अंतराळ स्थानक (BAS - २०२८ व २०३५ उद्दिष्ट)</li>
                  <li>एक्सपोसेट (XPoSat) आणि नासा-इस्रो 'निसार' (NISAR) रडार</li>
                  <li>डीआरडीओ 'मिशन दिव्यास्त्र' (Agni-5 MIRV तंत्रज्ञान चाचणी)</li>
                  <li>प्रलय, ब्रह्मोस क्रूझ, आकाश-एनजी, अस्त्र BVRAAM आणि जोरावर हलका रणगाडा</li>
                  <li>इस्रो व डीआरडीओ स्थापना, ब्रीदवाक्य, अध्यक्ष आणि प्रक्षेपके</li>
                </ul>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://www.youtube.com/watch?v=Fyj0rT2W9Iw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-black text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                >
                  <Video className="w-4 h-4" />
                  <span>{isMr ? 'थेट YouTube वर व्हिडिओ उघडा' : 'Open Video on YouTube'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setActiveTab('practice')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Trophy className="w-4 h-4" />
                  <span>{isMr ? 'प्रश्नांचा सराव सुरू करा' : 'Start Solving Questions'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-stone-950 border-t border-stone-800 p-3 sm:p-4 flex items-center justify-between text-xs text-stone-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>{isMr ? '२० सराव प्रश्न उपलब्ध • मराठी व इंग्रजी' : '20 Practice Questions • Marathi & English'}</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs transition-all cursor-pointer"
          >
            {isMr ? 'बंद करा' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
