import { ExamPatternId, Question, SubjectId } from '../types';
import { MPSC_QUESTIONS } from './mpscQuestions';

export interface GroupCTalathiSetSection {
  id: string;
  titleMr: string;
  titleEn: string;
  subjectId: SubjectId | 'gs';
  questionRange: string;
  count: number;
}

export interface GroupCTalathiSetMeta {
  id: string;
  patternId: ExamPatternId;
  setNumber: number;
  titleMr: string;
  titleEn: string;
  subtitleMr: string;
  subtitleEn: string;
  targetExamDate: string;
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  negativeMarking: string;
  difficulty: 'Moderate' | 'Hard' | 'Exam-Standard';
  descriptionMr: string;
  descriptionEn: string;
  focusAreasMr: string[];
  focusAreasEn: string[];
  expectedCutoff: {
    open: number;
    obc: number;
    sc: number;
    st: number;
  };
  sections: GroupCTalathiSetSection[];
}

export interface OfficialSyllabusTopic {
  srNo: number;
  srNoMr: string;
  titleMr: string;
  titleEn: string;
  detailsMr: string;
  detailsEn: string;
  expectedQuestions: number;
  subjectId: SubjectId;
  badgeColor: string;
}

/**
 * Official MPSC Non-Gazetted Group C Combined Prelims Syllabus
 * (सामान्य क्षमता चाचणी - General Ability Test: 100 Qs / 100 Marks / 60 Mins)
 */
export const MPSC_GROUP_C_OFFICIAL_PRELIMS_SYLLABUS: OfficialSyllabusTopic[] = [
  {
    srNo: 1,
    srNoMr: '१',
    titleMr: 'चालू घडामोडी',
    titleEn: 'Current Affairs',
    detailsMr: 'जागतिक तसेच भारतातील (महाराष्ट्रासह विशेष घडामोडी).',
    detailsEn: 'Global as well as Indian (including Maharashtra current affairs).',
    expectedQuestions: 15,
    subjectId: 'current_affairs',
    badgeColor: 'rose',
  },
  {
    srNo: 2,
    srNoMr: '२',
    titleMr: 'नागरिकशास्त्र',
    titleEn: 'Civics / Polity',
    detailsMr: 'भारताच्या घटनेचा प्राथमिक अभ्यास, राज्य व्यवस्थापन (प्रशासन), ग्राम व्यवस्थापन (प्रशासन).',
    detailsEn: 'Basic study of the Constitution of India, State Administration, Rural / Village Administration (Panchayati Raj).',
    expectedQuestions: 15,
    subjectId: 'polity',
    badgeColor: 'purple',
  },
  {
    srNo: 3,
    srNoMr: '३',
    titleMr: 'इतिहास',
    titleEn: 'History',
    detailsMr: 'आधुनिक भारताचा विशेषतः महाराष्ट्राचा इतिहास.',
    detailsEn: 'History of Modern India, especially Maharashtra history.',
    expectedQuestions: 10,
    subjectId: 'maharashtra_history',
    badgeColor: 'amber',
  },
  {
    srNo: 4,
    srNoMr: '४',
    titleMr: 'भूगोल (महाराष्ट्राच्या भूगोलाच्या विशेष संदर्भासह)',
    titleEn: 'Geography (Special reference to Maharashtra)',
    detailsMr: 'पृथ्वी, जगातील विभाग, हवामान, अक्षांश-रेखांश, महाराष्ट्रातील जमिनीचे प्रकार, पर्जन्यमान, प्रमुख पिके, शहरे, नद्या, उद्योगधंदे, इत्यादी.',
    detailsEn: 'Earth, World divisions, Climate, Latitudes-Longitudes, Soils of Maharashtra, Rainfall, Major crops, Cities, Rivers, Industries, etc.',
    expectedQuestions: 15,
    subjectId: 'maharashtra_geography',
    badgeColor: 'emerald',
  },
  {
    srNo: 5,
    srNoMr: '५',
    titleMr: 'अर्थव्यवस्था',
    titleEn: 'Economy',
    detailsMr: '(अ) भारतीय अर्थव्यवस्था - राष्ट्रीय उत्पन्न, शेती, उद्योग, परकीय व्यापार, बँकिंग, लोकसंख्या, दारिद्र्य व बेरोजगारी, मुद्रा आणि राजकोषीय नीति, इत्यादी.\n(ब) शासकीय अर्थव्यवस्था - अर्थसंकल्प, लेखा, लेखापरीक्षण, इत्यादी.',
    detailsEn: '(A) Indian Economy: National income, agriculture, industry, foreign trade, banking, population, poverty and unemployment, currency and fiscal policy, etc.\n(B) Public Finance: Budget, accounts, auditing, etc.',
    expectedQuestions: 15,
    subjectId: 'economy',
    badgeColor: 'sky',
  },
  {
    srNo: 6,
    srNoMr: '६',
    titleMr: 'सामान्य विज्ञान',
    titleEn: 'General Science',
    detailsMr: 'भौतिकशास्त्र (Physics), रसायनशास्त्र (Chemistry), प्राणिशास्त्र (Zoology), वनस्पतीशास्त्र (Botany), आरोग्यशास्त्र (Hygiene).',
    detailsEn: 'Physics, Chemistry, Zoology, Botany, Hygiene.',
    expectedQuestions: 15,
    subjectId: 'general_science',
    badgeColor: 'indigo',
  },
  {
    srNo: 7,
    srNoMr: '७',
    titleMr: 'बुद्धिमापन चाचणी',
    titleEn: 'General Mental Ability / Intelligence Test',
    detailsMr: 'उमेदवार किती लवकर व अचूकपणे विचार करू शकतो हे आजमावण्यासाठी प्रश्न.',
    detailsEn: 'Questions to assess speed and precision of logical problem-solving.',
    expectedQuestions: 8,
    subjectId: 'csat',
    badgeColor: 'teal',
  },
  {
    srNo: 8,
    srNoMr: '८',
    titleMr: 'अंकगणित',
    titleEn: 'Basic Arithmetic',
    detailsMr: 'बेरीज, वजाबाकी, गुणाकार, भागाकार, दशांश अपूर्णांक व टक्केवारी.',
    detailsEn: 'Addition, subtraction, multiplication, division, decimal fractions, and percentages.',
    expectedQuestions: 7,
    subjectId: 'csat',
    badgeColor: 'orange',
  },
];

export const GROUP_C_PRELIMS_OFFICIAL_8_SECTIONS: GroupCTalathiSetSection[] = [
  {
    id: 'sec_current_affairs',
    titleMr: 'विभाग १: चालू घडामोडी (जागतिक व भारत)',
    titleEn: 'Sec 1: Current Affairs (Global & India)',
    subjectId: 'current_affairs',
    questionRange: 'प्रश्न १ ते १५',
    count: 15,
  },
  {
    id: 'sec_polity',
    titleMr: 'विभाग २: नागरिकशास्त्र (संविधान व प्रशासन)',
    titleEn: 'Sec 2: Civics & Polity (Constitution & Admin)',
    subjectId: 'polity',
    questionRange: 'प्रश्न १६ ते ३०',
    count: 15,
  },
  {
    id: 'sec_history',
    titleMr: 'विभाग ३: इतिहास (आधुनिक भारत व महाराष्ट्र)',
    titleEn: 'Sec 3: History (Modern India & MH)',
    subjectId: 'maharashtra_history',
    questionRange: 'प्रश्न ३१ ते ४०',
    count: 10,
  },
  {
    id: 'sec_geography',
    titleMr: 'विभाग ४: भूगोल (महाराष्ट्र विशेष संदर्भासह)',
    titleEn: 'Sec 4: Geography (Special MH focus)',
    subjectId: 'maharashtra_geography',
    questionRange: 'प्रश्न ४१ ते ५५',
    count: 15,
  },
  {
    id: 'sec_economy',
    titleMr: 'विभाग ५: अर्थव्यवस्था (भारतीय व शासकीय)',
    titleEn: 'Sec 5: Economy (Indian & Public Finance)',
    subjectId: 'economy',
    questionRange: 'प्रश्न ५६ ते ७०',
    count: 15,
  },
  {
    id: 'sec_science',
    titleMr: 'विभाग ६: सामान्य विज्ञान (भौतिक, रसायन, जीव, आरोग्य)',
    titleEn: 'Sec 6: General Science (Phy, Chem, Bio, Hygiene)',
    subjectId: 'general_science',
    questionRange: 'प्रश्न ७१ ते ८५',
    count: 15,
  },
  {
    id: 'sec_reasoning',
    titleMr: 'विभाग ७: बुद्धिमापन चाचणी (तर्कक्षमता व विचारवेग)',
    titleEn: 'Sec 7: Reasoning (Speed & Logical Ability)',
    subjectId: 'csat',
    questionRange: 'प्रश्न ८६ ते ९३',
    count: 8,
  },
  {
    id: 'sec_arithmetic',
    titleMr: 'विभाग ८: अंकगणित (दशांश अपूर्णांक व टक्केवारी)',
    titleEn: 'Sec 8: Arithmetic (Decimals & Percentages)',
    subjectId: 'csat',
    questionRange: 'प्रश्न ९४ ते १००',
    count: 7,
  },
];

export const TALATHI_SECTIONS_STANDARD = GROUP_C_PRELIMS_OFFICIAL_8_SECTIONS;

export const MPSC_GROUP_C_TALATHI_SETS_CATALOG: GroupCTalathiSetMeta[] = [
  {
    id: 'mpsc_group_c_talathi_set_1',
    patternId: 'mpsc_group_c_talathi_set_1',
    setNumber: 1,
    titleMr: 'MPSC गट-क / तलाठी महा सराव संच १ (३ जाने २०२७ विशेष)',
    titleEn: 'MPSC Group C / Talathi Mega Mock Set 1 (3 Jan 2027 Special)',
    subtitleMr: 'सर्वसमावेशक अभ्यासक्रम मॉडेल पेपर • १०० प्रश्न • ६० मिनिटे',
    subtitleEn: 'Full Comprehensive Syllabus Mock • 100 Qs • 60 Mins',
    targetExamDate: '३ जानेवारी २०२७',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    difficulty: 'Exam-Standard',
    descriptionMr: '३ जानेवारी २०२७ रोजी होणाऱ्या MPSC गट-क पूर्व परीक्षेच्या अधिकृत अभ्यासक्रमानुसार (सामान्य क्षमता चाचणी) तयार केलेला पहिला महा सराव संच. यात इतिहास १०, भूगोल १५, अर्थव्यवस्था १५, चालू घडामोडी १५, राज्यशास्त्र १५, सामान्य विज्ञान १५, अंकगणित ८ व बुद्धिमत्ता ७ असे परिपूर्ण १०० प्रश्न समाविष्ट आहेत.',
    descriptionEn: 'Official full-length simulation tailored for the 3 January 2027 MPSC Group C Prelims (General Ability Test). Features exactly 10 History, 15 Geography, 15 Economy, 15 Current Affairs, 15 Polity, 15 Science, 8 Arithmetic, and 7 Reasoning questions.',
    focusAreasMr: ['महाराष्ट्राचा इतिहास व समाजसुधारक', 'जमिनीचे प्रकार, पिके व नद्या', 'राष्ट्रीय उत्पन्न व अर्थसंकल्प', 'दशांश अपूर्णांक, टक्केवारी व तर्क'],
    focusAreasEn: ['MH History & Reformers', 'Soil Types, Rivers & Crops', 'National Income & Budget', 'Decimals, Fractions & Reasoning'],
    expectedCutoff: { open: 58.5, obc: 55.0, sc: 49.0, st: 43.5 },
    sections: TALATHI_SECTIONS_STANDARD,
  },
  {
    id: 'mpsc_group_c_talathi_set_2',
    patternId: 'mpsc_group_c_talathi_set_2',
    setNumber: 2,
    titleMr: 'MPSC गट-क / तलाठी महा सराव संच २ (३ जाने २०२७ विशेष)',
    titleEn: 'MPSC Group C / Talathi Mega Mock Set 2 (3 Jan 2027 Special)',
    subtitleMr: 'उच्च काठिण्य पातळी • इतिहास, भूगोल व विज्ञान विशेष',
    subtitleEn: 'High Difficulty Tier • History, Geography & Science Focus',
    targetExamDate: '३ जानेवारी २०२७',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    difficulty: 'Hard',
    descriptionMr: 'अचूकता आणि वेळेचे आव्हान देणारा संच २. यात सामान्य विज्ञानातील गूढ संकल्पना, महाराष्ट्राचा आधुनिक इतिहास, भूगोलातील हवामान व पर्जन्यमान आणि अंकगणितातील गुंतागुंतीचे प्रश्न समाविष्ट आहेत.',
    descriptionEn: 'Rigorous 100-question mock test set designed to test time management, negative marking avoidance, and multi-concept questions across all 8 Prelims topics for 3 Jan 2027 exam.',
    focusAreasMr: ['१८५७ उठाव व महाराष्ट्र', 'दख्खन पठार व हवामान', 'भौतिक व रसायनशास्त्र', 'काम-काळ-वेग व वयवारी'],
    focusAreasEn: ['1857 Revolt in MH', 'Deccan Plateau & Climate', 'Physics & Chemistry', 'Time-Work & Ages'],
    expectedCutoff: { open: 56.0, obc: 53.5, sc: 48.0, st: 42.0 },
    sections: TALATHI_SECTIONS_STANDARD,
  },
  {
    id: 'mpsc_group_c_talathi_set_3',
    patternId: 'mpsc_group_c_talathi_set_3',
    setNumber: 3,
    titleMr: 'MPSC गट-क / तलाठी महा सराव संच ३ (३ जाने २०२७ विशेष)',
    titleEn: 'MPSC Group C / Talathi Mega Mock Set 3 (3 Jan 2027 Special)',
    subtitleMr: 'अर्थव्यवस्था, बँकिंग व शासकीय वित्त बूस्टर पेपर',
    subtitleEn: 'Economy, Banking & Public Finance Booster',
    targetExamDate: '३ जानेवारी २०२७',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    difficulty: 'Exam-Standard',
    descriptionMr: 'अर्थव्यवस्था विषयात १५ पैकी १५ गुण मिळवण्यासाठी तयार केलेला संच. राष्ट्रीय उत्पन्न, शेती, उद्योग, बँकिंग, दारिद्र्य, मुद्रा व राजकोषीय धोरण, अर्थसंकल्प आणि इतर सर्व ७ विषयांचे परिपूर्ण प्रश्न.',
    descriptionEn: 'Special emphasis on Indian Economy and Public Finance (15 Qs) alongside complete History, Geography, Polity, Science, Current Affairs, and CSAT sections for 3 Jan 2027.',
    focusAreasMr: ['राष्ट्रीय उत्पन्न (GDP/GNP)', 'रिझर्व्ह बँक व बँकिंग', 'दारिद्र्य व बेरोजगारी', 'शेकडा नफा-तोटा व सरासरी'],
    focusAreasEn: ['National Income (GDP)', 'RBI & Banking System', 'Poverty & Unemployment', 'Profit-Loss & Averages'],
    expectedCutoff: { open: 59.0, obc: 56.0, sc: 50.0, st: 44.0 },
    sections: TALATHI_SECTIONS_STANDARD,
  },
  {
    id: 'mpsc_group_c_talathi_set_4',
    patternId: 'mpsc_group_c_talathi_set_4',
    setNumber: 4,
    titleMr: 'MPSC गट-क / तलाठी महा सराव संच ४ (३ जाने २०२७ विशेष)',
    titleEn: 'MPSC Group C / Talathi Mega Mock Set 4 (3 Jan 2027 Special)',
    subtitleMr: 'चालू घडामोडी (जागतिक, भारत, महा.) अचूकता टेस्ट',
    subtitleEn: 'Current Affairs (World, India & MH) Precision Test',
    targetExamDate: '३ जानेवारी २०२७',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    difficulty: 'Moderate',
    descriptionMr: 'जागतिक, राष्ट्रीय आणि महाराष्ट्र चालू घडामोडींवर भर असणारा सर्वंकष सराव संच. शासकीय योजना, पुरस्कार, क्रीडा, विज्ञान व तंत्रज्ञान घडामोडी आणि सर्व ८ विषयांचा अचूक समतोल.',
    descriptionEn: 'Comprehensive 100-question set emphasizing Current Affairs, Government Schemes, Awards, and Developments for 3 Jan 2027.',
    focusAreasMr: ['चालू घडामोडी २०२६-२७', 'शासकीय योजना व पुरस्कार', '७३ वी व ७४ वी घटनादुरुस्ती', 'बैठक व्यवस्था व कोडिंग'],
    focusAreasEn: ['Current Affairs 2026-27', 'Govt Schemes & Awards', '73rd & 74th Amendments', 'Seating & Coding-Decoding'],
    expectedCutoff: { open: 58.0, obc: 55.0, sc: 49.5, st: 43.0 },
    sections: TALATHI_SECTIONS_STANDARD,
  },
  {
    id: 'mpsc_group_c_talathi_set_5',
    patternId: 'mpsc_group_c_talathi_set_5',
    setNumber: 5,
    titleMr: 'MPSC गट-क / तलाठी महा सराव संच ५ (३ जाने २०२७ विशेष)',
    titleEn: 'MPSC Group C / Talathi Mega Mock Set 5 (3 Jan 2027 Special)',
    subtitleMr: 'महाराष्ट्र भूगोल, जमिनी, पिके व नद्या मॉडेल पेपर',
    subtitleEn: 'Maharashtra Geography, Soils, Crops & Rivers Model',
    targetExamDate: '३ जानेवारी २०२७',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    difficulty: 'Exam-Standard',
    descriptionMr: 'महाराष्ट्राच्या भूगोलावर विशेष भर: काळी रेगूर, जांभी जमीन, तांबडी जमीन, गोदावरी व भीमा खोरी, पर्जन्यमान, प्रमुख पिके व उद्योगधंदे. सर्व ८ घटकांचा समावेश.',
    descriptionEn: 'High-probability model paper focusing on Maharashtra Geography (Soils, Rainfall, Crops, Rivers, Industries) based on official syllabus.',
    focusAreasMr: ['महाराष्ट्रातील जमिनी व खनिजे', 'पर्जन्यमान व आंबोली', 'गोदावरी, भीमा, कृष्णा नद्या', 'घड्याळ, दिनदर्शिका व तर्क'],
    focusAreasEn: ['Soils & Minerals of MH', 'Rainfall Distribution', 'Godavari, Bhima, Krishna', 'Clock, Calendar & Logic'],
    expectedCutoff: { open: 58.5, obc: 55.5, sc: 49.0, st: 43.5 },
    sections: TALATHI_SECTIONS_STANDARD,
  },
  {
    id: 'mpsc_group_c_talathi_set_6',
    patternId: 'mpsc_group_c_talathi_set_6',
    setNumber: 6,
    titleMr: 'MPSC गट-क / तलाठी महा सराव संच ६ (३ जाने २०२७ विशेष)',
    titleEn: 'MPSC Group C / Talathi Mega Mock Set 6 (3 Jan 2027 Special)',
    subtitleMr: 'राज्यशास्त्र, संसद व स्थानिक स्वराज्य संस्था विशेष',
    subtitleEn: 'Polity, Parliament & Local Self-Govt Special',
    targetExamDate: '३ जानेवारी २०२७',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    difficulty: 'Moderate',
    descriptionMr: 'राज्यशास्त्र (संविधान, मूलभूत हक्क, मार्गदर्शक तत्त्वे, संसद, राज्य विधीमंडळ व ग्रामपंचायत/पंचायतराज) यावर आधारित १५ प्रश्न आणि उर्वरित ७ विषयांचे ८५ प्रश्न.',
    descriptionEn: 'Tailored for Indian Constitution, Fundamental Rights, State Legislature, and Local Self-Government alongside complete General Ability syllabus.',
    focusAreasMr: ['भारतीय राज्यघटना व कलमे', 'संसद व राज्यपाल अधिकार', 'ग्रामपंचायत व ग्रामसभा', 'अंकगणित लसावि-मसावि'],
    focusAreasEn: ['Indian Constitution Articles', 'Parliament & Governor', 'Gram Panchayat & Sabha', 'LCM-HCF & Arithmetic'],
    expectedCutoff: { open: 60.0, obc: 57.0, sc: 51.0, st: 45.0 },
    sections: TALATHI_SECTIONS_STANDARD,
  },
  {
    id: 'mpsc_group_c_talathi_set_7',
    patternId: 'mpsc_group_c_talathi_set_7',
    setNumber: 7,
    titleMr: 'MPSC गट-क / तलाठी महा सराव संच ७ (३ जाने २०२७ विशेष)',
    titleEn: 'MPSC Group C / Talathi Mega Mock Set 7 (3 Jan 2027 Special)',
    subtitleMr: 'सामान्य विज्ञान (प्राणी, वनस्पती, आरोग्यशास्त्र) पेपर',
    subtitleEn: 'General Science (Zoology, Botany, Hygiene) Paper',
    targetExamDate: '३ जानेवारी २०२७',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    difficulty: 'Exam-Standard',
    descriptionMr: 'अभ्यासक्रमातील घटक क्र. ६ (भौतिकशास्त्र, रसायनशास्त्र, प्राणिशास्त्र, वनस्पतीशास्त्र व आरोग्यशास्त्र) यावर भर असणारा परिपूर्ण १०० प्रश्नांचा पेपर.',
    descriptionEn: 'Special emphasis on General Science syllabus Item 6: Physics, Chemistry, Zoology, Botany, and Hygiene with detailed rationales.',
    focusAreasMr: ['आरोग्यशास्त्र व जीवनसत्त्वे', 'वनस्पती व पेशीशास्त्र', 'भौतिक राशी व ध्वनी/प्रकाश', 'दशांश व अपूर्णांक बेरीज'],
    focusAreasEn: ['Hygiene & Vitamins', 'Botany & Cell Biology', 'Physics & Sound/Light', 'Fractions & Decimals'],
    expectedCutoff: { open: 58.0, obc: 55.0, sc: 48.5, st: 42.5 },
    sections: TALATHI_SECTIONS_STANDARD,
  },
  {
    id: 'mpsc_group_c_talathi_set_8',
    patternId: 'mpsc_group_c_talathi_set_8',
    setNumber: 8,
    titleMr: 'MPSC गट-क / तलाठी महा सराव संच ८ (३ जाने २०२७ विशेष)',
    titleEn: 'MPSC Group C / Talathi Mega Mock Set 8 (3 Jan 2027 Special)',
    subtitleMr: '६० मिनिटे टाइम-मॅनेजमेंट स्पीड चॅलेंज (८ विषय)',
    subtitleEn: '60-Minute Speed & Precision Stress-Test (8 Subjects)',
    targetExamDate: '३ जानेवारी २०२७',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    difficulty: 'Hard',
    descriptionMr: 'प्रत्येक प्रश्नाला ३६ सेकंद या वेगाची सवय लावणारा वेगवान सराव संच. नकारात्मक गुण टाळून ६० मिनिटांत १०० प्रश्न हाताळण्याचे प्रशिक्षण.',
    descriptionEn: 'A high-tempo test simulating exam hall pressure to hone 36-second-per-question pace and eliminate negative marks for 3 Jan 2027.',
    focusAreasMr: ['इतिहास व समाजसुधारक', 'अर्थसंकल्प व वित्तीय तूट', 'वेन आकृत्या व नातेसंबंध', 'अंकगणित शेकडा नफा'],
    focusAreasEn: ['History & Reformers', 'Budget & Fiscal Deficit', 'Venn Diagrams & Relations', 'Arithmetic & Percentage'],
    expectedCutoff: { open: 55.5, obc: 52.5, sc: 47.0, st: 41.5 },
    sections: TALATHI_SECTIONS_STANDARD,
  },
  {
    id: 'mpsc_group_c_talathi_set_9',
    patternId: 'mpsc_group_c_talathi_set_9',
    setNumber: 9,
    titleMr: 'MPSC गट-क / तलाठी महा सराव संच ९ (३ जाने २०२७ विशेष)',
    titleEn: 'MPSC Group C / Talathi Mega Mock Set 9 (3 Jan 2027 Special)',
    subtitleMr: 'सर्व ८ विषयांची अंतिम उजळणी व ऑल-महाराष्ट्र सराव',
    subtitleEn: 'All 8-Subject Grand Revision & All-Maharashtra Test',
    targetExamDate: '३ जानेवारी २०२७',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    difficulty: 'Exam-Standard',
    descriptionMr: 'परीक्षेच्या शेवटच्या टप्प्यातील संपूर्ण उजळणीसाठी तयार केलेला संच ९. सर्व ८ घटकांचा संतुलित समावेश आणि संपूर्ण महाराष्ट्रातील विद्यार्थ्यांशी रँक तुलना.',
    descriptionEn: 'Comprehensive pre-exam revision set to cement concepts across all 8 syllabus topics with instant statewide ranking calculation for 3 Jan 2027.',
    focusAreasMr: ['इतिहास, भूगोल, अर्थ, राज्य', 'विज्ञान, चालू घडामोडी', 'अंकगणित (दशांश-अपूर्णांक)', 'बुद्धिमापन चाचणी'],
    focusAreasEn: ['History, Geo, Eco, Polity', 'Science & Current Affairs', 'Arithmetic (Decimals)', 'Mental Ability & Logic'],
    expectedCutoff: { open: 59.0, obc: 56.0, sc: 49.5, st: 43.5 },
    sections: TALATHI_SECTIONS_STANDARD,
  },
  {
    id: 'mpsc_group_c_talathi_set_10',
    patternId: 'mpsc_group_c_talathi_set_10',
    setNumber: 10,
    titleMr: 'MPSC गट-क / तलाठी महा सराव संच १० (३ जाने २०२७ विशेष)',
    titleEn: 'MPSC Group C / Talathi Mega Mock Set 10 (3 Jan 2027 Special)',
    subtitleMr: 'अंतिम ऑल महाराष्ट्र रँकर परीक्षा (Final Ranker Exam)',
    subtitleEn: 'Grand All-Maharashtra Ranker Test (Final Rehearsal)',
    targetExamDate: '३ जानेवारी २०२७',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarking: '१/४ (०.२५ गुण वजा)',
    difficulty: 'Hard',
    descriptionMr: '३ जानेवारी २०२७ च्या पूर्व परीक्षेपूर्वीची अंतिम रंगीत तालीम (Final Rehearsal)! संपूर्ण १०० गुणांची अधिकृत सामान्य क्षमता चाचणी देऊन तुमचा अंतिम राज्य रँक आणि अपेक्षित कट-ऑफ तपासा.',
    descriptionEn: 'The definitive final rehearsal before the 3 January 2027 prelims exam. Benchmark your exact state-level rank, percentile, and score across all 8 syllabus subjects.',
    focusAreasMr: ['इतिहास (१० प्रश्न)', 'भूगोल (१५ प्रश्न)', 'अर्थव्यवस्था व चालू (३० प्र)', 'राज्य, विज्ञान, CSAT (४५ प्र)'],
    focusAreasEn: ['History (10 Qs)', 'Geography (15 Qs)', 'Economy & CA (30 Qs)', 'Polity, Science, CSAT (45)'],
    expectedCutoff: { open: 58.5, obc: 55.0, sc: 49.0, st: 43.5 },
    sections: TALATHI_SECTIONS_STANDARD,
  },
];

/**
 * Dedicated pool of high-yield Talathi & Group C reasoning, math, and governance questions
 */
export const TALATHI_GROUP_C_SPECIAL_QUESTIONS: Question[] = [
  {
    id: 'talathi_csat_01',
    subjectId: 'csat',
    topic: 'संख्या मालिका (Number Series)',
    subtopic: 'संख्यांमधील फरक व वर्ग-घन संबंध',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: 'खालील संख्या मालिकेतील प्रश्नचिन्हाच्या (?) जागी येणारी संख्या ओळखा:\n३, १२, ३९, १२०, ?',
    questionEn: 'Identify the number that replaces the question mark (?) in the following series:\n3, 12, 39, 120, ?',
    optionsMr: ['२४०', '३६३', '३६०', '३५१'],
    optionsEn: ['240', '363', '360', '351'],
    correctAnswerIndex: 1,
    explanationMr: 'स्पष्टीकरण: मालिकेतील संबंध × 3 + 3 असा आहे:\n3 × 3 + 3 = 12\n12 × 3 + 3 = 39\n39 × 3 + 3 = 120\n120 × 3 + 3 = 363.\nम्हणून अचूक उत्तर पर्याय (२) ३६३ आहे.',
    explanationEn: 'Explanation: The pattern is (Number × 3) + 3.\n3 × 3 + 3 = 12\n12 × 3 + 3 = 39\n39 × 3 + 3 = 120\n120 × 3 + 3 = 363. Correct option is (2) 363.',
    reference: 'MPSC Group C / TCS Talathi 2023 अंकगणित',
  },
  {
    id: 'talathi_csat_02',
    subjectId: 'csat',
    topic: 'नातेसंबंध (Blood Relations)',
    subtopic: 'सांकेतिक नातेसंबंध',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: "एका छायाचित्रातील व्यक्तीकडे बोट दाखवून अनिता म्हणाली, 'हा माझ्या वडिलांच्या एकुलत्या एका मुलीच्या मुलाचा भाऊ आहे.' तर त्या छायाचित्रातील व्यक्तीचे अनिताशी काय नाते आहे?",
    questionEn: "Pointing to a person in a photograph, Anita said, 'He is the brother of the son of the only daughter of my father.' What is the relationship of the person to Anita?",
    optionsMr: ['भाचा', 'मुलगा', 'भाऊ', 'पुतण्या'],
    optionsEn: ['Nephew', 'Son', 'Brother', 'Cousin'],
    correctAnswerIndex: 1,
    explanationMr: "स्पष्टीकरण:\n१. 'अनिताच्या वडिलांची एकुलती एक मुलगी' = स्वतः अनिता.\n२. 'मुलीचा मुलगा' = अनिताचा मुलगा.\n३. 'मुलाचा भाऊ' = अनिताचा दुसरा मुलगा.\nत्यामुळे छायाचित्रातील व्यक्ती अनिताचा 'मुलगा' (Son) आहे.",
    explanationEn: "Explanation: 'Only daughter of Anita's father' is Anita herself. Her son's brother is also Anita's son. Therefore, the person is Anita's Son.",
    reference: 'MPSC बुद्धिमत्ता चाचणी',
  },
  {
    id: 'talathi_csat_03',
    subjectId: 'csat',
    topic: 'दिशा व अंतर (Direction Sense)',
    subtopic: 'पायथागोरस प्रमेयाचा वापर',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: 'रोहन सुरुवातीच्या ठिकाणावरून उत्तरेकडे ८ किमी चालला, नंतर उजवीकडे वळून ६ किमी चालला. तर तो सुरुवातीच्या ठिकाणापासून सरळ रेषेत किती अंतरावर व कोणत्या दिशेला आहे?',
    questionEn: 'Rohan walked 8 km North from his starting point, then turned right and walked 6 km. How far and in which direction is he from the starting point?',
    optionsMr: ['१० किमी, ईशान्य', '१४ किमी, उत्तर', '१० किमी, वायव्य', '१२ किमी, पूर्व'],
    optionsEn: ['10 km, North-East', '14 km, North', '10 km, North-West', '12 km, East'],
    correctAnswerIndex: 0,
    explanationMr: 'स्पष्टीकरण: काटकोन त्रिकोणात पायथागोरसच्या प्रमेयानुसार:\nकर्ण² = पाया² + उंची²\nअंतर = √(८² + ६²) = √(६४ + ३६) = √१०० = १० किमी.\nदिशेचा विचार केल्यास उत्तर आणि पूर्व यांच्या दरम्यान म्हणजे ईशान्य दिशा आहे.',
    explanationEn: 'Explanation: By Pythagoras theorem, Distance = √(8² + 6²) = √(64 + 36) = √100 = 10 km North-East.',
    reference: 'MPSC Group C Reasoning',
  },
  {
    id: 'talathi_csat_04',
    subjectId: 'csat',
    topic: 'काम, काळ व वेग (Time & Work)',
    subtopic: 'एकत्रित काम व कार्यक्षमता',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: "एक काम 'अ' एकटा १२ दिवसांत पूर्ण करतो आणि 'ब' तेच काम २४ दिवसांत पूर्ण करतो. जर दोघांनी एकत्र मिळून काम केले तर ते काम किती दिवसांत पूर्ण होईल?",
    questionEn: "Worker A completes a piece of work in 12 days and Worker B completes the same work in 24 days. If they work together, in how many days will the work be completed?",
    optionsMr: ['६ दिवस', '८ दिवस', '१० दिवस', '१६ दिवस'],
    optionsEn: ['6 days', '8 days', '10 days', '16 days'],
    correctAnswerIndex: 1,
    explanationMr: 'स्पष्टीकरण:\nअ चे एका दिवसाचे काम = १/१२\nब चे एका दिवसाचे काम = १/२४\nएकत्रित एका दिवसाचे काम = १/१२ + १/२४ = (२ + १)/२४ = ३/२४ = १/८.\nम्हणून दोघांना मिळून काम पूर्ण करण्यास ८ दिवस लागतील.',
    explanationEn: 'Explanation: Together 1-day work = 1/12 + 1/24 = 3/24 = 1/8. Total days = 8 days.',
    reference: 'MPSC गणित व बुद्धिमत्ता',
  },
  {
    id: 'talathi_csat_05',
    subjectId: 'csat',
    topic: 'नफा व तोटा (Profit & Loss)',
    subtopic: 'शेकडा नफा-तोटा गणना',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: 'एका दुकानदाराने एक टेबल ₹ १,२०० ला खरेदी केला आणि ₹ १,५०० ला विकला. तर त्याला झालेला शेकडा नफा किती?',
    questionEn: 'A shopkeeper purchased a table for ₹ 1,200 and sold it for ₹ 1,500. Find his percentage profit.',
    optionsMr: ['२०%', '२५%', '३०%', '१५%'],
    optionsEn: ['20%', '25%', '30%', '15%'],
    correctAnswerIndex: 1,
    explanationMr: 'स्पष्टीकरण:\nनफा = विक्री किंमत - खरेदी किंमत = १५०० - १२०० = ₹ ३००.\nशेकडा नफा = (नफा / खरेदी किंमत) × १०० = (३०० / १२००) × १०० = २५%.',
    explanationEn: 'Explanation: Profit = 1500 - 1200 = 300. Profit % = (300 / 1200) * 100 = 25%.',
    reference: 'MPSC अंकगणित',
  },
  {
    id: 'talathi_csat_06',
    subjectId: 'csat',
    topic: 'दिनदर्शिका (Calendar)',
    subtopic: 'वार काढणे व लीप वर्ष',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: '१ जानेवारी २०२४ रोजी जर सोमवार असेल, तर ३१ डिसेंबर २०२४ रोजी कोणता वार असेल?',
    questionEn: 'If 1st January 2024 is Monday, what day of the week is 31st December 2024?',
    optionsMr: ['सोमवार', 'मंगळवार', 'बुधवार', 'रविवार'],
    optionsEn: ['Monday', 'Tuesday', 'Wednesday', 'Sunday'],
    correctAnswerIndex: 1,
    explanationMr: 'स्पष्टीकरण: २०२४ हे लीप वर्ष (Leap Year) आहे. लीप वर्षात ३६६ दिवस असतात. लीप वर्षाचा पहिला दिवस आणि शेवटचा दिवस यात १ दिवसाचा फरक असतो (लीप वर्ष ज्या वारी सुरू होते, त्याच्या दुसऱ्या वारी संपते). म्हणून सोमवार + १ = मंगळवार.',
    explanationEn: 'Explanation: 2024 is a leap year (366 days). A leap year ends on the day next to its starting day. Since Jan 1 was Monday, Dec 31 is Tuesday.',
    reference: 'MPSC बुद्धिमत्ता चाचणी',
  },
  {
    id: 'talathi_csat_07',
    subjectId: 'csat',
    topic: 'सांकेतिक भाषा (Coding-Decoding)',
    subtopic: 'अक्षरांचे स्थानांतरण',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: "जर एका सांकेतिक भाषेत 'MPSC' हा शब्द 'O R U E' असा लिहिला जातो, तर त्याच भाषेत 'EXAM' हा शब्द कसा लिहिला जाईल?",
    questionEn: "If in a code language 'MPSC' is coded as 'O R U E', how will 'EXAM' be coded in that language?",
    optionsMr: ['G Z C O', 'G Y B N', 'F W B L', 'H A D P'],
    optionsEn: ['G Z C O', 'G Y B N', 'F W B L', 'H A D P'],
    correctAnswerIndex: 0,
    explanationMr: 'स्पष्टीकरण: प्रत्येक अक्षरात +२ जोडले आहे:\nM (+2) = O\nP (+2) = R\nS (+2) = U\nC (+2) = E\nत्याचप्रमाणे:\nE (+2) = G\nX (+2) = Z\nA (+2) = C\nM (+2) = O\nउत्तर: G Z C O.',
    explanationEn: 'Explanation: Each letter shifted by +2. E->G, X->Z, A->C, M->O. Code is GZCO.',
    reference: 'MPSC बुद्धिमत्ता कोडिंग',
  },
  {
    id: 'talathi_csat_08',
    subjectId: 'csat',
    topic: 'वयवारी (Problems on Ages)',
    subtopic: 'गुणोत्तर व समीकरणांचे निराकरण',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: 'वडील आणि मुलगा यांच्या आजच्या वयाचे गुणोत्तर ७ : २ आहे. ५ वर्षांनंतर त्यांच्या वयाचे गुणोत्तर ८ : ३ होईल. तर मुलाचे आजचे वय किती वर्ष आहे?',
    questionEn: 'The ratio of present ages of father and son is 7 : 2. After 5 years, the ratio becomes 8 : 3. What is the present age of the son?',
    optionsMr: ['१० वर्षे', '१२ वर्षे', '१४ वर्षे', '८ वर्षे'],
    optionsEn: ['10 years', '12 years', '14 years', '8 years'],
    correctAnswerIndex: 0,
    explanationMr: 'स्पष्टीकरण:\nवडिलांचे वय = 7x, मुलाचे वय = 2x.\n(7x + 5) / (2x + 5) = 8 / 3\n3(7x + 5) = 8(2x + 5)\n21x + 15 = 16x + 40\n5x = 25  => x = 5.\nमुलाचे आजचे वय = 2x = 2 × 5 = १० वर्षे.',
    explanationEn: 'Explanation: Let ages be 7x and 2x. (7x+5)/(2x+5) = 8/3 => 21x + 15 = 16x + 40 => 5x = 25 => x = 5. Son age = 2*5 = 10 years.',
    reference: 'MPSC अंकगणित - वयवारी',
  },
  {
    id: 'talathi_csat_09',
    subjectId: 'csat',
    topic: 'घड्याळ (Clocks)',
    subtopic: 'तास काटा व मिनिट काटा यांमधील कोन',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: 'दुपारी ३ वाजून ४० मिनिटांनी घड्याळाच्या तास काटा आणि मिनिट काटा यांच्यामध्ये किती अंशाचा कोन तयार होईल?',
    questionEn: 'What is the angle between the hour hand and the minute hand of a clock at 3:40 PM?',
    optionsMr: ['१३०°', '१४०°', '१२५°', '१३५°'],
    optionsEn: ['130°', '140°', '125°', '135°'],
    correctAnswerIndex: 0,
    explanationMr: 'स्पष्टीकरण: कोन सूत्र: | ३० × तास - (११/२) × मिनिटे |\nकोन = | ३० × ३ - (११/२) × ४० |\n= | ९० - २२० | = | -१३० | = १३०°.',
    explanationEn: 'Explanation: Angle = |30*H - (11/2)*M| = |30*3 - 5.5*40| = |90 - 220| = 130 degrees.',
    reference: 'MPSC बुद्धिमत्ता',
  },
  {
    id: 'talathi_csat_10',
    subjectId: 'csat',
    topic: 'सरासरी (Average)',
    subtopic: 'संख्यांची सरासरी',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: 'पहिल्या २५ नैसर्गिक संख्यांची सरासरी किती असेल?',
    questionEn: 'What is the average of the first 25 natural numbers?',
    optionsMr: ['१२.५', '१३', '१३.५', '१४'],
    optionsEn: ['12.5', '13', '13.5', '14'],
    correctAnswerIndex: 1,
    explanationMr: 'स्पष्टीकरण: पहिल्या n नैसर्गिक संख्यांची सरासरी = (n + १) / २\n= (२५ + १) / २ = २६ / २ = १३.',
    explanationEn: 'Explanation: Average of first n natural numbers = (n + 1)/2 = (25 + 1)/2 = 13.',
    reference: 'MPSC अंकगणित',
  },
  {
    id: 'talathi_gov_01',
    subjectId: 'polity',
    topic: 'महसूल प्रशासन व तलाठी रचना',
    subtopic: 'महाराष्ट्र जमीन महसूल संहिता १९६६ (MLRC 1966)',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: 'महाराष्ट्र जमीन महसूल संहिता, १९६६ अन्वये गावातील जमिनीच्या नोंदी, अधिकार अभिलेख (Record of Rights) आणि ७/१२ उतारा अद्ययावत ठेवण्याची प्राथमिक जबाबदारी खालीलपैकी कोणावर असते?',
    questionEn: 'Under the Maharashtra Land Revenue Code, 1966, on whom lies the primary duty of maintaining village land records, Record of Rights, and 7/12 extract?',
    optionsMr: ['ग्रामसेवक', 'तलाठी (Talathi)', 'मंडळ अधिकारी (Circle Officer)', 'तहसीलदार'],
    optionsEn: ['Gram Sevak', 'Talathi', 'Circle Officer', 'Tahsildar'],
    correctAnswerIndex: 1,
    explanationMr: 'स्पष्टीकरण:\n• तलाठी (Talathi) हा गावाच्या महसूल दप्तराचा प्रत्यक्ष प्रमुख असतो (महाराष्ट्र जमीन महसूल संहिता १९६६, कलम ७).\n• तलाठी गाव नमुना १ ते २१ आणि अधिकार अभिलेख (७/१२ उतारा, फेरफार नोंदवही) सांभाळतो व अद्ययावत ठेवतो.',
    explanationEn: 'Explanation: Under Section 7 of MLRC 1966, the Talathi is entrusted with maintaining village land records, village forms 1 to 21, and 7/12 extract.',
    reference: 'महाराष्ट्र जमीन महसूल संहिता १९६६ / तलाठी मार्गदर्शिका',
  },
  {
    id: 'talathi_gov_02',
    subjectId: 'polity',
    topic: 'पंचायतराज व स्थानिक प्रशासन',
    subtopic: 'ग्रामपंचायत व ग्रामसभा अधिकार',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: 'मुंबई ग्रामपंचायत अधिनियम, १९५८ (महाराष्ट्र ग्रामपंचायत अधिनियम) नुसार एका आर्थिक वर्षात ग्रामसभेच्या किमान किती बैठका घेणे बंधनकारक आहे?',
    questionEn: 'According to the Maharashtra Village Panchayats Act, 1958, what is the minimum number of Gram Sabha meetings mandatory to be convened in a financial year?',
    optionsMr: ['२ बैठका', '४ बैठका', '६ बैठका', '१२ बैठका'],
    optionsEn: ['2 meetings', '4 meetings', '6 meetings', '12 meetings'],
    correctAnswerIndex: 1,
    explanationMr: 'स्पष्टीकरण:\nमहाराष्ट्र ग्रामपंचायत अधिनियमातील कलम ७ अन्वये एका वित्तीय वर्षात ग्रामसभेच्या किमान ४ बैठका घेणे बंधनकारक आहे (२६ जानेवारी, १ मे, १५ ऑगस्ट आणि २ ऑक्टोबर रोजी सामान्यतः आयोजित केल्या जातात).',
    explanationEn: 'Explanation: Under Section 7 of the Act, a minimum of 4 Gram Sabha meetings must be convened in each financial year.',
    reference: 'महाराष्ट्र ग्रामपंचायत अधिनियम १९५८ / एम. लक्ष्मीकांत',
  },
  {
    id: 'talathi_gov_03',
    subjectId: 'polity',
    topic: 'माहितीचा अधिकार (RTI 2005)',
    subtopic: 'माहिती देण्याची मुदत व दंड',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: "माहितीचा अधिकार अधिनियम, २००५ नुसार मागितलेली माहिती जर 'व्यक्तीच्या जीवित किंवा स्वातंत्र्याशी' संबंधित असेल, तर ती अर्ज मिळाल्यापासून किती तासांत देणे अनिवार्य आहे?",
    questionEn: 'Under the Right to Information Act, 2005, if the information sought concerns the life or liberty of a person, within how many hours must it be provided?',
    optionsMr: ['२४ तास', '४८ तास', '७२ तास', '७ दिवस'],
    optionsEn: ['24 hours', '48 hours', '72 hours', '7 days'],
    correctAnswerIndex: 1,
    explanationMr: 'स्पष्टीकरण:\nRTI कायदा २००५, कलम ७(१) नुसार सामान्य माहिती ३० दिवसांत द्यावी लागते, परंतु जर माहिती व्यक्तीच्या जीवित किंवा स्वातंत्र्याशी संबंधित असेल तर ती केवळ ४८ तासांच्या आत देणे कायदेशीररीत्या अनिवार्य आहे.',
    explanationEn: 'Explanation: Under Section 7(1) of RTI Act 2005, information concerning the life or liberty of a person must be provided within 48 hours.',
    reference: 'RTI Act 2005 Section 7(1)',
  },
  {
    id: 'talathi_marathi_01',
    subjectId: 'marathi_grammar',
    topic: 'प्रयोग विचार',
    subtopic: 'कर्मणी प्रयोगाचे उपप्रकार',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: "'आईने बाळाला निजविले.' या वाक्यातील प्रयोग कोणता आहे ओळखा?\n(१) कर्तरी प्रयोग\n(२) कर्मणी प्रयोग\n(३) भावे प्रयोग (सकर्मक भावे)\n(४) संकर प्रयोग",
    questionEn: "Identify the 'Prayog' in the Marathi sentence: 'आईने बाळाला निजविले.'\n(1) Kartari Prayog\n(2) Karmani Prayog\n(3) Sakarmak Bhave Prayog\n(4) Sankar Prayog",
    optionsMr: ['कर्तरी प्रयोग', 'कर्मणी प्रयोग', 'सकर्मक भावे प्रयोग', 'संकर प्रयोग'],
    optionsEn: ['Kartari Prayog', 'Karmani Prayog', 'Sakarmak Bhave Prayog', 'Sankar Prayog'],
    correctAnswerIndex: 2,
    explanationMr: 'स्पष्टीकरण:\nयेथे कर्त्याला (आईने - तृतीया विभक्ती) प्रत्यय आहे आणि कर्माला (बाळाला - द्वितीया विभक्ती) प्रत्यय आहे. जेव्हा कर्ता व कर्म दोघांनाही विभक्ती प्रत्यय असतो आणि क्रियापद अकारान्त असते, तेव्हा तो ‘सकर्मक भावे प्रयोग’ असतो.',
    explanationEn: 'Explanation: When both Subject and Object have inflectional case markers and verb is neutral singular, it is Sakarmak Bhave Prayog.',
    reference: 'मो. रा. वाळंबे - सुगम मराठी व्याकरण',
  },
  {
    id: 'talathi_marathi_02',
    subjectId: 'marathi_grammar',
    topic: 'समास',
    subtopic: 'द्वंद्व समास व प्रकार',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: "'भाजीपाला' हा सामासिक शब्द खालीलपैकी कोणत्या समासाचे उदाहरण आहे?\n(१) इतरेतर द्वंद्व समास\n(२) वैकल्पिक द्वंद्व समास\n(३) समाहार द्वंद्व समास\n(४) तत्पुरुष समास",
    questionEn: "The compound word 'भाजीपाला' is an example of which Samas?\n(1) Itaretar Dvandva\n(2) Vaikalpik Dvandva\n(3) Samahar Dvandva\n(4) Tatpurush",
    optionsMr: ['इतरेतर द्वंद्व समास', 'वैकल्पिक द्वंद्व समास', 'समाहार द्वंद्व समास', 'तत्पुरुष समास'],
    optionsEn: ['Itaretar Dvandva', 'Vaikalpik Dvandva', 'Samahar Dvandva', 'Tatpurush'],
    correctAnswerIndex: 2,
    explanationMr: 'स्पष्टीकरण:\nभाजीपाला = भाजी, पाला व तत्सम इतर वस्तू. ज्या सामासिक शब्दात त्या पदांशिवाय त्याच जातीच्या इतर वस्तूंचाही समावेश (समाहार) होतो, त्याला ‘समाहार द्वंद्व समास’ म्हणतात.',
    explanationEn: 'Explanation: Samahar Dvandva includes words where the compound implies other similar items of the same category.',
    reference: 'मराठी व्याकरण - समास',
  },
  {
    id: 'talathi_marathi_03',
    subjectId: 'marathi_grammar',
    topic: 'शब्दसिद्धी',
    subtopic: 'तत्सम व तद्भव शब्द',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: "खालीलपैकी कोणता शब्द संस्कृतमधून मराठीत येताना कोणताही बदल न होता जसाच्या तसा आलेला 'तत्सम शब्द' आहे?\n(१) घर\n(२) कन्या\n(३) हात\n(४) काम",
    questionEn: "Which of the following is a 'Tatsama' word borrowed directly into Marathi from Sanskrit without modification?\n(1) Ghar\n(2) Kanya\n(3) Haat\n(4) Kaam",
    optionsMr: ['घर', 'कन्या', 'हात', 'काम'],
    optionsEn: ['Ghar', 'Kanya', 'Haat', 'Kaam'],
    correctAnswerIndex: 1,
    explanationMr: 'स्पष्टीकरण:\n• कन्या हा मूळ संस्कृत शब्द जसाच्या तसा मराठीत वापरला जातो, म्हणून तो ‘तत्सम’ शब्द आहे.\n• घर (गृह वरून), हात (हस्त वरून), काम (कर्म वरून) हे बदलून आलेले ‘तद्भव’ शब्द आहेत.',
    explanationEn: 'Explanation: Kanya is borrowed intact from Sanskrit without phonetic distortion (Tatsama).',
    reference: 'मो. रा. वाळंबे - मराठी व्याकरण',
  },
  {
    id: 'talathi_geo_soil_01',
    subjectId: 'maharashtra_geography',
    topic: 'महाराष्ट्रातील जमिनीचे प्रकार',
    subtopic: 'काळी रेगूर जमीन व कापूस पीक',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: "महाराष्ट्रातील दख्खनच्या पठारावर बेसाल्ट खडकाच्या विदारणाने तयार झालेली आणि ओलावा टिकवून ठेवण्याची उच्च क्षमता असणारी जमीन खालीलपैकी कोणती आहे?\n(१) जांभी जमीन (Laterite Soil)\n(२) काळी रेगूर जमीन (Black Regur Soil)\n(३) तांबडी व पिवळसर जमीन\n(४) गाळाची जमीन",
    questionEn: "Which soil type on the Deccan plateau of Maharashtra is formed from weathering of basalt rock and has high moisture retention capacity, ideal for cotton cultivation?\n(1) Laterite Soil\n(2) Black Regur Soil\n(3) Red and Yellow Soil\n(4) Alluvial Soil",
    optionsMr: ['जांभी जमीन', 'काळी रेगूर जमीन (Black Regur Soil)', 'तांबडी व पिवळसर जमीन', 'गाळाची जमीन'],
    optionsEn: ['Laterite Soil', 'Black Regur Soil', 'Red & Yellow Soil', 'Alluvial Soil'],
    correctAnswerIndex: 1,
    explanationMr: 'स्पष्टीकरण:\n• काळी रेगूर जमीन ही बेसाल्ट खडकाच्या अपक्षयाने बनलेली असून यात टिटॅनिफेरस मॅग्नेटाईटमुळे काळा रंग प्राप्त होतो.\n• या जमिनीत ओलावा टिकवून ठेवण्याची क्षमता प्रचंड असते आणि ती कापसाच्या पिकासाठी अत्यंत उपयुक्त असल्याने तिला ‘Black Cotton Soil’ असेही म्हणतात.',
    explanationEn: 'Explanation: Black Regur Soil is formed by weathering of Deccan basalt and has high clay content and moisture retention, making it ideal for cotton and sugarcane.',
    reference: 'महाराष्ट्र भूगोल - जमिनीचे प्रकार (MPSC Prelims Syllabus Item 2)',
  },
  {
    id: 'talathi_geo_rain_02',
    subjectId: 'maharashtra_geography',
    topic: 'हवामान व पर्जन्यमान',
    subtopic: 'आंबोली व नैऋत्य मान्सून पाऊस',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: 'महाराष्ट्रामध्ये नैऋत्य मोसमी वाऱ्यांपासून सर्वाधिक पाऊस (सुमारे ७५० सेमी) खालीलपैकी कोणत्या ठिकाणी नोंदवला जातो?\n(१) महाबळेश्वर (सातारा)\n(२) माथेरान (रायगड)\n(३) आंबोली (सिंधुदुर्ग)\n(४) चिखलदरा (अमरावती)',
    questionEn: 'In Maharashtra, which place records the highest rainfall (approx 750 cm) from the Southwest Monsoon winds?\n(1) Mahabaleshwar (Satara)\n(2) Matheran (Raigad)\n(3) Amboli (Sindhudurg)\n(4) Chikhaldara (Amravati)',
    optionsMr: ['महाबळेश्वर', 'माथेरान', 'आंबोली (सिंधुदुर्ग)', 'चिखलदरा'],
    optionsEn: ['Mahabaleshwar', 'Matheran', 'Amboli (Sindhudurg)', 'Chikhaldara'],
    correctAnswerIndex: 2,
    explanationMr: 'स्पष्टीकरण:\n• महाराष्ट्रात सिंधुदुर्ग जिल्ह्यातील ‘आंबोली’ हे सर्वाधिक पर्जन्यमानाचे ठिकाण असून त्याला महाराष्ट्राचे चेरापुंजी म्हणतात.\n• येथे वार्षिक सरासरी सुमारे ७५० सेंमी पर्जन्य नोंदवले जाते.',
    explanationEn: 'Explanation: Amboli in Sindhudurg district records the highest rainfall in Maharashtra (approx 750 cm) and is called the Cherrapunji of Maharashtra.',
    reference: 'सौदी - महाराष्ट्राचा भूगोल',
  },
  {
    id: 'talathi_eco_gdp_01',
    subjectId: 'economy',
    topic: 'राष्ट्रीय उत्पन्न व संकल्पना',
    subtopic: 'GDP, GNP आणि NNP',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: "एका आर्थिक वर्षात देशाच्या भौगोलिक सीमारेषेत उत्पादित झालेल्या सर्व अंतिम वस्तू आणि सेवांच्या एकूण बाजारमूल्याला काय म्हणतात?\n(१) निव्वळ राष्ट्रीय उत्पन्न (NNP)\n(२) स्थूल देशांतर्गत उत्पादन (GDP)\n(३) दरडोई उत्पन्न (Per Capita Income)\n(४) स्थूल राष्ट्रीय उत्पादन (GNP)",
    questionEn: "What is the total market value of all final goods and services produced within the geographic boundaries of a country during a financial year called?\n(1) Net National Product (NNP)\n(2) Gross Domestic Product (GDP)\n(3) Per Capita Income\n(4) Gross National Product (GNP)",
    optionsMr: ['निव्वळ राष्ट्रीय उत्पादन (NNP)', 'स्थूल देशांतर्गत उत्पादन (GDP)', 'दरडोई उत्पन्न', 'स्थूल राष्ट्रीय उत्पादन (GNP)'],
    optionsEn: ['Net National Product (NNP)', 'Gross Domestic Product (GDP)', 'Per Capita Income', 'Gross National Product (GNP)'],
    correctAnswerIndex: 1,
    explanationMr: 'स्पष्टीकरण:\n• एका वर्षात देशाच्या देशांतर्गत सीमारेषेत उत्पादित अंतिम वस्तू व सेवांचे बाजारमूल्य म्हणजे ‘स्थूल देशांतर्गत उत्पादन’ (Gross Domestic Product - GDP).\n• यात देशातील परकीय नागरिकांचे उत्पन्न समाविष्ट असते, परंतु परदेशातील भारतीयांचे उत्पन्न समाविष्ट नसते.',
    explanationEn: 'Explanation: Gross Domestic Product (GDP) measures the total monetary value of all finished goods and services made within a country during a specific period.',
    reference: 'दत्त व सुंदरम / रंजन कोळंबे - भारतीय अर्थव्यवस्था',
  },
  {
    id: 'talathi_sci_hygiene_01',
    subjectId: 'general_science',
    topic: 'आरोग्यशास्त्र व जीवनसत्त्वे',
    subtopic: 'अ जीवनसत्त्व आणि रातांधळेपणा',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: "खालीलपैकी कोणत्या जीवनसत्त्वाच्या अभावामुळे 'रातांधळेपणा' (Night Blindness) व झेरोप्थाल्मिया (Xerophthalmia) हा नेत्रविकार होतो?\n(१) जीवनसत्त्व अ (Vitamin A - Retinol)\n(२) जीवनसत्त्व ब (Vitamin B)\n(३) जीवनसत्त्व क (Vitamin C - Ascorbic Acid)\n(४) जीवनसत्त्व ड (Vitamin D - Calciferol)",
    questionEn: "Deficiency of which vitamin causes Night Blindness and Xerophthalmia?\n(1) Vitamin A (Retinol)\n(2) Vitamin B\n(3) Vitamin C (Ascorbic Acid)\n(4) Vitamin D (Calciferol)",
    optionsMr: ['जीवनसत्त्व अ (Vitamin A)', 'जीवनसत्त्व ब (Vitamin B)', 'जीवनसत्त्व क (Vitamin C)', 'जीवनसत्त्व ड (Vitamin D)'],
    optionsEn: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'],
    correctAnswerIndex: 0,
    explanationMr: 'स्पष्टीकरण:\n• जीवनसत्त्व ‘अ’ (रेटिनॉल) च्या कमतरतेमुळे डोळ्यांतील रोडॉप्सीन रंगद्रव्य निर्मितीत अडथळा येतो व रातांधळेपणा आणि झेरोप्थाल्मिया (डोळ्यातील अश्रू ग्रंथी सुकणे) उद्भवतो.\n• गाजर, पपई, आंबा, अंडी, यकृत व पालेभाज्या हे व्हिटॅमिन ‘अ’ चे उत्तम स्रोत आहेत.',
    explanationEn: 'Explanation: Vitamin A (Retinol) deficiency leads to night blindness and xerophthalmia. Rhodopsin synthesis in retinal rods requires retinal.',
    reference: 'सामान्य विज्ञान - आरोग्यशास्त्र (MPSC Prelims Syllabus Item 6)',
  },
  {
    id: 'talathi_arith_fraction_01',
    subjectId: 'csat',
    topic: 'दशांश व अपूर्णांक (Fractions & Decimals)',
    subtopic: 'दशांश अपूर्णांकांची बेरीज-वजाबाकी',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: 'खालील पदावलीची किंमत किती येईल?\n०.५ × ०.०५ × ०.००५ = ?',
    questionEn: 'Evaluate the expression: 0.5 × 0.05 × 0.005 = ?',
    optionsMr: ['०.००१२५', '०.०००१२५', '०.०१२५', '०.००००१२५'],
    optionsEn: ['0.00125', '0.000125', '0.0125', '0.0000125'],
    correctAnswerIndex: 1,
    explanationMr: 'स्पष्टीकरण:\nसंख्यांचा गुणाकार: ५ × ५ × ५ = १२५.\nदशांश स्थळांची बेरीज: १ + २ + ३ = ६ दशांश स्थळे.\nम्हणून उत्तर = ०.०००१२५.\nअचूक पर्याय (२).',
    explanationEn: 'Explanation: 5 * 5 * 5 = 125. Decimal places count: 1 + 2 + 3 = 6 digits after point. Result = 0.000125.',
    reference: 'MPSC अंकगणित - दशांश अपूर्णांक (Syllabus Item 7)',
  },
  {
    id: 'talathi_arith_percent_02',
    subjectId: 'csat',
    topic: 'टक्केवारी (Percentages)',
    subtopic: 'किंमत वाढ व घट संबंध',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: "साखरेचा दर २०% ने वाढला, तर घरगुती खर्चात कोणतीही वाढ होऊ नये म्हणून साखरेचा वापर किती टक्क्यांनी कमी करावा लागेल?\n(१) १६.६६% (१६ २/३%)\n(२) २०%\n(३) २५%\n(४) १८.५%",
    questionEn: "If the price of sugar increases by 20%, by what percentage must a household reduce consumption so that total expenditure remains unchanged?\n(1) 16.66% (16 2/3%)\n(2) 20%\n(3) 25%\n(4) 18.5%",
    optionsMr: ['१६.६६% (१६ २/३%)', '२०%', '२५%', '१८.५%'],
    optionsEn: ['16.66%', '20%', '25%', '18.5%'],
    correctAnswerIndex: 0,
    explanationMr: 'स्पष्टीकरण:\nवापर कपात टक्केवारी = [ r / (१०० + r) ] × १००\n= [ २० / (१०० + २०) ] × १००\n= (२० / १२०) × १०० = (१/६) × १०० = १६.६६% किंवा १६ पूर्णांक २/३%.',
    explanationEn: 'Explanation: Consumption reduction % = [r / (100 + r)] * 100 = [20 / 120] * 100 = 16.66%.',
    reference: 'MPSC अंकगणित - टक्केवारी',
  },
  {
    id: 'talathi_hist_soc_01',
    subjectId: 'maharashtra_history',
    topic: 'महाराष्ट्रातील समाजसुधारक',
    subtopic: 'सत्यशोधक समाज व महात्मा फुले',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: "महात्मा जोतीराव फुले यांनी २४ सप्टेंबर १८७३ रोजी पुणे येथे खालीलपैकी कोणत्या संस्थेची स्थापना केली, ज्याचे ब्रीदवाक्य 'सर्वसाक्षी जगत्पती । त्याला नकोच मध्यस्थी ॥' हे होते?\n(१) प्रार्थना समाज\n(२) सत्यशोधक समाज\n(३) मानवधर्म सभा\n(४) आर्य समाज",
    questionEn: "On 24th September 1873 at Pune, Mahatma Jyotirao Phule founded which society with the motto 'The Creator of all has no need for an intermediary'?\n(1) Prarthana Samaj\n(2) Satyashodhak Samaj\n(3) Manav Dharma Sabha\n(4) Arya Samaj",
    optionsMr: ['प्रार्थना समाज', 'सत्यशोधक समाज', 'मानवधर्म सभा', 'आर्य समाज'],
    optionsEn: ['Prarthana Samaj', 'Satyashodhak Samaj', 'Manav Dharma Sabha', 'Arya Samaj'],
    correctAnswerIndex: 1,
    explanationMr: 'स्पष्टीकरण:\n• २४ सप्टेंबर १८७३ रोजी महात्मा फुले यांनी पुण्यात ‘सत्यशोधक समाज’ स्थापन केला.\n• शूद्र व अतिशूद्र समाजाला धार्मिक, सामाजिक व शैक्षणिक शोषणातून मुक्त करणे हा त्याचा हेतू होता.\n• याचे मुखपत्र ‘दीनबंधू’ होते, ज्याचे संपादन कृष्णराव भालेकर यांनी केले.',
    explanationEn: 'Explanation: Satyashodhak Samaj was founded on 24 Sept 1873 by Mahatma Jyotirao Phule in Pune to emancipate lower castes from social and religious oppression.',
    reference: 'महाराष्ट्राचा इतिहास - समाजसुधारक (MPSC Prelims Syllabus Item 1)',
  },
];

/**
 * Deterministically constructs exactly 100 questions for a given Group C Prelims mock set (1 to 10)
 * Strictly following the Official 8-Subject General Ability Test (सामान्य क्षमता चाचणी) Syllabus:
 * 1. History: 10 Qs
 * 2. Geography: 15 Qs
 * 3. Economy: 15 Qs
 * 4. Current Affairs: 15 Qs
 * 5. Polity: 15 Qs
 * 6. General Science: 15 Qs
 * 7. Arithmetic: 8 Qs
 * 8. Reasoning & Mental Ability: 7 Qs
 * Total = Exactly 100 Questions!
 */
export function getGroupCTalathiSetQuestions(
  setNumber: number,
  basePool: Question[] = MPSC_QUESTIONS
): Question[] {
  const safeSetIndex = Math.max(0, Math.min(9, setNumber - 1));

  // Merge special questions uniquely into pool
  const poolMap = new Map<string, Question>();
  basePool.forEach((q) => poolMap.set(q.id, q));
  TALATHI_GROUP_C_SPECIAL_QUESTIONS.forEach((q) => poolMap.set(q.id, q));
  const fullPool = Array.from(poolMap.values());

  // Filter 8 official subject pools
  const historyPool = fullPool.filter((q) => q.subjectId === 'maharashtra_history');
  const geographyPool = fullPool.filter((q) => q.subjectId === 'maharashtra_geography');
  const economyPool = fullPool.filter((q) => q.subjectId === 'economy');
  const currentAffairsPool = fullPool.filter((q) => q.subjectId === 'current_affairs');
  const polityPool = fullPool.filter((q) => q.subjectId === 'polity');
  const sciencePool = fullPool.filter(
    (q) => q.subjectId === 'general_science' || q.subjectId === 'environment'
  );
  const csatPool = fullPool.filter((q) => q.subjectId === 'csat');

  // 1. Select 10 History questions (Q 1 to 10)
  const selectedHistory: Question[] = [];
  const histOffset = (safeSetIndex * 15) % historyPool.length;
  for (let i = 0; i < 10; i++) {
    selectedHistory.push(historyPool[(histOffset + i) % historyPool.length]);
  }

  // 2. Select 15 Geography questions (Q 11 to 25)
  const selectedGeography: Question[] = [];
  const geoOffset = (safeSetIndex * 14) % geographyPool.length;
  for (let i = 0; i < 15; i++) {
    selectedGeography.push(geographyPool[(geoOffset + i) % geographyPool.length]);
  }

  // 3. Select 15 Economy questions (Q 26 to 40)
  const selectedEconomy: Question[] = [];
  const ecoOffset = (safeSetIndex * 11) % economyPool.length;
  for (let i = 0; i < 15; i++) {
    selectedEconomy.push(economyPool[(ecoOffset + i) % economyPool.length]);
  }

  // 4. Select 15 Current Affairs questions (Q 41 to 55)
  const selectedCA: Question[] = [];
  const caOffset = (safeSetIndex * 18) % currentAffairsPool.length;
  for (let i = 0; i < 15; i++) {
    selectedCA.push(currentAffairsPool[(caOffset + i) % currentAffairsPool.length]);
  }

  // 5. Select 15 Polity questions (Q 56 to 70)
  const selectedPolity: Question[] = [];
  const polOffset = (safeSetIndex * 17) % polityPool.length;
  for (let i = 0; i < 15; i++) {
    selectedPolity.push(polityPool[(polOffset + i) % polityPool.length]);
  }

  // 6. Select 15 General Science questions (Q 71 to 85)
  const selectedScience: Question[] = [];
  const sciOffset = (safeSetIndex * 21) % sciencePool.length;
  for (let i = 0; i < 15; i++) {
    selectedScience.push(sciencePool[(sciOffset + i) % sciencePool.length]);
  }

  // 7. Select 8 Reasoning questions (Q 86 to 93)
  const selectedReasoning: Question[] = [];
  const reasOffset = (safeSetIndex * 9) % csatPool.length;
  for (let i = 0; i < 8; i++) {
    selectedReasoning.push(csatPool[(reasOffset + i) % csatPool.length]);
  }

  // 8. Select 7 Arithmetic questions (Q 94 to 100)
  const selectedArithmetic: Question[] = [];
  const arithOffset = (safeSetIndex * 9 + 8) % csatPool.length;
  for (let i = 0; i < 7; i++) {
    selectedArithmetic.push(csatPool[(arithOffset + i) % csatPool.length]);
  }

  // Combine into exact 100 questions sequentially aligned with Official 8-Subject Prelims syllabus:
  // 1. Current Affairs (1-15)
  // 2. Civics & Polity (16-30)
  // 3. History (31-40)
  // 4. Geography (41-55)
  // 5. Economy (56-70)
  // 6. General Science (71-85)
  // 7. Reasoning (86-93)
  // 8. Arithmetic (94-100)
  const fullSet100 = [
    ...selectedCA,
    ...selectedPolity,
    ...selectedHistory,
    ...selectedGeography,
    ...selectedEconomy,
    ...selectedScience,
    ...selectedReasoning,
    ...selectedArithmetic,
  ];

  return fullSet100;
}
