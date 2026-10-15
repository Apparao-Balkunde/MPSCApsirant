// ============================================================================
// MPSC PANCHAYATI RAJ & LOCAL SELF-GOVERNMENT COMPREHENSIVE DATASET
// Covers: Committees (Balwant Rai Mehta, Ashok Mehta, Vasantrao Naik, P.B. Patil),
// Officers comparison (Gramsevak, BDO, CEO, Collector), 73rd/74th Constitutional Amendments,
// Articles 243A-243O, Schedule 11 (29 subjects), and MPSC Practice MCQs.
// ============================================================================

export interface PanchayatiRajCommittee {
  id: string;
  nameMr: string;
  nameEn: string;
  year: number;
  appointedBy: string;
  reportYear: number;
  reportDate: string;
  recommendationsCount: number;
  tierStructureMr: string;
  tierStructureEn: string;
  executiveBodyMr: string;
  executiveBodyEn: string;
  keyRecommendationsMr: string[];
  keyRecommendationsEn: string[];
  historicalImpactMr: string;
  historicalImpactEn: string;
  mpscHighlightsMr: string[];
  badgeColor: string;
}

export interface LocalGovOfficer {
  id: string;
  titleMr: string;
  titleEn: string;
  levelMr: string;
  levelEn: string;
  cadreAndClassMr: string;
  cadreAndClassEn: string;
  selectionModeMr: string;
  selectionModeEn: string;
  appointingAuthorityMr: string;
  appointingAuthorityEn: string;
  controllingAuthorityMr: string;
  controllingAuthorityEn: string;
  keyPowersMr: string[];
  keyPowersEn: string[];
  statutoryDutiesMr: string[];
  statutoryDutiesEn: string[];
  relationshipWithElectedHeadMr: string;
  relationshipWithElectedHeadEn: string;
  icon: string;
  badgeColor: string;
}

export interface ConstitutionalArticle {
  article: string;
  titleMr: string;
  titleEn: string;
  descriptionMr: string;
  descriptionEn: string;
  importanceRating: 'very_high' | 'high' | 'medium';
  mpscNoteMr: string;
}

export interface PanchayatiRajQuestion {
  id: string;
  questionMr: string;
  questionEn: string;
  optionsMr: string[];
  optionsEn: string[];
  correctOptionIndex: number;
  explanationMr: string;
  explanationEn: string;
  pyqTag?: string; // e.g. "MPSC Rajyaseva 2022"
  topicCategory: 'committees' | 'officers' | 'constitution' | 'maharashtra_act';
}

// ----------------------------------------------------------------------------
// 1. COMMITTEES DATA
// ----------------------------------------------------------------------------
export const PANCHAYATI_RAJ_COMMITTEES: PanchayatiRajCommittee[] = [
  {
    id: 'balwant_rai_mehta',
    nameMr: 'बलवंतराय मेहता समिती',
    nameEn: 'Balwant Rai Mehta Committee',
    year: 1957,
    appointedBy: 'राष्ट्रीय विकास परिषद (NDC) / भारत सरकार',
    reportYear: 1957,
    reportDate: 'नोव्हेंबर १९५७',
    recommendationsCount: 161,
    tierStructureMr: 'त्रिस्तरीय पंचायत राज (ग्रामपंचायत, पंचायत समिती, जिल्हा परिषद)',
    tierStructureEn: '3-Tier System (Gram Panchayat, Panchayat Samiti, Zilla Parishad)',
    executiveBodyMr: 'पंचायत समिती ही मुख्य कार्यकारी संस्था (Executive Body)',
    executiveBodyEn: 'Panchayat Samiti as the primary Executive & Operational Body',
    keyRecommendationsMr: [
      'लोकशाही विकेंद्रीकरण (Democratic Decentralization) लागू करण्यात यावे.',
      'त्रिस्तरीय रचना: ग्रामपातळीवर ग्रामपंचायत, तालुका पातळीवर पंचायत समिती आणि जिल्हा पातळीवर जिल्हा परिषद.',
      'पंचायत समिती हा विकास कामांचा मुख्य कार्यकारी घटक (Executive Body) असावा.',
      'जिल्हा परिषद ही केवळ सल्लागार व समन्वय संस्था (Advisory & Coordinating Body) असावी.',
      'जिल्हाधिकारी (Collector) हा जिल्हा परिषदेचा पदसिद्ध अध्यक्ष असावा.',
      'ग्रामपंचायतीमध्ये प्रत्यक्ष निवडणूक, तर पंचायत समिती व जि.प. मध्ये अप्रत्यक्ष निवडणूक असावी.',
      'पंचायत राज संस्थांना पुरेशी आर्थिक संसाधने व करांचे अधिकार दिले जावेत.'
    ],
    keyRecommendationsEn: [
      'Establishment of democratic decentralization across rural India.',
      'Three-tier structure: Gram Panchayat at base, Panchayat Samiti at block, Zilla Parishad at district.',
      'Panchayat Samiti to serve as the chief executive and planning vehicle.',
      'Zilla Parishad to act primarily as an advisory and supervisory body.',
      'District Collector should act as the ex-officio Chairman of Zilla Parishad.',
      'Direct election at Gram Panchayat; indirect elections at Block and District levels.',
      'Genuine transfer of resources and powers to local bodies.'
    ],
    historicalImpactMr:
      'या समितीच्या शिफारशींवरून २ ऑक्टोबर १९५९ रोजी राजस्थानमधील नागौर जिल्ह्यात भारताचे पहिले पंचायत राज पं. जवाहरलाल नेहरू यांच्या हस्ते सुरू झाले. त्यानंतर आंध्र प्रदेशात लागू झाले.',
    historicalImpactEn:
      'Paved the way for India\'s first Panchayati Raj launched on 2 Oct 1959 at Nagaur, Rajasthan by PM Jawaharlal Nehru, followed by Andhra Pradesh.',
    mpscHighlightsMr: [
      'बलवंतराय मेहता यांना "भारतीय पंचायत राज व्यवस्थेचे जनक / शिल्पकार" म्हटले जाते.',
      'सामुदायिक विकास कार्यक्रम (1952) व राष्ट्रीय विस्तार सेवा (1953) यांच्या अपयशाची कारणे शोधण्यासाठी ही समिती नेमली होती.'
    ],
    badgeColor: 'border-blue-500/60 bg-blue-500/10 text-blue-300'
  },
  {
    id: 'ashok_mehta',
    nameMr: 'अशोक मेहता समिती',
    nameEn: 'Ashok Mehta Committee',
    year: 1977,
    appointedBy: 'जनता पक्ष सरकार (पंतप्रधान मोरारजी देसाई)',
    reportYear: 1978,
    reportDate: 'ऑगस्ट १९७८',
    recommendationsCount: 132,
    tierStructureMr: 'द्विस्तरीय पंचायत राज (जिल्हा परिषद आणि मंडळ पंचायत)',
    tierStructureEn: '2-Tier System (Zilla Parishad and Mandal Panchayat)',
    executiveBodyMr: 'जिल्हा परिषद ही मुख्य कार्यकारी संस्था',
    executiveBodyEn: 'Zilla Parishad as the primary executive & administrative agency',
    keyRecommendationsMr: [
      'त्रिस्तरीय ऐवजी द्विस्तरीय रचना: जिल्हा परिषद आणि १५,००० ते २०,००० लोकसंख्येसाठी ‘मंडळ पंचायत’.',
      'स्वतंत्र ग्रामपंचायत व पंचायत समिती रद्द करावी.',
      'जिल्हा परिषद ही सर्व विकास योजना राबवणारी मुख्य कार्यकारी संस्था असावी.',
      'जिल्हा परिषदेचा अध्यक्ष हा जनतेतून किंवा सदस्यांमधून निवडलेला असावा (जिल्हाधिकाऱ्याचे अध्यक्षपद नसावे).',
      'सर्व स्तरांवर राजकीय पक्षांना त्यांच्या अधिकृत चिन्हांसह निवडणुकीत भाग घेण्याची मुभा द्यावी.',
      'पंचायत राज संस्थांना संविधानात घटनात्मक दर्जा (Constitutional Status) देण्यात यावा (ही शिफारस करणारी पहिली समिती!).',
      'SC/ST प्रवर्गासाठी त्यांच्या लोकसंख्येच्या प्रमाणात जागा राखीव ठेवाव्यात.'
    ],
    keyRecommendationsEn: [
      'Replace 3-tier model with 2-tier: District level Zilla Parishad & cluster Mandal Panchayat (15k-20k pop).',
      'Abolish separate individual Gram Panchayats and block-level Panchayat Samitis.',
      'Zilla Parishad should be the fulcrum of rural development and administration.',
      'Open participation of political parties with official party symbols at all tiers.',
      'First committee to explicitly recommend Constitutional recognition for Panchayati Raj.',
      'Reservation of seats for SC and ST communities based on population proportion.'
    ],
    historicalImpactMr:
      'जनता सरकार कोसळल्यामुळे राष्ट्रीय स्तरावर शिफारशी स्वीकारल्या गेल्या नाहीत, परंतु कर्नाटक, पश्चिम बंगाल आणि आंध्र प्रदेशने यानुसार सुधारणा केल्या.',
    historicalImpactEn:
      'Central recommendations lapsed due to collapse of Janata government; however Karnataka, West Bengal, and Andhra Pradesh enacted model laws based on it.',
    mpscHighlightsMr: [
      'MPSC वारंवार विचारते: "पंचायत राज संस्थांना घटनात्मक दर्जा देण्याची शिफारस सर्वप्रथम कोणी केली?" -> उत्तर: अशोक मेहता समिती (1978).',
      '"द्विस्तरीय रचना" सुचवणारी समिती कोणती? -> अशोक मेहता समिती.'
    ],
    badgeColor: 'border-purple-500/60 bg-purple-500/10 text-purple-300'
  },
  {
    id: 'vasantrao_naik',
    nameMr: 'वसंतराव नाईक समिती (महाराष्ट्र विशेष)',
    nameEn: 'Vasantrao Naik Committee (Maharashtra)',
    year: 1960,
    appointedBy: 'महाराष्ट्र शासन (यशवंतराव चव्हाण सरकार)',
    reportYear: 1961,
    reportDate: '१५ मार्च १९६१',
    recommendationsCount: 226,
    tierStructureMr: 'त्रिस्तरीय रचना (जिल्हा परिषद, पंचायत समिती, ग्रामपंचायत)',
    tierStructureEn: '3-Tier System tailored for Maharashtra (ZP, PS, GP)',
    executiveBodyMr: 'जिल्हा परिषद हा मुख्य प्रशासकीय व कार्यकारी घटक (केंद्रीभूत सत्ता)',
    executiveBodyEn: 'Zilla Parishad as the powerhouse of rural planning and governance',
    keyRecommendationsMr: [
      'महाराष्ट्रात जिल्हा परिषद हाच प्रमुख प्रशासकीय व कार्यकारी घटक असावा (बलवंतराय मेहता यांच्यापेक्षा वेगळी भूमिका!).',
      'पंचायत समिती ही केवळ जिल्हा परिषदेची अंमलबजावणी करणारी क्षेत्रीय संस्था (Executive Agent) असावी.',
      'जिल्हा परिषदेचे कामकाज चालवण्यासाठी स्वतंत्र IAS संवर्गाचा ‘मुख्य कार्यकारी अधिकारी’ (CEO) असावा.',
      'जिल्हाधिकारी (Collector) यांना जिल्हा परिषदेपासून पूर्णपणे बाजूला ठेवावे (ZP चा अध्यक्ष लोकप्रतिनिधी असावा).',
      'आमदार व खासदार यांना जिल्हा परिषद व पंचायत समितीमध्ये मतदानाचा अधिकार नसावा (स्थानिक नेतृत्वाला संधी मिळावी).',
      'जिल्हा परिषदेला स्वतःचे कर व उपकर (Cess) आकारण्याचे अधिकार द्यावेत.'
    ],
    keyRecommendationsEn: [
      'Zilla Parishad placed as the apex executive powerhouse (diverging from Balwant Rai Mehta\'s block focus).',
      'Panchayat Samiti to operate primarily as the subordinate executive agent of the ZP.',
      'Creation of an independent IAS-cadre Chief Executive Officer (CEO) heading ZP administration.',
      'District Collector explicitly kept away from ZP governance to separate revenue/police from rural democracy.',
      'MLAs and MPs barred from voting membership in ZP & PS to nurture grassroots local leadership.',
      'Independent taxation, cess levy, and stamp duty surcharge allocations for Zilla Parishads.'
    ],
    historicalImpactMr:
      'या समितीच्या २२६ शिफारशींवरून ‘महाराष्ट्र जिल्हा परिषद व पंचायत समिती अधिनियम, १९६१’ तयार झाला आणि १ मे १९६२ (महाराष्ट्र दिनी) राज्यात त्रिस्तरीय पंचायत राज व्यवस्था लागू झाली. महाराष्ट्र हे पंचायत राज लागू करणारे देशातील ९ वे राज्य ठरले.',
    historicalImpactEn:
      'Directly led to the enactment of the Maharashtra ZP & PS Act 1961, launching on 1 May 1962. Maharashtra became the 9th state in India to launch Panchayati Raj.',
    mpscHighlightsMr: [
      'वसंतराव नाईक हे त्या वेळी महाराष्ट्राचे महसूल मंत्री होते.',
      'महाराष्ट्रात पंचायत राज व्यवस्थेचे जनक मानले जातात.',
      'ZP ला बलवान बनवणारे मॉडेल म्हणजेच "महाराष्ट्र मॉडेल"!'
    ],
    badgeColor: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300'
  },
  {
    id: 'pb_patil',
    nameMr: 'पी. बी. पाटील समिती (महाराष्ट्र मूल्यांकन)',
    nameEn: 'P. B. Patil Committee (Maharashtra)',
    year: 1984,
    appointedBy: 'महाराष्ट्र शासन (मुख्यमंत्री वसंतदादा पाटील सरकार)',
    reportYear: 1986,
    reportDate: 'जून १९८६',
    recommendationsCount: 154,
    tierStructureMr: 'त्रिस्तरीय रचनेचे बळकटीकरण व सुधारणा',
    tierStructureEn: 'Reinforcement & democratic devolution of 3-tier structure',
    executiveBodyMr: 'ग्रामसभा व जिल्हा नियोजन यांचा समन्वय',
    executiveBodyEn: 'Empowered Gram Sabha & integrated District Planning Committee (DPDC)',
    keyRecommendationsMr: [
      'पंचायत राज संस्थांचे पुनरुज्जीवन करणे आणि ग्रामसभेला सर्वोच्च कायदेमंडळाचा दर्जा देणे.',
      'सरपंच निवड: गावातील राजकीय वाद टाळण्यासाठी सरपंच थेट जनतेतून निवडावा अशी शिफारस केली.',
      'महिलांसाठी २५% आरक्षण ठेवण्याची शिफारस (जी पुढे ३३% व नंतर ५०% झाली).',
      'जिल्हा नियोजन व विकास मंडळ (DPDC) आणि जिल्हा परिषद यांचा परस्पर समन्वय असावा.',
      'सरपंचाविरुद्ध अविश्वास ठराव आणण्यासाठी २/३ बहुमताची अट असावी.',
      'ग्रामसेवकावर अधिक कामाचा ताण असल्याने लोकसंख्येनुसार ग्रामसेवकांची स्वतंत्र पदे असावीत.'
    ],
    keyRecommendationsEn: [
      'Revitalize Maharashtra Panchayati Raj and elevate Gram Sabha as the cornerstone of direct democracy.',
      'Direct election of Village Sarpanch by the adult franchise of the village.',
      'Initial recommendation of 25% reservation for women (later expanded to 33% and 50%).',
      'Institutional harmony between District Planning & Development Committee (DPDC) and ZP.',
      'Stringent 2/3rd majority safeguard against frivolous no-confidence motions against Sarpanch.',
      'Norm of dedicated Gramsevak per population threshold to alleviate work overload.'
    ],
    historicalImpactMr:
      'महाराष्ट्रातील स्थानिक स्वराज्य संस्थांमध्ये महिलांचे राजकीय सक्षमीकरण आणि ग्रामसभांना अधिकार देण्यामध्ये या समितीचा ऐतिहासिक वाटा आहे.',
    historicalImpactEn:
      'Catalyzed women\'s political representation and paved the way for statutory Gram Sabha empowerment in Maharashtra.',
    mpscHighlightsMr: [
      'समितीचे पूर्ण नाव: "पंचायत राज पुनर्विलोकन समिती, १९८४"',
      'अध्यक्ष: प्राचार्य पी. बी. पाटील (सांगलीचे ज्येष्ठ शिक्षणतज्ज्ञ व सहकार नेते).'
    ],
    badgeColor: 'border-amber-500/60 bg-amber-500/10 text-amber-300'
  },
  {
    id: 'lm_singhvi',
    nameMr: 'एल. एम. सिंघवी समिती (राष्ट्रीय दर्जा)',
    nameEn: 'L. M. Singhvi Committee',
    year: 1986,
    appointedBy: 'राजीव गांधी सरकार',
    reportYear: 1986,
    reportDate: 'नोव्हेंबर १९८६',
    recommendationsCount: 88,
    tierStructureMr: 'संविधानिक संरक्षण प्राप्त त्रिस्तरीय रचना',
    tierStructureEn: 'Constitutionally Protected 3-Tier System',
    executiveBodyMr: 'स्थानिक लोकशाही स्वायत्त संस्था',
    executiveBodyEn: 'Autonomous Local Self-Government Institutions',
    keyRecommendationsMr: [
      'पंचायत राज संस्थांना संविधानात नवीन भाग जोडून घटनात्मक मान्यता व संरक्षण द्यावे.',
      'नियमित, निष्पक्ष आणि वेळेत निवडणुका घेण्यासाठी स्वतंत्र ‘राज्य निवडणूक आयोग’ (State Election Commission) स्थापन करावा.',
      'पंचायतींच्या आर्थिक स्वायत्ततेसाठी स्वतंत्र ‘राज्य वित्त आयोग’ (State Finance Commission) असावा.',
      'ग्रामसभा ही "प्रत्यक्ष लोकशाहीची मूर्ती" मानली जावी.',
      'न्यायपंचायती स्थापन करून ग्रामीण भागातील वाद सामोपचाराने मिटवावेत.'
    ],
    keyRecommendationsEn: [
      'Constitutional entrenchment of Panchayati Raj via an explicit new constitutional chapter.',
      'Creation of an autonomous State Election Commission for uninterrupted periodic polls.',
      'Establishment of statutory State Finance Commissions to govern financial devolution.',
      'Affirmation of the Gram Sabha as the core organ of direct democracy.',
      'Setting up Nyaya Panchayats for accessible village-level dispute dispute mediation.'
    ],
    historicalImpactMr:
      'या समितीच्या शिफारशींमुळेच शेवटी नरसिंह राव सरकारच्या काळात ७३ वी व ७४ वी घटनादुरुस्ती (१९९२) अस्तित्वात आली.',
    historicalImpactEn:
      'Direct foundation that culminated in the 73rd and 74th Constitutional Amendment Acts of 1992 under P.V. Narasimha Rao.',
    mpscHighlightsMr: [
      'MPSC वारंवार विचारते: ७३ व्या घटनादुरुस्तीचे मूळ मसुदा तयार करणारी समिती कोणती? -> एल. एम. सिंघवी समिती.'
    ],
    badgeColor: 'border-cyan-500/60 bg-cyan-500/10 text-cyan-300'
  }
];

// ----------------------------------------------------------------------------
// 2. LOCAL GOVERNMENT OFFICERS COMPARISON MATRIX
// Gramsevak vs BDO vs CEO vs District Collector
// ----------------------------------------------------------------------------
export const LOCAL_GOV_OFFICERS: LocalGovOfficer[] = [
  {
    id: 'gramsevak',
    titleMr: 'ग्रामसेवक / ग्रामविकास अधिकारी',
    titleEn: 'Gramsevak / Village Development Officer',
    levelMr: 'ग्रामपातळी (Village Level)',
    levelEn: 'Village / Gram Panchayat Level',
    cadreAndClassMr: 'वर्ग-३ (Class-III) अराजपत्रित कर्मचारी',
    cadreAndClassEn: 'Class-III Non-Gazetted Employee',
    selectionModeMr: 'जिल्हा निवड मंडळ (ZP द्वारे स्पर्धा परीक्षा)',
    selectionModeEn: 'District Selection Board (Zilla Parishad Exam)',
    appointingAuthorityMr: 'मुख्य कार्यकारी अधिकारी (CEO), जिल्हा परिषद',
    appointingAuthorityEn: 'Chief Executive Officer (CEO), Zilla Parishad',
    controllingAuthorityMr: 'गट विकास अधिकारी (BDO) व विस्तार अधिकारी (पंचायत)',
    controllingAuthorityEn: 'Block Development Officer (BDO) & Extension Officer',
    keyPowersMr: [
      'ग्रामपंचायतीचा पदसिद्ध सचिव (Ex-officio Secretary) म्हणून कामकाज चालवणे.',
      'ग्रामसभेची व ग्रामपंचायत मासिक सभेची नोटीस काढणे आणि प्रोसिडिंग (इतिवृत्त) नोंदवणे.',
      'जन्म, मृत्यू आणि विवाह नोंदणी निबंधक (Registrar) म्हणून प्रमाणपत्रे देणे.',
      'गावातील घरपट्टी, पाणीपट्टी व इतर स्थानिक कर गोळा करणे व दप्तरात नोंद करणे.',
      'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी योजना (MGNREGA) मस्टर रोल सांभाळणे.',
      'दारिद्र्यरेषेखालील (BPL) व शासकीय कल्याणकारी योजनांच्या लाभार्थींची यादी तयार करणे.'
    ],
    keyPowersEn: [
      'Serves as the Ex-officio Secretary of the Gram Panchayat.',
      'Issues statutory meeting notices for Gram Sabha and monthly body meetings, records proceedings.',
      'Statutory Local Registrar of Births, Deaths, and Marriages.',
      'Levies and collects property tax, water cess, and maintains statutory accounting registers.',
      'Oversees village MGNREGA job cards, muster rolls, and physical asset records.',
      'Maintains BPL lists and executes state & central social welfare schemes at the hamlet level.'
    ],
    statutoryDutiesMr: [
      'ग्रामसभेत जमा-खर्च सादर करणे व ग्रामसभेने मंजूर केलेल्या कामांची अंमलबजावणी करणे.',
      'गावातील शासकीय मालमत्तांचे रक्षण करणे आणि अतिक्रमणांची माहिती वरिष्ठांना देणे.',
      'सरपंचाच्या सहीने धनादेशावर (Cheque) संयुक्त स्वाक्षरी करणे (Joint Signatory).'
    ],
    statutoryDutiesEn: [
      'Present annual accounts and audit statements to the Gram Sabha.',
      'Protect communal government assets and report illegal land encroachments.',
      'Act as joint signatory with the Sarpanch for village fund disbursement cheques.'
    ],
    relationshipWithElectedHeadMr:
      'सरपंच हा राजकीय व प्रशासकीय प्रमुख असतो; ग्रामसेवक हा त्याचा प्रशासकीय सहाय्यक व वित्तीय संयुक्त स्वाक्षरीदार असतो. सरपंचाच्या आदेशानुसार ग्रामपंचायतीचे दैनंदिन काम करतो, मात्र बेकायदेशीर ठरावांची माहिती BDO कडे नोंदवणे त्याचे कर्तव्य असते.',
    relationshipWithElectedHeadEn:
      'Collaborates as administrative secretary to the elected Sarpanch. Operates bank accounts jointly with Sarpanch; must flag ultra-vires resolutions to the BDO.',
    icon: '🌾',
    badgeColor: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300'
  },
  {
    id: 'bdo',
    titleMr: 'गट विकास अधिकारी (BDO)',
    titleEn: 'Block Development Officer (BDO)',
    levelMr: 'तालुका / ब्लॉक पातळी (Taluka / Block Level)',
    levelEn: 'Block / Taluka Panchayat Samiti Level',
    cadreAndClassMr: 'वर्ग-१ / वर्ग-२ राज्य सेवा राजपत्रित (Gazetted Officer)',
    cadreAndClassEn: 'Class-I / Class-II Maharashtra State Service Gazetted Officer',
    selectionModeMr: 'महाराष्ट्र लोकसेवा आयोग (MPSC राज्यसेवा परीक्षा)',
    selectionModeEn: 'MPSC State Services Examination (Direct Recruitment / Promotion)',
    appointingAuthorityMr: 'महाराष्ट्र शासन (ग्रामविकास विभाग)',
    appointingAuthorityEn: 'Government of Maharashtra (Rural Development Dept)',
    controllingAuthorityMr: 'मुख्य कार्यकारी अधिकारी (CEO), जिल्हा परिषद',
    controllingAuthorityEn: 'Chief Executive Officer (CEO), Zilla Parishad',
    keyPowersMr: [
      'पंचायत समितीचा पदसिद्ध सचिव व मुख्य कार्यकारी अधिकारी (Ex-officio Executive Officer).',
      'तालुक्यातील सर्व विकास योजनांचे नियोजन, अंमलबजावणी व क्षेत्रीय पर्यवेक्षण करणे.',
      'तालुक्यातील विस्तार अधिकारी, ग्रामसेवक व प्राथमिक शिक्षकांवर प्रशासकीय व शिस्तभंगाचे नियंत्रण.',
      'पंचायत समितीच्या अंदाजपत्रकाचा मसुदा तयार करून सभेसमोर मांडणे.',
      'गट निधीतून (Block Fund) मंजुरीनुसार विकासकामांचे धनादेश जारी करणे.',
      'ग्रामपंचायतींच्या कामकाजाची वार्षिक तपासणी करणे व दप्तरांचे ऑडिट करणे.'
    ],
    keyPowersEn: [
      'Ex-officio Secretary and Executive Head of the Panchayat Samiti.',
      'Translates central, state, and ZP developmental allocations into taluka-wide execution.',
      'Direct disciplinary and administrative control over Extension Officers, Gramsevaks, and block staff.',
      'Prepares annual budget draft of the Panchayat Samiti and pilots it through the body.',
      'Authorized disbursing officer for the Block Development Fund.',
      'Inspects Gram Panchayat accounts, audits registers, and issues administrative directives.'
    ],
    statutoryDutiesMr: [
      'पंचायत समितीच्या मासिक सभा व विशेष सभा आयोजित करणे व इतिवृत्त ठेवणे.',
      'नैसर्गिक आपत्तीच्या काळात तालुक्यात मदत व पुनर्वसन मोहिमा राबवणे.',
      'जिल्हा परिषद CEO आणि पंचायत समिती सभापती यांच्यातील प्रशासकीय दुवा म्हणून काम करणे.'
    ],
    statutoryDutiesEn: [
      'Convenes monthly and special meetings of the Panchayat Samiti and records minutes.',
      'Leads taluka-level relief operations during droughts, floods, and epidemics.',
      'Acts as the vital operational link between ZP CEO and Panchayat Samiti Chairperson.'
    ],
    relationshipWithElectedHeadMr:
      'पंचायत समिती सभापती हा लोकप्रतिनिधींचा प्रमुख असतो. BDO हा सभापतीच्या मार्गदर्शनाखाली काम करतो. मात्र आर्थिक व प्रशासकीय अधिकारांचे स्वतंत्र अधिकार BDO ला अधिनियमानुसार दिलेले असतात.',
    relationshipWithElectedHeadEn:
      'Works in executive partnership with the elected Panchayat Samiti Sabhapati (Chairman), balancing political mandates with statutory financial compliance.',
    icon: '🏛️',
    badgeColor: 'border-blue-500/60 bg-blue-500/10 text-blue-300'
  },
  {
    id: 'ceo',
    titleMr: 'मुख्य कार्यकारी अधिकारी (CEO)',
    titleEn: 'Chief Executive Officer (CEO, ZP)',
    levelMr: 'जिल्हा पातळी (District Level - Rural)',
    levelEn: 'Apex Rural District Level (Zilla Parishad)',
    cadreAndClassMr: 'IAS (भारतीय प्रशासकीय सेवा) संवर्ग',
    cadreAndClassEn: 'Senior IAS (Indian Administrative Service) Cadre',
    selectionModeMr: 'UPSC (केंद्रीय लोकसेवा आयोग) नागरी सेवा परीक्षा / वरिष्ठ पदोन्नती',
    selectionModeEn: 'UPSC Civil Services Examination / Senior State Promotion',
    appointingAuthorityMr: 'महाराष्ट्र शासन (सामान्य प्रशासन / ग्रामविकास विभाग)',
    appointingAuthorityEn: 'Government of Maharashtra (GAD & RDD)',
    controllingAuthorityMr: 'विभागीय आयुक्त (Divisional Commissioner) व ग्रामविकास मंत्रालय',
    controllingAuthorityEn: 'Divisional Commissioner & Minister for Rural Development',
    keyPowersMr: [
      'जिल्हा परिषदेचा सर्वोच्च प्रशासकीय व कार्यकारी प्रमुख (Supreme Executive Head of ZP).',
      'जिल्हा परिषदेचे सर्व कर्मचारी (वर्ग-३ व वर्ग-४) यांच्या नियुक्त्या, बदल्या व शिस्तभंग अधिकार.',
      'जिल्हा परिषदेचा वार्षिक अर्थसंकल्प (Budget) तयार करून स्थायी समिती व सर्वसाधारण सभेस सादर करणे.',
      'जिल्हा निधीतून (District Fund) कोट्यवधींच्या विकास कामांना तांत्रिक व प्रशासकीय मंजुरी देणे.',
      'जिल्हा परिषदेने घेतलेला एखादा ठराव बेकायदेशीर, वित्तीय हानीकारक किंवा जनहितास बाधक वाटल्यास तो स्थगितीसाठी राज्य शासनाकडे पाठवण्याचा विशेषाधिकार.',
      'जिल्हा परिषदेच्या स्थायी समिती व सर्वसाधारण सभेस उपस्थित राहण्याचा आणि मत मांडण्याचा अधिकार (परंतु मतदानाचा अधिकार नसतो).'
    ],
    keyPowersEn: [
      'Apex executive administrative commander of the Zilla Parishad apparatus.',
      'Complete authority for appointments, transfers, appraisals, and disciplinary action over Class-III & IV ZP cadre.',
      'Formulates the annual ZP budget and controls district-wide developmental disbursements.',
      'Accords statutory administrative and financial sanctions for major rural infrastructure works.',
      'Statutory veto-report power: can report ultra-vires or detrimental ZP resolutions to the State Government for annulment.',
      'Entitled to attend and speak at all ZP and Standing Committee meetings (without voting rights).'
    ],
    statutoryDutiesMr: [
      'जिल्हा परिषदेच्या सर्व योजना, शाळा, आरोग्य केंद्रे, जलसंधारण व रस्ते कामांचे संनियंत्रण करणे.',
      'जिल्हा परिषदेच्या अध्यक्षांशी समन्वय साधून ग्रामीण विकासाचा गाडा हाकणे.',
      'राज्याच्या मुख्य सचिवांच्या व विभागीय आयुक्तांच्या आदेशांची जिल्हा पातळीवर अंमलबजावणी करणे.'
    ],
    statutoryDutiesEn: [
      'Direct oversight over all district primary schools, primary health centers (PHCs), roads, and water works.',
      'Harmonious executive alignment with the elected Zilla Parishad President (Adhyaksha).',
      'Implements policy directives issued by the Chief Secretary and Divisional Commissioner.'
    ],
    relationshipWithElectedHeadMr:
      'जिल्हा परिषद अध्यक्ष (Adhyaksha) हा जिल्ह्याचा प्रथम नागरिक व राजकीय प्रमुख असतो. CEO हा प्रशासकीय प्रमुख असतो. वसंतराव नाईक समितीच्या मॉडेलनुसार, अध्यक्षांना धोरणात्मक अधिकार तर CEO ला स्वतंत्र कार्यकारी अधिकार देण्यात आले आहेत.',
    relationshipWithElectedHeadEn:
      'Executive co-existence: The ZP President is the supreme political head, while the CEO exercises independent executive powers as enshrined in the 1961 Act.',
    icon: '👑',
    badgeColor: 'border-amber-500/60 bg-amber-500/10 text-amber-300'
  },
  {
    id: 'collector',
    titleMr: 'जिल्हाधिकारी (District Collector) वि. CEO तुलना',
    titleEn: 'District Collector vs CEO Comparative Role',
    levelMr: 'जिल्हा प्रशासन (District Revenue & Law/Order)',
    levelEn: 'General District Administration, Revenue, Magisterial',
    cadreAndClassMr: 'IAS (भारतीय प्रशासकीय सेवा) संवर्ग',
    cadreAndClassEn: 'Senior IAS (Indian Administrative Service) Cadre',
    selectionModeMr: 'UPSC नागरी सेवा परीक्षा',
    selectionModeEn: 'UPSC Civil Services Examination',
    appointingAuthorityMr: 'महाराष्ट्र शासन (महसूल व वन विभाग)',
    appointingAuthorityEn: 'Government of Maharashtra (Revenue & Forests Dept)',
    controllingAuthorityMr: 'विभागीय आयुक्त व महसूल मंत्रालय',
    controllingAuthorityEn: 'Divisional Commissioner & Home/Revenue Ministries',
    keyPowersMr: [
      'जिल्ह्यातील कायदा व सुव्यवस्था (District Magistrate), महसूल वसुली आणि आपत्ती व्यवस्थापन प्रमुख.',
      'जिल्ह्यातील विधानसभा, लोकसभा आणि स्थानिक स्वराज्य संस्थांच्या निवडणुकांचे ‘जिल्हा निवडणूक अधिकारी’.',
      'महाराष्ट्रातील वसंतराव नाईक मॉडेलनुसार: जिल्हाधिकाऱ्याचा जिल्हा परिषदेच्या अंतर्गत कारभारात कोणताही थेट हस्तक्षेप नसतो.',
      'फक्त पंचायत राज संस्थांवर राज्य शासनाचा ‘डोळा’ म्हणून देखरेख ठेवणे आणि संकटसमयी अहवाल देणे.',
      'जिल्हा परिषद व पंचायत समितीच्या पहिल्या सभेचे (अध्यक्ष/सभापती निवडीसाठी) पीठासीन अधिकारी म्हणून काम पाहणे किंवा अधिकारी नियुक्त करणे.'
    ],
    keyPowersEn: [
      'Supreme District Magistrate, Chief Revenue Officer, and District Disaster Management Authority Chief.',
      'District Election Officer for Parliamentary, Assembly, and Local Body elections.',
      'Crucial Maharashtra Feature: Collector is deliberately excluded from day-to-day ZP governance.',
      'Acts merely as statutory watchdog on behalf of the state government regarding rule-of-law adherence.',
      'Presides over or appoints presiding officer for the maiden meeting electing the ZP President / PS Chairman.'
    ],
    statutoryDutiesMr: [
      'शहरी व ग्रामीण संपूर्ण जिल्ह्याचे महसूल नियंत्रण.',
      'जमीन अधिग्रहण, पुनर्वसन आणि शिधावाटप/अन्न पुरवठा नियंत्रण.',
      'निवडणूक प्रक्रिया शांततेत पार पाडणे.'
    ],
    statutoryDutiesEn: [
      'Revenue jurisdiction spanning both rural and urban areas of the district.',
      'Land acquisition, rehabilitation, and civil food supply regulation.',
      'Ensuring free and fair election conduction.'
    ],
    relationshipWithElectedHeadMr:
      'जिल्हाधिकारी व CEO दोघेही IAS दर्जाचे अधिकारी असतात; परंतु महाराष्ट्रात ग्रामीण विकासाचे संपूर्ण नेतृत्व CEO कडे असते तर कायदा, महसूल व निवडणुका जिल्हाधिकाऱ्यांकडे असतात. यामुळे प्रशासकीय कार्यक्षमता दुप्पट होते.',
    relationshipWithElectedHeadEn:
      'Both are IAS peers; Collector steers law/order, revenue, and regulatory wings, while CEO exclusively commands rural socio-economic transformation.',
    icon: '⚖️',
    badgeColor: 'border-red-500/60 bg-red-500/10 text-red-300'
  }
];

// ----------------------------------------------------------------------------
// 3. CONSTITUTIONAL PROVISIONS (ARTICLES 243 TO 243-O)
// 73rd Constitutional Amendment Act, 1992 (Part IX, Schedule 11)
// ----------------------------------------------------------------------------
export const CONSTITUTIONAL_ARTICLES: ConstitutionalArticle[] = [
  {
    article: 'कलम २४३',
    titleMr: 'व्याख्या (Definitions)',
    titleEn: 'Definitions (District, Gram Sabha, Panchayat, Village)',
    descriptionMr: 'जिल्हा, ग्रामसभा, मध्यवर्ती स्तर, पंचायत आणि गाव या संज्ञांच्या कायदेशीर व्याख्या स्पष्ट केल्या आहेत.',
    descriptionEn: 'Defines District, Gram Sabha, Intermediate Level, Panchayat, and Village boundaries.',
    importanceRating: 'medium',
    mpscNoteMr: 'ग्रामसभा म्हणजे गावाच्या मतदार यादीत नोंदणी केलेल्या सर्व सज्ञान मतदारांची मिळून बनलेली संस्था.'
  },
  {
    article: 'कलम २४३ A',
    titleMr: 'ग्रामसभा (Gram Sabha)',
    titleEn: 'Gram Sabha - Foundation of Direct Democracy',
    descriptionMr: 'ग्रामसभा ही गावपातळीवर अशी कामे व अधिकार चालवेल जी राज्य विधीमंडळ कायद्याद्वारे ठरवून देईल.',
    descriptionEn: 'Gram Sabha exercises powers and performs functions at village level as state legislature provides by law.',
    importanceRating: 'very_high',
    mpscNoteMr: 'MPSC चा आवडता प्रश्न: ग्रामसभेची तरतूद कोणत्या कलमात आहे? -> कलम २४३ A. महाराष्ट्रात वर्षातून किमान ४ ग्रामसभा (१ मे, १५ ऑगस्ट, २ ऑक्टोबर, २६ जानेवारी) अनिवार्य आहेत.'
  },
  {
    article: 'कलम २४३ B',
    titleMr: 'पंचायतींची स्थापना (Constitution of Panchayats)',
    titleEn: 'Constitution of Panchayats (3-Tier Structure)',
    descriptionMr: 'प्रत्येक राज्यात गाव, मध्यवर्ती (तालुका) व जिल्हा पातळीवर पंचायतींची स्थापना केली जाईल. (ज्या राज्यांची लोकसंख्या २० लाखांपेक्षा कमी आहे, तिथे मध्यवर्ती स्तर स्थापन न करण्याची मुभा).',
    descriptionEn: 'Establishment of 3-tier panchayats. Exemption: States with population under 20 lakhs may dispense with intermediate tier.',
    importanceRating: 'very_high',
    mpscNoteMr: 'गोव्यात फक्त ग्रामपंचायत आणि जिल्हा परिषद अशी द्विस्तरीय रचना आहे कारण लोकसंख्या २० लाखांपेक्षा कमी आहे.'
  },
  {
    article: 'कलम २४३ C',
    titleMr: 'पंचायतींची रचना (Composition of Panchayats)',
    titleEn: 'Composition of Panchayats & Election Method',
    descriptionMr: 'पंचायतींमधील सर्व जागा प्रादेशिक मतदारसंघांतून थेट निवडणुकीने (Direct Election) भरल्या जातील. अध्यक्षांची निवड राज्य विधीमंडळाच्या कायद्यानुसार ठरते.',
    descriptionEn: 'All seats in panchayat filled by persons chosen by direct election from territorial constituencies.',
    importanceRating: 'high',
    mpscNoteMr: 'ग्रामपंचायतीचे सदस्य थेट जनतेतून; सरपंच थेट जनतेतून की सदस्यांमधून हे ठरवण्याचा अधिकार राज्य शासनाला आहे.'
  },
  {
    article: 'कलम २४३ D',
    titleMr: 'जागांचे आरक्षण (Reservation of Seats)',
    titleEn: 'Reservation of Seats (SC, ST, Women, OBC)',
    descriptionMr: 'SC आणि ST प्रवर्गासाठी लोकसंख्येच्या प्रमाणात जागा राखीव. महिलांसाठी एकूण जागांपैकी किमान १/३ (३३%) जागा राखीव असाव्यात. (महाराष्ट्रात हे महिला आरक्षण ५०% आहे!).',
    descriptionEn: 'Mandatory reservation for SC/ST proportional to population. At least 1/3rd seats for women (Maharashtra has 50% reservation).',
    importanceRating: 'very_high',
    mpscNoteMr: 'MPSC प्रश्न: संविधानानुसार महिलांना किमान ३३% आरक्षण; महाराष्ट्राने २०११ मध्ये सुधारणा करून ते ५०% केले. कलम २४३ D नुसार आरक्षण ठरते.'
  },
  {
    article: 'कलम २४३ E',
    titleMr: 'पंचायतींचा कार्यकाळ (Duration of Panchayats)',
    titleEn: 'Duration of Panchayats (5 Years Term)',
    descriptionMr: 'पहिल्या बैठकीपासून पंचायतीचा कार्यकाळ ५ वर्षे राहील. पंचायती मुदतपूर्व विसर्जित झाल्यास ६ महिन्यांच्या आत फेरनिवडणूक घेणे बंधनकारक आहे.',
    descriptionEn: 'Every Panchayat continues for 5 years from its first meeting. Re-election must be held within 6 months of dissolution.',
    importanceRating: 'very_high',
    mpscNoteMr: 'जर विसर्जित पंचायतीचा उर्वरित काळ ६ महिन्यांपेक्षा कमी शिल्लक असेल, तर पोटनिवडणूक घेण्याची गरज नसते.'
  },
  {
    article: 'कलम २४३ F',
    titleMr: 'सदस्यत्वासाठी अपात्रता (Disqualifications for Membership)',
    titleEn: 'Disqualifications for Panchayat Membership',
    descriptionMr: 'विधीमंडळाच्या निवडणुकीसाठी पात्र असलेली कोणतीही व्यक्ती सदस्य होऊ शकते. किमान वय मर्यादा मात्र २१ वर्षे असावी (विधानसभेप्रमाणे २५ वर्षे नाही!).',
    descriptionEn: 'Minimum age for contesting Panchayat election is 21 years (unlike 25 years for State Legislative Assembly).',
    importanceRating: 'very_high',
    mpscNoteMr: 'वय वर्ष २१ पूर्ण झालेली व्यक्ती पंचायत निवडणुकीला उभी राहू शकते. अपात्रतेचे वाद ठरवण्याचा अधिकार राज्य कायद्याने नेमलेल्या प्राधिकरणाकडे असतो.'
  },
  {
    article: 'कलम २४३ G',
    titleMr: 'पंचायतींचे अधिकार व जबाबदाऱ्या (Powers, Authority & Responsibilities)',
    titleEn: 'Powers, Authority & Responsibilities (11th Schedule 29 Subjects)',
    descriptionMr: 'आर्थिक विकास व सामाजिक न्यायासाठी योजना तयार करणे आणि ११ व्या परिशिष्टातील २९ विषयांची अंमलबजावणी करणे.',
    descriptionEn: 'Powers to formulate and implement economic development and social justice schemes over 29 subjects in 11th Schedule.',
    importanceRating: 'high',
    mpscNoteMr: '११ व्या परिशिष्टात (11th Schedule) एकूण २९ विषय समाविष्ट आहेत. उदा. कृषी, जलसंधारण, दारिद्र्य निर्मूलन, प्राथमिक व माध्यमिक शिक्षण.'
  },
  {
    article: 'कलम २४३ H',
    titleMr: 'करांची आकारणी व निधी (Taxes and Funds of Panchayats)',
    titleEn: 'Powers to Impose Taxes by & Funds of the Panchayats',
    descriptionMr: 'राज्य विधीमंडळ कायद्याद्वारे पंचायतींना कर, जकात, शुल्क आणि उपकर आकारण्याचे अधिकार देऊ शकते.',
    descriptionEn: 'Authorizes State Legislature to confer powers on Panchayats to levy, collect, and appropriate local taxes and tolls.',
    importanceRating: 'medium',
    mpscNoteMr: 'स्थानिक स्वायत्ततेसाठी स्वतःचा उत्पन्नाचा स्रोत असणे अत्यंत महत्त्वाचे आहे.'
  },
  {
    article: 'कलम २४३ I',
    titleMr: 'राज्य वित्त आयोग (State Finance Commission)',
    titleEn: 'State Finance Commission (Review of Financial Position)',
    descriptionMr: 'राज्यपालांकडून दर ५ वर्षांनी राज्य वित्त आयोगाची स्थापना. राज्य आणि पंचायतींमध्ये कर वाटप व अनुदानाचे निकष शिफारस करणे.',
    descriptionEn: 'Governor shall constitute a State Finance Commission every 5 years to review finances and recommend devolution principles.',
    importanceRating: 'very_high',
    mpscNoteMr: 'MPSC प्रश्न: राज्य वित्त आयोगाची नियुक्ती कोण करतो? -> राज्यपाल (Governor). कलम २४३ I आणि नागरी संस्थांसाठी कलम २४३ Y.'
  },
  {
    article: 'कलम २४३ K',
    titleMr: 'पंचायतींच्या निवडणुका (Elections to the Panchayats)',
    titleEn: 'Elections to the Panchayats (State Election Commission)',
    descriptionMr: 'स्थानिक स्वराज्य संस्थांच्या निवडणुका घेण्यासाठी स्वतंत्र ‘राज्य निवडणूक आयोग’ (State Election Commission). राज्य निवडणूक आयुक्तांची नियुक्ती राज्यपाल करतात.',
    descriptionEn: 'Superintendence, direction, and control of electoral rolls and conduct of all panchayat elections vested in State Election Commission.',
    importanceRating: 'very_high',
    mpscNoteMr: 'राज्य निवडणूक आयुक्ताला पदावरून दूर करण्याची प्रक्रिया उच्च न्यायालयाच्या न्यायाधीशाप्रमाणेच (महाभियोग सदृश) महाकठीण असते.'
  },
  {
    article: 'कलम २४३ O',
    titleMr: 'निवडणूक बाबींमध्ये न्यायालयांच्या हस्तक्षेपास प्रतिबंध (Bar to Interference by Courts)',
    titleEn: 'Bar to Interference by Courts in Electoral Matters',
    descriptionMr: 'मतदारसंघांची फेररचना किंवा जागांचे वाटप यांसंदर्भात कोणत्याही न्यायालयाला हस्तक्षेप करण्यास मज्जाव.',
    descriptionEn: 'Courts cannot question boundary delimitation of constituencies or seat allotment in Panchayats.',
    importanceRating: 'high',
    mpscNoteMr: 'निवडणूक याचिका केवळ राज्य कायद्याने विहित केलेल्या प्राधिकरणासमोरच मांडली जाऊ शकते.'
  }
];

// ----------------------------------------------------------------------------
// 4. MPSC EXAM HIGH-FREQUENCY PRACTICE QUESTIONS
// ----------------------------------------------------------------------------
export const PANCHAYATI_RAJ_QUESTIONS: PanchayatiRajQuestion[] = [
  {
    id: 'pr_q1',
    questionMr: 'महाराष्ट्रात जिल्हा परिषद व पंचायत समिती अधिनियम, १९६१ कोणत्या समितीच्या शिफारशींनुसार तयार करण्यात आला?',
    questionEn: 'Under the recommendations of which committee was the Maharashtra Zilla Parishad and Panchayat Samiti Act, 1961 enacted?',
    optionsMr: [
      'बलवंतराय मेहता समिती',
      'वसंतराव नाईक समिती',
      'पी. बी. पाटील समिती',
      'बाबूराव काळे समिती'
    ],
    optionsEn: [
      'Balwant Rai Mehta Committee',
      'Vasantrao Naik Committee',
      'P. B. Patil Committee',
      'Baburao Kale Committee'
    ],
    correctOptionIndex: 1,
    explanationMr:
      'वसंतराव नाईक समितीची स्थापना २७ जून १९६० रोजी झाली. या समितीने १५ मार्च १९६१ रोजी २२६ शिफारशींचा अहवाल दिला, ज्यावरून हा ऐतिहासिक कायदा तयार होऊन १ मे १९६२ रोजी महाराष्ट्रात पंचायत राज सुरू झाले.',
    explanationEn:
      'The Vasantrao Naik Committee was appointed on 27 June 1960 and submitted its 226-recommendation report on 15 March 1961, leading to the enactment of the 1961 Act on 1 May 1962.',
    pyqTag: 'MPSC राज्यसेवा पूर्व २०१६ व २०१९',
    topicCategory: 'committees'
  },
  {
    id: 'pr_q2',
    questionMr: 'पंचायत राज संस्थांना घटनात्मक दर्जा (Constitutional Status) देण्याची शिफारस सर्वप्रथम खालीलपैकी कोणत्या समितीने केली होती?',
    questionEn: 'Which of the following committees was the FIRST to recommend granting Constitutional status to Panchayati Raj institutions?',
    optionsMr: [
      'बलवंतराय मेहता समिती (१९५७)',
      'अशोक मेहता समिती (१९७८)',
      'जी. व्ही. के. राव समिती (१९८५)',
      'वसंतराव नाईक समिती (१९६१)'
    ],
    optionsEn: [
      'Balwant Rai Mehta Committee (1957)',
      'Ashok Mehta Committee (1978)',
      'G. V. K. Rao Committee (1985)',
      'Vasantrao Naik Committee (1961)'
    ],
    correctOptionIndex: 1,
    explanationMr:
      'अशोक मेहता समितीने (१९७८) सर्वप्रथम पंचायत राज संस्थांना संविधानात घटनात्मक दर्जा देण्याची शिफारस केली होती. नंतर एल. एम. सिंघवी समितीने (१९८६) यावर ठाम भर दिला.',
    explanationEn:
      'Ashok Mehta Committee (1978) was the first committee to formally propose conferring constitutional status upon Panchayati Raj institutions, which was later reinforced by the L.M. Singhvi Committee.',
    pyqTag: 'MPSC गट-ब पूर्व २०१८',
    topicCategory: 'committees'
  },
  {
    id: 'pr_q3',
    questionMr: 'महाराष्ट्रात जिल्हा परिषदेचा प्रशासकीय प्रमुख कोण असतो आणि त्याची नियुक्ती कोण करते?',
    questionEn: 'Who is the Chief Executive administrative head of the Zilla Parishad in Maharashtra, and by whom is he appointed?',
    optionsMr: [
      'जिल्हाधिकारी - UPSC द्वारे',
      'मुख्य कार्यकारी अधिकारी (CEO) - राज्य शासनाकडून (IAS संवर्ग)',
      'जिल्हा परिषद अध्यक्ष - जनतेकडून',
      'गट विकास अधिकारी - MPSC द्वारे'
    ],
    optionsEn: [
      'District Collector - via UPSC',
      'Chief Executive Officer (CEO) - Appointed by State Govt (IAS Cadre)',
      'ZP President - Elected by public',
      'Block Development Officer - via MPSC'
    ],
    correctOptionIndex: 1,
    explanationMr:
      'जिल्हा परिषदेचा प्रशासकीय प्रमुख मुख्य कार्यकारी अधिकारी (CEO) असतो. तो भारतीय प्रशासकीय सेवेचा (IAS) अधिकारी असून राज्य शासन त्याची नियुक्ती करते. जिल्हा परिषद अध्यक्ष हा राजकीय प्रमुख असतो.',
    explanationEn:
      'The Chief Executive Officer (CEO), an IAS officer appointed by the State Government, is the administrative executive head of the Zilla Parishad.',
    pyqTag: 'MPSC तलाठी व PSI मुख्य',
    topicCategory: 'officers'
  },
  {
    id: 'pr_q4',
    questionMr: 'भारतीय संविधानातील कोणत्या कलमान्वये प्रत्येक ग्रामपंचायतीसाठी ‘ग्रामसभा’ (Gram Sabha) स्थापन करण्याची तरतूद आहे?',
    questionEn: 'Under which Article of the Constitution of India is the provision for establishing a "Gram Sabha" enshrined?',
    optionsMr: [
      'कलम २४३',
      'कलम २४३ A',
      'कलम २४३ B',
      'कलम २४३ D'
    ],
    optionsEn: [
      'Article 243',
      'Article 243 A',
      'Article 243 B',
      'Article 243 D'
    ],
    correctOptionIndex: 1,
    explanationMr:
      'कलम २४३ A मध्ये ग्रामसभेची तरतूद आहे. ग्रामसभा म्हणजे गावपातळीवरील मतदार यादीत नोंदणीकृत असलेल्या सर्व प्रौढ व्यक्तींची सभा, जी प्रत्यक्ष लोकशाहीचे प्रतीक मानली जाते.',
    explanationEn:
      'Article 243A provides for the Gram Sabha. It comprises all registered voters within the revenue village area and represents direct grassroots democracy.',
    pyqTag: 'MPSC राज्यसेवा पूर्व २०२१',
    topicCategory: 'constitution'
  },
  {
    id: 'pr_q5',
    questionMr: 'पंचायत समितीचा पदसिद्ध सचिव (Ex-officio Secretary) म्हणून खालीलपैकी कोण काम पाहतो?',
    questionEn: 'Who among the following functions as the Ex-officio Secretary of the Panchayat Samiti?',
    optionsMr: [
      'तहसीलदार (Tahsildar)',
      'गट विकास अधिकारी (Block Development Officer - BDO)',
      'विस्तार अधिकारी (Extension Officer)',
      'पंचायत समिती सभापती'
    ],
    optionsEn: [
      'Tahsildar',
      'Block Development Officer (BDO)',
      'Extension Officer',
      'Panchayat Samiti Sabhapati'
    ],
    correctOptionIndex: 1,
    explanationMr:
      'गट विकास अधिकारी (BDO) हा पंचायत समितीचा पदसिद्ध सचिव व मुख्य कार्यकारी अधिकारी असतो. तो बैठकांचे आयोजन करणे, सभेचे प्रोसिडिंग लिहिणे आणि गट निधीतून खर्चाचे धनादेश काढणे ही कामे करतो.',
    explanationEn:
      'The Block Development Officer (BDO) is the statutory ex-officio Secretary and executive head of the Panchayat Samiti.',
    pyqTag: 'MPSC गट-क कर सहाय्यक २०१९',
    topicCategory: 'officers'
  },
  {
    id: 'pr_q6',
    questionMr: '७३ व्या घटनादुरुस्तीनुसार संविधानात नव्याने जोडण्यात आलेल्या ११ व्या परिशिष्टात (11th Schedule) एकूण किती विषयांचा समावेश आहे?',
    questionEn: 'How many functional subjects are included in the 11th Schedule added to the Constitution by the 73rd Amendment Act?',
    optionsMr: [
      '१८ विषय',
      '२१ विषय',
      '२९ विषय',
      '३२ विषय'
    ],
    optionsEn: [
      '18 Subjects',
      '21 Subjects',
      '29 Subjects',
      '32 Subjects'
    ],
    correctOptionIndex: 2,
    explanationMr:
      '७३ व्या घटनादुरुस्तीने जोडलेल्या ११ व्या परिशिष्टात ग्रामीण स्थानिक स्वराज्य संस्थांसाठी एकूण २९ विषय दिलेले आहेत. (नागरी स्थानिक संस्थांसाठी १२ व्या परिशिष्टात १८ विषय आहेत).',
    explanationEn:
      'The 11th Schedule contains 29 functional items for Panchayats under Article 243G. (The 12th Schedule contains 18 items for Municipalities).',
    pyqTag: 'MPSC संयुक्त पूर्व २०२३',
    topicCategory: 'constitution'
  },
  {
    id: 'pr_q7',
    questionMr: 'महाराष्ट्रात स्थानिक स्वराज्य संस्थांमध्ये महिलांसाठी किती टक्के आरक्षण (Women Reservation) लागू आहे?',
    questionEn: 'What percentage of seats are reserved for women in Local Self-Government institutions in Maharashtra?',
    optionsMr: [
      '२५%',
      '३३% (१/३)',
      '५०% (१/२)',
      '४०%'
    ],
    optionsEn: [
      '25%',
      '33% (1/3rd)',
      '50% (1/2)',
      '40%'
    ],
    correctOptionIndex: 2,
    explanationMr:
      'संविधानातील कलम २४३ D नुसार महिलांसाठी किमान ३३% (१/३) आरक्षणाची अट आहे; परंतु महाराष्ट्र शासनाने एप्रिल २०११ मध्ये सुधारणा करून महिला आरक्षण ५०% पर्यंत वाढवले आहे.',
    explanationEn:
      'While the Constitution mandates a minimum of 33% under Article 243D, Maharashtra legally enhanced women\'s reservation in all local bodies to 50% in April 2011.',
    pyqTag: 'MPSC राज्यसेवा पूर्व २०२०',
    topicCategory: 'maharashtra_act'
  },
  {
    id: 'pr_q8',
    questionMr: 'बलवंतराय मेहता समिती आणि वसंतराव नाईक समिती यांच्यातील प्रमुख फरक खालीलपैकी कोणता आहे?',
    questionEn: 'What is the principal structural difference between Balwant Rai Mehta Committee and Vasantrao Naik Committee recommendations?',
    optionsMr: [
      'बलवंतराय मेहतांनी द्विस्तरीय, तर वसंतराव नाईक यांनी त्रिस्तरीय पद्धत सुचवली.',
      'बलवंतराय मेहतांनी पंचायत समितीला मुख्य कार्यकारी मानले, तर वसंतराव नाईकांनी जिल्हा परिषदेला मुख्य कार्यकारी मानले.',
      'वसंतराव नाईक यांनी जिल्हाधिकाऱ्याला जिल्हा परिषदेचा अध्यक्ष केले.',
      'बलवंतराय मेहतांनी महिलांना ५०% आरक्षण दिले.'
    ],
    optionsEn: [
      'Balwant Rai suggested 2-tier, while Naik suggested 3-tier.',
      'Balwant Rai made Panchayat Samiti the chief executive body, while Vasantrao Naik made Zilla Parishad the chief executive powerhouse.',
      'Vasantrao Naik appointed District Collector as ZP President.',
      'Balwant Rai provided 50% reservation for women.'
    ],
    correctOptionIndex: 1,
    explanationMr:
      'अत्यंत महत्त्वाचा MPSC फरक: बलवंतराय मेहता समितीने पंचायत समिती (Block level) ला मुख्य कार्यकारी घटक मानले होते, तर वसंतराव नाईक समितीने जिल्हा परिषद (ZP) ला मुख्य आर्थिक व कार्यकारी सत्ताकेंद्र बनवले, ज्याला "महाराष्ट्र मॉडेल" म्हणतात.',
    explanationEn:
      'Balwant Rai Mehta envisioned Panchayat Samiti as the primary executive hub, whereas Maharashtra\'s Vasantrao Naik model placed Zilla Parishad at the apex executive command.',
    pyqTag: 'MPSC राज्यसेवा मुख्य GS-2',
    topicCategory: 'committees'
  },
  {
    id: 'pr_q9',
    questionMr: 'गावात जन्म, मृत्यू आणि विवाह यांची नोंदणी करणारा स्थानिक निबंधक (Registrar) म्हणून कोण काम पाहतो?',
    questionEn: 'Who acts as the statutory local Registrar of Births, Deaths, and Marriages at the village level?',
    optionsMr: [
      'पोलीस पाटील',
      'तलाठी',
      'ग्रामसेवक',
      'सरपंच'
    ],
    optionsEn: [
      'Police Patil',
      'Talathi',
      'Gramsevak',
      'Sarpanch'
    ],
    correctOptionIndex: 2,
    explanationMr:
      'गावात जन्म-मृत्यू नोंदणी कायदा १९६९ आणि महाराष्ट्र विवाह नोंदणी अधिनियमानुसार ग्रामसेवक हा स्थानिक निबंधक असतो. तलाठी हा महसूल व ७/१२ चे काम पाहतो, तर पोलीस पाटील कायदा-सुव्यवस्थेत मदत करतो.',
    explanationEn:
      'Under the Registration of Births and Deaths Act 1969 and Maharashtra Marriage Act, the Gramsevak serves as the statutory village Registrar.',
    pyqTag: 'MPSC पोलीस उपनिरीक्षक (PSI) मुख्य',
    topicCategory: 'officers'
  },
  {
    id: 'pr_q10',
    questionMr: 'पंचायतींच्या निवडणुका निष्पक्षपणे घेण्यासाठी ‘राज्य निवडणूक आयोगा’ची (State Election Commission) तरतूद कोणत्या कलमात आहे?',
    questionEn: 'Under which Article of the Constitution is the State Election Commission mandated to conduct Panchayat elections?',
    optionsMr: [
      'कलम ३२४',
      'कलम २४३ I',
      'कलम २४३ K',
      'कलम २४३ ZD'
    ],
    optionsEn: [
      'Article 324',
      'Article 243 I',
      'Article 243 K',
      'Article 243 ZD'
    ],
    correctOptionIndex: 2,
    explanationMr:
      'कलम २४३ K मध्ये राज्य निवडणूक आयोगाची तरतूद आहे. कलम ३२४ हे केंद्रीय निवडणूक आयोगासाठी (लोकसभा, राज्यसभा, राष्ट्रपती, विधानसभा) आहे, तर कलम २४३ I हे राज्य वित्त आयोगासाठी आहे.',
    explanationEn:
      'Article 243K mandates the State Election Commission for panchayat elections. (Article 324 governs the Central Election Commission of India, and 243I governs the State Finance Commission).',
    pyqTag: 'MPSC संयुक्त गट-ब पूर्व २०२२',
    topicCategory: 'constitution'
  }
];

// ----------------------------------------------------------------------------
// 5. EXAM CHEATSHEET & MEMORY TRICKS
// ----------------------------------------------------------------------------
export const PANCHAYATI_RAJ_MEMORY_TRICKS = [
  {
    titleMr: 'समित्यांचा क्रम लक्षात ठेवण्याची सुपर ट्रिक (B-A-G-L-T):',
    titleEn: 'Chronological Committee Sequence Trick (B-A-G-L-T):',
    trickFormula: 'ब -> अ -> जी -> एल -> थु (B -> A -> G -> L -> T)',
    explanationMr:
      '१. बलवंतराय मेहता (१९५७) -> २. अशोक मेहता (१९७७) -> ३. जी. व्ही. के. राव (१९८५) -> ४. एल. एम. सिंघवी (१९८६) -> ५. पी. के. थुंगन (१९८८)',
    explanationEn:
      '1. Balwant Rai (1957) -> 2. Ashok Mehta (1977) -> 3. GVK Rao (1985) -> 4. LM Singhvi (1986) -> 5. PK Thungon (1988)'
  },
  {
    titleMr: 'महाराष्ट्रातील पंचायत राज दिन व महत्त्वाच्या तारखा:',
    titleEn: 'Key Maharashtra Milestones & Dates:',
    trickFormula: '१ मे १९६२: महाराष्ट्र पंचायत राज स्थापना (९ वे राज्य)',
    explanationMr:
      'भारतातील पहिले राज्य: राजस्थान (नागौर - २ ऑक्टोबर १९५९), दुसरे: आंध्र प्रदेश (१९५९). महाराष्ट्र हे नववे राज्य (१ मे १९६२ - वसंतराव नाईक समिती अहवालानुसार).',
    explanationEn:
      '1st state: Rajasthan (Nagaur, 2 Oct 1959). 2nd: Andhra Pradesh. Maharashtra: 9th state on 1 May 1962.'
  },
  {
    titleMr: 'कलमे २४३ A ते K लक्षात ठेवण्याचे सूत्र:',
    titleEn: 'Articles 243A to 243K Memory Mnemonics:',
    trickFormula: 'A=Assembly (ग्रामसभा) | B=Build (रचना) | C=Composition | D=Divisions (आरक्षण) | E=Expiration (५ वर्षे) | F=Failure (अपात्रता) | G=Grievance/Grip (अधिकार) | I=Income (वित्त आयोग) | K=Karyakarta Election (निवडणूक आयोग)',
    explanationMr:
      'A: ग्रामसभा | B: त्रिस्तरीय बांधणी | C: सदस्यांची रचना | D: दलित/महिला आरक्षण | E: पंचायतींचे ५ वर्षे | F: २१ वर्षे अपात्रता | G: २९ अधिकार | I: राज्य वित्त आयोग | K: निवडणूक आयोग.',
    explanationEn:
      'A: Gram Sabha | B: 3-tier building | C: Composition | D: Reservation | E: 5-year duration | F: Disqualification | G: 29 Powers | I: Finance Commission | K: Election Commission.'
  }
];
