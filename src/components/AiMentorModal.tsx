import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  BookOpen, 
  Lightbulb, 
  HelpCircle, 
  AlertCircle,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { Question } from '../types';

interface AiMentorModalProps {
  question?: Question | null;
  studentAnswer?: string;
  language: 'mr' | 'en';
  onClose: () => void;
}

export const AiMentorModal: React.FC<AiMentorModalProps> = ({
  question,
  studentAnswer,
  language,
  onClose,
}) => {
  const isMr = language === 'mr';
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const quickPrompts = isMr
    ? [
        'हा घटक लक्षात ठेवण्यासाठी सोपी ट्रिक किंवा Mnemonic द्या.',
        'इतर ३ पर्याय का चुकीचे आहेत याचे विश्लेषण करा.',
        'MPSC पूर्वपरीक्षेत या विषयावर आयोग कसे प्रश्न फिरवून विचारतो?',
        'या घटकाशी संबंधित संदर्भ पुस्तकांमधील महत्त्वाचे मुद्दे सांगा.',
      ]
    : [
        'Provide a simple mnemonic/trick to remember this concept.',
        'Why are the other three options incorrect in this context?',
        'What are the frequent trap questions MPSC sets on this topic?',
        'Key textbook highlights related to this topic for revision.',
      ];

  const handleAskMentor = async (customQuestion?: string) => {
    const studentQueryText = customQuestion || query;
    if (!studentQueryText && !question) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/doubt-solver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: question ? (isMr ? question.questionMr : question.questionEn) : '',
          options: question ? (isMr ? question.optionsMr : question.optionsEn) : [],
          correctAnswer: question
            ? isMr
              ? question.optionsMr[question.correctAnswerIndex]
              : question.optionsEn[question.correctAnswerIndex]
            : '',
          explanation: question ? (isMr ? question.explanationMr : question.explanationEn) : '',
          studentQuery: studentQueryText || (isMr ? 'कृपया सविस्तर मार्गदर्शन करा.' : 'Please guide in depth.'),
          subject: question?.topic || 'General Studies',
          language,
        }),
      });

      const data = await res.json().catch(() => null);

      if (data && data.answer) {
        setResponse(data.answer);
      } else {
        setResponse(
          isMr
            ? `📌 **मार्गदर्शक टीप:**\n\nया प्रश्नासाठी संदर्भ पुस्तक (महाराष्ट्र राज्य पाठ्यपुस्तक मंडळ अथवा एम. लक्ष्मीकांत/के.ए. खातीब) चे वाचन महत्त्वाचे आहे.\n\nपरीक्षेत अचूक पर्यायाची निवड करताना 'केवळ', 'सर्व', 'कधीही नाही' यासारख्या टोकाच्या शब्दांकडे विशेष लक्ष द्या.`
            : `📌 **MPSC Exam Guidance:**\n\nReview this question against standard sources (State Board Textbooks or standard references).\n\nWatch out for absolute qualifiers like 'Only', 'Always', or 'Never' which are often distractors in MPSC exams.`
        );
      }
    } catch (_err) {
      setResponse(
        isMr
          ? `📌 **मार्गदर्शक टीप:**\n\nया प्रश्नासाठी संदर्भ पुस्तक (महाराष्ट्र राज्य पाठ्यपुस्तक मंडळ अथवा एम. लक्ष्मीकांत/के.ए. खातीब) चे वाचन महत्त्वाचे आहे.\n\nपरीक्षेत अचूक पर्यायाची निवड करताना 'केवळ', 'सर्व', 'कधीही नाही' यासारख्या टोकाच्या शब्दांकडे विशेष लक्ष द्या.`
          : `📌 **MPSC Exam Guidance:**\n\nReview this question against standard sources (State Board Textbooks or standard references).\n\nWatch out for absolute qualifiers like 'Only', 'Always', or 'Never' which are often distractors in MPSC exams.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 to-stone-850 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shadow-inner">
              <Sparkles className="w-5 h-5 fill-stone-950" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg">
                {isMr ? 'एमपीएससी मार्गदर्शक (AI Doubt Solver)' : 'MPSC Margdarshak (AI Doubt Solver)'}
              </h2>
              <p className="text-xs text-amber-300">
                {isMr ? 'संकल्पना स्पष्टीकरण, पर्यायांचे विश्लेषण व स्मरण पद्धती' : 'Concept breakdowns, distractor analysis & memory mnemonics'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Active Question Context Card if opened from a question */}
          {question && (
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-500">
                <span>{question.topic}</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {isMr ? 'अचूक पर्याय:' : 'Correct:'} {question.correctAnswerIndex + 1}
                </span>
              </div>
              <p className="font-semibold text-stone-900 line-clamp-3">
                {isMr ? question.questionMr : question.questionEn}
              </p>
            </div>
          )}

          {/* Quick Prompts */}
          <div>
            <span className="text-xs font-bold text-stone-600 block mb-2">
              {isMr ? 'वारंवार विचारल्या जाणाऱ्या शंका (Quick Prompts):' : 'Frequently Asked Doubts:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(p);
                    handleAskMentor(p);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-amber-100 hover:text-amber-900 border border-stone-200 text-stone-700 text-xs font-medium transition-colors cursor-pointer text-left"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Mentor Output Box */}
          {response && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-300/80 text-stone-900 text-xs sm:text-sm space-y-2 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 border-b border-amber-200 pb-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>{isMr ? 'मार्गदर्शक विश्लेषण (Mentor Guidance):' : 'Mentor Breakdown:'}</span>
              </div>
              <div className="whitespace-pre-line text-stone-800">
                {response}
              </div>
            </div>
          )}

          {loading && (
            <div className="p-8 text-center space-y-3">
              <RefreshCw className="w-6 h-6 animate-spin text-amber-600 mx-auto" />
              <p className="text-xs text-stone-500 font-medium">
                {isMr ? 'मार्गदर्शक विश्लेषण तयार करत आहे...' : 'Analyzing question context and references...'}
              </p>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-3 sm:p-4 bg-stone-50 border-t border-stone-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAskMentor();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={isMr ? 'तुमची विशिष्ट शंका किंवा प्रश्न येथे विचारा...' : 'Ask your specific doubt or question here...'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
            />
            <button
              type="submit"
              disabled={loading || (!query.trim() && !question)}
              className="px-4 py-2.5 bg-stone-900 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">{isMr ? 'विचारा' : 'Ask'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
