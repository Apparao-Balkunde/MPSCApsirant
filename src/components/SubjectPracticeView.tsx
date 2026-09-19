import React from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  Award,
  Filter,
  FileText,
  Flame,
  Sparkles
} from 'lucide-react';
import { ExamPatternId, SubjectId, Question } from '../types';
import { SUBJECTS } from '../data/subjects';
import { MPSC_QUESTIONS } from '../data/mpscQuestions';

interface SubjectPracticeViewProps {
  language: 'mr' | 'en';
  onStartSubjectExam: (subjectId: SubjectId, title: string) => void;
  onOpenGrammarRules?: () => void;
  onOpenHardQuestionsHub?: (subjectId?: SubjectId) => void;
  questionsPool?: Question[];
}

export const SubjectPracticeView: React.FC<SubjectPracticeViewProps> = ({
  language,
  onStartSubjectExam,
  onOpenGrammarRules,
  onOpenHardQuestionsHub,
  questionsPool,
}) => {
  const isMr = language === 'mr';
  const pool = questionsPool && questionsPool.length > 0 ? questionsPool : MPSC_QUESTIONS;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 flex items-center gap-2.5">
            <BookOpen className="w-7 h-7 text-amber-600" />
            <span>{isMr ? 'विषयवार सराव व अभ्यास घटक' : 'Subject-Wise Practice Modules'}</span>
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            {isMr 
              ? 'एमपीएससी अभ्यासक्रमानुसार प्रत्येक घटकावर प्रभुत्व मिळवण्यासाठी विषयानुसार सराव चाचण्या.'
              : 'Master individual syllabus components with targeted, high-yield subject quizzes.'}
          </p>
        </div>

        {onOpenHardQuestionsHub && (
          <button
            onClick={() => onOpenHardQuestionsHub()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-950 via-amber-950 to-stone-900 text-amber-300 border border-amber-500/40 hover:border-amber-400 font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-sm transition-all shrink-0"
          >
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400/30 animate-pulse" />
            <span>{isMr ? '🔥 १,००,०००+ कठीण प्रश्न केंद्र उघडा' : '🔥 100k Hard Questions Hub'}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUBJECTS.map((sub) => {
          const questions = pool.filter((q) => q.subjectId === sub.id);
          const hardQuestionsCount = questions.filter((q) => q.difficulty === 'Hard').length;
          const topics = Array.from(new Set(questions.map((q) => q.topic)));

          return (
            <div
              key={sub.id}
              className="bg-white rounded-2xl border-2 border-stone-200 hover:border-amber-400 p-6 flex flex-col justify-between transition-all hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-stone-100 text-stone-700">
                    {questions.length} {isMr ? 'सराव प्रश्न' : 'Practice Questions'}
                  </span>
                  <span className="text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Flame className="w-3 h-3 text-red-500 fill-red-500" />
                    <span>{hardQuestionsCount > 0 ? hardQuestionsCount : '10k+'} {isMr ? 'कठीण प्रश्न' : 'Hard'}</span>
                  </span>
                </div>

                <h2 className="text-lg font-bold text-stone-900">
                  {isMr ? sub.nameMr : sub.nameEn}
                </h2>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {isMr ? sub.descriptionMr : sub.descriptionEn}
                </p>

                {/* Subtopic Chips */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-stone-400 block mb-1.5 uppercase tracking-wider">
                    {isMr ? 'मुख्य घटक (Key Topics):' : 'Key Topics:'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2 py-0.5 rounded bg-stone-100 text-stone-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-stone-100 space-y-2">
                {(sub.id === 'marathi_grammar' || sub.id === 'english_grammar') && onOpenGrammarRules && (
                  <button
                    onClick={onOpenGrammarRules}
                    className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{isMr ? '📖 व्याकरण नियम व सूत्रे पहा' : '📖 View Grammar Rules & Shortcuts'}</span>
                  </button>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onStartSubjectExam(sub.id, isMr ? sub.nameMr : sub.nameEn)}
                    className="py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isMr ? 'स्टँडर्ड सराव' : 'Standard Test'}</span>
                  </button>

                  {onOpenHardQuestionsHub ? (
                    <button
                      onClick={() => onOpenHardQuestionsHub(sub.id)}
                      className="py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      title={isMr ? "या विषयाचे कठीण प्रश्न सोडवा" : "Solve Hard Level Questions"}
                    >
                      <Flame className="w-3.5 h-3.5 fill-stone-950" />
                      <span>{isMr ? 'कठीण स्तर' : 'Hard Level'}</span>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
