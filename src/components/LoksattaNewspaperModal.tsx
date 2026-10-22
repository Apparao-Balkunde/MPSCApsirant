import React, { useState, useMemo } from 'react';
import {
  X,
  Newspaper,
  BookOpen,
  UserCheck,
  Microscope,
  HelpCircle,
  Search,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Award,
  Shield,
  Clock,
  RotateCcw,
  Bookmark,
  Share2
} from 'lucide-react';
import {
  LOKSATTA_EDITORIALS,
  LOKSATTA_VYAKTIWEDH,
  LOKSATTA_KUTUHAL,
  LOKSATTA_MPSC_MCQS,
  LoksattaEditorial,
  LoksattaVyaktiwedh,
  LoksattaKutuhal,
  LoksattaMcq
} from '../data/loksattaNewspaperData';
import { cleanQuestionText } from '../utils/cleanQuestionText';

interface LoksattaNewspaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: 'mr' | 'en';
  onAddBookmark?: (qId: string) => void;
}

export const LoksattaNewspaperModal: React.FC<LoksattaNewspaperModalProps> = ({
  isOpen,
  onClose,
  language = 'mr',
  onAddBookmark
}) => {
  const isMr = language === 'mr';

  // Active Tab
  const [activeTab, setActiveTab] = useState<'editorials' | 'vyaktiwedh' | 'kutuhal' | 'mcqs'>('editorials');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // MCQ state: questionId -> selectedOptionIndex
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleCopyNotes = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSelectOption = (qId: string, optIdx: number) => {
    setMcqAnswers((prev) => ({
      ...prev,
      [qId]: optIdx
    }));
    setRevealedExplanations((prev) => ({
      ...prev,
      [qId]: true
    }));
  };

  const handleResetMcqs = () => {
    setMcqAnswers({});
    setRevealedExplanations({});
  };

  // Filtered Editorials
  const filteredEditorials = LOKSATTA_EDITORIALS.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.titleMr.toLowerCase().includes(q) ||
      item.titleEn.toLowerCase().includes(q) ||
      item.topic.toLowerCase().includes(q) ||
      item.summaryMr.toLowerCase().includes(q)
    );
  });

  // Filtered Vyaktiwedh
  const filteredVyaktiwedh = LOKSATTA_VYAKTIWEDH.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.nameMr.toLowerCase().includes(q) ||
      item.nameEn.toLowerCase().includes(q) ||
      item.field.toLowerCase().includes(q) ||
      item.bioSummaryMr.toLowerCase().includes(q)
    );
  });

  // Filtered Kutuhal
  const filteredKutuhal = LOKSATTA_KUTUHAL.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.titleMr.toLowerCase().includes(q) ||
      item.titleEn.toLowerCase().includes(q) ||
      item.domain.toLowerCase().includes(q) ||
      item.summaryMr.toLowerCase().includes(q)
    );
  });

  // Filtered MCQs
  const filteredMcqs = LOKSATTA_MPSC_MCQS.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.questionMr.toLowerCase().includes(q) ||
      item.questionEn.toLowerCase().includes(q) ||
      item.topic.toLowerCase().includes(q) ||
      item.newsReference.toLowerCase().includes(q)
    );
  });

  // Score computation
  const correctCount = Object.entries(mcqAnswers).filter(([qId, ans]) => {
    const q = LOKSATTA_MPSC_MCQS.find((m) => m.id === qId);
    return q && q.correctAnswerIndex === ans;
  }).length;
  const answeredCount = Object.keys(mcqAnswers).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-stone-900 border-2 border-red-500/60 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-100">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-red-950/90 via-stone-950 to-amber-950/80 border-b border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white shadow-lg shrink-0">
              <Newspaper className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-[10px] font-black uppercase tracking-wider">
                  MPSC अधिकृत वृत्तपत्र संदर्भ
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  २०२५-२७ अद्यतन
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5 flex items-center gap-2">
                <span>{isMr ? 'दैनिक लोकसत्ता MPSC विशेष हब' : 'Daily Loksatta MPSC Hub'}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-red-600 text-white font-bold hidden sm:inline">
                  Loksatta
                </span>
              </h2>
              <p className="text-xs text-stone-300 mt-0.5">
                {isMr
                  ? 'संपादकीय, अन्वयार्थ, व्यक्तिवेध, कुतूहल स्तंभ व चालू घडामोडी सराव प्रश्नसंच'
                  : 'Editorials, Anwayartha, Vyaktiwedh, Kutuhal Science, & MPSC Practice MCQs'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="self-end sm:self-center p-2 rounded-xl bg-stone-800/80 hover:bg-stone-750 text-stone-300 hover:text-white transition-colors cursor-pointer border border-stone-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation & Search Bar */}
        <div className="px-4 sm:px-6 py-3 bg-stone-950/70 border-b border-stone-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('editorials')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                activeTab === 'editorials'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-stone-850 hover:bg-stone-800 text-stone-300'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isMr ? 'संपादकीय व अन्वयार्थ' : 'Editorials'}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px]">
                {LOKSATTA_EDITORIALS.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('vyaktiwedh')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                activeTab === 'vyaktiwedh'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-stone-850 hover:bg-stone-800 text-stone-300'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{isMr ? 'व्यक्तिवेध' : 'Vyaktiwedh'}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px]">
                {LOKSATTA_VYAKTIWEDH.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('kutuhal')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                activeTab === 'kutuhal'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-stone-850 hover:bg-stone-800 text-stone-300'
              }`}
            >
              <Microscope className="w-3.5 h-3.5" />
              <span>{isMr ? 'कुतूहल (विज्ञान व पर्यावरण)' : 'Kutuhal (Science)'}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px]">
                {LOKSATTA_KUTUHAL.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('mcqs')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                activeTab === 'mcqs'
                  ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                  : 'bg-stone-850 hover:bg-stone-800 text-amber-300'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{isMr ? 'MPSC सराव प्रश्न' : 'Practice MCQs'}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/30 text-[10px]">
                {LOKSATTA_MPSC_MCQS.length}
              </span>
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isMr ? 'लोकसत्ता लेख, व्यक्ती, विज्ञान शोधा...' : 'Search Loksatta articles...'}
              className="w-full pl-9 pr-3 py-1.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Tab 1: Editorials & Anwayartha */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'editorials' && (
            <div className="space-y-4">
              <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-4 text-xs text-stone-300 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-300 text-sm">
                    {isMr ? 'दैनिक लोकसत्ता संपादकीय व अन्वयार्थ महत्त्व' : 'Loksatta Editorial Analysis Significance'}
                  </p>
                  <p className="mt-1 leading-relaxed text-stone-300">
                    {isMr
                      ? 'एमपीएससी राज्यसेवा मुख्य परीक्षा पेपर २, ३ आणि पूर्व परीक्षेसाठी लोकसत्ताचे संपादकीय व अन्वयार्थ हे सर्वात विश्वासार्ह मानले जातात. प्रत्येक लेखासोबत आयोगाच्या अभ्यासक्रमाचा (GS-1/2/3/4) संदर्भ आणि संभाव्य मुख्य परीक्षा प्रश्न खाली दिला आहे.'
                      : 'Essential analytical depth for MPSC Rajyaseva GS-1/2/3/4 mains and prelims. Each editorial maps to syllabus papers and potential mains questions.'}
                  </p>
                </div>
              </div>

              {filteredEditorials.map((ed) => (
                <div
                  key={ed.id}
                  className="bg-stone-950/70 border border-stone-800 rounded-2xl p-4 sm:p-5 space-y-4 hover:border-red-500/50 transition-all shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-md bg-red-600/30 text-red-300 border border-red-500/40 text-xs font-bold">
                        {ed.column}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-stone-800 text-amber-300 text-xs font-mono font-bold">
                        {ed.gsPaper}
                      </span>
                      <span className="text-xs text-stone-400">📅 {ed.date}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyNotes(ed.id, `${ed.titleMr}\n${ed.summaryMr}\n\nमुख्य मुद्दे:\n${ed.keyPointsMr.join('\n')}`)}
                      className="text-xs text-stone-400 hover:text-amber-300 flex items-center gap-1 self-start sm:self-center transition-colors cursor-pointer"
                    >
                      {copiedId === ed.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">कॉपी झाले!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>नोट्स कॉपी करा</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-black text-stone-100 leading-snug">
                      {isMr ? ed.titleMr : ed.titleEn}
                    </h3>
                    <p className="text-xs text-amber-400 font-medium mt-1">
                      📚 {isMr ? 'विषय संदर्भ:' : 'Topic:'} {ed.topic}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-stone-900/60 p-3 rounded-xl border border-stone-850">
                    {isMr ? ed.summaryMr : ed.summaryEn}
                  </p>

                  {/* Key Points */}
                  <div className="space-y-1.5">
                    <div className="text-xs font-black text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isMr ? 'परीक्षेसाठी महत्त्वाचे ठळक मुद्दे:' : 'High-Yield Exam Pointers:'}</span>
                    </div>
                    <ul className="space-y-1 text-xs text-stone-300 pl-4 list-disc marker:text-red-500 leading-relaxed">
                      {(isMr ? ed.keyPointsMr : ed.keyPointsEn).map((pt, idx) => (
                        <li key={idx}>{pt}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Potential Mains Question */}
                  <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3 text-xs space-y-1">
                    <span className="font-bold text-amber-400 uppercase tracking-wide text-[10px]">
                      🎯 {isMr ? 'संभाव्य मुख्य परीक्षा प्रश्न (MPSC Mains):' : 'Potential Mains Question:'}
                    </span>
                    <p className="text-stone-200 italic font-medium leading-relaxed">
                      {isMr ? ed.potentialMainsQuestionMr : ed.potentialMainsQuestionEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Vyaktiwedh */}
          {activeTab === 'vyaktiwedh' && (
            <div className="space-y-4">
              <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-4 text-xs text-stone-300 flex items-start gap-3">
                <UserCheck className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-300 text-sm">
                    {isMr ? 'लोकसत्ता "व्यक्तिवेध" : व्यक्तीविशेष चालू घडामोडी' : 'Loksatta "Vyaktiwedh" Column'}
                  </p>
                  <p className="mt-1 leading-relaxed text-stone-300">
                    {isMr
                      ? 'लोकसत्ताचे ‘व्यक्तिवेध’ हे सदर देशातील व महाराष्ट्रातील चर्चित व्यक्ती, पुरस्कार विजेते, राजकीय मुत्सद्दी, शास्त्रज्ञ व समाजसुधारक यांच्या जीवनकार्याचा वेध घेते. एमपीएससी पूर्व परीक्षेत व्यक्तिविशेषांवर हमखास २ ते ३ प्रश्न येतात.'
                      : 'Features national and Maharashtra leaders, scientists, jurists, and reform icons frequently targeted in MPSC Prelims.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredVyaktiwedh.map((v) => (
                  <div
                    key={v.id}
                    className="bg-stone-950/70 border border-stone-800 rounded-2xl p-4 sm:p-5 space-y-3 hover:border-red-500/40 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 border-b border-stone-850 pb-2">
                        <span className="px-2 py-0.5 rounded bg-red-600/30 text-red-300 text-[10px] font-bold">
                          {v.field}
                        </span>
                        <span className="text-[11px] text-stone-400">📅 {v.date}</span>
                      </div>

                      <h3 className="text-base font-black text-white">{isMr ? v.nameMr : v.nameEn}</h3>
                      <p className="text-xs text-amber-400 font-bold">{isMr ? v.titleMr : v.titleEn}</p>
                      <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/50 p-2.5 rounded-lg border border-stone-850">
                        {isMr ? v.bioSummaryMr : v.bioSummaryEn}
                      </p>

                      <div className="space-y-1 pt-1">
                        <div className="text-[11px] font-bold text-stone-300 uppercase">
                          {isMr ? 'ठळक कामगिरी व पुरस्कार:' : 'Key Highlights:'}
                        </div>
                        <ul className="space-y-0.5 text-xs text-stone-300 pl-4 list-disc marker:text-amber-400">
                          {(isMr ? v.keyAchievementsMr : v.keyAchievementsEn).map((ach, idx) => (
                            <li key={idx}>{ach}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-2.5 text-xs text-amber-200 mt-2">
                      <span className="font-bold text-amber-400">💡 MPSC टिप: </span>
                      <span>{v.mpscTipMr}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Kutuhal */}
          {activeTab === 'kutuhal' && (
            <div className="space-y-4">
              <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-4 text-xs text-stone-300 flex items-start gap-3">
                <Microscope className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-300 text-sm">
                    {isMr ? 'लोकसत्ता "कुतूहल" : सामान्य विज्ञान व पर्यावरण स्तंभ' : 'Loksatta "Kutuhal" Science Column'}
                  </p>
                  <p className="mt-1 leading-relaxed text-stone-300">
                    {isMr
                      ? 'दैनिक लोकसत्तामधील ‘कुतूहल’ हे सदर निसर्ग, वनस्पती, भौतिकशास्त्र, अवकाश तंत्रज्ञान आणि महाराष्ट्रातील जैवविविधतेचे वैज्ञानिक पैलू उलगडते. एमपीएससी पूर्व परीक्षा सामान्य विज्ञान व पर्यावरणासाठी हे सर्वात उपयुक्त मानले जाते.'
                      : 'Scientific exposition of nature, space research, renewable energy, and ecology tailored for MPSC GS-1 & GS-4.'}
                  </p>
                </div>
              </div>

              {filteredKutuhal.map((k) => (
                <div
                  key={k.id}
                  className="bg-stone-950/70 border border-stone-800 rounded-2xl p-4 sm:p-5 space-y-3 hover:border-red-500/50 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-stone-850 pb-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                      🔬 {k.domain}
                    </span>
                    <span className="text-xs text-stone-400">📅 {k.date}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-stone-100">
                    {isMr ? k.titleMr : k.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-stone-900/60 p-3 rounded-xl border border-stone-850">
                    {isMr ? k.summaryMr : k.summaryEn}
                  </p>

                  <div className="space-y-1.5">
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isMr ? 'वैज्ञानिक सत्ये व तथ्ये (Scientific Facts):' : 'Scientific Facts:'}</span>
                    </div>
                    <ul className="space-y-1 text-xs text-stone-300 pl-4 list-disc marker:text-emerald-400 leading-relaxed">
                      {(isMr ? k.scientificFactsMr : k.scientificFactsEn).map((fact, idx) => (
                        <li key={idx}>{fact}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-stone-900 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-300">
                    <span className="font-bold text-amber-400">🎯 MPSC महत्त्व: </span>
                    <span>{k.examSignificanceMr}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: MCQs Practice */}
          {activeTab === 'mcqs' && (
            <div className="space-y-5">
              <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <p className="font-bold text-amber-300 text-sm">
                      {isMr ? 'लोकसत्ता बातमी आधारित MPSC सराव प्रश्न' : 'Loksatta-Based MPSC MCQs Drill'}
                    </p>
                    <p className="text-stone-300 text-xs">
                      {isMr
                        ? `सोडवलेले: ${answeredCount} / ${LOKSATTA_MPSC_MCQS.length} • बरोबर: ${correctCount}`
                        : `Attempted: ${answeredCount} / ${LOKSATTA_MPSC_MCQS.length} • Correct: ${correctCount}`}
                    </p>
                  </div>
                </div>

                {answeredCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetMcqs}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-stone-700"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isMr ? 'पुन्हा सराव करा' : 'Reset'}</span>
                  </button>
                )}
              </div>

              {filteredMcqs.map((q, qIndex) => {
                const userSelected = mcqAnswers[q.id];
                const isAnswered = userSelected !== undefined;
                const isCorrect = isAnswered && userSelected === q.correctAnswerIndex;
                const isExplanationVisible = revealedExplanations[q.id];

                return (
                  <div
                    key={q.id}
                    className={`bg-stone-950/70 border rounded-2xl p-4 sm:p-5 space-y-4 transition-all ${
                      isAnswered
                        ? isCorrect
                          ? 'border-emerald-500/60 bg-emerald-950/10'
                          : 'border-rose-500/60 bg-rose-950/10'
                        : 'border-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-stone-850 pb-2.5 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-stone-800 text-stone-200 text-xs font-bold flex items-center justify-center">
                          {qIndex + 1}
                        </span>
                        <span className="text-xs font-bold text-amber-400">
                          {q.topic}
                        </span>
                      </div>

                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-900 border border-stone-800 text-stone-400">
                        📰 {q.newsReference}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base font-bold text-stone-100 leading-relaxed whitespace-pre-line">
                      {cleanQuestionText(isMr ? q.questionMr : q.questionEn)}
                    </p>

                    {/* Options list */}
                    <div className="space-y-2 pt-1">
                      {(isMr ? q.optionsMr : q.optionsEn).map((opt, optIdx) => {
                        const isThisSelected = userSelected === optIdx;
                        const isCorrectOption = optIdx === q.correctAnswerIndex;

                        let btnStyle = 'bg-stone-900 border-stone-800 hover:border-stone-700 text-stone-300';
                        if (isAnswered) {
                          if (isCorrectOption) {
                            btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isThisSelected && !isCorrect) {
                            btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
                          } else {
                            btnStyle = 'bg-stone-950/40 border-stone-850 text-stone-500 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`w-full p-3 rounded-xl border text-xs sm:text-sm text-left flex items-start gap-3 transition-all cursor-pointer ${btnStyle}`}
                          >
                            <span className="w-5 h-5 rounded-md bg-stone-800 text-stone-200 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                              {optIdx + 1}
                            </span>
                            <span className="flex-1 leading-snug">{opt}</span>
                            {isAnswered && isCorrectOption && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                            {isAnswered && isThisSelected && !isCorrect && (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {isExplanationVisible && (
                      <div className="bg-stone-900 border border-stone-800 rounded-xl p-3.5 space-y-1.5 text-xs animate-fade-in">
                        <div className="flex items-center gap-1.5 font-bold text-amber-400">
                          <HelpCircle className="w-4 h-4" />
                          <span>{isMr ? 'लोकसत्ता विश्लेषण व संदर्भ:' : 'Loksatta Explanation & Reference:'}</span>
                        </div>
                        <p className="text-stone-300 leading-relaxed">
                          {isMr ? q.explanationMr : q.explanationEn}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-3 shrink-0 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-red-500" />
            <span>{isMr ? 'दैनिक लोकसत्ता वृत्तपत्र विशेष • MPSC पूर्व व मुख्य परीक्षा' : 'Daily Loksatta Newspaper MPSC Hub'}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-stone-800 hover:bg-stone-750 text-white font-bold rounded-xl transition-colors cursor-pointer"
          >
            {isMr ? 'बंद करा' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
