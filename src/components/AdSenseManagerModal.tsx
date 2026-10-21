import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Check, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  DollarSign, 
  Eye, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  Info,
  Sliders,
  RotateCcw,
  Zap,
  Globe
} from 'lucide-react';
import { 
  AdSenseConfig, 
  getStoredAdSenseConfig, 
  saveAdSenseConfig, 
  DEFAULT_ADSENSE_CONFIG,
  generateAdsTxtSnippet 
} from '../utils/adSenseConfig';

interface AdSenseManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'mr' | 'en';
}

export const AdSenseManagerModal: React.FC<AdSenseManagerModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const isMr = language === 'mr';
  const [config, setConfig] = useState<AdSenseConfig>(getStoredAdSenseConfig);
  const [activeTab, setActiveTab] = useState<'preview' | 'settings' | 'ads_txt' | 'guide'>('preview');
  const [copiedAdsTxt, setCopiedAdsTxt] = useState<boolean>(false);
  const [savedNotification, setSavedNotification] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    saveAdSenseConfig(config);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  const handleResetToDefault = () => {
    setConfig(DEFAULT_ADSENSE_CONFIG);
    saveAdSenseConfig(DEFAULT_ADSENSE_CONFIG);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  const handleCopyAdsTxt = () => {
    const snippet = generateAdsTxtSnippet(config.publisherId || DEFAULT_ADSENSE_CONFIG.publisherId);
    navigator.clipboard.writeText(snippet);
    setCopiedAdsTxt(true);
    setTimeout(() => setCopiedAdsTxt(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-stone-200 bg-gradient-to-r from-amber-500/10 via-stone-50 to-amber-600/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
              <DollarSign className="w-5 h-5 text-amber-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-stone-900">
                  {isMr ? 'गुगल ॲडसेन्स जाहिरात जागा व्यवस्थापक' : 'Google AdSense Ad Space Manager'}
                </h3>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {config.enabled ? (isMr ? 'सक्रिय (Active)' : 'Active') : (isMr ? 'बंद (Disabled)' : 'Disabled')}
                </span>
              </div>
              <p className="text-xs text-stone-500">
                {isMr 
                  ? 'ॲपमधील जाहिरात कंटेनर्स, पब्लिशर आयडी, स्लॉट्स व कमाई नियंत्रणे' 
                  : 'Manage AdSense units, publisher client ID, slots & monetization'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 pt-3 pb-2 border-b border-stone-100 bg-stone-50/70 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'preview'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200/60'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{isMr ? '१. जाहिरात जागा पूर्वावलोकन' : '1. Ad Units Preview'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200/60'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>{isMr ? '२. आयडी व स्लॉट्स सेटिंग्ज' : '2. IDs & Slot Config'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ads_txt')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'ads_txt'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200/60'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>{isMr ? '३. ads.txt कोड' : '3. ads.txt Code'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isMr ? '४. १००% मंजुरी मार्गदर्शक' : '4. Approval Guide'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {savedNotification && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{isMr ? '✅ सर्व ॲडसेन्स सेटिंग्ज यशस्वीरीत्या सेव्ह करण्यात आल्या!' : '✅ AdSense configurations saved successfully!'}</span>
            </div>
          )}

          {/* TAB 1: Ad Units Preview */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              {/* Overview Box */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-black text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>{isMr ? 'ॲपमधील जाहिरात कंटेनर्सचे स्थान व स्वरूप' : 'Active Ad Placements & Layouts'}</span>
                  </h4>
                  <p className="text-xs text-stone-600 mt-1">
                    {isMr 
                      ? 'गुगल ॲडसेन्सच्या अधिकृत धोरणांनुसार (Policy Compliant) हे कंटेनर्स डिझाइन केले आहेत.' 
                      : 'These containers strictly adhere to Google AdSense responsive and placement policies.'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-stone-700 flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-stone-300">
                    <input
                      type="checkbox"
                      checked={config.testMode}
                      onChange={(e) => {
                        const updated = { ...config, testMode: e.target.checked };
                        setConfig(updated);
                        saveAdSenseConfig(updated);
                      }}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>{isMr ? 'चाचणी मोड (Test Mode)' : 'Test Mode'}</span>
                  </label>
                </div>
              </div>

              {/* Placement Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Header Leaderboard */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-stone-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>१. हेडर / टॉप लीडरबोर्ड (Leaderboard)</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-200 text-stone-700">
                      728x90 / Responsive
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    मुख्य पृष्ठाच्या वरच्या भागात, युझरचे लक्ष वेधून घेणारे मानक जाहिरात स्थान.
                  </p>
                  <div className="p-3 rounded-xl bg-white border border-stone-200 text-center text-xs font-mono text-stone-600">
                    स्लॉट आयडी: <span className="font-bold text-amber-700">{config.slots.header}</span>
                  </div>
                </div>

                {/* 2. Exam Result Unit */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-stone-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>२. परीक्षा निकाल कार्ड (Exam Result)</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-200 text-stone-700">
                      300x250 / Rectangle
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    विद्यार्थी टेस्ट संपवून निकाल पाहत असताना सर्वाधिक CTR मिळणारे अत्यंत प्रभावी स्थान.
                  </p>
                  <div className="p-3 rounded-xl bg-white border border-stone-200 text-center text-xs font-mono text-stone-600">
                    स्लॉट आयडी: <span className="font-bold text-amber-700">{config.slots.examResult}</span>
                  </div>
                </div>

                {/* 3. Dashboard In-Feed */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-stone-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>३. डॅशबोर्ड इन-फीड (In-Feed)</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-200 text-stone-700">
                      Native Fluid
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    कमांड सेंटर व विषयांच्या कार्ड्सच्या मध्ये नैसर्गिकरित्या मिसळणारी नेटिव्ह जाहिरात.
                  </p>
                  <div className="p-3 rounded-xl bg-white border border-stone-200 text-center text-xs font-mono text-stone-600">
                    स्लॉट आयडी: <span className="font-bold text-amber-700">{config.slots.dashboard}</span>
                  </div>
                </div>

                {/* 4. Footer Banner */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-stone-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>४. फुटर बॅनर (Bottom Banner)</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-200 text-stone-700">
                      Full Width Fluid
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    पृष्ठाच्या शेवटी, गोपनीयता धोरण (Privacy Policy) च्या अगदी वर सुरक्षित जाहिरात जागा.
                  </p>
                  <div className="p-3 rounded-xl bg-white border border-stone-200 text-center text-xs font-mono text-stone-600">
                    स्लॉट आयडी: <span className="font-bold text-amber-700">{config.slots.footer}</span>
                  </div>
                </div>

                {/* 5. Exam Question Solving Screen Auto-Slot */}
                <div className="p-4 rounded-2xl border border-emerald-300 bg-emerald-50/40 space-y-2 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>५. परीक्षा प्रश्न स्क्रीन व निकाल (Question & Result Screen)</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-900">
                      Active Auto-Slot
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    विद्यार्थी प्रत्यक्ष प्रश्न सोडवत असताना पर्यायांच्या खाली आणि निकाल (Result) सखोल विश्लेषणाच्या दरम्यान उच्च-कमाई देणारा अधिकृत Google AdSense ऑटो-स्लॉट.
                  </p>
                  <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-center text-xs font-mono text-emerald-800">
                    स्लॉट आयडी: <span className="font-bold">{config.slots.examScreen || '8635186043'}</span>
                  </div>
                </div>
              </div>

              {/* Policy Compliance Notice */}
              <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-600 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-stone-900 mb-1">
                    {isMr ? 'गुगल ॲडसेन्सचे पॉलिसी संरक्षण (Policy Safe)' : 'Policy Safe Implementation'}
                  </h5>
                  <p>
                    {isMr 
                      ? 'परीक्षेच्या चालू स्क्रीनवर (Exam Active Screen) कोणतीही विचलित करणारी जाहिरात लावली जात नाही, ज्यामुळे विद्यार्थ्यांचे लक्ष विचलित होत नाही आणि ॲडसेन्सचे "Accidental Click Policy" १००% पाळले जाते.'
                      : 'No disruptive ads during active test timer. Fully compliant with Google AdSense user experience policies.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IDs & Slot Config */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Publisher ID Input */}
              <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3">
                <div>
                  <label className="text-xs sm:text-sm font-extrabold text-stone-900 block">
                    {isMr ? 'गुगल ॲडसेन्स पब्लिशर क्लायंट आयडी (Publisher Client ID)' : 'Google AdSense Publisher Client ID'}
                  </label>
                  <span className="text-xs text-stone-500">
                    {isMr ? 'तुमच्या Google AdSense खात्यातील अधिकृत ca-pub आयडी टाका' : 'Your official ca-pub ID from Google AdSense Console'}
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={config.publisherId}
                    onChange={(e) => setConfig({ ...config, publisherId: e.target.value.trim() })}
                    placeholder="ca-pub-8635186039357683"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 font-mono text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Slot IDs Mapping */}
              <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-4">
                <h4 className="text-xs sm:text-sm font-extrabold text-stone-900">
                  {isMr ? 'जाहिरात स्लॉट आयडी (Ad Unit Slot IDs)' : 'Ad Unit Slot IDs'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Header Slot */}
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {isMr ? '१. हेडर बॅनर स्लॉट' : '1. Header Slot'}
                    </label>
                    <input
                      type="text"
                      value={config.slots.header}
                      onChange={(e) => setConfig({
                        ...config,
                        slots: { ...config.slots, header: e.target.value.trim() }
                      })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Result Slot */}
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {isMr ? '२. निकाल स्क्रीन स्लॉट' : '2. Result Slot'}
                    </label>
                    <input
                      type="text"
                      value={config.slots.examResult}
                      onChange={(e) => setConfig({
                        ...config,
                        slots: { ...config.slots, examResult: e.target.value.trim() }
                      })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Dashboard Slot */}
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {isMr ? '३. डॅशबोर्ड स्लॉट' : '3. Dashboard Slot'}
                    </label>
                    <input
                      type="text"
                      value={config.slots.dashboard}
                      onChange={(e) => setConfig({
                        ...config,
                        slots: { ...config.slots, dashboard: e.target.value.trim() }
                      })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Footer Slot */}
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {isMr ? '४. फुटर स्लॉट' : '4. Footer Slot'}
                    </label>
                    <input
                      type="text"
                      value={config.slots.footer}
                      onChange={(e) => setConfig({
                        ...config,
                        slots: { ...config.slots, footer: e.target.value.trim() }
                      })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Exam Screen Slot */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-emerald-800 block mb-1">
                      {isMr ? '५. परीक्षा प्रश्न व निकाल ऑटो-स्लॉट (Exam & Result Screen Slot)' : '5. Exam & Result Screen Slot'}
                    </label>
                    <input
                      type="text"
                      value={config.slots.examScreen || '8635186043'}
                      onChange={(e) => setConfig({
                        ...config,
                        slots: { ...config.slots, examScreen: e.target.value.trim() }
                      })}
                      className="w-full px-3 py-2 rounded-xl border border-emerald-400 font-mono text-xs focus:ring-2 focus:ring-emerald-500 bg-emerald-50/30"
                    />
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3">
                <h4 className="text-xs sm:text-sm font-extrabold text-stone-900">
                  {isMr ? 'जाहिरात जागा चालू / बंद (Placements Controls)' : 'Placement Controls'}
                </h4>

                <div className="space-y-2.5">
                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200 cursor-pointer">
                    <span className="text-xs font-bold text-stone-800">
                      {isMr ? 'सर्व जाहिराती चालू ठेवा (Master Toggle)' : 'Enable All Ads'}
                    </span>
                    <input
                      type="checkbox"
                      checked={config.enabled}
                      onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200 cursor-pointer">
                    <div>
                      <span className="text-xs font-bold text-emerald-900 block">
                        {isMr ? 'प्रश्न सोडवताना व रिझल्ट स्क्रीनवर जाहिराती दाखवा (Exam Auto-Slot)' : 'Show Ads on Exam & Result Screens'}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        {isMr ? 'विद्यार्थी प्रश्न सोडवत असताना व रिझल्ट पाहताना अधिकृत गुगल जाहिराती सक्रिय राहतील' : 'Activates responsive ads on test solving and review screens'}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.placements.examScreen !== false}
                      onChange={(e) => setConfig({
                        ...config,
                        placements: { ...config.placements, examScreen: e.target.checked }
                      })}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200 cursor-pointer">
                    <div>
                      <span className="text-xs font-bold text-stone-800 block">
                        {isMr ? 'रिकाम्या जागी शैक्षणिक प्रायोजक कार्ड दाखवा' : 'Show Educational Sponsor Card When Empty'}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        {isMr ? 'ॲडसेन्स लोड होत नसताना किंवा रिव्ह्यूमध्ये असताना रिकामी पांढरी जागा न दिसता सुंदर संदर्भ पुस्तकांची माहिती दिसेल' : 'Never leaves an ugly empty blank space'}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.showFallbackWhenEmpty}
                      onChange={(e) => setConfig({ ...config, showFallbackWhenEmpty: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                    />
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isMr ? 'डिफॉल्ट रिसेट करा' : 'Reset to Defaults'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md cursor-pointer transition-transform active:scale-95"
                >
                  <Check className="w-4 h-4" />
                  <span>{isMr ? 'सेटिंग्ज सेव्ह करा' : 'Save Configurations'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: ads.txt */}
          {activeTab === 'ads_txt' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300/60">
                <h4 className="text-sm font-black text-amber-950 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-600" />
                  <span>{isMr ? 'ads.txt म्हणजे काय आणि हे का आवश्यक आहे?' : 'What is ads.txt and why is it required?'}</span>
                </h4>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  {isMr 
                    ? 'गुगल ॲडसेन्स खात्यामध्ये "Earnings at risk - You need to fix some ads.txt file issues" असा मेसेज येऊ नये म्हणून तुमच्या डोमेनच्या मुख्य रूटवर (उदा. yourdomain.com/ads.txt) ही ओळ जोडणे बंधनकारक असते.'
                    : 'The ads.txt file authorizes Google to sell ads on your domain and protects your advertising earnings.'}
                </p>
              </div>

              {/* Copy snippet box */}
              <div className="p-5 rounded-2xl border border-stone-200 bg-stone-900 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-stone-400">ads.txt Code Snippet:</span>
                  <button
                    type="button"
                    onClick={handleCopyAdsTxt}
                    className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    {copiedAdsTxt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAdsTxt ? (isMr ? 'कॉपी झाले!' : 'Copied!') : (isMr ? 'कोड कॉपी करा' : 'Copy Code')}</span>
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-stone-950 font-mono text-xs sm:text-sm text-amber-300 overflow-x-auto select-all">
                  {generateAdsTxtSnippet(config.publisherId || DEFAULT_ADSENSE_CONFIG.publisherId)}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs text-stone-600">
                <h5 className="font-bold text-stone-900">
                  {isMr ? 'हे कुठे टाकायचे?' : 'How to place this file?'}
                </h5>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>तुमच्या होस्टिंग / सर्व्हरवर <code>public/ads.txt</code> नावाची टेक्स्ट फाईल बनवा.</li>
                  <li>त्यामध्ये वरील एक ओळ पेस्ट करा.</li>
                  <li>ब्राउझरमध्ये <code>yourdomain.com/ads.txt</code> उघडून तपासा, ही ओळ दिसली पाहिजे.</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 4: Approval Guide */}
          {activeTab === 'guide' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900">
                <h4 className="text-sm font-black flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{isMr ? 'Google AdSense 100% मंजुरीसाठी आवश्यक ५ सोनेरी नियम' : '5 Golden Rules for 100% AdSense Approval'}</span>
                </h4>
                <p className="text-xs text-emerald-800 mt-1">
                  {isMr ? 'तुमची वेबसाइट ॲडसेन्ससाठी सबमिट करण्यापूर्वी खालील चेकलिस्ट तपासा:' : 'Verify this checklist before submitting your site to Google:'}
                </p>
              </div>

              <div className="space-y-3">
                {/* 1 */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-white flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center shrink-0">
                    १
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-extrabold text-stone-900">
                      कायदेशीर धोरण पेजेस (Legal Policy Pages)
                    </h5>
                    <p className="text-xs text-stone-600 mt-0.5">
                      गुगल ॲडसेन्ससाठी <strong>Privacy Policy, Terms of Service आणि About Us</strong> पेजेस असणे १००% सक्तीचे आहे. हे तीनही पेजेस तुमच्या ॲपच्या फुटरमध्ये आधीच तयार आहेत!
                    </p>
                  </div>
                </div>

                {/* 2 */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-white flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center shrink-0">
                    २
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-extrabold text-stone-900">
                      कस्टम डोमेन (Custom Domain Name)
                    </h5>
                    <p className="text-xs text-stone-600 mt-0.5">
                      ॲडसेन्स मंजुरी मिळवण्यासाठी एक चांगला कस्टम डोमेन (उदा. <code>mpscaspirantprep.in</code> किंवा <code>mpsctoppers.com</code>) जोडा. <code>.in</code> किंवा <code>.com</code> डोमेन लवकर मंजूर होतात.
                    </p>
                  </div>
                </div>

                {/* 3 */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-white flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center shrink-0">
                    ३
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-extrabold text-stone-900">
                      सेंद्रिय विद्यार्थी ट्रॅफिक (Organic Student Traffic)
                    </h5>
                    <p className="text-xs text-stone-600 mt-0.5">
                      दररोज किमान १०० ते ५०० विद्यार्थी ॲपवर यायला हवेत. यासाठी टेलिग्राम MPSC ग्रुप्स आणि व्हॉट्सॲपवर क्विझच्या लिंक्स दररोज शेअर करा.
                    </p>
                  </div>
                </div>

                {/* 4 */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-white flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center shrink-0">
                    ४
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-extrabold text-stone-900">
                      क्लिक करण्याची सक्ती करू नका (No Click Fraud)
                    </h5>
                    <p className="text-xs text-stone-600 mt-0.5">
                      स्वतःच्या जाहिरातींवर स्वतः कधीही क्लिक करू नका किंवा मित्रांना *"जाहिरातींवर क्लिक करा"* असे सांगू नका. गुगलचे AI लगेच अकाऊंट बॅन करते.
                    </p>
                  </div>
                </div>

                {/* 5 */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-white flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center shrink-0">
                    ५
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-extrabold text-stone-900">
                      AdSense Dashboard मध्ये साइट जोडणे
                    </h5>
                    <p className="text-xs text-stone-600 mt-0.5">
                      <a 
                        href="https://adsense.google.com" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-amber-600 underline font-bold"
                      >
                        adsense.google.com
                      </a> वर जाऊन <strong>Sites ➔ Add Site</strong> वर क्लिक करून तुमच्या ॲपची लिंक जोडा आणि रिव्ह्यूसाठी पाठवा. साधारण १ ते २ आठवड्यांत मान्यता मिळते!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-stone-200 bg-stone-50 flex items-center justify-between shrink-0">
          <div className="text-xs text-stone-500 font-medium">
            {isMr ? 'गुगल ॲडसेन्स पार्टनरशिप v2.0' : 'Google AdSense Partner v2.0'}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold cursor-pointer transition-colors"
          >
            {isMr ? 'बंद करा' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
