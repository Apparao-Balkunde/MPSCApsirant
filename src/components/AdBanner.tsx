import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export function AdBanner({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef<boolean>(false);

  useEffect(() => {
    // Only push if the ins element is mounted, has not been initialized yet, and has no existing iframe or data-ad-status
    if (adRef.current && !pushedRef.current) {
      const alreadyFilled = adRef.current.getAttribute('data-ad-status') || adRef.current.innerHTML.trim().length > 0;
      if (!alreadyFilled) {
        try {
          if (typeof window !== 'undefined') {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            pushedRef.current = true;
          }
        } catch {
          // Gracefully suppress duplicate initialization error in React dev/strict mode
        }
      }
    }
  }, []);

  return (
    <div className={`my-4 flex flex-col items-center justify-center overflow-hidden ${className}`}>
      <span className="text-[10px] uppercase tracking-wider text-stone-600 font-medium mb-1">
        प्रायोजित जाहिरात (Advertisement)
      </span>
      <div className="w-full min-h-[90px] flex items-center justify-center bg-stone-100/70 border border-dashed border-stone-300 rounded-lg p-1 text-center">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: '90px' }}
          data-ad-client="ca-pub-8635186039357683"
          data-ad-slot={slot || '1234567890'}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </div>
  );
}
