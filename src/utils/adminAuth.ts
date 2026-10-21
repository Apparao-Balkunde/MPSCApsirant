import { type User } from 'firebase/auth';

export const ADMIN_EMAILS = [
  'apparaobalkunde901@gmail.com',
  'admin@mpscsarathi.online',
  'admin@mpscportal.com',
];

export const ADMIN_AUTH_KEY = 'mpsc_admin_authenticated';
export const ADMIN_EMAIL_KEY = 'mpsc_admin_email_cached';

/**
 * Checks if the current session or user is the site Admin (Apparao Balkunde).
 */
export function isUserAdmin(user?: User | null): boolean {
  // 1. Direct Firebase Auth User Email check
  if (user?.email) {
    const emailLower = user.email.toLowerCase().trim();
    if (ADMIN_EMAILS.includes(emailLower)) return true;
    if (emailLower.includes('apparaobalkunde') || emailLower.startsWith('admin@')) return true;
  }

  // 2. Check cached local admin token / session
  if (typeof window !== 'undefined') {
    try {
      const savedAuth = localStorage.getItem(ADMIN_AUTH_KEY);
      if (savedAuth === 'true') {
        // If a real Firebase user is logged in with a non-admin email, invalidate
        if (user?.email) {
          const emailLower = user.email.toLowerCase().trim();
          if (!ADMIN_EMAILS.includes(emailLower) && !emailLower.includes('apparaobalkunde') && !emailLower.startsWith('admin@')) {
            return false;
          }
        }
        return true;
      }
    } catch {
      return false;
    }
  }

  return false;
}

/**
 * Persists or clears admin authentication state in browser localStorage.
 */
export function setAdminAuthenticated(isAdmin: boolean, email: string = 'apparaobalkunde901@gmail.com') {
  if (typeof window === 'undefined') return;
  try {
    if (isAdmin) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      localStorage.setItem(ADMIN_EMAIL_KEY, email);
    } else {
      localStorage.removeItem(ADMIN_AUTH_KEY);
      localStorage.removeItem(ADMIN_EMAIL_KEY);
    }
    // Dispatch a custom event so other mounted components re-evaluate immediately
    window.dispatchEvent(new CustomEvent('mpsc-admin-auth-changed', { detail: { isAdmin } }));
  } catch (e) {
    console.error('Error toggling admin authentication state:', e);
  }
}
