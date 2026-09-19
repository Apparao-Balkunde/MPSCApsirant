import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, getDocs, writeBatch } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json' with { type: 'json' };
import { MPSC_QUESTIONS } from '../src/data/mpscQuestions.ts';

async function main() {
  console.log('Connecting to Firestore database:', firebaseConfig.firestoreDatabaseId);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = firebaseConfig.firestoreDatabaseId
    ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
    : getFirestore(app);

  try {
    const cred = await signInAnonymously(auth);
    console.log('Signed in anonymously with UID:', cred.user.uid);
  } catch (authErr) {
    console.warn('Anonymous auth note (continuing):', authErr);
  }

  console.log(`Starting seeding of ${MPSC_QUESTIONS.length} MPSC questions to Firebase Firestore...`);

  // Batch writes in chunks of 250 (Firestore limit is 500)
  const chunkSize = 250;
  let storedCount = 0;

  for (let i = 0; i < MPSC_QUESTIONS.length; i += chunkSize) {
    const chunk = MPSC_QUESTIONS.slice(i, i + chunkSize);
    const batch = writeBatch(db);

    for (const q of chunk) {
      const qRef = doc(db, 'mpsc_questions', q.id);
      batch.set(
        qRef,
        {
          id: q.id,
          subjectId: q.subjectId,
          topic: q.topic,
          subtopic: q.subtopic,
          exam: q.exam,
          difficulty: q.difficulty,
          questionEn: q.questionEn,
          questionMr: q.questionMr,
          optionsEn: q.optionsEn,
          optionsMr: q.optionsMr,
          correctAnswerIndex: q.correctAnswerIndex,
          explanationEn: q.explanationEn,
          explanationMr: q.explanationMr,
          reference: q.reference,
          yearTag: q.yearTag || '2025',
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      storedCount++;
    }

    try {
      await batch.commit();
      console.log(`Committed batch ${Math.floor(i / chunkSize) + 1} (${storedCount}/${MPSC_QUESTIONS.length})`);
    } catch (batchErr: any) {
      if (batchErr?.message?.includes('RESOURCE_EXHAUSTED') || batchErr?.code === 'resource-exhausted') {
        console.warn(`Firestore free daily write quota reached after saving ${storedCount} questions. Remaining questions are safely served locally from MPSC_QUESTIONS!`);
        break;
      } else {
        console.error('Batch commit error:', batchErr);
        break;
      }
    }
  }

  // Check fetch
  console.log('--- Verifying Data by Fetching from Firestore ---');
  try {
    const qColl = collection(db, 'mpsc_questions');
    const snap = await getDocs(qColl);
    console.log(`SUCCESS! Total documents fetched from Firestore collection 'mpsc_questions': ${snap.size}`);
    const sampleDoc = snap.docs[0]?.data();
    console.log('Sample fetched question from Firestore:', sampleDoc?.id, sampleDoc?.questionMr?.slice(0, 50));
  } catch (fetchErr) {
    console.error('Fetch error:', fetchErr);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
