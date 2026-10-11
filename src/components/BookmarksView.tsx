import React, { useState } from 'react';
import { 
  Bookmark, 
  Play, 
  Trash2, 
  BookOpen, 
  Sparkles, 
  Search, 
  Filter,
  FileText,
  CheckCircle2,
  FileDown
} from 'lucide-react';
import { Question, UserProgress } from '../types';
import { MPSC_QUESTIONS } from '../data/mpscQuestions';
import { SUBJECTS } from '../data/subjects';
import { findQuestionById } from '../utils/hardQuestionsEngine';
import { exportToPdf } from '../utils/pdfExport';
import { VisualMemoryAid } from './VisualMemoryAid';

interface BookmarksViewProps {
  userProgress: UserProgress;
  language: 'mr' | 'en';
  onToggleBookmark: (qId: string) => void;
  onStartCustomExam: (qIds: string[], title: string) => void;
  onOpenAiMentor?: (q: Question) => void;
  onSaveNote: (qId: string, note: string) => void;
  questionsPool?: Question[];
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  userProgress,
  language,
  onToggleBookmark,
  onStartCustomExam,
  onOpenAiMentor,
  onSaveNote,
  questionsPool,
}) => {
  const isMr = language === 'mr';
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNoteEditId, setActiveNoteEditId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState<string>('');

  const pool = questionsPool && questionsPool.length > 0 ? questionsPool : MPSC_QUESTIONS;
  const uniqueBookmarkedIds = Array.from(new Set(userProgress.bookmarkedQuestionIds));
  const seenSavedIds = new Set<string>();
  const savedQuestions: Question[] = [];
  uniqueBookmarkedIds.forEach((id) => {
    const q = findQuestionById(id, pool);
    if (q && !seenSavedIds.has(q.id)) {
      seenSavedIds.add(q.id);
      savedQuestions.push(q);
    }
  });

  const filtered = savedQuestions.filter((q) => {
    if (selectedSubject !== 'all' && q.subjectId !== selectedSubject) return false;
    if (searchQuery.trim()) {
      const qText = (q.questionMr + ' ' + q.questionEn + ' ' + q.topic).toLowerCase();
      if (!qText.includes(searchQuery.toLowerCase())) return false;
    }
    return true;
  });

  const handleStartEditingNote = (qId: string) => {
    setActiveNoteEditId(qId);
    setNoteDraft(userProgress.notes[qId] || '');
  };

  const handleSaveNoteSubmit = (qId: string) => {
    onSaveNote(qId, noteDraft);
    setActiveNoteEditId(null);
  };

  return (
    <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 flex items-center gap-2.5">
            <Bookmark className="w-7 h-7 text-amber-600 fill-amber-600" />
            <span>{isMr ? 'जतन केलेले प्रश्न व उजळणी' : 'Saved Questions & Revision Vault'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {isMr
              ? 'तुम्ही जतन केलेले अवघड प्रश्न, संदर्भ स्पष्टीकरणे व वैयक्तिक अभ्यास नोट्स.'
              : 'Tricky questions bookmarked for revision with textbook citations and custom study notes.'}
          </p>
        </div>

        {savedQuestions.length > 0 && (
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => {
                exportToPdf({
                  title: isMr ? 'MPSC जतन केलेले प्रश्न व उजळणी पुस्तिका' : 'MPSC Saved Questions & Study Notes',
                });
              }}
              className="px-3.5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center gap-2 transition-colors cursor-pointer no-print active:scale-95"
              title={isMr ? 'जतन केलेले प्रश्न PDF मध्ये डाऊनलोड करा' : 'Export saved questions as PDF'}
            >
              <FileDown className="w-4 h-4 text-amber-400" />
              <span>{isMr ? '📄 PDF डाऊनलोड' : '📄 Export PDF'}</span>
            </button>

            <button
              onClick={() => onStartCustomExam(
                filtered.map((q) => q.id),
                isMr ? 'जतन केलेल्या प्रश्नांची उजळणी परीक्षा' : 'Bookmarked Questions Revision Test'
              )}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm flex items-center gap-2 transition-colors cursor-pointer no-print"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isMr ? 'या प्रश्नांची चाचणी द्या' : 'Practice These Questions'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search controls */}
      {savedQuestions.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-stone-200">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              placeholder={isMr ? 'प्रश्नात शोधा...' : 'Search in saved questions...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-stone-50"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <span className="text-xs font-bold text-stone-500 shrink-0">
              {isMr ? 'विषय:' : 'Subject:'}
            </span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="text-xs font-semibold px-2.5 py-1.5 border border-stone-300 rounded-lg bg-white text-stone-700"
            >
              <option value="all">{isMr ? 'सर्व विषय' : 'All Subjects'}</option>
              {SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {isMr ? s.nameMr : s.nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Questions list */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((q, idx) => {
            const subjectMeta = SUBJECTS.find((s) => s.id === q.subjectId);
            const userNote = userProgress.notes[q.id];
            const isEditingThisNote = activeNoteEditId === q.id;

            return (
              <div
                key={`${q.id}-${idx}`}
                className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-6 space-y-4 exam-question-card print-avoid-break"
              >
                {/* Question Meta Header */}
                <div className="flex items-center justify-between gap-2 flex-wrap pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-800">
                      #{idx + 1}
                    </span>
                    {subjectMeta && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                        {isMr ? subjectMeta.nameMr : subjectMeta.nameEn}
                      </span>
                    )}
                    <span className="text-xs text-stone-500">• {q.topic}</span>
                  </div>

                  <div className="flex items-center gap-2 no-print">
                    {onOpenAiMentor && (
                      <button
                        onClick={() => onOpenAiMentor(q)}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>{isMr ? 'मार्गदर्शक AI' : 'Ask Mentor'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => onToggleBookmark(q.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Question statement */}
                <div className="text-stone-900 font-semibold text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {isMr ? q.questionMr : q.questionEn}
                </div>

                {/* Options with correct answer highlighted - Image 2 format */}
                <div className="flex flex-col gap-2.5 pt-1">
                  {(isMr ? q.optionsMr : q.optionsEn).map((opt, optIdx) => {
                    const isCorrect = q.correctAnswerIndex === optIdx;
                    const optionLetter = ['A', 'B', 'C', 'D', 'E', 'F'][optIdx] || `${optIdx + 1}`;

                    return (
                      <div
                        key={optIdx}
                        className={`px-4 py-3 rounded-xl border text-xs sm:text-sm flex items-center gap-3.5 transition-colors ${
                          isCorrect
                            ? 'border-emerald-500 bg-[#edf8f2] text-emerald-950 font-bold shadow-[0_1px_3px_rgba(16,185,129,0.08)]'
                            : 'border-stone-200/90 bg-[#fbf9f6] text-stone-800'
                        }`}
                      >
                        <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-xs ${
                          isCorrect ? 'bg-emerald-600 text-white' : 'bg-[#ece8e2] text-stone-700'
                        }`}>
                          {optionLetter}
                        </span>
                        <span className="flex-1 text-sm sm:text-base font-medium">{opt}</span>
                        {isCorrect && (
                          <div className="ml-auto shrink-0 flex items-center gap-1 text-emerald-600">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Solution & Reference - Exactly matching image 2 */}
                <div className="mt-3.5 p-4 sm:p-5 rounded-xl bg-[#fff9f5] border border-[#f5d7c3] space-y-2 text-xs sm:text-sm text-stone-800 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                  <div className="font-bold text-orange-700 flex items-center gap-1.5 text-sm sm:text-base">
                    <span className="text-base">📖</span>
                    <span>{isMr ? 'स्पष्टीकरण' : 'Explanation'}</span>
                  </div>
                  <p className="leading-relaxed text-stone-700 italic whitespace-pre-line font-normal text-xs sm:text-sm">
                    {isMr ? q.explanationMr : q.explanationEn}
                  </p>
                  {q.reference && (
                    <div className="mt-3 pt-2 text-xs text-stone-500 font-medium border-t border-orange-200/60 flex items-center gap-1.5">
                      <span className="font-semibold text-stone-600">{isMr ? 'संदर्भ ग्रंथ:' : 'Reference:'}</span>
                      <span className="text-stone-700">{q.reference}</span>
                    </div>
                  )}

                  {/* Visual Memory Aid with India, World & Maharashtra Maps for Recall */}
                  <VisualMemoryAid
                    subjectId={q.subjectId}
                    topic={q.topic}
                    subtopic={q.subtopic}
                    language={language}
                    defaultMapType={q.mapType}
                    customImageUrl={q.imageUrl}
                    memoryTrickMr={q.memoryTrickMr}
                    memoryTrickEn={q.memoryTrickEn}
                  />
                </div>

                {/* Aspirant Personal Revision Note */}
                <div className="pt-2">
                  {isEditingThisNote ? (
                    <div className="space-y-2">
                      <textarea
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        placeholder={isMr ? 'या प्रश्नासाठी तुमची स्वतःची उजळणी टीप / स्मरण युक्ती लिहा...' : 'Write your personal study note or mnemonic for this question...'}
                        className="w-full p-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                        rows={2}
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSaveNoteSubmit(q.id)}
                          className="px-3 py-1 bg-stone-900 text-white font-bold text-xs rounded-lg hover:bg-stone-800 cursor-pointer"
                        >
                          {isMr ? 'जतन करा' : 'Save Note'}
                        </button>
                        <button
                          onClick={() => setActiveNoteEditId(null)}
                          className="px-3 py-1 border border-stone-300 text-stone-600 font-semibold text-xs rounded-lg hover:bg-stone-50 cursor-pointer"
                        >
                          {isMr ? 'रद्द करा' : 'Cancel'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-amber-50/40 border border-amber-200/60 text-xs">
                      <div className="flex items-start gap-2">
                        <FileText className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-amber-900">
                            {isMr ? 'माझी अभ्यास टीप:' : 'My Revision Note:'}
                          </span>{' '}
                          <span className="text-stone-700">
                            {userNote || (isMr ? 'अद्याप कोणतीही टीप नाही.' : 'No notes added yet.')}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleStartEditingNote(q.id)}
                        className="text-xs font-bold text-amber-800 hover:underline shrink-0 cursor-pointer no-print"
                      >
                        {userNote ? (isMr ? 'संपादित करा' : 'Edit') : (isMr ? '+ टीप जोडा' : '+ Add Note')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-stone-800">
            {isMr ? 'अद्याप कोणताही प्रश्न जतन केलेला नाही' : 'No Questions Bookmarked Yet'}
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            {isMr
              ? 'सराव परीक्षा सोडवताना अवघड वाटणाऱ्या प्रश्नांवर "जतन करा" बटण दाबून येथे संग्रहित करा.'
              : 'Bookmark tricky or high-priority questions during practice tests to review and re-test them here.'}
          </p>
        </div>
      )}
    </div>
  );
};
