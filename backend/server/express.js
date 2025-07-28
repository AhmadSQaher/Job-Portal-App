import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import compression from 'compression'

import jobRoutes from '../routes/job.routes.js'
import userRoutes from '../routes/user.routes.js'
import authRoutes from '../routes/auth.routes.js'

const app = express()

// Middleware setup
app.use(cors())
app.use(helmet()) // 🛡️ Security headers
app.use(compression()) // ⚡ Gzip compression
app.use(cookieParser()) // 🍪 Parse cookies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)
app.use('/auth', authRoutes)

// Default fallback
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the LINX Job Portal API' })
})

export default app