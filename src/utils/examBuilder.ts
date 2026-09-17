import { ExamPatternId, ExamSession, Question, SubjectId } from '../types';
import { MPSC_QUESTIONS } from '../data/mpscQuestions';

export function createExamSession(options: {
  patternId: ExamPatternId;
  subjectId?: SubjectId;
  customQuestionIds?: string[];
  title?: string;
  limit?: number;
  durationMinutes?: number;
}): ExamSession {
  let eligibleQuestions: Question[] = [];

  if (options.customQuestionIds && options.customQuestionIds.length > 0) {
    eligibleQuestions = MPSC_QUESTIONS.filter((q) =>
      options.customQuestionIds!.includes(q.id)
    );
  } else if (options.subjectId) {
    eligibleQuestions = MPSC_QUESTIONS.filter((q) => q.subjectId === options.subjectId);
  } else if (options.patternId === 'rajyaseva_gs') {
    eligibleQuestions = MPSC_QUESTIONS.filter(
      (q) => q.exam === 'Rajyaseva' || q.exam === 'Both'
    );
  } else if (options.patternId === 'combine_group_b_c') {
    eligibleQuestions = MPSC_QUESTIONS.filter(
      (q) => q.exam === 'Combine' || q.exam === 'Both'
    );
  } else if (options.patternId === 'csat_booster') {
    eligibleQuestions = MPSC_QUESTIONS.filter((q) => q.subjectId === 'csat');
  } else if (options.patternId === 'maharashtra_special') {
    eligibleQuestions = MPSC_QUESTIONS.filter(
      (q) => q.subjectId === 'maharashtra_history' || q.subjectId === 'maharashtra_geography'
    );
  } else {
    eligibleQuestions = [...MPSC_QUESTIONS];
  }

  // Shuffle questions
  const shuffled = [...eligibleQuestions].sort(() => 0.5 - Math.random());
  const selected = options.limit ? shuffled.slice(0, options.limit) : shuffled;

  // Pattern specifics
  let durationMinutes = options.durationMinutes || 15;
  let marksPerQuestion = 2;
  let negativeMarkRate = 0.25; // 1/4th penalty (i.e. -0.5 for 2 marks)
  let defaultTitle = 'MPSC Practice Test';

  if (options.patternId === 'rajyaseva_gs') {
    defaultTitle = 'MPSC Rajyaseva GS Prelims Mock';
    marksPerQuestion = 2;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || Math.max(10, selected.length * 1.2);
  } else if (options.patternId === 'combine_group_b_c') {
    defaultTitle = 'MPSC Combine Group B & C Prelims Mock';
    marksPerQuestion = 1;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || Math.max(10, selected.length * 0.8);
  } else if (options.patternId === 'daily_10_challenge') {
    defaultTitle = 'Daily 10-Minute Rapid MPSC Challenge';
    marksPerQuestion = 2;
    negativeMarkRate = 0.25;
    durationMinutes = 10;
  } else if (options.patternId === 'csat_booster') {
    defaultTitle = 'CSAT Aptitude & Reasoning Sprint';
    marksPerQuestion = 2.5;
    negativeMarkRate = 0.33;
    durationMinutes = 15;
  } else if (options.subjectId) {
    defaultTitle = `${options.title || 'Subject Test'}`;
    marksPerQuestion = 2;
    negativeMarkRate = 0.25;
    durationMinutes = Math.max(8, selected.length * 1.5);
  }

  const durationSeconds = Math.round(durationMinutes * 60);

  return {
    id: `exam_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    title: options.title || defaultTitle,
    patternId: options.patternId,
    questionIds: selected.map((q) => q.id),
    totalQuestions: selected.length,
    durationSeconds,
    remainingSeconds: durationSeconds,
    negativeMarkRate,
    marksPerQuestion,
    answers: {},
    markedForReview: {},
    visited: { [selected[0]?.id || '']: true },
    timeSpent: {},
    isCompleted: false,
    startedAt: Date.now(),
  };
}
