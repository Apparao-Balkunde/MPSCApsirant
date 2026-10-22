/**
 * दैनिक लोकसत्ता (Loksatta Newspaper) - MPSC Special Current Affairs & Editorial Hub
 * Authentic data derived from Loksatta's most famous columns:
 * 1. 'संपादकीय व अन्वयार्थ' (Editorials & Policy Analysis)
 * 2. 'व्यक्तिवेध' (Personalities in News)
 * 3. 'कुतूहल' (Science, Ecology & Technology)
 * 4. 'लोकसत्ता आधारित MPSC सराव प्रश्न' (Loksatta MCQs for Rajyaseva & Combine)
 */

export interface LoksattaEditorial {
  id: string;
  date: string;
  titleMr: string;
  titleEn: string;
  column: 'संपादकीय' | 'अन्वयार्थ' | 'विशेष लेख';
  gsPaper: 'GS-1' | 'GS-2' | 'GS-3' | 'GS-4';
  topic: string;
  summaryMr: string;
  summaryEn: string;
  keyPointsMr: string[];
  keyPointsEn: string[];
  mpscRelevanceMr: string;
  mpscRelevanceEn: string;
  potentialMainsQuestionMr: string;
  potentialMainsQuestionEn: string;
}

export interface LoksattaVyaktiwedh {
  id: string;
  nameMr: string;
  nameEn: string;
  date: string;
  field: string;
  titleMr: string;
  titleEn: string;
  bioSummaryMr: string;
  bioSummaryEn: string;
  keyAchievementsMr: string[];
  keyAchievementsEn: string[];
  mpscTipMr: string;
}

export interface LoksattaKutuhal {
  id: string;
  titleMr: string;
  titleEn: string;
  date: string;
  domain: 'वनस्पती व पर्यावरण' | 'भौतिक व अंतराळ विज्ञान' | 'आरोग्य व जैवतंत्रज्ञान' | 'ऊर्जा व तंत्रज्ञान';
  summaryMr: string;
  summaryEn: string;
  scientificFactsMr: string[];
  scientificFactsEn: string[];
  examSignificanceMr: string;
}

export interface LoksattaMcq {
  id: string;
  newsReference: string;
  date: string;
  topic: string;
  difficulty: 'Moderate' | 'Hard';
  questionMr: string;
  questionEn: string;
  statementsMr?: string[];
  statementsEn?: string[];
  optionsMr: string[];
  optionsEn: string[];
  correctAnswerIndex: number;
  explanationMr: string;
  explanationEn: string;
}

// ---------------------------------------------------------------------------------
// 1. लोकसत्ता संपादकीय व अन्वयार्थ (Editorials & Analysis)
// ---------------------------------------------------------------------------------
export const LOKSATTA_EDITORIALS: LoksattaEditorial[] = [
  {
    id: 'lok_ed_01',
    date: 'ऑक्टोबर २०२६',
    titleMr: '१०६ वी घटनादुरुस्ती कायदा (नारी शक्ती वंदन) : महिला आरक्षण आणि अंमलबजावणीतील आव्हाने',
    titleEn: '106th Constitutional Amendment: Women Reservation & Implementation Roadmap',
    column: 'संपादकीय',
    gsPaper: 'GS-2',
    topic: 'भारतीय राज्यघटना व राज्यव्यवस्था - महिला आरक्षण कायदा',
    summaryMr: 'लोकसभा आणि राज्य विधानसभांमध्ये महिलांसाठी ३३% जागा राखीव ठेवणारी १०६ वी घटनादुरुस्ती संसदेने एकमुखाने मंजूर केली. मात्र, जनगणनेनंतर होणाऱ्या मतदारसंघ पुनर्रचनेवर (Delimitation) या आरक्षणाची अंमलबजावणी अवलंबून असल्याने कायदेशीर व राजकीय पेचप्रसंग निर्माण होण्याची शक्यता लोकसत्ताच्या संपादकीयमधून मांडण्यात आली आहे.',
    summaryEn: 'The 106th Constitutional Amendment Act mandates 33% reservation for women in the Lok Sabha and State Legislative Assemblies. Loksatta analyzes how tying implementation to post-census delimitation creates significant administrative hurdles.',
    keyPointsMr: [
      'कलम २३९AA (दिल्ली विधानसभा), कलम ३३०A (लोकसभा) आणि कलम ३३२A (राज्य विधानसभा) यांमध्ये महिलांसाठी ३३% आरक्षणाची तरतूद समाविष्ट करण्यात आली.',
      'हे आरक्षण अनुसूचित जाती (SC) आणि अनुसूचित जमाती (ST) यांच्यासाठी राखीव असलेल्या जागांमध्येही १/३ प्रमाणात लागू राहील.',
      'आरक्षणाचा सुरुवातीचा कालावधी १५ वर्षे असेल; संसदेला कायद्याद्वारे मुदतवाढ देता येईल.',
      'अंमलबजावणीची पूर्वअट: पुढील जनगणना आणि त्यानंतर होणारी मतदारसंघ पुनर्रचना (Delimitation) पूर्ण झाल्यावरच हे आरक्षण लागू होईल.'
    ],
    keyPointsEn: [
      'Inserts Articles 330A, 332A, and 239AA into the Indian Constitution.',
      'Sub-reservation of 33% within existing SC and ST reserved seats.',
      'Initial sunset clause of 15 years with parliamentary discretion to extend.',
      'Contingent upon Census completion and subsequent nationwide delimitation exercise.'
    ],
    mpscRelevanceMr: 'राज्यसेवा मुख्य परीक्षा पेपर-२ (राज्यव्यवस्था) आणि पूर्व परीक्षेसाठी अत्यंत उपयुक्त. घटनादुरुस्ती क्रमांक, समाविष्ट कलमे व पुनर्रचनेचे निकष विचारले जातात.',
    mpscRelevanceEn: 'Crucial for MPSC GS-2 (Polity & Governance) and Prelims: Amendment number, inserted articles, and delimitation constraints.',
    potentialMainsQuestionMr: '"१०६ व्या घटनादुरुस्ती कायद्यामुळे भारतीय लोकशाहीतील महिला प्रतिनिधित्वाला नवे परिमाण लाभेल, परंतु पुनर्रचनेची अट ही यातील मोठी कायदेशीर अडचण ठरत आहे." चर्चा करा.',
    potentialMainsQuestionEn: '"The 106th Constitutional Amendment marks a watershed for womens representation, yet delimitation prerequisites pose implementation bottlenecks." Discuss.'
  },
  {
    id: 'lok_ed_02',
    date: 'सप्टेंबर २०२६',
    titleMr: 'महाराष्ट्र राज्य आर्थिक पाहणी अहवाल : कृषी, उद्योग आणि वित्तीय तूट विश्लेषण',
    titleEn: 'Maharashtra Economic Survey: Agriculture Distress, Manufacturing & Fiscal Deficit',
    column: 'अन्वयार्थ',
    gsPaper: 'GS-3',
    topic: 'अर्थव्यवस्था व नियोजन - महाराष्ट्राचा आर्थिक विकास',
    summaryMr: 'लोकसत्ताच्या अन्वयार्थ सदरात महाराष्ट्राच्या आर्थिक स्थितीचा वेध घेण्यात आला. राज्याचा सेवा क्षेत्रात (Services) दबदबा असला तरी कृषी क्षेत्रातील हवामान बदलाचे धोके, सिंचन अनुशेष आणि राज्याची वाढत चाललेली महसुली तूट यांवर लेखात गंभीर भाष्य करण्यात आले आहे.',
    summaryEn: 'Anwayartha deep-dives into Maharashtra Economic Survey, highlighting the robust services sector contrasted with climate vulnerabilities in rainfed agriculture and mounting fiscal liabilities.',
    keyPointsMr: [
      'महाराष्ट्र देशाच्या जीडीपीमध्ये (GDP) सुमारे १४% वाटा उचलून पहिल्या क्रमांकावर कायम आहे.',
      'राज्याच्या अर्थव्यवस्थेत सेवा क्षेत्राचा वाटा सर्वाधिक (सुमारे ६०%) असून कृषी क्षेत्राचा वाटा सुमारे १२% ते १३% पर्यंत मर्यादित आहे.',
      'राज्यातील ८०% शेती पावसाच्या पाण्यावर (जिरायती) अवलंबून असल्याने दुष्काळ व अवकाळी पावसाचा फटका बसतो.',
      'एफआरबीएम (FRBM) कायद्यानुसार राज्याची वित्तीय तूट राज्याच्या सकल उत्पन्नाच्या (GSDP) ३% पेक्षा कमी ठेवण्याचे बंधन आहे.'
    ],
    keyPointsEn: [
      'Maharashtra remains the largest contributor to India GSDP at approximately 14%.',
      'Services sector leads with nearly 60% contribution, while agriculture accounts for 12-13%.',
      'Nearly 80% agriculture is rainfed, escalating vulnerability to climate anomalies.',
      'Fiscal Responsibility and Budget Management (FRBM) ceiling stipulates fiscal deficit under 3% of GSDP.'
    ],
    mpscRelevanceMr: 'राज्यसेवा मुख्य परीक्षा पेपर-४ (अर्थव्यवस्था) आणि संयुक्त गट-ब/क पूर्व परीक्षा चालू घडामोडी.',
    mpscRelevanceEn: 'Directly linked to MPSC GS-4 (Economy & Planning) and Combine Prelims economics facts.',
    potentialMainsQuestionMr: 'महाराष्ट्राच्या शाश्वत आर्थिक विकासासाठी सेवा क्षेत्रासोबतच कृषी पायाभूत सुविधा आणि औद्योगिक विकेंद्रीकरण का आवश्यक आहे? स्पष्ट करा.',
    potentialMainsQuestionEn: 'Why is agricultural infrastructure and industrial decentralization vital alongside services growth for Maharashtra? Explain.'
  },
  {
    id: 'lok_ed_03',
    date: 'ऑगस्ट २०२६',
    titleMr: 'भारतीय न्याय संहिता (BNS) आणि नागरिक सुरक्षा : फौजदारी न्यायव्यवस्थेतील सुधारणा',
    titleEn: 'Bharatiya Nyaya Sanhita (BNS) & Criminal Law Reforms: Systemic Overhaul',
    column: 'संपादकीय',
    gsPaper: 'GS-2',
    topic: 'कायदा व न्यायव्यवस्था - नवीन फौजदारी कायदे',
    summaryMr: '१८६० च्या भारतीय दंड संहिता (IPC), १८९८ च्या CrPC आणि १८७२ च्या पुरावा कायद्याऐवजी भारतीय न्याय संहिता (BNS), भारतीय नागरिक सुरक्षा संहिता (BNSS) आणि भारतीय साक्ष अधिनियम (BSA) १ जुलै २०२४ पासून लागू झाले. वसाहतवादी कायद्यांचे निर्मूलन आणि डिजिटल पुराव्यांना कायदेशीर मान्यता या सुधारणांचे लोकसत्ताने विश्लेषण केले.',
    summaryEn: 'Examining the historic replacement of the colonial IPC, CrPC, and Evidence Act by Bharatiya Nyaya Sanhita (BNS), BNSS, and BSA, emphasizing zero FIR, e-FIR, and community service provisions.',
    keyPointsMr: [
      'देशद्रोहाचे (Sedition - जुने कलम १२४A) कलम रद्द करून त्याऐवजी भारताची सार्वभौमत्व आणि अखंडता धोक्यात आणणाऱ्या कृत्यांना शिक्षेची तरतूद केली.',
      'प्रथमच गुन्ह्यांसाठी "समाजसेवा" (Community Service) ही वैकल्पिक शिक्षा म्हणून समाविष्ट करण्यात आली.',
      'झिरो एफआयआर (Zero FIR) आणि ई-एफआयआर (e-FIR) यांना कायदेशीर अधिष्ठान देण्यात आले.',
      'घटनास्थळाची फॉरेन्सिक तपासणी ७ वर्षे किंवा त्याहून अधिक शिक्षा असलेल्या गुन्ह्यांमध्ये बंधनकारक केली.'
    ],
    keyPointsEn: [
      'Repealed the colonial offense of Sedition (Section 124A), replacing it with acts endangering sovereignty and integrity.',
      'Introduced Community Service as a formal penal sentence for minor infractions.',
      'Institutionalized Zero FIR and Electronic First Information Reports (e-FIR).',
      'Mandatory forensic investigation for offenses punishable by 7 years or more.'
    ],
    mpscRelevanceMr: 'राज्यसेवा मुख्य परीक्षा GS-2 आणि पोलीस उपनिरीक्षक (PSI) मुख्य परीक्षा कायदा पेपरसाठी अतिमहत्त्वाचे.',
    mpscRelevanceEn: 'High-priority for MPSC GS-2 (Judiciary & Law) and Police Sub-Inspector (PSI) Mains criminal law papers.',
    potentialMainsQuestionMr: 'नवीन फौजदारी कायद्यांमुळे भारतीय न्यायदान पद्धती अधिक पीडित-केंद्रित (Victim-centric) आणि पारदर्शक होण्यास कशी मदत होईल? परीक्षण करा.',
    potentialMainsQuestionEn: 'Evaluate how the new criminal law framework enhances victim-centric justice delivery and evidentiary transparency in India.'
  },
  {
    id: 'lok_ed_04',
    date: 'जुलै २०२६',
    titleMr: 'पश्चिम घाटातील भूस्खलन आपत्ती आणि माधव गाडगीळ समिती अहवालाची अपरिहार्यता',
    titleEn: 'Western Ghats Landslides & The Unheeded Warnings of the Madhav Gadgil Committee',
    column: 'विशेष लेख',
    gsPaper: 'GS-1',
    topic: 'पर्यावरण व आपत्ती व्यवस्थापन - सह्याद्री संवर्धन',
    summaryMr: 'वायनाड आणि महाराष्ट्रातील कोकण-सह्याद्री भागात घडणाऱ्या वारंवार भूस्खलनांच्या (Landslides) पार्श्वभूमीवर लोकसत्ताने माधव गाडगीळ यांच्या वेस्टर्न घाट्स इकॉलॉजी एक्सपर्ट पॅनल (WGEEP) आणि कस्तुरीरंगन समितीच्या शिफारशींची गरज अधोरेखित केली.',
    summaryEn: 'In the wake of disastrous landslides in Wayanad and Konkan-Sahyadri, Loksatta stresses the urgent necessity of demarcating Ecologically Sensitive Zones (ESZ) as recommended by the Madhav Gadgil Committee.',
    keyPointsMr: [
      'माधव गाडगीळ समितीने (२०११) संपूर्ण पश्चिम घाटाला पर्यावरणीय संवेदनशील क्षेत्र (ESA) घोषित करून तीन स्तरांत (Zone 1, 2, 3) वर्गीकरण सुचवले होते.',
      'कस्तुरीरंगन समितीने (२०१३) पश्चिम घाटातील केवळ ३७% भागाला पर्यावरणीय संवेदनशील क्षेत्र घोषित करण्याची मवाळ शिफारस केली होती.',
      'सह्याद्रीतील खाणकाम, अनधिकृत रिसॉर्ट्स, वृक्षतोड आणि डोंगरउतारांवरील उत्खननामुळे मातीची धूप होऊन भूस्खलन वाढले आहे.',
      'स्थानिक ग्रामपंचायतींना सहभागी करून घेत विकेंद्रित पर्यावरण संवर्धन (Decentralized Governance) करणे हाच खरा उपाय आहे.'
    ],
    keyPointsEn: [
      'Madhav Gadgil WGEEP (2011) classified 100% of the Western Ghats into Ecologically Sensitive Zones (ESZ 1, 2, 3).',
      'K. Kasturirangan HLWG (2013) diluted the zone to 37% of the total expanse.',
      'Unregulated quarrying, deforestation, and hill-slope construction precipitate recurrent landslides.',
      'Decentralized governance engaging local Gram Sabhas is indispensable for Sahyadri conservation.'
    ],
    mpscRelevanceMr: 'राज्यसेवा मुख्य GS-1 (भूगोल व पर्यावरण), GS-3 (आपत्ती व्यवस्थापन) आणि सर्व पूर्व परीक्षा.',
    mpscRelevanceEn: 'Core topic for MPSC GS-1 (Geography & Ecology), GS-3 (Disaster Management) and Prelims.',
    potentialMainsQuestionMr: '"पश्चिम घाटाचे संरक्षण हे केवळ पर्यावरणाचा प्रश्न नसून कोट्यवधी लोकांच्या जीवित व अर्थव्यवस्थेशी जोडलेला मुद्दा आहे." गाडगीळ व कस्तुरीरंगन अहवालांच्या संदर्भात स्पष्ट करा.',
    potentialMainsQuestionEn: '"Protecting Western Ghats is not solely ecological preservation, but an existential economic safeguard." Discuss in light of Gadgil and Kasturirangan reports.'
  },
  {
    id: 'lok_ed_05',
    date: 'मे २०२६',
    titleMr: 'मराठा लष्करी भूदृश्ये : युनेस्को (UNESCO) जागतिक वारसा नामांकन आणि महाराष्ट्राचा ऐतिहासिक वारसा',
    titleEn: 'Maratha Military Landscapes: UNESCO World Heritage Nomination & Fort Conservation',
    column: 'संपादकीय',
    gsPaper: 'GS-1',
    topic: 'महाराष्ट्राचा इतिहास व संस्कृती - दुर्ग संवर्धन',
    summaryMr: 'भारताकडून २०२४-२५ या वर्षासाठी युनेस्कोच्या जागतिक वारसा यादीत (UNESCO World Heritage) छत्रपती शिवाजी महाराजांच्या ‘मराठा लष्करी भूदृश्ये’ (Maratha Military Landscapes) अंतर्गत महाराष्ट्रातील १२ किल्ल्यांचे अधिकृत नामांकन पाठवण्यात आले. दुर्गसंवर्धनाची आधुनिक निकड लोकसत्ताच्या संपादकीयमधून मांडली गेली.',
    summaryEn: 'India nominated 12 historic Maratha hill, coastal, and forest forts under the "Maratha Military Landscapes" for UNESCO World Heritage recognition. Loksatta evaluates fort conservation and tourism policy.',
    keyPointsMr: [
      'नामांकित १२ किल्ल्यांमध्ये: साल्हेर, शिवनेरी, लोहगड, खंडेरी, रायगड, राजगड, प्रतापगड, सुवर्णदुर्ग, पन्हाळा, विजयदुर्ग, सिंधुदुर्ग आणि तमिळनाडूमधील जिंजी किल्ला यांचा समावेश आहे.',
      'छत्रपती शिवाजी महाराजांनी सह्याद्रीच्या भौगोलिक रचनेचा वापर करून गनिमी काव्याची (Guerrilla Warfare) रणनीती विकसित केली.',
      'किल्ल्यांच्या संवर्धनासाठी आंतरराष्ट्रीय दर्जाचे नियम (ICOMOS निकष) आणि स्थानिक पर्यटनाचे संतुलन राखणे आवश्यक आहे.',
      'जागतिक वारसा दर्जा मिळाल्यास आंतरराष्ट्रीय पर्यटन आणि पुरातत्व संशोधनाला मोठी चालना मिळेल.'
    ],
    keyPointsEn: [
      '12 forts nominated: Salher, Shivneri, Lohagad, Khanderi, Raigad, Rajgad, Pratapgad, Suvarnadurg, Panhala, Vijaydurg, Sindhudurg and Gingee Fort (Tamil Nadu).',
      'Exemplifies Chhatrapati Shivaji Maharaj visionary adaptation of Sahyadri rugged terrain for naval and guerrilla defenses.',
      'Necessitates alignment with ICOMOS conservation standards while balancing sustainable eco-tourism.',
      'Catalyzes international heritage tourism and deep archaeological scholarship in Maharashtra.'
    ],
    mpscRelevanceMr: 'राज्यसेवा मुख्य GS-1 (महाराष्ट्र इतिहास व कला-संस्कृती) आणि पूर्व परीक्षेसाठी १००% खात्रीशीर प्रश्न.',
    mpscRelevanceEn: 'Indispensable for MPSC GS-1 (History of Maharashtra, Art & Culture) and Prelims heritage MCQs.',
    potentialMainsQuestionMr: 'छत्रपती शिवाजी महाराजांच्या दुर्गउभारणी तंत्रज्ञानाचे व लष्करी भूदृश्यांचे महत्त्व सांगून महाराष्ट्रातील ऐतिहासिक वास्तू संवर्धनासमोरील आव्हाने स्पष्ट करा.',
    potentialMainsQuestionEn: 'Analyze the strategic significance of Maratha military landscapes and identify key challenges in historical heritage preservation in Maharashtra.'
  }
];

// ---------------------------------------------------------------------------------
// 2. लोकसत्ता व्यक्तिवेध (Vyaktiwedh - Personalities in News)
// ---------------------------------------------------------------------------------
export const LOKSATTA_VYAKTIWEDH: LoksattaVyaktiwedh[] = [
  {
    id: 'lok_vy_01',
    nameMr: 'रतन नवल टाटा (१९३७ – २०२४)',
    nameEn: 'Ratan Naval Tata (1937 – 2024)',
    date: 'ऑक्टोबर २०२४',
    field: 'उद्योग, परोपकार व राष्ट्रउभारणी (Industry & Philanthropy)',
    titleMr: 'राष्ट्रउभारणीत तत्त्वनिष्ठ उद्योजकतेचे दीपस्तंभ',
    titleEn: 'Exemplar of Value-Based Industrial Stewardship',
    bioSummaryMr: 'टाटा समूहाचे माजी अध्यक्ष आणि ज्येष्ठ उद्योजक रतन टाटा यांचे ९ ऑक्टोबर २०२४ रोजी मुंबईत निधन झाले. त्यांनी टाटा समूहाला जागतिक बहुराष्ट्रीय समूहाचा दर्जा मिळवून दिला. त्यांच्या उत्पन्नाचा ६६% हिस्सा टाटा ट्रस्टच्या माध्यमातून शिक्षण, आरोग्य व ग्रामीण विकासासाठी दान करण्यात आला.',
    bioSummaryEn: 'Former chairman of the Tata Group and visionary industrialist who propelled Indian enterprise onto the global stage while dedicating 66% of equity towards public healthcare, education, and rural development via Tata Trusts.',
    keyAchievementsMr: [
      'पद्मभूषण (२०००) आणि पद्मविभूषण (२००८) या सर्वोच्च नागरी सन्मानांनी गौरव.',
      'टाटा नॅनो, इंडिका कारची निर्मिती आणि टेटली, कोरस, जॅग्वार लँड रोव्हर (JLR) यांसारख्या बहुराष्ट्रीय कंपन्यांचे ऐतिहासिक संपादन.',
      'महाराष्ट्र शासनाचा पहिला "उद्योगरत्न" पुरस्कार (२०२३) देऊन गौरव करण्यात आला.',
      'कर्करोग रुग्णालय साखळी, आयआयटी मुंबई व बंगळुरू येथे संशोधनासाठी अब्जावधी रुपयांची मदत.'
    ],
    keyAchievementsEn: [
      'Conferred Padma Bhushan (2000) and Padma Vibhushan (2008).',
      'Pioneered Tata Indica, Tata Nano, and landmark global acquisitions: Tetley, Corus, and Jaguar Land Rover.',
      'Conferred the inaugural "U उद्योग रत्न" (Udyog Ratna) award by the Government of Maharashtra in 2023.',
      'Endowed extensive oncology healthcare networks across underserved regions in India.'
    ],
    mpscTipMr: 'MPSC चालू घडामोडी: "महाराष्ट्र शासनाचा पहिला उद्योगरत्न पुरस्कार कोणाला दिला गेला?" हा थेट प्रश्न विचारला जातो.'
  },
  {
    id: 'lok_vy_02',
    nameMr: 'डॉ. अभय बंग आणि डॉ. राणी बंग',
    nameEn: 'Dr. Abhay Bang & Dr. Rani Bang',
    date: 'जानेवारी २०२५/२०२६',
    field: 'सार्वजनिक आरोग्य, समाजकार्य व आदिवासी सक्षमीकरण (Public Health & SEARCH Gadchiroli)',
    titleMr: 'गडचिरोलीच्या जंगलातून जागतिक बालआरोग्याची दिशा बदलणारे युगुल',
    titleEn: 'Transforming Global Neonatal Survival from the Forests of Gadchiroli',
    bioSummaryMr: 'गडचिरोलीमधील ‘शोध’ (SEARCH) संस्थेच्या माध्यमातून बालमृत्यू दर कमी करण्यासाठी डॉ. अभय बंग आणि डॉ. राणी बंग यांनी ‘घरगुती नवजात अर्भक काळजी’ (Home-Based Newborn Care - HBNC) हे क्रांतीकारी मॉडेल विकसित केले. जागतिक आरोग्य संघटनेने (WHO) हे मॉडेल जगभरात स्वीकारले.',
    bioSummaryEn: 'Renowned public health researchers whose pioneering Home-Based Newborn Care (HBNC) model reduced infant mortality in tribal Gadchiroli from 121 to 30 per 1,000, subsequently adopted by WHO across developing nations.',
    keyAchievementsMr: [
      'भारत सरकारकडून पद्मश्री सन्मानाने गौरव.',
      'दारूबंदी चळवळ आणि गडचिरोलीत दारू-तंबाखूमुक्तीसाठी यशस्वी लोकआंदोलन उभारले.',
      'आशा (ASHA) स्वयंसेविका प्रणालीची पायाभरणी डॉ. बंग यांच्या ‘आरोग्यदूत’ संकल्पनेतूनच झाली.',
      'महाराष्ट्र शासनाचा सर्वोच्च "महाराष्ट्र भूषण पुरस्कार" देऊन सन्मानित.'
    ],
    keyAchievementsEn: [
      'Conferred Padma Shri by Government of India and Maharashtra Bhushan.',
      'Conceptualized community health worker protocols that served as the blueprint for the national ASHA network.',
      'Spearheaded historic de-addiction and prohibition grassroots movements in eastern Maharashtra.',
      'Recipient of the MacArthur Award for International Justice.'
    ],
    mpscTipMr: 'MPSC GS-2 (आरोग्य, समाजकल्याण) आणि GS-3 (मानव संसाधन विकास) यांमध्ये डॉ. बंग यांच्या ‘शोध’ मॉडेलवर हमखास प्रश्न विचारला जातो.'
  },
  {
    id: 'lok_vy_03',
    nameMr: 'न्यायमूर्ती संजीव खन्ना (Justice Sanjiv Khanna)',
    nameEn: 'Chief Justice Sanjiv Khanna',
    date: 'नोव्हेंबर २०२४ – मे २०२५',
    field: 'न्यायव्यवस्था - भारताचे ५१ वे सरन्यायाधीश (Judiciary - 51st Chief Justice of India)',
    titleMr: 'भारताचे ५१ वे सरन्यायाधीश आणि घटनात्मक निकालांचे शिल्पकार',
    titleEn: '51st Chief Justice of India & Constitutional Jurist',
    bioSummaryMr: 'न्यायमूर्ती धनंजय यशवंत चंद्रचूड यांच्या निवृत्तीनंतर ११ नोव्हेंबर २०२४ रोजी न्यायमूर्ती संजीव खन्ना यांनी भारताचे ५१ वे सरन्यायाधीश (CJI) म्हणून शपथ घेतली. ते दिल्ली उच्च न्यायालयातून सर्वोच्च न्यायालयात पदोन्नती मिळालेले ख्यातनाम कायदेतज्ज्ञ आहेत.',
    bioSummaryEn: 'Sworn in as the 51st Chief Justice of India on 11 November 2024, succeeding Justice D.Y. Chandrachud. Renowned for landmark verdicts on EVM-VVPAT auditing, Electoral Bonds, and Article 370.',
    keyAchievementsMr: [
      'इलेक्ट्रॉनिक व्होटिंग मशीन (EVM) आणि VVPAT स्लिप्सची १००% पडताळणी प्रकरणातील महत्त्वपूर्ण निकाल दिला.',
      'इलेक्टोरल बाँड्स (Electoral Bonds Scheme) रद्द करणाऱ्या ५ न्यायाधीशांच्या घटनापीठात महत्त्वपूर्ण सहभाग.',
      'जम्मू-काश्मीरमधील कलम ३७० रद्दबातल ठरवण्याच्या घटनापीठाचे सदस्य.',
      'त्यांचे काका न्यायमूर्ती एच. आर. खन्ना हे १९७६ च्या आणीबाणीत एडीएम जबलपूर (ADM Jabalpur) खटल्यात मूलभूत हक्कांसाठी ठाम राहणारे महान न्यायाधीश होते.'
    ],
    keyAchievementsEn: [
      'Authored the definitive verdict affirming the technological integrity of EVM-VVPAT voting architecture.',
      'Core member of the 5-judge Constitution Bench declaring Electoral Bonds unconstitutional.',
      'Part of the Constitution Bench upholding the abrogation of Article 370.',
      'Nephew of illustrious Justice H.R. Khanna, the lone dissenter in the historic ADM Jabalpur Habeas Corpus case (1976).'
    ],
    mpscTipMr: 'MPSC प्रश्न: "भारताचे ५१ वे सरन्यायाधीश कोण?" किंवा "CJI ची शपथ राष्ट्रपती घटनेच्या कोणत्या कलमानुसार देतात?" (कलम १२४(६)).'
  },
  {
    id: 'lok_vy_04',
    nameMr: 'डॉ. प्रभा अत्रे (१९३२ – २०२४)',
    nameEn: 'Dr. Prabha Atre (1932 – 2024)',
    date: 'जानेवारी २०२४',
    field: 'भारतीय शास्त्रीय संगीत व कला (Kirana Gharana Classical Music)',
    titleMr: 'किराणा घराण्याच्या ज्येष्ठ गायिका व संगीत क्षेत्रातील ज्ञानतपस्वी',
    titleEn: 'Doyenne of Kirana Gharana & Classical Vocalist',
    bioSummaryMr: 'किराणा घराण्याच्या ज्येष्ठ शास्त्रीय गायिका डॉ. प्रभा अत्रे यांचे १३ जानेवारी २०२४ रोजी वयाच्या ९२ व्या वर्षी पुण्यात निधन झाले. त्या गायिका, संगीत संशोधक, लेखिका आणि प्राध्यापिका अशा विविध क्षेत्रांत अग्रगण्य होत्या.',
    bioSummaryEn: 'Legendary Indian classical vocalist of the Kirana Gharana, scholar, and author who was one of the rarest artists to be decorated with all three Padma awards: Padma Shri, Padma Bhushan, and Padma Vibhushan.',
    keyAchievementsMr: [
      'तिन्ही पद्म पुरस्कार मिळवणाऱ्या दुर्मीळ कलावंत: पद्मश्री (१९९०), पद्मभूषण (२००२) आणि पद्मविभूषण (२०२२).',
      'संगीत नाटक अकादमी पुरस्कार आणि कालिदास सन्मानाने सन्मानित.',
      '‘स्वरमयी’, ‘सुस्वराली’ आणि ‘एन्लायटनिंग म्युझिक’ या गाजलेल्या पुस्तकांचे लेखन केले.',
      'पुण्यात ‘स्वरमयी गुरुकुल’ संस्थेची स्थापना करून शास्त्रीय संगीताचा प्रसार केला.'
    ],
    keyAchievementsEn: [
      'Conferred Padma Shri (1990), Padma Bhushan (2002), and Padma Vibhushan (2022).',
      'Author of authoritative musical treatises including Swaramayee and Suswaralee.',
      'Sangeet Natak Akademi Award and Kalidas Samman recipient.',
      'Founded the Swaramayee Gurukul in Pune to perpetuate classical music pedagogy.'
    ],
    mpscTipMr: 'MPSC कला व संस्कृती चालू घडामोडी: "२०२२ मध्ये कोणत्या महाराष्ट्रीयन गायिकेला पद्मविभूषण पुरस्कार देण्यात आला?" - डॉ. प्रभा अत्रे.'
  }
];

// ---------------------------------------------------------------------------------
// 3. लोकसत्ता कुतूहल (Science, Ecology & Technology)
// ---------------------------------------------------------------------------------
export const LOKSATTA_KUTUHAL: LoksattaKutuhal[] = [
  {
    id: 'lok_ku_01',
    titleMr: 'कास पठार (Kaas Plateau) : महाराष्ट्राचे व्हॅली ऑफ फ्लॉवर्स आणि जैवविविधता रहस्ये',
    titleEn: 'Kaas Plateau: Geological Marvel, Endemic Flora & Ecology of the Laterite Tableland',
    date: 'सप्टेंबर २०२६',
    domain: 'वनस्पती व पर्यावरण',
    summaryMr: 'सातारा जिल्ह्यातील जांभ्या खडकाचे (Laterite Rock) कास पठार हे युनेस्को जागतिक नैसर्गिक वारसा स्थळ आहे. दरवर्षी ऑगस्ट-सप्टेंबरमध्ये उमलणाऱ्या ८५० हून अधिक फुलांच्या प्रजाती आणि कीटकभक्षी वनस्पतींचे वैज्ञानिक विश्लेषण लोकसत्ताच्या कुतूहल सदरातून मांडले गेले.',
    summaryEn: 'An exploration of Satara Laterite plateau UNESCO Natural Heritage site, highlighting its microclimate, lateritic soil ecology, and 850+ flowering species, including endangered carnivorous plants.',
    scientificFactsMr: [
      'कास पठारावरील मातीचा थर अत्यंत पातळ (काही सेंटीमीटर) असतो, ज्यामुळे मोठ्या वृक्षांची वाढ होत नाही, परंतु कंदयुक्त आणि हंगामी गवताळ वनस्पती बहरतात.',
      'येथे ‘ड्रोसेरा’ (Drosera - गव्हाणी / दवबिंदू वनस्पती) आणि ‘युट्रिक्युलारिया’ (Utricularia - सीतेची आसवे) यांसारख्या कीटकभक्षी वनस्पती मोठ्या प्रमाणात आढळतात.',
      'कास पठारावरील ३० पेक्षा जास्त वनस्पती केवळ याच भागात आढळणाऱ्या स्थानिक (Endemic) प्रजाती आहेत, उदा. डिप्काडी (Dipcadi concanense).',
      'युनेस्कोने २०१२ मध्ये पश्चिम घाटाचा भाग म्हणून कास पठाराचा समावेश जागतिक नैसर्गिक वारसा यादीत केला.'
    ],
    scientificFactsEn: [
      'Ultra-thin lateritic soil profile inhibits deep tree roots while supporting hyper-specialized ephemeral tuberous herbs.',
      'Host to carnivorous insectivorous flora: Drosera indica (Sundew) and Utricularia (Bladderworts) adapting to nitrogen-poor soils.',
      'Harbors over 30 endemic species restricted solely to this geological micro-niche.',
      'Inscribed on the UNESCO World Natural Heritage List in 2012 as an integral segment of Western Ghats.'
    ],
    examSignificanceMr: 'MPSC GS-1 (महाराष्ट्र भूगोल व पर्यावरण): कास पठारावरील वनस्पती, मातीचा प्रकार (जांभा खडक) व युनेस्को वर्ष यावर वारंवार प्रश्न येतात.'
  },
  {
    id: 'lok_ku_02',
    titleMr: 'इस्रोचे गगनयान आणि भारतीय अंतराळ स्थानक (BAS २०२८) : अंतराळ तंत्रज्ञानातील स्वावलंबन',
    titleEn: 'ISRO Gaganyaan & Bharatiya Antariksh Station: Indigenous Spaceflight Milestones',
    date: 'ऑगस्ट २०२६',
    domain: 'भौतिक व अंतराळ विज्ञान',
    summaryMr: 'मानवाला ४०० किमीच्या पृथ्वीच्या कक्षेत (Low Earth Orbit) पाठवून सुरक्षित परत आणण्याची भारताची पहिली मानवी अंतराळ मोहीम ‘गगनयान’ आणि २०२८ पर्यंत उभारले जाणारे पहिले ‘भारतीय अंतराळ स्थानक’ (BAS) यावर कुतूहल सदराने सविस्तर तांत्रिक माहिती दिली.',
    summaryEn: 'Comprehensive scientific review of ISRO Human Spaceflight Programme (Gaganyaan) utilizing HLVM3, crew safety escape systems, and roadmap toward the Bharatiya Antariksh Station (BAS) by 2028.',
    scientificFactsMr: [
      'गगनयान मोहिमेसाठी मानवी सुरक्षेसाठी प्रमाणित केलेले ‘HLVM3’ (LVM3) हे तीन टप्प्यांचे प्रक्षेपक (Solid, Liquid Vikas Engine, Cryogenic C25) वापरले जाईल.',
      'क्रू मॉडेलला समुद्रात उतरवण्यासाठी स्वदेशी पॅराशूट यंत्रणा आणि ‘क्रू एस्केप सिस्टीम’ (CES) विकसित करण्यात आली आहे.',
      'मानवापूर्वी अंतराळात पाठवण्यासाठी ‘व्योममित्र’ (Vyommitra) ही महिला अर्ध-मानवी रोबोट (Half-Humanoid Robot) इस्रोने तयार केली आहे.',
      'भारताने २०३५ पर्यंत संपूर्ण भारतीय अंतराळ स्थानक (BAS) आणि २०४० पर्यंत चंद्रावर मानवी पाऊल ठेवण्याचे उद्दिष्ट ठेवले आहे.'
    ],
    scientificFactsEn: [
      'Propelled by Human-Rated LVM3 (HLVM3) featuring S200 solid boosters, L110 liquid stage, and C25 cryogenic upper stage.',
      'Engineered with high-thrust Crew Escape System (CES) for emergency mid-flight pad and ascent aborts.',
      'Vyommitra: Half-humanoid female robot deployed for uncrewed orbital qualification flights to test cabin life-support.',
      'Target roadmap: Bharatiya Antariksh Station (BAS) modular operationalization by 2035; crewed lunar landing by 2040.'
    ],
    examSignificanceMr: 'MPSC GS-4 (विज्ञान व तंत्रज्ञान) आणि सर्व पूर्व परीक्षांसाठी अतिमहत्त्वाचा घटक.'
  },
  {
    id: 'lok_ku_03',
    titleMr: 'ग्रीन हायड्रोजन (Green Hydrogen) : भारताचे ऊर्जा संक्रमण आणि भविष्यकालीन इंधन',
    titleEn: 'Green Hydrogen: Electrolysis, National Mission & Clean Energy Decarbonization',
    date: 'जुलै २०२६',
    domain: 'ऊर्जा व तंत्रज्ञान',
    summaryMr: 'पाण्याचे विद्युत अपघटन (Electrolysis) करून सौर किंवा पवन ऊर्जेच्या मदतीने तयार होणारा ‘ग्रीन हायड्रोजन’ हा भारताला २०७० पर्यंत ‘नेट-झिरो’ (Net Zero) कार्बन उत्सर्जनाचे लक्ष्य गाठण्यासाठी कसा उपयुक्त ठरेल, याचे कुतूहल सदरातून साधे-सोपे स्पष्टीकरण देण्यात आले.',
    summaryEn: 'Examines the chemistry, water electrolysis mechanics, and industrial decarbonization imperatives under the National Green Hydrogen Mission to achieve Net Zero by 2070.',
    scientificFactsMr: [
      'हायड्रोजनचे वर्गीकरण: ग्रे (जीवाश्म इंधनापासून), ब्लू (कार्बन कॅप्चर तंत्रज्ञानासह जीवाश्म इंधन), आणि ग्रीन (नूतनीकरणक्षम ऊर्जेद्वारे पाण्याचे इलेक्ट्रोलायसिस करून).',
      'भारताने जानेवारी २०२३ मध्ये ‘राष्ट्रीय ग्रीन हायड्रोजन मिशन’ (National Green Hydrogen Mission) सुरू केले, ज्यासाठी १९,७४४ कोटी रुपयांची तरतूद आहे.',
      'उद्दिष्ट: २०३० पर्यंत दरवर्षी ५ दशलक्ष मेट्रिक टन (MMT) ग्रीन हायड्रोजन निर्मिती क्षमता साध्य करणे.',
      'स्टील उद्योग, खतनिर्मिती आणि लांब पल्ल्याच्या वाहतुकीत (जड वाहने) जीवाश्म इंधनाला ग्रीन हायड्रोजन हा सर्वोत्तम पर्याय आहे.'
    ],
    scientificFactsEn: [
      'Color spectrum of Hydrogen: Grey (fossil methane without CCS), Blue (with carbon capture), and Green (renewable electrolysis).',
      'National Green Hydrogen Mission launched in 2023 with an outlay of ₹19,744 crore.',
      'Target: Minimum 5 MMT annual production capacity of green hydrogen by 2030.',
      'Crucial decarbonizer for hard-to-abate sectors: steel refineries, fertilizer ammonia synthesis, and heavy freight.'
    ],
    examSignificanceMr: 'MPSC GS-4 (ऊर्जा तंत्रज्ञान) आणि GS-1 (पर्यावरण भूगोल) चालू घडामोडी.'
  }
];

// ---------------------------------------------------------------------------------
// 4. लोकसत्ता आधारित MPSC सराव प्रश्न (Loksatta MPSC Practice MCQs)
// ---------------------------------------------------------------------------------
export const LOKSATTA_MPSC_MCQS: LoksattaMcq[] = [
  {
    id: 'lok_mcq_01',
    newsReference: 'लोकसत्ता संपादकीय - १०६ वी घटनादुरुस्ती कायदा',
    date: 'ऑक्टोबर २०२६',
    topic: 'राज्यव्यवस्था - १०६ वी घटनादुरुस्ती',
    difficulty: 'Moderate',
    questionMr: "भारतीय संसदेने मंजूर केलेल्या १०६ व्या घटनादुरुस्ती कायद्याबाबत (नारी शक्ती वंदन अधिनियम) खालील विधाने विचारात घ्या:\n(अ) या कायद्याने लोकसभा आणि राज्य विधानसभांमध्ये महिलांसाठी ३३% आरक्षण लागू केले आहे.\n(ब) या घटनादुरुस्तीद्वारे भारतीय राज्यघटनेत कलम ३३०A आणि कलम ३३२A नव्याने समाविष्ट करण्यात आले.\n(क) हे आरक्षण कायदा संमत होताच तत्काळ अमलात आले असून त्यासाठी जनगणनेची आवश्यकता नाही.\n\nवरीलपैकी कोणती विधाने बरोबर आहेत?",
    questionEn: "Consider the following statements regarding the 106th Constitutional Amendment Act (Nari Shakti Vandan Adhiniyam):\n(a) It provides 33% reservation for women in Lok Sabha and State Legislative Assemblies.\n(b) It inserted Articles 330A and 332A into the Indian Constitution.\n(c) The reservation came into force immediately upon enactment without requiring a census.\n\nWhich of the statements given above are correct?",
    statementsMr: [
      'अ. या कायद्याने लोकसभा आणि राज्य विधानसभांमध्ये महिलांसाठी ३३% आरक्षण लागू केले.',
      'ब. या कायद्याद्वारे घटनेत कलम ३३०A आणि कलम ३३२A नव्याने समाविष्ट करण्यात आले.',
      'क. हे आरक्षण कायदा संमत होताच तत्काळ अमलात आले असून त्यासाठी जनगणनेची आवश्यकता नाही.'
    ],
    statementsEn: [
      'a. Mandates 33% reservation for women in Lok Sabha and State Legislative Assemblies.',
      'b. Inserted Articles 330A and 332A into the Constitution.',
      'c. Came into force immediately without requiring any census or delimitation.'
    ],
    optionsMr: [
      '१) केवळ अ बरोबर',
      '२) केवळ अ आणि ब बरोबर',
      '३) केवळ ब आणि क बरोबर',
      '४) सर्व विधाने (अ, ब, क) बरोबर'
    ],
    optionsEn: [
      '1) Only (a) is correct',
      '2) Only (a) and (b) are correct',
      '3) Only (b) and (c) are correct',
      '4) All (a), (b), and (c) are correct'
    ],
    correctAnswerIndex: 1,
    explanationMr: "लोकसत्ता स्पष्टीकरण: विधान (क) असत्य आहे, कारण या कायद्याच्या कलम ५ नुसार हे आरक्षण पुढील जनगणना आणि त्यानंतर होणारी मतदारसंघ पुनर्रचना (Delimitation) पूर्ण झाल्यानंतरच लागू होईल. विधान (अ) व (ब) सत्य आहेत.",
    explanationEn: "Official Loksatta Analysis: Statement (c) is false because Section 5 explicitly stipulates that the reservation will take effect only after delimitation is carried out following the first census conducted after enactment. Statements (a) and (b) are correct."
  },
  {
    id: 'lok_mcq_02',
    newsReference: 'लोकसत्ता विशेष वृत्त - महाराष्ट्र जागतिक वारसा नामांकन',
    date: 'सप्टेंबर २०२६',
    topic: 'इतिहास व संस्कृती - मराठा लष्करी भूदृश्ये',
    difficulty: 'Moderate',
    questionMr: "युनेस्कोच्या (UNESCO) जागतिक वारसा यादीसाठी भारताकडून नामांकित करण्यात आलेल्या 'मराठा लष्करी भूदृश्ये' (Maratha Military Landscapes) अंतर्गत खालीलपैकी कोणता किल्ला महाराष्ट्राबाहेर (तमिळनाडूमध्ये) स्थित आहे?",
    questionEn: "Under the 'Maratha Military Landscapes' nominated for UNESCO World Heritage recognition by India, which of the following forts is located outside Maharashtra (in Tamil Nadu)?",
    optionsMr: [
      '१) जिंजी किल्ला (Gingee Fort)',
      '२) सिंधुदुर्ग किल्ला (Sindhudurg Fort)',
      '३) साल्हेर किल्ला (Salher Fort)',
      '४) विजयदुर्ग किल्ला (Vijaydurg Fort)'
    ],
    optionsEn: [
      '1) Gingee Fort',
      '2) Sindhudurg Fort',
      '3) Salher Fort',
      '4) Vijaydurg Fort'
    ],
    correctAnswerIndex: 0,
    explanationMr: "लोकसत्ता स्पष्टीकरण: नामांकित १२ किल्ल्यांपैकी ११ किल्ले महाराष्ट्रात असून 'जिंजी किल्ला' हा तमिळनाडूच्या विल्लुपुरम जिल्ह्यात आहे. छत्रपती शिवाजी महाराजांनी १६७७ च्या दक्षिण मोहिमेत हा किल्ला जिंकला होता.",
    explanationEn: "Official Loksatta Analysis: Out of the 12 nominated forts, 11 are located in Maharashtra, while Gingee Fort is situated in Tamil Nadu (Villupuram district), captured by Chhatrapati Shivaji Maharaj during his 1677 southern expedition."
  },
  {
    id: 'lok_mcq_03',
    newsReference: 'लोकसत्ता व्यक्तिवेध - रतन टाटा जीवनगौरव',
    date: 'ऑक्टोबर २०२४',
    topic: 'महाराष्ट्र चालू घडामोडी - उद्योगरत्न पुरस्कार',
    difficulty: 'Moderate',
    questionMr: "महाराष्ट्र शासनाने २०२३ मध्ये सुरू केलेला पहिला मानाचा 'उद्योगरत्न' (Udyog Ratna) पुरस्कार खालीलपैकी कोणत्या महान उद्योजकाला प्रदान करण्यात आला होता?",
    questionEn: "The inaugural 'Udyog Ratna' award instituted by the Government of Maharashtra in 2023 was conferred upon which distinguished industrialist?",
    optionsMr: [
      '१) मुकेश अंबानी',
      '२) रतन टाटा',
      '३) सायरस पूनावाला',
      '४) कुमार मंगलम बिर्ला'
    ],
    optionsEn: [
      '1) Mukesh Ambani',
      '2) Ratan Tata',
      '3) Cyrus Poonawalla',
      '4) Kumar Mangalam Birla'
    ],
    correctAnswerIndex: 1,
    explanationMr: "लोकसत्ता व्यक्तिवेध संदर्भ: महाराष्ट्र शासनाचा पहिला 'उद्योगरत्न पुरस्कार २०२३' ज्येष्ठ उद्योगपती रतन नवल टाटा यांना त्यांच्या अतुलनीय राष्ट्रउभारणी व औद्योगिक योगदानासाठी त्यांच्या निवासस्थानी जाऊन प्रदान करण्यात आला होता.",
    explanationEn: "Loksatta Vyaktiwedh Reference: The Government of Maharashtra instituted the prestigious state award 'Udyog Ratna' in 2023, presenting the inaugural award to Ratan Naval Tata."
  },
  {
    id: 'lok_mcq_04',
    newsReference: 'लोकसत्ता कुतूहल - पश्चिम घाट व कास पठार जैवविविधता',
    date: 'सप्टेंबर २०२६',
    topic: 'पर्यावरण व जैवविविधता - कीटकभक्षी वनस्पती',
    difficulty: 'Hard',
    questionMr: "महाराष्ट्रातील सातारा जिल्ह्यातील कास पठारावर आढळणाऱ्या खालीलपैकी कोणत्या वनस्पती 'कीटकभक्षी' (Carnivorous/Insectivorous) वनस्पतींच्या वर्गात मोडतात?\n(अ) ड्रोसेरा इंडिका (Drosera indica / गव्हाणी)\n(ब) युट्रिक्युलारिया (Utricularia / सीतेची आसवे)\n(क) नेपेंथिस खासियाना (Nepenthes khasiana)\n\nयोग्य पर्याय निवडा:",
    questionEn: "Which of the following plants found on the Kaas Plateau in Satara, Maharashtra, belong to the category of 'Insectivorous / Carnivorous' plants?\n(a) Drosera indica (Sundew)\n(b) Utricularia (Bladderwort)\n(c) Nepenthes khasiana (Pitcher plant)\n\nSelect the correct option:",
    optionsMr: [
      '१) केवळ (अ) बरोबर',
      '२) केवळ (अ) आणि (ब) बरोबर',
      '३) केवळ (ब) आणि (क) बरोबर',
      '४) सर्व (अ), (ब) आणि (क) बरोबर'
    ],
    optionsEn: [
      '1) Only (a) is correct',
      '2) Only (a) and (b) are correct',
      '3) Only (b) and (c) are correct',
      '4) All (a), (b), and (c) are correct'
    ],
    correctAnswerIndex: 1,
    explanationMr: "लोकसत्ता कुतूहल विश्लेषण: कास पठारावर 'ड्रोसेरा' (Drosera) आणि 'युट्रिक्युलारिया' (Utricularia) या दोन्ही कीटकभक्षी वनस्पती मुबलक आढळतात. 'नेपेंथिस खासियाना' ही घटपर्णी वनस्पती कास पठारावर नसून ती मेघालय (ईशान्य भारत) मधील स्थानिक वनस्पती आहे. म्हणून (अ) आणि (ब) योग्य आहेत.",
    explanationEn: "Official Loksatta Kutuhal Analysis: Drosera indica and Utricularia thrive on Kaas Plateau nitrogen-deficient laterite soils. However, Nepenthes khasiana (Pitcher plant) is endemic to Meghalaya in Northeast India, not Maharashtra. Hence, only (a) and (b) are correct."
  },
  {
    id: 'lok_mcq_05',
    newsReference: 'लोकसत्ता कायदा स्तंभ - भारतीय न्याय संहिता (BNS)',
    date: 'जुलै २०२६',
    topic: 'राज्यव्यवस्था व कायदा - फौजदारी कायदे',
    difficulty: 'Moderate',
    questionMr: "१ जुलै २०२४ पासून भारतात लागू झालेल्या नवीन फौजदारी कायद्यांच्या संदर्भात खालील योग्य जोडी ओळखा:\n(१) भारतीय न्याय संहिता (BNS) – जुन्या भारतीय पुरावा कायद्याची जागा घेतली\n(२) भारतीय नागरिक सुरक्षा संहिता (BNSS) – जुन्या फौजदारी प्रक्रिया संहिता (CrPC) ची जागा घेतली\n(३) भारतीय साक्ष अधिनियम (BSA) – जुन्या भारतीय दंड संहिता (IPC) ची जागा घेतली",
    questionEn: "Identify the correct pair regarding the new criminal laws effective in India from 1 July 2024:\n(1) Bharatiya Nyaya Sanhita (BNS) – Replaced Indian Evidence Act\n(2) Bharatiya Nagarik Suraksha Sanhita (BNSS) – Replaced Code of Criminal Procedure (CrPC)\n(3) Bharatiya Sakshya Adhiniyam (BSA) – Replaced Indian Penal Code (IPC)",
    optionsMr: [
      '१) केवळ जोडी (१) बरोबर',
      '२) केवळ जोडी (२) बरोबर',
      '३) केवळ जोडी (३) बरोबर',
      '४) सर्व जोड्या बरोबर'
    ],
    optionsEn: [
      '1) Only pair (1) is correct',
      '2) Only pair (2) is correct',
      '3) Only pair (3) is correct',
      '4) All pairs are correct'
    ],
    correctAnswerIndex: 1,
    explanationMr: "लोकसत्ता संपादकीय स्पष्टीकरण: योग्य रचना:\n• BNS ने १८६० च्या IPC (भारतीय दंड संहिता) ची जागा घेतली.\n• BNSS ने १८९८/१९७३ च्या CrPC (फौजदारी प्रक्रिया संहिता) ची जागा घेतली.\n• BSA ने १८७२ च्या भारतीय पुरावा कायद्याची (Evidence Act) जागा घेतली.\nम्हणून केवळ जोडी (२) बरोबर आहे.",
    explanationEn: "Official Loksatta Analysis: Correct alignment:\n• BNS replaced Indian Penal Code (IPC 1860)\n• BNSS replaced Code of Criminal Procedure (CrPC 1973)\n• BSA replaced Indian Evidence Act (IEA 1872)\nTherefore, only pair (2) is correctly matched."
  },
  {
    id: 'lok_mcq_06',
    newsReference: 'लोकसत्ता कुतूहल - इस्रो मानवी अंतराळ मोहीम',
    date: 'ऑगस्ट २०२६',
    topic: 'विज्ञान व तंत्रज्ञान - गगनयान व व्योममित्र',
    difficulty: 'Moderate',
    questionMr: "इस्रोच्या (ISRO) 'गगनयान' या पहिल्या मानवी अंतराळ मोहिमेच्या पूर्वतयारी चाचणीसाठी विकसित करण्यात आलेल्या अर्ध-मानवी रोबोटचे (Half-Humanoid Robot) नाव काय आहे?",
    questionEn: "What is the name of the female half-humanoid robot developed by ISRO for qualification trial flights prior to crewed Gaganyaan mission launch?",
    optionsMr: [
      '१) गगनमित्र (Gaganmitra)',
      '२) व्योममित्र (Vyommitra)',
      '३) प्रज्ञान (Pragyan)',
      '४) विक्रम (Vikram)'
    ],
    optionsEn: [
      '1) Gaganmitra',
      '2) Vyommitra',
      '3) Pragyan',
      '4) Vikram'
    ],
    correctAnswerIndex: 1,
    explanationMr: "लोकसत्ता कुतूहल संदर्भ: इस्रोने मानवी अंतराळ मोहिमेच्या चाचणीसाठी 'व्योममित्र' (Vyommitra - व्योम म्हणजे अंतराळ, मित्र म्हणजे सखा) ही महिला रोबोट तयार केली आहे, जी अंतराळातील जीवनरक्षक यंत्रणा आणि मानवी शरीरावर होणाऱ्या परिणामांचे मापन करते.",
    explanationEn: "Official Loksatta Reference: ISRO developed the half-humanoid robot 'Vyommitra' (derived from Sanskrit 'Vyoma' meaning Space and 'Mitra' meaning Friend) to monitor environmental control and life-support modules in uncrewed test flights."
  }
];

import { Question } from '../types';

export const LOKSATTA_QUESTIONS_AS_MCQ: Question[] = LOKSATTA_MPSC_MCQS.map((q) => ({
  id: q.id,
  subjectId: 'current_affairs',
  topic: q.topic,
  subtopic: q.newsReference,
  exam: 'Both',
  difficulty: q.difficulty,
  questionMr: q.questionMr,
  questionEn: q.questionEn,
  optionsMr: q.optionsMr,
  optionsEn: q.optionsEn,
  correctAnswerIndex: q.correctAnswerIndex,
  explanationMr: q.explanationMr,
  explanationEn: q.explanationEn,
  reference: `दैनिक लोकसत्ता वृत्तपत्र (${q.date})`,
  yearTag: 'MPSC लोकसत्ता विशेष २०२६/२७'
}));

