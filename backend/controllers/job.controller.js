import Job from '../models/job.model.js'
import errorHandler from './error.controller.js'
import extend from 'lodash/extend.js'

// Create a new job post
const create = async (req, res) => {
  const job = new Job(req.body)
  try {
    await job.save()
    return res.status(200).json({ message: 'Job posted successfully!' })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// List all jobs
const list = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('postedBy', 'name company')
      .sort('-created')
    res.json(jobs)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Find job by ID
const jobByID = async (req, res, next, id) => {
  try {
    const job = await Job.findById(id).populate('postedBy', 'name company')
    if (!job) {
      return res.status(404).json({ error: 'Job not found' })
    }
    req.job = job
    next()
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve job' })
  }
}

// Read job details
const read = (req, res) => {
  return res.json(req.job)
}

// Update job post
const update = async (req, res) => {
  try {
    let job = req.job
    job = extend(job, req.body)
    job.updated = Date.now()
    await job.save()
    res.json(job)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Delete job post
const remove = async (req, res) => {
  try {
    const job = req.job
    const deleted = await job.deleteOne()
    res.json(deleted)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Apply to a job
const apply = async (req, res) => {
  try {
    const job = await Job.findById(req.body.jobId)
    if (!job) {
      return res.status(404).json({ error: 'Job not found' })
    }
    job.applicants.push(req.body.userId)
    await job.save()
    res.json({ message: 'Application submitted' })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, list, jobByID, read, update, remove, apply }