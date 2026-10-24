import React, { useState } from 'react';
import { 
  X, 
  Award, 
  Trophy, 
  ShieldCheck, 
  Flame, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Target, 
  BookOpen, 
  ArrowRight, 
  Share2, 
  Check, 
  ChevronRight,
  TrendingUp,
  Zap,
  Info
} from 'lucide-react';
import { Badge, BadgeCategory, LevelDefinition, UserBadgesAndLevelsState } from '../utils/badgesAndLevelsEngine';
import { soundFx } from '../utils/audio';

interface BadgesAndLevelsModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: UserBadgesAndLevelsState;
  language: 'mr' | 'en';
  onStartExam?: () => void;
}

export const BadgesAndLevelsModal: React.FC<BadgesAndLevelsModalProps> = ({
  isOpen,
  onClose,
  state,
  language,
  onStartExam
}) => {
  const isMr = language === 'mr';
  const [activeTab, setActiveTab] = useState<'levels' | 'badges' | 'share'>('levels');
  const [badgeCategoryFilter, setBadgeCategoryFilter] = useState<'all' | BadgeCategory>('all');
  const [copiedShare, setCopiedShare] = useState(false);

  if (!isOpen) return null;

  const filteredBadges = state.allBadges.filter(b => {
    if (badgeCategoryFilter === 'all') return true;
    return b.category === badgeCategoryFilter;
  });

  const handleCopyShareText = () => {
    soundFx.playExamSubmissionSound();
    const shareText = isMr
      ? `🏆 माझे MPSC अभ्यास यश व प्रगती स्तर:\n🎖️ वर्तमान स्तर: ${state.currentLevel.nameMr} (स्तर ${state.currentLevel.level})\n🔰 संवर्ग दर्जा: ${state.currentLevel.cadreMr}\n📊 एकूण सोडवलेले प्रश्न: ${state.totalQuestionsSolved}\n📝 पूर्ण केलेल्या मॉक चाचण्या: ${state.totalTestsCompleted}\n🎯 सरासरी अचूकता: ${state.averageAccuracy}%\n🏅 अनलॉक केलेले बॅजेस: ${state.unlockedCount} / ${state.totalBadgeCount}\n\nतुम्हीही MPSC ची परिपूर्ण तयारी करा MPSC Aspirant Portal वर!`
      : `🏆 My MPSC Aspirant Prep Journey:\n🎖️ Current Level: Level ${state.currentLevel.level} - ${state.currentLevel.nameEn}\n🔰 Cadre Rank: ${state.currentLevel.cadreEn}\n📊 Total Questions Solved: ${state.totalQuestionsSolved}\n📝 Mock Tests Completed: ${state.totalTestsCompleted}\n🎯 Average Accuracy: ${state.averageAccuracy}%\n🏅 Badges Unlocked: ${state.unlockedCount} / ${state.totalBadgeCount}\n\nLevel up your preparation on MPSC Aspirant Portal!`;

    navigator.clipboard.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-stone-900 border border-amber-500/30 shadow-2xl overflow-hidden text-stone-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Strip */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/60 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 shadow-md ring-2 ring-amber-400/30">
              <Trophy className="w-6 h-6 fill-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {isMr ? 'एमपीएससी प्रगती स्तर आणि गौरव बॅजेस' : 'MPSC Cadre Levels & Badges Hall'}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {isMr ? `स्तर ${state.currentLevel.level}` : `Level ${state.currentLevel.level}`}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                {isMr 
                  ? 'तुमच्या सोडवलेल्या प्रश्नांवर आणि पूर्ण चाचण्यांवर आधारित प्रशासकीय स्तर व गौरव सन्मान' 
                  : 'Track your officer cadre progression based on questions solved and tests completed'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Level Quick Ribbon */}
        <div className="px-4 py-3 bg-stone-950/70 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl">{state.currentLevel.icon}</span>
            <div>
              <span className="font-extrabold text-amber-300 text-sm">
                {isMr ? state.currentLevel.nameMr : state.currentLevel.nameEn}
              </span>
              <span className="text-stone-400 ml-1.5 hidden sm:inline">
                • {isMr ? state.currentLevel.cadreMr : state.currentLevel.cadreEn}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-stone-300">
            <span className="flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-blue-400" />
              <strong className="text-white font-mono">{state.totalQuestionsSolved}</strong> {isMr ? 'प्रश्न' : 'Qs'}
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <strong className="text-white font-mono">{state.totalTestsCompleted}</strong> {isMr ? 'चाचण्या' : 'Tests'}
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              <strong className="text-white font-mono">{state.unlockedCount} / {state.totalBadgeCount}</strong> {isMr ? 'बॅजेस' : 'Badges'}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-800 bg-stone-900/90 px-4 pt-2 gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('levels')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'levels'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>{isMr ? '८ प्रशासकीय स्तर (Levels)' : '8 Cadre Levels'}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-stone-800 text-stone-300">
              {state.currentLevel.level}/8
            </span>
          </button>

          <button
            onClick={() => setActiveTab('badges')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'badges'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>{isMr ? 'गौरव बॅजेस (All Badges)' : 'Badges Hall'}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-300">
              {state.unlockedCount}/{state.totalBadgeCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('share')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ml-auto ${
              activeTab === 'share'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{isMr ? 'प्रगती शेअर करा' : 'Share Achievement'}</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* TAB 1: 8 CADRE LEVELS LADDER */}
          {activeTab === 'levels' && (
            <div className="space-y-4">
              {/* Progress to next level banner */}
              {state.nextLevel ? (
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-stone-900 border border-amber-500/30 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                      {isMr 
                        ? `पुढील ध्येय: स्तर ${state.nextLevel.level} - ${state.nextLevel.nameMr}` 
                        : `Next Target: Level ${state.nextLevel.level} - ${state.nextLevel.nameEn}`}
                    </span>
                    <span className="font-mono font-extrabold text-amber-400">
                      {state.levelProgressPercent}% {isMr ? 'पूर्ण' : 'Progress'}
                    </span>
                  </div>

                  {/* Level Progress Bar */}
                  <div className="w-full h-3 bg-stone-800 rounded-full overflow-hidden p-0.5 border border-stone-700/60">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-700 shadow-sm"
                      style={{ width: `${state.levelProgressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-400 pt-0.5">
                    <span>
                      {isMr 
                        ? `आणखी आवश्यक: ${state.questionsRemainingForNextLevel} प्रश्न आणि ${state.testsRemainingForNextLevel} चाचण्या` 
                        : `Remaining: ${state.questionsRemainingForNextLevel} Qs and ${state.testsRemainingForNextLevel} mock tests`}
                    </span>
                    {onStartExam && (
                      <button
                        onClick={() => {
                          onClose();
                          onStartExam();
                        }}
                        className="text-amber-300 hover:text-amber-200 font-extrabold flex items-center gap-1 underline cursor-pointer"
                      >
                        <span>{isMr ? 'सराव सुरू करा →' : 'Start Mock Now →'}</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-950/50 via-amber-950/40 to-stone-900 border border-yellow-500/50 text-center space-y-1">
                  <span className="text-3xl">👑</span>
                  <h4 className="text-base font-extrabold text-yellow-300">
                    {isMr ? 'अभिनंदन! तुम्ही सर्वोच्च स्तर (स्तर ८) संपादन केला आहे!' : 'Outstanding! You have conquered the Highest Rank (Level 8)!'}
                  </h4>
                  <p className="text-xs text-stone-300">
                    {isMr ? 'तुमचा सराव महाराष्ट्र लोकसेवा आयोगाच्या राज्य गुणवत्ता यादीतील अव्वल क्रमांकाच्या तोडीचा आहे.' : 'You stand at the pinnacle of MPSC Aspirant preparation.'}
                  </p>
                </div>
              )}

              {/* Levels Vertical Timeline / Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {state.allLevels.map((lvl) => {
                  const isCurrent = lvl.level === state.currentLevel.level;
                  const isUnlocked = lvl.level <= state.currentLevel.level;

                  return (
                    <div
                      key={lvl.level}
                      className={`relative p-4 rounded-xl border transition-all ${
                        isCurrent 
                          ? 'bg-gradient-to-br from-amber-950/60 to-stone-900 border-amber-400/80 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/50' 
                          : isUnlocked 
                          ? 'bg-stone-900/90 border-emerald-500/30' 
                          : 'bg-stone-950/50 border-stone-800/80 opacity-60'
                      }`}
                    >
                      {/* Current level badge pill */}
                      {isCurrent && (
                        <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow-md flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 fill-stone-950 text-amber-400" />
                          <span>{isMr ? 'सध्याचा स्तर' : 'Current Level'}</span>
                        </span>
                      )}

                      <div className="flex items-start gap-3.5">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner border ${
                          isCurrent 
                            ? 'bg-amber-500/20 border-amber-400/50' 
                            : isUnlocked 
                            ? 'bg-emerald-500/15 border-emerald-500/30' 
                            : 'bg-stone-800/50 border-stone-700/50 text-stone-500'
                        }`}>
                          {lvl.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono font-bold text-amber-400">
                              {isMr ? `स्तर ${lvl.level}` : `Level ${lvl.level}`}
                            </span>
                            {isUnlocked ? (
                              <span className="inline-flex items-center text-[10px] text-emerald-400 font-bold gap-0.5">
                                <CheckCircle2 className="w-3 h-3" />
                                {isMr ? 'प्राप्त' : 'Unlocked'}
                              </span>
                            ) : (
                              <span className="inline-flex items-center text-[10px] text-stone-400 gap-0.5">
                                <Lock className="w-3 h-3" />
                                {isMr ? 'अनलॉक बाकी' : 'Locked'}
                              </span>
                            )}
                          </div>

                          <h3 className="text-sm font-extrabold text-white truncate mt-0.5">
                            {isMr ? lvl.nameMr : lvl.nameEn}
                          </h3>

                          <p className="text-xs font-medium text-amber-200/90 mt-0.5">
                            {isMr ? lvl.cadreMr : lvl.cadreEn}
                          </p>

                          <p className="text-[11px] text-stone-400 mt-1 italic">
                            "{isMr ? lvl.taglineMr : lvl.taglineEn}"
                          </p>

                          {/* Criteria Pill */}
                          <div className="mt-2.5 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                            <span className="text-stone-400">
                              {isMr ? 'निकष:' : 'Required:'}
                            </span>
                            <span className="font-mono font-bold text-stone-200">
                              {lvl.minQuestions} {isMr ? 'प्रश्न' : 'Qs'} • {lvl.minTests} {isMr ? 'चाचण्या' : 'Tests'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: ALL BADGES WITH CATEGORY FILTER */}
          {activeTab === 'badges' && (
            <div className="space-y-4">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-stone-400 font-bold mr-1">
                  {isMr ? 'श्रेणी निवडा:' : 'Filter:'}
                </span>

                <button
                  onClick={() => setBadgeCategoryFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    badgeCategoryFilter === 'all'
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {isMr ? 'सर्व बॅजेस' : 'All Badges'} ({state.allBadges.length})
                </button>

                <button
                  onClick={() => setBadgeCategoryFilter('questions')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    badgeCategoryFilter === 'questions'
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  🎯 {isMr ? 'प्रश्न संख्या' : 'Questions'}
                </button>

                <button
                  onClick={() => setBadgeCategoryFilter('tests')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    badgeCategoryFilter === 'tests'
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  📝 {isMr ? 'मॉक चाचण्या' : 'Mock Tests'}
                </button>

                <button
                  onClick={() => setBadgeCategoryFilter('accuracy')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    badgeCategoryFilter === 'accuracy'
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  🌟 {isMr ? 'अचूकता' : 'Accuracy'}
                </button>

                <button
                  onClick={() => setBadgeCategoryFilter('consistency')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    badgeCategoryFilter === 'consistency'
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  🔥 {isMr ? 'सातत्य व बुकमार्क' : 'Streak & Focus'}
                </button>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredBadges.map((badge) => {
                  return (
                    <div
                      key={badge.id}
                      className={`relative p-4 rounded-xl border transition-all flex flex-col justify-between ${
                        badge.isUnlocked
                          ? `${badge.badgeBg} ${badge.badgeBorder} shadow-md`
                          : 'bg-stone-950/40 border-stone-800 opacity-60'
                      }`}
                    >
                      {/* Top Row: Icon & Status */}
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl border ${
                            badge.isUnlocked
                              ? `${badge.badgeBorder} bg-stone-900/60 shadow-sm`
                              : 'border-stone-800 bg-stone-900/30 grayscale'
                          }`}>
                            {badge.icon}
                          </div>

                          {badge.isUnlocked ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{isMr ? 'अनलॉक' : 'Earned'}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-400 bg-stone-800 px-2 py-0.5 rounded-full border border-stone-700">
                              <Lock className="w-3 h-3" />
                              <span>{badge.progressPercent}%</span>
                            </span>
                          )}
                        </div>

                        <h4 className={`text-sm font-black ${badge.isUnlocked ? 'text-white' : 'text-stone-300'}`}>
                          {isMr ? badge.nameMr : badge.nameEn}
                        </h4>

                        <p className="text-xs text-stone-400 mt-1 leading-snug">
                          {isMr ? badge.descriptionMr : badge.descriptionEn}
                        </p>
                      </div>

                      {/* Progress / Status Bottom Section */}
                      <div className="mt-3 pt-2.5 border-t border-stone-800/80">
                        {badge.isUnlocked ? (
                          <div className="flex items-center justify-between text-[11px] text-stone-400">
                            <span className="text-emerald-400 font-bold">
                              {isMr ? 'यशस्वी संपादन!' : 'Achievement Unlocked!'}
                            </span>
                            <span className="font-mono text-stone-400">
                              {badge.currentValue} / {badge.targetValue}
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[11px] text-stone-400">
                              <span>{isMr ? 'प्रगती:' : 'Progress:'}</span>
                              <span className="font-mono font-bold text-amber-300">
                                {badge.currentValue} / {badge.targetValue}
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                                style={{ width: `${badge.progressPercent}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SHARE AND CELEBRATE */}
          {activeTab === 'share' && (
            <div className="max-w-xl mx-auto space-y-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/80 border border-amber-500/40 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{state.currentLevel.icon}</span>
                    <div>
                      <h4 className="text-sm font-black text-amber-300">
                        {isMr ? state.currentLevel.nameMr : state.currentLevel.nameEn}
                      </h4>
                      <p className="text-xs text-stone-400">
                        {isMr ? state.currentLevel.cadreMr : state.currentLevel.cadreEn}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {isMr ? `स्तर ${state.currentLevel.level}` : `Level ${state.currentLevel.level}`}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800">
                    <div className="text-[11px] text-stone-400 uppercase font-bold">
                      {isMr ? 'सोडवलेले प्रश्न' : 'Questions Solved'}
                    </div>
                    <div className="text-xl font-black text-white font-mono mt-0.5">
                      {state.totalQuestionsSolved}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800">
                    <div className="text-[11px] text-stone-400 uppercase font-bold">
                      {isMr ? 'पूर्ण चाचण्या' : 'Mock Tests'}
                    </div>
                    <div className="text-xl font-black text-white font-mono mt-0.5">
                      {state.totalTestsCompleted}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800">
                    <div className="text-[11px] text-stone-400 uppercase font-bold">
                      {isMr ? 'सरासरी अचूकता' : 'Avg Accuracy'}
                    </div>
                    <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">
                      {state.averageAccuracy}%
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800">
                    <div className="text-[11px] text-stone-400 uppercase font-bold">
                      {isMr ? 'गौरव बॅजेस' : 'Badges Earned'}
                    </div>
                    <div className="text-xl font-black text-amber-400 font-mono mt-0.5">
                      {state.unlockedCount} / {state.totalBadgeCount}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-300 text-center italic">
                  "{isMr ? 'सातत्य, शिस्त आणि कठोर सराव हेच MPSC यशाचे खरे गमक आहे!' : 'Consistency, discipline, and persistent practice define civil service success!'}"
                </p>
              </div>

              <div className="flex items-center gap-3 justify-center pt-2">
                <button
                  onClick={handleCopyShareText}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-[1.02]"
                >
                  {copiedShare ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{isMr ? 'यश संदेश कॉपी झाला!' : 'Copied to Clipboard!'}</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 fill-stone-950" />
                      <span>{isMr ? 'यशस्वी प्रगती कॉपी करा (Share)' : 'Copy Achievement Summary'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
          <span className="text-xs text-stone-400 hidden sm:inline">
            {isMr ? '🎯 दररोज नवीन चाचण्या सोडवून आपला स्तर उंचावत राहा!' : '🎯 Keep attempting tests to rise through officer ranks!'}
          </span>

          <div className="flex items-center gap-2 ml-auto">
            {onStartExam && (
              <button
                onClick={() => {
                  onClose();
                  onStartExam();
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-stone-950" />
                <span>{isMr ? 'नवीन चाचणी सोडवा' : 'Take Practice Test'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs transition-colors cursor-pointer"
            >
              {isMr ? 'बंद करा' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
