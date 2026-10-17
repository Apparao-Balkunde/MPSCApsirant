// ============================================================================
// INDIAN CONSTITUTION & POLITY MASTER DATABASE (भारतीय राज्यघटना व संविधान)
// Tailored for MPSC Rajyaseva, Combine Group B & C, Talathi, and Police Bharti
// Covers: Key Articles 1-395, 12 Schedules, Major Amendments 1-106,
// Landmark Supreme Court Judgments, and Previous Year Questions (PYQs).
// ============================================================================

export interface ConstitutionArticle {
  articleNumber: string; // e.g. "१४", "२१", "३२", "३६८"
  articleNumberInt: number;
  partRoman: string; // e.g. "Part III", "Part IV", "Part V"
  partMr: string; // e.g. "भाग ३: मूलभूत हक्क"
  titleMr: string;
  titleEn: string;
  summaryMr: string;
  summaryEn: string;
  category: 'fundamental_rights' | 'dpsp' | 'fundamental_duties' | 'union_executive' | 'parliament' | 'judiciary' | 'state_gov' | 'emergency' | 'amendments' | 'commissions_elections';
  mpscHighlightsMr: string[];
  isHighYield: boolean;
  landmarkJudgmentsMr?: string[];
}

export interface ConstitutionalSchedule {
  scheduleNumber: number;
  titleMr: string;
  titleEn: string;
  keyProvisionsMr: string;
  keyProvisionsEn: string;
  articlesCovered: string;
  mnemonicNoteMr: string;
  mpscTipsMr: string;
}

export interface ConstitutionalAmendment {
  amendmentNumber: number;
  year: number;
  titleMr: string;
  titleEn: string;
  summaryMr: string;
  summaryEn: string;
  keyProvisionsMr: string[];
  mpscImportance: string;
  isSuperHighYield: boolean;
}

export interface LandmarkJudgment {
  id: string;
  caseNameMr: string;
  caseNameEn: string;
  year: number;
  benchSizeMr: string;
  keyVerdictMr: string;
  keyVerdictEn: string;
  mpscSignificanceMr: string;
  articlesInvolved: string[];
}

export interface PolityPyqQuestion {
  id: string;
  questionMr: string;
  questionEn: string;
  optionsMr: string[];
  optionsEn: string[];
  correctOptionIndex: number;
  explanationMr: string;
  pyqExamTag: string; // e.g. "MPSC राज्यसेवा पूर्व २०२३"
  relatedTopic: string;
}

// ----------------------------------------------------------------------------
// 1. HIGH-YIELD CONSTITUTIONAL ARTICLES MASTER LIST
// ----------------------------------------------------------------------------
export const CONSTITUTION_ARTICLES: ConstitutionArticle[] = [
  {
    articleNumber: '१',
    articleNumberInt: 1,
    partRoman: 'Part I',
    partMr: 'भाग १: संघराज्य व त्याचे राज्यक्षेत्र',
    titleMr: 'संघाचे नाव आणि राज्यक्षेत्र (Name and territory of the Union)',
    titleEn: 'Name and territory of the Union',
    summaryMr: 'इंडिया म्हणजेच भारत हा राज्यांचा संघ (Union of States) असेल. यात राज्ये, केंद्रशासित प्रदेश आणि संपादित प्रदेशांचा समावेश होतो.',
    summaryEn: 'India, that is Bharat, shall be a Union of States.',
    category: 'union_executive',
    mpscHighlightsMr: [
      'डॉ. आंबेडकरांनुसार ‘Union of States’ या संज्ञेचे दोन अर्थ: १) राज्ये कोणत्याही कराराचा परिणाम नाहीत, २) कोणत्याही राज्याला संघातून फुटून बाहेर पडण्याचा अधिकार नाही.',
      '‘भारताचे राज्यक्षेत्र’ (Territory of India) ही संज्ञा ‘भारतीय संघराज्य’ (Union of India) पेक्षा अधिक व्यापक आहे.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '३',
    articleNumberInt: 3,
    partRoman: 'Part I',
    partMr: 'भाग १: संघराज्य व त्याचे राज्यक्षेत्र',
    titleMr: 'नवीन राज्यांची निर्मिती व विद्यमान राज्यांच्या सीमा/नावात बदल',
    titleEn: 'Formation of new States and alteration of areas, boundaries or names of existing States',
    summaryMr: 'संसदेला साध्या बहुमताने नवीन राज्य निर्माण करण्याचा, राज्यांचे क्षेत्रफळ कमी-जास्त करण्याचा किंवा सीमारेषा व नाव बदलण्याचा अधिकार आहे.',
    summaryEn: 'Parliament may by law form new States and alter boundaries or names of existing States.',
    category: 'union_executive',
    mpscHighlightsMr: [
      'असे विधेयक राष्ट्रपतींच्या पूर्वशिफारशीशिवाय संसदेत मांडता येत नाही.',
      'राष्ट्रपती ते विधेयक संबंधित राज्य विधिमंडळाकडे मत जाणून घेण्यासाठी पाठवतात; परंतु विधिमंडळाचे मत राष्ट्रपती किंवा संसदेवर बंधनकारक नसते.',
      'भारताला ‘विनाशी राज्यांचा अविनाशी संघ’ (Indestructible Union of destructible States) म्हटले जाते.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '१२',
    articleNumberInt: 12,
    partRoman: 'Part III',
    partMr: 'भाग ३: मूलभूत हक्क',
    titleMr: '‘राज्यसंस्था’ (State) ची व्याख्या',
    titleEn: 'Definition of State for Fundamental Rights',
    summaryMr: 'मूलभूत हक्कांसाठी राज्यसंस्थेमध्ये भारत सरकार व संसद, घटकराज्य सरकार व विधिमंडळ, स्थानिक स्वराज्य संस्था (महानगरपालिका, पंचायत) आणि इतर वैधानिक प्राधिकरणे (LIC, ONGC, SAIL) यांचा समावेश होतो.',
    summaryEn: 'Defines the term "State" for Part III including government, parliament, local and other authorities.',
    category: 'fundamental_rights',
    mpscHighlightsMr: [
      'मूलभूत हक्क हे सामान्यतः राज्यसंस्थेच्या कृतीविरोधात उपलब्ध असतात, खाजगी व्यक्तींविरोधात नव्हे (काही अपवाद सोडून).',
      'खाजगी संस्था जी शासनाचे कार्य करते तीही कलम १२ च्या कक्षेत येते (अजय हसिया खटला).'
    ],
    isHighYield: true
  },
  {
    articleNumber: '१३',
    articleNumberInt: 13,
    partRoman: 'Part III',
    partMr: 'भाग ३: मूलभूत हक्क',
    titleMr: 'मूलभूत हक्कांशी विसंगत असलेले कायदे रद्दबातल होणे (न्यायिक पुनर्विलोकन)',
    titleEn: 'Laws inconsistent with or in derogation of the fundamental rights',
    summaryMr: 'कोणताही कायदा मूलभूत हक्कांचे उल्लंघन करत असल्यास, तो कायदा त्या उल्लंघनाच्या मर्यादेपर्यंत शून्य (Void) ठरेल. हा कलम न्यायालयांना ‘न्यायिक पुनर्विलोकन’ (Judicial Review) चा थेट अधिकार देतो.',
    summaryEn: 'Declares that all laws in force before or made after the commencement of the Constitution inconsistent with FRs are void.',
    category: 'fundamental_rights',
    mpscHighlightsMr: [
      'कलम १३(२) नुसार संसद किंवा विधिमंडळ मूलभूत हक्क हिरावून घेणारा कायदा करू शकत नाही.',
      'केशवानंद भारती खटल्यात (1973) सुप्रीम कोर्टाने स्पष्ट केले की, घटनादुरुस्तीने घटनेच्या मूलभूत संरचनेला धक्का लावता येत नाही.'
    ],
    isHighYield: true,
    landmarkJudgmentsMr: ['केशवानंद भारती (१९७३)', 'मिनर्व्हा मिल्स (१९८०)']
  },
  {
    articleNumber: '१४',
    articleNumberInt: 14,
    partRoman: 'Part III',
    partMr: 'भाग ३: मूलभूत हक्क',
    titleMr: 'कायद्यापुढे समानता व कायद्याचे समान संरक्षण (Right to Equality)',
    titleEn: 'Equality before law and equal protection of the laws',
    summaryMr: 'राज्य कोणत्याही व्यक्तीला भारताच्या राज्यक्षेत्रात कायद्यापुढे समानता किंवा कायद्याचे समान संरक्षण नाकारणार नाही. हे भारतीय नागरिक व परकीय नागरिक दोघांनाही लागू आहे.',
    summaryEn: 'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
    category: 'fundamental_rights',
    mpscHighlightsMr: [
      '‘कायद्यापुढे समानता’ (Equality before law) ही ब्रिटिश संकल्पना असून ती नकारात्मक स्वरूपाची आहे.',
      '‘कायद्याचे समान संरक्षण’ (Equal protection of the laws) ही अमेरिकन संकल्पना असून ती सकारात्मक स्वरूपाची आहे.',
      'अपवाद: कलम ३६१ अन्वये राष्ट्रपती व राज्यपालांना पदाच्या अधिकारात फौजदारी कारवाईपासून संरक्षण मिळते.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '१५',
    articleNumberInt: 15,
    partRoman: 'Part III',
    partMr: 'भाग ३: मूलभूत हक्क',
    titleMr: 'धर्म, वंश, जात, लिंग किंवा जन्मस्थान यावरून भेदभावास बंदी',
    titleEn: 'Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth',
    summaryMr: 'केवळ धर्म, वंश, जात, लिंग किंवा जन्मस्थान या कारणांवरून दुकाने, उपाहारगृहे, सार्वजनिक विहिरी व तलावांवर भेदभावास बंदी.',
    summaryEn: 'Prohibits discrimination on grounds only of religion, race, caste, sex, place of birth or any of them.',
    category: 'fundamental_rights',
    mpscHighlightsMr: [
      'कलम १५(३): महिला व बालकांसाठी विशेष तरतुदी करण्याचा राज्याला अधिकार.',
      'कलम १५(४): सामाजिक व शैक्षणिकदृष्ट्या मागास वर्ग (OBC/SC/ST) साठी विशेष तरतूद (१ ली घटनादुरुस्ती १९५१).',
      'कलम १५(५): उच्च व खाजगी शिक्षण संस्थांमध्ये मागासवर्गांसाठी आरक्षण (९३ वी घटनादुरुस्ती २००५).',
      'कलम १५(६): आर्थिकदृष्ट्या दुर्बल घटकांसाठी (EWS) शिक्षण संस्थांत १०% आरक्षण (१०३ वी घटनादुरुस्ती २०१९).'
    ],
    isHighYield: true
  },
  {
    articleNumber: '१६',
    articleNumberInt: 16,
    partRoman: 'Part III',
    partMr: 'भाग ३: मूलभूत हक्क',
    titleMr: 'सार्वजनिक नोकऱ्यांमध्ये समान संधी व आरक्षण तरतुदी',
    titleEn: 'Equality of opportunity in matters of public employment',
    summaryMr: 'शासकीय नोकऱ्यांमध्ये सर्व नागरिकांना समान संधी असेल. केवळ धर्म, वंश, जात, लिंग, जन्मस्थान किंवा निवास यावरून अपात्र ठरवले जाणार नाही.',
    summaryEn: 'Guarantees equality of opportunity for all citizens in matters relating to employment or appointment under the State.',
    category: 'fundamental_rights',
    mpscHighlightsMr: [
      'कलम १६(४): मागासवर्गीयांना पुरेशा प्रमाणात प्रतिनिधित्व नसल्यास नोकऱ्यांमध्ये आरक्षण देण्याची तरतूद.',
      'कलम १६(४A): अनुसूचित जाती व जमातींना पदोन्नतीत आरक्षण (७७ वी घटनादुरुस्ती १९९५).',
      'कलम १६(६): खुल्या प्रवर्गातील EWS घटकांसाठी १०% आरक्षण (१०३ वी घटनादुरुस्ती २०१९).',
      'इंदिरा साहनी खटल्यात (1992) आरक्षणाची ५०% कमाल मर्यादा घालून देण्यात आली.'
    ],
    isHighYield: true,
    landmarkJudgmentsMr: ['इंदिरा साहनी खटला (१९९२)']
  },
  {
    articleNumber: '१७',
    articleNumberInt: 17,
    partRoman: 'Part III',
    partMr: 'भाग ३: मूलभूत हक्क',
    titleMr: 'अस्पृश्यता निर्मूलन (Abolition of Untouchability)',
    titleEn: 'Abolition of Untouchability',
    summaryMr: 'अस्पृश्यता नष्ट करण्यात आली असून कोणत्याही स्वरूपात तिचे आचरण करणे कायद्याने दंडनीय अपराध आहे.',
    summaryEn: 'Untouchability is abolished and its practice in any form is forbidden and punishable by law.',
    category: 'fundamental_rights',
    mpscHighlightsMr: [
      'संविधानात ‘अस्पृश्यता’ या शब्दाची व्याख्या दिलेली नाही.',
      'अस्पृश्यता निवारणासाठी संसदेने ‘अस्पृश्यता (अपराध) कायदा १९५५’ केला, ज्याचे नाव १९७६ मध्ये ‘नागरी हक्क संरक्षण कायदा १९५५’ (Civil Rights Protection Act) करण्यात आले.',
      'हा हक्क राज्यसंस्था तसेच खाजगी व्यक्तींविरुद्धही उपलब्ध असणारा परिपूर्ण हक्क (Absolute Right) आहे.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '१८',
    articleNumberInt: 18,
    partRoman: 'Part III',
    partMr: 'भाग ३: मूलभूत हक्क',
    titleMr: 'किताबांची / पदव्यांची समाप्ती (Abolition of Titles)',
    titleEn: 'Abolition of titles',
    summaryMr: 'राज्य सैनिकी किंवा शैक्षणिक पदवी व्यतिरिक्त कोणताही किताब बहाल करणार नाही. तसेच कोणताही नागरिक परदेशी सरकारकडून किताब स्वीकारू शकणार नाही.',
    summaryEn: 'Abolishes titles; no citizen shall accept any title from any foreign State.',
    category: 'fundamental_rights',
    mpscHighlightsMr: [
      'बालाजी राघवन खटल्यात (1996) सुप्रीम कोर्टाने स्पष्ट केले की भारत रत्न, पद्मविभूषण, पद्मभूषण, पद्मश्री हे राष्ट्रीय पुरस्कार आहेत, किताब नाहीत; परंतु यांचा वापर नावापुढे किंवा मागे उपाधी म्हणून करता येत नाही.'
    ],
    isHighYield: false
  },
  {
    articleNumber: '१९',
    articleNumberInt: 19,
    partRoman: 'Part III',
    partMr: 'भाग ३: मूलभूत हक्क',
    titleMr: 'भाषण व अभिव्यक्ती स्वातंत्र्यासह ६ मूलभूत स्वातंत्र्ये',
    titleEn: 'Protection of 6 freedoms regarding speech, assembly, association, movement, residence, and profession',
    summaryMr: 'नागरिकांना ६ प्रकारची स्वातंत्र्ये: १) भाषण व अभिव्यक्ती, २) शांततामय निशस्त्र सभा, ३) संघटना/सहकारी संस्था स्थापन करणे, ४) भारतात मुक्त संचार, ५) कुठेही निवास करणे, ६) कोणताही व्यवसाय करणे.',
    summaryEn: 'Guarantees 6 fundamental freedoms to citizens subject to reasonable restrictions.',
    category: 'fundamental_rights',
    mpscHighlightsMr: [
      'मूळ घटनेत ७ स्वातंत्र्ये होती; ४४ व्या घटनादुरुस्तीने (१९७८) मालमत्ता संपादन व विक्रीचे स्वातंत्र्य [१९(१)(f)] वगळण्यात आले.',
      '९७ व्या घटनादुरुस्तीने (२०११) ‘सहकारी संस्था’ स्थापन करण्याचा हक्क कलम १९(१)(c) मध्ये समाविष्ट करण्यात आला.',
      'प्रेस स्वातंत्र्य (माध्यमे), माहितीचा हक्क आणि इंटरनेटचा हक्क हे कलम १९(१)(a) मधील भाषण व अभिव्यक्ती स्वातंत्र्याचा भाग मानले जातात.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '२१',
    articleNumberInt: 21,
    partRoman: 'Part III',
    partMr: 'भाग ३: मूलभूत हक्क',
    titleMr: 'जीवित व वैयक्तिक स्वातंत्र्याचे संरक्षण (Right to Life and Personal Liberty)',
    titleEn: 'Protection of life and personal liberty',
    summaryMr: 'कायद्याने प्रस्थापित केलेली कार्यपद्धती (Procedure established by law) शिवाय कोणत्याही व्यक्तीला तिच्या जीवितापासून अथवा वैयक्तिक स्वातंत्र्यापासून वंचित केले जाणार नाही.',
    summaryEn: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.',
    category: 'fundamental_rights',
    mpscHighlightsMr: [
      'मेनका गांधी खटल्यात (1978) सुप्रीम कोर्टाने ‘कायद्याने प्रस्थापित पद्धती’ ऐवजी अमेरिकन ‘योग्य कायदेशीर प्रक्रिया’ (Due process of law) चा सिद्धांत स्वीकारला.',
      'पुट्टस्वामी खटल्यात (2017) ९ न्यायाधीशांच्या घटनापीठाने ‘खाजगीपणाचा हक्क’ (Right to Privacy) हा कलम २१ अंतर्गत मूलभूत हक्क घोषित केला.',
      '४४ व्या घटनादुरुस्तीनुसार (१९७८) राष्ट्रीय आणीबाणीतही (कलम ३५२) कलम २० आणि २१ कोणत्याही परिस्थितीत निलंबित करता येत नाहीत.'
    ],
    isHighYield: true,
    landmarkJudgmentsMr: ['मेनका गांधी खटला (१९७८)', 'के. एस. पुट्टस्वामी खटला (२०१७)']
  },
  {
    articleNumber: '२१A',
    articleNumberInt: 21.1,
    partRoman: 'Part III',
    partMr: 'भाग ३: मूलभूत हक्क',
    titleMr: 'शिक्षणाचा मूलभूत हक्क (Right to Education - RTE)',
    titleEn: 'Right to free and compulsory education for children aged 6 to 14 years',
    summaryMr: 'राज्य ६ ते १४ वयोगटातील सर्व मुलांना मोफत व सक्तीचे शिक्षण देईल.',
    summaryEn: 'The State shall provide free and compulsory education to all children of 6 to 14 years.',
    category: 'fundamental_rights',
    mpscHighlightsMr: [
      '८६ वी घटनादुरुस्ती कायदा २००२ द्वारे कलम २१A संविधानात नव्याने जोडण्यात आले.',
      'या अंमलबजावणीसाठी संसदेने ‘Right to Education (RTE) Act 2009’ संमत केला, जो १ एप्रिल २०१० पासून लागू झाला.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '२२',
    articleNumberInt: 22,
    partRoman: 'Part III',
    partMr: 'भाग ३: मूलभूत हक्क',
    titleMr: 'काही बाबींमध्ये अटक व स्थानबद्धतेपासून संरक्षण',
    titleEn: 'Protection against arrest and detention in certain cases',
    summaryMr: 'अटक केलेल्या व्यक्तीला २४ तासांच्या आत दंडाधिकाऱ्यासमोर (मॅजिस्ट्रेट) हजर करणे, अटकेचे कारण जाणून घेणे व वकिलामार्फत बाजू मांडण्याचा अधिकार.',
    summaryEn: 'Provides safeguards against arbitrary arrest and detention including right to consult lawyer.',
    category: 'fundamental_rights',
    mpscHighlightsMr: [
      'प्रतिबंधात्मक स्थानबद्धता (Preventive Detention) अंतर्गत गुन्ह्याची शक्यता रोखण्यासाठी विनाखटला जास्तीत जास्त ३ महिने स्थानबद्ध करता येते.',
      '२४ तासांच्या मुदतीत प्रवासाचा वेळ वगळला जातो.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '२३-२४',
    articleNumberInt: 23,
    partRoman: 'Part III',
    partMr: 'भाग ३: मूलभूत हक्क',
    titleMr: 'शोषणाविरुद्धचा हक्क (मानवी व्यापार व बालमजुरी बंदी)',
    titleEn: 'Right against exploitation (Human trafficking & Child labour prohibition)',
    summaryMr: 'कलम २३: माणसांचा अवैध व्यापार, वेठबिगारी व सक्तीच्या श्रमास बंदी. कलम २४: १४ वर्षांखालील बालकांना कारखाने, खाणी किंवा धोकादायक कामावर ठेवण्यास बंदी.',
    summaryEn: 'Article 23 prohibits human trafficking and forced labour; Article 24 prohibits employment of children under 14.',
    category: 'fundamental_rights',
    mpscHighlightsMr: [
      '२०१६ च्या बालकामगार सुधारणा कायद्याने सर्व प्रकारच्या व्यावसायिक कामांत १४ वर्षांखालील बालकांच्या रोजगारावर पूर्ण बंदी घातली.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '२५',
    articleNumberInt: 25,
    partRoman: 'Part III',
    partMr: 'भाग ३: मूलभूत हक्क',
    titleMr: 'सद्सद्विवेकबुद्धीचे स्वातंत्र्य व धर्माचे आचरण, प्रसार करण्याचे स्वातंत्र्य',
    titleEn: 'Freedom of conscience and free profession, practice and propagation of religion',
    summaryMr: 'सर्व व्यक्तींना सद्सद्विवेकबुद्धीचे स्वातंत्र्य आणि आपल्या आवडीच्या धर्माचे पालन, आचरण व प्रसार करण्याचा समान अधिकार आहे.',
    summaryEn: 'Freedom of conscience and the right freely to profess, practise and propagate religion.',
    category: 'fundamental_rights',
    mpscHighlightsMr: [
      'धर्माचा प्रसार करण्याच्या अधिकारात जबरदस्तीने धर्मांतर करण्याचा हक्क समाविष्ट नाही.',
      'शीख व्यक्तींना कृपाण धारण करण्याचा व बाळगण्याचा हक्क धर्मपालनाचा भाग मानला जातो.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '३२',
    articleNumberInt: 32,
    partRoman: 'Part III',
    partMr: 'भाग ३: मूलभूत हक्क',
    titleMr: 'घटनात्मक उपाययोजनेचा हक्क (Right to Constitutional Remedies - ५ रिट्स)',
    titleEn: 'Right to Constitutional Remedies (5 Prerogative Writs)',
    summaryMr: 'मूलभूत हक्कांच्या संरक्षणासाठी थेट सर्वोच्च न्यायालयात दाद मागण्याचा अधिकार. सर्वोच्च न्यायालय ५ प्रकारचे प्राधिलेख (Writs) काढू शकते: १) बंदीप्रत्यक्षीकरण (Habeas Corpus), २) परमादेश (Mandamus), ३) प्रतिषेध (Prohibition), ४) उत्प्रेषण (Certiorari), ५) अधिकारपृच्छा (Quo-Warranto).',
    summaryEn: 'Remedies for enforcement of fundamental rights including 5 writs issued by the Supreme Court.',
    category: 'fundamental_rights',
    mpscHighlightsMr: [
      'डॉ. बाबासाहेब आंबेडकर यांनी कलम ३२ ला "संविधानाचा आत्मा व हृदय" (Heart and Soul of the Constitution) म्हटले आहे.',
      'सर्वोच्च न्यायालयाला कलम ३२ अन्वये तर उच्च न्यायालयाला कलम २२६ अन्वये रिट्स काढण्याचा अधिकार आहे (उच्च न्यायालयाचा रिट अधिकार सर्वोच्च न्यायालयापेक्षा व्यापक आहे कारण तो कायदेशीर हक्कांसाठीही वापरता येतो).'
    ],
    isHighYield: true
  },
  {
    articleNumber: '४०',
    articleNumberInt: 40,
    partRoman: 'Part IV',
    partMr: 'भाग ४: मार्गदर्शक तत्त्वे (DPSP)',
    titleMr: 'ग्रामपंचायतींचे संघटन (Organisation of village panchayats)',
    titleEn: 'Organisation of village panchayats',
    summaryMr: 'राज्य ग्रामपंचायतींची स्थापना करण्यासाठी आवश्यक पावले उचलेल आणि त्यांना स्वशासनाचे युनिट म्हणून कार्य करण्यासाठी अधिकार देईल.',
    summaryEn: 'The State shall take steps to organise village panchayats and endow them with necessary powers.',
    category: 'dpsp',
    mpscHighlightsMr: [
      'हे गांधीवादी तत्त्वज्ञानावर (Gandhian Principle) आधारित मार्गदर्शक तत्त्व आहे.',
      'याच कलमाच्या पूर्ततेसाठी ७३ वी घटनादुरुस्ती कायदा १९९२ करण्यात आला.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '४४',
    articleNumberInt: 44,
    partRoman: 'Part IV',
    partMr: 'भाग ४: मार्गदर्शक तत्त्वे (DPSP)',
    titleMr: 'समान नागरी कायदा (Uniform Civil Code - UCC)',
    titleEn: 'Uniform Civil Code for the citizens',
    summaryMr: 'राज्य भारताच्या संपूर्ण राज्यक्षेत्रात नागरिकांसाठी समान नागरी कायदा सुरक्षित करण्याचा प्रयत्न करेल (विवाह, घटस्फोट, दत्तक, वारसा या बाबतीत सर्व धर्मियांना समान कायदा).',
    summaryEn: 'The State shall endeavour to secure for the citizens a Uniform Civil Code throughout the territory of India.',
    category: 'dpsp',
    mpscHighlightsMr: [
      'गोवा हे पोर्तुगीज काळापासून समान नागरी कायदा असलेले भारतातील पहिले राज्य आहे.',
      'उत्तराखंड हे स्वातंत्र्योत्तर भारतात स्वतंत्रपणे UCC विधेयक संमत करणारे पहिले राज्य बनले (२०२४).'
    ],
    isHighYield: true
  },
  {
    articleNumber: '४५ व ४८A',
    articleNumberInt: 45,
    partRoman: 'Part IV',
    partMr: 'भाग ४: मार्गदर्शक तत्त्वे (DPSP)',
    titleMr: 'बालसंगोपन (कलम ४५) व पर्यावरण-वने संरक्षण (कलम ४८A)',
    titleEn: 'Early childhood care (Art 45) & Protection of environment, forests, wildlife (Art 48A)',
    summaryMr: 'कलम ४५: ६ वर्षांखालील बालकांची काळजी व पूर्वप्राथमिक शिक्षण. कलम ४८A: पर्यावरणाचे रक्षण, वने व वन्यजीवांचे संवर्धन (४२ वी घटनादुरुस्ती १९७६).',
    summaryEn: 'State shall endeavour to provide early childhood care and protect environment & wildlife.',
    category: 'dpsp',
    mpscHighlightsMr: [
      '८६ व्या घटनादुरुस्तीनंतर कलम ४५ चा विषय बदलून ‘६ वर्षांखालील बालके’ करण्यात आला (६ ते १४ वर्षे कलम २१A मध्ये गेले).',
      'कलम ४८A हे ४२ व्या घटनादुरुस्तीने १९७६ मध्ये जोडण्यात आले.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '५१',
    articleNumberInt: 51,
    partRoman: 'Part IV',
    partMr: 'भाग ४: मार्गदर्शक तत्त्वे (DPSP)',
    titleMr: 'आंतरराष्ट्रीय शांतता व सुरक्षिततेचे संवर्धन (भारताचे परराष्ट्र धोरण)',
    titleEn: 'Promotion of international peace and security',
    summaryMr: 'राज्य आंतरराष्ट्रीय शांतता, राष्ट्रांमध्ये न्याय्य व सन्माननीय संबंध आणि आंतरराष्ट्रीय कायद्याचा आदर वाढवण्याचा प्रयत्न करेल.',
    summaryEn: 'Directs the state to promote international peace, security, and respect for treaty obligations.',
    category: 'dpsp',
    mpscHighlightsMr: [
      'हे कलम भारताच्या परराष्ट्र धोरणाचा (Foreign Policy) घटनात्मक पाया मानले जाते.'
    ],
    isHighYield: false
  },
  {
    articleNumber: '५१A',
    articleNumberInt: 51.1,
    partRoman: 'Part IV-A',
    partMr: 'भाग ४-अ: मूलभूत कर्तव्ये',
    titleMr: 'मूलभूत कर्तव्ये (Fundamental Duties - ११ कर्तव्ये)',
    titleEn: 'Fundamental Duties of citizens of India (11 duties)',
    summaryMr: 'नागरिकांची ११ कर्तव्ये: संविधानाचा आदर, राष्ट्रगीत-ध्वजाचा सन्मान, स्वातंत्र्यलढ्यातील आदर्शांचे जतन, सार्वभौमत्व-एकता-अखंडता राखणे, देशसेवा, बंधुभाव व महिलांचा आदर, संमिश्र संस्कृतीचे रक्षण, पर्यावरण संवर्धन, वैज्ञानिक दृष्टिकोन, सार्वजनिक मालमत्तेचे रक्षण, ६-१४ वर्षांच्या पाल्यांना शिक्षणाची संधी.',
    summaryEn: 'Specifies 11 civic and moral duties of Indian citizens.',
    category: 'fundamental_duties',
    mpscHighlightsMr: [
      'स्वर्णसिंग समितीच्या शिफारशीनुसार ४२ व्या घटनादुरुस्तीने १९७६ मध्ये १० मूलभूत कर्तव्ये जोडली गेली (सोव्हिएत युनियन/USSR कडून प्रेरणा).',
      '११ वे मूलभूत कर्तव्य (६ ते १४ वर्षांच्या बालकांना शिक्षणाची संधी पालकांनी देणे) ८६ व्या घटनादुरुस्तीने २००२ मध्ये जोडले गेले.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '५२-६२',
    articleNumberInt: 52,
    partRoman: 'Part V',
    partMr: 'भाग ५: संघराज्य शासन',
    titleMr: 'भारताचे राष्ट्रपती (निवडणूक, कार्यकाळ, महाभियोग)',
    titleEn: 'President of India, election, term, and impeachment',
    summaryMr: 'कलम ५२: भारताचा एक राष्ट्रपती असेल. कलम ५४: निर्वाचक मंडळ (संसदेचे व विधानसभांचे निवडून आलेले सदस्य). कलम ६१: संविधानाचा भंग केल्याबद्दल महाभियोग (Impeachment).',
    summaryEn: 'Articles governing the President of India: executive head, election electoral college, and impeachment procedure.',
    category: 'union_executive',
    mpscHighlightsMr: [
      'विधानपरिषद सदस्य आणि संसदेचे नामनिर्देशित सदस्य राष्ट्रपती निवडणुकीत मतदान करू शकत नाहीत.',
      'कलम ६१ महाभियोगात मात्र संसदेचे नामनिर्देशित सदस्य मतदान करू शकतात, पण विधानसभा सदस्य करू शकत नाहीत.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '७२',
    articleNumberInt: 72,
    partRoman: 'Part V',
    partMr: 'भाग ५: संघराज्य शासन',
    titleMr: 'राष्ट्रपतींचा दयेचा / क्षमादानाचा अधिकार (Pardoning Power)',
    titleEn: 'Power of President to grant pardons, reprieves, respites or remissions',
    summaryMr: 'राष्ट्रपतींना कोर्ट मार्शल, केंद्र सरकारच्या कायद्याविरोधातील गुन्हे आणि फाशीची शिक्षा (Death Sentence) या सर्व प्रकरणात शिक्षेत सूट, रूपांतर किंवा पूर्ण क्षमा (Pardon) करण्याचा अधिकार आहे.',
    summaryEn: 'Presidential power to pardon, commute, remit or suspend sentences including death penalties.',
    category: 'union_executive',
    mpscHighlightsMr: [
      'राज्यपाल फाशीची शिक्षा पूर्णपणे माफ (Pardon) करू शकत नाहीत, फक्त राष्ट्रपतीच फाशी माफ करू शकतात.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '७६',
    articleNumberInt: 76,
    partRoman: 'Part V',
    partMr: 'भाग ५: संघराज्य शासन',
    titleMr: 'भारताचा महान्यायवादी (Attorney General for India)',
    titleEn: 'Attorney-General for India',
    summaryMr: 'सर्वोच्च न्यायालयाचा न्यायाधीश होण्यास पात्र असलेल्या व्यक्तीची राष्ट्रपती महान्यायवादी म्हणून नेमणूक करतात. ते भारत सरकारचे सर्वोच्च कायदेविषयक सल्लागार असतात.',
    summaryEn: 'Highest law officer of the Government of India appointed by the President.',
    category: 'union_executive',
    mpscHighlightsMr: [
      'कलम ८८ नुसार महान्यायवादींना संसदेच्या कोणत्याही सभागृहात बोलण्याचा व कामकाजात भाग घेण्याचा अधिकार आहे, परंतु मतदानाचा अधिकार नाही.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '११०',
    articleNumberInt: 110,
    partRoman: 'Part V',
    partMr: 'भाग ५: संसद',
    titleMr: 'धनविधेयकाची व्याख्या (Definition of "Money Bill")',
    titleEn: 'Definition of Money Bills',
    summaryMr: 'कर आकारणी, सरकारचे कर्ज, संचित निधीतून खर्च किंवा जमा यांसंबंधीचे विधेयक म्हणजे धनविधेयक. कोणतेही विधेयक धनविधेयक आहे की नाही हे ठरवण्याचा लोकसभा अध्यक्षांचा निर्णय अंतिम असतो.',
    summaryEn: 'Specifies criteria for Money Bills; Speaker of Lok Sabha has final authority to certify a Money Bill.',
    category: 'parliament',
    mpscHighlightsMr: [
      'धनविधेयक केवळ लोकसभेतच मांडता येते (राष्ट्रपतींच्या पूर्वसंमतीने).',
      'राज्यसभेला धनविधेयकात बदल करण्याचा किंवा फेटाळण्याचा अधिकार नसतो; राज्यसभा ते फक्त १४ दिवस रोखून ठेवू शकते.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '१२३',
    articleNumberInt: 123,
    partRoman: 'Part V',
    partMr: 'भाग ५: संघराज्य शासन',
    titleMr: 'राष्ट्रपतींचा वटहुकूम काढण्याचा अधिकार (Ordinance making power)',
    titleEn: 'Power of President to promulgate Ordinances during recess of Parliament',
    summaryMr: 'संसदेच्या दोन्ही किंवा एका सभागृहाचे अधिवेशन चालू नसताना आणि तात्काळ कारवाईची गरज असल्यास राष्ट्रपती वटहुकूम काढू शकतात. याचे मूल्य कायद्याइतकेच असते.',
    summaryEn: 'Empowers President to issue ordinances when Parliament is not in session.',
    category: 'union_executive',
    mpscHighlightsMr: [
      'वटहुकूम संसद सुरू झाल्यापासून ६ आठवड्यांच्या आत दोन्ही सभागृहांनी मंजूर करणे आवश्यक असते; अन्यथा तो रद्द होतो.',
      'वटहुकूमाचे जास्तीत जास्त आयुष्य = ६ महिने + ६ आठवडे (७.५ महिने).'
    ],
    isHighYield: true
  },
  {
    articleNumber: '१२४-१४७',
    articleNumberInt: 124,
    partRoman: 'Part V',
    partMr: 'भाग ५: सर्वोच्च न्यायालय',
    titleMr: 'भारताचे सर्वोच्च न्यायालय (Supreme Court of India)',
    titleEn: 'Establishment and jurisdiction of the Supreme Court',
    summaryMr: 'कलम १२४: सर्वोच्च न्यायालयाची स्थापना. कलम १२९: अभिलेख न्यायालय (Court of Record). कलम १३१: मूळ अधिकारक्षेत्र. कलम १३७: पुनर्विलोकन अधिकार. कलम १४३: राष्ट्रपतींचा सर्वोच्च न्यायालयाकडून सल्ला घेण्याचा अधिकार.',
    summaryEn: 'Covers establishment, independence, original, appellate, and advisory jurisdictions of the Supreme Court.',
    category: 'judiciary',
    mpscHighlightsMr: [
      'सर्वोच्च न्यायालयाच्या न्यायाधीशांचे निवृत्ती वय ६५ वर्षे आहे.',
      'कलम १४३ अन्वये राष्ट्रपतींनी विचारलेला सल्ला राष्ट्रपतींवर बंधनकारक नसतो.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '१४८-१५१',
    articleNumberInt: 148,
    partRoman: 'Part V',
    partMr: 'भाग ५: नियंत्रक व महालेखापरीक्षक (CAG)',
    titleMr: 'भारताचे नियंत्रक आणि महालेखापरीक्षक (Comptroller and Auditor General)',
    titleEn: 'Comptroller and Auditor-General of India',
    summaryMr: 'सार्वजनिक पैशाचा पहारेकरी (Guardian of Public Purse). राष्ट्रपतींमार्फत नियुक्ती. केंद्र व राज्य सरकारांच्या सर्व खर्चाचे लेखापरीक्षण (Audit) करतात.',
    summaryEn: 'CAG audits all receipts and expenditure of Government of India and States.',
    category: 'commissions_elections',
    mpscHighlightsMr: [
      'डॉ. आंबेडकरांच्या मते: "कॅग ही संविधानातील सर्वात महत्त्वाची संस्था आहे."',
      'कार्यकाळ: ६ वर्षे किंवा वयाची ६५ वर्षे पूर्ण होईपर्यंत. पद सोडल्यानंतर ते भारत किंवा राज्य सरकारच्या कोणत्याही पदावर काम करू शकत नाहीत.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '१६३-१६४',
    articleNumberInt: 163,
    partRoman: 'Part VI',
    partMr: 'भाग ६: राज्य शासन',
    titleMr: 'मुख्यमंत्री आणि मंत्रिमंडळ (Chief Minister and Council of Ministers)',
    titleEn: 'Council of Ministers to aid and advise Governor; appointment of Chief Minister',
    summaryMr: 'राज्यपाल मुख्यमंत्र्यांची नियुक्ती करतात आणि त्यांच्या सल्ल्याने इतर मंत्र्यांची नेमणूक करतात. मंत्रिमंडळ विधानसभेला एकत्रितपणे जबाबदार असते.',
    summaryEn: 'Provisions for State Council of Ministers headed by the Chief Minister.',
    category: 'state_gov',
    mpscHighlightsMr: [
      '९१ व्या घटनादुरुस्तीनुसार (२००३) राज्याच्या मंत्रिमंडळाची संख्या विधानसभेच्या एकूण सदस्यसंख्येच्या १५% पेक्षा जास्त असणार नाही आणि किमान १२ मंत्र्यांपेक्षा कमी असणार नाही.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '२१३',
    articleNumberInt: 213,
    partRoman: 'Part VI',
    partMr: 'भाग ६: राज्य शासन',
    titleMr: 'राज्यपालांचा वटहुकूम काढण्याचा अधिकार',
    titleEn: 'Power of Governor to promulgate Ordinances during recess of Legislature',
    summaryMr: 'राज्य विधिमंडळाचे अधिवेशन चालू नसताना राज्यपाल वटहुकूम काढू शकतात. विधिमंडळ सुरू झाल्यापासून ६ आठवड्यांच्या आत मंजुरी आवश्यक असते.',
    summaryEn: 'Governor ordinance power similar to President under Article 123.',
    category: 'state_gov',
    mpscHighlightsMr: [
      'कलम १२३ (राष्ट्रपती वटहुकूम) आणि कलम २१३ (राज्यपाल वटहुकूम) यांमधील अंकांची अदलाबदल लक्षात ठेवण्याची सोपी MPSC ट्रिक आहे!'
    ],
    isHighYield: true
  },
  {
    articleNumber: '२८०',
    articleNumberInt: 280,
    partRoman: 'Part XII',
    partMr: 'भाग १२: वित्त व मालमत्ता',
    titleMr: 'केंद्रीय वित्त आयोग (Finance Commission)',
    titleEn: 'Finance Commission of India',
    summaryMr: 'राष्ट्रपती दर ५ वर्षांनी कलम २८० अन्वये वित्त आयोगाची स्थापना करतात. रचना: १ अध्यक्ष + ४ सदस्य. केंद्र आणि राज्यांमध्ये करांच्या वाटपाची शिफारस करणे हे मुख्य कार्य.',
    summaryEn: 'Quasi-judicial body constituted by President every 5 years for tax devolution between Centre and States.',
    category: 'commissions_elections',
    mpscHighlightsMr: [
      '१५ व्या वित्त आयोगाचे अध्यक्ष: एन. के. सिंग (२०२०-२६).',
      '१६ व्या वित्त आयोगाचे अध्यक्ष: डॉ. अरविंद पनगढिया (२०२६-३१ साठी नेमणूक).',
      'वित्त आयोगाच्या शिफारशी केवळ सल्लागार स्वरूपाच्या असतात.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '३००A',
    articleNumberInt: 300.1,
    partRoman: 'Part XII',
    partMr: 'भाग १२: वित्त व मालमत्ता',
    titleMr: 'मालमत्तेचा अधिकार (Right to Property - कायदेशीर हक्क)',
    titleEn: 'Persons not to be deprived of property save by authority of law',
    summaryMr: 'कायद्याच्या अधिकाराखेरीज कोणालाही त्याच्या मालमत्तेपासून वंचित केले जाणार नाही. मालमत्तेचा हक्क हा आता मूलभूत हक्क नसून कायदेशीर/घटनात्मक हक्क आहे.',
    summaryEn: 'Right to property made a legal/constitutional right after removal from fundamental rights.',
    category: 'fundamental_rights',
    mpscHighlightsMr: [
      '४४ व्या घटनादुरुस्ती कायदा १९७८ द्वारे कलम ३१ व १९(१)(f) मधून मालमत्तेचा मूलभूत हक्क काढून कलम ३००A मध्ये कायदेशीर हक्क म्हणून समाविष्ट करण्यात आला.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '३१२',
    articleNumberInt: 312,
    partRoman: 'Part XIV',
    partMr: 'भाग १४: लोकसेवा',
    titleMr: 'अखिल भारतीय सेवांची निर्मिती (All-India Services - IAS, IPS, IFoS)',
    titleEn: 'All-India Services',
    summaryMr: 'राज्यसभेने उपस्थित व मतदान करणाऱ्या सदस्यांच्या २/३ बहुमताने ठराव मंजूर केल्यास संसद नवीन अखिल भारतीय सेवेची निर्मिती करू शकते.',
    summaryEn: 'Rajya Sabha has exclusive special power to create new All-India Services.',
    category: 'commissions_elections',
    mpscHighlightsMr: [
      'सध्या ३ अखिल भारतीय सेवा आहेत: IAS, IPS आणि IFoS (भारतीय वन सेवा - १९६६ मध्ये नव्याने निर्माण केली).',
      'ही राज्यसभेची विशेष स्वायत्त सत्ता आहे.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '३१५-३२३',
    articleNumberInt: 315,
    partRoman: 'Part XIV',
    partMr: 'भाग १४: लोकसेवा आयोग',
    titleMr: 'UPSC आणि MPSC (केंद्रीय व राज्य लोकसेवा आयोग)',
    titleEn: 'Public Service Commissions for the Union and for the States',
    summaryMr: 'कलम ३१५: UPSC व MPSC ची स्थापना. कलम ३१६: सदस्यांची नियुक्ती व कार्यकाळ (UPSC: ६ वर्षे/६५ वर्षे; MPSC: ६ वर्षे/६२ वर्षे). कलम ३१७: सदस्यांना पदावरून दूर करणे (केवळ राष्ट्रपती सर्वोच्च न्यायालयाच्या चौकशीनंतर करू शकतात).',
    summaryEn: 'Articles governing UPSC and State PSCs (MPSC) recruitment, autonomy, and removal.',
    category: 'commissions_elections',
    mpscHighlightsMr: [
      'MPSC च्या सदस्यांची नियुक्ती राज्यपाल करतात, परंतु त्यांना पदावरून केवळ भारताचे राष्ट्रपतीच दूर करू शकतात (राज्यपाल करू शकत नाहीत!).',
      'कलम ३२०: लोकसेवा आयोगांची कार्ये.'
    ],
    isHighYield: true
  },
  {
    articleNumber: '३२४',
    articleNumberInt: 324,
    partRoman: 'Part XV',
    partMr: 'भाग १५: निवडणुका',
    titleMr: 'भारतीय निवडणूक आयोग (Election Commission of India)',
    titleEn: 'Superintendence, direction and control of elections to be vested in an Election Commission',
    summaryMr: 'संसद, राज्य विधिमंडळे, राष्ट्रपती आणि उपराष्ट्रपती यांच्या निवडणुकांचे संचालन, दिशा व नियंत्रण निवडणूक आयोगाकडे असेल.',
    summaryEn: 'Autonomous constitutional authority responsible for administering national and state elections.',
    category: 'commissions_elections',
    mpscHighlightsMr: [
      'मुख्य निवडणूक आयुक्तांना सर्वोच्च न्यायालयाच्या न्यायाधीशाप्रमाणेच महाभियोगासारख्या प्रक्रियेनेच पदावरून दूर करता येते.',
      'स्थानिक स्वराज्य संस्थांच्या (ग्रामपंचायत, नगरपालिका) निवडणुका केंद्रीय आयोग घेत नाही, त्यासाठी राज्यात ‘राज्य निवडणूक आयोग’ (कलम २४३K) असतो!'
    ],
    isHighYield: true
  },
  {
    articleNumber: '३५२',
    articleNumberInt: 352,
    partRoman: 'Part XVIII',
    partMr: 'भाग १८: आणीबाणीविषयक तरतुदी',
    titleMr: 'राष्ट्रीय आणीबाणी (National Emergency)',
    titleEn: 'Proclamation of Emergency (War, external aggression or armed rebellion)',
    summaryMr: 'युद्ध, परकीय आक्रमण किंवा सशस्त्र बंड या कारणांवरून राष्ट्रपती भारताच्या संपूर्ण किंवा काही भागात राष्ट्रीय आणीबाणी जाहीर करू शकतात. मंत्रिमंडळाच्या लेखी शिफारशीशिवाय ही घोषणा करता येत नाही.',
    summaryEn: 'National Emergency proclamation on grounds of war, external aggression or armed rebellion.',
    category: 'emergency',
    mpscHighlightsMr: [
      '४४ व्या घटनादुरुस्तीने (१९७८) ‘अंतर्गत अशांतता’ हा शब्द काढून त्याऐवजी ‘सशस्त्र बंड’ (Armed rebellion) हा शब्द टाकला.',
      'आणीबाणी एका महिन्याच्या आत संसदेच्या दोन्ही सभागृहांनी विशेष बहुमताने (Special Majority) मंजूर करावी लागते.',
      'भारतात आतापर्यंत ३ वेळा राष्ट्रीय आणीबाणी लागू झाली: १९६२ (चीन युद्ध), १९७१ (पाक युद्ध), १९७५ (अंतर्गत अशांतता).'
    ],
    isHighYield: true
  },
  {
    articleNumber: '३५६',
    articleNumberInt: 356,
    partRoman: 'Part XVIII',
    partMr: 'भाग १८: आणीबाणीविषयक तरतुदी',
    titleMr: 'घटकराज्यात राष्ट्रपती राजवट (President\'s Rule / State Emergency)',
    titleEn: 'Provisions in case of failure of constitutional machinery in States',
    summaryMr: 'घटकराज्यातील शासन संविधानानुसार चालवणे अशक्य झाले आहे अशी खात्री पटल्यास राज्यपाल अहवालावरून राष्ट्रपती संबंधित राज्यात राष्ट्रपती राजवट लागू करू शकतात.',
    summaryEn: 'Imposition of President\'s Rule on failure of constitutional machinery in a State.',
    category: 'emergency',
    mpscHighlightsMr: [
      'संसदेच्या दोन्ही सभागृहांनी २ महिन्यांच्या आत साध्या बहुमताने मंजुरी देणे आवश्यक असते.',
      'एस. आर. बोम्मई खटल्यात (1994) सुप्रीम कोर्टाने स्पष्ट केले की कलम ३५६ ची घोषणा न्यायालयीन पुनर्विलोकनास (Judicial Review) पात्र आहे.',
      'महाराष्ट्रात आतापर्यंत ३ वेळा राष्ट्रपती राजवट लागू झाली आहे (१९८०, २०१४, २०१९).'
    ],
    isHighYield: true,
    landmarkJudgmentsMr: ['एस. आर. बोम्मई खटला (१९९४)']
  },
  {
    articleNumber: '३६०',
    articleNumberInt: 360,
    partRoman: 'Part XVIII',
    partMr: 'भाग १८: आणीबाणीविषयक तरतुदी',
    titleMr: 'आर्थिक आणीबाणी (Financial Emergency)',
    titleEn: 'Provisions as to financial emergency',
    summaryMr: 'भारताची किंवा तिच्या कोणत्याही भागाची आर्थिक पत अथवा स्थैर्य धोक्यात आल्यास राष्ट्रपती आर्थिक आणीबाणी घोषित करू शकतात.',
    summaryEn: 'Proclamation of financial emergency if financial stability or credit of India is threatened.',
    category: 'emergency',
    mpscHighlightsMr: [
      'भारतात आजपर्यंत एकदाही आर्थिक आणीबाणी लागू करण्यात आलेली नाही!'
    ],
    isHighYield: true
  },
  {
    articleNumber: '३६८',
    articleNumberInt: 368,
    partRoman: 'Part XX',
    partMr: 'भाग २०: संविधानाची दुरुस्ती',
    titleMr: 'संविधान दुरुस्तीचा संसदेचा अधिकार आणि कार्यपद्धती',
    titleEn: 'Power of Parliament to amend the Constitution and procedure therefor',
    summaryMr: 'संसदेला संविधानात भर घालण्याचा, बदल करण्याचा किंवा रद्द करण्याचा अधिकार आहे. दुरुस्तीचे प्रकार: १) संसदेचे विशेष बहुमत (२/३), २) विशेष बहुमत + निम्म्या राज्यांच्या विधानसभांची साधी मान्यता.',
    summaryEn: 'Procedures and powers of Parliament to amend the Constitution.',
    category: 'amendments',
    mpscHighlightsMr: [
      'घटनादुरुस्ती विधेयकावर संसदेची संयुक्त बैठक (Joint Sitting - कलम १०८) बोलावता येत नाही.',
      'घटनादुरुस्ती विधेयकावर राष्ट्रपतींना मंजुरी देणे बंधनकारक आहे (२४ वी घटनादुरुस्ती १९७१).',
      'केशवानंद भारती खटल्यानुसार (१९७३) संसदेला संविधानाचा कोणताही भाग दुरुस्त करता येतो, परंतु घटनेच्या ‘मूलभूत संरचनेला’ (Basic Structure) हात लावता येत नाही.'
    ],
    isHighYield: true,
    landmarkJudgmentsMr: ['केशवानंद भारती (१९७३)']
  }
];

// ----------------------------------------------------------------------------
// 2. 12 SCHEDULES OF THE CONSTITUTION (१२ अनुसूच्या)
// ----------------------------------------------------------------------------
export const CONSTITUTION_SCHEDULES: ConstitutionalSchedule[] = [
  {
    scheduleNumber: 1,
    titleMr: 'पहिली अनुसूची: संघराज्य व राज्यक्षेत्र',
    titleEn: 'First Schedule: States and Union Territories',
    keyProvisionsMr: 'भारतातील सर्व २८ राज्ये आणि ८ केंद्रशासित प्रदेशांची नावे व त्यांच्या प्रादेशिक सीमांची व्याप्ती.',
    keyProvisionsEn: 'Names of States and Union Territories with their territorial extent.',
    articlesCovered: 'कलम १ आणि ४',
    mnemonicNoteMr: 'T - Territory (TEARS OF OLD PM मधील पहिले T)',
    mpscTipsMr: 'नवीन राज्य निर्माण केल्यास किंवा सीमा बदलल्यास १ ली आणि ४ थी अनुसूची आपोआप दुरुस्त होते.'
  },
  {
    scheduleNumber: 2,
    titleMr: 'दुसरी अनुसूची: भत्ते, वेतन व विशेषाधिकार',
    titleEn: 'Second Schedule: Salaries, Allowances and Emoluments',
    keyProvisionsMr: 'राष्ट्रपती, राज्यपाल, लोकसभा अध्यक्ष-उपाध्यक्ष, राज्यसभा सभापती, सर्वोच्च व उच्च न्यायालयांचे न्यायाधीश आणि CAG यांचे वेतन व भत्ते.',
    keyProvisionsEn: 'Provisions relating to the emoluments, allowances & privileges of constitutional dignitaries.',
    articlesCovered: 'कलम ५९, ६५, ७५, ९७, १२५, १४८, १५८, १६४, १८६, २२१',
    mnemonicNoteMr: 'E - Emoluments (पगार व भत्ते)',
    mpscTipsMr: 'पंतप्रधान आणि मुख्यमंत्र्यांच्या वेतनाचा स्वतंत्र उल्लेख यात नसतो; ते संसद/विधिमंडळ सदस्य म्हणून घेतात.'
  },
  {
    scheduleNumber: 3,
    titleMr: 'तिसरी अनुसूची: शपथा व प्रतिज्ञांचे नमुने',
    titleEn: 'Third Schedule: Forms of Oaths or Affirmations',
    keyProvisionsMr: 'केंद्रीय मंत्री, खासदार, सर्वोच्च न्यायालयाचे न्यायाधीश, CAG, राज्य मंत्री, आमदार व उच्च न्यायालयाचे न्यायाधीश यांच्या पद व गोपनीयतेच्या शपथेचे नमुने.',
    keyProvisionsEn: 'Forms of Oaths or Affirmations for constitutional authorities and election candidates.',
    articlesCovered: 'कलम ७५, ८४, ९९, १२४, १४८, १७३, १८८, २१९',
    mnemonicNoteMr: 'A - Affirmations & Oaths (शपथा)',
    mpscTipsMr: 'अपवाद: राष्ट्रपतींची शपथ कलम ६० मध्ये, उपराष्ट्रपतींची शपथ कलम ६९ मध्ये आणि राज्यपालांची शपथ कलम १५९ मध्ये आहे (या तिघांच्या शपथा ३ ऱ्या अनुसूचीत नाहीत!).'
  },
  {
    scheduleNumber: 4,
    titleMr: 'चौथी अनुसूची: राज्यसभेतील जागांचे वाटप',
    titleEn: 'Fourth Schedule: Allocation of seats in the Council of States (Rajya Sabha)',
    keyProvisionsMr: 'राज्यांच्या लोकसंख्येच्या आधारावर प्रत्येक घटकराज्य व केंद्रशासित प्रदेशाला राज्यसभेत मिळणाऱ्या जागांचे वाटप.',
    keyProvisionsEn: 'Allocation of seats in the Rajya Sabha to the States and Union Territories.',
    articlesCovered: 'कलम ४ आणि ८०',
    mnemonicNoteMr: 'R - Rajya Sabha seat allocation',
    mpscTipsMr: 'महाराष्ट्राला राज्यसभेत १९ जागा वाटप झालेल्या आहेत (सर्वाधिक उत्तर प्रदेश: ३१ जागा).'
  },
  {
    scheduleNumber: 5,
    titleMr: 'पाचवी अनुसूची: अनुसूचित क्षेत्रे व जमातींचे प्रशासन',
    titleEn: 'Fifth Schedule: Administration and control of Scheduled Areas and Scheduled Tribes',
    keyProvisionsMr: 'आसाम, मेघालय, त्रिपुरा आणि मिझोराम व्यतिरिक्त इतर कोणत्याही राज्यातील अनुसूचित क्षेत्रे आणि जमातींचे प्रशासन व नियंत्रण (जनजाती सल्लागार परिषद TAC).',
    keyProvisionsEn: 'Administration of Scheduled Areas and Scheduled Tribes (except in 4 North-East States).',
    articlesCovered: 'कलम २४४(१)',
    mnemonicNoteMr: 'S - Scheduled Areas',
    mpscTipsMr: 'महाराष्ट्रातील पेसा (PESA Act 1996) क्षेत्रे याच ५ व्या अनुसूची अंतर्गत येतात.'
  },
  {
    scheduleNumber: 6,
    titleMr: 'सहावी अनुसूची: ईशान्येकडील ४ आदिवासी राज्यांचे प्रशासन',
    titleEn: 'Sixth Schedule: Tribal areas in Assam, Meghalaya, Tripura, and Mizoram (AMTM)',
    keyProvisionsMr: 'आसाम, मेघालय, त्रिपुरा आणि मिझोराम या चार ईशान्य राज्यांमधील आदिवासी क्षेत्रांच्या प्रशासनासाठी स्वायत्त जिल्हा परिषदांची (ADC) तरतूद.',
    keyProvisionsEn: 'Administration of tribal areas in the four States of Assam, Meghalaya, Tripura and Mizoram.',
    articlesCovered: 'कलम २४४(२) आणि २७५(१)',
    mnemonicNoteMr: 'O - Other Tribal Areas (शॉर्टकट: AMTM - आसाम, मेघालय, त्रिपुरा, मिझोराम)',
    mpscTipsMr: 'यात मणीपूर आणि नागालँडचा समावेश नाही, हा MPSC चा अत्यंत आवडता ट्रॅप प्रश्न आहे!'
  },
  {
    scheduleNumber: 7,
    titleMr: 'सातवी अनुसूची: केंद्र-राज्य अधिकार वाटप (तीन सूची)',
    titleEn: 'Seventh Schedule: Division of Powers (Union, State, Concurrent Lists)',
    keyProvisionsMr: '१) केंद्र सूची (Union List - १०० विषय): संरक्षण, परराष्ट्र, रेल्वे, अणुऊर्जा, बँकिंग.\n२) राज्य सूची (State List - ६१ विषय): पोलीस, सार्वजनिक आरोग्य, शेती, तुरुंग.\n३) समवर्ती सूची (Concurrent List - ५२ विषय): शिक्षण, वने, वीज, विवाह, फौजदारी कायदा.',
    keyProvisionsEn: 'Division of powers between Union and States: Union List (100), State List (61), Concurrent List (52).',
    articlesCovered: 'कलम २४६',
    mnemonicNoteMr: 'F - Federal Lists (संघराज्यीय सूची)',
    mpscTipsMr: 'शेष अधिकार (Residuary Powers) कलम २४८ अन्वये केंद्र सरकारकडे आहेत. ४२ व्या घटनादुरुस्तीने ५ विषय राज्य सूचीतून समवर्ती सूचीत हलवले.'
  },
  {
    scheduleNumber: 8,
    titleMr: 'आठवी अनुसूची: २२ मान्यताप्राप्त अधिकृत राजभाषा',
    titleEn: 'Eighth Schedule: 22 Officially Recognized Languages',
    keyProvisionsMr: 'मूळ संविधानात १४ भाषा होत्या. दुरुस्त्यांनी ८ भाषा जोडल्या जाऊन आता २२ भाषा आहेत:\n- २१ वी दुरुस्ती (१९६७): सिंधी\n- ७१ वी दुरुस्ती (१९९२): कोकणी, मणीपुरी, नेपाळी (शॉर्टकट: नमक)\n- ९२ वी दुरुस्ती (२००३): बोडो, डोगरी, मैथिली, संथाली (शॉर्टकट: Bodo-Dogri-Maithili-Santhali / BDMS).',
    keyProvisionsEn: 'List of 22 languages recognized by the Constitution.',
    articlesCovered: 'कलम ३४४(१) आणि ३५१',
    mnemonicNoteMr: 'O - Official Languages (भाषा)',
    mpscTipsMr: 'इंग्रजी आणि राजस्थानी या भाषा ८ व्या अनुसूचीत समाविष्ट नाहीत! मराठीला अभिजात भाषेचा (Classical Language) दर्जा ऑक्टोबर २०२४ मध्ये केंद्र शासनाने दिला.'
  },
  {
    scheduleNumber: 9,
    titleMr: 'नववी अनुसूची: काही कायदे व विनिमय विधिग्राह्य करणे',
    titleEn: 'Ninth Schedule: Validation of certain Acts and Regulations (Land Reforms)',
    keyProvisionsMr: 'जमीन सुधारणा व जमीनदारी नष्ट करण्यासाठी १ ली घटनादुरुस्ती १९५१ द्वारे जोडली गेली. सुरुवातीला यात टाकलेल्या कायद्यांना न्यायालयात आव्हान देता येत नव्हते.',
    keyProvisionsEn: 'Added by 1st Amendment 1951 to protect land reform laws from judicial review.',
    articlesCovered: 'कलम ३१B',
    mnemonicNoteMr: 'L - Land Reforms',
    mpscTipsMr: 'आय. आर. कोएल्हो खटल्यात (2007) सुप्रीम कोर्टाने स्पष्ट केले की २४ एप्रिल १९७३ नंतर ९ व्या अनुसूचीत समाविष्ट केलेले कायदेही न्यायालयीन पुनर्विलोकनास पात्र आहेत.'
  },
  {
    scheduleNumber: 10,
    titleMr: 'दहावी अनुसूची: पक्षांतरबंदी कायदा (Anti-Defection Law)',
    titleEn: 'Tenth Schedule: Disqualification on ground of defection',
    keyProvisionsMr: '५२ वी घटनादुरुस्ती कायदा १९८५ द्वारे समाविष्ट. आमदार/खासदारांनी पक्षाचा आदेश (व्हिप) मोडल्यास किंवा पक्षांतर केल्यास अपात्रतेची तरतूद. अपात्रतेचा निर्णय सभागृहाचे अध्यक्ष घेतात.',
    keyProvisionsEn: 'Added by 52nd Amendment 1985 to curb political defections.',
    articlesCovered: 'कलम १०२(२) आणि १९१(२)',
    mnemonicNoteMr: 'D - Defection (पक्षांतर बंदी)',
    mpscTipsMr: '९१ व्या घटनादुरुस्तीने (२००३) १/३ सदस्यांच्या फुटीची तरतूद रद्द केली; आता किमान २/३ सदस्यांचे विलीनीकरण आवश्यक असते.'
  },
  {
    scheduleNumber: 11,
    titleMr: 'अकरावी अनुसूची: पंचायतींचे अधिकार व २९ विषय',
    titleEn: 'Eleventh Schedule: Powers, authority and responsibilities of Panchayats (29 subjects)',
    keyProvisionsMr: '७३ वी घटनादुरुस्ती कायदा १९९२ द्वारे जोडली गेली. ग्रामीण स्थानिक स्वराज्य संस्थांसाठी शेती, जलसंधारण, दारिद्र्य निर्मूलन, शिक्षण, रस्ते अशा २९ विषयांची यादी.',
    keyProvisionsEn: 'Added by 73rd Amendment 1992 specifying 29 functional items for Panchayats.',
    articlesCovered: 'कलम २४३G',
    mnemonicNoteMr: 'P - Panchayats',
    mpscTipsMr: 'पंचायतींना किती विषय सोपवले आहेत? -> २९ विषय.'
  },
  {
    scheduleNumber: 12,
    titleMr: 'बारावी अनुसूची: नगरपालिकांचे अधिकार व १८ विषय',
    titleEn: 'Twelfth Schedule: Powers, authority and responsibilities of Municipalities (18 subjects)',
    keyProvisionsMr: '७४ वी घटनादुरुस्ती कायदा १९९२ द्वारे जोडली गेली. नागरी स्थानिक स्वराज्य संस्थांसाठी नगररचना, अग्निशामक, पाणीपुरवठा, झोपडपट्टी सुधारणा अशा १८ विषयांची यादी.',
    keyProvisionsEn: 'Added by 74th Amendment 1992 specifying 18 functional items for Municipalities.',
    articlesCovered: 'कलम २४३W',
    mnemonicNoteMr: 'M - Municipalities (नगरपालिका)',
    mpscTipsMr: 'नगरपालिकांसाठी १८ विषय, तर पंचायतींसाठी २९ विषय आहेत (२९ आणि १८ ची आकडेवारी हमखास विचारली जाते).'
  }
];

// ----------------------------------------------------------------------------
// 3. LANDMARK CONSTITUTIONAL AMENDMENTS (प्रमुख घटनादुरुस्त्या १ ते १०६)
// ----------------------------------------------------------------------------
export const CONSTITUTIONAL_AMENDMENTS: ConstitutionalAmendment[] = [
  {
    amendmentNumber: 1,
    year: 1951,
    titleMr: 'पहिली घटनादुरुस्ती (१९५१)',
    titleEn: '1st Constitutional Amendment Act, 1951',
    summaryMr: '९ वी अनुसूची जोडण्यात आली; भाषण स्वातंत्र्यावर वाजवी निर्बंध घालण्यात आले; मागासवर्गांसाठी शिक्षणात विशेष तरतुदीचे अधिकार राज्यांना मिळाले (कलम १५(४)).',
    summaryEn: 'Added 9th Schedule, placed reasonable restrictions on freedom of speech, added Article 15(4).',
    keyProvisionsMr: [
      '९ वी अनुसूची जोडून जमीन सुधारणा कायद्यांना न्यायालयीन आव्हानापासून संरक्षण.',
      'भाषण व अभिव्यक्ती स्वातंत्र्यावर ‘सार्वजनिक सुव्यवस्था, परदेशी राज्यांशी मैत्री व अपराधास चिथावणी’ या कारणांवरून वाजवी निर्बंध.'
    ],
    mpscImportance: 'MPSC परीक्षेत पहिली घटनादुरुस्ती आणि ९ वी अनुसूची यावर वारंवार प्रश्न विचारला जातो.',
    isSuperHighYield: true
  },
  {
    amendmentNumber: 7,
    year: 1956,
    titleMr: 'सातवी घटनादुरुस्ती (१९५६)',
    titleEn: '7th Constitutional Amendment Act, 1956',
    summaryMr: 'भाषावार प्रांतरचना लागू करण्यात आली; राज्यांचे अ, ब, क, ड वर्ग रद्द करून १४ राज्ये व ६ केंद्रशासित प्रदेश निर्माण करण्यात आले.',
    summaryEn: 'Implemented State Reorganization Commission recommendations; formed 14 states and 6 UTs.',
    keyProvisionsMr: [
      'घटनेतील Part A, B, C, D वर्गीकरण रद्द.',
      'एकाच व्यक्तीची दोन किंवा अधिक राज्यांसाठी राज्यपाल म्हणून नियुक्ती करण्याची तरतूद.',
      'दोन किंवा अधिक राज्यांसाठी एकच समाईक उच्च न्यायालय स्थापण्याची तरतूद.'
    ],
    mpscImportance: 'राज्यांची पुनर्रचना आणि समाईक राज्यपाल/उच्च न्यायालय तरतुदीमुळे अत्यंत महत्त्वाचे.',
    isSuperHighYield: true
  },
  {
    amendmentNumber: 42,
    year: 1976,
    titleMr: 'बेचाळिसावी घटनादुरुस्ती (१९७६) - "मिनी कॉन्स्टिट्यूशन"',
    titleEn: '42nd Constitutional Amendment Act, 1976 ("Mini Constitution")',
    summaryMr: 'भारतीय संविधानातील सर्वात मोठी व सर्वंकष दुरुस्ती. प्रस्तावनेत ‘समाजवादी, धर्मनिरपेक्ष व एकात्मता’ शब्द जोडले; मूलभूत कर्तव्ये (भाग ४-अ) समाविष्ट केली; ५ विषय समवर्ती सूचीत हलवले.',
    summaryEn: 'The most comprehensive amendment enacted during Emergency; added Socialist, Secular, Integrity to Preamble and Part IV-A Duties.',
    keyProvisionsMr: [
      'प्रस्तावनेत बदल: "समाजवादी, धर्मनिरपेक्ष आणि एकात्मता" (Socialist, Secular, Integrity) हे तीन शब्द जोडले (प्रस्तावनेत आजपर्यंत झालेली एकमेव दुरुस्ती!).',
      'भाग ४-अ जोडून कलम ५१A अन्वये १० मूलभूत कर्तव्ये समाविष्ट केली.',
      'राज्य सूचीतील ५ विषय समवर्ती सूचीत: १) शिक्षण, २) वने, ३) वन्यजीव व पक्षी संरक्षण, ४) वजने व मापे, ५) दुय्यम न्यायालयांचे संघटन.',
      'लोकसभा व विधानसभांचा कार्यकाळ ५ वर्षांवरून ६ वर्षे करण्यात आला (जो पुढे ४४ व्या दुरुस्तीने पुन्हा ५ वर्षे केला).'
    ],
    mpscImportance: 'MPSC चे सर्वाधिक आवडते प्रकरण; दरवर्षी यावर किमान १ प्रश्न हमखास असतो!',
    isSuperHighYield: true
  },
  {
    amendmentNumber: 44,
    year: 1978,
    titleMr: 'चव्वेचाळिसावी घटनादुरुस्ती (१९७८)',
    titleEn: '44th Constitutional Amendment Act, 1978',
    summaryMr: 'जनता पक्षाच्या सरकारने आणीबाणीतील विकृती दूर करण्यासाठी केली. मालमत्तेचा हक्क मूलभूत हक्कातून वगळला; आणीबाणीत कलम २० व २१ चे निलंबन अशक्य केले; ‘सशस्त्र बंड’ शब्द टाकला.',
    summaryEn: 'Enacted by Janata Party government to reverse Emergency excesses and strengthen civil liberties.',
    keyProvisionsMr: [
      'मालमत्तेचा मूलभूत हक्क (कलम ३१ व १९(१)(f)) रद्द करून कलम ३००A मध्ये केवळ कायदेशीर हक्क बनवला.',
      'राष्ट्रीय आणीबाणीत ‘अंतर्गत अशांतता’ ऐवजी ‘सशस्त्र बंड’ (Armed rebellion) हा शब्द समाविष्ट केला.',
      'कलम २० आणि २१ हे आणीबाणीतही कोणत्याही परिस्थितीत निलंबित करता येणार नाहीत अशी तरतूद.',
      'राष्ट्रपती मंत्रिमंडळाचा सल्ला एकदा पुनर्विचारासाठी परत पाठवू शकतात ही तरतूद जोडली.'
    ],
    mpscImportance: 'नागरी हक्कांचे पुनरुज्जीवन करणारी ऐतिहासिक घटनादुरुस्ती.',
    isSuperHighYield: true
  },
  {
    amendmentNumber: 52,
    year: 1985,
    titleMr: 'बावन्नावी घटनादुरुस्ती (१९८५) - पक्षांतरबंदी कायदा',
    titleEn: '52nd Constitutional Amendment Act, 1985 (Anti-Defection Law)',
    summaryMr: '१० वी अनुसूची संविधानात जोडून खासदार व आमदारांच्या पक्षांतरावर बंदी घालण्यात आली.',
    summaryEn: 'Added Tenth Schedule to disqualify lawmakers who defect from their political party.',
    keyProvisionsMr: [
      'पक्षाचा आदेश (व्हिप) न मानल्यास किंवा पक्षांतर केल्यास पद रद्दबातल.',
      'अपात्रतेचा निर्णय घेण्याचा अंतिम अधिकार संबंधित सभागृहाच्या अध्यक्षांना देण्यात आला.'
    ],
    mpscImportance: 'महाराष्ट्रातील चालू राजकीय घडामोडींमुळे MPSC साठी अत्यंत संवेदनशील व संभाव्य घटक.',
    isSuperHighYield: true
  },
  {
    amendmentNumber: 61,
    year: 1989,
    titleMr: 'एकसष्टावी घटनादुरुस्ती (१९८९) - मतदानाचे वय १८ वर्षे',
    titleEn: '61st Constitutional Amendment Act, 1989 (Voting age reduced to 18)',
    summaryMr: 'लोकसभा आणि राज्य विधानसभा निवडणुकीत मतदानाचे वय २१ वर्षांवरून १८ वर्षे करण्यात आले (कलम ३२६ मध्ये दुरुस्ती).',
    summaryEn: 'Lowered the voting age for elections to the Lok Sabha and State Legislative Assemblies from 21 to 18 years.',
    keyProvisionsMr: [
      'कलम ३२६ मधील मतदाराच्या वयोमर्यादेत बदल करून १८ वर्षे करण्यात आले.',
      'राजीव गांधी यांच्या पंतप्रधानपदाच्या काळात हा निर्णय घेण्यात आला.'
    ],
    mpscImportance: 'सरळसेवा, पोलीस भरती व राज्यसेवा पूर्वमध्ये वारंवार विचारली जाणारी दुरुस्ती.',
    isSuperHighYield: true
  },
  {
    amendmentNumber: 73,
    year: 1992,
    titleMr: 'त्र्याहत्तरावी घटनादुरुस्ती (१९९२) - पंचायतींना घटनात्मक दर्जा',
    titleEn: '73rd Constitutional Amendment Act, 1992 (Panchayati Raj Constitutional Status)',
    summaryMr: 'भाग ९ आणि ११ वी अनुसूची (२९ विषय) जोडून त्रिस्तरीय पंचायत राज व्यवस्थेला घटनात्मक मान्यता देण्यात आली.',
    summaryEn: 'Conferred constitutional status on Panchayati Raj Institutions (Part IX, Schedule 11).',
    keyProvisionsMr: [
      'कलम २४३ ते २४३-O या १६ नवीन कलमांचा समावेश.',
      'ग्रामसभेची अनिवार्य स्थापना, ३ स्तरीय रचना, दर ५ वर्षांनी निवडणुका आणि राज्य वित्त आयोग.',
      'महिलांसाठी किमान ३३% आरक्षण (महाराष्ट्रात २०११ पासून ५०% आरक्षण आहे!).'
    ],
    mpscImportance: 'पंचायत राज घटकाचा कणा असणारी घटनादुरुस्ती.',
    isSuperHighYield: true
  },
  {
    amendmentNumber: 74,
    year: 1992,
    titleMr: 'चौहत्तरावी घटनादुरुस्ती (१९९२) - नगरपालिकेस घटनात्मक दर्जा',
    titleEn: '74th Constitutional Amendment Act, 1992 (Urban Local Bodies)',
    summaryMr: 'भाग ९-अ आणि १२ वी अनुसूची (१८ विषय) जोडून नगरपंचायती, नगरपरिषदा व महानगरपालिकांना घटनात्मक संरक्षण दिले.',
    summaryEn: 'Conferred constitutional status on Municipalities and Urban Local Bodies (Part IX-A, Schedule 12).',
    keyProvisionsMr: [
      'कलम २४३P ते २४३ZG या १८ नवीन कलमांचा समावेश.',
      'वॉर्ड समित्यांची स्थापना व महानगर नियोजन समित्यांची निर्मिती.'
    ],
    mpscImportance: 'स्थानिक स्वराज्य संस्था परीक्षेसाठी अनिवार्य.',
    isSuperHighYield: true
  },
  {
    amendmentNumber: 86,
    year: 2002,
    titleMr: 'शहाऐंशीवी घटनादुरुस्ती (२००२) - शिक्षणाचा मूलभूत हक्क',
    titleEn: '86th Constitutional Amendment Act, 2002 (Right to Education)',
    summaryMr: '६ ते १४ वयोगटातील मुलांसाठी प्राथमिक शिक्षण मूलभूत हक्क बनवण्यात आले (कलम २१A जोडले; कलम ४५ दुरुस्त केले; ११ वे मूलभूत कर्तव्य ५१A(k) जोडले).',
    summaryEn: 'Made education a Fundamental Right under Article 21A and added 11th Fundamental Duty.',
    keyProvisionsMr: [
      'भाग ३ मध्ये कलम २१A: मोफत व सक्तीचे शिक्षण मूलभूत हक्क.',
      'भाग ४ मध्ये कलम ४५: ६ वर्षांखालील बालकांच्या संगोपनावर भर.',
      'भाग ४-अ मध्ये कलम ५१A(k): पाल्यांना शिक्षणाची संधी उपलब्ध करून देणे पालकांचे कर्तव्य.'
    ],
    mpscImportance: 'तीन वेगवेगळ्या भागांमध्ये (भाग ३, ४ व ४-अ) एकाच वेळी बदल करणारी अद्वितीय दुरुस्ती!',
    isSuperHighYield: true
  },
  {
    amendmentNumber: 91,
    year: 2003,
    titleMr: 'एक्याण्णवावी घटनादुरुस्ती (२००३) - मंत्रिमंडळ आकार मर्यादा',
    titleEn: '91st Constitutional Amendment Act, 2003 (Limiting size of Council of Ministers)',
    summaryMr: 'पंतप्रधान/मुख्यमंत्र्यांसह एकूण मंत्र्यांची संख्या लोकसभेच्या/विधानसभेच्या एकूण सदस्यसंख्येच्या १५% पेक्षा जास्त असणार नाही; राज्यात किमान १२ मंत्री असणे आवश्यक.',
    summaryEn: 'Restricted size of Council of Ministers to 15% of Lok Sabha / Vidhan Sabha strength; minimum 12 in States.',
    keyProvisionsMr: [
      'कलम ७५(१A) व कलम १६४(१A) मध्ये तरतूद समाविष्ट.',
      '१० व्या अनुसूचीतील १/३ सदस्यांच्या फुटीची पळवाट बंद केली.'
    ],
    mpscImportance: 'मंत्रिमंडळ रचनेवरील MPSC चा अतिशय वारंवार येणारा प्रश्न.',
    isSuperHighYield: true
  },
  {
    amendmentNumber: 101,
    year: 2016,
    titleMr: 'एकशे एकवी घटनादुरुस्ती (२०१६) - वस्तू व सेवा कर (GST)',
    titleEn: '101st Constitutional Amendment Act, 2016 (Goods and Services Tax - GST)',
    summaryMr: 'देशात ‘एक देश, एक कर’ अंतर्गत १ जुलै २०१७ पासून GST लागू करण्यात आला. कलम २४६A, २६९A आणि २७९A (GST परिषद) जोडले गेले.',
    summaryEn: 'Introduced Goods and Services Tax (GST) in India with GST Council under Article 279A.',
    keyProvisionsMr: [
      'कलम २७९A अन्वये राष्ट्रपतींनी GST परिषदेची स्थापना केली; केंद्रीय अर्थमंत्री हे GST परिषदेचे अध्यक्ष असतात.',
      'केंद्र व राज्यांच्या अप्रत्यक्ष करांचे एकत्रीकरण.'
    ],
    mpscImportance: 'अर्थशास्त्र आणि राज्यघटना दोन्ही पेपरसाठी अत्यंत महत्त्वाचा घटक.',
    isSuperHighYield: true
  },
  {
    amendmentNumber: 102,
    year: 2018,
    titleMr: 'एकशे दोनवी घटनादुरुस्ती (२०१८) - राष्ट्रीय मागासवर्ग आयोगास घटनात्मक दर्जा',
    titleEn: '102nd Constitutional Amendment Act, 2018 (Constitutional Status to NCBC)',
    summaryMr: 'राष्ट्रीय मागासवर्ग आयोगाला (NCBC) कलम ३३८B जोडून घटनात्मक दर्जा देण्यात आला.',
    summaryEn: 'Conferred constitutional status upon the National Commission for Backward Classes (Article 338B).',
    keyProvisionsMr: [
      'कलम ३३८B समाविष्ट; आता संविधानात तीन स्वतंत्र आयोग झाले: ३३८ (SC आयोग), ३३८A (ST आयोग) आणि ३३८B (BC आयोग).'
    ],
    mpscImportance: 'कलम ३३८, ३३८A व ३३८B जोड्या जुळवा मध्ये हमखास येतात.',
    isSuperHighYield: true
  },
  {
    amendmentNumber: 103,
    year: 2019,
    titleMr: 'एकशे तीनवी घटनादुरुस्ती (२०१९) - EWS १०% आरक्षण',
    titleEn: '103rd Constitutional Amendment Act, 2019 (10% EWS Reservation)',
    summaryMr: 'खुल्या प्रवर्गातील आर्थिकदृष्ट्या दुर्बल घटकांना (EWS) शिक्षण व सरकारी नोकऱ्यांमध्ये १०% आरक्षण (कलम १५(६) व १६(६) जोडले गेले).',
    summaryEn: 'Provided 10% reservation in government jobs and educational institutions for Economically Weaker Sections (EWS).',
    keyProvisionsMr: [
      'कलम १५(६) आणि कलम १६(६) संविधानात नव्याने समाविष्ट.',
      'सुप्रीम कोर्टाने ‘जनहित अभियान खटल्यात’ (२०२२) ३:२ बहुमताने या दुरुस्तीची घटनात्मक वैधता कायम ठेवली.'
    ],
    mpscImportance: 'चालू घडामोडी आणि राज्यव्यवस्था दोन्ही दृष्टीने महत्त्वाचे.',
    isSuperHighYield: true
  },
  {
    amendmentNumber: 104,
    year: 2020,
    titleMr: 'एकशे चारवी घटनादुरुस्ती (२०२०) - अँग्लो-इंडियन जागा रद्द व SC/ST आरक्षण मुदतवाढ',
    titleEn: '104th Constitutional Amendment Act, 2020 (Abolishing Anglo-Indian Quota & Extending SC/ST Reservation)',
    summaryMr: 'लोकसभा आणि विधानसभांमधील SC/ST आरक्षण आणखी १० वर्षांसाठी (२५ जानेवारी २०३० पर्यंत) वाढवले; अँग्लो-इंडियन समुदायाचे २ नामनिर्देशित प्रतिनिधीत्व रद्द केले.',
    summaryEn: 'Extended SC/ST reservations in legislatures till 2030; discontinued Anglo-Indian nomination quota.',
    keyProvisionsMr: [
      'कलम ३३४ मध्ये दुरुस्ती केली.',
      'लोकसभेची कमाल सदस्यसंख्या ५५२ वरून आता ५५० झाली (२ अँग्लो-इंडियन जागा रद्द झाल्याने).'
    ],
    mpscImportance: 'लोकसभेच्या सदस्यसंख्येतील बदल आणि आरक्षण कालावधीवरील वारंवार प्रश्न.',
    isSuperHighYield: true
  },
  {
    amendmentNumber: 105,
    year: 2021,
    titleMr: 'एकशे पाचवी घटनादुरुस्ती (२०२१) - राज्य सरकारांचे OBC यादी अधिकार पुनर्संचयित',
    titleEn: '105th Constitutional Amendment Act, 2021 (Restoring State powers for OBC lists)',
    summaryMr: 'मराठा आरक्षण खटल्यानंतर सर्वोच्च न्यायालयाच्या निकालानंतर राज्यांना सामाजिक व शैक्षणिकदृष्ट्या मागास वर्ग (SEBC/OBC) यादी तयार करण्याचा स्वतःचा अधिकार पुन्हा बहाल केला.',
    summaryEn: 'Restored the power of State governments to identify and notify their own SEBC/OBC lists.',
    keyProvisionsMr: [
      'कलम ३४२A, ३३८B आणि ३६६ मध्ये सुधारणा केली.'
    ],
    mpscImportance: 'महाराष्ट्राच्या आरक्षण राजकारणाशी थेट संबंधित दुरुस्ती.',
    isSuperHighYield: true
  },
  {
    amendmentNumber: 106,
    year: 2023,
    titleMr: 'एकशे सहावी घटनादुरुस्ती (२०२३) - "नारी शक्ती वंदन अधिनियम" (महिलांना ३३% आरक्षण)',
    titleEn: '106th Constitutional Amendment Act, 2023 (Nari Shakti Vandan Adhiniyam - 33% Women Reservation)',
    summaryMr: 'लोकसभा, दिल्ली विधानसभा आणि सर्व राज्य विधानसभांमध्ये महिलांसाठी ३३% (एक तृतीयांश) जागा राखीव ठेवण्याची ऐतिहासिक तरतूद (कलम ३३०A, ३३२A व ३३४A जोडले).',
    summaryEn: 'Enacted to reserve one-third (33%) of all seats for women in Lok Sabha, State Legislative Assemblies, and Delhi Assembly.',
    keyProvisionsMr: [
      'कलम ३३०A: लोकसभेत महिलांसाठी ३३% आरक्षण (SC/ST महिलांसाठीही अंतर्गत ३३% आरक्षण).',
      'कलम ३३२A: राज्य विधानसभांमध्ये महिलांसाठी ३३% आरक्षण.',
      'कलम ३३४A: हे आरक्षण जनगणना आणि मतदारसंघ पुनर्रचना (Delimitation) झाल्यानंतर लागू होईल व पुढील १५ वर्षे अस्तित्वात राहील.',
      'नवीन संसद भवनातील पहिल्याच विशेष अधिवेशनात संमत झालेले हे पहिलेच ऐतिहासिक विधेयक होते (१२८ वे घटनादुरुस्ती विधेयक).'
    ],
    mpscImportance: 'भारताच्या लोकशाहीतील सर्वात ताज्या आणि अतिसंभाव्य १००% परीक्षेत येणाऱ्या दुरुस्त्यांपैकी एक!',
    isSuperHighYield: true
  }
];

// ----------------------------------------------------------------------------
// 4. LANDMARK SUPREME COURT VERDICTS (ऐतिहासिक खटले व निकाल)
// ----------------------------------------------------------------------------
export const LANDMARK_JUDGMENTS: LandmarkJudgment[] = [
  {
    id: 'sc_kesavananda_1973',
    caseNameMr: 'केशवानंद भारती विरूद्ध केरळ राज्य',
    caseNameEn: 'Kesavananda Bharati v. State of Kerala',
    year: 1973,
    benchSizeMr: '१३ न्यायाधीशांचे घटनापीठ (सर्वोच्च न्यायालयाच्या इतिहासातील सर्वात मोठे खंडपीठ, निकाल ७:६)',
    keyVerdictMr: 'संसदेला संविधानात दुरुस्ती करण्याचा अधिकार असला तरी संविधानाच्या ‘मूलभूत संरचनेला’ (Basic Structure Doctrine) बदलता किंवा नष्ट करता येत नाही.',
    keyVerdictEn: 'Established the "Basic Structure Doctrine" limiting Parliament\'s amending power under Article 368.',
    mpscSignificanceMr: 'भारतीय संविधानाचा सर्वात महत्त्वाचा खटला. २४ एप्रिल १९७३ रोजी हा ऐतिहासिक निकाल देण्यात आला.',
    articlesInvolved: ['कलम ३६८', 'कलम १३', 'भाग ३']
  },
  {
    id: 'sc_maneka_1978',
    caseNameMr: 'मेनका गांधी विरूद्ध भारत सरकार',
    caseNameEn: 'Maneka Gandhi v. Union of India',
    year: 1978,
    benchSizeMr: '७ न्यायाधीशांचे खंडपीठ',
    keyVerdictMr: 'कलम २१ मधील जीवित व स्वातंत्र्याचा अधिकार म्हणजे केवळ जनावरासारखे जगणे नव्हे, तर मानवी सन्मानाने जगणे होय. परदेशात जाण्याचा अधिकार हा कलम २१ चा भाग आहे. कायदा ‘न्याय्य, वाजवी आणि निष्पक्ष’ (Just, fair and reasonable) असावा.',
    keyVerdictEn: 'Expanded Article 21 to include human dignity and imported "due process of law" principle.',
    mpscSignificanceMr: 'कलम १४, १९ आणि २१ हे एकमेकांशी जोडलेले आहेत (Golden Triangle) हा सिद्धांत मान्य करण्यात आला.',
    articlesInvolved: ['कलम २१', 'कलम १९', 'कलम १४']
  },
  {
    id: 'sc_minerva_1980',
    caseNameMr: 'मिनर्व्हा मिल्स विरूद्ध भारत सरकार',
    caseNameEn: 'Minerva Mills Ltd. v. Union of India',
    year: 1980,
    benchSizeMr: '५ न्यायाधीशांचे खंडपीठ',
    keyVerdictMr: 'मूलभूत हक्क आणि मार्गदर्शक तत्त्वे यांच्यातील सुसंवाद व संतुलन (Harmony and Balance) हे संविधानाच्या मूलभूत संरचनेचा भाग आहे. एकासाठी दुसऱ्याचा बळी देता येणार नाही.',
    keyVerdictEn: 'Ruled that the harmony and balance between Fundamental Rights and DPSPs is an essential feature of basic structure.',
    mpscSignificanceMr: '४२ व्या दुरुस्तीतील संसदेच्या अमर्याद दुरुस्ती अधिकाराला चाप लावला.',
    articlesInvolved: ['कलम ३६८(४)(५)', 'कलम ३१C']
  },
  {
    id: 'sc_indra_sawhney_1992',
    caseNameMr: 'इंदिरा साहनी विरूद्ध भारत सरकार (मंडल खटला)',
    caseNameEn: 'Indra Sawhney v. Union of India (Mandal Case)',
    year: 1992,
    benchSizeMr: '९ न्यायाधीशांचे घटनापीठ (निकाल ६:३)',
    keyVerdictMr: 'ओबीसींना (OBC) २७% आरक्षण वैध ठरवले; परंतु एकूण आरक्षणावर ५०% ची कमाल मर्यादा घातली आणि क्रिमी लेअर (उन्नत व प्रगत गट) वगळण्याचे आदेश दिले. पदोन्नतीत आरक्षण नाकारले.',
    keyVerdictEn: 'Upheld 27% OBC reservation subject to 50% ceiling and exclusion of creamy layer.',
    mpscSignificanceMr: 'भारतातील आरक्षण धोरणाची लक्ष्मणरेषा निश्चित करणारा खटला.',
    articlesInvolved: ['कलम १६(४)', 'कलम ३४०']
  },
  {
    id: 'sc_sr_bommai_1994',
    caseNameMr: 'एस. आर. बोम्मई विरूद्ध भारत सरकार',
    caseNameEn: 'S. R. Bommai v. Union of India',
    year: 1994,
    benchSizeMr: '९ न्यायाधीशांचे घटनापीठ',
    keyVerdictMr: 'कलम ३५६ अंतर्गत राष्ट्रपती राजवट लागू करण्याचा निर्णय न्यायालयीन पुनर्विलोकनास (Judicial Review) पात्र आहे. बहुमत सिद्ध करण्याचे एकमेव ठिकाण विधिमंडळाचे सभागृह (Floor of the House) हेच आहे. ‘धर्मनिरपेक्षता’ ही मूलभूत संरचना आहे.',
    keyVerdictEn: 'Curbed arbitrary use of Article 356 (President\'s Rule) and declared secularism as basic structure.',
    mpscSignificanceMr: 'केंद्र सरकारने घटकराज्यांच्या सरकारांना बरखास्त करण्याच्या गैरवापरावर लगाम घातला.',
    articlesInvolved: ['कलम ३५६', 'कलम ७४(२)']
  },
  {
    id: 'sc_puttaswamy_2017',
    caseNameMr: 'न्या. के. एस. पुट्टस्वामी विरूद्ध भारत सरकार',
    caseNameEn: 'Justice K. S. Puttaswamy (Retd.) v. Union of India',
    year: 2017,
    benchSizeMr: '९ न्यायाधीशांचे घटनापीठ (एकमुखाने ९:० निकाल)',
    keyVerdictMr: '‘खाजगीपणाचा / गोपनीयतेचा हक्क’ (Right to Privacy) हा कलम २१ मधील जीवित व वैयक्तिक स्वातंत्र्याचा आणि भाग ३ मधील स्वातंत्र्याचा अविभाज्य मूलभूत हक्क आहे.',
    keyVerdictEn: 'Unanimously declared the Right to Privacy as a fundamental right under Article 21.',
    mpscSignificanceMr: 'डिजिटल युग आणि आधार कार्डच्या पार्श्वभूमीवर नागरिकांच्या व्यक्तीस्वातंत्र्याचे ऐतिहासिक संरक्षण.',
    articlesInvolved: ['कलम २१', 'कलम १४', 'कलम १९']
  }
];

// ----------------------------------------------------------------------------
// 5. MPSC POLITY & CONSTITUTION PYQS PRACTICE QUESTIONS
// ----------------------------------------------------------------------------
export const POLITY_PYQ_QUESTIONS: PolityPyqQuestion[] = [
  {
    id: 'pyq_polity_1',
    questionMr: 'भारतीय संविधानाच्या कोणत्या कलमाखाली सर्वोच्च न्यायालय नागरिकांच्या मूलभूत हक्कांच्या संरक्षणासाठी ५ प्रकारचे प्राधिलेख (Writs) जारी करू शकते?',
    questionEn: 'Under which Article of the Constitution can the Supreme Court issue writs for the enforcement of Fundamental Rights?',
    optionsMr: ['कलम २२६', 'कलम ३२', 'कलम १३१', 'कलम १४३'],
    optionsEn: ['Article 226', 'Article 32', 'Article 131', 'Article 143'],
    correctOptionIndex: 1,
    explanationMr: 'कलम ३२ अन्वये सर्वोच्च न्यायालयास बंदीप्रत्यक्षीकरण, परमादेश, प्रतिषेध, उत्प्रेषण व अधिकारपृच्छा हे ५ प्राधिलेख जारी करण्याचा अधिकार आहे. तर उच्च न्यायालयास कलम २२६ अन्वये हा अधिकार आहे.',
    pyqExamTag: 'MPSC राज्यसेवा पूर्व २०२१ व २०२३',
    relatedTopic: 'मूलभूत हक्क (Fundamental Rights)'
  },
  {
    id: 'pyq_polity_2',
    questionMr: '‘मिनी कॉन्स्टिट्यूशन’ (Mini Constitution) म्हणून खालीलपैकी कोणत्या घटनादुरुस्तीचा गौरव केला जातो?',
    questionEn: 'Which Constitutional Amendment Act is widely known as the "Mini Constitution"?',
    optionsMr: ['४४ वी घटनादुरुस्ती (१९७८)', '४२ वी घटनादुरुस्ती (१९७६)', '७३ वी घटनादुरुस्ती (१९९२)', '८६ वी घटनादुरुस्ती (२००२)'],
    optionsEn: ['44th Amendment (1978)', '42nd Amendment (1976)', '73rd Amendment (1992)', '86th Amendment (2002)'],
    correctOptionIndex: 1,
    explanationMr: '४२ वी घटनादुरुस्ती १९७६ ही भारतीय संविधानातील सर्वात मोठी व सर्वंकष दुरुस्ती होती. यात प्रस्तावनेत ३ शब्द जोडले गेले, मूलभूत कर्तव्ये जोडली गेली आणि अनेक संस्थात्मक बदल करण्यात आले.',
    pyqExamTag: 'MPSC संयुक्त गट-ब पूर्व २०१९ व २०२२',
    relatedTopic: 'घटनादुरुस्त्या (Constitutional Amendments)'
  },
  {
    id: 'pyq_polity_3',
    questionMr: 'संविधानाची ‘मूलभूत संरचना’ (Basic Structure Doctrine) हा ऐतिहासिक सिद्धांत सर्वोच्च न्यायालयाने कोणत्या खटल्यात मांडला?',
    questionEn: 'In which landmark case did the Supreme Court propound the "Basic Structure Doctrine"?',
    optionsMr: ['गोलकनाथ खटला (१९६७)', 'केशवानंद भारती खटला (१९७३)', 'मेनका गांधी खटला (१९७८)', 'एस. आर. बोम्मई खटला (१९९४)'],
    optionsEn: ['Golaknath Case (1967)', 'Kesavananda Bharati Case (1973)', 'Maneka Gandhi Case (1978)', 'S. R. Bommai Case (1994)'],
    correctOptionIndex: 1,
    explanationMr: '२४ एप्रिल १९७३ रोजी केशवानंद भारती वि. केरळ राज्य खटल्यात १३ न्यायाधीशांच्या खंडपीठाने स्पष्ट केले की संसदेला संविधानात दुरुस्ती करण्याचा अधिकार असला तरी मूलभूत संरचनेला धक्का लावता येत नाही.',
    pyqExamTag: 'MPSC राज्यसेवा मुख्य GS-2 व पूर्व २०२०',
    relatedTopic: 'सुप्रीम कोर्ट खटले (Landmark Judgments)'
  },
  {
    id: 'pyq_polity_4',
    questionMr: '‘समान नागरी कायदा’ (Uniform Civil Code - UCC) ची तरतूद संविधानाच्या कोणत्या कलमात समाविष्ट आहे?',
    questionEn: 'Under which Article of the Constitution is the provision for a Uniform Civil Code (UCC) enshrined?',
    optionsMr: ['कलम ४०', 'कलम ४४', 'कलम ४८', 'कलम ५०'],
    optionsEn: ['Article 40', 'Article 44', 'Article 48', 'Article 50'],
    correctOptionIndex: 1,
    explanationMr: 'कलम ४४ हे मार्गदर्शक तत्त्वांमध्ये (DPSP) येते. यात राज्य संपूर्ण भारतामध्ये नागरिकांसाठी समान नागरी कायदा लागू करण्याचा प्रयत्न करेल असे नमूद आहे.',
    pyqExamTag: 'MPSC संयुक्त पूर्व २०२१ व २०२३',
    relatedTopic: 'मार्गदर्शक तत्त्वे (DPSP)'
  },
  {
    id: 'pyq_polity_5',
    questionMr: 'मतदारांचे वय २१ वर्षांवरून १८ वर्षे कमी करणारी ऐतिहासिक घटनादुरुस्ती कोणती?',
    questionEn: 'Which Constitutional Amendment reduced the voting age from 21 years to 18 years?',
    optionsMr: ['५२ वी घटनादुरुस्ती', '६१ वी घटनादुरुस्ती', '८६ वी घटनादुरुस्ती', '९१ वी घटनादुरुस्ती'],
    optionsEn: ['52nd Amendment', '61st Amendment', '86th Amendment', '91st Amendment'],
    correctOptionIndex: 1,
    explanationMr: '६१ वी घटनादुरुस्ती कायदा १९८९ द्वारे कलम ३२६ मध्ये दुरुस्ती करून मतदानाचे वय २१ वरून १८ वर्षे करण्यात आले. त्यावेळी पंतप्रधान राजीव गांधी होते.',
    pyqExamTag: 'MPSC गट-क व तलाठी भरती',
    relatedTopic: 'निवडणुका व घटनादुरुस्ती'
  },
  {
    id: 'pyq_polity_6',
    questionMr: 'घटनेच्या कोणत्या अनुसूचीत भारतातील २२ मान्यताप्राप्त राजभाषांची यादी देण्यात आली आहे?',
    questionEn: 'In which Schedule of the Constitution is the list of 22 recognized official languages given?',
    optionsMr: ['सातवी अनुसूची', 'आठवी अनुसूची', 'नववी अनुसूची', 'दहावी अनुसूची'],
    optionsEn: ['Seventh Schedule', 'Eighth Schedule', 'Ninth Schedule', 'Tenth Schedule'],
    correctOptionIndex: 1,
    explanationMr: 'आठव्या अनुसूचीत मूळ संविधानात १४ भाषा होत्या, आता २२ भाषा आहेत. इंग्रजी भाषा आठव्या अनुसूचीत समाविष्ट नाही.',
    pyqExamTag: 'MPSC राज्यसेवा पूर्व २०१८',
    relatedTopic: 'अनुसूच्या (Schedules)'
  },
  {
    id: 'pyq_polity_7',
    questionMr: '‘खाजगीपणाचा हक्क’ (Right to Privacy) हा कलम २१ अंतर्गत मूलभूत हक्क असल्याचा निकाल कोणत्या खटल्यात देण्यात आला?',
    questionEn: 'In which landmark judgment was the Right to Privacy declared a fundamental right under Article 21?',
    optionsMr: ['शायरा बानो खटला', 'के. एस. पुट्टस्वामी खटला', 'नवतेज सिंग जोहर खटला', 'अनुराधा भसीन खटला'],
    optionsEn: ['Shayara Bano Case', 'K. S. Puttaswamy Case', 'Navtej Singh Johar Case', 'Anuradha Bhasin Case'],
    correctOptionIndex: 1,
    explanationMr: '२०१७ मध्ये न्यायमूर्ती के. एस. पुट्टस्वामी विरूद्ध भारत सरकार या खटल्यात ९ न्यायाधीशांच्या खंडपीठाने एकमुखाने खाजगीपणाचा हक्क मूलभूत हक्क असल्याचे घोषित केले.',
    pyqExamTag: 'MPSC राज्यसेवा पूर्व २०१९ व २०२२',
    relatedTopic: 'मूलभूत हक्क व निकाल'
  },
  {
    id: 'pyq_polity_8',
    questionMr: 'संसदेच्या दोन्ही सभागृहांमध्ये किंवा एका सभागृहाचे अधिवेशन चालू नसताना राष्ट्रपती कोणत्या कलमान्वये वटहुकूम (Ordinance) काढू शकतात?',
    questionEn: 'Under which Article can the President promulgate an Ordinance when Parliament is not in session?',
    optionsMr: ['कलम ७२', 'कलम १२३', 'कलम २१३', 'कलम १४३'],
    optionsEn: ['Article 72', 'Article 123', 'Article 213', 'Article 143'],
    correctOptionIndex: 1,
    explanationMr: 'राष्ट्रपती कलम १२३ अन्वये वटहुकूम काढतात, तर राज्यपाल कलम २१३ अन्वये वटहुकूम काढतात.',
    pyqExamTag: 'MPSC संयुक्त गट-ब पूर्व २०२०',
    relatedTopic: 'राष्ट्रपती व वटहुकूम'
  },
  {
    id: 'pyq_polity_9',
    questionMr: 'नुकताच संमत झालेला ‘नारी शक्ती वंदन अधिनियम’ (१०६ वी घटनादुरुस्ती २०२३) महिलांना किती टक्के आरक्षण प्रदान करतो?',
    questionEn: 'The Nari Shakti Vandan Adhiniyam (106th Amendment Act, 2023) provides what percentage of reservation for women in Lok Sabha and Assemblies?',
    optionsMr: ['२५%', '३३% (एक तृतीयांश)', '५०%', '३०%'],
    optionsEn: ['25%', '33% (One-third)', '50%', '30%'],
    correctOptionIndex: 1,
    explanationMr: '१०६ व्या घटनादुरुस्तीने लोकसभा, दिल्ली विधानसभा व राज्य विधानसभांमध्ये महिलांसाठी ३३% जागा राखीव ठेवल्या आहेत. हे नवीन संसद भवनात मंजूर झालेले पहिलेच विधेयक होते.',
    pyqExamTag: 'MPSC चालू घडामोडी व राज्यव्यवस्था २०२४-२५ संभाव्य',
    relatedTopic: 'ताज्या घटनादुरुस्त्या'
  },
  {
    id: 'pyq_polity_10',
    questionMr: 'महाराष्ट्र लोकसेवा आयोगाच्या (MPSC) सदस्यांची नेमणूक राज्यपाल करतात, परंतु त्यांना पदावरून दूर करण्याचा अधिकार कोणाला आहे?',
    questionEn: 'Members of the MPSC are appointed by the Governor, but who has the sole power to remove them from office?',
    optionsMr: ['संबंधित राज्याचे राज्यपाल', 'भारताचे राष्ट्रपती', 'उच्च न्यायालयाचे मुख्य न्यायाधीश', 'राज्याचे मुख्यमंत्री'],
    optionsEn: ['Governor of the State', 'President of India', 'Chief Justice of High Court', 'Chief Minister of State'],
    correctOptionIndex: 1,
    explanationMr: 'कलम ३१७ अन्वये राज्य लोकसेवा आयोगाच्या (MPSC) अध्यक्षांना व सदस्यांना पदावरून दूर करण्याचा अधिकार केवळ भारताच्या राष्ट्रपतींनाच आहे (सर्वोच्च न्यायालयाच्या चौकशीनंतर). राज्यपाल केवळ त्यांना निलंबित करू शकतात.',
    pyqExamTag: 'MPSC राज्यसेवा पूर्व २०१७ व २०२१',
    relatedTopic: 'लोकसेवा आयोग (MPSC/UPSC)'
  }
];
