import express from 'express'
import { signin, signout, getCurrentUser, signup } from '../controllers/auth.controller.js'

const router = express.Router()

// Register route
router.post('/signup', signup)

// Login route
router.post('/signin', signin)

// Logout route
router.get('/signout', signout)

// Get current user from token
router.get('/me', getCurrentUser)

export default router