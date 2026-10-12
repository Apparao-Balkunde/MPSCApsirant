export interface DrillStatement {
  label: 'अ' | 'ब' | 'क' | 'ड';
  textMr: string;
  textEn: string;
  isCorrect: boolean;
  factExplanationMr: string;
  factExplanationEn: string;
}

export interface MonthlyCurrentAffairsItem {
  id: string;
  year: 2025 | 2026 | 2027;
  month: number; // 1 to 12
  monthNameMr: string;
  monthNameEn: string;
  category: 'awards' | 'appointments' | 'sports' | 'schemes' | 'environment' | 'science_tech' | 'economy';
  categoryLabelMr: string;
  categoryLabelEn: string;
  titleMr: string;
  titleEn: string;
  leadContextMr: string;
  leadContextEn: string;
  statements: DrillStatement[];
  questionPromptMr: string;
  questionPromptEn: string;
  optionsMr: string[];
  optionsEn: string[];
  correctAnswerIndex: number; // 0-based
  reverseLearningFacts: {
    headlineMr: string;
    headlineEn: string;
    pointsMr: string[];
    pointsEn: string[];
  };
  mpscTrapNoteMr: string;
  mpscTrapNoteEn: string;
  officialReference: string;
  difficulty: 'Moderate' | 'Hard';
  highYieldBadgeMr: string;
  highYieldBadgeEn: string;
}

export const MONTHLY_CURRENT_AFFAIRS_DRILL_DATA: MonthlyCurrentAffairsItem[] = [
  // 1. AWARDS & HONOURS (पुरस्कार व सन्मान) - भारतरत्न २०२४/२०२५
  {
    id: 'mca_award_01',
    year: 2025,
    month: 1,
    monthNameMr: 'जानेवारी २०२५',
    monthNameEn: 'January 2025',
    category: 'awards',
    categoryLabelMr: '🏆 पुरस्कार व सन्मान',
    categoryLabelEn: 'Awards & Honours',
    titleMr: 'भारतरत्न सन्मान (कर्पूरी ठाकूर, अडवाणी, स्वामीनाथन, नरसिंह राव व चौधरी चरण सिंग)',
    titleEn: 'Bharat Ratna Honours & Historic Citations',
    leadContextMr: 'भारतरत्न या देशातील सर्वोच्च नागरी सन्मानाबाबत खालील विधानांचा विचार करा:',
    leadContextEn: 'Consider the following statements regarding the Bharat Ratna honours:',
    statements: [
      {
        label: 'अ',
        textMr: '२०२४ मध्ये एकाच वर्षात सर्वाधिक ५ व्यक्तींना भारतरत्न पुरस्कार जाहीर करून विक्रमी गौरव करण्यात आला.',
        textEn: 'In 2024, Bharat Ratna was conferred upon a record 5 eminent personalities in a single year.',
        isCorrect: true,
        factExplanationMr: 'सत्य: सामान्यतः वर्षाला कमाल ३ पुरस्कारांचा नियम असला तरी २०२४ मध्ये ५ व्यक्तींना (कर्पूरी ठाकूर, लालकृष्ण अडवाणी, डॉ. एम. एस. स्वामीनाथन, पी. व्ही. नरसिंह राव, चौधरी चरण सिंग) भारतरत्न देण्यात आला (यापूर्वी १९९९ मध्ये ४ जणांना दिला होता).',
        factExplanationEn: 'True: Although normally limited to 3 per year, 5 individuals received it in 2024 (breaking the 1999 record of 4).'
      },
      {
        label: 'ब',
        textMr: 'बिहारचे माजी मुख्यमंत्री कर्पूरी ठाकूर यांना त्यांच्या जन्मशताब्दी वर्षात हा सर्वोच्च सन्मान मरणोत्तर जाहीर झाला.',
        textEn: 'Former Bihar CM Karpoori Thakur was conferred the honour posthumously in his birth centenary year.',
        isCorrect: true,
        factExplanationMr: 'सत्य: २४ जानेवारी १९२४ हा कर्पूरी ठाकूर यांचा जन्मदिवस असून २०२४ मध्ये त्यांच्या जन्मशताब्दीनिमित्त त्यांना मरणोत्तर भारतरत्न घोषित करण्यात आला.',
        factExplanationEn: 'True: Born 24 Jan 1924, conferred posthumously on his birth centenary.'
      },
      {
        label: 'क',
        textMr: 'भारतरत्न पुरस्काराची सुरुवात २ जानेवारी १९५० रोजी राष्ट्रपतींच्या हस्ते करण्यात आली.',
        textEn: 'The Bharat Ratna award was instituted on 2 January 1950 by the President.',
        isCorrect: false,
        factExplanationMr: 'असत्य: भारतरत्न पुरस्काराची सुरुवात २ जानेवारी १९५४ (1954) रोजी झाली (१९५० नाही). पहिले मानकरी डॉ. सर्वपल्ली राधाकृष्णन, सी. राजगोपालाचारी आणि डॉ. सी. व्ही. रामन हे होते.',
        factExplanationEn: 'False: Bharat Ratna was instituted on 2 January 1954 (not 1950).'
      },
      {
        label: 'ड',
        textMr: 'भारतरत्न पुरस्कार विजेत्याला राष्ट्रपतींची स्वाक्षरी असलेले सनद आणि पिंपळाच्या पानाच्या आकाराचे पदक मिळते, परंतु कोणतीही रोख रक्कम दिली जात नाही.',
        textEn: 'The awardee receives a Sanad (certificate) and a Peepal leaf shaped medallion, with no monetary cash grant.',
        isCorrect: true,
        factExplanationMr: 'सत्य: भारतरत्न पुरस्कारात कोणतीही रोख रक्कम (Cash prize) नसते. केवळ पदक, सनद व घटनेच्या ७ व्या प्रोटोकॉलमधील अग्रक्रम मिळतो.',
        factExplanationEn: 'True: No monetary grant accompanies the Bharat Ratna award.'
      }
    ],
    questionPromptMr: 'वरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionPromptEn: 'Which of the statements given above are correct?',
    optionsMr: [
      '१) केवळ अ आणि ब योग्य',
      '२) केवळ अ, ब आणि ड योग्य',
      '३) केवळ क आणि ड योग्य',
      '४) सर्व विधाने (अ, ब, क, ड) योग्य'
    ],
    optionsEn: [
      '1) Only A and B are correct',
      '2) Only A, B and D are correct',
      '3) Only C and D are correct',
      '4) All statements (A, B, C, D) are correct'
    ],
    correctAnswerIndex: 1,
    reverseLearningFacts: {
      headlineMr: 'भारतरत्न २०२४-२५ रिव्हर्स लर्निंग मुख्य फॅक्ट्स',
      headlineEn: 'Bharat Ratna High-Yield Takeaway',
      pointsMr: [
        'सुरुवात: २ जानेवारी १९५४ (राष्ट्रपती राजेंद्र प्रसाद यांच्या काळात).',
        '२०२४ मानकरी (५ व्यक्ती): कर्पूरी ठाकूर, लालकृष्ण अडवाणी, डॉ. एम. एस. स्वामीनाथन, पी. व्ही. नरसिंह राव, चौधरी चरण सिंग.',
        'रोख रक्कम: ₹० (कोणतीही रोख रक्कम नाही, राष्ट्रपतींची सनद व तांब्याचे पिंपळाचे पान पदक ज्यावर प्लॅटिनमचा सूर्य व देवनागरीत "भारतरत्न" कोरलेले असते).',
        'मरणोत्तर तरतूद: १९५५ मध्ये सुधारणा करून मरणोत्तर भारतरत्न देण्याची तरतूद करण्यात आली (पहिले मरणोत्तर मानकरी लालबहादूर शास्त्री - १९६६).'
      ],
      pointsEn: [
        'Instituted: 2 Jan 1954 (not 1950).',
        '2024 Recipients (5): Karpoori Thakur, L.K. Advani, M.S. Swaminathan, P.V. Narasimha Rao, Charan Singh.',
        'Cash Prize: ₹0 (No financial grant).',
        'Posthumous amendment: Introduced in 1955; first recipient was Lal Bahadur Shastri in 1966.'
      ]
    },
    mpscTrapNoteMr: 'आयोग वर्षामध्ये फसवतो: १९५० (प्रजासत्ताक दिन वर्ष) पर्याय देतात, मात्र पुरस्कार २ जानेवारी १९५४ चा आहे. तसेच रोख रकमेबाबत ५० लाख किंवा १ कोटी असा ट्रॅप असतो, मात्र भारतरत्नला शून्य रोख रक्कम असते!',
    mpscTrapNoteEn: 'Watch out for year traps (1954 vs 1950) and monetary grants (Bharat Ratna carries zero cash prize).',
    officialReference: 'राष्ट्रपती भवन अधिकृत राजपत्र / गृह मंत्रालय (MHA) भारत सरकार',
    difficulty: 'Moderate',
    highYieldBadgeMr: '⭐ ५ स्टार हॉट टॉपिक',
    highYieldBadgeEn: '5-Star Hot Topic'
  },

  // 2. APPOINTMENTS (नियुक्त्या) - भारताचे ५१ वे सरन्यायाधीश (CJI Sanjiv Khanna)
  {
    id: 'mca_appoint_01',
    year: 2025,
    month: 11,
    monthNameMr: 'नोव्हेंबर २०२५',
    monthNameEn: 'November 2025',
    category: 'appointments',
    categoryLabelMr: '👔 राष्ट्रीय व आंतरराष्ट्रीय नियुक्त्या',
    categoryLabelEn: 'Appointments & Persons',
    titleMr: 'भारताचे ५१ वे सरन्यायाधीश: न्यायमूर्ती संजीव खन्ना (CJI Appointment & Collegium)',
    titleEn: '51st Chief Justice of India: Justice Sanjiv Khanna',
    leadContextMr: 'भारताचे ५१ वे सरन्यायाधीश न्या. संजीव खन्ना यांच्या नियुक्तीबाबत खालील विधाने विचारात घ्या:',
    leadContextEn: 'Consider the following statements regarding the 51st CJI Justice Sanjiv Khanna:',
    statements: [
      {
        label: 'अ',
        textMr: 'न्यायमूर्ती संजीव खन्ना यांनी भारताचे ५१ वे सरन्यायाधीश म्हणून ११ नोव्हेंबर २०२४ रोजी शपथ घेतली.',
        textEn: 'Justice Sanjiv Khanna took oath as the 51st Chief Justice of India on 11 November 2024.',
        isCorrect: true,
        factExplanationMr: 'सत्य: न्या. डी. वाय. चंद्रचूड (५० वे सरन्यायाधीश) निवृत्त झाल्यानंतर न्या. संजीव खन्ना यांची ५१ वे सरन्यायाधीश म्हणून नियुक्ती झाली व त्यांनी ११ नोव्हेंबर २०२४ रोजी शपथ घेतली.',
        factExplanationEn: 'True: Succeeded Justice D.Y. Chandrachud (50th CJI) on 11 November 2024.'
      },
      {
        label: 'ब',
        textMr: 'त्यांचा सरन्यायाधीशपदाचा कार्यकाळ सुमारे ६ महिने (१३ मे २०२५ पर्यंत) असणार आहे.',
        textEn: 'His tenure as the CJI is approximately 6 months (up to 13 May 2025).',
        isCorrect: true,
        factExplanationMr: 'सत्य: न्या. संजीव खन्ना यांचा कार्यकाळ सुमारे १८३ दिवस (६ महिने) असून ते १३ मे २०२५ रोजी वयाच्या ६५ व्या वर्षी निवृत्त होतील.',
        factExplanationEn: 'True: Tenure is around 6 months (183 days) retiring on 13 May 2025 upon turning 65.'
      },
      {
        label: 'क',
        textMr: 'भारतीय राज्यघटनेच्या कलम १२४(२) अन्वये भारताच्या पंतप्रधानांच्या सल्ल्याने राष्ट्रपती सरन्यायाधीशांची नियुक्ती करतात.',
        textEn: 'Under Article 124(2) of the Constitution, the President appoints the CJI on the mandatory advice of the Prime Minister.',
        isCorrect: false,
        factExplanationMr: 'असत्य: कलम १२४(२) नुसार राष्ट्रपती सर्वोच्च न्यायालयाच्या व उच्च न्यायालयांच्या न्यायाधीशांशी विचारविनिमय करून नियुक्ती करतात. प्रथेनुसार (Memorandum of Procedure) विद्यमान सरन्यायाधीश ज्येष्ठतेनुसार उत्तराधिकाऱ्याचे नाव शिफारस करतात (पंतप्रधान परस्पर सल्ला देत नाहीत).',
        factExplanationEn: 'False: Appointment is by the President under Article 124(2) via judicial collegium/seniority MoP, not sole executive discretion of PM.'
      },
      {
        label: 'ड',
        textMr: 'न्यायमूर्ती संजीव खन्ना हे सर्वोच्च न्यायालयाचे न्यायाधीश होण्यापूर्वी दिल्ली उच्च न्यायालयाचे न्यायाधीश होते.',
        textEn: 'Before elevation to the Supreme Court, Justice Sanjiv Khanna served as a judge of the Delhi High Court.',
        isCorrect: true,
        factExplanationMr: 'सत्य: न्या. खन्ना यांनी २००५ ते २०१९ दिल्ली उच्च न्यायालयात सेवा दिली आणि जानेवारी २०१९ मध्ये त्यांची पदोन्नती सर्वोच्च न्यायालयात झाली.',
        factExplanationEn: 'True: Served at Delhi High Court from 2005 to 2019.'
      }
    ],
    questionPromptMr: 'वरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionPromptEn: 'Which of the statements given above are correct?',
    optionsMr: [
      '१) केवळ अ आणि ब योग्य',
      '२) केवळ ब आणि क योग्य',
      '३) केवळ अ, ब आणि ड योग्य',
      '४) सर्व विधाने योग्य'
    ],
    optionsEn: [
      '1) Only A and B are correct',
      '2) Only B and C are correct',
      '3) Only A, B and D are correct',
      '4) All statements are correct'
    ],
    correctAnswerIndex: 2,
    reverseLearningFacts: {
      headlineMr: 'सरन्यायाधीश नियुक्ती व न्यायव्यवस्था - रिव्हर्स फॅक्ट्स',
      headlineEn: 'Judiciary & CJI Appointment Core Matrix',
      pointsMr: [
        '५० वे CJI: न्या. डी. वाय. चंद्रचूड (कार्यकाळ २ वर्षे).',
        '५१ वे CJI: न्या. संजीव खन्ना (कार्यकाळ: नोव्हेंबर २०२४ ते मे २०२५).',
        '५२ वे संभाव्य CJI (ज्येष्ठतेनुसार): न्या. बी. आर. गवई (महाराष्ट्रातील दुसरे दलित सरन्यायाधीश ठरू शकतात).',
        'निवृत्ती वय: सर्वोच्च न्यायालय ६५ वर्षे (कलम १२४), उच्च न्यायालय ६२ वर्षे (कलम २१७).'
      ],
      pointsEn: [
        '50th CJI: Justice D.Y. Chandrachud.',
        '51st CJI: Justice Sanjiv Khanna (tenure Nov 2024 - May 2025).',
        'Next in line by seniority: Justice B.R. Gavai.',
        'Retirement Age: 65 years for Supreme Court judges (Art 124).'
      ]
    },
    mpscTrapNoteMr: 'आयोगाचा आवडता ट्रॅप: सरन्यायाधीशांचा क्रम (५० वा की ५१ वा) बदलणे आणि कलम १२४ मधील नियुक्ती प्रक्रियेत "पंतप्रधानांचा सल्ला" असा पर्याय देऊन विद्यार्थ्यांची गफलत करणे!',
    mpscTrapNoteEn: 'Careful with sequence (51st, not 50th or 52nd) and constitutional procedure vs MoP convention.',
    officialReference: 'विधि व न्याय मंत्रालय / सुप्रीम कोर्ट ऑफ इंडिया अधिकृत पोर्टल',
    difficulty: 'Moderate',
    highYieldBadgeMr: '⚖️ न्यायव्यवस्था स्पेशल',
    highYieldBadgeEn: 'Judiciary Special'
  },

  // 3. SCHEMES (शासकीय योजना) - लाडकी बहीण व लाडका भाऊ योजना
  {
    id: 'mca_scheme_01',
    year: 2025,
    month: 7,
    monthNameMr: 'जुलै २०२५',
    monthNameEn: 'July 2025',
    category: 'schemes',
    categoryLabelMr: '🏛️ शासकीय योजना व धोरणे',
    categoryLabelEn: 'Government Schemes & Policies',
    titleMr: 'मुख्यमंत्री माझी लाडकी बहीण व युवा कार्य प्रशिक्षण योजना (महाराष्ट्र शासन)',
    titleEn: 'Mukhyamantri Majhi Ladki Bahin & Yuva Karya Prashikshan Schemes',
    leadContextMr: 'महाराष्ट्र शासनाच्या कल्याणकारी योजनांबाबत खालील विधाने काळजीपूर्वक वाचा:',
    leadContextEn: 'Carefully examine the following statements on Maharashtra welfare schemes:',
    statements: [
      {
        label: 'अ',
        textMr: '"मुख्यमंत्री माझी लाडकी बहीण" योजनेअंतर्गत पात्र महिलांना दरमहा ₹१,५०० थेट बँक खात्यात (DBT) दिले जातात.',
        textEn: 'Under "Mukhyamantri Majhi Ladki Bahin Yojana", eligible women receive ₹1,500/month DBT.',
        isCorrect: true,
        factExplanationMr: 'सत्य: महिलांना दरमहा ₹१,५०० (वार्षिक ₹१८,०००) थेट बँक खात्यात दिले जातात.',
        factExplanationEn: 'True: Financial assistance is ₹1,500 monthly directly into Aadhaar-linked bank accounts.'
      },
      {
        label: 'ब',
        textMr: 'लाडकी बहीण योजनेसाठी लाभार्थी महिलेचे वय १८ ते ६० वर्षे दरम्यान असणे अनिवार्य आहे.',
        textEn: 'For Ladki Bahin Yojana, the beneficiary age criteria is strictly 18 to 60 years.',
        isCorrect: false,
        factExplanationMr: 'असत्य: सुधारित शासन निर्णयानुसार लाडकी बहीण योजनेची वयोमर्यादा २१ ते ६५ वर्षे (21 to 65 years) आहे (१८ ते ६० वर्षे नाही).',
        factExplanationEn: 'False: Age limit is 21 to 65 years (not 18-60).'
      },
      {
        label: 'क',
        textMr: 'कुटुंबाचे वार्षिक उत्पन्न ₹२.५० लाखांपेक्षा जास्त नसावे ही दोन्ही प्रमुख योजनांसाठी मुख्य आर्थिक अट आहे.',
        textEn: 'Annual household family income must not exceed ₹2.50 Lakh.',
        isCorrect: true,
        factExplanationMr: 'सत्य: लाभार्थी कुटुंबाचे वार्षिक उत्पन्न ₹२.५ लाखांपेक्षा कमी असणे आवश्यक असून पिवळे/केशरी रेशनकार्ड असल्यास उत्पन्नाचा दाखला सादर करण्याची अट शिथिल करण्यात आली आहे.',
        factExplanationEn: 'True: Income ceiling is ₹2.5 Lakh per annum.'
      },
      {
        label: 'ड',
        textMr: '"मुख्यमंत्री युवा कार्य प्रशिक्षण योजने"मध्ये पदवीधर व पदव्युत्तर विद्यार्थ्यांना दरमहा ₹१०,००० विद्यावेतन दिले जाते.',
        textEn: 'Under "Yuva Karya Prashikshan Yojana", degree & post-graduate youth receive ₹10,000 monthly stipend.',
        isCorrect: true,
        factExplanationMr: 'सत्य: १२ वी पास तरुणांना ₹६,०००, आयटीआय/डिप्लोमाधारकांना ₹८,००० आणि पदवीधर/पदव्युत्तर तरुणांना ₹१०,००० प्रति महिना ६ महिन्यांसाठी दिले जातात.',
        factExplanationEn: 'True: Graduates receive ₹10,000/month stipend for 6-month on-the-job training.'
      }
    ],
    questionPromptMr: 'वरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionPromptEn: 'Which of the statements given above are correct?',
    optionsMr: [
      '१) केवळ अ, ब आणि क योग्य',
      '२) केवळ अ, क आणि ड योग्य',
      '३) केवळ ब आणि ड योग्य',
      '४) सर्व विधाने (अ, ब, क, ड) योग्य'
    ],
    optionsEn: [
      '1) Only A, B and C are correct',
      '2) Only A, C and D are correct',
      '3) Only B and D are correct',
      '4) All statements (A, B, C, D) are correct'
    ],
    correctAnswerIndex: 1,
    reverseLearningFacts: {
      headlineMr: 'महाराष्ट्र प्रमुख योजना रिव्हर्स लर्निंग टेबल',
      headlineEn: 'Maharashtra Schemes Master Matrix',
      pointsMr: [
        'लाडकी बहीण रक्कम: ₹१,५०० प्रति महिना (२१ ते ६५ वर्षे वय).',
        'लाडका भाऊ विद्यावेतन: ₹६,००० (१२ वी) | ₹८,००० (ITI/डिप्लोमा) | ₹१०,००० (पदवीधर).',
        'उत्पन्न मर्यादा: ₹२.५० लाख प्रति वर्ष.',
        'लेक लाडकी योजना: मुलीच्या जन्मापासून ते १८ व्या वर्षापर्यंत टप्प्याटप्प्याने एकूण ₹१,०१,००० ची आर्थिक मदत.'
      ],
      pointsEn: [
        'Ladki Bahin benefit: ₹1,500/month (Age 21-65 years).',
        'Yuva Training stipend: ₹6k (12th), ₹8k (ITI), ₹10k (Degree) for 6 months.',
        'Income threshold: Up to ₹2.5 Lakh/year.',
        'Lek Ladki Yojana: Cumulative ₹1,01,000 provided across phases up to age 18.'
      ]
    },
    mpscTrapNoteMr: 'वयाची मर्यादा २१ ते ६५ वर्षे आहे, विद्यार्थी घाईघाईत १८ वर्षे गृहीत धरून विधान योग्य मानतात आणि निगेटिव्ह मार्क खातात!',
    mpscTrapNoteEn: 'Trap: Age is 21 to 65 years, not standard 18 to 60.',
    officialReference: 'महिला व बालविकास विभाग आणि कौशल्य विकास विभाग, महाराष्ट्र शासन GR',
    difficulty: 'Moderate',
    highYieldBadgeMr: '🔥 महाराष्ट्र राज्य योजना विशेष',
    highYieldBadgeEn: 'State Schemes Special'
  },

  // 4. SPORTS (क्रीडा घडामोडी) - पॅरिस ऑलिंपिक्स व पॅरालिंपिक्स २०२४
  {
    id: 'mca_sports_01',
    year: 2025,
    month: 8,
    monthNameMr: 'ऑगस्ट २०२५',
    monthNameEn: 'August 2025',
    category: 'sports',
    categoryLabelMr: '🏅 क्रीडा घडामोडी',
    categoryLabelEn: 'Sports & Athletics',
    titleMr: 'पॅरिस ऑलिंपिक्स २०२४ व पॅरालिंपिक्स: भारताची ऐतिहासिक कामगिरी',
    titleEn: 'Paris Olympics & Paralympics 2024: India\'s Milestone Achievements',
    leadContextMr: 'पॅरिस ऑलिंपिक्स व पॅरालिंपिक्स २०२४ मधील भारताच्या कामगिरीबाबत खालील विधाने विचारात घ्या:',
    leadContextEn: 'Consider India\'s performance at the Paris Olympics and Paralympics 2024:',
    statements: [
      {
        label: 'अ',
        textMr: 'मनू भाकर ही एकाच ऑलिंपिक स्पर्धेत दोन पदके जिंकणारी स्वतंत्र भारताची पहिली महिला खेळाडू ठरली.',
        textEn: 'Manu Bhaker became the first athlete of independent India to win two medals at a single Olympic Games.',
        isCorrect: true,
        factExplanationMr: 'सत्य: मनू भाकरने १० मीटर एअर पिस्तूल वैयक्तिक प्रकारात आणि सरबजोत सिंगसोबत १० मीटर एअर पिस्तूल मिश्र सांघिक प्रकारात कांस्यपदक जिंकून हा ऐतिहासिक विक्रम केला.',
        factExplanationEn: 'True: Won 2 bronze medals (10m air pistol individual and mixed team with Sarabjot Singh).'
      },
      {
        label: 'ब',
        textMr: 'नीरज चोप्राने पुरुष भालाफेक प्रकारात सलग दुसरे सुवर्णपदक जिंकून इतिहास रचला.',
        textEn: 'Neeraj Chopra won consecutive gold medals in men\'s javelin throw.',
        isCorrect: false,
        factExplanationMr: 'असत्य: नीरज चोप्राने सुवर्णपदक नाही तर रौप्यपदक (Silver Medal - ८९.४५ मीटर) जिंकले. सुवर्णपदक पाकिस्तानच्या अर्शद नदीमने (९२.९७ मीटर ऑलिंपिक विक्रम) जिंकले.',
        factExplanationEn: 'False: Neeraj Chopra won Silver (89.45m), while Arshad Nadeem won Gold with Olympic record 92.97m.'
      },
      {
        label: 'क',
        textMr: 'भारतीय पुरुष हॉकी संघाने स्पेनला हरवून सलग दुसऱ्या ऑलिंपिकमध्ये कांस्यपदक पटकावले.',
        textEn: 'Indian men\'s hockey team won consecutive Olympic bronze medals by defeating Spain.',
        isCorrect: true,
        factExplanationMr: 'सत्य: भारतीय पुरुष संघाने स्पेनला २-१ ने हरवून टोकियो २०२० नंतर पॅरिस २०२४ मध्ये सलग दुसरे कांस्यपदक मिळवले (पी. आर. श्रीजेशचा शेवटचा सामना).',
        factExplanationEn: 'True: Defeated Spain 2-1 to secure bronze, marking PR Sreejesh\'s farewell match.'
      },
      {
        label: 'ड',
        textMr: 'पॅरिस पॅरालिंपिक्स २०२४ मध्ये भारताने आतापर्यंतची सर्वोत्तम कामगिरी करत एकूण २९ पदके (७ सुवर्ण, ९ रौप्य, १३ कांस्य) जिंकली.',
        textEn: 'In Paris Paralympics 2024, India achieved its best-ever tally of 29 medals (7 Gold, 9 Silver, 13 Bronze).',
        isCorrect: true,
        factExplanationMr: 'सत्य: पॅरिस पॅरालिंपिक्समध्ये भारताने ऐतिहासिक २९ पदके जिंकून पदकतालिकेत १८ वे स्थान मिळवले (टोकियोतील १९ पदकांचा विक्रम मोडीत काढला).',
        factExplanationEn: 'True: Record 29 medals tally (7 Gold, 9 Silver, 13 Bronze), finishing 18th in the medal tally.'
      }
    ],
    questionPromptMr: 'वरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionPromptEn: 'Which of the statements given above are correct?',
    optionsMr: [
      '१) केवळ अ, ब आणि क योग्य',
      '२) केवळ अ, क आणि ड योग्य',
      '३) केवळ ब आणि ड योग्य',
      '४) सर्व विधाने योग्य'
    ],
    optionsEn: [
      '1) Only A, B and C are correct',
      '2) Only A, C and D are correct',
      '3) Only B and D are correct',
      '4) All statements are correct'
    ],
    correctAnswerIndex: 1,
    reverseLearningFacts: {
      headlineMr: 'पॅरिस २०२४ ऑलिंपिक्स व पॅरालिंपिक्स रिव्हर्स लर्निंग',
      headlineEn: 'Paris 2024 Medal Matrix',
      pointsMr: [
        'ऑलिंपिक्स पदके: एकूण ६ पदके (१ रौप्य, ५ कांस्य). सुवर्ण: ०.',
        'मनू भाकर: २ कांस्य (नेमबाजी).',
        'नीरज चोप्रा: रौप्यपदक (८९.४५ मी).',
        'हॉकी: कांस्यपदक (कर्णधार हरमनप्रीत सिंग, गोलकीपर पी. आर. श्रीजेश).',
        'पॅरालिंपिक्स: २९ पदके (७ सुवर्ण, ९ रौप्य, १३ कांस्य) - ऐतिहासिक १८ वे स्थान.'
      ],
      pointsEn: [
        'Olympics Tally: 6 medals (1 Silver, 5 Bronze, 0 Gold).',
        'Manu Bhaker: Double bronze in shooting.',
        'Neeraj Chopra: Silver medal with 89.45m throw.',
        'Paralympics Tally: 29 medals (7G, 9S, 13B) - Best ever finish (18th).'
      ]
    },
    mpscTrapNoteMr: 'नीरज चोप्राने सुवर्ण जिंकल्याचे भासवून प्रश्न विचारला जातो; त्याने पॅरिसमध्ये रौप्य जिंकले आहे!',
    mpscTrapNoteEn: 'Neeraj won Silver in Paris (not Gold). Arshad Nadeem took Gold.',
    officialReference: 'IOC Official Reports & Sports Authority of India (SAI)',
    difficulty: 'Moderate',
    highYieldBadgeMr: '🏅 क्रीडा विक्रम विशेष',
    highYieldBadgeEn: 'Olympic Records'
  },

  // 5. ENVIRONMENT & SUMMITS (पर्यावरण व जागतिक परिषदा) - COP29 व रामसर स्थळे
  {
    id: 'mca_env_01',
    year: 2025,
    month: 12,
    monthNameMr: 'डिसेंबर २०२५',
    monthNameEn: 'December 2025',
    category: 'environment',
    categoryLabelMr: '🌿 पर्यावरण व जागतिक परिषदा',
    categoryLabelEn: 'Environment & Climate Summits',
    titleMr: 'COP29 हवामान परिषद (बाकू) व भारतातील नवीन रामसर स्थळे',
    titleEn: 'COP29 Climate Summit (Baku) & Ramsar Wetlands Expansion',
    leadContextMr: 'जागतिक पर्यावरण घडामोडी व भारतातील संवर्धन क्षेत्रांबाबत खालील विधाने तपासा:',
    leadContextEn: 'Examine the following statements regarding global climate and Ramsar wetlands:',
    statements: [
      {
        label: 'अ',
        textMr: 'UNFCCC ची २९ वी हवामान परिषद (COP29) बाकू, अझरबैजान येथे नोव्हेंबर २०२४ मध्ये पार पडली.',
        textEn: 'UNFCCC COP29 climate conference was held in Baku, Azerbaijan in November 2024.',
        isCorrect: true,
        factExplanationMr: 'सत्य: COP29 चे यजमानपद अझरबैजानची राजधानी बाकू शहराकडे होते, ज्याला "Finance COP" म्हणून संबोधले गेले.',
        factExplanationEn: 'True: Held in Baku, Azerbaijan and nicknamed the "Finance COP".'
      },
      {
        label: 'ब',
        textMr: 'COP29 मध्ये विकसनशील देशांसाठी दरवर्षी ३०० अब्ज डॉलर्स (NCQG) हवामान निधी पुरवण्याचा नवीन करार संमत करण्यात आला.',
        textEn: 'COP29 adopted a target of $300 billion annually by 2035 under New Collective Quantified Goal (NCQG).',
        isCorrect: true,
        factExplanationMr: 'सत्य: २०३५ पर्यंत विकसित देशांनी दरवर्षी किमान ३०० अब्ज अमेरिकन डॉलर्स हवामान निधी विकसनशील देशांना पुरवण्याचे उद्दिष्ट NCQG अंतर्गत ठरवले.',
        factExplanationEn: 'True: $300 billion annual climate finance target agreed up to 2035.'
      },
      {
        label: 'क',
        textMr: 'महाराष्ट्रात सध्या एकूण ५ रामसर पाणथळ स्थळे (Ramsar Sites) घोषित झालेली आहेत.',
        textEn: 'Maharashtra currently has 5 officially designated Ramsar Wetland Sites.',
        isCorrect: false,
        factExplanationMr: 'असत्य: महाराष्ट्रात सध्या ३ रामसर स्थळे आहेत: १) नांदूर मध्यमेश्वर (नाशिक - २०२०), २) लोणार सरोवर (बुलढाणा - २०२०) आणि ३) ठाणे क्रीक फ्लेमिंगो अभयारण्य (ठाणे - २०२२). ५ नाहीत.',
        factExplanationEn: 'False: Maharashtra has exactly 3 Ramsar sites (Nandur Madhmeshwar, Lonar Lake, Thane Creek Flamingo Sanctuary).'
      },
      {
        label: 'ड',
        textMr: 'भारतातील एकूण रामसर स्थळांची संख्या ८५ च्या पुढे पोहोचली असून तामिळनाडू राज्यात सर्वाधिक रामसर स्थळे आहेत.',
        textEn: 'Total Ramsar sites in India have crossed 85, with Tamil Nadu hosting the highest number of sites.',
        isCorrect: true,
        factExplanationMr: 'सत्य: भारतात आता ८५ रामसर स्थळे झाली आहेत आणि तामिळनाडू (१६ स्थळे) प्रथम स्थानी असून उत्तर प्रदेश (१० स्थळे) दुसऱ्या क्रमांकावर आहे.',
        factExplanationEn: 'True: India has 85 Ramsar sites; Tamil Nadu leads with 16 sites followed by UP with 10.'
      }
    ],
    questionPromptMr: 'वरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionPromptEn: 'Which of the statements given above are correct?',
    optionsMr: [
      '१) केवळ अ आणि ब योग्य',
      '२) केवळ अ, ब आणि ड योग्य',
      '३) केवळ ब, क आणि ड योग्य',
      '४) सर्व विधाने योग्य'
    ],
    optionsEn: [
      '1) Only A and B are correct',
      '2) Only A, B and D are correct',
      '3) Only B, C and D are correct',
      '4) All statements are correct'
    ],
    correctAnswerIndex: 1,
    reverseLearningFacts: {
      headlineMr: 'पर्यावरण व रामसर पाणथळ स्थळे रिव्हर्स लर्निंग टेबल',
      headlineEn: 'Environment & Ramsar Wetland Matrix',
      pointsMr: [
        'COP28: दुबई (UAE) | COP29: बाकू (अझरबैजान) | COP30: बेलेम (ब्राझील).',
        'महाराष्ट्रातील ३ रामसर स्थळे: १. नांदूर मध्यमेश्वर (नाशिक) २. लोणार उल्काजन्य सरोवर (बुलढाणा) ३. ठाणे फ्लेमिंगो खाडी (ठाणे).',
        'भारतात सर्वाधिक रामसर स्थळे: तामिळनाडू (१६ स्थळे).',
        'जागतिक पाणथळ दिवस (World Wetlands Day): २ फेब्रुवारी (१९७१ रामसर करार - इराण).'
      ],
      pointsEn: [
        'COP host cities: COP28 Dubai, COP29 Baku, COP30 Belem (Brazil).',
        'Maharashtra 3 Ramsar sites: Nandur Madhmeshwar, Lonar Crater Lake, Thane Creek Flamingo.',
        'State with most Ramsar sites: Tamil Nadu (16).',
        'World Wetlands Day: 2 February (Ramsar Convention 1971).'
      ]
    },
    mpscTrapNoteMr: 'महाराष्ट्रातील रामसर स्थळांची संख्या ३ आहे (नांदूर मध्यमेश्वर, लोणार, ठाणे खाडी). परीक्षेमध्ये ५ किंवा ६ असा खोटा आकडा देऊन चकवले जाते!',
    mpscTrapNoteEn: 'Maharashtra has exactly 3 Ramsar sites, not 5. Tamil Nadu has the highest (16).',
    officialReference: 'पर्यावरण, वने व हवामान बदल मंत्रालय (MoEFCC) व Ramsar Convention Secretariat',
    difficulty: 'Hard',
    highYieldBadgeMr: '🌿 पर्यावरण हॉट टॉपिक',
    highYieldBadgeEn: 'Environment Hot Topic'
  },

  // 6. SCIENCE & TECH (विज्ञान, तंत्रज्ञान व अंतराळ) - इस्रो गगनयान व आदित्य-L1
  {
    id: 'mca_sci_01',
    year: 2025,
    month: 3,
    monthNameMr: 'मार्च २०२५',
    monthNameEn: 'March 2025',
    category: 'science_tech',
    categoryLabelMr: '🚀 विज्ञान, तंत्रज्ञान व संरक्षण',
    categoryLabelEn: 'Science, Tech & Defence',
    titleMr: 'इस्रो गगनयान मोहीम (Gaganyaan Astronauts) व आदित्य-L1 सौर वेधशाळा',
    titleEn: 'ISRO Gaganyaan Human Spaceflight & Aditya-L1 Mission',
    leadContextMr: 'भारताच्या महत्त्वाकांक्षी अंतराळ मोहिमांबाबत खालील विधानांचा विचार करा:',
    leadContextEn: 'Consider the following statements regarding India\'s flagship space missions:',
    statements: [
      {
        label: 'अ',
        textMr: 'गगनयान मोहिमेसाठी निवडलेल्या चारही अंतराळवीरांना (ग्रुप कॅप्टन) पंतप्रधान नरेंद्र मोदी यांच्या हस्ते विक्रम साराभाई अंतराळ केंद्रात "अॅस्ट्रॉनॉट विंग्ज" प्रदान करण्यात आले.',
        textEn: 'The four astronaut-designates for Gaganyaan mission were conferred astronaut wings by PM Modi at VSSC.',
        isCorrect: true,
        factExplanationMr: 'सत्य: २७ फेब्रुवारी २०२४ रोजी तिरुवनंतपुरम येथील VSSC मध्ये ग्रुप कॅप्टन प्रशांत बालकृष्णन नायर, अजित कृष्णन, अंगद प्रताप आणि विंग कमांडर शुभांशु शुक्ला यांची नावे अधिकृत जाहीर करण्यात आली.',
        factExplanationEn: 'True: 4 IAF officers (Prashanth Nair, Ajit Krishnan, Angad Pratap, Shubhanshu Shukla) unveiled.'
      },
      {
        label: 'ब',
        textMr: 'आदित्य-L1 हे यान ६ जानेवारी २०२४ रोजी पृथ्वीपासून सुमारे १५ लाख किमी अंतरावरील सूर्य-पृथ्वी लॅग्रांज पॉईंट-१ भोवती हॅलो ऑर्बिटमध्ये (Halo Orbit) यशस्वीरीत्या प्रस्थापित झाले.',
        textEn: 'Aditya-L1 was successfully inserted into a halo orbit around Sun-Earth Lagrange Point-1 (~1.5M km) on 6 January 2024.',
        isCorrect: true,
        factExplanationMr: 'सत्य: आदित्य-L1 मोहिमेने १५ लाख किलोमीटरचा प्रवास करून ६ जानेवारी २०२४ रोजी हॅलो कक्षेत प्रवेश केला, ज्यामुळे ग्रहण न होता अखंड सूर्य निरीक्षण शक्य होते.',
        factExplanationEn: 'True: Successfully inserted into L1 Halo Orbit on 6 Jan 2024 at 1.5 million km distance.'
      },
      {
        label: 'क',
        textMr: 'गगनयान मोहिमेत अंतराळवीरांना घेऊन जाण्यासाठी पीएसएलव्ही (PSLV-C58) प्रक्षेपकाचा वापर केला जाणार आहे.',
        textEn: 'ISRO will use the PSLV-C58 launch vehicle to propel astronauts into Low Earth Orbit.',
        isCorrect: false,
        factExplanationMr: 'असत्य: मानवी अंतराळ मोहिमेसाठी मानवरहित व मानवयुक्त उड्डाणाकरिता LVM3 (Launch Vehicle Mark 3 / पूर्वीचा GSLV Mk-III - Human Rated LVM3) चा वापर केला जाईल, PSLV चा नाही.',
        factExplanationEn: 'False: Human Rated LVM3 (Launch Vehicle Mark 3) is used, not PSLV.'
      },
      {
        label: 'ड',
        textMr: 'गगनयान मोहिमेच्या मानवरहित चाचणी उड्डाणात इस्रोने विकसित केलेला "व्योममित्र" (Vyommitra) हा अर्ध-मानवी रोबोट पाठवला जाणार आहे.',
        textEn: 'A female-looking humanoid robot named "Vyommitra" developed by ISRO will fly in the uncrewed test mission.',
        isCorrect: true,
        factExplanationMr: 'सत्य: व्योममित्र हा इस्रोचा ह्युमनॉइड रोबोट लाइफ सपोर्ट सिस्टम आणि स्पेस कॅप्सूलमधील वातावरणाची मानवी अनुकूलता तपासण्यासाठी पाठवला जात आहे.',
        factExplanationEn: 'True: Vyommitra female humanoid robot is designed for uncrewed spaceflight trials.'
      }
    ],
    questionPromptMr: 'वरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionPromptEn: 'Which of the statements given above are correct?',
    optionsMr: [
      '१) केवळ अ आणि ब योग्य',
      '२) केवळ अ, ब आणि ड योग्य',
      '३) केवळ क आणि ड योग्य',
      '४) सर्व विधाने योग्य'
    ],
    optionsEn: [
      '1) Only A and B are correct',
      '2) Only A, B and D are correct',
      '3) Only C and D are correct',
      '4) All statements are correct'
    ],
    correctAnswerIndex: 1,
    reverseLearningFacts: {
      headlineMr: 'इस्रो स्पेस मिशन्स रिव्हर्स लर्निंग मॅट्रिक्स',
      headlineEn: 'ISRO Space Explorations Fact File',
      pointsMr: [
        'गगनयान रॉकेट: HLVM3 (Human Rated Launch Vehicle Mark 3).',
        'अंतराळवीर: प्रशांत नायर, अंगद प्रताप, अजित कृष्णन, शुभांशु शुक्ला (सर्व भारतीय हवाई दलाचे फायटर पायलट).',
        'रोबोट: "व्योममित्र" (संस्कृत: व्योम = अंतराळ, मित्र = सखा).',
        'आदित्य-L1: लॅग्रांज पॉइंट-१ (१५ लाख किमी); एकूण ७ पेलोड्स (उदा. VELC, SUIT, ASPEX).'
      ],
      pointsEn: [
        'Gaganyaan Launcher: Human-Rated LVM3 (HLVM3), not PSLV.',
        'Crew: 4 IAF test pilots; Shubhanshu Shukla designated for Axiom-4 ISS mission.',
        'Robot: Vyommitra humanoid.',
        'Aditya-L1: Lagrange Point 1 (1.5M km), 7 payloads including VELC and SUIT.'
      ]
    },
    mpscTrapNoteMr: 'रॉकेटच्या नावात ट्रॅप असतो: PSLV किंवा GSLV Mk-II न देता मानवी मोहिमेसाठी LVM-3 (HLVM3) हेच अधिकृत रॉकेट आहे!',
    mpscTrapNoteEn: 'Watch out for launcher traps: It is Human Rated LVM3 (not PSLV).',
    officialReference: 'भारतीय अंतराळ संशोधन संस्था (ISRO) अधिकृत मिशन बुलेटिन',
    difficulty: 'Moderate',
    highYieldBadgeMr: '🚀 इस्रो अंतराळ विशेष',
    highYieldBadgeEn: 'ISRO Space Special'
  },

  // 7. ECONOMY (आर्थिक घडामोडी व अर्थसंकल्प) - युनिफाइड पेन्शन स्कीम (UPS) व महाराष्ट्र अर्थसंकल्प
  {
    id: 'mca_eco_01',
    year: 2025,
    month: 9,
    monthNameMr: 'सप्टेंबर २०२५',
    monthNameEn: 'September 2025',
    category: 'economy',
    categoryLabelMr: '📈 आर्थिक घडामोडी व अर्थसंकल्प',
    categoryLabelEn: 'Economy, Budget & Banking',
    titleMr: 'युनिफाइड पेन्शन स्कीम (UPS) व नवीन आर्थिक सुधारणा',
    titleEn: 'Unified Pension Scheme (UPS) & New Economic Reforms',
    leadContextMr: 'केंद्र सरकारने मंजूर केलेल्या युनिफाइड पेन्शन स्कीम (UPS) बाबत खालील विधाने विचारात घ्या:',
    leadContextEn: 'Consider the following statements regarding the Unified Pension Scheme (UPS) approved by the Union Cabinet:',
    statements: [
      {
        label: 'अ',
        textMr: 'युनिफाइड पेन्शन स्कीम (UPS) १ एप्रिल २०२५ पासून संपूर्ण देशभरातील केंद्रीय कर्मचाऱ्यांसाठी लागू होणार आहे.',
        textEn: 'The Unified Pension Scheme (UPS) comes into effect from 1 April 2025 for central government employees.',
        isCorrect: true,
        factExplanationMr: 'सत्य: केंद्रीय मंत्रिमंडळाने ऑगस्ट २०२४ मध्ये UPS मंजूर केली असून १ एप्रिल २०२५ पासून ती लागू केली जात आहे. महाराष्ट्र शासनानेही राज्य कर्मचाऱ्यांसाठी ही योजना स्वीकारली आहे.',
        factExplanationEn: 'True: Effective from 1 April 2025, adopted by Maharashtra as well.'
      },
      {
        label: 'ब',
        textMr: 'किमान २५ वर्षे सेवा पूर्ण करणाऱ्या कर्मचाऱ्याला निवृत्तीपूर्वीच्या शेवटच्या १२ महिन्यांच्या सरासरी मूळ वेतनाच्या ५०% हमीभाव पेन्शन (Assured Pension) मिळेल.',
        textEn: 'An employee with minimum 25 years of service is guaranteed an assured pension of 50% of average basic pay drawn in the last 12 months.',
        isCorrect: true,
        factExplanationMr: 'सत्य: २५ वर्षांच्या सेवेनंतर शेवटच्या १२ महिन्यांच्या मूळ वेतनाच्या ५०% रक्कम हमीभाव निवृत्तीवेतन म्हणून दिली जाईल.',
        factExplanationEn: 'True: 50% of last 12 months average basic salary for minimum 25 years service.'
      },
      {
        label: 'क',
        textMr: 'किमान १० वर्षांची सेवा पूर्ण करणाऱ्या कर्मचाऱ्याला दरमहा किमान ₹१०,००० पेन्शनची हमी देण्यात आली आहे.',
        textEn: 'Employees with at least 10 years of service are guaranteed a minimum assured pension of ₹10,000 per month.',
        isCorrect: true,
        factExplanationMr: 'सत्य: १० वर्षे पूर्ण झाल्यास किमान निवृत्तीवेतन दरमहा ₹१०,००० सुनिश्चित करण्यात आले आहे.',
        factExplanationEn: 'True: Minimum assured pension is ₹10,000/month after 10 years of service.'
      },
      {
        label: 'ड',
        textMr: 'या योजनेत सरकारचे योगदान कर्मचाऱ्यांच्या मूळ वेतनाच्या १४% वरून वाढवून १८.५% करण्यात आले आहे.',
        textEn: 'Government contribution has been raised from 14% to 18.5% of basic salary.',
        isCorrect: true,
        factExplanationMr: 'सत्य: कर्मचाऱ्याचे योगदान १०% राहील, मात्र केंद्र सरकारचे योगदान १४% वरून १८.५% पर्यंत वाढवण्यात आले आहे.',
        factExplanationEn: 'True: Government contribution enhanced to 18.5% (employee contribution remains 10%).'
      }
    ],
    questionPromptMr: 'वरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionPromptEn: 'Which of the statements given above are correct?',
    optionsMr: [
      '१) केवळ अ आणि ब योग्य',
      '२) केवळ ब, क आणि ड योग्य',
      '३) सर्व विधाने (अ, ब, क, आणि ड) योग्य',
      '४) केवळ अ आणि ड योग्य'
    ],
    optionsEn: [
      '1) Only A and B are correct',
      '2) Only B, C and D are correct',
      '3) All statements (A, B, C, and D) are correct',
      '4) Only A and D are correct'
    ],
    correctAnswerIndex: 2,
    reverseLearningFacts: {
      headlineMr: 'युनिफाइड पेन्शन स्कीम (UPS) रिव्हर्स लर्निंग बुलेटिन',
      headlineEn: 'Unified Pension Scheme (UPS) Fact Card',
      pointsMr: [
        'लागू होण्याची तारीख: १ एप्रिल २०२५.',
        'हमीभाव पेन्शन: २५ वर्षे सेवेनंतर ५०% (शेवटच्या १२ महिन्यांची सरासरी).',
        'किमान पेन्शन: ₹१०,००० प्रति महिना (१० वर्षे सेवेनंतर).',
        'कुटुंब निवृत्तीवेतन (Family Pension): निवृत्तीवेतनधारकाच्या निधनानंतर पेन्शनच्या ६०% रक्कम जोडीदाराला.',
        'सरकारी हिस्सा: १८.५% (कर्मचाऱ्याचा हिस्सा १०%).'
      ],
      pointsEn: [
        'Effective Date: 1 April 2025.',
        'Full Assured Pension: 50% of last 12 months average pay for 25 yrs service.',
        'Minimum Assured Pension: ₹10,000/mo after 10 yrs service.',
        'Family Pension: 60% of the employee\'s pension.',
        'Govt Contribution: 18.5% (Employee: 10%).'
      ]
    },
    mpscTrapNoteMr: 'कर्मचाऱ्यांचा हिस्सा १०% च आहे, केवळ सरकारचा हिस्सा १४% वरून १८.५% झाला आहे. तसेच किमान सेवेची मुदत १० वर्षे असून पूर्ण पेन्शनसाठी २५ वर्षे हवीत!',
    mpscTrapNoteEn: 'Employee share stays at 10%; only government contribution raised to 18.5%.',
    officialReference: 'केंद्रीय अर्थ मंत्रालय / कार्मिक व प्रशिक्षण विभाग (DoPT) PIB',
    difficulty: 'Moderate',
    highYieldBadgeMr: '💼 पेन्शन व अर्थव्यवस्था',
    highYieldBadgeEn: 'Economy & Pension'
  },

  // 8. SPORTS (क्रीडा) - बुद्धिबळ ऑलिम्पियाड २०२४ (बुडापेस्ट ऐतिहासिक दुहेरी सुवर्ण)
  {
    id: 'mca_sports_02',
    year: 2025,
    month: 10,
    monthNameMr: 'ऑक्टोबर २०२५',
    monthNameEn: 'October 2025',
    category: 'sports',
    categoryLabelMr: '🏅 क्रीडा घडामोडी',
    categoryLabelEn: 'Sports & Athletics',
    titleMr: '४५ वी बुद्धिबळ ऑलिम्पियाड (बुडापेस्ट) - भारताचा ऐतिहासिक दुहेरी सुवर्ण विजय',
    titleEn: '45th Chess Olympiad Budapest: India\'s Historic Double Gold Triumph',
    leadContextMr: 'हंगेरीची राजधानी बुडापेस्ट येथे झालेल्या ४५ व्या बुद्धिबळ ऑलिम्पियाडबाबत खालील विधाने तपासा:',
    leadContextEn: 'Consider the following statements regarding the 45th Chess Olympiad held in Budapest, Hungary:',
    statements: [
      {
        label: 'अ',
        textMr: 'भारताने पुरुष (Open) आणि महिला (Women) अशा दोन्ही गटांमध्ये सुवर्णपदक जिंकून ऐतिहासिक दुहेरी सुवर्णपदकाचा विक्रम केला.',
        textEn: 'India won gold in both Open and Women sections, achieving a historic double gold clean sweep.',
        isCorrect: true,
        factExplanationMr: 'सत्य: भारताने पहिल्यांदाच एकाच ऑलिम्पियाडमध्ये दोन्ही गटांचे सुवर्ण जिंकून सोव्हिएत युनियन आणि चीननंतर अशी कामगिरी करणारा जगातील तिसराच देश ठरला.',
        factExplanationEn: 'True: India became only the 3rd country after USSR and China to sweep both gold medals.'
      },
      {
        label: 'ब',
        textMr: 'भारतीय पुरुष संघात डी. गुकेश, आर. प्रज्ञानंद, अर्जुन एरिगेसी, विदित गुजराथी आणि पी. हरिकृष्ण यांचा समावेश होता.',
        textEn: 'The Indian men\'s squad comprised D. Gukesh, R. Praggnanandhaa, Arjun Erigaisi, Vidit Gujrathi and P. Harikrishna.',
        isCorrect: true,
        factExplanationMr: 'सत्य: हे पाचही ग्रँडमास्टर भारतीय पुरुष संघाचे सदस्य होते, ज्यामध्ये महाराष्ट्राच्या नाशिकचा विदित गुजराथीही होता.',
        factExplanationEn: 'True: All five were members, including Vidit Gujrathi from Nashik, Maharashtra.'
      },
      {
        label: 'क',
        textMr: 'नागपूरच्या दिव्या देशमुख आणि हरिका द्रोणावल्ली यांनी महिला संघाला सुवर्ण मिळवून देण्यात मोलाची भूमिका बजावली.',
        textEn: 'Divya Deshmukh (from Nagpur) and Harika Dronavalli played pivotal roles in guiding the women\'s team to gold.',
        isCorrect: true,
        factExplanationMr: 'सत्य: दिव्या देशमुखने वैयक्तिक बोर्ड-३ वर सुवर्णपदक जिंकले (९.५/११ गुण) आणि भारतीय महिला संघाला ऐतिहासिक विजय मिळवून दिला.',
        factExplanationEn: 'True: Divya Deshmukh from Nagpur won individual Board-3 gold and anchored team victory.'
      },
      {
        label: 'ड',
        textMr: 'या स्पर्धेत डी. गुकेशला पराभव पत्करावा लागल्याने त्याला वैयक्तिक पदक मिळाले नाही.',
        textEn: 'D. Gukesh suffered multiple defeats and failed to win any individual board medal.',
        isCorrect: false,
        factExplanationMr: 'असत्य: डी. गुकेशने बोर्ड-१ वर अपराजित राहत ९/१० गुणांसह वैयक्तिक सुवर्णपदक (Gold Medal) पटकावले आणि ३०५६ चा विक्रमी कार्यप्रदर्शन रेटिंग मिळवला.',
        factExplanationEn: 'False: D. Gukesh remained unbeaten with 9/10 score to clinch the individual Board-1 Gold medal.'
      }
    ],
    questionPromptMr: 'वरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionPromptEn: 'Which of the statements given above are correct?',
    optionsMr: [
      '१) केवळ अ, ब आणि क योग्य',
      '२) केवळ ब, क आणि ड योग्य',
      '३) केवळ अ आणि क योग्य',
      '४) सर्व विधाने योग्य'
    ],
    optionsEn: [
      '1) Only A, B and C are correct',
      '2) Only B, C and D are correct',
      '3) Only A and C are correct',
      '4) All statements are correct'
    ],
    correctAnswerIndex: 0,
    reverseLearningFacts: {
      headlineMr: '४५ वी बुद्धिबळ ऑलिम्पियाड रिव्हर्स लर्निंग फॅक्ट्स',
      headlineEn: '45th Chess Olympiad Fact Summary',
      pointsMr: [
        'ठिकाण: बुडापेस्ट, हंगेरी (सप्टेंबर २०२४).',
        'निकाल: पुरुष संघ (ओपन) - सुवर्णपदक | महिला संघ - सुवर्णपदक.',
        'वैयक्तिक सुवर्णपदक विजेते: डी. गुकेश (बोर्ड १), अर्जुन एरिगेसी (बोर्ड ३), दिव्या देशमुख (बोर्ड ३), अवंतिका वांतिका अग्रवाल (बोर्ड ४).',
        'महाराष्ट्र कनेक्शन: विदित गुजराथी (नाशिक) आणि दिव्या देशमुख (नागपूर).'
      ],
      pointsEn: [
        'Host City: Budapest, Hungary (Sep 2024).',
        'Result: Gold in both Open and Women\'s categories.',
        'Individual Golds: D. Gukesh, Arjun Erigaisi, Divya Deshmukh, Vantika Agrawal.',
        'Maharashtra Athletes: Vidit Gujrathi (Nashik) & Divya Deshmukh (Nagpur).'
      ]
    },
    mpscTrapNoteMr: 'MPSC मध्ये महाराष्ट्रातील खेळाडूंचे जिल्हे विचारले जातात: दिव्या देशमुख (नागपूर) आणि विदित गुजराथी (नाशिक). हे विशेष लक्षात ठेवा!',
    mpscTrapNoteEn: 'MPSC loves geographic origins: Divya Deshmukh hails from Nagpur, Vidit Gujrathi from Nashik.',
    officialReference: 'आंतरराष्ट्रीय बुद्धिबळ महासंघ (FIDE) अधिकृत निकाल',
    difficulty: 'Moderate',
    highYieldBadgeMr: '♟️ बुद्धिबळ विक्रम',
    highYieldBadgeEn: 'Chess Triumph'
  },

  // 9. APPOINTMENTS (नियुक्त्या) - महाराष्ट्राचे नवीन राज्यपाल व १६ वा वित्त आयोग
  {
    id: 'mca_appoint_02',
    year: 2025,
    month: 8,
    monthNameMr: 'ऑगस्ट २०२५',
    monthNameEn: 'August 2025',
    category: 'appointments',
    categoryLabelMr: '👔 राष्ट्रीय व आंतरराष्ट्रीय नियुक्त्या',
    categoryLabelEn: 'Appointments & Persons',
    titleMr: 'महाराष्ट्राचे २५ वे राज्यपाल सी. पी. राधाकृष्णन व १६ वा वित्त आयोग',
    titleEn: 'Maharashtra Governor C.P. Radhakrishnan & 16th Finance Commission',
    leadContextMr: 'नव्या घटनात्मक व वैधानिक नियुक्त्यांबाबत खालील विधाने विचारात घ्या:',
    leadContextEn: 'Consider the constitutional appointments in news:',
    statements: [
      {
        label: 'अ',
        textMr: 'सी. पी. राधाकृष्णन यांनी महाराष्ट्राचे २५ वे राज्यपाल म्हणून ३१ जुलै २०२४ रोजी शपथ घेतली.',
        textEn: 'C.P. Radhakrishnan was sworn in as the 25th Governor of Maharashtra on 31 July 2024.',
        isCorrect: true,
        factExplanationMr: 'सत्य: रमेश बैस यांच्यानंतर सी. पी. राधाकृष्णन यांची महाराष्ट्राचे राज्यपाल म्हणून नियुक्ती झाली. यापूर्वी ते झारखंडचे राज्यपाल होते.',
        factExplanationEn: 'True: Succeeded Ramesh Bais as the Governor of Maharashtra; earlier governed Jharkhand.'
      },
      {
        label: 'ब',
        textMr: '१६ व्या वित्त आयोगाचे अध्यक्ष म्हणून डॉ. अरविंद पनगढिया (नीती आयोगाचे माजी उपाध्यक्ष) यांची नियुक्ती करण्यात आली आहे.',
        textEn: 'Dr. Arvind Panagariya (former Vice-Chairman of NITI Aayog) was appointed Chairman of the 16th Finance Commission.',
        isCorrect: true,
        factExplanationMr: 'सत्य: ३१ डिसेंबर २०२३ रोजी राष्ट्रपतींनी डॉ. अरविंद पनगढिया यांच्या अध्यक्षतेखाली १६ व्या वित्त आयोगाची स्थापना केली.',
        factExplanationEn: 'True: Headed by Dr. Arvind Panagariya constituted under Article 280.'
      },
      {
        label: 'क',
        textMr: '१६ व्या वित्त आयोगाच्या शिफारशींचा कालावधी २०२४ ते २०२९ असा पाच वर्षांचा असेल.',
        textEn: 'The recommendation operational period of the 16th Finance Commission is 2024 to 2029.',
        isCorrect: false,
        factExplanationMr: 'असत्य: १६ व्या वित्त आयोगाचा शिफारस कालावधी १ एप्रिल २०२६ ते ३१ मार्च २०३१ असा ५ वर्षांचा असेल (२०२४-२०२९ नाही). आयोग आपला अहवाल ३१ ऑक्टोबर २०२५ पर्यंत सादर करेल.',
        factExplanationEn: 'False: 16th FC recommendations cover the 5-year period from 1 April 2026 to 31 March 2031.'
      },
      {
        label: 'ड',
        textMr: 'भारतीय राज्यघटनेच्या कलम २८० नुसार दर पाच वर्षांनी किंवा आवश्यकतेनुसार राष्ट्रपती वित्त आयोगाची स्थापना करतात.',
        textEn: 'Under Article 280, the President constitutes the Finance Commission every 5 years or earlier.',
        isCorrect: true,
        factExplanationMr: 'सत्य: कलम २८०(१) अन्वये वित्त आयोगात १ अध्यक्ष आणि ४ इतर सदस्य असतात ज्यांची नियुक्ती राष्ट्रपती करतात.',
        factExplanationEn: 'True: Governed by Article 280 with 1 chairman and 4 members appointed by President.'
      }
    ],
    questionPromptMr: 'वरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionPromptEn: 'Which of the statements given above are correct?',
    optionsMr: [
      '१) केवळ अ, ब आणि ड योग्य',
      '२) केवळ अ आणि क योग्य',
      '३) केवळ ब आणि क योग्य',
      '४) सर्व विधाने योग्य'
    ],
    optionsEn: [
      '1) Only A, B and D are correct',
      '2) Only A and C are correct',
      '3) Only B and C are correct',
      '4) All statements are correct'
    ],
    correctAnswerIndex: 0,
    reverseLearningFacts: {
      headlineMr: '१६ वा वित्त आयोग व राज्यपाल रिव्हर्स मॅट्रिक्स',
      headlineEn: '16th Finance Commission Key Facts',
      pointsMr: [
        '१६ व्या आयोगाचे अध्यक्ष: डॉ. अरविंद पनगढिया.',
        '१६ व्या वित्त आयोगाचा कालावधी: १ एप्रिल २०२६ ते ३१ मार्च २०३१ (५ वर्षे).',
        '१५ व्या आयोगाचे अध्यक्ष: एन. के. सिंग (कालावधी २०२०-२१ ते २०२५-२६).',
        'महाराष्ट्राचे राज्यपाल: सी. पी. राधाकृष्णन (मुंबई उच्च न्यायालयाचे मुख्य न्यायाधीश त्यांना शपथ देतात - कलम १५९).'
      ],
      pointsEn: [
        '16th FC Chairman: Dr. Arvind Panagariya.',
        'Recommendation tenure: 1 April 2026 to 31 March 2031 (5 years).',
        '15th FC Chairman: N.K. Singh.',
        'Maharashtra Governor: C.P. Radhakrishnan (Oath administered by Bombay HC Chief Justice under Art 159).'
      ]
    },
    mpscTrapNoteMr: 'वित्त आयोगाच्या शिफारशींचा कार्यकाळ २०२६ ते २०३१ आहे. १५ वा आयोग २०२५-२६ पर्यंत लागू आहे. वर्षांमध्ये फसणे टाळा!',
    mpscTrapNoteEn: 'Tenure of 16th FC is 2026-2031, not 2024-2029.',
    officialReference: 'वित्त मंत्रालय (राजपत्र अधिसूचना) व राजभवन मुंबई',
    difficulty: 'Hard',
    highYieldBadgeMr: '🏛️ राज्यव्यवस्था व अर्थव्यवस्था',
    highYieldBadgeEn: 'Polity & Finance Commission'
  },

  // 10. AWARDS (पुरस्कार) - दादासाहेब फाळके व ज्ञानपीठ पुरस्कार
  {
    id: 'mca_award_02',
    year: 2025,
    month: 10,
    monthNameMr: 'ऑक्टोबर २०२५',
    monthNameEn: 'October 2025',
    category: 'awards',
    categoryLabelMr: '🏆 पुरस्कार व सन्मान',
    categoryLabelEn: 'Awards & Honours',
    titleMr: 'दादासाहेब फाळके पुरस्कार (मिथुन चक्रवर्ती) व ५८ वा ज्ञानपीठ पुरस्कार',
    titleEn: 'Dadasaheb Phalke Award to Mithun Chakraborty & 58th Jnanpith Award',
    leadContextMr: 'साहित्य व सिनेसृष्टीतील सर्वोच्च पुरस्कारांबाबत खालील विधानांचा विचार करा:',
    leadContextEn: 'Consider the top cultural and literary awards:',
    statements: [
      {
        label: 'अ',
        textMr: 'भारतीय चित्रपटसृष्टीतील सर्वोच्च मानला जाणारा ५४ वा दादासाहेब फाळके पुरस्कार ज्येष्ठ अभिनेते मिथुन चक्रवर्ती यांना प्रदान करण्यात आला.',
        textEn: 'Veteran actor Mithun Chakraborty was conferred the 54th Dadasaheb Phalke Lifetime Achievement Award.',
        isCorrect: true,
        factExplanationMr: 'सत्य: ७० व्या राष्ट्रीय चित्रपट पुरस्कार सोहळ्यात मिथुन चक्रवर्ती यांना ५४ वा दादासाहेब फाळके पुरस्कार (२०२२ वर्षासाठीचा) राष्ट्रपती द्रौपदी मुर्मू यांच्या हस्ते प्रदान करण्यात आला.',
        factExplanationEn: 'True: Conferred at the 70th National Film Awards by President Droupadi Murmu.'
      },
      {
        label: 'ब',
        textMr: 'दादासाहेब फाळके पुरस्काराचे पहिले मानकरी १९६९ मध्ये देविका राणी या होत्या.',
        textEn: 'The first recipient of Dadasaheb Phalke Award in 1969 was Devika Rani.',
        isCorrect: true,
        factExplanationMr: 'सत्य: १९६९ मध्ये फाळके पुरस्काराची स्थापना झाली आणि पहिल्या मानकरी देविका राणी चौधरी होत्या.',
        factExplanationEn: 'True: Instituted in 1969; first winner was Devika Rani.'
      },
      {
        label: 'क',
        textMr: '५८ वा ज्ञानपीठ पुरस्कार प्रसिद्ध उर्दू कवी गुलजार आणि संस्कृत विद्वान जगद्गुरू रामभद्राचार्य यांना संयुक्तपणे जाहीर झाला.',
        textEn: 'The 58th Jnanpith Award was jointly conferred upon renowned Urdu poet Gulzar and Sanskrit scholar Jagadguru Rambhadracharya.',
        isCorrect: true,
        factExplanationMr: 'सत्य: ज्ञानपीठ निवड समितीने उर्दू आणि संस्कृत या दोन भाषांतील दिग्गजांना ५८ वा पुरस्कार प्रदान केला (संस्कृत भाषेला दुसऱ्यांदा, तर उर्दूला पाचव्यांदा).',
        factExplanationEn: 'True: Jointly awarded for Urdu (Gulzar) and Sanskrit (Rambhadracharya).'
      },
      {
        label: 'ड',
        textMr: 'मराठी भाषेला आजपर्यंत ५ वेळा ज्ञानपीठ पुरस्कार मिळालेला आहे.',
        textEn: 'Marathi language has received the Jnanpith Award 5 times so far.',
        isCorrect: false,
        factExplanationMr: 'असत्य: मराठी भाषेला आजपर्यंत ४ वेळा ज्ञानपीठ मिळाला आहे: १. वि. स. खांडेकर (ययाति - १९७४), २. वि. वा. शिरवाडकर/कुसुमाग्रज (१९८७), ३. विंदा करंदीकर (२००३), ४. भालचंद्र नेमाडे (हिंदू - २०१४). ५ वेळा नाही.',
        factExplanationEn: 'False: Marathi has received Jnanpith 4 times (Khandekar, Kusumagraj, Karandikar, Nemade).'
      }
    ],
    questionPromptMr: 'वरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionPromptEn: 'Which of the statements given above are correct?',
    optionsMr: [
      '१) केवळ अ आणि ब योग्य',
      '२) केवळ अ, ब आणि क योग्य',
      '३) केवळ क आणि ड योग्य',
      '४) सर्व विधाने योग्य'
    ],
    optionsEn: [
      '1) Only A and B are correct',
      '2) Only A, B and C are correct',
      '3) Only C and D are correct',
      '4) All statements are correct'
    ],
    correctAnswerIndex: 1,
    reverseLearningFacts: {
      headlineMr: 'साहित्य व सिनेमा पुरस्कार रिव्हर्स लर्निंग टेबल',
      headlineEn: 'Literature & Cinema Laureates Matrix',
      pointsMr: [
        'फाळके पुरस्कार २०२४ (५४ वा): मिथुन चक्रवर्ती (स्वरुप: सुवर्ण कमळ, शाल व ₹१५ लाख रोख).',
        'फाळके पहिले मानकरी: देविका राणी (१९६९).',
        '५८ वा ज्ञानपीठ: गुलजार (उर्दू) + जगद्गुरू रामभद्राचार्य (संस्कृत).',
        'मराठी ज्ञानपीठ मानकरी (४): खांडेकर (१९७४), कुसुमाग्रज (१९८७), विंदा करंदीकर (२००३), भालचंद्र नेमाडे (२०१४).'
      ],
      pointsEn: [
        '54th Phalke Award: Mithun Chakraborty (Swarna Kamal + ₹15 Lakh).',
        'First Phalke: Devika Rani (1969).',
        '58th Jnanpith: Gulzar & Jagadguru Rambhadracharya.',
        'Marathi Jnanpith Winners (4): V.S. Khandekar, Kusumagraj, Vinda Karandikar, Bhalchandra Nemade.'
      ]
    },
    mpscTrapNoteMr: 'मराठीतील ज्ञानपीठ विजेते ४ च आहेत! आयोग बऱ्याचदा ५ वा विजेता झाल्याचा खोटा पर्याय देतो. ४ नावे तोंडपाठ ठेवा: खांडेकर, कुसुमाग्रज, करंदीकर, नेमाडे.',
    mpscTrapNoteEn: 'Marathi has exactly 4 Jnanpith laureates. Watch out for traps stating 5.',
    officialReference: 'भारतीय ज्ञानपीठ ट्रस्ट व माहिती आणि प्रसारण मंत्रालय (MIB)',
    difficulty: 'Moderate',
    highYieldBadgeMr: '📚 साहित्य व कला विशेष',
    highYieldBadgeEn: 'Literature & Cinema'
  },

  // 11. SCHEMES (योजना) - पीएम सूर्यघर: मोफत वीज योजना व नमो शेतकरी
  {
    id: 'mca_scheme_02',
    year: 2025,
    month: 2,
    monthNameMr: 'फेब्रुवारी २०२५',
    monthNameEn: 'February 2025',
    category: 'schemes',
    categoryLabelMr: '🏛️ शासकीय योजना व धोरणे',
    categoryLabelEn: 'Government Schemes & Policies',
    titleMr: 'पीएम सूर्य घर: मोफत वीज योजना व नमो शेतकरी महासन्मान निधी',
    titleEn: 'PM Surya Ghar Muft Bijli Yojana & Namo Shetkari Mahasanman',
    leadContextMr: 'ऊर्जा व शेतकरी सक्षमीकरण योजनांबाबत खालील विधाने विचारात घ्या:',
    leadContextEn: 'Consider the following statements regarding energy and farmer welfare initiatives:',
    statements: [
      {
        label: 'अ',
        textMr: '"पीएम सूर्य घर: मोफत वीज योजना" अंतर्गत देशभरातील १ कोटी घरांवर रुफटॉप सोलर पॅनेल बसवून दरमहा ३०० युनिट मोफत वीज देण्याचे उद्दिष्ट आहे.',
        textEn: 'PM Surya Ghar scheme aims to install rooftop solar panels on 1 crore households providing up to 300 units free electricity monthly.',
        isCorrect: true,
        factExplanationMr: 'सत्य: फेब्रुवारी २०२४ मध्ये पंतप्रधान नरेंद्र मोदी यांनी ₹७५,०२१ कोटी खर्चाची ही महत्त्वाकांक्षी योजना १ कोटी घरांसाठी सुरू केली.',
        factExplanationEn: 'True: Launched with ₹75,021 Cr outlay for 1 crore homes giving up to 300 units free power.'
      },
      {
        label: 'ब',
        textMr: 'पीएम सूर्य घर योजनेत २ किलोवॅट पर्यंतच्या यंत्रणेसाठी कमाल ₹६०,००० तर ३ किलोवॅट किंवा अधिकसाठी कमाल ₹७८,००० पर्यंत थेट केंद्रीय अनुदान (Subsidy) मिळते.',
        textEn: 'Provides central subsidy up to ₹60,000 for 2kW systems and ₹78,000 for 3kW or higher systems.',
        isCorrect: true,
        factExplanationMr: 'सत्य: १ kW साठी ₹३०,०००, २ kW साठी ₹६०,००० आणि ३ kW वरील क्षमतेसाठी कमाल ₹७८,००० थेट खात्यात सबसिडी मिळते.',
        factExplanationEn: 'True: ₹30k for 1kW, ₹60k for 2kW, and capped at ₹78k for 3kW+.'
      },
      {
        label: 'क',
        textMr: 'महाराष्ट्र शासनाच्या "नमो शेतकरी महासन्मान निधी" योजनेद्वारे शेतकऱ्यांना दरमहा ₹६,००० (वार्षिक ₹७२,०००) दिले जातात.',
        textEn: 'Under Namo Shetkari Yojana, farmers receive ₹6,000 per month (total ₹72,000 annually).',
        isCorrect: false,
        factExplanationMr: 'असत्य: नमो शेतकरी योजनेत दरमहा ₹६,००० नसून दरवर्षी ₹६,००० (दर ४ महिन्यांनी ₹२,००० चे तीन हप्ते) दिले जातात. केंद्राचे ₹६,००० + राज्याचे ₹६,००० मिळून एकूण वार्षिक ₹१२,००० शेतकऱ्यांना मिळतात.',
        factExplanationEn: 'False: It is ₹6,000 per year (not per month). Combined with PM-KISAN, farmers get ₹12,000 per year.'
      },
      {
        label: 'ड',
        textMr: 'महाराष्ट्र हे रुफटॉप सोलरच्या अंमलबजावणीमध्ये आणि सौर कृषी पंपांच्या वाटपात देशात आघाडीच्या राज्यांमध्ये समाविष्ट आहे.',
        textEn: 'Maharashtra is among the leading states in rooftop solar adoption and solar agri-pump distribution.',
        isCorrect: true,
        factExplanationMr: 'सत्य: मागेल त्याला सौर कृषी पंप (कुसुम योजना व महावितरण) अंतर्गत महाराष्ट्राने देशभरात सर्वाधिक सौर कृषी पंप वाटपाचा टप्पा गाठला आहे.',
        factExplanationEn: 'True: Maharashtra leads in solar agri-pumps and PM-KUSUM implementation.'
      }
    ],
    questionPromptMr: 'वरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionPromptEn: 'Which of the statements given above are correct?',
    optionsMr: [
      '१) केवळ अ आणि ब योग्य',
      '२) केवळ अ, ब आणि ड योग्य',
      '३) केवळ क आणि ड योग्य',
      '४) सर्व विधाने योग्य'
    ],
    optionsEn: [
      '1) Only A and B are correct',
      '2) Only A, B and D are correct',
      '3) Only C and D are correct',
      '4) All statements are correct'
    ],
    correctAnswerIndex: 1,
    reverseLearningFacts: {
      headlineMr: 'सौर ऊर्जा व कृषी योजना रिव्हर्स लर्निंग टेबल',
      headlineEn: 'Solar & Agri Welfare Schemes Matrix',
      pointsMr: [
        'पीएम सूर्य घर: १ कोटी कुटुंबे • ३०० युनिट दरमहा मोफत • कमाल ₹७८,००० सबसिडी.',
        'नमो शेतकरी योजना (महाराष्ट्र): वार्षिक ₹६,००० (३ हप्त्यांमध्ये).',
        'पीएम-किसान (केंद्र): वार्षिक ₹६,००० (३ हप्त्यांमध्ये).',
        'एकूण शेतकरी लाभ: वार्षिक ₹१२,००० (केंद्राचे ६ हजार + राज्याचे ६ हजार).'
      ],
      pointsEn: [
        'PM Surya Ghar: 1 crore homes • 300 free monthly units • max ₹78k subsidy.',
        'Namo Shetkari (Maha): ₹6,000/year.',
        'PM-KISAN (Centre): ₹6,000/year.',
        'Combined Annual Benefit: ₹12,000/year directly to farmers.'
      ]
    },
    mpscTrapNoteMr: 'नमो शेतकरी योजनेची रक्कम "दरमहा ₹६,०००" नसून "वार्षिक ₹६,०००" आहे. प्रति महिना की प्रति वर्ष हा शब्द बारकाईने वाचा!',
    mpscTrapNoteEn: 'Watch words: "per month" vs "per year" trap in welfare amounts.',
    officialReference: 'नवीन व नवीकरणीय ऊर्जा मंत्रालय (MNRE) व कृषी विभाग, महाराष्ट्र शासन',
    difficulty: 'Moderate',
    highYieldBadgeMr: '⚡ ऊर्जा व कृषी योजना',
    highYieldBadgeEn: 'Solar & Agri Schemes'
  },

  // 12. ENVIRONMENT & HERITAGE (पर्यावरण व वारसा) - मराठा सैनिकी किल्ले युनेस्को नामांकन
  {
    id: 'mca_env_02',
    year: 2025,
    month: 7,
    monthNameMr: 'जुलै २०२५',
    monthNameEn: 'July 2025',
    category: 'environment',
    categoryLabelMr: '🌿 पर्यावरण व जागतिक परिषदा',
    categoryLabelEn: 'Environment & Climate Summits',
    titleMr: 'मराठा सैनिकी लँडस्केप्स: युनेस्को जागतिक वारसा नामांकन व चराईदेव मोईदाम्स',
    titleEn: 'Maratha Military Landscapes UNESCO Nomination & Charaideo Moidams',
    leadContextMr: 'भारतातील जागतिक वारसा स्थळे व सांस्कृतिक घडामोडींबाबत खालील विधाने विचारात घ्या:',
    leadContextEn: 'Consider the following statements regarding India\'s World Heritage Sites:',
    statements: [
      {
        label: 'अ',
        textMr: 'भारताने २०२४-२५ या वर्षासाठी "मराठा सैनिकी लँडस्केप्स" (Maratha Military Landscapes) ची युनेस्को जागतिक वारसा यादीसाठी अधिकृत शिफारस केली आहे.',
        textEn: 'India officially nominated "Maratha Military Landscapes" for the UNESCO World Heritage List for 2024-25.',
        isCorrect: true,
        factExplanationMr: 'सत्य: छत्रपती शिवाजी महाराजांच्या काळातील लष्करी वास्तुकलेचे दर्शन घडवणारे १२ किल्ले यात समाविष्ट आहेत.',
        factExplanationEn: 'True: 12 forts reflecting Shivaji Maharaj\'s defensive military prowess were nominated.'
      },
      {
        label: 'ब',
        textMr: 'या नामांकनात समाविष्ट असणारे सर्व १२ किल्ले केवळ महाराष्ट्र राज्याच्या भौगोलिक हद्दीतच स्थित आहेत.',
        textEn: 'All 12 forts included in this nomination are located strictly within Maharashtra state borders.',
        isCorrect: false,
        factExplanationMr: 'असत्य: १२ किल्ल्यांपैकी ११ किल्ले महाराष्ट्रात आहेत (उदा. साल्हेर, शिवनेरी, लोहगड, खांदेरी, रायगड, राजगढ, प्रतापगड, सुवर्णदुर्ग, पन्हाळा, विजयदुर्ग, सिंधुदुर्ग) तर १ किल्ला तामिळनाडू राज्यातील "जिंजी" (Gingee Fort) आहे.',
        factExplanationEn: 'False: 11 forts are in Maharashtra, but 1 fort (Gingee Fort) is in Tamil Nadu.'
      },
      {
        label: 'क',
        textMr: 'नवी दिल्ली येथे जुलै २०२४ मध्ये पार पडलेल्या युनेस्कोच्या ४६ व्या जागतिक वारसा समितीच्या बैठकीत आसामच्या "चराईदेव मोईदाम्स" चा जागतिक वारसा यादीत समावेश करण्यात आला.',
        textEn: 'At the 46th UNESCO World Heritage Committee meeting in New Delhi in July 2024, Assam\'s "Charaideo Moidams" was inscribed on the World Heritage List.',
        isCorrect: true,
        factExplanationMr: 'सत्य: अहोम राजवंशाची ही समाधीस्थळे (Mounds) भारताचे ४३ वे जागतिक वारसा स्थळ ठरले आणि भारताने प्रथमच युनेस्को जागतिक वारसा समितीचे यजमानपद भूषवले.',
        factExplanationEn: 'True: Charaideo Moidams became India\'s 43rd World Heritage site during the 46th session hosted in New Delhi.'
      },
      {
        label: 'ड',
        textMr: 'भारतात सध्या एकूण ४३ युनेस्को जागतिक वारसा स्थळे (३५ सांस्कृतिक, ७ नैसर्गिक आणि १ मिश्र) आहेत.',
        textEn: 'India currently has 43 UNESCO World Heritage Sites (35 Cultural, 7 Natural, and 1 Mixed).',
        isCorrect: true,
        factExplanationMr: 'सत्य: चराईदेव मोईदाम्सचा समावेश झाल्याने भारताची संख्या ४३ झाली (१ मिश्र स्थळ सिक्कीमचे कांचनगंगा राष्ट्रीय उद्यान आहे).',
        factExplanationEn: 'True: 43 sites total (35 cultural, 7 natural, 1 mixed Khangchendzonga).'
      }
    ],
    questionPromptMr: 'वरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionPromptEn: 'Which of the statements given above are correct?',
    optionsMr: [
      '१) केवळ अ, ब आणि क योग्य',
      '२) केवळ अ, क आणि ड योग्य',
      '३) केवळ ब आणि ड योग्य',
      '४) सर्व विधाने योग्य'
    ],
    optionsEn: [
      '1) Only A, B and C are correct',
      '2) Only A, C and D are correct',
      '3) Only B and D are correct',
      '4) All statements are correct'
    ],
    correctAnswerIndex: 1,
    reverseLearningFacts: {
      headlineMr: 'युनेस्को वारसा स्थळे रिव्हर्स लर्निंग टेबल',
      headlineEn: 'UNESCO World Heritage Sites Matrix',
      pointsMr: [
        '४३ वे जागतिक वारसा स्थळ: चराईदेव मोईदाम्स (अहोम राजवंश, आसाम - सांस्कृतिक).',
        '४२ वे: होयसळांची पवित्र मंदिरे (कर्नाटक).',
        '४१ वे: शांतिनिकेतन (पश्चिम बंगाल).',
        'मराठा सैनिकी लँडस्केप्स: १२ किल्ले (११ महाराष्ट्रात + १ तामिळनाडूतील जिंजी किल्ला).',
        'भारतातील एकमेव मिश्र वारसा स्थळ: कांचनगंगा राष्ट्रीय उद्यान (सिक्कीम).'
      ],
      pointsEn: [
        '43rd Site: Charaideo Moidams (Ahom Dynasty, Assam).',
        '42nd Site: Sacred Ensembles of the Hoysalas (Karnataka).',
        '41st Site: Santiniketan (West Bengal).',
        'Maratha Forts Nomination: 11 in Maharashtra + 1 Gingee Fort in Tamil Nadu.',
        'Only Mixed Site: Khangchendzonga National Park (Sikkim).'
      ]
    },
    mpscTrapNoteMr: '१२ किल्ले केवळ महाराष्ट्रात नाहीत! ११ महाराष्ट्रात आहेत आणि १ अत्यंत महत्त्वाचा जिंजी किल्ला तामिळनाडूमध्ये आहे. हा MPSC चा खात्रीशीर ट्रॅप आहे!',
    mpscTrapNoteEn: 'Gingee Fort is in Tamil Nadu, not Maharashtra! 11 are in Maharashtra, 1 in TN.',
    officialReference: 'पुरातत्व सर्वेक्षण विभाग (ASI) व UNESCO जागतिक वारसा केंद्र',
    difficulty: 'Hard',
    highYieldBadgeMr: '🏰 इतिहास व वारसा विशेष',
    highYieldBadgeEn: 'Heritage & History'
  },

  // 13. SCIENCE & DEFENCE (संरक्षण) - अग्नि-५ MIRV मिशन दिव्यास्त्र
  {
    id: 'mca_def_01',
    year: 2025,
    month: 3,
    monthNameMr: 'मार्च २०२५',
    monthNameEn: 'March 2025',
    category: 'science_tech',
    categoryLabelMr: '🚀 विज्ञान, तंत्रज्ञान व संरक्षण',
    categoryLabelEn: 'Science, Tech & Defence',
    titleMr: 'अग्नि-५ क्षेपणास्त्र: "मिशन दिव्यास्त्र" व MIRV तंत्रज्ञानाची पहिली यशस्वी चाचणी',
    titleEn: 'Agni-5 Missile "Mission Divyastra" & MIRV Technology Milestone',
    leadContextMr: 'DRDO च्या "मिशन दिव्यास्त्र" आणि अग्नि-५ क्षेपणास्त्राबाबत खालील विधाने विचारात घ्या:',
    leadContextEn: 'Consider the following statements regarding Mission Divyastra and Agni-5 MIRV missile:',
    statements: [
      {
        label: 'अ',
        textMr: 'भारताने ११ मार्च २०२४ रोजी स्वदेशी MIRV (मल्टिपल इंडिपेंडंटली टार्गेटेबल री-एन्ट्री व्हेईकल) तंत्रज्ञानासह अग्नि-५ क्षेपणास्त्राची पहिली यशस्वी उड्डाण चाचणी घेतली.',
        textEn: 'India conducted the first successful flight test of Agni-5 with indigenous MIRV technology on 11 March 2024.',
        isCorrect: true,
        factExplanationMr: 'सत्य: ओडिशातील डॉ. ए. पी. जे. अब्दुल कलाम बेटावरून (चांदीपूर) ही ऐतिहासिक चाचणी यशस्वीरीत्या पार पडली.',
        factExplanationEn: 'True: Successfully tested from Dr APJ Abdul Kalam Island, Odisha on 11 March 2024.'
      },
      {
        label: 'ब',
        textMr: 'MIRV तंत्रज्ञानामुळे एकाच क्षेपणास्त्रातून एकाच वेळी वेगवेगळ्या लक्ष्यांवर अनेक अण्वस्त्रे (Warheads) अचूक डागणे शक्य होते.',
        textEn: 'MIRV technology allows a single missile to deliver multiple nuclear warheads targeted at distinct locations.',
        isCorrect: true,
        factExplanationMr: 'सत्य: MIRV म्हणजे मल्टिपल इंडिपेंडंटली टार्गेटेबल री-एन्ट्री व्हेईकल, ज्यामुळे एकाच क्षेपणास्त्राद्वारे शेकडो किलोमीटर अंतरावरील वेगवेगळ्या शत्रू तळांना एकाच वेळी उद्ध्वस्त करता येते.',
        factExplanationEn: 'True: Enables single booster to deploy multiple warheads across wide geography.'
      },
      {
        label: 'क',
        textMr: 'अग्नि-५ हे द्रव इंधनावर चालणारे क्रूझ क्षेपणास्त्र (Liquid fuel Cruise Missile) असून त्याचा पल्ला केवळ १,५०० किमी आहे.',
        textEn: 'Agni-5 is a liquid-fueled cruise missile with an operational range of only 1,500 km.',
        isCorrect: false,
        factExplanationMr: 'असत्य: अग्नि-५ हे ३-टप्प्यांचे घन इंधनावर (Solid propellant) चालणारे आंतरखंडीय बॅलिस्टिक क्षेपणास्त्र (ICBM) असून त्याचा पल्ला ५,००० किमी पेक्षा जास्त आहे.',
        factExplanationEn: 'False: It is a 3-stage solid-fuel Intercontinental Ballistic Missile (ICBM) with range >5,000 km.'
      },
      {
        label: 'ड',
        textMr: 'MIRV तंत्रज्ञान असणाऱ्या देशांच्या एलिट क्लबमध्ये सामील होणारा भारत हा जगातील केवळ ६ वा देश ठरला आहे.',
        textEn: 'India joined an elite club of just 6 nations possessing deployed or tested MIRV capability.',
        isCorrect: true,
        factExplanationMr: 'सत्य: अमेरिका, रशिया, चीन, ब्रिटन आणि फ्रान्स यांच्यानंतर MIRV क्षमता सिद्ध करणारा भारत हा जगातील सहावा देश ठरला.',
        factExplanationEn: 'True: India joined USA, Russia, China, UK and France in the elite MIRV capability club.'
      }
    ],
    questionPromptMr: 'वरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionPromptEn: 'Which of the statements given above are correct?',
    optionsMr: [
      '१) केवळ अ, ब आणि ड योग्य',
      '२) केवळ अ आणि ब योग्य',
      '३) केवळ ब आणि क योग्य',
      '४) सर्व विधाने योग्य'
    ],
    optionsEn: [
      '1) Only A, B and D are correct',
      '2) Only A and B are correct',
      '3) Only B and C are correct',
      '4) All statements are correct'
    ],
    correctAnswerIndex: 0,
    reverseLearningFacts: {
      headlineMr: 'मिशन दिव्यास्त्र व संरक्षण तंत्रज्ञान रिव्हर्स लर्निंग',
      headlineEn: 'Mission Divyastra Key Facts Matrix',
      pointsMr: [
        'मोहिमेचे नाव: "मिशन दिव्यास्त्र" (Mission Divyastra).',
        'विकासक: संरक्षण संशोधन व विकास संस्था (DRDO).',
        'प्रकार: ३-टप्पे घन इंधन ICBM (Intercontinental Ballistic Missile).',
        'पल्ला: ५,०००+ किलोमीटर (संपूर्ण आशिया आणि युरोपचा काही भाग कवेत).',
        'MIRV क्लब: अमेरिका, रशिया, चीन, फ्रान्स, ब्रिटन आणि भारत (६ देश).'
      ],
      pointsEn: [
        'Project Name: Mission Divyastra.',
        'Developer: DRDO.',
        'Propulsion: 3-stage solid fuel canisterised rocket.',
        'Range: 5,000+ km.',
        'Nations with MIRV: US, Russia, China, France, UK, and India.'
      ]
    },
    mpscTrapNoteMr: 'अग्नि-५ हे "क्रूझ" नसून "बॅलिस्टिक" क्षेपणास्त्र आहे आणि ते घन (Solid) इंधनावर चालते, द्रवावर नाही. हा विज्ञान व तंत्रज्ञानातील ठरलेला ट्रॅप आहे!',
    mpscTrapNoteEn: 'Agni-5 is a solid-fueled Ballistic missile (ICBM), not a liquid cruise missile.',
    officialReference: 'संरक्षण मंत्रालय (MoD) / DRDO अधिकृत प्रसिद्धीपत्रक',
    difficulty: 'Moderate',
    highYieldBadgeMr: '🛡️ डिफेन्स टेक्नॉलॉजी',
    highYieldBadgeEn: 'Defence Technology'
  },

  // 14. SPORTS (क्रीडा) - T20 विश्वचषक २०२४ (भारत विश्वविजेता)
  {
    id: 'mca_sports_03',
    year: 2025,
    month: 6,
    monthNameMr: 'जून २०२५',
    monthNameEn: 'June 2025',
    category: 'sports',
    categoryLabelMr: '🏅 क्रीडा घडामोडी',
    categoryLabelEn: 'Sports & Athletics',
    titleMr: 'ICC पुरुष T20 विश्वचषक २०२४: भारताचे ऐतिहासिक अजिंक्यपद',
    titleEn: 'ICC Men\'s T20 World Cup 2024: India Champions',
    leadContextMr: 'T20 विश्वचषक २०२४ च्या महाविजयाबाबत खालील विधाने विचारात घ्या:',
    leadContextEn: 'Consider the following statements on ICC Men\'s T20 World Cup 2024:',
    statements: [
      {
        label: 'अ',
        textMr: 'भारताने २९ जून २०२४ रोजी बार्बाडोस येथे झालेल्या अंतिम सामन्यात दक्षिण आफ्रिकेचा ७ धावांनी पराभव करून १७ वर्षांनंतर T20 विश्वचषक जिंकला.',
        textEn: 'India defeated South Africa by 7 runs in the final at Barbados on 29 June 2024 to win the T20 World Cup after 17 years.',
        isCorrect: true,
        factExplanationMr: 'सत्य: भारताने २००७ (धोनीच्या नेतृत्वाखाली) नंतर रोहित शर्माच्या नेतृत्वाखाली २०२४ मध्ये दुसरा T20 विश्वचषक जिंकला.',
        factExplanationEn: 'True: Won by 7 runs at Kensington Oval, Barbados under Rohit Sharma\'s captaincy.'
      },
      {
        label: 'ब',
        textMr: 'या स्पर्धेत भारतीय संघ संपूर्ण स्पर्धेत एकही सामना न गमावता अपराजित राहून विश्वचषक जिंकणारा जगातील पहिलाच संघ ठरला.',
        textEn: 'India became the first team in T20 World Cup history to win the trophy remaining entirely unbeaten.',
        isCorrect: true,
        factExplanationMr: 'सत्य: भारताने स्पर्धेतील सर्व ८ सामने जिंकून अपराजित राहण्याचा ऐतिहासिक विक्रम केला.',
        factExplanationEn: 'True: Won 8 out of 8 games without losing a single match.'
      },
      {
        label: 'क',
        textMr: 'अंतिम सामन्यातील सामनावीर (Player of the Match) हा जसप्रीत बुमराह ठरला.',
        textEn: 'Jasprit Bumrah was awarded the Player of the Match in the final.',
        isCorrect: false,
        factExplanationMr: 'असत्य: अंतिम सामन्यातील सामनावीर (Player of the Match) विराट कोहली (७६ धावा) ठरला, तर जसप्रीत बुमराहला "मालिकेचा सर्वोत्कृष्ट खेळाडू" (Player of the Tournament) हा पुरस्कार मिळाला.',
        factExplanationEn: 'False: Final Player of the Match was Virat Kohli (76 runs). Jasprit Bumrah won Player of the Tournament.'
      },
      {
        label: 'ड',
        textMr: 'विश्वचषक विजयानंतर कर्णधार रोहित शर्मा, विराट कोहली आणि रवींद्र जडेजा या तिघांनीही आंतरराष्ट्रीय T20 क्रिकेटमधून निवृत्ती जाहीर केली.',
        textEn: 'Post victory, Rohit Sharma, Virat Kohli and Ravindra Jadeja all announced retirement from international T20 cricket.',
        isCorrect: true,
        factExplanationMr: 'सत्य: या तिन्ही दिग्गजांनी T20 आंतरराष्ट्रीय क्रिकेटमधून निवृत्तीची घोषणा केली.',
        factExplanationEn: 'True: All three stalwarts retired from international T20Is.'
      }
    ],
    questionPromptMr: 'वरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionPromptEn: 'Which of the statements given above are correct?',
    optionsMr: [
      '१) केवळ अ आणि ब योग्य',
      '२) केवळ अ, ब आणि ड योग्य',
      '३) केवळ क आणि ड योग्य',
      '४) सर्व विधाने योग्य'
    ],
    optionsEn: [
      '1) Only A and B are correct',
      '2) Only A, B and D are correct',
      '3) Only C and D are correct',
      '4) All statements are correct'
    ],
    correctAnswerIndex: 1,
    reverseLearningFacts: {
      headlineMr: 'T20 विश्वचषक २०२४ रिव्हर्स लर्निंग फॅक्ट्स',
      headlineEn: 'T20 World Cup 2024 Fact Matrix',
      pointsMr: [
        'यजमान देश: वेस्ट इंडीज व अमेरिका (USA).',
        'विजेता: भारत (उपविजेता: दक्षिण आफ्रिका).',
        'अंतिम सामनावीर: विराट कोहली (७६ धावा).',
        'मालिकावीर: जसप्रीत बुमराह (१५ बळी, ४.१७ इकॉनॉमी).',
        'निवृत्ती: रोहित शर्मा, विराट कोहली, रवींद्र जडेजा.'
      ],
      pointsEn: [
        'Hosts: West Indies & USA.',
        'Final Player of Match: Virat Kohli.',
        'Player of Tournament: Jasprit Bumrah.',
        'Retirements: Rohit Sharma, Virat Kohli, Ravindra Jadeja from T20Is.'
      ]
    },
    mpscTrapNoteMr: 'फायनलचा "मॅन ऑफ द मॅच" (विराट कोहली) आणि पूर्ण मालिकेचा "प्लेअर ऑफ द टुर्नामेंट" (बुमराह) यात आयोग गफलत निर्माण करतो!',
    mpscTrapNoteEn: 'Player of Final = Virat Kohli; Player of Tournament = Jasprit Bumrah.',
    officialReference: 'आंतरराष्ट्रीय क्रिकेट परिषद (ICC) अधिकृत आकडेवारी',
    difficulty: 'Moderate',
    highYieldBadgeMr: '🏆 क्रिकेट विश्वचषक',
    highYieldBadgeEn: 'Cricket World Cup'
  },

  // 15. APPOINTMENTS & LAW (कायदा व नियुक्त्या) - निवडणूक आयुक्त कायदा २०२३
  {
    id: 'mca_appoint_03',
    year: 2025,
    month: 2,
    monthNameMr: 'फेब्रुवारी २०२५',
    monthNameEn: 'February 2025',
    category: 'appointments',
    categoryLabelMr: '👔 राष्ट्रीय व आंतरराष्ट्रीय नियुक्त्या',
    categoryLabelEn: 'Appointments & Persons',
    titleMr: 'मुख्य निवडणूक आयुक्त व निवडणूक आयुक्त नियुक्ती कायदा २०२३',
    titleEn: 'Chief Election Commissioner and Other Election Commissioners Act 2023',
    leadContextMr: 'संसदेने मंजूर केलेल्या निवडणूक आयुक्त नियुक्ती कायद्याबाबत खालील विधाने विचारात घ्या:',
    leadContextEn: 'Consider the provisions of the CEC and other ECs (Appointment and Conditions of Service) Act 2023:',
    statements: [
      {
        label: 'अ',
        textMr: 'नवीन कायद्यानुसार मुख्य निवडणूक आयुक्त व इतर आयुक्तांच्या निवडीसाठी ३ सदस्यीय निवड समिती (Selection Committee) गठीत केली जाते.',
        textEn: 'Under the new Act, a 3-member Selection Committee is formed for recommending appointments.',
        isCorrect: true,
        factExplanationMr: 'सत्य: १. पंतप्रधान (अध्यक्ष), २. लोकसभेतील विरोधी पक्षनेता किंवा सर्वात मोठ्या विरोधी पक्षाचा नेता, आणि ३. पंतप्रधानांनी नामनिर्देशित केलेला एक केंद्रीय कॅबिनेट मंत्री अशी ३ सदस्यीय समिती असते.',
        factExplanationEn: 'True: 3-member panel comprising PM (Chair), Leader of Opposition/Single Largest Party in Lok Sabha, and a Union Cabinet Minister.'
      },
      {
        label: 'ब',
        textMr: 'या निवड समितीत भारताच्या सरन्यायाधीशांचा (CJI) पदसिद्ध सदस्य म्हणून समावेश अनिवार्य करण्यात आला आहे.',
        textEn: 'The Chief Justice of India (CJI) is mandated as an ex-officio member of this Selection Committee.',
        isCorrect: false,
        factExplanationMr: 'असत्य: सर्वोच्च न्यायालयाच्या अनूप बरनवाल खटल्यातील निकालात CJI चा समावेश होता, मात्र संसदेने संमत केलेल्या नवीन २०२३ च्या कायद्यातून भारताच्या सरन्यायाधीशांना (CJI) वगळण्यात आले असून त्यांच्या जागी केंद्रीय कॅबिनेट मंत्र्याचा समावेश करण्यात आला आहे.',
        factExplanationEn: 'False: The 2023 Act excluded the CJI, replacing the judicial seat with a nominated Union Cabinet Minister.'
      },
      {
        label: 'क',
        textMr: 'ज्ञानेश कुमार आणि सुखबीर सिंग संधू यांची नवीन कायद्यानुसार मार्च २०२४ मध्ये निवडणूक आयुक्त म्हणून नियुक्ती झाली.',
        textEn: 'Gyanesh Kumar and Sukhbir Singh Sandhu were appointed as Election Commissioners in March 2024 under this framework.',
        isCorrect: true,
        factExplanationMr: 'सत्य: पंतप्रधान नरेंद्र मोदी यांच्या अध्यक्षतेखालील निवड समितीने ज्ञानेश कुमार व सुखबीर संधू यांची नियुक्ती केली.',
        factExplanationEn: 'True: Appointed by the PM-led committee in March 2024.'
      },
      {
        label: 'ड',
        textMr: 'निवडणूक आयुक्तांचा कार्यकाळ ६ वर्षे किंवा वयाची ६५ वर्षे (जे आधी पूर्ण होईल ते) असाच कायम ठेवण्यात आला आहे.',
        textEn: 'The tenure remains 6 years or until reaching 65 years of age, whichever is earlier.',
        isCorrect: true,
        factExplanationMr: 'सत्य: कार्यकाळ ६ वर्षे किंवा ६५ वर्षे वय हेच राहील, तसेच त्यांचे वेतन कॅबिनेट सचिवाच्या समतुल्य ठरवले गेले.',
        factExplanationEn: 'True: Term remains 6 years or age 65, whichever is earlier.'
      }
    ],
    questionPromptMr: 'वरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionPromptEn: 'Which of the statements given above are correct?',
    optionsMr: [
      '१) केवळ अ, ब आणि क योग्य',
      '२) केवळ अ, क आणि ड योग्य',
      '३) केवळ ब आणि ड योग्य',
      '४) सर्व विधाने योग्य'
    ],
    optionsEn: [
      '1) Only A, B and C are correct',
      '2) Only A, C and D are correct',
      '3) Only B and D are correct',
      '4) All statements are correct'
    ],
    correctAnswerIndex: 1,
    reverseLearningFacts: {
      headlineMr: 'निवडणूक आयोग कायदा २०२३ रिव्हर्स मॅट्रिक्स',
      headlineEn: 'Election Commission 2023 Act Facts',
      pointsMr: [
        'निवड समिती सदस्य (३): पंतप्रधान (अध्यक्ष), विरोधी पक्षनेता, केंद्रीय कॅबिनेट मंत्री (CJI चा समावेश नाही!).',
        'शोध समिती (Search Committee): केंद्रीय विधी मंत्र्यांच्या अध्यक्षतेखालील ५ नावांचे पॅनेल तयार करते.',
        'नवे आयुक्त: ज्ञानेश कुमार आणि डॉ. सुखबीर सिंग संधू.',
        'घटनात्मक तरतूद: कलम ३२४ (भारताचे निवडणूक आयोग).'
      ],
      pointsEn: [
        'Selection Committee (3): PM, Leader of Opposition, Union Cabinet Minister (CJI excluded).',
        'Search Committee: Headed by Law Minister.',
        'Appointed Commissioners: Gyanesh Kumar & Sukhbir Singh Sandhu.',
        'Constitutional provision: Article 324.'
      ]
    },
    mpscTrapNoteMr: 'नवीन कायद्यात भारताचे सरन्यायाधीश (CJI) निवड समितीत नाहीत! हा सध्याचा सर्वात वादग्रस्त आणि MPSC चा सर्वात जास्त विचारला जाणारा प्रश्न आहे.',
    mpscTrapNoteEn: 'CJI is NOT in the selection committee under the 2023 Act. Do not confuse with Supreme Court\'s earlier interim ruling.',
    officialReference: 'विधि व न्याय मंत्रालय / भारत सरकार राजपत्र २०२३',
    difficulty: 'Hard',
    highYieldBadgeMr: '⚖️ कायदा व राज्यघटना विशेष',
    highYieldBadgeEn: 'Constitutional Law'
  },

  // 16. SCHEMES (शासकीय योजना) - लेक लाडकी योजना (महाराष्ट्र)
  {
    id: 'mca_scheme_03',
    year: 2025,
    month: 4,
    monthNameMr: 'एप्रिल २०२५',
    monthNameEn: 'April 2025',
    category: 'schemes',
    categoryLabelMr: '🏛️ शासकीय योजना व धोरणे',
    categoryLabelEn: 'Government Schemes & Policies',
    titleMr: 'लेक लाडकी योजना: मुलींसाठी १ लाख १ हजार रुपयांचे आर्थिक संरक्षण (महाराष्ट्र)',
    titleEn: 'Lek Ladki Yojana: ₹1,01,000 Financial Security for Girl Child',
    leadContextMr: 'महाराष्ट्र शासनाच्या "लेक लाडकी" योजनेबाबत खालील विधाने विचारात घ्या:',
    leadContextEn: 'Consider the details of Maharashtra\'s "Lek Ladki Yojana":',
    statements: [
      {
        label: 'अ',
        textMr: 'लेक लाडकी योजनेचा लाभ १ एप्रिल २०२३ नंतर जन्मलेल्या मुलींना पिवळे व केशरी रेशनकार्डधारक कुटुंबांसाठी दिला जातो.',
        textEn: 'Lek Ladki Yojana benefits are applicable for girl children born on or after 1 April 2023 in yellow and orange ration card families.',
        isCorrect: true,
        factExplanationMr: 'सत्य: १ एप्रिल २०२३ पासून जन्मलेल्या मुलींसाठी ही योजना लागू असून कुटुंब नियोजन शस्त्रक्रिया करणाऱ्या पालकांच्या दोन मुलींपर्यंत लाभ मिळतो.',
        factExplanationEn: 'True: Applicable for girls born on/after 1 April 2023 in yellow/orange ration card households.'
      },
      {
        label: 'ब',
        textMr: 'मुलगी जन्मल्यावर तिच्या बँक खात्यात तत्काळ ₹५,००० ची पहिली मदत दिली जाते.',
        textEn: 'Upon birth of girl child, the first financial assistance of ₹5,000 is credited.',
        isCorrect: true,
        factExplanationMr: 'सत्य: जन्मल्यावर ₹५,००० दिले जातात.',
        factExplanationEn: 'True: ₹5,000 on birth.'
      },
      {
        label: 'क',
        textMr: 'मुलगी १८ वर्षे वयाची पूर्ण झाल्यानंतर आणि १२ वी उत्तीर्ण झाल्यावर तिला एकरकमी ₹७५,००० चा अंतिम लाभ दिला जातो.',
        textEn: 'When the girl completes 18 years of age (unmarried), a lump sum of ₹75,000 is given.',
        isCorrect: true,
        factExplanationMr: 'सत्य: वयाच्या १८ व्या वर्षी मुलगी अविवाहित असल्यास तिला ₹७५,००० रोख दिले जातात, ज्यामुळे एकूण बेरीज ₹१,०१,००० होते.',
        factExplanationEn: 'True: ₹75,000 final payout at age 18 if unmarried.'
      },
      {
        label: 'ड',
        textMr: 'या योजनेत जन्मापासून १८ व्या वर्षापर्यंत मिळणारी एकूण आर्थिक मदत ₹२,५०,००० इतकी आहे.',
        textEn: 'The total cumulative financial assistance under this scheme amounts to ₹2,50,000.',
        isCorrect: false,
        factExplanationMr: 'असत्य: एकूण आर्थिक मदत ₹२,५०,००० नसून बरोबर ₹१,०१,००० (एक लाख एक हजार रुपये) इतकी आहे (जन्म ₹५००० + पहिली ₹६००० + सहावी ₹७००० + अकरावी ₹८००० + १८ वर्षे पूर्ण ₹७५००० = ₹१,०१,०००).',
        factExplanationEn: 'False: Total sum is exactly ₹1,01,000 (not ₹2,50,000).'
      }
    ],
    questionPromptMr: 'वरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionPromptEn: 'Which of the statements given above are correct?',
    optionsMr: [
      '१) केवळ अ, ब आणि क योग्य',
      '२) केवळ ब, क आणि ड योग्य',
      '३) केवळ अ आणि ड योग्य',
      '४) सर्व विधाने योग्य'
    ],
    optionsEn: [
      '1) Only A, B and C are correct',
      '2) Only B, C and D are correct',
      '3) Only A and D are correct',
      '4) All statements are correct'
    ],
    correctAnswerIndex: 0,
    reverseLearningFacts: {
      headlineMr: 'लेक लाडकी योजना टप्पे व रकमा (१,०१,००० रु)',
      headlineEn: 'Lek Ladki 5-Stage Disbursement Matrix',
      pointsMr: [
        '१ ला टप्पा: मुलगी जन्मल्यावर = ₹५,०००.',
        '२ रा टप्पा: इयत्ता पहिलीत प्रवेश = ₹६,०००.',
        '३ रा टप्पा: इयत्ता सहावीत प्रवेश = ₹७,०००.',
        '४ था टप्पा: इयत्ता अकरावीत प्रवेश = ₹८,०००.',
        '५ वा टप्पा: १८ वर्षे पूर्ण झाल्यावर (अविवाहित) = ₹७५,०००.',
        'एकूण एकूण लाभ: ₹१,०१,००० (१ लाख १ हजार रुपये).'
      ],
      pointsEn: [
        'Stage 1: Birth = ₹5,000.',
        'Stage 2: 1st Std entry = ₹6,000.',
        'Stage 3: 6th Std entry = ₹7,000.',
        'Stage 4: 11th Std entry = ₹8,000.',
        'Stage 5: Age 18 (unmarried) = ₹75,000.',
        'Grand Cumulative: Exactly ₹1,01,000.'
      ]
    },
    mpscTrapNoteMr: 'लेक लाडकी योजनेची एकूण रक्कम ₹१,०१,००० आहे. टप्पे क्रमाने लक्षात ठेवा: ५ हजार, ६ हजार, ७ हजार, ८ हजार आणि शेवटी ७५ हजार!',
    mpscTrapNoteEn: 'Total is ₹1,01,000 across 5 progressive milestones (5k + 6k + 7k + 8k + 75k).',
    officialReference: 'महिला व बालविकास विभाग, शासन निर्णय (GR) महाराष्ट्र शासन',
    difficulty: 'Moderate',
    highYieldBadgeMr: '👧 बाल व महिला कल्याण',
    highYieldBadgeEn: 'Child Welfare'
  },

  // 17. ECONOMY (अर्थव्यवस्था) - महाराष्ट्र अर्थसंकल्प २०२४-२५ / २०२५-२६
  {
    id: 'mca_eco_02',
    year: 2025,
    month: 6,
    monthNameMr: 'जून २०२५',
    monthNameEn: 'June 2025',
    category: 'economy',
    categoryLabelMr: '📈 आर्थिक घडामोडी व अर्थसंकल्प',
    categoryLabelEn: 'Economy, Budget & Banking',
    titleMr: 'महाराष्ट्र अर्थसंकल्प: "पंचसूत्री" विकास कार्यक्रम व १ ट्रिलियन डॉलर अर्थव्यवस्था',
    titleEn: 'Maharashtra State Budget: Panchasutri & $1 Trillion Economy Goal',
    leadContextMr: 'महाराष्ट्र शासनाच्या अर्थसंकल्प व आर्थिक धोरणाबाबत खालील विधाने विचारात घ्या:',
    leadContextEn: 'Consider the features of Maharashtra State Budget and economic vision:',
    statements: [
      {
        label: 'अ',
        textMr: 'महाराष्ट्र राज्याने देशातील पहिली १ ट्रिलियन डॉलर (1 Trillion Dollar) अर्थव्यवस्था बनण्याचे अधिकृत उद्दिष्ट ठेवले आहे.',
        textEn: 'Maharashtra has set an official target of becoming India\'s first $1 Trillion economy.',
        isCorrect: true,
        factExplanationMr: 'सत्य: देशाच्या GDP मध्ये महाराष्ट्राचा वाटा सर्वाधिक (सुमारे १४%) असून राज्याने १ ट्रिलियन डॉलरचे उद्दिष्ट साध्य करण्यासाठी आर्थिक सल्लागार परिषद (EAC) स्थापन केली आहे.',
        factExplanationEn: 'True: Maharashtra contributes ~14% to national GDP and established an Economic Advisory Council.'
      },
      {
        label: 'ब',
        textMr: 'महाराष्ट्र अर्थसंकल्पाची "पंचसूत्री" ही शेती, आरोग्य, मनुष्यबळ विकास, दळणवळण आणि उद्योग या ५ घटकांवर आधारित आहे.',
        textEn: 'The state budget\'s "Panchasutri" roadmap is anchored on Agriculture, Health, Human Resources, Transport, and Industry.',
        isCorrect: true,
        factExplanationMr: 'सत्य: पंचसूत्री अंतर्गत या पाचही महत्त्वाच्या क्षेत्रांसाठी विशेष भांडवली तरतूद घोषित करण्यात आली आहे.',
        factExplanationEn: 'True: Anchored on the five pillars of balanced socio-economic transformation.'
      },
      {
        label: 'क',
        textMr: 'महाराष्ट्रात वस्तू व सेवा कर (GST) संकलनात देशात उत्तर प्रदेश राज्य प्रथम क्रमांकावर असून महाराष्ट्र दुसऱ्या स्थानी आहे.',
        textEn: 'In Goods and Services Tax (GST) revenue collection, Uttar Pradesh ranks first and Maharashtra ranks second.',
        isCorrect: false,
        factExplanationMr: 'असत्य: जीएसटी संकलनात महाराष्ट्र राज्य देशात अखंडपणे पहिल्या (१ ल्या) क्रमांकावर आहे (देशातील एकूण जीएसटीच्या सुमारे १५% संकलन एकट्या महाराष्ट्रातून होते). उत्तर प्रदेश पहिल्या क्रमांकावर नाही.',
        factExplanationEn: 'False: Maharashtra consistently ranks #1 in India for GST collection (over 15% of national total).'
      },
      {
        label: 'ड',
        textMr: 'पालघर जिल्ह्यातील वाढवण बंदर (Vadhavan Port) सुमारे ₹७६,२२० कोटी खर्चाने उभारण्यात येत असून ते देशातील सर्वांत मोठे खोल सागरी बंदर ठरेल.',
        textEn: 'Vadhavan Port in Palghar is being developed at ~₹76,220 Cr as India\'s largest deep-water greenfield container port.',
        isCorrect: true,
        factExplanationMr: 'सत्य: वाढवण बंदर हा जेएनपीए आणि महाराष्ट्र मेरिटाइम बोर्ड यांचा संयुक्त प्रकल्प असून जगातील पहिल्या १० कंटेनर बंदरांमध्ये त्याचा समावेश होईल.',
        factExplanationEn: 'True: 20m natural depth, developed by JNPA (74%) and MMB (26%).'
      }
    ],
    questionPromptMr: 'वरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionPromptEn: 'Which of the statements given above are correct?',
    optionsMr: [
      '१) केवळ अ आणि ब योग्य',
      '२) केवळ अ, ब आणि ड योग्य',
      '३) केवळ क आणि ड योग्य',
      '४) सर्व विधाने योग्य'
    ],
    optionsEn: [
      '1) Only A and B are correct',
      '2) Only A, B and D are correct',
      '3) Only C and D are correct',
      '4) All statements are correct'
    ],
    correctAnswerIndex: 1,
    reverseLearningFacts: {
      headlineMr: 'महाराष्ट्र अर्थव्यवस्था व अर्थसंकल्प रिव्हर्स मॅट्रिक्स',
      headlineEn: 'Maharashtra Economy Key Benchmark Facts',
      pointsMr: [
        'जीडीपी वाटा: देशाच्या जीडीपीमध्ये ~१४% (देशात प्रथम).',
        'जीएसटी महसूल: देशात सलग प्रथम क्रमांक (दरमहा ₹२८,०००+ कोटी).',
        'वाढवण बंदर: पालघर जिल्हा • खर्च ₹७६,२२० कोटी • २० मीटर नैसर्गिक खोली.',
        'परकीय थेट गुंतवणूक (FDI): देशातील एकूण FDI पैकी ३०% हून अधिक आकर्षित करण्यात महाराष्ट्र अव्वल.'
      ],
      pointsEn: [
        'GDP Share: ~14% of India\'s GDP (#1 state).',
        'GST Revenue: Uncontested #1 in India.',
        'Vadhavan Mega Port: Palghar, ₹76,220 Cr outlay, 20m draft depth.',
        'FDI: Consistently #1 recipient in India.'
      ]
    },
    mpscTrapNoteMr: 'जीएसटी संकलनात महाराष्ट्र अव्वल आहे, कोणताही दुसरा राज्य त्याच्या पुढे नाही. तसेच वाढवण बंदर पालघर जिल्ह्यात आहे (रायगड किंवा ठाणे नाही)!',
    mpscTrapNoteEn: 'Maharashtra is undisputed #1 in GST revenue. Vadhavan port is in Palghar district.',
    officialReference: 'महाराष्ट्र आर्थिक पाहणी अहवाल (Economic Survey of Maharashtra) व वित्त विभाग',
    difficulty: 'Moderate',
    highYieldBadgeMr: '📈 महाराष्ट्र अर्थव्यवस्था',
    highYieldBadgeEn: 'Maharashtra Economy'
  },

  // 18. ENVIRONMENT & WILDLIFE (पर्यावरण व वन्यजीव) - आंतरराष्ट्रीय बिग कॅट्स अलायन्स (IBCA)
  {
    id: 'mca_env_03',
    year: 2025,
    month: 4,
    monthNameMr: 'एप्रिल २०२५',
    monthNameEn: 'April 2025',
    category: 'environment',
    categoryLabelMr: '🌿 पर्यावरण व जागतिक परिषदा',
    categoryLabelEn: 'Environment & Climate Summits',
    titleMr: 'आंतरराष्ट्रीय बिग कॅट्स अलायन्स (IBCA) व भारतातील व्याघ्र संवर्धन',
    titleEn: 'International Big Cat Alliance (IBCA) & Tiger Conservation Status',
    leadContextMr: 'भारताच्या पुढाकाराने स्थापन झालेली IBCA आणि वन्यजीव स्थितीबाबत खालील विधाने विचारात घ्या:',
    leadContextEn: 'Consider the details of International Big Cat Alliance (IBCA) and tiger conservation:',
    statements: [
      {
        label: 'अ',
        textMr: 'केंद्रीय मंत्रिमंडळाने फेब्रुवारी २०२४ मध्ये आंतरराष्ट्रीय बिग कॅट्स अलायन्स (IBCA) ची स्थापना भारतात मुख्यालयासह मंजूर केली.',
        textEn: 'Union Cabinet approved the establishment of International Big Cat Alliance (IBCA) with headquarters in India.',
        isCorrect: true,
        factExplanationMr: 'सत्य: भारताने ₹१५० कोटींच्या केंद्रीय साहाय्यासह ५ वर्षांसाठी IBCA ची स्थापना मंजूर केली.',
        factExplanationEn: 'True: Headquartered in India with ₹150 Crore budgetary support.'
      },
      {
        label: 'ब',
        textMr: 'IBCA मध्ये जगातील ७ प्रमुख बिग कॅट्स (वाघ, सिंह, बिबट्या, हिमबिबट्या, प्युमा, जग्वार आणि चित्ता) यांच्या संरक्षणावर भर दिला आहे.',
        textEn: 'IBCA focuses on conserving 7 major big cat species: Tiger, Lion, Leopard, Snow Leopard, Puma, Jaguar, and Cheetah.',
        isCorrect: true,
        factExplanationMr: 'सत्य: या सातही प्रजातींचे संरक्षण ९६ हून अधिक सदस्य देशांच्या सहकार्याने केले जाणार आहे.',
        factExplanationEn: 'True: 7 species covered across 96 range countries.'
      },
      {
        label: 'क',
        textMr: 'अखिल भारतीय व्याघ्र अंदाज अहवालानुसार भारतात सध्या जगातील ७५% हून अधिक जंगली वाघ असून देशात ३,६८२ वाघ आहेत.',
        textEn: 'According to All India Tiger Estimation, India holds over 75% of global wild tiger population with 3,682 tigers.',
        isCorrect: true,
        factExplanationMr: 'सत्य: मध्य प्रदेश (७८५ वाघ) देशात प्रथम क्रमांकावर असून महाराष्ट्र (४४४ वाघ) चौथ्या स्थानी आहे.',
        factExplanationEn: 'True: India hosts 3,682 tigers (~75% of world total); MP leads with 785; Maharashtra has 444.'
      },
      {
        label: 'ड',
        textMr: 'महाराष्ट्रात सध्या एकूण १२ व्याघ्र प्रकल्प (Tiger Reserves) कार्यरत आहेत.',
        textEn: 'Maharashtra currently has 12 operational Tiger Reserves.',
        isCorrect: false,
        factExplanationMr: 'असत्य: महाराष्ट्रात ६ व्याघ्र प्रकल्प आहेत (१२ नाहीत): १. मेळघाट (अमरावती), २. ताडोबा-अंधारी (चंद्रपूर), ३. पेंच (नागपूर), ४. सह्याद्री (पश्चिम महाराष्ट्र), ५. नवेगाव-नागझिरा (गोंदिया/भंडारा), आणि ६. बोर (वर्धा - देशातील सर्वात लहान व्याघ्र प्रकल्पांपैकी एक).',
        factExplanationEn: 'False: Maharashtra has exactly 6 Tiger Reserves (Melghat, Tadoba-Andhari, Pench, Sahyadri, Nawegaon-Nagzira, Bor).'
      }
    ],
    questionPromptMr: 'वरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionPromptEn: 'Which of the statements given above are correct?',
    optionsMr: [
      '१) केवळ अ, ब आणि क योग्य',
      '२) केवळ ब, क आणि ड योग्य',
      '३) केवळ अ आणि ड योग्य',
      '४) सर्व विधाने योग्य'
    ],
    optionsEn: [
      '1) Only A, B and C are correct',
      '2) Only B, C and D are correct',
      '3) Only A and D are correct',
      '4) All statements are correct'
    ],
    correctAnswerIndex: 0,
    reverseLearningFacts: {
      headlineMr: 'व्याघ्र व वन्यजीव संवर्धन रिव्हर्स लर्निंग टेबल',
      headlineEn: 'Tiger & Wildlife Conservation Matrix',
      pointsMr: [
        'IBCA ७ बिग कॅट्स: वाघ, सिंह, बिबट्या, स्नो लेपर्ड, प्युमा, जग्वार, चित्ता.',
        'मुख्यालय: भारत (केंद्रीय मंत्रिमंडळ मंजुरी ₹१५० कोटी).',
        'भारतात वाघ: ३,६८२ वाघ (जगातील ७५% वाघ).',
        'महाराष्ट्रातील ६ व्याघ्र प्रकल्प: मेळघाट, ताडोबा, पेंच, सह्याद्री, नवेगाव-नागझिरा, बोर (वर्धा).'
      ],
      pointsEn: [
        'IBCA 7 species: Tiger, Lion, Leopard, Snow Leopard, Puma, Jaguar, Cheetah.',
        'Headquarters: India.',
        'India Tiger population: 3,682 (75% of global total).',
        'Maharashtra 6 Tiger Reserves: Melghat, Tadoba, Pench, Sahyadri, Nawegaon-Nagzira, Bor.'
      ]
    },
    mpscTrapNoteMr: 'महाराष्ट्रात ६ व्याघ्र प्रकल्प आहेत (मेळघाट, ताडोबा, पेंच, सह्याद्री, नवेगाव-नागझिरा, बोर). संख्या आणि नावे व्यवस्थित लक्षात ठेवा!',
    mpscTrapNoteEn: 'Maharashtra has exactly 6 Tiger Reserves (not 12).',
    officialReference: 'राष्ट्रीय व्याघ्र संवर्धन प्राधिकरण (NTCA) व MoEFCC भारत सरकार',
    difficulty: 'Moderate',
    highYieldBadgeMr: '🐅 वन्यजीव व IBCA',
    highYieldBadgeEn: 'Wildlife & IBCA'
  }
];

export const CURRENT_AFFAIRS_CATEGORIES = [
  { id: 'all', labelMr: 'सर्व विषय', labelEn: 'All Categories', icon: '📰' },
  { id: 'schemes', labelMr: '🏛️ शासकीय योजना', labelEn: 'Govt Schemes', icon: '🏛️' },
  { id: 'awards', labelMr: '🏆 पुरस्कार व सन्मान', labelEn: 'Awards & Honours', icon: '🏆' },
  { id: 'appointments', labelMr: '👔 नियुक्त्या व व्यक्ती', labelEn: 'Appointments', icon: '👔' },
  { id: 'sports', labelMr: '🏅 क्रीडा घडामोडी', labelEn: 'Sports', icon: '🏅' },
  { id: 'environment', labelMr: '🌿 पर्यावरण व परिषदा', labelEn: 'Environment & COP', icon: '🌿' },
  { id: 'science_tech', labelMr: '🚀 विज्ञान व संरक्षण', labelEn: 'Science & Defence', icon: '🚀' },
  { id: 'economy', labelMr: '📈 आर्थिक व अर्थसंकल्प', labelEn: 'Economy & Budget', icon: '📈' }
] as const;

export const DRILL_MONTHS_LIST = [
  { monthNum: 0, labelMr: 'सर्व १२ महिने', labelEn: 'All Months' },
  { monthNum: 1, labelMr: 'जानेवारी', labelEn: 'January' },
  { monthNum: 2, labelMr: 'फेब्रुवारी', labelEn: 'February' },
  { monthNum: 3, labelMr: 'मार्च', labelEn: 'March' },
  { monthNum: 4, labelMr: 'एप्रिल', labelEn: 'April' },
  { monthNum: 5, labelMr: 'मे', labelEn: 'May' },
  { monthNum: 6, labelMr: 'जून', labelEn: 'June' },
  { monthNum: 7, labelMr: 'जुलै', labelEn: 'July' },
  { monthNum: 8, labelMr: 'ऑगस्ट', labelEn: 'August' },
  { monthNum: 9, labelMr: 'सप्टेंबर', labelEn: 'September' },
  { monthNum: 10, labelMr: 'ऑक्टोबर', labelEn: 'October' },
  { monthNum: 11, labelMr: 'नोव्हेंबर', labelEn: 'November' },
  { monthNum: 12, labelMr: 'डिसेंबर', labelEn: 'December' }
] as const;
