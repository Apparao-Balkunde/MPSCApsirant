import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  BookOpen, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  Play, 
  ExternalLink,
  ChevronRight,
  Info,
  Scale,
  Award,
  Layers,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { 
  MPSC_INFORMATION_DATA, 
  INFORMATION_CATEGORIES, 
  InformationTopic 
} from '../data/mpscInformationData';
import { SubjectId } from '../types';

interface InformationHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'mr' | 'en';
  onStartPractice?: (subjectId?: SubjectId, customTitle?: string) => void;
}

export const InformationHubModal: React.FC<InformationHubModalProps> = ({
  isOpen,
  onClose,
  language,
  onStartPractice,
}) => {
  const isMr = language === 'mr';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTopics = useMemo(() => {
    return MPSC_INFORMATION_DATA.filter((topic) => {
      // Category filter
      if (selectedCategory !== 'all' && topic.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        topic.titleMr.toLowerCase().includes(q) ||
        topic.titleEn.toLowerCase().includes(q) ||
        topic.subtitleMr.toLowerCase().includes(q) ||
        topic.subtitleEn.toLowerCase().includes(q) ||
        topic.summaryMr.toLowerCase().includes(q) ||
        topic.summaryEn.toLowerCase().includes(q) ||
        topic.badgeMr.toLowerCase().includes(q) ||
        topic.keyPointsMr.some((kp) => kp.toLowerCase().includes(q)) ||
        topic.keyPointsEn.some((kp) => kp.toLowerCase().includes(q)) ||
        topic.importantSections?.some(
          (sec) =>
            sec.section.toLowerCase().includes(q) ||
            sec.titleMr.toLowerCase().includes(q) ||
            sec.descMr.toLowerCase().includes(q)
        )
      );
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyNotes = (topic: InformationTopic) => {
    const text = isMr
      ? `📌 ${topic.titleMr}\n${topic.subtitleMr}\n\n${topic.summaryMr}\n\nप्रमुख मुद्दे:\n${topic.keyPointsMr.map(p => `• ${p}`).join('\n')}\n\nसंदर्भ: MPSCAspirant माहिती केंद्र`
      : `📌 ${topic.titleEn}\n${topic.subtitleEn}\n\n${topic.summaryEn}\n\nKey Points:\n${topic.keyPointsEn.map(p => `• ${p}`).join('\n')}\n\nSource: MPSCAspirant Information Hub`;

    navigator.clipboard.writeText(text);
    setCopiedId(topic.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border-b border-stone-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-black text-white">
                  {isMr ? '📚 MPSC परीक्षा व कायदे माहिती केंद्र' : '📚 MPSC Exam & Legal Information Hub'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {isMr ? 'अधिकृत संदर्भ डेटा' : 'Official Data'}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                {isMr 
                  ? 'माहितीचा अधिकार (RTI २००५), IT कायदा, लोकसेवा हक्क, DPDP आणि MPSC परीक्षा नियमावली' 
                  : 'RTI Act 2005, IT Act 2000, RTS 2015, DPDP 2023 & MPSC Exam Blueprints'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            title={isMr ? "बंद करा" : "Close"}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="p-4 bg-stone-950/80 border-b border-stone-800 space-y-3 shrink-0">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isMr ? 'कायदा, कलम, विषय किंवा महत्त्वाचा शब्द शोधा (उदा. कलम ७, RTI, दंड, पदे)...' : 'Search acts, sections, topics (e.g. RTI, Section 7, IT Act, penalty)...'}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-hidden focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 transition-all"
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

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {INFORMATION_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'bg-stone-900 hover:bg-stone-850 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {isMr ? cat.nameMr : cat.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Topics List Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {filteredTopics.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <HelpCircle className="w-12 h-12 text-stone-600 mx-auto" />
              <p className="text-sm font-semibold text-stone-400">
                {isMr ? 'कोणतीही माहिती सापडली नाही. कृपया वेगळा शब्द शोधून पहा.' : 'No matching information found. Try different search keywords.'}
              </p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-750 text-amber-300 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                {isMr ? 'सर्व माहिती पुन्हा पहा' : 'Reset Filters'}
              </button>
            </div>
          ) : (
            filteredTopics.map((topic) => (
              <div 
                key={topic.id}
                className="rounded-2xl bg-stone-850/80 border border-stone-800 hover:border-stone-700 p-5 sm:p-6 space-y-4 transition-all shadow-md"
              >
                {/* Topic Top Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {isMr ? topic.badgeMr : topic.badgeEn}
                      </span>
                      <span className="text-xs text-stone-400 font-medium">
                        • {topic.examRelevance}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white mt-1">
                      {isMr ? topic.titleMr : topic.titleEn}
                    </h3>
                    <p className="text-xs text-amber-400/90 font-medium">
                      {isMr ? topic.subtitleMr : topic.subtitleEn}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <button
                      type="button"
                      onClick={() => handleCopyNotes(topic)}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white border border-stone-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title={isMr ? "महत्त्वाचे मुद्दे कॉपी करा" : "Copy key notes"}
                    >
                      {copiedId === topic.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">{isMr ? 'कॉपी झाले!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-amber-400" />
                          <span>{isMr ? 'मुद्दे कॉपी करा' : 'Copy Notes'}</span>
                        </>
                      )}
                    </button>

                    {onStartPractice && (
                      <button
                        type="button"
                        onClick={() => onStartPractice(topic.relatedSubjectId as SubjectId, isMr ? `${topic.titleMr} सराव चाचणी` : `${topic.titleEn} Practice Test`)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-stone-950" />
                        <span>{isMr ? 'सराव चाचणी सोडवा' : 'Practice Test'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {isMr ? topic.summaryMr : topic.summaryEn}
                </p>

                {/* Key Points */}
                <div className="space-y-2 bg-stone-900/90 p-4 rounded-xl border border-stone-800/80">
                  <h4 className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isMr ? 'परीक्षेसाठी अत्यंत महत्त्वाचे ठळक मुद्दे (Exam Essentials):' : 'Key Exam Essentials:'}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-300">
                    {(isMr ? topic.keyPointsMr : topic.keyPointsEn).map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-amber-400 shrink-0 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Important Sections Breakdown (if present) */}
                {topic.importantSections && topic.importantSections.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-black uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isMr ? 'महत्त्वाची कलमे व कायदेशीर तरतुदी (Key Sections):' : 'Important Sections:'}</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {topic.importantSections.map((sec, sIdx) => (
                        <div 
                          key={sIdx}
                          className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1 hover:border-amber-500/40 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-mono font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                              {sec.section}
                            </span>
                            <span className="text-[11px] font-bold text-stone-300 text-right truncate">
                              {isMr ? sec.titleMr : sec.titleEn}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-400 leading-relaxed pt-0.5">
                            {isMr ? sec.descMr : sec.descEn}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between flex-wrap gap-2 text-xs text-stone-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {isMr 
                ? 'हे सर्व संदर्भ अधिकृत गॅझेट, भारतीय संसद व MPSC अधिसूचनेवर आधारित आहेत.' 
                : 'All information is verified against official Gazettes and MPSC notifications.'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl transition-colors cursor-pointer"
            >
              {isMr ? 'बंद करा' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
