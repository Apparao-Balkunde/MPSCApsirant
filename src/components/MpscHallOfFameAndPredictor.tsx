import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Crown, 
  Sparkles, 
  Target, 
  Calculator, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Volume2, 
  VolumeX, 
  Flame, 
  Lock, 
  Unlock, 
  QrCode, 
  Compass, 
  Share2,
  Scale
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProgress, ExamPatternId } from '../types';

interface MpscHallOfFameAndPredictorProps {
  userProgress: UserProgress;
  language: 'mr' | 'en';
  currentUserName?: string;
  onStartExam: (patternId: ExamPatternId, subjectId?: any, title?: string) => void;
}

// Synthesized Web Audio fanfare chime (Zero external audio files needed)
function playPrestigeFanfare() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    
    // Rich harmonic chime: C5, E5, G5, C6
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.09);
      gain.gain.setValueAtTime(0.001, now + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.15, now + i * 0.09 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.09 + 0.7);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.75);
    });
  } catch {}
}

export const MpscHallOfFameAndPredictor: React.FC<MpscHallOfFameAndPredictorProps> = ({
  userProgress,
  language,
  currentUserName,
  onStartExam,
}) => {
  const isMr = language === 'mr';
  const aspirantName = currentUserName || 'Apparao Balkunde';

  // Sound FX toggle (persisted)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return localStorage.getItem('mpsc_sound_fx') !== 'false';
  });

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem('mpsc_sound_fx', String(next));
    if (next) playPrestigeFanfare();
  };

  // =========================================================================
  // 1. LIVE CUT-OFF CALCULATOR & MARKS PREDICTOR STATE
  // =========================================================================
  const [totalQuestionsSim, setTotalQuestionsSim] = useState<number>(100);
  const [correctCountSim, setCorrectCountSim] = useState<number>(65);
  const [incorrectCountSim, setIncorrectCountSim] = useState<number>(20);
  const [reservationCategory, setReservationCategory] = useState<'OPEN' | 'OBC' | 'EWS' | 'SC' | 'ST'>('OPEN');

  const unattemptedSim = Math.max(0, totalQuestionsSim - (correctCountSim + incorrectCountSim));

  // 1/4 Negative Marking Calculation for Rajyaseva / Combine
  // 100 Qs = 200 Marks (2 marks per correct, -0.5 mark deduction per wrong)
  const marksPerCorrect = 2;
  const penaltyPerWrong = 0.5;
  const netScore = useMemo(() => {
    const gross = correctCountSim * marksPerCorrect;
    const penalty = incorrectCountSim * penaltyPerWrong;
    return Math.max(0, Math.round((gross - penalty) * 10) / 10);
  }, [correctCountSim, incorrectCountSim]);

  // Target Cutoff Thresholds for 200-mark GS Paper
  const cutoffBenchmarks: Record<string, { deputyCollector: number; dysp: number; tehsildar: number; aso: number; psi: number }> = {
    OPEN: { deputyCollector: 112, dysp: 106, tehsildar: 102, aso: 120, psi: 108 },
    OBC: { deputyCollector: 110, dysp: 104, tehsildar: 100, aso: 118, psi: 106 },
    EWS: { deputyCollector: 109, dysp: 103, tehsildar: 99, aso: 116, psi: 105 },
    SC: { deputyCollector: 102, dysp: 96, tehsildar: 92, aso: 108, psi: 98 },
    ST: { deputyCollector: 94, dysp: 88, tehsildar: 84, aso: 98, psi: 90 },
  };

  const currentCutoff = cutoffBenchmarks[reservationCategory];
  const clearsDeputyCollector = netScore >= currentCutoff.deputyCollector;
  const clearsDysp = netScore >= currentCutoff.dysp;
  const clearsTehsildar = netScore >= currentCutoff.tehsildar;

  // Probability Status
  const getProbabilityLabel = () => {
    if (clearsDeputyCollector) {
      return {
        label: isMr ? '👑 उपजिल्हाधिकारी (वर्ग १) साठी सुरक्षित!' : '👑 Safe for Deputy Collector!',
        color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40',
        probability: '९८%',
      };
    }
    if (clearsDysp) {
      return {
        label: isMr ? '🚔 पोलीस उपअधीक्षक (DYSP) साठी पात्र!' : '🚔 Qualified for DYSP!',
        color: 'text-blue-400 bg-blue-500/20 border-blue-500/40',
        probability: '९०%',
      };
    }
    if (clearsTehsildar) {
      return {
        label: isMr ? '🏛️ तहसीलदार पदासाठी पात्र!' : '🏛️ Qualified for Tehsildar!',
        color: 'text-amber-400 bg-amber-500/20 border-amber-500/40',
        probability: '८२%',
      };
    }
    const diff = Math.round((currentCutoff.tehsildar - netScore) * 10) / 10;
    return {
      label: isMr ? `🎯 तहसीलदार कटऑफसाठी आणखी +${diff} गुणांची गरज` : `🎯 Need +${diff} more marks for Cutoff`,
      color: 'text-rose-400 bg-rose-500/20 border-rose-500/40',
      probability: '६०%',
    };
  };

  const probResult = getProbabilityLabel();

  // =========================================================================
  // 2. UNLOCKED AWARDS & MEDALS LOGIC
  // =========================================================================
  const totalAttempted = userProgress.history.reduce((acc, h) => acc + h.attemptedCount, 0);
  const totalCorrect = userProgress.history.reduce((acc, h) => acc + h.correctCount, 0);
  const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  const testsTaken = userProgress.history.length;

  const medals = [
    {
      id: 'streak_shield',
      titleMr: 'अखंड सातत्यवीर ढाल',
      titleEn: 'Consistent Practice Shield',
      descMr: 'किमान ३ दिवस सलग अभ्यास सातत्य पूर्ण केले.',
      descEn: 'Maintained at least 3 days practice streak.',
      unlocked: userProgress.streakDays >= 3,
      icon: Flame,
      color: 'from-orange-500 to-amber-600',
      badge: `${userProgress.streakDays}/३ दिवस`,
    },
    {
      id: 'gold_standard',
      titleMr: 'सत्यमेव जयते सुवर्ण पदक',
      titleEn: 'Accuracy Gold Medal',
      descMr: 'एकूण चाचण्यांमध्ये ७०% पेक्षा जास्त अचूकता राखली.',
      descEn: 'Maintained 70%+ overall exam accuracy.',
      unlocked: accuracy >= 70 && totalAttempted >= 20,
      icon: Award,
      color: 'from-amber-400 to-yellow-600',
      badge: `${accuracy}% अचूकता`,
    },
    {
      id: 'warrior_exam',
      titleMr: 'राज्यसेवा रणधुरंधर',
      titleEn: 'Rajyaseva Test Veteran',
      descMr: 'किमान ३ पूर्ण लांबीच्या सराव चाचण्या यशस्वीरीत्या दिल्या.',
      descEn: 'Completed 3+ full mock test sessions.',
      unlocked: testsTaken >= 3,
      icon: Crown,
      color: 'from-blue-500 to-indigo-700',
      badge: `${testsTaken}/३ चाचण्या`,
    },
    {
      id: 'constitution_master',
      titleMr: 'संविधान व कायदा विशारद',
      titleEn: 'Constitution & Law Master',
      descMr: 'सामान्य अध्ययन व कायदे प्रश्नसंग्रहात प्राविण्य मिळवले.',
      descEn: 'Demonstrated mastery in Polity & Legal subjects.',
      unlocked: totalAttempted >= 50,
      icon: Scale,
      color: 'from-emerald-500 to-teal-700',
      badge: `${totalAttempted}/५० प्रश्न`,
    },
  ];

  const unlockedCount = medals.filter((m) => m.unlocked).length;

  const triggerCelebrate = () => {
    if (soundEnabled) playPrestigeFanfare();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.65 },
    });
  };

  return (
    <div className="space-y-6 select-none">
      {/* ========================================================================= */}
      {/* SECTION 1: LIVE PRELIMS CUTOFF CALCULATOR & MARKS PREDICTOR */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 rounded-2xl border border-amber-500/35 p-5 sm:p-7 shadow-2xl text-stone-100 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
              <Calculator className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {isMr ? 'MPSC कट-ऑफ व गुण प्रेडिक्टर (१/४ निगेटिव्ह मार्किंग)' : 'MPSC Real Cut-Off & Score Predictor'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase border border-amber-500/30">
                  {isMr ? 'रिअल टाइम सिम्युलेटर' : 'Live Simulator'}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                {isMr 
                  ? 'बरोबर व चुकीच्या प्रश्नांची संख्या बदला — थेट निव्वळ गुण आणि संवर्ग कटऑफ पात्रता तपासा.' 
                  : 'Adjust correct & wrong answers to simulate net marks with 1/4 negative deduction.'}
              </p>
            </div>
          </div>

          {/* Sound Effect Toggle */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={toggleSound}
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title={soundEnabled ? (isMr ? "ध्वनी प्रभाव चालू आहे" : "Sound FX: On") : (isMr ? "ध्वनी प्रभाव बंद आहे" : "Sound FX: Off")}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px]">{isMr ? 'ध्वनी: चालू' : 'Sound: ON'}</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-stone-500" />
                  <span className="text-[11px] text-stone-400">{isMr ? 'ध्वनी: बंद' : 'Sound: OFF'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-5">
          {/* Left Column: Sliders for Correct & Incorrect (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4 bg-stone-950/60 p-4 sm:p-5 rounded-xl border border-stone-800">
            {/* Category Select */}
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-stone-800/80">
              <span className="text-xs font-bold text-stone-300">
                {isMr ? 'आरक्षण प्रवर्ग (Reservation Category):' : 'Select Category:'}
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {(['OPEN', 'OBC', 'EWS', 'SC', 'ST'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setReservationCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      reservationCategory === cat
                        ? 'bg-amber-500 text-stone-950 shadow-sm'
                        : 'bg-stone-850 text-stone-400 hover:text-stone-200 border border-stone-750'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 1: Correct Questions */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isMr ? 'बरोबर सोडवलेले प्रश्न (+२ गुण):' : 'Correct Answers (+2 Marks):'}</span>
                </span>
                <span className="font-black text-sm text-emerald-400 font-mono">
                  {correctCountSim} / {totalQuestionsSim}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={totalQuestionsSim - incorrectCountSim}
                value={correctCountSim}
                onChange={(e) => setCorrectCountSim(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-stone-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>० प्रश्न</span>
                <span>+{correctCountSim * 2} एकूण गुण</span>
                <span>{totalQuestionsSim} प्रश्न</span>
              </div>
            </div>

            {/* Slider 2: Incorrect Questions */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>{isMr ? 'चुकीचे सोडवलेले प्रश्न (-०.५ गुण निगेटिव्ह):' : 'Incorrect Answers (-0.5 Negative):'}</span>
                </span>
                <span className="font-black text-sm text-rose-400 font-mono">
                  {incorrectCountSim} प्रश्न
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={totalQuestionsSim - correctCountSim}
                value={incorrectCountSim}
                onChange={(e) => setIncorrectCountSim(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-2 bg-stone-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>० चूक</span>
                <span className="text-rose-400 font-bold">-{incorrectCountSim * 0.5} गुण वजा</span>
                <span>{totalQuestionsSim - correctCountSim} चूक</span>
              </div>
            </div>

            {/* Status Breakdown Bar */}
            <div className="pt-2 flex items-center justify-between text-xs text-stone-400 border-t border-stone-800/80">
              <span>
                {isMr ? 'सोडवले नाहीत:' : 'Unattempted:'} <strong className="text-stone-200 font-mono">{unattemptedSim}</strong>
              </span>
              <span>
                {isMr ? 'नकारात्मक गुण वजावट:' : 'Negative deduction:'}{' '}
                <strong className="text-rose-400 font-mono">-{incorrectCountSim * 0.5}</strong>
              </span>
            </div>
          </div>

          {/* Right Column: Net Predicted Score Display & Post Cleared Status (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-stone-900 p-5 sm:p-6 rounded-2xl border border-amber-500/40 flex flex-col justify-between gap-4 text-center shadow-lg relative overflow-hidden">
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider">
                {isMr ? 'अंदाजित निव्वळ गुण (Net Marks / 200)' : 'Predicted Net Score / 200'}
              </span>

              {/* Big Score Display */}
              <div className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight py-1">
                {netScore.toFixed(1)}{' '}
                <span className="text-lg font-bold text-stone-400 font-sans">
                  / २००
                </span>
              </div>

              {/* Cutoff Status Badge */}
              <div className={`p-2.5 rounded-xl border text-xs font-black shadow-inner ${probResult.color}`}>
                {probResult.label}
              </div>
            </div>

            {/* Target Cadre Probability Badges */}
            <div className="space-y-2 pt-2 border-t border-stone-800 text-left text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-300 font-semibold">
                  👑 {isMr ? 'उपजिल्हाधिकारी' : 'Deputy Collector'} ({currentCutoff.deputyCollector}):
                </span>
                <span className={`font-mono font-black ${clearsDeputyCollector ? 'text-emerald-400' : 'text-stone-500'}`}>
                  {clearsDeputyCollector ? '✅ पात्र (Qualified)' : '✗ अपात्र'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-300 font-semibold">
                  🚔 {isMr ? 'पोलीस उपअधीक्षक (DYSP)' : 'DYSP (Police)'} ({currentCutoff.dysp}):
                </span>
                <span className={`font-mono font-black ${clearsDysp ? 'text-emerald-400' : 'text-stone-500'}`}>
                  {clearsDysp ? '✅ पात्र (Qualified)' : '✗ अपात्र'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-300 font-semibold">
                  🏛️ {isMr ? 'तहसीलदार' : 'Tehsildar'} ({currentCutoff.tehsildar}):
                </span>
                <span className={`font-mono font-black ${clearsTehsildar ? 'text-emerald-400' : 'text-stone-500'}`}>
                  {clearsTehsildar ? '✅ पात्र (Qualified)' : '✗ अपात्र'}
                </span>
              </div>
            </div>

            {/* Test Action Button */}
            <button
              type="button"
              onClick={() => {
                triggerCelebrate();
                onStartExam('rajyaseva_gs', undefined, isMr ? '🎯 राज्यसेवा २०० गुणांची प्रत्यक्ष सराव परीक्षा' : 'Rajyaseva Full GS Mock Exam');
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs transition-all shadow-md cursor-pointer hover:scale-[1.02]"
            >
              {isMr ? '🚀 २०० गुणांची खरी सराव परीक्षा सुरू करा' : '🚀 Start 200-Mark Mock Test'}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: HALL OF FAME MEDALS & DIGITAL ASPIRANT CARD */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: 4 Prestigious Medals & Badges (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-4">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  <Award className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-stone-900">
                    {isMr ? 'माझे प्रशासकीय सन्मान पदक दालन (Hall of Fame)' : 'Aspirant Hall of Fame & Badges'}
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    {isMr ? 'सराव चाचण्या आणि सातत्यानुसार ही पदके आपोआप अनलॉक होतात.' : 'Unlock prestigious badges as your practice grows.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  {unlockedCount} / {medals.length} {isMr ? 'पदके अनलॉक' : 'Unlocked'}
                </span>
                <button
                  type="button"
                  onClick={triggerCelebrate}
                  className="px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
                  title={isMr ? "अभिनंदन साजरे करा" : "Celebrate"}
                >
                  🎉
                </button>
              </div>
            </div>

            {/* 4 Medals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
              {medals.map((m) => {
                const IconComponent = m.icon;
                return (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 relative ${
                      m.unlocked
                        ? 'bg-stone-50/80 border-amber-300 shadow-2xs'
                        : 'bg-stone-50/40 border-stone-200 opacity-60'
                    }`}
                  >
                    {/* Medal Graphic */}
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${m.color} text-white flex items-center justify-center shrink-0 shadow-md`}>
                      <IconComponent className="w-5 h-5 drop-shadow" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-stone-900 truncate">
                          {isMr ? m.titleMr : m.titleEn}
                        </h4>
                        {m.unlocked ? (
                          <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                            <Unlock className="w-3 h-3 text-emerald-600" />
                            <span>{isMr ? 'अनलॉक' : 'Active'}</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-stone-400 flex items-center gap-0.5">
                            <Lock className="w-3 h-3 text-stone-400" />
                            <span>{isMr ? 'लॉक' : 'Locked'}</span>
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-stone-500 leading-snug mt-0.5">
                        {isMr ? m.descMr : m.descEn}
                      </p>

                      <div className="mt-1.5">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-700">
                          {m.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Motivational Bottom Strip */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>
              {isMr ? 'दररोज चाचणी देऊन आपली सर्व पदके अनलॉक करा!' : 'Practice daily to unlock all officer medals!'}
            </span>
            <button
              type="button"
              onClick={() => onStartExam('daily_10_challenge')}
              className="text-amber-700 hover:text-amber-800 font-extrabold flex items-center gap-1 cursor-pointer"
            >
              <span>{isMr ? 'सराव चाचणी सुरू करा ➜' : 'Start Practice ➜'}</span>
            </button>
          </div>
        </div>

        {/* Right: Digital Aspirant Officer ID Card (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 rounded-2xl border border-amber-500/40 p-5 sm:p-6 text-stone-100 flex flex-col justify-between shadow-xl relative overflow-hidden group">
          {/* Subtle Tricolor Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-white to-emerald-600 opacity-90" />

          <div className="space-y-4">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider">
                  MPSC ASPIRANT DIGITAL PASS
                </span>
              </div>
              <span className="text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">
                VERIFIED 2026
              </span>
            </div>

            {/* Candidate Photo & Info */}
            <div className="flex items-center gap-3.5 bg-stone-900/90 p-3 rounded-xl border border-stone-800">
              <div className="w-14 h-14 rounded-xl overflow-hidden border border-amber-400/50 shrink-0 bg-stone-950 flex items-center justify-center relative shadow-md">
                <img
                  src="/emblem_of_india.svg"
                  alt="Aspirant Avatar"
                  className="w-10 h-10 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-black text-white truncate">
                  {aspirantName}
                </h4>
                <p className="text-[11px] text-amber-400 font-bold truncate">
                  {isMr ? 'भावी वर्ग-१ प्रशासकीय अधिकारी' : 'Future Civil Services Officer'}
                </p>
                <p className="text-[9px] text-stone-400 font-mono mt-0.5">
                  ID: MPSC-MH-2026-{(userProgress.streakDays * 17 + 841)}
                </p>
              </div>
            </div>

            {/* Key Vitals */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-stone-900/80 border border-stone-800">
                <div className="text-[9px] text-stone-400 uppercase font-bold">
                  {isMr ? 'निकालाची अचूकता' : 'Exam Accuracy'}
                </div>
                <div className="text-base font-black text-emerald-400 font-mono mt-0.5">
                  {accuracy}%
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-stone-900/80 border border-stone-800">
                <div className="text-[9px] text-stone-400 uppercase font-bold">
                  {isMr ? 'अभ्यास सातत्य' : 'Study Streak'}
                </div>
                <div className="text-base font-black text-orange-400 font-mono mt-0.5 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-orange-400" />
                  <span>{userProgress.streakDays} {isMr ? 'दिवस' : 'Days'}</span>
                </div>
              </div>
            </div>

            {/* Sacred Inscription */}
            <div className="text-center p-2 rounded-lg bg-stone-950/60 border border-stone-800/80">
              <p className="text-[10px] text-amber-300 font-bold italic">
                "सत्यमेव जयते • सत्य, निष्ठा आणि लोकसेवा"
              </p>
            </div>
          </div>

          {/* Celebrate Button */}
          <div className="pt-3 border-t border-stone-800 mt-2">
            <button
              type="button"
              onClick={triggerCelebrate}
              className="w-full py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMr ? 'डिजिटल पास सेलिब्रेट करा 🎉' : 'Celebrate Aspirant Pass 🎉'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
