import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'employer', 'dev'],
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  resume: {
    type: String
  },
  company: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// 🔐 Hash password before saving
UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()
  try {
    const salt = bcryptjs.genSaltSync(10)
    this.password = bcryptjs.hashSync(this.password, salt)
    next()
  } catch (err) {
    next(err)
  }
})

// 🔍 Method to compare password during login
UserSchema.methods.authenticate = function (plainText) {
  return bcryptjs.compareSync(plainText, this.password)
}

export default mongoose.model('User', UserSchema)