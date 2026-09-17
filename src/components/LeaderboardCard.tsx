import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Medal, 
  RefreshCw, 
  Flame, 
  Database,
  Radio
} from 'lucide-react';
import { LeaderboardEntry, UserProgress } from '../types';
import { subscribeToRealtimeLeaderboard } from '../services/firestoreSync';

interface LeaderboardCardProps {
  userProgress: UserProgress;
  language: 'mr' | 'en';
  currentUserId?: string;
  currentUserName?: string;
  onOpenExamHub?: () => void;
}

export const LeaderboardCard: React.FC<LeaderboardCardProps> = ({
  userProgress,
  language,
  currentUserId,
  currentUserName,
  onOpenExamHub,
}) => {
  const isMr = language === 'mr';
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRealtimeActive, setIsRealtimeActive] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToRealtimeLeaderboard(
      currentUserId,
      userProgress,
      currentUserName,
      (liveLeaderboard) => {
        setEntries(liveLeaderboard);
        setIsLoading(false);
        setIsRealtimeActive(true);
        setLastRefreshed(
          new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        );
      }
    );

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userProgress.history.length, currentUserId, currentUserName]);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-700 border border-amber-400/40 flex items-center justify-center font-black text-sm shadow-xs">
            <Trophy className="w-4 h-4 text-amber-600" />
          </div>
        );
      case 2:
        return (
          <div className="w-8 h-8 rounded-xl bg-stone-200 text-stone-700 border border-stone-300 flex items-center justify-center font-black text-sm shadow-xs">
            <Medal className="w-4 h-4 text-stone-600" />
          </div>
        );
      case 3:
        return (
          <div className="w-8 h-8 rounded-xl bg-amber-700/15 text-amber-800 border border-amber-600/30 flex items-center justify-center font-black text-sm shadow-xs">
            <Medal className="w-4 h-4 text-amber-800" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-600 border border-stone-200 flex items-center justify-center font-bold text-xs">
            #{rank}
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden flex flex-col justify-between">
      {/* Header */}
      <div className="p-5 border-b border-stone-100 flex items-center justify-between gap-3 bg-gradient-to-r from-stone-50/80 via-white to-amber-50/30">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-700 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-amber-600" />
            </div>
            <h2 className="text-base font-bold text-stone-900">
              {isMr ? 'सर्वोत्कृष्ट ५ उमेदवार (Top 5 Leaderboard)' : 'Top 5 Aspirants Leaderboard'}
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            {isMr 
              ? 'फायरबेस Firestore वरून एकूण चाचणी गुणांवर आधारित थेट गणना.' 
              : 'Ranked by total exam scores fetched & calculated via Firestore.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isRealtimeActive && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isMr ? 'थेट फायरबेस रिअल-टाईम' : 'Firestore Realtime'}</span>
            </span>
          )}
        </div>
      </div>

      {/* Top 5 Aspirants List */}
      <div className="p-4 space-y-2.5">
        {isLoading && entries.length === 0 ? (
          <div className="py-8 text-center text-stone-400 text-xs flex flex-col items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin text-amber-600" />
            <span>{isMr ? 'फायरबेसवरून रँकिंग लोड होत आहे...' : 'Calculating ranks from Firestore...'}</span>
          </div>
        ) : entries.length === 0 ? (
          <div className="py-6 text-center text-stone-400 text-xs">
            {isMr ? 'अजून एकही चाचणी सोडवलेली नाही.' : 'No leaderboard entries found yet.'}
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.userId}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                entry.isCurrentUser
                  ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-400/40 shadow-xs'
                  : 'bg-stone-50/50 hover:bg-stone-50 border-stone-200/80'
              }`}
            >
              {/* Left: Rank + Info */}
              <div className="flex items-center gap-3 min-w-0">
                {getRankBadge(entry.rank)}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                      {entry.name}
                    </span>
                    {entry.isCurrentUser && (
                      <span className="text-[10px] uppercase font-black bg-amber-500 text-stone-950 px-1.5 py-0.2 rounded font-mono">
                        {isMr ? 'तुम्ही' : 'YOU'}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                    <span className="truncate max-w-[130px] sm:max-w-[180px]">{entry.roleTag || 'MPSC Aspirant'}</span>
                    <span>•</span>
                    <span>{entry.examsCount} {isMr ? 'चाचण्या' : 'tests'}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-semibold">{entry.accuracy}% {isMr ? 'अचूकता' : 'acc'}</span>
                  </div>
                </div>
              </div>

              {/* Right: Score */}
              <div className="text-right shrink-0 pl-2">
                <div className="font-mono font-black text-sm sm:text-base text-stone-900">
                  {entry.totalScore.toFixed(1)}
                </div>
                <div className="text-[10px] font-semibold text-amber-600 uppercase tracking-tight">
                  {isMr ? 'एकूण गुण' : 'Total Score'}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer hint */}
      <div className="px-5 py-3 bg-stone-50 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px]">
          <Flame className="w-3.5 h-3.5 text-amber-600" />
          <span>
            {isMr ? 'चाचणी पूर्ण करताच तुमचे गुण आपोआप अपडेट होतात' : 'Scores recalculate in Firestore upon exam submission'}
          </span>
        </div>
        {lastRefreshed && (
          <span className="text-[10px] text-stone-400 font-mono hidden sm:inline">
            {lastRefreshed}
          </span>
        )}
      </div>
    </div>
  );
};
