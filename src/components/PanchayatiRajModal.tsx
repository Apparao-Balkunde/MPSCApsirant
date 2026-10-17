import React, { useState, useMemo } from 'react';
import {
  X,
  Scale,
  Users,
  Award,
  BookOpen,
  Sparkles,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Check,
  Building,
  ScrollText,
  FileText,
  ShieldCheck,
  ChevronRight,
  Flame,
  Layers,
  ArrowRightLeft
} from 'lucide-react';
import {
  PANCHAYATI_RAJ_COMMITTEES,
  LOCAL_GOV_OFFICERS,
  CONSTITUTIONAL_ARTICLES,
  PANCHAYATI_RAJ_QUESTIONS,
  PANCHAYATI_RAJ_MEMORY_TRICKS,
  PanchayatiRajCommittee,
  LocalGovOfficer,
  ConstitutionalArticle,
  PanchayatiRajQuestion
} from '../data/panchayatiRajData';
import { soundFx } from '../utils/audio';

interface PanchayatiRajModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: 'mr' | 'en';
}

type TabType = 'committees' | 'officers' | 'constitution' | 'quiz' | 'cheatsheet';

export const PanchayatiRajModal: React.FC<PanchayatiRajModalProps> = ({
  isOpen,
  onClose,
  language = 'mr'
}) => {
  const isMr = language === 'mr';
  const [activeTab, setActiveTab] = useState<TabType>('committees');

  // Committee selection
  const [selectedCommitteeId, setSelectedCommitteeId] = useState<string>('vasantrao_naik');

  // Officer selection
  const [selectedOfficerId, setSelectedOfficerId] = useState<string>('ceo');

  // Article search
  const [articleSearchQuery, setArticleSearchQuery] = useState<string>('');

  // Quiz state
  const [quizQuestions] = useState<PanchayatiRajQuestion[]>(PANCHAYATI_RAJ_QUESTIONS);
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [completedQuiz, setCompletedQuiz] = useState<boolean>(false);
  const [userAnswersHistory, setUserAnswersHistory] = useState<Record<number, number>>({});

  const playFx = (type: 'click' | 'correct' | 'wrong' | 'complete') => {
    try {
      if (type === 'click') soundFx.playClickSound();
      if (type === 'correct') soundFx.playCorrectSound();
      if (type === 'wrong') soundFx.playWrongSound();
      if (type === 'complete') soundFx.playExamSubmissionSound();
    } catch {
      // Audio fallback
    }
  };

  // Filtered Constitutional Articles
  const filteredArticles = useMemo(() => {
    if (!articleSearchQuery.trim()) return CONSTITUTIONAL_ARTICLES;
    const q = articleSearchQuery.toLowerCase();
    return CONSTITUTIONAL_ARTICLES.filter(
      (a) =>
        a.article.toLowerCase().includes(q) ||
        a.titleMr.toLowerCase().includes(q) ||
        a.titleEn.toLowerCase().includes(q) ||
        a.descriptionMr.toLowerCase().includes(q) ||
        a.mpscNoteMr.toLowerCase().includes(q)
    );
  }, [articleSearchQuery]);

  // Current active committee
  const activeCommittee = useMemo(() => {
    return (
      PANCHAYATI_RAJ_COMMITTEES.find((c) => c.id === selectedCommitteeId) ||
      PANCHAYATI_RAJ_COMMITTEES[0]
    );
  }, [selectedCommitteeId]);

  // Current active officer
  const activeOfficer = useMemo(() => {
    return (
      LOCAL_GOV_OFFICERS.find((o) => o.id === selectedOfficerId) ||
      LOCAL_GOV_OFFICERS[0]
    );
  }, [selectedOfficerId]);

  // Quiz submission handler
  const handleSelectQuizOption = (optionIndex: number) => {
    if (isAnswerSubmitted) return;
    playFx('click');
    setSelectedOption(optionIndex);
  };

  const handleSubmitQuizAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const currentQ = quizQuestions[currentQuizIdx];
    const isCorrect = selectedOption === currentQ.correctOptionIndex;
    if (isCorrect) {
      playFx('correct');
      setScore((prev) => prev + 1);
    } else {
      playFx('wrong');
    }
    setUserAnswersHistory((prev) => ({
      ...prev,
      [currentQuizIdx]: selectedOption
    }));
  };

  const handleNextQuizQuestion = () => {
    playFx('click');
    if (currentQuizIdx < quizQuestions.length - 1) {
      setCurrentQuizIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      playFx('complete');
      setCompletedQuiz(true);
    }
  };

  const handleResetQuiz = () => {
    playFx('click');
    setCurrentQuizIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setCompletedQuiz(false);
    setUserAnswersHistory({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh] my-auto">
        {/* ================================================================= */}
        {/* MODAL HEADER */}
        {/* ================================================================= */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/40 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-inner">
              <Scale className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-black text-amber-100 flex items-center gap-1.5">
                  <span>⚖️</span>
                  <span>
                    {isMr
                      ? 'पंचायत राज व स्थानिक स्वराज्य संस्था विशेष केंद्र'
                      : 'Panchayati Raj & Local Self-Gov Special Hub'}
                  </span>
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black tracking-wide uppercase">
                  {isMr ? 'MPSC GS-2 विशेष' : 'High Scoring Topic'}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                {isMr
                  ? 'बलवंतराय मेहता, अशोक मेहता, वसंतराव नाईक, पी.बी. पाटील समित्यांच्या शिफारशी • ग्रामसेवक, BDO, CEO तुलना • कलमे २४३'
                  : 'Committees, Comparative Officers Powers (Gramsevak, BDO, CEO, Collector), Articles 243A-243O & PYQs'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-all cursor-pointer"
            title={isMr ? 'बंद करा' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ================================================================= */}
        {/* NAVIGATION TABS */}
        {/* ================================================================= */}
        <div className="bg-stone-950/80 px-4 sm:px-6 pt-3 border-b border-stone-800 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <button
            type="button"
            onClick={() => {
              playFx('click');
              setActiveTab('committees');
            }}
            className={`px-3.5 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'committees'
                ? 'text-amber-300 border-amber-500 bg-stone-900/90 shadow-sm'
                : 'text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-900/40'
            }`}
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>{isMr ? '📑 प्रमुख समित्यांची तुलना' : 'Committees Comparison'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playFx('click');
              setActiveTab('officers');
            }}
            className={`px-3.5 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'officers'
                ? 'text-amber-300 border-amber-500 bg-stone-900/90 shadow-sm'
                : 'text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-900/40'
            }`}
          >
            <ArrowRightLeft className="w-4 h-4 text-blue-400" />
            <span>{isMr ? '👔 ग्रामसेवक • BDO • CEO अधिकार तुलना' : 'Officers Powers Matrix'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playFx('click');
              setActiveTab('constitution');
            }}
            className={`px-3.5 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'constitution'
                ? 'text-amber-300 border-amber-500 bg-stone-900/90 shadow-sm'
                : 'text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-900/40'
            }`}
          >
            <ScrollText className="w-4 h-4 text-emerald-400" />
            <span>{isMr ? '🏛️ कलमे २४३ व ७३ वी दुरुस्ती' : 'Articles 243 & 73rd Act'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playFx('click');
              setActiveTab('quiz');
            }}
            className={`px-3.5 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'text-amber-300 border-amber-500 bg-stone-900/90 shadow-sm'
                : 'text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-900/40'
            }`}
          >
            <Award className="w-4 h-4 text-purple-400" />
            <span>{isMr ? '🎯 MPSC सराव क्विझ व PYQs' : 'MPSC Practice Quiz'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playFx('click');
              setActiveTab('cheatsheet');
            }}
            className={`px-3.5 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'cheatsheet'
                ? 'text-amber-300 border-amber-500 bg-stone-900/90 shadow-sm'
                : 'text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-900/40'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isMr ? '💡 मेमरी ट्रिक्स व बुलेट नोट्स' : 'Memory Tricks & Notes'}</span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* TAB 1: COMMITTEES COMPARISON */}
        {/* ================================================================= */}
        {activeTab === 'committees' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {/* Quick summary comparison table banner */}
            <div className="bg-stone-950/70 rounded-2xl border border-stone-800 p-4">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <h3 className="text-sm font-black text-amber-200 flex items-center gap-2">
                  <span>⚡</span>
                  <span>{isMr ? 'प्रमुख समित्यांची झटपट तुलना (Quick MPSC Master Table)' : 'Quick Master Comparison Table'}</span>
                </h3>
                <span className="text-[11px] text-stone-400">
                  {isMr ? 'MPSC परीक्षेत या फरकांवर थेट प्रश्न येतात' : 'High frequency comparative questions'}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-stone-300 border-collapse">
                  <thead>
                    <tr className="border-b border-stone-800 text-stone-400 uppercase text-[10px] tracking-wider">
                      <th className="py-2.5 px-3">{isMr ? 'समितीचे नाव व वर्ष' : 'Committee & Year'}</th>
                      <th className="py-2.5 px-3">{isMr ? 'रचना स्तर' : 'Tier System'}</th>
                      <th className="py-2.5 px-3">{isMr ? 'प्रमुख कार्यकारी घटक' : 'Chief Executive Body'}</th>
                      <th className="py-2.5 px-3">{isMr ? 'जिल्हाधिकारी भूमिका' : 'Collector Role'}</th>
                      <th className="py-2.5 px-3">{isMr ? 'ऐतिहासिक महत्त्व' : 'Key Significance'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60">
                    <tr className="hover:bg-stone-900/50">
                      <td className="py-2.5 px-3 font-bold text-blue-300">
                        बलवंतराय मेहता (१९५७)
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-emerald-300">त्रिस्तरीय (3-Tier)</td>
                      <td className="py-2.5 px-3 text-amber-300 font-bold">पंचायत समिती (Block)</td>
                      <td className="py-2.5 px-3 text-stone-300">जिल्हा परिषदेचा अध्यक्ष</td>
                      <td className="py-2.5 px-3 text-stone-400">भारतीय पंचायत राज्याचे जनक; राजस्थानमध्ये प्रारंभ</td>
                    </tr>
                    <tr className="hover:bg-stone-900/50">
                      <td className="py-2.5 px-3 font-bold text-purple-300">
                        अशोक मेहता (१९७८)
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-amber-300">द्विस्तरीय (2-Tier: ZP + मंडळ)</td>
                      <td className="py-2.5 px-3 text-purple-300 font-bold">जिल्हा परिषद (ZP)</td>
                      <td className="py-2.5 px-3 text-stone-300">अध्यक्ष नसावा, स्वतंत्र निवड</td>
                      <td className="py-2.5 px-3 text-stone-400">घटनात्मक दर्जाची पहिली शिफारस, पक्षांना अधिकृत सहभाग</td>
                    </tr>
                    <tr className="hover:bg-stone-900/50 bg-emerald-950/20">
                      <td className="py-2.5 px-3 font-bold text-emerald-300">
                        वसंतराव नाईक (१९६१) ⭐
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-emerald-300">त्रिस्तरीय (3-Tier)</td>
                      <td className="py-2.5 px-3 text-emerald-300 font-black">जिल्हा परिषद (ZP सर्वशक्तिमान)</td>
                      <td className="py-2.5 px-3 text-stone-300 font-medium">ZP पासून पूर्ण बाजूला (स्वतंत्र CEO)</td>
                      <td className="py-2.5 px-3 text-emerald-200 font-bold">महाराष्ट्र पंचायत राजचे जनक; १ मे १९६२ ला लागू</td>
                    </tr>
                    <tr className="hover:bg-stone-900/50">
                      <td className="py-2.5 px-3 font-bold text-amber-300">
                        पी. बी. पाटील (१९८६)
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-stone-300">त्रिस्तरीय सुधारणा</td>
                      <td className="py-2.5 px-3 text-amber-300 font-bold">ग्रामसभा सबलीकरण</td>
                      <td className="py-2.5 px-3 text-stone-300">नियोजन समन्वयक</td>
                      <td className="py-2.5 px-3 text-stone-400">सरपंच थेट जनतेतून, महिलांना २५% आरक्षण शिफारस</td>
                    </tr>
                    <tr className="hover:bg-stone-900/50">
                      <td className="py-2.5 px-3 font-bold text-cyan-300">
                        एल. एम. सिंघवी (१९८६)
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-cyan-300">घटनात्मक त्रिस्तरीय</td>
                      <td className="py-2.5 px-3 text-cyan-300 font-bold">स्थानिक स्वायत्त संस्था</td>
                      <td className="py-2.5 px-3 text-stone-300">प्रशासकीय सल्लागार</td>
                      <td className="py-2.5 px-3 text-stone-400">७३ व्या घटनादुरुस्तीचा मूळ पाया, राज्य निवडणूक आयोग</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Committee Selection Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {PANCHAYATI_RAJ_COMMITTEES.map((com) => {
                const isSelected = com.id === selectedCommitteeId;
                return (
                  <button
                    key={com.id}
                    type="button"
                    onClick={() => {
                      playFx('click');
                      setSelectedCommitteeId(com.id);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isSelected
                        ? `${com.badgeColor} ring-1 ring-amber-400/50 scale-[1.02] shadow-sm`
                        : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                    }`}
                  >
                    <span>{com.nameMr.split(' ')[0]}</span>
                    <span>({com.year})</span>
                  </button>
                );
              })}
            </div>

            {/* Detailed Committee Card */}
            <div className="bg-stone-950/80 rounded-2xl border border-stone-800 p-5 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-lg sm:text-xl font-black text-amber-200">
                      {isMr ? activeCommittee.nameMr : activeCommittee.nameEn}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                      {activeCommittee.year}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 text-xs font-medium">
                      {isMr ? `${activeCommittee.recommendationsCount} शिफारशी` : `${activeCommittee.recommendationsCount} Recs`}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1">
                    नियुक्ती: <span className="text-stone-200 font-medium">{activeCommittee.appointedBy}</span> • अहवाल: <span className="text-stone-200 font-medium">{activeCommittee.reportDate}</span>
                  </p>
                </div>

                <div className="text-right sm:text-right">
                  <span className="text-[11px] text-stone-400 block">{isMr ? 'रचना शिफारस:' : 'Structure:'}</span>
                  <span className="text-xs font-bold text-emerald-300 block">
                    {isMr ? activeCommittee.tierStructureMr : activeCommittee.tierStructureEn}
                  </span>
                </div>
              </div>

              {/* Core Feature highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="bg-stone-900/90 rounded-xl p-3.5 border border-stone-800/80">
                  <h4 className="text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                    <span>🏛️</span>
                    <span>{isMr ? 'मुख्य कार्यकारी घटक (Executive Center)' : 'Chief Executive Center'}</span>
                  </h4>
                  <p className="text-xs text-stone-200 font-semibold leading-relaxed">
                    {isMr ? activeCommittee.executiveBodyMr : activeCommittee.executiveBodyEn}
                  </p>
                </div>

                <div className="bg-stone-900/90 rounded-xl p-3.5 border border-stone-800/80">
                  <h4 className="text-xs font-bold text-emerald-300 mb-1 flex items-center gap-1.5">
                    <span>📜</span>
                    <span>{isMr ? 'ऐतिहासिक परिणाम (Historical Outcome)' : 'Historical Outcome'}</span>
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {isMr ? activeCommittee.historicalImpactMr : activeCommittee.historicalImpactEn}
                  </p>
                </div>
              </div>

              {/* All Key Recommendations */}
              <div>
                <h4 className="text-xs font-black text-stone-300 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <span>📌</span>
                  <span>{isMr ? 'महत्त्वाच्या शिफारशी (Key Recommendations):' : 'Key Recommendations:'}</span>
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {(isMr ? activeCommittee.keyRecommendationsMr : activeCommittee.keyRecommendationsEn).map(
                    (rec, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-900/60 border border-stone-800/60 text-xs text-stone-200"
                      >
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="leading-relaxed">{rec}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* MPSC High Frequency Exam Pointers */}
              <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-3.5">
                <h4 className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>{isMr ? 'MPSC वारंवार विचारलेले पॉईंटर्स (Exam Highlights):' : 'MPSC Exam Highlights:'}</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-amber-200/90">
                  {activeCommittee.mpscHighlightsMr.map((high, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400">⚡</span>
                      <span>{high}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: LOCAL GOV OFFICERS COMPARISON */}
        {/* ================================================================= */}
        {activeTab === 'officers' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {/* Officers Selector Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {LOCAL_GOV_OFFICERS.map((off) => {
                const isSelected = off.id === selectedOfficerId;
                return (
                  <button
                    key={off.id}
                    type="button"
                    onClick={() => {
                      playFx('click');
                      setSelectedOfficerId(off.id);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? `${off.badgeColor} ring-1 ring-amber-400/50 shadow-md scale-[1.02]`
                        : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl">{off.icon}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300 font-mono">
                        {off.levelMr.split(' ')[0]}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-stone-100">
                        {isMr ? off.titleMr : off.titleEn}
                      </h4>
                      <p className="text-[10px] text-stone-400 mt-0.5 truncate">
                        {isMr ? off.cadreAndClassMr : off.cadreAndClassEn}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Comparative Summary Table between Gramsevak, BDO, CEO & Collector */}
            <div className="bg-stone-950/70 rounded-2xl border border-stone-800 p-4 overflow-x-auto">
              <h3 className="text-xs font-black text-amber-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <span>📊</span>
                <span>{isMr ? 'प्रशासकीय अधिकाऱ्यांचा तुलनात्मक तक्ता (MPSC Direct Compare)' : 'Comparative Administrative Matrix'}</span>
              </h3>
              <table className="w-full text-xs text-left text-stone-300 border-collapse">
                <thead>
                  <tr className="border-b border-stone-800 text-stone-400 uppercase text-[10px] tracking-wider">
                    <th className="py-2 px-2.5">{isMr ? 'घटक / निकष' : 'Criteria'}</th>
                    <th className="py-2 px-2.5 text-emerald-300">ग्रामसेवक</th>
                    <th className="py-2 px-2.5 text-blue-300">गट विकास अधिकारी (BDO)</th>
                    <th className="py-2 px-2.5 text-amber-300">मुख्य कार्यकारी अधिकारी (CEO)</th>
                    <th className="py-2 px-2.5 text-red-300">जिल्हाधिकारी (Collector)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  <tr>
                    <td className="py-2 px-2.5 font-bold text-stone-400">{isMr ? 'पातळी / स्तर' : 'Level'}</td>
                    <td className="py-2 px-2.5">ग्रामपंचायत (गाव)</td>
                    <td className="py-2 px-2.5">पंचायत समिती (तालुका)</td>
                    <td className="py-2 px-2.5 font-bold text-amber-200">जिल्हा परिषद (जिल्हा)</td>
                    <td className="py-2 px-2.5 font-bold text-red-200">जिल्हा (महसूल व कायदा)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2.5 font-bold text-stone-400">{isMr ? 'संवर्ग व वर्ग' : 'Class / Cadre'}</td>
                    <td className="py-2 px-2.5">वर्ग-३ अराजपत्रित</td>
                    <td className="py-2 px-2.5">वर्ग-१ / वर्ग-२ राजपत्रित</td>
                    <td className="py-2 px-2.5 text-amber-300 font-bold">IAS संवर्ग (वरिष्ठ)</td>
                    <td className="py-2 px-2.5 text-red-300 font-bold">IAS संवर्ग (वरिष्ठ)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2.5 font-bold text-stone-400">{isMr ? 'निवड प्रक्रिया' : 'Selection'}</td>
                    <td className="py-2 px-2.5">जिल्हा निवड मंडळ (ZP)</td>
                    <td className="py-2 px-2.5 font-semibold text-blue-300">MPSC राज्यसेवा</td>
                    <td className="py-2 px-2.5 font-semibold text-amber-300">UPSC नागरी सेवा</td>
                    <td className="py-2 px-2.5 font-semibold text-red-300">UPSC नागरी सेवा</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2.5 font-bold text-stone-400">{isMr ? 'नियुक्ती अधिकारी' : 'Appointing Authority'}</td>
                    <td className="py-2 px-2.5">CEO (जिल्हा परिषद)</td>
                    <td className="py-2 px-2.5">राज्य शासन (ग्रामविकास)</td>
                    <td className="py-2 px-2.5">राज्य शासन (सामान्य प्रशासन)</td>
                    <td className="py-2 px-2.5">राज्य शासन (महसूल विभाग)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2.5 font-bold text-stone-400">{isMr ? 'पदसिद्ध कार्य' : 'Ex-officio Role'}</td>
                    <td className="py-2 px-2.5">ग्रामपंचायत सचिव</td>
                    <td className="py-2 px-2.5">पंचायत समिती सचिव व प्रमुख</td>
                    <td className="py-2 px-2.5 text-amber-200 font-bold">ZP प्रशासकीय प्रमुख</td>
                    <td className="py-2 px-2.5 text-red-200 font-bold">जिल्हा दंडाधिकारी & DM</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2.5 font-bold text-stone-400">{isMr ? 'राजकीय प्रमुखाशी संबंध' : 'Elected Partner'}</td>
                    <td className="py-2 px-2.5">सरपंच (संयुक्त धनादेश सही)</td>
                    <td className="py-2 px-2.5">सभापती (Panchayat Samiti)</td>
                    <td className="py-2 px-2.5 text-amber-300 font-bold">ZP अध्यक्ष (Adhyaksha)</td>
                    <td className="py-2 px-2.5 text-stone-400">ZP मध्ये थेट सहभाग नाही</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Selected Officer Detailed Profile */}
            <div className="bg-stone-950/80 rounded-2xl border border-stone-800 p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeOfficer.icon}</span>
                  <div>
                    <h3 className="text-lg font-black text-amber-200">
                      {isMr ? activeOfficer.titleMr : activeOfficer.titleEn}
                    </h3>
                    <p className="text-xs text-stone-400">
                      {isMr ? activeOfficer.levelMr : activeOfficer.levelEn} •{' '}
                      <span className="text-amber-300 font-semibold">{isMr ? activeOfficer.cadreAndClassMr : activeOfficer.cadreAndClassEn}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300">
                    निवड: <strong className="text-stone-100">{isMr ? activeOfficer.selectionModeMr : activeOfficer.selectionModeEn}</strong>
                  </span>
                </div>
              </div>

              {/* Recruitment & Hierarchy Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-stone-900/90 rounded-xl p-3 border border-stone-800">
                  <span className="text-stone-400 block mb-0.5">{isMr ? 'नियुक्ती प्राधिकरण (Appointing Authority):' : 'Appointing Authority:'}</span>
                  <p className="font-bold text-stone-100">{isMr ? activeOfficer.appointingAuthorityMr : activeOfficer.appointingAuthorityEn}</p>
                </div>
                <div className="bg-stone-900/90 rounded-xl p-3 border border-stone-800">
                  <span className="text-stone-400 block mb-0.5">{isMr ? 'प्रशासकीय नियंत्रण (Controlling Authority):' : 'Controlling Authority:'}</span>
                  <p className="font-bold text-stone-100">{isMr ? activeOfficer.controllingAuthorityMr : activeOfficer.controllingAuthorityEn}</p>
                </div>
              </div>

              {/* Key Powers */}
              <div>
                <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>{isMr ? 'प्रमुख अधिकार व कर्तव्ये (Statutory Powers & Duties):' : 'Statutory Powers & Duties:'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(isMr ? activeOfficer.keyPowersMr : activeOfficer.keyPowersEn).map((power, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800/70 text-xs text-stone-200 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{power}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relationship with Elected Head */}
              <div className="bg-stone-900/80 rounded-xl p-3.5 border border-stone-800">
                <h4 className="text-xs font-bold text-blue-300 mb-1 flex items-center gap-1.5">
                  <span>🤝</span>
                  <span>{isMr ? 'लोकप्रतिनिधी / राजकीय प्रमुखाशी नातेसंबंध:' : 'Relationship with Elected Head:'}</span>
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {isMr ? activeOfficer.relationshipWithElectedHeadMr : activeOfficer.relationshipWithElectedHeadEn}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: CONSTITUTIONAL ARTICLES 243 TO 243-O */}
        {/* ================================================================= */}
        {activeTab === 'constitution' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
            {/* Header info banner & Search */}
            <div className="bg-gradient-to-r from-stone-950 to-stone-900 rounded-2xl border border-stone-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-amber-200 flex items-center gap-2">
                  <span>📜</span>
                  <span>{isMr ? 'भारतीय संविधानाचा भाग ९ (भाग IX) - कलमे २४३ ते २४३ O' : 'Part IX of Constitution - Articles 243 to 243-O'}</span>
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  ७३ वी घटनादुरुस्ती कायदा, १९९२ • ११ वे परिशिष्ट (Schedule 11 - २९ विषय) • २४ एप्रिल: राष्ट्रीय पंचायत राज दिन
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={articleSearchQuery}
                  onChange={(e) => setArticleSearchQuery(e.target.value)}
                  placeholder={isMr ? 'कलम किंवा विषय शोधा...' : 'Search article or topic...'}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredArticles.map((art) => (
                <div
                  key={art.article}
                  className="bg-stone-950/80 rounded-2xl border border-stone-800 p-4 space-y-2.5 hover:border-amber-500/50 transition-all shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-stone-800/80 pb-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black font-mono">
                      {art.article}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        art.importanceRating === 'very_high'
                          ? 'bg-red-500/20 text-red-300 border-red-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}
                    >
                      {art.importanceRating === 'very_high' ? (isMr ? '🔥 वारंवार विचारले जाणारे' : 'High Yield') : (isMr ? 'महत्त्वाचे' : 'Important')}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-stone-100">
                      {isMr ? art.titleMr : art.titleEn}
                    </h4>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      {isMr ? art.descriptionMr : art.descriptionEn}
                    </p>
                  </div>

                  <div className="bg-stone-900/90 rounded-xl p-2.5 border border-stone-800/80 text-[11px] text-amber-300/90">
                    <span className="font-bold text-amber-400">💡 MPSC नोट: </span>
                    <span>{art.mpscNoteMr}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 11th Schedule (29 Subjects) Quick View */}
            <div className="bg-stone-950/70 rounded-2xl border border-stone-800 p-4 space-y-2">
              <h4 className="text-xs font-black text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                <span>📚</span>
                <span>{isMr ? '११ व्या परिशिष्टातील २९ महत्त्वाचे विषय (Quick Scan):' : '11th Schedule 29 Functional Subjects:'}</span>
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                कृषी व कृषी विस्तार, भूमी सुधारणा, लघु पाटबंधारे, पशुसंवर्धन व दुग्धव्यवसाय, मत्स्यव्यवसाय, सामाजिक व कृषी वनीकरण, लघु व कुटीर उद्योग, ग्रामीण गृहनिर्माण, पिण्याचे पाणी, इंधन व चारा, रस्ते व पूल, ग्रामीण विद्युतीकरण, अपारंपरिक ऊर्जा, दारिद्र्य निर्मूलन कार्यक्रम, प्राथमिक व माध्यमिक शिक्षण, तांत्रिक व व्यावसायिक शिक्षण, प्रौढ शिक्षण, ग्रंथालये, सांस्कृतिक उपक्रम, बाजार व जत्रा, आरोग्य व स्वच्छता (दवाखाने), कुटुंब कल्याण, महिला व बालकल्याण, समाजकल्याण, दुर्बल घटकांचे कल्याण, सार्वजनिक वितरण प्रणाली (PDS), सार्वजनिक मालमत्ता देखभाल.
              </p>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: MPSC PRACTICE QUIZ & PYQS */}
        {/* ================================================================= */}
        {activeTab === 'quiz' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
            {!completedQuiz ? (
              <div className="max-w-2xl mx-auto space-y-5">
                {/* Quiz Header & Progress */}
                <div className="flex items-center justify-between gap-3 bg-stone-950/70 p-3.5 rounded-2xl border border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-400">
                      प्रश्न {currentQuizIdx + 1} / {quizQuestions.length}
                    </span>
                    {quizQuestions[currentQuizIdx].pyqTag && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                        {quizQuestions[currentQuizIdx].pyqTag}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <Award className="w-4 h-4" />
                    <span>गुण: {score}</span>
                  </div>
                </div>

                {/* Question Card */}
                <div className="bg-stone-950/90 rounded-2xl border border-stone-800 p-5 space-y-4 shadow-md">
                  <h3 className="text-sm sm:text-base font-black text-amber-100 leading-relaxed">
                    {isMr
                      ? quizQuestions[currentQuizIdx].questionMr
                      : quizQuestions[currentQuizIdx].questionEn}
                  </h3>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {(isMr
                      ? quizQuestions[currentQuizIdx].optionsMr
                      : quizQuestions[currentQuizIdx].optionsEn
                    ).map((opt, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === quizQuestions[currentQuizIdx].correctOptionIndex;
                      let optionStyle = 'border-stone-800 bg-stone-900/60 text-stone-200 hover:bg-stone-850';

                      if (isAnswerSubmitted) {
                        if (isCorrect) {
                          optionStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold';
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'border-red-500 bg-red-950/40 text-red-200';
                        }
                      } else if (isSelected) {
                        optionStyle = 'border-amber-500 bg-amber-500/20 text-amber-100 font-bold';
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectQuizOption(idx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-stone-800 text-stone-300 font-bold flex items-center justify-center shrink-0 text-xs">
                              {idx + 1}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isAnswerSubmitted && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                          {isAnswerSubmitted && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit / Next Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    {!isAnswerSubmitted ? (
                      <button
                        type="button"
                        onClick={handleSubmitQuizAnswer}
                        disabled={selectedOption === null}
                        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-black text-xs sm:text-sm transition-all cursor-pointer shadow-md"
                      >
                        उत्तर तपासा (Check Answer)
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNextQuizQuestion}
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs sm:text-sm transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                      >
                        <span>{currentQuizIdx < quizQuestions.length - 1 ? 'पुढील प्रश्न' : 'निकाल पहा'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Detailed Explanation upon submit */}
                  {isAnswerSubmitted && (
                    <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-1 animate-in fade-in duration-200">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                        <HelpCircle className="w-4 h-4 text-amber-400" />
                        <span>सविस्तर स्पष्टीकरण (MPSC Exam Explanation):</span>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {isMr
                          ? quizQuestions[currentQuizIdx].explanationMr
                          : quizQuestions[currentQuizIdx].explanationEn}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Quiz Completion Summary */
              <div className="max-w-md mx-auto bg-stone-950/90 rounded-2xl border border-stone-800 p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-3xl border border-amber-500/40">
                  🏆
                </div>
                <div>
                  <h3 className="text-xl font-black text-stone-100">क्विझ पूर्ण झाली!</h3>
                  <p className="text-xs text-stone-400 mt-1">
                    पंचायत राज विशेष सराव चाचणी निकाल
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="text-3xl font-black text-amber-400">
                    {score} / {quizQuestions.length}
                  </div>
                  <p className="text-xs text-stone-400 mt-1 font-semibold">
                    अचूकता (Accuracy): {Math.round((score / quizQuestions.length) * 100)}%
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      playFx('click');
                      setCurrentQuizIdx((prev) => (prev + 5 < quizQuestions.length ? prev + 5 : 0));
                      setSelectedOption(null);
                      setIsAnswerSubmitted(false);
                      setScore(0);
                      setCompletedQuiz(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 shadow-md"
                  >
                    <Sparkles className="w-4 h-4 text-stone-950" />
                    <span>पुढील टेस्ट (नवीन प्रश्न)</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>पुन्हा सराव करा (Retry)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 5: CHEATSHEET & MEMORY TRICKS */}
        {/* ================================================================= */}
        {activeTab === 'cheatsheet' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
            <div className="space-y-4">
              {PANCHAYATI_RAJ_MEMORY_TRICKS.map((trick, idx) => (
                <div
                  key={idx}
                  className="bg-stone-950/80 rounded-2xl border border-stone-800 p-4 space-y-2 hover:border-amber-500/40 transition-all"
                >
                  <h4 className="text-sm font-black text-amber-200 flex items-center gap-2">
                    <span>💡</span>
                    <span>{isMr ? trick.titleMr : trick.titleEn}</span>
                  </h4>

                  <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-black">
                    {trick.trickFormula}
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    {isMr ? trick.explanationMr : trick.explanationEn}
                  </p>
                </div>
              ))}

              {/* Extra Super Important Exam Facts */}
              <div className="bg-stone-950/70 rounded-2xl border border-stone-800 p-4 space-y-3">
                <h4 className="text-xs font-black text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span>
                  <span>MPSC परीक्षेसाठी टॉप वन-लाइनर्स (Top Exam One-Liners):</span>
                </h4>
                <ul className="space-y-2 text-xs text-stone-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>१ मे १९६२:</strong> महाराष्ट्र जिल्हा परिषद व पंचायत समिती अधिनियम लागू झाला; महाराष्ट्र हे ९ वे राज्य बनले.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>ग्रामसेवक:</strong> ग्रामपंचायतीचा सचिव असतो, तर <strong>सरपंच</strong> हा राजकीय प्रमुख असतो.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>BDO:</strong> पंचायत समितीचा सचिव असतो. BDO हा वर्ग-१/२ राजपत्रित अधिकारी असून MPSC मार्फत निवडला जातो.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>CEO:</strong> जिल्हा परिषदेचा सर्वोच्च प्रशासकीय प्रमुख (IAS संवर्ग). जिल्हाधिकारी (Collector) जि.प. अध्यक्षांच्या अधिकारात ढवळाढवळ करत नाही.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>५०% महिला आरक्षण:</strong> महाराष्ट्राने २०११ मध्ये सर्व स्थानिक स्वराज्य संस्थांमध्ये महिला आरक्षण ५०% केले.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>किमान वय:</strong> स्थानिक स्वराज्य संस्थांच्या निवडणुकीसाठी उमेदवाराचे वय किमान <strong>२१ वर्षे</strong> पूर्ण असावे (कलम २४३ F).</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* MODAL FOOTER */}
        {/* ================================================================= */}
        <div className="p-3.5 sm:p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] text-stone-300">
              {isMr ? 'पंचायत राज विशेष अभ्यास संच अद्ययावत आहे' : 'Panchayati Raj Study Hub is updated'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold transition-all cursor-pointer text-xs"
          >
            {isMr ? 'बंद करा' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
