import React, { useState } from 'react';
import { Landmark, BookOpen, Award, Compass, Eye, Sparkles, Shield, Library, CheckCircle2, Crown, Flag } from 'lucide-react';

interface AspirantInspirationCardProps {
  language: 'mr' | 'en';
}

export const AspirantInspirationCard: React.FC<AspirantInspirationCardProps> = ({ language }) => {
  const isMr = language === 'mr';
  const [selectedPhoto, setSelectedPhoto] = useState<number>(0);

  const photos = [
    {
      id: 'shivaji_maharaj',
      title: isMr ? 'छत्रपती शिवाजी महाराज' : 'Chhatrapati Shivaji Maharaj',
      subtitle: isMr ? 'प्रशासकीय नीती व लोककल्याणकारी स्वराज्य' : 'Pinnacle of Good Governance & Public Welfare',
      description: isMr 
        ? 'अष्टप्रधान मंडळ, कार्यक्षम महसूल व्यवस्था, दुर्ग व्यवस्थापन आणि निष्कलंक प्रशासनाचे शाश्वत प्रेरणास्थान.' 
        : 'The foundational inspiration of Maharashtra administration, ethical governance, and public welfare.',
      src: '/chhatrapati_shivaji_maharaj.jpg',
      badge: isMr ? '👑 स्वराज्य प्रेरणा' : '👑 Sovereign Pride',
      tag: isMr ? 'आदर्श राज्यकारभार व नीती' : 'Ethical Governance',
    },
    {
      id: 'ambedkar',
      title: isMr ? 'भारतरत्न डॉ. बाबासाहेब आंबेडकर' : 'Dr. B.R. Ambedkar',
      subtitle: isMr ? 'भारतीय संविधानाचे शिल्पकार • प्रज्ञासूर्य' : 'Architect of the Indian Constitution',
      description: isMr 
        ? 'देशाची लोकशाही, मूलभूत हक्क आणि कायद्याच्या राज्याची पायाभरणी करणारे मार्गदर्शक विचार.' 
        : 'The architect of Modern Democratic India, fundamental rights, and constitutional morality.',
      src: '/dr_babasaheb_ambedkar.jpg',
      badge: isMr ? '📖 संविधान शिल्पकार' : '📖 Constitution Maker',
      tag: isMr ? 'समानता, न्याय व बंधुता' : 'Justice & Democracy',
    },
    {
      id: 'raigad',
      title: isMr ? 'किल्ले रायगड (नगारखाना)' : 'Raigad Fort (Nagarkhana)',
      subtitle: isMr ? 'स्वराज्याची राजधानी • ऐतिहासिक वारसा' : 'Capital of Swarajya • Historic Heritage',
      description: isMr 
        ? 'छत्रपती शिवाजी महाराजांचा राज्याभिषेक सोहळा आणि महाराष्ट्राच्या असीम स्वाभिमानाचे पवित्र प्रतीक.' 
        : 'The capital fortress of Swarajya where Chhatrapati Shivaji Maharaj was crowned in 1674.',
      src: '/raigad_fort.jpg',
      badge: isMr ? '🚩 स्वराज्याची राजधानी' : '🚩 Capital Fort',
      tag: isMr ? 'महाराष्ट्र इतिहास व वारसा' : 'Maharashtra Heritage',
    },
    {
      id: 'open_book',
      title: isMr ? 'MPSC संदर्भ ग्रंथ व स्वाध्याय' : 'Reference Books & Study Desk',
      subtitle: isMr ? 'उघडलेले संदर्भ पुस्तक • वस्तुनिष्ठ सराव' : 'Open Reference Book • Objective Practice',
      description: isMr 
        ? 'राज्यव्यवस्था, इतिहास, भूगोल आणि व्याकरण विषयांचे मानक संदर्भ ग्रंथ, नोट्स आणि मागील वर्षांच्या प्रश्नांचे (PYQs) विश्लेषण.' 
        : 'Open standard reference volumes, handwritten notes, and comprehensive PYQ analysis for MPSC aspirants.',
      src: '/open_reference_book.jpg',
      badge: isMr ? '📚 संदर्भ ग्रंथ' : '📚 Reference Book',
      tag: isMr ? 'MPSC सर्व विषय सराव' : 'All Subjects Practice',
    },
    {
      id: 'mantralaya',
      title: isMr ? 'मंत्रालय, मुंबई' : 'Mantralaya, Mumbai',
      subtitle: isMr ? 'महाराष्ट्र शासनाचे प्रशासकीय मुख्यालय' : 'Administrative Headquarters of Govt of Maharashtra',
      description: isMr 
        ? 'राजपत्रित वर्ग-१ व वर्ग-२ अधिकाऱ्यांच्या प्रशासकीय धोरणांचे आणि लोकसेवेचे सर्वोच्च केंद्रस्थान.' 
        : 'The executive nerve center where Maharashtra Civil Service officers implement public policies.',
      src: '/mantralaya.jpg',
      badge: isMr ? '🏛️ सचिवालय' : '🏛️ Secretariat',
      tag: isMr ? 'ध्येय: उपजिल्हाधिकारी / DYSP' : 'Target: Deputy Collector / DYSP',
    },
    {
      id: 'constitution',
      title: isMr ? 'भारतीय संविधान' : 'The Constitution of India',
      subtitle: isMr ? 'मूळ ऐतिहासिक प्रत • सुवर्ण कॅलिग्राफी' : 'Original Historical Edition • Gold Calligraphy',
      description: isMr 
        ? 'MPSC सामान्य अध्ययन-२ (राज्यव्यवस्था व कायदे) चा मूळ गाभा आणि देशाचा सर्वोच्च कायदा.' 
        : 'The supreme law of India and core foundation of MPSC GS-2 (Polity, Governance, & Laws).',
      src: '/constitution_of_india.jpg',
      badge: isMr ? '📜 सर्वोच्च कायदा' : '📜 Supreme Law',
      tag: isMr ? 'कलमे, अनुसूची व कायदे' : 'Articles, Schedules & Rights',
    },
    {
      id: 'library',
      title: isMr ? 'अभ्यासिका व ग्रंथालय' : 'Aspirant Study Library',
      subtitle: isMr ? 'पुस्तकांचे दालन • अखंड सातत्य' : 'Library Book Stacks • Relentless Practice',
      description: isMr 
        ? 'हजारो पुस्तकांनी समृद्ध अभ्यासिका — जिथे स्पर्धा परीक्षेच्या यशाची मजबूत पायाभरणी होते.' 
        : 'Immense library collections empowering aspirants to build deep conceptual mastery.',
      src: '/library_books.jpg',
      badge: isMr ? '🏛️ ग्रंथालय' : '🏛️ Library',
      tag: isMr ? 'सातत्यपूर्ण वाचन' : 'Dedicated Reading',
    },
    {
      id: 'gateway',
      title: isMr ? 'गेटवे ऑफ इंडिया' : 'Gateway of India, Mumbai',
      subtitle: isMr ? 'महाराष्ट्राचा ऐतिहासिक मानबिंदू' : 'Historic Pride of Maharashtra',
      description: isMr 
        ? 'महाराष्ट्राच्या समृद्ध वारसा, इतिहास आणि स्पर्धा परीक्षेतील उच्च ध्येयाचे शाश्वत प्रतीक.' 
        : 'Timeless emblem of Maharashtra’s rich heritage, history, and administrative aspiration.',
      src: '/gateway_of_india.jpg',
      badge: isMr ? '🚩 मानबिंदू' : '🚩 Pride',
      tag: isMr ? 'राज्यसेवा व संयुक्त परीक्षा' : 'Rajyaseva & Combine Exams',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 rounded-2xl border border-amber-500/35 p-5 sm:p-6 shadow-xl text-stone-100 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
            <Landmark className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black text-white">
                {isMr ? 'एमपीएससी प्रेरणा व ऐतिहासिक व्हिज्युअल दालन' : 'MPSC Heritage & Inspiration Visual Gallery'}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/30">
                {isMr ? '८ ऐतिहासिक छायाचित्रे' : '8 Heritage Photos'}
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              {isMr 
                ? 'छत्रपती शिवाजी महाराज, डॉ. बाबासाहेब आंबेडकर, किल्ले रायगड, संविधान व मंत्रालय — प्रशासकीय ध्येयाची प्रेरणा.' 
                : 'Chhatrapati Shivaji Maharaj, Dr. B.R. Ambedkar, Raigad Fort, Constitution, and Mantralaya.'}
            </p>
          </div>
        </div>

        {/* Selected badge */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-amber-300 text-xs font-bold border border-stone-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{photos[selectedPhoto].badge}</span>
        </div>
      </div>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Large Featured Photo View */}
        <div className="lg:col-span-8 relative rounded-xl overflow-hidden border border-amber-500/30 bg-stone-950 shadow-lg group aspect-[16/10] sm:aspect-[16/9]">
          <img
            src={photos[selectedPhoto].src}
            alt={photos[selectedPhoto].title}
            className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-95 transition-all duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
            loading="lazy"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/20 to-transparent pointer-events-none" />

          {/* Bottom Floating Info Pill */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl bg-stone-950/90 backdrop-blur-md border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500 text-stone-950 font-black uppercase">
                  {photos[selectedPhoto].badge}
                </span>
                <span className="text-xs text-amber-300 font-bold">
                  {photos[selectedPhoto].tag}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-white mt-1">
                {photos[selectedPhoto].title}
              </h4>
              <p className="text-[11px] text-stone-300 leading-relaxed mt-0.5 line-clamp-2">
                {photos[selectedPhoto].description}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-1.5 text-stone-400 text-[11px] font-semibold">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMr ? 'मूळ छायाचित्र' : 'Original Photo'}</span>
            </div>
          </div>
        </div>

        {/* Right Photo Selector Cards (Scrollable list of 8 items) */}
        <div className="lg:col-span-4 flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-1.5 custom-scrollbar">
          {photos.map((item, idx) => {
            const isSelected = selectedPhoto === idx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedPhoto(idx)}
                className={`w-full p-2 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 shadow-md ring-1 ring-amber-400/40'
                    : 'bg-stone-850/70 border-stone-800 hover:bg-stone-800/80 hover:border-stone-700'
                }`}
              >
                {/* Thumbnail */}
                <div className="w-14 h-12 sm:w-16 sm:h-14 rounded-lg overflow-hidden border border-stone-700 shrink-0 relative bg-stone-900">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-amber-500/20 border-2 border-amber-400 rounded-lg pointer-events-none" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400 uppercase truncate">
                      {item.badge}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                    )}
                  </div>
                  <h5 className="text-xs sm:text-sm font-black text-white truncate mt-0.5">
                    {item.title}
                  </h5>
                  <p className="text-[10px] text-stone-400 truncate mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
