import User from '../models/user.model.js'
import Employer from '../models/employer.model.js'
import Job from '../models/job.model.js'
import errorHandler from './error.controller.js'

// Get all users
const listUsers = async (req, res) => {
  try {
    const users = await User.find().select('name email role created updated')
    res.json(users)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Get all employers
const listEmployers = async (req, res) => {
  try {
    const employers = await Employer.find().select('name email company role created updated')
    res.json(employers)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Get all jobs
const listJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('postedBy', 'name company')
      .select('title category location created')
    res.json(jobs)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { listUsers, listEmployers, listJobs }