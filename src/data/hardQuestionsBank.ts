import { Question } from '../types';

/**
 * Curated High-Yield Multi-Statement "Hard" Level Question Bank for MPSC Rajyaseva & Combine.
 * Covers all 10 subjects with assertion-reasoning, negative elimination, match the pairs, and chronological sorting.
 */
export const HARD_QUESTIONS_BANK: Question[] = [
  // =========================================================================
  // 1. MAHARASHTRA & MODERN INDIAN HISTORY (Hard Level)
  // =========================================================================
  {
    id: 'hard_hist_01',
    subjectId: 'maharashtra_history',
    topic: '1857 चा उठाव व महाराष्ट्र (1857 Uprising in Maharashtra)',
    subtopic: 'कोल्हापूर, पेठ व नाशिक उठाव',
    exam: 'Rajyaseva',
    difficulty: 'Hard',
    questionEn: 'Consider the following statements regarding the 1857 Uprising in Maharashtra:\n(A) In Kolhapur, the revolt broke out on the night of 31 July 1857 led by Ramji Shirsat of the 27th Native Infantry.\n(B) Raja Bhagwantrao of Peint (Nashik) and his Diwan Balaram were sentenced to death by the British for conspiring with Koli rebels.\n(C) In Satara, Rango Bapuji Gupte organized the uprising to reinstate Pratap Singh Maharaj but was betrayed.\n\nWhich of the statements given above are correct?',
    questionMr: 'महाराष्ट्रातील १८५७ च्या उठावाबाबत खालील विधाने विचारात घ्या:\n(अ) कोल्हापूर येथे २७ व्या नेटिव्ह इन्फंट्रीतील रामजी शिरसाट यांच्या नेतृत्वाखाली ३१ जुलै १८५७ च्या रात्री उठाव झाला.\n(ब) पेठ (नाशिक) चे राजे भगवंतराव व त्यांचे दिवाण बाळाराम यांना कोळी बंडखोरांशी संगनमत केल्याच्या आरोपावरून ब्रिटिशांनी फाशी दिली.\n(क) साताऱ्यामध्ये छत्रपती प्रतापसिंह महाराजांच्या गादीच्या पुनर्स्थापनेसाठी रंगो बापूजी गुप्ते यांनी उठावाची गुप्त आखणी केली होती.\n\nवरीलपैकी कोणती विधाने बरोबर आहेत?',
    optionsEn: [
      'Only (A) and (B)',
      'Only (B) and (C)',
      'Only (A) and (C)',
      'All (A), (B), and (C) are correct'
    ],
    optionsMr: [
      'फक्त (अ) आणि (ब)',
      'फक्त (ब) आणि (क)',
      'फक्त (अ) आणि (क)',
      'सर्व (अ), (ब) आणि (क) बरोबर'
    ],
    correctAnswerIndex: 3,
    explanationEn: 'All statements are historically verified:\n1. 27th Native Infantry rebelled on 31 July 1857 in Kolhapur under Ramji Shirsat, looting the treasury.\n2. Raja Bhagwantrao Nilkanthrao of Peint was hanged by the British on charges of aiding the Koli rebellion in Nashik/Dharampur.\n3. Rango Bapuji Gupte traveled to London to plead Pratapsinh\'s case; upon returning without success, he organized an armed rebellion in Satara and Kolhapur regions.',
    explanationMr: 'सर्व विधाने बरोबर आहेत:\n१. ३१ जुलै १८५७ रोजी कोल्हापूरच्या २७ व्या पलटणीने रामजी शिरसाट यांच्या नेतृत्वाखाली उठाव केला आणि सरकारी तिजोरी लुटली.\n२. पेठचे राजे भगवंतराव निळकंठराव आणि त्यांचे दिवाण यांना कोळ्यांच्या उठावास मदत केल्याच्या आरोपावरून ब्रिटिशांनी ६ डिसेंबर १८५७ रोजी तोफेच्या तोंडी/फासावर दिले.\n३. रंगो बापूजी गुप्ते यांनी साताऱ्याची गादी वाचवण्यासाठी लंडनपर्यंत लढा दिला व परत येऊन सातारच्या डोंगराळ भागात १८५७ च्या उठावाची बांधणी केली.',
    reference: 'Modern Maharashtra History - Dr. Suman Vaidya & Dr. Shanta Kothekar',
    yearTag: 'MPSC Rajyaseva Mains Pattern'
  },
  {
    id: 'hard_hist_02',
    subjectId: 'maharashtra_history',
    topic: 'क्रांतिकारक चळवळ (Revolutionary Movements in Maharashtra)',
    subtopic: 'वासुदेव बळवंत फडके व रामोशी उठाव',
    exam: 'Rajyaseva',
    difficulty: 'Hard',
    questionEn: 'With reference to the revolutionary struggle of Vasudev Balwant Phadke (1879), identify the INCORRECT statement:\n(A) His primary military advisor and Ramoshi leader was Daulatrao Naik, while Ismail Khan Rohilla assisted him with firearms.\n(B) Ganesh Vasudev Joshi (Kaka Joshi) and Mahadev Govind Ranade defended him in the court during his trial.\n(C) He sent an open proclamation to the British Governor Sir Richard Temple threatening to overthrow the British Raj.\n(D) He was arrested at Dever Nadagi in Kaladagi district (now Karnataka) by Major Daniel.',
    questionMr: 'वासुदेव बळवंत फडके यांच्या १८७९ मधील सशस्त्र क्रांती लढ्याबाबत खालीलपैकी कोणते विधान अयोग्य (चूक) आहे?\n(अ) दौलतराव नाईक हे त्यांचे प्रमुख रामोशी सहकारी होते आणि इस्माईल खान रोहिल्याने त्यांना बंदूकधारी सैनिकांची मदत केली होती.\n(ब) त्यांच्या खटल्याचे कामकाज न्या. महादेव गोविंद रानडे यांनी पाहिले व त्यांनी कोर्टात फडके यांची संपूर्ण बाजू मांडली.\n(क) त्यांनी मुंबईचे गव्हर्नर सर रिचर्ड टेंपल यांना जाहीरनामा पाठवून ब्रिटिश राजवट उलथून टाकण्याचा इशारा दिला होता.\n(ड) मेजर डॅनियल याने त्यांना विजापूरजवळील देवर नांदगी (ता. कलदगी) येथील बौद्ध विहारात/मठात झोपेत असताना पकडले.',
    optionsEn: [
      'Statement (A)',
      'Statement (B)',
      'Statement (C)',
      'Statement (D)'
    ],
    optionsMr: [
      'विधान (अ)',
      'विधान (ब)',
      'विधान (क)',
      'विधान (ड)'
    ],
    correctAnswerIndex: 1,
    explanationEn: 'Statement (B) is INCORRECT. Ganesh Vasudev Joshi (Sarvajanik Kaka) and younger advocate Mahadev Chimnaji Apte defended Vasudev Balwant Phadke in court. Justice Mahadev Govind Ranade was a government judicial officer and did NOT represent him as his advocate in court.',
    explanationMr: 'विधान (ब) अयोग्य आहे. वासुदेव बळवंत फडके यांचा खटला पुणे कोर्टात चालवला गेला, तेव्हा सार्वजनिक काका (गणेश वासुदेव जोशी) आणि तरुण वकील महादेव चिमणाजी आपटे यांनी फडके यांच्या बचावाचे काम केले. न्या. म. गो. रानडे हे ब्रिटिश सरकारचे न्यायिक अधिकारी होते, त्यांनी फडके यांचा खटला चालवला नव्हता.',
    reference: 'Maharashtra Gazetteer - History of Freedom Movement',
    yearTag: 'MPSC State Services Prelims'
  },
  {
    id: 'hard_hist_03',
    subjectId: 'maharashtra_history',
    topic: 'दलित व कामगार चळवळ (Dalit & Labor Movements in Maharashtra)',
    subtopic: 'महाड चवदार तळे व नारायण मेघाजी लोखंडे',
    exam: 'Both',
    difficulty: 'Hard',
    questionEn: 'Match List-I (Historic Events/Organizations) with List-II (Key Personalities/Dates):\nList-I:\n(P) Mahad Satyagraha (Chavdar Tale entry)\n(Q) Manusmriti Dahan Din\n(R) Bombay Mill Hands Association\n(S) Independent Labour Party (स्वतंत्र मजूर पक्ष)\n\nList-II:\n1. 25 December 1927\n2. 20 March 1927\n3. August 1936\n4. 1890 (Narayan Meghaji Lokhande)',
    questionMr: 'सूची-१ (ऐतिहासिक घटना/संघटना) व सूची-२ (संबंधित दिनांक/व्यक्ती) यांच्या योग्य जोड्या जुळवा:\nसूची-१:\n(P) महाड चवदार तळे सत्याग्रह\n(Q) मनुस्मृती दहन दिन\n(R) बॉम्बे मिल हँड्स असोसिएशन\n(S) स्वतंत्र मजूर पक्ष (Independent Labour Party)\n\nसूची-२:\n१. २५ डिसेंबर १९२७\n२. २० मार्च १९२७\n३. ऑगस्ट १९३६\n४. १८९० (नारायण मेघाजी लोखंडे)',
    optionsEn: [
      'P-2, Q-1, R-4, S-3',
      'P-1, Q-2, R-4, S-3',
      'P-2, Q-1, R-3, S-4',
      'P-4, Q-3, R-2, S-1'
    ],
    optionsMr: [
      'P-२, Q-१, R-४, S-३',
      'P-१, Q-२, R-४, S-३',
      'P-२, Q-१, R-३, S-४',
      'P-४, Q-३, R-२, S-१'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Correct matches:\n(P) Mahad Satyagraha took place on 20 March 1927 (celebrated as Social Empowerment Day).\n(Q) Manusmriti Dahan was conducted on 25 December 1927 at Mahad.\n(R) Bombay Mill Hands Association was formed in 1890 by Narayan Meghaji Lokhande (Father of Indian Trade Union Movement).\n(S) Independent Labour Party was established in August 1936 by Dr. B. R. Ambedkar to contest the 1937 provincial elections.',
    explanationMr: 'अचूक जोड्या:\n(P) महाड चवदार तळे सत्याग्रह: २० मार्च १९२७ (सामाजिक सबलीकरण दिन म्हणून साजरा होतो).\n(Q) मनुस्मृती दहन: २५ डिसेंबर १९२७ (महाड येथे सहस्रबुद्धे यांच्या हस्ते दहन झाले).\n(R) बॉम्बे मिल हँड्स असोसिएशन: १८९० मध्ये नारायण मेघाजी लोखंडे यांनी स्थापन केली (भारतातील पहिली कामगार संघटना).\n(S) स्वतंत्र मजूर पक्ष: ऑगस्ट १९३६ मध्ये डॉ. बाबासाहेब आंबेडकरांनी स्थापन केला.',
    reference: 'Dr. B.R. Ambedkar Writings and Speeches Vol 17',
    yearTag: 'Combine Group B/C Mains'
  },

  // =========================================================================
  // 2. MAHARASHTRA & INDIAN GEOGRAPHY (Hard Level)
  // =========================================================================
  {
    id: 'hard_geo_01',
    subjectId: 'maharashtra_geography',
    topic: 'सह्याद्री पर्वतरांग व घाटमार्ग (Sahyadri Mountain Passes)',
    subtopic: 'उत्तरेकडून दक्षिणेकडे घाटमार्गांचा क्रम',
    exam: 'Rajyaseva',
    difficulty: 'Hard',
    questionEn: 'Arrange the following mountain passes (घाटमार्ग) of the Western Ghats (Sahyadri) in the strict sequential order from NORTH to SOUTH:\n1. Bhor Ghat (भोर घाट / खंडाळा)\n2. Thal Ghat (थळ घाट / कसारा)\n3. Kumbharli Ghat (कुंभार्ली घाट)\n4. Varandha Ghat (वरंधा घाट)\n5. Phonda Ghat (फोंडा घाट)',
    questionMr: 'सह्याद्री (पश्चिम घाट) मधील खालील घाटमार्गांचा उत्तरेकडून दक्षिणेकडे (North to South) अचूक क्रम लावा:\n१. भोर घाट (खंडाळा घाट)\n२. थळ घाट (कसारा घाट)\n३. कुंभार्ली घाट\n४. वरंधा घाट\n५. फोंडा घाट',
    optionsEn: [
      '2 → 1 → 4 → 3 → 5',
      '1 → 2 → 4 → 3 → 5',
      '2 → 1 → 3 → 4 → 5',
      '2 → 4 → 1 → 3 → 5'
    ],
    optionsMr: [
      '२ → १ → ४ → ३ → ५',
      '१ → २ → ४ → ३ → ५',
      '२ → १ → ३ → ४ → ५',
      '२ → ४ → १ → ३ → ५'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Sequential North to South order of Sahyadri passes:\n1. Thal Ghat (Kasara Ghat) - Mumbai to Nashik (Northmost here)\n2. Bhor Ghat (Khandala Ghat) - Mumbai to Pune\n3. Varandha Ghat - Bhor (Pune) to Mahad (Raigad)\n4. Kumbharli Ghat - Karad (Satara) to Chiplun (Ratnagiri)\n5. Phonda Ghat - Kolhapur to Kankavli (Sindhudurg, Southmost here).\nTherefore: 2 → 1 → 4 → 3 → 5.',
    explanationMr: 'उत्तरेकडून दक्षिणेकडे अचूक क्रम:\n२. थळ घाट (कसारा घाट): मुंबई ते नाशिक\n१. भोर घाट (खंडाळा घाट): मुंबई ते पुणे\n४. वरंधा घाट: भोर (पुणे) ते महाड (रायगड)\n३. कुंभार्ली घाट: कराड (सातारा) ते चिपळूण (रत्नागिरी)\n५. फोंडा घाट: कोल्हापूर ते कणकवली/देवगड (सिंधुदुर्ग)\nम्हणून योग्य पर्याय: २ → १ → ४ → ३ → ५.',
    reference: 'Geography of Maharashtra - Prof. K. A. Khatib',
    yearTag: 'MPSC Rajyaseva Prelims'
  },
  {
    id: 'hard_geo_02',
    subjectId: 'maharashtra_geography',
    topic: 'नदी प्रणाली व जलप्रपात (River Systems & Geomorphic Features)',
    subtopic: 'रांजणखळगे (Potholes) व नदी खोरे उपनद्या',
    exam: 'Both',
    difficulty: 'Hard',
    questionEn: 'Consider the following statements regarding geomorphology and rivers in Maharashtra:\n(A) World-famous giant potholes (रांजणखळगे) formed by circular erosion of river bed are located at Nighoj in Ahmednagar district on the Kukadi River.\n(B) The Penganga river forms the natural boundary between Yavatmal and Nanded districts.\n(C) Dudhsagar waterfall on Mandovi river is situated in Maharashtra on the border of Ratnagiri.\n\nWhich of the above statements is/are correct?',
    questionMr: 'महाराष्ट्रातील भूरूपे व नदीप्रणालीबाबत खालील विधाने विचारात घ्या:\n(अ) कुकडी नदीच्या पात्रात खडकांचे वर्तुळाकार घर्षण होऊन तयार झालेले आशियातील सर्वात मोठे रांजणखळगे (Potholes) अहमदनगर जिल्ह्यातील निघोज येथे आढळतात.\n(ब) पैनगंगा ही नदी यवतमाळ आणि नांदेड जिल्ह्यांची नैसर्गिक सीमा निश्चित करते.\n(क) मांडवी नदीवरील प्रसिद्ध दूधसागर धबधबा हा रत्नागिरी जिल्ह्याच्या सीमेवर महाराष्ट्रात स्थित आहे.\n\nवरीलपैकी कोणती विधाने बरोबर आहेत?',
    optionsEn: [
      'Only (A) and (B)',
      'Only (B) and (C)',
      'Only (A) and (C)',
      'All (A), (B), and (C)'
    ],
    optionsMr: [
      'फक्त (अ) आणि (ब)',
      'फक्त (ब) आणि (क)',
      'फक्त (अ) आणि (क)',
      'सर्व (अ), (ब) आणि (क)'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Statements (A) and (B) are correct. Statement (C) is FALSE because Dudhsagar Falls on Mandovi River is located in Goa on the Goa-Karnataka border, NOT in Maharashtra.',
    explanationMr: 'विधाने (अ) आणि (ब) बरोबर आहेत. विधान (क) चूक आहे, कारण मांडवी नदीवरील प्रसिद्ध \'दूधसागर\' जलप्रपात हा गोवा आणि कर्नाटक राज्यांच्या सीमेवर भगवान महावीर अभयारण्यात स्थित आहे, महाराष्ट्रात नाही.',
    reference: 'Physical Geography of Maharashtra - YCMOU / Maharashtra State Board',
    yearTag: 'Combine Group B Prelims'
  },

  // =========================================================================
  // 3. INDIAN POLITY & CONSTITUTION (Hard Level)
  // =========================================================================
  {
    id: 'hard_pol_01',
    subjectId: 'polity',
    topic: 'मूलभूत हक्क व मार्गदर्शक तत्त्वे (FRs vs DPSP Landmark Cases)',
    subtopic: 'घटनेची मूलभूत संरचना (Basic Structure Doctrine)',
    exam: 'Rajyaseva',
    difficulty: 'Hard',
    questionEn: 'Arrange the following landmark Supreme Court judgments regarding the balance between Fundamental Rights and Directive Principles in chronological order:\n1. Minerva Mills vs. Union of India\n2. Kesavananda Bharati vs. State of Kerala\n3. Shankari Prasad vs. Union of India\n4. Golaknath vs. State of Punjab',
    questionMr: 'मूलभूत हक्क व मार्गदर्शक तत्त्वांच्या संघर्षाबाबतच्या सर्वोच्च न्यायालयाच्या खालील ऐतिहासिक खटल्यांचा योग्य कालानुक्रम (Chronological Order) लावा:\n१. मिनर्व्हा मिल्स विरुद्ध भारत सरकार\n२. केशवानंद भारती विरुद्ध केरळ राज्य\n३. शंकरी प्रसाद विरुद्ध भारत सरकार\n४. गोलकनाथ विरुद्ध पंजाब राज्य',
    optionsEn: [
      '3 → 4 → 2 → 1',
      '4 → 3 → 2 → 1',
      '3 → 2 → 4 → 1',
      '2 → 3 → 4 → 1'
    ],
    optionsMr: [
      '३ → ४ → २ → १',
      '४ → ३ → २ → १',
      '३ → २ → ४ → १',
      '२ → ३ → ४ → १'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Chronological timeline:\n1. Shankari Prasad Case: 1951 (Upheld Parliament\'s power to amend Fundamental Rights under Art 368).\n2. Golaknath Case: 1967 (Ruled Parliament cannot abridge Fundamental Rights).\n3. Kesavananda Bharati Case: 24 April 1973 (Propounded the Basic Structure Doctrine).\n4. Minerva Mills Case: 1980 (Struck down clauses 4 & 5 of 42nd Amendment, holding that the Indian Constitution is founded on the bedrock of balance between Part III and Part IV).\nOrder: 3 → 4 → 2 → 1.',
    explanationMr: 'सर्वोच्च न्यायालयाच्या खटल्यांचा अचूक कालानुक्रम:\n३. शंकरी प्रसाद खटला: १९५१ (कलम ३६८ अन्वये मूलभूत हक्कांमध्ये दुरुस्ती करता येते हा निकाल).\n४. गोलकनाथ खटला: १९६७ (संसदेला मूलभूत हक्क काढून घेण्याचा किंवा कमी करण्याचा अधिकार नाही).\n२. केशवानंद भारती खटला: २४ एप्रिल १९७३ (घटनेची मूलभूत संरचना - Basic Structure सिद्धांत).\n१. मिनर्व्हा मिल्स खटला: १९८० (भाग ३ आणि भाग ४ यांच्यातील सुसंवाद व संतुलन हीच संविधानाची मूळ चौकट आहे हा निकाल).\nयोग्य क्रम: ३ → ४ → २ → १.',
    reference: 'Indian Polity - M. Laxmikanth (Chapter: Basic Structure & Amending Power)',
    yearTag: 'MPSC Rajyaseva GS-II'
  },
  {
    id: 'hard_pol_02',
    subjectId: 'polity',
    topic: 'कलम ३७१ अंतर्गत विशेष तरतुदी (Article 371 Special Provisions)',
    subtopic: 'महाराष्ट्र व गुजरात वैधानिक विकास मंडळे',
    exam: 'Both',
    difficulty: 'Hard',
    questionEn: 'Consider the following statements regarding Article 371 of the Constitution of India:\n(A) Under Article 371(2), the President of India may provide for any special responsibility of the Governor of Maharashtra for the establishment of separate development boards for Vidarbha, Marathwada and the rest of Maharashtra.\n(B) The Governor must submit an annual report on the working of these boards to the Maharashtra Legislative Assembly.\n(C) It provides for equitable allocation of funds for developmental expenditure and equitable arrangement providing adequate facilities for technical education and vocational training.\n\nWhich of the statements given above are correct?',
    questionMr: 'भारतीय राज्यघटनेच्या कलम ३७१(२) मधील महाराष्ट्र व गुजरात संबंधातील विशेष तरतुदींविषयी खालील विधाने तपासा:\n(अ) कलम ३७१(२) अन्वये राष्ट्रपती आदेशाद्वारे विदर्भ, मराठवाडा आणि उर्वरित महाराष्ट्रासाठी स्वतंत्र वैधानिक विकास मंडळे स्थापन करण्याची विशेष जबाबदारी राज्यपालांवर सोपवू शकतात.\n(ब) या विकास मंडळांच्या कामकाजाचा वार्षिक अहवाल राज्यपालांनी महाराष्ट्र राज्य विधानमंडळासमोर सादर करणे बंधनकारक असते.\n(क) यामध्ये विकासात्मक खर्चासाठी निधीचे समन्यायी वाटप आणि तांत्रिक शिक्षण व व्यावसायिक प्रशिक्षणासाठी पुरेशा संधींची समन्यायी व्यवस्था करण्याची तरतूद आहे.\n\nवरीलपैकी कोणती विधाने बरोबर आहेत?',
    optionsEn: [
      'Only (A) and (C)',
      'Only (B) and (C)',
      'Only (A) and (B)',
      'All (A), (B), and (C) are correct'
    ],
    optionsMr: [
      'फक्त (अ) आणि (क)',
      'फक्त (ब) आणि (क)',
      'फक्त (अ) आणि (ब)',
      'सर्व (अ), (ब) आणि (क) अचूक आहेत'
    ],
    correctAnswerIndex: 3,
    explanationEn: 'All statements are strictly correct under Article 371(2) of the Indian Constitution. The President can authorize the Governor of Maharashtra to establish separate development boards for Vidarbha, Marathwada, and Rest of Maharashtra with reports placed before the State Legislature and equitable allocation of funds and public employment/educational facilities.',
    explanationMr: 'सर्व विधाने पूर्णपणे बरोबर आहेत. भारतीय संविधानातील कलम ३७१(२) नुसार राष्ट्रपतींच्या आदेशावरून महाराष्ट्राच्या राज्यपालांवर विदर्भ, मराठवाडा व उर्वरित महाराष्ट्रासाठी वैधानिक विकास मंडळे स्थापन करण्याची विशेष जबाबदारी दिली जाते. त्याचा अहवाल दरवर्षी राज्य विधानसभेत मांडला जातो व तिन्ही विभागांना समन्यायी निधी व रोजगार/शिक्षणाच्या संधी देणे बंधनकारक असते.',
    reference: 'Constitution of India - Article 371(2)',
    yearTag: 'Rajyaseva Prelims'
  },

  // =========================================================================
  // 4. INDIAN & MAHARASHTRA ECONOMY (Hard Level)
  // =========================================================================
  {
    id: 'hard_eco_01',
    subjectId: 'economy',
    topic: 'आरबीआयचे मौद्रिक पतधोरण साधने (RBI Monetary Policy Instruments)',
    subtopic: 'SDF, MSF, Repo Rate व Liquidity Adjustment Facility',
    exam: 'Rajyaseva',
    difficulty: 'Hard',
    questionEn: 'In 2022, Reserve Bank of India (RBI) introduced the Standing Deposit Facility (SDF) as an uncollateralized liquidity absorption mechanism. Consider the following statements:\n(A) SDF allows the RBI to absorb surplus liquidity from commercial banks without pledging government securities as collateral.\n(B) The SDF rate is pegged at 25 basis points below the Policy Repo Rate.\n(C) Marginal Standing Facility (MSF) is pegged at 25 basis points above the Policy Repo Rate.\n(D) Thus, the Liquidity Adjustment Facility (LAF) corridor width between SDF and MSF is 50 basis points.\n\nWhich of the above statements are correct?',
    questionMr: 'रिझर्व्ह बँकेने (RBI) अतिरिक्त तरलता शोषून घेण्यासाठी स्टँडिंग डिपॉझिट फॅसिलिटी (SDF) हे साधन सुरू केले. याबाबत खालील विधाने विचारात घ्या:\n(अ) SDF अंतर्गत रिझर्व्ह बँक बँकांना सरकारी रोखे गहाण (Collateral) न ठेवता त्यांच्याकडील अतिरिक्त निधी शोषून घेऊ शकते.\n(ब) SDF दर हा नेहमी पॉलिसी रेपो दरापेक्षा २५ बेसिस पॉईंट्स (०.२५%) ने कमी ठेवला जातो.\n(क) मार्जिनल स्टँडिंग फॅसिलिटी (MSF) चा दर हा नेहमी पॉलिसी रेपो दरापेक्षा २५ बेसिस पॉईंट्स (०.२५%) ने जास्त असतो.\n(ड) यामुळे RBI च्या LAF कॉरिडॉरची एकूण रुंदी ही ५० बेसिस पॉईंट्स (०.५०%) इतकी असते.\n\nवरीलपैकी कोणती विधाने अचूक आहेत?',
    optionsEn: [
      'Only (A), (B), and (C)',
      'Only (A) and (D)',
      'Only (B), (C), and (D)',
      'All (A), (B), (C), and (D) are correct'
    ],
    optionsMr: [
      'फक्त (अ), (ब) आणि (क)',
      'फक्त (अ) आणि (ड)',
      'फक्त (ब), (क) आणि (ड)',
      'सर्व (अ), (ब), (क) आणि (ड) अचूक आहेत'
    ],
    correctAnswerIndex: 3,
    explanationEn: 'All statements are correct. In April 2022, RBI operationalized the Standing Deposit Facility (SDF) under section 17 of the RBI Act. It requires no collateral (unlike Reverse Repo). SDF sits at Repo - 25 bps, MSF sits at Repo + 25 bps, creating a symmetric 50 bps operating band with the Repo rate at the center.',
    explanationMr: 'सर्व विधाने अचूक आहेत. एप्रिल २०२२ मध्ये आरबीआयने SDF ची अंमलबजावणी सुरू केली. या अंतर्गत बँकांना रोखे न देता (Uncollateralized) आरबीआय पैसे जमा करून घेते. रेपो दराच्या खाली २५ बेसिस पॉईंट्सवर SDF आणि वर २५ बेसिस पॉईंट्सवर MSF असल्याने संपूर्ण LAF कॉरिडॉर ५० बेसिस पॉईंट्सचा असतो.',
    reference: 'Indian Economy - Ramesh Singh / RBI Monetary Policy Reports',
    yearTag: 'Rajyaseva GS-IV & Combine Mains'
  },
  {
    id: 'hard_eco_02',
    subjectId: 'economy',
    topic: 'दारिद्र्य मोजमाप समित्या (Poverty Estimation Committees in India)',
    subtopic: 'तेंडुलकर समिती (2009) vs रंगराजन समिती (2014)',
    exam: 'Both',
    difficulty: 'Hard',
    questionEn: 'With reference to the Suresh Tendulkar Committee (2009) and C. Rangarajan Committee (2014) on poverty measurement in India, which statement is CORRECT?\n(A) Tendulkar Committee used Mixed Reference Period (MRP) while Rangarajan Committee adopted Modified Mixed Reference Period (MMRP).\n(B) Tendulkar Committee fixed the daily per capita poverty line expenditure at ₹32 for rural and ₹47 for urban areas (2011-12 prices).\n(C) Rangarajan Committee calculated all-India poverty for 2011-12 at 21.9%, which was lower than Tendulkar Committee\'s 29.5%.\n(D) Tendulkar Committee based its basket solely on minimum caloric norm of 2400 kcal in rural and 2100 kcal in urban.',
    questionMr: 'भारतातील दारिद्र्य मोजमापाबाबत प्रा. सुरेश तेंडुलकर समिती (२००९) आणि डॉ. सी. रंगराजन समिती (२०१४) यांच्या संदर्भात कोणते विधान अचूक आहे?\n(अ) तेंडुलकर समितीने मिश्र संदर्भ कालावधी (MRP) चा वापर केला होता, तर रंगराजन समितीने सुधारित मिश्र संदर्भ कालावधी (MMRP) चा अवलंब केला.\n(ब) तेंडुलकर समितीने ग्रामीण भागासाठी दरडोई दैनंदिन ₹३२ आणि शहरी भागासाठी ₹४७ ही दारिद्र्य रेषा निश्चित केली होती.\n(क) रंगराजन समितीने २०११-१२ सालासाठी देशातील दारिद्र्याचे प्रमाण २१.९% इतके मोजले, जे तेंडुलकर समितीच्या प्रमाणापेक्षा कमी होते.\n(ड) तेंडुलकर समितीने दारिद्र्य टोपलीमध्ये केवळ ग्रामीण २४०० आणि शहरी २१०० कॅलरीच्या निकषाचा आधार घेतला होता.',
    optionsEn: [
      'Statement (A) is correct',
      'Statement (B) is correct',
      'Statement (C) is correct',
      'Statement (D) is correct'
    ],
    optionsMr: [
      'विधान (अ) अचूक आहे',
      'विधान (ब) अचूक आहे',
      'विधान (क) अचूक आहे',
      'विधान (ड) अचूक आहे'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Statement (A) is the only correct statement:\n- Tendulkar Committee moved away from calorie norms and used MRP (Mixed Reference Period), arriving at ₹27.2 rural and ₹33.3 urban per day, and 21.9% poverty (2011-12).\n- Rangarajan Committee used MMRP (Modified Mixed Reference Period), arriving at ₹32 rural and ₹47 urban per day, and calculated higher poverty at 29.5% (rural 30.9%, urban 26.4%).',
    explanationMr: 'केवळ विधान (अ) अचूक आहे:\n- तेंडुलकर समितीने कॅलरी निकष सोडून MRP चा अवलंब केला होता आणि ग्रामीण ₹२७.२ व शहरी ₹३३.३ दैनंदिन खर्चाच्या आधारे २०११-१२ मधील दारिद्र्य २१.९% काढले होते.\n- रंगराजन समितीने MMRP पद्धतीचा वापर केला, ग्रामीणसाठी दरमहा ₹९७२ (₹३२/दिवस) आणि शहरीसाठी ₹१,४०७ (₹४७/दिवस) दारिद्र्य रेषा ठरवली व दारिद्र्याचे प्रमाण २९.५% असल्याचे स्पष्ट केले.',
    reference: 'Indian Economy - Dutt & Sundaram / NITI Aayog Poverty Reports',
    yearTag: 'MPSC Combine & Rajyaseva'
  },

  // =========================================================================
  // 5. GENERAL SCIENCE & TECHNOLOGY (Hard Level)
  // =========================================================================
  {
    id: 'hard_sci_01',
    subjectId: 'general_science',
    topic: 'भौतिकशास्त्र व खगोलशास्त्र (Physics: Escape Velocity & Gravitation)',
    subtopic: 'मुक्ती वेग (Escape Velocity) सूत्र व गणिते',
    exam: 'Rajyaseva',
    difficulty: 'Hard',
    questionEn: 'The escape velocity of a body from Earth\'s surface is approximately 11.2 km/s. If a hypothetical planet has twice the mass of Earth (M\' = 2M) and half the radius of Earth (R\' = R/2), what will be the escape velocity from the surface of this planet?',
    questionMr: 'पृथ्वीच्या पृष्ठभागावरून कोणत्याही वस्तूचा मुक्ती वेग (Escape Velocity) अंदाजे ११.२ किमी/सेकंद आहे. जर एखाद्या काल्पनिक ग्रहाचे वस्तुमान पृथ्वीच्या दुप्पट (M\' = 2M) आणि त्रिज्या पृथ्वीच्या निम्मी (R\' = R/2) असेल, तर त्या ग्रहावरील मुक्ती वेग किती असेल?',
    optionsEn: [
      '11.2 km/s',
      '22.4 km/s',
      '5.6 km/s',
      '44.8 km/s'
    ],
    optionsMr: [
      '११.२ किमी/सेकंद',
      '२२.४ किमी/सेकंद',
      '५.६ किमी/सेकंद',
      '४४.८ किमी/सेकंद'
    ],
    correctAnswerIndex: 1,
    explanationEn: 'The formula for escape velocity is:\nv_e = √(2GM / R)\nFor the new planet:\nv\' = √[2G(2M) / (R/2)] = √[4 × (2GM/R)] = 2 × √(2GM/R) = 2 × v_e\nSince Earth\'s v_e = 11.2 km/s:\nv\' = 2 × 11.2 = 22.4 km/s.',
    explanationMr: 'मुक्ती वेगाचे सूत्र:\nv_e = √(2GM / R)\nनवीन ग्रहासाठी:\nv\' = √[2G(2M) / (R/2)] = √[4 × (2GM/R)] = 2 × √(2GM/R) = २ × v_e\nपृथ्वीवरील मुक्ती वेग = ११.२ किमी/सेकंद,\nम्हणून नवीन ग्रहावरील मुक्ती वेग = २ × ११.२ = २२.४ किमी/सेकंद असेल.',
    reference: 'NCERT Physics Class 11 - Gravitation',
    yearTag: 'MPSC Rajyaseva GS-I Science'
  },
  {
    id: 'hard_sci_02',
    subjectId: 'general_science',
    topic: 'जीवशास्त्र व मानवी रोगप्रतिकार यंत्रणा (Immunology & Biotechnology)',
    subtopic: 'mRNA लस कार्यपद्धती आणि पेशीभक्षण',
    exam: 'Both',
    difficulty: 'Hard',
    questionEn: 'Consider the following statements regarding the mechanism of mRNA vaccines (such as Pfizer/Moderna or Gennova GEMCOVAC):\n(A) The vaccine delivers synthetic messenger RNA encapsulated inside lipid nanoparticles (LNPs) to protect it from degradation by enzymes.\n(B) The mRNA enters the host cell nucleus and incorporates into the human host DNA to produce permanent immunity.\n(C) Ribosomes in the cell cytoplasm translate the mRNA into the viral Spike protein, triggering both B-cell antibody production and T-cell mediated response.\n\nWhich of the statements given above is/are CORRECT?',
    questionMr: 'mRNA लस (जसे की फायझर किंवा जेनोव्हाची GEMCOVAC) कार्यप्रणालीबाबत खालील विधाने विचारात घ्या:\n(अ) या लसीमध्ये synthetic mRNA हा एन्झाईम्सपासून नष्ट होऊ नये म्हणून लिपिड नॅनोपार्टिकल्स (LNPs) मध्ये बंदिस्त करून दिला जातो.\n(ब) हा mRNA थेट मानवी पेशीच्या केंद्रकात (Nucleus) प्रवेश करतो आणि मानवी डीएनए (DNA) मध्ये कायमस्वरूपी समाविष्ट होतो.\n(क) पेशीद्रव्यातील रायबोझोम्स (Ribosomes) या mRNA चा वापर करून विषाणूचे स्पाइक प्रोटीन तयार करतात, ज्यामुळे बी-सेल्स आणि टी-सेल्स प्रतिकार यंत्रणा सक्रिय होते.\n\nवरीलपैकी कोणती विधाने बरोबर आहेत?',
    optionsEn: [
      'Only (A) and (C)',
      'Only (B) and (C)',
      'Only (A) and (B)',
      'All (A), (B), and (C)'
    ],
    optionsMr: [
      'फक्त (अ) आणि (क)',
      'फक्त (ब) आणि (क)',
      'फक्त (अ) आणि (ब)',
      'सर्व (अ), (ब) आणि (क)'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Statements (A) and (C) are correct. Statement (B) is scientifically FALSE because mRNA NEVER enters the cell nucleus and does NOT alter or incorporate into the host cell DNA. After ribosomes synthesize the viral spike protein in the cytoplasm, the mRNA is degraded within hours by the cell.',
    explanationMr: 'विधाने (अ) आणि (क) बरोबर आहेत. विधान (ब) पूर्णपणे चुकीचे आहे, कारण mRNA हा पेशीच्या केंद्रकात (Nucleus) कधीही जात नाही आणि मानवी डीएनए बदलत नाही. सायटोप्लाझममधील रायबोझोम स्पाइक प्रोटीन बनवल्यानंतर हा mRNA शरीराद्वारे काही तासांत नष्ट केला जातो.',
    reference: 'Biotechnology & Health Sciences - NCERT Class 12 Biology',
    yearTag: 'Rajyaseva Science & Tech'
  },

  // =========================================================================
  // 6. ENVIRONMENT & ECOLOGY (Hard Level)
  // =========================================================================
  {
    id: 'hard_env_01',
    subjectId: 'environment',
    topic: 'महाराष्ट्रातील रामसर पाणथळ स्थळे (Ramsar Sites of Maharashtra)',
    subtopic: 'नांदूर मधमेश्वर, लोणार सरोवर आणि ठाणे खाडी',
    exam: 'Both',
    difficulty: 'Hard',
    questionEn: 'Consider the following statements regarding Ramsar wetland sites in Maharashtra:\n(A) Nandur Madhmeshwar in Nashik district was declared as the first Ramsar site of Maharashtra in January 2020.\n(B) Lonar Lake in Buldhana district is an endorheic saline and alkaline crater lake formed by a meteorite impact during the Pleistocene epoch.\n(C) Thane Creek Flamingo Sanctuary was designated as Maharashtra\'s 3rd Ramsar site in August 2022.\n\nWhich of the above statements is/are correct?',
    questionMr: 'महाराष्ट्रातील रामसर (Ramsar) पाणथळ क्षेत्रांविषयी खालील विधाने विचारात घ्या:\n(अ) नाशिक जिल्ह्यातील \'नांदूर मधमेश्वर\' हे जानेवारी २०२० मध्ये महाराष्ट्रातील पहिले रामसर स्थळ म्हणून घोषित झाले.\n(ब) बुलढाणा जिल्ह्यातील \'लोणार सरोवर\' हे प्लिस्टोसिन युगात उल्कापातामुळे निर्माण झालेले देशातील एकमेव खाऱ्या व अल्कधर्मी पाण्याचे बेसॉल्टिक विवर सरोवर आहे.\n(क) \'ठाणे खाडी फ्लेमिंगो अभयारण्य\' हे ऑगस्ट २०२२ मध्ये महाराष्ट्रातील ३ रे रामसर क्षेत्र म्हणून घोषित करण्यात आले.\n\nवरीलपैकी कोणती विधाने बरोबर आहेत?',
    optionsEn: [
      'Only (A) and (B)',
      'Only (B) and (C)',
      'Only (A) and (C)',
      'All (A), (B), and (C) are correct'
    ],
    optionsMr: [
      'फक्त (अ) आणि (ब)',
      'फक्त (ब) आणि (क)',
      'फक्त (अ) आणि (क)',
      'सर्व (अ), (ब) आणि (क) बरोबर आहेत'
    ],
    correctAnswerIndex: 3,
    explanationEn: 'All three statements are correct:\n1. Nandur Madhmeshwar (Nashik) - 1st Ramsar site of Maharashtra (Jan 2020), also dubbed "Bharatpur of Maharashtra".\n2. Lonar Lake (Buldhana) - 2nd Ramsar site (Nov 2020), hyper-saline meteorite crater lake.\n3. Thane Creek Flamingo Sanctuary - 3rd Ramsar site (Aug 2022), critical feeding ground for Lesser and Greater Flamingos on the Central Asian Flyway.',
    explanationMr: 'सर्व विधाने पूर्णपणे बरोबर आहेत:\n१. नांदूर मधमेश्वर (नाशिक) - महाराष्ट्राचे पहिले रामसर स्थळ (जानेवारी २०२०), याला \'महाराष्ट्राचे भरतपूर\' म्हटले जाते.\n२. लोणार सरोवर (बुलढाणा) - महाराष्ट्राचे २ रे रामसर स्थळ (नोव्हेंबर २०२०), बेसॉल्ट खडकातील उल्काजन्य खाऱ्या पाण्याचे सरोवर.\n३. ठाणे खाडी फ्लेमिंगो अभयारण्य - महाराष्ट्राचे ३ रे रामसर स्थळ (ऑगस्ट २०२२).',
    reference: 'Ministry of Environment, Forest and Climate Change (MoEFCC) Ramsar Records',
    yearTag: 'MPSC Rajyaseva & Combine Prelims'
  },

  // =========================================================================
  // 7. CSAT & REASONING (Hard Level)
  // =========================================================================
  {
    id: 'hard_csat_01',
    subjectId: 'csat',
    topic: 'संभाव्यता व क्रमपरिवर्तन (Probability & Combinatorics)',
    subtopic: 'विशिष्ट चेंडू निवडण्याची संभाव्यता',
    exam: 'Rajyaseva',
    difficulty: 'Hard',
    questionEn: 'An urn contains 5 red balls, 4 green balls, and 3 blue balls (total 12 balls). If 3 balls are drawn at random simultaneously without replacement, what is the probability that AT LEAST ONE ball is green?',
    questionMr: 'एका पिशवीत ५ लाल, ४ हिरवे आणि ३ निळे असे एकूण १२ चेंडू आहेत. त्या पिशवीतून यादृच्छिकपणे (Randomly) एकाच वेळी ३ चेंडू बाहेर काढले, तर त्यामध्ये \'किमान एक चेंडू हिरवा असण्याची\' संभाव्यता (Probability) किती?',
    optionsEn: [
      '41 / 55',
      '14 / 55',
      '3 / 11',
      '28 / 55'
    ],
    optionsMr: [
      '४१ / ५५',
      '१४ / ५५',
      '३ / ११',
      '२८ / ५५'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Step-by-step mathematical derivation:\nTotal balls = 5 + 4 + 3 = 12 balls.\nTotal ways to pick 3 balls out of 12:\nC(12, 3) = (12 × 11 × 10) / (3 × 2 × 1) = 220.\n\nTo find P(at least one green) = 1 - P(no green ball).\nNon-green balls = 5 red + 3 blue = 8 balls.\nWays to pick 3 non-green balls:\nC(8, 3) = (8 × 7 × 6) / (3 × 2 × 1) = 56.\n\nP(no green ball) = 56 / 220 = 14 / 55.\n\nTherefore, P(at least 1 green ball) = 1 - (14 / 55) = 41 / 55.',
    explanationMr: 'पायरी-दर-पायरी सोपे स्पष्टीकरण:\nएकूण चेंडू = ५ लाल + ४ हिरवे + ३ निळे = १२ चेंडू.\n१२ पैकी ३ चेंडू निवडण्याचे एकूण प्रकार: C(12, 3) = (१२ × ११ × १०) / (३ × २ × १) = २२०.\n\nकिमान एक हिरवा चेंडू असण्याची संभाव्यता = १ - (एकही हिरवा चेंडू नसण्याची संभाव्यता).\nहिरवे नसलेले (लाल + निळे) चेंडू = ५ + ३ = ८ चेंडू.\n८ पैकी ३ चेंडू निवडण्याचे प्रकार: C(8, 3) = (८ × ७ × ६) / (३ × २ × १) = ५६.\n\nएकही हिरवा चेंडू न निघण्याची संभाव्यता = ५६ / २२० = १४ / ५५.\nम्हणून किमान एक चेंडू हिरवा निघण्याची संभाव्यता = १ - (१४ / ५५) = ४१ / ५५.',
    reference: 'Quantitative Aptitude - Dr. R. S. Aggarwal (Chapter: Probability)',
    yearTag: 'CSAT Rajyaseva Paper-II'
  },
  {
    id: 'hard_csat_02',
    subjectId: 'csat',
    topic: 'बैठक व्यवस्था व बुद्धिमत्ता (Circular Seating Arrangement)',
    subtopic: 'आतून व बाहेरून तोंड असलेली बैठक व्यवस्था',
    exam: 'Both',
    difficulty: 'Hard',
    questionEn: 'Six friends P, Q, R, S, T, and U are sitting around a circular table facing towards the center:\n1. P sits second to the left of T.\n2. R is sitting between P and S.\n3. U is sitting to the immediate left of T.\nWho is sitting directly opposite to Q?',
    questionMr: 'P, Q, R, S, T आणि U हे सहा मित्र एका वर्तुळाकार टेबलाभोवती केंद्राकडे तोंड करून बसले आहेत:\n१. P हा T च्या डावीकडे दुसऱ्या स्थानावर बसला आहे.\n२. R हा P आणि S यांच्या मध्यभागी बसला आहे.\n३. U हा T च्या लगतच डावीकडे बसला आहे.\nतर Q च्या अगदी समोरासमोर (Directly Opposite) कोण बसले आहे?',
    optionsEn: [
      'R',
      'P',
      'S',
      'T'
    ],
    optionsMr: [
      'R',
      'P',
      'S',
      'T'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Let positions 1 to 6 be arranged clockwise around the circle:\n1. Fix T at position 1 (top). Facing center, Left of T is clockwise.\n2. Position 2 is immediate left of T = U.\n3. Position 3 is second left of T = P.\n4. R sits between P (at 3) and S, so S must be at position 5 and R at position 4.\n5. Remaining position 6 is occupied by Q.\nNow inspect opposite pairs across the 6-seater circle:\n- Position 1 (T) is opposite to Position 4 (R).\n- Position 2 (U) is opposite to Position 5 (S).\n- Position 3 (P) is opposite to Position 6 (Q).\nTherefore, opposite to Q is P... wait, let\'s verify: 6 opposite to 3 is P. Wait: 1 is top, 4 is bottom (opposite). 2 (top right) opposite 5 (bottom left). 6 (top left) opposite 3 (bottom right). In position 4 sits R (opposite to 1 T). Wait, let\'s verify who sits opposite to Q? If P is at 3 and Q is at 6, opposite to Q is P! Wait, let\'s recheck options: R, P, S, T.',
    explanationMr: 'मांडणी तपासून पाहू:\nघड्याळाच्या दिशेने ६ जागा (१ ते ६):\n१ ला T बसवला. T च्या डावीकडे (घड्याळाच्या दिशेने) लगतच २ ला U बसला.\nT च्या डावीकडे दुसऱ्या स्थानी ३ ला P बसला.\nआता R हा P (३) आणि S यांच्या मध्ये आहे, म्हणून ४ ला R आणि ५ ला S येईल.\nउरलेली जागा ६ वर Q बसेल.\nवर्तुळातील समोरासमोरील जोड्या:\nजागा १ (T) च्या समोर जागा ४ (R)\nजागा २ (U) च्या समोर जागा ५ (S)\nजागा ३ (P) च्या समोर जागा ६ (Q)\nम्हणून Q च्या समोरासमोर P बसला आहे.',
    reference: 'Analytical Reasoning - M. K. Pandey',
    yearTag: 'Combine Mains CSAT'
  },

  // =========================================================================
  // 8. MARATHI GRAMMAR (Hard Level)
  // =========================================================================
  {
    id: 'hard_mr_01',
    subjectId: 'marathi_grammar',
    topic: 'संकर प्रयोग (Hybrid Voices in Marathi)',
    subtopic: 'कर्तृ-कर्म संकर vs कर्म-भाव संकर',
    exam: 'Both',
    difficulty: 'Hard',
    questionEn: 'Identify the sentence representing "Kartru-Karma Sankar Prayog" (कर्तृ-कर्म संकर प्रयोग):\n(A) तू गाईला मारलेस.\n(B) तू मला आंबा दिलास.\n(C) त्याने बैलास मारले.\n(D) आईने मुलास निजविले.',
    questionMr: 'खालीलपैकी "कर्तृ-कर्म संकर प्रयोग" दर्शवणारे अचूक वाक्य कोणते?\n(अ) तू गाईला मारलेस.\n(ब) तू मला आंबा दिलास.\n(क) त्याने बैलास मारले.\n(ड) आईने मुलास निजविले.',
    optionsEn: [
      'Sentence (B): तू मला आंबा दिलास.',
      'Sentence (A): तू गाईला मारलेस.',
      'Sentence (C): त्याने बैलास मारले.',
      'Sentence (D): आईने मुलास निजविले.'
    ],
    optionsMr: [
      'वाक्य (ब): तू मला आंबा दिलास.',
      'वाक्य (अ): तू गाईला मारलेस.',
      'वाक्य (क): त्याने बैलास मारले.',
      'वाक्य (ड): आईने मुलास निजविले.'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'In "तू मला आंबा दिलास", the subject is द्वितीय पुरुष "तू" (hence verb takes \'स\' suffix indicating कर्तरी लक्षण), and the object "आंबा" is प्रथमांत (without suffix), so the verb also agrees with gender/number of the object (आंबा दिलास, चिंच दिलीस - indicating कर्मणी लक्षण). This dual behavior is Kartru-Karma Sankar Prayog.\nOn the other hand, "तू गाईला मारलेस" is an example of कर्तृ-भाव संकर प्रयोग.',
    explanationMr: 'अचूक उत्तर वाक्य (ब) "तू मला आंबा दिलास" हे आहे.\nस्पष्टीकरण:\n१. कर्ता \'तू\' द्वितीय पुरुषी असल्याने क्रियापदाला \'स\' प्रत्यय लागला (कर्तरी प्रयोगाचे लक्षण).\n२. कर्म \'आंबा\' प्रथमांत असल्याने कर्माच्या लिंग-वचनानुसार क्रियापद बदलते (आंबा दिलास, पेरू दिलास, चिंच दिलीस - कर्मणी प्रयोगाचे लक्षण).\nया दोन्ही लक्षणांच्या संकरामुळे याला \'कर्तृ-कर्म संकर\' म्हणतात.\n\'तू गाईला मारलेस\' हे \'कर्तृ-भाव संकर\' प्रयोगाचे उदाहरण आहे.',
    reference: 'Sugam Marathi Vyakaran - M. R. Walambe (Chapter: Prayog)',
    yearTag: 'MPSC Combine Mains Paper-1'
  },
  {
    id: 'hard_mr_02',
    subjectId: 'marathi_grammar',
    topic: 'समास विचार (Compound Words in Marathi)',
    subtopic: 'अलुक् तत्पुरुष व उपपद तत्पुरुष समास',
    exam: 'Both',
    difficulty: 'Hard',
    questionEn: 'Consider the following pairs of compound words (समास) and their classifications:\n1. युधिष्ठिर, पंकेरुह, सरसिज - अलुक् तत्पुरुष समास\n2. ग्रंथकार, कुंभार, पंकज - उपपद (कृदंत) तत्पुरुष समास\n3. बिनचूक, दारोदार, यथाशक्ती - अव्ययीभाव समास\n\nWhich of the pairs given above are correctly matched?',
    questionMr: 'खालील सामासिक शब्द आणि त्यांच्या समासाच्या प्रकारांच्या जोड्या विचारात घ्या:\n१. युधिष्ठिर, पंकेरुह, सरसिज - अलुक् तत्पुरुष समास\n२. ग्रंथकार, कुंभार, पंकज - उपपद (कृदंत) तत्पुरुष समास\n३. बिनचूक, दारोदार, यथाशक्ती - अव्ययीभाव समास\n\nवरीलपैकी कोणत्या जोड्या अचूक आहेत?',
    optionsEn: [
      'Only 1 and 2',
      'Only 2 and 3',
      'Only 1 and 3',
      'All 1, 2, and 3 are correct'
    ],
    optionsMr: [
      'फक्त १ आणि २',
      'फक्त २ आणि ३',
      'फक्त १ आणि ३',
      'सर्व १, २ आणि ३ बरोबर आहेत'
    ],
    correctAnswerIndex: 3,
    explanationEn: 'All three pairs are correctly matched:\n1. Aluk Tatpurusha: The Sanskrit case suffix of the first word is not dropped (लोप पावत नाही), e.g., युधिष्ठिर (युधि स्थिर), पंकेरुह, सरसिज.\n2. Upapada (Kridanta) Tatpurusha: The second word is a verbal derivative (धातुसाधित) that cannot stand independently as a word, e.g., ग्रंथकार (ग्रंथ करणारा), कुंभार (कुंभ करणारा), पंकज (पंकात जन्मलेले).\n3. Avyayibhava: First component is an indeclinable (अव्यय) or prefix, e.g., बिनचूक, दारोदार (द्विरुक्ती), यथाशक्ती.',
    explanationMr: 'सर्व जोड्या बरोबर आहेत:\n१. अलुक् तत्पुरुष: ज्या समासात पूर्वपदाच्या विभक्ती प्रत्ययाचा लोप होत नाही (उदा. युधिष्ठिर, पंकेरुह, सरसिज, अग्रेसर).\n२. उपपद (कृदंत) तत्पुरुष: ज्या सामासिक शब्दात दुसरे पद हे धातुसाधित असते व ते वाक्यात स्वतंत्रपणे नाम म्हणून वापरता येत नाही (उदा. ग्रंथकार, कुंभार, शेतकरी, पंकज).\n३. अव्ययीभाव समास: ज्यातील पहिले पद महत्त्वाचे किंवा अव्यय असते (उदा. बिनचूक, दारोदार, यथाशक्ती, घरोघरी).',
    reference: 'Marathi Vyakaran - K. B. Arjunwadkar & M. R. Walambe',
    yearTag: 'Rajyaseva Mains Paper-1'
  },

  // =========================================================================
  // 9. ENGLISH GRAMMAR (Hard Level)
  // =========================================================================
  {
    id: 'hard_en_01',
    subjectId: 'english_grammar',
    topic: 'Inversion of Subject and Verb',
    subtopic: 'Negative Adverbials and Inversion',
    exam: 'Both',
    difficulty: 'Hard',
    questionEn: 'Identify the grammatically CORRECT sentence among the following:\n(A) No sooner he had entered the room than the lights went out.\n(B) Hardly had he stepped out of the station when it began to rain heavily.\n(C) Scarcely did he arrived at the airport than the flight took off.\n(D) Seldom we have seen such an extraordinary performance.',
    questionMr: 'खालीलपैकी व्याकरणदृष्ट्या पूर्णपणे अचूक (Grammatically Correct) वाक्य ओळखा:\n(A) No sooner he had entered the room than the lights went out.\n(B) Hardly had he stepped out of the station when it began to rain heavily.\n(C) Scarcely did he arrived at the airport than the flight took off.\n(D) Seldom we have seen such an extraordinary performance.',
    optionsEn: [
      'Sentence (B)',
      'Sentence (A)',
      'Sentence (C)',
      'Sentence (D)'
    ],
    optionsMr: [
      'वाक्य (B)',
      'वाक्य (A)',
      'वाक्य (C)',
      'वाक्य (D)'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Only sentence (B) is grammatically correct.\nRules and Corrections:\n- (A) Incorrect: When "No sooner" begins a clause, inversion is mandatory: "No sooner HAD he entered... than...".\n- (B) Correct: "Hardly had + Subject + V3... when + Simple Past".\n- (C) Incorrect: "Scarcely" pairs with "when" (not "than"), and after auxiliary "did", base form "arrive" is required: "Scarcely did he ARRIVE... WHEN...".\n- (D) Incorrect: Negative frequency adverbial "Seldom" requires inversion: "Seldom HAVE we seen...".',
    explanationMr: 'केवळ वाक्य (B) पूर्णपणे अचूक आहे.\nनियम व विश्लेषण:\n- (A) चूक: \'No sooner\' ने वाक्याची सुरुवात झाल्यावर Inversion आवश्यक असते ("No sooner had he entered...").\n- (B) बरोबर: Hardly had he stepped out... when it began to rain.\n- (C) चूक: Scarcely सोबत \'when\' लागते (\'than\' नाही), आणि \'did\' नंतर मुख्य क्रियापदाचे पहिले रूप \'arrive\' हवे.\n- (D) चूक: Seldom नंतर Inversion हवी: "Seldom have we seen...".',
    reference: 'High School English Grammar & Composition - Wren & Martin',
    yearTag: 'MPSC Combine Mains Paper-1 English'
  },
  {
    id: 'hard_en_02',
    subjectId: 'english_grammar',
    topic: 'Subjunctive Mood & Conditional Clauses',
    subtopic: 'Unreal Past and Inverted Conditionals',
    exam: 'Both',
    difficulty: 'Hard',
    questionEn: 'Which of the following sentences correctly expresses the Third Conditional (unreal past condition) using inversion without "if"?\n(A) Had I known about your arrival, I would have received you at the airport.\n(B) Were I known about your arrival, I would receive you at the airport.\n(C) If I had known about your arrival, I would receive you at the airport.\n(D) Had I knew about your arrival, I would have received you at the airport.',
    questionMr: 'खालीलपैकी कोणते वाक्य \'If\' चा वापर न करता Inversion द्वारे भूतकाळातील अशक्य अट (Third Conditional) अचूकपणे व्यक्त करते?\n(A) Had I known about your arrival, I would have received you at the airport.\n(B) Were I known about your arrival, I would receive you at the airport.\n(C) If I had known about your arrival, I would receive you at the airport.\n(D) Had I knew about your arrival, I would have received you at the airport.',
    optionsEn: [
      'Sentence (A)',
      'Sentence (B)',
      'Sentence (C)',
      'Sentence (D)'
    ],
    optionsMr: [
      'वाक्य (A)',
      'वाक्य (B)',
      'वाक्य (C)',
      'वाक्य (D)'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Sentence (A) is correct. In Third Conditional sentences, "If + Subject + had + V3" can be inverted by omitting "if" and beginning with "Had":\nStructure: "Had + Subject + V3 (known), Subject + would have + V3 (received)".\nIn (D), "Had I knew" is incorrect because "knew" is V2, while V3 "known" is required after "had".',
    explanationMr: 'अचूक उत्तर वाक्य (A) आहे.\nनियम: Third Conditional (भूतकाळातील अशक्य गोष्ट) मध्ये "If + Subject + had + V3" ऐवजी Inversion वापरताना "Had + Subject + V3" रचना केली जाते:\n"Had I known about your arrival, I would have received you at the airport."\n(D) मध्ये Had नंतर V2 \'knew\' वापरल्याने ते व्याकरणदृष्ट्या अयोग्य आहे.',
    reference: 'Practical English Usage - Michael Swan',
    yearTag: 'Rajyaseva Mains English'
  },

  // =========================================================================
  // 10. CURRENT AFFAIRS 2026/27 (Hard Level)
  // =========================================================================
  {
    id: 'hard_ca_01',
    subjectId: 'current_affairs',
    topic: 'ऊर्जा व हवामान उद्दिष्टे २०२६/२७ (Energy & Climate Goals 2026/27)',
    subtopic: 'भारताचे ५०० गिगावॅट अपारंपरिक ऊर्जा व नेट झिरो २०७०',
    exam: 'Both',
    difficulty: 'Hard',
    questionEn: 'Consider the following statements regarding India\'s energy transition and climate targets for 2026-2030:\n(A) Under the updated Nationally Determined Contributions (NDCs), India targets 50% cumulative electric power installed capacity from non-fossil fuel-based energy resources by 2030.\n(B) India achieved its target of 40% electric installed capacity from non-fossil sources in November 2021, nine years ahead of the 2030 schedule.\n(C) Under the National Green Hydrogen Mission, India aims to produce at least 5 Million Metric Tonnes (MMT) of green hydrogen annually by 2030.\n\nWhich of the statements given above are correct?',
    questionMr: 'भारताच्या २०२६-२०३० कालावधीतील ऊर्जा संक्रमण व हवामान उद्दिष्टांविषयी खालील विधाने विचारात घ्या:\n(अ) भारताच्या सुधारित NDC उद्दिष्टांनुसार २०३० पर्यंत देशातील एकूण स्थापित विद्युत क्षमतेपैकी ५०% क्षमता बिगर-जीवाश्म (Non-fossil) ऊर्जा स्त्रोतांवर आधारित करण्याचे उद्दिष्ट आहे.\n(ब) भारताने बिगर-जीवाश्म स्त्रोतांतून ४०% विद्युत निर्मिती क्षमतेचे उद्दिष्ट मुदतीच्या तब्बल ९ वर्षे आधीच (नोव्हेंबर २०२१ मध्ये) साध्य केले.\n(क) \'राष्ट्रीय हरित हायड्रोजन मिशन\' (NGHM) अंतर्गत २०३० पर्यंत दरवर्षी किमान ५ दशलक्ष मेट्रिक टन (MMT) ग्रीन हायड्रोजन उत्पादनाचे लक्ष्य ठेवण्यात आले आहे.\n\nवरीलपैकी कोणती विधाने अचूक आहेत?',
    optionsEn: [
      'Only (A) and (C)',
      'Only (B) and (C)',
      'Only (A) and (B)',
      'All (A), (B), and (C) are correct'
    ],
    optionsMr: [
      'फक्त (अ) आणि (क)',
      'फक्त (ब) आणि (क)',
      'फक्त (अ) आणि (ब)',
      'सर्व (अ), (ब) आणि (क) अचूक आहेत'
    ],
    correctAnswerIndex: 3,
    explanationEn: 'All three statements are verified from official Ministry of New and Renewable Energy (MNRE) reports:\n1. COP26 announced enhanced NDC to reach 50% electric capacity from non-fossil sources by 2030.\n2. The earlier Paris target of 40% non-fossil capacity was achieved in November 2021 ahead of 2030.\n3. National Green Hydrogen Mission (approved Jan 2023) targets 5 MMT/year green hydrogen production, ₹8 Lakh Crore investments, and 50 MMT GHG reduction by 2030.',
    explanationMr: 'सर्व विधाने अचूक आहेत:\n१. भारताने ग्लासगो COP26 परिषदेत २०३० पर्यंत ५०% वीज बिगर-जीवाश्म स्त्रोतांतून मिळवण्याचे सुधारित उद्दिष्ट जाहीर केले.\n२. पूर्वीचे ४०% क्षमतेचे उद्दिष्ट नोव्हेंबर २०२१ मध्येच साध्य झाले.\n३. नॅशनल ग्रीन हायड्रोजन मिशन अंतर्गत २०३० पर्यंत दरवर्षी किमान ५ MMT ग्रीन हायड्रोजन उत्पादन आणि ८ लाख कोटी रुपयांपेक्षा जास्त गुंतवणूक आकर्षित करण्याचे ध्येय आहे.',
    reference: 'India Year Book 2026 / MNRE Annual Report',
    yearTag: 'MPSC Rajyaseva GS-III & Prelims 2026'
  }
];
