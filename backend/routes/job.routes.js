import express from 'express'
import Job from '../models/job.model.js'

const router = express.Router()

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'company name email')
    res.json(jobs)
  } catch (err) {
    console.error('Error fetching jobs:', err)
    res.status(500).json({ error: 'Failed to retrieve jobs' })
  }
})

// Post a new job
router.post('/', async (req, res) => {
  try {
    const job = new Job(req.body)
    await job.save()
    res.status(201).json(job)
  } catch (err) {
    console.error('Error creating job:', err)
    res.status(400).json({ error: 'Failed to create job' })
  }
})

// Update a job
router.put('/:jobId', async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.jobId, req.body, { new: true })
    res.json(job)
  } catch (err) {
    console.error('Error updating job:', err)
    res.status(400).json({ error: 'Failed to update job' })
  }
})

// Delete a job
router.delete('/:jobId', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.jobId)
    res.json({ message: 'Job deleted successfully' })
  } catch (err) {
    console.error('Error deleting job:', err)
    res.status(500).json({ error: 'Failed to delete job' })
  }
})

export default router