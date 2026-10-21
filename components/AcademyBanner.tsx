import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ExternalLink, 
  Sparkles, 
  Settings2, 
  X, 
  Check, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  ShieldCheck, 
  RotateCcw,
  ArrowRight,
  MessageCircle
} from 'lucide-react';

export interface AcademyBannerConfig {
  image: string;
  clickUrl: string;
  title: string;
  subtitle?: string;
  badgeText?: string;
  buttonText?: string;
  whatsappNumber?: string;
}

export const DEFAULT_ACADEMY_BANNER_CONFIG: AcademyBannerConfig = {
  image: '/mpsc_textbooks.jpg',
  clickUrl: 'https://mpscsathi.online',
  title: 'ज्ञानप्रबोधिनी व आकार करिअर अकॅडमी • MPSC २०२६-२७ विशेष बॅचेस',
  subtitle: 'पुणे व छत्रपती संभाजीनगर • माजी सनदी अधिकारी व तज्ज्ञ मार्गदर्शकांचे वर्ग • मर्यादित ५० जागा प्रवेश सुरू',
  badgeText: '👑 ॲडमिन पार्टनर अकॅडमी बॅनर',
  buttonText: 'अधिकृत वेबसाईट / बॅच माहिती ➜',
  whatsappNumber: '919860353056'
};

const STORAGE_KEY = 'mpsc_admin_academy_banner_config';

export const getStoredAcademyBannerConfig = (): AcademyBannerConfig => {
  if (typeof window === 'undefined') return DEFAULT_ACADEMY_BANNER_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed.whatsappNumber || parsed.whatsappNumber === '919822012345') {
        parsed.whatsappNumber = '919860353056';
      }
      return { ...DEFAULT_ACADEMY_BANNER_CONFIG, ...parsed };
    }
  } catch (e) {
    console.error('Error reading stored academy banner config:', e);
  }
  return DEFAULT_ACADEMY_BANNER_CONFIG;
};

export const saveStoredAcademyBannerConfig = (config: AcademyBannerConfig) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    window.dispatchEvent(new CustomEvent('mpsc-academy-banner-updated', { detail: config }));
  } catch (e) {
    console.error('Error saving academy banner config:', e);
  }
};

export interface AcademyBannerProps {
  image?: string;
  clickUrl?: string;
  title?: string;
  subtitle?: string;
  badgeText?: string;
  buttonText?: string;
  whatsappNumber?: string;
  isAdmin?: boolean;
  language?: 'mr' | 'en';
  className?: string;
  bannerConfig?: Partial<AcademyBannerConfig>;
  onEditConfig?: () => void;
}

export const AcademyBanner: React.FC<AcademyBannerProps> = ({
  image,
  clickUrl,
  title,
  subtitle,
  badgeText,
  buttonText,
  whatsappNumber,
  isAdmin,
  language = 'mr',
  className = '',
  bannerConfig,
  onEditConfig
}) => {
  const isMr = language === 'mr';
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [storedConfig, setStoredConfig] = useState<AcademyBannerConfig>(getStoredAcademyBannerConfig);

  // Sync config updates
  useEffect(() => {
    const handleConfigUpdated = (e: any) => {
      if (e?.detail) {
        setStoredConfig(e.detail);
      } else {
        setStoredConfig(getStoredAcademyBannerConfig());
      }
    };

    window.addEventListener('mpsc-academy-banner-updated', handleConfigUpdated);
    window.addEventListener('storage', handleConfigUpdated);
    return () => {
      window.removeEventListener('mpsc-academy-banner-updated', handleConfigUpdated);
      window.removeEventListener('storage', handleConfigUpdated);
    };
  }, []);

  // Compute final effective configuration (Props take precedence over stored config, which takes precedence over default)
  const effectiveConfig: AcademyBannerConfig = {
    image: image || bannerConfig?.image || storedConfig.image || DEFAULT_ACADEMY_BANNER_CONFIG.image,
    clickUrl: clickUrl || bannerConfig?.clickUrl || storedConfig.clickUrl || DEFAULT_ACADEMY_BANNER_CONFIG.clickUrl,
    title: title || bannerConfig?.title || storedConfig.title || DEFAULT_ACADEMY_BANNER_CONFIG.title,
    subtitle: subtitle || bannerConfig?.subtitle || storedConfig.subtitle || DEFAULT_ACADEMY_BANNER_CONFIG.subtitle,
    badgeText: badgeText || bannerConfig?.badgeText || storedConfig.badgeText || (isMr ? '👑 ॲडमिन अकॅडमी बॅनर (Admin Only)' : '👑 Admin Academy Banner'),
    buttonText: buttonText || bannerConfig?.buttonText || storedConfig.buttonText || (isMr ? 'अधिकृत बॅच माहिती ➜' : 'Visit Academy Site ➜'),
    whatsappNumber: whatsappNumber || bannerConfig?.whatsappNumber || storedConfig.whatsappNumber || DEFAULT_ACADEMY_BANNER_CONFIG.whatsappNumber || '919860353056'
  };

  // Form editing state
  const [formImage, setFormImage] = useState<string>(effectiveConfig.image);
  const [formClickUrl, setFormClickUrl] = useState<string>(effectiveConfig.clickUrl);
  const [formTitle, setFormTitle] = useState<string>(effectiveConfig.title);
  const [formSubtitle, setFormSubtitle] = useState<string>(effectiveConfig.subtitle || '');
  const [formButtonText, setFormButtonText] = useState<string>(effectiveConfig.buttonText || '');
  const [formWhatsappNumber, setFormWhatsappNumber] = useState<string>(effectiveConfig.whatsappNumber || '919860353056');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // 🔴 STRICT PRIVILEGE REQUIREMENT: If isAdmin is not true, return NULL!
  // It remains 100% hidden for regular students.
  if (!isAdmin) {
    return null;
  }

  const handleOpenEditor = () => {
    setFormImage(effectiveConfig.image);
    setFormClickUrl(effectiveConfig.clickUrl);
    setFormTitle(effectiveConfig.title);
    setFormSubtitle(effectiveConfig.subtitle || '');
    setFormButtonText(effectiveConfig.buttonText || '');
    setFormWhatsappNumber(effectiveConfig.whatsappNumber || '919860353056');
    setIsEditorOpen(true);
    if (onEditConfig) onEditConfig();
  };

  const handleSaveEditor = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: AcademyBannerConfig = {
      image: formImage.trim() || DEFAULT_ACADEMY_BANNER_CONFIG.image,
      clickUrl: formClickUrl.trim() || DEFAULT_ACADEMY_BANNER_CONFIG.clickUrl,
      title: formTitle.trim() || DEFAULT_ACADEMY_BANNER_CONFIG.title,
      subtitle: formSubtitle.trim() || DEFAULT_ACADEMY_BANNER_CONFIG.subtitle,
      badgeText: effectiveConfig.badgeText,
      buttonText: formButtonText.trim() || DEFAULT_ACADEMY_BANNER_CONFIG.buttonText,
      whatsappNumber: formWhatsappNumber.trim() || '919860353056'
    };
    saveStoredAcademyBannerConfig(updated);
    setStoredConfig(updated);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditorOpen(false);
    }, 1000);
  };

  const handleResetDefaults = () => {
    setFormImage(DEFAULT_ACADEMY_BANNER_CONFIG.image);
    setFormClickUrl(DEFAULT_ACADEMY_BANNER_CONFIG.clickUrl);
    setFormTitle(DEFAULT_ACADEMY_BANNER_CONFIG.title);
    setFormSubtitle(DEFAULT_ACADEMY_BANNER_CONFIG.subtitle || '');
    setFormButtonText(DEFAULT_ACADEMY_BANNER_CONFIG.buttonText || '');
    setFormWhatsappNumber(DEFAULT_ACADEMY_BANNER_CONFIG.whatsappNumber || '919860353056');
  };

  return (
    <>
      <div 
        id="admin-academy-banner" 
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-stone-950 via-amber-950/40 to-stone-950 border-2 border-amber-500/60 shadow-xl transition-all ${className}`}
      >
        {/* Admin Header Indicator Strip */}
        <div className="bg-gradient-to-r from-amber-500/25 via-amber-500/15 to-transparent px-4 py-1.5 border-b border-amber-500/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-black text-amber-300 text-[11px] uppercase tracking-wider">
              <span>👑</span>
              <span>{isMr ? 'ॲडमिन व्ह्यू: अकॅडमी प्रायोजक बॅनर (Admin Exclusive)' : 'Admin View: Academy Sponsor Banner'}</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] text-stone-400 bg-stone-900/80 px-2 py-0.5 rounded border border-stone-800">
              {isMr ? 'सामान्य विद्यार्थ्यांना दिसत नाही' : 'Hidden from students'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenEditor}
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-amber-200 border border-amber-500/40 text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="बॅनर माहिती बदला (Edit Banner)"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>{isMr ? 'बॅनर बदला (Edit)' : 'Configure Banner'}</span>
            </button>
          </div>
        </div>

        {/* Main Banner Content Body */}
        <div className="p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full">
            {/* Academy Thumbnail Image */}
            <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-amber-400/50 shadow-md bg-stone-900 group">
              <img
                src={effectiveConfig.image}
                alt={effectiveConfig.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/mpsc_textbooks.jpg';
                }}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-1 right-1 bg-stone-950/80 rounded px-1 text-[9px] font-bold text-amber-300 flex items-center gap-0.5">
                <Building2 className="w-2.5 h-2.5" />
                <span>MPSC</span>
              </div>
            </div>

            {/* Banner Titles and Subtitle */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{effectiveConfig.badgeText}</span>
              </div>

              <h2 className="text-base sm:text-lg font-black text-white leading-snug tracking-tight">
                {effectiveConfig.title}
              </h2>

              {effectiveConfig.subtitle && (
                <p className="text-xs sm:text-sm text-stone-300 mt-1 line-clamp-2 leading-relaxed">
                  {effectiveConfig.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto shrink-0 justify-end pt-1 md:pt-0">
            {effectiveConfig.whatsappNumber && (
              <a
                href={`https://wa.me/${effectiveConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  isMr
                    ? `नमस्ते! मला ${effectiveConfig.title} बाबत माहिती हवी आहे.`
                    : `Hello! I would like to inquire about ${effectiveConfig.title}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95 group"
                title="WhatsApp वर थेट संपर्क साधा"
              >
                <MessageCircle className="w-4 h-4 text-stone-950 shrink-0" />
                <span>{isMr ? 'WhatsApp: ९८६०३५३०५६' : 'WhatsApp: 9860353056'}</span>
              </a>
            )}

            <a
              href={effectiveConfig.clickUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95 group"
            >
              <span>{effectiveConfig.buttonText}</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* Admin Banner Configuration Modal */}
      {isEditorOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsEditorOpen(false);
          }}
        >
          <div className="w-full max-w-lg bg-stone-900 border border-amber-500/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-white">
            {/* Modal Header */}
            <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Settings2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    {isMr ? '👑 अकॅडमी बॅनर कॉन्फिगरेशन' : 'Academy Banner Configuration'}
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    {isMr ? 'इमेज, क्लिक URL व टायटल थेट सेट करा (फक्त ॲडमिनसाठी)' : 'Set image, click URL, and title (Admin Exclusive)'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveEditor} className="p-4 sm:p-5 space-y-4 overflow-y-auto">
              {saveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 font-bold animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{isMr ? 'बॅनर कॉन्फिगरेशन सेव्ह झाले!' : 'Banner configuration saved successfully!'}</span>
                </div>
              )}

              {/* Title Input */}
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">
                  {isMr ? '१. अकॅडमी बॅनर टायटल (Title)' : '1. Banner Title'}
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="उदा. ज्ञानप्रबोधिनी MPSC राज्यसेवा व संयुक्त बॅच"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs sm:text-sm text-stone-100 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              {/* Click URL Input */}
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1 flex items-center justify-between">
                  <span>{isMr ? '२. क्लिक URL (Destination Link)' : '2. Click URL'}</span>
                  <span className="text-[10px] text-stone-400 font-mono">https://...</span>
                </label>
                <div className="relative">
                  <LinkIcon className="w-4 h-4 absolute left-3 top-2.5 text-stone-500" />
                  <input
                    type="url"
                    required
                    value={formClickUrl}
                    onChange={(e) => setFormClickUrl(e.target.value)}
                    placeholder="https://example-academy.com/mpsc-batch"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-hidden focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              {/* Image URL Input */}
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1 flex items-center justify-between">
                  <span>{isMr ? '३. बॅनर इमेज (Image URL)' : '3. Banner Image URL'}</span>
                  <span className="text-[10px] text-stone-400">किंवा /mpsc_textbooks.jpg</span>
                </label>
                <div className="relative">
                  <ImageIcon className="w-4 h-4 absolute left-3 top-2.5 text-stone-500" />
                  <input
                    type="text"
                    required
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="/mpsc_textbooks.jpg किंवा https://..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-hidden focus:border-amber-400 font-mono"
                  />
                </div>

                {/* Quick Presets for Image */}
                <div className="flex items-center gap-2 mt-2 flex-wrap text-[11px]">
                  <span className="text-stone-400 text-[10px]">{isMr ? 'तयार इमेजेस:' : 'Presets:'}</span>
                  <button
                    type="button"
                    onClick={() => setFormImage('/mpsc_textbooks.jpg')}
                    className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] cursor-pointer"
                  >
                    Textbooks
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormImage('/vintage_reference_books.jpg')}
                    className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] cursor-pointer"
                  >
                    Vintage Books
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormImage('/constitution_of_india.jpg')}
                    className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] cursor-pointer"
                  >
                    Constitution
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormImage('/stack_of_books.jpg')}
                    className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] cursor-pointer"
                  >
                    Stack
                  </button>
                </div>
              </div>

              {/* Subtitle Input */}
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">
                  {isMr ? '४. उपशीर्षक / टॅगलाईन (Subtitle / Tagline)' : '4. Subtitle / Tagline'}
                </label>
                <textarea
                  rows={2}
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  placeholder="उदा. सदाशिव पेठ, पुणे • १००+ टेस्ट पेपर्स व दररोज क्लास"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              {/* Button Text Input */}
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">
                  {isMr ? '५. बटण लेबल (Button Text)' : '5. Button Text'}
                </label>
                <input
                  type="text"
                  value={formButtonText}
                  onChange={(e) => setFormButtonText(e.target.value)}
                  placeholder="उदा. अधिकृत बॅच माहिती ➜"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              {/* WhatsApp Contact Number Input */}
              <div>
                <label className="block text-xs font-bold text-emerald-400 mb-1 flex items-center justify-between">
                  <span>{isMr ? '६. WhatsApp संपर्क क्रमांक (WhatsApp Number)' : '6. WhatsApp Contact Number'}</span>
                  <span className="text-[10px] text-stone-400 font-mono">९८६०३५३०५६</span>
                </label>
                <div className="relative">
                  <MessageCircle className="w-4 h-4 absolute left-3 top-2.5 text-emerald-500" />
                  <input
                    type="tel"
                    value={formWhatsappNumber}
                    onChange={(e) => setFormWhatsappNumber(e.target.value)}
                    placeholder="9860353056"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-hidden focus:border-emerald-400 font-mono"
                  />
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setFormWhatsappNumber('9860353056')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-bold border border-emerald-500/30 cursor-pointer transition-colors"
                  >
                    {isMr ? 'वापरा: ९८६०३५३०५६ (ॲडमिन अधिकृत नंबर)' : 'Use: 9860353056 (Admin Official)'}
                  </button>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isMr ? 'डिफॉल्ट करा' : 'Reset'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(false)}
                    className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 text-xs font-bold cursor-pointer"
                  >
                    {isMr ? 'रद्द करा' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isMr ? 'सेव्ह करा' : 'Save Changes'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AcademyBanner;
