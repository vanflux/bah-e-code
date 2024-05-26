export function getAuthToken() {
  return localStorage.getItem('auth-token') ?? undefined;
}

export function setAuthToken(authToken: string | undefined) {
  if (authToken) {
    localStorage.setItem('auth-token', authToken);
  } else {
    localStorage.removeItem('auth-token');
  }
}
