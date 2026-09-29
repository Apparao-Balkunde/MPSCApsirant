import React, { useState } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  Smartphone, 
  Tablet, 
  Laptop, 
  Monitor, 
  Type, 
  Sparkles,
  ChevronUp,
  ChevronDown,
  X,
  HelpCircle,
  Eye
} from 'lucide-react';
import { useDeviceScreen } from '../utils/screenUtils';
import { soundFx } from '../utils/audio';

interface FloatingScreenControlsProps {
  language: 'mr' | 'en';
  onOpenSettings?: () => void;
}

export const FloatingScreenControls: React.FC<FloatingScreenControlsProps> = ({
  language,
  onOpenSettings,
}) => {
  const isMr = language === 'mr';
  const { 
    isFullscreen, 
    toggleFullscreen, 
    deviceType, 
    orientation, 
    width, 
    height,
    textScale,
    setTextScale,
    labels 
  } = useDeviceScreen();

  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleToggleFullscreen = async () => {
    soundFx.playClickSound();
    const nextIsFs = await toggleFullscreen();
    setFeedback(
      nextIsFs
        ? (isMr ? 'पूर्ण स्क्रीन सुरू (Full Screen ON)' : 'Full Screen Enabled')
        : (isMr ? 'पूर्ण स्क्रीन बंद (Normal Screen)' : 'Standard View Enabled')
    );
    setTimeout(() => setFeedback(null), 2500);
  };

  const handleToggleTextScale = () => {
    soundFx.playClickSound();
    const nextScale = textScale === 'large' ? 'normal' : 'large';
    setTextScale(nextScale);
    setFeedback(
      nextScale === 'large'
        ? (isMr ? 'मजकूर मोठा केला (Large Text)' : 'Large Text Mode')
        : (isMr ? 'मजकूर सामान्य केला (Normal Text)' : 'Normal Text Mode')
    );
    setTimeout(() => setFeedback(null), 2500);
  };

  const DeviceIcon = 
    deviceType === 'mobile' ? Smartphone :
    deviceType === 'tablet' ? Tablet :
    deviceType === 'laptop' ? Laptop : Monitor;

  return (
    <aside 
      aria-label={isMr ? "डिव्हाइस आणि पूर्ण स्क्रीन नियंत्रणे" : "Device and Full Screen controls"}
      className="fixed bottom-4 left-4 z-40 select-none print:hidden pointer-events-auto"
    >
      {/* Toast Feedback */}
      {feedback && (
        <div className="mb-2 bg-stone-900/95 backdrop-blur-md border border-amber-400 text-amber-300 px-3 py-1.5 rounded-xl text-xs font-bold shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Expanded Menu */}
      {isOpen && (
        <div className="mb-2 w-72 sm:w-80 bg-stone-900/95 backdrop-blur-md border border-stone-700/80 rounded-2xl shadow-2xl p-3.5 text-stone-100 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2.5 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <span className="text-base">{labels.iconDesc}</span>
              <div>
                <div className="text-xs font-extrabold text-stone-100">
                  {isMr ? labels.mr : labels.en}
                </div>
                <div className="text-[10px] text-stone-400 font-mono">
                  {width} × {height} px • {orientation === 'landscape' ? (isMr ? 'आडवा मोड' : 'Landscape') : (isMr ? 'उभा मोड' : 'Portrait')}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              title={isMr ? 'बंद करा' : 'Close'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 space-y-2 text-xs">
            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={handleToggleFullscreen}
              className={`w-full p-2.5 rounded-xl font-bold flex items-center justify-between transition-all cursor-pointer border ${
                isFullscreen
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-xs'
                  : 'bg-stone-800 hover:bg-stone-750 border-stone-700 text-stone-200 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4 text-amber-400 animate-pulse" />
                ) : (
                  <Maximize2 className="w-4 h-4 text-stone-300" />
                )}
                <span>
                  {isFullscreen
                    ? (isMr ? 'पूर्ण स्क्रीनमधून बाहेर पडा (Exit Full Screen)' : 'Exit Full Screen')
                    : (isMr ? 'पूर्ण स्क्रीन सुरू करा (Full Screen)' : 'Enter Full Screen')}
                </span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800">
                {isFullscreen ? 'Esc' : 'F11 / Tap'}
              </span>
            </button>

            {/* Font Size Scaling */}
            <button
              type="button"
              onClick={handleToggleTextScale}
              className="w-full p-2 rounded-xl bg-stone-800 hover:bg-stone-750 border border-stone-700 font-medium text-stone-200 flex items-center justify-between transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-amber-400" />
                <span>
                  {isMr ? 'मजकूर आकार (Text Size):' : 'Text Size:'}
                </span>
                <span className="font-bold text-amber-300">
                  {textScale === 'large' ? (isMr ? 'मोठा' : 'Large') : (isMr ? 'सामान्य' : 'Normal')}
                </span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                {textScale === 'large' ? 'A+' : 'A'}
              </span>
            </button>

            {/* Device-Specific Tip */}
            <div className="p-2 rounded-xl bg-stone-950/60 border border-stone-800 text-[11px] text-stone-400 leading-relaxed">
              {deviceType === 'mobile' && (
                <span>
                  📱 {isMr 
                    ? 'मोबाईलवर सर्वोत्तम अनुभवासाठी स्क्रीन आडवी (Landscape) करून किंवा फुल स्क्रीन बटण दाबून अभ्यास करा.' 
                    : 'On mobile, rotate to landscape or tap Full Screen for an expansive reading view.'}
                </span>
              )}
              {deviceType === 'tablet' && (
                <span>
                  📟 {isMr 
                    ? 'टॅबलेट व्ह्यू: दोन्ही बाजूंनी २-कॉलम लेआउट आपोआप सक्रिय होतो.' 
                    : 'Tablet view: 2-column layout active with touch-friendly controls.'}
                </span>
              )}
              {deviceType === 'laptop' && (
                <span>
                  💻 {isMr 
                    ? 'लॅपटॉप व्ह्यू: ३-कॉलम सराव ग्रिड आणि संपूर्ण स्क्रीन सपोर्ट.' 
                    : 'Laptop view: balanced 3-column practice grid with full screen.'}
                </span>
              )}
              {deviceType === 'desktop' && (
                <span>
                  🖥️ {isMr 
                    ? 'पीसी / मोठा मॉनिटर: प्रशस्त लेआउट आणि F11 की द्वारे पूर्ण स्क्रीन.' 
                    : 'Desktop PC view: expansive layout, press F11 for full screen mock test.'}
                </span>
              )}
            </div>
          </div>

          {onOpenSettings && (
            <div className="pt-2 border-t border-stone-800 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenSettings();
                }}
                className="text-[11px] font-bold text-amber-400 hover:text-amber-300 underline cursor-pointer"
              >
                {isMr ? '⚙️ सर्व स्क्रीन व डिस्प्ले सेटिंग्ज उघडा' : '⚙️ Open All Display Settings'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Collapsed Pill Button */}
      <div className="flex items-center gap-1.5 bg-stone-900/90 hover:bg-stone-900 backdrop-blur-md border border-stone-700/80 hover:border-amber-400/80 text-stone-200 p-1.5 rounded-full shadow-xl transition-all">
        {/* Device indicator icon + badge */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-200 cursor-pointer transition-colors"
          title={isMr ? `डिव्हाइस: ${labels.mr} (${width}px)` : `Device: ${labels.en} (${width}px)`}
        >
          <DeviceIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="hidden sm:inline text-[11px] font-semibold">
            {isMr ? labels.mr.split('/')[0] : labels.en.split(' ')[0]}
          </span>
          <span className="text-[10px] text-stone-400 font-mono hidden md:inline">
            {width}px
          </span>
          {isOpen ? <ChevronDown className="w-3 h-3 text-stone-400" /> : <ChevronUp className="w-3 h-3 text-stone-400" />}
        </button>

        {/* 1-Click Fullscreen Button */}
        <button
          type="button"
          onClick={handleToggleFullscreen}
          className={`p-1.5 rounded-full transition-all cursor-pointer ${
            isFullscreen
              ? 'bg-amber-500 text-stone-950 shadow-xs'
              : 'hover:bg-stone-800 text-stone-300 hover:text-white'
          }`}
          title={
            isFullscreen
              ? (isMr ? 'पूर्ण स्क्रीन बंद करा' : 'Exit Full Screen')
              : (isMr ? 'पूर्ण स्क्रीन करा (F11 / क्लिक)' : 'Enter Full Screen (F11 / Click)')
          }
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4 animate-pulse" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
};
