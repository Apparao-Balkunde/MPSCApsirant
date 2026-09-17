import { ExamResult, StudySessionLog, UserProgress } from '../types';

const STORAGE_KEY = 'mpsc_aspirant_prep_user_data_v1';

export function getInitialProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Check streak logic
      const todayStr = new Date().toISOString().split('T')[0];
      let streak = parsed.streakDays || 1;
      let todayCount = parsed.todayQuestionsCount || 0;

      if (parsed.lastActiveDay !== todayStr) {
        const lastDate = new Date(parsed.lastActiveDay || todayStr);
        const currentDate = new Date(todayStr);
        const diffDays = Math.floor(
          (currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24)
        );
        if (diffDays === 1) {
          streak += 1;
        } else if (diffDays > 1) {
          streak = 1;
        }
        todayCount = 0;
      }

      return {
        history: parsed.history || [],
        bookmarkedQuestionIds: parsed.bookmarkedQuestionIds || [],
        preferredLanguage: parsed.preferredLanguage || 'mr',
        streakDays: streak,
        lastActiveDay: todayStr,
        notes: parsed.notes || {},
        dailyTargetQuestions: parsed.dailyTargetQuestions || 25,
        todayQuestionsCount: todayCount,
        weeklyTargetHours: typeof parsed.weeklyTargetHours === 'number' ? parsed.weeklyTargetHours : 10,
        weeklyTargetQuestions: typeof parsed.weeklyTargetQuestions === 'number' ? parsed.weeklyTargetQuestions : 150,
        studyLogs: Array.isArray(parsed.studyLogs) ? parsed.studyLogs : [],
        soundEffectsEnabled: parsed.soundEffectsEnabled !== undefined ? Boolean(parsed.soundEffectsEnabled) : true,
      };
    }
  } catch (e) {
    console.error('Failed to load user progress:', e);
  }

  const today = new Date().toISOString().split('T')[0];
  return {
    history: [],
    bookmarkedQuestionIds: [],
    preferredLanguage: 'mr',
    streakDays: 1,
    lastActiveDay: today,
    notes: {},
    dailyTargetQuestions: 25,
    todayQuestionsCount: 0,
    weeklyTargetHours: 10,
    weeklyTargetQuestions: 150,
    studyLogs: [],
    soundEffectsEnabled: true,
  };
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save user progress:', e);
  }
}

export function saveCompletedExam(
  result: ExamResult,
  currentProgress: UserProgress
): UserProgress {
  const todayStr = new Date().toISOString().split('T')[0];
  const updatedTodayCount = currentProgress.todayQuestionsCount + result.attemptedCount;
  const examTimestamp = result.timestamp || Date.now();

  const newLog: StudySessionLog = {
    id: `exam-${result.sessionId}-${Date.now()}`,
    title: result.title,
    timestamp: examTimestamp,
    dateStr: todayStr,
    durationMinutes: Math.max(1, Math.round(result.timeSpentSeconds / 60)),
    questionsSolved: result.attemptedCount,
    type: 'exam',
  };

  const updatedResult: ExamResult = {
    ...result,
    timestamp: examTimestamp,
  };

  const updated: UserProgress = {
    ...currentProgress,
    lastActiveDay: todayStr,
    todayQuestionsCount: updatedTodayCount,
    history: [updatedResult, ...currentProgress.history],
    studyLogs: [newLog, ...(currentProgress.studyLogs || [])],
  };

  saveUserProgress(updated);
  return updated;
}

export function updateWeeklyGoals(
  currentProgress: UserProgress,
  targetHours: number,
  targetQuestions: number
): UserProgress {
  const updated: UserProgress = {
    ...currentProgress,
    weeklyTargetHours: Math.max(1, targetHours),
    weeklyTargetQuestions: Math.max(10, targetQuestions),
  };
  saveUserProgress(updated);
  return updated;
}

export function addManualStudyLog(
  currentProgress: UserProgress,
  title: string,
  durationMinutes: number,
  questionsSolved: number,
  notes?: string
): UserProgress {
  const now = Date.now();
  const todayStr = new Date().toISOString().split('T')[0];
  const newLog: StudySessionLog = {
    id: `manual-${now}`,
    title: title || 'Offline Study / स्वाध्याय सराव',
    timestamp: now,
    dateStr: todayStr,
    durationMinutes: Math.max(1, durationMinutes),
    questionsSolved: Math.max(0, questionsSolved),
    type: 'manual',
    notes,
  };

  const updated: UserProgress = {
    ...currentProgress,
    lastActiveDay: todayStr,
    todayQuestionsCount: currentProgress.todayQuestionsCount + Math.max(0, questionsSolved),
    studyLogs: [newLog, ...(currentProgress.studyLogs || [])],
  };

  saveUserProgress(updated);
  return updated;
}

