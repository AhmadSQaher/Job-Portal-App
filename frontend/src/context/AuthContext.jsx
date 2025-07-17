import React, { createContext, useContext, useState, useEffect } from 'react'

const API_BASE = 'http://localhost:3000'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch(`${API_BASE}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) setUser(data.user)
        })
        .catch(() => {
          localStorage.removeItem('token')
        })
    }
  }, [])

  const signin = async (username, password) => {
    const res = await fetch(`${API_BASE}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }) // ✅ changed from email to username
    })

    const data = await res.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
      setUser(data.user)
      return data
    }
    return { error: data.error }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, signin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}