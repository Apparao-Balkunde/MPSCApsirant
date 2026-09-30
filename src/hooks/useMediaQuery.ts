import { useState, useEffect } from 'react';

/**
 * Custom React hook that evaluates CSS media queries via window.matchMedia.
 * Safely handles SSR and dynamically subscribes to viewport/media changes.
 *
 * @param query CSS media query string, e.g. '(max-width: 639px)', '(orientation: landscape)'
 * @returns boolean indicating whether the query currently matches
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = (queryStr: string): boolean => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false;
    }
    try {
      return window.matchMedia(queryStr).matches;
    } catch {
      return false;
    }
  };

  const [matches, setMatches] = useState<boolean>(() => getMatches(query));

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    try {
      const mediaQueryList = window.matchMedia(query);
      setMatches(mediaQueryList.matches);

      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      // Modern browsers
      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener('change', listener);
      } else if ((mediaQueryList as any).addListener) {
        // Fallback for older Safari / Android WebKit
        (mediaQueryList as any).addListener(listener);
      }

      return () => {
        if (mediaQueryList.removeEventListener) {
          mediaQueryList.removeEventListener('change', listener);
        } else if ((mediaQueryList as any).removeListener) {
          (mediaQueryList as any).removeListener(listener);
        }
      };
    } catch (e) {
      console.warn(`useMediaQuery error for query: "${query}"`, e);
    }
  }, [query]);

  return matches;
}

/**
 * Pre-configured breakpoints matching Tailwind CSS & common responsive devices
 */
export const MEDIA_QUERIES = {
  // Viewport sizes
  mobile: '(max-width: 639px)',
  tablet: '(min-width: 640px) and (max-width: 1023px)',
  laptop: '(min-width: 1024px) and (max-width: 1439px)',
  desktop: '(min-width: 1024px)',
  ultraWide: '(min-width: 1536px)',

  // Orientation & ergonomics
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
  compactLandscape: '(orientation: landscape) and (max-height: 520px)',

  // Capabilities & preferences
  touch: '(hover: none) and (pointer: coarse)',
  hover: '(hover: hover) and (pointer: fine)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
  darkMode: '(prefers-color-scheme: dark)',
  print: 'print',
} as const;

/** Convenience hook: Is viewport mobile size (< 640px) */
export function useIsMobile(): boolean {
  return useMediaQuery(MEDIA_QUERIES.mobile);
}

/** Convenience hook: Is viewport tablet size (640px - 1023px) */
export function useIsTablet(): boolean {
  return useMediaQuery(MEDIA_QUERIES.tablet);
}

/** Convenience hook: Is viewport desktop or laptop size (>= 1024px) */
export function useIsDesktop(): boolean {
  return useMediaQuery(MEDIA_QUERIES.desktop);
}

/** Convenience hook: Is touch-first device (smartphones & tablets) */
export function useIsTouchDevice(): boolean {
  return useMediaQuery(MEDIA_QUERIES.touch);
}

/** Convenience hook: Phone held horizontally in compact landscape */
export function useIsCompactLandscape(): boolean {
  return useMediaQuery(MEDIA_QUERIES.compactLandscape);
}

/** Convenience hook: User has requested reduced motion */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery(MEDIA_QUERIES.reducedMotion);
}

/** Convenience hook: Printing mode active */
export function useIsPrint(): boolean {
  return useMediaQuery(MEDIA_QUERIES.print);
}
