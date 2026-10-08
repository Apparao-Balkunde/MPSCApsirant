import { Question, SubjectId, UserProgress } from '../types';
import { MPSC_QUESTIONS } from '../data/mpscQuestions';

export interface SubjectVulnerability {
  subjectId: SubjectId;
  subjectNameMr: string;
  subjectNameEn: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  accuracy: number;
  negativeMarksLost: number;
  priority: 'critical' | 'moderate' | 'strong';
  adviceMr: string;
  adviceEn: string;
}

export interface UserMistakeRecord {
  questionId: string;
  question: Question;
  userSelectedOption: number;
  examTitle: string;
  date: string;
  subjectId: SubjectId;
}

export interface WeakAreaAnalysis {
  hasExamHistory: boolean;
  totalExamsTaken: number;
  totalQuestionsAttempted: number;
  totalIncorrect: number;
  totalNegativePenaltyLost: number;
  overallAccuracy: number;
  vulnerabilityScore: number; // 0 (best) to 100 (high risk)
  weakestSubject: SubjectVulnerability | null;
  subjectBreakdown: SubjectVulnerability[];
  pastMistakes: UserMistakeRecord[];
  criticalSubjectsCount: number;
}

const SUBJECT_METADATA: Record<SubjectId, { mr: string; en: string; adviceMr: string; adviceEn: string }> = {
  polity: {
    mr: 'नागरिकशास्त्र / राज्यव्यवस्था',
    en: 'Polity & Governance',
    adviceMr: 'कलमे, मूलभूत हक्क, मार्गदर्शक तत्त्वे व ७३/७४ वी घटनादुरुस्तीचे सूक्ष्म वाचन करा.',
    adviceEn: 'Focus on Articles, Fundamental Rights, DPSP, and 73rd/74th Amendments.',
  },
  maharashtra_history: {
    mr: 'इतिहास (महाराष्ट्र विशेष)',
    en: 'History of Maharashtra',
    adviceMr: '१९ व्या शतकातील समाजसुधारक, संस्था, वृत्तपत्रे व १८५७ चा महाराष्ट्रातील सहभाग उजळा.',
    adviceEn: 'Revise 19th century social reformers, newspapers, and Samyukta Maharashtra.',
  },
  maharashtra_geography: {
    mr: 'भूगोल (महाराष्ट्र विशेष)',
    en: 'Geography of Maharashtra',
    adviceMr: 'सह्याद्रीतील घाट, प्रमुख नद्यांची खोरे, जमिनीचे प्रकार व जिल्हानिहाय पिकांचा नकाशा अभ्यासा.',
    adviceEn: 'Study Sahyadri passes, river drainages, soil distribution, and cash crops.',
  },
  economy: {
    mr: 'अर्थव्यवस्था',
    en: 'Indian & Public Economy',
    adviceMr: 'राष्ट्रीय उत्पन्न संकल्पना (GDP/NNP), राजकोषीय तूट, वित्त आयोग व अर्थसंकल्प उजळा.',
    adviceEn: 'Review National Income metrics, Fiscal Deficit, FRBM Act, and Budgetary concepts.',
  },
  general_science: {
    mr: 'सामान्य विज्ञान',
    en: 'General Science',
    adviceMr: '८वी ते १०वी क्रमिक स्टेट बोर्ड, भौतिकशास्त्र सूत्रे, पेशीरचना व रोग नियंत्रण लक्ष द्या.',
    adviceEn: 'Prioritize 8th-10th State Board textbooks, human anatomy, physics units, and diseases.',
  },
  environment: {
    mr: 'पर्यावरण व जैवविविधता',
    en: 'Environment & Ecology',
    adviceMr: 'महाराष्ट्रातील ६ व्याघ्र प्रकल्प, रामसर स्थळे, जागतिक हवामान करार व SDG उद्दिष्टे अभ्यासा.',
    adviceEn: 'Revise Maharashtra Tiger Reserves, Ramsar wetlands, UNFCCC summits, and SDGs.',
  },
  current_affairs: {
    mr: 'चालू घडामोडी',
    en: 'Current Affairs',
    adviceMr: 'महाराष्ट्र शासनाच्या नवीन योजना (लाडकी बहीण), राष्ट्रीय क्रीडा, पुरस्कार व नियुक्त्या.',
    adviceEn: 'Focus on Maharashtra Govt welfare schemes, infrastructure, and national awards.',
  },
  csat: {
    mr: 'अंकगणित व बुद्धिमत्ता',
    en: 'CSAT Aptitude & Mental Ability',
    adviceMr: 'वयवारी, सरासरी, टक्केवारी, सरळव्याज व सांकेतिक भाषा यावर वेळेचे व्यवस्थापन सुधारा.',
    adviceEn: 'Sharpen time-management on Averages, Percentages, Ratio, and Coding-Decoding.',
  },
  marathi_grammar: {
    mr: 'मराठी व्याकरण',
    en: 'Marathi Grammar',
    adviceMr: 'प्रयोग विचार, समास, विभक्ती प्रत्यय, शब्दसिद्धी व म्हणी-वाक्प्रचारांचे सराव प्रश्न सोडवा.',
    adviceEn: 'Practice Prayog, Samas, Vibhakti, Tatsama-Tadbhav words, and idioms daily.',
  },
  english_grammar: {
    mr: 'इंग्रजी व्याकरण (English Grammar)',
    en: 'English Grammar',
    adviceMr: 'Tenses, Subject-Verb Agreement, Voice, Narration व One-word Substitutions चा सराव करा.',
    adviceEn: 'Master Tenses, Subject-Verb Agreement, Active-Passive Voice, and Vocabulary.',
  },
};

export const ALL_MPSC_SUBJECT_IDS: SubjectId[] = [
  'maharashtra_history',
  'maharashtra_geography',
  'polity',
  'economy',
  'general_science',
  'current_affairs',
  'csat',
  'environment',
  'marathi_grammar',
  'english_grammar',
];

/**
 * Analyzes candidate's full exam history to uncover weak topics,
 * negative marks leakage, and error patterns.
 */
export function analyzeUserWeakAreas(
  userProgress: UserProgress,
  questionPool: Question[] = MPSC_QUESTIONS
): WeakAreaAnalysis {
  const history = userProgress.history || [];
  const poolMap = new Map<string, Question>();
  questionPool.forEach((q) => poolMap.set(q.id, q));

  if (history.length === 0) {
    // Default baseline for new candidates
    const baselineSubjects: SubjectVulnerability[] = ALL_MPSC_SUBJECT_IDS.map((subId) => ({
      subjectId: subId,
      subjectNameMr: SUBJECT_METADATA[subId]?.mr || subId,
      subjectNameEn: SUBJECT_METADATA[subId]?.en || subId,
      totalQuestions: 0,
      attempted: 0,
      correct: 0,
      incorrect: 0,
      unattempted: 0,
      accuracy: 0,
      negativeMarksLost: 0,
      priority: 'moderate',
      adviceMr: SUBJECT_METADATA[subId]?.adviceMr || '',
      adviceEn: SUBJECT_METADATA[subId]?.adviceEn || '',
    }));

    return {
      hasExamHistory: false,
      totalExamsTaken: 0,
      totalQuestionsAttempted: 0,
      totalIncorrect: 0,
      totalNegativePenaltyLost: 0,
      overallAccuracy: 0,
      vulnerabilityScore: 0,
      weakestSubject: null,
      subjectBreakdown: baselineSubjects,
      pastMistakes: [],
      criticalSubjectsCount: 0,
    };
  }

  // Aggregate subject metrics across all tests
  const subjectAggregates: Record<
    string,
    { attempted: number; correct: number; incorrect: number; unattempted: number; total: number; negativeLost: number }
  > = {};

  ALL_MPSC_SUBJECT_IDS.forEach((id) => {
    subjectAggregates[id] = { attempted: 0, correct: 0, incorrect: 0, unattempted: 0, total: 0, negativeLost: 0 };
  });

  const mistakesMap = new Map<string, UserMistakeRecord>();
  let totalAttempted = 0;
  let totalIncorrect = 0;
  let totalPenalty = 0;
  let totalCorrect = 0;

  history.forEach((exam) => {
    totalPenalty += exam.negativePenalty || 0;
    totalAttempted += exam.attemptedCount || 0;
    totalIncorrect += exam.incorrectCount || 0;
    totalCorrect += exam.correctCount || 0;

    // Subject breakdown from exam
    if (exam.subjectPerformance) {
      Object.entries(exam.subjectPerformance).forEach(([subKey, data]) => {
        if (!subjectAggregates[subKey]) {
          subjectAggregates[subKey] = { attempted: 0, correct: 0, incorrect: 0, unattempted: 0, total: 0, negativeLost: 0 };
        }
        subjectAggregates[subKey].total += data.total || 0;
        subjectAggregates[subKey].correct += data.correct || 0;
        subjectAggregates[subKey].incorrect += data.incorrect || 0;
        subjectAggregates[subKey].unattempted += data.unattempted || 0;
        subjectAggregates[subKey].attempted += (data.correct || 0) + (data.incorrect || 0);
        subjectAggregates[subKey].negativeLost += (data.incorrect || 0) * 0.25;
      });
    }

    // Inspect individual answers to log mistakes
    if (exam.answers) {
      Object.entries(exam.answers).forEach(([qId, userOption]) => {
        const q = poolMap.get(qId);
        if (q && userOption !== undefined && userOption !== q.correctAnswerIndex) {
          if (!mistakesMap.has(qId)) {
            mistakesMap.set(qId, {
              questionId: qId,
              question: q,
              userSelectedOption: userOption,
              examTitle: exam.title,
              date: exam.date,
              subjectId: q.subjectId,
            });
          }
        }
      });
    }
  });

  // Calculate subject vulnerability
  const subjectBreakdown: SubjectVulnerability[] = ALL_MPSC_SUBJECT_IDS.map((subId) => {
    const agg = subjectAggregates[subId] || { attempted: 0, correct: 0, incorrect: 0, unattempted: 0, total: 0, negativeLost: 0 };
    const accuracy = agg.attempted > 0 ? Math.round((agg.correct / agg.attempted) * 100) : 0;
    
    // Priority assignment
    let priority: 'critical' | 'moderate' | 'strong' = 'moderate';
    if (agg.attempted >= 5) {
      if (accuracy < 55 || agg.incorrect >= 8) {
        priority = 'critical';
      } else if (accuracy >= 75) {
        priority = 'strong';
      }
    } else if (agg.attempted > 0 && accuracy < 50) {
      priority = 'critical';
    }

    return {
      subjectId: subId,
      subjectNameMr: SUBJECT_METADATA[subId]?.mr || subId,
      subjectNameEn: SUBJECT_METADATA[subId]?.en || subId,
      totalQuestions: agg.total,
      attempted: agg.attempted,
      correct: agg.correct,
      incorrect: agg.incorrect,
      unattempted: agg.unattempted,
      accuracy,
      negativeMarksLost: agg.negativeLost,
      priority,
      adviceMr: SUBJECT_METADATA[subId]?.adviceMr || '',
      adviceEn: SUBJECT_METADATA[subId]?.adviceEn || '',
    };
  });

  // Sort subject breakdown by lowest accuracy and highest mistakes
  subjectBreakdown.sort((a, b) => {
    if (a.attempted > 0 && b.attempted === 0) return -1;
    if (b.attempted > 0 && a.attempted === 0) return 1;
    if (a.priority === 'critical' && b.priority !== 'critical') return -1;
    if (b.priority === 'critical' && a.priority !== 'critical') return 1;
    return a.accuracy - b.accuracy;
  });

  const attemptedSubjects = subjectBreakdown.filter((s) => s.attempted > 0);
  const weakestSubject = attemptedSubjects.length > 0 ? attemptedSubjects[0] : null;

  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  
  // Vulnerability Score (100 = critical vulnerability, 0 = exceptional)
  let vulnerabilityScore = Math.max(0, Math.min(100, Math.round(100 - overallAccuracy + (totalPenalty * 1.5))));
  if (totalAttempted === 0) vulnerabilityScore = 0;

  const criticalSubjectsCount = subjectBreakdown.filter((s) => s.priority === 'critical').length;

  return {
    hasExamHistory: history.length > 0,
    totalExamsTaken: history.length,
    totalQuestionsAttempted: totalAttempted,
    totalIncorrect,
    totalNegativePenaltyLost: Number(totalPenalty.toFixed(2)),
    overallAccuracy,
    vulnerabilityScore,
    weakestSubject,
    subjectBreakdown,
    pastMistakes: Array.from(mistakesMap.values()),
    criticalSubjectsCount,
  };
}

/**
 * Generates tailor-made remedial questions for weak areas
 */
export function generateRemedialQuestionSet(options: {
  mode: 'auto_booster' | 'past_errors' | 'weak_subject';
  targetSubjectId?: SubjectId;
  count?: number;
  userProgress: UserProgress;
  questionPool?: Question[];
}): {
  questions: Question[];
  titleMr: string;
  titleEn: string;
  descriptionMr: string;
  descriptionEn: string;
} {
  const pool = options.questionPool && options.questionPool.length > 0 ? options.questionPool : MPSC_QUESTIONS;
  const analysis = analyzeUserWeakAreas(options.userProgress, pool);
  const targetCount = options.count || 25;

  const poolMap = new Map<string, Question>();
  pool.forEach((q) => poolMap.set(q.id, q));

  if (options.mode === 'past_errors') {
    // Retake only past mistakes
    const pastMistakeQuestions = analysis.pastMistakes.map((m) => m.question);
    
    // If fewer than target count, pad with weak subject questions
    let finalSelection = [...pastMistakeQuestions];
    if (finalSelection.length < targetCount && analysis.weakestSubject) {
      const padQs = pool.filter(
        (q) => q.subjectId === analysis.weakestSubject?.subjectId && !finalSelection.some((s) => s.id === q.id)
      );
      finalSelection = [...finalSelection, ...padQs.slice(0, targetCount - finalSelection.length)];
    }

    const trimmed = finalSelection.slice(0, targetCount);

    return {
      questions: trimmed.length > 0 ? trimmed : pool.slice(0, targetCount),
      titleMr: `चुकलेल्या प्रश्नांचा फेर-सराव (${trimmed.length} प्रश्न - Error Correction Booster)`,
      titleEn: `Retest Past Mistakes (${trimmed.length} Qs - Error Correction Booster)`,
      descriptionMr: 'मागील परीक्षांमध्ये चुकलेल्या प्रश्नांची फेरपरीक्षा देऊन नकारात्मक गुणांचे नुकसान थांबवा.',
      descriptionEn: 'Re-test previously incorrect questions to fix knowledge gaps and eliminate negative penalties.',
    };
  }

  if (options.mode === 'weak_subject' && options.targetSubjectId) {
    const subId = options.targetSubjectId;
    const subMeta = SUBJECT_METADATA[subId];

    // Priority 1: Past mistakes in this subject
    const subjectMistakes = analysis.pastMistakes
      .filter((m) => m.subjectId === subId)
      .map((m) => m.question);

    // Priority 2: Fresh questions from this subject
    const otherSubjectQs = pool.filter(
      (q) => q.subjectId === subId && !subjectMistakes.some((m) => m.id === q.id)
    );

    // Shuffle fresh questions for variety
    const shuffledFresh = [...otherSubjectQs].sort(() => 0.5 - Math.random());
    const combined = [...subjectMistakes, ...shuffledFresh].slice(0, targetCount);

    return {
      questions: combined,
      titleMr: `कमकुवत घटक विशेष: ${subMeta?.mr || subId} (${combined.length} प्रश्न)`,
      titleEn: `Weak Area Booster: ${subMeta?.en || subId} (${combined.length} Qs)`,
      descriptionMr: `${subMeta?.mr || subId} विषयातील अचूकता वाढवण्यासाठी व नकारात्मक गुण टाळण्यासाठी तयार केलेली विशेष सराव चाचणी.`,
      descriptionEn: `Targeted practice session specifically designed to boost accuracy and eliminate errors in ${subMeta?.en || subId}.`,
    };
  }

  // AUTO BOOSTER: Intelligent algorithm blending past mistakes + weak subject questions
  const selectedList: Question[] = [];
  const selectedIds = new Set<string>();

  // 1. Add up to 10 past mistakes from critical subjects
  const criticalMistakes = analysis.pastMistakes.filter((m) => {
    const subV = analysis.subjectBreakdown.find((s) => s.subjectId === m.subjectId);
    return subV?.priority === 'critical';
  });

  criticalMistakes.slice(0, 10).forEach((m) => {
    if (!selectedIds.has(m.question.id)) {
      selectedIds.add(m.question.id);
      selectedList.push(m.question);
    }
  });

  // 2. Add other past mistakes
  analysis.pastMistakes.slice(0, 8).forEach((m) => {
    if (!selectedIds.has(m.question.id) && selectedList.length < targetCount) {
      selectedIds.add(m.question.id);
      selectedList.push(m.question);
    }
  });

  // 3. Fill remaining slots from weakest subjects in priority order
  const weakSubjectsToDrawFrom = analysis.subjectBreakdown
    .filter((s) => s.priority === 'critical' || s.accuracy < 65)
    .map((s) => s.subjectId);

  // If no weak subject found, fallback to top standard MPSC subjects
  const subjectList = weakSubjectsToDrawFrom.length > 0
    ? weakSubjectsToDrawFrom
    : ['general_science', 'economy', 'maharashtra_history', 'current_affairs', 'csat'];

  for (const sId of subjectList) {
    if (selectedList.length >= targetCount) break;
    const candidates = pool.filter((q) => q.subjectId === sId && !selectedIds.has(q.id));
    const randomPick = [...candidates].sort(() => 0.5 - Math.random()).slice(0, 4);
    for (const q of randomPick) {
      if (selectedList.length < targetCount && !selectedIds.has(q.id)) {
        selectedIds.add(q.id);
        selectedList.push(q);
      }
    }
  }

  // 4. Fill to targetCount from full pool if still short
  if (selectedList.length < targetCount) {
    const remaining = pool.filter((q) => !selectedIds.has(q.id));
    const filler = [...remaining].sort(() => 0.5 - Math.random()).slice(0, targetCount - selectedList.length);
    selectedList.push(...filler);
  }

  const finalQuestions = selectedList.slice(0, targetCount);
  const weakestName = analysis.weakestSubject?.subjectNameMr || 'सर्व विषय';

  return {
    questions: finalQuestions,
    titleMr: `🎯 स्मार्ट रिमेडियल बूस्टर चाचणी (${finalQuestions.length} प्रश्न - Weak Area Sprint)`,
    titleEn: `🎯 Smart Remedial Booster (${finalQuestions.length} Qs - Weak Area Sprint)`,
    descriptionMr: `तुमच्या परीक्षा विश्लेषणावर आधारित ${weakestName} व चुकलेल्या प्रश्नांवर तयार केलेला २५ प्रश्नांचा विशेष सराव संच.`,
    descriptionEn: `Algorithmically customized 25-question drill targeting your highest error-rate subjects and past mistakes.`,
  };
}
