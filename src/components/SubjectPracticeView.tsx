import React from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  Award,
  Filter
} from 'lucide-react';
import { ExamPatternId, SubjectId } from '../types';
import { SUBJECTS } from '../data/subjects';
import { MPSC_QUESTIONS } from '../data/mpscQuestions';

interface SubjectPracticeViewProps {
  language: 'mr' | 'en';
  onStartSubjectExam: (subjectId: SubjectId, title: string) => void;
}

export const SubjectPracticeView: React.FC<SubjectPracticeViewProps> = ({
  language,
  onStartSubjectExam,
}) => {
  const isMr = language === 'mr';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUBJECTS.map((sub) => {
          const questions = MPSC_QUESTIONS.filter((q) => q.subjectId === sub.id);
          const topics = Array.from(new Set(questions.map((q) => q.topic)));

          return (
            <div
              key={sub.id}
              className="bg-white rounded-2xl border-2 border-stone-200 hover:border-amber-400 p-6 flex flex-col justify-between transition-all hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-stone-100 text-stone-700">
                    {questions.length} {isMr ? 'सराव प्रश्न' : 'Practice Questions'}
                  </span>
                  <span className="text-xs font-bold text-amber-700">
                    MPSC Prelims
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

              <div className="pt-5 mt-4 border-t border-stone-100">
                <button
                  onClick={() => onStartSubjectExam(sub.id, isMr ? sub.nameMr : sub.nameEn)}
                  className="w-full py-2.5 bg-stone-900 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isMr ? 'सराव चाचणी सुरू करा' : 'Start Subject Test'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
