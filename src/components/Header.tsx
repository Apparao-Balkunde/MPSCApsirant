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
  ArrowLeft,
  Clock,
  Calendar,
  Scale,
  Maximize2,
  Minimize2,
  Monitor,
  Smartphone,
  Tablet,
  Laptop
} from 'lucide-react';
import { UserProgress } from '../types';
import { soundFx } from '../utils/audio';
import { type User } from 'firebase/auth';
import { useDeviceScreen } from '../utils/screenUtils';
import { useIsMobile, useIsCompactLandscape, useIsTouchDevice } from '../hooks/useMediaQuery';

export type NavigationTab = 'dashboard' | 'subjects' | 'grammar' | 'analytics' | 'bookmarks' | 'mentor' | 'add_mcq';

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
  onOpenExamCountdown?: () => void;
  onOpenInformationHub?: () => void;
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
  onOpenExamCountdown,
  onOpenInformationHub,
}) => {
  const isMr = language === 'mr';
  const soundEnabled = userProgress.soundEffectsEnabled ?? true;
  const [soundFeedback, setSoundFeedback] = useState<string | null>(null);
  const [fullscreenFeedback, setFullscreenFeedback] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [daysLeft, setDaysLeft] = useState<number>(0);

  // Live Screen & Device Detector Hook
  const { isFullscreen, toggleFullscreen, deviceType, width, isSupported: isFsSupported } = useDeviceScreen();
  const isMobile = useIsMobile();
  const isCompactLandscape = useIsCompactLandscape();
  const isTouchDevice = useIsTouchDevice();

  const deviceLabelMr = deviceType === 'mobile' ? 'मोबाईल' : deviceType === 'tablet' ? 'टॅबलेट' : deviceType === 'laptop' ? 'लॅपटॉप' : 'पीसी';
  const deviceLabelEn = deviceType === 'mobile' ? 'Mobile' : deviceType === 'tablet' ? 'Tablet' : deviceType === 'laptop' ? 'Laptop' : 'Desktop PC';

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

  const handleFullscreenToggle = async () => {
    soundFx.playClickSound();
    const nextIsFs = await toggleFullscreen();
    setFullscreenFeedback(
      nextIsFs
        ? (isMr ? 'पूर्ण स्क्रीन सुरू (Full Screen ON)' : 'Full Screen Enabled')
        : (isMr ? 'पूर्ण स्क्रीन बंद (Full Screen OFF)' : 'Exited Full Screen')
    );
    setTimeout(() => {
      setFullscreenFeedback(null);
    }, 2500);
  };

  const targetPercent = Math.min(
    100,
    Math.round((userProgress.todayQuestionsCount / userProgress.dailyTargetQuestions) * 100)
  );

  return (
    <>
      {/* Portal Top Bar / Announcement Banner - Responsive for Mobile, Tablet, Laptop, PC */}
      {!isCompactLandscape && (
        <div className="bg-gradient-to-r from-amber-800 via-amber-900 to-stone-900 text-amber-50 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-medium border-b border-amber-600/40 select-none">
        <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto flex items-center justify-between gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="bg-amber-950/80 text-amber-300 text-[10px] uppercase tracking-wider font-extrabold px-1.5 sm:px-2 py-0.5 rounded border border-amber-500/50 shrink-0">
              MPSC सारथी
            </span>
            <span className="truncate text-[11px] sm:text-xs text-amber-100/90 font-medium">
              {isMr 
                ? '📚 जुना संपूर्ण अभ्यासक्रम, नोट्स व PYQ पेपर्स' 
                : 'Full syllabus, Marathi notes & previous question papers'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Live Exam Countdown Badge Button */}
            <button
              type="button"
              id="btn-header-exam-countdown"
              onClick={onOpenExamCountdown}
              className="inline-flex items-center gap-1 bg-amber-950/70 hover:bg-amber-900 border border-amber-500/40 hover:border-amber-400 px-2 py-0.5 rounded text-[11px] font-bold text-amber-200 transition-all cursor-pointer shadow-xs active:scale-95"
              title={isMr ? "MPSC परीक्षा काउंटडाउन व वेळापत्रक उघडा" : "Open MPSC Exam Countdown & Timetable"}
            >
              <Clock className="w-3 h-3 text-amber-400 animate-pulse shrink-0" />
              <span className="hidden md:inline">{isMr ? `वेळापत्रक व दिवस` : `Timetable & Days`}</span>
              <span className="md:hidden font-mono text-amber-300">{daysLeft}d</span>
            </button>

            {onOpenInformationHub && (
              <button
                type="button"
                id="btn-header-information-hub"
                onClick={onOpenInformationHub}
                className="inline-flex items-center gap-1 bg-stone-900 hover:bg-stone-800 border border-amber-500/40 hover:border-amber-400 px-2 py-0.5 rounded text-[11px] font-bold text-amber-300 transition-all cursor-pointer shadow-xs active:scale-95"
                title={isMr ? "MPSC परीक्षा व कायदे माहिती केंद्र (RTI / IT Act)" : "Open Exam & Legal Info Hub"}
              >
                <Scale className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="hidden sm:inline">{isMr ? 'माहिती केंद्र' : 'Info Hub'}</span>
              </button>
            )}

            <a
              id="banner-classic-portal-link"
              href="https://mpscsarathi.online"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-stone-950 px-2.5 py-0.5 rounded-md text-[11px] font-black transition-all shadow-xs shrink-0 active:scale-95"
            >
              <span>{isMr ? 'मुख्य पोर्टल ➜' : 'Main Portal ➜'}</span>
            </a>
          </div>
        </div>
      </div>
      )}

      <header className="sticky top-0 z-40 bg-stone-900/98 backdrop-blur-md border-b border-stone-800 text-stone-100 shadow-md">
        <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-15 sm:h-16 gap-2">
            
            {/* Left: Brand & Logo */}
            <div 
              id="brand-logo"
              onClick={() => onSelectTab('dashboard')} 
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group shrink-0"
              title={isMr ? "डॅशबोर्डवर जा" : "Go to Dashboard"}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-black shadow-inner shadow-amber-300/40 group-hover:scale-105 transition-transform">
                <span className="text-lg sm:text-xl tracking-tighter">M</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-stone-100 group-hover:text-amber-400 transition-colors">
                    MPSCAspirant
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 hidden xs:inline-block">
                    {isMr ? 'राज्यसेवा/संयुक्त' : 'Prelims 2025-26'}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-stone-400 font-medium hidden md:block">
                  {isMr ? 'सराव परीक्षा, व्याकरण व प्रगती ट्रॅकर' : 'Exam Practice, Grammar & Progress'}
                </p>
              </div>
            </div>

            {/* Middle: Desktop & Laptop Navigation Items */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              <button
                id="nav-dashboard"
                onClick={() => onSelectTab('dashboard')}
                className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentTab === 'dashboard'
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Award className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                <span>{isMr ? 'डॅशबोर्ड' : 'Dashboard'}</span>
              </button>

              <button
                id="nav-subjects"
                onClick={() => onSelectTab('subjects')}
                className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentTab === 'subjects'
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                <span>{isMr ? 'विषयवार' : 'Subjects'}</span>
              </button>

              <button
                id="nav-grammar"
                onClick={() => onSelectTab('grammar')}
                className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentTab === 'grammar'
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                <span>{isMr ? 'व्याकरण' : 'Grammar'}</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-amber-400 text-stone-950 font-black uppercase hidden xl:inline">
                  {isMr ? '१३६ नियम 🏆' : '136 Rules 🏆'}
                </span>
              </button>

              <button
                id="nav-analytics"
                onClick={() => onSelectTab('analytics')}
                className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentTab === 'analytics'
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                <span>{isMr ? 'आलेख' : 'Stats'}</span>
              </button>

              <button
                id="nav-bookmarks"
                onClick={() => onSelectTab('bookmarks')}
                className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentTab === 'bookmarks'
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                <span>{isMr ? 'जतन' : 'Saved'}</span>
                {userProgress.bookmarkedQuestionIds.length > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-700 text-amber-300 font-mono">
                    {userProgress.bookmarkedQuestionIds.length}
                  </span>
                )}
              </button>

              <button
                id="nav-mentor"
                onClick={() => onSelectTab('mentor')}
                className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentTab === 'mentor'
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                    : 'text-amber-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-amber-400" />
                <span>{isMr ? 'AI मार्गदर्शक' : 'AI Mentor'}</span>
              </button>

              <button
                id="nav-add-mcq"
                onClick={() => onSelectTab('add_mcq')}
                className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentTab === 'add_mcq'
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-amber-400" />
                <span>{isMr ? '+ MCQ' : '+ MCQ'}</span>
              </button>

              {onOpenHardQuestionsHub && (
                <button
                  id="nav-hard-100k"
                  onClick={onOpenHardQuestionsHub}
                  className="px-2 xl:px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all flex items-center gap-1 text-amber-300 hover:text-white hover:bg-amber-500/20 border border-amber-500/30 cursor-pointer shadow-xs"
                  title={isMr ? "१,००,०००+ कठीण प्रश्न सराव केंद्र उघडा" : "Open 100,000+ Hard Questions Engine"}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400/40 animate-pulse" />
                  <span>{isMr ? '१ लाख प्रश्न' : '100k Qs'}</span>
                </button>
              )}
            </nav>

            {/* Right: Action Controls, Device Indicator & Fullscreen Button */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Device View Indicator Badge (Mobile / Tablet / Laptop / PC) */}
              <button 
                type="button"
                onClick={onOpenSettings}
                title={
                  isMr 
                    ? `डिव्हाइस अनुकूलित: ${deviceLabelMr} (${width}px) • स्क्रीन सेटिंग्ज उघडा` 
                    : `Device Optimized: ${deviceLabelEn} (${width}px) • Click for Screen Settings`
                }
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-800/90 hover:bg-stone-750 border border-stone-700/80 hover:border-amber-500/50 text-[10px] font-bold text-stone-300 hover:text-white select-none shadow-xs transition-colors cursor-pointer"
              >
                {deviceType === 'mobile' && <Smartphone className="w-3 h-3 text-amber-400 shrink-0" />}
                {deviceType === 'tablet' && <Tablet className="w-3 h-3 text-amber-400 shrink-0" />}
                {deviceType === 'laptop' && <Laptop className="w-3 h-3 text-amber-400 shrink-0" />}
                {deviceType === 'desktop' && <Monitor className="w-3 h-3 text-amber-400 shrink-0" />}
                <span>{isMr ? deviceLabelMr : deviceLabelEn}</span>
              </button>

              {/* Fullscreen Toggle Button (Mobile, Tablet, Laptop, PC) */}
              <div className="relative">
                <button
                  id="btn-header-fullscreen-toggle"
                  type="button"
                  onClick={handleFullscreenToggle}
                  className={`p-1.5 sm:p-2 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                    isFullscreen
                      ? 'bg-amber-500/25 border-amber-400 text-amber-300 ring-2 ring-amber-400/30 shadow-xs'
                      : 'bg-stone-800 hover:bg-stone-700 border-stone-700 text-stone-300 hover:text-white'
                  }`}
                  title={
                    isFullscreen
                      ? (isMr ? 'पूर्ण स्क्रीन बंद करा (Esc / क्लिक करा)' : 'Exit Full Screen (Esc or Click)')
                      : (isMr ? 'पूर्ण स्क्रीन मोड (F11 / क्लिक करा - मोबाईल, लॅपटॉप, पीसी)' : 'Full Screen Mode (F11 or Click - Mobile, Tablet, PC)')
                  }
                  aria-label={isMr ? 'पूर्ण स्क्रीन मोड' : 'Full Screen Mode'}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4 text-amber-400 animate-pulse" />
                  ) : (
                    <Maximize2 className="w-4 h-4 text-stone-300" />
                  )}
                  <span className="hidden xl:inline text-[11px]">
                    {isFullscreen ? (isMr ? 'एक्झिट' : 'Exit') : (isMr ? 'पूर्ण स्क्रीन' : 'Full Screen')}
                  </span>
                </button>

                {fullscreenFeedback && (
                  <div className="absolute right-0 -bottom-8 whitespace-nowrap bg-stone-900 border border-amber-400 text-amber-300 px-2.5 py-0.5 rounded-md text-[10px] font-bold shadow-2xl animate-in fade-in zoom-in-95 duration-150 pointer-events-none z-50">
                    {fullscreenFeedback}
                  </div>
                )}
              </div>

              {/* Daily Streak Badge */}
              <div 
                title={`${userProgress.streakDays} Day Preparation Streak`}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-stone-800 border border-stone-700/80 rounded-lg sm:rounded-full text-xs font-semibold text-amber-400 shrink-0"
              >
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 fill-orange-400" />
                <span className="font-bold text-[11px] sm:text-xs">{userProgress.streakDays}</span>
                <span className="hidden sm:inline text-[11px]">{isMr ? 'दिवस' : 'd'}</span>
              </div>

              {/* Notification Bell with Popup */}
              <div className="relative">
                <button
                  type="button"
                  id="btn-header-notifications"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-1.5 sm:p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 rounded-lg transition-colors cursor-pointer relative"
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
                          {isMr ? '१३६ व्याकरण नियम अद्ययावत 📚' : '136 High-Yield Grammar Rules 📚'}
                        </div>
                        <p className="text-stone-300 text-[11px] leading-relaxed">
                          {isMr ? 'व्याकरण नियम टॅबमध्ये आता Para Jumbles (A-B-C-D व S1-S6 पॅटर्न, मराठी अर्थ व ४-स्टेप ट्रिक) यांसह १३६ नियम सज्ज आहेत.' : '136 Marathi & English grammar rules with Para Jumbles (A-B-C-D & S1-S6 patterns with Marathi translations & shortcuts).'}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                        <div className="font-bold text-emerald-400 mb-0.5">
                          {isMr ? 'मीडिया क्वेरी (Media Query) व अनुकूलन 🖥️' : 'Responsive Media Queries & useMediaQuery 🖥️'}
                        </div>
                        <p className="text-stone-300 text-[11px] leading-relaxed">
                          {isMr ? 'मोबाईल, टॅबलेट, लॅपटॉप व पीसीसाठी CSS Media Queries आणि React useMediaQuery हुक लागू करण्यात आले आहेत.' : 'CSS Media Queries and useMediaQuery hook optimized for all mobile, tablet & desktop viewports.'}
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
                  className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
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
                    className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    title={isMr ? "प्रोफाईल व खाते" : "Profile & Account"}
                  >
                    {currentUser.photoURL ? (
                      <img src={currentUser.photoURL} alt="" className="w-4 h-4 rounded-full object-cover border border-amber-400/50 shrink-0" />
                    ) : (
                      <UserIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    )}
                    <span className="max-w-[60px] sm:max-w-[80px] truncate hidden sm:inline">
                      {currentUser.displayName?.split(' ')[0] || (isMr ? 'खाते' : 'Account')}
                    </span>
                  </button>
                ) : (
                  <button
                    id="btn-header-login"
                    type="button"
                    onClick={onOpenLogin}
                    className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black rounded-lg text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
                    title={isMr ? "गुगल खात्याने लॉगिन करा" : "Sign In with Google"}
                  >
                    <LogIn className="w-3.5 h-3.5 text-stone-950" />
                    <span className="hidden xs:inline">{isMr ? 'लॉगिन' : 'Login'}</span>
                  </button>
                )
              )}

              {/* Sound Effects Toggle Button */}
              <div className="relative hidden xs:block">
                <button
                  id="btn-header-sound-toggle"
                  onClick={handleSoundToggle}
                  className={`p-1.5 sm:p-2 rounded-lg border text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
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
                  className="p-1.5 sm:p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 rounded-lg transition-colors cursor-pointer"
                  title={isMr ? "अॅप सेटिंग्ज व स्क्रीन व्ह्यू" : "App Settings & Screen View"}
                >
                  <Settings className="w-4 h-4 text-stone-300" />
                </button>
              )}

              {/* Language Toggle Button */}
              <button
                id="btn-toggle-lang"
                onClick={onToggleLanguage}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0"
                title="Switch language between Marathi and English"
              >
                <Languages className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px]">{isMr ? 'EN' : 'मराठी'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Submenu Bar - Enhanced Touch Scroll Navigation */}
        <div className="lg:hidden flex items-center px-2 py-1.5 border-t border-stone-800 bg-stone-950/90 text-xs overflow-x-auto gap-1 scrollbar-none select-none">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`px-2.5 py-1.5 rounded-lg font-bold shrink-0 cursor-pointer transition-all flex items-center gap-1 ${
              currentTab === 'dashboard'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>{isMr ? 'डॅशबोर्ड' : 'Home'}</span>
          </button>
          
          <button
            onClick={() => onSelectTab('subjects')}
            className={`px-2.5 py-1.5 rounded-lg font-bold shrink-0 cursor-pointer transition-all flex items-center gap-1 ${
              currentTab === 'subjects'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isMr ? 'विषय' : 'Subjects'}</span>
          </button>

          <button
            onClick={() => onSelectTab('grammar')}
            className={`px-2.5 py-1.5 rounded-lg font-bold shrink-0 cursor-pointer transition-all flex items-center gap-1 ${
              currentTab === 'grammar'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isMr ? 'व्याकरण' : 'Grammar'}</span>
          </button>

          <button
            onClick={() => onSelectTab('analytics')}
            className={`px-2.5 py-1.5 rounded-lg font-bold shrink-0 cursor-pointer transition-all flex items-center gap-1 ${
              currentTab === 'analytics'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{isMr ? 'आलेख' : 'Stats'}</span>
          </button>

          <button
            onClick={() => onSelectTab('bookmarks')}
            className={`px-2.5 py-1.5 rounded-lg font-bold shrink-0 cursor-pointer transition-all flex items-center gap-1 ${
              currentTab === 'bookmarks'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isMr ? 'जतन' : 'Saved'}</span>
            {userProgress.bookmarkedQuestionIds.length > 0 && (
              <span className="text-[10px] px-1 rounded-full bg-stone-800 text-amber-300 font-mono">
                {userProgress.bookmarkedQuestionIds.length}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('mentor')}
            className={`px-2.5 py-1.5 rounded-lg font-bold shrink-0 cursor-pointer transition-all flex items-center gap-1 ${
              currentTab === 'mentor'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-amber-400 hover:text-amber-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isMr ? 'मार्गदर्शक' : 'Mentor'}</span>
          </button>

          {onOpenHardQuestionsHub && (
            <button
              onClick={onOpenHardQuestionsHub}
              className="px-2 py-1 rounded-lg font-bold text-amber-400 flex items-center gap-1 shrink-0 cursor-pointer bg-amber-500/10 border border-amber-500/30"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>{isMr ? '१ लाख' : '100k'}</span>
            </button>
          )}

          <button
            onClick={() => onSelectTab('add_mcq')}
            className={`px-2 py-1 rounded-lg font-bold flex items-center gap-1 shrink-0 cursor-pointer ${
              currentTab === 'add_mcq'
                ? 'bg-amber-500 text-stone-950 font-black'
                : 'bg-stone-800 text-stone-300 border border-stone-700'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{isMr ? '+ MCQ' : '+ MCQ'}</span>
          </button>

          {/* Quick Full Screen trigger in mobile/tablet submenu */}
          <button
            onClick={handleFullscreenToggle}
            className={`px-2 py-1 rounded-lg font-bold flex items-center gap-1 shrink-0 cursor-pointer ${
              isFullscreen
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400'
                : 'bg-stone-800 text-stone-400 border border-stone-700'
            }`}
            title={isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-stone-300" />
            )}
            <span>{isFullscreen ? (isMr ? 'सामान्य' : 'Exit') : (isMr ? 'फुल स्क्रीन' : 'Full')}</span>
          </button>
        </div>
      </header>
    </>
  );
};
