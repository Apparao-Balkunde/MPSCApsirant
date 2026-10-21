// Google AdSense Configuration & Storage Utilities for MPSC Aspirant Prep

export interface AdSenseConfig {
  enabled: boolean;
  publisherId: string; // e.g. "ca-pub-8635186039357683"
  slots: {
    header: string;
    dashboard: string;
    examResult: string;
    footer: string;
    subjectView: string;
    examScreen: string;
  };
  placements: {
    header: boolean;
    dashboard: boolean;
    examResult: boolean;
    footer: boolean;
    subjectView: boolean;
    examScreen: boolean;
  };
  showFallbackWhenEmpty: boolean;
  testMode: boolean;
  autoAds?: boolean;
}

export const DEFAULT_ADSENSE_CONFIG: AdSenseConfig = {
  enabled: true,
  publisherId: 'ca-pub-8635186039357683',
  slots: {
    header: '8635186039',
    dashboard: '8635186040',
    examResult: '8635186039',
    footer: '8635186041',
    subjectView: '8635186042',
    examScreen: '8635186043',
  },
  placements: {
    header: true,
    dashboard: true,
    examResult: true,
    footer: true,
    subjectView: true,
    examScreen: true,
  },
  showFallbackWhenEmpty: true,
  testMode: false,
  autoAds: true,
};

const STORAGE_KEY = 'mpsc_adsense_configuration_v1';

export function getStoredAdSenseConfig(): AdSenseConfig {
  if (typeof window === 'undefined') return DEFAULT_ADSENSE_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_ADSENSE_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_ADSENSE_CONFIG,
      ...parsed,
      slots: { ...DEFAULT_ADSENSE_CONFIG.slots, ...(parsed.slots || {}) },
      placements: { ...DEFAULT_ADSENSE_CONFIG.placements, ...(parsed.placements || {}) },
    };
  } catch (err) {
    console.error('Failed to parse stored AdSense configuration:', err);
    return DEFAULT_ADSENSE_CONFIG;
  }
}

export function saveAdSenseConfig(config: AdSenseConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    window.dispatchEvent(new CustomEvent('adsense-config-updated', { detail: config }));
  } catch (err) {
    console.error('Failed to save AdSense configuration:', err);
  }
}

export function generateAdsTxtSnippet(publisherId: string): string {
  const cleanPub = publisherId.replace(/^ca-/, '').trim();
  return `google.com, ${cleanPub}, DIRECT, f08c47fec0942fa0`;
}

// Educational Fallback Sponsors (shown when AdSense is reviewing, loading, or in test mode)
export interface FallbackSponsor {
  id: string;
  titleMr: string;
  titleEn: string;
  descMr: string;
  descEn: string;
  badgeMr: string;
  badgeEn: string;
  ctaTextMr: string;
  ctaTextEn: string;
  category: 'books' | 'test_series' | 'study_gear' | 'toppers';
  highlight: string;
  actionType: 'open_books' | 'open_info' | 'open_marathon';
}

export const FALLBACK_SPONSORS: FallbackSponsor[] = [
  {
    id: 'sponsor_laxmikanth',
    titleMr: 'एम. लक्ष्मीकांत - भारतीय राज्यव्यवस्था (६ वे सुधारित संस्करण)',
    titleEn: 'M. Laxmikanth - Indian Polity (Latest 6th Edition)',
    descMr: 'MPSC राज्यसेवा व कम्बाईन पूर्व-मुख्य परीक्षेसाठी आयोगाचे अधिकृत १००% संदर्भ पुस्तक. आता विशेष सवलतीत उपलब्ध.',
    descEn: 'The benchmark reference book for MPSC Rajyaseva & Combine. Available at special student discount.',
    badgeMr: 'टॉपर्सची पहिली पसंती',
    badgeEn: "Topper's Choice",
    ctaTextMr: 'पुस्तके पहा व खरेदी करा ➔',
    ctaTextEn: 'View Reference Books ➔',
    category: 'books',
    highlight: '१०% कमिशन व सवलत',
    actionType: 'open_books',
  },
  {
    id: 'sponsor_marathon',
    titleMr: 'MPSC १०० प्रश्न विषयनिहाय महा-सराव मॅरेथॉन पेपर्स',
    titleEn: 'MPSC 100-Questions Subject Marathon Mock Sets',
    descMr: 'भूगोल, इतिहास, राज्यघटना व विज्ञानाचे पूर्ण १०० गुणांचे संभाव्य प्रश्नसंच आयोगाच्या १/४ निगेटिव्ह मार्किंगनुसार सोडवा.',
    descEn: 'Full 100-mark marathon papers with official MPSC 1/4 negative marking algorithm.',
    badgeMr: 'नवीन सराव संच',
    badgeEn: 'New Mock Sets',
    ctaTextMr: 'मॅरेथॉन सुरू करा ➔',
    ctaTextEn: 'Start Marathon ➔',
    category: 'test_series',
    highlight: '१००% मोफत सराव',
    actionType: 'open_marathon',
  },
  {
    id: 'sponsor_saudi_geo',
    titleMr: 'प्रा. ए. बी. सौदी - महाराष्ट्राचा व भारताचा भूगोल',
    titleEn: 'Prof. A.B. Saudi - Geography of Maharashtra & India',
    descMr: 'प्राकृतिक, राजकीय व आर्थिक भूगोलासाठी सर्वोत्कृष्ट नकाशांसह संदर्भ ग्रंथ. ॲमेझॉन प्राईम डिलिव्हरीसह.',
    descEn: 'The indispensable geography reference work for all MPSC civil service aspirants with high-res maps.',
    badgeMr: 'MPSC संदर्भ ग्रंथ',
    badgeEn: 'Essential Reference',
    ctaTextMr: 'ॲमेझॉनवर पहा ➔',
    ctaTextEn: 'View on Amazon ➔',
    category: 'books',
    highlight: 'सर्वोत्तम किंमत',
    actionType: 'open_books',
  },
];
