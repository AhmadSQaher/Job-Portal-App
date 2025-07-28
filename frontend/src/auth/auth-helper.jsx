const authenticate = (jwt, cb) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(jwt)) // ✅ switched from sessionStorage
    cb()
  }
}

const isAuthenticated = () => {
  if (typeof window === 'undefined') return null
  const jwt = localStorage.getItem('jwt') // ✅ switched from sessionStorage
  return jwt ? JSON.parse(jwt) : null
}

const clearJWT = (cb) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt') // ✅ switched from sessionStorage
    cb()
  }
}

export default {
  authenticate,
  isAuthenticated,
  clearJWT
}