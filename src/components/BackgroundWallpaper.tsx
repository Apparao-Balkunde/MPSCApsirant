import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Settings2, 
  Check, 
  Sparkles, 
  Eye, 
  EyeOff, 
  Sliders, 
  X,
  Upload,
  Layers,
  RotateCcw,
  Grid,
  CircleDot,
  Palette,
  Maximize2
} from 'lucide-react';

export type BackgroundPatternType = 'none' | 'dots' | 'grid' | 'noise' | 'diagonal_lines';

export interface BackgroundConfig {
  presetId: 'mantralaya' | 'raigad' | 'constitution' | 'library' | 'mpsc_books' | 'chhatrapati_shivaji' | 'custom' | 'none';
  customUrl?: string;
  opacity: number; // 0.05 to 0.50
  blur: number; // 0 to 8px
  overlayMode: 'vignette' | 'subtle_dark' | 'warm_amber' | 'soft_paper';
  pattern: BackgroundPatternType;
  patternOpacity: number; // 0.10 to 0.95
  patternColor: string; // e.g. '#18181b', '#ffffff', '#f59e0b'
  patternScale: number; // 0.5 to 2.5 (e.g. 0.5x to 2.5x)
  enabled: boolean;
}

export const PATTERN_COLOR_PRESETS = [
  { id: '#18181b', nameMr: 'चारकोल (Dark)', nameEn: 'Charcoal', hex: '#18181b' },
  { id: '#ffffff', nameMr: 'पांढरा (White)', nameEn: 'Chalk White', hex: '#ffffff' },
  { id: '#f59e0b', nameMr: 'अॅम्बर (Amber)', nameEn: 'Amber Gold', hex: '#f59e0b' },
  { id: '#1e3a8a', nameMr: 'नेव्ही (Navy)', nameEn: 'Deep Navy', hex: '#1e3a8a' },
  { id: '#047857', nameMr: 'हिरवा (Emerald)', nameEn: 'Emerald Green', hex: '#047857' },
  { id: '#c2410c', nameMr: 'ऑकर (Ochre)', nameEn: 'Ochre Saffron', hex: '#c2410c' },
  { id: '#64748b', nameMr: 'स्लेट (Slate)', nameEn: 'Muted Slate', hex: '#64748b' },
  { id: '#831843', nameMr: 'मरून (Maroon)', nameEn: 'Royal Maroon', hex: '#831843' },
];

export function hexToRgba(hex: string, alpha: number): string {
  let c = (hex || '#18181b').replace('#', '').trim();
  if (c.length === 3) {
    c = c.split('').map((x) => x + x).join('');
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return `rgba(24, 24, 27, ${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const PATTERN_OPTIONS = [
  {
    id: 'none' as const,
    titleMr: 'काहीही नाही (स्वच्छ)',
    titleEn: 'Clean (None)',
    descMr: 'केवळ मूळ छायाचित्र आणि प्रकाश ओव्हरले',
    descEn: 'Pure image without any geometric texture',
    badge: 'Pure',
  },
  {
    id: 'dots' as const,
    titleMr: 'सूक्ष्म डॉट्स (Dot Matrix)',
    titleEn: 'Subtle Dot Matrix',
    descMr: 'आधुनिक डॉट ग्रिडमुळे डोळ्यांना ताण येत नाही व मजकूर उठून दिसतो',
    descEn: 'Even micro-dots break glare and significantly boost readability',
    badge: 'Popular',
  },
  {
    id: 'grid' as const,
    titleMr: 'ग्राफ ग्रिड (Architectural Grid)',
    titleEn: 'Blueprint Grid',
    descMr: 'प्रशासकीय नकाशा व तांत्रिक आलेख पेपरचा सूक्ष्म प्रभाव',
    descEn: 'Clean geometric lines framing complex background photos',
    badge: 'Technical',
  },
  {
    id: 'noise' as const,
    titleMr: 'फिल्म ग्रेन (Paper Grain / Noise)',
    titleEn: 'Subtle Film Grain',
    descMr: 'पुस्तकाचे अस्सल कागदी टेक्सचर ज्यामुळे फोटो सौम्य होतो',
    descEn: 'Organic paper texture eliminating harsh photo gradients',
    badge: 'Soft',
  },
  {
    id: 'diagonal_lines' as const,
    titleMr: 'तिरप्या रेषा (Diagonal Hatch)',
    titleEn: 'Diagonal Hatch',
    descMr: '४५ अंशातील सूक्ष्म रेषा जे दृश्याला खोली देतात',
    descEn: 'Subtle 45-degree angle lines creating elegant visual depth',
    badge: 'Dynamic',
  },
];

export function getPatternStyle(
  pattern: BackgroundPatternType, 
  opacity: number, 
  patternColor = '#18181b',
  patternScale = 1.0
): React.CSSProperties {
  const color = patternColor || '#18181b';
  const scale = Math.max(0.4, Math.min(3.0, patternScale || 1.0));
  
  // Extract RGB components for SVG color matrix
  let c = color.replace('#', '').trim();
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  const num = parseInt(c, 16);
  const r = !isNaN(num) ? (num >> 16) & 255 : 24;
  const g = !isNaN(num) ? (num >> 8) & 255 : 24;
  const b = !isNaN(num) ? num & 255 : 27;

  const rNorm = (r / 255).toFixed(2);
  const gNorm = (g / 255).toFixed(2);
  const bNorm = (b / 255).toFixed(2);

  switch (pattern) {
    case 'dots': {
      const dotRadius = Math.max(0.75, 1.25 * Math.sqrt(scale)).toFixed(2);
      const dotSpacing = Math.round(18 * scale);
      return {
        backgroundImage: `radial-gradient(${hexToRgba(color, 0.45)} ${dotRadius}px, transparent ${dotRadius}px)`,
        backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
        opacity,
      };
    }
    case 'grid': {
      const gridSpacing = Math.round(24 * scale);
      const lineWidth = scale >= 2.0 ? 1.5 : 1;
      return {
        backgroundImage: `
          linear-gradient(to right, ${hexToRgba(color, 0.22)} ${lineWidth}px, transparent ${lineWidth}px),
          linear-gradient(to bottom, ${hexToRgba(color, 0.22)} ${lineWidth}px, transparent ${lineWidth}px)
        `,
        backgroundSize: `${gridSpacing}px ${gridSpacing}px`,
        opacity,
      };
    }
    case 'noise': {
      const freq = (0.8 / Math.sqrt(scale)).toFixed(3);
      const tileSize = Math.round(200 * scale);
      return {
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 ${tileSize} ${tileSize}' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 ${rNorm} 0 0 0 0 ${gNorm} 0 0 0 0 ${bNorm} 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: `${tileSize}px ${tileSize}px`,
        opacity,
      };
    }
    case 'diagonal_lines': {
      const hatchSpacing = Math.round(12 * scale);
      const lineWidth = scale >= 2.0 ? 1.5 : 1;
      return {
        backgroundImage: `repeating-linear-gradient(45deg, ${hexToRgba(color, 0.15)} 0, ${hexToRgba(color, 0.15)} ${lineWidth}px, transparent 0, transparent ${hatchSpacing}px)`,
        opacity,
      };
    }
    case 'none':
    default:
      return { display: 'none' };
  }
}

export const PRESET_BACKGROUNDS = [
  {
    id: 'raigad' as const,
    titleMr: 'किल्ले रायगड (स्वराज्य राजधानी)',
    titleEn: 'Raigad Fort (Capital of Swarajya)',
    subtitleMr: 'छत्रपती शिवाजी महाराज प्रेरणा व सह्याद्रीचे वैभव',
    subtitleEn: 'Inspiration of Chhatrapati Shivaji Maharaj',
    src: '/raigad_fort.jpg',
    badgeMr: '🚩 ऐतिहासिक प्रेरणा',
    badgeEn: '🚩 Historic Heritage',
  },
  {
    id: 'mantralaya' as const,
    titleMr: 'मंत्रालय (महाराष्ट्र शासन)',
    titleEn: 'Mantralaya (Govt. of Maharashtra)',
    subtitleMr: 'महाराष्ट्र राज्य प्रशासनाचे मुख्य केंद्र (मुंबई)',
    subtitleEn: 'Apex Administrative Headquarters of Maharashtra',
    src: '/mantralaya.jpg',
    badgeMr: '🏛️ प्रशासकीय ध्येय',
    badgeEn: '🏛️ Cadre Goal',
  },
  {
    id: 'constitution' as const,
    titleMr: 'भारतीय संविधान (Constitution of India)',
    titleEn: 'Constitution of India',
    subtitleMr: 'डॉ. बाबासाहेब आंबेडकर व संविधानाचे मूळ तत्वज्ञान',
    subtitleEn: 'Core Constitutional & Polity Foundation',
    src: '/constitution_of_india.jpg',
    badgeMr: '⚖️ राज्यव्यवस्था',
    badgeEn: '⚖️ Constitution',
  },
  {
    id: 'library' as const,
    titleMr: 'भव्य अभ्यासिका व ग्रंथालय',
    titleEn: 'Grand Civil Services Library',
    subtitleMr: 'शांत, एकाग्र आणि उच्च ध्येयाचे अभ्यास वातावरण',
    subtitleEn: 'Serene & Focused Academic Atmosphere',
    src: '/library_books.jpg',
    badgeMr: '📚 अभ्यासिका',
    badgeEn: '📚 Central Library',
  },
  {
    id: 'mpsc_books' as const,
    titleMr: 'एमपीएससी संदर्भ साहित्य व पुस्तके',
    titleEn: 'MPSC Reference Literature',
    subtitleMr: 'राज्यसेवा व संयुक्त गट-ब/क मानक संदर्भ ग्रंथ',
    subtitleEn: 'Standard Reference Books & Syllabi',
    src: '/mpsc_textbooks.jpg',
    badgeMr: '📖 संदर्भ ग्रंथ',
    badgeEn: '📖 Standard Books',
  },
  {
    id: 'chhatrapati_shivaji' as const,
    titleMr: 'छत्रपती शिवाजी महाराज',
    titleEn: 'Chhatrapati Shivaji Maharaj',
    subtitleMr: 'प्रशासकीय नीतिमत्ता आणि जनकल्याणकारी राज्यव्यवस्था',
    subtitleEn: 'Administrative Ethics & Welfare Governance',
    src: '/chhatrapati_shivaji_maharaj.jpg',
    badgeMr: '👑 लोककल्याण',
    badgeEn: '👑 Good Governance',
  },
];

const DEFAULT_CONFIG: BackgroundConfig = {
  presetId: 'raigad',
  opacity: 0.18,
  blur: 1,
  overlayMode: 'vignette',
  pattern: 'dots',
  patternOpacity: 0.55,
  patternColor: '#18181b',
  patternScale: 1.0,
  enabled: true,
};

const STORAGE_KEY = 'mpsc_portal_background_config';

export function getStoredBackgroundConfig(): BackgroundConfig {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      return { 
        ...DEFAULT_CONFIG, 
        ...parsed,
        pattern: parsed.pattern || DEFAULT_CONFIG.pattern,
        patternOpacity: parsed.patternOpacity !== undefined ? parsed.patternOpacity : DEFAULT_CONFIG.patternOpacity,
        patternColor: parsed.patternColor || DEFAULT_CONFIG.patternColor,
        patternScale: typeof parsed.patternScale === 'number' ? parsed.patternScale : DEFAULT_CONFIG.patternScale,
      };
    }
  } catch (e) {
    console.warn('Failed to read background config:', e);
  }
  return DEFAULT_CONFIG;
}

export function saveStoredBackgroundConfig(config: BackgroundConfig) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      window.dispatchEvent(new Event('mpsc_background_changed'));
    }
  } catch (e) {
    console.warn('Failed to save background config:', e);
  }
}

interface BackgroundWallpaperProps {
  language: 'mr' | 'en';
}

export const BackgroundWallpaper: React.FC<BackgroundWallpaperProps> = ({ language }) => {
  const [config, setConfig] = useState<BackgroundConfig>(getStoredBackgroundConfig);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const isMr = language === 'mr';

  useEffect(() => {
    const handleStorageChange = () => {
      setConfig(getStoredBackgroundConfig());
    };
    window.addEventListener('mpsc_background_changed', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('mpsc_images_updated', handleStorageChange);
    return () => {
      window.removeEventListener('mpsc_background_changed', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('mpsc_images_updated', handleStorageChange);
    };
  }, []);

  const handleUpdateConfig = (newPartial: Partial<BackgroundConfig>) => {
    const updated = { ...config, ...newPartial };
    setConfig(updated);
    saveStoredBackgroundConfig(updated);
  };

  // Determine target image source from config
  let targetImageSrc: string | null = null;
  if (config.presetId !== 'none') {
    if (config.presetId === 'custom' && config.customUrl) {
      targetImageSrc = config.customUrl;
    } else {
      const matched = PRESET_BACKGROUNDS.find((p) => p.id === config.presetId);
      targetImageSrc = matched ? matched.src : PRESET_BACKGROUNDS[0].src;
    }
  }

  // Crossfade state for ultra-smooth transition when background changes
  const [activeSrc, setActiveSrc] = useState<string | null>(targetImageSrc);
  const [previousSrc, setPreviousSrc] = useState<string | null>(null);
  const [isCrossfading, setIsCrossfading] = useState<boolean>(false);

  useEffect(() => {
    if (targetImageSrc !== activeSrc) {
      if (activeSrc) {
        setPreviousSrc(activeSrc);
        setIsCrossfading(true);
      }
      setActiveSrc(targetImageSrc);

      const timer = setTimeout(() => {
        setPreviousSrc(null);
        setIsCrossfading(false);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [targetImageSrc, activeSrc]);

  return (
    <>
      {/* Fixed Ambient Background Layer with smooth crossfade and fade-in */}
      <div 
        className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-opacity duration-700 ease-in-out ${
          config.enabled && (activeSrc || previousSrc) ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        {/* Previous Image Layer (Fades out gracefully during crossfade) */}
        {previousSrc && (
          <img
            key={`prev-${previousSrc}`}
            src={previousSrc}
            alt="MPSC Portal Background Previous"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 pointer-events-none"
            style={{
              opacity: isCrossfading ? 0 : config.opacity,
              filter: config.blur > 0 ? `blur(${config.blur}px)` : undefined,
              transition: 'opacity 750ms cubic-bezier(0.4, 0, 0.2, 1), filter 750ms ease',
              willChange: 'opacity, filter',
            }}
          />
        )}

        {/* Active Image Layer (Fades in gracefully) */}
        {activeSrc && (
          <img
            key={`active-${activeSrc}`}
            src={activeSrc}
            alt="MPSC Portal Background"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 pointer-events-none"
            style={{
              opacity: config.opacity,
              filter: config.blur > 0 ? `blur(${config.blur}px)` : undefined,
              transition: 'opacity 750ms cubic-bezier(0.4, 0, 0.2, 1), filter 750ms ease',
              willChange: 'opacity, filter',
            }}
          />
        )}

        {/* Subtle Texture & Pattern Mesh Layer to improve visual clarity on top of complex imagery */}
        {config.pattern !== 'none' && (
          <div 
            className="absolute inset-0 pointer-events-none transition-all duration-700 ease-in-out"
            style={getPatternStyle(config.pattern, config.patternOpacity ?? 0.55, config.patternColor ?? '#18181b', config.patternScale ?? 1.0)}
          />
        )}

        {/* Vignette & Ambient Color Overlays to guarantee perfect text contrast with smooth fade */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-all duration-700 ease-in-out ${
            config.overlayMode === 'vignette' 
              ? 'bg-radial from-transparent via-stone-100/50 to-stone-100/90 opacity-100' 
              : config.overlayMode === 'subtle_dark'
              ? 'bg-stone-950/20 backdrop-blur-[0.5px] opacity-100'
              : config.overlayMode === 'warm_amber'
              ? 'bg-gradient-to-b from-amber-500/5 via-transparent to-stone-100/80 opacity-100'
              : 'bg-stone-100/60 opacity-100'
          }`}
        />
      </div>

      {/* Floating Ambient Wallpaper Toggle Button */}
      <div className="fixed bottom-20 left-4 z-30">
        <button
          type="button"
          id="btn-portal-wallpaper-toggle"
          onClick={() => setIsPickerOpen(true)}
          className="bg-stone-900/90 hover:bg-stone-850 text-amber-300 hover:text-white px-3 py-2 rounded-full shadow-xl border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer group"
          title={isMr ? 'पार्श्वभूमी इमेज बदला (Background Wallpaper)' : 'Change Background Wallpaper'}
        >
          <ImageIcon className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline font-semibold">
            {isMr ? 'वॉलपेपर' : 'Wallpaper'}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>

      {/* Wallpaper Customizer Drawer / Modal */}
      {isPickerOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl bg-stone-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950/80 via-stone-900 to-stone-900 border-b border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                    <span>{isMr ? '🎨 पोर्टल पार्श्वभूमी इमेज (Background Wallpaper)' : '🎨 Portal Background Wallpaper'}</span>
                  </h3>
                  <p className="text-xs text-stone-300">
                    {isMr 
                      ? 'तुमच्या आवडीनुसार प्रेरणादायी वॉलपेपर निवडा किंवा स्वतःची इमेज लावा' 
                      : 'Choose an inspiring MPSC background or upload your own'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPickerOpen(false)}
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title={isMr ? 'बंद करा' : 'Close'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm text-stone-200">
              {/* Enable / Disable Switch */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-850 border border-stone-750">
                <div className="flex items-center gap-2.5">
                  {config.enabled ? (
                    <Eye className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-stone-400" />
                  )}
                  <span className="font-bold text-stone-100">
                    {isMr ? 'पार्श्वभूमी इमेज चालू ठेवा (Enable Background)' : 'Enable Background Wallpaper'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleUpdateConfig({ enabled: !config.enabled })}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                    config.enabled
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950'
                      : 'bg-stone-700 hover:bg-stone-600 text-stone-300'
                  }`}
                >
                  {config.enabled ? (isMr ? 'चालू (ON)' : 'ON') : (isMr ? 'बंद (OFF)' : 'OFF')}
                </button>
              </div>

              {/* Preset Gallery Grid */}
              <div>
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
                  {isMr ? '🌟 अधिकृत प्रेरणादायी वॉलपेपर निवडा' : '🌟 Choose Official MPSC Wallpaper'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {PRESET_BACKGROUNDS.map((preset) => {
                    const isSelected = config.presetId === preset.id && config.enabled;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleUpdateConfig({ presetId: preset.id, enabled: true })}
                        className={`group relative text-left rounded-xl overflow-hidden border-2 transition-all p-2 flex flex-col gap-2 cursor-pointer ${
                          isSelected
                            ? 'border-amber-400 bg-amber-500/15 ring-2 ring-amber-400/40 shadow-lg scale-[1.02]'
                            : 'border-stone-750 bg-stone-850 hover:border-amber-500/50 hover:bg-stone-800'
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="relative h-24 w-full rounded-lg overflow-hidden bg-stone-950">
                          <img
                            src={preset.src}
                            alt={isMr ? preset.titleMr : preset.titleEn}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-stone-900/80 text-amber-300 backdrop-blur-xs border border-amber-500/30">
                            {isMr ? preset.badgeMr : preset.badgeEn}
                          </div>
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-md">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        {/* Title & Description */}
                        <div>
                          <p className="font-bold text-stone-100 text-xs line-clamp-1">
                            {isMr ? preset.titleMr : preset.titleEn}
                          </p>
                          <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                            {isMr ? preset.subtitleMr : preset.subtitleEn}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Opacity & Blur Fine-tuning Sliders */}
              <div className="p-4 rounded-xl bg-stone-850 border border-stone-750 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-200 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    <span>{isMr ? 'पारदर्शकता व ठळकपणा (Opacity)' : 'Wallpaper Visibility (Opacity)'}</span>
                  </span>
                  <span className="text-amber-400 font-mono font-bold text-xs">
                    {Math.round(config.opacity * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.45"
                  step="0.02"
                  value={config.opacity}
                  onChange={(e) => handleUpdateConfig({ opacity: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>{isMr ? 'अति सुक्ष्म (5%)' : 'Subtle (5%)'}</span>
                  <span>{isMr ? 'मध्यम (20% - शिफारस)' : 'Balanced (20% - Recommended)'}</span>
                  <span>{isMr ? 'ठळक (45%)' : 'Vibrant (45%)'}</span>
                </div>

                {/* Blur Slider */}
                <div className="pt-2 border-t border-stone-750">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-stone-300">
                      {isMr ? 'ब्लर / मऊपणा (Blur Level)' : 'Soft Blur Focus'}
                    </span>
                    <span className="text-stone-300 font-mono text-xs">{config.blur}px</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[0, 1, 2, 4].map((blurVal) => (
                      <button
                        key={blurVal}
                        type="button"
                        onClick={() => handleUpdateConfig({ blur: blurVal })}
                        className={`flex-1 py-1 text-xs rounded-lg font-bold border transition-colors cursor-pointer ${
                          config.blur === blurVal
                            ? 'bg-amber-500 text-stone-950 border-amber-400'
                            : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-750'
                        }`}
                      >
                        {blurVal === 0 ? (isMr ? 'स्पष्ट' : 'Sharp') : `${blurVal}px`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Overlay Style */}
                <div className="pt-2 border-t border-stone-750">
                  <span className="text-xs text-stone-300 block mb-2">
                    {isMr ? 'कंट्रास्ट ओव्हरले (Contrast Shield)' : 'Contrast Shield Style'}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'vignette', mr: 'रेडियल शेड', en: 'Vignette' },
                      { id: 'warm_amber', mr: 'गोल्डन अॅम्बर', en: 'Warm Amber' },
                      { id: 'subtle_dark', mr: 'क्लासिक डार्क', en: 'Subtle Dark' },
                      { id: 'soft_paper', mr: 'सॉफ्ट लाइट', en: 'Soft Light' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleUpdateConfig({ overlayMode: item.id as any })}
                        className={`py-1.5 px-2 text-xs rounded-lg font-medium border text-center transition-colors cursor-pointer ${
                          config.overlayMode === item.id
                            ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                            : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-750'
                        }`}
                      >
                        {isMr ? item.mr : item.en}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Background Pattern Mesh Section (To improve visual clarity on top of complex imagery) */}
              <div className="p-4 rounded-xl bg-stone-850 border border-stone-750 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Grid className="w-4 h-4 text-amber-400" />
                    <div>
                      <h4 className="text-xs font-bold text-stone-100">
                        {isMr ? 'वाचनीयता वाढवण्यासाठी सूक्ष्म पॅटर्न (Visual Clarity Patterns)' : 'Clarity Pattern Mesh (Anti-Glare / Texture)'}
                      </h4>
                      <p className="text-[11px] text-stone-400">
                        {isMr 
                          ? 'जटिल छायाचित्रांवर अक्षरे ठळक व डोळ्यांना आरामदायी दिसण्यासाठी सूक्ष्म पॅटर्न निवडा'
                          : 'Overlays a geometric mesh on top of complex imagery to soften glare and keep text crisp'}
                      </p>
                    </div>
                  </div>

                  {config.pattern !== 'none' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {Math.round((config.patternOpacity ?? 0.55) * 100)}%
                    </span>
                  )}
                </div>

                {/* Pattern Selection Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-1">
                  {PATTERN_OPTIONS.map((pat) => {
                    const isSelected = config.pattern === pat.id;
                    return (
                      <button
                        key={pat.id}
                        type="button"
                        onClick={() => handleUpdateConfig({ pattern: pat.id })}
                        className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer relative overflow-hidden group ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/30 shadow-md text-amber-300'
                            : 'bg-stone-900 border-stone-750 hover:bg-stone-800 text-stone-300'
                        }`}
                      >
                        {/* Mini preview canvas / thumbnail */}
                        <div 
                          className="w-full h-10 rounded-lg bg-stone-950 border border-stone-800 mb-2 relative overflow-hidden flex items-center justify-center"
                        >
                          {pat.id !== 'none' && (
                            <div 
                              className="absolute inset-0"
                              style={getPatternStyle(pat.id, 0.75, config.patternColor ?? '#18181b', config.patternScale ?? 1.0)}
                            />
                          )}
                          <span className="text-[10px] font-mono text-stone-400 relative z-10 px-1 py-0.5 rounded bg-stone-900/80">
                            {pat.badge}
                          </span>
                          {isSelected && (
                            <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-xs">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="font-bold text-xs truncate">
                            {isMr ? pat.titleMr : pat.titleEn}
                          </p>
                          <p className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">
                            {isMr ? pat.descMr : pat.descEn}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Pattern Intensity Slider if pattern is enabled */}
                {config.pattern !== 'none' && (
                  <div className="pt-2 border-t border-stone-750/70 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-300">
                        {isMr ? 'पॅटर्न तीव्रता (Pattern Density & Opacity)' : 'Pattern Intensity'}
                      </span>
                      <span className="font-mono text-amber-400 font-bold">
                        {Math.round((config.patternOpacity ?? 0.55) * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.15"
                      max="0.95"
                      step="0.05"
                      value={config.patternOpacity ?? 0.55}
                      onChange={(e) => handleUpdateConfig({ patternOpacity: parseFloat(e.target.value) })}
                      className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400">
                      <span>{isMr ? 'अति सुक्ष्म (15%)' : 'Subtle (15%)'}</span>
                      <span>{isMr ? 'संतुलित (55% - शिफारस)' : 'Balanced (55% - Ideal)'}</span>
                      <span>{isMr ? 'ठळक (95%)' : 'Prominent (95%)'}</span>
                    </div>
                  </div>
                )}

                {/* Pattern Scale / Density Slider (Resize patterns for screen density) */}
                {config.pattern !== 'none' && (
                  <div className="pt-2.5 border-t border-stone-750/70 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-300 flex items-center gap-1.5 font-bold">
                        <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>{isMr ? 'पॅटर्न आकार / स्केल (Pattern Scale / Density)' : 'Pattern Size / Scale (Density)'}</span>
                      </span>
                      <span className="font-mono text-amber-400 font-bold px-2 py-0.5 rounded bg-stone-900 border border-stone-700">
                        {(config.patternScale ?? 1.0).toFixed(1)}x ({Math.round((config.patternScale ?? 1.0) * 100)}%)
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.1"
                      value={config.patternScale ?? 1.0}
                      onChange={(e) => handleUpdateConfig({ patternScale: parseFloat(e.target.value) })}
                      className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />

                    {/* Quick scale presets */}
                    <div className="flex items-center gap-1.5 pt-0.5">
                      {[
                        { val: 0.6, mr: 'लहान (0.6x)', en: 'Compact (0.6x)' },
                        { val: 1.0, mr: 'सामान्य (1.0x)', en: 'Normal (1.0x)' },
                        { val: 1.5, mr: 'मध्यम (1.5x)', en: 'Medium (1.5x)' },
                        { val: 2.0, mr: 'मोठा (2.0x)', en: 'Large (2.0x)' },
                      ].map((preset) => (
                        <button
                          key={preset.val}
                          type="button"
                          onClick={() => handleUpdateConfig({ patternScale: preset.val })}
                          className={`flex-1 py-1 text-[11px] font-semibold rounded-lg border transition-all cursor-pointer ${
                            Math.abs((config.patternScale ?? 1.0) - preset.val) < 0.05
                              ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-xs'
                              : 'bg-stone-900 text-stone-400 border-stone-750 hover:bg-stone-800 hover:text-stone-200'
                          }`}
                        >
                          {isMr ? preset.mr : preset.en}
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-between text-[10px] text-stone-400">
                      <span>{isMr ? 'हाय-डीपीआय / कॉम्पॅक्ट (50%)' : 'High-DPI / Compact (50%)'}</span>
                      <span>{isMr ? 'डिफॉल्ट (100%)' : 'Default (100%)'}</span>
                      <span>{isMr ? 'मोठा स्क्रीन (250%)' : 'Large Screen (250%)'}</span>
                    </div>
                  </div>
                )}

                {/* Pattern Color & Contrast Blend Section (when pattern is not 'none') */}
                {config.pattern !== 'none' && (
                  <div className="pt-3 border-t border-stone-750/70 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-200 flex items-center gap-1.5">
                        <Palette className="w-3.5 h-3.5 text-amber-400" />
                        <span>{isMr ? 'पॅटर्न रंग व कॉन्ट्रास्ट ब्लेंड (Pattern Color & Blend)' : 'Pattern Color & Contrast Blend'}</span>
                      </span>
                      <span className="font-mono text-[11px] text-amber-400 px-2 py-0.5 rounded bg-stone-900 border border-stone-700">
                        {config.patternColor || '#18181b'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Curated Swatches */}
                      {PATTERN_COLOR_PRESETS.map((preset) => {
                        const isColorActive = (config.patternColor || '#18181b').toLowerCase() === preset.hex.toLowerCase();
                        return (
                          <button
                            key={preset.hex}
                            type="button"
                            onClick={() => handleUpdateConfig({ patternColor: preset.hex })}
                            className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer relative ${
                              isColorActive 
                                ? 'border-amber-400 ring-2 ring-amber-400/50 scale-110 shadow-sm' 
                                : 'border-stone-700 hover:border-stone-500 hover:scale-105'
                            }`}
                            style={{ backgroundColor: preset.hex }}
                            title={`${isMr ? preset.nameMr : preset.nameEn} (${preset.hex})`}
                          >
                            {isColorActive && (
                              <Check className={`w-3.5 h-3.5 ${preset.hex === '#ffffff' ? 'text-stone-950' : 'text-white'} stroke-[3]`} />
                            )}
                          </button>
                        );
                      })}

                      {/* Custom Color Input with Native Picker */}
                      <label 
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-700 hover:border-amber-400 text-stone-300 hover:text-white text-xs cursor-pointer transition-colors group"
                        title={isMr ? "कस्टम रंग निवडा" : "Pick custom HEX color"}
                      >
                        <input
                          type="color"
                          value={config.patternColor || '#18181b'}
                          onChange={(e) => handleUpdateConfig({ patternColor: e.target.value })}
                          className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                        />
                        <span className="text-[11px] font-mono group-hover:text-amber-300">
                          {isMr ? 'कस्टम रंग' : 'Custom'}
                        </span>
                      </label>
                    </div>

                    <p className="text-[10px] text-stone-400 italic">
                      {isMr 
                        ? '💡 टीप: गडद वॉलपेपरसाठी "पांढरा" किंवा "अॅम्बर" निवडा, तर फिकट वॉलपेपरसाठी "चारकोल" निवडून सर्वोत्तम कॉन्ट्रास्ट मिळवा.'
                        : '💡 Tip: Use "Chalk White" or "Amber" for dark wallpapers, and "Charcoal" for bright backdrops for optimal text clarity.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Reset to Default Button */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setConfig(DEFAULT_CONFIG);
                    saveStoredBackgroundConfig(DEFAULT_CONFIG);
                  }}
                  className="text-xs text-stone-400 hover:text-amber-400 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isMr ? 'डिफॉल्ट सेटिंग्जवर आणा' : 'Reset to Default'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPickerOpen(false)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-md cursor-pointer transition-transform active:scale-95"
                >
                  {isMr ? '✅ जतन करा व पूर्ण करा' : '✅ Apply & Done'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
