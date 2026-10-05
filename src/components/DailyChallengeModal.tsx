import React from 'react';
import {
  Zap,
  X,
  BookOpen,
  Languages,
  Landmark,
  Layers,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Flame,
} from 'lucide-react';
import { SubjectId } from '../types';

interface DailyChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'mr' | 'en';
  onStartChallenge: (subjectId?: SubjectId | 'gs', title?: string) => void;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  isOpen,
  onClose,
  language,
  onStartChallenge,
}) => {
  if (!isOpen) return null;
  const isMr = language === 'mr';

  const challengeOptions = [
    {
      id: 'gs',
      subjectId: 'gs' as SubjectId,
      titleMr: 'सामान्य अध्ययन (General Studies - GS)',
      titleEn: 'General Studies (GS)',
      icon: Landmark,
      color: 'from-blue-600 to-indigo-700',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      descMr: 'इतिहास, भूगोल, राज्यशास्त्र, अर्थव्यवस्था, सामान्य विज्ञान व चालू घडामोडी.',
      descEn: 'History, Geography, Polity, Economy, General Science & Current Affairs.',
      questionsCount: 10,
      durationMinutes: 10,
      marks: 20,
    },
    {
      id: 'english_grammar',
      subjectId: 'english_grammar' as SubjectId,
      titleMr: 'इंग्रजी व्याकरण व शब्दसंग्रह (English Grammar)',
      titleEn: 'English Language & Grammar',
      icon: Languages,
      color: 'from-sky-600 to-cyan-700',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      descMr: 'Tenses, Articles, Subject-Verb Agreement, Vocabulary व Spotting Errors.',
      descEn: 'Tenses, Articles, Subject-Verb Agreement, Vocab & Error Spotting.',
      questionsCount: 10,
      durationMinutes: 10,
      marks: 20,
    },
    {
      id: 'marathi_grammar',
      subjectId: 'marathi_grammar' as SubjectId,
      titleMr: 'मराठी व्याकरण व शब्दसंग्रह (Marathi Grammar)',
      titleEn: 'Marathi Grammar & Vocabulary',
      icon: BookOpen,
      color: 'from-amber-600 to-orange-700',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      descMr: 'संधी, समास, प्रयोग, विभक्ती, म्हणी, वाक्प्रचार व शब्दसंग्रह.',
      descEn: 'Sandhi, Samas, Prayog, Idioms, Proverbs & Marathi Vocabulary.',
      questionsCount: 10,
      durationMinutes: 10,
      marks: 20,
    },
    {
      id: 'combo',
      subjectId: undefined, // Combines all
      titleMr: 'सर्वसमावेशक कॉम्बो (GS + मराठी + इंग्रजी)',
      titleEn: 'All-in-One Comprehensive (GS + Marathi + English)',
      icon: Layers,
      color: 'from-emerald-600 to-teal-700',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      descMr: 'MPSC परीक्षा पॅटर्ननुसार सर्व विषयांचे समतोल प्रश्न (५ GS + ५ मराठी + ५ इंग्रजी).',
      descEn: 'Balanced mock questions across all sections (5 GS + 5 Marathi + 5 English).',
      questionsCount: 15,
      durationMinutes: 10,
      marks: 30,
    },
  ];

  const handleSelectOption = (subjectId?: SubjectId | 'gs', titleMr?: string, titleEn?: string) => {
    onClose();
    const title = isMr ? titleMr : titleEn;
    onStartChallenge(subjectId, title);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="relative p-5 sm:p-6 bg-gradient-to-r from-amber-950/80 via-stone-900 to-stone-900 border-b border-stone-800">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-xl text-stone-400 hover:text-white bg-stone-800/60 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-extrabold uppercase tracking-wide">
              <Zap className="w-3.5 h-3.5 fill-amber-300" />
              {isMr ? 'दैनिक १० मिनिटांचे चॅलेंज' : 'Daily 10-Minute Challenge'}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-400 bg-stone-800/80 px-2 py-0.5 rounded-full">
              <Clock className="w-3 h-3 text-amber-400" />
              {isMr ? '१० मिनिटे' : '10 Minutes'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {isMr ? 'तुम्ही कोणता विषय सोडवू इच्छिता?' : 'Which Subject Do You Want To Practice?'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            {isMr
              ? 'खालीलपैकी तुमचा आवडता विषय निवडा आणि त्वरित १० मिनिटांचे रॅपिड चॅलेंज सुरू करा:'
              : 'Choose your desired subject below and jump directly into the rapid test:'}
          </p>
        </div>

        {/* Options Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5">
          {challengeOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(opt.subjectId, opt.titleMr, opt.titleEn)}
                className="group relative p-4 sm:p-5 rounded-2xl bg-stone-850 hover:bg-stone-800/90 border border-stone-800 hover:border-amber-500/60 shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:scale-[1.01]"
              >
                <div className="flex items-start gap-3.5 flex-1">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${opt.color} flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-extrabold text-white text-base sm:text-lg group-hover:text-amber-300 transition-colors">
                        {isMr ? opt.titleMr : opt.titleEn}
                      </h3>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed">
                      {isMr ? opt.descMr : opt.descEn}
                    </p>

                    {/* Stats pills */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                      <span className="px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 font-semibold border border-stone-700">
                        📝 {opt.questionsCount} {isMr ? 'प्रश्न' : 'Questions'}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 font-semibold border border-stone-700">
                        ⏱️ {opt.durationMinutes} {isMr ? 'मिनिटे' : 'Mins'}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-stone-800 text-amber-300 font-bold border border-stone-700">
                        🎯 {opt.marks} {isMr ? 'गुण' : 'Marks'}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-rose-950/40 text-rose-300 font-medium border border-rose-900/50">
                        ⚠️ १/४ {isMr ? 'नकारात्मक' : 'Negative'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Start Button */}
                <div className="self-end sm:self-center shrink-0">
                  <span className="px-4 py-2.5 rounded-xl font-extrabold text-xs bg-amber-500 group-hover:bg-amber-400 text-stone-950 shadow-md flex items-center gap-1.5 transition-all">
                    <span>{isMr ? 'सुरू करा' : 'Start'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-950/60 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{isMr ? 'MPSC CBT पॅटर्न व १/४ निगेटिव्ह मार्किंग' : 'MPSC CBT Pattern with 1/4th Negative Marking'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            {isMr ? 'बंद करा' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
