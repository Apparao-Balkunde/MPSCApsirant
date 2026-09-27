import React, { useState, useRef } from 'react';
import { 
  Download, 
  Upload, 
  FileJson, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ShieldCheck, 
  History, 
  BookOpen, 
  Bookmark, 
  StickyNote, 
  Calendar,
  Sparkles,
  RefreshCw,
  ArrowRight,
  HardDrive
} from 'lucide-react';
import { UserProgress } from '../types';
import { 
  exportUserDataAsJSON, 
  validateBackupJSON, 
  mergeBackupData, 
  MPSCBackupPayload 
} from '../utils/exportImportBackup';

interface LocalBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProgress: UserProgress;
  onRestoreProgress?: (restored: UserProgress, successMessage: string) => void;
  language: 'mr' | 'en';
}

export const LocalBackupModal: React.FC<LocalBackupModalProps> = ({
  isOpen,
  onClose,
  userProgress,
  onRestoreProgress,
  language,
}) => {
  const isMr = language === 'mr';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [importedPayload, setImportedPayload] = useState<MPSCBackupPayload | null>(null);
  const [importMode, setImportMode] = useState<'merge' | 'replace'>('merge');
  const [restoreSuccess, setRestoreSuccess] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const totalExams = userProgress.history?.length || 0;
  const totalLogs = userProgress.studyLogs?.length || 0;
  const totalBookmarks = userProgress.bookmarkedQuestionIds?.length || 0;
  const totalRules = userProgress.bookmarkedRuleIds?.length || 0;
  const totalNotes = Object.keys(userProgress.notes || {}).length;

  const handleExport = () => {
    try {
      setIsProcessing(true);
      const { filename, summary } = exportUserDataAsJSON(userProgress);
      setDownloadSuccess(
        isMr
          ? `🎉 बॅकअप यशस्वीरीत्या डाऊनलोड झाला! (${filename} — ${summary.totalExams} चाचण्या, ${summary.totalStudySessions} अभ्यास सत्रे, ${summary.totalBookmarkedQuestions} प्रश्न जतन)`
          : `🎉 Backup successfully downloaded! (${filename} — ${summary.totalExams} exams, ${summary.totalStudySessions} study logs, ${summary.totalBookmarkedQuestions} bookmarks)`
      );
      setTimeout(() => {
        setDownloadSuccess(null);
      }, 6000);
    } catch (err: any) {
      console.error('Export error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    setRestoreSuccess(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      setImportError(isMr ? 'कृपया फक्त .json स्वरूपातील बॅकअप फाइल निवडा.' : 'Please select a valid .json backup file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        const { isValid, error, payload } = validateBackupJSON(parsed);
        if (!isValid || !payload) {
          setImportError(error || (isMr ? 'अवैध बॅकअप फाइल.' : 'Invalid backup file.'));
          setImportedPayload(null);
        } else {
          setImportedPayload(payload);
          setImportError(null);
        }
      } catch (err) {
        setImportError(isMr ? 'JSON फाइल वाचताना त्रुटी आली. कृपया फाइल तपासा.' : 'Failed to parse JSON file.');
        setImportedPayload(null);
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmRestore = () => {
    if (!importedPayload || !onRestoreProgress) return;

    if (importMode === 'replace') {
      const replacedProgress: UserProgress = {
        history: importedPayload.data.history,
        studyLogs: importedPayload.data.studyLogs,
        bookmarkedQuestionIds: importedPayload.data.bookmarkedQuestionIds,
        bookmarkedRuleIds: importedPayload.data.bookmarkedRuleIds,
        notes: importedPayload.data.notes,
        preferredLanguage: importedPayload.data.settings.preferredLanguage,
        streakDays: importedPayload.data.settings.streakDays,
        lastActiveDay: importedPayload.data.settings.lastActiveDay,
        dailyTargetQuestions: userProgress.dailyTargetQuestions,
        todayQuestionsCount: userProgress.todayQuestionsCount,
        weeklyTargetHours: importedPayload.data.settings.weeklyTargetHours,
        weeklyTargetQuestions: importedPayload.data.settings.weeklyTargetQuestions,
        soundEffectsEnabled: importedPayload.data.settings.soundEffectsEnabled ?? true,
      };

      const msg = isMr 
        ? `✅ बॅकअप डेटा यशस्वीरीत्या रिस्टोअर झाला! (${importedPayload.summary.totalExams} चाचण्या, ${importedPayload.summary.totalStudySessions} सत्रे)` 
        : `✅ Backup data successfully restored! (${importedPayload.summary.totalExams} exams, ${importedPayload.summary.totalStudySessions} sessions)`;
      
      onRestoreProgress(replacedProgress, msg);
      setRestoreSuccess(msg);
      setImportedPayload(null);
    } else {
      // Merge mode
      const { merged, addedExams, addedLogs, addedBookmarks } = mergeBackupData(userProgress, importedPayload);
      const msg = isMr 
        ? `✅ बॅकअप डेटा एकत्रित झाला! (+${addedExams} नवीन चाचण्या, +${addedLogs} नवीन अभ्यास सत्रे, +${addedBookmarks} नवीन बुकमार्क्स)` 
        : `✅ Backup data merged successfully! (+${addedExams} exams, +${addedLogs} sessions, +${addedBookmarks} bookmarks)`;
      
      onRestoreProgress(merged, msg);
      setRestoreSuccess(msg);
      setImportedPayload(null);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150 my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0">
              <HardDrive className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
                <span>{isMr ? 'स्थानिक डेटा बॅकअप व निर्यात' : 'Local Data Backup & Export'}</span>
                <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-mono border border-stone-200">
                  .JSON
                </span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {isMr
                  ? 'तुमचा परीक्षेचा इतिहास, स्वाध्याय सत्रे आणि बुकमार्क्स फाइल स्वरूपात सुरक्षित ठेवा.'
                  : 'Export your exam history, study logs, and bookmarks as a JSON file to keep safe locally.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert Banner */}
        {downloadSuccess && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-900 flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">{downloadSuccess}</div>
          </div>
        )}

        {/* Restore Success Banner */}
        {restoreSuccess && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-900 flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">{restoreSuccess}</div>
          </div>
        )}

        {/* Content Body */}
        <div className="py-5 space-y-6">
          
          {/* SECTION 1: EXPORT / BACKUP CARD */}
          <div className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-amber-600" />
                <span>{isMr ? '१. डेटा बॅकअप डाऊनलोड करा' : '1. Export & Download Backup'}</span>
              </span>
              <span className="text-[11px] font-medium text-stone-500">
                {isMr ? 'सर्व स्थानिक डेटा' : 'All local data'}
              </span>
            </div>

            {/* Current Data Overview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="p-2.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
                <div className="text-[10px] text-stone-500 font-bold uppercase flex items-center justify-center gap-1 mb-1">
                  <History className="w-3 h-3 text-amber-600" />
                  <span>{isMr ? 'चाचण्या' : 'Exams'}</span>
                </div>
                <div className="text-lg font-black text-stone-900 font-mono">
                  {totalExams}
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
                <div className="text-[10px] text-stone-500 font-bold uppercase flex items-center justify-center gap-1 mb-1">
                  <BookOpen className="w-3 h-3 text-indigo-600" />
                  <span>{isMr ? 'सत्रे' : 'Study Logs'}</span>
                </div>
                <div className="text-lg font-black text-indigo-700 font-mono">
                  {totalLogs}
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
                <div className="text-[10px] text-stone-500 font-bold uppercase flex items-center justify-center gap-1 mb-1">
                  <Bookmark className="w-3 h-3 text-emerald-600" />
                  <span>{isMr ? 'बुकमार्क्स' : 'Bookmarks'}</span>
                </div>
                <div className="text-lg font-black text-emerald-700 font-mono">
                  {totalBookmarks + totalRules}
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
                <div className="text-[10px] text-stone-500 font-bold uppercase flex items-center justify-center gap-1 mb-1">
                  <StickyNote className="w-3 h-3 text-amber-600" />
                  <span>{isMr ? 'टिपा' : 'Notes'}</span>
                </div>
                <div className="text-lg font-black text-stone-700 font-mono">
                  {totalNotes}
                </div>
              </div>
            </div>

            {/* Export Action Button */}
            <button
              type="button"
              onClick={handleExport}
              disabled={isProcessing}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-black text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-stone-950" />
              <span>
                {isMr
                  ? '💾 सर्व डेटा JSON फाइलमध्ये डाउनलोड करा (Download Backup)'
                  : '💾 Export All Data as JSON File'}
              </span>
            </button>
            <p className="text-[11px] text-stone-500 text-center">
              {isMr 
                ? 'हे JSON बॅकअप तुमच्या कॉम्प्युटर किंवा फोनवर जतन केले जाईल. इंटरनेट नसतानाही तुमचा डेटा सुरक्षित राहील.'
                : 'This JSON backup will be saved on your device, ensuring your exam records are safely stored offline.'}
            </p>
          </div>

          {/* SECTION 2: IMPORT / RESTORE BACKUP */}
          {onRestoreProgress && (
            <div className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-white space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{isMr ? '२. बॅकअप रिस्टोअर करा (Import / Restore)' : '2. Import / Restore Backup'}</span>
                </span>
                <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                  {isMr ? 'पर्यायी' : 'Optional'}
                </span>
              </div>

              {/* File Input Picker */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileChange}
                  className="hidden"
                  id="backup-file-input"
                />
                <label
                  htmlFor="backup-file-input"
                  className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-stone-300 hover:border-amber-500 rounded-xl cursor-pointer bg-stone-50/50 hover:bg-amber-50/20 transition-all text-center"
                >
                  <FileJson className="w-8 h-8 text-stone-400 mb-1" />
                  <span className="text-xs font-bold text-stone-800">
                    {isMr ? 'येथे क्लिक करून तुमची .json बॅकअप फाइल निवडा' : 'Click here to choose your .json backup file'}
                  </span>
                  <span className="text-[11px] text-stone-500 mt-0.5">
                    {isMr ? 'पूर्वी डाउनलोड केलेल्या बॅकअपमधून डेटा पुन्हा मिळवा' : 'Restore from a previously exported backup file'}
                  </span>
                </label>
              </div>

              {/* Error Message */}
              {importError && (
                <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs font-semibold text-rose-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>{importError}</div>
                </div>
              )}

              {/* Imported Payload Preview & Confirmation */}
              {importedPayload && (
                <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-amber-950 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>{isMr ? 'फाइलमधील सापडलेला डेटा:' : 'Found in backup file:'}</span>
                    </span>
                    <span className="text-[11px] text-stone-500 font-mono">
                      {new Date(importedPayload.exportedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 bg-white rounded-lg border border-amber-200/80">
                      <div className="text-stone-500 text-[10px]">{isMr ? 'चाचण्या' : 'Exams'}</div>
                      <div className="font-black text-stone-900 font-mono">{importedPayload.summary.totalExams}</div>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-amber-200/80">
                      <div className="text-stone-500 text-[10px]">{isMr ? 'सत्रे' : 'Logs'}</div>
                      <div className="font-black text-indigo-700 font-mono">{importedPayload.summary.totalStudySessions}</div>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-amber-200/80">
                      <div className="text-stone-500 text-[10px]">{isMr ? 'बुकमार्क्स' : 'Bookmarks'}</div>
                      <div className="font-black text-emerald-700 font-mono">{importedPayload.summary.totalBookmarkedQuestions}</div>
                    </div>
                  </div>

                  {/* Mode selector: Merge vs Replace */}
                  <div className="flex items-center gap-3 pt-1 text-xs">
                    <label className="flex items-center gap-1.5 cursor-pointer font-bold text-stone-800">
                      <input
                        type="radio"
                        name="importMode"
                        checked={importMode === 'merge'}
                        onChange={() => setImportMode('merge')}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span>{isMr ? 'मर्ज करा (विद्यमान डेटामध्ये जोडा)' : 'Merge (Add to existing)'}</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer font-bold text-stone-800">
                      <input
                        type="radio"
                        name="importMode"
                        checked={importMode === 'replace'}
                        onChange={() => setImportMode('replace')}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span>{isMr ? 'रिप्लेस करा (फक्त नवीन डेटा ठेवा)' : 'Replace completely'}</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleConfirmRestore}
                      className="flex-1 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-black text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{isMr ? 'डेटा रिस्टोअर करण्याची पुष्टी करा' : 'Confirm & Restore Data'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImportedPayload(null)}
                      className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer transition-colors"
                    >
                      {isMr ? 'रद्द' : 'Cancel'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isMr ? 'तुमचा डेटा पूर्णपणे तुमच्या डिव्हाइसवर सुरक्षित राहतो' : 'Your data stays safe on your device'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs cursor-pointer transition-colors"
          >
            {isMr ? 'बंद करा' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
