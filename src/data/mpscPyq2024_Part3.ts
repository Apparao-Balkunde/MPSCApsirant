import { Question } from '../types';

// MPSC Rajyaseva / Civil Services Combined Prelims Paper 1 (01 Dec 2024, Set A) - Q51 to Q75
export const MPSC_PYQ_2024_PART3: Question[] = [
  {
    id: 'pyq_2024_51',
    subjectId: 'general_science',
    topic: 'Physics - Mechanics',
    subtopic: 'Vertical Motion under Gravity',
    exam: 'Rajyaseva',
    difficulty: 'Moderate',
    questionMr: "वर फेकलेल्या कणाची गती शून्य असते परंतु त्याचे त्वरण किती असते?\n(1) शून्य\n(2) अनंत\n(3) गुरुत्वाकर्षणा एवढे त्वरण\n(4) एक",
    questionEn: "A particle thrown up has zero velocity but how much will be the acceleration ?\n(1) Zero\n(2) Infinity\n(3) Equal to acceleration due to gravity\n(4) One",
    optionsMr: ['शून्य', 'अनंत', 'गुरुत्वाकर्षणा एवढे त्वरण', 'एक'],
    optionsEn: ['Zero', 'Infinity', 'Equal to acceleration due to gravity', 'One'],
    correctAnswerIndex: 2, // Official Key: 3
    explanationMr: "जेव्हा एखादा कण/वस्तू सरळ वर फेकली जाते, तेव्हा सर्वोच्च बिंदूवर पोहोचल्यावर त्याचा तात्कालिक वेग (Velocity) शून्य होतो; परंतु पृथ्वीचे गुरुत्वीय त्वरण (Acceleration due to gravity: g = 9.8 m/s²) सतत खालच्या दिशेने कार्यरतच असते.",
    explanationEn: "At the peak of vertical projectile motion, instantaneous velocity becomes zero, but constant gravitational acceleration (g = 9.8 m/s² downward) still acts on the particle.",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.51) / स्टेट बोर्ड भौतिकशास्त्र इयत्ता ११ वी'
  },
  {
    id: 'pyq_2024_52',
    subjectId: 'general_science',
    topic: 'Physics - Fluid Dynamics',
    subtopic: 'Bernoulli Equation Applications',
    exam: 'Rajyaseva',
    difficulty: 'Moderate',
    questionMr: "खालीलपैकी कोठे बर्नोली समीकरणाचा उपयोग नाही?\n(1) एस्पिरेटर पंप\n(2) व्हॅन्च्युरी पंप\n(3) प्रवाहाची गती\n(4) वरीलपैकी कोणतेही नाही",
    questionEn: "Which one of the following is not an application of Bernoulli equation ?\n(1) Aspirator pump\n(2) Ventury pump\n(3) Speed of Efflux\n(4) None of the above",
    optionsMr: ['एस्पिरेटर पंप', 'व्हॅन्च्युरी पंप', 'प्रवाहाची गती', 'वरीलपैकी कोणतेही नाही'],
    optionsEn: ['Aspirator pump', 'Ventury pump', 'Speed of Efflux', 'None of the above'],
    correctAnswerIndex: 3, // Official Key: 4
    explanationMr: "बर्नोलीचे तत्त्व हे एस्पिरेटर पंप, व्हेंचुरीमीटर (व्हेंचुरी पंप), आणि टॉरिसेलीचा बहिर्गमन प्रवाहाचा वेग (Speed of Efflux) या तिन्हीमध्ये थेट लागू होते. त्यामुळे यापैकी 'वरीलपैकी कोणतेही नाही' (None of the above) हा पर्याय अचूक आहे.",
    explanationEn: "Bernoulli's principle governs aspirator pumps, Venturi meters, and Torricelli's speed of efflux. Hence, 'None of the above' is correct.",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.52) / एनसीईआरटी भौतिकशास्त्र'
  },
  {
    id: 'pyq_2024_53',
    subjectId: 'general_science',
    topic: 'Physics - Thermal Radiation',
    subtopic: "Wien's Displacement Law at 300K",
    exam: 'Rajyaseva',
    difficulty: 'Hard',
    questionMr: "खोलीतील तापमानावर (300 K) वस्तुद्वारे उत्सर्जित होणाऱ्या औष्णीय प्रारणासाठी महत्त्वपूर्ण योगदान तरंगलांबी किती असते?\n(1) 500 नॅनो मीटर\n(2) 9550 नॅनो मीटर\n(3) 1500 नॅनो मीटर\n(4) 3000 नॅनो मीटर",
    questionEn: "At room temperature (300k), what is the significant contribution wavelength for the thermal radiation emitted by a body ?\n(1) 500 nm\n(2) 9550 nm\n(3) 1500 nm\n(4) 3000 nm",
    optionsMr: ['500 नॅनो मीटर', '9550 नॅनो मीटर', '1500 नॅनो मीटर', '3000 नॅनो मीटर'],
    optionsEn: ['500 nm', '9550 nm', '1500 nm', '3000 nm'],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "व्हीनच्या विस्थापन नियमानुसार (Wien's Displacement Law: λ_max * T = b, जिथे b = 2.898 x 10^-3 m·K): खोलीच्या ३०० केल्विन तापमानावर λ_max = 2.898 x 10^-3 / 300 ≈ 9.66 x 10^-6 m = सुमारे ९,५५० ते ९,६६० nm (अवरक्त इन्फ्रारेड प्रारण) असते.",
    explanationEn: "By Wien's displacement law (λ_max = b/T), for T = 300 K, peak thermal radiation falls in the infrared region at approximately 9550 to 9660 nm.",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.53) / भौतिकशास्त्र स्टेट बोर्ड'
  },
  {
    id: 'pyq_2024_54',
    subjectId: 'general_science',
    topic: 'Chemistry - Atomic Structure',
    subtopic: 'Subatomic Particles',
    exam: 'Rajyaseva',
    difficulty: 'Easy',
    questionMr: "खालीलपैकी कोणते वाक्य चुकीचे आहे?\n(I) अणुकेंद्रक हे प्रोटॉन व न्युट्रॉनने बनलेले असते.\n(II) प्रोटॉनवर धनभार असतो.\n(III) इलेक्ट्रॉनवर ऋणभार असतो.\n(IV) न्युट्रॉनवर धनभार असतो.\nपर्यायी उत्तरे:\n(1) (III) व (II)\n(2) (II) व (I)\n(3) फक्त (I)\n(4) फक्त (IV)",
    questionEn: "Which of the following sentence is wrong ?\n(I) Atomic nucleus is made up of protons and neutrons.\n(II) Proton has a positive charge.\n(III) Electron has a negative charge.\n(IV) Neutron has a positive charge.\nAnswer options:\n(1) (III) and (II)\n(2) (II) and (I)\n(3) Only (I)\n(4) Only (IV)",
    optionsMr: ['(III) व (II)', '(II) व (I)', 'फक्त (I)', 'फक्त (IV)'],
    optionsEn: ['(III) and (II)', '(II) and (I)', 'Only (I)', 'Only (IV)'],
    correctAnswerIndex: 3, // Official Key: 4
    explanationMr: "विधान (IV) चुकीचे आहे. न्यूट्रॉन (Neutron) हा विद्युतदृष्ट्या प्रभाररहित (उदासीन / Neutral) कण असतो, त्याच्यावर कोणताही धनभार नसतो. प्रोटॉनवर धनभार (+) व इलेक्ट्रॉनवर ऋणभार (-) असतो.",
    explanationEn: "Statement (IV) is false because neutrons are electrically neutral with zero net charge. Protons carry positive and electrons carry negative charge.",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.54) / स्टेट बोर्ड सामान्य विज्ञान इयत्ता ८ वी व ९ वी'
  },
  {
    id: 'pyq_2024_55',
    subjectId: 'general_science',
    topic: 'Physics - Sound Waves',
    subtopic: 'Characteristics of Sound',
    exam: 'Rajyaseva',
    difficulty: 'Easy',
    questionMr: "खालील विधाने सत्य की असत्य ते लिहा.\n(I) आवाजाच्या प्रसारासाठी माध्यमाची गरज असते.\n(II) आवाजाच्या वारंवारतेचे हर्ट्झ हे एकक आहे.\n(III) आवाजाची तीव्रता मोजण्यासाठी डेसिबल हे एकक आहे.\nपर्यायी उत्तरे:\n(1) (I), (II), (III) बरोबर आहेत.\n(2) फक्त (I), (II) बरोबर आहेत.\n(3) फक्त (II) बरोबर आहे.\n(4) (I), (II), (III) चुकीचे आहेत.",
    questionEn: "Say whether following sentences are true or false :\n(I) For propagation of sound medium is necessary.\n(II) Unit of frequency of sound is Hertz.\n(III) Loudness of sound is expressed in decibel unit.\nAnswer options :\n(1) (I), (II), (III) are true\n(2) Only (I), (II) is true\n(3) Only (II) is true\n(4) (I), (II), (III) are false",
    optionsMr: ['(I), (II), (III) बरोबर आहेत.', 'फक्त (I), (II) बरोबर आहेत.', 'फक्त (II) बरोबर आहे.', '(I), (II), (III) चुकीचे आहेत.'],
    optionsEn: ['(I), (II), (III) are true', 'Only (I), (II) is true', 'Only (II) is true', '(I), (II), (III) are false'],
    correctAnswerIndex: 0, // Official Key: 1
    explanationMr: "ध्वनी ही यांत्रिक अवतरंग/अनुतरंग लाट असल्याने तिच्या प्रसारासाठी भौतिक माध्यमाची (स्थायू, द्रव किंवा वायू) गरज असते; वारंवारतेचे एस.आय. एकक हर्ट्झ (Hz) आहे आणि ध्वनीची पातळी/तीव्रता डेसिबल (dB) मध्ये मोजली जाते. तिन्ही विधाने बरोबर आहेत.",
    explanationEn: "All three statements are true: mechanical sound waves require a medium, frequency is measured in Hertz (Hz), and loudness in decibels (dB).",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.55) / स्टेट बोर्ड सामान्य विज्ञान इयत्ता ९ वी'
  },
  {
    id: 'pyq_2024_56',
    subjectId: 'general_science',
    topic: 'Physics & Chemistry',
    subtopic: 'X-Ray Crystallography',
    exam: 'Rajyaseva',
    difficulty: 'Moderate',
    questionMr: "खालीलपैकी कोणती तरंगलांबी पदार्थांच्या स्फटिक आंतररचना अभ्यासासाठी वापरतात?\n(1) अतिनील तरंगलांबी\n(2) गॅमा तरंगलांबी\n(3) क्ष-किरण तरंगलांबी\n(4) अवरक्त तरंगलांबी",
    questionEn: "Which of the following wavelengths are used to study the crystal structure of material ?\n(1) Ultraviolet wavelength\n(2) Gamma Rays wavelength\n(3) X-Rays wavelength\n(4) Infrared wavelength",
    optionsMr: ['अतिनील तरंगलांबी', 'गॅमा तरंगलांबी', 'क्ष-किरण तरंगलांबी', 'अवरक्त तरंगलांबी'],
    optionsEn: ['Ultraviolet wavelength', 'Gamma Rays wavelength', 'X-Rays wavelength', 'Infrared wavelength'],
    correctAnswerIndex: 2, // Official Key: 3
    explanationMr: "स्फटिकांमधील अणूंच्या आंतर-अंतर रचनेचा अभ्यास करण्यासाठी 'क्ष-किरण विवर्तन' (X-Ray Crystallography / Bragg's Law) वापरले जाते, कारण क्ष-किरणांची तरंगलांबी (सुमारे ०.१ ते १० ॲंगस्ट्रॉम) ही स्फटिकातील अणूंच्या आकाराच्या समतुल्य असते.",
    explanationEn: "X-ray wavelengths (~0.1-1 nm) are comparable to interatomic lattice spacing in crystals, making X-ray diffraction the standard method to determine crystal structures.",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.56) / भौतिकशास्त्र इयत्ता १२ वी'
  },
  {
    id: 'pyq_2024_57',
    subjectId: 'general_science',
    topic: 'Botany & Agriculture',
    subtopic: 'Fungal Plant Diseases - Leaf Blight of Wheat',
    exam: 'Rajyaseva',
    difficulty: 'Hard',
    questionMr: "लीफ ब्लाइट ऑफ व्हीट हा रोग खालीलपैकी कोणत्या बुरशीच्या संसर्गामुळे प्रसारित होतो?\n(1) युरोमायसीस ट्रीटिकाय\n(2) आल्टरनॅरीया ट्रीटीसीना\n(3) अस्टीलगो नुडा\n(4) हेल्मीन्थोस्पोरीयम सटाईव्हम",
    questionEn: "Leaf Blight of wheat is caused by infection of which of the following fungus ?\n(1) Uromyces tritici\n(2) Alternaria triticina\n(3) Ustilago nuda\n(4) Helminthosporium sativum",
    optionsMr: ['युरोमायसीस ट्रीटिकाय', 'आल्टरनॅरीया ट्रीटीसीना', 'अस्टीलगो नुडा', 'हेल्मीन्थोस्पोरीयम सटाईव्हम'],
    optionsEn: ['Uromyces tritici', 'Alternaria triticina', 'Ustilago nuda', 'Helminthosporium sativum'],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "गव्हावरील पर्ण करपा (Leaf Blight of Wheat) हा विनाशकारी बुरशीजन्य रोग 'आल्टरनेरिया ट्रीटीसीना' (Alternaria triticina) या बुरशीच्या संसर्गामुळे होतो, ज्यामुळे गव्हाच्या पानांवर तपकिरी डाग पडून पाने जळतात.",
    explanationEn: "Alternaria leaf blight in wheat crops is caused by the pathogenic fungus Alternaria triticina.",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.57) / कृषी विज्ञान व वनस्पती रोगशास्त्र'
  },
  {
    id: 'pyq_2024_58',
    subjectId: 'general_science',
    topic: 'Plant Kingdom',
    subtopic: 'Amphibians of Plant Kingdom',
    exam: 'Rajyaseva',
    difficulty: 'Easy',
    questionMr: "कोणत्या विभागातील वनस्पतींना वनस्पतीसृष्टीचे उभयचर असे म्हटले जाते?\n(1) ब्रायोफायटा\n(2) टेरिडोफायटा\n(3) अनावृत्तबीजी\n(4) आवृत्तबीजी",
    questionEn: "Which division of Plantae is called amphibians of plant kingdom ?\n(1) Bryophyta\n(2) Pteridophyta\n(3) Gymnosperm\n(4) Angiosperm",
    optionsMr: ['ब्रायोफायटा', 'टेरिडोफायटा', 'अनावृत्तबीजी', 'आवृत्तबीजी'],
    optionsEn: ['Bryophyta', 'Pteridophyta', 'Gymnosperm', 'Angiosperm'],
    correctAnswerIndex: 0, // Official Key: 1
    explanationMr: "'ब्रायोफायटा' (Bryophyta - उदा. मॉस, रिक्सिया, फ्युनारिया) वनस्पतींना वनस्पतीसृष्टीचे उभयचर (Amphibians of plant kingdom) म्हणतात, कारण या वनस्पती जमिनीत/ओलसर मातीत वाढतात परंतु त्यांच्या प्रजननासाठी (लैंगिक पुनरुत्पादनासाठी) पाण्याची अनिवार्य गरज असते.",
    explanationEn: "Bryophytes are called the amphibians of the plant kingdom because though they live in soil, they strictly depend on water for sexual reproduction and flagellated sperm motility.",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.58) / स्टेट बोर्ड जीवशास्त्र इयत्ता ९ वी व ११ वी'
  },
  {
    id: 'pyq_2024_59',
    subjectId: 'general_science',
    topic: 'Genetics & Molecular Biology',
    subtopic: 'DNA Double Helix Structure',
    exam: 'Rajyaseva',
    difficulty: 'Moderate',
    questionMr: "\"डीएनए\" संरचनेच्या अनुषंगाने खालील चार विधानांपैकी दोन विधाने संयुक्तिक आहेत, संयुक्तिक विधानांची निवड करा.\n(a) \"डीएनए\" ची संरचना दोन लांब \"न्युक्लीओटाईड\" च्या साखळ्यांनी बनली असून त्या एका सामान्य अक्षाभोवती गुंडाळलेल्या आहेत.\n(b) \"डीएनए\" ची संरचना दोन लांब \"न्युक्लीओसाईड\" च्या साखळीने बनलेली असून त्या एका सामान्य अक्षाभोवती गुंडाळलेल्या आहेत.\n(c) या दोन साखळ्या एकमेकांशी अशा रीतीने पूरक आहेत की ॲडेनीन नेहमी थायमीन सोबत व सायटोसीन ग्वानीन सोबत जोडलेले आहेत.\n(d) या दोन साखळ्या एकमेकांशी पूरक नसून यामध्ये ॲडेनीन सोबत युरॅसील व सायटोसीन सोबत ग्वानीन जोडलेले आहेत.\nपर्यायी उत्तरे:\n(1) फक्त (a) व (b) संयुक्तिक आहे.\n(2) फक्त (b) व (d) संयुक्तिक आहे.\n(3) फक्त (a) व (c) संयुक्तिक आहे.\n(4) फक्त (c) व (d) संयुक्तिक आहे.",
    questionEn: "With respect to structure of DNA, following four statements are made. Choose the two relevant statements.\n(a) DNA is made of two long chains of nucleotides coiled in a helix around a central axis.\n(b) DNA is made of two long chains of nucleoside coiled around a central axis.\n(c) The two chains are complimentary to each other so that Adenine is always paired with Thymine and cytosine with Guanine.\n(d) The two chains are not complimentary to each other where Adenine is paired with uracil and cytosine with Guanine.\nAnswer options :\n(1) Only (a) and (b) is relevant.\n(2) Only (b) and (d) is relevant.\n(3) Only (a) and (c) is relevant.\n(4) Only (c) and (d) is relevant.",
    optionsMr: ['फक्त (a) व (b) संयुक्तिक आहे.', 'फक्त (b) व (d) संयुक्तिक आहे.', 'फक्त (a) व (c) संयुक्तिक आहे.', 'फक्त (c) व (d) संयुक्तिक आहे.'],
    optionsEn: ['Only (a) and (b) is relevant.', 'Only (b) and (d) is relevant.', 'Only (a) and (c) is relevant.', 'Only (c) and (d) is relevant.'],
    correctAnswerIndex: 2, // Official Key: 3
    explanationMr: "वॉटसन आणि क्रिक यांच्या डीएनए द्वि-सर्पिलाकार (Double Helix) मॉडेलनुसार: डीएनए दोन पॉलिन्यूक्लियोटाइड (Nucleotide) साखळ्यांनी बनलेला असतो (a); आणि चार्गाफ नियमानुसार या साखळ्या पूरक असून ॲडेनाइन (A) नेहमी थायमिन (T) सोबत आणि सायटोसिन (C) नेहमी ग्वानिन (G) सोबत हायड्रोजन बंधांनी जोडलेले असते (c).",
    explanationEn: "Watson-Crick DNA model consists of two antiparallel nucleotide chains coiled around a central axis (a) where complementary base pairing pairs Adenine with Thymine (A=T) and Cytosine with Guanine (C≡G) (c).",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.59) / स्टेट बोर्ड जीवशास्त्र इयत्ता १२ वी'
  },
  {
    id: 'pyq_2024_60',
    subjectId: 'general_science',
    topic: 'Cell Biology',
    subtopic: 'Cell Theory - Schleiden and Schwann',
    exam: 'Rajyaseva',
    difficulty: 'Moderate',
    questionMr: "श्लेडेन व श्वान यांच्या पेशी सिद्धांताबाबत खालीलपैकी कोणती विधाने अचूक आहेत?\n(a) सर्व सजीव एक किंवा अनेक पेशींनी बनलेले आहेत.\n(b) नवीन पेशी पूर्व अस्तित्वात असलेल्या पेशी पासून तयार होतात.\n(c) पेशींच्या रासायनिक रचना आणि चयापचय कार्यामध्ये मूलभूत समानता आहेत.\n(d) एखाद्या जीवाची क्रिया ही सामूहिक क्रियाकलाप आणि त्याच्या पेशीय संरचनांचा परस्पर संवाद असतो.\nपर्यायी उत्तरे:\n(1) (a) आणि (b)\n(2) (a), (b) आणि (c)\n(3) (a), (c) आणि (d)\n(4) वरीलपैकी सर्व",
    questionEn: "Which of the following statements are correct about the cell theory of Schleiden and Schwann ?\n(a) All living things are composed of one or more cells.\n(b) New cells are formed from the pre-existing cells.\n(c) There are basic similarities in chemical composition and metabolic functions of cells.\n(d) The activity of an organism is collective activities and interactions of its cellular structures.\nAnswer options :\n(1) (a) and (b)\n(2) (a), (b) and (c)\n(3) (a), (c) and (d)\n(4) All of the above",
    optionsMr: ['(a) आणि (b)', '(a), (b) आणि (c)', '(a), (c) आणि (d)', 'वरीलपैकी सर्व'],
    optionsEn: ['(a) and (b)', '(a), (b) and (c)', '(a), (c) and (d)', 'All of the above'],
    correctAnswerIndex: 3, // Official Key: 4
    explanationMr: "श्लेइडेन, श्वान आणि रुडॉल्फ विर्चो (Omnis cellula-e-cellula) यांनी परिष्कृत केलेल्या आधुनिक पेशी सिद्धांतानुसार वरील चारही विधाने (सजीव पेशींचे बनलेले असणे, पूर्वअस्तित्वात असलेल्या पेशींमधून निर्मिती, चयापचयातील मूलभूत समानता) अचूक आहेत.",
    explanationEn: "Modern unified cell theory encompasses all four tenets: living things are cellular, new cells arise from pre-existing ones, and metabolic activities define organismic function.",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.60) / एनसीईआरटी जीवशास्त्र इयत्ता ११ वी'
  },
  {
    id: 'pyq_2024_61',
    subjectId: 'general_science',
    topic: 'Animal Classification',
    subtopic: 'Class Pisces (Fish)',
    exam: 'Rajyaseva',
    difficulty: 'Hard',
    questionMr: "खालीलपैकी कोणते प्राणी एका वर्गात आहेत?\n(1) टॉर्पेडो, प्रिस्टिस, हिप्पोकॅम्पस, इचथियोफिस\n(2) इचथियोफिस, हिप्पोकॅम्पस, कॅलोटेस, ॲनाबास\n(3) कॅलोटेस, प्रिस्टिस, इचथियोफिस, हिप्पोकॅम्पस\n(4) टॉर्पेडो, प्रिस्टिस, हिप्पोकॅम्पस, ॲनाबास",
    questionEn: "Which of the following animals belong to same class ?\n(1) Torpedo, Pristis, Hippocampus, Ichthyophis\n(2) Ichthyophis, Hippocampus, Calotes, Anabas\n(3) Calotes, Pristis, Ichthyophis, Hippocampus\n(4) Torpedo, Pristis, Hippocampus, Anabas",
    optionsMr: [
      'टॉर्पेडो, प्रिस्टिस, हिप्पोकॅम्पस, इचथियोफिस',
      'इचथियोफिस, हिप्पोकॅम्पस, कॅलोटेस, ॲनाबास',
      'कॅलोटेस, प्रिस्टिस, इचथियोफिस, हिप्पोकॅम्पस',
      'टॉर्पेडो, प्रिस्टिस, हिप्पोकॅम्पस, ॲनाबास'
    ],
    optionsEn: [
      'Torpedo, Pristis, Hippocampus, Ichthyophis',
      'Ichthyophis, Hippocampus, Calotes, Anabas',
      'Calotes, Pristis, Ichthyophis, Hippocampus',
      'Torpedo, Pristis, Hippocampus, Anabas'
    ],
    correctAnswerIndex: 3, // Official Key: 4
    explanationMr: "टॉर्पेडो (इलेक्ट्रिक रे), प्रिस्टिस (सॉ-फिश), हिप्पोकॅम्पस (समुद्री घोडा) आणि ॲनाबास (क्लाइंबिंग पर्च) हे चारही सजीव 'मत्स्य' (Pisces) या एकाच वर्गात/सुपरक्लासमध्ये मोडतात. इचथियोफिस हा उभयचर (Amphibian) असून कॅलोटेस सरडा हा सरपटणारा (Reptile) आहे.",
    explanationEn: "Torpedo, Pristis, Hippocampus (sea horse), and Anabas are all members of Pisces (fishes). Ichthyophis is an apodan amphibian and Calotes is a reptile.",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.61) / प्राणीशास्त्र स्टेट बोर्ड'
  },
  {
    id: 'pyq_2024_62',
    subjectId: 'general_science',
    topic: 'Biology & Health',
    subtopic: 'Narcotics - Heroin Extraction',
    exam: 'Rajyaseva',
    difficulty: 'Easy',
    questionMr: "'हेरॉईन' नावाचे अमली पदार्थ तयार करण्यासाठी कोणत्या वनस्पतीच्या अर्क/लेटेक्स वापरला जातो?\n(1) खसखसीचे झाड\n(2) कोकाचे झाड\n(3) हेमचे झाड\n(4) बाजरा",
    questionEn: "Which plants extract/latex is used to prepare a narcotics called Heroin ?\n(1) Poppy plant\n(2) Coca plant\n(3) Hemp plant\n(4) Bajra",
    optionsMr: ['खसखसीचे झाड', 'कोकाचे झाड', 'हेमचे झाड', 'बाजरा'],
    optionsEn: ['Poppy plant', 'Coca plant', 'Hemp plant', 'Bajra'],
    correctAnswerIndex: 0, // Official Key: 1
    explanationMr: "हेरॉईन (डायॲसिटाईल मॉर्फिन / स्मॅक) हे खसखस/अफीमच्या वनस्पतीपासून (Opium Poppy - Papaver somniferum) मिळणाऱ्या दुधाळ अर्कातून (Latex) मॉर्फिनच्या ॲसिटिलेशनद्वारे तयार केले जाते.",
    explanationEn: "Heroin (diacetylmorphine) is chemically synthesized from morphine extracted from the dried latex of the opium poppy (Papaver somniferum).",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.62) / एनसीईआरटी मानव आरोग्य व रोग'
  },
  {
    id: 'pyq_2024_63',
    subjectId: 'general_science',
    topic: 'Human Anatomy',
    subtopic: 'Skeletal Bones Homology',
    exam: 'Rajyaseva',
    difficulty: 'Moderate',
    questionMr: "हात आणि पाय यांच्यातील हाड व सांधे यांच्यातील साधारण साम्य व्यक्त करण्यासाठी खालील जोड्या जुळवा :\nयादी क्र. - 1 | यादी क्र. - 2\n(a) खांदा सांधा - (iv) हिप सांधा\n(b) ह्युमरस - (iii) फिमर\n(c) कोपर - (ii) गुडघा\n(d) रेडिओ-अलना - (i) टिबिओ-फिबुला\nपर्यायी उत्तरे:\n(1) (iv) (iii) (ii) (i)\n(2) (iii) (ii) (iv) (i)\n(3) (ii) (iv) (i) (iii)\n(4) (i) (ii) (iv) (iii)",
    questionEn: "Match the following to express general resemblance between bones and girdle fore limbs and hind limbs.\nList no. - 1 | List no. - 2\n(a) Shoulder joint - (iv) Hip joint\n(b) Humerus - (iii) Femur\n(c) Elbow - (ii) Knee\n(d) Radio-ulna - (i) Tibio-fibula\nAnswer options :\n(1) (iv) (iii) (ii) (i)\n(2) (iii) (ii) (iv) (i)\n(3) (ii) (iv) (i) (iii)\n(4) (i) (ii) (iv) (iii)",
    optionsMr: ['(iv) (iii) (ii) (i)', '(iii) (ii) (iv) (i)', '(ii) (iv) (i) (iii)', '(i) (ii) (iv) (iii)'],
    optionsEn: ['(iv) (iii) (ii) (i)', '(iii) (ii) (iv) (i)', '(ii) (iv) (i) (iii)', '(i) (ii) (iv) (iii)'],
    correctAnswerIndex: 0, // Official Key: 1
    explanationMr: "मानवी हाताची आणि पायाची हाडे होमोलॉगस (समरुप) असतात: खांदा सांधा ↔ हिप सांधा (Ball & Socket); ह्युमरस (दंडाचे हाड) ↔ फिमर (मांडीचे हाड); कोपर ↔ गुडघा (Hinge joint); आणि रेडिओ-अलना ↔ टिबिओ-फिबुला. योग्य क्रम: (iv) (iii) (ii) (i).",
    explanationEn: "Forelimb and hindlimb skeletal structures correspond homologously: Shoulder joint matches Hip joint; Humerus corresponds to Femur; Elbow to Knee; and Radio-ulna to Tibio-fibula.",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.63) / मानवी शरीरशास्त्र इयत्ता ११ वी'
  },
  {
    id: 'pyq_2024_64',
    subjectId: 'general_science',
    topic: 'Human Skeleton',
    subtopic: 'Bone Classification',
    exam: 'Rajyaseva',
    difficulty: 'Moderate',
    questionMr: "खालीलपैकी कोणते विधान सत्य आहे?\n(a) मानवी शरीरामध्ये एकूण 208 हाडे असतात.\n(b) मणके आणि चेहऱ्यांची हाडे हे अनियमित हाडांची उदाहरणे आहेत.\nपर्यायी उत्तरे:\n(1) (a) आणि (b)\n(2) फक्त (b)\n(3) फक्त (a)\n(4) दोघांपैकी एकही नाही",
    questionEn: "Which of the following statements is true ?\n(a) The adult human skeleton consists of 208 bones.\n(b) Vertebrae and facial bones are irregular type of bones.\nAnswer options :\n(1) (a) & (b)\n(2) Only (b)\n(3) (a) only\n(4) Neither of the two",
    optionsMr: ['(a) आणि (b)', 'फक्त (b)', 'फक्त (a)', 'दोघांपैकी एकही नाही'],
    optionsEn: ['(a) & (b)', 'Only (b)', '(a) only', 'Neither of the two'],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "विधान (a) असत्य आहे कारण प्रौढ मानवी सांगाड्यात एकूण २०६ (206) हाडे असतात, २०८ नव्हे. विधान (b) सत्य आहे, कारण पाठीचे मणके (Vertebrae) आणि चेहऱ्याची काही हाडे ही विशिष्ट आकार नसलेली अनियमित हाडे (Irregular bones) म्हणून वर्गीकृत केली जातात.",
    explanationEn: "An adult human skeleton has 206 bones, not 208. Vertebrae and facial bones are textbook examples of irregular bones. Hence, only statement (b) is true.",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.64) / स्टेट बोर्ड सामान्य विज्ञान इयत्ता ११ वी'
  },
  {
    id: 'pyq_2024_65',
    subjectId: 'general_science',
    topic: 'Chemical Kinetics',
    subtopic: 'Rate of Reaction Factors',
    exam: 'Rajyaseva',
    difficulty: 'Moderate',
    questionMr: "खालील विधाने विचारात घ्या.\nरासायनिक अभिक्रियेचा दर हा\n(a) अभिक्रियाकारकांच्या संहतीच्या प्रमाणात बदलतो.\n(b) अभिक्रियाकारकांची संहती वाढविली की, कमी होतो.\n(c) तापमान वाढविले की, वाढतो.\n(d) तापमान वाढविले की, कमी होतो.\nवरीलपैकी कोणते विधान/विधाने बरोबर आहेत?\n(1) फक्त (b)\n(2) फक्त (d)\n(3) फक्त (a) आणि (c)\n(4) फक्त (b) आणि (d)",
    questionEn: "Consider the following statements :\nRate of a chemical reaction is ______\n(a) proportional to the concentration of reactants.\n(b) decreases on increasing the concentration of reactants.\n(c) increases on increasing the temperature.\n(d) decreases on increasing the temperature.\nWhich of the statement given above is/are correct ?\n(1) Only (b)\n(2) Only (d)\n(3) Only (a) and (c)\n(4) Only (b) and (d)",
    optionsMr: ['फक्त (b)', 'फक्त (d)', 'फक्त (a) आणि (c)', 'फक्त (b) आणि (d)'],
    optionsEn: ['Only (b)', 'Only (d)', 'Only (a) and (c)', 'Only (b) and (d)'],
    correctAnswerIndex: 2, // Official Key: 3
    explanationMr: "अभिक्रियाकारकांची संहती (Concentration) वाढवल्यास कणांमधील टक्करांची संख्या वाढून अभिक्रिया दर वाढतो (a); तसेच तापमान वाढवल्यास रेणूंची गतिज ऊर्जा वाढल्यामुळे अभिक्रिया दर वाढतो (c). म्हणून (a) आणि (c) बरोबर आहेत.",
    explanationEn: "Chemical reaction rate is directly proportional to reactant concentration (more collisions) and increases with temperature (higher kinetic energy above activation energy threshold).",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.65) / रसायनशास्त्र इयत्ता १२ वी'
  },
  {
    id: 'pyq_2024_66',
    subjectId: 'general_science',
    topic: 'Applied Chemistry & Agriculture',
    subtopic: 'Soil Acidity Neutralization',
    exam: 'Rajyaseva',
    difficulty: 'Moderate',
    questionMr: "रासायनिक खतांच्या अतिवापरामुळे शेतजमिनीतील वाढलेल्या आम्लाचे उदासिनिकरण करण्यासाठी कोणते रसायन वापरतात?\n(a) पोटॅश\n(b) चुन्याची निवळी\n(c) मिल्क ऑफ मॅग्नेशिआ\n(d) अमोनियम हायड्रॉक्साइड\nपर्यायी उत्तरे:\n(1) फक्त (c)\n(2) फक्त (a) आणि (d)\n(3) फक्त (b)\n(4) वरील सर्व",
    questionEn: "Which chemical compound is used to neutralize the acidity of soil increased due to excessive use of Chemical Fertilizers ?\n(a) Potash\n(b) Lime water\n(c) Milk of magnesia\n(d) Ammonium hydroxide\nAnswer options :\n(1) Only (c)\n(2) Only (a) and (d)\n(3) Only (b)\n(4) All the above",
    optionsMr: ['फक्त (c)', 'फक्त (a) आणि (d)', 'फक्त (b)', 'वरील सर्व'],
    optionsEn: ['Only (c)', 'Only (a) and (d)', 'Only (b)', 'All the above'],
    correctAnswerIndex: 2, // Official Key: 3
    explanationMr: "रासायनिक खतांमुळे शेतजमीन आम्लधर्मीय (Acidic) झाल्यास तिचे उदासिनीकरण (Liming of soil) करण्यासाठी चुन्याची निवळी / चुनखडी (Calcium hydroxide / Slaked lime / Lime water) शेतात मिसळली जाते. म्हणून पर्याय (३) 'फक्त (b)' बरोबर आहे.",
    explanationEn: "Lime / Slaked lime (chunyachi nivli - Ca(OH)2) is used agriculturally to neutralize acidic soils and restore optimal pH.",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.66) / कृषी रसायनशास्त्र व स्टेट बोर्ड विज्ञान'
  },
  {
    id: 'pyq_2024_67',
    subjectId: 'general_science',
    topic: 'Metallurgy',
    subtopic: 'Cyanide Leaching Process',
    exam: 'Rajyaseva',
    difficulty: 'Moderate',
    questionMr: "खालीलपैकी कोणत्या/त्या धातूंची/च्या जोडी/जोड्या त्यांच्या खनिजांपासून वेगळे काढण्यासाठी साईनाईड जटिल आयनचे द्रावण वापरतात?\n(A) Cu आणि Au\n(B) Co आणि Ag\n(C) Au आणि Ag\n(D) Na आणि Hg\nपर्यायी उत्तरे:\n(1) दोन्ही (A) आणि (B)\n(2) फक्त (C)\n(3) फक्त (D)\n(4) दोन्ही (C) आणि (D)",
    questionEn: "Which of the following pair/pairs of metal/metals can be extracted from their ores by using cyanide complex solutions ?\n(A) Cu and Au\n(B) Co and Ag\n(C) Au and Ag\n(D) Na and Hg\nAnswer options :\n(1) Both (A) and (B)\n(2) Only (C)\n(3) Only (D)\n(4) Both (C) and (D)",
    optionsMr: ['दोन्ही (A) आणि (B)', 'फक्त (C)', 'फक्त (D)', 'दोन्ही (C) आणि (D)'],
    optionsEn: ['Both (A) and (B)', 'Only (C)', 'Only (D)', 'Both (C) and (D)'],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "मॅकआर्थर-फॉरेस्ट सायनाईड प्रक्रियेमध्ये (MacArthur-Forrest Cyanide Process) सोने (Au) आणि चांदी (Ag) हे राजधातू त्यांच्या अशुद्ध खनिजांमधून सोडियम किंवा पोटॅशियम सायनाईडचे जटिल द्रावण (Cyanide leaching) वापरून निष्कर्षित केले जातात.",
    explanationEn: "Cyanide leaching (MacArthur-Forrest process) is exclusively utilized in metallurgy for the extraction of Gold (Au) and Silver (Ag).",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.67) / एनसीईआरटी रसायनशास्त्र इयत्ता १२ वी'
  },
  {
    id: 'pyq_2024_68',
    subjectId: 'general_science',
    topic: 'Chemical Reactions',
    subtopic: 'Decomposition Reaction',
    exam: 'Rajyaseva',
    difficulty: 'Easy',
    questionMr: "खालील रासायनिक अभिक्रिया कोणत्या प्रकारात मोडते ते ओळखा ?\n2KClO3(s) --Δ--> 2KCl(s) + 3O2 ↑\n(a) ऊष्मादायी अभिक्रिया\n(b) विस्थापन अभिक्रिया\n(c) अपघटन अभिक्रिया\n(d) प्रकाश रासायनिक अभिक्रिया\nपर्यायी उत्तरे:\n(1) फक्त (c)\n(2) फक्त (b)\n(3) फक्त (a) आणि (d)\n(4) फक्त (a)",
    questionEn: "Identify the type of following chemical reaction.\n2KClO3(s) --Δ--> 2KCl(s) + 3O2 ↑\n(a) Exothermic reaction\n(b) Displacement reaction\n(c) Decomposition reaction\n(d) Photochemical reaction\nAnswer options :\n(1) Only (c)\n(2) Only (b)\n(3) Only (a) and (d)\n(4) Only (a)",
    optionsMr: ['फक्त (c)', 'फक्त (b)', 'फक्त (a) आणि (d)', 'फक्त (a)'],
    optionsEn: ['Only (c)', 'Only (b)', 'Only (a) and (d)', 'Only (a)'],
    correctAnswerIndex: 0, // Official Key: 1
    explanationMr: "या अभिक्रियेमध्ये पोटॅशियम क्लोरेटला (KClO3) उष्णता दिल्यावर त्याचे पोटॅशियम क्लोराईड (KCl) आणि ऑक्सिजन वायू (O2) या दोन घटकांमध्ये विभाजन होते. एकाच अभिकारकापासून दोन किंवा अधिक उत्पादिते तयार होणाऱ्या अभिक्रियेला 'अपघटन अभिक्रिया' (Thermal Decomposition reaction) म्हणतात.",
    explanationEn: "Heating potassium chlorate yields potassium chloride and oxygen. This is a classic thermal decomposition reaction.",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.68) / स्टेट बोर्ड विज्ञान इयत्ता १० वी'
  },
  {
    id: 'pyq_2024_69',
    subjectId: 'general_science',
    topic: 'Chemistry - Isotopes',
    subtopic: 'Heavy Hydrogen (Deuterium)',
    exam: 'Rajyaseva',
    difficulty: 'Easy',
    questionMr: "खालीलपैकी कोणत्या समस्थानिकाला जड हायड्रोजन असे म्हणतात?\n(a) प्रोटीयम\n(b) ड्युटेरिअम\n(c) ट्रीटीअम\n(d) वरीलपैकी काहीही नाही\nपर्यायी उत्तरे:\n(1) फक्त (c)\n(2) फक्त (b)\n(3) फक्त (d)\n(4) फक्त (a) आणि (c)",
    questionEn: "From the following which isotope is called as heavy hydrogen ?\n(a) Protium\n(b) Deuterium\n(c) Tritium\n(d) None of the above\nAnswer options :\n(1) Only (c)\n(2) Only (b)\n(3) Only (d)\n(4) Only (a) and (c)",
    optionsMr: ['फक्त (c)', 'फक्त (b)', 'फक्त (d)', 'फक्त (a) आणि (c)'],
    optionsEn: ['Only (c)', 'Only (b)', 'Only (d)', 'Only (a) and (c)'],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "हायड्रोजनचा समस्थानिक 'ड्युटेरियम' (Deuterium - ²H किंवा D) ज्याच्या केंद्रकात एक प्रोटॉन व एक न्यूट्रॉन असतो, त्याला 'जड हायड्रोजन' (Heavy Hydrogen) म्हटले जाते. याच्या ऑक्साईडला 'जड पाणी' (Heavy water - D2O) म्हणतात.",
    explanationEn: "Deuterium (²H), having one proton and one neutron, is commonly called heavy hydrogen, forming heavy water (D2O).",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.69) / रसायनशास्त्र इयत्ता ११ वी'
  },
  {
    id: 'pyq_2024_70',
    subjectId: 'general_science',
    topic: 'Biochemistry & Food Chemistry',
    subtopic: 'Iodine Value for Unsaturation',
    exam: 'Rajyaseva',
    difficulty: 'Moderate',
    questionMr: "______ हे तेल आणि चरबीमधले असंयुक्तता (Unsaturation) मोजण्यासाठी वापरतात.\n(1) साबणीकरण मूल्य\n(2) आयोडीन मूल्य\n(3) आम्ल मूल्य\n(4) विष्यंदिता मूल्य",
    questionEn: "______ is used to estimate the presence of unsaturation in oils and fats.\n(1) Saponification value\n(2) Iodine value\n(3) Acid value\n(4) Viscosity value",
    optionsMr: ['साबणीकरण मूल्य', 'आयोडीन मूल्य', 'आम्ल मूल्य', 'विष्यंदिता मूल्य'],
    optionsEn: ['Saponification value', 'Iodine value', 'Acid value', 'Viscosity value'],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "आयोडीन मूल्य (Iodine Value / Iodine Number) हे १०० ग्रॅम तेल किंवा चरबी किती ग्रॅम आयोडीन शोषून घेते ते दर्शवते, ज्याद्वारे तेलामधील कार्बन-कार्बन दुहेरी बंधांचे (Unsaturation / असंतृप्तता) प्रमाण मोजले जाते.",
    explanationEn: "The Iodine Value determines the degree of unsaturation (double bonds) in fatty acids, oils, and lipids.",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.70) / बायोकेमिस्ट्री व स्टेट बोर्ड विज्ञान'
  },
  {
    id: 'pyq_2024_71',
    subjectId: 'polity',
    topic: 'Statutory Bodies - RTI',
    subtopic: 'CIC Selection Committee',
    exam: 'Rajyaseva',
    difficulty: 'Moderate',
    questionMr: "मुख्य माहिती आयुक्तांच्या नियुक्तीची शिफारस करणाऱ्या समितीचे खालीलपैकी कोण सदस्य आहेत?\n(A) पंतप्रधान\n(B) लोकसभेतील विरोधी नेता\n(C) राज्यसभेतील विरोधी नेता\n(D) पंतप्रधानांद्वारे नामनिर्देशित केंद्रीय कॅबिनेट मंत्री\n(E) लोकसभा सभापती\nपर्यायी उत्तरे:\n(1) (A), (B) आणि (D)\n(2) (A), (B), (C) आणि (E)\n(3) (A), (B), (C) आणि (D)\n(4) (A), (B) आणि (E)",
    questionEn: "Who among the following are members of a Committee that recommends the appointment of the Chief Information Commissioner ?\n(A) Prime Minister\n(B) Leader of Opposition in the Lok Sabha\n(C) Leader of Opposition in the Rajya Sabha\n(D) Union Cabinet Minister nominated by the Prime Minister.\n(E) Speaker of the Lok Sabha\nAnswer options :\n(1) (A), (B) and (D)\n(2) (A), (B), (C) and (E)\n(3) (A), (B), (C) and (D)\n(4) (A), (B) and (E)",
    optionsMr: ['(A), (B) आणि (D)', '(A), (B), (C) आणि (E)', '(A), (B), (C) आणि (D)', '(A), (B) आणि (E)'],
    optionsEn: ['(A), (B) and (D)', '(A), (B), (C) and (E)', '(A), (B), (C) and (D)', '(A), (B) and (E)'],
    correctAnswerIndex: 0, // Official Key: 1
    explanationMr: "माहितीचा अधिकार कायदा २००५ च्या कलम १२(३) नुसार मुख्य माहिती आयुक्तांची नियुक्ती राष्ट्रपतींद्वारे एका त्रिसदस्यीय समितीच्या शिफारशीवर केली जाते: १. पंतप्रधान (अध्यक्ष), २. लोकसभेतील विरोधी पक्षनेते, आणि ३. पंतप्रधानांनी नामनिर्देशित केलेले एक केंद्रीय कॅबिनेट मंत्री. म्हणून (A), (B) आणि (D) अचूक आहे.",
    explanationEn: "Under Section 12(3) of RTI Act 2005, the CIC selection committee consists of: Prime Minister (Chair), Leader of Opposition in Lok Sabha, and a Union Cabinet Minister nominated by the PM.",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.71) / एम. लक्ष्मीकांत - भारतीय राज्यव्यवस्था'
  },
  {
    id: 'pyq_2024_72',
    subjectId: 'polity',
    topic: 'Constitutional Bodies',
    subtopic: 'Comptroller and Auditor General (CAG)',
    exam: 'Rajyaseva',
    difficulty: 'Easy',
    questionMr: "भारताच्या राज्यघटनेतील कोणत्या कलमात भारताचे नियंत्रक आणि महालेखापरीक्षक या पदाची तरतूद आहे?\n(1) कलम 148\n(2) कलम 343\n(3) कलम 266\n(4) कलम 248",
    questionEn: "Which Article in the Constitution of India provides for the Post of Comptroller and Auditor General of India (CAG) ?\n(1) Article 148\n(2) Article 343\n(3) Article 266\n(4) Article 248",
    optionsMr: ['कलम 148', 'कलम 343', 'कलम 266', 'कलम 248'],
    optionsEn: ['Article 148', 'Article 343', 'Article 266', 'Article 248'],
    correctAnswerIndex: 0, // Official Key: 1
    explanationMr: "भारतीय संविधानाच्या भाग ५ मधील कलम १४८ (Article 148) अन्वये भारताचे नियंत्रक आणि महालेखापरीक्षक (CAG) या स्वतंत्र घटनात्मक पदाची तरतूद करण्यात आली आहे. डॉ. बाबासाहेब आंबेडकरांनी कॅगला संविधानातील सर्वाधिक महत्त्वाचे पद मानले होते.",
    explanationEn: "Article 148 of the Indian Constitution establishes the office of the Comptroller and Auditor General of India (CAG).",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.72) / एम. लक्ष्मीकांत - भारतीय राज्यव्यवस्था'
  },
  {
    id: 'pyq_2024_73',
    subjectId: 'polity',
    topic: 'Landmark Supreme Court Judgments',
    subtopic: 'Kesavananda Bharati Case 1973',
    exam: 'Rajyaseva',
    difficulty: 'Hard',
    questionMr: "'केशवानंद भारती' खटल्याबाबत खालील विधाने विचारात घ्या :\n(A) सदरहू खटला हा भारताचे सरन्यायाधीश ओ.एन्. रे यांच्या नेतृत्वाखाली 13 न्यायमूर्तींच्या घटनापीठापुढे चालला.\n(B) सात विरुद्ध सहा न्यायमूर्तीच्या बहुमताने घटनापीठाने मूलभूत संरचना सिद्धांताची (Basic Structure Doctrine) रूपरेषा दिली.\n(C) या खटल्याने 'गोलखनाथ' प्रकरणातील निर्णय बदलला गेला.\n(D) सदरहू खटला हा न्यायालयीन सक्रीयतेचे उदाहरण म्हणावे लागेल.\nवरीलपैकी कोणती विधाने बिनचूक आहे/त ?\n(1) (A), (B) आणि (C)\n(2) (B), (C) आणि (D)\n(3) केवळ (B)\n(4) (A), (B), (C) आणि (D)",
    questionEn: "Consider the following statements regarding 'Kesavanand Bharati' Case :\n(A) This case was heard by the Constitution Bench of 13 judges headed by Chief Justice of India A.N. Ray.\n(B) In Seven - Six majority, the bench outlined the basic structure doctrine.\n(C) This case changed the decision of Golaknath case.\n(D) This case seems to be the instance of judicial activism.\nWhich of the statements given above is/are correct ?\n(1) (A), (B) and (C)\n(2) (B), (C) and (D)\n(3) (B) Only\n(4) (A), (B), (C) and (D)",
    optionsMr: ['(A), (B) आणि (C)', '(B), (C) आणि (D)', 'केवळ (B)', '(A), (B), (C) आणि (D)'],
    optionsEn: ['(A), (B) and (C)', '(B), (C) and (D)', '(B) Only', '(A), (B), (C) and (D)'],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "विधान (A) चुकीचे आहे कारण केशवानंद भारती खटल्याचे १३ न्यायाधीशांचे खंडपीठ सरन्यायाधीश एस. एम. सिक्री (S.M. Sikri) यांच्या अध्यक्षतेखाली होते, ए. एन. रे यांच्या नव्हे. ७ विरुद्ध ६ बहुमताने मूलभूत संरचनेचा सिद्धांत मांडला (B), गोलखनाथचा निकाल बदलला (C), आणि न्यायालयीन सक्रियतेचे हे मूर्तिमंत उदाहरण आहे (D). म्हणून (B), (C) आणि (D) अचूक आहेत.",
    explanationEn: "Statement (A) is false because the 13-judge bench was presided over by CJI S.M. Sikri, not A.N. Ray. Statements (B), (C), and (D) are correct.",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.73) / एम. लक्ष्मीकांत - भारतीय राज्यव्यवस्था'
  },
  {
    id: 'pyq_2024_74',
    subjectId: 'polity',
    topic: 'Financial Administration',
    subtopic: 'Contingency Fund of India',
    exam: 'Rajyaseva',
    difficulty: 'Easy',
    questionMr: "भारताचा आकस्मिक निधी खालीलपैकी कोणाच्या अधिकाराखाली ठेवण्यात आला आहे?\n(1) भारताचे नियंत्रक आणि महालेखा परिक्षक\n(2) भारताचे राष्ट्रपती\n(3) भारताची संसद\n(4) भारताचे पंतप्रधान",
    questionEn: "The Contingency Fund of India has been placed at the disposal of which authority among the following ?\n(1) Comptroller and Auditor General of India\n(2) President of India\n(3) Parliament of India\n(4) Prime Minister of India",
    optionsMr: ['भारताचे नियंत्रक आणि महालेखा परिक्षक', 'भारताचे राष्ट्रपती', 'भारताची संसद', 'भारताचे पंतप्रधान'],
    optionsEn: ['Comptroller and Auditor General of India', 'President of India', 'Parliament of India', 'Prime Minister of India'],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "संविधानाच्या कलम २६७(१) नुसार भारताचा आकस्मिक निधी (Contingency Fund of India) हा भारताच्या राष्ट्रपतींच्या (President of India) अखत्यारीत असतो. राष्ट्रपतींच्या वतीने केंद्रीय वित्त सचिव हा निधी चालवतात.",
    explanationEn: "Under Article 267(1), the Contingency Fund of India is placed at the disposal of the President of India, administered on their behalf by the Finance Secretary.",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.74) / भारतीय संविधान कलम २६७'
  },
  {
    id: 'pyq_2024_75',
    subjectId: 'polity',
    topic: 'President Rule & Federalism',
    subtopic: 'S.R. Bommai Case 1994',
    exam: 'Rajyaseva',
    difficulty: 'Hard',
    questionMr: "घटकराज्यातील आणीबाणीसंदर्भातील 'बोम्मई खटल्या' बाबत खालीलपैकी कोणती विधाने योग्य आहेत?\n(A) बोम्मई खटल्याचा निकाल सर्वोच्च न्यायालयाने 1994 मध्ये दिला.\n(B) घटकराज्यात राष्ट्रपती राजवट आणली गेल्यास राज्यांना सर्वोच्च न्यायालयाकडे दाद मागता येऊ शकते.\n(C) सबळ कारण नसताना राष्ट्रपती राजवट आणली गेल्यास सर्वोच्च न्यायालय केंद्र सरकारचा निर्णय रद्द करू शकते.\n(D) घटकराज्यातील विधानसभा बरखास्त करण्याच्या आदेशाला संसदेची मान्यता घेणे आवश्यक असते.\nपर्यायी उत्तरे:\n(1) फक्त (C) आणि (D)\n(2) (A), (B), (C) आणि (D)\n(3) फक्त (B), (C) आणि (D)\n(4) फक्त (A), (B) आणि (C)",
    questionEn: "Which of the following statements are correct regarding the 'Bommai Case' in reference to the Emergency in the State ?\n(A) The 'Bommai Case' Judgement was delivered by the Supreme Court in 1994.\n(B) States can appeal to the Supreme Court when President's rule is introduced in the States.\n(C) If President's Rule is imposed without valid reason/s the Supreme Court can quash the decision of the Central Government.\n(D) An order to dissolve a State Assembly requires the approval of the Parliament.\nAnswer options :\n(1) Only (C) and (D)\n(2) (A), (B), (C) and (D)\n(3) Only (B), (c) and (D)\n(4) Only (A), (B) and (C)",
    optionsMr: ['फक्त (C) आणि (D)', '(A), (B), (C) आणि (D)', 'फक्त (B), (C) आणि (D)', 'फक्त (A), (B) आणि (C)'],
    optionsEn: ['Only (C) and (D)', '(A), (B), (C) and (D)', 'Only (B), (C) and (D)', 'Only (A), (B) and (C)'],
    correctAnswerIndex: 1, // Official Key: 2
    explanationMr: "एस. आर. बोम्मई वि. भारत सरकार (१९९४) या ऐतिहासिक खटल्यात सर्वोच्च न्यायालयाने कलम ३५६ च्या न्यायिक पुनर्विलोकनाचा अधिकार प्रस्थापित केला. यात राष्ट्रपती राजवट न्यायालयीन चौकशीस पात्र ठरली, अयोग्य असल्यास विधानसभा पुनरुज्जीवित करता येते, आणि संसदेच्या मंजुरीशिवाय विधानसभा बरखास्त करता येत नाही. त्यामुळे सर्व विधाने (A, B, C, D) बरोबर आहेत.",
    explanationEn: "In S.R. Bommai v. Union of India (1994), the Supreme Court laid down landmark guidelines on Article 356: judicial review is permissible, and assembly can only be dissolved after Parliamentary approval. All statements are true.",
    reference: 'MPSC Rajyaseva Prelims 2024 (Paper 1, Q.75) / एम. लक्ष्मीकांत - भारतीय राज्यव्यवस्था'
  }
];
