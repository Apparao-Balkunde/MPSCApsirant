import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  MapPin, 
  Compass, 
  BookOpen, 
  Check, 
  Copy, 
  Sparkles, 
  Flame, 
  Trees, 
  Award, 
  Building2, 
  Shield, 
  ChevronRight, 
  ExternalLink,
  Layers,
  Info
} from 'lucide-react';
import { 
  MAHARASHTRA_DISTRICTS_DATA, 
  MAHARASHTRA_DIVISIONS, 
  MaharashtraDistrict, 
  AdministrativeDivisionId 
} from '../data/maharashtraDistrictsData';
import { AdBanner } from './AdBanner';

interface MaharashtraDistrictsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'mr' | 'en';
  onStartDistrictPractice?: (districtName: string) => void;
  onOpenAdSenseManager?: () => void;
}

export const MaharashtraDistrictsModal: React.FC<MaharashtraDistrictsModalProps> = ({
  isOpen,
  onClose,
  language,
  onStartDistrictPractice,
  onOpenAdSenseManager,
}) => {
  const isMr = language === 'mr';
  const [selectedDivision, setSelectedDivision] = useState<AdministrativeDivisionId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<MaharashtraDistrict | null>(null);
  const [copiedDistrictId, setCopiedDistrictId] = useState<string | null>(null);

  // Filter districts based on division and search
  const filteredDistricts = useMemo(() => {
    return MAHARASHTRA_DISTRICTS_DATA.filter((dist) => {
      // Division match
      if (selectedDivision !== 'all' && dist.divisionId !== selectedDivision) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inNameMr = dist.nameMr.toLowerCase().includes(q);
        const inNameEn = dist.nameEn.toLowerCase().includes(q);
        const inHq = dist.hqMr.toLowerCase().includes(q) || dist.hqEn.toLowerCase().includes(q);
        const inRto = dist.rtoCode.toLowerCase().includes(q);
        const inTalukas = dist.prominentTalukasMr.some(t => t.toLowerCase().includes(q));
        const inRivers = dist.majorRiversMr.some(r => r.toLowerCase().includes(q));
        const inForts = dist.historicalFortsMr.some(f => f.toLowerCase().includes(q));
        const inCrops = dist.majorCropsMr.some(c => c.toLowerCase().includes(q));
        const inFacts = dist.mpscGoldenFactsMr.some(f => f.toLowerCase().includes(q));

        return inNameMr || inNameEn || inHq || inRto || inTalukas || inRivers || inForts || inCrops || inFacts;
      }

      return true;
    });
  }, [selectedDivision, searchQuery]);

  if (!isOpen) return null;

  const handleCopyFacts = (district: MaharashtraDistrict) => {
    const text = `🗺️ ${district.nameMr} जिल्हा विशेष (MPSC फॅक्ट्स):\n` +
      `• विभाग: ${district.divisionNameMr} (मुख्यालय: ${district.hqMr})\n` +
      `• क्षेत्रफळ: ${district.areaSqKm.toLocaleString('en-IN')} चौ.किमी | तालुके: ${district.talukasCount} (RTO: ${district.rtoCode})\n` +
      `• प्रमुख नद्या: ${district.majorRiversMr.join(', ')}\n` +
      `• किल्ले: ${district.historicalFortsMr.join(', ')}\n` +
      `• पिके: ${district.majorCropsMr.join(', ')}\n` +
      `• अभयारण्ये: ${district.sanctuariesAndParksMr.join(', ')}\n` +
      `⭐ MPSC परीक्षेचे मुद्दे:\n${district.mpscGoldenFactsMr.map(f => ` - ${f}`).join('\n')}\n` +
      `\n🔗 सराव करा: MPSC Aspirant Prep App`;

    navigator.clipboard.writeText(text);
    setCopiedDistrictId(district.id);
    setTimeout(() => setCopiedDistrictId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-6xl max-h-[94vh] flex flex-col overflow-hidden text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-stone-200 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-md">
              <Compass className="w-6 h-6 text-amber-100" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-xl font-black tracking-tight">
                  {isMr ? 'महाराष्ट्राचे ३६ जिल्हे - जिल्हा विशेष फॅक्ट्स व रिव्हिजन हब' : 'Maharashtra 36 Districts GK & Factfile Hub'}
                </h3>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-white/25 text-white border border-white/40">
                  {isMr ? 'सर्व ३६ जिल्हे • ६ विभाग' : 'All 36 Districts • 6 Divisions'}
                </span>
              </div>
              <p className="text-xs text-amber-100/90 mt-0.5">
                {isMr 
                  ? 'कम्बाईन पूर्व व राज्यसेवेसाठी नद्या, किल्ले, तालुके, पिके, अभयारण्ये व आयोगाचे हाय-यील्ड मुद्दे' 
                  : 'Fast revision of geography, rivers, forts, sanctuaries, talukas & MPSC repeated facts'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MPSC High-Yield State Quick Facts Strip */}
        <div className="bg-amber-50/70 border-b border-amber-200/60 px-4 sm:px-6 py-2.5 flex items-center gap-3 overflow-x-auto text-[11px] sm:text-xs text-stone-700 shrink-0 font-medium whitespace-nowrap">
          <span className="font-bold text-amber-900 flex items-center gap-1 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>MPSC फॅक्ट्स:</span>
          </span>
          <span className="bg-white px-2 py-0.5 rounded-md border border-amber-200">
            मोठा जिल्हा: <strong>अहिल्यानगर</strong> (१७,०४८ चौ.किमी)
          </span>
          <span className="bg-white px-2 py-0.5 rounded-md border border-amber-200">
            लहान जिल्हा: <strong>मुंबई शहर</strong> (१५७ चौ.किमी)
          </span>
          <span className="bg-white px-2 py-0.5 rounded-md border border-amber-200">
            सर्वाधिक तालुके: <strong>यवतमाळ व नांदेड</strong> (१६ तालुके)
          </span>
          <span className="bg-white px-2 py-0.5 rounded-md border border-amber-200">
            सर्वाधिक वने: <strong>गडचिरोली</strong> (६८.८%)
          </span>
          <span className="bg-white px-2 py-0.5 rounded-md border border-amber-200">
            ३६ वा जिल्हा: <strong>पालघर</strong> (१ ऑगस्ट २०१४)
          </span>
        </div>

        {/* Division Filter Tabs & Search Bar */}
        <div className="p-3 sm:p-4 border-b border-stone-200 bg-stone-50 space-y-3 shrink-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isMr ? "जिल्हा, नदी, किल्ला, पीक, किंवा अभयारण्याचे नाव शोधा... (उदा. गोदावरी, ताडोबा, हळद, सिंहगड)" : "Search district, river, fort, crop, sanctuary..."}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Results Counter */}
            <div className="shrink-0 text-xs font-bold text-stone-600 px-3 py-2 bg-white rounded-xl border border-stone-200 flex items-center justify-between sm:justify-start gap-2 shadow-2xs">
              <span>{isMr ? 'एकूण जिल्हे:' : 'Districts:'}</span>
              <span className="text-amber-700 font-extrabold font-mono text-sm">{filteredDistricts.length}</span>
              <span className="text-stone-400">/ ३६</span>
            </div>
          </div>

          {/* Division Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedDivision('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                selectedDivision === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <span>सर्व ३६ जिल्हे (All 36)</span>
            </button>

            {MAHARASHTRA_DIVISIONS.map((div) => {
              const isSelected = selectedDivision === div.id;
              return (
                <button
                  key={div.id}
                  type="button"
                  onClick={() => setSelectedDivision(div.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                    isSelected
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <span>{div.nameMr}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-amber-800 text-amber-100' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {div.districtsCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-5">
          {/* Subtle Google AdSense Unit at Top of Content */}
          <AdBanner 
            placementType="header" 
            format="horizontal" 
            onOpenSettings={onOpenAdSenseManager} 
          />

          {filteredDistricts.length === 0 ? (
            <div className="text-center py-12 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
              <Compass className="w-10 h-10 text-stone-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-stone-800">
                {isMr ? 'कोणताही जिल्हा सापडला नाही!' : 'No districts found matching query!'}
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                {isMr ? 'कृपया वेगळा शब्द टाकून पुन्हा शोधा किंवा वरील फिल्टर बदला.' : 'Try a different search keyword or division filter.'}
              </p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedDivision('all'); }}
                className="mt-3 px-4 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-bold cursor-pointer"
              >
                {isMr ? 'फिल्टर्स क्लिअर करा' : 'Clear Filters'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredDistricts.map((district) => {
                const isSelected = selectedDistrict?.id === district.id;

                return (
                  <div
                    key={district.id}
                    className={`rounded-2xl border transition-all duration-200 bg-white shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden ${
                      isSelected ? 'border-amber-500 ring-2 ring-amber-400/40' : 'border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    {/* District Card Header */}
                    <div className="p-4 bg-gradient-to-b from-stone-50/80 to-white border-b border-stone-100">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base sm:text-lg font-black text-stone-900 tracking-tight">
                              {district.nameMr}
                            </h4>
                            <span className="text-[11px] font-mono text-stone-500">
                              ({district.nameEn})
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                              {district.divisionNameMr}
                            </span>
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                              {district.rtoCode}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-mono font-bold text-stone-700 block">
                            {district.talukasCount} तालुके
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono">
                            {district.areaSqKm.toLocaleString('en-IN')} चौ.किमी
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* District Key Details Body */}
                    <div className="p-4 space-y-3 text-xs flex-1">
                      {/* Rivers */}
                      {district.majorRiversMr.length > 0 && (
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 block mb-0.5">
                            🌊 प्रमुख नद्या:
                          </span>
                          <p className="text-stone-800 font-semibold line-clamp-2">
                            {district.majorRiversMr.join(', ')}
                          </p>
                        </div>
                      )}

                      {/* Forts */}
                      {district.historicalFortsMr.length > 0 && (
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 block mb-0.5">
                            🏰 किल्ले व ऐतिहासिक स्थळे:
                          </span>
                          <p className="text-stone-800 font-medium line-clamp-2">
                            {district.historicalFortsMr.join(', ')}
                          </p>
                        </div>
                      )}

                      {/* Crops */}
                      {district.majorCropsMr.length > 0 && (
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 block mb-0.5">
                            🌾 प्रमुख पिके व शेती:
                          </span>
                          <p className="text-stone-800 font-medium line-clamp-1">
                            {district.majorCropsMr.join(', ')}
                          </p>
                        </div>
                      )}

                      {/* Sanctuaries */}
                      {district.sanctuariesAndParksMr.length > 0 && (
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 block mb-0.5">
                            🌲 राष्ट्रीय उद्याने व अभयारण्ये:
                          </span>
                          <p className="text-emerald-800 font-medium line-clamp-1">
                            {district.sanctuariesAndParksMr.join(', ')}
                          </p>
                        </div>
                      )}

                      {/* MPSC Golden Exam Facts Box */}
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-300/60 space-y-1 mt-2">
                        <span className="text-[10px] font-black text-amber-950 uppercase tracking-wider flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-600 fill-amber-600" />
                          <span>MPSC आयोगाचे वारंवार विचारलेले मुद्दे:</span>
                        </span>
                        <ul className="list-disc pl-4 space-y-1 text-[11px] text-stone-800">
                          {district.mpscGoldenFactsMr.map((fact, idx) => (
                            <li key={idx} className="leading-snug">
                              {fact}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyFacts(district)}
                        className="px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 text-[11px] font-bold text-stone-700 flex items-center gap-1 transition-colors cursor-pointer"
                        title={isMr ? "या जिल्ह्याची माहिती कॉपी करा" : "Copy District Facts"}
                      >
                        {copiedDistrictId === district.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700">{isMr ? 'कॉपी झाले!' : 'Copied!'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-stone-500" />
                            <span>{isMr ? 'शेअर/कॉपी' : 'Share'}</span>
                          </>
                        )}
                      </button>

                      {onStartDistrictPractice && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onStartDistrictPractice(district.nameMr);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold flex items-center gap-1 shadow-2xs transition-all cursor-pointer active:scale-95"
                          title={isMr ? "महाराष्ट्राच्या भूगोलाचे प्रश्न सोडवा" : "Solve MPSC Geography Practice"}
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>{isMr ? 'भूगोल सराव ➔' : 'Practice ➔'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between shrink-0 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{isMr ? 'आयोगाच्या अभ्यासक्रमानुसार अद्ययावत (२०२५-२०२६)' : 'Updated for MPSC Combine & Rajyaseva 2025-2026'}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold cursor-pointer transition-colors"
          >
            {isMr ? 'बंद करा (Close)' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
