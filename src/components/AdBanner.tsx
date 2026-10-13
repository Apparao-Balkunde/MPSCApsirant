import React, { useEffect, useRef, useState, useMemo } from 'react';
import { ExternalLink, Sparkles, BookOpen, Settings, Info, ShoppingBag } from 'lucide-react';
import { 
  getStoredAdSenseConfig, 
  AdSenseConfig, 
  DEFAULT_ADSENSE_CONFIG,
  FALLBACK_SPONSORS,
  FallbackSponsor
} from '../utils/adSenseConfig';

export type AdFormat = 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'leaderboard' | 'in_feed';

interface AdBannerProps {
  slot?: string;
  placementType?: keyof AdSenseConfig['placements'];
  format?: AdFormat;
  responsive?: boolean;
  className?: string;
  onOpenSettings?: () => void;
  onOpenAction?: (actionType: 'open_books' | 'open_info' | 'open_marathon') => void;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slot,
  placementType,
  format = 'auto',
  responsive = true,
  className = '',
  onOpenSettings,
  onOpenAction,
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef<boolean>(false);
  const [config, setConfig] = useState<AdSenseConfig>(getStoredAdSenseConfig);
  const [adLoaded, setAdLoaded] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Listen to live updates from AdSense settings modal
  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<AdSenseConfig>;
      if (customEvent.detail) {
        setConfig(customEvent.detail);
      } else {
        setConfig(getStoredAdSenseConfig());
      }
    };

    window.addEventListener('adsense-config-updated', handleUpdate);
    return () => {
      window.removeEventListener('adsense-config-updated', handleUpdate);
    };
  }, []);

  // Determine active slot ID from props or config placement
  const effectiveSlot = useMemo(() => {
    if (slot) return slot;
    if (placementType && config.slots[placementType]) {
      return config.slots[placementType];
    }
    return config.slots.header || DEFAULT_ADSENSE_CONFIG.slots.header;
  }, [slot, placementType, config.slots]);

  // Check if this placement is enabled in config
  const isPlacementEnabled = useMemo(() => {
    if (!config.enabled) return false;
    if (placementType && config.placements[placementType] === false) return false;
    return true;
  }, [config.enabled, placementType, config.placements]);

  // Rotate fallback sponsor cards predictably
  const randomSponsor = useMemo<FallbackSponsor>(() => {
    const index = Math.abs(effectiveSlot.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % FALLBACK_SPONSORS.length;
    return FALLBACK_SPONSORS[index] || FALLBACK_SPONSORS[0];
  }, [effectiveSlot]);

  useEffect(() => {
    if (!isPlacementEnabled || config.testMode || pushedRef.current || !adRef.current) return;

    try {
      const alreadyFilled =
        adRef.current.getAttribute('data-ad-status') === 'filled' ||
        adRef.current.innerHTML.trim().length > 0;

      if (!alreadyFilled && typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
        // Check after short delay if ad was served
        setTimeout(() => {
          if (adRef.current && (adRef.current.offsetHeight > 40 || adRef.current.getAttribute('data-ad-status') === 'filled')) {
            setAdLoaded(true);
          }
        }, 1200);
      }
    } catch (err) {
      console.debug('Google AdSense slot push status:', err);
    }
  }, [effectiveSlot, isPlacementEnabled, config.testMode]);

  if (!isPlacementEnabled) return null;

  // Render container styles based on chosen format
  const formatClasses = useMemo(() => {
    switch (format) {
      case 'rectangle':
        return 'max-w-[340px] w-full min-h-[250px] mx-auto';
      case 'leaderboard':
        return 'w-full max-w-5xl mx-auto min-h-[90px]';
      case 'in_feed':
        return 'w-full max-w-4xl mx-auto min-h-[110px]';
      default:
        return 'w-full max-w-5xl mx-auto min-h-[90px]';
    }
  }, [format]);

  const handleCtaClick = () => {
    if (onOpenAction) {
      onOpenAction(randomSponsor.actionType);
    } else if (onOpenSettings) {
      onOpenSettings();
    }
  };

  return (
    <section 
      aria-label="जाहिरात व अभ्यास प्रायोजकत्व"
      className={`relative my-4 sm:my-5 flex flex-col items-center justify-center transition-all ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Standard Google AdSense Policy Label */}
      <div className="w-full flex items-center justify-between px-2 mb-1.5 max-w-5xl">
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-stone-600 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
          <span>प्रायोजित जाहिरात (Advertisement)</span>
        </div>

        <div className="flex items-center gap-2">
          {config.testMode && (
            <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300">
              🧪 चाचणी मोड (Test Mode)
            </span>
          )}
          {onOpenSettings && (
            <button
              type="button"
              onClick={onOpenSettings}
              title="गुगल ॲडसेन्स सेटिंग्ज व जाहिरात स्लॉट व्यवस्थापक"
              className={`text-[10px] text-stone-600 hover:text-amber-700 flex items-center gap-1 font-semibold transition-opacity cursor-pointer ${
                isHovered ? 'opacity-100' : 'opacity-70 sm:opacity-40'
              }`}
            >
              <Settings className="w-3 h-3 text-stone-600 hover:text-amber-700" />
              <span className="hidden sm:inline">AdSense स्लॉट: {effectiveSlot}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Ad Box Container */}
      <div className={`relative overflow-hidden rounded-2xl border border-stone-200/90 bg-gradient-to-br from-stone-50 via-white to-amber-50/20 shadow-xs p-2 sm:p-3 ${formatClasses}`}>
        {/* Google AdSense Live Script Element */}
        <div className={`${config.testMode ? 'hidden' : 'block'} w-full flex items-center justify-center`}>
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ 
              display: 'block', 
              width: '100%', 
              minHeight: format === 'rectangle' ? '250px' : '90px' 
            }}
            data-ad-client={config.publisherId || DEFAULT_ADSENSE_CONFIG.publisherId}
            data-ad-slot={effectiveSlot}
            data-ad-format={format === 'rectangle' ? 'rectangle' : 'auto'}
            data-full-width-responsive={responsive ? 'true' : 'false'}
          />
        </div>

        {/* High-Fidelity Educational Sponsor Fallback Card (shown when in test mode, ad blocked, or pending AdSense approval) */}
        {(!adLoaded || config.testMode) && config.showFallbackWhenEmpty && (
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-stone-50 to-amber-600/10 border border-amber-300/40">
            <div className="flex items-start gap-3 w-full sm:w-auto flex-1">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                {randomSponsor.category === 'books' ? (
                  <BookOpen className="w-5 h-5 text-white" />
                ) : (
                  <Sparkles className="w-5 h-5 text-amber-200" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-600 text-white shadow-xs">
                    {randomSponsor.badgeMr}
                  </span>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full">
                    {randomSponsor.highlight}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-extrabold text-stone-900 truncate">
                  {randomSponsor.titleMr}
                </h4>

                <p className="text-[11px] sm:text-xs text-stone-600 line-clamp-1 mt-0.5">
                  {randomSponsor.descMr}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handleCtaClick}
                className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>{randomSponsor.ctaTextMr}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Discreet Policy Footnote */}
      <div className="w-full text-right px-2 mt-1">
        <span className="text-[9px] text-stone-600">
          AdSense सुरक्षित जाहिरात जागा • गुगल धोरणांनुसार संरक्षित
        </span>
      </div>
    </section>
  );
};
