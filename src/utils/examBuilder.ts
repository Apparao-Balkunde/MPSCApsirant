import { ExamPatternId, ExamSession, Question, SubjectId } from '../types';
import { MPSC_QUESTIONS } from '../data/mpscQuestions';
import { getHardQuestionsPool, findQuestionById } from './hardQuestionsEngine';

export function createExamSession(options: {
  patternId: ExamPatternId;
  subjectId?: SubjectId;
  customQuestionIds?: string[];
  title?: string;
  limit?: number;
  durationMinutes?: number;
  questionPool?: Question[];
  difficulty?: 'Easy' | 'Moderate' | 'Hard' | 'all';
}): ExamSession {
  const rawPool = options.questionPool && options.questionPool.length > 0 ? options.questionPool : MPSC_QUESTIONS;
  
  // Deduplicate pool by question ID
  const poolMap = new Map<string, Question>();
  rawPool.forEach((q) => {
    if (q && q.id && !poolMap.has(q.id)) {
      poolMap.set(q.id, q);
    }
  });
  const pool = Array.from(poolMap.values());

  let eligibleQuestions: Question[] = [];

  if (options.customQuestionIds && options.customQuestionIds.length > 0) {
    const uniqueIds = Array.from(new Set(options.customQuestionIds));
    const matchedMap = new Map<string, Question>();
    uniqueIds.forEach((id) => {
      const q = poolMap.get(id) || findQuestionById(id, pool);
      if (q && !matchedMap.has(q.id)) {
        matchedMap.set(q.id, q);
      }
    });
    eligibleQuestions = Array.from(matchedMap.values());
  } else if (options.patternId === 'hard_challenge') {
    const requestedCount = options.limit || 25;
    eligibleQuestions = getHardQuestionsPool({
      subjectId: options.subjectId || 'all',
      count: requestedCount,
    });
  } else if (options.subjectId) {
    eligibleQuestions = pool.filter((q) => q.subjectId === options.subjectId);
  } else if (options.patternId === 'rajyaseva_gs') {
    eligibleQuestions = pool.filter(
      (q) => q.exam === 'Rajyaseva' || q.exam === 'Both'
    );
  } else if (options.patternId === 'combine_group_b_c') {
    eligibleQuestions = pool.filter(
      (q) => q.exam === 'Combine' || q.exam === 'Both'
    );
  } else if (options.patternId === 'csat_booster') {
    eligibleQuestions = pool.filter((q) => q.subjectId === 'csat');
  } else if (options.patternId === 'maharashtra_special') {
    eligibleQuestions = pool.filter(
      (q) => q.subjectId === 'maharashtra_history' || q.subjectId === 'maharashtra_geography'
    );
  } else if (options.patternId === 'current_affairs_2026') {
    eligibleQuestions = pool.filter(
      (q) => q.subjectId === 'current_affairs' || q.yearTag?.includes('2026') || q.yearTag?.includes('2027')
    );
  } else {
    eligibleQuestions = [...pool];
  }

  // Filter by difficulty if specified and not hard_challenge
  if (options.difficulty && options.difficulty !== 'all' && options.patternId !== 'hard_challenge') {
    const diffFiltered = eligibleQuestions.filter((q) => q.difficulty === options.difficulty);
    if (diffFiltered.length > 0) {
      eligibleQuestions = diffFiltered;
    }
  }

  // Ensure eligibleQuestions has strictly unique questions
  const uniqueEligibleMap = new Map<string, Question>();
  eligibleQuestions.forEach((q) => {
    if (q && q.id && !uniqueEligibleMap.has(q.id)) {
      uniqueEligibleMap.set(q.id, q);
    }
  });
  const uniqueEligible = Array.from(uniqueEligibleMap.values());

  // Shuffle questions and apply sensible limits for large question banks
  const defaultLimit = options.patternId === 'current_affairs_2026'
    ? 25
    : options.patternId === 'hard_challenge'
    ? 25
    : (options.subjectId === 'current_affairs' ? 25 : undefined);
  const limit = options.limit || defaultLimit;
  const shuffled = [...uniqueEligible].sort(() => 0.5 - Math.random());
  const selected = limit ? shuffled.slice(0, limit) : shuffled;

  // Pattern specifics
  let durationMinutes = options.durationMinutes || 15;
  let marksPerQuestion = 2;
  let negativeMarkRate = 0.25; // 1/4th penalty (i.e. -0.5 for 2 marks)
  let defaultTitle = 'MPSC Practice Test';

  if (options.patternId === 'hard_challenge') {
    defaultTitle = options.title || 'MPSC 100k Hard Level Challenge (कठीण स्तर सराव)';
    marksPerQuestion = 2;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || Math.max(15, Math.round(selected.length * 1.5));
  } else if (options.patternId === 'rajyaseva_gs') {
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
  } else if (options.patternId === 'current_affairs_2026') {
    defaultTitle = options.title || 'MPSC 2026/27 चालू घडामोडी विशेष (Current Affairs)';
    marksPerQuestion = 2;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 20;
  } else if (options.subjectId) {
    defaultTitle = `${options.title || 'Subject Test'}`;
    marksPerQuestion = 2;
    negativeMarkRate = 0.25;
    durationMinutes = Math.max(8, selected.length * 1.5);
  }

  const durationSeconds = Math.round(durationMinutes * 60);

  // Guarantee final unique question IDs
  const finalQuestionIds = Array.from(new Set(selected.map((q) => q.id)));

  return {
    id: `exam_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    title: options.title || defaultTitle,
    patternId: options.patternId,
    questionIds: finalQuestionIds,
    totalQuestions: finalQuestionIds.length,
    durationSeconds,
    remainingSeconds: durationSeconds,
    negativeMarkRate,
    marksPerQuestion,
    answers: {},
    markedForReview: {},
    visited: { [finalQuestionIds[0] || '']: true },
    timeSpent: {},
    isCompleted: false,
    startedAt: Date.now(),
  };
}
