import { Question } from '../types';

export interface SeriesVideoMetadata {
  id: string;
  title: string;
  titleEn: string;
  teacher: string;
  teacherEn: string;
  academy: string;
  academyEn: string;
  youtubeUrl: string;
  youtubeEmbedUrl: string;
  totalQuestions: number;
  subject: string;
  tags: string[];
}

export const SERIES_METADATA: SeriesVideoMetadata = {
  id: 'dnyanadeep_science_ep14',
  title: '🚀 SCIENCE Through MCQ | EP-14 | UPSC & MPSC Science MCQs | Dr. Vaibhav Shinde Sir',
  titleEn: '🚀 SCIENCE Through MCQ | EP-14 | UPSC & MPSC Science MCQs Series',
  teacher: 'डॉ. वैभव शिंदे सर (Dr. Vaibhav Shinde Sir)',
  teacherEn: 'Dr. Vaibhav Shinde Sir',
  academy: 'ज्ञानदीप ॲकॅडमी पुणे (Dnyanadeep Academy Pune)',
  academyEn: 'Dnyanadeep Academy Pune',
  youtubeUrl: 'https://www.youtube.com/watch?v=5Oi5d2OEy_o',
  youtubeEmbedUrl: 'https://www.youtube.com/embed/5Oi5d2OEy_o',
  totalQuestions: 12,
  subject: 'सामान्य विज्ञान (General Science)',
  tags: ['सामान्य विज्ञान', 'भौतिकशास्त्र', 'रसायनशास्त्र', 'जीवशास्त्र', 'आरोग्यशास्त्र', 'MPSC 2026', 'MPSC 2027']
};

export const SERIES_QUESTIONS: Question[] = [
  {
    id: 'series_sci_q01',
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
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर १५०+ शब्द स्पष्टीकरण:\n\n१. **समन्यूट्रॉनिक (Isotones) ची मूलभूत संकल्पना:** ज्या अणूंमध्ये न्यूट्रॉन्सची संख्या (N = A - Z) तंतोतंत समान असते, परंतु अणुअंक (Z, प्रोटॉन संख्या) व वस्तुमानांक (A) वेगळे असतात, त्यांना समन्यूट्रॉनिक किंवा आयसोटोन्स म्हणतात. सिलिकॉन (¹⁴Si३०) मध्ये न्यूट्रॉन्स = ३० - १४ = १६; फॉस्फरस (¹⁵P३१) मध्ये न्यूट्रॉन्स = ३१ - १५ = १६; आणि सल्फर (¹⁶S३२) मध्ये न्यूट्रॉन्स = ३२ - १६ = १६ आहेत. त्यामुळे तिन्ही अणूंमध्ये प्रत्येकी १६ न्यूट्रॉन्स असल्याने ते एकमेकांचे आयसोटोन्स आहेत. विधान (अ) व (ब) दोन्ही बरोबर आहेत.\n\n२. **समभार (Isobars) ची संकल्पना:** ज्यांचे वस्तुमानांक (A) समान असतात (उदा. ४०Ar१८, ४०K१९, ४०Ca२०), त्यांना आयसोबार म्हणतात. यामध्ये बाह्यतम कक्षेतील इलेक्ट्रॉन संरचना आणि प्रोटॉन संख्या भिन्न असल्याने त्यांचे रासायनिक गुणधर्म मूलतः वेगळे असतात. त्यामुळे विधान (क) देखील सत्य आहे.\n\n३. **परीक्षेसाठी क्लृप्ती (Mnemonic):**\n• Isoto**P**es = **P**rotons समान.\n• Isoto**N**es = **N**eutrons समान.\n• Iso**B**ars = Mass num**B**er (A) समान.\n\n४. **आयोगाचा संदर्भ:** NCERT इयत्ता ११ वी रसायनशास्त्र - अणूचे स्वरूप व स्टेट बोर्ड इयत्ता ९ वी विज्ञान.',
    explanationEn: 'Comprehensive 150-word analysis based on Dr. Vaibhav Shinde Sir\'s lecture:\n\n1. **Core Concept of Isotones:** Isotones are defined as distinct nuclear species having the exact same neutron count (N = A - Z), while possessing different proton numbers (Z) and total mass numbers (A). Calculating the neutron numbers for the trio:\n• For Silicon (¹⁴Si³⁰): N = 30 - 14 = 16 neutrons.\n• For Phosphorus (¹⁵P³¹): N = 31 - 15 = 16 neutrons.\n• For Sulfur (¹⁶S³²): N = 32 - 16 = 16 neutrons.\nSince all three nuclides contain precisely 16 neutrons, statements (a) and (b) are indisputably true.\n\n2. **Analysis of Isobars:** Isobars share identical mass numbers (A) despite having different atomic numbers (e.g., ⁴⁰Ar, ⁴⁰K, ⁴⁰Ca). Because chemical reactivity is dictated strictly by valence electron configurations and atomic number (Z), isobars belong to distinct elements and exhibit vastly divergent chemical characteristics. Statement (c) is completely sound.\n\n3. **Quick Memory Technique:**\n• Isoto**P**es -> Same **P**roton number.\n• Isoto**N**es -> Same **N**eutron number.\n• Iso**B**ars -> Same Atomic Mass (num**B**er A).\n\n4. **Official Reference:** NCERT Class 11 Chemistry (Structure of Atom) and Maharashtra State Board Std 11 Physics.',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 11 Chemistry - Structure of Atom',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'series_sci_q02',
    subjectId: 'general_science',
    topic: 'भौतिकशास्त्र (Physics)',
    subtopic: 'प्रकाशशास्त्र: भिंगाचे प्रकार, दृष्टीदोष व नाभिय अंतर',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: 'मानवी डोळा, दृष्टीदोष व भिंग यांच्या संदर्भातील खालील विधाने तपासा:\n(अ) निकटदृष्टिता (Myopia) या दोषामध्ये व्यक्तीला लांबच्या वस्तू अस्पष्ट दिसतात, हा दोष दूर करण्यासाठी योग्य नाभीय अंतराच्या बहिर्गोल भिंगाचा (Convex Lens) वापर केला जातो.\n(ब) दूरदृष्टिता (Hypermetropia) दोषात नेत्रगोल उभा चपटा झाल्यामुळे प्रतिमेचे केंद्रीकरण दृष्टिपटलाच्या (Retina) मागे होते.\n(क) भिंगाची शक्ती (Power of Lens) ही त्याच्या नाभीय अंतराच्या (Focal length in metres) व्यस्त प्रमाणात असते आणि तिचे SI एकक डायॉप्टर (Dioptre - D) हे आहे.\nवरीलपैकी अयोग्य (चुकीचे) विधान कोणते?',
    questionEn: 'Examine the following statements regarding the human eye, optical vision defects, and corrective lenses:\n(a) In Myopia (near-sightedness), distant objects appear blurred, and this condition is rectified using a Convex lens of appropriate focal length.\n(b) In Hypermetropia (far-sightedness), the eyeball becomes flattened, causing the image to focus behind the retina.\n(c) The power of a lens is inversely proportional to its focal length measured in metres (P = 1/f), and its standard SI unit is Dioptre (D).\nWhich of the above statements is incorrect?',
    optionsMr: [
      'फक्त (अ)',
      'फक्त (ब)',
      'फक्त (क)',
      'फक्त (अ) आणि (क)'
    ],
    optionsEn: [
      'Only (a)',
      'Only (b)',
      'Only (c)',
      'Only (a) and (c)'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर १५०+ शब्द स्पष्टीकरण:\n\n१. **निकटदृष्टिता (Myopia) मधील चूक:** निकटदृष्टिता दोषामध्ये डोळ्याचा गोल लांबट होतो किंवा नेत्रभिंगाची वक्रता वाढते, ज्यामुळे दूरच्या वस्तूची प्रतिमा रेटिनाच्या (दृष्टिपटलाच्या) पुढेच तयार होते. हा दोष दूर करण्यासाठी **अपसारी भिंग म्हणजेच अंतर्गोल भिंग (Concave Lens)** वापरावे लागते; बहिर्गोल भिंग नव्हे! बहिर्गोल भिंग वापरल्यास प्रतिमा अधिकच पुढे पडेल आणि दोष वाढेल. त्यामुळे विधान (अ) अयोग्य (चूक) आहे.\n\n२. **दूरदृष्टिता (Hypermetropia):** या दोषामध्ये जवळच्या वस्तूची प्रतिमा दृष्टिपटलाच्या मागे केंद्रित होते. यासाठी **अभिसारी म्हणजेच बहिर्गोल भिंग (Convex Lens)** वापरून प्रकाशकिरण रेटिनावर एकत्रित केले जातात. त्यामुळे विधान (ब) सत्य आहे.\n\n३. **भिंगाची शक्ती (P = 1/f):** भिंगाचे नाभीय अंतर मीटरमध्ये मोजल्यास त्याचा व्यस्तांक म्हणजे भिंगाची शक्ती होय (P = 1/f). नाभीय अंतर १ मीटर असल्यास शक्ती १ डायॉप्टर (1 D = 1 m⁻¹) असते. अंतर्गोल भिंगाची शक्ती ऋण (-D) तर बहिर्गोल भिंगाची शक्ती धन (+D) असते. विधान (क) योग्य आहे.\n\n४. **आयोगाचा संदर्भ:** स्टेट बोर्ड इयत्ता १० वी विज्ञान भाग-१ (प्रकरण ७: भिंगे व त्यांचे उपयोग).',
    explanationEn: 'Comprehensive 150-word analysis based on Dr. Vaibhav Shinde Sir\'s lecture:\n\n1. **Myopia Correction Analysis:** In Myopia (short-sightedness), the eyeball elongates or the cornea becomes overly curved, resulting in incoming parallel light rays converging in front of the retina rather than directly on it. To correct this focal disparity, a diverging lens—namely a **Concave lens (having negative optical power -D)**—is required to diverge light rays slightly before entering the eye. Statement (a) falsely claims a Convex lens is employed; hence, statement (a) is definitively incorrect.\n\n2. **Hypermetropia Mechanics:** In hypermetropia, the eyeball is shortened along the optical axis, leading to the focal convergence of nearby objects falling behind the retina. Corrective eyewear employs a convergent Convex lens (+D) to shorten focal length and ensure precise focus onto retinal photoreceptors. Thus, statement (b) is scientifically accurate.\n\n3. **Power of Lens Formulation:** Power is mathematically defined as P = 1/f (where focal length f is expressed in metres). One Dioptre (1 D) corresponds to 1 m⁻¹. Convex lenses carry positive dioptric values, while concave lenses carry negative dioptric values. Statement (c) is completely accurate.\n\n4. **Official Reference:** NCERT Class 10 Chapter 11 (Human Eye and Colourful World) & Maharashtra State Board Std 10 Science.',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / Maharashtra State Board Class 10 Science Part 1',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'series_sci_q03',
    subjectId: 'general_science',
    topic: 'भौतिकशास्त्र (Physics)',
    subtopic: 'विद्युत व उष्णता: जूलचा औष्णिक परिणामाचा नियम व विद्युत शक्ती',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: 'विद्युतधारेचा औष्णिक परिणाम आणि जूलच्या नियमाबाबत (Joule\'s Law of Heating) खालील विधानांचा विचार करा:\n(अ) वाहकामध्ये निर्माण होणारी उष्णता (H) ही वाहकातून वाहणाऱ्या विद्युतधारेच्या वर्गाच्या (I²) समप्रमाणात असते.\n(ब) वाहकाचा रोध (Resistance - R) आणि विद्युतप्रवाह वाहण्याचा काळ (t) कायम ठेवल्यास विद्युतधारा दुप्पट केल्यास निर्माण होणारी उष्णता चार पटीने वाढते.\n(क) विद्युत हीटर, इस्त्री आणि गिझरमध्ये नायक्रोम (Nichrome) या मिश्रधातूचे वेटोळे वापरले जाते, कारण त्याचा रोध कमी असतो आणि त्याचा वितळण बिंदू अतिशय कमी असतो.\nवरीलपैकी सत्य विधाने कोणती आहेत?',
    questionEn: 'Evaluate the following statements concerning the heating effect of electric current and Joule\'s Law of Heating:\n(a) The thermal energy (H) generated in a conductor is directly proportional to the square of the electric current (I²).\n(b) If resistance (R) and flow duration (t) are maintained constant, doubling the electric current amplifies generated heat fourfold.\n(c) Nichrome alloy is utilized in electric heaters, irons, and geysers primarily because it possesses extremely low resistance and a very low melting point.\nWhich of the above statements are correct?',
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
    correctAnswerIndex: 0,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर १५०+ शब्द स्पष्टीकरण:\n\n१. **जूलचा उष्णतेचा नियम (Joule\'s Law):** जूलच्या नियमानुसार वाहकात निर्माण होणारी उष्णता H = I²Rt / J (जूल) असते. म्हणजेच:\n• H ∝ I² (विद्युतधारेचा वर्ग),\n• H ∝ R (वाहकाचा रोध),\n• H ∝ t (विद्युत वहनाचा कालावधी).\nत्यामुळे जर विद्युतधारा दुप्पट केली (2I), तर उष्णता (2)² = 4 पटीने वाढते. त्यामुळे विधाने (अ) आणि (ब) दोन्ही पूर्णपणे सत्य आहेत.\n\n२. **नायक्रोम (Nichrome) बाबत विश्लेषण:** विद्युत इस्त्री, गिझर किंवा हिटरमध्ये नायक्रोम (८०% निकेल + २०% क्रोमियम) ही उच्च रोधकता (High Resistivity) आणि उच्च वितळण बिंदू (High Melting Point - सुमारे १४००°C) असणारी मिश्रधातू वापरली जाते. विधान (क) मध्ये रोध व वितळण बिंदू कमी असल्याचे म्हटले आहे, जे पूर्णतः चुकीचे आहे. जर वितळण बिंदू कमी असता तर गरम होताच तार वितळून तुटली असती.\n\n३. **विद्युत शक्ती (Electric Power):** P = V × I = I²R = V²/R. त्याचे एकक वॅट (Watt) हे आहे.\n\n४. **आयोगाचा संदर्भ:** NCERT इयत्ता १० वी भौतिकशास्त्र (विद्युतधारा) व स्टेट बोर्ड इयत्ता १० वी विज्ञान भाग-१.',
    explanationEn: 'Comprehensive 150-word analysis based on Dr. Vaibhav Shinde Sir\'s lecture:\n\n1. **Mathematical Derivation of Joule\'s Heating Law:** According to Joule\'s Law, the heat generated inside an electric conductor is governed by the relation H = I²Rt. Consequently, heat production is strictly proportional to:\n• The square of the electrical current (H ∝ I²).\n• The electrical resistance of the material (H ∝ R).\n• The temporal duration of current passage (H ∝ t).\nIf current I is doubled while holding R and t static, heat output scales by a factor of 2² = 4. Hence, statements (a) and (b) are irrefutably correct.\n\n2. **Deconstruction of Nichrome Properties:** Heating elements in household appliances (toasters, soldering irons, water geysers) mandate Nichrome (an alloy of 80% Nickel and 20% Chromium) because of its exceptional electrical resistivity and elevated melting point (~1400°C), alongside resistance to thermal oxidation. Statement (c) erroneously asserts Nichrome has "low resistance and very low melting point," making it scientifically flawed.\n\n3. **Power Equation:** Electric power P = VI = I²R = V²/R (measured in Watts).\n\n4. **Official Reference:** NCERT Class 10 Science Chapter 12 (Electricity) and State Board Std 10.',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 10 Physics - Electricity',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'series_sci_q04',
    subjectId: 'general_science',
    topic: 'जीवशास्त्र (Biology)',
    subtopic: 'मानवी शरीरशास्त्र: अंतःस्रावी ग्रंथी व संप्रेरके (Endocrine System)',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: 'मानवी अंतःस्रावी ग्रंथी (Endocrine Glands) आणि त्यांच्या संप्रेरकांबाबत (Hormones) खालील जोड्या विचारात घ्या:\n१. पियुषिका ग्रंथी (Pituitary Gland) - ऑक्सिटोसिन व व्हॅसोप्रेसिन (ADH)\n२. स्वादुपिंड (Pancreas - लैंगरहॅन्सची बेटे) - इन्सुलिन व ग्लुकागॉन\n३. अधिवृक्क ग्रंथी (Adrenal Gland) - ॲड्रेनॅलिन (Fight or Flight संप्रेरक)\n४. थायरॉईड ग्रंथी (Thyroid Gland) - कॅल्सीटोनिन व थायरॉक्सिन\nवरीलपैकी कोणत्या जोड्या अचूक जुळलेल्या आहेत?',
    questionEn: 'Consider the following pairs of human endocrine glands and their secreted hormones:\n1. Pituitary Gland - Oxytocin and Vasopressin (ADH)\n2. Pancreas (Islets of Langerhans) - Insulin and Glucagon\n3. Adrenal Gland - Adrenaline (Fight or Flight hormone)\n4. Thyroid Gland - Calcitonin and Thyroxine\nWhich of the above pairs are accurately matched?',
    optionsMr: [
      'फक्त १ आणि २',
      'फक्त २ आणि ३',
      'फक्त १, २ आणि ३',
      'वरील सर्व जोड्या (१, २, ३ आणि ४) योग्य आहेत'
    ],
    optionsEn: [
      'Only 1 and 2',
      'Only 2 and 3',
      'Only 1, 2 and 3',
      'All of the above pairs (1, 2, 3 and 4) are correct'
    ],
    correctAnswerIndex: 3,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर १५०+ शब्द स्पष्टीकरण:\n\n१. **पियुषिका ग्रंथी (Pituitary Gland):** मेंदूच्या तळाशी असणाऱ्या या ग्रंथीला शरीराची "मुख्य ग्रंथी" (Master Gland) म्हणतात. तिच्या पश्चभागातून (Posterior lobe) ऑक्सिटोसिन (प्रसूती व दुग्धस्रवण संप्रेरक) आणि व्हॅसोप्रेसिन/ADH (मूत्रातील पाण्याचे प्रमाण नियंत्रित करणारे संप्रेरक) स्रवले जातात. जोडी १ योग्य आहे.\n\n२. **स्वादुपिंड (Pancreas):** स्वादुपिंड ही अंतःस्रावी व बाह्यस्रावी अशी मिश्र ग्रंथी आहे. त्यातील लँगरहॅन्सच्या बेटांमधील बीटा पेशींमधून **इन्सुलिन** (रक्तातील शर्करा कमी करणारे) आणि अल्फा पेशींमधून **ग्लुकागॉन** (शर्करा वाढवणारे) स्रवले जाते. जोडी २ बरोबर आहे.\n\n३. **अधिवृक्क ग्रंथी (Adrenal Gland):** मूत्रपिंडाच्या टोकावर असणाऱ्या ॲड्रिनल मेड्युलामधून ॲड्रेनॅलिन (Epinephrine) स्रवले जाते. हे आपत्कालीन परिस्थितीत हृदयाचे ठोके व रक्तदाब वाढवून शरीराला लढा किंवा पळा (Fight or Flight) साठी तयार करते. जोडी ३ बरोबर आहे.\n\n४. **थायरॉईड ग्रंथी:** आयोडीनयुक्त थायरॉक्सिन आणि रक्तातील कॅल्शियम कमी करणारे कॅल्सीटोनिन स्रवते. सर्व जोड्या सत्य आहेत.\n\n५. **आयोगाचा संदर्भ:** NCERT इयत्ता ११ वी जीवशास्त्र (रासायनिक समन्वय) व स्टेट बोर्ड इयत्ता १२ वी.',
    explanationEn: 'Comprehensive 150-word analysis based on Dr. Vaibhav Shinde Sir\'s lecture:\n\n1. **Pituitary Dynamics:** Often titled the "Master Gland," the pituitary orchestrates multiple endocrine pathways. Its posterior lobe stores and releases Oxytocin (facilitating uterine contractions and milk ejection) and Vasopressin / Antidiuretic Hormone (ADH, preserving renal fluid homeostasis). Pair 1 is undeniably accurate.\n\n2. **Pancreatic Dual Function:** The Pancreas operates as a composite heterocrine organ. The endocrine Islets of Langerhans feature Beta cells that produce Insulin (prompting cellular glucose uptake and lowering glycemia) and Alpha cells releasing Glucagon (mobilizing liver glycogen to elevate blood sugar). Pair 2 is completely valid.\n\n3. **Adrenal Emergency Response:** Located superior to the kidneys, the adrenal medulla discharges Adrenaline (epinephrine), the hallmark "Fight or Flight" hormone, accelerating heart rate, pupillary dilation, and muscular blood supply during acute physiological stress. Pair 3 is correct.\n\n4. **Thyroid Hormone Synthesis:** The thyroid produces Thyroxine (T4/T3, directing basal metabolic rate) alongside Calcitonin (lowering blood calcium levels). Hence, all 4 pairs are properly correlated.\n\n5. **Official Reference:** NCERT Class 11 Biology Chapter 22 (Chemical Coordination and Integration).',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 11 Biology - Chemical Coordination',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'series_sci_q05',
    subjectId: 'general_science',
    topic: 'भौतिकशास्त्र (Physics)',
    subtopic: 'ध्वनीशास्त्र: ध्वनीचा वेग, माध्यमाचे स्वरूप व वारंवारता',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: 'ध्वनी लहरींच्या गुणधर्मांवर आधारित खालील विधानांचे परीक्षण करा:\n(अ) ध्वनी लहरी या यांत्रिक अनुतरंग (Mechanical Longitudinal Waves) असल्याने त्यांच्या प्रसारणासाठी भौतिक माध्यमाची नितांत गरज असते; निर्वातात (Vacuum) ध्वनीचा वेग शून्य असतो.\n(ब) सर्वसाधारणपणे ध्वनीचा वेग वायू माध्यमामध्ये सर्वाधिक, तर स्थायू माध्यमामध्ये सर्वात कमी असतो.\n(क) हवेचे तापमान १ अंश सेल्सिअसने वाढल्यास हवेतील ध्वनीचा वेग सुमारे ०.६१ मीटर प्रति सेकंदाने वाढतो.\nवरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionEn: 'Evaluate the following assertions regarding acoustic waves and sound velocity:\n(a) Because sound waves are mechanical longitudinal waves, they fundamentally require a physical material medium for propagation, possessing zero velocity in a vacuum.\n(b) As a general rule, the velocity of sound reaches its maximum in gaseous mediums and its absolute minimum in dense solid mediums.\n(c) For every 1-degree Celsius increment in ambient air temperature, the speed of sound in air elevates by approximately 0.61 metres per second.\nWhich of the above statements are correct?',
    optionsMr: [
      'फक्त (अ) आणि (ब)',
      'फक्त (अ) आणि (क)',
      'फक्त (ब) आणि (क)',
      'सर्व विधाने बरोबर आहेत'
    ],
    optionsEn: [
      'Only (a) and (b)',
      'Only (a) and (c)',
      'Only (b) and (c)',
      'All statements are correct'
    ],
    correctAnswerIndex: 1,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर १५०+ शब्द स्पष्टीकरण:\n\n१. **माध्यमातील ध्वनीचा वेग:** ध्वनी लहरी या लवचिक माध्यमातील कणांच्या कंपनामुळे पुढे सरकतात. माध्यमाची प्रत्यास्थता (Elasticity) आणि घनता (Density) यावर वेग अवलंबून असतो. माध्यमांमधील वेगाचा उतरता क्रम असा आहे:\n**स्थायू (Solid) > द्रव (Liquid) > वायू (Gas)**.\nउदाहरणार्थ, ॲल्युमिनियममध्ये ध्वनीचा वेग ~६४२० मी/से, लोखंडामध्ये ~५९५० मी/से, पाण्यात ~१५०० मी/से, तर हवेत (०°C ला) केवळ ३३२ मी/से असतो. त्यामुळे विधान (ब) पूर्णपणे चुकीचे आहे (वायूमध्ये सर्वात कमी व स्थायूमध्ये सर्वाधिक असतो).\n\n२. **निर्वातात ध्वनी वहन:** ध्वनी ही यांत्रिक लहरी असल्याने कणांशिवाय वहन होऊ शकत नाही. त्यामुळे चंद्रावर किंवा निर्वातात दोन व्यक्ती एकमेकांचे बोलणे ऐकू शकत नाहीत. विधान (अ) सत्य आहे.\n\n३. **तापमानाचा प्रभाव:** वायूचे तापमान वाढल्यास हवेतील रेणूंची गतिज ऊर्जा वाढते. हवेच्या तापमानात प्रति १°C वाढीसह ध्वनीचा वेग ०.६१ मी/से ने वाढतो (v_t = v_0 + 0.61 t). त्यामुळे विधान (क) देखील योग्य आहे.\n\n४. **आयोगाचा संदर्भ:** NCERT इयत्ता ९ वी विज्ञान (ध्वनी) व स्टेट बोर्ड इयत्ता ९ वी.',
    explanationEn: 'Comprehensive 150-word analysis based on Dr. Vaibhav Shinde Sir\'s lecture:\n\n1. **Acoustic Wave Hierarchy across States of Matter:** Sound is transmitted via elastic mechanical collisions between atoms/molecules. The velocity of sound v = √(E/ρ), being dominated by modulus of elasticity. Hence, velocity adheres strictly to:\n**Solids > Liquids > Gases**.\nFor instance, sound travels at ~6420 m/s in aluminium and ~5950 m/s in steel, compared to ~1498 m/s in distilled water and merely ~332 m/s in dry air at 0°C. Statement (b) asserts the inverse order, rendering it factually erroneous.\n\n2. **Propagation through Vacuum:** Unlike electromagnetic radiation, sound requires an oscillating material continuum (compression and rarefaction). In a complete vacuum, acoustic propagation is physically impossible (v = 0). Statement (a) is wholly accurate.\n\n3. **Thermal Temperature Coefficient:** The speed of sound in ideal gases scales with the square root of absolute temperature. In atmospheric air, each 1°C thermal rise accelerates velocity by precisely 0.61 m/s. Statement (c) is scientifically sound.\n\n4. **Official Reference:** NCERT Class 9 Physics Chapter 12 (Sound) & Maharashtra State Board Std 9.',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 9 Physics - Sound',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'series_sci_q06',
    subjectId: 'general_science',
    topic: 'रसायनशास्त्र (Chemistry)',
    subtopic: 'आम्ल, आम्लारी व दर्शक: लिटमस, मिथिल ऑरेंज व फिनॉल्फथॅलीन',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: 'आम्ल-आम्लारी दर्शक (Acid-Base Indicators) आणि त्यांच्या रंगबदलांविषयी खालील विधाने विचारात घ्या:\n(अ) निळा लिटमस कागद आम्लधर्मी द्रावणात बुडवला असता तो लाल होतो, तर आम्लारीधर्मी द्रावणात लाल लिटमस निळा होतो.\n(ब) फिनॉल्फथॅलीन (Phenolphthalein) हे दर्शक आम्लधर्मी द्रावणात गुलाबी रंग देते, तर आम्लारीधर्मी द्रावणात रंगहीन राहते.\n(क) मिथिल ऑरेंज (Methyl Orange) हे दर्शक आम्लामध्ये लालसर-गुलाबी रंग दाखवते, तर आम्लारीमध्ये पिवळा रंग दर्शवते.\n(ड) लवंग तेल आणि व्हॅनिला अर्क हे "वासदर्शक" (Olfactory Indicators) म्हणून वापरले जातात.\nवरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionEn: 'Consider the following statements regarding chemical acid-base indicators and their observed color transformations:\n(a) Blue litmus paper turns red in acidic solutions, whereas red litmus paper turns blue in basic/alkaline solutions.\n(b) Synthetic phenolphthalein indicator imparts an intense pink tint in acidic solutions while remaining completely colorless in basic solutions.\n(c) Methyl orange demonstrates a reddish-pink hue in acidic conditions and adopts a bright yellow color in alkaline conditions.\n(d) Clove oil and vanilla extract function as classic "olfactory indicators".\nWhich of the above statements are correct?',
    optionsMr: [
      'फक्त (अ), (ब) आणि (ड)',
      'फक्त (अ), (क) आणि (ड)',
      'फक्त (ब), (क) आणि (ड)',
      'सर्व विधाने (अ, ब, क आणि ड) सत्य आहेत'
    ],
    optionsEn: [
      'Only (a), (b) and (d)',
      'Only (a), (c) and (d)',
      'Only (b), (c) and (d)',
      'All statements (a, b, c and d) are correct'
    ],
    correctAnswerIndex: 1,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर १५०+ शब्द स्पष्टीकरण:\n\n१. **फिनॉल्फथॅलीन (Phenolphthalein) मधील आयोगाचा ट्रॅप:** फिनॉल्फथॅलीन हे आम्लधर्मी द्रावणात (Acid) आणि उदासीन द्रावणात **रंगहीन (Colorless)** असते, तर आम्लारीधर्मी द्रावणात (Base) त्याचा रंग **गुलाबी (Deep Pink)** होतो. विधान (ब) मध्ये नेमके उलट विधान दिले आहे, त्यामुळे विधान (ब) चूक आहे.\n\n२. **लिटमस (Litmus):** लायकेन (दगडफूल) या वनस्पतीपासून बनवला जातो. आम्लामध्ये निळा लिटमस लाल (अनिला: आम्ल निळ्याचे लाल करते) आणि आम्लारीमध्ये लाल लिटमस निळा होतो. विधान (अ) सत्य आहे.\n\n३. **मिथिल ऑरेंज (Methyl Orange):** हे कृत्रिम दर्शक आम्लामध्ये लाल/गुलाबी रंग आणि आम्लारीमध्ये पिवळा रंग देते (pH ३.१ ते ४.४ दरम्यान रंगबदल). विधान (क) योग्य आहे.\n\n४. **वासदर्शक (Olfactory Indicators):** ज्या पदार्थांचा वास आम्ल किंवा आम्लारीच्या संपर्कात आल्यावर बदलतो किंवा नाहीसा होतो, त्यांना वासदर्शक म्हणतात. कांदा, व्हॅनिला व लवंग तेल आम्लारीमध्ये आपला विशिष्ट वास गमावतात. विधान (ड) सत्य आहे.\n\n५. **आयोगाचा संदर्भ:** NCERT इयत्ता १० वी रसायनशास्त्र (आम्ल, आम्लारी व क्षार) व स्टेट बोर्ड इयत्ता १० वी.',
    explanationEn: 'Comprehensive 150-word analysis based on Dr. Vaibhav Shinde Sir\'s lecture:\n\n1. **Phenolphthalein Indicator Trap:** Phenolphthalein acts as a weak synthetic organic acid. In neutral and acidic environments (pH < 8.3), it persists in an un-ionized, perfectly **colorless** state. When introduced into alkaline media (pH > 10), it ionizes into a quinoid chromophore, rendering the solution vibrant **pink**. Statement (b) asserts the precise inverse and is unmistakably incorrect.\n\n2. **Litmus Extraction:** Derived from symbiotic lichens (Roccella tinctoria), litmus turns red in acid (pH < 4.5) and restores deep blue in alkaline conditions (pH > 8.3). Statement (a) is true.\n\n3. **Methyl Orange Behavior:** Demonstrates sharp transition kinetics: red in acidic solutions below pH 3.1, transitioning through orange to yellow above pH 4.4 in base. Statement (c) is valid.\n\n4. **Olfactory Indicator Properties:** Substances whose olfactory signatures alter when exposed to differing hydrogen ion concentrations. Vanilla essence, diced onions, and clove oil extinguish their aroma in basic solutions like NaOH. Statement (d) is accurate.\n\n5. **Official Reference:** NCERT Class 10 Chemistry Chapter 2 (Acids, Bases and Salts).',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 10 Chemistry - Acids, Bases and Salts',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'series_sci_q07',
    subjectId: 'general_science',
    topic: 'वनस्पतीशास्त्र (Botany)',
    subtopic: 'प्रकाशसंश्लेषण: प्रकाश व अप्रकाश अभिक्रिया (Light & Dark Reactions)',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: 'वनस्पतींमधील प्रकाशसंश्लेषण (Photosynthesis) प्रक्रियेविषयी खालील विधाने अभ्यासा:\n(अ) प्रकाश अभिक्रिया (Light Reaction) हरितलवकाच्या ग्रॅना (Grana/Thylakoids) मध्ये घडून येते, ज्यामध्ये पाण्याचे प्रकाश-अपघटन (Photolysis) होऊन ऑक्सिजन वायू मुक्त होतो.\n(ब) अप्रकाश अभिक्रिया (Dark Reaction / Calvin Cycle) हरितलवकाच्या स्ट्रोमा (Stroma) मध्ये घडते, ज्यासाठी थेट सूर्यप्रकाशाची गरज नसते परंतु प्रकाश अभिक्रियेत निर्माण झालेले ATP आणि NADPH₂ वापरले जातात.\n(क) रुबिस्को (RuBisCO) हे जगातील सर्वात मुबलक प्रमाणात आढळणारे एंझाइम असून ते कार्बन डायऑक्साईडचे स्थिरीकरण करण्यात प्रमुख भूमिका बजावते.\nवरीलपैकी कोणती विधाने सत्य आहेत?',
    questionEn: 'Analyze the following scientific statements regarding plant photosynthesis:\n(a) The photochemical light reaction occurs within the chloroplast grana/thylakoids, wherein the photolysis of water releases oxygen gas.\n(b) The biosynthetic dark reaction (Calvin Cycle) transpires within the chloroplast stroma, operating independently of direct illumination while consuming ATP and NADPH₂ generated during the light phase.\n(c) RuBisCO represents the most abundant protein/enzyme on Earth and serves as the catalytic mediator for initial carbon dioxide fixation.\nWhich of the above statements are true?',
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
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर १५०+ शब्द स्पष्टीकरण:\n\n१. **प्रकाशसंश्लेषण रासायनिक समीकरण:** 6CO₂ + 12H₂O + सूर्यप्रकाश + हरितद्रव्य → C₆H₁₂O₆ + 6O₂ + 6H₂O. या प्रक्रियेत बाहेर पडणारा प्राणवायू (O₂) हा कार्बन डायऑक्साईडपासून नव्हे, तर पाण्याच्या प्रकाश-अपघटनामुळे (Photolysis of Water) तयार होतो हे रॉबर्ट हिल यांनी सिद्ध केले.\n\n२. **प्रकाश अभिक्रिया (Light Reaction):** हरितलवकातील थायलाकॉईड्स किंवा ग्रॅनामध्ये क्लोरोफिल सूर्यप्रकाशाचे फोटॉन्स शोषून घेतात. येथे फोटोफॉस्फोरिलेशन घडून ATP आणि NADPH₂ हे ऊर्जासंपन्न रेणू तयार होतात. विधान (अ) सत्य आहे.\n\n३. **अप्रकाश अभिक्रिया (Dark Reaction/Calvin Cycle):** स्ट्रोमा (Stroma) या द्रवभागात मेल्विन केल्विन यांनी शोधलेली चक्रीय प्रक्रिया चालते. यात थेट प्रकाश लागत नसला तरी प्रकाशात तयार झालेले ATP व NADPH वापरून CO₂ चे रूपांतर ग्लुकोजमध्ये केले जाते. विधान (ब) सत्य आहे.\n\n४. **रुबिस्को (RuBisCO):** Ribulose-1,5-bisphosphate carboxylase-oxygenase हे पृथ्वीवरील सर्वात विपुल प्रथिन आहे. त्यामुळे सर्व विधाने सत्य आहेत.\n\n५. **आयोगाचा संदर्भ:** NCERT इयत्ता ११ वी वनस्पतीशास्त्र (Photosynthesis in Higher Plants).',
    explanationEn: 'Comprehensive 150-word analysis based on Dr. Vaibhav Shinde Sir\'s lecture:\n\n1. **Photosynthetic Photochemistry:** Photosynthesis converts radiant solar energy into stable biochemical energy: 6CO₂ + 12H₂O → C₆H₁₂O₆ + 6O₂ + 6H₂O. Robin Hill demonstrated that liberated molecular oxygen originates strictly from water photolysis rather than carbon dioxide decomposition. Statement (a) is thoroughly accurate.\n\n2. **Light-Dependent Phase:** Thylakoid membranes within grana organize Photosystems I and II. Driven by photon capture, non-cyclic and cyclic electron transport chains yield chemical assimilatory power in the form of ATP and reduced coenzyme NADPH₂.\n\n3. **Light-Independent Phase (Calvin Cycle):** Housed in the aqueous chloroplast stroma, this phase does not require direct photons but depends strictly on daylight-generated ATP/NADPH to reduce CO₂ into triose phosphates and ultimately hexose sugars. Statement (b) is sound.\n\n4. **Significance of RuBisCO:** Ribulose-1,5-bisphosphate carboxylase-oxygenase constitutes up to 50% of soluble leaf protein and is universally acknowledged as Earth\'s most abundant enzyme. Hence, all statements are correct.\n\n5. **Official Reference:** NCERT Class 11 Biology Chapter 13 (Photosynthesis in Higher Plants).',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 11 Biology - Photosynthesis',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'series_sci_q08',
    subjectId: 'general_science',
    topic: 'आरोग्यशास्त्र व सूक्ष्मजीवशास्त्र (Microbiology)',
    subtopic: 'मानवी संसर्गजन्य रोग: जीवाणूजन्य, विषाणूजन्य व आदिजीवजन्य रोग',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: 'खालील रोग आणि त्यांच्या कारणीभूत सूक्ष्मजीवांच्या प्रकारांचा विचार करा:\n१. विषमज्वर (Typhoid) - जीवाणू (Salmonella typhi)\n२. मलेरिया (हिवताप) - आदिजीव (Plasmodium vivax)\n३. क्षयरोग (Tuberculosis) - विषाणू (Mycobacterium)\n४. पोलिओ (Poliomyelitis) - विषाणू (Enterovirus/Poliovirus)\nवरीलपैकी कोणती जोडी चुकीची (अयोग्य) आहे?',
    questionEn: 'Examine the following human infectious diseases and their respective causative pathogens:\n1. Typhoid - Bacterium (Salmonella typhi)\n2. Malaria - Protozoan (Plasmodium vivax)\n3. Tuberculosis (TB) - Virus (Mycobacterium)\n4. Polio - Virus (Enterovirus/Poliovirus)\nWhich of the above pairs is incorrectly matched?',
    optionsMr: [
      'फक्त जोडी १',
      'फक्त जोडी २',
      'फक्त जोडी ३',
      'फक्त जोडी ४'
    ],
    optionsEn: [
      'Only Pair 1',
      'Only Pair 2',
      'Only Pair 3',
      'Only Pair 4'
    ],
    correctAnswerIndex: 2,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर १५०+ शब्द स्पष्टीकरण:\n\n१. **क्षयरोग (Tuberculosis) मधील चूक:** क्षयरोग (टीबी) हा विषाणूजन्य नसून **जीवाणूजन्य (Bacterial Disease)** आहे! त्याचा कारक सूक्ष्मजीव **मायकोबॅक्टेरियम ट्युबरक्युलॉसिस (Mycobacterium tuberculosis)** हा जीवाणू आहे. याच्या निदानासाठी मँटॉक्स चाचणी (Mantoux Test) केली जाते आणि उपचारासाठी DOTS (Directly Observed Treatment, Short-course) प्रणाली राबवली जाते. नवजात बालकांना यासाठी BCG लस टोचली जाते. त्यामुळे जोडी ३ चुकीची आहे.\n\n२. **टायफॉईड (विषमज्वर):** साल्मोनेला टायफी या जीवाणूमुळे अस्वच्छ अन्न-पाण्याद्वारे होतो. यासाठी विडाल चाचणी (Widal Test) केली जाते. जोडी १ बरोबर आहे.\n\n३. **मलेरिया:** प्लाझमोडियम या आदिजीवामुळे (Protozoa) होतो; ज्याचा प्रसार मादी ॲनॉफिलीस डासाच्या दंशाने होतो. जोडी २ बरोबर आहे.\n\n४. **पोलिओ:** पोलिओव्हायरसमुळे मज्जासंस्थेवर आघात होऊन अर्धांगवायू होतो. जोडी ४ बरोबर आहे.\n\n५. **आयोगाचा संदर्भ:** स्टेट बोर्ड इयत्ता ८ वी व ९ वी विज्ञान आणि NCERT इयत्ता १२ वी मानवी आरोग्य व रोग.',
    explanationEn: 'Comprehensive 150-word analysis based on Dr. Vaibhav Shinde Sir\'s lecture:\n\n1. **Tuberculosis Pathogen Identification:** Tuberculosis is strictly a bacterial infection, NOT viral. It is induced by the acid-fast bacillus **Mycobacterium tuberculosis**, primarily infiltrating pulmonary tissues. Diagnostic affirmation employs sputum smear microscopy, Mantoux tuberculin skin testing, and GeneXpert assays. Curative protocol relies on DOTS therapy, and immunization is delivered via the BCG (Bacillus Calmette-Guérin) vaccine. Pair 3 falsely classifies it as a viral disease and is incorrect.\n\n2. **Typhoid Verification:** Induced by the rod-shaped Gram-negative bacterium Salmonella typhi, transmitted via contaminated water and feco-oral routes; identified via the Widal agglutination test. Pair 1 is correct.\n\n3. **Malaria Aetiology:** Triggered by protozoan parasites of genus Plasmodium (P. vivax, P. falciparum), vectored by female Anopheles mosquitoes. Pair 2 is valid.\n\n4. **Poliomyelitis:** Caused by single-stranded RNA poliovirus belonging to Picornaviridae family, attacking motor neurons in spinal cord anterior horn. Pair 4 is correct.\n\n5. **Official Reference:** NCERT Class 12 Biology Chapter 8 (Human Health and Disease).',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 12 Biology - Human Health and Disease',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'series_sci_q09',
    subjectId: 'general_science',
    topic: 'वनस्पतीशास्त्र (Botany)',
    subtopic: 'पादप संप्रेरके: ऑक्झिन, जिबरेलीन, सायटोकायनीन व इथिलीन',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: 'वनस्पती संप्रेरके (Phytohormones) आणि त्यांच्या जैविक कार्यांची तुलना करा:\n(अ) ऑक्झिन (Auxin) हे खोडाच्या व मुळांच्या अग्रभागातील पेशी लांबट करणे (Cell Elongation) आणि प्रकाशाच्या दिशेने झुकणे (Phototropism) यासाठी जबाबदार असते.\n(ब) जिबरेलीन (Gibberellin) हे बुटक्या वनस्पतींची उंची वाढवणे आणि बीजांची सुप्तावस्था (Dormancy) मोडणे यासाठी उपयोगी ठरते.\n(क) इथिलीन (Ethylene) हे एकमेव वायू रूपातील (Gaseous) पादप संप्रेरक असून ते फळे पिकवण्यास (Fruit Ripening) उत्तेजन देते.\n(ड) ॲबसिसिक ॲसिड (Abscisic Acid - ABA) हे वनस्पतींच्या वाढीस चालना देणारे (Growth Promoter) संप्रेरक आहे.\nवरीलपैकी कोणती विधाने बरोबर आहेत?',
    questionEn: 'Compare plant growth regulators (Phytohormones) with their biological functionalities:\n(a) Auxin promotes cellular elongation at apical shoot and root tips, facilitating phototropism.\n(b) Gibberellins stimulate stem elongation in dwarf cultivars and effectively break seed dormancy.\n(c) Ethylene represents the only gaseous plant hormone and functions as a primary driver of natural fruit ripening.\n(d) Abscisic Acid (ABA) operates fundamentally as an active plant growth promoter.\nWhich of the above statements are correct?',
    optionsMr: [
      'फक्त (अ), (ब) आणि (क)',
      'फक्त (ब), (क) आणि (ड)',
      'फक्त (अ), (क) आणि (ड)',
      'सर्व विधाने (अ, ब, क आणि ड) सत्य आहेत'
    ],
    optionsEn: [
      'Only (a), (b) and (c)',
      'Only (b), (c) and (d)',
      'Only (a), (c) and (d)',
      'All statements (a, b, c and d) are correct'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर १५०+ शब्द स्पष्टीकरण:\n\n१. **ॲबसिसिक ॲसिड (ABA) चे कार्य:** पादप संप्रेरकांचे दोन वर्ग पडतात: (१) वृद्धी प्रेरक (Promoters: Auxin, Gibberellin, Cytokinin) आणि (२) वृद्धी रोधक (Inhibitors: Abscisic acid, Ethylene). ॲबसिसिक ॲसिड हे **वाढ रोधक (Growth Inhibitor)** आणि ताण संप्रेरक (Stress Hormone) आहे. ते पानांची गळती घडवून आणते आणि दुष्काळात पर्णरंध्रे (Stomata) बंद करते. विधान (ड) मध्ये त्याला वाढीस चालना देणारे म्हटले आहे, जे पूर्णतः चुकीचे आहे.\n\n२. **ऑक्झिन (Auxin):** डार्विन आणि व्हेंट यांनी अभ्यासले. अग्रभागातील कलिकांची वाढ आणि सूर्यप्रकाशाच्या विरुद्ध दिशेने साठून खोडाला प्रकाशाकडे वळवणे (Phototropism) हे याचे मुख्य कार्य आहे. विधान (अ) सत्य आहे.\n\n३. **जिबरेलीन (Gibberellin):** कुरोसावा यांनी भाताच्या "बाकाने" रोगावरून शोधले. गाठ्यांमधील अंतर (Internodal length) वाढवणे व बीजांकुरण घडवणे हे याचे कार्य आहे. विधान (ब) सत्य आहे.\n\n४. **इथिलीन (C₂H₄):** फळे पिकवणारे नैसर्गिक वायुरूप संप्रेरक आहे. त्यामुळे (अ), (ब) आणि (क) सत्य आहेत.\n\n५. **आयोगाचा संदर्भ:** NCERT इयत्ता ११ वी वनस्पतीशास्त्र (Plant Growth and Development).',
    explanationEn: 'Comprehensive 150-word analysis based on Dr. Vaibhav Shinde Sir\'s lecture:\n\n1. **Phytohormone Classification & ABA Role:** Phytohormones bifurcate into growth promoters (Auxins, Gibberellins, Cytokinins) and growth inhibitors (Abscisic Acid, Ethylene). Abscisic Acid (ABA) is universally categorized as a **growth inhibitor and master "Stress Hormone"**. It drives stomatal closure during transpiration stress, enforces seed dormancy, and promotes leaf abscission. Statement (d) wrongly titles ABA a growth promoter, making it definitively incorrect.\n\n2. **Auxin Phototropism:** Synthesized at shoot apices, indole-3-acetic acid (IAA) migrates toward shaded sides, inducing cellular elongation that curves stems toward incident light. Statement (a) is correct.\n\n3. **Gibberellic Acid Action:** Discovered via the "bakanae" fungal infection in rice crops, gibberellins stimulate sub-apical meristems, bolting in rosette plants, and mobilize alpha-amylase to terminate seed dormancy. Statement (b) is true.\n\n4. **Ethylene as Gaseous Agent:** Ethylene (C₂H₄) is the singular naturally occurring volatile hydrocarbon regulating climacteric fruit ripening and senescence. Thus, statements (a), (b), and (c) are totally correct.\n\n5. **Official Reference:** NCERT Class 11 Biology Chapter 15 (Plant Growth and Development).',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 11 Biology - Plant Growth and Development',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'series_sci_q10',
    subjectId: 'general_science',
    topic: 'जीवशास्त्र (Biology)',
    subtopic: 'मानवी रक्ताभिसरण संस्था: हृदय, झडपा व पेसमेकर (SAN)',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: 'मानवी रक्ताभिसरण संस्था (Circulatory System) आणि हृदयाच्या संरचनेविषयी विधाने तपासा:\n(अ) मानवी हृदय चार कप्प्यांचे बनलेले असून उजव्या अलिंदामध्ये (Right Atrium) अशुद्ध (डी-ऑक्सिजनेटेड) रक्त जमा होते, तर डाव्या निलयातून (Left Ventricle) शुद्ध रक्त महाधमनीद्वारे संपूर्ण शरीरास पुरवले जाते.\n(ब) नैसर्गिक पेसमेकर म्हणून ओळखली जाणारी साइनो-ॲट्रिअल गाठ (SA Node) ही उजव्या अलिंदाच्या वरच्या उजव्या कोपऱ्यात स्थित असते.\n(क) डावे अलिंद आणि डावे निलय यांच्या दरम्यान "द्विदली झडप" (Bicuspid / Mitral Valve) असते, तर उजवे अलिंद आणि उजवे निलय यांच्या दरम्यान "त्रिदली झडप" (Tricuspid Valve) असते.\nवरीलपैकी कोणती विधाने अचूक आहेत?',
    questionEn: 'Evaluate the following architectural facts regarding the human cardiovascular system and cardiac anatomy:\n(a) The human heart contains four chambers, wherein deoxygenated blood pools into the right atrium while the left ventricle propels oxygenated blood into systemic circulation via the systemic aorta.\n(b) The Sino-Atrial Node (SAN), recognized as the physiological natural cardiac pacemaker, is stationed in the upper right wall of the right atrium.\n(c) The Bicuspid (Mitral) valve guards the left atrioventricular orifice, whereas the Tricuspid valve regulates the right atrioventricular orifice.\nWhich of the above statements are accurate?',
    optionsMr: [
      'फक्त (अ) आणि (ब)',
      'फक्त (ब) आणि (क)',
      'फक्त (अ) आणि (क)',
      'सर्व विधाने (अ, ब आणि क) अचूक आहेत'
    ],
    optionsEn: [
      'Only (a) and (b)',
      'Only (b) and (c)',
      'Only (a) and (c)',
      'All statements (a, b and c) are accurate'
    ],
    correctAnswerIndex: 3,
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर १५०+ शब्द स्पष्टीकरण:\n\n१. **हृदयाची रचना व कप्पे:** मानवी हृदय हे दोन अलिंद (Atria) आणि दोन निलय (Ventricles) अशा चार कप्प्यांचे असते. शरीरातील विविध अवयवांमधून ऊर्ध्व व अधो महाशिर (Vena Cava) द्वारे ऑक्सिजनविरहित अशुद्ध रक्त उजव्या अलिंदात येते. फुप्फुसातून शुद्ध रक्त फुप्फुस शिरांद्वारे डाव्या अलिंदात आणि तेथून डाव्या निलयात जाते. डाव्या निलयाची भिंत सर्वात जाड असते, कारण तिला महाधमनी (Aorta) द्वारे संपूर्ण शरीराला उच्च दाबाने रक्त पुरवायचे असते. विधान (अ) सत्य आहे.\n\n२. **पेसमेकर (SA Node):** उजव्या अलिंदात स्थित असणारा Sinoatrial Node दर मिनिटाला सुमारे ७० ते ७२ वेळा विद्युत आवेग निर्माण करतो, ज्यामुळे हृदयाचे ठोके सुरू होतात. म्हणून याला नैसर्गिक पेसमेकर म्हणतात. विधान (ब) सत्य आहे.\n\n३. **हृदयातील झडपा (Valves):** रक्त मागे वाहू नये म्हणून उजव्या बाजूला Tricuspid (त्रिदली) आणि डाव्या बाजूला Bicuspid / Mitral (द्विदली) झडप असते. विधान (क) योग्य आहे.\n\n४. **आयोगाचा संदर्भ:** NCERT इयत्ता ११ वी जीवशास्त्र (Body Fluids and Circulation) व स्टेट बोर्ड इयत्ता १२ वी.',
    explanationEn: 'Comprehensive 150-word analysis based on Dr. Vaibhav Shinde Sir\'s lecture:\n\n1. **Cardiovascular Chamber Mechanics:** The human heart features 4 discrete muscular chambers: 2 superior receiving atria and 2 inferior pumping ventricles. Superior and inferior vena cava channel deoxygenated systemic venous return into the right atrium. Conversely, pulmonary veins convey oxygenated blood into the left atrium, which empties into the left ventricle—the thickest, most muscular chamber—driving stroke volume across the systemic aorta. Statement (a) is anatomically pristine.\n\n2. **Sino-Atrial Node (SAN) Functionality:** Stationed in the superolateral wall of the right atrium adjacent to the superior vena caval entrance, the SA node rhythmically auto-depolarizes at ~72 pulses per minute, establishing cardiac rhythm. Hence, it constitutes the heart\'s primary pacemaker. Statement (b) is correct.\n\n3. **Atrioventricular Valvular Anatomy:** The tricuspid valve segregates the right atrium from the right ventricle, while the bicuspid (mitral) valve guards the left atrioventricular junction, preventing regurgitant backflow during ventricular systole. Statement (c) is sound. All statements are correct.\n\n4. **Official Reference:** NCERT Class 11 Biology Chapter 18 (Body Fluids and Circulation).',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 11 Biology - Body Fluids and Circulation',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'series_sci_q11',
    subjectId: 'general_science',
    topic: 'भौतिकशास्त्र (Physics)',
    subtopic: 'यांत्रिकी: न्यूटनचे गतीचे नियम व संवेग अक्षय्यता (Laws of Motion)',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: 'न्यूटनचे गतिविषयक नियम आणि संवेग (Momentum) यांच्या संदर्भातील विधाने तपासा:\n(अ) न्यूटनचा पहिला नियम "जडत्वाचा नियम" (Law of Inertia) म्हणून ओळखला जातो, जो बलाची गुणात्मक व्याख्या (Qualitative definition of force) देतो.\n(ब) न्यूटनचा दुसरा नियम संवेगाच्या परिवर्तनाचा दर प्रयुक्त बलाशी समप्रमाणात असतो हे सांगतो, ज्यातून F = ma हे संख्यात्मक सूत्र मिळते.\n(क) न्यूटनचा तिसरा नियम सांगतो की "प्रत्येक क्रियेला समान व उलट प्रतिक्रिया असते"; बंदुकीतून गोळी सुटल्यावर बंदूक मागे सरकणे हे संवेग अक्षय्यता आणि तिसऱ्या नियमाचे उदाहरण आहे.\nवरीलपैकी कोणती विधाने सत्य आहेत?',
    questionEn: 'Examine statements pertaining to Newton\'s Laws of Motion and momentum conservation:\n(a) Newton\'s First Law is termed the "Law of Inertia," formulating the qualitative definition of force.\n(b) Newton\'s Second Law dictates that the time rate of change of momentum is directly proportional to applied force, yielding F = ma.\n(c) Newton\'s Third Law establishes that "to every action there is always an equal and opposite reaction"; recoil of a firearm upon bullet ejection exemplifies this principle.\nWhich of the above statements are true?',
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
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर १५०+ शब्द स्पष्टीकरण:\n\n१. **न्यूटनचा १ ला नियम (जडत्व):** बाह्य असंतुलित बल कार्य करत नसेल, तर स्थिर वस्तू स्थिर राहते आणि गतिमान वस्तू सरळ रेषेत एकाच गतीने पुढे जात राहते. हा नियम जडत्व स्पष्ट करतो आणि बलाची व्याख्या देतो. विधान (अ) सत्य आहे.\n\n२. **न्यूटनचा २ रा नियम (F = ma):** संवेग (p = mv) परिवर्तनाचा दर हा प्रयुक्त असंतुलित बलाशी समप्रमाणात असतो (F ∝ dp/dt). जेव्हा वस्तुमान (m) स्थिर असते, तेव्हा F = m(dv/dt) = ma (बल = वस्तुमान × त्वरण). हा नियम बलाचे संख्यात्मक परिमाण मोजतो. विधान (ब) सत्य आहे.\n\n३. **न्यूटनचा ३ रा नियम व संवेग संवर्धन:** जेव्हा एक वस्तू दुसऱ्या वस्तूवर बल लावते, तेव्हा दुसरी वस्तूही पहिल्या वस्तूवर तितकेच परंतु विरुद्ध दिशेने बल लावते (F₁₂ = -F₂₁). बंदुकीतून गोळी पुढे जाताना बंदूक पाठीमागे ढकलली जाते (Recoil of Gun), रॉकेटचे उड्डाण हे न्यूटनच्या तिसऱ्या नियमाची आणि संवेग अक्षय्यतेची (Law of Conservation of Linear Momentum) उदाहरणे आहेत. विधान (क) योग्य आहे.\n\n४. **आयोगाचा संदर्भ:** NCERT इयत्ता ९ वी व ११ वी भौतिकशास्त्र (Laws of Motion) व स्टेट बोर्ड.',
    explanationEn: 'Comprehensive 150-word analysis based on Dr. Vaibhav Shinde Sir\'s lecture:\n\n1. **First Law Analysis (Inertia):** Formulated by Sir Isaac Newton, the first law dictates that an object perseveres in its state of rest or uniform rectilinear motion unless compelled by external unbalanced force. It provides the qualitative conceptualization of force and mechanical inertia. Statement (a) is valid.\n2. **Second Law Derivation:** Momentum is given by p = mv. The second law formalizes that the net applied external force equals the instantaneous rate of change of linear momentum: F = dp/dt = d(mv)/dt. For constant invariant mass, F = m(dv/dt) = ma. This grants the quantitative measurement of mechanical force in Newtons (kg·m/s²). Statement (b) is accurate.\n3. **Third Law & Firearm Recoil Dynamics:** Action and reaction forces act simultaneously on mutually interacting distinct bodies with equal magnitude in collinear opposite directions (F_AB = -F_BA). Because no net external force acts on the bullet-gun composite system, initial momentum (zero) equals final momentum: m_bullet · v_bullet + M_gun · V_recoil = 0, giving V_recoil = -(m·v)/M. Statement (c) is sound. All are true.\n4. **Official Reference:** NCERT Class 9 Physics Chapter 9 & Class 11 Chapter 5.',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 9 Physics - Laws of Motion',
    yearTag: 'Science MCQ EP-14'
  },
  {
    id: 'series_sci_q12',
    subjectId: 'general_science',
    topic: 'पर्यावरण व जैवविज्ञान (Ecology)',
    subtopic: 'अन्नसाखळी, ऊर्जा मनोरा व जैविक संचयन (Biomagnification)',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: 'परिसंस्थेतील ऊर्जा प्रवाह आणि अन्नसाखळीतील घटकांविषयी खालील विधानांचा विचार करा:\n(अ) परिसंस्थेतील ऊर्जेचा प्रवाह हा नेहमी "एकेरी" (Unidirectional) असतो आणि लिंडेमन यांच्या १०% नियमानुसार (Lindeman\'s 10% Law) एका पोषण पातळीकडून दुसऱ्या पातळीकडे जाताना केवळ १०% ऊर्जा पुढील पातळीत हस्तांतरित होते.\n(ब) परिसंस्थेतील ऊर्जेचा मनोरा (Pyramid of Energy) हा नेहमी "सरळ" (Always Upright) असतो, तो कधीही उलटा (Inverted) असू शकत नाही.\n(क) डीडीटी (DDT) सारखी अविघटनशील कीटकनाशके अन्नसाखळीत शिरल्यास प्रत्येक पोषण पातळीवर त्यांचे प्रमाण वाढत जाते, या प्रक्रियेला "जैविक संचयन" किंवा "बायोमॅग्निफिकेशन" (Biomagnification) म्हणतात.\nवरीलपैकी कोणती विधाने सत्य आहेत?',
    questionEn: 'Evaluate the following core ecological principles governing ecosystem energy flows and trophic webs:\n(a) Energy flux across trophic cascades is strictly unidirectional, wherein Lindeman\'s 10% Thermodynamic Efficiency Law dictates that merely ~10% of ingested energy is successfully assimilated into the next trophic tier.\n(b) An ecological Pyramid of Energy is perpetually upright across all terrestrial and aquatic biomes and can never be inverted.\n(c) The progressive escalation in chemical concentration of non-biodegradable persistent xenobiotics (like DDT) at successively higher trophic levels is known as "Biomagnification".\nWhich of the above statements are true?',
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
    explanationMr: 'डॉ. वैभव शिंदे सरांच्या विश्लेषणावर आधारित सविस्तर १५०+ शब्द स्पष्टीकरण:\n\n१. **ऊर्जेचा एकेरी प्रवाह व १०% नियम:** सूर्य हा परिसंस्थेतील ऊर्जेचा मुख्य स्रोत आहे. उत्पादक (वनस्पती) सौरऊर्जेचे रासायनिक ऊर्जेत रूपांतर करतात. Raymond Lindeman (१९४२) यांच्या नियमानुसार, एका पातळीतील फक्त १०% निव्वळ ऊर्जा पुढील पोषण पातळीतील जीवांच्या शरीरात संचित होते; उर्वरित ९०% ऊर्जा श्वसन, हालचाल व उष्णतेच्या स्वरूपात उत्सर्जित होते. विधान (अ) सत्य आहे.\n\n२. **ऊर्जेचा मनोरा (Pyramid of Energy):** संख्येचा मनोरा किंवा वस्तुमानाचा मनोरा (उदा. समुद्रातील फायटोप्लँक्टन ते मासे) काही वेळा उलटा (Inverted) असू शकतो, परंतु **ऊर्जेचा मनोरा नेहमी सरळ (Always Upright)** असतो, कारण उष्मागतिकीच्या (Thermodynamics) दुसऱ्या नियमानुसार ऊर्जा पातळी जशी वर जाईल तशी ऊर्जा घटतच जाते. विधान (ब) सत्य आहे.\n\n३. **बायोमॅग्निफिकेशन (Biomagnification):** डीडीटी, पारा (Mercury) यांसारखी रसायने मेदात विरघळतात आणि शरीराबाहेर पडत नाहीत. त्यामुळे पाण्यात ०.००३ ppb असणारे डीडीटी माशांमार्फत गरुड किंवा मासे खाणाऱ्या पक्षांमध्ये २५ ppm पर्यंत वाढते. विधान (क) योग्य आहे. सर्व विधाने सत्य आहेत.\n\n४. **आयोगाचा संदर्भ:** NCERT इयत्ता १२ वी पर्यावरणशास्त्र (Ecosystem).',
    explanationEn: 'Comprehensive 150-word analysis based on Dr. Vaibhav Shinde Sir\'s lecture:\n\n1. **Thermodynamic Unidirectionality & 10% Rule:** Primary photosynthetic producers capture radiant solar photons, packaging energy into complex biochemical bonds. Raymond Lindeman\'s 10% Law of Trophic Efficiency establishes that on average, only 10% of energy transferred to a given trophic level is retained as biomass available to the immediate upper trophic level. The residual 90% is dissipated as metabolic heat via respiration. Statement (a) is true.\n\n2. **Permanently Upright Energy Pyramid:** While pyramids of numbers (e.g., single oak tree host) or pyramids of biomass (e.g., marine inverted phytoplankton-zooplankton pyramids) can be inverted, the Pyramid of Energy is universally and unconditionally upright in accordance with the Second Law of Thermodynamics. Statement (b) is scientifically accurate.\n\n3. **Biomagnification Dynamics:** Persistent, lipophilic xenobiotics like DDT and methylmercury resist biological breakdown. Consequently, toxicant concentrations amplify geometrically across trophic steps—from 0.003 ppb in water, to 0.04 ppm in zooplankton, 2 ppm in fish, and reaching up to 25 ppm in apex fish-eating raptors, causing calcium metabolic failure and eggshell thinning. Statement (c) is valid. All are correct.\n\n4. **Official Reference:** NCERT Class 12 Biology Chapter 14 (Ecosystem).',
    reference: 'डॉ. वैभव शिंदे सर (ज्ञानदीप अकॅडमी) / NCERT Class 12 Biology - Ecosystem',
    yearTag: 'Science MCQ EP-14'
  }
];
