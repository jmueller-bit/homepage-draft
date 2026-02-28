// Client-seitige Authentifizierung für Lehrer
// Passwort-Validierung erfolgt serverseitig über API

export async function validatePassword(password: string): Promise<boolean> {
  try {
    const response = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    return response.ok
  } catch (error) {
    console.error('Auth error:', error)
    return false
  }
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
