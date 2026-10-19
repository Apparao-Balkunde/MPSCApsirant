import { useEffect, useState } from 'react';
import { completeExamSSO } from '../lib/completeExamSSO';

/**
 * Mount this component at /sso in the Exam site's existing router.
 * The one-time code is removed from the address bar before the exchange.
 */
export default function SSOCallback() {
  const [message, setMessage] = useState(
    'तुमचे लॉगिन सुरक्षितपणे तपासत आहोत...'
  );

  useEffect(() => {
    let cancelled = false;

    async function finishLogin() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      // Do not leave the one-time code in browser history.
      window.history.replaceState({}, '', '/sso');

      if (!code) {
        setMessage('SSO code सापडला नाही. Main Website वरून पुन्हा प्रयत्न करा.');
        return;
      }

      try {
        await completeExamSSO(code);
        if (!cancelled) window.location.replace('/dashboard');
      } catch {
        if (!cancelled) {
          setMessage(
            'लॉगिन पूर्ण झाले नाही. Main Website वरून पुन्हा Exam उघडा.'
          );
        }
      }
    }

    void finishLogin();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <p role="status" aria-live="polite">{message}</p>
    </main>
  );
}
