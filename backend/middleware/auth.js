import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decoded = jwt.verify(token, config.jwtSecret)
    req.user = decoded
    next()
  } catch (err) {
    console.error('Auth Error:', err.message)
    return res.status(403).json({ error: `Invalid token: ${err.message}` })
  }
}

export const requireRole = (role) => (req, res, next) => {
  if (req.user?.role !== role) {
    return res.status(403).json({ error: 'Insufficient permissions' })
  }
  next()
}