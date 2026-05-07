import { AUTH_PASSWORD } from '@/config/project'

const STORAGE_KEY = 'iris.authenticated'

export function isAuthenticated() {
  return localStorage.getItem(STORAGE_KEY) === 'true'
}

export function loginWithPassword(password: string) {
  const ok = password === AUTH_PASSWORD
  if (ok) localStorage.setItem(STORAGE_KEY, 'true')
  return ok
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY)
}

