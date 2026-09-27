import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, terminate } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { QUESTIONS_SET_23 } from '../src/data/questionsSet23.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const firebaseConfig = JSON.parse(readFileSync(join(__dirname, '../firebase-applet-config.json'), 'utf-8'));

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function seedSet23() {
  const newMCQs = [
    ...QUESTIONS_SET_23,
  ];

  console.log(`Starting to seed ${newMCQs.length} new MCQs (Set 23) into Firestore collection 'mpsc_questions'...`);

  let count = 0;
  for (const q of newMCQs) {
    const qDocRef = doc(db, 'mpsc_questions', q.id);
    await setDoc(qDocRef, {
      ...q,
      updatedAt: new Date().toISOString(),
      source: 'curated_mpsc_batch_set_23'
    }, { merge: true });
    count++;
    console.log(`✔ [${count}/${newMCQs.length}] Uploaded: ${q.id} - ${q.topic} (${q.subtopic})`);
  }

  console.log(`🎉 Successfully uploaded ${count} new MCQs from Set 23 to Firebase Firestore!`);
  await terminate(db);
}

seedSet23().catch((err) => {
  console.error('Error uploading Set 23 to Firestore:', err);
  process.exit(1);
});
