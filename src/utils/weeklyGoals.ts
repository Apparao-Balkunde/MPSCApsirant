import { UserProgress, StudySessionLog } from '../types';

export interface DayStudyStats {
  dayIndex: number; // 0 = Monday, 6 = Sunday
  dayNameEn: string;
  dayNameMr: string;
  shortNameEn: string;
  shortNameMr: string;
  dateStr: string; // YYYY-MM-DD
  displayDate: string; // e.g. "17 Sep"
  isToday: boolean;
  isFuture: boolean;
  isPast: boolean;
  minutesSpent: number;
  hoursSpent: number;
  questionsSolved: number;
  hasActivity: boolean;
}

export interface WeeklyProgressSummary {
  weekStartStr: string; // YYYY-MM-DD
  weekEndStr: string; // YYYY-MM-DD
  dateRangeLabelMr: string;
  dateRangeLabelEn: string;
  
  targetHours: number;
  targetQuestions: number;
  
  totalMinutesSpent: number;
  totalHoursSpent: number;
  formattedTimeSpent: string;
  totalQuestionsSolved: number;
  
  hoursProgressPercent: number;
  questionsProgressPercent: number;
  overallProgressPercent: number;
  
  hoursRemaining: number;
  questionsRemaining: number;
  
  daysRemainingInWeek: number;
  dailyPaceHoursNeeded: number;
  dailyPaceQuestionsNeeded: number;
  
  status: 'completed' | 'ahead' | 'on_track' | 'needs_boost';
  statusBadgeMr: string;
  statusBadgeEn: string;
  motivationMr: string;
  motivationEn: string;
  
  days: DayStudyStats[];
  recentLogs: StudySessionLog[];
}

const DAY_NAMES = [
  { en: 'Monday', mr: 'सोमवार', shortEn: 'Mon', shortMr: 'सोम' },
  { en: 'Tuesday', mr: 'मंगळवार', shortEn: 'Tue', shortMr: 'मंगळ' },
  { en: 'Wednesday', mr: 'बुधवार', shortEn: 'Wed', shortMr: 'बुध' },
  { en: 'Thursday', mr: 'गुरुवार', shortEn: 'Thu', shortMr: 'गुरु' },
  { en: 'Friday', mr: 'शुक्रवार', shortEn: 'शुक्र', shortMr: 'शुक्र' },
  { en: 'Saturday', mr: 'शनिवार', shortEn: 'शनि', shortMr: 'शनि' },
  { en: 'Sunday', mr: 'रविवार', shortEn: 'रवि', shortMr: 'रवि' },
];

/**
 * Returns the Monday 00:00:00 of the week for a given date
 */
export function getMondayOfWeek(date: Date = new Date()): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 is Sunday, 1 is Monday...
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Computes weekly progress, hours practiced, questions solved, and daily breakdown.
 */
export function calculateWeeklyProgress(
  userProgress: UserProgress,
  referenceDate: Date = new Date()
): WeeklyProgressSummary {
  const targetHours = userProgress.weeklyTargetHours || 10;
  const targetQuestions = userProgress.weeklyTargetQuestions || 150;

  const monday = getMondayOfWeek(referenceDate);
  const todayStr = referenceDate.toISOString().split('T')[0];

  // Build the 7 days of the week (Monday to Sunday)
  const days: DayStudyStats[] = [];
  const dateToDayMap = new Map<string, number>();

  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(monday);
    dayDate.setDate(monday.getDate() + i);
    const dateStr = dayDate.toISOString().split('T')[0];
    dateToDayMap.set(dateStr, i);

    const isToday = dateStr === todayStr;
    const isPast = dateStr < todayStr;
    const isFuture = dateStr > todayStr;

    const displayDate = dayDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    });

    days.push({
      dayIndex: i,
      dayNameEn: DAY_NAMES[i].en,
      dayNameMr: DAY_NAMES[i].mr,
      shortNameEn: DAY_NAMES[i].shortEn,
      shortNameMr: DAY_NAMES[i].shortMr,
      dateStr,
      displayDate,
      isToday,
      isFuture,
      isPast,
      minutesSpent: 0,
      hoursSpent: 0,
      questionsSolved: 0,
      hasActivity: false,
    });
  }

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const weekStartStr = days[0].dateStr;
  const weekEndStr = days[6].dateStr;

  const startLabel = days[0].displayDate;
  const endLabel = days[6].displayDate;
  const dateRangeLabelEn = `${startLabel} – ${endLabel}`;
  const dateRangeLabelMr = `${startLabel} – ${endLabel}`;

  // Aggregate all activity from studyLogs and exam history
  const accountedSessionIds = new Set<string>();
  const recentLogs: StudySessionLog[] = [];

  // 1. Process explicit studyLogs
  const allLogs = userProgress.studyLogs || [];
  for (const log of allLogs) {
    if (log.id.startsWith('exam-')) {
      const parts = log.id.split('-');
      if (parts[1]) accountedSessionIds.add(parts[1]);
    }

    if (dateToDayMap.has(log.dateStr)) {
      const dayIdx = dateToDayMap.get(log.dateStr)!;
      days[dayIdx].minutesSpent += log.durationMinutes;
      days[dayIdx].questionsSolved += log.questionsSolved;
      days[dayIdx].hasActivity = true;
      recentLogs.push(log);
    }
  }

  // 2. Process exam history (fallback for tests taken without studyLogs)
  for (const result of userProgress.history) {
    if (accountedSessionIds.has(result.sessionId)) {
      continue;
    }

    let resultDateStr: string | null = null;
    if (result.timestamp) {
      resultDateStr = new Date(result.timestamp).toISOString().split('T')[0];
    } else {
      // Try to parse result.date or fallback to today
      const parsed = Date.parse(result.date);
      if (!isNaN(parsed)) {
        resultDateStr = new Date(parsed).toISOString().split('T')[0];
      } else {
        resultDateStr = todayStr;
      }
    }

    if (resultDateStr && dateToDayMap.has(resultDateStr)) {
      const dayIdx = dateToDayMap.get(resultDateStr)!;
      const mins = Math.max(1, Math.round(result.timeSpentSeconds / 60));
      days[dayIdx].minutesSpent += mins;
      days[dayIdx].questionsSolved += result.attemptedCount;
      days[dayIdx].hasActivity = true;

      recentLogs.push({
        id: `history-${result.sessionId}`,
        title: result.title,
        timestamp: result.timestamp || Date.now(),
        dateStr: resultDateStr,
        durationMinutes: mins,
        questionsSolved: result.attemptedCount,
        type: 'exam',
      });
    }
  }

  // Calculate day hours
  days.forEach((day) => {
    day.hoursSpent = parseFloat((day.minutesSpent / 60).toFixed(1));
  });

  // Calculate totals
  const totalMinutesSpent = days.reduce((acc, d) => acc + d.minutesSpent, 0);
  const totalHoursSpent = parseFloat((totalMinutesSpent / 60).toFixed(1));
  const totalQuestionsSolved = days.reduce((acc, d) => acc + d.questionsSolved, 0);

  const hoursProgressPercent = Math.min(100, Math.round((totalHoursSpent / targetHours) * 100));
  const questionsProgressPercent = Math.min(
    100,
    Math.round((totalQuestionsSolved / targetQuestions) * 100)
  );
  const overallProgressPercent = Math.round(
    (hoursProgressPercent + questionsProgressPercent) / 2
  );

  const hoursRemaining = Math.max(0, parseFloat((targetHours - totalHoursSpent).toFixed(1)));
  const questionsRemaining = Math.max(0, targetQuestions - totalQuestionsSolved);

  // Time format
  const hoursPart = Math.floor(totalMinutesSpent / 60);
  const minsPart = totalMinutesSpent % 60;
  let formattedTimeSpent = '';
  if (hoursPart > 0 && minsPart > 0) {
    formattedTimeSpent = `${hoursPart}h ${minsPart}m`;
  } else if (hoursPart > 0) {
    formattedTimeSpent = `${hoursPart} hrs`;
  } else {
    formattedTimeSpent = `${minsPart} mins`;
  }

  // Pacing logic
  const currentDayIndex = referenceDate.getDay() === 0 ? 6 : referenceDate.getDay() - 1; // 0=Mon, 6=Sun
  const daysRemainingInWeek = Math.max(1, 7 - currentDayIndex);

  const dailyPaceHoursNeeded = parseFloat(
    (hoursRemaining / daysRemainingInWeek).toFixed(1)
  );
  const dailyPaceQuestionsNeeded = Math.ceil(questionsRemaining / daysRemainingInWeek);

  const expectedFraction = (currentDayIndex + 1) / 7;
  let status: 'completed' | 'ahead' | 'on_track' | 'needs_boost' = 'on_track';
  let statusBadgeMr = 'योग्य गतीवर 🔥';
  let statusBadgeEn = 'On Track 🔥';
  let motivationMr = 'तुमचा अभ्यास चांगल्या लयीत सुरू आहे! नियमितपणे सराव सुरू ठेवा.';
  let motivationEn = 'Consistent study rhythm! Keep going to hit your weekly target.';

  if (hoursProgressPercent >= 100 && questionsProgressPercent >= 100) {
    status = 'completed';
    statusBadgeMr = 'उद्दिष्ट साध्य! 🏆';
    statusBadgeEn = 'Goal Achieved! 🏆';
    motivationMr = 'अभिनंदन! तुम्ही या आठवड्याचे दोन्ही उद्दिष्टे वेळेपूर्वीच यशस्वीरीत्या पूर्ण केली आहेत.';
    motivationEn = 'Outstanding! You have accomplished both weekly goals ahead of schedule.';
  } else if (
    totalHoursSpent >= targetHours * expectedFraction &&
    totalQuestionsSolved >= targetQuestions * expectedFraction
  ) {
    status = 'ahead';
    statusBadgeMr = 'वेळेच्या पुढे 🚀';
    statusBadgeEn = 'Ahead of Schedule 🚀';
    motivationMr = 'अप्रतिम वेग! चालू आठवड्यात तुमचे उद्दिष्ट सहज साध्य होईल.';
    motivationEn = 'Great pace! You are trending ahead of your study schedule for the week.';
  } else if (
    totalHoursSpent < targetHours * expectedFraction * 0.7 ||
    totalQuestionsSolved < targetQuestions * expectedFraction * 0.7
  ) {
    status = 'needs_boost';
    statusBadgeMr = 'वेळेत पूर्ण करा ⏳';
    statusBadgeEn = 'Pace Up ⏳';
    motivationMr = `आठवडा संपायला ${daysRemainingInWeek} दिवस उरले आहेत. दररोज साधारण ${dailyPaceHoursNeeded} तास आणि ${dailyPaceQuestionsNeeded} प्रश्नांचा सराव करा.`;
    motivationEn = `${daysRemainingInWeek} days left in the week. Aim for ~${dailyPaceHoursNeeded} hrs and ~${dailyPaceQuestionsNeeded} questions daily to achieve your goal.`;
  }

  // Sort recent logs by timestamp desc
  recentLogs.sort((a, b) => b.timestamp - a.timestamp);

  return {
    weekStartStr,
    weekEndStr,
    dateRangeLabelMr,
    dateRangeLabelEn,
    targetHours,
    targetQuestions,
    totalMinutesSpent,
    totalHoursSpent,
    formattedTimeSpent,
    totalQuestionsSolved,
    hoursProgressPercent,
    questionsProgressPercent,
    overallProgressPercent,
    hoursRemaining,
    questionsRemaining,
    daysRemainingInWeek,
    dailyPaceHoursNeeded,
    dailyPaceQuestionsNeeded,
    status,
    statusBadgeMr,
    statusBadgeEn,
    motivationMr,
    motivationEn,
    days,
    recentLogs: recentLogs.slice(0, 5),
  };
}
