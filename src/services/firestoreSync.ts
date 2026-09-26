import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  query, 
  limit, 
  orderBy,
  writeBatch,
  onSnapshot,
  deleteDoc,
  Unsubscribe
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { UserProgress, ExamResult, StudySessionLog, Question, LeaderboardEntry } from '../types';
import { saveUserProgress } from '../utils/storage';
import { MPSC_QUESTIONS } from '../data/mpscQuestions';

// Firebase error handling conforming to Firebase skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

// Global quota circuit-breaker: When Firestore free-tier daily read/write quota (50,000 reads/day) is reached,
// the app stops sending network requests and seamlessly functions offline with local storage.
let firestoreQuotaExceeded = false;
try {
  firestoreQuotaExceeded = typeof window !== 'undefined' && sessionStorage.getItem('mpsc_firestore_quota_exceeded') === 'true';
} catch {
  // ignore
}

export function isFirestoreQuotaExceeded(): boolean {
  return firestoreQuotaExceeded;
}

export function setFirestoreQuotaExceeded(val: boolean): void {
  firestoreQuotaExceeded = val;
  try {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('mpsc_firestore_quota_exceeded', val ? 'true' : 'false');
    }
  } catch {
    // ignore
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errMsg = error instanceof Error ? error.message : String(error);
  const isQuota =
    errMsg.toLowerCase().includes('quota limit exceeded') ||
    errMsg.toLowerCase().includes('resource_exhausted') ||
    errMsg.toLowerCase().includes('quota exceeded');

  if (isQuota) {
    setFirestoreQuotaExceeded(true);
    console.warn(
      `[Firestore Note] Free tier daily quota reached (Operation: ${operationType}, Path: ${path}). Seamlessly continuing in robust local/offline storage mode.`
    );
    return {
      error: errMsg,
      authInfo: {
        userId: auth.currentUser?.uid,
      },
      operationType,
      path,
    };
  }

  const errInfo: FirestoreErrorInfo = {
    error: errMsg,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  return errInfo;
}

export interface SyncSummary {
  success: boolean;
  examsStored: number;
  logsStored: number;
  bookmarksStored: number;
  questionsStored: number;
  error?: string;
}

export interface FetchSummary {
  success: boolean;
  examsCount: number;
  logsCount: number;
  bookmarksCount: number;
  questionsCount: number;
  fromFirestore: boolean;
}

/**
 * Real-time listener for the entire MPSC Question Bank from Firestore.
 * If quota is reached or db is absent, safely returns local questions.
 */
export function subscribeToRealtimeQuestions(
  onUpdate: (questions: Question[]) => void
): Unsubscribe | null {
  if (!db || isFirestoreQuotaExceeded()) {
    onUpdate(MPSC_QUESTIONS);
    return null;
  }

  try {
    const qColl = collection(db, 'mpsc_questions');
    return onSnapshot(
      qColl,
      async (snap) => {
        if (!snap.empty && snap.docs.length > 0) {
          const fetched: Question[] = [];
          snap.forEach((d) => {
            fetched.push(d.data() as Question);
          });
          onUpdate(fetched);
        } else {
          // If empty in Firestore, seed standard questions once
          await seedMPSCQuestionsToFirestore();
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'mpsc_questions');
        // Fallback to local questions so app keeps running seamlessly
        onUpdate(MPSC_QUESTIONS);
      }
    );
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'mpsc_questions');
    onUpdate(MPSC_QUESTIONS);
    return null;
  }
}

/**
 * Fetches the entire MPSC Question Bank from Firestore collection 'mpsc_questions'.
 */
export async function fetchMPSCQuestionsFromFirestore(): Promise<{
  questions: Question[];
  fromFirestore: boolean;
  count: number;
}> {
  if (!db) {
    return { questions: MPSC_QUESTIONS, fromFirestore: false, count: MPSC_QUESTIONS.length };
  }

  try {
    const qColl = collection(db, 'mpsc_questions');
    const snap = await getDocs(qColl);
    if (!snap.empty && snap.docs.length > 0) {
      const fetched: Question[] = [];
      snap.forEach((docSnap) => {
        fetched.push(docSnap.data() as Question);
      });
      return { questions: fetched, fromFirestore: true, count: fetched.length };
    } else {
      const seeded = await seedMPSCQuestionsToFirestore();
      return { questions: MPSC_QUESTIONS, fromFirestore: true, count: seeded || MPSC_QUESTIONS.length };
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, 'mpsc_questions');
    return { questions: MPSC_QUESTIONS, fromFirestore: false, count: MPSC_QUESTIONS.length };
  }
}

/**
 * Stores a single newly created or edited question directly to Firestore
 */
export async function storeSingleQuestionToFirestore(question: Question): Promise<boolean> {
  if (!db || !question.id) return false;
  const path = `mpsc_questions/${question.id}`;
  try {
    const qRef = doc(db, 'mpsc_questions', question.id);
    await setDoc(
      qRef,
      {
        ...question,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
    return false;
  }
}

/**
 * Stores multiple questions to Firestore in batch
 */
export async function bulkStoreMCQsToFirestore(questionsToStore: Question[]): Promise<number> {
  if (!db || questionsToStore.length === 0) return 0;
  try {
    const batch = writeBatch(db);
    let count = 0;
    for (const q of questionsToStore) {
      if (!q.id) continue;
      const qRef = doc(db, 'mpsc_questions', q.id);
      batch.set(
        qRef,
        {
          ...q,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      count++;
    }
    await batch.commit();
    return count;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, 'mpsc_questions');
    return 0;
  }
}

/**
 * Immediately stores a single completed exam result to Firestore
 * and synchronizes the user's top-level leaderboard statistics in real-time.
 */
export async function storeSingleExamResultToFirestore(
  userId: string,
  exam: ExamResult,
  currentProgress?: UserProgress
): Promise<boolean> {
  if (!db || !userId || !exam.sessionId) return false;
  const examPath = `users/${userId}/examResults/${exam.sessionId}`;
  try {
    const examDocRef = doc(db, 'users', userId, 'examResults', exam.sessionId);
    await setDoc(
      examDocRef,
      {
        userId,
        examId: exam.sessionId,
        examTitle: exam.title,
        examType: exam.patternId,
        score: exam.finalScore,
        totalQuestions: exam.totalQuestions,
        attemptedCount: exam.attemptedCount,
        correctCount: exam.correctCount,
        incorrectCount: exam.incorrectCount,
        accuracy: exam.accuracyPercentage,
        timeTakenSeconds: exam.timeSpentSeconds,
        date: exam.date,
        timestamp: exam.timestamp || Date.now(),
      },
      { merge: true }
    );

    // Also update user's top-level score and statistics for the real-time leaderboard
    if (currentProgress) {
      const allHistory = [exam, ...(currentProgress.history || []).filter((h) => h.sessionId !== exam.sessionId)];
      const totalScore = Number(allHistory.reduce((sum, h) => sum + (h.finalScore || 0), 0).toFixed(1));
      const totalAttempted = allHistory.reduce((acc, h) => acc + (h.attemptedCount || 0), 0);
      const totalCorrect = allHistory.reduce((acc, h) => acc + (h.correctCount || 0), 0);
      const averageAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

      const userDocRef = doc(db, 'users', userId);
      await setDoc(
        userDocRef,
        {
          userId,
          displayName: auth.currentUser?.displayName || (auth.currentUser?.email ? auth.currentUser.email.split('@')[0] : 'अभ्यासक'),
          email: auth.currentUser?.email || null,
          totalExamScore: totalScore,
          examsCount: allHistory.length,
          averageAccuracy,
          roleTag: exam.patternId.includes('rajyaseva') ? 'राज्यसेवा उमेदवार' : 'संयुक्त गट-ब/क उमेदवार',
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    }

    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, examPath);
    return false;
  }
}

/**
 * Immediately stores a single study session log to Firestore
 */
export async function storeSingleStudyLogToFirestore(
  userId: string,
  log: StudySessionLog
): Promise<boolean> {
  if (!db || !userId || !log.id) return false;
  const logPath = `users/${userId}/studyLogs/${log.id}`;
  try {
    const logDocRef = doc(db, 'users', userId, 'studyLogs', log.id);
    await setDoc(
      logDocRef,
      {
        userId,
        title: log.title,
        durationMinutes: log.durationMinutes,
        questionsSolved: log.questionsSolved,
        notes: log.notes || null,
        date: log.dateStr,
        timestamp: log.timestamp || Date.now(),
      },
      { merge: true }
    );
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, logPath);
    return false;
  }
}

/**
 * Real-time listener for the authenticated user's profile and exam history
 */
export function subscribeToRealtimeUserData(
  userId: string,
  currentLocal: UserProgress,
  onUpdate: (progress: UserProgress) => void
): Unsubscribe | null {
  if (!userId || !db || isFirestoreQuotaExceeded()) return null;

  try {
    const userDocRef = doc(db, 'users', userId);
    return onSnapshot(
      userDocRef,
      async (userSnap) => {
        if (!userSnap.exists()) return;
        const remoteData = userSnap.data();

        // Fetch subcollection exams
        const examsRef = collection(db, 'users', userId, 'examResults');
        const examsQuery = query(examsRef, orderBy('timestamp', 'desc'), limit(50));
        let remoteExams: ExamResult[] = [];
        try {
          const examsSnap = await getDocs(examsQuery);
          remoteExams = examsSnap.docs.map((d) => d.data() as ExamResult);
        } catch {
          // ignore
        }

        const mergedBookmarks = Array.from(
          new Set([...currentLocal.bookmarkedQuestionIds, ...(remoteData.bookmarkedQuestionIds || [])])
        );

        const examMap = new Map<string, ExamResult>();
        currentLocal.history.forEach((e) => examMap.set(e.sessionId, e));
        remoteExams.forEach((e) => {
          if (e.sessionId && !examMap.has(e.sessionId)) {
            examMap.set(e.sessionId, e);
          }
        });
        const mergedHistory = Array.from(examMap.values()).sort(
          (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
        );

        const updated: UserProgress = {
          ...currentLocal,
          bookmarkedQuestionIds: mergedBookmarks,
          history: mergedHistory,
          weeklyTargetHours: remoteData.targetHoursPerWeek || currentLocal.weeklyTargetHours,
          weeklyTargetQuestions: remoteData.targetQuestionsPerWeek || currentLocal.weeklyTargetQuestions,
          streakDays: Math.max(remoteData.streakDays || 1, currentLocal.streakDays),
        };

        saveUserProgress(updated);
        onUpdate(updated);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, `users/${userId}`);
      }
    );
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `users/${userId}`);
    return null;
  }
}

/**
 * Fetches all user data (profile, exams, logs) directly from Firestore
 */
export async function fetchUserDataFromFirestore(
  userId: string,
  currentLocal: UserProgress
): Promise<{
  progress: UserProgress;
  examsCount: number;
  logsCount: number;
  bookmarksCount: number;
  success: boolean;
}> {
  if (!userId || !db) {
    return {
      progress: currentLocal,
      examsCount: 0,
      logsCount: 0,
      bookmarksCount: 0,
      success: false,
    };
  }

  try {
    const userDocRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userDocRef);

    let remoteData: any = {};
    if (userSnap.exists()) {
      remoteData = userSnap.data();
    }

    // Fetch exams
    const examsRef = collection(db, 'users', userId, 'examResults');
    const examsQuery = query(examsRef, orderBy('timestamp', 'desc'), limit(50));
    let remoteExams: ExamResult[] = [];
    try {
      const examsSnap = await getDocs(examsQuery);
      remoteExams = examsSnap.docs.map((d) => d.data() as ExamResult);
    } catch (e) {
      console.warn('Fetch exams error or empty:', e);
    }

    // Fetch logs
    const logsRef = collection(db, 'users', userId, 'studyLogs');
    const logsQuery = query(logsRef, orderBy('timestamp', 'desc'), limit(50));
    let remoteLogs: StudySessionLog[] = [];
    try {
      const logsSnap = await getDocs(logsQuery);
      remoteLogs = logsSnap.docs.map((d) => d.data() as StudySessionLog);
    } catch (e) {
      console.warn('Fetch logs error or empty:', e);
    }

    const mergedBookmarks = Array.from(
      new Set([...currentLocal.bookmarkedQuestionIds, ...(remoteData.bookmarkedQuestionIds || [])])
    );

    const examMap = new Map<string, ExamResult>();
    currentLocal.history.forEach((e) => examMap.set(e.sessionId, e));
    remoteExams.forEach((e) => {
      if (e.sessionId && !examMap.has(e.sessionId)) {
        examMap.set(e.sessionId, e);
      }
    });
    const mergedHistory = Array.from(examMap.values()).sort(
      (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
    );

    const logMap = new Map<string, StudySessionLog>();
    (currentLocal.studyLogs || []).forEach((l) => logMap.set(l.id, l));
    remoteLogs.forEach((l) => {
      if (l.id && !logMap.has(l.id)) {
        logMap.set(l.id, l);
      }
    });
    const mergedLogs = Array.from(logMap.values()).sort(
      (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
    );

    const updated: UserProgress = {
      ...currentLocal,
      bookmarkedQuestionIds: mergedBookmarks,
      history: mergedHistory,
      studyLogs: mergedLogs,
      weeklyTargetHours: remoteData.targetHoursPerWeek || currentLocal.weeklyTargetHours,
      weeklyTargetQuestions: remoteData.targetQuestionsPerWeek || currentLocal.weeklyTargetQuestions,
      streakDays: Math.max(remoteData.streakDays || 1, currentLocal.streakDays),
    };

    saveUserProgress(updated);

    return {
      progress: updated,
      examsCount: remoteExams.length,
      logsCount: remoteLogs.length,
      bookmarksCount: mergedBookmarks.length,
      success: true,
    };
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `users/${userId}`);
    return {
      progress: currentLocal,
      examsCount: 0,
      logsCount: 0,
      bookmarksCount: 0,
      success: false,
    };
  }
}

/**
 * Seeds or synchronizes the curated MPSC Question Bank to Firestore under /mpsc_questions/{questionId}
 */
export async function seedMPSCQuestionsToFirestore(): Promise<number> {
  if (!db) return 0;
  try {
    let count = 0;
    const chunkSize = 20;
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
            yearTag: q.yearTag || null,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
        count++;
      }
      await batch.commit();
    }
    return count;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, 'mpsc_questions');
    return 0;
  }
}

/**
 * Saves all user data, exams, study logs, bookmarks, and questions to Firestore
 */
export async function syncAllDataToFirestore(
  userId: string,
  progress: UserProgress,
  userEmail?: string | null,
  displayName?: string | null
): Promise<SyncSummary> {
  if (!userId || !db) {
    return {
      success: false,
      examsStored: 0,
      logsStored: 0,
      bookmarksStored: 0,
      questionsStored: 0,
      error: 'User not authenticated or Firestore not initialized',
    };
  }

  try {
    const userDocRef = doc(db, 'users', userId);

    const totalExamScore = Number(
      (progress.history || []).reduce((sum, h) => sum + (h.finalScore || 0), 0).toFixed(1)
    );
    const totalAttempted = (progress.history || []).reduce((acc, h) => acc + (h.attemptedCount || 0), 0);
    const totalCorrect = (progress.history || []).reduce((acc, h) => acc + (h.correctCount || 0), 0);
    const averageAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

    // 1. Save user profile document
    await setDoc(
      userDocRef,
      {
        userId,
        email: userEmail || null,
        displayName: displayName || (userEmail ? userEmail.split('@')[0] : 'अभ्यासक'),
        totalExamScore,
        examsCount: (progress.history || []).length,
        averageAccuracy,
        targetHoursPerWeek: progress.weeklyTargetHours || 10,
        targetQuestionsPerWeek: progress.weeklyTargetQuestions || 150,
        bookmarkedQuestionIds: progress.bookmarkedQuestionIds || [],
        dailyTargetQuestions: progress.dailyTargetQuestions || 25,
        todayQuestionsCount: progress.todayQuestionsCount || 0,
        streakDays: progress.streakDays || 1,
        lastActiveDay: progress.lastActiveDay || new Date().toISOString().split('T')[0],
        preferredLanguage: progress.preferredLanguage || 'mr',
        notes: progress.notes || {},
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    // 2. Save all exam results in history
    let examsStored = 0;
    for (const exam of progress.history) {
      if (!exam.sessionId) continue;
      const examDocRef = doc(db, 'users', userId, 'examResults', exam.sessionId);
      await setDoc(
        examDocRef,
        {
          userId,
          examId: exam.sessionId,
          examTitle: exam.title,
          examType: exam.patternId,
          score: exam.finalScore,
          totalQuestions: exam.totalQuestions,
          attemptedCount: exam.attemptedCount,
          correctCount: exam.correctCount,
          incorrectCount: exam.incorrectCount,
          accuracy: exam.accuracyPercentage,
          timeTakenSeconds: exam.timeSpentSeconds,
          date: exam.date,
          timestamp: exam.timestamp || Date.now(),
        },
        { merge: true }
      );
      examsStored++;
    }

    // 3. Save all study session logs
    let logsStored = 0;
    const logs = progress.studyLogs || [];
    for (const log of logs) {
      if (!log.id) continue;
      const logDocRef = doc(db, 'users', userId, 'studyLogs', log.id);
      await setDoc(
        logDocRef,
        {
          userId,
          title: log.title,
          durationMinutes: log.durationMinutes,
          questionsSolved: log.questionsSolved,
          notes: log.notes || null,
          date: log.dateStr,
          timestamp: log.timestamp || Date.now(),
        },
        { merge: true }
      );
      logsStored++;
    }

    // 4. Also seed MPSC Question bank to Firestore if not already present
    const questionsStored = await seedMPSCQuestionsToFirestore();

    return {
      success: true,
      examsStored,
      logsStored,
      bookmarksStored: progress.bookmarkedQuestionIds.length,
      questionsStored,
    };
  } catch (err: any) {
    handleFirestoreError(err, OperationType.WRITE, `users/${userId}`);
    return {
      success: false,
      examsStored: 0,
      logsStored: 0,
      bookmarksStored: progress.bookmarkedQuestionIds.length,
      questionsStored: 0,
      error: err?.message || 'Unknown Firestore error',
    };
  }
}

/**
 * Saves or merges the current user progress into Firestore under /users/{userId}
 */
export async function syncUserProgressToFirestore(
  userId: string,
  progress: UserProgress,
  userEmail?: string | null,
  displayName?: string | null
): Promise<void> {
  if (!userId || !db) return;

  try {
    const userDocRef = doc(db, 'users', userId);

    const totalExamScore = Number(
      (progress.history || []).reduce((sum, h) => sum + (h.finalScore || 0), 0).toFixed(1)
    );
    const totalAttempted = (progress.history || []).reduce((acc, h) => acc + (h.attemptedCount || 0), 0);
    const totalCorrect = (progress.history || []).reduce((acc, h) => acc + (h.correctCount || 0), 0);
    const averageAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

    await setDoc(
      userDocRef,
      {
        userId,
        email: userEmail || null,
        displayName: displayName || (userEmail ? userEmail.split('@')[0] : 'अभ्यासक'),
        totalExamScore,
        examsCount: (progress.history || []).length,
        averageAccuracy,
        targetHoursPerWeek: progress.weeklyTargetHours || 10,
        targetQuestionsPerWeek: progress.weeklyTargetQuestions || 150,
        bookmarkedQuestionIds: progress.bookmarkedQuestionIds || [],
        dailyTargetQuestions: progress.dailyTargetQuestions || 25,
        streakDays: progress.streakDays || 1,
        lastActiveDay: progress.lastActiveDay || new Date().toISOString().split('T')[0],
        preferredLanguage: progress.preferredLanguage || 'mr',
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `users/${userId}`);
  }
}

/**
 * Loads user progress from Firestore for the given user, merging with local state
 */
export async function loadUserProgressFromFirestore(
  userId: string,
  localProgress: UserProgress
): Promise<UserProgress> {
  if (!userId || !db) return localProgress;

  try {
    const userDocRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userDocRef);

    let remoteData: any = {};
    if (userSnap.exists()) {
      remoteData = userSnap.data();
    }

    const examsRef = collection(db, 'users', userId, 'examResults');
    const examsQuery = query(examsRef, orderBy('timestamp', 'desc'), limit(30));
    let remoteExams: ExamResult[] = [];
    try {
      const examsSnap = await getDocs(examsQuery);
      remoteExams = examsSnap.docs.map((d) => d.data() as ExamResult);
    } catch {
      // ignore
    }

    const logsRef = collection(db, 'users', userId, 'studyLogs');
    const logsQuery = query(logsRef, orderBy('timestamp', 'desc'), limit(50));
    let remoteLogs: StudySessionLog[] = [];
    try {
      const logsSnap = await getDocs(logsQuery);
      remoteLogs = logsSnap.docs.map((d) => d.data() as StudySessionLog);
    } catch {
      // ignore
    }

    const mergedBookmarks = Array.from(
      new Set([...localProgress.bookmarkedQuestionIds, ...(remoteData.bookmarkedQuestionIds || [])])
    );

    const examMap = new Map<string, ExamResult>();
    localProgress.history.forEach((e) => examMap.set(e.sessionId, e));
    remoteExams.forEach((e) => {
      if (e.sessionId && !examMap.has(e.sessionId)) {
        examMap.set(e.sessionId, e);
      }
    });
    const mergedHistory = Array.from(examMap.values()).sort(
      (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
    );

    const logMap = new Map<string, StudySessionLog>();
    (localProgress.studyLogs || []).forEach((l) => logMap.set(l.id, l));
    remoteLogs.forEach((l) => {
      if (l.id && !logMap.has(l.id)) {
        logMap.set(l.id, l);
      }
    });
    const mergedLogs = Array.from(logMap.values()).sort(
      (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
    );

    const merged: UserProgress = {
      ...localProgress,
      bookmarkedQuestionIds: mergedBookmarks,
      history: mergedHistory,
      studyLogs: mergedLogs,
      weeklyTargetHours: remoteData.targetHoursPerWeek || localProgress.weeklyTargetHours,
      weeklyTargetQuestions: remoteData.targetQuestionsPerWeek || localProgress.weeklyTargetQuestions,
      streakDays: Math.max(remoteData.streakDays || 1, localProgress.streakDays),
    };

    saveUserProgress(merged);
    return merged;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `users/${userId}`);
    return localProgress;
  }
}

/**
 * 100% REAL-TIME Leaderboard Subscription via onSnapshot.
 * NO FAKE USERS! Only real aspirants who took exams in Firestore.
 */
export function subscribeToRealtimeLeaderboard(
  currentUserId: string | undefined,
  currentProgress: UserProgress | undefined,
  currentUserName: string | undefined,
  callback: (leaderboard: LeaderboardEntry[]) => void
): Unsubscribe | null {
  const getLocalFallback = (): LeaderboardEntry[] => {
    const userScore = currentProgress?.history
      ? Number(currentProgress.history.reduce((sum, h) => sum + (h.finalScore || 0), 0).toFixed(1))
      : 0;
    const userExamsCount = currentProgress?.history?.length || 0;
    const userAttempted = currentProgress?.history?.reduce((acc, h) => acc + (h.attemptedCount || 0), 0) || 0;
    const userCorrect = currentProgress?.history?.reduce((acc, h) => acc + (h.correctCount || 0), 0) || 0;
    const userAccuracy = userAttempted > 0 ? Math.round((userCorrect / userAttempted) * 100) : 0;

    return [
      {
        userId: currentUserId || 'local_user',
        name: `${currentUserName || 'तुम्ही (You)'} (तुम्ही)`,
        totalScore: userScore,
        examsCount: userExamsCount,
        accuracy: userAccuracy,
        rank: 1,
        isCurrentUser: true,
        roleTag: 'सध्याचा उमेदवार (Active)',
      },
    ];
  };

  if (!db || isFirestoreQuotaExceeded()) {
    callback(getLocalFallback());
    return null;
  }

  try {
    const usersColl = collection(db, 'users');
    const usersQuery = query(usersColl, limit(30));

    return onSnapshot(
      usersQuery,
      (snapshot) => {
        const userScore = currentProgress?.history
          ? Number(currentProgress.history.reduce((sum, h) => sum + (h.finalScore || 0), 0).toFixed(1))
          : 0;
        const userExamsCount = currentProgress?.history?.length || 0;
        const userAttempted = currentProgress?.history?.reduce((acc, h) => acc + (h.attemptedCount || 0), 0) || 0;
        const userCorrect = currentProgress?.history?.reduce((acc, h) => acc + (h.correctCount || 0), 0) || 0;
        const userAccuracy = userAttempted > 0 ? Math.round((userCorrect / userAttempted) * 100) : 0;

        const realUsers: LeaderboardEntry[] = [];

        // Known dummy / demo user names to delete and purge
        const DEMO_NAMES = [
          'स्वाती जाधव',
          'अमोल देशमुख',
          'प्रिया कुलकर्णी',
          'सचिन पवार',
          'रोहन माने',
          'Swati J',
          'Amol D',
          'Priya K',
          'Sachin P',
          'Rohan M',
        ];

        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data();
          const uId = docSnap.id;
          const rawName = data.displayName || '';

          // Check if this document is a demo/dummy user
          const isDemo =
            data.isDemo === true ||
            uId.startsWith('demo') ||
            uId.startsWith('dummy') ||
            DEMO_NAMES.some((dn) => rawName.includes(dn));

          if (isDemo) {
            // Delete demo document from Firestore in the background
            try {
              deleteDoc(doc(db, 'users', uId)).catch(() => {});
            } catch {
              // Ignore
            }
            return; // Skip demo user
          }

          const isCurrent = Boolean(currentUserId && uId === currentUserId);

          let totalScore = typeof data.totalExamScore === 'number' ? data.totalExamScore : 0;
          let examsCount = typeof data.examsCount === 'number' ? data.examsCount : 0;
          let accuracy = typeof data.averageAccuracy === 'number' ? data.averageAccuracy : 0;

          if (isCurrent) {
            totalScore = Math.max(totalScore, userScore);
            examsCount = Math.max(examsCount, userExamsCount);
            accuracy = userAccuracy || accuracy;
          }

          // ONLY include real users who have taken at least 1 real exam or have non-zero score
          if (examsCount > 0 || totalScore > 0 || (isCurrent && userExamsCount > 0)) {
            const studentName = rawName || (isCurrent ? (currentUserName || 'तुम्ही (You)') : (data.email ? data.email.split('@')[0] : `MPSC Aspirant #${uId.slice(0, 4)}`));
            realUsers.push({
              userId: uId,
              name: isCurrent ? `${studentName} (तुम्ही)` : studentName,
              totalScore: Number(totalScore.toFixed(1)),
              examsCount,
              accuracy,
              rank: 0,
              isCurrentUser: isCurrent,
              roleTag: data.roleTag || (isCurrent ? 'सध्याचा उमेदवार (Active)' : 'MPSC Aspirant'),
            });
          }
        });

        // If current logged-in user has taken exams but is not yet in snapshot docs
        if (currentUserId && (userExamsCount > 0 || userScore > 0) && !realUsers.some((u) => u.userId === currentUserId)) {
          realUsers.push({
            userId: currentUserId,
            name: `${currentUserName || 'तुम्ही (You)'} (तुम्ही)`,
            totalScore: userScore,
            examsCount: userExamsCount,
            accuracy: userAccuracy,
            rank: 0,
            isCurrentUser: true,
            roleTag: 'सध्याचा उमेदवार (Active)',
          });
        }

        // Sort real students descending by total score, then by accuracy
        realUsers.sort((a, b) => {
          if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
          return b.accuracy - a.accuracy;
        });

        const top = realUsers.slice(0, 10).map((entry, idx) => ({
          ...entry,
          rank: idx + 1,
        }));

        callback(top);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'users');
        // Provide graceful local fallback when Firestore quota is exceeded or network is offline
        const userScore = currentProgress?.history
          ? Number(currentProgress.history.reduce((sum, h) => sum + (h.finalScore || 0), 0).toFixed(1))
          : 0;
        const userExamsCount = currentProgress?.history?.length || 0;
        const userAttempted = currentProgress?.history?.reduce((acc, h) => acc + (h.attemptedCount || 0), 0) || 0;
        const userCorrect = currentProgress?.history?.reduce((acc, h) => acc + (h.correctCount || 0), 0) || 0;
        const userAccuracy = userAttempted > 0 ? Math.round((userCorrect / userAttempted) * 100) : 0;

        callback([
          {
            userId: currentUserId || 'local_user',
            name: `${currentUserName || 'तुम्ही (You)'} (तुम्ही)`,
            totalScore: userScore,
            examsCount: userExamsCount,
            accuracy: userAccuracy,
            rank: 1,
            isCurrentUser: true,
            roleTag: 'सध्याचा उमेदवार (Active)',
          },
        ]);
      }
    );
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'users');
    const userScore = currentProgress?.history
      ? Number(currentProgress.history.reduce((sum, h) => sum + (h.finalScore || 0), 0).toFixed(1))
      : 0;
    const userExamsCount = currentProgress?.history?.length || 0;
    const userAttempted = currentProgress?.history?.reduce((acc, h) => acc + (h.attemptedCount || 0), 0) || 0;
    const userCorrect = currentProgress?.history?.reduce((acc, h) => acc + (h.correctCount || 0), 0) || 0;
    const userAccuracy = userAttempted > 0 ? Math.round((userCorrect / userAttempted) * 100) : 0;

    callback([
      {
        userId: currentUserId || 'local_user',
        name: `${currentUserName || 'तुम्ही (You)'} (तुम्ही)`,
        totalScore: userScore,
        examsCount: userExamsCount,
        accuracy: userAccuracy,
        rank: 1,
        isCurrentUser: true,
        roleTag: 'सध्याचा उमेदवार (Active)',
      },
    ]);
    return null;
  }
}

