// ============================================================================
// MAHARASHTRA GOVERNMENT SCHEMES & ECONOMIC SURVEY MASTER DATASET
// 60+ Flagship Schemes, Economic Survey Indicators, MPSC PYQs & Monetization
// ============================================================================

export type SchemeCategory = 
  | 'women_child'     // महिला व बालविकास
  | 'farmers_agri'     // शेतकरी व कृषी विकास
  | 'youth_employment' // युवक, शिक्षण व रोजगार
  | 'social_justice'   // सामाजिक न्याय व दुर्बल घटक
  | 'health_welfare'   // आरोग्य व सामाजिक सुरक्षा
  | 'energy_infra';    // ऊर्जा, पर्यावरण व पायाभूत सुविधा

export interface GovtScheme {
  id: string;
  nameMr: string;
  nameEn: string;
  category: SchemeCategory;
  categoryLabelMr: string;
  categoryLabelEn: string;
  launchYear: string;
  nodalMinistryMr: string;
  nodalMinistryEn: string;
  targetBeneficiariesMr: string;
  financialBenefitMr: string;
  eligibilityCriteriaMr: string[];
  keyExamPointsMr: string[];
  officialPortal?: string;
  icon: string;
  badgeColor: string; // Tailwind accent
  pyqsCount: number;
  tagsMr: string[];
}

export interface EconomicSurveyMetric {
  id: string;
  titleMr: string;
  titleEn: string;
  valueMr: string;
  valueEn: string;
  previousValueMr?: string;
  trend: 'up' | 'down' | 'stable';
  examNoteMr: string;
  sectorMr: 'GSDP' | 'Agriculture' | 'Industry' | 'Services' | 'Social' | 'Infrastructure';
}

export interface SchemePyqQuestion {
  id: string;
  questionMr: string;
  optionsMr: string[];
  correctOptionIndex: number; // 0-indexed
  examYearTagMr: string; // e.g. MPSC Combine Pre 2024 / Rajyaseva 2023
  relatedSchemeId: string;
  explanationMr: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const SCHEME_CATEGORIES: { id: SchemeCategory; labelMr: string; labelEn: string; icon: string }[] = [
  { id: 'women_child', labelMr: '👩 महिला व बालविकास', labelEn: 'Women & Child', icon: '👩' },
  { id: 'farmers_agri', labelMr: '🌾 शेतकरी व कृषी विकास', labelEn: 'Farmers & Agri', icon: '🌾' },
  { id: 'youth_employment', labelMr: '🎓 युवक, शिक्षण व रोजगार', labelEn: 'Youth & Skill', icon: '🎓' },
  { id: 'social_justice', labelMr: '⚖️ सामाजिक न्याय व गृहनिर्माण', labelEn: 'Social Justice', icon: '⚖️' },
  { id: 'health_welfare', labelMr: '🏥 आरोग्य व सामाजिक सुरक्षा', labelEn: 'Health & Welfare', icon: '🏥' },
  { id: 'energy_infra', labelMr: '⚡ ऊर्जा, पर्यावरण व पायाभूत', labelEn: 'Energy & Infra', icon: '⚡' }
];

export const MAHARASHTRA_GOVT_SCHEMES: GovtScheme[] = [
  // 1. WOMEN & CHILD
  {
    id: 'ladki_bahin',
    nameMr: 'मुख्यमंत्री माझी लाडकी बहीण योजना',
    nameEn: 'Mukhyamantri Majhi Ladki Bahin Yojana',
    category: 'women_child',
    categoryLabelMr: 'महिला व बालविकास',
    categoryLabelEn: 'Women & Child',
    launchYear: '२०२४ (जुलै २०२४)',
    nodalMinistryMr: 'महिला व बालविकास विभाग, महाराष्ट्र शासन',
    nodalMinistryEn: 'Department of Women & Child Development, Govt of Maharashtra',
    targetBeneficiariesMr: '२१ ते ६५ वयोगटातील पात्र विवाहित, विधवा, घटस्फोटित, परित्यक्ता व निराधार महिला',
    financialBenefitMr: 'दरमहा ₹१,५०० थेट लाभार्थी बँक खात्यात (DBT द्वारे) - वार्षिक ₹१८,०००',
    eligibilityCriteriaMr: [
      'महाराष्ट्राची कायमस्वरूपी रहिवासी असणे आवश्यक.',
      'कुटुंबाचे एकत्रित वार्षिक उत्पन्न ₹२.५० लाखांपेक्षा जास्त नसावे (पिवळे/केशरी रेशनकार्ड धारक पात्र).',
      'वयोमर्यादा: २१ ते ६५ वर्षे पूर्ण असणे आवश्यक.',
      'कुटुंबातील सदस्य आयकर दाता नसावा किंवा चारचाकी वाहन नसावे (ट्रॅक्टर वगळून).'
    ],
    keyExamPointsMr: [
      'महाराष्ट्राच्या २०२४-२५ च्या अतिरिक्त अर्थसंकल्पात उपमुख्यमंत्री तथा वित्तमंत्र्यांनी घोषणा केली.',
      'या योजनेसाठी वार्षिक ₹४६,००० कोटींची तरतूद करण्यात आली आहे.',
      'मध्य प्रदेशच्या "लाडली बहना" योजनेच्या धर्तीवर महाराष्ट्रात ही योजना सुरू केली गेली.',
      'महिलांचे आर्थिक स्वावलंबन, आरोग्य व पोषण सुधारणा हा प्रमुख उद्देश आहे.'
    ],
    officialPortal: 'ladakibahin.maharashtra.gov.in',
    icon: '🌸',
    badgeColor: 'border-pink-500/50 from-pink-500/20 to-rose-500/10 text-pink-300',
    pyqsCount: 12,
    tagsMr: ['लाडकी बहीण', 'DBT', '₹१५००', 'महिला सक्षमीकरण', 'अर्थसंकल्प २०२४']
  },
  {
    id: 'lek_ladki',
    nameMr: 'लेक लाडकी योजना (महाराष्ट्र)',
    nameEn: 'Lek Ladki Yojana',
    category: 'women_child',
    categoryLabelMr: 'महिला व बालविकास',
    categoryLabelEn: 'Women & Child',
    launchYear: '२०२३ (१ एप्रिल २०२३ पासून जन्मलेल्या मुलींसाठी)',
    nodalMinistryMr: 'महिला व बालविकास विभाग, महाराष्ट्र शासन',
    nodalMinistryEn: 'Dept of Women & Child Development',
    targetBeneficiariesMr: 'पिवळे व केशरी रेशनकार्डधारक कुटुंबातील १ एप्रिल २०२३ नंतर जन्मणाऱ्या मुली',
    financialBenefitMr: 'मुलीच्या जन्मापासून १८ वर्षे पूर्ण होईपर्यंत टप्प्याटप्प्याने एकूण ₹१,०१,००० ची आर्थिक मदत',
    eligibilityCriteriaMr: [
      '१ एप्रिल २०२३ नंतर जन्मलेल्या मुलींना लागू.',
      'पिवळे व केशरी रेशनकार्डधारक कुटुंबातील पहिल्या २ मुलींना लाभ (दुसऱ्या प्रसूतीवेळी जुळ्या मुली झाल्यास दोघींना लाभ).',
      'कुटुंब नियोजन शस्त्रक्रिया बंधनकारक (दुसऱ्या अपत्यानंतर).'
    ],
    keyExamPointsMr: [
      'टप्पे: जन्मानंतर ₹५,०००; पहिलीत प्रवेश ₹६,०००; सहावीत प्रवेश ₹७,०००; अकरावीत प्रवेश ₹८,०००; १८ वर्षे पूर्ण झाल्यावर ₹७५,००० रोख.',
      'एकूण सहाय्य: ₹१,०१,००० (एक लाख एक हजार रुपये).',
      'उद्देश: स्त्रीभ्रूणहत्या रोखणे, मुलींचे शिक्षण वाढवणे आणि बालविवाह रोखणे.'
    ],
    icon: '👧',
    badgeColor: 'border-purple-500/50 from-purple-500/20 to-pink-500/10 text-purple-300',
    pyqsCount: 8,
    tagsMr: ['लेक लाडकी', '₹१०१०००', 'स्त्रीभ्रूणहत्या', 'बालविवाह प्रतिबंध']
  },
  {
    id: 'annapurna_yojana',
    nameMr: 'मुख्यमंत्री अन्नपूर्णा योजना',
    nameEn: 'Mukhyamantri Annapurna Yojana',
    category: 'women_child',
    categoryLabelMr: 'महिला व बालविकास / पुरवठा',
    categoryLabelEn: 'Food & Civil Supplies',
    launchYear: '२०२४',
    nodalMinistryMr: 'अन्न, नागरी पुरवठा व ग्राहक संरक्षण विभाग',
    nodalMinistryEn: 'Food, Civil Supplies and Consumer Protection Dept',
    targetBeneficiariesMr: 'पंतप्रधान उज्ज्वला योजनेच्या लाभार्थी आणि लाडकी बहीण योजनेच्या पात्र लाभार्थी महिला',
    financialBenefitMr: 'प्रत्येक पात्र कुटुंबाला वर्षाला ३ एलपीजी (LPG) गॅस सिलिंडर मोफत (अनुदान थेट खात्यात)',
    eligibilityCriteriaMr: [
      'पंतप्रधान उज्ज्वला योजनेअंतर्गत गॅस जोडणी असावी किंवा लाडकी बहीण योजनेची पात्र लाभार्थी असावी.',
      'रेशनकार्डवर एका कुटुंबात केवळ एकाच गॅस कनेक्शनवर लाभ देय.'
    ],
    keyExamPointsMr: [
      'महाराष्ट्रातील सुमारे ५२ लाख १७ हजार कुटुंबांना याचा थेट लाभ मिळतो.',
      'स्वच्छ इंधन वापर प्रोत्साहन आणि धूरमुक्त स्वयंपाकघराद्वारे महिलांचे आरोग्य रक्षण हा हेतू.'
    ],
    icon: '🔥',
    badgeColor: 'border-orange-500/50 from-orange-500/20 to-amber-500/10 text-orange-300',
    pyqsCount: 5,
    tagsMr: ['अन्नपूर्णा', '३ मोफत सिलिंडर', 'उज्ज्वला', 'स्वच्छ इंधन']
  },
  {
    id: 'kanya_van_samruddhi',
    nameMr: 'कन्या वन समृद्धी योजना',
    nameEn: 'Kanya Van Samruddhi Yojana',
    category: 'women_child',
    categoryLabelMr: 'महिला व पर्यावरण',
    categoryLabelEn: 'Women & Forest Dept',
    launchYear: '२०१८',
    nodalMinistryMr: 'महसूल व वन विभाग, महाराष्ट्र शासन',
    nodalMinistryEn: 'Revenue and Forest Department, Maharashtra',
    targetBeneficiariesMr: 'ग्रामीण भागात मुलगी जन्माला आलेली शेतकरी कुटुंबे',
    financialBenefitMr: 'मुलीच्या जन्मानंतर शेतकरी कुटुंबाला मोफत १० फळझाडांची रोपे दिली जातात',
    eligibilityCriteriaMr: [
      'ग्रामीण भागातील रहिवासी असणे आवश्यक.',
      'कुटुंबात मुलगी जन्माला आल्यावर ग्रामपंचायतीत नोंदणी असणे आवश्यक.'
    ],
    keyExamPointsMr: [
      'उद्देश: वृक्षलागवड वाढवणे आणि स्त्री जन्माचे स्वागत करणे.',
      'मिळणारी रोपे: आंबा, चिकू, पेरू, जांभूळ, आवळा, सागवान इत्यादींचे वाटप.'
    ],
    icon: '🌱',
    badgeColor: 'border-emerald-500/50 from-emerald-500/20 to-teal-500/10 text-emerald-300',
    pyqsCount: 4,
    tagsMr: ['कन्या वन समृद्धी', '१० रोपे', 'वन विभाग', 'पर्यावरण']
  },

  // 2. FARMERS & AGRICULTURE
  {
    id: 'namo_shetkari',
    nameMr: 'नमो शेतकरी महासन्मान निधी योजना',
    nameEn: 'Namo Shetkari Maha Samman Nidhi Yojana',
    category: 'farmers_agri',
    categoryLabelMr: 'शेतकरी व कृषी विकास',
    categoryLabelEn: 'Farmers & Agri',
    launchYear: '२०२३ (अर्थसंकल्प २०२३-२४)',
    nodalMinistryMr: 'कृषी विभाग, महाराष्ट्र शासन',
    nodalMinistryEn: 'Department of Agriculture, Govt of Maharashtra',
    targetBeneficiariesMr: 'पंतप्रधान किसान सन्मान निधी (PM-KISAN) योजनेसाठी पात्र असलेले महाराष्ट्रातील सर्व शेतकरी',
    financialBenefitMr: 'राज्य शासनाकडून दरवर्षी ₹६,००० अतिरिक्त अनुदान (PM-KISAN चे ₹६,००० + नमो चे ₹६,००० = एकूण ₹१२,००० दरवर्षी)',
    eligibilityCriteriaMr: [
      'PM-KISAN योजनेत ई-केवायसी (e-KYC) पूर्ण केलेले शेतकरी.',
      'जमीन नावावर असणे व आधार लिंक बँक खाते असणे आवश्यक.'
    ],
    keyExamPointsMr: [
      '₹२,००० चे तीन समान हप्ते दर चार महिन्यांनी दिले जातात.',
      'महाराष्ट्रातील सुमारे ९० लाख शेतकरी कुटुंबांना याचा लाभ मिळतो.',
      'राज्याच्या तिजोरीतून यासाठी दरवर्षी सुमारे ₹५,४०० कोटी खर्च केले जातात.'
    ],
    officialPortal: 'krishi.maharashtra.gov.in',
    icon: '🌾',
    badgeColor: 'border-green-500/50 from-green-500/20 to-emerald-500/10 text-green-300',
    pyqsCount: 11,
    tagsMr: ['नमो शेतकरी', '₹६००० राज्य', 'PM-KISAN', '₹१२००० वार्षिक', 'कृषी']
  },
  {
    id: 'jalyukt_shivar_2',
    nameMr: 'जलयुक्त शिवार अभियान २.०',
    nameEn: 'Jalyukt Shivar Abhiyan 2.0',
    category: 'farmers_agri',
    categoryLabelMr: 'जलसंधारण व कृषी',
    categoryLabelEn: 'Water Conservation',
    launchYear: '२०२३ (पुनरुज्जीवन)',
    nodalMinistryMr: 'मृद व जलसंधारण विभाग, महाराष्ट्र शासन',
    nodalMinistryEn: 'Soil and Water Conservation Dept',
    targetBeneficiariesMr: 'महाराष्ट्रातील टंचाईग्रस्त व अवर्षणप्रवण गावे',
    financialBenefitMr: 'शेततळे, नाला खोलीकरण, सिमेंट बंधारे, जलसंधारण कामांसाठी १००% शासकीय निधी',
    eligibilityCriteriaMr: [
      'प्रथम टप्प्यात वगळलेली किंवा टंचाईग्रस्त ५,००० गावे निवडली जातात.',
      'पाण्याचा ताळेबंद (Water Budgeting) तयार करून गावपातळीवर कामे केली जातात.'
    ],
    keyExamPointsMr: [
      'पहिला टप्पा: २०१४ ते २०१९ मध्ये राबवला गेला होता.',
      'दुसरा टप्पा: जानेवारी २०२३ मध्ये मंत्रिमंडळाने मंजुरी देऊन नव्याने सुरू केला.',
      'उद्देश: महाराष्ट्र दुष्काळमुक्त करणे, भूजल पातळी वाढवणे व सिंचन क्षेत्र वाढवणे.'
    ],
    icon: '💧',
    badgeColor: 'border-cyan-500/50 from-cyan-500/20 to-blue-500/10 text-cyan-300',
    pyqsCount: 14,
    tagsMr: ['जलयुक्त शिवार', 'दुष्काळमुक्त', 'नाला खोलीकरण', 'भूजल पातळी']
  },
  {
    id: 'magel_tyala_solar_pump',
    nameMr: 'मागेल त्याला सौर कृषी पंप योजना',
    nameEn: 'Magel Tyala Solar Agri Pump Scheme',
    category: 'farmers_agri',
    categoryLabelMr: 'ऊर्जा व कृषी विकास',
    categoryLabelEn: 'Energy & Agriculture',
    launchYear: '२०२४ (महाकृषी ऊर्जा अभियानांतर्गत)',
    nodalMinistryMr: 'ऊर्जा विभाग (महावितरण - MSEDCL)',
    nodalMinistryEn: 'Energy Dept / MSEDCL',
    targetBeneficiariesMr: 'पारंपरिक वीज जोडणी नसलेले किंवा दिवसा वीज हवी असलेले शेतकरी',
    financialBenefitMr: '९० ते ९५% शासकीय अनुदानावर ३, ५ व ७.५ एचपी क्षमतेचे सौर कृषी पंप',
    eligibilityCriteriaMr: [
      'सर्वसाधारण प्रवर्गासाठी १०% तर SC/ST प्रवर्गासाठी केवळ ५% शेतकरी हिस्सा.',
      'पाण्याचा शाश्वत स्रोत (विहीर किंवा बोअरवेल) उपलब्ध असणे आवश्यक.'
    ],
    keyExamPointsMr: [
      'शेतकऱ्यांना दिवसा सिंचनासाठी भरवशाची वीज देणे हा मुख्य उद्देश.',
      '८ लाख ५० हजार नवीन सौर कृषी पंप देण्याचे उद्दिष्ट महाराष्ट्र शासनाने ठेवले आहे.',
      'कुसुम (PM-KUSUM) योजनेशी संलग्न.'
    ],
    icon: '☀️',
    badgeColor: 'border-yellow-500/50 from-yellow-500/20 to-amber-500/10 text-yellow-300',
    pyqsCount: 7,
    tagsMr: ['सौर पंप', 'महावितरण', 'मागेल त्याला', 'कुसुम', 'दिवसा वीज']
  },
  {
    id: 'pocra_nanaji_deshmukh',
    nameMr: 'नानाजी देशमुख कृषी संजीवनी प्रकल्प (PoCRA)',
    nameEn: 'Nanaji Deshmukh Krishi Sanjeevani Prakalp (PoCRA)',
    category: 'farmers_agri',
    categoryLabelMr: 'हवामान अनुकूल कृषी',
    categoryLabelEn: 'Climate Resilient Agriculture',
    launchYear: '२०१८ (टप्पा २: २०२३-२४)',
    nodalMinistryMr: 'कृषी विभाग, महाराष्ट्र शासन (जागतिक बँक अर्थसहाय्यित)',
    nodalMinistryEn: 'Dept of Agriculture (World Bank Aided)',
    targetBeneficiariesMr: 'मराठवाडा व विदर्भातील हवामान बदलाने प्रभावित १५ जिल्ह्यातील शेतकरी',
    financialBenefitMr: 'शेततळे, ठिबक सिंचन, तुषार, फळबाग लागवड यासाठी थेट अनुदानाचे डीबीटी (DBT)',
    eligibilityCriteriaMr: [
      'विदर्भ, मराठवाडा आणि उत्तर महाराष्ट्रातील निवडक गावे.',
      'अल्प व अत्यल्प भूधारक शेतकऱ्यांना प्राधान्य.'
    ],
    keyExamPointsMr: [
      'जागतिक बँक (World Bank) आणि महाराष्ट्र शासनाचा संयुक्त प्रकल्प (६०:४० प्रमाण).',
      'हवामान अनुकूल शेती तंत्रज्ञान (Climate Smart Agriculture) विकसित करणे.',
      'MPSC परीक्षेत जागतिक बँक साह्य आणि जिल्ह्यांची संख्या (१५ जिल्हे) यावर वारंवार प्रश्न आला आहे.'
    ],
    icon: '🌦️',
    badgeColor: 'border-teal-500/50 from-teal-500/20 to-emerald-500/10 text-teal-300',
    pyqsCount: 16,
    tagsMr: ['PoCRA', 'नानाजी देशमुख', 'जागतिक बँक', 'हवामान अनुकूल शेती']
  },
  {
    id: 'gopinath_munde_accident_insurance',
    nameMr: 'गोपीनाथ मुंडे शेतकरी अपघात सुरक्षा सानुग्रह अनुदान योजना',
    nameEn: 'Gopinath Munde Shetkari Apghat Suraksha Yojana',
    category: 'farmers_agri',
    categoryLabelMr: 'शेतकरी सुरक्षा',
    categoryLabelEn: 'Farmers Insurance',
    launchYear: '२०१५ (सुधारित २०२३)',
    nodalMinistryMr: 'कृषी विभाग, महाराष्ट्र शासन',
    nodalMinistryEn: 'Department of Agriculture',
    targetBeneficiariesMr: 'महाराष्ट्रातील सर्व खातेदार शेतकरी आणि त्यांच्या कुटुंबातील १ सदस्य (वय १० ते ७५ वर्षे)',
    financialBenefitMr: 'अपघाती मृत्यू किंवा कायमचे अपंगत्व आल्यास ₹२ लाख सानुग्रह अनुदान',
    eligibilityCriteriaMr: [
      'शेतजमीन धारक शेतकरी किंवा त्यांच्या कुटुंबातील सदस्य.',
      'रस्ते अपघात, विजेचा धक्का, सर्पदंश, विहिरीत बुडणे इत्यादी अपघातांचा समावेश.'
    ],
    keyExamPointsMr: [
      '२०२३ मध्ये विमा कंपनीची मध्यस्थता बंद करून थेट शासनाकडून "सानुग्रह अनुदान" पद्धती लागू केली गेली.',
      'अर्ज तहसीलदारांकडे ३० दिवसांच्या आत सादर करावा लागतो.'
    ],
    icon: '🛡️',
    badgeColor: 'border-blue-500/50 from-blue-500/20 to-indigo-500/10 text-blue-300',
    pyqsCount: 9,
    tagsMr: ['गोपीनाथ मुंडे योजना', '₹२ लाख', 'अपघात अनुदान', 'सर्पदंश/वीज']
  },

  // 3. YOUTH, SKILL & EMPLOYMENT
  {
    id: 'yuva_karyaprashikshan',
    nameMr: 'मुख्यमंत्री युवा कार्यप्रशिक्षण योजना (लाडका भाऊ)',
    nameEn: 'Mukhyamantri Yuva Karya Prashikshan Yojana',
    category: 'youth_employment',
    categoryLabelMr: 'युवक, शिक्षण व रोजगार',
    categoryLabelEn: 'Youth & Skill',
    launchYear: '२०२४ (जुलै २०२४)',
    nodalMinistryMr: 'कौशल्य विकास, रोजगार, उद्योजकता व नाविन्यता विभाग',
    nodalMinistryEn: 'Dept of Skill Development, Employment and Entrepreneurship',
    targetBeneficiariesMr: '१८ ते ३५ वयोगटातील १२ वी उत्तीर्ण, ITI/डिप्लोमा, पदवीधर व पदव्युत्तर तरुण',
    financialBenefitMr: '६ महिने ऑन-जॉब ट्रेनिंग दरम्यान दरमहा विद्यावेतन: १२ वी: ₹६,०००; ITI/डिप्लोमा: ₹८,०००; पदवीधर: ₹१०,०००',
    eligibilityCriteriaMr: [
      'वयोमर्यादा: १८ ते ३५ वर्षे.',
      'उमेदवार महाराष्ट्राचा रहिवासी असावा.',
      'कौशल्य विकास विभागाच्या संकेतस्थळावर नोंदणी आवश्यक.'
    ],
    keyExamPointsMr: [
      'खाजगी व शासकीय आस्थापनांमध्ये ६ महिने कार्यप्रशिक्षण (Internship) दिले जाते.',
      'विद्यावेतन थेट शासनाकडून DBT द्वारे विद्यार्थ्यांच्या बँक खात्यात जमा होते.',
      'दरवर्षी १० लाख तरुणांना प्रशिक्षण देण्याचे उद्दिष्ट.'
    ],
    officialPortal: 'rojgar.mahaswayam.gov.in',
    icon: '💼',
    badgeColor: 'border-indigo-500/50 from-indigo-500/20 to-violet-500/10 text-indigo-300',
    pyqsCount: 8,
    tagsMr: ['युवा कार्यप्रशिक्षण', 'लाडका भाऊ', 'विद्यावेतन', '₹१००००', 'कौशल्य विकास']
  },
  {
    id: 'sarthi_chhatrapati_shahu',
    nameMr: 'सारथी (SARTHI) - छत्रपती शाहू महाराज संशोधन संस्था',
    nameEn: 'SARTHI Research, Training and Human Development Institute',
    category: 'youth_employment',
    categoryLabelMr: 'उच्च शिक्षण व संशोधन',
    categoryLabelEn: 'Higher Education & Research',
    launchYear: '२०१८ (कंपनी कायदा २०१३ कलम ८ अंतर्गत)',
    nodalMinistryMr: 'नियोजन विभाग / इतर मागास बहुजन कल्याण विभाग, महाराष्ट्र शासन',
    nodalMinistryEn: 'Planning Department, Govt of Maharashtra',
    targetBeneficiariesMr: 'मराठा, कुणबी, मराठा-कुणबी व शेतकरी कुटुंबातील तरुण विद्यार्थी',
    financialBenefitMr: 'MPSC/UPSC स्पर्धा परीक्षा विद्यावेतन (₹१०,००० ते ₹१३,०००/महिना), PhD फेलोशिप (CSMNRF) व परदेशी शिक्षण शिष्यवृत्ती',
    eligibilityCriteriaMr: [
      'मराठा/कुणबी जातीचे प्रमाणपत्र असणे आवश्यक.',
      'कुटुंबाचे उत्पन्न ₹८ लाखांच्या आत (Non-Creamy Layer).',
      'प्रवेश परीक्षेतील गुणवत्तेवर निवड.'
    ],
    keyExamPointsMr: [
      'मुख्यालय: पुणे येथे स्थित आहे.',
      'संस्थेचे पूर्ण नाव: Chhatrapati Shahu Maharaj Research, Training and Human Development Institute.',
      'MPSC परीक्षेत संस्थांचे मुख्यालय आणि स्थापनेचा उद्देश यावर अनेकदा प्रश्न विचारले जातात.'
    ],
    icon: '🏛️',
    badgeColor: 'border-amber-500/50 from-amber-500/20 to-yellow-500/10 text-amber-300',
    pyqsCount: 15,
    tagsMr: ['सारथी', 'SARTHI', 'पुणे', 'मराठा कुणबी', 'CSMNRF', 'MPSC शिष्यवृत्ती']
  },
  {
    id: 'barti_ambedkar_institute',
    nameMr: 'बार्टी (BARTI) - डॉ. बाबासाहेब आंबेडकर संशोधन व प्रशिक्षण संस्था',
    nameEn: 'BARTI - Dr. Babasaheb Ambedkar Research & Training Institute',
    category: 'youth_employment',
    categoryLabelMr: 'संशोधन व स्पर्धा परीक्षा',
    categoryLabelEn: 'Research & Competitive Training',
    launchYear: '१९७८ (स्वायत्त संस्था म्हणून २००८)',
    nodalMinistryMr: 'सामाजिक न्याय व विशेष सहाय्य विभाग, महाराष्ट्र शासन',
    nodalMinistryEn: 'Dept of Social Justice & Special Assistance',
    targetBeneficiariesMr: 'अनुसूचित जाती (SC) प्रवर्गातील विद्यार्थी, संशोधक व स्पर्धा परीक्षा उमेदवार',
    financialBenefitMr: 'MPSC/UPSC मोफत अनिवासी प्रशिक्षण + दरमहा ₹९,००० ते ₹१३,००० विद्यावेतन, BANRF फेलोशिप (PhD)',
    eligibilityCriteriaMr: [
      'अनुसूचित जातीचे (SC) जात प्रमाणपत्र व जात वैधता प्रमाणपत्र आवश्यक.',
      'वार्षिक उत्पन्न मर्यादा शासनाच्या नियमांनुसार.'
    ],
    keyExamPointsMr: [
      'मुख्यालय: पुणे (क्वीन्स गार्डन).',
      'जाती प्रमाणपत्र पडताळणी प्रक्रियेचे संगणकीकरण (CCVIS) बार्टीने विकसित केले आहे.',
      'BANRF (Dr. Babasaheb Ambedkar National Research Fellowship) दरवर्षी संशोधकांना दिली जाते.'
    ],
    icon: '📘',
    badgeColor: 'border-blue-500/50 from-blue-500/20 to-cyan-500/10 text-blue-300',
    pyqsCount: 18,
    tagsMr: ['बार्टी', 'BARTI', 'पुणे', 'अनुसूचित जाती', 'BANRF', 'CCVIS']
  },
  {
    id: 'mahajyoti_obc',
    nameMr: 'महाज्योती (Mahajyoti) - महात्मा ज्योतिबा फुले संशोधन संस्था',
    nameEn: 'Mahatma Jyotiba Fule Research & Training Institute',
    category: 'youth_employment',
    categoryLabelMr: 'मागासवर्गीय विकास',
    categoryLabelEn: 'OBC/VJNT Welfare',
    launchYear: '२०२० (नागपूर मुख्यालय)',
    nodalMinistryMr: 'इतर मागास बहुजन कल्याण विभाग, महाराष्ट्र शासन',
    nodalMinistryEn: 'OBC Bahujan Kalyan Department',
    targetBeneficiariesMr: 'इतर मागास वर्ग (OBC), विमुक्त जाती व भटक्या जमाती (VJNT) आणि विशेष मागास प्रवर्ग (SBC)',
    financialBenefitMr: 'MPSC, UPSC, NEET, JEE परीक्षांचे मोफत कोचिंग, टॅबलेट वाटप व दरमहा विद्यावेतन',
    eligibilityCriteriaMr: [
      'OBC/VJNT/SBC प्रवर्गातील विद्यार्थी.',
      'नॉन-क्रिमीलेअर प्रमाणपत्र आवश्यक.'
    ],
    keyExamPointsMr: [
      'मुख्यालय: नागपूर येथे आहे (MPSC साठी अत्यंत महत्त्वाचा फॅक्ट!).',
      'महात्मा ज्योतिराव फुले यांच्या नावाने ही स्वायत्त संस्था स्थापन करण्यात आली आहे.'
    ],
    icon: '🌟',
    badgeColor: 'border-rose-500/50 from-rose-500/20 to-orange-500/10 text-rose-300',
    pyqsCount: 13,
    tagsMr: ['महाज्योती', 'नागपूर', 'OBC', 'VJNT', 'SBC', 'टॅबलेट योजना']
  },
  {
    id: 'amrut_open_category',
    nameMr: 'अमृत (AMRUT) - महाराष्ट्र संशोधन, उन्नती व प्रशिक्षण प्रबोधिनी',
    nameEn: 'AMRUT Institute for Open Category Economically Weaker Section',
    category: 'youth_employment',
    categoryLabelMr: 'खुला प्रवर्ग विकास',
    categoryLabelEn: 'Open Category / EWS',
    launchYear: '२०२२',
    nodalMinistryMr: 'नियोजन विभाग, महाराष्ट्र शासन',
    nodalMinistryEn: 'Planning Department',
    targetBeneficiariesMr: 'खुल्या प्रवर्गातील आर्थिकदृष्ट्या दुर्बल घटकातील (EWS) तरुण व तरुणी',
    financialBenefitMr: 'स्पर्धा परीक्षा मार्गदर्शन, परदेशी शिक्षण कर्ज व्याज परतावा व स्वयंरोजगार कौशल्य प्रशिक्षण',
    eligibilityCriteriaMr: [
      'खुल्या प्रवर्गातील रहिवासी, जे इतर कोणत्याही महामंडळाच्या लाभाखाली येत नाहीत.',
      'EWS प्रमाणपत्र किंवा ₹८ लाखांच्या आतील कौटुंबिक उत्पन्न.'
    ],
    keyExamPointsMr: [
      'मुख्यालय: पुणे येथे आहे.',
      'खुला प्रवर्ग (Open Category) कल्याणकारी उपक्रमांसाठी स्वतंत्रपणे स्थापन झालेली पहिली संस्था.'
    ],
    icon: '✨',
    badgeColor: 'border-emerald-500/50 from-emerald-500/20 to-teal-500/10 text-emerald-300',
    pyqsCount: 6,
    tagsMr: ['अमृत', 'AMRUT', 'खुला प्रवर्ग', 'EWS', 'पुणे']
  },

  // 4. SOCIAL JUSTICE & HOUSING
  {
    id: 'swadhar_yojana',
    nameMr: 'डॉ. बाबासाहेब आंबेडकर स्वाधार योजना',
    nameEn: 'Dr. Babasaheb Ambedkar Swadhar Yojana',
    category: 'social_justice',
    categoryLabelMr: 'सामाजिक न्याय व वसतिगृह भत्ता',
    categoryLabelEn: 'Hostel Allowance & Education',
    launchYear: '२०१६-१७',
    nodalMinistryMr: 'सामाजिक न्याय व विशेष सहाय्य विभाग',
    nodalMinistryEn: 'Social Justice Dept',
    targetBeneficiariesMr: 'शासकीय वसतिगृहात (Hostel) प्रवेश न मिळालेले अनुसूचित जाती व नवबौद्ध विद्यार्थी',
    financialBenefitMr: 'मुंबई-पुण्यासारख्या ' + 'अ' + ' वर्ग शहरांसाठी दरवर्षी ₹६०,०००; इतर विभागीय शहरे ₹५१,०००; जिल्हा स्तर ₹४३,००० (भोजन, निवास व विद्यावेतन)',
    eligibilityCriteriaMr: [
      '१० वी, १२ वी नंतर पदविका, पदवी किंवा व्यावसायिक उच्च शिक्षण घेणारे विद्यार्थी.',
      'कुटुंबाचे वार्षिक उत्पन्न ₹२.५ लाखांपेक्षा जास्त नसावे.',
      'मागील वर्षात किमान ५०% गुण आवश्यक (दिव्यांग विद्यार्थ्यांसाठी ४०%).'
    ],
    keyExamPointsMr: [
      'शासकीय वसतिगृहातील जागेअभावी वंचित राहिलेल्या विद्यार्थ्यांना थेट बँक खात्यात आर्थिक मदत.',
      'MPSC परीक्षेत या योजनेतील शहरी वर्गवारीनुसार मिळणाऱ्या रकमेवर प्रश्न विचारला गेला आहे.'
    ],
    icon: '🏠',
    badgeColor: 'border-blue-500/50 from-blue-500/20 to-sky-500/10 text-blue-300',
    pyqsCount: 10,
    tagsMr: ['स्वाधार योजना', 'वसतिगृह भत्ता', '₹६००००', 'अनुसूचित जाती', 'DBT']
  },
  {
    id: 'ramai_awas_yojana',
    nameMr: 'रमाई आवास योजना (घरकुल योजना)',
    nameEn: 'Ramai Awas Yojana',
    category: 'social_justice',
    categoryLabelMr: 'ग्रामीण व नागरी घरकुल',
    categoryLabelEn: 'Housing Welfare',
    launchYear: '२००८-०९ (सुधारित अनुदान २०२४)',
    nodalMinistryMr: 'सामाजिक न्याय व विशेष सहाय्य विभाग / ग्रामविकास विभाग',
    nodalMinistryEn: 'Social Justice & Rural Development Dept',
    targetBeneficiariesMr: 'अनुसूचित जाती व नवबौद्ध प्रवर्गातील बेघर व कच्च्या घरात राहणारे कुटुंब',
    financialBenefitMr: 'ग्रामीण भागात घर बांधकामासाठी ₹१.३० लाख ते ₹२.५० लाखांपर्यंत अनुदान (मनरेगा मजुरीसह)',
    eligibilityCriteriaMr: [
      'स्वतःची जागा किंवा शासनाने दिलेला पट्टा असावा.',
      'कुटुंबाचे स्वतःचे पक्के घर नसावे.',
      'वार्षिक उत्पन्न ग्रामीण भागासाठी ₹१ लाख व शहरी भागासाठी ₹३ लाखांच्या आत.'
    ],
    keyExamPointsMr: [
      'क्रांतीज्योती सावित्रीबाई फुले व माता रमाई आंबेडकर यांच्या स्मृतिप्रीत्यर्थ नाव दिले आहे.',
      'घरकुलाची मालकी महिलेच्या नावावर किंवा संयुक्त नावावर करणे अनिवार्य असते.'
    ],
    icon: '🏡',
    badgeColor: 'border-amber-500/50 from-amber-500/20 to-orange-500/10 text-amber-300',
    pyqsCount: 7,
    tagsMr: ['रमाई आवास', 'घरकुल', 'अनुसूचित जाती', 'ग्रामीण विकास', 'महिला मालकी']
  },
  {
    id: 'shabari_gharkul_yojana',
    nameMr: 'शबरी आदिवासी घरकुल योजना',
    nameEn: 'Shabari Adivasi Gharkul Yojana',
    category: 'social_justice',
    categoryLabelMr: 'आदिवासी गृहनिर्माण',
    categoryLabelEn: 'Tribal Housing',
    launchYear: '२०१३',
    nodalMinistryMr: 'आदिवासी विकास विभाग, महाराष्ट्र शासन',
    nodalMinistryEn: 'Tribal Development Department',
    targetBeneficiariesMr: 'महाराष्ट्रातील अनुसूचित जमाती (ST) प्रवर्गातील बेघर कुटुंबे',
    financialBenefitMr: 'घर बांधकामासाठी ग्रामीण भागात ₹१.३२ लाख तर डोंगराळ भागात ₹१.४२ लाख + मनरेगा मजुरी',
    eligibilityCriteriaMr: [
      'अनुसूचित जमातीचा (ST) दाखला असणे अनिवार्य.',
      'किमान १५ वर्षे महाराष्ट्रात वास्तव्य असणे आवश्यक.'
    ],
    keyExamPointsMr: [
      'दुर्गम व नक्षलग्रस्त भागातील आदिवासी कुटुंबांना प्राधान्य.',
      'शबरी योजनेच्या अंमलबजावणीसाठी शबरी आदिवासी वित्त व विकास महामंडळ कार्यरत आहे.'
    ],
    icon: '🏕️',
    badgeColor: 'border-green-500/50 from-green-500/20 to-teal-500/10 text-green-300',
    pyqsCount: 6,
    tagsMr: ['शबरी घरकुल', 'आदिवासी विकास', 'ST प्रवर्ग', 'डोंगराळ भाग']
  },
  {
    id: 'sanjay_gandhi_niradhar',
    nameMr: 'संजय गांधी निराधार अनुदान योजना व श्रावणबाळ योजना',
    nameEn: 'Sanjay Gandhi Niradhar & Shravanbal Yojana',
    category: 'social_justice',
    categoryLabelMr: 'सामाजिक सुरक्षा व निवृत्तीवेतन',
    categoryLabelEn: 'Social Security Pension',
    launchYear: '१९८० (सुधारित २०२३)',
    nodalMinistryMr: 'सामाजिक न्याय व विशेष सहाय्य विभाग, महाराष्ट्र शासन',
    nodalMinistryEn: 'Social Justice Dept',
    targetBeneficiariesMr: 'निराधार व्यक्ती, अनाथ मुले, दिव्यांग, तृतीयपंथी, कर्करोग/टीबी रुग्ण व ६५ वर्षांवरील वृद्ध',
    financialBenefitMr: 'दरमहा ₹१,५०० निवृत्तीवेतन (पूर्वी ₹१,००० होते, २०२३ च्या अर्थसंकल्पात वाढवून ₹१,५०० केले)',
    eligibilityCriteriaMr: [
      'कुटुंबाचे वार्षिक उत्पन्न ₹२१,००० (ग्रामीण) किंवा ₹५०,००० च्या आत.',
      'श्रावणबाळ योजनेसाठी वय ६५ वर्षे किंवा अधिक असणे आवश्यक.'
    ],
    keyExamPointsMr: [
      'महाराष्ट्र शासनाची सर्वात जुनी आणि व्यापक सामाजिक सुरक्षा पेन्शन योजना.',
      'अनुदान थेट बँक खात्यात डीबीटीद्वारे जमा होते.'
    ],
    icon: '🤝',
    badgeColor: 'border-pink-500/50 from-pink-500/20 to-rose-500/10 text-pink-300',
    pyqsCount: 9,
    tagsMr: ['संजय गांधी निराधार', 'श्रावणबाळ', '₹१५०० पेन्शन', 'दिव्यांग', 'वृद्ध']
  },

  // 5. HEALTH & WELFARE
  {
    id: 'mjpjay_phule_arogya',
    nameMr: 'महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY)',
    nameEn: 'Mahatma Jyotirao Phule Jan Arogya Yojana',
    category: 'health_welfare',
    categoryLabelMr: 'आरोग्य व मोफत वैद्यकीय उपचार',
    categoryLabelEn: 'Health & Medical Coverage',
    launchYear: '२०१२ (राजीव गांधी योजना म्हणून, २०१७ मध्ये नामकरण, २०२३ मध्ये ₹५ लाखांपर्यंत मर्यादा)',
    nodalMinistryMr: 'सार्वजनिक आरोग्य विभाग, महाराष्ट्र शासन',
    nodalMinistryEn: 'Public Health Department, Govt of Maharashtra',
    targetBeneficiariesMr: 'महाराष्ट्रातील सर्व रेशनकार्डधारक कुटुंबे (१००% सार्वत्रिक आरोग्य संरक्षण)',
    financialBenefitMr: 'दरवर्षी प्रति कुटुंब ₹५ लाखांपर्यंत पूर्णपणे कॅशलेस (Cashless) मोफत वैद्यकीय उपचार',
    eligibilityCriteriaMr: [
      'पूर्वी केवळ पिवळे व केशरी रेशनकार्ड होते, आता पांढरे रेशनकार्डधारकही पात्र (सर्व नागरिकांना लागू).',
      '१,३५६ हून अधिक गंभीर आजार व शस्त्रक्रिया मोफत समाविष्ट.'
    ],
    keyExamPointsMr: [
      'जुलाई २०२३ पासून ही योजना संपूर्ण महाराष्ट्रात "सार्वत्रिक" (Universal) करण्यात आली.',
      'कव्हर मर्यादा ₹१.५ लाखांवरून वाढवून थेट ₹५,००,००० प्रति कुटुंब करण्यात आली.',
      'आयुष्मान भारत (PM-JAY) सोबत ही योजना एकत्रित राबवली जाते (Co-branded कार्ड).'
    ],
    officialPortal: 'jeevandayee.gov.in',
    icon: '🏥',
    badgeColor: 'border-red-500/50 from-red-500/20 to-rose-500/10 text-red-300',
    pyqsCount: 19,
    tagsMr: ['MJPJAY', '₹५ लाख कव्हर', 'कॅशलेस आरोग्य', 'महात्मा फुले जन आरोग्य', 'सार्वत्रिक']
  },
  {
    id: 'vayoshri_yojana',
    nameMr: 'मुख्यमंत्री वयोश्री योजना',
    nameEn: 'Mukhyamantri Vayoshri Yojana',
    category: 'health_welfare',
    categoryLabelMr: 'ज्येष्ठ नागरिक कल्याण',
    categoryLabelEn: 'Senior Citizen Welfare',
    launchYear: '२०२४ (फेब्रुवारी २०२४)',
    nodalMinistryMr: 'सामाजिक न्याय व विशेष सहाय्य विभाग',
    nodalMinistryEn: 'Social Justice Department',
    targetBeneficiariesMr: '६५ वर्षे व त्यावरील वयाचे ज्येष्ठ नागरिक ज्यांना शारीरिक असमर्थता किंवा दुर्बलता आहे',
    financialBenefitMr: 'ज्येष्ठांना चष्मा, श्रवणयंत्र, व्हीलचेअर, वॉकर, ट्रायपॉड या उपकरणांच्या खरेदीसाठी ₹३,००० थेट बँक खात्यात',
    eligibilityCriteriaMr: [
      'वय ६५ वर्षे पूर्ण असणे आवश्यक.',
      'कुटुंबाचे वार्षिक उत्पन्न ₹२ लाखांपेक्षा जास्त नसावे.',
      'आधार कार्ड व जिल्हा शल्यचिकित्सकांचे (Civil Surgeon) वैद्यकीय प्रमाणपत्र आवश्यक.'
    ],
    keyExamPointsMr: [
      'महाराष्ट्रातील सुमारे १५ लाख ज्येष्ठ नागरिकांना लाभ देण्याचे नियोजन.',
      'केंद्राच्या "राष्ट्रीय वयोश्री योजने"च्या धर्तीवर महाराष्ट्र शासनाची स्वतंत्र योजना.'
    ],
    icon: '🧓',
    badgeColor: 'border-amber-500/50 from-amber-500/20 to-yellow-500/10 text-amber-300',
    pyqsCount: 6,
    tagsMr: ['वयोश्री योजना', '६५ वर्षे', '₹३०००', 'श्रवणयंत्र/चष्मा', 'ज्येष्ठ नागरिक']
  },

  // 6. ENERGY, INFRASTRUCTURE & ENVIRONMENT
  {
    id: 'pm_surya_ghar',
    nameMr: 'पीएम सूर्यघर: मोफत वीज योजना (महाराष्ट्र स्पेशल)',
    nameEn: 'PM Surya Ghar: Muft Bijli Yojana',
    category: 'energy_infra',
    categoryLabelMr: 'सौर ऊर्जा व वीज बचत',
    categoryLabelEn: 'Rooftop Solar & Green Energy',
    launchYear: '२०२४ (१३ फेब्रुवारी २०२४)',
    nodalMinistryMr: 'नवीन व नवीकरणीय ऊर्जा मंत्रालय / महावितरण व महाऊर्जा (MEDA)',
    nodalMinistryEn: 'Ministry of New & Renewable Energy / MSEDCL & MEDA',
    targetBeneficiariesMr: 'घराच्या छतावर (Rooftop) सोलर पॅनेल बसवणारे निवासी ग्राहक',
    financialBenefitMr: 'दरमहा ३०० युनिटपर्यंत मोफत वीज + केंद्र सरकारचे ₹३०,००० ते ₹७८,००० पर्यंत थेट सबसिडी अनुदान',
    eligibilityCriteriaMr: [
      'स्वतःच्या मालकीचे घर व योग्य छत उपलब्ध असणे आवश्यक.',
      '१ किलोवॅटसाठी ₹३०,०००; २ किलोवॅटसाठी ₹६०,००० आणि ३ किलोवॅट वा अधिकसाठी ₹७८,००० अनुदान.'
    ],
    keyExamPointsMr: [
      'देशभरात १ कोटी घरांवर सोलर बसवण्याचे लक्ष्य (अर्थसंकल्प २०२४-२५ मधील प्रमुख घोषणा).',
      'महाराष्ट्रात महावितरण व महाऊर्जाच्या माध्यमातून सुलभ नेट-मीटरिंग सुविधा दिली जात आहे.',
      'अतिरिक्त निर्माण झालेली वीज ग्रीडला विकून उत्पन्नाची संधी (Net Metering Earning).'
    ],
    icon: '⚡',
    badgeColor: 'border-yellow-500/50 from-yellow-500/20 to-emerald-500/10 text-yellow-300',
    pyqsCount: 10,
    tagsMr: ['पीएम सूर्यघर', '३०० युनिट मोफत', '₹७८००० सबसिडी', 'सौर ऊर्जा', 'महाऊर्जा']
  },
  {
    id: 'samruddhi_mahagarg',
    nameMr: 'हिंदुहृदयसम्राट बाळासाहेब ठाकरे महाराष्ट्र समृद्धी महामार्ग',
    nameEn: 'Hindu Hrudaysamrat Balasaheb Thackeray Samruddhi Mahamarg',
    category: 'energy_infra',
    categoryLabelMr: 'पायाभूत सुविधा व महामार्ग',
    categoryLabelEn: 'Mega Infrastructure & Expressway',
    launchYear: '२०२२ (पहिला टप्पा) / २०२४ (संपूर्ण ७०१ किमी)',
    nodalMinistryMr: 'सार्वजनिक बांधकाम विभाग / MSRDC',
    nodalMinistryEn: 'Public Works Dept / MSRDC',
    targetBeneficiariesMr: 'नागपूर ते मुंबई दरम्यानचे १० जिल्ंहे आणि २४ तालुक्यांमधील प्रवासी व कृषी उद्योग',
    financialBenefitMr: 'नागपूर-मुंबई प्रवास अवघ्या ८ तासांवर; २० कृषी समृद्धी केंद्रांमधून (Agro-Townships) लाखो रोजगार',
    eligibilityCriteriaMr: [
      '१० जिल्हे: नागपूर, वर्धा, अमरावती, वाशिम, बुलढाणा, जालना, छत्रपती संभाजीनगर, अहमदनगर, नाशिक, ठाणे.',
      'एकूण लांबी: ७०१ किलोमीटर (६ पदरी द्रुतगती महामार्ग).'
    ],
    keyExamPointsMr: [
      'अंमलबजावणी संस्था: महाराष्ट्र राज्य रस्ते विकास महामंडळ (MSRDC).',
      'मार्ग: शिवणी (नागपूर) ते आमणे (ठाणे).',
      'MPSC परीक्षेत या महामार्गावरील जिल्हे, वन्यजीव मार्ग (Animal Underpass) व लांबी यावर वारंवार प्रश्न विचारले गेले आहेत.'
    ],
    icon: '🛣️',
    badgeColor: 'border-cyan-500/50 from-cyan-500/20 to-blue-500/10 text-cyan-300',
    pyqsCount: 17,
    tagsMr: ['समृद्धी महामार्ग', '७०१ किमी', 'MSRDC', '१० जिल्हे', 'नागपूर-मुंबई']
  },
  {
    id: 'atal_setu_mthl',
    nameMr: 'अटल बिहारी वाजपेयी शिवडी-न्हावा शेवा अटल सेतू (MTHL)',
    nameEn: 'Atal Bihari Vajpayee Sewri-Nhava Sheva Atal Setu (MTHL)',
    category: 'energy_infra',
    categoryLabelMr: 'सागरी महामार्ग प्रकल्प',
    categoryLabelEn: 'Sea Bridge Mega Project',
    launchYear: '२०२४ (१२ जानेवारी २०२४ रोजी उद्घाटन)',
    nodalMinistryMr: 'एमएमआरडीए (MMRDA), महाराष्ट्र शासन',
    nodalMinistryEn: 'MMRDA, Govt of Maharashtra',
    targetBeneficiariesMr: 'मुंबई आणि नवी मुंबई, रायगड, पुणे दरम्यान प्रवास करणारे नागरिक व मालवाहतूक',
    financialBenefitMr: 'शिवडी ते न्हावा शेवा प्रवास २ तासांवरून केवळ १५-२० मिनिटांवर; इंधन व वेळेची प्रचंड बचत',
    eligibilityCriteriaMr: [
      'भारतातील सर्वात लांब सागरी पूल (Longest Sea Bridge in India).',
      'एकूण लांबी: २१.८ किलोमीटर (१६.५ किमी समुद्रात आणि ५.५ किमी जमिनीवर).'
    ],
    keyExamPointsMr: [
      'जपान इंटरनॅशनल को-ऑपरेशन एजन्सी (JICA) चे कर्ज सहाय्य लाभले आहे.',
      'ओपन रोड टोलिंग (ORT) प्रणाली वापरणारा भारतातील पहिला पूल.',
      'MPSC Combine व राजपत्रित नागरी सेवा परीक्षेत लांबी आणि साहाय्यक देशावर थेट प्रश्न आला आहे.'
    ],
    icon: '🌉',
    badgeColor: 'border-blue-500/50 from-blue-500/20 to-teal-500/10 text-blue-300',
    pyqsCount: 12,
    tagsMr: ['अटल सेतू', '२१.८ किमी', 'MTHL', 'JICA', 'शिवडी-न्हावा शेवा']
  }
];

// ============================================================================
// MAHARASHTRA ECONOMIC SURVEY 2024-2026 KEY INDICATORS (MPSC HIGH YIELD)
// ============================================================================

export const MAHARASHTRA_ECONOMIC_INDICATORS: EconomicSurveyMetric[] = [
  {
    id: 'gsdp_growth',
    titleMr: 'राज्याचा स्थूल उत्पन्न वाढीचा दर (GSDP Growth Rate)',
    titleEn: 'Gross State Domestic Product (GSDP) Growth',
    valueMr: '७.६ % (अंदाजित २०२४-२५)',
    valueEn: '7.6% (Projected)',
    previousValueMr: '६.८ % (२०२३-२४)',
    trend: 'up',
    examNoteMr: 'महाराष्ट्राचा विकास दर देशाच्या सरासरी विकास दराशी स्पर्धा करणारा असून भारतीय अर्थव्यवस्थेत महाराष्ट्राचा वाटा सर्वाधिक (~१४%) आहे.',
    sectorMr: 'GSDP'
  },
  {
    id: 'per_capita_income',
    titleMr: 'दरडोई उत्पन्न (Per Capita Income)',
    titleEn: 'Per Capita Income of Maharashtra',
    valueMr: '₹२,५२,३८९ / वर्ष',
    valueEn: '₹2,52,389 / year',
    previousValueMr: '₹२,२५,०७३',
    trend: 'up',
    examNoteMr: 'देशाच्या राष्ट्रीय दरडोई उत्पन्नापेक्षा महाराष्ट्राचे दरडोई उत्पन्न लक्षणीयरीत्या जास्त आहे (तेलंगणा, कर्नाटक यांच्या बरोबरीने आघाडीवर).',
    sectorMr: 'GSDP'
  },
  {
    id: 'fdi_rank',
    titleMr: 'थेट परकीय गुंतवणूक (FDI) मध्ये महाराष्ट्राचा क्रमांक',
    titleEn: 'Foreign Direct Investment (FDI) Share',
    valueMr: 'क्रमांक १ (देशातील एकूण FDI चा सुमारे ३०-३१% वाटा)',
    valueEn: 'Rank 1 (~31% share of India)',
    previousValueMr: 'क्रमांक १',
    trend: 'up',
    examNoteMr: 'DPIIT च्या आकडेवारीनुसार सलग अनेक वर्षांपासून भारतात येणाऱ्या एकूण थेट परकीय गुंतवणुकीत महाराष्ट्र पहिल्या स्थानावर कायम आहे.',
    sectorMr: 'Industry'
  },
  {
    id: 'sectoral_share',
    titleMr: 'क्षेत्रनिहाय स्थूल उत्पन्नातील वाटा (Sectoral Share)',
    titleEn: 'Sectoral Share in GSVA',
    valueMr: 'सेवा: ६१.१% | उद्योग: २६.९% | कृषी व संलग्न: १२.०%',
    valueEn: 'Services: 61.1% | Industry: 26.9% | Agri: 12.0%',
    previousValueMr: 'कृषी: १२.४%, उद्योग: २७.१%, सेवा: ६०.५%',
    trend: 'stable',
    examNoteMr: 'MPSC परीक्षेत हा हमखास येणारा प्रश्न आहे: सेवा क्षेत्र प्रथम क्रमांकावर (६०%+), त्यानंतर उद्योग (२७%) आणि शेवटी कृषी (१२%).',
    sectorMr: 'GSDP'
  },
  {
    id: 'forest_cover',
    titleMr: 'वनक्षेत्राचे प्रमाण (Forest Cover in Maharashtra)',
    titleEn: 'Total Forest Cover Percentage',
    valueMr: '२१.१ % (भौगोलिक क्षेत्राच्या तुलनेत)',
    valueEn: '21.1% of Geographical Area',
    previousValueMr: '२०.८ %',
    trend: 'up',
    examNoteMr: 'राष्ट्रीय वन धोरण १९८८ नुसार उद्दिष्ट ३३% आहे. सर्वाधिक वनक्षेत्र गडचिरोली जिल्ह्यात (सुमारे ६८%), तर सर्वात कमी लातूर (०.१८%).',
    sectorMr: 'Social'
  },
  {
    id: 'renewable_energy',
    titleMr: 'नवीकरणीय ऊर्जा निर्मिती क्षमता (Renewable Energy)',
    titleEn: 'Renewable Energy Capacity',
    valueMr: '१२,५००+ मेगावॅट (सौर, पवन व बायोमास)',
    valueEn: '12,500+ MW Installed',
    previousValueMr: '१०,८०० मेगावॅट',
    trend: 'up',
    examNoteMr: 'महाराष्ट्र शासनाने २०२७ पर्यंत एकूण वीज निर्मितीत २५% वाटा अपारंपरिक ऊर्जेचा ठेवण्याचे उद्दिष्ट ठेवले आहे.',
    sectorMr: 'Infrastructure'
  }
];

// ============================================================================
// SCHEMES & ECONOMIC SURVEY MPSC PYQ QUESTIONS (AUTHENTIC 4-STATEMENT FORMAT)
// ============================================================================

export const SCHEMES_PYQ_QUESTIONS: SchemePyqQuestion[] = [
  {
    id: 'sq1',
    questionMr: 'महाराष्ट्र शासनाच्या "मुख्यमंत्री माझी लाडकी बहीण योजना २०२४" बाबत खालील विधाने विचारात घ्या:\nअ. या योजनेसाठी २१ ते ६५ वयोगटातील महिला पात्र आहेत.\nब. कुटुंबाचे वार्षिक उत्पन्न २.५ लाख रुपयांपेक्षा कमी असावे.\nक. या योजनेअंतर्गत दरमहा ₹२,००० थेट बँक खात्यात दिले जातात.\n\nवरीलपैकी कोणते/ती विधाने बरोबर आहेत?',
    optionsMr: [
      'फक्त अ आणि ब',
      'फक्त ब आणि क',
      'फक्त अ आणि क',
      'अ, ब आणि क सर्व'
    ],
    correctOptionIndex: 0,
    examYearTagMr: 'MPSC Group B/C Combine Exam Special 2024-25',
    relatedSchemeId: 'ladki_bahin',
    explanationMr: 'विधान (क) चूक आहे, कारण लाडकी बहीण योजनेअंतर्गत दरमहा ₹१,५०० (दीड हजार रुपये) दिले जातात, ₹२,००० नव्हे. विधान (अ) व (ब) पूर्णपणे बरोबर आहेत (वय २१ ते ६५ वर्षे, वार्षिक उत्पन्न मर्यादा ₹२.५० लाख).',
    difficulty: 'medium'
  },
  {
    id: 'sq2',
    questionMr: 'महाराष्ट्र शासनाच्या "लेक लाडकी योजना" बाबत योग्य पर्याय निवडा:\n१ एप्रिल २०२३ नंतर जन्मलेल्या मुलीला वयाची १८ वर्षे पूर्ण होईपर्यंत विविध टप्प्यांवर एकूण किती रुपयांचे आर्थिक सहाय्य मिळते?',
    optionsMr: [
      '₹७५,०००',
      '₹१,०१,००० (एक लाख एक हजार)',
      '₹१,२५,०००',
      '₹५०,०००'
    ],
    correctOptionIndex: 1,
    examYearTagMr: 'MPSC Combine Pre 2024 Pattern',
    relatedSchemeId: 'lek_ladki',
    explanationMr: 'लेक लाडकी योजनेअंतर्गत मुलीच्या जन्मानंतर ₹५,०००, १ ली मध्ये ₹६,०००, ६ वी मध्ये ₹७,०००, ११ वी मध्ये ₹८,००० आणि वयाची १८ वर्षे पूर्ण झाल्यावर ₹७५,००० असे मिळून एकूण ₹१,०१,००० ची रक्कम दिली जाते.',
    difficulty: 'easy'
  },
  {
    id: 'sq3',
    questionMr: 'नानाजी देशमुख कृषी संजीवनी प्रकल्प (PoCRA) खालीलपैकी कोणत्या आंतरराष्ट्रीय संस्थेच्या आर्थिक साहाय्याने महाराष्ट्रात राबवला जात आहे?',
    optionsMr: [
      'आशियाई विकास बँक (ADB)',
      'जागतिक बँक (World Bank)',
      'आंतरराष्ट्रीय नाणेनिधी (IMF)',
      'संयुक्त राष्ट्रे विकास कार्यक्रम (UNDP)'
    ],
    correctOptionIndex: 1,
    examYearTagMr: 'MPSC Rajyaseva Pre & Combine 2023',
    relatedSchemeId: 'pocra_nanaji_deshmukh',
    explanationMr: 'नानाजी देशमुख कृषी संजीवनी प्रकल्प (PoCRA) हा जागतिक बँकेच्या (World Bank) अर्थसहाय्याने मराठवाडा, विदर्भ व उत्तर महाराष्ट्रातील हवामान बदलग्रस्त जिल्ह्यांमध्ये राबवला जात आहे.',
    difficulty: 'easy'
  },
  {
    id: 'sq4',
    questionMr: 'महाराष्ट्र आर्थिक पाहणी अहवालानुसार, राज्याच्या स्थूल उत्पन्नात (GSVA) कोणत्या क्षेत्राचा वाटा सर्वाधिक आहे?',
    optionsMr: [
      'कृषी व संलग्न क्षेत्र (Agriculture)',
      'उद्योग क्षेत्र (Industry)',
      'सेवा क्षेत्र (Services)',
      'उत्पादन क्षेत्र (Manufacturing)'
    ],
    correctOptionIndex: 2,
    examYearTagMr: 'MPSC State Services Prelims',
    relatedSchemeId: 'sectoral_share',
    explanationMr: 'महाराष्ट्राच्या अर्थव्यवस्थेत सेवा क्षेत्राचा (Services Sector) वाटा सर्वाधिक म्हणजे सुमारे ६१% आहे. उद्योग क्षेत्राचा वाटा सुमारे २७% तर कृषी क्षेत्राचा वाटा सुमारे १२% आहे.',
    difficulty: 'easy'
  },
  {
    id: 'sq5',
    questionMr: 'महाराष्ट्र शासनाने "महात्मा ज्योतिराव फुले जन आरोग्य योजने" (MJPJAY) अंतर्गत मोफत आरोग्य उपचारांची मर्यादा दरवर्षी प्रति कुटुंब किती रुपयांपर्यंत वाढवली आहे?',
    optionsMr: [
      '₹१.५० लाख',
      '₹२.५० लाख',
      '₹५.०० लाख (पाच लाख रुपये)',
      '₹१०.०० लाख'
    ],
    correctOptionIndex: 2,
    examYearTagMr: 'MPSC Combine Pre 2023-24',
    relatedSchemeId: 'mjpjay_phule_arogya',
    explanationMr: 'महाराष्ट्र शासनाने जुलै २०२३ मध्ये घेतलेल्या निर्णयानुसार, महात्मा फुले जन आरोग्य योजनेची उपचारांची मर्यादा ₹१.५ लाखांवरून वाढवून ₹५ लाख प्रति कुटुंब प्रति वर्ष करण्यात आली आहे आणि ही योजना राज्यातील सर्व नागरिकांना खुली करण्यात आली आहे.',
    difficulty: 'easy'
  },
  {
    id: 'sq6',
    questionMr: 'भारतातील सर्वात लांब सागरी पूल ठरलेल्या "अटल सेतू" (MTHL - Sewri-Nhava Sheva) ची एकूण लांबी किती किलोमीटर आहे?',
    optionsMr: [
      '१८.५ किमी',
      '२१.८ किमी',
      '२५.४ किमी',
      '१६.५ किमी'
    ],
    correctOptionIndex: 1,
    examYearTagMr: 'MPSC Combined Prelims 2024',
    relatedSchemeId: 'atal_setu_mthl',
    explanationMr: 'अटल सेतू (MTHL) ची एकूण लांबी २१.८ किमी आहे, ज्यापैकी सुमारे १६.५ किमी भाग समुद्रावरून आणि ५.५ किमी भाग जमिनीवरून जातो. या पुलाचे उद्घाटन १२ जानेवारी २०२४ रोजी झाले.',
    difficulty: 'medium'
  },
  {
    id: 'sq7',
    questionMr: '"नमो शेतकरी महासन्मान निधी योजना" अंतर्गत महाराष्ट्र शासनाकडून पात्र शेतकऱ्यांना दरवर्षी किती रुपयांचे अतिरिक्त सहाय्य दिले जाते?',
    optionsMr: [
      '₹३,०००',
      '₹४,०००',
      '₹६,००० (सहा हजार रुपये)',
      '₹१०,०००'
    ],
    correctOptionIndex: 2,
    examYearTagMr: 'MPSC Agriculture & GS-4 Special',
    relatedSchemeId: 'namo_shetkari',
    explanationMr: 'केंद्राच्या PM-KISAN योजनेच्या ₹६,००० च्या जोडीला महाराष्ट्र शासनाने दरवर्षी स्वतःच्या तिजोरीतून ₹६,००० अतिरिक्त देण्याची घोषणा केली. यामुळे महाराष्ट्रातील शेतकऱ्यांना एकूण ₹१२,००० वार्षिक मिळतात.',
    difficulty: 'easy'
  },
  {
    id: 'sq8',
    questionMr: 'महाराष्ट्र शासनाची स्वायत्त संस्था "महाज्योती" (Mahajyoti) चे मुख्यालय खालीलपैकी कोणत्या शहरात आहे?',
    optionsMr: [
      'पुणे',
      'मुंबई',
      'नागपूर',
      'छत्रपती संभाजीनगर'
    ],
    correctOptionIndex: 2,
    examYearTagMr: 'MPSC Group C Mains 2023',
    relatedSchemeId: 'mahajyoti_obc',
    explanationMr: 'बार्टी (BARTI) आणि सारथी (SARTHI) चे मुख्यालय पुणे येथे आहे, तर महात्मा ज्योतिबा फुले संशोधन व प्रशिक्षण संस्था (महाज्योती) चे मुख्यालय नागपूर येथे आहे. MPSC मध्ये हा वारंवार विचारला गेलेला फॅक्ट आहे.',
    difficulty: 'medium'
  }
];

// ============================================================================
// CURATED AFFILIATE BOOKS & MONETIZATION STUDY GUIDES FOR SCHEMES & ECONOMY
// ============================================================================

export const SCHEMES_AFFILIATE_BOOKS = [
  {
    id: 'desale_economy_1',
    titleMr: 'भारतीय अर्थव्यवस्था (भाग १) - समग्रलक्षी अर्थशास्त्र',
    authorMr: 'किरण देसले (दीपस्तंभ प्रकाशन)',
    priceInr: 540,
    discountPriceInr: 430,
    affiliateUrl: 'https://www.amazon.in/dp/9389278385?tag=mpscaffiliate-21',
    badge: 'MPSC Top Choice ⭐⭐⭐⭐⭐',
    descriptionMr: 'MPSC पूर्व व मुख्य परीक्षेसाठी राष्ट्रीय उत्पन्न, बँक प्रणाली, दारिद्र्य, बेरोजगारी व शासकीय योजनांचे सखोल विश्लेषण.'
  },
  {
    id: 'kolambe_economy',
    titleMr: 'भारतीय अर्थव्यवस्था',
    authorMr: 'रंजन कोळंबे (भागीरथ प्रकाशन)',
    priceInr: 480,
    discountPriceInr: 395,
    affiliateUrl: 'https://www.amazon.in/dp/9385556283?tag=mpscaffiliate-21',
    badge: 'सर्वोच्च खपाचे पुस्तक 📘',
    descriptionMr: 'अर्थशास्त्राच्या मूलभूत संकल्पना व पंचवार्षिक योजना समजून घेण्यासाठी सर्वोत्कृष्ट मार्गदर्शक ग्रंथ.'
  },
  {
    id: 'economic_survey_notes',
    titleMr: 'महाराष्ट्र आर्थिक पाहणी व अर्थसंकल्प २०२४-२६ विश्लेषण',
    authorMr: 'MPSC Exam Simplified Team',
    priceInr: 250,
    discountPriceInr: 180,
    affiliateUrl: 'https://www.amazon.in/dp/B0CX123456?tag=mpscaffiliate-21',
    badge: 'नवीन आवृत्ती २०२५ 🚀',
    descriptionMr: 'आर्थिक पाहणीचे सर्व तक्ते, सांख्यिकी, थेट परकीय गुंतवणूक आणि सर्व चालू योजनांची अचूक परीक्षाभिमुख संकलन.'
  }
];
