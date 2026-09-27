import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, terminate } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { QUESTIONS_SET_21 } from '../src/data/questionsSet21.js';
import { QUESTIONS_SET_22 } from '../src/data/questionsSet22.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const firebaseConfig = JSON.parse(readFileSync(join(__dirname, '../firebase-applet-config.json'), 'utf-8'));

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function seedNextBatch() {
  const nextMCQs = [
    ...QUESTIONS_SET_21,
    ...QUESTIONS_SET_22,
  ];

  console.log(`Starting to seed ${nextMCQs.length} new MCQs (Sets 21 & 22) into Firestore collection 'mpsc_questions'...`);

  let count = 0;
  for (const q of nextMCQs) {
    const qDocRef = doc(db, 'mpsc_questions', q.id);
    await setDoc(qDocRef, {
      ...q,
      updatedAt: new Date().toISOString(),
      source: 'curated_mpsc_batch_sets_21_22'
    }, { merge: true });
    count++;
    console.log(`✔ [${count}/${nextMCQs.length}] Uploaded: ${q.id} - ${q.topic} (${q.subtopic})`);
  }

  console.log(`🎉 Successfully uploaded ${count} new MCQs to Firebase Firestore!`);
  await terminate(db);
}

seedNextBatch().catch((err) => {
  console.error('Error uploading Sets 21 & 22 to Firestore:', err);
  process.exit(1);
});
