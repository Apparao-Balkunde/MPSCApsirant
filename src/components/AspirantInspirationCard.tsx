import React, { useState } from 'react';
import { Landmark, BookOpen, Award, Compass, Eye, Sparkles, Shield, Library, CheckCircle2 } from 'lucide-react';

interface AspirantInspirationCardProps {
  language: 'mr' | 'en';
}

export const AspirantInspirationCard: React.FC<AspirantInspirationCardProps> = ({ language }) => {
  const isMr = language === 'mr';
  const [selectedPhoto, setSelectedPhoto] = useState<number>(0);

  const photos = [
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
      id: 'constitution',
      title: isMr ? 'भारतीय संविधान' : 'The Constitution of India',
      subtitle: isMr ? 'मूळ ऐतिहासिक प्रत • सुवर्ण कॅलिग्राफी' : 'Original Historical Edition • Gold Calligraphy',
      description: isMr 
        ? 'MPSC सामान्य अध्ययन-२ (राज्यव्यवस्था व कायदे) चा मूळ गाभा आणि देशाचा सर्वोच्च कायदा.' 
        : 'The supreme law of India and core foundation of MPSC GS-2 (Polity, Governance, & Laws).',
      src: '/constitution_of_india.jpg',
      badge: isMr ? '📖 संविधान' : '📖 Constitution',
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
    <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 rounded-2xl border border-amber-500/30 p-5 sm:p-6 shadow-xl text-stone-100 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
            <BookOpen className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black text-white">
                {isMr ? 'एमपीएससी संदर्भ ग्रंथ व व्हिज्युअल दालन' : 'MPSC Reference Books & Visual Gallery'}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/30">
                {isMr ? '📚 पुस्तके व ऐतिहासिक छायाचित्रे' : '📚 Books & Heritage Photos'}
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              {isMr 
                ? 'उघडलेली संदर्भ पुस्तके, भारतीय संविधान, ग्रंथालय आणि मंत्रालय — तुमच्या ध्येयाचा प्रेरणास्रोत.' 
                : 'Open reference books, the Constitution, library stacks, and Mantralaya powering your civil services journey.'}
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
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl bg-stone-950/85 backdrop-blur-md border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xl">
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

        {/* Right Photo Selector Cards */}
        <div className="lg:col-span-4 flex flex-col gap-2 sm:gap-2.5 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
          {photos.map((item, idx) => {
            const isSelected = selectedPhoto === idx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedPhoto(idx)}
                className={`w-full p-2 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500/60 shadow-md ring-1 ring-amber-500/30'
                    : 'bg-stone-850/70 border-stone-800 hover:bg-stone-800/80 hover:border-stone-700'
                }`}
              >
                {/* Thumbnail */}
                <div className="w-14 h-12 sm:w-16 sm:h-14 rounded-lg overflow-hidden border border-stone-700 shrink-0 relative">
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

          {/* Motivational Footer Ribbon */}
          <div className="p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-stone-300 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
              <Compass className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>{isMr ? 'प्रशासकीय ब्रीदवाक्य' : 'Administrative Motto'}</span>
            </div>
            <p className="text-[10px] text-stone-400 italic">
              {isMr 
                ? '"प्रतिपच्चंद्रलेखेव वर्धिष्णुर्विश्ववंदिता..."' 
                : 'Duty, Integrity & Public Service for Maharashtra State.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
