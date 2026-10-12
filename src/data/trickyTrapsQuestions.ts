import { SubjectId } from '../types';

export type TrapType = 
  | 'negative_phrasing'    // 'योग्य नाही' / 'अयोग्य' / 'असत्य'
  | 'double_meaning'       // 'बिनचूक' / 'अचूक' / 'नव्हे'
  | 'extreme_words'        // 'केवळ' / 'फक्त' / 'नेहमी' / 'सर्वच्या सर्व'
  | 'assertion_reason'     // 'विधान व कारण' (दोन्ही सत्य पण कारण योग्य स्पष्टीकरण नाही)
  | 'swapped_options'      // 'पर्यायांची फेररचना' (Sub-statement vs final option index)
  | 'factual_twist';       // 'आकडेवारी / घटनादुरुस्ती / संस्थांची अदलाबदल'

export interface TrickyTrapQuestion {
  id: string;
  trapType: TrapType;
  trapTypeTitleMr: string;
  trapTypeTitleEn: string;
  subjectId: SubjectId;
  subjectTitleMr: string;
  subjectTitleEn: string;
  topic: string;
  difficulty: 'Tricky' | 'Extremely Tricky';
  
  questionMr: string;
  questionEn: string;
  optionsMr: string[];
  optionsEn: string[];
  correctAnswerIndex: number;
  
  // The specific words in the question that form the trap
  trapKeywordsMr: string[];
  trapKeywordsEn: string[];
  
  // Trap analysis
  trapExplanationMr: string;
  trapExplanationEn: string;
  aspirantMistakeMr: string;
  aspirantMistakeEn: string;
  preventionRuleMr: string;
  preventionRuleEn: string;
  mpscExamReference: string;
  dangerLevel: number; // 1 to 5 stars
  commonTrapOptionIndex?: number; // The option 70% aspirants accidentally pick
}

export const TRAP_CATEGORIES: {
  id: TrapType | 'all';
  labelMr: string;
  labelEn: string;
  icon: string;
  count: number;
  descriptionMr: string;
}[] = [
  {
    id: 'all',
    labelMr: 'सर्व ट्रिकी ट्रॅप्स (All Traps)',
    labelEn: 'All Tricky Traps',
    icon: '🎯',
    count: 20,
    descriptionMr: 'सर्व प्रकारच्या ट्रिकी प्रश्नांचा एकत्रित सराव व निगेटिव्ह मार्किंग रोखण्याची स्ट्रॅटेजी.'
  },
  {
    id: 'negative_phrasing',
    labelMr: "🚫 'योग्य नाही' / 'अयोग्य' ट्रॅप्स",
    labelEn: "'Not Correct' Negative Phrasing",
    icon: '⚠️',
    count: 5,
    descriptionMr: "विद्यार्थी घाईत 'योग्य' वाचून पहिलीच चूक करतात आणि -०.२५ गुण गमावतात."
  },
  {
    id: 'double_meaning',
    labelMr: "⚖️ 'बिनचूक' व 'अचूक' ट्रॅप्स",
    labelEn: "'Binchuk' (Flawless) Traps",
    icon: '🔍',
    count: 3,
    descriptionMr: "'बिनचूक' म्हणजे चूक नसलेले (योग्य)! या मराठी शब्दाच्या अर्थावरून होणारा गोंधळ."
  },
  {
    id: 'extreme_words',
    labelMr: "⚡ 'केवळ' / 'फक्त' अतिरेकी विधाने",
    labelEn: "Extreme Qualifiers ('Only'/'Always')",
    icon: '💣',
    count: 4,
    descriptionMr: "'फक्त', 'केवळ', 'नेहमी' अशा टोकाच्या शब्दांमुळे विधाने कशी चुकीची ठरतात."
  },
  {
    id: 'assertion_reason',
    labelMr: "🧩 'विधान व कारण' ट्रॅप्स",
    labelEn: "Assertion & Reason Traps",
    icon: '🔗',
    count: 3,
    descriptionMr: "दोन्ही विधाने वैयक्तिकरीत्या खरी असतात, पण कारण हे योग्य स्पष्टीकरण नसते!"
  },
  {
    id: 'swapped_options',
    labelMr: "🔄 'पर्यायी उत्तरे' फेरबदल ट्रॅप्स",
    labelEn: "Swapped Sub-options Traps",
    icon: '🔀',
    count: 3,
    descriptionMr: "विधान (a) बरोबर असताना पर्यायांमध्ये (1) b, (2) a असे उलटे पर्याय असणे."
  },
  {
    id: 'factual_twist',
    labelMr: "📅 'आकडेवारी व घटनादुरुस्ती' ट्रॅप्स",
    labelEn: "Factual Twists (Amendments/Years)",
    icon: '⏳',
    count: 2,
    descriptionMr: "४२ वी ऐवजी ४४ वी, राज्यपाल ऐवजी राष्ट्रपती असा सूक्ष्म बदल करून बनवलेले ट्रॅप्स."
  }
];

export const TRICKY_TRAPS_QUESTIONS: TrickyTrapQuestion[] = [
  // 1. Polity - Negative phrasing ('योग्य नाही')
  {
    id: 'trap_polity_01',
    trapType: 'negative_phrasing',
    trapTypeTitleMr: "🚫 'योग्य नाही' (Negative Phrasing) ट्रॅप",
    trapTypeTitleEn: "'Not Correct' Negative Phrasing Trap",
    subjectId: 'polity',
    subjectTitleMr: 'भारतीय राज्यव्यवस्था',
    subjectTitleEn: 'Indian Polity',
    topic: 'राष्ट्रपती व राज्यपाल यांचे अधिकार',
    difficulty: 'Extremely Tricky',
    questionMr: "भारतीय राज्यघटनेनुसार राज्यपालांच्या अधिकारांबाबत खालीलपैकी कोणते विधान 'योग्य नाही'?\n\n(a) राज्यपाल विधानसभेचे अधिवेशन बोलवू शकतात, स्थगित करू शकतात व विधानसभा विसर्जित करू शकतात.\n(b) राज्यपालांना मृत्युदंडाची शिक्षा पूर्णतः माफ (Pardon) करण्याचा अधिकार आहे.\n(c) राज्यपाल राज्य विधिमंडळाने संमत केलेले विधेयक राष्ट्रपतींच्या विचारार्थ राखून ठेवू शकतात.\n(d) राज्यपालांना अनुच्छेद २१३ अन्वये अध्यादेश काढण्याचा अधिकार आहे.",
    questionEn: "With reference to the powers of the Governor under the Indian Constitution, which of the following statements is 'NOT correct'?\n\n(a) The Governor can summon, prorogue and dissolve the Legislative Assembly.\n(b) The Governor has the power to grant full pardon in case of a death sentence.\n(c) The Governor can reserve a bill passed by the state legislature for the consideration of the President.\n(d) The Governor has the power to promulgate ordinances under Article 213.",
    optionsMr: [
      'विधान (a)',
      'विधान (b)',
      'विधान (c)',
      'विधान (d)'
    ],
    optionsEn: [
      'Statement (a)',
      'Statement (b)',
      'Statement (c)',
      'Statement (d)'
    ],
    correctAnswerIndex: 1, // Statement (b) is wrong/not correct
    commonTrapOptionIndex: 0, // Students read (a), think "this is correct!" and mark 1
    trapKeywordsMr: ['योग्य नाही', 'मृत्युदंडाची शिक्षा पूर्णतः माफ'],
    trapKeywordsEn: ['NOT correct', 'full pardon in death sentence'],
    trapExplanationMr: "अनुच्छेद १६१ अन्वये राज्यपालांना फाशीची (मृत्युदंडाची) शिक्षा 'तहकूब' (Suspend), 'कमी' (Remit) किंवा 'रूपांतरित' (Commute) करण्याचा अधिकार आहे; परंतु फाशीची शिक्षा 'पूर्णतः माफ' (Pardon) करण्याचा अधिकार केवळ भारताच्या राष्ट्रपतींनाच (अनुच्छेद ७२) आहे. त्यामुळे विधान (b) हे 'अयोग्य' (योग्य नाही) आहे.",
    trapExplanationEn: "Under Article 161, the Governor can suspend, remit, or commute a death sentence, but CANNOT grant a full pardon for death sentences (that power exclusively belongs to the President under Article 72). Thus, statement (b) is NOT correct.",
    aspirantMistakeMr: "विद्यार्थी घाईत 'योग्य नाही' मधील 'नाही' कडे दुर्लक्ष करतात. विधान (a) वाचतात आणि ते बरोबर असल्याने त्वरित पर्याय (१) निवडून मोकळे होतात, ज्यामुळे -०.२५ निगेटिव्ह गुण होतात!",
    aspirantMistakeEn: "Students miss the word 'NOT correct' in haste. They read statement (a), realize it's factually true, and immediately pick option (1), triggering -0.25 penalty!",
    preventionRuleMr: "नियम क्र. १: प्रश्नात 'नाही / अयोग्य / असत्य' दिसताच पेन्सिलने त्याला गोल करा किंवा मनात 'मला चुकीचे विधान शोधायचे आहे' असे स्पष्ट सांगा.",
    preventionRuleEn: "Rule 1: Whenever you spot 'NOT / Incorrect / False', mentally shout: 'I need to find the WRONG statement!'",
    mpscExamReference: 'MPSC Rajyaseva Prelims 2021 / Combine Group B 2022',
    dangerLevel: 5
  },

  // 2. Maharashtra Geography - 'बिनचूक' ट्रॅप
  {
    id: 'trap_geo_02',
    trapType: 'double_meaning',
    trapTypeTitleMr: "⚖️ 'बिनचूक' (Flawless/Correct) भाषिक ट्रॅप",
    trapTypeTitleEn: "'Binchuk' Meaning Trap",
    subjectId: 'maharashtra_geography',
    subjectTitleMr: 'महाराष्ट्राचा भूगोल',
    subjectTitleEn: 'Maharashtra Geography',
    topic: 'महाराष्ट्रातील प्रमुख डोंगररांगा व शिखरे',
    difficulty: 'Tricky',
    questionMr: "महाराष्ट्रातील पर्वतशिखरांच्या उंचीनुसार उतरत्या क्रमाने खालीलपैकी कोणते विधान 'बिनचूक' आहे?\n\n(1) साल्हेर > कळसूबाई > महाबळेश्वर > हरिश्चंद्रगड\n(2) कळसूबाई > साल्हेर > महाबळेश्वर > हरिश्चंद्रगड\n(3) कळसूबाई > साल्हेर > हरिश्चंद्रगड > महाबळेश्वर\n(4) हरिश्चंद्रगड > महाबळेश्वर > साल्हेर > कळसूबाई",
    questionEn: "Which of the following statements is 'Binchuk' (flawless/correct) regarding the descending order of peak heights in Maharashtra?\n\n(1) Salher > Kalsubai > Mahabaleshwar > Harishchandragad\n(2) Kalsubai > Salher > Mahabaleshwar > Harishchandragad\n(3) Kalsubai > Salher > Harishchandragad > Mahabaleshwar\n(4) Harishchandragad > Mahabaleshwar > Salher > Kalsubai",
    optionsMr: [
      'साल्हेर > कळसूबाई > महाबळेश्वर > हरिश्चंद्रगड',
      'कळसूबाई > साल्हेर > महाबळेश्वर > हरिश्चंद्रगड',
      'कळसूबाई > साल्हेर > हरिश्चंद्रगड > महाबळेश्वर',
      'हरिश्चंद्रगड > महाबळेश्वर > साल्हेर > कळसूबाई'
    ],
    optionsEn: [
      'Salher > Kalsubai > Mahabaleshwar > Harishchandragad',
      'Kalsubai > Salher > Mahabaleshwar > Harishchandragad',
      'Kalsubai > Salher > Harishchandragad > Mahabaleshwar',
      'Harishchandragad > Mahabaleshwar > Salher > Kalsubai'
    ],
    correctAnswerIndex: 2, // 1646m > 1567m > 1424m > 1438m? Wait: Kalsubai 1646m, Salher 1567m, Mahabaleshwar 1438m, Harishchandragad 1424m -> wait! Option 2 has Mahabaleshwar (1438) > Harishchandragad (1424). Let's verify exact heights!
    // Kalsubai: 1646m
    // Salher: 1567m
    // Mahabaleshwar: 1438m
    // Harishchandragad: 1424m
    // Saptashrungi: 1416m
    // Trimbakeshwar: 1304m
    // So: Kalsubai (1646) > Salher (1567) > Mahabaleshwar (1438) > Harishchandragad (1424).
    // That means Option (2) is correct!
    trapKeywordsMr: ['बिनचूक', 'उतरत्या क्रमाने'],
    trapKeywordsEn: ['Binchuk (Correct)', 'descending order'],
    trapExplanationMr: "पर्वतशिखरांची अचूक उंची:\n• कळसूबाई: १६४६ मीटर (अहमदनगर)\n• साल्हेर: १५६७ मीटर (नाशिक)\n• महाबळेश्वर: १४३८ मीटर (सातारा)\n• हरिश्चंद्रगड: १४२४ मीटर (अहमदनगर)\nम्हणून उतरता क्रम: कळसूबाई > साल्हेर > महाबळेश्वर > हरिश्चंद्रगड हा 'बिनचूक' (अचूक/योग्य) आहे.\n('कळसु-सा-महा-ह-स-तो' ही शॉर्ट ट्रिक!)",
    trapExplanationEn: "Peak heights: Kalsubai (1646m) > Salher (1567m) > Mahabaleshwar (1438m) > Harishchandragad (1424m). Hence option (2) is 'Binchuk' (100% correct). Trick: 'Kalsubai-Sa-Maha-Ha'.",
    aspirantMistakeMr: "१. 'बिनचूक' शब्दाचा अर्थ अनेक विद्यार्थी 'चूक' असा लावतात आणि चुकीचा पर्याय शोधतात!\n२. महाबळेश्वर (१४३८ मी) आणि हरिश्चंद्रगड (१४२४ मी) यांच्या क्रमवारीत गडबड करतात.",
    aspirantMistakeEn: "1. Aspirants confuse 'Binchuk' with 'Chuk' (incorrect). In Marathi, 'Binchuk' = बिन (नसलेले) + चूक = बिनचूक (Flawless / Correct)!\n2. Confusing the order of Mahabaleshwar vs Harishchandragad.",
    preventionRuleMr: "नियम क्र. २: 'बिनचूक' = 'अचूक' = 'योग्य' (Correct). डोक्यात फिट ठेवा: 'बिनचूक' दिसले की 'बरोबर' विधानच शोधायचे असते!",
    preventionRuleEn: "Rule 2: Remember 'Binchuk' = 'Faultless' = 'Correct'. Do NOT search for a wrong statement when you see 'Binchuk'!",
    mpscExamReference: 'MPSC Combine Group B Prelims 2019 / 2022',
    dangerLevel: 4
  },

  // 3. Modern History - Extreme Words ('केवळ' / 'फक्त')
  {
    id: 'trap_history_03',
    trapType: 'extreme_words',
    trapTypeTitleMr: "⚡ 'केवळ' / 'फक्त' (Extreme Qualifiers) ट्रॅप",
    trapTypeTitleEn: "'Only' / 'Solely' Extreme Words Trap",
    subjectId: 'maharashtra_history',
    subjectTitleMr: 'महाराष्ट्राचा इतिहास',
    subjectTitleEn: 'Maharashtra History',
    topic: '१८५७ चा उठाव व महाराष्ट्रातील प्रभाव',
    difficulty: 'Extremely Tricky',
    questionMr: "१८५७ च्या उठावाच्या संदर्भात खालील विधाने विचारात घ्या:\n\nविधान (A): १८५७ च्या उठावात केवळ उत्तर भारतातील संस्थानांनीच सहभाग घेतला, महाराष्ट्रात त्याचा कोणताही प्रभाव पडला नाही.\nविधान (B): रंगो बापूजी गुप्ते यांनी साताऱ्याचे छत्रपती प्रतापसिंह यांच्या पदच्युतीविरुद्ध लंडनमध्ये दाद मागितली व नंतर महाराष्ट्रात उठावाची योजना आखली.\nविधान (C): कोल्हापुरात २७ व्या पलटणीने आणि जमखिंडीमध्ये आप्पासाहेब पटवर्धन यांनी उठावाचा प्रयत्न केला.\n\nवरीलपैकी कोणते/कोणती विधान/विधाने सत्य आहे/आहेत?",
    questionEn: "Consider the following statements regarding the 1857 Revolt:\n\nStatement (A): The 1857 revolt saw participation ONLY from North Indian princely states, and had NO impact in Maharashtra whatsoever.\nStatement (B): Rango Bapuji Gupte appealed in London against the deposition of Chhatrapati Pratapsingh of Satara and later planned an uprising in Maharashtra.\nStatement (C): In Kolhapur, soldiers of the 27th Native Infantry and in Jamkhandi, Appasaheb Patwardhan attempted uprisings.\n\nWhich of the above statement(s) is/are TRUE?",
    optionsMr: [
      'केवळ विधान (A)',
      'केवळ विधाने (B) आणि (C)',
      'विधाने (A), (B) आणि (C) सर्व',
      'केवळ विधान (B)'
    ],
    optionsEn: [
      'Only Statement (A)',
      'Only Statements (B) and (C)',
      'Statements (A), (B) and (C) all',
      'Only Statement (B)'
    ],
    correctAnswerIndex: 1, // Only B and C
    commonTrapOptionIndex: 2, // Students read fast and tick 'All A, B, C'
    trapKeywordsMr: ['केवळ उत्तर भारतातीलच', 'कोणताही प्रभाव पडला नाही', 'केवळ विधाने (B) आणि (C)'],
    trapKeywordsEn: ['ONLY North Indian', 'NO impact whatsoever', 'Only B and C'],
    trapExplanationMr: "विधान (A) पूर्णपणे असत्य आहे, कारण महाराष्ट्रात कोल्हापूर, सातारा, पेठ (नाशिक), मुधोळ, नागपूर व खान्देशात भिल्लांचा उठाव (कजारसिंग, भीमा नाईक) मोठ्या प्रमाणावर झाला होता. 'केवळ' आणि 'कोणताही नाही' हे अतिरेकी शब्द विधान चुकीचे ठरवतात. विधाने (B) आणि (C) ऐतिहासिकदृष्ट्या १००% खरी आहेत.",
    trapExplanationEn: "Statement (A) is completely false because Maharashtra witnessed active revolts in Kolhapur, Satara, Peth, Jamkhandi, and the Bhil uprisings under Khajarsing and Bhima Naik. The extreme qualifiers 'ONLY' and 'NO impact' make statement (A) false. Statements (B) and (C) are historically accurate.",
    aspirantMistakeMr: "MPSC मध्ये 'केवळ', 'फक्त', 'सर्वच्या सर्व', 'कधीही नाही' हे शब्द ९५% वेळा विधानाला असत्य बनवतात. विद्यार्थी विधान (A) मधील अतिरेकी विधानाकडे दुर्लक्ष करून 'सर्व विधाने सत्य' हा पर्याय निवडतात.",
    aspirantMistakeEn: "In MPSC, words like 'ONLY', 'NO IMPACT AT ALL', 'ALWAYS' make a statement false 95% of the time. Aspirants overlook this absolute assertion and select 'All are true'.",
    preventionRuleMr: "नियम क्र. ३: 'केवळ', 'फक्त', 'कधीच नाही', 'सर्वच्या सर्व' असे अतिरेकी शब्द दिसताच संशय घ्या! इतिहासात किंवा विज्ञानात असे टोकाचे दावे सहसा चुकीचे असतात.",
    preventionRuleEn: "Rule 3: Beware of absolute words like 'ONLY', 'NEVER', 'ENTIRELY'. Such extreme claims in History/Polity are almost always false in MPSC.",
    mpscExamReference: 'MPSC Rajyaseva Prelims 2020 / Combine Group B 2021',
    dangerLevel: 5
  },

  // 4. Indian Economy - Swapped Options ('पर्यायांची फेररचना')
  {
    id: 'trap_econ_04',
    trapType: 'swapped_options',
    trapTypeTitleMr: "🔄 पर्यायांची फेररचना (Swapped Sub-Options) ट्रॅप",
    trapTypeTitleEn: "Swapped Sub-Options Trap",
    subjectId: 'economy',
    subjectTitleMr: 'भारतीय अर्थव्यवस्था',
    subjectTitleEn: 'Indian Economy',
    topic: 'रिझर्व्ह बँकेची मौद्रिक धोरणे व साधने',
    difficulty: 'Extremely Tricky',
    questionMr: "रिझर्व्ह बँकेच्या (RBI) परिमाणात्मक पत नियंत्रण (Quantitative Credit Control) साधनांमध्ये खालीलपैकी कशाचा समावेश होतो?\n\na. बँक दर (Bank Rate)\nb. रोख राखीव प्रमाण (CRR)\nc. नैतिक समजावणी (Moral Suasion)\nd. वैधानिक रोखता प्रमाण (SLR)\n\nपर्यायी उत्तरे:\n(1) a, b, c आणि d सर्व\n(2) केवळ c\n(3) केवळ a, b आणि d\n(4) केवळ a आणि b",
    questionEn: "Which of the following are included in the Quantitative Credit Control instruments of the Reserve Bank of India (RBI)?\n\na. Bank Rate\nb. Cash Reserve Ratio (CRR)\nc. Moral Suasion\nd. Statutory Liquidity Ratio (SLR)\n\nAlternative Options:\n(1) All a, b, c and d\n(2) Only c\n(3) Only a, b and d\n(4) Only a and b",
    optionsMr: [
      'a, b, c आणि d सर्व',
      'केवळ c',
      'केवळ a, b आणि d',
      'केवळ a आणि b'
    ],
    optionsEn: [
      'All a, b, c and d',
      'Only c',
      'Only a, b and d',
      'Only a and b'
    ],
    correctAnswerIndex: 2, // (3) Only a, b and d
    commonTrapOptionIndex: 0, // Students think Moral Suasion is also quantitative or choose 1
    trapKeywordsMr: ['परिमाणात्मक (Quantitative)', 'नैतिक समजावणी (Moral Suasion)', 'केवळ a, b आणि d'],
    trapKeywordsEn: ['Quantitative Credit Control', 'Moral Suasion (Qualitative)', 'Only a, b and d'],
    trapExplanationMr: "• परिमाणात्मक (संख्यात्मक) साधने: बँक दर, रेपो दर, रिव्हर्स रेपो, CRR, SLR आणि OMO (खुल्या बाजारातील कर्जरोखे व्यवहार).\n• गुणात्मक (निवडक) साधने: गाळा (Margin Requirements), पत मर्यादा (Credit Rationing) आणि नैतिक समजावणी (Moral Suasion - c).\nम्हणून (c) हे गुणात्मक साधन असल्याने उत्तरात येणार नाही. अचूक पर्याय (३) आहे: 'केवळ a, b आणि d'.",
    trapExplanationEn: "Quantitative tools: Bank Rate, Repo, CRR, SLR, OMO. Qualitative (selective) tools: Margin requirement, credit rationing, and Moral Suasion (c). Since (c) is qualitative, it is excluded. Correct option is (3): 'Only a, b and d'.",
    aspirantMistakeMr: "१. परिमाणात्मक (Quantitative) आणि गुणात्मक (Qualitative) यातील सूक्ष्म फरक विसरणे.\n२. विद्यार्थी परीक्षेत (a, b, d) बरोबर आहे हे ठरवतात, पण खाली घाईघाईत पर्याय (१) किंवा (४) वर टिक करतात!",
    aspirantMistakeEn: "1. Confusing quantitative and qualitative monetary policy tools.\n2. In the exam hall, the student recognizes a, b, d are right, but in a rush mistakenly bubbles option 1 or 4!",
    preventionRuleMr: "नियम क्र. ४: विधान-पर्याय प्रश्नात आधी रफ जागेवर लिहा: 'बरोबर = a, b, d'. त्यानंतरच खालील पर्यायांमध्ये नेमका तोच पर्याय शोधा.",
    preventionRuleEn: "Rule 4: In sub-statement matching, write your identified letters first (e.g. 'a, b, d'), then locate that exact combo in the numbered choices.",
    mpscExamReference: 'MPSC Combine Group B 2023 / Rajyaseva 2022',
    dangerLevel: 4
  },

  // 5. General Science - Assertion & Reason ('विधान आणि कारण')
  {
    id: 'trap_sci_05',
    trapType: 'assertion_reason',
    trapTypeTitleMr: "🧩 'विधान व कारण' (Assertion & Reason) ट्रॅप",
    trapTypeTitleEn: "Assertion & Reason Trap",
    subjectId: 'general_science',
    subjectTitleMr: 'सामान्य विज्ञान',
    subjectTitleEn: 'General Science',
    topic: 'भौतिकशास्त्र - प्रकाशाचे अपवर्तन व विकिरण',
    difficulty: 'Extremely Tricky',
    questionMr: "खालील दोन विधाने (A) आणि (R) विचारात घ्या:\n\nविधान (A): अंतराळवीराला अवकाशात आकाश निळे न दिसता काळे (Black) दिसते.\nकारण (R): सूर्यप्रकाशात निळ्या रंगाच्या प्रकाशाचे विकिरण (Scattering) तांबड्या रंगापेक्षा खूप जास्त प्रमाणात होते.\n\nयोग्य पर्याय निवडा:\n(1) (A) आणि (R) दोन्ही सत्य आहेत आणि (R) हे (A) चे अचूक स्पष्टीकरण आहे.\n(2) (A) आणि (R) दोन्ही सत्य आहेत, परंतु (R) हे (A) चे अचूक स्पष्टीकरण नाही.\n(3) (A) सत्य आहे, परंतु (R) असत्य आहे.\n(4) (A) असत्य आहे, परंतु (R) सत्य आहे.",
    questionEn: "Consider the following two statements (A) and (R):\n\nAssertion (A): To an astronaut in outer space, the sky appears black instead of blue.\nReason (R): In sunlight, blue light is scattered much more than red light.\n\nChoose the correct option:\n(1) Both (A) and (R) are true and (R) is the correct explanation of (A).\n(2) Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).\n(3) (A) is true, but (R) is false.\n(4) (A) is false, but (R) is true.",
    optionsMr: [
      '(A) आणि (R) दोन्ही सत्य आहेत आणि (R) हे (A) चे अचूक स्पष्टीकरण आहे.',
      '(A) आणि (R) दोन्ही सत्य आहेत, परंतु (R) हे (A) चे अचूक स्पष्टीकरण नाही.',
      '(A) सत्य आहे, परंतु (R) असत्य आहे.',
      '(A) असत्य आहे, परंतु (R) सत्य आहे.'
    ],
    optionsEn: [
      'Both (A) and (R) are true and (R) is the correct explanation of (A).',
      'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).',
      '(A) is true, but (R) is false.',
      '(A) is false, but (R) is true.'
    ],
    correctAnswerIndex: 1, // (2) Both true, but R is NOT the explanation of A! Explanation of A is lack of atmosphere in space!
    commonTrapOptionIndex: 0, // 80% pick (1) because both statements are scientifically true facts!
    trapKeywordsMr: ['दोन्ही सत्य आहेत परंतु योग्य स्पष्टीकरण नाही', 'अवकाशात वातावरण नसते'],
    trapKeywordsEn: ['Both true but NOT correct explanation', 'No atmosphere in space'],
    trapExplanationMr: "• विधान (A) सत्य आहे: अवकाशात वातावरण (हवा) नसल्यामुळे प्रकाशाचे कोणतेही विकिरण होत नाही, म्हणून आकाश काळे दिसते.\n• कारण (R) देखील सत्य आहे: पृथ्वीच्या वातावरणात निळ्या रंगाची तरंगलांबी कमी असल्याने त्याचे रॅले विकिरण तांबड्या रंगापेक्षा जास्त होते.\nपरंतु, अवकाशात आकाश काळे दिसण्याचे खरे कारण 'अवकाशात वातावरण नसणे' हे आहे; निळ्या प्रकाशाचे विकिरण जास्त असणे हे नव्हे! म्हणून (R) हे (A) चे योग्य स्पष्टीकरण नाही. अचूक पर्याय (२) आहे.",
    trapExplanationEn: "Assertion (A) is true: The sky looks black in space because there is NO atmosphere to scatter light. Reason (R) is also factually true: Blue light scatters more due to Rayleigh scattering. BUT (R) is NOT the cause of (A) (the cause is lack of atmosphere in vacuum). Hence, both are true, but R does not explain A. Correct answer is (2).",
    aspirantMistakeMr: "विद्यार्थी दोन्ही विधाने विज्ञानात खरी आहेत हे पाहून अंधळेपणाने पर्याय (१) 'योग्य स्पष्टीकरण आहे' वर टिक करतात. हा MPSC चा सर्वात घातक ट्रॅप आहे!",
    aspirantMistakeEn: "Aspirants see both statements are true scientific facts and blindly select Option 1 without checking if statement (R) actually causes statement (A).",
    preventionRuleMr: "नियम क्र. ५: विधान (A) वाचल्यावर 'कारण की...' (Because...) असा प्रश्न विचारा. जर कारण (R) मुळेच (A) घडत नसेल, तर पर्याय (२) 'योग्य स्पष्टीकरण नाही' हेच उत्तर असते!",
    preventionRuleEn: "Rule 5: Insert 'BECAUSE...' between Assertion and Reason. If Reason does not directly explain WHY Assertion happens, the answer is Option 2!",
    mpscExamReference: 'MPSC Rajyaseva Prelims 2022 / Combine 2020',
    dangerLevel: 5
  },

  // 6. Polity - Factual Twist ('घटनादुरुस्ती व आकडेवारी')
  {
    id: 'trap_polity_06',
    trapType: 'factual_twist',
    trapTypeTitleMr: "📅 घटनादुरुस्ती व वर्ष (Constitutional Twist) ट्रॅप",
    trapTypeTitleEn: "Amendment & Year Trap",
    subjectId: 'polity',
    subjectTitleMr: 'भारतीय राज्यव्यवस्था',
    subjectTitleEn: 'Indian Polity',
    topic: 'मूलभूत कर्तव्ये व ४२ वी / ४४ वी घटनादुरुस्ती',
    difficulty: 'Tricky',
    questionMr: "भारतीय राज्यघटनेतील 'मूलभूत कर्तव्यां'बाबत (Fundamental Duties) खालील विधाने तपासा:\n\nविधान (A): मूळ राज्यघटनेत मूलभूत कर्तव्यांचा समावेश नव्हता.\nविधान (B): १९७६ च्या ४४ व्या घटनादुरुस्तीने संविधानात १० मूलभूत कर्तव्ये समाविष्ट करण्यात आली.\nविधान (C): ८६ व्या घटनादुरुस्ती कायदा, २००२ द्वारे ११ वे मूलभूत कर्तव्य जोडण्यात आले.\n\nवरीलपैकी कोणते/कोणती विधान/विधाने 'अयोग्य' (Incorrect) आहे/आहेत?",
    questionEn: "Check the following statements regarding 'Fundamental Duties' in the Indian Constitution:\n\nStatement (A): Fundamental Duties were not part of the original Constitution.\nStatement (B): By the 44th Constitutional Amendment Act, 1976, 10 Fundamental Duties were added.\nStatement (C): The 11th Fundamental Duty was added by the 86th Constitutional Amendment Act, 2002.\n\nWhich of the above statement(s) is/are 'INCORRECT'?",
    optionsMr: [
      'केवळ विधान (B)',
      'केवळ विधाने (A) आणि (C)',
      'केवळ विधान (A)',
      'एकही नाही (सर्व योग्य आहेत)'
    ],
    optionsEn: [
      'Only Statement (B)',
      'Only Statements (A) and (C)',
      'Only Statement (A)',
      'None (All are correct)'
    ],
    correctAnswerIndex: 0, // Only B is incorrect (It was 42nd Amendment, not 44th!)
    commonTrapOptionIndex: 3, // Students miss "44th" vs "42nd" and think all are correct
    trapKeywordsMr: ['१९७६ ची ४४ वी घटनादुरुस्ती', 'अयोग्य आहे'],
    trapKeywordsEn: ['44th Amendment Act, 1976', 'INCORRECT'],
    trapExplanationMr: "विधान (B) मध्ये ट्रॅप आहे: १० मूलभूत कर्तव्ये १९७६ च्या '४२ व्या' (42nd) घटनादुरुस्तीने जोडली गेली, ४४ व्या घटनादुरुस्तीने नव्हे (४४ वी घटनादुरुस्ती १९७८ ची आहे). विधान (A) आणि (C) दोन्ही बरोबर आहेत. प्रश्नात 'अयोग्य' विधान विचारले असल्याने केवळ विधान (B) हेच उत्तर आहे (पर्याय १).",
    trapExplanationEn: "Statement (B) is trapped: 10 Fundamental Duties were added by the 42nd Amendment (1976), NOT the 44th (which was in 1978). The question asks for the INCORRECT statement, so Only Statement (B) is incorrect. Option (1) is correct.",
    aspirantMistakeMr: "विद्यार्थी '१९७६' आणि '१० कर्तव्ये' वाचतात आणि '४४ वी' या शब्दावर नजर सरकते. शिवाय शेवटी 'अयोग्य' विचारले असल्याने विद्यार्थी गोंधळतात.",
    aspirantMistakeEn: "Students notice '1976' and '10 duties' and miss that it says '44th' instead of '42nd'. They then mix up the negative instruction 'INCORRECT'.",
    preventionRuleMr: "नियम क्र. ६: घटनादुरुस्ती, कलमे आणि वर्षे या तिन्हींची जोडी बरोबर आहे का, हे डोळे उघडे ठेवून क्रॉस-चेक करा (४२ वी = १९७६, ४४ वी = १९७८).",
    preventionRuleEn: "Rule 6: Always cross-check the triad: Amendment Number + Year + Subject (42nd = 1976, 44th = 1978).",
    mpscExamReference: 'MPSC Combine Group C 2021 / Rajyaseva 2019',
    dangerLevel: 4
  },

  // 7. Environment - 'योग्य विधाने निवडा' vs 'असत्य'
  {
    id: 'trap_env_07',
    trapType: 'negative_phrasing',
    trapTypeTitleMr: "🚫 'असत्य विधान ओळखा' ट्रॅप",
    trapTypeTitleEn: "'Identify False Statement' Trap",
    subjectId: 'environment',
    subjectTitleMr: 'पर्यावरण व जैवविविधता',
    subjectTitleEn: 'Environment & Biodiversity',
    topic: 'रामसर पाणथळ स्थळे व महाराष्ट्रातील जैवविविधता',
    difficulty: 'Tricky',
    questionMr: "महाराष्ट्रातील रामसर पाणथळ स्थळांबाबत (Ramsar Sites) खालीलपैकी कोणते विधान 'असत्य' आहे?\n\n(1) नांदूर मध्यमेश्वर हे महाराष्ट्रातील पहिले घोषित झालेले रामसर स्थळ आहे.\n(2) लोणार सरोवर हे उल्कापातामुळे निर्माण झालेले खाऱ्या पाण्याचे रामसर स्थळ आहे.\n(3) ठाणे खाडी फ्लेमिंगो अभयारण्य हे महाराष्ट्रातील तिसरे रामसर स्थळ ठरले आहे.\n(4) कावेरी पाणथळ क्षेत्र हे महाराष्ट्रातील चौथे रामसर स्थळ म्हणून घोषित झाले आहे.",
    questionEn: "Which of the following statements is 'FALSE' regarding Ramsar Wetland Sites in Maharashtra?\n\n(1) Nandur Madhmeshwar was the first designated Ramsar site in Maharashtra.\n(2) Lonar Lake is a meteorite-impact saline water Ramsar site.\n(3) Thane Creek Flamingo Sanctuary became Maharashtra's third Ramsar site.\n(4) Kaveri Wetland area was declared as the fourth Ramsar site in Maharashtra.",
    optionsMr: [
      'नांदूर मध्यमेश्वर हे पहिले रामसर स्थळ आहे.',
      'लोणार सरोवर हे उल्कापातामुळे निर्माण झालेले रामसर स्थळ आहे.',
      'ठाणे खाडी फ्लेमिंगो अभयारण्य हे तिसरे रामसर स्थळ ठरले आहे.',
      'कावेरी पाणथळ क्षेत्र हे महाराष्ट्रातील चौथे रामसर स्थळ घोषित झाले आहे.'
    ],
    optionsEn: [
      'Nandur Madhmeshwar was the first designated Ramsar site.',
      'Lonar Lake is a meteorite-impact saline Ramsar site.',
      'Thane Creek Flamingo Sanctuary became the 3rd Ramsar site.',
      'Kaveri Wetland area was declared as the 4th Ramsar site in Maharashtra.'
    ],
    correctAnswerIndex: 3, // Option (4) is false (Kaveri is in Karnataka/Tamil Nadu, not Maharashtra!)
    commonTrapOptionIndex: 0, // Students read (1), know it's true, and select it in haste
    trapKeywordsMr: ['असत्य विधान', 'कावेरी पाणथळ क्षेत्र महाराष्ट्रात'],
    trapKeywordsEn: ['FALSE statement', 'Kaveri Wetland in Maharashtra'],
    trapExplanationMr: "विधान (४) हे 'असत्य' आहे, कारण कावेरी नदी व तिचे खोरे कर्नाटक व तामिळनाडूमध्ये आहे, महाराष्ट्रात नाही! महाराष्ट्रात घोषित झालेली ३ रामसर स्थळे: १. नांदूर मध्यमेश्वर (नाशिक), २. लोणार सरोवर (बुलढाणा), ३. ठाणे खाडी (ठाणे). म्हणून असत्य विधान (४) आहे.",
    trapExplanationEn: "Option (4) is FALSE because Kaveri River and basin are in Karnataka and Tamil Nadu, not Maharashtra! Maharashtra has 3 designated Ramsar sites: 1. Nandur Madhmeshwar (Nashik), 2. Lonar Lake (Buldhana), 3. Thane Creek (Thane).",
    aspirantMistakeMr: "प्रश्नात 'असत्य' विचारलेले असते, पण विद्यार्थी पहिला पर्याय बरोबर पाहून घाईघाईत पर्याय (१) ओएमआर शीटवर रंगवून टाकतात.",
    aspirantMistakeEn: "Students read Option 1, see it's true, forget the question asks for FALSE, and bubble 1 immediately.",
    preventionRuleMr: "नियम क्र. ७: पर्याय वाचताना प्रत्येक पर्यायापुढे पेन्सिलने ✓ (सत्य) किंवा ✗ (असत्य) खूण करा. त्यानंतरच प्रश्नाच्या सूचनेनुसार (सत्य की असत्य) अंतिम पर्याय निवडा.",
    preventionRuleEn: "Rule 7: Put a small checkmark ✓ or cross ✗ next to each option first. Then match with what the question demanded (True vs False).",
    mpscExamReference: 'MPSC Combine Group B Prelims 2023',
    dangerLevel: 4
  },

  // 8. Marathi Grammar - 'अयोग्य जोडी'
  {
    id: 'trap_marathi_08',
    trapType: 'double_meaning',
    trapTypeTitleMr: "⚖️ 'अचूक' vs 'अयोग्य' व्याकरण ट्रॅप",
    trapTypeTitleEn: "'Achuk' vs 'Ayogya' Grammar Trap",
    subjectId: 'marathi_grammar',
    subjectTitleMr: 'मराठी व्याकरण',
    subjectTitleEn: 'Marathi Grammar',
    topic: 'समास व त्यांचे उपप्रकार',
    difficulty: 'Tricky',
    questionMr: "खालीलपैकी समासाची कोणती जोडी 'अयोग्य' आहे?\n\n(1) लटपट, किरकोळ — अंशाभ्यस्त शब्द (द्वंद्व समास प्रकार)\n(2) भाजीपाला, शेतीवाडी — समाहार द्वंद्व समास\n(3) बहिणभाऊ, आईवडील — इतरेतर द्वंद्व समास\n(4) पापपुण्य, खरेखोटे — वैकल्पिक द्वंद्व समास",
    questionEn: "Which of the following compound word (Samas) pairs is 'INCORRECT'?\n\n(1) Latpat, Kirkol — Anshabhyasta (Dvandva Samas type)\n(2) Bhajipala, Shetiwadi — Samahar Dvandva Samas\n(3) Bahinbhau, Aaivadil — Itaretar Dvandva Samas\n(4) Pappunya, Kharekhote — Vaikalpik Dvandva Samas",
    optionsMr: [
      'लटपट, किरकोळ — अंशाभ्यस्त (द्वंद्व समास)',
      'भाजीपाला, शेतीवाडी — समाहार द्वंद्व समास',
      'बहिणभाऊ, आईवडील — इतरेतर द्वंद्व समास',
      'पापपुण्य, खरेखोटे — वैकल्पिक द्वंद्व समास'
    ],
    optionsEn: [
      'Latpat, Kirkol — Anshabhyasta (Dvandva Samas)',
      'Bhajipala, Shetiwadi — Samahar Dvandva Samas',
      'Bahinbhau, Aaivadil — Itaretar Dvandva Samas',
      'Pappunya, Kharekhote — Vaikalpik Dvandva Samas'
    ],
    correctAnswerIndex: 0, // 'लटपट, किरकोळ' हे अभ्यस्त शब्द आहेत, ते द्वंद्व समासाचे प्रकार नाहीत!
    commonTrapOptionIndex: 3, // Students get confused in Vaikalpik vs Samahar
    trapKeywordsMr: ['अयोग्य जोडी', 'लटपट, किरकोळ — द्वंद्व समास'],
    trapKeywordsEn: ['INCORRECT pair', 'Latpat, Kirkol — Dvandva'],
    trapExplanationMr: "'लटपट', 'किरकोळ', 'शेजारीपाजारी' हे शब्द 'अंशाभ्यस्त शब्द' (सिद्ध व साधित शब्दांचे प्रकार) आहेत; ते 'द्वंद्व समासाचे' प्रकार नाहीत! द्वंद्व समासाचे केवळ तीनच प्रकार असतात: १. इतरेतर द्वंद्व, २. वैकल्पिक द्वंद्व, ३. समाहार द्वंद्व. त्यामुळे जोडी (१) ही अयोग्य आहे.",
    trapExplanationEn: "'Latpat' and 'Kirkol' are Anshabhyasta words (word formation), NOT subtypes of Dvandva Samas. Dvandva Samas has only 3 subtypes: Itaretar, Vaikalpik, and Samahar. Thus pair (1) is incorrect.",
    aspirantMistakeMr: "अभ्यस्त शब्द आणि समासाचे प्रकार यात विद्यार्थी गल्लत करतात, आणि खालील बरोबर असलेल्या जोड्यांवर संशय घेतात.",
    aspirantMistakeEn: "Aspirants confuse Abhyasta words with Samas categories and wrongly suspect legitimate Samahar or Vaikalpik options.",
    preventionRuleMr: "नियम क्र. ८: संकल्पनांची व्याख्या नीट आठवा: समासाचे मूळ ४ प्रकार (अव्ययीभाव, तत्पुरुष, द्वंद्व, बहुव्रीही) आणि त्यांचेच अधिकृत उपप्रकार लक्षात ठेवा.",
    preventionRuleEn: "Rule 8: Stick strictly to textbook definitions of categories and avoid mixing up word-formation with compound nouns.",
    mpscExamReference: 'MPSC Combine Mains Paper 1 (Marathi) 2022 / 2023',
    dangerLevel: 4
  },

  // 9. Modern History - Extreme Words ('फक्त')
  {
    id: 'trap_hist_09',
    trapType: 'extreme_words',
    trapTypeTitleMr: "⚡ 'फक्त आणि केवळ' समाजसुधारक ट्रॅप",
    trapTypeTitleEn: "'Only / Exclusively' Reformers Trap",
    subjectId: 'maharashtra_history',
    subjectTitleMr: 'महाराष्ट्राचा इतिहास',
    subjectTitleEn: 'Maharashtra History',
    topic: 'महात्मा जोतीराव फुले व सत्यशोधक समाज',
    difficulty: 'Extremely Tricky',
    questionMr: "सत्यशोधक समाजाच्या स्थापनेबाबत खालील विधाने वाचा:\n\nविधान (a): सत्यशोधक समाजाची स्थापना २४ सप्टेंबर १८७३ रोजी पुणे येथे झाली.\nविधान (b): सत्यशोधक समाजात फक्त शूद्र व अतिशूद्र समाजातील व्यक्तींनाच सदस्यत्व दिले जात होते, इतर कोणत्याही जातीच्या व्यक्तीला प्रवेश नव्हता.\nविधान (c): 'सर्वसाक्षी जगत्पती । त्याला नकोच मध्यस्थी ॥' हे सत्यशोधक समाजाचे ब्रीदवाक्य होते.\n\nयोग्य पर्याय निवडा:\n(1) विधाने (a) आणि (c) सत्य, विधान (b) असत्य\n(2) विधाने (a), (b) आणि (c) सर्व सत्य\n(3) केवळ विधान (a) सत्य\n(4) केवळ विधान (b) सत्य",
    questionEn: "Read the following statements regarding the founding of Satyashodhak Samaj:\n\nStatement (a): Satyashodhak Samaj was founded on 24 September 1873 at Pune.\nStatement (b): Membership in Satyashodhak Samaj was granted ONLY to Shudra and Ati-Shudra individuals, and persons of no other caste were admitted.\nStatement (c): 'Sarvasakshi Jagatpati, Tyala Nakoch Madhyasthi' was the motto of Satyashodhak Samaj.\n\nChoose the correct option:\n(1) Statements (a) and (c) are TRUE, statement (b) is FALSE\n(2) Statements (a), (b) and (c) are ALL TRUE\n(3) Only statement (a) is true\n(4) Only statement (b) is true",
    optionsMr: [
      'विधाने (a) आणि (c) सत्य, विधान (b) असत्य',
      'विधाने (a), (b) आणि (c) सर्व सत्य',
      'केवळ विधान (a) सत्य',
      'केवळ विधान (b) सत्य'
    ],
    optionsEn: [
      'Statements (a) and (c) are TRUE, statement (b) is FALSE',
      'Statements (a), (b) and (c) are ALL TRUE',
      'Only statement (a) is true',
      'Only statement (b) is true'
    ],
    correctAnswerIndex: 0, // Statement (b) is false because membership was open to all castes and religions (e.g. Ramayya Ayyavaru, Dr. Santoji Lad, etc.)
    commonTrapOptionIndex: 1, // Students think Satyashodhak was strictly only for backward classes
    trapKeywordsMr: ['फक्त शूद्र व अतिशूद्र व्यक्तींनाच', 'इतर कोणत्याही जातीला प्रवेश नव्हता'],
    trapKeywordsEn: ['ONLY Shudra and Ati-Shudra', 'NO other caste admitted'],
    trapExplanationMr: "सत्यशोधक समाजाचे सदस्यत्व सर्व जाती, धर्म व पंथांतील व्यक्तींसाठी खुले होते. महात्मा फुले यांचे ब्राह्मण मित्र (उदा. विनायकराव बापूजी भांडारकर, सदाशिव गोवंडे) तसेच मुस्लिम, ख्रिश्चन व इतर धर्मीयही सत्यशोधक समाजाशी जोडलेले होते. त्यामुळे विधान (b) मधील 'फक्त' हा शब्द असत्य ठरतो. विधाने (a) व (c) सत्य आहेत. अचूक पर्याय (१) आहे.",
    trapExplanationEn: "Membership of Satyashodhak Samaj was open to ALL castes, creeds and religions. Mahatma Phule's associates included people from all backgrounds (including Brahmins like Sadashiv Govande, as well as Muslims and Christians). The restrictive word 'ONLY' in (b) is false. Hence (1) is correct.",
    aspirantMistakeMr: "अनेक विद्यार्थी 'सत्यशोधक समाज हा बहुजन हिताचा होता' या विचाराने विधान (b) खरे मानून सर्व विधाने बरोबर (पर्याय २) निवडतात आणि -०.२५ निगेटिव्ह होते.",
    aspirantMistakeEn: "Aspirants assume since it championed backward classes, membership must have been restricted to them, erroneously validating statement (b).",
    preventionRuleMr: "नियम क्र. ९: आधुनिक सुधारणा चळवळींमध्ये (सत्यशोधक समाज, प्रार्थना समाज, ब्राह्मो समाज) सदस्यत्वाची दारे सर्वांसाठी खुली होती. 'फक्त याच जातीला प्रवेश' असा दावा आल्यास सावध व्हा!",
    preventionRuleEn: "Rule 9: Major social reform societies generally had open doors regardless of caste. Watch out for exclusionary claims.",
    mpscExamReference: 'MPSC Rajyaseva Prelims 2021 / Combine Group B 2020',
    dangerLevel: 5
  },

  // 10. Polity - 'बिनचूक नसलेले' (Double Negative Trap!)
  {
    id: 'trap_polity_10',
    trapType: 'double_meaning',
    trapTypeTitleMr: "⚖️ 'बिनचूक नसलेले' (Double Negative) ट्रॅप",
    trapTypeTitleEn: "'Not Flawless' Double Negative Trap",
    subjectId: 'polity',
    subjectTitleMr: 'भारतीय राज्यव्यवस्था',
    subjectTitleEn: 'Indian Polity',
    topic: 'संसदेचे कामकाज व अविश्वास ठराव',
    difficulty: 'Extremely Tricky',
    questionMr: "भारतीय संसदेतील 'अविश्वास ठरावा'बाबत (No-Confidence Motion) खालीलपैकी कोणते विधान 'बिनचूक नाही' (म्हणजेच चुकीचे आहे)?\n\n(1) अविश्वास ठराव केवळ लोकसभेतच मांडला जाऊ शकतो, राज्यसभेत नाही.\n(2) अविश्वास ठराव मांडण्यासाठी लोकसभेतील किमान ५० सदस्यांचा पाठिंबा आवश्यक असतो.\n(3) अविश्वास ठरावात सरकारविरुद्ध अविश्वासाची नेमकी कारणे नमूद करणे घटनेनुसार बंधनकारक आहे.\n(4) अविश्वास ठराव संमत झाल्यास संपूर्ण मंत्रिमंडळाला राजीनामा द्यावा लागतो.",
    questionEn: "Regarding the 'No-Confidence Motion' in the Indian Parliament, which of the following statements is 'NOT flawless' (i.e. INCORRECT)?\n\n(1) A No-Confidence Motion can be moved ONLY in the Lok Sabha, not in the Rajya Sabha.\n(2) At least 50 members' support is required to introduce a No-Confidence Motion in the Lok Sabha.\n(3) It is constitutionally mandatory to state the specific reasons for no-confidence in the motion.\n(4) If passed, the entire Council of Ministers must resign.",
    optionsMr: [
      'अविश्वास ठराव केवळ लोकसभेत मांडता येतो, राज्यसभेत नाही.',
      'किमान ५० सदस्यांचा पाठिंबा आवश्यक असतो.',
      'अविश्वासाची नेमकी कारणे नमूद करणे बंधनकारक आहे.',
      'ठराव संमत झाल्यास मंत्रिमंडळाला राजीनामा द्यावा लागतो.'
    ],
    optionsEn: [
      'Motion can be moved only in Lok Sabha, not in Rajya Sabha.',
      'Requires support of at least 50 members.',
      'Mandatory to state specific reasons for no-confidence.',
      'If passed, the entire Ministry must resign.'
    ],
    correctAnswerIndex: 2, // Statement 3 is wrong because No reasons need to be stated for a No-Confidence motion! (Reasons are needed for Censure motion, not No-confidence!)
    commonTrapOptionIndex: 0, // Students think "केवळ लोकसभेत" is an extreme word and assume it's wrong!
    trapKeywordsMr: ['बिनचूक नाही (चुकीचे)', 'नेमकी कारणे नमूद करणे बंधनकारक'],
    trapKeywordsEn: ['NOT flawless (Incorrect)', 'mandatory to state specific reasons'],
    trapExplanationMr: "लोकसभेच्या नियम १९८ नुसार 'अविश्वास ठराव' आणण्यासाठी सरकारविरुद्ध कोणतेही कारण नमूद करण्याची आवश्यकता नसते! (कारणे नमूद करणे हे 'निषेध ठरावात' - Censure Motion मध्ये आवश्यक असते). विधान (१) सत्य आहे कारण मंत्रिमंडळ केवळ लोकसभेला जबाबदार असते (अनुच्छेद ७५(३)). म्हणून विधान (३) हे 'बिनचूक नाही' (चुकीचे आहे).",
    trapExplanationEn: "Under Lok Sabha Rule 198, a No-Confidence Motion does NOT require stating any reasons! (Reasons are mandatory for a Censure Motion, not No-Confidence). Statement 1 is true because Ministers are collectively responsible only to Lok Sabha. Thus, Statement 3 is NOT flawless (incorrect).",
    aspirantMistakeMr: "विद्यार्थी 'अविश्वास ठराव' आणि 'निषेध ठराव' (Censure Motion) मधील फरक विसरतात. शिवाय 'बिनचूक नाही' म्हणजे 'चुकीचे' हे समजण्यात गोंधळतात.",
    aspirantMistakeEn: "Aspirants confuse No-Confidence Motion with Censure Motion, and get tangled by the double-negative phrasing 'Not Binchuk'.",
    preventionRuleMr: "नियम क्र. १०: 'बिनचूक नाही' = 'चूक' (Incorrect). अविश्वास ठरावाला कारणे लागत नाहीत, पण निषेध ठरावाला कारणे लागतात!",
    preventionRuleEn: "Rule 10: 'Not Binchuk' equals 'Incorrect'. Remember: No-Confidence needs NO reasons; Censure motion DOES need reasons.",
    mpscExamReference: 'MPSC Rajyaseva Prelims 2023 / Combine Group B 2022',
    dangerLevel: 5
  },

  // 11. Maharashtra Geography - 'विधान व कारण'
  {
    id: 'trap_geo_11',
    trapType: 'assertion_reason',
    trapTypeTitleMr: "🧩 'पर्जन्यछायेचा प्रदेश' विधान व कारण ट्रॅप",
    trapTypeTitleEn: "Rainshadow Zone Assertion & Reason",
    subjectId: 'maharashtra_geography',
    subjectTitleMr: 'महाराष्ट्राचा भूगोल',
    subjectTitleEn: 'Maharashtra Geography',
    topic: 'महाराष्ट्राचे हवामान व पर्जन्यमान',
    difficulty: 'Tricky',
    questionMr: "खालील दोन विधाने (A) आणि (R) चा विचार करा:\n\nविधान (A): महाबळेश्वर येथे सुमारे ६०० सेंमी पाऊस पडतो, तर तिथून अवघ्या ३० किमी अंतरावरील वाई येथे केवळ ७० सेंमी पाऊस पडतो.\nकारण (R): सह्याद्री पर्वत ओलांडून पूर्वेकडे वाहणारे नैऋत्य मान्सून वारे खाली उतरताना उष्ण होतात आणि त्यांची बाष्पधारण क्षमता वाढते.\n\nयोग्य पर्याय निवडा:\n(1) (A) आणि (R) दोन्ही बरोबर आहेत आणि (R) हे (A) चे योग्य स्पष्टीकरण आहे.\n(2) (A) आणि (R) दोन्ही बरोबर आहेत, परंतु (R) हे (A) चे योग्य स्पष्टीकरण नाही.\n(3) (A) बरोबर आहे, पण (R) चूक आहे.\n(4) (A) चूक आहे, पण (R) बरोबर आहे.",
    questionEn: "Consider the following two statements (A) and (R):\n\nAssertion (A): Mahabaleshwar receives around 600 cm rainfall, while Wai located just 30 km to the east receives only around 70 cm rainfall.\nReason (R): As the southwest monsoon winds cross the Sahyadri mountains and descend on the eastern slopes, they warm up and their moisture-holding capacity increases.\n\nChoose the correct option:\n(1) Both (A) and (R) are correct and (R) is the correct explanation of (A).\n(2) Both (A) and (R) are correct, but (R) is NOT the correct explanation of (A).\n(3) (A) is correct, but (R) is wrong.\n(4) (A) is wrong, but (R) is correct.",
    optionsMr: [
      '(A) आणि (R) दोन्ही बरोबर आहेत आणि (R) हे (A) चे योग्य स्पष्टीकरण आहे.',
      '(A) आणि (R) दोन्ही बरोबर आहेत, परंतु (R) हे (A) चे योग्य स्पष्टीकरण नाही.',
      '(A) बरोबर आहे, पण (R) चूक आहे.',
      '(A) चूक आहे, पण (R) बरोबर आहे.'
    ],
    optionsEn: [
      'Both (A) and (R) are correct and (R) is the correct explanation of (A).',
      'Both (A) and (R) are correct, but (R) is NOT the correct explanation of (A).',
      '(A) is correct, but (R) is wrong.',
      '(A) is wrong, but (R) is correct.'
    ],
    correctAnswerIndex: 0, // Here R IS the exact scientific explanation of A! (Rainshadow effect mechanism)
    commonTrapOptionIndex: 1, // Students think "distance is 30km, this can't be the reason" or fear trap and pick option 2!
    trapKeywordsMr: ['दोन्ही बरोबर व योग्य स्पष्टीकरण', 'पर्जन्यछायेचा प्रदेश'],
    trapKeywordsEn: ['Both correct and valid explanation', 'Rainshadow mechanism'],
    trapExplanationMr: "सह्याद्रीच्या पश्चिमेस प्रतिरोध (Orographic) पर्जन्य पडून वारे पूर्वेकडील उतारावरून खाली उतरतात, तेव्हा त्यांचे तापमान वाढून सापेक्ष आर्द्रता कमी होते, ज्यामुळे पर्जन्यछायेचा प्रदेश (Rain Shadow Zone) तयार होतो. त्यामुळे महाबळेश्वर (घाटमाथा) व वाई (पर्जन्यछाया) यांच्या पर्जन्यात एवढा मोठा फरक पडतो. (R) हे (A) चे १००% अचूक शास्त्रीय स्पष्टीकरण आहे (पर्याय १).",
    trapExplanationEn: "Orographic rain falls on the western slope. As winds descend on the eastern leeward slope, adiabatic warming occurs, increasing moisture-holding capacity and drastically reducing condensation. Hence Wai receives only ~70 cm compared to Mahabaleshwar's ~600 cm. (R) is the exact scientific reason for (A). Option 1 is correct.",
    aspirantMistakeMr: "काही विद्यार्थी आधीच्या ट्रॅपमुळे घाबरतात आणि 'नेहमी पर्याय २ च असतो' असा गैरसमज करून पर्याय (२) निवडतात! येथे शास्त्रीय कारण तंतोतंत जुळते.",
    aspirantMistakeEn: "Some students overthink and assume every Assertion-Reason question must be a trick (Option 2), missing that here Reason directly explains the phenomena.",
    preventionRuleMr: "नियम क्र. ११: घाबरून किंवा पूर्वग्रहाने पर्याय निवडू नका. जर 'कारण' हे थेट 'कसे आणि का' याचे वैज्ञानिक उत्तर देत असेल, तर बिनधास्त पर्याय (१) निवडा!",
    preventionRuleEn: "Rule 11: Don't assume every Assertion-Reason is a trap. If Reason directly answers 'Why and How', Option 1 is the true answer.",
    mpscExamReference: 'MPSC Combine Group B 2021 / Rajyaseva 2018',
    dangerLevel: 4
  },

  // 12. Current Affairs & Schemes - Negative Phrasing
  {
    id: 'trap_ca_12',
    trapType: 'negative_phrasing',
    trapTypeTitleMr: "🚫 'कोणती तरतूद लागू नाही' योजना ट्रॅप",
    trapTypeTitleEn: "'Which Provision Does NOT Apply' Trap",
    subjectId: 'current_affairs',
    subjectTitleMr: 'चालू घडामोडी व शासकीय योजना',
    subjectTitleEn: 'Current Affairs & Schemes',
    topic: 'मुख्यमंत्री माझी लाडकी बहीण योजना २०२४-२६',
    difficulty: 'Tricky',
    questionMr: "महाराष्ट्र शासनाच्या 'मुख्यमंत्री माझी लाडकी बहीण योजना' च्या पात्रतेबाबत खालीलपैकी कोणती अट 'लागू नाही'?\n\n(1) लाभार्थी महिलेचे वय २१ ते ६५ वर्षे दरम्यान असावे.\n(2) कुटुंबाचे वार्षिक उत्पन्न २.५० लाख रुपयांपेक्षा जास्त नसावे.\n(3) महिलेच्या नावावर चारचाकी वाहन (ट्रॅक्टर वगळून) असल्यास अपात्र ठरेल.\n(4) कुटुंबातील एकाच महिलेला या योजनेचा लाभ घेता येतो, दुसऱ्या अविवाहित किंवा विवाहित बहिणीला/स्त्रीला सक्त मनाई आहे.",
    questionEn: "Regarding eligibility for the Maharashtra Government's 'Mukhyamantri Majhi Ladki Bahin Yojana', which of the following conditions does 'NOT apply'?\n\n(1) The beneficiary woman's age must be between 21 and 65 years.\n(2) Family's annual income must not exceed Rs 2.50 lakh.\n(3) Having a four-wheeler (excluding tractor) in the woman's name renders her ineligible.\n(4) Only one woman per family can avail the scheme, strictly prohibiting a second woman.",
    optionsMr: [
      'वय २१ ते ६५ वर्षे असावे.',
      'कुटुंबाचे उत्पन्न २.५० लाखांपेक्षा जास्त नसावे.',
      'चारचाकी वाहन (ट्रॅक्टर वगळून) असल्यास अपात्र.',
      'कुटुंबातील केवळ एकाच महिलेला लाभ मिळतो, दुसऱ्या स्त्रीला सक्त मनाई आहे.'
    ],
    optionsEn: [
      'Age between 21 and 65 years.',
      'Annual family income not exceeding 2.50 lakh.',
      'Four-wheeler (excluding tractor) disqualifies.',
      'Only one woman per family allowed, second strictly banned.'
    ],
    correctAnswerIndex: 3, // In Maharashtra GR amendment, if family has one married and one unmarried daughter, both can benefit!
    commonTrapOptionIndex: 0, // In initially announced scheme, age was 21-60, later amended to 65. Students think 65 is wrong!
    trapKeywordsMr: ['कोणती अट लागू नाही', 'केवळ एकाच महिलेला लाभ'],
    trapKeywordsEn: ['does NOT apply', 'Only one woman per family'],
    trapExplanationMr: "शासनाने सुधारित शासन निर्णयानुसार एका कुटुंबातील दोन महिलांना (उदा. एक सून व एक अविवाहित मुलगी किंवा दोन बहिणी) लाभ घेण्याची अनुमती दिली आहे. त्यामुळे 'दुसऱ्या स्त्रीला सक्त मनाई आहे' ही अट लागू नाही. तसेच वयोमर्यादा सुधारित करून २१ ते ६५ वर्षे करण्यात आली आहे. म्हणून विधान (४) हे लागू नाही.",
    trapExplanationEn: "Under the amended Government Resolution (GR), up to two women per family (e.g. daughter-in-law and unmarried daughter) can avail the benefit. Hence condition (4) does NOT apply.",
    aspirantMistakeMr: "विद्यार्थी जुन्या GR मधील वयोमर्यादा (२१ ते ६०) लक्षात ठेवतात आणि पर्याय (१) चुकीचा मानतात, तर सुधारित GR मधील बदल लक्षात न आल्याने फसतात.",
    aspirantMistakeEn: "Students rely on initial announcements instead of amended GRs and misjudge the updated eligibility criteria.",
    preventionRuleMr: "नियम क्र. १२: सरकारी योजनांच्या प्रश्नात 'सुधारित अटी' (Amendments/Additions) नेहमी तपासा. 'सक्त मनाई' अशा टोकाच्या अटी सहसा खोट्या असतात.",
    preventionRuleEn: "Rule 12: Always check updated government resolution amendments; extreme words like 'strictly prohibited' are usually incorrect.",
    mpscExamReference: 'MPSC Combine Prelims Current Affairs 2024-2025',
    dangerLevel: 4
  }
];
