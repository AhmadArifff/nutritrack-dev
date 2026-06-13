const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const AUTH_STORAGE_KEY = 'nutritrack.auth'

export function getStoredAuth() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || 'null')
  } catch {
    return null
  }
}

export function setStoredAuth(auth) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))
}

export function clearStoredAuth() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export async function apiRequest(path, options = {}) {
  const auth = getStoredAuth()
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  }

  if (auth?.token && options.auth !== false) {
    headers.Authorization = `Bearer ${auth.token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    body: options.body && typeof options.body !== 'string' ? JSON.stringify(options.body) : options.body
  })

  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await response.json() : await response.text()

  if (!response.ok) {
    const message = typeof data === 'object' && data?.message ? data.message : 'Request gagal.'
    throw new Error(message)
  }

  return data
}

export async function login(email, password) {
  const auth = await apiRequest('/api/auth/login', {
    method: 'POST',
    auth: false,
    body: { email, password }
  })
  setStoredAuth(auth)
  return auth
}

export async function register(fullName, email, password) {
  const auth = await apiRequest('/api/auth/register', {
    method: 'POST',
    auth: false,
    body: { fullName, email, password }
  })
  setStoredAuth(auth)
  return auth
}
