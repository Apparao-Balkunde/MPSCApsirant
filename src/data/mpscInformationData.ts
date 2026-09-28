export interface InformationTopic {
  id: string;
  category: 'rti' | 'it_act' | 'rts' | 'dpdp' | 'exam_info' | 'cyber';
  titleMr: string;
  titleEn: string;
  subtitleMr: string;
  subtitleEn: string;
  badgeMr: string;
  badgeEn: string;
  summaryMr: string;
  summaryEn: string;
  keyPointsMr: string[];
  keyPointsEn: string[];
  importantSections?: { section: string; titleMr: string; titleEn: string; descMr: string; descEn: string }[];
  examRelevance: string;
  relatedSubjectId: string;
}

export const INFORMATION_CATEGORIES = [
  { id: 'all', nameMr: 'सर्व माहिती (All)', nameEn: 'All Information' },
  { id: 'rti', nameMr: 'माहितीचा अधिकार (RTI 2005)', nameEn: 'RTI Act 2005' },
  { id: 'it_act', nameMr: 'माहिती तंत्रज्ञान कायदा (IT Act)', nameEn: 'IT Act 2000' },
  { id: 'rts', nameMr: 'महाराष्ट्र लोकसेवा हक्क (RTS 2015)', nameEn: 'Public Services Act' },
  { id: 'dpdp', nameMr: 'डेटा संरक्षण (DPDP 2023)', nameEn: 'DPDP Act 2023' },
  { id: 'exam_info', nameMr: 'MPSC परीक्षा पद्धती व पदे', nameEn: 'MPSC Exam Info' },
  { id: 'cyber', nameMr: 'सायबर सुरक्षा व AI उपक्रम', nameEn: 'Cyber & AI Initiatives' }
] as const;

export const MPSC_INFORMATION_DATA: InformationTopic[] = [
  // =========================================================================
  // 1. RIGHT TO INFORMATION ACT, 2005
  // =========================================================================
  {
    id: 'info_rti_overview',
    category: 'rti',
    titleMr: 'माहितीचा अधिकार अधिनियम, २००५ (Right to Information Act)',
    titleEn: 'Right to Information Act, 2005 (RTI Act)',
    subtitleMr: 'पारदर्शक व जबाबदार कारभारासाठी नागरिकांचा मूलभूत अधिकार',
    subtitleEn: 'Empowering Citizens for Transparent & Accountable Governance',
    badgeMr: 'कायदे मंडळ कायदा क्र. २२/२००५',
    badgeEn: 'Act No. 22 of 2005',
    summaryMr: 'संसदेने १५ जून २००५ रोजी या कायद्याला मंजुरी दिली आणि १२ ऑक्टोबर २००५ पासून हा कायदा देशभरात संपूर्णतः लागू झाला. संविधानातील कलम १९(१)(अ) मधील विचार व अभिव्यक्ती स्वातंत्र्याचा हा अविभाज्य भाग मानला जातो.',
    summaryEn: 'Enacted on 15 June 2005 and fully enforced on 12 October 2005, the RTI Act operationalizes the fundamental right to freedom of speech and expression under Article 19(1)(a).',
    keyPointsMr: [
      'उद्दिष्ट: नागरिकांना माहिती मिळवण्याचा अधिकार देऊन शासकीय कामकाजात पारदर्शकता आणि उत्तरदायित्व वाढवणे.',
      'व्याप्ती: संपूर्ण भारतभर लागू (जम्मू-काश्मीर पुनर्रचना अधिनियम २०१९ नंतर तेथेही लागू).',
      'अर्ज फी: सर्वसाधारण ₹१०; दारिद्र्यरेषेखालील (BPL) अर्जदारांना कोणतीही फी नाही.',
      'माहिती स्वरूप: कागदपत्रे, अभिलेख, ईमेल, नमुने, इलेक्ट्रॉनिक स्वरूपातील डेटा आणि कामाची प्रत्यक्ष पाहणी (Inspection of Work).'
    ],
    keyPointsEn: [
      'Objective: Promote transparency and accountability in working of every public authority.',
      'Applicability: Extends to the whole of India (including J&K post-2019).',
      'Application Fee: ₹10 for general category; Free of charge for BPL citizens.',
      'Format of Info: Documents, records, memos, emails, samples, data in electronic form, and inspection of works.'
    ],
    importantSections: [
      {
        section: 'कलम २(h)',
        titleMr: 'सार्वजनिक प्राधिकरण (Public Authority)',
        titleEn: 'Public Authority Definition',
        descMr: 'संविधान, संसदेचा कायदा, राज्य विधिमंडळाचा कायदा किंवा शासनाकडून प्रत्यक्ष/अप्रत्यक्ष भरीव वित्तपुरवठा होणाऱ्या सर्व संस्था/एनजीओ.',
        descEn: 'Any authority or body established by Constitution, Parliament/State laws, or funded substantially by the Government.'
      },
      {
        section: 'कलम ४(१)(b)',
        titleMr: 'स्वतःहून माहिती प्रसिद्ध करणे (Suo Motu Disclosure)',
        titleEn: 'Proactive Disclosure of 17 Points',
        descMr: 'प्रत्येक प्राधिकरणाने आपल्या कामकाजाची १७ मुद्द्यांची माहिती स्वतःहून वेबसाईटवर प्रसिद्ध करणे बंधनकारक.',
        descEn: 'Public authorities must proactively publish 17 manuals detailing powers, functions, norms, and salaries.'
      },
      {
        section: 'कलम ७(१)',
        titleMr: 'माहिती पुरवण्याची कालमर्यादा (Time Limits)',
        titleEn: 'Disposal of RTI Request',
        descMr: 'सर्वसाधारण अर्ज: ३० दिवस; सहाय्यक जन माहिती अधिकाऱ्याकडे अर्ज असल्यास: ३५ दिवस; व्यक्तीचे जीवित व वैयक्तिक स्वातंत्र्याशी संबंधित माहिती: ४८ तासांच्या आत देणे अनिवार्य.',
        descEn: 'Standard request: 30 days. Through APIO: 35 days. Information regarding life or liberty: within 48 hours.'
      },
      {
        section: 'कलम ८(१)',
        titleMr: 'माहिती उघड करण्यापासून अपवाद (Exemptions)',
        titleEn: 'Exemption from Disclosure',
        descMr: 'देशाचे सार्वभौमत्व, राष्ट्रीय सुरक्षा, न्यायालयीन अवमान, व्यावसायिक गोपनीयता (Trade Secrets), वैयक्तिक गोपनीय माहिती आणि मंत्रिमंडळाची कागदपत्रे जोपर्यंत निर्णय होत नाही तोपर्यंत.',
        descEn: 'Sovereignty, security, trade secrets, fiduciary relations, contempt of court, and cabinet papers until decisions are finalized.'
      },
      {
        section: 'कलम १९',
        titleMr: 'प्रथम व द्वितीय अपील (Appeals)',
        titleEn: 'Appeals Mechanism',
        descMr: 'प्रथम अपील: ३० दिवसांत वरिष्ठ अधिकाऱ्याकडे (निकाल ३० ते ४५ दिवसांत); द्वितीय अपील: ९० दिवसांत राज्य/केंद्रीय माहिती आयोगाकडे.',
        descEn: 'First Appeal within 30 days to Senior Officer. Second Appeal within 90 days to Central/State Information Commission.'
      },
      {
        section: 'कलम २०',
        titleMr: 'शास्ती व दंड (Penalties)',
        titleEn: 'Penalties on PIO',
        descMr: 'कारणाशिवाय माहिती नाकारल्यास किंवा विलंब केल्यास जन माहिती अधिकाऱ्याला दररोज ₹२५०, कमाल ₹२५,००० पर्यंत दंड.',
        descEn: 'Fine of ₹250 per day up to maximum ₹25,000 for malafide denial or delays without reasonable cause.'
      }
    ],
    examRelevance: 'MPSC राज्यसेवा GS-2 (राज्यव्यवस्था) व संयुक्त गट ब/क मुख्य परीक्षा (कायदे विषय)',
    relatedSubjectId: 'polity'
  },

  // =========================================================================
  // 2. INFORMATION TECHNOLOGY ACT, 2000
  // =========================================================================
  {
    id: 'info_it_overview',
    category: 'it_act',
    titleMr: 'माहिती तंत्रज्ञान कायदा, २००० (Information Technology Act, 2000)',
    titleEn: 'Information Technology Act, 2000 (IT Act)',
    subtitleMr: 'ई-कॉमर्स, डिजिटल स्वाक्षरी व सायबर गुन्ह्यांवर नियंत्रण ठेवणारा देशाचा प्रमुख कायदा',
    subtitleEn: 'Legal Framework for Electronic Commerce, Digital Signatures & Cyber Crimes',
    badgeMr: 'कायदा क्र. २१/२०००',
    badgeEn: 'Act No. 21 of 2000',
    summaryMr: 'संयुक्त राष्ट्रसंघाच्या UNCITRAL मॉडेल लॉच्या आधारे ९ जून २००० रोजी संमत झालेला आणि १७ ऑक्टोबर २००० पासून लागू झालेला कायदा. २००८ मध्ये यात व्यापक सुधारणा (IT Amendment Act 2008) करण्यात आली.',
    summaryEn: 'Based on UNCITRAL Model Law on Electronic Commerce, notified on 17 October 2000, and extensively amended in 2008 to address cyber terrorism and data privacy.',
    keyPointsMr: [
      'डिजिटल आणि इलेक्ट्रॉनिक स्वाक्षरीला (Digital Signature) कायदेशीर मान्यता.',
      'इलेक्ट्रॉनिक दस्तऐवज आणि ई-रेकॉर्ड्सना कायदेशीर पुरावा म्हणून मान्यता.',
      'सायबर गुन्हे, हॅकिंग, आयडेंटिटी थेफ्ट, सायबर दहशतवाद यांना आळा घालणे.',
      'CERT-In ची राष्ट्रीय नोडल सायबर सुरक्षा संस्था म्हणून स्थापना (कलम ७०-B).'
    ],
    keyPointsEn: [
      'Legal recognition to electronic transactions, digital records, and digital signatures.',
      'Admissibility of electronic records in courts as documentary evidence.',
      'Stringent punishments for hacking, identity theft, data theft, and cyber terrorism.',
      'Institutional setup of CERT-In under Section 70B for cybersecurity incident response.'
    ],
    importantSections: [
      {
        section: 'कलम ४३',
        titleMr: 'संगणक प्रणालीचे नुकसान व हानी भरपाई',
        titleEn: 'Penalty for damage to computer system',
        descMr: 'परवानगीशिवाय संगणक डेटा डाऊनलोड करणे, व्हायरस सोडणे, डेटा नष्ट केल्यास नुकसान भरपाईची तरतूद.',
        descEn: 'Civil liability for unauthorized access, data downloading, virus introduction, and system disruption.'
      },
      {
        section: 'कलम ६५',
        titleMr: 'संगणक सोर्स कोडशी छेडछाड',
        titleEn: 'Tampering with Computer Source Documents',
        descMr: 'संगणक सोर्स कोड लपवणे किंवा बदलणे यासाठी ३ वर्षांपर्यंत कारावास किंवा २ लाख रुपये दंड किंवा दोन्ही.',
        descEn: 'Concealing, destroying, or altering computer source code punishable by up to 3 years imprisonment or ₹2 lakh fine.'
      },
      {
        section: 'कलम ६६-C',
        titleMr: 'ओळख चोरीसाठी शिक्षा (Identity Theft)',
        titleEn: 'Punishment for Identity Theft',
        descMr: 'दुसऱ्याची डिजिटल स्वाक्षरी, पासवर्ड किंवा युनिक आयडेंटिफिकेशन वापरल्यास ३ वर्षांपर्यंत कारावास व १ लाख दंड.',
        descEn: 'Fraudulent use of another person’s electronic signature, password, or biometric feature punishable by up to 3 years.'
      },
      {
        section: 'कलम ६६-D',
        titleMr: 'संगणकाद्वारे तोतयागिरी करून फसवणूक',
        titleEn: 'Cheating by Personation using Computer',
        descMr: 'संगणक किंवा इंटरनेटद्वारे स्वतःची खोटी ओळख दाखवून फसवणूक केल्यास ३ वर्षांपर्यंत कारावास.',
        descEn: 'Cheating by personating through communication device punishable by imprisonment up to 3 years and fine.'
      },
      {
        section: 'कलम ६६-F',
        titleMr: 'सायबर दहशतवाद (Cyber Terrorism)',
        titleEn: 'Cyber Terrorism',
        descMr: 'भारताची सुरक्षा, एकात्मता धोक्यात आणण्यासाठी संगणक प्रणालीवर हल्ला केल्यास जन्मठेपेपर्यंतची (Life Imprisonment) शिक्षा.',
        descEn: 'Acts threatening the unity, integrity, and security of India by hacking critical infrastructure punishable with life imprisonment.'
      },
      {
        section: 'कलम ६९-A',
        titleMr: 'संकेतस्थळे व माहिती ब्लॉक करण्याचे अधिकार',
        titleEn: 'Power to Issue Directions to Block Access',
        descMr: 'सार्वभौमत्व, देशाची सुरक्षा व सार्वजनिक सुव्यवस्थेसाठी केंद्र सरकारला वेबसाइट्स व लिंक्स ब्लॉक करण्याचे अधिकार.',
        descEn: 'Central Government authority to block public access to objectionable content in the interest of sovereignty and public order.'
      }
    ],
    examRelevance: 'MPSC राज्यसेवा GS-4 (विज्ञान व तंत्रज्ञान) व संयुक्त मुख्य परीक्षा',
    relatedSubjectId: 'general_science'
  },

  // =========================================================================
  // 3. MAHARASHTRA RIGHT TO PUBLIC SERVICES ACT, 2015
  // =========================================================================
  {
    id: 'info_rts_overview',
    category: 'rts',
    titleMr: 'महाराष्ट्र लोकसेवा हक्क अधिनियम, २०१५ (Maharashtra RTS Act)',
    titleEn: 'Maharashtra Right to Public Services Act, 2015',
    subtitleMr: 'पारदर्शक, गतिमान व विहित मुदतीत शासकीय सेवा देण्याची ऐतिहासिक हमी',
    subtitleEn: 'Statutory Guarantee for Time-Bound Delivery of Citizen Services in Maharashtra',
    badgeMr: 'महाराष्ट्र कायदा क्र. ३१/२०१५',
    badgeEn: 'Maharashtra Act No. 31 of 2015',
    summaryMr: '२८ एप्रिल २०१५ रोजी वटहुकुमाने आणि २१ ऑगस्ट २०१५ रोजी राज्य विधिमंडळाने संमत केलेला क्रांतिकारी कायदा. शासकीय कार्यालयांमध्ये नागरिकांना हेलपाटे मारावे लागू नयेत म्हणून सेवांची कालमर्यादा निश्चित केली गेली आहे.',
    summaryEn: 'Enacted by Maharashtra Legislature on 21 August 2015 to guarantee transparent, swift, and corruption-free delivery of notified public services within stipulated timeframes.',
    keyPointsMr: [
      'उद्दिष्ट: नागरिकांना अधिसूचित सेवा विहित वेळेत, विनाअडथळा आणि पारदर्शक पद्धतीने मिळण्याचा हक्क.',
      'आपले सरकार पोर्टल (aaplesarkar.mahaonline.gov.in): ५००+ हून अधिक शासकीय सेवा ऑनलाईन उपलब्ध.',
      'अधिकार: सेवा देण्यास उशीर झाल्यास किंवा नाकारल्यास प्रथम व द्वितीय अपील करण्याचे अधिकार.',
      'दंड: विहित मुदतीत सेवा न पुरवल्यास दोषी अधिकाऱ्यावर ₹५०० ते ₹५,००० पर्यंत दंड आकारण्याची तरतूद.'
    ],
    keyPointsEn: [
      'Objective: Empower eligible citizens with a legal right to obtain public services in a time-bound manner.',
      'Aaple Sarkar Portal: Integrates 500+ notified state public services digitally.',
      'Appellate Hierarchy: Structured two-tier appeal system followed by the State Commission.',
      'Penalty Provisions: Fine of ₹500 to ₹5,000 imposed on defaulting public servants deducted from salary.'
    ],
    importantSections: [
      {
        section: 'कलम ३ व ४',
        titleMr: 'सार्वजनिक सेवांची अधिसूचना व पदनिर्देशित अधिकारी',
        titleEn: 'Notification of Public Services & Designated Officers',
        descMr: 'शासनाने सेवांची यादी, लागणारा कालावधी, कागदपत्रे व पदनिर्देशित अधिकाऱ्यांची नावे फलकावर प्रसिद्ध करणे अनिवार्य.',
        descEn: 'Every department must notify services, required documents, stipulated time limits, and designated officers.'
      },
      {
        section: 'कलम ८',
        titleMr: 'दोन टप्प्यांची अपील यंत्रणा (Two-Tier Appeals)',
        titleEn: 'First & Second Appeals',
        descMr: 'मुदतीत सेवा न मिळाल्यास ३० दिवसांत प्रथम अपील अधिकाऱ्याकडे; त्यानंतर ३० दिवसांत द्वितीय अपील अधिकाऱ्याकडे दाद मागता येते.',
        descEn: 'First Appeal within 30 days to the First Appellate Authority; Second Appeal within 30 days to the Second Appellate Authority.'
      },
      {
        section: 'कलम १३',
        titleMr: 'महाराष्ट्र राज्य सेवा हक्क आयोग (RTS Commission)',
        titleEn: 'State Right to Service Commission',
        descMr: 'मुख्य सेवा हक्क आयुक्त व प्रत्येक महसुली विभागासाठी सेवा हक्क आयुक्त कार्यरत (पुणे, कोकण, नाशिक, छत्रपती संभाजीनगर, अमरावती, नागपूर).',
        descEn: 'Headed by the Chief State Commissioner with divisional commissioners across all administrative divisions.'
      }
    ],
    examRelevance: 'MPSC संयुक्त गट ब व क मुख्य परीक्षा (सामान्य अध्ययन - विशेष कायदे)',
    relatedSubjectId: 'polity'
  },

  // =========================================================================
  // 4. DIGITAL PERSONAL DATA PROTECTION ACT, 2023
  // =========================================================================
  {
    id: 'info_dpdp_overview',
    category: 'dpdp',
    titleMr: 'डिजिटल पर्सनल डेटा संरक्षण कायदा, २०२३ (DPDP Act, 2023)',
    titleEn: 'Digital Personal Data Protection Act, 2023',
    subtitleMr: 'भारतीय नागरिकांच्या डिजिटल डेटा गोपनीयतेची भक्कम कायदेशीर ढाल',
    subtitleEn: 'Comprehensive Legal Architecture for Privacy & Personal Data Governance',
    badgeMr: 'कायदा क्र. २२/२०२३',
    badgeEn: 'Act No. 22 of 2023',
    summaryMr: 'सर्वोच्च न्यायालयाच्या प्रसिद्ध पुट्टस्वामी खटल्यातील (Puttaswamy 2017) \'गोपनीयतेचा मूलभूत अधिकार\' (Right to Privacy - Article 21) निकालाच्या पार्श्वभूमीवर ऑगस्ट २०२३ मध्ये संसदेने हा ऐतिहासिक कायदा संमत केला.',
    summaryEn: 'Passed by Parliament in August 2023 following the landmark Puttaswamy judgment (2017) which recognized Right to Privacy as a fundamental right under Article 21.',
    keyPointsMr: [
      'डेटा प्रिन्सिपल (Data Principal): ज्या नागरिकाचा डेटा गोळा केला जातो ती व्यक्ती.',
      'डेटा फिड्युशियरी (Data Fiduciary): डेटा प्रक्रिया करणारी संस्था किंवा कंपनी.',
      'संमती (Consent): नागरिकांच्या स्पष्ट व निःसंदिग्ध संमतीशिवाय डेटा वापरण्यास बंदी.',
      'मुलांचा डेटा: १८ वर्षांखालील बालकांच्या डेटावर पालकांची संमती अनिवार्य, ट्रॅकिंग करण्यास सक्त मनाई.',
      'दंड: गंभीर डेटा उल्लंघनासाठी ₹ २५० कोटींपर्यंतचा प्रचंड दंड.'
    ],
    keyPointsEn: [
      'Data Principal: The natural citizen to whom the personal data relates.',
      'Data Fiduciary: Any entity determining the purpose and means of data processing.',
      'Unambiguous Consent: Processing permitted only upon clear, informed, and revocable consent.',
      'Child Safety: Parental consent mandatory for processing data of minors under 18 years.',
      'Penalties: Stringent fines up to ₹250 crore for significant data security failures.'
    ],
    examRelevance: 'MPSC राज्यसेवा GS-2 (संविधान व कायदे) आणि GS-4 तंत्रज्ञान',
    relatedSubjectId: 'polity'
  },

  // =========================================================================
  // 5. MPSC EXAM SELECTION PROCESS & PATTERNS
  // =========================================================================
  {
    id: 'info_mpsc_pattern_guide',
    category: 'exam_info',
    titleMr: 'MPSC परीक्षा पद्धती, पदे व गुणदान विश्लेषण',
    titleEn: 'MPSC Exams Blueprint, Posts, Marks & Eligibility',
    subtitleMr: 'राज्यसेवा (राजपत्रित) आणि संयुक्त गट ब व क परीक्षेचा अद्ययावत मार्गदर्शक',
    subtitleEn: 'Complete Guide to Gazetted Civil Services & Non-Gazetted Combine Prelims/Mains',
    badgeMr: 'नवीन सुधारित पद्धत',
    badgeEn: 'Latest Revised Blueprint',
    summaryMr: 'महाराष्ट्र लोकसेवा आयोगाद्वारे (MPSC) दरवर्षी घेण्यात येणाऱ्या प्रमुख परीक्षा, पदांची रचना, वयोमर्यादा, नकारात्मक गुणदान आणि अभ्यासक्रमाचे अधिकृत स्वरूप.',
    summaryEn: 'Official blueprint and selection stages for MPSC Rajyaseva Civil Services and Combine Group B & Group C examinations.',
    keyPointsMr: [
      '१) राज्यसेवा परीक्षा (Gazetted Civil Services):',
      '   • पदे: उपजिल्हाधिकारी (DYC), पोलीस उपअधीक्षक/ACP, तहसीलदार, शिक्षणाधिकारी, गटविकास अधिकारी (BDO), मुख्याधिकारी.',
      '   • पूर्व परीक्षा: ४०० गुण (पेपर १: GS - २०० गुण + पेपर २: CSAT - २०० गुण, ३३% पात्रता निकष).',
      '   • मुख्य परीक्षा: वर्णनात्मक (Descriptive) पॅटर्न (UPSC धर्तीवर एकूण १७५० गुण + मुलाखत २७५ गुण).',
      '२) महाराष्ट्र अराजपत्रित संयुक्त गट \'ब\' परीक्षा:',
      '   • पदे: पोलीस उपनिरीक्षक (PSI), राज्य कर निरीक्षक (STI), सहाय्यक कक्ष अधिकारी (ASO), दुय्यम निबंधक.',
      '   • पूर्व परीक्षा: १०० गुण (१०० प्रश्न, १ तास, १/४ नकारात्मक गुणदान).',
      '   • PSI शारीरिक चाचणी: ७० गुणांची पात्रता चाचणी (Qualifying) + मुलाखत ४० गुण.',
      '३) महाराष्ट्र अराजपत्रित संयुक्त गट \'क\' परीक्षा:',
      '   • पदे: कर सहायक (Tax Assistant), लिपिक-टंकलेखक (Clerk-Typist), दुय्यम निरीक्षक (Sub-Inspector Excise), उद्योग निरीक्षक.',
      '   • टायपिंग निकष: लिपिक पदासाठी मराठी ३० श.प्र.मि. किंवा इंग्रजी ४० श.प्र.मि. प्रमाणपत्र अनिवार्य.'
    ],
    keyPointsEn: [
      '1) Gazetted State Services (Rajyaseva):',
      '   • Posts: Deputy Collector, DySP/ACP, Tehsildar, BDO, Chief Officer Class-1/2.',
      '   • Prelims: 400 marks (Paper 1 GS 200 marks, Paper 2 CSAT 200 marks - 33% qualifying).',
      '   • Mains: Descriptive Pattern on UPSC lines (1750 marks + 275 Interview).',
      '2) Non-Gazetted Combine Group B:',
      '   • Posts: Police Sub-Inspector (PSI), State Tax Inspector (STI), Assistant Section Officer (ASO), Sub-Registrar.',
      '   • Prelims: 100 marks (100 Qs, 1 hour, 1/4th negative marking).',
      '   • PSI Physical: 70 marks qualifying test + 40 marks interview.',
      '3) Non-Gazetted Combine Group C:',
      '   • Posts: Tax Assistant, Clerk-Typist, Excise Sub-Inspector, Technical Assistant.',
      '   • Typing: Marathi 30 wpm or English 40 wpm GCC-TBC certificate mandatory for clerk posts.'
    ],
    examRelevance: 'MPSC च्या सर्व परीक्षांसाठी मार्गदर्शक मूलभूत माहिती',
    relatedSubjectId: 'polity'
  },

  // =========================================================================
  // 6. CYBER SECURITY & NATIONAL AI INITIATIVES
  // =========================================================================
  {
    id: 'info_cyber_ai',
    category: 'cyber',
    titleMr: 'भारतातील सायबर सुरक्षा व राष्ट्रीय AI उपक्रम',
    titleEn: 'Cyber Security Framework & National AI Missions in India',
    subtitleMr: 'डिजिटल भारत, सुरक्षित सायबर अवकाश आणि AI महासंगणक मोहिमा',
    subtitleEn: 'Digital India, Cyber Swachhta Kendra & Indigenous Computing Power',
    badgeMr: 'विज्ञान व तंत्रज्ञान GS-4',
    badgeEn: 'Science & Tech GS-4',
    summaryMr: 'सायबर धोके रोखण्यासाठी भारताची संस्थात्मक रचना, राष्ट्रीय सायबर सुरक्षा धोरण आणि C-DAC च्या नेतृत्वाखालील अत्याधुनिक संगणकीय उपक्रम.',
    summaryEn: 'National cybersecurity policy architecture, critical information infrastructure protection, and supercomputing capabilities.',
    keyPointsMr: [
      'CERT-In (Indian Computer Emergency Response Team): सायबर धोके आणि हल्ल्यांवर २४x७ लक्ष ठेवणारी सर्वोच्च संस्था.',
      'NCIIPC (National Critical Information Infrastructure Protection Centre): बँकिंग, ऊर्जा, संरक्षण यांसारख्या अतिसंवेदनशील क्षेत्रांचे रक्षण करणारी संस्था (IT Act कलम ७०-A).',
      'सायबर स्वच्छता केंद्र (Botnet Cleaning and Malware Analysis Centre): नागरिकांच्या उपकरणांमधील मालवेअर काढण्यासाठी मोफत टूल्स पुरवणारा उपक्रम.',
      'राष्ट्रीय महासंगणक मोहीम (NSM): C-DAC व IISc द्वारे संयुक्तपणे राबवली जाणारी मोहीम. परम रुद्र, परम शक्ती, ऐरावत (AIRAWAT) सारख्या महासंगणकांची निर्मिती.'
    ],
    keyPointsEn: [
      'CERT-In: Apex national agency operating 24x7 under MeitY for incident response and threat analysis.',
      'NCIIPC: Designated under IT Act Section 70A to safeguard critical infrastructure (energy, banking, defence).',
      'Cyber Swachhta Kendra: Free botnet cleaning and malware detection service by Government of India.',
      'National Supercomputing Mission (NSM): Joint initiative of MeitY and DST building indigenous petascale supercomputers like Param Rudra and AIRAWAT.'
    ],
    examRelevance: 'MPSC राज्यसेवा GS-4 आणि चालू घडामोडी',
    relatedSubjectId: 'general_science'
  }
];
