import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  Award, 
  Target, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  ChevronRight, 
  Flame, 
  Zap,
  ShieldCheck,
  PartyPopper,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProgress } from '../types';
import { calculateBadgesAndLevels } from '../utils/badgesAndLevelsEngine';
import { BadgesAndLevelsModal } from './BadgesAndLevelsModal';
import { soundFx } from '../utils/audio';

interface BadgesAndLevelsSummaryCardProps {
  userProgress: UserProgress;
  language: 'mr' | 'en';
  onStartExam?: () => void;
  className?: string;
}

export const BadgesAndLevelsSummaryCard: React.FC<BadgesAndLevelsSummaryCardProps> = ({
  userProgress,
  language,
  onStartExam,
  className = ''
}) => {
  const isMr = language === 'mr';
  const state = calculateBadgesAndLevels(userProgress);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showCelebrationBanner, setShowCelebrationBanner] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger rich confetti burst and scale animation
  const triggerCelebration = (showBanner = true) => {
    soundFx.playExamSubmissionSound();
    setIsCelebrating(true);
    if (showBanner) {
      setShowCelebrationBanner(true);
    }

    try {
      // 1. Center burst
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#f59e0b', '#fbbf24', '#10b981', '#3b82f6', '#ec4899', '#ffffff']
      });

      // 2. Dual lateral cannons
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0.05, y: 0.7 },
          colors: ['#f59e0b', '#fbbf24', '#e11d48', '#ffffff']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 0.95, y: 0.7 },
          colors: ['#10b981', '#06b6d4', '#fbbf24', '#ffffff']
        });
      }, 250);

      // 3. Golden shimmer star shower
      setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 100,
          origin: { y: 0.4 },
          shapes: ['circle'],
          colors: ['#facc15', '#f59e0b', '#ffffff']
        });
      }, 500);
    } catch (e) {
      console.warn('Confetti effect error:', e);
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsCelebrating(false);
    }, 4500);
  };

  // Automatically detect when a user unlocks a new rank level
  useEffect(() => {
    const storageKey = 'mpsc_user_recognized_rank_level';
    const savedLevelStr = localStorage.getItem(storageKey);
    const currentLevelNum = state.currentLevel.level;

    if (savedLevelStr) {
      const prevLevel = parseInt(savedLevelStr, 10);
      if (!isNaN(prevLevel) && currentLevelNum > prevLevel) {
        // User leveled up to a higher officer cadre!
        triggerCelebration(true);
        localStorage.setItem(storageKey, String(currentLevelNum));
      } else if (!isNaN(prevLevel) && currentLevelNum < prevLevel) {
        // Saved state adjusted
        localStorage.setItem(storageKey, String(currentLevelNum));
      }
    } else {
      // First visit initialization
      localStorage.setItem(storageKey, String(currentLevelNum));
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [state.currentLevel.level]);

  return (
    <>
      <div 
        id="badges-and-levels-summary-card"
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/40 border p-5 sm:p-6 text-stone-100 shadow-xl transition-all duration-500 ${
          isCelebrating 
            ? 'scale-[1.015] border-amber-400 ring-4 ring-amber-400/80 shadow-2xl shadow-amber-500/30' 
            : 'border-amber-500/30 hover:border-amber-500/50 hover:shadow-2xl'
        } ${className}`}
      >
        {/* Decorative backdrop glow */}
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isCelebrating ? 'bg-amber-400/30 scale-125' : 'bg-amber-500/10'
        }`} />
        <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Celebratory Rank Unlock Announcement Banner */}
        {showCelebrationBanner && (
          <div className="relative z-20 mb-4 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 font-black flex items-center justify-between gap-3 shadow-lg animate-in slide-in-from-top-3 duration-300">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl animate-bounce">🎊</span>
              <div>
                <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 fill-stone-950" />
                  <span>
                    {isMr ? 'अभिनंदन! नवीन प्रशासकीय स्तर प्राप्त!' : 'Congratulations! New Rank Level Conquered!'}
                  </span>
                </div>
                <div className="text-sm sm:text-base font-black">
                  {isMr 
                    ? `तुम्ही आता 'स्तर ${state.currentLevel.level}: ${state.currentLevel.nameMr}' वर पोहोचला आहात!` 
                    : `You have advanced to 'Level ${state.currentLevel.level}: ${state.currentLevel.nameEn}'!`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-stone-950 text-amber-300 hover:bg-stone-900 text-xs font-black shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                {isMr ? 'हॉल ऑफ फेम पहा' : 'View Hall'}
              </button>
              <button
                onClick={() => setShowCelebrationBanner(false)}
                className="p-1.5 rounded-lg hover:bg-stone-950/20 text-stone-950 transition-colors cursor-pointer"
                title={isMr ? "बंद करा" : "Close banner"}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Top Header Row */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3.5">
            {/* Level Icon Orb with click-to-celebrate micro-interaction */}
            <button
              type="button"
              onClick={() => triggerCelebration(true)}
              className="relative group/orb text-left cursor-pointer transition-transform hover:scale-105"
              title={isMr ? "कौतुक व सेलिब्रेशन पुन्हा पहा (Click for Confetti)" : "Click to trigger celebration animation"}
            >
              <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center text-3xl shadow-lg ring-2 ring-amber-400/30 transition-all duration-300 ${
                isCelebrating ? 'scale-110 ring-4 ring-yellow-300 animate-pulse' : ''
              }`}>
                {state.currentLevel.icon}
              </div>
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-md bg-stone-950 border border-amber-400/80 text-[10px] font-black text-amber-300 font-mono shadow-xs">
                L{state.currentLevel.level}
              </span>
            </button>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-colors ${
                  isCelebrating 
                    ? 'bg-amber-400 text-stone-950 ring-2 ring-amber-300' 
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  {isMr ? `प्रशासकीय स्तर ${state.currentLevel.level}` : `Cadre Level ${state.currentLevel.level}`}
                </span>
                <span className="text-[11px] text-stone-400 font-semibold hidden md:inline">
                  • {isMr ? state.currentLevel.taglineMr : state.currentLevel.taglineEn}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-white mt-0.5 tracking-tight flex items-center gap-2">
                <span>{isMr ? state.currentLevel.nameMr : state.currentLevel.nameEn}</span>
                {isCelebrating && (
                  <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
                )}
              </h3>

              <p className="text-xs font-semibold text-amber-200/90 mt-0.5">
                {isMr ? state.currentLevel.cadreMr : state.currentLevel.cadreEn}
              </p>
            </div>
          </div>

          {/* Quick Actions (Celebrate & View Modal) */}
          <div className="flex items-center gap-2 self-start sm:self-center flex-wrap">
            {/* Interactive Confetti Replay Button */}
            <button
              onClick={() => triggerCelebration(true)}
              className="px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs hover:scale-105"
              title={isMr ? "कौतुक व कॉन्फेटी उडवा!" : "Trigger Level Up Confetti Celebration"}
            >
              <PartyPopper className={`w-3.5 h-3.5 ${isCelebrating ? 'animate-bounce text-yellow-300' : 'text-amber-400'}`} />
              <span className="hidden xs:inline">{isMr ? 'सेलिब्रेट 🎊' : 'Celebrate 🎊'}</span>
            </button>

            {/* Quick Level Modal Trigger */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-stone-800/90 hover:bg-stone-750 text-amber-300 border border-amber-500/30 hover:border-amber-500/60 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMr ? 'सर्व स्तर व बॅजेस पहा' : 'View Levels & Badges'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center Grid: Two Core Trackers (Questions Solved & Tests Completed) */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-4">
          {/* Box 1: Questions Solved */}
          <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase tracking-wider mb-1">
                <span className="flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-blue-400" />
                  {isMr ? 'सोडवलेले प्रश्न' : 'Questions Solved'}
                </span>
                <span className="text-[10px] text-blue-400 font-mono">
                  {state.nextLevel ? `लक्ष्य: ${state.nextLevel.minQuestions}` : 'Max'}
                </span>
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {state.totalQuestionsSolved}
              </div>
            </div>

            {state.nextLevel ? (
              <div className="mt-2.5 space-y-1">
                <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, Math.round((state.totalQuestionsSolved / state.nextLevel.minQuestions) * 100))}%`
                    }}
                  />
                </div>
                <div className="text-[10px] text-stone-400 flex justify-between">
                  <span>{isMr ? 'पुढील स्तरासाठी:' : 'For Next Level:'}</span>
                  <span className="text-blue-300 font-bold">
                    {state.questionsRemainingForNextLevel > 0 
                      ? `${state.questionsRemainingForNextLevel} ${isMr ? 'बाकी' : 'left'}` 
                      : (isMr ? 'पूर्ण ✓' : 'Done ✓')}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-[10px] text-emerald-400 mt-2 font-bold">
                {isMr ? 'सर्वोच्च टप्पा संपादन!' : 'Top milestone achieved!'}
              </div>
            )}
          </div>

          {/* Box 2: Tests Completed */}
          <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase tracking-wider mb-1">
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  {isMr ? 'पूर्ण चाचण्या' : 'Mock Tests'}
                </span>
                <span className="text-[10px] text-amber-400 font-mono">
                  {state.nextLevel ? `लक्ष्य: ${state.nextLevel.minTests}` : 'Max'}
                </span>
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {state.totalTestsCompleted}
              </div>
            </div>

            {state.nextLevel ? (
              <div className="mt-2.5 space-y-1">
                <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, Math.round((state.totalTestsCompleted / Math.max(1, state.nextLevel.minTests)) * 100))}%`
                    }}
                  />
                </div>
                <div className="text-[10px] text-stone-400 flex justify-between">
                  <span>{isMr ? 'पुढील स्तरासाठी:' : 'For Next Level:'}</span>
                  <span className="text-amber-300 font-bold">
                    {state.testsRemainingForNextLevel > 0 
                      ? `${state.testsRemainingForNextLevel} ${isMr ? 'बाकी' : 'left'}` 
                      : (isMr ? 'पूर्ण ✓' : 'Done ✓')}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-[10px] text-emerald-400 mt-2 font-bold">
                {isMr ? 'सर्वोच्च चाचणी टप्पा!' : 'All test targets conquered!'}
              </div>
            )}
          </div>

          {/* Box 3: Accuracy & Streak */}
          <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase tracking-wider mb-1">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  {isMr ? 'अचूकता व सातत्य' : 'Accuracy & Streak'}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {state.averageAccuracy}%
                </span>
                <span className="text-xs text-stone-400">
                  ({state.streakDays} {isMr ? 'दिवस सलग' : 'days'})
                </span>
              </div>
            </div>

            <div className="text-[11px] text-stone-400 mt-2 flex items-center justify-between pt-1 border-t border-stone-850">
              <span>{isMr ? 'सर्वोत्तम अचूकता:' : 'Best Accuracy:'}</span>
              <span className="font-mono font-bold text-emerald-300">
                {state.highestAccuracy}%
              </span>
            </div>
          </div>

          {/* Box 4: Badges Unlocked */}
          <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase tracking-wider mb-1">
                <span className="flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                  {isMr ? 'गौरव बॅजेस' : 'Badges Earned'}
                </span>
                <span className="text-[10px] font-mono text-yellow-400">
                  {state.unlockedCount}/{state.totalBadgeCount}
                </span>
              </div>
              <div className="text-2xl font-black text-yellow-300 font-mono">
                {state.unlockedCount} <span className="text-sm font-normal text-stone-400">/ {state.totalBadgeCount}</span>
              </div>
            </div>

            <div className="text-[11px] text-amber-300 font-semibold cursor-pointer hover:underline flex items-center gap-1 mt-2" onClick={() => setIsModalOpen(true)}>
              <span>{isMr ? 'बॅजेस दालन उघडा →' : 'Explore Badges →'}</span>
            </div>
          </div>
        </div>

        {/* Level Progression Bar & Next Cadre Forecast */}
        {state.nextLevel && (
          <div className="relative z-10 p-3.5 rounded-xl bg-stone-950/50 border border-stone-800 mb-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {isMr 
                    ? `पुढील संवर्ग: स्तर ${state.nextLevel.level} - ${state.nextLevel.nameMr} (${state.nextLevel.cadreMr})`
                    : `Next Cadre: Level ${state.nextLevel.level} - ${state.nextLevel.nameEn} (${state.nextLevel.cadreEn})`}
                </span>
              </span>
              <span className="font-mono font-black text-amber-400">
                {state.levelProgressPercent}%
              </span>
            </div>

            <div className="w-full h-2.5 bg-stone-800 rounded-full overflow-hidden p-0.5 border border-stone-700/60">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${state.levelProgressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-400 pt-0.5">
              <span>
                {isMr 
                  ? `स्तर ${state.nextLevel.level} अनलॉक करण्यासाठी आणखी ${state.questionsRemainingForNextLevel} प्रश्न आणि ${state.testsRemainingForNextLevel} चाचण्या सोडवा.` 
                  : `Solve ${state.questionsRemainingForNextLevel} more questions and ${state.testsRemainingForNextLevel} more mock tests to advance.`}
              </span>

              {onStartExam && (
                <button
                  onClick={onStartExam}
                  className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 hover:underline cursor-pointer ml-2"
                >
                  <Zap className="w-3 h-3 fill-amber-300" />
                  <span>{isMr ? 'चाचणी सुरू करा' : 'Start Mock'}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Bottom Strip: Recent Unlocked Badges Reel */}
        <div className="relative z-10 pt-3 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-stone-400">
              {isMr ? 'अलीकडे संपादन केलेले बॅजेस:' : 'Recent Unlocked Badges:'}
            </span>

            {state.unlockedBadges.length > 0 ? (
              <div className="flex items-center gap-2 flex-wrap">
                {state.recentUnlockedBadges.map((badge) => (
                  <button
                    key={badge.id}
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-800/90 hover:bg-stone-750 border border-stone-700 text-xs font-bold text-stone-200 transition-all cursor-pointer hover:border-amber-400/50 shadow-xs"
                    title={`${isMr ? badge.nameMr : badge.nameEn}: ${isMr ? badge.descriptionMr : badge.descriptionEn}`}
                  >
                    <span>{badge.icon}</span>
                    <span>{isMr ? badge.nameMr : badge.nameEn}</span>
                  </button>
                ))}
              </div>
            ) : (
              <span className="text-xs text-amber-300/80 italic">
                {isMr ? 'पहिला सराव सुरू करा व "प्रथम पाऊल" बॅज अनलॉक करा!' : 'Complete your first practice to earn your Debut badge!'}
              </span>
            )}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="text-xs text-amber-400 hover:text-amber-300 font-extrabold flex items-center gap-1 cursor-pointer hover:underline self-end sm:self-center"
          >
            <span>{isMr ? 'सर्व १८ बॅजेसचे दालन पहा →' : 'View All 18 Badges →'}</span>
          </button>
        </div>
      </div>

      {/* Modal Dialog */}
      <BadgesAndLevelsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        state={state}
        language={language}
        onStartExam={onStartExam}
      />
    </>
  );
};
