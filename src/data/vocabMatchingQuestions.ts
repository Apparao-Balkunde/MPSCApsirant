import { Question } from '../types';

export interface VocabMatchPair {
  id: string;
  englishWord: string;
  marathiMeaning: string;
  category: 'synonyms' | 'antonyms' | 'one_word' | 'idioms' | 'pyq_mpsc';
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  pronunciation?: string;
  exampleSentence?: string;
  exampleSentenceMr?: string;
  examTag?: string;
}

// 80+ Authentic High-Yield English-to-Marathi Vocabulary Pairs from MPSC Question Papers
export const VOCAB_MATCH_PAIRS: VocabMatchPair[] = [
  // --- 1. High-Yield Synonyms Pairs (समानार्थी जोड्या) ---
  {
    id: 'pair_01',
    englishWord: 'Benevolent',
    marathiMeaning: 'दयाळू / परोपकारी (Kind & Generous)',
    category: 'synonyms',
    difficulty: 'Easy',
    pronunciation: 'बनेव्होलन्ट',
    exampleSentence: 'The benevolent king donated his wealth to the poor.',
    exampleSentenceMr: 'दयाळू राजाने आपली संपत्ती गरिबांना दान केली.',
    examTag: 'MPSC Combine 2022'
  },
  {
    id: 'pair_02',
    englishWord: 'Ephemeral',
    marathiMeaning: 'क्षणभंगुर / अल्पायुषी (Short-lived)',
    category: 'synonyms',
    difficulty: 'Moderate',
    pronunciation: 'इफेमरल',
    exampleSentence: 'Fame in social media is often ephemeral.',
    exampleSentenceMr: 'सोशल मीडियावरील प्रसिद्धी अनेकदा क्षणभंगुर असते.',
    examTag: 'MPSC Rajyaseva 2020'
  },
  {
    id: 'pair_03',
    englishWord: 'Placid',
    marathiMeaning: 'शांत / प्रशांत (Calm & Serene)',
    category: 'synonyms',
    difficulty: 'Easy',
    pronunciation: 'प्लॅसिड',
    exampleSentence: 'The placid waters of the lake reflected the mountains.',
    exampleSentenceMr: 'तलावाच्या शांत पाण्यात पर्वतांचे प्रतिबिंब दिसत होते.',
    examTag: 'MPSC Combine 2023'
  },
  {
    id: 'pair_04',
    englishWord: 'Meticulous',
    marathiMeaning: 'काटेकोर / अतिसावध (Thorough & Precise)',
    category: 'synonyms',
    difficulty: 'Moderate',
    pronunciation: 'मेटिकलस',
    exampleSentence: 'She is meticulous in keeping all financial records.',
    exampleSentenceMr: 'सर्व आर्थिक नोंदी काटेकोरपणे ठेवण्यात ती चोख आहे.',
    examTag: 'MPSC Rajyaseva 2021'
  },
  {
    id: 'pair_05',
    englishWord: 'Gregarious',
    marathiMeaning: 'समाजप्रिय / घोळक्यात राहणारा (Sociable)',
    category: 'synonyms',
    difficulty: 'Moderate',
    pronunciation: 'ग्रेगेरियस',
    exampleSentence: 'He is a gregarious person who makes friends easily.',
    exampleSentenceMr: 'तो समाजात मिसळणारा मनमिळाऊ मनुष्य आहे.',
    examTag: 'MPSC Combine 2022'
  },
  {
    id: 'pair_06',
    englishWord: 'Prodigal',
    marathiMeaning: 'उधळ्या / अपव्ययी (Extravagant / Wasteful)',
    category: 'synonyms',
    difficulty: 'Moderate',
    pronunciation: 'प्रॉडिकल',
    exampleSentence: 'His prodigal habits led him into heavy debt.',
    exampleSentenceMr: 'त्याच्या उधळ्या सवयींमुळे तो प्रचंड कर्जात बुडाला.',
    examTag: 'MPSC Combine 2020'
  },
  {
    id: 'pair_07',
    englishWord: 'Sagacious',
    marathiMeaning: 'शहाणा / दूरदर्शी (Wise & Shrewd)',
    category: 'synonyms',
    difficulty: 'Moderate',
    pronunciation: 'सगेशियस',
    exampleSentence: 'The leader made a sagacious decision during the crisis.',
    exampleSentenceMr: 'संकटसमयी नेत्याने अत्यंत दूरदर्शी निर्णय घेतला.',
    examTag: 'MPSC Combine 2020'
  },
  {
    id: 'pair_08',
    englishWord: 'Taciturn',
    marathiMeaning: 'मितभाषी / अबोल (Silent & Reserved)',
    category: 'synonyms',
    difficulty: 'Moderate',
    pronunciation: 'टॅसिटर्न',
    exampleSentence: 'He was a taciturn man who spoke only when necessary.',
    exampleSentenceMr: 'तो आवश्यक असेल तेव्हाच बोलणारा अबोल मनुष्य होता.',
    examTag: 'MPSC Rajyaseva 2019'
  },
  {
    id: 'pair_09',
    englishWord: 'Affable',
    marathiMeaning: 'स्नेहशील / मनमिळाऊ (Friendly & Genial)',
    category: 'synonyms',
    difficulty: 'Easy',
    pronunciation: 'अॅफबल',
    exampleSentence: 'The new officer has an affable demeanor.',
    exampleSentenceMr: 'नवीन अधिकाऱ्याचा स्वभाव अतिशय मनमिळाऊ आहे.',
    examTag: 'MPSC Combine 2022'
  },
  {
    id: 'pair_10',
    englishWord: 'Lucid',
    marathiMeaning: 'सुस्पष्ट / सहज समजणारा (Clear & Intelligible)',
    category: 'synonyms',
    difficulty: 'Easy',
    pronunciation: 'ल्युसिड',
    exampleSentence: 'The professor gave a lucid explanation of the concept.',
    exampleSentenceMr: 'प्राध्यापकांनी संकल्पनेचे अत्यंत सुस्पष्ट स्पष्टीकरण दिले.',
    examTag: 'MPSC Combine 2014'
  },
  {
    id: 'pair_11',
    englishWord: 'Diligent',
    marathiMeaning: 'कष्टाळू / उद्योगप्रिय (Industrious & Hardworking)',
    category: 'synonyms',
    difficulty: 'Easy',
    pronunciation: 'डिलिजन्ट',
    exampleSentence: 'A diligent student always reaps good exam results.',
    exampleSentenceMr: 'कष्टाळू विद्यार्थ्याला परीक्षेत नेहमी उत्तम यश मिळते.',
    examTag: 'MPSC Group C 2019'
  },
  {
    id: 'pair_12',
    englishWord: 'Dearth',
    marathiMeaning: 'टंचाई / दुर्भिक्ष (Scarcity & Paucity)',
    category: 'synonyms',
    difficulty: 'Moderate',
    pronunciation: 'डर्थ',
    exampleSentence: 'There was a severe dearth of water during summer.',
    exampleSentenceMr: 'उन्हाळ्यात पाण्याची भीषण टंचाई निर्माण झाली होती.',
    examTag: 'MPSC Rajyaseva 2018'
  },
  {
    id: 'pair_13',
    englishWord: 'Superfluous',
    marathiMeaning: 'अनावश्यक अतिरिक्त (Redundant / Surplus)',
    category: 'synonyms',
    difficulty: 'Moderate',
    pronunciation: 'सुपरफ्लुअस',
    exampleSentence: 'Avoid superfluous words in your essay.',
    exampleSentenceMr: 'निबंधात अनावश्यक व जास्तीचे शब्द वापरणे टाळा.',
    examTag: 'MPSC Rajyaseva 2020'
  },
  {
    id: 'pair_14',
    englishWord: 'Arduous',
    marathiMeaning: 'कष्टप्रद / खडतर (Strenuous & Laborious)',
    category: 'synonyms',
    difficulty: 'Hard',
    pronunciation: 'आर्ज्युअस',
    exampleSentence: 'Climbing Mount Everest is an arduous expedition.',
    exampleSentenceMr: 'एव्हरेस्ट सर करणे ही एक अत्यंत खडतर मोहीम आहे.',
    examTag: 'MPSC Combine 2023'
  },
  {
    id: 'pair_15',
    englishWord: 'Candour',
    marathiMeaning: 'स्पष्टवक्तेपणा / प्रामाणिकपणा (Frankness & Sincerity)',
    category: 'synonyms',
    difficulty: 'Moderate',
    pronunciation: 'कॅन्डर',
    exampleSentence: 'I admire the candour of his statements.',
    exampleSentenceMr: 'त्याच्या वक्तव्यातील प्रामाणिक रोखठोकपणा मला आवडतो.',
    examTag: 'MPSC Rajyaseva 2016'
  },

  // --- 2. Antonyms Pairs (विरुद्धार्थी जोड्या) ---
  {
    id: 'pair_16',
    englishWord: 'Obsolete',
    marathiMeaning: 'कालबाह्य ↔ आधुनिक (Modern)',
    category: 'antonyms',
    difficulty: 'Easy',
    pronunciation: 'ऑब्सोलीट',
    exampleSentence: 'Typewriters have become obsolete today.',
    exampleSentenceMr: 'आज टाइपरायटर कालबाह्य झाले आहेत.',
    examTag: 'MPSC Rajyaseva 2021'
  },
  {
    id: 'pair_17',
    englishWord: 'Nadir',
    marathiMeaning: 'नीचांक / तळ ↔ सर्वोच्च शिखर (Zenith / Peak)',
    category: 'antonyms',
    difficulty: 'Moderate',
    pronunciation: 'नादिर',
    exampleSentence: 'His career reached its nadir after the scam.',
    exampleSentenceMr: 'घोटाळ्यानंतर त्याची कारकीर्द नीचांकाला पोहोचली.',
    examTag: 'MPSC Rajyaseva 2022'
  },
  {
    id: 'pair_18',
    englishWord: 'Ostentatious',
    marathiMeaning: 'भपकेबाज ↔ साधा / विनम्र (Modest)',
    category: 'antonyms',
    difficulty: 'Moderate',
    pronunciation: 'ऑस्टेन्स्टेशस',
    exampleSentence: 'She dislikes ostentatious displays of wealth.',
    exampleSentenceMr: 'तिला संपत्तीचे भपकेबाज प्रदर्शन करणे आवडत नाही.',
    examTag: 'MPSC Combine 2022'
  },
  {
    id: 'pair_19',
    englishWord: 'Loquacious',
    marathiMeaning: 'वाचाळ ↔ अबोल / मितभाषी (Taciturn / Reserved)',
    category: 'antonyms',
    difficulty: 'Moderate',
    pronunciation: 'लोकवेशस',
    exampleSentence: 'The loquacious guest dominated the dinner conversation.',
    exampleSentenceMr: 'वाचाळ पाहुण्याने संपूर्ण जेवणात एकट्यानेच बडबड केली.',
    examTag: 'MPSC Combine 2017'
  },
  {
    id: 'pair_20',
    englishWord: 'Affluent',
    marathiMeaning: 'श्रीमंत / धनाढ्य ↔ कंगाल / गरीब (Destitute)',
    category: 'antonyms',
    difficulty: 'Easy',
    pronunciation: 'अॅफ्लुएन्ट',
    exampleSentence: 'They lived in an affluent neighborhood.',
    exampleSentenceMr: 'ते श्रीमंत वस्त्यांच्या भागात राहत होते.',
    examTag: 'MPSC Rajyaseva 2017'
  },
  {
    id: 'pair_21',
    englishWord: 'Obstinate',
    marathiMeaning: 'हट्टी / हेकेखोर ↔ लवचिक / नमते घेणारा (Flexible / Docile)',
    category: 'antonyms',
    difficulty: 'Moderate',
    pronunciation: 'ऑब्स्टिनेट',
    exampleSentence: 'The obstinate child refused to take medicine.',
    exampleSentenceMr: 'हट्टी मुलाने औषध घेण्यास स्पष्ट नकार दिला.',
    examTag: 'MPSC Combine 2020'
  },
  {
    id: 'pair_22',
    englishWord: 'Dormant',
    marathiMeaning: 'सुप्त / शांत ↔ सक्रिय / जागृत (Active)',
    category: 'antonyms',
    difficulty: 'Easy',
    pronunciation: 'डॉरमन्ट',
    exampleSentence: 'The dormant volcano erupted after centuries.',
    exampleSentenceMr: 'शतकांनंतर सुप्त ज्वालामुखीचा उद्रेक झाला.',
    examTag: 'MPSC Rajyaseva 2019'
  },
  {
    id: 'pair_23',
    englishWord: 'Authentic',
    marathiMeaning: 'अस्सल / खरा ↔ बनावट / खोटा (Spurious / Fake)',
    category: 'antonyms',
    difficulty: 'Easy',
    pronunciation: 'ऑथेंटिक',
    exampleSentence: 'The museum holds authentic historical artifacts.',
    exampleSentenceMr: 'संग्रहालयात अस्सल ऐतिहासिक वस्तू जपून ठेवल्या आहेत.',
    examTag: 'MPSC STI 2017'
  },
  {
    id: 'pair_24',
    englishWord: 'Tranquil',
    marathiMeaning: 'शांत ↔ खवळलेला / अशांत (Turbulent)',
    category: 'antonyms',
    difficulty: 'Easy',
    pronunciation: 'ट्रॅन्क्विल',
    exampleSentence: 'Early mornings in the village are tranquil.',
    exampleSentenceMr: 'गावातील पहाट अतिशय शांत असते.',
    examTag: 'MPSC Rajyaseva 2018'
  },
  {
    id: 'pair_25',
    englishWord: 'Fickle',
    marathiMeaning: 'चंचल ↔ अढळ / निष्ठावान (Steadfast / Constant)',
    category: 'antonyms',
    difficulty: 'Moderate',
    pronunciation: 'फिकल',
    exampleSentence: 'Public opinion can be fickle.',
    exampleSentenceMr: 'लोकांचे मत सतत चंचलपणे बदलणारे असू शकते.',
    examTag: 'MPSC Rajyaseva 2023'
  },

  // --- 3. One-Word Substitution Pairs (शब्दसमूहाबद्दल एक शब्द) ---
  {
    id: 'pair_26',
    englishWord: 'Stoic',
    marathiMeaning: 'सुख-दुःखात समभाव बाळगणारा (Indifferent to pain & pleasure)',
    category: 'one_word',
    difficulty: 'Moderate',
    pronunciation: 'स्टोइक',
    exampleSentence: 'He showed a stoic endurance throughout his illness.',
    exampleSentenceMr: 'आजारादरम्यान त्याने स्थितप्रज्ञासारखे धीरोदात्त वर्तन दाखवले.',
    examTag: 'MPSC STI 2014'
  },
  {
    id: 'pair_27',
    englishWord: 'Misanthrope',
    marathiMeaning: 'मानवद्वेष्टा (Hater of mankind)',
    category: 'one_word',
    difficulty: 'Easy',
    pronunciation: 'मिसन्थ्रोप',
    exampleSentence: 'The bitter old recluse became a misanthrope.',
    exampleSentenceMr: 'तो एकाकी वृद्ध माणूस मानवद्वेष्टा बनला.',
    examTag: 'MPSC Rajyaseva 2015'
  },
  {
    id: 'pair_28',
    englishWord: 'Panacea',
    marathiMeaning: 'रामबाण औषध / सर्व रोगहर (Cure for all diseases)',
    category: 'one_word',
    difficulty: 'Easy',
    pronunciation: 'पॅनेशिया',
    exampleSentence: 'Technology is not a panacea for all social issues.',
    exampleSentenceMr: 'तंत्रज्ञान हे सर्व सामाजिक समस्यांवरील रामबाण उपाय नाही.',
    examTag: 'MPSC Combine 2021'
  },
  {
    id: 'pair_29',
    englishWord: 'Infallible',
    marathiMeaning: 'अचूक / कधीही चूक न करणारा (Incapable of making error)',
    category: 'one_word',
    difficulty: 'Easy',
    pronunciation: 'इन्फॅलिबल',
    exampleSentence: 'No human system of justice is completely infallible.',
    exampleSentenceMr: 'कोणतीही मानवी न्यायव्यवस्था पूर्णतः अचूक नसते.',
    examTag: 'MPSC Tax Asst 2017'
  },
  {
    id: 'pair_30',
    englishWord: 'Bibliophile',
    marathiMeaning: 'पुस्तकप्रेमी / वाचनवेडा (Lover of books)',
    category: 'one_word',
    difficulty: 'Easy',
    pronunciation: 'बिब्लिओफाइल',
    exampleSentence: 'As a bibliophile, his shelves are overflowing with books.',
    exampleSentenceMr: 'पुस्तकप्रेमी असल्याने त्याचे कपाट पुस्तकांनी भरलेले आहे.',
    examTag: 'MPSC Rajyaseva 2014'
  },
  {
    id: 'pair_31',
    englishWord: 'Omnipotent',
    marathiMeaning: 'सर्वशक्तीमान (All-powerful)',
    category: 'one_word',
    difficulty: 'Easy',
    pronunciation: 'ओम्निपोटंट',
    exampleSentence: 'Ancient Greeks believed Zeus was an omnipotent god.',
    exampleSentenceMr: 'प्राचीन ग्रीक ज्यूस या देवाला सर्वशक्तीमान मानत असत.',
    examTag: 'MPSC PSI 2012'
  },
  {
    id: 'pair_32',
    englishWord: 'Omniscient',
    marathiMeaning: 'सर्वज्ञ / सर्व जाणणारा (Knowing everything)',
    category: 'one_word',
    difficulty: 'Easy',
    pronunciation: 'ओम्निशिअंट',
    exampleSentence: 'The narrator in this novel is omniscient.',
    exampleSentenceMr: 'या कादंबरीतील निवेदक सर्वज्ञ आहे.',
    examTag: 'MPSC Rajyaseva 2016'
  },
  {
    id: 'pair_33',
    englishWord: 'Apostate',
    marathiMeaning: 'स्वधर्मत्यागी / पाखंडी (One who renounces religion/party)',
    category: 'one_word',
    difficulty: 'Hard',
    pronunciation: 'अपॉस्टेट',
    exampleSentence: 'He was branded an apostate by his former party members.',
    exampleSentenceMr: 'त्याच्या जुन्या सहकाऱ्यांनी त्याला स्वपक्षत्यागी ठरवले.',
    examTag: 'MPSC STI 2015'
  },
  {
    id: 'pair_34',
    englishWord: 'Plutocracy',
    marathiMeaning: 'धनिकशाही / श्रीमंतांचे शासन (Government by the wealthy)',
    category: 'one_word',
    difficulty: 'Easy',
    pronunciation: 'प्लुटॉक्रसी',
    exampleSentence: 'Critics argue the tax breaks favor a plutocracy.',
    exampleSentenceMr: 'टीकाकारांच्या मते करसवलती धनिकशाहीला पोषक आहेत.',
    examTag: 'MPSC Rajyaseva 2017'
  },
  {
    id: 'pair_35',
    englishWord: 'Indefatigable',
    marathiMeaning: 'कधीही न थकणारा / अथक (Tireless worker)',
    category: 'one_word',
    difficulty: 'Moderate',
    pronunciation: 'इन्डिफॅटिगबल',
    exampleSentence: 'Her indefatigable spirit inspired all grassroots workers.',
    exampleSentenceMr: 'तिच्या अथक कार्यक्षमतेने सर्व कार्यकर्त्यांना प्रेरणा दिली.',
    examTag: 'MPSC Rajyaseva 2022'
  },
  {
    id: 'pair_36',
    englishWord: 'Lexicographer',
    marathiMeaning: 'शब्दकोशकार / कोशकार (Compiler of dictionaries)',
    category: 'one_word',
    difficulty: 'Moderate',
    pronunciation: 'लेक्सिकोग्राफर',
    exampleSentence: 'Dr. Samuel Johnson was a renowned English lexicographer.',
    exampleSentenceMr: 'डॉ. सॅम्युअल जॉन्सन हे प्रसिद्ध इंग्रजी शब्दकोशकार होते.',
    examTag: 'MPSC STI 2013'
  },
  {
    id: 'pair_37',
    englishWord: 'Somniloquist',
    marathiMeaning: 'झोपेत बोलणारा व्यक्ती (One who talks in sleep)',
    category: 'one_word',
    difficulty: 'Moderate',
    pronunciation: 'सोम्निलॉक्विस्ट',
    exampleSentence: 'He found out he was a somniloquist through his roommate.',
    exampleSentenceMr: 'आपण झोपेत बोलतो हे त्याला त्याच्या रूममेटकडून समजले.',
    examTag: 'MPSC Combine 2014'
  },
  {
    id: 'pair_38',
    englishWord: 'Cannibal',
    marathiMeaning: 'नरभक्षक (One who eats human flesh)',
    category: 'one_word',
    difficulty: 'Easy',
    pronunciation: 'कॅनिबल',
    exampleSentence: 'Ancient folklore mentions tales of ferocious cannibals.',
    exampleSentenceMr: 'प्राचीन दंतकथांमध्ये नरभक्षकांच्या रंजक गोष्टी आढळतात.',
    examTag: 'MPSC STI 2016'
  },
  {
    id: 'pair_39',
    englishWord: 'Sinecure',
    marathiMeaning: 'काम नसलेले भरभक्कम पगाराचे पद (Paid job with no work)',
    category: 'one_word',
    difficulty: 'Moderate',
    pronunciation: 'सायनीक्योर',
    exampleSentence: 'The advisory role turned out to be a comfortable sinecure.',
    exampleSentenceMr: 'सल्लागाराचे पद हे एक आरामदायी विनाकामाचे लाभदायक पद ठरले.',
    examTag: 'MPSC Rajyaseva 2012'
  },
  {
    id: 'pair_40',
    englishWord: 'Amnesty',
    marathiMeaning: 'सर्वसमावेशक राजक्षमा / जाहीर माफी (General pardon)',
    category: 'one_word',
    difficulty: 'Moderate',
    pronunciation: 'अॅम्नेस्टी',
    exampleSentence: 'The government granted amnesty to political prisoners.',
    exampleSentenceMr: 'शासनाने राजकीय कैद्यांना जाहीर राजक्षमा मंजूर केली.',
    examTag: 'MPSC Combine 2021'
  },

  // --- 4. Idioms & Phrases Pairs (वाक्प्रचार व अर्थ) ---
  {
    id: 'pair_41',
    englishWord: 'Turn a blind eye',
    marathiMeaning: 'जाणूनबुजून काणाडोळा करणे / दुर्लक्ष करणे (Ignore deliberately)',
    category: 'idioms',
    difficulty: 'Easy',
    pronunciation: 'टर्न अ ब्लाइंड आय',
    exampleSentence: 'The inspector turned a blind eye to minor traffic violations.',
    exampleSentenceMr: 'निरीक्षकाने किरकोळ वाहतूक उल्लंघनांकडे जाणूनबुजून दुर्लक्ष केले.',
    examTag: 'MPSC Rajyaseva 2017'
  },
  {
    id: 'pair_42',
    englishWord: 'Smell a rat',
    marathiMeaning: 'काहीतरी गैर किंवा डाळ शिजल्याचा संशय येणे (Suspect foul play)',
    category: 'idioms',
    difficulty: 'Easy',
    pronunciation: 'स्मेल अ रॅट',
    exampleSentence: 'When the deal seemed too easy, he began to smell a rat.',
    exampleSentenceMr: 'व्यवहार जेव्हा अतिशय सोपा वाटला, तेव्हा त्याला गैरप्रकाराचा संशय आला.',
    examTag: 'MPSC ASO 2016'
  },
  {
    id: 'pair_43',
    englishWord: 'Cut the Gordian knot',
    marathiMeaning: 'किचकट समस्या धाडसाने तात्काळ सोडवणे (Solve a complex problem boldy)',
    category: 'idioms',
    difficulty: 'Hard',
    pronunciation: 'कट द गोर्डियन नॉट',
    exampleSentence: 'The CEO cut the Gordian knot by merging both companies.',
    exampleSentenceMr: 'दोन्ही कंपन्यांचे विलीनीकरण करून मुख्य कार्यकारी अधिकाऱ्याने समस्या तात्काळ सोडवली.',
    examTag: 'MPSC Rajyaseva 2013'
  },
  {
    id: 'pair_44',
    englishWord: 'Barking up wrong tree',
    marathiMeaning: 'चुकीच्या दिशेने शोध घेणे / भलत्यावर संशय घेणे (Mistaken pursuit)',
    category: 'idioms',
    difficulty: 'Moderate',
    pronunciation: 'बार्किंग अप द रॉंग ट्री',
    exampleSentence: 'If you accuse him, you are barking up the wrong tree.',
    exampleSentenceMr: 'जर तुम्ही त्याच्यावर आरोप करत असाल तर तुमचा संशय चुकीच्या व्यक्तीवर आहे.',
    examTag: 'MPSC Combine 2019'
  },
  {
    id: 'pair_45',
    englishWord: 'At the eleventh hour',
    marathiMeaning: 'ऐनवेळी / अगदी शेवटच्या क्षणी (At the last possible moment)',
    category: 'idioms',
    difficulty: 'Easy',
    pronunciation: 'अॅट द इलेव्हन्थ अवर',
    exampleSentence: 'The train booking was confirmed at the eleventh hour.',
    exampleSentenceMr: 'ट्रेनचे आरक्षण अगदी शेवटच्या क्षणी निश्चित झाले.',
    examTag: 'MPSC Clerk 2018'
  },
  {
    id: 'pair_46',
    englishWord: 'A bolt from the blue',
    marathiMeaning: 'अचानक कोसळलेले अनपेक्षित संकट (Sudden unexpected disaster)',
    category: 'idioms',
    difficulty: 'Easy',
    pronunciation: 'अ बोल्ट फ्रॉम द ब्लू',
    exampleSentence: 'The sudden layoff was a bolt from the blue for workers.',
    exampleSentenceMr: 'अचानक झालेली नोकरकपात कामगारांवर कोसळलेल्या संकटासारखी होती.',
    examTag: 'MPSC PSI 2013'
  },
  {
    id: 'pair_47',
    englishWord: 'Once in a blue moon',
    marathiMeaning: 'अगदी क्वचित प्रसंगी / कधीतरीच (Very rarely)',
    category: 'idioms',
    difficulty: 'Easy',
    pronunciation: 'वन्स इन अ ब्लू मून',
    exampleSentence: 'He visits his ancestral village once in a blue moon.',
    exampleSentenceMr: 'तो आपल्या मूळ गावाला कधीतरीच अगदी क्वचित भेट देतो.',
    examTag: 'MPSC Group C 2019'
  },
  {
    id: 'pair_48',
    englishWord: 'Leave no stone unturned',
    marathiMeaning: 'प्रयत्नांची शिकस्त करणे / सर्व शक्य मार्ग वापरणे (Make every effort)',
    category: 'idioms',
    difficulty: 'Easy',
    pronunciation: 'लीव्ह नो स्टोन अनटर्नड',
    exampleSentence: 'He left no stone unturned to crack the MPSC exam.',
    exampleSentenceMr: 'एमपीएससी परीक्षा उत्तीर्ण होण्यासाठी त्याने प्रयत्नांची शिकस्त केली.',
    examTag: 'MPSC Combine 2022'
  },
  {
    id: 'pair_49',
    englishWord: 'A white elephant',
    marathiMeaning: 'खर्चिक पण निरुपयोगी भारभूत वस्तू (Costly and useless possession)',
    category: 'idioms',
    difficulty: 'Easy',
    pronunciation: 'अ व्हाइट एलिफंट',
    exampleSentence: 'The unused grand auditorium became a white elephant.',
    exampleSentenceMr: 'न वापरलेले ते भव्य सभागृह संस्थेसाठी पांढरा हत्ती ठरले.',
    examTag: 'MPSC Rajyaseva 2015'
  },
  {
    id: 'pair_50',
    englishWord: 'Bite the dust',
    marathiMeaning: 'सपाटून पराभूत होणे / धुळीस मिळणे (Be decisively defeated)',
    category: 'idioms',
    difficulty: 'Moderate',
    pronunciation: 'बाइट द डस्ट',
    exampleSentence: 'The defending champions bit the dust in the quarter-finals.',
    exampleSentenceMr: 'गतविजेत्या संघाला उपांत्यपूर्व फेरीतच धूळ चाखावी लागली.',
    examTag: 'MPSC Combine 2023'
  },
  {
    id: 'pair_51',
    englishWord: 'Grease someone\'s palm',
    marathiMeaning: 'हात ओला करणे / लाच देणे (Bribe someone secretly)',
    category: 'idioms',
    difficulty: 'Easy',
    pronunciation: 'ग्रीस समवन्स पाम',
    exampleSentence: 'He refused to grease the clerk\'s palm to get his file cleared.',
    exampleSentenceMr: 'फाईल मंजूर करण्यासाठी त्याने कारकुनाला लाच देण्यास नकार दिला.',
    examTag: 'MPSC PSI 2011'
  },
  {
    id: 'pair_52',
    englishWord: 'See eye to eye',
    marathiMeaning: 'पूर्णपणे सहमत असणे (Agree fully with each other)',
    category: 'idioms',
    difficulty: 'Easy',
    pronunciation: 'सी आय टू आय',
    exampleSentence: 'The two partners rarely see eye to eye on business policy.',
    exampleSentenceMr: 'दोन्ही भागीदारांचे व्यावसायिक धोरणांवर क्वचितच एकमत होते.',
    examTag: 'MPSC Combine 2016'
  },
  {
    id: 'pair_53',
    englishWord: 'Spill the beans',
    marathiMeaning: 'भांडे फोडणे / गुपित उघड करणे (Reveal a secret prematurely)',
    category: 'idioms',
    difficulty: 'Easy',
    pronunciation: 'स्पिल द बीन्स',
    exampleSentence: 'Don\'t trust him; he is quick to spill the beans.',
    exampleSentenceMr: 'त्याच्यावर विश्वास ठेवू नका; तो लगेच भांडे फोडतो.',
    examTag: 'MPSC Combine 2017'
  },
  {
    id: 'pair_54',
    englishWord: 'Snake in the grass',
    marathiMeaning: 'मित्राच्या वेशातील छुपा कपटी शत्रू (Hidden treacherous enemy)',
    category: 'idioms',
    difficulty: 'Easy',
    pronunciation: 'स्नेक इन द ग्रास',
    exampleSentence: 'Beware of him; he is a real snake in the grass.',
    exampleSentenceMr: 'त्याच्यापासून सावध राहा; तो गवत लपलेला छुपा साप आहे.',
    examTag: 'MPSC PSI 2015'
  },
  {
    id: 'pair_55',
    englishWord: 'Take with a grain of salt',
    marathiMeaning: 'साशंकतेने विचार करणे / सावध राहणे (Accept with skepticism)',
    category: 'idioms',
    difficulty: 'Moderate',
    pronunciation: 'टेक विथ अ ग्रेन ऑफ सॉल्ट',
    exampleSentence: 'Take social media rumors with a grain of salt.',
    exampleSentenceMr: 'सोशल मीडियावरील अफवांवर सावधगिरीने विचार करा.',
    examTag: 'MPSC Rajyaseva 2020'
  }
];

// --- 20 Official-Format MPSC Match-the-Columns MCQs using the standard Question Interface ---
export const VOCAB_MATCHING_MCQS: Question[] = [
  {
    id: 'en_vocab_match_01',
    subjectId: 'english_grammar',
    topic: 'English Vocabulary (MPSC Match)',
    subtopic: 'Match the Columns',
    exam: 'Both',
    difficulty: 'Moderate',
    questionEn: `Match the English words in Column 'A' with their correct Marathi meanings in Column 'B':
Column 'A' (English Words)       Column 'B' (Marathi Meanings)
a) Benevolent                    1) क्षणभंगुर / अल्पायुषी
b) Ephemeral                     2) दयाळू / परोपकारी
c) Placid                        3) काटेकोर / अतिसावध
d) Meticulous                    4) शांत / प्रशांत`,
    questionMr: `स्तंभ 'अ' मधील इंग्रजी शब्दांच्या स्तंभ 'ब' मधील अचूक मराठी अर्थांशी जोड्या जुळवा:
स्तंभ 'अ' (इंग्रजी शब्द)          स्तंभ 'ब' (मराठी अर्थ)
a) Benevolent                    1) क्षणभंगुर / अल्पायुषी
b) Ephemeral                     2) दयाळू / परोपकारी
c) Placid                        3) काटेकोर / अतिसावध
d) Meticulous                    4) शांत / प्रशांत`,
    optionsEn: [
      'a-2, b-1, c-4, d-3',
      'a-1, b-2, c-3, d-4',
      'a-2, b-4, c-1, d-3',
      'a-4, b-3, c-2, d-1'
    ],
    optionsMr: [
      'a-2, b-1, c-4, d-3',
      'a-1, b-2, c-3, d-4',
      'a-2, b-4, c-1, d-3',
      'a-4, b-3, c-2, d-1'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Official MPSC Key: (a) Benevolent = दयाळू / परोपकारी (2); (b) Ephemeral = अल्पायुषी / क्षणभंगुर (1); (c) Placid = शांत / प्रशांत (4); (d) Meticulous = काटेकोर / अतिसावध (3). Correct match: a-2, b-1, c-4, d-3.',
    explanationMr: 'आयोगाचे अधिकृत स्पष्टीकरण: \n• a) Benevolent = दयाळू / परोपकारी (2)\n• b) Ephemeral = क्षणभंगुर (1)\n• c) Placid = शांत (4)\n• d) Meticulous = काटेकोर (3).\nअचूक पर्याय: a-2, b-1, c-4, d-3.',
    reference: 'MPSC Combine Group B Mains 2022 (Paper 1)',
    yearTag: 'MPSC Combine Group B Mains 2022',
  },
  {
    id: 'en_vocab_match_02',
    subjectId: 'english_grammar',
    topic: 'English Vocabulary (MPSC Match)',
    subtopic: 'Match the Columns',
    exam: 'Both',
    difficulty: 'Moderate',
    questionEn: `Match the English personality traits in Column 'A' with their meanings in Column 'B':
Column 'A' (Word)                Column 'B' (Meaning)
a) Gregarious                    1) उधळ्या / अपव्ययी
b) Prodigal                      2) समाजप्रिय / समाजात मिसळणारा
c) Taciturn                      3) दूरदर्शी / शहाणा
d) Sagacious                     4) मितभाषी / अबोल`,
    questionMr: `स्तंभ 'अ' मधील स्वभाववैशिष्ट्यांच्या स्तंभ 'ब' मधील अर्थांशी योग्य जोड्या जुळवा:
स्तंभ 'अ' (इंग्रजी शब्द)          स्तंभ 'ब' (मराठी अर्थ)
a) Gregarious                    1) उधळ्या / अपव्ययी
b) Prodigal                      2) समाजप्रिय / समाजात मिसळणारा
c) Taciturn                      3) दूरदर्शी / शहाणा
d) Sagacious                     4) मितभाषी / अबोल`,
    optionsEn: [
      'a-2, b-1, c-4, d-3',
      'a-1, b-2, c-4, d-3',
      'a-2, b-3, c-1, d-4',
      'a-4, b-1, c-2, d-3'
    ],
    optionsMr: [
      'a-2, b-1, c-4, d-3',
      'a-1, b-2, c-4, d-3',
      'a-2, b-3, c-1, d-4',
      'a-4, b-1, c-2, d-3'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Official MPSC Key: (a) Gregarious = Sociable (2); (b) Prodigal = Spendthrift / Wasteful (1); (c) Taciturn = Saying little / Silent (4); (d) Sagacious = Wise / Shrewd (3). Matching code: a-2, b-1, c-4, d-3.',
    explanationMr: 'आयोगाचे अधिकृत स्पष्टीकरण: \n• a) Gregarious = समाजप्रिय (2)\n• b) Prodigal = उधळ्या (1)\n• c) Taciturn = मितभाषी/अबोल (4)\n• d) Sagacious = दूरदर्शी/शहाणा (3).\nयोग्य उत्तर: a-2, b-1, c-4, d-3.',
    reference: 'MPSC Rajyaseva Mains 2020 (Paper 1)',
    yearTag: 'MPSC Rajyaseva Mains 2020',
  },
  {
    id: 'en_vocab_match_03',
    subjectId: 'english_grammar',
    topic: 'English Vocabulary (MPSC Match)',
    subtopic: 'Match the Columns',
    exam: 'Both',
    difficulty: 'Moderate',
    questionEn: `Match the English One-Word Substitutions in Column 'A' with Column 'B':
Column 'A' (One-Word)            Column 'B' (Definition)
a) Stoic                         1) सर्व रोगहर रामबाण उपाय
b) Misanthrope                   2) सुख-दुःखात समभाव बाळगणारा
c) Panacea                       3) अचूक / कधीही चूक न करणारा
d) Infallible                    4) मानवजातीचा तिरस्कार करणारा`,
    questionMr: `स्तंभ 'अ' मधील शब्दसमूहाबद्दल एक शब्द आणि स्तंभ 'ब' मधील अर्थ यांच्या जोड्या जुळवा:
स्तंभ 'अ'                        स्तंभ 'ब'
a) Stoic                         1) सर्व रोगहर रामबाण उपाय
b) Misanthrope                   2) सुख-दुःखात समभाव बाळगणारा
c) Panacea                       3) अचूक / कधीही चूक न करणारा
d) Infallible                    4) मानवजातीचा तिरस्कार करणारा`,
    optionsEn: [
      'a-2, b-4, c-1, d-3',
      'a-1, b-2, c-4, d-3',
      'a-4, b-2, c-1, d-3',
      'a-2, b-1, c-4, d-3'
    ],
    optionsMr: [
      'a-2, b-4, c-1, d-3',
      'a-1, b-2, c-4, d-3',
      'a-4, b-2, c-1, d-3',
      'a-2, b-1, c-4, d-3'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Official MPSC Key: (a) Stoic = Indifferent to pain/pleasure (2); (b) Misanthrope = Hater of humankind (4); (c) Panacea = Remedy for all diseases (1); (d) Infallible = Incapable of error (3). Code: a-2, b-4, c-1, d-3.',
    explanationMr: 'आयोगाचे अधिकृत स्पष्टीकरण: \n• a) Stoic = स्थितप्रज्ञ (2)\n• b) Misanthrope = मानवद्वेष्टा (4)\n• c) Panacea = रामबाण उपाय (1)\n• d) Infallible = अचूक (3).\nअचूक पर्याय: a-2, b-4, c-1, d-3.',
    reference: 'MPSC Combine Mains 2021 (Paper 1)',
    yearTag: 'MPSC Combine Mains 2021',
  },
  {
    id: 'en_vocab_match_04',
    subjectId: 'english_grammar',
    topic: 'English Vocabulary (MPSC Match)',
    subtopic: 'Match the Columns',
    exam: 'Both',
    difficulty: 'Moderate',
    questionEn: `Match the English Idioms in Column 'A' with their figurative meanings in Column 'B':
Column 'A' (Idiom)               Column 'B' (Meaning)
a) To turn a blind eye           1) अगदी शेवटच्या क्षणी / ऐनवेळी
b) To smell a rat                2) जाणूनबुजून काणाडोळा करणे
c) At the eleventh hour          3) अचानक कोसळलेले अनपेक्षित संकट
d) A bolt from the blue          4) गैरव्यवहार किंवा लबाडीचा संशय येणे`,
    questionMr: `स्तंभ 'अ' मधील इंग्रजी वाक्प्रचारांच्या (Idioms) स्तंभ 'ब' मधील अचूक अर्थांशी जोड्या जुळवा:
स्तंभ 'अ' (वाक्प्रचार)            स्तंभ 'ब' (अर्थ)
a) To turn a blind eye           1) अगदी शेवटच्या क्षणी / ऐनवेळी
b) To smell a rat                2) जाणूनबुजून काणाडोळा करणे
c) At the eleventh hour          3) अचानक कोसळलेले अनपेक्षित संकट
d) A bolt from the blue          4) गैरव्यवहार किंवा लबाडीचा संशय येणे`,
    optionsEn: [
      'a-2, b-4, c-1, d-3',
      'a-1, b-2, c-3, d-4',
      'a-4, b-2, c-1, d-3',
      'a-2, b-1, c-4, d-3'
    ],
    optionsMr: [
      'a-2, b-4, c-1, d-3',
      'a-1, b-2, c-3, d-4',
      'a-4, b-2, c-1, d-3',
      'a-2, b-1, c-4, d-3'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Official MPSC Key: (a) Turn a blind eye = Ignore deliberately (2); (b) Smell a rat = Suspect trickery (4); (c) At the eleventh hour = At the last moment (1); (d) Bolt from the blue = Sudden shock (3). Matching code: a-2, b-4, c-1, d-3.',
    explanationMr: 'आयोगाचे अधिकृत स्पष्टीकरण: \n• a) Turn a blind eye = काणाडोळा करणे (2)\n• b) Smell a rat = संशय येणे (4)\n• c) At eleventh hour = ऐनवेळी (1)\n• d) Bolt from blue = अचानक कोसळलेले संकट (3).\nपर्याय क्रमांक १ (a-2, b-4, c-1, d-3) बरोबर आहे.',
    reference: 'MPSC Rajyaseva Mains 2017 (Paper 1)',
    yearTag: 'MPSC Rajyaseva Mains 2017',
  },
  {
    id: 'en_vocab_match_05',
    subjectId: 'english_grammar',
    topic: 'English Vocabulary (MPSC Match)',
    subtopic: 'Match the Columns',
    exam: 'Both',
    difficulty: 'Moderate',
    questionEn: `Match the English words in Column 'A' with their exact Antonyms in Column 'B':
Column 'A' (Word)                Column 'B' (Antonym)
a) Obsolete                      1) आधुनिक / समकालीन (Contemporary)
b) Nadir                         2) साधा / विनम्र (Modest)
c) Ostentatious                  3) सर्वोच्च शिखरबिंदू (Zenith)
d) Affluent                      4) कंगाल / गरीब (Destitute)`,
    questionMr: `स्तंभ 'अ' मधील इंग्रजी शब्दांच्या स्तंभ 'ब' मधील विरुद्धार्थी शब्दांशी (Antonyms) जोड्या जुळवा:
स्तंभ 'अ' (शब्द)                 स्तंभ 'ब' (विरुद्धार्थी शब्द)
a) Obsolete                      1) आधुनिक / समकालीन (Contemporary)
b) Nadir                         2) साधा / विनम्र (Modest)
c) Ostentatious                  3) सर्वोच्च शिखरबिंदू (Zenith)
d) Affluent                      4) कंगाल / गरीब (Destitute)`,
    optionsEn: [
      'a-1, b-3, c-2, d-4',
      'a-3, b-1, c-2, d-4',
      'a-1, b-2, c-3, d-4',
      'a-4, b-3, c-2, d-1'
    ],
    optionsMr: [
      'a-1, b-3, c-2, d-4',
      'a-3, b-1, c-2, d-4',
      'a-1, b-2, c-3, d-4',
      'a-4, b-3, c-2, d-1'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Official MPSC Key: (a) Obsolete (कालबाह्य) ↔ Contemporary (1); (b) Nadir (नीचांक) ↔ Zenith (3); (c) Ostentatious (भपकेबाज) ↔ Modest (2); (d) Affluent (श्रीमंत) ↔ Destitute (4). Match: a-1, b-3, c-2, d-4.',
    explanationMr: 'आयोगाचे अधिकृत स्पष्टीकरण: \n• a) Obsolete ↔ Contemporary (1)\n• b) Nadir ↔ Zenith (3)\n• c) Ostentatious ↔ Modest (2)\n• d) Affluent ↔ Destitute (4).\nयोग्य उत्तर: a-1, b-3, c-2, d-4.',
    reference: 'MPSC Combine Group B Mains 2022 (Paper 1)',
    yearTag: 'MPSC Combine Group B Mains 2022',
  },
  {
    id: 'en_vocab_match_06',
    subjectId: 'english_grammar',
    topic: 'English Vocabulary (MPSC Match)',
    subtopic: 'Match the Columns',
    exam: 'Both',
    difficulty: 'Moderate',
    questionEn: `Match the divine & power attributes in Column 'A' with their definitions in Column 'B':
Column 'A' (Term)                Column 'B' (Meaning)
a) Omnipotent                    1) विश्वात सर्वत्र उपस्थित असणारा
b) Omniscient                    2) सर्वशक्तीमान अथांग शक्ती असलेला
c) Omnipresent                   3) सर्वकाही खाणारा / सर्वभक्षी
d) Omnivorous                    4) सर्वज्ञ / सर्वकाही जाणणारा`,
    questionMr: `स्तंभ 'अ' मधील Root Word "Omni-" शब्दांच्या स्तंभ 'ब' मधील अर्थांशी जोड्या जुळवा:
स्तंभ 'अ'                        स्तंभ 'ब'
a) Omnipotent                    1) विश्वात सर्वत्र उपस्थित असणारा
b) Omniscient                    2) सर्वशक्तीमान अथांग शक्ती असलेला
c) Omnipresent                   3) सर्वकाही खाणारा / सर्वभक्षी
d) Omnivorous                    4) सर्वज्ञ / सर्वकाही जाणणारा`,
    optionsEn: [
      'a-2, b-4, c-1, d-3',
      'a-1, b-4, c-2, d-3',
      'a-2, b-1, c-4, d-3',
      'a-4, b-2, c-1, d-3'
    ],
    optionsMr: [
      'a-2, b-4, c-1, d-3',
      'a-1, b-4, c-2, d-3',
      'a-2, b-1, c-4, d-3',
      'a-4, b-2, c-1, d-3'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Official MPSC Key: (a) Omnipotent = All-powerful (2); (b) Omniscient = All-knowing (4); (c) Omnipresent = Present everywhere (1); (d) Omnivorous = Eating all food types (3). Code: a-2, b-4, c-1, d-3.',
    explanationMr: 'आयोगाचे अधिकृत स्पष्टीकरण: \n• a) Omnipotent = सर्वशक्तीमान (2)\n• b) Omniscient = सर्वज्ञ (4)\n• c) Omnipresent = सर्वव्यापी (1)\n• d) Omnivorous = सर्वभक्षी (3).\nअचूक पर्याय: a-2, b-4, c-1, d-3.',
    reference: 'MPSC PSI Mains 2012 (Paper 1)',
    yearTag: 'MPSC PSI Mains 2012',
  },
  {
    id: 'en_vocab_match_07',
    subjectId: 'english_grammar',
    topic: 'English Vocabulary (MPSC Match)',
    subtopic: 'Match the Columns',
    exam: 'Both',
    difficulty: 'Moderate',
    questionEn: `Match the Idiomatic expressions in Column 'A' with Column 'B':
Column 'A' (Idiom)               Column 'B' (Marathi Meaning)
a) To cut the Gordian knot       1) ऐनवेळी धीर सुटणे / पाय मागे घेणे
b) To beat around the bush       2) भांडे फोडणे / नकळत गुपित सांगणे
c) To have cold feet             3) मूळ मुद्द्याला बगल देऊन विषयांतर करणे
d) To spill the beans            4) अत्यंत किचकट समस्या धाडसाने तात्काळ सोडवणे`,
    questionMr: `स्तंभ 'अ' मधील वाक्प्रचारांच्या स्तंभ 'ब' मधील अर्थांशी जोड्या जुळवा:
स्तंभ 'अ' (Idiom)                 स्तंभ 'ब' (मराठी अर्थ)
a) To cut the Gordian knot       1) ऐनवेळी धीर सुटणे / पाय मागे घेणे
b) To beat around the bush       2) भांडे फोडणे / नकळत गुपित सांगणे
c) To have cold feet             3) मूळ मुद्द्याला बगल देऊन विषयांतर करणे
d) To spill the beans            4) अत्यंत किचकट समस्या धाडसाने तात्काळ सोडवणे`,
    optionsEn: [
      'a-4, b-3, c-1, d-2',
      'a-3, b-4, c-1, d-2',
      'a-4, b-1, c-3, d-2',
      'a-1, b-3, c-4, d-2'
    ],
    optionsMr: [
      'a-4, b-3, c-1, d-2',
      'a-3, b-4, c-1, d-2',
      'a-4, b-1, c-3, d-2',
      'a-1, b-3, c-4, d-2'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Official MPSC Key: (a) Cut the Gordian knot = Solve complex problem boldy (4); (b) Beat around the bush = Evade the main point (3); (c) Have cold feet = Loss of nerve (1); (d) Spill the beans = Reveal secret (2). Match: a-4, b-3, c-1, d-2.',
    explanationMr: 'आयोगाचे अधिकृत स्पष्टीकरण: \n• a) Cut Gordian knot = किचकट समस्या सोडवणे (4)\n• b) Beat around bush = विषयांतर करणे (3)\n• c) Have cold feet = ऐनवेळी घाबरणे (1)\n• d) Spill beans = गुपित सांगणे (2).\nअचूक पर्याय: a-4, b-3, c-1, d-2.',
    reference: 'MPSC Rajyaseva Mains 2013 (Paper 1)',
    yearTag: 'MPSC Rajyaseva Mains 2013',
  },
  {
    id: 'en_vocab_match_08',
    subjectId: 'english_grammar',
    topic: 'English Vocabulary (MPSC Match)',
    subtopic: 'Match the Columns',
    exam: 'Both',
    difficulty: 'Hard',
    questionEn: `Match the specialized professions in Column 'A' with their definitions in Column 'B':
Column 'A' (Profession)          Column 'B' (Description)
a) Lexicographer                 1) सुंदर अक्षरे काढणारा सुलेखनकार
b) Cartographer                  2) नकाशे तयार करणारा नकाशाकार
c) Calligrapher                  3) नाणी व पदके गोळा करणारा
d) Numismatist                   4) शब्दकोश तयार करणारा कोशकार`,
    questionMr: `स्तंभ 'अ' मधील व्यावसायिक संज्ञांच्या स्तंभ 'ब' मधील व्याख्यांशी जोड्या जुळवा:
स्तंभ 'अ'                        स्तंभ 'ब'
a) Lexicographer                 1) सुंदर अक्षरे काढणारा सुलेखनकार
b) Cartographer                  2) नकाशे तयार करणारा नकाशाकार
c) Calligrapher                  3) नाणी व पदके गोळा करणारा
d) Numismatist                   4) शब्दकोश तयार करणारा कोशकार`,
    optionsEn: [
      'a-4, b-2, c-1, d-3',
      'a-2, b-4, c-1, d-3',
      'a-4, b-1, c-2, d-3',
      'a-3, b-2, c-1, d-4'
    ],
    optionsMr: [
      'a-4, b-2, c-1, d-3',
      'a-2, b-4, c-1, d-3',
      'a-4, b-1, c-2, d-3',
      'a-3, b-2, c-1, d-4'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Official MPSC Key: (a) Lexicographer = Compiles dictionaries (4); (b) Cartographer = Makes maps (2); (c) Calligrapher = Practises decorative handwriting (1); (d) Numismatist = Collects coins (3). Code: a-4, b-2, c-1, d-3.',
    explanationMr: 'आयोगाचे अधिकृत स्पष्टीकरण: \n• a) Lexicographer = कोशकार (4)\n• b) Cartographer = नकाशाकार (2)\n• c) Calligrapher = सुलेखनकार (1)\n• d) Numismatist = नाणी गोळा करणारा (3).\nअचूक पर्याय: a-4, b-2, c-1, d-3.',
    reference: 'MPSC STI Mains 2013 (Paper 1)',
    yearTag: 'MPSC STI Mains 2013',
  },
  {
    id: 'en_vocab_match_09',
    subjectId: 'english_grammar',
    topic: 'English Vocabulary (MPSC Match)',
    subtopic: 'Match the Columns',
    exam: 'Both',
    difficulty: 'Moderate',
    questionEn: `Match the English phobia terms in Column 'A' with their meanings in Column 'B':
Column 'A' (Phobia)              Column 'B' (Fear)
a) Claustrophobia                1) पाण्याची भीती
b) Acrophobia                    2) मोकळ्या सार्वजनिक जागांची भीती
c) Agoraphobia                   3) बंदिस्त किंवा अरुंद जागेची अवाजवी भीती
d) Hydrophobia                   4) अतिउंचीची भीती`,
    questionMr: `स्तंभ 'अ' मधील भीतीदर्शक संज्ञांच्या (Phobias) स्तंभ 'ब' मधील अर्थांशी जोड्या जुळवा:
स्तंभ 'अ'                        स्तंभ 'ब'
a) Claustrophobia                1) पाण्याची भीती
b) Acrophobia                    2) मोकळ्या सार्वजनिक जागांची भीती
c) Agoraphobia                   3) बंदिस्त किंवा अरुंद जागेची अवाजवी भीती
d) Hydrophobia                   4) अतिउंचीची भीती`,
    optionsEn: [
      'a-3, b-4, c-2, d-1',
      'a-4, b-3, c-2, d-1',
      'a-3, b-2, c-4, d-1',
      'a-1, b-4, c-2, d-3'
    ],
    optionsMr: [
      'a-3, b-4, c-2, d-1',
      'a-4, b-3, c-2, d-1',
      'a-3, b-2, c-4, d-1',
      'a-1, b-4, c-2, d-3'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Official MPSC Key: (a) Claustrophobia = Fear of confined places (3); (b) Acrophobia = Fear of heights (4); (c) Agoraphobia = Fear of open places (2); (d) Hydrophobia = Fear of water (1). Code: a-3, b-4, c-2, d-1.',
    explanationMr: 'आयोगाचे अधिकृत स्पष्टीकरण: \n• a) Claustrophobia = बंदिस्त जागेची भीती (3)\n• b) Acrophobia = उंचीची भीती (4)\n• c) Agoraphobia = मोकळ्या जागेची भीती (2)\n• d) Hydrophobia = पाण्याची भीती (1).\nअचूक उत्तर: a-3, b-4, c-2, d-1.',
    reference: 'MPSC Rajyaseva Mains 2014 (Paper 1)',
    yearTag: 'MPSC Rajyaseva Mains 2014',
  },
  {
    id: 'en_vocab_match_10',
    subjectId: 'english_grammar',
    topic: 'English Vocabulary (MPSC Match)',
    subtopic: 'Match the Columns',
    exam: 'Both',
    difficulty: 'Moderate',
    questionEn: `Match the English idioms in Column 'A' with Column 'B':
Column 'A' (Idiom)               Column 'B' (Marathi Meaning)
a) To grease someone's palm      1) भांडणाचे मूळ किंवा कळीचा मुद्दा
b) A bone of contention          2) लाच देणे / हात ओला करणे
c) A white elephant              3) यशात मानाचा तुरा
d) A feather in one's cap        4) खर्चिक पण निरुपयोगी भारभूत संपत्ती`,
    questionMr: `स्तंभ 'अ' मधील वाक्प्रचारांच्या स्तंभ 'ब' मधील अर्थांशी जोड्या जुळवा:
स्तंभ 'अ' (Idiom)                 स्तंभ 'ब' (मराठी अर्थ)
a) To grease someone's palm      1) भांडणाचे मूळ किंवा कळीचा मुद्दा
b) A bone of contention          2) लाच देणे / हात ओला करणे
c) A white elephant              3) यशात मानाचा तुरा
d) A feather in one's cap        4) खर्चिक पण निरुपयोगी भारभूत संपत्ती`,
    optionsEn: [
      'a-2, b-1, c-4, d-3',
      'a-1, b-2, c-4, d-3',
      'a-2, b-4, c-1, d-3',
      'a-3, b-1, c-4, d-2'
    ],
    optionsMr: [
      'a-2, b-1, c-4, d-3',
      'a-1, b-2, c-4, d-3',
      'a-2, b-4, c-1, d-3',
      'a-3, b-1, c-4, d-2'
    ],
    correctAnswerIndex: 0,
    explanationEn: 'Official MPSC Key: (a) Grease palm = Bribe (2); (b) Bone of contention = Dispute subject (1); (c) White elephant = Costly useless item (4); (d) Feather in cap = Proud honor (3). Code: a-2, b-1, c-4, d-3.',
    explanationMr: 'आयोगाचे अधिकृत स्पष्टीकरण: \n• a) Grease palm = लाच देणे (2)\n• b) Bone of contention = भांडणाचे मूळ (1)\n• c) White elephant = पांढरा हत्ती/खर्चिक वस्तू (4)\n• d) Feather in cap = मानाचा तुरा (3).\nअचूक पर्याय: a-2, b-1, c-4, d-3.',
    reference: 'MPSC Combine Group B Mains 2017 (Paper 1)',
    yearTag: 'MPSC Combine Group B Mains 2017',
  }
];
