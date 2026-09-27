import { UserProgress, ExamResult, StudySessionLog } from '../types';

export interface MPSCBackupPayload {
  app: string;
  version: string;
  exportedAt: string;
  summary: {
    totalExams: number;
    totalStudySessions: number;
    totalBookmarkedQuestions: number;
    totalBookmarkedRules: number;
    totalNotes: number;
    streakDays: number;
    preferredLanguage: 'mr' | 'en';
  };
  data: {
    history: ExamResult[];
    studyLogs: StudySessionLog[];
    bookmarkedQuestionIds: string[];
    bookmarkedRuleIds: string[];
    notes: Record<string, string>;
    settings: {
      preferredLanguage: 'mr' | 'en';
      streakDays: number;
      lastActiveDay: string;
      weeklyTargetHours: number;
      weeklyTargetQuestions: number;
      soundEffectsEnabled?: boolean;
    };
  };
}

/**
 * Creates a structured JSON backup object of all user progress data
 * (exam history, study session logs, bookmarks, and notes).
 */
export function generateBackupPayload(userProgress: UserProgress): MPSCBackupPayload {
  const history = Array.isArray(userProgress.history) ? userProgress.history : [];
  const studyLogs = Array.isArray(userProgress.studyLogs) ? userProgress.studyLogs : [];
  const bookmarkedQuestionIds = Array.isArray(userProgress.bookmarkedQuestionIds)
    ? Array.from(new Set(userProgress.bookmarkedQuestionIds))
    : [];
  const bookmarkedRuleIds = Array.isArray(userProgress.bookmarkedRuleIds)
    ? Array.from(new Set(userProgress.bookmarkedRuleIds))
    : [];
  const notes = userProgress.notes || {};

  return {
    app: 'MPSC Aspirant Prep',
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    summary: {
      totalExams: history.length,
      totalStudySessions: studyLogs.length,
      totalBookmarkedQuestions: bookmarkedQuestionIds.length,
      totalBookmarkedRules: bookmarkedRuleIds.length,
      totalNotes: Object.keys(notes).length,
      streakDays: userProgress.streakDays || 1,
      preferredLanguage: userProgress.preferredLanguage || 'mr',
    },
    data: {
      history,
      studyLogs,
      bookmarkedQuestionIds,
      bookmarkedRuleIds,
      notes,
      settings: {
        preferredLanguage: userProgress.preferredLanguage || 'mr',
        streakDays: userProgress.streakDays || 1,
        lastActiveDay: userProgress.lastActiveDay || new Date().toISOString().split('T')[0],
        weeklyTargetHours: userProgress.weeklyTargetHours || 10,
        weeklyTargetQuestions: userProgress.weeklyTargetQuestions || 150,
        soundEffectsEnabled: userProgress.soundEffectsEnabled !== undefined ? userProgress.soundEffectsEnabled : true,
      },
    },
  };
}

/**
 * Triggers a browser download of the user data as a formatted JSON file.
 * Returns the generated filename and summary metrics.
 */
export function exportUserDataAsJSON(
  userProgress: UserProgress,
  filenamePrefix = 'mpsc-aspirant-backup'
): { filename: string; summary: MPSCBackupPayload['summary'] } {
  const payload = generateBackupPayload(userProgress);
  const jsonString = JSON.stringify(payload, null, 2);

  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `${filenamePrefix}-${dateStr}.json`;

  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();

  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 200);

  return {
    filename,
    summary: payload.summary,
  };
}

/**
 * Validates a parsed JSON object to verify if it represents a valid MPSC backup.
 */
export function validateBackupJSON(parsed: any): { isValid: boolean; error?: string; payload?: MPSCBackupPayload } {
  if (!parsed || typeof parsed !== 'object') {
    return { isValid: false, error: 'अवैध JSON फाइल: फाइल रिकामी किंवा चुकीच्या स्वरूपात आहे.' };
  }

  // Check structure: either a payload with .data or raw UserProgress
  let history: ExamResult[] = [];
  let studyLogs: StudySessionLog[] = [];
  let bookmarkedQuestionIds: string[] = [];
  let bookmarkedRuleIds: string[] = [];
  let notes: Record<string, string> = {};

  if (parsed.data && typeof parsed.data === 'object') {
    history = Array.isArray(parsed.data.history) ? parsed.data.history : [];
    studyLogs = Array.isArray(parsed.data.studyLogs) ? parsed.data.studyLogs : [];
    bookmarkedQuestionIds = Array.isArray(parsed.data.bookmarkedQuestionIds) ? parsed.data.bookmarkedQuestionIds : [];
    bookmarkedRuleIds = Array.isArray(parsed.data.bookmarkedRuleIds) ? parsed.data.bookmarkedRuleIds : [];
    notes = parsed.data.notes && typeof parsed.data.notes === 'object' ? parsed.data.notes : {};
  } else if (Array.isArray(parsed.history) || Array.isArray(parsed.bookmarkedQuestionIds)) {
    // Direct UserProgress export format fallback
    history = Array.isArray(parsed.history) ? parsed.history : [];
    studyLogs = Array.isArray(parsed.studyLogs) ? parsed.studyLogs : [];
    bookmarkedQuestionIds = Array.isArray(parsed.bookmarkedQuestionIds) ? parsed.bookmarkedQuestionIds : [];
    bookmarkedRuleIds = Array.isArray(parsed.bookmarkedRuleIds) ? parsed.bookmarkedRuleIds : [];
    notes = parsed.notes && typeof parsed.notes === 'object' ? parsed.notes : {};
  } else {
    return {
      isValid: false,
      error: 'ही फाइल MPSC Aspirant Prep चा वैध बॅकअप नाही. कृपया खरी बॅकअप JSON फाइल निवडा.',
    };
  }

  const normalizedPayload: MPSCBackupPayload = {
    app: parsed.app || 'MPSC Aspirant Prep',
    version: parsed.version || '1.0.0',
    exportedAt: parsed.exportedAt || new Date().toISOString(),
    summary: {
      totalExams: history.length,
      totalStudySessions: studyLogs.length,
      totalBookmarkedQuestions: bookmarkedQuestionIds.length,
      totalBookmarkedRules: bookmarkedRuleIds.length,
      totalNotes: Object.keys(notes).length,
      streakDays: parsed.summary?.streakDays || parsed.streakDays || 1,
      preferredLanguage: parsed.summary?.preferredLanguage || parsed.preferredLanguage || 'mr',
    },
    data: {
      history,
      studyLogs,
      bookmarkedQuestionIds,
      bookmarkedRuleIds,
      notes,
      settings: {
        preferredLanguage: parsed.data?.settings?.preferredLanguage || parsed.preferredLanguage || 'mr',
        streakDays: parsed.data?.settings?.streakDays || parsed.streakDays || 1,
        lastActiveDay: parsed.data?.settings?.lastActiveDay || parsed.lastActiveDay || new Date().toISOString().split('T')[0],
        weeklyTargetHours: parsed.data?.settings?.weeklyTargetHours || parsed.weeklyTargetHours || 10,
        weeklyTargetQuestions: parsed.data?.settings?.weeklyTargetQuestions || parsed.weeklyTargetQuestions || 150,
        soundEffectsEnabled: parsed.data?.settings?.soundEffectsEnabled ?? parsed.soundEffectsEnabled ?? true,
      },
    },
  };

  return {
    isValid: true,
    payload: normalizedPayload,
  };
}

/**
 * Safely merges imported backup data into the current user progress state.
 * Deduplicates exams by sessionId and logs by id/timestamp.
 */
export function mergeBackupData(
  current: UserProgress,
  backup: MPSCBackupPayload
): { merged: UserProgress; addedExams: number; addedLogs: number; addedBookmarks: number } {
  const currentExamIds = new Set(current.history.map((h) => h.sessionId));
  const newExams = backup.data.history.filter((h) => !currentExamIds.has(h.sessionId));

  const currentLogIds = new Set((current.studyLogs || []).map((l) => l.id || `${l.timestamp}`));
  const newLogs = (backup.data.studyLogs || []).filter(
    (l) => !currentLogIds.has(l.id || `${l.timestamp}`)
  );

  const currentBookmarkSet = new Set(current.bookmarkedQuestionIds || []);
  let newBookmarkCount = 0;
  (backup.data.bookmarkedQuestionIds || []).forEach((id) => {
    if (!currentBookmarkSet.has(id)) {
      currentBookmarkSet.add(id);
      newBookmarkCount++;
    }
  });

  const currentRuleBookmarkSet = new Set(current.bookmarkedRuleIds || []);
  (backup.data.bookmarkedRuleIds || []).forEach((id) => {
    currentRuleBookmarkSet.add(id);
  });

  const mergedNotes = {
    ...current.notes,
    ...backup.data.notes,
  };

  const mergedProgress: UserProgress = {
    ...current,
    history: [...newExams, ...current.history],
    studyLogs: [...newLogs, ...(current.studyLogs || [])],
    bookmarkedQuestionIds: Array.from(currentBookmarkSet),
    bookmarkedRuleIds: Array.from(currentRuleBookmarkSet),
    notes: mergedNotes,
    streakDays: Math.max(current.streakDays || 1, backup.data.settings?.streakDays || 1),
  };

  return {
    merged: mergedProgress,
    addedExams: newExams.length,
    addedLogs: newLogs.length,
    addedBookmarks: newBookmarkCount,
  };
}
