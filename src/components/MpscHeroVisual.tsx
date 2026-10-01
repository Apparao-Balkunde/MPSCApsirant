import React from 'react';
import { Shield, Star, BookOpen, Scale, Landmark, Sparkles, Compass } from 'lucide-react';

interface MpscHeroVisualProps {
  language: 'mr' | 'en';
}

export const MpscHeroVisual: React.FC<MpscHeroVisualProps> = ({ language }) => {
  const isMr = language === 'mr';

  return (
    <div className="relative w-full max-w-[480px] lg:max-w-[440px] xl:max-w-[500px] mx-auto select-none">
      {/* Ambient background glow layers */}
      <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-500/25 via-orange-600/15 to-amber-300/30 rounded-3xl blur-xl opacity-75 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

      {/* Main Glassmorphic Showcase Card */}
      <div className="relative rounded-2xl bg-gradient-to-b from-stone-900/95 via-stone-900/90 to-stone-950/95 border border-amber-500/30 shadow-2xl p-4 sm:p-5 backdrop-blur-md overflow-hidden text-stone-100">
        
        {/* Subtle Tricolor Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-white to-emerald-600 opacity-90" />

        {/* Top Header Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[11px] font-extrabold tracking-wide uppercase shadow-sm">
            <Landmark className="w-3.5 h-3.5 text-amber-400" />
            <span>{isMr ? 'महाराष्ट्र लोकसेवा आयोग' : 'Maharashtra Public Service'}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400/90 bg-stone-850/80 px-2 py-0.5 rounded-md border border-stone-800">
            <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{isMr ? 'मिशन २०२५-२६' : 'Mission 2025-26'}</span>
          </div>
        </div>

        {/* Central Photographic Image Box with Mantralaya & Emblem */}
        <div className="relative w-full h-52 sm:h-56 my-1 rounded-xl border border-amber-500/30 overflow-hidden flex items-center justify-center shadow-lg group">
          {/* Authentic Photograph of Mantralaya, Mumbai as Background */}
          <img
            src="/mantralaya.jpg"
            alt={isMr ? "मंत्रालय, मुंबई - महाराष्ट्र शासन प्रशासकीय मुख्यालय" : "Mantralaya, Mumbai - Government of Maharashtra"}
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.1] transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
            loading="eager"
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-stone-950/70 pointer-events-none" />
          <div className="absolute inset-0 bg-radial from-transparent via-stone-950/40 to-stone-950 pointer-events-none" />

          {/* Centerpiece: Official State Emblem of India (Ashoka Stambha) Medallion */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-[2.5px] shadow-xl shadow-amber-500/40">
              <div className="w-full h-full rounded-full bg-stone-950/90 backdrop-blur-md flex flex-col items-center justify-center p-2 border border-amber-400/60 overflow-hidden">
                <img
                  src="/emblem_of_india.svg"
                  alt="State Emblem of India"
                  className="w-14 h-14 object-contain filter drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Decorative Stars */}
              <Star className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 text-amber-300 fill-amber-300 drop-shadow-md" />
              <Sparkles className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 text-amber-400 fill-amber-400 drop-shadow-md" />
            </div>

            {/* Inscription ribbon */}
            <div className="mt-2 px-3 py-0.5 rounded-full bg-stone-900/90 border border-amber-500/40 text-amber-300 text-[10px] font-extrabold tracking-wider shadow-md backdrop-blur-sm">
              {isMr ? 'सत्य • निष्ठा • लोकसेवा' : 'Truth • Integrity • Service'}
            </div>
            <p className="text-[10px] text-stone-300 font-bold mt-1 drop-shadow-md">
              {isMr ? 'मंत्रालय, मुंबई • महाराष्ट्र शासन' : 'Mantralaya, Mumbai'}
            </p>
          </div>

          {/* Left Floating Badge: Constitution of India */}
          <div className="absolute top-2.5 left-2.5 px-2.5 py-1.5 rounded-lg bg-stone-900/90 border border-amber-500/40 text-stone-200 text-[10px] font-bold flex items-center gap-1.5 shadow-md backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <div className="leading-tight">
              <p className="text-[8px] text-amber-400 uppercase font-black">संविधान व कायदा</p>
              <p className="text-[10px] text-stone-200 font-extrabold">GS & CSAT</p>
            </div>
          </div>

          {/* Right Floating Badge: Class 1 Officer Target */}
          <div className="absolute top-2.5 right-2.5 px-2.5 py-1.5 rounded-lg bg-stone-900/90 border border-amber-500/40 text-stone-200 text-[10px] font-bold flex items-center gap-1.5 shadow-md backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <div className="leading-tight text-right">
              <p className="text-[8px] text-emerald-400 uppercase font-black">राजपत्रित वर्ग-१</p>
              <p className="text-[10px] text-stone-200 font-extrabold">उपजिल्हाधिकारी / DYSP</p>
            </div>
          </div>
        </div>

        {/* Two Grand Inspiration Photo Medallions */}
        <div className="grid grid-cols-2 gap-2 my-2">
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-stone-850/90 border border-stone-800">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-amber-400/80 shrink-0 bg-stone-900 shadow-sm">
              <img
                src="/chhatrapati_shivaji_maharaj.jpg"
                alt="Chhatrapati Shivaji Maharaj"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black text-amber-300 truncate">
                {isMr ? 'छत्रपती शिवाजी महाराज' : 'Shivaji Maharaj'}
              </p>
              <p className="text-[9px] text-stone-400 truncate">
                {isMr ? 'स्वराज्य प्रेरणा' : 'Sovereign Pride'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-stone-850/90 border border-stone-800">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-amber-400/80 shrink-0 bg-stone-900 shadow-sm">
              <img
                src="/dr_babasaheb_ambedkar.jpg"
                alt="Dr. B.R. Ambedkar"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black text-amber-300 truncate">
                {isMr ? 'डॉ. बाबासाहेब आंबेडकर' : 'Dr. Ambedkar'}
              </p>
              <p className="text-[9px] text-stone-400 truncate">
                {isMr ? 'संविधान शिल्पकार' : 'Constitution Maker'}
              </p>
            </div>
          </div>
        </div>

        {/* Motivational Rajmudra Inscription Quote */}
        <div className="mt-3 pt-2.5 border-t border-stone-800 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
            <Compass className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="truncate">
              {isMr ? 'प्रतिपच्चंद्रलेखेव वर्धिष्णुर्विश्ववंदिता...' : 'Motto of Maharashtra State'}
            </span>
          </div>

          <p className="text-[11px] text-stone-400 leading-relaxed">
            {isMr 
              ? 'प्रशासकीय सेवेतील सर्वोच्च यशासाठी दररोज कसून वस्तुनिष्ठ सराव, मागील वर्षांचे प्रश्न (PYQs) आणि अचूक उजळणी!' 
              : 'Daily high-yield MCQ practice, real negative marking simulator, and syllabus-aligned preparation for Maharashtra Civil Services.'}
          </p>

          {/* Target Cadre Chips */}
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <span className="text-[9px] px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 font-semibold border border-stone-700">
              {isMr ? 'उपजिल्हाधिकारी' : 'Deputy Collector'}
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 font-semibold border border-stone-700">
              {isMr ? 'पोलीस उपअधीक्षक (DYSP)' : 'DYSP (Police)'}
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 font-semibold border border-stone-700">
              {isMr ? 'तहसीलदार' : 'Tehsildar'}
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 font-bold border border-amber-500/30">
              {isMr ? 'PSI / STI / ASO' : 'PSI / STI / ASO'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
