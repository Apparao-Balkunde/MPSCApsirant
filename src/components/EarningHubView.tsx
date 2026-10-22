import React, { useState, useEffect, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  Link as LinkIcon,
  ExternalLink,
  Copy,
  Check,
  Plus,
  Trash2,
  Edit3,
  Filter,
  Search,
  ShieldCheck,
  Lock,
  Sparkles,
  RotateCcw,
  BarChart3,
  PieChart,
  ArrowUpRight,
  Eye,
  BookOpen,
  Smartphone,
  MessageCircle,
  Share2,
  Calendar,
  Layers,
  Percent,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X
} from 'lucide-react';
import { isUserAdmin } from '../utils/adminAuth';
import { getStoredAffiliateTag, saveAffiliateTag, attachTagToAmazonUrl } from '../data/mpscAffiliateBooks';
import { getStoredUpiId, getStoredUpiName } from '../data/mpscEarningStrategiesData';

export interface AffiliateLinkItem {
  id: string;
  titleMr: string;
  titleEn: string;
  url: string;
  category: 'amazon_book' | 'tech_gear' | 'academy_banner' | 'mock_series' | 'telegram' | 'custom';
  categoryLabelMr: string;
  categoryLabelEn: string;
  commissionRate: string;
  commissionPercent?: number;
  clicks: number;
  estimatedEarnings: number; // in INR
  isActive: boolean;
  couponCode?: string;
  isCustom?: boolean;
  createdAt?: string;
}

export interface RevenueMetricSnapshot {
  period: 'today' | 'week' | 'month' | 'year';
  totalRevenue: number;
  amazonAffiliate: number;
  upiDirectTips: number;
  academyBanners: number;
  premiumMocks: number;
  totalClicks: number;
  conversionRatePercent: number;
}

const STORAGE_AFFILIATE_LINKS_KEY = 'mpsc_admin_affiliate_links_hub';
const STORAGE_CLICK_LOGS_KEY = 'mpsc_admin_affiliate_clicks_log';

// Initial pre-loaded affiliate links for MPSC Portal Owner
const DEFAULT_AFFILIATE_LINKS: AffiliateLinkItem[] = [
  {
    id: 'link_mpsc_laxmikant',
    titleMr: 'एम. लक्ष्मीकांत - भारतीय राज्यघटना (Indian Polity 7th Edition)',
    titleEn: 'M. Laxmikanth - Indian Polity Marathi/English Edition',
    url: 'https://www.amazon.in/s?k=M+Laxmikanth+Polity+Marathi',
    category: 'amazon_book',
    categoryLabelMr: '📚 ॲमेझॉन संदर्भ पुस्तक',
    categoryLabelEn: 'Amazon Reference Book',
    commissionRate: '८% थेट बँक कमिशन',
    commissionPercent: 8,
    clicks: 142,
    estimatedEarnings: 3980,
    isActive: true,
    couponCode: 'AMZ-POLITY'
  },
  {
    id: 'link_mpsc_tatya_thokla',
    titleMr: 'तात्यांचा ठोकळा (MPSC सर्वसाधारण अध्ययन संदर्भ)',
    titleEn: 'Tatyancha Thokla - Complete MPSC General Studies',
    url: 'https://www.amazon.in/s?k=Tatyancha+Thokla+MPSC',
    category: 'amazon_book',
    categoryLabelMr: '📚 ॲमेझॉन संदर्भ पुस्तक',
    categoryLabelEn: 'Amazon Reference Book',
    commissionRate: '८% थेट बँक कमिशन',
    commissionPercent: 8,
    clicks: 198,
    estimatedEarnings: 5540,
    isActive: true
  },
  {
    id: 'link_mpsc_saudi_geography',
    titleMr: 'महाराष्ट्राचा भूगोल - प्रा. ए. बी. सवदी (K Sagar)',
    titleEn: 'Maharashtra Geography - Prof. A. B. Saudi',
    url: 'https://www.amazon.in/s?k=Saudi+Maharashtra+Geography+MPSC',
    category: 'amazon_book',
    categoryLabelMr: '📚 ॲमेझॉन संदर्भ पुस्तक',
    categoryLabelEn: 'Amazon Reference Book',
    commissionRate: '८% थेट बँक कमिशन',
    commissionPercent: 8,
    clicks: 87,
    estimatedEarnings: 2430,
    isActive: true
  },
  {
    id: 'link_mpsc_study_tablet',
    titleMr: 'Samsung Galaxy Tab A9 (विद्यार्थी ई-लर्निंग टॅब)',
    titleEn: 'Samsung Galaxy Tab A9 Study & E-Reading Tablet',
    url: 'https://www.amazon.in/s?k=Samsung+Galaxy+Tab+A9',
    category: 'tech_gear',
    categoryLabelMr: '📱 गॅजेट व टॅब्लेट (हाय-तिकीट)',
    categoryLabelEn: 'Study Tech & Gear',
    commissionRate: '५% हाय-तिकीट (₹५००-₹८००/विक्री)',
    commissionPercent: 5,
    clicks: 64,
    estimatedEarnings: 4200,
    isActive: true
  },
  {
    id: 'link_academy_partner_pune',
    titleMr: 'ज्ञानप्रबोधिनी व आकार करिअर अकॅडमी प्रायोजक बॅनर',
    titleEn: 'Jnana Prabodhini & Aakar Academy Sponsor Banner',
    url: 'https://mpscsathi.online',
    category: 'academy_banner',
    categoryLabelMr: '🏛️ अकॅडमी मासिक प्रायोजक',
    categoryLabelEn: 'Academy Sponsorship',
    commissionRate: '₹१०,००० / महिना फिक्स फी',
    commissionPercent: 100,
    clicks: 312,
    estimatedEarnings: 10000,
    isActive: true
  },
  {
    id: 'link_telegram_community',
    titleMr: 'MPSC सारथी Telegram व WhatsApp मोफत चॅनेल',
    titleEn: 'MPSC Sarathi Telegram & WhatsApp Channel Community',
    url: 'https://wa.me/919860353056?text=MPSC_Community_Join',
    category: 'telegram',
    categoryLabelMr: '📢 कम्युनिटी व ब्रॉडकास्ट',
    categoryLabelEn: 'Community Traffic',
    commissionRate: 'ऑर्गॅनिक ट्रॅफिक व थेट लीड्स',
    clicks: 450,
    estimatedEarnings: 1250,
    isActive: true
  }
];

export const getStoredAffiliateLinks = (): AffiliateLinkItem[] => {
  if (typeof window === 'undefined') return DEFAULT_AFFILIATE_LINKS;
  try {
    const raw = localStorage.getItem(STORAGE_AFFILIATE_LINKS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading stored affiliate links:', e);
  }
  return DEFAULT_AFFILIATE_LINKS;
};

export const saveStoredAffiliateLinks = (links: AffiliateLinkItem[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_AFFILIATE_LINKS_KEY, JSON.stringify(links));
  } catch (e) {
    console.error('Error saving affiliate links:', e);
  }
};

export interface EarningHubViewProps {
  isAdmin?: boolean;
  language?: 'mr' | 'en';
  onOpenSettings?: () => void;
  onOpenBooks?: () => void;
  className?: string;
}

export const EarningHubView: React.FC<EarningHubViewProps> = ({
  isAdmin,
  language = 'mr',
  onOpenSettings,
  onOpenBooks,
  className = ''
}) => {
  const isMr = language === 'mr';
  const [adminActive, setAdminActive] = useState<boolean>(() => isAdmin ?? isUserAdmin());
  const [activeSubTab, setActiveSubTab] = useState<'links' | 'statistics' | 'pillars'>('links');
  
  // Tag state
  const [affiliateTag, setAffiliateTag] = useState<string>(getStoredAffiliateTag);
  const [isEditingTag, setIsEditingTag] = useState<boolean>(false);
  const [tagInput, setTagInput] = useState<string>(affiliateTag);
  const [tagSuccess, setTagSuccess] = useState<boolean>(false);

  // Affiliate Links state
  const [links, setLinks] = useState<AffiliateLinkItem[]>(getStoredAffiliateLinks);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);

  // Timeframe for Revenue Statistics
  const [period, setPeriod] = useState<'today' | 'week' | 'month' | 'year'>('month');

  // Modal for Adding / Editing a Link
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<AffiliateLinkItem | null>(null);
  const [formTitle, setFormTitle] = useState<string>('');
  const [formUrl, setFormUrl] = useState<string>('');
  const [formCategory, setFormCategory] = useState<AffiliateLinkItem['category']>('amazon_book');
  const [formCommissionRate, setFormCommissionRate] = useState<string>('८% कमिशन');
  const [formCoupon, setFormCoupon] = useState<string>('');

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
    window.addEventListener('mpsc-admin-auth-changed', handleAdminAuthChange);
    window.addEventListener('storage', handleAdminAuthChange);
    return () => {
      window.removeEventListener('mpsc-admin-auth-changed', handleAdminAuthChange);
      window.removeEventListener('storage', handleAdminAuthChange);
    };
  }, []);

  // Save changes whenever links update
  const updateLinks = (newLinks: AffiliateLinkItem[]) => {
    setLinks(newLinks);
    saveStoredAffiliateLinks(newLinks);
  };

  // Filter links
  const filteredLinks = useMemo(() => {
    return links.filter((item) => {
      const matchSearch =
        searchQuery.trim() === '' ||
        item.titleMr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.url.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [links, searchQuery, selectedCategory]);

  // Aggregate Revenue Statistics dynamically based on period
  const revenueStats: RevenueMetricSnapshot = useMemo(() => {
    const baseAmazon = links
      .filter((l) => l.category === 'amazon_book' || l.category === 'tech_gear')
      .reduce((sum, l) => sum + (l.isActive ? l.estimatedEarnings : 0), 0);
    const baseAcademy = links
      .filter((l) => l.category === 'academy_banner')
      .reduce((sum, l) => sum + (l.isActive ? l.estimatedEarnings : 0), 0);
    const baseClicks = links.reduce((sum, l) => sum + l.clicks, 0);

    const multiplier = period === 'today' ? 0.04 : period === 'week' ? 0.25 : period === 'month' ? 1.0 : 12.0;

    const amazonAffiliate = Math.round(baseAmazon * multiplier);
    const academyBanners = Math.round(baseAcademy * multiplier);
    const upiDirectTips = Math.round(4850 * multiplier);
    const premiumMocks = Math.round(6200 * multiplier);
    const totalRevenue = amazonAffiliate + academyBanners + upiDirectTips + premiumMocks;
    const totalClicks = Math.round(baseClicks * multiplier);
    const conversionRatePercent = 8.4;

    return {
      period,
      totalRevenue,
      amazonAffiliate,
      upiDirectTips,
      academyBanners,
      premiumMocks,
      totalClicks,
      conversionRatePercent
    };
  }, [links, period]);

  // Handle Copy Link with Tag
  const handleCopyLink = (linkItem: AffiliateLinkItem) => {
    const finalUrl = linkItem.url.includes('amazon')
      ? attachTagToAmazonUrl(linkItem.url, affiliateTag)
      : linkItem.url;
    navigator.clipboard.writeText(finalUrl);
    setCopiedLinkId(linkItem.id);
    setTimeout(() => setCopiedLinkId(null), 2000);
  };

  // Handle Testing / Outbound Click
  const handleTestLink = (linkItem: AffiliateLinkItem) => {
    const updated = links.map((l) => (l.id === linkItem.id ? { ...l, clicks: l.clicks + 1 } : l));
    updateLinks(updated);
    const finalUrl = linkItem.url.includes('amazon')
      ? attachTagToAmazonUrl(linkItem.url, affiliateTag)
      : linkItem.url;
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  // Toggle Active State
  const handleToggleActive = (id: string) => {
    const updated = links.map((l) => (l.id === id ? { ...l, isActive: !l.isActive } : l));
    updateLinks(updated);
  };

  // Delete Link
  const handleDeleteLink = (id: string) => {
    if (confirm(isMr ? 'हा ॲफिलिएट लिंक काढून टाकायचा आहे का?' : 'Delete this affiliate link?')) {
      const updated = links.filter((l) => l.id !== id);
      updateLinks(updated);
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (item: AffiliateLinkItem) => {
    setEditingItem(item);
    setFormTitle(item.titleMr);
    setFormUrl(item.url);
    setFormCategory(item.category);
    setFormCommissionRate(item.commissionRate);
    setFormCoupon(item.couponCode || '');
    setIsAddModalOpen(true);
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormTitle('');
    setFormUrl('');
    setFormCategory('amazon_book');
    setFormCommissionRate('८% कमिशन');
    setFormCoupon('');
    setIsAddModalOpen(true);
  };

  // Save Modal Form
  const handleSaveModalForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formUrl.trim()) return;

    if (editingItem) {
      const updated = links.map((l) =>
        l.id === editingItem.id
          ? {
              ...l,
              titleMr: formTitle.trim(),
              titleEn: formTitle.trim(),
              url: formUrl.trim(),
              category: formCategory,
              commissionRate: formCommissionRate.trim(),
              couponCode: formCoupon.trim() || undefined
            }
          : l
      );
      updateLinks(updated);
    } else {
      const newLink: AffiliateLinkItem = {
        id: `custom_${Date.now()}`,
        titleMr: formTitle.trim(),
        titleEn: formTitle.trim(),
        url: formUrl.trim(),
        category: formCategory,
        categoryLabelMr:
          formCategory === 'amazon_book'
            ? '📚 ॲमेझॉन पुस्तक'
            : formCategory === 'tech_gear'
            ? '📱 गॅजेट व टॅबलेट'
            : formCategory === 'academy_banner'
            ? '🏛️ अकॅडमी प्रायोजक'
            : formCategory === 'mock_series'
            ? '📝 टेस्ट सिरीज'
            : '🔗 कस्टम लिंक',
        categoryLabelEn: formCategory,
        commissionRate: formCommissionRate.trim() || '५% कमिशन',
        clicks: 0,
        estimatedEarnings: 0,
        isActive: true,
        isCustom: true,
        couponCode: formCoupon.trim() || undefined,
        createdAt: new Date().toISOString()
      };
      updateLinks([newLink, ...links]);
    }
    setIsAddModalOpen(false);
  };

  // Save Affiliate Tag
  const handleSaveTag = (e: React.FormEvent) => {
    e.preventDefault();
    saveAffiliateTag(tagInput);
    setAffiliateTag(tagInput.trim());
    setIsEditingTag(false);
    setTagSuccess(true);
    setTimeout(() => setTagSuccess(false), 2500);
  };

  // Reset to default links
  const handleResetLinks = () => {
    if (confirm(isMr ? 'सर्व लिंक्स डीफॉल्टवर रीसेट करायच्या आहेत का?' : 'Reset all links to default presets?')) {
      updateLinks(DEFAULT_AFFILIATE_LINKS);
    }
  };

  // 🔴 RESTRICTED ACCESS GUARD: If user is not an authenticated admin, return secure message or null
  if (!adminActive) {
    return (
      <div className={`p-6 rounded-2xl bg-stone-900 border border-stone-800 text-center space-y-4 max-w-lg mx-auto my-8 ${className}`}>
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center justify-center mx-auto">
          <Lock className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-black text-white">
            {isMr ? '🔒 ॲडमिन सुरक्षितता: प्रवेश प्रतिबंधित' : '🔒 Admin Access Restricted'}
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            {isMr
              ? 'हे कमाई केंद्र (Earning Hub) व ॲफिलिएट लिंक्स व्यवस्थापन केवळ पोर्टल मालक / ॲडमिनसाठी राखीव आहे.'
              : 'This Earning Hub and Affiliate Management Console is strictly restricted to authenticated portal admins.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="earning-hub-view" className={`space-y-6 text-white ${className}`}>
      {/* 👑 Top Header: Admin Status & Quick Metrics Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-stone-900 to-amber-950/70 border border-emerald-500/40 relative overflow-hidden shadow-2xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isMr ? '👑 अधिकृत ॲडमिन कमाई व ॲफिलिएट नियंत्रण कक्ष' : '👑 Official Admin Earning & Affiliate Console'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 flex-wrap">
              <span>💰 Earning Hub & Revenue Control</span>
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-lg bg-stone-800 text-stone-300 border border-stone-700">
                Tag: {affiliateTag}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {isMr
                ? 'ॲमेझॉन ॲफिलिएट लिंक्स, थेट UPI देणगी, अकॅडमी स्पॉन्सरशिप्स आणि दरमहा कमाईचे सखोल विश्लेषण (Revenue Statistics) येथे व्यवस्थापित करा.'
                : 'Manage affiliate links, track commission clicks, configure partner tags, and monitor multi-stream portal revenue.'}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleOpenAdd}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>{isMr ? '+ नवीन ॲफिलिएट लिंक जोडा' : '+ Add Affiliate Link'}</span>
            </button>

            <a
              href="https://wa.me/919860353056?text=MPSC_Admin_Inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-stone-850 hover:bg-stone-800 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="WhatsApp: 9860353056"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>WhatsApp: ९८६०३५३०५६</span>
            </a>
          </div>
        </div>

        {/* Dynamic KPI Highlights Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 border-t border-stone-800/80">
          <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 space-y-1">
            <div className="text-[11px] text-stone-400 font-bold flex items-center justify-between">
              <span>{isMr ? 'एकूण मासिक कमाई अंदाज' : 'Est. Monthly Revenue'}</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-lg sm:text-xl font-black text-emerald-400 font-mono">
              ₹{revenueStats.totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-stone-400">
              {isMr ? '१० कमाई खांबांमधून एकत्रित' : 'Across all 10 pillars'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 space-y-1">
            <div className="text-[11px] text-stone-400 font-bold flex items-center justify-between">
              <span>{isMr ? 'ॲमेझॉन कमिशन (Books)' : 'Amazon Comm'}</span>
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-lg sm:text-xl font-black text-amber-400 font-mono">
              ₹{revenueStats.amazonAffiliate.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-stone-400">
              {isMr ? '५% ते ९% थेट बँक खात्यात' : 'Direct bank credit'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 space-y-1">
            <div className="text-[11px] text-stone-400 font-bold flex items-center justify-between">
              <span>{isMr ? 'अकॅडमी स्पॉन्सरशिप' : 'Academy Banners'}</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-lg sm:text-xl font-black text-cyan-400 font-mono">
              ₹{revenueStats.academyBanners.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-stone-400">
              {isMr ? 'मासिक थेट प्रायोजक शुल्क' : 'Fixed monthly sponsorships'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 space-y-1">
            <div className="text-[11px] text-stone-400 font-bold flex items-center justify-between">
              <span>{isMr ? 'एकूण ॲफिलिएट क्लिक्स' : 'Total Outbound Clicks'}</span>
              <Eye className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-lg sm:text-xl font-black text-purple-400 font-mono">
              {revenueStats.totalClicks.toLocaleString('en-IN')} clicks
            </div>
            <div className="text-[10px] text-emerald-400 font-bold">
              ~{revenueStats.conversionRatePercent}% रुपांतरण दर (Conversion)
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar: Links Management vs Revenue Statistics vs 10 Pillars */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSubTab('links')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'links'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>{isMr ? `🔗 ॲफिलिएट लिंक्स व्यवस्थापन (${links.length})` : `Affiliate Links (${links.length})`}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('statistics')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'statistics'
                ? 'bg-emerald-500 text-stone-950 shadow-md'
                : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{isMr ? '📊 कमाई आकडेवारी (Revenue Stats)' : 'Revenue Statistics'}</span>
          </button>
        </div>

        {/* Fast Amazon Tag Switcher */}
        <div className="flex items-center gap-2">
          {!isEditingTag ? (
            <div className="flex items-center gap-2 bg-stone-900 px-3 py-1.5 rounded-xl border border-stone-800 text-xs">
              <span className="text-stone-400">{isMr ? 'सक्रिय ॲमेझॉन टॅग:' : 'Tag:'}</span>
              <span className="text-amber-400 font-mono font-bold">{affiliateTag}</span>
              <button
                type="button"
                onClick={() => {
                  setTagInput(affiliateTag);
                  setIsEditingTag(true);
                }}
                className="text-stone-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
                title="टॅग बदला"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSaveTag} className="flex items-center gap-1.5">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="tag-21"
                className="px-2.5 py-1 text-xs bg-stone-950 border border-amber-500 rounded-lg text-amber-300 font-mono focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-2 py-1 bg-amber-500 text-stone-950 rounded-lg text-xs font-bold cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditingTag(false)}
                className="px-2 py-1 bg-stone-800 text-stone-300 rounded-lg text-xs cursor-pointer"
              >
                ✕
              </button>
            </form>
          )}

          {tagSuccess && (
            <span className="text-[11px] text-emerald-400 font-bold animate-in fade-in flex items-center gap-1">
              <Check className="w-3 h-3" />
              सेव्ह झाले!
            </span>
          )}
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: AFFILIATE LINKS MANAGEMENT
         ========================================================================= */}
      {activeSubTab === 'links' && (
        <div className="space-y-4">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-stone-900/60 p-3 rounded-2xl border border-stone-800">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-stone-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isMr ? 'पुस्तकाचे नाव, कीवर्ड किंवा URL शोधा...' : 'Search affiliate links by keyword or URL...'}
                className="w-full pl-9 pr-3 py-2 bg-stone-950 rounded-xl border border-stone-750 text-xs sm:text-sm text-stone-100 focus:outline-hidden focus:border-amber-400"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-amber-500 text-stone-950'
                    : 'bg-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                {isMr ? 'सर्व (All)' : 'All'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('amazon_book')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'amazon_book'
                    ? 'bg-amber-500 text-stone-950'
                    : 'bg-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                {isMr ? '📚 पुस्तके' : 'Books'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('tech_gear')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'tech_gear'
                    ? 'bg-amber-500 text-stone-950'
                    : 'bg-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                {isMr ? '📱 गॅजेट्स' : 'Tech Gear'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('academy_banner')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'academy_banner'
                    ? 'bg-amber-500 text-stone-950'
                    : 'bg-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                {isMr ? '🏛️ अकॅडमी' : 'Academy'}
              </button>
            </div>
          </div>

          {/* Links Grid / List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredLinks.map((item) => {
              const fullAffiliateUrl = item.url.includes('amazon')
                ? attachTagToAmazonUrl(item.url, affiliateTag)
                : item.url;
              const isCopied = copiedLinkId === item.id;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                    item.isActive
                      ? 'bg-stone-850 border-stone-800 hover:border-amber-500/50 shadow-md'
                      : 'bg-stone-900/60 border-stone-850 opacity-60'
                  }`}
                >
                  <div className="space-y-2">
                    {/* Header: Category & Active status */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-stone-800 text-amber-300 border border-stone-700">
                        {isMr ? item.categoryLabelMr : item.categoryLabelEn}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(item.id)}
                          className={`text-[10px] px-2 py-0.5 rounded-md font-bold transition-colors cursor-pointer ${
                            item.isActive
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-stone-800 text-stone-400 border border-stone-700'
                          }`}
                          title="सक्रिय / निष्क्रिय स्विच"
                        >
                          {item.isActive ? '● सक्रिय' : '○ निष्क्रिय'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-1 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors cursor-pointer"
                          title="एडिट करा"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {item.isCustom && (
                          <button
                            type="button"
                            onClick={() => handleDeleteLink(item.id)}
                            className="p-1 text-stone-500 hover:text-rose-400 rounded hover:bg-rose-950/40 transition-colors cursor-pointer"
                            title="हटवा"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <h4 className="text-sm font-black text-white leading-snug">
                        {isMr ? item.titleMr : item.titleEn}
                      </h4>
                      <div className="flex items-center gap-3 text-xs font-bold text-emerald-400 mt-1">
                        <span>{item.commissionRate}</span>
                        {item.couponCode && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                            कोड: {item.couponCode}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Affiliated Link Box */}
                    <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                      <div className="text-[10px] text-stone-400 flex items-center justify-between">
                        <span>{isMr ? 'ट्रॅकिंग टॅगसह ॲफिलिएट URL:' : 'Target URL with Tag:'}</span>
                        <span className="text-amber-400 font-mono text-[9px] font-bold">tag={affiliateTag}</span>
                      </div>
                      <div className="text-[11px] font-mono text-stone-300 truncate" title={fullAffiliateUrl}>
                        {fullAffiliateUrl}
                      </div>
                    </div>
                  </div>

                  {/* Footer Metrics & Actions */}
                  <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 text-[11px] text-stone-400">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-purple-400" />
                        <span className="font-bold text-stone-200">{item.clicks}</span> {isMr ? 'क्लिक्स' : 'clicks'}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <span>₹{item.estimatedEarnings.toLocaleString('en-IN')}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleCopyLink(item)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          isCopied
                            ? 'bg-emerald-500 text-stone-950 font-black'
                            : 'bg-stone-800 hover:bg-stone-750 text-stone-300'
                        }`}
                        title="लिंक कॉपी करा"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? (isMr ? 'कॉपी झाले!' : 'Copied!') : (isMr ? 'कॉपी' : 'Copy')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTestLink(item)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black flex items-center gap-1 transition-all cursor-pointer shadow-sm active:scale-95"
                        title="थेट लिंक तपासा (क्लिक काउंटर वाढेल)"
                      >
                        <span>{isMr ? 'तपासा' : 'Test'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredLinks.length === 0 && (
            <div className="p-8 text-center text-stone-400 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
              <p className="text-sm">{isMr ? 'कोणतीही ॲफिलिएट लिंक सापडली नाही.' : 'No matching affiliate links found.'}</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-white text-xs font-bold cursor-pointer"
              >
                {isMr ? 'फिल्टर रीसेट करा' : 'Reset filters'}
              </button>
            </div>
          )}

          {/* Bottom Control Strip */}
          <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{isMr ? 'सर्व लिंक्समध्ये तुमचा Amazon Associate Tag व WhatsApp लीड ट्रॅकिंग आपोआप जोडले जाते.' : 'All links automatically inherit your Amazon Associate Tag & lead tracking.'}</span>
            </div>
            <button
              type="button"
              onClick={handleResetLinks}
              className="text-[11px] text-stone-400 hover:text-white underline cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isMr ? 'डीफॉल्ट लिंक्सवर रीसेट करा' : 'Reset default links'}</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: REVENUE STATISTICS & PERFORMANCE MONITORING
         ========================================================================= */}
      {activeSubTab === 'statistics' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Period Selection Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-900/70 p-3.5 rounded-2xl border border-stone-800">
            <div>
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span>{isMr ? 'कमाई कालमर्यादा व आकडेवारी (Revenue Horizon):' : 'Revenue Horizon Analysis:'}</span>
              </h3>
              <p className="text-[11px] text-stone-400">
                {isMr ? 'निवडलेल्या कालावधीनुसार प्रत्यक्ष व अंदाजित कमाई विश्लेषण' : 'Dynamic metrics based on active traffic snapshot'}
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
              {(['today', 'week', 'month', 'year'] as const).map((p) => {
                const labels: Record<string, { mr: string; en: string }> = {
                  today: { mr: 'आज', en: 'Today' },
                  week: { mr: 'चालू आठवडा', en: 'This Week' },
                  month: { mr: 'चालू महिना', en: 'This Month' },
                  year: { mr: 'वार्षिक (Year)', en: 'Full Year' }
                };
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      period === p
                        ? 'bg-emerald-500 text-stone-950 font-black shadow-sm'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {isMr ? labels[p].mr : labels[p].en}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Revenue Source Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Box 1: Income Stream Distribution */}
            <div className="p-5 rounded-2xl bg-stone-850 border border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-amber-400" />
                  <span>{isMr ? 'उत्पन्न स्त्रोत हिस्सा (Revenue Distribution)' : 'Revenue Breakdown by Channel'}</span>
                </h4>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  ₹{revenueStats.totalRevenue.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="space-y-3">
                {/* 1. Amazon Books & Tech */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-amber-300">१. ॲमेझॉन ॲफिलिएट (Books & Tablets)</span>
                    <span className="font-mono text-stone-200">₹{revenueStats.amazonAffiliate.toLocaleString('en-IN')} (३८%)</span>
                  </div>
                  <div className="w-full bg-stone-900 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full transition-all" style={{ width: '38%' }} />
                  </div>
                </div>

                {/* 2. Academy Banner Sponsorships */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-cyan-300">२. अकॅडमी बॅनर प्रायोजक (Jnana Prabodhini & Aakar)</span>
                    <span className="font-mono text-stone-200">₹{revenueStats.academyBanners.toLocaleString('en-IN')} (३२%)</span>
                  </div>
                  <div className="w-full bg-stone-900 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full transition-all" style={{ width: '32%' }} />
                  </div>
                </div>

                {/* 3. Direct UPI Donations */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-emerald-300">३. थेट UPI विद्यार्थी सहकार्य (Tips & Donations)</span>
                    <span className="font-mono text-stone-200">₹{revenueStats.upiDirectTips.toLocaleString('en-IN')} (१६%)</span>
                  </div>
                  <div className="w-full bg-stone-900 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full transition-all" style={{ width: '16%' }} />
                  </div>
                </div>

                {/* 4. Premium Mock Passes & Notes */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-purple-300">४. प्रिमियम टेस्ट सिरीज पासेस व नोट्स PDF</span>
                    <span className="font-mono text-stone-200">₹{revenueStats.premiumMocks.toLocaleString('en-IN')} (१४%)</span>
                  </div>
                  <div className="w-full bg-stone-900 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-purple-400 h-full rounded-full transition-all" style={{ width: '14%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: Target Goal Tracker */}
            <div className="p-5 rounded-2xl bg-stone-850 border border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>{isMr ? 'मासिक उत्पन्न लक्ष्य ट्रॅकर (₹५०,००० / महिना)' : 'Monthly Revenue Milestone Target'}</span>
                </h4>
                <span className="text-xs font-bold text-amber-300 font-mono">
                  {Math.round((revenueStats.totalRevenue / 50000) * 100)}% साध्य
                </span>
              </div>

              <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400">{isMr ? 'सध्याची चालू कमाई:' : 'Current Pipeline:'}</span>
                  <span className="font-mono font-black text-emerald-400 text-base">₹{revenueStats.totalRevenue.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400">{isMr ? 'मासिक मुख्य ध्येय:' : 'Milestone Target:'}</span>
                  <span className="font-mono font-bold text-stone-200">₹५०,०००</span>
                </div>
                <div className="w-full bg-stone-950 rounded-full h-3 overflow-hidden border border-stone-800">
                  <div
                    className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, Math.round((revenueStats.totalRevenue / 50000) * 100))}%` }}
                  />
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed pt-1">
                  {isMr
                    ? '💡 प्रो टीप: आणखी एका नामांकित अकॅडमीचे बॅनर जोडल्यास किंवा Telegram ग्रुपवर दररोज सकाळी ५ प्रश्न शेयर केल्यास लक्ष्य १००% सहज ओलांडले जाईल.'
                    : '💡 Pro Tip: Onboarding one additional academy banner or broadcasting morning teaser questions pushes this past 100%.'}
                </p>
              </div>

              {/* Direct UPI Info Box */}
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between gap-2 text-xs">
                <div>
                  <div className="text-[11px] text-emerald-300 font-bold">{isMr ? 'पोर्टल मालकाचा थेट UPI आयडी:' : 'Portal Owner UPI ID:'}</div>
                  <div className="font-mono font-black text-white text-xs">{getStoredUpiId()}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-stone-400">{isMr ? 'गेटवे कमिशन' : 'Gateway Cut'}</div>
                  <div className="text-xs font-black text-emerald-400">०% (१००% नफा)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ADD / EDIT AFFILIATE LINK MODAL
         ========================================================================= */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddModalOpen(false);
          }}
        >
          <div className="w-full max-w-lg bg-stone-900 border border-amber-500/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-white">
            <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    {editingItem
                      ? isMr
                        ? 'ॲफिलिएट लिंक संपादित करा'
                        : 'Edit Affiliate Link'
                      : isMr
                      ? '+ नवीन ॲफिलिएट लिंक जोडा'
                      : '+ Add New Affiliate Link'}
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    {isMr ? 'उत्पादन, संदर्भ पुस्तक किंवा पार्टनर लिंक जोडा' : 'Add product, book or partner affiliate link'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModalForm} className="p-4 sm:p-5 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">
                  {isMr ? '१. शीर्षकाचे नाव (Title):' : '1. Link Title:'}
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="उदा. के सागर आधुनिक भारताचा इतिहास / Samsung Tab"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs sm:text-sm text-stone-100 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1 flex items-center justify-between">
                  <span>{isMr ? '२. टार्गेट URL (Target URL):' : '2. Target URL:'}</span>
                  <span className="text-[10px] text-stone-400 font-mono">https://...</span>
                </label>
                <input
                  type="url"
                  required
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  placeholder="https://www.amazon.in/dp/... किंवा https://..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-hidden focus:border-amber-400 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-amber-300 mb-1">
                    {isMr ? '३. प्रकार (Category):' : '3. Category:'}
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-hidden focus:border-amber-400"
                  >
                    <option value="amazon_book">{isMr ? '📚 ॲमेझॉन पुस्तक (Book)' : 'Amazon Book'}</option>
                    <option value="tech_gear">{isMr ? '📱 गॅजेट व टॅबलेट (Tech)' : 'Tech Gear'}</option>
                    <option value="academy_banner">{isMr ? '🏛️ अकॅडमी प्रायोजक' : 'Academy Sponsor'}</option>
                    <option value="mock_series">{isMr ? '📝 टेस्ट सिरीज व नोट्स' : 'Mock Series'}</option>
                    <option value="custom">{isMr ? '🔗 इतर कस्टम लिंक' : 'Custom'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-300 mb-1">
                    {isMr ? '४. कमिशन दर (Commission):' : '4. Commission Rate:'}
                  </label>
                  <input
                    type="text"
                    value={formCommissionRate}
                    onChange={(e) => setFormCommissionRate(e.target.value)}
                    placeholder="उदा. ८% कमिशन किंवा ₹५००/विक्री"
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-hidden focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">
                  {isMr ? '५. कूपन कोड (ऐच्छिक Coupon Code):' : '5. Promo Coupon Code (Optional):'}
                </label>
                <input
                  type="text"
                  value={formCoupon}
                  onChange={(e) => setFormCoupon(e.target.value)}
                  placeholder="उदा. MPSC2026 / SARATHI10"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-hidden focus:border-amber-400 font-mono uppercase"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 text-xs font-bold cursor-pointer"
                >
                  {isMr ? 'रद्द करा' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-black transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{editingItem ? (isMr ? 'बदल सेव्ह करा' : 'Update') : (isMr ? 'लिंक जोडा' : 'Add Link')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
