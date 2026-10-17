import { ExamPatternId, ExamSession, Question, SubjectId, UserProgress } from '../types';
import { MPSC_QUESTIONS } from '../data/mpscQuestions';
import { getHardQuestionsPool, findQuestionById } from './hardQuestionsEngine';
import { getGroupCTalathiSetQuestions, MPSC_GROUP_C_TALATHI_SETS_CATALOG } from '../data/mpscGroupCTalathiSets';
import { getSubjectMarathonQuestions, getSubjectMarathonMeta } from '../data/subjectMarathonSetsData';

export function createExamSession(options: {
  patternId: ExamPatternId;
  subjectId?: SubjectId | 'gs' | 'all';
  customQuestionIds?: string[];
  title?: string;
  limit?: number;
  durationMinutes?: number;
  questionPool?: Question[];
  difficulty?: 'Easy' | 'Moderate' | 'Hard' | 'all';
  excludeQuestionIds?: string[];
  testNumber?: number;
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
  } else if (options.patternId === 'mpsc_rajyaseva_pre_2021') {
    eligibleQuestions = pool.filter((q) => q.id.startsWith('pyq_2021_gs_'));
  } else if (options.patternId === 'mpsc_rajyaseva_pre_2020') {
    eligibleQuestions = pool.filter((q) => q.id.startsWith('pyq_2020_gs_'));
  } else if (options.patternId === 'mpsc_combine_pre_2019') {
    eligibleQuestions = pool.filter((q) => q.id.startsWith('pyq_comb_19_'));
  } else if (options.patternId === 'mpsc_rajyaseva_pre_2019') {
    eligibleQuestions = pool.filter((q) => q.id.startsWith('pyq_raj_19_'));
  } else if (options.patternId === 'mpsc_combine_pre_2018') {
    eligibleQuestions = pool.filter((q) => q.id.startsWith('pyq_comb_18_'));
  } else if (options.patternId === 'mpsc_rajyaseva_pre_2018') {
    eligibleQuestions = pool.filter((q) => q.id.startsWith('pyq_raj_18_'));
  } else if (options.patternId.startsWith('mpsc_group_c_talathi_set_')) {
    const setNum = parseInt(options.patternId.replace('mpsc_group_c_talathi_set_', ''), 10) || 1;
    eligibleQuestions = getGroupCTalathiSetQuestions(setNum, pool);
  } else if (
    options.patternId === 'marathon_geo_forest_100' ||
    options.patternId === 'marathon_science_100' ||
    options.patternId === 'marathon_current_affairs_100' ||
    options.patternId === 'marathon_polity_100'
  ) {
    eligibleQuestions = getSubjectMarathonQuestions(options.patternId, pool);
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

  // Exclude specified question IDs (e.g. from previous test to ensure new questions)
  if (options.excludeQuestionIds && options.excludeQuestionIds.length > 0) {
    const excludedSet = new Set(options.excludeQuestionIds);
    const nonExcluded = eligibleQuestions.filter((q) => !excludedSet.has(q.id));
    if (nonExcluded.length >= (options.limit || 5)) {
      eligibleQuestions = nonExcluded;
    } else if (nonExcluded.length > 0) {
      eligibleQuestions = nonExcluded;
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
    : (options.patternId === 'mpsc_combine_pre_2026' || 
       options.patternId === 'mpsc_rajyaseva_pre_2025' ||
       options.patternId === 'mpsc_combine_pre_2025' ||
       options.patternId === 'mpsc_pyq_2024' || 
       options.patternId === 'mpsc_pyq_2023' || 
       options.patternId === 'mpsc_combine_pre_2023' || 
       options.patternId === 'mpsc_combine_pre_2022' || 
       options.patternId === 'mpsc_combine_pre_2021' || 
       options.patternId === 'mpsc_rajyaseva_pre_2021' || 
       options.patternId === 'mpsc_rajyaseva_pre_2020' || 
       options.patternId === 'mpsc_combine_pre_2020' || 
       options.patternId === 'mpsc_pyq_2022' || 
       options.patternId === 'mpsc_group_c_pre' ||
       options.patternId === 'mpsc_combine_mains_pyq' ||
       options.patternId.startsWith('mpsc_group_c_talathi_set_') ||
       options.patternId.startsWith('marathon_'))
    ? undefined
    : (options.subjectId === 'current_affairs' ? 25 : undefined);
  const limit = options.limit || defaultLimit;
  const isOfficialSequential = options.patternId === 'mpsc_combine_pre_2026' ||
    options.patternId === 'mpsc_rajyaseva_pre_2025' ||
    options.patternId === 'mpsc_combine_pre_2025' ||
    options.patternId === 'mpsc_pyq_2024' || 
    options.patternId === 'mpsc_pyq_2023' || 
    options.patternId === 'mpsc_combine_pre_2023' || 
    options.patternId === 'mpsc_combine_pre_2022' || 
    options.patternId === 'mpsc_combine_pre_2021' || 
    options.patternId === 'mpsc_rajyaseva_pre_2021' || 
    options.patternId === 'mpsc_rajyaseva_pre_2020' || 
    options.patternId === 'mpsc_combine_pre_2020' || 
    options.patternId === 'mpsc_pyq_2022' || 
    options.patternId === 'mpsc_group_c_pre' ||
    options.patternId === 'mpsc_combine_mains_pyq' ||
    options.patternId.startsWith('mpsc_group_c_talathi_set_') ||
    options.patternId.startsWith('marathon_');
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
  } else if (options.patternId === 'mpsc_group_c_pre') {
    defaultTitle = options.title || 'MPSC गट-क संयुक्त पूर्व परीक्षा (अधिकृत PYQ)';
    marksPerQuestion = 1;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 60;
  } else if (options.patternId.startsWith('mpsc_group_c_talathi_set_')) {
    const setNum = parseInt(options.patternId.replace('mpsc_group_c_talathi_set_', ''), 10) || 1;
    const meta = MPSC_GROUP_C_TALATHI_SETS_CATALOG.find((s) => s.setNumber === setNum);
    defaultTitle = options.title || meta?.titleMr || `MPSC गट-क / तलाठी महा सराव संच ${setNum} (३ जाने २०२७ विशेष)`;
    marksPerQuestion = 1;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 60;
  } else if (options.patternId.startsWith('marathon_')) {
    const marathonMeta = getSubjectMarathonMeta(options.patternId);
    defaultTitle = options.title || marathonMeta?.titleMr || 'MPSC विषयनिहाय १०० प्रश्न मॅरेथॉन पेपर';
    marksPerQuestion = 1;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 60;
  } else if (options.patternId === 'mpsc_rajyaseva_pre_2025') {
    defaultTitle = options.title || 'MPSC राजपत्रित नागरी सेवा संयुक्त (पूर्व) परीक्षा २०२५ (Paper 1 - GS)';
    marksPerQuestion = 2;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 120;
  } else if (options.patternId === 'mpsc_combine_pre_2025') {
    defaultTitle = options.title || 'MPSC अराजपत्रित गट-ब व गट-क संयुक्त पूर्व परीक्षा २०२५';
    marksPerQuestion = 1;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 60;
  } else if (options.patternId === 'mpsc_rajyaseva_pre_2021') {
    defaultTitle = options.title || 'MPSC राज्यसेवा पूर्व परीक्षा २०२१ (२३ जानेवारी २०२२, Paper 1 - GS)';
    marksPerQuestion = 2;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 120;
  } else if (options.patternId === 'mpsc_rajyaseva_pre_2020') {
    defaultTitle = options.title || 'MPSC राज्यसेवा पूर्व परीक्षा २०२० (२१ मार्च २०२१, Paper 1 - GS)';
    marksPerQuestion = 2;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 120;
  } else if (options.patternId === 'mpsc_combine_pre_2019') {
    defaultTitle = options.title || 'MPSC दुय्यम सेवा गट-ब संयुक्त पूर्व परीक्षा २०१९ (२४ मार्च २०१९)';
    marksPerQuestion = 1;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 60;
  } else if (options.patternId === 'mpsc_rajyaseva_pre_2019') {
    defaultTitle = options.title || 'MPSC राज्यसेवा पूर्व परीक्षा २०१९ (१७ फेब्रुवारी २०१९, Paper 1 - GS)';
    marksPerQuestion = 2;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 120;
  } else if (options.patternId === 'mpsc_combine_pre_2018') {
    defaultTitle = options.title || 'MPSC दुय्यम सेवा गट-ब संयुक्त पूर्व परीक्षा २०१८ (१३ मे २०१८)';
    marksPerQuestion = 1;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 60;
  } else if (options.patternId === 'mpsc_rajyaseva_pre_2018') {
    defaultTitle = options.title || 'MPSC राज्यसेवा पूर्व परीक्षा २०१८ (०८ एप्रिल २०१८, Paper 1 - GS)';
    marksPerQuestion = 2;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || 120;
  } else if (options.patternId === 'hard_challenge') {
    defaultTitle = options.title || 'MPSC 100k Hard Level Challenge (कठीण स्तर सराव)';
    marksPerQuestion = 2;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || Math.max(15, Math.round(selected.length * 1.5));
  } else if (options.patternId === 'weak_area_remedial') {
    defaultTitle = options.title || 'MPSC कमकुवत घटक सुधारणा सराव (Weak Area Booster Drill)';
    marksPerQuestion = 2;
    negativeMarkRate = 0.25;
    durationMinutes = options.durationMinutes || Math.max(10, Math.round(selected.length * 1.5));
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
    subjectId: options.subjectId,
    limit: options.limit,
    testNumber: options.testNumber || 1,
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

/**
 * Creates the Next Exam Session with guaranteed NEW / UNSEEN questions!
 * Supports all MPSC exam modes:
 * - Talathi / Group C 50 Sets: proceeds sequentially to the next set (Set 1 -> 2 -> ... -> 50)
 * - Official PYQs: advances to the next paper year
 * - 100-Question Subject Marathons: cycles to the next marathon set
 * - Hard Challenges: pulls fresh 25 hard questions
 * - Daily 10 Challenges: pulls 10-15 unattempted daily questions
 * - Subject Practice / Custom Mock: detects subject, excludes current test's questions,
 *   and prioritizes unattempted questions from the user's progress history.
 */
export function createNextExamSession(options: {
  currentSession: ExamSession;
  questionPool?: Question[];
  userProgress?: UserProgress;
  language?: 'mr' | 'en';
}): ExamSession {
  const isMr = options.language !== 'en';
  const pool = options.questionPool && options.questionPool.length > 0 ? options.questionPool : MPSC_QUESTIONS;
  const currentSession = options.currentSession;
  const currentIds = currentSession.questionIds || [];
  const currentTestNumber = currentSession.testNumber || 1;
  const nextTestNumber = currentTestNumber + 1;

  // Gather all historical question IDs attempted by student to prioritize unattempted questions
  const historicallyAttemptedIds = new Set<string>();
  if (options.userProgress?.history) {
    options.userProgress.history.forEach((h) => {
      if (h.answers) {
        Object.keys(h.answers).forEach((qId) => historicallyAttemptedIds.add(qId));
      }
    });
  }
  // Guarantee questions from current finished test are excluded
  currentIds.forEach((qId) => historicallyAttemptedIds.add(qId));

  // 1. Group C & Talathi 50 Sets Test Series
  if (currentSession.patternId.startsWith('mpsc_group_c_talathi_set_')) {
    const currentSetNum = parseInt(currentSession.patternId.replace('mpsc_group_c_talathi_set_', ''), 10) || 1;
    const nextSetNum = currentSetNum < 50 ? currentSetNum + 1 : 1;
    const nextPatternId = `mpsc_group_c_talathi_set_${nextSetNum}` as ExamPatternId;
    const setMeta = MPSC_GROUP_C_TALATHI_SETS_CATALOG.find((s) => s.setNumber === nextSetNum);
    const title = setMeta
      ? (isMr ? `${setMeta.titleMr} (नवीन १०० प्रश्न)` : `${setMeta.titleEn} (New 100 Qs)`)
      : (isMr ? `MPSC गट-क / तलाठी सराव टेस्ट संच #${nextSetNum} (नवीन १०० प्रश्न)` : `MPSC Group C / Talathi Practice Test Set #${nextSetNum} (New 100 Qs)`);

    return createExamSession({
      patternId: nextPatternId,
      title,
      questionPool: pool,
      testNumber: nextSetNum,
    });
  }

  // 2. Official Combine PYQs Paper Progression
  const COMBINE_PYQS: { patternId: ExamPatternId; titleMr: string; titleEn: string }[] = [
    { patternId: 'mpsc_combine_pre_2026', titleMr: 'MPSC संयुक्त पूर्व परीक्षा २०२६ (नवीन प्रश्नसंच)', titleEn: 'MPSC Combine Prelims 2026 (New Paper)' },
    { patternId: 'mpsc_combine_pre_2025', titleMr: 'MPSC संयुक्त पूर्व परीक्षा २०२५ (नवीन प्रश्नसंच)', titleEn: 'MPSC Combine Prelims 2025 (New Paper)' },
    { patternId: 'mpsc_combine_pre_2023', titleMr: 'MPSC संयुक्त पूर्व परीक्षा २०२३ (नवीन प्रश्नसंच)', titleEn: 'MPSC Combine Prelims 2023 (New Paper)' },
    { patternId: 'mpsc_combine_pre_2022', titleMr: 'MPSC संयुक्त पूर्व परीक्षा २०२२ (नवीन प्रश्नसंच)', titleEn: 'MPSC Combine Prelims 2022 (New Paper)' },
    { patternId: 'mpsc_combine_pre_2021', titleMr: 'MPSC संयुक्त पूर्व परीक्षा २०२१ (नवीन प्रश्नसंच)', titleEn: 'MPSC Combine Prelims 2021 (New Paper)' },
    { patternId: 'mpsc_combine_pre_2020', titleMr: 'MPSC संयुक्त पूर्व परीक्षा २०२० (नवीन प्रश्नसंच)', titleEn: 'MPSC Combine Prelims 2020 (New Paper)' },
    { patternId: 'mpsc_combine_pre_2019', titleMr: 'MPSC दुय्यम सेवा गट-ब पूर्व २०१९ (नवीन प्रश्नसंच)', titleEn: 'MPSC Combine Subordinate 2019 (New Paper)' },
    { patternId: 'mpsc_combine_pre_2018', titleMr: 'MPSC दुय्यम सेवा गट-ब पूर्व २०१८ (नवीन प्रश्नसंच)', titleEn: 'MPSC Combine Subordinate 2018 (New Paper)' },
    { patternId: 'mpsc_group_c_pre', titleMr: 'MPSC गट-क संयुक्त पूर्व परीक्षा (नवीन प्रश्नसंच)', titleEn: 'MPSC Group C Combine Prelims (New Paper)' },
    { patternId: 'mpsc_combine_mains_pyq', titleMr: 'MPSC संयुक्त मुख्य परीक्षा PYQ (नवीन प्रश्नसंच)', titleEn: 'MPSC Combine Mains PYQ (New Paper)' },
  ];
  const combineIdx = COMBINE_PYQS.findIndex((p) => p.patternId === currentSession.patternId);
  if (combineIdx !== -1) {
    const nextItem = COMBINE_PYQS[(combineIdx + 1) % COMBINE_PYQS.length];
    return createExamSession({
      patternId: nextItem.patternId,
      title: isMr ? nextItem.titleMr : nextItem.titleEn,
      questionPool: pool,
      testNumber: nextTestNumber,
    });
  }

  // 3. Official Rajyaseva Civil Services PYQs Paper Progression
  const RAJYASEVA_PYQS: { patternId: ExamPatternId; titleMr: string; titleEn: string }[] = [
    { patternId: 'mpsc_rajyaseva_pre_2025', titleMr: 'MPSC राज्यसेवा पूर्व परीक्षा २०२५ (नवीन प्रश्नसंच)', titleEn: 'MPSC Rajyaseva Prelims 2025 (New Paper)' },
    { patternId: 'mpsc_pyq_2024', titleMr: 'MPSC राज्यसेवा पूर्व परीक्षा २०२४ (नवीन प्रश्नसंच)', titleEn: 'MPSC Rajyaseva Prelims 2024 (New Paper)' },
    { patternId: 'mpsc_pyq_2023', titleMr: 'MPSC राज्यसेवा पूर्व परीक्षा २०२३ (नवीन प्रश्नसंच)', titleEn: 'MPSC Rajyaseva Prelims 2023 (New Paper)' },
    { patternId: 'mpsc_pyq_2022', titleMr: 'MPSC राज्यसेवा पूर्व परीक्षा २०२२ (नवीन प्रश्नसंच)', titleEn: 'MPSC Rajyaseva Prelims 2022 (New Paper)' },
    { patternId: 'mpsc_rajyaseva_pre_2021', titleMr: 'MPSC राज्यसेवा पूर्व परीक्षा २०२१ (नवीन प्रश्नसंच)', titleEn: 'MPSC Rajyaseva Prelims 2021 (New Paper)' },
    { patternId: 'mpsc_rajyaseva_pre_2020', titleMr: 'MPSC राज्यसेवा पूर्व परीक्षा २०२० (नवीन प्रश्नसंच)', titleEn: 'MPSC Rajyaseva Prelims 2020 (New Paper)' },
    { patternId: 'mpsc_rajyaseva_pre_2019', titleMr: 'MPSC राज्यसेवा पूर्व परीक्षा २०१९ (नवीन प्रश्नसंच)', titleEn: 'MPSC Rajyaseva Prelims 2019 (New Paper)' },
    { patternId: 'mpsc_rajyaseva_pre_2018', titleMr: 'MPSC राज्यसेवा पूर्व परीक्षा २०१८ (नवीन प्रश्नसंच)', titleEn: 'MPSC Rajyaseva Prelims 2018 (New Paper)' },
  ];
  const rajIdx = RAJYASEVA_PYQS.findIndex((p) => p.patternId === currentSession.patternId);
  if (rajIdx !== -1) {
    const nextItem = RAJYASEVA_PYQS[(rajIdx + 1) % RAJYASEVA_PYQS.length];
    return createExamSession({
      patternId: nextItem.patternId,
      title: isMr ? nextItem.titleMr : nextItem.titleEn,
      questionPool: pool,
      testNumber: nextTestNumber,
    });
  }

  // 4. 100-Question Subject Marathon Progression
  const MARATHON_SETS: { patternId: ExamPatternId; titleMr: string; titleEn: string }[] = [
    { patternId: 'marathon_geo_forest_100', titleMr: 'महाराष्ट्र व भारत भूगोल आणि पर्यावरण १०० मॅरेथॉन', titleEn: 'Geography & Environment 100 Marathon' },
    { patternId: 'marathon_polity_100', titleMr: 'भारतीय संविधान, राज्यव्यवस्था व पंचायत राज १०० मॅरेथॉन', titleEn: 'Indian Polity & Panchayati Raj 100 Marathon' },
    { patternId: 'marathon_science_100', titleMr: 'सामान्य विज्ञान १०० मॅरेथॉन सराव', titleEn: 'General Science 100 Marathon' },
    { patternId: 'marathon_current_affairs_100', titleMr: 'चालू घडामोडी २०२६/२७ १०० मॅरेथॉन', titleEn: 'Current Affairs 2026/27 100 Marathon' },
  ];
  const marathonIdx = MARATHON_SETS.findIndex((m) => m.patternId === currentSession.patternId);
  if (marathonIdx !== -1) {
    const nextItem = MARATHON_SETS[(marathonIdx + 1) % MARATHON_SETS.length];
    return createExamSession({
      patternId: nextItem.patternId,
      title: isMr ? nextItem.titleMr : nextItem.titleEn,
      questionPool: pool,
      testNumber: nextTestNumber,
    });
  }

  // 5. 100k Hard Level Challenge
  if (currentSession.patternId === 'hard_challenge') {
    const count = currentSession.totalQuestions || 25;
    const sub = (currentSession.subjectId as any) || 'all';
    const allHardQs = getHardQuestionsPool({ subjectId: sub, count: 120 });
    // Exclude current session's questions
    const currentSet = new Set(currentIds);
    const availableHard = allHardQs.filter((q) => !currentSet.has(q.id));
    // Prioritize unattempted hard questions
    const unattempted = availableHard.filter((q) => !historicallyAttemptedIds.has(q.id));
    const candidatePool = unattempted.length >= count ? unattempted : (availableHard.length > 0 ? availableHard : allHardQs);
    const selected = [...candidatePool].sort(() => 0.5 - Math.random()).slice(0, count);
    const selectedIds = selected.map((q) => q.id);

    return createExamSession({
      patternId: 'hard_challenge',
      subjectId: currentSession.subjectId,
      customQuestionIds: selectedIds,
      title: isMr
        ? `MPSC 100k Hard Level Challenge (पुढील टेस्ट #${nextTestNumber} - नवीन प्रश्न)`
        : `MPSC 100k Hard Challenge (Next Test #${nextTestNumber} - New Qs)`,
      limit: selectedIds.length,
      questionPool: pool,
      testNumber: nextTestNumber,
    });
  }

  // 6. Daily 10-Minute Rapid Challenge
  if (currentSession.patternId === 'daily_10_challenge') {
    const count = currentSession.totalQuestions || 10;
    const currentSet = new Set(currentIds);
    let subjectFiltered = pool;
    if (currentSession.subjectId === 'english_grammar') {
      subjectFiltered = pool.filter((q) => q.subjectId === 'english_grammar');
    } else if (currentSession.subjectId === 'marathi_grammar') {
      subjectFiltered = pool.filter((q) => q.subjectId === 'marathi_grammar');
    } else if (currentSession.subjectId === 'gs') {
      subjectFiltered = pool.filter((q) => q.subjectId !== 'english_grammar' && q.subjectId !== 'marathi_grammar' && q.subjectId !== 'csat');
    } else if (currentSession.subjectId) {
      subjectFiltered = pool.filter((q) => q.subjectId === currentSession.subjectId);
    }
    const freshCandidates = subjectFiltered.filter((q) => !currentSet.has(q.id));
    const unattempted = freshCandidates.filter((q) => !historicallyAttemptedIds.has(q.id));
    const poolToUse = unattempted.length >= count ? unattempted : (freshCandidates.length > 0 ? freshCandidates : subjectFiltered);
    const selected = [...poolToUse].sort(() => 0.5 - Math.random()).slice(0, count);
    const selectedIds = selected.map((q) => q.id);

    return createExamSession({
      patternId: 'daily_10_challenge',
      subjectId: currentSession.subjectId,
      customQuestionIds: selectedIds,
      title: isMr
        ? `Daily 10-Minute Challenge (पुढील टेस्ट #${nextTestNumber} - नवीन प्रश्न)`
        : `Daily 10-Minute Challenge (Next Test #${nextTestNumber} - New Qs)`,
      limit: selectedIds.length,
      durationMinutes: 10,
      questionPool: pool,
      testNumber: nextTestNumber,
    });
  }

  // 7. General Subject Practice, Custom Mocks, Weak Area Remedial, Current Affairs
  let detectedSubjectId = currentSession.subjectId;
  if (!detectedSubjectId) {
    // Tally dominant subject from current questions
    const subCounts: Record<string, number> = {};
    currentIds.forEach((id) => {
      const q = pool.find((item) => item.id === id);
      if (q && q.subjectId) {
        subCounts[q.subjectId] = (subCounts[q.subjectId] || 0) + 1;
      }
    });
    let maxCount = 0;
    Object.entries(subCounts).forEach(([subId, count]) => {
      if (count > maxCount) {
        maxCount = count;
        detectedSubjectId = subId as SubjectId;
      }
    });
  }

  // Filter pool for this subject or pattern
  let candidatePool = pool;
  if (detectedSubjectId) {
    if (detectedSubjectId === 'gs') {
      candidatePool = pool.filter((q) => q.subjectId !== 'english_grammar' && q.subjectId !== 'marathi_grammar' && q.subjectId !== 'csat');
    } else {
      candidatePool = pool.filter((q) => q.subjectId === detectedSubjectId);
    }
  } else if (currentSession.patternId === 'current_affairs_2026') {
    candidatePool = pool.filter((q) => q.subjectId === 'current_affairs');
  } else if (currentSession.patternId === 'rajyaseva_gs') {
    candidatePool = pool.filter((q) => q.exam === 'Rajyaseva' || q.exam === 'Both');
  } else if (currentSession.patternId === 'combine_group_b_c') {
    candidatePool = pool.filter((q) => q.exam === 'Combine' || q.exam === 'Both');
  }

  // Exclude current session's questions to strictly ensure new questions!
  const currentSet = new Set(currentIds);
  const withoutCurrent = candidatePool.filter((q) => !currentSet.has(q.id));

  // Prioritize unattempted questions from user history
  const unattempted = withoutCurrent.filter((q) => !historicallyAttemptedIds.has(q.id));
  const targetCount = currentSession.totalQuestions || 15;

  let finalSelection: Question[] = [];
  if (unattempted.length >= targetCount) {
    finalSelection = [...unattempted].sort(() => 0.5 - Math.random()).slice(0, targetCount);
  } else {
    // Take all unattempted questions first
    finalSelection = [...unattempted];
    const needed = targetCount - finalSelection.length;
    // Fill remaining from questions not in current test
    const remainingEligible = withoutCurrent.filter((q) => !unattempted.some((u) => u.id === q.id));
    const extra = [...remainingEligible].sort(() => 0.5 - Math.random()).slice(0, needed);
    finalSelection = [...finalSelection, ...extra];

    // If still short, fallback to candidatePool
    if (finalSelection.length < targetCount) {
      const stillNeeded = targetCount - finalSelection.length;
      const extraFallback = [...candidatePool]
        .filter((q) => !finalSelection.some((f) => f.id === q.id))
        .sort(() => 0.5 - Math.random())
        .slice(0, stillNeeded);
      finalSelection = [...finalSelection, ...extraFallback];
    }
  }

  const selectedQuestionIds = finalSelection.map((q) => q.id);

  // Clean base title and append next test marker
  let cleanTitle = currentSession.title
    .replace(/\s*\(पुढील टेस्ट.*?\)/gi, '')
    .replace(/\s*\(Next Test.*?\)/gi, '')
    .replace(/\s*-\s*टेस्ट\s*#\d+/gi, '')
    .replace(/\s*-\s*Test\s*#\d+/gi, '')
    .trim();

  const nextTitle = isMr
    ? `${cleanTitle} - टेस्ट #${nextTestNumber} (नवीन प्रश्न)`
    : `${cleanTitle} - Test #${nextTestNumber} (New Questions)`;

  return createExamSession({
    patternId: currentSession.patternId,
    subjectId: detectedSubjectId,
    customQuestionIds: selectedQuestionIds,
    title: nextTitle,
    limit: selectedQuestionIds.length,
    durationMinutes: Math.round(currentSession.durationSeconds / 60) || undefined,
    questionPool: pool,
    testNumber: nextTestNumber,
  });
}
