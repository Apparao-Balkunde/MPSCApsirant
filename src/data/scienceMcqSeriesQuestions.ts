import { Question } from '../types';

export interface VideoSeriesMetadata {
  id: string;
  title: string;
  titleEn: string;
  teacher: string;
  teacherEn: string;
  academy: string;
  academyEn: string;
  youtubeUrl: string;
  youtubeEmbedUrl: string;
  duration: string;
  totalQuestions: number;
  tags: string[];
}

export const SCIENCE_MCQ_SERIES_METADATA: VideoSeriesMetadata = {
  id: 'dnyanadeep_science_ep14',
  title: '🚀 SCIENCE Through MCQ | EP-14 | MPSC & UPSC Science MCQs',
  titleEn: '🚀 SCIENCE Through MCQ | EP-14 | MPSC & UPSC Science MCQs Series',
  teacher: 'डॉ. वैभव शिंदे सर (Dr. Vaibhav Shinde Sir)',
  teacherEn: 'Dr. Vaibhav Shinde Sir',
  academy: 'ज्ञानदीप ॲकॅडमी पुणे (Dnyanadeep Academy Pune)',
  academyEn: 'Dnyanadeep Academy Pune',
  youtubeUrl: 'https://www.youtube.com/watch?v=5Oi5d2OEy_o',
  youtubeEmbedUrl: 'https://www.youtube.com/embed/5Oi5d2OEy_o',
  duration: 'Live Series Special',
  totalQuestions: 12,
  tags: ['सामान्य विज्ञान', 'भौतिकशास्त्र', 'रसायनशास्त्र', 'जीवशास्त्र', 'आरोग्यशास्त्र', 'MPSC Combine', 'Rajyaseva 2026']
};

export const SCIENCE_MCQ_SERIES_QUESTIONS: Question[] = [
  {
    id: 'sci_ep14_q01',
    subjectId: 'general_science',
    topic: 'रसायनशास्त्र (Chemistry)',
    subtopic: 'अणू संरचना: समस्थानिके, समभार व समन्यूट्रॉनिक (Isotones)',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: 'अणू संरचनेतील मूलभूत घटकांवर आधारित खालील विधानांचा सखोल विचार करा:\n(अ) ज्या अणूंमध्ये न्यूट्रॉन्सची संख्या समान असते, परंतु प्रोटॉन्सची संख्या भिन्न असते, त्यांना "समन्यूट्रॉनिक" (Isotones) म्हणतात.\n(ब) सिलिकॉन (¹⁴Si३०), फॉस्फरस (¹⁵P३१) आणि सल्फर (¹⁶S३२) हे एकमेकांचे समन्यूट्रॉनिक (Isotones) आहेत.\n(क) समभार (Isobars) मूलद्रव्यांमध्ये प्रोटॉन्स आणि न्यूट्रॉन्सची बेरीज (अणुवस्तुमानांक - A) समान असते, परंतु त्यांचे रासायनिक गुणधर्म पूर्णपणे भिन्न असतात.\nवरीलपैकी कोणती विधाने सत्य आहेत?',
    questionEn: 'Consider the following statements regarding atomic structure and nuclear species:\n(a) Atoms that possess an identical number of neutrons but differing numbers of protons are termed "Isotones".\n(b) Silicon (¹⁴Si³⁰), Phosphorus (¹⁵P³¹), and Sulfur (¹⁶S³²) are classic examples of Isotones.\n(c) Isobars possess an identical mass number (A) but different atomic numbers (Z), and therefore exhibit completely different chemical properties.\nWhich of the above statements are correct?',
    optionsMr: [
      'फक्त (अ) आणि (ब)',
      'फक्त (ब) आणि (क)',
      'फक्त (अ) आणि (क)',
      'सर्व विधाने सत्य आहेत (अ, ब आणि क)'
    ],
    optionsEn: [
      'Only (a) and (b)',
      'Only (b) and (c)',
      'Only (a) and (c)',
      'All statements are correct (a, b and c)'
    ],
    correctAnswerIndex: 3,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर स्पष्टीकरण:\n\n१. **समन्यूट्रॉनिक (Isotones) ची संकल्पना:** ज्या अणूंमध्ये न्यूट्रॉन्सची संख्या (N = A - Z) तंतोतंत समान असते, परंतु अणुअंक (Z, प्रोटॉन संख्या) व वस्तुमानांक (A) वेगळे असतात, त्यांना आयसोटोन्स म्हणतात. सिलिकॉन (¹⁴Si३०) मध्ये न्यूट्रॉन्स = ३० - १४ = १६; फॉस्फरस (¹⁵P३१) मध्ये न्यूट्रॉन्स = ३१ - १५ = १६; आणि सल्फर (¹⁶S३२) मध्ये न्यूट्रॉन्स = ३२ - १६ = १६ आहेत. त्यामुळे तिन्ही अणूंमध्ये प्रत्येकी १६ न्यूट्रॉन्स असल्याने ते एकमेकांचे आयसोटोन्स आहेत. विधान (अ) व (ब) दोन्ही बरोबर आहेत.\n\n२. **समभार (Isobars) ची संकल्पना:** ज्यांचे वस्तुमानांक (A) समान असतात (उदा. ४०Ar१८, ४०K१९, ४०Ca२०), त्यांना आयसोबार म्हणतात. यामध्ये बाह्यतम कक्षेतील इलेक्ट्रॉन संरचना आणि प्रोटॉन संख्या भिन्न असल्याने त्यांचे रासायनिक गुणधर्म मूलतः वेगळे असतात. त्यामुळे विधान (क) देखील सत्य आहे.\n\n३. **परीक्षेसाठी क्लृप्ती (Mnemonic):**\n• Isoto**P**es = **P**rotons समान.\n• Isoto**N**es = **N**eutrons समान.\n• Iso**B**ars = Mass num**B**er (A) समान.\n\n४. **आयोगाचा संदर्भ:** NCERT इयत्ता ११ वी रसायनशास्त्र - अणूचे स्वरूप व स्टेट बोर्ड इयत्ता ९ वी विज्ञान.',
    explanationEn: 'Comprehensive 150-word analysis based on Dr. Vaibhav Shinde Sir\'s lecture:\n\n1. **Core Concept of Isotones:** Isotones are defined as distinct nuclear species having the exact same neutron count (N = A - Z), while possessing different proton numbers (Z) and total mass numbers (A). Calculating the neutron numbers for the trio:\n• For Silicon (¹⁴Si³⁰): N = 30 - 14 = 16 neutrons.\n• For Phosphorus (¹⁵P³¹): N = 31 - 15 = 16 neutrons.\n• For Sulfur (¹⁶S³²): N = 32 - 16 = 16 neutrons.\nSince all three nuclides contain precisely 16 neutrons, statements (a) and (b) are indisputably true.\n\n2. **Analysis of Isobars:** Isobars share identical mass numbers (A) despite having different atomic numbers (e.g., ⁴⁰Ar, ⁴⁰K, ⁴⁰Ca). Because chemical reactivity is dictated strictly by valence electron configurations and atomic number (Z), isobars belong to distinct elements and exhibit vastly divergent chemical characteristics. Statement (c) is completely sound.\n\n3. **Quick Memory Technique:**\n• Isoto**P**es -> Same **P**roton number.\n• Isoto**N**es -> Same **N**eutron number.\n• Iso**B**ars -> Same Atomic Mass (num**B**er A).\n\n4. **Official Reference:** NCERT Class 11 Chemistry (Structure of Atom) and Maharashtra State Board Std 11 Physics.',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 11 Chemistry - Structure of Atom',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'sci_ep14_q02',
    subjectId: 'general_science',
    topic: 'रसायनशास्त्र (Chemistry)',
    subtopic: 'रेडॉक्स अभिक्रिया व ऑक्सिडीभवन अंक (Oxidation Number)',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: 'पोटॅशियम डायक्रोमेट (K₂Cr₂O₇) आणि पोटॅशियम परमँगनेट (KMnO₄) या दोन महत्त्वाच्या ऑक्सिडीकारकांमध्ये (Oxidizing agents) अनुक्रमे क्रोमियम (Cr) आणि मँगनीज (Mn) यांचा ऑक्सिडीभवन अंक (Oxidation State) किती असतो?',
    questionEn: 'In the potent oxidizing agents Potassium Dichromate (K₂Cr₂O₇) and Potassium Permanganate (KMnO₄), what are the respective oxidation states of Chromium (Cr) and Manganese (Mn)?',
    optionsMr: [
      '+३ आणि +४',
      '+६ आणि +७',
      '+६ आणि +५',
      '+४ आणि +७'
    ],
    optionsEn: [
      '+3 and +4',
      '+6 and +7',
      '+6 and +5',
      '+4 and +7'
    ],
    correctAnswerIndex: 1,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर स्पष्टीकरण:\n\n१. **K₂Cr₂O₇ मधील Cr चा ऑक्सिडीभवन अंक काढणे:**\nपोटॅशियम (K) हा अल्क धातू असल्याने त्याचा ऑक्सिडीभवन अंक = +१ असतो. ऑक्सिजनचा सामान्यतः = -२ असतो. क्रोमियमचा अंक \'x\' मानल्यास:\n२(K) + २(Cr) + ७(O) = ०\n२(+१) + २(x) + ७(-२) = ०\n+२ + २x - १४ = ०\n२x - १२ = ० => २x = +१२ => x = +६.\nम्हणून K₂Cr₂O₇ मध्ये क्रोमियमचा ऑक्सिडीभवन अंक +६ आहे.\n\n२. **KMnO₄ मधील Mn चा ऑक्सिडीभवन अंक काढणे:**\nयेथे मँगनीजचा अंक \'y\' मानल्यास:\n१(K) + १(Mn) + ४(O) = ०\n१(+१) + y + ४(-२) = ०\n+१ + y - ८ = ० => y - ७ = ० => y = +७.\nम्हणून KMnO₄ मध्ये मँगनीजचा ऑक्सिडीभवन अंक +७ आहे.\n\n३. **महत्त्वाचा परीक्षोपयोगी मुद्दा:** Cr (+६) आणि Mn (+७) हे त्यांच्या कमाल ऑक्सिडीभवन अवस्थेत असल्याने ते इलेक्ट्रॉन गमावू शकत नाहीत; ते केवळ इलेक्ट्रॉन स्वीकारू शकतात, म्हणूनच ते उत्तम ऑक्सिडीकारक (Strong Oxidizing Agents) म्हणून कार्य करतात.\n\n४. **आयोगाचा संदर्भ:** NCERT Class 11 Chemistry - Redox Reactions / स्टेट बोर्ड इयत्ता ११ वी.',
    explanationEn: 'Detailed 150-word derivation following Dr. Vaibhav Shinde Sir\'s classroom methodology:\n\n1. **Chromium in Potassium Dichromate (K₂Cr₂O₇):**\nAlkali metal Potassium carries an oxidation state of +1, while Oxygen standardly exhibits -2 in oxides. Let the oxidation number of Chromium be \'x\':\n2(+1) + 2(x) + 7(-2) = 0\n+2 + 2x - 14 = 0\n2x - 12 = 0  ==>  2x = +12  ==>  x = +6.\nThus, Chromium exists in its maximum hexavalent (+6) oxidation state.\n\n2. **Manganese in Potassium Permanganate (KMnO₄):**\nLet the oxidation state of Manganese be \'y\':\n1(+1) + 1(y) + 4(-2) = 0\n+1 + y - 8 = 0  ==>  y - 7 = 0  ==>  y = +7.\nThus, Manganese achieves its maximum heptavalent (+7) oxidation state.\n\n3. **MPSC Core Takeaway:** Because both transition metals reside at their highest permissible valence states, they cannot undergo further oxidation (cannot surrender further electrons). Instead, they readily undergo reduction by accepting electrons, rendering K₂Cr₂O₇ and KMnO₄ classic, powerful oxidizing agents across analytical chemistry.\n\n4. **Official Reference:** NCERT Chemistry Class 11 - Unit 8 (Redox Reactions).',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 11 Chemistry - Redox Reactions',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'sci_ep14_q03',
    subjectId: 'general_science',
    topic: 'जीवशास्त्र (Biology)',
    subtopic: 'मानवी रक्ताभिसरण संस्था: हृदयाची रचना व कपाटे (Heart Valves)',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: 'मानवी हृदयातील रक्तप्रवाहाचे नियंत्रण करणाऱ्या कपाटांबाबत (Valves) खालीलपैकी कोणते विधान सत्य नाही?',
    questionEn: 'Regarding the valves regulating unidirectional blood flow in the human heart, which of the following statements is NOT correct?',
    optionsMr: [
      'उजवे अलिंद (Right Atrium) आणि उजवे निलय (Right Ventricle) यांच्या दरम्यान त्रिदल कपाट (Tricuspid Valve) असते.',
      'डावे अलिंद (Left Atrium) आणि डावे निलय (Left Ventricle) यांच्या दरम्यान द्विदलीय कपाट किंवा मिट्रल कपाट (Bicuspid / Mitral Valve) असते.',
      'महाधमनी (Aorta) आणि फुफ्फुस धमनी (Pulmonary Artery) च्या मुखाशी अर्धचंद्राकृती कपाटे (Semilunar Valves) असतात.',
      'द्विदलीय कपाटामधून अशुद्ध (डी-ऑक्सिजनेटेड) रक्त डाव्या निलयात जाते.'
    ],
    optionsEn: [
      'The Tricuspid Valve is situated between the Right Atrium and Right Ventricle.',
      'The Bicuspid (Mitral) Valve guards the opening between the Left Atrium and Left Ventricle.',
      'Semilunar Valves are located at the origins of the Aorta and the Pulmonary Artery.',
      'Deoxygenated blood flows through the bicuspid valve into the left ventricle.'
    ],
    correctAnswerIndex: 3,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर स्पष्टीकरण:\n\n१. **हृदयाची कपाटे आणि त्यांचे स्थान:** मानवी हृदयात चार प्रमुख कपाटे असतात, जी रक्ताचा प्रवाह एकाच दिशेने राखतात आणि रक्ताला मागे फिरण्यापासून (Backflow) रोखतात:\n• **त्रिदल कपाट (Tricuspid Valve):** उजवे अलिंद आणि उजवे निलय यांच्यामध्ये असते, ज्यातून शरीरातून आलेले अशुद्ध (Deoxygenated) रक्त वाहते. (विधान १ बरोबर).\n• **द्विदल कपाट (Bicuspid किंवा Mitral Valve):** डावे अलिंद आणि डावे निलय यांच्यामध्ये असते. फुफ्फुसातून ऑक्सिजनयुक्त (शुद्ध) रक्त डाव्या अलिंदातून डाव्या निलयात जाते. त्यामुळे पर्याय ४ चे विधान चुकीचे (अयोग्य) आहे, कारण या कपाटातून शुद्ध रक्त वाहते, अशुद्ध नाही!\n• **अर्धचंद्राकृती कपाटे (Semilunar Valves):** डाव्या निलयातून महाधमनीत (Aortic valve) आणि उजव्या निलयातून फुफ्फुस धमनीत (Pulmonary valve) रक्त जाण्याच्या मुखाशी असतात. (विधान ३ बरोबर).\n\n२. **हृदयाचे ठोके व ध्वनी (Heart Sounds):** त्रिदल व द्विदल कपाटे बंद होताना पहिला मोठा आवाज "LUBB" येतो, तर अर्धचंद्राकृती कपाटे बंद होताना दुसरा तीक्ष्ण आवाज "DUPP" येतो.\n\n३. **आयोगाचा संदर्भ:** NCERT इयत्ता ११ वी जीवशास्त्र - Body Fluids and Circulation.',
    explanationEn: 'Detailed 150-word anatomical breakdown based on Dr. Vaibhav Shinde Sir\'s lecture:\n\n1. **Core Cardiac Physiology:** The human heart operates as a double-pump system equipped with four fibrous valves preventing the regurgitation of blood:\n• **Tricuspid Valve:** Features three muscular cusps separating the right atrium from the right ventricle, regulating the passage of deoxygenated systemic venous blood.\n• **Bicuspid (Mitral) Valve:** Features two strong cusps situated between the left atrium and left ventricle. Crucially, the left heart chambers handle exclusively **oxygenated blood** received from the lungs via pulmonary veins. Hence, statement (4) is factually incorrect because oxygenated—not deoxygenated—blood courses through the bicuspid valve.\n• **Semilunar Valves:** Guard the exits from ventricles into the pulmonary artery (pulmonary semilunar) and ascending aorta (aortic semilunar).\n\n2. **Acoustic Correlation:** Closure of atrioventricular (tricuspid/mitral) valves produces the first low-frequency heart sound ("LUBB"), whereas closure of semilunar valves generates the second sharper sound ("DUPP").\n\n3. **Official Reference:** NCERT Biology Class 11 - Chapter 18 (Body Fluids and Circulation).',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 11 Biology - Body Fluids and Circulation',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'sci_ep14_q04',
    subjectId: 'general_science',
    topic: 'जीवशास्त्र (Biology)',
    subtopic: 'मानवी चेतासंस्था: मेंदूचे कार्य (Human Brain & Central Nervous System)',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: 'मानवी शरीरातील अनैच्छिक क्रियांचे (Involuntary Actions) जसे की हृदयाचे ठोके, रक्तदाब, श्वासोच्छ्वास, लाळ गळणे, गिळणे आणि शिंकणे यांचे नियंत्रण मेंदूच्या कोणत्या भागाद्वारे केले जाते?',
    questionEn: 'Which specific region of the human brain controls vital involuntary visceral functions such as heartbeat, blood pressure, respiration, salivation, swallowing, and vomiting?',
    optionsMr: [
      'प्रमस्तिष्क किंवा सेरेब्रम (Cerebrum)',
      'अनुमस्तिष्क किंवा सेरेबेलम (Cerebellum)',
      'लंबमज्जा किंवा मेड्युला ऑब्लॉन्गाटा (Medulla Oblongata)',
      'हायपोथॅलॅमस (Hypothalamus)'
    ],
    optionsEn: [
      'Cerebrum',
      'Cerebellum',
      'Medulla Oblongata',
      'Hypothalamus'
    ],
    correctAnswerIndex: 2,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर स्पष्टीकरण:\n\n१. **लंबमज्जा (Medulla Oblongata) चे शरीरशास्त्रीय महत्त्व:** मानवी मेंदूच्या पश्चभागातील (Hindbrain) सर्वात महत्त्वाचा व संवेदनशील भाग म्हणजे लंबमज्जा होय. ही पुढे कवटीच्या महाछिद्रातून (Foramen Magnum) मेरुरज्जूला (Spinal Cord) जोडलेली असते. लंबमज्जेमध्ये मानवी अस्तित्त्वासाठी आवश्यक असणारी अत्यंत संवेदनशील जीवनरक्षक केंद्रे (Vital Life-Supporting Centers) स्थित असतात. यामध्ये हृदयगती नियामक केंद्र (Cardiac Center), रक्तवाहिन्यांचे आकुंचन-प्रसरण करून रक्तदाब नियंत्रित करणारे व्हॅसोमोटर केंद्र (Vasomotor Center), आणि फुफ्फुसांच्या लयबद्ध श्वासोच्छ्वासावर नियंत्रण ठेवणारे श्वसन केंद्र (Respiratory Rhythm Center) कार्यरत असते.\n\n२. **अनैच्छिक प्रतिक्षिप्त क्रिया (Reflex Actions):** अन्न गिळणे, लाळ स्रवणे, खोकणे, शिंकणे, उचकी येणे आणि उलटी (Vomiting) होणे यांसारख्या सर्व स्वयंचलित प्रतिक्षिप्त क्रियांचे नियमन केवळ लंबमज्जेद्वारे केले जाते. लंबमज्जेला झालेला गंभीर आघात तत्काळ हृदय व फुफ्फुस क्रिया थांबवून मृत्यू ओढवतो.\n\n३. **इतर पर्यायांचे तौलनिक कार्य:**\n• **प्रमस्तिष्क (Cerebrum):** मेंदूचा ८०% मोठा भाग; विचार, बुद्धिमत्ता, स्मृती, कल्पनाशक्ती व ऐच्छिक हालचालींचे केंद्र.\n• **अनुमस्तिष्क (Cerebellum):** स्नायूंचा समन्वय व शरीराचा तोल (Balance) सांभाळणे (अल्कोहोलमुळे प्रभावित होतो).\n• **हायपोथॅलॅमस (Hypothalamus):** शरीराचे तापमान (Thermostat), तहान, भूक व भावनांचे नियंत्रण.\n\n४. **आयोगाचा संदर्भ:** NCERT Class 11 Biology - Neural Control and Coordination / डॉ. सचिन भस्के सामान्य विज्ञान.',
    explanationEn: 'Comprehensive 150-word neuroanatomical analysis per Dr. Vaibhav Shinde Sir\'s teaching:\n\n1. **Function of the Medulla Oblongata:** The medulla oblongata constitutes the lowermost brainstem structure extending inferiorly into the spinal cord. It houses critical autonomic regulatory centers including the cardiac center (adjusting heart rate), the vasomotor center (regulating vascular diameter and systemic blood pressure), and the respiratory rhythm center. Additionally, it coordinates primitive protective reflexes including swallowing, vomiting, coughing, sneezing, and salivation. Severe trauma to the medulla is universally fatal due to instantaneous respiratory and cardiac arrest.\n\n2. **Comparative Functions of Other Brain Regions:**\n• **Cerebrum:** Forebrain neocortex governing sensory perception, analytical cognition, voluntary motor planning, speech, and long-term memory consolidation.\n• **Cerebellum:** Coordinates smooth muscular movements, fine-motor precision, equilibrium, and bodily posture (frequently impaired under acute ethanol intoxication).\n• **Hypothalamus:** The neuroendocrine master coordinating core body temperature (thermoregulation), hunger, thirst osmolarity, circadian rhythms, and pituitary tropic secretions.\n\n3. **Official Reference:** NCERT Class 11 Biology - Chapter 21 (Neural Control and Coordination).',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 11 Biology - Neural Control and Coordination',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'sci_ep14_q05',
    subjectId: 'general_science',
    topic: 'जीवशास्त्र (Biology)',
    subtopic: 'अंतःस्रावी ग्रंथी: स्वादुपिंड व हार्मोन्स (Pancreas & Blood Glucose Regulation)',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: 'स्वादुपिंडातील (Pancreas) लँगरहॅन्सच्या द्वीपसमूहाबाबत (Islets of Langerhans) खालील जोड्या विचारात घ्या:\n(१) अल्फा पेशी (Alpha cells) - ग्लुकागॉन (Glucagon) संप्रेरक (रक्तातील साखर वाढवणारे)\n(२) बीटा पेशी (Beta cells) - इन्सुलिन (Insulin) संप्रेरक (रक्तातील साखर कमी करणारे)\n(३) डेल्टा पेशी (Delta cells) - सोमाटोस्टॅटिन (Somatostatin) संप्रेरक\nवरीलपैकी कोणती/त्या जोड्या अचूक आहेत?',
    questionEn: 'Consider the following pairs regarding the endocrine Islets of Langerhans in the human pancreas:\n(1) Alpha cells - Glucagon hormone (elevates blood glucose)\n(2) Beta cells - Insulin hormone (lowers blood glucose)\n(3) Delta cells - Somatostatin hormone\nWhich of the pairs given above are correctly matched?',
    optionsMr: [
      'फक्त (१) आणि (२)',
      'फक्त (२) आणि (३)',
      'फक्त (१) आणि (३)',
      'सर्व जोड्या अचूक आहेत (१, २ आणि ३)'
    ],
    optionsEn: [
      'Only (1) and (2)',
      'Only (2) and (3)',
      'Only (1) and (3)',
      'All pairs are correctly matched (1, 2 and 3)'
    ],
    correctAnswerIndex: 3,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर स्पष्टीकरण:\n\n१. **स्वादुपिंडाचे दुहेरी स्वरूप (Composite/Heterocrine Gland):** स्वादुपिंड ही मानवी शरीरातील दुसऱ्या क्रमांकाची सर्वात मोठी ग्रंथी असून ती एकाच वेळी पाचक विकरे स्रवणारी बाह्यस्रावी ग्रंथी (Exocrine Acinar Tissue) आणि रक्तामध्ये थेट संप्रेरके सोडणारी अंतःस्रावी ग्रंथी (Endocrine Islets of Langerhans) म्हणून कार्य करते. स्वादुपिंडामध्ये सुमारे १० ते २० लाख लँगरहॅन्सचे सूक्ष्म द्वीपसमूह असतात, जे संपूर्ण स्वादुपिंडाच्या वजनाच्या केवळ १ ते २ टक्के भाग व्यापतात.\n\n२. **द्वीपसमूहातील पेशींचे प्रकार व त्यांची कार्ये:**\n• **अल्फा पेशी (Alpha / α-cells - २५%):** या पेशी "ग्लुकागॉन" (Glucagon) नावाचे हायपरग्लायसेमिक संप्रेरक तयार करतात. जेव्हा उपवासात किंवा श्रमानंतर रक्तातील साखर कमी होते, तेव्हा ग्लुकागॉन यकृतामधील साठवलेल्या ग्लायकोजेनचे रूपांतर ग्लुकोजमध्ये करतो (Glycogenolysis), ज्यामुळे रक्तातील साखरेचे प्रमाण वाढून समतोल राखला जातो.\n• **बीटा पेशी (Beta / β-cells - ७०%):** या ५१ अमिनो आम्लांपासून बनलेले "इन्सुलिन" (Insulin) संप्रेरक स्रवतात. जेवल्यानंतर वाढलेली जादा साखर पेशींमध्ये शोषून घेणे आणि यकृत व स्नायूंमध्ये तिचे रूपांतर ग्लायकोजेनमध्ये करणे (Glycogenesis) हे इन्सुलिनचे मुख्य काम आहे. इन्सुलिनच्या कमतरतेमुळे रक्तात साखर वाढून "डायबेटिस मेलिटस" (मधुमेह प्रकार-१ व २) जडतो.\n• **डेल्टा पेशी (Delta / δ-cells - ५%):** या "सोमाटोस्टॅटिन" (Somatostatin) संप्रेरक स्रवतात, जे स्थानिक पातळीवर इन्सुलिन आणि ग्लुकागॉन या दोन्ही संप्रेरकांच्या स्रवणावर योग्य नियंत्रण ठेवते. त्यामुळे तिन्ही जोड्या तंतोतंत अचूक आहेत.\n\n३. **आयोगाचा संदर्भ:** NCERT Class 11 Biology - Chapter 22 Chemical Coordination / स्टेट बोर्ड १२ वी.',
    explanationEn: 'Comprehensive 150-word endocrinological analysis per Dr. Vaibhav Shinde Sir\'s lecture:\n\n1. **Dual Nature of Pancreas:** The pancreas serves as a mixed (heterocrine) gland comprising an exocrine acinar portion synthesizing digestive enzymes and an endocrine component termed the Islets of Langerhans (representing roughly 1-2% of pancreatic mass).\n\n2. **Cellular Subtypes & Hormonal Antagonism:**\n• **Alpha (α) Cells:** Produce Glucagon, a hyperglycemic peptide hormone mobilized during fasting or hypoglycemia. Glucagon triggers hepatic glycogenolysis and gluconeogenesis, elevating systemic blood glucose.\n• **Beta (β) Cells:** Produce Insulin, a 51-amino-acid anabolic peptide that enhances peripheral glucose uptake, accelerates cellular glycolysis, and drives hepatic glycogenesis. Deficiency of insulin secretion or tissue receptor resistance manifests as Diabetes Mellitus.\n• **Delta (δ) Cells:** Synthesize Somatostatin, a paracrine regulatory peptide that locally inhibits the secretion of both insulin and glucagon, optimizing systemic glucose homeostasis.\nConsequently, all three listed associations are completely accurate.\n\n3. **Official Reference:** NCERT Biology Class 11 - Chapter 22 (Chemical Coordination and Integration).',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 11 Biology - Chemical Coordination and Integration',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'sci_ep14_q06',
    subjectId: 'general_science',
    topic: 'आरोग्यशास्त्र व सूक्ष्मजीवशास्त्र (Microbiology)',
    subtopic: 'मानवी संसर्गजन्य रोग: जिवाणू विरुद्ध विषाणू (Bacterial vs Viral Pathogens)',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: 'खालील रोगांचा विचार करून केवळ "जिवाणूजन्य" (Bacterial Diseases) असणाऱ्या रोगांचा योग्य गट ओळखा:',
    questionEn: 'Examine the following list of infectious diseases and identify the group consisting EXCLUSIVELY of Bacterial Diseases:',
    optionsMr: [
      'क्षयरोग (TB), टायफॉइड (विषमज्वर), कॉलरा (पटकी) आणि कुष्ठरोग',
      'पोलिओ, रेबीज, कावीळ (Hepatitis) आणि गोवर',
      'मलेरिया, अमिबियासिस, स्लीपिंग सिकनेस आणि कालाआझार',
      'डेंग्यू, चिकनगुनिया, स्वाइन फ्लू आणि घटसर्प'
    ],
    optionsEn: [
      'Tuberculosis (TB), Typhoid, Cholera, and Leprosy',
      'Polio, Rabies, Hepatitis, and Measles',
      'Malaria, Amoebiasis, Sleeping Sickness, and Kala-Azar',
      'Dengue, Chikungunya, Swine Flu, and Diphtheria'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर स्पष्टीकरण:\n\n१. **जिवाणूजन्य रोगांची सखोल तपासणी (Bacterial Pathogens):** पर्याय १ मधील सर्वच्या सर्व चारही रोग केवळ आणि केवळ विशिष्ट जिवाणूंमुळे (Bacteria) होतात:\n• **क्षयरोग (Tuberculosis - TB):** मायकोबॅक्टेरियम ट्युबरक्युलॉसिस (Mycobacterium tuberculosis) या दंडाणूमुळे फुफ्फुसांमध्ये संसर्ग होतो. रॉबर्ट कॉकने १८८२ मध्ये हा जिवाणू शोधला. यावर नवजात बाळाला बीसीजी (BCG) लस टोचली जाते.\n• **टायफॉइड (विषमज्वर / आंत्रज्वर):** साल्मोनेला टायफी (Salmonella typhi) या जिवाणूच्या दूषित अन्न व पाण्यातून संसर्गामुळे आतड्याला सूज येते व ताप चढतो. याचे अचूक निदान "विडाल चाचणी" (Widal Test) द्वारे होते.\n• **कॉलरा (पटकी):** व्हिब्रिओ कोलेरी (Vibrio cholerae) या स्वल्पविरामाच्या आकाराच्या (Comma-shaped) जिवाणूमुळे उलट्या व तीव्र जुलाब होऊन डिहायड्रेशन होते. यावर ओआरएस (ORS) संजीवनी दिली जाते.\n• **कुष्ठरोग (Leprosy / महारोग):** मायकोबॅक्टेरियम लेप्री (Mycobacterium leprae) मुळे त्वचा व परिघीय मज्जातंतू सुन्न होतात. डॉ. गेरहार्ड हॅन्सनने १८७३ मध्ये शोधल्याने यास "हॅन्सनचा रोग" म्हणतात.\n\n२. **इतर पर्यायांमधील रोगांचे वर्गीकरण:**\n• **पर्याय २ (केवळ विषाणूजन्य):** पोलिओ (एंटेरोव्हायरस), रेबीज (र्‍हॅब्डोव्हायरस - जलद्वेष), कावीळ (हेपॅटायटिस A/B विषाणू) आणि गोवर (मॉर्बिलीव्हायरस).\n• **पर्याय ३ (केवळ आदिजीवजन्य / Protozoan):** मलेरिया (प्लाझमोडियम - डासाची मादी), अमिबियासिस (एंटामिबा हिस्टोलिटिका), स्लीपिंग सिकनेस (ट्रिपॅनोसोमा - त्सेत्से माशी), आणि कालाआझार (लेशमानिया डोनोव्हानी - सँडफ्लाय).\n• **पर्याय ४ (मिश्र):** घटसर्प (Diphtheria) जिवाणूजन्य आहे, तर डेंग्यू (Flavivirus), चिकनगुनिया (Alphavirus) व स्वाइन फ्लू (H1N1) विषाणूजन्य आहेत.\n\n३. **आयोगाचा संदर्भ:** NCERT Class 12 Biology - Human Health and Disease / डॉ. सचिन भस्के.',
    explanationEn: 'Comprehensive 150-word epidemiological analysis following Dr. Vaibhav Shinde Sir\'s lecture:\n\n1. **Diagnostic Pathology of Bacterial Group (Option 1):**\n• **Tuberculosis:** Acid-fast bacillus *Mycobacterium tuberculosis* transmitted via aerosol droplets, targeted with the BCG vaccine.\n• **Typhoid Fever:** Enteric pathogen *Salmonella typhi* confirmed via the Widal agglutination serology.\n• **Cholera:** Comma-shaped gram-negative flagellated bacterium *Vibrio cholerae* causing severe dehydration via cholera enterotoxin.\n• **Leprosy (Hansen\'s disease):** Intracellular *Mycobacterium leprae* affecting peripheral nerves and dermis.\nBecause all four pathogens are bacterial, Option 1 is uniquely and completely correct.\n\n2. **Pathogen Classification of Other Options:**\n• **Option 2:** Exclusively **Viral** (Poliovirus, Rabies lyssavirus, Hepatitis viruses, and Morbillivirus).\n• **Option 3:** Exclusively **Protozoan parasites** (*Plasmodium vivax/falciparum*, *Entamoeba histolytica*, *Trypanosoma brucei*, and *Leishmania donovani*).\n• **Option 4:** Mixed etiology—Diphtheria is bacterial (*Corynebacterium diphtheriae*), but Dengue (Flavivirus), Chikungunya (Alphavirus), and Swine Flu (H1N1 Influenza) are viral.\n\n3. **Official Reference:** NCERT Class 12 Biology - Human Health and Disease.',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 12 Biology - Human Health and Disease',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'sci_ep14_q07',
    subjectId: 'general_science',
    topic: 'भौतिकशास्त्र (Physics)',
    subtopic: 'प्रकाश: पूर्ण आंतरिक परावर्तन (Total Internal Reflection - TIR)',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: 'प्रकाशाच्या "पूर्ण आंतरिक परावर्तनासाठी" (Total Internal Reflection) खालीलपैकी कोणत्या दोन आवश्यक अटींची पूर्तता होणे बंधनकारक असते?\n(अ) प्रकाशाचा किरण हा नेहमी घन माध्यमातून विरल माध्यमात (Denser to Rarer medium) प्रवास करणारा असावा.\n(ब) आपतन कोन (Angle of Incidence - i) हा संबंधित माध्यमांच्या क्रांतिक कोनापेक्षा (Critical Angle - c) मोठा असावा.\n(क) प्रकाशाचा किरण हा विरल माध्यमातून घन माध्यमात प्रवास करणारा असावा.\n(ड) माध्यमाचा अपवर्तनांक १ पेक्षा कमी असावा.\nयोग्य पर्याय निवडा:',
    questionEn: 'Which two mandatory physical conditions must be satisfied for Total Internal Reflection (TIR) of light to take place?\n(a) The light ray must propagate from an optically denser medium toward an optically rarer medium.\n(b) The angle of incidence in the denser medium must exceed the critical angle (i > c).\n(c) The light ray must travel from an optically rarer medium into a denser medium.\n(d) The refractive index of the medium must be less than 1.\nSelect the correct option:',
    optionsMr: [
      'फक्त (अ) आणि (ब)',
      'फक्त (ब) आणि (क)',
      'फक्त (क) आणि (ड)',
      'फक्त (अ) आणि (ड)'
    ],
    optionsEn: [
      'Only (a) and (b)',
      'Only (b) and (c)',
      'Only (c) and (d)',
      'Only (a) and (d)'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर स्पष्टीकरण:\n\n१. **पूर्ण आंतरिक परावर्तनाच्या (TIR) दोन अटी:**\n• **पहिली अट:** प्रकाशाचा किरण अधिक प्रकाशीय घनतेच्या (Optically denser) माध्यमातून कमी घनतेच्या (Rarer) माध्यमात गेला पाहिजे (उदा. काचेतून हवेत किंवा पाण्यातून हवेत). जेव्हा किरण विरल माध्यमातून घन माध्यमात जातो, तेव्हा तो स्तंभीकेकडे झुकतो; त्यामुळे TIR कधीही घडू शकत नाही.\n• **दुसरी अट:** घन माध्यमातील आपतन कोन (i) हा त्या माध्यमाच्या "क्रांतिक कोनापेक्षा" (Critical angle - c) मोठा असला पाहिजे (i > c). जेव्हा i = c असतो, तेव्हा अपवर्तन कोन ९०° होतो. आपतन कोन यापेक्षा किंचितही वाढल्यास प्रकाशकिरण दुसऱ्या माध्यमात न जाता त्याच घन माध्यमात १००% परावर्तित होतो.\n\n२. **दैनंदिन जीवनातील अनुप्रयोग:**\n• दूरसंचार क्षेत्रातील ऑप्टिकल फायबर (Optical Fibres) चे कार्य.\n• हिऱ्याचे लुकलुकणे (Brilliance of Diamond - हिऱ्याचा क्रांतिक कोन सर्वात कमी म्हणजे २४.४° असतो).\n• वाळवंटातील मृगजळ (Mirage) आणि अंतर्दर्शन यंत्र (Endoscope).\n\n३. **आयोगाचा संदर्भ:** NCERT Class 12 Physics - Ray Optics and Optical Instruments.',
    explanationEn: 'Detailed 150-word optical physics exposition per Dr. Vaibhav Shinde Sir:\n\n1. **Two Governing Laws of Total Internal Reflection (TIR):**\n• **Condition 1:** The incident ray must travel from an optically denser medium having refractive index n₁ into an optically rarer medium with refractive index n₂ (n₁ > n₂). When traveling into a denser medium, light refracts toward the normal, making internal reflection impossible.\n• **Condition 2:** The angle of incidence (i) at the boundary within the denser medium must be strictly greater than the critical angle (c), where sin(c) = n₂/n₁. At i = c, the refracted ray skims the interface at 90°. When i > c, 100% of electromagnetic energy is reflected back into the denser medium with zero transmission loss.\n\n2. **Technological & Natural Real-world Phenomena:**\n• **Fiber-optic Telecommunications:** Total light trapping along high-purity silica glass cores.\n• **Diamond Sparkle:** The exceptionally high refractive index of diamond (2.42) yields a tiny critical angle (24.4°), trapping internal light across multiple facets.\n• **Endoscopy & Mirages:** Total internal reflection enables minimally invasive medical visualization and desert mirages.\n\n3. **Official Reference:** NCERT Physics Class 12 - Chapter 9 (Ray Optics).',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 12 Physics - Ray Optics and Optical Instruments',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'sci_ep14_q08',
    subjectId: 'general_science',
    topic: 'भौतिकशास्त्र (Physics)',
    subtopic: 'ध्वनी: डॉपलर परिणाम व सोनर तंत्रज्ञान (Doppler Effect & SONAR)',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: 'जेव्हा ध्वनीचा स्रोत (Sound Source) आणि निरीक्षक (Observer) यांच्यामध्ये सापेक्ष गती (Relative Motion) असते, तेव्हा निरीक्षकाला ऐकू येणाऱ्या ध्वनीच्या वारंवारतेत (Frequency) भासमान बदल होतो. या घटनेला काय म्हणतात आणि तिचा उपयोग कशामध्ये केला जातो?',
    questionEn: 'When there is relative motion between a source of sound and an observer, the apparent frequency of sound perceived by the observer changes. What is this phenomenon called, and where is it applied?',
    optionsMr: [
      'डॉपलर परिणाम (Doppler Effect) - रडार, सोनार आणि सोनोग्राफीमध्ये वापर',
      'रामन परिणाम (Raman Effect) - प्रकाशाच्या विखुरणात वापर',
      'टिंडल परिणाम (Tyndall Effect) - कलिली द्रावणात वापर',
      'झिमन परिणाम (Zeeman Effect) - चुंबकीय क्षेत्रात वर्णपट विभाजन'
    ],
    optionsEn: [
      'Doppler Effect - Applied in RADAR, SONAR, and Echocardiography',
      'Raman Effect - Applied in molecular light scattering',
      'Tyndall Effect - Applied in colloidal solutions',
      'Zeeman Effect - Applied in magnetic spectral splitting'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर स्पष्टीकरण:\n\n१. **डॉपलर परिणामाची भौतिकीय संकल्पना (Doppler Effect in Waves):** १८४२ मध्ये ऑस्ट्रियन गणितज्ञ व भौतिकशास्त्रज्ञ ख्रिश्चन डॉपलर यांनी हा मूलभूत नियम शोधून काढला. जेव्हा ध्वनीचा किंवा कोणत्याही तरंगांचा मूळ स्रोत (Source) आणि तो ध्वनी ऐकणारा निरीक्षक (Observer) यांच्यामध्ये एकमेकांच्या संदर्भात सापेक्ष गती (Relative Motion) असते, तेव्हा निरीक्षकाला प्रत्यक्षात जाणवणाऱ्या वारंवारतेमध्ये (Apparent Frequency) भासमान बदल घडून येतो. जेव्हा ध्वनीचा स्रोत निरीक्षकाकडे वेगाने येतो, तेव्हा प्रतिसेकंद कानावर आदळणाऱ्या तरंगांची संख्या वाढते, ज्यामुळे वारंवारता वाढून ध्वनीची पट्टी तीक्ष्ण (High Pitch / shrill sound) भासते (उदा. प्लॅटफॉर्मकडे वेगाने येणाऱ्या आगगाडीची शिटी). स्रोत दूर निघून जाताच तरंग लांबतात आणि आवाज घोगरा व कमी वारंवारतेचा (Low Pitch) होतो.\n\n२. **आधुनिक तंत्रज्ञान व वैद्यकीय क्षेत्रातील प्रत्यक्ष अनुप्रयोग:**\n• **सोनार (SONAR) व नौदल संरक्षण:** पाण्याखाली लपलेल्या पाणबुड्या, हिमनग आणि जहाजांचा समुद्रातील वेग व अचूक अंतर मोजण्यासाठी अल्ट्रासोनिक डॉपलर लहरींचा वापर होतो.\n• **पोलीस वाहतूक नियंत्रण (RADAR Speed Gun):** महामार्गावर धावणाऱ्या वाहनांकडे मायक्रोवेव्ह किरण पाठवून परत येणाऱ्या लहरींच्या फ्रिक्वेन्सी बदलावरून वाहनाचा तात्काळ वेग मोजला जातो.\n• **वैद्यकीय विज्ञान (Color Doppler Sonography & Echo):** हृदयाच्या झडपांची कार्यक्षमता, रोहिणींमधील रक्ताच्या गुठळ्या आणि रक्तप्रवाहाची दिशा व वेग अचूक पाहण्यासाठी डॉपलर चाचणी वापरली जाते.\n• **खगोलभौतिकी (Astrophysics):** ताऱ्यांचे प्रकाशकिरण लाल रंगाकडे झुकल्यास (Red Shift) तारे दूर जात आहेत, तर जांभळ्याकडे झुकल्यास (Blue Shift) ते जवळ येत आहेत हे सिद्ध करून एडविन हबलने विश्वाचा विस्तार डॉपलर परिणामावरूनच सिद्ध केला.\n\n३. **आयोगाचा संदर्भ:** NCERT Class 11 Physics - Chapter 15 Waves / स्टेट बोर्ड ११ वी भौतिकशास्त्र.',
    explanationEn: 'Comprehensive 150-word acoustical physics breakdown per Dr. Vaibhav Shinde Sir\'s lecture:\n\n1. **Fundamental Principle of Doppler Effect:** Formulated by Christian Doppler in 1842, the Doppler Effect describes the shift in observed frequency when the source of waves and the observer are in relative motion. When the source approaches the observer, wavefronts are compressed in time, increasing apparent pitch/frequency (f\' > f). Conversely, relative divergence stretches wavefronts, diminishing observed frequency.\n\n2. **Engineering and Medical Applications:**\n• **Aviation & Traffic Control:** Police speed-guns utilize Doppler microwave reflection to measure vehicle speed instantaneously.\n• **Naval Navigation (SONAR):** Ultrasonic pulse Doppler profiling calculates submarine velocity relative to seawater.\n• **Diagnostic Medicine:** Echocardiography and Color Doppler Sonography visualize intravascular blood velocity and cardiac valve regurgitation.\n• **Astrophysics:** Spectral redshift of distant galaxies confirms cosmological cosmic expansion.\n\n3. **Other Options:** Raman effect denotes inelastic photon scattering, Tyndall effect describes light scattering by colloids, and Zeeman effect involves spectral line splitting in magnetic fields.\n\n4. **Official Reference:** NCERT Physics Class 11 - Chapter 15 (Waves).',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 11 Physics - Waves',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'sci_ep14_q09',
    subjectId: 'general_science',
    topic: 'भौतिकशास्त्र (Physics)',
    subtopic: 'विद्युतधारा: ज्युलचा उष्णता नियम व फ्युज वायर (Heating Effect & Safety Fuse)',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: 'घरगुती विद्युत परिपथामध्ये उपकरणांच्या संरक्षणासाठी वापरल्या जाणाऱ्या "विद्युत वितळतार" (Electric Fuse Wire) बाबत खालीलपैकी कोणती वैशिष्ट्ये अचूक आहेत?',
    questionEn: 'Which of the following characteristics are strictly essential for an electrical safety fuse wire used in household circuits?',
    optionsMr: [
      'कमी वितळण बिंदू (Low Melting Point) आणि उच्च रोध (High Resistance)',
      'उच्च वितळण बिंदू (High Melting Point) आणि कमी रोध (Low Resistance)',
      'उच्च वितळण बिंदू आणि उच्च वाहकता',
      'कमी वितळण बिंदू आणि शून्य रोध'
    ],
    optionsEn: [
      'Low Melting Point and High Specific Resistance',
      'High Melting Point and Low Resistance',
      'High Melting Point and High Conductivity',
      'Low Melting Point and Zero Resistance'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर स्पष्टीकरण:\n\n१. **ज्युलचा उष्णता नियम (Joule\'s Law of Heating):** वाहकातून विद्युतधारा वाहताना निर्माण होणारी उष्णता H = I²Rt या सूत्रानुसार ठरते. परिपथात जेव्हा अतिभार (Overloading) किंवा शॉर्ट सर्किट (Short Circuit) मुळे विद्युतधारा (I) अचानक वाढते, तेव्हा निर्माण होणारी उष्णता तारेला गरम करते.\n\n२. **फ्युज वायरची वैशिष्ट्ये:**\n• **कमी वितळण बिंदू (Low Melting Point):** प्रवाहाचा भार सुरक्षित मर्यादेबाहेर जाताच तार लगेच वितळून तुटली पाहिजे, जेणेकरून परिपथ खंडित होऊन टीव्ही, फ्रिज यांसारखी महागडी उपकरणे जळण्यापासून वाचतील.\n• **उच्च रोध (High Resistance):** रोध जास्त असल्यामुळे उष्णता (H = I²Rt) वेगाने निर्माण होते आणि तार त्वरित वितळते.\n• **मिश्रधातू:** फ्युज वायर ही सामान्यतः **कथिल (Tin - ६३%) आणि शिसे (Lead - ३७%)** यांच्या मिश्रधातूपासून बनवली जाते.\n\n३. **आयोगाचा संदर्भ:** स्टेट बोर्ड इयत्ता १० वी विज्ञान - विद्युतधारेचे परिणाम व NCERT Class 10 Physics - Electricity.',
    explanationEn: 'Detailed 150-word electrical safety analysis based on Dr. Vaibhav Shinde Sir\'s lecture:\n\n1. **Underlying Law (Joule\'s Heating):** Thermal energy dissipated in a conductor is governed by Joule\'s equation: H = I²Rt. In scenarios of accidental short-circuits or severe overloading, current (I) surges exponentially, generating immense ohmic heat.\n\n2. **Engineering Properties of Fuse Wire:**\n• **Low Melting Point:** The fuse alloy must melt at a relatively low threshold temperature so that excessive current severs the circuit before sensitive home appliances suffer dielectric breakdown or fire.\n• **High Specific Resistance:** Elevated electrical resistivity ensures rapid, concentrated heat dissipation within the fuse link rather than along general household wiring.\n• **Composition:** Standard fuses utilize a eutectic solder alloy of **Tin (63%) and Lead (37%)** possessing a low melting temperature (~183°C).\nConsequently, Option 1 accurately encapsulates the required physical criteria.\n\n3. **Official Reference:** NCERT Class 10 Science - Chapter 12 (Electricity).',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 10 Science - Electricity',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'sci_ep14_q10',
    subjectId: 'general_science',
    topic: 'वनस्पतीशास्त्र (Botany)',
    subtopic: 'वनस्पती संप्रेरके: कार्ये व अनुप्रयोग (Plant Growth Regulators / Phytohormones)',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: 'वनस्पती संप्रेरके (Phytohormones) आणि त्यांची प्रमुख कार्ये यांच्या खालील जोड्या विचारात घ्या:\n(१) ऑक्झिन (Auxin) - प्रकाशाच्या दिशेने वाढ (Phototropism) व अग्रभागाची वृद्धी\n(२) जिबरेलिन (Gibberellin) - खोडाची लांबी वाढवणे व बियांची सुप्तावस्था मोडणे\n(३) सायटोकायनीन (Cytokinin) - पेशी विभाजनास (Cell Division) गती देणे\n(४) इथिलीन (Ethylene) - नैसर्गिकरीत्या फळे पिकवणे (Fruit Ripening)\n(५) ॲब्सिसिक ॲसिड (ABA) - वनस्पतींची वाढ रोखणे व पर्णगळती घडवून आणणे (तणाव संप्रेरक)\nवरीलपैकी कोणत्या जोड्या अचूक आहेत?',
    questionEn: 'Consider the following pairs of plant growth regulators (Phytohormones) and their primary physiological roles:\n(1) Auxin - Phototropism and apical dominance\n(2) Gibberellin - Stem elongation and breaking seed dormancy\n(3) Cytokinin - Acceleration of cell division (cytokinesis)\n(4) Ethylene - Gaseous hormone driving fruit ripening\n(5) Abscisic Acid (ABA) - Growth inhibition, leaf abscission, and stress tolerance\nWhich of the above pairs are correctly matched?',
    optionsMr: [
      'फक्त (१), (२) आणि (३)',
      'फक्त (१), (३) आणि (४)',
      'फक्त (२), (४) आणि (५)',
      'सर्व जोड्या अचूक आहेत (१, २, ३, ४ आणि ५)'
    ],
    optionsEn: [
      'Only (1), (2) and (3)',
      'Only (1), (3) and (4)',
      'Only (2), (4) and (5)',
      'All pairs are correctly matched (1, 2, 3, 4 and 5)'
    ],
    correctAnswerIndex: 3,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर स्पष्टीकरण:\n\n१. **वनस्पती वाढीस चालना देणारी संप्रेरके (Growth Promoters):**\n• **ऑक्झिन (Auxin - IAA):** खोड व मुळांच्या शेंड्यावर तयार होते. प्रकाशानुवर्ती हालचाली (Phototropism) घडवून आणते.\n• **जिबरेलिन (Gibberellin - GA₃):** जपानमध्ये कुरोसावाने \'बाकाने\' रोगावरून शोध लावला. बुटक्या वनस्पतींची लांबी वाढवणे, द्राक्षांच्या मण्यांचा आकार मोठा करणे आणि सुप्तावस्था मोडणे यात महत्त्वाचे.\n• **सायटोकायनीन (Cytokinin):** पेशीविभाजन (Cytokinesis) गतिमान करते, खोडाच्या बाजूच्या फांद्या वाढवते आणि वनस्पतींना ताजे ठेवते.\n\n२. **वाढ रोखणारी संप्रेरके (Growth Inhibitors):**\n• **इथिलीन (Ethylene):** हे एकमेव **वायू स्वरूपातील** नैसर्गिक संप्रेरक आहे जे झाडावरील फळे पिकवण्यास कारणीभूत असते.\n• **ॲब्सिसिक ॲसिड (ABA):** याला "तणाव संप्रेरक" (Stress hormone) म्हणतात. दुष्काळात पर्णरंध्रे (Stomata) बंद करून बाष्पोत्सर्जन रोखणे आणि पानगळ घडवून आणणे हे याचे काम आहे.\nत्यामुळे सर्व ५ जोड्या अचूक आहेत.\n\n३. **आयोगाचा संदर्भ:** NCERT Class 11 Biology - Plant Growth and Development / स्टेट बोर्ड १२ वी.',
    explanationEn: 'Comprehensive 150-word botanical physiology review following Dr. Vaibhav Shinde Sir:\n\n1. **Plant Growth Promoters:**\n• **Auxin (Indole-3-Acetic Acid):** Synthesized at shoot tips, Auxin coordinates apical dominance and directs phototropic curvature toward unidirectional light.\n• **Gibberellins (GA₃):** Discovered in Japan via the \'bakanae\' rice fungus, gibberellins stimulate internodal elongation, enhance grape cluster size, and trigger seed germination by hydrolyzing endosperm starches.\n• **Cytokinins (Zeatin/Kinetin):** Act synergistically with auxins to accelerate active cell division (cytokinesis), break apical dominance, and postpone foliar senescence.\n\n2. **Plant Growth Inhibitors:**\n• **Ethylene:** The sole gaseous phytohormone, naturally orchestrating climatic fruit ripening, tissue abscission, and floral maturation.\n• **Abscisic Acid (ABA):** Styled the "Stress Hormone", ABA protects plants under drought by enforcing stomatal closure to minimize transpiration, inducing seed dormancy, and triggering leaf fall.\nThus, all five statements correctly correlate hormones with physiological outcomes.\n\n3. **Official Reference:** NCERT Biology Class 11 - Chapter 15 (Plant Growth and Development).',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 11 Biology - Plant Growth and Development',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'sci_ep14_q11',
    subjectId: 'general_science',
    topic: 'जीवशास्त्र (Biology)',
    subtopic: 'पेशीजीवशास्त्र: पेशी अंगके व त्यांची कार्ये (Cell Organelles & Functions)',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: 'पेशी अंगके (Cell Organelles) आणि त्यांच्या उपनामांबाबत खालीलपैकी कोणती जोडी अयोग्य आहे?',
    questionEn: 'Which of the following pairs linking cell organelles to their widely accepted biological epithets is incorrectly matched?',
    optionsMr: [
      'तंतुकणिका (Mitochondria) - पेशीचे ऊर्जा केंद्र (Powerhouse of the Cell)',
      'लयकारिका (Lysosomes) - आत्मघाती पिशव्या (Suicide Bags)',
      'रायबोझोम्स (Ribosomes) - पेशीचा प्रथिन कारखाना (Protein Factories)',
      'गॉल्जी संकुल (Golgi Apparatus) - पेशीचा मेंदू किंवा नियंत्रण केंद्र'
    ],
    optionsEn: [
      'Mitochondria - Powerhouse of the Cell',
      'Lysosomes - Suicide Bags of the Cell',
      'Ribosomes - Protein Factories of the Cell',
      'Golgi Apparatus - Brain or Control Centre of the Cell'
    ],
    correctAnswerIndex: 3,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर स्पष्टीकरण:\n\n१. **अयोग्य जोडीचे विश्लेषण:** "पेशीचा मेंदू किंवा नियंत्रण केंद्र" (Brain / Control Center of the Cell) हे **केंद्रक (Nucleus)** ला म्हणतात, कारण ते पेशीतील सर्व जैविक व आनुवंशिक क्रियांचे नियंत्रण करते. गॉल्जी संकुलाला (Golgi Apparatus) "पेशीचे पोस्ट ऑफिस किंवा पॅकेजिंग केंद्र" (Packaging & Dispatch Unit) म्हटले जाते.\n\n२. **इतर योग्य जोड्यांची माहिती:**\n• **तंतुकणिका (Mitochondria):** येथे क्रेब्स चक्राद्वारे ATP च्या स्वरूपात ऊर्जा निर्माण होते, म्हणून हिला "ऊर्जा केंद्र" (Powerhouse) म्हणतात. तंतुकणिकेमध्ये स्वतःचे DNA आणि रायबोझोम्स असतात.\n• **लयकारिका (Lysosomes):** यामध्ये ४० पेक्षा जास्त जलविघटनकारी पाचक विकरे (Hydrolytic Enzymes) असतात. पेशी जुनी किंवा संसर्गग्रस्त झाल्यास ती स्वतः फुटून पेशीचे पचन करते, म्हणून तिला "आत्मघाती पिशव्या" (Suicide Bags) म्हणतात.\n• **रायबोझोम्स (Ribosomes):** RNA व प्रथिनांनी बनलेले असून ते प्रथिनांची निर्मिती करतात, म्हणून त्यांना "प्रथिन कारखाने" म्हणतात.\n\n३. **आयोगाचा संदर्भ:** NCERT Class 9 व 11 Science - Cell: The Unit of Life / स्टेट बोर्ड ८ वी.',
    explanationEn: 'Detailed 150-word cell biology breakdown following Dr. Vaibhav Shinde Sir\'s lecture:\n\n1. **Analysis of Incorrect Pair:** The title "Brain or Master Control Center of the Cell" belongs strictly to the **Nucleus**, which houses genomic chromatin and directs cellular transcription, metabolism, and mitotic reproduction. The **Golgi Complex** (discovered by Camillo Golgi) serves as the "Cellular Post Office or Packaging and Sorting Center", modifying and sorting secretory glycoproteins.\n\n2. **Validation of Correct Pairs:**\n• **Mitochondria:** Synthesizes adenosine triphosphate (ATP) via the Krebs cycle and oxidative phosphorylation across inner cristae membranes, rightfully termed the "Powerhouse of the Cell". Mitochondria uniquely possess semi-autonomous circular DNA.\n• **Lysosomes:** Spherical vesicles packed with acidic hydrolytic enzymes (pH ~5.0). Under severe cellular injury or autophagic stress, lysosomes rupture and self-digest the cell, earning the moniker "Suicide Bags".\n• **Ribosomes:** Non-membrane-bound ribonucleoprotein complexes orchestrating mRNA translation and polypeptide synthesis, universally recognized as "Protein Factories".\n\n3. **Official Reference:** NCERT Class 11 Biology - Chapter 8 (Cell: The Unit of Life).',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 11 Biology - Cell: The Unit of Life',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'sci_ep14_q12',
    subjectId: 'general_science',
    topic: 'भौतिकशास्त्र (Physics)',
    subtopic: 'गुरुत्वाकर्षण: मुक्ती वेग व गुरुत्वीय त्वरण (Escape Velocity & Acceleration due to Gravity)',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: 'पृथ्वीवरील "मुक्ती वेगाबाबत" (Escape Velocity - v_e) आणि गुरुत्वीय त्वरणाबाबत (g) खालील विधाने विचारात घ्या:\n(अ) मुक्ती वेग म्हणजे असा किमान वेग ज्याने फेकलेली वस्तू ग्रहाच्या गुरुत्वाकर्षण क्षेत्राबाहेर निघून जाते आणि पुन्हा परत येत नाही.\n(ब) पृथ्वीच्या पृष्ठभागावर मुक्ती वेगाचे मूल्य सुमारे ११.२ किमी/सेकंद (11.2 km/s) असते.\n(क) मुक्ती वेगाचे मूल्य फेकल्या जाणाऱ्या वस्तूच्या वस्तुमानावर (Mass of projectile) अवलंबून नसते.\n(ड) चंद्रावर मुक्ती वेग कमी असल्याने (२.३८ किमी/सेकंद) तेथे वायूंचे रेणू टिकून राहू शकत नाहीत, परिणामी चंद्रावर वातावरण नाही.\nवरीलपैकी कोणती विधाने सत्य आहेत?',
    questionEn: 'Consider the following statements regarding Escape Velocity (v_e) and gravitational physics on Earth and Moon:\n(a) Escape velocity is the minimum velocity required for a body to break completely free from a planet\'s gravitational pull without further propulsion.\n(b) The escape velocity from the surface of Earth is approximately 11.2 km/s.\n(c) The magnitude of escape velocity is completely independent of the mass of the projectile body.\n(d) Because the Moon\'s escape velocity is low (~2.38 km/s), gas molecules exceed root-mean-square speeds, explaining why the Moon lacks an atmosphere.\nWhich of the above statements are true?',
    optionsMr: [
      'फक्त (अ) आणि (ब)',
      'फक्त (ब) आणि (क)',
      'फक्त (अ), (ब) आणि (क)',
      'सर्व विधाने सत्य आहेत (अ, ब, क आणि ड)'
    ],
    optionsEn: [
      'Only (a) and (b)',
      'Only (b) and (c)',
      'Only (a), (b) and (c)',
      'All statements are true (a, b, c and d)'
    ],
    correctAnswerIndex: 3,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर स्पष्टीकरण:\n\n१. **मुक्ती वेगाची भौतिकीय संकल्पना व गणितीय सूत्र (Escape Velocity Derivation):** मुक्ती वेग (v_e) म्हणजे असा किमान सुरुवातीचा प्रक्षेपण वेग, ज्या वेगाने पृथ्वीच्या किंवा कोणत्याही ग्रहाच्या पृष्ठभागावरून फेकलेली वस्तू त्या ग्रहाच्या गुरुत्वाकर्षणाच्या प्रभावातून कायमची मुक्त होऊन अनंत अंतरावर निघून जाते आणि पुन्हा कधीही खाली परत येत नाही. यांत्रिक ऊर्जेच्या अक्षय्यतेच्या नियमानुसार (Law of Conservation of Energy):\nमुक्ती वेगाचे सूत्र: v_e = √(२GM/R) = √(२gR)\nयेथे: G = वैश्विक गुरुत्वाकर्षण स्थिरांक (६.६७ × १०⁻¹¹ N·m²/kg²), M = ग्रहाचे वस्तुमान, R = ग्रहाची त्रिज्या, आणि g = भूपृष्ठावरील गुरुत्वीय त्वरण (९.८ मी/से²). या सूत्रात पृथ्वीची मूल्ये टाकल्यास पृथ्वीवरील मुक्ती वेग v_e = √(२ × ९.८ × ६.४ × १०⁶) ≈ ११.२ किमी/सेकंद (किंवा सुमारे ४०,३२० किमी/तास) येतो.\n\n२. **प्रक्षेपकाच्या वस्तुमानावर स्वायत्तता:** सूत्रावरून स्पष्ट दिसते की मुक्ती वेगामध्ये फेकल्या जाणाऱ्या वस्तूचे स्वतःचे वस्तुमान (m) पूर्णपणे लोप पावते; म्हणजेच १० ग्रॅमचा लहान खडा असो वा १०,००० किलोचा अजस्त्र उपग्रह असो, दोघांनाही पृथ्वीचे गुरुत्वाकर्षण ओलांडण्यासाठी समान ११.२ किमी/सेकंद वेग द्यावा लागतो. म्हणून विधाने (अ), (ब) आणि (क) सत्य आहेत.\n\n३. **चंद्रावर वातावरण का अस्तित्त्वात नाही? (विधान ड चे स्पष्टीकरण):** चंद्राचे वस्तुमान व त्रिज्या लहान असल्याने चंद्रावरील मुक्ती वेग केवळ २.३८ किमी/सेकंद इतका नगण्य आहे. चंद्राच्या तापमानाला ऑक्सिजन, नायट्रोजन आणि हायड्रोजन यांसारख्या सर्व सामान्य वायूंच्या रेणूंचा वर्ग-माध्य-मूळ वेग (Root Mean Square / RMS Velocity = √(3kT/m)) हा २.३८ किमी/से पेक्षा जास्त असतो. त्यामुळे निर्मितीच्या सुरुवातीला निर्माण झालेले वायूंचे रेणू चंद्राचे कमकुवत गुरुत्वाकर्षण ओलांडून कायमचे अंतराळात निसटून गेले; परिणामी चंद्रावर कोणतेही वातावरण अस्तित्त्वात राहू शकले नाही.\n\n४. **आयोगाचा संदर्भ:** NCERT Class 11 Physics - Chapter 8 Gravitation / स्टेट बोर्ड १० वी विज्ञान.',
    explanationEn: 'Comprehensive 150-word gravitational physics exposition per Dr. Vaibhav Shinde Sir:\n\n1. **Mathematical Derivation:** Escape velocity represents the initial kinetic speed required to overcome planetary gravitational binding energy:\nv_e = √(2GM/R) = √(2gR)\nSubstituting Earth parameters (M = 5.97 x 10²⁴ kg, R = 6.37 x 10⁶ m, g = 9.8 m/s²) yields:\nv_e ≈ 11.2 km/s.\nNotice that the projectile\'s own mass (m) cancels out entirely during mechanical energy conservation balance; hence escape velocity is strictly identical for a microscopic dust grain or a massive multi-ton satellite.\n\n2. **Atmospheric Physics of the Moon:** On the Moon, weaker gravity yields an escape threshold of merely 2.38 km/s. The root-mean-square thermal speeds (v_rms = √(3kT/m)) of atmospheric gas molecules (O₂, N₂, CO₂) comfortably exceed 2.38 km/s during lunar daytime temperatures (~100°C), resulting in total molecular escape into deep space over geological epochs.\nConsequently, statements (a), (b), (c), and (d) are all rigorously true.\n\n3. **Official Reference:** NCERT Physics Class 11 - Chapter 8 (Gravitation).',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 11 Physics - Gravitation',
    yearTag: 'Science MCQ EP-14'
  }
];
