import { UserProgress, ExamResult } from '../types';

export type BadgeCategory = 'questions' | 'tests' | 'accuracy' | 'consistency';

export interface Badge {
  id: string;
  nameMr: string;
  nameEn: string;
  descriptionMr: string;
  descriptionEn: string;
  category: BadgeCategory;
  icon: string;
  badgeBg: string;
  badgeBorder: string;
  textColor: string;
  targetValue: number;
  metricType: 'questions' | 'tests' | 'accuracy' | 'streak' | 'bookmarks' | 'subjects' | 'special';
  currentValue: number;
  progressPercent: number;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface LevelDefinition {
  level: number;
  nameMr: string;
  nameEn: string;
  cadreMr: string;
  cadreEn: string;
  taglineMr: string;
  taglineEn: string;
  minQuestions: number;
  minTests: number;
  icon: string;
  badgeColor: string;
  gradientBg: string;
  perksMr: string[];
  perksEn: string[];
}

export interface UserBadgesAndLevelsState {
  totalQuestionsSolved: number;
  totalTestsCompleted: number;
  averageAccuracy: number;
  highestAccuracy: number;
  streakDays: number;
  totalCorrect: number;
  currentLevel: LevelDefinition;
  nextLevel: LevelDefinition | null;
  levelProgressPercent: number;
  questionsRemainingForNextLevel: number;
  testsRemainingForNextLevel: number;
  allLevels: LevelDefinition[];
  allBadges: Badge[];
  unlockedBadges: Badge[];
  lockedBadges: Badge[];
  recentUnlockedBadges: Badge[];
  unlockedCount: number;
  totalBadgeCount: number;
}

export const MPSC_LEVELS: LevelDefinition[] = [
  {
    level: 1,
    nameMr: 'नवशिका उमेदवार',
    nameEn: 'Novice Aspirant',
    cadreMr: 'प्रवेश स्तर अभ्यासक',
    cadreEn: 'Entry Level Aspirant',
    taglineMr: 'MPSC प्रवासाची पहिली पायरी',
    taglineEn: 'The First Step of the MPSC Journey',
    minQuestions: 0,
    minTests: 0,
    icon: '🌱',
    badgeColor: 'border-stone-400 text-stone-300',
    gradientBg: 'from-stone-800 to-stone-900',
    perksMr: ['मूलभूत प्रश्नपेढी व दैनिक क्विझ ॲक्सेस', 'अभ्यास वेळापत्रक ट्रॅकिंग'],
    perksEn: ['Access to Question Bank & Daily Quiz', 'Study Timetable Tracking']
  },
  {
    level: 2,
    nameMr: 'जागरूक अभ्यासक',
    nameEn: 'Dedicated Learner',
    cadreMr: 'नियमित सराव उमेदवार',
    cadreEn: 'Consistent Practice Candidate',
    taglineMr: 'दररोज सातत्यपूर्ण वाचन व प्रश्न सराव',
    taglineEn: 'Daily Consistent Reading & Practice',
    minQuestions: 25,
    minTests: 1,
    icon: '📖',
    badgeColor: 'border-blue-400 text-blue-300',
    gradientBg: 'from-blue-900 to-indigo-950',
    perksMr: ['विषयनिहाय अचूकता पृथक्करण', 'सराव चाचणी सविस्तर विश्लेषण'],
    perksEn: ['Subject-wise Accuracy Analysis', 'Detailed Test Review Access']
  },
  {
    level: 3,
    nameMr: 'संयुक्त गट-क योद्धा',
    nameEn: 'Group-C Contender',
    cadreMr: 'लिपिक-टंकलेखक व कर सहाय्यक दर्जा',
    cadreEn: 'Clerk-Typist / Tax Assistant Rank',
    taglineMr: 'गट-क पूर्व व मुख्य परीक्षा पात्रता स्तर',
    taglineEn: 'Group-C Prelims & Mains Qualified Standard',
    minQuestions: 75,
    minTests: 3,
    icon: '🛡️',
    badgeColor: 'border-cyan-400 text-cyan-300',
    gradientBg: 'from-cyan-900 to-blue-950',
    perksMr: ['कमकुवत घटक बूस्टर मोड', 'तपशीलवार विषय मॅरेथॉन सराव'],
    perksEn: ['Weak Area Booster Engine', 'Subject Marathon Test Access']
  },
  {
    level: 4,
    nameMr: 'संयुक्त गट-ब अधिकारी',
    nameEn: 'Group-B Cadet (PSI / STI / ASO)',
    cadreMr: 'पोलीस उपनिरीक्षक / कक्ष अधिकारी कॅडर',
    cadreEn: 'Police Sub-Inspector / ASO Cadre',
    taglineMr: 'अधिकारी पदाच्या कटऑफच्या पुढे वाटचाल',
    taglineEn: 'Surpassing Officer Cut-Off Benchmarks',
    minQuestions: 150,
    minTests: 5,
    icon: '⚔️',
    badgeColor: 'border-emerald-400 text-emerald-300',
    gradientBg: 'from-emerald-900 to-teal-950',
    perksMr: ['नकारात्मक गुण नियंत्रण चाचण्या', 'मागील वर्षांचे प्रश्न (PYQ) स्मार्ट हब'],
    perksEn: ['Negative Marking Trap Drills', 'PYQ Smart Analysis Hub']
  },
  {
    level: 5,
    nameMr: 'राज्यसेवा शिलेदार',
    nameEn: 'Rajyaseva Stalwart',
    cadreMr: 'नायब तहसीलदार / वर्ग-२ राजपत्रित',
    cadreEn: 'Naib Tehsildar / Class-2 Gazetted',
    taglineMr: 'राज्यसेवा मुख्य परीक्षा तयारीतील उच्च दर्जा',
    taglineEn: 'High-Rank Class-2 Officer Standard',
    minQuestions: 300,
    minTests: 10,
    icon: '🏅',
    badgeColor: 'border-amber-400 text-amber-300',
    gradientBg: 'from-amber-900 to-orange-950',
    perksMr: ['कठिन प्रश्नांचे चक्रव्यूह हब', 'कट-ऑफ ट्रेंड्स प्रेडिक्टर'],
    perksEn: ['Hard Questions Hub Unlocked', 'Cutoff Trend Predictor']
  },
  {
    level: 6,
    nameMr: 'तहसीलदार व वर्ग-१ दावेदार',
    nameEn: 'Tehsildar & Class-1 Contender',
    cadreMr: 'तहसीलदार / सहाय्यक गटविकास अधिकारी',
    cadreEn: 'Tehsildar / Assistant BDO Grade',
    taglineMr: 'प्रशासकीय अचूकता आणि प्रचंड आत्मविश्वास',
    taglineEn: 'Administrative Precision & Unshakable Mastery',
    minQuestions: 550,
    minTests: 18,
    icon: '🎖️',
    badgeColor: 'border-orange-400 text-orange-300',
    gradientBg: 'from-orange-900 to-rose-950',
    perksMr: ['स्टेट लेव्हल रँक सिम्युलेटर', 'सर्वसमावेशक जलद रिव्हिजन कार्ड्स'],
    perksEn: ['State-Level Rank Simulator', 'Rapid Flashcard Pro Mode']
  },
  {
    level: 7,
    nameMr: 'उपजिल्हाधिकारी / DYSP कॅडर',
    nameEn: 'Deputy Collector / DYSP Elite',
    cadreMr: 'उपजिल्हाधिकारी / उपअधीक्षक पोलीस वर्ग-१',
    cadreEn: 'Deputy Collector / DYSP Class-1 Cadre',
    taglineMr: 'महाराष्ट्राच्या सर्वोच्च नागरी सेवेचे स्वप्न साकार',
    taglineEn: 'Maharashtra Elite Civil Service Cadre',
    minQuestions: 850,
    minTests: 28,
    icon: '🏛️',
    badgeColor: 'border-purple-400 text-purple-300',
    gradientBg: 'from-purple-900 to-indigo-950',
    perksMr: ['अखिल महाराष्ट्र मेरिट प्रेडिक्शन', 'सर्व प्रीमियम संदर्भ प्रश्नसंग्रह'],
    perksEn: ['All-Maharashtra Merit Benchmark', 'Full Comprehensive Question Sets']
  },
  {
    level: 8,
    nameMr: 'MPSC स्टेट टॉपर व गुणवत्ता यादी',
    nameEn: 'State Rank-1 Merit Legend',
    cadreMr: 'राज्य गुणवत्ता यादी प्रथम क्रमांक (Rank-1)',
    cadreEn: 'State Merit List Champion (Rank 1)',
    taglineMr: 'MPSC परीक्षेतील सर्वोच्च शिखर आणि आदर्श',
    taglineEn: 'The Pinnacle of Maharashtra Civil Services',
    minQuestions: 1250,
    minTests: 40,
    icon: '👑',
    badgeColor: 'border-yellow-400 text-yellow-300',
    gradientBg: 'from-amber-800 via-yellow-700 to-amber-950',
    perksMr: ['सुवर्ण मेरिट हॉल ऑफ फेम सन्मान', 'संपूर्ण एमपीएससी मास्टर बॅज'],
    perksEn: ['Golden Merit Hall of Fame', 'Ultimate MPSC Master Badge']
  }
];

interface BadgeConfig {
  id: string;
  nameMr: string;
  nameEn: string;
  descriptionMr: string;
  descriptionEn: string;
  category: BadgeCategory;
  icon: string;
  badgeBg: string;
  badgeBorder: string;
  textColor: string;
  targetValue: number;
  metricType: 'questions' | 'tests' | 'accuracy' | 'streak' | 'bookmarks' | 'subjects' | 'special';
}

const BADGE_CONFIGS: BadgeConfig[] = [
  // --- 1. QUESTIONS SOLVED BADGES ---
  {
    id: 'badge_q_10',
    nameMr: 'प्रथम पाऊल',
    nameEn: 'First Step',
    descriptionMr: 'पहिल्या १० वस्तुनिष्ठ प्रश्नांचा यशस्वी सराव पूर्ण करा',
    descriptionEn: 'Successfully solve your first 10 practice questions',
    category: 'questions',
    icon: '🎯',
    badgeBg: 'bg-blue-950/60',
    badgeBorder: 'border-blue-500/50',
    textColor: 'text-blue-300',
    targetValue: 10,
    metricType: 'questions'
  },
  {
    id: 'badge_q_50',
    nameMr: 'अर्धशतक वीर',
    nameEn: 'Half Century Club',
    descriptionMr: '५० पेक्षा जास्त एमपीएससी प्रश्नांची उत्तरे नोंदवा',
    descriptionEn: 'Attempt 50+ MPSC questions across subjects',
    category: 'questions',
    icon: '⚡',
    badgeBg: 'bg-cyan-950/60',
    badgeBorder: 'border-cyan-500/50',
    textColor: 'text-cyan-300',
    targetValue: 50,
    metricType: 'questions'
  },
  {
    id: 'badge_q_100',
    nameMr: 'शतकवीर अभ्यासक',
    nameEn: 'Century Master',
    descriptionMr: '१०० दर्जेदार सराव प्रश्नांचा टप्पा गाठला',
    descriptionEn: 'Reach the milestone of 100 solved questions',
    category: 'questions',
    icon: '💯',
    badgeBg: 'bg-emerald-950/60',
    badgeBorder: 'border-emerald-500/50',
    textColor: 'text-emerald-300',
    targetValue: 100,
    metricType: 'questions'
  },
  {
    id: 'badge_q_250',
    nameMr: 'अडीचशे प्रश्नवीर',
    nameEn: 'Quarter Mill Vanguard',
    descriptionMr: '२५० प्रश्नांचा अखंड सराव आणि अचूकता संपादन',
    descriptionEn: 'Solve 250 high-yield questions across topics',
    category: 'questions',
    icon: '🏹',
    badgeBg: 'bg-teal-950/60',
    badgeBorder: 'border-teal-500/50',
    textColor: 'text-teal-300',
    targetValue: 250,
    metricType: 'questions'
  },
  {
    id: 'badge_q_500',
    nameMr: 'पंचशतक सम्राट',
    nameEn: '500 Questions Master',
    descriptionMr: '५०० सराव प्रश्नांचे विशाल आव्हान पूर्ण केले',
    descriptionEn: 'Surpass 500 questions milestone with dedication',
    category: 'questions',
    icon: '🔱',
    badgeBg: 'bg-amber-950/60',
    badgeBorder: 'border-amber-500/50',
    textColor: 'text-amber-300',
    targetValue: 500,
    metricType: 'questions'
  },
  {
    id: 'badge_q_1000',
    nameMr: 'सहस्रक महायोद्धा',
    nameEn: 'Grandmaster (1,000 Qs)',
    descriptionMr: '१,००० हून अधिक प्रश्नांचा अथांग सराव पूर्ण करणारा दिग्गज',
    descriptionEn: 'Conquer the monumental milestone of 1,000 solved questions',
    category: 'questions',
    icon: '👑',
    badgeBg: 'bg-yellow-950/60',
    badgeBorder: 'border-yellow-400/60',
    textColor: 'text-yellow-300',
    targetValue: 1000,
    metricType: 'questions'
  },

  // --- 2. TESTS COMPLETED BADGES ---
  {
    id: 'badge_test_1',
    nameMr: 'पहिली कसोटी',
    nameEn: 'Debut Mock Test',
    descriptionMr: 'पहिली पूर्ण वेळ सराव परीक्षा/मॉक टेस्ट यशस्वीरीत्या सबमिट केली',
    descriptionEn: 'Successfully complete and submit your first timed mock test',
    category: 'tests',
    icon: '📝',
    badgeBg: 'bg-indigo-950/60',
    badgeBorder: 'border-indigo-500/50',
    textColor: 'text-indigo-300',
    targetValue: 1,
    metricType: 'tests'
  },
  {
    id: 'badge_test_5',
    nameMr: 'पंचरत्न सराव',
    nameEn: '5 Mocks Veteran',
    descriptionMr: '५ पूर्ण चाचण्या सोडवून परीक्षा पद्धतीवर नियंत्रण मिळवले',
    descriptionEn: 'Complete 5 mock tests to master exam pacing',
    category: 'tests',
    icon: '🚀',
    badgeBg: 'bg-violet-950/60',
    badgeBorder: 'border-violet-500/50',
    textColor: 'text-violet-300',
    targetValue: 5,
    metricType: 'tests'
  },
  {
    id: 'badge_test_10',
    nameMr: 'दशसूत्री शिलेदार',
    nameEn: '10 Mocks Stalwart',
    descriptionMr: '१० मॉक चाचण्या पूर्ण करून वेळेचे अचूक नियोजन साध्य केले',
    descriptionEn: 'Complete 10 mock exams with consistent performance',
    category: 'tests',
    icon: '🛡️',
    badgeBg: 'bg-purple-950/60',
    badgeBorder: 'border-purple-500/50',
    textColor: 'text-purple-300',
    targetValue: 10,
    metricType: 'tests'
  },
  {
    id: 'badge_test_25',
    nameMr: 'कसोटी महारथी',
    nameEn: '25 Mocks Champion',
    descriptionMr: '२५ चाचण्यांचा कसून सराव करून रँक सुनिश्चित केली',
    descriptionEn: 'Complete 25 comprehensive test series exams',
    category: 'tests',
    icon: '⚔️',
    badgeBg: 'bg-rose-950/60',
    badgeBorder: 'border-rose-500/50',
    textColor: 'text-rose-300',
    targetValue: 25,
    metricType: 'tests'
  },
  {
    id: 'badge_test_50',
    nameMr: 'सुवर्ण परीक्षा चक्र',
    nameEn: '50 Mocks Legend',
    descriptionMr: '५० चाचण्यांचा महासराव पूर्ण करून अंतिम यशाची मोहर उमटवली',
    descriptionEn: 'Surpass 50 mock tests - a true Hall of Fame achievement',
    category: 'tests',
    icon: '🏆',
    badgeBg: 'bg-amber-950/70',
    badgeBorder: 'border-amber-400/70',
    textColor: 'text-amber-300',
    targetValue: 50,
    metricType: 'tests'
  },

  // --- 3. ACCURACY & PERFORMANCE BADGES ---
  {
    id: 'badge_acc_70',
    nameMr: 'तीक्ष्ण नेमबाज',
    nameEn: 'Sharpshooter (70%+)',
    descriptionMr: 'किमान १० प्रश्नांच्या चाचणीत ७०% किंवा त्याहून अधिक अचूकता मिळवली',
    descriptionEn: 'Score 70%+ accuracy in any test with 10+ questions',
    category: 'accuracy',
    icon: '🎯',
    badgeBg: 'bg-emerald-950/60',
    badgeBorder: 'border-emerald-500/50',
    textColor: 'text-emerald-300',
    targetValue: 70,
    metricType: 'accuracy'
  },
  {
    id: 'badge_acc_85',
    nameMr: 'सुवर्ण अचूकता',
    nameEn: 'Bullseye (85%+)',
    descriptionMr: 'किमान १० प्रश्नांच्या चाचणीत ८५% किंवा त्याहून अधिक अचूकतेचा विक्रम',
    descriptionEn: 'Attain 85%+ stellar accuracy in an exam session',
    category: 'accuracy',
    icon: '🌟',
    badgeBg: 'bg-yellow-950/60',
    badgeBorder: 'border-yellow-500/50',
    textColor: 'text-yellow-300',
    targetValue: 85,
    metricType: 'accuracy'
  },
  {
    id: 'badge_zero_neg',
    nameMr: 'शून्य नकारात्मक गुण',
    nameEn: 'Zero Negative Guard',
    descriptionMr: 'किमान १० प्रश्न सोडवून एकही चूक न करता (० चुकीची उत्तरे) चाचणी पूर्ण',
    descriptionEn: 'Finish an exam with 10+ attempted and 0 wrong answers',
    category: 'accuracy',
    icon: '🛡️',
    badgeBg: 'bg-teal-950/60',
    badgeBorder: 'border-teal-400/50',
    textColor: 'text-teal-300',
    targetValue: 1,
    metricType: 'special'
  },

  // --- 4. CONSISTENCY & DEDICATION BADGES ---
  {
    id: 'badge_streak_3',
    nameMr: 'सातत्य अग्नी',
    nameEn: '3-Day Streak Fire',
    descriptionMr: 'सलग ३ दिवस दररोज सराव करून अभ्यासाची गती कायम ठेवली',
    descriptionEn: 'Maintain a 3-day consecutive study streak',
    category: 'consistency',
    icon: '🔥',
    badgeBg: 'bg-orange-950/60',
    badgeBorder: 'border-orange-500/50',
    textColor: 'text-orange-300',
    targetValue: 3,
    metricType: 'streak'
  },
  {
    id: 'badge_streak_7',
    nameMr: 'अखंड तपश्चर्या',
    nameEn: '7-Day Streak Master',
    descriptionMr: 'सलग ७ दिवस एकाग्रतेने सराव करून आठवड्याचे उद्दिष्ट गाठले',
    descriptionEn: 'Complete a full 7-day uninterrupted study streak',
    category: 'consistency',
    icon: '⚡',
    badgeBg: 'bg-rose-950/60',
    badgeBorder: 'border-rose-500/50',
    textColor: 'text-rose-300',
    targetValue: 7,
    metricType: 'streak'
  },
  {
    id: 'badge_bookmark_10',
    nameMr: 'संग्राहक वृत्ती',
    nameEn: 'Knowledge Collector',
    descriptionMr: 'कठिन व महत्त्वाचे १०+ प्रश्न नंतरच्या उजळणीसाठी सेव्ह/बुकमार्क केले',
    descriptionEn: 'Bookmark 10+ tricky or high-priority questions',
    category: 'consistency',
    icon: '📑',
    badgeBg: 'bg-sky-950/60',
    badgeBorder: 'border-sky-500/50',
    textColor: 'text-sky-300',
    targetValue: 10,
    metricType: 'bookmarks'
  },
  {
    id: 'badge_subjects_4',
    nameMr: 'सर्वसमावेशक अभ्यासक',
    nameEn: 'Multidisciplinary Scholar',
    descriptionMr: 'किमान ४ वेगवेगळ्या विषयांमध्ये (GS, इतिहास, भूगोल, राज्यघटना, इ.) चाचण्या सोडवल्या',
    descriptionEn: 'Practice questions across at least 4 distinct subjects',
    category: 'consistency',
    icon: '🧭',
    badgeBg: 'bg-fuchsia-950/60',
    badgeBorder: 'border-fuchsia-500/50',
    textColor: 'text-fuchsia-300',
    targetValue: 4,
    metricType: 'subjects'
  }
];

export function calculateBadgesAndLevels(userProgress: UserProgress): UserBadgesAndLevelsState {
  const history = userProgress.history || [];

  // 1. Calculate Questions Solved
  const questionsFromHistory = history.reduce((sum, h) => sum + (h.attemptedCount || 0), 0);
  const questionsFromStudyLogs = (userProgress.studyLogs || []).reduce((sum, log) => sum + (log.questionsSolved || 0), 0);
  const todayCount = userProgress.todayQuestionsCount || 0;
  
  // Total questions solved combines history + logs + today's uncommitted practice
  const totalQuestionsSolved = Math.max(
    questionsFromHistory,
    questionsFromHistory + questionsFromStudyLogs
  ) + (history.length === 0 ? todayCount : 0);

  // 2. Calculate Tests Completed
  const totalTestsCompleted = history.length;

  // 3. Accuracy calculations
  const totalAttempted = history.reduce((sum, h) => sum + (h.attemptedCount || 0), 0);
  const totalCorrect = history.reduce((sum, h) => sum + (h.correctCount || 0), 0);
  const averageAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  
  const highestAccuracy = history.length > 0 
    ? Math.max(...history.filter(h => h.attemptedCount >= 5).map(h => h.accuracyPercentage || 0), 0)
    : 0;

  // 4. Streak & Bookmarks
  const streakDays = userProgress.streakDays || 0;
  const bookmarksCount = (userProgress.bookmarkedQuestionIds || []).length;

  // 5. Subjects Covered
  const uniqueSubjects = new Set<string>();
  history.forEach(h => {
    if (h.subjectPerformance) {
      Object.keys(h.subjectPerformance).forEach(s => uniqueSubjects.add(s));
    }
  });
  const subjectsCoveredCount = uniqueSubjects.size;

  // 6. Zero Negative Mark test count
  const zeroNegativeExamCount = history.filter(h => h.attemptedCount >= 10 && h.incorrectCount === 0).length;

  // 7. Determine Current Level
  let currentLevelIndex = 0;
  for (let i = MPSC_LEVELS.length - 1; i >= 0; i--) {
    const lvl = MPSC_LEVELS[i];
    if (totalQuestionsSolved >= lvl.minQuestions && totalTestsCompleted >= lvl.minTests) {
      currentLevelIndex = i;
      break;
    }
  }

  const currentLevel = MPSC_LEVELS[currentLevelIndex];
  const nextLevel = currentLevelIndex < MPSC_LEVELS.length - 1 ? MPSC_LEVELS[currentLevelIndex + 1] : null;

  let levelProgressPercent = 100;
  let questionsRemainingForNextLevel = 0;
  let testsRemainingForNextLevel = 0;

  if (nextLevel) {
    const qBase = currentLevel.minQuestions;
    const qTarget = nextLevel.minQuestions;
    const qProgress = Math.max(0, Math.min(1, (totalQuestionsSolved - qBase) / Math.max(1, qTarget - qBase)));

    const tBase = currentLevel.minTests;
    const tTarget = nextLevel.minTests;
    const tProgress = Math.max(0, Math.min(1, (totalTestsCompleted - tBase) / Math.max(1, tTarget - tBase)));

    // Combined metric: weighted 60% questions, 40% tests
    levelProgressPercent = Math.min(99, Math.round((qProgress * 0.6 + tProgress * 0.4) * 100));
    questionsRemainingForNextLevel = Math.max(0, nextLevel.minQuestions - totalQuestionsSolved);
    testsRemainingForNextLevel = Math.max(0, nextLevel.minTests - totalTestsCompleted);
  }

  // 8. Build All Badges
  const allBadges: Badge[] = BADGE_CONFIGS.map(cfg => {
    let currentValue = 0;
    let isUnlocked = false;

    switch (cfg.metricType) {
      case 'questions':
        currentValue = totalQuestionsSolved;
        isUnlocked = totalQuestionsSolved >= cfg.targetValue;
        break;
      case 'tests':
        currentValue = totalTestsCompleted;
        isUnlocked = totalTestsCompleted >= cfg.targetValue;
        break;
      case 'accuracy':
        currentValue = highestAccuracy;
        isUnlocked = highestAccuracy >= cfg.targetValue;
        break;
      case 'streak':
        currentValue = streakDays;
        isUnlocked = streakDays >= cfg.targetValue;
        break;
      case 'bookmarks':
        currentValue = bookmarksCount;
        isUnlocked = bookmarksCount >= cfg.targetValue;
        break;
      case 'subjects':
        currentValue = subjectsCoveredCount;
        isUnlocked = subjectsCoveredCount >= cfg.targetValue;
        break;
      case 'special':
        if (cfg.id === 'badge_zero_neg') {
          currentValue = zeroNegativeExamCount;
          isUnlocked = zeroNegativeExamCount >= 1;
        }
        break;
    }

    const progressPercent = isUnlocked 
      ? 100 
      : Math.min(99, Math.round((currentValue / Math.max(1, cfg.targetValue)) * 100));

    // Formulate unlock date if present in user history
    let unlockedAt: string | undefined = undefined;
    if (isUnlocked && history.length > 0) {
      unlockedAt = history[0]?.date || 'अलीकडेच संपादन';
    }

    return {
      ...cfg,
      currentValue,
      progressPercent,
      isUnlocked,
      unlockedAt
    };
  });

  const unlockedBadges = allBadges.filter(b => b.isUnlocked);
  const lockedBadges = allBadges.filter(b => !b.isUnlocked);
  
  // Sort recently unlocked to show the best ones
  const recentUnlockedBadges = [...unlockedBadges].reverse().slice(0, 4);

  return {
    totalQuestionsSolved,
    totalTestsCompleted,
    averageAccuracy,
    highestAccuracy,
    streakDays,
    totalCorrect,
    currentLevel,
    nextLevel,
    levelProgressPercent,
    questionsRemainingForNextLevel,
    testsRemainingForNextLevel,
    allLevels: MPSC_LEVELS,
    allBadges,
    unlockedBadges,
    lockedBadges,
    recentUnlockedBadges,
    unlockedCount: unlockedBadges.length,
    totalBadgeCount: allBadges.length
  };
}
