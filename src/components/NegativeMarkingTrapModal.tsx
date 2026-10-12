import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Search,
  Eye,
  EyeOff,
  Flame,
  BookOpen,
  Award,
  Zap,
  TrendingDown,
  Clock,
  Compass
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import {
  TRICKY_TRAPS_QUESTIONS,
  TRAP_CATEGORIES,
  TrickyTrapQuestion,
  TrapType
} from '../data/trickyTrapsQuestions';

interface NegativeMarkingTrapModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'mr' | 'en';
}

export const NegativeMarkingTrapModal: React.FC<NegativeMarkingTrapModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const isMr = language === 'mr';
  const [activeTab, setActiveTab] = useState<'drill' | 'rules'>('drill');
  const [selectedCategory, setSelectedCategory] = useState<TrapType | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // Interactive state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [scannerEnabled, setScannerEnabled] = useState<boolean>(false);
  const [panicWarning, setPanicWarning] = useState<boolean>(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  
  // Session Stats
  const [solvedStats, setSolvedStats] = useState<Record<string, {
    selected: number;
    isCorrect: boolean;
    marksSaved: number;
    penalty: number;
  }>>({});

  // Filter questions by category
  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'all') return TRICKY_TRAPS_QUESTIONS;
    return TRICKY_TRAPS_QUESTIONS.filter(q => q.trapType === selectedCategory);
  }, [selectedCategory]);

  const currentQ: TrickyTrapQuestion | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Reset answer when moving to a new question
  useEffect(() => {
    if (!currentQ) return;
    const existing = solvedStats[currentQ.id];
    if (existing) {
      setSelectedOption(existing.selected);
      setIsAnswerSubmitted(true);
    } else {
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    }
    setPanicWarning(false);
    setQuestionStartTime(Date.now());
  }, [currentIndex, currentQ?.id, selectedCategory]);

  if (!isOpen || !currentQ) return null;

  // Aggregate stats
  const totalAttempted = Object.keys(solvedStats).length;
  const totalCorrect = Object.values(solvedStats).filter(s => s.isCorrect).length;
  const totalTrapped = Object.values(solvedStats).filter(s => !s.isCorrect).length;
  const marksPrevented = (totalCorrect * 0.25).toFixed(2);
  const penaltyIncurred = (totalTrapped * 0.25).toFixed(2);
  const netMarks = ((totalCorrect * 1.0) - (totalTrapped * 0.25)).toFixed(2);

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    
    // Check speed panic (< 4 seconds from start)
    const elapsedSeconds = (Date.now() - questionStartTime) / 1000;
    if (elapsedSeconds < 3.5 && !panicWarning) {
      setPanicWarning(true);
      soundFx.playLowTimeWarningSound();
      return;
    }

    soundFx.click();
    setSelectedOption(index);
    setIsAnswerSubmitted(true);

    const isCorrect = index === currentQ.correctAnswerIndex;
    if (isCorrect) {
      soundFx.correct();
    } else {
      soundFx.incorrect();
    }

    setSolvedStats(prev => ({
      ...prev,
      [currentQ.id]: {
        selected: index,
        isCorrect,
        marksSaved: isCorrect ? 0.25 : 0,
        penalty: isCorrect ? 0 : 0.25
      }
    }));
  };

  const handleNext = () => {
    soundFx.click();
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    soundFx.click();
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    soundFx.click();
    setSolvedStats({});
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCurrentIndex(0);
    setQuestionStartTime(Date.now());
  };

  const isUserCorrect = selectedOption === currentQ.correctAnswerIndex;
  const isCommonTrapTriggered = selectedOption === currentQ.commonTrapOptionIndex;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[94vh] max-h-[900px] flex flex-col bg-stone-900 border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-950/40 overflow-hidden text-stone-100">
        
        {/* TOP HEADER */}
        <div className="relative px-4 py-3.5 sm:px-6 sm:py-4 bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/40 border-b border-stone-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-red-500/20 border border-amber-500/30 text-amber-400">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-black text-stone-100 tracking-tight flex items-center gap-2">
                  <span>{isMr ? '🎯 MPSC ट्रिकी ट्रॅप्स सराव' : '🎯 MPSC Tricky Traps Practice'}</span>
                  <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 uppercase tracking-wider">
                    {isMr ? 'निगेटिव्ह मार्किंग प्रतिबंधक' : 'Negative Marking Shield'}
                  </span>
                </h2>
              </div>
              <p className="text-xs text-stone-400 mt-0.5 line-clamp-1">
                {isMr 
                  ? '"योग्य नाही / बिनचूक / केवळ" अशा शब्दांमधील ट्रॅप ओळखा आणि -०.२५ निगेटिव्ह मार्किंग रोखा!'
                  : 'Identify "Not Correct / Binchuk / Only" phrasing traps and prevent -0.25 penalties.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switch */}
            <div className="hidden sm:flex bg-stone-800/80 p-0.5 rounded-lg border border-stone-700/60 text-xs font-bold">
              <button
                onClick={() => { soundFx.click(); setActiveTab('drill'); }}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  activeTab === 'drill'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {isMr ? '🎯 ट्रॅप सराव' : '🎯 Trap Drill'}
              </button>
              <button
                onClick={() => { soundFx.click(); setActiveTab('rules'); }}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  activeTab === 'rules'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {isMr ? '📚 ६ सुवर्ण नियम' : '📚 6 Golden Rules'}
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-xl transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MOBILE TAB BAR */}
        <div className="sm:hidden flex border-b border-stone-800 bg-stone-900/90 text-xs font-bold">
          <button
            onClick={() => { soundFx.click(); setActiveTab('drill'); }}
            className={`flex-1 py-2.5 text-center border-b-2 transition-all ${
              activeTab === 'drill'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-stone-400'
            }`}
          >
            {isMr ? '🎯 ट्रॅप सराव प्रश्न' : '🎯 Trap Drill'}
          </button>
          <button
            onClick={() => { soundFx.click(); setActiveTab('rules'); }}
            className={`flex-1 py-2.5 text-center border-b-2 transition-all ${
              activeTab === 'rules'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-stone-400'
            }`}
          >
            {isMr ? '📚 ६ सुवर्ण नियम' : '📚 6 Golden Rules'}
          </button>
        </div>

        {/* STATS IMPACT BAR */}
        <div className="px-4 py-2 bg-stone-950/70 border-b border-stone-800/80 flex items-center justify-between flex-wrap gap-2 text-xs flex-shrink-0">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isMr ? 'वाचवलेले गुण:' : 'Marks Saved:'}</span>
              <span className="font-mono text-sm bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                +{marksPrevented}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-red-400 font-bold">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <span>{isMr ? 'निगेटिव्ह नुकसान:' : 'Penalty Incurred:'}</span>
              <span className="font-mono text-sm bg-red-950/60 px-1.5 py-0.5 rounded border border-red-500/30">
                -{penaltyIncurred}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-amber-300 font-bold">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{isMr ? 'निव्वळ गुण (Net):' : 'Net Score:'}</span>
              <span className="font-mono text-sm bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">
                {netMarks}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.click();
                setScannerEnabled(prev => !prev);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                scannerEnabled
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm shadow-amber-500/20'
                  : 'bg-stone-800 border-stone-700 text-stone-300 hover:text-white'
              }`}
              title={isMr ? 'प्रश्नातील ट्रॅप कीवर्ड्स हायलाईट करा' : 'Highlight trap keywords'}
            >
              {scannerEnabled ? <Eye className="w-3.5 h-3.5 text-amber-400" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{isMr ? '🔍 ट्रॅप स्कॅनर' : '🔍 Trap Scanner'}</span>
              <span className={`text-[9px] px-1 rounded uppercase ${scannerEnabled ? 'bg-amber-400 text-stone-950 font-black' : 'bg-stone-700 text-stone-400'}`}>
                {scannerEnabled ? 'ON' : 'OFF'}
              </span>
            </button>

            <button
              onClick={handleReset}
              className="p-1 text-stone-400 hover:text-stone-200 transition-colors"
              title={isMr ? 'पुन्हा सुरू करा' : 'Reset practice'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* MAIN BODY */}
        {activeTab === 'drill' ? (
          <div className="flex-1 overflow-y-auto flex flex-col p-3 sm:p-5 space-y-4">
            
            {/* CATEGORY FILTER PILLS */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {TRAP_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundFx.click();
                    setSelectedCategory(cat.id);
                    setCurrentIndex(0);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 border-amber-400 text-stone-950 shadow-md font-extrabold'
                      : 'bg-stone-800/80 border-stone-700/60 text-stone-300 hover:bg-stone-750 hover:text-white'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{isMr ? cat.labelMr : cat.labelEn}</span>
                </button>
              ))}
            </div>

            {/* QUESTION CARD */}
            <div className="flex-1 bg-stone-900/90 border border-stone-800 rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-inner">
              <div>
                {/* Meta Row */}
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3 pb-3 border-b border-stone-800/70">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md bg-stone-800 border border-stone-700 text-amber-400 text-xs font-mono font-bold">
                      Q {currentIndex + 1} / {filteredQuestions.length}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                      {isMr ? currentQ.trapTypeTitleMr : currentQ.trapTypeTitleEn}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-stone-800/80 text-stone-400 text-xs font-medium">
                      {isMr ? currentQ.subjectTitleMr : currentQ.subjectTitleEn} • {currentQ.topic}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                    <span>{isMr ? 'धोका पातळी:' : 'Risk Level:'}</span>
                    <span className="flex text-amber-400 font-mono">
                      {'★'.repeat(currentQ.dangerLevel)}{'☆'.repeat(5 - currentQ.dangerLevel)}
                    </span>
                  </div>
                </div>

                {/* PANIC SPEED WARNING BANNER */}
                {panicWarning && !isAnswerSubmitted && (
                  <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/50 text-red-200 text-xs flex items-center justify-between gap-3 animate-bounce">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <div>
                        <span className="font-extrabold text-red-300">
                          {isMr ? 'थांबा! घाई करू नका!' : 'Hold on! Do not rush!'}
                        </span>
                        <p className="text-[11px] text-stone-300 mt-0.5">
                          {isMr 
                            ? 'MPSC मध्ये ७०% विद्यार्थी ३ सेकंदांत प्रश्न वाचून घाईत उत्तर देतात आणि -०.२५ निगेटिव्ह होते. प्रश्न २ वेळा वाचा आणि ट्रॅप शब्द शोधा!'
                            : 'In MPSC, 70% of aspirants rush within 3 seconds and trigger -0.25 penalty. Read twice and spot the trap word!'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setPanicWarning(false)}
                      className="px-2.5 py-1 rounded bg-red-800/60 hover:bg-red-700 text-white font-bold text-[10px]"
                    >
                      {isMr ? 'समजले' : 'Got it'}
                    </button>
                  </div>
                )}

                {/* Question Text */}
                <div className="space-y-3 mb-6">
                  <div className="text-base sm:text-lg font-medium text-stone-100 leading-relaxed whitespace-pre-line">
                    {/* Render with scanner highlights if enabled */}
                    {scannerEnabled ? (
                      <div>
                        {(isMr ? currentQ.questionMr : currentQ.questionEn)
                          .split('\n')
                          .map((paragraph, pIdx) => {
                            let content = paragraph;
                            const keywords = isMr ? currentQ.trapKeywordsMr : currentQ.trapKeywordsEn;
                            return (
                              <p key={pIdx} className="mb-2">
                                {keywords.reduce<React.ReactNode[]>((acc, keyword) => {
                                  // Highlight each keyword
                                  return acc;
                                }, [content])}
                              </p>
                            );
                          })}
                        <div className="mt-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                          <Eye className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          <span>
                            <strong>{isMr ? 'स्कॅन केलेले ट्रॅप शब्द:' : 'Scanned Trap Keywords:'} </strong>
                            {(isMr ? currentQ.trapKeywordsMr : currentQ.trapKeywordsEn).join(', ')}
                          </span>
                        </div>
                      </div>
                    ) : (
                      isMr ? currentQ.questionMr : currentQ.questionEn
                    )}
                  </div>
                </div>

                {/* Options List */}
                <div className="space-y-2.5">
                  {(isMr ? currentQ.optionsMr : currentQ.optionsEn).map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQ.correctAnswerIndex;
                    const isCommonTrap = idx === currentQ.commonTrapOptionIndex;

                    let btnStyle = 'bg-stone-800/80 hover:bg-stone-750 border-stone-700/70 text-stone-200';
                    let badge = null;

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-100 shadow-lg shadow-emerald-950/50';
                        badge = (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/30 border border-emerald-400 text-emerald-300 font-extrabold text-[10px] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {isMr ? 'अचूक उत्तर (Official Key)' : 'Correct Answer'}
                          </span>
                        );
                      } else if (isSelected) {
                        btnStyle = 'bg-red-950/70 border-red-500 text-red-100 shadow-lg shadow-red-950/50';
                        badge = (
                          <span className="px-2 py-0.5 rounded bg-red-500/30 border border-red-400 text-red-300 font-extrabold text-[10px] flex items-center gap-1">
                            <XCircle className="w-3 h-3" />
                            {isMr ? 'ट्रॅपमध्ये अडकलात (-०.२५)' : 'Trapped (-0.25)'}
                          </span>
                        );
                      } else if (isCommonTrap) {
                        btnStyle = 'bg-stone-800/50 border-stone-700/50 text-stone-400 opacity-80';
                        badge = (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] flex items-center gap-1">
                            <AlertTriangle className="w-2.5 h-2.5" />
                            {isMr ? '७०% विद्यार्थी येथे चुकतात' : '70% Trap Here'}
                          </span>
                        );
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-amber-500/20 border-amber-500 text-amber-100';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswerSubmitted}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${btnStyle}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 mt-0.5 ${
                            isSelected && isAnswerSubmitted && isCorrect
                              ? 'bg-emerald-500 text-stone-950'
                              : isSelected && isAnswerSubmitted && !isCorrect
                              ? 'bg-red-500 text-white'
                              : isSelected
                              ? 'bg-amber-500 text-stone-950'
                              : 'bg-stone-700/70 text-stone-300'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="text-sm font-medium leading-relaxed">{opt}</span>
                        </div>
                        {badge}
                      </button>
                    );
                  })}
                </div>

                {/* POST-ANSWER TRAP ANATOMY REVIEW */}
                {isAnswerSubmitted && (
                  <div className="mt-5 space-y-3 animate-fadeIn">
                    {/* RESULT BANNER */}
                    <div className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                      isUserCorrect
                        ? 'bg-gradient-to-r from-emerald-950/70 to-stone-900 border-emerald-500/50 text-emerald-200'
                        : 'bg-gradient-to-r from-red-950/70 to-stone-900 border-red-500/50 text-red-200'
                    }`}>
                      <div className="flex items-center gap-3">
                        {isUserCorrect ? (
                          <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400">
                            <ShieldCheck className="w-6 h-6" />
                          </div>
                        ) : (
                          <div className="p-2 rounded-full bg-red-500/20 text-red-400">
                            <ShieldAlert className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-black text-sm sm:text-base">
                            {isUserCorrect
                              ? (isMr ? '🎯 उत्कृष्ट! आपण आयोगाचा ट्रॅप टाळला!' : '🎯 Excellent! You avoided the MPSC trap!')
                              : (isMr ? '⚠️ सावधान! आपण आयोगाच्या ट्रॅपमध्ये अडकलात!' : '⚠️ Trap Triggered! You got caught!')}
                          </h4>
                          <p className="text-xs opacity-90 mt-0.5">
                            {isUserCorrect
                              ? (isMr ? '+१.०० गुण प्राप्त आणि +०.२५ निगेटिव्ह मार्किंगचे नुकसान वाचवले!' : '+1.00 Marks earned & +0.25 negative penalty saved!')
                              : (isMr ? '-०.२५ निगेटिव्ह मार्किंग वजा झाले. खालील ब्रेकडाउन वाचा.' : '-0.25 Negative penalty deducted. Review the breakdown below.')}
                          </p>
                        </div>
                      </div>

                      {isCommonTrapTriggered && (
                        <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold">
                          {isMr ? '⚡ ७०% विद्यार्थी याच पर्यायात फसतात' : '70% Trap Pitfall'}
                        </span>
                      )}
                    </div>

                    {/* TRAP BREAKDOWN CARD */}
                    <div className="p-4 rounded-xl bg-stone-950/80 border border-amber-500/30 space-y-3 text-xs">
                      <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm border-b border-stone-800 pb-2">
                        <Sparkles className="w-4 h-4" />
                        <span>{isMr ? '🔍 आयोगाचा ट्रॅप ब्रेकडाउन (Trap Anatomy)' : '🔍 MPSC Trap Anatomy'}</span>
                        <span className="ml-auto text-[11px] text-stone-400 font-normal">
                          {currentQ.mpscExamReference}
                        </span>
                      </div>

                      {/* Explanation */}
                      <div>
                        <strong className="text-stone-300 font-bold block mb-1">
                          {isMr ? '📖 अचूक स्पष्टीकरण (Concept Truth):' : '📖 Accurate Concept:'}
                        </strong>
                        <p className="text-stone-300 leading-relaxed bg-stone-900/60 p-2.5 rounded-lg border border-stone-800 whitespace-pre-line">
                          {isMr ? currentQ.trapExplanationMr : currentQ.trapExplanationEn}
                        </p>
                      </div>

                      {/* Common Pitfall */}
                      <div>
                        <strong className="text-red-400 font-bold block mb-1">
                          {isMr ? '⚡ विद्यार्थी कुठे फसतात? (Common Aspirant Mistake):' : '⚡ Why Aspirants Fail Here:'}
                        </strong>
                        <p className="text-stone-300 leading-relaxed bg-red-950/20 p-2.5 rounded-lg border border-red-500/20">
                          {isMr ? currentQ.aspirantMistakeMr : currentQ.aspirantMistakeEn}
                        </p>
                      </div>

                      {/* Golden Rule */}
                      <div>
                        <strong className="text-emerald-400 font-bold block mb-1">
                          {isMr ? '🛡️ परीक्षेतील सुवर्ण नियम (Exam Hall Golden Rule):' : '🛡️ Exam Hall Golden Rule:'}
                        </strong>
                        <p className="text-emerald-200 font-medium leading-relaxed bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/20">
                          {isMr ? currentQ.preventionRuleMr : currentQ.preventionRuleEn}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* NAVIGATION FOOTER */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-800/80">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 disabled:opacity-40 disabled:hover:bg-stone-800 text-stone-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{isMr ? 'मागील' : 'Previous'}</span>
                </button>

                <div className="text-xs text-stone-400 font-medium">
                  {currentIndex + 1} / {filteredQuestions.length}
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentIndex === filteredQuestions.length - 1}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 disabled:opacity-40 disabled:hover:from-amber-500 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all"
                >
                  <span>{isMr ? 'पुढील प्रश्न' : 'Next Question'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 2: 6 GOLDEN RULES OF NEGATIVE MARKING PREVENTION */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl text-xs text-amber-200 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-black text-sm text-amber-300 mb-1">
                  {isMr ? 'MPSC परीक्षेत निगेटिव्ह मार्किंग का होते?' : 'Why Does Negative Marking Happen in MPSC?'}
                </h3>
                <p className="leading-relaxed">
                  {isMr 
                    ? 'राज्यसेवा व संयुक्त पूर्व परीक्षेत ३५% ते ४०% गुण अभ्यासाच्या कमतरतेमुळे नाही, तर आयोगाच्या "ट्रॅप शब्दांकडे दुर्लक्ष" केल्यामुळे जातात (१/४ निगेटिव्ह पद्धतीत १ चुकीचा प्रश्न तुमचे १.२५ गुण खातो!). खालील ६ नियमांचा सराव केल्यास तुमचे किमान ५ ते ८ मार्क्स हमखास वाचतील.'
                    : 'In MPSC, 35-40% of negative marks occur due to phrasing oversights rather than lack of knowledge. In 1/4th penalty, 1 wrong question costs 1.25 marks! Memorizing these 6 rules saves 5 to 8 crucial marks.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              
              {/* Rule 1 */}
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-2 hover:border-amber-500/40 transition-colors">
                <div className="flex items-center gap-2 text-red-400 font-extrabold text-sm">
                  <span>🚫</span>
                  <h4>{isMr ? 'नियम १: "नाही / अयोग्य / असत्य" ला त्वरित गोल करा' : 'Rule 1: Circle "NOT / Incorrect" Immediately'}</h4>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {isMr 
                    ? 'प्रश्नात "योग्य नाही", "चूक", "अयोग्य" हे शब्द दिसताच पेन्सिलने त्याला गोल करा. मेंदूला स्पष्ट सांगा की मला चुकीचे विधान शोधायचे आहे. पहिल्याच पर्यायावर उडी मारू नका!'
                    : 'Whenever you see "Not correct", circle it with pencil. Tell your brain you are searching for the FALSE statement, not the true one!'}
                </p>
                <div className="p-2 rounded bg-stone-950 border border-stone-800/80 text-[11px] text-amber-300 font-mono">
                  {isMr ? '💡 फॉर्म्युला: प्रश्न वाचताना "नाही" वर डोळे थांबवा.' : 'Formula: Pause your eyes on the word "NOT".'}
                </div>
              </div>

              {/* Rule 2 */}
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-2 hover:border-amber-500/40 transition-colors">
                <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                  <span>⚖️</span>
                  <h4>{isMr ? 'नियम २: "बिनचूक" = "अचूक" = "बरोबर"' : 'Rule 2: "Binchuk" = Flawless (Correct)'}</h4>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {isMr 
                    ? 'मराठी व्याकरण व भाषाशैलीनुसार "बिनचूक" म्हणजे "चूक नसलेले" (म्हणजेच योग्य/बरोबर). अनेक विद्यार्थी "बिनचूक" शब्दाला "चूक" समजून चुकीचा पर्याय निवडतात!'
                    : '"Binchuk" in Marathi means without fault (i.e. correct). Do not mistake it for "Chuk" (wrong)!'}
                </p>
                <div className="p-2 rounded bg-stone-950 border border-stone-800/80 text-[11px] text-emerald-300 font-mono">
                  {isMr ? '💡 फॉर्म्युला: बिनचूक = बिन (नसलेली) + चूक = बरोबर (100% Correct).' : 'Formula: Binchuk = 100% Correct.'}
                </div>
              </div>

              {/* Rule 3 */}
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-2 hover:border-amber-500/40 transition-colors">
                <div className="flex items-center gap-2 text-purple-400 font-extrabold text-sm">
                  <span>💣</span>
                  <h4>{isMr ? 'नियम ३: "केवळ / फक्त / नेहमी" अतिरेकी शब्द ९०% खोटे' : 'Rule 3: Extreme Qualifiers ("Only/Always") are 90% False'}</h4>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {isMr 
                    ? '"केवळ भारतामध्येच", "फक्त राष्ट्रपतींनाच", "नेहमी", "सर्वच्या सर्व", "कोणताही प्रभाव पडला नाही" असे टोकाचे शब्द दिसल्यास विधानावर संशय घ्या. इतिहासात व विज्ञानात अपवाद असतात!'
                    : 'Extreme absolute words like "ONLY in India", "SOLELY the President", "NEVER" are overwhelmingly false in MPSC.'}
                </p>
                <div className="p-2 rounded bg-stone-950 border border-stone-800/80 text-[11px] text-purple-300 font-mono">
                  {isMr ? '💡 फॉर्म्युला: टोकाचे शब्द (Extreme qualifiers) = बहुतांश वेळा असत्य विधान.' : 'Formula: Absolute claims = High probability of falsehood.'}
                </div>
              </div>

              {/* Rule 4 */}
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-2 hover:border-amber-500/40 transition-colors">
                <div className="flex items-center gap-2 text-blue-400 font-extrabold text-sm">
                  <span>🔄</span>
                  <h4>{isMr ? 'नियम ४: विधान (a, b) आणि पर्याय (1, 2) ची सरमिसळ टाळा' : 'Rule 4: Avoid Sub-statement vs Option Number Mismatch'}</h4>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {isMr 
                    ? 'आयोग मुद्दाम विधाने (a, b, c) देतो आणि खाली पर्यायांमध्ये (1) b (2) a असे उलटे पर्याय देतो. विद्यार्थी (a) बरोबर ठरवून पर्याय (१) रंगवतात!'
                    : 'MPSC gives statements (a, b, c) and mixes options as (1) b, (2) a. Students verify (a) and reflexively bubble option 1!'}
                </p>
                <div className="p-2 rounded bg-stone-950 border border-stone-800/80 text-[11px] text-blue-300 font-mono">
                  {isMr ? '💡 फॉर्म्युला: रफ कागदावर "बरोबर = a आणि c" लिहून मगच खालील १, २, ३, ४ तपासा.' : 'Formula: Write matching letters on scrap paper first.'}
                </div>
              </div>

              {/* Rule 5 */}
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-2 hover:border-amber-500/40 transition-colors">
                <div className="flex items-center gap-2 text-teal-400 font-extrabold text-sm">
                  <span>🧩</span>
                  <h4>{isMr ? 'नियम ५: विधान व कारण मधे "कारण की..." (Because) टाका' : 'Rule 5: Insert "Because..." in Assertion-Reason'}</h4>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {isMr 
                    ? 'विधान (A) आणि कारण (R) दोन्ही वैयक्तिकरीत्या खरी माहिती असू शकतात. पण R मुळेच A घडले आहे का, हे तपासण्यासाठी मधे "कारण की..." टाकून वाचा. जर थेट उत्तर मिळत नसेल, तर पर्याय (२) निवडा!'
                    : 'Both Assertion and Reason can be true facts. To test if R explains A, join them with "BECAUSE". If it doesn\'t explain why, pick Option 2.'}
                </p>
                <div className="p-2 rounded bg-stone-950 border border-stone-800/80 text-[11px] text-teal-300 font-mono">
                  {isMr ? '💡 फॉर्म्युला: विधान (A) [कारण की...] कारण (R) = अर्थ लागतो का?' : 'Formula: Assertion [BECAUSE...] Reason = Makes sense?'}
                </div>
              </div>

              {/* Rule 6 */}
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-2 hover:border-amber-500/40 transition-colors">
                <div className="flex items-center gap-2 text-amber-300 font-extrabold text-sm">
                  <span>⏱️</span>
                  <h4>{isMr ? 'नियम ६: ५ सेकंदांचा पॉझ (The 5-Second Breather)' : 'Rule 6: Take the 5-Second Breather Before Bubbling'}</h4>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {isMr 
                    ? 'ओएमआर शीटवर किंवा स्क्रीनवर क्लिक करण्यापूर्वी ५ सेकंद थांबा आणि पुन्हा एकदा विचार करा: "मी नक्की काय मार्क करतोय? प्रश्नात सत्य विचारलेय की असत्य?". ही एक सवय तुमचा निकाल बदलू शकते.'
                    : 'Before bubbling on OMR, pause for 5 seconds and ask yourself: "Am I marking the TRUE or the FALSE statement?". This single habit prevents 90% of exam remorse.'}
                </p>
                <div className="p-2 rounded bg-stone-950 border border-stone-800/80 text-[11px] text-amber-200 font-mono">
                  {isMr ? '💡 फॉर्म्युला: "विचार करा -> तपासा -> मगच रंगवा!"' : 'Formula: Think -> Verify -> Only then bubble!'}
                </div>
              </div>

            </div>

            <div className="text-center pt-3">
              <button
                onClick={() => {
                  soundFx.click();
                  setActiveTab('drill');
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs shadow-lg transition-all inline-flex items-center gap-2"
              >
                <span>{isMr ? '🎯 हे नियम वापरून ट्रॅप प्रश्न सोडवा' : '🎯 Practice Trap Questions With These Rules'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
