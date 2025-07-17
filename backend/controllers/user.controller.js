import User from '../models/user.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

// Create a new user
const create = async (req, res) => {
  console.log('✅ Creating user via controller')
  try {
    const user = new User(req.body)
    await user.save()
    return res.status(200).json({ message: 'Successfully signed up!' })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// List all users (admin-level access)
const list = async (req, res) => {
  try {
    const users = await User.find().select('name email role updated created')
    res.json(users)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Get user by ID (middleware)
const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    req.profile = user
    next()
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve user' })
  }
}

// Read user profile
const read = (req, res) => {
  return res.json(req.profile)
}

// Update user profile
const update = async (req, res) => {
  try {
    let user = req.profile
    user = extend(user, req.body)
    user.updated = Date.now()
    await user.save()
    res.json(user)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Delete user profile
const remove = async (req, res) => {
  try {
    const user = req.profile
    const deletedUser = await user.deleteOne()
    res.json(deletedUser)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, list, userByID, read, update, remove }