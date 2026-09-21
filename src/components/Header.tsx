import React, { useState, useEffect } from 'react';
import { BookOpen, User, ArrowLeft, Bell, Target, Flame, PenSquare } from 'lucide-react';
import { getProgress } from '../services/storageService';
import { supabase } from '../lib/supabase';

export function Header() {
  const progress = getProgress();
  
  // 🔴 New Feature States
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);

  // 🔴 Hardware Back Button & Navigation Logic
  useEffect(() => {
    // चेक करा की आपण होम पेज व्यतिरिक्त इतर कुठल्या पेजवर आहोत का
    setCanGoBack(window.history.length > 1 && window.location.pathname !== '/');

    const handlePopState = () => {
      if (showNotifications) {
        setShowNotifications(false); // आधी नोटिफिकेशन मेन्यू बंद करा
      } else {
        // हार्डवेअर बॅक दाबल्यावर डिफॉल्ट History Back कॉल होईल
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [showNotifications]);

  const handleBackClick = () => {
    window.history.back();
  };

  // 🔴 SSO — exam.mpscsarathi.online वर तोच युजर ओळखला जावा म्हणून
  // सध्याच्या Supabase session चा access token URL सोबत पाठवतो.
  // Login नसेल तर टोकनशिवाय उघडतं (exam अ‍ॅप तेव्हा आधीसारखं
  // anonymous login वापरेल — काहीही तुटत नाही).
  const goToExam = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const url = session?.access_token
        ? `https://exam.mpscsarathi.online?token=${encodeURIComponent(session.access_token)}`
        : 'https://exam.mpscsarathi.online';
      window.open(url, '_blank', 'noreferrer');
    } catch (err) {
      console.error('[SSO] session मिळवताना चूक:', err);
      window.open('https://exam.mpscsarathi.online', '_blank', 'noreferrer');
    }
  };

  // 🔴 New Feature: Live Exam Countdown (राज्यसेवा पूर्व परीक्षा)
  useEffect(() => {
    const targetDate = new Date('2026-05-31T00:00:00').getTime();
    const today = new Date().getTime();
    const diff = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    setDaysLeft(diff > 0 ? diff : 0);
  }, []);

  return (
    <header style={{
      background: 'linear-gradient(135deg,#1C2B2B,#0D6B6E)',
      borderBottom: '2px solid rgba(245,200,66,0.3)',
      position: 'sticky', top: 0, zIndex: 100,
      boxShadow: '0 4px 20px rgba(13,107,110,0.3)',
      fontFamily: "'Baloo 2','Noto Sans Devanagari',sans-serif",
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* 🔴 Left Section: Back Button + Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {canGoBack && (
            <button onClick={handleBackClick} style={{ background:'rgba(255,255,255,0.1)', border:'none', borderRadius:10, padding:'8px', color:'#fff', cursor:'pointer', display:'flex', transition:'background 0.2s' }}>
              <ArrowLeft size={18} />
            </button>
          )}
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: 'linear-gradient(135deg,#E8671A,#F5C842)', borderRadius: 12, padding: '8px', boxShadow: '0 4px 14px rgba(232,103,26,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={20} color="#fff" />
            </div>
            {!canGoBack && (
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ lineHeight: 1 }}>
                  <span style={{ fontWeight: 900, fontSize: 18, letterSpacing: '-0.04em', color: '#fff' }}>MPSC</span>
                  <span style={{ fontWeight: 900, fontSize: 18, letterSpacing: '-0.04em', color: '#F5C842' }}> सारथी</span>
                </div>
                {/* 🔴 New Feature: Exam Target Info */}
                <div style={{ fontSize: 10, fontWeight: 700, color: '#A5F3FC', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                  <Target size={10} /> राज्यसेवा पूर्व: {daysLeft} दिवस बाकी
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 🔴 Right Section: Notifications, Stats & Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

          {/* 🔴 New Feature: exam.mpscsarathi.online साठी लिंक — pulse glow + responsive */}
          <style>{`
            @keyframes examLinkPulse {
              0%, 100% { box-shadow: 0 4px 14px rgba(232,103,26,0.4), 0 0 0 0 rgba(245,200,66,0.5); }
              50% { box-shadow: 0 4px 18px rgba(232,103,26,0.55), 0 0 0 6px rgba(245,200,66,0); }
            }
            .exam-link-btn { animation: examLinkPulse 2.4s ease-in-out infinite; }
            .exam-link-text { display: none; }
            @media (min-width: 480px) {
              .exam-link-text { display: inline; }
            }
          `}</style>
          <a
            href="https://exam.mpscsarathi.online"
            onClick={(e) => { e.preventDefault(); goToExam(); }}
            target="_blank"
            rel="noreferrer"
            className="exam-link-btn"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'linear-gradient(135deg,#E8671A,#F5C842)',
              borderRadius: 99, padding: '8px 14px',
              color: '#fff', fontWeight: 900, fontSize: 12,
              textDecoration: 'none', flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 14, lineHeight: 1 }}>📝</span>
            <PenSquare size={14} />
            <span className="exam-link-text">मॉक टेस्ट द्या →</span>
          </a>

          {/* 🔴 New Feature: Notification Bell */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowNotifications(!showNotifications)} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
              <Bell size={16} />
              <div style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, background: '#EF4444', borderRadius: '50%', border: '2px solid #0D6B6E' }} />
            </button>
            
            {showNotifications && (
              <div style={{ position: 'absolute', top: 45, right: 0, width: 280, background: '#fff', borderRadius: 16, boxShadow: '0 10px 40px rgba(0,0,0,0.2)', padding: '16px', animation: 'fade-in 0.2s ease', border: '1px solid rgba(0,0,0,0.08)' }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: '#1C2B2B', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: 8, marginBottom: 12 }}>🔔 नवीन अपडेट्स</div>
                
                {/* 🔴 New Data Inserted in Notifications */}
                <div style={{ background: 'rgba(37,99,235,0.08)', borderRadius: 10, padding: '10px', marginBottom: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#2563EB', marginBottom: 2 }}>नवीन Mock Papers 📝</div>
                  <div style={{ fontSize: 11, color: '#4A6060', fontWeight: 600 }}>पुढील परीक्षेसाठी १०० सर्वसमावेशक सराव प्रश्नसंच (Mock Papers) ॲड करण्यात आले आहेत.</div>
                </div>

                <div style={{ background: 'rgba(5,150,105,0.08)', borderRadius: 10, padding: '10px' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#059669', marginBottom: 2 }}>Current Affairs 📰</div>
                  <div style={{ fontSize: 11, color: '#4A6060', fontWeight: 600 }}>एप्रिल महिन्याच्या चालू घडामोडींच्या नोट्स अपडेट झाल्या आहेत.</div>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
            {/* Score */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,0.2)', borderRadius: 99, padding: '4px 10px' }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.6)' }}>गुण:</span>
              <span style={{ fontSize: 12, fontWeight: 900, color: '#F5C842' }}>
                {progress.correctAnswers ?? 0} / {progress.totalQuestionsAttempted ?? 0}
              </span>
            </div>
            
            {/* 🔴 New Feature: Streak Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 800, color: '#FCA5A5' }}>
              <Flame size={10} fill="#EF4444" color="#EF4444" /> {progress.streak ?? 0} Day Streak
            </div>
          </div>

          {/* Avatar */}
          <div style={{ width: 38, height: 38, background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(245,200,66,0.6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <User size={18} color="#F5C842" />
          </div>
        </div>

      </div>
    </header>
  );
}
