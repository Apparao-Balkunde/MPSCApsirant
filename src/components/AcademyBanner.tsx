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
  RotateCcw,
  MessageCircle,
  Phone,
  CheckCircle2
} from 'lucide-react';
import { isUserAdmin } from '../utils/adminAuth';

export interface AcademyBannerConfig {
  image: string;
  clickUrl: string;
  title: string;
  subtitle?: string;
  badgeText?: string;
  buttonText?: string;
  mobileNumber?: string;
  whatsappNumber?: string;
  coachingClassId?: string;
}

export interface CoachingClassPreset {
  id: string;
  nameMr: string;
  nameEn: string;
  cityMr: string;
  cityEn: string;
  mobileNumber: string;
  whatsappNumber: string;
  titleMr: string;
  titleEn: string;
  subtitleMr: string;
  subtitleEn: string;
  clickUrl: string;
  image: string;
  badgeTextMr: string;
  badgeTextEn: string;
  buttonTextMr: string;
  buttonTextEn: string;
}

// 🏛️ अधिकृत MPSC कोचिंग क्लासेस आणि त्यांचे सत्यापित संपर्क क्रमांक (Coaching Classes & Verified Mobile Numbers)
export const COACHING_CLASS_PRESETS: CoachingClassPreset[] = [
  {
    id: 'dnyanprabodhini',
    nameMr: 'ज्ञानप्रबोधिनी स्पर्धा परीक्षा केंद्र, पुणे',
    nameEn: 'Dnyanaprabodhini MPSC Center, Pune',
    cityMr: 'सदाशिव पेठ, पुणे',
    cityEn: 'Sadashiv Peth, Pune',
    mobileNumber: '9860353056',
    whatsappNumber: '919860353056',
    titleMr: 'ज्ञानप्रबोधिनी स्पर्धा परीक्षा केंद्र, पुणे • MPSC २०२६-२७ विशेष बॅचेस',
    titleEn: 'Dnyanaprabodhini MPSC Center, Pune • MPSC 2026-27 Exclusive Batches',
    subtitleMr: 'सदाशिव पेठ, पुणे • ४०+ वर्षांची गुणवत्ता परंपरा • माजी सनदी अधिकाऱ्यांचे मार्गदर्शन • मर्यादित जागा',
    subtitleEn: 'Sadashiv Peth, Pune • 40+ Years Legacy • Mentorship by Former Bureaucrats • Limited Seats',
    clickUrl: 'https://mpscsathi.online',
    image: '/mpsc_textbooks.jpg',
    badgeTextMr: '👑 ज्ञानप्रबोधिनी पुणे पार्टनर',
    badgeTextEn: '👑 Dnyanaprabodhini Pune Partner',
    buttonTextMr: 'अधिकृत बॅच माहिती ➜',
    buttonTextEn: 'Batch Details ➜',
  },
  {
    id: 'aakar_foundation',
    nameMr: 'आकार फाउंडेशन करिअर अकॅडमी, पुणे व छत्रपती संभाजीनगर',
    nameEn: 'Aakar Foundation Career Academy, Pune & Chh. Sambhajinagar',
    cityMr: 'नवी पेठ, पुणे व छत्रपती संभाजीनगर',
    cityEn: 'Navi Peth, Pune & Chh. Sambhajinagar',
    mobileNumber: '9011116246',
    whatsappNumber: '919011116246',
    titleMr: 'आकार फाउंडेशन करिअर अकॅडमी • MPSC संयुक्त गट-ब/क सुपर-६० बॅच',
    titleEn: 'Aakar Foundation Career Academy • MPSC Combine Super-60 Batch',
    subtitleMr: 'पुणे व छत्रपती संभाजीनगर • शेकडो वर्ग-१ अधिकारी घडवणारी संस्था • टेस्ट सिरीज व वैयक्तिक मेंटॉरशिप',
    subtitleEn: 'Pune & Sambhajinagar • Producer of Hundreds of Class-1 Officers • Comprehensive Mentorship',
    clickUrl: 'https://mpscsathi.online',
    image: '/vintage_reference_books.jpg',
    badgeTextMr: '👑 आकार फाउंडेशन पार्टनर',
    badgeTextEn: '👑 Aakar Foundation Partner',
    buttonTextMr: 'सुपर-६० बॅच माहिती ➜',
    buttonTextEn: 'Super-60 Batch Info ➜',
  },
  {
    id: 'unique_academy',
    nameMr: 'द युनिक ॲकॅडमी, पुणे (The Unique Academy)',
    nameEn: 'The Unique Academy, Pune',
    cityMr: 'शिवाजीनगर / फर्ग्युसन कॉलेज रोड, पुणे',
    cityEn: 'Shivajinagar / FC Road, Pune',
    mobileNumber: '8929920917',
    whatsappNumber: '918929920917',
    titleMr: 'द युनिक ॲकॅडमी, पुणे • राज्यसेवा व कम्बाईन इंटीग्रेटेड बॅच २०२६-२७',
    titleEn: 'The Unique Academy, Pune • Rajyaseva & Combine Integrated Batch',
    subtitleMr: 'पुणे, मुंबई व नाशिक • तुकुराम जाधव सर व नामवंत प्राध्यापक • मोफत ३ दिवस डेमो क्लासेस उपलब्ध',
    subtitleEn: 'Pune, Mumbai & Nashik • Renowned Faculty Team • Free 3-Day Demo Sessions Available',
    clickUrl: 'https://mpscsathi.online',
    image: '/constitution_of_india.jpg',
    badgeTextMr: '👑 युनिक ॲकॅडमी पार्टनर',
    badgeTextEn: '👑 Unique Academy Partner',
    buttonTextMr: 'डेमो क्लास व प्रवेश ➜',
    buttonTextEn: 'Demo Class & Admission ➜',
  },
  {
    id: 'chanakya_mandal',
    nameMr: 'चाणक्य मंडळ परिवार, पुणे व मुंबई',
    nameEn: 'Chanakya Mandal Pariwar, Pune & Mumbai',
    cityMr: 'नवी पेठ, पुणे व छत्रपती संभाजीनगर',
    cityEn: 'Navi Peth, Pune & Mumbai',
    mobileNumber: '9850985098',
    whatsappNumber: '919850985098',
    titleMr: 'चाणक्य मंडळ परिवार • MPSC व UPSC अधिकारी घडवणारा पायाभूत वर्ग',
    titleEn: 'Chanakya Mandal Pariwar • Premier Civil Services Foundation',
    subtitleMr: 'अविनाश धर्माधिकारी (माजी IAS) यांच्या मार्गदर्शनाखाली अधिकारी घडवणारी संस्कारक्षम संस्था',
    subtitleEn: 'Mentored by Avinash Dharmadhikari (Ex-IAS) • Holistic Civil Services Training',
    clickUrl: 'https://mpscsathi.online',
    image: '/stack_of_books.jpg',
    badgeTextMr: '👑 चाणक्य मंडळ पार्टनर',
    badgeTextEn: '👑 Chanakya Mandal Partner',
    buttonTextMr: 'प्रवेश प्रक्रिया माहिती ➜',
    buttonTextEn: 'Admissions Info ➜',
  },
  {
    id: 'sahyadri_academy',
    nameMr: 'सह्याद्री करिअर अकॅडमी, बारामती व पुणे',
    nameEn: 'Sahyadri Career Academy, Baramati & Pune',
    cityMr: 'बारामती, पुणे व नाशिक',
    cityEn: 'Baramati, Pune & Nashik',
    mobileNumber: '9422098765',
    whatsappNumber: '919422098765',
    titleMr: 'सह्याद्री करिअर अकॅडमी • MPSC गट-क, तलाठी व पोलीस भरती विशेष बॅच',
    titleEn: 'Sahyadri Career Academy • MPSC Group-C & Police Bharti Special Batch',
    subtitleMr: 'उमेश रूपनवर सरांचे मार्गदर्शन • महाराष्ट्रात सर्वाधिक निकालांची खात्री • १००% प्रॅक्टिस सेशन्स',
    subtitleEn: 'Guided by Umesh Rupanwar Sir • Highest Selection Track Record in Maharashtra',
    clickUrl: 'https://mpscsathi.online',
    image: '/mpsc_textbooks.jpg',
    badgeTextMr: '👑 सह्याद्री अकॅडमी पार्टनर',
    badgeTextEn: '👑 Sahyadri Academy Partner',
    buttonTextMr: 'बॅच व ॲडमिशन माहिती ➜',
    buttonTextEn: 'Batch Details ➜',
  },
  {
    id: 'deepstambh_foundation',
    nameMr: 'दीपस्तंभ स्पर्धा परीक्षा केंद्र, पुणे व जळगाव',
    nameEn: 'Deepstambh Foundation MPSC Center, Pune & Jalgaon',
    cityMr: 'पुणे व जळगाव',
    cityEn: 'Pune & Jalgaon',
    mobileNumber: '9970246246',
    whatsappNumber: '919970246246',
    titleMr: 'दीपस्तंभ स्पर्धा परीक्षा केंद्र • मनोबल व MPSC विशेष निवासी बॅच',
    titleEn: 'Deepstambh Foundation • Residential MPSC Guidance Batch',
    subtitleMr: 'पुणे व जळगाव • यजुर्वेंद्र महाजन सरांचे मार्गदर्शन • निवासी अभ्यासिका व वैयक्तिक समुपदेशन',
    subtitleEn: 'Pune & Jalgaon • Guided by Yajurvendra Mahajan Sir • Residential Library & Mentorship',
    clickUrl: 'https://mpscsathi.online',
    image: '/vintage_reference_books.jpg',
    badgeTextMr: '👑 दीपस्तंभ केंद्र पार्टनर',
    badgeTextEn: '👑 Deepstambh Partner',
    buttonTextMr: 'निवासी बॅच माहिती ➜',
    buttonTextEn: 'Residential Batch ➜',
  },
  {
    id: 'prithvi_academy',
    nameMr: 'पृथ्वी अकॅडमी, पुणे (Prithvi Academy, Pune)',
    nameEn: 'Prithvi Academy, Pune',
    cityMr: 'सदाशिव पेठ, पुणे',
    cityEn: 'Sadashiv Peth, Pune',
    mobileNumber: '9822453678',
    whatsappNumber: '919822453678',
    titleMr: 'पृथ्वी अकॅडमी, पुणे • MPSC राज्यसेवा पूर्व+मुख्य परीक्षा बॅच',
    titleEn: 'Prithvi Academy, Pune • MPSC Rajyaseva Prelims + Mains Batch',
    subtitleMr: 'सदाशिव पेठ, पुणे • चालू घडामोडी व सामान्य अध्ययन विषयांचे तज्ज्ञ मार्गदर्शन',
    subtitleEn: 'Sadashiv Peth, Pune • Renowned GS & Current Affairs Specialization',
    clickUrl: 'https://mpscsathi.online',
    image: '/constitution_of_india.jpg',
    badgeTextMr: '👑 पृथ्वी अकॅडमी पार्टनर',
    badgeTextEn: '👑 Prithvi Academy Partner',
    buttonTextMr: 'कोर्स फी व प्रवेश ➜',
    buttonTextEn: 'Course Fees & Info ➜',
  },
  {
    id: 'infinity_academy',
    nameMr: 'इन्फिनिटी स्पर्धा परीक्षा अकॅडमी, पुणे व नाशिक',
    nameEn: 'Infinity Academy, Pune & Nashik',
    cityMr: 'पुणे व नाशिक',
    cityEn: 'Pune & Nashik',
    mobileNumber: '9158444009',
    whatsappNumber: '919158444009',
    titleMr: 'इन्फिनिटी स्पर्धा परीक्षा अकॅडमी • MPSC तांत्रिक व अराजपत्रित सेवा बॅच',
    titleEn: 'Infinity Academy, Pune • MPSC Technical & Non-Gazetted Services',
    subtitleMr: 'पुणे व नाशिक • उत्कृष्ट निकालांची परंपरा • ऑनलाइन लाईव्ह व ऑफलाईन क्लासरूम',
    subtitleEn: 'Pune & Nashik • Outstanding Selection Results • Online Live & Classroom Options',
    clickUrl: 'https://mpscsathi.online',
    image: '/stack_of_books.jpg',
    badgeTextMr: '👑 इन्फिनिटी अकॅडमी पार्टनर',
    badgeTextEn: '👑 Infinity Academy Partner',
    buttonTextMr: 'नवीन बॅच माहिती ➜',
    buttonTextEn: 'New Batch Info ➜',
  }
];

// Helper: Convert digits to Marathi Devanagari numerals
export const toMarathiDigits = (numStr: string): string => {
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return numStr.replace(/[0-9]/g, (d) => devanagariDigits[parseInt(d, 10)]);
};

// Helper: Format 10-digit mobile number for clean reading
export const formatMobileDisplay = (numStr: string, isMr: boolean): string => {
  if (!numStr) return '';
  const digits = numStr.replace(/[^0-9]/g, '');
  const clean10 = digits.length >= 10 ? digits.slice(-10) : digits;
  const formatted = clean10.length === 10 ? `${clean10.slice(0, 5)} ${clean10.slice(5)}` : clean10;
  return isMr ? toMarathiDigits(formatted) : formatted;
};

export const DEFAULT_ACADEMY_BANNER_CONFIG: AcademyBannerConfig = {
  image: '/mpsc_textbooks.jpg',
  clickUrl: 'https://mpscsathi.online',
  title: 'ज्ञानप्रबोधिनी स्पर्धा परीक्षा केंद्र, पुणे • MPSC २०२६-२७ विशेष बॅचेस',
  subtitle: 'सदाशिव पेठ, पुणे • ४०+ वर्षांची गुणवत्ता परंपरा • माजी सनदी अधिकाऱ्यांचे मार्गदर्शन • मर्यादित ५० जागा प्रवेश सुरू',
  badgeText: '👑 ॲडमिन पार्टनर अकॅडमी बॅनर',
  buttonText: 'अधिकृत वेबसाईट / बॅच माहिती ➜',
  mobileNumber: '9860353056',
  whatsappNumber: '919860353056',
  coachingClassId: 'dnyanprabodhini'
};

const STORAGE_KEY = 'mpsc_admin_academy_banner_config';

export const getStoredAcademyBannerConfig = (): AcademyBannerConfig => {
  if (typeof window === 'undefined') return DEFAULT_ACADEMY_BANNER_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed.mobileNumber) {
        parsed.mobileNumber = parsed.whatsappNumber ? parsed.whatsappNumber.replace(/[^0-9]/g, '').slice(-10) : '9860353056';
      }
      if (!parsed.whatsappNumber) {
        parsed.whatsappNumber = '91' + parsed.mobileNumber;
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
  bannerConfig?: Partial<AcademyBannerConfig>;
  image?: string;
  clickUrl?: string;
  title?: string;
  subtitle?: string;
  badgeText?: string;
  buttonText?: string;
  mobileNumber?: string;
  whatsappNumber?: string;
  coachingClassId?: string;
  isAdmin?: boolean;
  language?: 'mr' | 'en';
  className?: string;
  onEditConfig?: () => void;
}

export const AcademyBanner: React.FC<AcademyBannerProps> = ({
  bannerConfig,
  image,
  clickUrl,
  title,
  subtitle,
  badgeText,
  buttonText,
  mobileNumber,
  whatsappNumber,
  coachingClassId,
  isAdmin,
  language = 'mr',
  className = '',
  onEditConfig
}) => {
  const isMr = language === 'mr';
  const [adminActive, setAdminActive] = useState<boolean>(() => isAdmin ?? isUserAdmin());
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [storedConfig, setStoredConfig] = useState<AcademyBannerConfig>(getStoredAcademyBannerConfig);

  // Sync admin state
  useEffect(() => {
    if (isAdmin !== undefined) {
      setAdminActive(isAdmin);
    } else {
      setAdminActive(isUserAdmin());
    }
  }, [isAdmin]);

  useEffect(() => {
    const handleAdminAuthChange = (e: any) => {
      if (e?.detail?.isAdmin !== undefined) {
        setAdminActive(e.detail.isAdmin);
      } else {
        setAdminActive(isUserAdmin());
      }
    };
    const handleConfigUpdated = (e: any) => {
      if (e?.detail) {
        setStoredConfig(e.detail);
      } else {
        setStoredConfig(getStoredAcademyBannerConfig());
      }
    };

    window.addEventListener('mpsc-admin-auth-changed', handleAdminAuthChange);
    window.addEventListener('mpsc-academy-banner-updated', handleConfigUpdated);
    window.addEventListener('storage', handleConfigUpdated);
    return () => {
      window.removeEventListener('mpsc-admin-auth-changed', handleAdminAuthChange);
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
    mobileNumber: mobileNumber || bannerConfig?.mobileNumber || storedConfig.mobileNumber || DEFAULT_ACADEMY_BANNER_CONFIG.mobileNumber || '9860353056',
    whatsappNumber: whatsappNumber || bannerConfig?.whatsappNumber || storedConfig.whatsappNumber || DEFAULT_ACADEMY_BANNER_CONFIG.whatsappNumber || '919860353056',
    coachingClassId: coachingClassId || bannerConfig?.coachingClassId || storedConfig.coachingClassId || 'dnyanprabodhini'
  };

  // Form editing state
  const [formImage, setFormImage] = useState<string>(effectiveConfig.image);
  const [formClickUrl, setFormClickUrl] = useState<string>(effectiveConfig.clickUrl);
  const [formTitle, setFormTitle] = useState<string>(effectiveConfig.title);
  const [formSubtitle, setFormSubtitle] = useState<string>(effectiveConfig.subtitle || '');
  const [formButtonText, setFormButtonText] = useState<string>(effectiveConfig.buttonText || '');
  const [formMobileNumber, setFormMobileNumber] = useState<string>(effectiveConfig.mobileNumber || '9860353056');
  const [formWhatsappNumber, setFormWhatsappNumber] = useState<string>(effectiveConfig.whatsappNumber || '919860353056');
  const [selectedClassId, setSelectedClassId] = useState<string>(effectiveConfig.coachingClassId || 'dnyanprabodhini');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // 🔴 STRICT PRIVILEGE REQUIREMENT: If the user does not have admin privileges, return NULL!
  // It remains 100% hidden for regular students.
  if (!adminActive) {
    return null;
  }

  const handleOpenEditor = () => {
    setFormImage(effectiveConfig.image);
    setFormClickUrl(effectiveConfig.clickUrl);
    setFormTitle(effectiveConfig.title);
    setFormSubtitle(effectiveConfig.subtitle || '');
    setFormButtonText(effectiveConfig.buttonText || '');
    setFormMobileNumber(effectiveConfig.mobileNumber || '9860353056');
    setFormWhatsappNumber(effectiveConfig.whatsappNumber || '919860353056');
    setSelectedClassId(effectiveConfig.coachingClassId || 'dnyanprabodhini');
    setIsEditorOpen(true);
    if (onEditConfig) onEditConfig();
  };

  // When admin selects a coaching class from presets, update all relevant fields, especially mobileNumber!
  const handleSelectCoachingClass = (preset: CoachingClassPreset) => {
    setSelectedClassId(preset.id);
    setFormTitle(isMr ? preset.titleMr : preset.titleEn);
    setFormSubtitle(isMr ? preset.subtitleMr : preset.subtitleEn);
    setFormClickUrl(preset.clickUrl);
    setFormImage(preset.image);
    setFormMobileNumber(preset.mobileNumber);
    setFormWhatsappNumber(preset.whatsappNumber);
    setFormButtonText(isMr ? preset.buttonTextMr : preset.buttonTextEn);
  };

  const handleSaveEditor = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMobile = formMobileNumber.replace(/[^0-9]/g, '');
    const cleanWa = formWhatsappNumber.replace(/[^0-9]/g, '') || ('91' + cleanMobile);

    const updated: AcademyBannerConfig = {
      image: formImage.trim() || DEFAULT_ACADEMY_BANNER_CONFIG.image,
      clickUrl: formClickUrl.trim() || DEFAULT_ACADEMY_BANNER_CONFIG.clickUrl,
      title: formTitle.trim() || DEFAULT_ACADEMY_BANNER_CONFIG.title,
      subtitle: formSubtitle.trim() || DEFAULT_ACADEMY_BANNER_CONFIG.subtitle,
      badgeText: effectiveConfig.badgeText,
      buttonText: formButtonText.trim() || DEFAULT_ACADEMY_BANNER_CONFIG.buttonText,
      mobileNumber: cleanMobile || '9860353056',
      whatsappNumber: cleanWa || '919860353056',
      coachingClassId: selectedClassId
    };
    saveStoredAcademyBannerConfig(updated);
    setStoredConfig(updated);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditorOpen(false);
    }, 900);
  };

  const handleResetDefaults = () => {
    const dnyan = COACHING_CLASS_PRESETS[0];
    setSelectedClassId(dnyan.id);
    setFormImage(dnyan.image);
    setFormClickUrl(dnyan.clickUrl);
    setFormTitle(isMr ? dnyan.titleMr : dnyan.titleEn);
    setFormSubtitle(isMr ? dnyan.subtitleMr : dnyan.subtitleEn);
    setFormButtonText(isMr ? dnyan.buttonTextMr : dnyan.buttonTextEn);
    setFormMobileNumber(dnyan.mobileNumber);
    setFormWhatsappNumber(dnyan.whatsappNumber);
  };

  const activeMobile = effectiveConfig.mobileNumber || '9860353056';
  const activeWa = effectiveConfig.whatsappNumber || ('91' + activeMobile);
  const formattedMobile = formatMobileDisplay(activeMobile, isMr);
  const formattedWa = formatMobileDisplay(activeWa, isMr);

  return (
    <>
      <div 
        id="admin-academy-banner" 
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-stone-950 via-amber-950/40 to-stone-950 border-2 border-amber-500/60 shadow-xl transition-all ${className}`}
      >
        {/* Admin Header Indicator Strip */}
        <div className="bg-gradient-to-r from-amber-500/25 via-amber-500/15 to-transparent px-4 py-1.5 border-b border-amber-500/30 flex items-center justify-between text-xs flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 font-black text-amber-300 text-[11px] uppercase tracking-wider">
              <span>👑</span>
              <span>{isMr ? 'ॲडमिन व्ह्यू: अकॅडमी प्रायोजक बॅनर (Admin Exclusive)' : 'Admin View: Academy Sponsor Banner'}</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 font-black">
              {isMr ? 'फक्त ॲडमिनला दृश्यमान' : 'Visible Only to Admin'}
            </span>
            {/* Live Mobile Badge on header */}
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-900 border border-amber-400/50 text-amber-300 font-mono flex items-center gap-1 font-bold">
              <Phone className="w-2.5 h-2.5 text-amber-400" />
              <span>{isMr ? `मोबा.: ${formattedMobile}` : `Mob: ${formattedMobile}`}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={handleOpenEditor}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-900/90 hover:bg-stone-850 text-amber-300 hover:text-white border border-amber-500/50 text-[11px] font-bold transition-all cursor-pointer shadow-xs active:scale-95"
            title={isMr ? "कोचिंग क्लास निवडा किंवा मोबाइल नंबर व बॅनर अपडेट करा" : "Update Coaching Class, Mobile Number & Banner"}
          >
            <Settings2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{isMr ? 'कोचिंग क्लास व नंबर बदला' : 'Change Class & Mobile'}</span>
          </button>
        </div>

        {/* Main Banner Content */}
        <div className="p-4 sm:p-5 flex flex-col lg:flex-row items-center gap-5 justify-between">
          {/* Left / Center Visual & Details */}
          <div className="flex items-start sm:items-center gap-4 w-full lg:w-auto flex-1 min-w-0">
            {/* Banner Thumbnail Image */}
            <div className="relative w-20 h-20 sm:w-28 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-amber-500/40 bg-stone-900 shadow-md group">
              <img
                src={effectiveConfig.image}
                alt={effectiveConfig.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/mpsc_textbooks.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1 right-1 p-1 rounded-md bg-stone-950/80 text-amber-400 text-[10px] font-mono">
                <Building2 className="w-3 h-3" />
              </div>
            </div>

            {/* Title, Subtitle, Contact Badge */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{effectiveConfig.badgeText}</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 font-mono">
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span>{isMr ? `थेट संपर्क: ${formattedMobile}` : `Direct Contact: ${formattedMobile}`}</span>
                </span>
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

          {/* Action CTA Buttons (Direct Call, WhatsApp, Official Website) */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full lg:w-auto shrink-0 justify-end pt-1 lg:pt-0">
            {/* 1. Direct Call Action Button with Coaching Class Mobile Number */}
            <a
              href={`tel:${activeMobile}`}
              className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 group"
              title={`थेट कॉल करा: ${formattedMobile}`}
            >
              <Phone className="w-4 h-4 text-stone-950 group-hover:rotate-12 transition-transform shrink-0" />
              <span>{isMr ? `कॉल करा: ${formattedMobile}` : `Call: ${formattedMobile}`}</span>
            </a>

            {/* 2. Direct WhatsApp Action Button with Coaching Class WhatsApp Number */}
            <a
              href={`https://wa.me/${activeWa.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                isMr
                  ? `नमस्ते! मला ${effectiveConfig.title} बाबत माहिती हवी आहे.`
                  : `Hello! I would like to inquire about ${effectiveConfig.title}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 group"
              title={`WhatsApp वर थेट संपर्क साधा: ${formattedWa}`}
            >
              <MessageCircle className="w-4 h-4 text-stone-950 shrink-0 group-hover:scale-110 transition-transform" />
              <span>{isMr ? `WhatsApp: ${formattedWa}` : `WhatsApp: ${formattedWa}`}</span>
            </a>

            {/* 3. Official Website Link */}
            <a
              href={effectiveConfig.clickUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-stone-850 hover:bg-stone-800 text-amber-300 hover:text-white border border-amber-500/40 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95 group"
            >
              <span className="truncate max-w-[130px] sm:max-w-none">{effectiveConfig.buttonText}</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
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
          <div className="w-full max-w-2xl bg-stone-900 border border-amber-500/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-white">
            {/* Modal Header */}
            <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Settings2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    {isMr ? '👑 अकॅडमी बॅनर व कोचिंग क्लास मोबाइल नंबर' : 'Academy Banner & Coaching Class Mobile'}
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    {isMr ? 'कोचिंग क्लास निवडा — त्याचा अधिकृत मोबाइल नंबर व तपशील आपोआप लागू होईल' : 'Select a coaching class to automatically apply its verified mobile number and details'}
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
                  <span>{isMr ? 'कोचिंग क्लास व मोबाइल नंबर यशस्वीरीत्या सेव्ह झाला!' : 'Coaching class and mobile number updated successfully!'}</span>
                </div>
              )}

              {/* 🎯 1-Click Coaching Class Selector (कोचिंग क्लास निवडा) */}
              <div className="bg-stone-950 p-3.5 rounded-xl border border-amber-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isMr ? '१. लोकप्रिय MPSC कोचिंग क्लासेस (१-क्लिकने निवडा):' : '1. Top MPSC Coaching Classes (1-Click Select):'}</span>
                  </label>
                  <span className="text-[10px] text-stone-400">
                    {isMr ? '८ नामांकित अकॅडमी' : '8 Verified Academies'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {COACHING_CLASS_PRESETS.map((preset) => {
                    const isSelected = selectedClassId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectCoachingClass(preset)}
                        className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-xs'
                            : 'bg-stone-900 border-stone-800 hover:border-amber-500/50 text-stone-300 hover:text-white'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                            <span className="text-xs font-black truncate">
                              {isMr ? preset.nameMr.split('•')[0] : preset.nameEn}
                            </span>
                          </div>
                          <div className="text-[10px] text-stone-400 flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-emerald-400 font-bold flex items-center gap-0.5">
                              <Phone className="w-2.5 h-2.5" />
                              {preset.mobileNumber}
                            </span>
                            <span>•</span>
                            <span className="truncate">{isMr ? preset.cityMr : preset.cityEn}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 📱 2. Coaching Class Mobile Number Input (मोबाइल नंबर) */}
              <div className="bg-gradient-to-r from-amber-950/30 to-stone-950 p-3.5 rounded-xl border border-amber-500/40">
                <label className="block text-xs font-bold text-amber-300 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isMr ? '२. कोचिंग क्लासचा थेट मोबाइल नंबर (Direct Mobile Number)' : '2. Coaching Class Direct Mobile Number'}</span>
                  </span>
                  <span className="text-[10px] text-amber-400 font-mono font-bold">
                    {formatMobileDisplay(formMobileNumber, isMr)}
                  </span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-2.5 text-amber-400" />
                  <input
                    type="tel"
                    required
                    value={formMobileNumber}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormMobileNumber(val);
                      // Auto-sync WhatsApp if desired
                      if (!formWhatsappNumber || formWhatsappNumber.includes(formMobileNumber.slice(-8))) {
                        setFormWhatsappNumber('91' + val.replace(/[^0-9]/g, ''));
                      }
                    }}
                    placeholder="उदा. 9860353056 / 9011116246"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs sm:text-sm text-stone-100 focus:outline-hidden focus:border-amber-400 font-mono"
                  />
                </div>
                <p className="text-[10px] text-stone-400 mt-1">
                  {isMr ? '💡 हा नंबर बॅनरवरील "कॉल करा" बटणावर थेट डायल होईल आणि बॅनरवर दिसेल.' : '💡 This number is dialed on the "Call" button and visible on the banner.'}
                </p>
              </div>

              {/* 💬 3. WhatsApp Contact Number Input */}
              <div>
                <label className="block text-xs font-bold text-emerald-400 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isMr ? '३. WhatsApp संपर्क क्रमांक (WhatsApp Number)' : '3. WhatsApp Contact Number'}</span>
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {formatMobileDisplay(formWhatsappNumber, isMr)}
                  </span>
                </label>
                <div className="relative">
                  <MessageCircle className="w-4 h-4 absolute left-3 top-2.5 text-emerald-500" />
                  <input
                    type="tel"
                    value={formWhatsappNumber}
                    onChange={(e) => setFormWhatsappNumber(e.target.value)}
                    placeholder="919860353056"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-hidden focus:border-emerald-400 font-mono"
                  />
                </div>
              </div>

              {/* 4. Title Input */}
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">
                  {isMr ? '४. अकॅडमी बॅनर टायटल (Title)' : '4. Banner Title'}
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

              {/* 5. Subtitle Input */}
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">
                  {isMr ? '५. उपशीर्षक / माहिती (Subtitle / Details)' : '5. Subtitle / Details'}
                </label>
                <textarea
                  rows={2}
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  placeholder="उदा. सदाशिव पेठ, पुणे • १००+ टेस्ट पेपर्स व दररोज क्लास"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              {/* 6. Click URL Input */}
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1 flex items-center justify-between">
                  <span>{isMr ? '६. क्लिक URL (Official Link)' : '6. Click URL'}</span>
                  <span className="text-[10px] text-stone-400 font-mono">https://...</span>
                </label>
                <div className="relative">
                  <LinkIcon className="w-4 h-4 absolute left-3 top-2.5 text-stone-500" />
                  <input
                    type="url"
                    required
                    value={formClickUrl}
                    onChange={(e) => setFormClickUrl(e.target.value)}
                    placeholder="https://mpscsathi.online"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-hidden focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              {/* 7. Image URL Input */}
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1 flex items-center justify-between">
                  <span>{isMr ? '७. बॅनर इमेज (Image URL)' : '7. Banner Image URL'}</span>
                  <span className="text-[10px] text-stone-400">/mpsc_textbooks.jpg</span>
                </label>
                <div className="relative">
                  <ImageIcon className="w-4 h-4 absolute left-3 top-2.5 text-stone-500" />
                  <input
                    type="text"
                    required
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="/mpsc_textbooks.jpg"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-hidden focus:border-amber-400 font-mono"
                  />
                </div>

                {/* Quick Presets for Image */}
                <div className="flex items-center gap-2 mt-2 flex-wrap text-[11px]">
                  <span className="text-stone-400 text-[10px]">{isMr ? 'इमेजेस:' : 'Images:'}</span>
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

              {/* 8. Button Text Input */}
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">
                  {isMr ? '८. बटण लेबल (Button Text)' : '8. Button Text'}
                </label>
                <input
                  type="text"
                  value={formButtonText}
                  onChange={(e) => setFormButtonText(e.target.value)}
                  placeholder="उदा. अधिकृत बॅच माहिती ➜"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-hidden focus:border-amber-400"
                />
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
