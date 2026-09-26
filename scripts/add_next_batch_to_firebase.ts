import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, terminate } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const firebaseConfig = JSON.parse(readFileSync(join(__dirname, '../firebase-applet-config.json'), 'utf-8'));

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export interface MCQItem {
  id: string;
  subjectId: string;
  topic: string;
  subtopic: string;
  exam: 'Rajyaseva' | 'Combine' | 'Both';
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  questionMr: string;
  questionEn: string;
  optionsMr: string[];
  optionsEn: string[];
  correctAnswerIndex: number;
  explanationMr: string;
  explanationEn: string;
  reference: string;
  yearTag: string;
}

export const NEXT_BATCH_MPSC_MCQS: MCQItem[] = [
  {
    id: 'mpsc_polity_fb_009',
    subjectId: 'polity',
    topic: 'स्थानिक स्वराज्य संस्था व पंचायती राज',
    subtopic: '७३ वी घटनादुरुस्ती कायदा १९९२',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: '७३ व्या घटनादुरुस्ती कायद्यान्वये संविधानात समाविष्ट केलेल्या ११ व्या अनुसूचीबाबत खालील विधाने विचारात घ्या:\n(अ) या अनुसूचीत पंचायतींच्या अखत्यारीतील एकूण २९ विषयांची यादी देण्यात आली आहे.\n(ब) संविधानातील कलम २४३-जी (243G) अन्वये पंचायतींना हे अधिकार प्रदान करण्यात आले आहेत.\n(क) राज्य वित्त आयोगाची स्थापना कलम २४३-आय (243I) नुसार दर ५ वर्षांनी केली जाते.\nवरीलपैकी कोणती विधाने सत्य आहेत?',
    questionEn: 'Consider the following statements regarding 11th Schedule added by 73rd Constitutional Amendment Act 1992:\n(a) It contains a list of 29 functional subjects under Panchayats.\n(b) Powers are conferred to Panchayats under Article 243G.\n(c) State Finance Commission is constituted every 5 years under Article 243I.\nWhich of the above statements are correct?',
    optionsMr: [
      'फक्त (अ) आणि (ब)',
      'फक्त (ब) आणि (क)',
      'फक्त (अ) आणि (क)',
      'सर्व विधाने सत्य (अ, ब आणि क)'
    ],
    optionsEn: [
      'Only (a) and (b)',
      'Only (b) and (c)',
      'Only (a) and (c)',
      'All statements (a, b and c) are correct'
    ],
    correctAnswerIndex: 3,
    explanationMr: '७३ व्या घटनादुरुस्तीने संविधानात भाग ९ व ११ वी अनुसूची जोडली. यात २९ विषय असून कलम २४३G अंतर्गत अधिकार आणि २४३I अंतर्गत राज्यपालांकडून राज्य वित्त आयोगाची स्थापना होते.',
    explanationEn: 'The 73rd Amendment added Part IX and the 11th Schedule with 29 functional items under Article 243G, while Article 243I provides for the State Finance Commission.',
    reference: 'एम. लक्ष्मीकांत - भारतीय राज्यव्यवस्था (पंचायती राज)',
    yearTag: '2026'
  },
  {
    id: 'mpsc_polity_fb_010',
    subjectId: 'polity',
    topic: 'मूलभूत हक्क व न्यायालयीन आदेश',
    subtopic: 'प्राधिकृत आदेश (Writs) - कलम ३२ व २२६',
    exam: 'Rajyaseva',
    difficulty: 'Hard',
    questionMr: 'खालीलपैकी कोणता प्राधिकार आदेश (Writ) केवळ सार्वजनिक प्राधिकरणाविरुद्धच नव्हे तर खाजगी व्यक्तीविरुद्धही काढला जाऊ शकतो?',
    questionEn: 'Which of the following Writs can be issued against private individuals as well as public authorities?',
    optionsMr: [
      'परमादेश (Mandamus)',
      'बंदी प्रत्यक्षीकरण (Habeas Corpus)',
      'प्रतिषेध (Prohibition)',
      'अधिकार पृच्छा (Quo-Warranto)'
    ],
    optionsEn: [
      'Mandamus',
      'Habeas Corpus',
      'Prohibition',
      'Quo-Warranto'
    ],
    correctAnswerIndex: 1,
    explanationMr: 'बंदी प्रत्यक्षीकरण (Habeas Corpus - "देह हजर करा") हा असा एकमेव प्राधिकार आदेश आहे जो सार्वजनिक अधिकारी तसेच खाजगी व्यक्ती या दोघांविरुद्ध बेकायदेशीर अटकेच्या प्रकरणात काढता येतो.',
    explanationEn: 'Habeas Corpus is the only writ that can be issued against both public authorities and private individuals against unlawful detention.',
    reference: 'एम. लक्ष्मीकांत - भारतीय राज्यव्यवस्था (कलम ३२)',
    yearTag: '2026'
  },
  {
    id: 'mpsc_polity_fb_011',
    subjectId: 'polity',
    topic: 'संवैधानिक पदे व संस्था',
    subtopic: 'भारताचे नियंत्रक व महालेखापरीक्षक (CAG)',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: 'भारताचे नियंत्रक व महालेखापरीक्षक (CAG) यांच्या संदर्भात खालीलपैकी कोणते विधान चुकीचे आहे?',
    questionEn: 'Which of the following statements regarding the Comptroller and Auditor General of India (CAG) is INCORRECT?',
    optionsMr: [
      'त्यांची नियुक्ती राष्ट्रपतींद्वारे स्वाक्षरी व शिक्क्यानिशी केली जाते (कलम १४८).',
      'त्यांचे पदग्रहण केल्यापासून ६ वर्षे किंवा वयाची ६५ वर्षे यापैकी जे आधी पूर्ण होईल तो त्यांचा कार्यकाळ असतो.',
      'पद निवृत्तीनंतर ते भारत सरकार किंवा कोणत्याही राज्य सरकारच्या नियंत्रणाखालील पद स्वीकारण्यास पात्र असतात.',
      'त्यांचे वेतन व भत्ते भारताच्या संचित निधीवर (Consolidated Fund of India) भारित असतात.'
    ],
    optionsEn: [
      'Appointed by the President by warrant under hand and seal (Article 148).',
      'Term of office is 6 years or up to 65 years of age, whichever is earlier.',
      'Eligible for further employment under Central or State Government after retirement.',
      'Salary and allowances are charged upon the Consolidated Fund of India.'
    ],
    correctAnswerIndex: 2,
    explanationMr: 'कलम १४८(४) अन्वये कॅग (CAG) पद निवृत्तीनंतर भारत सरकार किंवा कोणत्याही राज्य सरकारच्या अखत्यारीतील कोणत्याही पुढील पदावर काम करण्यास अपात्र (Not eligible) असतात.',
    explanationEn: 'Under Article 148(4), the CAG is not eligible for further office under Central or State Government after ceasing to hold office.',
    reference: 'संविधान कलम १४८ ते १५१',
    yearTag: '2026'
  },
  {
    id: 'mpsc_hist_fb_012',
    subjectId: 'maharashtra_history',
    topic: 'महाराष्ट्रातील समाजसुधारक',
    subtopic: 'डॉ. बाबासाहेब आंबेडकर व त्यांची वृत्तपत्रे',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: 'डॉ. बाबासाहेब आंबेडकर यांनी सुरू केलेल्या वृत्तपत्रांचा त्यांच्या स्थापनेनुसार अचूक कालानुक्रम कोणता?\n(१) मूकनायक\n(२) बहिष्कृत भारत\n(३) जनता\n(४) प्रबुद्ध भारत',
    questionEn: 'What is the correct chronological order of the periodicals founded by Dr. B.R. Ambedkar?\n(1) Mooknayak\n(2) Bahishkrit Bharat\n(3) Janata\n(4) Prabuddha Bharat',
    optionsMr: [
      '१ - २ - ३ - ४',
      '२ - १ - ३ - ४',
      '१ - ३ - २ - ४',
      '२ - ३ - १ - ४'
    ],
    optionsEn: [
      '1 - 2 - 3 - 4',
      '2 - 1 - 3 - 4',
      '1 - 3 - 2 - 4',
      '2 - 3 - 1 - 4'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'मूकनायक (३१ जानेवारी १९२०), बहिष्कृत भारत (३ एप्रिल १९२७), जनता (२४ नोव्हेंबर १९३०), आणि प्रबुद्ध भारत (४ फेब्रुवारी १९५६).',
    explanationEn: 'Mooknayak (1920), Bahishkrit Bharat (1927), Janata (1930), and Prabuddha Bharat (1956).',
    reference: 'डॉ. धनंजय कीर - डॉ. बाबासाहेब आंबेडकर जीवनचरित्र',
    yearTag: '2026'
  },
  {
    id: 'mpsc_hist_fb_013',
    subjectId: 'maharashtra_history',
    topic: '१८५७ चा उठाव व महाराष्ट्र',
    subtopic: 'उठावाचे नेते व केंद्र',
    exam: 'Rajyaseva',
    difficulty: 'Hard',
    questionMr: '१८५७ च्या उठावादरम्यान साताऱ्याचे छत्रपती प्रतापसिंह यांच्या हक्कांसाठी लंडनला जाऊन दाद मागणारे व नंतर साताऱ्यात उठावाची योजना आखणारे प्रमुख नेते कोण होते?',
    questionEn: 'Who was the key leader who went to London to represent Chhatrapati Pratapsingh of Satara and later planned the 1857 rebellion in Satara?',
    optionsMr: [
      'रंगो बापूजी गुप्ते',
      'चीमासाहेब भोसले',
      'तात्या टोपे',
      'भागोजी नाईक'
    ],
    optionsEn: [
      'Rango Bapuji Gupte',
      'Chimasaheb Bhosale',
      'Tatya Tope',
      'Bhagoji Naik'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'रंगो बापूजी गुप्ते यांनी लंडनमध्ये तब्बल १४ वर्षे लढा दिला. भारतात परतल्यावर त्यांनी साताऱ्यात १८५७ च्या उठावाची गुप्त योजना आखली.',
    explanationEn: 'Rango Bapuji Gupte stayed in London for 14 years fighting for Chhatrapati Pratapsingh, and returned to organize the Satara uprising.',
    reference: 'डॉ. अनिल कठारे - आधुनिक महाराष्ट्राचा इतिहास',
    yearTag: '2026'
  },
  {
    id: 'mpsc_hist_fb_014',
    subjectId: 'maharashtra_history',
    topic: 'प्रार्थना समाज व समाजसुधारणा',
    subtopic: 'स्थापना व विचारवंत',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: '३१ मार्च १८६७ रोजी मुंबई येथे प्रार्थना समाजाची स्थापना कोणाच्या अध्यक्षतेखाली झाली?',
    questionEn: 'Under whose presidency was the Prarthana Samaj established in Mumbai on March 31, 1867?',
    optionsMr: [
      'डॉ. आत्माराम पांडुरंग तर्खडकर',
      'न्यायमूर्ती महादेव गोविंद रानडे',
      'दादोबा पांडुरंग तर्खडकर',
      'भाऊ दाजी लाड'
    ],
    optionsEn: [
      'Dr. Atmaram Pandurang Tarkhadkar',
      'Justice Mahadev Govind Ranade',
      'Dadoba Pandurang Tarkhadkar',
      'Bhau Daji Lad'
    ],
    correctAnswerIndex: 0,
    explanationMr: '३१ मार्च १८६७ रोजी डॉ. आत्माराम पांडुरंग तर्खडकर यांच्या निवासस्थानी प्रार्थना समाजाची स्थापना झाली. केशवचंद्र सेन यांच्या मुंबई भेटीने यासाठी प्रेरणा मिळाली.',
    explanationEn: 'Prarthana Samaj was established on March 31, 1867 at Dr. Atmaram Pandurang Tarkhadkar’s residence inspired by Keshub Chunder Sen.',
    reference: 'डॉ. एस. एस. गाठाळ - आधुनिक महाराष्ट्राचा इतिहास',
    yearTag: '2026'
  },
  {
    id: 'mpsc_geog_fb_015',
    subjectId: 'maharashtra_geography',
    topic: 'महाराष्ट्राची जलप्रणाली व नद्या',
    subtopic: 'गोदावरी व कृष्णा खोरे',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: 'गोदावरी नदीच्या उपनद्यांबाबत खालील जोड्या विचारात घ्या:\n(१) प्रवरा - भंडारदरा (आर्थर लेक)\n(२) मांजरा - बालाघाट पठार\n(३) वर्धा व वैनगंगा यांचा संगम - प्राणहिता\nवरीलपैकी कोणती/त्या जोड्या योग्य आहेत?',
    questionEn: 'Consider the following pairs regarding Godavari river tributaries:\n(1) Pravara - Bhandardara (Arthur Lake)\n(2) Manjra - Balaghat plateau\n(3) Confluence of Wardha and Wainganga - Pranhita\nWhich of the above pairs are correct?',
    optionsMr: [
      'फक्त (१) आणि (२)',
      'फक्त (२) आणि (३)',
      'फक्त (१) आणि (३)',
      'सर्व जोड्या योग्य आहेत (१, २ आणि ३)'
    ],
    optionsEn: [
      'Only (1) and (2)',
      'Only (2) and (3)',
      'Only (1) and (3)',
      'All pairs are correct (1, 2 and 3)'
    ],
    correctAnswerIndex: 3,
    explanationMr: 'प्रवरा नदीवर भंडारदरा धरण (विल्सन डॅम/आर्थर लेक) आहे, मांजरा नदी बालाघाट पठारावरून वाहते, तर वर्धा व वैनगंगा यांच्या संयुक्त प्रवाहाला प्राणहिता म्हणतात.',
    explanationEn: 'Wilson Dam (Bhandardara) is on Pravara, Manjra flows through Balaghat plateau, and the confluence of Wardha and Wainganga is called Pranhita.',
    reference: 'ए. बी. सवदी - महाराष्ट्राचा समग्र भूगोल',
    yearTag: '2026'
  },
  {
    id: 'mpsc_geog_fb_016',
    subjectId: 'maharashtra_geography',
    topic: 'महाराष्ट्रातील मृदा व खनिजे',
    subtopic: 'काळी कापसाची मृदा (रेगूर मृदा)',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: 'महाराष्ट्रातील रेगूर (काळी कापसाची) मृदेस काळा रंग खालीलपैकी कोणत्या घटकामुळे प्राप्त होतो?',
    questionEn: 'The black color of Regur (black cotton) soil in Maharashtra is primarily due to the presence of:',
    optionsMr: [
      'टिटॅनिफेरस मॅग्नेटाईट (Titaniferous Magnetite)',
      'लोह ऑक्साईड व फेरिक हायड्रॉक्साईड',
      'कॅल्शियम कार्बोनेट व जिप्सम',
      'अ‍ॅल्युमिनियम सिलिकेट'
    ],
    optionsEn: [
      'Titaniferous Magnetite',
      'Iron Oxide and Ferric Hydroxide',
      'Calcium Carbonate and Gypsum',
      'Aluminium Silicate'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'दख्खनच्या बेसाल्ट खडकाच्या अपक्षयाने तयार झालेल्या रेगूर मातीत टिटॅनिफेरस मॅग्नेटाईटचे सूक्ष्म कण असल्यामुळे तिला विशिष्ट काळा रंग प्राप्त होतो.',
    explanationEn: 'The black color of Regur soil is due to titaniferous magnetite and hydrated oxides of aluminum and iron.',
    reference: 'एनसीईआरटी / स्टेट बोर्ड भूगोल इयत्ता ११ वी',
    yearTag: '2026'
  },
  {
    id: 'mpsc_geog_fb_017',
    subjectId: 'maharashtra_geography',
    topic: 'महाराष्ट्रातील राष्ट्रीय उद्याने व अभयारण्ये',
    subtopic: 'व्याघ्र प्रकल्प व जिल्हे',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: 'महाराष्ट्रातील ताडोबा-अंधारी राष्ट्रीय उद्यान व व्याघ्र प्रकल्प खालीलपैकी कोणत्या जिल्ह्यात स्थित आहे?',
    questionEn: 'Tadoba-Andhari National Park and Tiger Reserve in Maharashtra is situated in which district?',
    optionsMr: [
      'चंद्रपूर',
      'गडचिरोली',
      'नागपूर',
      'गोंदिया'
    ],
    optionsEn: [
      'Chandrapur',
      'Gadchiroli',
      'Nagpur',
      'Gondia'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'ताडोबा राष्ट्रीय उद्यान (स्थापना १९५५) हे महाराष्ट्रातील सर्वात जुने राष्ट्रीय उद्यान असून ते चंद्रपूर जिल्ह्यात स्थित आहे.',
    explanationEn: 'Tadoba National Park (established in 1955) is the oldest national park in Maharashtra, located in Chandrapur district.',
    reference: 'महाराष्ट्र वन विभाग अधिकृत सांख्यिकी',
    yearTag: '2026'
  },
  {
    id: 'mpsc_econ_fb_018',
    subjectId: 'economy',
    topic: 'मौद्रिक धोरण व बँकिंग व्यवस्था',
    subtopic: 'रिझर्व्ह बँकेची पत नियंत्रणाची साधने',
    exam: 'Rajyaseva',
    difficulty: 'Hard',
    questionMr: 'भारतीय रिझर्व्ह बँकेच्या (RBI) तरल समायोजन सुविधा (LAF) अंतर्गत खालील विधाने विचारात घ्या:\n(अ) रेपो रेट (Repo Rate) म्हणजे ज्या दराने RBI व्यापारी बँकांना अल्पमुदतीचे कर्ज देते.\n(ब) स्थायी ठेव सुविधा (SDF - Standing Deposit Facility) अंतर्गत RBI कोणत्याही तारण (Collateral) शिवाय बँकांकडून अतिरिक्त तरलता शोषून घेते.\n(क) एमएसएफ (MSF) दर हा सामान्यतः रेपो दरापेक्षा जास्त असतो.\nवरीलपैकी कोणती विधाने सत्य आहेत?',
    questionEn: 'Consider the following statements regarding RBI’s Liquidity Adjustment Facility (LAF):\n(a) Repo Rate is the rate at which RBI lends short-term funds to commercial banks.\n(b) Under SDF (Standing Deposit Facility), RBI absorbs liquidity from banks without providing collateral.\n(c) MSF rate is generally higher than the Repo rate.\nWhich of the above statements are correct?',
    optionsMr: [
      'फक्त (अ) आणि (ब)',
      'फक्त (ब) आणि (क)',
      'फक्त (अ) आणि (क)',
      'सर्व विधाने सत्य आहेत (अ, ब आणि क)'
    ],
    optionsEn: [
      'Only (a) and (b)',
      'Only (b) and (c)',
      'Only (a) and (c)',
      'All statements (a, b and c) are correct'
    ],
    correctAnswerIndex: 3,
    explanationMr: 'SDF ही २०२२ मध्ये सुरू झालेली विनातारण ठेव सुविधा आहे. MSF दराने बँका आपत्कालीन कर्ज घेतात (Repo + 25 bps). सर्व विधाने सत्य आहेत.',
    explanationEn: 'SDF absorbs uncollateralized liquidity, Repo is short-term lending rate with securities, and MSF rate operates at an upper spread above repo.',
    reference: 'रमेश सिंग - भारतीय अर्थव्यवस्था / RBI Bulletin',
    yearTag: '2026'
  },
  {
    id: 'mpsc_econ_fb_019',
    subjectId: 'economy',
    topic: 'वस्तू व सेवा कर (GST) व वित्तीय संघराज्य',
    subtopic: 'जीएसटी परिषद - कलम २७९A',
    exam: 'Rajyaseva',
    difficulty: 'Hard',
    questionMr: 'संविधानातील कलम २७९A नुसार गठित वस्तू व सेवा कर (GST) परिषदेच्या निर्णय प्रक्रियेबाबत खालीलपैकी कोणते विधान सत्य आहे?',
    questionEn: 'Regarding the decision-making process of the GST Council constituted under Article 279A, which of the following is correct?',
    optionsMr: [
      'केंद्राच्या मताचे मूल्य १/३ (एक तृतीयांश) आणि सर्व राज्यांच्या मतांचे एकत्रित मूल्य २/३ (दोन तृतीयांश) असते.',
      'केंद्राच्या आणि राज्यांच्या मतांचे मूल्य समान (१/२ प्रत्येकी) असते.',
      'निर्णयासाठी उपस्थित व मतदान करणाऱ्या सदस्यांच्या किमान ५०% बहुमताची आवश्यकता असते.',
      'राज्यांच्या मतांचे मूल्य त्यांच्या लोकसंख्येच्या प्रमाणात निश्चित केले जाते.'
    ],
    optionsEn: [
      'Central government vote has weightage of 1/3rd, while all state governments combined have 2/3rd weightage.',
      'Central and state government votes have equal 1/2 weightage.',
      'Decisions require a simple 50% majority of members present and voting.',
      'State vote weightage is proportional to population.'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'GST परिषदेत कोणताही निर्णय होण्यासाठी ३/४ (७५%) भारांकित बहुमताची आवश्यकता असते. यात केंद्राचे वजन १/३ आणि सर्व राज्यांचे मिळून २/३ असते.',
    explanationEn: 'GST Council decisions require a weighted majority of at least 3/4th (75%). Centre has 1/3rd weightage, all States together have 2/3rd.',
    reference: 'भारतीय संविधान कलम २७९A',
    yearTag: '2026'
  },
  {
    id: 'mpsc_econ_fb_020',
    subjectId: 'economy',
    topic: 'दारिद्र्य मोजमाप व आर्थिक समावेशन',
    subtopic: 'दारिद्र्य अंदाज समित्या',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: 'भारतात नियोजन आयोगाने नेमलेल्या तेंडुलकर समितीने (२००९) दारिद्र्यरेषेच्या मोजमापासाठी खालीलपैकी कोणता नवा निकष स्वीकारला होता?',
    questionEn: 'Which new criterion was adopted by the Tendulkar Committee (2009) appointed by the Planning Commission for measuring the poverty line?',
    optionsMr: [
      'केवळ उष्मांक (Calories) आधाराऐवजी अन्न, शिक्षण व आरोग्य यावरील दरडोई मासिक उपभोग खर्च (URP/MRP)',
      'फक्त कुटुंबाची वार्षिक मालमत्ता व जमीन धारणा',
      'जागतिक बँकेचा १ डॉलर प्रतिदिन निकष',
      'केवळ ग्रामीण भागातील धान्य वाटप प्रमाण'
    ],
    optionsEn: [
      'Monthly Per Capita Consumption Expenditure covering food, education, and health instead of sole calorie norm',
      'Annual family assets and land holding only',
      'World Bank $1 per day benchmark',
      'Grain distribution quota in rural areas only'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'तेंडुलकर समितीने जुन्या केवळ उष्मांक (कॅलरी) निकषाचा त्याग करून शिक्षण आणि आरोग्य यावरील खासगी खर्चाचा समावेश करून दरडोई उपभोग खर्चावर (MPCE) आधारित दारिद्र्यरेषा निश्चित केली.',
    explanationEn: 'Tendulkar Committee moved away from calorie anchor to actual private expenditure on health and education alongside nutrition using MRP.',
    reference: 'नियोजन आयोग अहवाल २००९ / दत्त व सुंदरम भारतीय अर्थव्यवस्था',
    yearTag: '2026'
  },
  {
    id: 'mpsc_sci_fb_021',
    subjectId: 'general_science',
    topic: 'मानवी शरीरशास्त्र व जीवशास्त्र',
    subtopic: 'रक्तगट व आरएच फॅक्टर',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: 'मानवी रक्तगट शोधण्याचे श्रेय डॉ. कार्ल लँडस्टायनर यांना जाते. खालीलपैकी कोणता रक्तगट "सर्वयोग्य ग्राहक" (Universal Recipient) मानला जातो?',
    questionEn: 'Human ABO blood groups were discovered by Karl Landsteiner. Which of the following is considered the "Universal Recipient"?',
    optionsMr: [
      'AB+',
      'O-',
      'AB-',
      'O+'
    ],
    optionsEn: [
      'AB+',
      'O-',
      'AB-',
      'O+'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'AB+ रक्तगटाच्या व्यक्तीच्या रक्तामध्ये A व B दोन्ही प्रतिजन (Antigens) आणि Rh फॅक्टर असतो, परंतु कोणतेही प्रतिपिंड (Antibodies) नसल्याने ती व्यक्ती कोणत्याही रक्तगटाचे रक्त स्वीकारू शकते.',
    explanationEn: 'AB positive (AB+) possesses both A and B antigens as well as Rh factor, with no anti-A or anti-B antibodies, making it the universal recipient.',
    reference: 'स्टेट बोर्ड सामान्य विज्ञान इयत्ता १० वी',
    yearTag: '2026'
  },
  {
    id: 'mpsc_sci_fb_022',
    subjectId: 'general_science',
    topic: 'भौतिकशास्त्र व प्रकाशशास्त्र',
    subtopic: 'पूर्ण आंतरिक परावर्तन (Total Internal Reflection)',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: 'ऑप्टिकल फायबर (Optical Fibre) आणि वाळवंटातील मृगजळ (Mirage) ही खालीलपैकी कोणत्या भौतिकशास्त्रीय घटनेची प्रमुख उदाहरणे आहेत?',
    questionEn: 'Optical fibres and desert mirages are classic examples of which optical phenomenon?',
    optionsMr: [
      'पूर्ण आंतरिक परावर्तन (Total Internal Reflection)',
      'प्रकाशाचे अपस्करण (Dispersion of Light)',
      'प्रकाशाचे विवर्तन (Diffraction of Light)',
      'प्रकाशाचे ध्रुवीकरण (Polarization of Light)'
    ],
    optionsEn: [
      'Total Internal Reflection',
      'Dispersion of Light',
      'Diffraction of Light',
      'Polarization of Light'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'जेव्हा प्रकाश किरण घन माध्यमातून विरल माध्यमात जाताना आपाती कोन हा क्रांतिक कोनापेक्षा (Critical Angle) मोठा असतो, तेव्हा पूर्ण आंतरिक परावर्तन (TIR) घडून येते.',
    explanationEn: 'Total Internal Reflection occurs when light travels from a denser medium to a rarer medium at an angle of incidence greater than the critical angle.',
    reference: 'स्टेट बोर्ड भौतिकशास्त्र इयत्ता ११ वी व १२ वी',
    yearTag: '2026'
  },
  {
    id: 'mpsc_sci_fb_023',
    subjectId: 'general_science',
    topic: 'रसायनशास्त्र व पर्यावरण',
    subtopic: 'आम्ल, आम्लारी व आम्ल पाऊस (Acid Rain)',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: 'आम्ल पर्जन्य (Acid Rain) प्रामुख्याने वातावरणातील खालीलपैकी कोणत्या वायूंच्या प्रदूषणामुळे घडून येते?',
    questionEn: 'Acid rain is primarily caused by atmospheric emissions of which of the following gases?',
    optionsMr: [
      'सल्फर डायऑक्साईड (SO₂) आणि नायट्रोजन ऑक्साईड (NOₓ)',
      'कार्बन मोनॉक्साईड (CO) आणि मिथेन (CH₄)',
      'ओझोन (O₃) आणि क्लोरोफ्लुरोकार्बन (CFC)',
      'अमोनिया (NH₃) आणि हायड्रोजन सल्फाईड (H₂S)'
    ],
    optionsEn: [
      'Sulfur Dioxide (SO₂) and Nitrogen Oxides (NOₓ)',
      'Carbon Monoxide (CO) and Methane (CH₄)',
      'Ozone (O₃) and Chlorofluorocarbons (CFCs)',
      'Ammonia (NH₃) and Hydrogen Sulfide (H₂S)'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'SO₂ आणि NO₂ पावसाच्या पाण्यातील बाष्पाशी संयोग पावून सल्फ्युरिक ॲसिड (H₂SO₄) व नायट्रिक ॲसिड (HNO₃) तयार करतात, ज्याचा pH ५.६ पेक्षा कमी असतो.',
    explanationEn: 'SO₂ and NOₓ react with atmospheric water vapor to form sulfuric and nitric acids, driving rain pH below 5.6.',
    reference: 'पर्यावरण व सामान्य विज्ञान पाठ्यपुस्तक',
    yearTag: '2026'
  },
  {
    id: 'mpsc_curr_fb_024',
    subjectId: 'current_affairs',
    topic: 'राष्ट्रीय व राज्यस्तरीय पुरस्कार २०२४-२०२६',
    subtopic: 'पद्म पुरस्कार - महाराष्ट्र',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: 'प्रसिद्ध मराठी व हिंदी अभिनेते अशोक सराफ यांना कला क्षेत्रातील उल्लेखनीय योगदानाबद्दल खालीलपैकी कोणत्या राष्ट्रीय सन्मानाने गौरविण्यात आले?',
    questionEn: 'Eminent actor Ashok Saraf was conferred with which prestigious national honor for his contribution to Arts?',
    optionsMr: [
      'पद्मश्री पुरस्कार',
      'पद्मभूषण पुरस्कार',
      'पद्मविभूषण पुरस्कार',
      'दादासाहेब फाळके जीवनगौरव पुरस्कार'
    ],
    optionsEn: [
      'Padma Shri',
      'Padma Bhushan',
      'Padma Vibhushan',
      'Dadasaheb Phalke Lifetime Achievement Award'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'ज्येष्ठ अभिनेते अशोक सराफ यांना भारत सरकारतर्फे कला क्षेत्रातील दीर्घ योगदानासाठी पद्मश्री (Padma Shri) पुरस्काराने सन्मानित करण्यात आले आहे.',
    explanationEn: 'Veteran actor Ashok Saraf was awarded the Padma Shri for distinguished service in the arts.',
    reference: 'गृह मंत्रालय (MHA) पद्म पुरस्कार अधिकृत यादी',
    yearTag: '2026'
  },
  {
    id: 'mpsc_curr_fb_025',
    subjectId: 'current_affairs',
    topic: 'संवैधानिक सुधारणा व चालू घडामोडी',
    subtopic: 'मुख्य निवडणूक आयुक्त व निवडणूक आयुक्त नियुक्ती कायदा',
    exam: 'Rajyaseva',
    difficulty: 'Hard',
    questionMr: 'मुख्य निवडणूक आयुक्त व इतर निवडणूक आयुक्त (नियुक्ती, सेवाशर्ती व कार्यकाळ) कायदा २०२३ नुसार निवड समितीमध्ये (Selection Committee) खालीलपैकी कोणाचा समावेश असतो?\n(१) भारताचे पंतप्रधान (अध्यक्ष)\n(२) लोकसभेतील विरोधी पक्षनेते किंवा सर्वात मोठ्या विरोधी पक्षाचे नेते\n(३) पंतप्रधानांनी नामनिर्देशित केलेले एक केंद्रीय कॅबिनेट मंत्री\n(४) भारताचे सरन्यायाधीश (CJI)\nखालील पर्यायांतून योग्य उत्तर निवडा:',
    questionEn: 'Under the Chief Election Commissioner and other ECs Act 2023, who constitutes the Selection Committee?\n(1) Prime Minister (Chairperson)\n(2) Leader of Opposition in Lok Sabha\n(3) A Union Cabinet Minister nominated by PM\n(4) Chief Justice of India\nSelect the correct answer:',
    optionsMr: [
      'फक्त (१), (२) आणि (३)',
      'फक्त (१), (२) आणि (४)',
      'फक्त (१) आणि (२)',
      'सर्व (१, २, ३ आणि ४)'
    ],
    optionsEn: [
      'Only (1), (2) and (3)',
      'Only (1), (2) and (4)',
      'Only (1) and (2)',
      'All (1, 2, 3 and 4)'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'नवीन कायद्यानुसार निवड समितीत पंतप्रधान, लोकसभेतील विरोधी पक्षनेते आणि पंतप्रधानांनी नामनिर्देशित केलेले केंद्रीय मंत्री यांचा समावेश आहे. सरन्यायाधीशांचा समावेश या समितीत नाही.',
    explanationEn: 'The Selection Committee consists of the PM, Leader of the Opposition/single largest party in Lok Sabha, and a Union Cabinet Minister nominated by the PM.',
    reference: 'दि गॅझेट ऑफ इंडिया (CEC Act 2023)',
    yearTag: '2026'
  },
  {
    id: 'mpsc_curr_fb_026',
    subjectId: 'current_affairs',
    topic: 'महाराष्ट्र शासन योजना २०२५-२०२६',
    subtopic: 'ऊर्जा व कृषी विकास',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: 'शेतकऱ्यांना दिवसा खात्रीशीर वीजपुरवठा करण्यासाठी महाराष्ट्र शासनाने सुरू केलेल्या "मुख्यमंत्री सौर कृषी वाहिनी योजना २.०" (MSKVY 2.0) चे प्रमुख उद्दिष्ट काय आहे?',
    questionEn: 'What is the primary objective of "Mukhyamantri Saur Krushi Vahini Yojana 2.0" (MSKVY 2.0) launched by Maharashtra Government?',
    optionsMr: [
      'कृषी वाहिन्यांचे १००% सौर ऊर्जीकरण करून शेतकऱ्यांना दिवसा विश्वासार्ह वीज देणे',
      'सर्व शेतकऱ्यांना मोफत डिझेल पंप वाटप करणे',
      'केवळ साखर कारखान्यांना वीज पुरवणे',
      'विहिरींमधील भूजल उपसा थांबवणे'
    ],
    optionsEn: [
      'Solarizing 100% of agricultural feeders to supply daytime power to farmers',
      'Distributing free diesel pumps to all farmers',
      'Supplying power only to sugar factories',
      'Stopping groundwater extraction from open wells'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'MSKVY 2.0 अंतर्गत कृषी फिडर्सचे सौर ऊर्जीकरण करून किमान ३०% कृषी ग्राहकांना सौर ऊर्जेवर आणून दिवसा शाश्वत वीज उपलब्ध करून दिली जात आहे.',
    explanationEn: 'MSKVY 2.0 aims to solarize dedicated agricultural feeders to provide farmers with reliable daytime power.',
    reference: 'महाराष्ट्र शासन ऊर्जा विभाग शासन निर्णय',
    yearTag: '2026'
  },
  {
    id: 'mpsc_mar_fb_027',
    subjectId: 'marathi_grammar',
    topic: 'मराठी व्याकरण',
    subtopic: 'प्रयोग विचार',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: '"रामाने रावणास मारले." या वाक्यातील प्रयोग कोणता?',
    questionEn: 'Identify the voice (Prayog) in Marathi sentence: "रामाने रावणास मारले."',
    optionsMr: [
      'कर्तरी प्रयोग',
      'कर्मणी प्रयोग',
      'भावे प्रयोग',
      'मिश्र प्रयोग'
    ],
    optionsEn: [
      'Kartari Prayog',
      'Karmani Prayog',
      'Bhave Prayog',
      'Mishra Prayog'
    ],
    correctAnswerIndex: 2,
    explanationMr: 'जेव्हा क्रियापदाचे रूप कर्त्याच्या किंवा कर्माच्या लिंग, वचन वा पुरुषानुसार बदलत नसून ते नेहमी तृतीयपुरुषी, नपुंसकलिंगी, एकवचनी व स्वतंत्र असते, तेव्हा "भावे प्रयोग" होतो. येथे कर्त्याला (रामाने) व कर्माला (रावणास) दोन्हींना प्रत्यय आहेत.',
    explanationEn: 'When the verb does not agree with subject or object and remains third person neuter singular, it is Bhave Prayog.',
    reference: 'मो. रा. वाळंबे - सुगम मराठी व्याकरण व लेखन',
    yearTag: '2026'
  },
  {
    id: 'mpsc_eng_fb_028',
    subjectId: 'english_grammar',
    topic: 'English Grammar',
    subtopic: 'Conditionals and Inversion',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: 'खालील वाक्यातील व्याकरणदृष्ट्या योग्य पर्याय निवडा:\n"Had the Deputy Collector inspected the dam on time, the disaster ____________."',
    questionEn: 'Choose the grammatically correct option to complete the conditional sentence:\n"Had the Deputy Collector inspected the dam on time, the disaster ____________."',
    optionsMr: [
      'would have been averted',
      'will be averted',
      'would be averted',
      'had averted'
    ],
    optionsEn: [
      'would have been averted',
      'will be averted',
      'would be averted',
      'had averted'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'तिसऱ्या प्रकारच्या अट दर्शक वाक्यात (Third Conditional) भूतकाळातील काल्पनिक क्रियेसाठी "Had + Subject + V3" आल्यास मुख्य वाक्यात "would have + V3" (किंवा कर्मणी रचनेसाठी "would have been + V3") वापरले जाते.',
    explanationEn: 'In third conditional sentences (unreal past), inverted "Had + Subject + Past Participle" in if-clause requires "would have + been + V3" in passive result clause.',
    reference: 'Wren & Martin High School English Grammar & Composition',
    yearTag: '2026'
  }
];

async function addNextBatchToFirebase() {
  console.log(`Starting to add Batch 2 (${NEXT_BATCH_MPSC_MCQS.length} MCQs) to Firebase Firestore...`);
  let added = 0;
  for (const q of NEXT_BATCH_MPSC_MCQS) {
    try {
      const qRef = doc(db, 'mpsc_questions', q.id);
      await setDoc(
        qRef,
        {
          ...q,
          batch: 2,
          updatedAt: new Date().toISOString(),
          source: 'Curated MPSC Question Bank - Batch 2',
        },
        { merge: true }
      );
      added++;
      console.log(`✔ Added [${q.id}] - ${q.subjectId}: ${q.questionMr.slice(0, 40)}...`);
    } catch (err: any) {
      console.error(`✖ Failed to add ${q.id}:`, err?.message);
    }
  }

  console.log(`\n🎉 Completed! Successfully added ${added}/${NEXT_BATCH_MPSC_MCQS.length} MCQs of Batch 2 to Firestore.`);
  await terminate(db);
  process.exit(0);
}

addNextBatchToFirebase().catch((err) => {
  console.error('Fatal error adding Batch 2 MCQs to Firestore:', err);
  process.exit(1);
});
