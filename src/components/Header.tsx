import React from 'react';
import { 
  Flame, 
  Languages, 
  BarChart3, 
  BookOpen, 
  Bookmark, 
  Award, 
  Sparkles,
  Target
} from 'lucide-react';
import { UserProgress } from '../types';

interface HeaderProps {
  currentTab: 'dashboard' | 'subjects' | 'analytics' | 'bookmarks' | 'mentor';
  onSelectTab: (tab: 'dashboard' | 'subjects' | 'analytics' | 'bookmarks' | 'mentor') => void;
  language: 'mr' | 'en';
  onToggleLanguage: () => void;
  userProgress: UserProgress;
  onOpenQuickMentor?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  language,
  onToggleLanguage,
  userProgress,
  onOpenQuickMentor,
}) => {
  const isMr = language === 'mr';
  const targetPercent = Math.min(
    100,
    Math.round((userProgress.todayQuestionsCount / userProgress.dailyTargetQuestions) * 100)
  );

  return (
    <header className="sticky top-0 z-40 bg-stone-900 border-b border-stone-800 text-stone-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            id="brand-logo"
            onClick={() => onSelectTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-black shadow-inner shadow-amber-300/40">
              <span className="text-xl tracking-tighter">M</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-stone-100 group-hover:text-amber-400 transition-colors">
                  MPSCAspirant
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {isMr ? 'राज्यसेवा / संयुक्त' : 'Prelims 2025-26'}
                </span>
              </div>
              <p className="text-xs text-stone-400 font-medium">
                {isMr ? 'सराव परीक्षा व प्रगती ट्रॅकर' : 'Exam Practice & Progress'}
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-dashboard"
              onClick={() => onSelectTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                currentTab === 'dashboard'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{isMr ? 'डॅशबोर्ड' : 'Dashboard'}</span>
            </button>

            <button
              id="nav-subjects"
              onClick={() => onSelectTab('subjects')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                currentTab === 'subjects'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{isMr ? 'विषयवार सराव' : 'Subjects'}</span>
            </button>

            <button
              id="nav-analytics"
              onClick={() => onSelectTab('analytics')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                currentTab === 'analytics'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>{isMr ? 'प्रगती व विश्लेषण' : 'Analytics'}</span>
            </button>

            <button
              id="nav-bookmarks"
              onClick={() => onSelectTab('bookmarks')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                currentTab === 'bookmarks'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{isMr ? 'जतन केलेले प्रश्न' : 'Saved Questions'}</span>
              {userProgress.bookmarkedQuestionIds.length > 0 && (
                <span className="text-xs px-1.5 py-0.2 rounded-full bg-stone-700 text-amber-300 font-mono">
                  {userProgress.bookmarkedQuestionIds.length}
                </span>
              )}
            </button>

            <button
              id="nav-mentor"
              onClick={() => onSelectTab('mentor')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                currentTab === 'mentor'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-amber-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isMr ? 'मार्गदर्शक AI' : 'AI Mentor'}</span>
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {/* Daily Streak Badge */}
            <div 
              title={`${userProgress.streakDays} Day Preparation Streak`}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-stone-800 border border-stone-700/80 rounded-full text-xs font-semibold text-amber-400"
            >
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span>{userProgress.streakDays} {isMr ? 'दिवस सातत्य' : 'Days'}</span>
            </div>

            {/* Daily Target Indicator */}
            <div 
              title={`Today: ${userProgress.todayQuestionsCount}/${userProgress.dailyTargetQuestions} questions solved`}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-stone-800 border border-stone-700/80 rounded-full text-xs text-stone-300"
            >
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span>{userProgress.todayQuestionsCount}/{userProgress.dailyTargetQuestions} Qs</span>
              <div className="w-12 h-1.5 bg-stone-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${targetPercent}%` }}
                />
              </div>
            </div>

            {/* Language Toggle Button */}
            <button
              id="btn-toggle-lang"
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              title="Switch language between Marathi and English"
            >
              <Languages className="w-4 h-4 text-amber-400" />
              <span>{isMr ? 'English' : 'मराठी'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Submenu Bar */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-stone-800 bg-stone-900/90 text-xs">
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`px-2 py-1 rounded font-medium ${
            currentTab === 'dashboard' ? 'text-amber-400 font-bold' : 'text-stone-400'
          }`}
        >
          {isMr ? 'डॅशबोर्ड' : 'Home'}
        </button>
        <button
          onClick={() => onSelectTab('subjects')}
          className={`px-2 py-1 rounded font-medium ${
            currentTab === 'subjects' ? 'text-amber-400 font-bold' : 'text-stone-400'
          }`}
        >
          {isMr ? 'विषय' : 'Subjects'}
        </button>
        <button
          onClick={() => onSelectTab('analytics')}
          className={`px-2 py-1 rounded font-medium ${
            currentTab === 'analytics' ? 'text-amber-400 font-bold' : 'text-stone-400'
          }`}
        >
          {isMr ? 'विश्लेषण' : 'Stats'}
        </button>
        <button
          onClick={() => onSelectTab('bookmarks')}
          className={`px-2 py-1 rounded font-medium ${
            currentTab === 'bookmarks' ? 'text-amber-400 font-bold' : 'text-stone-400'
          }`}
        >
          {isMr ? 'जतन' : 'Saved'}
        </button>
        <button
          onClick={() => onSelectTab('mentor')}
          className={`px-2 py-1 rounded font-medium ${
            currentTab === 'mentor' ? 'text-amber-400 font-bold' : 'text-stone-400'
          }`}
        >
          {isMr ? 'मार्गदर्शक' : 'Mentor'}
        </button>
      </div>
    </header>
  );
};
