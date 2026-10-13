// Maharashtra 36 Districts Comprehensive GK & MPSC Factfile Dataset
// Covering all 6 Administrative Divisions with High-Yield MPSC Exam Insights

export type AdministrativeDivisionId = 
  | 'konkan' 
  | 'pune' 
  | 'nashik' 
  | 'chhatrapati_sambhajinagar' 
  | 'amravati' 
  | 'nagpur';

export interface MaharashtraDistrict {
  id: string;
  nameMr: string;
  nameEn: string;
  divisionId: AdministrativeDivisionId;
  divisionNameMr: string;
  divisionNameEn: string;
  hqMr: string;
  hqEn: string;
  areaSqKm: number;
  talukasCount: number;
  prominentTalukasMr: string[];
  majorRiversMr: string[];
  historicalFortsMr: string[];
  majorCropsMr: string[];
  sanctuariesAndParksMr: string[];
  mineralsAndIndustriesMr: string[];
  mpscGoldenFactsMr: string[];
  literacyRatePercent: number; // 2011 Census
  sexRatio: number; // Females per 1000 males (2011 Census)
  rtoCode: string;
}

export interface DivisionSummary {
  id: AdministrativeDivisionId;
  nameMr: string;
  nameEn: string;
  districtsCount: number;
  hqMr: string;
  colorClass: string;
}

export const MAHARASHTRA_DIVISIONS: DivisionSummary[] = [
  { id: 'konkan', nameMr: 'कोकण विभाग', nameEn: 'Konkan Division', districtsCount: 7, hqMr: 'नवी मुंबई (कोकण भवन)', colorClass: 'from-blue-600 to-cyan-600' },
  { id: 'pune', nameMr: 'पुणे विभाग (पश्चिम महाराष्ट्र)', nameEn: 'Pune Division', districtsCount: 5, hqMr: 'पुणे', colorClass: 'from-emerald-600 to-green-600' },
  { id: 'nashik', nameMr: 'नाशिक विभाग (उत्तर महाराष्ट्र / खानदेश)', nameEn: 'Nashik Division', districtsCount: 5, hqMr: 'नाशिक', colorClass: 'from-amber-600 to-yellow-600' },
  { id: 'chhatrapati_sambhajinagar', nameMr: 'छत्रपती संभाजीनगर विभाग (मराठवाडा)', nameEn: 'Chhatrapati Sambhajinagar (Marathwada)', districtsCount: 8, hqMr: 'छत्रपती संभाजीनगर', colorClass: 'from-orange-600 to-amber-700' },
  { id: 'amravati', nameMr: 'अमरावती विभाग (पश्चिम विदर्भ)', nameEn: 'Amravati Division', districtsCount: 5, hqMr: 'अमरावती', colorClass: 'from-purple-600 to-indigo-600' },
  { id: 'nagpur', nameMr: 'नागपूर विभाग (पूर्व विदर्भ)', nameEn: 'Nagpur Division', districtsCount: 6, hqMr: 'नागपूर', colorClass: 'from-rose-600 to-red-600' },
];

export const MAHARASHTRA_DISTRICTS_DATA: MaharashtraDistrict[] = [
  // ==========================================
  // १. कोकण विभाग (७ जिल्हे)
  // ==========================================
  {
    id: 'mumbai_city',
    nameMr: 'मुंबई शहर',
    nameEn: 'Mumbai City',
    divisionId: 'konkan',
    divisionNameMr: 'कोकण विभाग',
    divisionNameEn: 'Konkan',
    hqMr: 'मुंबई',
    hqEn: 'Mumbai',
    areaSqKm: 157,
    talukasCount: 0,
    prominentTalukasMr: ['तालुका अस्तित्वात नाही (केवळ शहर क्षेत्र)'],
    majorRiversMr: ['मिठी नदी'],
    historicalFortsMr: ['माहीम किल्ला', 'शीव (सायन) किल्ला', 'वरळी किल्ला'],
    majorCropsMr: ['मत्स्योत्पादन (नागरी क्षेत्र)'],
    sanctuariesAndParksMr: ['जिजामाता उद्यान (राणीची बाग)'],
    mineralsAndIndustriesMr: ['कापड गिरण्या (ऐतिहासिक)', 'आर्थिक राजधानी', 'बँकिंग व वित्तीय संस्था', 'बॉम्बे हाय (कच्चे तेल)'],
    mpscGoldenFactsMr: [
      'महाराष्ट्रातील सर्वात कमी क्षेत्रफळाचा जिल्हा (१५७ चौ.किमी).',
      'महाराष्ट्रात सर्वाधिक लोकसंख्या घनता असणारा जिल्हा (१९,६५२ व्यक्ती प्रति चौ.किमी).',
      'या जिल्ह्यात एकही ग्रामीण लोकसंख्या नाही (१००% नागरी जिल्हा).'
    ],
    literacyRatePercent: 89.21,
    sexRatio: 832,
    rtoCode: 'MH-01'
  },
  {
    id: 'mumbai_suburban',
    nameMr: 'मुंबई उपनगर',
    nameEn: 'Mumbai Suburban',
    divisionId: 'konkan',
    divisionNameMr: 'कोकण विभाग',
    divisionNameEn: 'Konkan',
    hqMr: 'वांद्रे (Bandra)',
    hqEn: 'Bandra',
    areaSqKm: 446,
    talukasCount: 3,
    prominentTalukasMr: ['कुर्ला', 'अंधेरी', 'बोरिवली'],
    majorRiversMr: ['मिठी नदी', 'दहिसर नदी', 'पोईसर नदी', 'ओशिवरा नदी'],
    historicalFortsMr: ['वांद्रे किल्ला (कॅस्टेला डी अगुआडा)', 'माध किल्ला'],
    majorCropsMr: ['मत्स्य व्यवसाय'],
    sanctuariesAndParksMr: ['संजय गांधी राष्ट्रीय उद्यान (बोरिवली)'],
    mineralsAndIndustriesMr: ['चित्रपट व मनोरंजन उद्योग (बॉलिवूड)', 'माहिती तंत्रज्ञान (IT)', 'आंतरराष्ट्रीय विमानतळ'],
    mpscGoldenFactsMr: [
      'महाराष्ट्रातील सर्वाधिक साक्षरता दर असलेला जिल्हा (८९.९१%).',
      '१ ऑक्टोबर १९९० रोजी मुंबई जिल्ह्याचे विभाजन होऊन मुंबई उपनगर जिल्हा निर्माण झाला.',
      'क्षेत्रफळानुसार राज्यातील दुसरा सर्वात लहान जिल्हा.'
    ],
    literacyRatePercent: 89.91,
    sexRatio: 860,
    rtoCode: 'MH-02, MH-03, MH-47'
  },
  {
    id: 'thane',
    nameMr: 'ठाणे',
    nameEn: 'Thane',
    divisionId: 'konkan',
    divisionNameMr: 'कोकण विभाग',
    divisionNameEn: 'Konkan',
    hqMr: 'ठाणे',
    hqEn: 'Thane',
    areaSqKm: 4214,
    talukasCount: 7,
    prominentTalukasMr: ['ठाणे', 'कल्याण', 'मुरबाड', 'भिवंडी', 'शहापूर', 'उल्हासनगर', 'अंबरनाथ'],
    majorRiversMr: ['उल्हास नदी', 'वैतरणा नदी', 'काळू नदी'],
    historicalFortsMr: ['माहुली किल्ला (शहापूर)', 'मलंगगड', 'कल्याण दुर्गाडी किल्ला'],
    majorCropsMr: ['भात (तांदूळ)', 'भाजीपाला'],
    sanctuariesAndParksMr: ['तानसा वन्यजीव अभयारण्य'],
    mineralsAndIndustriesMr: ['रासायनिक उद्योग (MIDC)', 'कापड उद्योग (भिवंडी पॉवरलूम हब)', 'इंजिनिअरिंग क्लस्टर्स'],
    mpscGoldenFactsMr: [
      '१ ऑगस्ट २०१४ रोजी ठाणे जिल्ह्याचे विभाजन होऊन ३६ वा "पालघर" जिल्हा तयार झाला.',
      'भारतातील पहिली प्रवासी रेल्वे १६ एप्रिल १८५३ रोजी बोरीबंदर ते ठाणे (३४ किमी) दरम्यान धावली.',
      'भिवंडी हे भारताचे प्रमुख "पॉवरलूम शहर" व लॉजिस्टिक्स हब म्हणून ओळखले जाते.'
    ],
    literacyRatePercent: 84.53,
    sexRatio: 886,
    rtoCode: 'MH-04, MH-05'
  },
  {
    id: 'palghar',
    nameMr: 'पालघर',
    nameEn: 'Palghar',
    divisionId: 'konkan',
    divisionNameMr: 'कोकण विभाग',
    divisionNameEn: 'Konkan',
    hqMr: 'पालघर',
    hqEn: 'Palghar',
    areaSqKm: 5344,
    talukasCount: 8,
    prominentTalukasMr: ['पालघर', 'डहाणू', 'तलासरी', 'जव्हार', 'मोखाडा', 'वाडा', 'विक्रमगड', 'वसई'],
    majorRiversMr: ['वैतरणा', 'सूर्या', 'पिंजाळ', 'दमनगंगा'],
    historicalFortsMr: ['वसईचा किल्ला (नरवीर चिमाजी आप्पा पराक्रम)', 'काळदुर्ग', 'शिरगाव किल्ला', 'अशेरीगड'],
    majorCropsMr: ['वाडा कोलम भात (GI Tag)', 'डहाणूची प्रसिद्ध चिकू (GI Tag)'],
    sanctuariesAndParksMr: ['तुंगारेश्वर वन्यजीव अभयारण्य'],
    mineralsAndIndustriesMr: ['तारापूर अणुऊर्जा केंद्र (TAPS - भारतातील पहिले अणुऊर्जा केंद्र १९६९)', 'तारापूर MIDC'],
    mpscGoldenFactsMr: [
      'महाराष्ट्रातील ३६ वा जिल्हा (निर्मिती: १ ऑगस्ट २०१४).',
      'जव्हार हे पालघर जिल्ह्यातील "मिनी महाबळेश्वर" व वारली चित्रकलेचे प्रमुख केंद्र आहे.',
      'वाडा कोलम तांदूळ व डहाणूच्या चिकूला भौगोलिक मानांकन (GI मानांकन) प्राप्त आहे.'
    ],
    literacyRatePercent: 66.65,
    sexRatio: 921,
    rtoCode: 'MH-48'
  },
  {
    id: 'raigad',
    nameMr: 'रायगड',
    nameEn: 'Raigad',
    divisionId: 'konkan',
    divisionNameMr: 'कोकण विभाग',
    divisionNameEn: 'Konkan',
    hqMr: 'अलिबाग',
    hqEn: 'Alibaug',
    areaSqKm: 7152,
    talukasCount: 15,
    prominentTalukasMr: ['अलिबाग', 'पेण', 'पनवेल', 'कर्जत', 'महाड', 'रोहा', 'माणगाव', 'श्रीवर्धन', 'मुरूड'],
    majorRiversMr: ['सावित्री नदी', 'कुंडलिका', 'अंबा नदी', 'पाताळगंगा', 'काळ नदी'],
    historicalFortsMr: ['किल्ले रायगड (शिवछत्रपतींची राजधानी)', 'मुरूड-जंजिरा (अजिंक्य जलदुर्ग)', 'कोर्लई किल्ला', 'सुधागड', 'सरसगड'],
    majorCropsMr: ['भात', 'नारळ', 'सुपारी', 'पांढरा कांदा (अलिबाग GI Tag)'],
    sanctuariesAndParksMr: ['कर्नाळा पक्षी अभयारण्य (महाराष्ट्रातील पहिले पक्षी अभयारण्य)'],
    mineralsAndIndustriesMr: ['बॉक्साईट खडक (रोहा, श्रीवर्धन)', 'रसायन उद्योग (पाताळगंगा MIDC)', 'JNPT न्हावा शेवा बंदर'],
    mpscGoldenFactsMr: [
      '१ जानेवारी १९८१ पूर्वी या जिल्ह्याचे नाव "कुलाबा" असे होते.',
      'महाड चवदार तळे सत्याग्रह (२० मार्च १९२७ - डॉ. बाबासाहेब आंबेडकर) याच जिल्ह्यात झाला.',
      'अलिबागच्या प्रसिद्ध पांढऱ्या कांद्याला व पेणच्या गणेशमूर्तींना आंतरराष्ट्रीय ख्याती आहे.'
    ],
    literacyRatePercent: 83.14,
    sexRatio: 959,
    rtoCode: 'MH-06, MH-46'
  },
  {
    id: 'ratnagiri',
    nameMr: 'रत्नागिरी',
    nameEn: 'Ratnagiri',
    divisionId: 'konkan',
    divisionNameMr: 'कोकण विभाग',
    divisionNameEn: 'Konkan',
    hqMr: 'रत्नागिरी',
    hqEn: 'Ratnagiri',
    areaSqKm: 8208,
    talukasCount: 9,
    prominentTalukasMr: ['रत्नागिरी', 'चिपळूण', 'दापोली', 'खेड', 'गुहागर', 'संगमेश्वर', 'राजापूर', 'मंडणगड', 'लांजा'],
    majorRiversMr: ['वाशिष्ठी नदी', 'शास्त्री नदी', 'काजळी नदी', 'मुचकुंदी नदी', 'बाव नदी'],
    historicalFortsMr: ['रत्नदुर्ग (भगवती किल्ला)', 'गोपाळगड', 'जयगड जलदुर्ग', 'कनकदुर्ग', 'पूर्णगड'],
    majorCropsMr: ['हापूस आंबा (Alphonso GI Tag)', 'काजू', 'नारळ', 'सुपारी', 'कोकम'],
    sanctuariesAndParksMr: ['अंबाघाट परिसर'],
    mineralsAndIndustriesMr: ['बॉक्साईट', 'जांभा दगड (Laterite)', 'मत्स्य प्रक्रिया उद्योग', 'जैतापूर अणुऊर्जा प्रकल्प (प्रस्तावित)'],
    mpscGoldenFactsMr: [
      'भारतरत्न महर्षी धोंडो केशव कर्वे, लोकमान्य बाळ गंगाधर टिळक व स्वातंत्र्यवीर सावरकर यांची जन्मभूमी/कर्मभूमी.',
      'महाराष्ट्रात सर्वाधिक समुद्रकिनारा लाभलेला जिल्हा (सुमारे २३७ किमी).',
      'दापोली येथे डॉ. बाळासाहेब सावंत कोकण कृषी विद्यापीठ (स्थापना: १९७२) स्थित आहे.'
    ],
    literacyRatePercent: 82.18,
    sexRatio: 1122,
    rtoCode: 'MH-08'
  },
  {
    id: 'sindhudurg',
    nameMr: 'सिंधुदुर्ग',
    nameEn: 'Sindhudurg',
    divisionId: 'konkan',
    divisionNameMr: 'कोकण विभाग',
    divisionNameEn: 'Konkan',
    hqMr: 'ओरोस (Oros)',
    hqEn: 'Oros',
    areaSqKm: 5207,
    talukasCount: 8,
    prominentTalukasMr: ['कणकवली', 'कुडाळ', 'सावंतवाडी', 'मालवण', 'वेंगुर्ला', 'देवगड', 'वैभववाडी', 'दोडामार्ग'],
    majorRiversMr: ['तेरेखोल नदी', 'गड नदी', 'कर्ली नदी', 'शुक नदी', 'तिलारी नदी'],
    historicalFortsMr: ['सिंधुदुर्ग किल्ला (छत्रपती शिवाजी महाराजांनी १६६४ मध्ये बांधलेला जलदुर्ग)', 'विजयदुर्ग', 'पद्मगड', 'रांगणा किल्ला'],
    majorCropsMr: ['देवगड हापूस आंबा (GI Tag)', 'काजू', 'वेंगुर्ला काजू संशोधन केंद्र', 'नारळ'],
    sanctuariesAndParksMr: ['मालवण सागरी अभयारण्य (सागरी जीवसृष्टी)'],
    mineralsAndIndustriesMr: ['लोहखनिज (रेड्डी बंदर)', 'मँगनीज', 'बॉक्साईट', 'सावंतवाडी लाकडी खेळणी (GI Tag)'],
    mpscGoldenFactsMr: [
      'महाराष्ट्रातील पहिला "पर्यटन जिल्हा" (१९९७ मध्ये घोषित).',
      'महाराष्ट्रात २०११ च्या जनगणनेनुसार सर्वाधिक लिंगगुणोत्तर असणारा तिसरा जिल्हा (१०३६).',
      'महाराष्ट्रात सर्वात जास्त पाऊस पडणारे ठिकाण "आंबोली" (सावंतवाडी तालुका - सुमारे ७५० सेमी) याच जिल्ह्यात आहे.'
    ],
    literacyRatePercent: 85.56,
    sexRatio: 1036,
    rtoCode: 'MH-07'
  },

  // ==========================================
  // २. पुणे विभाग (पश्चिम महाराष्ट्र - ५ जिल्हे)
  // ==========================================
  {
    id: 'pune',
    nameMr: 'पुणे',
    nameEn: 'Pune',
    divisionId: 'pune',
    divisionNameMr: 'पुणे विभाग',
    divisionNameEn: 'Pune',
    hqMr: 'पुणे',
    hqEn: 'Pune',
    areaSqKm: 15643,
    talukasCount: 14,
    prominentTalukasMr: ['पुणे शहर', 'हवेली', 'बारामती', 'जुन्नर', 'शिरूर', 'खेड (राजगुरुनगर)', 'आंबेगाव', 'मावळ', 'मुळशी', 'भोर', 'वेल्हे', 'पुरंदर', 'दौंड', 'इंदापूर'],
    majorRiversMr: ['भीमा नदी', 'मुळा नदी', 'मुठा नदी', 'इंद्रायणी', 'घोड नदी', 'कऱ्हा नदी', 'नीरा नदी'],
    historicalFortsMr: ['सिंहगड', 'शिवनेरी (छत्रपती शिवाजी महाराज जन्मस्थान)', 'तोरणा (पहिले तोरण)', 'राजगड (पहिली राजधानी)', 'लोहगड', 'पुरंदर किल्ला'],
    majorCropsMr: ['ऊस', 'द्राक्षे', 'ज्वारी', 'जुन्नरचे हापूस टोमॅटो', 'अंजीर (राजेवाडी पुरंदर GI Tag)'],
    sanctuariesAndParksMr: ['भीमाशंकर वन्यजीव अभयारण्य (शेकरू - राज्य प्राणी खार)', 'मयूरेश्वर अभयारण्य (सुपे मोरांसाठी)'],
    mineralsAndIndustriesMr: ['ऑटोमोबाईल हब (टाटा मोटर्स, बजाज - पिंपरी चिंचवड)', 'IT पार्क (हिंजवडी)', 'साखर कारखाने'],
    mpscGoldenFactsMr: [
      'विद्येचे माहेरघर; सावित्रीबाई फुले पुणे विद्यापीठ (१९४९).',
      'अष्टविनायकांपैकी सर्वाधिक ५ गणपती पुणे जिल्ह्यात आहेत (लेण्याद्री, ओझर, थेऊर, रांजणगाव, मोरगाव).',
      'महाराष्ट्रातील सर्वाधिक साखर कारखाने असणाऱ्या आघाडीच्या जिल्ह्यांपैकी एक.'
    ],
    literacyRatePercent: 86.15,
    sexRatio: 915,
    rtoCode: 'MH-12, MH-14'
  },
  {
    id: 'satara',
    nameMr: 'सातारा',
    nameEn: 'Satara',
    divisionId: 'pune',
    divisionNameMr: 'पुणे विभाग',
    divisionNameEn: 'Pune',
    hqMr: 'सातारा',
    hqEn: 'Satara',
    areaSqKm: 10480,
    talukasCount: 11,
    prominentTalukasMr: ['सातारा', 'कराड', 'महाबळेश्वर', 'वाई', 'जावळी', 'पाटण', 'कोरेगाव', 'खटाव', 'माण', 'फलटण', 'खंडाळा'],
    majorRiversMr: ['कृष्णा नदी', 'कोयना नदी', 'वेण्णा नदी', 'उरमोडी नदी', 'नीरा नदी'],
    historicalFortsMr: ['अजिंक्यतारा', 'प्रतापगड (अफझलखान वध)', 'सज्जनगड (समर्थ रामदास समाधी)', 'कमळगड', 'मकरंदगड'],
    majorCropsMr: ['ऊस', 'स्ट्रॉबेरी (महाबळेश्वर GI Tag)', 'हळद', 'ज्वारी', 'सोयाबीन'],
    sanctuariesAndParksMr: ['कास पठार (UNESCO जागतिक नैसर्गिक वारसा स्थळ)', 'कोयना वन्यजीव अभयारण्य'],
    mineralsAndIndustriesMr: ['कोयना जलविद्युत प्रकल्प (महाराष्ट्राची भाग्यलक्ष्मी)', 'साखर उद्योग', 'दुग्ध व्यवसाय'],
    mpscGoldenFactsMr: [
      'क्रांतिसिंह नाना पाटील यांचे "प्रतिसरकार" (१९४२) साताऱ्यात स्थापन झाले होते.',
      'महाराष्ट्राचे पहिले मुख्यमंत्री यशवंतराव चव्हाण यांची समाधी "प्रीतीसंगम" (कृष्णा-कोयना संगम, कराड) येथे आहे.',
      'कास पठाराला २०१२ मध्ये युनेस्कोने जागतिक वारसा स्थळ म्हणून घोषित केले.'
    ],
    literacyRatePercent: 82.87,
    sexRatio: 988,
    rtoCode: 'MH-11'
  },
  {
    id: 'sangli',
    nameMr: 'सांगली',
    nameEn: 'Sangli',
    divisionId: 'pune',
    divisionNameMr: 'पुणे विभाग',
    divisionNameEn: 'Pune',
    hqMr: 'सांगली',
    hqEn: 'Sangli',
    areaSqKm: 8572,
    talukasCount: 10,
    prominentTalukasMr: ['मिरज', 'तासगाव', 'खानापूर (विटा)', 'आटपाडी', 'कवठे महांकाळ', 'जत', 'वाळवा (इस्लामपूर)', 'शिराळा', 'कडेगाव', 'पलूस'],
    majorRiversMr: ['कृष्णा नदी', 'वारणा नदी', 'येरळा नदी', 'अग्रणी नदी'],
    historicalFortsMr: ['प्रचितगड', 'भूपालगड', 'दंडोबा टेकडी'],
    majorCropsMr: ['हळद (सांगली हळदीचे आशियातील सर्वात मोठे मार्केट GI Tag)', 'द्राक्षे व बेदाणे (तासगाव)', 'ऊस'],
    sanctuariesAndParksMr: ['चांदोली राष्ट्रीय उद्यान (काही भाग)', 'सागरेश्वर अभयारण्य (मानवनिर्मित वन्यजीव अभयारण्य)'],
    mineralsAndIndustriesMr: ['साखर कारखाने', 'मिरज - तंतुवाद्य निर्मिती केंद्र (सतार, तानपुरा GI Tag)', 'टेक्सटाईल पार्क'],
    mpscGoldenFactsMr: [
      'नाट्यपंढरी: मराठी नाट्यसृष्टीचे जनक अण्णासाहेब किर्लोस्कर व विष्णूदास भावे यांचे कार्यक्षेत्र.',
      'सागरेश्वर अभयारण्य हे भारतातील पहिले "मानवनिर्मित वन्यजीव अभयारण्य" आहे.',
      'शिराळा तालुका ३२ शिराळा नागपंचमी उत्सवासाठी प्रसिद्ध आहे.'
    ],
    literacyRatePercent: 81.48,
    sexRatio: 966,
    rtoCode: 'MH-10'
  },
  {
    id: 'solapur',
    nameMr: 'सोलापूर',
    nameEn: 'Solapur',
    divisionId: 'pune',
    divisionNameMr: 'पुणे विभाग',
    divisionNameEn: 'Pune',
    hqMr: 'सोलापूर',
    hqEn: 'Solapur',
    areaSqKm: 14895,
    talukasCount: 11,
    prominentTalukasMr: ['उत्तर सोलापूर', 'दक्षिण सोलापूर', 'बार्शी', 'अक्कलकोट', 'मोहोळ', 'पंढरपूर', 'माळशिरस', 'सांगोला', 'मंगळवेढा', 'करमाळा', 'माढा'],
    majorRiversMr: ['भीमा नदी (पंढरपुरात "चंद्रभागा")', 'सीना नदी', 'भोगावती नदी', 'मान नदी'],
    historicalFortsMr: ['सोलापूरचा भुईकोट किल्ला (जलकोट)', 'करमाळा किल्ला'],
    majorCropsMr: ['ज्वारी (ज्वारीचे कोठार - मालदांडी ज्वारी)', 'डाळिंब (सांगोला GI Tag)', 'ऊस'],
    sanctuariesAndParksMr: ['माळढोक पक्षी अभयारण्य (Great Indian Bustard - नान्नज)'],
    mineralsAndIndustriesMr: ['सोलापुरी चादरी व टॉवेल्स (GI Tag)', 'साखर कारखाने (राज्यात सर्वाधिक साखर कारखाने)', 'विडी उद्योग'],
    mpscGoldenFactsMr: [
      'पंढरपूर: वारकरी संप्रदायाचे मुख्य तीर्थक्षेत्र (विठ्ठल-रुक्मिणी मंदिर).',
      '९ ते ११ मे १९३० रोजी स्वातंत्र्य चळवळीत सोलापूरने ४ दिवस "मार्शल लॉ" झुगारून स्वतंत्र सरकार चालवले (चार हुतात्मे: मल्लप्पा धनशेट्टी, किसन सारडा, जगन्नाथ शिंदे, कुर्बान हुसेन).',
      'महाराष्ट्रात रब्बी ज्वारीचे सर्वाधिक उत्पादन सोलापूर जिल्ह्यात होते.'
    ],
    literacyRatePercent: 77.02,
    sexRatio: 938,
    rtoCode: 'MH-13, MH-45'
  },
  {
    id: 'kolhapur',
    nameMr: 'कोल्हापूर',
    nameEn: 'Kolhapur',
    divisionId: 'pune',
    divisionNameMr: 'पुणे विभाग',
    divisionNameEn: 'Pune',
    hqMr: 'कोल्हापूर',
    hqEn: 'Kolhapur',
    areaSqKm: 7685,
    talukasCount: 12,
    prominentTalukasMr: ['करवीर', 'पन्हाळा', 'शाहूवाडी', 'कागल', 'हातकणंगले', 'शिरोळ', 'राधानगरी', 'गगनबावडा', 'भुदरगड', 'आजरा', 'गडहिंग्लज', 'चंदगड'],
    majorRiversMr: ['पंचगंगा नदी (कुंभी, कासारी, तुळशी, भोगावती, सरस्वती)', 'वारणा नदी', 'दूधगंगा', 'वेदगंगा', 'हिरण्यकेशी'],
    historicalFortsMr: ['पन्हाळगड (बाजीप्रभू देशपांडे पावनखिंड पराक्रम)', 'विशाळगड', 'रांगणा किल्ला', 'भुदरगड'],
    majorCropsMr: ['ऊस (सर्वाधिक हेक्टरी उत्पादन)', 'कोल्हापुरी गूळ (GI Tag)', 'भात (आजरा घनसाळ तांदूळ GI Tag)'],
    sanctuariesAndParksMr: ['राधानगरी वन्यजीव अभयारण्य (दाजीपूर - रानगव्यांसाठी प्रसिद्ध, पहिले अभयारण्य १९५८)'],
    mineralsAndIndustriesMr: ['बॉक्साईट खडक', 'फाउंड्री उद्योग व इंजिनिअरिंग', 'कोल्हापुरी चप्पल (GI Tag)', 'इचलकरंजी (महाराष्ट्राचे मँचेस्टर)'],
    mpscGoldenFactsMr: [
      'राजर्षी छत्रपती शाहू महाराज यांची कर्मभूमी; सामाजिक समतेची व कुस्तीची पंढरी.',
      'इचलकरंजी हे शहर वस्त्रोद्योगामुळे "महाराष्ट्राचे मँचेस्टर" म्हणून ओळखले जाते.',
      'राधानगरी हे महाराष्ट्रातील पहिले वन्यजीव अभयारण्य (१९५८ - रानगव्यांसाठी).'
    ],
    literacyRatePercent: 81.51,
    sexRatio: 957,
    rtoCode: 'MH-09, MH-51'
  },

  // ==========================================
  // ३. नाशिक विभाग (उत्तर महाराष्ट्र / खानदेश - ५ जिल्हे)
  // ==========================================
  {
    id: 'nashik',
    nameMr: 'नाशिक',
    nameEn: 'Nashik',
    divisionId: 'nashik',
    divisionNameMr: 'नाशिक विभाग',
    divisionNameEn: 'Nashik',
    hqMr: 'नाशिक',
    hqEn: 'Nashik',
    areaSqKm: 15530,
    talukasCount: 15,
    prominentTalukasMr: ['नाशिक', 'दिंडोरी', 'इगतपुरी', 'पेठ', 'त्र्यंबकेश्वर', 'कळवण', 'सुरगाणा', 'सिन्नर', 'निफाड', 'चांदवड', 'नांदगाव', 'येवला', 'मालेगाव', 'सटाणा (बागलाण)', 'देवळा'],
    majorRiversMr: ['गोदावरी नदी (त्र्यंबकेश्वर येथे उगम)', 'गिरणा नदी', 'दारणा नदी', 'कडवा नदी', 'दमणगंगा'],
    historicalFortsMr: ['साल्हेर (महाराष्ट्रातील दुसऱ्या क्रमांकाचे सर्वोच्च शिखर १५६७ मी)', 'मुल्हेर', 'अंजनेरी (हनुमान जन्मस्थान)', 'हरिहर किल्ला', 'रामशेज'],
    majorCropsMr: ['द्राक्षे (भारताची वाईनर राजधानी / Grape City GI Tag)', 'कांदा (लासलगाव आशियातील सर्वात मोठी कांदा बाजारपेठ)', 'टोमॅटो'],
    sanctuariesAndParksMr: ['नांदूर मध्यमेश्वर पक्षी अभयारण्य (महाराष्ट्रातील पहिले रामसार स्थळ - Ramsar Site २०२०)'],
    mineralsAndIndustriesMr: ['करन्सी नोट प्रेस (CNP) व इंडिया सिक्युरिटी प्रेस (ISP)', 'HAL ओझर (लढाऊ विमाने)', 'महिंद्रा अँड महिंद्रा', 'येवला पैठणी (GI Tag)'],
    mpscGoldenFactsMr: [
      'गोदावरी नदीचा उगम त्र्यंबकेश्वर येथील ब्रह्मगिरी पर्वतात होतो; दर १२ वर्षांनी सिंहस्थ कुंभमेळा भरतो.',
      'नांदूर मध्यमेश्वर (निफाड) हे महाराष्ट्रातील पहिले "रामसार पाणथळ स्थळ" ठरले.',
      'स्वातंत्र्यवीर सावरकरांनी १९०४ मध्ये "अभिनव भारत" क्रांतिकारी संघटनेची स्थापना नाशिकमध्ये केली.'
    ],
    literacyRatePercent: 82.31,
    sexRatio: 934,
    rtoCode: 'MH-15, MH-41, MH-54'
  },
  {
    id: 'ahilyanagar',
    nameMr: 'अहिल्यानगर (अहमदनगर)',
    nameEn: 'Ahilyanagar (Ahmednagar)',
    divisionId: 'nashik',
    divisionNameMr: 'नाशिक विभाग',
    divisionNameEn: 'Nashik',
    hqMr: 'अहिल्यानगर',
    hqEn: 'Ahilyanagar',
    areaSqKm: 17048,
    talukasCount: 14,
    prominentTalukasMr: ['नगर', 'राहुरी', 'नेवासा', 'शेवगाव', 'पाथर्डी', 'जामखेड', 'कर्जत', 'श्रीगोंदा', 'पारनेर', 'संगमनेर', 'अकोले', 'कोपरगाव', 'श्रीरामपूर', 'राहाता'],
    majorRiversMr: ['गोदावरी नदी', 'प्रवरा नदी', 'मुळा नदी', 'सीना नदी', 'कुकडी नदी'],
    historicalFortsMr: ['अहमदनगर भुईकोट किल्ला (पंडित नेहरूंनी डिस्कव्हरी ऑफ इंडिया ग्रंथ लिहिला)', 'हरिश्चंद्रगड', 'रतनगड', 'विश्रामगड'],
    majorCropsMr: ['ऊस', 'डाळिंब', 'ज्वारी', 'बाजरी', 'दूध उत्पादन (संगमनेर, श्रीरामपूर)'],
    sanctuariesAndParksMr: ['कळसूबाई हरिश्चंद्रगड अभयारण्य', 'रेहेकुरी काळवीट अभयारण्य (कर्जत - Blackbuck)'],
    mineralsAndIndustriesMr: ['सहकारी साखर कारखाने (प्रवरानगर लोणी - आशियातील पहिला सहकारी साखर कारखाना १९५० विठ्ठलराव विखे पाटील)'],
    mpscGoldenFactsMr: [
      'महाराष्ट्रातील क्षेत्रफळाच्या दृष्टीने सर्वात मोठा जिल्हा (१७,०४८ चौ.किमी).',
      'महाराष्ट्रातील सर्वोच्च शिखर "कळसूबाई" (१६४६ मीटर, अकोले तालुका) याच जिल्ह्यात आहे.',
      'राहुरी येथे "महात्मा फुले कृषी विद्यापीठ" (स्थापना: १९६८) कार्यरत आहे.',
      'राळेगणसिद्धी (अण्णा हजारे) व हिवरे बाजार (पोपटराव पवार) हे आदर्श जलसंधारण गावे याच जिल्ह्यात आहेत.'
    ],
    literacyRatePercent: 79.05,
    sexRatio: 939,
    rtoCode: 'MH-16, MH-17'
  },
  {
    id: 'jalgaon',
    nameMr: 'जळगाव',
    nameEn: 'Jalgaon',
    divisionId: 'nashik',
    divisionNameMr: 'नाशिक विभाग',
    divisionNameEn: 'Nashik',
    hqMr: 'जळगाव',
    hqEn: 'Jalgaon',
    areaSqKm: 11765,
    talukasCount: 15,
    prominentTalukasMr: ['जळगाव', 'भुसावळ', 'एरंडोल', 'धरणगाव', 'अमळनेर', 'पारोळा', 'चाळीसगाव', 'जामनेर', 'रावेर', 'मुक्ताईनगर', 'बोदवड', 'यावल', 'चोपडा', 'पाचोरा', 'भडगाव'],
    majorRiversMr: ['तापी नदी (प्रमुख पश्चिमवाहिनी नदी)', 'पूर्णा नदी', 'गिरणा नदी', 'वाघूर नदी', 'बोरी नदी'],
    historicalFortsMr: ['पारोळा भुईकोट किल्ला (झाशीची राणी लक्ष्मीबाई माहेर)', 'कनक्रा किल्ला'],
    majorCropsMr: ['केळी (महाराष्ट्राची बनाना सिटी - जळगाव केळी GI Tag)', 'कापूस (सफेद सोने)', 'ज्वारी'],
    sanctuariesAndParksMr: ['यावल वन्यजीव अभयारण्य'],
    mineralsAndIndustriesMr: ['सुवर्ण नगरी (शुद्ध सोन्याची बाजारपेठ)', 'जैन इरिगेशन (ठिबक सिंचन)', 'भुसावळ रेल्वे जंक्शन व औष्णिक वीज केंद्र (Deepnagar)'],
    mpscGoldenFactsMr: [
      'कवयित्री बहिणाबाई चौधरी यांची जन्मभूमी व कर्मभूमी; उत्तर महाराष्ट्र विद्यापीठाला त्यांचे नाव दिले आहे.',
      'चांगदेव येथे तापी-पूर्णा नद्यांचा प्रसिद्ध संगम होतो.',
      'अमळनेर येथे साने गुरुजींनी पूज्य साने गुरुजी छात्रालय स्थापन केले होते.'
    ],
    literacyRatePercent: 78.20,
    sexRatio: 925,
    rtoCode: 'MH-19'
  },
  {
    id: 'dhule',
    nameMr: 'धुळे',
    nameEn: 'Dhule',
    divisionId: 'nashik',
    divisionNameMr: 'नाशिक विभाग',
    divisionNameEn: 'Nashik',
    hqMr: 'धुळे',
    hqEn: 'Dhule',
    areaSqKm: 8063,
    talukasCount: 4,
    prominentTalukasMr: ['धुळे', 'साक्री', 'शिंदखेडा', 'शिरपूर'],
    majorRiversMr: ['तापी नदी', 'पांझरा नदी', 'बोरी नदी', 'अनेर नदी'],
    historicalFortsMr: ['लळिंग किल्ला', 'भामेर किल्ला', 'सोनगीर किल्ला'],
    majorCropsMr: ['कापूस', 'बाजरी', 'मका', 'ज्वारी', 'मिरची'],
    sanctuariesAndParksMr: ['अनेर धरण अभयारण्य'],
    mineralsAndIndustriesMr: ['कापड उद्योग', 'दूध पावडर व प्रक्रिया प्रकल्प', 'सौर ऊर्जा प्रकल्प (साक्री - आशियातील मोठा सोलर पार्क)'],
    mpscGoldenFactsMr: [
      '१ जुलै १९९८ रोजी धुळे जिल्ह्याचे विभाजन होऊन "नंदुरबार" जिल्हा निर्माण झाला.',
      'शिरपूर पॅटर्न: जलसंधारणासाठी सुरेश खानापूरकर यांनी विकसित केलेला बंधारे मॉडेल.',
      'समर्थ वाग्देवता मंदिर (रामदास स्वामींचे साहित्य संकलन केंद्र) धुळे शहरात आहे.'
    ],
    literacyRatePercent: 72.80,
    sexRatio: 946,
    rtoCode: 'MH-18'
  },
  {
    id: 'nandurbar',
    nameMr: 'नंदुरबार',
    nameEn: 'Nandurbar',
    divisionId: 'nashik',
    divisionNameMr: 'नाशिक विभाग',
    divisionNameEn: 'Nashik',
    hqMr: 'नंदुरबार',
    hqEn: 'Nandurbar',
    areaSqKm: 5035,
    talukasCount: 6,
    prominentTalukasMr: ['नंदुरबार', 'नवापूर', 'शहादा', 'तळोदा', 'अक्राणी (धडगाव)', 'अक्कलकुवा'],
    majorRiversMr: ['नर्मदा नदी (महाराष्ट्राची उत्तर सीमा ५४ किमी)', 'तापी नदी', 'गोमाई नदी'],
    historicalFortsMr: ['तोरणमाळ किल्ला', 'अक्राणी किल्ला'],
    majorCropsMr: ['मिरची (नंदुरबार लाल मिरचीचे देशातील मोठे मार्केट)', 'कापूस', 'ज्वारी', 'तूर'],
    sanctuariesAndParksMr: ['तोरणमाळ थंड हवेचे ठिकाण (सातपुडा पर्वत रांगेतील दुसरे सर्वोच्च शिखर सीताखाई)'],
    mineralsAndIndustriesMr: ['पवनचक्की ऊर्जा प्रकल्प (सातपुडा पठार)', 'लाकूड व वनोपज संकलन'],
    mpscGoldenFactsMr: [
      'महाराष्ट्रातील १००% "आदिवासी जिल्हा" म्हणून ओळख (आदिवासी लोकसंख्येचे सर्वाधिक प्रमाण सुमारे ६९.३%).',
      'भारतातील पहिल्या आधार कार्ड (Aadhaar Card) चे वाटप याच जिल्ह्यातील "टेंभली" गावात २९ सप्टेंबर २०१० रोजी झाले.',
      '९ सप्टेंबर १९४२ च्या चले जाव आंदोलनात तिरंगा हातात घेऊन हौतात्म्य पत्करणारा बालवीर शिरीषकुमार नंदुरबारचा होता.'
    ],
    literacyRatePercent: 64.38,
    sexRatio: 978,
    rtoCode: 'MH-39'
  },

  // ==========================================
  // ४. छत्रपती संभाजीनगर विभाग (मराठवाडा - ८ जिल्हे)
  // ==========================================
  {
    id: 'chhatrapati_sambhajinagar',
    nameMr: 'छत्रपती संभाजीनगर (औरंगाबाद)',
    nameEn: 'Chhatrapati Sambhajinagar',
    divisionId: 'chhatrapati_sambhajinagar',
    divisionNameMr: 'छत्रपती संभाजीनगर विभाग',
    divisionNameEn: 'Chhatrapati Sambhajinagar',
    hqMr: 'छत्रपती संभाजीनगर',
    hqEn: 'Chhatrapati Sambhajinagar',
    areaSqKm: 10107,
    talukasCount: 9,
    prominentTalukasMr: ['संभाजीनगर', 'पैठण', 'गंगापूर', 'वैजापूर', 'कन्नड', 'सिल्लोड', 'सोयगाव', 'फुलंब्री', 'खुलताबाद'],
    majorRiversMr: ['गोदावरी नदी', 'शिवणा नदी', 'पूर्णा नदी', 'खाम नदी'],
    historicalFortsMr: ['दौलताबाद किल्ला (देवगिरी - यादवकालीन अभेद्य किल्ला)', 'अंतूर किल्ला'],
    majorCropsMr: ['कापूस', 'बाजरी', 'मका', 'पैठणची मोसंबी'],
    sanctuariesAndParksMr: ['गौताळा औट्रमघाट अभयारण्य', 'जायकवाडी पक्षी अभयारण्य (नाथसागर)'],
    mineralsAndIndustriesMr: ['ऑटोमोबाईल MIDC (बजाज, स्कोडा)', 'फार्मास्युटिकल कंपन्या', 'पैठणी साडी (पैठण GI Tag)', 'हिमरू शाल'],
    mpscGoldenFactsMr: [
      'महाराष्ट्राची अधिकृत "पर्यटन राजधानी"; अजिंठा व वेरूळ लेण्या (UNESCO जागतिक वारसा स्थळे).',
      'जायकवाडी धरण (नाथसागर) हे गोदावरी नदीवरील महाराष्ट्रातील सर्वात मोठे मातीचे धरण आहे.',
      'डॉ. बाबासाहेब आंबेडकर मराठवाडा विद्यापीठ (BAMU, स्थापना: १९५८) येथे आहे.'
    ],
    literacyRatePercent: 79.02,
    sexRatio: 923,
    rtoCode: 'MH-20'
  },
  {
    id: 'jalna',
    nameMr: 'जालना',
    nameEn: 'Jalna',
    divisionId: 'chhatrapati_sambhajinagar',
    divisionNameMr: 'छत्रपती संभाजीनगर विभाग',
    divisionNameEn: 'Chhatrapati Sambhajinagar',
    hqMr: 'जालना',
    hqEn: 'Jalna',
    areaSqKm: 7718,
    talukasCount: 8,
    prominentTalukasMr: ['जालना', 'बदनापूर', 'भोकरदन', 'जाफ्राबाद', 'परतूर', 'मंठा', 'अंबड', 'घनसावंगी'],
    majorRiversMr: ['गोदावरी नदी', 'पूर्णा नदी', 'दुधना नदी', 'कुंडलिका नदी'],
    historicalFortsMr: ['रोहिलागड', 'भोकरदन पुरातन उत्खनन स्थळ'],
    majorCropsMr: ['मोसंबी (महाराष्ट्राची मोसंबी राजधानी)', 'कापूस', 'सोयाबीन', 'ज्वारी'],
    sanctuariesAndParksMr: ['अंबड टेकडी परिसर'],
    mineralsAndIndustriesMr: ['स्टील व रोलिंग मिल्स (महाराष्ट्राचे स्टील सिटी)', 'बियाणे उद्योग (महिको, बारवाले बियाणे हब)'],
    mpscGoldenFactsMr: [
      '१ मे १९८१ रोजी छत्रपती संभाजीनगर (औरंगाबाद) जिल्ह्याचे विभाजन होऊन जालना जिल्हा निर्माण झाला.',
      'समर्थ रामदास स्वामींचे जन्मस्थान "जांब समर्थ" (घनसावंगी तालुका) जालना जिल्ह्यात आहे.',
      'जालना हे संकरीत बियाणे उत्पादनाचे भारतातील प्रमुख केंद्र मानले जाते.'
    ],
    literacyRatePercent: 71.52,
    sexRatio: 937,
    rtoCode: 'MH-21'
  },
  {
    id: 'parbhani',
    nameMr: 'परभणी',
    nameEn: 'Parbhani',
    divisionId: 'chhatrapati_sambhajinagar',
    divisionNameMr: 'छत्रपती संभाजीनगर विभाग',
    divisionNameEn: 'Chhatrapati Sambhajinagar',
    hqMr: 'परभणी',
    hqEn: 'Parbhani',
    areaSqKm: 6511,
    talukasCount: 9,
    prominentTalukasMr: ['परभणी', 'जिंतूर', 'सेलू', 'मानवत', 'पाथरी', 'सोनपेठ', 'गंगाखेड', 'पालम', 'पूर्णा'],
    majorRiversMr: ['गोदावरी नदी', 'पूर्णा नदी', 'दुधना नदी'],
    historicalFortsMr: ['जिंतूर जैन लेणी व किल्ले टेकडी'],
    majorCropsMr: ['कापूस', 'सोयाबीन', 'तूर', 'ज्वारी'],
    sanctuariesAndParksMr: ['येलदरी धरण परिसर'],
    mineralsAndIndustriesMr: ['जिनिंग व प्रेसिंग मिल्स', 'येलदरी जलविद्युत प्रकल्प', 'साखर कारखाने'],
    mpscGoldenFactsMr: [
      'वसंतराव नाईक मराठवाडा कृषी विद्यापीठ (VNMKV, स्थापना: १९७२) परभणी येथे आहे.',
      'संत जनाबाईंची जन्मभूमी व समाधीस्थान "गंगाखेड" (गोदावरी काठी) याच जिल्ह्यात आहे.',
      '१ मे १९९९ रोजी परभणी जिल्ह्याचे विभाजन होऊन "हिंगोली" जिल्हा निर्माण झाला.'
    ],
    literacyRatePercent: 73.34,
    sexRatio: 947,
    rtoCode: 'MH-22'
  },
  {
    id: 'hingoli',
    nameMr: 'हिंगोली',
    nameEn: 'Hingoli',
    divisionId: 'chhatrapati_sambhajinagar',
    divisionNameMr: 'छत्रपती संभाजीनगर विभाग',
    divisionNameEn: 'Chhatrapati Sambhajinagar',
    hqMr: 'हिंगोली',
    hqEn: 'Hingoli',
    areaSqKm: 4526,
    talukasCount: 5,
    prominentTalukasMr: ['हिंगोली', 'कळमनुरी', 'वसमत', 'सेनगाव', 'औंढा नागनाथ'],
    majorRiversMr: ['कयाधू नदी', 'पूर्णा नदी', 'पैनगंगा नदी'],
    historicalFortsMr: ['औंढा नागनाथ ऐतिहासिक परिसर'],
    majorCropsMr: ['हळद (हिंगोलीचे हळद मार्केट प्रसिद्ध)', 'सोयाबीन', 'कापूस'],
    sanctuariesAndParksMr: ['इसलापूर परिसर'],
    mineralsAndIndustriesMr: ['हळद प्रक्रिया उद्योग', 'LIGO-India (आंतरराष्ट्रीय गुरुत्वाकर्षण लहरी वेधशाळा - औंढा तालुका)'],
    mpscGoldenFactsMr: [
      '१२ ज्योतिर्लिंगांपैकी ८ वे ज्योतिर्लिंग "औंढा नागनाथ" हिंगोली जिल्ह्यात आहे (हे आद्य ज्योतिर्लिंग मानले जाते).',
      'LIGO-India (Laser Interferometer Gravitational-Wave Observatory): जागतिक पातळीवरील खगोलशास्त्रीय प्रकल्प हिंगोलीत उभारला जात आहे.',
      'हिंगोलीतील दसरा महोत्सव हा मराठवाड्यातील प्रसिद्ध ऐतिहासिक उत्सव आहे.'
    ],
    literacyRatePercent: 78.17,
    sexRatio: 942,
    rtoCode: 'MH-38'
  },
  {
    id: 'nanded',
    nameMr: 'नांदेड',
    nameEn: 'Nanded',
    divisionId: 'chhatrapati_sambhajinagar',
    divisionNameMr: 'छत्रपती संभाजीनगर विभाग',
    divisionNameEn: 'Chhatrapati Sambhajinagar',
    hqMr: 'नांदेड',
    hqEn: 'Nanded',
    areaSqKm: 10528,
    talukasCount: 16,
    prominentTalukasMr: ['नांदेड', 'अर्धापूर', 'मुदखेड', 'भोकर', 'उमरी', 'धर्माबाद', 'बिलोली', 'नायगाव', 'लोहा', 'कंधार', 'मुखेड', 'देगलूर', 'किनवट', 'माहूर', 'हदगाव', 'हिमायतनगर'],
    majorRiversMr: ['गोदावरी नदी', 'पैनगंगा नदी', 'मांजरा नदी', 'आसन नदी'],
    historicalFortsMr: ['कंधार भुईकोट किल्ला (राष्ट्रकूटकालीन)', 'माहूर किल्ला'],
    majorCropsMr: ['केळी (अर्धापूरची केळी प्रसिद्ध)', 'कापूस', 'सोयाबीन', 'हळद'],
    sanctuariesAndParksMr: ['किनवट वन्यजीव अभयारण्य (पैनगंगा अभयारण्य)'],
    mineralsAndIndustriesMr: ['टेक्सटाईल मिल्स', 'साखर उद्योग', 'सहस्त्रकुंड धबधबा'],
    mpscGoldenFactsMr: [
      'महाराष्ट्रात सर्वाधिक १६ तालुके असणाऱ्या दोन जिल्ह्यांपैकी एक (नांदेड व यवतमाळ - प्रत्येकी १६ तालुके).',
      'सिख धर्मियांचे पवित्र तख्त "सचखंड श्री हजूर अबचल नगर साहिब" (गुरु गोविंद सिंग समाधीस्थान).',
      'महाराष्ट्रातील साडेतीन शक्तिपीठांपैकी एक "रेणुका माता मंदिर" माहूर येथे आहे.',
      'स्वामी रामानंद तीर्थ मराठवाडा विद्यापीठ (SRTMU, स्थापना: १९९४) नांदेड येथे आहे.'
    ],
    literacyRatePercent: 75.45,
    sexRatio: 934,
    rtoCode: 'MH-26'
  },
  {
    id: 'beed',
    nameMr: 'बीड',
    nameEn: 'Beed',
    divisionId: 'chhatrapati_sambhajinagar',
    divisionNameMr: 'छत्रपती संभाजीनगर विभाग',
    divisionNameEn: 'Chhatrapati Sambhajinagar',
    hqMr: 'बीड',
    hqEn: 'Beed',
    areaSqKm: 10693,
    talukasCount: 11,
    prominentTalukasMr: ['बीड', 'गेवराई', 'माजलगाव', 'वडवणी', 'आष्टी', 'पाटोदा', 'शिरूर कासार', 'अंबाजोगाई', 'केज', 'धारूर', 'परळी वैजनाथ'],
    majorRiversMr: ['गोदावरी नदी', 'मांजरा नदी', 'सिंदफणा नदी', 'बिंदुसरा नदी'],
    historicalFortsMr: ['धारूर किल्ला (उंच कड्यावरील किल्ला)'],
    majorCropsMr: ['कापूस', 'सोयाबीन', 'बाजरी', 'तूर', 'ऊस'],
    sanctuariesAndParksMr: ['नायगाव मयूर अभयारण्य (मोरांसाठी प्रसिद्ध)'],
    mineralsAndIndustriesMr: ['परळी औष्णिक वीज केंद्र (TPS)', 'साखर कारखाने'],
    mpscGoldenFactsMr: [
      '१२ ज्योतिर्लिंगांपैकी एक "परळी वैजनाथ" बीड जिल्ह्यात आहे.',
      'अंबाजोगाई: मराठी भाषेचे आद्यकवी मुकुंदराज (विवेकसिंधू) व संत दासोपंत यांची कर्मभूमी.',
      'ऊसतोड कामगारांचा जिल्हा म्हणून ओळख.'
    ],
    literacyRatePercent: 76.99,
    sexRatio: 916,
    rtoCode: 'MH-23, MH-44'
  },
  {
    id: 'latur',
    nameMr: 'लातूर',
    nameEn: 'Latur',
    divisionId: 'chhatrapati_sambhajinagar',
    divisionNameMr: 'छत्रपती संभाजीनगर विभाग',
    divisionNameEn: 'Chhatrapati Sambhajinagar',
    hqMr: 'लातूर',
    hqEn: 'Latur',
    areaSqKm: 7157,
    talukasCount: 10,
    prominentTalukasMr: ['लातूर', 'औसा', 'रेणापूर', 'अहमदपूर', 'चाकूर', 'शिरूर अनंतपाळ', 'निलंगा', 'देवणी', 'उदगीर', 'जळकोट'],
    majorRiversMr: ['मांजरा नदी', 'तेरणा नदी', 'तावरजा नदी', 'घर्णी नदी'],
    historicalFortsMr: ['उदगीरचा किल्ला (१७६० ची उदगीरची लढाई - पेशवे विरुद्ध निझाम)', 'औसा भुईकोट किल्ला'],
    majorCropsMr: ['सोयाबीन (लातूर देशातील प्रमुख सोयाबीन व डाळींचे मार्केट)', 'तूर (लाल तूर)', 'ऊस'],
    sanctuariesAndParksMr: ['वडवळ नागनाथ बेट (औषधी वनस्पतींसाठी प्रसिद्ध डोंगर)'],
    mineralsAndIndustriesMr: ['डाळ मिल्स', 'ऑईल मिल्स', 'मराठवाडा रेल्वे कोच फॅक्टरी (उदगीर/लातूर)'],
    mpscGoldenFactsMr: [
      '१६ ऑगस्ट १९८२ रोजी उस्मानाबाद (धाराशीव) जिल्ह्याचे विभाजन होऊन लातूर जिल्हा निर्माण झाला.',
      '३० सप्टेंबर १९९३ रोजी किल्लारी (लातूर) येथे झालेला महाविनाशकारी भूकंप.',
      'लातूर एज्युकेशन पॅटर्न: स्पर्धा परीक्षा व बोर्ड परीक्षांमधील शैक्षणिक यशासाठी राज्यभर प्रसिद्ध.'
    ],
    literacyRatePercent: 78.49,
    sexRatio: 924,
    rtoCode: 'MH-24'
  },
  {
    id: 'dharashiv',
    nameMr: 'धाराशीव (उस्मानाबाद)',
    nameEn: 'Dharashiv (Osmanabad)',
    divisionId: 'chhatrapati_sambhajinagar',
    divisionNameMr: 'छत्रपती संभाजीनगर विभाग',
    divisionNameEn: 'Chhatrapati Sambhajinagar',
    hqMr: 'धाराशीव',
    hqEn: 'Dharashiv',
    areaSqKm: 7569,
    talukasCount: 8,
    prominentTalukasMr: ['धाराशीव', 'तुळजापूर', 'उमरगा', 'लोहारा', 'कळंब', 'वाशी', 'परंडा', 'भूम'],
    majorRiversMr: ['मांजरा नदी', 'सीना नदी', 'तेरणा नदी', 'बोरी नदी'],
    historicalFortsMr: ['परंडा भुईकोट किल्ला (तोफांचा प्रसिद्ध संग्रह)', 'नळदुर्ग किल्ला (नर-मादी धबधबा)'],
    majorCropsMr: ['सोयाबीन', 'ज्वारी', 'तूर', 'सूर्यफूल', 'ऊस'],
    sanctuariesAndParksMr: ['येडशी रामलिंग घाट वन्यजीव अभयारण्य'],
    mineralsAndIndustriesMr: ['साखर कारखाने', 'पवन ऊर्जा प्रकल्प'],
    mpscGoldenFactsMr: [
      'तुळजापूर: महाराष्ट्राची कुलस्वामिनी श्री तुळजाभवानी मातेचे प्रसिद्ध तीर्थक्षेत्र (छत्रपती शिवाजी महाराजांची आराध्य देवता).',
      'नळदुर्ग किल्ल्यातील जलमहालामध्ये असणारा "नर-मादी धबधबा" स्थापत्यकलेचा उत्कृष्ट नमुना आहे.',
      'संत गोरोबा कुंभार यांचे समाधीस्थान "तेर" याच जिल्ह्यात आहे.'
    ],
    literacyRatePercent: 78.44,
    sexRatio: 924,
    rtoCode: 'MH-25'
  },

  // ==========================================
  // ५. अमरावती विभाग (पश्चिम विदर्भ - ५ जिल्हे)
  // ==========================================
  {
    id: 'amravati',
    nameMr: 'अमरावती',
    nameEn: 'Amravati',
    divisionId: 'amravati',
    divisionNameMr: 'अमरावती विभाग',
    divisionNameEn: 'Amravati',
    hqMr: 'अमरावती',
    hqEn: 'Amravati',
    areaSqKm: 12210,
    talukasCount: 14,
    prominentTalukasMr: ['अमरावती', 'भातकुली', 'नांदगाव खंडेश्वर', 'चांदूर रेल्वे', 'चांदूर बाजार', 'तिवसा', 'मोर्शी', 'वरुड', 'अचलपूर (परतवाडा)', 'चांदूर', 'दर्यापूर', 'अंजनगाव सुर्जी', 'धारणी', 'चिखलदरा'],
    majorRiversMr: ['वर्धा नदी', 'पूर्णा नदी', 'तापी नदी', 'चंद्रभागा', 'शहानूर'],
    historicalFortsMr: ['गावीलगड किल्ला (चिखलदरा)', 'नरनाळा किल्ला सीमाभाग'],
    majorCropsMr: ['संत्री (वरुड-मोर्शी कॅलिफोर्निया ऑफ महाराष्ट्र)', 'कापूस', 'सोयाबीन', 'तूर'],
    sanctuariesAndParksMr: ['मेळघाट व्याघ्र प्रकल्प (भारतातील पहिल्या ९ व्याघ्र प्रकल्पांपैकी एक १९७३-७४)', 'गुगामल राष्ट्रीय उद्यान'],
    mineralsAndIndustriesMr: ['टेक्सटाईल पार्क (नांदगाव पेठ MIDC)', 'संत्री प्रक्रिया उद्योग'],
    mpscGoldenFactsMr: [
      'संत गाडगे बाबा अमरावती विद्यापीठ (SGBAU, स्थापना: १९८३).',
      'चिखलदरा: विदर्भातील एकमेव थंड हवेचे ठिकाण (सातपुड्यातील गाविलगड टेकड्या, उंची १११८ मी).',
      'राष्ट्रसंत तुकडोजी महाराज यांचे समाधीस्थान "मोझरी" (तिवसा तालुका) याच जिल्ह्यात आहे.'
    ],
    literacyRatePercent: 87.38,
    sexRatio: 951,
    rtoCode: 'MH-27'
  },
  {
    id: 'akola',
    nameMr: 'अकोला',
    nameEn: 'Akola',
    divisionId: 'amravati',
    divisionNameMr: 'अमरावती विभाग',
    divisionNameEn: 'Amravati',
    hqMr: 'अकोला',
    hqEn: 'Akola',
    areaSqKm: 5429,
    talukasCount: 7,
    prominentTalukasMr: ['अकोला', 'अकोट', 'तेल्हारा', 'बाळापूर', 'पातूर', 'बार्शीटाकळी', 'मूर्तिजापूर'],
    majorRiversMr: ['पूर्णा नदी', 'मोरणा नदी', 'काटेपूर्णा नदी', 'मन नदी'],
    historicalFortsMr: ['अकोट जवळील नरनाळा किल्ला (शहानूर नदी)', 'बाळापूरची प्रसिद्ध छत्री व किल्ला'],
    majorCropsMr: ['कापूस (कापूस सिटी)', 'सोयाबीन', 'तूर', 'ज्वारी'],
    sanctuariesAndParksMr: ['काटेपूर्णा वन्यजीव अभयारण्य'],
    mineralsAndIndustriesMr: ['कापूस जिनिंग व ऑईल मिल्स', 'पारस औष्णिक वीज केंद्र (TPS)'],
    mpscGoldenFactsMr: [
      'डॉ. पंजाबराव देशमुख कृषी विद्यापीठ (PDKV, स्थापना: १९६९) अकोला येथे आहे.',
      '१ जुलै १९९८ रोजी अकोला जिल्ह्याचे विभाजन होऊन "वाशीम" जिल्हा निर्माण झाला.',
      'ऐतिहासिक अकोला करार (१९४७) भाषावार प्रांतरचनेसाठी झाला होता.'
    ],
    literacyRatePercent: 88.05,
    sexRatio: 946,
    rtoCode: 'MH-30'
  },
  {
    id: 'buldhana',
    nameMr: 'बुलढाणा',
    nameEn: 'Buldhana',
    divisionId: 'amravati',
    divisionNameMr: 'अमरावती विभाग',
    divisionNameEn: 'Amravati',
    hqMr: 'बुलढाणा',
    hqEn: 'Buldhana',
    areaSqKm: 9661,
    talukasCount: 13,
    prominentTalukasMr: ['बुलढाणा', 'चिखली', 'देऊळगाव राजा', 'जळगाव जामोद', 'संग्रामपूर', 'शेगाव', 'खामगाव', 'नांदुरा', 'मलकापूर', 'मोताळा', 'लोणार', 'मेहकर', 'सिंदखेड राजा'],
    majorRiversMr: ['पूर्णा नदी', 'पैनगंगा नदी', 'ज्ञानगंगा नदी', 'वाण नदी'],
    historicalFortsMr: ['सिंदखेड राजा राजवाडा व लखुजी जाधव गढी'],
    majorCropsMr: ['सोयाबीन', 'कापूस', 'ज्वारी', 'मका'],
    sanctuariesAndParksMr: ['लोणार सरोवर (उल्कापातामुळे निर्माण झालेले खारे पाण्याचे सरोवर - Ramsar Site २०२०)', 'ज्ञानगंगा अभयारण्य', 'अंबाबरवा अभयारण्य'],
    mineralsAndIndustriesMr: ['खामगाव - चांदीची मोठी बाजारपेठ', 'शेगाव कचोरी व धार्मिक पर्यटन'],
    mpscGoldenFactsMr: [
      'राष्ट्रमाता जिजाऊ मासाहेबांचे जन्मस्थान "सिंदखेड राजा" बुलढाणा जिल्ह्यात आहे.',
      'लोणार सरोवर: ५०,००० वर्षांपूर्वी उल्कापाताने तयार झालेले बेसाल्ट खडकातील जगातील एकमेव सरोवर (रामसार पाणथळ स्थळ).',
      'संत गजानन महाराज समाधी मंदिर "शेगाव" हे विदर्भाची पंढरी म्हणून ओळखले जाते.'
    ],
    literacyRatePercent: 83.40,
    sexRatio: 934,
    rtoCode: 'MH-28'
  },
  {
    id: 'washim',
    nameMr: 'वाशीम',
    nameEn: 'Washim',
    divisionId: 'amravati',
    divisionNameMr: 'अमरावती विभाग',
    divisionNameEn: 'Amravati',
    hqMr: 'वाशीम',
    hqEn: 'Washim',
    areaSqKm: 5155,
    talukasCount: 6,
    prominentTalukasMr: ['वाशीम', 'मालेगाव', 'रिसोड', 'मंगरुळपीर', 'कारंजा (लाड)', 'मानोरा'],
    majorRiversMr: ['पैनगंगा नदी', 'काटेपूर्णा नदी', 'अरुणावती नदी', 'बेंबळा नदी'],
    historicalFortsMr: ['वाशीम बालाजी मंदिर परिसर'],
    majorCropsMr: ['सोयाबीन', 'कापूस', 'तूर', 'गहू'],
    sanctuariesAndParksMr: ['कारंजा सोहोल काळे हरिण (ब्लॅकबक) अभयारण्य'],
    mineralsAndIndustriesMr: ['सोयाबीन प्रक्रिया उद्योग', 'जिनिंग मिल्स'],
    mpscGoldenFactsMr: [
      'वाकाटक राजवंशाची राजधानी "वत्सगुल्म" म्हणजे आजचे वाशीम शहर.',
      'दत्तात्रेयांचे दुसरे अवतार श्री नृसिंह सरस्वती यांची जन्मभूमी "कारंजा लाड" याच जिल्ह्यात आहे.',
      'पोहरादेवी (मानोरा तालुका): बंजारा समाजाची काशी म्हणून ओळखले जाणारे संत सेवालाल महाराज समाधीस्थान.'
    ],
    literacyRatePercent: 83.25,
    sexRatio: 930,
    rtoCode: 'MH-37'
  },
  {
    id: 'yavatmal',
    nameMr: 'यवतमाळ',
    nameEn: 'Yavatmal',
    divisionId: 'amravati',
    divisionNameMr: 'अमरावती विभाग',
    divisionNameEn: 'Amravati',
    hqMr: 'यवतमाळ',
    hqEn: 'Yavatmal',
    areaSqKm: 13582,
    talukasCount: 16,
    prominentTalukasMr: ['यवतमाळ', 'बाभूळगाव', 'कळंब', 'राळेगाव', 'केळापूर (पांढरकवडा)', 'घाटनजी', 'वणी', 'मारेगाव', 'झरी जामणी', 'आर्णी', 'दारव्हा', 'दिग्रस', 'नेर', 'पुसद', 'उमरखेड', 'महागाव'],
    majorRiversMr: ['पैनगंगा नदी', 'वर्धा नदी', 'अरुणावती नदी', 'अडाण नदी'],
    historicalFortsMr: ['कळंब ऐतिहासिक चिंतामणी गणेश मंदिर'],
    majorCropsMr: ['कापूस (पांढऱ्या सोन्याचा जिल्हा)', 'सोयाबीन', 'तूर', 'ज्वारी'],
    sanctuariesAndParksMr: ['टिपेश्वर वन्यजीव अभयारण्य (वाघांसाठी प्रसिद्ध)', 'पैनगंगा अभयारण्य'],
    mineralsAndIndustriesMr: ['दगडी कोळसा (वणी खाणी - विदर्भाचे कोळसा हब)', 'डोलोमाईट व चुनखडी'],
    mpscGoldenFactsMr: [
      'महाराष्ट्रात सर्वाधिक १६ तालुके असणारा जिल्हा (नांदेड सोबत).',
      'महाराष्ट्राला सर्वाधिक काळ मुख्यमंत्रीपद देणारा जिल्हा (वसंतराव नाईक - ११ वर्षे व सुधाकरराव नाईक).',
      '१० जुलै १९३० रोजी बापूजी अणे यांच्या नेतृत्वाखाली प्रसिद्ध "पुसदचा जंगल सत्याग्रह" याच जिल्ह्यात झाला.'
    ],
    literacyRatePercent: 82.82,
    sexRatio: 952,
    rtoCode: 'MH-29'
  },

  // ==========================================
  // ६. नागपूर विभाग (पूर्व विदर्भ - ६ जिल्हे)
  // ==========================================
  {
    id: 'nagpur',
    nameMr: 'नागपूर',
    nameEn: 'Nagpur',
    divisionId: 'nagpur',
    divisionNameMr: 'नागपूर विभाग',
    divisionNameEn: 'Nagpur',
    hqMr: 'नागपूर',
    hqEn: 'Nagpur',
    areaSqKm: 9892,
    talukasCount: 14,
    prominentTalukasMr: ['नागपूर शहर', 'नागपूर ग्रामीण', 'कामठी', 'हिंगणा', 'उमरेड', 'कुही', 'भिवापूर', 'काटोल', 'नरखेड', 'सावनेर', 'कळमेश्वर', 'रामटेक', 'मौदा', 'पारशिवणी'],
    majorRiversMr: ['कन्हान नदी', 'पेंच नदी', 'वेणा नदी', 'नाग नदी (शहराचे नाव)', 'कोलार नदी'],
    historicalFortsMr: ['रामटेक किल्ला (कविकुलगुरू कालिदासांनी मेघदूत काव्य लिहिले)', 'सीताबर्डी किल्ला (नागपूर)'],
    majorCropsMr: ['संत्री (ऑरेंज सिटी GI Tag)', 'सोयाबीन', 'कापूस', 'गहू'],
    sanctuariesAndParksMr: ['पेंच राष्ट्रीय उद्यान (पंडित जवाहरलाल नेहरू राष्ट्रीय उद्यान - मोगली लँड)', 'उमरेड-करांडला अभयारण्य'],
    mineralsAndIndustriesMr: ['दगडी कोळसा (WCL)', 'मँगेनीज (MOIL)', 'MIHAN व SEZ', 'कोराडी व खापरखेडा औष्णिक वीज केंद्र'],
    mpscGoldenFactsMr: [
      'महाराष्ट्राची उपराजधानी; येथे विधिमंडळाचे हिवाळी अधिवेशन भरते (१९५३ चा नागपूर करार).',
      'भारताचा भौगोलिक केंद्रबिंदू (Zero Mile Stone) नागपूर शहरात आहे.',
      'दीक्षाभूमी: १४ ऑक्टोबर १९५६ रोजी डॉ. बाबासाहेब आंबेडकरांनी बौद्ध धम्माची दीक्षा दिली.',
      'कविकुलगुरू कालिदास संस्कृत विद्यापीठ रामटेक येथे आहे.'
    ],
    literacyRatePercent: 88.39,
    sexRatio: 951,
    rtoCode: 'MH-31, MH-40'
  },
  {
    id: 'wardha',
    nameMr: 'वर्धा',
    nameEn: 'Wardha',
    divisionId: 'nagpur',
    divisionNameMr: 'नागपूर विभाग',
    divisionNameEn: 'Nagpur',
    hqMr: 'वर्धा',
    hqEn: 'Wardha',
    areaSqKm: 6309,
    talukasCount: 8,
    prominentTalukasMr: ['वर्धा', 'देवळी', 'सेलू', 'आर्वी', 'आष्टी', 'कारंजा', 'हिंगणघाट', 'समुद्रपूर'],
    majorRiversMr: ['वर्धा नदी (महाराष्ट्रातील सर्वात लांब दक्षिणवाहिनी नदी)', 'यशोदा नदी', 'वेणा नदी', 'बोर नदी'],
    historicalFortsMr: ['पवनार किल्ला'],
    majorCropsMr: ['कापूस', 'सोयाबीन', 'तूर', 'ज्वारी'],
    sanctuariesAndParksMr: ['बोर व्याघ्र प्रकल्प (क्षेत्रफळाने भारतातील सर्वात लहान व्याघ्र प्रकल्प)'],
    mineralsAndIndustriesMr: ['हिंगणघाट टेक्सटाईल हब', 'स्टील मिल्स'],
    mpscGoldenFactsMr: [
      'महात्मा गांधींचे "सेवाग्राम आश्रम" (१९३६ ते १९४८) येथे होते (स्वातंत्र्यलढ्याची अघोषित राजधानी).',
      'आचार्य विनोबा भावे यांचे "पवनार आश्रम" (परमधाम आश्रम - भूदान चळवळ) वर्धेत आहे.',
      'महात्मा गांधी आंतरराष्ट्रीय हिंदी विश्वविद्यालय वर्धा येथे स्थित आहे.'
    ],
    literacyRatePercent: 86.99,
    sexRatio: 946,
    rtoCode: 'MH-32'
  },
  {
    id: 'bhandara',
    nameMr: 'भंडारा',
    nameEn: 'Bhandara',
    divisionId: 'nagpur',
    divisionNameMr: 'नागपूर विभाग',
    divisionNameEn: 'Nagpur',
    hqMr: 'भंडारा',
    hqEn: 'Bhandara',
    areaSqKm: 3895,
    talukasCount: 7,
    prominentTalukasMr: ['भंडारा', 'मोहाडी', 'तुमसर', 'लाखनी', 'साकोली', 'लाखांदूर', 'पवनी'],
    majorRiversMr: ['वैनगंगा नदी', 'बावनथडी नदी', 'सूर नदी', 'चुलबंद नदी'],
    historicalFortsMr: ['पवनी किल्ला (विदर्भाची काशी)'],
    majorCropsMr: ['भात (तांदळाचा जिल्हा - चिन्नोर तांदूळ GI Tag)', 'ऊस', 'मत्स्योत्पादन'],
    sanctuariesAndParksMr: ['कोका वन्यजीव अभयारण्य'],
    mineralsAndIndustriesMr: ['पितळेची भांडी (ब्रास सिटी Brass City)', 'मँगेनीज (डोंगरी बुद्रुक - आशियातील मोठी खुली खाण)', 'आयुध निर्माणी (Ordnance Factory जवाहरनगर)'],
    mpscGoldenFactsMr: [
      'तलावांचा जिल्हा: महाराष्ट्रात सर्वाधिक मालगुजारी तलाव असणारा जिल्हा.',
      'पवनी: विदर्भाची काशी म्हणून ओळखले जाणारे बौद्ध व हिंदू धार्मिक स्थळ.',
      '१ मे १९९९ रोजी भंडारा जिल्ह्याचे विभाजन होऊन "गोंदिया" जिल्हा निर्माण झाला.'
    ],
    literacyRatePercent: 83.76,
    sexRatio: 982,
    rtoCode: 'MH-36'
  },
  {
    id: 'gondia',
    nameMr: 'गोंदिया',
    nameEn: 'Gondia',
    divisionId: 'nagpur',
    divisionNameMr: 'नागपूर विभाग',
    divisionNameEn: 'Nagpur',
    hqMr: 'गोंदिया',
    hqEn: 'Gondia',
    areaSqKm: 5431,
    talukasCount: 8,
    prominentTalukasMr: ['गोंदिया', 'तिरोडा', 'गोरेगाव', 'आमगाव', 'सालेकसा', 'देवरी', 'सडक अर्जुनी', 'अर्जुनी मोरगाव'],
    majorRiversMr: ['वैनगंगा नदी', 'वाघ नदी', 'गाढवी नदी', 'चुलबंद नदी', 'बावनथडी'],
    historicalFortsMr: ['प्रतापगड टेकडी (गोंदिया)'],
    majorCropsMr: ['भात (तांदळाचे कोठार)', 'तूर', 'मत्स्य व्यवसाय'],
    sanctuariesAndParksMr: ['नवेगाव राष्ट्रीय उद्यान (नवेगाव बांध)', 'नागझिरा वन्यजीव अभयारण्य (नवीन नागझिरा)'],
    mineralsAndIndustriesMr: ['राइस मिल्स (Rice Mill Hub)', 'अदानी तिरोडा औष्णिक वीज प्रकल्प (३३०० MW)', 'तेंदू पान संकलन व विडी उद्योग'],
    mpscGoldenFactsMr: [
      'महाराष्ट्रातील "तांदळाचे कोठार" व तलावांचा जिल्हा.',
      'नवेगाव राष्ट्रीय उद्यान (अर्जुनी मोरगाव) पक्षी निरीक्षणासाठी प्रसिद्ध (डॉ. सलीम अली यांचे आवडते ठिकाण).',
      'सारस पक्षी (Sarus Crane) संवर्धनासाठी गोंदिया ओळखले जाते.'
    ],
    literacyRatePercent: 84.95,
    sexRatio: 999,
    rtoCode: 'MH-35'
  },
  {
    id: 'chandrapur',
    nameMr: 'चंद्रपूर',
    nameEn: 'Chandrapur',
    divisionId: 'nagpur',
    divisionNameMr: 'नागपूर विभाग',
    divisionNameEn: 'Nagpur',
    hqMr: 'चंद्रपूर',
    hqEn: 'Chandrapur',
    areaSqKm: 11443,
    talukasCount: 15,
    prominentTalukasMr: ['चंद्रपूर', 'भद्रावती', 'वरोरा', 'चिमूर', 'नागभीड', 'ब्रह्मपुरी', 'सिंदेवाही', 'मूल', 'सावली', 'पोंभुर्णा', 'बल्लारपूर', 'गोंडपिपरी', 'कोरपना', 'राजुरा', 'जिवती'],
    majorRiversMr: ['वर्धा नदी', 'वैनगंगा नदी', 'इरई नदी', 'अंधारी नदी', 'मुल नदी'],
    historicalFortsMr: ['चंद्रपूर परकोट किल्ला (गोंड राजांचा ऐतिहासिक किल्ला)', 'बल्लारपूर किल्ला', 'माणिकगड किल्ला'],
    majorCropsMr: ['भात', 'कापूस', 'सोयाबीन', 'ज्वारी'],
    sanctuariesAndParksMr: ['ताडोबा-अंधारी व्याघ्र प्रकल्प (TATR - महाराष्ट्रातील पहिले राष्ट्रीय उद्यान १९५५)'],
    mineralsAndIndustriesMr: ['दगडी कोळसा (काळे सोने - ब्लॅक गोल्ड सिटी)', 'सिमेंट उद्योग (अल्ट्राटेक, एसीसी, अंबुजा)', 'चंद्रपूर सुपर थर्मल पॉवर स्टेशन (CSTPS - राज्यातील सर्वात मोठे वीज केंद्र)', 'बल्लारपूर पेपर मिल'],
    mpscGoldenFactsMr: [
      'ताडोबा-अंधारी हे महाराष्ट्रातील पहिले राष्ट्रीय उद्यान (१९५५) व व्याघ्र प्रकल्प (१९९३).',
      'आनंदवन: थोर समाजसेवक बाबा आमटे यांनी कुष्ठरोग्यांच्या सेवेसाठी वरोरा येथे स्थापन केलेला प्रकल्प.',
      '२६ ऑगस्ट १९८२ रोजी चंद्रपूर जिल्ह्याचे विभाजन होऊन "गडचिरोली" जिल्हा निर्माण झाला.'
    ],
    literacyRatePercent: 80.01,
    sexRatio: 961,
    rtoCode: 'MH-34'
  },
  {
    id: 'gadchiroli',
    nameMr: 'गडचिरोली',
    nameEn: 'Gadchiroli',
    divisionId: 'nagpur',
    divisionNameMr: 'नागपूर विभाग',
    divisionNameEn: 'Nagpur',
    hqMr: 'गडचिरोली',
    hqEn: 'Gadchiroli',
    areaSqKm: 14412,
    talukasCount: 12,
    prominentTalukasMr: ['गडचिरोली', 'धानोरा', 'चामोर्शी', 'मूलचेरा', 'अहेरी', 'एटापल्ली', 'भामरागड', 'सिरोंचा', 'कोरची', 'कुरखेडा', 'आरमोरी', 'वडसा (देसाईगंज)'],
    majorRiversMr: ['वैनगंगा नदी', 'प्राणहिता नदी (वर्धा + वैनगंगा संगम)', 'गोदावरी नदी', 'इंद्रावती नदी', 'पामुलगौतम', 'पर्लकोटा'],
    historicalFortsMr: ['वैरागड किल्ला', 'टिपगड किल्ला'],
    majorCropsMr: ['भात (तांदूळ)', 'तेंदू पत्ता', 'मोहफुले व वनोपज'],
    sanctuariesAndParksMr: ['चपराळा वन्यजीव अभयारण्य (प्रशांतधाम)', 'ग्लोरी ऑफ आलापल्ली (जैविक वारसा स्थळ)'],
    mineralsAndIndustriesMr: ['लोहखनिज (सूरजागड खाणी)', 'आलापल्ली सागवान (Teak Wood)', 'बांबू हस्तकला'],
    mpscGoldenFactsMr: [
      'महाराष्ट्रातील सर्वाधिक वनाच्छादन असलेला जिल्हा (भौगोलिक क्षेत्राच्या सुमारे ६८.८% वने).',
      'महाराष्ट्रातील सर्वात कमी लोकसंख्या घनता असणारा जिल्हा (केवळ ७४ व्यक्ती प्रति चौ.किमी).',
      'हेमलकसा (भामरागड): पद्मश्री डॉ. प्रकाश आमटे व डॉ. मंदाकिनी आमटे यांचा "लोकबिरादरी प्रकल्प".',
      'सिरोंचा येथे जीवाश्म (Fossils) व डायनासोरचे अवशेष सापडलेले प्रसिद्ध स्थळ आहे.'
    ],
    literacyRatePercent: 74.36,
    sexRatio: 982,
    rtoCode: 'MH-33'
  }
];
