import express from 'express'
import { signin, getCurrentUser } from '../controllers/auth.controller.js'

const router = express.Router()

// Login route
router.post('/signin', signin)

// Get current user from token
router.get('/me', getCurrentUser)

export default router