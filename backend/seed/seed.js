import mongoose from 'mongoose'
import Job from '../models/job.model.js'
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'

const MONGO_URI = 'mongodb://localhost:27017/linx'

await mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

console.log('🛠️ Connected to MongoDB. Seeding data...')

// 👥 Sample Users with hashed passwords
const users = await User.insertMany([
  {
    username: 'ahmad',
    name: 'Ahmad',
    role: 'dev',
    email: 'ahmad@linx.com',
    password: bcrypt.hashSync('devpass123', 10)
  },
  {
    username: 'emma',
    name: 'Emma',
    role: 'user',
    email: 'emma@example.com',
    password: bcrypt.hashSync('userpass123', 10),
    resume: 'https://example.com/resume/emma'
  },
  {
    username: 'novatech',
    name: 'NovaTech Inc',
    role: 'employer',
    email: 'hr@novatech.com',
    password: bcrypt.hashSync('employerpass123', 10),
    company: 'NovaTech Inc'
  }
])

const employer = users.find(u => u.role === 'employer')

// 💼 Sample Jobs
await Job.insertMany([
  {
    title: 'Frontend Developer',
    description: 'React, Vite, and UI/UX skills preferred.',
    location: 'Toronto',
    category: 'Tech',
    postedBy: employer._id
  },
  {
    title: 'Data Analyst',
    description: 'Looking for someone to analyze performance and metrics.',
    location: 'Remote',
    category: 'Analytics',
    postedBy: employer._id
  }
])

console.log('✅ Sample users and jobs seeded successfully')
process.exit()