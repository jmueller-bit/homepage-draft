// Einfache Authentifizierung für Lehrer
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'alz2024'

export function validatePassword(password: string): boolean {
  return password === ADMIN_PASSWORD
}

export function setAuthCookie() {
  // 8 Stunden gültig
  const expires = new Date(Date.now() + 8 * 60 * 60 * 1000).toUTCString()
  document.cookie = `admin_auth=true; expires=${expires}; path=/; SameSite=Strict`
}

export function clearAuthCookie() {
  document.cookie = 'admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

export function isAuthenticated(): boolean {
  if (typeof document === 'undefined') return false
  return document.cookie.includes('admin_auth=true')
}
