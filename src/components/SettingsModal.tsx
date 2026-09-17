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
  ShieldCheck
} from 'lucide-react';
import { soundFx } from '../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'mr' | 'en';
  soundEffectsEnabled: boolean;
  onToggleSoundEffects: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  language,
  soundEffectsEnabled,
  onToggleSoundEffects,
}) => {
  const isMr = language === 'mr';
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

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
        <div className="py-5 space-y-5">
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
