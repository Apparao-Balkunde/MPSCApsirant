import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Shield, 
  Target, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Flame, 
  Clock, 
  BookOpen, 
  Crown, 
  RefreshCw, 
  Share2, 
  TrendingUp, 
  GraduationCap,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExamPatternId, SubjectId, UserProgress, Question } from '../types';
import { MPSC_QUESTIONS } from '../data/mpscQuestions';

interface MpscCommandCenterProps {
  userProgress: UserProgress;
  language: 'mr' | 'en';
  onStartExam: (patternId: ExamPatternId, subjectId?: SubjectId, title?: string) => void;
  questionsPool?: Question[];
}

interface CadreProfile {
  id: string;
  titleMr: string;
  titleEn: string;
  category: 'Class-1' | 'Class-2';
  categoryLabelMr: string;
  payScale: string;
  dutiesMr: string;
  dutiesEn: string;
  expectedCutoff: string;
  recommendedDailyQuestions: number;
  patternId: ExamPatternId;
  iconBg: string;
  accentBorder: string;
  badgeColor: string;
  bannerPhoto: string;
}

const CADRE_PROFILES: CadreProfile[] = [
  {
    id: 'deputy_collector',
    titleMr: 'उपजिल्हाधिकारी (Deputy Collector)',
    titleEn: 'Deputy Collector / SDM',
    category: 'Class-1',
    categoryLabelMr: 'राजपत्रित गट-अ (वर्ग १)',
    payScale: 'Pay Matrix S-20 (₹56,100 - ₹1,77,500)',
    dutiesMr: 'उपविभागीय दंडाधिकारी (SDM), महसूल प्रशासन, कायदा व सुव्यवस्था, आपत्ती व्यवस्थापन व जिल्हाधिकारी यांचे मुख्य साहाय्यक.',
    dutiesEn: 'Sub-Divisional Magistrate (SDM), Revenue Administration, Law & Order, and Disaster Management.',
    expectedCutoff: '११०+ गुण (राज्यसेवा पूर्व)',
    recommendedDailyQuestions: 40,
    patternId: 'rajyaseva_gs',
    iconBg: 'from-amber-600 to-amber-800',
    accentBorder: 'border-amber-400',
    badgeColor: 'bg-amber-500 text-stone-950',
    bannerPhoto: '/mantralaya.jpg',
  },
  {
    id: 'dysp',
    titleMr: 'पोलीस उपअधीक्षक / ACP (DYSP)',
    titleEn: 'Deputy Superintendent of Police (DYSP)',
    category: 'Class-1',
    categoryLabelMr: 'राजपत्रित गट-अ (वर्ग १)',
    payScale: 'Pay Matrix S-20 (₹56,100 - ₹1,77,500)',
    dutiesMr: 'पोलीस उपविभागाचे प्रमुख, गंभीर गुन्ह्यांचे अन्वेषण, कायदा व सुव्यवस्था, बंदोबस्त आणि VVIP सुरक्षा.',
    dutiesEn: 'Head of Police Sub-Division, Serious Crime Investigation, Law & Order maintenance, VVIP security.',
    expectedCutoff: '१०५+ गुण (राज्यसेवा पूर्व)',
    recommendedDailyQuestions: 35,
    patternId: 'rajyaseva_gs',
    iconBg: 'from-blue-700 to-indigo-900',
    accentBorder: 'border-blue-400',
    badgeColor: 'bg-blue-500 text-white',
    bannerPhoto: '/gateway_of_india.jpg',
  },
  {
    id: 'tehsildar',
    titleMr: 'तहसीलदार (Tehsildar)',
    titleEn: 'Tehsildar & Executive Magistrate',
    category: 'Class-1',
    categoryLabelMr: 'राजपत्रित गट-अ (वर्ग १)',
    payScale: 'Pay Matrix S-19 (₹53,100 - ₹1,67,800)',
    dutiesMr: 'तालुका दंडाधिकारी, जमीन महसूल वसुली, नैसर्गिक आपत्ती साहाय्य, सार्वजनिक वितरण व्यवस्था व स्थानिक निवडणुका.',
    dutiesEn: 'Taluka Executive Magistrate, Land Revenue, Disaster Relief, Public Distribution, and Local Elections.',
    expectedCutoff: '१०२+ गुण (राज्यसेवा पूर्व)',
    recommendedDailyQuestions: 30,
    patternId: 'rajyaseva_gs',
    iconBg: 'from-emerald-700 to-teal-900',
    accentBorder: 'border-emerald-400',
    badgeColor: 'bg-emerald-500 text-stone-950',
    bannerPhoto: '/open_reference_book.jpg',
  },
  {
    id: 'aso',
    titleMr: 'सहायक कक्ष अधिकारी (ASO - मंत्रालय)',
    titleEn: 'Assistant Section Officer (Mantralaya)',
    category: 'Class-2',
    categoryLabelMr: 'अराजपत्रित गट-ब (वर्ग २)',
    payScale: 'Pay Matrix S-14 (₹38,600 - ₹1,22,800)',
    dutiesMr: 'मंत्रालय प्रशासकीय संचिका हाताळणी, मंत्रिमंडळ टिपणी, शासकीय निर्णय (GR) मसुदा आणि विधानसभा कामकाज.',
    dutiesEn: 'Mantralaya file processing, Cabinet notes drafting, Government Resolutions (GRs), and Legislature business.',
    expectedCutoff: '६०+ गुण (संयुक्त गट-ब पूर्व)',
    recommendedDailyQuestions: 30,
    patternId: 'combine_group_b_c',
    iconBg: 'from-purple-700 to-violet-900',
    accentBorder: 'border-purple-400',
    badgeColor: 'bg-purple-500 text-white',
    bannerPhoto: '/constitution_of_india.jpg',
  },
  {
    id: 'sti',
    titleMr: 'राज्य कर निरीक्षक (STI)',
    titleEn: 'State Tax Inspector (STI)',
    category: 'Class-2',
    categoryLabelMr: 'अराजपत्रित गट-ब (वर्ग २)',
    payScale: 'Pay Matrix S-14 (₹38,600 - ₹1,22,800)',
    dutiesMr: 'महाराष्ट्र वस्तू व सेवा कर (GST) संकलन, करदात्यांचे ऑडिट, करचुकवेगिरी तपासणी आणि राज्य महसूल वाढवणे.',
    dutiesEn: 'Maharashtra GST collection, business audit, evasion inspection, and state tax revenue enhancement.',
    expectedCutoff: '५८+ गुण (संयुक्त गट-ब पूर्व)',
    recommendedDailyQuestions: 25,
    patternId: 'combine_group_b_c',
    iconBg: 'from-orange-700 to-amber-900',
    accentBorder: 'border-orange-400',
    badgeColor: 'bg-orange-500 text-stone-950',
    bannerPhoto: '/library_books.jpg',
  },
  {
    id: 'psi',
    titleMr: 'पोलीस उपनिरीक्षक (PSI)',
    titleEn: 'Police Sub-Inspector (PSI)',
    category: 'Class-2',
    categoryLabelMr: 'अराजपत्रित गट-ब (वर्ग २)',
    payScale: 'Pay Matrix S-14 (₹38,600 - ₹1,22,800)',
    dutiesMr: 'पोलीस ठाण्यातील प्रथम तपास अधिकारी, एफआयआर नोंद, रात्र गस्त, कोर्ट कामकाज आणि गुन्हेगारांचा बंदोबस्त.',
    dutiesEn: 'Station Investigating Officer, FIR registration, night patrolling, charge-sheet filing, and crime prevention.',
    expectedCutoff: '५५+ गुण (संयुक्त पूर्व + शारीरिक चाचणी)',
    recommendedDailyQuestions: 25,
    patternId: 'combine_group_b_c',
    iconBg: 'from-rose-700 to-red-950',
    accentBorder: 'border-rose-400',
    badgeColor: 'bg-rose-500 text-white',
    bannerPhoto: '/gateway_of_india.jpg',
  },
];

const MOTIVATIONAL_QUOTES = [
  {
    quoteMr: "शिक्षण हे वाघिणीचे दूध आहे आणि जो ते प्राशन करेल तो गुरगुरल्याशिवाय राहणार नाही!",
    authorMr: "भारतरत्न डॉ. बाबासाहेब आंबेडकर",
    quoteEn: "Education is the milk of a tigress, and whoever drinks it will roar!",
    authorEn: "Dr. B.R. Ambedkar",
  },
  {
    quoteMr: "प्रतिपच्चंद्रलेखेव वर्धिष्णुर्विश्ववंदिता शाहसूनोः शिवस्यैषा मुद्रा भद्राय राजते!",
    authorMr: "छत्रपती शिवाजी महाराज",
    quoteEn: "Ever increasing like the crescent moon, adored by the universe, this seal brings public welfare!",
    authorEn: "Chhatrapati Shivaji Maharaj",
  },
  {
    quoteMr: "स्वप्ने ती नव्हेत जी झोपेत पडतात, स्वप्ने ती आहेत जी तुम्हाला झोपूच देत नाहीत!",
    authorMr: "डॉ. ए. पी. जे. अब्दुल कलाम",
    quoteEn: "Dream is not what you see in sleep, dream is the thing which does not let you sleep!",
    authorEn: "Dr. A.P.J. Abdul Kalam",
  },
  {
    quoteMr: "विद्येविना मती गेली, मतीविना नीती गेली, नीतीविना गती गेली, गतीविना वित्त गेले!",
    authorMr: "क्रांतिसूर्य महात्मा जोतीराव फुले",
    quoteEn: "Without knowledge, intellect is lost; without intellect, morality is lost; without morality, progress is lost!",
    authorEn: "Mahatma Jyotirao Phule",
  },
  {
    quoteMr: "प्रशासनात येण्याचा उद्देश सत्तेचा उपभोग घेणे नसून सामान्यांच्या जीवनात सकारात्मक बदल घडवणे हाच असावा.",
    authorMr: "MPSC टॉपर मार्गदर्शक विचार",
    quoteEn: "The true aim of joining civil services is not power, but creating a meaningful positive impact on common lives.",
    authorEn: "MPSC Ranker Wisdom",
  },
];

export const MpscCommandCenter: React.FC<MpscCommandCenterProps> = ({
  userProgress,
  language,
  onStartExam,
  questionsPool,
}) => {
  const isMr = language === 'mr';
  const pool = questionsPool && questionsPool.length > 0 ? questionsPool : MPSC_QUESTIONS;

  // Selected Target Cadre state (persisted)
  const [selectedCadreId, setSelectedCadreId] = useState<string>(() => {
    return localStorage.getItem('mpsc_user_target_cadre') || 'deputy_collector';
  });

  const selectedCadre = CADRE_PROFILES.find((c) => c.id === selectedCadreId) || CADRE_PROFILES[0];

  // Daily Quote state
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Rapid Fire mini question of the hour
  const [rapidIndex, setRapidIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Available high-yield questions for rapid fire
  const rapidQuestions = pool.slice(0, 15);
  const currentQ = rapidQuestions[rapidIndex % rapidQuestions.length];

  const handleSelectAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
    if (idx === currentQ.correctAnswerIndex) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const handleNextRapidQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setRapidIndex((prev) => (prev + 1) % rapidQuestions.length);
  };

  const handleCadreCommit = (id: string) => {
    setSelectedCadreId(id);
    localStorage.setItem('mpsc_user_target_cadre', id);
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
  };

  // Readiness calculation based on user streak and total tests
  const totalAttempted = userProgress.history.reduce((acc, h) => acc + h.attemptedCount, 0);
  const totalCorrect = userProgress.history.reduce((acc, h) => acc + h.correctCount, 0);
  const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  
  // Readiness score (0-100)
  const readinessScore = Math.min(
    100,
    Math.round(
      (Math.min(userProgress.streakDays, 14) / 14) * 35 +
      (Math.min(totalAttempted, 200) / 200) * 35 +
      (accuracy / 100) * 30
    )
  );

  return (
    <div className="space-y-6 select-none">
      {/* ========================================================================= */}
      {/* SECTION 1: DREAM CADRE VISION BOARD & TARGET SIMULATOR */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 rounded-2xl border border-amber-500/35 p-5 sm:p-7 shadow-2xl text-stone-100 relative overflow-hidden">
        {/* Background glow & subtle watermark */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-stone-800">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 p-0.5 shadow-lg shadow-amber-500/30 shrink-0">
              <div className="w-full h-full rounded-2xl bg-stone-950 flex items-center justify-center">
                <Crown className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {isMr ? 'माझे प्रशासकीय ध्येय: पद निवड व लक्ष्य ट्रॅकर' : 'Dream Post Vision Board & Target Tracker'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-black uppercase border border-amber-500/40">
                  {isMr ? 'MPSC मिशन २०२६' : 'MPSC Mission 2026'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                {isMr 
                  ? 'तुमचे स्वप्नातील अधिकारी पद निवडा — त्यानुसार अपेक्षित कटऑफ, जबाबदाऱ्या व तयारीचा मार्ग पहा.' 
                  : 'Select your target administrative post to view cutoff expectations, key duties, and curated mock tests.'}
              </p>
            </div>
          </div>

          {/* Aspirant Readiness Meter */}
          <div className="flex items-center gap-3 bg-stone-900/90 border border-stone-750 px-4 py-2.5 rounded-xl shrink-0 backdrop-blur-md">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-stone-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-400 transition-all duration-1000"
                  strokeDasharray={`${readinessScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-[11px] font-black text-white font-mono">
                {readinessScore}%
              </span>
            </div>
            <div>
              <div className="text-[10px] text-stone-400 font-bold uppercase">
                {isMr ? 'तयारी तत्परता निर्देशांक' : 'Aspirant Readiness'}
              </div>
              <div className="text-xs font-black text-amber-300">
                {readinessScore >= 70
                  ? isMr ? '🔥 उत्कृष्ट प्रगती!' : '🔥 Excellent Pace!'
                  : readinessScore >= 40
                  ? isMr ? '⚡ वेगाने सुधारणा सुरू' : '⚡ Good Momentum'
                  : isMr ? '🎯 सराव वाढवा' : '🎯 Practice More'}
              </div>
            </div>
          </div>
        </div>

        {/* 6 Target Cadre Quick Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 my-5">
          {CADRE_PROFILES.map((cadre) => {
            const isSelected = selectedCadreId === cadre.id;
            return (
              <button
                key={cadre.id}
                type="button"
                onClick={() => handleCadreCommit(cadre.id)}
                className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 relative ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 shadow-md ring-2 ring-amber-400/40'
                    : 'bg-stone-850/60 border-stone-800 hover:bg-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                    cadre.category === 'Class-1' ? 'bg-amber-500 text-stone-950' : 'bg-stone-700 text-stone-200'
                  }`}>
                    {cadre.category}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  )}
                </div>

                <div className="mt-1">
                  <h4 className="text-xs font-black text-white leading-tight line-clamp-1">
                    {isMr ? cadre.titleMr.split('(')[0] : cadre.titleEn}
                  </h4>
                  <p className="text-[10px] text-amber-300/80 font-bold mt-0.5">
                    {cadre.categoryLabelMr}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Cadre Detailed Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch bg-stone-950/80 rounded-xl border border-amber-500/25 p-4 sm:p-6 backdrop-blur-md">
          {/* Cadre Left Photo + Badge */}
          <div className="lg:col-span-4 relative rounded-xl overflow-hidden border border-stone-800 group aspect-[4/3] sm:aspect-auto sm:h-full min-h-[220px]">
            <img
              src={selectedCadre.bannerPhoto}
              alt={selectedCadre.titleMr}
              className="w-full h-full object-cover object-center filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent pointer-events-none" />

            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${selectedCadre.badgeColor}`}>
                {selectedCadre.categoryLabelMr}
              </span>
              <h3 className="text-base sm:text-lg font-black mt-1 text-white drop-shadow-md">
                {isMr ? selectedCadre.titleMr : selectedCadre.titleEn}
              </h3>
              <p className="text-[10px] text-stone-300 font-mono mt-0.5 drop-shadow">
                {selectedCadre.payScale}
              </p>
            </div>
          </div>

          {/* Cadre Middle & Right: Duties, Targets, and Action */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>{isMr ? 'प्रमुख प्रशासकीय जबाबदाऱ्या व अधिकार' : 'Key Administrative Responsibilities'}</span>
                </span>
                <span className="text-[11px] font-semibold text-stone-400 bg-stone-900 px-2.5 py-0.5 rounded-full border border-stone-800">
                  {isMr ? 'अपेक्षित पूर्व परीक्षा कटऑफ:' : 'Expected Cutoff:'}{' '}
                  <strong className="text-emerald-400">{selectedCadre.expectedCutoff}</strong>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-stone-900/60 p-3.5 rounded-xl border border-stone-800">
                {isMr ? selectedCadre.dutiesMr : selectedCadre.dutiesEn}
              </p>

              {/* Cadre Target Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800">
                  <div className="text-[10px] text-stone-400 uppercase font-bold">
                    {isMr ? 'शिफारस केलेले दैनिक लक्ष्य' : 'Target Daily Practice'}
                  </div>
                  <div className="text-lg font-black text-amber-400 font-mono mt-0.5">
                    {selectedCadre.recommendedDailyQuestions} {isMr ? 'प्रश्न / दिवस' : 'Qs / day'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800">
                  <div className="text-[10px] text-stone-400 uppercase font-bold">
                    {isMr ? 'तुमची सध्याची अचूकता' : 'Current Accuracy'}
                  </div>
                  <div className={`text-lg font-black font-mono mt-0.5 ${accuracy >= 60 ? 'text-emerald-400' : 'text-stone-300'}`}>
                    {accuracy}%
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-stone-400 uppercase font-bold">
                    {isMr ? 'अभ्यास सातत्य' : 'Study Streak'}
                  </div>
                  <div className="text-lg font-black text-orange-400 font-mono mt-0.5 flex items-center gap-1">
                    <Flame className="w-4 h-4 fill-orange-400" />
                    <span>{userProgress.streakDays} {isMr ? 'दिवस' : 'Days'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Launch Practice for this Cadre Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onStartExam(selectedCadre.patternId, undefined, `🎯 ${isMr ? selectedCadre.titleMr : selectedCadre.titleEn} सराव चाचणी`)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-stone-950" />
                <span>
                  {isMr 
                    ? `या पदासाठी सराव परीक्षा सुरू करा (${selectedCadre.titleMr.split('(')[0]}) ➜` 
                    : `Start Target Exam for this Cadre ➜`}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleCadreCommit(selectedCadre.id)}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-stone-850 hover:bg-stone-800 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{isMr ? 'हे पद माझे ध्येय म्हणून निश्चित करा' : 'Commit as My Target Post'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: LIVE "RAPID-FIRE QUESTION OF THE HOUR" & DAILY MOTIVATION */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Rapid-Fire Question of the Hour (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-4">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4 fill-amber-500" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-stone-900">
                    {isMr ? 'तासाचे थेट आव्हान: १-मिनिट रॅपिड फायर प्रश्न' : 'Rapid-Fire Challenge Question'}
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    {isMr ? 'पूर्ण परीक्षा सुरू करण्यापूर्वी तत्काळ सोडवा आणि विश्लेषण पहा.' : 'Instant 1-minute question with immediate explanation.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                  {currentQ.difficulty}
                </span>
                <button
                  type="button"
                  onClick={handleNextRapidQuestion}
                  className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  title={isMr ? "पुढील प्रश्न पहा" : "Next question"}
                >
                  <RefreshCw className="w-3 h-3 text-stone-600" />
                  <span>{isMr ? 'पुढील प्रश्न' : 'Next'}</span>
                </button>
              </div>
            </div>

            {/* Question Text */}
            <div className="my-4">
              <p className="text-xs sm:text-sm font-bold text-stone-900 leading-relaxed">
                {isMr ? currentQ.questionMr : currentQ.questionEn}
              </p>
            </div>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
              {(isMr ? currentQ.optionsMr : currentQ.optionsEn).map((opt, idx) => {
                const isChosen = selectedAnswer === idx;
                const isCorrect = idx === currentQ.correctAnswerIndex;
                const showResults = selectedAnswer !== null;

                let btnStyles = 'bg-stone-50 border-stone-200 hover:bg-amber-50 hover:border-amber-300 text-stone-800';

                if (showResults) {
                  if (isCorrect) {
                    btnStyles = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-black ring-1 ring-emerald-400';
                  } else if (isChosen && !isCorrect) {
                    btnStyles = 'bg-rose-50 border-rose-300 text-rose-900 line-through';
                  } else {
                    btnStyles = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={showResults}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-2.5 cursor-pointer ${btnStyles}`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white border border-current flex items-center justify-center shrink-0 font-bold text-[10px]">
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    <span className="flex-1 leading-snug">{opt}</span>
                    {showResults && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {showResults && isChosen && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation when answered */}
            {showExplanation && (
              <div className="mt-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-stone-800 animate-in fade-in duration-200">
                <div className="font-extrabold text-amber-900 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-700" />
                  <span>{isMr ? 'अचूक उत्तर विश्लेषण:' : 'Explanation:'}</span>
                </div>
                <p className="leading-relaxed text-stone-700">
                  {isMr ? currentQ.explanationMr : currentQ.explanationEn}
                </p>
              </div>
            )}
          </div>

          {/* Quick Exam CTA Strip */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="text-stone-500 font-medium">
              {isMr ? 'संपूर्ण १०० गुणांची परीक्षा द्यायची आहे?' : 'Want to take a full 100-mark test?'}
            </span>
            <button
              type="button"
              onClick={() => onStartExam('daily_10_challenge')}
              className="text-amber-700 hover:text-amber-800 font-extrabold flex items-center gap-1 cursor-pointer"
            >
              <span>{isMr ? 'दैनिक १० मिनिटांचे चॅलेंज सुरू करा ➜' : 'Take Daily 10-Min Challenge ➜'}</span>
            </button>
          </div>
        </div>

        {/* Right: Daily Civil Service Thought & Aspirant Pledge (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 rounded-2xl border border-stone-800 p-5 sm:p-6 text-stone-100 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{isMr ? 'दैनिक प्रशासकीय प्रेरणा' : 'Daily Inspiration'}</span>
              </div>
              <button
                type="button"
                onClick={nextQuote}
                className="w-7 h-7 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors cursor-pointer"
                title={isMr ? "पुढील विचार" : "Next thought"}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Motivational Quote */}
            <div className="relative py-2">
              <span className="text-4xl text-amber-500/20 font-serif absolute -top-3 -left-1">“</span>
              <p className="text-sm font-bold text-stone-200 leading-relaxed italic pl-3">
                {isMr ? MOTIVATIONAL_QUOTES[quoteIndex].quoteMr : MOTIVATIONAL_QUOTES[quoteIndex].quoteEn}
              </p>
              <div className="mt-3 text-right">
                <span className="text-xs font-black text-amber-400">
                  — {isMr ? MOTIVATIONAL_QUOTES[quoteIndex].authorMr : MOTIVATIONAL_QUOTES[quoteIndex].authorEn}
                </span>
              </div>
            </div>

            {/* Aspirant Pledge Card */}
            <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-[11px]">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isMr ? 'माझी अभ्यासाची प्रतिज्ञा' : 'My Aspirant Oath'}</span>
              </div>
              <p className="text-[11px] text-stone-300 leading-relaxed">
                {isMr
                  ? '"मी दररोज प्रामाणिकपणे सराव करेन, स्वतःच्या चुकांमधून शिकेन आणि महाराष्ट्राच्या लोकसेवेसाठी समर्पित राहीन."'
                  : '"I commit to daily disciplined practice, continuous self-improvement, and selfless service to the people of Maharashtra."'}
              </p>
            </div>
          </div>

          {/* Quick Streak Momentum Footer */}
          <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs mt-4">
            <div className="flex items-center gap-1.5 text-orange-400 font-bold">
              <Flame className="w-4 h-4 fill-orange-400" />
              <span>{userProgress.streakDays} {isMr ? 'दिवस अखंड सातत्य' : 'Days Streak'}</span>
            </div>
            <span className="text-stone-400 text-[11px]">
              {userProgress.todayQuestionsCount} / {userProgress.dailyTargetQuestions} {isMr ? 'प्रश्न पूर्ण' : 'Done today'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
