import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileText, 
  Play, 
  Award, 
  CheckCircle2, 
  Calendar, 
  BookOpen, 
  ChevronRight, 
  Search, 
  Filter, 
  Flame, 
  Check, 
  ArrowLeft, 
  Eye, 
  CheckCircle, 
  HelpCircle, 
  BookMarked, 
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { ExamPatternId, Question } from '../types';
import { soundFx } from '../utils/audio';
import { VisualMemoryAid } from './VisualMemoryAid';
import { MPSC_COMBINE_PRE_2026_FULL_100 } from '../data/mpscCombinePre2026';
import { MPSC_PYQ_2024_FULL_100 } from '../data/mpscPyq2024';
import { MPSC_PYQ_2023_GS } from '../data/mpscPyq2023';
import { MPSC_COMBINE_PRE_2023 } from '../data/mpscCombinePre2023';
import { MPSC_COMBINE_PRE_2022_FULL_100 } from '../data/mpscCombinePre2022';
import { MPSC_COMBINE_PRE_2021 } from '../data/mpscCombinePre2021';
import { MPSC_COMBINE_PRE_2020 } from '../data/mpscCombinePre2020';
import { MPSC_PYQ_2022 } from '../data/mpscPyq2022';
import { MPSC_COMBINE_MAINS_PYQ } from '../data/mpscCombineMainsPyq';
import { MPSC_GROUP_C_PYQ } from '../data/mpscGroupCPyq';
import { MPSC_RAJYASEVA_PRE_2025 } from '../data/mpscRajyasevaPre2025';
import { MPSC_COMBINE_PRE_2025 } from '../data/mpscCombinePre2025';
import { MPSC_RAJYASEVA_PRE_2021 } from '../data/mpscRajyasevaPre2021';
import { MPSC_RAJYASEVA_PRE_2020 } from '../data/mpscRajyasevaPre2020';
import { MPSC_COMBINE_PRE_2019, MPSC_RAJYASEVA_PRE_2019 } from '../data/mpscPyq2019';
import { MPSC_COMBINE_PRE_2018, MPSC_RAJYASEVA_PRE_2018 } from '../data/mpscPyq2018';
import { ENGLISH_VOCAB_QUESTIONS } from '../data/englishVocabQuestions';
import { MARATHI_VOCAB_QUESTIONS } from '../data/marathiVocabQuestions';

interface MpscPyqHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'mr' | 'en';
  onStartExam: (patternId: ExamPatternId, subjectId?: any, title?: string) => void;
  questionsPool?: Question[];
  initialYear?: number | 'all';
}

export interface OfficialPaperMeta {
  id: string;
  patternId: ExamPatternId;
  year?: number;
  titleMr: string;
  titleEn: string;
  examDate: string;
  category: 'rajyaseva' | 'combine' | 'psi';
  categoryLabelMr: string;
  categoryLabelEn: string;
  bookletCode: string;
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  negativeMarking: string;
  descriptionMr: string;
  descriptionEn: string;
  tagsMr: string[];
  tagsEn: string[];
  questions: Question[];
}

export const OFFICIAL_PAPERS_CATALOG: OfficialPaperMeta[] = [
  {
    id: 'mpsc_combine_prelims_2026_official',
    patternId: 'mpsc_combine_pre_2026',
    year: 2026,
    titleMr: 'MPSC गट-ब (अराजपत्रित) सेवा संयुक्त पूर्व परीक्षा २०२६ (१४ जून २०२६)',
    titleEn: 'MPSC Non-Gazetted Group B Combined Prelims Exam 2026 (14 June 2026)',
    examDate: '१४ जून २०२६',
    category: 'combine',
    categoryLabelMr: 'गट-ब संयुक्त पूर्व २०२६',
    categoryLabelEn: 'Group B Prelims 2026',
    bookletCode: 'H25 (संच A)',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    descriptionMr: 'महाराष्ट्र लोकसेवा आयोगाने १४ जून २०२६ रोजी घेतलेली अधिकृत प्रश्नपत्रिका (प्रश्नपुस्तिका H25, संच A, जाहिरात क्र. ०११/२०२६). पूर्ण १०० प्रश्न, २८ जून २०२६ ची अधिकृत उत्तरतालिका आणि प्रत्येक प्रश्नाचे सविस्तर संदर्भ स्पष्टीकरण व गणितीय पायऱ्या.',
    descriptionEn: 'Official MPSC Group B Combined Prelims Question Paper (Booklet H25, Set A) conducted on 14 June 2026 with Final Official Answer Key (28 June 2026) and in-depth step-by-step solutions.',
    tagsMr: ['अधिकृत PYQ', 'पूर्ण १०० प्रश्न', '६० मिनिटे', '१०० गुण', 'अंतिम की'],
    tagsEn: ['Official PYQ', '100 Questions', '60 Mins', '100 Marks', 'Final Key'],
    questions: MPSC_COMBINE_PRE_2026_FULL_100
  },
  {
    id: 'mpsc_rajyaseva_prelims_2025_p1',
    patternId: 'mpsc_rajyaseva_pre_2025',
    year: 2025,
    titleMr: 'MPSC राजपत्रित नागरी सेवा संयुक्त (पूर्व) परीक्षा २०२५ (पेपर १ - GS)',
    titleEn: 'MPSC Gazetted Civil Services Combined Prelims 2025 (Paper 1 - GS)',
    examDate: '२०२५ अधिकृत',
    category: 'rajyaseva',
    categoryLabelMr: 'राज्यसेवा पूर्व २०२५',
    categoryLabelEn: 'Rajyaseva Prelims 2025',
    bookletCode: 'GS25 (संच A)',
    totalQuestions: MPSC_RAJYASEVA_PRE_2025.length,
    totalMarks: MPSC_RAJYASEVA_PRE_2025.length * 2,
    durationMinutes: 120,
    negativeMarking: '१/४ (०.५० गुण वजा)',
    descriptionMr: 'महाराष्ट्र लोकसेवा आयोगाने २०२५ च्या नागरी सेवेसाठी घेतलेली अधिकृत प्रश्नपत्रिका. नारी शक्ती वंदन अधिनियम, नवीन तीन फौजदारी संहिता (BNS), १६ वा वित्त आयोग, वाढवण महाबंदर, अहिल्यानगर व मराठी अभिजात भाषेवरील सर्व प्रश्न.',
    descriptionEn: 'Official MPSC Civil Services Prelims 2025 Paper 1 (General Studies) covering 106th CAA, Bharatiya Nyaya Sanhita, 16th Finance Commission, Vadhavan Port, and Classical Marathi language status.',
    tagsMr: ['राज्यसेवा २०२५', 'GS पेपर १', 'नवीन कायदे', 'अभिजात मराठी', '१२० मिनिटे'],
    tagsEn: ['Rajyaseva 2025', 'GS Paper 1', 'BNS Codes', '120 Mins', 'Classical Marathi'],
    questions: MPSC_RAJYASEVA_PRE_2025
  },
  {
    id: 'mpsc_combine_prelims_2025_official',
    patternId: 'mpsc_combine_pre_2025',
    year: 2025,
    titleMr: 'MPSC अराजपत्रित गट-ब व गट-क संयुक्त पूर्व परीक्षा २०२५ (PSI, STI, ASO व कर सहाय्यक)',
    titleEn: 'MPSC Non-Gazetted Group B & C Combined Prelims Exam 2025 (PSI, STI, ASO)',
    examDate: '२०२५ अधिकृत',
    category: 'combine',
    categoryLabelMr: 'गट-ब व क संयुक्त २०२५',
    categoryLabelEn: 'Group B & C Prelims 2025',
    bookletCode: 'K25 (संच A)',
    totalQuestions: MPSC_COMBINE_PRE_2025.length,
    totalMarks: MPSC_COMBINE_PRE_2025.length,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    descriptionMr: 'महाराष्ट्र लोकसेवा आयोग गट-ब व गट-क संयुक्त पूर्व परीक्षा २०२५. राज्यघटना (उपराष्ट्रपती कलम ६४), १८५७ चा कोल्हापूर उठाव, सह्याद्री घाट, निकटदृष्टिता, RBI मौद्रिक धोरण समिती आणि अंकगणित बुद्धिमत्ता यांचे अधिकृत प्रश्न.',
    descriptionEn: 'Official MPSC Group B & C Combined Prelims 2025 covering Polity, Maharashtra History (Kolhapur 1857), Geography, Science, RBI MPC, and Reasoning.',
    tagsMr: ['संयुक्त पूर्व २०२५', 'गट-ब व क', '६० मिनिटे', 'अधिकृत उत्तरतालिका'],
    tagsEn: ['Combine 2025', 'Group B & C', '60 Mins', 'Official Key'],
    questions: MPSC_COMBINE_PRE_2025
  },
  {
    id: 'mpsc_rajyaseva_prelims_2024_p1',
    patternId: 'mpsc_pyq_2024',
    year: 2024,
    titleMr: 'MPSC राजपत्रित नागरी सेवा संयुक्त (पूर्व) परीक्षा २०२४ (पेपर १ - GS)',
    titleEn: 'MPSC Gazetted Civil Services Combined Prelims 2024 (Paper 1 - GS)',
    examDate: '०१ डिसेंबर २०२४',
    category: 'rajyaseva',
    categoryLabelMr: 'राज्यसेवा पूर्व २०२४',
    categoryLabelEn: 'Rajyaseva Prelims 2024',
    bookletCode: 'W18 (संच A)',
    totalQuestions: 100,
    totalMarks: 200,
    durationMinutes: 120,
    negativeMarking: '१/४ (०.५० गुण वजा)',
    descriptionMr: 'महाराष्ट्र लोकसेवा आयोगाने १ डिसेंबर २०२४ रोजी घेतलेली अधिकृत प्रश्नपत्रिका. इतिहास, भूगोल, राज्यघटना, अर्थव्यवस्था, विज्ञान, पर्यावरण आणि चालू घडामोडी या सर्व विषयांचे १०० प्रश्न अधिकृत उत्तरतालिकेसह.',
    descriptionEn: 'Official MPSC question paper conducted on 01 Dec 2024 covering History, Geography, Polity, Economy, Science, Environment, and Current Affairs with official answer key.',
    tagsMr: ['अधिकृत PYQ', 'पूर्ण १०० प्रश्न', '१२० मिनिटे', '२०० गुण'],
    tagsEn: ['Official PYQ', '100 Questions', '120 Mins', '200 Marks'],
    questions: MPSC_PYQ_2024_FULL_100
  },
  {
    id: 'mpsc_rajyaseva_prelims_2023_p1',
    patternId: 'mpsc_pyq_2023',
    year: 2023,
    titleMr: 'MPSC राजपत्रित नागरी सेवा संयुक्त (पूर्व) परीक्षा २०२३ (पेपर १ - GS)',
    titleEn: 'MPSC Gazetted Civil Services Combined Prelims 2023 (Paper 1 - GS)',
    examDate: '०४ जून २०२३',
    category: 'rajyaseva',
    categoryLabelMr: 'राज्यसेवा पूर्व २०२३',
    categoryLabelEn: 'Rajyaseva Prelims 2023',
    bookletCode: 'P23 (संच A)',
    totalQuestions: 100,
    totalMarks: 200,
    durationMinutes: 120,
    negativeMarking: '१/४ (०.५० गुण वजा)',
    descriptionMr: '४ जून २०२३ रोजी आयोजित राज्यसेवा पूर्व परीक्षेतील सामान्य अध्ययन पेपर-१ मधील प्रश्न, इतिहास, राज्यघटना, विज्ञान आणि अर्थशास्त्राचे सविस्तर स्पष्टीकरण.',
    descriptionEn: 'Official Rajyaseva Prelims 2023 General Studies Paper 1 covering History, Polity, Science, Environment, and Economics with detailed references.',
    tagsMr: ['राज्यसेवा २०२३', 'GS पेपर १', 'अधिकृत की', 'सविस्तर स्पष्टीकरण'],
    tagsEn: ['Rajyaseva 2023', 'GS Paper 1', 'Official Key', 'Detailed Solutions'],
    questions: MPSC_PYQ_2023_GS
  },
  {
    id: 'mpsc_combine_prelims_2023',
    patternId: 'mpsc_combine_pre_2023',
    year: 2023,
    titleMr: 'MPSC अराजपत्रित गट-ब व गट-क संयुक्त पूर्व परीक्षा २०२३ (३० एप्रिल २०२३)',
    titleEn: 'MPSC Non-Gazetted Group B & C Combined Prelims Exam 2023 (30 April 2023)',
    examDate: '३० एप्रिल २०२३',
    category: 'combine',
    categoryLabelMr: 'संयुक्त पूर्व (गट-ब व क) २०२३',
    categoryLabelEn: 'Combine Prelims (Group B & C) 2023',
    bookletCode: 'B23 (संच A)',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    descriptionMr: 'ऐतिहासिक ३० एप्रिल २०२३ रोजी पार पडलेली गट-ब व गट-क संयुक्त पूर्व परीक्षा. इतिहास, भूगोल, राज्यशास्त्र, अर्थव्यवस्था, सामान्य विज्ञान, अंकगणित व बुद्धिमत्ता यांचे प्रश्न.',
    descriptionEn: 'Milestone Group B & C unified preliminary exam held on 30 April 2023. Covers History, Geography, Polity, Economy, Science, Math & Reasoning.',
    tagsMr: ['३० एप्रिल २०२३', 'गट-ब व क', '६० मिनिटे', '१०० प्रश्न'],
    tagsEn: ['30 April 2023', 'Group B & C', '60 Mins', '100 Questions'],
    questions: MPSC_COMBINE_PRE_2023
  },
  {
    id: 'mpsc_combine_prelims_2022_official',
    patternId: 'mpsc_combine_pre_2022',
    year: 2022,
    titleMr: 'MPSC दुय्यम सेवा गट-ब (अराजपत्रित) संयुक्त पूर्व परीक्षा २०२२ (०८ ऑक्टोबर २०२२)',
    titleEn: 'MPSC Subordinate Services Group B Combined Prelims Exam 2022 (08 Oct 2022)',
    examDate: '०८ ऑक्टोबर २०२२',
    category: 'combine',
    categoryLabelMr: 'गट-ब संयुक्त पूर्व २०२२',
    categoryLabelEn: 'Group B Prelims 2022',
    bookletCode: 'A16 (संच A)',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    descriptionMr: 'महाराष्ट्र लोकसेवा आयोगाने ०८ ऑक्टोबर २०२२ रोजी घेतलेली मूळ प्रश्नपत्रिका (प्रश्नपुस्तिका A16, संच A). १०० प्रश्न, आयोगाची अंतिम अधिकृत उत्तरतालिका (३० नोव्हेंबर २०२२) आणि प्रत्येक प्रश्नाचे सविस्तर संदर्भ स्पष्टीकरण.',
    descriptionEn: 'Official MPSC Group B Combined Prelims Question Paper (Booklet A16, Set A) conducted on 08 October 2022 with Final Official Answer Key and in-depth step-by-step solutions.',
    tagsMr: ['अधिकृत PYQ', 'पूर्ण १०० प्रश्न', '६० मिनिटे', '१०० गुण', 'अंतिम की'],
    tagsEn: ['Official PYQ', '100 Questions', '60 Mins', '100 Marks', 'Final Key'],
    questions: MPSC_COMBINE_PRE_2022_FULL_100
  },
  {
    id: 'mpsc_combine_prelims_2021',
    patternId: 'mpsc_combine_pre_2021',
    year: 2021,
    titleMr: 'MPSC दुय्यम सेवा गट-ब (अराजपत्रित) संयुक्त पूर्व परीक्षा २०२१ (२६ फेब्रुवारी २०२२)',
    titleEn: 'MPSC Subordinate Services Group B Combined Prelims Exam 2021 (26 Feb 2022)',
    examDate: '२६ फेब्रुवारी २०२२',
    category: 'combine',
    categoryLabelMr: 'गट-ब संयुक्त पूर्व २०२१',
    categoryLabelEn: 'Group B Prelims 2021',
    bookletCode: 'U14 (संच A)',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    descriptionMr: 'आयोगाने २६ फेब्रुवारी २०२२ रोजी घेतलेली गट-ब संयुक्त पूर्व परीक्षा. पंचायत राज, इतिहास, भूगोल, सामान्य विज्ञान व अर्थव्यवस्था या सर्व विषयांचे अधिकृत प्रश्न व संदर्भ स्पष्टीकरण.',
    descriptionEn: 'MPSC Group B Combined Prelims held on 26 Feb 2022 with Official Key and detailed references for Polity, Geography, History, and Science.',
    tagsMr: ['२६ फेब्रु २०२२', 'गट-ब पूर्व २०२१', '६० मिनिटे', '१०० प्रश्न'],
    tagsEn: ['26 Feb 2022', 'Group B Prelims', '60 Mins', '100 Questions'],
    questions: MPSC_COMBINE_PRE_2021
  },
  {
    id: 'mpsc_rajyaseva_prelims_2021_p1',
    patternId: 'mpsc_rajyaseva_pre_2021',
    year: 2021,
    titleMr: 'MPSC राज्यसेवा पूर्व परीक्षा २०२१ (२३ जानेवारी २०२२) - पेपर १ (GS)',
    titleEn: 'MPSC Rajyaseva Prelims Exam 2021 (23 Jan 2022) - Paper 1 (GS)',
    examDate: '२३ जानेवारी २०२२',
    category: 'rajyaseva',
    categoryLabelMr: 'राज्यसेवा पूर्व २०२१',
    categoryLabelEn: 'Rajyaseva Prelims 2021',
    bookletCode: 'GS21 (संच A)',
    totalQuestions: MPSC_RAJYASEVA_PRE_2021.length,
    totalMarks: MPSC_RAJYASEVA_PRE_2021.length * 2,
    durationMinutes: 120,
    negativeMarking: '१/४ (०.५० गुण वजा)',
    descriptionMr: '२३ जानेवारी २०२२ रोजी आयोगातर्फे घेण्यात आलेली अधिकृत राज्यसेवा पूर्व परीक्षा २०२१ (सामान्य अध्ययन पेपर १). कॅग, आद्य पत्रकार बाळशास्त्री जांभेकर, जायकवाडी नाथसागर, गाडगीळ समिती, रक्तगट, FRBM २००३, १०२ वी घटनादुरुस्ती, शारदा सदन, लिगो-इंडिया, सायलोझिझम, नदी जलविभाजक आणि केशवानंद भारती खटला यावरील अधिकृत प्रश्न.',
    descriptionEn: 'Official MPSC Rajyaseva Prelims 2021 Paper 1 (General Studies) conducted on 23 Jan 2022 with detailed bilingual solutions, covering CAG, Balshastri Jambhekar, Jayakwadi Nathsagar, Gadgil Panel, Blood groups, FRBM Act, 102nd CAA, Sharada Sadan, LIGO-India, River Divides, and Basic Structure Doctrine.',
    tagsMr: ['राज्यसेवा २०२१', 'GS पेपर १', 'अधिकृत उत्तरतालिका', '१२० मिनिटे', 'सविस्तर विश्लेषण'],
    tagsEn: ['Rajyaseva 2021', 'GS Paper 1', 'Official Key', '120 Mins', 'Detailed Solutions'],
    questions: MPSC_RAJYASEVA_PRE_2021
  },
  {
    id: 'mpsc_rajyaseva_prelims_2020_p1',
    patternId: 'mpsc_rajyaseva_pre_2020',
    year: 2020,
    titleMr: 'MPSC राज्यसेवा पूर्व परीक्षा २०२० (२१ मार्च २०२१) - पेपर १ (GS)',
    titleEn: 'MPSC Rajyaseva Prelims Exam 2020 (21 March 2021) - Paper 1 (GS)',
    examDate: '२१ मार्च २०२१',
    category: 'rajyaseva',
    categoryLabelMr: 'राज्यसेवा पूर्व २०२०',
    categoryLabelEn: 'Rajyaseva Prelims 2020',
    bookletCode: 'GS20 (संच A)',
    totalQuestions: MPSC_RAJYASEVA_PRE_2020.length,
    totalMarks: MPSC_RAJYASEVA_PRE_2020.length * 2,
    durationMinutes: 120,
    negativeMarking: '१/४ (०.५० गुण वजा)',
    descriptionMr: '२१ मार्च २०२१ रोजी आयोगातर्फे घेण्यात आलेली अधिकृत राज्यसेवा पूर्व परीक्षा २०२० (सामान्य अध्ययन पेपर १). रिट अधिकार (कलम ३२ व २२६), छत्रपती शाहू महाराज प्राथमिक शिक्षण कायदा १९१७, सह्याद्री शिखरांचा क्रम, प्रकाशाचे पूर्ण आंतरिक परावर्तन (TIR), सुरेश तेंडुलकर दारिद्र्य समिती २००९, मॉन्ट्रियल प्रोटोकॉल १९८७, सरकारिया आयोग १९८३, डिप्रेस्ड क्लासेस मिशन १९०६, pH स्केल, नीती आयोग आणि वासुदेव बळवंत फडके उठाव यावरील मूळ प्रश्न.',
    descriptionEn: 'Official MPSC Rajyaseva Prelims 2020 Paper 1 (General Studies) conducted on 21 March 2021 with comprehensive bilingual solutions, covering Writs (Art 32/226), Shahu Maharaj Education Act 1917, Sahyadri Peak elevation order, Total Internal Reflection (TIR), Tendulkar Poverty Committee, Montreal Protocol 1987, Sarkaria Commission, Depressed Classes Mission, pH scale, NITI Aayog, and Vasudev Balwant Phadke revolt.',
    tagsMr: ['राज्यसेवा २०२०', 'GS पेपर १', 'अधिकृत उत्तरतालिका', '१२० मिनिटे', 'सविस्तर विश्लेषण'],
    tagsEn: ['Rajyaseva 2020', 'GS Paper 1', 'Official Key', '120 Mins', 'Detailed Solutions'],
    questions: MPSC_RAJYASEVA_PRE_2020
  },
  {
    id: 'mpsc_combine_prelims_2020',
    patternId: 'mpsc_combine_pre_2020',
    year: 2020,
    titleMr: 'MPSC दुय्यम सेवा गट-ब (अराजपत्रित) संयुक्त पूर्व परीक्षा २०२० (०४ सप्टेंबर २०२१)',
    titleEn: 'MPSC Subordinate Services Group B Combined Prelims Exam 2020 (04 Sept 2021)',
    examDate: '०४ सप्टेंबर २०२१',
    category: 'combine',
    categoryLabelMr: 'गट-ब संयुक्त पूर्व २०२०',
    categoryLabelEn: 'Group B Prelims 2020',
    bookletCode: 'A14 (संच A)',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    descriptionMr: 'आयोगाने ४ सप्टेंबर २०२१ रोजी घेतलेली गट-ब संयुक्त पूर्व परीक्षा. समाजसुधारक, भारतीय राज्यघटना, आधुनिक भारताचा इतिहास आणि विज्ञान विश्लेषणासह.',
    descriptionEn: 'MPSC Group B Combined Prelims conducted on 04 Sept 2021 covering Maharashtra History, Polity, Geography, Economics, and Science.',
    tagsMr: ['०४ सप्टें २०२१', 'गट-ब पूर्व २०२०', '६० मिनिटे', '१०० प्रश्न'],
    tagsEn: ['04 Sept 2021', 'Group B Prelims', '60 Mins', '100 Questions'],
    questions: MPSC_COMBINE_PRE_2020
  },
  {
    id: 'mpsc_combine_prelims_2019_official',
    patternId: 'mpsc_combine_pre_2019',
    year: 2019,
    titleMr: 'MPSC दुय्यम सेवा गट-ब (अराजपत्रित) संयुक्त पूर्व परीक्षा २०१९ (२४ मार्च २०१९)',
    titleEn: 'MPSC Subordinate Services Group B Combined Prelims Exam 2019 (24 March 2019)',
    examDate: '२४ मार्च २०१९',
    category: 'combine',
    categoryLabelMr: 'गट-ब संयुक्त पूर्व २०१९',
    categoryLabelEn: 'Group B Prelims 2019',
    bookletCode: 'A12 (संच A)',
    totalQuestions: MPSC_COMBINE_PRE_2019.length,
    totalMarks: MPSC_COMBINE_PRE_2019.length,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    descriptionMr: 'महाराष्ट्र लोकसेवा आयोगाने २४ मार्च २०१९ रोजी घेतलेली गट-ब संयुक्त पूर्व परीक्षा. अंदाज समिती, महर्षी कर्वे अनाथ बालिकाश्रम, महाधिवक्ता कलम १६५, गोदावरी खोरे व सायन्सचे मूळ प्रश्न.',
    descriptionEn: 'Official MPSC Group B Combined Prelims Exam held on 24 March 2019 with Final Official Key, covering Estimates Committee, Maharshi Karve, Advocate General, and Science.',
    tagsMr: ['२४ मार्च २०१९', 'गट-ब पूर्व २०१९', '६० मिनिटे', 'अधिकृत उत्तरतालिका'],
    tagsEn: ['24 March 2019', 'Group B Prelims', '60 Mins', 'Official Key'],
    questions: MPSC_COMBINE_PRE_2019
  },
  {
    id: 'mpsc_rajyaseva_prelims_2019_p1',
    patternId: 'mpsc_rajyaseva_pre_2019',
    year: 2019,
    titleMr: 'MPSC राज्यसेवा पूर्व परीक्षा २०१९ (१७ फेब्रुवारी २०१९) - पेपर १ (GS)',
    titleEn: 'MPSC Rajyaseva Prelims Exam 2019 (17 Feb 2019) - Paper 1 (GS)',
    examDate: '१७ फेब्रुवारी २०१९',
    category: 'rajyaseva',
    categoryLabelMr: 'राज्यसेवा पूर्व २०१९',
    categoryLabelEn: 'Rajyaseva Prelims 2019',
    bookletCode: 'GS19 (संच A)',
    totalQuestions: MPSC_RAJYASEVA_PRE_2019.length,
    totalMarks: MPSC_RAJYASEVA_PRE_2019.length * 2,
    durationMinutes: 120,
    negativeMarking: '१/३ (०.६६ गुण वजा)',
    descriptionMr: '१७ फेब्रुवारी २०१९ रोजी झालेली अधिकृत राज्यसेवा पूर्व परीक्षा पेपर १ (सामान्य अध्ययन). मूलभूत हक्क, राज्य धोरणाची मार्गदर्शक तत्वे, राष्ट्रीय उत्पन्न, आणि पर्यावरण परिषदांचे अस्सल प्रश्न.',
    descriptionEn: 'Official MPSC Rajyaseva Prelims 2019 Paper 1 (General Studies) with official key and comprehensive solutions.',
    tagsMr: ['राज्यसेवा २०१९', 'GS पेपर १', 'अधिकृत उत्तरतालिका', '१२० मिनिटे'],
    tagsEn: ['Rajyaseva 2019', 'GS Paper 1', 'Official Key', '120 Mins'],
    questions: MPSC_RAJYASEVA_PRE_2019
  },
  {
    id: 'mpsc_combine_prelims_2018_official',
    patternId: 'mpsc_combine_pre_2018',
    year: 2018,
    titleMr: 'MPSC दुय्यम सेवा गट-ब (अराजपत्रित) संयुक्त पूर्व परीक्षा २०१८ (१३ मे २०१८)',
    titleEn: 'MPSC Subordinate Services Group B Combined Prelims Exam 2018 (13 May 2018)',
    examDate: '१३ मे २०१८',
    category: 'combine',
    categoryLabelMr: 'गट-ब संयुक्त पूर्व २०१८',
    categoryLabelEn: 'Group B Prelims 2018',
    bookletCode: 'A10 (संच A)',
    totalQuestions: MPSC_COMBINE_PRE_2018.length,
    totalMarks: MPSC_COMBINE_PRE_2018.length,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    descriptionMr: 'महाराष्ट्र लोकसेवा आयोगाने १३ मे २०१८ रोजी घेतलेली मूळ गट-ब संयुक्त पूर्व परीक्षा. राज्यपाल (७ वी घटनादुरुस्ती), बाळशास्त्री जांभेकर - दर्पण (१८३२), महाराष्ट्रातील नद्या व खनिजे यांचे अधिकृत प्रश्न.',
    descriptionEn: 'Official MPSC Group B Combined Prelims Exam held on 13 May 2018 with Final Official Key, covering Governor provisions, Balshastri Jambhekar, and Geography.',
    tagsMr: ['१३ मे २०१८', 'गट-ब पूर्व २०१८', '६० मिनिटे', 'अधिकृत उत्तरतालिका'],
    tagsEn: ['13 May 2018', 'Group B Prelims', '60 Mins', 'Official Key'],
    questions: MPSC_COMBINE_PRE_2018
  },
  {
    id: 'mpsc_rajyaseva_prelims_2018_p1',
    patternId: 'mpsc_rajyaseva_pre_2018',
    year: 2018,
    titleMr: 'MPSC राज्यसेवा पूर्व परीक्षा २०१८ (०८ एप्रिल २०१८) - पेपर १ (GS)',
    titleEn: 'MPSC Rajyaseva Prelims Exam 2018 (08 April 2018) - Paper 1 (GS)',
    examDate: '०८ एप्रिल २०१८',
    category: 'rajyaseva',
    categoryLabelMr: 'राज्यसेवा पूर्व २०१८',
    categoryLabelEn: 'Rajyaseva Prelims 2018',
    bookletCode: 'GS18 (संच A)',
    totalQuestions: MPSC_RAJYASEVA_PRE_2018.length,
    totalMarks: MPSC_RAJYASEVA_PRE_2018.length * 2,
    durationMinutes: 120,
    negativeMarking: '१/३ (०.६६ गुण वजा)',
    descriptionMr: '८ एप्रिल २०१८ रोजी झालेली अधिकृत राज्यसेवा पूर्व परीक्षा पेपर १ (सामान्य अध्ययन). भारताचा इतिहास, महाराष्ट्राचा भूगोल, राज्यव्यवस्था, पंचवार्षिक योजना व शाश्वत विकास यावरील प्रश्न.',
    descriptionEn: 'Official MPSC Rajyaseva Prelims 2018 Paper 1 (General Studies) with official key and comprehensive solutions.',
    tagsMr: ['राज्यसेवा २०१८', 'GS पेपर १', 'अधिकृत उत्तरतालिका', '१२० मिनिटे'],
    tagsEn: ['Rajyaseva 2018', 'GS Paper 1', 'Official Key', '120 Mins'],
    questions: MPSC_RAJYASEVA_PRE_2018
  },
  {
    id: 'mpsc_pyq_2022_archive',
    patternId: 'mpsc_pyq_2022',
    year: 2022,
    titleMr: 'MPSC राज्यसेवा व संयुक्त पूर्व परीक्षा २०२२ (निवडक अधिकृत प्रश्नसंच)',
    titleEn: 'MPSC Civil Services & Combine Prelims 2022 (Curated Official PYQ Set)',
    examDate: '२०२२ अधिकृत',
    category: 'rajyaseva',
    categoryLabelMr: 'पूर्व परीक्षा २०२२',
    categoryLabelEn: 'Prelims 2022',
    bookletCode: 'M22 (संच A)',
    totalQuestions: 50,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.५० गुण वजा)',
    descriptionMr: '२०२२ मधील राज्यघटना, नीती आयोग, मूलभूत कर्तव्ये, परमहंस सभा आणि महाराष्ट्राच्या भूगोल विषयातील वारंवार विचारले गेलेले महत्त्वाचे अधिकृत प्रश्न.',
    descriptionEn: 'High-frequency official questions from 2022 exams covering Fundamental Duties, NITI Aayog, Godavari basin, and social reform movements.',
    tagsMr: ['२०२२ PYQ', 'घटना व कायदे', 'भूगोल', 'अर्थव्यवस्था'],
    tagsEn: ['2022 PYQ', 'Polity & Laws', 'Geography', 'Economy'],
    questions: MPSC_PYQ_2022
  },
  {
    id: 'mpsc_combine_mains_paper1_marathi_english',
    patternId: 'mpsc_combine_mains_pyq',
    year: 2023,
    titleMr: 'MPSC अराजपत्रित गट-ब संयुक्त मुख्य परीक्षा (पेपर १: मराठी व इंग्रजी भाषा)',
    titleEn: 'MPSC Group B Combined Mains (Paper 1: Marathi & English Language)',
    examDate: '२०२३ / २०२४ अधिकृत',
    category: 'combine',
    categoryLabelMr: 'गट-ब मुख्य',
    categoryLabelEn: 'Group B Mains',
    bookletCode: 'X17 / C18 (संच A)',
    totalQuestions: 100,
    totalMarks: 200,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.५० गुण वजा)',
    descriptionMr: 'गट-ब मुख्य परीक्षेसाठी अनिवार्य असणारा पेपर १: ५० प्रश्न मराठी व्याकरण, म्हणी, वाक्प्रचार, समानार्थी शब्द व उतारा; आणि ५० प्रश्न इंग्रजी व्याकरण, Vocabulary व Comprehension.',
    descriptionEn: 'Compulsory Paper 1 for Group B Mains: 50 Questions Marathi Grammar & Vocab, and 50 Questions English Grammar, Idioms, Clauses & Vocab.',
    tagsMr: ['मराठी व्याकरण', 'इंग्रजी व्याकरण', 'वाक्प्रचार व म्हणी', 'शब्दसंग्रह'],
    tagsEn: ['Marathi Grammar', 'English Grammar', 'Idioms & Vocab', 'Clauses'],
    questions: MPSC_COMBINE_MAINS_PYQ
  },
  {
    id: 'mpsc_combine_mains_paper2_gs_aptitude',
    patternId: 'mpsc_combine_mains_pyq',
    year: 2023,
    titleMr: 'MPSC अराजपत्रित गट-ब संयुक्त मुख्य परीक्षा (पेपर २: सामान्य अध्ययन व बुद्धिमत्ता)',
    titleEn: 'MPSC Group B Combined Mains (Paper 2: General Studies & Intelligence)',
    examDate: '२०२३ / २०२४ अधिकृत',
    category: 'combine',
    categoryLabelMr: 'गट-ब मुख्य',
    categoryLabelEn: 'Group B Mains',
    bookletCode: 'D18 (संच A)',
    totalQuestions: 100,
    totalMarks: 200,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.५० गुण वजा)',
    descriptionMr: 'सामान्य क्षमता चाचणी, अंकगणित व बुद्धिमत्ता, माहितीचा अधिकार २००५, महाराष्ट्र लोकसेवा हक्क २०१५, माहिती तंत्रज्ञान आणि चालू घडामोडी.',
    descriptionEn: 'General Studies, Aptitude & Reasoning, RTI Act 2005, Public Services Act 2015, ICT, and High-Yield Current Affairs.',
    tagsMr: ['अंकगणित व बुद्धिमत्ता', 'RTI २००५', 'लोकसेवा हक्क २०१५', 'चालू घडामोडी'],
    tagsEn: ['Aptitude & Reasoning', 'RTI 2005', 'Public Service Act', 'Current Affairs'],
    questions: MPSC_COMBINE_MAINS_PYQ
  },
  {
    id: 'mpsc_psi_mains_law_paper2',
    patternId: 'mpsc_combine_mains_pyq',
    year: 2022,
    titleMr: 'MPSC पोलीस उपनिरीक्षक (PSI) मुख्य परीक्षा (पेपर २: पदविषयक कायदे व सामान्य क्षमता)',
    titleEn: 'MPSC Police Sub-Inspector (PSI) Mains (Paper 2: Police Laws & Duties)',
    examDate: 'अधिकृत प्रश्नपत्रिका',
    category: 'psi',
    categoryLabelMr: 'PSI मुख्य कायदे',
    categoryLabelEn: 'PSI Mains Law',
    bookletCode: 'B18 / M15 (संच A)',
    totalQuestions: 100,
    totalMarks: 200,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.५० गुण वजा)',
    descriptionMr: 'पोलीस उपनिरीक्षक पदासाठी विचारले जाणारे विशेष कायदे: भारतीय दंड संहिता (IPC 1860), फौजदारी प्रक्रिया संहिता (CrPC 1973), भारतीय पुरावा कायदा (IEA 1872), आणि महाराष्ट्र पोलीस अधिनियम (MPA 1951).',
    descriptionEn: 'Specialized legal syllabus for PSI: Indian Penal Code (IPC), Code of Criminal Procedure (CrPC), Indian Evidence Act, and Maharashtra Police Act.',
    tagsMr: ['भा.दं.वि. (IPC)', 'फौ.प्र.सं. (CrPC)', 'पुरावा कायदा', 'पोलीस अधिनियम'],
    tagsEn: ['IPC 1860', 'CrPC 1973', 'Evidence Act', 'Police Act'],
    questions: MPSC_COMBINE_MAINS_PYQ
  },
  {
    id: 'mpsc_group_c_prelims_official',
    patternId: 'mpsc_group_c_pre',
    year: 2023,
    titleMr: 'MPSC गट-क (अराजपत्रित) सेवा संयुक्त पूर्व परीक्षा (उद्योग, कर सहाय्यक, लिपिक)',
    titleEn: 'MPSC Non-Gazetted Group C Services Combined Prelims Exam (Tax Asst, Clerk-Typist)',
    examDate: 'अधिकृत प्रश्नसंच',
    category: 'combine',
    categoryLabelMr: 'गट-क संयुक्त पूर्व',
    categoryLabelEn: 'Group C Combined Prelims',
    bookletCode: 'C10 (संच A)',
    totalQuestions: MPSC_GROUP_C_PYQ.length,
    totalMarks: MPSC_GROUP_C_PYQ.length,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    descriptionMr: 'महाराष्ट्र लोकसेवा आयोगाची गट-क संयुक्त पूर्व परीक्षा (उद्योग निरीक्षक, दुय्यम निरीक्षक उत्पादन शुल्क, कर सहाय्यक, तांत्रिक सहाय्यक व लिपिक-टंकलेखक). अधिकृत उत्तरतालिका आणि प्रत्येक प्रश्नाचे सविस्तर संदर्भ स्पष्टीकरण.',
    descriptionEn: 'Official MPSC Group C Combined Preliminary Exam (Industry Inspector, Sub-Inspector Excise, Tax Assistant, Clerk-Typist) with official key and comprehensive solutions.',
    tagsMr: ['गट-क PYQ', 'कर सहाय्यक', 'लिपिक-टंकलेखक', 'सविस्तर संदर्भ'],
    tagsEn: ['Group C PYQ', 'Tax Assistant', 'Clerk-Typist', 'Detailed Solutions'],
    questions: MPSC_GROUP_C_PYQ
  },
  {
    id: 'mpsc_english_vocab_pyq_master',
    patternId: 'mpsc_combine_mains_pyq',
    year: 2024,
    titleMr: 'MPSC अधिकृत इंग्रजी शब्दसंग्रह (PYQ English Vocabulary Master)',
    titleEn: 'MPSC Official English Vocabulary PYQ Master (Synonyms, Antonyms, Idioms, One-Word)',
    examDate: '२०११ - २०२४ अधिकृत',
    category: 'combine',
    categoryLabelMr: 'इंग्रजी शब्दसंग्रह PYQ',
    categoryLabelEn: 'English Vocab PYQ',
    bookletCode: 'VOCAB-PYQ',
    totalQuestions: ENGLISH_VOCAB_QUESTIONS.length,
    totalMarks: ENGLISH_VOCAB_QUESTIONS.length * 2,
    durationMinutes: 90,
    negativeMarking: '१/४ (०.५० गुण वजा)',
    descriptionMr: 'महाराष्ट्र लोकसेवा आयोगाच्या राज्यसेवा मुख्य, संयुक्त गट-ब व गट-क मुख्य (PSI, STI, ASO, कर सहाय्यक, लिपिक-टंकलेखक, उत्पादन शुल्क) परीक्षांमध्ये २०११ ते २०२४ दरम्यान विचारलेले १००% अधिकृत इंग्रजी शब्दसंग्रह (Vocabulary) प्रश्न. समानार्थी, विरुद्धार्थी, One-Word Substitutions आणि वाक्प्रचार (Idioms & Phrases) चे सविस्तर मराठी स्पष्टीकरण व संदर्भ.',
    descriptionEn: '100% verified authentic Previous Year Questions (PYQs) from MPSC Rajyaseva Mains, Combine Group B & Group C Mains (PSI, STI, ASO, Tax Asst, Clerk-Typist) covering Synonyms, Antonyms, One-Word Substitutions, Idioms & Phrases with detailed bilingual explanations and official answer keys.',
    tagsMr: ['अधिकृत PYQ', 'समानार्थी शब्द', 'विरुद्धार्थी शब्द', 'One-Word Substitution', 'वाक्प्रचार (Idioms)', 'सविस्तर स्पष्टीकरण'],
    tagsEn: ['Official PYQ', 'Synonyms', 'Antonyms', 'One-Word', 'Idioms & Phrases', 'Detailed Explanations'],
    questions: ENGLISH_VOCAB_QUESTIONS
  },
  {
    id: 'mpsc_marathi_vocab_pyq_master',
    patternId: 'mpsc_combine_mains_pyq',
    year: 2024,
    titleMr: 'MPSC अधिकृत मराठी शब्दसंग्रह (PYQ Marathi Vocabulary Master)',
    titleEn: 'MPSC Official Marathi Vocabulary PYQ Master (Synonyms, Antonyms, Idioms, One-Word)',
    examDate: '२०१५ - २०२४ अधिकृत',
    category: 'combine',
    categoryLabelMr: 'मराठी शब्दसंग्रह PYQ',
    categoryLabelEn: 'Marathi Vocab PYQ',
    bookletCode: 'MR-VOCAB',
    totalQuestions: MARATHI_VOCAB_QUESTIONS.length,
    totalMarks: MARATHI_VOCAB_QUESTIONS.length * 2,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.५० गुण वजा)',
    descriptionMr: 'राज्यसेवा मुख्य, संयुक्त गट-ब व गट-क मुख्य (PSI, STI, ASO, कर सहाय्यक, लिपिक-टंकलेखक) परीक्षांमध्ये २०१५ ते २०२४ दरम्यान विचारलेले १००% अधिकृत मराठी शब्दसंग्रह प्रश्न. म्हणी, वाक्प्रचार, अलंकारिक शब्द, समानार्थी व विरुद्धार्थी शब्द, आणि शब्दसमूहाबद्दल एक शब्द चे सविस्तर संदर्भ स्पष्टीकरण व अधिकृत उत्तरतालिका.',
    descriptionEn: '100% verified authentic Previous Year Questions (PYQs) from MPSC Rajyaseva Mains and Combine Group B & Group C Mains covering Marathi proverbs (म्हणी), idioms (वाक्प्रचार), figurative expressions (अलंकारिक शब्द), synonyms, antonyms, and one-word substitutions with detailed explanations.',
    tagsMr: ['अधिकृत PYQ', 'म्हणी व वाक्प्रचार', 'अलंकारिक शब्द', 'समानार्थी शब्द', 'शब्दसमूहाबद्दल एक शब्द', 'सविस्तर स्पष्टीकरण'],
    tagsEn: ['Official PYQ', 'Proverbs & Idioms', 'Figurative Words', 'Synonyms', 'One-Word', 'Detailed Solutions'],
    questions: MARATHI_VOCAB_QUESTIONS
  }
];

// Helper to highlight matching keyword inside text
const highlightMatch = (text: string | undefined | null, query: string) => {
  if (!text) return null;
  if (!query || !query.trim()) return text;
  const trimmed = query.trim();
  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try {
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);
    if (parts.length === 1) return text;
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-amber-300 text-stone-950 font-black px-1 rounded-xs shadow-2xs">
          {part}
        </mark>
      ) : (
        part
      )
    );
  } catch {
    return text;
  }
};

const SUGGESTED_KEYWORDS = [
  { mr: 'कलम (Articles)', en: 'Articles', query: 'कलम' },
  { mr: 'इतिहास', en: 'History', query: 'इतिहास' },
  { mr: 'भूगोल', en: 'Geography', query: 'भूगोल' },
  { mr: 'राज्यघटना', en: 'Polity', query: 'राज्यघटना' },
  { mr: 'अर्थव्यवस्था', en: 'Economy', query: 'अर्थव्यवस्था' },
  { mr: 'समिती', en: 'Committees', query: 'समिती' },
  { mr: '१८५७', en: '1857 Revolt', query: '१८५७' },
  { mr: 'राज्यपाल', en: 'Governor', query: 'राज्यपाल' },
  { mr: 'नदी', en: 'Rivers', query: 'नदी' },
  { mr: 'विज्ञान', en: 'Science', query: 'विज्ञान' }
];

export const MpscPyqHubModal: React.FC<MpscPyqHubModalProps> = ({
  isOpen,
  onClose,
  language,
  onStartExam,
  initialYear = 'all'
}) => {
  const isMr = language === 'mr';
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'rajyaseva' | 'combine' | 'psi'>('all');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>(initialYear || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [studyingPaper, setStudyingPaper] = useState<OfficialPaperMeta | null>(null);
  const [studyFilterSubject, setStudyFilterSubject] = useState<string>('all');
  const [studySearchQuery, setStudySearchQuery] = useState<string>('');

  useEffect(() => {
    if (initialYear !== undefined) {
      setSelectedYear(initialYear);
    }
  }, [initialYear]);

  if (!isOpen) return null;

  const filteredPapers = OFFICIAL_PAPERS_CATALOG.filter((paper) => {
    const matchesCategory = selectedCategory === 'all' || paper.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || paper.year === selectedYear;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory && matchesYear;

    const matchesPaperMeta = 
      paper.titleMr.toLowerCase().includes(query) ||
      paper.titleEn.toLowerCase().includes(query) ||
      paper.descriptionMr.toLowerCase().includes(query) ||
      paper.descriptionEn.toLowerCase().includes(query) ||
      (paper.year && paper.year.toString().includes(query));

    const matchesQuestionKeyword = paper.questions.some(q => {
      const qText = `${q.questionMr || ''} ${q.questionEn || ''} ${q.topic || ''} ${q.subtopic || ''} ${(q.optionsMr || []).join(' ')}`.toLowerCase();
      return qText.includes(query);
    });

    return matchesCategory && matchesYear && (matchesPaperMeta || matchesQuestionKeyword);
  });

  const handleLaunchPaper = (paper: OfficialPaperMeta) => {
    soundFx.playClickSound();
    onClose();
    onStartExam(paper.patternId, undefined, isMr ? paper.titleMr : paper.titleEn);
  };

  const handleOpenStudyMode = (paper: OfficialPaperMeta, initialKeywordSearch: string = '') => {
    soundFx.playClickSound();
    setStudyingPaper(paper);
    if (initialKeywordSearch) {
      setStudySearchQuery(initialKeywordSearch);
    }
  };

  const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

  // Prepared filtered questions list for study mode
  const searchNormalized = studySearchQuery.toLowerCase().trim();
  const filteredQuestionsList = studyingPaper
    ? studyingPaper.questions
        .map((q, originalIndex) => ({ q, originalIndex }))
        .filter(({ q, originalIndex }) => {
          const matchesSubject = studyFilterSubject === 'all' || q.subjectId === studyFilterSubject;
          if (!matchesSubject) return false;
          if (!searchNormalized) return true;

          const qText = (isMr ? q.questionMr : q.questionEn) || q.questionMr || '';
          const expText = (isMr ? q.explanationMr : q.explanationEn) || q.explanationMr || '';
          const opts = (isMr ? q.optionsMr : q.optionsEn) || q.optionsMr || [];
          const optsText = opts.join(' ');
          const topicText = q.topic || '';
          const subtopicText = q.subtopic || '';
          const refText = q.reference || '';
          const num = `${originalIndex + 1}`;

          const haystack = `${qText} ${expText} ${optsText} ${topicText} ${subtopicText} ${refText} #${num} ${num}`.toLowerCase();
          return haystack.includes(searchNormalized);
        })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden text-stone-900"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-5 sm:p-6 flex items-center justify-between shrink-0 relative overflow-hidden">
          <div className="space-y-1 relative z-10">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider">
                MPSC PYQ Archive
              </span>
              <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {isMr ? 'अधिकृत उत्तरतालिकेसह व सविस्तर स्पष्टीकरण' : 'With Official Keys & Full Solutions'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-400" />
              <span>
                {studyingPaper 
                  ? (isMr ? studyingPaper.titleMr : studyingPaper.titleEn) 
                  : (isMr ? 'मागील वर्षाच्या अधिकृत प्रश्नपत्रिका केंद्र (PYQ Hub)' : 'Official Previous Year Question Papers')}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              {studyingPaper
                ? (isMr ? 'कीवर्ड सर्च बॉक्स वापरून कोणतेही प्रश्न त्वरित शोधा आणि सविस्तर स्पष्टीकरणे अभ्यासा.' : 'Quickly search specific questions by keyword and study detailed official solutions.')
                : (isMr 
                    ? 'एमपीएससी राज्यसेवा व संयुक्त गट-ब च्या मूळ प्रश्नपत्रिका, अधिकृत उत्तरतालिका आणि स्पष्टीकरणासह सोडवा.'
                    : 'Solve original MPSC exam papers with official answer keys, time constraints, and detailed solutions.')}
            </p>
          </div>

          <div className="flex items-center gap-2 relative z-10 shrink-0">
            {studyingPaper && (
              <button
                onClick={() => {
                  soundFx.playClickSound();
                  setStudyingPaper(null);
                  setStudySearchQuery('');
                  setStudyFilterSubject('all');
                }}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{isMr ? 'सर्व प्रश्नपत्रिका' : 'All Papers'}</span>
              </button>
            )}
            <button
              onClick={() => {
                soundFx.playClickSound();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Study Mode View (Question + Explanation) */}
        {studyingPaper ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Toolbar in Study Mode */}
            <div className="p-3 sm:p-4 border-b border-stone-200 bg-amber-50/70 flex items-center justify-between gap-3 shrink-0 flex-wrap">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg bg-amber-200/80 border border-amber-300">
                  {studyingPaper.bookletCode}
                </span>
                <span>📅 {studyingPaper.examDate}</span>
                <span>•</span>
                <span>📝 {studyingPaper.questions.length} {isMr ? 'प्रश्न उपलब्ध' : 'Questions'}</span>
                <span>•</span>
                <span className="text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-300">
                  {isMr ? 'अचूक उत्तरतालिका व संदर्भ' : 'Official Key & Solutions'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLaunchPaper(studyingPaper)}
                  className="px-4 py-1.5 rounded-xl bg-stone-900 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
                  <span>{isMr ? 'ही परीक्षा वेळेत सोडवा' : 'Take Timed Mock Test'}</span>
                </button>
              </div>
            </div>

            {/* Dedicated Text-Based Search Input Bar */}
            <div className="p-3 sm:p-4 border-b border-stone-200 bg-white space-y-2.5 shrink-0">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                {/* Text search input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    id="pyq-paper-keyword-search"
                    value={studySearchQuery}
                    onChange={(e) => setStudySearchQuery(e.target.value)}
                    placeholder={
                      isMr
                        ? 'या प्रश्नपत्रिकेत कीवर्डने प्रश्न शोधा (उदा. कलम ३२, सह्याद्री, १८५७, तेंडुलकर, किंवा #१५)...'
                        : 'Search questions by keyword in this paper (e.g. Article 32, Sahyadri, 1857, or #15)...'
                    }
                    className="w-full pl-10 pr-9 py-2 bg-stone-50 hover:bg-white focus:bg-white border border-stone-300 focus:border-amber-500 rounded-xl text-xs sm:text-sm font-semibold text-stone-900 placeholder:text-stone-400 focus:outline-hidden transition-all shadow-2xs"
                  />
                  {studySearchQuery && (
                    <button
                      onClick={() => {
                        soundFx.playClickSound();
                        setStudySearchQuery('');
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200 transition-colors cursor-pointer"
                      title={isMr ? 'शोध साफ करा' : 'Clear search'}
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Match Counter Badge */}
                {studySearchQuery && (
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>
                        {isMr
                          ? `शोध परिणाम: ${filteredQuestionsList.length} प्रश्न सापडले`
                          : `${filteredQuestionsList.length} questions matched`}
                      </span>
                    </span>
                    <button
                      onClick={() => {
                        soundFx.playClickSound();
                        setStudySearchQuery('');
                      }}
                      className="text-xs text-stone-500 hover:text-stone-800 underline font-semibold cursor-pointer"
                    >
                      {isMr ? 'साफ करा' : 'Clear'}
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Keyword Suggestion Tags & Subject Filters */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                {/* Suggested high-yield keyword tags */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none max-w-full">
                  <span className="text-[11px] font-bold text-stone-500 shrink-0 flex items-center gap-1 mr-1">
                    <Flame className="w-3 h-3 text-amber-500" />
                    {isMr ? 'जलद शोध:' : 'Quick tags:'}
                  </span>
                  {SUGGESTED_KEYWORDS.map((k, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        soundFx.playClickSound();
                        setStudySearchQuery(k.query);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        studySearchQuery === k.query
                          ? 'bg-amber-500 text-stone-950 shadow-2xs'
                          : 'bg-stone-100 hover:bg-amber-100 border border-stone-200/80 hover:border-amber-300 text-stone-700 hover:text-amber-900'
                      }`}
                    >
                      {isMr ? k.mr : k.en}
                    </button>
                  ))}
                </div>

                {/* Subject Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none text-xs">
                  {[
                    { id: 'all', mr: 'सर्व विषय', en: 'All' },
                    { id: 'maharashtra_history', mr: 'इतिहास', en: 'History' },
                    { id: 'maharashtra_geography', mr: 'भूगोल', en: 'Geography' },
                    { id: 'polity', mr: 'राज्यघटना', en: 'Polity' },
                    { id: 'economy', mr: 'अर्थव्यवस्था', en: 'Economy' },
                    { id: 'general_science', mr: 'विज्ञान', en: 'Science' },
                    { id: 'current_affairs', mr: 'चालू घडामोडी', en: 'Current Affairs' },
                    { id: 'csat', mr: 'अंकगणित/बुद्धिमत्ता', en: 'Aptitude' },
                  ].map((subj) => (
                    <button
                      key={subj.id}
                      onClick={() => setStudyFilterSubject(subj.id)}
                      className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                        studyFilterSubject === subj.id
                          ? 'bg-stone-900 text-white shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      {isMr ? subj.mr : subj.en}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Questions List with Explanations and Keyword Highlighting */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 bg-stone-50/50 flex-1">
              {filteredQuestionsList.length > 0 ? (
                filteredQuestionsList.map(({ q, originalIndex }) => {
                  const options = isMr ? q.optionsMr : q.optionsEn;
                  const questionText = isMr ? q.questionMr : q.questionEn;
                  const explanationText = isMr ? q.explanationMr : q.explanationEn;
                  const isKeywordMatched = Boolean(
                    studySearchQuery.trim() &&
                    `${questionText} ${explanationText} ${options.join(' ')} ${q.topic} ${q.reference}`
                      .toLowerCase()
                      .includes(studySearchQuery.toLowerCase().trim())
                  );

                  return (
                    <div
                      key={q.id || originalIndex}
                      className={`bg-white rounded-2xl border-2 shadow-sm p-5 sm:p-6 space-y-4 transition-all ${
                        isKeywordMatched
                          ? 'border-amber-400 ring-2 ring-amber-400/20'
                          : 'border-stone-200/90 hover:border-stone-300'
                      }`}
                    >
                      {/* Top Meta */}
                      <div className="flex items-center justify-between gap-2 flex-wrap border-b border-stone-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-stone-900 text-white font-black text-xs flex items-center justify-center">
                            #{originalIndex + 1}
                          </span>
                          <span className="text-xs font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                            {highlightMatch(q.topic, studySearchQuery)}
                          </span>
                          {q.subtopic && (
                            <span className="text-xs text-stone-500 hidden sm:inline">
                              • {highlightMatch(q.subtopic, studySearchQuery)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {isKeywordMatched && (
                            <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-600" />
                              {isMr ? 'कीवर्ड जुळला' : 'Keyword Match'}
                            </span>
                          )}
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            {isMr ? 'अधिकृत आयोगाचा प्रश्न' : 'Official MPSC Question'}
                          </span>
                        </div>
                      </div>

                      {/* Question Statement with Keyword Highlight */}
                      <p className="text-sm sm:text-base font-bold text-stone-900 leading-relaxed whitespace-pre-line">
                        {highlightMatch(questionText, studySearchQuery)}
                      </p>

                      {/* Options List with Keyword Highlight */}
                      <div className="space-y-2.5 pt-1">
                        {options.map((opt, optIndex) => {
                          const isCorrect = optIndex === q.correctAnswerIndex;
                          const letter = OPTION_LETTERS[optIndex] || `${optIndex + 1}`;

                          return (
                            <div
                              key={optIndex}
                              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm transition-all ${
                                isCorrect
                                  ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-semibold shadow-xs'
                                  : 'border-stone-200 bg-[#fdfbf7] text-stone-800'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                                    isCorrect
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-stone-200/80 text-stone-700'
                                  }`}
                                >
                                  {letter}
                                </span>
                                <span className="leading-snug">
                                  {highlightMatch(opt, studySearchQuery)}
                                </span>
                              </div>

                              {isCorrect && (
                                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs shrink-0">
                                  <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                                  <span>{isMr ? 'अचूक उत्तर' : 'Correct Answer'}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Official Explanation Box with Keyword Highlight */}
                      <div className="rounded-xl border border-amber-300/80 bg-[#fffaf3] p-4 sm:p-5 space-y-2 mt-4">
                        <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm">
                          <BookOpen className="w-4 h-4 text-amber-600" />
                          <span>{isMr ? '📖 स्पष्टीकरण (Explanation)' : '📖 Explanation'}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-line italic font-serif">
                          {highlightMatch(explanationText, studySearchQuery)}
                        </p>
                        {q.reference && (
                          <div className="pt-2 border-t border-amber-200/60 flex items-center gap-1.5 text-[11px] text-amber-800/90 font-medium">
                            <span className="font-bold">{isMr ? '📚 अधिकृत संदर्भ:' : '📚 Reference:'}</span>
                            <span>{highlightMatch(q.reference, studySearchQuery)}</span>
                          </div>
                        )}

                        {/* Visual Memory Aid & Maps */}
                        <VisualMemoryAid
                          subjectId={q.subjectId}
                          topic={q.topic}
                          subtopic={q.subtopic}
                          language={language}
                          defaultMapType={q.mapType}
                          customImageUrl={q.imageUrl}
                          memoryTrickMr={q.memoryTrickMr}
                          memoryTrickEn={q.memoryTrickEn}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                /* Empty search results state */
                <div className="bg-white rounded-3xl border-2 border-dashed border-stone-300 p-10 text-center space-y-4 my-8">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-xs">
                    <Search className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-stone-900">
                      {isMr 
                        ? `"${studySearchQuery}" हा शब्द असलेला एकही प्रश्न सापडला नाही` 
                        : `No questions found matching "${studySearchQuery}"`}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
                      {isMr 
                        ? 'कृपया स्पेलिंग तपासा किंवा वरील सुचवलेल्या कीवर्ड्स (उदा. कलम, इतिहास, नदी, समिती) पैकी एक निवडा.' 
                        : 'Try searching with a different keyword or choose one of the suggested tags above.'}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        soundFx.playClickSound();
                        setStudySearchQuery('');
                        setStudyFilterSubject('all');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>{isMr ? 'शोध साफ करा व सर्व प्रश्न पहा' : 'Reset Search & View All'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Catalog View */
          <>
            {/* Filter & Search Bar */}
            <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50 flex flex-col gap-3.5 shrink-0">
              {/* Year Filter Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none w-full">
                <span className="text-[11px] font-bold text-stone-600 shrink-0 flex items-center gap-1 mr-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  {isMr ? 'वर्ष निवडा:' : 'Select Year:'}
                </span>
                {([
                  { id: 'all', labelMr: 'सर्व वर्षे (All)', labelEn: 'All Years' },
                  { id: 2026, labelMr: '२०२६', labelEn: '2026' },
                  { id: 2025, labelMr: '२०२५', labelEn: '2025' },
                  { id: 2024, labelMr: '२०२४', labelEn: '2024' },
                  { id: 2023, labelMr: '२०२३', labelEn: '2023' },
                  { id: 2022, labelMr: '२०२२', labelEn: '2022' },
                  { id: 2021, labelMr: '२०२१', labelEn: '2021' },
                  { id: 2020, labelMr: '२०२०', labelEn: '2020' },
                  { id: 2019, labelMr: '२०१९', labelEn: '2019' },
                  { id: 2018, labelMr: '२०१८', labelEn: '2018' },
                ] as const).map((yr) => {
                  const isSelected = selectedYear === yr.id;
                  return (
                    <button
                      key={yr.id}
                      onClick={() => {
                        soundFx.playClickSound();
                        setSelectedYear(yr.id as any);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 shadow-xs'
                          : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                      }`}
                    >
                      {isMr ? yr.labelMr : yr.labelEn}
                    </button>
                  );
                })}
              </div>

              {/* Category and Catalog Search */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      selectedCategory === 'all'
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {isMr ? 'सर्व परीक्षा' : 'All Exams'}
                  </button>
                  <button
                    onClick={() => setSelectedCategory('rajyaseva')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      selectedCategory === 'rajyaseva'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {isMr ? 'राज्यसेवा (Rajyaseva)' : 'Rajyaseva'}
                  </button>
                  <button
                    onClick={() => setSelectedCategory('combine')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      selectedCategory === 'combine'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {isMr ? 'संयुक्त गट-ब व क (Combine)' : 'Combine B & C'}
                  </button>
                  <button
                    onClick={() => setSelectedCategory('psi')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      selectedCategory === 'psi'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {isMr ? 'PSI कायदे (Law)' : 'PSI Law'}
                  </button>
                </div>

                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isMr ? 'प्रश्नपत्रिका किंवा कीवर्ड शोधा...' : 'Search papers or keywords...'}
                    className="w-full pl-9 pr-8 py-1.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Papers List */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              {filteredPapers.map((paper) => {
                const searchQ = searchQuery.toLowerCase().trim();
                const matchedQuestionsCount = searchQ
                  ? paper.questions.filter((q) => {
                      const qText = `${q.questionMr || ''} ${q.questionEn || ''} ${q.topic || ''} ${q.subtopic || ''} ${(q.optionsMr || []).join(' ')}`.toLowerCase();
                      return qText.includes(searchQ);
                    }).length
                  : 0;

                return (
                  <div
                    key={paper.id}
                    className="bg-white rounded-2xl border-2 border-stone-200 hover:border-amber-500/80 p-5 sm:p-6 transition-all hover:shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group"
                  >
                    <div className="space-y-2.5 max-w-2xl">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-black bg-stone-100 text-stone-800 border border-stone-200">
                          {paper.bookletCode}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          📅 {paper.examDate}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {isMr ? paper.categoryLabelMr : paper.categoryLabelEn}
                        </span>
                        {paper.year && (
                          <span className="px-2.5 py-0.5 rounded-md text-xs font-black bg-purple-50 text-purple-800 border border-purple-200">
                            {paper.year}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                        {isMr ? paper.titleMr : paper.titleEn}
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {isMr ? paper.descriptionMr : paper.descriptionEn}
                      </p>

                      {/* If user searched keyword and matches exist in this paper */}
                      {matchedQuestionsCount > 0 && (
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-bold">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>
                            {isMr 
                              ? `या प्रश्नपत्रिकेत "${searchQuery}" कीवर्डशी संबंधित ${matchedQuestionsCount} प्रश्न उपलब्ध आहेत.`
                              : `${matchedQuestionsCount} questions match "${searchQuery}" in this paper.`}
                          </span>
                          <button
                            onClick={() => handleOpenStudyMode(paper, searchQuery)}
                            className="ml-auto text-amber-800 hover:text-amber-950 underline cursor-pointer text-xs"
                          >
                            {isMr ? 'हे प्रश्न शोधा →' : 'View matches →'}
                          </button>
                        </div>
                      )}

                      <div className="flex items-center gap-3 text-xs text-stone-500 font-medium flex-wrap pt-1">
                        <span>⏱️ {paper.durationMinutes} {isMr ? 'मिनिटे' : 'Mins'}</span>
                        <span>•</span>
                        <span>📝 {paper.totalQuestions} {isMr ? 'प्रश्न' : 'Questions'}</span>
                        <span>•</span>
                        <span>🎯 {paper.totalMarks} {isMr ? 'गुण' : 'Marks'}</span>
                        <span>•</span>
                        <span>⚖️ {paper.negativeMarking}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 pt-2 md:pt-0 flex-wrap">
                      {/* Button 1: Search Questions & Read Detailed Solutions */}
                      <button
                        onClick={() => handleOpenStudyMode(paper, searchQuery)}
                        className="flex-1 md:flex-none px-4 py-2.5 rounded-xl border border-stone-300 hover:border-amber-500 bg-white hover:bg-amber-50 text-stone-800 hover:text-amber-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-2xs"
                      >
                        <Search className="w-4 h-4 text-amber-600" />
                        <span>{isMr ? 'प्रश्न शोधा व स्पष्टीकरणे' : 'Search Questions & Solutions'}</span>
                      </button>

                      {/* Button 2: Start Timed Exam */}
                      <button
                        onClick={() => handleLaunchPaper(paper)}
                        className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs group-hover:shadow-md"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>{isMr ? 'परीक्षा सोडवा' : 'Start Exam'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredPapers.length === 0 && (
                <div className="text-center py-12 text-stone-500 space-y-2">
                  <FileText className="w-10 h-10 text-stone-300 mx-auto" />
                  <p className="text-sm font-semibold">
                    {isMr ? 'कोणतीही प्रश्नपत्रिका सापडली नाही.' : 'No papers match your search.'}
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <span>
            {isMr ? 'सर्व प्रश्नपत्रिका मूळ आयोगाच्या परीक्षेनुसार व अधिकृत संदर्भग्रंथांनुसार संकलित.' : 'All question papers strictly conform to official MPSC answer keys and reference texts.'}
          </span>
          <button
            onClick={() => {
              soundFx.playClickSound();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 font-bold transition-colors cursor-pointer"
          >
            {isMr ? 'बंद करा' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
