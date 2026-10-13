// District-Specific Comprehensive Question Generator for MPSC Aspirants
// Generates up to 20 targeted, authentic bilingual MPSC questions per district
// Covering Geography, History, Economy, Talukas, Demographics, and MPSC Golden Facts
// With balanced answer distributions (A, B, C, D) and authentic Maharashtra distractors

import { Question } from '../types';
import { MAHARASHTRA_DISTRICTS_DATA, MAHARASHTRA_DIVISIONS, MaharashtraDistrict } from './maharashtraDistrictsData';

// Helper to pick distinct items from an array that are NOT in excluded list
function pickDistractors(pool: string[], excluded: string[], count: number = 3): string[] {
  const filtered = pool.filter(item => !excluded.some(ex => ex.toLowerCase() === item.toLowerCase()));
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Pool of authentic Maharashtra rivers across various basins
const MAHA_RIVERS_POOL = [
  'गोदावरी नदी', 'भीमा नदी', 'कृष्णा नदी', 'तापी नदी', 'वैनगंगा नदी',
  'वर्धा नदी', 'पैनगंगा नदी', 'उल्हास नदी', 'वैतरणा नदी', 'सावित्री नदी',
  'कुंडलिका नदी', 'शास्त्री नदी', 'तेरेखोल नदी', 'प्रवरा नदी', 'मुळा-मुठा नदी',
  'इंद्रायणी नदी', 'घोड नदी', 'सीना नदी', 'बिंदुसरा नदी', 'कयाधू नदी',
  'पूर्णा नदी', 'काण्हन नदी', 'पेंच नदी', 'बावनथडी नदी', 'इंद्रावती नदी'
];

// Pool of authentic Maharashtra forts
const MAHA_FORTS_POOL = [
  'रायगड किल्ला', 'राजगड किल्ला', 'सिंहगड किल्ला', 'शिवनेरी किल्ला',
  'प्रतापगड किल्ला', 'पन्हाळा किल्ला', 'सिंधुदुर्ग जलदुर्ग', 'विजयदुर्ग किल्ला',
  'दौलताबाद (देवगिरी) किल्ला', 'मुरुड-जंजिरा जलदुर्ग', 'अजिंक्यतारा किल्ला',
  'साल्हेर किल्ला', 'तोरणा किल्ला', 'लोहगड किल्ला', 'अहिवंत किल्ला',
  'गाविलगड किल्ला', 'नळदुर्ग किल्ला', 'कंधार किल्ला', 'महिपतगड किल्ला'
];

// Pool of authentic Maharashtra sanctuaries & national parks
const MAHA_SANCTUARIES_POOL = [
  'ताडोबा-अंधारी राष्ट्रीय उद्यान', 'मेळघाट व्याघ्र प्रकल्प व अभयारण्य',
  'पेंच (जवाहरलाल नेहरू) राष्ट्रीय उद्यान', 'संजय गांधी राष्ट्रीय उद्यान (बोरिवली)',
  'गुगामल राष्ट्रीय उद्यान', 'चांदोली राष्ट्रीय उद्यान', 'राधानगरी (दाजीपूर) गवे अभयारण्य',
  'कोयना वन्यजीव अभयारण्य', 'भीमाशंकर शेकरू अभयारण्य', 'मयूरेश्वर (सुपे) चिंकारा अभयारण्य',
  'माळढोक पक्षी अभयारण्य (नान्नज)', 'कर्नाळा पक्षी अभयारण्य', 'फणसाड वन्यजीव अभयारण्य',
  'नागझिरा वन्यजीव अभयारण्य', 'टिपेश्वर वन्यजीव अभयारण्य', 'काटेपूर्णा अभयारण्य',
  'नांदूर मध्यमेश्वर पक्षी अभयारण्य'
];

// Pool of authentic Maharashtra agricultural cash crops & GI crops
const MAHA_CROPS_POOL = [
  'हापूस आंबा (GI मानांकन)', 'द्राक्षे व बेदाणा (द्राक्षपंढरी)', 'सोयाबीन व कापूस (पांढरे सोने)',
  'हळद (सांगली/हिंगोली)', 'ऊस व गूळ (कोल्हापूर/पुणे)', 'डाळिंब (भगवा जात)',
  'संत्री (नागपूर/अमरावती)', 'केळी (जळगाव)', 'कांदा (लासलगाव)',
  'ज्वारी (मालदांडी जात)', 'काजू व नारळ (कोकण पट्टा)', 'भात/तांदूळ (वाडा कोलम व आंबेमोहोर)'
];

// Pool of authentic Maharashtra industrial, mineral and economic hubs
const MAHA_INDUSTRIES_POOL = [
  'ऑटोमोबाईल व IT पार्क हब (हिंजवडी/तळेगाव/चाकण)',
  'मँगनीज, लोहखनिज व दगडी कोळसा खाणी',
  'कापड उद्योग व टेक्स्टाईल हब (इचलकरंजी/सोलापूर)',
  'पेट्रोकेमिकल, रासायनिक व बंदरे लॉजिस्टिक्स (JNPT/उरण)',
  'इलेक्ट्रॉनिक्स व अभियांत्रिकी MIDC वसाहती',
  'औष्णिक विद्युत केंद्र (कोराडी/खापरखेडा/परळी)',
  'सिमेंट व चुनखडी उद्योग हब',
  'साखर कारखाने व डिस्टिलरी संकुल'
];

// Pool of authentic Maharashtra RTO codes
const MAHA_RTO_POOL = [
  'MH-01 (मुंबई मध्य)', 'MH-02 (मुंबई पश्चिम)', 'MH-04 (ठाणे)', 'MH-09 (कोल्हापूर)',
  'MH-11 (सातारा)', 'MH-12 (पुणे शहर)', 'MH-14 (पिंपरी चिंचवड)', 'MH-15 (नाशिक)',
  'MH-17 (अहिल्यानगर)', 'MH-19 (जळगाव)', 'MH-20 (छ. संभाजीनगर)', 'MH-24 (लातूर)',
  'MH-26 (नांदेड)', 'MH-27 (अमरावती)', 'MH-31 (नागपूर शहर)', 'MH-34 (चंद्रपूर)'
];

// Pool of famous talukas across Maharashtra
const MAHA_TALUKAS_POOL = [
  'शिरूर', 'माळशिरस', 'पारनेर', 'गंगापूर', 'महाड', 'चिपळूण', 'देवगड', 'वरोरा',
  'आरमोरी', 'अहेरी', 'दर्यापूर', 'उमरखेड', 'मोर्शी', 'नांदगाव खंडेश्वर', 'चाकूर',
  'कळंब', 'भोकरदन', 'मंठा', 'पाथर्डी', 'संगमनेर', 'इंदापूर', 'बारामती', 'कराड',
  'मिरज', 'शाहूवाडी', 'कणकवली', 'कुडाळ', 'रोहा', 'पेण', 'शहापूर', 'मुरबाड'
];

// Pool of authentic Maharashtra headquarters
const MAHA_HQ_POOL = [
  'पुणे', 'छत्रपती संभाजीनगर', 'नागपूर', 'नाशिक', 'अमरावती', 'ठाणे',
  'कोल्हापूर', 'सातारा', 'सोलापूर', 'जळगाव', 'लातूर', 'नांदेड', 'चंद्रपूर'
];

// Helper to place correct answer at specified target index and fill remaining with distractors
function buildOptions(
  correctMr: string,
  correctEn: string,
  distractorsMr: string[],
  distractorsEn: string[],
  targetIdx: number
) {
  const finalOptionsMr: string[] = [];
  const finalOptionsEn: string[] = [];
  let dIdx = 0;

  for (let i = 0; i < 4; i++) {
    if (i === targetIdx) {
      finalOptionsMr.push(correctMr);
      finalOptionsEn.push(correctEn);
    } else {
      finalOptionsMr.push(distractorsMr[dIdx] || 'इतर पर्याय');
      finalOptionsEn.push(distractorsEn[dIdx] || 'Other Option');
      dIdx++;
    }
  }

  return {
    optionsMr: finalOptionsMr,
    optionsEn: finalOptionsEn,
    correctAnswerIndex: targetIdx
  };
}

// Generates high-yield, targeted bilingual MPSC questions for a given district (up to 20 Qs)
export function generateDistrictQuestions(district: MaharashtraDistrict, count: number = 20): Question[] {
  const d = district;
  const distId = d.id;
  const nameMr = d.nameMr;
  const nameEn = d.nameEn;

  // Balanced correct answer positions across up to 20 questions:
  // 5 of each (A=0, B=1, C=2, D=3)
  const targetAnswerPositions = [
    1, 2, 0, 3, 2,  // Q1-5
    1, 3, 0, 1, 2,  // Q6-10
    0, 3, 1, 2, 0,  // Q11-15
    3, 1, 2, 0, 0   // Q16-20
  ];

  const otherDistricts = MAHARASHTRA_DISTRICTS_DATA.filter(dist => dist.id !== d.id);
  const otherDivisions = MAHARASHTRA_DIVISIONS.filter(div => div.id !== d.divisionId);

  // --- Q1: प्रमुख नदी व जलप्रणाली (Target Index: 1) ---
  const correctRiver = d.majorRiversMr[0] || 'स्थानिक नदीप्रणाली';
  const riverDistractors = pickDistractors(MAHA_RIVERS_POOL, d.majorRiversMr, 3);
  const q1Options = buildOptions(correctRiver, correctRiver, riverDistractors, riverDistractors, targetAnswerPositions[0]);

  // --- Q2: प्रशासकीय विभाग व तालुके (Target Index: 2) ---
  const correctDivTaluka = `${d.divisionNameMr} (एकूण ${d.talukasCount} तालुके)`;
  const divDistractorsMr = [
    `${otherDivisions[0]?.nameMr || 'कोकण विभाग'} (एकूण १५ तालुके)`,
    `${otherDivisions[1]?.nameMr || 'नागपूर विभाग'} (एकूण ४ तालुके)`,
    `${otherDivisions[2]?.nameMr || 'अमरावती विभाग'} (एकूण २१ तालुके)`
  ];
  const divDistractorsEn = [
    `${otherDivisions[0]?.nameEn || 'Konkan'} (15 talukas)`,
    `${otherDivisions[1]?.nameEn || 'Nagpur'} (4 talukas)`,
    `${otherDivisions[2]?.nameEn || 'Amravati'} (21 talukas)`
  ];
  const q2Options = buildOptions(correctDivTaluka, `${d.divisionNameEn} Division (${d.talukasCount} talukas)`, divDistractorsMr, divDistractorsEn, targetAnswerPositions[1]);

  // --- Q3: वने व अभयारण्ये (Target Index: 0) ---
  const correctSanctuary = d.sanctuariesAndParksMr[0] || `${nameMr} नैसर्गिक/जंगल क्षेत्र`;
  const sanctuaryDistractors = pickDistractors(MAHA_SANCTUARIES_POOL, d.sanctuariesAndParksMr, 3);
  const q3Options = buildOptions(correctSanctuary, correctSanctuary, sanctuaryDistractors, sanctuaryDistractors, targetAnswerPositions[2]);

  // --- Q4: क्षेत्रफळ व जनगणना २०११ (Target Index: 3) ---
  const correctCensus = `साक्षरता दर सुमारे ${d.literacyRatePercent}% आणि लिंगगुणोत्तर ${d.sexRatio} (क्षेत्रफळ: ${d.areaSqKm.toLocaleString('en-IN')} चौ.किमी)`;
  const censusDistractorsMr = [
    `साक्षरता दर ९९.५% आणि लिंगगुणोत्तर १२५० (क्षेत्रफळ: २५,००० चौ.किमी)`,
    `साक्षरता दर केवळ ३८.२% आणि लिंगगुणोत्तर ६२० (क्षेत्रफळ: ५०० चौ.किमी)`,
    `साक्षरता दर ५१.०% आणि लिंगगुणोत्तर ७५० (क्षेत्रफळ: २,१०० चौ.किमी)`
  ];
  const censusDistractorsEn = [
    `Literacy 99.5% and sex ratio 1250 (Area: 25,000 sq.km)`,
    `Literacy 38.2% and sex ratio 620 (Area: 500 sq.km)`,
    `Literacy 51.0% and sex ratio 750 (Area: 2,100 sq.km)`
  ];
  const q4Options = buildOptions(correctCensus, `Literacy ~${d.literacyRatePercent}% and sex ratio ${d.sexRatio} (Area: ${d.areaSqKm} sq.km)`, censusDistractorsMr, censusDistractorsEn, targetAnswerPositions[3]);

  // --- Q5: तालुका ओळख (Target Index: 2) ---
  const correctTaluka = d.prominentTalukasMr[0] || `${nameMr} शहर तालुका`;
  const talukaDistractors = pickDistractors(MAHA_TALUKAS_POOL, d.prominentTalukasMr, 3);
  const q5Options = buildOptions(correctTaluka, correctTaluka, talukaDistractors, talukaDistractors, targetAnswerPositions[4]);

  // --- Q6: किल्ले व शिवकालीन वारसा (Target Index: 1) ---
  const correctFort = d.historicalFortsMr[0] || `${nameMr} ऐतिहासिक वारसा स्थळ`;
  const fortDistractors = pickDistractors(MAHA_FORTS_POOL, d.historicalFortsMr, 3);
  const q6Options = buildOptions(correctFort, correctFort, fortDistractors, fortDistractors, targetAnswerPositions[5]);

  // --- Q7: स्वातंत्र्यलढा व समाजसुधारक (Target Index: 3) ---
  const correctFact = d.mpscGoldenFactsMr[0] || `${nameMr} मधील स्वातंत्र्यलढा व ऐतिहासिक चळवळ`;
  const factDistractorsMr = [
    otherDistricts[0]?.mpscGoldenFactsMr[0] || 'महाराष्ट्रातील पहिले साक्षर गाव स्थापना',
    otherDistricts[1]?.mpscGoldenFactsMr[0] || 'सर्वाधिक साखर कारखाने असलेला जिल्हा',
    otherDistricts[2]?.mpscGoldenFactsMr[0] || '३६ वा नव्याने निर्माण झालेला जिल्हा'
  ];
  const factDistractorsEn = [
    'Historical reform center from Western Maharashtra',
    'Oldest cotton textile mill center',
    '36th newly formed district of Maharashtra'
  ];
  const q7Options = buildOptions(correctFact, correctFact, factDistractorsMr, factDistractorsEn, targetAnswerPositions[6]);

  // --- Q8: प्राचीन व मध्ययुगीन इतिहास (Target Index: 0) ---
  const ancientCorrectMr = `सातवाहन, वाकाटक, यादव किंवा मराठा साम्राज्यातील प्राचीन वारसा व मंदिरे (${d.historicalFortsMr.slice(0, 2).join(', ') || d.nameMr})`;
  const ancientCorrectEn = `Ancient heritage and inscriptions from Satavahana, Yadava, or Maratha empires.`;
  const ancientDistractorsMr = [
    'या जिल्ह्यात मानवी संस्कृतीचा इतिहास केवळ २० वर्षांपूर्वी सुरू झाला.',
    'या जिल्ह्याचा कोणताही उल्लेख मध्ययुगीन अथवा प्राचीन इतिहासात आढळत नाही.',
    'हा भाग केवळ परकीय डच वसाहतीचे मुख्यालय म्हणून स्थापन झाला होता.'
  ];
  const ancientDistractorsEn = [
    'Human settlement only began 20 years ago in this region.',
    'Region is not mentioned in any historical records.',
    'Region was established solely as a foreign Dutch trading port.'
  ];
  const q8Options = buildOptions(ancientCorrectMr, ancientCorrectEn, ancientDistractorsMr, ancientDistractorsEn, targetAnswerPositions[7]);

  // --- Q9: कृषी व प्रमुख पिके (Target Index: 1) ---
  const correctCrop = d.majorCropsMr.join(', ') || 'स्थानिक खरीप व रब्बी पिके';
  const cropDistractors = pickDistractors(MAHA_CROPS_POOL, d.majorCropsMr, 3);
  const q9Options = buildOptions(correctCrop, correctCrop, cropDistractors, cropDistractors, targetAnswerPositions[8]);

  // --- Q10: खनिजे, उद्योग व MIDC (Target Index: 2) ---
  const correctIndustry = d.mineralsAndIndustriesMr.join(', ') || 'स्थानिक MIDC व कृषी प्रक्रिया उद्योग';
  const industryDistractors = pickDistractors(MAHA_INDUSTRIES_POOL, d.mineralsAndIndustriesMr, 3);
  const q10Options = buildOptions(correctIndustry, correctIndustry, industryDistractors, industryDistractors, targetAnswerPositions[9]);

  // --- Q11: RTO कोड व दळणवळण (Target Index: 0) ---
  const correctRto = `${d.rtoCode} (${nameMr} RTO कार्यालय)`;
  const rtoDistractors = pickDistractors(MAHA_RTO_POOL, [d.rtoCode], 3);
  const q11Options = buildOptions(correctRto, `${d.rtoCode} (${nameEn} RTO Series)`, rtoDistractors, rtoDistractors, targetAnswerPositions[10]);

  // --- Q12: जलप्रकल्प व धरणे (Target Index: 3) ---
  const riversJoint = d.majorRiversMr.slice(0, 2).join(' व ');
  const correctWaterMr = `${riversJoint} खोरे व त्यावरील स्थानिक पाझर/सिंचन प्रकल्प`;
  const waterDistractorsMr = [
    'कावेरी नदी व मेत्तूर जलाशय सिंचन प्रकल्प',
    'नर्मदा खोऱ्यातील भाक्रा-नांगल प्रकल्प',
    'दामोदर व्हॅली कॉर्पोरेशन सिंचन प्रकल्प'
  ];
  const q12Options = buildOptions(correctWaterMr, `${riversJoint} Basin Irrigation`, waterDistractorsMr, waterDistractorsMr, targetAnswerPositions[11]);

  // --- Q13: मुख्यालय व प्रशासकीय केंद्र (Target Index: 1) ---
  const correctHq = `${d.hqMr} (${nameMr} जिल्हा मुख्यालय)`;
  const hqDistractors = pickDistractors(MAHA_HQ_POOL, [d.hqMr], 3);
  const q13Options = buildOptions(correctHq, `${d.hqEn} HQ`, hqDistractors, hqDistractors, targetAnswerPositions[12]);

  // --- Q14: तालुके समूह (Target Index: 2) ---
  const talukaGroupCorrect = d.prominentTalukasMr.slice(0, 3).join(', ') || `${d.hqMr}`;
  const talukaGroupDistractors = [
    'बारामती, शिरूर, हवेली',
    'करवीर, पन्हाळा, शिरोळ',
    'अंबाजोगाई, परळी, गेवराई'
  ].filter(grp => !grp.includes(d.nameMr));
  const q14Options = buildOptions(talukaGroupCorrect, talukaGroupCorrect, talukaGroupDistractors.slice(0, 3), talukaGroupDistractors.slice(0, 3), targetAnswerPositions[13]);

  // --- Q15: MPSC सुवर्ण तथ्य २ (Target Index: 0) ---
  const correctGoldenFact2 = d.mpscGoldenFactsMr[1] || d.mpscGoldenFactsMr[0];
  const fact2Distractors = [
    'सर्वाधिक समुद्रकिनारा लाभलेला जिल्हा',
    'भारतातील पहिली सहकारी साखर कारखाना स्थापना',
    'महाराष्ट्रातील सर्वात कमी पावसाचा तालुका'
  ];
  const q15Options = buildOptions(correctGoldenFact2, correctGoldenFact2, fact2Distractors, fact2Distractors, targetAnswerPositions[14]);

  // --- Q16: नैसर्गिक व वन्यजीव संपत्ती (Target Index: 3) ---
  const sanctuaryDetailsMr = `येथे ${d.sanctuariesAndParksMr.join(', ')} हे जैवविविधतेसाठी प्रसिद्ध नैसर्गिक क्षेत्र आहे.`;
  const sanctuaryDistractors2 = [
    'येथे केवळ बर्फाच्छादित हिमनद्या आणि टुंड्रा प्रदेश आढळतो.',
    'या जिल्ह्यात कोणत्याही प्रकारची वनस्पती किंवा झाडे आढळत नाहीत.',
    'हा संपूर्ण जिल्हा पूर्णपणे खाऱ्या पाण्याच्या दलदलीत येतो.'
  ];
  const q16Options = buildOptions(sanctuaryDetailsMr, sanctuaryDetailsMr, sanctuaryDistractors2, sanctuaryDistractors2, targetAnswerPositions[15]);

  // --- Q17: ऐतिहासिक वास्तू व किल्लेवारसा २ (Target Index: 1) ---
  const secondFort = d.historicalFortsMr[1] || d.historicalFortsMr[0];
  const fortDistractors2 = pickDistractors(MAHA_FORTS_POOL, [secondFort], 3);
  const q17Options = buildOptions(secondFort, secondFort, fortDistractors2, fortDistractors2, targetAnswerPositions[16]);

  // --- Q18: स्थानिक उत्पादन व कृषी वैशिष्ट्य (Target Index: 2) ---
  const cropFeature = `${d.majorCropsMr[0]} उत्पादन व स्थानिक बाजारपेठ हब`;
  const cropDistractors2 = [
    'केवळ केशर आणि अक्रोड बागा',
    'मोठ्या प्रमाणावर कॉफीच्या मळ्यांची लागवड',
    'केवळ रबर व लवंग उत्पादन'
  ];
  const q18Options = buildOptions(cropFeature, cropFeature, cropDistractors2, cropDistractors2, targetAnswerPositions[17]);

  // --- Q19: २०११ लिंगगुणोत्तर विशेष (Target Index: 0) ---
  const correctSexRatio = `दर १००० पुरुषांमागे ${d.sexRatio} स्त्रिया`;
  const sexRatioDistractors = ['दर १००० पुरुषांमागे ६५० स्त्रिया', 'दर १००० पुरुषांमागे ४०० स्त्रिया', 'दर १००० पुरुषांमागे १५०० स्त्रिया'];
  const q19Options = buildOptions(correctSexRatio, `${d.sexRatio} females per 1000 males`, sexRatioDistractors, sexRatioDistractors, targetAnswerPositions[18]);

  // --- Q20: सर्वंकष जिल्हा बहुपर्यायी पुनरावलोकन (Target Index: 0) ---
  const allTrueMr = `सर्व विधाने (अ, ब आणि क) सत्य आहेत`;
  const allTrueEn = `All statements (A, B and C) are true`;
  const multiDistractorsMr = [
    'केवळ विधान (अ) सत्य आहे',
    'केवळ विधान (ब) सत्य आहे',
    'सर्व विधाने असत्य आहेत'
  ];
  const multiDistractorsEn = [
    'Only statement (A) is true',
    'Only statement (B) is true',
    'All statements are false'
  ];
  const q20Options = buildOptions(allTrueMr, allTrueEn, multiDistractorsMr, multiDistractorsEn, targetAnswerPositions[19]);

  // Compile full 20 questions bank
  const allQuestions: Question[] = [
    // 1. GEOGRAPHY Q1: प्रमुख नदी व खोरे
    {
      id: `dist_${distId}_geo_1`,
      questionMr: `${nameMr} जिल्ह्यामधून वाहणारी खालीलपैकी कोणती प्रमुख नदी किंवा जलप्रणाली या जिल्ह्याच्या सिंचनाचा मुख्य आधार आहे?`,
      questionEn: `Which of the following is a major river flowing through ${nameEn} district?`,
      optionsMr: q1Options.optionsMr,
      optionsEn: q1Options.optionsEn,
      correctAnswerIndex: q1Options.correctAnswerIndex,
      explanationMr: `${nameMr} जिल्ह्यातील प्रमुख नद्यांमध्ये ${d.majorRiversMr.join(', ')} यांचा समावेश होतो. ही जलप्रणाली या जिल्ह्याच्या कृषी व सिंचनाचा मुख्य आधार आहे.`,
      explanationEn: `Major rivers in ${nameEn} district include ${d.majorRiversMr.join(', ')}.`,
      subjectId: 'maharashtra_geography',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: `${nameMr} नदीप्रणाली`,
      exam: 'Both',
      difficulty: 'Moderate',
      reference: 'MPSC महाराष्ट्र भूगोल संदर्भ व जिल्हा गॅझेटियर'
    },

    // 2. GEOGRAPHY Q2: प्रशासकीय विभाग व तालुके
    {
      id: `dist_${distId}_geo_2`,
      questionMr: `${nameMr} हा जिल्हा खालीलपैकी कोणत्या महसुली/प्रशासकीय विभागाचा भाग असून या जिल्ह्यात एकूण किती तालुके आहेत?`,
      questionEn: `In which administrative division is ${nameEn} district located and how many talukas does it have?`,
      optionsMr: q2Options.optionsMr,
      optionsEn: q2Options.optionsEn,
      correctAnswerIndex: q2Options.correctAnswerIndex,
      explanationMr: `${nameMr} हा जिल्हा ${d.divisionNameMr}ामध्ये येतो. या जिल्ह्याचे प्रशासकीय मुख्यालय ${d.hqMr} येथे असून जिल्ह्यात एकूण ${d.talukasCount} तालुके आहेत. प्रमुख तालुके: ${d.prominentTalukasMr.slice(0, 4).join(', ')}.`,
      explanationEn: `${nameEn} belongs to ${d.divisionNameEn} division with headquarters at ${d.hqEn} and ${d.talukasCount} talukas.`,
      subjectId: 'maharashtra_geography',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: 'प्रशासकीय भूगोल',
      exam: 'Both',
      difficulty: 'Moderate',
      reference: 'महाराष्ट्र महसूल प्रशासन व जिल्हा सांख्यिकी'
    },

    // 3. GEOGRAPHY Q3: वने, राष्ट्रीय उद्याने व अभयारण्ये
    {
      id: `dist_${distId}_geo_3`,
      questionMr: `${nameMr} जिल्हा किंवा त्याच्या सीमावर्ती भागात खालीलपैकी कोणते राष्ट्रीय उद्यान, अभयारण्य किंवा नैसर्गिक वैशिष्ट्य आढळते?`,
      questionEn: `Which of the following sanctuary, national park, or geographic landmark is associated with ${nameEn}?`,
      optionsMr: q3Options.optionsMr,
      optionsEn: q3Options.optionsEn,
      correctAnswerIndex: q3Options.correctAnswerIndex,
      explanationMr: `${nameMr} जिल्ह्यात ${d.sanctuariesAndParksMr.join(', ')} हे अभयारण्य/नैसर्गिक स्थळ जैवविविधतेसाठी प्रसिद्ध आहे.`,
      explanationEn: `Key ecological feature in ${nameEn} includes ${d.sanctuariesAndParksMr.join(', ')}.`,
      subjectId: 'maharashtra_geography',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: 'वने व अभयारण्ये',
      exam: 'Both',
      difficulty: 'Hard',
      reference: 'महाराष्ट्र वन विभाग व जैवविविधता अहवाल'
    },

    // 4. GEOGRAPHY Q4: क्षेत्रफळ व लोकसंख्या वैशिष्ट्ये (२०११ जनगणना)
    {
      id: `dist_${distId}_geo_4`,
      questionMr: `२०११ च्या जनगणनेनुसार ${nameMr} जिल्ह्याचा साक्षरता दर, लिंगगुणोत्तर व क्षेत्रफळाबाबत खालीलपैकी कोणते विधान बरोबर आहे?`,
      questionEn: `According to 2011 Census, which of the following is correct regarding ${nameEn} district?`,
      optionsMr: q4Options.optionsMr,
      optionsEn: q4Options.optionsEn,
      correctAnswerIndex: q4Options.correctAnswerIndex,
      explanationMr: `२०११ च्या जनगणनेनुसार ${nameMr} जिल्ह्याचे क्षेत्रफळ ${d.areaSqKm.toLocaleString('en-IN')} चौ.किमी, साक्षरता दर ${d.literacyRatePercent}% आणि लिंगगुणोत्तर दर हजार पुरुषांमागे ${d.sexRatio} स्त्रिया इतके आहे.`,
      explanationEn: `According to 2011 census, ${nameEn} has an area of ${d.areaSqKm} sq.km, literacy rate of ${d.literacyRatePercent}%, and sex ratio of ${d.sexRatio}.`,
      subjectId: 'maharashtra_geography',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: 'लोकसंख्या भूगोल',
      exam: 'Both',
      difficulty: 'Moderate',
      reference: 'भारताची जनगणना २०११ - महाराष्ट्र सांख्यिकी'
    },

    // 5. GEOGRAPHY Q5: विशिष्ट तालुके ओळखणे
    {
      id: `dist_${distId}_geo_5`,
      questionMr: `खालीलपैकी कोणता तालुका हा ${nameMr} जिल्ह्यातील प्रमुख तालुका आहे?`,
      questionEn: `Which of the following is a prominent taluka of ${nameEn} district?`,
      optionsMr: q5Options.optionsMr,
      optionsEn: q5Options.optionsEn,
      correctAnswerIndex: q5Options.correctAnswerIndex,
      explanationMr: `${nameMr} जिल्ह्यातील तालुक्यांमध्ये ${d.prominentTalukasMr.join(', ')} यांचा समावेश होतो.`,
      explanationEn: `Prominent talukas in ${nameEn} include ${d.prominentTalukasMr.join(', ')}.`,
      subjectId: 'maharashtra_geography',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: 'तालुका प्रशासन',
      exam: 'Both',
      difficulty: 'Moderate',
      reference: 'महाराष्ट्र जिल्हा सांख्यिकी अहवाल'
    },

    // 6. HISTORY Q6: किल्ले व शिवकालीन इतिहास
    {
      id: `dist_${distId}_hist_1`,
      questionMr: `छत्रपती शिवाजी महाराज, मराठा साम्राज्य किंवा ऐतिहासिक कालखंडाशी संबंधित खालीलपैकी कोणता किल्ला/ऐतिहासिक वास्तू ${nameMr} जिल्ह्याशी संबंधित आहे?`,
      questionEn: `Which of the following historical fort or heritage site is located in or associated with ${nameEn} district?`,
      optionsMr: q6Options.optionsMr,
      optionsEn: q6Options.optionsEn,
      correctAnswerIndex: q6Options.correctAnswerIndex,
      explanationMr: `${nameMr} जिल्ह्यात ${d.historicalFortsMr.join(', ')} हे किल्ले व ऐतिहासिक वास्तू मराठेशाहीच्या शौर्याच्या साक्षीदार आहेत.`,
      explanationEn: `Historical forts and sites in ${nameEn} include ${d.historicalFortsMr.join(', ')}.`,
      subjectId: 'maharashtra_history',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: 'ऐतिहासिक किल्ले व वारसा',
      exam: 'Both',
      difficulty: 'Moderate',
      reference: 'महाराष्ट्र इतिहास व मराठा साम्राज्य संदर्भ'
    },

    // 7. HISTORY Q7: स्वातंत्र्यलढा, सत्याग्रह व महत्त्वाचे मुद्दे
    {
      id: `dist_${distId}_hist_2`,
      questionMr: `MPSC परीक्षेच्या दृष्टीने ${nameMr} जिल्ह्याचे ऐतिहासिक व सामाजिक योगदान खालीलपैकी कोणत्या घटकामुळे विशेष ओळखले जाते?`,
      questionEn: `In modern Maharashtra history, the contribution of ${nameEn} district is prominently noted for which aspect?`,
      optionsMr: q7Options.optionsMr,
      optionsEn: q7Options.optionsEn,
      correctAnswerIndex: q7Options.correctAnswerIndex,
      explanationMr: `MPSC परीक्षेच्या दृष्टीने महत्त्वाचा मुद्दा: ${d.mpscGoldenFactsMr.join(' तसेच ')}`,
      explanationEn: `Key exam point for ${nameEn}: ${d.mpscGoldenFactsMr.join(' Also, ')}`,
      subjectId: 'maharashtra_history',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: 'स्वातंत्र्य चळवळ व समाजसुधारक',
      exam: 'Both',
      difficulty: 'Hard',
      reference: 'आधुनिक महाराष्ट्राचा इतिहास व समाजसुधारक'
    },

    // 8. HISTORY Q8: ऐतिहासिक मंदिरे, वास्तू व प्राचीन संदर्भ
    {
      id: `dist_${distId}_hist_3`,
      questionMr: `${nameMr} जिल्ह्याच्या प्राचीन व मध्ययुगीन सांस्कृतिक वारशाबाबत खालीलपैकी कोणते विधान सत्य आहे?`,
      questionEn: `Regarding the ancient and medieval history of ${nameEn} district, which statement is true?`,
      optionsMr: q8Options.optionsMr,
      optionsEn: q8Options.optionsEn,
      correctAnswerIndex: q8Options.correctAnswerIndex,
      explanationMr: `${nameMr} जिल्ह्याचा समृद्ध सांस्कृतिक इतिहास असून येथे प्राचीन राजसत्तांच्या काळातील मंदिरे, वास्तू व संस्कृती जतन केलेली आढळते. प्रमुख ऐतिहासिक संदर्भ: ${d.historicalFortsMr.join(', ')}.`,
      explanationEn: `${nameEn} has deep historical heritage spanning ancient to Maratha dynasties.`,
      subjectId: 'maharashtra_history',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: 'प्राचीन व मध्ययुगीन इतिहास',
      exam: 'Both',
      difficulty: 'Moderate',
      reference: 'महाराष्ट्र पुरातत्त्व व सांस्कृतिक कार्य संचालनालय'
    },

    // 9. ECONOMY Q9: कृषी व प्रमुख पिके (GI मानांकने)
    {
      id: `dist_${distId}_econ_1`,
      questionMr: `${nameMr} जिल्ह्यामध्ये प्रामुख्याने खालीलपैकी कोणत्या पिकांची मोठ्या प्रमाणावर लागवड केली जाते?`,
      questionEn: `Which of the following crops are predominantly cultivated in ${nameEn} district?`,
      optionsMr: q9Options.optionsMr,
      optionsEn: q9Options.optionsEn,
      correctAnswerIndex: q9Options.correctAnswerIndex,
      explanationMr: `${nameMr} जिल्ह्यातील प्रमुख पिके: ${d.majorCropsMr.join(', ')}. या पिकांमुळे स्थानिक शेतकऱ्यांना व बाजारपेठांना आर्थिक स्थैर्य मिळते.`,
      explanationEn: `Predominant crops of ${nameEn} include ${d.majorCropsMr.join(', ')}.`,
      subjectId: 'maharashtra_geography',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: 'कृषी व पिके',
      exam: 'Both',
      difficulty: 'Easy',
      reference: 'महाराष्ट्र कृषी सांख्यिकी व कृषी विद्यापीठे'
    },

    // 10. ECONOMY Q10: खनिजे, उद्योग व वसाहती (MIDC)
    {
      id: `dist_${distId}_econ_2`,
      questionMr: `${nameMr} जिल्ह्याच्या औद्योगिकीकरण आणि आर्थिक रचनेबाबत खालीलपैकी कोणता पर्याय सर्वात योग्य आहे?`,
      questionEn: `Which of the following is most accurate regarding minerals and industries in ${nameEn} district?`,
      optionsMr: q10Options.optionsMr,
      optionsEn: q10Options.optionsEn,
      correctAnswerIndex: q10Options.correctAnswerIndex,
      explanationMr: `${nameMr} जिल्ह्यातील औद्योगिक व खनिज वैशिष्ट्ये: ${d.mineralsAndIndustriesMr.join(', ')}. यामुळे रोजगार निर्मितीला गती मिळते.`,
      explanationEn: `Industrial and mineral profile of ${nameEn}: ${d.mineralsAndIndustriesMr.join(', ')}.`,
      subjectId: 'maharashtra_geography',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: 'खनिजे व उद्योग',
      exam: 'Both',
      difficulty: 'Moderate',
      reference: 'महाराष्ट्र औद्योगिक विकास महामंडळ (MIDC) अहवाल'
    },

    // 11. ECONOMY Q11: वाहतूक, दळणवळण व इन्फ्रास्ट्रक्चर
    {
      id: `dist_${distId}_econ_3`,
      questionMr: `${nameMr} जिल्ह्याचा अधिकृत RTO वाहन नोंदणी कोड कोणता आहे, जो महाराष्ट्रातील वाहतूक व्यवस्थेचा घटक आहे?`,
      questionEn: `What is the official RTO vehicle registration series code for ${nameEn} district?`,
      optionsMr: q11Options.optionsMr,
      optionsEn: q11Options.optionsEn,
      correctAnswerIndex: q11Options.correctAnswerIndex,
      explanationMr: `${nameMr} जिल्ह्यासाठी प्रादेशिक परिवहन कार्यालय (RTO) कोड ${d.rtoCode} आहे. हे दळणवळण व लॉजिस्टिक्स व्यवस्थेचे महत्त्वाचे ओळखपत्र आहे.`,
      explanationEn: `The official RTO vehicle registration code for ${nameEn} is ${d.rtoCode}.`,
      subjectId: 'maharashtra_geography',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: 'वाहतूक व दळणवळण',
      exam: 'Both',
      difficulty: 'Easy',
      reference: 'महाराष्ट्र परिवहन विभाग (RTO) अधिकृत मार्गदर्शिका'
    },

    // 12. GEOGRAPHY Q12: जलप्रकल्प व धरणे
    {
      id: `dist_${distId}_geo_6`,
      questionMr: `${nameMr} जिल्ह्यातील कृषी सिंचन व पिण्याच्या पाण्यासाठी खालीलपैकी कोणत्या नदी खोऱ्यातील जलसाठा अत्यंत मोलाचा ठरतो?`,
      questionEn: `Which river basin and water system is vital for irrigation in ${nameEn} district?`,
      optionsMr: q12Options.optionsMr,
      optionsEn: q12Options.optionsEn,
      correctAnswerIndex: q12Options.correctAnswerIndex,
      explanationMr: `${nameMr} जिल्ह्यातील जलप्रणाली: ${d.majorRiversMr.join(', ')}. या नद्यांवर स्थानिक धरणे व पाझर तलाव बांधलेले आहेत.`,
      explanationEn: `Rivers flowing through ${nameEn}: ${d.majorRiversMr.join(', ')}.`,
      subjectId: 'maharashtra_geography',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: 'जलसंपदा व सिंचन',
      exam: 'Both',
      difficulty: 'Moderate',
      reference: 'महाराष्ट्र जलसंपदा विभाग अहवाल'
    },

    // 13. GEOGRAPHY Q13: मुख्यालय व नागरी प्रशासन
    {
      id: `dist_${distId}_geo_7`,
      questionMr: `${nameMr} जिल्ह्याचे प्रशासकीय व महसुली मुख्यालय खालीलपैकी कोणत्या ठिकाणी वसलेले आहे?`,
      questionEn: `Where is the administrative headquarters of ${nameEn} district located?`,
      optionsMr: q13Options.optionsMr,
      optionsEn: q13Options.optionsEn,
      correctAnswerIndex: q13Options.correctAnswerIndex,
      explanationMr: `${nameMr} जिल्ह्याचे मुख्यालय ${d.hqMr} (${d.hqEn}) येथे आहे.`,
      explanationEn: `The headquarters of ${nameEn} district is located at ${d.hqEn}.`,
      subjectId: 'maharashtra_geography',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: 'जिल्हा मुख्यालय',
      exam: 'Both',
      difficulty: 'Easy',
      reference: 'महाराष्ट्र शासन महसूल व वन विभाग'
    },

    // 14. GEOGRAPHY Q14: तालुक्यांचा गट
    {
      id: `dist_${distId}_geo_8`,
      questionMr: `खालीलपैकी कोणता तालुक्यांचा गट हा पूर्णपणे ${nameMr} जिल्ह्यामध्ये समाविष्ट आहे?`,
      questionEn: `Which of the following taluka cluster belongs entirely to ${nameEn} district?`,
      optionsMr: q14Options.optionsMr,
      optionsEn: q14Options.optionsEn,
      correctAnswerIndex: q14Options.correctAnswerIndex,
      explanationMr: `${nameMr} जिल्ह्यातील तालुके: ${d.prominentTalukasMr.join(', ')}.`,
      explanationEn: `Talukas of ${nameEn}: ${d.prominentTalukasMr.join(', ')}.`,
      subjectId: 'maharashtra_geography',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: 'तालुका रचना',
      exam: 'Both',
      difficulty: 'Moderate',
      reference: 'महाराष्ट्र भूमी अभिलेख व सांख्यिकी'
    },

    // 15. MPSC FACT Q15: आयोग वारंवार विचारलेले वैशिष्ट्य
    {
      id: `dist_${distId}_fact_1`,
      questionMr: `MPSC परीक्षेच्या दृष्टीने ${nameMr} जिल्ह्याबाबत खालीलपैकी कोणते वैशिष्ट्यपूर्ण तथ्य विशेष नोंद घेण्यासारखे आहे?`,
      questionEn: `Which of the following high-yield MPSC fact is specifically associated with ${nameEn}?`,
      optionsMr: q15Options.optionsMr,
      optionsEn: q15Options.optionsEn,
      correctAnswerIndex: q15Options.correctAnswerIndex,
      explanationMr: `MPSC परीक्षेतील सुवर्ण तथ्य: ${d.mpscGoldenFactsMr.join(' | ')}.`,
      explanationEn: `Key exam fact: ${d.mpscGoldenFactsMr.join(' | ')}.`,
      subjectId: 'maharashtra_geography',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: 'MPSC सुवर्ण तथ्ये',
      exam: 'Both',
      difficulty: 'Hard',
      reference: 'MPSC मागील परीक्षा प्रश्न विश्लेषण (PYQ Analysis)'
    },

    // 16. GEOGRAPHY Q16: अभयारण्ये व पर्यावरण
    {
      id: `dist_${distId}_geo_9`,
      questionMr: `${nameMr} जिल्ह्यातील पर्यावरण आणि वने संवर्धनाबाबत खालीलपैकी कोणते विधान योग्य आहे?`,
      questionEn: `Which statement is correct regarding forest cover and wildlife in ${nameEn}?`,
      optionsMr: q16Options.optionsMr,
      optionsEn: q16Options.optionsEn,
      correctAnswerIndex: q16Options.correctAnswerIndex,
      explanationMr: `${nameMr} जिल्ह्यातील नैसर्गिक स्थळे व वने: ${d.sanctuariesAndParksMr.join(', ')}.`,
      explanationEn: `Wildlife and ecological areas of ${nameEn}: ${d.sanctuariesAndParksMr.join(', ')}.`,
      subjectId: 'maharashtra_geography',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: 'पर्यावरण व जैवविविधता',
      exam: 'Both',
      difficulty: 'Moderate',
      reference: 'महाराष्ट्र वन्यजीव मंडळ अहवाल'
    },

    // 17. HISTORY Q17: किल्ले व ऐतिहासिक वास्तू २
    {
      id: `dist_${distId}_hist_4`,
      questionMr: `${nameMr} जिल्ह्यामधील लष्करी व ऐतिहासिक संरक्षणाचा साक्षीदार असणारा किल्ला कोणता?`,
      questionEn: `Which historical military fort is situated in ${nameEn} district?`,
      optionsMr: q17Options.optionsMr,
      optionsEn: q17Options.optionsEn,
      correctAnswerIndex: q17Options.correctAnswerIndex,
      explanationMr: `${nameMr} जिल्ह्यातील ऐतिहासिक किल्ले: ${d.historicalFortsMr.join(', ')}.`,
      explanationEn: `Historical forts in ${nameEn}: ${d.historicalFortsMr.join(', ')}.`,
      subjectId: 'maharashtra_history',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: 'किल्ले व वास्तुकला',
      exam: 'Both',
      difficulty: 'Moderate',
      reference: 'दुर्ग अभ्यासक व महाराष्ट्र इतिहास संदर्भ'
    },

    // 18. ECONOMY Q18: स्थानिक कृषी उत्पादन व बाजारपेठ
    {
      id: `dist_${distId}_econ_4`,
      questionMr: `${nameMr} जिल्ह्याची व्यापारी व कृषी ओळख प्रामुख्याने कोणत्या स्थानिक उत्पादनाशी जोडलेली आहे?`,
      questionEn: `What agricultural or commercial specialty defines the market identity of ${nameEn}?`,
      optionsMr: q18Options.optionsMr,
      optionsEn: q18Options.optionsEn,
      correctAnswerIndex: q18Options.correctAnswerIndex,
      explanationMr: `${nameMr} जिल्ह्यातील मुख्य कृषी उत्पादने व उद्योग: ${d.majorCropsMr.join(', ')} आणि ${d.mineralsAndIndustriesMr.join(', ')}.`,
      explanationEn: `Commercial crops and industries of ${nameEn}: ${d.majorCropsMr.join(', ')}.`,
      subjectId: 'maharashtra_geography',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: 'स्थानिक बाजारपेठा',
      exam: 'Both',
      difficulty: 'Easy',
      reference: 'महाराष्ट्र कृषी पणन मंडळ (MSAMB)'
    },

    // 19. GEOGRAPHY Q19: २०११ जनगणना लिंगगुणोत्तर
    {
      id: `dist_${distId}_geo_10`,
      questionMr: `२०११ च्या जनगणनेनुसार ${nameMr} जिल्ह्यातील लिंगगुणोत्तर (Sex Ratio) खालीलपैकी किती नोंदवले गेले आहे?`,
      questionEn: `According to 2011 Census, what is the sex ratio recorded for ${nameEn} district?`,
      optionsMr: q19Options.optionsMr,
      optionsEn: q19Options.optionsEn,
      correctAnswerIndex: q19Options.correctAnswerIndex,
      explanationMr: `२०११ च्या जनगणनेनुसार ${nameMr} जिल्ह्याचे लिंगगुणोत्तर दर १००० पुरुषांमागे ${d.sexRatio} स्त्रिया इतके आहे.`,
      explanationEn: `According to the 2011 Census, ${nameEn} has a sex ratio of ${d.sexRatio} females per 1000 males.`,
      subjectId: 'maharashtra_geography',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: 'सामाजिक सांख्यिकी',
      exam: 'Both',
      difficulty: 'Moderate',
      reference: 'जनगणना सांख्यिकी संचालनालय महाराष्ट्र'
    },

    // 20. MPSC MASTER Q20: सर्वंकष जिल्हा बहुपर्यायी पुनरावलोकन
    {
      id: `dist_${distId}_master_20`,
      questionMr: `${nameMr} जिल्ह्याबाबत खालील विधानांचा विचार करा:\nअ) हा जिल्हा ${d.divisionNameMr}ात येतो.\nब) या जिल्ह्यात एकूण ${d.talukasCount} तालुके आहेत.\nक) या जिल्ह्याचा RTO वाहन कोड ${d.rtoCode} आहे.\nवरीलपैकी कोणती विधाने सत्य आहेत?`,
      questionEn: `Consider the following statements regarding ${nameEn} district:\nA) It belongs to ${d.divisionNameEn} Division.\nB) It has a total of ${d.talukasCount} talukas.\nC) Its official RTO vehicle code is ${d.rtoCode}.\nWhich of the statements given above are true?`,
      optionsMr: q20Options.optionsMr,
      optionsEn: q20Options.optionsEn,
      correctAnswerIndex: q20Options.correctAnswerIndex,
      explanationMr: `${nameMr} जिल्ह्याबाबत सर्व विधाने सत्य आहेत. हा जिल्हा ${d.divisionNameMr}ामध्ये येतो, यात ${d.talukasCount} तालुके असून RTO कोड ${d.rtoCode} आहे.`,
      explanationEn: `All statements are correct for ${nameEn} district.`,
      subjectId: 'maharashtra_geography',
      topic: `${nameMr} जिल्हा विशेष`,
      subtopic: 'सर्वंकष जिल्हा पुनरावलोकन',
      exam: 'Both',
      difficulty: 'Moderate',
      reference: 'MPSC सर्वंकष महाराष्ट्र जिल्हा संदर्भ'
    }
  ];

  // Return requested count (default 20, or clamped between 5 and 20)
  const clampedCount = Math.max(5, Math.min(allQuestions.length, count));
  return allQuestions.slice(0, clampedCount);
}
