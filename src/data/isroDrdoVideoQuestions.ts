import { Question } from '../types';

export interface IsroDrdoMissionFact {
  id: string;
  category: 'ISRO' | 'DRDO';
  nameMr: string;
  nameEn: string;
  launchOrYear: string;
  keyFeatureMr: string;
  keyFeatureEn: string;
  mpscRelevanceMr: string;
}

export const ISRO_DRDO_MISSION_FACTS: IsroDrdoMissionFact[] = [
  {
    id: 'fact_c3',
    category: 'ISRO',
    nameMr: 'चांद्रयान-३ (Chandrayaan-3)',
    nameEn: 'Chandrayaan-3 Mission',
    launchOrYear: '१४ जुलै २०२३ (अवतरण: २३ ऑगस्ट २०२३)',
    keyFeatureMr: 'चंद्राच्या दक्षिण ध्रुवावर सुरक्षित सॉफ्ट लँडिंग करणारा भारत हा जगातील पहिला देश ठरला. लँडरचे नाव विक्रम, रोव्हरचे नाव प्रज्ञान. लँडिंग जागेचे नाव "शिव शक्ती पॉईंट".',
    keyFeatureEn: 'India became the 1st nation to soft-land near lunar south pole. Lander Vikram, Rover Pragyan. Touchdown site: Shiv Shakti Point. August 23 is National Space Day.',
    mpscRelevanceMr: 'राज्यसेवा व संयुक्त पूर्व परीक्षेत लँडर, रोव्हर आणि पेलोड्सवर (ChaSTE, ILSA, APXS, LIBS) हमखास प्रश्न.'
  },
  {
    id: 'fact_aditya',
    category: 'ISRO',
    nameMr: 'आदित्य-L1 (Aditya-L1)',
    nameEn: 'Aditya-L1 Solar Mission',
    launchOrYear: '२ सप्टेंबर २०२३',
    keyFeatureMr: 'भारताची पहिली अंतराळ सौर वेधशाळा. पृथ्वीपासून १५ लाख किमी अंतरावरील लॅग्रांज पॉईंट-१ (L1) भोवती हॅलो कक्षेत स्थापित. मुख्य पेलोड्स: VELC (IIA बंगळुरू) आणि SUIT (IUCAA पुणे).',
    keyFeatureEn: 'India\'s first dedicated solar observatory. Stationed in halo orbit around Lagrange Point 1 (1.5M km). Key payloads: VELC and SUIT (IUCAA Pune).',
    mpscRelevanceMr: 'सूर्यकोरोना, सौर वादळे आणि अंतराळ हवामान अभ्यास.'
  },
  {
    id: 'fact_gagan',
    category: 'ISRO',
    nameMr: 'गगनयान (Gaganyaan)',
    nameEn: 'Gaganyaan Human Spaceflight',
    launchOrYear: '२०२५-२०२६ (मानवरहित चाचणी सज्ज)',
    keyFeatureMr: 'भारताची पहिली मानवी अंतराळ मोहीम. ३ अंतराळवीरांना ४०० किमी लो अर्थ ऑर्बिटमध्ये (LEO) ३ दिवस नेऊन सुरक्षित परत आणण्याचे उद्दिष्ट. महिला रोबोट: "व्योममित्र".',
    keyFeatureEn: 'India\'s first crewed mission to 400 km LEO for 3 days. Launched by HLVM3. Humanoid robot: Vyommitra.',
    mpscRelevanceMr: 'अंतराळवीर: प्रशांत नायर, अजित कृष्णन, अंगद प्रताप, शुभांशू शुक्ला.'
  },
  {
    id: 'fact_bas',
    category: 'ISRO',
    nameMr: 'भारतीय अंतराळ स्थानक (BAS)',
    nameEn: 'Bharatiya Antariksha Station (BAS)',
    launchOrYear: '२०२८ (पहिले मॉड्युल) - २०३५ (पूर्ण)',
    keyFeatureMr: 'भारताचे स्वतःचे स्वदेशी अंतराळ स्थानक. २०२८ पर्यंत BAS-1 मॉड्युल, २०३५ पर्यंत पूर्ण स्थानक आणि २०४० पर्यंत चंद्रावर भारतीय अंतराळवीर उतरवण्याचे राष्ट्रीय उद्दिष्ट.',
    keyFeatureEn: 'Indigenous space station: BAS-1 by 2028, full station operational by 2035, Indian on Moon by 2040.',
    mpscRelevanceMr: 'पंतप्रधान कार्यालयाने (PMO) निश्चित केलेली भारताची अंतराळ उद्दिष्टे.'
  },
  {
    id: 'fact_xposat',
    category: 'ISRO',
    nameMr: 'एक्सपोसेट (XPoSat)',
    nameEn: 'X-ray Polarimeter Satellite',
    launchOrYear: '१ जानेवारी २०२४ (PSLV-C58)',
    keyFeatureMr: 'कृष्णविवरे आणि पल्सार्समधून उत्सर्जित होणाऱ्या क्ष-किरणांचे ध्रुवीकरण मोजणारा भारत हा जगातील दुसरा देश (अमेरिकेच्या NASA IXPE नंतर). मुख्य पेलोड: POLIX व XSPECT.',
    keyFeatureEn: '2nd country after USA to launch a dedicated polarimetry mission to study cosmic X-rays. Key payloads: POLIX and XSPECT.',
    mpscRelevanceMr: 'खगोलभौतिकी व उच्च ऊर्जा किरणोत्सर्ग अभ्यास.'
  },
  {
    id: 'fact_nisar',
    category: 'ISRO',
    nameMr: 'निसार (NISAR)',
    nameEn: 'NASA-ISRO Synthetic Aperture Radar',
    launchOrYear: '२०२५-२०२६',
    keyFeatureMr: 'नासा (NASA) आणि इस्रो (ISRO) यांची संयुक्त पृथ्वी निरीक्षण मोहीम. यात दुहेरी फ्रिक्वेन्सी रडार (L-band नासाद्वारे, S-band इस्रोद्वारे) बसवण्यात आले आहे.',
    keyFeatureEn: 'Joint NASA-ISRO Earth observation mission with dual-frequency synthetic aperture radar (L-band by NASA, S-band by ISRO).',
    mpscRelevanceMr: 'जैवविविधता, हिमनद्यांचे वितळणे आणि नैसर्गिक आपत्तींचे अचूक मॅपिंग.'
  },
  {
    id: 'fact_divyastra',
    category: 'DRDO',
    nameMr: 'मिशन दिव्यास्त्र (अग्नी-५ MIRV)',
    nameEn: 'Mission Divyastra (Agni-5 MIRV)',
    launchOrYear: '११ मार्च २०२४ (यशस्वी चाचणी)',
    keyFeatureMr: 'अग्नी-५ आंतरखंडीय बॅलिस्टिक क्षेपणास्त्राची (ICBM) एमआयआरव्ही (MIRV) तंत्रज्ञानासह यशस्वी चाचणी. एकाच क्षेपणास्त्रातून अनेक अण्वस्त्रे वेगवेगळ्या लक्ष्यांवर डागण्याची क्षमता (पल्ला: ५०००+ किमी).',
    keyFeatureEn: 'First flight test of indigenously developed Agni-5 missile with Multiple Independently Targetable Re-entry Vehicle (MIRV) technology (Range 5000+ km).',
    mpscRelevanceMr: 'भारत MIRV तंत्रज्ञान असलेल्या अमेरिका, रशिया, चीन, ब्रिटन व फ्रान्स या मोजक्या देशांच्या पंक्तीत दाखल.'
  },
  {
    id: 'fact_pralay',
    category: 'DRDO',
    nameMr: 'प्रलय क्षेपणास्त्र (Pralay Missile)',
    nameEn: 'Pralay Surface-to-Surface Missile',
    launchOrYear: 'सक्रिय चाचण्या २०२३-२०२६',
    keyFeatureMr: 'जमिनीवरून जमिनीवर मारा करणारे क्वासी-बॅलिस्टिक क्षेपणास्त्र. पल्ला: १५० ते ५०० किमी. घन इंधन प्रणोदन. हवेतच दिशा बदलून शत्रूच्या क्षेपणास्त्रविरोधी यंत्रणेला चकवण्यास सक्षम.',
    keyFeatureEn: 'Short-range quasi-ballistic surface-to-surface missile (150-500 km range) for conventional battlefield strikes, maneuverable in flight.',
    mpscRelevanceMr: 'चीन आणि पाकिस्तान सीमावर्ती भागातील सामरिक संरक्षणासाठी महत्त्वाचे.'
  },
  {
    id: 'fact_brahmos',
    category: 'DRDO',
    nameMr: 'ब्रह्मोस सुपरसॉनिक क्रूझ (BrahMos)',
    nameEn: 'BrahMos Supersonic Cruise Missile',
    launchOrYear: 'सक्रिय व विस्तारित पल्ला (ER)',
    keyFeatureMr: 'भारत (DRDO) आणि रशिया (NPOM) यांचा संयुक्त उपक्रम. ब्रह्मपुत्रा आणि मॉस्कव्हा नद्यांवरून नाव. जगातील सर्वात वेगवान क्रूझ क्षेपणास्त्र (मॅक २.८ ते ३.०). फिलीपिन्सला पहिली परदेशी निर्यात.',
    keyFeatureEn: 'World\'s fastest supersonic cruise missile (Mach 2.8-3.0) developed jointly by DRDO and Russia. Export deal inked with Philippines Navy.',
    mpscRelevanceMr: 'संरक्षण निर्यात आणि स्वदेशी तंत्रज्ञान.'
  },
  {
    id: 'fact_zorawar',
    category: 'DRDO',
    nameMr: 'जोरावर हलका रणगाडा (Zorawar Light Tank)',
    nameEn: 'Zorawar Indigenous Light Tank',
    launchOrYear: '२०२४-२०२६ चाचण्या',
    keyFeatureMr: 'पूर्व लडाखसारख्या अतिउंच पर्वतीय युद्धक्षेत्रासाठी DRDO आणि लार्सन अँड टुब्रो (L&T) यांनी विकसित केलेला २५ टनी हलका रणगाडा. नाव: डोग्रा सेनापती जोरावर सिंग.',
    keyFeatureEn: '25-tonne indigenous light tank developed by DRDO & L&T for high-altitude warfare in Eastern Ladakh.',
    mpscRelevanceMr: 'पर्वतीय युद्धातील आक्रमक क्षमता आणि मेक इन इंडिया.'
  }
];

export const ISRO_DRDO_VIDEO_QUESTIONS: Question[] = [
  {
    id: 'vid_isro_01',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'चांद्रयान-३ व राष्ट्रीय अंतराळ दिन',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: "चांद्रयान-३ मोहिमेबाबत खालील विधाने विचारात घ्या:\nअ) चांद्रयान-३ चे चंद्राच्या दक्षिण ध्रुवावर २३ ऑगस्ट २०२३ रोजी यशस्वी सॉफ्ट लँडिंग झाले.\nब) भारत सरकारने २३ ऑगस्ट हा दिवस 'राष्ट्रीय अंतराळ दिन' (National Space Day) म्हणून घोषित केला.\nक) चांद्रयान-३ चे लँडर ज्या जागेवर उतरले, त्या जागेचे नामकरण 'शिव शक्ती पॉईंट' (Shiv Shakti Point) असे करण्यात आले.\nड) ही मोहीम PSLV-C55 या प्रक्षेपक वाहनाने प्रक्षेपित करण्यात आली होती.\n\nवरीलपैकी कोणती विधाने बरोबर आहेत?",
    questionEn: "Consider the following statements regarding the Chandrayaan-3 mission:\na) Chandrayaan-3 achieved successful soft landing on the lunar south pole on 23 August 2023.\nb) The Government of India declared 23 August as 'National Space Day'.\nc) The touchdown site of the lander was named 'Shiv Shakti Point'.\nd) This mission was launched using the PSLV-C55 launch vehicle.\n\nWhich of the above statements are correct?",
    optionsMr: [
      '१) केवळ अ आणि ब',
      '२) केवळ अ, ब आणि क',
      '३) केवळ ब, क आणि ड',
      '४) सर्व विधाने अ, ब, क आणि ड बरोबर'
    ],
    optionsEn: [
      '1) Only a and b',
      '2) Only a, b and c',
      '3) Only b, c and d',
      '4) All statements a, b, c and d'
    ],
    correctAnswerIndex: 1,
    explanationMr: "स्पष्टीकरण: विधाने (अ), (ब) आणि (क) पूर्णपणे बरोबर आहेत.\n• विधान (ड) चुकीचे आहे: चांद्रयान-३ चे प्रक्षेपण १४ जुलै २०२३ रोजी 'LVM3-M4' (ज्याला बाहुबली किंवा Fat Boy म्हटले जाते) या प्रक्षेपकाद्वारे सतीश धवन अंतराळ केंद्र, श्रीहरिकोटा येथून करण्यात आले होते, PSLV द्वारे नाही.",
    explanationEn: "Explanation: Statements (a), (b), and (c) are correct.\n• Statement (d) is incorrect: Chandrayaan-3 was launched by ISRO's heaviest launch vehicle 'LVM3-M4' (nicknamed 'Baahubali' or 'Fat Boy') on 14 July 2023 from SDSC SHAR Sriharikota, not by PSLV.",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  },
  {
    id: 'vid_isro_02',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'चांद्रयान-३ चे वैज्ञानिक पेलोड्स',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: "चांद्रयान-३ मधील वैज्ञानिक पेलोड्स आणि त्यांच्या मुख्य संशोधन कार्यांच्या योग्य जोड्या जुळवा:\nस्तंभ 'अ' (पेलोड)\n१) ChaSTE\n२) ILSA\n३) APXS व LIBS\n४) SHAPE\n\nस्तंभ 'ब' (कार्य)\nI) चंद्राच्या पृष्ठभागावरील भूकंपीय हालचालींचे (Seismicity) मापन\nII) चंद्राच्या मातीचे तापमान व उष्णता वाहकता मोजणे\nIII) चंद्राच्या कक्षेतून पृथ्वीच्या वर्णपटाचा अभ्यास (स्पेक्ट्रो-पोलॅरिमीट्री)\nIV) चंद्राच्या मातीतील मूलद्रव्यांचे (मॅग्नेशियम, ॲल्युमिनियम, लोह) रासायनिक विश्लेषण\n\nयोग्य पर्याय निवडा:",
    questionEn: "Match the scientific payloads of Chandrayaan-3 with their research objectives:\nColumn 'A' (Payload)\n1) ChaSTE\n2) ILSA\n3) APXS & LIBS\n4) SHAPE\n\nColumn 'B' (Objective)\nI) Measurement of lunar seismic activity\nII) Thermal properties & temperature profile of lunar topsoil\nIII) Spectro-polarimetry of habitable planet Earth from lunar orbit\nIV) Elemental chemical analysis of lunar soil (Mg, Al, Fe, Ti)",
    optionsMr: [
      '१) १-II, २-I, ३-IV, ४-III',
      '२) १-I, २-II, ३-III, ४-IV',
      '३) १-IV, २-III, ३-II, ४-I',
      '४) १-II, २-IV, ३-I, ४-III'
    ],
    optionsEn: [
      '1) 1-II, 2-I, 3-IV, 4-III',
      '2) 1-I, 2-II, 3-III, 4-IV',
      '3) 1-IV, 2-III, 3-II, 4-I',
      '4) 1-II, 2-IV, 3-I, 4-III'
    ],
    correctAnswerIndex: 0,
    explanationMr: "स्पष्टीकरण: योग्य जोड्या:\n• ChaSTE (Chandra's Surface Thermophysical Experiment) = मातीचे तापमान व औष्णिक गुणधर्म मोजणे (II)\n• ILSA (Instrument for Lunar Seismic Activity) = चंद्रावरील भूकंपांचे मापन (I)\n• APXS व LIBS (Alpha Particle X-ray Spectrometer & Laser Induced Breakdown Spectroscopy) = प्रज्ञान रोव्हरवरील मूलद्रव्य रासायनिक विश्लेषण (IV)\n• SHAPE = प्रोपल्शन मॉड्युलवरील पृथ्वीचा स्पेक्ट्रो-पोलॅरिमीट्री अभ्यास (III)\nम्हणून पर्याय (१) बरोबर आहे.",
    explanationEn: "Explanation: Correct pairing:\n• ChaSTE = Thermal properties of lunar soil (II)\n• ILSA = Lunar seismicity monitoring (I)\n• APXS & LIBS = Elemental analysis on Pragyan Rover (IV)\n• SHAPE = Earth observation from lunar orbit (III)\nHence option (1) is correct.",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  },
  {
    id: 'vid_isro_03',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'आदित्य-L1 सौर वेधशाळा',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: "भारताच्या पहिल्या सौर मोहिमेबाबत, म्हणजेच 'आदित्य-L1' (Aditya-L1) बाबत खालीलपैकी कोणते विधान असत्य आहे?",
    questionEn: "Which of the following statements is INCORRECT regarding India's first solar observatory mission 'Aditya-L1'?",
    optionsMr: [
      '१) हे यान २ सप्टेंबर २०२३ रोजी PSLV-C57 प्रक्षेपकाद्वारे प्रक्षेपित करण्यात आले.',
      '२) हे यान पृथ्वी आणि सूर्य यांच्यातील लॅग्रांज पॉईंट-१ (L1) भोवती हॅलो कक्षेत (Halo Orbit) स्थापित करण्यात आले आहे.',
      '३) लॅग्रांज पॉईंट-१ (L1) हे पृथ्वीपासून सुमारे १५ कोटी किलोमीटर अंतरावर आहे.',
      '४) या मोहिमेतील SUIT (Solar Ultraviolet Imaging Telescope) हा महत्त्वाचा पेलोड IUCAA पुणे येथे विकसित करण्यात आला.'
    ],
    optionsEn: [
      '1) It was launched on 2 September 2023 via PSLV-C57 launch vehicle.',
      '2) It is stationed in a halo orbit around the Sun-Earth Lagrange Point 1 (L1).',
      '3) Lagrange Point 1 (L1) is approximately 150 million kilometers away from Earth.',
      '4) The SUIT payload was developed by IUCAA Pune.'
    ],
    correctAnswerIndex: 2,
    explanationMr: "स्पष्टीकरण: विधान (३) असत्य आहे.\n• लॅग्रांज पॉईंट-१ (L1) हे पृथ्वीपासून सुमारे १५ लाख किलोमीटर (1.5 Million Kilometers) अंतरावर आहे, १५ कोटी किमी नाही (सूर्य पृथ्वीपासून १५ कोटी किमी अंतरावर आहे; L1 हे सूर्य-पृथ्वी अंतराच्या केवळ १% अंतरावर आहे).\n• इतर सर्व विधाने सत्य आहेत. SUIT पेलोड IUCAA पुणेने तर VELC पेलोड IIA बंगळुरूने विकसित केला आहे.",
    explanationEn: "Explanation: Statement (3) is INCORRECT.\n• Lagrange Point 1 (L1) is located about 1.5 million kilometers (15 lakh km) from Earth (approx. 1% of Sun-Earth distance), not 150 million km.\n• Statements 1, 2, and 4 are completely accurate.",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  },
  {
    id: 'vid_isro_04',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'गगनयान मोहीम व अंतराळवीर',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: "इस्रोच्या 'गगनयान' (Gaganyaan) मानवी अंतराळ मोहिमेसाठी निवडण्यात आलेल्या भारतीय हवाई दलाच्या ४ अंतराळवीरांमध्ये (Astronaut-Designates) खालीलपैकी कोणाचा समावेश नाही?",
    questionEn: "Who among the following is NOT one of the four Indian Air Force astronaut-designates selected for ISRO's Gaganyaan human spaceflight mission?",
    optionsMr: [
      '१) ग्रुप कॅप्टन प्रशांत बालकृष्णन नायर (Prashanth B. Nair)',
      '२) ग्रुप कॅप्टन अजित कृष्णन (Ajit Krishnan)',
      '३) विंग कमांडर शुभांशू शुक्ला (Shubhanshu Shukla)',
      '४) ग्रुप कॅप्टन राकेश शर्मा (Rakesh Sharma)'
    ],
    optionsEn: [
      '1) Group Captain Prashanth Balakrishnan Nair',
      '2) Group Captain Ajit Krishnan',
      '3) Wing Commander Shubhanshu Shukla',
      '4) Group Captain Rakesh Sharma'
    ],
    correctAnswerIndex: 3,
    explanationMr: "स्पष्टीकरण: पर्याय (४) बरोबर आहे.\n• राकेश शर्मा हे १९८४ मध्ये सोव्हिएत युनियनच्या सोयुझ टी-११ मोहिमेद्वारे अंतराळात जाणारे भारताचे पहिले नागरिक होते.\n• गगनयान मोहिमेसाठी निवडलेले ४ अंतराळवीर आहेत:\n१) ग्रुप कॅप्टन प्रशांत बालकृष्णन नायर\n२) ग्रुप कॅप्टन अजित कृष्णन\n३) ग्रुप कॅप्टन अंगद प्रताप\n४) विंग कमांडर शुभांशू शुक्ला (ज्यांची भारत-अमेरिका संयुक्त Axiom-4 ISS मोहिमेसाठीही निवड झाली आहे).",
    explanationEn: "Explanation: Rakesh Sharma was India's first astronaut who flew aboard Soviet Soyuz T-11 in 1984.\n• The 4 selected Gaganyaan astronauts are: Prashanth Balakrishnan Nair, Ajit Krishnan, Angad Prathap, and Shubhanshu Shukla.",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  },
  {
    id: 'vid_isro_05',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'भारतीय अंतराळ स्थानक (BAS) व भविष्यातील उद्दिष्टे',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: "भारत सरकारने इस्रोसाठी निश्चित केलेल्या दीर्घकालीन अंतराळ उद्दिष्टांनुसार, भारताचे स्वतःचे 'भारतीय अंतराळ स्थानक' (Bharatiya Antariksha Station - BAS) पूर्णपणे कार्यरत करण्याचे लक्ष्य कोणत्या वर्षापर्यंत ठेवण्यात आले आहे?",
    questionEn: "According to the long-term roadmap set by the Government of India for ISRO, by which year is the 'Bharatiya Antariksha Station' (BAS) targeted to become fully operational?",
    optionsMr: [
      '१) २०२८',
      '२) २०३०',
      '३) २०३५',
      '४) २०४०'
    ],
    optionsEn: [
      '1) 2028',
      '2) 2030',
      '3) 2035',
      '4) 2040'
    ],
    correctAnswerIndex: 2,
    explanationMr: "स्पष्टीकरण: इस्रोच्या अधिकृत रोडमॅपप्रमाणे:\n• २०२८ पर्यंत: भारतीय अंतराळ स्थानकाचे पहिले मॉड्युल (BAS-1) प्रक्षेपित केले जाईल.\n• २०३५ पर्यंत: संपूर्ण भारतीय अंतराळ स्थानक (BAS) अंतराळात पूर्ण क्षमतेने कार्यरत केले जाईल.\n• २०४० पर्यंत: चंद्रावर भारतीय अंतराळवीर उतरवणे (Indian on the Moon) हे अंतिम उद्दिष्ट आहे.",
    explanationEn: "Explanation: According to ISRO's approved space roadmap:\n• By 2028: Launch of the first module (BAS-1)\n• By 2035: Full operationalization of Bharatiya Antariksha Station\n• By 2040: Landing an Indian astronaut on the Moon.",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  },
  {
    id: 'vid_isro_06',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'एक्सपोसेट (XPoSat) मोहीम',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: "१ जानेवारी २०२४ रोजी प्रक्षेपित करण्यात आलेल्या 'XPoSat' (X-ray Polarimeter Satellite) मोहिमेबाबत खालील विधाने पहा:\nअ) हे यान PSLV-C58 द्वारे पृथ्वीच्या ६५० किमी वर्तुळाकार कक्षेत प्रक्षेपित करण्यात आले.\nब) खगोलीय क्ष-किरणांचे ध्रुवीकरण (Polarization) मोजणारी समर्पित वेधशाळा पाठवणारा भारत हा जगातील केवळ दुसरा देश ठरला.\nक) यामध्ये POLIX आणि XSPECT हे दोन प्रमुख वैज्ञानिक पेलोड्स आहेत.\n\nवरीलपैकी कोणती विधाने बरोबर आहेत?",
    questionEn: "Consider the following statements regarding the XPoSat (X-ray Polarimeter Satellite) mission launched on 1 January 2024:\na) It was launched by PSLV-C58 into a 650 km low Earth circular orbit.\nb) India became only the second country in the world to launch a dedicated polarimetry mission to study cosmic X-rays.\nc) The satellite carries two key instruments: POLIX and XSPECT.\n\nWhich of the above statements are correct?",
    optionsMr: [
      '१) केवळ अ आणि ब',
      '२) केवळ ब आणि क',
      '३) केवळ अ आणि क',
      '४) वरील सर्व विधाने अ, ब आणि क बरोबर'
    ],
    optionsEn: [
      '1) Only a and b',
      '2) Only b and c',
      '3) Only a and c',
      '4) All statements a, b, and c are correct'
    ],
    correctAnswerIndex: 3,
    explanationMr: "स्पष्टीकरण: सर्व विधाने सत्य आहेत.\n• अमेरिकेच्या नासाने २०२१ मध्ये 'IXPE' ही पहिली क्ष-किरण ध्रुवीकरण मोहीम पाठवली होती. त्यानंतर अशी समर्पित वेधशाळा पाठवणारा भारत हा जगातील दुसराच देश बनला आहे.\n• POLIX (Polarimeter Instrument in X-rays) हे रमण संशोधन संस्था (RRI बंगळुरू) ने तर XSPECT हे इस्रोच्या URSC ने बनवले आहे.",
    explanationEn: "Explanation: All statements are correct.\n• NASA launched IXPE in 2021; India's XPoSat makes India the 2nd nation globally to send a dedicated X-ray polarimetry space observatory.\n• Payloads: POLIX (built by Raman Research Institute) and XSPECT (built by UR Rao Satellite Centre).",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  },
  {
    id: 'vid_isro_07',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'निसार (NISAR) मोहीम',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: "नासा आणि इस्रो यांची बहुचर्चित 'निसार' (NISAR) मोहीम कशाशी संबंधित आहे?",
    questionEn: "What is the primary focus of the joint NASA-ISRO mission 'NISAR'?",
    optionsMr: [
      '१) मंगळाच्या भूपृष्ठाखालील पाण्याचा शोध घेणे',
      '२) पृथ्वी निरीक्षण आणि ड्युअल फ्रिक्वेन्सी सिंथेटिक ॲपर्चर रडारद्वारे नैसर्गिक बदलांचे मापन',
      '३) खोल अंतराळातील लघुग्रहांचा वेध घेणे',
      '४) चंद्राच्या दक्षिण ध्रुवावर मानवी वस्ती उभारणे'
    ],
    optionsEn: [
      '1) Exploration of subsurface water on Mars',
      '2) Earth observation and measurement of ecological changes using dual-frequency Synthetic Aperture Radar',
      '3) Tracking deep space asteroids',
      '4) Establishing human base on lunar south pole'
    ],
    correctAnswerIndex: 1,
    explanationMr: "स्पष्टीकरण: NISAR (NASA-ISRO Synthetic Aperture Radar) ही पृथ्वी निरीक्षण (Earth Observation) मोहीम आहे. यामध्ये पहिल्यांदाच L-band (नासाद्वारे विकसित) आणि S-band (इस्रोद्वारे विकसित) या दुहेरी रडार फ्रिक्वेन्सीचा वापर करून दर १२ दिवसांनी संपूर्ण पृथ्वीच्या जमिनीचे, हिमनद्यांचे आणि जंगलांचे नकाशांकन केले जाईल.",
    explanationEn: "Explanation: NISAR is a state-of-the-art Earth Observation satellite featuring dual-frequency Synthetic Aperture Radar (L-band by NASA and S-band by ISRO) capable of mapping global land and ice ecosystems every 12 days.",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  },
  {
    id: 'vid_isro_08',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'इस्रो प्रक्षेपक वाहने (Launch Vehicles)',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: "इस्रोच्या 'PSLV' (Polar Satellite Launch Vehicle) प्रक्षेपकाबाबत योग्य विधान निवडा:",
    questionEn: "Select the correct statement regarding ISRO's Polar Satellite Launch Vehicle (PSLV):",
    optionsMr: [
      '१) PSLV हे ३ टप्प्यांचे केवळ घन इंधनावर चालणारे रॉकेट आहे.',
      '२) PSLV हे ४ टप्प्यांचे रॉकेट असून त्याचे टप्पे अनुक्रमे घन-द्रव-घन-द्रव (Solid-Liquid-Solid-Liquid) असे आहेत.',
      '३) PSLV चे सर्व टप्पे क्रायोजेनिक इंधनाचा वापर करतात.',
      '४) PSLV हे केवळ भूस्थिर उपग्रह (GEO) सोडण्यासाठी वापरले जाते.'
    ],
    optionsEn: [
      '1) PSLV is a 3-stage all-solid propellant rocket.',
      '2) PSLV is a 4-stage launch vehicle with alternating Solid-Liquid-Solid-Liquid propellant stages.',
      '3) All stages of PSLV utilize cryogenic propellants.',
      '4) PSLV is exclusively used for Geosynchronous satellites.'
    ],
    correctAnswerIndex: 1,
    explanationMr: "स्पष्टीकरण: PSLV हे इस्रोचे 'Workhorse' मानले जाणारे ४ टप्प्यांचे प्रक्षेपक वाहन आहे:\n• पहिला टप्पा: घन इंधन (HTPB)\n• दुसरा टप्पा: द्रव इंधन (विकास इंजिन - UDMH/N2O4)\n• तिसरा टप्पा: घन इंधन\n• चौथा टप्पा: द्रव इंधन (MMH/MON-3)\nम्हणून पर्याय (२) अगदी अचूक आहे.",
    explanationEn: "Explanation: PSLV is a four-stage launch vehicle with alternating solid and liquid propulsion stages: 1st stage Solid, 2nd stage Liquid (Vikas Engine), 3rd stage Solid, 4th stage Liquid. Hence option (2) is correct.",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  },
  {
    id: 'vid_isro_09',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'डीआरडीओ - मिशन दिव्यास्त्र (Agni-5 MIRV)',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: "मार्च २०२४ मध्ये DRDO ने यशस्वी चाचणी घेतलेल्या 'मिशन दिव्यास्त्र' (Mission Divyastra) बाबत काय खरे आहे?",
    questionEn: "What is TRUE regarding 'Mission Divyastra' successfully flight-tested by DRDO in March 2024?",
    optionsMr: [
      '१) ही भारताची पहिली पाणबुडीविरोधी टॉर्पेडो चाचणी होती.',
      '२) हे अग्नी-५ क्षेपणास्त्राचे MIRV (Multiple Independently Targetable Re-entry Vehicle) तंत्रज्ञानासह पहिले उड्डाण होते.',
      '३) ही भारताची पहिली हायपरसॉनिक मानवरहित ग्लायडर चाचणी होती.',
      '४) हे आकाश-एनजी क्षेपणास्त्राचे ५०० किमी पल्ल्याचे उड्डाण होते.'
    ],
    optionsEn: [
      '1) It was India\'s first anti-submarine torpedo trial.',
      '2) It was the maiden flight test of Agni-5 missile equipped with MIRV technology.',
      '3) It was India\'s first hypersonic unmanned glider test.',
      '4) It was a 500 km range test of Akash-NG missile.'
    ],
    correctAnswerIndex: 1,
    explanationMr: "स्पष्टीकरण: ११ मार्च २०२४ रोजी DRDO ने ओदिशाच्या डॉ. एपीजे अब्दुल कलाम बेटावरून 'मिशन दिव्यास्त्र' अंतर्गत अग्नी-५ क्षेपणास्त्राची 'MIRV' तंत्रज्ञानासह पहिली यशस्वी उड्डाण चाचणी घेतली.\n• MIRV तंत्रज्ञानामुळे एकाच अग्नी-५ क्षेपणास्त्रात अनेक अण्वस्त्रे (Warheads) बसवता येतात आणि ते वेगवेगळ्या शेकडो किलोमीटर अंतरावरील शत्रूच्या लक्ष्यांवर एकाच वेळी मारा करू शकतात.",
    explanationEn: "Explanation: On 11 March 2024, DRDO carried out the maiden flight test of indigenous Agni-5 missile equipped with Multiple Independently Targetable Re-entry Vehicle (MIRV) technology under 'Mission Divyastra'.",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  },
  {
    id: 'vid_isro_10',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'IGMDP कार्यक्रम व क्षेपणास्त्रे',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: "डॉ. ए.पी.जे. अब्दुल कलाम यांच्या नेतृत्वाखाली १९८३ मध्ये सुरू करण्यात आलेल्या 'IGMDP' (Integrated Guided Missile Development Programme) अंतर्गत खालीलपैकी कोणत्या ५ क्षेपणास्त्रांचा विकास करण्यात आला होता?",
    questionEn: "Under the Integrated Guided Missile Development Programme (IGMDP) initiated in 1983 under Dr. A.P.J. Abdul Kalam, which 5 missiles were developed?",
    optionsMr: [
      '१) पृथ्वी, अग्नी, त्रिशूल, नाग आणि आकाश',
      '२) पृथ्वी, ब्राह्मोस, अस्त्र, प्रलय आणि निर्भय',
      '३) अग्नी, धनुष, पिनाका, शौर्य आणि प्रहार',
      '४) नाग, हेलिना, अमोग, स्पाइक आणि मिलान'
    ],
    optionsEn: [
      '1) Prithvi, Agni, Trishul, Nag, and Akash',
      '2) Prithvi, BrahMos, Astra, Pralay, and Nirbhay',
      '3) Agni, Dhanush, Pinaka, Shaurya, and Prahaar',
      '4) Nag, Helina, Amogha, Spike, and Milan'
    ],
    correctAnswerIndex: 0,
    explanationMr: "स्पष्टीकरण: IGMDP अंतर्गत ५ क्षेपणास्त्रांची निर्मिती झाली ज्यांचे संक्षिप्त रूप 'PATNA' असे आहे:\n• P = Prithvi (जमिनीवरून जमिनीवर मारा)\n• A = Agni (बॅलिस्टिक क्षेपणास्त्र)\n• T = Trishul (जमिनीवरून हवेत कमी पल्ला)\n• N = Nag (तिसऱ्या पिढीचे रणगाडाविरोधी 'फायर अँड फरगेट' क्षेपणास्त्र)\n• A = Akash (जमिनीवरून हवेत मध्यम पल्ला)\nम्हणून पर्याय (१) बरोबर आहे.",
    explanationEn: "Explanation: The five missiles developed under IGMDP are famously remembered using the acronym 'PATNA': Prithvi, Agni, Trishul, Nag, and Akash.",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  },
  {
    id: 'vid_isro_11',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'प्रलय (Pralay) क्षेपणास्त्र',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: "DRDO ने विकसित केलेल्या 'प्रलय' (Pralay) क्षेपणास्त्राबाबत खालील विधाने विचारात घ्या:\nअ) हे जमिनीवरून जमिनीवर मारा करणारे क्वासी-बॅलिस्टिक (Quasi-ballistic) क्षेपणास्त्र आहे.\nब) याचा पल्ला १५० ते ५०० किलोमीटर दरम्यान आहे.\nक) हे घन इंधन प्रणोदनावर (Solid propellant) चालते आणि हवेतच आपली दिशा बदलण्यास सक्षम आहे.\n\nवरीलपैकी कोणती विधाने बरोबर आहेत?",
    questionEn: "Consider the following statements regarding the 'Pralay' missile developed by DRDO:\na) It is a surface-to-surface quasi-ballistic missile.\nb) Its strike range is between 150 to 500 kilometers.\nc) It is propelled by a solid-fuel rocket motor and capable of maneuvering in flight.\n\nWhich of the above statements are correct?",
    optionsMr: [
      '१) केवळ अ आणि ब',
      '२) केवळ ब आणि क',
      '३) केवळ अ आणि क',
      '४) सर्व विधाने अ, ब आणि क बरोबर'
    ],
    optionsEn: [
      '1) Only a and b',
      '2) Only b and c',
      '3) Only a and c',
      '4) All statements a, b, and c are correct'
    ],
    correctAnswerIndex: 3,
    explanationMr: "स्पष्टीकरण: सर्व विधाने सत्य आहेत.\n• प्रलय क्षेपणास्त्र हे चीनच्या डाँगफेंग-१२ (Dongfeng-12) आणि रशियाच्या इस्कंदर (Iskander) क्षेपणास्त्रांच्या तोडीस तोड असणारे भारताचे स्वदेशी पारंपरिक क्वासी-बॅलिस्टिक क्षेपणास्त्र आहे. हे हवेत दिशा बदलू शकत असल्याने शत्रूच्या इंटरसेप्टर क्षेपणास्त्रांना चकवते.",
    explanationEn: "Explanation: All statements are correct. Pralay is India's indigenous solid-fuel quasi-ballistic missile (range 150-500 km) developed to perform battlefield tactical strikes with high maneuverability.",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  },
  {
    id: 'vid_isro_12',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'ब्रह्मोस (BrahMos) सुपरसॉनिक क्रूझ',
    exam: 'Both',
    difficulty: 'Easy',
    questionMr: "जगातील सर्वात वेगवान सुपरसॉनिक क्रूझ क्षेपणास्त्र मानल्या जाणाऱ्या 'ब्रह्मोस' (BrahMos) चे नाव कोणत्या दोन नद्यांच्या नावावरून ठेवण्यात आले आहे?",
    questionEn: "The world's fastest supersonic cruise missile 'BrahMos' is named after which two rivers?",
    optionsMr: [
      '१) गंगा आणि व्होल्गा',
      '२) ब्रह्मपुत्रा आणि मॉस्कव्हा (Moskva)',
      '३) सिंधू आणि डॉन',
      '४) नर्मदा आणि येनिसेई'
    ],
    optionsEn: [
      '1) Ganga and Volga',
      '2) Brahmaputra and Moskva',
      '3) Indus and Don',
      '4) Narmada and Yenisey'
    ],
    correctAnswerIndex: 1,
    explanationMr: "स्पष्टीकरण: ब्रह्मोस हे भारत (DRDO) आणि रशिया (NPO Mashinostroyeniya) यांच्या ५०.५:४९.५ संयुक्त उपक्रमातून विकसित झालेले क्षेपणास्त्र आहे. भारताची 'ब्रह्मपुत्रा' (Brahmaputra) आणि रशियाची 'मॉस्कव्हा' (Moskva) या दोन नद्यांच्या नावावरून याचे नाव 'BrahMos' ठेवण्यात आले. याचा वेग सुमारे २.८ ते ३.० मॅक आहे.",
    explanationEn: "Explanation: BrahMos is a joint venture between India's DRDO and Russia's NPOM. The name is formed by combining the Brahmaputra River of India and the Moskva River of Russia.",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  },
  {
    id: 'vid_isro_13',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'जोरावर हलका रणगाडा (Zorawar)',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: "लडाखसारख्या अतिउंच पर्वतीय सीमाभागात तैनात करण्यासाठी DRDO ने खाजगी भागीदार L&T सोबत विकसित केलेल्या २५ टनी स्वदेशी हलक्या रणगाड्याचे नाव काय आहे?",
    questionEn: "What is the name of the 25-tonne indigenous light tank developed jointly by DRDO and L&T for deployment in high-altitude mountain warfare like Eastern Ladakh?",
    optionsMr: [
      '१) अर्जुन (Arjun Mk-1A)',
      '२) भीष्म (T-90 Bhishma)',
      '३) जोरावर (Zorawar)',
      '४) वज्र (K-9 Vajra)'
    ],
    optionsEn: [
      '1) Arjun Mk-1A',
      '2) T-90 Bhishma',
      '3) Zorawar',
      '4) K-9 Vajra'
    ],
    correctAnswerIndex: 2,
    explanationMr: "स्पष्टीकरण: DRDO आणि लार्सन अँड टुब्रो (L&T) यांनी विकसित केलेल्या स्वदेशी हलक्या रणगाड्याचे नाव 'जोरावर' (Zorawar) आहे. हे नाव १९ व्या शतकातील प्रसिद्ध डोग्रा सेनापती जोरावर सिंग यांच्या सन्मानार्थ ठेवण्यात आले आहे, ज्यांनी लडाख आणि तिबेट मोहिमांचे नेतृत्व केले होते.",
    explanationEn: "Explanation: 'Zorawar' is the 25-tonne light tank designed by DRDO in collaboration with L&T, named in honor of the legendary 19th-century military general Zorawar Singh Kahluria.",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  },
  {
    id: 'vid_isro_14',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'स्मार्ट (SMART) प्रणाली',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: "DRDO द्वारे विकसित करण्यात आलेल्या 'SMART' प्रणालीचे पूर्ण रूप (Full Form) काय आहे?",
    questionEn: "What is the full form of the 'SMART' defence system developed by DRDO for anti-submarine warfare?",
    optionsMr: [
      '१) Supersonic Missile Assisted Release of Torpedo',
      '२) Surface Missile Air Rocket Technology',
      '३) Submarine Marine Acoustic Radar Tracker',
      '४) Satellite Monitored Anti-Radiation Tank'
    ],
    optionsEn: [
      '1) Supersonic Missile Assisted Release of Torpedo',
      '2) Surface Missile Air Rocket Technology',
      '3) Submarine Marine Acoustic Radar Tracker',
      '4) Satellite Monitored Anti-Radiation Tank'
    ],
    correctAnswerIndex: 0,
    explanationMr: "स्पष्टीकरण: SMART चा अर्थ 'Supersonic Missile Assisted Release of Torpedo' असा आहे. ही एक क्षेपणास्त्र-आधारित हलकी टॉर्पेडो वितरण प्रणाली आहे, जी पारंपारिक टॉर्पेडोच्या पल्ल्यापेक्षा कित्येक पटीने जास्त अंतरावर (६४० किमीपर्यंत) शत्रूच्या पाणबुड्या नष्ट करण्यास भारतीय नौदलाला सक्षम करते.",
    explanationEn: "Explanation: SMART stands for 'Supersonic Missile Assisted Release of Torpedo'. It launches a lightweight torpedo over supersonic missile ranges to strike enemy submarines hundreds of kilometers away.",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  },
  {
    id: 'vid_isro_15',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'अस्त्र (Astra) हवेतून हवेत मारा करणारे क्षेपणास्त्र',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: "भारतीय हवाई दलाच्या सुखोई-३० MKI आणि तेजस लढाऊ विमानांवर बसवण्यात आलेले 'अस्त्र' (Astra) हे कोणत्या प्रकारचे क्षेपणास्त्र आहे?",
    questionEn: "What type of missile is 'Astra', integrated onto Indian Air Force's Su-30 MKI and Tejas fighter jets?",
    optionsMr: [
      '१) जमिनीवरून जमिनीवर मारा करणारे क्रूझ क्षेपणास्त्र',
      '२) बियॉन्ड व्हिज्युअल रेंज (BVRAAM) हवेतून हवेत मारा करणारे क्षेपणास्त्र',
      '३) जमिनीवरून हवेत मारा करणारे अँटी-बॅलिस्टिक क्षेपणास्त्र',
      '४) पाणबुडीवरून डागले जाणारे आंतरखंडीय क्षेपणास्त्र'
    ],
    optionsEn: [
      '1) Surface-to-surface cruise missile',
      '2) Beyond Visual Range Air-to-Air Missile (BVRAAM)',
      '3) Surface-to-air anti-ballistic missile',
      '4) Submarine-launched intercontinental missile'
    ],
    correctAnswerIndex: 1,
    explanationMr: "स्पष्टीकरण: 'अस्त्र' (Astra) हे DRDO ने स्वदेशी विकसित केलेले सर्व-हवामान 'Beyond Visual Range Air-to-Air Missile' (BVRAAM) आहे. Astra Mk-1 चा पल्ला ११० किमी तर Astra Mk-2 चा पल्ला १६० किमीपेक्षा जास्त आहे.",
    explanationEn: "Explanation: Astra is an all-weather Beyond Visual Range Air-to-Air Missile (BVRAAM) indigenously developed by DRDO to engage and destroy enemy aircraft with ranges exceeding 110-160 km.",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  },
  {
    id: 'vid_isro_16',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'इस्रो व डीआरडीओ स्थापना व मुख्यालये',
    exam: 'Both',
    difficulty: 'Easy',
    questionMr: "इस्रो (ISRO) आणि डीआरडीओ (DRDO) यांच्या स्थापना वर्षांच्या योग्य जोड्या कोणत्या?",
    questionEn: "What are the correct establishment years of ISRO and DRDO respectively?",
    optionsMr: [
      '१) DRDO: १९५८ आणि ISRO: १९६९',
      '२) DRDO: १९६९ आणि ISRO: १९५८',
      '३) DRDO: १९७५ आणि ISRO: १९६२',
      '४) DRDO: १९५० आणि ISRO: १९७२'
    ],
    optionsEn: [
      '1) DRDO: 1958 and ISRO: 1969',
      '2) DRDO: 1969 and ISRO: 1958',
      '3) DRDO: 1975 and ISRO: 1962',
      '4) DRDO: 1950 and ISRO: 1972'
    ],
    correctAnswerIndex: 0,
    explanationMr: "स्पष्टीकरण: योग्य माहिती:\n• DRDO ची स्थापना १९५८ मध्ये संरक्षण मंत्रालयांतर्गत झाली (ब्रीदवाक्य: 'बलस्य मूलं विज्ञानम्').\n• ISRO ची स्थापना १५ ऑगस्ट १९६९ रोजी डॉ. विक्रम साराभाई यांच्या पुढाकाराने झाली (मुख्यालय: बंगळुरू).",
    explanationEn: "Explanation: DRDO was founded in 1958 under the Ministry of Defence. ISRO was established on 15 August 1969 with its headquarters in Bengaluru.",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  },
  {
    id: 'vid_isro_17',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'इस्रोचे दुसरे अंतराळ प्रक्षेपण केंद्र',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: "लघु उपग्रह प्रक्षेपक वाहनांसाठी (SSLV) इस्रोद्वारे दुसरे व्यावसायिक अंतराळ केंद्र (Second Spaceport) कोणत्या ठिकाणी उभारले जात आहे?",
    questionEn: "At which location is ISRO constructing its second commercial spaceport primarily dedicated to Small Satellite Launch Vehicles (SSLV)?",
    optionsMr: [
      '१) थुम्बा (तिरुवनंतपुरम, केरळ)',
      '२) कुलशेखरपट्टिनम (तूतुकुडी जिल्हा, तमिळनाडू)',
      '३) चांदीपूर (बालासोर, ओदिशा)',
      '४) व्हीलर बेट (ओदिशा)'
    ],
    optionsEn: [
      '1) Thumba (Thiruvananthapuram, Kerala)',
      '2) Kulasekharapatnam (Thoothukudi district, Tamil Nadu)',
      '3) Chandipur (Balasore, Odisha)',
      '4) Wheeler Island (Odisha)'
    ],
    correctAnswerIndex: 1,
    explanationMr: "स्पष्टीकरण: इस्रोचे दुसरे स्पेसपोर्ट तमिळनाडूतील तूतुकुडी जिल्ह्यातील 'कुलशेखरपट्टिनम' (Kulasekharapatnam) येथे उभारले जात आहे. या ठिकाणाहून प्रक्षेपित होणारे रॉकेट थेट दक्षिणेकडे (ध्रुवीय कक्षेत) झेपावू शकतात, ज्यामुळे श्रीहरिकोटासारखा श्रीलंकेभोवती वळसा (Dogleg maneuver) घालावा लागत नाही आणि इंधनाची मोठी बचत होते.",
    explanationEn: "Explanation: ISRO's second spaceport is being established at Kulasekharapatnam in Thoothukudi district, Tamil Nadu. It offers direct southward launch trajectory without needing a dogleg maneuver around Sri Lanka.",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  },
  {
    id: 'vid_isro_18',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'इन-स्पेस (IN-SPACe) व न्यूस्पेस इंडिया (NSIL)',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: "भारताच्या अंतराळ क्षेत्रातील सुधारणांनुसार खालील विधाने विचारात घ्या:\nअ) NSIL (NewSpace India Limited) ही २०१९ मध्ये स्थापन झालेली इस्रोची व्यावसायिक शाखा आहे.\nब) IN-SPACe (Indian National Space Promotion and Authorization Center) ही खाजगी कंपन्यांना अंतराळ उपक्रम राबवण्यासाठी परवानगी देणारी स्वायत्त सिंगल-विंडो नोडल संस्था आहे.\nक) IN-SPACe चे मुख्यालय अहमदाबाद, गुजरात येथे आहे.\n\nवरीलपैकी कोणती विधाने बरोबर आहेत?",
    questionEn: "Consider the following statements regarding space sector reforms in India:\na) NSIL (NewSpace India Limited) is ISRO's commercial arm established in 2019.\nb) IN-SPACe is the autonomous single-window nodal agency facilitating private sector space activities.\nc) The headquarters of IN-SPACe is located in Ahmedabad, Gujarat.\n\nWhich of the above statements are correct?",
    optionsMr: [
      '१) केवळ अ आणि ब',
      '२) केवळ ब आणि क',
      '३) केवळ अ आणि क',
      '४) वरील सर्व विधाने अ, ब आणि क बरोबर'
    ],
    optionsEn: [
      '1) Only a and b',
      '2) Only b and c',
      '3) Only a and c',
      '4) All statements a, b, and c are correct'
    ],
    correctAnswerIndex: 3,
    explanationMr: "स्पष्टीकरण: सर्व विधाने सत्य आहेत.\n• NSIL ही अंतराळ विभागांतर्गत सार्वजनिक क्षेत्रातील कंपनी (CPSE) आहे जिने LVM3 आणि PSLV च्या व्यावसायिक प्रक्षेपणांचे करार केले आहेत.\n• IN-SPACe चे उद्घाटन जून २०२२ मध्ये अहमदाबाद येथे झाले असून ते खाजगी अंतराळ स्टार्ट-अप्सना (जसे की स्कायमूट, अग्निकुल) इस्रोच्या सुविधा वापरण्यास परवानगी देते.",
    explanationEn: "Explanation: All statements are correct. NSIL is the commercial arm of ISRO, while IN-SPACe (headquartered in Ahmedabad) acts as the single-window nodal authorization agency for non-governmental and private entities.",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  },
  {
    id: 'vid_isro_19',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'आकाश-एनजी (Akash-NG) क्षेपणास्त्र',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: "DRDO ने नुकतीच यशस्वी चाचणी घेतलेल्या 'आकाश-एनजी' (Akash New Generation) क्षेपणास्त्राचे मुख्य वैशिष्ट्य काय आहे?",
    questionEn: "What is the key technological feature of the 'Akash-NG' (New Generation) missile system flight-tested by DRDO?",
    optionsMr: [
      '१) हे केवळ रडार नसलेले अंध क्षेपणास्त्र आहे',
      '२) यात दुहेरी-पल्स घन रॉकेट मोटर (Dual-pulse solid motor) आणि ॲक्टिव्ह AESA रडार साधक बसवलेला आहे',
      '३) हे केवळ समुद्रातील पाणबुड्यांवर हल्ला करू शकते',
      '४) हे ५००० किमी पल्ल्याचे आंतरखंडीय क्षेपणास्त्र आहे'
    ],
    optionsEn: [
      '1) It is an unguided unpowered missile',
      '2) It is powered by a dual-pulse solid rocket motor with an active AESA multi-function radar seeker',
      '3) It is solely dedicated to attacking submarines',
      '4) It is an intercontinental ballistic missile of 5000 km range'
    ],
    correctAnswerIndex: 1,
    explanationMr: "स्पष्टीकरण: आकाश-एनजी (Akash-NG) हे जमिनीवरून हवेत मारा करणारे अत्याधुनिक क्षेपणास्त्र (SAM) आहे. जुन्या आकाश क्षेपणास्त्राच्या रॅमजेट इंजिनाऐवजी यात दुहेरी-पल्स घन रॉकेट मोटर (Dual-pulse solid motor) वापरली आहे, ज्यामुळे त्याचा वेग आणि हवेतील चपळता प्रचंड वाढली आहे. याचा पल्ला ७० ते ८० किमी आहे.",
    explanationEn: "Explanation: Akash-NG features a dual-pulse solid rocket motor and an indigenously developed Active Electronically Scanned Array (AESA) seeker, enabling interception of high-speed agile aerial targets up to 70-80 km.",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  },
  {
    id: 'vid_isro_20',
    subjectId: 'general_science',
    topic: 'इस्रो व डीआरडीओ मोहिमा २०२६',
    subtopic: 'चांद्रयान-४ व ल्युपेक्स (LUPEX) मोहीम',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: "इस्रो आणि जपानची अंतराळ संस्था 'JAXA' यांच्या संयुक्त विद्यमाने नियोजित असलेल्या 'LUPEX' (Lunar Polar Exploration Mission) चा मुख्य उद्देश काय आहे?",
    questionEn: "What is the primary objective of the 'LUPEX' (Lunar Polar Exploration Mission) planned jointly by ISRO and Japan's JAXA?",
    optionsMr: [
      '१) चंद्राच्या दक्षिण ध्रुवावर पाण्याचे प्रमाण तपासणे व मातीचे नमुने पृथ्वीवर परत आणणे (Moon Sample Return)',
      '२) चंद्राच्या पृष्ठभागावर कायमस्वरूपी टेलिस्कोप उभारणे',
      '३) मंगळावर जाण्यासाठी चंद्रावर इंधन स्टेशन तयार करणे',
      '४) चंद्राच्या ध्रुवीय कक्षेतून सूर्यग्रहणाचा अभ्यास करणे'
    ],
    optionsEn: [
      '1) Exploring water ice reserves at the lunar south pole and sample return to Earth',
      '2) Installing a permanent optical telescope on the Moon',
      '3) Building a refuelling depot on Moon for Mars missions',
      '4) Studying solar eclipses from lunar polar orbit'
    ],
    correctAnswerIndex: 0,
    explanationMr: "स्पष्टीकरण: LUPEX (ज्याला चांद्रयान-४ चा भाग मानले जाते) ही इस्रो आणि जपानची JAXA यांची संयुक्त मोहीम आहे. यामध्ये जपानचे H3 रॉकेट आणि रोव्हर असेल, तर इस्रो लँडर तयार करत आहे. चंद्राच्या दक्षिण ध्रुवावरील कायमस्वरूपी सावलीत असणाऱ्या विवरांमधील (PSRs) पाण्याच्या बर्फाचा शोध घेणे आणि नमुने सुरक्षित गोळा करणे हे याचे उद्दिष्ट आहे.",
    explanationEn: "Explanation: LUPEX is a joint venture between ISRO and JAXA (Japan). ISRO will provide the lander, while JAXA will provide the H3 rocket and lunar rover, investigating water ice quantity and quality at the lunar south pole.",
    reference: 'दृष्टी IAS व्हिडिओ संदर्भ (SSC CHSL / MPSC GK: Namu Ma\'am - ISRO & DRDO Missions 2026)',
    yearTag: 'ISRO & DRDO 2026 Special (YouTube Source)'
  }
];
