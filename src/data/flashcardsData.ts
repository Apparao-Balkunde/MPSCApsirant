export type FlashcardCategory = 
  | 'social_reformers' 
  | 'constitution' 
  | 'geography_rivers' 
  | 'current_affairs_2026_27';

export interface FlashcardItem {
  id: string;
  category: FlashcardCategory;
  categoryLabelMr: string;
  categoryLabelEn: string;
  frontTitleMr: string;
  frontTitleEn: string;
  frontSubtitleMr?: string;
  frontSubtitleEn?: string;
  frontClueMr: string;
  frontClueEn: string;
  backTitleMr: string;
  backTitleEn: string;
  backKeyFactsMr: string[];
  backKeyFactsEn: string[];
  pyqReferenceMr?: string;
  pyqReferenceEn?: string;
  highYieldTagMr: string;
  highYieldTagEn: string;
  importance: 'critical' | 'high' | 'medium';
}

export const FLASHCARD_CATEGORIES_CONFIG: {
  id: FlashcardCategory;
  nameMr: string;
  nameEn: string;
  iconName: string;
  badgeColor: string;
  descriptionMr: string;
  descriptionEn: string;
}[] = [
  {
    id: 'social_reformers',
    nameMr: '🏛️ समाजसुधारक व वृत्तपत्रे/संस्था',
    nameEn: '🏛️ Social Reformers & Organizations',
    iconName: 'Users',
    badgeColor: 'amber',
    descriptionMr: 'फुले, आंबेडकर, शाहू, आगरकर, टिळक, जांभेकर, कर्वे व त्यांची वृत्तपत्रे, ग्रंथ व संस्था',
    descriptionEn: 'Phule, Ambedkar, Shahu, Agarkar, Tilak, Jambhekar, Karve newspapers and institutions'
  },
  {
    id: 'constitution',
    nameMr: '📜 राज्यघटना कलमे व घटनादुरुस्त्या',
    nameEn: '📜 Vital Articles & Amendments',
    iconName: 'Scale',
    badgeColor: 'blue',
    descriptionMr: 'मूलभूत हक्क, DPSP, राष्ट्रपती, न्यायव्यवस्था, कलम ३२, ३६८ व ४२वी, ४४वी, १०३वी, १०६वी दुरुस्ती',
    descriptionEn: 'Fundamental Rights, DPSP, President, Judiciary, Art 32, 368 and 42nd, 44th, 103rd, 106th Amendments'
  },
  {
    id: 'geography_rivers',
    nameMr: '🏞️ नद्या, धरणे व जलविद्युत प्रकल्प',
    nameEn: '🏞️ Rivers, Dams & Hydro Power',
    iconName: 'Mountain',
    badgeColor: 'emerald',
    descriptionMr: 'गोदावरी, भीमा, कृष्णा, तापी व कोकण नद्या, जायकवाडी, कोयना, उजनी व उपसा जलसिंचन',
    descriptionEn: 'Godavari, Bhima, Krishna, Tapi, Konkan rivers, Koyna, Jayakwadi, Ujani & Lift irrigation'
  },
  {
    id: 'current_affairs_2026_27',
    nameMr: '🏆 चालू घडामोडी २०२६-२७ पुरस्कार व पदे',
    nameEn: '🏆 Current Affairs 2026-27 Awards & Posts',
    iconName: 'Award',
    badgeColor: 'rose',
    descriptionMr: 'भारतरत्न, ज्ञानपीठ, पद्म पुरस्कार, महाराष्ट्र भूषण, सरन्यायाधीश, CEC, MPSC व १६ वा वित्त आयोग',
    descriptionEn: 'Bharat Ratna, Jnanpith, Padma, Maharashtra Bhushan, CJI, CEC, MPSC & 16th Finance Commission'
  }
];

export const HIGH_YIELD_FLASHCARDS: FlashcardItem[] = [
  // ==========================================
  // TOPIC 1: महाराष्ट्रातील समाजसुधारक व वृत्तपत्रे/संस्था
  // ==========================================
  {
    id: 'fc_sr_01',
    category: 'social_reformers',
    categoryLabelMr: 'समाजसुधारक व संस्था',
    categoryLabelEn: 'Social Reformers & Institutions',
    frontTitleMr: 'महात्मा जोतीराव फुले',
    frontTitleEn: 'Mahatma Jyotirao Phule',
    frontSubtitleMr: 'सत्यशोधक समाज व स्त्री शिक्षण',
    frontSubtitleEn: 'Satyashodhak Samaj & Women Education',
    frontClueMr: 'संस्था, वृत्तपत्र व प्रमुख साहित्य सांगा?',
    frontClueEn: 'Key institutions, newspaper, and literary works?',
    backTitleMr: 'सत्यशोधक समाज (२४ सप्टेंबर १८७३, पुणे)',
    backTitleEn: 'Satyashodhak Samaj (24 Sept 1873, Pune)',
    backKeyFactsMr: [
      'वृत्तपत्र: "दीनबंधू" (कृष्णराव भालेकर यांनी १८७७ मध्ये सुरू केले - सत्यशोधक समाजाचे मुखपत्र).',
      'शाळा: भारतातील पहिली मुलींची शाळा १ जानेवारी १८४८ रोजी पुण्यातील भिडे वाड्यात सुरू केली.',
      'ग्रंथ: तृतीय रत्न (१८५५), ब्राह्मणांचे कसब (१८६९), गुलामगिरी (१८७३), शेतकऱ्यांचा आसूड (१८८३), सार्वजनिक सत्यधर्म (१८९१ मरणोत्तर).',
      'विशेष: १८६३ मध्ये "बालहत्या प्रतिबंधक गृह" सुरू केले. १८८८ मध्ये मुंबईतील मांडवी कोळीवाडा सभेत "महात्मा" पदवी बहाल.'
    ],
    backKeyFactsEn: [
      'Newspaper: "Deenbandhu" (Started by Krishnarao Bhalekar in 1877 as mouth-piece).',
      'First Girls School: 1 Jan 1848 at Bhide Wada, Pune.',
      'Major Books: Gulamgiri (1873), Shetkaryancha Asud (1883), Sarvajanik Satyadharma (1891).',
      'Infanticide Prevention Home founded in 1863; conferred "Mahatma" title in 1888.'
    ],
    pyqReferenceMr: 'MPSC संयुक्त पूर्व २०१८, २०२०, २०२३ वारंवार विचारलेले',
    pyqReferenceEn: 'MPSC Combined Prelims 2018, 2020, 2023 frequent PYQ',
    highYieldTagMr: 'वारंवार येणारा प्रश्न (५+ वेळा)',
    highYieldTagEn: 'Repeated PYQ (5+ Times)',
    importance: 'critical'
  },
  {
    id: 'fc_sr_02',
    category: 'social_reformers',
    categoryLabelMr: 'समाजसुधारक व संस्था',
    categoryLabelEn: 'Social Reformers & Institutions',
    frontTitleMr: 'डॉ. बाबासाहेब आंबेडकर',
    frontTitleEn: 'Dr. B.R. Ambedkar',
    frontSubtitleMr: 'बहिष्कृत हितकारिणी सभा व वृत्तपत्रे',
    frontSubtitleEn: 'Bahishkrit Hitakarini Sabha & Press',
    frontClueMr: 'स्थापलेल्या ४ वृत्तपत्रांची नावे व कालानुक्रम?',
    frontClueEn: 'Chronology of 4 newspapers & organizations?',
    backTitleMr: '५ वृत्तपत्रे व बहिष्कृत हितकारिणी सभा (२० जुलै १९२४)',
    backTitleEn: '5 Newspapers & Bahishkrit Hitakarini Sabha (1924)',
    backKeyFactsMr: [
      'वृत्तपत्र कालानुक्रम: १. मूकनायक (३१ जाने १९२० - छत्रपती शाहू महाराजांचे अर्थसहाय्य), २. बहिष्कृत भारत (३ एप्रिल १९२७), ३. समता (१९२८), ४. जनता (१९३०), ५. प्रबुद्ध भारत (४ फेब्रु १९५६).',
      'संस्था: बहिष्कृत हितकारिणी सभा (१९२४, ब्रीदवाक्य: "शिका, संघटित व्हा, संघर्ष करा"), समता सैनिक दल (१९२७).',
      'राजकीय पक्ष: स्वतंत्र मजूर पक्ष (Independent Labour Party - १९३६), शेड्युल्ड कास्ट्स फेडरेशन (१९४२).',
      'ऐतिहासिक सत्याग्रह: महाड चवदार तळे सत्याग्रह (२० मार्च १९२७ - सामाजिक अधिकार दिन), मनुस्मृती दहन (२५ डिसेंबर १९२७).'
    ],
    backKeyFactsEn: [
      'Press Chronology: Mooknayak (1920), Bahishkrit Bharat (1927), Samata (1928), Janata (1930), Prabuddha Bharat (1956).',
      'Organizations: Bahishkrit Hitakarini Sabha (1924), Samata Sainik Dal (1927).',
      'Political Parties: Independent Labour Party (1936), Scheduled Castes Federation (1942).',
      'Mahad Satyagraha (20 March 1927), Manusmriti Dahan (25 Dec 1927).'
    ],
    pyqReferenceMr: 'राज्यसेवा पूर्व व गट-ब मध्ये दरवर्षी प्रश्न',
    pyqReferenceEn: 'Annual recurring theme in Rajyaseva & Group B',
    highYieldTagMr: 'अति-महत्त्वाचा गाभा (Core Target)',
    highYieldTagEn: 'Core Exam Target',
    importance: 'critical'
  },
  {
    id: 'fc_sr_03',
    category: 'social_reformers',
    categoryLabelMr: 'समाजसुधारक व संस्था',
    categoryLabelEn: 'Social Reformers & Institutions',
    frontTitleMr: 'गोपाळ गणेश आगरकर',
    frontTitleEn: 'Gopal Ganesh Agarkar',
    frontSubtitleMr: 'बुद्धिप्रामाण्यवाद व "सुधारक"',
    frontSubtitleEn: 'Rationalism & "Sudharak"',
    frontClueMr: '"सुधारक" कधी सुरू झाले? टिळकांशी मतभेद काय?',
    frontClueEn: 'When was "Sudharak" launched? Rift with Tilak?',
    backTitleMr: '"सुधारक" वृत्तपत्र (ऑक्टोबर १८८८) व फर्ग्युसन प्राचार्य',
    backTitleEn: '"Sudharak" Newspaper (Oct 1888) & Rationalism',
    backKeyFactsMr: [
      'वृत्तपत्र: १८८१ मध्ये सुरू झालेल्या "केसरी"चे पहिले संपादक आगरकर होते. सामाजिक सुधारणा आधी की राजकीय यावरून १८८७ मध्ये केसरीचा राजीनामा दिला व ऑक्टोबर १८८८ मध्ये "सुधारक" सुरू केले.',
      'भाषा: सुधारकचे मराठी भाग आगरकर तर इंग्रजी भाग नामदार गोपाळ कृष्ण गोखले लिहायचे.',
      'विचारसरणी: "इष्ट असेल ते बोलणार आणि साध्य असेल ते करणार" हे सुधारकचे ब्रीदवाक्य. बुद्धिप्रामाण्यवाद व व्यक्तिस्वातंत्र्याचे पुरस्कर्ते.',
      'ग्रंथ: "डोंगरीच्या तुरुंगातील १०१ दिवस" (१८८२), "गुलामगिरीचे शस्त्र", "वाक्यमीमांसा व वाक्यांचे पृथक्करण".',
      'संस्था: डेक्कन एज्युकेशन सोसायटीचे संस्थापक (१८८४) व १८९२ मध्ये फर्ग्युसन कॉलेजचे प्राचार्य.'
    ],
    backKeyFactsEn: [
      'First Editor of "Kesari" (1881). Resigned in 1887 over social vs political reforms priority; launched "Sudharak" in Oct 1888.',
      'G.K. Gokhale handled English section of Sudharak while Agarkar wrote Marathi.',
      'Motto: "Will speak what is right and do what is possible".',
      'Authored: "101 Days in Dongri Jail", "Vakya Mimansa". Ferguson College Principal (1892).'
    ],
    pyqReferenceMr: 'गट-क पूर्व २०२१, गट-ब पूर्व २०२२, २०२४',
    pyqReferenceEn: 'Group C Prelims 2021, Group B Prelims 2022, 2024',
    highYieldTagMr: '१००% गुण मिळवून देणारा घटक',
    highYieldTagEn: 'High Scoring Topic',
    importance: 'critical'
  },
  {
    id: 'fc_sr_04',
    category: 'social_reformers',
    categoryLabelMr: 'समाजसुधारक व संस्था',
    categoryLabelEn: 'Social Reformers & Institutions',
    frontTitleMr: 'बाळशास्त्री जांभेकर',
    frontTitleEn: 'Balshastri Jambhekar',
    frontSubtitleMr: 'मराठी वृत्तपत्रसृष्टीचे जनक',
    frontSubtitleEn: 'Father of Marathi Journalism',
    frontClueMr: '"दर्पण" व "दिग्दर्शन" कधी सुरू झाले?',
    frontClueEn: 'When were "Darpan" and "Digdarshan" founded?',
    backTitleMr: '"दर्पण" (६ जानेवारी १८३२) व "दिग्दर्शन" (१८४०)',
    backTitleEn: '"Darpan" (6 Jan 1832) & "Digdarshan" (1840)',
    backKeyFactsMr: [
      'दर्पण: ६ जानेवारी १८३२ रोजी मुंबईत सुरू झालेले मराठीतील पहिले वृत्तपत्र (द्विभाषिक: एका स्तंभात मराठी, दुसऱ्यात इंग्रजी; इंग्रजी भाग भाऊ महाजन लिहीत). ६ जानेवारी हा महाराष्ट्रात "पत्रकार दिन" म्हणून साजरा होतो.',
      'दिग्दर्शन: मे १८४० मध्ये सुरू केलेले मराठीतील पहिले मासिक.',
      'उपाधी: "आद्य इतिहास संशोधक", "महाराष्ट्रातील आद्य प्रबोधनकार", "न्यायमूर्ती पदवी मिळवणारे पहिले महाराष्ट्रीय (J.P.)".',
      'ग्रंथ: शून्यलब्धी (१८३१), सारसंग्रह, नीतिकथा, बालव्याकरण, हिंदुस्तानचा इतिहास.'
    ],
    backKeyFactsEn: [
      'Darpan launched 6 Jan 1832 in Mumbai. Celebrated as "Patrakar Din" (Journalists Day) in Maharashtra.',
      'Digdarshan launched May 1840 as first Marathi monthly magazine.',
      'Honored as Justice of Peace (JP). Authored Shunya Labdhi (1831), Balvyakarana.'
    ],
    pyqReferenceMr: 'तलाठी भरती २०२३, MPSC गट-क २०२२',
    pyqReferenceEn: 'Talathi 2023, MPSC Group C 2022',
    highYieldTagMr: 'अति-महत्त्वाचा प्रश्न',
    highYieldTagEn: 'High-Yield PYQ',
    importance: 'high'
  },
  {
    id: 'fc_sr_05',
    category: 'social_reformers',
    categoryLabelMr: 'समाजसुधारक व संस्था',
    categoryLabelEn: 'Social Reformers & Institutions',
    frontTitleMr: 'छत्रपती राजर्षी शाहू महाराज',
    frontTitleEn: 'Chhatrapati Rajarshi Shahu Maharaj',
    frontSubtitleMr: 'आरक्षणाचे जनक व कोल्हापूर संस्थानाधिपती',
    frontSubtitleEn: 'Pioneer of Reservation & Kolhapur Reforms',
    frontClueMr: 'ऐतिहासिक ५०% आरक्षणाची तारीख व सक्तीचे शिक्षण?',
    frontClueEn: 'Date of 50% reservation & Free Primary Education?',
    backTitleMr: '२६ जुलै १९०२: ५०% आरक्षण हुकूम',
    backTitleEn: '26 July 1902: Historic 50% Reservation Order',
    backKeyFactsMr: [
      '५०% आरक्षण: २६ जुलै १९०२ रोजी कोल्हापूर संस्थानात बहुजन समाजासाठी ५०% आरक्षणाचा अधिकृत जाहीरनामा काढला (२६ जुलै = "सामाजिक न्याय दिन").',
      'सक्तीचे मोफत शिक्षण: २५ जुलै १९१७ रोजी संस्थानात प्राथमिक शिक्षण सक्तीचे व मोफत केले.',
      'वस्तीगृहे: मराठा, जैन, मुस्लिम, व्हिक्टोरिया (महार-चांभार) अशी सर्व जातींची स्वतंत्र वसतिगृहे स्थापन केली.',
      'आंतरजातीय विवाह कायदा: १२ जुलै १९१९ रोजी संस्थानात आंतरजातीय व आंतरधर्मीय विवाहाला कायदेशीर मान्यता देणारा कायदा केला.',
      'देवदासी व जोगती प्रथा बंदी कायदा आणि पुनर्विवाह कायदा (१९१७) लागू केला.'
    ],
    backKeyFactsEn: [
      '50% Reservation decree issued 26 July 1902 (Celebrated as Social Justice Day).',
      'Free & compulsory primary education introduced on 25 July 1917.',
      'Pioneered hostels for all communities; passed Inter-caste Marriage Act in 1919.'
    ],
    pyqReferenceMr: 'MPSC संयुक्त २०२३ व राज्यसेवा वारंवार',
    pyqReferenceEn: 'MPSC Combined 2023 & Rajyaseva',
    highYieldTagMr: 'वारंवार येणारा प्रश्न',
    highYieldTagEn: 'Frequent PYQ',
    importance: 'critical'
  },
  {
    id: 'fc_sr_06',
    category: 'social_reformers',
    categoryLabelMr: 'समाजसुधारक व संस्था',
    categoryLabelEn: 'Social Reformers & Institutions',
    frontTitleMr: 'महर्षी धोंडो केशव कर्वे',
    frontTitleEn: 'Maharshi Dhondo Keshav Karve',
    frontSubtitleMr: 'स्त्री शिक्षण व महिला विद्यापीठ',
    frontSubtitleEn: 'Women Education & SNDT University',
    frontClueMr: 'अनाथ बालिकाश्रम व SNDT महिला विद्यापीठ स्थापना?',
    frontClueEn: 'Anath Balikashram & SNDT University founding?',
    backTitleMr: 'हिंगणे अनाथ बालिकाश्रम (१८९६) व SNDT (१९१६)',
    backTitleEn: 'Anath Balikashram (1896) & SNDT (1916)',
    backKeyFactsMr: [
      'विधवा पुनर्विवाह: १८९३ मध्ये स्वतः गोदुबाई (आनंदीबाई) या विधवेशी विवाह केला. विधवा विवाह प्रतिबंध निवारक मंडळ (१८९३) स्थापले.',
      'अनाथ बालिकाश्रम: १८९६ मध्ये पुण्यातील हिंगणे येथे स्थापन केले.',
      'महिला विद्यालय: १९०७ मध्ये सुरू केले. १९१० मध्ये "निष्काम कर्ममठ" स्थापन केला.',
      'SNDT महिला विद्यापीठ: जपानच्या महिला विद्यापीठाच्या धर्तीवर ३ जून १९१६ रोजी पुण्यामध्ये भारतातील पहिल्या महिला विद्यापीठाची स्थापना केली (सर विठ्ठलदास ठाकरसी यांच्या १५ लाख देणगीमुळे SNDT नाव पडले).',
      'सन्मान: १९५८ मध्ये वयाच्या १०० व्या वर्षी "भारतरत्न" पुरस्कार प्राप्त (भारतरत्न मिळवणारे पहिले महाराष्ट्रीय).'
    ],
    backKeyFactsEn: [
      'Married widow Godubai in 1893. Founded Anath Balikashram at Hingane in 1896.',
      'Founded Nishkam Karma Math (1910).',
      'Established India\'s first Women\'s University (SNDT) on 3 June 1916.',
      'Awarded Bharat Ratna in 1958 at age 100.'
    ],
    pyqReferenceMr: 'MPSC गट-ब व गट-क २०१९, २०२२',
    pyqReferenceEn: 'MPSC Group B & C 2019, 2022',
    highYieldTagMr: 'अति-महत्त्वाचा प्रश्न',
    highYieldTagEn: 'High-Yield PYQ',
    importance: 'high'
  },

  // ==========================================
  // TOPIC 2: राज्यघटनेतील महत्त्वाची कलमे व घटनादुरुस्त्या
  // ==========================================
  {
    id: 'fc_pol_01',
    category: 'constitution',
    categoryLabelMr: 'राज्यघटना कलमे व दुरुस्त्या',
    categoryLabelEn: 'Vital Articles & Amendments',
    frontTitleMr: 'कलम ३२ : घटनात्मक उपाययोजनांचा हक्क',
    frontTitleEn: 'Article 32: Constitutional Remedies',
    frontSubtitleMr: 'सर्वोच्च न्यायालयाचे रिट (प्राधिकर) अधिकार',
    frontSubtitleEn: 'Supreme Court Writ Jurisdiction',
    frontClueMr: 'डॉ. आंबेडकरांनी याला काय म्हटले? ५ रिट कोणती?',
    frontClueEn: 'What did Ambedkar call it? What are the 5 writs?',
    backTitleMr: 'घटनेचा आत्मा व हृदय (Heart & Soul of Constitution)',
    backTitleEn: 'Heart & Soul of the Indian Constitution',
    backKeyFactsMr: [
      'डॉ. बाबासाहेब आंबेडकरांचे विधान: "कलम ३२ शिवाय संविधान निष्प्रभ आहे, हे कलम म्हणजे घटनेचा आत्मा आणि हृदय आहे."',
      '५ प्राधिकार (Writs): १. बंदी प्रत्यक्षीकरण (Habeas Corpus - बेकायदेशीर अटकेविरुद्ध), २. परमादेश (Mandamus - कर्तव्य पालनाचा हुकूम), ३. प्रतिषेध (Prohibition - कनिष्ठ न्यायालयाला अधिकार कक्षेबाहेर काम करण्यास बंदी), ४. उत्प्रेषण (Certiorari - खटला स्वतःकडे मागवणे), ५. अधिकार पृच्छा (Quo-Warranto - कोणत्या अधिकाराने पद भूषविले).',
      'तुलना: सर्वोच्च न्यायालय कलम ३२ नुसार तर उच्च न्यायालय कलम २२६ नुसार रिट काढू शकते (कलम २२६ चा विस्तार कलम ३२ पेक्षा व्यापक आहे).'
    ],
    backKeyFactsEn: [
      'Ambedkar quoted: "An Article without which Constitution is nullity; it is very soul of Constitution and very heart of it."',
      '5 Writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto.',
      'Supreme Court issues writs under Art 32 (only for fundamental rights), High Court under Art 226 (FR + legal rights).'
    ],
    pyqReferenceMr: 'दरवर्षी संयुक्त व राज्यसेवा पूर्व परीक्षेत हमखास प्रश्न',
    pyqReferenceEn: 'Guaranteed question every year in MPSC exams',
    highYieldTagMr: 'सुवर्ण गुण देणारा घटक (Golden Topic)',
    highYieldTagEn: 'Golden Topic',
    importance: 'critical'
  },
  {
    id: 'fc_pol_02',
    category: 'constitution',
    categoryLabelMr: 'राज्यघटना कलमे व दुरुस्त्या',
    categoryLabelEn: 'Vital Articles & Amendments',
    frontTitleMr: 'मार्गदर्शक तत्त्वे (DPSP - भाग IV)',
    frontTitleEn: 'Directive Principles (Part IV: Art 36-51)',
    frontSubtitleMr: 'वारंवार येणारी महत्त्वाची कलमे',
    frontSubtitleEn: 'Most Repeated DPSP Articles',
    frontClueMr: 'कलम ४०, ४४, ४८A आणि ५० कशाशी संबंधित आहेत?',
    frontClueEn: 'What are Articles 40, 44, 48A and 50?',
    backTitleMr: 'कलम ४०, ४४, ४८A, ५० व ५१',
    backTitleEn: 'Core DPSPs: Art 40, 44, 48A, 50, 51',
    backKeyFactsMr: [
      'कलम ३९A: सर्वांना समान न्याय व मोफत कायदेशीर साहाय्य (४२ वी घटनादुरुस्ती १९७६).',
      'कलम ४०: ग्रामपंचायतींचे संघटन (गांधीवादी तत्त्व).',
      'कलम ४४: समान नागरी कायदा (Uniform Civil Code - UCC).',
      'कलम ४५: ६ वर्षांखालील बालकांचे संगोपन व शिक्षण.',
      'कलम ४८A: पर्यावरण संरक्षण व संवर्धन आणि वने व वन्यजीवांचे रक्षण (४२ वी दुरुस्ती १९७६).',
      'कलम ५०: न्यायव्यवस्था कार्यकारी व्यवस्थेपासून वेगळी ठेवणे (Separation of Powers).',
      'कलम ५१: आंतरराष्ट्रीय शांतता व सुरक्षिततेची अभिवृद्धी (भारताचे परराष्ट्र धोरण).'
    ],
    backKeyFactsEn: [
      'Art 39A: Equal justice and free legal aid.',
      'Art 40: Organization of Village Panchayats.',
      'Art 44: Uniform Civil Code (UCC).',
      'Art 48A: Protection and improvement of environment and wildlife.',
      'Art 50: Separation of Judiciary from Executive.',
      'Art 51: Promotion of International Peace and Security.'
    ],
    pyqReferenceMr: 'MPSC Combine Pre 2020, 2022, 2023, 2024',
    pyqReferenceEn: 'MPSC Combine Pre 2020, 2022, 2023, 2024',
    highYieldTagMr: '१००% कन्फर्म प्रश्न',
    highYieldTagEn: '100% Guaranteed Concept',
    importance: 'critical'
  },
  {
    id: 'fc_pol_03',
    category: 'constitution',
    categoryLabelMr: 'राज्यघटना कलमे व दुरुस्त्या',
    categoryLabelEn: 'Vital Articles & Amendments',
    frontTitleMr: '४२ वी व ४४ वी घटनादुरुस्ती (१९७६ आणि १९७८)',
    frontTitleEn: '42nd & 44th Constitutional Amendments',
    frontSubtitleMr: 'मिनी संविधान व त्याचे दुरुस्तीकरण',
    frontSubtitleEn: 'Mini Constitution & Rights Restoration',
    frontClueMr: 'प्रस्ताविकेत कोणते ३ शब्द जोडले? संपत्तीचा हक्क कुठे गेला?',
    frontClueEn: 'Which 3 words added to Preamble? Where did Property right go?',
    backTitleMr: '४२ वी (१९७६) व ४४ वी दुरुस्ती (१९७८)',
    backTitleEn: '42nd (1976) vs 44th (1978) Key Distinctions',
    backKeyFactsMr: [
      '४२ वी घटनादुरुस्ती (१९७६ - "मिनी संविधान"): १. प्रस्ताविकेत "समाजवादी, धर्मनिरपेक्ष व एकात्मता" (Socialist, Secular, Integrity) हे ३ शब्द जोडले, २. भाग IV-A व कलम ५१A जोडून १० मूलभूत कर्तव्ये समाविष्ट केली (स्वर्णसिंग समिती), ३. राष्ट्रपतींना मंत्रिमंडळाचा सल्ला बंधनकारक केला.',
      '४४ वी घटनादुरुस्ती (१९७८ - मोरारजी देसाई सरकार): १. कलम ३१ मधील "संपत्तीचा मूलभूत हक्क" वगळला आणि तो कलम ३००A अन्वये केवळ "कायदेशीर हक्क" बनवला, २. कलम ३५२ मधील "अंतर्गत अशांतता" ऐवजी "सशस्त्र बंड" (Armed Rebellion) शब्द टाकला, ३. आणीबाणीत कलम २० व २१ कोणत्याही परिस्थितीत निलंबित करता येणार नाहीत अशी तरतूद केली.'
    ],
    backKeyFactsEn: [
      '42nd Amendment (1976): Added Socialist, Secular, Integrity to Preamble. Added Fundamental Duties (Art 51A).',
      '44th Amendment (1978): Removed Right to Property from Fundamental Rights (moved to Art 300A as legal right). Substituted "Armed Rebellion" for "Internal Disturbance". Protected Art 20 & 21 during Emergency.'
    ],
    pyqReferenceMr: 'MPSC सर्व परीक्षांमध्ये सतत येणारा प्रश्न',
    pyqReferenceEn: 'Evergreen MPSC Polity PYQ topic',
    highYieldTagMr: 'अति-महत्त्वाचा चार्ट',
    highYieldTagEn: 'Critical Revision Chart',
    importance: 'critical'
  },
  {
    id: 'fc_pol_04',
    category: 'constitution',
    categoryLabelMr: 'राज्यघटना कलमे व दुरुस्त्या',
    categoryLabelEn: 'Vital Articles & Amendments',
    frontTitleMr: '१०१ वी ते १०६ वी नवीनतम घटनादुरुस्त्या',
    frontTitleEn: '101st to 106th Recent Amendments',
    frontSubtitleMr: 'GST ते महिला ३३% आरक्षण कायदा',
    frontSubtitleEn: 'GST to Women Reservation Act 2023',
    frontClueMr: '१०३ वी, १०४ वी व १०६ वी दुरुस्ती कशासाठी?',
    frontClueEn: 'Purpose of 103rd, 104th & 106th Amendments?',
    backTitleMr: '१०१ वी ते १०६ वी घटनादुरुस्ती सारांश',
    backTitleEn: 'Summary of 101st to 106th Amendments',
    backKeyFactsMr: [
      '१०१ वी दुरुस्ती (२०१६): वस्तू व सेवा कर (GST) लागू केला (१ जुलै २०१७).',
      '१०२ वी दुरुस्ती (२०१८): राष्ट्रीय मागासवर्ग आयोगाला (NCBC) कलम ३३८B द्वारे घटनात्मक दर्जा दिला.',
      '१०३ वी दुरुस्ती (२०१९): आर्थिक दुर्बल घटकांसाठी (EWS) १०% आरक्षण (कलम १५(६) व १६(६) जोडले).',
      '१०४ वी दुरुस्ती (२०२०): लोकसभा व विधानसभेत SC/ST आरक्षण १० वर्षांनी वाढवले (२०३० पर्यंत) आणि अँग्लो-इंडियन नामनिर्देशन रद्द केले.',
      '१०५ वी दुरुस्ती (२०२१): SEBC यादी तयार करण्याचे अधिकार राज्यांना परत दिले.',
      '१०६ वी दुरुस्ती (२०२३ - नारी शक्ती वंदन अधिनियम): लोकसभा, राज्य विधानसभा व दिल्ली विधानसभेत महिलांसाठी ३३% जागा राखीव ठेवण्याची तरतूद (कलम ३३०A, ३३२A, ३३४A).'
    ],
    backKeyFactsEn: [
      '101st (2016): Goods & Services Tax (GST).',
      '102nd (2018): Constitutional status to NCBC (Art 338B).',
      '103rd (2019): 10% EWS reservation (Art 15(6) & 16(6)).',
      '104th (2020): Extended SC/ST quota by 10 yrs; abolished Anglo-Indian quota.',
      '105th (2021): Restored states\' power to identify SEBCs.',
      '106th (2023): Nari Shakti Vandan Adhiniyam (33% women quota in Lok Sabha & Assemblies).'
    ],
    pyqReferenceMr: '२०२४, २०२५ संयुक्त पूर्व व २०२६ साठी हॉट टॉपिक',
    pyqReferenceEn: 'Hot topic for 2024-2026 examination cycle',
    highYieldTagMr: 'चालू घडामोडी + राज्यघटना कॉम्बो',
    highYieldTagEn: 'Polity + Current Affairs Combo',
    importance: 'critical'
  },

  // ==========================================
  // TOPIC 3: महाराष्ट्रातील नद्या, धरणे व जलविद्युत प्रकल्प
  // ==========================================
  {
    id: 'fc_geo_01',
    category: 'geography_rivers',
    categoryLabelMr: 'भूगोल: नद्या व धरणे',
    categoryLabelEn: 'Geography: Rivers & Dams',
    frontTitleMr: 'गोदावरी नदी व तिची धरणे',
    frontTitleEn: 'Godavari River System & Dams',
    frontSubtitleMr: 'महाराष्ट्रातील सर्वात मोठे खोरे (४९%)',
    frontSubtitleEn: 'Largest Basin in Maharashtra (49%)',
    frontClueMr: 'उगम, महाराष्ट्रातील लांबी, उपनद्या व प्रमुख धरणे?',
    frontClueEn: 'Origin, length in MH, tributaries & dams?',
    backTitleMr: 'गोदावरी (लांबी ६६८ किमी) व जायकवाडी धरण',
    backTitleEn: 'Godavari (668 km in MH) & Jayakwadi Dam',
    backKeyFactsMr: [
      'उगम: त्र्यंबकेश्वर, ब्रह्मगिरी पर्वत (नाशिक जिल्हा).',
      'महाराष्ट्रातील लांबी: ६६८ किमी (भारतातील एकूण लांबी: १,४६५ किमी - दक्षिण गंगा).',
      'प्रमुख धरणे: १. गंगापूर धरण (नाशिक - भारतातील पहिले मातीचे धरण), २. जायकवाडी धरण (पैठण, छत्रपती संभाजीनगर - जलाशयाचे नाव: नाथसागर), ३. बाभळी बंधारा (नांदेड).',
      'उपनद्या: उजव्या बाजूने: दारणा, प्रवरा, सिंधफणा, मांजरा (उगम: पाटोदा बीड). डाव्या बाजूने: कादवा, शिवना, दुधना, दक्षिण पूर्णा, पैनगंगा, वर्धा, वैनगंगा, प्राणहिता आणि इंद्रावती.'
    ],
    backKeyFactsEn: [
      'Origin: Trimbakeshwar, Brahmagiri Hills (Nashik).',
      'Length in MH: 668 km (Total in India: 1,465 km).',
      'Dams: Gangapur Dam (India\'s first earthen dam), Jayakwadi Dam (Paithan - Nath Sagar reservoir), Babhali barrage.',
      'Tributaries: Pravara, Sindphana, Manjara (right bank); Darna, Kadva, Wardha, Wainganga, Pranhita (left bank).'
    ],
    pyqReferenceMr: 'MPSC Combine Pre 2021, 2022, 2023',
    pyqReferenceEn: 'MPSC Combine Pre 2021, 2022, 2023',
    highYieldTagMr: 'भूगोल हमखास २ गुण',
    highYieldTagEn: 'Guaranteed 2 Marks',
    importance: 'critical'
  },
  {
    id: 'fc_geo_02',
    category: 'geography_rivers',
    categoryLabelMr: 'भूगोल: नद्या व धरणे',
    categoryLabelEn: 'Geography: Rivers & Dams',
    frontTitleMr: 'कोयना धरण व जलविद्युत प्रकल्प',
    frontTitleEn: 'Koyna Dam & Hydroelectric Project',
    frontSubtitleMr: 'महाराष्ट्राची भाग्यरेषा (Lifeline of Maharashtra)',
    frontSubtitleEn: 'Lifeline of Maharashtra',
    frontClueMr: 'जलाशयाचे नाव काय? क्षमता व लेक टॅपिंग तंत्रज्ञान?',
    frontClueEn: 'Reservoir name, capacity & Lake Tapping technique?',
    backTitleMr: 'शिवसागर जलाशय (पाटण, सातारा) व १९६० MW क्षमता',
    backTitleEn: 'Shivasagar Reservoir (Satara) & 1960 MW Capacity',
    backKeyFactsMr: [
      'स्थान: हेळवाक / पोफळीजवळ, पाटण तालुका, सातारा जिल्हा (कृष्णा नदीची उपनदी कोयना).',
      'जलाशयाचे नाव: "शिवसागर" (पाणी साठवण क्षमता: १०५ TMC).',
      'जलविद्युत क्षमता: १,९६० मेगावॅट (महाराष्ट्रातील सर्वात मोठा जलविद्युत प्रकल्प).',
      'विशेष तंत्रज्ञान: आशियातील पहिले "लेक टॅपिंग" (Lake Tapping) १३ मार्च १९९९ रोजी कोयना प्रकल्पात यशस्वीपणे राबवले गेले (दुसरे लेक टॅपिंग २०१२ मध्ये).',
      'ऐतिहासिक भूकंप: ११ डिसेंबर १९६७ रोजी कोयना भागात ६.५ रिश्टर स्केलचा भूकंप झाला होता.'
    ],
    backKeyFactsEn: [
      'Location: Koyna River (tributary of Krishna), Patan, Satara district.',
      'Reservoir: "Shivasagar" (105 TMC capacity).',
      'Total Generation Capacity: 1,960 MW (Largest in Maharashtra).',
      'Asia\'s first "Lake Tapping" executed here on 13 March 1999.',
      'Historic 6.5 Richter earthquake occurred on 11 Dec 1967.'
    ],
    pyqReferenceMr: 'गट-क २०२३, गट-ब २०२२ व तलाठी भरती',
    pyqReferenceEn: 'Group C 2023, Group B 2022 & Talathi',
    highYieldTagMr: 'सुपर-इम्पॉर्टंट',
    highYieldTagEn: 'Super-Important',
    importance: 'critical'
  },
  {
    id: 'fc_geo_03',
    category: 'geography_rivers',
    categoryLabelMr: 'भूगोल: नद्या व धरणे',
    categoryLabelEn: 'Geography: Rivers & Dams',
    frontTitleMr: 'भीमा व कृष्णा नदी प्रणाली',
    frontTitleEn: 'Bhima & Krishna River System',
    frontSubtitleMr: 'उजनी, धोम व भाटघर धरणे',
    frontSubtitleEn: 'Ujani, Dhom & Bhatghar Dams',
    frontClueMr: 'भीमा उगम कुठे? उजनीच्या जलाशयाचे नाव काय?',
    frontClueEn: 'Bhima origin & Ujani reservoir name?',
    backTitleMr: 'यशवंतसागर जलाशय (उजनी धरण, सोलापूर)',
    backTitleEn: 'Yashwantsagar Reservoir (Ujani Dam, Solapur)',
    backKeyFactsMr: [
      'भीमा उगम: भीमाशंकर (पुणे जिल्हा, सह्याद्री पर्वत). महाराष्ट्रातील लांबी: ४५१ किमी (पुढे कर्नाटकात कुडुरी येथे कृष्णा नदीस मिळते).',
      'उजनी धरण: माढा तालुका, सोलापूर जिल्हा (जलाशयाचे नाव: "यशवंतसागर" - ११८ TMC क्षमता, पक्षी अभयारण्य फ्लेमिंगो).',
      'पुणे जिल्ह्यातील इतर धरणे: भाटघर (येळवंडी नदी - लॉईड डॅम), वीर धरण (नीरा नदी), खडकवासला (मुठा नदी), पानशेत (आंबी नदी), वरसगाव (मोसे नदी), डिंभे (घोड नदी).',
      'कृष्णा नदी: उगम महाबळेश्वर (सातारा), लांबी २८२ किमी (महाराष्ट्रात). धरणे: धोम (वाई), कण्हेर (वेण्णा), कोयना.'
    ],
    backKeyFactsEn: [
      'Bhima Origin: Bhimashankar (Pune). Length in MH: 451 km. Meets Krishna at Raichur border.',
      'Ujani Dam: Solapur district (Reservoir: "Yashwantsagar", 118 TMC).',
      'Pune dams: Bhatghar (Lloyd Dam), Veer (Nira), Khadakwasla (Mutha), Panshet, Varasgaon.',
      'Krishna Origin: Mahabaleshwar (Satara). Length in MH: 282 km.'
    ],
    pyqReferenceMr: 'MPSC गट-ब पूर्व २०२१, २०२३, तलाठी पुणे',
    pyqReferenceEn: 'MPSC Group B 2021, 2023, Talathi Pune',
    highYieldTagMr: 'पुणे व पश्चिम महाराष्ट्र आवडता प्रश्न',
    highYieldTagEn: 'Western MH Favorite Topic',
    importance: 'high'
  },
  {
    id: 'fc_geo_04',
    category: 'geography_rivers',
    categoryLabelMr: 'भूगोल: नद्या व धरणे',
    categoryLabelEn: 'Geography: Rivers & Dams',
    frontTitleMr: 'महाराष्ट्रातील प्रमुख उपसा जलसिंचन व जलविद्युत प्रकल्प',
    frontTitleEn: 'Major Lift Irrigation & Hydro Projects',
    frontSubtitleMr: 'टेंभू, ताकारी व घटघर पम्प स्टोरेज',
    frontSubtitleEn: 'Tembhu, Takari & Ghatghar Pumped Storage',
    frontClueMr: 'आशियातील सर्वात मोठा उपसा जलसिंचन प्रकल्प कोणता?',
    frontClueEn: 'Asia\'s largest Lift Irrigation Project?',
    backTitleMr: 'टेंभू उपसा जलसिंचन प्रकल्प (सातारा/सांगली/सोलापूर)',
    backTitleEn: 'Tembhu Lift Irrigation (Asia\'s Largest)',
    backKeyFactsMr: [
      'टेंभू प्रकल्प: आशिया खंडातील सर्वात मोठा उपसा जलसिंचन प्रकल्प मानला जातो (कृष्णा नदीवर कराडजवळ पाणी उपसून दुष्काळी सांगली व सोलापूर जिल्ह्याला पुरवले जाते).',
      'इतर प्रमुख उपसा योजना: ताकारी व म्हैसाळ उपसा सिंचन योजना (सांगली जिल्हा).',
      'घटघर जलविद्युत प्रकल्प: महाराष्ट्रातील पहिला पम्प स्टोरेज (Pumped Storage) जलविद्युत प्रकल्प (प्रवरा नदी खोरे, अहमदनगर/ठाणे सीमा - २५० MW).',
      'खोपोली जलविद्युत: भारतातील पहिला व्यावसायिक जलविद्युत प्रकल्प (टाटा पॉवर - १९१५, रायगड जिल्हा).'
    ],
    backKeyFactsEn: [
      'Tembhu Project: Asia\'s largest lift irrigation scheme, lifting Krishna river water to drought areas of Sangli and Solapur.',
      'Takari & Mhaisal lift schemes (Sangli).',
      'Ghatghar Project: First pumped-storage hydro plant in Maharashtra (250 MW).',
      'Khopoli Hydro: India\'s first commercial hydro plant by Tata in 1915.'
    ],
    pyqReferenceMr: 'MPSC राज्यसेवा पूर्व व मुख्य परीक्षा',
    pyqReferenceEn: 'MPSC Rajyaseva Prelims & Mains',
    highYieldTagMr: 'तांत्रिक व महत्त्वाचा डेटा',
    highYieldTagEn: 'Technical High-Yield Data',
    importance: 'high'
  },

  // ==========================================
  // TOPIC 4: चालू घडामोडी २०२६-२७ महत्त्वाचे पुरस्कार व नियुक्त्या
  // ==========================================
  {
    id: 'fc_ca_01',
    category: 'current_affairs_2026_27',
    categoryLabelMr: 'चालू घडामोडी: पुरस्कार व पदे',
    categoryLabelEn: 'Current Affairs: Awards & Posts',
    frontTitleMr: 'भारतरत्न व महाराष्ट्र भूषण पुरस्कार',
    frontTitleEn: 'Bharat Ratna & Maharashtra Bhushan',
    frontSubtitleMr: 'देशाचा व राज्याचा सर्वोच्च नागरी सन्मान',
    frontSubtitleEn: 'Highest National & State Honors',
    frontClueMr: 'नुकतेच भारतरत्न कोणास जाहीर? महाराष्ट्र भूषण नियम?',
    frontClueEn: 'Recent Bharat Ratna recipients & MH Bhushan details?',
    backTitleMr: 'भारतरत्न (५ मान्यवर) व महाराष्ट्र भूषण (२५ लाख रुपये)',
    backTitleEn: 'Bharat Ratna (5 Dignitaries) & MH Bhushan (25 Lakhs)',
    backKeyFactsMr: [
      'भारतरत्न नवीनतम सन्मान: १. कर्पूरी ठाकूर (बिहारचे माजी मुख्यमंत्री, जननायक - मरणोत्तर), २. लालकृष्ण अडवाणी (माजी उपपंतप्रधान), ३. पी. व्ही. नरसिंह राव (माजी पंतप्रधान - मरणोत्तर), ४. चौधरी चरण सिंग (माजी पंतप्रधान, शेतकरी नेते - मरणोत्तर), ५. डॉ. एम. एस. स्वामीनाथन (भारतीय हरितक्रांतीचे जनक - मरणोत्तर).',
      'महाराष्ट्र भूषण पुरस्कार: महाराष्ट्र शासनाचा सर्वोच्च नागरी पुरस्कार. स्वरूप: २५ लाख रुपये रोख, सन्मानचिन्ह व मानपत्र (सुरुवात १९९६ - पहिले विजेते पु. ल. देशपांडे).',
      'आगामी परीक्षेसाठी महत्त्वाचे: अशोक सराफ (कला क्षेत्र), आप्पासाहेब धर्माधिकारी (समाजसेवा), आशा भोसले, बाबासाहेब पुरंदरे.'
    ],
    backKeyFactsEn: [
      'Bharat Ratna: Karpoori Thakur, L.K. Advani, P.V. Narasimha Rao, Chaudhary Charan Singh, Dr. M.S. Swaminathan.',
      'Maharashtra Bhushan: Highest state honor, Rs 25 Lakh cash prize (Started in 1996; first winner P.L. Deshpande).',
      'Recent winners: Ashok Saraf, Appasaheb Dharmadhikari.'
    ],
    pyqReferenceMr: '३ जानेवारी २०२७ परीक्षेसाठी सर्वाधिक संभाव्य',
    pyqReferenceEn: 'Highly probable for 3 Jan 2027 Prelims',
    highYieldTagMr: 'अति-संभाव्य प्रश्न (Most Expected)',
    highYieldTagEn: 'Most Expected Question',
    importance: 'critical'
  },
  {
    id: 'fc_ca_02',
    category: 'current_affairs_2026_27',
    categoryLabelMr: 'चालू घडामोडी: पुरस्कार व पदे',
    categoryLabelEn: 'Current Affairs: Awards & Posts',
    frontTitleMr: 'ज्ञानपीठ व साहित्य अकादमी पुरस्कार',
    frontTitleEn: 'Jnanpith & Sahitya Akademi Awards',
    frontSubtitleMr: 'भारतीय साहित्यातील सर्वोच्च सन्मान',
    frontSubtitleEn: 'Supreme Indian Literary Honors',
    frontClueMr: '५८ वा ज्ञानपीठ पुरस्कार कोणाला? मराठीतील ४ ज्ञानपीठ विजेते कोण?',
    frontClueEn: '58th Jnanpith winners? 4 Marathi recipients?',
    backTitleMr: '५८ वा ज्ञानपीठ (गुलजार व रामभद्राचार्य) व मराठी ४ विजेते',
    backTitleEn: '58th Jnanpith (Gulzar & Rambhadracharya) & Marathi Lore',
    backKeyFactsMr: [
      '५८ वा ज्ञानपीठ पुरस्कार: १. गुलजार (प्रसिद्ध उर्दू गीतकार व कवी), २. जगद्गुरू रामभद्राचार्य (प्रख्यात संस्कृत विद्वान व तुलसीपीठाचे प्रमुख).',
      'मराठीतील ४ ज्ञानपीठ विजेते (परीक्षेचा हमखास प्रश्न): १. वि. स. खांडेकर (१९७४ - "ययाती"), २. वि. वा. शिरवाडकर "कुसुमाग्रज" (१९८७ - "नटसम्राट"), ३. विंदा करंदीकर (२००३ - "अष्टदर्शने"), ४. भालचंद्र नेमाडे (२०१४ - "हिंदू: जगण्याची समृद्ध अडगळ").',
      'साहित्य अकादमी पुरस्कार: २४ भाषांमध्ये दिला जातो (घटनेच्या ८ व्या अनुसूचीतील २२ भाषा + इंग्रजी व राजस्थानी).'
    ],
    backKeyFactsEn: [
      '58th Jnanpith Award: Gulzar (Urdu) and Jagadguru Rambhadracharya (Sanskrit).',
      '4 Marathi Jnanpith Laureates: V.S. Khandekar (1974 - Yayati), Kusumagraj (1987), Vinda Karandikar (2003), Bhalchandra Nemade (2014 - Hindu).',
      'Sahitya Akademi conferred in 24 languages (22 Scheduled + English + Rajasthani).'
    ],
    pyqReferenceMr: 'MPSC पूर्व व मुख्य दोन्हीकडे सातत्याने विचारलेले',
    pyqReferenceEn: 'Asked repeatedly in both Pre & Mains',
    highYieldTagMr: '१००% पाठ असावे असा घटक',
    highYieldTagEn: 'Must-Memorize Topic',
    importance: 'critical'
  },
  {
    id: 'fc_ca_03',
    category: 'current_affairs_2026_27',
    categoryLabelMr: 'चालू घडामोडी: पुरस्कार व पदे',
    categoryLabelEn: 'Current Affairs: Awards & Posts',
    frontTitleMr: 'घटनात्मक व राष्ट्रीय प्रमुख पदे (२०२६-२७)',
    frontTitleEn: 'Vital Constitutional & National Posts',
    frontSubtitleMr: '१६ वा वित्त आयोग, CJI, CEC व MPSC',
    frontSubtitleEn: '16th Finance Commission, CJI, CEC & MPSC',
    frontClueMr: '१६ व्या वित्त आयोगाचे अध्यक्ष कोण? MPSC आयोग तरतूद?',
    frontClueEn: '16th Finance Commission Head? Constitutional articles?',
    backTitleMr: '१६ वा वित्त आयोग: डॉ. अरविंद पनगढिया (कलम २८०)',
    backTitleEn: '16th Finance Commission: Dr. Arvind Panagariya',
    backKeyFactsMr: [
      '१६ वा वित्त आयोग (Finance Commission): अध्यक्ष - डॉ. अरविंद पनगढिया (नीती आयोगाचे माजी उपाध्यक्ष). कार्यकाल: १ एप्रिल २०२६ पासूनच्या ५ वर्षांसाठी शिफारशी लागू होतील. सचिव - ऋत्विक रंजनम पांडे.',
      'केंद्रीय निवडणूक आयोग (कलम ३२४): मुख्य निवडणूक आयुक्त (CEC) व इतर दोन निवडणूक आयुक्त.',
      'भारताचे नियंत्रक व महालेखापरीक्षक (CAG - कलम १४८): देशाचे सर्वोच्च लेखापरीक्षक.',
      'MPSC व लोकसेवा आयोग (कलम ३१५ ते ३२३): राज्य लोकसेवा आयोगाचे अध्यक्ष व सदस्यांची नियुक्ती राज्यपाल करतात, परंतु त्यांना पदावरून दूर करण्याचे अधिकार केवळ भारताच्या राष्ट्रपतींना आहेत (कलम ३१७).'
    ],
    backKeyFactsEn: [
      '16th Finance Commission Chairman: Dr. Arvind Panagariya (Recommendations effective from 1 April 2026 for 5 years).',
      'Election Commission of India (Art 324): CEC and ECs.',
      'Comptroller & Auditor General of India (CAG - Art 148).',
      'MPSC (Art 315-323): Appointed by Governor, but removable ONLY by the President of India (Art 317).'
    ],
    pyqReferenceMr: 'MPSC चालू घडामोडी व राज्यव्यवस्था हक्काचे गुण',
    pyqReferenceEn: 'Surefire marks in Current Affairs & Polity',
    highYieldTagMr: 'चालू घडामोडी + आयोग कलम',
    highYieldTagEn: 'Current Affairs + Constitutional Core',
    importance: 'critical'
  },
  {
    id: 'fc_ca_04',
    category: 'current_affairs_2026_27',
    categoryLabelMr: 'चालू घडामोडी: पुरस्कार व पदे',
    categoryLabelEn: 'Current Affairs: Awards & Posts',
    frontTitleMr: 'पद्म पुरस्कार व खेलरत्न पुरस्कार २०२६/२०२५',
    frontTitleEn: 'Padma Awards & Khel Ratna 2025/2026',
    frontSubtitleMr: 'महाराष्ट्रातील सन्मानित व्यक्ती व क्रीडा',
    frontSubtitleEn: 'Maharashtra Honorees & Sports Honors',
    frontClueMr: 'पद्म पुरस्कारांची श्रेणी व महाराष्ट्रातील प्रमुख मानकरी?',
    frontClueEn: 'Padma award hierarchy & key Maharashtra achievers?',
    backTitleMr: 'पद्मविभूषण, पद्मभूषण, पद्मश्री व मेजर ध्यानचंद खेलरत्न',
    backTitleEn: 'Padma Honors & Major Dhyan Chand Khel Ratna',
    backKeyFactsMr: [
      'पद्म पुरस्कार श्रेणी: १. पद्मविभूषण (असाधारण व विशिष्ट सेवा), २. पद्मभूषण (उच्च दर्जाची विशिष्ट सेवा), ३. पद्मश्री (विशिष्ट सेवा). घोषणा: दरवर्षी प्रजासत्ताक दिनाच्या पूर्वसंध्येला (२५ जानेवारी) होते.',
      'महाराष्ट्रातील क्रीडा व सामाजिक मानकरी: रोहन बोपण्णा (टेनिस), उदय देशपांडे (मलखांब), अंकिता रैना, विविध लोककलाकार व संशोधक.',
      'मेजर ध्यानचंद खेलरत्न पुरस्कार: देशातील सर्वोच्च क्रीडा पुरस्कार (स्वरूप: २५ लाख रुपये रोख, पदक).',
      'अर्जुन पुरस्कार: १५ लाख रुपये रोख, कास्य मूर्ती (महाराष्ट्रातील खेळाडूंची कामगिरी नेहमी विचारली जाते).'
    ],
    backKeyFactsEn: [
      'Hierarchy: Padma Vibhushan > Padma Bhushan > Padma Shri (Announced on Republic Day eve).',
      'Sports & Social icons from MH frequently honored in sports and culture.',
      'Major Dhyan Chand Khel Ratna: India\'s highest sports award (Rs 25 Lakh prize money).',
      'Arjuna Award: Rs 15 Lakh prize money.'
    ],
    pyqReferenceMr: 'MPSC संयुक्त पूर्व २०२३, २०२४ व तलाठी',
    pyqReferenceEn: 'MPSC Combined Prelims 2023, 2024 & Talathi',
    highYieldTagMr: 'क्रीडा व पुरस्कार विशेष',
    highYieldTagEn: 'Sports & Awards Special',
    importance: 'high'
  }
];
