// ============================================================================
// MAHARASHTRA SOCIAL REFORMERS ENCYCLOPEDIA (५०+ समाजसुधारक डेटा)
// Comprehensive dataset for MPSC Exams (Rajyaseva, Combine Group B & C, Talathi)
// Covers: Newspapers, Institutions, Books, Pen Names/Titles, Key Events, and PYQs.
// ============================================================================

export interface SocialReformer {
  id: string;
  nameMr: string;
  nameEn: string;
  birthDeath: string;
  birthPlaceMr: string;
  birthPlaceEn: string;
  category: 'education_women' | 'dalit_depressed' | 'journalism_thinkers' | 'social_equality' | 'saints_mass_awakening' | 'tribal_working_class';
  honorificTitlesMr: string[];
  honorificTitlesEn: string[];
  penNamesMr: string[]; // टोपणनावे
  newspapersMr: string[]; // वृत्तपत्रे / नियतकालिके
  institutionsMr: string[]; // स्थापना केलेल्या संस्था / मंडळे
  booksAuthoredMr: string[]; // लिहिलेली पुस्तके / ग्रंथ
  famousQuotesMr?: string[];
  keyMovementsAndEventsMr: string[];
  mpscHighYieldPointersMr: string[];
  pyqsCount: number;
  avatarIcon: string;
  themeColor: string; // Tailwind color accent
  biographyMr?: string; // सविस्तर जीवनपट व परिचय
  biographyEn?: string;
}

export interface ReformerNewspaperItem {
  newspaperNameMr: string;
  reformerNameMr: string;
  yearStarted: string;
  periodicityMr: string; // साप्ताहिक, पाक्षिक, मासिक, दैनिक
  languageMr: string;
  mpscImportance: string;
}

export interface ReformerInstitutionItem {
  institutionNameMr: string;
  founderMr: string;
  yearEstablished: string;
  locationMr: string;
  mottoOrObjectiveMr: string;
}

export interface ReformerBookItem {
  bookTitleMr: string;
  authorMr: string;
  yearPublished?: string;
  themeOrSubjectMr: string;
}

export interface ReformerPyqQuestion {
  id: string;
  questionMr: string;
  questionEn: string;
  optionsMr: string[];
  optionsEn: string[];
  correctOptionIndex: number;
  explanationMr: string;
  pyqExamTag: string; // e.g. "MPSC राज्यसेवा पूर्व २०२१"
  relatedReformerId: string;
}

// ----------------------------------------------------------------------------
// 1. 50+ SOCIAL REFORMERS MASTER LIST
// ----------------------------------------------------------------------------
export const MAHARASHTRA_SOCIAL_REFORMERS: SocialReformer[] = [
  {
    id: 'phule_jotirao',
    nameMr: 'महात्मा जोतीराव गोविंदराव फुले',
    nameEn: 'Mahatma Jotirao Phule',
    birthDeath: '११ एप्रिल १८२७ – २८ नोव्हेंबर १८९०',
    birthPlaceMr: 'कटगुण (जि. सातारा); कर्मभूमी: पुणे',
    birthPlaceEn: 'Katgun (Satara); Workspace: Pune',
    category: 'social_equality',
    honorificTitlesMr: [
      'महात्मा (मुंबईच्या जनतेने १८८८ मध्ये रावबहादूर वडेदार यांच्या हस्ते पदवी दिली)',
      'हिंदुस्थानचे वॉशिंग्टन (सयाजीराव गायकवाड यांनी गौरवले)',
      'आद्य दलितोद्धारक व आधुनिक भारताचे क्रांतिकारक'
    ],
    honorificTitlesEn: [
      'Mahatma (Conferred by citizens of Bombay in 1888)',
      'Martin Luther of India',
      'Father of Indian Social Revolution'
    ],
    penNamesMr: ['जोती'],
    newspapersMr: [
      'दीनबंधू (सत्यशोधक समाजाचे अधिकृत मुखपत्र - कृष्णराव भालेकर व नारायण मेघाजी लोखंडे यांनी चालवले, जोतीरावांचे आर्थिक व वैचारिक पाठबळ होते)'
    ],
    institutionsMr: [
      'सत्यशोधक समाज (स्थापना: २४ सप्टेंबर १८७३, पुणे; ब्रीदवाक्य: "सर्वसाक्षी जगत्पती । त्याला नकोच मध्यस्थी ॥")',
      'भिडे वाड्यात भारतातील मुलींची पहिली शाळा (१ जानेवारी १८४८, पुणे)',
      'अस्पृश्यांसाठी पहिली शाळा (१८४८/१८५१)',
      'बालहत्या प्रतिबंधक गृह (१८६३ - स्वतःच्या घरात स्थापन)',
      'व्हिक्टोरिया बालकाश्रम',
      'पुणे कमर्शियल अँड कॉन्ट्रॅक्टिंग कंपनी'
    ],
    booksAuthoredMr: [
      'तृतीय रत्न नाटक (१८५५ - पहिली नाट्यकृती)',
      'ब्राह्मणांचे कसब (१८६९)',
      'छत्रपती शिवाजीराजे भोसले यांचा पोवाडा (१८६९ - यात स्वतःला ‘कुळवाडीभूषण’ म्हटले)',
      'गुलामगिरी (१८७३ - अमेरिकेतील कृष्णवर्णीयांच्या मुक्तीसाठी समर्पित)',
      'शेतकऱ्याचा आसूड (१८८३)',
      'सत्सार अंक १ व २ (१८८५)',
      'इशारा (१८८५)',
      'सार्वजनिक सत्यधर्म पुस्तक (१८९१ - मरणोत्तर प्रसिद्ध)'
    ],
    famousQuotesMr: [
      'विद्येविना मती गेली । मतीविना नीती गेली । नीतीविना गती गेली । गतीविना वित्त गेले । वित्ताविना शूद्र खचले । एवढे अनर्थ एका अविद्येने केले ॥'
    ],
    keyMovementsAndEventsMr: [
      '१८४८: मुलींसाठी पहिली शाळा सुरू केली.',
      '१८६८: स्वतःच्या घरातील पाण्याचा हौद अस्पृश्यांसाठी खुला केला.',
      '१८६३: काशीबाई या ब्राह्मण विधवेच्या मुलाला (यशवंत) दत्तक घेतले.',
      '१८७३: सत्यशोधक समाजाची स्थापना केली (पुरोहितांशिवाय विवाह पद्धती सुरू केली).',
      '१८८२: हंटर शिक्षण आयोगासमोर मोफत व सक्तीच्या प्राथमिक शिक्षणाची साक्ष दिली.'
    ],
    mpscHighYieldPointersMr: [
      'सत्यशोधक समाजाचे पहिले अध्यक्ष व खजिनदार: स्वतः जोतीराव फुले.',
      'हंटर कमिशन (1882) समोर साक्ष देणारे महाराष्ट्रातील दोन प्रमुख विचारवंत: जोतीराव फुले व पंडिता रमाबाई.',
      'गुलामगिरी ग्रंथ अमेरिकेतील निग्रो गुलामांना स्वातंत्र्य देणाऱ्या अमेरिकन जनतेला अर्पण केला.'
    ],
    pyqsCount: 48,
    avatarIcon: '🌺',
    themeColor: 'from-amber-500/20 to-orange-500/20 border-amber-500/50 text-amber-300'
  },
  {
    id: 'ambedkar_babasaheb',
    nameMr: 'डॉ. बाबासाहेब (भीमराव) रामजी आंबेडकर',
    nameEn: 'Dr. B. R. Ambedkar',
    birthDeath: '१४ एप्रिल १८९१ – ६ डिसेंबर १९५६',
    birthPlaceMr: 'महू (मध्य प्रदेश); मूळ गाव: आंबडवे (ता. मंडणगड, जि. रत्नागिरी)',
    birthPlaceEn: 'Mhow (MP); Ancestral: Ambadve (Ratnagiri)',
    category: 'dalit_depressed',
    honorificTitlesMr: [
      'भारतरत्न (१९९० मरणोत्तर)',
      'बोधिसत्व',
      'भारतीय राज्यघटनेचे शिल्पकार (Father of the Indian Constitution)',
      'आधुनिक भारताचे मनू (कायदेमंत्री म्हणून)',
      'ज्ञानाचा महासागर (Symbol of Knowledge)'
    ],
    honorificTitlesEn: [
      'Bharat Ratna (1990 posthumous)',
      'Chief Architect of the Indian Constitution',
      'Babasaheb',
      'Modern Manu'
    ],
    penNamesMr: ['भीम', 'एक बहिष्कृत'],
    newspapersMr: [
      'मूकनायक (३१ जानेवारी १९२० - छत्रपती शाहू महाराजांच्या आर्थिक साहाय्याने, ब्रीदवाक्य: संत तुकारामांचे अभंग)',
      'बहिष्कृत भारत (३ एप्रिल १९२७ - ब्रीदवाक्य: संत ज्ञानेश्वरांचे ओवी)',
      'समता (२९ जून १९२८ - संपादक: देवराव नाईक)',
      'जनता (२४ नोव्हेंबर १९३०)',
      'प्रबुद्ध भारत (४ फेब्रुवारी १९५६)'
    ],
    institutionsMr: [
      'बहिष्कृत हितकारिणी सभा (२० जुलै १९२४ - ब्रीदवाक्य: "शिका, संघटित व्हा, संघर्ष करा")',
      'समाज समता संघ (४ सप्टेंबर १९२७)',
      'स्वतंत्र मजूर पक्ष - Independent Labour Party (१९३६)',
      'अखिल भारतीय शेड्यूल्ड कास्ट्स फेडरेशन (१९४२)',
      'पीपल्स एज्युकेशन सोसायटी (८ जुलै १९४५ - मुंबईत सिद्धार्थ कॉलेज, औरंगाबादमध्ये मिलिंद कॉलेज)',
      'रिपब्लिकन पार्टी ऑफ इंडिया (संकल्पना मांडली, स्थापना १९५७ मध्ये झाली)'
    ],
    booksAuthoredMr: [
      'The Problem of the Rupee: Its Origin and Its Solution (१९२३ - यावरून RBI ची संकल्पना आली)',
      'Castes in India: Their Mechanism, Genesis and Development (१९१६)',
      'The Annihilation of Caste (१९३६ - जातपात तोडक मंडळासाठी भाषण)',
      'Who Were the Shudras? (१९४६ - महात्मा फुलेंना समर्पित)',
      'The Untouchables (१९४८)',
      'Thoughts on Pakistan (१९४०)',
      'Buddha and His Dhamma (१९५७ - महापरिनिर्वाणानंतर प्रकाशित)',
      'Riddle in Hinduism'
    ],
    famousQuotesMr: [
      'शिका, संघटित व्हा आणि संघर्ष करा!',
      'स्वातंत्र्य, समता आणि बंधुता हे माझ्या जीवनाचे तत्त्वज्ञान आहे.'
    ],
    keyMovementsAndEventsMr: [
      '२० मार्च १९२७: महाडचा चवदार तळे सत्याग्रह (पाण्याचा मानवी हक्क - सामाजिक सक्षमीकरण दिन).',
      '२५ डिसेंबर १९२७: मनुस्मृती दहन (महाड येथे).',
      '२ मार्च १९३० ते १९३५: नाशिक काळाराम मंदिर सत्याग्रह (दादासाहेब गायकवाड यांच्या नेतृत्वाखाली).',
      '२४ सप्टेंबर १९३२: पुणे करार (महात्मा गांधी व डॉ. आंबेडकर यांच्यात - स्वतंत्र मतदारसंघांऐवजी राखीव जागा १४८).',
      '१३ ऑक्टोबर १९३५: येवला (नाशिक) परिषद - "मी हिंदू म्हणून जन्मलो असलो तरी हिंदू म्हणून मरणार नाही" ही ऐतिहासिक घोषणा.',
      '१४ ऑक्टोबर १९५६: नागपूर येथील दीक्षाभूमीवर लाखो अनुयायांसह बौद्ध धम्माची दीक्षा घेतली.'
    ],
    mpscHighYieldPointersMr: [
      'लंडन येथील तिन्ही गोलमेज परिषदांना (१९३०, १९३१, १९३२) उपस्थित राहणारे नेते: डॉ. आंबेडकर व रावबहादूर आर. श्रीनिवासन.',
      'मसुदा समितीचे (Drafting Committee) अध्यक्ष: डॉ. बी. आर. आंबेडकर (२९ ऑगस्ट १९४७).',
      'स्वतंत्र भारताचे पहिले कायदेमंत्री (First Law Minister of Independent India).'
    ],
    pyqsCount: 62,
    avatarIcon: '⚖️',
    themeColor: 'from-blue-500/20 to-indigo-500/20 border-blue-500/50 text-blue-300'
  },
  {
    id: 'shahu_maharaj',
    nameMr: 'राजर्षी छत्रपती शाहू महाराज',
    nameEn: 'Rajarshi Chhatrapati Shahu Maharaj',
    birthDeath: '२६ जून १८७४ – ६ मे १९२२',
    birthPlaceMr: 'कागल (जि. कोल्हापूर) - मूळ नाव: यशवंतराव जयसिंगराव घाटगे',
    birthPlaceEn: 'Kagal (Kolhapur) - Birth name: Yashwantrao Ghatge',
    category: 'social_equality',
    honorificTitlesMr: [
      'राजर्षी (१९१९ मध्ये कानपूरच्या कुर्मी क्षत्रिय सभेने दिलेली पदवी)',
      'लोकराजा (People\'s King)',
      'आरक्षणाचे जनक (Father of Affirmative Action in India)'
    ],
    honorificTitlesEn: ['Rajarshi', 'King of Social Democracy', 'Pioneer of Reservation in India'],
    penNamesMr: [],
    newspapersMr: [
      'स्वतः वृत्तपत्र चालवले नाही, परंतु मूकनायक, विजय मराठा, जागृती, तरुण मराठा, डेक्कन रयत या वृत्तपत्रांना भरीव आर्थिक मदत केली.'
    ],
    institutionsMr: [
      'मराठा बोर्डिंग (१९०१), जैन हॉस्टेल (१९०१), वीरशैव लिंगायत हॉस्टेल, व्हिक्टोरिया मराठा बोर्डिंग',
      'सत्यशोधक समाज शाखा (कोल्हापूर - १९११, भास्करराव जाधव अध्यक्ष)',
      'भोगावती नदीवर राधानगरी धरण (लक्ष्मी तलाव)',
      'शाहीर परशुराम आखाडा व कुस्तीची मैदाने (कोल्हापूरला कुस्तीची पंढरी बनवले)'
    ],
    booksAuthoredMr: [],
    famousQuotesMr: [
      'जोपर्यंत सर्व जातींच्या लोकांना समान संधी मिळत नाही, तोपर्यंत समतेचे राज्य येऊ शकत नाही.'
    ],
    keyMovementsAndEventsMr: [
      '२६ जुलै १९०२: कोल्हापूर संस्थानात मागासवर्गीय व बहुजन समाजासाठी ५०% आरक्षणाचा ऐतिहासिक जाहीरनामा काढला (भारतातील पहिले आरक्षण!).',
      '१९१७: प्राथमिक शिक्षण मोफत व सक्तीचे करणारा कायदा केला.',
      '१९१९: आंतरजातीय व आंतरधर्मीय विवाहाचा कायदा (स्पेशल मॅरेज ॲक्ट) केला.',
      '१९२०: माणगाव परिषद (२१-२२ मार्च १९२०) - डॉ. आंबेडकरांची ओळख करून देताना म्हटले: "तुम्हाला डॉ. आंबेडकरांच्या रूपाने तुमचा खरा नेता मिळाला आहे."',
      'वेदोक्त प्रकरण (१८९९): नारायण भट सेवेकरी याने वेदोक्त मंत्रांऐवजी पुराणोक्त मंत्र म्हटल्याने सुरू झालेले धार्मिक वादळ.'
    ],
    mpscHighYieldPointersMr: [
      '२६ जून हा शाहू महाराजांचा जन्मदिवस महाराष्ट्रात "सामाजिक न्याय दिन" (Social Justice Day) म्हणून साजरा केला जातो.',
      'देवदासी प्रथा बंदी कायदा (१९२०) आणि जोगती प्रथा बंदी करणारे पुरोगामी संस्थानिक.',
      'गुळाची बाजारपेठ स्थापन करून कोल्हापूरला व्यापारी केंद्र बनवले.'
    ],
    pyqsCount: 42,
    avatarIcon: '👑',
    themeColor: 'from-amber-600/20 to-yellow-500/20 border-amber-500/50 text-amber-200'
  },
  {
    id: 'karve_dhondo_keshav',
    nameMr: 'महर्षी धोंडो केशव (अण्णासाहेब) कर्वे',
    nameEn: 'Maharshi Dhondo Keshav Karve',
    birthDeath: '१८ एप्रिल १८५८ – ९ नोव्हेंबर १९६२ (१०४ वर्षे आयुष्य)',
    birthPlaceMr: 'शेरवली (ता. खेड, जि. रत्नागिरी); कर्मभूमी: हिंगणे (पुणे)',
    birthPlaceEn: 'Sheravali (Ratnagiri); Workspace: Hingne (Pune)',
    category: 'education_women',
    honorificTitlesMr: [
      'भारतरत्न (१९५८ - जन्मशताब्दी वर्षात भारतरत्न मिळवणारे पहिले जिवंत महाराष्ट्रीयन व व्यक्ती)',
      'महर्षी',
      'अण्णासाहेब'
    ],
    honorificTitlesEn: ['Bharat Ratna (1958)', 'Maharshi', 'Pioneer of Women\'s University'],
    penNamesMr: [],
    newspapersMr: [
      'मानवी समता (मासिक)',
      'सुधारकमध्ये नियमित सामाजिक लेख लिहिले'
    ],
    institutionsMr: [
      'अनाथ बालिकाश्रम (१८९९ - हिंगणे, पुणे)',
      'महिला विद्यालय (१९०७)',
      'निष्काम कर्ममठ (१९१०)',
      'श्रीमती नाथीबाई दामोदर ठाकरसी (SNDT) महिला विद्यापीठ (१९१६ - भारतातील पहिले महिला विद्यापीठ, सर विठ्ठलदास ठाकरसी यांनी १५ लाख रुपयांची देणगी दिली)',
      'महाराष्ट्र ग्राम प्राथमिक शिक्षण मंडळ (१९३६)',
      'समता संघ (१९४४)'
    ],
    booksAuthoredMr: [
      'आत्मवृत्त (१८२८/१९१५ - मराठीतील प्रसिद्ध आत्मचरित्र)',
      'Looking Back (इंग्रजी आत्मचरित्र)'
    ],
    famousQuotesMr: [
      'स्त्री शिक्षण हेच राष्ट्राच्या उन्नतीचे मूळ आहे.'
    ],
    keyMovementsAndEventsMr: [
      '११ मार्च १८९३: गोदुबाई (आनंदीबाई) या विधवेशी पुनर्विवाह केला (पंडिता रमाबाईंच्या शारदा सदनमधील विधवा).',
      'विधवा विवाहाचा प्रचार करण्यासाठी विधवा विवाह उत्तेजक मंडळाची (१८९३) स्थापना.',
      'जपानमधील महिला विद्यापीठाच्या धर्तीवर भारतात महिला विद्यापीठ स्थापन केले.'
    ],
    mpscHighYieldPointersMr: [
      'MPSC चा अत्यंत आवडता प्रश्न: SNDT महिला विद्यापीठाची स्थापना कोणी केली? -> महर्षी कर्वे (१९१६).',
      'भारतरत्न मिळवणारे सर्वात वयोवृद्ध व्यक्ती (१०० व्या वर्षी १९५८ मध्ये भारतरत्न).'
    ],
    pyqsCount: 36,
    avatarIcon: '🪔',
    themeColor: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/50 text-emerald-300'
  },
  {
    id: 'phule_savitribai',
    nameMr: 'क्रांतिज्योती सावित्रीबाई जोतीराव फुले',
    nameEn: 'Krantijyoti Savitribai Phule',
    birthDeath: '३ जानेवारी १८३१ – १० मार्च १८९७',
    birthPlaceMr: 'नायगाव (ता. खंडाळा, जि. सातारा)',
    birthPlaceEn: 'Naigaon (Satara)',
    category: 'education_women',
    honorificTitlesMr: [
      'भारतातील पहिल्या महिला मुख्याध्यापिका व शिक्षिका',
      'क्रांतिज्योती',
      'आधुनिक मराठी कवितेच्या जनक / आद्य कवयित्री'
    ],
    honorificTitlesEn: ['First Female Teacher of Modern India', 'Krantijyoti', 'Pioneer of Modern Marathi Poetry'],
    penNamesMr: ['सावित्री'],
    newspapersMr: [],
    institutionsMr: [
      'भिडे वाड्यातील पहिली मुलींची शाळा (१८४८ - पहिल्या शिक्षिका व मुख्याध्यापिका)',
      'महिला सेवा मंडळ (१८५२ - स्त्रियांना त्यांच्या हक्कांची जाणीव करून देण्यासाठी)',
      'बालहत्या प्रतिबंधक गृह (१८६३ - संचालिका म्हणून कार्य)',
      'सत्यशोधक समाज कार्यवाह (महात्मा फुलेंच्या निधनानंतर १८९० ते १८९७ समाजाचे नेतृत्व केले)'
    ],
    booksAuthoredMr: [
      'काव्यफुले (१८५४ - मराठीतील पहिला आधुनिक कवितासंग्रह)',
      'बावन्नकशी सुबोध रत्नाकर (१८९२ - महात्मा फुलेंच्या विचारांवर आधारित काव्यग्रंथ)',
      'जोतीरावांची भाषणे (संपादित)'
    ],
    famousQuotesMr: [
      'ज्ञान नाही विद्या नाही, तेणे मनुष्य पशु होई । शिकून व्हावे ज्ञानी, बंधने तोडावी अज्ञानाची ॥'
    ],
    keyMovementsAndEventsMr: [
      '१८४८: शिक्षिका म्हणून शाळेत जाताना लोकांनी त्यांच्यावर शेण, चिखल आणि दगडफेक केली, तरी त्यांनी कार्य सोडले नाही.',
      '१८५२: अस्पृश्य महिलांसाठी हळदीकुंकू कार्यक्रम घेऊन सामाजिक समतेचा पाया घातला.',
      '१८९०: महात्मा फुलेंच्या मृत्यूनंतर स्वतः टिटवे (अग्नी) धरून अंत्यसंस्कार केले (रूढींना छेद दिला).',
      '१८९७: पुण्यात आलेल्या प्लेगच्या साथीमध्ये प्लेगपीडितांची शुश्रूषा करताना स्वतः प्लेगची लागण होऊन वीरमरण आले.'
    ],
    mpscHighYieldPointersMr: [
      '३ जानेवारी हा सावित्रीबाईंचा जन्मदिवस महाराष्ट्रात "बालिका दिन" व "महिला शिक्षण दिन" म्हणून साजरा केला जातो.',
      'पुणे विद्यापीठाचे नामकरण ‘सावित्रीबाई फुले पुणे विद्यापीठ’ (SPPU) करण्यात आले आहे.'
    ],
    pyqsCount: 32,
    avatarIcon: '📚',
    themeColor: 'from-pink-500/20 to-rose-500/20 border-pink-500/50 text-pink-300'
  },
  {
    id: 'agarkar_gopal_ganesh',
    nameMr: 'गोपाळ गणेश आगरकर',
    nameEn: 'Gopal Ganesh Agarkar',
    birthDeath: '१४ जुलै १८५६ – १७ जून १८९५',
    birthPlaceMr: 'टेंभू (ता. कराड, जि. सातारा)',
    birthPlaceEn: 'Tembhu (Karad, Satara)',
    category: 'journalism_thinkers',
    honorificTitlesMr: [
      'बुद्धीप्रामाण्यवादाचे जनक (Apostle of Rationalism)',
      'जहाल समाजसुधारक (Radical Social Reformer)',
      'फर्ग्युसन कॉलेजचे दुसरे प्राचार्य (१८९२ ते १८९५)'
    ],
    honorificTitlesEn: ['Champion of Rationalism', 'Radical Reformer', 'Co-founder of Kesari'],
    penNamesMr: ['सुधारक'],
    newspapersMr: [
      'केसरी (१८८१ चे पहिले संपादक - १८८७ पर्यंत संपादक राहिले)',
      'सुधारक (१५ ऑक्टोबर १८८८ रोजी सुरू केले - ब्रीदवाक्य: "इष्ट असेल ते बोलणार आणि साध्य असेल ते करणार")'
    ],
    institutionsMr: [
      'न्यू इंग्लिश स्कूल (१८८० - टिळक, चिपळूणकर व आगरकर यांनी स्थापन केले)',
      'डेक्कन एज्युकेशन सोसायटी (१८८४)',
      'फर्ग्युसन कॉलेज (१८८५)'
    ],
    booksAuthoredMr: [
      'डोंगरीच्या तुरुंगातील आमचे १०१ दिवस (१८८२ - बर्वे प्रकरणात टिळक व आगरकरांना तुरुंगवास)',
      'विकारविलसित (शेक्सपिअरच्या हॅम्लेट नाटकाचे मराठी भाषांतर)',
      'शेट माधवराव आणि शेतकरी (मर्चंट ऑफ व्हेनिसचे भाषांतर)',
      'गुलामगिरीचे शस्त्र',
      'स्त्रीयांनी जाकीटे घातली पाहिजेत (प्रसिद्ध निबंध)'
    ],
    famousQuotesMr: [
      'इष्ट असेल ते बोलणार आणि साध्य असेल ते करणार!',
      'आधी राजकीय की आधी सामाजिक? -> माझे उत्तर: आधी सामाजिक सुधारणा!'
    ],
    keyMovementsAndEventsMr: [
      'टिळक-आगरकर वाद: टिळकांचे मत "आधी राजकीय स्वातंत्र्य, मग सामाजिक सुधारणा", तर आगरकरांचे मत "आधी सामाजिक सुधारणा, मगच राजकीय स्वातंत्र्य टिकेल".',
      'संमतीवय विधेयक (Age of Consent Bill, 1891): मुलींचे लग्नाचे वय १० वरून १२ करण्याच्या विधेयकाला आगरकरांनी ठाम पाठिंबा दिला.'
    ],
    mpscHighYieldPointersMr: [
      '‘केसरी’चे पहिले संपादक कोण होते? -> गोपाळ गणेश आगरकर (मराठा चे संपादक लोकमान्य टिळक होते).',
      'स्वतः जिवंत असताना स्वतःचीच प्रेतयात्रा पाहणारा थोर समाजसुधारक!'
    ],
    pyqsCount: 35,
    avatarIcon: '✍️',
    themeColor: 'from-orange-500/20 to-red-500/20 border-orange-500/50 text-orange-300'
  },
  {
    id: 'lokhitwadi_gopal_hari',
    nameMr: 'लोकहितवादी (गोपाळ हरी देशमुख)',
    nameEn: 'Lokhitwadi (Gopal Hari Deshmukh)',
    birthDeath: '१८ फेब्रुवारी १८२३ – ९ ऑक्टोबर १८९२',
    birthPlaceMr: 'पुणे',
    birthPlaceEn: 'Pune',
    category: 'journalism_thinkers',
    honorificTitlesMr: [
      'लोकहितवादी (प्रभाकर साप्ताहिकात या टोपणनावाने शतपत्रे लिहिली)',
      'महाराष्ट्रातील आद्य प्रबोधनकार',
      'रावबहादूर (न्यायाधीश म्हणून सन्मान)'
    ],
    honorificTitlesEn: ['Lokhitwadi', 'Author of Shatapatre', 'Pioneer of Modern Marathi Rationalism'],
    penNamesMr: ['लोकहितवादी', 'एक हिंदू'],
    newspapersMr: [
      'प्रभाकर (भाऊ महाजन यांच्या साप्ताहिकात १८४८ ते १८५० दरम्यान १०८ शतपत्रे लिहिली)',
      'ज्ञानप्रकाश, इंदुप्रकाश, विचारलहरी या वृत्तपत्रांना प्रोत्साहन',
      'लोकहितवादी (मासिक)'
    ],
    institutionsMr: [
      'पुणे प्रार्थना समाज (संस्थापक सदस्य)',
      'पुणे नेटिव्ह जनरल लायब्ररी (वाचनालय चळवळ)',
      'गुजरात व्हर्नाक्युलर सोसायटी (अहमदाबाद येथे सेवेत असताना गुजराती भाषा विकासात मोठे योगदान)'
    ],
    booksAuthoredMr: [
      'शतपत्रे (१०८ पत्रांचा संग्रह)',
      'लक्ष्मीज्ञान (१८४९ - भारतातील पहिले अर्थशास्त्रावरील पुस्तक)',
      'हिंदुस्थानचा इतिहास',
      'पानिपतची बखर',
      'गीतातत्व',
      'जातीभेद'
    ],
    famousQuotesMr: [
      'ब्राह्मणांनी विद्यादान करावे, व्यापार करावा, परंतु दांभिक राहू नये. बुद्धीला पटेल तेच मानावे.'
    ],
    keyMovementsAndEventsMr: [
      'शतपत्रांद्वारे हिंदू समाजातील धर्मभोळेपणा, जातीभेद, आणि इंग्रजी शिक्षणाचे महत्त्व यांवर प्रहार केला.',
      'स्वदेशी मालाचा वापर करण्याचा प्रथम पुरस्कार केला (खादी व देशी उत्पादने).'
    ],
    mpscHighYieldPointersMr: [
      'MPSC प्रश्न: ‘शतपत्रे’ कोणत्या साप्ताहिकात प्रसिद्ध झाली? -> ‘प्रभाकर’ (संपादक: गोविंद विठ्ठल कुंटे उर्फ भाऊ महाजन).',
      'भारतातील अर्थशास्त्रावर पहिले मराठी पुस्तक ‘लक्ष्मीज्ञान’ कोणी लिहिले? -> लोकहितवादी.'
    ],
    pyqsCount: 28,
    avatarIcon: '📜',
    themeColor: 'from-teal-500/20 to-cyan-500/20 border-teal-500/50 text-teal-300'
  },
  {
    id: 'bhau_daji_lad',
    nameMr: 'डॉ. भाऊ दाजी लाड (रामकृष्ण विठ्ठल लाड)',
    nameEn: 'Dr. Bhau Daji Lad',
    birthDeath: '७ सप्टेंबर १८२४ – ३१ मे १८७४',
    birthPlaceMr: 'मांजरे (गोवा); कर्मभूमी: मुंबई',
    birthPlaceEn: 'Manjre (Goa); Workspace: Mumbai',
    category: 'education_women',
    honorificTitlesMr: [
      'धन्वंतरी (कुष्ठरोगावर खापरगुळवेल / चालमोगरा औषध शोधल्यामुळे)',
      'प्राच्यविद्या संशोधक (Antiquarian & Archaeologist)',
      'मुंबईचे अनभिषिक्त शिल्पकार (नाना शंकरशेट यांच्यासोबत)'
    ],
    honorificTitlesEn: ['Dhanvantari of Bombay', 'Orientalist Scholar', 'Pioneer of Leprosy Treatment'],
    penNamesMr: [],
    newspapersMr: [],
    institutionsMr: [
      'बॉम्बे असोसिएशन (२६ ऑगस्ट १८५२ - पहिली राजकीय संस्था; भाऊ दाजी लाड पहिले सचिव, नाना शंकरशेट अध्यक्ष)',
      'स्टुडंट्स लिटररी अँड सायंटिफिक सोसायटी (१८४८)',
      'ज्ञानप्रसारक सभा',
      'व्हिक्टोरिया अँड अल्बर्ट म्युझियम (आजचे डॉ. भाऊ दाजी लाड संग्रहालय, राणीची बाग भायखळा)'
    ],
    booksAuthoredMr: [
      'कुष्ठरोग निवारण प्रबंध',
      'कालिदासाच्या काळावर संशोधन प्रबंध',
      'शिलालेखांवरील प्राच्यविद्या निबंध'
    ],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      'ग्रांट मेडिकल कॉलेजच्या पहिल्या तुकडीचे पदवीधर डॉक्टर (१८४५-५१).',
      'गरीब रुग्णांना मोफत औषधोपचार देत असत, म्हणून मुंबईतील जनता त्यांना ‘देवमाणूस’ म्हणत असे.',
      'अजिंठा, वेरूळ आणि कार्ले लेण्यांमधील शिलालेखांचे वाचन करून इतिहासाची मांडणी केली.'
    ],
    mpscHighYieldPointersMr: [
      'बॉम्बे असोसिएशनचे पहिले चिटणीस/सचिव कोण होते? -> डॉ. भाऊ दाजी लाड.',
      'कुष्ठरोगावर परिणामकारक औषध शोधणारे समाजसुधारक डॉक्टर -> डॉ. भाऊ दाजी लाड.'
    ],
    pyqsCount: 24,
    avatarIcon: '🌿',
    themeColor: 'from-green-500/20 to-emerald-500/20 border-green-500/50 text-green-300'
  },
  {
    id: 'ranade_mg',
    nameMr: 'न्यायमूर्ती महादेव गोविंद रानडे',
    nameEn: 'Justice Mahadev Govind Ranade',
    birthDeath: '१८ जानेवारी १८४२ – १६ जानेवारी १९०१',
    birthPlaceMr: 'निफाड (जि. नाशिक); कर्मभूमी: पुणे व मुंबई',
    birthPlaceEn: 'Niphad (Nashik); Workspace: Pune & Mumbai',
    category: 'journalism_thinkers',
    honorificTitlesMr: [
      'महाराष्ट्राचे सॉक्रेटिस',
      'भारतीय अर्थशास्त्राचे जनक (Father of Indian Economics)',
      'उदारमतवादी विचारवंत व राजकीय गुरू (गोपाळकृष्ण गोखल्यांचे गुरू)'
    ],
    honorificTitlesEn: ['Socrates of Maharashtra', 'Father of Indian Economic Thought', 'Mentor of G.K. Gokhale'],
    penNamesMr: [],
    newspapersMr: [
      'इंदुप्रकाश (इंग्रजी विभागाचे संपादन केले)',
      'ज्ञानप्रकाशला वैचारिक मार्गदर्शन'
    ],
    institutionsMr: [
      'प्रार्थना समाज (पुणे व मुंबई - १८६७ चे आधारस्तंभ)',
      'सार्वजनिक सभा (पुणे - १८७०; खरे वैचारिक चालक रानडे होते)',
      'भारतीय राष्ट्रीय सामाजिक परिषद - Indian National Social Conference (१८८७ - काँग्रेसच्या मंडपात भरत असे)',
      'वसंत व्याख्यानमाला (१८७५ - पुणे)',
      'पुणे औद्योगिक परिषद (Industrial Association - १८९०)'
    ],
    booksAuthoredMr: [
      'Rise of the Maratha Power (मराठ्यांच्या सत्तेचा उत्कर्ष - १९००)',
      'Essays on Indian Economics (भारतीय अर्थशास्त्र निबंध)',
      'Religious and Social Reform'
    ],
    famousQuotesMr: [
      'सामाजिक सुधारणांशिवाय राजकीय स्वातंत्र्य अशक्य आहे. समाजसुधारणा ही धर्माला धरूनच झाली पाहिजे.'
    ],
    keyMovementsAndEventsMr: [
      '१८८५: भारतीय राष्ट्रीय काँग्रेसच्या स्थापनेत सक्रिय मार्गदर्शन.',
      '१८९०: स्वदेशी चळवळीची पहिली हाक व औद्योगिक प्रदर्शने भरवली.',
      'विधवा पुनर्विवाह कायद्याचा प्रसार केला.'
    ],
    mpscHighYieldPointersMr: [
      '‘Rise of the Maratha Power’ हा विख्यात इतिहासग्रंथ कोणी लिहिला? -> न्या. म. गो. रानडे.',
      'भारतीय राष्ट्रीय सामाजिक परिषद (National Social Conference) कोणी सुरू केली? -> न्या. रानडे (१८८७).'
    ],
    pyqsCount: 38,
    avatarIcon: '⚖️',
    themeColor: 'from-blue-600/20 to-cyan-500/20 border-blue-500/50 text-blue-300'
  },
  {
    id: 'patil_bhaurao',
    nameMr: 'कर्मवीर भाऊराव पायगोंडा पाटील',
    nameEn: 'Karmaveer Bhaurao Patil',
    birthDeath: '२२ सप्टेंबर १८८७ – ९ मे १९५९',
    birthPlaceMr: 'कुंभोज (ता. हातकणंगले, जि. कोल्हापूर); कर्मभूमी: सातारा',
    birthPlaceEn: 'Kumbhoj (Kolhapur); Workspace: Satara',
    category: 'education_women',
    honorificTitlesMr: [
      'कर्मवीर (जनतेने दिलेली पदवी, संत गाडगेबाबांनी गौरव केला)',
      'पद्मभूषण (१९५९)',
      'शिक्षणातील भगीरथ'
    ],
    honorificTitlesEn: ['Karmaveer', 'Padma Bhushan (1959)', 'Founder of Rayat Shikshan Sanstha'],
    penNamesMr: [],
    newspapersMr: [],
    institutionsMr: [
      'रयत शिक्षण संस्था (४ ऑक्टोबर १९१९ - काले, जि. सातारा येथे स्थापना, नंतर सातारा येथे स्थलांतर; ब्रीदवाक्य: "स्वावलंबी शिक्षण हेच आमचे ब्रीद" - वटवृक्ष हे चिन्ह)',
      'छत्रपती शाहू बोर्डिंग हाऊस (१९२४ - सातारा; येथे सर्व जातींच्या मुलांना एकत्र जेवण व राहण्याची सोय)',
      'सिल्व्हर ज्युबिली रुरल ट्रेनिंग कॉलेज (१९३५)',
      'महाराजा सयाजीराव हायस्कूल (१९४०)',
      'छत्रपती शिवाजी कॉलेज (१९४७ - सातारा, रयतचे पहिले महाविद्यालय)'
    ],
    booksAuthoredMr: [],
    famousQuotesMr: [
      'स्वावलंबी शिक्षण हेच आमचे ब्रीद - कमवा आणि शिका (Earn and Learn)!'
    ],
    keyMovementsAndEventsMr: [
      'शाहू महाराजांच्या विचारांचा प्रभाव; सत्यशोधक समाजाचे निष्ठावान कार्यकर्ते.',
      'गरीब व शेतकरी कुटुंबातील मुलांना शिकण्यासाठी "कमवा आणि शिका" योजना सुरू केली.',
      'आपल्या पत्नी सौ. लक्ष्मीबाई पाटील यांचे मंगळसूत्र गहाण ठेवून शाहू बोर्डिंगमधील विद्यार्थ्यांच्या जेवणाची सोय केली.'
    ],
    mpscHighYieldPointersMr: [
      'रयत शिक्षण संस्थेची स्थापना कधी व कोठे झाली? -> ४ ऑक्टोबर १९१९ रोजी काले (ता. कराड, जि. सातारा).',
      'रयत शिक्षण संस्थेचे चिन्ह काय आहे? -> वटवृक्ष (Banyan Tree).'
    ],
    pyqsCount: 30,
    avatarIcon: '🌳',
    themeColor: 'from-emerald-600/20 to-green-500/20 border-emerald-500/50 text-emerald-300'
  },
  {
    id: 'shinde_vr',
    nameMr: 'महर्षी विठ्ठल रामजी शिंदे (अण्णासाहेब)',
    nameEn: 'Maharshi Vitthal Ramji Shinde',
    birthDeath: '२३ एप्रिल १८७३ – २ जानेवारी १९४४',
    birthPlaceMr: 'जमखंडी (कर्नाटक); कर्मभूमी: पुणे व मुंबई',
    birthPlaceEn: 'Jamkhandi (Karnataka); Workspace: Pune & Mumbai',
    category: 'dalit_depressed',
    honorificTitlesMr: [
      'महर्षी (जनतेने दिलेला गौरव)',
      'धर्मसंशोधक व अस्पृश्यतानिवारक'
    ],
    honorificTitlesEn: ['Maharshi', 'Founder of Depressed Classes Mission'],
    penNamesMr: [],
    newspapersMr: [
      'उपासना (मासिक)',
      'सुधारक, ज्ञानप्रकाश व सुबोधपत्रिकेत सातत्याने लेख'
    ],
    institutionsMr: [
      'डिप्रेस्ड क्लासेस मिशन - Depressed Classes Mission (१८ ऑक्टोबर १९०६ - मुंबई येथे स्थापना)',
      'प्रार्थना समाज प्रचारक',
      'अखिल भारतीय अस्पृश्यता निवारक संघ (१९१८ - मुंबईत परिषद, सयाजीराव गायकवाड अध्यक्ष)',
      'अहिल्याश्रम (पुणे)'
    ],
    booksAuthoredMr: [
      'माझ्या आठवणी आणि अनुभव (प्रसिद्ध आत्मचरित्र)',
      'भारतीय अस्पृश्यतेचा प्रश्न (संशोधनात्मक ग्रंथ)',
      'भागवत धर्माचा विकास',
      'मराठ्यांची धर्मपरंपरा'
    ],
    famousQuotesMr: [
      'जर अस्पृश्यता पाळणे हा देवाचा धर्म असेल, तर मी त्या देवाला मानणार नाही.'
    ],
    keyMovementsAndEventsMr: [
      '१९२८: पुणे पर्वती मंदिर सत्याग्रहात सहभाग.',
      '१९३०: सविनय कायदेभंग चळवळीत सहभाग आणि येरवडा तुरुंगवास.',
      'शेतकरी चळवळीत तुकडेबंदी बिलाविरुद्ध पुणे येथे शेतकऱ्यांचा भव्य मोर्चा काढला.'
    ],
    mpscHighYieldPointersMr: [
      '‘डिप्रेस्ड क्लासेस मिशन’ची स्थापना कोणी केली? -> महर्षी विठ्ठल रामजी शिंदे (१८ ऑक्टोबर १९०६).',
      '‘भारतीय अस्पृश्यतेचा प्रश्न’ हा मूलभूत संशोधनात्मक ग्रंथ कोणाचा आहे? -> महर्षी वि. रा. शिंदे.'
    ],
    pyqsCount: 34,
    avatarIcon: '📿',
    themeColor: 'from-amber-500/20 to-yellow-500/20 border-amber-500/50 text-amber-300'
  },
  {
    id: 'shankarsheth_jagannath',
    nameMr: 'नाना (जगन्नाथ) शंकरशेट मुरकुटे',
    nameEn: 'Jagannath Shankarsheth',
    birthDeath: '१० फेब्रुवारी १८०३ – ३१ जुलै १८६५',
    birthPlaceMr: 'मुंबई',
    birthPlaceEn: 'Mumbai',
    category: 'education_women',
    honorificTitlesMr: [
      'मुंबईचे अनभिषिक्त सम्राट (Uncrowned King of Bombay - आचार्य अत्रे यांनी म्हटले)',
      'मुंबईचे आद्य शिल्पकार (Architect of Modern Mumbai)',
      'पहिले भारतीय सदस्य - मुंबई लेजिस्लेटिव्ह कौन्सिल (१८६१)'
    ],
    honorificTitlesEn: ['Uncrowned King of Bombay', 'Architect of Mumbai', 'First Member of Bombay Legislative Council'],
    penNamesMr: [],
    newspapersMr: [],
    institutionsMr: [
      'बॉम्बे नेटिव्ह एज्युकेशन सोसायटी (१८२२ - एल्फिन्स्टन यांच्या समवेत)',
      'एल्फिन्स्टन हायस्कूल व कॉलेज (१८३४/१८३५)',
      'बॉम्बे असोसिएशन (१८५२ - नाना पहिले अध्यक्ष)',
      'ग्रेट इंडियन पेनिन्सुला (GIP) रेल्वे कंपनी (१८५३ मधील बोरीबंदर ते ठाणे रेल्वे सुरू करण्यात पुढाकार)',
      'ग्रँट मेडिकल कॉलेज (१८४५)',
      'स्टुडंट्स लिटररी अँड सायंटिफिक सोसायटी (१८४८ - मुलींच्या शाळांसाठी स्वतःचा वाडा दिला)'
    ],
    booksAuthoredMr: [],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      '१६ एप्रिल १८५३: बोरीबंदर ते ठाणे धावलेल्या पहिल्या आगगाडीच्या पहिल्या डब्यात बसण्याचा ऐतिहासिक मान नाना शंकरशेट आणि जमशेटजी जिजीभाई यांना मिळाला.',
      'सती प्रथा बंदी कायद्याला (१८२९) मुंबई प्रांतातून ब्रिटिश सरकारकडे समर्थन पत्र पाठवले.',
      'मुंबई महापालिकेत भारतीयांना प्रतिनिधित्व मिळवून दिले.'
    ],
    mpscHighYieldPointersMr: [
      'मुंबईचे पहिले भारतीय शिल्पकार व बॉम्बे असोसिएशनचे पहिले अध्यक्ष: नाना शंकरशेट.',
      'मुलींच्या शाळांसाठी स्वतःचा वाडा विनामूल्य उपलब्ध करून देणारे थोर समाजसुधारक.'
    ],
    pyqsCount: 26,
    avatarIcon: '🏛️',
    themeColor: 'from-amber-600/20 to-stone-700/20 border-amber-500/50 text-amber-200'
  },
  {
    id: 'jambhekar_balshastri',
    nameMr: 'बाळशास्त्री गंगाधरशास्त्री जांभेकर',
    nameEn: 'Balshastri Jambhekar',
    birthDeath: '६ जानेवारी १८१२ – १८ मे १८४६ (अल्पायुष्य: अवघे ३४ वर्षे)',
    birthPlaceMr: 'पोंभुर्ले (ता. देवगड, जि. सिंधुदुर्ग)',
    birthPlaceEn: 'Pombhurle (Sindhudurg)',
    category: 'journalism_thinkers',
    honorificTitlesMr: [
      'मराठी वृत्तपत्रसृष्टीचे जनक (Father of Marathi Journalism)',
      'आद्य पत्रकार (Pioneer Journalist)',
      'महाराष्ट्रातील आद्य इतिहास संशोधक'
    ],
    honorificTitlesEn: ['Father of Marathi Journalism', 'First Professor of Elphinstone Institute', 'Pioneer of Lithography'],
    penNamesMr: [],
    newspapersMr: [
      'दर्पण (६ जानेवारी १८३२ - मराठी व इंग्रजी दोन रकान्यांत, मराठीतील पहिले वृत्तपत्र)',
      'दिग्दर्शन (१८४० - मराठीतील पहिले मासिक, इतिहास व विज्ञानाचा प्रसार)'
    ],
    institutionsMr: [
      'बॉम्बे नेटिव्ह जनरल लायब्ररी (वाचनालय चळवळ)',
      'एल्फिन्स्टन इन्स्टिट्यूट (पहिले सहाय्यक मराठी प्राध्यापक)'
    ],
    booksAuthoredMr: [
      'हिंदुस्थानचा इतिहास',
      'इंग्लंड देशाची बखर',
      'शून्यलब्धी (गणितावरील पुस्तक)',
      'नीतिकथा'
    ],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      '६ जानेवारी १८३२ रोजी ‘दर्पण’ सुरू केले, म्हणून ६ जानेवारी हा दिवस महाराष्ट्रात ‘पत्रकार दिन’ (Patrakar Din) म्हणून साजरा केला जातो.',
      'श्रीपती शेषाद्री प्रकरण: ख्रिस्ती धर्म स्वीकारलेल्या मुलाला हिंदू धर्मात शुद्धीकरण करून पुन्हा घेतले.'
    ],
    mpscHighYieldPointersMr: [
      'मराठीतील पहिले वृत्तपत्र: ‘दर्पण’ (६ जानेवारी १८३२).',
      'मराठीतील पहिले मासिक: ‘दिग्दर्शन’ (१८४०).'
    ],
    pyqsCount: 30,
    avatarIcon: '📰',
    themeColor: 'from-blue-500/20 to-teal-500/20 border-blue-500/50 text-blue-300'
  },
  {
    id: 'tarkhadkar_dadoba',
    nameMr: 'दादोबा पांडुरंग तर्खडकर',
    nameEn: 'Dadoba Pandurang Tarkhadkar',
    birthDeath: '९ मे १८१४ – १७ ऑक्टोबर १८८२',
    birthPlaceMr: 'मुंबई',
    birthPlaceEn: 'Mumbai',
    category: 'social_equality',
    honorificTitlesMr: [
      'मराठी भाषेचे पाणिनी (Panini of Marathi Language - व्याकरणकार म्हणून)',
      'रावबहादूर'
    ],
    honorificTitlesEn: ['Panini of Marathi Grammar', 'Co-founder of Paramhansa Sabha'],
    penNamesMr: ['एक जगद्वासी आर्य'],
    newspapersMr: [],
    institutionsMr: [
      'मानवधर्म सभा (२२ जून १८४४ - सुरत येथे दुर्गाराम मंच्छाराम यांच्या समवेत)',
      'परमहंस सभा (३१ जुलै १८४९ - मुंबई येथे गुप्त सामाजिक संघटना)'
    ],
    booksAuthoredMr: [
      'महाराष्ट्र भाषेचे व्याकरण (१८३६ - अत्यंत प्रमाणभूत ग्रंथ)',
      'धर्मविवेचन (परमहंस सभेचा तत्त्वज्ञान ग्रंथ - "एक जगद्वासी आर्य" या टोपणनावाने)',
      'पारमहंसिक ब्राह्मधर्म',
      'यशोदा पांडुरंगी'
    ],
    famousQuotesMr: [
      'ईश्वर एकच आहे. मनुष्यजात एकच असून माणसाची योग्यता गुणांवरून ठरते, जातीवरून नाही.'
    ],
    keyMovementsAndEventsMr: [
      'परमहंस सभेचे सदस्य प्रवेश करताना सर्व जातींच्या लोकांनी एकत्र अन्न (पाव व पाणी) ग्रहण करण्याचा नियम होता.',
      'भिल्ल बंड शमवण्यात ब्रिटिश सरकारला मदत केली.'
    ],
    mpscHighYieldPointersMr: [
      '‘मराठी भाषेचे पाणिनी’ कोणाला म्हणतात? -> दादोबा पांडुरंग तर्खडकर.',
      'परमहंस सभेची स्थापना कधी व कुठे झाली? -> ३१ जुलै १८४९, मुंबई.'
    ],
    pyqsCount: 22,
    avatarIcon: '📖',
    themeColor: 'from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-300'
  },
  {
    id: 'pandita_ramabai',
    nameMr: 'पंडिता रमाबाई (रमाबाई अनंतशास्त्री डोंगरे)',
    nameEn: 'Pandita Ramabai',
    birthDeath: '२३ एप्रिल १८५८ – ५ एप्रिल १९२२',
    birthPlaceMr: 'गंगामूळ (कर्नाटक); कर्मभूमी: पुणे व केडगाव',
    birthPlaceEn: 'Gangamula (Karnataka); Workspace: Pune & Kedgaon',
    category: 'education_women',
    honorificTitlesMr: [
      'पंडिता व सरस्वती (कोलकाता येथील विद्वानांनी १८७८ मध्ये दिलेली पदवी)',
      'कैसर-ए-हिंद सुवर्णपदक (१९१९)'
    ],
    honorificTitlesEn: ['Pandita & Saraswati', 'Kaiser-i-Hind Gold Medal (1919)'],
    penNamesMr: [],
    newspapersMr: [],
    institutionsMr: [
      'आर्य महिला समाज (१ मे १८८२ - पुणे, न्या. रानडे यांच्या उपस्थितीत)',
      'शारदा सदन (११ मार्च १८८९ - मुंबई येथे सुरू, नंतर पुण्यात हलवले; विधवा स्त्रियांसाठी आश्रम)',
      'मुक्ती सदन (१८९८ - केडगाव, ता. दौंड, जि. पुणे; अनाथ, अंध व पीडितांसाठी)',
      'प्रीती सदन, कृपा सदन, सदानंद सदन'
    ],
    booksAuthoredMr: [
      'The High Caste Hindu Woman (१८८७ - अमेरिकेत प्रसिद्ध झालेले खळबळजनक पुस्तक)',
      'स्त्रीधर्मनीती (१८८२)',
      'अमेरिकन लोकांची स्थिती आणि विचार (१८८९)',
      'बायबलचे मराठी भाषांतर (स्वतः हिब्रू व ग्रीक भाषेतून थेट भाषांतर)'
    ],
    famousQuotesMr: [
      'स्त्री ही पुरुषाची दासी नसून तिची स्वतःची स्वतंत्र अस्मिता व बुद्धी आहे.'
    ],
    keyMovementsAndEventsMr: [
      '१८८२: हंटर शिक्षण आयोगासमोर साक्ष देऊन महिला शिक्षणासाठी महिला इन्स्पेक्टरांची मागणी केली.',
      '१८८९: काँग्रेसच्या ५ व्या अधिवेशनात (मुंबई) उपस्थित राहिलेल्या १० महिला प्रतिनिधींपैकी एक होत्या.'
    ],
    mpscHighYieldPointersMr: [
      '‘The High Caste Hindu Woman’ हे पुस्तक कोणी लिहिले? -> पंडिता रमाबाई (१८८७).',
      'केडगाव (पुणे) येथे ‘मुक्ती सदन’ची स्थापना कोणी केली? -> पंडिता रमाबाई.'
    ],
    pyqsCount: 29,
    avatarIcon: '🕊️',
    themeColor: 'from-rose-500/20 to-amber-500/20 border-rose-500/50 text-rose-300'
  },
  {
    id: 'tarabai_shinde',
    nameMr: 'ताराबाई शिंदे',
    nameEn: 'Tarabai Shinde',
    birthDeath: '१८५० – १९१०',
    birthPlaceMr: 'बुलढाणा (विदर्भ)',
    birthPlaceEn: 'Buldhana (Vidarbha)',
    category: 'education_women',
    honorificTitlesMr: [
      'भारतातील पहिल्या स्त्रीवादी विचारवंत (First Feminist Thinker of Modern India)'
    ],
    honorificTitlesEn: ['First Modern Feminist Writer of India'],
    penNamesMr: [],
    newspapersMr: [],
    institutionsMr: [
      'सत्यशोधक समाजाच्या सक्रिय कार्यकर्त्या'
    ],
    booksAuthoredMr: [
      'स्त्रीपुरुष तुलना (१८८२ - भारतातील पहिला जहाल स्त्रीवादी ग्रंथ)'
    ],
    famousQuotesMr: [
      'स्त्रियांच्या अंगी दुर्गुण असतात तर पुरुषांच्या अंगी कोणते सद्गुण असतात? पुरुषांचे सर्व दोष झाकून स्त्रियांना मात्र दोषी ठरवले जाते.'
    ],
    keyMovementsAndEventsMr: [
      '१८८२: सुरत येथील विजयालक्ष्मी या विधवेवर झालेल्या अन्यायाविरोधात त्यांनी ‘स्त्रीपुरुष तुलना’ हे पुस्तक लिहून तत्कालीन पुरुषप्रधान व्यवस्थेवर कडाडून हल्ला चढवला.',
      'महात्मा जोतीराव फुले यांनी ‘सत्सार’ अंकात ताराबाईंच्या पुस्तकाचे मनापासून कौतुक केले.'
    ],
    mpscHighYieldPointersMr: [
      'MPSC चा हमखास प्रश्न: ‘स्त्रीपुरुष तुलना’ (१८८२) हा ग्रंथ कोणी लिहिला? -> ताराबाई शिंदे (बुलढाणा).',
      'ताराबाई शिंदे यांच्या ग्रंथाचे समर्थन कोणत्या समाजसुधारकाने केले? -> महात्मा जोतीराव फुले (सत्सार अंक २).'
    ],
    pyqsCount: 25,
    avatarIcon: '⚡',
    themeColor: 'from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/50 text-fuchsia-300'
  },
  {
    id: 'lokmanya_tilak',
    nameMr: 'लोकमान्य बाळ गंगाधर टिळक',
    nameEn: 'Lokmanya Bal Gangadhar Tilak',
    birthDeath: '२३ जुलै १८५६ – १ ऑगस्ट १९२०',
    birthPlaceMr: 'चिखली (जि. रत्नागिरी); कर्मभूमी: पुणे',
    birthPlaceEn: 'Chikhali (Ratnagiri); Workspace: Pune',
    category: 'journalism_thinkers',
    honorificTitlesMr: [
      'लोकमान्य (जनतेने दिलेली पदवी)',
      'भारतीय असंतोषाचे जनक (Father of Indian Unrest - व्हॅलेंटाईन शिरोल यांनी म्हटले)',
      'हिंदुस्थानचे अनभिषिक्त राजा'
    ],
    honorificTitlesEn: ['Lokmanya', 'Father of Indian Unrest', 'Lion of Maratha'],
    penNamesMr: [],
    newspapersMr: [
      'मराठा (२ जानेवारी १८८१ - इंग्रजी वृत्तपत्र, संपादक: स्वतः टिळक)',
      'केसरी (४ जानेवारी १८८१ - मराठी वृत्तपत्र, पहिले संपादक: आगरकर, १८८७ नंतर टिळक)'
    ],
    institutionsMr: [
      'न्यू इंग्लिश स्कूल (१८८०), डेक्कन एज्युकेशन सोसायटी (१८८४), फर्ग्युसन कॉलेज (१८८५)',
      'सार्वजनिक गणेशोत्सव (१८९३) व शिवजयंती उत्सव (१८९५)',
      'होमरूल लीग (२८ एप्रिल १९१६ - बेळगाव येथे स्थापना)'
    ],
    booksAuthoredMr: [
      'गीतारहस्य (१९१५ - मंडालेच्या तुरुंगात ब्रह्मदेशात लिहिलेला कर्मयोग ग्रंथ)',
      'The Orion (१८९३ - वेदांच्या कालनिर्णयावर ग्रंथ)',
      'The Arctic Home in the Vedas (१९०३)'
    ],
    famousQuotesMr: [
      'स्वराज्य हा माझा जन्मसिद्ध हक्क आहे आणि तो मी मिळवणारच!',
      'सरकारचे डोके ठिकाणावर आहे काय? (केसरीतील प्रसिद्ध अग्रलेख)'
    ],
    keyMovementsAndEventsMr: [
      '१९०८ ते १९१४: मंडालेच्या (म्यानमार) तुरुंगात ६ वर्षांची काळ्या पाण्याची शिक्षा भोगली.',
      'चतुःसूत्री कार्यक्रम: १. स्वराज्य, २. स्वदेशी, ३. राष्ट्रीय शिक्षण, ४. बहिष्कार.'
    ],
    mpscHighYieldPointersMr: [
      '‘गीतारहस्य’ ग्रंथ टिळकांनी कोणत्या तुरुंगात लिहिला? -> मंडाले तुरुंग (ब्रह्मदेश/म्यानमार).',
      'होमरूल लीगची स्थापना टिळकांनी कोठे केली? -> बेळगाव (१९१६).'
    ],
    pyqsCount: 40,
    avatarIcon: '🦁',
    themeColor: 'from-amber-500/20 to-red-600/20 border-amber-500/50 text-amber-300'
  },
  {
    id: 'gokhale_gopal_krishna',
    nameMr: 'गोपाळ कृष्ण गोखले',
    nameEn: 'Gopal Krishna Gokhale',
    birthDeath: '९ मे १८६६ – १९ फेब्रुवारी १९१५',
    birthPlaceMr: 'कोतलूक (ता. गुहागर, जि. रत्नागिरी)',
    birthPlaceEn: 'Kotluk (Ratnagiri)',
    category: 'journalism_thinkers',
    honorificTitlesMr: [
      'महात्मा गांधींचे राजकीय गुरू',
      'भारताचा हिरा (महाराष्ट्र रत्न)',
      'मवाळ विचारसरणीचे मुकुटमणी'
    ],
    honorificTitlesEn: ['Political Guru of Mahatma Gandhi', 'Diamond of India', 'Moderate Statesman'],
    penNamesMr: [],
    newspapersMr: [
      'सुधारक (इंग्रजी विभागाचे संपादन केले)',
      'राष्ट्रसभा समाचार'
    ],
    institutionsMr: [
      'भारत सेवक समाज - Servants of India Society (१२ जून १९०५ - पुणे येथे स्थापना)',
      'सार्वजनिक सभेचे सचिव',
      'इम्पेरियल लेजिस्लेटिव्ह कौन्सिल सदस्य (१९०१ ते १९१५)'
    ],
    booksAuthoredMr: [
      'अर्थसंकल्पावरील भाषणे (Speeches on Indian Budget)'
    ],
    famousQuotesMr: [
      'सार्वजनिक जीवनाचे अध्यात्मीकरण झाले पाहिजे.'
    ],
    keyMovementsAndEventsMr: [
      '१९०५: बनारस येथील काँग्रेसच्या २१ व्या राष्ट्रीय अधिवेशनाचे अध्यक्षपद भूषवले.',
      '१९१२: दक्षिण आफ्रिकेत जाऊन गांधीजींच्या सत्याग्रहाला पाठिंबा दिला.'
    ],
    mpscHighYieldPointersMr: [
      '‘भारत सेवक समाज’ (Servants of India Society) ची स्थापना कोणी केली? -> गोपाळ कृष्ण गोखले (१२ जून १९०५).',
      'महात्मा गांधी आणि मोहम्मद अली जिना या दोघांचे राजकीय गुरू: गोपाळ कृष्ण गोखले.'
    ],
    pyqsCount: 31,
    avatarIcon: '🕊️',
    themeColor: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/50 text-cyan-300'
  },
  {
    id: 'gadge_maharaj',
    nameMr: 'संत गाडगे महाराज (डेबूजी झिंगराजी जानोरकर)',
    nameEn: 'Sant Gadge Maharaj',
    birthDeath: '२३ फेब्रुवारी १८७६ – २० डिसेंबर १९५६',
    birthPlaceMr: 'शेंडगाव (ता. दर्यापूर, जि. अमरावती)',
    birthPlaceEn: 'Shendgaon (Amravati)',
    category: 'saints_mass_awakening',
    honorificTitlesMr: [
      'स्वच्छतेचे आद्य प्रणेते (Father of Public Sanitation & Awakening)',
      'चिधड्यांचे बाबा (गाडगेबाबा)',
      'आधुनिक युगाचे कबीर'
    ],
    honorificTitlesEn: ['Pioneer of Village Sanitation', 'Saint of the Masses', 'Gadge Baba'],
    penNamesMr: [],
    newspapersMr: [],
    institutionsMr: [
      'पंढरपूर, आळंदी, देहू, नाशिक येथे धर्मशाळा, अनाथालये, कुष्ठरोग केंद्रे व गोशाळा उभारल्या.'
    ],
    booksAuthoredMr: [],
    famousQuotesMr: [
      'देवळात देव नाही, तो भुकेलेल्या माणसाच्या पोटात आणि अज्ञानांच्या सेवेत आहे! भुकेलेल्यांना अन्न द्या, तहानलेल्यांना पाणी द्या, उघड्यांना वस्त्र द्या, बेघरांना निवारा द्या आणि अज्ञानांना शिक्षण द्या!'
    ],
    keyMovementsAndEventsMr: [
      'हातात झाडू आणि गाडगे (खापराचे भांडे) घेऊन गावात जायचे; संपूर्ण गाव झाडून स्वच्छ करायचे आणि रात्री कीर्तनातून अंधश्रद्धा, जातीभेद आणि दारूवर प्रहार करायचे.',
      'डॉ. आंबेडकरांच्या पीपल्स एज्युकेशन सोसायटीला पंढरपूरची धर्मशाळा वसतिगृहासाठी दान दिली.'
    ],
    mpscHighYieldPointersMr: [
      'अमरावती विद्यापीठाचे नामकरण ‘संत गाडगे बाबा अमरावती विद्यापीठ’ असे करण्यात आले आहे.',
      'महाराष्ट्र शासनाची ‘संत गाडगेबाबा ग्राम स्वच्छता अभियान’ ही प्रसिद्ध योजना.'
    ],
    pyqsCount: 22,
    avatarIcon: '🧹',
    themeColor: 'from-amber-600/20 to-orange-500/20 border-amber-500/50 text-amber-200'
  },
  {
    id: 'tukdoji_maharaj',
    nameMr: 'राष्ट्रसंत तुकडोजी महाराज (माणिक बंडोजी ठाकूर/इंगळे)',
    nameEn: 'Rashtrasant Tukdoji Maharaj',
    birthDeath: '३० एप्रिल १९०९ – ११ ऑक्टोबर १९६८',
    birthPlaceMr: 'यावली (जि. अमरावती); कर्मभूमी: मोझरी (गुरुकुंज आश्रम)',
    birthPlaceEn: 'Yavali (Amravati); Workspace: Mozari',
    category: 'saints_mass_awakening',
    honorificTitlesMr: [
      'राष्ट्रसंत (डॉ. राजेंद्र प्रसाद यांनी दिलेली पदवी)',
      'खंजिरी सम्राट'
    ],
    honorificTitlesEn: ['Rashtrasant', 'Author of Gramgeeta'],
    penNamesMr: ['तुकड्या'],
    newspapersMr: [],
    institutionsMr: [
      'अखिल भारतीय श्री गुरुदेव सेवा मंडळ (गुरुकुंज आश्रम, मोझरी, जि. अमरावती)'
    ],
    booksAuthoredMr: [
      'ग्रामगीता (अजरामर लोकशिक्षण ग्रंथ - ४१ अध्याय)',
      'राष्ट्रीय भजनावली',
      'लहरी तरंग',
      'अनुभव सागर'
    ],
    famousQuotesMr: [
      'गावे हेची आमुचे दैवत, गावची करावी पूजा! गावाची समृद्धी हीच देशाची ताकद.'
    ],
    keyMovementsAndEventsMr: [
      '१९४२ च्या ‘भारत छोडो’ आंदोलनात "झाडझुड शस्त्र बनेंगे, भक्त बनके रहेंगे" या भजनाने तरुणांमध्ये क्रांतीची ज्योत पेटवली; तुरुंगवास भोगला.',
      '१९५५: जपानमध्ये भरलेल्या जागतिक धर्म परिषदेत भारताचे प्रतिनिधित्व केले.'
    ],
    mpscHighYieldPointersMr: [
      'नागपूर विद्यापीठाचे नामकरण ‘राष्ट्रसंत तुकडोजी महाराज नागपूर विद्यापीठ’ (RTMNU) करण्यात आले आहे.',
      '‘ग्रामगीता’ हा ग्रंथ कोणी लिहिला? -> राष्ट्रसंत तुकडोजी महाराज (४१ अध्याय).'
    ],
    pyqsCount: 20,
    avatarIcon: '🎶',
    themeColor: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/50 text-yellow-300'
  },
  {
    id: 'lokhande_nm',
    nameMr: 'नारायण मेघाजी लोखंडे',
    nameEn: 'Narayan Meghaji Lokhande',
    birthDeath: '१८४८ – ९ फेब्रुवारी १८९७',
    birthPlaceMr: 'ठाणे (कर्मभूमी: मुंबई)',
    birthPlaceEn: 'Thane (Workspace: Mumbai)',
    category: 'tribal_working_class',
    honorificTitlesMr: [
      'भारतीय कामगार चळवळीचे जनक (Father of Indian Trade Union Movement)',
      'रावबहादूर (१८९५)',
      'जस्टिस ऑफ पीस (JP)'
    ],
    honorificTitlesEn: ['Father of Indian Labour Movement', 'Rao Bahadur', 'Pioneer of Mill Hands Association'],
    penNamesMr: [],
    newspapersMr: [
      'दीनबंधू (१८८० पासून मुंबईतून दीनबंधूचे यशस्वी संपादन केले)'
    ],
    institutionsMr: [
      'बॉम्बे मिल हँड्स असोसिएशन - Bombay Mill Hands Association (२३ सप्टेंबर १८८४ - भारतातील पहिली कामगार संघटना)',
      'सत्यशोधक समाज मुंबई शाखा (अध्यक्ष)'
    ],
    booksAuthoredMr: [],
    famousQuotesMr: [
      'कामगारांना न्याय मिळाल्याशिवाय देशाचा औद्योगिक विकास शक्य नाही.'
    ],
    keyMovementsAndEventsMr: [
      '२४ एप्रिल १८९०: मुंबईत रेसकोर्सवर सुमारे १०,००० गिरणी कामगारांची भव्य सभा घेऊन रविवारच्या साप्ताहिक सुट्टीची मागणी केली.',
      '१० जून १८९० रोजी ब्रिटिश सरकारने कामगारांना दर रविवारी साप्ताहिक पगारी सुट्टी मंजूर केली (भारतातील रविवारच्या सुट्टीचे जनक!).',
      '१८९७: मुंबईत प्लेगच्या साथीमध्ये कामगारांची सेवा करताना प्लेगची लागण होऊन मरण पावले.'
    ],
    mpscHighYieldPointersMr: [
      'भारतातील पहिली कामगार संघटना कोणती? -> बॉम्बे मिल हँड्स असोसिएशन (१८८४).',
      'रविवारच्या साप्ताहिक सुट्टीचे जनक: नारायण मेघाजी लोखंडे.'
    ],
    pyqsCount: 26,
    avatarIcon: '🏭',
    themeColor: 'from-red-500/20 to-amber-500/20 border-red-500/50 text-red-300'
  },
  {
    id: 'bhalekar_krishnarao',
    nameMr: 'कृष्णराव पांडुरंग भालेकर',
    nameEn: 'Krishnarao Bhalekar',
    birthDeath: '१८४५ – १८९८',
    birthPlaceMr: 'भांबुर्डे (शिवाजीनगर, पुणे)',
    birthPlaceEn: 'Bhamburda (Pune)',
    category: 'social_equality',
    honorificTitlesMr: [
      'सत्यशोधक चळवळीचे पहिले पत्रकार',
      'दीनबंधूचे आद्य संस्थापक'
    ],
    honorificTitlesEn: ['Founder of Dinbandhu', 'Satya Shodhak Pioneer'],
    penNamesMr: [],
    newspapersMr: [
      'दीनबंधू (१ जानेवारी १८७७ - पुणे येथून सुरू केलेले सत्यशोधक समाजाचे पहिले वृत्तपत्र)'
    ],
    institutionsMr: [
      'सत्यशोधक समाजाचे संस्थापक सदस्य',
      'गुंजवनातील शेतकऱ्यांची सभा'
    ],
    booksAuthoredMr: [
      'बळीबा पाटील (कादंबरी)',
      'शेतकऱ्यांचे कैवारी'
    ],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      '१८७७ च्या दुष्काळात शेतकऱ्यांच्या समस्या मांडण्यासाठी स्वतःच्या खिशातील पैसे खर्च करून ‘दीनबंधू’ साप्ताहिक सुरू केले.'
    ],
    mpscHighYieldPointersMr: [
      '‘दीनबंधू’ वृत्तपत्र १ जानेवारी १८७७ रोजी कोणी सुरू केले? -> कृष्णराव भालेकर (पुणे).',
      'सत्यशोधक समाजाचे पहिले अधिकृत वृत्तपत्र कोणते? -> दीनबंधू.'
    ],
    pyqsCount: 18,
    avatarIcon: '📰',
    themeColor: 'from-amber-600/20 to-stone-700/20 border-amber-500/50 text-amber-200'
  },
  {
    id: 'panjabrao_deshmukh',
    nameMr: 'डॉ. पंजाबराव (भाऊसाहेब) शामराव देशमुख',
    nameEn: 'Dr. Panjabrao Deshmukh',
    birthDeath: '२७ डिसेंबर १८९८ – १० एप्रिल १९६५',
    birthPlaceMr: 'पापळ (जि. अमरावती)',
    birthPlaceEn: 'Papal (Amravati)',
    category: 'education_women',
    honorificTitlesMr: [
      'शिक्षण महर्षी (Education Sage of Vidarbha)',
      'कृषीरत्न',
      'स्वतंत्र भारताचे पहिले कृषी मंत्री (१९५२ ते १९६२)'
    ],
    honorificTitlesEn: ['First Agriculture Minister of Independent India', 'Shikshan Maharshi'],
    penNamesMr: [],
    newspapersMr: [
      'महाराष्ट्र केसरी (वृत्तपत्र)'
    ],
    institutionsMr: [
      'श्री शिवाजी शिक्षण संस्था (१९३१/१९३२ - अमरावती; विदर्भातील सर्वात मोठी शिक्षण संस्था)',
      'भारत कृषक समाज (१९५५ - नवी दिल्ली)',
      'राष्ट्रीय कृषी सहकारी विपणन महासंघ (NAFED - संस्थापक)',
      'श्रद्धानंद छात्रालय (अमरावती)'
    ],
    booksAuthoredMr: [
      'The Origin and Development of Religion in Vedic Literature (ऑक्सफर्ड विद्यापीठातील डॉक्टरेट प्रबंध)'
    ],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      '१९२६: अंबादेवी मंदिर (अमरावती) सत्याग्रहात अस्पृश्यांना प्रवेश मिळवून देण्यासाठी नेतृत्व केले.',
      '१९५९: नवी दिल्ली येथे ‘जागतिक कृषी प्रदर्शन’ (World Agriculture Fair) भरवले.'
    ],
    mpscHighYieldPointersMr: [
      'स्वतंत्र भारताचे पहिले कृषी मंत्री कोण होते? -> डॉ. पंजाबराव देशमुख.',
      'अकोला येथील कृषी विद्यापीठाचे नाव: डॉ. पंजाबराव देशमुख कृषी विद्यापीठ (PDKV).'
    ],
    pyqsCount: 27,
    avatarIcon: '🌾',
    themeColor: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/50 text-emerald-300'
  },
  {
    id: 'vishnushastri_pandit',
    nameMr: 'विष्णू परशुराम शास्त्री पंडित',
    nameEn: 'Vishnushastri Pandit',
    birthDeath: '१८२७ – १८७६',
    birthPlaceMr: 'सातारा (कर्मभूमी: पुणे व मुंबई)',
    birthPlaceEn: 'Satara',
    category: 'education_women',
    honorificTitlesMr: [
      'महाराष्ट्राचे ईश्वरचंद्र विद्यासागर (विधवा विवाहाचे महान पुरस्कर्ते)'
    ],
    honorificTitlesEn: ['Ishwar Chandra Vidyasagar of Maharashtra', 'Pioneer of Widow Remarriage'],
    penNamesMr: [],
    newspapersMr: [
      'इंदुप्रकाश (संपादक म्हणून काम पाहिले)'
    ],
    institutionsMr: [
      'पुनर्विवाह उत्तेजक मंडळी (१८६५ - मुंबई, न्या. रानडे यांच्या समवेत)'
    ],
    booksAuthoredMr: [
      'विधवा विवाह (ईश्वरचंद्र विद्यासागर यांच्या बंगाली पुस्तकाचे मराठी भाषांतर)',
      'ब्राह्मण कन्या विवाह विचार'
    ],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      '१८६९: पुण्यात पहिला जाहीर विधवा पुनर्विवाह घडवून आणला (वेणूबाई व मोरेश्वर रानडे).',
      '१८७४: स्वतः कुसाबाई या विधवेशी पुनर्विवाह करून कृतीतून आदर्श ठेवला.'
    ],
    mpscHighYieldPointersMr: [
      '‘पुनर्विवाह उत्तेजक मंडळी’ची स्थापना १८६५ मध्ये कोणी केली? -> विष्णूशास्त्री पंडित.',
      'महाराष्ट्राचे ‘ईश्वरचंद्र विद्यासागर’ कोणाला म्हटले जाते? -> विष्णूशास्त्री पंडित.'
    ],
    pyqsCount: 20,
    avatarIcon: '📜',
    themeColor: 'from-amber-500/20 to-orange-500/20 border-amber-500/50 text-amber-300'
  },
  {
    id: 'annabhau_sathe',
    nameMr: 'लोकशाहीर अण्णाभाऊ साठे (तुकाराम भाऊराव साठे)',
    nameEn: 'Annabhau Sathe',
    birthDeath: '१ ऑगस्ट १९२० – १८ जुलै १९६९',
    birthPlaceMr: 'वाटेगाव (ता. वाळवा, जि. सांगली); कर्मभूमी: मुंबई',
    birthPlaceEn: 'Wategaon (Sangli); Workspace: Mumbai',
    category: 'tribal_working_class',
    honorificTitlesMr: [
      'लोकशाहीर',
      'संयुक्त महाराष्ट्र चळवळीचे बुलंद आवाज'
    ],
    honorificTitlesEn: ['Lokshahir', 'Peoples Bard of Maharashtra'],
    penNamesMr: [],
    newspapersMr: [],
    institutionsMr: [
      'लाल बावटा कलापथक (१९४४ - अमर शेख, डी. एन. गव्हाणकर यांच्या समवेत)'
    ],
    booksAuthoredMr: [
      'फकिरा (१९५९ - प्रसिद्ध ऐतिहासिक कादंबरी, महाराष्ट्र शासनाचा सर्वोत्कृष्ट कादंबरी पुरस्कार)',
      'वारणेचा वाघ',
      'चित्रा, रानगंगा, आवडी',
      'माझी मैना गावावर राहिली (संयुक्त महाराष्ट्रावरील अजरामर लावणी)',
      'रशियाचा प्रवास (प्रवासवर्णन)'
    ],
    famousQuotesMr: [
      'जग बदल घालूनी घाव । सांगून गेले मज भीमराव ॥',
      'ही पृथ्वी शेषाच्या मस्तकावर तरलेली नसून ती कष्टकऱ्यांच्या तळहातावर तरलेली आहे.'
    ],
    keyMovementsAndEventsMr: [
      'संयुक्त महाराष्ट्र चळवळीत आपल्या शाहिरीने व डफाच्या तालावर लाखोंच्या मनात चळवळीची मशाल पेटवली.',
      'कादंबऱ्यांचे रशियन, पोलिश, झेक आदी जागतिक भाषांत भाषांतर झाले.'
    ],
    mpscHighYieldPointersMr: [
      '‘फकिरा’ या कादंबरीचे लेखक कोण? -> अण्णाभाऊ साठे (कादंबरी डॉ. आंबेडकरांना समर्पित केली).',
      '‘लाल बावटा कलापथक’ची स्थापना: अण्णाभाऊ साठे, अमर शेख व गव्हाणकर (१९४४).'
    ],
    pyqsCount: 24,
    avatarIcon: '🪘',
    themeColor: 'from-red-600/20 to-amber-500/20 border-red-500/50 text-red-300'
  },
  {
    id: 'baba_amte',
    nameMr: 'बाबा आमटे (मुरलीधर देवीदास आमटे)',
    nameEn: 'Baba Amte',
    birthDeath: '२६ डिसेंबर १९१४ – ९ फेब्रुवारी २००८',
    birthPlaceMr: 'हिंगणघाट (जि. वर्धा); कर्मभूमी: वरोरा (जि. चंद्रपूर)',
    birthPlaceEn: 'Hinganghat (Wardha); Workspace: Warora (Chandrapur)',
    category: 'social_equality',
    honorificTitlesMr: [
      'मॅगसेसे पुरस्कार (१९८५)',
      'पद्मविभूषण (१९८६)',
      'गांधी शांतता पुरस्कार (१९९९)',
      'आधुनिक भारताचे संत फ्रान्सिस'
    ],
    honorificTitlesEn: ['Ramon Magsaysay Awardee', 'Padma Vibhushan', 'Savior of Leprosy Patients'],
    penNamesMr: [],
    newspapersMr: [],
    institutionsMr: [
      'महारोगी सेवा समिती (१९४९ - आनंदवन, वरोरा, जि. चंद्रपूर)',
      'हेमलकसा (गडचिरोली - डॉ. प्रकाश आमटे यांचे लोकबिरादरी प्रकल्प)',
      'सोमनाथ प्रकल्प (श्रमसंस्कार छावणी)'
    ],
    booksAuthoredMr: [
      'ज्वाला आणि फुले (काव्यसंग्रह)',
      'उज्ज्वल उद्यासाठी'
    ],
    famousQuotesMr: [
      'मी कुष्ठरोग्यांना दया देत नाही, मी त्यांना त्यांचे स्वाभिमानाचे आणि श्रमाचे जीवन देतो.'
    ],
    keyMovementsAndEventsMr: [
      'आनंदवनची स्थापना करून कुष्ठरोग्यांना स्वतःच्या पायावर उभे केले.',
      '‘भारत जोडो’ राष्ट्रीय एकात्मता सायकल यात्रा (१९८५ व १९८८ - कन्याकुमारी ते काश्मीर).',
      'नर्मदा बचाव आंदोलनात मेधा पाटकर यांच्यासोबत सक्रिय सहभाग.'
    ],
    mpscHighYieldPointersMr: [
      '‘आनंदवन’ (वरोरा, चंद्रपूर) ची स्थापना कोणी केली? -> बाबा आमटे (१९४९).',
      '‘ज्वाला आणि फुले’ हा कवितासंग्रह कोणाचा आहे? -> बाबा आमटे.'
    ],
    pyqsCount: 22,
    avatarIcon: '🌱',
    themeColor: 'from-emerald-600/20 to-teal-500/20 border-emerald-500/50 text-emerald-300'
  },
  {
    id: 'sane_guruji',
    nameMr: 'साने गुरुजी (पांडुरंग सदाशिव साने)',
    nameEn: 'Sane Guruji (Pandurang Sadashiv Sane)',
    birthDeath: '२४ डिसेंबर १८९९ – ११ जून १९५०',
    birthPlaceMr: 'पालगड (ता. दापोली, जि. रत्नागिरी); कर्मभूमी: अमळनेर (जि. जळगाव)',
    birthPlaceEn: 'Palgad (Ratnagiri); Workspace: Amalner (Jalgaon)',
    category: 'social_equality',
    honorificTitlesMr: [
      'साने गुरुजी',
      'कष्टकऱ्यांचे व मुलांचे लाडके मित्र',
      'महाराष्ट्राचे अंतःकरण'
    ],
    honorificTitlesEn: ['Sane Guruji', 'Author of Shyamchi Aai'],
    penNamesMr: [],
    newspapersMr: [
      'साधना (१५ ऑगस्ट १९४८ - प्रसिद्ध साप्ताहिक, पहिले संपादक)',
      'काँग्रेस (साप्ताहिक)'
    ],
    institutionsMr: [
      'राष्ट्र सेवा दल (सक्रिय नेते व मार्गदर्शक)',
      'अमळनेर येथील प्रताप हायस्कूल'
    ],
    booksAuthoredMr: [
      'श्यामची आई (नाशिकच्या तुरुंगात लिहिलेली अमर कादंबरी)',
      'खरा तो एकची धर्म जगाला प्रेम अर्पावे (प्रसिद्ध प्रार्थना)',
      'भारतीय संस्कृती',
      'धडपडणारी मुले'
    ],
    famousQuotesMr: [
      'खरा तो एकची धर्म, जगाला प्रेम अर्पावे । प्रभूने ज्यास जे दिले, ते त्याने तेथे वाटावे ॥'
    ],
    keyMovementsAndEventsMr: [
      '१ ते १० मे १९४७: पंढरपूरचे विठ्ठल मंदिर अस्पृश्यांसाठी खुले करण्यासाठी ऐतिहासिक आमरण उपोषण केले; शेवटी मंदिर अस्पृश्यांसाठी खुले झाले.',
      'धुळे व नाशिक तुरुंगात स्वातंत्र्यलढ्यात सहभाग.'
    ],
    mpscHighYieldPointersMr: [
      '‘साधना’ साप्ताहिकाची स्थापना कोणी केली? -> साने गुरुजी (१५ ऑगस्ट १९४८).',
      'पंढरपूर मंदिर प्रवेशासाठी आमरण उपोषण कोणी केले? -> साने गुरुजी (१९४७).'
    ],
    pyqsCount: 21,
    avatarIcon: '❤️',
    themeColor: 'from-rose-500/20 to-red-500/20 border-rose-500/50 text-rose-300'
  },
  {
    id: 'sarvajanik_kaka',
    nameMr: 'गणेश वासुदेव जोशी (सार्वजनिक काका)',
    nameEn: 'Ganesh Vasudev Joshi (Sarvajanik Kaka)',
    birthDeath: '९ एप्रिल १८२८ – २५ जुलै १८८०',
    birthPlaceMr: 'पुणे',
    birthPlaceEn: 'Pune',
    category: 'journalism_thinkers',
    honorificTitlesMr: [
      'सार्वजनिक काका (पुणे सार्वजनिक सभेचे कार्यवाह म्हणून लोकप्रिय नाव)',
      'स्वदेशी चळवळीचे आद्य प्रणेते'
    ],
    honorificTitlesEn: ['Sarvajanik Kaka', 'Pioneer of Khadi and Swadeshi'],
    penNamesMr: [],
    newspapersMr: [
      'पुणे सार्वजनिक सभा त्रैमासिक (Quarterly Journal of Poona Sarvajanik Sabha)'
    ],
    institutionsMr: [
      'पुणे सार्वजनिक सभा (२ एप्रिल १८७० - भवानराव पंतप्रतिनिधी अध्यक्ष, जोशी कार्यवाह)',
      'स्वदेशी मालाचे दुकान (पुणे - खादीचा पोशाख परिधान करत असत)'
    ],
    booksAuthoredMr: [],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      '१८७७ च्या दिल्ली दरबारात संपूर्ण खादीचा पोशाख घालून गेले आणि राणी व्हिक्टोरियासमोर "भारताला राजकीय समता व स्वायत्तता द्यावी" अशी जाहीर मागणी वाचून दाखवली.',
      'वासुदेव बळवंत फडके यांचे कोर्टात वकीलपत्र सार्वजनिक काकांनी घेतले होते.'
    ],
    mpscHighYieldPointersMr: [
      '१८७७ च्या दिल्ली दरबारात हातमागाची खादी घालून जाणारे समाजसुधारक: गणेश वासुदेव जोशी.',
      'वासुदेव बळवंत फडके यांचे वकीलपत्र कोणी घेतले होते? -> सार्वजनिक काका.'
    ],
    pyqsCount: 19,
    avatarIcon: '🧵',
    themeColor: 'from-amber-500/20 to-stone-700/20 border-amber-500/50 text-amber-300'
  },
  {
    id: 'ramabai_ranade',
    nameMr: 'रमाबाई महादेव रानडे',
    nameEn: 'Ramabai Ranade',
    birthDeath: '२५ जानेवारी १८६२ – २५ एप्रिल १९२४',
    birthPlaceMr: 'देवराष्ट्रे (जि. सांगली); कर्मभूमी: पुणे व मुंबई',
    birthPlaceEn: 'Devrashtre (Sangli); Workspace: Pune & Mumbai',
    category: 'education_women',
    honorificTitlesMr: [
      'आधुनिक महाराष्ट्रातील अग्रगण्य समाजसेविका',
      'सेवासदनच्या संस्थापिका'
    ],
    honorificTitlesEn: ['Founder of Seva Sadan', 'Pioneer Women Activist'],
    penNamesMr: [],
    newspapersMr: [],
    institutionsMr: [
      'पुणे सेवासदन (१९०९ - जी. के. देवधर यांच्या सहकार्याने स्थापन; महिलांना नर्सिंग व स्वावलंबनाचे शिक्षण)',
      'हिंदू लेडीज सोशल क्लब (मुंबई)'
    ],
    booksAuthoredMr: [
      'आमच्या आयुष्यातील काही आठवणी (विख्यात आत्मचरित्र)'
    ],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      'न्या. रानडे यांच्या मृत्यूनंतर महिलांच्या सर्वांगीण विकासासाठी संपूर्ण आयुष्य समर्पित केले.',
      'येरवडा तुरुंगातील महिला कैद्यांना भेट देऊन त्यांच्यात सुधारणा घडवून आणली.'
    ],
    mpscHighYieldPointersMr: [
      '‘पुणे सेवासदन’ची स्थापना कोणी केली? -> रमाबाई रानडे व जी. के. देवधर (१९०९).',
      '‘आमच्या आयुष्यातील काही आठवणी’ हे आत्मचरित्र कोणाचे? -> रमाबाई रानडे.'
    ],
    pyqsCount: 22,
    avatarIcon: '🪷',
    themeColor: 'from-pink-500/20 to-rose-500/20 border-pink-500/50 text-pink-300'
  },
  {
    id: 'rakhmabai_raut',
    nameMr: 'डॉ. रखमाबाई जनार्दन सावे / राऊत',
    nameEn: 'Dr. Rakhmabai Raut',
    birthDeath: '२२ नोव्हेंबर १८६४ – २५ सप्टेंबर १९५५',
    birthPlaceMr: 'मुंबई',
    birthPlaceEn: 'Mumbai',
    category: 'education_women',
    honorificTitlesMr: [
      'भारतातील पहिल्या प्रॅक्टिसिंग महिला डॉक्टर (First Practicing Woman Doctor of India)'
    ],
    honorificTitlesEn: ['First Practicing Female Physician of India', 'Heroine of Age of Consent Campaign'],
    penNamesMr: ['ए हिंदू लेडी (A Hindu Lady)'],
    newspapersMr: [
      'द टाईम्स ऑफ इंडिया मध्ये "ए हिंदू लेडी" या टोपणनावाने बालविवाह व संमतीवयावर गाजलेली पत्रे लिहिली'
    ],
    institutionsMr: [
      'राजकोट येथील रेडक्रॉस सोसायटी व रुग्णालय प्रमुख'
    ],
    booksAuthoredMr: [],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      '१८८५: दादाजी भिकाजी वि. रखमाबाई खटला - बालपणी झालेला विवाह नाकारत पतीसोबत जाण्यास नकार दिला; तुरुंगवास पत्करण्याची तयारी दर्शवली.',
      'या खटल्यामुळे भारतात संमतीवय कायदा (Age of Consent Act, 1891) लागू होण्यास मोठी गती मिळाली.'
    ],
    mpscHighYieldPointersMr: [
      'दादाजी वि. रखमाबाई खटल्याचा संबंध कोणत्या कायद्याशी होता? -> संमतीवय कायदा (Age of Consent Act, 1891).',
      '‘द टाईम्स ऑफ इंडिया’मध्ये ‘A Hindu Lady’ नावाने लेख लिहिणाऱ्या समाजसुधारक: डॉ. रखमाबाई राऊत.'
    ],
    pyqsCount: 19,
    avatarIcon: '🩺',
    themeColor: 'from-teal-500/20 to-cyan-500/20 border-teal-500/50 text-teal-300'
  },
  {
    id: 'dr_anandibai_joshi',
    nameMr: 'डॉ. आनंदीबाई गोपाळराव जोशी',
    nameEn: 'Dr. Anandibai Joshi',
    birthDeath: '३१ मार्च १८६५ – २६ फेब्रुवारी १८८७ (अवघे २१ वर्षे आयुष्य)',
    birthPlaceMr: 'कल्याण (जि. ठाणे)',
    birthPlaceEn: 'Kalyan (Thane)',
    category: 'education_women',
    honorificTitlesMr: [
      'भारतातील पहिल्या महिला डॉक्टर (First Female Physician to graduate from USA, 1886)'
    ],
    honorificTitlesEn: ['First Indian Woman Physician'],
    penNamesMr: [],
    newspapersMr: [],
    institutionsMr: [],
    booksAuthoredMr: [],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      'अमेरिकेतील पेनसिल्व्हेनिया विमेन्स मेडिकल कॉलेजमधून ११ मार्च १८८६ रोजी MD पदवी मिळवली.',
      'अवघ्या २१ व्या वर्षी क्षयरोगाने (TB) निधन झाले, तरी त्यांनी भारतीय महिलांसाठी वैद्यकीय शिक्षणाचे दरवाजे उघडले.'
    ],
    mpscHighYieldPointersMr: [
      'अमेरिकेतून वैद्यकीय पदवी (MD) घेणाऱ्या पहिल्या भारतीय महिला: डॉ. आनंदीबाई जोशी (१८८६).'
    ],
    pyqsCount: 16,
    avatarIcon: '👩‍⚕️',
    themeColor: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/50 text-indigo-300'
  },
  {
    id: 'savarkar_vd',
    nameMr: 'स्वातंत्र्यवीर विनायक दामोदर सावरकर',
    nameEn: 'Vinayak Damodar Savarkar',
    birthDeath: '२८ मे १८८३ – २६ फेब्रुवारी १९६६',
    birthPlaceMr: 'भगूर (जि. नाशिक); कर्मभूमी: रत्नागिरी',
    birthPlaceEn: 'Bhagur (Nashik); Workspace: Ratnagiri',
    category: 'social_equality',
    honorificTitlesMr: [
      'स्वातंत्र्यवीर',
      'भाषाशुद्धी व समाजसुधारक'
    ],
    honorificTitlesEn: ['Swatantryaveer', 'Pioneer of Patit Pavan Temple & Social Reform'],
    penNamesMr: ['बाबाराव', 'वि. दा. सा.'],
    newspapersMr: [],
    institutionsMr: [
      'मित्रमेळा (१८९९) / अभिनव भारत (१९०४ - नाशिक)',
      'पतित पावन मंदिर (१९३१ - रत्नागिरी; सर्व जातींच्या लोकांना समान प्रवेश असलेले मंदिर)'
    ],
    booksAuthoredMr: [
      '१८५७ चे स्वातंत्र्यसमर (The Indian War of Independence 1857)',
      'माझी जन्मठेप (अंदमानच्या काळ्या पाण्याची आठवण)',
      'जातिउच्छेदक निबंध (अस्पृश्यता निर्मूलनावरील तेजस्वी विचार)',
      'भाषाशुद्धी (मराठीत शेकडो नवे शब्द दिले: उदा. महापौर, मुख्याध्यापक, दिनांक, नाटक, खासदार, संपादक)'
    ],
    famousQuotesMr: [
      'अस्पृश्यता हा हिंदू धर्माला लागलेला मोठा कलंक आहे. सात शृंखला (वेदोक्तबंदी, व्यवसायबंदी, स्पर्शबंदी, समुद्रबंदी, इ.) तोडल्या पाहिजेत.'
    ],
    keyMovementsAndEventsMr: [
      '१९२४ ते १९३७ दरम्यान रत्नागिरीत स्थानबद्धतेत असताना समाजसुधारणेवर भर दिला.',
      'सर्व जातींच्या लोकांचे एकत्र ‘सहभोजन’ (Inter-caste dining) आयोजित केले.',
      'पतित पावन मंदिराची स्थापना केली.'
    ],
    mpscHighYieldPointersMr: [
      'रत्नागिरीत सर्वजातीय ‘पतित पावन मंदिर’ (१९३१) कोणी स्थापन केले? -> वि. दा. सावरकर.',
      '‘१८५७ चे स्वातंत्र्यसमर’ हा ग्रंथ कोणी लिहिला? -> वि. दा. सावरकर.'
    ],
    pyqsCount: 28,
    avatarIcon: '🔥',
    themeColor: 'from-orange-500/20 to-amber-500/20 border-orange-500/50 text-orange-300'
  },
  {
    id: 'prabodhankar_thackeray',
    nameMr: 'प्रबोधनकार केशव सीताराम ठाकरे',
    nameEn: 'Prabodhankar K. S. Thackeray',
    birthDeath: '१७ सप्टेंबर १८८५ – २० नोव्हेंबर १९७३',
    birthPlaceMr: 'पनवेल (जि. रायगड); कर्मभूमी: पुणे व मुंबई',
    birthPlaceEn: 'Panvel (Raigad)',
    category: 'journalism_thinkers',
    honorificTitlesMr: [
      'प्रबोधनकार (प्रबोधन पाक्षिकावरून मिळालेली पदवी)'
    ],
    honorificTitlesEn: ['Prabodhankar', 'Journalist & Social Reformer'],
    penNamesMr: ['प्रबोधनकार'],
    newspapersMr: [
      'प्रबोधन (पाक्षिक - ऑक्टोबर १९२१)',
      'सारथी'
    ],
    institutionsMr: [
      'सी. के. पी. सभा',
      'संयुक्त महाराष्ट्र चळवळीत प्रमुख मार्गदर्शक'
    ],
    booksAuthoredMr: [
      'माझी जीवनगाथा (प्रसिद्ध आत्मचरित्र)',
      'ग्रामण्यांचा साद्यंत इतिहास',
      'देवळांचा धर्म आणि धर्माची देवळे',
      'दगलबाज शिवाजी'
    ],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      'हुंडा प्रथा, जातीय विषमता आणि धार्मिक दांभिकतेविरुद्ध लेखणी चालवली.',
      'संयुक्त महाराष्ट्र चळवळीत डॉ. आंबेडकरांच्या समवेत विचारमंचावर काम केले.'
    ],
    mpscHighYieldPointersMr: [
      '‘प्रबोधन’ पाक्षिक कोणी सुरू केले? -> प्रबोधनकार के. सी. ठाकरे (१९२१).',
      '‘माझी जीवनगाथा’ हे आत्मचरित्र कोणाचे आहे? -> प्रबोधनकार ठाकरे.'
    ],
    pyqsCount: 16,
    avatarIcon: '✍️',
    themeColor: 'from-amber-600/20 to-stone-800/20 border-amber-500/50 text-amber-200'
  },
  {
    id: 'lahuji_salve',
    nameMr: 'क्रांतीगुरू लहुजी राघोजी साळवे (लहुजी वस्ताद)',
    nameEn: 'Lahuji Raghoji Salve',
    birthDeath: '१७९४ – १७ फेब्रुवारी १८८१',
    birthPlaceMr: 'पुरंदर (जि. पुणे)',
    birthPlaceEn: 'Purandar (Pune)',
    category: 'tribal_working_class',
    honorificTitlesMr: [
      'क्रांतीगुरू (महात्मा फुले व अनेक क्रांतिकारकांचे व्यायाम व शस्त्रगुरू)',
      'लहुजी वस्ताद'
    ],
    honorificTitlesEn: ['Krantiguru', 'Lahuji Vastad'],
    penNamesMr: [],
    newspapersMr: [],
    institutionsMr: [
      'पुण्यातील गंज पेठेत तालीम (आखाडा - १८२२)'
    ],
    booksAuthoredMr: [],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      'महात्मा जोतीराव फुले यांनी १८४८ मध्ये मुलींची शाळा सुरू केली तेव्हा शाळेच्या संरक्षणासाठी आणि मुलींना आणण्या-नेण्यासाठी लहुजी वस्तादांनी आपल्या शिष्यांची मदत दिली.',
      'वासुदेव बळवंत फडके, लोकमान्य टिळक यांच्यासारख्या क्रांतीकारकांना व्यायाम व लाठीकाठीचे धडे दिले.'
    ],
    mpscHighYieldPointersMr: [
      'महात्मा फुलेंच्या पहिल्या शाळेला संरक्षण देणारे क्रांतीगुरू: लहुजी वस्ताद साळवे.'
    ],
    pyqsCount: 14,
    avatarIcon: '🗡️',
    themeColor: 'from-red-600/20 to-orange-600/20 border-red-500/50 text-red-300'
  },
  {
    id: 'kisan_fagu_bansode',
    nameMr: 'किसन फागुजी बनसोडे',
    nameEn: 'Kisan Fagu Bansode',
    birthDeath: '१८७९ – १० ऑक्टोबर १९४६',
    birthPlaceMr: 'मोहपा (जि. नागपूर)',
    birthPlaceEn: 'Mohapa (Nagpur)',
    category: 'dalit_depressed',
    honorificTitlesMr: [
      'विदर्भातील दलित चळवळीचे आद्य प्रवर्तक'
    ],
    honorificTitlesEn: ['Pioneer Dalit Reformer of Vidarbha'],
    penNamesMr: [],
    newspapersMr: [
      'निराश्रित हिंद नागरिक (१९१०)',
      'विटाळ विध्वंसक (मासिक)',
      'मजूर पत्रिका',
      'चोखामेळा'
    ],
    institutionsMr: [
      'सन्मार्ग बोधक निराश्रित समाज (१९०१)',
      'चोखामेळा मुलींची शाळा (नागपूर)'
    ],
    booksAuthoredMr: [
      'संत चोखामेळा चरित्र'
    ],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      'विदर्भात अस्पृश्योद्धारासाठी ग्रंथालये, वाचनालये आणि मेळे आयोजित केले.'
    ],
    mpscHighYieldPointersMr: [
      '‘सन्मार्ग बोधक निराश्रित समाज’ (१९०१) ची स्थापना कोणी केली? -> किसन फागुजी बनसोडे (नागपूर).'
    ],
    pyqsCount: 15,
    avatarIcon: '🪔',
    themeColor: 'from-blue-600/20 to-stone-700/20 border-blue-500/50 text-blue-300'
  },
  {
    id: 'shivram_janba_kamble',
    nameMr: 'शिवराम जानबा कांबळे',
    nameEn: 'Shivram Janba Kamble',
    birthDeath: '१८७५ – १९४०',
    birthPlaceMr: 'पुणे',
    birthPlaceEn: 'Pune',
    category: 'dalit_depressed',
    honorificTitlesMr: [
      'पुण्यातील आंबेडकरांपूर्वीच्या दलित चळवळीचे नेते'
    ],
    honorificTitlesEn: ['Pre-Ambedkarite Dalit Leader of Pune'],
    penNamesMr: [],
    newspapersMr: [
      'सोमवंशीय मित्र (१९०८ - संपादक)'
    ],
    institutionsMr: [
      'श्री शंकराचार्य सोमवंशीय समाज (१९०४)'
    ],
    booksAuthoredMr: [],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      'देवदासी व मुरळी प्रथेविरुद्ध पुण्यात जाहीर आंदोलन केले; मुरळी सोडण्याची शपथ दिली.',
      'अस्पृश्यांना लष्करात व पोलीस दलात प्रवेश मिळण्यासाठी ब्रिटिश सरकारकडे पाठपुरावा केला.'
    ],
    mpscHighYieldPointersMr: [
      '‘सोमवंशीय मित्र’ हे वृत्तपत्र कोणी सुरू केले? -> शिवराम जानबा कांबळे (१९०८, पुणे).',
      'देवदासी व मुरळी प्रथेविरुद्ध लढा देणारे पुण्यातील सुधारक: शिवराम जानबा कांबळे.'
    ],
    pyqsCount: 17,
    avatarIcon: '🛡️',
    themeColor: 'from-indigo-600/20 to-blue-500/20 border-indigo-500/50 text-indigo-300'
  },
  {
    id: 'mukundrao_patil',
    nameMr: 'मुकुंदराव गणपतराव पाटील',
    nameEn: 'Mukundrao Patil',
    birthDeath: '१८६० – १९३०',
    birthPlaceMr: 'तरवडी (जि. अहमदनगर)',
    birthPlaceEn: 'Taravadi (Ahmednagar)',
    category: 'social_equality',
    honorificTitlesMr: [
      'सत्यशोधक पत्रकार व लेखक',
      'दीनमित्राकार'
    ],
    honorificTitlesEn: ['Editor of Din Mitra'],
    penNamesMr: [],
    newspapersMr: [
      'दीनमित्र (१९१० - तरवडी, अहमदनगर येथून प्रसिद्ध केलेले सत्यशोधक ग्रामीण वृत्तपत्र)'
    ],
    institutionsMr: [],
    booksAuthoredMr: [
      'कुलकर्णी लीलामृत (१९१३ - गावातील कुलकर्णी वतनदारांच्या शोषणावर प्रकाश टाकणारा ग्रंथ)',
      'शेतकऱ्यांचा कैवारी',
      'हिंदू आणि ख्रिश्चन धर्म'
    ],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      'ग्रामीण भागातून ‘दीनमित्र’ वृत्तपत्र चालवून बहुजन व शेतकरी समाजाचे प्रबोधन केले.'
    ],
    mpscHighYieldPointersMr: [
      '‘दीनमित्र’ (तरवडी) चे संपादक कोण होते? -> मुकुंदराव पाटील.',
      '‘कुलकर्णी लीलामृत’ हा प्रसिद्ध ग्रंथ कोणी लिहिला? -> मुकुंदराव पाटील (१९१३).'
    ],
    pyqsCount: 20,
    avatarIcon: '📰',
    themeColor: 'from-amber-600/20 to-yellow-600/20 border-amber-500/50 text-amber-200'
  },
  {
    id: 'bhaskarrao_jadhav',
    nameMr: 'भास्करराव विठोजीराव जाधव',
    nameEn: 'Bhaskarrao Jadhav',
    birthDeath: '१७ जून १८६७ – २६ जून १९५०',
    birthPlaceMr: 'नागाव (जि. कुलाबा/रायगड); कर्मभूमी: कोल्हापूर',
    birthPlaceEn: 'Nagaon (Raigad); Workspace: Kolhapur',
    category: 'social_equality',
    honorificTitlesMr: [
      'ब्राह्मणेतर चळवळीचे अग्रणी नेते',
      'कोल्हापूर सत्यशोधक समाजाचे पहिले अध्यक्ष'
    ],
    honorificTitlesEn: ['Non-Brahmin Movement Leader', 'First President of Kolhapur Satya Shodhak Samaj'],
    penNamesMr: [],
    newspapersMr: [],
    institutionsMr: [
      'सत्यशोधक समाज कोल्हापूर शाखा (१९११ - अध्यक्ष)',
      'ब्राह्मणेतर पक्ष (Non-Brahmin Party)'
    ],
    booksAuthoredMr: [
      'मराठे आणि त्यांची भाषा',
      'घरचा पुरोहित (पुरोहितांशिवाय विवाह व धार्मिक विधी)'
    ],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      'छत्रपती शाहू महाराजांचे विश्वासू सहकारी व प्रशासकीय अधिकारी.',
      'लंडनच्या गोलमेज परिषदेला (Round Table Conference) उपस्थित राहिले.'
    ],
    mpscHighYieldPointersMr: [
      '‘घरचा पुरोहित’ हे पुस्तक कोणी लिहिले? -> भास्करराव जाधव.',
      '१९११ मध्ये स्थापन झालेल्या कोल्हापूर सत्यशोधक समाजाचे पहिले अध्यक्ष: भास्करराव जाधव.'
    ],
    pyqsCount: 18,
    avatarIcon: '🏛️',
    themeColor: 'from-emerald-600/20 to-teal-600/20 border-emerald-500/50 text-emerald-300'
  },
  {
    id: 'rd_karve',
    nameMr: 'रघुनाथ धोंडो कर्वे (आर. डी. कर्वे)',
    nameEn: 'R. D. Karve',
    birthDeath: '१४ जानेवारी १८८२ – १४ ऑक्टोबर १९५३',
    birthPlaceMr: 'मुरूड (जि. रत्नागिरी); कर्मभूमी: मुंबई',
    birthPlaceEn: 'Murud (Ratnagiri); Workspace: Mumbai',
    category: 'education_women',
    honorificTitlesMr: [
      'संतती नियमनाचे आद्य प्रणेते (Pioneer of Family Planning in India)',
      'लैंगिक शिक्षणाचे आद्य पुरस्कर्ते'
    ],
    honorificTitlesEn: ['Pioneer of Birth Control in India'],
    penNamesMr: [],
    newspapersMr: [
      'समाजस्वास्थ्य (१९२७ ते १९५३ - संतती नियमन व लैंगिक शिक्षणाला वाहिलेले मासिक)'
    ],
    institutionsMr: [
      'राइट टू बर्थ कंट्रोल क्लिनिक (१९२१ - मुंबईत भारतातील पहिले संतती नियमन केंद्र)'
    ],
    booksAuthoredMr: [
      'संततीनियमन: विचार आणि आचार',
      'गुप्तरोगांपासून बचाव'
    ],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      'महर्षी अण्णासाहेब कर्वे यांचे ज्येष्ठ सुपुत्र.',
      'समाजाचा, सनातन्यांचा आणि सरकारचा तीव्र विरोध पत्करून २६ वर्षे ‘समाजस्वास्थ्य’ मासिक चालवले; अश्लीलतेच्या आरोपावरून कोर्टात खटले लढवले.'
    ],
    mpscHighYieldPointersMr: [
      'भारतात ‘संतती नियमन’ व कुटुंब नियोजनाचे पहिले केंद्र (१९२१) कोणी सुरू केले? -> र. धों. कर्वे.',
      '‘समाजस्वास्थ्य’ हे मासिक कोणी चालवले? -> र. धों. कर्वे.'
    ],
    pyqsCount: 18,
    avatarIcon: '⚕️',
    themeColor: 'from-teal-600/20 to-blue-600/20 border-teal-500/50 text-teal-300'
  },
  {
    id: 'anutai_wagh',
    nameMr: 'अनुताई वाघ (पद्मश्री)',
    nameEn: 'Anutai Wagh',
    birthDeath: '१७ मार्च १९१० – २७ सप्टेंबर १९९२',
    birthPlaceMr: 'मोरगाव (जि. पुणे); कर्मभूमी: कोसबाड (जि. पालघर)',
    birthPlaceEn: 'Morgaon (Pune); Workspace: Kosbad (Palghar)',
    category: 'tribal_working_class',
    honorificTitlesMr: [
      'पद्मश्री (१९८५)',
      'दलित मित्र',
      'आदिवासी बालशिक्षणाची जननी'
    ],
    honorificTitlesEn: ['Padma Shri', 'Kosbad Tribal Educator'],
    penNamesMr: [],
    newspapersMr: [
      'शिक्षण पत्रिका (संपादन)'
    ],
    institutionsMr: [
      'ग्राम बालशिक्षण केंद्र (कोसबाडच्या टेकडीवर, ताराबाई मोडक यांच्या समवेत)',
      'विकासवाडी प्रकल्प'
    ],
    booksAuthoredMr: [
      'कोसबाडच्या टेकडीवरून (अत्यंत गाजलेले आत्मचरित्र)',
      'कुरणशाळा',
      'टिल्लूची करामत'
    ],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      'वारली व आदिवासी मुलांसाठी जंगलात ‘कुरणशाळा’ (Meadow Schools) आणि फिरती बालवाडी सुरू केली.',
      'आदिवासी बालकांना कुपोषण आणि अज्ञानातून बाहेर काढण्यासाठी जीवन समर्पित केले.'
    ],
    mpscHighYieldPointersMr: [
      '‘कोसबाडच्या टेकडीवरून’ या ग्रंथाच्या लेखिका कोण? -> अनुताई वाघ.',
      'कोसबाड येथे ताराबाई मोडक यांच्यासोबत बालशिक्षण कार्य करणाऱ्या समाजसेविका: अनुताई वाघ.'
    ],
    pyqsCount: 16,
    avatarIcon: '🌄',
    themeColor: 'from-emerald-500/20 to-amber-500/20 border-emerald-500/50 text-emerald-300'
  },
  {
    id: 'tarabai_modak',
    nameMr: 'ताराबाई मोडक (पद्मभूषण)',
    nameEn: 'Tarabai Modak',
    birthDeath: '१९ एप्रिल १८९२ – ३१ ऑगस्ट १९७३',
    birthPlaceMr: 'मुंबई; कर्मभूमी: बोर्डी व कोसबाड (जि. पालघर)',
    birthPlaceEn: 'Mumbai; Workspace: Bordi & Kosbad',
    category: 'education_women',
    honorificTitlesMr: [
      'पद्मभूषण (१९६२)',
      'भारतातील माँटेसरी शिक्षणाची जननी (Montessori of India)'
    ],
    honorificTitlesEn: ['Montessori of India', 'Padma Bhushan'],
    penNamesMr: [],
    newspapersMr: [],
    institutionsMr: [
      'ग्राम बालशिक्षण केंद्र (१९४५ - बोर्डी, नंतर १९५७ कोसबाड)',
      'नूतन बालशिक्षण संघ'
    ],
    booksAuthoredMr: [
      'बालशिक्षण',
      'कुरणशाळा पद्धती'
    ],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      'गिजुभाई बधेका यांच्यासोबत भावनगर येथे बालशिक्षणाचा प्रयोग सुरू केला.',
      'महाराष्ट्रात ग्रामीण व आदिवासी मुलांसाठी स्थानिक साहित्यातून शिक्षण देण्याचे मॉडेल तयार केले.'
    ],
    mpscHighYieldPointersMr: [
      'भारतात ‘माँटेसरी पद्धती’वर आधारित बालशिक्षणाचा पाया घालणाऱ्या: ताराबाई मोडक.',
      '‘ग्राम बालशिक्षण केंद्र’ (बोर्डी/कोसबाड) च्या संस्थापिका: ताराबाई मोडक.'
    ],
    pyqsCount: 15,
    avatarIcon: '🧸',
    themeColor: 'from-pink-500/20 to-purple-500/20 border-pink-500/50 text-pink-300'
  },
  {
    id: 'senapati_bapat',
    nameMr: 'सेनापती पांडुरंग महादेव बापट',
    nameEn: 'Senapati Pandurang Mahadev Bapat',
    birthDeath: '१२ नोव्हेंबर १८८० – २८ नोव्हेंबर १९६७',
    birthPlaceMr: 'पारनेर (जि. अहमदनगर)',
    birthPlaceEn: 'Parner (Ahmednagar)',
    category: 'social_equality',
    honorificTitlesMr: [
      'सेनापती (मुळशी सत्याग्रहातील नेतृत्वामुळे जनतेने दिलेली पदवी)'
    ],
    honorificTitlesEn: ['Senapati Bapat', 'Leader of Mulshi Satyagraha'],
    penNamesMr: [],
    newspapersMr: [],
    institutionsMr: [],
    booksAuthoredMr: [
      'चैतन्यगाथा',
      'समग्र बापट वाङ्मय'
    ],
    famousQuotesMr: [
      'सेवा हाच माझा धर्म, प्राण गेला तरी सत्याचा मार्ग सोडणार नाही.'
    ],
    keyMovementsAndEventsMr: [
      '१९२१ ते १९२४: मुळशी सत्याग्रह (टाटा कंपनीच्या धरणाविरोधात शेतकऱ्यांच्या जमिनी वाचवण्यासाठी जगातील पहिला धरणविरोधी सत्याग्रह).',
      'संयुक्त महाराष्ट्र चळवळीत आणि गोवा मुक्ती संग्रामात आघाडीवर राहिले.',
      'पुण्यात स्वतः हातात झाडू घेऊन रस्ते साफ करण्याची ‘सफाई मोहीम’ राबवली.'
    ],
    mpscHighYieldPointersMr: [
      'मुळशी सत्याग्रहाचे (१९२१) नेतृत्व कोणी केले? -> सेनापती बापट.',
      '‘मुळशी सत्याग्रहा’मुळे पांडुरंग महादेव बापट यांना कोणती पदवी मिळाली? -> ‘सेनापती’.'
    ],
    pyqsCount: 22,
    avatarIcon: '🚩',
    themeColor: 'from-amber-500/20 to-red-600/20 border-amber-500/50 text-amber-300'
  },
  {
    id: 'nana_patil',
    nameMr: 'क्रांतिसिंह नाना पाटील',
    nameEn: 'Krantisinh Nana Patil',
    birthDeath: '३ ऑगस्ट १९०० – ६ डिसेंबर १९७६',
    birthPlaceMr: 'येडेमच्छिंद्र (जि. सांगली)',
    birthPlaceEn: 'Yede Machhindra (Sangli)',
    category: 'tribal_working_class',
    honorificTitlesMr: [
      'क्रांतिसिंह',
      'प्रतिसरकारचे (पत्री सरकार) जनक'
    ],
    honorificTitlesEn: ['Krantisinh', 'Head of Prati Sarkar (Satara)'],
    penNamesMr: [],
    newspapersMr: [],
    institutionsMr: [
      'प्रतिसरकार (१९४२ च्या भारत छोडो आंदोलनात साताऱ्यात स्थापन केलेले समांतर सरकार)',
      'तुफान दल (प्रतिसरकारची सशस्त्र शाखा - जी. डी. लाड प्रमुख)'
    ],
    booksAuthoredMr: [],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      '१९४२-४६: साताऱ्यात ब्रिटिश राजवटीला आव्हान देत स्वतःचे कायदे, न्यायदान (लोकन्यायालये) आणि कर गोळा करणारी समांतर सत्ता राबवली.',
      'सत्यशोधक समाजाच्या जलशांचा प्रभाव; हुंडाविरोधी गांधी विवाह पद्धती सुरू केली.'
    ],
    mpscHighYieldPointersMr: [
      '१९४२ च्या आंदोलनात ‘प्रतिसरकार’ (पत्री सरकार) कोठे स्थापन झाले? -> सातारा (नाना पाटील व सहकारी).',
      'प्रतिसरकारच्या सशस्त्र दलाचे नाव काय होते? -> तुफान दल.'
    ],
    pyqsCount: 25,
    avatarIcon: '🐅',
    themeColor: 'from-red-600/20 to-orange-500/20 border-red-500/50 text-red-300'
  },
  {
    id: 'dadasaheb_gaikwad',
    nameMr: 'कर्मवीर दादासाहेब (भाऊराव) कृष्णाजी गायकवाड',
    nameEn: 'Karmaveer Dadasaheb Gaikwad',
    birthDeath: '१५ ऑक्टोबर १९०२ – २९ डिसेंबर १९७१',
    birthPlaceMr: 'अंबोली (जि. नाशिक)',
    birthPlaceEn: 'Amboli (Nashik)',
    category: 'dalit_depressed',
    honorificTitlesMr: [
      'कर्मवीर',
      'पद्मश्री (१९६८)',
      'डॉ. आंबेडकरांचे खंदे सेनापती'
    ],
    honorificTitlesEn: ['Karmaveer Dadasaheb Gaikwad', 'Leader of Kalaram Temple Satyagraha'],
    penNamesMr: [],
    newspapersMr: [],
    institutionsMr: [
      'रिपब्लिकन पार्टी ऑफ इंडिया (RPI - अध्यक्ष)'
    ],
    booksAuthoredMr: [],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      '२ मार्च १९३०: नाशिकच्या ऐतिहासिक ‘काळाराम मंदिर सत्याग्रहा’चे प्रत्यक्ष रणांगणावरील नेतृत्व दादासाहेब गायकवाड यांनी केले.',
      '१९५३: मराठवाडा व महाराष्ट्रात ‘भूमीहीन शेतकऱ्यांसाठी जमीन सत्याग्रह’ केला.'
    ],
    mpscHighYieldPointersMr: [
      'नाशिक काळाराम मंदिर सत्याग्रहाचे (१९३०) स्थानिक नेतृत्व कोणी केले? -> दादासाहेब गायकवाड.',
      '१९५३ मध्ये भूमीहीन शेतमजुरांसाठी भव्य सत्याग्रह करणारे नेते: कर्मवीर दादासाहेब गायकवाड.'
    ],
    pyqsCount: 18,
    avatarIcon: '✊',
    themeColor: 'from-blue-600/20 to-indigo-600/20 border-blue-500/50 text-blue-300'
  },
  {
    id: 'vishnushastri_chiplunkar',
    nameMr: 'विष्णूशास्त्री कृष्णशास्त्री चिपळूणकर',
    nameEn: 'Vishnushastri Chiplunkar',
    birthDeath: '२० मे १८५० – १७ मार्च १८८२ (अवघे ३२ वर्षे आयुष्य)',
    birthPlaceMr: 'पुणे',
    birthPlaceEn: 'Pune',
    category: 'journalism_thinkers',
    honorificTitlesMr: [
      'मराठी भाषेचे शिवाजी (Shivaji of Marathi Language)',
      'निबंधमालाकार'
    ],
    honorificTitlesEn: ['Shivaji of Marathi Language', 'Nibandhmalakar'],
    penNamesMr: [],
    newspapersMr: [
      'निबंधमाला (१८७४ ते १८८१ - मराठीतील तेजस्वी निबंध मासिक)',
      'केसरी व मराठा (टिळक व आगरकरांसोबत सह-संस्थापक)'
    ],
    institutionsMr: [
      'न्यू इंग्लिश स्कूल (१८८० - पुणे, संस्थापकांपैकी प्रमुख)',
      'चित्रशाळा (पुणे - ऐतिहासिक चित्रांचे मुद्रणालय)',
      'आर्यभूषण छापखाना',
      'किताबखाना (पुस्तकांचे दुकान)'
    ],
    booksAuthoredMr: [
      'आमच्या देशाची स्थिती (गाजलेला निबंध)',
      'संस्कृत कविपंचक'
    ],
    famousQuotesMr: [
      'इंग्रजी शिक्षण म्हणजे वाघिणीचे दूध आहे; आणि जो ते प्राशन करेल तो गुरगुरल्याशिवाय राहणार नाही.'
    ],
    keyMovementsAndEventsMr: [
      '‘निबंधमाला’ मासिकातून मराठी भाषेचा स्वाभिमान आणि स्वदेशी अस्मिता जागृत केली.'
    ],
    mpscHighYieldPointersMr: [
      '‘मराठी भाषेचे शिवाजी’ कोणाला म्हणतात? -> विष्णूशास्त्री चिपळूणकर.',
      '‘इंग्रजी शिक्षण म्हणजे वाघिणीचे दूध आहे’ हे प्रसिद्ध विधान कोणाचे? -> विष्णूशास्त्री चिपळूणकर.'
    ],
    pyqsCount: 23,
    avatarIcon: '✒️',
    themeColor: 'from-amber-600/20 to-orange-500/20 border-amber-500/50 text-amber-200'
  },
  {
    id: 'kaka_kalelkar',
    nameMr: 'काकासाहेब कालेलकर (दत्तात्रेय बाळकृष्ण कालेलकर)',
    nameEn: 'Kakasaheb Kalelkar',
    birthDeath: '१ डिसेंबर १८८५ – २१ ऑगस्ट १९८१',
    birthPlaceMr: 'सातारा',
    birthPlaceEn: 'Satara',
    category: 'social_equality',
    honorificTitlesMr: [
      'सवाई गुजराती (गांधीजींनी दिलेला गौरव)',
      'पद्मविभूषण (१९६४)',
      'पहिल्या मागासवर्ग आयोगाचे अध्यक्ष'
    ],
    honorificTitlesEn: ['First Backward Classes Commission Chairman', 'Padma Vibhushan'],
    penNamesMr: [],
    newspapersMr: [],
    institutionsMr: [
      'प्रथम राष्ट्रीय मागासवर्ग आयोग - First Backward Classes Commission (१९५३ ते १९५५ - कालेलकर कमिशन)',
      'गुजरात विद्यापीठ'
    ],
    booksAuthoredMr: [
      'स्मरणयात्रा',
      'हिमालयाचा प्रवास',
      'लोकमाता (नद्यांवरील ललित निबंध)'
    ],
    famousQuotesMr: [],
    keyMovementsAndEventsMr: [
      '२९ जानेवारी १९५३: राष्ट्रपतींनी कलम ३४० अन्वये नेमलेल्या भारताच्या पहिल्या मागासवर्ग आयोगाचे अध्यक्ष म्हणून कार्य केले.'
    ],
    mpscHighYieldPointersMr: [
      'भारताच्या पहिल्या मागासवर्ग आयोगाचे (1953) अध्यक्ष कोण होते? -> काकासाहेब कालेलकर (कलम ३४०).'
    ],
    pyqsCount: 16,
    avatarIcon: '🏔️',
    themeColor: 'from-cyan-600/20 to-blue-500/20 border-cyan-500/50 text-cyan-300',
    biographyMr: 'काकासाहेब कालेलकर हे गांधीवादी विचारवंत, साहित्यिक व शिक्षणतज्ज्ञ होते. स्वातंत्र्यलढ्यात सहभागासोबत त्यांनी मागासवर्गीय समाजाच्या हक्कांच्या संरक्षणासाठी महत्त्वपूर्ण योगदान दिले. राष्ट्रपती डॉ. राजेंद्र प्रसाद यांनी १९५३ मध्ये नेमलेल्या स्वतंत्र भारताच्या पहिल्या मागासवर्ग आयोगाचे (First Backward Classes Commission) ते अध्यक्ष होते.'
  },
  {
    id: 'gopalbaba_walangkar',
    nameMr: 'गोपाळबाबा वलंगकर (गोपाळ कृष्ण)',
    nameEn: 'Gopalbaba Walangkar',
    birthDeath: '१८४० – १९००',
    birthPlaceMr: 'रायवळ (जि. रायगड); कार्यक्षेत्र: दापोली, कोकण व पुणे',
    birthPlaceEn: 'Raiwal (Raigad); Workspace: Dapoli & Pune',
    category: 'dalit_depressed',
    honorificTitlesMr: [
      'दलित चळवळीचे आद्य प्रणेते (महर्षी विठ्ठल रामजी शिंदे यांनी दिलेला गौरव)',
      'अस्पृश्योद्धाराचे पहिले लढाऊ नेते',
      'महाराष्ट्रातील आद्य दलित पत्रकार व लेखक'
    ],
    honorificTitlesEn: ['Pioneer of Dalit Movement in Maharashtra', 'First Dalit Journalist'],
    penNamesMr: ['गोपाळ कृष्ण'],
    newspapersMr: [
      'दीनबंधू व सुधारक (या वृत्तपत्रांमध्ये अस्पृश्यांच्या हक्कांवर प्रखर वैचारिक लेख प्रसिद्ध केले)'
    ],
    institutionsMr: [
      'अनार्य दोष परिहारक मंडळी (स्थापना: १८८८, दापोली - अस्पृश्यांची भारतातील पहिली सामाजिक हक्क संघटना)',
      'सत्यशोधक समाज (सक्रिय सभासद व महात्मा फुलेंचे सहकारी)'
    ],
    booksAuthoredMr: [
      'विटाळ विध्वंसन (Vital Vidhvansan - १८८८, अस्पृश्यतेवर कोरडे ओढणारी आद्य ऐतिहासिक पुस्तिका)',
      'हिंदू धर्म दर्पण (अस्पृश्यांवरील धार्मिक अन्यायाचे खंडन)'
    ],
    famousQuotesMr: [
      'अस्पृश्यता हा देवाचा नियम नसून मानवनिर्मित सामाजिक अन्याय आहे; शिक्षणाशिवाय आणि संघटित संघर्षाशिवाय आमची मुक्ती नाही.'
    ],
    keyMovementsAndEventsMr: [
      '१८८६: ब्रिटिश लष्करातून (महार रेजिमेंट) सुभेदार म्हणून निवृत्त झाले आणि समाजसेवेला वाहून घेतले.',
      '१८८८: दापोली येथे ‘अनार्य दोष परिहारक मंडळी’ ही आद्य दलित संघटना स्थापन केली.',
      '१८८८: ‘विटाळ विध्वंसन’ या पुस्तिकेत हिंदू धर्ममार्तंडांना २६ रोखठोक प्रश्न विचारून अस्पृश्यतेचा फोलपणा सिद्ध केला.',
      '१८९०: ब्रिटिश सरकारने महार सैनिकांची लष्करातील भरती बंद केल्याच्या विरोधात व्हाइसरॉयला ऐतिहासिक अर्ज पाठवला.'
    ],
    mpscHighYieldPointersMr: [
      'महाराष्ट्रातील दलित चळवळीचे आद्य प्रणेते कोण? -> गोपाळबाबा वलंगकर.',
      '‘विटाळ विध्वंसन’ (१८८८) या गाजलेल्या आद्य पुस्तिकेचे लेखक कोण? -> गोपाळबाबा वलंगकर.',
      'दापोली येथे ‘अनार्य दोष परिहारक मंडळी’ (१८८८) कोणाद्वारे स्थापन झाली? -> गोपाळबाबा वलंगकर.',
      'ब्रिटिश लष्करातील महार भरती बंदीविरुद्ध १८९० मध्ये ब्रिटिश सरकारला आद्य निवेदन देणारे विचारवंत -> गोपाळबाबा वलंगकर.'
    ],
    pyqsCount: 22,
    avatarIcon: '⚡',
    themeColor: 'from-blue-600/20 to-indigo-500/20 border-blue-500/50 text-blue-300',
    biographyMr: 'गोपाळबाबा वलंगकर हे महाराष्ट्रातील दलित चळवळीचे आद्य प्रणेते मानले जातात. ब्रिटिश सैन्यातून निवृत्त झाल्यावर त्यांनी अस्पृश्यांवरील अन्यायाविरोधात अभूतपूर्व लढा उभारला. १८८८ मध्ये त्यांनी दापोली येथे ‘अनार्य दोष परिहारक मंडळी’ स्थापन केली आणि ‘विटाळ विध्वंसन’ हा ऐतिहासिक ग्रंथ लिहून जातव्यवस्थेला थेट आव्हान दिले.'
  },
  {
    id: 'godavari_parulekar',
    nameMr: 'गोदावरी शामराव परुळेकर (गोदावरी गोखले)',
    nameEn: 'Godavari Parulekar',
    birthDeath: '१४ ऑगस्ट १९०७ – ८ ऑक्टोबर १९९६',
    birthPlaceMr: 'पुणे; कर्मभूमी: डहाणू, तलासरी, ठाणे व पालघर',
    birthPlaceEn: 'Pune; Workspace: Dahanu, Talasari (Thane/Palghar)',
    category: 'tribal_working_class',
    honorificTitlesMr: [
      'वारली आदिवासींच्या माई (आदिवासी माता)',
      'महाराष्ट्र विधिमंडळातील पहिल्या महिला विधी पदवीधर (LLB)',
      'सोव्हिएत लँड नेहरू पुरस्कार व साहित्य अकादमी पुरस्कार विजेत्या'
    ],
    honorificTitlesEn: ['Mother of Warli Tribals', 'Pioneering Woman Lawyer & Activist'],
    penNamesMr: ['माई'],
    newspapersMr: [
      'किसान बुलेटिन (संपादक व लेखक)',
      'लोकयुद्ध व जीवनमार्ग (आदिवासींच्या हक्कांवर नियतकालिक लेख)'
    ],
    institutionsMr: [
      'अखिल भारतीय किसान सभा - AIKS (अध्यक्ष व प्रमुख नेत्या)',
      'आदिवासी प्रगती मंडळ व आश्रमशाळा संकुल (तलासरी व डहाणू)'
    ],
    booksAuthoredMr: [
      'जेव्हा माणूस जागा होतो (साहित्य अकादमी पुरस्कार प्राप्त - वारली आदिवासी लढ्याचा अमर दस्तावेज)',
      'बंदिवासाची आठ वर्षे (स्वातंत्र्यलढ्यातील तुरुंगवासाचे अनुभव)'
    ],
    famousQuotesMr: [
      'अन्याय सहन करणारा माणूस जेव्हा जागा होतो, तेव्हा जुलुमाचे पहाडही पत्त्यांच्या बंगल्यासारखे कोसळतात.'
    ],
    keyMovementsAndEventsMr: [
      '१९४५: ठाणे जिल्ह्यातील डहाणू-उंबरगाव भागात वारली आदिवासींचा वेठबिगारी व सावकारी शोषणाविरुद्ध ऐतिहासिक लढा सुरू केला.',
      'लग्नाची वेठ, सालगडी पद्धत आणि जंगल कंत्राटदारांचे अमानुष शोषण याविरुद्ध आदिवासींना संघटित करून न्यूनतम मजुरी मिळवून दिली.',
      'अखिल भारतीय किसान सभेच्या माध्यमातून महाराष्ट्रातील लाखो शेतमजूर आणि आदिवासींना हक्क मिळवून दिले.'
    ],
    mpscHighYieldPointersMr: [
      '‘जेव्हा माणूस जागा होतो’ या साहित्य अकादमी विजेत्या ग्रंथाच्या लेखिका कोण? -> गोदावरी परुळेकर.',
      'डहाणू-तलासरी भागातील वारली आदिवासींच्या वेठबिगारी मुक्तीचा ऐतिहासिक लढा कोणाच्या नेतृत्वाखाली लढला गेला? -> गोदावरी परुळेकर व शामराव परुळेकर.',
      'महाराष्ट्रातील पहिल्या महिला विधी पदवीधर (Law Graduate) कोण? -> गोदावरी परुळेकर (गोखले).'
    ],
    pyqsCount: 19,
    avatarIcon: '🌾',
    themeColor: 'from-emerald-600/20 to-teal-500/20 border-emerald-500/50 text-emerald-300',
    biographyMr: 'गोदावरी परुळेकर या महाराष्ट्रातील पहिल्या महिला वकील आणि ख्यातनाम कामगार-आदिवासी नेत्या होत्या. त्यांनी आपले सुखासीन जीवन सोडून ठाणे-पालघर जिल्ह्यातील डहाणू व तलासरी भागातील वारली आदिवासींच्या मुक्तीसाठी आयुष्य वेचले. वेठबिगारी आणि सावकारी जुलूमाविरुद्ध त्यांनी उभारलेल्या लढ्याची गाथा त्यांच्या ‘जेव्हा माणूस जागा होतो’ या अमर ग्रंथात चित्रित झाली आहे.'
  },
  {
    id: 'swami_ramanand_teerth',
    nameMr: 'स्वामी रामानंद तीर्थ (व्यंकटेश भवानराव खेडगीकर)',
    nameEn: 'Swami Ramanand Teerth',
    birthDeath: '३ ऑक्टोबर १९०३ – २२ जानेवारी १९७२',
    birthPlaceMr: 'सिंदगी (जि. विजापूर); कर्मभूमी: अंबाजोगाई, नांदेड, औरंगाबाद (मराठवाडा)',
    birthPlaceEn: 'Sindagi (Bijapur); Workspace: Ambajogai, Nanded, Marathwada',
    category: 'social_equality',
    honorificTitlesMr: [
      'मराठवाडा मुक्ती संग्रामाचे सरसेनापती',
      'संन्यासी क्रांतिकारक व शिक्षणमहर्षी',
      'खासदार (लोकसभा - औरंगाबाद १९५२)'
    ],
    honorificTitlesEn: ['Supreme Commander of Marathwada Liberation Movement', 'Ascetic Revolutionary'],
    penNamesMr: ['स्वामीजी'],
    newspapersMr: [
      'मराठवाडा (मुक्ती संग्रामातील वैचारिक मुखपत्र)',
      'हैदराबाद बुलेटिन'
    ],
    institutionsMr: [
      'हैदराबाद स्टेट काँग्रेस (१९३८ - अध्यक्ष व संस्थापक नेते)',
      'योगेश्वरी शिक्षण संस्था (अंबाजोगाई, बीड)',
      'पीपल्स कॉलेज, नांदेड (१९५०)',
      'स्वामी रामानंद तीर्थ मराठवाडा विद्यापीठ (नांदेड - नामकरण स्मरणार्थ)'
    ],
    booksAuthoredMr: [
      'Memoirs of Hyderabad Freedom Struggle (हैदराबाद स्वातंत्र्य संग्रामाच्या आठवणी)',
      'क्रांतीच्या पाऊलखुणा (आत्मचरित्रात्मक ग्रंथ)'
    ],
    famousQuotesMr: [
      'स्वातंत्र्य हे भीक मागून मिळत नसते, ते संघर्षाने व त्यागाने मिळवावे लागते; मराठवाडा अखंड भारताचा अविभाज्य अंग राहील.'
    ],
    keyMovementsAndEventsMr: [
      '१९३८: हैदराबाद स्टेट काँग्रेसची स्थापना करून निजामाच्या दडपशाही राजवटीविरुद्ध अहिंसक सत्याग्रह सुरू केला.',
      '१९४२: भारत छोडो आंदोलनात निजामाविरुद्ध पदयात्रा व आंदोलन करून तुरुंगवास भोगला.',
      '१९४७-४८: कासीम रिझवीच्या क्रूर रझाकार सैन्याविरुद्ध आणि निजामाविरुद्ध मराठवाडा मुक्ती संग्रामाचे सर्वपक्षीय नेतृत्व केले.',
      '१७ सप्टेंबर १९४८: भारतीय लष्कराच्या ‘ऑपरेशन पोलो’ (पोलीस ॲक्शन) नंतर मराठवाडा निजामाच्या तावडीतून मुक्त करण्यात मोलाची भूमिका बजावली.'
    ],
    mpscHighYieldPointersMr: [
      'मराठवाडा मुक्ती संग्रामाचे सर्वोच्च नेते / सरसेनापती कोण होते? -> स्वामी रामानंद तीर्थ.',
      'स्वामी रामानंद तीर्थ यांचे मूळ नाव काय होते? -> व्यंकटेश भवानराव खेडगीकर.',
      '‘Memoirs of Hyderabad Freedom Struggle’ या गाजलेल्या इंग्रजी ग्रंथाचे लेखक कोण? -> स्वामी रामानंद तीर्थ.',
      'अंबाजोगाई येथील योगेश्वरी नूतन विद्यालय व नांदेड येथील पीपल्स कॉलेजचे संस्थापक कोण? -> स्वामी रामानंद तीर्थ.'
    ],
    pyqsCount: 26,
    avatarIcon: '🚩',
    themeColor: 'from-orange-600/20 to-amber-500/20 border-orange-500/50 text-orange-300',
    biographyMr: 'स्वामी रामानंद तीर्थ (मूळ नाव व्यंकटेश खेडगीकर) हे मराठवाडा मुक्ती संग्रामाचे सरसेनापती आणि थोर शिक्षणमहर्षी होते. संन्यास स्वीकारूनही त्यांनी समाज व देशासाठी लढा दिला. निजामाच्या जुलमी राजवटीविरुद्ध आणि रझाकारांच्या क्रूर अत्याचारांविरुद्ध त्यांनी हैदराबाद स्टेट काँग्रेसच्या माध्यमातून लढा उभारून १७ सप्टेंबर १९४८ रोजी मराठवाड्याला मुक्त केले.'
  },
  {
    id: 'dr_sv_ketkar',
    nameMr: 'डॉ. श्रीधर व्यंकटेश केतकर',
    nameEn: 'Dr. Shridhar Venkatesh Ketkar',
    birthDeath: '२ फेब्रुवारी १८८४ – १० एप्रिल १९३७',
    birthPlaceMr: 'रायपूर (मध्य प्रदेश); कर्मभूमी: पुणे',
    birthPlaceEn: 'Raipur; Workspace: Pune',
    category: 'journalism_thinkers',
    honorificTitlesMr: [
      'महाराष्ट्रीय ज्ञानकोशकार',
      'आधुनिक मराठी समाजशास्त्राचे जनक',
      'डॉक्टरेट ऑफ फिलॉसॉफी (Ph.D. - कॉर्नेल युनिव्हर्सिटी, अमेरिका १९११)'
    ],
    honorificTitlesEn: ['Gnyankoshkar (Encyclopedist of Maharashtra)', 'Pioneer of Marathi Sociology'],
    penNamesMr: ['ज्ञानकोशकार केतकर'],
    newspapersMr: [
      'विद्यासेवक (मासिक)',
      'महाराष्ट्र (नियतकालिक लेख)'
    ],
    institutionsMr: [
      'महाराष्ट्र ज्ञानकोश मंडळ लि. (पुणे, १९१६ - मराठीतील पहिल्या महाप्रचंड ज्ञानकोशाची निर्मिती)',
      'भारतीय समाजशास्त्र परिषद'
    ],
    booksAuthoredMr: [
      'महाराष्ट्रीय ज्ञानकोश (एकूण २३ खंड - मराठी भाषेतील ऐतिहासिक महाप्रकल्प)',
      'The History of Caste in India (अमेरिकेतील कॉर्नेल विद्यापीठातील डॉक्टरेट प्रबंध)',
      'An Essay on Hinduism',
      'ब्राह्मणकन्या (प्रसिद्ध समाजशास्त्रीय कादंबरी)',
      'गोंडवनातील प्रियंवदा (कादंबरी)',
      'परागंदा व आशावादी (कादंबऱ्या)'
    ],
    famousQuotesMr: [
      'ज्ञानकोश हे राष्ट्राच्या बौद्धिक समृद्धीचे मोजमाप असते; भाषेचा विकास ज्ञानाच्या सार्वत्रिकीकरणानेच शक्य आहे.'
    ],
    keyMovementsAndEventsMr: [
      '१९११: अमेरिकेतील कॉर्नेल युनिव्हर्सिटीमधून ‘द हिस्ट्री ऑफ कास्ट इन इंडिया’ या प्रबंधावर पीएच.डी. मिळवली.',
      '१९१६ ते १९२७: प्रचंड आर्थिक व शारीरिक हालअपेष्टा सहन करून मराठी भाषेतील २३ खंडांचा ‘महाराष्ट्रीय ज्ञानकोश’ तयार केला.',
      'जातीव्यवस्थेचे वैज्ञानिक विश्लेषण आणि आंतरजातीय विवाहांचे समर्थन करणाऱ्या कादंबऱ्यांचे लेखन केले.'
    ],
    mpscHighYieldPointersMr: [
      '‘महाराष्ट्रीय ज्ञानकोश’ (२३ खंड) ची निर्मिती कोणी केली? -> डॉ. श्रीधर व्यंकटेश केतकर.',
      '‘The History of Caste in India’ (1909) हा ख्यातनाम समाजशास्त्रीय ग्रंथ कोणाचा आहे? -> डॉ. एस. व्ही. केतकर.',
      '‘ब्राह्मणकन्या’ व ‘गोंडवनातील प्रियंवदा’ या प्रसिद्ध समाजशास्त्रीय कादंबऱ्यांचे लेखक कोण? -> ज्ञानकोशकार केतकर.'
    ],
    pyqsCount: 15,
    avatarIcon: '📚',
    themeColor: 'from-purple-600/20 to-indigo-500/20 border-purple-500/50 text-purple-300',
    biographyMr: 'डॉ. श्रीधर व्यंकटेश केतकर हे मराठीतील अद्वितीय ज्ञानकोशकार आणि आंतरराष्ट्रीय ख्यातीचे समाजशास्त्रज्ञ होते. अमेरिकेच्या कॉर्नेल विद्यापीठातून शिक्षण घेतल्यानंतर त्यांनी मराठी भाषेत २३ खंडांचा ‘महाराष्ट्रीय ज्ञानकोश’ निर्माण करण्याचा महाकाय संकल्प पूर्ण केला. तसेच ‘ब्राह्मणकन्या’सारख्या कादंबऱ्यांमधून जातिव्यवस्थेवर भेदक भाष्य केले.'
  },
  {
    id: 'dr_shivajirao_patwardhan',
    nameMr: 'डॉ. शिवाजीराव पटवर्धन (दाजीसाहेब पटवर्धन)',
    nameEn: 'Dr. Shivajirao Patwardhan',
    birthDeath: '२८ डिसेंबर १८९२ – ७ मे १९८६',
    birthPlaceMr: 'असोले (जि. अमरावती); कर्मभूमी: तपोवन, अमरावती',
    birthPlaceEn: 'Asole (Amravati); Workspace: Tapovan, Amravati',
    category: 'social_equality',
    honorificTitlesMr: [
      'कुष्ठरोग्यांचे महर्षी / तपोवनाचे जनक',
      'विदर्भाचे समाजशिल्पी',
      'पद्मश्री पुरस्कार सन्मानित'
    ],
    honorificTitlesEn: ['Father of Tapovan Leprosy Mission', 'Padma Shri Awardee'],
    penNamesMr: ['दाजीसाहेब'],
    newspapersMr: [
      'तपोवन पत्रिका'
    ],
    institutionsMr: [
      'विदर्भ महारोगी सेवा मंडळ (स्थापना: १९४६, तपोवन, अमरावती)',
      'तपोवन कुष्ठरोग पुनर्वसन व औद्योगिक वसाहत',
      'होमियोपॅथी कॉलेज, अमरावती'
    ],
    booksAuthoredMr: [
      'कुष्ठरोग सेवा आणि जीवन विचार',
      'तपोवनाची साधना',
      'माझे आत्मचिंतन'
    ],
    famousQuotesMr: [
      'कुष्ठरोग हा केवळ त्वचेचा आजार आहे, पाप नाही; कुष्ठरुग्णांना अनुकंपा नको तर स्वाभिमानाचे आणि श्रमाचे जीवन हवे.'
    ],
    keyMovementsAndEventsMr: [
      '१९४६: अमरावती येथे ‘विदर्भ महारोगी सेवा मंडळा’ची स्थापना करून ‘तपोवन’ या आशियातील अग्रगण्य कुष्ठरोग केंद्राची निर्मिती केली.',
      'कुष्ठरोग्यांना वैद्यकीय उपचारांसोबत हातमाग, मुद्रण, कृषी आणि लघुउद्योग शिकवून स्वावलंबी व स्वाभिमानी बनवले.',
      'गांधीजींच्या अस्पृश्यतानिवारण आणि कुष्ठरोग सेवा विचारांना विदर्भात प्रत्यक्ष कृतीत उतरवले.'
    ],
    mpscHighYieldPointersMr: [
      'अमरावती येथे ‘तपोवन’ व ‘विदर्भ महारोगी सेवा मंडळ’ (1946) ची स्थापना कोणी केली? -> डॉ. शिवाजीराव पटवर्धन.',
      'कुष्ठरोग्यांच्या स्वावलंबनासाठी जीवन समर्पित करणारे विदर्भातील समाजसुधारक कोण? -> डॉ. शिवाजीराव (दाजीसाहेब) पटवर्धन.'
    ],
    pyqsCount: 14,
    avatarIcon: '🏥',
    themeColor: 'from-teal-600/20 to-cyan-500/20 border-teal-500/50 text-teal-300',
    biographyMr: 'डॉ. शिवाजीराव पटवर्धन हे विदर्भातील थोर समाजसेवक आणि कुष्ठरोग्यांचे कैवारी होते. त्यांनी अमरावती येथे १९४६ मध्ये ‘विदर्भ महारोगी सेवा मंडळ’ आणि ‘तपोवन’ची स्थापना केली. समाजाने बहिष्कृत केलेल्या कुष्ठरोग्यांना त्यांनी केवळ उपचार दिले नाहीत, तर उद्योग, शेती आणि शिक्षणातून सन्मानाने जगण्याचे बळ दिले.'
  },
  {
    id: 'dr_baba_adhav',
    nameMr: 'डॉ. बाबा आढाव (डॉ. बाबाजी पांडुरंग आढाव)',
    nameEn: 'Dr. Baba Adhav',
    birthDeath: '१ जून १९३६ – हयात',
    birthPlaceMr: 'पुणे; कर्मभूमी: संपूर्ण महाराष्ट्र',
    birthPlaceEn: 'Pune; Workspace: Entire Maharashtra',
    category: 'social_equality',
    honorificTitlesMr: [
      'एक गाव एक पाणवठा चळवळीचे प्रणेते',
      'कष्टकऱ्यांचे व हमालांचे आधारवड',
      'फुले-शाहू-आंबेडकर पुरोगामी विचारवंत'
    ],
    honorificTitlesEn: ['Pioneer of "Ek Gaav Ek Panavatha" Movement', 'Champion of Unorganized Labor'],
    penNamesMr: ['बाबा आढाव'],
    newspapersMr: [
      'हमाल समाचार',
      'पुरोगामी विचार पत्र'
    ],
    institutionsMr: [
      'हमाल पंचायत (पुणे, स्थापना: १९५५/१९६० च्या दशकात - असंघटित कामगारांची मॉडेल संघटना)',
      'एक गाव एक पाणवठा चळवळ (१९७२)',
      'विषमता निर्मूलन समिती',
      'असंघटित कामगार हक्क परिषद'
    ],
    booksAuthoredMr: [
      'एक गाव एक पाणवठा (ऐतिहासिक सामाजिक दस्तऐवज)',
      'विषमतेचे सावट',
      'हमाल पंचायतीचे अर्थकारण व सामाजिक लढा',
      'सत्यशोधक समाजाचा इतिहास व समकालीन संदर्भ'
    ],
    famousQuotesMr: [
      'ज्या देशात पाणी पाजतानाही जात विचारली जाते, तिथे लोकशाही आणि समता केवळ संविधानाच्या कागदावरच राहील; खेड्यापाड्यातील पाणवठे मुक्त झालेच पाहिजेत.'
    ],
    keyMovementsAndEventsMr: [
      '१९७२: महाराष्ट्रातील दुष्काळात खेड्यापाड्यात अस्पृश्यांना विहिरींवर पाणी नाकारले जाई, याविरुद्ध ‘एक गाव एक पाणवठा’ ही राज्यव्यापी क्रांती सुरू केली.',
      'पुण्यातील हमाल, तोलारी आणि माथाडी कामगारांना संघटित करून ‘हमाल पंचायत’ स्थापन केली आणि त्यांना हक्काची मजुरी, भविष्य निर्वाह निधी व घरे मिळवून दिली.',
      'सत्यशोधक विवाह पद्धतीचा पुनरुज्जीवन आणि पुरोगामी चळवळींना बौद्धिक नेतृत्व दिले.'
    ],
    mpscHighYieldPointersMr: [
      '‘एक गाव एक पाणवठा’ या क्रांतीकारी सामाजिक चळवळीचे जनक कोण? -> डॉ. बाबा आढाव (१९७२).',
      'पुण्यातील असंघटित कष्टकरी वर्गासाठी ‘हमाल पंचायत’ कोणी स्थापन केली? -> डॉ. बाबा आढाव.',
      '‘एक गाव एक पाणवठा’ या प्रसिद्ध ग्रंथाचे लेखक कोण? -> डॉ. बाबा आढाव.'
    ],
    pyqsCount: 18,
    avatarIcon: '💧',
    themeColor: 'from-blue-600/20 to-sky-500/20 border-blue-500/50 text-blue-300',
    biographyMr: 'डॉ. बाबा आढाव हे महाराष्ट्रातील ख्यातनाम सामाजिक कार्यकर्ते, पुरोगामी विचारवंत आणि कष्टकऱ्यांचे नेते आहेत. १९७२ मध्ये त्यांनी सुरू केलेली ‘एक गाव एक पाणवठा’ ही मोहीम आधुनिक महाराष्ट्रातील जातीय विषमतेविरुद्धचा सर्वात प्रभावशाली लढा ठरली. त्यांनी स्थापन केलेल्या ‘हमाल पंचायती’ने असंघटित कामगारांना सन्मान आणि सामाजिक सुरक्षा मिळवून दिली.'
  },
  {
    id: 'shantabai_dani',
    nameMr: 'शांताबाई धनजी दाणी',
    nameEn: 'Shantabai Dani',
    birthDeath: '१९१९ – २००१',
    birthPlaceMr: 'नाशिक (महाराष्ट्र)',
    birthPlaceEn: 'Nashik (Maharashtra)',
    category: 'dalit_depressed',
    honorificTitlesMr: [
      'आंबेडकरी चळवळीतील अग्रणी महिला नेत्या',
      'पद्मश्री पुरस्कार सन्मानित',
      'महाराष्ट्र विधान परिषद सदस्या (MLC)'
    ],
    honorificTitlesEn: ['Pioneering Dalit Woman Leader', 'Padma Shri Awardee'],
    penNamesMr: ['शांताबाई'],
    newspapersMr: [
      'प्रबुद्ध भारत (लेखन व मार्गदर्शन)'
    ],
    institutionsMr: [
      'शेड्यूल्ड कास्ट्स फेडरेशन (SCF - राष्ट्रीय कार्यकारिणी सदस्या व सचिव)',
      'भारतीय बौद्ध महासभा (महिला आघाडी)',
      'नाशिक जिल्हा आदिवासी व मागासवर्गीय शिक्षण प्रसारक संस्था',
      'रमाबाई आंबेडकर वसतिगृह (नाशिक)'
    ],
    booksAuthoredMr: [
      'रात्रंदिन आम्हा युद्धाचा प्रसंग (प्रसिद्ध दलित स्त्रीवादी आत्मचरित्र)'
    ],
    famousQuotesMr: [
      'स्त्रीमुक्ती ही केवळ बोलण्याची गोष्ट नाही; जोपर्यंत दलित व कष्टकरी स्त्री शिकत नाही आणि लढत नाही तोपर्यंत समाज पुढे जाणार नाही.'
    ],
    keyMovementsAndEventsMr: [
      '१९४२: डॉ. बाबासाहेब आंबेडकरांच्या विचारांनी प्रेरित होऊन नागपूर येथील शेड्यूल्ड कास्ट्स फेडरेशनच्या पहिल्या महिला अधिवेशनात भाग घेतला.',
      '१९५३: नाशिक आणि खानदेश भागात अस्पृश्य व आदिवासी मुलांसाठी वसतिगृहे आणि शाळा सुरू केल्या.',
      '१९६४-६५: दादासाहेब गायकवाड यांच्या नेतृत्वाखालील ऐतिहासिक देशव्यापी ‘भूमीहीन शेतमजूर सत्याग्रहात’ आघाडीवर राहून तुरुंगवास भोगला.'
    ],
    mpscHighYieldPointersMr: [
      '‘रात्रंदिन आम्हा युद्धाचा प्रसंग’ या गाजलेल्या आत्मचरित्राच्या लेखिका कोण? -> शांताबाई दाणी.',
      'डॉ. बाबासाहेब आंबेडकरांच्या शेड्यूल्ड कास्ट्स फेडरेशनच्या अग्रगण्य महिला नेत्या व शिक्षणतज्ज्ञ कोण होत्या? -> शांताबाई दाणी.'
    ],
    pyqsCount: 15,
    avatarIcon: '✊',
    themeColor: 'from-rose-600/20 to-pink-500/20 border-rose-500/50 text-rose-300',
    biographyMr: 'शांताबाई दाणी या आंबेडकरी चळवळीतील पहिल्या फळीतील ज्येष्ठ महिला नेत्या आणि शिक्षणतज्ज्ञ होत्या. डॉ. बाबासाहेब आंबेडकरांच्या अत्यंत विश्वासू सहकारी म्हणून त्यांनी शेड्यूल्ड कास्ट्स फेडरेशन आणि रिपब्लिकन पार्टीमध्ये महत्त्वपूर्ण कार्य केले. त्यांच्या ‘रात्रंदिन आम्हा युद्धाचा प्रसंग’ या आत्मचरित्रात दलित स्त्रीच्या संघर्षाचे आणि राजकीय सहभागाचे प्रत्ययकारी चित्रण आढळते.'
  },
  {
    id: 'nana_dharmadhikari',
    nameMr: 'डॉ. नानासाहेब धर्माधिकारी (डॉ. विष्णू नारायण धर्माधिकारी)',
    nameEn: 'Dr. Nanasaheb Dharmadhikari',
    birthDeath: '१ मार्च १९२२ – ८ जुलै २००८',
    birthPlaceMr: 'रेवदंडा, ता. अलिबाग (जि. रायगड)',
    birthPlaceEn: 'Revdanda, Alibag (Raigad)',
    category: 'saints_mass_awakening',
    honorificTitlesMr: [
      'महाराष्ट्र भूषण (मरणोत्तर २००८ - महाराष्ट्र शासनाचा सर्वोच्च सन्मान)',
      'समर्थ विचार प्रसारक व प्रबोधनकार',
      'व्यसनमुक्ती व वृक्षारोपणाचे प्रणेते'
    ],
    honorificTitlesEn: ['Maharashtra Bhushan Awardee', 'Spiritual Social Reformer'],
    penNamesMr: ['नानासाहेब'],
    newspapersMr: [],
    institutionsMr: [
      'श्री समर्थ बैठक मंडळ (महाराष्ट्र, भारत व परदेशात लाखो बैठकांचे जाळे)',
      'डॉ. नानासाहेब धर्माधिकारी प्रतिष्ठान (रेवदंडा - स्वच्छता, जलसंधारण व वृक्षारोपण)'
    ],
    booksAuthoredMr: [
      'श्रीमत दासबोध निरूपण व लोकप्रबोधन'
    ],
    famousQuotesMr: [
      'अंधश्रद्धा आणि व्यसन हा माणसाचा खरा शत्रू आहे; विचारांची स्वच्छता हीच खरी समाजसुधारणा.'
    ],
    keyMovementsAndEventsMr: [
      'संत रामदास स्वामींच्या ‘दासबोध’ या ग्रंथाचा आधार घेऊन गेली ५० वर्षे खेड्यापाड्यातील लाखो लोकांना व्यसनमुक्तीची दीक्षा दिली.',
      'जातीभेद न मानणाऱ्या ‘बैठक’ पद्धतीतून लाखो कुटुंबांचे नैतिक व सामाजिक पुनरुत्थान केले.',
      'महाराष्ट्रभर लाखो वृक्षांची लागवड, रक्तदान शिबिरे आणि सामूहिक स्वच्छता अभियाने राबवली.'
    ],
    mpscHighYieldPointersMr: [
      '२००८ मध्ये मरणोत्तर ‘महाराष्ट्र भूषण’ पुरस्काराने कोणाला सन्मानित करण्यात आले? -> डॉ. नानासाहेब धर्माधिकारी.',
      'दासबोधाच्या माध्यमातून राज्यभर व्यसनमुक्ती व अंधश्रद्धा निर्मूलनाचे कार्य करणारे प्रबोधनकार कोण? -> नानासाहेब धर्माधिकारी.'
    ],
    pyqsCount: 12,
    avatarIcon: '🌿',
    themeColor: 'from-emerald-600/20 to-amber-500/20 border-emerald-500/50 text-emerald-300',
    biographyMr: 'डॉ. नानासाहेब धर्माधिकारी हे महाराष्ट्रातील थोर प्रबोधनकार आणि समाजसुधारक होते. त्यांनी समर्थ रामदास स्वामींच्या दासबोधातील तत्त्वज्ञानाचा उपयोग करून लाखो कुटुंबांना दारू, तंबाखू यांसारख्या व्यसनांतून मुक्त केले. त्यांच्या कार्याचा गौरव म्हणून महाराष्ट्र शासनाने त्यांना ‘महाराष्ट्र भूषण’ पुरस्काराने सन्मानित केले.'
  }
];

// ----------------------------------------------------------------------------
// 2. MASTER DIRECTORY: NEWSPAPERS & PERIODICALS
// ----------------------------------------------------------------------------
export const REFORMER_NEWSPAPERS_LIST: ReformerNewspaperItem[] = [
  {
    newspaperNameMr: 'दर्पण (Darpan)',
    reformerNameMr: 'बाळशास्त्री जांभेकर',
    yearStarted: '६ जानेवारी १८३२',
    periodicityMr: 'साप्ताहिक (मराठी व इंग्रजी)',
    languageMr: 'मराठी / इंग्रजी',
    mpscImportance: 'मराठीतील पहिले वृत्तपत्र; ६ जानेवारी हा दिवस पत्रकार दिन म्हणून साजरा होतो.'
  },
  {
    newspaperNameMr: 'दिग्दर्शन (Digdarshan)',
    reformerNameMr: 'बाळशास्त्री जांभेकर',
    yearStarted: '१८४०',
    periodicityMr: 'मासिक',
    languageMr: 'मराठी',
    mpscImportance: 'मराठी भाषेतील पहिले मासिक (इतिहास, विज्ञान व भूगोल विषयास वाहिलेले).'
  },
  {
    newspaperNameMr: 'प्रभाकर (Prabhakar)',
    reformerNameMr: 'भाऊ महाजन (लेखक: लोकहितवादी)',
    yearStarted: '१८४१',
    periodicityMr: 'साप्ताहिक',
    languageMr: 'मराठी',
    mpscImportance: 'याच साप्ताहिकात लोकहितवादींची प्रसिद्ध १०८ शतपत्रे (१८४८-१८५०) प्रसिद्ध झाली.'
  },
  {
    newspaperNameMr: 'ज्ञानोदय (Dnyanodaya)',
    reformerNameMr: 'अमेरिकन मराठी मिशन (ख्रिस्ती मिशनरी)',
    yearStarted: '१८४२',
    periodicityMr: 'साप्ताहिक',
    languageMr: 'मराठी',
    mpscImportance: 'चित्रे छापणारे पहिले वृत्तपत्र (१८४२); तसेच आशिया खंडाचा नकाशा छापणारे वृत्तपत्र.'
  },
  {
    newspaperNameMr: 'दीनबंधू (Dinbandhu)',
    reformerNameMr: 'कृष्णराव भालेकर (नंतर ना. मे. लोखंडे)',
    yearStarted: '१ जानेवारी १८७७ (पुणे), १८८० (मुंबई)',
    periodicityMr: 'साप्ताहिक',
    languageMr: 'मराठी',
    mpscImportance: 'सत्यशोधक समाजाचे अधिकृत मुखपत्र; कामगार व शेतकऱ्यांच्या प्रश्नांना वाचा फोडणारे पहिले पत्र.'
  },
  {
    newspaperNameMr: 'केसरी (Kesari)',
    reformerNameMr: 'लोकमान्य टिळक (पहिले संपादक: गोपाळ गणेश आगरकर)',
    yearStarted: '४ जानेवारी १८८१',
    periodicityMr: 'साप्ताहिक (नंतर दैनिक)',
    languageMr: 'मराठी',
    mpscImportance: 'जहाल राष्ट्रवादाचे मुख्य मुखपत्र; "सरकारचे डोके ठिकाणावर आहे काय?" अग्रलेख.'
  },
  {
    newspaperNameMr: 'मराठा (Mahratta)',
    reformerNameMr: 'लोकमान्य बाळ गंगाधर टिळक',
    yearStarted: '२ जानेवारी १८८१',
    periodicityMr: 'साप्ताहिक',
    languageMr: 'इंग्रजी',
    mpscImportance: 'राष्ट्रीय प्रश्नांची बाजू इंग्रजीतून मांडण्यासाठी टिळकांनी सुरू केलेले इंग्रजी वृत्तपत्र.'
  },
  {
    newspaperNameMr: 'सुधारक (Sudharak)',
    reformerNameMr: 'गोपाळ गणेश आगरकर (इंग्रजी विभाग: गोपाळ कृष्ण गोखले)',
    yearStarted: '१५ ऑक्टोबर १८८८',
    periodicityMr: 'साप्ताहिक',
    languageMr: 'मराठी व इंग्रजी',
    mpscImportance: 'ब्रीदवाक्य: "इष्ट असेल ते बोलणार आणि साध्य असेल ते करणार"; बुद्धीप्रामाण्यवादी विचार.'
  },
  {
    newspaperNameMr: 'मूकनायक (Mooknayak)',
    reformerNameMr: 'डॉ. बाबासाहेब आंबेडकर (संपादक: पांडुरंग भटकर)',
    yearStarted: '३१ जानेवारी १९२०',
    periodicityMr: 'पाक्षिक',
    languageMr: 'मराठी',
    mpscImportance: 'शाहू महाराजांच्या २५०० रु. मदतीतून सुरू; शीर्षभागी संत तुकारामांचे अभंग.'
  },
  {
    newspaperNameMr: 'बहिष्कृत भारत (Bahishkrit Bharat)',
    reformerNameMr: 'डॉ. बाबासाहेब आंबेडकर',
    yearStarted: '३ एप्रिल १९२७',
    periodicityMr: 'पाक्षिक',
    languageMr: 'मराठी',
    mpscImportance: 'महाड चवदार तळे सत्याग्रहानंतर सुरू केले; शीर्षभागी संत ज्ञानेश्वरांची ओवी.'
  },
  {
    newspaperNameMr: 'जनता (Janata)',
    reformerNameMr: 'डॉ. बाबासाहेब आंबेडकर',
    yearStarted: '२४ नोव्हेंबर १९३०',
    periodicityMr: 'पाक्षिक (नंतर साप्ताहिक)',
    languageMr: 'मराठी',
    mpscImportance: 'दीर्घकाळ चाललेले वृत्तपत्र; पुढे १९५६ मध्ये याचे नाव ‘प्रबुद्ध भारत’ झाले.'
  },
  {
    newspaperNameMr: 'प्रबुद्ध भारत (Prabuddha Bharat)',
    reformerNameMr: 'डॉ. बाबासाहेब आंबेडकर',
    yearStarted: '४ फेब्रुवारी १९५६',
    periodicityMr: 'साप्ताहिक',
    languageMr: 'मराठी',
    mpscImportance: 'बौद्ध धम्म दीक्षा व प्रबुद्ध भारताच्या निर्मितीचे वैचारिक मुखपत्र.'
  },
  {
    newspaperNameMr: 'दीनमित्र (Din Mitra)',
    reformerNameMr: 'मुकुंदराव पाटील (तरवडी, अहमदनगर)',
    yearStarted: '१९१०',
    periodicityMr: 'साप्ताहिक',
    languageMr: 'मराठी',
    mpscImportance: 'ग्रामीण सत्यशोधक चळवळीचे मुखपत्र; शेतकऱ्यांच्या हक्कांसाठी खेड्यातून चालवले गेलेले पत्र.'
  },
  {
    newspaperNameMr: 'समाजस्वास्थ्य (Samaj Swasthya)',
    reformerNameMr: 'रघुनाथ धोंडो कर्वे (R.D. Karve)',
    yearStarted: '१९२७',
    periodicityMr: 'मासिक',
    languageMr: 'मराठी',
    mpscImportance: 'संतती नियमन, लैंगिक शिक्षण व अंधश्रद्धा निर्मूलनाला वाहिलेले भारतातील पहिले मासिक.'
  },
  {
    newspaperNameMr: 'साधना (Sadhana)',
    reformerNameMr: 'साने गुरुजी (पहिले संपादक)',
    yearStarted: '१५ ऑगस्ट १९४८',
    periodicityMr: 'साप्ताहिक',
    languageMr: 'मराठी',
    mpscImportance: 'स्वातंत्र्योत्तर भारतातील पुरोगामी, समाजसत्तावादी व मानवकल्याणकारी विचारांचे मुखपत्र.'
  }
];

// ----------------------------------------------------------------------------
// 3. MASTER DIRECTORY: INSTITUTIONS FOUNDED
// ----------------------------------------------------------------------------
export const REFORMER_INSTITUTIONS_LIST: ReformerInstitutionItem[] = [
  {
    institutionNameMr: 'सत्यशोधक समाज',
    founderMr: 'महात्मा जोतीराव फुले',
    yearEstablished: '२४ सप्टेंबर १८७३',
    locationMr: 'पुणे',
    mottoOrObjectiveMr: 'सर्वसाक्षी जगत्पती । त्याला नकोच मध्यस्थी ॥ (पुरोहितांशिवाय धार्मिक विधी व शूद्र-अतिशूद्रांचे प्रबोधन)'
  },
  {
    institutionNameMr: 'बहिष्कृत हितकारिणी सभा',
    founderMr: 'डॉ. बाबासाहेब आंबेडकर',
    yearEstablished: '२० जुलै १९२४',
    locationMr: 'मुंबई (दामोदर हॉल, परळ)',
    mottoOrObjectiveMr: 'शिका, संघटित व्हा, संघर्ष करा (दलितांमध्ये शिक्षण प्रसार व आर्थिक सुधारणा)'
  },
  {
    institutionNameMr: 'रयत शिक्षण संस्था',
    founderMr: 'कर्मवीर भाऊराव पाटील',
    yearEstablished: '४ ऑक्टोबर १९१९',
    locationMr: 'काले (सातारा)',
    mottoOrObjectiveMr: 'स्वावलंबी शिक्षण हेच आमचे ब्रीद (कमवा आणि शिका योजना)'
  },
  {
    institutionNameMr: 'श्रीमती नाथीबाई दामोदर ठाकरसी (SNDT) महिला विद्यापीठ',
    founderMr: 'महर्षी धोंडो केशव कर्वे',
    yearEstablished: '५ जुलै १९१६',
    locationMr: 'पुणे (नंतर मुख्यालय मुंबई)',
    mottoOrObjectiveMr: 'भारतातील पहिले महिला विद्यापीठ; सर विठ्ठलदास ठाकरसी यांनी आईच्या स्मृतीप्रीत्यर्थ १५ लाख रुपये देणगी दिली.'
  },
  {
    institutionNameMr: 'डिप्रेस्ड क्लासेस मिशन (Depressed Classes Mission)',
    founderMr: 'महर्षी विठ्ठल रामजी शिंदे',
    yearEstablished: '१८ ऑक्टोबर १९०६',
    locationMr: 'मुंबई',
    mottoOrObjectiveMr: 'अस्पृश्यांमध्ये शिक्षण प्रसार, नोकऱ्या मिळवणे आणि अस्पृश्यता निवारण करणे.'
  },
  {
    institutionNameMr: 'बॉम्बे असोसिएशन (Bombay Association)',
    founderMr: 'नाना शंकरशेट व डॉ. भाऊ दाजी लाड',
    yearEstablished: '२६ ऑगस्ट १८५२',
    locationMr: 'मुंबई',
    mottoOrObjectiveMr: 'महाराष्ट्रातील पहिली राजकीय संघटना; जनतेच्या तक्रारी ब्रिटिश संसदेकडे मांडणे.'
  },
  {
    institutionNameMr: 'पुणे सार्वजनिक सभा',
    founderMr: 'गणेश वासुदेव जोशी (सार्वजनिक काका) व न्या. रानडे',
    yearEstablished: '२ एप्रिल १८७०',
    locationMr: 'पुणे',
    mottoOrObjectiveMr: 'सरकार व जनता यांच्यातील दुवा; दुष्काळात शेतकऱ्यांच्या मागण्यांची मांडणी.'
  },
  {
    institutionNameMr: 'भारत सेवक समाज (Servants of India Society)',
    founderMr: 'गोपाळ कृष्ण गोखले',
    yearEstablished: '१२ जून १९०५',
    locationMr: 'पुणे',
    mottoOrObjectiveMr: 'देशसेवेसाठी निष्ठावान कार्यकर्ते तयार करणे व सार्वजनिक जीवनाचे अध्यात्मीकरण.'
  },
  {
    institutionNameMr: 'बॉम्बे मिल हँड्स असोसिएशन',
    founderMr: 'नारायण मेघाजी लोखंडे',
    yearEstablished: '२३ सप्टेंबर १८८४',
    locationMr: 'मुंबई',
    mottoOrObjectiveMr: 'भारतातील पहिली कामगार संघटना; रविवारची सुट्टी व कामाचे तास निश्चिती.'
  },
  {
    institutionNameMr: 'शारदा सदन / मुक्ती सदन',
    founderMr: 'पंडिता रमाबाई',
    yearEstablished: '१८८९ (शारदा सदन) / १८९८ (मुक्ती सदन)',
    locationMr: 'मुंबई, पुणे व केडगाव',
    mottoOrObjectiveMr: 'बालविधवा व अनाथ स्त्रियांना स्वावलंबी बनवणे व शिक्षण देणे.'
  },
  {
    institutionNameMr: 'परमहंस सभा',
    founderMr: 'दाडोबा पांडुरंग तर्खडकर',
    yearEstablished: '३१ जुलै १८४९',
    locationMr: 'मुंबई',
    mottoOrObjectiveMr: 'गुप्त संस्था; एकेश्वरवाद व जातीभेद निर्मूलन (प्रवेशाच्या वेळी पाव-पाणी खाण्याची शपथ).'
  },
  {
    institutionNameMr: 'श्री शिवाजी शिक्षण संस्था',
    founderMr: 'डॉ. पंजाबराव देशमुख',
    yearEstablished: '१९३१/१९३२',
    locationMr: 'अमरावती',
    mottoOrObjectiveMr: 'विदर्भातील दुर्गम व ग्रामीण भागातील बहुजन विद्यार्थ्यांना दर्जेदार शिक्षण.'
  },
  {
    institutionNameMr: 'अनार्य दोष परिहारक मंडळी',
    founderMr: 'गोपाळबाबा वलंगकर',
    yearEstablished: '१८८८',
    locationMr: 'दापोली (जि. रत्नागिरी)',
    mottoOrObjectiveMr: 'अस्पृश्यांची भारतातील पहिली सामाजिक हक्क संघटना; जातव्यवस्थेचा विरोध व सैन्यातील हक्कांचा लढा.'
  },
  {
    institutionNameMr: 'अखिल भारतीय किसान सभा (वारली आदिवासी लढा)',
    founderMr: 'गोदावरी परुळेकर व शामराव परुळेकर',
    yearEstablished: '१९४५',
    locationMr: 'डहाणू, तलासरी (ठाणे/पालघर)',
    mottoOrObjectiveMr: 'वारली आदिवासींची वेठबिगारी व सावकारी पाशातून मुक्ती आणि किमान मजुरीचा ऐतिहासिक विजय.'
  },
  {
    institutionNameMr: 'हैदराबाद स्टेट काँग्रेस व पीपल्स कॉलेज',
    founderMr: 'स्वामी रामानंद तीर्थ',
    yearEstablished: '१९३८ (काँग्रेस) / १९५० (कॉलेज)',
    locationMr: 'हैदराबाद व नांदेड',
    mottoOrObjectiveMr: 'निजाम व रझाकारांच्या राजवटीविरुद्ध मराठवाडा मुक्ती लढा आणि बहुजन विद्यार्थ्यांना उच्च शिक्षण.'
  },
  {
    institutionNameMr: 'महाराष्ट्र ज्ञानकोश मंडळ',
    founderMr: 'डॉ. श्रीधर व्यंकटेश केतकर',
    yearEstablished: '१९१६',
    locationMr: 'पुणे व नागपूर',
    mottoOrObjectiveMr: 'मराठी भाषेत २३ खंडांचा महाप्रचंड ज्ञानकोश तयार करून ज्ञानाचे लोकशाहीकरण करणे.'
  },
  {
    institutionNameMr: 'विदर्भ महारोगी सेवा मंडळ (तपोवन)',
    founderMr: 'डॉ. शिवाजीराव पटवर्धन',
    yearEstablished: '१९४६',
    locationMr: 'तपोवन (अमरावती)',
    mottoOrObjectiveMr: 'कुष्ठरोग्यांना वैद्यकीय उपचार, उद्योग व शेतीतून स्वाभिमानी पुनर्वसन देणे.'
  },
  {
    institutionNameMr: 'हमाल पंचायत व एक गाव एक पाणवठा चळवळ',
    founderMr: 'डॉ. बाबा आढाव',
    yearEstablished: '१९५५ / १९७२',
    locationMr: 'पुणे व संपूर्ण महाराष्ट्र',
    mottoOrObjectiveMr: 'असंघटित माथाडी व हमाल कष्टकऱ्यांचे हक्क आणि खेड्यापाड्यातील सार्वजनिक पाणवठे दलितांसाठी खुले करणे.'
  },
  {
    institutionNameMr: 'अनुसूचित जाती महासंघ (महिला विभाग)',
    founderMr: 'शांताबाई दाणी',
    yearEstablished: '१९४२/१९५०',
    locationMr: 'नाशिक',
    mottoOrObjectiveMr: 'दलित व वंचित महिलांचे संघटन, शिक्षण प्रसार व वसतिगृहांची निर्मिती.'
  }
];

// ----------------------------------------------------------------------------
// 4. MASTER DIRECTORY: FAMOUS BOOKS & AUTHORS
// ----------------------------------------------------------------------------
export const REFORMER_BOOKS_LIST: ReformerBookItem[] = [
  { bookTitleMr: 'गुलामगिरी (Gulamgiri)', authorMr: 'महात्मा जोतीराव फुले', yearPublished: '१८७३', themeOrSubjectMr: 'जातीव्यवस्थेचे विश्लेषण व अमेरिकेतील निग्रो मुक्तीसाठी समर्पित' },
  { bookTitleMr: 'शेतकऱ्याचा आसूड', authorMr: 'महात्मा जोतीराव फुले', yearPublished: '१८८३', themeOrSubjectMr: 'शेतकऱ्यांचे अज्ञान, दुष्काळ व सावकार-अधिकारी वर्गाचे शोषण' },
  { bookTitleMr: 'सार्वजनिक सत्यधर्म पुस्तक', authorMr: 'महात्मा जोतीराव फुले', yearPublished: '१८९१', themeOrSubjectMr: 'सत्यशोधक समाजाचे तात्विक बायबल; मानवकल्याण व समता' },
  { bookTitleMr: 'तृतीय रत्न नाटक', authorMr: 'महात्मा जोतीराव फुले', yearPublished: '१८५५', themeOrSubjectMr: 'जोतीरावांची पहिली नाट्यकृती (शिक्षणाचा अभाव व पुरोहितांचे शोषण)' },
  { bookTitleMr: 'The Problem of the Rupee', authorMr: 'डॉ. बाबासाहेब आंबेडकर', yearPublished: '१९२३', themeOrSubjectMr: 'चलनशास्त्र प्रबंध (लंडन स्कूल ऑफ इकॉनॉमिक्स D.Sc.), RBI चा पाया' },
  { bookTitleMr: 'The Annihilation of Caste', authorMr: 'डॉ. बाबासाहेब आंबेडकर', yearPublished: '१९३६', themeOrSubjectMr: 'जातव्यवस्थेचे उच्चाटन (जातपात तोडक मंडळाचे अभावीत भाषण)' },
  { bookTitleMr: 'Who Were the Shudras?', authorMr: 'डॉ. बाबासाहेब आंबेडकर', yearPublished: '१९४६', themeOrSubjectMr: 'शूद्र कोण होते? (महात्मा जोतीराव फुलेंना समर्पित ऐतिहासिक ग्रंथ)' },
  { bookTitleMr: 'Buddha and His Dhamma', authorMr: 'डॉ. बाबासाहेब आंबेडकर', yearPublished: '१९५७', themeOrSubjectMr: 'बौद्ध तत्त्वज्ञानाचे तर्कशुद्ध भाष्य ग्रंथ' },
  { bookTitleMr: 'काव्यफुले व बावनकशी सुबोध रत्नाकर', authorMr: 'सावित्रीबाई फुले', yearPublished: '१८५४ / १८९२', themeOrSubjectMr: 'आधुनिक मराठीतील पहिल्या स्त्रीवादी काव्यरचना व जोतीरावांवरील काव्य' },
  { bookTitleMr: 'शतपत्रे', authorMr: 'लोकहितवादी (गोपाळ हरी देशमुख)', yearPublished: '१८४८-१८४९', themeOrSubjectMr: 'प्रभाकर साप्ताहिकात प्रसिद्ध झालेली १०० प्रबोधनात्मक सामाजिक पत्रे' },
  { bookTitleMr: 'स्त्रीपुरुष तुलना', authorMr: 'ताराबाई शिंदे', yearPublished: '१८८२', themeOrSubjectMr: 'भारतातील पहिला जहाल स्त्रीवादी ग्रंथ; पुरुषप्रधान व्यवस्थेवर टीका' },
  { bookTitleMr: 'The High Caste Hindu Woman', authorMr: 'पंडिता रमाबाई', yearPublished: '१८८७', themeOrSubjectMr: 'हिंदू उच्चजातीय स्त्रियांच्या दयनीय स्थितीचे जागतिक स्तरावर चित्रण' },
  { bookTitleMr: 'विटाळ विध्वंसन', authorMr: 'गोपाळबाबा वलंगकर', yearPublished: '१८८८', themeOrSubjectMr: 'अस्पृश्यतेच्या उच्चाटनासाठी सनातनी व्यवस्थेला २६ थेट प्रश्न विचारणारी आद्य पुस्तिका' },
  { bookTitleMr: 'जेव्हा माणूस जागा होतो', authorMr: 'गोदावरी परुळेकर', yearPublished: '१९७०', themeOrSubjectMr: 'साहित्य अकादमी पुरस्कार प्राप्त; ठाणे जिल्ह्यातील वारली आदिवासी लढ्याची महागाथा' },
  { bookTitleMr: 'Memoirs of Hyderabad Freedom Struggle', authorMr: 'स्वामी रामानंद तीर्थ', yearPublished: '१९६७', themeOrSubjectMr: 'निजामाविरुद्धचा हैदराबाद व मराठवाडा मुक्ती संग्रामाचा प्रामाणिक इतिहास' },
  { bookTitleMr: 'महाराष्ट्रीय ज्ञानकोश (२३ खंड)', authorMr: 'डॉ. श्रीधर व्यंकटेश केतकर', yearPublished: '१९२१-१९२७', themeOrSubjectMr: 'मराठी भाषेतील सर्वंकष ज्ञानाचा पहिला विश्वकोश' },
  { bookTitleMr: 'ब्राह्मणकन्या', authorMr: 'डॉ. श्रीधर व्यंकटेश केतकर', yearPublished: '१९३०', themeOrSubjectMr: 'आंतरजातीय विवाह आणि सामाजिक पुनर्रचनेवर आधारित समाजशास्त्रीय कादंबरी' },
  { bookTitleMr: 'एक गाव एक पाणवठा', authorMr: 'डॉ. बाबा आढाव', yearPublished: '१९७६', themeOrSubjectMr: 'महाराष्ट्रातील खेड्यापाड्यातील पाणवठ्यांवरील अस्पृश्यता निर्मूलनाची यशोगाथा' },
  { bookTitleMr: 'रात्रंदिन आम्हा युद्धाचा प्रसंग', authorMr: 'शांताबाई दाणी', yearPublished: '१९९०', themeOrSubjectMr: 'दलित स्त्रीचा शिक्षण संघर्ष आणि आंबेडकरी चळवळीतील सहभागाचे आत्मचरित्र' },
  { bookTitleMr: 'माझी जन्मठेप', authorMr: 'स्वातंत्र्यवीर विनायक दामोदर सावरकर', yearPublished: '१९२७', themeOrSubjectMr: 'अंदमानच्या सेल्युलर जेलमधील कठोर कारावास व क्रांतीचा इतिहास' },
  { bookTitleMr: 'गीतारहस्य (कर्मयोगशास्त्र)', authorMr: 'लोकमान्य बाळ गंगाधर टिळक', yearPublished: '१९१५', themeOrSubjectMr: 'मंडाले तुरुंगात लिहिलेला कर्मयोगाचा अमर ग्रंथ' },
  { bookTitleMr: 'Rise of the Maratha Power', authorMr: 'न्यायमूर्ती म. गो. रानडे', yearPublished: '१९००', themeOrSubjectMr: 'मराठ्यांच्या सत्तेचा उत्कर्ष केवळ सैनिकी नसून नैतिक व सांस्कृतिक होता' },
  { bookTitleMr: 'डोंगरीच्या तुरुंगातील आमचे १०१ दिवस', authorMr: 'गोपाळ गणेश आगरकर', yearPublished: '१८८२', themeOrSubjectMr: 'बर्वे प्रकरणात टिळक व आगरकरांना झालेल्या शिक्षेचा अनुभव' },
  { bookTitleMr: 'ग्रामगीता', authorMr: 'राष्ट्रसंत तुकडोजी महाराज', yearPublished: '१९५५', themeOrSubjectMr: 'ग्रामीण विकास, स्वच्छता, स्वावलंबन व लोकशिक्षणावर ४१ अध्यायांचा ग्रंथ' },
  { bookTitleMr: 'फकिरा', authorMr: 'लोकशाहीर अण्णाभाऊ साठे', yearPublished: '१९५९', themeOrSubjectMr: 'मांग समाजातील क्रांतिकारक फकिराचा स्वातंत्र्यलढा (आंबेडकरांना समर्पित)' },
  { bookTitleMr: 'श्यामची आई', authorMr: 'साने गुरुजी', yearPublished: '१९३५', themeOrSubjectMr: 'मातृप्रेमाची अमर कहाणी (नाशिक तुरुंगात लिहिलेली कादंबरी)' },
  { bookTitleMr: 'कोसबाडच्या टेकडीवरून', authorMr: 'अनुताई वाघ', yearPublished: '१९७५', themeOrSubjectMr: 'आदिवासी बालशिक्षणातील जीवनप्रवासाचे प्रसिद्ध आत्मचरित्र' },
  { bookTitleMr: 'कुलकर्णी लीलामृत', authorMr: 'मुकुंदराव पाटील', yearPublished: '१९१३', themeOrSubjectMr: 'सत्यशोधक चळवळीतील ग्रामीण वतनदारी शोषणावरील प्रहार' },
  { bookTitleMr: 'आत्मवृत्त', authorMr: 'महर्षी धोंडो केशव कर्वे', yearPublished: '१९१५', themeOrSubjectMr: 'महिला शिक्षण व विधवा पुनरुत्थानाचा प्रामाणिक आत्मचरित्र ग्रंथ' },
  { bookTitleMr: 'माझ्या आठवणी आणि अनुभव', authorMr: 'महर्षी विठ्ठल रामजी शिंदे', yearPublished: '१९४०', themeOrSubjectMr: 'प्रार्थना समाज व डिप्रेस्ड क्लासेस मिशनचा संघर्षमय प्रवास' }
];

// ----------------------------------------------------------------------------
// 5. MPSC PREVIOUS YEAR QUESTIONS (PYQS) ON SOCIAL REFORMERS
// ----------------------------------------------------------------------------
export const REFORMER_PYQ_QUESTIONS: ReformerPyqQuestion[] = [
  {
    id: 'pyq_sr_1',
    questionMr: 'महात्मा जोतीराव फुले यांनी आपला ‘गुलामगिरी’ हा ग्रंथ खालीलपैकी कोणास समर्पित केला होता?',
    questionEn: 'To whom did Mahatma Jotirao Phule dedicate his famous book "Gulamgiri" (1873)?',
    optionsMr: [
      'महाराष्ट्रातील दलित बांधवांना',
      'अमेरिकेतील निग्रो गुलामांना स्वातंत्र्य देणाऱ्या अमेरिकन जनतेला',
      'सत्यशोधक समाजाच्या सर्व कार्यकर्त्यांना',
      'छत्रपती शिवाजी महाराजांच्या स्मृतीस'
    ],
    optionsEn: [
      'To the depressed classes of Maharashtra',
      'To the good people of the United States who liberated Negro slaves',
      'To all activists of Satya Shodhak Samaj',
      'To the memory of Chhatrapati Shivaji Maharaj'
    ],
    correctOptionIndex: 1,
    explanationMr:
      'महात्मा फुले यांनी १ जून १८७३ रोजी ‘गुलामगिरी’ हा ग्रंथ अमेरिकेतील कृष्णवर्णीय (निग्रो) गुलामांना दास्यत्वातून मुक्त करणाऱ्या अमेरिकन जनतेला सन्मानपूर्वक समर्पित केला होता.',
    pyqExamTag: 'MPSC राज्यसेवा पूर्व २०१६ व २०१९',
    relatedReformerId: 'phule_jotirao'
  },
  {
    id: 'pyq_sr_2',
    questionMr: 'डॉ. बाबासाहेब आंबेडकर यांनी ३१ जानेवारी १९२० रोजी सुरू केलेल्या ‘मूकनायक’ या पाक्षिकाच्या शीर्षभागी कोणाचे अभंग छापले जात असत?',
    questionEn: 'Whose devotional Abhangas were printed on the masthead of Dr. B.R. Ambedkar\'s fortnightly "Mooknayak"?',
    optionsMr: [
      'संत कबीर',
      'संत ज्ञानेश्वर',
      'संत तुकाराम महाराज',
      'संत चोखामेळा'
    ],
    optionsEn: [
      'Sant Kabir',
      'Sant Dnyaneshwar',
      'Sant Tukaram Maharaj',
      'Sant Chokhamela'
    ],
    correctOptionIndex: 2,
    explanationMr:
      '‘मूकनायक’ पाक्षिकाच्या शीर्षभागी संत तुकाराम महाराजांचे अभंग छापले जात असत ("काय करू आता धरूनिया भीड । निशंक हे तोंड वाजविले ॥"). तर ‘बहिष्कृत भारत’ (१९२७) च्या शीर्षभागी संत ज्ञानेश्वरांची ओवी छापली जात असे.',
    pyqExamTag: 'MPSC संयुक्त गट-ब पूर्व २०१८ व २०२२',
    relatedReformerId: 'ambedkar_babasaheb'
  },
  {
    id: 'pyq_sr_3',
    questionMr: 'कोल्हापूर संस्थानात मागासवर्गीय विद्यार्थ्यांसाठी ५०% आरक्षणाचा ऐतिहासिक जाहीरनामा छत्रपती शाहू महाराजांनी कोणत्या दिवशी जारी केला?',
    questionEn: 'On which date did Rajarshi Chhatrapati Shahu Maharaj issue the historic 50% reservation declaration in Kolhapur State?',
    optionsMr: [
      '१ मे १८९५',
      '२६ जुलै १९०२',
      '२६ जून १८७४',
      '२ ऑक्टोबर १९०५'
    ],
    optionsEn: [
      '1 May 1895',
      '26 July 1902',
      '26 June 1874',
      '2 October 1905'
    ],
    correctOptionIndex: 1,
    explanationMr:
      'छत्रपती शाहू महाराजांनी २६ जुलै १९०२ रोजी कोल्हापूर संस्थानाच्या राजपत्रात (Gazette) ५०% आरक्षणाचा ऐतिहासिक आदेश जारी केला. यामुळे त्यांना ‘भारतातील आरक्षणाचे जनक’ म्हटले जाते.',
    pyqExamTag: 'MPSC राज्यसेवा पूर्व २०२०',
    relatedReformerId: 'shahu_maharaj'
  },
  {
    id: 'pyq_sr_4',
    questionMr: '‘स्त्रीपुरुष तुलना’ (१८८२) या ग्रंथात तत्कालीन पुरुषप्रधान संस्कृतीवर सडकून टीका करणाऱ्या महाराष्ट्रातील आद्य स्त्रीवादी विचारवंत कोण होत्या?',
    questionEn: 'Who was the pioneering feminist author of the 1882 radical treatise "Stri Purush Tulana"?',
    optionsMr: [
      'पंडिता रमाबाई',
      'ताराबाई शिंदे',
      'आनंदीबाई कर्वे',
      'सावित्रीबाई फुले'
    ],
    optionsEn: [
      'Pandita Ramabai',
      'Tarabai Shinde',
      'Anandibai Karve',
      'Savitribai Phule'
    ],
    correctOptionIndex: 1,
    explanationMr:
      'बुलढाणा येथील ताराबाई शिंदे यांनी १८८२ मध्ये ‘स्त्रीपुरुष तुलना’ हे छोटेखानी परंतु अत्यंत जहाल पुस्तक लिहिले. यात स्त्रियांवर होणाऱ्या अन्यायाचा व पुरुषांच्या दुटप्पीपणाचा पर्दाफाश केला होता.',
    pyqExamTag: 'MPSC गट-क पूर्व २०१९ व २०२१',
    relatedReformerId: 'tarabai_shinde'
  },
  {
    id: 'pyq_sr_5',
    questionMr: '१८८४ मध्ये स्थापन झालेली भारतातील पहिली कामगार संघटना ‘बॉम्बे मिल हँड्स असोसिएशन’ कोणी स्थापन केली?',
    questionEn: 'Who established India\'s first labor union "Bombay Mill Hands Association" in 1884?',
    optionsMr: [
      'नारायण मेघाजी लोखंडे',
      'श्रीपाद अमृत डांगे',
      'लाला लजपतराय',
      'एन. एम. जोशी'
    ],
    optionsEn: [
      'Narayan Meghaji Lokhande',
      'S. A. Dange',
      'Lala Lajpat Rai',
      'N. M. Joshi'
    ],
    correctOptionIndex: 0,
    explanationMr:
      'नारायण मेघाजी लोखंडे यांनी २३ सप्टेंबर १८८४ रोजी मुंबईत गिरणी कामगारांची पहिली संघटना ‘बॉम्बे मिल हँड्स असोसिएशन’ स्थापन केली. त्यांच्याच प्रयत्नांमुळे रविवारी साप्ताहिक सुट्टी मंजूर झाली.',
    pyqExamTag: 'MPSC राज्यसेवा मुख्य GS-1',
    relatedReformerId: 'lokhande_nm'
  },
  {
    id: 'pyq_sr_6',
    questionMr: '‘श्रीमती नाथीबाई दामोदर ठाकरसी’ (SNDT) महिला विद्यापीठाची स्थापना ५ जुलै १९१६ रोजी खालीलपैकी कोणी केली?',
    questionEn: 'Who founded the Shreemati Nathibai Damodar Thackersey (SNDT) Women\'s University on 5 July 1916?',
    optionsMr: [
      'महात्मा जोतीराव फुले',
      'महर्षी धोंडो केशव कर्वे',
      'पंडिता रमाबाई',
      'कर्मवीर भाऊराव पाटील'
    ],
    optionsEn: [
      'Mahatma Jotirao Phule',
      'Maharshi Dhondo Keshav Karve',
      'Pandita Ramabai',
      'Karmaveer Bhaurao Patil'
    ],
    correctOptionIndex: 1,
    explanationMr:
      'महर्षी धोंडो केशव कर्वे यांनी जपानमधील महिला विद्यापीठावरून प्रेरणा घेऊन ५ जुलै १९१६ रोजी पुण्यात भारतातील पहिल्या महिला विद्यापीठाची स्थापना केली. विठ्ठलदास ठाकरसी यांनी आईच्या नावे १५ लाख रु. देणगी दिली.',
    pyqExamTag: 'MPSC संयुक्त पूर्व २०२१',
    relatedReformerId: 'karve_dhondo_keshav'
  },
  {
    id: 'pyq_sr_7',
    questionMr: '‘इष्ट असेल ते बोलणार आणि साध्य असेल ते करणार’ हे प्रसिद्ध ब्रीदवाक्य खालीलपैकी कोणत्या वृत्तपत्राचे होते?',
    questionEn: '"I will speak what is right and do what is achievable" was the motto of which newspaper?',
    optionsMr: [
      'केसरी',
      'दर्पण',
      'सुधारक',
      'ज्ञानप्रकाश'
    ],
    optionsEn: [
      'Kesari',
      'Darpan',
      'Sudharak',
      'Dnyanprakash'
    ],
    correctOptionIndex: 2,
    explanationMr:
      'गोपाळ गणेश आगरकर यांनी १५ ऑक्टोबर १८८८ रोजी सुरू केलेल्या ‘सुधारक’ या वृत्तपत्राचे हे अग्रगण्य ब्रीदवाक्य होते. यात त्यांनी समाजसुधारणा व बुद्धीप्रामाण्यवादाचा प्रचार केला.',
    pyqExamTag: 'MPSC राज्यसेवा पूर्व २०१७',
    relatedReformerId: 'agarkar_gopal_ganesh'
  },
  {
    id: 'pyq_sr_8',
    questionMr: '‘मराठी भाषेचे पाणिनी’ म्हणून कोणाचा गौरव केला जातो?',
    questionEn: 'Who is revered with the title "Panini of the Marathi Language"?',
    optionsMr: [
      'विष्णूशास्त्री चिपळूणकर',
      'दादोबा पांडुरंग तर्खडकर',
      'मोरो केशव दामले',
      'बाळशास्त्री जांभेकर'
    ],
    optionsEn: [
      'Vishnushastri Chiplunkar',
      'Dadoba Pandurang Tarkhadkar',
      'Moro Keshav Damle',
      'Balshastri Jambhekar'
    ],
    correctOptionIndex: 1,
    explanationMr:
      'दादोबा पांडुरंग तर्खडकर यांनी १८३६ मध्ये ‘महाराष्ट्र भाषेचे व्याकरण’ हा पहिला प्रमाण व्याकरण ग्रंथ लिहिल्याने त्यांना ‘मराठी भाषेचे पाणिनी’ म्हटले जाते. तर विष्णूशास्त्री चिपळूणकरांना ‘मराठी भाषेचे शिवाजी’ म्हटले जाते.',
    pyqExamTag: 'MPSC कर सहाय्यक व तलाठी भरती',
    relatedReformerId: 'tarkhadkar_dadoba'
  },
  {
    id: 'pyq_sr_9',
    questionMr: '‘डिप्रेस्ड क्लासेस मिशन’ (Depressed Classes Mission) ची स्थापना १८ ऑक्टोबर १९०६ रोजी मुंबई येथे कोणी केली?',
    questionEn: 'Who established the Depressed Classes Mission in Bombay on 18 October 1906?',
    optionsMr: [
      'महर्षी विठ्ठल रामजी शिंदे',
      'डॉ. बाबासाहेब आंबेडकर',
      'छत्रपती शाहू महाराज',
      'गोपाळबाबा वलंगकर'
    ],
    optionsEn: [
      'Maharshi Vitthal Ramji Shinde',
      'Dr. B. R. Ambedkar',
      'Chhatrapati Shahu Maharaj',
      'Gopalbaba Walangkar'
    ],
    correctOptionIndex: 0,
    explanationMr:
      'महर्षी विठ्ठल रामजी शिंदे यांनी अस्पृश्यता निवारण आणि दलितांच्या सर्वांगीण विकासासाठी १८ ऑक्टोबर १९०६ रोजी मुंबईत ‘डिप्रेस्ड क्लासेस मिशन सोसायटी ऑफ इंडिया’ची स्थापना केली.',
    pyqExamTag: 'MPSC राज्यसेवा पूर्व २०१८',
    relatedReformerId: 'shinde_vr'
  },
  {
    id: 'pyq_sr_10',
    questionMr: 'पंढरपूरचे विठ्ठल मंदिर अस्पृश्यांसाठी खुले व्हावे म्हणून मे १९४७ मध्ये ऐतिहासिक आमरण उपोषण खालीलपैकी कोणी केले होते?',
    questionEn: 'Who undertook a historic fast unto death in May 1947 to open the Pandharpur Vitthal Temple for the depressed classes?',
    optionsMr: [
      'संत गाडगे महाराज',
      'साने गुरुजी (पांडुरंग सदाशिव साने)',
      'सेनापती बापट',
      'विनोबा भावे'
    ],
    optionsEn: [
      'Sant Gadge Maharaj',
      'Sane Guruji',
      'Senapati Bapat',
      'Vinoba Bhave'
    ],
    correctOptionIndex: 1,
    explanationMr:
      'साने गुरुजींनी १ ते १० मे १९४७ दरम्यान पंढरपूरचे विठ्ठल मंदिर हरिजनांसाठी खुले व्हावे म्हणून आमरण उपोषण केले. त्यांच्या या त्यागामुळे शेवटी विठ्ठल मंदिर सर्व जातींसाठी खुले झाले.',
    pyqExamTag: 'MPSC गट-ब पूर्व २०२१',
    relatedReformerId: 'sane_guruji'
  },
  {
    id: 'pyq_sr_11',
    questionMr: 'क्रांतिज्योती सावित्रीबाई फुले यांचा ‘काव्यफुले’ हा पहिला काव्यसंग्रह कोणत्या वर्षी प्रकाशित झाला?',
    questionEn: 'In which year was Savitribai Phule\'s first poetry collection "Kavya Phule" published?',
    optionsMr: ['१८५४', '१८६०', '१८८२', '१८९२'],
    optionsEn: ['1854', '1860', '1882', '1892'],
    correctOptionIndex: 0,
    explanationMr: 'सावित्रीबाई फुले यांचा ‘काव्यफुले’ हा काव्यसंग्रह १८५४ मध्ये प्रसिद्ध झाला. तर ‘बावनकशी सुबोध रत्नाकर’ हा काव्यग्रंथ १८९२ मध्ये प्रकाशित झाला.',
    pyqExamTag: 'MPSC राज्यसेवा पूर्व २०१८',
    relatedReformerId: 'phule_savitribai'
  },
  {
    id: 'pyq_sr_12',
    questionMr: '‘शतपत्रे’ (Shatapatre) ही प्रसिद्ध १०० प्रबोधनात्मक पत्रे लोकहितवादींनी कोणत्या साप्ताहिकात लिहिली होती?',
    questionEn: 'In which weekly did Lokhitwadi (Gopal Hari Deshmukh) write his famous 100 letters "Shatapatre"?',
    optionsMr: ['ज्ञानोदय', 'दर्पण', 'प्रभाकर', 'इंदुप्रकाश'],
    optionsEn: ['Dnyanodaya', 'Darpan', 'Prabhakar', 'Induprakash'],
    correctOptionIndex: 2,
    explanationMr: 'भाऊ महाजन यांच्या ‘प्रभाकर’ या साप्ताहिकात १८४८ ते १८४९ या काळात लोकहितवादींनी ‘शतपत्रे’ लिहून समाजातील अनिष्ट रूढी आणि इंग्रजी शिक्षणाचे महत्त्व यावर प्रहार केले.',
    pyqExamTag: 'MPSC संयुक्त गट-ब पूर्व २०१९',
    relatedReformerId: 'lokhitwadi_gopal_hari'
  },
  {
    id: 'pyq_sr_13',
    questionMr: 'कुष्ठरोगावर गुणकारी असलेले ‘खवल्या खैराचे औषध’ (Chaulmoogra) शोधून आंतरराष्ट्रीय कीर्ती मिळवणारे महाराष्ट्रीय संशोधक कोण?',
    questionEn: 'Which Maharashtrian physician-reformer gained international fame by researching the curative properties of Chaulmoogra for leprosy?',
    optionsMr: ['डॉ. आनंदराव जोशी', 'डॉ. भाऊ दाजी लाड', 'डॉ. विश्राम घोले', 'डॉ. आत्माराम पांडुरंग'],
    optionsEn: ['Dr. Anandrao Joshi', 'Dr. Bhau Daji Lad', 'Dr. Vishram Ghole', 'Dr. Atmaram Pandurang'],
    correctOptionIndex: 1,
    explanationMr: 'डॉ. भाऊ दाजी लाड यांनी कुष्ठरोगावर खवल्या खैराच्या बियांचे तेल वापरून रुग्ण बरे केले. यामुळे त्यांना ‘धनवंतरी’ म्हणून गौरवण्यात आले.',
    pyqExamTag: 'MPSC राज्यसेवा मुख्य GS-1',
    relatedReformerId: 'bhau_daji_lad'
  },
  {
    id: 'pyq_sr_14',
    questionMr: '‘इंडियन नॅशनल सोशल कॉन्फरन्स’ (भारतीय सामाजिक परिषद - १८८७) ची स्थापना खालीलपैकी कोणी केली होती?',
    questionEn: 'Who founded the Indian National Social Conference in 1887 alongside the Congress sessions?',
    optionsMr: ['लोकमान्य टिळक', 'न्यायमूर्ती महादेव गोविंद रानडे', 'गोपाळ गणेश आगरकर', 'फिरोजशाह मेहता'],
    optionsEn: ['Lokmanya Tilak', 'Justice M. G. Ranade', 'Gopal Ganesh Agarkar', 'Pherozeshah Mehta'],
    correctOptionIndex: 1,
    explanationMr: 'न्या न्यायमूर्ती म. गो. रानडे व रघुनाथराव यांनी १८८७ मध्ये काँग्रेस अधिवेशनासोबतच सामाजिक सुधारणांवर चर्चा करण्यासाठी ‘भारतीय सामाजिक परिषद’ सुरू केली.',
    pyqExamTag: 'MPSC राज्यसेवा पूर्व २०१७',
    relatedReformerId: 'ranade_mg'
  },
  {
    id: 'pyq_sr_15',
    questionMr: 'कर्मवीर भाऊराव पाटील यांनी ४ ऑक्टोबर १९१९ रोजी ‘रयत शिक्षण संस्थे’ची स्थापना कोठे केली?',
    questionEn: 'Where did Karmaveer Bhaurao Patil establish the Rayat Shikshan Sanstha on 4 October 1919?',
    optionsMr: ['सातारा', 'काळे (जि. सातारा)', 'पुणे', 'कोल्हापूर'],
    optionsEn: ['Satara', 'Kale (Satara)', 'Pune', 'Kolhapur'],
    correctOptionIndex: 1,
    explanationMr: 'कर्मवीर भाऊराव पाटलांनी विजयादशमीच्या मुहूर्तावर ४ ऑक्टोबर १९१९ रोजी काळे (कराड जवळ, जि. सातारा) येथे सत्यशोधक समाजाच्या परिषदेत रयत शिक्षण संस्थेची स्थापना केली. संस्थेचे चिन्ह ‘वड’ हे आहे.',
    pyqExamTag: 'MPSC गट-ब पूर्व २०२०',
    relatedReformerId: 'patil_bhaurao'
  },
  {
    id: 'pyq_sr_16',
    questionMr: '२६ ऑगस्ट १८५२ रोजी स्थापन झालेली महाराष्ट्रातील पहिली राजकीय संघटना ‘बॉम्बे असोसिएशन’ चे प्रमुख शिल्पकार कोण होते?',
    questionEn: 'Who was the key architect of Bombay Association founded on 26 August 1852?',
    optionsMr: ['नाना (जगन्नाथ) शंकरशेट', 'दादाभाई नवरोजी', 'फिरोजशाह मेहता', 'व्यंकटेश शास्त्री'],
    optionsEn: ['Nana Jagannath Shankarsheth', 'Dadabhai Naoroji', 'Pherozeshah Mehta', 'Venkatesh Shastri'],
    correctOptionIndex: 0,
    explanationMr: 'नाना शंकरशेट यांनी दादाभाई नवरोजींच्या सहकार्याने ‘बॉम्बे असोसिएशन’ स्थापन केली. नाना शंकरशेट यांना आचार्य अत्र्यांनी ‘मुंबईचे अनभिषिक्त सम्राट’ म्हटले होते.',
    pyqExamTag: 'MPSC राज्यसेवा पूर्व २०१५ व २०२१',
    relatedReformerId: 'shankarsheth_jagannath'
  },
  {
    id: 'pyq_sr_17',
    questionMr: '‘मराठी वृत्तपत्रसृष्टीचे जनक’ म्हणून कोणाचा गौरव केला जातो?',
    questionEn: 'Who is revered as the "Father of Marathi Journalism"?',
    optionsMr: ['बाळशास्त्री जांभेकर', 'भाऊ महाजन', 'गोपाळ गणेश आगरकर', 'कृष्णराव भालेकर'],
    optionsEn: ['Balshastri Jambhekar', 'Bhau Mahajan', 'Gopal Ganesh Agarkar', 'Krishnarao Bhalekar'],
    correctOptionIndex: 0,
    explanationMr: 'बाळशास्त्री जांभेकर यांनी ६ जानेवारी १८३२ रोजी ‘दर्पण’ हे मराठीतील पहिले वृत्तपत्र सुरू केले. म्हणून ६ जानेवारी हा दिवस महाराष्ट्रात ‘पत्रकार दिन’ म्हणून साजरा केला जातो.',
    pyqExamTag: 'MPSC सरळसेवा व गट-क',
    relatedReformerId: 'jambhekar_balshastri'
  },
  {
    id: 'pyq_sr_18',
    questionMr: 'पंडिता रमाबाई यांनी उच्चवर्णीय बालविधवांसाठी ११ मार्च १८८९ रोजी मुंबईत कोणती संस्था स्थापन केली?',
    questionEn: 'Which institution was founded by Pandita Ramabai on 11 March 1889 in Bombay for young high-caste widows?',
    optionsMr: ['मुक्ती सदन', 'शारदा सदन', 'प्रीती सदन', 'कृपा सदन'],
    optionsEn: ['Mukti Sadan', 'Sharada Sadan', 'Preeti Sadan', 'Krupa Sadan'],
    correctOptionIndex: 1,
    explanationMr: 'पंडिता रमाबाईंनी मुंबईत ११ मार्च १८८९ रोजी ‘शारदा सदन’ सुरू केले (नंतर ते पुण्यात हलवले). यातील पहिल्या विद्यार्थिनी आनंदीबाई (गोदूबाई) कर्वे या होत्या.',
    pyqExamTag: 'MPSC राज्यसेवा पूर्व २०१९',
    relatedReformerId: 'pandita_ramabai'
  },
  {
    id: 'pyq_sr_19',
    questionMr: '‘स्वराज्य हा माझा जन्मसिद्ध हक्क आहे आणि तो मी मिळवणारच!’ ही सिंहगर्जना खालीलपैकी कोणी केली?',
    questionEn: '"Swaraj is my birthright and I shall have it!" - who gave this immortal battle cry?',
    optionsMr: ['सुभाषचंद्र बोस', 'लोकमान्य बाळ गंगाधर टिळक', 'लाला लजपतराय', 'बिपिनचंद्र पाल'],
    optionsEn: ['Subhas Chandra Bose', 'Lokmanya Bal Gangadhar Tilak', 'Lala Lajpat Rai', 'Bipin Chandra Pal'],
    correctOptionIndex: 1,
    explanationMr: 'लोकमान्य टिळकांनी १९१६ मधील होमरूल चळवळीदरम्यान बेळगावच्या सभेत ‘स्वराज्य हा माझा जन्मसिद्ध हक्क आहे आणि तो मी मिळवणारच!’ ही सिंहगर्जना केली होती.',
    pyqExamTag: 'MPSC गट-ब पूर्व २०१७',
    relatedReformerId: 'lokmanya_tilak'
  },
  {
    id: 'pyq_sr_20',
    questionMr: '१२ जून १९०५ रोजी पुण्यात ‘भारत सेवक समाज’ (Servants of India Society) ची स्थापना कोणी केली?',
    questionEn: 'Who founded the "Servants of India Society" in Pune on 12 June 1905?',
    optionsMr: ['गोपाळ कृष्ण गोखले', 'महादेव गोविंद रानडे', 'दादाभाई नवरोजी', 'विठ्ठल रामजी शिंदे'],
    optionsEn: ['Gopal Krishna Gokhale', 'Mahadev Govind Ranade', 'Dadabhai Naoroji', 'Vitthal Ramji Shinde'],
    correctOptionIndex: 0,
    explanationMr: 'गोपाळ कृष्ण गोखले यांनी तरुण देशसेवकांना सार्वजनिक जीवनाचे अध्यात्मीकरण शिकवण्यासाठी १२ जून १९०५ रोजी भारत सेवक समाजाची स्थापना केली. गोखले हे महात्मा गांधींचे राजकीय गुरू होते.',
    pyqExamTag: 'MPSC राज्यसेवा पूर्व २०२०',
    relatedReformerId: 'gokhale_gopal_krishna'
  },
  {
    id: 'pyq_sr_21',
    questionMr: '‘खरा तो एकची धर्म जगाला प्रेम अर्पावे’ ही अमर प्रार्थना खालीलपैकी कोणी रचली?',
    questionEn: 'Who penned the timeless prayer "Khara To Ekachi Dharma, Jagala Prem Arpave"?',
    optionsMr: ['संत गाडगे महाराज', 'साने गुरुजी (पांडुरंग सदाशिव साने)', 'तुकडोजी महाराज', 'विनोबा भावे'],
    optionsEn: ['Sant Gadge Maharaj', 'Sane Guruji', 'Tukdoji Maharaj', 'Vinoba Bhave'],
    correctOptionIndex: 1,
    explanationMr: 'साने गुरुजींनी धुळे कारागृहात असताना मानवता, बंधुभाव आणि समतेचा संदेश देणारी ‘खरा तो एकची धर्म जगाला प्रेम अर्पावे’ ही अमर प्रार्थना रचली.',
    pyqExamTag: 'MPSC गट-क पूर्व २०१८',
    relatedReformerId: 'sane_guruji'
  },
  {
    id: 'pyq_sr_22',
    questionMr: '‘ग्रामगीता’ (४१ अध्याय) या प्रसिद्ध ग्रंथाची रचना खालीलपैकी कोणत्या राष्ट्रसंतांनी केली?',
    questionEn: 'Who authored the revered rural encyclopedia "Gramgeeta" (41 chapters)?',
    optionsMr: ['संत गाडगे महाराज', 'राष्ट्रसंत तुकडोजी महाराज', 'संत तुकडोजी (माणिक इंगळे)', 'पर्याय २ व ३ दोन्ही'],
    optionsEn: ['Sant Gadge Maharaj', 'Rashtrasant Tukdoji Maharaj', 'Manik Ingle', 'Both 2 and 3'],
    correctOptionIndex: 3,
    explanationMr: 'राष्ट्रसंत तुकडोजी महाराज (मूळ नाव माणिक बंडोजी इंगळे/ठाकूर) यांनी मोझरी (अमरावती) येथे १९५५ मध्ये ग्रामसुधारणा आणि लोकशिक्षणावर ‘ग्रामगीता’ हा अमर ग्रंथ लिहिला.',
    pyqExamTag: 'MPSC राज्यसेवा मुख्य GS-1',
    relatedReformerId: 'tukdoji_maharaj'
  },
  {
    id: 'pyq_sr_23',
    questionMr: '१ जानेवारी १८७७ रोजी पुणे येथून ‘दीनबंधू’ हे सत्यशोधक समाजाचे पहिले वृत्तपत्र कोणी सुरू केले?',
    questionEn: 'Who started the pioneering Satya Shodhak newspaper "Deenbandhu" from Pune on 1 January 1877?',
    optionsMr: ['कृष्णराव पांडुरंग भालेकर', 'नारायण मेघाजी लोखंडे', 'महात्मा जोतीराव फुले', 'भाऊ महाजन'],
    optionsEn: ['Krishnarao Pandurang Bhalekar', 'Narayan Meghaji Lokhande', 'Mahatma Jotirao Phule', 'Bhau Mahajan'],
    correctOptionIndex: 0,
    explanationMr: 'कृष्णराव भालेकर यांनी १८७७ मध्ये पुण्यात ‘दीनबंधू’ सुरू केले. १८८० नंतर हे वृत्तपत्र नारायण मेघाजी लोखंडे यांनी मुंबईतून चालवले आणि ते कामगारांचे मुखपत्र बनले.',
    pyqExamTag: 'MPSC संयुक्त पूर्व २०२१',
    relatedReformerId: 'bhalekar_krishnarao'
  },
  {
    id: 'pyq_sr_24',
    questionMr: 'स्वतंत्र भारताचे पहिले कृषी मंत्री आणि ‘श्री शिवाजी शिक्षण संस्था’ अमरावतीचे संस्थापक कोण होते?',
    questionEn: 'Who was Independent India\'s first Union Agriculture Minister and founder of Shri Shivaji Education Society, Amravati?',
    optionsMr: ['डॉ. पंजाबराव देशमुख', 'यशवंतराव चव्हाण', 'वसंतराव नाईक', 'शंकरराव चव्हाण'],
    optionsEn: ['Dr. Panjabrao Deshmukh', 'Yashwantrao Chavan', 'Vasantrao Naik', 'Shankarrao Chavan'],
    correctOptionIndex: 0,
    explanationMr: 'डॉ. पंजाबराव (भाऊसाहेब) देशमुख यांनी १९३२ मध्ये विदर्भात श्री शिवाजी शिक्षण संस्था स्थापन केली आणि १९५५ मध्ये ‘भारत कृषक समाज’ ची स्थापना केली. ते भारताचे पहिले कृषी मंत्री होते.',
    pyqExamTag: 'MPSC राज्यसेवा पूर्व २०१९',
    relatedReformerId: 'panjabrao_deshmukh'
  },
  {
    id: 'pyq_sr_25',
    questionMr: '‘जग बदल घालूनी घाव, सांगून गेले मज भीमराव!’ हे क्रांतीगीत कोणत्या लोकशाहिराने रचले?',
    questionEn: 'Who penned the iconic revolutionary song "Jag Badal Ghaluni Ghav, Sangun Gele Maj Bhimrao"?',
    optionsMr: ['शाहीर अमर शेख', 'लोकशाहीर अण्णाभाऊ साठे', 'शाहीर द. ना. गव्हाणकर', 'विठ्ठल उमप'],
    optionsEn: ['Shahir Amar Sheikh', 'Lokshahir Annabhau Sathe', 'Shahir Gavhankar', 'Vithal Umap'],
    correctOptionIndex: 1,
    explanationMr: 'लोकशाहीर अण्णाभाऊ साठे यांनी हे अजरामर गीत लिहिले. त्यांनी लाल बावटा कलापथकाच्या माध्यमातून संयुक्त महाराष्ट्र चळवळ आणि कष्टकऱ्यांची जागृती केली.',
    pyqExamTag: 'MPSC गट-ब पूर्व २०१८',
    relatedReformerId: 'annabhau_sathe'
  },
  {
    id: 'pyq_sr_26',
    questionMr: 'चंद्रपूर जिल्ह्यातील वरोरा येथे कुष्ठरोग्यांच्या पुनर्वसनासाठी ‘आनंदवन’ (१९४९/१९५१) ची स्थापना कोणी केली?',
    questionEn: 'Who established "Anandwan" near Warora in Chandrapur district for the rehabilitation of leprosy patients?',
    optionsMr: ['बाबा आमटे (मुरलीधर देवीदास आमटे)', 'डॉ. शिवाजीराव पटवर्धन', 'डॉ. अभय बंग', 'डॉ. प्रकाश आमटे'],
    optionsEn: ['Baba Amte', 'Dr. Shivajirao Patwardhan', 'Dr. Abhay Bang', 'Dr. Prakash Amte'],
    correctOptionIndex: 0,
    explanationMr: 'बाबा आमटे यांनी महारोगी सेवा समितीच्या अंतर्गत वरोरा येथे ‘आनंदवन’ स्थापन केले. नंतर त्यांनी ‘सोमनाथ’ (श्रम संस्कार छावणी) आणि गडचिरोलीत ‘हेमलकसा’ प्रकल्प उभा केला.',
    pyqExamTag: 'MPSC राज्यसेवा पूर्व २०२०',
    relatedReformerId: 'baba_amte'
  },
  {
    id: 'pyq_sr_27',
    questionMr: '१८७० मध्ये पुण्यात ‘पुणे सार्वजनिक सभा’ स्थापन करण्यात महत्त्वाची भूमिका बजावणारे ‘सार्वजनिक काका’ कोण?',
    questionEn: 'Who was revered as "Sarvajanik Kaka" for founding the Poona Sarvajanik Sabha in 1870?',
    optionsMr: ['गणेश वासुदेव जोशी', 'महादेव गोविंद रानडे', 'गोपाळ हरी देशमुख', 'विष्णूशास्त्री पंडित'],
    optionsEn: ['Ganesh Vasudev Joshi', 'M. G. Ranade', 'Gopal Hari Deshmukh', 'Vishnushastri Pandit'],
    correctOptionIndex: 0,
    explanationMr: 'गणेश वासुदेव जोशी यांना लोक प्रेमाने ‘सार्वजनिक काका’ म्हणत. १८७७ च्या दिल्ली दरबारात त्यांनी स्वतः कातलेल्या हातमाग खादीचा पोशाख घालून जनतेची गाऱ्हाणी मांडली होती.',
    pyqExamTag: 'MPSC संयुक्त गट-ब पूर्व २०२२',
    relatedReformerId: 'sarvajanik_kaka'
  },
  {
    id: 'pyq_sr_28',
    questionMr: 'पुण्यात १९०९ मध्ये ‘पुणे सेवा सदन सोसायटी’ ची स्थापना कोणी केली?',
    questionEn: 'Who founded the "Pune Seva Sadan Society" in 1909 for empowering destitute women?',
    optionsMr: ['रमाबाई रानडे', 'पंडिता रमाबाई', 'सावित्रीबाई फुले', 'ताराबाई शिंदे'],
    optionsEn: ['Ramabai Ranade', 'Pandita Ramabai', 'Savitribai Phule', 'Tarabai Shinde'],
    correctOptionIndex: 0,
    explanationMr: 'रमाबाई रानडे यांनी जी. के. देवधर यांच्या सहकार्याने १९०९ मध्ये ‘पुणे सेवा सदन सोसायटी’ ची स्थापना केली. यात स्त्रियांना परिचारिका व शिक्षिका बनवण्याचे प्रशिक्षण दिले जात असे.',
    pyqExamTag: 'MPSC राज्यसेवा पूर्व २०२१',
    relatedReformerId: 'ramabai_ranade'
  },
  {
    id: 'pyq_sr_29',
    questionMr: 'लंडनच्या कोर्टात दाद मागून संमती वयाच्या कायद्याची (Age of Consent Act 1891) पार्श्वभूमी तयार करणाऱ्या विदुषी कोण?',
    questionEn: 'Who fought the landmark marital restitution case leading to the Age of Consent Act 1891?',
    optionsMr: ['डॉ. रखमाबाई राऊत', 'डॉ. आनंदीबाई जोशी', 'ताराबाई मोडक', 'अनुताई वाघ'],
    optionsEn: ['Dr. Rakhmabai Raut', 'Dr. Anandibai Joshi', 'Tarabai Modak', 'Anutai Wagh'],
    correctOptionIndex: 0,
    explanationMr: 'डॉ. रखमाबाई राऊत यांनी बालविवाहाविरुद्ध लढा दिला आणि टाइम्स ऑफ इंडियामध्ये ‘अ हिंदू लेडी’ या टोपणनावाने गाजलेले पत्र लिहिले. नंतर त्या इंग्लंडमधून वैद्यकीय पदवी घेऊन डॉक्टर झाल्या.',
    pyqExamTag: 'MPSC राज्यसेवा मुख्य GS-1',
    relatedReformerId: 'rakhmabai_raut'
  },
  {
    id: 'pyq_sr_30',
    questionMr: 'अमेरिकेतून १८८६ मध्ये एम.डी. (MD) वैद्यकीय पदवी प्राप्त करणाऱ्या पहिल्या भारतीय महिला कोण?',
    questionEn: 'Who was the first Indian woman to obtain an MD degree from the Women\'s Medical College of Pennsylvania, USA in 1886?',
    optionsMr: ['डॉ. रखमाबाई राऊत', 'डॉ. आनंदीबाई जोशी', 'कादंबिनी गांगुली', 'मुथुलक्ष्मी रेड्डी'],
    optionsEn: ['Dr. Rakhmabai Raut', 'Dr. Anandibai Joshi', 'Kadambini Ganguly', 'Muthulakshmi Reddi'],
    correctOptionIndex: 1,
    explanationMr: 'डॉ. आनंदीबाई गोपाळराव जोशी यांनी १८८६ मध्ये अमेरिकेतून पेनसिल्व्हेनिया कॉलेजमधून वैद्यकीय पदवी घेतली. अल्बर्ट एडवर्ड यांनी त्यांचे विशेष कौतुक केले होते.',
    pyqExamTag: 'MPSC तांत्रिक व संयुक्त पूर्व',
    relatedReformerId: 'dr_anandibai_joshi'
  },
  {
    id: 'pyq_sr_31',
    questionMr: 'रत्नागिरीत सर्व जातींसाठी मुक्त प्रवेश असलेले ‘पतित पावन मंदिर’ (१९३१) कोणाच्या प्रयत्नाने उभारले गेले?',
    questionEn: 'Patit Pavan Temple (1931) open to all castes in Ratnagiri was built through the efforts of whom?',
    optionsMr: ['स्वातंत्र्यवीर विनायक दामोदर सावरकर', 'महर्षी विठ्ठल रामजी शिंदे', 'डॉ. बाबासाहेब आंबेडकर', 'भागोजी कीर'],
    optionsEn: ['V. D. Savarkar', 'V. R. Shinde', 'Dr. B. R. Ambedkar', 'Bhagoji Keer'],
    correctOptionIndex: 0,
    explanationMr: 'स्वातंत्र्यवीर सावरकरांनी रत्नागिरीतील स्थानबद्धतेच्या काळात (१९२४-१९३७) अस्पृश्यता निर्मूलनासाठी पतित पावन मंदिर स्थापन केले आणि आंतरजातीय सहभोजने आयोजित केली.',
    pyqExamTag: 'MPSC राज्यसेवा पूर्व २०१९',
    relatedReformerId: 'savarkar_vd'
  },
  {
    id: 'pyq_sr_32',
    questionMr: '‘विटाळ विध्वंसन’ (१८८८) या पुस्तिकेतून अस्पृश्यतेवर कोरडे ओढणारे दलित चळवळीचे आद्य प्रणेते कोण?',
    questionEn: 'Who authored the pioneering anti-untouchability tract "Vital Vidhvansan" in 1888?',
    optionsMr: ['गोपाळबाबा वलंगकर', 'शिवराम जानबा कांबळे', 'किसन फागुजी बनसोडे', 'नारायण मेघाजी लोखंडे'],
    optionsEn: ['Gopalbaba Walangkar', 'Shivram Janba Kamble', 'Kisan Fagu Bansode', 'N. M. Lokhande'],
    correctOptionIndex: 0,
    explanationMr: 'गोपाळबाबा वलंगकर यांनी १८८८ मध्ये ‘विटाळ विध्वंसन’ ही पुस्तिका लिहिली आणि दापोली येथे ‘अनार्य दोष परिहारक मंडळी’ स्थापन करून दलित हक्कांचा शंख फुंकला.',
    pyqExamTag: 'MPSC संयुक्त पूर्व २०२० व २०२२',
    relatedReformerId: 'gopalbaba_walangkar'
  },
  {
    id: 'pyq_sr_33',
    questionMr: 'ठाणे जिल्ह्यातील वारली आदिवासींचा वेठबिगारीविरुद्धचा लढा आणि ‘जेव्हा माणूस जागा होतो’ या ग्रंथाच्या लेखिका कोण?',
    questionEn: 'Who led the anti-bonded labor agitation of Warli tribals in Thane and authored "Jevha Manus Jaga Hoto"?',
    optionsMr: ['अनुताई वाघ', 'ताराबाई मोडक', 'गोदावरी परुळेकर', 'शांताबाई दाणी'],
    optionsEn: ['Anutai Wagh', 'Tarabai Modak', 'Godavari Parulekar', 'Shantabai Dani'],
    correctOptionIndex: 2,
    explanationMr: 'गोदावरी परुळेकर यांनी डहाणू-तलासरी भागातील वारली आदिवासींना एकत्र करून वेठबिगारी नष्ट केली. त्यांच्या या संघर्षावर ‘जेव्हा माणूस जागा होतो’ हा साहित्य अकादमी पुरस्कार विजेता ग्रंथ लिहिला.',
    pyqExamTag: 'MPSC राज्यसेवा पूर्व २०१८',
    relatedReformerId: 'godavari_parulekar'
  },
  {
    id: 'pyq_sr_34',
    questionMr: 'निजामाच्या जुलमी राजवटीविरुद्ध मराठवाडा मुक्ती संग्रामाचे सर्वोच्च नेतृत्व (सरसेनापती) कोणी केले?',
    questionEn: 'Who was the Supreme Commander of the Marathwada Liberation Struggle against the Nizam\'s regime?',
    optionsMr: ['स्वामी रामानंद तीर्थ', 'गोविंदभाई श्रॉफ', 'बाबासाहेब परांजपे', 'आनंदराव भालेराव'],
    optionsEn: ['Swami Ramanand Teerth', 'Govindbhai Shroff', 'Babasaheb Paranjape', 'Anandrao Bhalerao'],
    correctOptionIndex: 0,
    explanationMr: 'स्वामी रामानंद तीर्थ यांनी हैदराबाद स्टेट काँग्रेसच्या माध्यमातून मराठवाडा मुक्ती संग्रामाचे नेतृत्व केले. १७ सप्टेंबर १९४८ रोजी मराठवाडा निजामाच्या तावडीतून मुक्त झाला.',
    pyqExamTag: 'MPSC संयुक्त गट-ब पूर्व २०२१',
    relatedReformerId: 'swami_ramanand_teerth'
  },
  {
    id: 'pyq_sr_35',
    questionMr: 'मराठी भाषेतील २३ खंडांचा भव्य ‘महाराष्ट्रीय ज्ञानकोश’ तयार करण्याचे ऐतिहासिक कार्य कोणी केले?',
    questionEn: 'Who undertook the mammoth task of compiling the 23-volume "Maharashtriya Gnyankosh"?',
    optionsMr: ['डॉ. श्रीधर व्यंकटेश केतकर', 'लक्ष्मणशास्त्री जोशी', 'विष्णूशास्त्री चिपळूणकर', 'बाळशास्त्री जांभेकर'],
    optionsEn: ['Dr. Shridhar Venkatesh Ketkar', 'Laxmanshastri Joshi', 'Vishnushastri Chiplunkar', 'Balshastri Jambhekar'],
    correctOptionIndex: 0,
    explanationMr: 'डॉ. श्रीधर व्यंकटेश केतकर यांनी १९१६ मध्ये ज्ञानकोश मंडळ स्थापन करून २३ खंडांचा ज्ञानकोश पूर्ण केला. म्हणूनच त्यांना ‘ज्ञानकोशकार केतकर’ म्हटले जाते.',
    pyqExamTag: 'MPSC राज्यसेवा पूर्व २०१६',
    relatedReformerId: 'dr_sv_ketkar'
  },
  {
    id: 'pyq_sr_36',
    questionMr: 'महाराष्ट्रातील खेड्यापाड्यात अस्पृश्यांना विहिरींवर पाणी मिळावे म्हणून ‘एक गाव एक पाणवठा’ ही मोहीम कोणी सुरू केली?',
    questionEn: 'Who launched the historic "Ek Gaav Ek Panavatha" campaign for Dalits\' water rights across Maharashtra?',
    optionsMr: ['डॉ. बाबा आढाव', 'बाबा आमटे', 'मेधा पाटकर', 'अण्णा हजारे'],
    optionsEn: ['Dr. Baba Adhav', 'Baba Amte', 'Medha Patkar', 'Anna Hazare'],
    correctOptionIndex: 0,
    explanationMr: 'डॉ. बाबा आढाव यांनी १९७२ च्या दुष्काळानंतर महाराष्ट्रात ‘एक गाव एक पाणवठा’ चळवळ सुरू केली. तसेच पुण्यात कष्टकरी कामगारांसाठी ‘हमाल पंचायत’ स्थापन केली.',
    pyqExamTag: 'MPSC संयुक्त गट-क व सरळसेवा',
    relatedReformerId: 'dr_baba_adhav'
  }
];
