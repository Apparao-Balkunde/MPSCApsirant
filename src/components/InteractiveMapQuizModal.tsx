import React, { useState, useMemo } from 'react';
import {
  X,
  Compass,
  MapPin,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Eye,
  Award,
  Layers,
  ArrowRight,
  Flame,
  Bookmark,
  Share2
} from 'lucide-react';
import {
  MAP_QUIZ_QUESTIONS,
  MapQuizQuestion,
  MapPointer
} from '../data/interactiveMapQuestions';
import { soundFx } from '../utils/audio';

interface InteractiveMapQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: 'mr' | 'en';
  soundEnabled?: boolean;
}

export const InteractiveMapQuizModal: React.FC<InteractiveMapQuizModalProps> = ({
  isOpen,
  onClose,
  language = 'mr',
  soundEnabled = true,
}) => {
  const isMr = language === 'mr';

  // State
  const [activeTab, setActiveTab] = useState<'quiz' | 'explore'>('quiz');
  const [selectedMapFilter, setSelectedMapFilter] = useState<'all' | 'maharashtra' | 'india'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({}); // questionId -> optionId
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedExplorePointer, setSelectedExplorePointer] = useState<MapQuizQuestion | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [bookmarkedQuestionIds, setBookmarkedQuestionIds] = useState<string[]>([]);
  const [activeLayer, setActiveLayer] = useState<'all' | 'simple'>('all');

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return MAP_QUIZ_QUESTIONS.filter((q) => {
      const mapMatch = selectedMapFilter === 'all' || q.mapType === selectedMapFilter;
      const categoryMatch = selectedCategory === 'all' || q.category === selectedCategory;
      return mapMatch && categoryMatch;
    });
  }, [selectedMapFilter, selectedCategory]);

  const currentQ: MapQuizQuestion | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Reset index when filter changes
  const handleMapFilterChange = (filter: 'all' | 'maharashtra' | 'india') => {
    setSelectedMapFilter(filter);
    setCurrentIndex(0);
    setShowExplanation(false);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setShowExplanation(false);
  };

  // Sound helper
  const playFx = (type: 'correct' | 'incorrect' | 'click') => {
    if (!soundEnabled) return;
    try {
      if (type === 'correct') soundFx.correct();
      else if (type === 'incorrect') soundFx.incorrect();
      else soundFx.click();
    } catch {
      // Audio playback failsafe
    }
  };

  const handleSelectOption = (optionId: string) => {
    if (!currentQ || userAnswers[currentQ.id]) return; // Already answered

    const isCorrect = optionId === currentQ.correctOptionId;
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: optionId }));
    setShowExplanation(true);

    if (isCorrect) {
      playFx('correct');
    } else {
      playFx('incorrect');
    }

    // Check if this was the last question
    if (Object.keys(userAnswers).length + 1 >= filteredQuestions.length) {
      // Mark ready for completion
    }
  };

  const handleNext = () => {
    playFx('click');
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowExplanation(Boolean(userAnswers[filteredQuestions[currentIndex + 1]?.id]));
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    playFx('click');
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setShowExplanation(Boolean(userAnswers[filteredQuestions[currentIndex - 1]?.id]));
    }
  };

  const handleRestart = () => {
    playFx('click');
    setUserAnswers({});
    setCurrentIndex(0);
    setShowExplanation(false);
    setIsCompleted(false);
  };

  const toggleBookmark = (id: string) => {
    playFx('click');
    setBookmarkedQuestionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scoreStats = useMemo(() => {
    let correct = 0;
    let attempted = 0;
    filteredQuestions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans) {
        attempted++;
        if (ans === q.correctOptionId) {
          correct++;
        }
      }
    });
    return {
      attempted,
      correct,
      incorrect: attempted - correct,
      accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
    };
  }, [filteredQuestions, userAnswers]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-amber-500/30 w-full max-w-6xl max-h-[96vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-100">
        
        {/* HEADER BAR */}
        <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 px-4 sm:px-6 py-3 border-b border-amber-600/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black text-amber-300 truncate">
                  {isMr ? 'नकाशावर आधारित इंटरअॅक्टिव्ह प्रश्न' : 'Interactive Map Quiz'}
                </h2>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  MPSC भूगोल स्पेशल
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-400 truncate hidden sm:block">
                {isMr
                  ? 'नकाशावरील पॉईंटर/बाण पाहून घाट, नद्या, शिखरे व धरणे अचूक ओळखा'
                  : 'Identify mountain passes, rivers, peaks, and dams from map pointers'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Mode Switcher: Quiz vs Explore */}
            <div className="flex bg-stone-800/90 rounded-lg p-0.5 border border-stone-700 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  playFx('click');
                  setActiveTab('quiz');
                }}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  activeTab === 'quiz'
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                📝 {isMr ? 'सराव प्रश्न' : 'Quiz'}
              </button>
              <button
                type="button"
                onClick={() => {
                  playFx('click');
                  setActiveTab('explore');
                }}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  activeTab === 'explore'
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                🔍 {isMr ? 'एक्सप्लोर' : 'Explore'}
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition-colors cursor-pointer"
              title={isMr ? "बंद करा" : "Close"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SUBHEADER: FILTERS & STATS */}
        <div className="bg-stone-950/70 border-b border-stone-800 px-3 sm:px-6 py-2 flex items-center justify-between gap-2 flex-wrap shrink-0">
          {/* Map Region Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
            <span className="text-[11px] font-bold text-stone-400 shrink-0 hidden md:inline">
              {isMr ? 'नकाशा:' : 'Map:'}
            </span>
            <button
              type="button"
              onClick={() => handleMapFilterChange('all')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedMapFilter === 'all'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {isMr ? 'सर्व नकाशे' : 'All Maps'} ({MAP_QUIZ_QUESTIONS.length})
            </button>
            <button
              type="button"
              onClick={() => handleMapFilterChange('maharashtra')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedMapFilter === 'maharashtra'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              🚩 {isMr ? 'महाराष्ट्र' : 'Maharashtra'}
            </button>
            <button
              type="button"
              onClick={() => handleMapFilterChange('india')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedMapFilter === 'india'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              🇮🇳 {isMr ? 'भारत' : 'India'}
            </button>
          </div>

          {/* Quick Category Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              className={`px-2 py-0.5 rounded text-[11px] transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-stone-200 text-stone-900 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {isMr ? 'सर्व घटक' : 'All Topics'}
            </button>
            <button
              type="button"
              onClick={() => handleCategoryChange('ghats')}
              className={`px-2 py-0.5 rounded text-[11px] transition-all cursor-pointer ${
                selectedCategory === 'ghats'
                  ? 'bg-stone-200 text-stone-900 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              ⛰️ {isMr ? 'घाट' : 'Passes'}
            </button>
            <button
              type="button"
              onClick={() => handleCategoryChange('rivers')}
              className={`px-2 py-0.5 rounded text-[11px] transition-all cursor-pointer ${
                selectedCategory === 'rivers'
                  ? 'bg-stone-200 text-stone-900 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              🌊 {isMr ? 'नद्या' : 'Rivers'}
            </button>
            <button
              type="button"
              onClick={() => handleCategoryChange('peaks')}
              className={`px-2 py-0.5 rounded text-[11px] transition-all cursor-pointer ${
                selectedCategory === 'peaks'
                  ? 'bg-stone-200 text-stone-900 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              🏔️ {isMr ? 'शिखरे' : 'Peaks'}
            </button>
            <button
              type="button"
              onClick={() => handleCategoryChange('dams')}
              className={`px-2 py-0.5 rounded text-[11px] transition-all cursor-pointer ${
                selectedCategory === 'dams'
                  ? 'bg-stone-200 text-stone-900 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              💧 {isMr ? 'धरणे' : 'Dams'}
            </button>
          </div>

          {/* Quick Score Badge */}
          <div className="flex items-center gap-2 text-xs font-bold text-stone-300 shrink-0">
            <span className="text-emerald-400">✓ {scoreStats.correct}</span>
            <span className="text-rose-400">✗ {scoreStats.incorrect}</span>
            <span className="text-amber-300 font-mono">
              {scoreStats.accuracy}% {isMr ? 'अचूकता' : 'Acc'}
            </span>
          </div>
        </div>

        {/* MAIN BODY: 2-COLUMN LAYOUT (MAP ON LEFT/TOP, QUESTION ON RIGHT/BOTTOM) */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 flex flex-col lg:flex-row gap-4 sm:gap-6 min-h-0">
          
          {/* ================================================================= */}
          {/* LEFT COLUMN: INTERACTIVE SVG MAP DISPLAY WITH POINTERS */}
          {/* ================================================================= */}
          <div className="lg:w-7/12 flex flex-col bg-stone-950/80 rounded-2xl border border-stone-800 p-2 sm:p-3 relative overflow-hidden shadow-inner min-h-[340px] sm:min-h-[420px]">
            
            {/* Map Top Bar Controls */}
            <div className="flex items-center justify-between pb-2 mb-1 border-b border-stone-800/80 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {currentQ?.mapType === 'maharashtra'
                    ? (isMr ? '🚩 महाराष्ट्र प्राकृतिक व राजकीय नकाशा' : 'Maharashtra Physical Map')
                    : (isMr ? '🇮🇳 भारत प्राकृतिक व राजकीय नकाशा' : 'India Physical Map')}
                </span>
                <span className="text-[10px] bg-stone-800 text-stone-400 px-1.5 py-0.5 rounded">
                  {currentQ?.categoryMr}
                </span>
              </div>

              {/* Map Zoom Controls */}
              <div className="flex items-center gap-1 bg-stone-900 rounded-lg p-0.5 border border-stone-800">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(2, +(z + 0.2).toFixed(1)))}
                  className="p-1 hover:bg-stone-800 text-stone-300 hover:text-white rounded cursor-pointer"
                  title={isMr ? "झूम इन" : "Zoom In"}
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[10px] text-stone-400 px-1">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.8, +(z - 0.2).toFixed(1)))}
                  className="p-1 hover:bg-stone-800 text-stone-300 hover:text-white rounded cursor-pointer"
                  title={isMr ? "झूम आउट" : "Zoom Out"}
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setZoomLevel(1);
                    setPanOffset({ x: 0, y: 0 });
                  }}
                  className="p-1 hover:bg-stone-800 text-stone-400 hover:text-white rounded cursor-pointer"
                  title={isMr ? "मूळ आकार (Reset)" : "Reset"}
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* SVG MAP CANVAS */}
            <div className="flex-1 flex items-center justify-center overflow-hidden relative select-none bg-stone-900/60 rounded-xl border border-stone-800/60 p-1">
              
              <div
                className="w-full h-full flex items-center justify-center transition-transform duration-200"
                style={{
                  transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                  transformOrigin: 'center center',
                }}
              >
                {/* ------------------------------------------------------------- */}
                {/* MAHARASHTRA SVG MAP */}
                {/* ------------------------------------------------------------- */}
                {currentQ?.mapType === 'maharashtra' && (
                  <svg viewBox="0 0 650 480" className="w-full max-h-[380px] sm:max-h-[440px] drop-shadow-md">
                    <defs>
                      <linearGradient id="mahaBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#292524" />
                        <stop offset="100%" stopColor="#1c1917" />
                      </linearGradient>
                      <filter id="glowTarget" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Outer Map Plate */}
                    <rect x="5" y="5" width="640" height="470" rx="14" fill="url(#mahaBgGrad)" stroke="#44403c" strokeWidth="1.5" />

                    {/* Arabian Sea */}
                    <rect x="10" y="10" width="75" height="460" rx="8" fill="#0c4a6e" opacity="0.4" />
                    <text x="25" y="240" fill="#38bdf8" fontSize="11" fontWeight="bold" transform="rotate(-90 25 240)">
                      अरबी समुद्र (Arabian Sea)
                    </text>

                    {/* Maharashtra State Approximate Outline Base */}
                    <polygon
                      points="85,60 160,40 370,40 450,55 580,90 620,150 590,260 480,330 380,360 270,360 140,360 100,320 85,240 80,120"
                      fill="#78350f"
                      opacity="0.25"
                      stroke="#d97706"
                      strokeWidth="2"
                    />

                    {/* Konkan Coastline Belt */}
                    <path d="M 85 60 Q 95 180 100 320" fill="none" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
                    <text x="88" y="75" fill="#fde68a" fontSize="8" fontWeight="bold">उत्तर कोकण</text>
                    <text x="96" y="290" fill="#fde68a" fontSize="8" fontWeight="bold">दक्षिण कोकण</text>

                    {/* Sahyadri Spine (Western Ghats) */}
                    <path d="M 95 70 Q 115 190 120 330" fill="none" stroke="#059669" strokeWidth="8" strokeLinecap="round" opacity="0.75" />
                    <text x="122" y="90" fill="#6ee7b7" fontSize="9" fontWeight="bold">सह्याद्री पर्वत</text>

                    {/* Satpura Range in North */}
                    <line x1="160" y1="48" x2="380" y2="42" stroke="#b45309" strokeWidth="7" strokeLinecap="round" opacity="0.8" />
                    <text x="210" y="38" fill="#fcd34d" fontSize="9" fontWeight="bold">🏔️ सातपुडा पर्वतरांग (तोराणमाळ / अस्तंभा)</text>

                    {/* Godavari River Network */}
                    <path d="M 120 140 Q 300 160 550 250" fill="none" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
                    <text x="270" y="145" fill="#93c5fd" fontSize="10" fontWeight="bold">गोदावरी नदी खोरे</text>

                    {/* Bhima River */}
                    <path d="M 130 220 Q 300 240 450 310" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
                    <text x="250" y="225" fill="#93c5fd" fontSize="9" fontWeight="bold">भीमा नदी खोरे</text>

                    {/* Krishna River */}
                    <path d="M 130 290 Q 250 310 380 340" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                    <text x="180" y="305" fill="#7dd3fc" fontSize="9" fontWeight="bold">कृष्णा नदी खोरे</text>

                    {/* Tapi / Purna River */}
                    <path d="M 370 70 Q 250 75 90 70" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
                    <text x="210" y="65" fill="#bae6fd" fontSize="9" fontWeight="bold">तापी नदी (पश्चिम वाहिनी)</text>

                    {/* Eastern Vidarbha Wainganga River */}
                    <path d="M 530 80 Q 525 180 540 260" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
                    <text x="535" y="150" fill="#c7d2fe" fontSize="9" fontWeight="bold">वैनगंगा नदी (दक्षिण वाहिनी)</text>

                    {/* Administrative Region Zones */}
                    <rect x="150" y="90" width="85" height="35" rx="5" fill="#ca8a04" opacity="0.25" stroke="#eab308" strokeWidth="1" strokeDasharray="3,3" />
                    <text x="160" y="112" fill="#fef08a" fontSize="9" fontWeight="bold">नाशिक विभाग</text>

                    <rect x="150" y="160" width="85" height="40" rx="5" fill="#ea580c" opacity="0.25" stroke="#f97316" strokeWidth="1" strokeDasharray="3,3" />
                    <text x="165" y="185" fill="#fed7aa" fontSize="9" fontWeight="bold">पुणे विभाग</text>

                    <rect x="260" y="150" width="105" height="45" rx="5" fill="#db2777" opacity="0.25" stroke="#ec4899" strokeWidth="1" strokeDasharray="3,3" />
                    <text x="270" y="177" fill="#fbcfe8" fontSize="9" fontWeight="bold">छ. संभाजीनगर (मराठवाडा)</text>

                    <rect x="360" y="60" width="90" height="45" rx="5" fill="#16a34a" opacity="0.25" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,3" />
                    <text x="370" y="88" fill="#bbf7d0" fontSize="9" fontWeight="bold">अमरावती विभाग</text>

                    <rect x="470" y="90" width="120" height="65" rx="5" fill="#7c3aed" opacity="0.25" stroke="#a855f7" strokeWidth="1" strokeDasharray="3,3" />
                    <text x="490" y="125" fill="#e9d5ff" fontSize="10" fontWeight="bold">नागपूर विभाग (विदर्भ)</text>

                    {/* EXPLORE MODE ALL POINTERS OR QUIZ TARGET POINTER */}
                    {activeTab === 'explore' ? (
                      MAP_QUIZ_QUESTIONS.filter((q) => q.mapType === 'maharashtra').map((q) => {
                        const isSelected = selectedExplorePointer?.id === q.id;
                        return (
                          <g
                            key={q.id}
                            className="cursor-pointer group"
                            onClick={() => setSelectedExplorePointer(q)}
                          >
                            <circle
                              cx={q.targetPointer.x}
                              cy={q.targetPointer.y}
                              r={isSelected ? 10 : 7}
                              fill={isSelected ? '#f59e0b' : (q.targetPointer.color || '#3b82f6')}
                              stroke="#ffffff"
                              strokeWidth="2"
                              className="transition-all hover:scale-125"
                            />
                            <text
                              x={q.targetPointer.x + 10}
                              y={q.targetPointer.y + 4}
                              fill="#ffffff"
                              fontSize="8"
                              fontWeight="bold"
                              className="pointer-events-none drop-shadow-md"
                            >
                              {q.targetPointer.titleMr}
                            </text>
                          </g>
                        );
                      })
                    ) : (
                      <>
                        {/* Context Reference Pointers (if any) */}
                        {currentQ.contextPointers?.map((pt, i) => (
                          <g key={i} opacity="0.75">
                            <circle cx={pt.x} cy={pt.y} r="5" fill="#64748b" stroke="#ffffff" strokeWidth="1.5" />
                            <text x={pt.x + 7} y={pt.y + 3} fill="#cbd5e1" fontSize="8" fontWeight="bold">
                              {pt.label || pt.titleMr}
                            </text>
                          </g>
                        ))}

                        {/* ACTIVE TARGET POINTER WITH GLOW AND RADAR PULSE */}
                        <g filter="url(#glowTarget)">
                          {/* Pulsing ring */}
                          <circle
                            cx={currentQ.targetPointer.x}
                            cy={currentQ.targetPointer.y}
                            r="18"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="2"
                            className="animate-ping"
                            opacity="0.8"
                          />
                          <circle
                            cx={currentQ.targetPointer.x}
                            cy={currentQ.targetPointer.y}
                            r="11"
                            fill="#dc2626"
                            stroke="#ffffff"
                            strokeWidth="2.5"
                          />
                          {/* Target Crosshair */}
                          <line
                            x1={currentQ.targetPointer.x - 16}
                            y1={currentQ.targetPointer.y}
                            x2={currentQ.targetPointer.x + 16}
                            y2={currentQ.targetPointer.y}
                            stroke="#fef08a"
                            strokeWidth="1.5"
                          />
                          <line
                            x1={currentQ.targetPointer.x}
                            y1={currentQ.targetPointer.y - 16}
                            x2={currentQ.targetPointer.x}
                            y2={currentQ.targetPointer.y + 16}
                            stroke="#fef08a"
                            strokeWidth="1.5"
                          />
                          {/* Center Dot */}
                          <circle cx={currentQ.targetPointer.x} cy={currentQ.targetPointer.y} r="3" fill="#ffffff" />
                        </g>

                        {/* Labeled Callout Tag above Target */}
                        <g>
                          <rect
                            x={currentQ.targetPointer.x - 45}
                            y={currentQ.targetPointer.y - 34}
                            width="90"
                            height="18"
                            rx="5"
                            fill="#dc2626"
                            stroke="#fef08a"
                            strokeWidth="1.5"
                          />
                          <polygon
                            points={`${currentQ.targetPointer.x - 5},${currentQ.targetPointer.y - 16} ${currentQ.targetPointer.x + 5},${currentQ.targetPointer.y - 16} ${currentQ.targetPointer.x},${currentQ.targetPointer.y - 10}`}
                            fill="#dc2626"
                          />
                          <text
                            x={currentQ.targetPointer.x}
                            y={currentQ.targetPointer.y - 21}
                            fill="#ffffff"
                            fontSize="9"
                            fontWeight="900"
                            textAnchor="middle"
                          >
                            🎯 {isMr ? 'स्थान ओळखा' : 'Identify'}
                          </text>
                        </g>
                      </>
                    )}

                    {/* Compass North Indicator */}
                    <g transform="translate(605, 45)">
                      <circle cx="0" cy="0" r="14" fill="#1c1917" stroke="#78716c" strokeWidth="1" />
                      <polygon points="0,-12 4,0 0,2 -4,0" fill="#ef4444" />
                      <polygon points="0,12 4,0 0,2 -4,0" fill="#e7e5e4" />
                      <text x="-3.5" y="-14" fill="#ef4444" fontSize="8" fontWeight="bold">N</text>
                    </g>
                  </svg>
                )}

                {/* ------------------------------------------------------------- */}
                {/* INDIA SVG MAP */}
                {/* ------------------------------------------------------------- */}
                {currentQ?.mapType === 'india' && (
                  <svg viewBox="0 0 650 500" className="w-full max-h-[380px] sm:max-h-[440px] drop-shadow-md">
                    <defs>
                      <linearGradient id="indiaBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#292524" />
                        <stop offset="100%" stopColor="#1c1917" />
                      </linearGradient>
                      <filter id="glowTargetIndia" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Outer Map Plate */}
                    <rect x="5" y="5" width="640" height="490" rx="14" fill="url(#indiaBgGrad)" stroke="#44403c" strokeWidth="1.5" />

                    {/* Water Bodies */}
                    <rect x="10" y="240" width="100" height="240" rx="8" fill="#0c4a6e" opacity="0.3" />
                    <text x="25" y="360" fill="#38bdf8" fontSize="10" fontWeight="bold" transform="rotate(-90 25 360)">
                      अरबी समुद्र (Arabian Sea)
                    </text>

                    <rect x="510" y="240" width="125" height="240" rx="8" fill="#0c4a6e" opacity="0.3" />
                    <text x="560" y="360" fill="#38bdf8" fontSize="10" fontWeight="bold">
                      बंगालचा उपसागर
                    </text>

                    {/* Reference Grids: Tropic of Cancer 23.5° N */}
                    <line x1="40" y1="260" x2="610" y2="260" stroke="#f97316" strokeWidth="1.8" strokeDasharray="5,4" />
                    <text x="50" y="252" fill="#ea580c" fontSize="9" fontWeight="bold">
                      कर्कवृत्त २३° ३०' उत्तर (Tropic of Cancer - ८ राज्ये)
                    </text>

                    {/* Standard Meridian 82.5° E */}
                    <line x1="390" y1="30" x2="390" y2="470" stroke="#0284c7" strokeWidth="1.8" strokeDasharray="5,4" />
                    <text x="395" y="465" fill="#0369a1" fontSize="9" fontWeight="bold">
                      ८२° ३०' पूर्व रेखावृत्त (IST - ५ राज्ये)
                    </text>

                    {/* Himalayas Arc in North */}
                    <path d="M 120 70 Q 280 120 540 140" fill="none" stroke="#60a5fa" strokeWidth="10" strokeLinecap="round" opacity="0.8" />
                    <text x="250" y="90" fill="#93c5fd" fontSize="10" fontWeight="bold">बृहद हिमालय पर्वतरांग</text>

                    {/* Indo-Gangetic Plains */}
                    <ellipse cx="340" cy="180" rx="140" ry="25" fill="#15803d" opacity="0.3" stroke="#22c55e" strokeWidth="1" />
                    <text x="270" y="184" fill="#86efac" fontSize="9" fontWeight="bold">उत्तर भारतीय गंगेचे मैदान</text>

                    {/* Thar Desert */}
                    <ellipse cx="140" cy="210" rx="40" ry="25" fill="#ca8a04" opacity="0.35" stroke="#eab308" strokeWidth="1" />
                    <text x="110" y="213" fill="#fef08a" fontSize="9" fontWeight="bold">थार वाळवंट</text>

                    {/* Deccan Plateau Triangle */}
                    <polygon points="220,290 460,290 340,430" fill="#ea580c" opacity="0.25" stroke="#f97316" strokeWidth="1.5" />
                    <text x="290" y="340" fill="#fed7aa" fontSize="11" fontWeight="bold">दख्खनचे पठार</text>

                    {/* Western Ghats */}
                    <path d="M 215 280 Q 230 360 270 450" fill="none" stroke="#059669" strokeWidth="7" strokeLinecap="round" opacity="0.8" />
                    <text x="170" y="380" fill="#6ee7b7" fontSize="8" fontWeight="bold">पश्चिम घाट</text>

                    {/* Eastern Ghats */}
                    <path d="M 465 290 Q 420 370 330 450" fill="none" stroke="#059669" strokeWidth="5" strokeDasharray="9,5" strokeLinecap="round" opacity="0.7" />
                    <text x="440" y="380" fill="#6ee7b7" fontSize="8" fontWeight="bold">पूर्व घाट</text>

                    {/* Major Rivers (Ganga, Narmada, Godavari) */}
                    <path d="M 240 140 Q 360 170 490 220" fill="none" stroke="#38bdf8" strokeWidth="2.5" opacity="0.8" />
                    <path d="M 200 275 Q 260 275 320 270" fill="none" stroke="#38bdf8" strokeWidth="2.5" opacity="0.8" />
                    <path d="M 240 330 Q 340 340 450 370" fill="none" stroke="#38bdf8" strokeWidth="2.5" opacity="0.8" />

                    {/* EXPLORE MODE ALL POINTERS OR QUIZ TARGET POINTER */}
                    {activeTab === 'explore' ? (
                      MAP_QUIZ_QUESTIONS.filter((q) => q.mapType === 'india').map((q) => {
                        const isSelected = selectedExplorePointer?.id === q.id;
                        return (
                          <g
                            key={q.id}
                            className="cursor-pointer group"
                            onClick={() => setSelectedExplorePointer(q)}
                          >
                            <circle
                              cx={q.targetPointer.x}
                              cy={q.targetPointer.y}
                              r={isSelected ? 10 : 7}
                              fill={isSelected ? '#f59e0b' : (q.targetPointer.color || '#3b82f6')}
                              stroke="#ffffff"
                              strokeWidth="2"
                              className="transition-all hover:scale-125"
                            />
                            <text
                              x={q.targetPointer.x + 9}
                              y={q.targetPointer.y + 4}
                              fill="#ffffff"
                              fontSize="8"
                              fontWeight="bold"
                              className="pointer-events-none drop-shadow-md"
                            >
                              {q.targetPointer.titleMr}
                            </text>
                          </g>
                        );
                      })
                    ) : (
                      <>
                        {/* ACTIVE TARGET POINTER WITH GLOW AND RADAR PULSE */}
                        <g filter="url(#glowTargetIndia)">
                          <circle
                            cx={currentQ.targetPointer.x}
                            cy={currentQ.targetPointer.y}
                            r="18"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="2"
                            className="animate-ping"
                            opacity="0.8"
                          />
                          <circle
                            cx={currentQ.targetPointer.x}
                            cy={currentQ.targetPointer.y}
                            r="11"
                            fill="#dc2626"
                            stroke="#ffffff"
                            strokeWidth="2.5"
                          />
                          <line
                            x1={currentQ.targetPointer.x - 16}
                            y1={currentQ.targetPointer.y}
                            x2={currentQ.targetPointer.x + 16}
                            y2={currentQ.targetPointer.y}
                            stroke="#fef08a"
                            strokeWidth="1.5"
                          />
                          <line
                            x1={currentQ.targetPointer.x}
                            y1={currentQ.targetPointer.y - 16}
                            x2={currentQ.targetPointer.x}
                            y2={currentQ.targetPointer.y + 16}
                            stroke="#fef08a"
                            strokeWidth="1.5"
                          />
                          <circle cx={currentQ.targetPointer.x} cy={currentQ.targetPointer.y} r="3" fill="#ffffff" />
                        </g>

                        {/* Labeled Callout Tag above Target */}
                        <g>
                          <rect
                            x={currentQ.targetPointer.x - 45}
                            y={currentQ.targetPointer.y - 34}
                            width="90"
                            height="18"
                            rx="5"
                            fill="#dc2626"
                            stroke="#fef08a"
                            strokeWidth="1.5"
                          />
                          <polygon
                            points={`${currentQ.targetPointer.x - 5},${currentQ.targetPointer.y - 16} ${currentQ.targetPointer.x + 5},${currentQ.targetPointer.y - 16} ${currentQ.targetPointer.x},${currentQ.targetPointer.y - 10}`}
                            fill="#dc2626"
                          />
                          <text
                            x={currentQ.targetPointer.x}
                            y={currentQ.targetPointer.y - 21}
                            fill="#ffffff"
                            fontSize="9"
                            fontWeight="900"
                            textAnchor="middle"
                          >
                            🎯 {isMr ? 'स्थान ओळखा' : 'Identify'}
                          </text>
                        </g>
                      </>
                    )}

                    {/* Compass North Indicator */}
                    <g transform="translate(605, 45)">
                      <circle cx="0" cy="0" r="14" fill="#1c1917" stroke="#78716c" strokeWidth="1" />
                      <polygon points="0,-12 4,0 0,2 -4,0" fill="#ef4444" />
                      <polygon points="0,12 4,0 0,2 -4,0" fill="#e7e5e4" />
                      <text x="-3.5" y="-14" fill="#ef4444" fontSize="8" fontWeight="bold">N</text>
                    </g>
                  </svg>
                )}
              </div>
            </div>

            {/* Map Legend Footer */}
            <div className="mt-2 pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                  <span>{isMr ? '🎯 लक्ष्य पॉईंटर' : 'Target Pin'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                  <span>{isMr ? 'सह्याद्री/घाट' : 'Ghats'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                  <span>{isMr ? 'नदी खोरे' : 'Rivers'}</span>
                </span>
              </div>
              <span className="text-amber-400/90 font-medium">
                {isMr ? '💡 नकाशावर ड्रॅग किंवा झूम करता येते' : 'Pinch or use zoom controls'}
              </span>
            </div>
          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: QUESTION & OPTIONS OR EXPLORE DETAILS CARD */}
          {/* ================================================================= */}
          <div className="lg:w-5/12 flex flex-col justify-between bg-stone-900 rounded-2xl border border-stone-800 p-4 sm:p-5 shadow-lg overflow-y-auto">
            
            {/* ------------------------------------------------------------- */}
            {/* EXPLORE MODE CARD */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'explore' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {isMr ? '🔍 नकाशा वाचन व स्वयं-अध्ययन' : 'Map Reader & Study'}
                  </span>
                  <span className="text-[11px] text-stone-400">
                    {isMr ? 'नकाशातील कोणत्याही बिंदूवर क्लिक करा' : 'Click any map point'}
                  </span>
                </div>

                {selectedExplorePointer ? (
                  <div className="space-y-3 bg-stone-800/60 p-4 rounded-xl border border-stone-700 animate-in fade-in">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-black text-amber-300">
                        {selectedExplorePointer.options.find((o) => o.id === selectedExplorePointer.correctOptionId)?.textMr}
                      </h3>
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0">
                        {selectedExplorePointer.categoryMr}
                      </span>
                    </div>

                    <div className="text-xs text-stone-300 space-y-2">
                      <p className="leading-relaxed">
                        {selectedExplorePointer.explanationMr}
                      </p>
                      
                      {selectedExplorePointer.trickMr && (
                        <div className="p-2.5 rounded-lg bg-amber-950/60 border border-amber-500/30 text-amber-200 text-xs">
                          {selectedExplorePointer.trickMr}
                        </div>
                      )}

                      <div className="pt-2 border-t border-stone-700/80 text-[11px] text-stone-400 flex flex-col gap-1">
                        <div>
                          <strong className="text-stone-300">{isMr ? 'स्थान तपशील: ' : 'Location: '}</strong>
                          {selectedExplorePointer.locationDetailsMr}
                        </div>
                        <div>
                          <strong className="text-stone-300">{isMr ? 'MPSC संदर्भ: ' : 'MPSC Ref: '}</strong>
                          {selectedExplorePointer.mpscReference}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('quiz');
                        const targetIdx = filteredQuestions.findIndex((q) => q.id === selectedExplorePointer.id);
                        if (targetIdx !== -1) setCurrentIndex(targetIdx);
                      }}
                      className="w-full mt-2 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span>{isMr ? 'या घटकावर प्रश्न सोडवा ➜' : 'Practice this Question ➜'}</span>
                    </button>
                  </div>
                ) : (
                  <div className="py-12 text-center text-stone-400 space-y-2">
                    <Compass className="w-12 h-12 text-amber-400/40 mx-auto" />
                    <p className="text-sm font-bold text-stone-300">
                      {isMr ? 'नकाशातील कोणत्याही बिंदूवर क्लिक करा' : 'Select any pin on the map'}
                    </p>
                    <p className="text-xs text-stone-500">
                      {isMr
                        ? 'त्या ठिकाणाचे नाव, उगम, महामार्ग व MPSC महत्त्वाच्या ट्रिक्स येथे दिसतील.'
                        : 'Details, routes, and memory tricks will appear here.'}
                    </p>
                  </div>
                )}
              </div>
            ) : isCompleted ? (
              /* ----------------------------------------------------------- */
              /* QUIZ COMPLETED SUMMARY VIEW */
              /* ----------------------------------------------------------- */
              <div className="space-y-5 text-center py-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto">
                  <Award className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-black text-amber-300">
                    {isMr ? 'अभिनंदन! नकाशा क्विझ पूर्ण झाली 🎉' : 'Map Quiz Completed! 🎉'}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    {isMr
                      ? 'तुम्ही नकाशावर आधारित सर्व प्रश्नांचा सराव पूर्ण केला आहे.'
                      : 'You have completed the map visual question practice.'}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-stone-950/70 p-3 rounded-xl border border-stone-800">
                  <div className="text-center">
                    <span className="text-[10px] text-stone-400 block">{isMr ? 'सोडवले' : 'Total'}</span>
                    <span className="text-lg font-black text-stone-200">{scoreStats.attempted}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-emerald-400 block">{isMr ? 'अचूक' : 'Correct'}</span>
                    <span className="text-lg font-black text-emerald-400">{scoreStats.correct}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-amber-400 block">{isMr ? 'अचूकता' : 'Accuracy'}</span>
                    <span className="text-lg font-black text-amber-400">{scoreStats.accuracy}%</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{isMr ? 'पुन्हा सराव करा' : 'Restart Quiz'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCompleted(false);
                      setCurrentIndex(0);
                    }}
                    className="flex-1 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl text-xs transition-all cursor-pointer"
                  >
                    <span>{isMr ? 'उत्तरे तपासा' : 'Review Answers'}</span>
                  </button>
                </div>
              </div>
            ) : currentQ ? (
              /* ----------------------------------------------------------- */
              /* ACTIVE QUIZ QUESTION & OPTIONS VIEW */
              /* ----------------------------------------------------------- */
              <div className="space-y-4">
                
                {/* Question Header & Counter */}
                <div className="flex items-center justify-between gap-2 border-b border-stone-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      {isMr ? `प्रश्न ${currentIndex + 1} / ${filteredQuestions.length}` : `Q ${currentIndex + 1} / ${filteredQuestions.length}`}
                    </span>
                    <span className="text-[10px] text-stone-400 hidden sm:inline">
                      {currentQ.mpscReference}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => toggleBookmark(currentQ.id)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        bookmarkedQuestionIds.includes(currentQ.id)
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                          : 'bg-stone-800 text-stone-400 border-stone-700 hover:text-white'
                      }`}
                      title={isMr ? "प्रश्न जतन करा" : "Bookmark Question"}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* QUESTION TEXT */}
                <div className="bg-stone-950/70 p-3.5 rounded-xl border border-stone-800">
                  <p className="text-sm sm:text-base font-bold text-stone-100 leading-snug">
                    {isMr ? currentQ.questionMr : currentQ.questionEn}
                  </p>
                </div>

                {/* 4 MCQ OPTIONS */}
                <div className="space-y-2">
                  {currentQ.options.map((opt) => {
                    const isUserSelected = userAnswers[currentQ.id] === opt.id;
                    const isCorrectAnswer = opt.id === currentQ.correctOptionId;
                    const hasAnswered = Boolean(userAnswers[currentQ.id]);

                    let btnStyle = 'bg-stone-800 hover:bg-stone-750 border-stone-700 text-stone-200';
                    let badgeStyle = 'bg-stone-700 text-stone-300';

                    if (hasAnswered) {
                      if (isCorrectAnswer) {
                        btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-sm ring-1 ring-emerald-500/50';
                        badgeStyle = 'bg-emerald-500 text-stone-950 font-black';
                      } else if (isUserSelected && !isCorrectAnswer) {
                        btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-200 ring-1 ring-rose-500/50';
                        badgeStyle = 'bg-rose-500 text-white font-black';
                      } else {
                        btnStyle = 'bg-stone-850/60 border-stone-800 text-stone-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption(opt.id)}
                        disabled={hasAnswered}
                        className={`w-full text-left p-3 rounded-xl border font-medium text-xs sm:text-sm transition-all flex items-center justify-between gap-2.5 cursor-pointer disabled:cursor-default ${btnStyle}`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 ${badgeStyle}`}>
                            {opt.id}
                          </span>
                          <span className="truncate">
                            {isMr ? opt.textMr : opt.textEn}
                          </span>
                        </div>

                        {hasAnswered && isCorrectAnswer && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {hasAnswered && isUserSelected && !isCorrectAnswer && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* DETAILED EXPLANATION BOX */}
                {showExplanation && (
                  <div className="bg-stone-950/80 p-3.5 rounded-xl border border-amber-500/30 space-y-2 animate-in fade-in">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isMr ? 'अचूक उत्तर व स्पष्टीकरण' : 'Explanation & Facts'}</span>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed">
                      {isMr ? currentQ.explanationMr : currentQ.explanationEn}
                    </p>

                    {currentQ.trickMr && (
                      <div className="p-2 rounded-lg bg-amber-950/60 border border-amber-500/30 text-amber-200 text-xs font-medium">
                        {currentQ.trickMr}
                      </div>
                    )}

                    <div className="pt-1.5 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between flex-wrap gap-1">
                      <span>📍 {currentQ.locationDetailsMr}</span>
                      <span className="text-amber-400/90 font-medium">MPSC PYQ Verified ✓</span>
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* BOTTOM NAV BAR */}
            {activeTab === 'quiz' && !isCompleted && (
              <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{isMr ? 'मागील' : 'Prev'}</span>
                </button>

                <div className="flex items-center gap-1">
                  {filteredQuestions.map((q, idx) => {
                    const isAns = Boolean(userAnswers[q.id]);
                    const isCorrect = userAnswers[q.id] === q.correctOptionId;
                    const isCur = idx === currentIndex;

                    let dotBg = 'bg-stone-700';
                    if (isCur) dotBg = 'bg-amber-400 ring-2 ring-amber-400/40';
                    else if (isAns && isCorrect) dotBg = 'bg-emerald-500';
                    else if (isAns && !isCorrect) dotBg = 'bg-rose-500';

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          playFx('click');
                          setCurrentIndex(idx);
                          setShowExplanation(Boolean(userAnswers[q.id]));
                        }}
                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${dotBg}`}
                        title={`Q ${idx + 1}`}
                      />
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition-all flex items-center gap-1 cursor-pointer shadow-md"
                >
                  <span>
                    {currentIndex === filteredQuestions.length - 1
                      ? (isMr ? 'निकाल पहा' : 'View Result')
                      : (isMr ? 'पुढील' : 'Next')}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
