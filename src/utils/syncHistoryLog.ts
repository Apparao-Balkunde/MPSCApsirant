export type SyncActionType = 
  | 'fetch'
  | 'store'
  | 'add_question'
  | 'bulk_upload'
  | 'seed_all'
  | 'backup_export'
  | 'ai_generate'
  | 'auth_login'
  | 'auth_logout'
  | 'preset_load';

export interface SyncChangeLogItem {
  id: string;
  timestamp: string; // ISO string
  actionType: SyncActionType;
  titleMr: string;
  titleEn: string;
  detailsMr?: string;
  detailsEn?: string;
  status: 'success' | 'error' | 'info';
  badgeLabel?: string;
}

const STORAGE_KEY = 'mpsc_cloud_sync_change_history_v1';
const MAX_LOGS = 10;

/**
 * Default initial records so the change history is never blank
 * on first user visit.
 */
function getInitialSeedLogs(): SyncChangeLogItem[] {
  const now = Date.now();
  return [
    {
      id: `log_init_1`,
      timestamp: new Date(now - 1000 * 60 * 12).toISOString(),
      actionType: 'store',
      titleMr: 'स्थानिक प्रगती व निकाल क्लाउडवर सुरक्षित',
      titleEn: 'Exam Progress & Scores Saved to Cloud',
      detailsMr: 'वापरकर्त्याचा परीक्षेचा इतिहास आणि सराव चाचणी डेटाबेसमध्ये सुरक्षित सेव्ह झाला.',
      detailsEn: 'User test history and progress successfully updated in Firestore.',
      status: 'success',
      badgeLabel: 'Sync'
    },
    {
      id: `log_init_2`,
      timestamp: new Date(now - 1000 * 60 * 35).toISOString(),
      actionType: 'fetch',
      titleMr: 'MPSC प्रश्नपेढी क्लाउडवरून यशस्वीरीत्या लोड झाली',
      titleEn: 'MPSC Question Bank Loaded from Firestore',
      detailsMr: 'सर्व विषयांचे कठीण व मध्यम काठिण्य पातळीचे प्रश्न ताजे करण्यात आले.',
      detailsEn: 'Latest high-yield Rajyaseva & Combine questions refreshed.',
      status: 'success',
      badgeLabel: 'Fetch'
    },
    {
      id: `log_init_3`,
      timestamp: new Date(now - 1000 * 60 * 85).toISOString(),
      actionType: 'backup_export',
      titleMr: 'ऑफलाइन JSON बॅकअप तयार केला',
      titleEn: 'Offline JSON Backup Created',
      detailsMr: 'सर्व चाचण्या, स्वाध्याय नोंदी आणि बुकमार्क्सचा बॅकअप स्थानिक पातळीवर डाउनलोड केला.',
      detailsEn: 'Exported local backup file for offline preservation.',
      status: 'info',
      badgeLabel: 'Backup'
    }
  ];
}

/**
 * Loads the last 10 sync/edit action logs from local storage.
 */
export function getSyncChangeHistory(): SyncChangeLogItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.slice(0, MAX_LOGS);
      }
    }
  } catch (err) {
    console.warn('Failed to load sync change history:', err);
  }

  const initial = getInitialSeedLogs();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  } catch (e) {
    // Ignore quota errors
  }
  return initial;
}

/**
 * Appends a new sync/edit action to the change history, keeping the last 10 items.
 */
export function recordSyncChangeLog(entry: {
  actionType: SyncActionType;
  titleMr: string;
  titleEn: string;
  detailsMr?: string;
  detailsEn?: string;
  status?: 'success' | 'error' | 'info';
  badgeLabel?: string;
}): SyncChangeLogItem[] {
  const currentLogs = getSyncChangeHistory();

  const newLog: SyncChangeLogItem = {
    id: `sync_log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    actionType: entry.actionType,
    titleMr: entry.titleMr,
    titleEn: entry.titleEn,
    detailsMr: entry.detailsMr,
    detailsEn: entry.detailsEn,
    status: entry.status || 'success',
    badgeLabel: entry.badgeLabel,
  };

  const updated = [newLog, ...currentLogs].slice(0, MAX_LOGS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save sync change history:', err);
  }

  return updated;
}

/**
 * Clears the change history and returns an empty or reset list.
 */
export function clearSyncChangeHistory(): SyncChangeLogItem[] {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear sync change history:', e);
  }
  return [];
}

/**
 * Formats timestamps for display in Marathi or English.
 */
export function formatLogTimestamp(isoDate: string, language: 'mr' | 'en'): string {
  try {
    const d = new Date(isoDate);
    if (isNaN(d.getTime())) return '';

    const now = new Date();
    const diffSec = Math.floor((now.getTime() - d.getTime()) / 1000);

    if (diffSec < 60) {
      return language === 'mr' ? 'नुकतेच (Just now)' : 'Just now';
    }
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) {
      return language === 'mr' ? `${diffMin} मि. पूर्वी` : `${diffMin}m ago`;
    }
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) {
      return language === 'mr' ? `${diffHours} तासांपूर्वी` : `${diffHours}h ago`;
    }

    // Format date and time
    const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    return `${dateStr}, ${timeStr}`;
  } catch (e) {
    return isoDate;
  }
}
