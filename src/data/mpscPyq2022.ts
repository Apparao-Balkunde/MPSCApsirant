import { Question } from '../types';

// MPSC Maharashtra Gazetted Civil Services & Combine Examination Official PYQs (2022)
// (महाराष्ट्र लोकसेवा आयोग अधिकृत पूर्व परीक्षा २०२२ - प्रश्न व संदर्भ स्पष्टीकरण)
export const MPSC_PYQ_2022: Question[] = [
  {
    id: 'pyq_2022_01',
    subjectId: 'polity',
    topic: 'भारतीय राज्यघटना',
    subtopic: 'मूलभूत कर्तव्ये (कलम ५१-ए)',
    exam: 'Rajyaseva',
    difficulty: 'Moderate',
    questionMr: "भारतीय राज्यघटनेत मूलभूत कर्तव्यांचा (Fundamental Duties) समावेश कोणत्या समितीच्या शिफारशीवरून आणि कितव्या घटनादुरुस्तीने करण्यात आला?\n(१) सरकारिया आयोग - ४४ वी घटनादुरुस्ती १९७८\n(२) सरदार स्वर्णसिंह समिती - ४२ वी घटनादुरुस्ती १९७६\n(३) न्या. वर्मा समिती - ८६ वी घटनादुरुस्ती २००२\n(४) बलवंतराय मेहता समिती - ७३ वी घटनादुरुस्ती १९९२",
    questionEn: "On the recommendation of which committee and by which constitutional amendment were Fundamental Duties added to the Indian Constitution?\n(1) Sarkaria Commission - 44th Amendment 1978\n(2) Sardar Swaran Singh Committee - 42nd Amendment 1976\n(3) Justice Verma Committee - 86th Amendment 2002\n(4) Balwant Rai Mehta Committee - 73rd Amendment 1992",
    optionsMr: [
      'सरकारिया आयोग - ४४ वी घटनादुरुस्ती १९७८',
      'सरदार स्वर्णसिंह समिती - ४२ वी घटनादुरुस्ती १९७६',
      'न्या. वर्मा समिती - ८६ वी घटनादुरुस्ती २००२',
      'बलवंतराय मेहता समिती - ७३ वी घटनादुरुस्ती १९९२'
    ],
    optionsEn: [
      'Sarkaria Commission - 44th Amendment 1978',
      'Sardar Swaran Singh Committee - 42nd Amendment 1976',
      'Justice Verma Committee - 86th Amendment 2002',
      'Balwant Rai Mehta Committee - 73rd Amendment 1992'
    ],
    correctAnswerIndex: 1,
    explanationMr: "सरदार स्वर्णसिंह समिती (१९७६) च्या शिफारशीनुसार ४२ व्या घटनादुरुस्ती कायदा १९७६ अन्वये संविधानात नवीन भाग IV-A आणि कलम ५१-A जोडण्यात आले.\n• मूळतः संविधानात १० मूलभूत कर्तव्ये (USSR कडून प्रेरित) जोडण्यात आली होती.\n• नंतर ८६ व्या घटनादुरुस्ती कायदा २००२ द्वारे ११ वे मूलभूत कर्तव्य [६ ते १४ वयोगटातील पाल्यांना शिक्षणाची संधी उपलब्ध करून देणे - ५१-A(k)] जोडण्यात आले.",
    explanationEn: "Sardar Swaran Singh Committee recommended Fundamental Duties, incorporated via the 42nd Constitutional Amendment Act 1976 under Part IV-A and Article 51A. The 11th duty was added by the 86th CAA in 2002.",
    reference: 'MPSC Rajyaseva Prelims 2022 / एम. लक्ष्मीकांत - मूलभूत कर्तव्ये'
  },
  {
    id: 'pyq_2022_02',
    subjectId: 'maharashtra_history',
    topic: 'महाराष्ट्राचा इतिहास',
    subtopic: 'सामाजिक व धार्मिक सुधारणा चळवळी',
    exam: 'Rajyaseva',
    difficulty: 'Moderate',
    questionMr: "१८४९ मध्ये मुंबईत 'परमहंस सभा' (Paramahansa Sabha) ची स्थापना खालीलपैकी कोणी केली?\n(१) दादोबा पांडुरंग तर्खडकर\n(२) जगन्नाथ शंकरशेट\n(३) गोपाळ हरी देशमुख (लोकहितवादी)\n(४) डॉ. आत्माराम पांडुरंग",
    questionEn: "Who among the following founded the 'Paramahansa Sabha' in Bombay in 1849?\n(1) Dadoba Pandurang Tarkhadkar\n(2) Jagannath Shankarsheth\n(3) Gopal Hari Deshmukh (Lokhitwadi)\n(4) Dr. Atmaram Pandurang",
    optionsMr: [
      'दादोबा पांडुरंग तर्खडकर',
      'जगन्नाथ शंकरशेट',
      'गोपाळ हरी देशमुख (लोकहितवादी)',
      'डॉ. आत्माराम पांडुरंग'
    ],
    optionsEn: [
      'Dadoba Pandurang Tarkhadkar',
      'Jagannath Shankarsheth',
      'Gopal Hari Deshmukh (Lokhitwadi)',
      'Dr. Atmaram Pandurang'
    ],
    correctAnswerIndex: 0,
    explanationMr: "परमहंस सभा (३१ जुलै १८४९):\n• दादोबा पांडुरंग तर्खडकर आणि रामचंद्र बाळकृष्ण जयकर यांनी मुंबईत गुप्त स्वरूपाची 'परमहंस सभा' स्थापन केली.\n• जातपात मोडून काढणे, मूर्तीपूजेचा निषेध व एकेश्वरवाद ही त्यांची मुख्य तत्त्वे होती.\n• या सभेच्या बैठकीत सर्व जातीच्या सदस्यांना एकाच भांड्यातील अन्न व पाणी ग्रहण करावे लागत असे.\n• १८६७ मध्ये याच परंपरेतून 'प्रार्थना समाज' स्थापन झाला.",
    explanationEn: "Paramahansa Sabha was founded as a secret reform society in Bombay on 31 July 1849 by Dadoba Pandurang Tarkhadkar and Ramchandra Balkrishna Jaykar to break caste barriers and promote monotheism.",
    reference: 'MPSC Rajyaseva Prelims 2022 / ११ वी इतिहास (स्टेट बोर्ड)'
  },
  {
    id: 'pyq_2022_03',
    subjectId: 'maharashtra_geography',
    topic: 'महाराष्ट्राचा भूगोल',
    subtopic: 'नदीप्रणाली - गोदावरी खोरे',
    exam: 'Combine',
    difficulty: 'Easy',
    questionMr: "महाराष्ट्रातील 'दक्षिण गंगा' म्हणून ओळखल्या जाणाऱ्या गोदावरी नदीचा उगम कोठे होतो?\n(१) महाबळेश्वर (सातारा)\n(२) त्र्यंबकेश्वर (नाशिक)\n(३) भीमाशंकर (पुणे)\n(४) मुलताई (सातपुडा)",
    questionEn: "Where does the Godavari River, often referred to as the 'Dakshin Ganga' of Maharashtra, originate?\n(1) Mahabaleshwar (Satara)\n(2) Trimbakeshwar (Nashik)\n(3) Bhimashankar (Pune)\n(4) Multai (Satpura)",
    optionsMr: [
      'महाबळेश्वर (सातारा)',
      'त्र्यंबकेश्वर (नाशिक)',
      'भीमाशंकर (पुणे)',
      'मुलताई (सातपुडा)'
    ],
    optionsEn: [
      'Mahabaleshwar (Satara)',
      'Trimbakeshwar (Nashik)',
      'Bhimashankar (Pune)',
      'Multai (Satpura)'
    ],
    correctAnswerIndex: 1,
    explanationMr: "गोदावरी नदी उगम व माहिती:\n• नाशिक जिल्ह्यातील 'त्र्यंबकेश्वर' जवळील ब्रह्मगिरी पर्वतावर गोदावरीचा उगम होतो.\n• ही महाराष्ट्रातील सर्वात मोठी नदी असून तिची महाराष्ट्रातील लांबी ६६८ किमी (एकूण १४६५ किमी) आहे.\n• तिने महाराष्ट्राचे सुमारे ४९% क्षेत्र व्यापले आहे.\n• महाबळेश्वर येथे कृष्णा, भीमाशंकर येथे भीमा आणि मुलताई (मध्य प्रदेश) येथे तापी नदीचा उगम होतो.",
    explanationEn: "The Godavari originates on the Brahmagiri hill near Trimbakeshwar in Nashik district. It flows 668 km through Maharashtra, draining nearly 49% of the state's total geographic area.",
    reference: 'MPSC Combine Prelims 2022 / सौदी - महाराष्ट्राचा भूगोल'
  },
  {
    id: 'pyq_2022_04',
    subjectId: 'economy',
    topic: 'भारतीय अर्थव्यवस्था',
    subtopic: 'नीती आयोग (NITI Aayog)',
    exam: 'Rajyaseva',
    difficulty: 'Easy',
    questionMr: "नियोजना आयोगाची (Planning Commission) जागा घेणाऱ्या 'नीती आयोगा'ची (NITI Aayog) स्थापना कोणत्या दिवशी करण्यात आली?\n(१) १ जानेवारी २०१४\n(२) १ जानेवारी २०१५\n(३) १५ ऑगस्ट २०१४\n(४) १ एप्रिल २०१५",
    questionEn: "On which date was 'NITI Aayog' established, replacing the erstwhile Planning Commission of India?\n(1) 1 January 2014\n(2) 1 January 2015\n(3) 15 August 2014\n(4) 1 April 2015",
    optionsMr: [
      '१ जानेवारी २०१४',
      '१ जानेवारी २०१५',
      '१५ ऑगस्ट २०१४',
      '१ एप्रिल २०१५'
    ],
    optionsEn: [
      '1 January 2014',
      '1 January 2015',
      '15 August 2014',
      '1 April 2015'
    ],
    correctAnswerIndex: 1,
    explanationMr: "नीती आयोग (National Institution for Transforming India):\n• केंद्र सरकारच्या मंत्रिमंडळाच्या ठरावाद्वारे १ जानेवारी २०१५ रोजी नीती आयोगाची स्थापना झाली.\n• १५ मार्च १९५० रोजी स्थापन झालेला नियोजन आयोग या दिवशी बरखास्त करण्यात आला.\n• भारताचे पंतप्रधान हे नीती आयोगाचे पदसिद्ध अध्यक्ष (Ex-officio Chairperson) असतात.\n• नीती आयोग 'सहकारी संघराज्य' (Cooperative Federalism) आणि 'तळागाळातून वर' (Bottom-up Approach) या तत्त्वावर कार्य करतो.",
    explanationEn: "NITI Aayog (National Institution for Transforming India) was formed on 1 January 2015 by a Union Cabinet resolution, replacing the 65-year-old Planning Commission to foster Cooperative Federalism.",
    reference: 'MPSC Rajyaseva Prelims 2022 / रंजन कोळंबे - भारतीय अर्थव्यवस्था'
  }
];
