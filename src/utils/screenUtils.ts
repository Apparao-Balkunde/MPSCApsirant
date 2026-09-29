import { useState, useEffect, useCallback } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'laptop' | 'desktop';
export type ScreenOrientation = 'portrait' | 'landscape';
export type TextScale = 'normal' | 'large';

const TEXT_SCALE_KEY = 'mpsc_display_text_scale';

/**
 * Checks if fullscreen is currently active across vendor prefixes
 */
export function isFullScreenActive(): boolean {
  if (typeof document === 'undefined') return false;
  return Boolean(
    document.fullscreenElement ||
    (document as any).webkitFullscreenElement ||
    (document as any).mozFullScreenElement ||
    (document as any).msFullscreenElement
  );
}

/**
 * Checks if fullscreen is supported in the current browser/device
 */
export function isFullScreenSupported(): boolean {
  if (typeof document === 'undefined') return false;
  return Boolean(
    document.fullscreenEnabled ||
    (document as any).webkitFullscreenEnabled ||
    (document as any).mozFullScreenEnabled ||
    (document as any).msFullscreenEnabled
  );
}

/**
 * Request fullscreen for an element or whole document with full vendor fallback
 */
export async function requestFullScreen(element?: HTMLElement): Promise<boolean> {
  if (typeof document === 'undefined') return false;
  const target = element || document.documentElement;

  try {
    if (target.requestFullscreen) {
      await target.requestFullscreen({ navigationUI: 'hide' } as any);
      return true;
    } else if ((target as any).webkitRequestFullscreen) {
      await (target as any).webkitRequestFullscreen();
      return true;
    } else if ((target as any).mozRequestFullScreen) {
      await (target as any).mozRequestFullScreen();
      return true;
    } else if ((target as any).msRequestFullscreen) {
      await (target as any).msRequestFullscreen();
      return true;
    }
  } catch (err) {
    console.warn('Fullscreen request failed or was dismissed by user:', err);
  }
  return false;
}

/**
 * Exit fullscreen across vendor prefixes
 */
export async function exitFullScreen(): Promise<boolean> {
  if (typeof document === 'undefined') return false;

  try {
    if (document.exitFullscreen) {
      await document.exitFullscreen();
      return true;
    } else if ((document as any).webkitExitFullscreen) {
      await (document as any).webkitExitFullscreen();
      return true;
    } else if ((document as any).mozCancelFullScreen) {
      await (document as any).mozCancelFullScreen();
      return true;
    } else if ((document as any).msExitFullscreen) {
      await (document as any).msExitFullscreen();
      return true;
    }
  } catch (err) {
    console.warn('Exit fullscreen failed:', err);
  }
  return false;
}

/**
 * Toggle fullscreen mode
 */
export async function toggleFullScreen(element?: HTMLElement): Promise<boolean> {
  if (isFullScreenActive()) {
    await exitFullScreen();
    return false;
  } else {
    return await requestFullScreen(element);
  }
}

/**
 * Determines device viewport category based on width
 */
export function getDeviceType(width: number): DeviceType {
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  if (width < 1440) return 'laptop';
  return 'desktop';
}

/**
 * Get human-readable device name in Marathi & English
 */
export function getDeviceLabels(deviceType: DeviceType): { mr: string; en: string; iconDesc: string } {
  switch (deviceType) {
    case 'mobile':
      return { mr: 'स्मार्टफोन / मोबाईल', en: 'Mobile Phone', iconDesc: '📱' };
    case 'tablet':
      return { mr: 'टॅबलेट / iPad', en: 'Tablet / iPad', iconDesc: '📟' };
    case 'laptop':
      return { mr: 'लॅपटॉप', en: 'Laptop Screen', iconDesc: '💻' };
    case 'desktop':
      return { mr: 'डेस्कटॉप पीसी / मोठा मॉनिटर', en: 'Desktop PC / Monitor', iconDesc: '🖥️' };
  }
}

/**
 * Load saved text scaling preference
 */
export function getSavedTextScale(): TextScale {
  if (typeof localStorage === 'undefined') return 'normal';
  const saved = localStorage.getItem(TEXT_SCALE_KEY);
  return saved === 'large' ? 'large' : 'normal';
}

/**
 * Save text scaling preference
 */
export function saveTextScale(scale: TextScale): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(TEXT_SCALE_KEY, scale);
  // Apply data-text-scale attribute to document root for CSS cascading
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-text-scale', scale);
  }
}

/**
 * Custom React hook for live screen resolution, device type, orientation, and fullscreen state
 */
export function useDeviceScreen() {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(() => isFullScreenActive());
  const [textScale, setTextScaleState] = useState<TextScale>(() => getSavedTextScale());
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  }));

  const deviceType: DeviceType = getDeviceType(dimensions.width);
  const orientation: ScreenOrientation = dimensions.width >= dimensions.height ? 'landscape' : 'portrait';

  useEffect(() => {
    // Initial document attribute setup
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-text-scale', textScale);
      document.documentElement.setAttribute('data-device-type', deviceType);
    }

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setDimensions({ width: w, height: h });
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-device-type', getDeviceType(w));
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(isFullScreenActive());
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [deviceType, textScale]);

  const toggle = useCallback(async (targetElem?: HTMLElement) => {
    const nextState = await toggleFullScreen(targetElem);
    setIsFullscreen(nextState);
    return nextState;
  }, []);

  const setTextScale = useCallback((scale: TextScale) => {
    setTextScaleState(scale);
    saveTextScale(scale);
  }, []);

  return {
    isFullscreen,
    deviceType,
    orientation,
    width: dimensions.width,
    height: dimensions.height,
    isSupported: isFullScreenSupported(),
    toggleFullscreen: toggle,
    enterFullscreen: requestFullScreen,
    exitFullscreen: exitFullScreen,
    textScale,
    setTextScale,
    labels: getDeviceLabels(deviceType),
  };
}
