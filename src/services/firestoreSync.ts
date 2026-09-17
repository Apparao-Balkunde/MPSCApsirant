import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  query, 
  limit, 
  orderBy,
  writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProgress, ExamResult, StudySessionLog, Question, LeaderboardEntry } from '../types';
import { saveUserProgress } from '../utils/storage';
import { MPSC_QUESTIONS } from '../data/mpscQuestions';

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
 * Fetches the entire MPSC Question Bank from Firestore collection 'mpsc_questions'.
 * If Firestore is empty, it automatically seeds it with initial questions and returns them.
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
      // If collection is not yet seeded in Firestore, seed it now and return
      const seeded = await seedMPSCQuestionsToFirestore();
      return { questions: MPSC_QUESTIONS, fromFirestore: true, count: seeded || MPSC_QUESTIONS.length };
    }
  } catch (err) {
    console.warn('Error fetching questions from Firestore, using fallback:', err);
    return { questions: MPSC_QUESTIONS, fromFirestore: false, count: MPSC_QUESTIONS.length };
  }
}

/**
 * Stores a single newly created or edited question directly to Firestore
 */
export async function storeSingleQuestionToFirestore(question: Question): Promise<boolean> {
  if (!db || !question.id) return false;
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
    console.error('Failed to store question to Firestore:', err);
    return false;
  }
}

/**
 * Immediately stores a single completed exam result to Firestore
 */
export async function storeSingleExamResultToFirestore(
  userId: string,
  exam: ExamResult
): Promise<boolean> {
  if (!db || !userId || !exam.sessionId) return false;
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
    return true;
  } catch (err) {
    console.warn('Failed to store exam to Firestore:', err);
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
    console.warn('Failed to store study log to Firestore:', err);
    return false;
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
    console.error('Failed to fetch from Firestore:', err);
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
    // Batch write questions in chunks of 20 to stay well within Firestore batch limits
    const chunkSize = 20;
    for (let i = 0; i < MPSC_QUESTIONS.length; i += chunkSize) {
      const chunk = MPSC_QUESTIONS.slice(i, i + chunkSize);
      const batch = writeBatch(db);
      for (const q of chunk) {
        const qRef = doc(db, 'mpsc_questions', q.id);
        batch.set(qRef, {
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
        }, { merge: true });
        count++;
      }
      await batch.commit();
    }
    return count;
  } catch (err) {
    console.warn('Questions seeding note:', err);
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
      error: 'User not authenticated or Firestore not initialized'
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
        displayName: displayName || null,
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
    console.error('Failed to sync all data to Firestore:', err);
    return {
      success: false,
      examsStored: 0,
      logsStored: 0,
      bookmarksStored: progress.bookmarkedQuestionIds.length,
      questionsStored: 0,
      error: err?.message || 'Unknown Firestore error'
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
    
    // Save top-level user metadata and state
    await setDoc(
      userDocRef,
      {
        userId,
        email: userEmail || null,
        displayName: displayName || null,
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

    // Save recent exam results to subcollection /users/{userId}/examResults/{resultId}
    const recentExams = progress.history.slice(0, 10);
    for (const exam of recentExams) {
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
          accuracy: exam.accuracyPercentage,
          timeTakenSeconds: exam.timeSpentSeconds,
          date: exam.date,
          timestamp: exam.timestamp || Date.now(),
        },
        { merge: true }
      );
    }

    // Save recent study logs to subcollection /users/{userId}/studyLogs/{logId}
    const recentLogs = (progress.studyLogs || []).slice(0, 20);
    for (const log of recentLogs) {
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
    }
  } catch (err) {
    console.warn('Firestore sync note:', err);
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

    // Fetch subcollection exams
    const examsRef = collection(db, 'users', userId, 'examResults');
    const examsQuery = query(examsRef, orderBy('timestamp', 'desc'), limit(30));
    let remoteExams: ExamResult[] = [];
    try {
      const examsSnap = await getDocs(examsQuery);
      remoteExams = examsSnap.docs.map((d) => d.data() as ExamResult);
    } catch {
      // If collection is empty or index pending, fallback gracefully
    }

    // Fetch subcollection study logs
    const logsRef = collection(db, 'users', userId, 'studyLogs');
    const logsQuery = query(logsRef, orderBy('timestamp', 'desc'), limit(50));
    let remoteLogs: StudySessionLog[] = [];
    try {
      const logsSnap = await getDocs(logsQuery);
      remoteLogs = logsSnap.docs.map((d) => d.data() as StudySessionLog);
    } catch {
      // Fallback
    }

    // Merge bookmarks (union)
    const mergedBookmarks = Array.from(
      new Set([...localProgress.bookmarkedQuestionIds, ...(remoteData.bookmarkedQuestionIds || [])])
    );

    // Merge exam history by sessionId
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

    // Merge study logs by id
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
    console.warn('Failed to load from Firestore:', err);
    return localProgress;
  }
}

/**
 * Standard benchmark top aspirant records for realistic MPSC rankings
 */
const DEFAULT_TOP_ASPIRANTS: Omit<LeaderboardEntry, 'rank'>[] = [
  {
    userId: 'aspirant_swati_mpsc',
    name: 'स्वाती जाधव (Swati J.)',
    totalScore: 154.5,
    examsCount: 8,
    accuracy: 86,
    roleTag: 'STI Target 2026',
  },
  {
    userId: 'aspirant_amol_mpsc',
    name: 'अमोल देशमुख (Amol D.)',
    totalScore: 138.0,
    examsCount: 7,
    accuracy: 82,
    roleTag: 'DySP Aspirant',
  },
  {
    userId: 'aspirant_priya_mpsc',
    name: 'प्रिया कुलकर्णी (Priya K.)',
    totalScore: 124.5,
    examsCount: 6,
    accuracy: 79,
    roleTag: 'Rajyaseva Prelims',
  },
  {
    userId: 'aspirant_sachin_mpsc',
    name: 'सचिन पवार (Sachin P.)',
    totalScore: 112.0,
    examsCount: 5,
    accuracy: 76,
    roleTag: 'ASO Rank Target',
  },
  {
    userId: 'aspirant_rohan_mpsc',
    name: 'रोहन माने (Rohan M.)',
    totalScore: 98.5,
    examsCount: 5,
    accuracy: 74,
    roleTag: 'Combined Group B',
  },
];

/**
 * Fetches and calculates top 5 users based on total exam scores from Firestore.
 */
export async function fetchLeaderboardFromFirestore(
  currentUserId?: string,
  currentProgress?: UserProgress,
  currentUserName?: string
): Promise<{ leaderboard: LeaderboardEntry[]; fromFirestore: boolean }> {
  // 1. Calculate current user score
  const userScore = currentProgress?.history
    ? Number(currentProgress.history.reduce((sum, h) => sum + (h.finalScore || 0), 0).toFixed(1))
    : 0;
  const userExamsCount = currentProgress?.history?.length || 0;
  const userAttempted = currentProgress?.history?.reduce((acc, h) => acc + (h.attemptedCount || 0), 0) || 0;
  const userCorrect = currentProgress?.history?.reduce((acc, h) => acc + (h.correctCount || 0), 0) || 0;
  const userAccuracy = userAttempted > 0 ? Math.round((userCorrect / userAttempted) * 100) : 0;

  const currentUserEntry: LeaderboardEntry = {
    userId: currentUserId || 'current_local_user',
    name: currentUserName || 'तुम्ही (You)',
    totalScore: userScore,
    examsCount: userExamsCount,
    accuracy: userAccuracy,
    rank: 0,
    isCurrentUser: true,
    roleTag: 'सध्याचा उमेदवार (Active Aspirant)',
  };

  if (!db) {
    const combined = [
      ...DEFAULT_TOP_ASPIRANTS.map((p) => ({ ...p, isCurrentUser: false, rank: 0 })),
      currentUserEntry,
    ];
    combined.sort((a, b) => b.totalScore - a.totalScore);
    const top5 = combined.slice(0, 5).map((item, idx) => ({ ...item, rank: idx + 1 }));
    return { leaderboard: top5, fromFirestore: false };
  }

  try {
    const usersColl = collection(db, 'users');
    const usersSnap = await getDocs(query(usersColl, limit(20)));

    const firestoreUsers: LeaderboardEntry[] = [];

    usersSnap.docs.forEach((docSnap) => {
      const data = docSnap.data();
      const uId = docSnap.id;
      const isCurrent = Boolean(currentUserId && uId === currentUserId);
      const name = data.displayName || (isCurrent ? 'तुम्ही (You)' : `उमेदवार #${uId.slice(0, 4)}`);
      
      let totalScore = typeof data.totalExamScore === 'number' ? data.totalExamScore : 0;
      let examsCount = typeof data.examsCount === 'number' ? data.examsCount : 0;
      let accuracy = typeof data.averageAccuracy === 'number' ? data.averageAccuracy : 0;

      if (isCurrent) {
        totalScore = Math.max(totalScore, userScore);
        examsCount = Math.max(examsCount, userExamsCount);
        accuracy = userAccuracy || accuracy;
      }

      firestoreUsers.push({
        userId: uId,
        name,
        totalScore: Number(totalScore.toFixed(1)),
        examsCount,
        accuracy,
        rank: 0,
        isCurrentUser: isCurrent,
        roleTag: data.roleTag || 'MPSC Aspirant',
      });
    });

    // If current user is not in Firestore users list yet, include them
    const hasCurrent = firestoreUsers.some((u) => u.isCurrentUser || (currentUserId && u.userId === currentUserId));
    if (!hasCurrent) {
      firestoreUsers.push(currentUserEntry);
    }

    // Merge benchmark aspirants if fewer than 5 users
    const existingIds = new Set(firestoreUsers.map((u) => u.userId));
    DEFAULT_TOP_ASPIRANTS.forEach((defaultUser) => {
      if (!existingIds.has(defaultUser.userId)) {
        firestoreUsers.push({
          ...defaultUser,
          isCurrentUser: false,
          rank: 0,
        });
      }
    });

    // Sort descending by total score, then by accuracy
    firestoreUsers.sort((a, b) => {
      if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
      return b.accuracy - a.accuracy;
    });

    const top5 = firestoreUsers.slice(0, 5).map((entry, idx) => ({
      ...entry,
      rank: idx + 1,
    }));

    return { leaderboard: top5, fromFirestore: true };
  } catch (err) {
    console.warn('Leaderboard Firestore query error, using local fallback:', err);
    const combined = [
      ...DEFAULT_TOP_ASPIRANTS.map((p) => ({ ...p, isCurrentUser: false, rank: 0 })),
      currentUserEntry,
    ];
    combined.sort((a, b) => b.totalScore - a.totalScore);
    const top5 = combined.slice(0, 5).map((item, idx) => ({ ...item, rank: idx + 1 }));
    return { leaderboard: top5, fromFirestore: false };
  }
}
