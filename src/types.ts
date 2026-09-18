export type SubjectId =
  | 'maharashtra_history'
  | 'maharashtra_geography'
  | 'polity'
  | 'economy'
  | 'general_science'
  | 'environment'
  | 'csat'
  | 'current_affairs'
  | 'marathi_grammar'
  | 'english_grammar';

export interface SubjectMeta {
  id: SubjectId;
  nameEn: string;
  nameMr: string;
  color: string;
  iconName: string;
  descriptionEn: string;
  descriptionMr: string;
}

export type ExamPatternId =
  | 'rajyaseva_gs'
  | 'combine_group_b_c'
  | 'csat_booster'
  | 'maharashtra_special'
  | 'current_affairs_2026'
  | 'daily_10_challenge'
  | 'custom';

export interface Question {
  id: string;
  subjectId: SubjectId;
  topic: string;
  subtopic: string;
  exam: 'Rajyaseva' | 'Combine' | 'Both';
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  questionEn: string;
  questionMr: string;
  optionsEn: string[];
  optionsMr: string[];
  correctAnswerIndex: number;
  explanationEn: string;
  explanationMr: string;
  reference: string;
  yearTag?: string;
}

export interface ExamSession {
  id: string;
  title: string;
  patternId: ExamPatternId;
  questionIds: string[];
  totalQuestions: number;
  durationSeconds: number;
  remainingSeconds: number;
  negativeMarkRate: number; // e.g. 0.25 (1/4th) or 0.33 (1/3rd)
  marksPerQuestion: number; // e.g. 2 for Rajyaseva, 1 for Combine
  answers: Record<string, number>; // questionId -> selectedOption (0-3)
  markedForReview: Record<string, boolean>;
  visited: Record<string, boolean>;
  timeSpent: Record<string, number>; // questionId -> seconds
  isCompleted: boolean;
  startedAt: number;
  completedAt?: number;
}

export interface SubjectScoreBreakdown {
  total: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  accuracy: number;
  score: number;
}

export interface ExamResult {
  sessionId: string;
  title: string;
  patternId: ExamPatternId;
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  grossScore: number;
  negativePenalty: number;
  finalScore: number;
  maxScore: number;
  accuracyPercentage: number;
  timeSpentSeconds: number;
  subjectPerformance: Record<string, SubjectScoreBreakdown>;
  date: string;
  timestamp?: number;
  answers: Record<string, number>;
}

export interface StudySessionLog {
  id: string;
  title: string;
  timestamp: number;
  dateStr: string; // YYYY-MM-DD
  durationMinutes: number;
  questionsSolved: number;
  type: 'exam' | 'manual';
  notes?: string;
}

export interface UserProgress {
  history: ExamResult[];
  bookmarkedQuestionIds: string[];
  preferredLanguage: 'mr' | 'en';
  streakDays: number;
  lastActiveDay: string;
  notes: Record<string, string>; // questionId -> personal notes
  dailyTargetQuestions: number;
  todayQuestionsCount: number;
  weeklyTargetHours: number;
  weeklyTargetQuestions: number;
  studyLogs?: StudySessionLog[];
  soundEffectsEnabled?: boolean;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  totalScore: number;
  examsCount: number;
  accuracy: number;
  rank: number;
  isCurrentUser?: boolean;
  avatarUrl?: string;
  roleTag?: string;
}
