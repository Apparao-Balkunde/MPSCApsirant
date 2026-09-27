import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, terminate } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { NEW_QUESTIONS_BATCH_2027 } from '../src/data/newQuestionsBatch2027.js';
import { QUESTIONS_SET_19 } from '../src/data/questionsSet19.js';
import { QUESTIONS_SET_20 } from '../src/data/questionsSet20.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const firebaseConfig = JSON.parse(readFileSync(join(__dirname, '../firebase-applet-config.json'), 'utf-8'));

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function seedCuratedMCQs() {
  const allMCQs = [
    ...NEW_QUESTIONS_BATCH_2027,
    ...QUESTIONS_SET_19,
    ...QUESTIONS_SET_20,
  ];

  console.log(`Starting to upload ${allMCQs.length} curated MPSC MCQs to Firestore...`);

  let count = 0;
  for (const q of allMCQs) {
    const qDocRef = doc(db, 'mpsc_questions', q.id);
    await setDoc(qDocRef, {
      ...q,
      updatedAt: new Date().toISOString(),
      source: 'curated_mpsc_batch_2027'
    }, { merge: true });
    count++;
    console.log(`[${count}/${allMCQs.length}] Uploaded: ${q.id} - ${q.topic}`);
  }

  console.log(`✅ Successfully uploaded ${count} MCQs to Firestore collection 'mpsc_questions'!`);
  await terminate(db);
}

seedCuratedMCQs().catch((err) => {
  console.error('Error seeding MCQs to Firestore:', err);
  process.exit(1);
});
