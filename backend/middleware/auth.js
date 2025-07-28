import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Access denied' })

  try {
    const decoded = jwt.verify(token, config.jwtSecret)
    req.user = decoded
    next()
  } catch {
    return res.status(403).json({ error: 'Invalid token' })
  }
}

export const requireRole = (role) => (req, res, next) => {
  if (req.user?.role !== role) {
    return res.status(403).json({ error: 'Insufficient permissions' })
  }
  next()
}