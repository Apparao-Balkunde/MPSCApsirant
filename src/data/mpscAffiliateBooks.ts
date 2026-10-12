import { SubjectId } from '../types';

export interface MpscAffiliateBook {
  id: string;
  titleMr: string;
  titleEn: string;
  authorMr: string;
  authorEn: string;
  publisherMr: string;
  publisherEn: string;
  subjectId: SubjectId | 'pyq' | 'current_affairs' | 'csat' | 'english';
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
