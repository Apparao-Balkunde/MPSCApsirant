import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  getDoc, 
  query, 
  limit, 
  writeBatch 
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Question } from '../types';
import { isFirestoreQuotaExceeded, handleFirestoreError, OperationType } from './firestoreSync';
import { MPSC_QUESTIONS } from '../data/mpscQuestions';
import { CURRENT_AFFAIRS_2026_27 } from '../data/currentAffairs2026_27';

export interface DailyQuizAttempt {
  userId: string;
  date: string; // YYYY-MM-DD
  score: number;
  totalQuestions: number; // 5
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  accuracy: number;
  timeTakenSeconds: number;
  answers: Record<string, number>; // questionId -> selectedOptionIndex
  completedAt: string;
}

/**
 * Returns today's date formatted as YYYY-MM-DD in user's local timezone.
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Default 5 high-yield curated questions for today's daily quiz seed/fallback.
 * Spans: 21 Oct Commemoration / Current Affairs, Polity, Maharashtra History, Maharashtra Geography, General Science.
 */
export const CURATED_DEFAULT_DAILY_QUESTIONS: Question[] = [
  // 1. Current Affairs & 21 October Special
  {
    id: 'daily_q_2026_01',
    subjectId: 'current_affairs',
    topic: 'National Days & Commemorations',
    subtopic: 'National Police Commemoration Day (21 October)',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: "दरवर्षी '२१ ऑक्टोबर' हा दिवस भारतात 'राष्ट्रीय पोलीस स्मृतिदिन' (Police Commemoration Day) म्हणून कोणत्या ऐतिहासिक घटनेच्या स्मरणार्थ पाळला जातो?",
    questionEn: "Every year on 21st October, India observes 'National Police Commemoration Day'. In memory of which historic supreme sacrifice was this date chosen?",
    optionsMr: [
      "१९५९ मध्ये लडाखमधील हॉट स्प्रिंग्स (Hot Springs) येथे चिनी सैन्याशी लढताना १० CRPF जवानांचे झालेले सर्वोच्च बलिदान",
      "१९४७ मध्ये काश्मीर सीमेवर पाकिस्तानी सैन्याविरुद्ध लढताना जवानांचे बलिदान",
      "१९६२ च्या भारत-चीन युद्धातील रेझांग ला येथील सैनिकांचे शौर्य",
      "२६/११ मुंबई दहशतवादी हल्ल्यातील पोलीस अधिकाऱ्यांचे हौतात्म्य"
    ],
    optionsEn: [
      "Supreme sacrifice of 10 CRPF personnel fighting Chinese troops at Hot Springs in Ladakh (1959)",
      "Martyrdom of Indian soldiers fighting Pakistani troops in Kashmir (1947)",
      "Bravery of soldiers at the Battle of Rezang La during Sino-Indian War (1962)",
      "Sacrifice of Maharashtra Police officers during 26/11 Mumbai attacks (2008)"
    ],
    correctAnswerIndex: 0,
    explanationMr: "२१ ऑक्टोबर १९५९ रोजी लडाखमधील 'हॉट स्प्रिंग्स' येथे १५,००० फूट उंचीवर तैनात असलेल्या केंद्रीय राखीव पोलीस दलाच्या (CRPF) तुकडीवर चिनी सैन्याने हल्ला केला होता, ज्यात १० जवान शहीद झाले. त्यांच्या स्मरणार्थ दरवर्षी २१ ऑक्टोबर हा राष्ट्रीय पोलीस स्मृतिदिन म्हणून पाळला जातो.",
    explanationEn: "On 21st October 1959, 10 CRPF personnel made the supreme sacrifice fighting Chinese troops at Hot Springs, Ladakh at an altitude of over 15,000 feet. The day is observed across India to honor all martyred police personnel.",
    reference: "Ministry of Home Affairs (MHA) & National Police Memorial",
    yearTag: "MPSC 2026/27 Special"
  },
  // 2. Polity: 106th Constitutional Amendment Act
  {
    id: 'daily_q_2026_02',
    subjectId: 'polity',
    topic: 'Constitutional Amendments',
    subtopic: '106th Amendment Act (Nari Shakti Vandan Adhiniyam)',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: "भारतीय राज्यघटनेच्या १०६ व्या घटनादुरुस्ती कायद्याद्वारे (नारी शक्ती वंदन अधिनियम) लोकसभा आणि राज्य विधानसभांमध्ये महिलांसाठी किती टक्के जागा राखीव ठेवण्याची तरतूद करण्यात आली आहे?",
    questionEn: "Under the 106th Constitutional Amendment Act (Nari Shakti Vandan Adhiniyam), what percentage of seats are reserved for women in the Lok Sabha and State Legislative Assemblies?",
    optionsMr: [
      "३३% (एक तृतीयांश जागा)",
      "५०% जागा",
      "२५% जागा",
      "३०% जागा"
    ],
    optionsEn: [
      "33% (One-third of total seats)",
      "50% of total seats",
      "25% of total seats",
      "30% of total seats"
    ],
    correctAnswerIndex: 0,
    explanationMr: "१०६ व्या घटनादुरुस्ती कायद्यानुसार लोकसभा आणि राज्य विधानसभांमध्ये महिलांसाठी ३३% (१/३) आरक्षण देण्यात आले आहे. यात अनुसूचित जाती/जमातींच्या महिलांचाही समावेश असून हे आरक्षण १५ वर्षांच्या कालावधीसाठी लागू असेल.",
    explanationEn: "The 106th Constitutional Amendment Act reserves one-third (33%) of seats for women in the Lok Sabha and State Legislative Assemblies for an initial period of 15 years.",
    reference: "Gazette of India, Ministry of Law and Justice",
    yearTag: "MPSC 2026/27 Special"
  },
  // 3. Maharashtra History: Social Reformers
  {
    id: 'daily_q_2026_03',
    subjectId: 'maharashtra_history',
    topic: 'Social Reformers of Maharashtra',
    subtopic: 'Mahatma Jyotirao Phule & Satyashodhak Samaj',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: "महात्मा ज्योतिराव फुले यांनी २४ सप्टेंबर १८७३ रोजी पुणे येथे सत्यशोधक समाजाची स्थापना केली. या समाजाचे अधिकृत ब्रीदवाक्य कोणते होते?",
    questionEn: "Mahatma Jyotirao Phule founded the Satyashodhak Samaj in Pune on 24 September 1873. What was the official motto of this society?",
    optionsMr: [
      "'सर्वसाक्षी जगत्पती । त्यासी नकोच मध्यस्थी ॥'",
      "'अहिंसा परमो धर्मः'",
      "'सत्यमेव जयते'",
      "'विद्येविना मती गेली, मतीविना नीती गेली'"
    ],
    optionsEn: [
      "'Sarvasakshi Jagatpati, Tyasi Nakocha Madhyasthi' (God is omnipresent, requires no mediator)",
      "'Ahimsa Paramo Dharmah'",
      "'Satyameva Jayate'",
      "'Vidyevina Mati Geli...'"
    ],
    correctAnswerIndex: 0,
    explanationMr: "सत्यशोधक समाजाचे अधिकृत ब्रीदवाक्य 'सर्वसाक्षी जगत्पती । त्यासी नकोच मध्यस्थी ॥' हे होते. ईश्वर आणि भक्त यांच्यामध्ये कोणत्याही मध्यस्थाची (पुरोहितांची) गरज नाही, हा यामागचा मूळ विचार होता.",
    explanationEn: "The motto of Satyashodhak Samaj was 'Sarvasakshi Jagatpati, Tyasi Nakocha Madhyasthi'—emphasizing that the Creator needs no intermediary between God and human beings.",
    reference: "Maharashtra State Board History Textbook / Dr. Baba Adhav",
    yearTag: "MPSC 2026/27 Special"
  },
  // 4. Maharashtra Geography: Mountain Passes (Ghats)
  {
    id: 'daily_q_2026_04',
    subjectId: 'maharashtra_geography',
    topic: 'Physical Geography of Maharashtra',
    subtopic: 'Western Ghats & Mountain Passes',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: "पुणे ते मुंबई या महामार्गावर सह्याद्री पर्वतरांगेतील कोणता महत्त्वाचा घाट (Pass) येतो?",
    questionEn: "Which major mountain pass (ghat) in the Sahyadri range connects Pune to Mumbai?",
    optionsMr: [
      "बोर घाट (Bor Ghat / खंडाळा घाट)",
      "थळ घाट (कसारा घाट)",
      "कुंभार्ली घाट",
      "आंबा घाट"
    ],
    optionsEn: [
      "Bor Ghat (Khandala Ghat)",
      "Thal Ghat (Kasara Ghat)",
      "Kumbharli Ghat",
      "Amba Ghat"
    ],
    correctAnswerIndex: 0,
    explanationMr: "पुणे-मुंबई दरम्यान 'बोर घाट' (खंडाळा घाट) येतो. मुंबई-नाशिक दरम्यान 'थळ घाट' (कसारा घाट), कराड-चिपळूण दरम्यान 'कुंभार्ली घाट', आणि कोल्हापूर-रत्नागिरी दरम्यान 'आंबा घाट' येतो.",
    explanationEn: "Bor Ghat (Khandala Ghat) connects Mumbai and Pune. Thal Ghat connects Mumbai-Nashik, Kumbharli Ghat connects Karad-Chiplun, and Amba Ghat connects Kolhapur-Ratnagiri.",
    reference: "Maharashtra Geography Atlas / State Board Standard 10",
    yearTag: "MPSC 2026/27 Special"
  },
  // 5. General Science: Space & Physics
  {
    id: 'daily_q_2026_05',
    subjectId: 'general_science',
    topic: 'Space Exploration & Physics',
    subtopic: 'ISRO Gaganyaan Mission',
    exam: 'Both',
    difficulty: 'Moderate',
    questionMr: "भारतीय अंतराळ संशोधन संस्थेच्या (ISRO) 'गगनयान' या मानवी अंतराळ मोहिमेसाठी कोणत्या प्रक्षेपकाचा (Launch Vehicle) वापर केला जाणार आहे?",
    questionEn: "Which launch vehicle will be utilized by the Indian Space Research Organisation (ISRO) for its prestigious human spaceflight mission 'Gaganyaan'?",
    optionsMr: [
      "LVM3 (Human Rated Launch Vehicle Mark-3 / GSLV Mk-III)",
      "PSLV-C56",
      "SSLV-D2",
      "GSLV-F12"
    ],
    optionsEn: [
      "LVM3 (Launch Vehicle Mark-3 / HLVM3)",
      "PSLV-C56",
      "SSLV-D2",
      "GSLV-F12"
    ],
    correctAnswerIndex: 0,
    explanationMr: "इस्रोच्या गगनयान मोहिमेसाठी मानवी सुरक्षिततेसाठी प्रमाणित करण्यात आलेल्या 'HLVM3' (Human-rated LVM3 / GSLV Mk-III) प्रक्षेपकाचा वापर केला जाईल. हे रॉकेट ४०० किमी पृथ्वीच्या कक्षेत मानवासह क्रू मॉड्यूल घेऊन जाईल.",
    explanationEn: "ISRO's Gaganyaan mission will utilize the Human-Rated Launch Vehicle Mark 3 (HLVM3), configured to safely propel Indian astronauts (Vyomnauts) to a 400 km Low Earth Orbit.",
    reference: "ISRO Official Gaganyaan Mission Profile",
    yearTag: "MPSC 2026/27 Special"
  }
];

/**
 * Seeds the curated 5 daily questions into Firestore collection `daily_questions`
 */
export async function seedDailyQuestionsToFirestore(questions: Question[] = CURATED_DEFAULT_DAILY_QUESTIONS): Promise<boolean> {
  if (!db || isFirestoreQuotaExceeded()) return false;
  try {
    const batch = writeBatch(db);
    const today = getTodayDateString();
    questions.forEach((q) => {
      const qRef = doc(db, 'daily_questions', q.id);
      batch.set(qRef, {
        ...q,
        date: today,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    });
    await batch.commit();
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, 'daily_questions');
    return false;
  }
}

/**
 * Fetches 5 curated questions from Firestore `daily_questions` collection.
 * Gracefully falls back to curated default questions if offline or empty.
 */
export async function fetchDailyQuestions(fallbackPool?: Question[]): Promise<Question[]> {
  const today = getTodayDateString();

  if (db && !isFirestoreQuotaExceeded()) {
    try {
      const qColl = collection(db, 'daily_questions');
      const snap = await getDocs(query(qColl, limit(15)));

      if (!snap.empty && snap.docs.length >= 5) {
        const firestoreQuestions: Question[] = [];
        snap.forEach((d) => {
          const data = d.data();
          if (data && data.questionMr && data.optionsMr) {
            firestoreQuestions.push(data as Question);
          }
        });

        if (firestoreQuestions.length >= 5) {
          // Take first 5 curated
          return firestoreQuestions.slice(0, 5);
        }
      } else {
        // Collection is empty or has < 5 questions: automatically seed default 5 to Firestore
        await seedDailyQuestionsToFirestore(CURATED_DEFAULT_DAILY_QUESTIONS);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'daily_questions');
    }
  }

  // Fallback to high-yield curated questions (from CURRENT_AFFAIRS_2026_27 or CURATED_DEFAULT_DAILY_QUESTIONS)
  if (fallbackPool && fallbackPool.length >= 5) {
    return fallbackPool.slice(0, 5);
  }
  return CURATED_DEFAULT_DAILY_QUESTIONS;
}

/**
 * Checks if the current user has already taken today's quiz.
 * Strictly enforces ONE quiz per user per calendar day.
 */
export async function checkUserDailyQuizAttempt(userId?: string): Promise<{ attempted: boolean; attempt?: DailyQuizAttempt }> {
  const today = getTodayDateString();
  const effectiveUserId = userId || auth.currentUser?.uid || 'guest';
  const localKey = `mpsc_daily_quiz_attempt_${today}_${effectiveUserId}`;
  const genericTodayKey = `mpsc_daily_quiz_attempt_${today}_latest`;

  // 1. Check local storage first (instant response)
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(localKey) || localStorage.getItem(genericTodayKey);
      if (stored) {
        const parsed = JSON.parse(stored) as DailyQuizAttempt;
        if (parsed && parsed.date === today) {
          return { attempted: true, attempt: parsed };
        }
      }
    }
  } catch {
    // ignore
  }

  // 2. Check Firestore if authenticated and online
  if (db && effectiveUserId && effectiveUserId !== 'guest' && !isFirestoreQuotaExceeded()) {
    try {
      const attemptDocRef = doc(db, 'users', effectiveUserId, 'dailyQuizAttempts', today);
      const attemptSnap = await getDoc(attemptDocRef);
      if (attemptSnap.exists()) {
        const attemptData = attemptSnap.data() as DailyQuizAttempt;
        // Cache to local storage
        if (typeof window !== 'undefined') {
          localStorage.setItem(localKey, JSON.stringify(attemptData));
          localStorage.setItem(genericTodayKey, JSON.stringify(attemptData));
        }
        return { attempted: true, attempt: attemptData };
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, `users/${effectiveUserId}/dailyQuizAttempts/${today}`);
    }
  }

  return { attempted: false };
}

/**
 * Records user's completed daily quiz attempt in Firestore and local persistence.
 */
export async function recordDailyQuizAttempt(attempt: DailyQuizAttempt): Promise<boolean> {
  const today = attempt.date || getTodayDateString();
  const effectiveUserId = attempt.userId || auth.currentUser?.uid || 'guest';
  const localKey = `mpsc_daily_quiz_attempt_${today}_${effectiveUserId}`;
  const genericTodayKey = `mpsc_daily_quiz_attempt_${today}_latest`;

  // 1. Save to local storage immediately
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(localKey, JSON.stringify(attempt));
      localStorage.setItem(genericTodayKey, JSON.stringify(attempt));
    }
  } catch {
    // ignore
  }

  // 2. Write to Firestore subcollection /users/{userId}/dailyQuizAttempts/{today}
  if (db && effectiveUserId && effectiveUserId !== 'guest' && !isFirestoreQuotaExceeded()) {
    try {
      const attemptDocRef = doc(db, 'users', effectiveUserId, 'dailyQuizAttempts', today);
      await setDoc(attemptDocRef, {
        ...attempt,
        userId: effectiveUserId,
        date: today,
        completedAt: attempt.completedAt || new Date().toISOString()
      }, { merge: true });
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${effectiveUserId}/dailyQuizAttempts/${today}`);
    }
  }

  return true;
}
