export interface AdminAuthResult {
  success: boolean;
  message?: string;
}

export interface AdminAuthService {
  authenticate: (username: string, password: string) => Promise<AdminAuthResult>;
  isAuthenticated: () => boolean;
  logout: () => Promise<void>;
}

const API_URL = import.meta.env.VITE_API_URL;
let sessionAuthenticated: boolean | null = null;

function getCookie(name: string): string | undefined {
  const cookie = document.cookie
    .split('; ')
    .find((item) => item.startsWith(`${name}=`));
  return cookie?.slice(name.length + 1);
}

async function readError(response: Response, fallback: string): Promise<string> {
  const data: { error?: string; message?: string } = await response.json().catch(() => ({}));
  return data.error ?? data.message ?? fallback;
}

export const adminAuthService: AdminAuthService = {
  async authenticate(username, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: { username: username.trim(), password } }),
    });

    if (!response.ok) {
      return {
        success: false,
        message: await readError(response, 'Unable to sign in. Please try again.'),
      };
    }

    const data: { success?: boolean } = await response.json();
    if (!data.success) {
      return { success: false, message: 'Unable to sign in. Please try again.' };
    }

    sessionAuthenticated = true;
    return { success: true };
  },

  isAuthenticated() {
    return sessionAuthenticated ?? Boolean(getCookie('active'));
  },

  async logout() {
    const response = await fetch(`${API_URL}/auth/logout`, { credentials: 'include' });
    if (!response.ok) {
      throw new Error(await readError(response, 'Unable to log out. Please try again.'));
    }
    sessionAuthenticated = false;
  },
};
