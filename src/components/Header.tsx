import React from 'react';
import { 
  Flame, 
  Languages, 
  BarChart3, 
  BookOpen, 
  Bookmark, 
  Award, 
  Sparkles,
  Target,
  Cloud,
  Settings,
  Volume2,
  VolumeX
} from 'lucide-react';
import { UserProgress } from '../types';
import { soundFx } from '../utils/audio';

interface HeaderProps {
  currentTab: 'dashboard' | 'subjects' | 'analytics' | 'bookmarks' | 'mentor';
  onSelectTab: (tab: 'dashboard' | 'subjects' | 'analytics' | 'bookmarks' | 'mentor') => void;
  language: 'mr' | 'en';
  onToggleLanguage: () => void;
  userProgress: UserProgress;
  onOpenQuickMentor?: () => void;
  onOpenCloudSync?: () => void;
  onOpenSettings?: () => void;
  onToggleSoundEffects?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  language,
  onToggleLanguage,
  userProgress,
  onOpenQuickMentor,
  onOpenCloudSync,
  onOpenSettings,
  onToggleSoundEffects,
}) => {
  const isMr = language === 'mr';
  const soundEnabled = userProgress.soundEffectsEnabled ?? true;
  const [soundFeedback, setSoundFeedback] = React.useState<string | null>(null);

  const handleSoundToggle = () => {
    const nextState = !soundEnabled;
    if (onToggleSoundEffects) {
      onToggleSoundEffects();
    }
    soundFx.playToggleSound(nextState);
    setSoundFeedback(
      nextState
        ? (isMr ? 'ध्वनी सुरू' : 'Sound ON')
        : (isMr ? 'ध्वनी बंद' : 'Sound Muted')
    );
    setTimeout(() => {
      setSoundFeedback(null);
    }, 2200);
  };
  const targetPercent = Math.min(
    100,
    Math.round((userProgress.todayQuestionsCount / userProgress.dailyTargetQuestions) * 100)
  );

  return (
    <>
      {/* Portal Switcher Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-amber-50 px-4 py-2 text-xs md:text-sm font-medium border-b border-amber-600/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-amber-950/70 text-amber-300 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border border-amber-500/40">
              MPSC सारथी
            </span>
            <span className="hidden sm:inline">
              {isMr 
                ? '📚 जुना संपूर्ण अभ्यासक्रम, सर्व विषयांच्या नोट्स व PYQ पेपर्स हवे आहेत?' 
                : 'Looking for full syllabus, Marathi subject notes & previous question papers?'}
            </span>
            <span className="sm:hidden">
              {isMr ? '📚 जुने नोट्स व पेपर्स पोर्टल' : '📚 Classic Notes Portal'}
            </span>
          </div>
          <a
            id="banner-classic-portal-link"
            href="https://mpscsarathi.online"
            className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-amber-300 px-3 py-1 rounded-md text-xs font-bold transition-all shadow-sm shrink-0 border border-amber-400/40"
          >
            <span>{isMr ? 'क्लासिक पोर्टल उघडा ➜' : 'Open Classic Portal ➜'}</span>
          </a>
        </div>
      </div>

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

            {/* Firebase Cloud Sync Button */}
            {onOpenCloudSync && (
              <button
                id="btn-cloud-sync"
                onClick={onOpenCloudSync}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                title={isMr ? "फायरबेस क्लाउड बॅकअप स्थिती" : "Firebase Cloud Sync Status"}
              >
                <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden lg:inline">{isMr ? 'क्लाउड सिंक' : 'Cloud Sync'}</span>
              </button>
            )}

            {/* Sound Effects Toggle Button with Visual Feedback */}
            <div className="relative">
              <button
                id="btn-header-sound-toggle"
                onClick={handleSoundToggle}
                className={`p-2 rounded-lg border text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  soundEnabled
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 hover:bg-amber-500/25'
                    : 'bg-stone-800 border-stone-700 text-stone-400 hover:bg-stone-700'
                }`}
                title={
                  soundEnabled
                    ? (isMr ? 'चाचणी ध्वनी प्रभाव: सुरू (म्यूट करण्यासाठी क्लिक करा)' : 'Exam Sound Effects: Enabled (click to mute)')
                    : (isMr ? 'चाचणी ध्वनी प्रभाव: बंद (सुरू करण्यासाठी क्लिक करा)' : 'Exam Sound Effects: Disabled (click to enable)')
                }
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-amber-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-stone-400" />
                )}
              </button>

              {soundFeedback && (
                <div className="absolute right-0 -bottom-8 whitespace-nowrap bg-stone-900 border border-amber-500/60 text-amber-300 px-2 py-0.5 rounded-md text-[10px] font-bold shadow-xl animate-in fade-in zoom-in-95 duration-150 pointer-events-none z-50">
                  {soundFeedback}
                </div>
              )}
            </div>

            {/* Application Settings Modal Trigger */}
            {onOpenSettings && (
              <button
                id="btn-open-settings"
                onClick={onOpenSettings}
                className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 rounded-lg transition-colors cursor-pointer"
                title={isMr ? "अॅप सेटिंग्ज व ध्वनी व्यवस्थापन" : "App Settings & Sound Management"}
              >
                <Settings className="w-4 h-4 text-stone-300" />
              </button>
            )}

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
    </>
  );
};
