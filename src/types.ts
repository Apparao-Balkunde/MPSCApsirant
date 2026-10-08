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
  | 'hard_challenge'
  | 'mpsc_combine_pre_2026'
  | 'mpsc_pyq_2024'
  | 'mpsc_pyq_2023'
  | 'mpsc_combine_pre_2023'
  | 'mpsc_combine_pre_2022'
  | 'mpsc_combine_pre_2021'
  | 'mpsc_combine_pre_2020'
  | 'mpsc_pyq_2022'
  | 'mpsc_combine_mains_pyq'
  | 'mpsc_group_c_pre'
  | 'mpsc_rajyaseva_pre_2025'
  | 'mpsc_combine_pre_2025'
  | 'mpsc_rajyaseva_pre_2021'
  | 'mpsc_rajyaseva_pre_2020'
  | 'mpsc_group_c_talathi_set_1'
  | 'mpsc_group_c_talathi_set_2'
  | 'mpsc_group_c_talathi_set_3'
  | 'mpsc_group_c_talathi_set_4'
  | 'mpsc_group_c_talathi_set_5'
  | 'mpsc_group_c_talathi_set_6'
  | 'mpsc_group_c_talathi_set_7'
  | 'mpsc_group_c_talathi_set_8'
  | 'mpsc_group_c_talathi_set_9'
  | 'mpsc_group_c_talathi_set_10'
  | 'mpsc_group_c_talathi_set_11'
  | 'mpsc_group_c_talathi_set_12'
  | 'mpsc_group_c_talathi_set_13'
  | 'mpsc_group_c_talathi_set_14'
  | 'mpsc_group_c_talathi_set_15'
  | 'mpsc_group_c_talathi_set_16'
  | 'mpsc_group_c_talathi_set_17'
  | 'mpsc_group_c_talathi_set_18'
  | 'mpsc_group_c_talathi_set_19'
  | 'mpsc_group_c_talathi_set_20'
  | 'mpsc_group_c_talathi_set_21'
  | 'mpsc_group_c_talathi_set_22'
  | 'mpsc_group_c_talathi_set_23'
  | 'mpsc_group_c_talathi_set_24'
  | 'mpsc_group_c_talathi_set_25'
  | 'mpsc_group_c_talathi_set_26'
  | 'mpsc_group_c_talathi_set_27'
  | 'mpsc_group_c_talathi_set_28'
  | 'mpsc_group_c_talathi_set_29'
  | 'mpsc_group_c_talathi_set_30'
  | 'mpsc_group_c_talathi_set_31'
  | 'mpsc_group_c_talathi_set_32'
  | 'mpsc_group_c_talathi_set_33'
  | 'mpsc_group_c_talathi_set_34'
  | 'mpsc_group_c_talathi_set_35'
  | 'mpsc_group_c_talathi_set_36'
  | 'mpsc_group_c_talathi_set_37'
  | 'mpsc_group_c_talathi_set_38'
  | 'mpsc_group_c_talathi_set_39'
  | 'mpsc_group_c_talathi_set_40'
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
  candidateRollNo?: string;
  candidateName?: string;
  examDateTag?: string;
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
  stateRank?: number;
  totalCandidates?: number;
  percentile?: number;
  cutOffStatus?: 'qualified' | 'borderline' | 'needs_practice';
  targetExamTag?: string;
  candidateRollNo?: string;
  candidateName?: string;
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
  bookmarkedRuleIds?: string[];
}

export interface GrammarExample {
  sentence: string;
  isCorrect?: boolean;
  explanation: string;
  explanationMr?: string;
}

export interface GrammarRule {
  id: string;
  language: 'marathi' | 'english';
  category: string;
  categoryMr: string;
  title: string;
  titleMr: string;
  formula?: string;
  formulaMr?: string;
  definition: string;
  definitionMr: string;
  keyPoints: string[];
  keyPointsMr: string[];
  examples: GrammarExample[];
  exceptions?: string[];
  exceptionsMr?: string[];
  examTip: string;
  examTipMr: string;
  practiceQuestionIds?: string[];
  tags: string[];
  bookmarkable?: boolean;
  isBookmarkable?: boolean;
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

