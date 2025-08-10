import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    default: 'full-time'
  },
  salary: {
    type: String,
    trim: true
  },
  experience: {
    type: String,
    enum: ['entry', 'mid', 'senior', 'executive', ''],
    default: ''
  },
  requirements: {
    type: String
  },
  benefits: {
    type: String
  },
  category: {
    type: String,
    default: 'General'
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Job', JobSchema)