import React, { useState, useEffect } from 'react';
import {
  Building2,
  Phone,
  MessageCircle,
  ExternalLink,
  Award,
  Sparkles,
  CheckCircle2,
  Calendar,
  MapPin,
  Tag,
  Settings2,
  X,
  Check,
  RotateCcw,
  Volume2,
  Share2,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  DollarSign
} from 'lucide-react';

export interface AcademySponsorshipConfig {
  isEnabled: boolean;
  academyNameMr: string;
  academyNameEn: string;
  taglineMr: string;
  taglineEn: string;
  locationMr: string;
  locationEn: string;
  batchTitleMr: string;
  batchTitleEn: string;
  batchDetailsMr: string[];
  batchDetailsEn: string[];
  phone: string;
  whatsappNumber: string;
  websiteUrl: string;
  discountCode: string;
  discountOfferMr: string;
  discountOfferEn: string;
  themeColor: 'amber' | 'blue' | 'emerald' | 'purple' | 'red';
  badgeMr: string;
  badgeEn: string;
}

const STORAGE_KEY = 'mpsc_academy_sponsorship_banner_data';

export const DEFAULT_ACADEMY_PRESETS: { id: string; nameMr: string; nameEn: string; config: AcademySponsorshipConfig }[] = [
  {
    id: 'dnyanprabodhini_pune',
    nameMr: 'ज्ञानप्रबोधिनी स्पर्धा परीक्षा केंद्र, पुणे',
    nameEn: 'Dnyanaprabodhini MPSC Center, Pune',
    config: {
      isEnabled: true,
      academyNameMr: 'ज्ञानप्रबोधिनी स्पर्धा परीक्षा केंद्र, पुणे',
      academyNameEn: 'Dnyanaprabodhini MPSC Center, Pune',
      taglineMr: 'सदाशिव पेठ, पुणे • ४०+ वर्षांची गौरवशाली गुणवत्ता परंपरा',
      taglineEn: 'Sadashiv Peth, Pune • 40+ Years of Proven Merit Tradition',
      locationMr: 'सदाशिव पेठ, पुणे',
      locationEn: 'Sadashiv Peth, Pune',
      batchTitleMr: 'MPSC राज्यसेवा (नागरी सेवा) व संयुक्त गट-ब/क २०२६-२७ - नवीन ऑनलाईन / ऑफलाईन बॅच!',
      batchTitleEn: 'MPSC Rajyaseva & Combine Group B/C 2026-27 - Fresh Online & Classroom Batch!',
      batchDetailsMr: [
        'माजी सनदी अधिकारी व तज्ज्ञ प्राध्यापकांचे प्रत्यक्ष मार्गदर्शन',
        'दररोज टेस्ट सिरीज व १०० प्रश्नपत्रिकांचे सखोल विश्लेषण',
        'अद्ययावत डिजिटल व प्रिंटेड संदर्भ नोट्स मोफत',
        'मर्यादित ५० जागा • मोफत ३ दिवस डेमो लेक्चर्स'
      ],
      batchDetailsEn: [
        'Direct Mentorship by Former Bureaucrats & Top Subject Experts',
        'Daily Sectional Tests & 100+ Mock Papers Detailed Analysis',
        'Complete Up-to-date Printed & Digital Comprehensive Notes',
        'Strictly 50 Seats per Batch • 3 Days Free Demo Lectures'
      ],
      phone: '+919860353056',
      whatsappNumber: '919860353056',
      websiteUrl: 'https://mpscsathi.online',
      discountCode: 'MPSC2026',
      discountOfferMr: 'पोर्टल युजर्ससाठी विशेष २०% तात्काळ सवलत',
      discountOfferEn: 'Special 20% Instant Discount for Portal Aspirants',
      themeColor: 'amber',
      badgeMr: '🏆 अधिकृत अकॅडमी पार्टनर • प्रवेश सुरू',
      badgeEn: '🏆 Verified Academy Partner • Admissions Open'
    }
  },
  {
    id: 'aakar_foundation_pune',
    nameMr: 'आकार फाउंडेशन करिअर अकॅडमी, पुणे',
    nameEn: 'Aakar Foundation Career Academy, Pune',
    config: {
      isEnabled: true,
      academyNameMr: 'आकार फाउंडेशन करिअर अकॅडमी',
      academyNameEn: 'Aakar Foundation Career Academy',
      taglineMr: 'नवी पेठ, पुणे व छत्रपती संभाजीनगर • शेकडो वर्ग-१ अधिकारी घडवणारी संस्था',
      taglineEn: 'Navi Peth, Pune & Chh. Sambhajinagar • Producer of Hundreds of Class-1 Officers',
      locationMr: 'पुणे व छत्रपती संभाजीनगर',
      locationEn: 'Pune & Chh. Sambhajinagar',
      batchTitleMr: 'MPSC संयुक्त पूर्व+मुख्य परीक्षा २०२६-२७ ' + 'सुपर-६०' + ' गॅरंटीड बॅच!',
      batchTitleEn: 'MPSC Combine Prelims + Mains 2026-27 ' + 'Super-60' + ' Intensive Batch!',
      batchDetailsMr: [
        'प्रत्येक विद्यार्थ्यावर वैयक्तिक वन-ऑन-वन मेंटॉरशिप',
        'नवीन अभ्यासक्रमानुसार ५०००+ संभाव्य प्रश्नांचा महासराव',
        'मुलाखत व व्यक्तिमत्त्व विकास विशेष कार्यशाळा',
        'होस्टेल व लायब्ररी सुविधा उपलब्ध'
      ],
      batchDetailsEn: [
        'Personal 1-on-1 Mentorship for every enrolled aspirant',
        '5,000+ High-Yield Questions Practice on Latest Syllabus',
        'Exclusive Interview & Personality Development Bootcamps',
        'Hostel & 24/7 Digital Library Facility Available'
      ],
      phone: '+919823054321',
      whatsappNumber: '919823054321',
      websiteUrl: 'https://mpscsathi.online',
      discountCode: 'AAKAR50',
      discountOfferMr: 'नोंदणीवर ₹५,००० ची थेट स्कॉलरशिप',
      discountOfferEn: 'Flat ₹5,000 Scholarship on Early Enrollment',
      themeColor: 'purple',
      badgeMr: '⭐ स्टार MPSC अकॅडमी • प्रवेश सुरू',
      badgeEn: '⭐ Star MPSC Academy • Admissions Open'
    }
  },
  {
    id: 'sahyadri_academy',
    nameMr: 'सह्याद्री करिअर अकॅडमी (तलाठी व गट-क विशेष)',
    nameEn: 'Sahyadri Career Academy (Group C & Talathi)',
    config: {
      isEnabled: true,
      academyNameMr: 'सह्याद्री करिअर अकॅडमी, महाराष्ट्र',
      academyNameEn: 'Sahyadri Career Academy, Maharashtra',
      taglineMr: 'गट-क, तलाठी, नगरपरिषद व पोलीस भरतीमध्ये महाराष्ट्रात #१ निकाल',
      taglineEn: '#1 Results in Maharashtra for Group C, Talathi, and Municipal Services',
      locationMr: 'पुणे, नाशिक व कोल्हापूर',
      locationEn: 'Pune, Nashik & Kolhapur',
      batchTitleMr: 'MPSC गट-क संयुक्त पूर्व परीक्षा २०२६-२७ ' + 'फास्ट्रॅक क्रॅश कोर्स' + '!',
      batchTitleEn: 'MPSC Group C Prelims 2026-27 ' + 'Fastrack Crash Course' + '!',
      batchDetailsMr: [
        'मराठी व इंग्रजी व्याकरण संपूर्ण तयारी व शॉर्टकट ट्रिक्स',
        'गणित व बुद्धिमत्ता सुपरफास्ट सोडवण्याच्या क्लृप्त्या',
        '५० संपूर्ण टेस्ट सिरीज व १००% संभाव्य प्रश्नपत्रिका',
        'ऑफलाईन व रेकॉर्डेड लेक्चर्स अमर्यादित वेळा पाहण्याची सुविधा'
      ],
      batchDetailsEn: [
        'Marathi & English Grammar Complete Coverage with Memory Tricks',
        'Speed Aptitude & Reasoning Shortcuts for 100% Accuracy',
        '50 Full-Length Mocks & Model Solutions with In-depth Analysis',
        'Classroom + Unlimited Recorded Video Access'
      ],
      phone: '+919422098765',
      whatsappNumber: '919422098765',
      websiteUrl: 'https://mpscsathi.online',
      discountCode: 'SAHYADRI20',
      discountOfferMr: 'नवीन बॅचसाठी २०% तात्काळ सवलत उपलब्ध',
      discountOfferEn: 'Instant 20% Discount for New Enrollments',
      themeColor: 'emerald',
      badgeMr: '🎯 MPSC गट-क टॉपर अकॅडमी',
      badgeEn: '🎯 MPSC Group C Topper Academy'
    }
  },
  {
    id: 'unique_academy_pune',
    nameMr: 'द युनिक ॲकॅडमी, पुणे (The Unique Academy)',
    nameEn: 'The Unique Academy, Pune',
    config: {
      isEnabled: true,
      academyNameMr: 'द युनिक ॲकॅडमी, पुणे',
      academyNameEn: 'The Unique Academy, Pune',
      taglineMr: 'शिवाजीनगर व फर्ग्युसन कॉलेज रोड, पुणे • तुकुराम जाधव सर व नामवंत प्राध्यापक',
      taglineEn: 'Shivajinagar & FC Road, Pune • Led by Tukaram Jadhav Sir & Expert Team',
      locationMr: 'शिवाजीनगर, पुणे व मुंबई',
      locationEn: 'Shivajinagar, Pune & Mumbai',
      batchTitleMr: 'MPSC राज्यसेवा व संयुक्त पूर्व+मुख्य २०२६-२७ इंटीग्रेटेड बॅच!',
      batchTitleEn: 'MPSC Rajyaseva & Combine Integrated 2026-27 Batch!',
      batchDetailsMr: [
        'तुकुराम जाधव सर व वरिष्ठ प्राध्यापकांचे थेट मार्गदर्शन',
        'दर्जेदार संदर्भ पुस्तके व डिजिटल अभ्यास साहित्य मोफत',
        'दर आठवड्याला संपूर्ण अभ्यासक्रमावर आधारित मॉक टेस्ट',
        'मोफत ३ दिवस डेमो क्लासेसची सुविधा उपलब्ध'
      ],
      batchDetailsEn: [
        'Direct Guidance by Tukaram Jadhav Sir and Senior Faculty',
        'Free Comprehensive Study Material and Standard Reference Books',
        'Weekly Syllabus-based Full Mock Tests and Discussion',
        'Free 3-Day Demo Sessions Available for New Students'
      ],
      phone: '+918929920917',
      whatsappNumber: '918929920917',
      websiteUrl: 'https://mpscsathi.online',
      discountCode: 'UNIQUE25',
      discountOfferMr: 'इंटिग्रेटेड बॅचसाठी २५% थेट सवलत',
      discountOfferEn: 'Flat 25% Discount on Integrated Batch',
      themeColor: 'blue',
      badgeMr: '🏆 युनिक ॲकॅडमी पार्टनर • प्रवेश सुरू',
      badgeEn: '🏆 Unique Academy Partner • Admissions Open'
    }
  },
  {
    id: 'chanakya_mandal_pune',
    nameMr: 'चाणक्य मंडळ परिवार, पुणे व मुंबई',
    nameEn: 'Chanakya Mandal Pariwar, Pune & Mumbai',
    config: {
      isEnabled: true,
      academyNameMr: 'चाणक्य मंडळ परिवार, पुणे',
      academyNameEn: 'Chanakya Mandal Pariwar, Pune',
      taglineMr: 'नवी पेठ, पुणे • अविनाश धर्माधिकारी (माजी IAS) यांच्या मार्गदर्शनाखाली अधिकारी घडवणारी संस्था',
      taglineEn: 'Navi Peth, Pune • Mentored by Avinash Dharmadhikari (Ex-IAS)',
      locationMr: 'नवी पेठ, पुणे व छत्रपती संभाजीनगर',
      locationEn: 'Navi Peth, Pune & Mumbai',
      batchTitleMr: 'MPSC व UPSC अधिकारी घडवणारा पायाभूत विशेष वर्ग २०२६-२७!',
      batchTitleEn: 'MPSC & UPSC Civil Services Foundation Batch 2026-27!',
      batchDetailsMr: [
        'माजी सनदी अधिकारी अविनाश धर्माधिकारी सरांचे वैयक्तिक मार्गदर्शन',
        'प्रशासकीय नीतिमत्ता, नेतृत्वगुण व व्यक्तिमत्त्व विकास कार्यशाळा',
        'सर्व विषयांची विश्लेषणात्मक व सखोल तयारी',
        'अमर्यादित लायब्ररी व ऑनलाइन क्लासरूम सुविधा'
      ],
      batchDetailsEn: [
        'Personal Guidance by Avinash Dharmadhikari Sir (Ex-IAS)',
        'Administrative Ethics, Leadership & Personality Development',
        'Comprehensive GS & CSAT In-depth Preparation',
        'Unlimited Library & Digital Classroom Access'
      ],
      phone: '+919850985098',
      whatsappNumber: '919850985098',
      websiteUrl: 'https://mpscsathi.online',
      discountCode: 'CHANAKYA15',
      discountOfferMr: 'फाउंडेशन कोर्ससाठी १५% तात्काळ स्कॉलरशिप',
      discountOfferEn: 'Instant 15% Scholarship for Foundation Course',
      themeColor: 'purple',
      badgeMr: '👑 चाणक्य मंडळ पार्टनर • प्रवेश सुरू',
      badgeEn: '👑 Chanakya Mandal Partner • Admissions Open'
    }
  },
  {
    id: 'deepstambh_foundation',
    nameMr: 'दीपस्तंभ स्पर्धा परीक्षा केंद्र, पुणे व जळगाव',
    nameEn: 'Deepstambh Foundation MPSC Center',
    config: {
      isEnabled: true,
      academyNameMr: 'दीपस्तंभ स्पर्धा परीक्षा केंद्र, पुणे',
      academyNameEn: 'Deepstambh Foundation MPSC Center, Pune',
      taglineMr: 'पुणे व जळगाव • यजुर्वेंद्र महाजन सरांचे प्रेरक मार्गदर्शन व निवासी बॅच',
      taglineEn: 'Pune & Jalgaon • Guided by Yajurvendra Mahajan Sir & Residential Batches',
      locationMr: 'पुणे व जळगाव',
      locationEn: 'Pune & Jalgaon',
      batchTitleMr: 'MPSC मनोबल निवासी व ऑनलाइन सर्वसमावेशक बॅच २०२६-२७!',
      batchTitleEn: 'MPSC Manobal Residential & Online Batch 2026-27!',
      batchDetailsMr: [
        '२४ तास निवासी अभ्यासिका व वैयक्तिक समुपदेशन',
        'सर्व विषयांची शून्य ते शिखर तयारी',
        'चालू घडामोडींचे दैनिक विश्लेषण व नोट्स',
        'अधिकारी व्यक्तींचे साप्ताहिक विशेष मार्गदर्शन'
      ],
      batchDetailsEn: [
        '24/7 Residential Study Hall & Personal Mentorship',
        'Complete Ground-up Coverage of All GS Subjects',
        'Daily Current Affairs Analysis & Handcrafted Notes',
        'Weekly Guest Sessions by Serving Officers'
      ],
      phone: '+919970246246',
      whatsappNumber: '919970246246',
      websiteUrl: 'https://mpscsathi.online',
      discountCode: 'DEEPSTAMBH20',
      discountOfferMr: 'निवासी बॅचसाठी विशेष २०% सूट',
      discountOfferEn: 'Special 20% Off for Residential Batch',
      themeColor: 'amber',
      badgeMr: '🌟 दीपस्तंभ केंद्र पार्टनर • प्रवेश सुरू',
      badgeEn: '🌟 Deepstambh Center Partner • Admissions Open'
    }
  },
  {
    id: 'prithvi_academy_pune',
    nameMr: 'पृथ्वी अकॅडमी, पुणे (Prithvi Academy)',
    nameEn: 'Prithvi Academy, Pune',
    config: {
      isEnabled: true,
      academyNameMr: 'पृथ्वी अकॅडमी, पुणे',
      academyNameEn: 'Prithvi Academy, Pune',
      taglineMr: 'सदाशिव पेठ, पुणे • चालू घडामोडी व राज्यव्यवस्था विषयांची सर्वोत्तम तयारी',
      taglineEn: 'Sadashiv Peth, Pune • Best Preparation for GS & Current Affairs',
      locationMr: 'सदाशिव पेठ, पुणे',
      locationEn: 'Sadashiv Peth, Pune',
      batchTitleMr: 'MPSC राज्यसेवा पूर्व+मुख्य २०२६-२७ महासंग्राम बॅच!',
      batchTitleEn: 'MPSC Rajyaseva Prelims+Mains 2026-27 Master Batch!',
      batchDetailsMr: [
        'विषयानुरूप तज्ज्ञ प्राध्यापकांचे संपूर्ण मार्गदर्शन',
        '१०,०००+ बहुपर्यायी प्रश्नांचा सराव व टेस्ट सिरीज',
        'आयोगाच्या पॅटर्ननुसार अचूक दिशा आणि नियोजन',
        'ऑडिओ-व्हिडिओ डिजिटल क्लासरूम सुविधा'
      ],
      batchDetailsEn: [
        'Subject-matter Expert Faculty Guidance',
        '10,000+ Practice MCQs & Sectional Test Series',
        'Strict Alignment with Latest MPSC Exam Patterns',
        'State-of-the-Art Digital Classroom Environment'
      ],
      phone: '+919822453678',
      whatsappNumber: '919822453678',
      websiteUrl: 'https://mpscsathi.online',
      discountCode: 'PRITHVI20',
      discountOfferMr: 'महासंग्राम बॅचसाठी २०% तात्काळ सवलत',
      discountOfferEn: 'Instant 20% Off for Master Batch',
      themeColor: 'red',
      badgeMr: '🎯 पृथ्वी अकॅडमी पार्टनर • प्रवेश सुरू',
      badgeEn: '🎯 Prithvi Academy Partner • Admissions Open'
    }
  },
  {
    id: 'infinity_academy_pune',
    nameMr: 'इन्फिनिटी स्पर्धा परीक्षा अकॅडमी, पुणे व नाशिक',
    nameEn: 'Infinity Academy, Pune & Nashik',
    config: {
      isEnabled: true,
      academyNameMr: 'इन्फिनिटी स्पर्धा परीक्षा अकॅडमी',
      academyNameEn: 'Infinity Academy, Pune & Nashik',
      taglineMr: 'पुणे व नाशिक • MPSC तांत्रिक, अराजपत्रित व संयुक्त परीक्षांमध्ये अव्वल',
      taglineEn: 'Pune & Nashik • Top Results in Technical & Non-Gazetted Services',
      locationMr: 'पुणे व नाशिक',
      locationEn: 'Pune & Nashik',
      batchTitleMr: 'MPSC अराजपत्रित तांत्रिक व सामान्य अध्ययन बॅच २०२६-२७!',
      batchTitleEn: 'MPSC Non-Gazetted & Technical Master Batch 2026-27!',
      batchDetailsMr: [
        'सर्व विषयांची पायाभूत संकल्पनांपासून तयारी',
        'दैनिक क्विझ व साप्ताहिक रिव्हिजन टेस्ट',
        'रेकॉर्डेड व लाईव्ह लेक्चर्सची एकाच वेळी उपलब्धता',
        'मागील १० वर्षांच्या प्रश्नपत्रिकांचे सखोल विश्लेषण'
      ],
      batchDetailsEn: [
        'Fundamental Concept Building Across All Subjects',
        'Daily Sectional Quizzes & Weekly Revision Mocks',
        'Dual Access to Live & Recorded Classroom Sessions',
        'In-depth 10-Year PYQ Detailed Analysis'
      ],
      phone: '+919158444009',
      whatsappNumber: '919158444009',
      websiteUrl: 'https://mpscsathi.online',
      discountCode: 'INFINITY20',
      discountOfferMr: 'प्रवेशावर २०% थेट सवलत उपलब्ध',
      discountOfferEn: 'Flat 20% Discount on Admissions',
      themeColor: 'blue',
      badgeMr: '⚡ इन्फिनिटी अकॅडमी पार्टनर • प्रवेश सुरू',
      badgeEn: '⚡ Infinity Academy Partner • Admissions Open'
    }
  }
];

export const getStoredAcademyConfig = (): AcademySponsorshipConfig => {
  if (typeof window === 'undefined') return DEFAULT_ACADEMY_PRESETS[0].config;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Migrate legacy placeholder number if present
      if (parsed.whatsappNumber === '919822012345' || !parsed.whatsappNumber) {
        parsed.whatsappNumber = '919860353056';
      }
      if (parsed.phone === '+919822012345' || !parsed.phone) {
        parsed.phone = '+919860353056';
      }
      return { ...DEFAULT_ACADEMY_PRESETS[0].config, ...parsed };
    }
  } catch (e) {
    console.error('Error loading academy banner config:', e);
  }
  return DEFAULT_ACADEMY_PRESETS[0].config;
};

export const saveStoredAcademyConfig = (config: AcademySponsorshipConfig) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving academy banner config:', e);
  }
};

import { isUserAdmin } from '../utils/adminAuth';

interface AcademySponsorshipBannerProps {
  language: 'mr' | 'en';
  onOpenAdvertiseModal?: () => void;
  className?: string;
  isAdmin?: boolean;
}

export const AcademySponsorshipBanner: React.FC<AcademySponsorshipBannerProps> = ({
  language,
  onOpenAdvertiseModal,
  className = '',
  isAdmin
}) => {
  const isMr = language === 'mr';
  const [config, setConfig] = useState<AcademySponsorshipConfig>(getStoredAcademyConfig);
  const [isManagerOpen, setIsManagerOpen] = useState<boolean>(false);
  const [isAdvertiseInfoOpen, setIsAdvertiseInfoOpen] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [adminActive, setAdminActive] = useState<boolean>(() => isAdmin ?? isUserAdmin());

  useEffect(() => {
    if (isAdmin !== undefined) {
      setAdminActive(isAdmin);
    }
  }, [isAdmin]);

  useEffect(() => {
    const handleStorageChange = () => {
      setConfig(getStoredAcademyConfig());
      if (isAdmin === undefined) {
        setAdminActive(isUserAdmin());
      }
    };
    const handleAdminAuthChange = (e: any) => {
      if (e?.detail?.isAdmin !== undefined) {
        setAdminActive(e.detail.isAdmin);
      } else {
        setAdminActive(isUserAdmin());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('mpsc-admin-auth-changed', handleAdminAuthChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('mpsc-admin-auth-changed', handleAdminAuthChange);
    };
  }, [isAdmin]);

  if (!config.isEnabled) {
    return null;
  }

  const handleCopyCode = () => {
    if (!config.discountCode) return;
    navigator.clipboard.writeText(config.discountCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const themeStyles = {
    amber: {
      bg: 'from-stone-950 via-amber-950/40 to-stone-950',
      border: 'border-amber-500/40 hover:border-amber-400/70',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
      btnPrimary: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950',
      btnSecondary: 'bg-stone-850 hover:bg-stone-800 text-amber-300 border-amber-500/40',
      highlight: 'text-amber-400',
      glow: 'shadow-[0_0_35px_rgba(245,158,11,0.12)]'
    },
    purple: {
      bg: 'from-stone-950 via-purple-950/40 to-stone-950',
      border: 'border-purple-500/40 hover:border-purple-400/70',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
      btnPrimary: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white',
      btnSecondary: 'bg-stone-850 hover:bg-stone-800 text-purple-300 border-purple-500/40',
      highlight: 'text-purple-400',
      glow: 'shadow-[0_0_35px_rgba(168,85,247,0.12)]'
    },
    emerald: {
      bg: 'from-stone-950 via-emerald-950/40 to-stone-950',
      border: 'border-emerald-500/40 hover:border-emerald-400/70',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
      btnPrimary: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950',
      btnSecondary: 'bg-stone-850 hover:bg-stone-800 text-emerald-300 border-emerald-500/40',
      highlight: 'text-emerald-400',
      glow: 'shadow-[0_0_35px_rgba(16,185,129,0.12)]'
    },
    blue: {
      bg: 'from-stone-950 via-blue-950/40 to-stone-950',
      border: 'border-blue-500/40 hover:border-blue-400/70',
      badge: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
      btnPrimary: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white',
      btnSecondary: 'bg-stone-850 hover:bg-stone-800 text-blue-300 border-blue-500/40',
      highlight: 'text-blue-400',
      glow: 'shadow-[0_0_35px_rgba(59,130,246,0.12)]'
    },
    red: {
      bg: 'from-stone-950 via-rose-950/40 to-stone-950',
      border: 'border-rose-500/40 hover:border-rose-400/70',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/50',
      btnPrimary: 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white',
      btnSecondary: 'bg-stone-850 hover:bg-stone-800 text-rose-300 border-rose-500/40',
      highlight: 'text-rose-400',
      glow: 'shadow-[0_0_35px_rgba(244,63,94,0.12)]'
    }
  }[config.themeColor || 'amber'];

  const whatsappLink = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    isMr
      ? `नमस्ते! मला MPSC पोर्टलवरील बॅनरवरून आपल्या ${config.academyNameMr} च्या नवीन बॅचबद्दल माहिती हवी आहे.`
      : `Hello! I would like to inquire about the new batch at ${config.academyNameEn} via MPSC Portal.`
  )}`;

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${themeStyles.bg} border ${themeStyles.border} ${themeStyles.glow} transition-all duration-300 p-4 sm:p-6 text-white no-print ${className}`}
      >
        {/* Subtle Decorative Background Accents */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          {/* Left Column: Academy Info, Batch details, and Perks */}
          <div className="space-y-3 flex-1 min-w-0">
            {/* Top Bar Badges */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-black border flex items-center gap-1.5 ${themeStyles.badge}`}>
                <Building2 className="w-3.5 h-3.5" />
                <span>{isMr ? config.badgeMr : config.badgeEn}</span>
              </span>

              <span className="px-2 py-0.5 rounded-full bg-stone-850 text-stone-300 text-[10px] font-bold border border-stone-700 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-stone-400" />
                <span>{isMr ? config.locationMr : config.locationEn}</span>
              </span>

              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 bg-stone-900/80 px-2 py-0.5 rounded border border-stone-800">
                {isMr ? 'प्रायोजित (Sponsored)' : 'Sponsored Academy'}
              </span>
            </div>

            {/* Academy Title & Tagline */}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-snug">
                  {isMr ? config.academyNameMr : config.academyNameEn}
                </h3>
                <span className="inline-flex items-center justify-center p-0.5 bg-amber-400/20 text-amber-400 rounded-full" title="Verified Partner">
                  <CheckCircle2 className="w-4 h-4 fill-amber-400 text-stone-950" />
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 mt-0.5 leading-relaxed font-medium">
                {isMr ? config.taglineMr : config.taglineEn}
              </p>
            </div>

            {/* Batch Announcement Headline */}
            <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800/90 flex items-start gap-2.5">
              <Sparkles className={`w-4 h-4 shrink-0 mt-0.5 ${themeStyles.highlight} animate-pulse`} />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                  {isMr ? config.batchTitleMr : config.batchTitleEn}
                </h4>
              </div>
            </div>

            {/* Key Features Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-200 pt-0.5">
              {(isMr ? config.batchDetailsMr : config.batchDetailsEn).map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{detail}</span>
                </div>
              ))}
            </div>

            {/* Discount Code & Coupon Pill */}
            {config.discountCode && (
              <div className="flex items-center gap-2.5 pt-1 flex-wrap">
                <div
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/40 hover:bg-amber-500/25 cursor-pointer transition-all active:scale-95 text-xs text-amber-300 font-bold"
                  title={isMr ? "कोड कॉपी करण्यासाठी क्लिक करा" : "Click to copy code"}
                >
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isMr ? "कूपन कोड:" : "Code:"} <strong className="font-mono text-white underline decoration-amber-400 underline-offset-2">{config.discountCode}</strong></span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-amber-400 text-stone-950 font-black rounded">
                    {copiedCode ? (isMr ? 'कॉपी झाले! ✓' : 'Copied! ✓') : (isMr ? 'कॉपी करा' : 'Copy')}
                  </span>
                </div>
                <span className="text-xs text-stone-400 italic">
                  {isMr ? config.discountOfferMr : config.discountOfferEn}
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Actions (WhatsApp, Call, Website, Admin Settings) */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto shrink-0 justify-end pt-2 lg:pt-0">
            {/* Primary Action: WhatsApp Inquiry */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer group active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>{isMr ? 'WhatsApp वर चौकशी करा' : 'Inquire on WhatsApp'}</span>
            </a>

            {/* Secondary Action: Call Academy Direct */}
            {config.phone && (
              <a
                href={`tel:${config.phone.replace(/[^0-9+]/g, '')}`}
                className={`w-full sm:w-auto px-5 py-3 rounded-xl ${themeStyles.btnPrimary} font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer group active:scale-95`}
              >
                <Phone className="w-4 h-4 text-stone-950 group-hover:rotate-12 transition-transform" />
                <span>{isMr ? `कॉल करा: ${config.phone}` : `Call: ${config.phone}`}</span>
              </a>
            )}

            {/* Tertiary Action: Official Website / Admission Form */}
            {config.websiteUrl && (
              <a
                href={config.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl ${themeStyles.btnSecondary} font-bold text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{isMr ? 'अधिकृत वेबसाईट / ॲडमिशन' : 'Official Website / Form'}</span>
              </a>
            )}

            {/* Utility Row: Advertise With Us & Admin Edit */}
            <div className="flex items-center justify-between gap-2 pt-1 text-[11px] text-stone-400">
              <button
                type="button"
                onClick={() => setIsAdvertiseInfoOpen(true)}
                className="hover:text-amber-300 underline underline-offset-2 transition-colors cursor-pointer flex items-center gap-1"
              >
                <DollarSign className="w-3 h-3 text-amber-400" />
                <span>{isMr ? 'येथे अकॅडमी जाहिरात द्या' : 'Advertise Academy Here'}</span>
              </button>

              {adminActive && (
                <button
                  type="button"
                  onClick={() => setIsManagerOpen(true)}
                  className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 border border-amber-500/40 text-[11px] font-bold shadow-xs"
                  title={isMr ? "👑 ॲडमिन: अकॅडमी बॅनर सेटिंग्स व कस्टमायझेशन" : "👑 Admin: Configure Academy Banner Settings"}
                >
                  <Settings2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isMr ? '👑 बदला' : '👑 Edit'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 1. ADMIN ACADEMY BANNER MANAGER MODAL */}
      {/* =================================================================== */}
      {isManagerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto text-white">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {isMr ? '🏛️ अकॅडमी बॅनर व्यवस्थापक (Sponsorship Manager)' : 'Academy Banner Manager'}
                  </h3>
                  <p className="text-xs text-stone-400">
                    {isMr ? 'तुमच्या किंवा स्पॉन्सर अकॅडमीची माहिती व बॅनर थेट कस्टमाईज करा' : 'Customize sponsor academy branding and contact points'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsManagerOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
              {/* Presets Quick Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-2">
                  ⚡ {isMr ? 'तयार अकॅडमी टेम्पलेट्स निवडा (Quick Presets):' : 'Load Academy Presets:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {DEFAULT_ACADEMY_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setConfig(preset.config);
                        saveStoredAcademyConfig(preset.config);
                      }}
                      className="p-2.5 rounded-xl border border-stone-800 bg-stone-950/80 hover:bg-stone-800/80 text-left transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <span className="font-bold text-white group-hover:text-amber-400 text-xs">
                        {isMr ? preset.nameMr : preset.nameEn}
                      </span>
                      <span className="text-[10px] text-stone-400 mt-1">
                        {isMr ? 'हे टेम्पलेट लागू करा →' : 'Apply template →'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Inputs */}
              <div className="space-y-3.5 pt-2 border-t border-stone-800">
                {/* Banner Visibility */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <div>
                    <span className="font-bold text-white block">
                      {isMr ? 'बॅनर प्रदर्शित करा' : 'Show Banner on Dashboard'}
                    </span>
                    <span className="text-[11px] text-stone-400">
                      {isMr ? 'बॅनर तात्पुरता लपवण्यासाठी किंवा चालू ठेवण्यासाठी टॉगल करा' : 'Toggle to show or hide the academy sponsorship card'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.isEnabled}
                    onChange={(e) => {
                      const next = { ...config, isEnabled: e.target.checked };
                      setConfig(next);
                      saveStoredAcademyConfig(next);
                    }}
                    className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                  />
                </div>

                {/* Academy Name */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {isMr ? 'अकॅडमीचे नाव (मराठी):' : 'Academy Name (Marathi):'}
                  </label>
                  <input
                    type="text"
                    value={config.academyNameMr}
                    onChange={(e) => {
                      const next = { ...config, academyNameMr: e.target.value };
                      setConfig(next);
                      saveStoredAcademyConfig(next);
                    }}
                    placeholder="उदा. ज्ञानप्रबोधिनी स्पर्धा परीक्षा केंद्र, पुणे"
                    className="w-full p-2.5 bg-stone-950 rounded-xl border border-stone-800 focus:border-amber-400 text-white text-xs outline-none"
                  />
                </div>

                {/* Tagline & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      {isMr ? 'टॅगलाईन / पत्ता:' : 'Tagline / Address:'}
                    </label>
                    <input
                      type="text"
                      value={config.taglineMr}
                      onChange={(e) => {
                        const next = { ...config, taglineMr: e.target.value };
                        setConfig(next);
                        saveStoredAcademyConfig(next);
                      }}
                      className="w-full p-2.5 bg-stone-950 rounded-xl border border-stone-800 focus:border-amber-400 text-white text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      {isMr ? 'शहर / ठिकाण:' : 'City / Location:'}
                    </label>
                    <input
                      type="text"
                      value={config.locationMr}
                      onChange={(e) => {
                        const next = { ...config, locationMr: e.target.value };
                        setConfig(next);
                        saveStoredAcademyConfig(next);
                      }}
                      className="w-full p-2.5 bg-stone-950 rounded-xl border border-stone-800 focus:border-amber-400 text-white text-xs outline-none"
                    />
                  </div>
                </div>

                {/* Batch Announcement Headline */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {isMr ? 'नवीन बॅच घोषणा / हेडलाईन:' : 'Batch Announcement Headline:'}
                  </label>
                  <input
                    type="text"
                    value={config.batchTitleMr}
                    onChange={(e) => {
                      const next = { ...config, batchTitleMr: e.target.value };
                      setConfig(next);
                      saveStoredAcademyConfig(next);
                    }}
                    className="w-full p-2.5 bg-stone-950 rounded-xl border border-stone-800 focus:border-amber-400 text-white text-xs outline-none"
                  />
                </div>

                {/* Phone & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      {isMr ? 'कॉल नंबर:' : 'Call Phone Number:'}
                    </label>
                    <input
                      type="text"
                      value={config.phone}
                      onChange={(e) => {
                        const next = { ...config, phone: e.target.value };
                        setConfig(next);
                        saveStoredAcademyConfig(next);
                      }}
                      placeholder="+919860353056"
                      className="w-full p-2.5 bg-stone-950 rounded-xl border border-stone-800 focus:border-amber-400 text-white text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      {isMr ? 'WhatsApp नंबर (Country code सह):' : 'WhatsApp Number (with country code):'}
                    </label>
                    <input
                      type="text"
                      value={config.whatsappNumber}
                      onChange={(e) => {
                        const next = { ...config, whatsappNumber: e.target.value };
                        setConfig(next);
                        saveStoredAcademyConfig(next);
                      }}
                      placeholder="919860353056"
                      className="w-full p-2.5 bg-stone-950 rounded-xl border border-stone-800 focus:border-amber-400 text-white text-xs outline-none"
                    />
                  </div>
                </div>

                {/* Website Link & Discount Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      {isMr ? 'वेबसाईट किंवा गुगल फॉर्म लिंक:' : 'Website or Google Form URL:'}
                    </label>
                    <input
                      type="text"
                      value={config.websiteUrl}
                      onChange={(e) => {
                        const next = { ...config, websiteUrl: e.target.value };
                        setConfig(next);
                        saveStoredAcademyConfig(next);
                      }}
                      placeholder="https://..."
                      className="w-full p-2.5 bg-stone-950 rounded-xl border border-stone-800 focus:border-amber-400 text-white text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      {isMr ? 'डिस्काउंट कूपन कोड:' : 'Discount Coupon Code:'}
                    </label>
                    <input
                      type="text"
                      value={config.discountCode}
                      onChange={(e) => {
                        const next = { ...config, discountCode: e.target.value };
                        setConfig(next);
                        saveStoredAcademyConfig(next);
                      }}
                      placeholder="MPSC2026"
                      className="w-full p-2.5 bg-stone-950 rounded-xl border border-stone-800 focus:border-amber-400 text-white text-xs outline-none"
                    />
                  </div>
                </div>

                {/* Theme Color */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {isMr ? 'रंग थीम (Color Theme):' : 'Color Theme:'}
                  </label>
                  <div className="flex items-center gap-2">
                    {(['amber', 'purple', 'emerald', 'blue', 'red'] as const).map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => {
                          const next = { ...config, themeColor: color };
                          setConfig(next);
                          saveStoredAcademyConfig(next);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                          config.themeColor === color
                            ? 'ring-2 ring-white scale-105 shadow-md bg-stone-800 text-white'
                            : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setConfig(DEFAULT_ACADEMY_PRESETS[0].config);
                  saveStoredAcademyConfig(DEFAULT_ACADEMY_PRESETS[0].config);
                }}
                className="px-3 py-2 rounded-xl border border-stone-800 hover:bg-stone-800 text-stone-400 hover:text-white text-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isMr ? 'डिफॉल्ट रीसेट करा' : 'Reset Default'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsManagerOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all cursor-pointer shadow-md flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>{isMr ? 'बदल सेव्ह झाले (पूर्ण)' : 'Saved & Close'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. ADVERTISE YOUR ACADEMY HERE INQUIRY MODAL */}
      {/* =================================================================== */}
      {isAdvertiseInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col text-white my-auto">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950/80 to-stone-950 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {isMr ? '🏛️ अकॅडमी जाहिरात व प्रायोजकत्व' : 'Academy Sponsorship & Ads'}
                  </h3>
                  <p className="text-xs text-amber-300/80">
                    {isMr ? 'हजारो गंभीर MPSC विद्यार्थ्यांपर्यंत तुमचे बॅनर पोहोचवा' : 'Reach thousands of serious MPSC aspirants daily'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAdvertiseInfoOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {isMr
                    ? 'या पोर्टलवर दररोज हजारो MPSC, राज्यसेवा, कम्बाईन व गट-क चे विद्यार्थी मॉक टेस्ट आणि प्रश्न सोडवण्यासाठी येतात. येथे तुमची जाहिरात दिल्यास थेट क्लासचे ॲडमिशन्स वाढतात.'
                    : 'Thousands of active MPSC aspirants practice daily on this portal. Featuring your academy here drives direct, high-intent student admissions.'}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                  {isMr ? '⭐ प्रायोजकत्व पॅकेजचे फायदे:' : '⭐ Sponsorship Perks:'}
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{isMr ? 'डॅशबोर्डच्या सर्वात वरती हाय-व्हिजिबिलिटी बॅनर स्लॉट' : 'Top Dashboard High-Visibility Banner Placement'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{isMr ? 'विद्यार्थ्यांचा थेट तुमच्या WhatsApp वर संपर्क व कॉल' : 'Direct WhatsApp & Phone Click-to-Call Leads'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{isMr ? 'विशेष कूपन कोड व ऑनलाईन ॲडमिशन फॉर्म लिंक' : 'Exclusive Promo Discount Code & Direct Admission Link'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{isMr ? 'किफायतशीर मासिक दर: ₹५,००० ते ₹१५,००० / महिना' : 'Flat Monthly Plans: ₹5,000 to ₹15,000 / month'}</span>
                  </li>
                </ul>
              </div>

              {/* Direct WhatsApp Call to Action for Portal Admin */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/919860353056?text=${encodeURIComponent(
                    isMr
                      ? 'नमस्ते! मला MPSC पोर्टलवर माझ्या अकॅडमीची जाहिरात / बॅनर लावायचा आहे. कृपया मासिक दर व माहिती द्या.'
                      : 'Hello! I want to feature my coaching academy banner on your MPSC portal. Please share monthly rates.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-stone-950" />
                  <span>{isMr ? 'पोर्टल ॲडमिनशी WhatsApp वर संपर्क साधा (+९१ ९८६०३५३०५६)' : 'Contact Portal Admin via WhatsApp (+91 9860353056)'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
