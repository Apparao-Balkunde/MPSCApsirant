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
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  MPSC_AFFILIATE_BOOKS_DATA,
  MpscAffiliateBook,
  getStoredAffiliateTag,
  saveAffiliateTag,
  buildAmazonAffiliateUrl,
  DEFAULT_AMAZON_AFFILIATE_TAG,
  AMAZON_AFFILIATE_STEPS_MR
} from '../data/mpscAffiliateBooks';
import { SubjectId } from '../types';

interface MpscAffiliateBooksModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'mr' | 'en';
  onStartPractice?: (subjectId?: SubjectId, customTitle?: string) => void;
  initialTab?: 'books' | 'guide' | 'settings';
}

export const MpscAffiliateBooksModal: React.FC<MpscAffiliateBooksModalProps> = ({
  isOpen,
  onClose,
  language,
  onStartPractice,
  initialTab = 'books',
}) => {
  const isMr = language === 'mr';
  const [activeTab, setActiveTab] = useState<'books' | 'guide' | 'settings'>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedBookId, setCopiedBookId] = useState<string | null>(null);
  
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
    }
  }, [isOpen, initialTab]);

  const categories = [
    { id: 'all', labelMr: 'सर्व पुस्तके (१२)', labelEn: 'All Books (12)' },
    { id: 'polity', labelMr: 'राज्यशास्त्र', labelEn: 'Polity' },
    { id: 'maharashtra_geography', labelMr: 'भूगोल', labelEn: 'Geography' },
    { id: 'maharashtra_history', labelMr: 'इतिहास', labelEn: 'History' },
    { id: 'economy', labelMr: 'अर्थशास्त्र', labelEn: 'Economy' },
    { id: 'general_science', labelMr: 'सामान्य विज्ञान', labelEn: 'Science' },
    { id: 'marathi_grammar', labelMr: 'मराठी व्याकरण', labelEn: 'Marathi' },
    { id: 'english', labelMr: 'इंग्रजी व्याकरण', labelEn: 'English' },
    { id: 'csat', labelMr: 'CSAT बुद्धिमत्ता', labelEn: 'CSAT' },
    { id: 'pyq', labelMr: 'PYQ व ठोकळा', labelEn: 'PYQ Compilations' },
    { id: 'current_affairs', labelMr: 'चालू घडामोडी', labelEn: 'Current Affairs' },
  ];

  const filteredBooks = useMemo(() => {
    return MPSC_AFFILIATE_BOOKS_DATA.filter((book) => {
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'economy') {
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
  }, [selectedCategory, searchQuery]);

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
              onClick={() => setActiveTab('books')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'books'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{isMr ? '📖 संदर्भ पुस्तके स्टोअर (१२)' : 'Reference Books (12)'}</span>
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
              <span>{isMr ? '💡 ॲमेझॉन कमाई गाईड (कसे करावे?)' : 'Earning Guide (How-to)'}</span>
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
              <span>{isMr ? '⚙️ टॅग सेटिंग्ज व कॅल्क्युलेटर' : 'Tag Settings & Calculator'}</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-stone-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isMr ? 'अधिकृत Amazon India सिस्टीम' : 'Amazon.in Associates System'}</span>
          </div>
        </div>

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
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/90 text-stone-950 uppercase shadow-md flex items-center gap-0.5">
                              <TrendingUp className="w-3 h-3" />
                              {book.discountPercent}% OFF
                            </span>
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
