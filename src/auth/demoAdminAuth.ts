export const DEMO_ADMIN_CREDENTIALS = {
  username: 'admin@redchillycafe.com',
  password: 'ChillyDemo2026!',
};

const AUTH_STORAGE_KEY = 'redChillyCafeDemoAdminAuthenticated';

export const isDemoAdminAuthenticated = (): boolean =>
  window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true';

export const loginDemoAdmin = (username: string, password: string): boolean => {
  const credentialsMatch =
    username.trim().toLowerCase() === DEMO_ADMIN_CREDENTIALS.username.toLowerCase() &&
    password === DEMO_ADMIN_CREDENTIALS.password;

  if (credentialsMatch) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, 'true');
  }

  return credentialsMatch;
};

export const logoutDemoAdmin = (): void => {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
};