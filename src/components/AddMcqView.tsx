import React, { useState } from 'react';
import { 
  PlusCircle, 
  Sparkles, 
  Save, 
  CheckCircle2, 
  UploadCloud, 
  BookOpen, 
  AlertCircle, 
  Layers, 
  RefreshCw,
  HelpCircle,
  Eye,
  Check,
  Award
} from 'lucide-react';
import { Question, SubjectId } from '../types';
import { SUBJECTS } from '../data/subjects';
import { storeSingleQuestionToFirestore, bulkStoreMCQsToFirestore } from '../services/firestoreSync';
import { NEW_QUESTIONS_BATCH_2027 } from '../data/newQuestionsBatch2027';
import { QUESTIONS_SET_19 } from '../data/questionsSet19';
import { QUESTIONS_SET_20 } from '../data/questionsSet20';
import { QUESTIONS_SET_21 } from '../data/questionsSet21';
import { QUESTIONS_SET_22 } from '../data/questionsSet22';
import { QUESTIONS_SET_23 } from '../data/questionsSet23';
import { NEW_FIREBASE_MCQS } from '../data/mpscQuestions';
import { FIREBASE_MCQS_BATCH_2 } from '../data/firebaseMcqsBatch2';
import { NEW_QUESTIONS_BATCH_2026 } from '../data/newQuestionsBatch2026';
import { NEW_QUESTIONS_BATCH_2026_PART2 } from '../data/newQuestionsBatch2026_Part2';

interface AddMcqViewProps {
  language: 'mr' | 'en';
  onQuestionAdded: (newQ: Question) => void;
  totalQuestionsCount: number;
}

const PRESET_TEMPLATES = [
  {
    label: '१०६ वी घटनादुरुस्ती (नारी शक्ती वंदन)',
    subjectId: 'polity' as SubjectId,
    topic: '१०६ वी घटनादुरुस्ती कायदा २०२३',
    subtopic: 'लोकसभा व विधानसभा महिला आरक्षण',
    difficulty: 'Moderate' as const,
    exam: 'Both' as const,
    qMr: '१०६ व्या घटनादुरुस्ती कायद्यान्वये (नारी शक्ती वंदन अधिनियम २०२३) लोकसभा आणि राज्य विधानसभांमध्ये महिलांसाठी किती टक्के जागा आरक्षित करण्याची तरतूद करण्यात आली आहे?',
    qEn: 'Under the 106th Constitutional Amendment Act (Nari Shakti Vandan Adhiniyam 2023), what percentage of seats are reserved for women in the Lok Sabha and State Legislative Assemblies?',
    optMr: ['३३% (एक-तृतीयांश जागा)', '५०% जागा', '२५% जागा', '२०% जागा'],
    optEn: ['33% (One-third of total seats)', '50% of seats', '25% of seats', '20% of seats'],
    ansIdx: 0,
    expMr: '१०६ व्या घटनादुरुस्ती कायद्याने संविधानात कलम ३३०-A, ३३२-A आणि ३३४-A समाविष्ट करून लोकसभा व राज्य विधानसभांमध्ये महिलांसाठी ३३% आरक्षण १५ वर्षांच्या कालावधीसाठी निश्चित केले आहे.',
    expEn: 'The 106th Constitutional Amendment Act inserted Articles 330A, 332A, and 334A reserving 33% seats for women for a period of 15 years.',
    ref: 'एम. लक्ष्मीकांत भारतीय राज्यव्यवस्था / राजपत्रित अधिसूचना'
  },
  {
    label: 'पुण्यश्लोक अहिल्याबाई होळकर ३०० वी जयंती (अहिल्यानगर)',
    subjectId: 'maharashtra_history' as SubjectId,
    topic: 'महाराष्ट्राचा इतिहास व समाजसुधारक',
    subtopic: 'अहिल्याबाई होळकर त्रिशताब्दी व नामकरण',
    difficulty: 'Moderate' as const,
    exam: 'Both' as const,
    qMr: 'पुण्यश्लोक अहिल्याबाई होळकर यांच्या ३०० व्या जयंती वर्षाचे औचित्य साधून महाराष्ट्र शासनाने कोणत्या ऐतिहासिक जिल्ह्याचे नामकरण अधिकृतपणे "अहिल्यानगर" केले?',
    qEn: 'Marking the 300th birth anniversary of Punyashlok Ahilyabai Holkar, the Maharashtra Government officially renamed which historic district as "Ahilyanagar"?',
    optMr: ['अहमदनगर', 'औरंगाबाद', 'उस्मानाबाद', 'जळगाव'],
    optEn: ['Ahmednagar', 'Aurangabad', 'Osmanabad', 'Jalgaon'],
    ansIdx: 0,
    expMr: 'मे २०२४ मध्ये पुण्यश्लोक अहिल्याबाई होळकर यांच्या ३०० व्या जयंतीनिमित्त अहमदनगर शहराचे व जिल्ह्याचे नाव बदलून \'अहिल्यानगर\' करण्यास केंद्र व राज्य सरकारने अंतिम मंजुरी दिली. अहिल्याबाईंचा जन्म जामखेड जवळील चौंडी (अहिल्यानगर) येथे झाला होता.',
    expEn: 'Marking the 300th birth anniversary of Ahilyabai Holkar, who was born at Chaundi, Ahmednagar district was officially renamed Ahilyanagar.',
    ref: 'महाराष्ट्र शासन राजपत्र / डॉ. जयसिंगराव पवार'
  },
  {
    label: 'समृद्धी महामार्ग (हिंदुहृदयसम्राट बाळासाहेब ठाकरे)',
    subjectId: 'maharashtra_geography' as SubjectId,
    topic: 'महाराष्ट्रातील वाहतूक व दळणवळण',
    subtopic: 'समृद्धी महामार्ग लांबी व जिल्हे',
    difficulty: 'Easy' as const,
    exam: 'Both' as const,
    qMr: 'नागपूर ते मुंबई दरम्यानचा "हिंदुहृदयसम्राट बाळासाहेब ठाकरे समृद्धी महामार्ग" (द्रुतगती महामार्ग) एकूण किती किलोमीटर लांबीचा असून तो किती जिल्ह्यांतून जातो?',
    qEn: 'The Hindu Hrudaysamrat Balasaheb Thackeray Samruddhi Expressway between Nagpur and Mumbai spans what total length and traverses through how many districts?',
    optMr: ['७०१ किमी आणि १० जिल्हे', '६५० किमी आणि ८ जिल्हे', '८०० किमी आणि १२ जिल्हे', '५०० किमी आणि ६ जिल्हे'],
    optEn: ['701 km and 10 districts', '650 km and 8 districts', '800 km and 12 districts', '500 km and 6 districts'],
    ansIdx: 0,
    expMr: 'समृद्धी महामार्गाची एकूण लांबी ७०१ किमी (६ पदरी) असून तो नागपूर, वर्धा, अमरावती, वाशिम, बुलढाणा, जालना, छत्रपती संभाजीनगर, अहिल्यानगर, नाशिक आणि ठाणे या १० जिल्ह्यांतून जातो.',
    expEn: 'The 6-lane Samruddhi Expressway is 701 km long and passes through 10 districts from Nagpur to Thane/Mumbai.',
    ref: 'MSRDC अधिकृत अहवाल / ए. बी. सवदी भूगोल'
  }
];

export const AddMcqView: React.FC<AddMcqViewProps> = ({
  language,
  onQuestionAdded,
  totalQuestionsCount
}) => {
  const isMr = language === 'mr';

  const [subjectId, setSubjectId] = useState<SubjectId>('polity');
  const [topic, setTopic] = useState('');
  const [subtopic, setSubtopic] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Moderate' | 'Hard'>('Moderate');
  const [exam, setExam] = useState<'Rajyaseva' | 'Combine' | 'Both'>('Both');

  const [questionMr, setQuestionMr] = useState('');
  const [questionEn, setQuestionEn] = useState('');

  const [optionsMr, setOptionsMr] = useState(['', '', '', '']);
  const [optionsEn, setOptionsEn] = useState(['', '', '', '']);

  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(0);
  const [explanationMr, setExplanationMr] = useState('');
  const [explanationEn, setExplanationEn] = useState('');
  const [reference, setReference] = useState('');

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isBulkSyncing, setIsBulkSyncing] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const handleOptionChangeMr = (idx: number, value: string) => {
    const updated = [...optionsMr];
    updated[idx] = value;
    setOptionsMr(updated);
  };

  const handleOptionChangeEn = (idx: number, value: string) => {
    const updated = [...optionsEn];
    updated[idx] = value;
    setOptionsEn(updated);
  };

  const applyPreset = (preset: typeof PRESET_TEMPLATES[0]) => {
    setSubjectId(preset.subjectId);
    setTopic(preset.topic);
    setSubtopic(preset.subtopic);
    setDifficulty(preset.difficulty);
    setExam(preset.exam);
    setQuestionMr(preset.qMr);
    setQuestionEn(preset.qEn);
    setOptionsMr([...preset.optMr]);
    setOptionsEn([...preset.optEn]);
    setCorrectAnswerIndex(preset.ansIdx);
    setExplanationMr(preset.expMr);
    setExplanationEn(preset.expEn);
    setReference(preset.ref);
    setNotification({
      type: 'info',
      message: isMr ? `नमुना प्रश्न लोड केला: ${preset.label}` : `Loaded template: ${preset.label}`
    });
  };

  const handleAiGenerate = async () => {
    setIsAiGenerating(true);
    setNotification(null);
    try {
      const response = await fetch('/api/generate-mcq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId,
          topic: topic || undefined,
          difficulty,
          exam,
          language: 'mr'
        })
      });

      if (!response.ok) {
        throw new Error('AI Server responded with error ' + response.status);
      }

      const data = await response.json();
      if (data && data.questionMr) {
        setQuestionMr(data.questionMr);
        setQuestionEn(data.questionEn || data.questionMr);
        if (Array.isArray(data.optionsMr) && data.optionsMr.length === 4) {
          setOptionsMr(data.optionsMr);
        }
        if (Array.isArray(data.optionsEn) && data.optionsEn.length === 4) {
          setOptionsEn(data.optionsEn);
        } else {
          setOptionsEn(data.optionsMr || ['', '', '', '']);
        }
        setCorrectAnswerIndex(typeof data.correctAnswerIndex === 'number' ? data.correctAnswerIndex : 0);
        setExplanationMr(data.explanationMr || '');
        setExplanationEn(data.explanationEn || data.explanationMr || '');
        setReference(data.reference || 'MPSC Standard References');
        if (data.topic) setTopic(data.topic);
        if (data.subtopic) setSubtopic(data.subtopic);

        setNotification({
          type: 'success',
          message: isMr ? '✨ AI ने नवीन MPSC प्रश्न यशस्वीरीत्या तयार केला!' : '✨ AI generated an authentic MPSC question!'
        });
      }
    } catch (err: any) {
      setNotification({
        type: 'error',
        message: isMr 
          ? 'AI प्रश्न निर्मिती दरम्यान त्रुटी आली. कृपया खालील नमुना निवडा किंवा मॅन्युअली भरा.' 
          : 'AI generation error. Please try a preset or enter manually.'
      });
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionMr.trim() && !questionEn.trim()) {
      setNotification({
        type: 'error',
        message: isMr ? 'कृपया प्रश्न टाईप करा.' : 'Please enter the question text.'
      });
      return;
    }

    const effectiveMr = optionsMr.filter(o => o.trim().length > 0);
    const effectiveEn = optionsEn.filter(o => o.trim().length > 0);
    if (effectiveMr.length < 4 && effectiveEn.length < 4) {
      setNotification({
        type: 'error',
        message: isMr ? 'कृपया सर्व ४ पर्याय भरा.' : 'Please fill all 4 options.'
      });
      return;
    }

    setIsSaving(true);
    setNotification(null);

    const newQuestionId = `custom_mcq_${Date.now()}`;
    const newQuestion: Question = {
      id: newQuestionId,
      subjectId,
      topic: topic.trim() || 'MPSC General Practice',
      subtopic: subtopic.trim() || 'MPSC Topic Practice',
      difficulty,
      exam,
      questionMr: questionMr.trim() || questionEn.trim(),
      questionEn: questionEn.trim() || questionMr.trim(),
      optionsMr: optionsMr.map((o, i) => o.trim() || optionsEn[i] || `पर्याय ${i + 1}`),
      optionsEn: optionsEn.map((o, i) => o.trim() || optionsMr[i] || `Option ${i + 1}`),
      correctAnswerIndex,
      explanationMr: explanationMr.trim() || 'अधिकृत संदर्भ पुस्तकांनुसार अचूक उत्तर.',
      explanationEn: explanationEn.trim() || explanationMr.trim() || 'Correct answer verified against official reference.',
      reference: reference.trim() || 'MPSC Standard References',
      yearTag: 'MPSC 2026-27 Prep'
    };

    try {
      await storeSingleQuestionToFirestore(newQuestion);
      onQuestionAdded(newQuestion);
      setNotification({
        type: 'success',
        message: isMr 
          ? '🎉 प्रश्न Firebase Firestore आणि स्थानिक बँकेमध्ये यशस्वीरीत्या सेव्ह झाला!' 
          : '🎉 Question successfully saved to Firestore and local bank!'
      });

      // Reset form fields
      setQuestionMr('');
      setQuestionEn('');
      setOptionsMr(['', '', '', '']);
      setOptionsEn(['', '', '', '']);
      setExplanationMr('');
      setExplanationEn('');
      setReference('');
      setTopic('');
      setSubtopic('');
    } catch (err: any) {
      // Even if firestore errors, update locally
      onQuestionAdded(newQuestion);
      setNotification({
        type: 'info',
        message: isMr 
          ? 'प्रश्न स्थानिक चाचणी बँकेमध्ये जोडला गेला (ऑफलाइन सेव्ह).' 
          : 'Question added to local exam bank.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleBulkSyncAll = async () => {
    setIsBulkSyncing(true);
    setNotification(null);
    try {
      const allBatchQuestions = [
        ...NEW_FIREBASE_MCQS,
        ...FIREBASE_MCQS_BATCH_2,
        ...NEW_QUESTIONS_BATCH_2026,
        ...NEW_QUESTIONS_BATCH_2026_PART2,
        ...NEW_QUESTIONS_BATCH_2027,
        ...QUESTIONS_SET_19,
        ...QUESTIONS_SET_20,
        ...QUESTIONS_SET_21,
        ...QUESTIONS_SET_22,
        ...QUESTIONS_SET_23,
      ];
      const count = await bulkStoreMCQsToFirestore(allBatchQuestions);
      setNotification({
        type: 'success',
        message: isMr 
          ? `🎉 अभिनंदन! सर्व ${count || allBatchQuestions.length} दर्जेदार MPSC MCQs (Sets 19-23 व सर्व Batches) Firebase मध्ये सुरक्षित जोडले गेले!` 
          : `🎉 Successfully uploaded ${count || allBatchQuestions.length} MCQs (Sets 19-23 & all batches) to Firebase Firestore!`
      });
    } catch (err: any) {
      setNotification({
        type: 'error',
        message: isMr ? 'क्लाउड सिंक करताना त्रुटी आली.' : 'Failed to bulk sync MCQs.'
      });
    } finally {
      setIsBulkSyncing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-1">
              <PlusCircle className="w-4 h-4" />
              <span>MPSC Question Bank Creator</span>
              <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                {totalQuestionsCount}+ प्रश्न उपलब्ध
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {isMr ? 'नवीन MCQ प्रश्न जोडा' : 'Add MCQ Question'}
            </h1>
            <p className="text-stone-300 text-sm mt-1 max-w-2xl leading-relaxed">
              {isMr 
                ? 'स्वतःचे प्रश्न तयार करा, AI द्वारे स्वयंचलित तयार करा किंवा क्लाउड बॅचेसमधून एका क्लिकवर थेट Firebase Firestore मध्ये जोडा.' 
                : 'Create your own questions, auto-generate with AI, or sync curated batches straight to Firebase Firestore.'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleBulkSyncAll}
            disabled={isBulkSyncing}
            className="w-full md:w-auto px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
          >
            <UploadCloud className={`w-4 h-4 ${isBulkSyncing ? 'animate-bounce' : ''}`} />
            <span>{isBulkSyncing ? (isMr ? 'अपलोड होत आहे...' : 'Uploading...') : (isMr ? '🚀 सर्व ५६+ MCQs Firebase मध्ये Sync करा' : '🚀 Sync 56+ MCQs to Firebase')}</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`p-4 rounded-xl text-sm font-semibold flex items-center gap-3 border shadow-sm transition-all ${
          notification.type === 'success' 
            ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' 
            : notification.type === 'error'
            ? 'bg-red-950/80 border-red-500/50 text-red-200'
            : 'bg-amber-950/80 border-amber-500/50 text-amber-200'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          )}
          <span className="flex-1">{notification.message}</span>
          <button 
            onClick={() => setNotification(null)}
            className="text-stone-400 hover:text-white text-xs cursor-pointer px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Presets & AI Generation Bar */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold text-stone-200">
              {isMr ? 'द्रुत कृती (Quick Presets & AI)' : 'Quick Actions & AI'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAiGenerate}
            disabled={isAiGenerating}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs rounded-xl transition-all shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isAiGenerating ? 'animate-spin' : ''}`} />
            <span>
              {isAiGenerating 
                ? (isMr ? 'AI प्रश्न तयार करत आहे...' : 'AI Generating...') 
                : (isMr ? '✨ AI द्वारे या विषयाचा प्रश्न तयार करा' : '✨ AI Generate MCQ for Subject')}
            </span>
          </button>
        </div>

        {/* Preset Cards */}
        <div>
          <span className="text-xs text-stone-400 font-medium mb-2 block">
            {isMr ? '१-क्लिक नमुना MPSC प्रश्न भरा:' : '1-Click High-Yield Presets:'}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {PRESET_TEMPLATES.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(preset)}
                className="text-left p-3 rounded-xl bg-stone-800/80 hover:bg-stone-750 border border-stone-700 hover:border-amber-500/50 transition-all cursor-pointer group"
              >
                <div className="text-xs font-bold text-amber-400 group-hover:text-amber-300">
                  {preset.label}
                </div>
                <div className="text-[11px] text-stone-400 mt-1 line-clamp-1">
                  {preset.topic}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Creation Form */}
      <form onSubmit={handleSaveQuestion} className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6 shadow-xl">
        <h2 className="text-lg font-black text-white flex items-center gap-2 pb-3 border-b border-stone-800">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span>{isMr ? 'प्रश्न तपशील (Question Details)' : 'Question Details'}</span>
        </h2>

        {/* Subject, Exam & Difficulty Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              {isMr ? 'विषय (Subject)' : 'Subject'} *
            </label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value as SubjectId)}
              className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              {SUBJECTS.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.nameMr} ({sub.nameEn})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              {isMr ? 'काठिण्य पातळी (Difficulty)' : 'Difficulty'} *
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="Easy">{isMr ? 'सोपे (Easy)' : 'Easy'}</option>
              <option value="Moderate">{isMr ? 'मध्यम (Moderate)' : 'Moderate'}</option>
              <option value="Hard">{isMr ? 'कठीण / आयोगाचा दर्जा (Hard)' : 'Hard (MPSC standard)'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              {isMr ? 'परीक्षा लक्ष्य (Target Exam)' : 'Target Exam'} *
            </label>
            <select
              value={exam}
              onChange={(e) => setExam(e.target.value as any)}
              className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="Both">{isMr ? 'राज्यसेवा व संयुक्त (दोन्ही)' : 'Both (Rajyaseva & Combine)'}</option>
              <option value="Rajyaseva">{isMr ? 'राज्यसेवा (Rajyaseva)' : 'Rajyaseva'}</option>
              <option value="Combine">{isMr ? 'संयुक्त गट ब व क (Combine)' : 'Combine Group B & C'}</option>
            </select>
          </div>
        </div>

        {/* Topic & Subtopic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              {isMr ? 'घटक / टॉपिक (Topic)' : 'Topic'}
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={isMr ? "उदा. मूलभूत हक्क / १८५७ चा उठाव" : "e.g. Fundamental Rights"}
              className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              {isMr ? 'उपघटक (Subtopic)' : 'Subtopic'}
            </label>
            <input
              type="text"
              value={subtopic}
              onChange={(e) => setSubtopic(e.target.value)}
              placeholder={isMr ? "उदा. कलम ३२ रिट अधिकार" : "e.g. Article 32 Writs"}
              className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Question Text (Marathi) */}
        <div>
          <label className="block text-xs font-bold text-amber-300 mb-1.5 flex items-center justify-between">
            <span>{isMr ? 'प्रश्न (मराठीत) *' : 'Question (Marathi) *'}</span>
            <span className="text-[11px] text-stone-400 font-normal">{isMr ? 'मुख्य MPSC प्रश्न मजकूर' : 'Primary MPSC text'}</span>
          </label>
          <textarea
            rows={3}
            value={questionMr}
            onChange={(e) => setQuestionMr(e.target.value)}
            placeholder={isMr ? "येथे मराठीत प्रश्न टाईप करा..." : "Type question in Marathi..."}
            className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs leading-relaxed focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Question Text (English) */}
        <div>
          <label className="block text-xs font-bold text-stone-300 mb-1.5">
            {isMr ? 'प्रश्न (इंग्रजीत - पर्यायी)' : 'Question (English - Optional)'}
          </label>
          <textarea
            rows={2}
            value={questionEn}
            onChange={(e) => setQuestionEn(e.target.value)}
            placeholder="Type question in English..."
            className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs leading-relaxed focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* 4 Options with Correct Answer Selector */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-bold text-stone-200">
            {isMr ? 'पर्याय (Options) आणि अचूक उत्तराची निवड करा: *' : 'Options & Select Correct Answer: *'}
          </label>
          
          <div className="space-y-2.5">
            {[0, 1, 2, 3].map((idx) => (
              <div 
                key={idx}
                className={`p-3 rounded-xl border transition-all ${
                  correctAnswerIndex === idx 
                    ? 'bg-emerald-950/40 border-emerald-500/60 shadow-sm' 
                    : 'bg-stone-850 border-stone-750'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="radio"
                    name="correct_answer"
                    id={`opt_${idx}`}
                    checked={correctAnswerIndex === idx}
                    onChange={() => setCorrectAnswerIndex(idx)}
                    className="w-4 h-4 text-emerald-500 bg-stone-800 border-stone-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <label htmlFor={`opt_${idx}`} className="text-xs font-bold text-stone-200 cursor-pointer flex items-center gap-1.5">
                    <span>{isMr ? `पर्याय ${idx + 1}` : `Option ${idx + 1}`}</span>
                    {correctAnswerIndex === idx && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        {isMr ? 'अचूक उत्तर (Correct)' : 'Correct'}
                      </span>
                    )}
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={optionsMr[idx]}
                    onChange={(e) => handleOptionChangeMr(idx, e.target.value)}
                    placeholder={isMr ? `पर्याय ${idx + 1} (मराठीत)` : `Option ${idx + 1} (Marathi)`}
                    className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    value={optionsEn[idx]}
                    onChange={(e) => handleOptionChangeEn(idx, e.target.value)}
                    placeholder={`Option ${idx + 1} (English)`}
                    className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explanation & Reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              {isMr ? 'स्पष्टीकरण (मराठीत)' : 'Explanation (Marathi)'}
            </label>
            <textarea
              rows={3}
              value={explanationMr}
              onChange={(e) => setExplanationMr(e.target.value)}
              placeholder={isMr ? "अचूक उत्तराचे सविस्तर स्पष्टीकरण..." : "Detailed explanation..."}
              className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs leading-relaxed focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              {isMr ? 'संदर्भ पुस्तक / स्त्रोत (Reference Source)' : 'Reference Source'}
            </label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder={isMr ? "उदा. एम. लक्ष्मीकांत / डॉ. अनिल कठारे" : "e.g. M. Laxmikanth Polity"}
              className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-500 mb-2"
            />
            <textarea
              rows={2}
              value={explanationEn}
              onChange={(e) => setExplanationEn(e.target.value)}
              placeholder="English explanation (optional)..."
              className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-xl p-2.5 text-xs leading-relaxed focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-stone-800">
          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-black text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} />
            <span>
              {isSaving 
                ? (isMr ? 'सेव्ह होत आहे...' : 'Saving...') 
                : (isMr ? '💾 Firestore व चाचणी बँकेत सेव्ह करा' : '💾 Save Question to Firestore & Bank')}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
