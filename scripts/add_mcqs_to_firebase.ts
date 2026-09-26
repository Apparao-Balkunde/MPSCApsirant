import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, terminate } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const firebaseConfig = JSON.parse(readFileSync(join(__dirname, '../firebase-applet-config.json'), 'utf-8'));

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export interface MCQItem {
  id: string;
  subjectId: string;
  topic: string;
  subtopic: string;
  exam: 'Rajyaseva' | 'Combine' | 'Both';
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  questionMr: string;
  questionEn: string;
  optionsMr: string[];
  optionsEn: string[];
  correctAnswerIndex: number;
  explanationMr: string;
  explanationEn: string;
  reference: string;
  yearTag: string;
}

const NEW_MPSC_MCQS: MCQItem[] = [
  {
    id: 'mpsc_polity_fb_001',
    subjectId: 'polity',
    topic: 'भारतीय संविधान व राज्यव्यवस्था',
    subtopic: 'संसदीय विशेषाधिकार व राष्ट्रपती',
    exam: 'Rajyaseva',
    difficulty: 'Hard',
    questionMr: 'भारतीय संविधानातील कलम ३६१ अन्वये राष्ट्रपती आणि राज्यपालांना मिळणाऱ्या संरक्षणाबाबत खालील विधाने विचारात घ्या:\n(अ) राष्ट्रपती किंवा राज्यपाल त्यांच्या पदाच्या अधिकारांच्या वापराबाबत कोणत्याही न्यायालयाला उत्तरदायी नसतात.\n(ब) त्यांच्या पदाच्या कालावधीत त्यांच्याविरुद्ध कोणतीही फौजदारी कारवाई सुरू करता येत नाही.\n(क) त्यांच्या वैयक्तिक कृत्यांबाबत दोन महिन्यांची आगाऊ लेखी नोटीस दिल्याशिवाय दिवाणी दावा दाखल करता येत नाही.\nवरीलपैकी कोणते/ती विधाने सत्य आहेत?',
    questionEn: 'Consider the following statements regarding the protection granted to President and Governors under Article 361 of the Indian Constitution:\n(a) They are not answerable to any court for exercise and performance of powers.\n(b) No criminal proceedings whatsoever shall be instituted against them during term of office.\n(c) Civil proceedings regarding personal acts cannot be instituted without two months advance written notice.\nWhich of the statements given above are correct?',
    optionsMr: [
      'फक्त (अ) आणि (ब)',
      'फक्त (ब) आणि (क)',
      'फक्त (अ) आणि (क)',
      'सर्व विधाने सत्य (अ, ब आणि क)'
    ],
    optionsEn: [
      'Only (a) and (b)',
      'Only (b) and (c)',
      'Only (a) and (c)',
      'All statements are correct (a, b and c)'
    ],
    correctAnswerIndex: 3,
    explanationMr: 'कलम ३६१ अंतर्गत राष्ट्रपती व राज्यपालांना विशेष अधिकार आहेत: फौजदारी खटल्यांपासून संपूर्ण मुक्ती असते, तर वैयक्तिक कृत्यांसाठी दिवाणी दावा दाखल करण्यापूर्वी २ महिन्यांची लेखी नोटीस आवश्यक असते.',
    explanationEn: 'Under Article 361, complete immunity is provided from criminal proceedings during tenure. Civil proceedings in personal capacity require 2 months advance notice.',
    reference: 'एम. लक्ष्मीकांत - भारतीय राज्यव्यवस्था (कलम ३६१)',
    yearTag: '2026'
  },
  {
    id: 'mpsc_hist_fb_002',
    subjectId: 'history',
    topic: 'महाराष्ट्राचा इतिहास व समाजसुधारक',
    subtopic: 'सत्यशोधक समाज व शेतकरी चळवळ',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: 'महात्मा जोतीराव फुले यांनी लिहिलेल्या ग्रंथांचा योग्य कालानुक्रम ओळखा:\n१. तृतीय रत्न\n२. ब्राह्मणांचे कसब\n३. शेतकऱ्याचा असूड\n४. सार्वजनिक सत्यधर्म पुस्तक',
    questionEn: 'Identify the correct chronological order of the books written by Mahatma Jyotirao Phule:\n1. Tritiya Ratna\n2. Brahmananche Kasab\n3. Shetkaryacha Asud\n4. Sarvajanik Satyadharma Pustak',
    optionsMr: [
      '१ - २ - ३ - ४',
      '२ - १ - ३ - ४',
      '१ - ३ - २ - ४',
      '२ - ३ - १ - ४'
    ],
    optionsEn: [
      '1 - 2 - 3 - 4',
      '2 - 1 - 3 - 4',
      '1 - 3 - 2 - 4',
      '2 - 3 - 1 - 4'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'तृतीय रत्न (१८५५), ब्राह्मणांचे कसब (१८६९), शेतकऱ्याचा असूड (१८८३) आणि सार्वजनिक सत्यधर्म पुस्तक (१८९१ मरणोत्तर प्रकाशित).',
    explanationEn: 'Tritiya Ratna (1855), Brahmananche Kasab (1869), Shetkaryacha Asud (1883), and Sarvajanik Satyadharma Pustak (published posthumously in 1891).',
    reference: 'डॉ. धनंजय कीर - महात्मा जोतीराव फुले चरित्र; डॉ. अनिल कठारे',
    yearTag: '2026'
  },
  {
    id: 'mpsc_geog_fb_003',
    subjectId: 'geography',
    topic: 'महाराष्ट्राचा भूगोल',
    subtopic: 'घाट व जलप्रणाली',
    exam: 'Combine',
    difficulty: 'Moderate',
    questionMr: 'सह्याद्री पर्वतातील खालील घाटांचा उत्तरेकडून दक्षिणेकडे योग्य क्रम कोणता?\n(१) थळ घाट (कसारा)\n(२) माळशेज घाट\n(३) बोर घाट\n(४) कुंभारली घाट\n(५) आंबोली घाट',
    questionEn: 'Which is the correct North to South sequence of the following ghats in Sahyadri mountain range?\n(1) Thal Ghat (Kasara)\n(2) Malshej Ghat\n(3) Bhor Ghat\n(4) Kumbharli Ghat\n(5) Amboli Ghat',
    optionsMr: [
      '१ - २ - ३ - ४ - ५',
      '१ - ३ - २ - ४ - ५',
      '२ - १ - ३ - ५ - ४',
      '१ - २ - ४ - ३ - ५'
    ],
    optionsEn: [
      '1 - 2 - 3 - 4 - 5',
      '1 - 3 - 2 - 4 - 5',
      '2 - 1 - 3 - 5 - 4',
      '1 - 2 - 4 - 3 - 5'
    ],
    correctAnswerIndex: 0,
    explanationMr: 'उत्तरेकडून दक्षिणेकडे क्रम: थळ घाट (मुंबई-नाशिक), माळशेज घाट (ठाणे-अहमदनगर), बोर घाट (मुंबई-पुणे), कुंभारली घाट (कराड-चिपळूण), आणि दक्षिणेस आंबोली घाट (सावंतवाडी-बेळगाव).',
    explanationEn: 'North to South sequence: Thal Ghat, Malshej Ghat, Bhor Ghat, Kumbharli Ghat, and southernmost Amboli Ghat.',
    reference: 'ए. बी. सवदी - महाराष्ट्राचा समग्र भूगोल',
    yearTag: '2026'
  },
  {
    id: 'mpsc_econ_fb_004',
    subjectId: 'economy',
    topic: 'भारतीय अर्थव्यवस्था व वित्तीय धोरण',
    subtopic: '१६ वा वित्त आयोग व कर वाटप',
    exam: 'Rajyaseva',
    difficulty: 'Hard',
    questionMr: '१६ व्या वित्त आयोगाबाबत खालील विधाने विचारात घ्या:\n(अ) डॉ. अरविंद पनगढिया हे १६ व्या वित्त आयोगाचे अध्यक्ष आहेत.\n(ब) संविधानातील कलम २८० नुसार राष्ट्रपतींनी या आयोगाची स्थापना केली आहे.\n(क) हा आयोग १ एप्रिल २०२६ पासून सुरू होणाऱ्या ५ वर्षांच्या कालावधीसाठी शिफारसी करेल.\nवरीलपैकी कोणती विधाने सत्य आहेत?',
    questionEn: 'Consider the following statements regarding the 16th Finance Commission:\n(a) Dr. Arvind Panagariya is the Chairman of the 16th Finance Commission.\n(b) It is constituted by the President under Article 280 of the Constitution.\n(c) The Commission will submit recommendations for a 5-year period starting April 1, 2026.\nWhich of the above statements are correct?',
    optionsMr: [
      'फक्त (अ) आणि (ब)',
      'फक्त (ब) आणि (क)',
      'फक्त (अ) आणि (क)',
      'सर्व विधाने सत्य (अ, ब आणि क)'
    ],
    optionsEn: [
      'Only (a) and (b)',
      'Only (b) and (c)',
      'Only (a) and (c)',
      'All statements (a, b and c) are correct'
    ],
    correctAnswerIndex: 3,
    explanationMr: '१६ व्या वित्त आयोगाचे अध्यक्ष नीती आयोगाचे माजी उपाध्यक्ष डॉ. अरविंद पनगढिया असून कालावधी १ एप्रिल २०२६ ते ३१ मार्च २०३१ आहे.',
    explanationEn: 'The 16th Finance Commission is chaired by Dr. Arvind Panagariya with award period 2026-2031.',
    reference: 'केंद्रीय अर्थसंकल्प २०२४-२५ / रमेश सिंग भारतीय अर्थव्यवस्था',
    yearTag: '2026'
  },
  {
    id: 'mpsc_curr_fb_005',
    subjectId: 'current',
    topic: 'महाराष्ट्र व राष्ट्रीय चालू घडामोडी २०२६',
    subtopic: 'पायाभूत सुविधा व पुरस्कार',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: 'भारतातील सर्वात लांब सागरी पूल "अटल बिहारी वाजपेयी शिवडी-न्हावा शेवा अटल सेतू" (MTHL) ची एकूण लांबी किती आहे?',
    questionEn: 'What is the total length of India’s longest sea bridge "Atal Bihari Vajpayee Sewri-Nhava Sheva Atal Setu" (MTHL)?',
    optionsMr: [
      '१६.५ किमी',
      '२१.८ किमी (ज्यापैकी १६.५ किमी समुद्रावर)',
      '२५.४ किमी',
      '१८.२ किमी'
    ],
    optionsEn: [
      '16.5 km',
      '21.8 km (of which 16.5 km is over sea)',
      '25.4 km',
      '18.2 km'
    ],
    correctAnswerIndex: 1,
    explanationMr: 'अटल सेतूची एकूण लांबी २१.८ किमी असून त्यातील १६.५ किमी सागरी भाग आहे आणि ५.५ किमी जमिनीवरील मार्ग आहे.',
    explanationEn: 'Atal Setu (MTHL) total length is 21.8 km, with 16.5 km over the Arabian Sea and 5.5 km over land.',
    reference: 'महाराष्ट्र शासन माहिती व जनसंपर्क महासंचालनालय (DGIPR)',
    yearTag: '2026'
  },
  {
    id: 'mpsc_sci_fb_006',
    subjectId: 'science',
    topic: 'सामान्य विज्ञान व आरोग्यशास्त्र',
    subtopic: 'रोग व लसीकरण',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: 'खालीलपैकी कोणता रोग विषाणूजन्य (Viral Disease) नाही?',
    questionEn: 'Which of the following is NOT a viral disease?',
    optionsMr: [
      'पोलिओ (Poliomyelitis)',
      'रेबीज (Rabies)',
      'टायफॉईड (Typhoid)',
      'हिपॅटायटीस (Hepatitis)'
    ],
    optionsEn: [
      'Poliomyelitis',
      'Rabies',
      'Typhoid',
      'Hepatitis'
    ],
    correctAnswerIndex: 2,
    explanationMr: 'टायफॉईड (विषमज्वर) हा साल्मोनेला टायफी (Salmonella typhi) नावाच्या जिवाणूमुळे (Bacteria) होतो, विषाणूमुळे नाही.',
    explanationEn: 'Typhoid is a bacterial disease caused by Salmonella typhi, not a virus.',
    reference: 'स्टेट बोर्ड सामान्य विज्ञान इयत्ता ९ वी व १० वी',
    yearTag: '2026'
  },
  {
    id: 'mpsc_mar_fb_007',
    subjectId: 'marathi',
    topic: 'मराठी व्याकरण',
    subtopic: 'समास',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: '"नीलकंठ" या सामासिक शब्दाचा योग्य समास प्रकार ओळखा:\n(विग्रह: निळा आहे कंठ ज्याचा असा तो - शंकर)',
    questionEn: 'Identify the correct compound type (Samas) for the word "Neelkanth":',
    optionsMr: [
      'कर्मधारय समास',
      'बहुव्रीही समास',
      'तत्पुरुष समास',
      'द्विगु समास'
    ],
    optionsEn: [
      'Karmadharaya Samas',
      'Bahuvrihi Samas',
      'Tatpurush Samas',
      'Dvigu Samas'
    ],
    correctAnswerIndex: 1,
    explanationMr: 'ज्या सामासिक शब्दातील दोन्ही पदे प्रमुख नसून त्यावरून तिसऱ्याच घटकाचा बोध होतो, त्यास बहुव्रीही समास म्हणतात. नीलकंठ = शंकर.',
    explanationEn: 'When neither member of compound is principal and the whole indicates a third entity, it is Bahuvrihi Samas.',
    reference: 'मो. रा. वाळंबे - सुगम मराठी व्याकरण व लेखन',
    yearTag: '2026'
  },
  {
    id: 'mpsc_eng_fb_008',
    subjectId: 'english',
    topic: 'English Grammar',
    subtopic: 'Subject-Verb Agreement',
    exam: 'Both',
    difficulty: 'Hard',
    questionMr: 'खालील वाक्यातील रिकाम्या जागेसाठी योग्य पर्याय निवडा:\n"Neither the Collector nor the Deputy Collectors ________ present at the disaster management meeting yesterday."',
    questionEn: 'Choose the correct verb to fill in the blank:\n"Neither the Collector nor the Deputy Collectors ________ present at the disaster management meeting yesterday."',
    optionsMr: [
      'was',
      'were',
      'is',
      'are'
    ],
    optionsEn: [
      'was',
      'were',
      'is',
      'are'
    ],
    correctAnswerIndex: 1,
    explanationMr: 'जेव्हा दोन कर्ते "neither... nor" ने जोडलेले असतात, तेव्हा क्रियापद जवळच्या कर्त्यानुसार बदलते. येथे "Deputy Collectors" अनेकवचनी असून भूतकाळ असल्याने "were" योग्य आहे.',
    explanationEn: 'With "neither... nor", the verb agrees with the closer subject. Here "Deputy Collectors" is plural and past tense, so "were" is correct.',
    reference: 'Wren & Martin High School English Grammar',
    yearTag: '2026'
  }
];

async function addMCQsToFirebase() {
  console.log(`Starting to add ${NEW_MPSC_MCQS.length} MCQs to Firebase Firestore...`);
  let added = 0;
  for (const q of NEW_MPSC_MCQS) {
    try {
      const qRef = doc(db, 'mpsc_questions', q.id);
      await setDoc(
        qRef,
        {
          ...q,
          updatedAt: new Date().toISOString(),
          source: 'Curated MPSC Question Bank',
        },
        { merge: true }
      );
      added++;
      console.log(`✔ Added [${q.id}] - ${q.subjectId}: ${q.questionMr.slice(0, 35)}...`);
    } catch (err: any) {
      console.error(`✖ Failed to add ${q.id}:`, err?.message);
    }
  }

  console.log(`\n🎉 Completed! Successfully added ${added}/${NEW_MPSC_MCQS.length} MCQs to Firestore.`);
  await terminate(db);
  process.exit(0);
}

addMCQsToFirebase().catch((err) => {
  console.error('Fatal error adding MCQs to Firestore:', err);
  process.exit(1);
});
