import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  BookOpen,
  Search,
  ExternalLink,
  Sparkles,
  ShoppingBag,
  DollarSign,
  Settings,
  HelpCircle,
  Copy,
  Check,
  Star,
  Award,
  TrendingUp,
  Percent,
  Layers,
  ShieldCheck,
  AlertCircle,
  Play,
  RotateCcw,
  Sliders,
  Share2,
  Link as LinkIcon,
  Plus,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  MPSC_AFFILIATE_BOOKS_DATA,
  MpscAffiliateBook,
  getStoredAffiliateTag,
  saveAffiliateTag,
  buildAmazonAffiliateUrl,
  DEFAULT_AMAZON_AFFILIATE_TAG,
  AMAZON_AFFILIATE_STEPS_MR,
  getCustomAffiliateBooks,
  saveCustomAffiliateBook,
  deleteCustomAffiliateBook,
  attachTagToAmazonUrl
} from '../data/mpscAffiliateBooks';
import {
  EARNING_PILLARS_DATA,
  REVENUE_PROJECTIONS_DATA,
  TELEGRAM_MONETIZATION_TEMPLATES,
  AMAZON_COMMISSION_SLABS_DATA,
  getStoredUpiId,
  saveStoredUpiId,
  getStoredUpiName
} from '../data/mpscEarningStrategiesData';
import { SubjectId } from '../types';

interface MpscAffiliateBooksModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'mr' | 'en';
  onStartPractice?: (subjectId?: SubjectId, customTitle?: string) => void;
  initialTab?: 'books' | 'guide' | 'settings' | 'link_checker' | 'earning_hub';
}

export const MpscAffiliateBooksModal: React.FC<MpscAffiliateBooksModalProps> = ({
  isOpen,
  onClose,
  language,
  onStartPractice,
  initialTab = 'books',
}) => {
  const isMr = language === 'mr';
  const [activeTab, setActiveTab] = useState<'books' | 'guide' | 'settings' | 'link_checker' | 'earning_hub'>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedBookId, setCopiedBookId] = useState<string | null>(null);
  
  // Earning Hub State
  const [selectedPillarId, setSelectedPillarId] = useState<string>('amazon_associates');
  const [copiedTemplateIdx, setCopiedTemplateIdx] = useState<number | null>(null);
  const [ownerUpiId, setOwnerUpiId] = useState<string>(getStoredUpiId());
  const [upiInput, setUpiInput] = useState<string>(ownerUpiId);
  const [isUpiSaved, setIsUpiSaved] = useState<boolean>(false);
  const [isCopiedUpi, setIsCopiedUpi] = useState<boolean>(false);
  
  // Custom books added by the user
  const [customBooks, setCustomBooks] = useState<MpscAffiliateBook[]>([]);

  // Link Checker & Custom Book Adder State
  const [testUrlInput, setTestUrlInput] = useState<string>('https://link.amazon/B0euWZvxo');
  const [isCopiedTestUrl, setIsCopiedTestUrl] = useState<boolean>(false);
  
  // New Book form state
  const [newBookTitle, setNewBookTitle] = useState<string>('MPSC चालू घडामोडी / सराव संच');
  const [newBookAuthor, setNewBookAuthor] = useState<string>('');
  const [newBookPrice, setNewBookPrice] = useState<string>('399');
  const [newBookSubject, setNewBookSubject] = useState<string>('current_affairs');
  const [bookAddSuccess, setBookAddSuccess] = useState<boolean>(false);

  // Custom Amazon Tag state
  const [affiliateTag, setAffiliateTag] = useState<string>(getStoredAffiliateTag());
  const [tagInput, setTagInput] = useState<string>(affiliateTag);
  const [isTagSaved, setIsTagSaved] = useState<boolean>(false);

  // Calculator state
  const [calcMonthlySales, setCalcMonthlySales] = useState<number>(60);
  const [calcAvgPrice, setCalcAvgPrice] = useState<number>(550);
  const [calcCommissionRate, setCalcCommissionRate] = useState<number>(8);

  useEffect(() => {
    if (isOpen) {
      const current = getStoredAffiliateTag();
      setAffiliateTag(current);
      setTagInput(current);
      setActiveTab(initialTab);
      setCustomBooks(getCustomAffiliateBooks());
      const upi = getStoredUpiId();
      setOwnerUpiId(upi);
      setUpiInput(upi);
    }
  }, [isOpen, initialTab]);

  const handleSaveUpi = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = upiInput.trim();
    saveStoredUpiId(clean);
    setOwnerUpiId(clean || 'apparaobalkunde901@okaxis');
    setIsUpiSaved(true);
    setTimeout(() => setIsUpiSaved(false), 3000);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(ownerUpiId);
    setIsCopiedUpi(true);
    setTimeout(() => setIsCopiedUpi(false), 2500);
  };

  const handleCopyTemplate = (text: string, idx: number) => {
    const formatted = text.replace(/YOUR_TAG-21/g, affiliateTag);
    navigator.clipboard.writeText(formatted);
    setCopiedTemplateIdx(idx);
    setTimeout(() => setCopiedTemplateIdx(null), 2500);
  };

  const allCombinedBooks = useMemo(() => {
    return [...customBooks, ...MPSC_AFFILIATE_BOOKS_DATA];
  }, [customBooks]);

  const categories = useMemo(() => {
    const list = [
      { id: 'all', labelMr: `सर्व पुस्तके (${allCombinedBooks.length})`, labelEn: `All Books (${allCombinedBooks.length})` },
    ];
    if (customBooks.length > 0) {
      list.push({
        id: 'custom',
        labelMr: `⭐ माझी जोडलेली पुस्तके (${customBooks.length})`,
        labelEn: `⭐ My Added Books (${customBooks.length})`,
      });
    }
    list.push(
      { id: 'study_gear', labelMr: '🎒 स्टडी गियर व गॅजेट्स (९% कमिशन)', labelEn: '🎒 Study Gear & Tech (9% Comm)' },
      { id: 'stationery_omr', labelMr: '📝 OMR शीट्स व स्टेशनरी', labelEn: '📝 OMR Sheets & Stationery' },
      { id: 'polity', labelMr: 'राज्यशास्त्र', labelEn: 'Polity' },
      { id: 'maharashtra_geography', labelMr: 'भूगोल व नकाशे', labelEn: 'Geography & Maps' },
      { id: 'maharashtra_history', labelMr: 'इतिहास', labelEn: 'History' },
      { id: 'economy', labelMr: 'अर्थशास्त्र', labelEn: 'Economy' },
      { id: 'general_science', labelMr: 'सामान्य विज्ञान', labelEn: 'Science' },
      { id: 'marathi_grammar', labelMr: 'मराठी व्याकरण', labelEn: 'Marathi' },
      { id: 'english', labelMr: 'इंग्रजी व्याकरण', labelEn: 'English' },
      { id: 'csat', labelMr: 'CSAT बुद्धिमत्ता', labelEn: 'CSAT' },
      { id: 'pyq', labelMr: 'PYQ व ठोकळा', labelEn: 'PYQ Compilations' },
      { id: 'current_affairs', labelMr: 'चालू घडामोडी', labelEn: 'Current Affairs' }
    );
    return list;
  }, [customBooks, allCombinedBooks.length]);

  const filteredBooks = useMemo(() => {
    return allCombinedBooks.filter((book) => {
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'custom') {
          if (!book.id.startsWith('custom_')) return false;
        } else if (selectedCategory === 'economy') {
          if (book.subjectId !== 'economy') return false;
        } else if (book.subjectId !== selectedCategory) {
          return false;
        }
      }

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        book.titleMr.toLowerCase().includes(q) ||
        book.titleEn.toLowerCase().includes(q) ||
        book.authorMr.toLowerCase().includes(q) ||
        book.authorEn.toLowerCase().includes(q) ||
        book.publisherMr.toLowerCase().includes(q) ||
        book.subjectNameMr.toLowerCase().includes(q) ||
        book.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [allCombinedBooks, selectedCategory, searchQuery]);

  const handleSaveTag = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = tagInput.trim();
    saveAffiliateTag(clean);
    setAffiliateTag(clean || DEFAULT_AMAZON_AFFILIATE_TAG);
    setIsTagSaved(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
    });
    setTimeout(() => setIsTagSaved(false), 3000);
  };

  const handleResetTag = () => {
    saveAffiliateTag(DEFAULT_AMAZON_AFFILIATE_TAG);
    setAffiliateTag(DEFAULT_AMAZON_AFFILIATE_TAG);
    setTagInput(DEFAULT_AMAZON_AFFILIATE_TAG);
    setIsTagSaved(true);
    setTimeout(() => setIsTagSaved(false), 2000);
  };

  const handleCopyBookLink = (book: MpscAffiliateBook) => {
    const url = buildAmazonAffiliateUrl(book, affiliateTag);
    navigator.clipboard.writeText(url);
    setCopiedBookId(book.id);
    setTimeout(() => setCopiedBookId(null), 2500);
  };

  const handleCopyTestUrl = (urlToCopy: string) => {
    navigator.clipboard.writeText(urlToCopy);
    setIsCopiedTestUrl(true);
    setTimeout(() => setIsCopiedTestUrl(false), 2500);
  };

  const handleAddCustomBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testUrlInput.trim() || !newBookTitle.trim()) return;

    const parsedPrice = parseInt(newBookPrice, 10) || 399;
    const newBook: MpscAffiliateBook = {
      id: `custom_${Date.now()}`,
      titleMr: newBookTitle.trim(),
      titleEn: newBookTitle.trim(),
      authorMr: newBookAuthor.trim() || 'एमपीएससी संदर्भ लेखक',
      authorEn: newBookAuthor.trim() || 'MPSC Reference Author',
      publisherMr: 'ॲमेझॉन सेलर / प्रकाशक',
      publisherEn: 'Amazon Seller / Publisher',
      subjectId: (newBookSubject as any) || 'current_affairs',
      subjectNameMr: 'अभ्यास साहित्य व सराव',
      subjectNameEn: 'Study Material & Practice',
      editionMr: 'नवीनतम आवृत्ती',
      editionEn: 'Latest Edition',
      mrp: Math.round(parsedPrice * 1.3),
      offerPrice: parsedPrice,
      discountPercent: 23,
      rating: 4.7,
      reviewsCount: 320,
      coverImage: '/mpsc_textbooks.jpg',
      importanceMr: 'विद्यार्थ्यांसाठी शिफारस केलेले महत्त्वाचे संदर्भ पुस्तक.',
      importanceEn: 'Recommended reference material for MPSC preparation.',
      topperTipMr: 'हे पुस्तक सराव चाचण्यांसह नियमित रिव्हाईज करा.',
      badgeMr: '⭐ जोडलेले पुस्तक (Custom)',
      badgeEn: '⭐ Added Book',
      tags: ['सराव', 'चालू घडामोडी', 'MPSC', 'पुस्तके'],
      customUrl: testUrlInput.trim(),
      amazonKeywords: newBookTitle.trim(),
      estimatedCommissionPercent: 8,
    };

    saveCustomAffiliateBook(newBook);
    setCustomBooks(getCustomAffiliateBooks());
    setBookAddSuccess(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
    });
    setTimeout(() => setBookAddSuccess(false), 3000);
  };

  const handleDeleteCustomBook = (bookId: string) => {
    deleteCustomAffiliateBook(bookId);
    setCustomBooks(getCustomAffiliateBooks());
  };

  // Calculator calculations
  const estimatedMonthlyIncome = Math.round(
    calcMonthlySales * calcAvgPrice * (calcCommissionRate / 100)
  );
  const estimatedYearlyIncome = estimatedMonthlyIncome * 12;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-6xl max-h-[94vh] bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-stone-900 via-amber-950/30 to-stone-900 border-b border-stone-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-stone-950 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0 font-black">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-xl font-black text-white">
                  {isMr 
                    ? '📚 MPSC अधिकृत संदर्भ पुस्तके व ॲमेझॉन स्टोअर' 
                    : '📚 MPSC Reference Books & Amazon Affiliate Store'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <Percent className="w-3 h-3" />
                  {isMr ? '५% ते १०% ॲमेझॉन कमिशन' : '5% - 10% Commission'}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-stone-800 text-amber-300 border border-amber-500/30">
                  Tag: {affiliateTag}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                {isMr
                  ? 'एम. लक्ष्मीकांत, सौदी, कोळंबे, महाजन व वाळंबे — टॉपर्सचे मूळ संदर्भ ग्रंथ, सवलत व ॲमेझॉन ॲफिलिएट कमाई प्रणाली.'
                  : 'Curated standard MPSC books with live Amazon Associate referral links, pricing discounts & owner earnings.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            title={isMr ? 'बंद करा' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 py-2.5 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-2 shrink-0 overflow-x-auto">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('earning_hub')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'earning_hub'
                  ? 'bg-gradient-to-r from-emerald-500 to-amber-500 text-stone-950 font-black shadow-lg shadow-emerald-500/20'
                  : 'bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50 border border-emerald-500/40'
              }`}
            >
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>{isMr ? '💰 १० कमाई मार्ग व उत्पन्न हब' : '10 Earning Pillars & Revenue Hub'}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500 text-stone-950 font-black">
                PRO
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('books')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'books'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{isMr ? `📖 संदर्भ ग्रंथ व गॅजेट्स (${allCombinedBooks.length})` : `Books & Gear (${allCombinedBooks.length})`}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('guide')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'guide'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>{isMr ? '💡 ॲमेझॉन कमाई गाईड' : 'Earning Guide'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>{isMr ? '⚙️ टॅग, UPI व कॅल्क्युलेटर' : 'Tag, UPI & Calculator'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('link_checker')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'link_checker'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30'
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              <span>{isMr ? '🔗 ॲमेझॉन लिंक तपासक व ॲड पुस्तक' : 'Link Checker & Add Book'}</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-stone-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isMr ? 'अधिकृत Amazon India सिस्टीम' : 'Amazon.in Associates System'}</span>
          </div>
        </div>

        {/* Tab 0: 💰 10 Earning Pillars & Revenue Master Hub */}
        {activeTab === 'earning_hub' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Hero Header Banner */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-stone-900 to-amber-950/70 border border-emerald-500/30 relative overflow-hidden space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isMr ? 'पोर्टल मालकाचे अधिकृत कमाई व मॉनेटायझेशन केंद्र' : 'Official Portal Monetization Engine'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {isMr
                      ? '💰 MPSC पोर्टल कमाई केंद्र: १० सिद्ध कमाई मार्ग व उत्पन्न स्ट्रॅटेजी'
                      : '💰 MPSC Portal Earning Engine: 10 Proven Monetization Pillars'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {isMr
                      ? 'विद्यार्थ्यांना दर्जेदार मोफत सराव आणि १००,०००+ प्रश्न बँक पुरवताना पोर्टल मालकाला दरमहा ₹४५,००० ते ₹२,८०,०००+ निष्क्रीय उत्पन्न (Passive Income) मिळवून देणारे १० मास्टर कमाई मार्ग, थेट UPI देणगी QR, आणि १-क्लिक सोशल मीडिया ब्रॉडकास्ट!'
                      : 'Comprehensive passive income roadmap generating ₹45,000 - ₹2,80,000+/month through 10 diversified pillars while empowering Maharashtra civil service aspirants.'}
                  </p>
                </div>

                <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab('settings')}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-stone-950" />
                    <span>{isMr ? 'माझा UPI व टॅग सेट करा' : 'Configure UPI & Tag'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('books')}
                    className="px-4 py-2.5 rounded-xl bg-stone-850 hover:bg-stone-800 text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>{isMr ? `पुस्तके व गॅजेट्स (${allCombinedBooks.length}) ➜` : `Books & Gear (${allCombinedBooks.length}) ➜`}</span>
                  </button>
                </div>
              </div>

              {/* 4 Fast Stat Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-2 border-t border-stone-800/80">
                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 space-y-0.5">
                  <div className="text-[11px] text-stone-400 font-bold">{isMr ? 'कमाईचे खांब' : 'Revenue Pillars'}</div>
                  <div className="text-base sm:text-lg font-black text-emerald-400">१० मास्टर मार्ग</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 space-y-0.5">
                  <div className="text-[11px] text-stone-400 font-bold">{isMr ? 'ॲमेझॉन कमिशन' : 'Amazon Comm'}</div>
                  <div className="text-base sm:text-lg font-black text-amber-400">५% ते ९% थेट बँक</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 space-y-0.5">
                  <div className="text-[11px] text-stone-400 font-bold">{isMr ? 'थेट UPI कपात' : 'Direct UPI Cuts'}</div>
                  <div className="text-base sm:text-lg font-black text-cyan-400">०% कपात (१००% नफा)</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 space-y-0.5">
                  <div className="text-[11px] text-stone-400 font-bold">{isMr ? 'कमाल मासिक क्षमता' : 'Peak Potential'}</div>
                  <div className="text-base sm:text-lg font-black text-rose-400">₹२,८०,००० / महिना</div>
                </div>
              </div>
            </div>

            {/* Section 1: 🏆 Interactive 10 Master Earning Pillars */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span>{isMr ? '🏆 सर्व १० मास्टर कमाई स्तंभ (10 Proven Revenue Pillars):' : '🏆 10 Master Monetization Pillars:'}</span>
                  </h4>
                  <p className="text-xs text-stone-400">
                    {isMr ? 'कोणत्याही स्तंभावर क्लिक करून त्याची कृती योजना व प्रो टिप्स पाहा' : 'Click on any pillar to inspect execution roadmap & pro tips'}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-stone-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isMr ? '१० मार्ग थेट सक्रिय' : '10 Live Streams'}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {EARNING_PILLARS_DATA.map((pillar) => {
                  const isSelected = selectedPillarId === pillar.id;
                  return (
                    <div
                      key={pillar.id}
                      onClick={() => setSelectedPillarId(pillar.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 text-left ${
                        isSelected
                          ? 'bg-stone-800 border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500'
                          : 'bg-stone-850 hover:bg-stone-800/80 border-stone-800'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-2xl">{pillar.icon}</span>
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black border uppercase ${pillar.badgeColor}`}>
                            {pillar.categoryMr}
                          </span>
                        </div>

                        <div>
                          <h5 className="text-sm font-black text-white leading-snug">
                            {isMr ? pillar.titleMr : pillar.titleEn}
                          </h5>
                          <div className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
                            <span>{pillar.potentialMonthlyMr}</span>
                          </div>
                        </div>

                        <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                          {isMr ? pillar.summaryMr : pillar.summaryEn}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px]">
                        <span className="text-stone-400 font-medium">
                          {isMr ? 'कमिशन दर:' : 'Rate:'} <span className="text-amber-300 font-bold">{pillar.commissionOrCpmMr}</span>
                        </span>
                        <span className={`font-bold ${isSelected ? 'text-amber-400' : 'text-stone-500'}`}>
                          {isSelected ? 'सक्रिय ▾' : 'पहा ➜'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Active Selected Pillar In-depth Details Box */}
              {(() => {
                const activePillar = EARNING_PILLARS_DATA.find((p) => p.id === selectedPillarId) || EARNING_PILLARS_DATA[0];
                return (
                  <div className="p-5 sm:p-6 rounded-2xl bg-stone-900 border border-amber-500/40 space-y-4 animate-in fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl p-2 rounded-xl bg-stone-800 border border-stone-700">
                          {activePillar.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black border ${activePillar.badgeColor}`}>
                              {activePillar.categoryMr}
                            </span>
                            <span className="text-xs text-stone-400 font-bold">
                              काठिण्य पातळी: <span className="text-emerald-300 font-black capitalize">{activePillar.difficultyLevel}</span>
                            </span>
                          </div>
                          <h4 className="text-base sm:text-lg font-black text-white mt-0.5">
                            {isMr ? activePillar.titleMr : activePillar.titleEn}
                          </h4>
                        </div>
                      </div>

                      <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-black text-xs sm:text-sm text-right shrink-0">
                        {isMr ? activePillar.potentialMonthlyMr : activePillar.potentialMonthlyEn}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                        {isMr ? 'या मार्गाचे सविस्तर स्वरूप:' : 'Overview:'}
                      </h5>
                      <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                        {isMr ? activePillar.summaryMr : activePillar.summaryEn}
                      </p>
                    </div>

                    {/* Action Steps */}
                    <div className="space-y-2">
                      <h5 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{isMr ? 'अंमलबजावणीच्या ४ पायऱ्या (Action Plan):' : '4-Step Execution:'}</span>
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activePillar.actionStepsMr.map((step, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-stone-850 border border-stone-800 text-xs text-stone-300 flex items-start gap-2">
                            <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-snug">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pro Tip */}
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2">
                      <Star className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 fill-amber-400" />
                      <div>
                        <span className="font-black text-amber-300">{isMr ? 'सक्सेस सिक्रेट प्रो टिप: ' : 'Success Pro Tip: '}</span>
                        <span>{activePillar.proTipsMr[0]}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Section 2: 📱 Direct UPI Support & MPSC Pass QR Collection Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-850 to-emerald-950/60 border border-emerald-500/30 space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isMr ? '०% कपात थेट बँक खात्यात पैसे' : 'Zero Cut Direct Bank Settlements'}</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-white">
                    {isMr ? '📱 थेट UPI पेमेंट व MPSC सराव प्रो पास संकलन' : 'Direct UPI Payments & Student Support'}
                  </h4>
                  <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
                    {isMr
                      ? 'विद्यार्थी स्वेच्छेने गुरुदक्षिणा देणगी (₹२९) देतात किंवा वर्षभराच्या अमर्याद टेस्ट्ससाठी "सराव प्रो पास (₹४९ / ₹९९)" विकत घेतात. कोणत्याही पेमेंट गेटवे कमिशनशिवाय १००% रक्कम थेट तुमच्या PhonePe / Google Pay खात्यात जमा होते!'
                      : 'Students contribute voluntary tips or purchase ₹49/₹99 Mock Passes. 100% hits your UPI without gateway deductions.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-white font-bold text-xs flex items-center gap-1.5 border border-stone-700 cursor-pointer transition-colors"
                  >
                    {isCopiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{isCopiedUpi ? (isMr ? 'कॉपी झाले!' : 'Copied!') : (isMr ? 'UPI आयडी कॉपी करा' : 'Copy UPI ID')}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
                {/* QR Code Container */}
                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="p-2.5 rounded-xl bg-white shadow-xl">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=${encodeURIComponent(
                        ownerUpiId
                      )}&pn=MPSCAspirantPrep&cu=INR`}
                      alt="UPI QR Code"
                      className="w-36 h-36 rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-amber-300 break-all">{ownerUpiId}</div>
                    <div className="text-[11px] text-stone-400 font-medium mt-0.5">Apparao Balkunde (GPay / PhonePe / Paytm)</div>
                  </div>
                </div>

                {/* 3 Student Micro-pricing Options */}
                <div className="lg:col-span-2 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-300">☕ चहा देणगी</span>
                        <span className="text-sm font-black text-amber-400">₹२९</span>
                      </div>
                      <p className="text-[11px] text-stone-400 leading-snug">
                        विद्यार्थ्यांकडून स्वेच्छेने वेबसाइट सर्व्हरसाठी छोटी गुरुदक्षिणा.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-900 border border-emerald-500/30 space-y-1 relative overflow-hidden">
                      <span className="absolute right-2 top-2 px-1.5 py-0.2 rounded-md text-[9px] font-black bg-emerald-500 text-stone-950">
                        सर्वाधिक लोकप्रिय
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-300">🎟️ सराव प्रो पास</span>
                        <span className="text-sm font-black text-emerald-400">₹४९</span>
                      </div>
                      <p className="text-[11px] text-stone-400 leading-snug">
                        १ महिना १००,०००+ प्रश्न, ओएमआर सराव व विश्लेषण अनलॉक.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-300">👑 वार्षिक टॉपर क्लब</span>
                        <span className="text-sm font-black text-cyan-400">₹९९</span>
                      </div>
                      <p className="text-[11px] text-stone-400 leading-snug">
                        १ वर्षभर सर्व टेस्ट्स, समाजसुधारक व पंचायतराज स्पेशल नोट्स.
                      </p>
                    </div>
                  </div>

                  {/* Quick Form to update UPI */}
                  <form onSubmit={handleSaveUpi} className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 space-y-2">
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <input
                        type="text"
                        value={upiInput}
                        onChange={(e) => setUpiInput(e.target.value)}
                        placeholder="तुमचा PhonePe/GPay UPI आयडी (उदा. youremail@okaxis)"
                        className="w-full bg-stone-950 border border-stone-750 rounded-xl px-3 py-2 text-xs font-mono text-emerald-300 focus:outline-hidden focus:border-emerald-500"
                      />
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs shrink-0 cursor-pointer transition-all"
                      >
                        {isMr ? 'UPI सेव्ह करा' : 'Save UPI'}
                      </button>
                    </div>
                    {isUpiSaved && (
                      <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1.5 animate-in fade-in">
                        <Check className="w-3.5 h-3.5" />
                        <span>{isMr ? 'अभिनंदन! तुमचा UPI आयडी यशस्वीरीत्या सेव्ह झाला आहे.' : 'Success! Your UPI ID is saved.'}</span>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>

            {/* Section 3: 📈 Student Traffic to Revenue Matrix (5 Tiers) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-stone-850 border border-stone-800 space-y-4">
              <div>
                <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <span>{isMr ? '📈 विद्यार्थी संख्या व उत्पन्न अंदाज पत्रक (Traffic to Monthly Revenue Matrix):' : 'Revenue Projection Matrix:'}</span>
                </h4>
                <p className="text-xs text-stone-400">
                  {isMr
                    ? 'दररोज पोर्टलवर येणाऱ्या विद्यार्थ्यांच्या संख्येनुसार मासिक व वार्षिक उत्पन्नाचा वास्तववादी अंदाज'
                    : 'Realistic revenue projection across 5 scaling tiers of student traffic'}
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-300 border-collapse">
                  <thead>
                    <tr className="border-b border-stone-700 bg-stone-900/90 text-stone-400 font-bold">
                      <th className="p-3">{isMr ? 'टप्पा (Tier)' : 'Tier'}</th>
                      <th className="p-3">{isMr ? 'दैनिक विद्यार्थी' : 'Daily Students'}</th>
                      <th className="p-3">{isMr ? 'AdSense कमाई' : 'AdSense'}</th>
                      <th className="p-3">{isMr ? 'पुस्तक विक्री' : 'Books Sold'}</th>
                      <th className="p-3">{isMr ? 'ॲफिलिएट कमिशन' : 'Affiliate Comm'}</th>
                      <th className="p-3">{isMr ? 'एकूण मासिक' : 'Monthly Total'}</th>
                      <th className="p-3 text-emerald-400">{isMr ? 'वार्षिक उत्पन्न' : 'Annual Total'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {REVENUE_PROJECTIONS_DATA.map((tier, idx) => (
                      <tr key={idx} className="hover:bg-stone-800/60 transition-colors">
                        <td className="p-3 font-bold text-white whitespace-nowrap">
                          {isMr ? tier.tierNameMr : tier.tierNameEn}
                        </td>
                        <td className="p-3 font-mono text-amber-300 font-bold whitespace-nowrap">
                          {tier.dailyActiveStudents.toLocaleString('en-IN')} / दिवस
                        </td>
                        <td className="p-3 font-mono text-blue-300 whitespace-nowrap">
                          ₹{tier.estimatedAdSenseEarnings.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3 font-mono text-stone-300 whitespace-nowrap">
                          {tier.estimatedAffiliateBookSales} पुस्तके
                        </td>
                        <td className="p-3 font-mono text-amber-400 whitespace-nowrap">
                          ₹{tier.estimatedAffiliateEarnings.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3 font-mono font-black text-emerald-400 text-sm whitespace-nowrap">
                          ₹{tier.totalMonthlyEarnings.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3 font-mono font-black text-amber-400 text-sm whitespace-nowrap">
                          ₹{tier.totalAnnualEarnings.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 4: 🚀 Ready-to-Use 1-Click Copy Telegram & WhatsApp Broadcast Messages */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-rose-400" />
                    <span>{isMr ? '🚀 रेडी-टू-कॉपी टेलिग्राम व व्हॉट्सॲप मेसेजेस (१-क्लिक कॉपी):' : 'Ready-to-Use Broadcast Templates:'}</span>
                  </h4>
                  <p className="text-xs text-stone-400">
                    {isMr
                      ? 'हे संदेश कॉपी करून तुमच्या टेलिग्राम चॅनेलवर किंवा व्हॉट्सॲप ग्रुपवर टाका; ॲमेझॉन खरेदी लिंक्स आपोआप जोडल्या आहेत!'
                      : 'High-converting viral post templates formatted for Telegram and WhatsApp broadcast channels.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TELEGRAM_MONETIZATION_TEMPLATES.map((tmpl, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-stone-850 border border-stone-800 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="text-sm font-black text-white">
                          {isMr ? tmpl.strategyTitleMr : tmpl.strategyTitleEn}
                        </h5>
                        <button
                          type="button"
                          onClick={() => handleCopyTemplate(tmpl.postTemplateMr, idx)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all shrink-0"
                        >
                          {copiedTemplateIdx === idx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedTemplateIdx === idx ? (isMr ? 'कॉपी झाले!' : 'Copied!') : (isMr ? 'मेसेज कॉपी करा' : 'Copy')}</span>
                        </button>
                      </div>

                      <div className="p-3 rounded-xl bg-stone-900 border border-stone-750 font-mono text-[11px] text-stone-300 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                        {tmpl.postTemplateMr.replace(/YOUR_TAG-21/g, affiliateTag)}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-800 grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-stone-500 font-bold">{isMr ? 'योग्य वेळ:' : 'Time:'} </span>
                        <span className="text-stone-300">{tmpl.recommendedTimeMr}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 font-bold">{isMr ? 'अपेक्षित विक्री:' : 'Sales:'} </span>
                        <span className="text-emerald-400 font-bold">{tmpl.expectedConversionMr}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: 🏷️ Amazon Commission Slabs Guide */}
            <div className="p-5 sm:p-6 rounded-2xl bg-stone-850 border border-stone-800 space-y-4">
              <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <Percent className="w-5 h-5 text-amber-400" />
                <span>{isMr ? '🏷️ ॲमेझॉन असोसिएट्स कॅटेगरी कमिशन दर (Commission Slabs):' : 'Amazon Commission Slabs Guide:'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {AMAZON_COMMISSION_SLABS_DATA.map((slab, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
                    <div className="text-xs font-bold text-amber-400">{slab.categoryMr}</div>
                    <div className="text-sm font-black text-emerald-400">{slab.commissionRate}</div>
                    <div className="text-[11px] text-stone-400">{slab.highlightMr}</div>
                    <div className="text-[10px] text-stone-500 pt-1 border-t border-stone-800/80">
                      उदा. {slab.bestProductsMr}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Books Store */}
        {activeTab === 'books' && (
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Search & Category Filter Toolbar */}
            <div className="p-3 sm:p-4 bg-stone-950/70 border-b border-stone-800 space-y-2.5 shrink-0">
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      isMr
                        ? 'पुस्तक, लेखक किंवा विषय शोधा (उदा. लक्ष्मीकांत, सौदी, कोळंबे, इतिहास, PYQ ठोकळा)...'
                        : 'Search books, authors, subjects (e.g. Laxmikanth, Saudi, Kolambe, PYQ)...'
                    }
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-10 pr-8 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-hidden focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                  <span className="text-xs text-stone-400 whitespace-nowrap">
                    {isMr ? `${filteredBooks.length} संदर्भ पुस्तके` : `${filteredBooks.length} Books Found`}
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveTab('link_checker')}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isMr ? '+ स्वतःची लिंक जोडा' : '+ Add Custom Link'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('settings')}
                    className="px-3 py-1.5 rounded-lg bg-stone-850 hover:bg-stone-800 border border-stone-700 text-amber-400 text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>{isMr ? 'माझा टॅग बदला' : 'Change Tag'}</span>
                  </button>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-amber-500 text-stone-950 shadow-xs'
                        : 'bg-stone-900 hover:bg-stone-850 text-stone-400 hover:text-stone-200 border border-stone-800'
                    }`}
                  >
                    {isMr ? cat.labelMr : cat.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Books Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {filteredBooks.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <BookOpen className="w-12 h-12 text-stone-600 mx-auto" />
                  <p className="text-sm font-semibold text-stone-400">
                    {isMr ? 'कोणतेही पुस्तक सापडले नाही.' : 'No matching books found.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                    className="px-4 py-2 bg-stone-800 hover:bg-stone-750 text-amber-300 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    {isMr ? 'सर्व पुस्तके पुन्हा दाखवा' : 'Reset Search'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBooks.map((book) => {
                    const amazonUrl = buildAmazonAffiliateUrl(book, affiliateTag);
                    const estimatedCommission = Math.round(book.offerPrice * (book.estimatedCommissionPercent / 100));

                    return (
                      <div
                        key={book.id}
                        className="rounded-2xl bg-stone-850 border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between overflow-hidden group shadow-md hover:shadow-xl"
                      >
                        {/* Book Image Header Banner */}
                        <div className="relative h-44 overflow-hidden bg-stone-950 border-b border-stone-800">
                          <img
                            src={book.coverImage}
                            alt={book.titleMr}
                            className="w-full h-full object-cover filter contrast-105 brightness-90 group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none" />

                          {/* Top Badges */}
                          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1">
                            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 uppercase shadow-md">
                              {isMr ? book.badgeMr : book.badgeEn}
                            </span>
                            <div className="flex items-center gap-1.5">
                              {book.id.startsWith('custom_') && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteCustomBook(book.id);
                                  }}
                                  className="p-1 rounded-md bg-rose-600/90 hover:bg-rose-500 text-white shadow-md cursor-pointer transition-colors"
                                  title={isMr ? 'पुस्तक काढून टाका' : 'Remove Custom Book'}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/90 text-stone-950 uppercase shadow-md flex items-center gap-0.5">
                                <TrendingUp className="w-3 h-3" />
                                {book.discountPercent}% OFF
                              </span>
                            </div>
                          </div>

                          {/* Bottom Info on Image */}
                          <div className="absolute bottom-2 left-3 right-3 text-white">
                            <div className="text-[11px] font-mono text-amber-400 font-bold drop-shadow-sm">
                              {isMr ? book.authorMr : book.authorEn}
                            </div>
                            <h3 className="text-sm sm:text-base font-black leading-snug drop-shadow-md line-clamp-1">
                              {isMr ? book.titleMr : book.titleEn}
                            </h3>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            {/* Publisher & Edition */}
                            <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800/80 pb-2">
                              <span>🏛️ {isMr ? book.publisherMr : book.publisherEn}</span>
                              <span className="text-stone-300 font-medium">📦 {isMr ? book.editionMr : book.editionEn}</span>
                            </div>

                            {/* Importance */}
                            <p className="text-xs text-stone-300 leading-relaxed line-clamp-2">
                              {isMr ? book.importanceMr : book.importanceEn}
                            </p>

                            {/* Topper Tip Box */}
                            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] leading-relaxed flex items-start gap-1.5">
                              <Star className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5 fill-amber-400" />
                              <span className="line-clamp-2">
                                <strong>{isMr ? 'टॉपर्स टीप:' : 'Tip:'}</strong> {book.topperTipMr}
                              </span>
                            </div>

                            {/* Price Strip */}
                            <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between">
                              <div>
                                <div className="text-[10px] text-stone-500 font-bold uppercase">
                                  {isMr ? 'ॲमेझॉन ऑफर किंमत' : 'Amazon Offer Price'}
                                </div>
                                <div className="flex items-baseline gap-2">
                                  <span className="text-base sm:text-lg font-black text-emerald-400 font-mono">
                                    ₹{book.offerPrice}
                                  </span>
                                  <span className="text-xs text-stone-500 line-through font-mono">
                                    ₹{book.mrp}
                                  </span>
                                </div>
                              </div>

                              <div className="text-right">
                                <div className="text-[10px] text-stone-400 font-medium">
                                  {isMr ? 'अपेक्षित कमिशन:' : 'Est. Commission:'}
                                </div>
                                <div className="text-xs font-black text-amber-400 font-mono">
                                  ~₹{estimatedCommission} ({book.estimatedCommissionPercent}%)
                                </div>
                              </div>
                            </div>

                            {/* Tags */}
                            <div className="flex items-center gap-1 flex-wrap pt-0.5">
                              {book.tags.slice(0, 3).map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-400"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-2 space-y-2">
                            <div className="flex items-center gap-2">
                              {/* Direct Amazon Buy Button with Affiliate Tag */}
                              <a
                                href={amazonUrl}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md hover:shadow-amber-500/20 transition-all cursor-pointer text-center"
                                title={`Amazon वर ₹${book.offerPrice} मध्ये खरेदी करा (Tag: ${affiliateTag})`}
                              >
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>{isMr ? 'ॲमेझॉनवर खरेदी करा' : 'Buy on Amazon'}</span>
                                <ExternalLink className="w-3 h-3 ml-0.5" />
                              </a>

                              {/* Copy Link button */}
                              <button
                                type="button"
                                onClick={() => handleCopyBookLink(book)}
                                className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white border border-stone-700 transition-colors cursor-pointer"
                                title={isMr ? 'ॲफिलिएट लिंक कॉपी करा' : 'Copy affiliate URL'}
                              >
                                {copiedBookId === book.id ? (
                                  <Check className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <Copy className="w-4 h-4 text-stone-400" />
                                )}
                              </button>
                            </div>

                            {/* In-app practice test button */}
                            {onStartPractice && (
                              <button
                                type="button"
                                onClick={() =>
                                  onStartPractice(
                                    book.subjectId as SubjectId,
                                    isMr ? `📚 ${book.titleMr} आधारित सराव चाचणी` : `Practice Test: ${book.titleEn}`
                                  )
                                }
                                className="w-full py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-amber-300 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <Play className="w-3 h-3 text-amber-400 fill-amber-400" />
                                <span>{isMr ? 'या पुस्तकातील सराव प्रश्न सोडवा' : 'Practice Book MCQs'}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Affiliate Earning Step-by-Step Guide */}
        {activeTab === 'guide' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-stone-900 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {isMr ? 'महिन्याला ₹५,००० ते ₹२५,०००+ निष्क्रीय उत्पन्न (Passive Income)' : 'Passive Income Roadmap'}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {isMr 
                    ? 'ॲमेझॉन असोसिएट्स द्वारे MPSC पुस्तकांवर कमाई कशी करावी?' 
                    : 'How to Earn Money Recommending MPSC Reference Books'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                  {isMr
                    ? 'MPSC ची तयारी करणाऱ्या प्रत्येक विद्यार्थ्याला लक्ष्मीकांत, सौदी, कोळंबे आणि वाळंबे ही पुस्तके विकत घ्यावीच लागतात. तुमच्या वेबसाइटवरून किंवा टेलिग्राम ग्रुपवरून विद्यार्थी जेव्हा ही पुस्तके खरेदी करतात, तेव्हा ॲमेझॉन तुम्हाला ५% ते १०% कमिशन थेट तुमच्या बँकेत जमा करते.'
                    : 'Aspirants need these exact textbooks. By linking your Amazon Associates ID, you receive 5% to 10% on every qualified book order directly to your bank account via NEFT.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                <a
                  href="https://affiliate-program.amazon.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>{isMr ? 'ॲमेझॉन असोसिएट्स साइन-अप ➜' : 'Open Amazon Associates ➜'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-stone-700 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isMr ? 'माझा टॅग सेट करा' : 'Configure Tag'}</span>
                </button>
              </div>
            </div>

            {/* 6 Steps Roadmap */}
            <div className="space-y-4">
              <h4 className="text-sm sm:text-base font-black text-stone-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{isMr ? 'सविस्तर ६ पायऱ्यांचे मार्गदर्शक (Step-by-Step Execution Plan):' : '6-Step Execution Guide:'}</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AMAZON_AFFILIATE_STEPS_MR.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-4 sm:p-5 rounded-2xl bg-stone-850 border border-stone-800 space-y-3 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-black text-sm shrink-0">
                        {step.stepNumber}
                      </div>
                      <h5 className="text-sm font-black text-white">
                        {step.title}
                      </h5>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed">
                      {step.desc}
                    </p>

                    <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-[11px] text-amber-300/90 flex items-start gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5 fill-amber-400" />
                      <span>{step.tip}</span>
                    </div>

                    {step.actionUrl && (
                      <a
                        href={step.actionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold underline underline-offset-4"
                      >
                        <span>{step.actionLabel}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Strategies to Maximise Sales */}
            <div className="p-5 rounded-2xl bg-stone-850 border border-stone-800 space-y-3">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>{isMr ? 'जास्तीत जास्त पुस्तक विक्री व कमाई वाढवण्याच्या ट्रिक्स:' : 'Pro Tips for Maximum Earnings:'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-300">
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                  <div className="font-bold text-amber-300">१. परीक्षेच्या आधी कॉम्बो सेट्स</div>
                  <p className="text-stone-400">
                    कम्बाइन किंवा राज्यसेवा परीक्षेच्या १-२ महिने आधी "टॉपर्स कॉम्बो सेट (६ पुस्तके)" चा प्रचार करा. विद्यार्थी एकाच वेळी ३-४ पुस्तके घेतात.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                  <div className="font-bold text-emerald-300">२. २४-तास कुकी बोनस</div>
                  <p className="text-stone-400">
                    विद्यार्थ्याने पुस्तकाच्या लिंकवर क्लिक केल्यावर पुढील २४ तासांत ॲमेझॉनवरून इतर कोणतीही वस्तू घेतली तरी त्यावरही तुम्हाला पूर्ण कमिशन मिळते!
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                  <div className="font-bold text-sky-300">३. टेलिग्राम व व्हॉट्सॲप शेअर</div>
                  <p className="text-stone-400">
                    पुस्तकांचे सराव प्रश्न सोडवल्यानंतर निकाल पाहाताना विद्यार्थ्यांना थेट संबंधित पुस्तकाची लिंक शेअर करा (उदा. "या विषयाची रिव्हिजन लक्ष्मीकांत मधून करा").
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Tag Settings & Earnings Calculator */}
        {activeTab === 'settings' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Box 1: Custom Amazon Associate Tag Config */}
              <div className="p-5 sm:p-6 rounded-2xl bg-stone-850 border border-stone-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">
                      {isMr ? 'तुमचा ॲमेझॉन असोसिएट टॅग (Store ID)' : 'Your Amazon Associate Tag'}
                    </h3>
                    <p className="text-xs text-stone-400">
                      {isMr ? 'Amazon कडून मिळालेला ट्रॅकिंग आयडी येथे टाका' : 'Enter your registered Amazon India Associate Tag'}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSaveTag} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1.5">
                      {isMr ? 'ॲमेझॉन असोसिएट टॅग (उदा. apparao-21 / mpscaspirant-21):' : 'Amazon Associate Tag / Store ID:'}
                    </label>
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="mpscaspirant-21"
                      className="w-full bg-stone-900 border border-stone-750 rounded-xl px-4 py-2.5 text-sm font-mono text-amber-300 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                    />
                    <p className="text-[11px] text-stone-400 mt-1">
                      {isMr 
                        ? 'हा टॅग सेव्ह केल्यावर या ॲपमधील सर्व १२ पुस्तकांच्या खरेदी लिंक्स आपोआप तुमच्या टॅगने अपडेट होतील.' 
                        : 'Saving this will dynamically update all book links across the website with your tracking ID.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all"
                    >
                      <Check className="w-4 h-4" />
                      <span>{isMr ? 'टॅग सेव्ह करा (Save Tag)' : 'Save Affiliate Tag'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetTag}
                      className="px-3 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-400 hover:text-white text-xs font-bold border border-stone-700 cursor-pointer transition-colors"
                      title={isMr ? 'डीफॉल्ट टॅगवर रीसेट करा' : 'Reset to default'}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  {isTagSaved && (
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                      <Check className="w-4 h-4" />
                      <span>{isMr ? 'अभिनंदन! तुमचा ॲमेझॉन टॅग यशस्वीरीत्या सेव्ह झाला आहे.' : 'Success! Your Amazon Associate Tag has been updated.'}</span>
                    </div>
                  )}
                </form>

                {/* Test Link Button */}
                <div className="pt-3 border-t border-stone-800 space-y-2">
                  <div className="text-xs text-stone-400 font-medium">
                    {isMr ? 'सध्या कार्यरत टॅग तपासणी (Test Link):' : 'Current Active Tag Test:'}
                  </div>
                  <a
                    href={`https://www.amazon.in/s?k=MPSC+Books&tag=${encodeURIComponent(affiliateTag)}`}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="w-full py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-750 text-amber-300 text-xs font-mono font-bold flex items-center justify-between transition-colors"
                  >
                    <span className="truncate">https://amazon.in/?tag={affiliateTag}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>

              {/* Box 2: Interactive Earnings Calculator */}
              <div className="p-5 sm:p-6 rounded-2xl bg-stone-850 border border-stone-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">
                      {isMr ? 'कमाई अंदाज कॅल्क्युलेटर (Earnings Calculator)' : 'Live Commission Calculator'}
                    </h3>
                    <p className="text-xs text-stone-400">
                      {isMr ? 'पुस्तकांच्या खपावरून तुमची मासिक व वार्षिक कमाई मोजा' : 'Estimate your monthly earnings based on book volume'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {/* Slider 1: Monthly Sales Volume */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-stone-300 mb-1">
                      <span>{isMr ? 'दरमहा खरेदी झालेली पुस्तके (Monthly Books Sold):' : 'Monthly Books Sold:'}</span>
                      <span className="font-mono text-amber-400 text-sm font-black">{calcMonthlySales} पुस्तके</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={500}
                      step={10}
                      value={calcMonthlySales}
                      onChange={(e) => setCalcMonthlySales(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-stone-500">
                      <span>१० पुस्तके</span>
                      <span>२५०</span>
                      <span>५०० पुस्तके</span>
                    </div>
                  </div>

                  {/* Slider 2: Average Book Price */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-stone-300 mb-1">
                      <span>{isMr ? 'पुस्तकाची सरासरी किंमत (Avg Book Price):' : 'Avg Book Price:'}</span>
                      <span className="font-mono text-amber-400 text-sm font-black">₹{calcAvgPrice}</span>
                    </div>
                    <input
                      type="range"
                      min={300}
                      max={1000}
                      step={50}
                      value={calcAvgPrice}
                      onChange={(e) => setCalcAvgPrice(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-stone-500">
                      <span>₹३००</span>
                      <span>₹६००</span>
                      <span>₹१०००</span>
                    </div>
                  </div>

                  {/* Slider 3: Commission Rate */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-stone-300 mb-1">
                      <span>{isMr ? 'कमिशन दर (Commission Rate):' : 'Commission Rate:'}</span>
                      <span className="font-mono text-emerald-400 text-sm font-black">{calcCommissionRate}%</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={10}
                      step={1}
                      value={calcCommissionRate}
                      onChange={(e) => setCalcCommissionRate(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-stone-500">
                      <span>५% (बेस)</span>
                      <span>८% (पुस्तके)</span>
                      <span>१०% (फेस्टिव्हल बोनस)</span>
                    </div>
                  </div>
                </div>

                {/* Calculator Results Card */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-300">
                      {isMr ? 'अपेक्षित मासिक निष्क्रीय कमाई:' : 'Estimated Monthly Income:'}
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                      ₹{estimatedMonthlyIncome.toLocaleString('en-IN')}/-
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-stone-800 pt-2">
                    <span className="text-xs text-stone-400">
                      {isMr ? 'वार्षिक अंदाजे उत्पन्न (१२ महिने):' : 'Estimated Yearly Income:'}
                    </span>
                    <span className="text-sm sm:text-base font-black text-emerald-400 font-mono">
                      ₹{estimatedYearlyIncome.toLocaleString('en-IN')}/-
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Amazon Link Checker & Custom Book Adder */}
        {activeTab === 'link_checker' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Top Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-stone-900 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {isMr ? 'लिंक तपासक व टॅग कन्व्हर्टर' : 'Link Converter & Validator'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-stone-800 text-emerald-400 border border-emerald-500/30">
                    Active Tag: {affiliateTag}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {isMr ? '🔗 कोणतीही ॲमेझॉन लिंक तपासा व स्वतःचे पुस्तक स्टोअरमध्ये जोडा' : 'Validate Any Amazon Link & Add Custom Book'}
                </h3>
                <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
                  {isMr 
                    ? 'ॲमेझॉन मोबाईल ॲपवरून कॉपी केलेली लिंक (उदा. link.amazon किंवा amzn.to किंवा dp लिंक) येथे टाका. सिस्टीम आपोआप तुमचा ॲफिलिएट टॅग जोडेल, ज्यामुळे त्या लिंकवरील प्रत्येक खरेदीचे कमिशन तुमच्या खात्यात जमा होईल.'
                    : 'Paste any Amazon link (from mobile app share or desktop). We will append your affiliate tag and let you save it to your bookstore.'}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('books')}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-white font-bold text-xs flex items-center gap-1.5 border border-stone-700 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isMr ? 'स्टोअरमध्ये जा' : 'View Store'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Box 1: Link Checker & Tag Attacher */}
              <div className="p-5 sm:p-6 rounded-2xl bg-stone-850 border border-stone-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white">
                      {isMr ? '१. ॲमेझॉन लिंक तपासा व टॅग जोडा' : '1. Test & Tag Amazon Link'}
                    </h4>
                    <p className="text-xs text-stone-400">
                      {isMr ? 'येथे तुमची लिंक पेस्ट करा' : 'Paste your shared Amazon link below'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1.5">
                      {isMr ? 'ॲमेझॉन प्रॉडक्ट / शेअर लिंक (URL):' : 'Amazon URL:'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={testUrlInput}
                        onChange={(e) => setTestUrlInput(e.target.value)}
                        placeholder="https://link.amazon/B0euWZvxo"
                        className="w-full bg-stone-900 border border-stone-750 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono text-amber-300 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                      />
                      {testUrlInput && (
                        <button
                          type="button"
                          onClick={() => setTestUrlInput('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Sample Quick Buttons */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] text-stone-400">{isMr ? 'उदाहरणे:' : 'Examples:'}</span>
                    <button
                      type="button"
                      onClick={() => setTestUrlInput('https://link.amazon/B0euWZvxo')}
                      className="text-[11px] px-2 py-0.5 rounded bg-stone-900 hover:bg-stone-800 text-amber-300 font-mono border border-stone-800 cursor-pointer"
                    >
                      link.amazon/B0euWZvxo
                    </button>
                    <button
                      type="button"
                      onClick={() => setTestUrlInput('https://www.amazon.in/dp/B08N5WRWNW')}
                      className="text-[11px] px-2 py-0.5 rounded bg-stone-900 hover:bg-stone-800 text-stone-300 font-mono border border-stone-800 cursor-pointer"
                    >
                      amazon.in/dp/B08...
                    </button>
                  </div>

                  {/* Tagged Converted Output */}
                  {testUrlInput.trim() && (
                    <div className="p-4 rounded-xl bg-stone-900 border border-stone-750 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-stone-300 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{isMr ? 'तयार झालेली ॲफिलिएट लिंक (Tagged Output):' : 'Tagged Output:'}</span>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {testUrlInput.includes('link.amazon') ? 'Amazon Mobile Share' : 'Amazon URL'}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-xs font-mono text-amber-300 break-all select-all">
                        {attachTagToAmazonUrl(testUrlInput, affiliateTag)}
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={attachTagToAmazonUrl(testUrlInput, affiliateTag)}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>{isMr ? '🚀 ॲमेझॉनवर टेस्ट करा (Open & Test)' : 'Test on Amazon'}</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleCopyTestUrl(attachTagToAmazonUrl(testUrlInput, affiliateTag))}
                          className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-white font-bold text-xs flex items-center gap-1.5 border border-stone-700 cursor-pointer transition-colors"
                        >
                          {isCopiedTestUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{isCopiedTestUrl ? (isMr ? 'कॉपी झाले!' : 'Copied!') : (isMr ? 'कॉपी करा' : 'Copy')}</span>
                        </button>
                      </div>

                      <p className="text-[11px] text-stone-400 leading-relaxed">
                        {isMr 
                          ? `✅ ही लिंक जेव्हा विद्यार्थी उघडतील, तेव्हा URL मध्ये तुमचा टॅग (${affiliateTag}) सक्रिय राहील आणि खरेदीवर तुम्हाला कमिशन मिळेल.`
                          : `✅ When aspirants click this link, your tag (${affiliateTag}) is attached to their session.`}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Box 2: Add this Book to Bookstore Form */}
              <div className="p-5 sm:p-6 rounded-2xl bg-stone-850 border border-stone-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white">
                      {isMr ? '२. हे पुस्तक तुमच्या स्टोअरमध्ये कायमस्वरूपी जोडा' : '2. Save Book to Your Store'}
                    </h4>
                    <p className="text-xs text-stone-400">
                      {isMr ? 'विद्यार्थ्यांना ॲपमधील बुकशेल्फवर हे पुस्तक दाखवा' : 'Make this book visible on your app bookshelf'}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleAddCustomBook} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      {isMr ? 'पुस्तकाचे नाव (Book Title):' : 'Book Title:'}
                    </label>
                    <input
                      type="text"
                      value={newBookTitle}
                      onChange={(e) => setNewBookTitle(e.target.value)}
                      placeholder="उदा. MPSC चालू घडामोडी / सराव संच"
                      required
                      className="w-full bg-stone-900 border border-stone-750 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-100 focus:outline-hidden focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">
                        {isMr ? 'लेखक / प्रकाशक:' : 'Author / Publisher:'}
                      </label>
                      <input
                        type="text"
                        value={newBookAuthor}
                        onChange={(e) => setNewBookAuthor(e.target.value)}
                        placeholder="उदा. के सागर / ज्ञानदीप"
                        className="w-full bg-stone-900 border border-stone-750 rounded-xl px-3.5 py-2 text-xs text-stone-100 focus:outline-hidden focus:border-amber-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">
                        {isMr ? 'अंदाजे ऑफर किंमत (₹):' : 'Offer Price (₹):'}
                      </label>
                      <input
                        type="number"
                        value={newBookPrice}
                        onChange={(e) => setNewBookPrice(e.target.value)}
                        placeholder="399"
                        className="w-full bg-stone-900 border border-stone-750 rounded-xl px-3.5 py-2 text-xs font-mono text-stone-100 focus:outline-hidden focus:border-amber-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      {isMr ? 'विषय वर्गवारी (Subject Category):' : 'Subject Category:'}
                    </label>
                    <select
                      value={newBookSubject}
                      onChange={(e) => setNewBookSubject(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-750 rounded-xl px-3.5 py-2 text-xs text-stone-200 focus:outline-hidden focus:border-amber-500 transition-all"
                    >
                      <option value="current_affairs">{isMr ? 'चालू घडामोडी (Current Affairs)' : 'Current Affairs'}</option>
                      <option value="pyq">{isMr ? 'PYQ व प्रश्नसंच (Question Bank)' : 'PYQ'}</option>
                      <option value="polity">{isMr ? 'राज्यशास्त्र (Polity)' : 'Polity'}</option>
                      <option value="economy">{isMr ? 'अर्थशास्त्र (Economy)' : 'Economy'}</option>
                      <option value="general_science">{isMr ? 'सामान्य विज्ञान (Science)' : 'Science'}</option>
                      <option value="maharashtra_geography">{isMr ? 'भूगोल (Geography)' : 'Geography'}</option>
                      <option value="maharashtra_history">{isMr ? 'इतिहास (History)' : 'History'}</option>
                      <option value="csat">{isMr ? 'CSAT बुद्धिमत्ता (CSAT)' : 'CSAT'}</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={!testUrlInput.trim() || !newBookTitle.trim()}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isMr ? 'हे पुस्तक माझ्या स्टोअरमध्ये सेव्ह करा' : 'Save Book to Bookstore'}</span>
                  </button>

                  {bookAddSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>{isMr ? 'पुस्तक स्टोअरमध्ये यशस्वीरीत्या जोडले गेले!' : 'Book added to store!'}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory('custom');
                          setActiveTab('books');
                        }}
                        className="underline text-amber-300 hover:text-white cursor-pointer"
                      >
                        {isMr ? 'स्टोअरमध्ये पहा ➜' : 'View in Store ➜'}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* List of Custom Books Added */}
            {customBooks.length > 0 && (
              <div className="p-5 rounded-2xl bg-stone-850 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>{isMr ? `माझी जोडलेली पुस्तके (${customBooks.length}):` : `My Added Books (${customBooks.length}):`}</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('custom');
                      setActiveTab('books');
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
                  >
                    {isMr ? 'सर्व स्टोअरमध्ये उघडा ➜' : 'Open in Store ➜'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {customBooks.map((cb) => (
                    <div
                      key={cb.id}
                      className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">{cb.titleMr}</div>
                        <div className="text-[11px] text-amber-400 font-mono">₹{cb.offerPrice}</div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <a
                          href={buildAmazonAffiliateUrl(cb, affiliateTag)}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-amber-300"
                          title="Open on Amazon"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomBook(cb.id)}
                          className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer with Amazon Policy Disclaimer */}
        <div className="p-3 sm:p-4 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-400 shrink-0">
          <div className="flex items-start sm:items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
            <p className="leading-relaxed">
              {isMr 
                ? 'कायदेशीर सूचना (Amazon Affiliate Disclosure): MPSCAspirant हे ॲमेझॉन असोसिएट्स प्रोग्रामचे सदस्य आहे. या ॲपमधील ॲफिलिएट लिंक्सवरून केलेल्या खरेदीवर आम्हाला कमिशन मिळते. विद्यार्थ्यांसाठी पुस्तकांची मूळ सवलत तशीच राहते, कोणताही अतिरिक्त भार पडत नाही.'
                : 'Affiliate Disclosure: MPSCAspirant participates in the Amazon Associates Program. As an Amazon Associate, we earn from qualifying purchases without any extra cost to students.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs shrink-0 cursor-pointer"
          >
            {isMr ? 'पूर्ण झाले' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
