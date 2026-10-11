import React, { useState } from 'react';
import { 
  Compass, 
  Globe, 
  Maximize2, 
  Minimize2, 
  X, 
  MapPin, 
  Layers, 
  Info, 
  BookOpen, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export interface SVGMapContainerProps {
  mapType?: 'india' | 'world' | 'maharashtra' | 'auto';
  title?: string;
  highlightTopic?: string;
  subtopic?: string;
  questionText?: string;
  language?: 'mr' | 'en';
  className?: string;
  isCollapsible?: boolean;
  defaultExpanded?: boolean;
}

export const SVGMapContainer: React.FC<SVGMapContainerProps> = ({
  mapType = 'auto',
  title,
  highlightTopic = '',
  subtopic = '',
  questionText = '',
  language = 'mr',
  className = '',
  isCollapsible = false,
  defaultExpanded = true,
}) => {
  const isMr = language === 'mr';

  // Automatically detect the most relevant map based on topic and question text
  const getDetectedMapType = (): 'india' | 'world' | 'maharashtra' => {
    if (mapType === 'india') return 'india';
    if (mapType === 'world') return 'world';
    if (mapType === 'maharashtra') return 'maharashtra';

    const textToAnalyze = `${highlightTopic} ${subtopic} ${questionText}`.toLowerCase();
    
    // Check World markers
    const worldKeywords = [
      'world', 'continent', 'ocean', 'equator', 'tropic of capricorn',
      'pacific', 'atlantic', 'arctic', 'antarctica', 'suez', 'panama',
      'sahara', 'amazon', 'nile', 'jag', 'जग', 'जागतिक', 'खंड', 'महासागर',
      'विषुववृत्त', 'मकरवृत्त', 'सुएझ', 'पनामा', 'आफ्रिका', 'युरोप', 'अमेरिका'
    ];

    if (worldKeywords.some((kw) => textToAnalyze.includes(kw))) {
      return 'world';
    }

    // Check Maharashtra markers
    const mahaKeywords = [
      'maharashtra', 'sahyadri', 'konkan', 'godavari', 'bhima', 'krishna',
      'kalsubai', 'ghat', 'vidarbha', 'marathwada', 'district', 'महाराष्ट्र',
      'सह्याद्री', 'कोकण', 'गोदावरी', 'भीमा', 'कृष्णा नदी', 'कळसुबाई', 'घाट',
      'विदर्भ', 'मराठवाडा', 'सातपुडा', 'तापी', 'वैनगंगा'
    ];

    if (mahaKeywords.some((kw) => textToAnalyze.includes(kw))) {
      return 'maharashtra';
    }

    return 'india';
  };

  const [activeMap, setActiveMap] = useState<'india' | 'world' | 'maharashtra'>(getDetectedMapType());
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeLayer, setActiveLayer] = useState<'all' | 'physical' | 'latlong' | 'water'>('all');

  const getMapTitle = () => {
    if (title) return title;
    if (activeMap === 'india') {
      return isMr ? 'भारताचा शैक्षणिक नकाशा (Educational SVG Map)' : 'India Educational SVG Map';
    }
    if (activeMap === 'maharashtra') {
      return isMr ? 'महाराष्ट्राचा शैक्षणिक नकाशा (Maharashtra SVG Map)' : 'Maharashtra Educational SVG Map';
    }
    return isMr ? 'जगाचा शैक्षणिक नकाशा (Educational SVG Map)' : 'World Educational SVG Map';
  };

  return (
    <div className={`rounded-xl border border-amber-200/90 bg-[#fffaf5] shadow-xs overflow-hidden ${className}`}>
      {/* Top Header / Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-amber-100/90 via-orange-50 to-amber-100/70 border-b border-amber-200/80">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            {activeMap === 'india' ? (
              <span className="text-xs">🇮🇳</span>
            ) : activeMap === 'maharashtra' ? (
              <span className="text-xs">🚩</span>
            ) : (
              <Globe className="w-3.5 h-3.5 text-white" />
            )}
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-black text-amber-950 truncate flex items-center gap-1.5">
              <span>{getMapTitle()}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-200/90 text-amber-900 font-extrabold uppercase">
                SVG
              </span>
            </h4>
          </div>
        </div>

        {/* Controls: Switcher & Fullscreen Zoom */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Map Switcher Pills */}
          <div className="flex items-center gap-0.5 bg-amber-200/60 p-0.5 rounded-lg border border-amber-300/60">
            <button
              type="button"
              onClick={() => setActiveMap('india')}
              className={`px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                activeMap === 'india'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
              title={isMr ? "भारताचा नकाशा पहा" : "View India Map"}
            >
              🇮🇳 {isMr ? 'भारत' : 'India'}
            </button>
            <button
              type="button"
              onClick={() => setActiveMap('maharashtra')}
              className={`px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                activeMap === 'maharashtra'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
              title={isMr ? "महाराष्ट्राचा नकाशा पहा" : "View Maharashtra Map"}
            >
              🚩 {isMr ? 'महाराष्ट्र' : 'Maha'}
            </button>
            <button
              type="button"
              onClick={() => setActiveMap('world')}
              className={`px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                activeMap === 'world'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
              title={isMr ? "जगाचा नकाशा पहा" : "View World Map"}
            >
              🌍 {isMr ? 'जग' : 'World'}
            </button>
          </div>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="p-1 rounded-md bg-white border border-amber-300 text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
            title={isMr ? "मोठ्या पडद्यावर पहा (Zoom)" : "Open in Fullscreen"}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Map Canvas Container */}
      <div className="p-3">
        {/* Layer Filter Toolbar */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-200/60 text-[11px] flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-amber-700" />
            <span className="font-bold text-stone-700">{isMr ? 'स्तर (Layers):' : 'Layers:'}</span>
            <button
              type="button"
              onClick={() => setActiveLayer('all')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                activeLayer === 'all' ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {isMr ? 'सर्व' : 'All'}
            </button>
            <button
              type="button"
              onClick={() => setActiveLayer('physical')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                activeLayer === 'physical' ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {isMr ? 'प्राकृतिक (पर्वत/पठारे)' : 'Physical'}
            </button>
            <button
              type="button"
              onClick={() => setActiveLayer('latlong')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                activeLayer === 'latlong' ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {isMr ? 'अक्षवृत्त/रेखावृत्त' : 'Lat/Long'}
            </button>
          </div>

          <div className="text-[10px] text-amber-900 font-medium bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200">
            {activeMap === 'india' 
              ? (isMr ? '📌 कर्कवृत्त (८ राज्ये) व प्रमाणवेळ (५ राज्ये)' : '📌 Tropic of Cancer & IST Line')
              : activeMap === 'maharashtra'
              ? (isMr ? '🚩 सह्याद्री, नद्यांची खोरी व ६ प्रशासकीय विभाग' : '🚩 Sahyadri & River Basins')
              : (isMr ? '🌐 ७ खंड, ५ महासागर व प्रमुख वृत्ते' : '🌐 7 Continents & Oceans')}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INDIA MAP EDUCATIONAL-GRADE SVG */}
        {/* ========================================================================= */}
        {activeMap === 'india' && (
          <div className="relative bg-white rounded-xl border border-stone-200 p-2 sm:p-3 shadow-inner">
            <svg
              viewBox="0 0 650 500"
              className="w-full max-w-xl mx-auto h-auto select-none"
              style={{ maxHeight: '330px' }}
            >
              <defs>
                <linearGradient id="himalayaGradSvg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#93c5fd" />
                  <stop offset="50%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>

              {/* Outer Canvas Border */}
              <rect x="5" y="5" width="640" height="490" rx="12" fill="#fafaf9" stroke="#e7e5e4" strokeWidth="1.5" />

              {/* Reference Grid Lines (Lat/Long) */}
              {(activeLayer === 'all' || activeLayer === 'latlong') && (
                <>
                  {/* Tropic of Cancer 23.5° N */}
                  <line x1="40" y1="260" x2="610" y2="260" stroke="#f97316" strokeWidth="1.8" strokeDasharray="5,4" />
                  <text x="50" y="252" fill="#ea580c" fontSize="10" fontWeight="bold">
                    कर्कवृत्त २३° ३०' उत्तर (Tropic of Cancer - गुजरात, राजस्थान, MP, छग, झारखंड, WB, त्रिपुरा, मिझोराम)
                  </text>

                  {/* Standard Meridian 82.5° E */}
                  <line x1="390" y1="30" x2="390" y2="470" stroke="#0284c7" strokeWidth="1.8" strokeDasharray="5,4" />
                  <text x="395" y="465" fill="#0369a1" fontSize="10" fontWeight="bold">
                    ८२° ३०' पूर्व रेखावृत्त (IST प्रमाणवेळ - UP, MP, छग, ओडिसा, AP)
                  </text>
                </>
              )}

              {/* Physical Features (Himalayas, Plains, Ghats, Plateau) */}
              {(activeLayer === 'all' || activeLayer === 'physical') && (
                <>
                  {/* Greater Himalayas Arc */}
                  <path
                    d="M 120 70 Q 280 120 540 140"
                    fill="none"
                    stroke="url(#himalayaGradSvg)"
                    strokeWidth="11"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                  <text x="240" y="95" fill="#1e40af" fontSize="11" fontWeight="900">
                    🏔️ ग्रेटर हिमालय (बृहद हिमालय - K2 / कांचनगंगा)
                  </text>

                  {/* Indo-Gangetic Plains */}
                  <ellipse cx="340" cy="190" rx="150" ry="32" fill="#86efac" opacity="0.45" stroke="#22c55e" strokeWidth="1.5" />
                  <text x="260" y="195" fill="#15803d" fontSize="11" fontWeight="bold">
                    🌾 उत्तर भारतीय गंगेचे सुपीक मैदान (गाळाची जमीन)
                  </text>

                  {/* Thar Desert */}
                  <ellipse cx="140" cy="220" rx="45" ry="30" fill="#fde047" opacity="0.6" stroke="#ca8a04" strokeWidth="1.5" />
                  <text x="105" y="222" fill="#854d0e" fontSize="10" fontWeight="bold">
                    🏜️ थार वाळवंट (राजस्थान)
                  </text>

                  {/* Deccan Plateau */}
                  <polygon
                    points="220,290 460,290 340,430"
                    fill="#fdba74"
                    opacity="0.45"
                    stroke="#ea580c"
                    strokeWidth="1.5"
                  />
                  <text x="280" y="340" fill="#9a3412" fontSize="12" fontWeight="900">
                    🌋 दख्खनचे पठार (काळी बेसाल्ट / रेगूर मृदा)
                  </text>

                  {/* Western Ghats (Sahyadri) */}
                  <path
                    d="M 215 280 Q 230 360 270 450"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <text x="135" y="375" fill="#047857" fontSize="11" fontWeight="bold">
                    🌿 पश्चिम घाट (सह्याद्री - सतत रांग)
                  </text>

                  {/* Eastern Ghats */}
                  <path
                    d="M 470 290 Q 430 360 370 440"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="5"
                    strokeDasharray="8,5"
                    strokeLinecap="round"
                  />
                  <text x="445" y="380" fill="#065f46" fontSize="11" fontWeight="bold">
                    🌱 पूर्व घाट (तुटक पर्वत)
                  </text>
                </>
              )}

              {/* Seas & Oceans */}
              <text x="50" y="420" fill="#0284c7" fontSize="12" fontWeight="bold">
                🌊 अरबी समुद्र
              </text>
              <text x="470" y="330" fill="#0284c7" fontSize="12" fontWeight="bold">
                🌊 बंगालचा उपसागर
              </text>
              <text x="270" y="480" fill="#0369a1" fontSize="12" fontWeight="900">
                🌊 हिंदी महासागर
              </text>

              {/* Islands */}
              <circle cx="560" cy="400" r="10" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
              <text x="500" y="430" fill="#0369a1" fontSize="9" fontWeight="bold">
                🏝️ अंदमान-निकोबार (१०° खाडी)
              </text>

              <circle cx="160" cy="440" r="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
              <text x="105" y="465" fill="#0369a1" fontSize="9" fontWeight="bold">
                🏝️ लक्षद्वीप (८° व ९° खाडी)
              </text>
            </svg>

            {/* Educational Quick Facts Bar */}
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-stone-100 text-[11px]">
              <div className="p-1.5 rounded-lg bg-orange-50 border border-orange-200">
                <span className="font-bold text-orange-900 block">कर्कवृत्त राज्ये (८):</span>
                <span className="text-stone-600">गु, रा, मप्र, छ, झा, पंबं, त्रि, मि</span>
              </div>
              <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-200">
                <span className="font-bold text-blue-900 block">IST रेखावृत्त (५):</span>
                <span className="text-stone-600">UP, MP, छग, ओडिसा, AP (८२.५° E)</span>
              </div>
              <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <span className="font-bold text-emerald-900 block">समुद्रकिनारा:</span>
                <span className="text-stone-600">७,५१६.६ किमी (गुजरात सर्वाधिक)</span>
              </div>
              <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200">
                <span className="font-bold text-amber-900 block">दक्षिण टोक:</span>
                <span className="text-stone-600">इंदिरा पॉईंट (ग्रेट निकोबार ६° ४५')</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MAHARASHTRA MAP EDUCATIONAL-GRADE SVG */}
        {/* ========================================================================= */}
        {activeMap === 'maharashtra' && (
          <div className="relative bg-white rounded-xl border border-stone-200 p-2 sm:p-3 shadow-inner">
            <svg
              viewBox="0 0 650 400"
              className="w-full max-w-xl mx-auto h-auto select-none"
              style={{ maxHeight: '330px' }}
            >
              <rect x="5" y="5" width="640" height="390" rx="12" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />

              {/* Konkan Coast */}
              <path d="M 50 80 Q 70 200 80 340 L 115 340 Q 105 200 85 80 Z" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.5" />
              <text x="60" y="210" fill="#1e40af" fontSize="10" fontWeight="900" transform="rotate(-85 60 210)">
                कोकण किनारपट्टी (७२० किमी)
              </text>

              {/* Sahyadri Western Ghats Mountain Spine */}
              <path d="M 85 70 Q 110 200 120 350" fill="none" stroke="#047857" strokeWidth="10" strokeLinecap="round" />
              <text x="125" y="120" fill="#065f46" fontSize="10" fontWeight="bold">⛰️ कळसुबाई (१६४६ मी.)</text>
              <text x="135" y="160" fill="#065f46" fontSize="9" fontWeight="bold">• महाबळेश्वर (१४३८ मी.)</text>
              <text x="140" y="200" fill="#065f46" fontSize="9" fontWeight="bold">• साल्हेर (१५६७ मी.)</text>

              {/* Satpura Range in North */}
              <line x1="160" y1="50" x2="380" y2="40" stroke="#b45309" strokeWidth="8" strokeLinecap="round" />
              <text x="210" y="32" fill="#78350f" fontSize="10" fontWeight="900">
                🏔️ सातपुडा पर्वतरांग (तोरणमाळ / अस्तंभा १३२५ मी.)
              </text>

              {/* River Tapi/Purna in North */}
              <path d="M 370 70 Q 250 75 90 70" fill="none" stroke="#0284c7" strokeWidth="2.5" />
              <text x="220" y="65" fill="#0369a1" fontSize="9" fontWeight="bold">तापी-पूर्णा खोरे (पश्चिम वाहिनी)</text>

              {/* River Godavari Basin */}
              <path d="M 120 140 Q 300 160 550 250" fill="none" stroke="#2563eb" strokeWidth="4" />
              <text x="270" y="145" fill="#1e3a8a" fontSize="11" fontWeight="900">
                🌊 गोदावरी नदी खोरे (महाराष्ट्राचे ४९.५% क्षेत्रफळ)
              </text>

              {/* River Bhima Basin */}
              <path d="M 130 220 Q 300 240 450 310" fill="none" stroke="#3b82f6" strokeWidth="3" />
              <text x="240" y="225" fill="#1d4ed8" fontSize="10" fontWeight="bold">
                🌊 भीमा नदी खोरे (पंढरपूर चंद्रभागा)
              </text>

              {/* River Krishna Basin */}
              <path d="M 130 290 Q 250 310 380 340" fill="none" stroke="#0284c7" strokeWidth="2.5" />
              <text x="180" y="305" fill="#0369a1" fontSize="9" fontWeight="bold">
                🌊 कृष्णा नदी खोरे (महाबळेश्वर उगम)
              </text>

              {/* Administrative Divisions */}
              <rect x="150" y="90" width="100" height="40" rx="6" fill="#fef08a" stroke="#ca8a04" opacity="0.7" />
              <text x="165" y="115" fill="#713f12" fontSize="10" fontWeight="bold">नाशिक विभाग</text>

              <rect x="150" y="160" width="100" height="45" rx="6" fill="#fed7aa" stroke="#ea580c" opacity="0.7" />
              <text x="175" y="187" fill="#9a3412" fontSize="10" fontWeight="bold">पुणे विभाग</text>

              <rect x="270" y="150" width="125" height="55" rx="6" fill="#fbcfe8" stroke="#db2777" opacity="0.7" />
              <text x="280" y="180" fill="#831843" fontSize="10" fontWeight="bold">छ. संभाजीनगर (मराठवाडा)</text>

              <rect x="360" y="60" width="110" height="50" rx="6" fill="#bbf7d0" stroke="#16a34a" opacity="0.7" />
              <text x="380" y="90" fill="#14532d" fontSize="10" fontWeight="bold">अमरावती विभाग</text>

              <rect x="480" y="90" width="140" height="80" rx="6" fill="#ddd6fe" stroke="#7c3aed" opacity="0.7" />
              <text x="500" y="130" fill="#4c1d95" fontSize="11" fontWeight="bold">नागपूर विभाग (विदर्भ)</text>
              <text x="505" y="145" fill="#5b21b6" fontSize="8">(वैनगंगा-प्राणहिता खोरे)</text>
            </svg>

            {/* Educational Maharashtra Facts Bar */}
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-stone-100 text-[11px]">
              <div className="p-1.5 rounded-lg bg-orange-50 border border-orange-200">
                <span className="font-bold text-orange-900 block">क्षेत्रफळ:</span>
                <span className="text-stone-600">३,०७,७१३ चौ.किमी (भारताच्या ९.३६%)</span>
              </div>
              <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <span className="font-bold text-emerald-900 block">गोदावरी खोरे:</span>
                <span className="text-stone-600">१,५२,५८८ चौ.किमी (४९.५%)</span>
              </div>
              <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-200">
                <span className="font-bold text-blue-900 block">समुद्रकिनारा:</span>
                <span className="text-stone-600">७२० किमी (रत्नागिरी सर्वाधिक २३७)</span>
              </div>
              <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200">
                <span className="font-bold text-amber-900 block">सर्वोच्च शिखर:</span>
                <span className="text-stone-600">कळसुबाई (१६४६ मी - अहिल्यानगर)</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* WORLD MAP EDUCATIONAL-GRADE SVG */}
        {/* ========================================================================= */}
        {activeMap === 'world' && (
          <div className="relative bg-white rounded-xl border border-stone-200 p-2 sm:p-3 shadow-inner">
            <svg
              viewBox="0 0 700 400"
              className="w-full max-w-xl mx-auto h-auto select-none"
              style={{ maxHeight: '330px' }}
            >
              {/* Background Ocean Fill */}
              <rect x="5" y="5" width="690" height="390" rx="12" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.5" />

              {/* Latitude Reference Lines */}
              {(activeLayer === 'all' || activeLayer === 'latlong') && (
                <>
                  {/* Arctic Circle 66.5 N */}
                  <line x1="10" y1="65" x2="690" y2="65" stroke="#93c5fd" strokeWidth="1" strokeDasharray="4,4" />
                  <text x="15" y="60" fill="#2563eb" fontSize="9" fontWeight="bold">६६° ३०' N - आर्क्टिक वृत्त</text>

                  {/* Tropic of Cancer 23.5 N */}
                  <line x1="10" y1="135" x2="690" y2="135" stroke="#f97316" strokeWidth="1.2" strokeDasharray="5,4" />
                  <text x="15" y="130" fill="#ea580c" fontSize="9" fontWeight="bold">२३° ३०' N - कर्कवृत्त (Tropic of Cancer)</text>

                  {/* Equator 0 */}
                  <line x1="10" y1="200" x2="690" y2="200" stroke="#dc2626" strokeWidth="1.8" strokeDasharray="6,4" />
                  <text x="15" y="195" fill="#dc2626" fontSize="10" fontWeight="900">००° ००' - विषुववृत्त (Equator - सर्वात मोठे अक्षवृत्त)</text>

                  {/* Tropic of Capricorn 23.5 S */}
                  <line x1="10" y1="265" x2="690" y2="265" stroke="#059669" strokeWidth="1.2" strokeDasharray="5,4" />
                  <text x="15" y="260" fill="#047857" fontSize="9" fontWeight="bold">२३° ३०' S - मकरवृत्त (Tropic of Capricorn)</text>

                  {/* Prime Meridian 0 */}
                  <line x1="330" y1="10" x2="330" y2="390" stroke="#475569" strokeWidth="1.2" strokeDasharray="4,4" />
                  <text x="335" y="25" fill="#334155" fontSize="9" fontWeight="bold">००° रेखावृत्त (GMT ग्रीनविच लंडन)</text>
                </>
              )}

              {/* Continents Blocks */}
              {/* North America */}
              <path d="M 60 70 L 190 70 L 170 170 L 120 220 L 70 140 Z" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
              <text x="85" y="125" fill="#15803d" fontSize="11" fontWeight="bold">उत्तर अमेरिका (North America)</text>

              {/* South America */}
              <path d="M 140 225 L 210 240 L 190 340 L 145 350 Z" fill="#86efac" stroke="#15803d" strokeWidth="1.5" />
              <text x="145" y="280" fill="#14532d" fontSize="10" fontWeight="bold">दक्षिण अमेरिका</text>
              <text x="145" y="295" fill="#166534" fontSize="8">(ॲमेझॉन खोरे)</text>

              {/* Europe */}
              <path d="M 310 65 L 400 65 L 390 135 L 315 130 Z" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
              <text x="330" y="100" fill="#c2410c" fontSize="10" fontWeight="bold">युरोप (Europe)</text>

              {/* Africa */}
              <path d="M 300 140 L 410 140 L 390 280 L 330 300 L 290 190 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
              <text x="325" y="190" fill="#854d0e" fontSize="11" fontWeight="bold">आफ्रिका (Africa)</text>
              <text x="320" y="205" fill="#713f12" fontSize="8">(सहारा वाळवंट / नाईल नदी)</text>

              {/* Asia */}
              <path d="M 405 60 L 630 60 L 610 220 L 480 240 L 415 140 Z" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
              <text x="490" y="120" fill="#9d174d" fontSize="12" fontWeight="900">आशिया (Asia - सर्वात मोठा खंड)</text>

              {/* India Location Flag */}
              <polygon points="460,160 500,160 480,210" fill="#ea580c" stroke="#c2410c" strokeWidth="1.5" />
              <text x="470" y="180" fill="#ffffff" fontSize="9" fontWeight="bold">भारत</text>

              {/* Australia */}
              <path d="M 520 260 L 620 260 L 600 330 L 510 320 Z" fill="#e9d5ff" stroke="#9333ea" strokeWidth="1.5" />
              <text x="530" y="295" fill="#6b21a8" fontSize="10" fontWeight="bold">ऑस्ट्रेलिया (खंड)</text>

              {/* Antarctica */}
              <rect x="50" y="365" width="600" height="20" rx="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="270" y="379" fill="#475569" fontSize="9" fontWeight="bold">अंटार्क्टिका (पांढरा बर्फाच्छादित खंड - दक्षिण ध्रुव)</text>

              {/* Oceans text */}
              <text x="15" y="320" fill="#0284c7" fontSize="10" fontWeight="bold">पॅसिफिक महासागर</text>
              <text x="220" y="160" fill="#0284c7" fontSize="10" fontWeight="bold">अटलांटिक महासागर</text>
              <text x="440" y="280" fill="#0284c7" fontSize="10" fontWeight="bold">हिंदी महासागर</text>
              <text x="615" y="200" fill="#0284c7" fontSize="10" fontWeight="bold">पॅसिफिक</text>
            </svg>

            {/* Educational World Facts Bar */}
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-stone-100 text-[11px]">
              <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <span className="font-bold text-emerald-900 block">विषुववृत्त जाणारा खंड:</span>
                <span className="text-stone-600">आफ्रिका, द. अमेरिका, आशिया</span>
              </div>
              <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200">
                <span className="font-bold text-amber-900 block">तीन्ही वृत्ते जाणारा खंड:</span>
                <span className="text-stone-600">केवळ आफ्रिका खंड</span>
              </div>
              <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-200">
                <span className="font-bold text-blue-900 block">सर्वात खोल गर्ता:</span>
                <span className="text-stone-600">मरियाना गर्ता (११,०२२ मी. - पॅसिफिक)</span>
              </div>
              <div className="p-1.5 rounded-lg bg-purple-50 border border-purple-200">
                <span className="font-bold text-purple-900 block">सुएझ कालवा जोडतो:</span>
                <span className="text-stone-600">भूमध्य समुद्र ↔ तांबडा समुद्र</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN MODAL FOR DEEP STUDY */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden border border-stone-300">
            {/* Modal Bar */}
            <div className="px-4 py-3 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <span className="font-black text-sm sm:text-base">
                  {activeMap === 'india'
                    ? (isMr ? '🇮🇳 भारताचा सविस्तर शैक्षणिक नकाशा (SVG Fullscreen)' : 'India Comprehensive Educational Map')
                    : activeMap === 'maharashtra'
                    ? (isMr ? '🚩 महाराष्ट्राचा सविस्तर शैक्षणिक नकाशा (SVG Fullscreen)' : 'Maharashtra Educational Map')
                    : (isMr ? '🌍 जगाचा सविस्तर शैक्षणिक नकाशा (SVG Fullscreen)' : 'World Comprehensive Educational Map')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-stone-800 p-0.5 rounded-lg border border-stone-700">
                  <button
                    type="button"
                    onClick={() => setActiveMap('india')}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      activeMap === 'india' ? 'bg-amber-600 text-white' : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    🇮🇳 भारत
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMap('maharashtra')}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      activeMap === 'maharashtra' ? 'bg-amber-600 text-white' : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    🚩 महाराष्ट्र
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMap('world')}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      activeMap === 'world' ? 'bg-amber-600 text-white' : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    🌍 जग
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 overflow-y-auto flex-1 bg-stone-50 flex items-center justify-center">
              <div className="w-full max-w-3xl bg-white p-4 rounded-xl border border-stone-200 shadow-md">
                {activeMap === 'india' ? (
                  <svg viewBox="0 0 650 500" className="w-full h-auto">
                    <rect x="5" y="5" width="640" height="490" rx="14" fill="#fafaf9" stroke="#e7e5e4" strokeWidth="1.5" />
                    <line x1="40" y1="260" x2="610" y2="260" stroke="#f97316" strokeWidth="1.8" strokeDasharray="5,4" />
                    <text x="50" y="254" fill="#ea580c" fontSize="11" fontWeight="bold">कर्कवृत्त २३° ३०' उत्तर (८ राज्ये: गुजरात, राजस्थान, MP, छग, झारखंड, WB, त्रिपुरा, मिझोराम)</text>
                    <line x1="390" y1="30" x2="390" y2="470" stroke="#0284c7" strokeWidth="1.8" strokeDasharray="5,4" />
                    <text x="395" y="465" fill="#0369a1" fontSize="11" fontWeight="bold">८२° ३०' पूर्व प्रमाणवेळ रेखावृत्त (IST - ५ राज्ये: UP, MP, छग, ओडिसा, AP)</text>
                    <path d="M 120 70 Q 280 120 540 140" fill="none" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round" opacity="0.85" />
                    <text x="250" y="95" fill="#1e40af" fontSize="12" fontWeight="900">🏔️ ग्रेटर हिमालय (बृहद हिमालय - K2 / कांचनगंगा)</text>
                    <ellipse cx="340" cy="190" rx="150" ry="32" fill="#86efac" opacity="0.45" stroke="#22c55e" strokeWidth="1.5" />
                    <text x="260" y="195" fill="#15803d" fontSize="12" fontWeight="bold">🌾 उत्तर भारतीय गंगेचे सुपीक मैदान</text>
                    <polygon points="220,290 460,290 340,430" fill="#fdba74" opacity="0.45" stroke="#ea580c" strokeWidth="1.5" />
                    <text x="280" y="340" fill="#9a3412" fontSize="13" fontWeight="900">🌋 दख्खनचे पठार (काळी कापसाची रेगूर मृदा)</text>
                    <path d="M 215 280 Q 230 360 270 450" fill="none" stroke="#059669" strokeWidth="7" strokeLinecap="round" />
                    <text x="135" y="375" fill="#047857" fontSize="12" fontWeight="bold">🌿 पश्चिम घाट (सह्याद्री - जैवविविधता हॉटस्पॉट)</text>
                    <path d="M 470 290 Q 430 360 370 440" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray="8,5" strokeLinecap="round" />
                    <text x="445" y="380" fill="#065f46" fontSize="12" fontWeight="bold">🌱 पूर्व घाट (तुटक पर्वत)</text>
                    <text x="50" y="420" fill="#0284c7" fontSize="13" fontWeight="bold">🌊 अरबी समुद्र</text>
                    <text x="470" y="330" fill="#0284c7" fontSize="13" fontWeight="bold">🌊 बंगालचा उपसागर</text>
                    <text x="270" y="480" fill="#0369a1" fontSize="13" fontWeight="900">🌊 हिंदी महासागर</text>
                  </svg>
                ) : activeMap === 'maharashtra' ? (
                  <svg viewBox="0 0 650 400" className="w-full h-auto">
                    <rect x="5" y="5" width="640" height="390" rx="14" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
                    <path d="M 50 80 Q 70 200 80 340 L 115 340 Q 105 200 85 80 Z" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.5" />
                    <text x="60" y="210" fill="#1e40af" fontSize="11" fontWeight="900" transform="rotate(-85 60 210)">
                      कोकण किनारपट्टी (७२० किमी)
                    </text>
                    <path d="M 85 70 Q 110 200 120 350" fill="none" stroke="#047857" strokeWidth="10" strokeLinecap="round" />
                    <text x="125" y="120" fill="#065f46" fontSize="11" fontWeight="bold">⛰️ कळसुबाई (१६४६ मी.)</text>
                    <text x="135" y="160" fill="#065f46" fontSize="10" fontWeight="bold">• महाबळेश्वर (१४३८ मी.)</text>
                    <text x="140" y="200" fill="#065f46" fontSize="10" fontWeight="bold">• साल्हेर (१५६७ मी.)</text>
                    <line x1="160" y1="50" x2="380" y2="40" stroke="#b45309" strokeWidth="8" strokeLinecap="round" />
                    <text x="210" y="32" fill="#78350f" fontSize="11" fontWeight="900">
                      🏔️ सातपुडा पर्वतरांग (तोरणमाळ / अस्तंभा १३२५ मी.)
                    </text>
                    <path d="M 370 70 Q 250 75 90 70" fill="none" stroke="#0284c7" strokeWidth="2.5" />
                    <text x="220" y="65" fill="#0369a1" fontSize="10" fontWeight="bold">तापी-पूर्णा खोरे (पश्चिम वाहिनी)</text>
                    <path d="M 120 140 Q 300 160 550 250" fill="none" stroke="#2563eb" strokeWidth="4" />
                    <text x="270" y="145" fill="#1e3a8a" fontSize="12" fontWeight="900">
                      🌊 गोदावरी नदी खोरे (महाराष्ट्राचे ४९.५% क्षेत्रफळ)
                    </text>
                    <path d="M 130 220 Q 300 240 450 310" fill="none" stroke="#3b82f6" strokeWidth="3" />
                    <text x="240" y="225" fill="#1d4ed8" fontSize="11" fontWeight="bold">
                      🌊 भीमा नदी खोरे (पंढरपूर चंद्रभागा)
                    </text>
                    <path d="M 130 290 Q 250 310 380 340" fill="none" stroke="#0284c7" strokeWidth="2.5" />
                    <text x="180" y="305" fill="#0369a1" fontSize="10" fontWeight="bold">
                      🌊 कृष्णा नदी खोरे (महाबळेश्वर उगम)
                    </text>
                  </svg>
                ) : (
                  <svg viewBox="0 0 700 400" className="w-full h-auto">
                    <rect x="5" y="5" width="690" height="390" rx="14" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.5" />
                    <line x1="10" y1="135" x2="690" y2="135" stroke="#f97316" strokeWidth="1.2" strokeDasharray="5,4" />
                    <text x="15" y="130" fill="#ea580c" fontSize="10" fontWeight="bold">२३° ३०' N - कर्कवृत्त (Tropic of Cancer)</text>
                    <line x1="10" y1="200" x2="690" y2="200" stroke="#dc2626" strokeWidth="2" strokeDasharray="6,4" />
                    <text x="15" y="195" fill="#dc2626" fontSize="11" fontWeight="900">००° ००' - विषुववृत्त (Equator - ४०,०७५ किमी)</text>
                    <line x1="10" y1="265" x2="690" y2="265" stroke="#059669" strokeWidth="1.2" strokeDasharray="5,4" />
                    <text x="15" y="260" fill="#047857" fontSize="10" fontWeight="bold">२३° ३०' S - मकरवृत्त (Tropic of Capricorn)</text>
                    <path d="M 60 70 L 190 70 L 170 170 L 120 220 L 70 140 Z" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
                    <text x="85" y="125" fill="#15803d" fontSize="12" fontWeight="bold">उत्तर अमेरिका</text>
                    <path d="M 140 225 L 210 240 L 190 340 L 145 350 Z" fill="#86efac" stroke="#15803d" strokeWidth="1.5" />
                    <text x="145" y="280" fill="#14532d" fontSize="11" fontWeight="bold">दक्षिण अमेरिका</text>
                    <path d="M 310 65 L 400 65 L 390 135 L 315 130 Z" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
                    <text x="330" y="100" fill="#c2410c" fontSize="11" fontWeight="bold">युरोप</text>
                    <path d="M 300 140 L 410 140 L 390 280 L 330 300 L 290 190 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
                    <text x="325" y="190" fill="#854d0e" fontSize="12" fontWeight="bold">आफ्रिका (सहारा / नाईल)</text>
                    <path d="M 405 60 L 630 60 L 610 220 L 480 240 L 415 140 Z" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
                    <text x="490" y="120" fill="#9d174d" fontSize="13" fontWeight="900">आशिया (Asia)</text>
                    <path d="M 520 260 L 620 260 L 600 330 L 510 320 Z" fill="#e9d5ff" stroke="#9333ea" strokeWidth="1.5" />
                    <text x="530" y="295" fill="#6b21a8" fontSize="11" fontWeight="bold">ऑस्ट्रेलिया</text>
                  </svg>
                )}
              </div>
            </div>

            {/* Modal Bottom Bar */}
            <div className="p-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
              <span>💡 MPSC संदर्भ: भौगोलिक संकल्पना समजून घेण्यासाठी अचूक प्रमाणबद्ध आकृत्या.</span>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="px-4 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold cursor-pointer"
              >
                {isMr ? 'बंद करा' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
