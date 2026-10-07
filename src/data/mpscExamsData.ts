import { ExamPatternId } from '../types';

export interface MpscExamItem {
  id: string;
  titleMr: string;
  titleEn: string;
  shortNameMr: string;
  shortNameEn: string;
  stage: 'prelims' | 'mains' | 'skill' | 'interview' | 'custom';
  stageLabelMr: string;
  stageLabelEn: string;
  targetDate: string; // ISO 8601 string: YYYY-MM-DDTHH:mm:ss
  examPatternId: ExamPatternId;
  targetPostsMr: string[];
  targetPostsEn: string[];
  departmentMr: string;
  departmentEn: string;
  patternSummaryMr: string;
  patternSummaryEn: string;
  totalMarks: number;
  durationMinutes: number;
  negativeMarking: string;
  syllabusHighlightsMr: string[];
  syllabusHighlightsEn: string[];
  strategyTipMr: string;
  strategyTipEn: string;
  officialNoticeUrl?: string;
  isFeatured?: boolean;
  isCustom?: boolean;
  accentColor: 'amber' | 'emerald' | 'blue' | 'purple' | 'rose' | 'indigo' | 'orange';
}

export const MPSC_EXAM_SCHEDULE: MpscExamItem[] = [
  {
    id: 'mpsc_group_c_talathi_3jan_2027',
    titleMr: 'MPSC गट-क (Group C) व तलाठी भरती पूर्व महापरीक्षा (३ जानेवारी २०२७)',
    titleEn: 'MPSC Group C & Talathi Recruitment Prelims Mega Exam (3 Jan 2027)',
    shortNameMr: 'गट-क / तलाठी (३ जाने २०२७)',
    shortNameEn: 'Group C / Talathi 3 Jan 2027',
    stage: 'prelims',
    stageLabelMr: 'पूर्व परीक्षा (वस्तुनिष्ठ १०० प्रश्न)',
    stageLabelEn: 'Prelims (Objective 100 Qs)',
    targetDate: '2027-01-03T11:00:00',
    examPatternId: 'mpsc_group_c_talathi_set_1',
    targetPostsMr: [
      'लिपिक-टंकलेखक (Clerk Typist)',
      'तलाठी (Talathi Bharti)',
      'कर सहाय्यक (Tax Assistant)',
      'दुय्यम निरीक्षक उत्पादन शुल्क (Sub-Inspector Excise)',
      'उद्योग निरीक्षक (Industry Inspector)',
      'तांत्रिक सहाय्यक (Technical Assistant)'
    ],
    targetPostsEn: [
      'Clerk-Typist',
      'Talathi (Revenue Dept)',
      'Tax Assistant',
      'Excise Sub-Inspector',
      'Industry Inspector',
      'Technical Assistant'
    ],
    departmentMr: 'महसूल, गृह, वित्त व सामान्य प्रशासन विभाग',
    departmentEn: 'Revenue, Home, Finance & GAD Depts.',
    patternSummaryMr: '१०० प्रश्न, १०० गुण, ६० मिनिटे, १/४ (०.२५) नकारात्मक गुण - सामान्य क्षमता चाचणी (चालू घडामोडी १५ + नागरिकशास्त्र १५ + इतिहास १० + भूगोल १५ + अर्थव्यवस्था १५ + सामान्य विज्ञान १५ + बुद्धिमत्ता ८ + अंकगणित ७)',
    patternSummaryEn: '100 MCQs, 100 Marks, 60 Minutes, 1/4th (0.25) Penalty - General Ability Test (Current Affairs 15 + Civics 15 + History 10 + Geography 15 + Economy 15 + General Science 15 + Reasoning 8 + Arithmetic 7)',
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    syllabusHighlightsMr: [
      '१) चालू घडामोडी - जागतिक तसेच भारतातील (महाराष्ट्रासह विशेष घडामोडी) (१५ प्रश्न)',
      '२) नागरिकशास्त्र - भारताच्या घटनेचा प्राथमिक अभ्यास, राज्य व्यवस्थापन (प्रशासन), ग्राम व्यवस्थापन (प्रशासन) (१५ प्रश्न)',
      '३) इतिहास - आधुनिक भारताचा विशेषतः महाराष्ट्राचा इतिहास (१० प्रश्न)',
      '४) भूगोल - महाराष्ट्राच्या भूगोलाच्या विशेष संदर्भासह: पृथ्वी, जगातील विभाग, हवामान, अक्षांश-रेखांश, जमिनीचे प्रकार, पर्जन्यमान, प्रमुख पिके, शहरे, नद्या, उद्योगधंदे (१५ प्रश्न)',
      '५) अर्थव्यवस्था - भारतीय अर्थव्यवस्था (राष्ट्रीय उत्पन्न, शेती, उद्योग, बँकिंग, दारिद्र्य) व शासकीय अर्थव्यवस्था (अर्थसंकल्प, लेखापरीक्षण) (१५ प्रश्न)',
      '६) सामान्य विज्ञान - भौतिकशास्त्र (Physics), रसायनशास्त्र (Chemistry), प्राणिशास्त्र (Zoology), वनस्पतीशास्त्र (Botany), आरोग्यशास्त्र (Hygiene) (१५ प्रश्न)',
      '७) बुद्धिमापन चाचणी - उमेदवार किती लवकर व अचूकपणे विचार करू शकतो हे आजमावण्यासाठी प्रश्न (८ प्रश्न)',
      '८) अंकगणित - बेरीज, वजाबाकी, गुणाकार, भागाकार, दशांश अपूर्णांक व टक्केवारी (७ प्रश्न)'
    ],
    syllabusHighlightsEn: [
      '1) Current Affairs - Global, National, and Maharashtra Current Affairs (15 Qs)',
      '2) Civics & Polity - Indian Constitution, State Administration, Rural Administration / Panchayati Raj (15 Qs)',
      '3) History - Modern India, especially Maharashtra History (10 Qs)',
      '4) Geography - Maharashtra Geography, Climate, Soil types, Rivers, Crops, Industries (15 Qs)',
      '5) Economy - Indian Economy & Public Finance, Budget, Banking (15 Qs)',
      '6) General Science - Physics, Chemistry, Zoology, Botany, Hygiene (15 Qs)',
      '7) Reasoning - Logical thinking speed and problem solving (8 Qs)',
      '8) Arithmetic - Basic operations, Decimals, Fractions, Percentages (7 Qs)'
    ],
    strategyTipMr: 'अधिकृत पूर्व परीक्षा अभ्यासक्रमानुसार १०० गुणांची "सामान्य क्षमता चाचणी" असते. ८ घटकांचे अचूक विभाजन असलेल्या १० महा सराव संचांचा सराव करा. वेळेचे अचूक नियोजन करून नकारात्मक गुण टाळा.',
    strategyTipEn: 'Official Prelims follows 100-mark General Ability Test across 8 subjects. Master all 10 mock sets with exact subject quotas to optimize speed and eliminate negative marking.',
    officialNoticeUrl: 'https://mpsc.gov.in',
    isFeatured: true,
    accentColor: 'amber',
  },
  {
    id: 'mpsc_combine_prelims_2026',
    titleMr: 'MPSC महाराष्ट्र अराजपत्रित गट-ब व गट-क संयुक्त पूर्व परीक्षा २०२६',
    titleEn: 'MPSC Non-Gazetted Group B & Group C Combined Prelims 2026',
    shortNameMr: 'संयुक्त पूर्व गट-ब व क २०२६',
    shortNameEn: 'Combine Prelims 2026',
    stage: 'prelims',
    stageLabelMr: 'पूर्व परीक्षा (वस्तुनिष्ठ)',
    stageLabelEn: 'Prelims (Objective MCQ)',
    targetDate: '2026-11-22T10:00:00',
    examPatternId: 'combine_group_b_c',
    targetPostsMr: [
      'पोलीस उपनिरीक्षक (PSI)',
      'राज्य कर निरीक्षक (STI)',
      'सहाय्यक कक्ष अधिकारी (ASO)',
      'दुय्यम निबंधक (Sub-Registrar)',
      'उद्योग निरीक्षक (Industry Inspector)',
      'कर सहाय्यक (Tax Assistant)',
      'लिपिक-टंकलेखक (Clerk Typist)'
    ],
    targetPostsEn: [
      'Police Sub-Inspector (PSI)',
      'State Tax Inspector (STI)',
      'Assistant Section Officer (ASO)',
      'Sub-Registrar',
      'Industry Inspector',
      'Tax Assistant',
      'Clerk-Typist'
    ],
    departmentMr: 'गृह, महसूल, सामान्य प्रशासन व वित्त विभाग',
    departmentEn: 'Home, Revenue, GAD & Finance Depts.',
    patternSummaryMr: '१०० प्रश्न, १०० गुण, १ तास, १/४ (०.२५) नकारात्मक गुण पद्धती',
    patternSummaryEn: '100 MCQs, 100 Marks, 60 Minutes, 1/4th (0.25) Negative Marking',
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarking: '1/4th (0.25)',
    syllabusHighlightsMr: [
      'महाराष्ट्राचा इतिहास व भूगोल',
      'भारतीय राज्यघटना व पंचायतराज',
      'अर्थव्यवस्था व शासकीय योजना',
      'सामान्य विज्ञान व चालू घडामोडी २०२६',
      'अंकगणित व बुद्धिमत्ता चाचणी'
    ],
    syllabusHighlightsEn: [
      'Maharashtra History & Geography',
      'Indian Polity & Panchayati Raj',
      'Indian Economy & Key Welfare Schemes',
      'General Science & Current Affairs 2026',
      'Reasoning & Quantitative Aptitude'
    ],
    strategyTipMr: 'दैनिक वेळेचे नियोजन करा. चालू घडामोडी आणि बुद्धिमत्ता विभागात पूर्ण गुण मिळवण्यावर भर द्या. नकारात्मक गुणांकनामुळे खात्री नसलेले प्रश्न टाळा.',
    strategyTipEn: 'Focus on accuracy in Maharashtra Geography and Current Affairs. Minimize random guesses to avoid 1/4th negative penalty.',
    officialNoticeUrl: 'https://mpsc.gov.in',
    isFeatured: true,
    accentColor: 'amber'
  },
  {
    id: 'mpsc_rajyaseva_mains_2026',
    titleMr: 'MPSC राज्यसेवा (नागरी सेवा राजपत्रित) मुख्य परीक्षा २०२६',
    titleEn: 'MPSC Maharashtra Civil Services Gazetted Mains Exam 2026',
    shortNameMr: 'राज्यसेवा मुख्य परीक्षा २०२६',
    shortNameEn: 'Rajyaseva Mains 2026',
    stage: 'mains',
    stageLabelMr: 'मुख्य परीक्षा (वर्णनात्मक पद्धती)',
    stageLabelEn: 'Mains (Descriptive Pattern)',
    targetDate: '2026-12-14T09:30:00',
    examPatternId: 'rajyaseva_gs',
    targetPostsMr: [
      'उपजिल्हाधिकारी (Deputy Collector)',
      'पोलीस उपअधीक्षक / सहाय्यक पोलीस आयुक्त (DySP / ACP)',
      'तहसीलदार (Tahsildar)',
      'गट विकास अधिकारी (BDO)',
      'मुख्याधिकारी नगरपरिषद (Chief Officer)',
      'महाराष्ट्र वित्त व लेखा सेवा (Class 1)'
    ],
    targetPostsEn: [
      'Deputy Collector',
      'Dy. Superintendent of Police (DySP)',
      'Tahsildar',
      'Block Development Officer (BDO)',
      'Chief Officer Municipal Council',
      'Finance & Accounts Service Group A'
    ],
    departmentMr: 'सामान्य प्रशासन विभाग, महाराष्ट्र शासन',
    departmentEn: 'General Administration Dept., Govt. of Maharashtra',
    patternSummaryMr: 'एकूण ९ पेपर्स, १७५० लेखी गुण + २७५ मुलाखत गुण (UPSC प्रमाणे वर्णनात्मक)',
    patternSummaryEn: '9 Papers, 1750 Written Marks + 275 Personality Test / Interview',
    totalMarks: 2025,
    durationMinutes: 180,
    negativeMarking: 'N/A (Descriptive Writing)',
    syllabusHighlightsMr: [
      'मराठी व इंग्रजी भाषा (पात्रता व गुणकारी निबंध)',
      'सामान्य अध्ययन १ (इतिहास, भूगोल, कृषी व समाज)',
      'सामान्य अध्ययन २ (राज्यघटना, शासन व आंतरराष्ट्रीय संबंध)',
      'सामान्य अध्ययन ३ (तंत्रज्ञान, अर्थव्यवस्था व पर्यावरण)',
      'सामान्य अध्ययन ४ (नीतिशास्त्र व सत्यनिष्ठा - Ethics)'
    ],
    syllabusHighlightsEn: [
      'Language Qualifying & Essay Papers',
      'General Studies I (History, Geography, Society)',
      'General Studies II (Polity, Governance, IR)',
      'General Studies III (Economy, Science & Tech)',
      'General Studies IV (Ethics, Integrity & Aptitude)'
    ],
    strategyTipMr: 'रोज किमान २ मुख्य परीक्षेचे उत्तरे लिहून सराव करा. केस स्टडीज सोडवताना प्रशासकीय मूल्ये अधोरेखित करा.',
    strategyTipEn: 'Practice daily answer writing with strict word limits. Structure answers with headings, flowchart diagrams, and policy citations.',
    officialNoticeUrl: 'https://mpsc.gov.in',
    isFeatured: true,
    accentColor: 'purple'
  },
  {
    id: 'mpsc_psi_physical_mains_2026',
    titleMr: 'MPSC पोलीस उपनिरीक्षक (PSI) मुख्य व शारीरिक चाचणी २०२६',
    titleEn: 'MPSC Police Sub-Inspector (PSI) Mains & Physical Endurance Test 2026',
    shortNameMr: 'PSI मुख्य व ग्राउंड २०२६',
    shortNameEn: 'PSI Mains & Physical 2026',
    stage: 'skill',
    stageLabelMr: 'मुख्य परीक्षा व शारीरिक चाचणी',
    stageLabelEn: 'Mains & Physical Ground',
    targetDate: '2027-01-10T07:00:00',
    examPatternId: 'combine_group_b_c',
    targetPostsMr: ['पोलीस उपनिरीक्षक (Police Sub-Inspector - PSI)'],
    targetPostsEn: ['Police Sub-Inspector (PSI)'],
    departmentMr: 'गृह विभाग, महाराष्ट्र शासन',
    departmentEn: 'Home Department, Maharashtra State',
    patternSummaryMr: 'लेखी परीक्षा (४०० गुण) + मैदानी चाचणी (१०० गुण - किमान ७० गुण पात्र)',
    patternSummaryEn: 'Written Test (400 Marks) + Ground Physical Test (100 Marks, 70 Qualifying)',
    totalMarks: 400,
    durationMinutes: 60,
    negativeMarking: '1/4th (0.25)',
    syllabusHighlightsMr: [
      'मराठी व्याकरण व शब्दसंग्रह (१०० गुण)',
      'इंग्रजी व्याकरण व Comprehension (६० गुण)',
      'सामान्य ज्ञान, न्यायव्यवस्था व महाराष्ट्र पोलीस अधिनियम',
      '८०० मीटर धावणे, गोळाफेक, पुल-अप्स व लांब उडी'
    ],
    syllabusHighlightsEn: [
      'Marathi Grammar & Vocab (100 Marks)',
      'English Grammar & Vocab (60 Marks)',
      'General Studies, Criminal Laws & Police Acts',
      'Physical: 800m Running, Shot Put, Pull-ups, Long Jump'
    ],
    strategyTipMr: 'सकाळी मैदानी सराव व दुपारी कायदा/व्याकरणाचा सराव करा. ७० गुणांची मर्यादा गाठण्यासाठी गोळाफेक आणि धावण्यावर विशेष लक्ष द्या.',
    strategyTipEn: 'Balance rigorous physical endurance training with daily Marathi grammar and Criminal procedure revisions.',
    officialNoticeUrl: 'https://mpsc.gov.in',
    isFeatured: false,
    accentColor: 'rose'
  },
  {
    id: 'mpsc_clerk_typing_skill_2027',
    titleMr: 'MPSC लिपिक-टंकलेखक व कर सहाय्यक कौशल्य (Typing) चाचणी २०२७',
    titleEn: 'MPSC Clerk-Typist & Tax Assistant Computer Typing Skill Test 2027',
    shortNameMr: 'टंकलेखन कौशल्य चाचणी २०२७',
    shortNameEn: 'Typing Skill Test 2027',
    stage: 'skill',
    stageLabelMr: 'कौशल्य चाचणी (Typing Test)',
    stageLabelEn: 'Qualifying Typing Test',
    targetDate: '2027-01-24T09:00:00',
    examPatternId: 'combine_group_b_c',
    targetPostsMr: ['लिपिक-टंकलेखक (Clerk-Typist)', 'कर सहाय्यक (Tax Assistant)'],
    targetPostsEn: ['Clerk-Typist', 'Tax Assistant'],
    departmentMr: 'महसूल, मंत्रालय व विविध प्रशासकीय विभाग',
    departmentEn: 'Revenue, Mantralaya & Field Offices',
    patternSummaryMr: 'मराठी ३० श.प्र.मि. (१० मिनिटे) / इंग्रजी ४० श.प्र.मि. (१० मिनिटे) पात्रता चाचणी',
    patternSummaryEn: 'Marathi 30 WPM / English 40 WPM on Computer (10 Mins qualifying test)',
    totalMarks: 50,
    durationMinutes: 10,
    negativeMarking: 'Penalty for typos (>7% errors)',
    syllabusHighlightsMr: [
      'मराठी ३० श.प्र.मि. संगणकीय टंकलेखन (३०० शब्द १० मिनिटात)',
      'इंग्रजी ४० श.प्र.मि. संगणकीय टंकलेखन (४०० शब्द १० मिनिटात)',
      'बॅकस्पेस मर्यादा व अचूकतेचे निकष (९०%+ Accuracy)'
    ],
    syllabusHighlightsEn: [
      'Marathi 30 WPM Passage typing on PC',
      'English 40 WPM Passage typing on PC',
      'Backspace limitations & high accuracy criteria'
    ],
    strategyTipMr: 'दररोज किमान ३० मिनिटे पॅसेज टायपिंगचा सराव करा. वेगापेक्षा अचूकतेला (Accuracy) प्राधान्य द्या.',
    strategyTipEn: 'Practice touch typing on desktop keyboards daily. Focus on error minimization over reckless speed.',
    officialNoticeUrl: 'https://mpsc.gov.in',
    isFeatured: false,
    accentColor: 'emerald'
  },
  {
    id: 'mpsc_technical_services_prelims_2027',
    titleMr: 'MPSC महाराष्ट्र तांत्रिक सेवा (कृषी, वन व अभियांत्रिकी) संयुक्त पूर्व परीक्षा २०२६-२७',
    titleEn: 'MPSC Maharashtra Gazetted Technical Services Combined Prelims 2026-27',
    shortNameMr: 'तांत्रिक सेवा पूर्व परीक्षा २०२७',
    shortNameEn: 'Technical Services 2027',
    stage: 'prelims',
    stageLabelMr: 'पूर्व परीक्षा (तांत्रिक संवर्ग)',
    stageLabelEn: 'Prelims (Technical Cadres)',
    targetDate: '2027-02-14T09:30:00',
    examPatternId: 'rajyaseva_gs',
    targetPostsMr: [
      'सहाय्यक वनसंरक्षक / वनक्षेत्रपाल (ACF / RFO)',
      'तालुका कृषी अधिकारी / कृषी अधिकारी (Class 1 & 2)',
      'सहाय्यक कार्यकारी अभियंता (Civil, Mech, Electrical)'
    ],
    targetPostsEn: [
      'Assistant Conservator of Forest / RFO',
      'Agriculture Officer (Group A & B)',
      'Assistant Executive Engineer / Assistant Engineer'
    ],
    departmentMr: 'कृषी, वन व सार्वजनिक बांधकाम / जलसंपदा विभाग',
    departmentEn: 'Agriculture, Forests & PWD / WRD Depts.',
    patternSummaryMr: '१०० प्रश्न, २०० गुण, १ तास, १/४ (०.२५) नकारात्मक गुण',
    patternSummaryEn: '100 MCQs, 200 Marks, 60 Minutes, 1/4th Negative Penalty',
    totalMarks: 200,
    durationMinutes: 60,
    negativeMarking: '1/4th (0.25)',
    syllabusHighlightsMr: [
      'मराठी व्याकरण (५० गुण) व इंग्रजी व्याकरण (५० गुण)',
      'चालू घडामोडी व भारताचा/महाराष्ट्राचा इतिहास व भूगोल (६० गुण)',
      'भारतीय राज्यघटना व विज्ञान-तंत्रज्ञान (४० गुण)'
    ],
    syllabusHighlightsEn: [
      'Marathi & English Language Proficiency',
      'Current Affairs & Maharashtra Geography',
      'Constitution of India & Applied Technology'
    ],
    strategyTipMr: 'भाषा विषय (मराठी व इंग्रजी) हे मेरिट ठरवणारे आहेत. व्याकरण नियमांचा कसून सराव करा.',
    strategyTipEn: 'Languages (Marathi & English) carry 50% weightage; ensure flawless grammar concepts.',
    officialNoticeUrl: 'https://mpsc.gov.in',
    isFeatured: true,
    accentColor: 'emerald'
  },
  {
    id: 'mpsc_combine_group_b_mains_2027',
    titleMr: 'MPSC संयुक्त गट-ब मुख्य परीक्षा २०२६-२७',
    titleEn: 'MPSC Combined Group B Services Mains Examination 2026-27',
    shortNameMr: 'संयुक्त गट-ब मुख्य परीक्षा २०२७',
    shortNameEn: 'Combine Group B Mains 2027',
    stage: 'mains',
    stageLabelMr: 'मुख्य परीक्षा (वस्तुनिष्ठ)',
    stageLabelEn: 'Mains (Objective 400 Marks)',
    targetDate: '2027-03-07T09:30:00',
    examPatternId: 'combine_group_b_c',
    targetPostsMr: ['सहाय्यक कक्ष अधिकारी (ASO)', 'राज्य कर निरीक्षक (STI)', 'पोलीस उपनिरीक्षक (PSI)'],
    targetPostsEn: ['Assistant Section Officer (ASO)', 'State Tax Inspector (STI)', 'PSI'],
    departmentMr: 'मंत्रालय, वित्त व गृह विभाग',
    departmentEn: 'Secretariat, Finance & Home Depts.',
    patternSummaryMr: 'पेपर १ (भाषा - २०० गुण) + पेपर २ (सामान्य अध्ययन व बुद्धिमत्ता - २०० गुण)',
    patternSummaryEn: 'Paper 1 (Languages - 200M) + Paper 2 (GS & Reasoning - 200M)',
    totalMarks: 400,
    durationMinutes: 120,
    negativeMarking: '1/4th (0.25)',
    syllabusHighlightsMr: [
      'मराठी व्याकरण व उतारे (१०० गुण)',
      'इंग्रजी व्याकरण व उतारे (१०० गुण)',
      'सामान्य अध्ययन: माहिती अधिकार, लोकसेवा हक्क, संगणक ज्ञान',
      'भारतीय अर्थव्यवस्था, नियोजन व कायदे'
    ],
    syllabusHighlightsEn: [
      'Marathi Grammar, Vocab & Comprehension',
      'English Grammar, Vocab & Comprehension',
      'GS: RTI Act, Maharashtra Right to Public Services, ICT',
      'Indian Economy, Planning & Constitutional Law'
    ],
    strategyTipMr: 'RTI कायदा, माहिती तंत्रज्ञान आणि सामान्य अध्ययनातील विशेष कायद्यांवर पूर्ण गुण मिळवणे शक्य आहे.',
    strategyTipEn: 'Master specific acts like RTI 2005 and Maharashtra Public Services Act to secure safe cutoffs.',
    officialNoticeUrl: 'https://mpsc.gov.in',
    isFeatured: false,
    accentColor: 'indigo'
  },
  {
    id: 'mpsc_combine_group_c_mains_2027',
    titleMr: 'MPSC संयुक्त गट-क मुख्य परीक्षा २०२६-२७',
    titleEn: 'MPSC Combined Group C Services Mains Examination 2026-27',
    shortNameMr: 'संयुक्त गट-क मुख्य परीक्षा २०२७',
    shortNameEn: 'Combine Group C Mains 2027',
    stage: 'mains',
    stageLabelMr: 'मुख्य परीक्षा (वस्तुनिष्ठ)',
    stageLabelEn: 'Mains (Objective 400 Marks)',
    targetDate: '2027-03-28T09:30:00',
    examPatternId: 'combine_group_b_c',
    targetPostsMr: [
      'कर सहाय्यक (Tax Assistant)',
      'लिपिक-टंकलेखक (Clerk-Typist)',
      'दुय्यम निरीक्षक उत्पादन शुल्क (Excise Sub-Inspector)',
      'तांत्रिक सहाय्यक (Technical Assistant)'
    ],
    targetPostsEn: [
      'Tax Assistant',
      'Clerk-Typist',
      'Sub-Inspector State Excise',
      'Technical Assistant'
    ],
    departmentMr: 'राज्य उत्पादन शुल्क, वित्त व विमा संचालनालय',
    departmentEn: 'State Excise, Finance & Insurance Directorates',
    patternSummaryMr: 'पेपर १ (भाषा - २०० गुण) + पेपर २ (सामान्य क्षमता चाचणी - २०० गुण)',
    patternSummaryEn: 'Paper 1 (Languages - 200M) + Paper 2 (General Ability - 200M)',
    totalMarks: 400,
    durationMinutes: 120,
    negativeMarking: '1/4th (0.25)',
    syllabusHighlightsMr: [
      'मराठी व इंग्रजी व्याकरण (२०० गुण)',
      'चालू घडामोडी, अंकगणित व सांख्यिकी',
      'बहीखाते व लेखाकर्म (कर सहाय्यक पदासाठी)',
      'औद्योगिक कायदे व सामान्य विज्ञान'
    ],
    syllabusHighlightsEn: [
      'Marathi & English Grammar Mastery (200 Marks)',
      'Current Affairs, Math & Basic Statistics',
      'Bookkeeping & Accountancy (For Tax Assistant)',
      'Industrial Laws & General Science'
    ],
    strategyTipMr: 'कर सहाय्यक पदासाठी बुककीपिंग आणि बेसिक अकौंटिंगचे PYQ वारंवार सोडवा.',
    strategyTipEn: 'Solve bookkeeping and accountancy PYQs repeatedly for the Tax Assistant category.',
    officialNoticeUrl: 'https://mpsc.gov.in',
    isFeatured: false,
    accentColor: 'blue'
  },
  {
    id: 'mpsc_rajyaseva_prelims_2027',
    titleMr: 'MPSC राज्यसेवा (नागरी सेवा राजपत्रित) पूर्व परीक्षा २०२७',
    titleEn: 'MPSC Maharashtra Civil Services Gazetted Prelims Examination 2027',
    shortNameMr: 'राज्यसेवा पूर्व परीक्षा २०२७',
    shortNameEn: 'Rajyaseva Prelims 2027',
    stage: 'prelims',
    stageLabelMr: 'पूर्व परीक्षा (GS + CSAT)',
    stageLabelEn: 'Prelims (GS + CSAT Qualifying)',
    targetDate: '2027-05-30T10:00:00',
    examPatternId: 'rajyaseva_gs',
    targetPostsMr: [
      'उपजिल्हाधिकारी (Dy. Collector)',
      'पोलीस उपअधीक्षक (DySP)',
      'तहसीलदार (Tahsildar)',
      'गट विकास अधिकारी (BDO)',
      '३३ विविध राजपत्रित वर्ग-१ व वर्ग-२ संवर्ग'
    ],
    targetPostsEn: [
      'Deputy Collector',
      'Dy. Superintendent of Police',
      'Tahsildar',
      'Block Development Officer',
      '33 Gazetted Class-1 & Class-2 cadres'
    ],
    departmentMr: 'सामान्य प्रशासन विभाग, महाराष्ट्र शासन',
    departmentEn: 'General Administration Department, GoM',
    patternSummaryMr: 'पेपर १: GS (१०० प्रश्न, २०० गुण) + पेपर २: CSAT (८० प्रश्न, २०० गुण - ३३% पात्रता)',
    patternSummaryEn: 'Paper 1: GS (100 Qs, 200M) + Paper 2: CSAT (80 Qs, 200M - 33% Qualifying)',
    totalMarks: 400,
    durationMinutes: 240,
    negativeMarking: '1/4th (0.25)',
    syllabusHighlightsMr: [
      'इतिहास (महाराष्ट्र व भारत), भूगोल (महाराष्ट्र व भारत)',
      'भारतीय राज्यघटना, शासन व आंतरराष्ट्रीय घडामोडी',
      'आर्थिक व सामाजिक विकास, दारिद्र्य, लोकसंख्या',
      'पर्यावरण, जैवविविधता व हवामान बदल',
      'CSAT: आकलन क्षमता, तार्किक विचार व निर्णयक्षमता'
    ],
    syllabusHighlightsEn: [
      'History & Geography (Special Focus on Maharashtra)',
      'Indian Polity, Governance & Panchayati Raj',
      'Economic & Social Development, Sustainable Goals',
      'Environment, Ecology, Biodiversity & Climate Change',
      'CSAT: Comprehension, Logical Reasoning & Decision Making'
    ],
    strategyTipMr: 'CSAT पेपर ३३% (६६ गुण) अनिवार्य पात्रतेचा आहे, त्याकडे दुर्लक्ष करू नका. GS मध्ये इतिहास व भूगोलातील महाराष्ट्र घटकांवर विशेष भर द्या.',
    strategyTipEn: 'Ensure 33% (66+ marks) in CSAT to qualify for GS evaluation. Focus on NCERT/State Board fundamentals.',
    officialNoticeUrl: 'https://mpsc.gov.in',
    isFeatured: true,
    accentColor: 'amber'
  }
];

export interface TimeRemaining {
  totalSeconds: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  formattedStringMr: string;
  formattedStringEn: string;
}

/**
 * Calculates real-time difference from now to the target date.
 */
export function calculateTimeRemaining(targetDateIso: string): TimeRemaining {
  const target = new Date(targetDateIso).getTime();
  const now = Date.now();
  const diffMs = target - now;

  if (diffMs <= 0) {
    return {
      totalSeconds: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
      formattedStringMr: 'परीक्षा पूर्ण झाली किंवा आज आहे!',
      formattedStringEn: 'Exam has arrived or concluded!'
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    totalSeconds,
    days,
    hours,
    minutes,
    seconds,
    isPast: false,
    formattedStringMr: `${days} दिवस, ${hours} तास, ${minutes} मिनिटे`,
    formattedStringEn: `${days}d ${hours}h ${minutes}m ${seconds}s`
  };
}

/**
 * Custom Exam Targets stored in local storage so students can add their own
 * mock test dates, test series deadlines, or personal study milestones.
 */
const CUSTOM_EXAMS_STORAGE_KEY = 'mpsc_custom_user_exam_targets_v1';
const PRIMARY_EXAM_STORAGE_KEY = 'mpsc_primary_target_exam_id_v1';

export function getCustomExamTargets(): MpscExamItem[] {
  try {
    const raw = localStorage.getItem(CUSTOM_EXAMS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load custom exams:', e);
  }
  return [];
}

export function saveCustomExamTarget(exam: Omit<MpscExamItem, 'id' | 'isCustom'>): MpscExamItem[] {
  const current = getCustomExamTargets();
  const newItem: MpscExamItem = {
    ...exam,
    id: `custom_exam_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    isCustom: true,
  };
  const updated = [newItem, ...current];
  try {
    localStorage.setItem(CUSTOM_EXAMS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save custom exam:', e);
  }
  return updated;
}

export function deleteCustomExamTarget(id: string): MpscExamItem[] {
  const current = getCustomExamTargets();
  const updated = current.filter(item => item.id !== id);
  try {
    localStorage.setItem(CUSTOM_EXAMS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to delete custom exam:', e);
  }
  return updated;
}

export function getPrimaryTargetExamId(): string {
  try {
    const saved = localStorage.getItem(PRIMARY_EXAM_STORAGE_KEY);
    if (saved === 'mpsc_group_c_talathi_3jan_2026') return 'mpsc_group_c_talathi_3jan_2027';
    if (saved) return saved;
  } catch (e) {
    // ignore
  }
  return 'mpsc_group_c_talathi_3jan_2027';
}

export function setPrimaryTargetExamId(id: string): void {
  try {
    localStorage.setItem(PRIMARY_EXAM_STORAGE_KEY, id);
  } catch (e) {
    // ignore
  }
}
