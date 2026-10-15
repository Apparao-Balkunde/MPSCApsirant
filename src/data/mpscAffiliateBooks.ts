import { SubjectId } from '../types';

export interface MpscAffiliateBook {
  id: string;
  titleMr: string;
  titleEn: string;
  authorMr: string;
  authorEn: string;
  publisherMr: string;
  publisherEn: string;
  subjectId: SubjectId | 'pyq' | 'current_affairs' | 'csat' | 'english' | 'study_gear' | 'stationery_omr';
  subjectNameMr: string;
  subjectNameEn: string;
  editionMr: string;
  editionEn: string;
  mrp: number;
  offerPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  coverImage: string;
  importanceMr: string;
  importanceEn: string;
  topperTipMr: string;
  badgeMr: string;
  badgeEn: string;
  tags: string[];
  asin?: string;
  customUrl?: string;
  amazonKeywords: string;
  estimatedCommissionPercent: number; // e.g. 8%
}

export const DEFAULT_AMAZON_AFFILIATE_TAG = 'mpscaspirant-21';
const STORAGE_TAG_KEY = 'mpsc_amazon_affiliate_tag';
const STORAGE_CUSTOM_BOOKS_KEY = 'mpsc_custom_affiliate_books';

export const getStoredAffiliateTag = (): string => {
  if (typeof window === 'undefined') return DEFAULT_AMAZON_AFFILIATE_TAG;
  const stored = localStorage.getItem(STORAGE_TAG_KEY);
  return (stored && stored.trim().length > 0) ? stored.trim() : DEFAULT_AMAZON_AFFILIATE_TAG;
};

export const saveAffiliateTag = (tag: string): void => {
  if (typeof window === 'undefined') return;
  const cleanTag = tag.trim();
  if (cleanTag) {
    localStorage.setItem(STORAGE_TAG_KEY, cleanTag);
  } else {
    localStorage.removeItem(STORAGE_TAG_KEY);
  }
};

export const attachTagToAmazonUrl = (rawUrl: string, customTag?: string): string => {
  const tag = customTag || getStoredAffiliateTag();
  if (!rawUrl || !rawUrl.trim()) return '';
  const trimmed = rawUrl.trim();
  try {
    const urlObj = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    urlObj.searchParams.set('tag', tag);
    return urlObj.toString();
  } catch {
    const separator = trimmed.includes('?') ? '&' : '?';
    return `${trimmed}${separator}tag=${encodeURIComponent(tag)}`;
  }
};

export const getCustomAffiliateBooks = (): MpscAffiliateBook[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_CUSTOM_BOOKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveCustomAffiliateBook = (book: MpscAffiliateBook): void => {
  if (typeof window === 'undefined') return;
  try {
    const current = getCustomAffiliateBooks();
    const updated = [book, ...current.filter((b) => b.id !== book.id)];
    localStorage.setItem(STORAGE_CUSTOM_BOOKS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save custom affiliate book', err);
  }
};

export const deleteCustomAffiliateBook = (id: string): void => {
  if (typeof window === 'undefined') return;
  try {
    const current = getCustomAffiliateBooks();
    const updated = current.filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_CUSTOM_BOOKS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete custom affiliate book', err);
  }
};

export const buildAmazonAffiliateUrl = (book: MpscAffiliateBook, customTag?: string): string => {
  const tag = customTag || getStoredAffiliateTag();
  if (book.customUrl) {
    return attachTagToAmazonUrl(book.customUrl, tag);
  }
  if (book.asin) {
    return `https://www.amazon.in/dp/${book.asin}?tag=${encodeURIComponent(tag)}`;
  }
  const query = encodeURIComponent(book.amazonKeywords);
  return `https://www.amazon.in/s?k=${query}&i=stripbooks&tag=${encodeURIComponent(tag)}`;
};

export const MPSC_AFFILIATE_BOOKS_DATA: MpscAffiliateBook[] = [
  // 1. Polity - M. Laxmikanth
  {
    id: 'polity_laxmikanth',
    titleMr: 'भारतीय राज्यव्यवस्था (Indian Polity)',
    titleEn: 'Indian Polity - 6th / 7th Edition',
    authorMr: 'एम. लक्ष्मीकांत (M. Laxmikanth)',
    authorEn: 'M. Laxmikanth',
    publisherMr: 'मॅकग्रॉ हिल (McGraw Hill India)',
    publisherEn: 'McGraw Hill',
    subjectId: 'polity',
    subjectNameMr: 'भारतीय राज्यव्यवस्था व शासन',
    subjectNameEn: 'Indian Polity & Governance',
    editionMr: '७ वी सुधारित आवृत्ती (नवीनतम)',
    editionEn: '7th Revised Edition',
    mrp: 995,
    offerPrice: 720,
    discountPercent: 28,
    rating: 4.8,
    reviewsCount: 14200,
    coverImage: '/constitution_of_india.jpg',
    importanceMr: 'राज्यसेवा पूर्व व मुख्य परीक्षा GS-2 चा "बायबल" मानला जाणारा सर्वांत महत्त्वाचा व सर्वसमावेशक प्रमाण ग्रंथ.',
    importanceEn: 'The undisputed gold standard for Indian Constitution, fundamental rights, parliament, and judiciary.',
    topperTipMr: 'सर्व कलमे, अनुसूची व घटनादुरुस्त्या या पुस्तकातून किमान ३ वेळा रिव्हाईज करा. यातून थेट १५ ते २० प्रश्न येतात.',
    badgeMr: '⭐ टॉपर्सची पहिली पसंती (Must-Have)',
    badgeEn: '⭐ Topper Essential',
    tags: ['कलमे', 'संसद', 'घटनादुरुस्त्या', 'न्यायव्यवस्था', 'मूलभूत हक्क', 'पंचायतराज'],
    amazonKeywords: 'Indian Polity Laxmikanth Marathi or English McGraw Hill',
    estimatedCommissionPercent: 8,
  },

  // 2. Geography - Saudi Sir
  {
    id: 'geography_saudi',
    titleMr: 'महाराष्ट्राचा व भारताचा समग्र भूगोल',
    titleEn: 'Comprehensive Geography of Maharashtra & India',
    authorMr: 'प्रा. ए. बी. सवदी (सौदी) व कोळंबे',
    authorEn: 'Prof. A.B. Saudi',
    publisherMr: 'निरली / कॅपिटल पब्लिशिंग',
    publisherEn: 'Nirali Prakashan',
    subjectId: 'maharashtra_geography',
    subjectNameMr: 'महाराष्ट्र व भारताचा भूगोल',
    subjectNameEn: 'Geography of Maharashtra & India',
    editionMr: 'नवीनतम अद्ययावत आवृत्ती (नकाशांसह)',
    editionEn: 'Latest Edition with Maps',
    mrp: 650,
    offerPrice: 495,
    discountPercent: 24,
    rating: 4.7,
    reviewsCount: 8900,
    coverImage: '/mpsc_textbooks.jpg',
    importanceMr: 'महाराष्ट्राची प्राकृतिक रचना, नद्या, जलप्रणाली, वने, खनिजे, जलसिंचन व जिल्ह्यांचा प्रादेशिक भूगोल समजून घेण्यासाठी सर्वाधिक विश्वासार्ह पुस्तक.',
    importanceEn: 'The most trusted volume for Maharashtra physiography, river systems, climate, soil, and minerals.',
    topperTipMr: 'नकाशांचा सराव करताना हे पुस्तक सोबत ठेवा. पश्चिम घाट, सह्याद्रीची शिखरे आणि गोदावरी-भीमा खोऱ्यांसाठी हे सर्वोत्तम आहे.',
    badgeMr: '🗺️ भूगोल प्रमाण ग्रंथ',
    badgeEn: '🗺️ Geography Master',
    tags: ['प्राकृतिक रचना', 'नद्या', 'हवामान', 'खनिजे', 'जिल्हानिहाय माहिती', 'नकाशे'],
    amazonKeywords: 'Maharashtra Bhugol AB Saudi Nirali Prakashan',
    estimatedCommissionPercent: 8,
  },

  // 3. History - Samadhan Mahajan
  {
    id: 'history_mahajan',
    titleMr: 'आधुनिक भारताचा व महाराष्ट्राचा इतिहास',
    titleEn: 'History of Modern India & Maharashtra',
    authorMr: 'समाधान महाजन (Samadhan Mahajan)',
    authorEn: 'Samadhan Mahajan',
    publisherMr: 'युनिक ॲकॅडमी (Unique Academy)',
    publisherEn: 'Unique Academy',
    subjectId: 'maharashtra_history',
    subjectNameMr: 'आधुनिक भारत व महाराष्ट्र इतिहास',
    subjectNameEn: 'Modern History & Maharashtra',
    editionMr: 'अद्ययावत ६ वी आवृत्ती',
    editionEn: '6th Updated Edition',
    mrp: 520,
    offerPrice: 410,
    discountPercent: 21,
    rating: 4.7,
    reviewsCount: 7600,
    coverImage: '/vintage_reference_books.jpg',
    importanceMr: '१८५७ चा उठाव, राष्ट्रीय चळवळ, गांधी युग, महाराष्ट्रातील समाजसुधारक (फुले, शाहू, आंबेडकर, कर्वे) आणि संयुक्त महाराष्ट्र चळवळीचे मुद्देसूद विवेचन.',
    importanceEn: 'Comprehensive notes covering Freedom Movement, 19th-century Social Reformers, and Samyukta Maharashtra.',
    topperTipMr: 'समाजसुधारकांनी स्थापन केलेल्या संस्था, वर्तमानपत्रे आणि पुस्तकांची यादी या पुस्तकातून नक्की पाठ करा.',
    badgeMr: '🏛️ इतिहास बेस्टसेलर',
    badgeEn: '🏛️ History Bestseller',
    tags: ['समाजसुधारक', 'स्वातंत्र्य लढा', '१८५७ उठाव', 'वृत्तपत्रे', 'संयुक्त महाराष्ट्र'],
    amazonKeywords: 'Aadhunik Bharatacha Itihas Samadhan Mahajan Unique Academy',
    estimatedCommissionPercent: 8,
  },

  // 4. Economy - Ranjan Kolambe
  {
    id: 'economy_kolambe',
    titleMr: 'भारतीय अर्थव्यवस्था (Indian Economy)',
    titleEn: 'Indian Economy by Ranjan Kolambe',
    authorMr: 'रंजन कोळंबे (Ranjan Kolambe)',
    authorEn: 'Ranjan Kolambe',
    publisherMr: 'भगीरथ प्रकाशन (Bhagirath)',
    publisherEn: 'Bhagirath Prakashan',
    subjectId: 'economy',
    subjectNameMr: 'भारतीय अर्थव्यवस्था व विकास',
    subjectNameEn: 'Indian Economy & Development',
    editionMr: 'नवीनतम आवृत्ती (बजेट व आर्थिक पाहणीसह)',
    editionEn: 'Latest Budget Edition',
    mrp: 480,
    offerPrice: 380,
    discountPercent: 21,
    rating: 4.8,
    reviewsCount: 11400,
    coverImage: '/stack_of_books.jpg',
    importanceMr: 'राष्ट्रीय उत्पन्न, चलनवाढ, बँकिंग, RBI पतधोरण, कररचना, परकीय व्यापार आणि दारिद्र्य-बेरोजगारी या संकल्पना सोप्या मराठीत समजण्यासाठी सर्वोत्तम.',
    importanceEn: 'The easiest and most conceptual book for banking, inflation, fiscal policy, taxation, and budget.',
    topperTipMr: 'नवीन सुरू करणाऱ्या विद्यार्थ्यांसाठी हे पुस्तक वाचल्याशिवाय अर्थशास्त्राची भीती कधीही जात नाही.',
    badgeMr: '📈 अर्थशास्त्र मूलभूत पाया',
    badgeEn: '📈 Economy Foundation',
    tags: ['RBI', 'बँकिंग', 'चलनवाढ', 'दारिद्र्य', 'कररचना', 'अर्थसंकल्प', 'नीती आयोग'],
    amazonKeywords: 'Bhartiya Arthavyavastha Ranjan Kolambe Bhagirath Prakashan',
    estimatedCommissionPercent: 8,
  },

  // 5. Economy Mains - Kiran Desle
  {
    id: 'economy_desle',
    titleMr: 'दीपस्तंभ स्पर्धा परीक्षा अर्थशास्त्र भाग-१ (समग्र)',
    titleEn: 'Deepstambh Economics Part 1 by Kiran Desle',
    authorMr: 'किरण देसले (Kiran Desle)',
    authorEn: 'Kiran Desle',
    publisherMr: 'दीपस्तंभ प्रकाशन (Deepstambh)',
    publisherEn: 'Deepstambh Prakashan',
    subjectId: 'economy',
    subjectNameMr: 'समग्र अर्थशास्त्र व शासकीय योजना',
    subjectNameEn: 'Macro Economics & Schemes',
    editionMr: 'अद्ययावत ७ वी आवृत्ती',
    editionEn: '7th Updated Edition',
    mrp: 680,
    offerPrice: 530,
    discountPercent: 22,
    rating: 4.8,
    reviewsCount: 9200,
    coverImage: '/pile_of_books.jpg',
    importanceMr: 'राज्यसेवा मुख्य परीक्षा GS-4 आणि कम्बाइन पूर्वसाठी डेटा, आकडेवारी, सरकारी समित्या (तेंडुलकर, रंगराजन) व आर्थिक योजनांचे सखोल विश्लेषण.',
    importanceEn: 'Detailed analytical resource for poverty committees, five-year plans, and fiscal policies.',
    topperTipMr: 'कोळंबे सर वाचून झाल्यावर देसले सरांचे हे पुस्तक वाचल्यास अर्थशास्त्रात पैकीच्या पैकी गुण हमखास मिळतात.',
    badgeMr: '💎 ॲडव्हान्स्ड अर्थशास्त्र',
    badgeEn: '💎 Advanced Economy',
    tags: ['पंचवार्षिक योजना', 'समित्या', 'दारिद्र्य रेषा', 'शासकीय योजना', 'आर्थिक पाहणी'],
    amazonKeywords: 'Deepstambh Arthashastra Part 1 Kiran Desle',
    estimatedCommissionPercent: 8,
  },

  // 6. Science - Sachin Bhaske
  {
    id: 'science_bhaske',
    titleMr: 'सामान्य विज्ञान व तंत्रज्ञान (GS Science)',
    titleEn: 'General Science & Technology for MPSC',
    authorMr: 'डॉ. सचिन भस्के (Sachin Bhaske)',
    authorEn: 'Dr. Sachin Bhaske',
    publisherMr: 'ज्ञानदीप / एन. के. पब्लिशर्स',
    publisherEn: 'Dnyandeep / NK Publishers',
    subjectId: 'general_science',
    subjectNameMr: 'सामान्य विज्ञान व तंत्रज्ञान',
    subjectNameEn: 'General Science',
    editionMr: '८ वी अद्ययावत रंगीत आवृत्ती',
    editionEn: '8th Color Edition',
    mrp: 620,
    offerPrice: 480,
    discountPercent: 23,
    rating: 4.7,
    reviewsCount: 8400,
    coverImage: '/open_reference_book.jpg',
    importanceMr: 'भौतिकशास्त्र, रसायनशास्त्र, वनस्पतीशास्त्र, प्राणीशास्त्र, मानवी आरोग्य व रोगांचे आकृत्यांसह सोपे वर्गीकरण.',
    importanceEn: 'Comprehensive biology, chemistry, physics, and disease classification with diagrams.',
    topperTipMr: 'विज्ञानातील क्लासिफिकेशन (वनस्पती व प्राण्यांचे वर्गीकरण) व जीवनसत्त्वांचे तक्ते दररोज एकदा नक्की नजरेखालून घाला.',
    badgeMr: '🔬 विज्ञान सर्वोच्च पसंती',
    badgeEn: '🔬 Science Compendium',
    tags: ['प्राणीशास्त्र', 'वनस्पतीशास्त्र', 'रोग व लसीकरण', 'आवर्तसारणी', 'भौतिक नियम', 'डोळ्यांचे दोष'],
    amazonKeywords: 'Samanya Vigyan Sachin Bhaske MPSC General Science',
    estimatedCommissionPercent: 8,
  },

  // 7. Marathi Grammar - M. R. Walambe
  {
    id: 'marathi_walambe',
    titleMr: 'सुगम मराठी व्याकरण व लेखन',
    titleEn: 'Sugam Marathi Vyakaran & Lekhan',
    authorMr: 'मो. रा. वाळंबे (M. R. Walambe)',
    authorEn: 'M. R. Walambe',
    publisherMr: 'नितीन प्रकाशन, पुणे',
    publisherEn: 'Nitin Prakashan',
    subjectId: 'marathi_grammar',
    subjectNameMr: 'मराठी व्याकरण व भाषा',
    subjectNameEn: 'Marathi Grammar',
    editionMr: 'सुधारित प्रमाण आवृत्ती',
    editionEn: 'Standard Reference Edition',
    mrp: 380,
    offerPrice: 295,
    discountPercent: 22,
    rating: 4.9,
    reviewsCount: 16500,
    coverImage: '/open_reference_book.jpg',
    importanceMr: 'MPSC आयोगाचे सर्व प्रश्न ज्या पुस्तकाच्या आधारे तयार होतात असा मराठी भाषेचा एकमेव प्रमाण आणि अंतिम शब्द.',
    importanceEn: 'The definitive authority for all Marathi grammar questions set by the MPSC commission.',
    topperTipMr: 'कम्बाइन मुख्य ५० गुणांसाठी आणि राज्यसेवा वर्णनात्मक निबंधासाठी या पुस्तकातील प्रत्येक नियम आणि उदाहरण पाठ करा.',
    badgeMr: '📖 मराठी व्याकरण बायबल',
    badgeEn: '📖 Grammar Authority',
    tags: ['वर्णविचार', 'प्रयोग', 'समास', 'विभक्ती', 'संधी', 'अलंकार', 'वाक्यरूपांतर'],
    amazonKeywords: 'Sugam Marathi Vyakaran M R Walambe Nitin Prakashan',
    estimatedCommissionPercent: 8,
  },

  // 8. English Grammar - Balasaheb Shinde
  {
    id: 'english_shinde',
    titleMr: 'संपूर्ण इंग्रजी व्याकरण (Complete English Grammar)',
    titleEn: 'Complete English Grammar by Balasaheb Shinde',
    authorMr: 'बाळासाहेब शिंदे (Balasaheb Shinde)',
    authorEn: 'Balasaheb Shinde',
    publisherMr: 'अनमोल प्रकाशन (Anmol)',
    publisherEn: 'Anmol Prakashan',
    subjectId: 'english',
    subjectNameMr: 'इंग्रजी व्याकरण व व्होकॅब्युलरी',
    subjectNameEn: 'English Grammar & Vocabulary',
    editionMr: 'अद्ययावत नियम व PYQ आवृत्ती',
    editionEn: 'Updated Rules Edition',
    mrp: 460,
    offerPrice: 360,
    discountPercent: 22,
    rating: 4.7,
    reviewsCount: 7100,
    coverImage: '/mpsc_textbooks.jpg',
    importanceMr: 'मराठी माध्यमातून शिकणाऱ्या विद्यार्थ्यांसाठी इंग्रजी व्याकरणाचे नियम, Tenses, Voice, Narration व Idioms अतिशय सोपे करून सांगणारे पुस्तक.',
    importanceEn: 'Bilingual Marathi-English explanation of grammar rules, voice, narration, and idioms.',
    topperTipMr: 'कम्बाइन मुख्य व राज्यसेवेमध्ये इंग्रजीची भीती घालवण्यासाठी या पुस्तकातील प्रॅक्टिस सेट्स सोडवा.',
    badgeMr: '🅰️ इंग्रजी व्याकरण गाइड',
    badgeEn: '🅰️ English Made Easy',
    tags: ['Tenses', 'Active-Passive', 'Direct-Indirect', 'Prepositions', 'Vocabulary', 'Idioms'],
    amazonKeywords: 'Complete English Grammar Balasaheb Shinde Anmol Prakashan',
    estimatedCommissionPercent: 8,
  },

  // 9. CSAT - Sachin Dhawale
  {
    id: 'csat_dhawale',
    titleMr: 'अंकगणित, बुद्धिमत्ता व तर्कक्षमता (CSAT ट्रिक्स)',
    titleEn: 'CSAT Quantitative Aptitude & Reasoning',
    authorMr: 'सचिन ढवळे (Sachin Dhawale)',
    authorEn: 'Sachin Dhawale',
    publisherMr: 'विजय पब्लिकेशन (Vijay Publication)',
    publisherEn: 'Vijay Publication',
    subjectId: 'csat',
    subjectNameMr: 'अंकगणित, बुद्धिमत्ता व CSAT',
    subjectNameEn: 'CSAT Aptitude & Reasoning',
    editionMr: 'नवीन फास्टट्रॅक शॉर्टकट आवृत्ती',
    editionEn: 'Fast-Track Shortcut Edition',
    mrp: 550,
    offerPrice: 420,
    discountPercent: 24,
    rating: 4.8,
    reviewsCount: 9800,
    coverImage: '/pile_of_books.jpg',
    importanceMr: 'कमी वेळेत उत्तर काढण्यासाठी शॉर्टकट क्लृप्त्या, घड्याळ, कॅलेंडर, वयवारी, दिशाज्ञान व वेन आकृत्यांचे जलद तंत्र.',
    importanceEn: 'Speed maths, logical deduction, seating arrangements, and CSAT qualifying techniques.',
    topperTipMr: 'दररोज १ तास बुद्धिमत्ता आणि गणिताचा सराव केल्यास CSAT मधील ६६+ गुण सहज मिळवता येतात.',
    badgeMr: '⚡ CSAT जलद क्लृप्त्या',
    badgeEn: '⚡ Fast-Track CSAT',
    tags: ['काळ-काम-वेग', 'वयवारी', 'शेकडेवारी', 'तर्कक्षमता', 'वेन आकृत्या', 'नफा-तोटा'],
    amazonKeywords: 'Ankganit Buddhimatta Sachin Dhawale Vijay Publication',
    estimatedCommissionPercent: 8,
  },

  // 10. PYQ Mega Compilation - Dnyandeep / K Sagar
  {
    id: 'pyq_25000_dnyandeep',
    titleMr: 'MPSC २५,०००+ प्रश्नपत्रिका विश्लेषण ठोकळा',
    titleEn: 'MPSC 25000+ Topicwise PYQ Compilation',
    authorMr: 'महेश शिंदे / ज्ञानदीप अकॅडमी',
    authorEn: 'Dnyandeep Academy',
    publisherMr: 'ज्ञानदीप पब्लिशिंग (Dnyandeep)',
    publisherEn: 'Dnyandeep Prakashan',
    subjectId: 'pyq',
    subjectNameMr: 'मागील वर्षांचे प्रश्नसंच (PYQ)',
    subjectNameEn: 'Previous Years Questions (PYQ)',
    editionMr: '२०१२ ते २०२५ सर्व प्रश्न उत्तरांसह (नवीनतम)',
    editionEn: '2012-2025 Comprehensive Analysis',
    mrp: 1100,
    offerPrice: 840,
    discountPercent: 24,
    rating: 4.9,
    reviewsCount: 13100,
    coverImage: '/vintage_reference_books.jpg',
    importanceMr: 'आयोगाचे मागील सर्व प्रश्न घटकनिहाय, उपघटकनिहाय आणि स्पष्टीकरणासह संकलित केलेले महापुस्तक.',
    importanceEn: 'Topic-by-topic breakdown of every MPSC PYQ from 2012 to 2025 with official answer keys.',
    topperTipMr: 'कोणताही विषय वाचून झाल्यावर त्याच दिवशी या पुस्तकातून त्याचे मागील १० वर्षांचे सर्व PYQ सोडवा.',
    badgeMr: '🔥 PYQ महासंग्रह (अत्यावश्यक)',
    badgeEn: '🔥 Ultimate PYQ Compendium',
    tags: ['PYQ', '२०१२-२०२५ प्रश्न', 'घटकनिहाय विश्लेषण', 'आयोग की', 'स्पष्टीकरण'],
    amazonKeywords: 'MPSC 25000 Prashnasanch Dnyandeep Prakashan Mahesh Shinde',
    estimatedCommissionPercent: 8,
  },

  // 11. Current Affairs - Parikrama Monthly
  {
    id: 'current_parikrama',
    titleMr: 'पृथ्वी परिक्रमा - चालू घडामोडी मासिक व वार्षिकी',
    titleEn: 'Prithvi Parikrama Monthly Current Affairs',
    authorMr: 'पृथ्वी अकॅडमी, पुणे',
    authorEn: 'Prithvi Academy',
    publisherMr: 'पृथ्वी प्रकाशन (Prithvi Publication)',
    publisherEn: 'Prithvi Publication',
    subjectId: 'current_affairs',
    subjectNameMr: 'चालू घडामोडी व वार्षिकी',
    subjectNameEn: 'Current Affairs & Yearbooks',
    editionMr: 'मासिक अंक व वार्षिक विशेषांक',
    editionEn: 'Monthly & Annual Edition',
    mrp: 220,
    offerPrice: 175,
    discountPercent: 20,
    rating: 4.8,
    reviewsCount: 6800,
    coverImage: '/mpsc_textbooks.jpg',
    importanceMr: 'पुरस्कार, क्रीडा, विज्ञान-तंत्रज्ञान, नियुक्त्या, आर्थिक घडामोडी आणि आंतरराष्ट्रीय परिषदांचे अचूक मासिक संकलन.',
    importanceEn: 'Monthly current affairs magazine with 4-statement MPSC-pattern analysis.',
    topperTipMr: 'परीक्षेच्या आधीच्या १२ महिन्यांचे परिक्रमा मासिके वाचल्यास चालू घडामोडीत १५ पैकी १२+ प्रश्न अचूक येतात.',
    badgeMr: '📰 चालू घडामोडी क्रमांक १',
    badgeEn: '📰 Current Affairs #1',
    tags: ['पुरस्कार', 'क्रीडा', 'नियुक्त्या', 'पर्यावरण परिषदा', 'विज्ञान तंत्रज्ञान', 'योजना'],
    amazonKeywords: 'Prithvi Parikrama Masik MPSC Current Affairs Prithvi Academy',
    estimatedCommissionPercent: 8,
  },

  // 12. Tatya's Thokla - Eknath Patil
  {
    id: 'tatyancha_thokla',
    titleMr: 'स्पर्धा परीक्षा ठोकळा (तात्यांचा ठोकळा)',
    titleEn: 'Tatyancha Thokla for Competitive Exams',
    authorMr: 'एकनाथ पाटील (तात्या)',
    authorEn: 'Eknath Patil (Tatya)',
    publisherMr: 'के. सागर पब्लिकेशन / तात्या प्रकाशन',
    publisherEn: 'K Sagar Publications',
    subjectId: 'pyq',
    subjectNameMr: 'सर्वंकष सामान्य अध्ययन ठोकळा',
    subjectNameEn: 'All-in-one GS Revision Thokla',
    editionMr: '३२ वी अद्ययावत महा-आवृत्ती',
    editionEn: '32nd Updated Mega Edition',
    mrp: 850,
    offerPrice: 650,
    discountPercent: 24,
    rating: 4.8,
    reviewsCount: 18900,
    coverImage: '/library_books.jpg',
    importanceMr: 'महाराष्ट्रातील प्रत्येक स्पर्धा परीक्षा विद्यार्थ्याचा सर्वात लाडका आणि जलद रिव्हिजनसाठी सर्वोत्तम ठोकळा ग्रंथ.',
    importanceEn: 'The legendary all-in-one revision encyclopaedia covering every GS subject in concise Marathi bullets.',
    topperTipMr: 'परीक्षेच्या शेवटच्या १५ दिवसांत सर्व विषयांची जलद रिव्हिजन करण्यासाठी हा ठोकळा सर्वोत्तम आहे.',
    badgeMr: '🏆 महाराष्ट्राचा सुवर्ण ठोकळा',
    badgeEn: '🏆 Legendary GS Compendium',
    tags: ['जलद रिव्हिजन', 'सर्व विषय एकत्र', 'महाराष्ट्र भूगोल', 'इतिहास', 'विज्ञान', 'पंचायतराज'],
    amazonKeywords: 'Tatyancha Thokla Eknath Patil Spardha Pariksha',
    estimatedCommissionPercent: 8,
  },

  // 13. CSAT - Sachin Dhawale Sir
  {
    id: 'csat_sachin_dhawale',
    titleMr: 'अंकगणित व बुद्धिमत्ता चाचणी (CSAT Aptitude & Reasoning)',
    titleEn: 'Quantitative Aptitude & Logical Reasoning for MPSC',
    authorMr: 'सचिन ढवळे (Sachin Dhawale)',
    authorEn: 'Sachin Dhawale',
    publisherMr: 'ढवळेज् अकॅडमी पब्लिकेशन, पुणे',
    publisherEn: 'Dhawale Academy Publication',
    subjectId: 'csat',
    subjectNameMr: 'CSAT अंकगणित व बुद्धिमत्ता',
    subjectNameEn: 'CSAT Aptitude & Reasoning',
    editionMr: 'सुधारित शॉर्टकट ट्रिक्स आवृत्ती २०२५-२०२६',
    editionEn: '2025-26 Shortcut Tricks Edition',
    mrp: 650,
    offerPrice: 490,
    discountPercent: 25,
    rating: 4.8,
    reviewsCount: 9400,
    coverImage: '/library_books.jpg',
    importanceMr: 'कम्बाईन पूर्व व राज्यसेवा CSAT मध्ये वेळ वाचवून गणित-बुद्धिमत्तेत पैकीच्या पैकी गुण मिळवून देणारा सर्वाधिक खपाचा ग्रंथ.',
    importanceEn: 'Best-selling guide with lightning-fast Vedic math and elimination tricks for MPSC Aptitude & Reasoning.',
    topperTipMr: 'दररोज किमान २५ गणित व बुद्धिमत्ता प्रश्न टाईमर लावून सोडवा. शॉर्टकट ट्रिक्सची स्वतंत्र सूत्र वही तयार करा.',
    badgeMr: '🧮 CSAT टॉपर चॉईस',
    badgeEn: '🧮 Top CSAT Choice',
    tags: ['अंकगणित', 'बुद्धिमत्ता', 'शॉर्टकट ट्रिक्स', 'CSAT', 'कम्बाईन'],
    amazonKeywords: 'Sachin Dhawale Ankganit Buddhimatta MPSC CSAT',
    estimatedCommissionPercent: 8,
  },

  // 14. English Grammar - Balasaheb Shinde
  {
    id: 'english_balasaheb_shinde',
    titleMr: 'संपूर्ण इंग्रजी व्याकरण व शब्दसंग्रह (English Grammar & Vocab)',
    titleEn: 'Comprehensive English Grammar & Vocabulary',
    authorMr: 'बाळासाहेब शिंदे (Balasaheb Shinde)',
    authorEn: 'Balasaheb Shinde',
    publisherMr: 'द युनिक अकॅडमी / अनिकेत पब्लिकेशन',
    publisherEn: 'Aniket Publication',
    subjectId: 'english',
    subjectNameMr: 'इंग्रजी व्याकरण व शब्दसंग्रह',
    subjectNameEn: 'English Grammar & Vocabulary',
    editionMr: 'नवीनतम सुधारित आवृत्ती (नियम व उदाहरणांसह)',
    editionEn: 'Latest Revised Edition',
    mrp: 480,
    offerPrice: 360,
    discountPercent: 25,
    rating: 4.7,
    reviewsCount: 11200,
    coverImage: '/vintage_reference_books.jpg',
    importanceMr: 'मराठी माध्यमातून शिकलेल्या विद्यार्थ्यांसाठी इंग्रजी व्याकरण सोप्या मराठी भाषेत समजावून सांगणारा सर्वाधिक लोकप्रिय संदर्भ ग्रंथ.',
    importanceEn: 'Clear rules, Marathi-to-English grammar formulas, and previous question exercises tailored for Maharashtra aspirants.',
    topperTipMr: 'Voice, Narration, Degree आणि Idioms-Phrases वर रोज ३० मिनिटे द्या; संयुक्त मुख्य परीक्षेत इंग्रजी हाच मेरिट ठरवतो.',
    badgeMr: '🅰️ इंग्रजी व्याकरण नंबर १',
    badgeEn: '🅰️ English Grammar #1',
    tags: ['इंग्रजी व्याकरण', 'Idioms', 'Tense', 'Direct Indirect', 'Vocabulary'],
    amazonKeywords: 'Balasaheb Shinde English Grammar MPSC Combine',
    estimatedCommissionPercent: 8,
  },

  // 15. General Science - Dr. Sachin Bhaske
  {
    id: 'science_sachin_bhaske',
    titleMr: 'सामान्य विज्ञान एनसायक्लोपीडिया (General Science)',
    titleEn: 'General Science Encyclopaedia for MPSC',
    authorMr: 'डॉ. सचिन भस्के (Dr. Sachin Bhaske)',
    authorEn: 'Dr. Sachin Bhaske',
    publisherMr: 'दीपस्तंभ / युनिक अकॅडमी पब्लिकेशन',
    publisherEn: 'Deepstambh / Unique Academy',
    subjectId: 'general_science',
    subjectNameMr: 'सामान्य विज्ञान (भौतिक, रसायन, जीव, आरोग्यशास्त्र)',
    subjectNameEn: 'General Science (Physics, Chem, Bio, Health)',
    editionMr: 'आयोगाच्या नव्या अभ्यासक्रमानुसार अद्ययावत',
    editionEn: 'Updated NCERT/State Board Syllabus Edition',
    mrp: 580,
    offerPrice: 435,
    discountPercent: 25,
    rating: 4.8,
    reviewsCount: 8100,
    coverImage: '/science_laboratory.jpg',
    importanceMr: 'स्टेट बोर्ड (५ वी ते १२ वी) व NCERT चा सर्वसमावेशक सारांश. मानवी आरोग्य, रोग व पोषण, वर्गीकरण अत्यंत सोप्या आकृत्यांसह.',
    importanceEn: 'Complete compilation of 5th-12th State Board and NCERT science concepts with diagrams and health science.',
    topperTipMr: 'प्राणी व वनस्पतींचे वर्गीकरण आणि व्हिटॅमिन्सचे तक्ते तोंडपाठ करा; विज्ञानात १५ पैकी १२+ हमखास येतात.',
    badgeMr: '🔬 विज्ञानातील सुवर्ण संदर्भ',
    badgeEn: '🔬 Science Gold Standard',
    tags: ['जीवशास्त्र', 'भौतिकशास्त्र', 'रसायनशास्त्र', 'आरोग्यशास्त्र', 'NCERT सारांश'],
    amazonKeywords: 'Sachin Bhaske Samanya Vigyan MPSC General Science',
    estimatedCommissionPercent: 8,
  },

  // 16. Economy - Kiran Desale Sir (Deepstambh)
  {
    id: 'economy_kiran_desale',
    titleMr: 'दीपस्तंभ भारतीय अर्थव्यवस्था भाग-१ (समग्र अर्थशास्त्र)',
    titleEn: 'Deepstambh Indian Economy - Part 1 & 2',
    authorMr: 'प्रा. किरण देसले (Prof. Kiran Desale)',
    authorEn: 'Prof. Kiran Desale',
    publisherMr: 'दीपस्तंभ प्रकाशन (Deepstambh Foundation)',
    publisherEn: 'Deepstambh Prakashan',
    subjectId: 'economy',
    subjectNameMr: 'भारतीय अर्थव्यवस्था, दारिद्र्य, बँकिंग व कृषी',
    subjectNameEn: 'Indian Economy, Poverty, Banking & Agriculture',
    editionMr: 'नवीनतम बजेट व आर्थिक पाहणीसह अद्ययावत आवृत्ती',
    editionEn: 'Updated with latest Budget & Economic Survey',
    mrp: 620,
    offerPrice: 475,
    discountPercent: 23,
    rating: 4.8,
    reviewsCount: 7600,
    coverImage: '/economics_growth_chart.jpg',
    importanceMr: 'राष्ट्रीय उत्पन्न, चलनवाढ, बँकिंग सुधारणा, नीती आयोग आणि दारिद्र्य निर्मूलन योजनांची अद्ययावत आकडेवारी देणारा दीपस्तंभ ग्रंथ.',
    importanceEn: 'In-depth conceptual economy text covering National Income, Inflation, RBI policies, and poverty estimates.',
    topperTipMr: 'कोळंबे सरांच्या पुस्तकानंतर देसले सरांच्या पुस्तकातील संकल्पना वाचल्यास मुख्य परीक्षेत अर्थव्यवस्थेत सर्वोच्च गुण मिळतात.',
    badgeMr: '📈 दीपस्तंभ अर्थशास्त्र',
    badgeEn: '📈 Deepstambh Economy',
    tags: ['अर्थव्यवस्था', 'बँकिंग', 'दारिद्र्य', 'राष्ट्रीय उत्पन्न', 'बजेट'],
    amazonKeywords: 'Kiran Desale Bhartiya Arthavyavastha Deepstambh MPSC',
    estimatedCommissionPercent: 8,
  },

  // 17. Maharashtra Modern History - Samadhan Mahajan
  {
    id: 'history_samadhan_mahajan',
    titleMr: 'आधुनिक भारताचा व महाराष्ट्राचा इतिहास',
    titleEn: 'Modern Indian & Maharashtra History',
    authorMr: 'समाधान महाजन (Samadhan Mahajan)',
    authorEn: 'Samadhan Mahajan',
    publisherMr: 'युनिक ॲकॅडमी पब्लिकेशन, पुणे',
    publisherEn: 'The Unique Academy',
    subjectId: 'maharashtra_history',
    subjectNameMr: 'आधुनिक भारत व महाराष्ट्राचा इतिहास',
    subjectNameEn: 'Modern India & Maharashtra History',
    editionMr: 'समाजसुधारक व स्वातंत्र्य लढा विशेष आवृत्ती',
    editionEn: 'Social Reformers & Freedom Struggle Special',
    mrp: 520,
    offerPrice: 395,
    discountPercent: 24,
    rating: 4.7,
    reviewsCount: 6500,
    coverImage: '/mpsc_history_book.jpg',
    importanceMr: 'महाराष्ट्रातील समाजसुधारक, शेतकरी-कामगार चळवळी, वृत्तपत्रे व १८५७ चा लढा यावर आयोगाने विचारलेल्या प्रश्नांचे अचूक कव्हरेज.',
    importanceEn: 'Focused syllabus book covering Maharashtra social reformers, peasant movements, journalism, and freedom struggles.',
    topperTipMr: 'समाजसुधारक, त्यांची वृत्तपत्रे, संस्था आणि त्यांनी लिहिलेली पुस्तके यांचा तुलनात्मक चार्ट तयार करा.',
    badgeMr: '🏛️ इतिहास संदर्भ ग्रंथ',
    badgeEn: '🏛️ History Essential',
    tags: ['समाजसुधारक', 'स्वातंत्र्य लढा', 'महाराष्ट्र इतिहास', 'वृत्तपत्रे'],
    amazonKeywords: 'Samadhan Mahajan Aadhunik Maharashtracha Itihas Unique Academy',
    estimatedCommissionPercent: 8,
  },

  // 18. Oxford Student Atlas for India (Maps & Geography)
  {
    id: 'geography_oxford_atlas',
    titleMr: 'ऑक्सफर्ड विद्यार्थी ॲटलास (Oxford Student Atlas for India)',
    titleEn: 'Oxford Student Atlas for India (English / Marathi)',
    authorMr: 'ऑक्सफर्ड युनिव्हर्सिटी प्रेस (Oxford University Press)',
    authorEn: 'Oxford University Press',
    publisherMr: 'Oxford University Press India',
    publisherEn: 'Oxford University Press',
    subjectId: 'maharashtra_geography',
    subjectNameMr: 'नकाशा वाचन, पर्वत, नद्या, राष्ट्रीय उद्याने',
    subjectNameEn: 'Map Reading, Mountains, Rivers, National Parks',
    editionMr: '४ थी सुधारित नवीनतम आवृत्ती',
    editionEn: '4th Latest Edition',
    mrp: 420,
    offerPrice: 310,
    discountPercent: 26,
    rating: 4.9,
    reviewsCount: 22400,
    coverImage: '/maharashtra_map_administrative.jpg',
    importanceMr: 'भूगोलातील नकाशे, नद्यांची खोरी, घाट, अभयारण्ये, आंतरराष्ट्रीय सागरी मार्ग आणि खनिज पट्टे समजण्यासाठी अनिवार्य ॲटलास.',
    importanceEn: 'High-precision topographic and political atlas for mastering Indian & World geography map-based questions.',
    topperTipMr: 'रोज सकाळी १० मिनिटे भारताचा आणि महाराष्ट्राचा नकाशा डोळ्याखालून घाला; नकाशांवर आधारित ५-६ प्रश्न हमखास येतात.',
    badgeMr: '🗺️ नकाशा वाचनाचा सम्राट',
    badgeEn: '🗺️ Map Master Atlas',
    tags: ['ॲटलास', 'नकाशा वाचन', 'नद्या', 'पर्वतरांगा', 'खनिज पट्टे'],
    amazonKeywords: 'Oxford Student Atlas for India latest edition',
    estimatedCommissionPercent: 8,
  },

  // 19. Simplified Current Affairs Yearbook 2025-2026 - Dr. Sushil Bari
  {
    id: 'current_simplified_bari',
    titleMr: 'सिम्प्लिफाईड चालू घडामोडी वार्षिकी (Simplified Yearbook)',
    titleEn: 'Simplified Current Affairs Yearbook 2025-26',
    authorMr: 'डॉ. सुशील बारी (Dr. Sushil Bari)',
    authorEn: 'Dr. Sushil Bari',
    publisherMr: 'सिम्प्लिफाईड ॲक्टिव्हिटी पब्लिकेशन',
    publisherEn: 'Simplified Publications',
    subjectId: 'current_affairs',
    subjectNameMr: 'वार्षिक चालू घडामोडी, योजना, पुरस्कार व क्रीडा',
    subjectNameEn: 'Yearly Current Affairs, Schemes & Awards',
    editionMr: '२०२५-२०२६ संपूर्ण वार्षिकी',
    editionEn: '2025-2026 Complete Annual Edition',
    mrp: 350,
    offerPrice: 280,
    discountPercent: 20,
    rating: 4.8,
    reviewsCount: 5300,
    coverImage: '/mpsc_textbooks.jpg',
    importanceMr: 'MPSC पॅटर्ननुसार ४ विधानांचे प्रश्न, स्पष्टीकरणासह संकलित चालू घडामोडींचा सर्वात विश्वासार्ह वार्षिक संदर्भ.',
    importanceEn: 'Concise, high-yield compilation of 12 months national, state, environmental, and defense developments.',
    topperTipMr: 'शासकीय योजना (लाडकी बहीण, नमो शेतकरी) व पर्यावरण परिषदा यातील तारखा व निकष लक्षपूर्वक वाचा.',
    badgeMr: '📅 वार्षिक चालू घडामोडी',
    badgeEn: '📅 Annual Current Affairs',
    tags: ['चालू घडामोडी वार्षिकी', 'शासकीय योजना', 'पुरस्कार', 'क्रीडा', 'पर्यावरण'],
    amazonKeywords: 'Dr Sushil Bari Simplified Chalu Ghadamodi Yearbook MPSC',
    estimatedCommissionPercent: 8,
  },

  // 20. Marathi Shabdarathna & PYQ - M. R. Walambe
  {
    id: 'marathi_shabdratna_walambe',
    titleMr: 'मराठी शब्दरत्न व सराव प्रश्नसंच (म. रा. वाळंबे)',
    titleEn: 'Marathi Shabdarathna & Practice Question Bank',
    authorMr: 'मो. रा. वाळंबे (M. R. Walambe)',
    authorEn: 'M. R. Walambe',
    publisherMr: 'नितीन प्रकाशन, पुणे',
    publisherEn: 'Nitin Prakashan',
    subjectId: 'marathi_grammar',
    subjectNameMr: 'मराठी शब्दसंग्रह (समानार्थी, विरुद्धार्थी, म्हणी, वाक्प्रचार)',
    subjectNameEn: 'Marathi Vocabulary, Synonyms, Idioms & Proverbs',
    editionMr: 'अद्ययावत सराव आवृत्ती',
    editionEn: 'Updated Vocabulary Edition',
    mrp: 260,
    offerPrice: 210,
    discountPercent: 19,
    rating: 4.8,
    reviewsCount: 7800,
    coverImage: '/vintage_reference_books.jpg',
    importanceMr: 'वाळंबे सरांच्या व्याकरण पुस्तकाचा अधिकृत जोडीदार शब्दरत्न ग्रंथ. ५,०००+ म्हणी, वाक्प्रचार, शब्दसमूहाबद्दल एक शब्द.',
    importanceEn: 'Indispensable companion vocabulary bank of M.R. Walambe covering high-scoring synonyms and proverbs.',
    topperTipMr: 'दररोज जेवणानंतर १० मिनिटे ५ म्हणी व ५ समानार्थी शब्द वाचण्याची सवय लावा; मुख्य परीक्षेत २० गुण पक्के होतात.',
    badgeMr: '📖 मराठी शब्दसंपदा सम्राट',
    badgeEn: '📖 Marathi Vocab Master',
    tags: ['मराठी शब्दसंग्रह', 'म्हणी', 'वाक्प्रचार', 'समानार्थी', 'विरुद्धार्थी'],
    amazonKeywords: 'Marathi Shabdarathna M R Walambe Nitin Prakashan',
    estimatedCommissionPercent: 8,
  },

  // 21. Study Gear - MPSC Official 200 Questions Practice OMR Sheet Pad
  {
    id: 'study_gear_omr_pad',
    titleMr: 'MPSC अधिकृत सराव OMR शीट पॅड (१०० शीट्स बंडल)',
    titleEn: 'MPSC 200 Questions Practice OMR Sheet Pad (100 Sheets)',
    authorMr: 'MPSC टॉपर स्टडी गियर',
    authorEn: 'MPSC Aspirant Prep Gear',
    publisherMr: 'एक्झाम रेडी स्टेशनरी',
    publisherEn: 'Exam Ready Stationery India',
    subjectId: 'stationery_omr',
    subjectNameMr: 'OMR सराव शीट्स व परीक्षा साहित्य',
    subjectNameEn: 'OMR Practice Sheets & Exam Stationery',
    editionMr: 'आयोगाच्या १००/२०० प्रश्न फॉरमॅटनुसार डिझाइन',
    editionEn: 'Official 100/200 Questions MPSC Format',
    mrp: 399,
    offerPrice: 249,
    discountPercent: 38,
    rating: 4.7,
    reviewsCount: 15400,
    coverImage: '/library_books.jpg',
    importanceMr: 'परीक्षेत प्रत्यक्ष OMR शीट भरताना होणाऱ्या चुका (उदा. प्रश्न क्रमांक चुकून खाली रंगवणे) टाळण्यासाठी प्रत्यक्ष OMR वर सराव आवश्यक आहे.',
    importanceEn: 'High-quality 100 GSM non-bleed OMR sheets modeled on Maharashtra Public Service Commission exam formats.',
    topperTipMr: 'प्रत्येक रविवारी १ पूर्ण टेस्ट प्रत्यक्ष OMR वर गोल रंगवून सोडवा; यामुळे प्रत्यक्ष परीक्षेत ५ ते ७ सिली मिस्टेक्स वाचतात!',
    badgeMr: '📝 सराव ओएमआर पॅड (९% कमिशन)',
    badgeEn: '📝 Official OMR Pad (9% Comm)',
    tags: ['OMR शीट', 'सराव टेस्ट', 'गोळे रंगवणे', 'सिली मिस्टेक टाळा', '१०टक्के कमिशन'],
    amazonKeywords: 'MPSC OMR Sheet Practice Pad 100 Sheets 200 Questions',
    estimatedCommissionPercent: 9,
  },

  // 22. Study Gear - Digital Silent Desk Timer & Stopwatch
  {
    id: 'study_gear_digital_timer',
    titleMr: 'म्युट सायलेंट डिजिटल रिव्हिजन टायमर व स्टॉपवॉच',
    titleEn: 'Digital Silent Study Timer & Stopwatch for Aspirants',
    authorMr: 'स्टडी फोकस गॅजेट्स',
    authorEn: 'Focus Pro Tools',
    publisherMr: 'प्रोमोडोर गॅजेट्स',
    publisherEn: 'Focus Gadgets India',
    subjectId: 'study_gear',
    subjectNameMr: 'स्टडी गियर व अभ्यासाचे गॅजेट्स',
    subjectNameEn: 'Study Gear & High Commission Gadgets',
    editionMr: 'सायलेंट फ्लॅश लाईट व्हायब्रेशन मोड',
    editionEn: 'Silent Flash Mode for Reading Rooms',
    mrp: 699,
    offerPrice: 389,
    discountPercent: 44,
    rating: 4.8,
    reviewsCount: 8900,
    coverImage: '/library_books.jpg',
    importanceMr: 'लायब्ररी व अभ्यासिकांमध्ये आवाजाशिवाय (Silent Flash) वेळ मोजण्यासाठी, १ तासाचे पोमोडोरो स्लॉट्स आणि स्पीड ड्रिल्ससाठी सर्वोत्तम साधन.',
    importanceEn: 'Silent flash alert desk timer preventing phone distractions and building 60-minute intense focus blocks.',
    topperTipMr: 'अभ्यास करताना मोबाईल पूर्ण बंद ठेवा आणि या डेस्क टायमरवर ६० मिनिटांचे २ स्लॉट्स लावून रिव्हिजन करा.',
    badgeMr: '⏱️ लायब्ररी मस्ट-हॅव (९% कमिशन)',
    badgeEn: '⏱️ Library Must-Have (9% Comm)',
    tags: ['स्टॉपवॉच', 'टायमर', 'पोमोडोरो', 'लायब्ररी', '९टक्के कमिशन'],
    amazonKeywords: 'Digital Study Timer Silent Stopwatch for students exams',
    estimatedCommissionPercent: 9,
  },

  // 23. Study Gear - Metal Ergonomic Book Reading Stand
  {
    id: 'study_gear_reading_stand',
    titleMr: 'मेटल ॲडजस्टेबल बुक रीडिंग स्टँड (मानदुखी निवारक)',
    titleEn: 'Metal Adjustable Book Reading Stand & Textbook Holder',
    authorMr: 'एर्गोनॉमिक स्टडी सोल्युशन्स',
    authorEn: 'Ergonomic Study Lab',
    publisherMr: 'स्टडी कम्फर्ट',
    publisherEn: 'Study Comfort India',
    subjectId: 'study_gear',
    subjectNameMr: 'स्टडी गियर व वाचन स्टँड',
    subjectNameEn: 'Study Gear & Ergonomic Reading Stands',
    editionMr: '६ अँगल ॲडजस्टेबल हेवी मेटल स्टँड',
    editionEn: '6 Adjustable Angles Heavy Metal Stand',
    mrp: 799,
    offerPrice: 449,
    discountPercent: 44,
    rating: 4.7,
    reviewsCount: 12100,
    coverImage: '/library_books.jpg',
    importanceMr: 'दररोज ८ ते १० तास अभ्यास करणाऱ्या विद्यार्थ्यांची मान व पाठ दुखू नये म्हणून डोळ्यांच्या रेषेत (Eye-Level) पुस्तक ठेवणारा स्टँड.',
    importanceEn: 'Heavy duty metal reading stand holding thick textbooks like Laxmikanth and Saudi without slipping.',
    topperTipMr: 'लक्ष्मीकांत व ठोकळ्यासारखे जाड ग्रंथ वाचताना हेवी मेटल क्लिप्स पानांना स्थिर ठेवतात व मानदुखी होत नाही.',
    badgeMr: '📖 वाचन स्टँड (९% कमिशन)',
    badgeEn: '📖 Reading Stand (9% Comm)',
    tags: ['बुक स्टँड', 'मानदुखी टाळा', 'लक्ष्मीकांत होल्डर', '९टक्के कमिशन'],
    amazonKeywords: 'Metal Book Reading Stand adjustable for thick textbooks',
    estimatedCommissionPercent: 9,
  },

  // 24. Study Gear - Samsung Galaxy Tab A9 (MPSC PDF / Test Series Tablet)
  {
    id: 'study_gear_samsung_tab',
    titleMr: 'सॅमसंग गॅलेक्सी टॅब A9 (MPSC ई-बुक्स व मॉक टेस्ट्स टॅब्लेट)',
    titleEn: 'Samsung Galaxy Tab A9 (WiFi / 4GB RAM / Eye Care)',
    authorMr: 'सॅमसंग इलेक्ट्रॉनिक्स',
    authorEn: 'Samsung Electronics',
    publisherMr: 'सॅमसंग इंडिया',
    publisherEn: 'Samsung India',
    subjectId: 'study_gear',
    subjectNameMr: 'ई-लर्निंग टॅब्लेट व हाय-तिकीट कमिशन गॅजेट',
    subjectNameEn: 'E-Learning Tablet & High Ticket Tech',
    editionMr: '८.७ इंच आय-कम्फर्ट डिस्प्ले २०२५ मॉडेल',
    editionEn: '8.7 inch Eye Comfort Display 2025 Model',
    mrp: 14999,
    offerPrice: 10499,
    discountPercent: 30,
    rating: 4.6,
    reviewsCount: 24500,
    coverImage: '/computer_lab_studying.jpg',
    importanceMr: 'विद्यार्थी हजारो पानांचे PDF, नोट्स आणि ऑनलाईन सराव चाचण्या सोडवण्यासाठी टॅब्लेट वापरतात. या एका विक्रीवर तुम्हाला ₹५०० ते ₹१,०००+ कमिशन मिळते!',
    importanceEn: 'High-ticket electronic affiliate item yielding ₹500 - ₹1,000+ commission per student purchase for PDF reading.',
    topperTipMr: 'टेलिग्राम किंवा व्हॉट्सॲपवर "MPSC साठी सर्वोत्तम बजेट ई-रीडिंग टॅब्लेट" म्हणून ही लिंक शेअर करा; दरमहा २-३ टॅब्लेट खपल्यास ₹२,५००+ थेट कमाई!',
    badgeMr: '💎 हाय-तिकीट कमाई (₹८००+ कमिशन)',
    badgeEn: '💎 High-Ticket Gear (₹800+ Comm)',
    tags: ['टॅब्लेट', 'सॅमसंग', 'ई-बुक्स वाचन', 'हाय कमिशन', 'इलेक्ट्रॉनिक्स'],
    amazonKeywords: 'Samsung Galaxy Tab A9 WiFi 4GB 64GB',
    estimatedCommissionPercent: 5,
  },

  // 25. Study Gear - Rechargeable Eye-Care LED Study Desk Lamp
  {
    id: 'study_gear_led_lamp',
    titleMr: 'रिचार्ज करण्यायोग्य आय-केअर LED स्टडी डेस्क लॅम्प',
    titleEn: 'Rechargeable Eye-Care LED Study Desk Lamp with Dimmer',
    authorMr: 'ब्राइट स्टडी गॅजेट्स',
    authorEn: 'Bright Study Tech',
    publisherMr: 'लुमेन टेक इंडिया',
    publisherEn: 'LumenTech India',
    subjectId: 'study_gear',
    subjectNameMr: 'स्टडी लॅम्प व डोळ्यांची काळजी',
    subjectNameEn: 'Study Lamp & Eye-Care Electronics',
    editionMr: '३ कलर मोड्स (वॉर्म/व्हाईट/नेचरल) टच सेन्सर',
    editionEn: '3 Color Modes Touch Dimmer',
    mrp: 899,
    offerPrice: 499,
    discountPercent: 44,
    rating: 4.7,
    reviewsCount: 16700,
    coverImage: '/library_books.jpg',
    importanceMr: 'रात्रीच्या अभ्यासात डोळ्यांवर ताण येऊ नये म्हणून फ्लिकर-फ्री (Flicker-Free) लाईट देणारा फोल्डेबल रिचार्जेबल लॅम्प.',
    importanceEn: 'Flicker-free warm/cool LED light preventing headaches and eye fatigue during late-night MPSC revisions.',
    topperTipMr: 'लोडशेडिंग किंवा प्रवासातही ५ तास बॅटरी बॅकअप मिळतो; रात्री वाचनासाठी सर्वोत्तम भेट.',
    badgeMr: '💡 स्टडी लॅम्प (९% कमिशन)',
    badgeEn: '💡 Study Lamp (9% Comm)',
    tags: ['स्टडी लॅम्प', 'रात्रीचा अभ्यास', 'डोळ्यांची काळजी', '९टक्के कमिशन'],
    amazonKeywords: 'Rechargeable LED Desk Study Lamp touch dimmer eye care',
    estimatedCommissionPercent: 9,
  },

  // 26. Study Gear - Highlighter Set & Index Sticky Tabs Flags
  {
    id: 'study_gear_highlighter_set',
    titleMr: 'स्टडी हायलायटर व निऑन इंडेक्स स्टिकी नोट्स फ्लॅग्ज किट',
    titleEn: 'Pastel Study Highlighters & Neon Index Sticky Flags Kit',
    authorMr: 'कॅम्पस स्टेशनरी प्रो',
    authorEn: 'Campus Stationery Pro',
    publisherMr: 'हायलाईट इंडिया',
    publisherEn: 'Highlight India',
    subjectId: 'stationery_omr',
    subjectNameMr: 'हायलायटर व स्टिकी नोट्स किट',
    subjectNameEn: 'Highlighters & Sticky Notes Kit',
    editionMr: '६ पेस्टल कलर्स + १२०० इंडेक्स फ्लॅग्ज बंडल',
    editionEn: '6 Pastel Colors + 1200 Index Flags Bundle',
    mrp: 499,
    offerPrice: 289,
    discountPercent: 42,
    rating: 4.8,
    reviewsCount: 9800,
    coverImage: '/library_books.jpg',
    importanceMr: 'पुस्तकातील महत्त्वाची कलमे, तारखा व आकडेवारी त्वरित शोधण्यासाठी आणि नोट्समध्ये इंडेक्स करण्यासाठी आवश्यक किट.',
    importanceEn: 'Pastel non-bleeding highlighters paired with repositionable sticky index flags for rapid bookmarking.',
    topperTipMr: 'लक्ष्मीकांत व सौदी पुस्तकात प्रत्येक प्रकरणाला वेगळा रंगीत फ्लॅग लावा; रिव्हिजनचा वेग दुपटीने वाढतो.',
    badgeMr: '🎨 रिव्हिजन किट (९% कमिशन)',
    badgeEn: '🎨 Revision Kit (9% Comm)',
    tags: ['हायलायटर', 'स्टिकी नोट्स', 'इंडेक्स फ्लॅग', 'रिव्हिजन किट', '९टक्के कमिशन'],
    amazonKeywords: 'Pastel Highlighters and Sticky Index Tabs flags for studying',
    estimatedCommissionPercent: 9,
  },
];

export const AMAZON_AFFILIATE_STEPS_MR = [
  {
    stepNumber: 1,
    title: 'Amazon Associates India वर मोफत खाते उघडा',
    desc: 'https://affiliate-program.amazon.in वर जाऊन "Sign Up" करा. तुमचे चालू Amazon अकाउंट वापरून लॉगिन करा.',
    actionLabel: 'affiliate-program.amazon.in उघडा ➜',
    actionUrl: 'https://affiliate-program.amazon.in/',
    tip: 'नोंदणी पूर्णपणे मोफत आहे. कोणत्याही एजंट किंवा पैशांची गरज नसते.'
  },
  {
    stepNumber: 2,
    title: 'वेबसाइट URL व ॲपची माहिती भरा',
    desc: 'वेबसाइट प्रोफाइल विचारल्यावर तुमच्या या MPSC प्लॅटफॉर्मची लिंक (उदा. तुमची लाईव्ह वेब लिंक) टाका. विषयामध्ये "MPSC Competitive Exam Prep & Book Recommendations" निवडा.',
    tip: 'तुम्ही तुमचा टेलिग्राम चॅनेल किंवा युट्यूब चॅनल असल्यास तोही ॲडिशनल प्रोफाइल म्हणून जोडू शकता.'
  },
  {
    stepNumber: 3,
    title: 'तुमचा युनिक Store ID / Associate Tag मिळवा',
    desc: 'नोंदणी झाल्यावर Amazon तुम्हाला एक युनिक ट्रॅकिंग आयडी देईल (उदा. mpscaspirant-21 किंवा तुमचा नाव-21). हा टॅग तुमच्या प्रत्येक लिंकमध्ये जोडला जातो.',
    tip: 'हाच टॅग तुम्ही खालील सेटिंग्ज बॉक्समध्ये प्रविष्ट केल्यास या ॲपमधील सर्व पुस्तकांच्या लिंक्स आपोआप तुमच्या टॅगवर ट्रॅक होतील!'
  },
  {
    stepNumber: 4,
    title: 'बँक खाते (NEFT) व पॅन कार्ड (Tax Info) जोडा',
    desc: 'Amazon Associates डॅशबोर्डमध्ये "Payment & Tax Information" मध्ये जाऊन तुमचे बँक खाते (IFSC कोड) व PAN कार्ड नंबर जोडा.',
    tip: 'किमान ₹१,०००/- कमिशन जमा झाल्यावर Amazon थेट तुमच्या बँक खात्यात दरमहा पैसे जमा (NEFT) करते.'
  },
  {
    stepNumber: 5,
    title: 'पुस्तकांवर ५% ते १०% कमिशन कसे मिळते?',
    desc: 'Amazon India च्या नियमांनुसार "Books" (पुस्तके) कॅटेगरीवर ५% ते ८% (आणि विशेष सेलमध्ये १०%) पर्यंत कमिशन मिळते. २४ तासांचा कुकी नियम: विद्यार्थ्याने तुमच्या लिंकवर क्लिक करून पुस्तकासोबत इतर कोणतीही वस्तू (पेन, बॅग, नोटबुक, लॅपटॉप) घेतली तरी त्यावरही तुम्हाला पूर्ण कमिशन मिळते!',
    tip: 'उदा. ₹६०० चे पुस्तक खपल्यास ₹४८ कमिशन. दरमहा १०० पुस्तके = ₹४,८००/- थेट बँक खात्यात!'
  },
  {
    stepNumber: 6,
    title: 'कायदेशीर नियम (Affiliate Policy & Disclaimer)',
    desc: 'अकाउंट सुरक्षित ठेवण्यासाठी वेबसाइटवर डिस्क्लेमर असणे आवश्यक आहे (जे या ॲपमध्ये आधीच जोडलेले आहे). स्वतःच्या लिंकवरून स्वतः खरेदी करू नका (Self-orders strictly prohibited by Amazon).',
    tip: 'विद्यार्थ्यांना पुस्तकांवर Amazon ची मूळ सवलत (२०% ते ३०%) मिळते, त्यामुळे विद्यार्थ्यांचाही फायदा होतो आणि तुम्हालाही कमिशन मिळते!'
  }
];
