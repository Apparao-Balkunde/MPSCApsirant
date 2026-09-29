import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Check, 
  Bell, 
  Sparkles, 
  Play, 
  Settings,
  ShieldCheck,
  Download,
  HardDrive,
  Maximize2,
  Minimize2,
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Type
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { UserProgress } from '../types';
import { exportUserDataAsJSON } from '../utils/exportImportBackup';
import { useDeviceScreen } from '../utils/screenUtils';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'mr' | 'en';
  soundEffectsEnabled: boolean;
  onToggleSoundEffects: () => void;
  userProgress?: UserProgress;
  onOpenBackupModal?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  language,
  soundEffectsEnabled,
  onToggleSoundEffects,
  userProgress,
  onOpenBackupModal,
}) => {
  const isMr = language === 'mr';
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Hook for live device detection, fullscreen, and text scaling
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

  if (!isOpen) return null;

  const handleToggle = () => {
    const nextState = !soundEffectsEnabled;
    onToggleSoundEffects();
    
    // Provide instant visual and audio feedback
    if (nextState) {
      soundFx.playToggleSound(true);
      setFeedbackMessage(isMr ? 'ध्वनी प्रभाव सुरू करण्यात आले आहेत!' : 'Sound effects are now enabled!');
    } else {
      soundFx.playToggleSound(false);
      setFeedbackMessage(isMr ? 'सर्व ध्वनी प्रभाव बंद (म्यूट) करण्यात आले आहेत.' : 'Sound effects are now muted.');
    }

    setTimeout(() => {
      setFeedbackMessage(null);
    }, 3200);
  };

  const handleFullscreenToggle = async () => {
    soundFx.playClickSound();
    const nextState = await toggleFullscreen();
    setFeedbackMessage(
      nextState
        ? (isMr ? 'पूर्ण स्क्रीन सुरू झाली! (F11 किंवा Esc ने बाहेर पडा)' : 'Full Screen enabled! (Press F11 or Esc to exit)')
        : (isMr ? 'पूर्ण स्क्रीन बंद झाली.' : 'Exited Full Screen mode.')
    );
    setTimeout(() => setFeedbackMessage(null), 3200);
  };

  const handleTextScaleChange = (scale: 'normal' | 'large') => {
    soundFx.playClickSound();
    setTextScale(scale);
    setFeedbackMessage(
      scale === 'large'
        ? (isMr ? 'मजकूर आकार मोठा (Large) केला!' : 'Large text mode activated!')
        : (isMr ? 'मजकूर आकार सामान्य (Normal) केला!' : 'Normal text mode activated!')
    );
    setTimeout(() => setFeedbackMessage(null), 2500);
  };

  const handleTestSubmissionSound = () => {
    soundFx.playExamSubmissionSound();
    setFeedbackMessage(isMr ? 'चाचणी सबमिशन ध्वनी वाजवला!' : 'Played exam submission chime!');
    setTimeout(() => setFeedbackMessage(null), 2500);
  };

  const handleTestTimerSound = () => {
    soundFx.playTimerCompletionSound();
    setFeedbackMessage(isMr ? 'वेळ समाप्ती गजर वाजवला!' : 'Played timer completion chime!');
    setTimeout(() => setFeedbackMessage(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center">
              <Settings className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">
                {isMr ? 'अॅप सेटिंग्ज (Application Settings)' : 'Application Settings'}
              </h2>
              <p className="text-xs text-stone-500">
                {isMr ? 'परीक्षा अनुभव व ध्वनी प्राधान्ये व्यवस्थापित करा.' : 'Manage audio effects and exam preferences.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual feedback banner */}
        {feedbackMessage && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-300/80 rounded-xl text-xs font-semibold text-amber-900 flex items-center justify-between animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{feedbackMessage}</span>
            </div>
            <span className="text-[10px] text-amber-700 font-mono">OK</span>
          </div>
        )}

        {/* Settings Body */}
        <div className="py-5 space-y-5 max-h-[75vh] overflow-y-auto pr-1">
          {/* Device & Full Screen Display Option */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 border border-amber-500/30 flex items-center justify-center shrink-0">
                  {deviceType === 'mobile' && <Smartphone className="w-5 h-5 text-amber-600" />}
                  {deviceType === 'tablet' && <Tablet className="w-5 h-5 text-amber-600" />}
                  {deviceType === 'laptop' && <Laptop className="w-5 h-5 text-amber-600" />}
                  {deviceType === 'desktop' && <Monitor className="w-5 h-5 text-amber-600" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-stone-900">
                      {isMr ? 'डिव्हाइस व स्क्रीन डिस्प्ले (Device & Screen)' : 'Device & Screen Display'}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-amber-500/20 text-amber-800 border border-amber-500/40">
                      {isMr ? labels.mr : labels.en}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    {isMr
                      ? `सध्याचा आकार: ${width} × ${height} px (${orientation === 'landscape' ? 'आडवा/Landscape' : 'उभा/Portrait'}). मोबाईल, टॅबलेट, लॅपटॉप व पीसीसाठी अनुकूलित.`
                      : `Current Viewport: ${width} × ${height} px (${orientation}). Optimized for Mobile, Tablet, Laptop, and PC.`}
                  </p>
                </div>
              </div>
            </div>

            {/* 1-Click Fullscreen Action Button */}
            <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between flex-wrap gap-2">
              <div className="text-xs font-semibold text-stone-700">
                {isFullscreen
                  ? (isMr ? '✅ पूर्ण स्क्रीन मोड सक्रिय आहे' : '✅ Full Screen is Active')
                  : (isMr ? '📺 पूर्ण स्क्रीन मोड (Full Screen)' : '📺 Full Screen Mode')}
              </div>
              <button
                type="button"
                id="btn-settings-toggle-fullscreen"
                onClick={handleFullscreenToggle}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                  isFullscreen
                    ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                    : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5 animate-pulse" />
                    <span>{isMr ? 'पूर्ण स्क्रीन बंद करा' : 'Exit Full Screen'}</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>{isMr ? 'पूर्ण स्क्रीन सुरू करा' : 'Enter Full Screen'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Text Scale / Font Size Setting */}
            <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5 text-xs text-stone-700 font-semibold">
                <Type className="w-4 h-4 text-amber-600" />
                <span>{isMr ? 'मजकूर आकार (Text Size):' : 'Text Size Scaling:'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleTextScaleChange('normal')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    textScale === 'normal'
                      ? 'bg-amber-500 text-stone-950 border-amber-500 font-extrabold shadow-2xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {isMr ? 'सामान्य (Normal)' : 'Normal'}
                </button>
                <button
                  type="button"
                  onClick={() => handleTextScaleChange('large')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    textScale === 'large'
                      ? 'bg-amber-500 text-stone-950 border-amber-500 font-extrabold shadow-2xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {isMr ? 'मोठा (Large A+)' : 'Large A+'}
                </button>
              </div>
            </div>

            {/* Device-Specific Display Guidance */}
            <div className="mt-1 p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/70 text-[11px] text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1 text-amber-950">
                <span>💡 {isMr ? 'डिव्हाइस प्रदर्शन मार्गदर्शक:' : 'Device Display Tips:'}</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-stone-600 pl-1 leading-relaxed">
                <li>
                  <strong className="text-stone-800">{isMr ? 'मोबाईल (Mobile):' : 'Mobile:'}</strong>{' '}
                  {isMr ? 'चाचणी देताना फोन आडवा (Landscape) केल्यास किंवा फुल स्क्रीन केल्यास प्रश्न व पर्याय एकदम छान दिसतात.' : 'Rotate to landscape or tap Full Screen during exams for wide viewing.'}
                </li>
                <li>
                  <strong className="text-stone-800">{isMr ? 'टॅबलेट (Tablet):' : 'Tablet:'}</strong>{' '}
                  {isMr ? '२-कॉलम सराव आणि प्रश्न तालिका एकाच स्क्रीनवर स्पष्ट दिसते.' : '2-column layout and question palette fit neatly.'}
                </li>
                <li>
                  <strong className="text-stone-800">{isMr ? 'लॅपटॉप व पीसी (Laptop/PC):' : 'Laptop/PC:'}</strong>{' '}
                  {isMr ? 'F11 की दाबून किंवा वरील बटणाने प्रत्यक्ष MPSC परीक्षा केंद्रासारखा अस्सल CBT अनुभव मिळवा.' : 'Press F11 for real CBT exam hall full screen simulation.'}
                </li>
              </ul>
            </div>
          </div>

          {/* Sound Effects Option */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  soundEffectsEnabled
                    ? 'bg-amber-500/20 text-amber-700 border border-amber-500/30'
                    : 'bg-stone-200 text-stone-500'
                }`}>
                  {soundEffectsEnabled ? (
                    <Volume2 className="w-5 h-5 text-amber-600" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-stone-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-stone-900">
                      {isMr ? 'चाचणी व टायमर ध्वनी प्रभाव' : 'Exam & Timer Sound Effects'}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        soundEffectsEnabled
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-stone-200 text-stone-600 border border-stone-300'
                      }`}
                    >
                      {soundEffectsEnabled
                        ? (isMr ? 'सुरू (ON)' : 'Enabled')
                        : (isMr ? 'बंद (OFF)' : 'Disabled')}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    {isMr
                      ? 'परीक्षा सबमिट करताना, शेवटची ५ मिनिटे उरल्यावर आणि वेळ संपल्यावर ऑडिओ संकेत मिळवा.'
                      : 'Play audio chimes upon exam submission, low-time warning, and timer completion.'}
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                id="toggle-sound-effects"
                onClick={handleToggle}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  soundEffectsEnabled ? 'bg-amber-600' : 'bg-stone-300'
                }`}
                role="switch"
                aria-checked={soundEffectsEnabled}
                title={isMr ? "ध्वनी प्रभाव सुरू/बंद करा" : "Toggle sound effects"}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    soundEffectsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Audio Testing Buttons */}
            {soundEffectsEnabled && (
              <div className="pt-3 border-t border-stone-200/80 flex items-center gap-2 flex-wrap">
                <span className="text-[11px] text-stone-500 font-medium">
                  {isMr ? 'आवाज तपासा:' : 'Test audio:'}
                </span>
                <button
                  onClick={handleTestSubmissionSound}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Play className="w-3 h-3 text-amber-600" />
                  <span>{isMr ? 'सबमिशन आवाज' : 'Submission Chime'}</span>
                </button>
                <button
                  onClick={handleTestTimerSound}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Play className="w-3 h-3 text-rose-600" />
                  <span>{isMr ? 'वेळ समाप्ती आवाज' : 'Timer Alert'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Local Data Backup Option */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-700 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <HardDrive className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-stone-900">
                      {isMr ? 'स्थानिक डेटा बॅकअप (.JSON)' : 'Local Data Backup (.JSON)'}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Offline
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    {isMr
                      ? 'परीक्षेचा इतिहास, स्वाध्याय सत्रे आणि जतन केलेल्या प्रश्नांचा ऑफलाइन JSON बॅकअप डाउनलोड करा.'
                      : 'Download an offline JSON backup of your exam history, study logs, and bookmarks.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-200/80 flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  if (onOpenBackupModal) {
                    onOpenBackupModal();
                  } else if (userProgress) {
                    const { filename, summary } = exportUserDataAsJSON(userProgress);
                    setFeedbackMessage(
                      isMr 
                        ? `🎉 बॅकअप डाऊनलोड झाला! (${filename} — ${summary.totalExams} चाचण्या)` 
                        : `🎉 Backup downloaded! (${filename} — ${summary.totalExams} exams)`
                    );
                    setTimeout(() => setFeedbackMessage(null), 4000);
                  }
                }}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isMr ? '💾 JSON बॅकअप डाऊनलोड करा' : '💾 Export JSON Backup'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isMr ? 'सेटिंग्ज आपोआप सेव्ह होतात' : 'Settings automatically saved'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs cursor-pointer shadow-xs"
          >
            {isMr ? 'पूर्ण झाले' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
