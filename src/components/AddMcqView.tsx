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
  Award,
  Bookmark,
  Languages,
  Clock,
  Sparkle,
  Info,
  Maximize2
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
import { QUESTIONS_SET_24 } from '../data/questionsSet24';
import { QUESTIONS_SET_25 } from '../data/questionsSet25';
import { QUESTIONS_SET_26 } from '../data/questionsSet26';
import { QUESTIONS_SET_27 } from '../data/questionsSet27';
import { QUESTIONS_SET_28 } from '../data/questionsSet28';
import { QUESTIONS_SET_29 } from '../data/questionsSet29';
import { QUESTIONS_SET_30 } from '../data/questionsSet30';
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
  },
  {
    label: 'मुख्यमंत्री माझी लाडकी बहीण योजना (डीबीटी)',
    subjectId: 'current_affairs' as SubjectId,
    topic: 'महाराष्ट्र शासकीय योजना',
    subtopic: 'महिला सक्षमीकरण व आर्थिक सहाय्य',
    difficulty: 'Moderate' as const,
    exam: 'Both' as const,
    qMr: 'महाराष्ट्र शासनाने महिलांच्या आर्थिक सक्षमीकरणासाठी सुरू केलेल्या "मुख्यमंत्री माझी लाडकी बहीण योजने" अंतर्गत पात्र महिलांना दरमहा किती रुपयांची थेट आर्थिक मदत (DBT) दिली जाते?',
    qEn: 'Under Maharashtra Government\'s "Mukhyamantri Majhi Ladki Bahin Yojana", what monthly financial assistance (DBT) is provided to eligible women?',
    optMr: ['₹ १,५००/- दरमहा', '₹ १,०००/- दरमहा', '₹ २,०००/- दरमहा', '₹ ५००/- दरमहा'],
    optEn: ['₹ 1,500 per month', '₹ 1,000 per month', '₹ 2,000 per month', '₹ 500 per month'],
    ansIdx: 0,
    expMr: 'महाराष्ट्र शासनाच्या २०२४-२५ च्या अर्थसंकल्पात घोषित या योजनेन्वये २१ ते ६५ वर्षे वयोगटातील पात्र महिलांना दरमहा ₹१,५०० थेट बँक खात्यात दिले जातात.',
    expEn: 'Under this scheme, eligible women aged 21-65 receive ₹1,500 directly into their bank accounts monthly.',
    ref: 'महाराष्ट्र शासन राजपत्र / महिला व बालविकास विभाग'
  },
  {
    label: 'दर्पणकार बाळशास्त्री जांभेकर व दिग्दर्शन मासिक',
    subjectId: 'maharashtra_history' as SubjectId,
    topic: 'वृत्तपत्रे व प्रबोधन चळवळ',
    subtopic: 'मराठी पत्रकारिता व पहिले मासिक (१८४०)',
    difficulty: 'Moderate' as const,
    exam: 'Both' as const,
    qMr: 'मराठी वृत्तपत्रसृष्टीचे जनक बाळशास्त्री जांभेकर यांनी ६ जानेवारी १८३२ रोजी "दर्पण" वृत्तपत्र सुरू केल्यानंतर १८४० मध्ये मराठीतील पहिले मासिक कोणत्या नावाने सुरू केले?',
    qEn: 'Which first Marathi monthly magazine was launched by Balshastri Jambhekar in 1840 after starting the newspaper "Darpan" in 1832?',
    optMr: ['दिग्दर्शन (Digdarshan)', 'ज्ञानोदय', 'प्रभाकर', 'विविधज्ञानविस्तार'],
    optEn: ['Digdarshan', 'Dnyanodaya', 'Prabhakar', 'Vividha Dnyan Vistar'],
    ansIdx: 0,
    expMr: 'बाळशास्त्री जांभेकर यांनी मे १८४० मध्ये "दिग्दर्शन" हे मराठीतील पहिले मासिक सुरू केले. ६ जानेवारी हा त्यांचा जन्मदिवस महाराष्ट्रात "पत्रकार दिन" म्हणून साजरा केला जातो.',
    expEn: 'Balshastri Jambhekar launched "Digdarshan" in May 1840 as the first monthly periodical in Marathi.',
    ref: 'आधुनिक महाराष्ट्राचा इतिहास - डॉ. अनिल कठारे / सुधीर फडके'
  },
  {
    label: 'माहितीचा अधिकार अधिनियम २००५ (RTI - ४८ तास कालमर्यादा)',
    subjectId: 'polity' as SubjectId,
    topic: 'माहितीचा अधिकार अधिनियम, २००५ (RTI Act)',
    subtopic: 'जीवित व वैयक्तिक स्वातंत्र्य कलम ७(१)',
    difficulty: 'Moderate' as const,
    exam: 'Both' as const,
    qMr: 'माहितीचा अधिकार अधिनियम, २००५ च्या कलम ७(१) नुसार, जर मागितलेली माहिती एखाद्या व्यक्तीच्या "जीवित किंवा वैयक्तिक स्वातंत्र्याशी" संबंधित असेल, तर जन माहिती अधिकाऱ्याने ती माहिती किती कालावधीत देणे बंधनकारक आहे?',
    qEn: 'Under Section 7(1) of the Right to Information Act 2005, if the requested info concerns the "life or liberty" of a person, within what time period must it be provided?',
    optMr: ['४८ तासांच्या आत (Within 48 hours)', '२४ तासांच्या आत', '७ दिवसांच्या आत', '३० दिवसांच्या आत'],
    optEn: ['Within 48 hours', 'Within 24 hours', 'Within 7 days', 'Within 30 days'],
    ansIdx: 0,
    expMr: 'सर्वसाधारण माहिती ३० दिवसांत देणे आवश्यक असते; मात्र व्यक्तीच्या जीवित किंवा स्वातंत्र्याशी संबंधित माहिती केवळ ४८ तासांच्या आत (Within 48 Hours) देणे बंधनकारक असते.',
    expEn: 'Information concerning the life or liberty of a person must be provided within 48 hours under Section 7(1) of the RTI Act.',
    ref: 'माहितीचा अधिकार अधिनियम, २००५ / डॉ. तुकाराम जाधव'
  }
];

export const AddMcqView: React.FC<AddMcqViewProps> = ({
  language,
  onQuestionAdded,
  totalQuestionsCount
}) => {
  const isMr = language === 'mr';

  const [subjectId, setSubjectId] = useState<SubjectId>('polity');
  const selectedSubject = SUBJECTS.find(s => s.id === subjectId) || SUBJECTS[0];
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

  const [isSaving, setIsSaving] = useState(false);
  const [isBulkSyncing, setIsBulkSyncing] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // Real-time Exam Card Preview states
  const [previewLang, setPreviewLang] = useState<'mr' | 'en'>(language);
  const [previewSelectedOption, setPreviewSelectedOption] = useState<number | null>(null);
  const [previewShowExplanation, setPreviewShowExplanation] = useState<boolean>(true);
  const [isPreviewBookmarked, setIsPreviewBookmarked] = useState<boolean>(false);

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
    setPreviewSelectedOption(null);
    setNotification({
      type: 'info',
      message: isMr ? `नमुना प्रश्न लोड केला: ${preset.label}` : `Loaded template: ${preset.label}`
    });
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
      setPreviewSelectedOption(null);
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
        ...QUESTIONS_SET_24,
        ...QUESTIONS_SET_25,
        ...QUESTIONS_SET_26,
        ...QUESTIONS_SET_27,
        ...QUESTIONS_SET_28,
        ...QUESTIONS_SET_29,
        ...QUESTIONS_SET_30,
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

      {/* Presets Bar */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-stone-800">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-bold text-stone-200">
            {isMr ? 'द्रुत नमुने (Quick Presets)' : 'Quick Question Presets'}
          </span>
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

        {/* ========================================================================= */}
        {/* Real-time Exam Card Preview Section */}
        {/* ========================================================================= */}
        <div className="pt-4 border-t border-stone-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold text-white">
                {isMr ? 'लाईव्ह परीक्षा स्क्रीन प्रिव्ह्यू (Live Exam Screen Preview)' : 'Live Exam Screen Preview'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {isMr ? 'रिअल-टाइम' : 'Real-time'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Language toggle for preview */}
              <button
                type="button"
                onClick={() => setPreviewLang(previewLang === 'mr' ? 'en' : 'mr')}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-stone-800 hover:bg-stone-750 border border-stone-700 rounded-lg text-xs font-bold text-stone-200 cursor-pointer transition-colors"
                title={isMr ? "प्रिव्ह्यू भाषा बदला (मराठी / English)" : "Toggle preview language"}
              >
                <Languages className="w-3.5 h-3.5 text-amber-400" />
                <span>{previewLang === 'mr' ? 'English Preview' : 'मराठी प्रिव्ह्यू'}</span>
              </button>

              {/* Show/Hide Answer & Explanation in preview */}
              <button
                type="button"
                onClick={() => setPreviewShowExplanation(!previewShowExplanation)}
                className={`flex items-center gap-1.5 px-2.5 py-1 border rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  previewShowExplanation
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-stone-800 text-stone-400 border-stone-700 hover:bg-stone-750'
                }`}
                title={isMr ? "उत्तराची तपासणी व स्पष्टीकरण चालू/बंद करा" : "Toggle answer verification & explanation"}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{previewShowExplanation ? (isMr ? 'उत्तर दाखवा: चालू' : 'Key: ON') : (isMr ? 'उत्तर दाखवा: बंद' : 'Key: OFF')}</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-stone-400">
            {isMr 
              ? 'खाली दिलेले कार्ड विद्यार्थी प्रत्यक्ष चाचणी देताना जसे दिसेल हुबेहूब तसेच रिअल-टाइम दाखवते. पर्याय दाबून उत्तराची चाचणी घेऊ शकता.' 
              : 'This live card mirrors how the question will appear in the actual MPSC examination screen. Click options to test selection.'}
          </p>

          {/* Exam Card Simulation (Exact replica of ExamScreen styling) */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-md overflow-hidden text-stone-900 transition-all">
            {/* Simulation Header Bar */}
            <div className="bg-stone-50 border-b border-stone-200 px-4 sm:px-6 py-3 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="bg-stone-900 text-white font-bold text-xs px-2.5 py-1 rounded-md shadow-xs">
                  {previewLang === 'mr' ? 'प्रश्न क्र.' : 'Question'} {totalQuestionsCount + 1}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-200 text-stone-700">
                  {previewLang === 'mr' ? selectedSubject?.nameMr : selectedSubject?.nameEn}
                </span>
                <span className="hidden sm:inline text-xs text-stone-500">
                  • {topic.trim() || (previewLang === 'mr' ? 'घटक / टॉपिक' : 'Topic')}
                </span>
                {subtopic.trim() && (
                  <span className="hidden md:inline text-[11px] text-stone-400">
                    ({subtopic.trim()})
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Bookmark Toggle Simulation */}
                <button
                  type="button"
                  onClick={() => setIsPreviewBookmarked(!isPreviewBookmarked)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors cursor-pointer ${
                    isPreviewBookmarked
                      ? 'bg-amber-50 text-amber-700 border-amber-300'
                      : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
                  }`}
                  title="Bookmark test"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isPreviewBookmarked ? 'fill-amber-600 text-amber-600' : ''}`} />
                  <span>
                    {isPreviewBookmarked
                      ? (previewLang === 'mr' ? 'जतन केले' : 'Saved')
                      : (previewLang === 'mr' ? 'जतन करा' : 'Bookmark')}
                  </span>
                </button>

                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  +२.०० / -०.५०
                </span>

                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                  difficulty === 'Hard'
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : difficulty === 'Moderate'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {difficulty === 'Hard' ? (previewLang === 'mr' ? 'कठीण' : 'Hard') : difficulty === 'Moderate' ? (previewLang === 'mr' ? 'मध्यम' : 'Moderate') : (previewLang === 'mr' ? 'सोपे' : 'Easy')}
                </span>
              </div>
            </div>

            {/* Question Text Area */}
            <div className="p-4 sm:p-6 space-y-5">
              <div className="text-base sm:text-lg font-medium text-stone-900 leading-relaxed whitespace-pre-line min-h-[48px]">
                {previewLang === 'mr'
                  ? (questionMr.trim() || <span className="text-stone-400 italic">येथे मराठीत प्रश्न टाईप केल्यावर तो लाईव्ह दिसेल...</span>)
                  : (questionEn.trim() || questionMr.trim() || <span className="text-stone-400 italic">English question text will appear here as you type...</span>)
                }
              </div>

              {/* 4 Interactive Options */}
              <div className="space-y-3 pt-1">
                {[0, 1, 2, 3].map((optIdx) => {
                  const optTextMr = optionsMr[optIdx]?.trim();
                  const optTextEn = optionsEn[optIdx]?.trim();
                  const displayText = previewLang === 'mr' 
                    ? (optTextMr || optTextEn || `${isMr ? 'पर्याय' : 'Option'} ${optIdx + 1}`) 
                    : (optTextEn || optTextMr || `Option ${optIdx + 1}`);

                  const isSelected = previewSelectedOption === optIdx;
                  const isCorrect = correctAnswerIndex === optIdx;

                  // Highlighting styles
                  let cardStyle = 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50/60';
                  let badgeStyle = 'border-2 border-stone-300 text-stone-600';

                  if (isSelected) {
                    cardStyle = 'border-amber-500 bg-amber-50/60 shadow-xs ring-1 ring-amber-400';
                    badgeStyle = 'bg-amber-600 text-white border-amber-600';
                  }

                  if (previewShowExplanation && isCorrect) {
                    cardStyle = isSelected 
                      ? 'border-emerald-500 bg-emerald-50/80 shadow-xs ring-2 ring-emerald-500' 
                      : 'border-emerald-400 bg-emerald-50/40';
                    badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
                  } else if (previewShowExplanation && isSelected && !isCorrect) {
                    cardStyle = 'border-rose-400 bg-rose-50/60 ring-2 ring-rose-400';
                    badgeStyle = 'bg-rose-600 text-white border-rose-600';
                  }

                  return (
                    <div
                      key={optIdx}
                      onClick={() => setPreviewSelectedOption(isSelected ? null : optIdx)}
                      className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer ${cardStyle}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-colors ${badgeStyle}`}>
                        {optIdx + 1}
                      </div>
                      <div className="flex-1 flex items-center justify-between gap-2">
                        <span className="text-sm sm:text-base text-stone-800 font-medium leading-normal">
                          {displayText}
                        </span>

                        {previewShowExplanation && isCorrect && (
                          <span className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-700" />
                            {previewLang === 'mr' ? 'अचूक उत्तर' : 'Correct'}
                          </span>
                        )}

                        {previewShowExplanation && isSelected && !isCorrect && (
                          <span className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                            ✕ {previewLang === 'mr' ? 'चुकीचे उत्तर' : 'Incorrect'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explanation & Reference Box in Preview */}
              {previewShowExplanation && (
                <div className="mt-4 p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-stone-800 animate-in fade-in-50 duration-200">
                  <div className="flex items-center gap-1.5 text-xs font-black text-amber-800">
                    <Info className="w-4 h-4 text-amber-600" />
                    <span>{previewLang === 'mr' ? 'स्पष्टीकरण व अधिकृत संदर्भ (Official Reference):' : 'Explanation & Official Reference:'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                    {previewLang === 'mr'
                      ? (explanationMr.trim() || <span className="text-stone-400 italic">स्पष्टीकरण टाईप केल्यास येथे स्पष्टीकरण कार्ड दिसेल...</span>)
                      : (explanationEn.trim() || explanationMr.trim() || <span className="text-stone-400 italic">Explanation will appear here...</span>)
                    }
                  </p>
                  {(reference.trim() || exam) && (
                    <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500 font-medium flex-wrap gap-2">
                      <span>
                        📖 {previewLang === 'mr' ? 'संदर्भ' : 'Reference'}: <strong className="text-stone-700">{reference.trim() || 'MPSC Standard References'}</strong>
                      </span>
                      <span className="bg-stone-200 text-stone-700 px-2 py-0.5 rounded font-semibold">
                        🎯 {exam === 'Both' ? 'Rajyaseva & Combine' : exam}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Simulated Action Footer Bar */}
            <div className="bg-stone-50 border-t border-stone-200 p-3 sm:p-4 flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPreviewBookmarked(!isPreviewBookmarked)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-stone-700 font-semibold hover:bg-stone-100 cursor-pointer"
                >
                  {previewLang === 'mr' ? 'पुनरावलोकनासाठी खूण करा' : 'Mark for Review'}
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewSelectedOption(null)}
                  disabled={previewSelectedOption === null}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-stone-700 font-semibold hover:bg-stone-100 cursor-pointer disabled:opacity-40"
                >
                  {previewLang === 'mr' ? 'पर्याय साफ करा' : 'Clear Response'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-stone-500">
                  {previewSelectedOption !== null 
                    ? (previewLang === 'mr' ? `पर्याय ${previewSelectedOption + 1} निवडला आहे` : `Selected Option ${previewSelectedOption + 1}`) 
                    : (previewLang === 'mr' ? 'पर्याय निवडलेला नाही' : 'No option selected')}
                </span>
                <span className="px-3 py-1.5 bg-amber-500 text-stone-950 font-bold rounded-lg shadow-xs">
                  {previewLang === 'mr' ? 'सेव्ह करा व पुढील' : 'Save & Next ➔'}
                </span>
              </div>
            </div>
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
