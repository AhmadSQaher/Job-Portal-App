import express from 'express'
import Job from '../models/job.model.js'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()

// Get all jobs (public route - no auth required)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'company name email')
    res.json(jobs)
  } catch (err) {
    console.error('Error fetching jobs:', err)
    res.status(500).json({ error: 'Failed to retrieve jobs' })
  }
})

// Post a new job (requires auth)
router.post('/', requireAuth, async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      postedBy: req.user._id // Set the postedBy field to the authenticated user's ID
    }
    const job = new Job(jobData)
    await job.save()
    res.status(201).json(job)
  } catch (err) {
    console.error('Error creating job:', err)
    res.status(400).json({ error: 'Failed to create job' })
  }
})

// Update a job (requires auth)
router.put('/:jobId', requireAuth, async (req, res) => {
  try {
    // First check if the job exists and belongs to the authenticated user
    const existingJob = await Job.findById(req.params.jobId)
    if (!existingJob) {
      return res.status(404).json({ error: 'Job not found' })
    }
    if (existingJob.postedBy.toString() !== req.user._id) {
      return res.status(403).json({ error: 'Not authorized to update this job' })
    }
    
    const job = await Job.findByIdAndUpdate(req.params.jobId, req.body, { new: true })
    res.json(job)
  } catch (err) {
    console.error('Error updating job:', err)
    res.status(400).json({ error: 'Failed to update job' })
  }
})

// Get jobs by employer (requires auth)
router.get('/employer/:employerId', requireAuth, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.params.employerId })
      .sort({ createdAt: -1 }) // Most recent first
      .populate('postedBy', 'company name email');
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching employer jobs:', err);
    res.status(500).json({ error: 'Failed to retrieve employer jobs' });
  }
});

// Delete a job
router.delete('/:jobId', async (req, res) => {
  try {
    // First check if the job exists and belongs to the authenticated user
    const existingJob = await Job.findById(req.params.jobId)
    if (!existingJob) {
      return res.status(404).json({ error: 'Job not found' })
    }
    if (existingJob.postedBy.toString() !== req.user._id) {
      return res.status(403).json({ error: 'Not authorized to delete this job' })
    }
    
    await Job.findByIdAndDelete(req.params.jobId)
    res.json({ message: 'Job deleted successfully' })
  } catch (err) {
    console.error('Error deleting job:', err)
    res.status(500).json({ error: 'Failed to delete job' })
  }
})

export default router