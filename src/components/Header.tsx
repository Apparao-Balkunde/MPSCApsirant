import React, { useState, useEffect } from 'react';
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
  VolumeX, 
  FileText, 
  PlusCircle,
  User as UserIcon, 
  LogIn,
  Bell,
  PenSquare,
  ArrowLeft
} from 'lucide-react';
import { UserProgress } from '../types';
import { soundFx } from '../utils/audio';
import { type User } from 'firebase/auth';

export type NavigationTab = 'dashboard' | 'subjects' | 'grammar' | 'analytics' | 'bookmarks' | 'mentor';

export interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  language: 'mr' | 'en';
  onToggleLanguage: () => void;
  userProgress: UserProgress;
  currentUser?: User | null;
  onOpenLogin?: () => void;
  onOpenQuickMentor?: () => void;
  onOpenCloudSync?: () => void;
  onOpenAddQuestion?: () => void;
  onOpenSettings?: () => void;
  onToggleSoundEffects?: () => void;
  onOpenHardQuestionsHub?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  language,
  onToggleLanguage,
  userProgress,
  currentUser,
  onOpenLogin,
  onOpenQuickMentor,
  onOpenCloudSync,
  onOpenAddQuestion,
  onOpenSettings,
  onToggleSoundEffects,
  onOpenHardQuestionsHub,
}) => {
  const isMr = language === 'mr';
  const soundEnabled = userProgress.soundEffectsEnabled ?? true;
  const [soundFeedback, setSoundFeedback] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [daysLeft, setDaysLeft] = useState<number>(0);

  // Live Exam Countdown (राज्यसेवा पूर्व परीक्षा)
  useEffect(() => {
    const targetDate = new Date('2026-05-31T00:00:00').getTime();
    const today = new Date().getTime();
    const diff = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    setDaysLeft(diff > 0 ? diff : 0);
  }, []);

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
      {/* Portal Top Bar / Announcement Banner */}
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
              {isMr ? '📚 मुख्य पोर्टल' : '📚 Main Portal'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Live Exam Countdown Badge */}
            <div className="hidden lg:flex items-center gap-1.5 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded text-xs font-bold text-amber-200">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMr ? `राज्यसेवा पूर्व: ${daysLeft} दिवस बाकी` : `Prelims: ${daysLeft} Days Left`}</span>
            </div>

            <a
              id="banner-classic-portal-link"
              href="https://mpscsarathi.online"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-amber-300 px-3 py-1 rounded-md text-xs font-bold transition-all shadow-sm shrink-0 border border-amber-400/40"
            >
              <span>{isMr ? 'मुख्य पोर्टल उघडा ➜' : 'Open Portal ➜'}</span>
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-stone-900 border-b border-stone-800 text-stone-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Brand & Logo */}
            <div 
              id="brand-logo"
              onClick={() => onSelectTab('dashboard')} 
              className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
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
                <p className="text-xs text-stone-400 font-medium hidden sm:block">
                  {isMr ? 'सराव परीक्षा व प्रगती ट्रॅकर' : 'Exam Practice & Progress'}
                </p>
              </div>
            </div>

            {/* Middle: Desktop Nav Items */}
            <nav className="hidden xl:flex items-center gap-1">
              <button
                id="nav-dashboard"
                onClick={() => onSelectTab('dashboard')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
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
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  currentTab === 'subjects'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{isMr ? 'विषयवार सराव' : 'Subjects'}</span>
              </button>

              <button
                id="nav-grammar"
                onClick={() => onSelectTab('grammar')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  currentTab === 'grammar'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>{isMr ? 'व्याकरण नियम' : 'Grammar'}</span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-amber-400 text-stone-950 font-bold uppercase">
                  {isMr ? 'नवीन' : 'New'}
                </span>
              </button>

              <button
                id="nav-analytics"
                onClick={() => onSelectTab('analytics')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  currentTab === 'analytics'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>{isMr ? 'प्रगती व आलेख' : 'Analytics'}</span>
              </button>

              <button
                id="nav-bookmarks"
                onClick={() => onSelectTab('bookmarks')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  currentTab === 'bookmarks'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isMr ? 'जतन' : 'Saved'}</span>
                {userProgress.bookmarkedQuestionIds.length > 0 && (
                  <span className="text-xs px-1.5 py-0.2 rounded-full bg-stone-700 text-amber-300 font-mono">
                    {userProgress.bookmarkedQuestionIds.length}
                  </span>
                )}
              </button>

              <button
                id="nav-mentor"
                onClick={() => onSelectTab('mentor')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  currentTab === 'mentor'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-amber-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{isMr ? 'मार्गदर्शक AI' : 'AI Mentor'}</span>
              </button>

              {onOpenHardQuestionsHub && (
                <button
                  id="nav-hard-100k"
                  onClick={onOpenHardQuestionsHub}
                  className="px-2.5 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-1.5 text-amber-300 hover:text-white hover:bg-amber-500/20 border border-amber-500/30 cursor-pointer shadow-xs"
                  title={isMr ? "१,००,०००+ कठीण प्रश्न सराव केंद्र उघडा" : "Open 100,000+ Hard Questions Engine"}
                >
                  <Flame className="w-4 h-4 text-amber-400 fill-amber-400/40 animate-pulse" />
                  <span>{isMr ? '१ लाख प्रश्न' : '100k Qs'}</span>
                </button>
              )}
            </nav>

            {/* Right: Action Controls & Indicators */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Daily Streak Badge */}
              <div 
                title={`${userProgress.streakDays} Day Preparation Streak`}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-stone-800 border border-stone-700/80 rounded-full text-xs font-semibold text-amber-400"
              >
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span>{userProgress.streakDays} {isMr ? 'दिवस' : 'Days'}</span>
              </div>

              {/* Daily Target Indicator */}
              <div 
                title={`Today: ${userProgress.todayQuestionsCount}/${userProgress.dailyTargetQuestions} questions solved`}
                className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-stone-800 border border-stone-700/80 rounded-full text-xs text-stone-300"
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

              {/* Notification Bell with Popup */}
              <div className="relative">
                <button
                  type="button"
                  id="btn-header-notifications"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 rounded-lg transition-colors cursor-pointer relative"
                  title={isMr ? "नवीन अपडेट्स व सूचना" : "Notifications"}
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 top-12 w-72 bg-stone-900 border border-stone-700 text-stone-100 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="font-extrabold text-sm border-b border-stone-800 pb-2 mb-3 flex items-center justify-between">
                      <span>🔔 {isMr ? 'नवीन अपडेट्स' : 'Notifications'}</span>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-stone-400 hover:text-white text-xs cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                        <div className="font-bold text-amber-400 mb-0.5">
                          {isMr ? 'चालू घडामोडी २०२६/२७ अद्ययावत 📰' : 'Current Affairs 2026/27 📰'}
                        </div>
                        <p className="text-stone-300 text-[11px] leading-relaxed">
                          {isMr ? 'नवीनतम राष्ट्रीय व महाराष्ट्र योजनांचे प्रश्न समाविष्ट करण्यात आले आहेत.' : 'Latest high-yield MCQs updated for MPSC 2026-27.'}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                        <div className="font-bold text-emerald-400 mb-0.5">
                          {isMr ? 'Recharts प्रगती आलेख 📊' : 'Recharts Analytics Line Chart 📊'}
                        </div>
                        <p className="text-stone-300 text-[11px] leading-relaxed">
                          {isMr ? 'Analytics टॅबमध्ये आता विषयांची तुलना व अचूकतेचा कल तपासा.' : 'Track test scores & subject mastery trajectory over time.'}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30">
                        <div className="font-bold text-blue-400 mb-0.5">
                          {isMr ? 'राज्यसेवा पूर्व परीक्षा ३१ मे 🎯' : 'Rajyaseva Prelims 31 May 🎯'}
                        </div>
                        <p className="text-stone-300 text-[11px] leading-relaxed">
                          {isMr ? `परीक्षेसाठी आता फक्त ${daysLeft} दिवस बाकी आहेत.` : `Only ${daysLeft} days remaining for the exam.`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
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
                  <span className="hidden md:inline">{isMr ? 'क्लाउड' : 'Sync'}</span>
                </button>
              )}

              {/* Login / Profile Account Button */}
              {onOpenLogin && (
                currentUser && !currentUser.isAnonymous ? (
                  <button
                    id="btn-header-profile"
                    type="button"
                    onClick={onOpenLogin}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    title={isMr ? "प्रोफाईल व खाते" : "Profile & Account"}
                  >
                    {currentUser.photoURL ? (
                      <img src={currentUser.photoURL} alt="" className="w-4 h-4 rounded-full object-cover border border-amber-400/50 shrink-0" />
                    ) : (
                      <UserIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    )}
                    <span className="max-w-[70px] sm:max-w-[90px] truncate hidden sm:inline">
                      {currentUser.displayName?.split(' ')[0] || (isMr ? 'खाते' : 'Account')}
                    </span>
                  </button>
                ) : (
                  <button
                    id="btn-header-login"
                    type="button"
                    onClick={onOpenLogin}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black rounded-lg text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
                    title={isMr ? "गुगल खात्याने लॉगिन करा" : "Sign In with Google"}
                  >
                    <LogIn className="w-3.5 h-3.5 text-stone-950" />
                    <span>{isMr ? 'लॉगिन' : 'Login'}</span>
                  </button>
                )
              )}

              {/* Direct Add MCQ Button */}
              {onOpenAddQuestion && (
                <button
                  id="btn-header-add-mcq"
                  onClick={onOpenAddQuestion}
                  className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-lg text-xs transition-colors cursor-pointer shadow-xs"
                  title={isMr ? "नवीन MCQ प्रश्न तयार करून जोडा" : "Add MCQ Question"}
                >
                  <PlusCircle className="w-3.5 h-3.5 text-stone-950" />
                  <span>{isMr ? '+ MCQ' : '+ MCQ'}</span>
                </button>
              )}

              {/* Sound Effects Toggle Button */}
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
                      ? (isMr ? 'चाचणी ध्वनी प्रभाव: सुरू' : 'Exam Sound Effects: Enabled')
                      : (isMr ? 'चाचणी ध्वनी प्रभाव: बंद' : 'Exam Sound Effects: Disabled')
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

              {/* App Settings Trigger */}
              {onOpenSettings && (
                <button
                  id="btn-open-settings"
                  onClick={onOpenSettings}
                  className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 rounded-lg transition-colors cursor-pointer"
                  title={isMr ? "अॅप सेटिंग्ज" : "App Settings"}
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
        <div className="xl:hidden flex items-center justify-around px-2 py-2 border-t border-stone-800 bg-stone-900/95 text-xs overflow-x-auto gap-1">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`px-2 py-1 rounded font-medium shrink-0 cursor-pointer ${
              currentTab === 'dashboard' ? 'text-amber-400 font-bold' : 'text-stone-400'
            }`}
          >
            {isMr ? 'डॅशबोर्ड' : 'Home'}
          </button>
          <button
            onClick={() => onSelectTab('subjects')}
            className={`px-2 py-1 rounded font-medium shrink-0 cursor-pointer ${
              currentTab === 'subjects' ? 'text-amber-400 font-bold' : 'text-stone-400'
            }`}
          >
            {isMr ? 'विषय' : 'Subjects'}
          </button>
          <button
            onClick={() => onSelectTab('grammar')}
            className={`px-2 py-1 rounded font-medium shrink-0 cursor-pointer ${
              currentTab === 'grammar' ? 'text-amber-400 font-bold' : 'text-stone-400'
            }`}
          >
            {isMr ? 'व्याकरण' : 'Grammar'}
          </button>
          <button
            onClick={() => onSelectTab('analytics')}
            className={`px-2 py-1 rounded font-medium shrink-0 cursor-pointer ${
              currentTab === 'analytics' ? 'text-amber-400 font-bold' : 'text-stone-400'
            }`}
          >
            {isMr ? 'आलेख' : 'Stats'}
          </button>
          <button
            onClick={() => onSelectTab('bookmarks')}
            className={`px-2 py-1 rounded font-medium shrink-0 cursor-pointer ${
              currentTab === 'bookmarks' ? 'text-amber-400 font-bold' : 'text-stone-400'
            }`}
          >
            {isMr ? 'जतन' : 'Saved'}
          </button>
          <button
            onClick={() => onSelectTab('mentor')}
            className={`px-2 py-1 rounded font-medium shrink-0 cursor-pointer ${
              currentTab === 'mentor' ? 'text-amber-400 font-bold' : 'text-stone-400'
            }`}
          >
            {isMr ? 'मार्गदर्शक' : 'Mentor'}
          </button>
          {onOpenHardQuestionsHub && (
            <button
              onClick={onOpenHardQuestionsHub}
              className="px-2 py-1 rounded font-bold text-amber-400 flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>{isMr ? '१ लाख' : '100k'}</span>
            </button>
          )}
          {onOpenAddQuestion && (
            <button
              onClick={onOpenAddQuestion}
              className="px-2 py-1 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMr ? '+ MCQ' : '+ MCQ'}</span>
            </button>
          )}
        </div>
      </header>
    </>
  );
};
