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

export const VALID_ADMIN_PASSWORDS = [
  'mpscadmin2026',
  'mpsc@2026',
  'apparao@2026',
  'apparao2026',
  'admin123',
  'admin@mpsc',
  'mpscportal2026',
];

/**
 * Checks if the provided password matches any authorized admin password.
 */
export function verifyAdminPassword(password: string): boolean {
  if (!password) return false;
  const cleanPass = password.trim();
  return VALID_ADMIN_PASSWORDS.includes(cleanPass);
}

/**
 * Verifies email and password credentials for dedicated admin login.
 */
export function authenticateAdminCredentials(
  email: string, 
  password: string
): { success: boolean; messageMr: string; messageEn: string } {
  const cleanEmail = email.toLowerCase().trim();
  const cleanPass = password.trim();

  // Validate email
  const isAuthorizedEmail = 
    ADMIN_EMAILS.includes(cleanEmail) || 
    cleanEmail.includes('apparaobalkunde') || 
    cleanEmail.startsWith('admin@');

  if (!isAuthorizedEmail) {
    return {
      success: false,
      messageMr: 'हा ईमेल आयडी ॲडमिन म्हणून अधिकृत नाही. कृपया अधिकृत ॲडमिन ईमेल वापरा.',
      messageEn: 'This email is not authorized for Admin access. Please use an authorized admin email.'
    };
  }

  // Validate password
  if (!verifyAdminPassword(cleanPass)) {
    return {
      success: false,
      messageMr: 'चुकीचा ॲडमिन पासवर्ड! कृपया खरा ॲडमिन सिक्युरिटी की / पासवर्ड टाका.',
      messageEn: 'Incorrect admin password! Please enter the correct admin security key.'
    };
  }

  // Set authenticated state
  setAdminAuthenticated(true, cleanEmail);

  return {
    success: true,
    messageMr: '👑 स्वागत आहे अप्पाराव सर! ॲडमिन ऑथेंटिकेशन यशस्वी झाले. सर्व ॲडमिन फीचर्स अनलॉक झाले आहेत.',
    messageEn: '👑 Welcome Apparao Sir! Admin access authenticated successfully. All admin features unlocked.'
  };
}
