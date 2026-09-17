import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid 
} from 'recharts';
import { 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Clock, 
  BarChart3, 
  RotateCcw,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { ExamResult, UserProgress } from '../types';
import { SUBJECTS } from '../data/subjects';

interface AnalyticsViewProps {
  userProgress: UserProgress;
  language: 'mr' | 'en';
  onReviewPastTest: (result: ExamResult) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  userProgress,
  language,
  onReviewPastTest,
}) => {
  const isMr = language === 'mr';
  const history = userProgress.history;

  // Aggregate subject stats across all tests
  const subjectAggregates: Record<string, { total: number; correct: number; incorrect: number }> = {};
  
  history.forEach((h) => {
    Object.entries(h.subjectPerformance || {}).forEach(([subId, stats]) => {
      if (!subjectAggregates[subId]) {
        subjectAggregates[subId] = { total: 0, correct: 0, incorrect: 0 };
      }
      subjectAggregates[subId].total += stats.total;
      subjectAggregates[subId].correct += stats.correct;
      subjectAggregates[subId].incorrect += stats.incorrect;
    });
  });

  const subjectChartData = Object.entries(subjectAggregates).map(([subId, stats]) => {
    const meta = SUBJECTS.find((s) => s.id === subId);
    const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    return {
      name: meta ? (isMr ? meta.nameMr.split(' ')[0] : meta.nameEn.split(' ')[0]) : subId,
      fullName: meta ? (isMr ? meta.nameMr : meta.nameEn) : subId,
      accuracy,
      correct: stats.correct,
      total: stats.total,
    };
  });

  // Score progression data: strictly visualize the trend over the last 10 attempts in chronological order
  const last10Attempts = [...history].slice(0, 10).reverse();
  const scoreTrendData = last10Attempts.map((h, idx) => ({
    testNumber: `T${idx + 1}`,
    score: Number(h.finalScore.toFixed(1)),
    maxScore: h.maxScore,
    accuracy: h.accuracyPercentage,
    date: h.date,
    title: h.title,
  }));

  const totalAttempted = history.reduce((acc, h) => acc + h.attemptedCount, 0);
  const totalCorrect = history.reduce((acc, h) => acc + h.correctCount, 0);
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  const totalTimeSeconds = history.reduce((acc, h) => acc + h.timeSpentSeconds, 0);
  const totalHours = (totalTimeSeconds / 3600).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-amber-600" />
          <span>{isMr ? 'अभ्यास प्रगती व कामगिरी विश्लेषण' : 'Performance Analytics & Progress'}</span>
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          {isMr 
            ? 'सर्व सराव चाचण्यांमधील गुण, अचूकता, विषयवार प्राविण्य आणि वेळेचे व्यवस्थापन तपासा.'
            : 'Track your score progression, accuracy trends, and subject-wise mastery over time.'}
        </p>
      </div>

      {/* Aggregate Score Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
            {isMr ? 'एकूण चाचण्या' : 'Total Tests'}
          </div>
          <div className="text-3xl font-black text-stone-900 font-mono">
            {history.length}
          </div>
          <div className="text-xs text-stone-500 mt-1">
            {isMr ? 'पूर्ण केलेल्या चाचण्या' : 'completed sessions'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
            {isMr ? 'सोडवलेले प्रश्न' : 'Questions Practiced'}
          </div>
          <div className="text-3xl font-black text-amber-600 font-mono">
            {totalAttempted}
          </div>
          <div className="text-xs text-stone-500 mt-1">
            {totalCorrect} {isMr ? 'बरोबर उत्तरे' : 'correctly answered'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
            {isMr ? 'एकूण अचूकता दर' : 'Net Accuracy'}
          </div>
          <div className={`text-3xl font-black font-mono ${
            overallAccuracy >= 65 ? 'text-emerald-600' : 'text-stone-900'
          }`}>
            {overallAccuracy}%
          </div>
          <div className="text-xs text-stone-500 mt-1">
            {isMr ? 'नकारात्मक गुणांनंतरचे प्रमाण' : 'taking negative marks into account'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
            {isMr ? 'चाचणी वेळ' : 'Total Test Time'}
          </div>
          <div className="text-3xl font-black text-stone-900 font-mono">
            {totalHours} <span className="text-sm font-normal text-stone-500">{isMr ? 'तास' : 'hrs'}</span>
          </div>
          <div className="text-xs text-stone-500 mt-1">
            {isMr ? 'प्रत्यक्ष प्रश्न सोडवण्याचा वेळ' : 'active testing time'}
          </div>
        </div>
      </div>

      {/* Visual Charts: Score Progression & Subject Accuracy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Progression Line Chart */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-600" />
                <span>{isMr ? 'शेवटच्या १० चाचण्यांचा गुण आलेख' : 'Score Trend (Last 10 Attempts)'}</span>
              </h2>
              {scoreTrendData.length > 0 && (
                <span className="text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200/80 px-2 py-0.5 rounded-full">
                  {scoreTrendData.length} / 10 {isMr ? 'चाचण्या' : 'attempts'}
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              {isMr ? 'Recharts द्वारे शेवटच्या १० चाचण्यांमधील मिळालेल्या गुणांची प्रगती.' : 'Recharts line visualization of user scores across the last 10 attempts.'}
            </p>
          </div>

          <div className="h-64 w-full">
            {scoreTrendData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scoreTrendData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                  <XAxis dataKey="testNumber" stroke="#888888" fontSize={12} tickLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-stone-900 text-stone-100 p-2.5 rounded-xl text-xs shadow-xl border border-stone-800 space-y-1">
                            <div className="font-bold text-amber-400">{data.title || data.testNumber}</div>
                            <div className="text-stone-300">
                              {isMr ? 'गुण:' : 'Score:'} <span className="font-mono font-bold text-white">{data.score} / {data.maxScore}</span>
                            </div>
                            <div className="text-stone-300">
                              {isMr ? 'अचूकता:' : 'Accuracy:'} <span className="text-emerald-400 font-bold">{data.accuracy}%</span>
                            </div>
                            <div className="text-[10px] text-stone-400 font-mono">{data.date}</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#d97706"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#d97706', stroke: '#ffffff', strokeWidth: 2 }}
                    activeDot={{ r: 7, fill: '#f59e0b', stroke: '#ffffff', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-stone-400 text-xs">
                {isMr ? 'प्रगती आलेख पाहण्यासाठी किमान एक चाचणी सोडवा.' : 'Complete at least one test to view score trends.'}
              </div>
            )}
          </div>
        </div>

        {/* Subject-Wise Accuracy Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="mb-4">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>{isMr ? 'विषयवार अचूकता टक्केवारी' : 'Subject-Wise Accuracy Rate (%)'}</span>
            </h2>
            <p className="text-xs text-stone-500">
              {isMr ? 'कोणत्या विषयात गुण जास्त मिळतात व कोठे सरावाची गरज आहे ते ओळखा.' : 'Identify your strongest and weakest subjects.'}
            </p>
          </div>

          <div className="h-64 w-full">
            {subjectChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectChartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} />
                  <YAxis stroke="#888888" fontSize={12} domain={[0, 100]} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1c1917',
                      color: '#f5f5f4',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    formatter={(value: any) => [`${value}%`, isMr ? 'अचूकता' : 'Accuracy']}
                  />
                  <Bar dataKey="accuracy" fill="#059669" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-stone-400 text-xs">
                {isMr ? 'विषयवार अचूकतेचा डेटा मिळवण्यासाठी चाचणी सोडवा.' : 'Subject-wise data will appear here after your first test.'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Test History Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              {isMr ? 'चाचण्यांचा इतिहास (Past Tests History)' : 'Test Attempt History'}
            </h2>
            <p className="text-xs text-stone-500">
              {isMr ? 'आधी सोडवलेल्या कोणत्याही चाचणीचे उत्तरपत्र व विश्लेषण पुन्हा पहा.' : 'Review answers and solutions from your previously attempted tests.'}
            </p>
          </div>
        </div>

        {history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">{isMr ? 'चाचणी नाव' : 'Test Name'}</th>
                  <th className="px-4 py-3.5">{isMr ? 'तारीख' : 'Date'}</th>
                  <th className="px-4 py-3.5">{isMr ? 'गुण (Score)' : 'Score'}</th>
                  <th className="px-4 py-3.5">{isMr ? 'अचूकता' : 'Accuracy'}</th>
                  <th className="px-4 py-3.5">{isMr ? 'वेळ' : 'Time'}</th>
                  <th className="px-6 py-3.5 text-right">{isMr ? 'कृती' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {history.map((h, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-stone-900">
                      {h.title}
                    </td>
                    <td className="px-4 py-4 text-stone-500 text-xs">
                      {h.date}
                    </td>
                    <td className="px-4 py-4 font-mono font-bold text-stone-800">
                      {h.finalScore.toFixed(1)} / {h.maxScore}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        h.accuracyPercentage >= 65
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-100 text-stone-700'
                      }`}>
                        {h.accuracyPercentage}%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-stone-500 font-mono text-xs">
                      {Math.floor(h.timeSpentSeconds / 60)}m {h.timeSpentSeconds % 60}s
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onReviewPastTest(h)}
                        className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-900 hover:text-white font-bold text-xs text-stone-700 transition-colors cursor-pointer"
                      >
                        {isMr ? 'पुनरावलोकन' : 'Review Test'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center text-stone-400 text-sm">
            {isMr ? 'अद्याप एकही चाचणी सोडवलेली नाही. डॅशबोर्डवरून सराव सुरू करा.' : 'No tests attempted yet. Start practicing from the dashboard.'}
          </div>
        )}
      </div>
    </div>
  );
};
