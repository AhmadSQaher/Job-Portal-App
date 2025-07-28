import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import { expressjwt } from 'express-jwt'

// POST /auth/signin
export const signin = async (req, res) => {
  try {
    const { username, password } = req.body
    console.log('📦 Full request body:', req.body)
    console.log('🔐 Login attempt:', username)

    const user = await User.findOne({ username })
    console.log('👤 User found:', user ? user.username : 'No user')

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    const passwordMatch = user.authenticate(password)
    console.log('🔍 Password match:', passwordMatch)

    if (!passwordMatch) {
      return res.status(401).json({ error: "Username and password don't match" })
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: '2h' }
    )

    res.cookie('t', token, { expire: new Date() + 9999 })

    return res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    console.error('Signin error:', err)
    return res.status(500).json({ error: 'Could not sign in' })
  }
}

// GET /auth/signout
export const signout = (req, res) => {
  res.clearCookie('t')
  return res.status(200).json({ message: 'Signed out' })
}

// GET /auth/me
export const getCurrentUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ error: 'No token provided' })

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, config.jwtSecret)

    const user = await User.findById(decoded._id).select('-password')
    if (!user) return res.status(404).json({ error: 'User not found' })

    res.json({ user })
  } catch (err) {
    console.error('Error fetching current user:', err)
    res.status(403).json({ error: 'Invalid token' })
  }
}

// Middleware to protect routes
export const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
  userProperty: 'auth'
})

// Middleware to check user authorization
export const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id == req.auth._id
  if (!authorized) {
    return res.status(403).json({ error: 'User is not authorized' })
  }
  next()
}

export default {
  signin,
  signout,
  getCurrentUser,
  requireSignin,
  hasAuthorization
}