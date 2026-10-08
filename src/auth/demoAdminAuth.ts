export interface AdminAuthResult {
  success: boolean;
  message?: string;
  admin?: { id: string; username: string };
  token?: string;
}

export interface AdminAuthService {
  authenticate: (username: string, password: string) => Promise<AdminAuthResult>;
  isAuthenticated: () => boolean;
  logout: () => void;
}

export const DEMO_ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'ChillyDemo2026!',
};

const AUTH_STORAGE_KEY = 'redChillyCafeDemoAdminAuthenticated';

const demoAdminAuthService: AdminAuthService = {
  async authenticate(username, password) {
    await new Promise((resolve) => window.setTimeout(resolve, 300));

    const credentialsMatch =
      username.trim().toLowerCase() === DEMO_ADMIN_CREDENTIALS.username &&
      password === DEMO_ADMIN_CREDENTIALS.password;

    if (!credentialsMatch) {
      return { success: false, message: 'Invalid username or password.' };
    }

    window.localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    return {
      success: true,
      admin: { id: 'demo-admin', username: DEMO_ADMIN_CREDENTIALS.username },
    };
  },

  isAuthenticated() {
    return window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  },

  logout() {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  },
};

// Frontend-only demo service. Replace this implementation with the backend API when available.
export const adminAuthService: AdminAuthService = demoAdminAuthService;