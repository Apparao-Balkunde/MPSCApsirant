import React, { useState } from 'react';
import { 
  MapPin, 
  Globe, 
  Compass, 
  Layers, 
  Maximize2, 
  X, 
  Lightbulb, 
  Sparkles, 
  ZoomIn, 
  BookOpen, 
  Share2, 
  Check, 
  Eye
} from 'lucide-react';
import { SubjectId } from '../types';

interface VisualMemoryAidProps {
  subjectId: SubjectId;
  topic?: string;
  subtopic?: string;
  language: 'mr' | 'en';
  defaultMapType?: 'india' | 'world' | 'maharashtra';
  customImageUrl?: string;
  memoryTrickMr?: string;
  memoryTrickEn?: string;
}

export const VisualMemoryAid: React.FC<VisualMemoryAidProps> = ({
  subjectId,
  topic = '',
  subtopic = '',
  language,
  defaultMapType,
  customImageUrl,
  memoryTrickMr,
  memoryTrickEn,
}) => {
  const isMr = language === 'mr';
  const [activeTab, setActiveTab] = useState<'india' | 'world' | 'maharashtra' | 'diagram' | 'trick'>(
    defaultMapType || (subjectId === 'maharashtra_geography' ? 'maharashtra' : subjectId === 'environment' || subjectId === 'current_affairs' ? 'world' : 'india')
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  // Subject-specific default mnemonics if not explicitly provided
  const getSubjectDefaultTrick = () => {
    if (memoryTrickMr && isMr) return memoryTrickMr;
    if (memoryTrickEn && !isMr) return memoryTrickEn;

    if (subjectId === 'maharashtra_geography') {
      return isMr
        ? '💡 सह्याद्रीतील घाटांचा उत्तरेकडून दक्षिणेकडे क्रम ट्रिक:\n"थळ ➔ बोर ➔ कुंभारली ➔ आंबा ➔ फोंडा ➔ आंबोली"\n(मुंबई-नाशिक = थळघाट | मुंबई-पुणे = बोरघाट | कराड-चिपळूण = कुंभारली | कोल्हापूर-रत्नागिरी = आंबा)'
        : '💡 Ghats North to South Order:\nThalghat (Mumbai-Nashik) ➔ Bhorghat (Mumbai-Pune) ➔ Kumbharli (Karad-Chiplun) ➔ Amba (Kolhapur-Ratnagiri) ➔ Phonda ➔ Amboli';
    }

    if (subjectId === 'polity') {
      return isMr
        ? '💡 मूलभूत हक्क (कलम १४ ते ३२) ट्रिक:\n"समान स्वातंत्र्याने शोषणाविरुद्ध धार्मिक शिक्षणाचा घटनात्मक उपाय केला"\n• १४-१८: समानता | १९-२२: स्वातंत्र्य | २३-२४: शोषणाविरुद्ध | २५-२८: धर्मस्वातंत्र्य | २९-३०: संस्कृती व शिक्षण | ३२: घटनात्मक उपाययोजना'
        : '💡 Fundamental Rights (Articles 14 to 32):\n14-18: Equality | 19-22: Freedom | 23-24: Against Exploitation | 25-28: Religious Freedom | 29-30: Cultural & Educational | 32: Constitutional Remedies';
    }

    if (subjectId === 'general_science') {
      return isMr
        ? '💡 रक्तगट ट्रिक (Blood Groups):\n• "O Negative" = सर्वयोग्य दाता (Universal Donor - कारण कोणतीही Antigens नसतात).\n• "AB Positive" = सर्वयोग्य ग्राहक (Universal Recipient - कारण कोणतीही Antibodies नसतात).'
        : '💡 Blood Groups Mnemonic:\n• O Negative = Universal Donor (No antigens on RBCs)\n• AB Positive = Universal Recipient (No antibodies in plasma)';
    }

    if (subjectId === 'maharashtra_history') {
      return isMr
        ? '💡 वृत्तपत्रे व समाजसुधारक:\n• बाळशास्त्री जांभेकर: दर्पण (१८३२ - मराठी वृत्तपत्रसृष्टीचे जनक)\n• महात्मा फुले: दिनबंधू (कृष्णराव भालेकर संपादक)\n• गो. ग. आगरकर: सुधारक (१८८८)\n• लोकमान्य टिळक: केसरी (मराठी) व मराठा (इंग्रजी - १८८१)'
        : '💡 Prominent Newspapers & Reformers:\n• Jambhekar: Darpan (1832)\n• Phule & Bhalekar: Deenbandhu (1877)\n• Agarkar: Sudharak (1888)\n• Tilak: Kesari (Marathi) & Mahratta (English, 1881)';
    }

    // Default India Geography trick
    return isMr
      ? '💡 कर्कवृत्त (Tropic of Cancer २३.५° N) जाणारी ८ राज्ये ट्रिक:\n"मित्र पर गमछा झार"\nमि - मिझोराम | त्र - त्रिपुरा | प - पश्चिम बंगाल | र - राजस्थान | ग - गुजरात | म - मध्य प्रदेश | छा - छत्तीसगड | झार - झारखंड'
      : '💡 Tropic of Cancer (23.5° N) 8 Indian States Mnemonic:\n"GuRaM ChhaJha WBTriM"\nGujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram';
  };

  return (
    <div className="mt-3.5 rounded-xl border border-amber-200/90 bg-gradient-to-b from-amber-50/70 to-orange-50/40 p-3 sm:p-4 shadow-xs">
      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-amber-200/80">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-700">
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-amber-900 flex items-center gap-1.5">
              <span>{isMr ? 'स्मरण सहाय्यक चित्रे व नकाशे' : 'Visual Memory Aid & Maps'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-200 text-amber-900 font-extrabold uppercase">
                {isMr ? 'लक्षात ठेवण्यासाठी' : 'For Recall'}
              </span>
            </div>
            <p className="text-[10px] text-stone-500">
              {isMr ? 'आकृत्या व नकाशांद्वारे दीर्घकाळ लक्षात राहणारी संकल्पना' : 'Visual infographics & maps for rapid exam retention'}
            </p>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="flex items-center gap-1 bg-amber-100/80 p-0.5 rounded-lg border border-amber-200 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('india')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
              activeTab === 'india'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-amber-200/60'
            }`}
          >
            <span>🇮🇳</span>
            <span>{isMr ? 'भारत नकाशा' : 'India Map'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('world')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
              activeTab === 'world'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-amber-200/60'
            }`}
          >
            <span>🌍</span>
            <span>{isMr ? 'जग नकाशा' : 'World Map'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('maharashtra')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
              activeTab === 'maharashtra'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-amber-200/60'
            }`}
          >
            <span>🚩</span>
            <span>{isMr ? 'महाराष्ट्र' : 'Maharashtra'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('trick')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
              activeTab === 'trick'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-amber-200/60'
            }`}
          >
            <span>💡</span>
            <span>{isMr ? 'स्मरण ट्रिक' : 'Mnemonics'}</span>
          </button>
        </div>
      </div>

      {/* Main Visual Display Container */}
      <div className="pt-3">
        {/* ========================================================================= */}
        {/* 1. INDIA MAP VISUALIZER */}
        {/* ========================================================================= */}
        {activeTab === 'india' && (
          <div className="space-y-2.5">
            <div className="relative bg-white rounded-xl border border-amber-200/80 p-3 shadow-inner overflow-hidden">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100 text-xs">
                <div className="font-extrabold text-stone-800 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>{isMr ? 'भारताचा प्राकृतिक व राजकीय नकाशा (MPSC की-फॅक्ट्स)' : 'India Physical & Key Geographic Highlights'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>{isMr ? 'मोठे करा' : 'Zoom'}</span>
                </button>
              </div>

              {/* High-Contrast Interactive India Map SVG Visualizer */}
              <div className="w-full flex justify-center py-1">
                <svg
                  viewBox="0 0 650 500"
                  className="w-full max-w-xl h-auto drop-shadow-xs select-none"
                  style={{ maxHeight: '340px' }}
                >
                  <defs>
                    <linearGradient id="indiaBg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fff7ed" />
                      <stop offset="100%" stopColor="#fef3c7" />
                    </linearGradient>
                    <linearGradient id="himalayaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#93c5fd" />
                      <stop offset="50%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>

                  {/* Outline Container */}
                  <rect x="5" y="5" width="640" height="490" rx="14" fill="#fafaf9" stroke="#e7e5e4" strokeWidth="1.5" />

                  {/* Lat/Long Grid reference lines */}
                  {/* Tropic of Cancer 23.5 N */}
                  <line x1="40" y1="260" x2="610" y2="260" stroke="#f97316" strokeWidth="1.5" strokeDasharray="5,4" />
                  <text x="50" y="254" fill="#ea580c" fontSize="10" fontWeight="bold">
                    कर्कवृत्त २३° ३०' उत्तर (Tropic of Cancer - ८ राज्ये)
                  </text>

                  {/* Standard Meridian 82.5 E */}
                  <line x1="390" y1="30" x2="390" y2="470" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="5,4" />
                  <text x="395" y="465" fill="#0369a1" fontSize="10" fontWeight="bold">
                    ८२° ३०' पूर्व रेखावृत्त (IST प्रमाणवेळ - ५ राज्ये)
                  </text>

                  {/* Himalayan Range arc */}
                  <path
                    d="M 120 70 Q 280 120 540 140"
                    fill="none"
                    stroke="url(#himalayaGrad)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                  <text x="250" y="95" fill="#1e40af" fontSize="11" fontWeight="900">
                    🏔️ ग्रेटर हिमालय (बृहद हिमालय) - माउंट एव्हरेस्ट / कांचनगंगा
                  </text>

                  {/* Northern Plains (Ganga-Brahmaputra) */}
                  <ellipse cx="340" cy="190" rx="150" ry="32" fill="#86efac" opacity="0.45" stroke="#22c55e" strokeWidth="1.5" />
                  <text x="260" y="195" fill="#15803d" fontSize="11" fontWeight="bold">
                    🌾 उत्तर भारतीय गंगेचे सुपीक मैदान (गाळाची जमीन)
                  </text>

                  {/* Thar Desert */}
                  <ellipse cx="140" cy="220" rx="45" ry="30" fill="#fde047" opacity="0.6" stroke="#ca8a04" strokeWidth="1.5" />
                  <text x="105" y="222" fill="#854d0e" fontSize="10" fontWeight="bold">
                    🏜️ थार वाळवंट
                  </text>

                  {/* Deccan Plateau (दख्खनचे पठार) */}
                  <polygon
                    points="220,290 460,290 340,430"
                    fill="#fdba74"
                    opacity="0.45"
                    stroke="#ea580c"
                    strokeWidth="1.5"
                  />
                  <text x="280" y="340" fill="#9a3412" fontSize="12" fontWeight="900">
                    🌋 दख्खनचे पठार (काळी बेसाल्ट मृदा)
                  </text>

                  {/* Western Ghats (सह्याद्री) */}
                  <path
                    d="M 215 280 Q 230 360 270 450"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <text x="135" y="375" fill="#047857" fontSize="11" fontWeight="bold">
                    🌿 पश्चिम घाट (सह्याद्री)
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

                  {/* Arabian Sea, Bay of Bengal, Indian Ocean */}
                  <text x="50" y="420" fill="#0284c7" fontSize="12" fontWeight="bold">
                    🌊 अरबी समुद्र (पश्चिमेस)
                  </text>
                  <text x="470" y="330" fill="#0284c7" fontSize="12" fontWeight="bold">
                    🌊 बंगालचा उपसागर (पूर्वेस)
                  </text>
                  <text x="270" y="480" fill="#0369a1" fontSize="12" fontWeight="900">
                    🌊 हिंदी महासागर (दक्षिणेस)
                  </text>

                  {/* Andaman & Nicobar, Lakshadweep */}
                  <circle cx="560" cy="400" r="10" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                  <text x="500" y="430" fill="#0369a1" fontSize="9" fontWeight="bold">
                    🏝️ अंदमान व निकोबार (१०° खाडी)
                  </text>

                  <circle cx="160" cy="440" r="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                  <text x="105" y="465" fill="#0369a1" fontSize="9" fontWeight="bold">
                    🏝️ लक्षद्वीप (८° व ९° खाडी)
                  </text>
                </svg>
              </div>

              {/* Quick Key Facts Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-stone-100 text-[11px]">
                <div className="p-2 rounded-lg bg-orange-50 border border-orange-200">
                  <span className="text-orange-800 font-bold block">कर्कवृत्त (८ राज्ये):</span>
                  <span className="text-stone-600">गु, रा, मप्र, छ, झा, पंबं, त्रि, मि</span>
                </div>
                <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="text-blue-800 font-bold block">प्रमाणवेळ (८२° ३०' E):</span>
                  <span className="text-stone-600">मिर्झापूर (UP), MP, छग, ओडिसा, AP</span>
                </div>
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                  <span className="text-emerald-800 font-bold block">किनारपट्टी लांबी:</span>
                  <span className="text-stone-600">७,५१६.६ किमी (गुजरात सर्वाधिक)</span>
                </div>
                <div className="p-2 rounded-lg bg-amber-50 border border-amber-200">
                  <span className="text-amber-800 font-bold block">दक्षिण टोक:</span>
                  <span className="text-stone-600">इंदिरा पॉईंट (ग्रेट निकोबार ६° ४५')</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. WORLD MAP VISUALIZER */}
        {/* ========================================================================= */}
        {activeTab === 'world' && (
          <div className="space-y-2.5">
            <div className="relative bg-white rounded-xl border border-amber-200/80 p-3 shadow-inner overflow-hidden">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100 text-xs">
                <div className="font-extrabold text-stone-800 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>{isMr ? 'जगाचा राजकीय व प्राकृतिक नकाशा (७ खंड व ५ महासागर)' : 'World Map: 7 Continents & Oceans'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>{isMr ? 'मोठे करा' : 'Zoom'}</span>
                </button>
              </div>

              {/* High-Contrast SVG World Map */}
              <div className="w-full flex justify-center py-1">
                <svg
                  viewBox="0 0 700 400"
                  className="w-full max-w-xl h-auto drop-shadow-xs select-none"
                  style={{ maxHeight: '340px' }}
                >
                  {/* Background Ocean */}
                  <rect x="5" y="5" width="690" height="390" rx="14" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.5" />

                  {/* Latitude Reference Lines */}
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

                  {/* Prime Meridian 0 (Greenwich) */}
                  <line x1="330" y1="10" x2="330" y2="390" stroke="#475569" strokeWidth="1.2" strokeDasharray="4,4" />
                  <text x="335" y="25" fill="#334155" fontSize="9" fontWeight="bold">००° रेखावृत्त (GMT ग्रीनविच लंडन)</text>

                  {/* CONTINENTS BLOCKS */}
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

                  {/* India Location Highlight */}
                  <polygon points="460,160 500,160 480,210" fill="#ea580c" stroke="#c2410c" strokeWidth="1.5" />
                  <text x="470" y="180" fill="#ffffff" fontSize="9" fontWeight="bold">भारत</text>

                  {/* Australia */}
                  <path d="M 520 260 L 620 260 L 600 330 L 510 320 Z" fill="#e9d5ff" stroke="#9333ea" strokeWidth="1.5" />
                  <text x="530" y="295" fill="#6b21a8" fontSize="10" fontWeight="bold">ऑस्ट्रेलिया (द्विपकल्प)</text>

                  {/* Antarctica */}
                  <rect x="50" y="365" width="600" height="20" rx="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
                  <text x="270" y="379" fill="#475569" fontSize="9" fontWeight="bold">अंटार्क्टिका (पांढरा बर्फाच्छादित खंड - दक्षिण ध्रुव)</text>

                  {/* Oceans text */}
                  <text x="15" y="320" fill="#0284c7" fontSize="10" fontWeight="bold">पॅसिफिक महासागर</text>
                  <text x="220" y="160" fill="#0284c7" fontSize="10" fontWeight="bold">अटलांटिक महासागर</text>
                  <text x="440" y="280" fill="#0284c7" fontSize="10" fontWeight="bold">हिंदी महासागर</text>
                  <text x="615" y="200" fill="#0284c7" fontSize="10" fontWeight="bold">पॅसिफिक</text>
                </svg>
              </div>

              {/* World Facts for MPSC */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-stone-100 text-[11px]">
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                  <span className="text-emerald-800 font-bold block">विषुववृत्त जाणारा खंड:</span>
                  <span className="text-stone-600">आफ्रिका, द. अमेरिका, आशिया</span>
                </div>
                <div className="p-2 rounded-lg bg-amber-50 border border-amber-200">
                  <span className="text-amber-800 font-bold block">तीन्ही वृत्ते जाणारा खंड:</span>
                  <span className="text-stone-600">केवळ आफ्रिका खंड</span>
                </div>
                <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="text-blue-800 font-bold block">सर्वात खोल गर्ता:</span>
                  <span className="text-stone-600">मरियाना गर्ता (११,०२२ मी. - पॅसिफिक)</span>
                </div>
                <div className="p-2 rounded-lg bg-purple-50 border border-purple-200">
                  <span className="text-purple-800 font-bold block">सुएझ कालवा जोडतो:</span>
                  <span className="text-stone-600">भूमध्य समुद्र ↔ तांबडा समुद्र</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. MAHARASHTRA MAP VISUALIZER */}
        {/* ========================================================================= */}
        {activeTab === 'maharashtra' && (
          <div className="space-y-2.5">
            <div className="relative bg-white rounded-xl border border-amber-200/80 p-3 shadow-inner overflow-hidden">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100 text-xs">
                <div className="font-extrabold text-stone-800 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span>{isMr ? 'महाराष्ट्राचा प्राकृतिक व प्रशासकीय नकाशा' : 'Maharashtra Physical & Administrative Map'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>{isMr ? 'मोठे करा' : 'Zoom'}</span>
                </button>
              </div>

              {/* High-Contrast SVG Maharashtra Map */}
              <div className="w-full flex justify-center py-1">
                <svg
                  viewBox="0 0 650 400"
                  className="w-full max-w-xl h-auto drop-shadow-xs select-none"
                  style={{ maxHeight: '340px' }}
                >
                  <rect x="5" y="5" width="640" height="390" rx="14" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />

                  {/* Konkan Coast Strip */}
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

                  {/* River Godavari Basin (Biggest) */}
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

                  {/* Administrative Regions Blocks */}
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
              </div>

              {/* Maharashtra Facts Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-stone-100 text-[11px]">
                <div className="p-2 rounded-lg bg-orange-50 border border-orange-200">
                  <span className="text-orange-800 font-bold block">क्षेत्रफळ:</span>
                  <span className="text-stone-600">३,०७,७१३ चौ.किमी (भारताच्या ९.३६%)</span>
                </div>
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                  <span className="text-emerald-800 font-bold block">सर्वात मोठे खोरे:</span>
                  <span className="text-stone-600">गोदावरी (१,५२,५८८ चौ.किमी)</span>
                </div>
                <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="text-blue-800 font-bold block">सर्वोच्च शिखर:</span>
                  <span className="text-stone-600">कळसुबाई (१,६४६ मी., अहमदनगर)</span>
                </div>
                <div className="p-2 rounded-lg bg-purple-50 border border-purple-200">
                  <span className="text-purple-800 font-bold block">प्रशासकीय विभाग:</span>
                  <span className="text-stone-600">६ विभाग • ३६ जिल्हे • ३५८ तालुके</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. MEMORY TRICK & MNEMONICS TAB */}
        {/* ========================================================================= */}
        {activeTab === 'trick' && (
          <div className="bg-amber-500/10 border border-amber-300 rounded-xl p-3 sm:p-4 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-black text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{isMr ? 'स्मरण ट्रिक व शॉर्टकट्स (MPSC Smart Recall Tricks)' : 'Smart Memory Mnemonics & Quick Formula'}</span>
            </div>

            <div className="p-3 bg-white rounded-lg border border-amber-200/90 shadow-2xs">
              <pre className="font-sans text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-wrap">
                {getSubjectDefaultTrick()}
              </pre>
            </div>

            {/* Additional High-Yield MPSC Mnemonics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                <span className="font-bold text-amber-800 block mb-0.5">
                  {isMr ? '१. मुघल सम्राट क्रम:' : '1. Mughal Emperors Order:'}
                </span>
                <span className="font-mono text-stone-700 font-bold">BHAJSA</span>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  बाबर ➔ हुमायून ➔ अकबर ➔ जहांगीर ➔ शाहजहान ➔ औरंगजेब
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                <span className="font-bold text-emerald-800 block mb-0.5">
                  {isMr ? '२. सार्क (SAARC) चे ८ सदस्य देश:' : '2. SAARC 8 Member Countries:'}
                </span>
                <span className="font-mono text-stone-700 font-bold">MBBS PAIN</span>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Maldives, Bangladesh, Bhutan, Sri Lanka, Pakistan, Afghanistan, India, Nepal
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN ZOOM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
            {/* Modal Header */}
            <div className="p-3.5 sm:p-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <span className="font-extrabold text-sm sm:text-base">
                  {activeTab === 'india'
                    ? (isMr ? '🇮🇳 भारताचा सविस्तर नकाशा' : 'India Comprehensive Map')
                    : activeTab === 'world'
                    ? (isMr ? '🌍 जगाचा सविस्तर नकाशा' : 'World Comprehensive Map')
                    : (isMr ? '🚩 महाराष्ट्राचा सविस्तर नकाशा' : 'Maharashtra Comprehensive Map')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 overflow-y-auto flex-1 bg-stone-50 flex items-center justify-center">
              <div className="w-full max-w-3xl">
                {activeTab === 'india' && (
                  <div className="p-4 bg-white rounded-xl shadow-md border border-stone-200">
                    <p className="text-center font-bold text-amber-900 mb-2 text-sm">
                      🇮🇳 भारताचा प्राकृतिक व भूगोलाचा उच्च दर्जाचा स्मरण नकाशा
                    </p>
                    <svg viewBox="0 0 650 500" className="w-full h-auto">
                      <rect x="5" y="5" width="640" height="490" rx="14" fill="#fafaf9" stroke="#e7e5e4" strokeWidth="1.5" />
                      <line x1="40" y1="260" x2="610" y2="260" stroke="#f97316" strokeWidth="1.5" strokeDasharray="5,4" />
                      <text x="50" y="254" fill="#ea580c" fontSize="11" fontWeight="bold">कर्कवृत्त २३° ३०' उत्तर (८ राज्ये: गुजरात, राजस्थान, MP, छग, झारखंड, WB, त्रिपुरा, मिझोराम)</text>
                      <line x1="390" y1="30" x2="390" y2="470" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="5,4" />
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
                      <text x="445" y="380" fill="#065f46" fontSize="12" fontWeight="bold">🌱 पूर्व घाट (तुटक पर्वत - अरमाकोंडा १६८० मी.)</text>
                      <text x="50" y="420" fill="#0284c7" fontSize="13" fontWeight="bold">🌊 अरबी समुद्र</text>
                      <text x="470" y="330" fill="#0284c7" fontSize="13" fontWeight="bold">🌊 बंगालचा उपसागर</text>
                      <text x="270" y="480" fill="#0369a1" fontSize="13" fontWeight="900">🌊 हिंदी महासागर</text>
                    </svg>
                  </div>
                )}

                {activeTab === 'world' && (
                  <div className="p-4 bg-white rounded-xl shadow-md border border-stone-200">
                    <p className="text-center font-bold text-blue-900 mb-2 text-sm">
                      🌍 जगाचा राजकीय व प्राकृतिक स्मरण नकाशा
                    </p>
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
                  </div>
                )}

                {activeTab === 'maharashtra' && (
                  <div className="p-4 bg-white rounded-xl shadow-md border border-stone-200">
                    <p className="text-center font-bold text-orange-900 mb-2 text-sm">
                      🚩 महाराष्ट्राचा प्राकृतिक व प्रशासकीय स्मरण नकाशा
                    </p>
                    <svg viewBox="0 0 650 400" className="w-full h-auto">
                      <rect x="5" y="5" width="640" height="390" rx="14" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
                      <path d="M 50 80 Q 70 200 80 340 L 115 340 Q 105 200 85 80 Z" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.5" />
                      <path d="M 85 70 Q 110 200 120 350" fill="none" stroke="#047857" strokeWidth="11" strokeLinecap="round" />
                      <text x="125" y="120" fill="#065f46" fontSize="11" fontWeight="bold">⛰️ कळसुबाई (१६४६ मी.)</text>
                      <line x1="160" y1="50" x2="380" y2="40" stroke="#b45309" strokeWidth="8" strokeLinecap="round" />
                      <text x="210" y="32" fill="#78350f" fontSize="11" fontWeight="900">🏔️ सातपुडा पर्वतरांग (तोरणमाळ)</text>
                      <path d="M 120 140 Q 300 160 550 250" fill="none" stroke="#2563eb" strokeWidth="4.5" />
                      <text x="270" y="145" fill="#1e3a8a" fontSize="12" fontWeight="900">🌊 गोदावरी नदी खोरे (४९.५% क्षेत्रफळ)</text>
                      <path d="M 130 220 Q 300 240 450 310" fill="none" stroke="#3b82f6" strokeWidth="3.5" />
                      <text x="240" y="225" fill="#1d4ed8" fontSize="11" fontWeight="bold">🌊 भीमा नदी खोरे</text>
                      <path d="M 130 290 Q 250 310 380 340" fill="none" stroke="#0284c7" strokeWidth="3" />
                      <text x="180" y="305" fill="#0369a1" fontSize="10" fontWeight="bold">🌊 कृष्णा नदी खोरे</text>
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
              <span>💡 टीप: परीक्षेत अचूक उत्तरासाठी हा नकाशा व की-फॅक्ट्स लक्षात ठेवा.</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold cursor-pointer transition-colors"
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
