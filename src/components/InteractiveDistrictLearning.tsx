import React, { useState, useMemo, useRef } from 'react';
import { 
  Compass, 
  MapPin, 
  Play, 
  BookOpen, 
  Sparkles, 
  Flame, 
  Award, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ChevronRight, 
  ExternalLink,
  Layers,
  Trees,
  Landmark,
  TrendingUp,
  X,
  CheckCircle2,
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { 
  MAHARASHTRA_DISTRICTS_DATA, 
  MAHARASHTRA_DIVISIONS, 
  MaharashtraDistrict, 
  AdministrativeDivisionId 
} from '../data/maharashtraDistrictsData';
import { generateDistrictQuestions } from '../data/districtSpecificQuestions';
import { Question } from '../types';
import { AdBanner } from './AdBanner';
import { soundFx } from '../utils/audio';

// District visual node positions on 800x520 Maharashtra map canvas
interface DistrictMapNode {
  id: string;
  cx: number;
  cy: number;
  divisionId: AdministrativeDivisionId;
  shortLabel: string;
}

const DISTRICT_MAP_NODES: DistrictMapNode[] = [
  // 1. कोकण (Konkan)
  { id: 'palghar', cx: 95, cy: 120, divisionId: 'konkan', shortLabel: 'पालघर' },
  { id: 'thane', cx: 105, cy: 165, divisionId: 'konkan', shortLabel: 'ठाणे' },
  { id: 'mumbai_suburban', cx: 85, cy: 185, divisionId: 'konkan', shortLabel: 'उपनगर' },
  { id: 'mumbai_city', cx: 75, cy: 205, divisionId: 'konkan', shortLabel: 'मुंबई' },
  { id: 'raigad', cx: 110, cy: 240, divisionId: 'konkan', shortLabel: 'रायगड' },
  { id: 'ratnagiri', cx: 120, cy: 325, divisionId: 'konkan', shortLabel: 'रत्नागिरी' },
  { id: 'sindhudurg', cx: 130, cy: 420, divisionId: 'konkan', shortLabel: 'सिंधुदुर्ग' },

  // 2. उत्तर महाराष्ट्र / खानदेश (Nashik)
  { id: 'nandurbar', cx: 185, cy: 50, divisionId: 'nashik', shortLabel: 'नंदुरबार' },
  { id: 'dhule', cx: 225, cy: 85, divisionId: 'nashik', shortLabel: 'धुळे' },
  { id: 'jalgaon', cx: 310, cy: 95, divisionId: 'nashik', shortLabel: 'जळगाव' },
  { id: 'nashik', cx: 170, cy: 155, divisionId: 'nashik', shortLabel: 'नाशिक' },
  { id: 'ahilyanagar', cx: 225, cy: 235, divisionId: 'nashik', shortLabel: 'अहिल्यानगर' },

  // 3. पश्चिम महाराष्ट्र (Pune)
  { id: 'pune', cx: 185, cy: 285, divisionId: 'pune', shortLabel: 'पुणे' },
  { id: 'satara', cx: 185, cy: 355, divisionId: 'pune', shortLabel: 'सातारा' },
  { id: 'sangli', cx: 230, cy: 405, divisionId: 'pune', shortLabel: 'सांगली' },
  { id: 'kolhapur', cx: 185, cy: 440, divisionId: 'pune', shortLabel: 'कोल्हापूर' },
  { id: 'solapur', cx: 315, cy: 355, divisionId: 'pune', shortLabel: 'सोलापूर' },

  // 4. मराठवाडा (Chhatrapati Sambhajinagar)
  { id: 'chhatrapati_sambhajinagar', cx: 275, cy: 185, divisionId: 'chhatrapati_sambhajinagar', shortLabel: 'छ.संभाजीनगर' },
  { id: 'jalna', cx: 335, cy: 195, divisionId: 'chhatrapati_sambhajinagar', shortLabel: 'जालना' },
  { id: 'parbhani', cx: 395, cy: 220, divisionId: 'chhatrapati_sambhajinagar', shortLabel: 'परभणी' },
  { id: 'hingoli', cx: 420, cy: 180, divisionId: 'chhatrapati_sambhajinagar', shortLabel: 'हिंगोली' },
  { id: 'beed', cx: 310, cy: 270, divisionId: 'chhatrapati_sambhajinagar', shortLabel: 'बीड' },
  { id: 'nanded', cx: 465, cy: 245, divisionId: 'chhatrapati_sambhajinagar', shortLabel: 'नांदेड' },
  { id: 'latur', cx: 385, cy: 305, divisionId: 'chhatrapati_sambhajinagar', shortLabel: 'लातूर' },
  { id: 'dharashiv', cx: 330, cy: 325, divisionId: 'chhatrapati_sambhajinagar', shortLabel: 'धाराशीव' },

  // 5. पश्चिम विदर्भ (Amravati)
  { id: 'buldhana', cx: 375, cy: 125, divisionId: 'amravati', shortLabel: 'बुलढाणा' },
  { id: 'akola', cx: 425, cy: 130, divisionId: 'amravati', shortLabel: 'अकोला' },
  { id: 'washim', cx: 440, cy: 170, divisionId: 'amravati', shortLabel: 'वाशीम' },
  { id: 'amravati', cx: 485, cy: 105, divisionId: 'amravati', shortLabel: 'अमरावती' },
  { id: 'yavatmal', cx: 510, cy: 195, divisionId: 'amravati', shortLabel: 'यवतमाळ' },

  // 6. पूर्व विदर्भ (Nagpur)
  { id: 'wardha', cx: 555, cy: 155, divisionId: 'nagpur', shortLabel: 'वर्धा' },
  { id: 'nagpur', cx: 595, cy: 115, divisionId: 'nagpur', shortLabel: 'नागपूर' },
  { id: 'bhandara', cx: 655, cy: 115, divisionId: 'nagpur', shortLabel: 'भंडारा' },
  { id: 'gondia', cx: 705, cy: 105, divisionId: 'nagpur', shortLabel: 'गोंदिया' },
  { id: 'chandrapur', cx: 620, cy: 235, divisionId: 'nagpur', shortLabel: 'चंद्रपूर' },
  { id: 'gadchiroli', cx: 705, cy: 255, divisionId: 'nagpur', shortLabel: 'गडचिरोली' }
];

const DIVISION_COLORS: Record<AdministrativeDivisionId, { fill: string; stroke: string; text: string; bg: string; border: string }> = {
  konkan: { fill: '#38bdf8', stroke: '#0284c7', text: '#0369a1', bg: 'bg-sky-50', border: 'border-sky-300' },
  pune: { fill: '#4ade80', stroke: '#16a34a', text: '#15803d', bg: 'bg-emerald-50', border: 'border-emerald-300' },
  nashik: { fill: '#facc15', stroke: '#ca8a04', text: '#a16207', bg: 'bg-amber-50', border: 'border-amber-300' },
  chhatrapati_sambhajinagar: { fill: '#fb923c', stroke: '#ea580c', text: '#c2410c', bg: 'bg-orange-50', border: 'border-orange-300' },
  amravati: { fill: '#c084fc', stroke: '#9333ea', text: '#7e22ce', bg: 'bg-purple-50', border: 'border-purple-300' },
  nagpur: { fill: '#f87171', stroke: '#dc2626', text: '#b91c1c', bg: 'bg-rose-50', border: 'border-rose-300' }
};

interface InteractiveDistrictLearningProps {
  language?: 'mr' | 'en';
  onLaunchPractice: (questions: Question[], title: string, districtId: string) => void;
  onOpenAdSenseManager?: () => void;
  className?: string;
}

export const InteractiveDistrictLearning: React.FC<InteractiveDistrictLearningProps> = ({
  language = 'mr',
  onLaunchPractice,
  onOpenAdSenseManager,
  className = '',
}) => {
  const isMr = language === 'mr';
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('pune');
  const [selectedDivision, setSelectedDivision] = useState<AdministrativeDivisionId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredDistrictId, setHoveredDistrictId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeProfileTab, setActiveProfileTab] = useState<'all' | 'geo' | 'hist' | 'econ'>('all');

  // Question count state: 10, 15, or 20 questions
  const [questionCount, setQuestionCount] = useState<10 | 15 | 20>(10);

  // Currently selected district object
  const activeDistrict = useMemo(() => {
    return (
      MAHARASHTRA_DISTRICTS_DATA.find((d) => d.id === selectedDistrictId) ||
      MAHARASHTRA_DISTRICTS_DATA[0]
    );
  }, [selectedDistrictId]);

  // Questions for current district (customized by selected count)
  const districtQuestions = useMemo(() => {
    return generateDistrictQuestions(activeDistrict, questionCount);
  }, [activeDistrict, questionCount]);

  const handleSelectDistrict = (distId: string) => {
    setSelectedDistrictId(distId);
    soundFx.playClickSound();
  };

  const handleStartExam = () => {
    soundFx.playDingSound();
    const title = `${activeDistrict.nameMr} - ${questionCount} प्रश्न सराव चाचणी (भूगोल, इतिहास, अर्थव्यवस्था)`;
    onLaunchPractice(districtQuestions, title, activeDistrict.id);
  };

  const handleLaunchDivisionTest = () => {
    soundFx.playDingSound();
    if (selectedDivision === 'all') {
      const allQs = MAHARASHTRA_DISTRICTS_DATA.flatMap((d) => generateDistrictQuestions(d, 5));
      const shuffled = [...allQs].sort(() => 0.5 - Math.random()).slice(0, 50);
      onLaunchPractice(shuffled, 'महाराष्ट्र ३६ जिल्हे राज्यस्तरीय महा-सराव चाचणी (५० प्रश्न)', 'all_36_districts');
    } else {
      const divMeta = MAHARASHTRA_DIVISIONS.find((d) => d.id === selectedDivision);
      const divDistricts = MAHARASHTRA_DISTRICTS_DATA.filter((d) => d.divisionId === selectedDivision);
      const divQs = divDistricts.flatMap((d) => generateDistrictQuestions(d, 5));
      const shuffled = [...divQs].sort(() => 0.5 - Math.random()).slice(0, 25);
      onLaunchPractice(shuffled, `${divMeta?.nameMr || 'विभागीय'} विशेष महा-चाचणी (२५ प्रश्न)`, `division_${selectedDivision}`);
    }
  };

  // Filtered district list for search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return MAHARASHTRA_DISTRICTS_DATA.filter(
      (d) => d.nameMr.toLowerCase().includes(q) || d.nameEn.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className={`bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden text-stone-800 ${className}`}>
      {/* Top Header */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 shadow-md">
            <Compass className="w-7 h-7 text-amber-100" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-2xl font-black tracking-tight">
                {isMr ? 'महाराष्ट्र नकाशा: जिल्हा-विशेष इंटरअॅक्टिव्ह सराव' : 'Maharashtra Map: Interactive District Learning'}
              </h2>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-white/25 text-white border border-white/30">
                {questionCount} प्रश्न सराव
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-100/90 mt-0.5">
              {isMr
                ? `नकाशावर कोणताही जिल्हा निवडा आणि त्या जिल्ह्याचा भूगोल, इतिहास, तालुके व अर्थव्यवस्थेवर आधारित १०, १५ किंवा २० प्रश्नांची चाचणी द्या!`
                : 'Select any district on map to launch a targeted 10, 15, or 20-question practice drill on its geography, history & economy!'}
            </p>
          </div>
        </div>

        {/* Quick Launch CTA & Question Count Pills */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <div className="flex items-center bg-black/25 backdrop-blur-sm p-1 rounded-xl border border-white/20 text-xs">
            {[10, 15, 20].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => {
                  setQuestionCount(num as 10 | 15 | 20);
                  soundFx.playClickSound();
                }}
                className={`px-2.5 py-1 rounded-lg font-black transition-all cursor-pointer ${
                  questionCount === num
                    ? 'bg-amber-400 text-stone-950 shadow-xs'
                    : 'text-amber-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {num} Qs
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleStartExam}
            className="px-5 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-900 text-amber-300 hover:text-amber-200 border border-amber-400/40 text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 shrink-0"
          >
            <Play className="w-4 h-4 fill-amber-300" />
            <span>{isMr ? `${activeDistrict.nameMr} ची ${questionCount} प्रश्न टेस्ट` : `Start ${questionCount}-Q Test`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Division Selector & Search Bar Strip */}
      <div className="p-3 sm:p-4 bg-stone-50 border-b border-stone-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Division Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedDivision('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
              selectedDivision === 'all'
                ? 'bg-stone-900 text-white'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            सर्व विभाग
          </button>

          {MAHARASHTRA_DIVISIONS.map((div) => {
            const isSelected = selectedDivision === div.id;
            return (
              <button
                key={div.id}
                type="button"
                onClick={() => setSelectedDivision(div.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span>{div.nameMr}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Division Mega Test or All 36 Grand Test CTA */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleLaunchDivisionTest}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-stone-900 to-amber-950 hover:from-black hover:to-amber-900 text-amber-300 border border-amber-500/50 text-xs font-black flex items-center gap-1.5 shadow-xs transition-all cursor-pointer whitespace-nowrap active:scale-95"
            title={selectedDivision === 'all' ? 'सर्व ३६ जिल्ह्यांची ५० प्रश्नांची राज्यस्तरीय महा-चाचणी' : 'या विभागाची २५ प्रश्नांची महा-चाचणी'}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {selectedDivision === 'all'
                ? (isMr ? '🌟 ३६ जिल्हे महा-सराव (५० Qs)' : '🌟 36 Districts Grand Drill (50 Qs)')
                : (isMr ? `🏆 ${MAHARASHTRA_DIVISIONS.find(d => d.id === selectedDivision)?.nameMr.split(' ')[0]} महा-चाचणी (२५ Qs)` : 'Division Test (25 Qs)')}
            </span>
          </button>
        </div>

        {/* Quick District Search Dropdown */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isMr ? "जिल्हा शोधा (उदा. सातारा, नागपूर)..." : "Search district..."}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
          />

          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl border border-stone-200 shadow-xl z-30 max-h-48 overflow-y-auto p-1 space-y-1">
              {searchResults.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => {
                    handleSelectDistrict(d.id);
                    setSearchQuery('');
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-amber-50 text-xs font-bold text-stone-800 flex items-center justify-between cursor-pointer"
                >
                  <span>{d.nameMr}</span>
                  <span className="text-[10px] text-stone-500">{d.divisionNameMr}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Interactive Map (Left) + Detailed District Profile & Practice Launcher (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: INTERACTIVE MAHARASHTRA SVG MAP CANVAS (7 COLS) */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 p-3 sm:p-5 bg-gradient-to-br from-stone-100/70 via-amber-50/20 to-stone-100/70 border-b lg:border-b-0 lg:border-r border-stone-200 flex flex-col justify-between relative min-h-[420px]">
          
          {/* Map Controls Floating Header */}
          <div className="flex items-center justify-between gap-2 mb-2 z-10">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-stone-700 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-stone-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
              <span>{isMr ? 'नकाशातील कोणत्याही जिल्ह्यावर क्लिक करा' : 'Click on any district node'}</span>
            </div>

            {/* Zoom Buttons */}
            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm p-1 rounded-xl border border-stone-200 shadow-2xs">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
                className="p-1 rounded-lg hover:bg-stone-100 text-stone-600 cursor-pointer"
                title="झूम इन"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
                className="p-1 rounded-lg hover:bg-stone-100 text-stone-600 cursor-pointer"
                title="झूम आउट"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="p-1 rounded-lg hover:bg-stone-100 text-stone-600 cursor-pointer"
                title="रिसेट"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive SVG Canvas */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden py-2">
            <svg
              viewBox="0 0 800 520"
              className="w-full h-auto max-h-[460px] select-none transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Outer boundary contour of Maharashtra */}
              <defs>
                <radialGradient id="mahaGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#fffbeb" stopOpacity="0.1" />
                </radialGradient>
                <filter id="shadowGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* Arabian Sea coastal indicator on west */}
              <path
                d="M 50 60 L 50 480"
                stroke="#38bdf8"
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.3"
              />
              <text x="35" y="270" fill="#0284c7" fontSize="11" fontWeight="bold" transform="rotate(-90 35 270)">
                🌊 अरबी समुद्र (Arabian Sea)
              </text>

              {/* State background shape */}
              <path
                d="M 70 120 
                   Q 150 40 280 40 
                   Q 450 30 520 60 
                   Q 720 70 760 120 
                   Q 780 250 720 330 
                   Q 620 320 540 270 
                   Q 460 380 340 430 
                   Q 250 490 180 490 
                   Q 120 450 120 350 
                   Q 100 240 70 120 Z"
                fill="url(#mahaGlow)"
                stroke="#d97706"
                strokeWidth="3"
                strokeDasharray="6,4"
                opacity="0.85"
              />

              {/* Sahyadri Western Ghats Mountain arc */}
              <path
                d="M 125 120 Q 145 280 160 460"
                fill="none"
                stroke="#059669"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.65"
              />

              {/* Major Rivers Paths */}
              {/* Godavari */}
              <path
                d="M 170 155 Q 350 180 500 250 L 550 280"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
                opacity="0.5"
              />
              {/* Bhima */}
              <path
                d="M 185 285 Q 260 300 350 360"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                opacity="0.5"
              />
              {/* Krishna */}
              <path
                d="M 185 355 Q 210 380 260 410"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2"
                opacity="0.5"
              />
              {/* Tapi */}
              <path
                d="M 330 95 Q 220 85 90 70"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2"
                opacity="0.5"
              />

              {/* District Interactive Nodes */}
              {DISTRICT_MAP_NODES.map((node) => {
                const isSelected = selectedDistrictId === node.id;
                const isHovered = hoveredDistrictId === node.id;
                const colors = DIVISION_COLORS[node.divisionId];
                const isFilteredOut = selectedDivision !== 'all' && node.divisionId !== selectedDivision;

                return (
                  <g
                    key={node.id}
                    onClick={() => handleSelectDistrict(node.id)}
                    onMouseEnter={() => setHoveredDistrictId(node.id)}
                    onMouseLeave={() => setHoveredDistrictId(null)}
                    className="cursor-pointer transition-transform duration-200"
                    opacity={isFilteredOut ? 0.35 : 1}
                  >
                    {/* Pulsing ring around selected district */}
                    {isSelected && (
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={24}
                        fill="none"
                        stroke="#d97706"
                        strokeWidth="3"
                        className="animate-ping origin-center opacity-75"
                      />
                    )}

                    {/* Node circle */}
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={isSelected ? 18 : isHovered ? 16 : 13}
                      fill={isSelected ? '#d97706' : colors.fill}
                      stroke={isSelected ? '#78350f' : colors.stroke}
                      strokeWidth={isSelected ? 3.5 : 2}
                      filter="url(#shadowGlow)"
                      className="transition-all duration-200"
                    />

                    {/* Node Center Dot */}
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={isSelected ? 4 : 2.5}
                      fill={isSelected ? '#ffffff' : colors.stroke}
                    />

                    {/* District Name Label */}
                    <text
                      x={node.cx}
                      y={node.cy - (isSelected ? 22 : 17)}
                      textAnchor="middle"
                      fontSize={isSelected ? "11.5" : "9.5"}
                      fontWeight={isSelected ? "900" : "bold"}
                      fill={isSelected ? "#78350f" : "#1c1917"}
                      className="transition-all pointer-events-none drop-shadow-sm select-none"
                    >
                      {node.shortLabel}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Division Legend Bar */}
          <div className="pt-2 border-t border-stone-200/80 flex items-center justify-center flex-wrap gap-2 text-[10px] sm:text-[11px] text-stone-600">
            <span className="font-bold text-stone-800">विभाग:</span>
            {MAHARASHTRA_DIVISIONS.map((div) => {
              const col = DIVISION_COLORS[div.id];
              return (
                <span key={div.id} className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col.fill, border: `1px solid ${col.stroke}` }} />
                  <span>{div.nameMr.split(' ')[0]}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: DISTRICT PROFILE & TARGETED PRACTICE (5 COLS) */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col justify-between space-y-4 bg-white">
          
          {/* Active District Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50/50 border border-amber-300/80 shadow-xs space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                    {activeDistrict.nameMr}
                  </h3>
                  <span className="text-xs font-mono text-stone-500 font-bold">
                    ({activeDistrict.nameEn})
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-600 text-white shadow-2xs">
                    {activeDistrict.divisionNameMr}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-stone-200 text-stone-800">
                    {activeDistrict.rtoCode}
                  </span>
                  <span className="text-[10px] font-bold text-stone-600">
                    मुख्यालय: {activeDistrict.hqMr}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-stone-700 block font-mono">
                  {activeDistrict.talukasCount} तालुके
                </span>
                <span className="text-[10px] text-stone-500 font-mono">
                  {activeDistrict.areaSqKm.toLocaleString('en-IN')} चौ.किमी
                </span>
              </div>
            </div>

            {/* Micro census strip */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-200/60 text-[11px]">
              <div className="bg-white/80 p-1.5 rounded-lg border border-amber-200/60">
                <span className="text-stone-500 block text-[10px]">साक्षरता (Literacy):</span>
                <span className="font-mono font-bold text-stone-900">{activeDistrict.literacyRatePercent}%</span>
              </div>
              <div className="bg-white/80 p-1.5 rounded-lg border border-amber-200/60">
                <span className="text-stone-500 block text-[10px]">लिंगगुणोत्तर (Sex Ratio):</span>
                <span className="font-mono font-bold text-stone-900">{activeDistrict.sexRatio} / १०००</span>
              </div>
            </div>
          </div>

          {/* Profile Filter Tabs */}
          <div className="flex items-center gap-1 border-b border-stone-200 pb-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveProfileTab('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeProfileTab === 'all' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              सर्व घटक
            </button>
            <button
              type="button"
              onClick={() => setActiveProfileTab('geo')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeProfileTab === 'geo' ? 'bg-amber-600 text-white' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              🌊 भूगोल
            </button>
            <button
              type="button"
              onClick={() => setActiveProfileTab('hist')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeProfileTab === 'hist' ? 'bg-amber-600 text-white' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              🏰 इतिहास
            </button>
            <button
              type="button"
              onClick={() => setActiveProfileTab('econ')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeProfileTab === 'econ' ? 'bg-amber-600 text-white' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              💼 अर्थव्यवस्था
            </button>
          </div>

          {/* District Highlights Content */}
          <div className="space-y-3 flex-1 overflow-y-auto max-h-[220px] pr-1 text-xs">
            {/* 1. Geography details */}
            {(activeProfileTab === 'all' || activeProfileTab === 'geo') && (
              <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-1">
                <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1">
                  🌊 भूगोल, नद्या व अभयारण्ये:
                </span>
                <p className="text-stone-800 leading-snug">
                  <strong>नद्या:</strong> {activeDistrict.majorRiversMr.join(', ')}
                </p>
                {activeDistrict.sanctuariesAndParksMr.length > 0 && (
                  <p className="text-stone-800 leading-snug">
                    <strong>अभयारण्ये:</strong> {activeDistrict.sanctuariesAndParksMr.join(', ')}
                  </p>
                )}
              </div>
            )}

            {/* 2. History details */}
            {(activeProfileTab === 'all' || activeProfileTab === 'hist') && (
              <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-1">
                <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                  🏰 किल्ले व ऐतिहासिक महत्त्व:
                </span>
                <p className="text-stone-800 leading-snug">
                  <strong>किल्ले:</strong> {activeDistrict.historicalFortsMr.join(', ')}
                </p>
              </div>
            )}

            {/* 3. Economy details */}
            {(activeProfileTab === 'all' || activeProfileTab === 'econ') && (
              <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
                <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
                  🌾 पिके, खनिजे व उद्योग:
                </span>
                <p className="text-stone-800 leading-snug">
                  <strong>पिके:</strong> {activeDistrict.majorCropsMr.join(', ')}
                </p>
                <p className="text-stone-800 leading-snug">
                  <strong>उद्योग/खनिजे:</strong> {activeDistrict.mineralsAndIndustriesMr.join(', ')}
                </p>
              </div>
            )}

            {/* 4. Golden MPSC Facts */}
            <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-300/80 space-y-1">
              <span className="text-[10px] font-black text-orange-950 uppercase tracking-wider flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-600 fill-orange-600" />
                <span>MPSC आयोगाचे वारंवार विचारलेले मुद्दे:</span>
              </span>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-stone-800">
                {activeDistrict.mpscGoldenFactsMr.map((fact, idx) => (
                  <li key={idx} className="leading-snug">
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Question Count Selection Box */}
          <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-700 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>{isMr ? 'चाचणी प्रश्न संख्या निवडा:' : 'Select Questions Count:'}</span>
              </span>
              <span className="text-[11px] font-mono font-bold text-amber-700">
                {questionCount} {isMr ? 'प्रश्न • ' + (questionCount === 10 ? '१० मिनिटे' : questionCount === 15 ? '१५ मिनिटे' : '२० मिनिटे') : `${questionCount} Qs`}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => { setQuestionCount(10); soundFx.playClickSound(); }}
                className={`py-1.5 px-2 rounded-lg font-black transition-all cursor-pointer text-center ${
                  questionCount === 10
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                ⚡ १० प्रश्न
                <span className="block text-[9px] font-normal opacity-90">{isMr ? 'जलद सराव' : 'Quick'}</span>
              </button>
              <button
                type="button"
                onClick={() => { setQuestionCount(15); soundFx.playClickSound(); }}
                className={`py-1.5 px-2 rounded-lg font-black transition-all cursor-pointer text-center ${
                  questionCount === 15
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                🎯 १५ प्रश्न
                <span className="block text-[9px] font-normal opacity-90">{isMr ? 'प्रमाणित' : 'Standard'}</span>
              </button>
              <button
                type="button"
                onClick={() => { setQuestionCount(20); soundFx.playClickSound(); }}
                className={`py-1.5 px-2 rounded-lg font-black transition-all cursor-pointer text-center ${
                  questionCount === 20
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                🏆 २० प्रश्न
                <span className="block text-[9px] font-normal opacity-90">{isMr ? 'महा-सराव' : 'Master Test'}</span>
              </button>
            </div>
          </div>

          {/* Action Button: Launch District Practice */}
          <div className="pt-1 space-y-2">
            <button
              type="button"
              onClick={handleStartExam}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-98"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isMr ? `🚀 ${activeDistrict.nameMr} ची ${questionCount} प्रश्नांची सराव टेस्ट द्या` : `Launch ${questionCount}-Q ${activeDistrict.nameEn} Test`}</span>
            </button>
            <p className="text-[10px] text-stone-500 text-center">
              {isMr 
                ? 'यात भूगोल, इतिहास, अर्थव्यवस्था, तालुके व MPSC आयोगाच्या सुवर्ण तथ्यांचा परिपूर्ण सराव समाविष्ट आहे.' 
                : 'Contains official pattern MCQs covering geography, history, economy, talukas and MPSC golden facts.'}
            </p>
          </div>

          {/* AdSense Unit in Side Panel */}
          <AdBanner placementType="subjectView" format="in_feed" onOpenSettings={onOpenAdSenseManager} />
        </div>
      </div>
    </div>
  );
};
