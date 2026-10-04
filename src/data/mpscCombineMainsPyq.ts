import { Question } from '../types';

// MPSC Group B (Non-Gazetted) Combined Mains Examination Official PYQs (Paper 1 & Paper 2)
export const MPSC_COMBINE_MAINS_PYQ: Question[] = [
  // --- मराठी व्याकरण व भाषा (Paper 1) ---
  {
    id: 'pyq_mains_mr_01',
    subjectId: 'marathi_grammar',
    topic: 'विशेषणांचे प्रकार',
    subtopic: 'संख्याविशेषणे',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: "जोड्या जुळवा:\na. गणनावाचक विशेषणे\nb. क्रमवाचक विशेषणे\nc. पृथकत्ववाचक विशेषणे\nd. आवृत्तीवाचक विशेषणे\n\ni. प्रथम, विसावा, दुसरा\nii. हरएक, दरएक, एकेक\niii. हजार, कोटी, अर्धा\niv. एकेरी, त्रिगुणी, चौपट\n\nपर्यायी उत्तरे:\n(1) a - iv, b - iii, c - ii, d - i\n(2) a - iii, b - i, c - ii, d - iv\n(3) a - ii, b - iv, c - iii, d - i\n(4) a - iii, b - iv, c - i, d - ii",
    questionEn: "Match the types of numeral adjectives with examples:\na. Cardinal Adjectives\nb. Ordinal Adjectives\nc. Distributive Adjectives\nd. Multiplicative Adjectives\n\ni. First, twentieth, second\nii. Each, every\niii. Thousand, crore, half\niv. Single, threefold, fourfold",
    optionsMr: [
      'a - iv, b - iii, c - ii, d - i',
      'a - iii, b - i, c - ii, d - iv',
      'a - ii, b - iv, c - iii, d - i',
      'a - iii, b - iv, c - i, d - ii'
    ],
    optionsEn: [
      'a - iv, b - iii, c - ii, d - i',
      'a - iii, b - i, c - ii, d - iv',
      'a - ii, b - iv, c - iii, d - i',
      'a - iii, b - iv, c - i, d - ii'
    ],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "संख्याविशेषणांचे उपप्रकार:\n• गणनावाचक: संख्या मोजण्यासाठी (हजार, कोटी, अर्धा - iii)\n• क्रमवाचक: क्रम दर्शवण्यासाठी (प्रथम, विसावा, दुसरा - i)\n• पृथकत्ववाचक: वेगवेगळेपणा दाखवण्यासाठी (हरएक, दरएक, एकेक - ii)\n• आवृत्तीवाचक: पट दाखवण्यासाठी (एकेरी, त्रिगुणी, चौपट - iv)\nम्हणून अचूक पर्याय (2) आहे.",
    explanationEn: "Cardinal counts quantities (thousand, crore); Ordinal indicates order (first, second); Distributive indicates individual units (each, every); Multiplicative shows repetition (single, fourfold).",
    reference: 'MPSC Combine Mains 2022/23 (Paper 1, Q.1) / मो. रा. वाळंबे - सुगम मराठी व्याकरण'
  },
  {
    id: 'pyq_mains_mr_02',
    subjectId: 'marathi_grammar',
    topic: 'क्रियापदांचे प्रकार',
    subtopic: 'द्विकर्मक क्रियापद',
    exam: 'Combine',
    difficulty: 'Easy',
    questionMr: "खालील वाक्यातील क्रियापदाचा प्रकार ओळखा:\n'मुलांनी चावऱ्या कुत्र्याला खडे मारले.'\n(1) उभयविध क्रियापद\n(2) द्विकर्मक क्रियापद\n(3) शक्य क्रियापद\n(4) प्रयोजक क्रियापद",
    questionEn: "Identify the type of verb in the sentence:\n'The children threw stones at the biting dog.'\n(1) Ambitransitive Verb\n(2) Ditransitive Verb (द्विकर्मक)\n(3) Potential Verb\n(4) Causal Verb",
    optionsMr: ['उभयविध क्रियापद', 'द्विकर्मक क्रियापद', 'शक्य क्रियापद', 'प्रयोजक क्रियापद'],
    optionsEn: ['Ambitransitive Verb', 'Ditransitive Verb', 'Potential Verb', 'Causal Verb'],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "या वाक्यात दोन कर्मे आहेत:\n१. 'खडे' - प्रत्यक्ष कर्म (Direct Object - वस्तुवाचक, प्रथमांत)\n२. 'कुत्र्याला' - अप्रत्यक्ष कर्म (Indirect Object - व्यक्ती/प्राणीवाचक, चतुर्थी विभक्ती).\nज्या वाक्यात क्रियापदाला अर्थ पूर्ण होण्यासाठी दोन कर्मांची गरज असते, त्यास 'द्विकर्मक क्रियापद' म्हणतात.",
    explanationEn: "The verb has two objects: 'कुत्र्याला' (indirect object) and 'खडे' (direct object). Hence it is a ditransitive verb (द्विकर्मक).",
    reference: 'MPSC Combine Mains (Paper 1, Q.2) / मो. रा. वाळंबे'
  },
  {
    id: 'pyq_mains_mr_03',
    subjectId: 'marathi_grammar',
    topic: 'क्रियापदांचे प्रकार',
    subtopic: 'गौण क्रियापद',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: "जी सहाय्यक क्रियापदे सर्व काळी, सर्व पुरुषी चालत नाहीत त्यांना कोणत्या प्रकारची क्रियापदे म्हणतात?\n(1) मुख्य क्रियापदे\n(2) गौण क्रियापदे\n(3) उभयविध क्रियापदे\n(4) संयुक्त क्रियापदे",
    questionEn: "Auxiliary verbs that do not conjugate across all tenses and persons are called what type of verbs?\n(1) Main Verbs\n(2) Defective / Secondary Verbs (गौण क्रियापदे)\n(3) Ambitransitive Verbs\n(4) Compound Verbs",
    optionsMr: ['मुख्य क्रियापदे', 'गौण क्रियापदे', 'उभयविध क्रियापदे', 'संयुक्त क्रियापदे'],
    optionsEn: ['Main Verbs', 'Secondary / Defective Verbs', 'Ambitransitive Verbs', 'Compound Verbs'],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "ज्या धातूंची रूपे सर्व काळांत व सर्व पुरुषांत चालत नाहीत, त्यांना 'गौण क्रियापदे' किंवा 'अपूर्ण धातू' (Defective Verbs) असे म्हणतात. उदा. आहे, नाही, पाहिजे, नको, नवे, नलगे.",
    explanationEn: "Verbs that lack a complete set of conjugations across all tenses and grammatical persons are called defective or secondary verbs (गौण क्रियापदे).",
    reference: 'MPSC Combine Mains (Paper 1, Q.3) / मो. रा. वाळंबे'
  },
  {
    id: 'pyq_mains_mr_06',
    subjectId: 'marathi_grammar',
    topic: 'वाक्प्रचार',
    subtopic: 'गळ्याला तात लावणे',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: "'गळ्याला तात लावणे' या वाक्प्रचाराचा अर्थ ओळखा.\n(1) गुप्त ठेवणे\n(2) प्राणांतिक संकटात घालणे\n(3) आत्महत्या करायला लावणे\n(4) समूळ नायनाट करणे",
    questionEn: "Identify the meaning of the Marathi idiom 'गळ्याला तात लावणे':\n(1) To keep secret\n(2) To put in mortal danger / crisis\n(3) To drive to suicide\n(4) Complete destruction",
    optionsMr: ['गुप्त ठेवणे', 'प्राणांतिक संकटात घालणे', 'आत्महत्या करायला लावणे', 'समूळ नायनाट करणे'],
    optionsEn: ['To keep secret', 'To put in mortal danger', 'To drive to suicide', 'Complete destruction'],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "'गळ्याला तात लावणे' म्हणजे एखाद्या व्यक्तीला अत्यंत बिकट, जीवे मारणाऱ्या किंवा प्राणांतिक संकटात लोटणे किंवा अतोनात कोंडीत पकडणे.",
    explanationEn: "The Marathi idiom 'गळ्याला तात लावणे' means to put someone into severe peril or life-threatening crisis.",
    reference: 'MPSC Combine Mains (Paper 1, Q.6) / मराठी शब्दकोश व वाक्प्रचार संग्रह'
  },
  {
    id: 'pyq_mains_mr_08',
    subjectId: 'marathi_grammar',
    topic: 'म्हणी व अर्थ',
    subtopic: 'बारभाईंची शेती',
    exam: 'Combine',
    difficulty: 'Easy',
    questionMr: "'अनेक जणांवर सोपवलेले काम कोणीच नीट पार पाडत नाहीत.' या अर्थाची म्हण ओळखा.\n(1) बिगारीचे घोडे तरवटाचा फोक\n(2) बारभाईंची शेती काय लागेल हाती\n(3) भ्रमाची पुडी नि हिंगाचा वास\n(4) भरवशाची मोट पाण्यात लोट",
    questionEn: "Identify the proverb meaning 'Work entrusted to too many people is done well by none':\n(1) Bigariche ghode tarvatacha phok\n(2) Barbhainchi sheti kay lagel haati\n(3) Bhramachi pudi ni hingacha vaas\n(4) Bharavashachi mot panyat lot",
    optionsMr: [
      'बिगारीचे घोडे तरवटाचा फोक',
      'बारभाईंची शेती काय लागेल हाती',
      'भ्रमाची पुडी नि हिंगाचा वास',
      'भरवशाची मोट पाण्यात लोट'
    ],
    optionsEn: [
      'Bigariche ghode tarvatacha phok',
      'Barbhainchi sheti kay lagel haati',
      'Bhramachi pudi ni hingacha vaas',
      'Bharavashachi mot panyat lot'
    ],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "'बारभाईंची शेती काय लागेल हाती' - अनेक लोकांनी मिळून केलेल्या कामात कोणीच जबाबदारी घेत नाही आणि त्यामुळे ते काम पूर्णपणे वाया जाते.",
    explanationEn: "The proverb 'बारभाईंची शेती काय लागेल हाती' (Too many cooks spoil the broth) signifies that collective ownership without individual responsibility leads to ruin.",
    reference: 'MPSC Combine Mains (Paper 1, Q.8) / मो. रा. वाळंबे'
  },
  {
    id: 'pyq_mains_mr_26',
    subjectId: 'marathi_grammar',
    topic: 'शब्दसमूहाबद्दल एक शब्द',
    subtopic: 'काथवट',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: "'भाकरी करण्याची लाकडी परात' या शब्दसमूहासाठी खालीलपैकी योग्य शब्द ओळखा.\n(1) काटवट\n(2) काथवट\n(3) कातवट\n(4) धंगाळ",
    questionEn: "Choose the correct one-word substitute for 'Wooden platter used for kneading dough and making bhakri':\n(1) Katwat\n(2) Kathwat\n(3) Kaatvat\n(4) Dhangal",
    optionsMr: ['काटवट', 'काथवट', 'कातवट', 'धंगाळ'],
    optionsEn: ['Katwat', 'Kathwat', 'Kaatvat', 'Dhangal'],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "भाकरी थापण्यासाठी किंवा पीठ मळण्यासाठी वापरण्यात येणाऱ्या पारंपरिक लाकडी परातीला 'काथवट' असे म्हणतात.",
    explanationEn: "'Kathwat' (काथवट) is the traditional Marathi term for a broad wooden vessel used for kneading dough and making bhakris.",
    reference: 'MPSC Combine Mains (Paper 1, Q.27) / मो. रा. वाळंबे'
  },
  {
    id: 'pyq_mains_mr_27',
    subjectId: 'marathi_grammar',
    topic: 'शब्दसमूहाबद्दल एक शब्द',
    subtopic: 'सांडणीस्वार',
    exam: 'Combine',
    difficulty: 'Easy',
    questionMr: "उंटावरून टपाल वाटणाऱ्याला काय म्हणतात?\n(1) पोस्टमन\n(2) बकरंदाज\n(3) सांडणीस्वार\n(4) शिक्केनसवी",
    questionEn: "What is a mail carrier riding on a camel called in Marathi?\n(1) Postman\n(2) Bakrandaj\n(3) Sandaniswar\n(4) Shikkenasvi",
    optionsMr: ['पोस्टमन', 'बकरंदाज', 'सांडणीस्वार', 'शिक्केनसवी'],
    optionsEn: ['Postman', 'Bakrandaj', 'Sandaniswar', 'Shikkenasvi'],
    correctAnswerIndex: 2, // Official Key: 3
    explanationMr: "वाळवंटी किंवा दुर्गम भागात उंटावरून सरकारी टपाल व संदेश पोहोचवणाऱ्या दूताला 'सांडणीस्वार' म्हटले जाते.",
    explanationEn: "A courier or mail messenger who travels on a camel (सांडणी) is called a 'Sandaniswar' (सांडणीस्वार).",
    reference: 'MPSC Combine Mains (Paper 1, Q.28) / मराठी शब्दसंग्रह'
  },

  // --- इंग्रजी व्याकरण (Paper 1) ---
  {
    id: 'pyq_mains_en_51',
    subjectId: 'english_grammar',
    topic: 'Clause Analysis',
    subtopic: 'Adjective Clause with But',
    exam: 'Combine',
    difficulty: 'Hard',
    questionMr: "वाक्यातील अधोरेखित क्लॉजचा प्रकार ओळखा:\n'There was no woman present but wept at the news.'\n(1) Noun clause\n(2) Adjective clause\n(3) Adverbial clause\n(4) Co-ordinate clause",
    questionEn: "Identify the type of underlined clause in the sentence:\n'There was no woman present but wept at the news.'\n(1) Noun clause\n(2) Adjective clause\n(3) Adverbial clause\n(4) Co-ordinate clause",
    optionsMr: ['Noun clause', 'Adjective clause', 'Adverbial clause', 'Co-ordinate clause'],
    optionsEn: ['Noun clause', 'Adjective clause', 'Adverbial clause', 'Co-ordinate clause'],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "येथे 'but wept' म्हणजे 'who did not weep'. जेव्हा 'but' हा शब्द 'who...not' किंवा 'which...not' या अर्थाने वापरला जातो, तेव्हा तो Negative Relative Pronoun चे कार्य करतो आणि 'woman' या नामाचे वर्णन करत असल्याने तो 'Adjective Clause' असतो.",
    explanationEn: "In this construction, 'but' functions as a negative relative pronoun meaning 'who did not'. It qualifies the noun 'woman', hence forming an Adjective Clause.",
    reference: 'MPSC Combine Mains (Paper 1, Q.51) / Wren & Martin High School English Grammar'
  },
  {
    id: 'pyq_mains_en_54',
    subjectId: 'english_grammar',
    topic: 'Question Tags',
    subtopic: "Tag for 'I am'",
    exam: 'Combine',
    difficulty: 'Easy',
    questionMr: "'I am a grammarian.' या वाक्यासाठी योग्य Question Tag निवडा:\n(1) Am I ?\n(2) Aren't I ?\n(3) Amn't I ?\n(4) Am I not ?",
    questionEn: "The correct tag question corresponding to the sentence 'I am a grammarian' is:\n(1) Am I ?\n(2) Aren't I ?\n(3) Amn't I ?\n(4) Am I not ?",
    optionsMr: ['Am I ?', "Aren't I ?", "Amn't I ?", 'Am I not ?'],
    optionsEn: ['Am I ?', "Aren't I ?", "Amn't I ?", 'Am I not ?'],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "इंग्रजी व्याकरणाच्या नियमानुसार, होकारार्थी 'I am' साठी संक्षेपरूपात नेहमी 'aren't I ?' हा प्रश्नार्थक टॅग वापरला जातो. मानक इंग्रजीत 'amn't I' हे रूप अस्तित्वात नाही.",
    explanationEn: "In standard English grammar, the negative contraction tag for affirmative 'I am' is always 'aren't I?'.",
    reference: 'MPSC Combine Mains (Paper 1, Q.54) / Wren & Martin'
  },
  {
    id: 'pyq_mains_en_56',
    subjectId: 'english_grammar',
    topic: 'Idioms & Phrases',
    subtopic: 'Cat and Dog Life',
    exam: 'Combine',
    difficulty: 'Easy',
    questionMr: "'The husband and the wife next door have cat and dog existence.' वाक्यातील वाक्प्रचाराचा अर्थ:\n(1) animal existence\n(2) uncultured life\n(3) perpetual quarrelling\n(4) negligible existence",
    questionEn: "The idiom 'cat and dog existence' in 'The husband and the wife next door have cat and dog existence' means:\n(1) animal existence\n(2) uncultured life\n(3) perpetual quarrelling\n(4) negligible existence",
    optionsMr: ['animal existence', 'uncultured life', 'perpetual quarrelling', 'negligible existence'],
    optionsEn: ['animal existence', 'uncultured life', 'perpetual quarrelling', 'negligible existence'],
    correctAnswerIndex: 2, // Official Key: 3
    explanationMr: "'Cat and dog existence/life' म्हणजे सतत भांडणे, वादविवाद आणि कलह असलेले जीवन (a life full of constant quarrels and bickering).",
    explanationEn: "To lead a 'cat and dog existence' means living in a state of perpetual quarrelling and discord.",
    reference: 'MPSC Combine Mains (Paper 1, Q.56) / Oxford Idioms Dictionary'
  },
  {
    id: 'pyq_mains_en_65',
    subjectId: 'english_grammar',
    topic: 'One Word Substitution',
    subtopic: 'Stoic',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: "'Stoic is a person' - योग्य पर्याय निवडा:\n(1) indifferent to pain or pleasure\n(2) who loves mankind\n(3) of sanguine disposition\n(4) reluctant to mix in society",
    questionEn: "'Stoic is a person' - Choose the correct phrase for the word underlined:\n(1) indifferent to pain or pleasure\n(2) who loves mankind\n(3) of sanguine disposition\n(4) reluctant to mix in society",
    optionsMr: [
      'indifferent to pain or pleasure',
      'who loves mankind',
      'of sanguine disposition',
      'reluctant to mix in society'
    ],
    optionsEn: [
      'indifferent to pain or pleasure',
      'who loves mankind',
      'of sanguine disposition',
      'reluctant to mix in society'
    ],
    correctAnswerIndex: 0, // Official Key: 1
    explanationMr: "Stoic (स्थितप्रज्ञ) म्हणजे अशी व्यक्ती जी सुख किंवा दुःख, आनंद किंवा वेदना या दोन्हीमध्ये समतोल राहते आणि भावनांना संयमित ठेवते (indifferent to pleasure or pain).",
    explanationEn: "A stoic is a person who can endure pain or hardship without showing their feelings or complaining (indifferent to pain or pleasure).",
    reference: 'MPSC Combine Mains (Paper 1, Q.65) / Norman Lewis - Word Power Made Easy'
  },
  {
    id: 'pyq_mains_en_74',
    subjectId: 'english_grammar',
    topic: 'Idioms',
    subtopic: 'Out of question',
    exam: 'Combine',
    difficulty: 'Easy',
    questionMr: "'Out of question' या वाक्प्रचाराचा योग्य अर्थ निवडा:\n(1) Outside\n(2) Impossible\n(3) Easy\n(4) Mannerless",
    questionEn: "Choose the correct word for idiomic phrase - 'Out of question':\n(1) Outside\n(2) Impossible\n(3) Easy\n(4) Mannerless",
    optionsMr: ['Outside', 'Impossible', 'Easy', 'Mannerless'],
    optionsEn: ['Outside', 'Impossible', 'Easy', 'Mannerless'],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "'Out of the question' किंवा 'Out of question' म्हणजे सर्वस्वी अशक्य (completely impossible / unacceptable).",
    explanationEn: "'Out of question' denotes something that is entirely impossible or not to be considered.",
    reference: 'MPSC Combine Mains (Paper 1, Q.74) / Cambridge Idioms'
  },

  // --- सामान्य अध्ययन, चालू घडामोडी व कायदे (Paper 2) ---
  {
    id: 'pyq_mains_gs_81',
    subjectId: 'current_affairs',
    topic: 'Defense Exercises',
    subtopic: 'IMT TRILAT Exercise 2022',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: "भारत, मोझांबिक, टांझानिया त्रिपक्षीय सराव (IMT TRILAT) संयुक्त सागरी सरावाची पहिली आवृत्ती 2022 मध्ये कोठे आयोजित करण्यात आली होती?\n(1) नवी दिल्ली\n(2) दार एस सलाम\n(3) मापुटो\n(4) यापैकी नाही",
    questionEn: "The first edition of India-Mozambique-Tanzania Trilateral Exercise (IMT TRILAT) a joint maritime exercise was held at ______ in 2022.\n(1) New Delhi\n(2) Dar Es Salaam\n(3) Maputo\n(4) None of these",
    optionsMr: ['नवी दिल्ली', 'दार एस सलाम', 'मापुटो', 'यापैकी नाही'],
    optionsEn: ['New Delhi', 'Dar Es Salaam', 'Maputo', 'None of these'],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "भारत, मोझांबिक आणि टांझानिया या तिन्ही देशांच्या नौदलांचा पहिला संयुक्त सागरी सराव (IMT TRILAT) ऑक्टोबर २०२२ मध्ये टांझानियातील 'दार एस सलाम' (Dar Es Salaam) बंदरावर पार पडला. यात भारतीय नौदलाच्या आयएनएस तरकश या युद्धनौकेने भाग घेतला.",
    explanationEn: "The maiden IMT TRILAT maritime exercise was conducted in October 2022 at Dar Es Salaam, Tanzania, with INS Tarkash representing the Indian Navy.",
    reference: 'MPSC Combine Mains (Paper 2, Q.81) / भारतीय संरक्षण घडामोडी'
  },
  {
    id: 'pyq_mains_gs_82',
    subjectId: 'current_affairs',
    topic: 'Sports Trophies',
    subtopic: 'Duleep Trophy',
    exam: 'Combine',
    difficulty: 'Easy',
    questionMr: "दुलीप ट्रॉफी (Duleep Trophy) कोणत्या खेळाशी संबंधित आहे?\n(1) हॉकी\n(2) क्रिकेट\n(3) टेनिस\n(4) बॅडमिंटन",
    questionEn: "Duleep trophy is associated with which sports ?\n(1) Hockey\n(2) Cricket\n(3) Tennis\n(4) Badminton",
    optionsMr: ['हॉकी', 'क्रिकेट', 'टेनिस', 'बॅडमिंटन'],
    optionsEn: ['Hockey', 'Cricket', 'Tennis', 'Badminton'],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "दुलीप करंडक (Duleep Trophy) ही भारतातील प्रथम श्रेणी क्रिकेट स्पर्धा असून तिची सुरुवात १९६१-६२ मध्ये नवानगरचे महान क्रिकेटपटू कुमार श्री दुलीपसिंहजी यांच्या सन्मानार्थ बीसीसीआयने केली.",
    explanationEn: "The Duleep Trophy is a prestigious domestic first-class cricket championship in India played between zonal teams.",
    reference: 'MPSC Combine Mains (Paper 2, Q.82) / क्रीडा सामान्य ज्ञान'
  },
  {
    id: 'pyq_mains_gs_91',
    subjectId: 'polity',
    topic: 'Maharashtra Right to Public Services Act 2015',
    subtopic: 'Use of Information Technology',
    exam: 'Combine',
    difficulty: 'Hard',
    questionMr: "महाराष्ट्र लोकसेवा हक्क अधिनियम, २०१५ नुसार खालील विधानांचे अवलोकन करा:\nविधान I : या कायद्याचे कलम 3, सार्वजनिक सेवांच्या वितरणासाठी 'माहिती तंत्रज्ञानाच्या' वापराशी संबंधित आहे.\nविधान II : कलम 3(a) सार्वजनिक सेवांच्या वितरणासाठी 'माहिती तंत्रज्ञानाचे' प्रकार प्रदान करते.\nपर्यायी उत्तरे:\n(1) विधान I बरोबर; II चूक\n(2) विधान I चूक; II बरोबर\n(3) दोन्ही विधाने बरोबर\n(4) दोन्ही विधाने चूक",
    questionEn: "Consider the following statements in view of Maharashtra Right to Public Services Act, 2015:\nStatement I: Section 3 of this Act deals with use of 'Information Technology' for delivery of Public Services.\nStatement II: Section 3(a) provides the types of 'Information Technology' for delivery of Public Services.\nAnswer options:\n(1) Statement I correct; II incorrect\n(2) Statement I incorrect; II correct\n(3) Both statements are correct\n(4) Both statements are incorrect",
    optionsMr: ['विधान I बरोबर; II चूक', 'विधान I चूक; II बरोबर', 'दोन्ही विधाने बरोबर', 'दोन्ही विधाने चूक'],
    optionsEn: ['Statement I correct; II incorrect', 'Statement I incorrect; II correct', 'Both statements are correct', 'Both statements are incorrect'],
    correctAnswerIndex: 3, // Official Key: 4
    explanationMr: "आयोगाच्या अधिकृत उत्तरतालिकेनुसार दोन्ही विधाने चूक (4) आहेत. कारण महाराष्ट्र लोकसेवा हक्क अधिनियमात माहिती तंत्रज्ञानाचा वापर कलम ८ (किंवा संबंधित नियमांत) येतो; कलम ३ हे केवळ 'लोकसेवा मिळण्याचा नागरिकांचा हक्क' याशी संबंधित आहे.",
    explanationEn: "As per the official MPSC answer key, both statements are incorrect (option 4). Section 3 pertains to the right to public services, not IT deployment specifics.",
    reference: 'MPSC Combine Mains (Paper 2, Q.91) / महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५'
  },
  {
    id: 'pyq_mains_gs_96',
    subjectId: 'general_science',
    topic: 'Information & Communication Technology',
    subtopic: 'C-DAC Establishment in 1988',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: "ICT च्या सीमावर्ती भागात (frontier areas) R&D ची कार्ये हाती घेण्यासाठी 1988 मध्ये विभागाच्या प्रशासकीय कार्यक्षेत्रात वैज्ञानिक सोसायटी म्हणून ______ ची स्थापना करण्यात आली.\n(1) ई-गव्हर्नन्स\n(2) आय.टी.ई.एस.\n(3) आय.टी. फॉर मासेस\n(4) सी-डी.ए.सी. (C-DAC)",
    questionEn: "In order to take up R&D works in the frontier areas of ICT, ______ was established in 1988 as a scientific society under the administrative purview of the Department.\n(1) e-Governance\n(2) ITeS\n(3) IT for Masses\n(4) C-DAC",
    optionsMr: ['ई-गव्हर्नन्स', 'आय.टी.ई.एस.', 'आय.टी. फॉर मासेस', 'सी-डी.ए.सी.'],
    optionsEn: ['e-Governance', 'ITeS', 'IT for Masses', 'C-DAC'],
    correctAnswerIndex: 3, // Official Key: 4
    explanationMr: "१९८८ मध्ये भारताला अमेरिकेने सुपरकॉम्प्युटर (क्राय एक्सएमपी) देण्यास नकार दिल्यानंतर डॉ. विजय भटकर यांच्या नेतृत्वाखाली पुण्यात 'सी-डॅक' (Centre for Development of Advanced Computing - C-DAC) ची स्थापना करण्यात आली, ज्यांनी भारताचा पहिला स्वदेशी महासंगणक 'परम ८०००' (PARAM 8000) विकसित केला.",
    explanationEn: "C-DAC (Centre for Development of Advanced Computing) was set up in 1988 as a premier scientific R&D institution in Pune, creating India's indigenous supercomputer PARAM 8000.",
    reference: 'MPSC Combine Mains (Paper 2, Q.96) / माहिती तंत्रज्ञान व संगणक विज्ञान'
  },
  {
    id: 'pyq_mains_gs_100',
    subjectId: 'general_science',
    topic: 'Networking & Internet Protocols',
    subtopic: 'Remote Login Protocol - Telnet',
    exam: 'Combine',
    difficulty: 'Easy',
    questionMr: "संगणकावर दूरस्थपणे लॉगिन करण्यासाठी कोणता प्रोटोकॉल वापरला जातो?\n(1) टेलनेट (Telnet)\n(2) एच.टी.टी.पी. (HTTP)\n(3) डी.एन.एस. (DNS)\n(4) एस.एम.टी.पी. (SMTP)",
    questionEn: "Which protocol is used to remotely login onto a computer ?\n(1) Telnet\n(2) HTTP\n(3) DNS\n(4) SMTP",
    optionsMr: ['टेलनेट (Telnet)', 'एच.टी.टी.पी. (HTTP)', 'डी.एन.एस. (DNS)', 'एस.एम.टी.पी. (SMTP)'],
    optionsEn: ['Telnet', 'HTTP', 'DNS', 'SMTP'],
    correctAnswerIndex: 0, // Official Key: 1
    explanationMr: "टेलनेट (Telnet - Teletype Network) हा नेटवर्क प्रोटोकॉल इंटरनेट किंवा स्थानिक नेटवर्कवरील दूरस्थ संगणकावर रिमोट लॉगिन (Remote Login) करण्यासाठी आणि कमांड लाइन इंटरफेसवर कार्य करण्यासाठी वापरला जातो. (HTTP: वेब पेजेससाठी, DNS: डोमेन नावाचे IP मध्ये रूपांतर, SMTP: ईमेल पाठवण्यासाठी).",
    explanationEn: "Telnet is an application layer protocol used on the Internet or local area networks to provide a bidirectional interactive text-oriented communication facility for remote computer login.",
    reference: 'MPSC Combine Mains (Paper 2, Q.100) / संगणक व माहिती तंत्रज्ञान'
  }
];
