import { ExamPatternId, ExamSession, Question, SubjectId } from '../types';
import { MPSC_QUESTIONS } from '../data/mpscQuestions';
import { getHardQuestionsPool, findQuestionById } from './hardQuestionsEngine';

export function createExamSession(options: {
  patternId: ExamPatternId;
  subjectId?: SubjectId | 'gs' | 'all';
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
      subjectId: options.subjectId === 'gs' || !options.subjectId ? 'all' : (options.subjectId as SubjectId | 'all'),
      count: requestedCount,
    });
  } else if (options.patternId === 'daily_10_challenge') {
    if (options.subjectId === 'english_grammar') {
      eligibleQuestions = pool.filter((q) => q.subjectId === 'english_grammar');
    } else if (options.subjectId === 'marathi_grammar') {
      eligibleQuestions = pool.filter((q) => q.subjectId === 'marathi_grammar');
    } else if (options.subjectId === 'gs') {
      eligibleQuestions = pool.filter(
        (q) =>
          q.subjectId !== 'english_grammar' &&
          q.subjectId !== 'marathi_grammar' &&
          q.subjectId !== 'csat'
      );
    } else if (options.subjectId) {
      eligibleQuestions = pool.filter((q) => q.subjectId === options.subjectId);
    } else {
      // Balanced Combo: GS + Marathi + English
      const gsQs = pool
        .filter(
          (q) =>
            q.subjectId !== 'english_grammar' &&
            q.subjectId !== 'marathi_grammar' &&
            q.subjectId !== 'csat'
        )
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      const marathiQs = pool
        .filter((q) => q.subjectId === 'marathi_grammar')
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      const englishQs = pool
        .filter((q) => q.subjectId === 'english_grammar')
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      eligibleQuestions = [...gsQs, ...marathiQs, ...englishQs];
    }
  } else if (options.subjectId) {
    if (options.subjectId === 'gs') {
      eligibleQuestions = pool.filter(
        (q) =>
          q.subjectId !== 'english_grammar' &&
          q.subjectId !== 'marathi_grammar' &&
          q.subjectId !== 'csat'
      );
    } else {
      eligibleQuestions = pool.filter((q) => q.subjectId === options.subjectId);
    }
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
  } else if (options.patternId === 'mpsc_combine_pre_2026') {
    eligibleQuestions = pool.filter((q) => q.id.startsWith('pyq_combine_26_'));
  } else if (options.patternId === 'mpsc_pyq_2024') {
    eligibleQuestions = pool.filter((q) => q.id.startsWith('pyq_2024_'));
  } else if (options.patternId === 'mpsc_pyq_2023') {
    eligibleQuestions = pool.filter((q) => q.id.startsWith('pyq_2023_'));
  } else if (options.patternId === 'mpsc_combine_pre_2023') {
    eligibleQuestions = pool.filter((q) => q.id.startsWith('pyq_combine_23_'));
  } else if (options.patternId === 'mpsc_combine_pre_2022') {
    eligibleQuestions = pool.filter((q) => q.id.startsWith('pyq_combine_22_'));
  } else if (options.patternId === 'mpsc_combine_pre_2021') {
    eligibleQuestions = pool.filter((q) => q.id.startsWith('pyq_combine_21_'));
  } else if (options.patternId === 'mpsc_combine_pre_2020') {
    eligibleQuestions = pool.filter((q) => q.id.startsWith('pyq_combine_20_'));
  } else if (options.patternId === 'mpsc_pyq_2022') {
    eligibleQuestions = pool.filter((q) => q.id.startsWith('pyq_2022_'));
  } else if (options.patternId === 'mpsc_combine_mains_pyq') {
    eligibleQuestions = pool.filter((q) => q.id.startsWith('pyq_mains_'));
  } else if (options.patternId === 'mpsc_group_c_pre') {
    eligibleQuestions = pool.filter((q) => q.id.startsWith('pyq_group_c_'));
  } else if (options.patternId === 'mpsc_rajyaseva_pre_2025') {
    eligibleQuestions = pool.filter((q) => q.id.startsWith('pyq_2025_gs_'));
  } else if (options.patternId === 'mpsc_combine_pre_2025') {
    eligibleQuestions = pool.filter((q) => q.id.startsWith('pyq_2025_comb_'));
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
  const defaultLimit = options.patternId === 'daily_10_challenge'
    ? (options.limit || (options.subjectId ? 10 : 15))
    : options.patternId === 'current_affairs_2026'
    ? 25
    : options.patternId === 'hard_challenge'
    ? 25
    : (options.patternId === 'mpsc_combine_pre_2026' || options.patternId === 'mpsc_pyq_2024' || options.patternId === 'mpsc_pyq_2023' || options.patternId === 'mpsc_combine_pre_2023' || options.patternId === 'mpsc_combine_pre_2022' || options.patternId === 'mpsc_combine_pre_2021' || options.patternId === 'mpsc_combine_pre_2020' || options.patternId === 'mpsc_pyq_2022' || options.patternId === 'mpsc_combine_mains_pyq')
    ? undefined
    : (options.subjectId === 'current_affairs' ? 25 : undefined);
  const limit = options.limit || defaultLimit;
  const isOfficialSequential = options.patternId === 'mpsc_combine_pre_2026' ||
    options.patternId === 'mpsc_pyq_2024' || 
    options.patternId === 'mpsc_pyq_2023' || 
    options.patternId === 'mpsc_combine_pre_2023' || 
    options.patternId === 'mpsc_combine_pre_2022' || 
    options.patternId === 'mpsc_combine_pre_2021' || 
    options.patternId === 'mpsc_combine_pre_2020' || 
    options.patternId === 'mpsc_pyq_2022' || 
    options.patternId === 'mpsc_combine_mains_pyq';
  const shuffled = isOfficialSequential
    ? [...uniqueEligible] 
    : [...uniqueEligible].sort(() => 0.5 - Math.random());
  const selected = limit ? shuffled.slice(0, limit) : shuffled;

  // Pattern specifics
  let durationMinutes = options.durationMinutes || 15;
  let marksPerQuestion = 2;
  let negativeMarkRate = 0.25; // 1/4th penalty (i.e. -0.5 for 2 marks)
  let defaultTitle = 'MPSC Practice Test';

  if (options.patternId === 'mpsc_combine_pre_2026') {
    defaultTitle = options.title || 'MPSC अराजपत्रित गट-ब संयुक्त पूर्व परीक्षा २०२६ (14 June 2026, Booklet H25)';
    marksPerQuestion = 1;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 60;
  } else if (options.patternId === 'mpsc_pyq_2024') {
    defaultTitle = options.title || 'MPSC राजपत्रित नागरी सेवा संयुक्त (पूर्व) परीक्षा २०२४ (Original Paper 1)';
    marksPerQuestion = 2;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 120;
  } else if (options.patternId === 'mpsc_pyq_2023') {
    defaultTitle = options.title || 'MPSC राजपत्रित नागरी सेवा संयुक्त (पूर्व) परीक्षा २०२३ (Paper 1 - GS)';
    marksPerQuestion = 2;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 120;
  } else if (options.patternId === 'mpsc_combine_pre_2023') {
    defaultTitle = options.title || 'MPSC अराजपत्रित गट-ब व गट-क संयुक्त पूर्व परीक्षा २०२३ (30 April 2023)';
    marksPerQuestion = 1;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 60;
  } else if (options.patternId === 'mpsc_combine_pre_2022') {
    defaultTitle = options.title || 'MPSC दुय्यम सेवा गट-ब संयुक्त पूर्व परीक्षा २०२२ (08 Oct 2022, Booklet A16)';
    marksPerQuestion = 1;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 60;
  } else if (options.patternId === 'mpsc_combine_pre_2021') {
    defaultTitle = options.title || 'MPSC दुय्यम सेवा गट-ब संयुक्त पूर्व परीक्षा २०२१ (26 Feb 2022, Booklet U14)';
    marksPerQuestion = 1;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 60;
  } else if (options.patternId === 'mpsc_combine_pre_2020') {
    defaultTitle = options.title || 'MPSC दुय्यम सेवा गट-ब संयुक्त पूर्व परीक्षा २०२० (04 Sept 2021, Booklet A14)';
    marksPerQuestion = 1;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 60;
  } else if (options.patternId === 'mpsc_pyq_2022') {
    defaultTitle = options.title || 'MPSC राज्यसेवा / संयुक्त पूर्व परीक्षा २०२२ (अधिकृत PYQ)';
    marksPerQuestion = 2;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 60;
  } else if (options.patternId === 'mpsc_combine_mains_pyq') {
    defaultTitle = options.title || 'MPSC गट-ब संयुक्त मुख्य परीक्षा (अधिकृत पेपर १ व २ PYQ)';
    marksPerQuestion = 2;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 60;
  } else if (options.patternId === 'hard_challenge') {
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
    defaultTitle = options.title || (
      options.subjectId === 'english_grammar'
        ? 'Daily 10-Minute Challenge: इंग्रजी व्याकरण (English Grammar)'
        : options.subjectId === 'marathi_grammar'
        ? 'Daily 10-Minute Challenge: मराठी व्याकरण (Marathi Grammar)'
        : options.subjectId === 'gs'
        ? 'Daily 10-Minute Challenge: सामान्य अध्ययन (General Studies - GS)'
        : 'Daily 10-Minute Rapid MPSC Challenge'
    );
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
