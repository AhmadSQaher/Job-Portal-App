import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute({ children, role }) {
  const { user } = useAuth()

  if (!user) return <Navigate to="/signin" />
  if (role && Array.isArray(role)) {
    if (!role.includes(user.role)) return <Navigate to="/" />
  } else if (role && user.role !== role) {
    return <Navigate to="/" />
  }

  return children
}