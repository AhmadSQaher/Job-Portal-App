import Employer from '../models/employer.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

// Create a new employer
const create = async (req, res) => {
  const employer = new Employer(req.body)
  try {
    await employer.save()
    return res.status(200).json({ message: 'Employer account created successfully!' })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// List all employers (admin-only)
const list = async (req, res) => {
  try {
    const employers = await Employer.find().select('name email company created updated')
    res.json(employers)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Find employer by ID
const employerByID = async (req, res, next, id) => {
  try {
    const employer = await Employer.findById(id)
    if (!employer) {
      return res.status(404).json({ error: 'Employer not found' })
    }
    req.profile = employer
    next()
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve employer' })
  }
}

// Read employer profile
const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

// Update employer profile
const update = async (req, res) => {
  try {
    let employer = req.profile
    employer = extend(employer, req.body)
    employer.updated = Date.now()
    await employer.save()
    employer.hashed_password = undefined
    employer.salt = undefined
    res.json(employer)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Delete employer profile
const remove = async (req, res) => {
  try {
    const employer = req.profile
    const deleted = await employer.deleteOne()
    deleted.hashed_password = undefined
    deleted.salt = undefined
    res.json(deleted)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, list, employerByID, read, update, remove }